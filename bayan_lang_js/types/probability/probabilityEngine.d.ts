/**
 * نظام الاحتمالات والشك - Probability and Uncertainty System
 *
 * يتعامل مع المعلومات غير المؤكدة ويوفر استدلال احتمالي
 */
/**
 * درجة الاحتمال - Probability Level
 */
export declare enum ProbabilityLevel {
    IMPOSSIBLE = "impossible",// مستحيل (0)
    VERY_UNLIKELY = "very_unlikely",// غير محتمل جداً (0.1)
    UNLIKELY = "unlikely",// غير محتمل (0.3)
    POSSIBLE = "possible",// ممكن (0.5)
    LIKELY = "likely",// محتمل (0.7)
    VERY_LIKELY = "very_likely",// محتمل جداً (0.9)
    CERTAIN = "certain"
}
/**
 * نوع الدليل - Evidence Type
 */
export declare enum EvidenceType {
    SUPPORTING = "supporting",// داعم
    CONTRADICTING = "contradicting",// متناقض
    NEUTRAL = "neutral"
}
/**
 * طريقة الدمج - Combination Method
 */
export declare enum CombinationMethod {
    AVERAGE = "average",// المتوسط
    WEIGHTED = "weighted",// مرجح
    BAYESIAN = "bayesian",// بايزي
    DEMPSTER_SHAFER = "dempster_shafer"
}
/**
 * حقيقة احتمالية - Probabilistic Fact
 */
export declare class ProbabilisticFact {
    statement: string;
    probability: number;
    evidence: Evidence[];
    timestamp: number;
    constructor(statement: string, probability: number, evidence?: Evidence[], timestamp?: number);
    /**
     * إضافة دليل
     */
    addEvidence(evidence: Evidence): void;
    /**
     * الحصول على مستوى الاحتمال
     */
    getProbabilityLevel(): ProbabilityLevel;
    toString(): string;
}
/**
 * دليل - Evidence
 */
export declare class Evidence {
    description: string;
    type: EvidenceType;
    strength: number;
    source: string;
    constructor(description: string, type: EvidenceType, strength: number, // 0-1
    source?: string);
    toString(): string;
}
/**
 * قاعدة احتمالية - Probabilistic Rule
 */
export declare class ProbabilisticRule {
    name: string;
    premises: Map<string, number>;
    conclusion: string;
    conclusionProbability: number;
    constructor(name: string, premises: Map<string, number>, // statement -> required probability
    conclusion: string, conclusionProbability: number);
    /**
     * التحقق من تطبيق القاعدة
     */
    canApply(facts: Map<string, ProbabilisticFact>): boolean;
    /**
     * حساب احتمال النتيجة
     */
    calculateConclusionProbability(facts: Map<string, ProbabilisticFact>): number;
    toString(): string;
}
/**
 * محرك الاحتمالات - Probability Engine
 */
export declare class ProbabilityEngine {
    private facts;
    private rules;
    /**
     * إضافة حقيقة احتمالية
     */
    addFact(statement: string, probability: number, evidence?: Evidence[]): ProbabilisticFact;
    /**
     * الحصول على حقيقة
     */
    getFact(statement: string): ProbabilisticFact | undefined;
    /**
     * تحديث احتمال حقيقة
     */
    updateProbability(statement: string, newProbability: number): void;
    /**
     * إضافة دليل لحقيقة
     */
    addEvidence(statement: string, evidence: Evidence): void;
    /**
     * إعادة حساب الاحتمال بناءً على الأدلة
     */
    private recalculateProbability;
    /**
     * إضافة قاعدة احتمالية
     */
    addRule(rule: ProbabilisticRule): void;
    /**
     * تطبيق القواعد الاحتمالية
     */
    applyRules(): ProbabilisticFact[];
    /**
     * دمج احتمالين
     */
    combineProbabilities(p1: number, p2: number, method?: CombinationMethod): number;
    /**
     * الاستدلال الاحتمالي
     */
    infer(statement: string, threshold?: number): ProbabilisticFact | null;
    /**
     * الحصول على جميع الحقائق فوق عتبة معينة
     */
    getFactsAboveThreshold(threshold: number): ProbabilisticFact[];
    /**
     * الحصول على جميع الحقائق
     */
    getAllFacts(): ProbabilisticFact[];
    /**
     * الحصول على جميع القواعد
     */
    getAllRules(): ProbabilisticRule[];
    /**
     * مسح جميع الحقائق
     */
    clearFacts(): void;
    /**
     * مسح جميع القواعد
     */
    clearRules(): void;
    /**
     * إحصائيات
     */
    getStatistics(): {
        totalFacts: number;
        totalRules: number;
        certainFacts: number;
        uncertainFacts: number;
        averageProbability: number;
    };
}
