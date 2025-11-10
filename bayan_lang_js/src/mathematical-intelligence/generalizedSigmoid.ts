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
export const SAFE_PARAM_RANGES = {
  n: { min: 1, max: 25, recommended: { min: 5, max: 15 } },
  k: { min: 0.1, max: 500, recommended: { min: 50, max: 300 } },
  alpha: { min: -10, max: 10 },
  x0: { min: -Infinity, max: Infinity }
} as const;

/**
 * دالة سيغمويد المعممة
 * Generalized Sigmoid Function
 */
export class GeneralizedSigmoid {
  constructor(
    public params: SigmoidParams
  ) {
    this.validateParams();
  }

  /**
   * التحقق من صحة المعاملات
   * Validate parameters
   */
  private validateParams(): void {
    const { alpha, n, k, x0 } = this.params;

    // التحقق من n
    if (n < SAFE_PARAM_RANGES.n.min || n > SAFE_PARAM_RANGES.n.max) {
      console.warn(`⚠️ معامل التقطيع n=${n} خارج النطاق الآمن [${SAFE_PARAM_RANGES.n.min}, ${SAFE_PARAM_RANGES.n.max}]`);
    }
    if (!Number.isInteger(n) || n <= 0) {
      throw new Error(`❌ معامل التقطيع n يجب أن يكون عدد صحيح موجب. القيمة الحالية: ${n}`);
    }

    // التحقق من k
    if (k <= 0) {
      throw new Error(`❌ معامل الحدة k يجب أن يكون موجب. القيمة الحالية: ${k}`);
    }
    if (k < SAFE_PARAM_RANGES.k.min || k > SAFE_PARAM_RANGES.k.max) {
      console.warn(`⚠️ معامل الحدة k=${k} خارج النطاق الآمن [${SAFE_PARAM_RANGES.k.min}, ${SAFE_PARAM_RANGES.k.max}]`);
    }

    // التحقق من alpha
    if (Math.abs(alpha) > SAFE_PARAM_RANGES.alpha.max) {
      console.warn(`⚠️ معامل الوزن alpha=${alpha} خارج النطاق الموصى به`);
    }

    // تحذير من التركيبات الخطرة
    if (n > 15 && k > 300) {
      console.warn(`⚠️ تحذير: التركيبة (n=${n}, k=${k}) قد تسبب عدم استقرار عددي!`);
    }
  }

  /**
   * تقييم الدالة عند نقطة
   * Evaluate function at point
   */
  evaluate(x: number): number {
    const { alpha, n, k, x0 } = this.params;

    try {
      // حساب الأس: -k * (x - x₀)^n
      const diff = x - x0;
      const powered = Math.pow(diff, n);
      const exponent = -k * powered;

      // التحقق من الفيض العددي
      if (exponent > 700) {
        // exp(700) ≈ 10^304 (قريب من infinity)
        return 0; // σ → 0
      }
      if (exponent < -700) {
        // exp(-700) ≈ 0
        return alpha; // σ → 1, فـ α·σ → α
      }

      // حساب السيغمويد: 1 / (1 + e^exponent)
      const sigmoid = 1 / (1 + Math.exp(exponent));

      // تطبيق معامل الوزن
      return alpha * sigmoid;

    } catch (error) {
      console.error(`❌ خطأ في تقييم السيغمويد عند x=${x}:`, error);
      return 0;
    }
  }

  /**
   * تقييم الدالة عند نقاط متعددة
   * Evaluate function at multiple points
   */
  evaluateArray(xValues: number[]): number[] {
    return xValues.map(x => this.evaluate(x));
  }

  /**
   * حساب المشتقة الأولى
   * Calculate first derivative
   */
  derivative(x: number): number {
    const { alpha, n, k, x0 } = this.params;
    const diff = x - x0;
    
    if (Math.abs(diff) < 1e-10) {
      // عند نقطة المنتصف
      return alpha * k * n / 4;
    }

    const powered = Math.pow(diff, n);
    const exponent = -k * powered;
    
    if (Math.abs(exponent) > 700) {
      return 0; // المشتقة تقترب من صفر
    }

    const expVal = Math.exp(exponent);
    const sigmoid = 1 / (1 + expVal);
    
    // dσ/dx = k·n·(x-x₀)^(n-1)·σ·(1-σ)
    const poweredDerivative = n * Math.pow(diff, n - 1);
    return alpha * k * poweredDerivative * sigmoid * (1 - sigmoid);
  }

