/**
 * محرك المعادلات - Equation Engine
 * Converts linguistic structures into mathematical equations
 */

export type ElementType = 'thing' | 'event' | 'state' | 'property' | 'result';
export type ChangeType = 'increase' | 'decrease' | 'transform' | 'create' | 'destroy' | 'move' | 'stay';
export type PropertyDomain = 'physical' | 'psychological' | 'social' | 'biological' | 'cognitive' | 'emotional' | 'temporal' | 'spatial';

export interface PropertyState {
  name: string;
  domain: PropertyDomain;
  value: number;
  minValue: number;
  maxValue: number;
  unit: string;
  normalized: number; // 0-1
  timestamp: number;
}

export interface StateChange {
  property: string;
  changeType: ChangeType;
  amount: number;
  before: number;
  after: number;
  timestamp: number;
}

export interface LinguisticEquation {
  id: string;
  sentence: string;
  elements: Map<string, ElementType>;
  properties: Map<string, PropertyState>;
  changes: StateChange[];
  timestamp: number;
  confidence: number;
}

export class EquationEngine {
  private equations: Map<string, LinguisticEquation> = new Map();
  private equationCounter: number = 0;
  
  // Default property ranges
  private readonly propertyRanges: Record<string, { min: number; max: number; unit: string; domain: PropertyDomain }> = {
    'جوع': { min: 0, max: 100, unit: '%', domain: 'biological' },
    'عطش': { min: 0, max: 100, unit: '%', domain: 'biological' },
    'تعب': { min: 0, max: 100, unit: '%', domain: 'biological' },
    'طاقة': { min: 0, max: 100, unit: '%', domain: 'biological' },
    'صحة': { min: 0, max: 100, unit: '%', domain: 'biological' },
    'معرفة': { min: 0, max: 100, unit: '%', domain: 'cognitive' },
    'فهم': { min: 0, max: 100, unit: '%', domain: 'cognitive' },
    'سعادة': { min: 0, max: 100, unit: '%', domain: 'emotional' },
    'حزن': { min: 0, max: 100, unit: '%', domain: 'emotional' },
    'غضب': { min: 0, max: 100, unit: '%', domain: 'emotional' },
    'موقع': { min: -Infinity, max: Infinity, unit: 'm', domain: 'spatial' },
    'سرعة': { min: 0, max: Infinity, unit: 'm/s', domain: 'physical' },
    'كتلة': { min: 0, max: Infinity, unit: 'kg', domain: 'physical' }
  };
  
  createEquation(sentence: string, confidence: number = 1.0): LinguisticEquation {
    const id = `eq_${this.equationCounter++}`;
    
    const equation: LinguisticEquation = {
      id,
      sentence,
      elements: new Map(),
      properties: new Map(),
      changes: [],
      timestamp: Date.now(),
      confidence: Math.max(0, Math.min(1, confidence))
    };
    
    this.equations.set(id, equation);
    
    return equation;
  }
  
  addElement(equationId: string, name: string, type: ElementType): boolean {
    const equation = this.equations.get(equationId);
    if (!equation) return false;
    
    equation.elements.set(name, type);
    
    return true;
  }
  
  addProperty(
    equationId: string,
    name: string,
    domain: PropertyDomain,
    value: number,
    minValue?: number,
    maxValue?: number,
    unit?: string
  ): PropertyState | null {
    const equation = this.equations.get(equationId);
    if (!equation) return null;
    
    // Use default ranges if available
    const defaults = this.propertyRanges[name];
    const min = minValue ?? defaults?.min ?? -Infinity;
    const max = maxValue ?? defaults?.max ?? Infinity;
    const u = unit ?? defaults?.unit ?? '';
    const d = defaults?.domain ?? domain;
    
    const clampedValue = Math.max(min, Math.min(max, value));
    const normalized = max !== min ? (clampedValue - min) / (max - min) : 0.5;
    
    const property: PropertyState = {
      name,
      domain: d,
      value: clampedValue,
      minValue: min,
      maxValue: max,
      unit: u,
      normalized,
      timestamp: Date.now()
    };
    
    equation.properties.set(name, property);
    
    return property;
  }
  
