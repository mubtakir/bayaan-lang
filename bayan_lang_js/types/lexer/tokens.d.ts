/**
 * تعريف أنواع الرموز (Tokens) في لغة البيان
 */
export declare enum TokenType {
    IDENTIFIER = "IDENTIFIER",
    NUMBER = "NUMBER",
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    PLUS = "PLUS",// +
    MINUS = "MINUS",// -
    MULTIPLY = "MULTIPLY",// *
    DIVIDE = "DIVIDE",// /
    MODULO = "MODULO",// %
    POWER = "POWER",// **
    ASSIGN = "ASSIGN",// =
    EQUALS = "EQUALS",// ==
    NOT_EQUALS = "NOT_EQUALS",// !=
    LESS_THAN = "LESS_THAN",// <
    GREATER_THAN = "GREATER_THAN",// >
    LESS_EQUALS = "LESS_EQUALS",// <=
    GREATER_EQUALS = "GREATER_EQUALS",// >=
    STRICT_EQUALS = "STRICT_EQUALS",// ===
    STRICT_NOT_EQUALS = "STRICT_NOT_EQUALS",// !==
    AND = "AND",// و
    OR = "OR",// أو
    NOT = "NOT",// ليس
    LPAREN = "LPAREN",// (
    RPAREN = "RPAREN",// )
    LBRACE = "LBRACE",// {
    RBRACE = "RBRACE",// }
    LBRACKET = "LBRACKET",// [
    RBRACKET = "RBRACKET",// ]
    COMMA = "COMMA",// ,
    DOT = "DOT",// .
    COLON = "COLON",// :
    SEMICOLON = "SEMICOLON",// ;
    ARROW = "ARROW",// =>
    QUESTION = "QUESTION",// ?
    SPREAD = "SPREAD",// ...
    OPTIONAL_CHAIN = "OPTIONAL_CHAIN",// ?.
    NULLISH_COALESCE = "NULLISH_COALESCE",// ??
    AT = "AT",// @ (for decorators)
    PIPE = "PIPE",// | (for pattern matching)
    DOUBLE_COLON = "DOUBLE_COLON",// :: (for namespaces)
    IF = "IF",// إذا
    ELSE = "ELSE",// وإلا
    ELSE_IF = "ELSE_IF",// وإلا_إذا
    WHILE = "WHILE",// بينما
    FOR = "FOR",// لكل
    DO = "DO",// افعل
    BREAK = "BREAK",// اخرج
    CONTINUE = "CONTINUE",// استمر
    FUNCTION = "FUNCTION",// دالة
    RETURN = "RETURN",// إرجاع / ارجع
    LET = "LET",// ليكن
    CONST = "CONST",// ثابت
    VAR = "VAR",// متغير
    TRUE = "TRUE",// صحيح
    FALSE = "FALSE",// خطأ
    NULL = "NULL",// لاشيء
    UNDEFINED = "UNDEFINED",// غير_معرف
    CLASS = "CLASS",// صنف
    THIS = "THIS",// هذا
    NEW = "NEW",// جديد
    EXTENDS = "EXTENDS",// يمتد
    SUPER = "SUPER",// الأب
    CONSTRUCTOR = "CONSTRUCTOR",// منشئ
    PUBLIC = "PUBLIC",// عام
    PRIVATE = "PRIVATE",// خاص
    PROTECTED = "PROTECTED",// محمي
    STATIC = "STATIC",// ثابت_صنف
    INTERFACE = "INTERFACE",// واجهة
    IMPLEMENTS = "IMPLEMENTS",// ينفذ
    ABSTRACT = "ABSTRACT",// مجرد
    ASYNC = "ASYNC",// غير_متزامن
    AWAIT = "AWAIT",// انتظر
    FACT = "FACT",// حقيقة
    RULE = "RULE",// قاعدة
    QUERY = "QUERY",// استعلام
    IMPLIES = "IMPLIES",// يستلزم / :-
    UNIFY = "UNIFY",// يوحد
    CUT = "CUT",// قطع / !
    FINDALL = "FINDALL",// اجمع_كل
    BAGOF = "BAGOF",// كيس_من
    SETOF = "SETOF",// مجموعة_من
    ASSERT = "ASSERT",// أضف
    RETRACT = "RETRACT",// احذف
    IS = "IS",// هو
    MEMBER = "MEMBER",// عضو
    APPEND = "APPEND",// ألحق
    LENGTH = "LENGTH",// طول
    CAUSES = "CAUSES",// يسبب
    PREVENTS = "PREVENTS",// يمنع
    ENHANCES = "ENHANCES",// يعزز
    WEAKENS = "WEAKENS",// يضعف
    LEADS_TO = "LEADS_TO",// يؤدي_إلى
    REQUIRES = "REQUIRES",// يتطلب
    ENABLES = "ENABLES",// يمكّن
    INHIBITS = "INHIBITS",// يثبط
    FIND_PATHS = "FIND_PATHS",// اجد_مسارات
    ROOT_CAUSES = "ROOT_CAUSES",// أسباب_جذرية
    FINAL_RESULTS = "FINAL_RESULTS",// نتائج_نهائية
    IMPACT_STRENGTH = "IMPACT_STRENGTH",// قوة_التأثير
    HYBRID = "HYBRID",// بيان
    TRY = "TRY",// حاول
    CATCH = "CATCH",// اصطد
    FINALLY = "FINALLY",// أخيراً
    THROW = "THROW",// ارمي
    IMPORT = "IMPORT",// استورد
    EXPORT = "EXPORT",// صدر
    FROM = "FROM",// من
    AS = "AS",// كـ
    DEFAULT = "DEFAULT",// افتراضي
    SWITCH = "SWITCH",// حول
    CASE = "CASE",// حالة
    IN = "IN",// في
    OF = "OF",// من_بين
    TYPEOF = "TYPEOF",// نوع
    INSTANCEOF = "INSTANCEOF",// نسخة_من
    YIELD = "YIELD",// أنتج
    GENERATOR = "GENERATOR",// مولد
    ENUM = "ENUM",// تعداد
    TYPE = "TYPE",// نوع_بيانات
    MATCH = "MATCH",// طابق
    WHEN = "WHEN",// عندما
    WITH = "WITH",// مع
    DECORATOR = "DECORATOR",// مزخرف
    GET = "GET",// احصل
    SET = "SET",// اضبط
    READONLY = "READONLY",// للقراءة_فقط
    OVERRIDE = "OVERRIDE",// تجاوز
    NAMESPACE = "NAMESPACE",// نطاق
    MODULE = "MODULE",// وحدة
    NEWLINE = "NEWLINE",
    COMMENT = "COMMENT",
    EOF = "EOF"
}
/**
 * واجهة الرمز (Token)
 */
export interface Token {
    type: TokenType;
    value: string | number;
    line: number;
    column: number;
}
/**
 * خريطة الكلمات المفتاحية - Bilingual (English + Arabic)
 * Keywords Map - ثنائية اللغة (إنجليزي + عربي)
 */
export declare const KEYWORDS: Record<string, TokenType>;
/**
 * Legacy support - for backward compatibility
 * دعم قديم - للتوافق مع الإصدارات السابقة
 */
export declare const ARABIC_KEYWORDS: Record<string, TokenType>;
/**
 * خريطة الرموز الخاصة
 */
export declare const OPERATORS: Record<string, TokenType>;
