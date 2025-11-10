/**
 * اختبارات نظام المعادلات اللغوية - Linguistic Equations System Tests
 */

import {
  EquationEngine,
  StructureAnalyzer,
  EquationGenerator,
  LinguisticEquationsManager
} from '../../src/baserah/equations';

describe('نظام المعادلات اللغوية - Linguistic Equations System', () => {
  
  // ============================================
  // محرك المعادلات - Equation Engine
  // ============================================
  
  describe('محرك المعادلات - Equation Engine', () => {
    let engine: EquationEngine;
    
    beforeEach(() => {
      engine = new EquationEngine();
    });
    
    test('إنشاء معادلة', () => {
      const equation = engine.createEquation('أحمد ضرب الكرة', 0.9);
      
      expect(equation.sentence).toBe('أحمد ضرب الكرة');
      expect(equation.confidence).toBe(0.9);
      expect(equation.elements.size).toBe(0);
      expect(equation.properties.size).toBe(0);
    });
    
    test('إضافة عنصر', () => {
      const equation = engine.createEquation('أحمد ضرب الكرة');
      
      const added = engine.addElement(equation.id, 'أحمد', 'thing');
      
      expect(added).toBe(true);
      expect(equation.elements.get('أحمد')).toBe('thing');
    });
    
    test('إضافة خاصية', () => {
      const equation = engine.createEquation('أحمد ضرب الكرة');
      
      const property = engine.addProperty(equation.id, 'طاقة', 'biological', 80);
      
      expect(property).not.toBeNull();
      expect(property!.name).toBe('طاقة');
      expect(property!.value).toBe(80);
      expect(property!.domain).toBe('biological');
    });
    
    test('تطبيق تغيير - زيادة', () => {
      const equation = engine.createEquation('أحمد أكل خبز');
      engine.addProperty(equation.id, 'طاقة', 'biological', 50);
      
      const property = engine.applyChange(equation.id, 'طاقة', 'increase', 20);
      
      expect(property).not.toBeNull();
      expect(property!.value).toBe(70);
      expect(equation.changes).toHaveLength(1);
      expect(equation.changes[0].changeType).toBe('increase');
    });
    
    test('تطبيق تغيير - نقصان', () => {
      const equation = engine.createEquation('أحمد جرى');
      engine.addProperty(equation.id, 'طاقة', 'biological', 80);
      
      const property = engine.applyChange(equation.id, 'طاقة', 'decrease', 15);
      
      expect(property).not.toBeNull();
      expect(property!.value).toBe(65);
    });
    
    test('تطبيق تغيير - إنشاء', () => {
      const equation = engine.createEquation('أحمد كتب رسالة');
      engine.addProperty(equation.id, 'كتلة', 'physical', 0, 0, 100);
      
      const property = engine.applyChange(equation.id, 'كتلة', 'create', 0);
      
      expect(property).not.toBeNull();
      expect(property!.value).toBe(100);
    });
    
    test('تطبيق تغيير - إنهاء', () => {
      const equation = engine.createEquation('أحمد أكل تفاحة');
      engine.addProperty(equation.id, 'كتلة', 'physical', 50, 0, 100);
      
      const property = engine.applyChange(equation.id, 'كتلة', 'destroy', 0);
      
      expect(property).not.toBeNull();
      expect(property!.value).toBe(0);
    });
    
    test('إيجاد المعادلات بالجملة', () => {
      engine.createEquation('أحمد ضرب الكرة');
      engine.createEquation('محمد قرأ كتاب');
      
      const results = engine.findEquationsBySentence('أحمد');
      
      expect(results).toHaveLength(1);
      expect(results[0].sentence).toBe('أحمد ضرب الكرة');
    });
    
    test('إيجاد المعادلات بالعنصر', () => {
      const eq1 = engine.createEquation('أحمد ضرب الكرة');
      const eq2 = engine.createEquation('أحمد قرأ كتاب');
      engine.addElement(eq1.id, 'أحمد', 'thing');
      engine.addElement(eq2.id, 'أحمد', 'thing');
      
      const results = engine.findEquationsByElement('أحمد');
      
      expect(results).toHaveLength(2);
    });
    
    test('الحصول على الإحصائيات', () => {
      const eq = engine.createEquation('أحمد ضرب الكرة');
      engine.addElement(eq.id, 'أحمد', 'thing');
      engine.addElement(eq.id, 'ضرب', 'event');
      engine.addProperty(eq.id, 'طاقة', 'biological', 50);
      engine.applyChange(eq.id, 'طاقة', 'decrease', 10);
      
      const stats = engine.getStatistics();
      
      expect(stats.totalEquations).toBe(1);
      expect(stats.totalElements).toBe(2);
      expect(stats.totalProperties).toBe(1);
      expect(stats.totalChanges).toBe(1);
    });
    
    test('مسح البيانات', () => {
      engine.createEquation('أحمد ضرب الكرة');
      engine.clear();
      
      const stats = engine.getStatistics();
      expect(stats.totalEquations).toBe(0);
    });
  });
  
  // ============================================
  // محلل التراكيب - Structure Analyzer
  // ============================================
  
  describe('محلل التراكيب - Structure Analyzer', () => {
    let analyzer: StructureAnalyzer;
    
    beforeEach(() => {
      analyzer = new StructureAnalyzer();
    });
    
    test('تحليل جملة بسيطة', () => {
      const structure = analyzer.analyzeSentence('أحمد ضرب الكرة');
      
      expect(structure.sentence).toBe('أحمد ضرب الكرة');
      expect(structure.subject).toBe('أحمد');
      expect(structure.verb).toBe('ضرب');
      expect(structure.object).toBe('الكرة');
      expect(structure.type).toBe('verbal');
    });
    
    test('تحليل جملة فعلية', () => {
      const structure = analyzer.analyzeSentence('محمد قرأ كتاب');
      
      expect(structure.type).toBe('verbal');
      expect(structure.subject).toBe('محمد');
      expect(structure.verb).toBe('قرأ');
    });
    
    test('استخراج العناصر النحوية', () => {
      const structure = analyzer.analyzeSentence('زيد أكل تفاحة');
      
      expect(structure.elements.length).toBeGreaterThan(0);
      expect(structure.elements.some((e: any) => e.role === 'subject')).toBe(true);
      expect(structure.elements.some((e: any) => e.role === 'verb')).toBe(true);
    });
    
    test('إيجاد التراكيب بالفاعل', () => {
      analyzer.analyzeSentence('أحمد ضرب الكرة');
      analyzer.analyzeSentence('أحمد قرأ كتاب');
      analyzer.analyzeSentence('محمد نام');
      
      const results = analyzer.findStructuresBySubject('أحمد');
      
      expect(results).toHaveLength(2);
    });
    
    test('إيجاد التراكيب بالفعل', () => {
      analyzer.analyzeSentence('أحمد ضرب الكرة');
      analyzer.analyzeSentence('محمد ضرب الكرة');
      
      const results = analyzer.findStructuresByVerb('ضرب');
      
      expect(results).toHaveLength(2);
    });
    
    test('إيجاد التراكيب بالنوع', () => {
      analyzer.analyzeSentence('أحمد ضرب الكرة');
      analyzer.analyzeSentence('محمد قرأ كتاب');
      
      const results = analyzer.findStructuresByType('verbal');
      
      expect(results.length).toBeGreaterThan(0);
    });
    
    test('الحصول على الإحصائيات', () => {
      analyzer.analyzeSentence('أحمد ضرب الكرة');
      analyzer.analyzeSentence('محمد قرأ كتاب');
      
      const stats = analyzer.getStatistics();
      
      expect(stats.totalStructures).toBe(2);
      expect(stats.typeDistribution.verbal).toBeGreaterThan(0);
    });
    
    test('مسح البيانات', () => {
      analyzer.analyzeSentence('أحمد ضرب الكرة');
      analyzer.clear();
      
      const stats = analyzer.getStatistics();
      expect(stats.totalStructures).toBe(0);
    });
  });
  
  // ============================================
  // مولد المعادلات - Equation Generator
  // ============================================
  
  describe('مولد المعادلات - Equation Generator', () => {
    let generator: EquationGenerator;
    
    beforeEach(() => {
      generator = new EquationGenerator();
    });
    
    test('توليد معادلة من جملة', () => {
      const result = generator.generateFromSentence('أحمد ضرب الكرة');
      
      expect(result.equation.sentence).toBe('أحمد ضرب الكرة');
      expect(result.structure.subject).toBe('أحمد');
      expect(result.structure.verb).toBe('ضرب');
      expect(result.appliedEffects).toBeGreaterThan(0);
    });
    
    test('تطبيق تأثيرات الفعل - أكل', () => {
      const result = generator.generateFromSentence('زيد أكل خبز');
      
      expect(result.appliedEffects).toBeGreaterThan(0);
      expect(result.equation.changes.length).toBeGreaterThan(0);
    });
    
    test('تطبيق تأثيرات الفعل - قرأ', () => {
      const result = generator.generateFromSentence('محمد قرأ كتاب');
      
      expect(result.appliedEffects).toBeGreaterThan(0);
    });
    
    test('تطبيق تأثيرات الفعل - نام', () => {
      const result = generator.generateFromSentence('أحمد نام');
      
      expect(result.appliedEffects).toBeGreaterThan(0);
    });
    
    test('إضافة تأثير فعل جديد', () => {
      generator.addVerbEffect({
        verb: 'سبح',
        subjectEffects: [
          { property: 'طاقة', change: 'decrease', amount: 20, domain: 'biological' }
        ],
        objectEffects: []
      });
      
      const effect = generator.getVerbEffect('سبح');
      
      expect(effect).not.toBeNull();
      expect(effect!.verb).toBe('سبح');
    });
    
    test('الحصول على جميع تأثيرات الأفعال', () => {
      const effects = generator.getAllVerbEffects();
      
      expect(effects.length).toBeGreaterThan(0);
    });
    
    test('الحصول على الإحصائيات', () => {
      const stats = generator.getStatistics();
      
      expect(stats.totalVerbEffects).toBeGreaterThan(0);
      expect(stats.averageSubjectEffects).toBeGreaterThan(0);
    });
    
    test('مسح البيانات', () => {
      generator.generateFromSentence('أحمد ضرب الكرة');
      generator.clear();
      
      const engineStats = generator.getEquationEngine().getStatistics();
      expect(engineStats.totalEquations).toBe(0);
    });
  });
  
  // ============================================
  // مدير المعادلات اللغوية - Linguistic Equations Manager
  // ============================================
  
  describe('مدير المعادلات اللغوية - Linguistic Equations Manager', () => {
    let manager: LinguisticEquationsManager;
    
    beforeEach(() => {
      manager = new LinguisticEquationsManager();
    });
    
    test('معالجة جملة', () => {
      const result = manager.processSentence('أحمد ضرب الكرة');
      
      expect(result.sentence).toBe('أحمد ضرب الكرة');
      expect(result.equation).toBeDefined();
      expect(result.structure).toBeDefined();
      expect(result.worldChanges.length).toBeGreaterThan(0);
    });
    
    test('تحديث حالة العالم', () => {
      manager.processSentence('أحمد أكل خبز');
      
      const ahmedState = manager.getThingState('أحمد');
      
      expect(ahmedState).not.toBeNull();
      expect(ahmedState!.size).toBeGreaterThan(0);
    });
    
    test('معالجة قصة', () => {
      const story = [
        'أحمد استيقظ',
        'أحمد أكل خبز',
        'أحمد قرأ كتاب'
      ];
      
      const results = manager.processStory(story);
      
      expect(results).toHaveLength(3);
    });
    
    test('الحصول على التاريخ', () => {
      manager.processSentence('أحمد ضرب الكرة');
      manager.processSentence('محمد قرأ كتاب');
      
      const history = manager.getHistory();
      
      expect(history).toHaveLength(2);
    });
    
    test('إيجاد التاريخ بالشيء', () => {
      manager.processSentence('أحمد ضرب الكرة');
      manager.processSentence('أحمد قرأ كتاب');
      manager.processSentence('محمد نام');
      
      const ahmedHistory = manager.findHistoryByThing('أحمد');
      
      expect(ahmedHistory).toHaveLength(2);
    });
    
    test('إيجاد التاريخ بالفعل', () => {
      manager.processSentence('أحمد قرأ كتاب');
      manager.processSentence('محمد قرأ كتاب');
      
      const readHistory = manager.findHistoryByVerb('قرأ');
      
      expect(readHistory).toHaveLength(2);
    });
    
    test('تحليل جملة', () => {
      const structure = manager.analyzeSentence('أحمد ضرب الكرة');
      
      expect(structure.subject).toBe('أحمد');
      expect(structure.verb).toBe('ضرب');
    });
    
    test('إضافة تأثير فعل', () => {
      manager.addVerbEffect({
        verb: 'طار',
        subjectEffects: [
          { property: 'موقع', change: 'move', amount: 100, domain: 'spatial' }
        ],
        objectEffects: []
      });
      
      const effect = manager.getVerbEffect('طار');
      
      expect(effect).not.toBeNull();
    });
    
    test('الوصول إلى المكونات الفرعية', () => {
      const engine = manager.getEquationEngine();
      const analyzer = manager.getStructureAnalyzer();
      const generator = manager.getEquationGenerator();
      
      expect(engine).toBeInstanceOf(EquationEngine);
      expect(analyzer).toBeInstanceOf(StructureAnalyzer);
      expect(generator).toBeInstanceOf(EquationGenerator);
    });
    
    test('الحصول على الإحصائيات الشاملة', () => {
      manager.processSentence('أحمد ضرب الكرة');
      manager.processSentence('محمد قرأ كتاب');
      
      const stats = manager.getStatistics();
      
      expect(stats.equations.totalEquations).toBe(2);
      expect(stats.structures.totalStructures).toBe(2);
      expect(stats.history.totalProcessed).toBe(2);
    });
    
    test('مسح التاريخ', () => {
      manager.processSentence('أحمد ضرب الكرة');
      manager.clearHistory();
      
      const history = manager.getHistory();
      expect(history).toHaveLength(0);
    });
    
    test('مسح حالة العالم', () => {
      manager.processSentence('أحمد ضرب الكرة');
      manager.clearWorld();
      
      const worldState = manager.getWorldState();
      expect(worldState.things.size).toBe(0);
    });
    
    test('مسح جميع البيانات', () => {
      manager.processSentence('أحمد ضرب الكرة');
      manager.clearAll();
      
      const stats = manager.getStatistics();
      expect(stats.equations.totalEquations).toBe(0);
      expect(stats.history.totalProcessed).toBe(0);
    });
  });
});

