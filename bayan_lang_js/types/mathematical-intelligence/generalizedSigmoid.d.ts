/**
 * دالة سيغمويد المعممة - Generalized Sigmoid Function
 *
 * نظام رياضي متقدم لتمثيل الانتقالات من الناعمة إلى الحادة جداً
 * Advanced mathematical system for representing transitions from smooth to very sharp
 *
 * المعادلة الأساسية | Basic Equation:
 * σₙ(x; k, x₀) = 1 / (1 + e^(-k(x - x₀)^n))
 *
 * المعاملات | Parameters:
 * - x₀: نقطة المنتصف (Center point)
 * - k: معامل الحدة (Sharpness coefficient)
 * - n: معامل التقطيع (Segmentation coefficient)
 * - α: معامل الوزن/الشدة (Weight/Intensity coefficient)
 *
 * الخصائص | Properties:
 * - n = 1: سيغمويد تقليدية ناعمة (Traditional smooth sigmoid)
 * - n فردي (n ≥ 3): انتقال حاد متزايد (Sharp increasing transition)
 * - n زوجي: شكل جرسي/نبضة (Bell curve/pulse shape)
 * - k كبير: انتقال أكثر حدة (Sharper transition)
 *
 * الاستقرار العددي | Numerical Stability:
 * - المنطقة الآمنة: n ∈ [5, 25], k ∈ [50, 500]
 * - تجنب: n كبير جداً مع k كبير جداً (يسبب فيض عددي)
 */
/**
 * معاملات دالة سيغمويد المعممة
 * Generalized Sigmoid Parameters
 */
export interface SigmoidParams {
    /** معامل الوزن/الشدة - Weight/Intensity coefficient */
    alpha: number;
    /** معامل التقطيع - Segmentation coefficient (must be positive integer) */
    n: number;
    /** معامل الحدة - Sharpness coefficient (must be positive) */
    k: number;
    /** نقطة المنتصف - Center point */
    x0: number;
}
/**
 * نطاق آمن للمعاملات
 * Safe parameter ranges
 */
export declare const SAFE_PARAM_RANGES: {
    readonly n: {
        readonly min: 1;
        readonly max: 25;
        readonly recommended: {
            readonly min: 5;
            readonly max: 15;
        };
    };
    readonly k: {
        readonly min: 0.1;
        readonly max: 500;
        readonly recommended: {
            readonly min: 50;
            readonly max: 300;
        };
    };
    readonly alpha: {
        readonly min: -10;
        readonly max: 10;
    };
    readonly x0: {
        readonly min: number;
        readonly max: number;
    };
};
/**
 * دالة سيغمويد المعممة
 * Generalized Sigmoid Function
 */
export declare class GeneralizedSigmoid {
    params: SigmoidParams;
    constructor(params: SigmoidParams);
    /**
     * التحقق من صحة المعاملات
     * Validate parameters
     */
    private validateParams;
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
     * حساب المشتقة الأولى
     * Calculate first derivative
     */
    derivative(x: number): number;
    /**
     * إنشاء سيغمويد تقليدية (n=1)
     * Create traditional sigmoid (n=1)
     */
    static traditional(alpha: number, k: number, x0: number): GeneralizedSigmoid;
    /**
     * إنشاء سيغمويد حادة (n فردي كبير)
     * Create sharp sigmoid (large odd n)
     */
    static sharp(alpha: number, k: number, x0: number, n?: number): GeneralizedSigmoid;
    /**
     * إنشاء سيغمويد جرسية (n زوجي)
     * Create bell-shaped sigmoid (even n)
     */
    static bell(alpha: number, k: number, x0: number, n?: number): GeneralizedSigmoid;
    /**
     * نسخ الدالة
     * Clone function
     */
    clone(): GeneralizedSigmoid;
    /**
     * تحديث معامل
     * Update parameter
     */
    updateParam(key: keyof SigmoidParams, value: number): void;
    /**
     * تصدير إلى JSON
     * Export to JSON
     */
    toJSON(): any;
    /**
     * استيراد من JSON
     * Import from JSON
     */
    static fromJSON(data: any): GeneralizedSigmoid;
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
 * مساعدات لإنشاء سيغمويد شائعة
 * Helpers for creating common sigmoids
 */
export declare const SigmoidPresets: {
    /**
     * دالة خطوة (Step function approximation)
     */
    readonly step: (x0?: number) => GeneralizedSigmoid;
    /**
     * انتقال ناعم (Smooth transition)
     */
    readonly smooth: (x0?: number) => GeneralizedSigmoid;
    /**
     * نبضة (Pulse)
     */
    readonly pulse: (x0?: number, width?: number) => GeneralizedSigmoid;
    /**
     * منحدر (Ramp)
     */
    readonly ramp: (x0?: number, steepness?: number) => GeneralizedSigmoid;
};
