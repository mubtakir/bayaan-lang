/**
 * المترجم الذكي - Intelligent Compiler
 * Extends traditional compiler with AI intelligence for semantic compilation
 */
import { Compiler, CompilerOptions } from './compiler.js';
import * as AST from '../ast/index.js';
import { IntelligentProgram } from '../parser/intelligentAST.js';
import { IntelligentToken } from '../lexer/intelligentTokens.js';
import { IntelligentCompilerSettings, IntelligentCompilationResult, CompilationStatistics } from './intelligentCompilerTypes.js';
/**
 * المترجم الذكي - Intelligent Compiler
 * Extends Compiler with AI intelligence from Baserah systems
 */
export declare class IntelligentCompiler extends Compiler {
    private settings;
    private semanticOptimizer;
    private linguisticInjector;
    private stats;
    constructor(compilerOptions?: CompilerOptions, intelligentSettings?: Partial<IntelligentCompilerSettings>);
    /**
     * ترجمة ذكية - Intelligent Compile
     * Compiles code with full AI intelligence
     */
    compileIntelligent(program: IntelligentProgram | AST.Program, tokens?: IntelligentToken[]): IntelligentCompilationResult;
    /**
     * حقن الكود اللغوي - Inject Linguistic Code
     */
    private injectLinguisticCode;
    /**
     * عد العبارات - Count Statements
     */
    private countStatements;
    /**
     * الحصول على الإحصائيات - Get Statistics
     */
    getStats(): CompilationStatistics;
    /**
     * إعادة تعيين الإحصائيات - Reset Statistics
     */
    resetStats(): void;
}
/**
 * مساعدات المترجم الذكي - Intelligent Compiler Helpers
 */
export declare class IntelligentCompilerHelpers {
    /**
     * طباعة ملخص النتيجة - Print Result Summary
     */
    static printSummary(result: IntelligentCompilationResult): string;
}
