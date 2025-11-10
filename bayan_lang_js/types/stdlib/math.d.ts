/**
 * مكتبة الرياضيات المتقدمة للغة البيان
 */
import { GeneralizedSigmoid, LinearComponent, GeneralShapeEquation, DrawingEngine, InferenceEngine, createLineEquation, createStepFunction, createBellCurve, createSquareWave, createTriangularFunction, createCircle, printSystemInfo } from '../mathematical-intelligence';
/**
 * الثوابت الرياضية
 */
export declare const الثوابت: {
    باي: number;
    أويلر: number;
    النسبة_الذهبية: number;
    جذر_اثنين: number;
    جذر_نصف: number;
    لوغاريتم_طبيعي_اثنين: number;
    لوغاريتم_طبيعي_عشرة: number;
    لوغاريتم_عشري_أويلر: number;
    لوغاريتم_ثنائي_أويلر: number;
};
/**
 * الدوال الأساسية
 */
export declare const الدوال_الأساسية: {
    قيمة_مطلقة: (x: number) => number;
    جذر_تربيعي: (x: number) => number;
    جذر_تكعيبي: (x: number) => number;
    قوة: (x: number, y: number) => number;
    أس: (x: number) => number;
    لوغاريتم_طبيعي: (x: number) => number;
    لوغاريتم_عشري: (x: number) => number;
    لوغاريتم_ثنائي: (x: number) => number;
    تقريب: (x: number) => number;
    أرضية: (x: number) => number;
    سقف: (x: number) => number;
    اقتطاع: (x: number) => number;
    أدنى: (...values: number[]) => number;
    أقصى: (...values: number[]) => number;
    إشارة: (x: number) => number;
};
/**
 * الدوال المثلثية
 */
export declare const الدوال_المثلثية: {
    جيب: (x: number) => number;
    جيب_تمام: (x: number) => number;
    ظل: (x: number) => number;
    قاطع: (x: number) => number;
    قاطع_تمام: (x: number) => number;
    ظل_تمام: (x: number) => number;
    جيب_عكسي: (x: number) => number;
    جيب_تمام_عكسي: (x: number) => number;
    ظل_عكسي: (x: number) => number;
    ظل_عكسي_ثنائي: (y: number, x: number) => number;
    جيب_زائدي: (x: number) => number;
    جيب_تمام_زائدي: (x: number) => number;
    ظل_زائدي: (x: number) => number;
    جيب_زائدي_عكسي: (x: number) => number;
    جيب_تمام_زائدي_عكسي: (x: number) => number;
    ظل_زائدي_عكسي: (x: number) => number;
};
/**
 * تحويل الزوايا
 */
export declare const تحويل_الزوايا: {
    من_درجات_إلى_راديان: (درجات: number) => number;
    من_راديان_إلى_درجات: (راديان: number) => number;
};
/**
 * الإحصاء
 */
export declare const الإحصاء: {
    /**
     * المتوسط الحسابي
     */
    متوسط: (أرقام: number[]) => number;
    /**
     * الوسيط
     */
    وسيط: (أرقام: number[]) => number;
    /**
     * المنوال
     */
    منوال: (أرقام: number[]) => number;
    /**
     * التباين
     */
    تباين: (أرقام: number[]) => number;
    /**
     * الانحراف المعياري
     */
    انحراف_معياري: (أرقام: number[]) => number;
    /**
     * المدى
     */
    مدى: (أرقام: number[]) => number;
    /**
     * المجموع
     */
    مجموع: (أرقام: number[]) => number;
    /**
     * الضرب التراكمي
     */
    ضرب_تراكمي: (أرقام: number[]) => number;
};
/**
 * الجبر الخطي
 */
export declare const الجبر_الخطي: {
    /**
     * ضرب متجهين (الضرب النقطي)
     */
    ضرب_نقطي: (متجه1: number[], متجه2: number[]) => number;
    /**
     * طول المتجه (المعيار)
     */
    طول_متجه: (متجه: number[]) => number;
    /**
     * تطبيع المتجه
     */
    تطبيع_متجه: (متجه: number[]) => number[];
    /**
     * جمع متجهين
     */
    جمع_متجهات: (متجه1: number[], متجه2: number[]) => number[];
    /**
     * طرح متجهين
     */
    طرح_متجهات: (متجه1: number[], متجه2: number[]) => number[];
    /**
     * ضرب متجه في عدد
     */
    ضرب_متجه_في_عدد: (متجه: number[], عدد: number) => number[];
    /**
     * المسافة بين نقطتين
     */
    مسافة: (نقطة1: number[], نقطة2: number[]) => number;
};
/**
 * نظرية الأعداد
 */
