/**
 * تعريف أنواع الرموز (Tokens) في لغة البيان
 */

export enum TokenType {
  // Literals - القيم الحرفية
  IDENTIFIER = 'IDENTIFIER',
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  
  // Arithmetic Operators - العمليات الحسابية
  PLUS = 'PLUS',                    // +
  MINUS = 'MINUS',                  // -
  MULTIPLY = 'MULTIPLY',            // *
  DIVIDE = 'DIVIDE',                // /
  MODULO = 'MODULO',                // %
  POWER = 'POWER',                  // **
  INCREMENT = 'INCREMENT',          // ++
  DECREMENT = 'DECREMENT',          // --
  
  // Comparison Operators - عمليات المقارنة
  ASSIGN = 'ASSIGN',                // =
  EQUALS = 'EQUALS',                // ==
  NOT_EQUALS = 'NOT_EQUALS',        // !=
  LESS_THAN = 'LESS_THAN',          // <
  GREATER_THAN = 'GREATER_THAN',    // >
  LESS_EQUALS = 'LESS_EQUALS',      // <=
  GREATER_EQUALS = 'GREATER_EQUALS',// >=
  STRICT_EQUALS = 'STRICT_EQUALS',  // ===
  STRICT_NOT_EQUALS = 'STRICT_NOT_EQUALS', // !==
  
  // Logical Operators - العمليات المنطقية
  AND = 'AND',                      // و
  OR = 'OR',                        // أو
  NOT = 'NOT',                      // ليس
  
  // Punctuation - علامات الترقيم
  LPAREN = 'LPAREN',                // (
  RPAREN = 'RPAREN',                // )
  LBRACE = 'LBRACE',                // {
  RBRACE = 'RBRACE',                // }
  LBRACKET = 'LBRACKET',            // [
  RBRACKET = 'RBRACKET',            // ]
  COMMA = 'COMMA',                  // ,
  DOT = 'DOT',                      // .
  COLON = 'COLON',                  // :
  SEMICOLON = 'SEMICOLON',          // ;
  ARROW = 'ARROW',                  // =>
  QUESTION = 'QUESTION',            // ?
  SPREAD = 'SPREAD',                // ...
  OPTIONAL_CHAIN = 'OPTIONAL_CHAIN', // ?.
  NULLISH_COALESCE = 'NULLISH_COALESCE', // ??
  AT = 'AT',                        // @ (for decorators)
  PIPE = 'PIPE',                    // | (for pattern matching)
  DOUBLE_COLON = 'DOUBLE_COLON',    // :: (for namespaces)
  
  // Keywords - Procedural - الكلمات المفتاحية الإجرائية
  IF = 'IF',                        // إذا
  ELSE = 'ELSE',                    // وإلا
  ELSE_IF = 'ELSE_IF',              // وإلا_إذا
  WHILE = 'WHILE',                  // بينما
  FOR = 'FOR',                      // لكل
  DO = 'DO',                        // افعل
  BREAK = 'BREAK',                  // اخرج
  CONTINUE = 'CONTINUE',            // استمر
  FUNCTION = 'FUNCTION',            // دالة
  RETURN = 'RETURN',                // إرجاع / ارجع
  LET = 'LET',                      // ليكن
  CONST = 'CONST',                  // ثابت
  VAR = 'VAR',                      // متغير
  TRUE = 'TRUE',                    // صحيح
  FALSE = 'FALSE',                  // خطأ
  NULL = 'NULL',                    // لاشيء
  UNDEFINED = 'UNDEFINED',          // غير_معرف
  
  // Keywords - OOP - الكلمات المفتاحية الكائنية
  CLASS = 'CLASS',                  // صنف
  THIS = 'THIS',                    // هذا
  NEW = 'NEW',                      // جديد
  EXTENDS = 'EXTENDS',              // يمتد
  SUPER = 'SUPER',                  // الأب
  CONSTRUCTOR = 'CONSTRUCTOR',      // منشئ
  PUBLIC = 'PUBLIC',                // عام
  PRIVATE = 'PRIVATE',              // خاص
  PROTECTED = 'PROTECTED',          // محمي
  STATIC = 'STATIC',                // ثابت_صنف
  INTERFACE = 'INTERFACE',          // واجهة
  IMPLEMENTS = 'IMPLEMENTS',        // ينفذ
  ABSTRACT = 'ABSTRACT',            // مجرد
  ASYNC = 'ASYNC',                  // غير_متزامن
  AWAIT = 'AWAIT',                  // انتظر
  GET = 'GET',                      // احصل
  SET = 'SET',                      // اضبط
  
