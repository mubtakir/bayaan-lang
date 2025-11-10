/**
 * محرك الاستنتاج السببي الديناميكي - Dynamic Causal Inference Engine
 * Performs causal inference during runtime based on execution context
 */
import { CausalInference, InferenceResult, InferenceContext } from './intelligentRuntimeTypes.js';
/**
 * محرك الاستنتاج السببي الديناميكي - Dynamic Causal Inference Engine
 */
export declare class DynamicCausalInferenceEngine {
    private inferences;
    private rules;
    private inferenceCache;
    constructor();
    /**
     * استنتاج - Infer
     * Performs causal inference based on current execution context
     */
    infer(context: InferenceContext, maxInferences?: number): InferenceResult;
    /**
     * تحويل الاستنتاج إلى حافة سببية - Convert Inference to Causal Edge
     */
    private inferenceToEdge;
    /**
     * تهيئة القواعد - Initialize Rules
     */
    private initializeRules;
    /**
     * الحصول على جميع الاستنتاجات - Get All Inferences
     */
    getAllInferences(): CausalInference[];
    /**
     * مسح الاستنتاجات - Clear Inferences
     */
    clearInferences(): void;
}
