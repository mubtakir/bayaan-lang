/**
 * التكامل بين الخبير والمستكشف - Expert-Explorer Integration
 * 
 * دماغ النظام = الخبير + المستكشف
 * System Brain = Expert + Explorer
 * 
 * @author Al-Mubtakir
 * @version 1.0.0
 */

import { ExpertSystem, ExpertDecision } from './expert';
import { ExplorerSystem, ExplorerDecision, ExplorationStrategy } from './explorer';
import { Vector2D } from './theories/perpendicularOpposites';

/**
 * قرار الدماغ
 * Brain Decision
 */
export interface BrainDecision {
  action: any;
  confidence: number;
  source: 'expert' | 'explorer' | 'hybrid';
  expertContribution: number;
  explorerContribution: number;
  reasoning: string;
}

/**
 * إعدادات الدماغ
 * Brain Settings
 */
export interface BrainSettings {
  expertWeight: number;      // وزن الخبير (0-1)
  explorerWeight: number;    // وزن المستكشف (0-1)
  explorationStrategy: ExplorationStrategy;
  adaptiveWeights: boolean;  // أوزان متكيفة
}

/**
 * فئة دماغ النظام
 * System Brain Class
 */
export class SystemBrain {
  private expert: ExpertSystem;
  private explorer: ExplorerSystem;
  private settings: BrainSettings;
  private decisionHistory: BrainDecision[] = [];
  
  constructor(
    expertLearningRate: number = 0.1,
    explorationRate: number = 0.3,
    settings?: Partial<BrainSettings>
  ) {
    this.expert = new ExpertSystem(expertLearningRate);
    this.explorer = new ExplorerSystem(explorationRate);
    
    this.settings = {
      expertWeight: settings?.expertWeight ?? 0.7,
      explorerWeight: settings?.explorerWeight ?? 0.3,
      explorationStrategy: settings?.explorationStrategy ?? 'perpendicular',
      adaptiveWeights: settings?.adaptiveWeights ?? true
    };
    
    // التأكد من أن مجموع الأوزان = 1
    this.normalizeWeights();
  }
  
  /**
   * تطبيع الأوزان
   * Normalize weights
   */
  private normalizeWeights(): void {
    const total = this.settings.expertWeight + this.settings.explorerWeight;
    if (total > 0) {
      this.settings.expertWeight /= total;
      this.settings.explorerWeight /= total;
    }
  }
  
  /**
   * اتخاذ قرار
   * Make decision
   */
  makeDecision(situation: any): BrainDecision {
    // محاولة الحصول على قرار من الخبير
    const expertDecision = this.expert.makeDecision(situation);
    
    // الحصول على قرار من المستكشف
    const currentDirection: Vector2D = this.extractDirection(situation);
    const explorerDecision = this.explorer.exploreNewDirection(
      currentDirection,
      this.settings.explorationStrategy
    );
    
    // دمج القرارات
    const decision = this.mergeDecisions(expertDecision, explorerDecision);
    
    // حفظ في التاريخ
    this.decisionHistory.push(decision);
    
    // تحديث الأوزان إذا كانت متكيفة
    if (this.settings.adaptiveWeights) {
      this.updateWeights(decision);
    }
    
    return decision;
  }
  
  /**
   * دمج قرارات الخبير والمستكشف
   * Merge expert and explorer decisions
   */
  private mergeDecisions(
    expertDecision: ExpertDecision | null,
    explorerDecision: ExplorerDecision
  ): BrainDecision {
    // إذا لم يكن هناك قرار من الخبير، استخدم المستكشف فقط
    if (!expertDecision) {
      return {
        action: explorerDecision.action,
        confidence: explorerDecision.potential,
        source: 'explorer',
        expertContribution: 0,
        explorerContribution: 1,
        reasoning: `استكشاف: ${explorerDecision.reasoning}`
      };
    }
    
    // دمج القرارين
    const expertWeight = this.settings.expertWeight;
    const explorerWeight = this.settings.explorerWeight;
    
    // حساب الثقة المدمجة
    const confidence = 
      expertDecision.confidence * expertWeight +
      explorerDecision.potential * explorerWeight;
    
    // تحديد المصدر
    let source: 'expert' | 'explorer' | 'hybrid';
    if (expertWeight > 0.8) {
      source = 'expert';
    } else if (explorerWeight > 0.8) {
      source = 'explorer';
    } else {
      source = 'hybrid';
    }
    
    // دمج الإجراءات
    const action = this.mergeActions(
      expertDecision.action,
      explorerDecision.action,
      expertWeight,
      explorerWeight
    );
    
    return {
      action,
      confidence,
      source,
      expertContribution: expertWeight,
      explorerContribution: explorerWeight,
      reasoning: `خبير (${(expertWeight * 100).toFixed(0)}%): ${expertDecision.reasoning} | مستكشف (${(explorerWeight * 100).toFixed(0)}%): ${explorerDecision.reasoning}`
    };
  }
  