  /**
   * إنشاء سيغمويد تقليدية (n=1)
   * Create traditional sigmoid (n=1)
   */
  static traditional(alpha: number, k: number, x0: number): GeneralizedSigmoid {
    return new GeneralizedSigmoid({ alpha, n: 1, k, x0 });
  }

  /**
   * إنشاء سيغمويد حادة (n فردي كبير)
   * Create sharp sigmoid (large odd n)
   */
  static sharp(alpha: number, k: number, x0: number, n: number = 7): GeneralizedSigmoid {
    if (n % 2 === 0) {
      console.warn(`⚠️ للحصول على انتقال حاد، يُفضل استخدام n فردي. تم تعديل n من ${n} إلى ${n + 1}`);
      n = n + 1;
    }
    return new GeneralizedSigmoid({ alpha, n, k, x0 });
  }

  /**
   * إنشاء سيغمويد جرسية (n زوجي)
   * Create bell-shaped sigmoid (even n)
   */
  static bell(alpha: number, k: number, x0: number, n: number = 2): GeneralizedSigmoid {
    if (n % 2 !== 0) {
      console.warn(`⚠️ للحصول على شكل جرسي، يُفضل استخدام n زوجي. تم تعديل n من ${n} إلى ${n + 1}`);
      n = n + 1;
    }
    return new GeneralizedSigmoid({ alpha, n, k, x0 });
  }

  /**
   * نسخ الدالة
   * Clone function
   */
  clone(): GeneralizedSigmoid {
    return new GeneralizedSigmoid({ ...this.params });
  }

  /**
   * تحديث معامل
   * Update parameter
   */
  updateParam(key: keyof SigmoidParams, value: number): void {
    this.params[key] = value;
    this.validateParams();
  }

  /**
   * تصدير إلى JSON
   * Export to JSON
   */
  toJSON(): any {
    return {
      type: 'generalized_sigmoid',
      params: this.params,
      formula: `${this.params.alpha}·σ_${this.params.n}(x; ${this.params.k}, ${this.params.x0})`
    };
  }

  /**
   * استيراد من JSON
   * Import from JSON
   */
  static fromJSON(data: any): GeneralizedSigmoid {
    return new GeneralizedSigmoid(data.params);
  }

  /**
   * تمثيل نصي
   * String representation
   */
  toString(): string {
    const { alpha, n, k, x0 } = this.params;
    return `${alpha.toFixed(2)}·σ_${n}(x; k=${k.toFixed(2)}, x₀=${x0.toFixed(2)})`;
  }

  /**
   * تمثيل رياضي مفصل
   * Detailed mathematical representation
   */
  toMathString(): string {
    const { alpha, n, k, x0 } = this.params;
    const sign = x0 >= 0 ? '-' : '+';
    const absX0 = Math.abs(x0);
    return `${alpha.toFixed(2)} / (1 + e^(-${k.toFixed(2)}·(x ${sign} ${absX0.toFixed(2)})^${n}))`;
  }
}

/**
 * مساعدات لإنشاء سيغمويد شائعة
 * Helpers for creating common sigmoids
 */
export const SigmoidPresets = {
  /**
   * دالة خطوة (Step function approximation)
   */
  step: (x0: number = 0): GeneralizedSigmoid => 
    new GeneralizedSigmoid({ alpha: 1, n: 7, k: 100, x0 }),

  /**
   * انتقال ناعم (Smooth transition)
   */
  smooth: (x0: number = 0): GeneralizedSigmoid => 
    new GeneralizedSigmoid({ alpha: 1, n: 1, k: 2, x0 }),

  /**
   * نبضة (Pulse)
   */
  pulse: (x0: number = 0, width: number = 1): GeneralizedSigmoid => 
    new GeneralizedSigmoid({ alpha: 1, n: 2, k: 10 / width, x0 }),

  /**
   * منحدر (Ramp)
   */
  ramp: (x0: number = 0, steepness: number = 1): GeneralizedSigmoid => 
    new GeneralizedSigmoid({ alpha: 1, n: 1, k: steepness, x0 }),
} as const;

