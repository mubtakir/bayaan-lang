/**
 * محرك الاستنتاج الذكي
 * Smart Inference Engine
 * 
 * نظام للاستنتاج التلقائي وفحص الشروط وتسجيل المجهولات
 * System for automatic inference, condition checking, and unknown tracking
 */

import { Thing } from './thingEngine';
import { CausalEngine, RelationType } from '../../logic/causalEngine';

/**
 * نوع الاستنتاج - Inference Type
 */
export enum InferenceType {
  DEDUCTIVE = 'استنتاج_استنباطي',      // Deductive inference
  INDUCTIVE = 'استنتاج_استقرائي',      // Inductive inference
  ABDUCTIVE = 'استنتاج_اختطافي',       // Abductive inference
  ANALOGICAL = 'استنتاج_قياسي'         // Analogical inference
}

/**
 * المجهول - Unknown
 */
export class Unknown {
  constructor(
    public id: string,                      // معرف المجهول - Unknown ID
    public question: string,                // السؤال - Question
    public context: Map<string, any> = new Map(),  // السياق - Context
    public relatedThings: string[] = [],    // الأشياء المرتبطة - Related things
    public timestamp: number = Date.now()   // الوقت - Timestamp
  ) {}

  /**
   * إضافة معلومة للسياق
   * Add information to context
   */
  addContext(key: string, value: any): void {
    this.context.set(key, value);
  }

  /**
   * إضافة شيء مرتبط
   * Add related thing
   */
  addRelatedThing(thing: string): void {
    if (!this.relatedThings.includes(thing)) {
      this.relatedThings.push(thing);
    }
  }

  toString(): string {
    let result = `\n=== مجهول: ${this.question} ===\n`;
    
    if (this.context.size > 0) {
      result += `السياق:\n`;
      for (const [key, value] of this.context.entries()) {
        result += `  ${key}: ${value}\n`;
      }
    }

    if (this.relatedThings.length > 0) {
      result += `الأشياء المرتبطة: ${this.relatedThings.join(', ')}\n`;
    }

    return result;
  }
}

/**
 * الاستنتاج - Inference
 */
export class Inference {
  constructor(
    public type: InferenceType,             // نوع الاستنتاج - Inference type
    public premise: string[],               // المقدمات - Premises
    public conclusion: string,              // النتيجة - Conclusion
    public confidence: number = 1.0,        // درجة الثقة (0-1) - Confidence
    public explanation: string = ''         // التفسير - Explanation
  ) {}

  toString(): string {
    let result = `\n=== استنتاج (${this.type}) ===\n`;
    result += `المقدمات:\n`;
    for (const p of this.premise) {
      result += `  - ${p}\n`;
    }
    result += `النتيجة: ${this.conclusion}\n`;
    result += `درجة الثقة: ${(this.confidence * 100).toFixed(1)}%\n`;
    if (this.explanation) {
      result += `التفسير: ${this.explanation}\n`;
    }
    return result;
  }
}

/**
 * قاعدة الاستنتاج - Inference Rule
 */
export class InferenceRule {
  constructor(
    public name: string,                    // اسم القاعدة - Rule name
    public conditions: Map<string, any> = new Map(),  // الشروط - Conditions
    public conclusion: string = '',         // النتيجة - Conclusion
    public confidence: number = 1.0         // درجة الثقة - Confidence
  ) {}