export declare const نظرية_الأعداد: {
    /**
     * القاسم المشترك الأكبر
     */
    قاسم_مشترك_أكبر: (أ: number, ب: number) => number;
    /**
     * المضاعف المشترك الأصغر
     */
    مضاعف_مشترك_أصغر: (أ: number, ب: number) => number;
    /**
     * التحقق من عدد أولي
     */
    هل_أولي: (عدد: number) => boolean;
    /**
     * المضروب (Factorial)
     */
    مضروب: (عدد: number) => number;
    /**
     * التوافيق (Combinations)
     */
    توافيق: (ن: number, ر: number) => number;
    /**
     * التباديل (Permutations)
     */
    تباديل: (ن: number, ر: number) => number;
};
/**
 * الأعداد العشوائية
 */
export declare const عشوائي: {
    /**
     * عدد عشوائي بين 0 و 1
     */
    عدد: () => number;
    /**
     * عدد صحيح عشوائي بين حدين
     */
    عدد_صحيح: (أدنى: number, أقصى: number) => number;
    /**
     * اختيار عنصر عشوائي من مصفوفة
     */
    اختيار: <T>(مصفوفة: T[]) => T;
    /**
     * خلط مصفوفة
     */
    خلط: <T>(مصفوفة: T[]) => T[];
};
/**
 * 🎯 أسس الذكاء الرياضي - Mathematical Intelligence Foundations
 * نظام رياضي ثوري لتمثيل الأشكال والدوال بمعادلات ذكية
 * Revolutionary mathematical system for representing shapes and functions with intelligent equations
 */
export declare const الذكاء_الرياضي: {
    /**
     * دالة سيغمويد المعممة - Generalized Sigmoid
     * σₙ(x; k, x₀) = 1 / (1 + e^(-k(x - x₀)^n))
     */
    سيغمويد_معممة: typeof GeneralizedSigmoid;
    /**
     * المكون الخطي - Linear Component
     * L(x; β, γ) = βx + γ
     */
    مكون_خطي: typeof LinearComponent;
    /**
     * معادلة الشكل العام - General Shape Equation
     * f̂(x) = Σᵢ [αᵢ·σₙᵢ(x; kᵢ, x₀ᵢ)] + L(x; β, γ)
     */
    معادلة_الشكل_العام: typeof GeneralShapeEquation;
    /**
     * محرك الرسام - Drawing Engine
     * يحول المعادلات إلى رسومات بصرية
     */
    محرك_الرسام: typeof DrawingEngine;
    /**
     * محرك العين المستنبطة - Inference Engine
     * يستنبط المعادلات من البيانات
     */
    محرك_الاستنباط: typeof InferenceEngine;
    /**
     * الدوال المساعدة - Helper Functions
     */
    دوال_مساعدة: {
        /**
         * إنشاء معادلة خط مستقيم
         * Create line equation
         */
        خط_مستقيم: typeof createLineEquation;
        /**
         * إنشاء دالة خطوة
         * Create step function
         */
        دالة_خطوة: typeof createStepFunction;
        /**
         * إنشاء منحنى جرسي
         * Create bell curve
         */
        منحنى_جرسي: typeof createBellCurve;
        /**
         * إنشاء موجة مربعة
         * Create square wave
         */
        موجة_مربعة: typeof createSquareWave;
        /**
         * إنشاء دالة مثلثية
         * Create triangular function
         */
        دالة_مثلثية: typeof createTriangularFunction;
        /**
         * إنشاء دائرة
         * Create circle
         */
        دائرة: typeof createCircle;
    };
    /**
     * طباعة معلومات النظام
     * Print system information
     */
    معلومات_النظام: typeof printSystemInfo;
};
/**
 * الأسماء الإنجليزية - English Names
 */
