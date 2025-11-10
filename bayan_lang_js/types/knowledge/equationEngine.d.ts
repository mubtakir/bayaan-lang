/**
 * محرك المعادلات المنطقية
 * Logical Equation Engine
 *
 * نظام للمعادلات المنطقية: الفاعل + الفعل + المفعول = النتائج
 * System for logical equations: Subject + Action + Object = Results
 */
import { Event } from './eventEngine';
/**
 * عنصر المعادلة - Equation Element
 */
export declare class EquationElement {
    name: string;
    type: 'subject' | 'action' | 'object' | 'result';
    value: any;
    properties: Map<string, any>;
    constructor(name: string, // اسم العنصر - Element name
    type: 'subject' | 'action' | 'object' | 'result', // نوع العنصر
    value?: any, // القيمة - Value
    properties?: Map<string, any>);
    toString(): string;
}
/**
 * المعادلة المنطقية - Logical Equation
 *
 * تمثل: الفاعل + الفعل + المفعول = النتائج
 * Represents: Subject + Action + Object = Results
 */
export declare class LogicalEquation {
    name: string;
    private subject?;
    private action?;
    private object?;
    private results;
    constructor(name: string);
    /**
     * تعيين الفاعل
     * Set subject
     */
    setSubject(subject: EquationElement): void;
    /**
     * تعيين الفعل
     * Set action
     */
    setAction(action: EquationElement): void;
    /**
     * تعيين المفعول به
     * Set object
     */
    setObject(object: EquationElement): void;
    /**
     * إضافة نتيجة
     * Add result
     */
    addResult(result: EquationElement): void;
    /**
     * الحصول على الفاعل
     * Get subject
     */
    getSubject(): EquationElement | undefined;
    /**
     * الحصول على الفعل
     * Get action
     */
    getAction(): EquationElement | undefined;
    /**
     * الحصول على المفعول به
     * Get object
     */
    getObject(): EquationElement | undefined;
    /**
     * الحصول على النتائج
     * Get results
     */
    getResults(): EquationElement[];
    /**
     * التحقق من اكتمال المعادلة
     * Check if equation is complete
     */
    isComplete(): boolean;
    /**
     * تحويل إلى حدث
     * Convert to event
     */
    toEvent(): Event;
    toString(): string;
}
/**
 * نوع العملية - Operation Type
 */
export declare enum OperationType {
    ADD = "\u062C\u0645\u0639",// Addition
    SUBTRACT = "\u0637\u0631\u062D",// Subtraction
    MULTIPLY = "\u0636\u0631\u0628",// Multiplication
    DIVIDE = "\u0642\u0633\u0645\u0629",// Division
    NEGATE = "\u0646\u0641\u064A",// Negation
    EQUAL = "\u064A\u0633\u0627\u0648\u064A",// Equality
    OPPOSITE = "\u0639\u0643\u0633"
}
/**
 * العملية المنطقية - Logical Operation
 *
 * مثل: الحر = - البرد
 * Example: Hot = - Cold
 */
export declare class LogicalOperation {
    left: string;
    operation: OperationType;
    right: string;
    result?: string | undefined;
    constructor(left: string, // الطرف الأيسر - Left side
    operation: OperationType, // العملية - Operation
    right: string, // الطرف الأيمن - Right side
    result?: string | undefined);
    /**
     * تقييم العملية
     * Evaluate operation
     */
    evaluate(values: Map<string, any>): any;
    toString(): string;
}
/**
 * محرك المعادلات - Equation Engine
 */
export declare class EquationEngine {
    private equations;
    private operations;
    /**
     * إضافة معادلة
     * Add equation
     */
    addEquation(equation: LogicalEquation): void;
    /**
     * الحصول على معادلة
     * Get equation
     */
    getEquation(name: string): LogicalEquation | undefined;
    /**
     * إضافة عملية
     * Add operation
     */
    addOperation(name: string, operation: LogicalOperation): void;
    /**
     * الحصول على عملية
     * Get operation
     */
    getOperation(name: string): LogicalOperation | undefined;
    /**
     * إنشاء معادلة بسيطة
     * Create simple equation
     *
     * مثل: أحمد + أكل + تفاحة = أحمد(شبع) + حقل(نقص تفاحة)
     */
    createSimpleEquation(name: string, subject: string, action: string, object: string, results: Array<{
        name: string;
        description: string;
    }>): LogicalEquation;
    /**
     * إنشاء عملية عكسية
     * Create opposite operation
     *
     * مثل: الحر = - البرد
     */
    createOppositeOperation(name: string, left: string, right: string): LogicalOperation;
    /**
     * الحصول على جميع المعادلات
     * Get all equations
     */
    getAllEquations(): LogicalEquation[];
    /**
     * الحصول على جميع العمليات
     * Get all operations
     */
    getAllOperations(): LogicalOperation[];
    /**
     * البحث عن معادلات حسب الفاعل
     * Find equations by subject
     */
    findBySubject(subject: string): LogicalEquation[];
    /**
     * البحث عن معادلات حسب الفعل
     * Find equations by action
     */
    findByAction(action: string): LogicalEquation[];
}
