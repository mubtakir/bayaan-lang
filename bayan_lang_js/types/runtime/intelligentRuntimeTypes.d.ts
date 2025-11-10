/**
 * أنواع بيئة التشغيل الذكية - Intelligent Runtime Types
 * Types for intelligent runtime execution with dynamic causal inference and learning
 */
import { CausalNetwork, CausalEdge } from '../parser/intelligentAST.js';
/**
 * حالة التنفيذ - Execution State
 */
export interface ExecutionState {
    variables: Map<string, any>;
    functions: Map<string, Function>;
    callStack: CallFrame[];
    currentFrame: CallFrame | null;
    timestamp: number;
    executionCount: number;
}
/**
 * إطار الاستدعاء - Call Frame
 */
export interface CallFrame {
    id: string;
    functionName: string;
    arguments: Map<string, any>;
    localVariables: Map<string, any>;
    returnValue: any;
    startTime: number;
    endTime?: number;
    causalEffects: CausalEffect[];
}
/**
 * تأثير سببي - Causal Effect
 */
export interface CausalEffect {
    id: string;
    cause: string;
    effect: string;
    type: CausalEffectType;
    strength: number;
    confidence: number;
    timestamp: number;
    context: Map<string, any>;
}
export type CausalEffectType = 'causes' | 'prevents' | 'enhances' | 'requires' | 'enables' | 'disables';
/**
 * استنتاج سببي - Causal Inference
 */
export interface CausalInference {
    id: string;
    premise: string[];
    conclusion: string;
    confidence: number;
    reasoning: string;
    evidence: CausalEffect[];
    timestamp: number;
}
/**
 * نمط تعلم - Learning Pattern
 */
export interface LearningPattern {
    id: string;
    name: string;
    type: LearningPatternType;
    pattern: string;
    frequency: number;
    lastSeen: number;
    confidence: number;
    examples: ExecutionExample[];
    metadata: Map<string, any>;
}
export type LearningPatternType = 'execution_sequence' | 'variable_usage' | 'function_call' | 'causal_chain' | 'error_pattern' | 'optimization_opportunity';
/**
 * مثال تنفيذ - Execution Example
 */
export interface ExecutionExample {
    id: string;
    input: Map<string, any>;
    output: any;
    executionTime: number;
    causalEffects: CausalEffect[];
    timestamp: number;
}
/**
 * سلوك تكيفي - Adaptive Behavior
 */
export interface AdaptiveBehavior {
    id: string;
    name: string;
    condition: string;
    action: string;
    priority: number;
    confidence: number;
    activationCount: number;
    lastActivated: number;
    impact: BehaviorImpact;
}
/**
 * تأثير السلوك - Behavior Impact
 */
export interface BehaviorImpact {
    performance: number;
    memory: number;
    correctness: number;
    userSatisfaction: number;
}
/**
 * نتيجة الاستنتاج - Inference Result
 */
export interface InferenceResult {
    inferences: CausalInference[];
    newCausalEdges: CausalEdge[];
    confidence: number;
    reasoning: string[];
    timestamp: number;
}
/**
 * نتيجة التعلم - Learning Result
 */
export interface LearningResult {
    patternsLearned: LearningPattern[];
    behaviorsAdapted: AdaptiveBehavior[];
    confidence: number;
    improvements: string[];
    timestamp: number;
}
/**
 * نتيجة التنفيذ الذكي - Intelligent Execution Result
 */
export interface IntelligentExecutionResult {
    output: any;
    executionTime: number;
    causalEffects: CausalEffect[];
    inferences: CausalInference[];
    patternsLearned: LearningPattern[];
    behaviorsActivated: AdaptiveBehavior[];
    causalNetwork: CausalNetwork;
    confidence: number;
    statistics: RuntimeStatistics;
    warnings: string[];
    suggestions: string[];
}
/**
 * إحصائيات بيئة التشغيل - Runtime Statistics
 */
export interface RuntimeStatistics {
    totalExecutions: number;
    totalInferences: number;
    totalPatternsLearned: number;
    totalBehaviorsActivated: number;
    averageExecutionTime: number;
    averageConfidence: number;
    causalNetworkSize: number;
    learningRate: number;
}
/**
 * إعدادات بيئة التشغيل الذكية - Intelligent Runtime Settings
 */
export interface IntelligentRuntimeSettings {
    enableCausalInference: boolean;
    enableRealTimeLearning: boolean;
    enableAdaptiveBehavior: boolean;
    inferenceThreshold: number;
    learningThreshold: number;
    behaviorThreshold: number;
    maxInferencesPerExecution: number;
    maxPatternsToStore: number;
    maxBehaviorsToStore: number;
    enableCaching: boolean;
    enableLogging: boolean;
}
/**
 * الإعدادات الافتراضية - Default Settings
 */
export declare const DEFAULT_INTELLIGENT_RUNTIME_SETTINGS: IntelligentRuntimeSettings;
/**
 * سياق الاستنتاج - Inference Context
 */
export interface InferenceContext {
    executionState: ExecutionState;
    causalNetwork: CausalNetwork;
    recentEffects: CausalEffect[];
    knownPatterns: LearningPattern[];
    activeBehaviors: AdaptiveBehavior[];
}
/**
 * سياق التعلم - Learning Context
 */
export interface LearningContext {
    executionHistory: ExecutionExample[];
    causalEffects: CausalEffect[];
    existingPatterns: LearningPattern[];
    performanceMetrics: Map<string, number>;
}
/**
 * قاعدة الاستنتاج - Inference Rule
 */
export interface InferenceRule {
    id: string;
    name: string;
    condition: (context: InferenceContext) => boolean;
    infer: (context: InferenceContext) => CausalInference | null;
    priority: number;
    confidence: number;
}
/**
 * قاعدة التعلم - Learning Rule
 */
export interface LearningRule {
    id: string;
    name: string;
    type: LearningPatternType;
    condition: (context: LearningContext) => boolean;
    learn: (context: LearningContext) => LearningPattern | null;
    priority: number;
    confidence: number;
}
/**
 * قاعدة السلوك - Behavior Rule
 */
export interface BehaviorRule {
    id: string;
    name: string;
    condition: (state: ExecutionState) => boolean;
    adapt: (state: ExecutionState) => AdaptiveBehavior | null;
    priority: number;
    confidence: number;
}
/**
 * مساعدات أنواع بيئة التشغيل - Runtime Type Helpers
 */
export declare class IntelligentRuntimeTypeHelpers {
    /**
     * إنشاء حالة تنفيذ فارغة - Create Empty Execution State
     */
    static createEmptyExecutionState(): ExecutionState;
    /**
     * إنشاء تأثير سببي - Create Causal Effect
     */
    static createCausalEffect(cause: string, effect: string, type: CausalEffectType, strength?: number, confidence?: number): CausalEffect;
    /**
     * إنشاء استنتاج سببي - Create Causal Inference
     */
    static createCausalInference(premise: string[], conclusion: string, confidence: number, reasoning: string, evidence?: CausalEffect[]): CausalInference;
    /**
     * إنشاء إحصائيات فارغة - Create Empty Statistics
     */
    static createEmptyStatistics(): RuntimeStatistics;
}
