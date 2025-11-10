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
  jumpTo?: { x: number; y: number };
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
export class GeneralShapeEquation {
  /** الحدود (المكونات) - Terms (components) */
  private terms: ShapeTerm[] = [];
  
  /** المكون الخطي الشامل - Global linear component */
  private globalLinear: LinearComponent | null = null;
  
  /** الخصائص البصرية العامة - Global visual properties */
  public visualProperties: GlobalVisualProperties = {};

  constructor() {}

  /**
   * إضافة حد سيغمويد
   * Add sigmoid term
   */
  addSigmoidTerm(
    params: SigmoidParams,
    visualProps?: TermVisualProperties,
    order?: number
  ): void {
    const sigmoid = new GeneralizedSigmoid(params);
    const term: ShapeTerm = {
      type: 'sigmoid',
      sigmoid,
      order: order ?? this.terms.length,
      visualProperties: visualProps
    };
    this.terms.push(term);
    this.sortTerms();
  }

  /**
   * إضافة حد خطي
   * Add linear term
   */
  addLinearTerm(
    params: LinearParams,
    visualProps?: TermVisualProperties,
    order?: number
  ): void {
    const linear = new LinearComponent(params);
    const term: ShapeTerm = {
      type: 'linear',
      linear,
      order: order ?? this.terms.length,
      visualProperties: visualProps
    };
    this.terms.push(term);
    this.sortTerms();
  }

  /**
   * إضافة حد مخصص
   * Add custom term
   */
  addCustomTerm(
    customFunction: (x: number) => number,
    visualProps?: TermVisualProperties,
    order?: number
  ): void {
    const term: ShapeTerm = {
      type: 'custom',
      customFunction,
      order: order ?? this.terms.length,
      visualProperties: visualProps
    };
    this.terms.push(term);
    this.sortTerms();
  }

  /**
   * إضافة نقطة قفز (للانتقال بين أجزاء الشكل)
   * Add jump point (for transitioning between shape parts)
   */
  addJumpPoint(jumpTo: { x: number; y: number }, order?: number): void {
    const term: ShapeTerm = {
      type: 'jump',
      order: order ?? this.terms.length,
      visualProperties: { jumpTo }
    };
    this.terms.push(term);
    this.sortTerms();
  }

  /**
   * تعيين المكون الخطي الشامل
   * Set global linear component
   */
  setGlobalLinear(params: LinearParams): void {
    this.globalLinear = new LinearComponent(params);
  }

  /**
   * ترتيب الحدود حسب order
   * Sort terms by order
   */
  private sortTerms(): void {
    this.terms.sort((a, b) => a.order - b.order);
  }

  /**
   * تقييم المعادلة عند نقطة
   * Evaluate equation at point
   */
  evaluate(x: number): number {
    let result = 0;

    // إضافة المكون الخطي الشامل
    if (this.globalLinear) {
      result += this.globalLinear.evaluate(x);
    }

    // إضافة جميع الحدود
    for (const term of this.terms) {
      if (term.type === 'sigmoid' && term.sigmoid) {
        result += term.sigmoid.evaluate(x);
      } else if (term.type === 'linear' && term.linear) {
        result += term.linear.evaluate(x);
      } else if (term.type === 'custom' && term.customFunction) {
        result += term.customFunction(x);
      }
      // نقاط القفز لا تساهم في القيمة
    }

    return result;
  }

  /**
   * تقييم المعادلة عند نقاط متعددة
   * Evaluate equation at multiple points
   */
  evaluateArray(xValues: number[]): number[] {
    return xValues.map(x => this.evaluate(x));
  }

  /**
   * رسم الشكل (إرجاع نقاط مع خصائص الرسم)
   * Render shape (return points with drawing properties)
   */
  render(
    xMin: number,
    xMax: number,
    resolution: number = 100
  ): Array<{ x: number; y: number; props?: TermVisualProperties }> {
    const points: Array<{ x: number; y: number; props?: TermVisualProperties }> = [];
    const dx = (xMax - xMin) / resolution;

    for (let i = 0; i <= resolution; i++) {
      const x = xMin + i * dx;
      const y = this.evaluate(x);
      
      // إيجاد الخصائص البصرية للنقطة الحالية
      const props = this.getVisualPropsAtPoint(x);
      
      points.push({ x, y, props });
    }

    return points;
  }

