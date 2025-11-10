/**
 * محلل النصوص باستخدام معاني الحروف
 * Text Analyzer using Letter Meanings
 *
 * يستخدم نظام سيماء الحروف لتحليل النصوص العربية بعمق
 * Uses letter semiotics system for deep Arabic text analysis
 */
/**
 * تحليل كلمة في النص
 * Word analysis in text
 */
export interface WordAnalysis {
    word: string;
    position: number;
    letterCount: number;
    meanings: string[];
    overallScore: number;
    balance: {
        positive: number;
        negative: number;
        material: number;
        psychological: number;
    };
    dominantTheme: string;
}
/**
 * تحليل جملة
 * Sentence analysis
 */
export interface SentenceAnalysis {
    sentence: string;
    wordCount: number;
    words: WordAnalysis[];
    overallMood: string;
    dominantMeanings: string[];
    coherenceScore: number;
    balanceScore: number;
}
/**
 * تحليل نص كامل
 * Full text analysis
 */
export interface TextAnalysis {
    text: string;
    sentenceCount: number;
    wordCount: number;
    letterCount: number;
    sentences: SentenceAnalysis[];
    overallTheme: string;
    dominantMeanings: string[];
    emotionalTone: string;
    coherenceScore: number;
    qualityScore: number;
}
/**
 * محرك تحليل النصوص
 * Text Analysis Engine
 */
export declare class TextAnalyzer {
    private letterEngine;
    private interactionEngine;
    constructor();
    /**
     * تحليل كلمة واحدة
     * Analyze a single word
     */
    analyzeWord(word: string, position?: number): WordAnalysis;
    /**
     * تحليل جملة
     * Analyze a sentence
     */
    analyzeSentence(sentence: string): SentenceAnalysis;
    /**
     * تحليل نص كامل
     * Analyze full text
     */
    analyzeText(text: string): TextAnalysis;
    /**
     * تحديد الموضوع السائد لكلمة
     */
    private determineDominantTheme;
    /**
     * إيجاد المعاني الأكثر تكراراً
     */
    private findDominantMeanings;
    /**
     * تحديد المزاج العام للجملة
     */
    private determineOverallMood;
    /**
     * حساب تماسك الجملة
     */
    private calculateSentenceCoherence;
    /**
     * حساب توازن الجملة
     */
    private calculateSentenceBalance;
    /**
     * تحديد الموضوع العام للنص
     */
    private determineOverallTheme;
    /**
     * تحديد النبرة العاطفية
     */
    private determineEmotionalTone;
    /**
     * حساب تماسك النص
     */
    private calculateTextCoherence;
    /**
     * حساب جودة النص
     */
    private calculateTextQuality;
}