  /**
   * التحقق من الشروط
   * Check conditions
   */
  checkConditions(context: Map<string, any>): boolean {
    for (const [key, value] of this.conditions.entries()) {
      const contextValue = context.get(key);
      
      // Handle numeric comparisons
      if (typeof value === 'object' && value.operator) {
        const actualValue = contextValue;
        const expectedValue = value.value;
        
        switch (value.operator) {
          case '>':
            if (!(actualValue > expectedValue)) return false;
            break;
          case '<':
            if (!(actualValue < expectedValue)) return false;
            break;
          case '>=':
            if (!(actualValue >= expectedValue)) return false;
            break;
          case '<=':
            if (!(actualValue <= expectedValue)) return false;
            break;
          case '==':
            if (actualValue !== expectedValue) return false;
            break;
          case '!=':
            if (actualValue === expectedValue) return false;
            break;
          default:
            return false;
        }
      } else {
        // Direct equality check
        if (contextValue !== value) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * تطبيق القاعدة
   * Apply rule
   */
  apply(context: Map<string, any>): Inference | null {
    if (!this.checkConditions(context)) {
      return null;
    }

    const premise: string[] = [];
    for (const [key, value] of this.conditions.entries()) {
      premise.push(`${key} = ${JSON.stringify(value)}`);
    }

    return new Inference(
      InferenceType.DEDUCTIVE,
      premise,
      this.conclusion,
      this.confidence,
      `تم تطبيق القاعدة: ${this.name}`
    );
  }

  toString(): string {
    let result = `\n=== قاعدة استنتاج: ${this.name} ===\n`;
    result += `الشروط:\n`;
    for (const [key, value] of this.conditions.entries()) {
      result += `  ${key}: ${JSON.stringify(value)}\n`;
    }
    result += `النتيجة: ${this.conclusion}\n`;
    result += `درجة الثقة: ${(this.confidence * 100).toFixed(1)}%\n`;
    return result;
  }
}

/**
 * محرك الاستنتاج الذكي - Smart Inference Engine
 */
export class InferenceEngine {
  private rules: Map<string, InferenceRule> = new Map();
  private unknowns: Map<string, Unknown> = new Map();
  private inferences: Inference[] = [];
  private causalEngine: CausalEngine = new CausalEngine();

  /**
   * إضافة قاعدة استنتاج
   * Add inference rule
   */
  addRule(rule: InferenceRule): void {
    this.rules.set(rule.name, rule);
  }

  /**
   * الحصول على قاعدة
   * Get rule
   */
  getRule(name: string): InferenceRule | undefined {
    return this.rules.get(name);
  }

  /**
   * تسجيل مجهول
   * Register unknown
   */
  registerUnknown(unknown: Unknown): void {
    this.unknowns.set(unknown.id, unknown);
  }

  /**
   * الحصول على مجهول
   * Get unknown
   */
  getUnknown(id: string): Unknown | undefined {
    return this.unknowns.get(id);
  }

  /**
   * الحصول على جميع المجهولات
   * Get all unknowns
   */
  getAllUnknowns(): Unknown[] {
    return Array.from(this.unknowns.values());
  }

  /**
   * محاولة حل مجهول
   * Try to resolve unknown
   */
  tryResolveUnknown(unknownId: string, newContext: Map<string, any>): Inference | null {
    const unknown = this.unknowns.get(unknownId);
    if (!unknown) {
      return null;
    }

    // Merge contexts
    const mergedContext = new Map([...unknown.context, ...newContext]);

    // Try all rules
    for (const rule of this.rules.values()) {
      const inference = rule.apply(mergedContext);
      if (inference) {
        // Remove unknown if resolved
        this.unknowns.delete(unknownId);
        this.inferences.push(inference);
        return inference;
      }
    }

    // Update unknown context with new information
    for (const [key, value] of newContext.entries()) {
      unknown.addContext(key, value);
    }

    return null;
  }

  /**
   * فحص شيء تلقائياً
   * Auto-check thing
   * 
   * يفحص خصائص الشيء ويستنتج النتائج تلقائياً
   */
  autoCheckThing(thing: Thing): Inference[] {
    const inferences: Inference[] = [];
    const context = new Map<string, any>();

    // Build context from thing properties
    context.set('thing_name', thing.name);
    context.set('thing_category', thing.category);

    for (const prop of thing.getAllProperties()) {
      context.set(prop.name, prop.value);
    }

    // Try all rules
    for (const rule of this.rules.values()) {
      const inference = rule.apply(context);
      if (inference) {
        inferences.push(inference);
        this.inferences.push(inference);
      }
    }

    return inferences;
  }

  /**
   * إنشاء قاعدة من ملاحظة
   * Create rule from observation
   * 
   * مثال: إذا لاحظنا أن الورقة احترقت عند 233°C، نسجل ذلك
   */
  createRuleFromObservation(
    name: string,
    observation: Map<string, any>,
    result: string,
    confidence: number = 0.8
  ): InferenceRule {
    const rule = new InferenceRule(name, observation, result, confidence);
    this.addRule(rule);
    return rule;
  }

  /**
   * البحث عن سبب
   * Find cause
   * 
   * يستخدم المحرك السببي للبحث عن أسباب محتملة
   */
  findCause(effect: string): string[] {
    return this.causalEngine.findRootCauses(effect);
  }

  /**
   * البحث عن نتيجة
   * Find effect
   * 
   * يستخدم المحرك السببي للبحث عن نتائج محتملة
   */
  findEffect(cause: string): string[] {
    return this.causalEngine.findFinalResults(cause);
  }

  /**
   * إضافة علاقة سببية
   * Add causal relation
   */
  addCausalRelation(from: string, to: string, type: RelationType, weight: number): void {
    this.causalEngine.addRelation(from, to, type, weight);
  }

  /**
   * الحصول على المحرك السببي
   * Get causal engine
   */
  getCausalEngine(): CausalEngine {
    return this.causalEngine;
  }

  /**
   * الحصول على جميع الاستنتاجات
   * Get all inferences
   */
  getAllInferences(): Inference[] {
    return this.inferences;
  }

  /**
   * مسح الاستنتاجات
   * Clear inferences
   */
  clearInferences(): void {
    this.inferences = [];
  }

  /**
   * إحصائيات
   * Statistics
   */
  getStatistics(): {
    rulesCount: number;
    unknownsCount: number;
    inferencesCount: number;
    averageConfidence: number;
  } {
    const avgConfidence = this.inferences.length > 0
      ? this.inferences.reduce((sum, inf) => sum + inf.confidence, 0) / this.inferences.length
      : 0;

    return {
      rulesCount: this.rules.size,
      unknownsCount: this.unknowns.size,
      inferencesCount: this.inferences.length,
      averageConfidence: avgConfidence
    };
  }
}

