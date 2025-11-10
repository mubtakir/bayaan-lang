/**
 * نظام الاحتمالات والشك - Probability and Uncertainty System
 * 
 * يتعامل مع المعلومات غير المؤكدة ويوفر استدلال احتمالي
 */

/**
 * درجة الاحتمال - Probability Level
 */
export enum ProbabilityLevel {
  IMPOSSIBLE = 'impossible',        // مستحيل (0)
  VERY_UNLIKELY = 'very_unlikely',  // غير محتمل جداً (0.1)
  UNLIKELY = 'unlikely',            // غير محتمل (0.3)
  POSSIBLE = 'possible',            // ممكن (0.5)
  LIKELY = 'likely',                // محتمل (0.7)
  VERY_LIKELY = 'very_likely',      // محتمل جداً (0.9)
  CERTAIN = 'certain'               // مؤكد (1.0)
}

/**
 * نوع الدليل - Evidence Type
 */
export enum EvidenceType {
  SUPPORTING = 'supporting',    // داعم
  CONTRADICTING = 'contradicting', // متناقض
  NEUTRAL = 'neutral'           // محايد
}

/**
 * طريقة الدمج - Combination Method
 */
export enum CombinationMethod {
  AVERAGE = 'average',           // المتوسط
  WEIGHTED = 'weighted',         // مرجح
  BAYESIAN = 'bayesian',         // بايزي
  DEMPSTER_SHAFER = 'dempster_shafer' // ديمبستر-شافر
}

/**
 * حقيقة احتمالية - Probabilistic Fact
 */
export class ProbabilisticFact {
  constructor(
    public statement: string,
    public probability: number,
    public evidence: Evidence[] = [],
    public timestamp: number = Date.now()
  ) {
    // التأكد من أن الاحتمال بين 0 و 1
    this.probability = Math.max(0, Math.min(1, probability));
  }

  /**
   * إضافة دليل
   */
  addEvidence(evidence: Evidence): void {
    this.evidence.push(evidence);
  }

  /**
   * الحصول على مستوى الاحتمال
   */
  getProbabilityLevel(): ProbabilityLevel {
    if (this.probability === 0) return ProbabilityLevel.IMPOSSIBLE;
    if (this.probability <= 0.1) return ProbabilityLevel.VERY_UNLIKELY;
    if (this.probability <= 0.3) return ProbabilityLevel.UNLIKELY;
    if (this.probability <= 0.5) return ProbabilityLevel.POSSIBLE;
    if (this.probability <= 0.7) return ProbabilityLevel.LIKELY;
    if (this.probability <= 0.9) return ProbabilityLevel.VERY_LIKELY;
    return ProbabilityLevel.CERTAIN;
  }

  toString(): string {
    const level = this.getProbabilityLevel();
    return `${this.statement} [${(this.probability * 100).toFixed(1)}% - ${level}]`;
  }
}

/**
 * دليل - Evidence
 */
export class Evidence {
  constructor(
    public description: string,
    public type: EvidenceType,
    public strength: number, // 0-1
    public source: string = 'unknown'
  ) {
    this.strength = Math.max(0, Math.min(1, strength));
  }

  toString(): string {
    return `${this.description} (${this.type}, قوة: ${(this.strength * 100).toFixed(1)}%)`;
  }
}

/**
 * قاعدة احتمالية - Probabilistic Rule
 */
export class ProbabilisticRule {
  constructor(
    public name: string,
    public premises: Map<string, number>, // statement -> required probability
    public conclusion: string,
    public conclusionProbability: number
  ) {}

  /**
   * التحقق من تطبيق القاعدة
   */
  canApply(facts: Map<string, ProbabilisticFact>): boolean {
    for (const [premise, requiredProb] of this.premises) {
      const fact = facts.get(premise);
      if (!fact || fact.probability < requiredProb) {
        return false;
      }
    }
    return true;
  }

  /**
   * حساب احتمال النتيجة
   */
  calculateConclusionProbability(facts: Map<string, ProbabilisticFact>): number {
    let minProb = 1.0;
    for (const [premise, _requiredProb] of this.premises) {
      const fact = facts.get(premise);
      if (fact) {
        minProb = Math.min(minProb, fact.probability);
      }
    }
    return minProb * this.conclusionProbability;
  }

  toString(): string {
    const premisesStr = Array.from(this.premises.entries())
      .map(([p, prob]) => `${p}[${(prob * 100).toFixed(0)}%]`)
      .join(' ∧ ');
    return `${premisesStr} → ${this.conclusion}[${(this.conclusionProbability * 100).toFixed(0)}%]`;
  }
}

/**
 * محرك الاحتمالات - Probability Engine
 */
export class ProbabilityEngine {
  private facts: Map<string, ProbabilisticFact> = new Map();
  private rules: Map<string, ProbabilisticRule> = new Map();

  /**
   * إضافة حقيقة احتمالية
   */
  addFact(statement: string, probability: number, evidence?: Evidence[]): ProbabilisticFact {
    const fact = new ProbabilisticFact(statement, probability, evidence);
    this.facts.set(statement, fact);
    return fact;
  }

  /**
   * الحصول على حقيقة
   */
  getFact(statement: string): ProbabilisticFact | undefined {
    return this.facts.get(statement);
  }

