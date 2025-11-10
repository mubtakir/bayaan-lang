/**
 * مولد النصوص الذكي باستخدام معاني الحروف
 * Intelligent Text Generator using Letter Meanings
 *
 * يولد نصوصاً عربية بناءً على معاني محددة
 * Generates Arabic texts based on specific meanings
 */
/**
 * معايير توليد النص
 * Text generation criteria
 */
export interface GenerationCriteria {
    targetMeanings: string[];
    mood?: 'positive' | 'negative' | 'neutral';
    theme?: 'psychological' | 'material' | 'balanced';
    minWords?: number;
    maxWords?: number;
    coherenceLevel?: number;
}
/**
 * كلمة مولدة
 * Generated word
 */
export interface GeneratedWord {
    word: string;
    score: number;
    matchedMeanings: string[];
    balance: {
        positive: number;
        negative: number;
        material: number;
        psychological: number;
    };
}
/**
 * نص مولد
 * Generated text
 */
export interface GeneratedText {
    text: string;
    words: GeneratedWord[];
    criteria: GenerationCriteria;
    matchScore: number;
    coherenceScore: number;
    qualityScore: number;
}
/**
 * محرك توليد النصوص
 * Text Generation Engine
 */
export declare class TextGenerator {
    private letterEngine;
    private interactionEngine;
    private arabicWords;
    constructor();
    /**
     * توليد نص بناءً على معايير محددة
     * Generate text based on specific criteria
     */
    generateText(criteria: GenerationCriteria): GeneratedText;
    /**
     * توليد كلمة بناءً على معنى محدد
     * Generate a word based on specific meaning
     */
    generateWordForMeaning(meaning: string): GeneratedWord | null;
    /**
     * إيجاد الكلمات المطابقة للمعايير
     */
    private findMatchingWords;
    /**
     * اختيار أفضل الكلمات
     */
    private selectBestWords;
    /**
     * ترتيب الكلمات لتحقيق أفضل تماسك
     */
    private orderWordsForCoherence;
    /**
     * حساب درجة المطابقة
     */
    private calculateMatchScore;
    /**
     * حساب درجة التماسك
     */
    private calculateCoherenceScore;
    /**
     * إضافة كلمات جديدة للقاموس
     */
    addWords(words: string[]): void;
    /**
     * الحصول على القاموس الحالي
     */
    getVocabulary(): string[];
}
