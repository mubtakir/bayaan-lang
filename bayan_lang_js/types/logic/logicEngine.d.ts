/**
 * المحرك المنطقي للغة البيان
 * يدعم البرمجة المنطقية مع الحقائق والقواعد والاستدلال
 */
/**
 * المصطلح (Term) - يمكن أن يكون قيمة أو متغير
 */
export declare class Term {
    value: any;
    isVariable: boolean;
    constructor(value: any, isVariable?: boolean);
    toString(): string;
    equals(other: Term): boolean;
    clone(): Term;
}
/**
 * المحمول (Predicate) - يمثل علاقة مع معاملات
 */
export declare class Predicate {
    name: string;
    args: Term[];
    constructor(name: string, args: Term[]);
    toString(): string;
    equals(other: Predicate): boolean;
    clone(): Predicate;
    /**
     * استبدال المتغيرات بقيمها من الاستبدال
     */
    substitute(substitution: Substitution): Predicate;
}
/**
 * الحقيقة (Fact) - محمول بدون شروط
 */
export declare class Fact {
    predicate: Predicate;
    constructor(predicate: Predicate);
    toString(): string;
    clone(): Fact;
}
/**
 * القاعدة (Rule) - محمول يعتمد على محمولات أخرى
 */
export declare class Rule {
    head: Predicate;
    body: Predicate[];
    constructor(head: Predicate, body: Predicate[]);
    toString(): string;
    clone(): Rule;
    /**
     * إعادة تسمية المتغيرات لتجنب التعارضات
     */
    renameVariables(suffix: string): Rule;
}
/**
 * نوع عنصر المعرفة
 */
export type KnowledgeItem = Fact | Rule;
/**
 * الاستبدال (Substitution) - ربط المتغيرات بالقيم
 */
export declare class Substitution {
    private bindings;
    set(variable: string, value: any): void;
    get(variable: string): any | undefined;
    has(variable: string): boolean;
    clone(): Substitution;
    merge(other: Substitution): Substitution | null;
    toString(): string;
    toObject(): Record<string, any>;
    getAll(): Map<string, any>;
}
/**
 * المحرك المنطقي الرئيسي
 */
export declare class LogicEngine {
    private knowledgeBase;
    private ruleCounter;
    cutEncountered: boolean;
    /**
     * إضافة حقيقة إلى قاعدة المعرفة
     */
    addFact(fact: Fact): void;
    /**
     * إضافة قاعدة إلى قاعدة المعرفة
     */
    addRule(rule: Rule): void;
    /**
     * استعلام عن هدف
     */
    query(goal: Predicate, substitution?: Substitution, filterResults?: boolean): Substitution[];
    /**
     * حل قيمة متغير من خلال تتبع المراجع
     */
    private resolveValue;
    /**
     * إثبات قاعدة
     */
    private proveRule;
    /**
     * إثبات قائمة من الأهداف
     */
    private proveGoals;
    /**
     * توحيد محمولين
     */
    private unify;
    /**
     * توحيد مصطلحين
     */
    private unifyTerms;
    /**
     * توحيد متغير مع مصطلح
     */
    private unifyVariable;
    /**
     * الحصول على ملخص قاعدة المعرفة
     */
    getKnowledgeSummary(): Record<string, {
        facts: number;
        rules: number;
    }>;
    /**
     * الحصول على جميع الحقائق
     */
    getAllFacts(): Fact[];
    /**
     * الحصول على جميع القواعد
     */
    getAllRules(): Rule[];
    /**
     * حذف حقيقة
     */
    removeFact(predicate: Predicate): boolean;
    /**
     * حذف قاعدة
     */
    removeRule(rule: Rule): boolean;
    /**
     * مسح قاعدة المعرفة
     */
    clear(): void;
    /**
     * مسح محمول معين
     */
    clearPredicate(predicateName: string): void;
    /**
     * التحقق من وجود حقيقة
     */
    hasFact(predicate: Predicate): boolean;
    /**
     * عدد العناصر في قاعدة المعرفة
     */
    size(): number;
    /**
     * طباعة قاعدة المعرفة
     */
    print(): void;
    /**
     * النفي كفشل (Negation as Failure)
     * يتحقق من عدم إمكانية إثبات الهدف
     */
    negationAsFailure(goal: Predicate, substitution?: Substitution): boolean;
    /**
     * FindAll - جمع كل الحلول
     * يجمع كل قيم المتغير المحدد من جميع الحلول
     */
    findAll(template: Term, goal: Predicate, substitution?: Substitution): any[];
    /**
     * BagOf - جمع الحلول مع السماح بالتكرار
     * مثل findAll لكن يحافظ على ترتيب الحلول
     */
    bagOf(template: Term, goal: Predicate, substitution?: Substitution): any[];
    /**
     * SetOf - جمع الحلول الفريدة فقط
     * مثل findAll لكن بدون تكرار
     */
    setOf(template: Term, goal: Predicate, substitution?: Substitution): any[];
    /**
     * Assert - إضافة حقيقة أو قاعدة ديناميكياً
     */
    assertFact(predicate: Predicate): void;
    /**
     * Assert Rule - إضافة قاعدة ديناميكياً
     */
    assertRule(head: Predicate, body: Predicate[]): void;
    /**
     * Retract - حذف حقيقة ديناميكياً
     */
    retractFact(predicate: Predicate): boolean;
    /**
     * Retract Rule - حذف قاعدة ديناميكياً
     */
    retractRule(head: Predicate, body: Predicate[]): boolean;
    /**
     * Member - التحقق من عضوية عنصر في قائمة
     */
    member(element: Term, list: any[]): boolean;
    /**
     * Append - دمج قائمتين
     */
    append(list1: any[], list2: any[]): any[];
    /**
     * Length - طول القائمة
     */
    listLength(list: any[]): number;
    /**
     * Is - التقييم الحسابي
     * يقيّم تعبير حسابي ويوحده مع النتيجة
     */
    evaluateArithmetic(result: Term, expression: any, substitution: Substitution): Substitution | null;
    /**
     * مطابقة نمط القوائم [Head|Tail]
     * Pattern matching for lists with [Head|Tail] syntax
     */
    unifyList(pattern: any, list: any[], substitution: Substitution): Substitution | null;
    /**
     * عمليات حسابية منطقية متقدمة
     * Advanced arithmetic operations in logic context
     */
    /**
     * مقارنة: أكبر من
     * Greater than comparison
     */
    greaterThan(left: any, right: any): boolean;
    /**
     * مقارنة: أصغر من
     * Less than comparison
     */
    lessThan(left: any, right: any): boolean;
    /**
     * مقارنة: أكبر من أو يساوي
     * Greater than or equal comparison
     */
    greaterThanOrEqual(left: any, right: any): boolean;
    /**
     * مقارنة: أصغر من أو يساوي
     * Less than or equal comparison
     */
    lessThanOrEqual(left: any, right: any): boolean;
    /**
     * مقارنة: يساوي (حسابياً)
     * Arithmetic equality
     */
    arithmeticEqual(left: any, right: any): boolean;
    /**
     * مقارنة: لا يساوي (حسابياً)
     * Arithmetic inequality
     */
    arithmeticNotEqual(left: any, right: any): boolean;
}