  /**
   * تحديث احتمال حقيقة
   */
  updateProbability(statement: string, newProbability: number): void {
    const fact = this.facts.get(statement);
    if (fact) {
      fact.probability = Math.max(0, Math.min(1, newProbability));
    }
  }

  /**
   * إضافة دليل لحقيقة
   */
  addEvidence(statement: string, evidence: Evidence): void {
    const fact = this.facts.get(statement);
    if (fact) {
      fact.addEvidence(evidence);
      // إعادة حساب الاحتمال بناءً على الأدلة
      this.recalculateProbability(statement);
    }
  }

  /**
   * إعادة حساب الاحتمال بناءً على الأدلة
   */
  private recalculateProbability(statement: string): void {
    const fact = this.facts.get(statement);
    if (!fact || fact.evidence.length === 0) return;

    // حساب الاحتمال بناءً على الأدلة
    let supportingWeight = 0;
    let contradictingWeight = 0;
    let totalWeight = 0;

    for (const evidence of fact.evidence) {
      if (evidence.type === EvidenceType.SUPPORTING) {
        supportingWeight += evidence.strength;
      } else if (evidence.type === EvidenceType.CONTRADICTING) {
        contradictingWeight += evidence.strength;
      }
      totalWeight += evidence.strength;
    }

    if (totalWeight > 0) {
      fact.probability = supportingWeight / (supportingWeight + contradictingWeight);
    }
  }

  /**
   * إضافة قاعدة احتمالية
   */
  addRule(rule: ProbabilisticRule): void {
    this.rules.set(rule.name, rule);
  }

  /**
   * تطبيق القواعد الاحتمالية
   */
  applyRules(): ProbabilisticFact[] {
    const newFacts: ProbabilisticFact[] = [];

    for (const rule of this.rules.values()) {
      if (rule.canApply(this.facts)) {
        const probability = rule.calculateConclusionProbability(this.facts);
        
        // إذا كانت النتيجة موجودة، نحدث احتمالها
        const existingFact = this.facts.get(rule.conclusion);
        if (existingFact) {
          // دمج الاحتمالات
          existingFact.probability = this.combineProbabilities(
            existingFact.probability,
            probability,
            CombinationMethod.AVERAGE
          );
        } else {
          // إنشاء حقيقة جديدة
          const newFact = this.addFact(rule.conclusion, probability);
          newFacts.push(newFact);
        }
      }
    }

    return newFacts;
  }

  /**
   * دمج احتمالين
   */
  combineProbabilities(
    p1: number,
    p2: number,
    method: CombinationMethod = CombinationMethod.AVERAGE
  ): number {
    switch (method) {
      case CombinationMethod.AVERAGE:
        return (p1 + p2) / 2;
      
      case CombinationMethod.WEIGHTED:
        // وزن أكبر للاحتمال الأعلى
        return (p1 * 0.6 + p2 * 0.4);
      
      case CombinationMethod.BAYESIAN:
        // قاعدة بايز المبسطة
        return (p1 * p2) / ((p1 * p2) + ((1 - p1) * (1 - p2)));
      
      case CombinationMethod.DEMPSTER_SHAFER:
        // نظرية ديمبستر-شافر المبسطة
        const k = p1 * (1 - p2) + p2 * (1 - p1);
        return (p1 * p2) / (1 - k);
      
      default:
        return (p1 + p2) / 2;
    }
  }

  /**
   * الاستدلال الاحتمالي
   */
  infer(statement: string, threshold: number = 0.5): ProbabilisticFact | null {
    // تطبيق القواعد أولاً
    this.applyRules();

    // البحث عن الحقيقة
    const fact = this.facts.get(statement);
    if (fact && fact.probability >= threshold) {
      return fact;
    }

    return null;
  }

  /**
   * الحصول على جميع الحقائق فوق عتبة معينة
   */
  getFactsAboveThreshold(threshold: number): ProbabilisticFact[] {
    return Array.from(this.facts.values())
      .filter(fact => fact.probability >= threshold)
      .sort((a, b) => b.probability - a.probability);
  }

  /**
   * الحصول على جميع الحقائق
   */
  getAllFacts(): ProbabilisticFact[] {
    return Array.from(this.facts.values());
  }

  /**
   * الحصول على جميع القواعد
   */
  getAllRules(): ProbabilisticRule[] {
    return Array.from(this.rules.values());
  }

  /**
   * مسح جميع الحقائق
   */
  clearFacts(): void {
    this.facts.clear();
  }

  /**
   * مسح جميع القواعد
   */
  clearRules(): void {
    this.rules.clear();
  }

  /**
   * إحصائيات
   */
  getStatistics(): {
    totalFacts: number;
    totalRules: number;
    certainFacts: number;
    uncertainFacts: number;
    averageProbability: number;
  } {
    const facts = this.getAllFacts();
    const certainFacts = facts.filter(f => f.probability >= 0.9).length;
    const uncertainFacts = facts.filter(f => f.probability < 0.5).length;
    const avgProb = facts.length > 0
      ? facts.reduce((sum, f) => sum + f.probability, 0) / facts.length
      : 0;

    return {
      totalFacts: facts.length,
      totalRules: this.rules.size,
      certainFacts,
      uncertainFacts,
      averageProbability: avgProb
    };
  }
}

