/**
 * API للتكامل مع بصيرة AI
 * API for Baserah AI Integration
 *
 * يوفر واجهة برمجية للتكامل مع نظام بصيرة AI
 * Provides API interface for Baserah AI integration
 */
import { TextAnalysis } from '../baserah/ai/textAnalyzer';
import { GenerationCriteria, GeneratedText } from '../baserah/ai/textGenerator';
import { DeepInsight, DreamInterpretation } from '../baserah/ai/deepUnderstandingEngine';
/**
 * طلب تحليل نص
 * Text analysis request
 */
export interface AnalysisRequest {
    text: string;
    analysisType: 'basic' | 'deep' | 'dream';
    options?: {
        includeLetterMeanings?: boolean;
        includeInteractions?: boolean;
        includePsychologicalProfile?: boolean;
    };
}
/**
 * استجابة تحليل نص
 * Text analysis response
 */
export interface AnalysisResponse {
    success: boolean;
    data?: TextAnalysis | DeepInsight | DreamInterpretation;
    error?: string;
    timestamp: number;
}
/**
 * طلب توليد نص
 * Text generation request
 */
export interface GenerationRequest {
    criteria: GenerationCriteria;
    options?: {
        returnAlternatives?: boolean;
        alternativesCount?: number;
    };
}
/**
 * استجابة توليد نص
 * Text generation response
 */
export interface GenerationResponse {
    success: boolean;
    data?: GeneratedText;
    alternatives?: GeneratedText[];
    error?: string;
    timestamp: number;
}
/**
 * طلب معاني حرف
 * Letter meanings request
 */
export interface LetterMeaningsRequest {
    letter: string;
}
/**
 * استجابة معاني حرف
 * Letter meanings response
 */
export interface LetterMeaningsResponse {
    success: boolean;
    data?: {
        letter: string;
        meanings: string[];
        category: string;
    };
    error?: string;
    timestamp: number;
}
/**
 * API بصيرة
 * Baserah API
 */
export declare class BaserahAPI {
    private textAnalyzer;
    private textGenerator;
    private deepEngine;
    private letterEngine;
    private interactionEngine;
    constructor();
    /**
     * تحليل نص
     * Analyze text
     */
    analyzeText(request: AnalysisRequest): Promise<AnalysisResponse>;
    /**
     * توليد نص
     * Generate text
     */
    generateText(request: GenerationRequest): Promise<GenerationResponse>;
    /**
     * الحصول على معاني حرف
     * Get letter meanings
     */
    getLetterMeanings(request: LetterMeaningsRequest): Promise<LetterMeaningsResponse>;
    /**
     * تحليل تفاعل كلمة
     * Analyze word interaction
     */
    analyzeWordInteraction(word: string): Promise<any>;
    /**
     * الحصول على إحصائيات النظام
     * Get system statistics
     */
    getSystemStats(): Promise<any>;
    /**
     * معالجة دفعة من النصوص
     * Process batch of texts
     */
    processBatch(texts: string[], analysisType: 'basic' | 'deep' | 'dream'): Promise<any>;
    /**
     * البحث عن كلمات بمعنى محدد
     * Search for words with specific meaning
     */
    searchWordsByMeaning(meaning: string): Promise<any>;
    /**
     * مقارنة بين نصين
     * Compare two texts
     */
    compareTexts(text1: string, text2: string): Promise<any>;
    /**
     * حساب التشابه بين نصين
     */
    private calculateSimilarity;
    /**
     * إيجاد الفروقات بين نصين
     */
    private findDifferences;
}
export declare const baserahAPI: BaserahAPI;
