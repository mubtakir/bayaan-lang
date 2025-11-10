/**
 * مدير معاني الحروف - Letter Meanings Manager
 * Integrates all letter meanings components
 */
import { LetterMeaningAnalyzer, LetterMeaning, LetterProfile, MeaningType, ArticulationPoint, MeaningSource } from './letterMeaningAnalyzer';
import { PatternExtractor, LetterPattern, PatternMatch, PatternType, PatternStrength } from './patternExtractor';
import { AssociationEngine, MeaningAssociation, AssociationChain, RelationType, AssociationStrength } from './associationEngine';
export interface LetterAnalysis {
    letter: string;
    profile: LetterProfile | null;
    meanings: LetterMeaning[];
    patterns: PatternMatch[];
    associations: MeaningAssociation[];
    relatedMeanings: string[];
}
export interface WordAnalysis {
    word: string;
    letters: string[];
    patterns: PatternMatch[];
    letterMeanings: Map<string, LetterMeaning[]>;
    dominantMeaningType: MeaningType | null;
    confidence: number;
}
export interface LetterMeaningsSettings {
    autoExtractPatterns: boolean;
    autoCreateAssociations: boolean;
    minPatternConfidence: number;
    maxRelatedDepth: number;
}
export declare class LetterMeaningsManager {
    private analyzer;
    private patternExtractor;
    private associationEngine;
    private settings;
    constructor(settings?: Partial<LetterMeaningsSettings>);
    addLetterMeaning(letter: string, meaning: string, source?: MeaningSource, opposite?: string | null, examples?: string[], strength?: number, confidence?: number): LetterMeaning;
    addPattern(pattern: string, type: PatternType, meaning: string, examples?: string[], strength?: PatternStrength): LetterPattern;
    addAssociation(fromMeaning: string, toMeaning: string, relationType: RelationType, strength?: AssociationStrength, examples?: string[], bidirectional?: boolean): MeaningAssociation;
    analyzeLetter(letter: string): LetterAnalysis;
    analyzeWord(word: string): WordAnalysis;
    findMeaningChain(fromMeaning: string, toMeaning: string, maxDepth?: number): AssociationChain | null;
    searchMeanings(query: string): LetterMeaning[];
    getLetterProfile(letter: string): LetterProfile | null;
    findLettersByType(meaningType: MeaningType): LetterProfile[];
    findLettersByArticulation(articulationPoint: ArticulationPoint): LetterProfile[];
    updateSettings(newSettings: Partial<LetterMeaningsSettings>): void;
    getSettings(): LetterMeaningsSettings;
    getAnalyzer(): LetterMeaningAnalyzer;
    getPatternExtractor(): PatternExtractor;
    getAssociationEngine(): AssociationEngine;
    getStatistics(): {
        analyzer: ReturnType<LetterMeaningAnalyzer['getStatistics']>;
        patterns: ReturnType<PatternExtractor['getStatistics']>;
        associations: ReturnType<AssociationEngine['getStatistics']>;
    };
    clearAll(): void;
}
