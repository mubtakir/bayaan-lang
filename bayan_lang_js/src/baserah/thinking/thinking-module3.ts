/**
 * وحدة التفكير اللغوي - Linguistic Thinking Module
 *
 * متخصصة في التحليل اللغوي الصرفي والنحوي والدلالي
 *
 * @author Basel Yahya Abdullah
 */

export interface LinguisticAnalysis {
  language: 'ar' | 'en' | 'mixed';
  wordCount: number;
  sentenceCount: number;
  morphology: {
    roots: string[];
    patterns: string[];
  };
  syntax: {
    structure: string;
    complexity: number;
  };
  semantics: {
    mainTopic: string;
    keywords: string[];
    sentiment: 'positive' | 'negative' | 'neutral';
  };
}

/**
 * وحدة التفكير اللغوي
 */
export class LinguisticThinkingModule {

  /**
   * تحليل لغوي شامل
   */
  analyze(input: any): LinguisticAnalysis {
    const text = typeof input === 'string' ? input : String(input);

    const language = this.detectLanguage(text);
    const wordCount = this.countWords(text);
    const sentenceCount = this.countSentences(text);
    const morphology = this.analyzeMorphology(text);
    const syntax = this.analyzeSyntax(text);
    const semantics = this.analyzeSemantics(text);

    return {
      language,
      wordCount,
      sentenceCount,
      morphology,
      syntax,
      semantics
    };
  }

  /**
   * كشف اللغة
   */
  private detectLanguage(text: string): 'ar' | 'en' | 'mixed' {
    const hasArabic = /[\u0600-\u06FF]/.test(text);
    const hasEnglish = /[a-zA-Z]/.test(text);

    if (hasArabic && hasEnglish) return 'mixed';
    if (hasArabic) return 'ar';
    if (hasEnglish) return 'en';
    return 'ar';
  }

  /**
   * عد الكلمات
   */
  private countWords(text: string): number {
    return text.split(/\s+/).filter(w => w.length > 0).length;
  }

  /**
   * عد الجمل
   */
  private countSentences(text: string): number {
    return text.split(/[.!?؟]/).filter(s => s.trim().length > 0).length;
  }

  /**
   * التحليل الصرفي
   */
  private analyzeMorphology(text: string): any {
    const words = text.split(/\s+/);
    const roots: string[] = [];
    const patterns: string[] = [];

    // تحليل بسيط للجذور (يمكن تحسينه)
    words.forEach(word => {
      if (word.length >= 3) {
        // استخراج جذر افتراضي (الحروف الأولى)
        roots.push(word.substring(0, 3));
      }
    });

    return { roots, patterns };
  }

  /**
   * التحليل النحوي
   */
  private analyzeSyntax(text: string): any {
    const wordCount = this.countWords(text);
    const sentenceCount = this.countSentences(text);

    let structure = 'بسيطة';
    let complexity = 1;

    if (wordCount / sentenceCount > 10) {
      structure = 'معقدة';
      complexity = 3;
    } else if (wordCount / sentenceCount > 5) {
      structure = 'متوسطة';
      complexity = 2;
    }

    return { structure, complexity };
  }

  /**
   * التحليل الدلالي
   */
  private analyzeSemantics(text: string): any {
    const words = text.split(/\s+/);
    const keywords = words.filter(w => w.length > 3).slice(0, 5);

    // تحليل المشاعر البسيط
    const positiveWords = ['جيد', 'ممتاز', 'رائع', 'good', 'excellent', 'great'];
    const negativeWords = ['سيء', 'رديء', 'bad', 'poor', 'terrible'];

    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';

    if (positiveWords.some(w => text.includes(w))) {
      sentiment = 'positive';
    } else if (negativeWords.some(w => text.includes(w))) {
      sentiment = 'negative';
    }

    return {
      mainTopic: keywords[0] || 'غير محدد',
      keywords,
      sentiment
    };
  }
}

// تصدير للتوافق مع الاسم القديم
export class ThinkingModule3 extends LinguisticThinkingModule {}
