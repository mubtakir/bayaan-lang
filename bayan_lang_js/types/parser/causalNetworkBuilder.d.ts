/**
 * بناء الشبكات السببية - Causal Network Builder
 * Builds causal networks from AST automatically
 */
import * as AST from '../ast/index.js';
import { CausalNetwork } from './intelligentAST.js';
/**
 * بناء الشبكة السببية - Causal Network Builder
 */
export declare class CausalNetworkBuilder {
    private nodeIdCounter;
    private edgeIdCounter;
    /**
     * بناء شبكة سببية من AST
     * Build causal network from AST
     */
    buildFromAST(ast: AST.ASTNode): CausalNetwork;
    /**
     * بناء شبكة من برنامج كامل
     * Build network from complete program
     */
    private buildFromProgram;
    /**
     * بناء شبكة من دالة
     * Build network from function
     */
    private buildFromFunction;
    /**
     * بناء شبكة من تصريح متغير
     * Build network from variable declaration
     */
    private buildFromVariableDeclaration;
    /**
     * بناء شبكة من تعيين
     * Build network from assignment
     */
    private buildFromAssignment;
    /**
     * بناء شبكة من استدعاء دالة
     * Build network from function call
     */
    private buildFromFunctionCall;
    /**
     * بناء شبكة من عبارة if
     * Build network from if statement
     */
    private buildFromIfStatement;
    /**
     * بناء شبكة من عبارة while
     * Build network from while statement
     */
    private buildFromWhileStatement;
    /**
     * بناء شبكة من عبارة for
     * Build network from for statement
     */
    private buildFromForStatement;
    /**
     * بناء شبكة من كتلة عبارات
     * Build network from block statement
     */
    private buildFromBlockStatement;
    /**
     * بناء شبكة من تعبير
     * Build network from expression
     */
    private buildFromExpression;
    /**
     * دمج شبكتين سببيتين
     * Merge two causal networks
     */
    private mergeNetworks;
    /**
     * توليد معرف عقدة
     * Generate node ID
     */
    private generateNodeId;
    /**
     * توليد معرف حافة
     * Generate edge ID
     */
    private generateEdgeId;
    /**
     * استخراج اسم المعرف
     * Extract identifier name
     */
    private extractIdentifierName;
    /**
     * استخراج قيمة
     * Extract value
     */
    private extractValue;
    /**
     * الحصول على قوة التعيين
     * Get assignment strength
     */
    private getAssignmentStrength;
    /**
     * الحصول على الأنماط السببية المعروفة
     * Get known causal patterns
     */
    private getKnownCausalPatterns;
}
