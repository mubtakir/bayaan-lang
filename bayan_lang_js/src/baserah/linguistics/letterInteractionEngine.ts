/**
 * محرك التفاعل بين الحروف - Letter Interaction Engine
 * 
 * نظام متقدم لحساب التآزر والتفاعل بين الحروف في الكلمات العربية
 * Advanced system for calculating synergy and interaction between Arabic letters
 * 
 * @module linguistics/letterInteractionEngine
 */

import { LetterEngine, WordAnalysis } from './letterEngine';

/**
 * نوع التفاعل بين حرفين
 * Type of interaction between two letters
 */
export enum InteractionType {
  SYNERGY = 'تآزر',           // الحروف تعزز بعضها
  CONFLICT = 'تضاد',          // الحروف تتعارض
  NEUTRAL = 'محايد',          // لا تأثير واضح
  AMPLIFICATION = 'تضخيم',    // الحرف الثاني يضخم الأول
  WEAKENING = 'إضعاف'         // الحرف الثاني يضعف الأول
}

/**
 * نتيجة تحليل التفاعل بين حرفين
 * Result of analyzing interaction between two letters
 */
export interface LetterInteraction {
  letter1: string;
  letter2: string;
  type: InteractionType;
  strength: number;           // قوة التفاعل (0-1)
  description: string;        // وصف التفاعل
}

/**
 * نموذج التوازن في الكلمة
 * Balance model for a word
 */
export interface WordBalance {
  word: string;
  positiveScore: number;      // درجة الإيجابية (0-1)
  negativeScore: number;      // درجة السلبية (0-1)
  materialScore: number;      // درجة المادية (0-1)
  psychologicalScore: number; // درجة النفسية (0-1)
  overallBalance: number;     // التوازن الكلي (-1 إلى 1)
  description: string;
}

/**
 * نموذج التدفق السببي
 * Causal flow model
 */
export interface CausalFlow {
  word: string;
  stages: CausalStage[];
  flowStrength: number;       // قوة التدفق (0-1)
  coherence: number;          // التماسك (0-1)
}

/**
 * مرحلة في التدفق السببي
 * Stage in causal flow
 */
export interface CausalStage {
  position: number;
  letter: string;
  meaning: string;
  contribution: number;       // مساهمة في المعنى الكلي (0-1)
}

/**
 * محرك التفاعل بين الحروف
 * Letter Interaction Engine
 */
export class LetterInteractionEngine {
  private letterEngine: LetterEngine;
  
  // قاموس الكلمات الإيجابية والسلبية
  private positiveWords = new Set([
    'حياة', 'سلام', 'فرح', 'نور', 'حب', 'أمل', 'خير', 'بركة', 'رحمة', 'هدى'
  ]);
  
  private negativeWords = new Set([
    'غضب', 'ظلام', 'حزن', 'ألم', 'شر', 'كره', 'يأس', 'ضرر', 'عذاب', 'ضلال'
  ]);
  
  // قاموس الكلمات المادية والنفسية
  private materialWords = new Set([
    'حجر', 'ماء', 'نار', 'تراب', 'جسم', 'بناء', 'طعام', 'شراب'
  ]);
  
  private psychologicalWords = new Set([
    'فكر', 'شعور', 'إحساس', 'وعي', 'إدراك', 'تأمل', 'خيال', 'ذكرى'
  ]);

  constructor() {
    this.letterEngine = new LetterEngine();
  }

