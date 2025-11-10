/**
 * المحسن الدلالي - Semantic Optimizer
 * Optimizes code based on semantic understanding and causal networks
 */
import * as AST from '../ast/index.js';
import { CausalNetwork, Event } from '../parser/intelligentAST.js';
import { SemanticOptimizationResult } from './intelligentCompilerTypes.js';
/**
 * المحسن الدلالي - Semantic Optimizer
 */
export declare class SemanticOptimizer {
    private optimizations;
    private rules;
    constructor();
    /**
     * تحسين AST - Optimize AST
     */
    optimize(ast: AST.Program, causalNetwork?: CausalNetwork, events?: Event[]): SemanticOptimizationResult;
    /**
     * جمع السياق - Collect Context
     */
    private collectContext;
    /**
     * تهيئة قواعد التحسين - Initialize Optimization Rules
     */
    private initializeRules;
}
