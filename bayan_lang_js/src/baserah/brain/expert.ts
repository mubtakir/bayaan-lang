/**
 * نظام الخبير - Expert System
 * 
 * الخبير يدير المعرفة المكتسبة والاستراتيجيات الناجحة
 * Expert manages acquired knowledge and successful strategies
 * 
 * @author Al-Mubtakir
 * @version 1.0.0
 */

import { ZeroDuality } from './theories/zeroDuality';

/**
 * قاعدة معرفة
 * Knowledge Entry
 */
export interface KnowledgeEntry {
  id: string;
  pattern: any;           // النمط
  action: any;            // الإجراء
  successRate: number;    // معدل النجاح (0-1)
  usageCount: number;     // عدد مرات الاستخدام
  lastUsed: Date;         // آخر استخدام
  confidence: number;     // الثقة (0-1)
  metadata?: any;         // بيانات إضافية
}

/**
 * قرار الخبير
 * Expert Decision
 */
export interface ExpertDecision {
  action: any;
  confidence: number;
  reasoning: string;
  knowledgeUsed: string[];
}

/**
 * فئة نظام الخبير
 * Expert System Class
 */
export class ExpertSystem {
  private knowledge: Map<string, KnowledgeEntry> = new Map();
  private learningRate: number = 0.1;
  private confidenceThreshold: number = 0.5;
  
  constructor(
    learningRate: number = 0.1,
    confidenceThreshold: number = 0.5
  ) {
    this.learningRate = learningRate;
    this.confidenceThreshold = confidenceThreshold;
  }
  
  /**
   * إضافة معرفة جديدة
   * Add new knowledge
   */
  addKnowledge(entry: Omit<KnowledgeEntry, 'lastUsed' | 'usageCount'>): void {
    const fullEntry: KnowledgeEntry = {
      ...entry,
      lastUsed: new Date(),
      usageCount: 0
    };
    
    this.knowledge.set(entry.id, fullEntry);
  }
  
  /**
   * تحديث معرفة موجودة
   * Update existing knowledge
   */
  updateKnowledge(
    id: string,
    updates: Partial<Omit<KnowledgeEntry, 'id'>>
  ): boolean {
    const entry = this.knowledge.get(id);
    if (!entry) {
      return false;
    }
    
    Object.assign(entry, updates);
    return true;
  }
  
  /**
   * البحث عن معرفة مطابقة
   * Find matching knowledge
   */
  findMatchingKnowledge(pattern: any): KnowledgeEntry[] {
    const matches: KnowledgeEntry[] = [];
    
    for (const entry of this.knowledge.values()) {
      // مطابقة بسيطة - يمكن تحسينها
      if (this.patternsMatch(entry.pattern, pattern)) {
        matches.push(entry);
      }
    }
    
    // ترتيب حسب الثقة ومعدل النجاح
    return matches.sort((a, b) => {
      const scoreA = a.confidence * a.successRate;
      const scoreB = b.confidence * b.successRate;
      return scoreB - scoreA;
    });
  }
  
  /**
   * اتخاذ قرار بناءً على المعرفة
   * Make decision based on knowledge
   */
  makeDecision(situation: any): ExpertDecision | null {
    const matches = this.findMatchingKnowledge(situation);
    
    if (matches.length === 0) {
      return null;
    }
    
    // استخدام أفضل تطابق
    const best = matches[0];
    
    // تحديث الاستخدام
    best.usageCount++;
    best.lastUsed = new Date();
    
    // حساب الثقة النهائية باستخدام ثنائية الصفر
    const positiveConfidence = best.confidence * best.successRate;
    const negativeConfidence = (1 - best.confidence) * (1 - best.successRate);
    
    const balanceFactor = ZeroDuality.evaluateBalance(
      positiveConfidence,
      negativeConfidence
    ).balanceFactor;
    
    const finalConfidence = positiveConfidence * (1 - balanceFactor);
    
    return {
      action: best.action,
      confidence: finalConfidence,
      reasoning: `استخدام المعرفة ${best.id} (نجاح: ${(best.successRate * 100).toFixed(1)}%, استخدام: ${best.usageCount})`,
      knowledgeUsed: [best.id]
    };
  }
  
