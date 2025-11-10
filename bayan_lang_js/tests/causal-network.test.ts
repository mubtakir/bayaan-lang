/**
 * اختبارات الشبكات السببية
 * Causal Network Tests
 */

import {
  CausalEngine,
  RelationType,
  TemporalType,
  ImpactLevel
} from '../src/logic/causalEngine';

describe('Causal Network Engine - محرك الشبكات السببية', () => {
  let engine: CausalEngine;

  beforeEach(() => {
    engine = new CausalEngine();
  });

  describe('Basic Causal Relations - العلاقات السببية الأساسية', () => {
    it('should add and retrieve causal relations', () => {
      // إضافة علاقة سببية
      engine.addRelation('اعتداء', 'غضب', RelationType.CAUSES, 0.9);
      
      const relations = engine.getRelationsFrom('اعتداء');
      
      expect(relations.length).toBe(1);
      expect(relations[0].from).toBe('اعتداء');
      expect(relations[0].to).toBe('غضب');
      expect(relations[0].type).toBe(RelationType.CAUSES);
      expect(relations[0].weight).toBe(0.9);
    });

    it('should support multiple relation types - English', () => {
      engine.addRelation('assault', 'anger', RelationType.CAUSES, 0.9);
      engine.addRelation('patience', 'anger', RelationType.PREVENTS, 0.8);
      engine.addRelation('education', 'awareness', RelationType.ENHANCES, 0.85);
      engine.addRelation('ignorance', 'awareness', RelationType.WEAKENS, 0.7);
      
      const causesRelations = engine.getRelationsFrom('assault');
      const preventsRelations = engine.getRelationsFrom('patience');
      const enhancesRelations = engine.getRelationsFrom('education');
      const weakensRelations = engine.getRelationsFrom('ignorance');
      
      expect(causesRelations[0].type).toBe(RelationType.CAUSES);
      expect(preventsRelations[0].type).toBe(RelationType.PREVENTS);
      expect(enhancesRelations[0].type).toBe(RelationType.ENHANCES);
      expect(weakensRelations[0].type).toBe(RelationType.WEAKENS);
    });

    it('should validate weight range', () => {
      expect(() => {
        engine.addRelation('test1', 'test2', RelationType.CAUSES, 1.5);
      }).toThrow();
      
      expect(() => {
        engine.addRelation('test1', 'test2', RelationType.CAUSES, -0.5);
      }).toThrow();
    });
  });

  describe('Path Finding - إيجاد المسارات', () => {
    beforeEach(() => {
      // بناء شبكة سببية: اعتداء → غضب → تصرف_خاطئ → كوارث → تدمير_البلد
      engine.addRelation('اعتداء', 'غضب', RelationType.CAUSES, 0.9);
      engine.addRelation('غضب', 'تصرف_خاطئ', RelationType.CAUSES, 0.7);
      engine.addRelation('تصرف_خاطئ', 'كوارث', RelationType.CAUSES, 0.6);
      engine.addRelation('كوارث', 'تدمير_البلد', RelationType.CAUSES, 0.8);
    });

    it('should find all paths between two nodes', () => {
      const paths = engine.findAllPaths('اعتداء', 'تدمير_البلد');
      
      expect(paths.length).toBeGreaterThan(0);
      expect(paths[0].nodes[0]).toBe('اعتداء');
      expect(paths[0].nodes[paths[0].nodes.length - 1]).toBe('تدمير_البلد');
    });

    it('should calculate correct path weight', () => {
      const paths = engine.findAllPaths('اعتداء', 'تدمير_البلد');
      
      // الوزن الكلي = 0.9 * 0.7 * 0.6 * 0.8 = 0.3024
      expect(paths[0].totalWeight).toBeCloseTo(0.3024, 4);
    });

    it('should find shortest path', () => {
      // إضافة مسار مختصر
      engine.addRelation('اعتداء', 'كوارث', RelationType.CAUSES, 0.5);
      
      const shortestPath = engine.findShortestPath('اعتداء', 'تدمير_البلد');
      
      expect(shortestPath).not.toBeNull();
      expect(shortestPath!.length).toBe(2); // اعتداء → كوارث → تدمير_البلد
    });

    it('should find strongest path', () => {
      // إضافة مسار أقوى
      engine.addRelation('اعتداء', 'كوارث', RelationType.CAUSES, 0.95);
      
      const strongestPath = engine.findStrongestPath('اعتداء', 'تدمير_البلد');
      
      expect(strongestPath).not.toBeNull();
      // المسار الأقوى: اعتداء → كوارث → تدمير_البلد (0.95 * 0.8 = 0.76)
      expect(strongestPath!.totalWeight).toBeGreaterThan(0.7);
    });
  });

  describe('Root Cause Analysis - تحليل الأسباب الجذرية', () => {
    beforeEach(() => {
      // بناء شبكة مع أسباب جذرية متعددة
      engine.addRelation('اعتداء', 'غضب', RelationType.CAUSES, 0.9);
      engine.addRelation('غضب', 'كوارث', RelationType.CAUSES, 0.7);
      engine.addRelation('جهل', 'كوارث', RelationType.CAUSES, 0.8);
      engine.addRelation('فقر', 'جهل', RelationType.CAUSES, 0.75);
    });

    it('should find root causes for a result', () => {
      const rootCauses = engine.findRootCauses('كوارث');
      
      expect(rootCauses.length).toBeGreaterThan(0);
      expect(rootCauses).toContain('اعتداء');
      expect(rootCauses).toContain('فقر');
    });

    it('should find final results for a cause', () => {
      const finalResults = engine.findFinalResults('اعتداء');
      
      expect(finalResults.length).toBeGreaterThan(0);
      expect(finalResults).toContain('كوارث');
    });
  });

  describe('Impact Strength - قوة التأثير', () => {
    beforeEach(() => {
      // بناء شبكة مع مسارات متعددة
      engine.addRelation('اعتداء', 'غضب', RelationType.CAUSES, 0.9);
      engine.addRelation('غضب', 'كوارث', RelationType.CAUSES, 0.7);
      engine.addRelation('اعتداء', 'كوارث', RelationType.CAUSES, 0.6);
    });

    it('should calculate impact strength between nodes', () => {
      const strength = engine.calculateImpactStrength('اعتداء', 'كوارث');
      
      expect(strength).toBeGreaterThan(0);
      expect(strength).toBeLessThanOrEqual(1);
    });
  });

  describe('Temporal and Multi-Level Networks - الشبكات الزمنية ومتعددة المستويات', () => {
    it('should support temporal dimension', () => {
      engine.addRelation(
        'اعتداء',
        'غضب',
        RelationType.CAUSES,
        0.9,
        TemporalType.IMMEDIATE
      );
      
      const relations = engine.getRelationsFrom('اعتداء');
      
      expect(relations[0].temporal).toBe(TemporalType.IMMEDIATE);
    });

    it('should support multi-level impact', () => {
      engine.addRelation(
        'اعتداء',
        'غضب',
        RelationType.CAUSES,
        0.9,
        TemporalType.IMMEDIATE,
        ImpactLevel.INDIVIDUAL,
        ImpactLevel.INDIVIDUAL
      );
      
      engine.addRelation(
        'كوارث',
        'تدمير_البلد',
        RelationType.CAUSES,
        0.8,
        TemporalType.LONG_TERM,
        ImpactLevel.SOCIETAL,
        ImpactLevel.NATIONAL
      );
      
      const individualRelations = engine.getRelationsFrom('اعتداء');
      const societalRelations = engine.getRelationsFrom('كوارث');
      
      expect(individualRelations[0].fromLevel).toBe(ImpactLevel.INDIVIDUAL);
      expect(individualRelations[0].toLevel).toBe(ImpactLevel.INDIVIDUAL);
      expect(societalRelations[0].fromLevel).toBe(ImpactLevel.SOCIETAL);
      expect(societalRelations[0].toLevel).toBe(ImpactLevel.NATIONAL);
    });
  });

  describe('Complex Network Analysis - تحليل الشبكات المعقدة', () => {
    beforeEach(() => {
      // بناء شبكة معقدة مع علاقات متعددة الأنواع
      engine.addRelation('اعتداء', 'غضب', RelationType.CAUSES, 0.9);
      engine.addRelation('صبر', 'غضب', RelationType.PREVENTS, 0.8);
      engine.addRelation('تربية_صالحة', 'صبر', RelationType.ENHANCES, 0.85);
      engine.addRelation('جهل', 'وعي', RelationType.WEAKENS, 0.7);
      engine.addRelation('تعليم', 'وعي', RelationType.ENHANCES, 0.9);
    });

    it('should handle mixed relation types', () => {
      const causesRelations = engine.getRelationsFrom('اعتداء');
      const preventsRelations = engine.getRelationsFrom('صبر');
      const enhancesRelations = engine.getRelationsFrom('تربية_صالحة');
      const weakensRelations = engine.getRelationsFrom('جهل');
      
      expect(causesRelations[0].type).toBe(RelationType.CAUSES);
      expect(preventsRelations[0].type).toBe(RelationType.PREVENTS);
      expect(enhancesRelations[0].type).toBe(RelationType.ENHANCES);
      expect(weakensRelations[0].type).toBe(RelationType.WEAKENS);
    });

    it('should find all relations to a specific node', () => {
      const relationsToAnger = engine.getRelationsTo('غضب');
      
      expect(relationsToAnger.length).toBe(2);
      
      const types = relationsToAnger.map(r => r.type);
      expect(types).toContain(RelationType.CAUSES);
      expect(types).toContain(RelationType.PREVENTS);
    });
  });

  describe('Bilingual Support - الدعم الثنائي اللغة', () => {
    it('should work with Arabic keywords', () => {
      engine.addRelation('اعتداء', 'غضب', 'يسبب' as any, 0.9);
      engine.addRelation('صبر', 'غضب', 'يمنع' as any, 0.8);
      
      const relations1 = engine.getRelationsFrom('اعتداء');
      const relations2 = engine.getRelationsFrom('صبر');
      
      expect(relations1.length).toBe(1);
      expect(relations2.length).toBe(1);
    });

    it('should work with English keywords', () => {
      engine.addRelation('assault', 'anger', 'causes', 0.9);
      engine.addRelation('patience', 'anger', 'prevents', 0.8);
      
      const relations1 = engine.getRelationsFrom('assault');
      const relations2 = engine.getRelationsFrom('patience');
      
      expect(relations1.length).toBe(1);
      expect(relations2.length).toBe(1);
    });
  });
});

