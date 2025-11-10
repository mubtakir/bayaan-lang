/**
 * Custom Operators System - نظام المشغلات المخصصة
 *
 * This system allows programmers to define their own linguistic operators
 * with custom behavior and semantics.
 *
 * هذا النظام يسمح للمبرمجين بتعريف مشغلاتهم اللغوية الخاصة
 * مع سلوك ودلالات مخصصة.
 */
import { CustomOperatorDefinition, LinguisticRole } from './linguisticEquationTypes';
/**
 * Custom Operator Builder - بناء المشغل المخصص
 */
export declare class CustomOperatorBuilder {
    private definition;
    constructor();
    /**
     * Set operator symbol - تعيين رمز المشغل
     */
    withSymbol(symbol: string): this;
    /**
     * Set operator name (Arabic) - تعيين اسم المشغل (عربي)
     */
    withName(name: string): this;
    /**
     * Set operator name (English) - تعيين اسم المشغل (إنجليزي)
     */
    withNameEn(nameEn: string): this;
    /**
     * Set operator description - تعيين وصف المشغل
     */
    withDescription(description: string): this;
    /**
     * Set operator precedence - تعيين أسبقية المشغل
     */
    withPrecedence(precedence: number): this;
    /**
     * Set operator associativity - تعيين ترابطية المشغل
     */
    withAssociativity(associativity: 'left' | 'right'): this;
    /**
     * Set input roles - تعيين أدوار المدخلات
     */
    withInputRoles(...roles: LinguisticRole[]): this;
    /**
     * Set output roles - تعيين أدوار المخرجات
     */
    withOutputRoles(...roles: LinguisticRole[]): this;
    /**
     * Set implementation - تعيين التنفيذ
     */
    withImplementation(implementation: string): this;
    /**
     * Add example - إضافة مثال
     */
    addExample(example: string): this;
    /**
     * Build the operator definition - بناء تعريف المشغل
     */
    build(): CustomOperatorDefinition;
}
/**
 * Predefined Custom Operators - المشغلات المخصصة المعرفة مسبقاً
 */
export declare class PredefinedCustomOperators {
    /**
     * Patience Operator - مشغل الصبر
     * Example: خالد صبر ⊲ (خالد ضرب أحمد)
     * Meaning: Khalid's patience prevents him from hitting Ahmed
     */
    static patience(): CustomOperatorDefinition;
    /**
     * Aggression Increase Operator - مشغل زيادة الوحشية
     * Example: أحمد اعتدى على خالد ↑ وحشية_أحمد
     * Meaning: Ahmed's aggression increases his brutality
     */
    static aggressionIncrease(): CustomOperatorDefinition;
    /**
     * Role Reversal Operator - مشغل عكس الأدوار
     * Example: أحمد اعتدى على خالد ⇄ خالد ضرب أحمد
     * Meaning: Ahmed attacked Khalid, so Khalid hit Ahmed (role reversal)
     */
    static roleReversal(): CustomOperatorDefinition;
    /**
     * Conditional Action Operator - مشغل الفعل الشرطي
     * Example: إذا(صبر خالد) ⊣ (خالد ضرب أحمد)
     * Meaning: If Khalid is patient, then he doesn't hit Ahmed
     */
    static conditionalAction(): CustomOperatorDefinition;
    /**
     * Scientific Causation Operator - مشغل السببية العلمية
     * Example: وجود الأكسجين ⊢ الاحتراق
     * Meaning: Presence of oxygen enables combustion
     */
    static scientificCausation(): CustomOperatorDefinition;
    /**
     * Get all predefined operators - الحصول على جميع المشغلات المعرفة مسبقاً
     */
    static getAll(): CustomOperatorDefinition[];
}