  /**
   * التعلم من النتيجة
   * Learn from outcome
   */
  learnFromOutcome(
    knowledgeId: string,
    success: boolean,
    reward: number = 1.0
  ): boolean {
    const entry = this.knowledge.get(knowledgeId);
    if (!entry) {
      return false;
    }
    
    // تحديث معدل النجاح
    const oldRate = entry.successRate;
    const newRate = success ? 1.0 : 0.0;
    entry.successRate = oldRate + this.learningRate * (newRate - oldRate);
    
    // تحديث الثقة
    const oldConfidence = entry.confidence;
    const confidenceAdjustment = success ? reward : -reward;
    entry.confidence = Math.max(
      0,
      Math.min(1, oldConfidence + this.learningRate * confidenceAdjustment)
    );
    
    return true;
  }
  
  /**
   * دمج قرارات متعددة
   * Merge multiple decisions
   */
  mergeDecisions(decisions: ExpertDecision[]): ExpertDecision {
    if (decisions.length === 0) {
      throw new Error('لا توجد قرارات للدمج');
    }
    
    if (decisions.length === 1) {
      return decisions[0];
    }
    
    // حساب متوسط الثقة المرجح
    let totalConfidence = 0;
    let totalWeight = 0;
    const allKnowledge: string[] = [];
    
    for (const decision of decisions) {
      totalConfidence += decision.confidence;
      totalWeight += decision.confidence;
      allKnowledge.push(...decision.knowledgeUsed);
    }
    
    const avgConfidence = totalConfidence / decisions.length;
    
    return {
      action: decisions[0].action, // استخدام الإجراء الأول (يمكن تحسينه)
      confidence: avgConfidence,
      reasoning: `دمج ${decisions.length} قرارات`,
      knowledgeUsed: allKnowledge
    };
  }
  
  /**
   * الحصول على إحصائيات
   * Get statistics
   */
  getStatistics(): {
    totalKnowledge: number;
    averageSuccessRate: number;
    averageConfidence: number;
    mostUsed: KnowledgeEntry | null;
  } {
    if (this.knowledge.size === 0) {
      return {
        totalKnowledge: 0,
        averageSuccessRate: 0,
        averageConfidence: 0,
        mostUsed: null
      };
    }
    
    let totalSuccess = 0;
    let totalConfidence = 0;
    let mostUsed: KnowledgeEntry | null = null;
    let maxUsage = 0;
    
    for (const entry of this.knowledge.values()) {
      totalSuccess += entry.successRate;
      totalConfidence += entry.confidence;
      
      if (entry.usageCount > maxUsage) {
        maxUsage = entry.usageCount;
        mostUsed = entry;
      }
    }
    
    return {
      totalKnowledge: this.knowledge.size,
      averageSuccessRate: totalSuccess / this.knowledge.size,
      averageConfidence: totalConfidence / this.knowledge.size,
      mostUsed
    };
  }
  
  /**
   * مطابقة الأنماط (بسيطة)
   * Pattern matching (simple)
   */
  private patternsMatch(pattern1: any, pattern2: any): boolean {
    // مطابقة بسيطة - يمكن تحسينها بمطابقة أكثر تعقيداً
    return JSON.stringify(pattern1) === JSON.stringify(pattern2);
  }
  
  /**
   * مسح المعرفة القديمة
   * Clear old knowledge
   */
  clearOldKnowledge(daysOld: number = 30): number {
    const now = new Date();
    const threshold = daysOld * 24 * 60 * 60 * 1000;
    let cleared = 0;
    
    for (const [id, entry] of this.knowledge) {
      const age = now.getTime() - entry.lastUsed.getTime();
      if (age > threshold && entry.usageCount < 5) {
        this.knowledge.delete(id);
        cleared++;
      }
    }
    
    return cleared;
  }
}

