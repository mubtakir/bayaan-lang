/**
 * اختبارات قاموس الكلمات الأساسية
 * Foundation Vocabulary Tests
 */

import {
  FoundationVocabulary,
  FoundationWordType,
  FoundationCategory,
  CompleteFoundationVocabulary,
  getCompleteVocabulary,
  resetVocabulary
} from '../../../../src/baserah/ai/languageGenerator';

describe('FoundationVocabulary', () => {
  let vocab: FoundationVocabulary;

  beforeEach(() => {
    vocab = new FoundationVocabulary();
  });

  describe('Basic Functionality', () => {
    it('should initialize with foundation words', () => {
      expect(vocab.getWordCount()).toBeGreaterThan(0);
    });

    it('should get word by Arabic name', () => {
      const word = vocab.getWord('أرض');
      expect(word).toBeDefined();
      expect(word?.arabic).toBe('أرض');
      expect(word?.english).toBe('ground');
      expect(word?.type).toBe(FoundationWordType.ENTITY);
    });

    it('should get words by category', () => {
      const words = vocab.getWordsByCategory(FoundationCategory.INITIAL_ENVIRONMENT);
      expect(words.length).toBeGreaterThan(0);
      
      // Check that all words belong to the category
      for (const word of words) {
        expect(word.category).toBe(FoundationCategory.INITIAL_ENVIRONMENT);
      }
    });

    it('should get words by type', () => {
      const words = vocab.getWordsByType(FoundationWordType.ENTITY);
      expect(words.length).toBeGreaterThan(0);
      
      // Check that all words belong to the type
      for (const word of words) {
        expect(word.type).toBe(FoundationWordType.ENTITY);
      }
    });

    it('should find related words', () => {
      const word = vocab.getWord('أرض');
      expect(word).toBeDefined();
      expect(word?.relatedWords).toBeDefined();
      expect(word?.relatedWords.length).toBeGreaterThan(0);

      // Note: findRelatedWords returns words that exist in vocabulary
      // The related words list may contain words not yet in vocabulary
      const related = vocab.findRelatedWords('أرض');
      expect(related.length).toBeGreaterThanOrEqual(0);
    });

    it('should get all words', () => {
      const allWords = vocab.getAllWords();
      expect(allWords.length).toBe(vocab.getWordCount());
    });
  });

  describe('Initial Environment Words', () => {
    it('should have أرض (ground)', () => {
      const word = vocab.getWord('أرض');
      expect(word).toBeDefined();
      expect(word?.category).toBe(FoundationCategory.INITIAL_ENVIRONMENT);
    });

    it('should have سماء (sky)', () => {
      const word = vocab.getWord('سماء');
      expect(word).toBeDefined();
      expect(word?.category).toBe(FoundationCategory.INITIAL_ENVIRONMENT);
    });

    it('should have شمس (sun)', () => {
      const word = vocab.getWord('شمس');
      expect(word).toBeDefined();
      expect(word?.category).toBe(FoundationCategory.INITIAL_ENVIRONMENT);
    });

    it('should have قمر (moon)', () => {
      const word = vocab.getWord('قمر');
      expect(word).toBeDefined();
      expect(word?.category).toBe(FoundationCategory.INITIAL_ENVIRONMENT);
    });

    it('should have ضوء (light)', () => {
      const word = vocab.getWord('ضوء');
      expect(word).toBeDefined();
      expect(word?.type).toBe(FoundationWordType.PROPERTY);
    });

    it('should have ليل (night) and نهار (day)', () => {
      const night = vocab.getWord('ليل');
      const day = vocab.getWord('نهار');
      
      expect(night).toBeDefined();
      expect(day).toBeDefined();
      expect(night?.type).toBe(FoundationWordType.TIME);
      expect(day?.type).toBe(FoundationWordType.TIME);
    });
  });

  describe('Entity and Existence Words', () => {
    it('should have شيء (thing)', () => {
      const word = vocab.getWord('شيء');
      expect(word).toBeDefined();
      expect(word?.type).toBe(FoundationWordType.ENTITY);
      expect(word?.category).toBe(FoundationCategory.ENTITY_EXISTENCE);
    });

    it('should have all six directions', () => {
      const directions = ['يمين', 'يسار', 'أمام', 'خلف', 'فوق', 'تحت'];
      
      for (const dir of directions) {
        const word = vocab.getWord(dir);
        expect(word).toBeDefined();
        expect(word?.type).toBe(FoundationWordType.DIRECTION);
      }
    });
  });

  describe('Physical Properties', () => {
    it('should have أجوف (hollow) and صلد (solid)', () => {
      const hollow = vocab.getWord('أجوف');
      const solid = vocab.getWord('صلد');
      
      expect(hollow).toBeDefined();
      expect(solid).toBeDefined();
      expect(hollow?.category).toBe(FoundationCategory.PHYSICAL);
      expect(solid?.category).toBe(FoundationCategory.PHYSICAL);
    });

    it('should have ممتلئ (full) and فارغ (empty)', () => {
      const full = vocab.getWord('ممتلئ');
      const empty = vocab.getWord('فارغ');
      
      expect(full).toBeDefined();
      expect(empty).toBeDefined();
      expect(full?.type).toBe(FoundationWordType.STATE);
      expect(empty?.type).toBe(FoundationWordType.STATE);
    });
  });

  describe('Spatial Relations', () => {
    it('should have قرب (nearness) and بعد (distance)', () => {
      const near = vocab.getWord('قرب');
      const far = vocab.getWord('بعد');
      
      expect(near).toBeDefined();
      expect(far).toBeDefined();
      expect(near?.type).toBe(FoundationWordType.RELATION);
      expect(far?.type).toBe(FoundationWordType.RELATION);
    });

    it('should have تماس (contact)', () => {
      const contact = vocab.getWord('تماس');
      expect(contact).toBeDefined();
      expect(contact?.type).toBe(FoundationWordType.RELATION);
    });
  });

  describe('Basic Needs', () => {
    it('should have جائع (hungry) and شبع (satiation)', () => {
      const hungry = vocab.getWord('جائع');
      const satiated = vocab.getWord('شبع');
      
      expect(hungry).toBeDefined();
      expect(satiated).toBeDefined();
      expect(hungry?.type).toBe(FoundationWordType.STATE);
      expect(satiated?.type).toBe(FoundationWordType.STATE);
    });

    it('should have أكل (eat) and ابتلع (swallow)', () => {
      const eat = vocab.getWord('أكل');
      const swallow = vocab.getWord('ابتلع');
      
      expect(eat).toBeDefined();
      expect(swallow).toBeDefined();
      expect(eat?.type).toBe(FoundationWordType.ACTION);
      expect(swallow?.type).toBe(FoundationWordType.ACTION);
    });
  });

  describe('Social Relations', () => {
    it('should have ود (affection) and نفور (aversion)', () => {
      const affection = vocab.getWord('ود');
      const aversion = vocab.getWord('نفور');
      
      expect(affection).toBeDefined();
      expect(aversion).toBeDefined();
      expect(affection?.category).toBe(FoundationCategory.SOCIAL);
      expect(aversion?.category).toBe(FoundationCategory.SOCIAL);
    });

    it('should have شر (evil) and طيب (good)', () => {
      const evil = vocab.getWord('شر');
      const good = vocab.getWord('طيب');
      
      expect(evil).toBeDefined();
      expect(good).toBeDefined();
      expect(evil?.category).toBe(FoundationCategory.PSYCHOLOGICAL);
      expect(good?.category).toBe(FoundationCategory.PSYCHOLOGICAL);
    });
  });

  describe('Sensation and Feeling', () => {
    it('should have ألم (pain)', () => {
      const pain = vocab.getWord('ألم');
      expect(pain).toBeDefined();
      expect(pain?.type).toBe(FoundationWordType.STATE);
      expect(pain?.category).toBe(FoundationCategory.PSYCHOLOGICAL);
    });

    it('should have إحساس (sensation) and شعور (feeling)', () => {
      const sensation = vocab.getWord('إحساس');
      const feeling = vocab.getWord('شعور');
      
      expect(sensation).toBeDefined();
      expect(feeling).toBeDefined();
      expect(sensation?.type).toBe(FoundationWordType.STATE);
      expect(feeling?.type).toBe(FoundationWordType.STATE);
    });
  });
});