  /**
   * الحصول على الخصائص البصرية عند نقطة
   * Get visual properties at point
   */
  private getVisualPropsAtPoint(x: number): TermVisualProperties {
    // البحث عن الحد الذي يؤثر على هذه النقطة
    for (const term of this.terms) {
      if (term.visualProperties) {
        // يمكن تحسين هذا لاحقاً لتحديد الحد الأكثر تأثيراً
        return term.visualProperties;
      }
    }
    
    return {};
  }

  /**
   * حساب المشتقة الأولى
   * Calculate first derivative
   */
  derivative(x: number): number {
    let result = 0;

    if (this.globalLinear) {
      result += this.globalLinear.derivative(x);
    }

    for (const term of this.terms) {
      if (term.type === 'sigmoid' && term.sigmoid) {
        result += term.sigmoid.derivative(x);
      } else if (term.type === 'linear' && term.linear) {
        result += term.linear.derivative(x);
      }
    }

    return result;
  }

  /**
   * الحصول على عدد الحدود
   * Get number of terms
   */
  getTermCount(): number {
    return this.terms.length;
  }

  /**
   * الحصول على حد معين
   * Get specific term
   */
  getTerm(index: number): ShapeTerm | null {
    return this.terms[index] ?? null;
  }

  /**
   * حذف حد
   * Remove term
   */
  removeTerm(index: number): void {
    this.terms.splice(index, 1);
  }

  /**
   * مسح جميع الحدود
   * Clear all terms
   */
  clear(): void {
    this.terms = [];
    this.globalLinear = null;
  }

  /**
   * نسخ المعادلة
   * Clone equation
   */
  clone(): GeneralShapeEquation {
    const cloned = new GeneralShapeEquation();
    cloned.terms = this.terms.map(term => ({ ...term }));
    cloned.globalLinear = this.globalLinear?.clone() ?? null;
    cloned.visualProperties = { ...this.visualProperties };
    return cloned;
  }

  /**
   * تصدير إلى JSON
   * Export to JSON
   */
  toJSON(): any {
    return {
      type: 'general_shape_equation',
      terms: this.terms.map(term => ({
        type: term.type,
        order: term.order,
        sigmoid: term.sigmoid?.toJSON(),
        linear: term.linear?.toJSON(),
        visualProperties: term.visualProperties
      })),
      globalLinear: this.globalLinear?.toJSON(),
      visualProperties: this.visualProperties
    };
  }

  /**
   * استيراد من JSON
   * Import from JSON
   */
  static fromJSON(data: any): GeneralShapeEquation {
    const gse = new GeneralShapeEquation();
    
    if (data.globalLinear) {
      gse.globalLinear = LinearComponent.fromJSON(data.globalLinear);
    }
    
    gse.visualProperties = data.visualProperties || {};
    
    for (const termData of data.terms) {
      const term: ShapeTerm = {
        type: termData.type,
        order: termData.order,
        visualProperties: termData.visualProperties
      };
      
      if (termData.sigmoid) {
        term.sigmoid = GeneralizedSigmoid.fromJSON(termData.sigmoid);
      }
      if (termData.linear) {
        term.linear = LinearComponent.fromJSON(termData.linear);
      }
      
      gse.terms.push(term);
    }
    
    gse.sortTerms();
    return gse;
  }

  /**
   * تمثيل نصي
   * String representation
   */
  toString(): string {
    let result = 'f̂(x) = ';
    
    if (this.globalLinear) {
      result += this.globalLinear.toString();
    }
    
    for (const term of this.terms) {
      if (term.type === 'sigmoid' && term.sigmoid) {
        result += ` + ${term.sigmoid.toString()}`;
      } else if (term.type === 'linear' && term.linear) {
        result += ` + ${term.linear.toString()}`;
      } else if (term.type === 'custom') {
        result += ` + [custom]`;
      }
    }
    
    return result;
  }
}

