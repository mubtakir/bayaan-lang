/**
 * محرك التفاعل بين الحروف - Letter Interaction Engine
 *
 * نظام متقدم لحساب التآزر والتفاعل بين الحروف في الكلمات العربية
 * Advanced system for calculating synergy and interaction between Arabic letters
 *
 * @module linguistics/letterInteractionEngine
 */
/**
 * نوع التفاعل بين حرفين
 * Type of interaction between two letters
 */
export declare enum InteractionType {
    SYNERGY = "\u062A\u0622\u0632\u0631",// الحروف تعزز بعضها
    CONFLICT = "\u062A\u0636\u0627\u062F",// الحروف تتعارض
    NEUTRAL = "\u0645\u062D\u0627\u064A\u062F",// لا تأثير واضح
    AMPLIFICATION = "\u062A\u0636\u062E\u064A\u0645",// الحرف الثاني يضخم الأول
    WEAKENING = "\u0625\u0636\u0639\u0627\u0641"
}
/**
 * نتيجة تحليل التفاعل بين حرفين
 * Result of analyzing interaction between two letters
 */
export interface LetterInteraction {
    letter1: string;
    letter2: string;
    type: InteractionType;
    strength: number;
    description: string;
}
/**
 * نموذج التوازن في الكلمة
 * Balance model for a word
 */
export interface WordBalance {
    word: string;
    positiveScore: number;
    negativeScore: number;
    materialScore: number;
    psychologicalScore: number;
    overallBalance: number;
    description: string;
}
/**
 * نموذج التدفق السببي
 * Causal flow model
 */
export interface CausalFlow {
    word: string;
    stages: CausalStage[];
    flowStrength: number;
    coherence: number;
}
/**
 * مرحلة في التدفق السببي
 * Stage in causal flow
 */
export interface CausalStage {
    position: number;
    letter: string;
    meaning: string;
    contribution: number;
}
/**
 * محرك التفاعل بين الحروف
 * Letter Interaction Engine
 */
export declare class LetterInteractionEngine {
    private letterEngine;
    private positiveWords;
    private negativeWords;
    private materialWords;
    private psychologicalWords;
    constructor();
    /**
     * حساب التآزر بين حرفين متجاورين
     * Calculate synergy between two adjacent letters
     */
    calculateSynergy(letter1: string, letter2: string): LetterInteraction;
    /**
     * حساب التشابه الدلالي بين مجموعتين من المعاني
     * Calculate semantic similarity between two sets of meanings
     */
    private calculateSemanticSimilarity;
    /**
     * حساب التكامل بين مجموعتين من المعاني
     * Calculate complementarity between two sets of meanings
     */
    private calculateComplementarity;
    /**
     * التحقق من التشابه بين معنيين
     * Check if two meanings are similar
     */
    private areSimilarMeanings;
    /**
     * استخراج الكلمات المفتاحية من معنى
     * Extract keywords from a meaning
     */
    private extractKeywords;
    /**
     * التحقق من الترادف بين كلمتين
     * Check if two words are synonyms
     */
    private areSynonyms;
    /**
     * التحقق من وجود علاقة منطقية بين معنيين
     * Check if there's a logical connection between two meanings
     */
    private hasLogicalConnection;
    /**
     * حساب توازن المعاني في كلمة
     * Calculate balance of meanings in a word
     */
    calculateBalance(word: string): WordBalance;
    private isPositiveMeaning;
    private isNegativeMeaning;
    private isMaterialMeaning;
    private isPsychologicalMeaning;
    /**
     * تحليل التدفق السببي في كلمة
     * Analyze causal flow in a word
     */
    analyzeCausalFlow(word: string): CausalFlow;
    /**
     * حساب مساهمة حرف في موقع معين
     * Calculate contribution of a letter at a specific position
     */
    private calculateContribution;
    /**
     * حساب قوة التدفق بين المراحل
     * Calculate flow strength between stages
     */
    private calculateFlowStrength;
    /**
     * حساب قوة الانتقال بين معنيين
     * Calculate transition strength between two meanings
     */
    private calculateTransitionStrength;
    /**
     * حساب التماسك بين المراحل
     * Calculate coherence between stages
     */
    private calculateCoherence;
    /**
     * تحليل شامل لكلمة
     * Comprehensive analysis of a word
     */
    analyzeWordInteraction(word: string): {
        word: string;
        interactions: LetterInteraction[];
        balance: WordBalance;
        flow: CausalFlow;
        overallScore: number;
    };
}
