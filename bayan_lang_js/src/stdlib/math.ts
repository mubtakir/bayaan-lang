/**
 * مكتبة الرياضيات المتقدمة للغة البيان
 */

import {
  GeneralizedSigmoid,
  LinearComponent,
  GeneralShapeEquation,
  DrawingEngine,
  InferenceEngine,
  createLineEquation,
  createStepFunction,
  createBellCurve,
  createSquareWave,
  createTriangularFunction,
  createCircle,
  printSystemInfo
} from '../mathematical-intelligence';

/**
 * الثوابت الرياضية
 */
export const الثوابت = {
  باي: Math.PI,
  أويلر: Math.E,
  النسبة_الذهبية: (1 + Math.sqrt(5)) / 2,
  جذر_اثنين: Math.SQRT2,
  جذر_نصف: Math.SQRT1_2,
  لوغاريتم_طبيعي_اثنين: Math.LN2,
  لوغاريتم_طبيعي_عشرة: Math.LN10,
  لوغاريتم_عشري_أويلر: Math.LOG10E,
  لوغاريتم_ثنائي_أويلر: Math.LOG2E,
};

/**
 * الدوال الأساسية
 */
export const الدوال_الأساسية = {
  قيمة_مطلقة: Math.abs,
  جذر_تربيعي: Math.sqrt,
  جذر_تكعيبي: Math.cbrt,
  قوة: Math.pow,
  أس: Math.exp,
  لوغاريتم_طبيعي: Math.log,
  لوغاريتم_عشري: Math.log10,
  لوغاريتم_ثنائي: Math.log2,
  
  // التقريب
  تقريب: Math.round,
  أرضية: Math.floor,
  سقف: Math.ceil,
  اقتطاع: Math.trunc,
  
  // الحد الأدنى والأقصى
  أدنى: Math.min,
  أقصى: Math.max,
  
  // الإشارة
  إشارة: Math.sign,
};

/**
 * الدوال المثلثية
 */
export const الدوال_المثلثية = {
  جيب: Math.sin,
  جيب_تمام: Math.cos,
  ظل: Math.tan,
  قاطع: (x: number) => 1 / Math.cos(x),
  قاطع_تمام: (x: number) => 1 / Math.sin(x),
  ظل_تمام: (x: number) => 1 / Math.tan(x),
  
  // الدوال العكسية
  جيب_عكسي: Math.asin,
  جيب_تمام_عكسي: Math.acos,
  ظل_عكسي: Math.atan,
  ظل_عكسي_ثنائي: Math.atan2,
  
  // الدوال الزائدية
  جيب_زائدي: Math.sinh,
  جيب_تمام_زائدي: Math.cosh,
  ظل_زائدي: Math.tanh,
  جيب_زائدي_عكسي: Math.asinh,
  جيب_تمام_زائدي_عكسي: Math.acosh,
  ظل_زائدي_عكسي: Math.atanh,
};

/**
 * تحويل الزوايا
 */
export const تحويل_الزوايا = {
  من_درجات_إلى_راديان: (درجات: number) => (درجات * Math.PI) / 180,
  من_راديان_إلى_درجات: (راديان: number) => (راديان * 180) / Math.PI,
};

/**
 * الإحصاء
 */
