/**
 * مولد المعادلات - Equation Generator
 * Generates equations from linguistic structures
 */

import { EquationEngine, LinguisticEquation, ChangeType, PropertyDomain } from './equationEngine';
import { StructureAnalyzer, SentenceStructure } from './structureAnalyzer';

export interface VerbEffect {
  verb: string;
  subjectEffects: Array<{ property: string; change: ChangeType; amount: number; domain: PropertyDomain }>;
  objectEffects: Array<{ property: string; change: ChangeType; amount: number; domain: PropertyDomain }>;
}

export interface GenerationResult {
  equation: LinguisticEquation;
  structure: SentenceStructure;
  appliedEffects: number;
  confidence: number;
}

export class EquationGenerator {
  private equationEngine: EquationEngine;
  private structureAnalyzer: StructureAnalyzer;
  
  // Verb effects database
  private readonly verbEffects: Map<string, VerbEffect> = new Map([
    ['ضرب', {
      verb: 'ضرب',
      subjectEffects: [
        { property: 'طاقة', change: 'decrease', amount: 5, domain: 'biological' },
        { property: 'تعب', change: 'increase', amount: 3, domain: 'biological' }
      ],
      objectEffects: [
        { property: 'موقع', change: 'move', amount: 10, domain: 'spatial' },
        { property: 'سرعة', change: 'increase', amount: 5, domain: 'physical' }
      ]
    }],
    ['أكل', {
      verb: 'أكل',
      subjectEffects: [
        { property: 'جوع', change: 'decrease', amount: 30, domain: 'biological' },
        { property: 'طاقة', change: 'increase', amount: 20, domain: 'biological' },
        { property: 'صحة', change: 'increase', amount: 5, domain: 'biological' }
      ],
      objectEffects: [
        { property: 'كتلة', change: 'destroy', amount: 0, domain: 'physical' }
      ]
    }],
    ['شرب', {
      verb: 'شرب',
      subjectEffects: [
        { property: 'عطش', change: 'decrease', amount: 40, domain: 'biological' },
        { property: 'طاقة', change: 'increase', amount: 10, domain: 'biological' }
      ],
      objectEffects: [
        { property: 'كتلة', change: 'destroy', amount: 0, domain: 'physical' }
      ]
    }],
    ['قرأ', {
      verb: 'قرأ',
      subjectEffects: [
        { property: 'معرفة', change: 'increase', amount: 15, domain: 'cognitive' },
        { property: 'فهم', change: 'increase', amount: 10, domain: 'cognitive' },
        { property: 'تعب', change: 'increase', amount: 5, domain: 'biological' }
      ],
      objectEffects: []
    }],
    ['كتب', {
      verb: 'كتب',
      subjectEffects: [
        { property: 'معرفة', change: 'increase', amount: 10, domain: 'cognitive' },
        { property: 'طاقة', change: 'decrease', amount: 10, domain: 'biological' },
        { property: 'تعب', change: 'increase', amount: 8, domain: 'biological' }
      ],
      objectEffects: [
        { property: 'كتلة', change: 'create', amount: 1, domain: 'physical' }
      ]
    }],
    ['نام', {
      verb: 'نام',
      subjectEffects: [
        { property: 'تعب', change: 'decrease', amount: 50, domain: 'biological' },
        { property: 'طاقة', change: 'increase', amount: 40, domain: 'biological' },
        { property: 'صحة', change: 'increase', amount: 10, domain: 'biological' }
      ],
      objectEffects: []
    }],
    ['استيقظ', {
      verb: 'استيقظ',
      subjectEffects: [
        { property: 'طاقة', change: 'increase', amount: 20, domain: 'biological' },
        { property: 'جوع', change: 'increase', amount: 15, domain: 'biological' }
      ],
      objectEffects: []
    }],
    ['ذهب', {
      verb: 'ذهب',
      subjectEffects: [
        { property: 'موقع', change: 'move', amount: 100, domain: 'spatial' },
        { property: 'طاقة', change: 'decrease', amount: 10, domain: 'biological' },
        { property: 'تعب', change: 'increase', amount: 5, domain: 'biological' }
      ],
      objectEffects: []
    }],
    ['جلس', {
      verb: 'جلس',
      subjectEffects: [
        { property: 'تعب', change: 'decrease', amount: 10, domain: 'biological' },
        { property: 'طاقة', change: 'increase', amount: 5, domain: 'biological' }
      ],
      objectEffects: []
    }]
  ]);
  
  constructor(equationEngine?: EquationEngine, structureAnalyzer?: StructureAnalyzer) {
    this.equationEngine = equationEngine || new EquationEngine();
    this.structureAnalyzer = structureAnalyzer || new StructureAnalyzer();
  }
  
