/**
 * محرك تحليل الحروف والكلمات
 * Letter and Word Analysis Engine
 * 
 * يطبق نظرية العلاقات السببية بين معاني الحروف
 * Applies the theory of causal relationships between letter meanings
 */

import { CausalEngine, RelationType } from '../../logic/causalEngine';

/**
 * نوع المعنى - Meaning Type
 */
export enum MeaningType {
  PRIMARY = 'أساسي',           // Primary meaning
  SECONDARY = 'ثانوي',         // Secondary meaning
  OPPOSITE = 'عكسي',           // Opposite meaning
  RESULT = 'نتيجة',            // Result/consequence
  CAUSE = 'سبب',               // Cause/reason
  MECHANISM = 'آلية'           // Mechanism/process
}

/**
 * موضع المعنى في الكلمة - Meaning Position
 */
export enum MeaningPosition {
  BEGINNING = 'بداية',         // At the beginning
  MIDDLE = 'وسط',              // In the middle
  END = 'نهاية',               // At the end
  THROUGHOUT = 'شامل'          // Throughout the word
}

/**
 * معنى الحرف - Letter Meaning
 */
export class LetterMeaning {
  constructor(
    public letter: string,              // الحرف - The letter
    public meaning: string,             // المعنى - The meaning
    public type: MeaningType,           // نوع المعنى - Meaning type
    public weight: number = 1.0,        // الوزن/القوة (0-1) - Weight/strength
    public examples: string[] = []      // أمثلة - Examples
  ) {}

  toString(): string {
    return `${this.letter} → ${this.meaning} (${this.type}, ${this.weight})`;
  }
}

/**
 * تحليل الكلمة - Word Analysis
 */
export class WordAnalysis {
  constructor(
    public word: string,                           // الكلمة - The word
    public letters: string[],                      // الحروف - The letters
    public letterMeanings: Map<string, string[]>,  // معاني كل حرف - Meanings of each letter
    public wordMeanings: string[],                 // معاني الكلمة المستنتجة - Inferred word meanings
    public causalChain: string[],                  // السلسلة السببية - Causal chain
    public confidence: number                      // درجة الثقة - Confidence score
  ) {}

  toString(): string {
    let result = `\n=== تحليل كلمة: ${this.word} ===\n`;
    result += `الحروف: ${this.letters.join(', ')}\n\n`;
    
    result += `معاني الحروف:\n`;
    for (const [letter, meanings] of this.letterMeanings.entries()) {
      result += `  ${letter}: ${meanings.join(', ')}\n`;
    }
    
    result += `\nالسلسلة السببية:\n  ${this.causalChain.join(' → ')}\n`;
    result += `\nمعاني الكلمة المستنتجة:\n  ${this.wordMeanings.join(', ')}\n`;
    result += `\nدرجة الثقة: ${(this.confidence * 100).toFixed(1)}%\n`;
    
    return result;
  }
}

/**
 * محرك تحليل الحروف
 * Letter Analysis Engine
 */
export class LetterEngine {
  private letterMeanings: Map<string, LetterMeaning[]> = new Map();
  private causalEngine: CausalEngine = new CausalEngine();

  constructor() {
    this.initializeArabicLetters();
    this.buildCausalRelations();
  }

  /**
   * بناء العلاقات السببية من المعاني
   * Build causal relations from meanings
   */
  private buildCausalRelations(): void {
    // المعاني تم إضافتها بالفعل مع علاقاتها السببية في addLetterMeaning
    // هذه الدالة موجودة للتوافق المستقبلي
  }

