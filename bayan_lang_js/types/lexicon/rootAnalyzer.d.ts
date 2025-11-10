/**
 * محلل الجذور - Root Analyzer
 * Analyzes Arabic word roots and patterns
 */
export type RootType = 'trilateral' | 'quadrilateral' | 'quinqueliteral';
export type RootPattern = 'فعل' | 'فعال' | 'فاعل' | 'مفعول' | 'فعيل' | 'فعلان' | 'فعلى';
export interface WordRoot {
    id: string;
    root: string;
    type: RootType;
    letters: string[];
    pattern: RootPattern | null;
    confidence: number;
    timestamp: number;
}
export interface RootFamily {
    root: string;
    words: string[];
    commonMeaning: string;
    derivations: number;
}
export declare class RootAnalyzer {
    private roots;
    private families;
    private rootCounter;
    private readonly removableLetters;
    analyzeRoot(word: string): WordRoot;
    private removeDiacritics;
    private extractRootLetters;
    private reduceToThreeLetters;
    private determineRootType;
    private detectPattern;
    private calculateConfidence;
    private updateFamily;
    getRoot(word: string): WordRoot | null;
    getRootFamily(root: string): RootFamily | null;
    findRelatedWords(word: string): string[];
    getStatistics(): {
        totalRoots: number;
        totalFamilies: number;
        averageDerivations: number;
        rootTypeDistribution: Record<RootType, number>;
    };
    clear(): void;
}
