/**
 * نظام التعرف على الأنماط - Pattern Recognition System
 * يتعرف على الأنماط في البيانات والسلوكيات
 */
export type PatternCategory = 'sequential' | 'frequency' | 'correlation' | 'anomaly' | 'temporal';
export interface RecognizedPattern {
    patternId: string;
    category: PatternCategory;
    description: string;
    confidence: number;
    occurrences: number;
    firstSeen: number;
    lastSeen: number;
    features: Record<string, any>;
    examples: any[];
}
export interface PatternMatch {
    pattern: RecognizedPattern;
    matchScore: number;
    matchedFeatures: string[];
    context: Record<string, any>;
}
export interface PatternStatistics {
    totalPatterns: number;
    patternsByCategory: Map<PatternCategory, number>;
    averageConfidence: number;
    mostFrequentPattern: RecognizedPattern | null;
    recentPatterns: RecognizedPattern[];
}
export declare class PatternRecognitionEngine {
    private patterns;
    private minOccurrences;
    private minConfidence;
    private maxPatterns;
    constructor(options?: {
        minOccurrences?: number;
        minConfidence?: number;
        maxPatterns?: number;
    });
    /**
     * إضافة نمط معروف
     */
    addPattern(patternId: string, category: PatternCategory, description: string, features: Record<string, any>): RecognizedPattern;
    /**
     * التعرف على نمط في البيانات
     */
    recognizePattern(data: any[], category?: PatternCategory): RecognizedPattern | null;
    /**
     * استخراج الميزات من البيانات
     */
    private extractFeatures;
    /**
     * إيجاد نمط مطابق
     */
    private findMatchingPattern;
    /**
     * حساب التشابه بين مجموعتي ميزات
     */
    private calculateSimilarity;
    /**
     * اكتشاف فئة النمط
     */
    private detectCategory;
    /**
     * توليد وصف للنمط
     */
    private generateDescription;
    /**
     * الحصول على العنصر الأكثر تكراراً
     */
    private getMostFrequent;
    /**
     * التحقق من التسلسل
     */
    private isSequential;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): PatternStatistics;
    /**
     * مسح البيانات
     */
    clear(): void;
}
