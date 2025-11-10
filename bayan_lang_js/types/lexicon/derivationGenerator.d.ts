/**
 * مولد الاشتقاقات - Derivation Generator
 * Generates word derivations from roots
 */
export type DerivationType = 'verb' | 'noun' | 'adjective' | 'adverb' | 'active_participle' | 'passive_participle' | 'verbal_noun' | 'comparative';
export type DerivationForm = 'form_i' | 'form_ii' | 'form_iii' | 'form_iv' | 'form_v' | 'form_vi' | 'form_vii' | 'form_viii';
export interface Derivation {
    id: string;
    root: string;
    word: string;
    type: DerivationType;
    form: DerivationForm | null;
    pattern: string;
    meaning: string;
    confidence: number;
    timestamp: number;
}
export interface DerivationRule {
    form: DerivationForm;
    pattern: string;
    type: DerivationType;
    example: string;
}
export declare class DerivationGenerator {
    private derivations;
    private derivationCounter;
    private readonly patterns;
    generateDerivation(root: string, type: DerivationType, form?: DerivationForm, meaning?: string): Derivation;
    private applyPattern;
    generateAllForms(root: string): Derivation[];
    findDerivationsByRoot(root: string): Derivation[];
    findDerivationsByType(type: DerivationType): Derivation[];
    getDerivation(id: string): Derivation | null;
    getStatistics(): {
        totalDerivations: number;
        typeDistribution: Record<DerivationType, number>;
        formDistribution: Record<DerivationForm, number>;
        averageConfidence: number;
    };
    clear(): void;
}