describe('Advanced Causal Network Features - الميزات المتقدمة للشبكات السببية', () => {
  let engine: CausalEngine;

  beforeEach(() => {
    engine = new CausalEngine();

    // بناء شبكة معقدة للاختبار
    engine.addRelation('اعتداء', 'غضب', RelationType.CAUSES, 0.9);
    engine.addRelation('غضب', 'تصرف_خاطئ', RelationType.CAUSES, 0.7);
    engine.addRelation('تصرف_خاطئ', 'كوارث', RelationType.CAUSES, 0.6);
    engine.addRelation('كوارث', 'تدمير_البلد', RelationType.CAUSES, 0.8);
    engine.addRelation('فقر', 'جهل', RelationType.CAUSES, 0.75);
    engine.addRelation('جهل', 'كوارث', RelationType.CAUSES, 0.8);
  });

  describe('Cycle Detection - اكتشاف الحلقات', () => {
    it('should detect no cycles in acyclic network', () => {
      const cycles = engine.detectCycles();
      expect(cycles.length).toBe(0);
    });

    it('should detect cycles in cyclic network', () => {
      // إضافة حلقة
      engine.addRelation('تدمير_البلد', 'فقر', RelationType.CAUSES, 0.7);
      engine.addRelation('فقر', 'اعتداء', RelationType.CAUSES, 0.6);

      const cycles = engine.detectCycles();
      expect(cycles.length).toBeGreaterThan(0);
    });
  });

  describe('Intervention Points - نقاط التدخل', () => {
    it('should find intervention points', () => {
      const interventionPoints = engine.findInterventionPoints('اعتداء', 'تدمير_البلد');

      expect(interventionPoints.length).toBeGreaterThan(0);
      expect(interventionPoints).toContain('غضب');
      expect(interventionPoints).toContain('تصرف_خاطئ');
      expect(interventionPoints).toContain('كوارث');
    });

    it('should prioritize nodes that appear in more paths', () => {
      const interventionPoints = engine.findInterventionPoints('اعتداء', 'تدمير_البلد');

      // "كوارث" يجب أن تكون نقطة تدخل مهمة لأنها في مسارين
      expect(interventionPoints).toContain('كوارث');
    });
  });

  describe('What-If Simulation - محاكاة ماذا لو', () => {
    it('should simulate removing a node', () => {
      const newEngine = engine.whatIf('غضب');

      // يجب ألا يكون هناك مسار من "اعتداء" إلى "تدمير_البلد" بعد إزالة "غضب"
      const paths = newEngine.findAllPaths('اعتداء', 'تدمير_البلد');
      expect(paths.length).toBe(0);
    });

    it('should simulate removing a relation', () => {
      const newEngine = engine.whatIfRemoveRelation('غضب', 'تصرف_خاطئ');

      // يجب ألا يكون هناك مسار من "اعتداء" إلى "تدمير_البلد" بعد إزالة العلاقة
      const paths = newEngine.findAllPaths('اعتداء', 'تدمير_البلد');
      expect(paths.length).toBe(0);
    });
  });

  describe('Export Formats - تنسيقات التصدير', () => {
    it('should export to JSON', () => {
      const json = engine.toJSON();

      expect(json.nodes).toBeDefined();
      expect(json.relations).toBeDefined();
      expect(json.nodes.length).toBeGreaterThan(0);
      expect(json.relations.length).toBeGreaterThan(0);
    });

    it('should export to DOT format', () => {
      const dot = engine.toDOT();

      expect(dot).toContain('digraph CausalNetwork');
      expect(dot).toContain('اعتداء');
      expect(dot).toContain('غضب');
    });

    it('should export to Mermaid format', () => {
      const mermaid = engine.toMermaid();

      expect(mermaid).toContain('graph LR');
      expect(mermaid).toContain('اعتداء');
      expect(mermaid).toContain('غضب');
    });
  });

  describe('Learning from Data - التعلم من البيانات', () => {
    it('should learn causal relations from observations', () => {
      const newEngine = new CausalEngine();

      // ملاحظات: عندما يحدث A، يحدث B في 80% من الحالات
      const observations = [
        { 'حدث_أ': true, 'حدث_ب': true, 'حدث_ج': false },
        { 'حدث_أ': true, 'حدث_ب': true, 'حدث_ج': false },
        { 'حدث_أ': true, 'حدث_ب': true, 'حدث_ج': true },
        { 'حدث_أ': true, 'حدث_ب': false, 'حدث_ج': false },
        { 'حدث_أ': false, 'حدث_ب': false, 'حدث_ج': true },
      ];

      newEngine.learnFromData(observations, 0.5);

      const relations = newEngine.getRelationsFrom('حدث_أ');
      expect(relations.length).toBeGreaterThan(0);

      // يجب أن تكون هناك علاقة من حدث_أ إلى حدث_ب
      const relationToB = relations.find(r => r.to === 'حدث_ب');
      expect(relationToB).toBeDefined();
      expect(relationToB!.weight).toBeCloseTo(0.75, 2); // 3/4 = 0.75
    });

    it('should calculate correlation between events', () => {
      const observations = [
        { 'A': true, 'B': true },
        { 'A': true, 'B': true },
        { 'A': false, 'B': false },
        { 'A': false, 'B': false },
      ];

      const correlation = engine.calculateCorrelation('A', 'B', observations);
      expect(correlation).toBeCloseTo(1.0, 1); // ارتباط تام
    });
  });

  describe('Node Importance Analysis - تحليل أهمية العقد', () => {
    it('should analyze node importance', () => {
      const importance = engine.analyzeNodeImportance();

      expect(importance.size).toBeGreaterThan(0);

      // "كوارث" يجب أن تكون مهمة لأنها نقطة التقاء مسارين
      const disastersImportance = importance.get('كوارث');
      expect(disastersImportance).toBeDefined();
      expect(disastersImportance!).toBeGreaterThan(0);
    });

    it('should find most influential nodes', () => {
      const influential = engine.findMostInfluentialNodes(3);

      expect(influential.length).toBeLessThanOrEqual(3);
      expect(influential.length).toBeGreaterThan(0);
    });
  });

  describe('Distance and Proximity - المسافة والقرب', () => {
    it('should calculate distance between nodes', () => {
      const distance = engine.calculateDistance('اعتداء', 'تدمير_البلد');

      expect(distance).toBe(4); // 4 خطوات
    });

    it('should return -1 for unreachable nodes', () => {
      const distance = engine.calculateDistance('تدمير_البلد', 'اعتداء');

      expect(distance).toBe(-1); // لا يوجد مسار
    });

    it('should find nearby nodes', () => {
      const nearby = engine.findNearbyNodes('اعتداء', 2);

      expect(nearby.size).toBeGreaterThan(0);
      expect(nearby.has('غضب')).toBe(true);
      expect(nearby.get('غضب')).toBe(1); // مسافة 1
      expect(nearby.has('تصرف_خاطئ')).toBe(true);
      expect(nearby.get('تصرف_خاطئ')).toBe(2); // مسافة 2
    });
  });
});
