/**
 * اختبارات نظام معاني الحروف - Letter Meanings System Tests
 */

import {
  LetterMeaningAnalyzer,
  PatternExtractor,
  AssociationEngine,
  LetterMeaningsManager
} from '../../src/baserah/linguistics/letterMeanings';

describe('نظام معاني الحروف - Letter Meanings System', () => {
  
  // ============================================
  // محلل معاني الحروف - Letter Meaning Analyzer
  // ============================================
  
  describe('محلل معاني الحروف - Letter Meaning Analyzer', () => {
    let analyzer: LetterMeaningAnalyzer;
    
    beforeEach(() => {
      analyzer = new LetterMeaningAnalyzer();
    });
    
    test('إضافة معنى لحرف', () => {
      const meaning = analyzer.addMeaning('ك', 'التشبيه', 'developer', 'التفريق', ['كالأسد', 'كالبحر']);
      
      expect(meaning.letter).toBe('ك');
      expect(meaning.meaning).toBe('التشبيه');
      expect(meaning.opposite).toBe('التفريق');
      expect(meaning.examples).toHaveLength(2);
      expect(meaning.source).toBe('developer');
      expect(meaning.strength).toBe(1.0);
      expect(meaning.confidence).toBe(1.0);
    });
    
    test('الحصول على معاني حرف', () => {
      analyzer.addMeaning('ب', 'الإلصاق', 'developer');
      analyzer.addMeaning('ب', 'المصاحبة', 'pattern');
      
      const meanings = analyzer.getMeanings('ب');
      
      expect(meanings).toHaveLength(2);
      expect(meanings[0].meaning).toBe('الإلصاق');
      expect(meanings[1].meaning).toBe('المصاحبة');
    });
    
    test('الحصول على ملف تعريف الحرف', () => {
      analyzer.addMeaning('ع', 'العمق', 'developer');
      analyzer.addMeaning('ع', 'الاتساع', 'dictionary');
      
      const profile = analyzer.getProfile('ع');
      
      expect(profile).not.toBeNull();
      expect(profile!.letter).toBe('ع');
      expect(profile!.articulationPoint).toBe('pharynx');
      expect(profile!.articulationDepth).toBe('internal');
      expect(profile!.meaningType).toBe('psychological');
      expect(profile!.totalMeanings).toBe(2);
    });
    
    test('إيجاد المعاني حسب النوع', () => {
      analyzer.addMeaning('ع', 'العمق', 'developer'); // psychological
      analyzer.addMeaning('ب', 'الإلصاق', 'developer'); // physical
      analyzer.addMeaning('ك', 'التشبيه', 'developer'); // mixed
      
      const psychological = analyzer.findMeaningsByType('psychological');
      const physical = analyzer.findMeaningsByType('physical');
      
      expect(psychological.length).toBeGreaterThan(0);
      expect(physical.length).toBeGreaterThan(0);
    });
    
    test('إيجاد المعاني حسب المخرج', () => {
      analyzer.addMeaning('ع', 'العمق', 'developer');
      analyzer.addMeaning('ح', 'الحياة', 'developer');
      
      const pharynx = analyzer.findMeaningsByArticulation('pharynx');
      
      expect(pharynx.length).toBeGreaterThan(0);
      expect(pharynx.some((p: any) => p.letter === 'ع')).toBe(true);
    });
    
    test('تحديث قوة المعنى', () => {
      const meaning = analyzer.addMeaning('ف', 'الفصل', 'developer');
      
      const updated = analyzer.updateMeaningStrength('ف', meaning.id, 0.7);
      
      expect(updated).toBe(true);
      
      const meanings = analyzer.getMeanings('ف');
      expect(meanings[0].strength).toBe(0.7);
    });
    
    test('إضافة مثال لمعنى', () => {
      const meaning = analyzer.addMeaning('ل', 'الملكية', 'developer');
      
      const added = analyzer.addExample('ل', meaning.id, 'لي كتاب');
      
      expect(added).toBe(true);
      
      const meanings = analyzer.getMeanings('ل');
      expect(meanings[0].examples).toContain('لي كتاب');
      expect(meanings[0].wordsCount).toBe(1);
    });
    
    test('البحث في المعاني', () => {
      analyzer.addMeaning('ك', 'التشبيه', 'developer', null, ['كالأسد']);
      analyzer.addMeaning('ب', 'الإلصاق', 'developer');
      
      const results = analyzer.searchMeanings('التشبيه');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].meaning).toBe('التشبيه');
    });
    
    test('الحصول على الإحصائيات', () => {
      analyzer.addMeaning('ك', 'التشبيه', 'developer');
      analyzer.addMeaning('ب', 'الإلصاق', 'pattern');
      analyzer.addMeaning('ل', 'الملكية', 'dictionary');
      
      const stats = analyzer.getStatistics();
      
      expect(stats.totalLetters).toBe(3);
      expect(stats.totalMeanings).toBe(3);
      expect(stats.sourceDistribution.developer).toBe(1);
      expect(stats.sourceDistribution.pattern).toBe(1);
      expect(stats.sourceDistribution.dictionary).toBe(1);
    });
    
    test('مسح البيانات', () => {
      analyzer.addMeaning('ك', 'التشبيه', 'developer');
      analyzer.clear();
      
      const meanings = analyzer.getMeanings('ك');
      expect(meanings).toHaveLength(0);
    });
  });
  
  // ============================================
  // مستخرج الأنماط - Pattern Extractor
  // ============================================
  
  describe('مستخرج الأنماط - Pattern Extractor', () => {
    let extractor: PatternExtractor;
    
    beforeEach(() => {
      extractor = new PatternExtractor();
    });
    
    test('إضافة نمط بادئة', () => {
      const pattern = extractor.addPattern('ال', 'prefix', 'التعريف', ['الكتاب', 'البيت'], 'strong');
      
      expect(pattern.pattern).toBe('ال');
      expect(pattern.type).toBe('prefix');
      expect(pattern.meaning).toBe('التعريف');
      expect(pattern.strength).toBe('strong');
      expect(pattern.frequency).toBe(2);
    });
    
    test('استخراج أنماط البادئة', () => {
      extractor.addPattern('ال', 'prefix', 'التعريف', ['الكتاب'], 'strong');
      
      const matches = extractor.extractPatterns('الكتاب');
      
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].pattern.pattern).toBe('ال');
      expect(matches[0].position).toBe(0);
    });
    
    test('استخراج أنماط اللاحقة', () => {
      extractor.addPattern('ون', 'suffix', 'جمع المذكر', ['معلمون'], 'strong');
      
      const matches = extractor.extractPatterns('معلمون');
      
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].pattern.pattern).toBe('ون');
    });
    
    test('استخراج أنماط الجذر', () => {
      extractor.addPattern('كتب', 'root', 'الكتابة', ['كتاب', 'مكتوب'], 'very_strong');
      
      const matches = extractor.extractPatterns('كتاب');
      
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].pattern.pattern).toBe('كتب');
    });
    
    test('استخراج أنماط التركيب', () => {
      extractor.addPattern('كتب', 'combination', 'الكتابة', ['كاتب'], 'strong');
      
      const matches = extractor.extractPatterns('كاتب');
      
      expect(matches.length).toBeGreaterThan(0);
    });
    
    test('إيجاد الأنماط حسب النوع', () => {
      extractor.addPattern('ال', 'prefix', 'التعريف');
      extractor.addPattern('ون', 'suffix', 'جمع المذكر');
      
      const prefixes = extractor.findPatternsByType('prefix');
      const suffixes = extractor.findPatternsByType('suffix');
      
      expect(prefixes).toHaveLength(1);
      expect(suffixes).toHaveLength(1);
    });
    
    test('إيجاد الأنماط حسب القوة', () => {
      extractor.addPattern('ال', 'prefix', 'التعريف', [], 'strong');
      extractor.addPattern('ب', 'prefix', 'الإلصاق', [], 'weak');
      
      const strong = extractor.findPatternsByStrength('strong');
      
      expect(strong.length).toBeGreaterThan(0);
      expect(strong[0].strength).toBe('strong');
    });
    
    test('تحديث تكرار النمط', () => {
      const pattern = extractor.addPattern('ال', 'prefix', 'التعريف');
      
      const updated = extractor.updatePatternFrequency(pattern.id, 'الكتاب');
      
      expect(updated).toBe(true);
      
      const retrieved = extractor.getPattern(pattern.id);
      expect(retrieved!.frequency).toBe(1);
      expect(retrieved!.examples).toContain('الكتاب');
    });
    
    test('الحصول على الإحصائيات', () => {
      extractor.addPattern('ال', 'prefix', 'التعريف', [], 'strong');
      extractor.addPattern('ون', 'suffix', 'جمع المذكر', [], 'moderate');
      
      const stats = extractor.getStatistics();
      
      expect(stats.totalPatterns).toBe(2);
      expect(stats.typeDistribution.prefix).toBe(1);
      expect(stats.typeDistribution.suffix).toBe(1);
      expect(stats.strengthDistribution.strong).toBe(1);
      expect(stats.strengthDistribution.moderate).toBe(1);
    });
    
    test('مسح البيانات', () => {
      extractor.addPattern('ال', 'prefix', 'التعريف');
      extractor.clear();
      
      const stats = extractor.getStatistics();
      expect(stats.totalPatterns).toBe(0);
    });
  });
  
  // ============================================
  // محرك الارتباطات - Association Engine
  // ============================================
  
  describe('محرك الارتباطات - Association Engine', () => {
    let engine: AssociationEngine;
    
    beforeEach(() => {
      engine = new AssociationEngine();
    });
    
    test('إضافة ارتباط', () => {
      const assoc = engine.addAssociation('الحب', 'السعادة', 'causes', 'strong', ['حب يسبب سعادة']);
      
      expect(assoc.fromMeaning).toBe('الحب');
      expect(assoc.toMeaning).toBe('السعادة');
      expect(assoc.relationType).toBe('causes');
      expect(assoc.strength).toBe('strong');
      expect(assoc.examples).toHaveLength(1);
    });
    
    test('الحصول على الارتباطات', () => {
      engine.addAssociation('الحب', 'السعادة', 'causes');
      engine.addAssociation('الحب', 'الكره', 'opposite_of');
      
      const assocs = engine.getAssociations('الحب');
      
      expect(assocs).toHaveLength(2);
    });
    
    test('الحصول على الارتباطات حسب النوع', () => {
      engine.addAssociation('الحب', 'السعادة', 'causes');
      engine.addAssociation('الحب', 'الكره', 'opposite_of');
      
      const causes = engine.getAssociationsByType('الحب', 'causes');
      const opposites = engine.getAssociationsByType('الحب', 'opposite_of');
      
      expect(causes).toHaveLength(1);
      expect(opposites).toHaveLength(1);
    });
    
    test('إيجاد المعاني المرتبطة', () => {
      engine.addAssociation('A', 'B', 'causes');
      engine.addAssociation('B', 'C', 'leads_to');
      engine.addAssociation('C', 'D', 'requires');
      
      const related = engine.findRelatedMeanings('A', 3);
      
      expect(related.length).toBeGreaterThan(0);
      expect(related).toContain('B');
    });
    
    test('إيجاد سلسلة الارتباطات', () => {
      engine.addAssociation('A', 'B', 'causes');
      engine.addAssociation('B', 'C', 'leads_to');
      
      const chain = engine.findAssociationChain('A', 'C', 3);
      
      expect(chain).not.toBeNull();
      expect(chain!.meanings).toContain('A');
      expect(chain!.meanings).toContain('B');
      expect(chain!.meanings).toContain('C');
      expect(chain!.relations).toHaveLength(2);
    });
    
    test('إيجاد الأضداد', () => {
      engine.addAssociation('الحب', 'الكره', 'opposite_of');
      
      const opposites = engine.findOpposites('الحب');
      
      expect(opposites).toContain('الكره');
    });
    
    test('إيجاد الأسباب', () => {
      engine.addAssociation('الحب', 'السعادة', 'causes');
      
      const causes = engine.findCauses('الحب');
      
      expect(causes).toContain('السعادة');
    });
    
    test('إضافة مثال لارتباط', () => {
      const assoc = engine.addAssociation('الحب', 'السعادة', 'causes');
      
      const added = engine.addExample(assoc.id, 'مثال جديد');
      
      expect(added).toBe(true);
    });
    
    test('تحديث قوة الارتباط', () => {
      const assoc = engine.addAssociation('الحب', 'السعادة', 'causes', 'moderate');
      
      const updated = engine.updateStrength(assoc.id, 'very_strong');
      
      expect(updated).toBe(true);
    });
    
    test('الحصول على الإحصائيات', () => {
      engine.addAssociation('A', 'B', 'causes', 'strong');
      engine.addAssociation('B', 'C', 'leads_to', 'moderate', [], true);
      
      const stats = engine.getStatistics();
      
      expect(stats.totalAssociations).toBe(2);
      expect(stats.typeDistribution.causes).toBe(1);
      expect(stats.typeDistribution.leads_to).toBe(1);
      expect(stats.bidirectionalCount).toBe(1);
    });
    
    test('مسح البيانات', () => {
      engine.addAssociation('A', 'B', 'causes');
      engine.clear();
      
      const stats = engine.getStatistics();
      expect(stats.totalAssociations).toBe(0);
    });
  });
  
  // ============================================
  // مدير معاني الحروف - Letter Meanings Manager
  // ============================================
  
  describe('مدير معاني الحروف - Letter Meanings Manager', () => {
    let manager: LetterMeaningsManager;
    
    beforeEach(() => {
      manager = new LetterMeaningsManager();
    });
    
    test('إضافة معنى حرف مع إنشاء ارتباط تلقائي', () => {
      const meaning = manager.addLetterMeaning('ك', 'التشبيه', 'developer', 'التفريق');
      
      expect(meaning.meaning).toBe('التشبيه');
      expect(meaning.opposite).toBe('التفريق');
      
      const opposites = manager.getAssociationEngine().findOpposites('التشبيه');
      expect(opposites).toContain('التفريق');
    });
    
    test('تحليل حرف', () => {
      manager.addLetterMeaning('ب', 'الإلصاق', 'developer');
      manager.addLetterMeaning('ب', 'المصاحبة', 'pattern');
      manager.addAssociation('الإلصاق', 'القرب', 'leads_to');
      
      const analysis = manager.analyzeLetter('ب');
      
      expect(analysis.letter).toBe('ب');
      expect(analysis.meanings).toHaveLength(2);
      expect(analysis.profile).not.toBeNull();
      expect(analysis.associations.length).toBeGreaterThan(0);
    });
    
    test('تحليل كلمة', () => {
      manager.addLetterMeaning('ك', 'التشبيه', 'developer');
      manager.addLetterMeaning('ت', 'التأنيث', 'developer');
      manager.addLetterMeaning('ب', 'الإلصاق', 'developer');
      manager.addPattern('كتب', 'root', 'الكتابة', ['كتاب']);
      
      const analysis = manager.analyzeWord('كتاب');
      
      expect(analysis.word).toBe('كتاب');
      expect(analysis.letters).toHaveLength(4);
      expect(analysis.letterMeanings.size).toBeGreaterThan(0);
    });
    
    test('إيجاد سلسلة المعاني', () => {
      manager.addAssociation('A', 'B', 'causes');
      manager.addAssociation('B', 'C', 'leads_to');
      
      const chain = manager.findMeaningChain('A', 'C');
      
      expect(chain).not.toBeNull();
      expect(chain!.meanings).toContain('A');
      expect(chain!.meanings).toContain('C');
    });
    
    test('البحث في المعاني', () => {
      manager.addLetterMeaning('ك', 'التشبيه', 'developer');
      
      const results = manager.searchMeanings('التشبيه');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].meaning).toBe('التشبيه');
    });
    
    test('الحصول على ملف تعريف الحرف', () => {
      manager.addLetterMeaning('ع', 'العمق', 'developer');
      
      const profile = manager.getLetterProfile('ع');
      
      expect(profile).not.toBeNull();
      expect(profile!.letter).toBe('ع');
    });
    
    test('إيجاد الحروف حسب النوع', () => {
      manager.addLetterMeaning('ع', 'العمق', 'developer');
      manager.addLetterMeaning('ب', 'الإلصاق', 'developer');
      
      const psychological = manager.findLettersByType('psychological');
      
      expect(psychological.length).toBeGreaterThan(0);
    });
    
    test('الوصول إلى المكونات الفرعية', () => {
      const analyzer = manager.getAnalyzer();
      const extractor = manager.getPatternExtractor();
      const engine = manager.getAssociationEngine();
      
      expect(analyzer).toBeInstanceOf(LetterMeaningAnalyzer);
      expect(extractor).toBeInstanceOf(PatternExtractor);
      expect(engine).toBeInstanceOf(AssociationEngine);
    });
    
    test('الحصول على الإحصائيات الشاملة', () => {
      manager.addLetterMeaning('ك', 'التشبيه', 'developer');
      manager.addPattern('ال', 'prefix', 'التعريف');
      manager.addAssociation('A', 'B', 'causes');
      
      const stats = manager.getStatistics();
      
      expect(stats.analyzer.totalLetters).toBe(1);
      expect(stats.patterns.totalPatterns).toBe(1);
      expect(stats.associations.totalAssociations).toBe(1);
    });
    
    test('مسح جميع البيانات', () => {
      manager.addLetterMeaning('ك', 'التشبيه', 'developer');
      manager.addPattern('ال', 'prefix', 'التعريف');
      manager.addAssociation('A', 'B', 'causes');
      
      manager.clearAll();
      
      const stats = manager.getStatistics();
      expect(stats.analyzer.totalLetters).toBe(0);
      expect(stats.patterns.totalPatterns).toBe(0);
      expect(stats.associations.totalAssociations).toBe(0);
    });
  });
});

