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
  // نوع المعادلة: sigmoid, linear, polynomial, custom
  type: 'sigmoid' | 'linear' | 'polynomial' | 'bezier' | 'custom';
  
  // معاملات المعادلة
  coefficients: number[];
  
  // الأسس (للدوال المعممة)
  exponents?: Array<{ real: number; imaginary: number }>;
  
  // حدود المعادلة (للأشكال المركبة)
  terms: ShapeTerm[];
  
  // خصائص الشكل البرمجية
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
  // نوع الحد
  type: 'sigmoid' | 'line' | 'circle' | 'arc' | 'bezier';
  
  // معاملات الحد
  params: number[];
  
  // ترتيب التنفيذ
  order: number;
}

/**
 * المعادلة الأم - Mother Equation
 * O = (id, Φ, Ψ(t), Γ)
 */
export class MotherEquation {
  // id: الهوية الفريدة
  public readonly id: string;
  
  // Φ (Phi): الخصائص الثابتة
  public readonly Φ: Map<string, any>;
  
  // Ψ(t) (Psi): الحالات المتغيرة مع الزمن
  public Ψ: Map<string, any>;
  
  // Γ (Gamma): معادلة الشكل
  public Γ: ShapeEquation | null;
  
  // الزمن الحالي
  private t: number;
  
  // سجل التغيرات عبر الزمن
  private history: Array<{ t: number; Ψ: Map<string, any> }>;

  constructor(
    id: string,
    staticProperties: Map<string, any> = new Map(),
    dynamicStates: Map<string, any> = new Map(),
    shapeEquation: ShapeEquation | null = null
  ) {
    this.id = id;
    this.Φ = staticProperties;
    this.Ψ = dynamicStates;
    this.Γ = shapeEquation;
    this.t = 0;
    this.history = [];
  }

  /**
   * تحديث حالة متغيرة
   */
  updateState(key: string, value: any): void {
    // تحديث الحالة
    this.Ψ.set(key, value);

    // حفظ الحالة الحالية في السجل
    this.history.push({
      t: this.t,
      Ψ: new Map(this.Ψ)
    });

    // تقدم الزمن
    this.t++;
  }

  /**
   * الحصول على حالة في زمن معين
   */
  getStateAtTime(t: number): Map<string, any> | null {
    const record = this.history.find(h => h.t === t);
    return record ? record.Ψ : null;
  }

  /**
   * الحصول على خاصية ثابتة
   */
  getStaticProperty(key: string): any {
    return this.Φ.get(key);
  }

  /**
   * الحصول على حالة متغيرة
   */
  getDynamicState(key: string): any {
    return this.Ψ.get(key);
  }

  /**
   * تحويل إلى Thing (للتكامل مع ThingEngine)
   */
  toThing(): Thing {
    const thing = new Thing(this.Φ.get('name') || this.id, this.Φ.get('category') || 'general');

    // نقل الخصائص الثابتة
    this.Φ.forEach((value, key) => {
      if (key !== 'name' && key !== 'category') {
        const property = thing.getProperty(key);
        if (property) {
          property.value = value;
        }
      }
    });

    // نقل الحالات المتغيرة
    this.Ψ.forEach((value, key) => {
      const property = thing.getProperty(key);
      if (property) {
        property.value = value;
      }
    });

    return thing;
  }

  /**
   * إنشاء من Thing (للتكامل مع ThingEngine)
   */
  static fromThing(thing: Thing): MotherEquation {
    const staticProps = new Map<string, any>();
    const dynamicStates = new Map<string, any>();

    staticProps.set('name', thing.name);
    staticProps.set('category', thing.category);

    // لا يمكن الوصول إلى properties مباشرة لأنها private
    // سنستخدم طريقة بديلة

    return new MotherEquation(thing.name, staticProps, dynamicStates);
  }

  /**
   * تقييم معادلة الشكل عند نقطة
   */
  evaluateShape(x: number): number | null {
    if (!this.Γ) return null;
    
    let result = 0;
    
    // تقييم كل حد من المعادلة
    for (const term of this.Γ.terms) {
      result += this.evaluateTerm(term, x);
    }
    
    return result;
  }

  /**
   * تقييم حد واحد من معادلة الشكل
   */
  private evaluateTerm(term: ShapeTerm, x: number): number {
    switch (term.type) {
      case 'sigmoid':
        // دالة سيغمويد المعممة: 1 / (1 + e^(-k*x + b))
        const k = term.params[0] || 1;
        const b = term.params[1] || 0;
        return 1 / (1 + Math.exp(-k * x + b));
      
      case 'line':
        // خط مستقيم: mx + b
        const m = term.params[0] || 1;
        const c = term.params[1] || 0;
        return m * x + c;
      
      case 'circle':
        // دائرة: sqrt(r^2 - x^2)
        const r = term.params[0] || 1;
        return Math.sqrt(Math.max(0, r * r - x * x));
      
      default:
        return 0;
    }
  }

  /**
   * رسم الشكل (إرجاع نقاط)
   */
  renderShape(resolution: number = 100): Array<{ x: number; y: number }> {
    if (!this.Γ) return [];
    
    const points: Array<{ x: number; y: number }> = [];
    
    for (let i = 0; i <= resolution; i++) {
      const x = (i / resolution) * 2 - 1; // من -1 إلى 1
      const y = this.evaluateShape(x);
      
      if (y !== null) {
        points.push({ x, y });
      }
    }
    
    return points;
  }

  /**
   * تصدير إلى JSON
   */
  toJSON(): any {
    return {
      id: this.id,
      Φ: Object.fromEntries(this.Φ),
      Ψ: Object.fromEntries(this.Ψ),
      Γ: this.Γ,
      t: this.t,
      history: this.history.map(h => ({
        t: h.t,
        Ψ: Object.fromEntries(h.Ψ)
      }))
    };
  }

  /**
   * استيراد من JSON
   */
  static fromJSON(data: any): MotherEquation {
    const eq = new MotherEquation(
      data.id,
      new Map(Object.entries(data.Φ)),
      new Map(Object.entries(data.Ψ)),
      data.Γ
    );
    
    eq.t = data.t;
    eq.history = data.history.map((h: any) => ({
      t: h.t,
      Ψ: new Map(Object.entries(h.Ψ))
    }));
    
    return eq;
  }

  /**
   * نسخ المعادلة
   */
  clone(): MotherEquation {
    return new MotherEquation(
      this.id,
      new Map(this.Φ),
      new Map(this.Ψ),
      this.Γ ? { ...this.Γ } : null
    );
  }

  /**
   * طباعة المعادلة
   */
  toString(): string {
    return `O(${this.id}) = (id: ${this.id}, Φ: ${this.Φ.size} props, Ψ(${this.t}): ${this.Ψ.size} states, Γ: ${this.Γ ? 'defined' : 'null'})`;
  }
}

