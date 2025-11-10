/**
 * محرك الفهم العميق للنصوص العربية
 * Deep Understanding Engine for Arabic Texts
 *
 * يستخدم سيماء الحروف لفهم عميق للنصوص
 * Uses letter semiotics for deep text understanding
 */
/**
 * رؤية عميقة للنص
 * Deep insight into text
 */
export interface DeepInsight {
    text: string;
    surfaceMeaning: string;
    deepMeaning: string;
    hiddenThemes: string[];
    emotionalLayers: EmotionalLayer[];
    symbolicMeanings: string[];
    psychologicalProfile: PsychologicalProfile;
    recommendations: string[];
}
/**
 * طبقة عاطفية
 * Emotional layer
 */
export interface EmotionalLayer {
    level: 'surface' | 'middle' | 'deep';
    emotions: string[];
    intensity: number;
    description: string;
}
/**
 * الملف النفسي
 * Psychological profile
 */
export interface PsychologicalProfile {
    dominantTraits: string[];
    emotionalState: string;
    mentalState: string;
    motivations: string[];
    conflicts: string[];
}
/**
 * تفسير حلم/رؤيا
 * Dream interpretation
 */
export interface DreamInterpretation {
    dream: string;
    symbols: DreamSymbol[];
    overallMeaning: string;
    warnings: string[];
    goodOmens: string[];
    interpretation: string;
}
/**
 * رمز في الحلم
 * Dream symbol
 */
export interface DreamSymbol {
    word: string;
    letterMeanings: string[];
    symbolicMeaning: string;
    interpretation: string;
}
/**
 * محرك الفهم العميق
 * Deep Understanding Engine
 */
export declare class DeepUnderstandingEngine {
    private letterEngine;
    private interactionEngine;
    private textAnalyzer;
    constructor();
    /**
     * فهم عميق للنص
     * Deep understanding of text
     */
    analyzeDeep(text: string): DeepInsight;
    /**
     * تفسير حلم/رؤيا
     * Interpret a dream
     */
    interpretDream(dream: string): DreamInterpretation;
    /**
     * استخراج المعنى السطحي
     */
    private extractSurfaceMeaning;
    /**
     * استخراج المعنى العميق
     */
    private extractDeepMeaning;
    /**
     * اكتشاف الموضوعات المخفية
     */
    private discoverHiddenThemes;
    /**
     * تحليل الطبقات العاطفية
     */
    private analyzeEmotionalLayers;
    /**
     * استخراج المعاني الرمزية
     */
    private extractSymbolicMeanings;
    /**
     * بناء الملف النفسي
     */
    private buildPsychologicalProfile;
    /**
     * توليد التوصيات
     */
    private generateRecommendations;
    private extractMiddleEmotions;
    private extractDeepEmotions;
    private extractDominantTraits;
    private extractMotivations;
    private extractConflicts;
    private applyDreamInterpretationRule;
    private interpretSymbol;
    private synthesizeDreamMeaning;
    private extractWarnings;
    private extractGoodOmens;
    private generateDreamInterpretation;
}