export const الإحصاء = {
  /**
   * المتوسط الحسابي
   */
  متوسط: (أرقام: number[]): number => {
    if (أرقام.length === 0) return 0;
    return أرقام.reduce((مجموع, رقم) => مجموع + رقم, 0) / أرقام.length;
  },

  /**
   * الوسيط
   */
  وسيط: (أرقام: number[]): number => {
    if (أرقام.length === 0) return 0;
    const مرتب = [...أرقام].sort((أ, ب) => أ - ب);
    const منتصف = Math.floor(مرتب.length / 2);
    
    if (مرتب.length % 2 === 0) {
      return (مرتب[منتصف - 1] + مرتب[منتصف]) / 2;
    }
    return مرتب[منتصف];
  },

  /**
   * المنوال
   */
  منوال: (أرقام: number[]): number => {
    if (أرقام.length === 0) return 0;
    
    const تكرارات = new Map<number, number>();
    let أكثر_تكراراً = أرقام[0];
    let أقصى_تكرار = 1;
    
    for (const رقم of أرقام) {
      const تكرار = (تكرارات.get(رقم) || 0) + 1;
      تكرارات.set(رقم, تكرار);
      
      if (تكرار > أقصى_تكرار) {
        أقصى_تكرار = تكرار;
        أكثر_تكراراً = رقم;
      }
    }
    
    return أكثر_تكراراً;
  },

  /**
   * التباين
   */
  تباين: (أرقام: number[]): number => {
    if (أرقام.length === 0) return 0;
    const متوسط = الإحصاء.متوسط(أرقام);
    const مجموع_مربعات_الفروق = أرقام.reduce(
      (مجموع, رقم) => مجموع + Math.pow(رقم - متوسط, 2),
      0
    );
    return مجموع_مربعات_الفروق / أرقام.length;
  },

  /**
   * الانحراف المعياري
   */
  انحراف_معياري: (أرقام: number[]): number => {
    return Math.sqrt(الإحصاء.تباين(أرقام));
  },

  /**
   * المدى
   */
  مدى: (أرقام: number[]): number => {
    if (أرقام.length === 0) return 0;
    return Math.max(...أرقام) - Math.min(...أرقام);
  },

  /**
   * المجموع
   */
  مجموع: (أرقام: number[]): number => {
    return أرقام.reduce((مجموع, رقم) => مجموع + رقم, 0);
  },

  /**
   * الضرب التراكمي
   */
  ضرب_تراكمي: (أرقام: number[]): number => {
    return أرقام.reduce((ضرب, رقم) => ضرب * رقم, 1);
  },
};

/**
 * الجبر الخطي
 */
export const الجبر_الخطي = {
  /**
   * ضرب متجهين (الضرب النقطي)
   */
  ضرب_نقطي: (متجه1: number[], متجه2: number[]): number => {
    if (متجه1.length !== متجه2.length) {
      throw new Error('يجب أن يكون للمتجهين نفس الطول');
    }
    return متجه1.reduce((مجموع, قيمة, فهرس) => مجموع + قيمة * متجه2[فهرس], 0);
  },

  /**
   * طول المتجه (المعيار)
   */
  طول_متجه: (متجه: number[]): number => {
    return Math.sqrt(متجه.reduce((مجموع, قيمة) => مجموع + قيمة * قيمة, 0));
  },

  /**
   * تطبيع المتجه
   */
  تطبيع_متجه: (متجه: number[]): number[] => {
    const طول = الجبر_الخطي.طول_متجه(متجه);
    if (طول === 0) return متجه;
    return متجه.map(قيمة => قيمة / طول);
  },

  /**
   * جمع متجهين
   */
  جمع_متجهات: (متجه1: number[], متجه2: number[]): number[] => {
    if (متجه1.length !== متجه2.length) {
      throw new Error('يجب أن يكون للمتجهين نفس الطول');
    }
    return متجه1.map((قيمة, فهرس) => قيمة + متجه2[فهرس]);
  },

  /**
   * طرح متجهين
   */
  طرح_متجهات: (متجه1: number[], متجه2: number[]): number[] => {
    if (متجه1.length !== متجه2.length) {
      throw new Error('يجب أن يكون للمتجهين نفس الطول');
    }
    return متجه1.map((قيمة, فهرس) => قيمة - متجه2[فهرس]);
  },

  /**
   * ضرب متجه في عدد
   */
  ضرب_متجه_في_عدد: (متجه: number[], عدد: number): number[] => {
    return متجه.map(قيمة => قيمة * عدد);
  },

  /**
   * المسافة بين نقطتين
   */
  مسافة: (نقطة1: number[], نقطة2: number[]): number => {
    if (نقطة1.length !== نقطة2.length) {
      throw new Error('يجب أن يكون للنقطتين نفس البعد');
    }
    const فرق = الجبر_الخطي.طرح_متجهات(نقطة1, نقطة2);
    return الجبر_الخطي.طول_متجه(فرق);
  },
};

