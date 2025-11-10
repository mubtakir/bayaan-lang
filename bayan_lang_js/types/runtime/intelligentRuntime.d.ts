/**
 * بيئة التشغيل الذكية - Intelligent Runtime
 * Intelligent runtime environment with dynamic causal inference and real-time learning
 */
import { CausalNetwork } from '../parser/intelligentAST.js';
import { IntelligentExecutionResult, RuntimeStatistics, IntelligentRuntimeSettings } from './intelligentRuntimeTypes.js';
/**
 * بيئة التشغيل الذكية - Intelligent Runtime
 */
export declare class IntelligentRuntime {
    private settings;
    private inferenceEngine;
    private learningSystem;
    private executionState;
    private causalNetwork;
    private stats;
    private executionTimes;
    private confidences;
    constructor(causalNetwork: CausalNetwork, settings?: Partial<IntelligentRuntimeSettings>);
    /**
     * تنفيذ ذكي - Execute Intelligently
     * Executes code with full AI intelligence
     */
    executeIntelligent(code: Function, args?: Map<string, any>): IntelligentExecutionResult;
    /**
     * حساب الثقة - Calculate Confidence
     */
    private calculateConfidence;
    /**
     * تحديث الإحصائيات - Update Statistics
     */
    private updateStatistics;
    /**
     * الحصول على الإحصائيات - Get Statistics
     */
    getStats(): RuntimeStatistics;
    /**
     * إعادة تعيين - Reset
     */
    reset(): void;
}
/**
 * مساعدات بيئة التشغيل الذكية - Intelligent Runtime Helpers
 */
export declare class IntelligentRuntimeHelpers {
    /**
     * طباعة ملخص النتيجة - Print Result Summary
     */
    static printSummary(result: IntelligentExecutionResult): string;
}
