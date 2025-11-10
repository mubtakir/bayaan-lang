/**
 * الرموز الذكية - Intelligent Tokens
 * Extended tokens with AI intelligence from Baserah systems
 */
import { Token } from './tokens.js';
import { LetterMeaning, LetterProfile } from '../baserah/linguistics/letterMeanings/letterMeaningAnalyzer';
import { WordRoot, RootType } from '../lexicon/rootAnalyzer.js';
import { Derivation } from '../lexicon/derivationGenerator.js';
import { EnglishWordRoot } from '../lexicon/englishRootAnalyzer.js';
import { EnglishDerivation } from '../lexicon/englishDerivationGenerator.js';
/**
 * نوع دلالي للرمز
 * Semantic type of the token
 */
export type SemanticType = 'PERSON_NAME' | 'PLACE_NAME' | 'OBJECT_THING' | 'OBJECT_FOOD' | 'EVENT_ACTION' | 'STATE_CONDITION' | 'PROPERTY_TRAIT' | 'CONCEPT_ABSTRACT' | 'KEYWORD' | 'OPERATOR' | 'LITERAL' | 'UNKNOWN';
/**
 * لغة الرمز
 * Token language
 */
export type TokenLanguage = 'arabic' | 'english' | 'mixed' | 'neutral';
/**
 * تحليل الحروف للرمز
 * Letter analysis for the token
 */
export interface LetterAnalysis {
    letters: string[];
    meanings: string[];
    profiles: (LetterProfile | null)[];
    letterMeanings: LetterMeaning[][];
    combinedMeaning: string;
    personality?: string;
    confidence: number;
}
/**
 * معلومات الجذر
 * Root information
 */
export interface RootInfo {
    root: string;
    type: RootType | string;
    confidence: number;
    language: TokenLanguage;
    arabicRoot?: WordRoot;
    englishRoot?: EnglishWordRoot;
}
/**
 * معلومات الاشتقاقات
 * Derivations information
 */
export interface DerivationsInfo {
    derivations: string[];
    count: number;
    language: TokenLanguage;
    arabicDerivations?: Derivation[];
    englishDerivations?: EnglishDerivation[];
}
/**
 * معلومات سببية
 * Causal information
 */
export interface CausalInfo {
    isEvent: boolean;
    causes: Map<string, number>;
    prevents: Map<string, number>;
    enhances: Map<string, number>;
    requires: string[];
    confidence: number;
}
/**
 * الرمز الذكي - Intelligent Token
 * Extended token with AI intelligence
 */
export interface IntelligentToken extends Token {
    semanticType: SemanticType;
    language: TokenLanguage;
    letterAnalysis?: LetterAnalysis;
    rootInfo?: RootInfo;
    derivationsInfo?: DerivationsInfo;
    causalInfo?: CausalInfo;
    relatedTokens?: string[];
    confidence: number;
    metadata: Map<string, any>;
}
/**
 * إعدادات التحليل الذكي
 * Intelligent analysis settings
 */
export interface IntelligentAnalysisSettings {
    enableLetterAnalysis: boolean;
    enableRootAnalysis: boolean;
    enableDerivations: boolean;
    enableCausalAnalysis: boolean;
    enableSemanticDetection: boolean;
    minConfidence: number;
    maxDerivations: number;
    cacheResults: boolean;
    parallelProcessing: boolean;
}
/**
 * الإعدادات الافتراضية
 * Default settings
 */
export declare const DEFAULT_INTELLIGENT_SETTINGS: IntelligentAnalysisSettings;
/**
 * نتيجة التحليل الذكي
 * Intelligent analysis result
 */
export interface IntelligentAnalysisResult {
    token: IntelligentToken;
    analysisTime: number;
    cacheHit: boolean;
    warnings: string[];
    suggestions: string[];
}
/**
 * إحصائيات التحليل الذكي
 * Intelligent analysis statistics
 */
export interface IntelligentAnalysisStats {
    totalTokens: number;
    intelligentTokens: number;
    cacheHits: number;
    cacheMisses: number;
    averageAnalysisTime: number;
    totalAnalysisTime: number;
    languageDistribution: {
        arabic: number;
        english: number;
        mixed: number;
        neutral: number;
    };
    semanticDistribution: Map<SemanticType, number>;
}
/**
 * مساعدات للرموز الذكية
 * Intelligent token helpers
 */
export declare class IntelligentTokenHelpers {
    /**
     * إنشاء رمز ذكي من رمز تقليدي
     */
    static createIntelligentToken(token: Token): IntelligentToken;
    /**
     * التحقق من أن الرمز ذكي
     */
    static isIntelligent(token: Token | IntelligentToken): token is IntelligentToken;
    /**
     * دمج معلومات ذكية في رمز
     */
    static enrichToken(token: Token, semanticType: SemanticType, language: TokenLanguage, confidence: number, additionalInfo?: Partial<IntelligentToken>): IntelligentToken;
    /**
     * حساب مستوى الثقة الإجمالي
     */
    static calculateOverallConfidence(token: IntelligentToken): number;
    /**
     * الحصول على ملخص نصي للرمز الذكي
     */
    static getSummary(token: IntelligentToken): string;
}