  /**
   * دمج الإجراءات
   * Merge actions
   */
  private mergeActions(
    expertAction: any,
    explorerAction: any,
    expertWeight: number,
    explorerWeight: number
  ): any {
    // إذا كانت الإجراءات متجهات
    if (
      typeof expertAction === 'object' && 'x' in expertAction &&
      typeof explorerAction === 'object' && 'x' in explorerAction
    ) {
      return {
        x: expertAction.x * expertWeight + explorerAction.x * explorerWeight,
        y: expertAction.y * expertWeight + explorerAction.y * explorerWeight
      };
    }
    
    // إذا كانت الإجراءات أرقام
    if (typeof expertAction === 'number' && typeof explorerAction === 'number') {
      return expertAction * expertWeight + explorerAction * explorerWeight;
    }
    
    // افتراضي: استخدام إجراء الخبير
    return expertAction;
  }
  
  /**
   * استخراج الاتجاه من الموقف
   * Extract direction from situation
   */
  private extractDirection(situation: any): Vector2D {
    // استخراج بسيط - يمكن تحسينه
    if (typeof situation === 'object' && 'x' in situation && 'y' in situation) {
      return { x: situation.x, y: situation.y };
    }
    
    return { x: 1, y: 0 }; // افتراضي
  }
  
  /**
   * تحديث الأوزان بناءً على الأداء
   * Update weights based on performance
   */
  private updateWeights(decision: BrainDecision): void {
    // تحديث بسيط - يمكن تحسينه
    const learningRate = 0.05;
    
    if (decision.confidence > 0.7) {
      // قرار جيد - زيادة وزن المصدر
      if (decision.source === 'expert') {
        this.settings.expertWeight += learningRate;
      } else if (decision.source === 'explorer') {
        this.settings.explorerWeight += learningRate;
      }
    } else if (decision.confidence < 0.3) {
      // قرار ضعيف - تقليل وزن المصدر
      if (decision.source === 'expert') {
        this.settings.expertWeight -= learningRate;
      } else if (decision.source === 'explorer') {
        this.settings.explorerWeight -= learningRate;
      }
    }
    
    // تطبيع الأوزان
    this.normalizeWeights();
  }
  
  /**
   * التعلم من النتيجة
   * Learn from outcome
   */
  learnFromOutcome(
    decisionIndex: number,
    success: boolean,
    reward: number = 1.0
  ): boolean {
    if (decisionIndex < 0 || decisionIndex >= this.decisionHistory.length) {
      return false;
    }
    
    const decision = this.decisionHistory[decisionIndex];
    
    // تحديث الخبير إذا ساهم
    if (decision.expertContribution > 0) {
      // يحتاج إلى معرف المعرفة - تبسيط هنا
      // this.expert.learnFromOutcome(knowledgeId, success, reward);
    }
    
    // تحديث المستكشف إذا ساهم
    if (decision.explorerContribution > 0) {
      // يحتاج إلى معرف الاكتشاف - تبسيط هنا
      // this.explorer.learnFromExploration(discoveryId, success, reward);
    }
    
    return true;
  }
  
  /**
   * الحصول على إحصائيات
   * Get statistics
   */
  getStatistics(): {
    expert: any;
    explorer: any;
    brain: {
      totalDecisions: number;
      expertWeight: number;
      explorerWeight: number;
      averageConfidence: number;
    };
  } {
    const expertStats = this.expert.getStatistics();
    const explorerStats = this.explorer.getStatistics();
    
    let totalConfidence = 0;
    for (const decision of this.decisionHistory) {
      totalConfidence += decision.confidence;
    }
    
    return {
      expert: expertStats,
      explorer: explorerStats,
      brain: {
        totalDecisions: this.decisionHistory.length,
        expertWeight: this.settings.expertWeight,
        explorerWeight: this.settings.explorerWeight,
        averageConfidence: this.decisionHistory.length > 0
          ? totalConfidence / this.decisionHistory.length
          : 0
      }
    };
  }
  
  /**
   * الحصول على الخبير
   * Get expert
   */
  getExpert(): ExpertSystem {
    return this.expert;
  }
  
  /**
   * الحصول على المستكشف
   * Get explorer
   */
  getExplorer(): ExplorerSystem {
    return this.explorer;
  }
}