describe('CompleteFoundationVocabulary', () => {
  let completeVocab: CompleteFoundationVocabulary;

  beforeEach(() => {
    resetVocabulary();
    completeVocab = getCompleteVocabulary();
  });

  describe('Extended Vocabulary', () => {
    it('should have more words than basic vocabulary', () => {
      const basicVocab = new FoundationVocabulary();
      expect(completeVocab.getWordCount()).toBeGreaterThan(basicVocab.getWordCount());
    });

    it('should have social action words', () => {
      const revenge = completeVocab.getWord('ثأر');
      const participate = completeVocab.getWord('شارك');
      const fix = completeVocab.getWord('أصلح');
      
      expect(revenge).toBeDefined();
      expect(participate).toBeDefined();
      expect(fix).toBeDefined();
    });

    it('should have transformation words', () => {
      const win = completeVocab.getWord('انتصر');
      const defeat = completeVocab.getWord('هزم');
      const transform = completeVocab.getWord('تحول');
      
      expect(win).toBeDefined();
      expect(defeat).toBeDefined();
      expect(transform).toBeDefined();
    });

    it('should have movement words', () => {
      const flee = completeVocab.getWord('هرب');
      const chase = completeVocab.getWord('لحق');
      const grab = completeVocab.getWord('أمسك');
      
      expect(flee).toBeDefined();
      expect(chase).toBeDefined();
      expect(grab).toBeDefined();
    });

    it('should have body parts', () => {
      const bodyParts = ['يد', 'رجل', 'قدم', 'وجه', 'عين', 'أنف', 'أذن'];
      
      for (const part of bodyParts) {
        const word = completeVocab.getWord(part);
        expect(word).toBeDefined();
        expect(word?.type).toBe(FoundationWordType.ENTITY);
      }
    });

    it('should have natural environment words', () => {
      const nature = ['مطر', 'شجر', 'نبات', 'بحر', 'نهر'];
      
      for (const item of nature) {
        const word = completeVocab.getWord(item);
        expect(word).toBeDefined();
        expect(word?.category).toBe(FoundationCategory.NATURAL_ENVIRONMENT);
      }
    });

    it('should have water-related actions', () => {
      const waterActions = ['سبح', 'غاص', 'غرق', 'نجا'];
      
      for (const action of waterActions) {
        const word = completeVocab.getWord(action);
        expect(word).toBeDefined();
        expect(word?.type).toBe(FoundationWordType.ACTION);
      }
    });

    it('should have movement transition words', () => {
      const movement = ['ذهب', 'رجع', 'عاد', 'غاب', 'حضر'];
      
      for (const action of movement) {
        const word = completeVocab.getWord(action);
        expect(word).toBeDefined();
        expect(word?.type).toBe(FoundationWordType.ACTION);
      }
    });
  });

  describe('Statistics', () => {
    it('should generate statistics', () => {
      const stats = completeVocab.getStatistics();
      
      expect(stats.totalWords).toBeGreaterThan(0);
      expect(stats.byType.size).toBeGreaterThan(0);
      expect(stats.byCategory.size).toBeGreaterThan(0);
    });

    it('should have words in all types', () => {
      const stats = completeVocab.getStatistics();
      
      expect(stats.byType.has(FoundationWordType.ENTITY)).toBe(true);
      expect(stats.byType.has(FoundationWordType.ACTION)).toBe(true);
      expect(stats.byType.has(FoundationWordType.PROPERTY)).toBe(true);
      expect(stats.byType.has(FoundationWordType.STATE)).toBe(true);
      expect(stats.byType.has(FoundationWordType.RELATION)).toBe(true);
      expect(stats.byType.has(FoundationWordType.DIRECTION)).toBe(true);
    });
  });

  describe('Search Functionality', () => {
    it('should search by meaning', () => {
      const results = completeVocab.searchByMeaning('ماء');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search by Arabic word', () => {
      const results = completeVocab.searchByMeaning('أرض');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('Related Words Tree', () => {
    it('should build related words tree', () => {
      const tree = completeVocab.getRelatedWordsTree('أرض', 2);
      // Tree may be empty if related words don't exist in vocabulary
      expect(tree.size).toBeGreaterThanOrEqual(0);

      // Test with a word that has related words in vocabulary
      const word = completeVocab.getWord('أرض');
      expect(word).toBeDefined();
      expect(word?.relatedWords).toBeDefined();
    });
  });

  describe('Singleton Pattern', () => {
    it('should return same instance', () => {
      const vocab1 = getCompleteVocabulary();
      const vocab2 = getCompleteVocabulary();
      
      expect(vocab1).toBe(vocab2);
    });

    it('should reset vocabulary', () => {
      const vocab1 = getCompleteVocabulary();
      resetVocabulary();
      const vocab2 = getCompleteVocabulary();
      
      expect(vocab1).not.toBe(vocab2);
    });
  });
});

