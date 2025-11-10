/**
 * محلل معاني الحروف - Letter Meaning Analyzer
 * Analyzes and manages meanings of Arabic letters
 */
export type MeaningType = 'psychological' | 'physical' | 'mixed';
export type ArticulationPoint = 'throat' | 'pharynx' | 'palate' | 'alveolar' | 'dental' | 'labial' | 'glottal';
export type ArticulationDepth = 'internal' | 'middle' | 'external';
export type MeaningSource = 'developer' | 'dictionary' | 'pattern' | 'context' | 'system';
export interface LetterMeaning {
    id: string;
    letter: string;
    meaning: string;
    opposite: string | null;
    examples: string[];
    strength: number;
    confidence: number;
    source: MeaningSource;
    wordsCount: number;
    timestamp: number;
}
export interface LetterProfile {
    letter: string;
    articulationPoint: ArticulationPoint;
    articulationDepth: ArticulationDepth;
    meaningType: MeaningType;
    meanings: LetterMeaning[];
    totalMeanings: number;
    averageStrength: number;
    averageConfidence: number;
}
export declare class LetterMeaningAnalyzer {
    private meanings;
    private profiles;
    private meaningCounter;
    private readonly articulationMap;
    private readonly depthMap;
    private readonly typeMap;
    addMeaning(letter: string, meaning: string, source?: MeaningSource, opposite?: string | null, examples?: string[], strength?: number, confidence?: number): LetterMeaning;
    private updateProfile;
    getMeanings(letter: string): LetterMeaning[];
    getProfile(letter: string): LetterProfile | null;
    findMeaningsByType(meaningType: MeaningType): LetterProfile[];
    findMeaningsByArticulation(articulationPoint: ArticulationPoint): LetterProfile[];
    updateMeaningStrength(letter: string, meaningId: string, newStrength: number): boolean;
    addExample(letter: string, meaningId: string, example: string): boolean;
    searchMeanings(query: string): LetterMeaning[];
    getStatistics(): {
        totalLetters: number;
        totalMeanings: number;
        averageMeaningsPerLetter: number;
        typeDistribution: Record<MeaningType, number>;
        sourceDistribution: Record<MeaningSource, number>;
        articulationDistribution: Record<ArticulationPoint, number>;
    };
    clear(): void;
}