/**
 * نظرية الأعداد
 */
export const نظرية_الأعداد = {
  /**
   * القاسم المشترك الأكبر
   */
  قاسم_مشترك_أكبر: (أ: number, ب: number): number => {
    أ = Math.abs(Math.floor(أ));
    ب = Math.abs(Math.floor(ب));
    
    while (ب !== 0) {
      const باقي = أ % ب;
      أ = ب;
      ب = باقي;
    }
    
    return أ;
  },

  /**
   * المضاعف المشترك الأصغر
   */
  مضاعف_مشترك_أصغر: (أ: number, ب: number): number => {
    return Math.abs(أ * ب) / نظرية_الأعداد.قاسم_مشترك_أكبر(أ, ب);
  },

  /**
   * التحقق من عدد أولي
   */
  هل_أولي: (عدد: number): boolean => {
    if (عدد < 2) return false;
    if (عدد === 2) return true;
    if (عدد % 2 === 0) return false;
    
    const جذر = Math.sqrt(عدد);
    for (let مقسوم = 3; مقسوم <= جذر; مقسوم += 2) {
      if (عدد % مقسوم === 0) return false;
    }
    
    return true;
  },

  /**
   * المضروب (Factorial)
   */
  مضروب: (عدد: number): number => {
    if (عدد < 0) throw new Error('المضروب غير معرف للأعداد السالبة');
    if (عدد === 0 || عدد === 1) return 1;
    
    let نتيجة = 1;
    for (let ط = 2; ط <= عدد; ط++) {
      نتيجة *= ط;
    }
    
    return نتيجة;
  },

  /**
   * التوافيق (Combinations)
   */
  توافيق: (ن: number, ر: number): number => {
    if (ر > ن) return 0;
    if (ر === 0 || ر === ن) return 1;
    
    return نظرية_الأعداد.مضروب(ن) / 
           (نظرية_الأعداد.مضروب(ر) * نظرية_الأعداد.مضروب(ن - ر));
  },

  /**
   * التباديل (Permutations)
   */
  تباديل: (ن: number, ر: number): number => {
    if (ر > ن) return 0;
    return نظرية_الأعداد.مضروب(ن) / نظرية_الأعداد.مضروب(ن - ر);
  },
};

/**
 * الأعداد العشوائية
 */
export const عشوائي = {
  /**
   * عدد عشوائي بين 0 و 1
   */
  عدد: Math.random,

  /**
   * عدد صحيح عشوائي بين حدين
   */
  عدد_صحيح: (أدنى: number, أقصى: number): number => {
    أدنى = Math.ceil(أدنى);
    أقصى = Math.floor(أقصى);
    return Math.floor(Math.random() * (أقصى - أدنى + 1)) + أدنى;
  },

  /**
   * اختيار عنصر عشوائي من مصفوفة
   */
  اختيار: <T>(مصفوفة: T[]): T => {
    return مصفوفة[Math.floor(Math.random() * مصفوفة.length)];
  },

  /**
   * خلط مصفوفة
   */
  خلط: <T>(مصفوفة: T[]): T[] => {
    const نسخة = [...مصفوفة];
    for (let ط = نسخة.length - 1; ط > 0; ط--) {
      const ع = Math.floor(Math.random() * (ط + 1));
      [نسخة[ط], نسخة[ع]] = [نسخة[ع], نسخة[ط]];
    }
    return نسخة;
  },
};

/**
 * 🎯 أسس الذكاء الرياضي - Mathematical Intelligence Foundations
 * نظام رياضي ثوري لتمثيل الأشكال والدوال بمعادلات ذكية
 * Revolutionary mathematical system for representing shapes and functions with intelligent equations
 */
