/**
 * التكامل اللغوي - Linguistic Integration
 * 
 * يربط بين محرك تحليل الحروف ونظام المعرفة
 * Creates Things automatically from Arabic word analysis
 */

import { LetterEngine, WordAnalysis } from '../linguistics/letterEngine';
import { ThingEngine, Thing, ThingProperty, PropertyType, ThingState, StateType } from '../knowledge/thingEngine';
import { InferenceEngine } from '../knowledge/inferenceEngine';
import { CausalEngine, RelationType } from '../../logic/causalEngine';

/**
 * محرك التكامل اللغوي
 * Linguistic Integration Engine
 */
export class LinguisticIntegration {
  private letterEngine: LetterEngine;
  private thingEngine: ThingEngine;
  private inferenceEngine: InferenceEngine;
  private causalEngine: CausalEngine;

  constructor(
    letterEngine?: LetterEngine,
    thingEngine?: ThingEngine,
    inferenceEngine?: InferenceEngine,
    causalEngine?: CausalEngine
  ) {
    this.letterEngine = letterEngine || new LetterEngine();
    this.thingEngine = thingEngine || new ThingEngine();
    this.causalEngine = causalEngine || new CausalEngine();
    this.inferenceEngine = inferenceEngine || new InferenceEngine();
  }

  /**
   * إنشاء Thing من تحليل كلمة عربية
   * Create Thing from Arabic word analysis
   * 
   * مثال: "شجرة" -> Thing بخصائص مستنتجة من معاني الحروف
   */
  createThingFromWord(word: string, category?: string): Thing | null {
    // تحليل الكلمة
    const analysis = this.letterEngine.analyzeWord(word);
    if (!analysis) {
      return null;
    }

    // إنشاء Thing
    const thing = new Thing(word, category || this.inferCategoryFromAnalysis(analysis));

    // إضافة خصائص من معاني الحروف
    this.addPropertiesFromAnalysis(thing, analysis);

    // إضافة حالات من معاني الحروف
    this.addStatesFromAnalysis(thing, analysis);

    // إضافة Thing إلى المحرك
    this.thingEngine.addThing(thing);

    return thing;
  }

  /**
   * استنتاج الفئة من التحليل
   * Infer category from analysis
   */
  private inferCategoryFromAnalysis(analysis: WordAnalysis): string {
    const meanings = analysis.wordMeanings;

    // قواعد بسيطة لاستنتاج الفئة
    if (meanings.some((m: string) => m.includes('نبات') || m.includes('شجر'))) {
      return 'نبات';
    }
    if (meanings.some((m: string) => m.includes('حيوان') || m.includes('طير'))) {
      return 'حيوان';
    }
    if (meanings.some((m: string) => m.includes('إنسان') || m.includes('شخص'))) {
      return 'إنسان';
    }
    if (meanings.some((m: string) => m.includes('مادة') || m.includes('معدن'))) {
      return 'مادة';
    }

    return 'عام'; // فئة عامة
  }

  /**
   * إضافة خصائص من التحليل
   * Add properties from analysis
   */
  private addPropertiesFromAnalysis(thing: Thing, analysis: WordAnalysis): void {
    // خاصية: المعاني المستنتجة
    thing.addProperty(new ThingProperty(
      'معاني_الكلمة',
      analysis.wordMeanings,
      PropertyType.LITERARY
    ));

    // خاصية: درجة الثقة في التحليل
    thing.addProperty(new ThingProperty(
      'ثقة_التحليل',
      analysis.confidence,
      PropertyType.MATHEMATICAL,
      '%'
    ));

    // خاصية: عدد الحروف
    thing.addProperty(new ThingProperty(
      'عدد_الحروف',
      analysis.letters.length,
      PropertyType.MATHEMATICAL
    ));

    // استنتاج خصائص إضافية من المعاني
    for (const meaning of analysis.wordMeanings) {
      // إذا كان المعنى يحتوي على "متفرع" -> خاصية التفرع
      if (meaning.includes('متفرع') || meaning.includes('تشعب')) {
        thing.addProperty(new ThingProperty(
          'متفرع',
          true,
          PropertyType.GEOMETRIC
        ));
      }

      // إذا كان المعنى يحتوي على "ثمار" -> خاصية الإثمار
      if (meaning.includes('ثمار') || meaning.includes('ثمرة')) {
        thing.addProperty(new ThingProperty(
          'مثمر',
          true,
          PropertyType.BIOLOGICAL
        ));
      }

      // إذا كان المعنى يحتوي على "جذع" -> خاصية الجذع
      if (meaning.includes('جذع') || meaning.includes('وتد')) {
        thing.addProperty(new ThingProperty(
          'له_جذع',
          true,
          PropertyType.PHYSICAL
        ));
      }
    }
  }

  /**
   * إضافة حالات من التحليل
   * Add states from analysis
   */
  private addStatesFromAnalysis(thing: Thing, analysis: WordAnalysis): void {
    // استنتاج حالات من المعاني
    for (const meaning of analysis.wordMeanings) {
      // حالة النمو
      if (meaning.includes('نبات') || meaning.includes('شجر')) {
        thing.addState(new ThingState('نامي', StateType.ACTIVE, true));
      }

      // حالة الانتشار
      if (meaning.includes('انتشار') || meaning.includes('تشتت')) {
        thing.addState(new ThingState('منتشر', StateType.ACTIVE, true));
      }

      // حالة الإثمار
      if (meaning.includes('ثمار') || meaning.includes('ثمرة')) {
        thing.addState(new ThingState('مثمر', StateType.ACTIVE, true));
      }
    }
  }

