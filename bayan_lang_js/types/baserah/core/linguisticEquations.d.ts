/**
 * نظام المعادلات اللغوية - Linguistic Equations System
 * تحويل الجمل الطبيعية إلى معادلات رياضية قابلة للتنفيذ
 *
 * الفكرة = (أشياء، حدث، نتيجة)
 * Idea = (Things, Event, Result)
 */
import { MotherEquation } from './motherEquation';
import { Role, OperatorResult } from './linguisticOperators';
/**
 * عنصر في المعادلة اللغوية
 */
export interface EquationElement {
    type: 'thing' | 'event' | 'result';
    value: any;
    role?: Role;
}
/**
 * المعادلة اللغوية
 * الفكرة = (أشياء، حدث، نتيجة)
 */
export declare class LinguisticEquation {
    things: Map<Role, MotherEquation>;
    event: {
        verb: string;
        operator: string;
        params: any[];
    };
    result: {
        expectedChanges: Map<string, any>;
        actualChanges?: Map<string, any>;
    };
    constructor();
    /**
     * إضافة شيء بدور معين
     */
    addThing(role: Role, thing: MotherEquation): void;
    /**
     * تعيين الحدث
     */
    setEvent(verb: string, operator: string, params?: any[]): void;
    /**
     * تعيين النتيجة المتوقعة
     */
    setExpectedResult(changes: Map<string, any>): void;
    /**
     * تنفيذ المعادلة
     */
    execute(): OperatorResult;
    /**
     * التحقق من تطابق النتيجة المتوقعة مع الفعلية
     */
    verifyResult(): boolean;
    /**
     * تصدير إلى نص
     */
    toString(): string;
}
/**
 * محلل الجمل إلى معادلات لغوية
 */
export declare class SentenceParser {
    private verbToOperator;
    /**
     * تحليل جملة إلى معادلة لغوية
     *
     * مثال: "ضرب أحمد الكرة"
     * → الفاعل: أحمد، الفعل: ضرب، المفعول: الكرة
     */
    parse(sentence: string, objects: Map<string, MotherEquation>): LinguisticEquation;
    /**
     * إضافة فعل جديد
     */
    addVerb(verb: string, operator: string): void;
    /**
     * الحصول على جميع الأفعال
     */
    getVerbs(): string[];
}
/**
 * محرك المعادلات اللغوية
 */
export declare class LinguisticEquationEngine {
    private parser;
    private objects;
    private equations;
    constructor();
    /**
     * تسجيل كائن
     */
    registerObject(name: string, object: MotherEquation): void;
    /**
     * تحليل وتنفيذ جملة
     */
    executeSentence(sentence: string): OperatorResult;
    /**
     * الحصول على جميع المعادلات
     */
    getEquations(): LinguisticEquation[];
    /**
     * الحصول على Parser
     */
    getParser(): SentenceParser;
}
