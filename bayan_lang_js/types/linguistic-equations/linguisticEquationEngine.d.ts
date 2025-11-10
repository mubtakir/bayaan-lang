/**
 * Linguistic Equation Engine - محرك المعادلات اللغوية
 *
 * This engine processes linguistic equations and manages causal relationships
 * between entities with support for custom operators and result cancellation.
 *
 * هذا المحرك يعالج المعادلات اللغوية ويدير العلاقات السببية
 * بين الكيانات مع دعم المشغلات المخصصة وتعطيل النتائج.
 */
import { LinguisticEntity, LinguisticEquation, LinguisticRole, EquationOperator, Condition, EquationContext, EquationEvent, CustomOperatorDefinition } from './linguisticEquationTypes';
/**
 * Linguistic Equation Engine - محرك المعادلات اللغوية
 */
export declare class LinguisticEquationEngine {
    private context;
    private customOperators;
    private cancellations;
    constructor();
    /**
     * Initialize built-in operators - تهيئة المشغلات المدمجة
     */
    private initializeBuiltInOperators;
    /**
     * Register a custom operator - تسجيل مشغل مخصص
     */
    registerOperator(operator: EquationOperator): void;
    /**
     * Define a custom operator from definition - تعريف مشغل مخصص من التعريف
     */
    defineCustomOperator(definition: CustomOperatorDefinition): void;
    /**
     * Create an entity - إنشاء كيان
     */
    createEntity(name: string, role: LinguisticRole, attributes?: Map<string, any>): LinguisticEntity;
    /**
     * Create an equation - إنشاء معادلة
     */
    createEquation(name: string, description: string, inputs: LinguisticEntity[], operators: EquationOperator[], conditions?: Condition[]): LinguisticEquation;
    /**
     * Execute an equation - تنفيذ معادلة
     */
    executeEquation(equation: LinguisticEquation): EquationEvent;
    /**
     * Cancel an effect - تعطيل تأثير
     */
    cancelEffect(effectId: string, reason: string, condition: Condition): void;
    /**
     * Get context - الحصول على السياق
     */
    getContext(): EquationContext;
    /**
     * Get entity by ID - الحصول على كيان بالمعرف
     */
    getEntity(id: string): LinguisticEntity | undefined;
    /**
     * Get equation by ID - الحصول على معادلة بالمعرف
     */
    getEquation(id: string): LinguisticEquation | undefined;
    private applyCausesOperator;
    private applyEnablesOperator;
    private applyPreventsOperator;
    private applyTriggersOperator;
    private applyInhibitsOperator;
    private applyTransformsOperator;
    private applyIncreasesOperator;
    private applyDecreasesOperator;
}
