/**
 * مولد المعادلات - Equation Generator
 * Generates equations from linguistic structures
 */
import { EquationEngine, LinguisticEquation, ChangeType, PropertyDomain } from './equationEngine';
import { StructureAnalyzer, SentenceStructure } from './structureAnalyzer';
export interface VerbEffect {
    verb: string;
    subjectEffects: Array<{
        property: string;
        change: ChangeType;
        amount: number;
        domain: PropertyDomain;
    }>;
    objectEffects: Array<{
        property: string;
        change: ChangeType;
        amount: number;
        domain: PropertyDomain;
    }>;
}
export interface GenerationResult {
    equation: LinguisticEquation;
    structure: SentenceStructure;
    appliedEffects: number;
    confidence: number;
}
export declare class EquationGenerator {
    private equationEngine;
    private structureAnalyzer;
    private readonly verbEffects;
    constructor(equationEngine?: EquationEngine, structureAnalyzer?: StructureAnalyzer);
    generateFromSentence(sentence: string): GenerationResult;
    private getVerbEffects;
    addVerbEffect(effect: VerbEffect): void;
    getVerbEffect(verb: string): VerbEffect | null;
    getAllVerbEffects(): VerbEffect[];
    getEquationEngine(): EquationEngine;
    getStructureAnalyzer(): StructureAnalyzer;
    getStatistics(): {
        totalVerbEffects: number;
        averageSubjectEffects: number;
        averageObjectEffects: number;
        domainDistribution: Record<PropertyDomain, number>;
        changeTypeDistribution: Record<ChangeType, number>;
    };
    clear(): void;
}
