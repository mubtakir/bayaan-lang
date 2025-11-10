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
export class LinearComponent {
  constructor(
    public params: LinearParams
  ) {}

  /**
   * تقييم الدالة عند نقطة
   * Evaluate function at point
   */
  evaluate(x: number): number {
    const { beta, gamma } = this.params;
    return beta * x + gamma;
  }

  /**
   * تقييم الدالة عند نقاط متعددة
   * Evaluate function at multiple points
   */
  evaluateArray(xValues: number[]): number[] {
    return xValues.map(x => this.evaluate(x));
  }

  /**
   * حساب المشتقة الأولى (الميل)
   * Calculate first derivative (slope)
   */
  derivative(x: number): number {
    return this.params.beta;
  }

  /**
   * حساب المشتقة الثانية (دائماً صفر للخط المستقيم)
   * Calculate second derivative (always zero for straight line)
   */
  secondDerivative(x: number): number {
    return 0;
  }

  /**
   * حساب قيمة x عند y معطى
   * Calculate x value for given y
   */
  inverseEvaluate(y: number): number | null {
    const { beta, gamma } = this.params;
    
    if (beta === 0) {
      // خط أفقي - لا يمكن إيجاد x إلا إذا كان y = gamma
      return y === gamma ? 0 : null;
    }
    
    return (y - gamma) / beta;
  }

  /**
   * إيجاد نقطة التقاطع مع خط آخر
   * Find intersection point with another line
   */
  intersect(other: LinearComponent): { x: number; y: number } | null {
    const { beta: b1, gamma: g1 } = this.params;
    const { beta: b2, gamma: g2 } = other.params;

    // إذا كان الميلان متساويان
    if (b1 === b2) {
      // خطوط متوازية - لا تقاطع (أو تقاطع لا نهائي إذا كانا نفس الخط)
      return null;
    }

    // حل المعادلة: b1·x + g1 = b2·x + g2
    const x = (g2 - g1) / (b1 - b2);
    const y = this.evaluate(x);

    return { x, y };
  }

  /**
   * حساب المسافة العمودية من نقطة إلى الخط
   * Calculate perpendicular distance from point to line
   */
  distanceFromPoint(point: { x: number; y: number }): number {
    const { beta, gamma } = this.params;
    
    // المعادلة العامة للخط: βx - y + γ = 0
    // المسافة = |βx₀ - y₀ + γ| / √(β² + 1)
    const numerator = Math.abs(beta * point.x - point.y + gamma);
    const denominator = Math.sqrt(beta * beta + 1);
    
    return numerator / denominator;
  }

  /**
   * إنشاء خط من نقطتين
   * Create line from two points
   */
  static fromTwoPoints(p1: { x: number; y: number }, p2: { x: number; y: number }): LinearComponent {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    if (Math.abs(dx) < 1e-10) {
      throw new Error('❌ لا يمكن إنشاء خط من نقطتين لهما نفس قيمة x (خط عمودي)');
    }

    const beta = dy / dx;
    const gamma = p1.y - beta * p1.x;

    return new LinearComponent({ beta, gamma });
  }

  /**
   * إنشاء خط من نقطة وميل
   * Create line from point and slope
   */
  static fromPointAndSlope(point: { x: number; y: number }, slope: number): LinearComponent {
    const gamma = point.y - slope * point.x;
    return new LinearComponent({ beta: slope, gamma });
  }

  /**
   * إنشاء خط أفقي
   * Create horizontal line
   */
  static horizontal(y: number): LinearComponent {
    return new LinearComponent({ beta: 0, gamma: y });
  }

  /**
   * إنشاء خط عمودي (تمثيل تقريبي بميل كبير جداً)
   * Create vertical line (approximate representation with very large slope)
   */
  static vertical(x: number): LinearComponent {
    console.warn('⚠️ الخطوط العمودية لا يمكن تمثيلها بدقة بمعادلة y = βx + γ');
    return new LinearComponent({ beta: 1e10, gamma: -1e10 * x });
  }

  /**
   * إنشاء خط يمر بنقطة الأصل
   * Create line passing through origin
   */
  static throughOrigin(slope: number): LinearComponent {
    return new LinearComponent({ beta: slope, gamma: 0 });
  }

