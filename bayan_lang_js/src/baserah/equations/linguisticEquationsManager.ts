/**
 * مدير المعادلات اللغوية - Linguistic Equations Manager
 * Integrates all linguistic equations components
 */

import { EquationEngine, LinguisticEquation, PropertyState, StateChange, ChangeType, PropertyDomain } from './equationEngine';
import { StructureAnalyzer, SentenceStructure, GrammaticalRole, SentenceType } from './structureAnalyzer';
import { EquationGenerator, GenerationResult, VerbEffect } from './equationGenerator';

export interface WorldState {
  things: Map<string, Map<string, PropertyState>>;
  lastUpdate: number;
}

export interface ProcessingResult {
  sentence: string;
  equation: LinguisticEquation;
  structure: SentenceStructure;
  worldChanges: StateChange[];
  confidence: number;
}

export interface LinguisticEquationsSettings {
  autoUpdateWorld: boolean;
  trackHistory: boolean;
  maxHistorySize: number;
  defaultConfidence: number;
}

export class LinguisticEquationsManager {
  private equationEngine: EquationEngine;
  private structureAnalyzer: StructureAnalyzer;
  private equationGenerator: EquationGenerator;
  private worldState: WorldState;
  private history: ProcessingResult[] = [];
  private settings: LinguisticEquationsSettings;
  
  constructor(settings?: Partial<LinguisticEquationsSettings>) {
    this.equationEngine = new EquationEngine();
    this.structureAnalyzer = new StructureAnalyzer();
    this.equationGenerator = new EquationGenerator(this.equationEngine, this.structureAnalyzer);
    
    this.worldState = {
      things: new Map(),
      lastUpdate: Date.now()
    };
    
    this.settings = {
      autoUpdateWorld: true,
      trackHistory: true,
      maxHistorySize: 100,
      defaultConfidence: 0.8,
      ...settings
    };
  }
  
  processSentence(sentence: string): ProcessingResult {
    // Generate equation from sentence
    const result = this.equationGenerator.generateFromSentence(sentence);
    
    // Update world state if enabled
    const worldChanges: StateChange[] = [];
    
    if (this.settings.autoUpdateWorld) {
      for (const change of result.equation.changes) {
        this.updateWorldState(change, result.equation);
        worldChanges.push(change);
      }
    }
    
    const processingResult: ProcessingResult = {
      sentence,
      equation: result.equation,
      structure: result.structure,
      worldChanges,
      confidence: result.confidence
    };
    
    // Track history if enabled
    if (this.settings.trackHistory) {
      this.history.push(processingResult);
      
      // Limit history size
      if (this.history.length > this.settings.maxHistorySize) {
        this.history.shift();
      }
    }
    
    return processingResult;
  }
  
  private updateWorldState(change: StateChange, equation: LinguisticEquation): void {
    // Extract thing name from property name (format: "thing_property")
    const parts = change.property.split('_');
    if (parts.length < 2) return;
    
    const thingName = parts[0];
    const propertyName = parts.slice(1).join('_');
    
    // Get or create thing in world state
    if (!this.worldState.things.has(thingName)) {
      this.worldState.things.set(thingName, new Map());
    }
    
    const thing = this.worldState.things.get(thingName)!;
    
    // Get property from equation
    const property = equation.properties.get(change.property);
    if (property) {
      thing.set(propertyName, { ...property });
    }
    
    this.worldState.lastUpdate = Date.now();
  }
  
  processStory(sentences: string[]): ProcessingResult[] {
    const results: ProcessingResult[] = [];
    
    for (const sentence of sentences) {
      const result = this.processSentence(sentence);
      results.push(result);
    }
    
    return results;
  }
  
  getThingState(thingName: string): Map<string, PropertyState> | null {
    return this.worldState.things.get(thingName) || null;
  }
  
  getWorldState(): WorldState {
    return {
      things: new Map(this.worldState.things),
      lastUpdate: this.worldState.lastUpdate
    };
  }
  
  getHistory(limit?: number): ProcessingResult[] {
    if (limit) {
      return this.history.slice(-limit);
    }
    return [...this.history];
  }
  
  findHistoryByThing(thingName: string): ProcessingResult[] {
    return this.history.filter(result => 
      result.structure.subject === thingName || 
      result.structure.object === thingName
    );
  }
  
  findHistoryByVerb(verb: string): ProcessingResult[] {
    return this.history.filter(result => 
      result.structure.verb === verb
    );
  }
  
  analyzeSentence(sentence: string): SentenceStructure {
    return this.structureAnalyzer.analyzeSentence(sentence);
  }
  
  addVerbEffect(effect: VerbEffect): void {
    this.equationGenerator.addVerbEffect(effect);
  }
  
  getVerbEffect(verb: string): VerbEffect | null {
    return this.equationGenerator.getVerbEffect(verb);
  }
  
  updateSettings(newSettings: Partial<LinguisticEquationsSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }
  
  getSettings(): LinguisticEquationsSettings {
    return { ...this.settings };
  }
  
  getEquationEngine(): EquationEngine {
    return this.equationEngine;
  }
  
  getStructureAnalyzer(): StructureAnalyzer {
    return this.structureAnalyzer;
  }
  
  getEquationGenerator(): EquationGenerator {
    return this.equationGenerator;
  }
  
  getStatistics(): {
    equations: ReturnType<EquationEngine['getStatistics']>;
    structures: ReturnType<StructureAnalyzer['getStatistics']>;
    generator: ReturnType<EquationGenerator['getStatistics']>;
    world: {
      totalThings: number;
      totalProperties: number;
      averagePropertiesPerThing: number;
    };
    history: {
      totalProcessed: number;
      averageConfidence: number;
      averageChangesPerSentence: number;
    };
  } {
    let totalProperties = 0;
    for (const thing of this.worldState.things.values()) {
      totalProperties += thing.size;
    }
    
    let totalConfidence = 0;
    let totalChanges = 0;
    
    for (const result of this.history) {
      totalConfidence += result.confidence;
      totalChanges += result.worldChanges.length;
    }
    
    return {
      equations: this.equationEngine.getStatistics(),
      structures: this.structureAnalyzer.getStatistics(),
      generator: this.equationGenerator.getStatistics(),
      world: {
        totalThings: this.worldState.things.size,
        totalProperties,
        averagePropertiesPerThing: this.worldState.things.size > 0 
          ? totalProperties / this.worldState.things.size 
          : 0
      },
      history: {
        totalProcessed: this.history.length,
        averageConfidence: this.history.length > 0 
          ? totalConfidence / this.history.length 
          : 0,
        averageChangesPerSentence: this.history.length > 0 
          ? totalChanges / this.history.length 
          : 0
      }
    };
  }
  
  clearHistory(): void {
    this.history = [];
  }
  
  clearWorld(): void {
    this.worldState.things.clear();
    this.worldState.lastUpdate = Date.now();
  }
  
  clearAll(): void {
    this.equationEngine.clear();
    this.structureAnalyzer.clear();
    this.equationGenerator.clear();
    this.clearHistory();
    this.clearWorld();
  }
}