  // Keywords - Logical - الكلمات المفتاحية المنطقية
  FACT = 'FACT',                    // حقيقة
  RULE = 'RULE',                    // قاعدة
  QUERY = 'QUERY',                  // استعلام
  IMPLIES = 'IMPLIES',              // يستلزم / :-
  UNIFY = 'UNIFY',                  // يوحد
  CUT = 'CUT',                      // قطع / !
  FINDALL = 'FINDALL',              // اجمع_كل
  BAGOF = 'BAGOF',                  // كيس_من
  SETOF = 'SETOF',                  // مجموعة_من
  ASSERT = 'ASSERT',                // أضف
  RETRACT = 'RETRACT',              // احذف
  IS = 'IS',                        // هو
  MEMBER = 'MEMBER',                // عضو
  APPEND = 'APPEND',                // ألحق
  LENGTH = 'LENGTH',                // طول

  // Keywords - Type System - نظام الأنواع
  NUMBER_TYPE = 'NUMBER_TYPE',      // رقم
  STRING_TYPE = 'STRING_TYPE',      // نص
  BOOLEAN_TYPE = 'BOOLEAN_TYPE',    // منطقي
  ANY_TYPE = 'ANY_TYPE',            // أي
  VOID_TYPE = 'VOID_TYPE',          // فارغ
  NEVER_TYPE = 'NEVER_TYPE',        // أبداً
  UNKNOWN_TYPE = 'UNKNOWN_TYPE',    // مجهول
  OBJECT_TYPE = 'OBJECT_TYPE',      // كائن
  ARRAY_TYPE = 'ARRAY_TYPE',        // مصفوفة
  TYPE = 'TYPE',                    // نوع (for type aliases)

  // Keywords - Causal Networks - الشبكات السببية
  CAUSES = 'CAUSES',                // يسبب
  PREVENTS = 'PREVENTS',            // يمنع
  ENHANCES = 'ENHANCES',            // يعزز
  WEAKENS = 'WEAKENS',              // يضعف
  LEADS_TO = 'LEADS_TO',            // يؤدي_إلى
  REQUIRES = 'REQUIRES',            // يتطلب
  ENABLES = 'ENABLES',              // يمكّن
  INHIBITS = 'INHIBITS',            // يثبط
  FIND_PATHS = 'FIND_PATHS',        // اجد_مسارات
  ROOT_CAUSES = 'ROOT_CAUSES',      // أسباب_جذرية
  FINAL_RESULTS = 'FINAL_RESULTS',  // نتائج_نهائية
  IMPACT_STRENGTH = 'IMPACT_STRENGTH', // قوة_التأثير

  // Keywords - Hybrid - الكلمات الهجينة
  HYBRID = 'HYBRID',                // بيان
  
  // Keywords - Advanced - كلمات متقدمة
  TRY = 'TRY',                      // حاول
  CATCH = 'CATCH',                  // اصطد
  FINALLY = 'FINALLY',              // أخيراً
  THROW = 'THROW',                  // ارمي
  IMPORT = 'IMPORT',                // استورد
  EXPORT = 'EXPORT',                // صدر
  FROM = 'FROM',                    // من
  AS = 'AS',                        // كـ
  DEFAULT = 'DEFAULT',              // افتراضي
  SWITCH = 'SWITCH',                // حول
  CASE = 'CASE',                    // حالة
  IN = 'IN',                        // في
  OF = 'OF',                        // من_بين
  TYPEOF = 'TYPEOF',                // نوع
  INSTANCEOF = 'INSTANCEOF',        // نسخة_من

  // New Advanced Features - ميزات متقدمة جديدة
  YIELD = 'YIELD',                  // أنتج
  GENERATOR = 'GENERATOR',          // مولد
  ENUM = 'ENUM',                    // تعداد
  MATCH = 'MATCH',                  // طابق
  WHEN = 'WHEN',                    // عندما
  WITH = 'WITH',                    // مع
  DECORATOR = 'DECORATOR',          // مزخرف
  READONLY = 'READONLY',            // للقراءة_فقط
  OVERRIDE = 'OVERRIDE',            // تجاوز
  NAMESPACE = 'NAMESPACE',          // نطاق
  MODULE = 'MODULE',                // وحدة
  
