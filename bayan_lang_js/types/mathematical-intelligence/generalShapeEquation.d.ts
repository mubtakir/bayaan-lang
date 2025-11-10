/**
 * معادلة الشكل العام - General Shape Equation (GSE)
 *
 * نظام رياضي ثوري لتمثيل أي شكل طبيعي أو هندسي بمعادلة واحدة
 * Revolutionary mathematical system for representing any natural or geometric shape with a single equation
 *
 * المعادلة الأساسية | Basic Equation:
 * f̂(x) = Σᵢ [αᵢ·σₙᵢ(x; kᵢ, x₀ᵢ) + L(x; β, γ)]
 *
 * المكونات | Components:
 * - Σᵢ αᵢ·σₙᵢ: مجموع دوال سيغمويد معممة (Sum of generalized sigmoids)
 * - L(x; β, γ): مكون خطي شامل (Global linear component)
 *
 * الفلسفة | Philosophy:
 * كل الأشكال الطبيعية هي مزيج من استقامة وانحناء
 * All natural shapes are a mix of straightness and curvature
 *
 * الاستخدامات | Use Cases:
 * - رسم الأشكال الهندسية والطبيعية
 * - تمثيل الدوال المعقدة
 * - ضغط البيانات
 * - التعلم من صورة واحدة
 */
import { GeneralizedSigmoid, SigmoidParams } from './generalizedSigmoid';
import { LinearComponent, LinearParams } from './linearComponent';
/**
 * حد من معادلة الشكل العام
 * Term of General Shape Equation
 */
export interface ShapeTerm {
    /** نوع الحد - Term type */
    type: 'sigmoid' | 'linear' | 'jump' | 'custom';
    /** مكون سيغمويد (إذا كان النوع sigmoid) */
    sigmoid?: GeneralizedSigmoid;
    /** مكون خطي (إذا كان النوع linear) */
    linear?: LinearComponent;
    /** دالة مخصصة (إذا كان النوع custom) */
    customFunction?: (x: number) => number;
    /** ترتيب التنفيذ - Execution order */
    order: number;
    /** خصائص الرسم - Drawing properties */
    visualProperties?: TermVisualProperties;
}
/**
 * خصائص الرسم لحد واحد
 * Visual properties for a single term
 */
export interface TermVisualProperties {
    /** لون الخط عند البداية - Line color at start */
    lineColorStart?: string;
    /** لون الخط عند النهاية - Line color at end */
    lineColorEnd?: string;
    /** سمك الخط عند البداية - Line width at start */
    lineWidthStart?: number;
    /** سمك الخط عند النهاية - Line width at end */
    lineWidthEnd?: number;
    /** لون التعبئة عند البداية - Fill color at start */
    fillColorStart?: string;
    /** لون التعبئة عند النهاية - Fill color at end */
    fillColorEnd?: string;
    /** الشفافية عند البداية - Opacity at start */
    opacityStart?: number;
    /** الشفافية عند النهاية - Opacity at end */
    opacityEnd?: number;
    /** هل الشكل مغلق؟ - Is shape closed? */
    closed?: boolean;
    /** نقطة القفز (للانتقال بين الأجزاء) - Jump point (for transitions between parts) */
    jumpTo?: {
        x: number;
        y: number;
    };
}
/**
 * خصائص الرسم العامة للشكل
 * Global visual properties for the shape
 */
export interface GlobalVisualProperties {
    /** لون الخط الافتراضي - Default line color */
    defaultLineColor?: string;
    /** سمك الخط الافتراضي - Default line width */
    defaultLineWidth?: number;
    /** لون التعبئة الافتراضي - Default fill color */
    defaultFillColor?: string;
    /** الشفافية الافتراضية - Default opacity */
    defaultOpacity?: number;
    /** نمط الخط - Line style */
    lineStyle?: 'solid' | 'dashed' | 'dotted';
    /** نمط التعبئة - Fill style */
    fillStyle?: 'solid' | 'gradient' | 'pattern';
}
/**
 * معادلة الشكل العام
 * General Shape Equation
 */
export declare class GeneralShapeEquation {
    /** الحدود (المكونات) - Terms (components) */
    private terms;
    /** المكون الخطي الشامل - Global linear component */
    private globalLinear;
    /** الخصائص البصرية العامة - Global visual properties */
    visualProperties: GlobalVisualProperties;
    constructor();
    /**
     * إضافة حد سيغمويد
     * Add sigmoid term
     */
    addSigmoidTerm(params: SigmoidParams, visualProps?: TermVisualProperties, order?: number): void;
    /**
     * إضافة حد خطي
     * Add linear term
     */
    addLinearTerm(params: LinearParams, visualProps?: TermVisualProperties, order?: number): void;
    /**
     * إضافة حد مخصص
     * Add custom term
     */
    addCustomTerm(customFunction: (x: number) => number, visualProps?: TermVisualProperties, order?: number): void;
    /**
     * إضافة نقطة قفز (للانتقال بين أجزاء الشكل)
     * Add jump point (for transitioning between shape parts)
     */
    addJumpPoint(jumpTo: {
        x: number;
        y: number;
    }, order?: number): void;
    /**
     * تعيين المكون الخطي الشامل
     * Set global linear component
     */
    setGlobalLinear(params: LinearParams): void;
    /**
     * ترتيب الحدود حسب order
     * Sort terms by order
     */
    private sortTerms;
    /**
     * تقييم المعادلة عند نقطة
     * Evaluate equation at point
     */
    evaluate(x: number): number;
    /**
     * تقييم المعادلة عند نقاط متعددة
     * Evaluate equation at multiple points
     */
    evaluateArray(xValues: number[]): number[];
    /**
     * رسم الشكل (إرجاع نقاط مع خصائص الرسم)
     * Render shape (return points with drawing properties)
     */
    render(xMin: number, xMax: number, resolution?: number): Array<{
        x: number;
        y: number;
        props?: TermVisualProperties;
    }>;
    /**
     * الحصول على الخصائص البصرية عند نقطة
     * Get visual properties at point
     */
    private getVisualPropsAtPoint;
    /**
     * حساب المشتقة الأولى
     * Calculate first derivative
     */
    derivative(x: number): number;
    /**
     * الحصول على عدد الحدود
     * Get number of terms
     */
    getTermCount(): number;
    /**
     * الحصول على حد معين
     * Get specific term
     */
    getTerm(index: number): ShapeTerm | null;
    /**
     * حذف حد
     * Remove term
     */
    removeTerm(index: number): void;
    /**
     * مسح جميع الحدود
     * Clear all terms
     */
    clear(): void;
    /**
     * نسخ المعادلة
     * Clone equation
     */
    clone(): GeneralShapeEquation;
    /**
     * تصدير إلى JSON
     * Export to JSON
     */
    toJSON(): any;
    /**
     * استيراد من JSON
     * Import from JSON
     */
    static fromJSON(data: any): GeneralShapeEquation;
    /**
     * تمثيل نصي
     * String representation
     */
    toString(): string;
}
