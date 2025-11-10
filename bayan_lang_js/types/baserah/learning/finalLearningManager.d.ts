/**
 * مدير التعلم النهائي - Final Learning Manager
 * يدير جميع أنظمة التعلم ويوحدها في نظام واحد متكامل
 */
import { LearningStatistics } from './learningEngine';
import { PatternStatistics } from './patternRecognition';
import { AdaptiveStatistics } from './adaptiveLearning';
export interface LearningRequest {
    requestId: string;
    type: 'pattern' | 'adaptive' | 'feedback' | 'experience';
    data: any;
    context: Record<string, any>;
    priority: number;
}
export interface LearningResult {
    success: boolean;
    requestId: string;
    type: string;
    result: any;
    confidence: number;
    processingTime: number;
    metadata: Record<string, any>;
}
export interface ComprehensiveLearningStats {
    learningEngine: LearningStatistics;
    patternRecognition: PatternStatistics;
    adaptiveLearning: AdaptiveStatistics;
    totalLearningEvents: number;
    overallSuccessRate: number;
    systemHealth: number;
}
export declare class FinalLearningManager {
    private learningEngine;
    private patternRecognition;
    private adaptiveLearning;
    private learningEvents;
    private successfulEvents;
    private enabled;
    constructor(options?: {
        maxExperiences?: number;
        maxPatterns?: number;
        maxHistory?: number;
        learningRate?: number;
    });
    /**
     * معالجة طلب تعلم
     */
    processLearningRequest(request: LearningRequest): Promise<LearningResult>;
    /**
     * معالجة تعلم الأنماط
     */
    private handlePatternLearning;
    /**
     * معالجة التعلم التكيفي
     */
    private handleAdaptiveLearning;
    /**
     * معالجة تعلم التغذية الراجعة
     */
    private handleFeedbackLearning;
    /**
     * معالجة تعلم التجربة
     */
    private handleExperienceLearning;
    /**
     * التعلم من حوار
     */
    learnFromConversation(userMessage: string, aiResponse: string, userFeedback?: string, isPositive?: boolean): LearningResult[];
    /**
     * تحسين إجابة بناءً على التعلم
     */
    improveResponseWithLearning(response: string, context: Record<string, any>): string;
    /**
     * الحصول على الإحصائيات الشاملة
     */
    getComprehensiveStatistics(): ComprehensiveLearningStats;
    /**
     * تصدير المعرفة المتعلمة
     */
    exportLearning(): {
        patterns: any[];
        experiences: any[];
        rules: any[];
        statistics: ComprehensiveLearningStats;
    };
    /**
     * استيراد المعرفة المتعلمة
     */
    importLearning(data: {
        patterns?: any[];
        experiences?: any[];
        rules?: any[];
    }): boolean;
    /**
     * إعادة تعيين نظام التعلم
     */
    reset(): void;
    /**
     * تفعيل/تعطيل نظام التعلم
     */
    setEnabled(enabled: boolean): void;
    /**
     * التحقق من حالة النظام
     */
    isEnabled(): boolean;
}