  /**
   * تهيئة معاني الحروف العربية
   * Initialize Arabic letter meanings
   *
   * المعاني مستمدة من بحث 40 سنة في سيماء الحروف
   * Meanings derived from 40 years of research in letter semiotics
   */
  private initializeArabicLetters(): void {

    // ء - الهمزة
    this.addLetterMeaning('ء', 'عنصر المفاجأة', MeaningType.PRIMARY, 1.0, ['فجأة', 'بدأ', 'نشأ']);
    this.addLetterMeaning('ء', 'صوت رعب وتخويف', MeaningType.SECONDARY, 0.9, ['أخاف', 'أرعب']);

    // آ - الألف الممدودة
    this.addLetterMeaning('آ', 'علو', MeaningType.PRIMARY, 1.0, ['آفاق', 'آمال']);
    this.addLetterMeaning('آ', 'حنان', MeaningType.SECONDARY, 0.9, ['آه', 'آي']);
    this.addLetterMeaning('آ', 'تعظيم', MeaningType.PRIMARY, 0.95, ['آية', 'آلاء']);

    // ا - الألف
    this.addLetterMeaning('ا', 'الوحدة والبداية والأساس', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ا', 'الأساسيات والبدايات', MeaningType.SECONDARY, 0.7, []);

    // ب - الباء
    this.addLetterMeaning('ب', 'الاتصال والربط والدخول', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ب', 'الحركة والاتصال', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ب', 'امتلاء وتشبع', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ب', 'حمل ونقل', MeaningType.PRIMARY, 1.0, []);

    // السلسلة السببية: دك → امتلاء → بلع → حمل → نقل → تشبع
    this.addLetterMeaning('ب', 'دك', MeaningType.CAUSE, 1.0, []);
    this.addLetterMeaning('ب', 'امتلاء', MeaningType.PRIMARY, 1.0, ['دك']);
    this.addLetterMeaning('ب', 'بلع', MeaningType.MECHANISM, 1.0, ['امتلاء']);
    this.addLetterMeaning('ب', 'حمل', MeaningType.MECHANISM, 1.0, ['بلع']);
    this.addLetterMeaning('ب', 'نقل', MeaningType.MECHANISM, 1.0, ['حمل']);
    this.addLetterMeaning('ب', 'تشبع', MeaningType.RESULT, 1.0, ['امتلاء']);

    // ت - التاء
    this.addLetterMeaning('ت', 'الحركة والتغيير والتطور', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ت', 'الحركة والتطور', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ت', 'البناء', MeaningType.PRIMARY, 1.0, []);

    // ة - التاء المربوطة
    this.addLetterMeaning('ة', 'ثمرة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ة', 'نتيجة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ة', 'حصيلة', MeaningType.PRIMARY, 1.0, []);

    // ث - الثاء
    this.addLetterMeaning('ث', 'الثبات والاستقرار والتراكم', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ث', 'الثبات والاستقرار', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ث', 'البعثرة (مع عشوائية)', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ث', 'التلعثم', MeaningType.PRIMARY, 1.0, []);

    // ج - الجيم
    this.addLetterMeaning('ج', 'الجمع والتجميع والحركة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'الجمع والحركة', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ج', 'جبر الخاطر', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'جزالة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'التحام', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'تجمع', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'وتد', MeaningType.PRIMARY, 1.0, []);

    // ح - الحاء
    this.addLetterMeaning('ح', 'الحياة والحركة والدفء', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ح', 'الحياة والحركة', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ح', 'صوت المشقة (أبلغ من الجهد)', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ح', 'العطش', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ح', 'التودد', MeaningType.PRIMARY, 1.0, []);

    // خ - الخاء
    this.addLetterMeaning('خ', 'الخروج والإخراج والتحرر', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('خ', 'الخروج والتحرر', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('خ', 'صوت الخرق والاختراق', MeaningType.PRIMARY, 1.0, []);

    // د - الدال
    this.addLetterMeaning('د', 'الدخول والدعم والقوة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('د', 'الدخول والقوة', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('د', 'البدء والانتهاء', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('د', 'الثبات', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('د', 'الباب والفتح', MeaningType.PRIMARY, 1.0, []);

    // ذ - الذال
    this.addLetterMeaning('ذ', 'صوت اللذة', MeaningType.PRIMARY, 1.0, []);

    // ر - الراء
    this.addLetterMeaning('ر', 'التدفق', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ر', 'التكرار', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('ر', 'الحركة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ر', 'تدفق', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ر', 'انطلاق', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ر', 'انسيابية', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ر', 'تكرار', MeaningType.PRIMARY, 1.0, []);

    // ز - الزاي
    this.addLetterMeaning('ز', 'الانزلاق', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ز', 'التزود والتزويد', MeaningType.SECONDARY, 1.0, []);

    // س - السين
    this.addLetterMeaning('س', 'الزحف', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('س', 'الاحتكاك', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('س', 'الخفوت والتسلل', MeaningType.PRIMARY, 1.0, []);

    // ش - الشين
    this.addLetterMeaning('ش', 'التشتت والانتشار', MeaningType.PRIMARY, 1.0, []);

    // السلسلة السببية: تشتت → تشعب → انتشار
    this.addLetterMeaning('ش', 'تشتت', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ش', 'تشعب', MeaningType.PRIMARY, 1.0, ['تشتت']);
    this.addLetterMeaning('ش', 'انتشار', MeaningType.PRIMARY, 1.0, ['تشعب']);

    // ص - الصاد
    this.addLetterMeaning('ص', 'صوت قارع أقوى من السين', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ص', 'المراقبة والإنصات', MeaningType.SECONDARY, 1.0, []);

    // ض - الضاد
    this.addLetterMeaning('ض', 'ضمور', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ض', 'ركود', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('ض', 'تصاغر', MeaningType.PRIMARY, 1.0, []);

    // ط - الطاء
    this.addLetterMeaning('ط', 'الطرق والاستئذان', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ط', 'الانفلات والتحليق', MeaningType.SECONDARY, 1.0, []);

    // ظ - الظاء
    this.addLetterMeaning('ظ', 'الغلظة', MeaningType.PRIMARY, 1.0, []);

    // ع - العين
    this.addLetterMeaning('ع', 'الدفع', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ع', 'القلع', MeaningType.SECONDARY, 1.0, []);

    // غ - الغين
    this.addLetterMeaning('غ', 'صوت الغضب والغليان', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('غ', 'تغييب', MeaningType.SECONDARY, 1.0, []);

    // ف - الفاء
    this.addLetterMeaning('ف', 'فجوة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ف', 'صوت انفجار', MeaningType.SECONDARY, 1.0, []);

    // ق - القاف
    this.addLetterMeaning('ق', 'الدقة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ق', 'البُعد', MeaningType.SECONDARY, 1.0, []);

    // ك - الكاف
    this.addLetterMeaning('ك', 'العطاء', MeaningType.PRIMARY, 1.0, []);

    // ل - اللام
    this.addLetterMeaning('ل', 'السحل', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ل', 'الالتفاف', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('ل', 'الإحاطة', MeaningType.PRIMARY, 1.0, []);

    // م - الميم
    this.addLetterMeaning('م', 'الضم والتخبي', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('م', 'الرضا', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('م', 'الكتم', MeaningType.PRIMARY, 1.0, []);

    // ن - النون
    this.addLetterMeaning('ن', 'الظهور', MeaningType.PRIMARY, 1, ['بائن', 'بيان', 'تبيين']);
    this.addLetterMeaning('ن', 'النشوء', MeaningType.SECONDARY, 1, ['نشأ', 'النشئ', 'النشأة']);
    this.addLetterMeaning('ن', 'الانبثاق', MeaningType.PRIMARY, 1, ['نبغ', 'نبع']);
    this.addLetterMeaning('ن', 'صوت الأنين والاستقرار', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ن', 'الظهور والنشوء', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ن', 'رمز يقوم مقام كلمة (شيء)', MeaningType.PRIMARY, 1.0, []);

    // ه - الهاء
    this.addLetterMeaning('ه', 'الجهد والتعب', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ه', 'النتيجة والثمرة', MeaningType.SECONDARY, 1.0, []);

    // و - الواو
    this.addLetterMeaning('و', 'تعجب', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('و', 'هجوم', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('و', 'مباغتة', MeaningType.PRIMARY, 1.0, []);

    // ي - الياء
    this.addLetterMeaning('ي', 'تألم نفسي', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ي', 'حسرة', MeaningType.SECONDARY, 1.0, []);
  }

  /**
   * إضافة معنى لحرف
   * Add meaning to a letter
   */
  addLetterMeaning(
    letter: string,
    meaning: string,
    type: MeaningType,
    weight: number = 1.0,
    examples: string[] = []
  ): void {
    if (!this.letterMeanings.has(letter)) {
      this.letterMeanings.set(letter, []);
    }

    const meanings = this.letterMeanings.get(letter)!;
    const letterMeaning = new LetterMeaning(letter, meaning, type, weight, examples);
    meanings.push(letterMeaning);

    // إضافة العلاقات السببية إلى المحرك السببي
    if (examples && examples.length > 0) {
      for (const cause of examples) {
        this.causalEngine.addRelation(cause, meaning, RelationType.CAUSES, weight);
      }
    }
  }

  /**
   * الحصول على معاني حرف
   * Get meanings of a letter
   */
  getLetterMeanings(letter: string): LetterMeaning[] {
    return this.letterMeanings.get(letter) || [];
  }

  /**
   * تحليل كلمة
   * Analyze a word
   */
  analyzeWord(word: string): WordAnalysis {
    const letters = word.split('');
    const letterMeaningsMap = new Map<string, string[]>();
    const allMeanings: string[] = [];

    // جمع معاني كل حرف
    for (const letter of letters) {
      const meanings = this.getLetterMeanings(letter);
      const meaningStrings = meanings.map(m => m.meaning);
      letterMeaningsMap.set(letter, meaningStrings);
      allMeanings.push(...meaningStrings);
    }

    // بناء السلسلة السببية
    const causalChain = this.buildCausalChain(allMeanings);

    // استنتاج معاني الكلمة
    const wordMeanings = this.inferWordMeanings(word, letters, causalChain);

    // حساب درجة الثقة
    const confidence = this.calculateConfidence(letters, causalChain);

    return new WordAnalysis(
      word,
      letters,
      letterMeaningsMap,
      wordMeanings,
      causalChain,
      confidence
    );
  }

  /**
   * بناء السلسلة السببية من المعاني
   * Build causal chain from meanings
   */
  private buildCausalChain(meanings: string[]): string[] {
    if (meanings.length === 0) return [];

    // إيجاد أطول مسار سببي يربط المعاني
    let longestChain: string[] = [];

    for (let i = 0; i < meanings.length; i++) {
      for (let j = i + 1; j < meanings.length; j++) {
        const paths = this.causalEngine.findAllPaths(meanings[i], meanings[j]);
        
        for (const path of paths) {
          if (path.nodes.length > longestChain.length) {
            longestChain = path.nodes;
          }
        }
      }
    }

    return longestChain.length > 0 ? longestChain : meanings.slice(0, 3);
  }

  /**
   * استنتاج معاني الكلمة من معاني حروفها
   * Infer word meanings from letter meanings
   */
  private inferWordMeanings(word: string, _letters: string[], causalChain: string[]): string[] {
    const meanings: string[] = [];

    // المعنى الأخير في السلسلة السببية هو غالباً المعنى الرئيسي
    if (causalChain.length > 0) {
      meanings.push(causalChain[causalChain.length - 1]);
    }

    // إضافة معاني خاصة بكلمات معروفة
    if (word === 'شجرة') {
      meanings.push('نبات متفرع الأغصان ذو جذع وثمار');
    }

    return meanings;
  }

  /**
   * حساب درجة الثقة في التحليل
   * Calculate confidence in the analysis
   */
  private calculateConfidence(letters: string[], causalChain: string[]): number {
    let confidence = 0.5; // قيمة أساسية

    // زيادة الثقة بناءً على عدد الحروف المعروفة
    const knownLetters = letters.filter(l => this.letterMeanings.has(l)).length;
    confidence += (knownLetters / letters.length) * 0.3;

    // زيادة الثقة بناءً على طول السلسلة السببية
    if (causalChain.length > 2) {
      confidence += 0.2;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * الحصول على المحرك السببي
   * Get the causal engine
   */
  getCausalEngine(): CausalEngine {
    return this.causalEngine;
  }
}

