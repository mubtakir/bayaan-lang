/**
 * محرك الاستنتاج الذكي
 * Smart Inference Engine
 *
 * نظام للاستنتاج التلقائي وفحص الشروط وتسجيل المجهولات
 * System for automatic inference, condition checking, and unknown tracking
 */
import { Thing } from './thingEngine';
import { CausalEngine, RelationType } from '../../logic/causalEngine';
/**
 * نوع الاستنتاج - Inference Type
 */
export declare enum InferenceType {
    DEDUCTIVE = "\u0627\u0633\u062A\u0646\u062A\u0627\u062C_\u0627\u0633\u062A\u0646\u0628\u0627\u0637\u064A",// Deductive inference
    INDUCTIVE = "\u0627\u0633\u062A\u0646\u062A\u0627\u062C_\u0627\u0633\u062A\u0642\u0631\u0627\u0626\u064A",// Inductive inference
    ABDUCTIVE = "\u0627\u0633\u062A\u0646\u062A\u0627\u062C_\u0627\u062E\u062A\u0637\u0627\u0641\u064A",// Abductive inference
    ANALOGICAL = "\u0627\u0633\u062A\u0646\u062A\u0627\u062C_\u0642\u064A\u0627\u0633\u064A"
}
/**
 * المجهول - Unknown
 */
export declare class Unknown {
    id: string;
    question: string;
    context: Map<string, any>;
    relatedThings: string[];
    timestamp: number;
    constructor(id: string, // معرف المجهول - Unknown ID
    question: string, // السؤال - Question
    context?: Map<string, any>, // السياق - Context
    relatedThings?: string[], // الأشياء المرتبطة - Related things
    timestamp?: number);
    /**
     * إضافة معلومة للسياق
     * Add information to context
     */
    addContext(key: string, value: any): void;
    /**
     * إضافة شيء مرتبط
     * Add related thing
     */
    addRelatedThing(thing: string): void;
    toString(): string;
}
/**
 * الاستنتاج - Inference
 */
export declare class Inference {
    type: InferenceType;
    premise: string[];
    conclusion: string;
    confidence: number;
    explanation: string;
    constructor(type: InferenceType, // نوع الاستنتاج - Inference type
    premise: string[], // المقدمات - Premises
    conclusion: string, // النتيجة - Conclusion
    confidence?: number, // درجة الثقة (0-1) - Confidence
    explanation?: string);
    toString(): string;
}
/**
 * قاعدة الاستنتاج - Inference Rule
 */
export declare class InferenceRule {
    name: string;
    conditions: Map<string, any>;
    conclusion: string;
    confidence: number;
    constructor(name: string, // اسم القاعدة - Rule name
    conditions?: Map<string, any>, // الشروط - Conditions
    conclusion?: string, // النتيجة - Conclusion
    confidence?: number);
    /**
     * التحقق من الشروط
     * Check conditions
     */
    checkConditions(context: Map<string, any>): boolean;
    /**
     * تطبيق القاعدة
     * Apply rule
     */
    apply(context: Map<string, any>): Inference | null;
    toString(): string;
}
/**
 * محرك الاستنتاج الذكي - Smart Inference Engine
 */
export declare class InferenceEngine {
    private rules;
    private unknowns;
    private inferences;
    private causalEngine;
    /**
     * إضافة قاعدة استنتاج
     * Add inference rule
     */
    addRule(rule: InferenceRule): void;
    /**
     * الحصول على قاعدة
     * Get rule
     */
    getRule(name: string): InferenceRule | undefined;
    /**
     * تسجيل مجهول
     * Register unknown
     */
    registerUnknown(unknown: Unknown): void;
    /**
     * الحصول على مجهول
     * Get unknown
     */
    getUnknown(id: string): Unknown | undefined;
    /**
     * الحصول على جميع المجهولات
     * Get all unknowns
     */
    getAllUnknowns(): Unknown[];
    /**
     * محاولة حل مجهول
     * Try to resolve unknown
     */
    tryResolveUnknown(unknownId: string, newContext: Map<string, any>): Inference | null;
    /**
     * فحص شيء تلقائياً
     * Auto-check thing
     *
     * يفحص خصائص الشيء ويستنتج النتائج تلقائياً
     */
    autoCheckThing(thing: Thing): Inference[];
    /**
     * إنشاء قاعدة من ملاحظة
     * Create rule from observation
     *
     * مثال: إذا لاحظنا أن الورقة احترقت عند 233°C، نسجل ذلك
     */
    createRuleFromObservation(name: string, observation: Map<string, any>, result: string, confidence?: number): InferenceRule;
    /**
     * البحث عن سبب
     * Find cause
     *
     * يستخدم المحرك السببي للبحث عن أسباب محتملة
     */
    findCause(effect: string): string[];
    /**
     * البحث عن نتيجة
     * Find effect
     *
     * يستخدم المحرك السببي للبحث عن نتائج محتملة
     */
    findEffect(cause: string): string[];
    /**
     * إضافة علاقة سببية
     * Add causal relation
     */
    addCausalRelation(from: string, to: string, type: RelationType, weight: number): void;
    /**
     * الحصول على المحرك السببي
     * Get causal engine
     */
    getCausalEngine(): CausalEngine;
    /**
     * الحصول على جميع الاستنتاجات
     * Get all inferences
     */
    getAllInferences(): Inference[];
    /**
     * مسح الاستنتاجات
     * Clear inferences
     */
    clearInferences(): void;
    /**
     * إحصائيات
     * Statistics
     */
    getStatistics(): {
        rulesCount: number;
        unknownsCount: number;
        inferencesCount: number;
        averageConfidence: number;
    };
}
