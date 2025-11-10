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

import { Term, Predicate, LogicEngine } from './logicEngine';

/**
 * أنواع العلاقات السببية
 * Causal Relation Types
 */
export enum RelationType {
  CAUSES = 'يسبب',           // causes - X causes Y
  PREVENTS = 'يمنع',         // prevents - X prevents Y
  ENHANCES = 'يعزز',         // enhances - X enhances Y
  WEAKENS = 'يضعف',          // weakens - X weakens Y
  LEADS_TO = 'يؤدي_إلى',    // leads to - X leads to Y
  REQUIRES = 'يتطلب',        // requires - X requires Y
  ENABLES = 'يمكّن',         // enables - X enables Y
  INHIBITS = 'يثبط'          // inhibits - X inhibits Y
}

/**
 * الأسماء الإنجليزية للعلاقات
 */
export const RelationTypeEnglish: { [key: string]: RelationType } = {
  'causes': RelationType.CAUSES,
  'prevents': RelationType.PREVENTS,
  'enhances': RelationType.ENHANCES,
  'weakens': RelationType.WEAKENS,
  'leads_to': RelationType.LEADS_TO,
  'requires': RelationType.REQUIRES,
  'enables': RelationType.ENABLES,
  'inhibits': RelationType.INHIBITS
};

/**
 * البُعد الزمني للعلاقة
 * Temporal Dimension
 */
export enum TemporalType {
  IMMEDIATE = 'فوري',           // immediate - happens instantly
  SHORT_TERM = 'قصير_المدى',    // short-term - hours/days
  MEDIUM_TERM = 'متوسط_المدى',  // medium-term - weeks/months
  LONG_TERM = 'طويل_المدى'      // long-term - years
}

/**
 * مستوى التأثير
 * Impact Level
 */
export enum ImpactLevel {
  INDIVIDUAL = 'فردي',      // individual level
  GROUP = 'جماعي',          // group level
  SOCIETAL = 'مجتمعي',      // societal level
  NATIONAL = 'وطني',        // national level
  GLOBAL = 'عالمي'          // global level
}

/**
 * علاقة سببية
 * Causal Relation
 */
export class CausalRelation {
  constructor(
    public from: string,              // المصدر - source
    public to: string,                // الهدف - target
    public type: RelationType,        // نوع العلاقة - relation type
    public weight: number = 1.0,      // الوزن/الاحتمال (0-1) - weight/probability
    public temporal?: TemporalType,   // البُعد الزمني - temporal dimension
    public fromLevel?: ImpactLevel,   // مستوى المصدر - source level
    public toLevel?: ImpactLevel      // مستوى الهدف - target level
  ) {
    // التحقق من صحة الوزن
    if (weight < 0 || weight > 1) {
      throw new Error(`الوزن يجب أن يكون بين 0 و 1 - Weight must be between 0 and 1: ${weight}`);
    }
  }

  toString(): string {
    let str = `${this.from} ${this.type} ${this.to}`;
    if (this.weight !== 1.0) {
      str += ` [${this.weight}]`;
    }
    if (this.temporal) {
      str += ` (${this.temporal})`;
    }
    if (this.fromLevel && this.toLevel) {
      str += ` [${this.fromLevel} → ${this.toLevel}]`;
    }
    return str;
  }
}

/**
 * مسار سببي
 * Causal Path
 */
export class CausalPath {
  constructor(
    public nodes: string[],           // العقد في المسار - nodes in path
    public relations: CausalRelation[], // العلاقات - relations
    public totalWeight: number        // الوزن الكلي - total weight
  ) {}

  get length(): number {
    return this.nodes.length - 1;
  }

  toString(): string {
    let str = this.nodes[0];
    for (let i = 0; i < this.relations.length; i++) {
      str += ` → [${this.relations[i].type}:${this.relations[i].weight}] → ${this.nodes[i + 1]}`;
    }
    str += ` (إجمالي: ${this.totalWeight.toFixed(3)})`;
    return str;
  }
}

/**
 * محرك الشبكات السببية
 * Causal Network Engine
 */
export class CausalEngine extends LogicEngine {
  private relations: CausalRelation[] = [];

