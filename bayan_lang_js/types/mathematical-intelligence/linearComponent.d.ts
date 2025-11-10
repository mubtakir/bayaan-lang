/**
 * المكون الخطي - Linear Component
 *
 * نظام لتمثيل الاتجاهات العامة والمنحدرات في الدوال
 * System for representing general trends and slopes in functions
 *
 * المعادلة الأساسية | Basic Equation:
 * L(x; β, γ) = βx + γ
 *
 * المعاملات | Parameters:
 * - β (beta): الميل (Slope)
 * - γ (gamma): الجزء المقطوع من المحور الصادي (Y-intercept)
 *
 * الخصائص | Properties:
 * - β > 0: خط متزايد (Increasing line)
 * - β < 0: خط متناقص (Decreasing line)
 * - β = 0: خط أفقي (Horizontal line)
 * - γ: يحدد موقع الخط على المحور الصادي (Determines vertical position)
 */
/**
 * معاملات المكون الخطي
 * Linear Component Parameters
 */
export interface LinearParams {
    /** الميل - Slope */
    beta: number;
    /** الجزء المقطوع - Y-intercept */
    gamma: number;
}
/**
 * المكون الخطي
 * Linear Component
 */
export declare class LinearComponent {
    params: LinearParams;
    constructor(params: LinearParams);
    /**
     * تقييم الدالة عند نقطة
     * Evaluate function at point
     */
    evaluate(x: number): number;
    /**
     * تقييم الدالة عند نقاط متعددة
     * Evaluate function at multiple points
     */
    evaluateArray(xValues: number[]): number[];
    /**
     * حساب المشتقة الأولى (الميل)
     * Calculate first derivative (slope)
     */
    derivative(x: number): number;
    /**
     * حساب المشتقة الثانية (دائماً صفر للخط المستقيم)
     * Calculate second derivative (always zero for straight line)
     */
    secondDerivative(x: number): number;
    /**
     * حساب قيمة x عند y معطى
     * Calculate x value for given y
     */
    inverseEvaluate(y: number): number | null;
    /**
     * إيجاد نقطة التقاطع مع خط آخر
     * Find intersection point with another line
     */
    intersect(other: LinearComponent): {
        x: number;
        y: number;
    } | null;
    /**
     * حساب المسافة العمودية من نقطة إلى الخط
     * Calculate perpendicular distance from point to line
     */
    distanceFromPoint(point: {
        x: number;
        y: number;
    }): number;
    /**
     * إنشاء خط من نقطتين
     * Create line from two points
     */
    static fromTwoPoints(p1: {
        x: number;
        y: number;
    }, p2: {
        x: number;
        y: number;
    }): LinearComponent;
    /**
     * إنشاء خط من نقطة وميل
     * Create line from point and slope
     */
    static fromPointAndSlope(point: {
        x: number;
        y: number;
    }, slope: number): LinearComponent;
    /**
     * إنشاء خط أفقي
     * Create horizontal line
     */
    static horizontal(y: number): LinearComponent;
    /**
     * إنشاء خط عمودي (تمثيل تقريبي بميل كبير جداً)
     * Create vertical line (approximate representation with very large slope)
     */
    static vertical(x: number): LinearComponent;
    /**
     * إنشاء خط يمر بنقطة الأصل
     * Create line passing through origin
     */
    static throughOrigin(slope: number): LinearComponent;
    /**
     * نسخ المكون
     * Clone component
     */
    clone(): LinearComponent;
    /**
     * تحديث معامل
     * Update parameter
     */
    updateParam(key: keyof LinearParams, value: number): void;
    /**
     * الحصول على زاوية الميل (بالراديان)
     * Get slope angle (in radians)
     */
    getAngle(): number;
    /**
     * الحصول على زاوية الميل (بالدرجات)
     * Get slope angle (in degrees)
     */
    getAngleDegrees(): number;
    /**
     * التحقق من التوازي مع خط آخر
     * Check if parallel to another line
     */
    isParallelTo(other: LinearComponent): boolean;
    /**
     * التحقق من التعامد مع خط آخر
     * Check if perpendicular to another line
     */
    isPerpendicularTo(other: LinearComponent): boolean;
    /**
     * إنشاء خط عمودي على هذا الخط ويمر بنقطة معطاة
     * Create perpendicular line passing through given point
     */
    perpendicularThrough(point: {
        x: number;
        y: number;
    }): LinearComponent;
    /**
     * تصدير إلى JSON
     * Export to JSON
     */
    toJSON(): any;
    /**
     * استيراد من JSON
     * Import from JSON
     */
    static fromJSON(data: any): LinearComponent;
    /**
     * تمثيل نصي
     * String representation
     */
    toString(): string;
    /**
     * تمثيل رياضي مفصل
     * Detailed mathematical representation
     */
    toMathString(): string;
}
/**
 * مساعدات لإنشاء خطوط شائعة
 * Helpers for creating common lines
 */
export declare const LinearPresets: {
    /**
     * محور X (y = 0)
     */
    readonly xAxis: () => LinearComponent;
    /**
     * محور Y (x = 0, تقريبي)
     */
    readonly yAxis: () => LinearComponent;
    /**
     * خط بزاوية 45 درجة يمر بالأصل
     */
    readonly diagonal45: () => LinearComponent;
    /**
     * خط بزاوية -45 درجة يمر بالأصل
     */
    readonly diagonalNeg45: () => LinearComponent;
    /**
     * خط أفقي عند y = 1
     */
    readonly unit: () => LinearComponent;
};
