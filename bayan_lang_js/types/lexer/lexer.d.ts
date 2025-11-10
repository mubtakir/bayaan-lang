/**
 * المحلل المعجمي (Lexer) للغة البيان
 * يحول النص المصدري إلى سلسلة من الرموز (Tokens)
 */
import { Token } from './tokens';
export declare class LexerError extends Error {
    line: number;
    column: number;
    constructor(message: string, line: number, column: number);
}
export declare class Lexer {
    private position;
    private line;
    private column;
    private tokens;
    private source;
    constructor(source: string);
    /**
     * تحليل النص المصدري وإرجاع قائمة الرموز
     */
    tokenize(): Token[];
    /**
     * قراءة رقم (صحيح أو عشري أو علمي)
     */
    private readNumber;
    /**
     * قراءة معرف أو كلمة مفتاحية
     */
    private readIdentifier;
    /**
     * قراءة نص (string)
     */
    private readString;
    /**
     * قراءة عملية أو رمز
     */
    private readOperatorOrSymbol;
    /**
     * تخطي المسافات البيضاء
     */
    private skipWhitespace;
    /**
     * تخطي تعليق سطر واحد
     */
    private skipSingleLineComment;
    /**
     * تخطي تعليق متعدد الأسطر
     */
    private skipMultiLineComment;
    /**
     * الحصول على الحرف الحالي
     */
    private currentChar;
    /**
     * النظر إلى الحرف التالي دون التقدم
     */
    private peek;
    /**
     * التقدم إلى الحرف التالي
     */
    private advance;
    /**
     * إضافة رمز إلى القائمة
     */
    private addToken;
    /**
     * التحقق من أن الحرف رقم
     */
    private isDigit;
    /**
     * التحقق من أن الحرف رقم سداسي عشري
     */
    private isHexDigit;
    /**
     * التحقق من أن الحرف حرف أبجدي (عربي أو إنجليزي)
     */
    private isAlpha;
    /**
     * التحقق من أن الحرف حرف أبجدي رقمي
     */
    private isAlphaNumeric;
    /**
     * الحصول على معلومات الموقع الحالي
     */
    getPosition(): {
        line: number;
        column: number;
        position: number;
    };
}