  /**
   * إضافة علاقة سببية
   * Add a causal relation
   */
  addCausalRelation(relation: CausalRelation): void {
    this.relations.push(relation);
    
    // إضافة كحقيقة في المحرك المنطقي
    const args = [
      new Term(relation.from, false),
      new Term(relation.to, false),
      new Term(relation.weight, false)
    ];
    
    // إضافة نوع العلاقة
    const predicate = new Predicate(relation.type, args);
    this.addFact({ predicate } as any);
  }

  /**
   * إضافة علاقة سببية من معاملات
   * Add causal relation from parameters
   */
  addRelation(
    from: string,
    to: string,
    type: RelationType | string,
    weight: number = 1.0,
    temporal?: TemporalType | string,
    fromLevel?: ImpactLevel | string,
    toLevel?: ImpactLevel | string
  ): void {
    // تحويل النوع إذا كان string
    let relationType: RelationType;
    if (typeof type === 'string') {
      relationType = RelationTypeEnglish[type] || type as RelationType;
    } else {
      relationType = type;
    }

    const relation = new CausalRelation(
      from,
      to,
      relationType,
      weight,
      temporal as TemporalType,
      fromLevel as ImpactLevel,
      toLevel as ImpactLevel
    );
    
    this.addCausalRelation(relation);
  }

  /**
   * الحصول على جميع العلاقات من عقدة معينة
   * Get all relations from a node
   */
  getRelationsFrom(node: string): CausalRelation[] {
    return this.relations.filter(r => r.from === node);
  }

  /**
   * الحصول على جميع العلاقات إلى عقدة معينة
   * Get all relations to a node
   */
  getRelationsTo(node: string): CausalRelation[] {
    return this.relations.filter(r => r.to === node);
  }

  /**
   * إيجاد جميع المسارات بين عقدتين
   * Find all paths between two nodes
   */
  findAllPaths(from: string, to: string, maxDepth: number = 10): CausalPath[] {
    const paths: CausalPath[] = [];
    const visited = new Set<string>();
    
    const dfs = (
      current: string,
      target: string,
      currentPath: string[],
      currentRelations: CausalRelation[],
      currentWeight: number,
      depth: number
    ) => {
      if (depth > maxDepth) return;
      
      if (current === target && currentPath.length > 1) {
        paths.push(new CausalPath(
          [...currentPath],
          [...currentRelations],
          currentWeight
        ));
        return;
      }
      
      visited.add(current);
      
      const relations = this.getRelationsFrom(current);
      for (const relation of relations) {
        if (!visited.has(relation.to)) {
          currentPath.push(relation.to);
          currentRelations.push(relation);
          
          // حساب الوزن الكلي (ضرب الاحتمالات)
          const newWeight = currentWeight * relation.weight;
          
          dfs(relation.to, target, currentPath, currentRelations, newWeight, depth + 1);
          
          currentPath.pop();
          currentRelations.pop();
        }
      }
      
      visited.delete(current);
    };
    
    dfs(from, to, [from], [], 1.0, 0);
    
    // ترتيب المسارات حسب الوزن (الأعلى أولاً)
    paths.sort((a, b) => b.totalWeight - a.totalWeight);
    
    return paths;
  }

  /**
   * إيجاد أقصر مسار بين عقدتين
   * Find shortest path between two nodes
   */
  findShortestPath(from: string, to: string): CausalPath | null {
    const paths = this.findAllPaths(from, to);
    if (paths.length === 0) return null;
    
    // إيجاد أقصر مسار
    let shortest = paths[0];
    for (const path of paths) {
      if (path.length < shortest.length) {
        shortest = path;
      }
    }
    
    return shortest;
  }

  /**
   * إيجاد أقوى مسار (أعلى وزن كلي)
   * Find strongest path (highest total weight)
   */
  findStrongestPath(from: string, to: string): CausalPath | null {
    const paths = this.findAllPaths(from, to);
    if (paths.length === 0) return null;
    
    // المسارات مرتبة حسب الوزن، نأخذ الأول
    return paths[0];
  }

