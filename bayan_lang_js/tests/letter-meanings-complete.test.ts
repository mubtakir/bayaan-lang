/**
 * اختبارات معاني الحروف الكاملة
 * Complete Letter Meanings Tests
 * 
 * اختبار المعاني المستمدة من بحث 40 سنة في سيماء الحروف
 * Testing meanings derived from 40 years of research in letter semiotics
 */

import { LetterEngine, MeaningType } from '../src/baserah/linguistics/letterEngine';

describe('معاني الحروف الكاملة - Complete Letter Meanings', () => {
  let engine: LetterEngine;

  beforeEach(() => {
    engine = new LetterEngine();
  });

  describe('الحروف الجديدة - New Letters', () => {
    test('الهمزة (ء) - يجب أن تحتوي على معاني المفاجأة والرعب', () => {
      const meanings = engine.getLetterMeanings('ء');
      expect(meanings.length).toBeGreaterThan(0);
      
      const meaningTexts = meanings.map(m => m.meaning);
      expect(meaningTexts).toContain('عنصر المفاجأة');
      expect(meaningTexts).toContain('صوت رعب وتخويف');
    });

    test('الألف الممدودة (آ) - يجب أن تحتوي على معاني العلو والحنان والتعظيم', () => {
      const meanings = engine.getLetterMeanings('آ');
      expect(meanings.length).toBe(3);
      
      const meaningTexts = meanings.map(m => m.meaning);
      expect(meaningTexts).toContain('علو');
      expect(meaningTexts).toContain('حنان');
      expect(meaningTexts).toContain('تعظيم');
    });
  });

  describe('معاني الباء (ب) - Ba Meanings', () => {
    test('يجب أن تحتوي على معاني من hurof.md', () => {
      const meanings = engine.getLetterMeanings('ب');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('امتلاء وتشبع');
      expect(meaningTexts).toContain('حمل ونقل');
      expect(meaningTexts).toContain('دك');
    });
  });

  describe('معاني الجيم (ج) - Jeem Meanings', () => {
    test('يجب أن تحتوي على معاني الجمع وجبر الخاطر', () => {
      const meanings = engine.getLetterMeanings('ج');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts.some(m => m.includes('الجمع'))).toBe(true);
      expect(meaningTexts).toContain('جبر الخاطر');
      expect(meaningTexts).toContain('جزالة');
    });
  });

  describe('معاني الدال (د) - Dal Meanings', () => {
    test('يجب أن تحتوي على معاني البدء والثبات والباب', () => {
      const meanings = engine.getLetterMeanings('د');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('البدء والانتهاء');
      expect(meaningTexts).toContain('الثبات');
      expect(meaningTexts).toContain('الباب والفتح');
    });
  });

  describe('معاني الحاء (ح) - Ha Meanings', () => {
    test('يجب أن تحتوي على معاني المشقة والعطش والتودد', () => {
      const meanings = engine.getLetterMeanings('ح');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('صوت المشقة (أبلغ من الجهد)');
      expect(meaningTexts).toContain('العطش');
      expect(meaningTexts).toContain('التودد');
    });
  });

  describe('معاني الراء (ر) - Ra Meanings', () => {
    test('يجب أن تحتوي على معاني التدفق والتكرار والحركة', () => {
      const meanings = engine.getLetterMeanings('ر');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('التدفق');
      expect(meaningTexts).toContain('التكرار');
      expect(meaningTexts).toContain('الحركة');
    });
  });

  describe('معاني السين (س) - Seen Meanings', () => {
    test('يجب أن تحتوي على معاني الزحف والاحتكاك والخفوت', () => {
      const meanings = engine.getLetterMeanings('س');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('الزحف');
      expect(meaningTexts).toContain('الاحتكاك');
      expect(meaningTexts).toContain('الخفوت والتسلل');
    });
  });

  describe('معاني الشين (ش) - Sheen Meanings', () => {
    test('يجب أن تحتوي على معنى التشتت والانتشار', () => {
      const meanings = engine.getLetterMeanings('ش');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('التشتت والانتشار');
    });
  });

  describe('معاني الضاد (ض) - Dad Meanings', () => {
    test('يجب أن تحتوي على معاني الضمور والركود والتصاغر', () => {
      const meanings = engine.getLetterMeanings('ض');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('ضمور');
      expect(meaningTexts).toContain('ركود');
      expect(meaningTexts).toContain('تصاغر');
    });
  });

  describe('معاني الغين (غ) - Ghain Meanings', () => {
    test('يجب أن تحتوي على معاني الغضب والتغييب', () => {
      const meanings = engine.getLetterMeanings('غ');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('صوت الغضب والغليان');
      expect(meaningTexts).toContain('تغييب');
    });
  });

  describe('معاني الفاء (ف) - Fa Meanings', () => {
    test('يجب أن تحتوي على معاني الفجوة والانفجار', () => {
      const meanings = engine.getLetterMeanings('ف');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('فجوة');
      expect(meaningTexts).toContain('صوت انفجار');
    });
  });

  describe('معاني القاف (ق) - Qaf Meanings', () => {
    test('يجب أن تحتوي على معاني الدقة والبُعد', () => {
      const meanings = engine.getLetterMeanings('ق');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('الدقة');
      expect(meaningTexts).toContain('البُعد');
    });
  });

  describe('معاني اللام (ل) - Lam Meanings', () => {
    test('يجب أن تحتوي على معاني السحل والالتفاف والإحاطة', () => {
      const meanings = engine.getLetterMeanings('ل');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('السحل');
      expect(meaningTexts).toContain('الالتفاف');
      expect(meaningTexts).toContain('الإحاطة');
    });
  });

  describe('معاني الميم (م) - Meem Meanings', () => {
    test('يجب أن تحتوي على معاني الضم والرضا والكتم', () => {
      const meanings = engine.getLetterMeanings('م');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('الضم والتخبي');
      expect(meaningTexts).toContain('الرضا');
      expect(meaningTexts).toContain('الكتم');
    });
  });

  describe('معاني النون (ن) - Noon Meanings', () => {
    test('يجب أن تحتوي على معاني الظهور والنشوء', () => {
      const meanings = engine.getLetterMeanings('ن');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('الظهور');
      expect(meaningTexts.some(m => m.includes('النشوء'))).toBe(true);
      expect(meaningTexts).toContain('الانبثاق');
    });
  });

  describe('معاني الهاء (ه) - Ha Meanings', () => {
    test('يجب أن تحتوي على معاني الجهد والنتيجة', () => {
      const meanings = engine.getLetterMeanings('ه');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('الجهد والتعب');
      expect(meaningTexts).toContain('النتيجة والثمرة');
    });
  });

  describe('معاني الواو (و) - Waw Meanings', () => {
    test('يجب أن تحتوي على معاني التعجب والهجوم والمباغتة', () => {
      const meanings = engine.getLetterMeanings('و');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('تعجب');
      expect(meaningTexts).toContain('هجوم');
      expect(meaningTexts).toContain('مباغتة');
    });
  });

  describe('معاني الياء (ي) - Ya Meanings', () => {
    test('يجب أن تحتوي على معاني التألم والحسرة', () => {
      const meanings = engine.getLetterMeanings('ي');
      const meaningTexts = meanings.map(m => m.meaning);
      
      expect(meaningTexts).toContain('تألم نفسي');
      expect(meaningTexts).toContain('حسرة');
    });
  });

  describe('تحليل الكلمات - Word Analysis', () => {
    test('تحليل كلمة "بيان" - يجب أن تجمع معاني الحروف', () => {
      const analysis = engine.analyzeWord('بيان');
      
      expect(analysis.word).toBe('بيان');
      expect(analysis.letters).toEqual(['ب', 'ي', 'ا', 'ن']);
      expect(analysis.letterMeanings.size).toBe(4);
      
      // التحقق من وجود معاني لكل حرف
      expect(analysis.letterMeanings.has('ب')).toBe(true);
      expect(analysis.letterMeanings.has('ي')).toBe(true);
      expect(analysis.letterMeanings.has('ا')).toBe(true);
      expect(analysis.letterMeanings.has('ن')).toBe(true);
    });

    test('تحليل كلمة "حرف" - يجب أن تجمع معاني الحروف', () => {
      const analysis = engine.analyzeWord('حرف');
      
      expect(analysis.word).toBe('حرف');
      expect(analysis.letters).toEqual(['ح', 'ر', 'ف']);
      expect(analysis.letterMeanings.size).toBe(3);
    });

    test('تحليل كلمة "معنى" - يجب أن تجمع معاني الحروف', () => {
      const analysis = engine.analyzeWord('معنى');
      
      expect(analysis.word).toBe('معنى');
      expect(analysis.letterMeanings.size).toBeGreaterThan(0);
    });
  });

  describe('إحصائيات المعاني - Meaning Statistics', () => {
    test('يجب أن تكون جميع الحروف العربية موجودة', () => {
      const arabicLetters = ['ء', 'آ', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];

      for (const letter of arabicLetters) {
        const meanings = engine.getLetterMeanings(letter);
        expect(meanings.length).toBeGreaterThan(0);
      }
    });

    test('يجب أن يكون لكل حرف معنى أساسي على الأقل', () => {
      const arabicLetters = ['ء', 'آ', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];

      for (const letter of arabicLetters) {
        const meanings = engine.getLetterMeanings(letter);
        const hasPrimary = meanings.some(m => m.type === MeaningType.PRIMARY);
        expect(hasPrimary).toBe(true);
      }
    });
  });
});