export const الذكاء_الرياضي = {
  /**
   * دالة سيغمويد المعممة - Generalized Sigmoid
   * σₙ(x; k, x₀) = 1 / (1 + e^(-k(x - x₀)^n))
   */
  سيغمويد_معممة: GeneralizedSigmoid,

  /**
   * المكون الخطي - Linear Component
   * L(x; β, γ) = βx + γ
   */
  مكون_خطي: LinearComponent,

  /**
   * معادلة الشكل العام - General Shape Equation
   * f̂(x) = Σᵢ [αᵢ·σₙᵢ(x; kᵢ, x₀ᵢ)] + L(x; β, γ)
   */
  معادلة_الشكل_العام: GeneralShapeEquation,

  /**
   * محرك الرسام - Drawing Engine
   * يحول المعادلات إلى رسومات بصرية
   */
  محرك_الرسام: DrawingEngine,

  /**
   * محرك العين المستنبطة - Inference Engine
   * يستنبط المعادلات من البيانات
   */
  محرك_الاستنباط: InferenceEngine,

  /**
   * الدوال المساعدة - Helper Functions
   */
  دوال_مساعدة: {
    /**
     * إنشاء معادلة خط مستقيم
     * Create line equation
     */
    خط_مستقيم: createLineEquation,

    /**
     * إنشاء دالة خطوة
     * Create step function
     */
    دالة_خطوة: createStepFunction,

    /**
     * إنشاء منحنى جرسي
     * Create bell curve
     */
    منحنى_جرسي: createBellCurve,

    /**
     * إنشاء موجة مربعة
     * Create square wave
     */
    موجة_مربعة: createSquareWave,

    /**
     * إنشاء دالة مثلثية
     * Create triangular function
     */
    دالة_مثلثية: createTriangularFunction,

    /**
     * إنشاء دائرة
     * Create circle
     */
    دائرة: createCircle,
  },

  /**
   * طباعة معلومات النظام
   * Print system information
   */
  معلومات_النظام: printSystemInfo,
};

/**
 * الأسماء الإنجليزية - English Names
 */
export const MathematicalIntelligence = الذكاء_الرياضي;

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
export function أنشئ_خط_مستقيم(slope: number, intercept: number): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  equation.setGlobalLinear({ beta: slope, gamma: intercept });
  return equation;
}

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
export function أنشئ_دالة_خطوة(x0: number = 0, amplitude: number = 1): GeneralShapeEquation {
  return createStepFunction(x0, amplitude);
}

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
export function أنشئ_منحنى_جرسي(center: number = 0, width: number = 1, height: number = 1): GeneralShapeEquation {
  return createBellCurve(center, width, height);
}

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
export function أنشئ_موجة_مربعة(period: number = 2, amplitude: number = 1, numCycles: number = 3): GeneralShapeEquation {
  return createSquareWave(period, amplitude, numCycles);
}

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
export function أنشئ_سيغمويد(
  alpha: number = 1,
  n: number = 1,
  k: number = 1,
  x0: number = 0
): GeneralizedSigmoid {
  return new GeneralizedSigmoid({ alpha, n, k, x0 });
}

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
export function أنشئ_معادلة_شكل(): GeneralShapeEquation {
  return new GeneralShapeEquation();
}

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
export function استنبط_معادلة(dataPoints: Array<{ x: number; y: number }>): GeneralShapeEquation {
  const result = InferenceEngine.infer(dataPoints);
  return result.equation;
}

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
export function ارسم_معادلة(
  equation: GeneralShapeEquation,
  options: {
    xRange: { min: number; max: number };
    resolution?: number;
    enableGradients?: boolean;
    enableLineWidthGradients?: boolean;
  }
) {
  return DrawingEngine.draw(equation, options);
}

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
export function صدّر_إلى_svg(
  equation: GeneralShapeEquation,
  options: {
    xRange: { min: number; max: number };
    resolution?: number;
  }
): string {
  return DrawingEngine.toSVG(equation, options);
}

