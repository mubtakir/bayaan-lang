/**
 * نقطة الدخول لمكونات المترجم
 */
export { Compiler, CompilerOptions } from './compiler.js';
export { IntelligentCompiler, IntelligentCompilerHelpers } from './intelligentCompiler.js';
export { SemanticOptimizer } from './semanticOptimizer.js';
export { LinguisticOperatorInjector } from './linguisticOperatorInjector.js';
export type { IntelligentCompilerSettings, IntelligentCompilationResult, CompilationStatistics, SemanticOptimization, OptimizationType, OptimizationImpact, LinguisticOperator, LinguisticOperatorType, IntelligentBytecode, BytecodeInstruction, CausalEffect, BytecodeMetadata, SemanticOptimizationResult, LinguisticInjectionResult, OptimizationContext, VariableContext, FunctionContext, OptimizationRule, LinguisticInjectionRule } from './intelligentCompilerTypes.js';
export { DEFAULT_INTELLIGENT_COMPILER_SETTINGS, IntelligentCompilerTypeHelpers } from './intelligentCompilerTypes.js';
