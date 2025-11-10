/**
 * المترجم (Compiler) للغة البيان
 * يحول كود البيان إلى JavaScript
 */
import * as AST from '../ast/index.js';
export interface CompilerOptions {
    target?: 'es5' | 'es2015' | 'es2020' | 'esnext';
    module?: 'commonjs' | 'esm';
    includeRuntime?: boolean;
    sourceMaps?: boolean;
}
export declare class Compiler {
    private indentLevel;
    private output;
    private options;
    constructor(options?: CompilerOptions);
    /**
     * ترجمة البرنامج الكامل
     */
    compile(program: AST.Program): string;
    private compileStatement;
    private compileExpressionStatement;
    private compileVariableDeclaration;
    private compileFunctionDeclaration;
    private compileClassDeclaration;
    private compileMethodDefinition;
    private compilePropertyDefinition;
    private compileIfStatement;
    private compileWhileStatement;
    private compileForStatement;
    private compileReturnStatement;
    private compileBlockStatement;
    private compileTryStatement;
    private compileThrowStatement;
    private compileImportDeclaration;
    private compileExportDeclaration;
    private compileHybridBlock;
    private compileFactDeclaration;
    private compileRuleDeclaration;
    private compileExpression;
    private compileLiteral;
    private compileBinaryExpression;
    private compileUnaryExpression;
    private compileLogicalExpression;
    private compileCallExpression;
    private compileMemberExpression;
    private compileAssignmentExpression;
    private compileConditionalExpression;
    private compileArrayExpression;
    private compileObjectExpression;
    private compileFunctionExpression;
    private compileArrowFunctionExpression;
    private compileNewExpression;
    private compileQueryExpression;
    private compileQueryCall;
    /**
     * ترجمة النفي كفشل
     */
    private compileNegationExpression;
    /**
     * ترجمة عامل القطع
     */
    private compileCutExpression;
    /**
     * ترجمة FindAll
     */
    private compileFindAllExpression;
    /**
     * ترجمة BagOf
     */
    private compileBagOfExpression;
    /**
     * ترجمة SetOf
     */
    private compileSetOfExpression;
    /**
     * ترجمة Assert
     */
    private compileAssertExpression;
    /**
     * ترجمة Retract
     */
    private compileRetractExpression;
    /**
     * ترجمة Is
     */
    private compileIsExpression;
    private emit;
    private emitLine;
    private getIndent;
}
