/**
 * نظام التعلم التكيفي - Adaptive Learning System
 * نظام ذكي يتكيف مع التغذية الراجعة ويحسّن الإجابات
 */
export type ImprovementStrategy = 'expand' | 'simplify' | 'add_examples' | 'restructure' | 'change_style' | 'add_context' | 'enhance_clarity';
export type ImprovementLevel = 'minor' | 'moderate' | 'major' | 'complete_rewrite';
export interface ImprovementRule {
    ruleId: string;
    name: string;
    description: string;
    strategy: ImprovementStrategy;
    conditions: Record<string, any>;
    transformations: Record<string, any>;
    priority: number;
    successRate: number;
    usageCount: number;
    enabled: boolean;
}
export interface AdaptiveResponse {
    originalResponse: string;
    improvedResponse: string;
    appliedRules: string[];
    improvementLevel: ImprovementLevel;
    confidence: number;
    reasoning: string;
}
export interface PerformanceMetrics {
    completeness: number;
    clarity: number;
    relevance: number;
    accuracy: number;
    userSatisfaction: number;
}
export interface AdaptiveStatistics {
    totalRules: number;
    activeRules: number;
    totalImprovements: number;
    averageSuccessRate: number;
    rulesByStrategy: Map<ImprovementStrategy, number>;
    recentImprovements: number;
}
export declare class AdaptiveLearningSystem {
    private rules;
    private improvementHistory;
    private maxHistory;
    private adaptationRate;
    constructor(options?: {
        maxHistory?: number;
        adaptationRate?: number;
    });
    /**
     * تهيئة القواعد الافتراضية
     */
    private initializeDefaultRules;
    /**
     * إضافة قاعدة تحسين
     */
    addRule(ruleId: string, name: string, description: string, strategy: ImprovementStrategy, conditions: Record<string, any>, transformations: Record<string, any>, priority?: number): ImprovementRule;
    /**
     * تحسين الإجابة بشكل تكيفي
     */
    improveResponse(response: string, context: Record<string, any>, performanceMetrics?: PerformanceMetrics): AdaptiveResponse;
    /**
     * إيجاد القواعد المطبقة
     */
    private findApplicableRules;
    /**
     * التحقق من تطابق الشروط
     */
    private matchesConditions;
    /**
     * تطبيق قاعدة على الإجابة
     */
    private applyRule;
    /**
     * توسيع الإجابة
     */
    private expandResponse;
    /**
     * تبسيط الإجابة
     */
    private simplifyResponse;
    /**
     * إضافة أمثلة
     */
    private addExamples;
    /**
     * تحسين الوضوح
     */
    private enhanceClarity;
    /**
     * تحديد مستوى التحسين
     */
    private determineImprovementLevel;
    /**
     * توليد التفسير
     */
    private generateReasoning;
    /**
     * تسجيل نجاح التحسين
     */
    recordSuccess(ruleId: string): void;
    /**
     * تسجيل فشل التحسين
     */
    recordFailure(ruleId: string): void;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): AdaptiveStatistics;
    /**
     * مسح البيانات
     */
    clear(): void;
}
