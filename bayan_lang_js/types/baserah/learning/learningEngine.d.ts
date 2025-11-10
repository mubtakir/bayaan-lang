/**
 * محرك التعلم الذكي - Intelligent Learning Engine
 * نظام تعلم ذكي يتعلم من التجارب والحوارات لتحسين الأداء
 */
export type LearningType = 'pattern_recognition' | 'response_optimization' | 'context_learning' | 'user_preference' | 'error_correction' | 'adaptive_behavior' | 'knowledge_acquisition';
export type ConfidenceLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
export type LearningOutcome = 'success' | 'failure' | 'partial' | 'unknown';
export interface LearningPattern {
    patternId: string;
    patternType: LearningType;
    description: string;
    conditions: Record<string, any>;
    actions: Record<string, any>;
    confidence: number;
    successCount: number;
    failureCount: number;
    lastUsed: number | null;
    createdAt: number;
    examples: any[];
    tags: string[];
}
export interface LearningExperience {
    experienceId: string;
    timestamp: number;
    context: Record<string, any>;
    action: string;
    outcome: LearningOutcome;
    feedback: string;
    patterns: string[];
    metadata: Record<string, any>;
}
export interface LearningStatistics {
    totalPatterns: number;
    totalExperiences: number;
    averageConfidence: number;
    successRate: number;
    patternsByType: Map<LearningType, number>;
    recentLearnings: number;
}
export declare class LearningEngine {
    private patterns;
    private experiences;
    private maxExperiences;
    private learningRate;
    private confidenceThreshold;
    constructor(options?: {
        maxExperiences?: number;
        learningRate?: number;
        confidenceThreshold?: number;
    });
    /**
     * إضافة نمط تعلم جديد
     */
    addPattern(patternId: string, patternType: LearningType, description: string, conditions: Record<string, any>, actions: Record<string, any>): LearningPattern;
    /**
     * الحصول على نمط
     */
    getPattern(patternId: string): LearningPattern | null;
    /**
     * إيجاد الأنماط المطابقة
     */
    findMatchingPatterns(context: Record<string, any>, patternType?: LearningType): LearningPattern[];
    /**
     * التحقق من تطابق الشروط
     */
    private matchesConditions;
    /**
     * تسجيل تجربة تعلم
     */
    recordExperience(context: Record<string, any>, action: string, outcome: LearningOutcome, feedback: string, patterns?: string[]): LearningExperience;
    /**
     * تحديث نمط من تجربة
     */
    private updatePatternFromExperience;
    /**
     * التعلم من التغذية الراجعة
     */
    learnFromFeedback(context: Record<string, any>, action: string, feedback: string, isPositive: boolean): LearningPattern | null;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): LearningStatistics;
    /**
     * مسح البيانات
     */
    clear(): void;
}
