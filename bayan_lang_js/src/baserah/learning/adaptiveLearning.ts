/**
 * نظام التعلم التكيفي - Adaptive Learning System
 * نظام ذكي يتكيف مع التغذية الراجعة ويحسّن الإجابات
 */

// ============================================================================
// Types and Enums
// ============================================================================

export type ImprovementStrategy = 
  | 'expand'
  | 'simplify'
  | 'add_examples'
  | 'restructure'
  | 'change_style'
  | 'add_context'
  | 'enhance_clarity';

export type ImprovementLevel = 'minor' | 'moderate' | 'major' | 'complete_rewrite';

export interface ImprovementRule {
  ruleId: string;
  name: string;
  description: string;
  strategy: ImprovementStrategy;
  conditions: Record<string, any>;
  transformations: Record<string, any>;
  priority: number;
  successRate: number;
  usageCount: number;
  enabled: boolean;
}

export interface AdaptiveResponse {
  originalResponse: string;
  improvedResponse: string;
  appliedRules: string[];
  improvementLevel: ImprovementLevel;
  confidence: number;
  reasoning: string;
}

export interface PerformanceMetrics {
  completeness: number;
  clarity: number;
  relevance: number;
  accuracy: number;
  userSatisfaction: number;
}

export interface AdaptiveStatistics {
  totalRules: number;
  activeRules: number;
  totalImprovements: number;
  averageSuccessRate: number;
  rulesByStrategy: Map<ImprovementStrategy, number>;
  recentImprovements: number;
}

// ============================================================================
// Adaptive Learning System
// ============================================================================

export class AdaptiveLearningSystem {
  private rules: Map<string, ImprovementRule>;
  private improvementHistory: AdaptiveResponse[];
  private maxHistory: number;
  private adaptationRate: number;

  constructor(options: {
    maxHistory?: number;
    adaptationRate?: number;
  } = {}) {
    this.rules = new Map();
    this.improvementHistory = [];
    this.maxHistory = options.maxHistory || 500;
    this.adaptationRate = options.adaptationRate || 0.15;

    // تهيئة القواعد الافتراضية
    this.initializeDefaultRules();
  }

  /**
   * تهيئة القواعد الافتراضية
   */
  private initializeDefaultRules(): void {
    // قاعدة التوسيع
    this.addRule(
      'expand_short_responses',
      'Expand Short Responses',
      'Expands responses that are too brief',
      'expand',
      { maxLength: 100 },
      { addDetails: true, addExamples: true },
      8
    );

    // قاعدة التبسيط
    this.addRule(
      'simplify_complex_responses',
      'Simplify Complex Responses',
      'Simplifies overly complex responses',
      'simplify',
      { minLength: 500, complexityScore: { min: 0.7 } },
      { breakIntoSteps: true, useSimpleLanguage: true },
      7
    );

    // قاعدة إضافة الأمثلة
    this.addRule(
      'add_examples_when_needed',
      'Add Examples',
      'Adds examples when response lacks them',
      'add_examples',
      { hasExamples: false },
      { exampleCount: 2, exampleType: 'practical' },
      6
    );

    // قاعدة تحسين الوضوح
    this.addRule(
      'enhance_clarity',
      'Enhance Clarity',
      'Improves clarity of unclear responses',
      'enhance_clarity',
      { clarityScore: { max: 0.6 } },
      { restructure: true, addHeadings: true },
      9
    );
  }

  /**
   * إضافة قاعدة تحسين
   */
  public addRule(
    ruleId: string,
    name: string,
    description: string,
    strategy: ImprovementStrategy,
    conditions: Record<string, any>,
    transformations: Record<string, any>,
    priority: number = 5
  ): ImprovementRule {
    const rule: ImprovementRule = {
      ruleId,
      name,
      description,
      strategy,
      conditions,
      transformations,
      priority,
      successRate: 0.5,
      usageCount: 0,
      enabled: true
    };

    this.rules.set(ruleId, rule);
    return rule;
  }

