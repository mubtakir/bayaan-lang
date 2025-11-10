/**
 * التكامل بين الخبير والمستكشف - Expert-Explorer Integration
 *
 * دماغ النظام = الخبير + المستكشف
 * System Brain = Expert + Explorer
 *
 * @author Al-Mubtakir
 * @version 1.0.0
 */
import { ExpertSystem } from './expert';
import { ExplorerSystem, ExplorationStrategy } from './explorer';
/**
 * قرار الدماغ
 * Brain Decision
 */
export interface BrainDecision {
    action: any;
    confidence: number;
    source: 'expert' | 'explorer' | 'hybrid';
    expertContribution: number;
    explorerContribution: number;
    reasoning: string;
}
/**
 * إعدادات الدماغ
 * Brain Settings
 */
export interface BrainSettings {
    expertWeight: number;
    explorerWeight: number;
    explorationStrategy: ExplorationStrategy;
    adaptiveWeights: boolean;
}
/**
 * فئة دماغ النظام
 * System Brain Class
 */
export declare class SystemBrain {
    private expert;
    private explorer;
    private settings;
    private decisionHistory;
    constructor(expertLearningRate?: number, explorationRate?: number, settings?: Partial<BrainSettings>);
    /**
     * تطبيع الأوزان
     * Normalize weights
     */
    private normalizeWeights;
    /**
     * اتخاذ قرار
     * Make decision
     */
    makeDecision(situation: any): BrainDecision;
    /**
     * دمج قرارات الخبير والمستكشف
     * Merge expert and explorer decisions
     */
    private mergeDecisions;
    /**
     * دمج الإجراءات
     * Merge actions
     */
    private mergeActions;
    /**
     * استخراج الاتجاه من الموقف
     * Extract direction from situation
     */
    private extractDirection;
    /**
     * تحديث الأوزان بناءً على الأداء
     * Update weights based on performance
     */
    private updateWeights;
    /**
     * التعلم من النتيجة
     * Learn from outcome
     */
    learnFromOutcome(decisionIndex: number, success: boolean, reward?: number): boolean;
    /**
     * الحصول على إحصائيات
     * Get statistics
     */
    getStatistics(): {
        expert: any;
        explorer: any;
        brain: {
            totalDecisions: number;
            expertWeight: number;
            explorerWeight: number;
            averageConfidence: number;
        };
    };
    /**
     * الحصول على الخبير
     * Get expert
     */
    getExpert(): ExpertSystem;
    /**
     * الحصول على المستكشف
     * Get explorer
     */
    getExplorer(): ExplorerSystem;
}