  /**
   * إيجاد الأسباب الجذرية لنتيجة معينة
   * Find root causes for a result
   */
  findRootCauses(result: string): string[] {
    const rootCauses: string[] = [];
    const allNodes = new Set<string>();
    
    // جمع جميع العقد
    for (const relation of this.relations) {
      allNodes.add(relation.from);
      allNodes.add(relation.to);
    }
    
    // إيجاد العقد التي ليس لها أسباب (لا توجد علاقات تؤدي إليها)
    for (const node of allNodes) {
      const incomingRelations = this.getRelationsTo(node);
      if (incomingRelations.length === 0) {
        // التحقق إذا كان هذا السبب الجذري يؤدي إلى النتيجة
        const paths = this.findAllPaths(node, result);
        if (paths.length > 0) {
          rootCauses.push(node);
        }
      }
    }
    
    return rootCauses;
  }

  /**
   * إيجاد النتائج النهائية لسبب معين
   * Find final results for a cause
   */
  findFinalResults(cause: string): string[] {
    const finalResults: string[] = [];
    const allNodes = new Set<string>();
    
    // جمع جميع العقد
    for (const relation of this.relations) {
      allNodes.add(relation.from);
      allNodes.add(relation.to);
    }
    
    // إيجاد العقد التي ليس لها نتائج (لا توجد علاقات تخرج منها)
    for (const node of allNodes) {
      const outgoingRelations = this.getRelationsFrom(node);
      if (outgoingRelations.length === 0) {
        // التحقق إذا كان السبب يؤدي إلى هذه النتيجة النهائية
        const paths = this.findAllPaths(cause, node);
        if (paths.length > 0) {
          finalResults.push(node);
        }
      }
    }
    
    return finalResults;
  }

  /**
   * حساب قوة التأثير الكلية بين عقدتين
   * Calculate total impact strength between two nodes
   */
  calculateImpactStrength(from: string, to: string): number {
    const paths = this.findAllPaths(from, to);
    if (paths.length === 0) return 0;
    
    // حساب متوسط الأوزان لجميع المسارات
    const totalWeight = paths.reduce((sum, path) => sum + path.totalWeight, 0);
    return totalWeight / paths.length;
  }

  /**
   * طباعة الشبكة السببية
   * Print the causal network
   */
  printNetwork(): void {
    console.log('\n=== الشبكة السببية / Causal Network ===\n');

    for (const relation of this.relations) {
      console.log(relation.toString());
    }

    console.log('\n=====================================\n');
  }

  /**
   * اكتشاف الحلقات السببية (Circular Dependencies)
   * Detect causal loops
   */
  detectCycles(): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const allNodes = this.getAllNodes();

    const dfs = (node: string, path: string[]): void => {
      visited.add(node);
      recursionStack.add(node);
      path.push(node);

      const relations = this.getRelationsFrom(node);
      for (const relation of relations) {
        if (!visited.has(relation.to)) {
          dfs(relation.to, [...path]);
        } else if (recursionStack.has(relation.to)) {
          // وجدنا حلقة - Found a cycle
          const cycleStart = path.indexOf(relation.to);
          if (cycleStart !== -1) {
            const cycle = [...path.slice(cycleStart), relation.to];
            cycles.push(cycle);
          }
        }
      }

      recursionStack.delete(node);
    };

    for (const node of allNodes) {
      if (!visited.has(node)) {
        dfs(node, []);
      }
    }