  // Special
  NEWLINE = 'NEWLINE',
  COMMENT = 'COMMENT',
  EOF = 'EOF'
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
export const KEYWORDS: Record<string, TokenType> = {
  // Procedural - إجرائية
  // English
  'if': TokenType.IF,
  'else': TokenType.ELSE,
  'elif': TokenType.ELSE_IF,
  'elseif': TokenType.ELSE_IF,
  'while': TokenType.WHILE,
  'for': TokenType.FOR,
  'do': TokenType.DO,
  'break': TokenType.BREAK,
  'continue': TokenType.CONTINUE,
  'function': TokenType.FUNCTION,
  'func': TokenType.FUNCTION,
  'fn': TokenType.FUNCTION,
  'return': TokenType.RETURN,
  'const': TokenType.CONST,
  'let': TokenType.LET,
  'var': TokenType.VAR,
  'true': TokenType.TRUE,
  'false': TokenType.FALSE,
  'null': TokenType.NULL,
  'undefined': TokenType.UNDEFINED,
  // Arabic
  'إذا': TokenType.IF,
  'اذا': TokenType.IF, // without hamza
  'وإلا': TokenType.ELSE,
  'والا': TokenType.ELSE, // without hamza
  'وإلا_إذا': TokenType.ELSE_IF,
  'والا_اذا': TokenType.ELSE_IF, // without hamza
  'بينما': TokenType.WHILE,
  'لكل': TokenType.FOR,
  'افعل': TokenType.DO,
  'اخرج': TokenType.BREAK,
  'كسر': TokenType.BREAK,
  'اكسر': TokenType.BREAK,
  'استمر': TokenType.CONTINUE,
  'تابع': TokenType.CONTINUE,
  'دالة': TokenType.FUNCTION,
  'إرجاع': TokenType.RETURN,
  'ارجع': TokenType.RETURN,
  'ثابت': TokenType.CONST,
  'ليكن': TokenType.LET,
  'دع': TokenType.LET,
  'متغير': TokenType.VAR,
  'صحيح': TokenType.TRUE,
  'خطأ': TokenType.FALSE,
  'خاطئ': TokenType.FALSE,
  'لاشيء': TokenType.NULL,
  'عدم': TokenType.NULL,
  'غير_معرف': TokenType.UNDEFINED,
  'غير_محدد': TokenType.UNDEFINED,

  // OOP - كائنية
  // English
  'class': TokenType.CLASS,
  'this': TokenType.THIS,
  'new': TokenType.NEW,
  'extends': TokenType.EXTENDS,
  'super': TokenType.SUPER,
  'constructor': TokenType.CONSTRUCTOR,
  'public': TokenType.PUBLIC,
  'private': TokenType.PRIVATE,
  'protected': TokenType.PROTECTED,
  'static': TokenType.STATIC,
  'interface': TokenType.INTERFACE,
  'implements': TokenType.IMPLEMENTS,
  'abstract': TokenType.ABSTRACT,
  'async': TokenType.ASYNC,
  'await': TokenType.AWAIT,
  'get': TokenType.GET,
  'set': TokenType.SET,
  // Arabic
  'صنف': TokenType.CLASS,
  'هذا': TokenType.THIS,
  'جديد': TokenType.NEW,
  'يمتد': TokenType.EXTENDS,
  'يرث': TokenType.EXTENDS,
  'الأب': TokenType.SUPER,
  'فائق': TokenType.SUPER,
  'منشئ': TokenType.CONSTRUCTOR,
  'عام': TokenType.PUBLIC,
  'خاص': TokenType.PRIVATE,
  'محمي': TokenType.PROTECTED,
  'ثابت_صنف': TokenType.STATIC,
  'واجهة': TokenType.INTERFACE,
  'ينفذ': TokenType.IMPLEMENTS,
  'مجرد': TokenType.ABSTRACT,
  'غير_متزامن': TokenType.ASYNC,
  'لامتزامن': TokenType.ASYNC,
  'انتظر': TokenType.AWAIT,
  'احصل': TokenType.GET,
  'اضبط': TokenType.SET,

  // Type System - نظام الأنواع
  // English
  'number': TokenType.NUMBER_TYPE,
  'string': TokenType.STRING_TYPE,
  'boolean': TokenType.BOOLEAN_TYPE,
  'any': TokenType.ANY_TYPE,
  'void': TokenType.VOID_TYPE,
  'never': TokenType.NEVER_TYPE,
  'unknown': TokenType.UNKNOWN_TYPE,
  'object': TokenType.OBJECT_TYPE,
  'type': TokenType.TYPE,
  // Arabic
  'رقم': TokenType.NUMBER_TYPE,
  'نص': TokenType.STRING_TYPE,
  'منطقي': TokenType.BOOLEAN_TYPE,
  'أي': TokenType.ANY_TYPE,
  'فارغ': TokenType.VOID_TYPE,
  'أبداً': TokenType.NEVER_TYPE,
  'أبدا': TokenType.NEVER_TYPE,
  'مجهول': TokenType.UNKNOWN_TYPE,
  'كائن': TokenType.OBJECT_TYPE,
  'نوع': TokenType.TYPE,

  // Logical - منطقية
  // English
  'fact': TokenType.FACT,
  'rule': TokenType.RULE,
  'query': TokenType.QUERY,
  'and': TokenType.AND,
  'or': TokenType.OR,
  'not': TokenType.NOT,
  'implies': TokenType.IMPLIES,
  'unify': TokenType.UNIFY,
  'cut': TokenType.CUT,
  'findall': TokenType.FINDALL,
  'bagof': TokenType.BAGOF,
  'setof': TokenType.SETOF,
  'assert': TokenType.ASSERT,
  'retract': TokenType.RETRACT,
  'is': TokenType.IS,
  'member': TokenType.MEMBER,
  'append': TokenType.APPEND,
  'length': TokenType.LENGTH,
  // Arabic
  'حقيقة': TokenType.FACT,
  'قاعدة': TokenType.RULE,
  'استعلام': TokenType.QUERY,
  'و': TokenType.AND,
  'أو': TokenType.OR,
  'ليس': TokenType.NOT,
  'يستلزم': TokenType.IMPLIES,
  'يوحد': TokenType.UNIFY,
  'قطع': TokenType.CUT,
  'اقطع': TokenType.CUT,
  'اجمع_كل': TokenType.FINDALL,
  'اجمع': TokenType.FINDALL,
  'كيس_من': TokenType.BAGOF,
  'كيس': TokenType.BAGOF,
  'مجموعة_من': TokenType.SETOF,
  'مجموعة': TokenType.SETOF,
  'أضف': TokenType.ASSERT,
  'اضف': TokenType.ASSERT,
  'احذف': TokenType.RETRACT,
  'هو': TokenType.IS,
  'عضو': TokenType.MEMBER,
  'عضو_في': TokenType.MEMBER,
  'ألحق': TokenType.APPEND,
  'الحق': TokenType.APPEND,
  'طول': TokenType.LENGTH,

  // Causal Networks - الشبكات السببية
  // English
  'causes': TokenType.CAUSES,
  'prevents': TokenType.PREVENTS,
  'enhances': TokenType.ENHANCES,
  'weakens': TokenType.WEAKENS,
  'leads_to': TokenType.LEADS_TO,
  'requires': TokenType.REQUIRES,
  'enables': TokenType.ENABLES,
  'inhibits': TokenType.INHIBITS,
  'find_paths': TokenType.FIND_PATHS,
  'root_causes': TokenType.ROOT_CAUSES,
  'final_results': TokenType.FINAL_RESULTS,
  'impact_strength': TokenType.IMPACT_STRENGTH,
  // Arabic
  'يسبب': TokenType.CAUSES,
  'يمنع': TokenType.PREVENTS,
  'يعزز': TokenType.ENHANCES,
  'يضعف': TokenType.WEAKENS,
  'يؤدي_إلى': TokenType.LEADS_TO,
  'يؤدي_الى': TokenType.LEADS_TO,
  'يؤدي': TokenType.LEADS_TO,
  'يتطلب': TokenType.REQUIRES,
  'يمكّن': TokenType.ENABLES,
  'يمكن': TokenType.ENABLES,
  'يثبط': TokenType.INHIBITS,
  'اجد_مسارات': TokenType.FIND_PATHS,
  'ابحث_عن_مسارات': TokenType.FIND_PATHS,
  'أسباب_جذرية': TokenType.ROOT_CAUSES,
  'اسباب_جذرية': TokenType.ROOT_CAUSES,
  'نتائج_نهائية': TokenType.FINAL_RESULTS,
  'قوة_التأثير': TokenType.IMPACT_STRENGTH,
  'قوة_التاثير': TokenType.IMPACT_STRENGTH,

  // Hybrid - هجينة
  // English
  'hybrid': TokenType.HYBRID,
  'bayan': TokenType.HYBRID,
  // Arabic
  'بيان': TokenType.HYBRID,
  'هجين': TokenType.HYBRID,

  // Advanced - متقدمة
  // English
  'try': TokenType.TRY,
  'catch': TokenType.CATCH,
  'finally': TokenType.FINALLY,
  'throw': TokenType.THROW,
  'import': TokenType.IMPORT,
  'export': TokenType.EXPORT,
  'from': TokenType.FROM,
  'as': TokenType.AS,
  'default': TokenType.DEFAULT,
  'switch': TokenType.SWITCH,
  'case': TokenType.CASE,
  'in': TokenType.IN,
  'of': TokenType.OF,
  'typeof': TokenType.TYPEOF,
  'instanceof': TokenType.INSTANCEOF,
  // Arabic
  'حاول': TokenType.TRY,
  'اصطد': TokenType.CATCH,
  'التقط': TokenType.CATCH,
  'أخيراً': TokenType.FINALLY,
  'أخيرا': TokenType.FINALLY,
  'ارمي': TokenType.THROW,
  'ارم': TokenType.THROW,
  'استورد': TokenType.IMPORT,
  'صدر': TokenType.EXPORT,
  'من': TokenType.FROM,
  'كـ': TokenType.AS,
  'افتراضي': TokenType.DEFAULT,
  'حول': TokenType.SWITCH,
  'بدل': TokenType.SWITCH,
  'حالة': TokenType.CASE,
  'في': TokenType.IN,
  'من_بين': TokenType.OF,
  'نوع_من': TokenType.TYPEOF,
  'نسخة_من': TokenType.INSTANCEOF,
  'مثيل_من': TokenType.INSTANCEOF,

  // New Advanced Features - ميزات متقدمة جديدة
  // English
  'yield': TokenType.YIELD,
  'generator': TokenType.GENERATOR,
  'gen': TokenType.GENERATOR,
  'enum': TokenType.ENUM,
  'match': TokenType.MATCH,
  'when': TokenType.WHEN,
  'with': TokenType.WITH,
  'decorator': TokenType.DECORATOR,
  'readonly': TokenType.READONLY,
  'override': TokenType.OVERRIDE,
  'namespace': TokenType.NAMESPACE,
  'module': TokenType.MODULE,
  // Arabic
  'أنتج': TokenType.YIELD,
  'انتج': TokenType.YIELD,
  'مولد': TokenType.GENERATOR,
  'تعداد': TokenType.ENUM,
  'نوع_بيانات': TokenType.TYPE,
  'طابق': TokenType.MATCH,
  'عندما': TokenType.WHEN,
  'مع': TokenType.WITH,
  'مزخرف': TokenType.DECORATOR,
  'للقراءة_فقط': TokenType.READONLY,
  'قراءة_فقط': TokenType.READONLY,
  'تجاوز': TokenType.OVERRIDE,
  'نطاق': TokenType.NAMESPACE,
  'وحدة': TokenType.MODULE,
};

/**
 * Legacy support - for backward compatibility
 * دعم قديم - للتوافق مع الإصدارات السابقة
 */
export const ARABIC_KEYWORDS = KEYWORDS;

/**
 * خريطة الرموز الخاصة
 */
export const OPERATORS: Record<string, TokenType> = {
  '+': TokenType.PLUS,
  '-': TokenType.MINUS,
  '*': TokenType.MULTIPLY,
  '/': TokenType.DIVIDE,
  '%': TokenType.MODULO,
  '**': TokenType.POWER,
  '++': TokenType.INCREMENT,
  '--': TokenType.DECREMENT,
  '=': TokenType.ASSIGN,
  '==': TokenType.EQUALS,
  '!=': TokenType.NOT_EQUALS,
  '<': TokenType.LESS_THAN,
  '>': TokenType.GREATER_THAN,
  '<=': TokenType.LESS_EQUALS,
  '>=': TokenType.GREATER_EQUALS,
  '===': TokenType.STRICT_EQUALS,
  '!==': TokenType.STRICT_NOT_EQUALS,
  '=>': TokenType.ARROW,
  ':-': TokenType.IMPLIES,
  '&&': TokenType.AND,
  '||': TokenType.OR,
  '|': TokenType.PIPE, // Union types
  '&': TokenType.AND, // Intersection types (also logical AND)
  '!': TokenType.CUT, // عامل القطع في السياق المنطقي، NOT في السياق الإجرائي
  '\\+': TokenType.NOT, // النفي كفشل في Prolog
};

