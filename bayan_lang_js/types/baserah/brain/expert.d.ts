/**
 * نظام الخبير - Expert System
 *
 * الخبير يدير المعرفة المكتسبة والاستراتيجيات الناجحة
 * Expert manages acquired knowledge and successful strategies
 *
 * @author Al-Mubtakir
 * @version 1.0.0
 */
/**
 * قاعدة معرفة
 * Knowledge Entry
 */
export interface KnowledgeEntry {
    id: string;
    pattern: any;
    action: any;
    successRate: number;
    usageCount: number;
    lastUsed: Date;
    confidence: number;
    metadata?: any;
}
/**
 * قرار الخبير
 * Expert Decision
 */
export interface ExpertDecision {
    action: any;
    confidence: number;
    reasoning: string;
    knowledgeUsed: string[];
}
/**
 * فئة نظام الخبير
 * Expert System Class
 */
export declare class ExpertSystem {
    private knowledge;
    private learningRate;
    private confidenceThreshold;
    constructor(learningRate?: number, confidenceThreshold?: number);
    /**
     * إضافة معرفة جديدة
     * Add new knowledge
     */
    addKnowledge(entry: Omit<KnowledgeEntry, 'lastUsed' | 'usageCount'>): void;
    /**
     * تحديث معرفة موجودة
     * Update existing knowledge
     */
    updateKnowledge(id: string, updates: Partial<Omit<KnowledgeEntry, 'id'>>): boolean;
    /**
     * البحث عن معرفة مطابقة
     * Find matching knowledge
     */
    findMatchingKnowledge(pattern: any): KnowledgeEntry[];
    /**
     * اتخاذ قرار بناءً على المعرفة
     * Make decision based on knowledge
     */
    makeDecision(situation: any): ExpertDecision | null;
    /**
     * التعلم من النتيجة
     * Learn from outcome
     */
    learnFromOutcome(knowledgeId: string, success: boolean, reward?: number): boolean;
    /**
     * دمج قرارات متعددة
     * Merge multiple decisions
     */
    mergeDecisions(decisions: ExpertDecision[]): ExpertDecision;
    /**
     * الحصول على إحصائيات
     * Get statistics
     */
    getStatistics(): {
        totalKnowledge: number;
        averageSuccessRate: number;
        averageConfidence: number;
        mostUsed: KnowledgeEntry | null;
    };
    /**
     * مطابقة الأنماط (بسيطة)
     * Pattern matching (simple)
     */
    private patternsMatch;
    /**
     * مسح المعرفة القديمة
     * Clear old knowledge
     */
    clearOldKnowledge(daysOld?: number): number;
}
