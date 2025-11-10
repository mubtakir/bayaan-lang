/**
 * محلل النصوص باستخدام معاني الحروف
 * Text Analyzer using Letter Meanings
 * 
 * يستخدم نظام سيماء الحروف لتحليل النصوص العربية بعمق
 * Uses letter semiotics system for deep Arabic text analysis
 */

import { LetterEngine } from '../linguistics/letterEngine';
import { LetterInteractionEngine } from '../linguistics/letterInteractionEngine';

/**
 * تحليل كلمة في النص
 * Word analysis in text
 */
export interface WordAnalysis {
    word: string;
    position: number;
    letterCount: number;
    meanings: string[];
    overallScore: number;
    balance: {
        positive: number;
        negative: number;
        material: number;
        psychological: number;
    };
    dominantTheme: string;
}

/**
 * تحليل جملة
 * Sentence analysis
 */
export interface SentenceAnalysis {
    sentence: string;
    wordCount: number;
    words: WordAnalysis[];
    overallMood: string;
    dominantMeanings: string[];
    coherenceScore: number;
    balanceScore: number;
}

/**
 * تحليل نص كامل
 * Full text analysis
 */
export interface TextAnalysis {
    text: string;
    sentenceCount: number;
    wordCount: number;
    letterCount: number;
    sentences: SentenceAnalysis[];
    overallTheme: string;
    dominantMeanings: string[];
    emotionalTone: string;
    coherenceScore: number;
    qualityScore: number;
}

/**
 * محرك تحليل النصوص
 * Text Analysis Engine
 */
export class TextAnalyzer {
    private letterEngine: LetterEngine;
    private interactionEngine: LetterInteractionEngine;

    constructor() {
        this.letterEngine = new LetterEngine();
        this.interactionEngine = new LetterInteractionEngine();
    }

    /**
     * تحليل كلمة واحدة
     * Analyze a single word
     */
    analyzeWord(word: string, position: number = 0): WordAnalysis {
        const letters = word.split('');
        const allMeanings: string[] = [];
        
        // جمع معاني جميع الحروف
        letters.forEach(letter => {
            const letterMeanings = this.letterEngine.getLetterMeanings(letter);
            letterMeanings.forEach(m => allMeanings.push(m.meaning));
        });

        // تحليل التفاعل
        const interaction = this.interactionEngine.analyzeWordInteraction(word);
        const balance = this.interactionEngine.calculateBalance(word);

        // تحديد الموضوع السائد
        const dominantTheme = this.determineDominantTheme(allMeanings, balance);

        return {
            word,
            position,
            letterCount: letters.length,
            meanings: allMeanings,
            overallScore: interaction.overallScore,
            balance: {
                positive: balance.positiveScore,
                negative: balance.negativeScore,
                material: balance.materialScore,
                psychological: balance.psychologicalScore
            },
            dominantTheme
        };
    }

    /**
     * تحليل جملة
     * Analyze a sentence
     */
    analyzeSentence(sentence: string): SentenceAnalysis {
        // تنظيف الجملة وتقسيمها إلى كلمات
        const words = sentence
            .replace(/[.,!?;:،؛]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 0);

        // تحليل كل كلمة
        const wordAnalyses = words.map((word, index) => 
            this.analyzeWord(word, index)
        );

        // جمع جميع المعاني
        const allMeanings: string[] = [];
        wordAnalyses.forEach(wa => allMeanings.push(...wa.meanings));

        // حساب المعاني السائدة
        const dominantMeanings = this.findDominantMeanings(allMeanings, 5);

        // تحديد المزاج العام
        const overallMood = this.determineOverallMood(wordAnalyses);

        // حساب التماسك
        const coherenceScore = this.calculateSentenceCoherence(wordAnalyses);

        // حساب التوازن
        const balanceScore = this.calculateSentenceBalance(wordAnalyses);

        return {
            sentence,
            wordCount: words.length,
            words: wordAnalyses,
            overallMood,
            dominantMeanings,
            coherenceScore,
            balanceScore
        };
    }

    /**
     * تحليل نص كامل
     * Analyze full text
     */
    analyzeText(text: string): TextAnalysis {
        // تقسيم النص إلى جمل
        const sentences = text
            .split(/[.!?؟]/)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        // تحليل كل جملة
        const sentenceAnalyses = sentences.map(s => this.analyzeSentence(s));

        // حساب الإحصائيات
        const wordCount = sentenceAnalyses.reduce((sum, sa) => sum + sa.wordCount, 0);
        const letterCount = text.replace(/\s/g, '').length;

        // جمع جميع المعاني
        const allMeanings: string[] = [];
        sentenceAnalyses.forEach(sa => allMeanings.push(...sa.dominantMeanings));

        // المعاني السائدة في النص
        const dominantMeanings = this.findDominantMeanings(allMeanings, 10);

        // تحديد الموضوع العام
        const overallTheme = this.determineOverallTheme(dominantMeanings);

        // تحديد النبرة العاطفية
        const emotionalTone = this.determineEmotionalTone(sentenceAnalyses);

        // حساب التماسك الكلي
        const coherenceScore = this.calculateTextCoherence(sentenceAnalyses);

        // حساب جودة النص
        const qualityScore = this.calculateTextQuality(sentenceAnalyses, coherenceScore);

        return {
            text,
            sentenceCount: sentences.length,
            wordCount,
            letterCount,
            sentences: sentenceAnalyses,
            overallTheme,
            dominantMeanings,
            emotionalTone,
            coherenceScore,
            qualityScore
        };
    }

