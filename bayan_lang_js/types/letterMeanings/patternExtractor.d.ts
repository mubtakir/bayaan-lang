/**
 * مستخرج الأنماط - Pattern Extractor
 * Extracts patterns from words based on letter meanings
 */
export type PatternType = 'prefix' | 'suffix' | 'infix' | 'root' | 'combination';
export type PatternStrength = 'weak' | 'moderate' | 'strong' | 'very_strong';
export interface LetterPattern {
    id: string;
    pattern: string;
    type: PatternType;
    letters: string[];
    meaning: string;
    examples: string[];
    frequency: number;
    strength: PatternStrength;
    confidence: number;
    timestamp: number;
}
export interface PatternMatch {
    pattern: LetterPattern;
    word: string;
    position: number;
    matchedLetters: string[];
    confidence: number;
}
export declare class PatternExtractor {
    private patterns;
    private patternCounter;
    addPattern(pattern: string, type: PatternType, meaning: string, examples?: string[], strength?: PatternStrength): LetterPattern;
    private calculateConfidence;
    extractPatterns(word: string): PatternMatch[];
    private matchPattern;
    private matchPrefix;
    private matchSuffix;
    private matchInfix;
    private matchRoot;
    private matchCombination;
    findPatternsByType(type: PatternType): LetterPattern[];
    findPatternsByStrength(strength: PatternStrength): LetterPattern[];
    getPattern(id: string): LetterPattern | null;
    updatePatternFrequency(id: string, newExample: string): boolean;
    getStatistics(): {
        totalPatterns: number;
        typeDistribution: Record<PatternType, number>;
        strengthDistribution: Record<PatternStrength, number>;
        averageFrequency: number;
        averageConfidence: number;
    };
    clear(): void;
}