    return cycles;
  }

  /**
   * الحصول على جميع العقد في الشبكة
   * Get all nodes in the network
   */
  getAllNodes(): Set<string> {
    const nodes = new Set<string>();
    for (const relation of this.relations) {
      nodes.add(relation.from);
      nodes.add(relation.to);
    }
    return nodes;
  }

  /**
   * إيجاد نقاط التدخل (Intervention Points)
   * Find intervention points to break causal chains
   */
  findInterventionPoints(from: string, to: string): string[] {
    const paths = this.findAllPaths(from, to);
    if (paths.length === 0) return [];

    // إيجاد العقد المشتركة في جميع المسارات
    const nodeCounts = new Map<string, number>();

    for (const path of paths) {
      // استبعاد البداية والنهاية
      for (let i = 1; i < path.nodes.length - 1; i++) {
        const node = path.nodes[i];
        nodeCounts.set(node, (nodeCounts.get(node) || 0) + 1);
      }
    }

    // ترتيب العقد حسب عدد المسارات التي تمر بها
    const interventionPoints = Array.from(nodeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([node]) => node);

    return interventionPoints;
  }

  /**
   * محاكاة "ماذا لو" - إزالة عقدة وإعادة التحليل
   * What-if simulation - remove a node and re-analyze
   */
  whatIf(removeNode: string): CausalEngine {
    const newEngine = new CausalEngine();

    // نسخ جميع العلاقات التي لا تتضمن العقدة المحذوفة
    for (const relation of this.relations) {
      if (relation.from !== removeNode && relation.to !== removeNode) {
        newEngine.addCausalRelation(relation);
      }
    }

    return newEngine;
  }

  /**
   * محاكاة "ماذا لو" - إزالة علاقة وإعادة التحليل
   * What-if simulation - remove a relation and re-analyze
   */
  whatIfRemoveRelation(from: string, to: string): CausalEngine {
    const newEngine = new CausalEngine();

    // نسخ جميع العلاقات ماعدا العلاقة المحددة
    for (const relation of this.relations) {
      if (!(relation.from === from && relation.to === to)) {
        newEngine.addCausalRelation(relation);
      }
    }

    return newEngine;
  }

  /**
   * تصدير الشبكة إلى JSON
   * Export network to JSON
   */
  toJSON(): any {
    return {
      nodes: Array.from(this.getAllNodes()),
      relations: this.relations.map(r => ({
        from: r.from,
        to: r.to,
        type: r.type,
        weight: r.weight,
        temporal: r.temporal,
        fromLevel: r.fromLevel,
        toLevel: r.toLevel
      }))
    };
  }

  /**
   * تصدير الشبكة إلى تنسيق DOT (لـ Graphviz)
   * Export network to DOT format (for Graphviz)
   */
  toDOT(): string {
    let dot = 'digraph CausalNetwork {\n';
    dot += '  rankdir=LR;\n';
    dot += '  node [shape=box, style=rounded];\n\n';

    for (const relation of this.relations) {
      const label = `${relation.type}\\n${relation.weight}`;
      const color = this.getRelationColor(relation.type);
      dot += `  "${relation.from}" -> "${relation.to}" [label="${label}", color="${color}"];\n`;
    }

    dot += '}\n';
    return dot;
  }

  /**
   * الحصول على لون العلاقة حسب نوعها
   * Get relation color by type
   */
  private getRelationColor(type: RelationType): string {
    switch (type) {
      case RelationType.CAUSES: return 'red';
      case RelationType.PREVENTS: return 'blue';
      case RelationType.ENHANCES: return 'green';
      case RelationType.WEAKENS: return 'orange';
      case RelationType.LEADS_TO: return 'purple';
      case RelationType.REQUIRES: return 'brown';
      case RelationType.ENABLES: return 'cyan';
      case RelationType.INHIBITS: return 'magenta';
      default: return 'black';
    }
  }

  /**
   * تصدير الشبكة إلى تنسيق Mermaid
   * Export network to Mermaid format
   */
  toMermaid(): string {
    let mermaid = 'graph LR\n';

    for (const relation of this.relations) {
      const label = `${relation.type}<br/>${relation.weight}`;
      mermaid += `  ${relation.from}[${relation.from}] -->|${label}| ${relation.to}[${relation.to}]\n`;
    }

    return mermaid;
  }

  /**
   * التعلم من البيانات - استنتاج العلاقات السببية من الأمثلة
   * Learn from data - infer causal relations from examples
   *
   * @param observations - مصفوفة من الملاحظات، كل ملاحظة هي كائن يحتوي على الأحداث التي حدثت
   *                       Array of observations, each observation is an object containing events that occurred
   * @param threshold - الحد الأدنى للثقة لإضافة علاقة (0-1)
   *                    Minimum confidence threshold to add a relation (0-1)
   */
  learnFromData(observations: Record<string, boolean>[], threshold: number = 0.5): void {
    // حساب التكرارات المشتركة
    const coOccurrences = new Map<string, Map<string, number>>();
    const eventCounts = new Map<string, number>();

    // عد التكرارات
    for (const observation of observations) {
      const events = Object.entries(observation)
        .filter(([_, occurred]) => occurred)
        .map(([event]) => event);

      // عد كل حدث
      for (const event of events) {
        eventCounts.set(event, (eventCounts.get(event) || 0) + 1);
      }

      // عد التكرارات المشتركة
      for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < events.length; j++) {
          if (i !== j) {
            const from = events[i];
            const to = events[j];

            if (!coOccurrences.has(from)) {
              coOccurrences.set(from, new Map());
            }
            const toMap = coOccurrences.get(from)!;
            toMap.set(to, (toMap.get(to) || 0) + 1);
          }
        }
      }
    }

    // حساب الاحتمالات الشرطية P(B|A) = P(A,B) / P(A)
    for (const [from, toMap] of coOccurrences.entries()) {
      const fromCount = eventCounts.get(from) || 0;

      for (const [to, coCount] of toMap.entries()) {
        const probability = coCount / fromCount;

        // إضافة العلاقة إذا كانت فوق الحد الأدنى
        if (probability >= threshold) {
          this.addRelation(from, to, RelationType.CAUSES, probability);
        }
      }
    }
  }

  /**
   * حساب الارتباط بين حدثين
   * Calculate correlation between two events
   */
  calculateCorrelation(event1: string, event2: string, observations: Record<string, boolean>[]): number {
    let both = 0;
    let event1Only = 0;
    let event2Only = 0;
    let neither = 0;

    for (const observation of observations) {
      const has1 = observation[event1] || false;
      const has2 = observation[event2] || false;

      if (has1 && has2) both++;
      else if (has1) event1Only++;
      else if (has2) event2Only++;
      else neither++;
    }

    // حساب معامل فاي (Phi coefficient)
    const numerator = (both * neither) - (event1Only * event2Only);
    const denominator = Math.sqrt(
      (both + event1Only) * (both + event2Only) *
      (event2Only + neither) * (event1Only + neither)
    );

    return denominator === 0 ? 0 : numerator / denominator;
  }

  /**
   * تحليل الأهمية النسبية للعقد
   * Analyze relative importance of nodes
   */
  analyzeNodeImportance(): Map<string, number> {
    const importance = new Map<string, number>();
    const nodes = this.getAllNodes();

    for (const node of nodes) {
      let score = 0;

      // عدد العلاقات الصادرة (تأثير على الآخرين)
      const outgoing = this.getRelationsFrom(node);
      score += outgoing.length * 2;

      // عدد العلاقات الواردة (تأثر بالآخرين)
      const incoming = this.getRelationsTo(node);
      score += incoming.length;

      // مجموع الأوزان
      const totalWeight = [...outgoing, ...incoming].reduce((sum, r) => sum + r.weight, 0);
      score += totalWeight;

      importance.set(node, score);
    }

    return importance;
  }

  /**
   * إيجاد العقد الأكثر تأثيراً
   * Find most influential nodes
   */
  findMostInfluentialNodes(limit: number = 5): string[] {
    const importance = this.analyzeNodeImportance();

    return Array.from(importance.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([node]) => node);
  }

  /**
   * حساب المسافة بين عقدتين (عدد الخطوات)
   * Calculate distance between two nodes (number of steps)
   */
  calculateDistance(from: string, to: string): number {
    const shortestPath = this.findShortestPath(from, to);
    return shortestPath ? shortestPath.nodes.length - 1 : -1;
  }

  /**
   * إيجاد جميع العقد القريبة من عقدة معينة
   * Find all nodes near a given node
   */
  findNearbyNodes(node: string, maxDistance: number = 2): Map<string, number> {
    const nearby = new Map<string, number>();
    const visited = new Set<string>();
    const queue: [string, number][] = [[node, 0]];

    while (queue.length > 0) {
      const [current, distance] = queue.shift()!;

      if (visited.has(current) || distance > maxDistance) continue;
      visited.add(current);

      if (current !== node) {
        nearby.set(current, distance);
      }

      const relations = this.getRelationsFrom(current);
      for (const relation of relations) {
        if (!visited.has(relation.to)) {
          queue.push([relation.to, distance + 1]);
        }
      }
    }

    return nearby;
  }
}

