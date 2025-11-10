/**
 * محرك الارتباطات - Association Engine
 * Manages relationships and associations between letter meanings
 */
export type RelationType = 'causes' | 'caused_by' | 'requires' | 'leads_to' | 'related_to' | 'opposite_of';
export type AssociationStrength = 'weak' | 'moderate' | 'strong' | 'very_strong';
export interface MeaningAssociation {
    id: string;
    fromMeaning: string;
    toMeaning: string;
    relationType: RelationType;
    strength: AssociationStrength;
    confidence: number;
    examples: string[];
    bidirectional: boolean;
    timestamp: number;
}
export interface AssociationChain {
    meanings: string[];
    relations: RelationType[];
    totalStrength: number;
    averageConfidence: number;
}
export declare class AssociationEngine {
    private associations;
    private meaningIndex;
    private associationCounter;
    addAssociation(fromMeaning: string, toMeaning: string, relationType: RelationType, strength?: AssociationStrength, examples?: string[], bidirectional?: boolean): MeaningAssociation;
    private calculateConfidence;
    getAssociations(meaning: string): MeaningAssociation[];
    getAssociationsByType(meaning: string, relationType: RelationType): MeaningAssociation[];
    findRelatedMeanings(meaning: string, maxDepth?: number): string[];
    findAssociationChain(fromMeaning: string, toMeaning: string, maxDepth?: number): AssociationChain | null;
    private getStrengthValue;
    findOpposites(meaning: string): string[];
    findCauses(meaning: string): string[];
    findEffects(meaning: string): string[];
    addExample(associationId: string, example: string): boolean;
    updateStrength(associationId: string, newStrength: AssociationStrength): boolean;
    getStatistics(): {
        totalAssociations: number;
        typeDistribution: Record<RelationType, number>;
        strengthDistribution: Record<AssociationStrength, number>;
        bidirectionalCount: number;
        averageConfidence: number;
        totalMeanings: number;
    };
    clear(): void;
}
