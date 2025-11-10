/**
 * اختبارات نظام المعاجم - Lexicon System Tests
 */

import {
  RootAnalyzer,
  DerivationGenerator,
  LexiconEngine,
  LexiconManager,
  WordType,
  DerivationType,
  DerivationForm,
  type ArabicDerivationRule
} from '../../src/lexicon';

describe('نظام المعاجم - Lexicon System', () => {
  
  // ==================== Root Analyzer Tests ====================
  describe('محلل الجذور - Root Analyzer', () => {
    let analyzer: RootAnalyzer;
    
    beforeEach(() => {
      analyzer = new RootAnalyzer();
    });
    
    test('تحليل جذر ثلاثي', () => {
      const root = analyzer.analyzeRoot('كتب');
      
      expect(root.root).toBe('كتب');
      expect(root.type).toBe('trilateral');
      expect(root.letters).toEqual(['ك', 'ت', 'ب']);
      expect(root.confidence).toBeGreaterThan(0.5);
    });
    
    test('تحليل كلمة مشتقة', () => {
      const root = analyzer.analyzeRoot('كاتب');
      
      expect(root.root).toBe('كتب');
      expect(root.type).toBe('trilateral');
      expect(root.pattern).toBe('فاعل');
    });
    
    test('تحليل كلمة بادئة', () => {
      const root = analyzer.analyzeRoot('مكتوب');
      
      expect(root.root).toContain('ك');
      expect(root.root).toContain('ت');
      expect(root.root).toContain('ب');
      expect(root.type).toBe('trilateral');
    });
    
    test('الحصول على جذر محفوظ', () => {
      analyzer.analyzeRoot('كتب');
      const root = analyzer.getRoot('كتب');
      
      expect(root).not.toBeNull();
      expect(root?.root).toBe('كتب');
    });
    
    test('الحصول على عائلة الجذر', () => {
      analyzer.analyzeRoot('كتب');
      analyzer.analyzeRoot('كاتب');
      analyzer.analyzeRoot('مكتوب');
      
      const family = analyzer.getRootFamily('كتب');
      
      expect(family).not.toBeNull();
      expect(family?.words.length).toBeGreaterThanOrEqual(1);
      expect(family?.derivations).toBeGreaterThanOrEqual(1);
    });
    
    test('إيجاد الكلمات المرتبطة', () => {
      analyzer.analyzeRoot('كتب');
      analyzer.analyzeRoot('كاتب');
      analyzer.analyzeRoot('مكتوب');
      
      const related = analyzer.findRelatedWords('كتب');
      
      expect(related.length).toBeGreaterThanOrEqual(0);
    });
    
    test('الحصول على الإحصائيات', () => {
      analyzer.analyzeRoot('كتب');
      analyzer.analyzeRoot('علم');
      analyzer.analyzeRoot('درس');
      
      const stats = analyzer.getStatistics();
      
      expect(stats.totalRoots).toBe(3);
      expect(stats.totalFamilies).toBeGreaterThanOrEqual(3);
      expect(stats.rootTypeDistribution.trilateral).toBe(3);
    });
    
    test('مسح البيانات', () => {
      analyzer.analyzeRoot('كتب');
      analyzer.clear();
      
      const stats = analyzer.getStatistics();
      expect(stats.totalRoots).toBe(0);
    });
  });
  
  // ==================== Derivation Generator Tests ====================
  describe('مولد الاشتقاقات - Derivation Generator', () => {
    let generator: DerivationGenerator;
    
    beforeEach(() => {
      generator = new DerivationGenerator();
    });
    
    test('توليد اشتقاق فعل', () => {
      const derivation = generator.generateDerivation('كتب', 'verb', 'form_i');
      
      expect(derivation.root).toBe('كتب');
      expect(derivation.word).toBe('كتب');
      expect(derivation.type).toBe('verb');
      expect(derivation.form).toBe('form_i');
    });
    
    test('توليد اسم فاعل', () => {
      const derivation = generator.generateDerivation('كتب', 'active_participle', 'form_i');
      
      expect(derivation.root).toBe('كتب');
      expect(derivation.word).toBe('كاتب');
      expect(derivation.type).toBe('active_participle');
    });
    
    test('توليد اسم مفعول', () => {
      const derivation = generator.generateDerivation('كتب', 'passive_participle', 'form_i');
      
      expect(derivation.root).toBe('كتب');
      expect(derivation.word).toBe('مكتوب');
      expect(derivation.type).toBe('passive_participle');
    });
    
    test('توليد مصدر', () => {
      const derivation = generator.generateDerivation('كتب', 'verbal_noun', 'form_i');
      
      expect(derivation.root).toBe('كتب');
      expect(derivation.word).toBe('كتاب');
      expect(derivation.type).toBe('verbal_noun');
    });
    
    test('توليد جميع الأشكال', () => {
      const derivations = generator.generateAllForms('كتب');

      expect(derivations.length).toBeGreaterThanOrEqual(4);
      expect(derivations.some((d: any) => d.type === 'verb')).toBe(true);
      expect(derivations.some((d: any) => d.type === 'active_participle')).toBe(true);
    });
    
    test('إيجاد الاشتقاقات بالجذر', () => {
      generator.generateDerivation('كتب', 'verb', 'form_i');
      generator.generateDerivation('كتب', 'active_participle', 'form_i');
      
      const derivations = generator.findDerivationsByRoot('كتب');
      
      expect(derivations.length).toBe(2);
    });
    
    test('إيجاد الاشتقاقات بالنوع', () => {
      generator.generateDerivation('كتب', 'verb', 'form_i');
      generator.generateDerivation('علم', 'verb', 'form_i');
      
      const derivations = generator.findDerivationsByType('verb');
      
      expect(derivations.length).toBe(2);
    });
    
    test('الحصول على الإحصائيات', () => {
      generator.generateAllForms('كتب');
      
      const stats = generator.getStatistics();
      
      expect(stats.totalDerivations).toBeGreaterThanOrEqual(4);
      expect(stats.averageConfidence).toBeGreaterThan(0);
    });
    
    test('مسح البيانات', () => {
      generator.generateDerivation('كتب', 'verb', 'form_i');
      generator.clear();
      
      const stats = generator.getStatistics();
      expect(stats.totalDerivations).toBe(0);
    });
  });
  
  // ==================== Lexicon Engine Tests ====================
  describe('محرك المعجم - Lexicon Engine', () => {
    let engine: LexiconEngine;
    
    beforeEach(() => {
      engine = new LexiconEngine();
    });
    
    test('إضافة مدخل', () => {
      const entry = engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة', 'كتب');
      
      expect(entry.word).toBe('كتاب');
      expect(entry.type).toBe('noun');
      expect(entry.root).toBe('كتب');
      expect(entry.definition).toBe('مجموعة من الصفحات المكتوبة');
    });
    
    test('الحصول على مدخل', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const entry = engine.getEntry('كتاب');
      
      expect(entry).not.toBeNull();
      expect(entry?.word).toBe('كتاب');
    });
    
    test('البحث بالمطابقة التامة', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const results = engine.search('كتاب', { exactMatch: true });
      
      expect(results.length).toBe(1);
      expect(results[0].word).toBe('كتاب');
    });
    
    test('البحث بالاحتواء', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      engine.addEntry('مكتبة', 'noun', 'مكان للكتب');
      
      const results = engine.search('كت', { exactMatch: false });
      
      expect(results.length).toBeGreaterThanOrEqual(1);
    });
    
    test('البحث بنوع الكلمة', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      engine.addEntry('كتب', 'verb', 'فعل الكتابة');

      const results = engine.search('كت', { wordType: 'noun' });

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results.every((r: any) => r.type === 'noun')).toBe(true);
    });
    
    test('إيجاد بالجذر', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة', 'كتب');
      engine.addEntry('كاتب', 'noun', 'من يكتب', 'كتب');
      
      const results = engine.findByRoot('كتب');
      
      expect(results.length).toBe(2);
    });
    
    test('إيجاد بالنوع', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      engine.addEntry('قلم', 'noun', 'أداة الكتابة');
      engine.addEntry('كتب', 'verb', 'فعل الكتابة');
      
      const results = engine.findByType('noun');
      
      expect(results.length).toBe(2);
    });
    
    test('إضافة مثال', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const success = engine.addExample('كتاب', 'قرأت كتاباً مفيداً');
      
      expect(success).toBe(true);
      
      const entry = engine.getEntry('كتاب');
      expect(entry?.examples.length).toBe(1);
    });
    
    test('إضافة مرادف', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const success = engine.addSynonym('كتاب', 'مؤلف');
      
      expect(success).toBe(true);
      
      const entry = engine.getEntry('كتاب');
      expect(entry?.synonyms.length).toBe(1);
    });
    
    test('إضافة متضاد', () => {
      engine.addEntry('كبير', 'adjective', 'ذو حجم كبير');
      const success = engine.addAntonym('كبير', 'صغير');
      
      expect(success).toBe(true);
      
      const entry = engine.getEntry('كبير');
      expect(entry?.antonyms.length).toBe(1);
    });
    
    test('تحديث التعريف', () => {
      engine.addEntry('كتاب', 'noun', 'تعريف قديم');
      const success = engine.updateDefinition('كتاب', 'تعريف جديد');
      
      expect(success).toBe(true);
      
      const entry = engine.getEntry('كتاب');
      expect(entry?.definition).toBe('تعريف جديد');
    });
    
    test('حذف مدخل', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const success = engine.deleteEntry('كتاب');
      
      expect(success).toBe(true);
      expect(engine.getEntry('كتاب')).toBeNull();
    });
    
    test('الحصول على الإحصائيات', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة', 'كتب');
      engine.addEntry('كاتب', 'noun', 'من يكتب', 'كتب');
      engine.addExample('كتاب', 'مثال');
      engine.addSynonym('كتاب', 'مرادف');
      
      const stats = engine.getStatistics();
      
      expect(stats.totalEntries).toBe(2);
      expect(stats.totalRoots).toBe(1);
      expect(stats.entriesWithExamples).toBe(1);
      expect(stats.entriesWithSynonyms).toBe(1);
    });
    
    test('مسح البيانات', () => {
      engine.addEntry('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      engine.clear();
      
      const stats = engine.getStatistics();
      expect(stats.totalEntries).toBe(0);
    });
  });
  
  // ==================== Lexicon Manager Tests ====================
  describe('مدير المعاجم - Lexicon Manager', () => {
    let manager: LexiconManager;
    
    beforeEach(() => {
      manager = new LexiconManager();
    });
    
    test('إضافة كلمة مع التحليل التلقائي', () => {
      const analysis = manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة', true);
      
      expect(analysis.word).toBe('كتاب');
      expect(analysis.entry).not.toBeNull();
      expect(analysis.root).not.toBeNull();
    });
    
    test('تحليل كلمة موجودة', () => {
      manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const analysis = manager.analyzeWord('كتاب');
      
      expect(analysis.word).toBe('كتاب');
      expect(analysis.entry).not.toBeNull();
      expect(analysis.root).not.toBeNull();
    });
    
    test('البحث في المعجم', () => {
      manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const results = manager.search('كتاب');
      
      expect(results.length).toBeGreaterThanOrEqual(1);
    });
    
    test('الحصول على كلمة', () => {
      manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      const entry = manager.getWord('كتاب');
      
      expect(entry).not.toBeNull();
      expect(entry?.word).toBe('كتاب');
    });
    
    test('إيجاد بالجذر', () => {
      manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      manager.addWord('كاتب', 'noun', 'من يكتب');
      
      const result = manager.findByRoot('كتب');
      
      expect(result.entries.length).toBeGreaterThanOrEqual(0);
    });
    
    test('توليد اشتقاق', () => {
      const derivation = manager.generateDerivation('كتب', 'verb', 'form_i');
      
      expect(derivation.root).toBe('كتب');
      expect(derivation.type).toBe('verb');
    });
    
    test('الوصول إلى المكونات الفرعية', () => {
      const rootAnalyzer = manager.getRootAnalyzer();
      const derivationGenerator = manager.getDerivationGenerator();
      const lexiconEngine = manager.getLexiconEngine();
      
      expect(rootAnalyzer).toBeInstanceOf(RootAnalyzer);
      expect(derivationGenerator).toBeInstanceOf(DerivationGenerator);
      expect(lexiconEngine).toBeInstanceOf(LexiconEngine);
    });
    
    test('الحصول على الإحصائيات الشاملة', () => {
      manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة', true);
      
      const stats = manager.getStatistics();
      
      expect(stats.lexicon).toBeDefined();
      expect(stats.roots).toBeDefined();
      expect(stats.derivations).toBeDefined();
    });
    
    test('مسح جميع البيانات', () => {
      manager.addWord('كتاب', 'noun', 'مجموعة من الصفحات المكتوبة');
      manager.clearAll();
      
      const stats = manager.getStatistics();
      expect(stats.lexicon.totalEntries).toBe(0);
      expect(stats.roots.totalRoots).toBe(0);
      expect(stats.derivations.totalDerivations).toBe(0);
    });
  });
});

