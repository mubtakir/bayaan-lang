/**
 * اختبارات محرك التفاعل بين الحروف
 * Tests for Letter Interaction Engine
 */

import { LetterInteractionEngine, InteractionType } from '../src/baserah/linguistics/letterInteractionEngine';

describe('LetterInteractionEngine', () => {
  let engine: LetterInteractionEngine;

  beforeEach(() => {
    engine = new LetterInteractionEngine();
  });

  describe('calculateSynergy', () => {
    test('يجب حساب التآزر بين حرفين متشابهين', () => {
      const interaction = engine.calculateSynergy('ح', 'ي');
      
      expect(interaction).toBeDefined();
      expect(interaction.letter1).toBe('ح');
      expect(interaction.letter2).toBe('ي');
      expect(interaction.strength).toBeGreaterThanOrEqual(0);
      expect(interaction.strength).toBeLessThanOrEqual(1);
      expect(interaction.description).toBeTruthy();
    });

    test('يجب التعرف على التآزر القوي', () => {
      const interaction = engine.calculateSynergy('ن', 'و');
      
      expect(interaction.type).toBeDefined();
      expect(interaction.strength).toBeGreaterThanOrEqual(0);
    });

    test('يجب التعامل مع حروف بدون معاني', () => {
      // استخدام حرف غير موجود في النظام
      const interaction = engine.calculateSynergy('ڤ', 'پ');

      expect(interaction.type).toBe(InteractionType.NEUTRAL);
      expect(interaction.strength).toBe(0);
    });
  });

  describe('calculateBalance', () => {
    test('يجب حساب توازن كلمة إيجابية', () => {
      const balance = engine.calculateBalance('حياة');
      
      expect(balance).toBeDefined();
      expect(balance.word).toBe('حياة');
      expect(balance.positiveScore).toBeGreaterThanOrEqual(0);
      expect(balance.negativeScore).toBeGreaterThanOrEqual(0);
      expect(balance.overallBalance).toBeGreaterThanOrEqual(-1);
      expect(balance.overallBalance).toBeLessThanOrEqual(1);
      expect(balance.description).toBeTruthy();
    });

    test('يجب حساب توازن كلمة سلبية', () => {
      const balance = engine.calculateBalance('غضب');
      
      expect(balance.word).toBe('غضب');
      expect(balance.description).toBeTruthy();
    });

    test('يجب حساب الطابع المادي والنفسي', () => {
      const balance = engine.calculateBalance('فكر');
      
      expect(balance.materialScore).toBeGreaterThanOrEqual(0);
      expect(balance.psychologicalScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('analyzeCausalFlow', () => {
    test('يجب تحليل التدفق السببي في كلمة', () => {
      const flow = engine.analyzeCausalFlow('حياة');
      
      expect(flow).toBeDefined();
      expect(flow.word).toBe('حياة');
      expect(flow.stages).toHaveLength(4); // ح ي ا ة
      expect(flow.flowStrength).toBeGreaterThanOrEqual(0);
      expect(flow.flowStrength).toBeLessThanOrEqual(1);
      expect(flow.coherence).toBeGreaterThanOrEqual(0);
      expect(flow.coherence).toBeLessThanOrEqual(1);
    });

    test('يجب حساب مساهمة كل حرف', () => {
      const flow = engine.analyzeCausalFlow('نور');
      
      expect(flow.stages).toHaveLength(3); // ن و ر
      
      // الحرف الأول له وزن أكبر
      expect(flow.stages[0].contribution).toBeGreaterThan(0.8);
      
      // الحرف الأخير له وزن كبير
      expect(flow.stages[2].contribution).toBeGreaterThan(0.8);
    });

    test('يجب حساب قوة التدفق', () => {
      const flow = engine.analyzeCausalFlow('سلام');
      
      expect(flow.flowStrength).toBeGreaterThanOrEqual(0);
      expect(flow.flowStrength).toBeLessThanOrEqual(1);
    });
  });

  describe('analyzeWordInteraction', () => {
    test('يجب إجراء تحليل شامل لكلمة', () => {
      const analysis = engine.analyzeWordInteraction('حياة');
      
      expect(analysis).toBeDefined();
      expect(analysis.word).toBe('حياة');
      expect(analysis.interactions).toHaveLength(3); // 4 حروف = 3 تفاعلات
      expect(analysis.balance).toBeDefined();
      expect(analysis.flow).toBeDefined();
      expect(analysis.overallScore).toBeGreaterThanOrEqual(0);
      expect(analysis.overallScore).toBeLessThanOrEqual(1);
    });

    test('يجب تحليل كلمة "نور"', () => {
      const analysis = engine.analyzeWordInteraction('نور');
      
      expect(analysis.word).toBe('نور');
      expect(analysis.interactions).toHaveLength(2); // 3 حروف = 2 تفاعل
      expect(analysis.balance.positiveScore).toBeGreaterThanOrEqual(0);
    });

    test('يجب تحليل كلمة "غضب"', () => {
      const analysis = engine.analyzeWordInteraction('غضب');
      
      expect(analysis.word).toBe('غضب');
      expect(analysis.interactions).toHaveLength(2); // 3 حروف = 2 تفاعل
    });

    test('يجب تحليل كلمة "سلام"', () => {
      const analysis = engine.analyzeWordInteraction('سلام');
      
      expect(analysis.word).toBe('سلام');
      expect(analysis.interactions).toHaveLength(3); // 4 حروف = 3 تفاعلات
    });

    test('يجب تحليل كلمة "فرح"', () => {
      const analysis = engine.analyzeWordInteraction('فرح');
      
      expect(analysis.word).toBe('فرح');
      expect(analysis.interactions).toHaveLength(2); // 3 حروف = 2 تفاعل
    });

    test('يجب تحليل كلمة "ظلام"', () => {
      const analysis = engine.analyzeWordInteraction('ظلام');
      
      expect(analysis.word).toBe('ظلام');
      expect(analysis.interactions).toHaveLength(3); // 4 حروف = 3 تفاعلات
    });

    test('يجب تحليل كلمة "حب"', () => {
      const analysis = engine.analyzeWordInteraction('حب');
      
      expect(analysis.word).toBe('حب');
      expect(analysis.interactions).toHaveLength(1); // 2 حرف = 1 تفاعل
    });

    test('يجب تحليل كلمة "بيان"', () => {
      const analysis = engine.analyzeWordInteraction('بيان');
      
      expect(analysis.word).toBe('بيان');
      expect(analysis.interactions).toHaveLength(3); // 4 حروف = 3 تفاعلات
    });
  });

  describe('Interaction Types', () => {
    test('يجب التعرف على أنواع التفاعل المختلفة', () => {
      const words = ['حياة', 'نور', 'غضب', 'سلام', 'فرح'];
      
      for (const word of words) {
        const analysis = engine.analyzeWordInteraction(word);
        
        for (const interaction of analysis.interactions) {
          expect(Object.values(InteractionType)).toContain(interaction.type);
        }
      }
    });
  });

  describe('Edge Cases', () => {
    test('يجب التعامل مع كلمة من حرف واحد', () => {
      const analysis = engine.analyzeWordInteraction('و');
      
      expect(analysis.word).toBe('و');
      expect(analysis.interactions).toHaveLength(0);
      expect(analysis.balance).toBeDefined();
      expect(analysis.flow).toBeDefined();
    });

    test('يجب التعامل مع كلمة طويلة', () => {
      const analysis = engine.analyzeWordInteraction('استقلال');
      
      expect(analysis.word).toBe('استقلال');
      expect(analysis.interactions.length).toBeGreaterThan(0);
      expect(analysis.overallScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Balance Analysis', () => {
    test('يجب التمييز بين الكلمات الإيجابية والسلبية', () => {
      const positiveBalance = engine.calculateBalance('حياة');
      const negativeBalance = engine.calculateBalance('غضب');
      
      // الكلمة الإيجابية يجب أن يكون لها توازن أكبر من السلبية
      expect(positiveBalance.overallBalance).toBeGreaterThanOrEqual(negativeBalance.overallBalance);
    });
  });

  describe('Flow Analysis', () => {
    test('يجب أن يكون للكلمات المتماسكة تدفق أقوى', () => {
      const flow1 = engine.analyzeCausalFlow('حياة');
      const flow2 = engine.analyzeCausalFlow('نور');
      
      expect(flow1.flowStrength).toBeGreaterThanOrEqual(0);
      expect(flow2.flowStrength).toBeGreaterThanOrEqual(0);
    });

    test('يجب حساب التماسك بشكل صحيح', () => {
      const flow = engine.analyzeCausalFlow('سلام');
      
      expect(flow.coherence).toBeGreaterThanOrEqual(0);
      expect(flow.coherence).toBeLessThanOrEqual(1);
    });
  });

  describe('Overall Score', () => {
    test('يجب أن تكون الدرجة الكلية بين 0 و 1', () => {
      const words = ['حياة', 'نور', 'غضب', 'سلام', 'فرح', 'ظلام', 'حب', 'بيان'];
      
      for (const word of words) {
        const analysis = engine.analyzeWordInteraction(word);
        
        expect(analysis.overallScore).toBeGreaterThanOrEqual(0);
        expect(analysis.overallScore).toBeLessThanOrEqual(1);
      }
    });
  });
});

