/**
 * محرك التعلم الذكي - Intelligent Learning Engine
 * نظام تعلم ذكي يتعلم من التجارب والحوارات لتحسين الأداء
 */

// ============================================================================
// Types and Enums
// ============================================================================

export type LearningType = 
  | 'pattern_recognition'
  | 'response_optimization'
  | 'context_learning'
  | 'user_preference'
  | 'error_correction'
  | 'adaptive_behavior'
  | 'knowledge_acquisition';

export type ConfidenceLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
export type LearningOutcome = 'success' | 'failure' | 'partial' | 'unknown';

export interface LearningPattern {
  patternId: string;
  patternType: LearningType;
  description: string;
  conditions: Record<string, any>;
  actions: Record<string, any>;
  confidence: number;
  successCount: number;
  failureCount: number;
  lastUsed: number | null;
  createdAt: number;
  examples: any[];
  tags: string[];
}

export interface LearningExperience {
  experienceId: string;
  timestamp: number;
  context: Record<string, any>;
  action: string;
  outcome: LearningOutcome;
  feedback: string;
  patterns: string[];
  metadata: Record<string, any>;
}

export interface LearningStatistics {
  totalPatterns: number;
  totalExperiences: number;
  averageConfidence: number;
  successRate: number;
  patternsByType: Map<LearningType, number>;
  recentLearnings: number;
}

// ============================================================================
// Learning Engine
// ============================================================================

export class LearningEngine {
  private patterns: Map<string, LearningPattern>;
  private experiences: LearningExperience[];
  private maxExperiences: number;
  private learningRate: number;
  private confidenceThreshold: number;

  constructor(options: {
    maxExperiences?: number;
    learningRate?: number;
    confidenceThreshold?: number;
  } = {}) {
    this.patterns = new Map();
    this.experiences = [];
    this.maxExperiences = options.maxExperiences || 1000;
    this.learningRate = options.learningRate || 0.1;
    this.confidenceThreshold = options.confidenceThreshold || 0.6;
  }

  /**
   * إضافة نمط تعلم جديد
   */
  public addPattern(
    patternId: string,
    patternType: LearningType,
    description: string,
    conditions: Record<string, any>,
    actions: Record<string, any>
  ): LearningPattern {
    const pattern: LearningPattern = {
      patternId,
      patternType,
      description,
      conditions,
      actions,
      confidence: 0.5,
      successCount: 0,
      failureCount: 0,
      lastUsed: null,
      createdAt: Date.now(),
      examples: [],
      tags: []
    };

    this.patterns.set(patternId, pattern);
    return pattern;
  }

  /**
   * الحصول على نمط
   */
  public getPattern(patternId: string): LearningPattern | null {
    return this.patterns.get(patternId) || null;
  }

