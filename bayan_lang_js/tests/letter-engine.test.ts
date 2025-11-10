/**
 * اختبارات محرك تحليل الحروف والكلمات
 * Letter and Word Analysis Engine Tests
 */

import { LetterEngine, MeaningType } from '../src/baserah/linguistics/letterEngine';

describe('Letter Engine - محرك تحليل الحروف', () => {
  let engine: LetterEngine;

  beforeEach(() => {
    engine = new LetterEngine();
  });

  describe('Letter Meanings - معاني الحروف', () => {
    it('should have meanings for letter ب (Ba)', () => {
      const meanings = engine.getLetterMeanings('ب');
      
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningStrings = meanings.map(m => m.meaning);
      expect(meaningStrings).toContain('دك');
      expect(meaningStrings).toContain('امتلاء');
      expect(meaningStrings).toContain('بلع');
      expect(meaningStrings).toContain('حمل');
      expect(meaningStrings).toContain('نقل');
      expect(meaningStrings).toContain('تشبع');
    });

    it('should have meanings for letter ش (Sheen)', () => {
      const meanings = engine.getLetterMeanings('ش');
      
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningStrings = meanings.map(m => m.meaning);
      expect(meaningStrings).toContain('تشتت');
      expect(meaningStrings).toContain('تشعب');
      expect(meaningStrings).toContain('انتشار');
    });

    it('should have meanings for letter ج (Jeem)', () => {
      const meanings = engine.getLetterMeanings('ج');
      
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningStrings = meanings.map(m => m.meaning);
      expect(meaningStrings).toContain('التحام');
      expect(meaningStrings).toContain('تجمع');
      expect(meaningStrings).toContain('وتد');
    });

    it('should have meanings for letter ر (Ra)', () => {
      const meanings = engine.getLetterMeanings('ر');
      
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningStrings = meanings.map(m => m.meaning);
      expect(meaningStrings).toContain('تدفق');
      expect(meaningStrings).toContain('انطلاق');
      expect(meaningStrings).toContain('انسيابية');
      expect(meaningStrings).toContain('تكرار');
    });

    it('should have meanings for letter ة (Ta Marbuta)', () => {
      const meanings = engine.getLetterMeanings('ة');
      
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningStrings = meanings.map(m => m.meaning);
      expect(meaningStrings).toContain('ثمرة');
      expect(meaningStrings).toContain('نتيجة');
      expect(meaningStrings).toContain('حصيلة');
    });
  });

  describe('Causal Relationships - العلاقات السببية', () => {
    it('should have causal relationships for letter ب meanings', () => {
      const causalEngine = engine.getCausalEngine();
      
      // دك → امتلاء
      const paths1 = causalEngine.findAllPaths('دك', 'امتلاء');
      expect(paths1.length).toBeGreaterThan(0);
      
      // امتلاء → بلع
      const paths2 = causalEngine.findAllPaths('امتلاء', 'بلع');
      expect(paths2.length).toBeGreaterThan(0);
      
      // بلع → حمل
      const paths3 = causalEngine.findAllPaths('بلع', 'حمل');
      expect(paths3.length).toBeGreaterThan(0);
    });

    it('should have complete causal chain for letter ب', () => {
      const causalEngine = engine.getCausalEngine();
      
      // دك → امتلاء → بلع → حمل → نقل
      const paths = causalEngine.findAllPaths('دك', 'نقل');
      expect(paths.length).toBeGreaterThan(0);
      
      const longestPath = paths[0];
      expect(longestPath.nodes.length).toBeGreaterThanOrEqual(3);
    });

    it('should have causal relationships for letter ش meanings', () => {
      const causalEngine = engine.getCausalEngine();
      
      // تشتت → تشعب
      const paths1 = causalEngine.findAllPaths('تشتت', 'تشعب');
      expect(paths1.length).toBeGreaterThan(0);
      
      // تشعب → انتشار
      const paths2 = causalEngine.findAllPaths('تشعب', 'انتشار');
      expect(paths2.length).toBeGreaterThan(0);
    });
  });

  describe('Word Analysis - تحليل الكلمات', () => {
    it('should analyze word شجرة (tree)', () => {
      const analysis = engine.analyzeWord('شجرة');
      
      expect(analysis.word).toBe('شجرة');
      expect(analysis.letters).toEqual(['ش', 'ج', 'ر', 'ة']);
      expect(analysis.letterMeanings.size).toBe(4);
      
      // التحقق من وجود معاني الحروف
      expect(analysis.letterMeanings.get('ش')).toContain('تشتت');
      expect(analysis.letterMeanings.get('ج')).toContain('التحام');
      expect(analysis.letterMeanings.get('ر')).toContain('تدفق');
      expect(analysis.letterMeanings.get('ة')).toContain('ثمرة');
    });

    it('should have causal chain for شجرة', () => {
      const analysis = engine.analyzeWord('شجرة');
      
      expect(analysis.causalChain.length).toBeGreaterThan(0);
      console.log('السلسلة السببية لكلمة شجرة:', analysis.causalChain);
    });

    it('should infer meanings for شجرة', () => {
      const analysis = engine.analyzeWord('شجرة');
      
      expect(analysis.wordMeanings.length).toBeGreaterThan(0);
      console.log('معاني كلمة شجرة المستنتجة:', analysis.wordMeanings);
    });

    it('should have confidence score', () => {
      const analysis = engine.analyzeWord('شجرة');
      
      expect(analysis.confidence).toBeGreaterThan(0);
      expect(analysis.confidence).toBeLessThanOrEqual(1);
      console.log('درجة الثقة:', (analysis.confidence * 100).toFixed(1) + '%');
    });

    it('should print analysis correctly', () => {
      const analysis = engine.analyzeWord('شجرة');
      const output = analysis.toString();
      
      expect(output).toContain('شجرة');
      expect(output).toContain('الحروف');
      expect(output).toContain('السلسلة السببية');
      expect(output).toContain('درجة الثقة');
      
      console.log(output);
    });
  });

  describe('Adding Custom Letters - إضافة حروف مخصصة', () => {
    it('should allow adding new letter meanings', () => {
      engine.addLetterMeaning('ت', 'تكرار', MeaningType.PRIMARY, 0.9, ['تكرر']);
      
      const meanings = engine.getLetterMeanings('ت');
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningStrings = meanings.map(m => m.meaning);
      expect(meaningStrings).toContain('تكرار');
    });

    it('should allow multiple meanings for same letter', () => {
      engine.addLetterMeaning('ت', 'معنى_1', MeaningType.PRIMARY, 0.9);
      engine.addLetterMeaning('ت', 'معنى_2', MeaningType.SECONDARY, 0.8);
      engine.addLetterMeaning('ت', 'معنى_3', MeaningType.RESULT, 0.7);
      
      const meanings = engine.getLetterMeanings('ت');
      expect(meanings.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Meaning Types - أنواع المعاني', () => {
    it('should categorize meanings by type', () => {
      const meanings = engine.getLetterMeanings('ب');
      
      const primaryMeanings = meanings.filter(m => m.type === MeaningType.PRIMARY);
      const mechanismMeanings = meanings.filter(m => m.type === MeaningType.MECHANISM);
      const resultMeanings = meanings.filter(m => m.type === MeaningType.RESULT);
      
      expect(primaryMeanings.length).toBeGreaterThan(0);
      expect(mechanismMeanings.length).toBeGreaterThan(0);
      expect(resultMeanings.length).toBeGreaterThan(0);
    });
  });

  describe('Complex Word Analysis - تحليل كلمات معقدة', () => {
    it('should analyze words with unknown letters gracefully', () => {
      const analysis = engine.analyzeWord('كلمة');
      
      expect(analysis.word).toBe('كلمة');
      expect(analysis.letters.length).toBe(4);
      expect(analysis.confidence).toBeGreaterThan(0);
    });

    it('should handle single letter words', () => {
      const analysis = engine.analyzeWord('ب');
      
      expect(analysis.word).toBe('ب');
      expect(analysis.letters).toEqual(['ب']);
    });

    it('should handle empty words', () => {
      const analysis = engine.analyzeWord('');
      
      expect(analysis.word).toBe('');
      expect(analysis.letters).toEqual([]);
    });
  });

  describe('Integration with Causal Engine - التكامل مع المحرك السببي', () => {
    it('should use causal engine for analysis', () => {
      const causalEngine = engine.getCausalEngine();
      
      expect(causalEngine).toBeDefined();
      
      // التحقق من وجود علاقات سببية
      const relations = causalEngine.getRelationsFrom('دك');
      expect(relations.length).toBeGreaterThan(0);
    });

    it('should find root causes in letter meanings', () => {
      const causalEngine = engine.getCausalEngine();
      
      const rootCauses = causalEngine.findRootCauses('تشبع');
      expect(rootCauses.length).toBeGreaterThan(0);
      
      console.log('الأسباب الجذرية لـ "تشبع":', rootCauses);
    });

    it('should find final results in letter meanings', () => {
      const causalEngine = engine.getCausalEngine();
      
      const finalResults = causalEngine.findFinalResults('دك');
      expect(finalResults.length).toBeGreaterThan(0);
      
      console.log('النتائج النهائية لـ "دك":', finalResults);
    });
  });
});