  addChange(
    equationId: string,
    property: string,
    changeType: ChangeType,
    amount: number,
    before: number,
    after: number
  ): StateChange | null {
    const equation = this.equations.get(equationId);
    if (!equation) return null;
    
    const change: StateChange = {
      property,
      changeType,
      amount,
      before,
      after,
      timestamp: Date.now()
    };
    
    equation.changes.push(change);
    
    return change;
  }
  
  applyChange(
    equationId: string,
    propertyName: string,
    changeType: ChangeType,
    amount: number
  ): PropertyState | null {
    const equation = this.equations.get(equationId);
    if (!equation) return null;
    
    const property = equation.properties.get(propertyName);
    if (!property) return null;
    
    const before = property.value;
    let after = before;
    
    switch (changeType) {
      case 'increase':
        after = Math.min(property.maxValue, before + amount);
        break;
      case 'decrease':
        after = Math.max(property.minValue, before - amount);
        break;
      case 'transform':
        after = Math.max(property.minValue, Math.min(property.maxValue, amount));
        break;
      case 'create':
        after = property.maxValue;
        break;
      case 'destroy':
        after = property.minValue;
        break;
      case 'stay':
        after = before;
        break;
      default:
        after = before;
    }
    
    property.value = after;
    property.normalized = property.maxValue !== property.minValue 
      ? (after - property.minValue) / (property.maxValue - property.minValue) 
      : 0.5;
    property.timestamp = Date.now();
    
    this.addChange(equationId, propertyName, changeType, amount, before, after);
    
    return property;
  }
  
  getEquation(id: string): LinguisticEquation | null {
    return this.equations.get(id) || null;
  }
  
  findEquationsBySentence(sentence: string): LinguisticEquation[] {
    return Array.from(this.equations.values())
      .filter(eq => eq.sentence.includes(sentence));
  }
  
  findEquationsByElement(elementName: string): LinguisticEquation[] {
    return Array.from(this.equations.values())
      .filter(eq => eq.elements.has(elementName));
  }
  
  findEquationsByProperty(propertyName: string): LinguisticEquation[] {
    return Array.from(this.equations.values())
      .filter(eq => eq.properties.has(propertyName));
  }
  
  getRecentEquations(limit: number = 10): LinguisticEquation[] {
    return Array.from(this.equations.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
  
  getStatistics(): {
    totalEquations: number;
    totalElements: number;
    totalProperties: number;
    totalChanges: number;
    elementTypeDistribution: Record<ElementType, number>;
    changeTypeDistribution: Record<ChangeType, number>;
    domainDistribution: Record<PropertyDomain, number>;
    averageConfidence: number;
  } {
    const elementTypeDistribution: Record<ElementType, number> = {
      thing: 0,
      event: 0,
      state: 0,
      property: 0,
      result: 0
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
    
    let totalElements = 0;
    let totalProperties = 0;
    let totalChanges = 0;
    let totalConfidence = 0;
    
    for (const equation of this.equations.values()) {
      totalElements += equation.elements.size;
      totalProperties += equation.properties.size;
      totalChanges += equation.changes.length;
      totalConfidence += equation.confidence;
      
      for (const type of equation.elements.values()) {
        elementTypeDistribution[type]++;
      }
      
      for (const property of equation.properties.values()) {
        domainDistribution[property.domain]++;
      }
      
      for (const change of equation.changes) {
        changeTypeDistribution[change.changeType]++;
      }
    }
    
    return {
      totalEquations: this.equations.size,
      totalElements,
      totalProperties,
      totalChanges,
      elementTypeDistribution,
      changeTypeDistribution,
      domainDistribution,
      averageConfidence: this.equations.size > 0 ? totalConfidence / this.equations.size : 0
    };
  }
  
  clear(): void {
    this.equations.clear();
    this.equationCounter = 0;
  }
}