  /**
   * حساب التآزر بين حرفين متجاورين
   * Calculate synergy between two adjacent letters
   */
  calculateSynergy(letter1: string, letter2: string): LetterInteraction {
    const letterMeanings1 = this.letterEngine.getLetterMeanings(letter1);
    const letterMeanings2 = this.letterEngine.getLetterMeanings(letter2);

    if (letterMeanings1.length === 0 || letterMeanings2.length === 0) {
      return {
        letter1,
        letter2,
        type: InteractionType.NEUTRAL,
        strength: 0,
        description: 'لا توجد معاني كافية للتحليل'
      };
    }

    // تحويل إلى strings
    const meanings1 = letterMeanings1.map(m => m.meaning);
    const meanings2 = letterMeanings2.map(m => m.meaning);

    // حساب التشابه الدلالي
    const similarity = this.calculateSemanticSimilarity(meanings1, meanings2);

    // حساب التكامل
    const complementarity = this.calculateComplementarity(meanings1, meanings2);
    
    // تحديد نوع التفاعل
    let type: InteractionType;
    let strength: number;
    let description: string;

    if (similarity > 0.7) {
      type = InteractionType.SYNERGY;
      strength = similarity;
      description = `الحرفان يتآزران بقوة - المعاني متشابهة ومتناغمة`;
    } else if (similarity < 0.3 && complementarity > 0.6) {
      type = InteractionType.AMPLIFICATION;
      strength = complementarity;
      description = `الحرف الثاني يضخم معنى الأول - تكامل قوي`;
    } else if (similarity < 0.2) {
      type = InteractionType.CONFLICT;
      strength = 1 - similarity;
      description = `الحرفان متعارضان - المعاني متباعدة`;
    } else if (complementarity > 0.5) {
      type = InteractionType.AMPLIFICATION;
      strength = complementarity;
      description = `تكامل جيد بين الحرفين`;
    } else {
      type = InteractionType.NEUTRAL;
      strength = 0.5;
      description = `تفاعل محايد - لا تأثير واضح`;
    }

    return { letter1, letter2, type, strength, description };
  }

  /**
   * حساب التشابه الدلالي بين مجموعتين من المعاني
   * Calculate semantic similarity between two sets of meanings
   */
  private calculateSemanticSimilarity(meanings1: string[], meanings2: string[]): number {
    if (meanings1.length === 0 || meanings2.length === 0) return 0;

    let matchCount = 0;
    const totalComparisons = Math.min(meanings1.length, meanings2.length);

    for (const m1 of meanings1.slice(0, 3)) {
      for (const m2 of meanings2.slice(0, 3)) {
        if (this.areSimilarMeanings(m1, m2)) {
          matchCount++;
        }
      }
    }

    return matchCount / (totalComparisons * 3);
  }

  /**
   * حساب التكامل بين مجموعتين من المعاني
   * Calculate complementarity between two sets of meanings
   */
  private calculateComplementarity(meanings1: string[], meanings2: string[]): number {
    // التكامل يعني أن المعاني تكمل بعضها دون تكرار
    const combined = [...meanings1.slice(0, 3), ...meanings2.slice(0, 3)];
    const unique = new Set(combined);
    
    // كلما كانت المعاني أكثر تنوعاً، كان التكامل أقوى
    const diversity = unique.size / combined.length;
    
    // لكن يجب أن تكون هناك علاقة منطقية
    const hasLogicalConnection = this.hasLogicalConnection(meanings1[0], meanings2[0]);
    
    return hasLogicalConnection ? diversity * 0.8 : diversity * 0.4;
  }

