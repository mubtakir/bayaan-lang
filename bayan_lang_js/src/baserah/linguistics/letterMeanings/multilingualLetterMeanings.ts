/**
 * Multilingual Letter Meanings Manager
 * مدير معاني الحروف متعدد اللغات
 * 
 * Supports both Arabic and English letter semantic analysis
 * يدعم التحليل الدلالي للحروف العربية والإنجليزية
 */

import { LetterMeaningAnalyzer, LetterMeaning, MeaningSource } from './letterMeaningAnalyzer';
import { 
  ENGLISH_LETTER_MEANINGS, 
  initializeEnglishLetterMeanings,
  analyzeEnglishWord,
  getPhoneticInfo 
} from './englishLetterMeanings';

export type SupportedLanguage = 'arabic' | 'english' | 'both';

export interface MultilingualAnalysisResult {
  word: string;
  language: SupportedLanguage;
  letters: string[];
  meanings: string[];
  phonetics?: string[];
  confidence: number;
}

/**
 * Multilingual Letter Meanings Manager
 * مدير معاني الحروف متعدد اللغات
 */
export class MultilingualLetterMeaningsManager {
  private arabicAnalyzer: LetterMeaningAnalyzer;
  private englishMeanings: Map<string, LetterMeaning[]>;
  
  constructor() {
    this.arabicAnalyzer = new LetterMeaningAnalyzer();
    this.englishMeanings = initializeEnglishLetterMeanings();
    
    // Initialize with default Arabic meanings
    this.initializeArabicMeanings();
  }
  
  /**
   * Initialize default Arabic letter meanings
   * تهيئة معاني الحروف العربية الافتراضية
   */
  private initializeArabicMeanings(): void {
    // Based on 40 years of research
    const arabicMeanings = [
      { letter: 'ل', meanings: ['لين', 'تكرار'], examples: ['ليلى', 'لطيف'] },
      { letter: 'ي', meanings: ['اتصال', 'تطلع'], examples: ['يد', 'يوم'] },
      { letter: 'ى', meanings: ['امتداد'], examples: ['ليلى', 'موسى'] },
      { letter: 'م', meanings: ['جمع', 'ضم'], examples: ['محمد', 'مجموع'] },
      { letter: 'ح', meanings: ['حياة', 'حركة'], examples: ['حي', 'حركة'] },
      { letter: 'د', meanings: ['ثبات', 'دوام'], examples: ['دائم', 'دوام'] },
      { letter: 'س', meanings: ['سرعة', 'سيولة'], examples: ['سريع', 'سيل'] },
      { letter: 'ر', meanings: ['تكرار', 'دوران'], examples: ['رجع', 'دوران'] },
      { letter: 'ن', meanings: ['استمرار', 'نون'], examples: ['نهر', 'نون'] },
      { letter: 'ع', meanings: ['عمق', 'علو'], examples: ['عميق', 'عالي'] },
      { letter: 'ب', meanings: ['بداية', 'ظهور'], examples: ['بدأ', 'ظهر'] },
      { letter: 'ت', meanings: ['أنوثة', 'تاء'], examples: ['فاطمة', 'تاء'] },
      { letter: 'ك', meanings: ['تشبيه', 'كاف'], examples: ['كأن', 'كاف'] },
      { letter: 'ف', meanings: ['فصل', 'فاء'], examples: ['فصل', 'فاء'] },
      { letter: 'ق', meanings: ['قوة', 'قطع'], examples: ['قوي', 'قطع'] },
      { letter: 'و', meanings: ['جمع', 'واو'], examples: ['وصل', 'واو'] },
      { letter: 'ه', meanings: ['غياب', 'هاء'], examples: ['هو', 'هاء'] },
      { letter: 'ش', meanings: ['انتشار', 'شين'], examples: ['شمس', 'شين'] },
      { letter: 'ط', meanings: ['طمأنينة', 'طاء'], examples: ['طمأن', 'طاء'] },
      { letter: 'ز', meanings: ['زيادة', 'زاي'], examples: ['زاد', 'زاي'] },
      { letter: 'ج', meanings: ['جمع', 'جيم'], examples: ['جمع', 'جيم'] },
      { letter: 'خ', meanings: ['خروج', 'خاء'], examples: ['خرج', 'خاء'] },
      { letter: 'ذ', meanings: ['ذكر', 'ذال'], examples: ['ذكر', 'ذال'] },
      { letter: 'ص', meanings: ['صلابة', 'صاد'], examples: ['صلب', 'صاد'] },
      { letter: 'ض', meanings: ['ضغط', 'ضاد'], examples: ['ضغط', 'ضاد'] },
      { letter: 'غ', meanings: ['غياب', 'غين'], examples: ['غاب', 'غين'] },
      { letter: 'ظ', meanings: ['ظهور', 'ظاء'], examples: ['ظهر', 'ظاء'] },
      { letter: 'ا', meanings: ['بداية', 'وحدة'], examples: ['أحمد', 'ألف'] },
      { letter: 'ء', meanings: ['همزة', 'قطع'], examples: ['أكل', 'همزة'] }
    ];
    
    for (const { letter, meanings, examples } of arabicMeanings) {
      for (const meaning of meanings) {
        this.arabicAnalyzer.addMeaning(
          letter,
          meaning,
          'system',
          null,
          examples,
          1.0,
          1.0
        );
      }
    }
  }
  