  /**
   * تحليل كلمة وإنشاء Thing مع علاقات سببية
   * Analyze word and create Thing with causal relations
   */
  createThingWithCausalRelations(word: string, category?: string): Thing | null {
    const thing = this.createThingFromWord(word, category);
    if (!thing) {
      return null;
    }

    // إضافة علاقات سببية من السلسلة السببية
    const analysis = this.letterEngine.analyzeWord(word);
    if (analysis && analysis.causalChain.length > 1) {
      for (let i = 0; i < analysis.causalChain.length - 1; i++) {
        const from = analysis.causalChain[i];
        const to = analysis.causalChain[i + 1];
        
        // إضافة العلاقة السببية
        this.causalEngine.addRelation(from, to, RelationType.CAUSES, 0.9);
      }
    }

    return thing;
  }

  /**
   * توليد كلمة جديدة من Thing
   * Generate new word from Thing
   * 
   * عكس العملية: من Thing إلى كلمة عربية
   */
  generateWordFromThing(thing: Thing): string[] {
    const suggestions: string[] = [];

    // الحصول على خصائص Thing
    const properties = thing.getAllProperties();
    const states = thing.getAllStates();

    // استخراج المعاني المطلوبة
    const desiredMeanings: string[] = [];

    for (const prop of properties) {
      if (prop.value === true) {
        desiredMeanings.push(prop.name);
      }
    }

    for (const state of states) {
      if (state.active) {
        desiredMeanings.push(state.name);
      }
    }

    // البحث عن حروف تحمل هذه المعاني
    // هذه عملية معقدة تحتاج إلى خوارزمية توليد
    // حالياً نرجع اقتراحات بسيطة

    // مثال: إذا كان Thing يحتوي على "متفرع" و "مثمر"
    // نقترح حروف: ش (تشعب) + ج (التحام) + ر (تدفق) + ة (ثمرة) = شجرة

    return suggestions;
  }

  /**
   * تحليل جملة كاملة وإنشاء Things
   * Analyze full sentence and create Things
   */
  analyzeSentence(sentence: string): Thing[] {
    const things: Thing[] = [];

    // استخراج الكلمات العربية
    const arabicWords = sentence.match(/[\u0600-\u06FF]+/g) || [];

    for (const word of arabicWords) {
      // تجاهل الكلمات القصيرة جداً أو الكلمات الشائعة
      if (word.length > 2 && !this.isCommonWord(word)) {
        const thing = this.createThingFromWord(word);
        if (thing) {
          things.push(thing);
        }
      }
    }

    return things;
  }

  /**
   * هل الكلمة شائعة؟
   * Is word common?
   */
  private isCommonWord(word: string): boolean {
    const commonWords = [
      'في', 'من', 'إلى', 'على', 'عن', 'مع', 'هذا', 'ذلك', 'التي', 'الذي',
      'هو', 'هي', 'أن', 'إن', 'كان', 'يكون', 'ما', 'لا', 'نعم', 'كل',
      'بعض', 'كثير', 'قليل', 'جداً', 'أيضاً', 'لكن', 'ولكن', 'ثم', 'أو'
    ];

    return commonWords.includes(word);
  }

  /**
   * إنشاء قاعدة استنتاج من تحليل كلمة
   * Create inference rule from word analysis
   */
  createInferenceRuleFromWord(word: string): void {
    const analysis = this.letterEngine.analyzeWord(word);
    if (!analysis) {
      return;
    }

    // إنشاء قاعدة: إذا كان الشيء يحمل معاني الكلمة، فهو من نفس النوع
    const conditions = new Map<string, any>();

    for (const meaning of analysis.wordMeanings) {
      conditions.set(`معنى_${meaning}`, true);
    }

    this.inferenceEngine.createRuleFromObservation(
      `قاعدة_${word}`,
      conditions,
      `الشيء هو ${word}`,
      analysis.confidence
    );
  }

  /**
   * البحث عن Things بناءً على معنى كلمة
   * Find Things based on word meaning
   */
  findThingsByWordMeaning(word: string): Thing[] {
    const analysis = this.letterEngine.analyzeWord(word);
    if (!analysis) {
      return [];
    }

    const results: Thing[] = [];
    const allThings = this.thingEngine.getAllThings();

    for (const thing of allThings) {
      // التحقق من تطابق المعاني
      const meanings = thing.getProperty('معاني_الكلمة');
      if (meanings && Array.isArray(meanings.value)) {
        // هل هناك تقاطع بين المعاني؟
        const intersection = meanings.value.filter((m: string) =>
          analysis.wordMeanings.includes(m)
        );

        if (intersection.length > 0) {
          results.push(thing);
        }
      }
    }

    return results;
  }

  // Getters
  getLetterEngine(): LetterEngine { return this.letterEngine; }
  getThingEngine(): ThingEngine { return this.thingEngine; }
  getInferenceEngine(): InferenceEngine { return this.inferenceEngine; }
  getCausalEngine(): CausalEngine { return this.causalEngine; }
}

