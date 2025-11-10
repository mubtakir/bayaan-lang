/**
 * مدير التعلم النهائي - Final Learning Manager
 * يدير جميع أنظمة التعلم ويوحدها في نظام واحد متكامل
 */

import { LearningEngine, LearningType, LearningOutcome, LearningStatistics } from './learningEngine';
import { PatternRecognitionEngine, PatternCategory, PatternStatistics } from './patternRecognition';
import { AdaptiveLearningSystem, ImprovementStrategy, AdaptiveStatistics } from './adaptiveLearning';

// ============================================================================
// Types
// ============================================================================

export interface LearningRequest {
  requestId: string;
  type: 'pattern' | 'adaptive' | 'feedback' | 'experience';
  data: any;
  context: Record<string, any>;
  priority: number;
}

export interface LearningResult {
  success: boolean;
  requestId: string;
  type: string;
  result: any;
  confidence: number;
  processingTime: number;
  metadata: Record<string, any>;
}

export interface ComprehensiveLearningStats {
  learningEngine: LearningStatistics;
  patternRecognition: PatternStatistics;
  adaptiveLearning: AdaptiveStatistics;
  totalLearningEvents: number;
  overallSuccessRate: number;
  systemHealth: number;
}

// ============================================================================
// Final Learning Manager
// ============================================================================

export class FinalLearningManager {
  private learningEngine: LearningEngine;
  private patternRecognition: PatternRecognitionEngine;
  private adaptiveLearning: AdaptiveLearningSystem;
  private learningEvents: number;
  private successfulEvents: number;
  private enabled: boolean;

  constructor(options: {
    maxExperiences?: number;
    maxPatterns?: number;
    maxHistory?: number;
    learningRate?: number;
  } = {}) {
    this.learningEngine = new LearningEngine({
      maxExperiences: options.maxExperiences || 1000,
      learningRate: options.learningRate || 0.1
    });

    this.patternRecognition = new PatternRecognitionEngine({
      maxPatterns: options.maxPatterns || 500
    });

    this.adaptiveLearning = new AdaptiveLearningSystem({
      maxHistory: options.maxHistory || 500
    });

    this.learningEvents = 0;
    this.successfulEvents = 0;
    this.enabled = true;
  }

  /**
   * معالجة طلب تعلم
   */
  public async processLearningRequest(request: LearningRequest): Promise<LearningResult> {
    const startTime = Date.now();

    if (!this.enabled) {
      return {
        success: false,
        requestId: request.requestId,
        type: request.type,
        result: null,
        confidence: 0,
        processingTime: Date.now() - startTime,
        metadata: { error: 'Learning system is disabled' }
      };
    }

    this.learningEvents++;

    try {
      let result: any;
      let confidence = 0;

      switch (request.type) {
        case 'pattern':
          result = this.handlePatternLearning(request.data, request.context);
          confidence = result ? result.confidence : 0;
          break;

        case 'adaptive':
          result = this.handleAdaptiveLearning(request.data, request.context);
          confidence = result ? result.confidence : 0;
          break;

        case 'feedback':
          result = this.handleFeedbackLearning(request.data, request.context);
          confidence = result ? 0.8 : 0.5;
          break;

        case 'experience':
          result = this.handleExperienceLearning(request.data, request.context);
          confidence = 0.7;
          break;

        default:
          throw new Error(`Unknown learning type: ${request.type}`);
      }

      this.successfulEvents++;

      return {
        success: true,
        requestId: request.requestId,
        type: request.type,
        result,
        confidence,
        processingTime: Date.now() - startTime,
        metadata: {}
      };
    } catch (error) {
      return {
        success: false,
        requestId: request.requestId,
        type: request.type,
        result: null,
        confidence: 0,
        processingTime: Date.now() - startTime,
        metadata: { error: (error as Error).message }
      };
    }
  }

  /**
   * معالجة تعلم الأنماط
   */
  private handlePatternLearning(data: any, context: Record<string, any>): any {
    if (!Array.isArray(data)) {
      data = [data];
    }

    const category = context.category as PatternCategory | undefined;
    const pattern = this.patternRecognition.recognizePattern(data, category);

    return pattern;
  }

  /**
   * معالجة التعلم التكيفي
   */
  private handleAdaptiveLearning(data: any, context: Record<string, any>): any {
    const response = data.response || data;
    const performanceMetrics = context.performanceMetrics;

    const improvement = this.adaptiveLearning.improveResponse(
      response,
      context,
      performanceMetrics
    );

    return improvement;
  }