  /**
   * Detect language of a word
   * كشف لغة الكلمة
   */
  detectLanguage(word: string): SupportedLanguage {
    const arabicPattern = /[\u0600-\u06FF]/;
    const englishPattern = /[a-zA-Z]/;
    
    const hasArabic = arabicPattern.test(word);
    const hasEnglish = englishPattern.test(word);
    
    if (hasArabic && hasEnglish) return 'both';
    if (hasArabic) return 'arabic';
    if (hasEnglish) return 'english';
    
    return 'english'; // default
  }
  
  /**
   * Analyze a word in any supported language
   * تحليل كلمة بأي لغة مدعومة
   */
  analyzeWord(word: string): MultilingualAnalysisResult {
    const language = this.detectLanguage(word);
    
    if (language === 'arabic') {
      return this.analyzeArabicWord(word);
    } else if (language === 'english') {
      return this.analyzeEnglishWordInternal(word);
    } else {
      // Mixed language - analyze both
      return this.analyzeMixedWord(word);
    }
  }
  
  /**
   * Analyze Arabic word
   * تحليل كلمة عربية
   */
  private analyzeArabicWord(word: string): MultilingualAnalysisResult {
    const letters = word.split('');
    const meanings: string[] = [];
    
    for (const letter of letters) {
      const letterMeanings = this.arabicAnalyzer.getMeanings(letter);
      for (const meaning of letterMeanings) {
        meanings.push(meaning.meaning);
      }
    }
    
    const uniqueMeanings = [...new Set(meanings)];
    
    return {
      word,
      language: 'arabic',
      letters,
      meanings: uniqueMeanings,
      confidence: 1.0
    };
  }
  
  /**
   * Analyze English word
   * تحليل كلمة إنجليزية
   */
  private analyzeEnglishWordInternal(word: string): MultilingualAnalysisResult {
    const analysis = analyzeEnglishWord(word);
    
    return {
      word: analysis.word,
      language: 'english',
      letters: analysis.letters,
      meanings: analysis.meanings,
      phonetics: analysis.phonetics,
      confidence: 0.5 // Lower confidence for placeholder meanings
    };
  }
  
  /**
   * Analyze mixed language word
   * تحليل كلمة مختلطة
   */
  private analyzeMixedWord(word: string): MultilingualAnalysisResult {
    const letters = word.split('');
    const meanings: string[] = [];
    const phonetics: string[] = [];
    
    for (const letter of letters) {
      // Try Arabic first
      const arabicMeanings = this.arabicAnalyzer.getMeanings(letter);
      if (arabicMeanings.length > 0) {
        for (const meaning of arabicMeanings) {
          meanings.push(meaning.meaning);
        }
      } else {
        // Try English
        const englishData = getPhoneticInfo(letter);
        if (englishData) {
          meanings.push(...englishData.meanings);
          phonetics.push(englishData.phonetic);
        }
      }
    }
    
    const uniqueMeanings = [...new Set(meanings)];
    
    return {
      word,
      language: 'both',
      letters,
      meanings: uniqueMeanings,
      phonetics,
      confidence: 0.7
    };
  }
  
  /**
   * Add custom meaning for any language
   * إضافة معنى مخصص لأي لغة
   */
  addMeaning(
    letter: string,
    meaning: string,
    language: SupportedLanguage = 'english',
    examples: string[] = [],
    strength: number = 1.0,
    confidence: number = 1.0
  ): LetterMeaning {
    if (language === 'arabic' || this.detectLanguage(letter) === 'arabic') {
      return this.arabicAnalyzer.addMeaning(
        letter,
        meaning,
        'developer',
        null,
        examples,
        strength,
        confidence
      );
    } else {
      // Add to English meanings
      const id = `en_custom_${Date.now()}`;
      const letterMeaning: LetterMeaning = {
        id,
        letter: letter.toLowerCase(),
        meaning,
        opposite: null,
        examples,
        strength,
        confidence,
        source: 'developer',
        wordsCount: examples.length,
        timestamp: Date.now()
      };
      
      if (!this.englishMeanings.has(letter.toLowerCase())) {
        this.englishMeanings.set(letter.toLowerCase(), []);
      }
      
      this.englishMeanings.get(letter.toLowerCase())!.push(letterMeaning);
      
      return letterMeaning;
    }
  }
  
  /**
   * Get all meanings for a letter in any language
   * الحصول على جميع معاني حرف بأي لغة
   */
  getMeanings(letter: string): LetterMeaning[] {
    const language = this.detectLanguage(letter);
    
    if (language === 'arabic') {
      return this.arabicAnalyzer.getMeanings(letter);
    } else {
      return this.englishMeanings.get(letter.toLowerCase()) || [];
    }
  }
  
  /**
   * Get statistics about the multilingual system
   * الحصول على إحصائيات النظام متعدد اللغات
   */
  getStatistics(): {
    arabicLetters: number;
    englishLetters: number;
    totalMeanings: number;
    arabicMeanings: number;
    englishMeanings: number;
  } {
    const arabicStats = this.arabicAnalyzer.getStatistics();
    
    let englishMeaningsCount = 0;
    for (const meanings of this.englishMeanings.values()) {
      englishMeaningsCount += meanings.length;
    }
    
    return {
      arabicLetters: arabicStats.totalLetters,
      englishLetters: this.englishMeanings.size,
      totalMeanings: arabicStats.totalMeanings + englishMeaningsCount,
      arabicMeanings: arabicStats.totalMeanings,
      englishMeanings: englishMeaningsCount
    };
  }
}

/**
 * Global instance for easy access
 * نسخة عامة للوصول السهل
 */
export const multilingualLetterMeanings = new MultilingualLetterMeaningsManager();