  generateFromSentence(sentence: string): GenerationResult {
    // Analyze structure
    const structure = this.structureAnalyzer.analyzeSentence(sentence);
    
    // Create equation
    const equation = this.equationEngine.createEquation(sentence, structure.confidence);
    
    // Add elements
    if (structure.subject) {
      this.equationEngine.addElement(equation.id, structure.subject, 'thing');
    }
    
    if (structure.verb) {
      this.equationEngine.addElement(equation.id, structure.verb, 'event');
    }
    
    if (structure.object) {
      this.equationEngine.addElement(equation.id, structure.object, 'thing');
    }
    
    // Apply verb effects
    let appliedEffects = 0;
    
    if (structure.verb) {
      const effects = this.getVerbEffects(structure.verb);
      
      if (effects) {
        // Apply subject effects
        if (structure.subject) {
          for (const effect of effects.subjectEffects) {
            this.equationEngine.addProperty(
              equation.id,
              `${structure.subject}_${effect.property}`,
              effect.domain,
              50 // Default starting value
            );
            
            this.equationEngine.applyChange(
              equation.id,
              `${structure.subject}_${effect.property}`,
              effect.change,
              effect.amount
            );
            
            appliedEffects++;
          }
        }
        
        // Apply object effects
        if (structure.object) {
          for (const effect of effects.objectEffects) {
            this.equationEngine.addProperty(
              equation.id,
              `${structure.object}_${effect.property}`,
              effect.domain,
              50 // Default starting value
            );
            
            this.equationEngine.applyChange(
              equation.id,
              `${structure.object}_${effect.property}`,
              effect.change,
              effect.amount
            );
            
            appliedEffects++;
          }
        }
      }
    }
    
    return {
      equation,
      structure,
      appliedEffects,
      confidence: structure.confidence
    };
  }
  
  private getVerbEffects(verb: string): VerbEffect | null {
    // Try exact match
    if (this.verbEffects.has(verb)) {
      return this.verbEffects.get(verb)!;
    }
    
    // Try partial match
    for (const [key, effect] of this.verbEffects.entries()) {
      if (verb.includes(key) || key.includes(verb)) {
        return effect;
      }
    }
    
    return null;
  }
  
  addVerbEffect(effect: VerbEffect): void {
    this.verbEffects.set(effect.verb, effect);
  }
  
  getVerbEffect(verb: string): VerbEffect | null {
    return this.verbEffects.get(verb) || null;
  }
  
  getAllVerbEffects(): VerbEffect[] {
    return Array.from(this.verbEffects.values());
  }
  
  getEquationEngine(): EquationEngine {
    return this.equationEngine;
  }
  
  getStructureAnalyzer(): StructureAnalyzer {
    return this.structureAnalyzer;
  }
  
  getStatistics(): {
    totalVerbEffects: number;
    averageSubjectEffects: number;
    averageObjectEffects: number;
    domainDistribution: Record<PropertyDomain, number>;
    changeTypeDistribution: Record<ChangeType, number>;
  } {
    const domainDistribution: Record<PropertyDomain, number> = {
      physical: 0,
      psychological: 0,
      social: 0,
      biological: 0,
      cognitive: 0,
      emotional: 0,
      temporal: 0,
      spatial: 0
    };
    
    const changeTypeDistribution: Record<ChangeType, number> = {
      increase: 0,
      decrease: 0,
      transform: 0,
      create: 0,
      destroy: 0,
      move: 0,
      stay: 0
    };
    
    let totalSubjectEffects = 0;
    let totalObjectEffects = 0;
    
    for (const effect of this.verbEffects.values()) {
      totalSubjectEffects += effect.subjectEffects.length;
      totalObjectEffects += effect.objectEffects.length;
      
      for (const se of effect.subjectEffects) {
        domainDistribution[se.domain]++;
        changeTypeDistribution[se.change]++;
      }
      
      for (const oe of effect.objectEffects) {
        domainDistribution[oe.domain]++;
        changeTypeDistribution[oe.change]++;
      }
    }
    
    return {
      totalVerbEffects: this.verbEffects.size,
      averageSubjectEffects: this.verbEffects.size > 0 ? totalSubjectEffects / this.verbEffects.size : 0,
      averageObjectEffects: this.verbEffects.size > 0 ? totalObjectEffects / this.verbEffects.size : 0,
      domainDistribution,
      changeTypeDistribution
    };
  }
  
  clear(): void {
    this.equationEngine.clear();
    this.structureAnalyzer.clear();
  }
}

