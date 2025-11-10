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
    normalized: number;
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
export declare class EquationEngine {
    private equations;
    private equationCounter;
    private readonly propertyRanges;
    createEquation(sentence: string, confidence?: number): LinguisticEquation;
    addElement(equationId: string, name: string, type: ElementType): boolean;
    addProperty(equationId: string, name: string, domain: PropertyDomain, value: number, minValue?: number, maxValue?: number, unit?: string): PropertyState | null;
    addChange(equationId: string, property: string, changeType: ChangeType, amount: number, before: number, after: number): StateChange | null;
    applyChange(equationId: string, propertyName: string, changeType: ChangeType, amount: number): PropertyState | null;
    getEquation(id: string): LinguisticEquation | null;
    findEquationsBySentence(sentence: string): LinguisticEquation[];
    findEquationsByElement(elementName: string): LinguisticEquation[];
    findEquationsByProperty(propertyName: string): LinguisticEquation[];
    getRecentEquations(limit?: number): LinguisticEquation[];
    getStatistics(): {
        totalEquations: number;
        totalElements: number;
        totalProperties: number;
        totalChanges: number;
        elementTypeDistribution: Record<ElementType, number>;
        changeTypeDistribution: Record<ChangeType, number>;
        domainDistribution: Record<PropertyDomain, number>;
        averageConfidence: number;
    };
    clear(): void;
}