  /**
   * التحقق من التشابه بين معنيين
   * Check if two meanings are similar
   */
  private areSimilarMeanings(m1: string, m2: string): boolean {
    // كلمات مفتاحية متشابهة
    const keywords1 = this.extractKeywords(m1);
    const keywords2 = this.extractKeywords(m2);
    
    for (const k1 of keywords1) {
      for (const k2 of keywords2) {
        if (k1 === k2 || this.areSynonyms(k1, k2)) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * استخراج الكلمات المفتاحية من معنى
   * Extract keywords from a meaning
   */
  private extractKeywords(meaning: string): string[] {
    // إزالة الكلمات الشائعة والاحتفاظ بالكلمات الدلالية
    const stopWords = ['و', 'أو', 'في', 'من', 'إلى', 'على', 'عن', 'مع'];
    return meaning.split(/[\s،]+/)
      .filter(word => word.length > 1 && !stopWords.includes(word));
  }

  /**
   * التحقق من الترادف بين كلمتين
   * Check if two words are synonyms
   */
  private areSynonyms(word1: string, word2: string): boolean {
    const synonymGroups = [
      ['حياة', 'حركة', 'نشاط', 'حيوية'],
      ['ظلام', 'ظلمة', 'عتمة', 'سواد'],
      ['نور', 'ضوء', 'إشراق', 'إضاءة'],
      ['حب', 'ود', 'محبة', 'عشق'],
      ['غضب', 'سخط', 'انفعال', 'ثورة']
    ];
    
    for (const group of synonymGroups) {
      if (group.includes(word1) && group.includes(word2)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * التحقق من وجود علاقة منطقية بين معنيين
   * Check if there's a logical connection between two meanings
   */
  private hasLogicalConnection(m1: string, m2: string): boolean {
    // علاقات سببية معروفة
    const causalPairs = [
      ['حياة', 'حركة'],
      ['نور', 'ظهور'],
      ['غضب', 'غليان'],
      ['فرح', 'انفتاح'],
      ['حزن', 'انكماش']
    ];
    
    for (const [cause, effect] of causalPairs) {
      if ((m1.includes(cause) && m2.includes(effect)) ||
          (m2.includes(cause) && m1.includes(effect))) {
        return true;
      }
    }
    
    return true; // افتراضياً نعتبر أن هناك علاقة
  }

  /**
   * حساب توازن المعاني في كلمة
   * Calculate balance of meanings in a word
   */
  calculateBalance(word: string): WordBalance {
    const analysis = this.letterEngine.analyzeWord(word);
    
    let positiveScore = 0;
    let negativeScore = 0;
    let materialScore = 0;
    let psychologicalScore = 0;
    
    // تحليل كل حرف
    for (const [letter, meanings] of analysis.letterMeanings.entries()) {
      for (const meaning of meanings.slice(0, 2)) {
        // تحليل الإيجابية/السلبية
        if (this.isPositiveMeaning(meaning)) positiveScore++;
        if (this.isNegativeMeaning(meaning)) negativeScore++;
        
        // تحليل المادية/النفسية
        if (this.isMaterialMeaning(meaning)) materialScore++;
        if (this.isPsychologicalMeaning(meaning)) psychologicalScore++;
      }
    }
    
    const total = analysis.letters.length * 2;
    positiveScore /= total;
    negativeScore /= total;
    materialScore /= total;
    psychologicalScore /= total;
    
    const overallBalance = positiveScore - negativeScore;
    
    let description = '';
    if (overallBalance > 0.3) {
      description = 'كلمة إيجابية بشكل واضح';
    } else if (overallBalance < -0.3) {
      description = 'كلمة سلبية بشكل واضح';
    } else {
      description = 'كلمة متوازنة';
    }
    
    if (materialScore > psychologicalScore + 0.2) {
      description += ' - ذات طابع مادي';
    } else if (psychologicalScore > materialScore + 0.2) {
      description += ' - ذات طابع نفسي';
    }
    
    return {
      word,
      positiveScore,
      negativeScore,
      materialScore,
      psychologicalScore,
      overallBalance,
      description
    };
  }

  private isPositiveMeaning(meaning: string): boolean {
    const positiveKeywords = ['حياة', 'نور', 'فرح', 'سلام', 'حب', 'خير', 'بركة', 'رحمة'];
    return positiveKeywords.some(kw => meaning.includes(kw));
  }

  private isNegativeMeaning(meaning: string): boolean {
    const negativeKeywords = ['ظلام', 'غضب', 'حزن', 'ألم', 'شر', 'كره', 'عذاب', 'ضلال'];
    return negativeKeywords.some(kw => meaning.includes(kw));
  }

  private isMaterialMeaning(meaning: string): boolean {
    const materialKeywords = ['مادي', 'جسم', 'شكل', 'حجم', 'وزن', 'صلب', 'سائل'];
    return materialKeywords.some(kw => meaning.includes(kw));
  }

  private isPsychologicalMeaning(meaning: string): boolean {
    const psychKeywords = ['نفسي', 'شعور', 'إحساس', 'فكر', 'وعي', 'إدراك', 'انفعال'];
    return psychKeywords.some(kw => meaning.includes(kw));
  }

  /**
   * تحليل التدفق السببي في كلمة
   * Analyze causal flow in a word
   */
  analyzeCausalFlow(word: string): CausalFlow {
    const analysis = this.letterEngine.analyzeWord(word);
    const stages: CausalStage[] = [];

    let position = 0;
    for (const [letter, meanings] of analysis.letterMeanings.entries()) {
      const mainMeaning = meanings[0] || 'غير معروف';

      // حساب مساهمة هذا الحرف في المعنى الكلي
      const contribution = this.calculateContribution(position, analysis.letters.length);

      stages.push({
        position,
        letter,
        meaning: mainMeaning,
        contribution
      });

      position++;
    }

    // حساب قوة التدفق (مدى قوة الانتقال بين المراحل)
    const flowStrength = this.calculateFlowStrength(stages);

    // حساب التماسك (مدى ترابط المعاني)
    const coherence = this.calculateCoherence(stages);

    return {
      word,
      stages,
      flowStrength,
      coherence
    };
  }

  /**
   * حساب مساهمة حرف في موقع معين
   * Calculate contribution of a letter at a specific position
   */
  private calculateContribution(position: number, totalLetters: number): number {
    // الحرف الأول له وزن أكبر (البداية)
    // الحرف الأخير له وزن أكبر (النهاية/الثمرة)
    // الحروف الوسطى لها أوزان متوسطة

    if (position === 0) {
      return 0.9; // الحرف الأول: البداية والأساس
    } else if (position === totalLetters - 1) {
      return 0.85; // الحرف الأخير: النهاية والثمرة
    } else {
      // الحروف الوسطى: تتناقص تدريجياً
      const middleWeight = 0.7 - (position / totalLetters) * 0.2;
      return middleWeight;
    }
  }

  /**
   * حساب قوة التدفق بين المراحل
   * Calculate flow strength between stages
   */
  private calculateFlowStrength(stages: CausalStage[]): number {
    if (stages.length < 2) return 0;

    let totalFlow = 0;
    for (let i = 0; i < stages.length - 1; i++) {
      const stage1 = stages[i];
      const stage2 = stages[i + 1];

      // حساب قوة الانتقال بين المرحلتين
      const transitionStrength = this.calculateTransitionStrength(
        stage1.meaning,
        stage2.meaning
      );

      totalFlow += transitionStrength;
    }

    return totalFlow / (stages.length - 1);
  }

  /**
   * حساب قوة الانتقال بين معنيين
   * Calculate transition strength between two meanings
   */
  private calculateTransitionStrength(meaning1: string, meaning2: string): number {
    // إذا كان هناك علاقة سببية واضحة، الانتقال قوي
    if (this.hasLogicalConnection(meaning1, meaning2)) {
      return 0.8;
    }

    // إذا كانت المعاني متشابهة، الانتقال متوسط
    if (this.areSimilarMeanings(meaning1, meaning2)) {
      return 0.6;
    }

    // خلاف ذلك، الانتقال ضعيف
    return 0.3;
  }

  /**
   * حساب التماسك بين المراحل
   * Calculate coherence between stages
   */
  private calculateCoherence(stages: CausalStage[]): number {
    if (stages.length < 2) return 1;

    let coherenceSum = 0;
    const totalPairs = stages.length - 1;

    for (let i = 0; i < totalPairs; i++) {
      const meaning1 = stages[i].meaning;
      const meaning2 = stages[i + 1].meaning;

      // التماسك = التشابه + العلاقة المنطقية
      const similarity = this.areSimilarMeanings(meaning1, meaning2) ? 0.5 : 0;
      const connection = this.hasLogicalConnection(meaning1, meaning2) ? 0.5 : 0;

      coherenceSum += similarity + connection;
    }

    return coherenceSum / totalPairs;
  }

  /**
   * تحليل شامل لكلمة
   * Comprehensive analysis of a word
   */
  analyzeWordInteraction(word: string): {
    word: string;
    interactions: LetterInteraction[];
    balance: WordBalance;
    flow: CausalFlow;
    overallScore: number;
  } {
    const analysis = this.letterEngine.analyzeWord(word);
    const interactions: LetterInteraction[] = [];

    // حساب التفاعلات بين الحروف المتجاورة
    for (let i = 0; i < analysis.letters.length - 1; i++) {
      const letter1 = analysis.letters[i];
      const letter2 = analysis.letters[i + 1];
      const interaction = this.calculateSynergy(letter1, letter2);
      interactions.push(interaction);
    }

    // حساب التوازن
    const balance = this.calculateBalance(word);

    // حساب التدفق السببي
    const flow = this.analyzeCausalFlow(word);

    // حساب الدرجة الكلية
    const avgInteractionStrength = interactions.reduce((sum, i) => sum + i.strength, 0) / interactions.length;
    const overallScore = (
      avgInteractionStrength * 0.3 +
      Math.abs(balance.overallBalance) * 0.3 +
      flow.flowStrength * 0.2 +
      flow.coherence * 0.2
    );

    return {
      word,
      interactions,
      balance,
      flow,
      overallScore
    };
  }
}

