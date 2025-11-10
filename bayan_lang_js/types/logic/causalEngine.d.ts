/**
 * محرك الشبكات السببية للغة البيان
 * Causal Network Engine for Bayan Language
 *
 * يدعم:
 * - العلاقات السببية مع الأوزان (Weighted Causal Relations)
 * - أنواع العلاقات المتعددة (Multiple Relation Types)
 * - التحليل العكسي (Backward Chaining)
 * - البُعد الزمني (Temporal Dimension)
 * - المستويات المتعددة (Multi-Level Networks)
 */
import { LogicEngine } from './logicEngine';
/**
 * أنواع العلاقات السببية
 * Causal Relation Types
 */
export declare enum RelationType {
    CAUSES = "\u064A\u0633\u0628\u0628",// causes - X causes Y
    PREVENTS = "\u064A\u0645\u0646\u0639",// prevents - X prevents Y
    ENHANCES = "\u064A\u0639\u0632\u0632",// enhances - X enhances Y
    WEAKENS = "\u064A\u0636\u0639\u0641",// weakens - X weakens Y
    LEADS_TO = "\u064A\u0624\u062F\u064A_\u0625\u0644\u0649",// leads to - X leads to Y
    REQUIRES = "\u064A\u062A\u0637\u0644\u0628",// requires - X requires Y
    ENABLES = "\u064A\u0645\u0643\u0651\u0646",// enables - X enables Y
    INHIBITS = "\u064A\u062B\u0628\u0637"
}
/**
 * الأسماء الإنجليزية للعلاقات
 */
export declare const RelationTypeEnglish: {
    [key: string]: RelationType;
};
/**
 * البُعد الزمني للعلاقة
 * Temporal Dimension
 */
export declare enum TemporalType {
    IMMEDIATE = "\u0641\u0648\u0631\u064A",// immediate - happens instantly
    SHORT_TERM = "\u0642\u0635\u064A\u0631_\u0627\u0644\u0645\u062F\u0649",// short-term - hours/days
    MEDIUM_TERM = "\u0645\u062A\u0648\u0633\u0637_\u0627\u0644\u0645\u062F\u0649",// medium-term - weeks/months
    LONG_TERM = "\u0637\u0648\u064A\u0644_\u0627\u0644\u0645\u062F\u0649"
}
/**
 * مستوى التأثير
 * Impact Level
 */
export declare enum ImpactLevel {
    INDIVIDUAL = "\u0641\u0631\u062F\u064A",// individual level
    GROUP = "\u062C\u0645\u0627\u0639\u064A",// group level
    SOCIETAL = "\u0645\u062C\u062A\u0645\u0639\u064A",// societal level
    NATIONAL = "\u0648\u0637\u0646\u064A",// national level
    GLOBAL = "\u0639\u0627\u0644\u0645\u064A"
}
/**
 * علاقة سببية
 * Causal Relation
 */
export declare class CausalRelation {
    from: string;
    to: string;
    type: RelationType;
    weight: number;
    temporal?: TemporalType | undefined;
    fromLevel?: ImpactLevel | undefined;
    toLevel?: ImpactLevel | undefined;
    constructor(from: string, // المصدر - source
    to: string, // الهدف - target
    type: RelationType, // نوع العلاقة - relation type
    weight?: number, // الوزن/الاحتمال (0-1) - weight/probability
    temporal?: TemporalType | undefined, // البُعد الزمني - temporal dimension
    fromLevel?: ImpactLevel | undefined, // مستوى المصدر - source level
    toLevel?: ImpactLevel | undefined);
    toString(): string;
}
/**
 * مسار سببي
 * Causal Path
 */
export declare class CausalPath {
    nodes: string[];
    relations: CausalRelation[];
    totalWeight: number;
    constructor(nodes: string[], // العقد في المسار - nodes in path
    relations: CausalRelation[], // العلاقات - relations
    totalWeight: number);
    get length(): number;
    toString(): string;
}
/**
 * محرك الشبكات السببية
 * Causal Network Engine
 */
