/**
 * أنواع المترجم الذكي - Intelligent Compiler Types
 * Types for semantic optimization and intelligent compilation
 */
import { CausalNetwork, Event } from '../parser/intelligentAST.js';
import { SemanticType } from '../lexer/intelligentTokens.js';
/**
 * تحسين دلالي - Semantic Optimization
 */
export interface SemanticOptimization {
    id: string;
    type: OptimizationType;
    description: string;
    originalCode: string;
    optimizedCode: string;
    reason: string;
    confidence: number;
    impact: OptimizationImpact;
}
/**
 * نوع التحسين - Optimization Type
 */
export type OptimizationType = 'dead_code_elimination' | 'constant_folding' | 'causal_optimization' | 'event_ordering' | 'redundancy_elimination' | 'semantic_inlining' | 'linguistic_injection';
/**
 * تأثير التحسين - Optimization Impact
 */
export interface OptimizationImpact {
    performance: number;
    memory: number;
    readability: number;
    correctness: number;
}
/**
 * مشغل لغوي - Linguistic Operator
 */
export interface LinguisticOperator {
    id: string;
    name: string;
    type: LinguisticOperatorType;
    targetVariable: string;
    sourceLetters: string[];
    letterMeanings: string[];
    operation: string;
    confidence: number;
    metadata: Map<string, any>;
}
/**
 * نوع المشغل اللغوي - Linguistic Operator Type
 */
export type LinguisticOperatorType = 'letter_meaning_injection' | 'root_based_operation' | 'causal_trigger' | 'semantic_transformation' | 'context_adaptation';
/**
 * كود بايت ذكي - Intelligent Bytecode
 */
export interface IntelligentBytecode {
    instructions: BytecodeInstruction[];
    causalNetwork?: CausalNetwork;
    events?: Event[];
    optimizations: SemanticOptimization[];
    linguisticOperators: LinguisticOperator[];
    metadata: BytecodeMetadata;
}
/**
 * تعليمة كود بايت - Bytecode Instruction
 */
export interface BytecodeInstruction {
    opcode: string;
    operands: any[];
    semanticType?: SemanticType;
    causalEffect?: CausalEffect;
    line?: number;
    column?: number;
}
/**
 * تأثير سببي - Causal Effect
 */
export interface CausalEffect {
    causes: string[];
    prevents: string[];
    requires: string[];
    strength: number;
}
/**
 * بيانات وصفية لكود البايت - Bytecode Metadata
 */
export interface BytecodeMetadata {
    sourceLanguage: 'bayan';
    targetLanguage: 'javascript' | 'wasm' | 'native';
    optimizationLevel: number;
    intelligenceLevel: number;
    compilationTime: number;
    confidence: number;
}
/**
 * نتيجة التحسين الدلالي - Semantic Optimization Result
 */
export interface SemanticOptimizationResult {
    optimizations: SemanticOptimization[];
    totalImpact: OptimizationImpact;
    warnings: string[];
    suggestions: string[];
}
/**
 * نتيجة حقن المشغلات اللغوية - Linguistic Injection Result
 */
export interface LinguisticInjectionResult {
    operators: LinguisticOperator[];
    injectedCode: string;
    confidence: number;
    warnings: string[];
}
/**
 * إعدادات المترجم الذكي - Intelligent Compiler Settings
 */
export interface IntelligentCompilerSettings {
    enableSemanticOptimization: boolean;
    enableLinguisticInjection: boolean;
    enableCausalOptimization: boolean;
    enableEventOrdering: boolean;
    optimizationLevel: number;
    intelligenceLevel: number;
    targetLanguage: 'javascript' | 'wasm' | 'native';
    includeDebugInfo: boolean;
}
/**
 * الإعدادات الافتراضية - Default Settings
 */
export declare const DEFAULT_INTELLIGENT_COMPILER_SETTINGS: IntelligentCompilerSettings;
/**
 * نتيجة الترجمة الذكية - Intelligent Compilation Result
 */
export interface IntelligentCompilationResult {
    code: string;
    bytecode?: IntelligentBytecode;
    optimizations: SemanticOptimization[];
    linguisticOperators: LinguisticOperator[];
    causalNetwork?: CausalNetwork;
    events?: Event[];
    compilationTime: number;
    warnings: string[];
    suggestions: string[];
    statistics: CompilationStatistics;
}
/**
 * إحصائيات الترجمة - Compilation Statistics
 */
export interface CompilationStatistics {
    originalLines: number;
    compiledLines: number;
    optimizationsApplied: number;
    linguisticOperatorsInjected: number;
    causalNodesOptimized: number;
    eventsReordered: number;
    performanceGain: number;
    memoryReduction: number;
    confidence: number;
}
/**
 * سياق التحسين - Optimization Context
 */
export interface OptimizationContext {
    causalNetwork?: CausalNetwork;
    events?: Event[];
    variables: Map<string, VariableContext>;
    functions: Map<string, FunctionContext>;
    currentScope: string;
}
/**
 * سياق المتغير - Variable Context
 */
export interface VariableContext {
    name: string;
    semanticType?: SemanticType;
    isConstant: boolean;
    usageCount: number;
    causalEffects: CausalEffect[];
    letterMeanings?: string[];
}
/**
 * سياق الدالة - Function Context
 */
export interface FunctionContext {
    name: string;
    semanticType?: SemanticType;
    callCount: number;
    causalEffects: CausalEffect[];
    events: Event[];
    canInline: boolean;
    inlineCost: number;
}
/**
 * قاعدة تحسين - Optimization Rule
 */
export interface OptimizationRule {
    id: string;
    name: string;
    type: OptimizationType;
    condition: (context: OptimizationContext) => boolean;
    apply: (context: OptimizationContext) => SemanticOptimization | null;
    priority: number;
    confidence: number;
}
/**
 * قاعدة حقن لغوي - Linguistic Injection Rule
 */
export interface LinguisticInjectionRule {
    id: string;
    name: string;
    type: LinguisticOperatorType;
    condition: (context: OptimizationContext, variableName: string) => boolean;
    inject: (context: OptimizationContext, variableName: string) => LinguisticOperator | null;
    priority: number;
    confidence: number;
}
/**
 * مساعدات أنواع المترجم الذكي - Intelligent Compiler Type Helpers
 */
export declare class IntelligentCompilerTypeHelpers {
    /**
     * إنشاء تحسين فارغ
     */
    static createEmptyOptimization(type: OptimizationType): SemanticOptimization;
    /**
     * إنشاء مشغل لغوي فارغ
     */
    static createEmptyLinguisticOperator(type: LinguisticOperatorType): LinguisticOperator;
    /**
     * دمج تأثيرات التحسين
     */
    static mergeOptimizationImpacts(impacts: OptimizationImpact[]): OptimizationImpact;
}
