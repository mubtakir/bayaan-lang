/**
 * محرك الاستدلال الموحد - Unified Inference Engine
 *
 * يجمع جميع أنواع الاستدلال في محرك واحد:
 * - الاستدلال المنطقي (Logic)
 * - الاستدلال السببي (Causal)
 * - الاستدلال اللغوي (Linguistic)
 * - الاستدلال المعرفي (Knowledge)
 */
import { LogicEngine } from '../logic/logicEngine';
import { CausalEngine } from '../logic/causalEngine';
import { LetterEngine } from '../baserah/linguistics/letterEngine';
import { InferenceEngine, Inference } from '../baserah/knowledge/inferenceEngine';
import { ThingEngine } from '../baserah/knowledge/thingEngine';
import { EventEngine } from '../baserah/knowledge/eventEngine';
import { EquationEngine } from '../baserah/knowledge/equationEngine';
/**
 * نوع الاستدلال المطلوب
 * Type of inference requested
 */
export declare enum QueryType {
    LOGIC = "logic",// استدلال منطقي
    CAUSAL = "causal",// استدلال سببي
    LINGUISTIC = "linguistic",// استدلال لغوي
    KNOWLEDGE = "knowledge",// استدلال معرفي
    ALL = "all"
}
/**
 * نتيجة الاستدلال الموحد
 * Unified inference result
 */
export declare class UnifiedInferenceResult {
    queryType: QueryType;
    question: string;
    logicResults: any[];
    causalResults: any[];
    linguisticResults: any[];
    knowledgeResults: Inference[];
    confidence: number;
    explanation: string;
    constructor(queryType: QueryType, question: string, logicResults?: any[], causalResults?: any[], linguisticResults?: any[], knowledgeResults?: Inference[], confidence?: number, explanation?: string);
    /**
     * هل هناك نتائج؟
     * Are there any results?
     */
    hasResults(): boolean;
    /**
     * عدد النتائج الكلي
     * Total number of results
     */
    totalResults(): number;
    toString(): string;
}
/**
 * محرك الاستدلال الموحد
 * Unified Inference Engine
 */
export declare class UnifiedInferenceEngine {
    private logicEngine;
    private causalEngine;
    private letterEngine;
    private inferenceEngine;
    private thingEngine;
    private eventEngine;
    private equationEngine;
    constructor(logicEngine?: LogicEngine, causalEngine?: CausalEngine, letterEngine?: LetterEngine, inferenceEngine?: InferenceEngine, thingEngine?: ThingEngine, eventEngine?: EventEngine, equationEngine?: EquationEngine);
    /**
     * استعلام موحد
     * Unified query
     *
     * يبحث في جميع الأنظمة ويجمع النتائج
     */
    query(question: string, queryType?: QueryType): UnifiedInferenceResult;
    /**
     * استدلال منطقي
     * Logic inference
     */
    private queryLogic;
    /**
     * استدلال سببي
     * Causal inference
     */
    private queryCausal;
    /**
     * استدلال لغوي
     * Linguistic inference
     */
    private queryLinguistic;
    /**
     * استدلال معرفي
     * Knowledge inference
     */
    private queryKnowledge;
    /**
     * حساب درجة الثقة الإجمالية
     * Calculate overall confidence
     */
    private calculateConfidence;
    /**
     * توليد التفسير
     * Generate explanation
     */
    private generateExplanation;
    getLogicEngine(): LogicEngine;
    getCausalEngine(): CausalEngine;
    getLetterEngine(): LetterEngine;
    getInferenceEngine(): InferenceEngine;
    getThingEngine(): ThingEngine;
    getEventEngine(): EventEngine;
    getEquationEngine(): EquationEngine;
}