export declare class CausalEngine extends LogicEngine {
    private relations;
    /**
     * إضافة علاقة سببية
     * Add a causal relation
     */
    addCausalRelation(relation: CausalRelation): void;
    /**
     * إضافة علاقة سببية من معاملات
     * Add causal relation from parameters
     */
    addRelation(from: string, to: string, type: RelationType | string, weight?: number, temporal?: TemporalType | string, fromLevel?: ImpactLevel | string, toLevel?: ImpactLevel | string): void;
    /**
     * الحصول على جميع العلاقات من عقدة معينة
     * Get all relations from a node
     */
    getRelationsFrom(node: string): CausalRelation[];
    /**
     * الحصول على جميع العلاقات إلى عقدة معينة
     * Get all relations to a node
     */
    getRelationsTo(node: string): CausalRelation[];
    /**
     * إيجاد جميع المسارات بين عقدتين
     * Find all paths between two nodes
     */
    findAllPaths(from: string, to: string, maxDepth?: number): CausalPath[];
    /**
     * إيجاد أقصر مسار بين عقدتين
     * Find shortest path between two nodes
     */
    findShortestPath(from: string, to: string): CausalPath | null;
    /**
     * إيجاد أقوى مسار (أعلى وزن كلي)
     * Find strongest path (highest total weight)
     */
    findStrongestPath(from: string, to: string): CausalPath | null;
    /**
     * إيجاد الأسباب الجذرية لنتيجة معينة
     * Find root causes for a result
     */
    findRootCauses(result: string): string[];
    /**
     * إيجاد النتائج النهائية لسبب معين
     * Find final results for a cause
     */
    findFinalResults(cause: string): string[];
    /**
     * حساب قوة التأثير الكلية بين عقدتين
     * Calculate total impact strength between two nodes
     */
    calculateImpactStrength(from: string, to: string): number;
    /**
     * طباعة الشبكة السببية
     * Print the causal network
     */
    printNetwork(): void;
    /**
     * اكتشاف الحلقات السببية (Circular Dependencies)
     * Detect causal loops
     */
    detectCycles(): string[][];
    /**
     * الحصول على جميع العقد في الشبكة
     * Get all nodes in the network
     */
    getAllNodes(): Set<string>;
    /**
     * إيجاد نقاط التدخل (Intervention Points)
     * Find intervention points to break causal chains
     */
    findInterventionPoints(from: string, to: string): string[];
    /**
     * محاكاة "ماذا لو" - إزالة عقدة وإعادة التحليل
     * What-if simulation - remove a node and re-analyze
     */
    whatIf(removeNode: string): CausalEngine;
    /**
     * محاكاة "ماذا لو" - إزالة علاقة وإعادة التحليل
     * What-if simulation - remove a relation and re-analyze
     */
    whatIfRemoveRelation(from: string, to: string): CausalEngine;
    /**
     * تصدير الشبكة إلى JSON
     * Export network to JSON
     */
    toJSON(): any;
    /**
     * تصدير الشبكة إلى تنسيق DOT (لـ Graphviz)
     * Export network to DOT format (for Graphviz)
     */
    toDOT(): string;
    /**
     * الحصول على لون العلاقة حسب نوعها
     * Get relation color by type
     */
    private getRelationColor;
    /**
     * تصدير الشبكة إلى تنسيق Mermaid
     * Export network to Mermaid format
     */
    toMermaid(): string;
    /**
     * التعلم من البيانات - استنتاج العلاقات السببية من الأمثلة
     * Learn from data - infer causal relations from examples
     *
     * @param observations - مصفوفة من الملاحظات، كل ملاحظة هي كائن يحتوي على الأحداث التي حدثت
     *                       Array of observations, each observation is an object containing events that occurred
     * @param threshold - الحد الأدنى للثقة لإضافة علاقة (0-1)
     *                    Minimum confidence threshold to add a relation (0-1)
     */
    learnFromData(observations: Record<string, boolean>[], threshold?: number): void;
    /**
     * حساب الارتباط بين حدثين
     * Calculate correlation between two events
     */
    calculateCorrelation(event1: string, event2: string, observations: Record<string, boolean>[]): number;
    /**
     * تحليل الأهمية النسبية للعقد
     * Analyze relative importance of nodes
     */
    analyzeNodeImportance(): Map<string, number>;
    /**
     * إيجاد العقد الأكثر تأثيراً
     * Find most influential nodes
     */
    findMostInfluentialNodes(limit?: number): string[];
    /**
     * حساب المسافة بين عقدتين (عدد الخطوات)
     * Calculate distance between two nodes (number of steps)
     */
    calculateDistance(from: string, to: string): number;
    /**
     * إيجاد جميع العقد القريبة من عقدة معينة
     * Find all nodes near a given node
     */
    findNearbyNodes(node: string, maxDistance?: number): Map<string, number>;
}
