/**
 * حاقن المشغلات اللغوية - Linguistic Operator Injector
 * Injects linguistic operators based on letter meanings and causal relationships
 */
import * as AST from '../ast/index.js';
import { CausalNetwork } from '../parser/intelligentAST.js';
import { IntelligentToken } from '../lexer/intelligentTokens.js';
import { LinguisticInjectionResult } from './intelligentCompilerTypes.js';
/**
 * حاقن المشغلات اللغوية - Linguistic Operator Injector
 */
export declare class LinguisticOperatorInjector {
    private operators;
    private rules;
    private letterAnalyzer;
    constructor();
    /**
     * حقن المشغلات - Inject Operators
     */
    inject(ast: AST.Program, causalNetwork?: CausalNetwork, tokens?: IntelligentToken[]): LinguisticInjectionResult;
    /**
     * جمع المتغيرات - Collect Variables
     */
    private collectVariables;
    /**
     * توليد الكود المحقون - Generate Injected Code
     */
    private generateInjectedCode;
    /**
     * تهيئة قواعد الحقن - Initialize Injection Rules
     */
    private initializeRules;
}
