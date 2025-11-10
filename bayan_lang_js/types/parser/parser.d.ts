/**
 * المحلل النحوي (Parser) للغة البيان
 * يحول سلسلة الرموز إلى شجرة تجريدية (AST)
 */
import { Token } from '../lexer/index';
import * as AST from '../ast/index';
export declare class ParserError extends Error {
    token: Token;
    constructor(message: string, token: Token);
}
export declare class Parser {
    private tokens;
    private current;
    constructor(tokens: Token[]);
    /**
     * تحليل البرنامج الكامل
     */
    parse(): AST.Program;
    private parseStatement;
    private parseVariableDeclaration;
    private parseFunctionDeclaration;
    private parseFunctionParameters;
    private parseClassDeclaration;
    private parseClassBody;
    private parseInterfaceDeclaration;
    private parseInterfaceBody;
    private parseIfStatement;
    private parseWhileStatement;
    private parseDoWhileStatement;
    private parseForStatement;
    private parseSwitchStatement;
    private parseReturnStatement;
    private parseBreakStatement;
    private parseContinueStatement;
    private parseTryStatement;
    private parseThrowStatement;
    private parseImportDeclaration;
    private parseExportDeclaration;
    private parseBlockStatement;
    private parseExpressionStatement;
    private parseHybridBlock;
    private parseFactDeclaration;
    private parseRuleDeclaration;
    private parseExpression;
    private parseAssignment;
    private parseConditional;
    private parseLogicalOr;
    private parseLogicalAnd;
    private parseEquality;
    private parseRelational;
    private parseAdditive;
    private parseMultiplicative;
    private parseExponentiation;
    private parseUnary;
    private parsePostfix;
    private parseCallMember;
    private parsePrimary;
    private parseNewExpression;
    private parseQueryExpression;
    private parseArrayExpression;
    private parseObjectExpression;
    private parseFunctionExpression;
    private parseArrowFunction;
    private parseIdentifier;
    private check;
    private advance;
    private isAtEnd;
    private peek;
    private previous;
    private consume;
    /**
     * تحليل النفي كفشل
     * مثال: ليس والد("أحمد", "علي")
     * Example: not parent("Ahmed", "Ali")
     */
    private parseNegationExpression;
    /**
     * تحليل FindAll
     * مثال: اجمع_كل(?س, والد("أحمد", ?س), ?أبناء)
     * Example: findall(?x, parent("Ahmed", ?x), ?children)
     */
    private parseFindAllExpression;
    /**
     * تحليل BagOf
     * مثال: كيس_من(?س, طالب(?س, "حاسب"), ?طلاب)
     */
    private parseBagOfExpression;
    /**
     * تحليل SetOf
     * مثال: مجموعة_من(?س, مدينة(?س), ?مدن)
     */
    private parseSetOfExpression;
    /**
     * تحليل Assert
     * مثال: أضف والد("علي", "محمد")
     * Example: assert parent("Ali", "Mohamed")
     */
    private parseAssertExpression;
    /**
     * تحليل Retract
     * مثال: احذف والد("علي", "محمد")
     * Example: retract parent("Ali", "Mohamed")
     */
    private parseRetractExpression;
    private consumeSemicolon;
    private synchronize;
}