  /**
   * إيجاد الأنماط المطابقة
   */
  public findMatchingPatterns(
    context: Record<string, any>,
    patternType?: LearningType
  ): LearningPattern[] {
    const matching: LearningPattern[] = [];

    for (const pattern of this.patterns.values()) {
      if (patternType && pattern.patternType !== patternType) {
        continue;
      }

      if (this.matchesConditions(pattern, context)) {
        matching.push(pattern);
      }
    }

    // ترتيب حسب الثقة
    return matching.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * التحقق من تطابق الشروط
   */
  private matchesConditions(
    pattern: LearningPattern,
    context: Record<string, any>
  ): boolean {
    const conditions = pattern.conditions;

    for (const key in conditions) {
      const conditionValue = conditions[key];
      const contextValue = context[key];

      if (typeof conditionValue === 'object' && conditionValue !== null) {
        // شرط معقد
        if (conditionValue.min !== undefined && contextValue < conditionValue.min) {
          return false;
        }
        if (conditionValue.max !== undefined && contextValue > conditionValue.max) {
          return false;
        }
        if (conditionValue.equals !== undefined && contextValue !== conditionValue.equals) {
          return false;
        }
      } else {
        // شرط بسيط
        if (contextValue !== conditionValue) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * تسجيل تجربة تعلم
   */
  public recordExperience(
    context: Record<string, any>,
    action: string,
    outcome: LearningOutcome,
    feedback: string,
    patterns: string[] = []
  ): LearningExperience {
    const experience: LearningExperience = {
      experienceId: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      context,
      action,
      outcome,
      feedback,
      patterns,
      metadata: {}
    };

    this.experiences.push(experience);

    // تحديث الأنماط المرتبطة
    for (const patternId of patterns) {
      this.updatePatternFromExperience(patternId, outcome);
    }

    // الحفاظ على الحد الأقصى للتجارب
    if (this.experiences.length > this.maxExperiences) {
      this.experiences.shift();
    }

    return experience;
  }

  /**
   * تحديث نمط من تجربة
   */
  private updatePatternFromExperience(
    patternId: string,
    outcome: LearningOutcome
  ): void {
    const pattern = this.patterns.get(patternId);
    if (!pattern) return;

    pattern.lastUsed = Date.now();

    if (outcome === 'success') {
      pattern.successCount++;
      pattern.confidence = Math.min(
        1.0,
        pattern.confidence + this.learningRate * (1.0 - pattern.confidence)
      );
    } else if (outcome === 'failure') {
      pattern.failureCount++;
      pattern.confidence = Math.max(
        0.0,
        pattern.confidence - this.learningRate * pattern.confidence
      );
    } else if (outcome === 'partial') {
      pattern.successCount++;
      pattern.confidence = Math.min(
        1.0,
        pattern.confidence + this.learningRate * 0.5 * (1.0 - pattern.confidence)
      );
    }
  }

  /**
   * التعلم من التغذية الراجعة
   */
  public learnFromFeedback(
    context: Record<string, any>,
    action: string,
    feedback: string,
    isPositive: boolean
  ): LearningPattern | null {
    const outcome: LearningOutcome = isPositive ? 'success' : 'failure';

    // البحث عن أنماط مطابقة
    const matchingPatterns = this.findMatchingPatterns(context);

    if (matchingPatterns.length > 0) {
      // تحديث النمط الموجود
      const pattern = matchingPatterns[0];
      this.recordExperience(context, action, outcome, feedback, [pattern.patternId]);
      return pattern;
    } else if (isPositive) {
      // إنشاء نمط جديد من التجربة الناجحة
      const patternId = `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const pattern = this.addPattern(
        patternId,
        'adaptive_behavior',
        `Learned from positive feedback: ${feedback}`,
        context,
        { action }
      );
      this.recordExperience(context, action, outcome, feedback, [patternId]);
      return pattern;
    }

    return null;
  }

  /**
   * الحصول على الإحصائيات
   */
  public getStatistics(): LearningStatistics {
    const patternsByType = new Map<LearningType, number>();
    let totalConfidence = 0;
    let totalSuccess = 0;
    let totalFailure = 0;

    for (const pattern of this.patterns.values()) {
      const count = patternsByType.get(pattern.patternType) || 0;
      patternsByType.set(pattern.patternType, count + 1);
      totalConfidence += pattern.confidence;
      totalSuccess += pattern.successCount;
      totalFailure += pattern.failureCount;
    }

    const recentLearnings = this.experiences.filter(
      exp => Date.now() - exp.timestamp < 24 * 60 * 60 * 1000
    ).length;

    return {
      totalPatterns: this.patterns.size,
      totalExperiences: this.experiences.length,
      averageConfidence: this.patterns.size > 0 ? totalConfidence / this.patterns.size : 0,
      successRate: (totalSuccess + totalFailure) > 0 
        ? totalSuccess / (totalSuccess + totalFailure) 
        : 0,
      patternsByType,
      recentLearnings
    };
  }

  /**
   * مسح البيانات
   */
  public clear(): void {
    this.patterns.clear();
    this.experiences = [];
  }
}

