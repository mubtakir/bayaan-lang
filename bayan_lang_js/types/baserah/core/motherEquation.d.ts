/**
 * المعادلة الأم - Mother Equation
 * النظام الأساسي لتمثيل الأشياء في نظام بصيرة AI
 *
 * O = (id, Φ, Ψ(t), Γ)
 * - id: الهوية الفريدة
 * - Φ (Phi): الخصائص الثابتة
 * - Ψ(t) (Psi): الحالات المتغيرة مع الزمن
 * - Γ (Gamma): معادلة الشكل
 */
import { Thing } from '../knowledge/thingEngine';
/**
 * معادلة الشكل - Shape Equation
 * تمثيل رياضي لهندسة الكائن
 */
export interface ShapeEquation {
    type: 'sigmoid' | 'linear' | 'polynomial' | 'bezier' | 'custom';
    coefficients: number[];
    exponents?: Array<{
        real: number;
        imaginary: number;
    }>;
    terms: ShapeTerm[];
    visualProperties: {
        lineColor?: string;
        lineWidth?: number;
        fillColor?: string;
        opacity?: number;
    };
}
/**
 * حد من معادلة الشكل
 */
export interface ShapeTerm {
    type: 'sigmoid' | 'line' | 'circle' | 'arc' | 'bezier';
    params: number[];
    order: number;
}
/**
 * المعادلة الأم - Mother Equation
 * O = (id, Φ, Ψ(t), Γ)
 */
export declare class MotherEquation {
    readonly id: string;
    readonly Φ: Map<string, any>;
    Ψ: Map<string, any>;
    Γ: ShapeEquation | null;
    private t;
    private history;
    constructor(id: string, staticProperties?: Map<string, any>, dynamicStates?: Map<string, any>, shapeEquation?: ShapeEquation | null);
    /**
     * تحديث حالة متغيرة
     */
    updateState(key: string, value: any): void;
    /**
     * الحصول على حالة في زمن معين
     */
    getStateAtTime(t: number): Map<string, any> | null;
    /**
     * الحصول على خاصية ثابتة
     */
    getStaticProperty(key: string): any;
    /**
     * الحصول على حالة متغيرة
     */
    getDynamicState(key: string): any;
    /**
     * تحويل إلى Thing (للتكامل مع ThingEngine)
     */
    toThing(): Thing;
    /**
     * إنشاء من Thing (للتكامل مع ThingEngine)
     */
    static fromThing(thing: Thing): MotherEquation;
    /**
     * تقييم معادلة الشكل عند نقطة
     */
    evaluateShape(x: number): number | null;
    /**
     * تقييم حد واحد من معادلة الشكل
     */
    private evaluateTerm;
    /**
     * رسم الشكل (إرجاع نقاط)
     */
    renderShape(resolution?: number): Array<{
        x: number;
        y: number;
    }>;
    /**
     * تصدير إلى JSON
     */
    toJSON(): any;
    /**
     * استيراد من JSON
     */
    static fromJSON(data: any): MotherEquation;
    /**
     * نسخ المعادلة
     */
    clone(): MotherEquation;
    /**
     * طباعة المعادلة
     */
    toString(): string;
}