  /**
   * تحسين الإجابة بشكل تكيفي
   */
  public improveResponse(
    response: string,
    context: Record<string, any>,
    performanceMetrics?: PerformanceMetrics
  ): AdaptiveResponse {
    // إيجاد القواعد المطابقة
    const applicableRules = this.findApplicableRules(
      response,
      context,
      performanceMetrics
    );

    if (applicableRules.length === 0) {
      return {
        originalResponse: response,
        improvedResponse: response,
        appliedRules: [],
        improvementLevel: 'minor',
        confidence: 1.0,
        reasoning: 'No improvements needed'
      };
    }

    // تطبيق القواعد
    let improvedResponse = response;
    const appliedRules: string[] = [];
    let totalConfidence = 0;

    for (const rule of applicableRules) {
      improvedResponse = this.applyRule(rule, improvedResponse, context);
      appliedRules.push(rule.ruleId);
      totalConfidence += rule.successRate;
    }

    const avgConfidence = appliedRules.length > 0 
      ? totalConfidence / appliedRules.length 
      : 1.0;

    const improvementLevel = this.determineImprovementLevel(
      response,
      improvedResponse,
      appliedRules.length
    );

    const adaptiveResponse: AdaptiveResponse = {
      originalResponse: response,
      improvedResponse,
      appliedRules,
      improvementLevel,
      confidence: avgConfidence,
      reasoning: this.generateReasoning(applicableRules)
    };

    // حفظ في السجل
    this.improvementHistory.push(adaptiveResponse);
    if (this.improvementHistory.length > this.maxHistory) {
      this.improvementHistory.shift();
    }

    return adaptiveResponse;
  }

  /**
   * إيجاد القواعد المطبقة
   */
  private findApplicableRules(
    response: string,
    context: Record<string, any>,
    performanceMetrics?: PerformanceMetrics
  ): ImprovementRule[] {
    const applicable: ImprovementRule[] = [];

    for (const rule of this.rules.values()) {
      if (!rule.enabled) continue;

      if (this.matchesConditions(rule, response, context, performanceMetrics)) {
        applicable.push(rule);
      }
    }

    // ترتيب حسب الأولوية ومعدل النجاح
    return applicable.sort((a, b) => {
      const scoreA = a.priority * a.successRate;
      const scoreB = b.priority * b.successRate;
      return scoreB - scoreA;
    });
  }

  /**
   * التحقق من تطابق الشروط
   */
  private matchesConditions(
    rule: ImprovementRule,
    response: string,
    context: Record<string, any>,
    performanceMetrics?: PerformanceMetrics
  ): boolean {
    const conditions = rule.conditions;
    const responseLength = response.length;

    // التحقق من الطول
    if (conditions.minLength !== undefined && responseLength < conditions.minLength) {
      return false;
    }
    if (conditions.maxLength !== undefined && responseLength > conditions.maxLength) {
      return false;
    }

    // التحقق من مقاييس الأداء
    if (performanceMetrics) {
      if (conditions.clarityScore) {
        const clarity = performanceMetrics.clarity;
        if (conditions.clarityScore.min !== undefined && clarity < conditions.clarityScore.min) {
          return false;
        }
        if (conditions.clarityScore.max !== undefined && clarity > conditions.clarityScore.max) {
          return false;
        }
      }

      if (conditions.completenessScore) {
        const completeness = performanceMetrics.completeness;
        if (conditions.completenessScore.max !== undefined && completeness > conditions.completenessScore.max) {
          return false;
        }
      }
    }

    // التحقق من السياق
    if (conditions.hasExamples !== undefined) {
      const hasExamples = response.includes('مثال') || response.includes('example');
      if (conditions.hasExamples !== hasExamples) {
        return false;
      }
    }

    return true;
  }