    /**
     * تحديد الموضوع السائد لكلمة
     */
    private determineDominantTheme(meanings: string[], balance: any): string {
        if (balance.psychologicalScore > balance.materialScore) {
            return 'نفسي/انفعالي';
        } else if (balance.materialScore > balance.psychologicalScore) {
            return 'مادي/واقعي';
        } else {
            return 'متوازن';
        }
    }

    /**
     * إيجاد المعاني الأكثر تكراراً
     */
    private findDominantMeanings(meanings: string[], topN: number): string[] {
        const frequency: { [key: string]: number } = {};
        
        meanings.forEach(m => {
            frequency[m] = (frequency[m] || 0) + 1;
        });

        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([meaning]) => meaning);
    }

    /**
     * تحديد المزاج العام للجملة
     */
    private determineOverallMood(wordAnalyses: WordAnalysis[]): string {
        const avgPositive = wordAnalyses.reduce((sum, wa) => sum + wa.balance.positive, 0) / wordAnalyses.length;
        const avgNegative = wordAnalyses.reduce((sum, wa) => sum + wa.balance.negative, 0) / wordAnalyses.length;

        if (avgPositive > avgNegative + 0.2) {
            return 'إيجابي';
        } else if (avgNegative > avgPositive + 0.2) {
            return 'سلبي';
        } else {
            return 'محايد';
        }
    }

    /**
     * حساب تماسك الجملة
     */
    private calculateSentenceCoherence(wordAnalyses: WordAnalysis[]): number {
        if (wordAnalyses.length < 2) return 1.0;

        let totalCoherence = 0;
        for (let i = 0; i < wordAnalyses.length - 1; i++) {
            const score1 = wordAnalyses[i].overallScore;
            const score2 = wordAnalyses[i + 1].overallScore;
            totalCoherence += 1 - Math.abs(score1 - score2);
        }

        return totalCoherence / (wordAnalyses.length - 1);
    }

    /**
     * حساب توازن الجملة
     */
    private calculateSentenceBalance(wordAnalyses: WordAnalysis[]): number {
        const avgBalance = wordAnalyses.reduce((sum, wa) => {
            const balance = Math.abs(wa.balance.positive - wa.balance.negative);
            return sum + (1 - balance);
        }, 0) / wordAnalyses.length;

        return avgBalance;
    }

    /**
     * تحديد الموضوع العام للنص
     */
    private determineOverallTheme(dominantMeanings: string[]): string {
        // تحليل بسيط بناءً على المعاني السائدة
        const themes: { [key: string]: string[] } = {
            'الحياة والطبيعة': ['الحياة', 'الحركة', 'النمو', 'الظهور', 'النشوء'],
            'العواطف والمشاعر': ['الحب', 'الغضب', 'الحزن', 'الفرح', 'الخوف'],
            'القوة والسلطة': ['القوة', 'الشدة', 'السيطرة', 'الإحكام'],
            'المعرفة والفهم': ['الرؤية', 'الفهم', 'المعرفة', 'الإدراك'],
            'التواصل والعلاقات': ['الاتصال', 'الربط', 'التواصل', 'الجمع']
        };

        for (const [theme, keywords] of Object.entries(themes)) {
            if (dominantMeanings.some(m => keywords.some(k => m.includes(k)))) {
                return theme;
            }
        }

        return 'متنوع';
    }

    /**
     * تحديد النبرة العاطفية
     */
    private determineEmotionalTone(sentenceAnalyses: SentenceAnalysis[]): string {
        const moods = sentenceAnalyses.map(sa => sa.overallMood);
        const positiveCount = moods.filter(m => m === 'إيجابي').length;
        const negativeCount = moods.filter(m => m === 'سلبي').length;

        if (positiveCount > negativeCount * 1.5) {
            return 'متفائل';
        } else if (negativeCount > positiveCount * 1.5) {
            return 'متشائم';
        } else {
            return 'متوازن';
        }
    }

    /**
     * حساب تماسك النص
     */
    private calculateTextCoherence(sentenceAnalyses: SentenceAnalysis[]): number {
        if (sentenceAnalyses.length < 2) return 1.0;

        const avgCoherence = sentenceAnalyses.reduce((sum, sa) => sum + sa.coherenceScore, 0) / sentenceAnalyses.length;
        return avgCoherence;
    }

    /**
     * حساب جودة النص
     */
    private calculateTextQuality(sentenceAnalyses: SentenceAnalysis[], coherence: number): number {
        const avgBalance = sentenceAnalyses.reduce((sum, sa) => sum + sa.balanceScore, 0) / sentenceAnalyses.length;
        
        // الجودة = 40% تماسك + 30% توازن + 30% تنوع
        const variety = Math.min(sentenceAnalyses.length / 10, 1.0); // تنوع بناءً على عدد الجمل
        
        return coherence * 0.4 + avgBalance * 0.3 + variety * 0.3;
    }
}