  /**
   * معالجة تعلم التغذية الراجعة
   */
  private handleFeedbackLearning(data: any, context: Record<string, any>): any {
    const { action, feedback, isPositive } = data;

    const pattern = this.learningEngine.learnFromFeedback(
      context,
      action,
      feedback,
      isPositive
    );

    // تحديث نظام التكيف
    if (pattern && context.ruleId) {
      if (isPositive) {
        this.adaptiveLearning.recordSuccess(context.ruleId);
      } else {
        this.adaptiveLearning.recordFailure(context.ruleId);
      }
    }

    return pattern;
  }

  /**
   * معالجة تعلم التجربة
   */
  private handleExperienceLearning(data: any, context: Record<string, any>): any {
    const { action, outcome, feedback, patterns } = data;

    const experience = this.learningEngine.recordExperience(
      context,
      action,
      outcome as LearningOutcome,
      feedback,
      patterns
    );

    return experience;
  }

  /**
   * التعلم من حوار
   */
  public learnFromConversation(
    userMessage: string,
    aiResponse: string,
    userFeedback?: string,
    isPositive?: boolean
  ): LearningResult[] {
    const results: LearningResult[] = [];

    // تعلم نمط الحوار
    const conversationData = [userMessage, aiResponse];
    const patternRequest: LearningRequest = {
      requestId: `pattern_${Date.now()}`,
      type: 'pattern',
      data: conversationData,
      context: { category: 'sequential' as PatternCategory },
      priority: 5
    };

    results.push(this.processLearningRequest(patternRequest) as any);

    // تعلم من التغذية الراجعة إذا وجدت
    if (userFeedback && isPositive !== undefined) {
      const feedbackRequest: LearningRequest = {
        requestId: `feedback_${Date.now()}`,
        type: 'feedback',
        data: {
          action: aiResponse,
          feedback: userFeedback,
          isPositive
        },
        context: { userMessage },
        priority: 8
      };

      results.push(this.processLearningRequest(feedbackRequest) as any);
    }

    return results;
  }

  /**
   * تحسين إجابة بناءً على التعلم
   */
  public improveResponseWithLearning(
    response: string,
    context: Record<string, any>
  ): string {
    // البحث عن أنماط مطابقة
    const matchingPatterns = this.learningEngine.findMatchingPatterns(
      context,
      'response_optimization'
    );

    // تطبيق التحسين التكيفي
    const improvement = this.adaptiveLearning.improveResponse(
      response,
      context
    );

    return improvement.improvedResponse;
  }

  /**
   * الحصول على الإحصائيات الشاملة
   */
  public getComprehensiveStatistics(): ComprehensiveLearningStats {
    const learningStats = this.learningEngine.getStatistics();
    const patternStats = this.patternRecognition.getStatistics();
    const adaptiveStats = this.adaptiveLearning.getStatistics();

    const overallSuccessRate = this.learningEvents > 0
      ? this.successfulEvents / this.learningEvents
      : 0;

    // حساب صحة النظام
    const systemHealth = (
      learningStats.successRate * 0.4 +
      patternStats.averageConfidence * 0.3 +
      adaptiveStats.averageSuccessRate * 0.3
    );

    return {
      learningEngine: learningStats,
      patternRecognition: patternStats,
      adaptiveLearning: adaptiveStats,
      totalLearningEvents: this.learningEvents,
      overallSuccessRate,
      systemHealth
    };
  }

  /**
   * تصدير المعرفة المتعلمة
   */
  public exportLearning(): {
    patterns: any[];
    experiences: any[];
    rules: any[];
    statistics: ComprehensiveLearningStats;
  } {
    const stats = this.getComprehensiveStatistics();

    return {
      patterns: Array.from(stats.patternRecognition.recentPatterns),
      experiences: [],
      rules: [],
      statistics: stats
    };
  }

  /**
   * استيراد المعرفة المتعلمة
   */
  public importLearning(data: {
    patterns?: any[];
    experiences?: any[];
    rules?: any[];
  }): boolean {
    try {
      // يمكن تنفيذ استيراد البيانات هنا
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * إعادة تعيين نظام التعلم
   */
  public reset(): void {
    this.learningEngine.clear();
    this.patternRecognition.clear();
    this.adaptiveLearning.clear();
    this.learningEvents = 0;
    this.successfulEvents = 0;
  }

  /**
   * تفعيل/تعطيل نظام التعلم
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * التحقق من حالة النظام
   */
  public isEnabled(): boolean {
    return this.enabled;
  }
}