export declare const MathematicalIntelligence: {
    /**
     * دالة سيغمويد المعممة - Generalized Sigmoid
     * σₙ(x; k, x₀) = 1 / (1 + e^(-k(x - x₀)^n))
     */
    سيغمويد_معممة: typeof GeneralizedSigmoid;
    /**
     * المكون الخطي - Linear Component
     * L(x; β, γ) = βx + γ
     */
    مكون_خطي: typeof LinearComponent;
    /**
     * معادلة الشكل العام - General Shape Equation
     * f̂(x) = Σᵢ [αᵢ·σₙᵢ(x; kᵢ, x₀ᵢ)] + L(x; β, γ)
     */
    معادلة_الشكل_العام: typeof GeneralShapeEquation;
    /**
     * محرك الرسام - Drawing Engine
     * يحول المعادلات إلى رسومات بصرية
     */
    محرك_الرسام: typeof DrawingEngine;
    /**
     * محرك العين المستنبطة - Inference Engine
     * يستنبط المعادلات من البيانات
     */
    محرك_الاستنباط: typeof InferenceEngine;
    /**
     * الدوال المساعدة - Helper Functions
     */
    دوال_مساعدة: {
        /**
         * إنشاء معادلة خط مستقيم
         * Create line equation
         */
        خط_مستقيم: typeof createLineEquation;
        /**
         * إنشاء دالة خطوة
         * Create step function
         */
        دالة_خطوة: typeof createStepFunction;
        /**
         * إنشاء منحنى جرسي
         * Create bell curve
         */
        منحنى_جرسي: typeof createBellCurve;
        /**
         * إنشاء موجة مربعة
         * Create square wave
         */
        موجة_مربعة: typeof createSquareWave;
        /**
         * إنشاء دالة مثلثية
         * Create triangular function
         */
        دالة_مثلثية: typeof createTriangularFunction;
        /**
         * إنشاء دائرة
         * Create circle
         */
        دائرة: typeof createCircle;
    };
    /**
     * طباعة معلومات النظام
     * Print system information
     */
    معلومات_النظام: typeof printSystemInfo;
};
/**
 * دوال مساعدة سريعة للوصول المباشر
 * Quick helper functions for direct access
 */
/**
 * إنشاء معادلة خط مستقيم
 * Create a straight line equation
 *
 * @param slope - الميل (β)
 * @param intercept - نقطة التقاطع مع المحور y (γ)
 * @returns معادلة الخط
 *
 * @example
 * ```typescript
 * // خط بميل 2 ونقطة تقاطع 3
 * const خط = أنشئ_خط_مستقيم(2, 3);
 * console.log(خط.evaluate(5)); // 13
 * ```
 */
export declare function أنشئ_خط_مستقيم(slope: number, intercept: number): GeneralShapeEquation;
/**
 * إنشاء دالة خطوة (Step Function)
 * Create a step function
 *
 * @param x0 - نقطة الانتقال
 * @param amplitude - الارتفاع
 * @returns معادلة دالة الخطوة
 *
 * @example
 * ```typescript
 * // دالة خطوة عند x=5 بارتفاع 1
 * const خطوة = أنشئ_دالة_خطوة(5, 1);
 * console.log(خطوة.evaluate(4)); // ~0
 * console.log(خطوة.evaluate(6)); // ~1
 * ```
 */
export declare function أنشئ_دالة_خطوة(x0?: number, amplitude?: number): GeneralShapeEquation;
/**
 * إنشاء منحنى جرسي (Bell Curve)
 * Create a bell curve
 *
 * @param center - المركز
 * @param width - العرض
 * @param height - الارتفاع
 * @returns معادلة المنحنى الجرسي
 *
 * @example
 * ```typescript
 * // منحنى جرسي في المركز 0 بعرض 2 وارتفاع 1
 * const جرس = أنشئ_منحنى_جرسي(0, 2, 1);
 * console.log(جرس.evaluate(0)); // ~1
 * ```
 */
export declare function أنشئ_منحنى_جرسي(center?: number, width?: number, height?: number): GeneralShapeEquation;
/**
 * إنشاء موجة مربعة (Square Wave)
 * Create a square wave
 *
 * @param period - الدورة
 * @param amplitude - الارتفاع
 * @param numCycles - عدد الدورات
 * @returns معادلة الموجة المربعة
 *
 * @example
 * ```typescript
 * // موجة مربعة بدورة 4 وارتفاع 1 ودورتين
 * const موجة = أنشئ_موجة_مربعة(4, 1, 2);
 * ```
 */
