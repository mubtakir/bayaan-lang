/**
 * محرك تحليل الحروف والكلمات
 * Letter and Word Analysis Engine
 *
 * يطبق نظرية العلاقات السببية بين معاني الحروف
 * Applies the theory of causal relationships between letter meanings
 */
import { CausalEngine } from '../../logic/causalEngine';
/**
 * نوع المعنى - Meaning Type
 */
export declare enum MeaningType {
    PRIMARY = "\u0623\u0633\u0627\u0633\u064A",// Primary meaning
    SECONDARY = "\u062B\u0627\u0646\u0648\u064A",// Secondary meaning
    OPPOSITE = "\u0639\u0643\u0633\u064A",// Opposite meaning
    RESULT = "\u0646\u062A\u064A\u062C\u0629",// Result/consequence
    CAUSE = "\u0633\u0628\u0628",// Cause/reason
    MECHANISM = "\u0622\u0644\u064A\u0629"
}
/**
 * موضع المعنى في الكلمة - Meaning Position
 */
export declare enum MeaningPosition {
    BEGINNING = "\u0628\u062F\u0627\u064A\u0629",// At the beginning
    MIDDLE = "\u0648\u0633\u0637",// In the middle
    END = "\u0646\u0647\u0627\u064A\u0629",// At the end
    THROUGHOUT = "\u0634\u0627\u0645\u0644"
}
/**
 * معنى الحرف - Letter Meaning
 */
export declare class LetterMeaning {
    letter: string;
    meaning: string;
    type: MeaningType;
    weight: number;
    examples: string[];
    constructor(letter: string, // الحرف - The letter
    meaning: string, // المعنى - The meaning
    type: MeaningType, // نوع المعنى - Meaning type
    weight?: number, // الوزن/القوة (0-1) - Weight/strength
    examples?: string[]);
    toString(): string;
}
/**
 * تحليل الكلمة - Word Analysis
 */
export declare class WordAnalysis {
    word: string;
    letters: string[];
    letterMeanings: Map<string, string[]>;
    wordMeanings: string[];
    causalChain: string[];
    confidence: number;
    constructor(word: string, // الكلمة - The word
    letters: string[], // الحروف - The letters
    letterMeanings: Map<string, string[]>, // معاني كل حرف - Meanings of each letter
    wordMeanings: string[], // معاني الكلمة المستنتجة - Inferred word meanings
    causalChain: string[], // السلسلة السببية - Causal chain
    confidence: number);
    toString(): string;
}
/**
 * محرك تحليل الحروف
 * Letter Analysis Engine
 */
export declare class LetterEngine {
    private letterMeanings;
    private causalEngine;
    constructor();
    /**
     * بناء العلاقات السببية من المعاني
     * Build causal relations from meanings
     */
    private buildCausalRelations;
    /**
     * تهيئة معاني الحروف العربية
     * Initialize Arabic letter meanings
     *
     * المعاني مستمدة من بحث 40 سنة في سيماء الحروف
     * Meanings derived from 40 years of research in letter semiotics
     */
    private initializeArabicLetters;
    /**
     * إضافة معنى لحرف
     * Add meaning to a letter
     */
    addLetterMeaning(letter: string, meaning: string, type: MeaningType, weight?: number, examples?: string[]): void;
    /**
     * الحصول على معاني حرف
     * Get meanings of a letter
     */
    getLetterMeanings(letter: string): LetterMeaning[];
    /**
     * تحليل كلمة
     * Analyze a word
     */
    analyzeWord(word: string): WordAnalysis;
    /**
     * بناء السلسلة السببية من المعاني
     * Build causal chain from meanings
     */
    private buildCausalChain;
    /**
     * استنتاج معاني الكلمة من معاني حروفها
     * Infer word meanings from letter meanings
     */
    private inferWordMeanings;
    /**
     * حساب درجة الثقة في التحليل
     * Calculate confidence in the analysis
     */
    private calculateConfidence;
    /**
     * الحصول على المحرك السببي
     * Get the causal engine
     */
    getCausalEngine(): CausalEngine;
}