  /**
   * تطبيق قاعدة على الإجابة
   */
  private applyRule(
    rule: ImprovementRule,
    response: string,
    context: Record<string, any>
  ): string {
    let improved = response;

    switch (rule.strategy) {
      case 'expand':
        improved = this.expandResponse(response, rule.transformations);
        break;
      case 'simplify':
        improved = this.simplifyResponse(response, rule.transformations);
        break;
      case 'add_examples':
        improved = this.addExamples(response, rule.transformations);
        break;
      case 'enhance_clarity':
        improved = this.enhanceClarity(response, rule.transformations);
        break;
      default:
        improved = response;
    }

    rule.usageCount++;
    return improved;
  }

  /**
   * توسيع الإجابة
   */
  private expandResponse(response: string, transformations: Record<string, any>): string {
    return `${response}\n\nتفاصيل إضافية: [محتوى موسع بناءً على السياق]`;
  }

  /**
   * تبسيط الإجابة
   */
  private simplifyResponse(response: string, transformations: Record<string, any>): string {
    return `[نسخة مبسطة]: ${response.substring(0, Math.min(response.length, 200))}...`;
  }

  /**
   * إضافة أمثلة
   */
  private addExamples(response: string, transformations: Record<string, any>): string {
    return `${response}\n\nمثال: [مثال عملي يوضح المفهوم]`;
  }

  /**
   * تحسين الوضوح
   */
  private enhanceClarity(response: string, transformations: Record<string, any>): string {
    return `## الإجابة المحسنة\n\n${response}`;
  }

  /**
   * تحديد مستوى التحسين
   */
  private determineImprovementLevel(
    original: string,
    improved: string,
    rulesApplied: number
  ): ImprovementLevel {
    const lengthDiff = Math.abs(improved.length - original.length);
    const percentChange = lengthDiff / original.length;

    if (rulesApplied >= 3 || percentChange > 0.5) {
      return 'major';
    } else if (rulesApplied >= 2 || percentChange > 0.25) {
      return 'moderate';
    } else {
      return 'minor';
    }
  }

  /**
   * توليد التفسير
   */
  private generateReasoning(rules: ImprovementRule[]): string {
    const strategies = rules.map(r => r.strategy).join(', ');
    return `Applied ${rules.length} improvement rule(s): ${strategies}`;
  }

  /**
   * تسجيل نجاح التحسين
   */
  public recordSuccess(ruleId: string): void {
    const rule = this.rules.get(ruleId);
    if (!rule) return;

    rule.successRate = Math.min(
      1.0,
      rule.successRate + this.adaptationRate * (1.0 - rule.successRate)
    );
    rule.priority = Math.min(10, rule.priority + 0.5);
  }

  /**
   * تسجيل فشل التحسين
   */
  public recordFailure(ruleId: string): void {
    const rule = this.rules.get(ruleId);
    if (!rule) return;

    rule.successRate = Math.max(
      0.0,
      rule.successRate - this.adaptationRate * rule.successRate
    );
    rule.priority = Math.max(1, rule.priority - 0.5);
  }

  /**
   * الحصول على الإحصائيات
   */
  public getStatistics(): AdaptiveStatistics {
    const rulesByStrategy = new Map<ImprovementStrategy, number>();
    let totalSuccessRate = 0;
    let activeCount = 0;

    for (const rule of this.rules.values()) {
      const count = rulesByStrategy.get(rule.strategy) || 0;
      rulesByStrategy.set(rule.strategy, count + 1);
      totalSuccessRate += rule.successRate;
      if (rule.enabled) activeCount++;
    }

    const recentImprovements = this.improvementHistory.filter(
      imp => imp.appliedRules.length > 0
    ).length;

    return {
      totalRules: this.rules.size,
      activeRules: activeCount,
      totalImprovements: this.improvementHistory.length,
      averageSuccessRate: this.rules.size > 0 ? totalSuccessRate / this.rules.size : 0,
      rulesByStrategy,
      recentImprovements
    };
  }

  /**
   * مسح البيانات
   */
  public clear(): void {
    this.improvementHistory = [];
  }
}