export declare function أنشئ_موجة_مربعة(period?: number, amplitude?: number, numCycles?: number): GeneralShapeEquation;
/**
 * إنشاء سيغمويد معممة
 * Create a generalized sigmoid
 *
 * @param alpha - السعة (α)
 * @param n - معامل التقطيع (n)
 * @param k - معامل الحدة (k)
 * @param x0 - نقطة المركز (x₀)
 * @returns دالة سيغمويد معممة
 *
 * @example
 * ```typescript
 * // سيغمويد تقليدية (n=1)
 * const سيغمويد = أنشئ_سيغمويد(1, 1, 1, 0);
 * console.log(سيغمويد.evaluate(0)); // 0.5
 *
 * // سيغمويد حادة (n=7)
 * const حادة = أنشئ_سيغمويد(1, 7, 100, 0);
 *
 * // منحنى جرسي (n=2)
 * const جرس = أنشئ_سيغمويد(1, 2, 10, 0);
 * ```
 */
export declare function أنشئ_سيغمويد(alpha?: number, n?: number, k?: number, x0?: number): GeneralizedSigmoid;
/**
 * إنشاء معادلة شكل عام فارغة
 * Create an empty general shape equation
 *
 * @returns معادلة شكل عام جديدة
 *
 * @example
 * ```typescript
 * const معادلة = أنشئ_معادلة_شكل();
 *
 * // إضافة مكون خطي
 * معادلة.setGlobalLinear({ beta: 0.5, gamma: 0 });
 *
 * // إضافة حد سيغمويد
 * معادلة.addSigmoidTerm({
 *   alpha: 2,
 *   n: 1,
 *   k: 1,
 *   x0: 5
 * }, {
 *   lineColorStart: '#FF0000',
 *   lineColorEnd: '#00FF00',
 *   lineWidthStart: 2,
 *   lineWidthEnd: 1
 * });
 *
 * // تقييم
 * console.log(معادلة.evaluate(5)); // 3.5
 *
 * // رسم
 * const نقاط = معادلة.render(0, 10, 100);
 * ```
 */
export declare function أنشئ_معادلة_شكل(): GeneralShapeEquation;
/**
 * استنباط معادلة من نقاط بيانات
 * Infer equation from data points
 *
 * @param dataPoints - نقاط البيانات
 * @returns المعادلة المستنبطة
 *
 * @example
 * ```typescript
 * const بيانات = [
 *   { x: 0, y: 1 },
 *   { x: 1, y: 3 },
 *   { x: 2, y: 5 }
 * ];
 *
 * const معادلة = استنبط_معادلة(بيانات);
 * console.log(معادلة.evaluate(3)); // ~7
 * ```
 */
export declare function استنبط_معادلة(dataPoints: Array<{
    x: number;
    y: number;
}>): GeneralShapeEquation;
/**
 * رسم معادلة
 * Draw an equation
 *
 * @param equation - المعادلة
 * @param options - خيارات الرسم
 * @returns نتيجة الرسم
 *
 * @example
 * ```typescript
 * const معادلة = أنشئ_خط_مستقيم(2, 3);
 * const رسم = ارسم_معادلة(معادلة, {
 *   xRange: { min: 0, max: 10 },
 *   resolution: 100
 * });
 * ```
 */
export declare function ارسم_معادلة(equation: GeneralShapeEquation, options: {
    xRange: {
        min: number;
        max: number;
    };
    resolution?: number;
    enableGradients?: boolean;
    enableLineWidthGradients?: boolean;
}): import("../mathematical-intelligence").DrawingResult;
/**
 * تصدير معادلة إلى SVG
 * Export equation to SVG
 *
 * @param equation - المعادلة
 * @param options - خيارات التصدير
 * @returns كود SVG
 *
 * @example
 * ```typescript
 * const معادلة = أنشئ_منحنى_جرسي(0, 2, 1);
 * const svg = صدّر_إلى_svg(معادلة, {
 *   xRange: { min: -5, max: 5 }
 * });
 * ```
 */
export declare function صدّر_إلى_svg(equation: GeneralShapeEquation, options: {
    xRange: {
        min: number;
        max: number;
    };
    resolution?: number;
}): string;