  /**
   * نسخ المكون
   * Clone component
   */
  clone(): LinearComponent {
    return new LinearComponent({ ...this.params });
  }

  /**
   * تحديث معامل
   * Update parameter
   */
  updateParam(key: keyof LinearParams, value: number): void {
    this.params[key] = value;
  }

  /**
   * الحصول على زاوية الميل (بالراديان)
   * Get slope angle (in radians)
   */
  getAngle(): number {
    return Math.atan(this.params.beta);
  }

  /**
   * الحصول على زاوية الميل (بالدرجات)
   * Get slope angle (in degrees)
   */
  getAngleDegrees(): number {
    return (this.getAngle() * 180) / Math.PI;
  }

  /**
   * التحقق من التوازي مع خط آخر
   * Check if parallel to another line
   */
  isParallelTo(other: LinearComponent): boolean {
    return Math.abs(this.params.beta - other.params.beta) < 1e-10;
  }

  /**
   * التحقق من التعامد مع خط آخر
   * Check if perpendicular to another line
   */
  isPerpendicularTo(other: LinearComponent): boolean {
    // شرط التعامد: β₁ · β₂ = -1
    return Math.abs(this.params.beta * other.params.beta + 1) < 1e-10;
  }

  /**
   * إنشاء خط عمودي على هذا الخط ويمر بنقطة معطاة
   * Create perpendicular line passing through given point
   */
  perpendicularThrough(point: { x: number; y: number }): LinearComponent {
    const { beta } = this.params;
    
    if (Math.abs(beta) < 1e-10) {
      // الخط الأصلي أفقي، الخط العمودي سيكون عمودياً
      return LinearComponent.vertical(point.x);
    }
    
    // الميل العمودي = -1/β
    const perpSlope = -1 / beta;
    return LinearComponent.fromPointAndSlope(point, perpSlope);
  }

  /**
   * تصدير إلى JSON
   * Export to JSON
   */
  toJSON(): any {
    return {
      type: 'linear_component',
      params: this.params,
      formula: `L(x; ${this.params.beta}, ${this.params.gamma})`
    };
  }

  /**
   * استيراد من JSON
   * Import from JSON
   */
  static fromJSON(data: any): LinearComponent {
    return new LinearComponent(data.params);
  }

  /**
   * تمثيل نصي
   * String representation
   */
  toString(): string {
    const { beta, gamma } = this.params;
    const betaStr = beta.toFixed(2);
    const gammaStr = gamma.toFixed(2);
    const sign = gamma >= 0 ? '+' : '';
    
    if (Math.abs(beta) < 1e-10) {
      return `y = ${gammaStr}`;
    }
    
    if (Math.abs(gamma) < 1e-10) {
      return `y = ${betaStr}x`;
    }
    
    return `y = ${betaStr}x ${sign} ${gammaStr}`;
  }

  /**
   * تمثيل رياضي مفصل
   * Detailed mathematical representation
   */
  toMathString(): string {
    const { beta, gamma } = this.params;
    return `L(x; β=${beta.toFixed(4)}, γ=${gamma.toFixed(4)}) = ${beta.toFixed(4)}x + ${gamma.toFixed(4)}`;
  }
}

/**
 * مساعدات لإنشاء خطوط شائعة
 * Helpers for creating common lines
 */
export const LinearPresets = {
  /**
   * محور X (y = 0)
   */
  xAxis: (): LinearComponent => 
    LinearComponent.horizontal(0),

  /**
   * محور Y (x = 0, تقريبي)
   */
  yAxis: (): LinearComponent => 
    LinearComponent.vertical(0),

  /**
   * خط بزاوية 45 درجة يمر بالأصل
   */
  diagonal45: (): LinearComponent => 
    LinearComponent.throughOrigin(1),

  /**
   * خط بزاوية -45 درجة يمر بالأصل
   */
  diagonalNeg45: (): LinearComponent => 
    LinearComponent.throughOrigin(-1),

  /**
   * خط أفقي عند y = 1
   */
  unit: (): LinearComponent => 
    LinearComponent.horizontal(1),
} as const;

