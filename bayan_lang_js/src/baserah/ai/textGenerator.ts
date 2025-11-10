/**
 * مولد النصوص الذكي باستخدام معاني الحروف
 * Intelligent Text Generator using Letter Meanings
 * 
 * يولد نصوصاً عربية بناءً على معاني محددة
 * Generates Arabic texts based on specific meanings
 */

import { LetterEngine } from '../linguistics/letterEngine';
import { LetterInteractionEngine } from '../linguistics/letterInteractionEngine';

/**
 * معايير توليد النص
 * Text generation criteria
 */
export interface GenerationCriteria {
    targetMeanings: string[];        // المعاني المطلوبة
    mood?: 'positive' | 'negative' | 'neutral';  // المزاج
    theme?: 'psychological' | 'material' | 'balanced';  // الطابع
    minWords?: number;               // الحد الأدنى للكلمات
    maxWords?: number;               // الحد الأقصى للكلمات
    coherenceLevel?: number;         // مستوى التماسك (0-1)
}

/**
 * كلمة مولدة
 * Generated word
 */
export interface GeneratedWord {
    word: string;
    score: number;
    matchedMeanings: string[];
    balance: {
        positive: number;
        negative: number;
        material: number;
        psychological: number;
    };
}

/**
 * نص مولد
 * Generated text
 */
export interface GeneratedText {
    text: string;
    words: GeneratedWord[];
    criteria: GenerationCriteria;
    matchScore: number;
    coherenceScore: number;
    qualityScore: number;
}

/**
 * محرك توليد النصوص
 * Text Generation Engine
 */
export class TextGenerator {
    private letterEngine: LetterEngine;
    private interactionEngine: LetterInteractionEngine;
    
    // قاموس الكلمات العربية (عينة)
    private arabicWords: string[] = [
        'حياة', 'نور', 'سلام', 'أمل', 'حب', 'فرح', 'سعادة', 'خير',
        'غضب', 'حزن', 'ألم', 'خوف', 'قلق', 'ضيق',
        'علم', 'فهم', 'حكمة', 'معرفة', 'إدراك',
        'قوة', 'شدة', 'صلابة', 'عزم', 'إرادة',
        'ضعف', 'وهن', 'خور', 'تراجع',
        'بداية', 'نهاية', 'وسط', 'طريق', 'سبيل',
        'سماء', 'أرض', 'ماء', 'نار', 'هواء',
        'إنسان', 'روح', 'جسد', 'عقل', 'قلب',
        'كلام', 'صمت', 'صوت', 'همس', 'صراخ',
        'نظر', 'سمع', 'لمس', 'ذوق', 'شم',
        'يوم', 'ليل', 'صباح', 'مساء', 'فجر',
        'شمس', 'قمر', 'نجم', 'كوكب', 'فلك',
        'بحر', 'نهر', 'جبل', 'وادي', 'صحراء',
        'شجر', 'زهر', 'ثمر', 'ورق', 'جذر',
        'طير', 'سمك', 'حيوان', 'نبات', 'جماد'
    ];

    constructor() {
        this.letterEngine = new LetterEngine();
        this.interactionEngine = new LetterInteractionEngine();
    }

    /**
     * توليد نص بناءً على معايير محددة
     * Generate text based on specific criteria
     */
    generateText(criteria: GenerationCriteria): GeneratedText {
        const minWords = criteria.minWords || 5;
        const maxWords = criteria.maxWords || 15;
        const targetWordCount = Math.floor((minWords + maxWords) / 2);

        // إيجاد الكلمات المناسبة
        const candidateWords = this.findMatchingWords(criteria);

        // اختيار أفضل الكلمات
        const selectedWords = this.selectBestWords(
            candidateWords,
            targetWordCount,
            criteria
        );

        // ترتيب الكلمات لتحقيق أفضل تماسك
        const orderedWords = this.orderWordsForCoherence(selectedWords);

        // بناء النص
        const text = orderedWords.map(w => w.word).join(' ');

        // حساب الدرجات
        const matchScore = this.calculateMatchScore(orderedWords, criteria);
        const coherenceScore = this.calculateCoherenceScore(orderedWords);
        const qualityScore = (matchScore + coherenceScore) / 2;

        return {
            text,
            words: orderedWords,
            criteria,
            matchScore,
            coherenceScore,
            qualityScore
        };
    }

    /**
     * توليد كلمة بناءً على معنى محدد
     * Generate a word based on specific meaning
     */
    generateWordForMeaning(meaning: string): GeneratedWord | null {
        // البحث عن كلمات تحتوي على المعنى المطلوب
        for (const word of this.arabicWords) {
            const letters = word.split('');
            const allMeanings: string[] = [];

            letters.forEach(letter => {
                const letterMeanings = this.letterEngine.getLetterMeanings(letter);
                letterMeanings.forEach(m => allMeanings.push(m.meaning));
            });

            if (allMeanings.some(m => m.includes(meaning) || meaning.includes(m))) {
                const interaction = this.interactionEngine.analyzeWordInteraction(word);
                const balance = this.interactionEngine.calculateBalance(word);

                return {
                    word,
                    score: interaction.overallScore,
                    matchedMeanings: allMeanings.filter(m => m.includes(meaning) || meaning.includes(m)),
                    balance: {
                        positive: balance.positiveScore,
                        negative: balance.negativeScore,
                        material: balance.materialScore,
                        psychological: balance.psychologicalScore
                    }
                };
            }
        }

        return null;
    }

    /**
     * إيجاد الكلمات المطابقة للمعايير
     */
    private findMatchingWords(criteria: GenerationCriteria): GeneratedWord[] {
        const matchingWords: GeneratedWord[] = [];

        for (const word of this.arabicWords) {
            const letters = word.split('');
            const allMeanings: string[] = [];

            letters.forEach(letter => {
                const letterMeanings = this.letterEngine.getLetterMeanings(letter);
                letterMeanings.forEach(m => allMeanings.push(m.meaning));
            });

            // التحقق من المطابقة
            const matchedMeanings = allMeanings.filter(m =>
                criteria.targetMeanings.some(tm => m.includes(tm) || tm.includes(m))
            );

            if (matchedMeanings.length > 0) {
                const interaction = this.interactionEngine.analyzeWordInteraction(word);
                const balance = this.interactionEngine.calculateBalance(word);

                // التحقق من المزاج
                if (criteria.mood) {
                    if (criteria.mood === 'positive' && balance.positiveScore < 0.5) continue;
                    if (criteria.mood === 'negative' && balance.negativeScore < 0.5) continue;
                }

                // التحقق من الطابع
                if (criteria.theme) {
                    if (criteria.theme === 'psychological' && balance.psychologicalScore < 0.5) continue;
                    if (criteria.theme === 'material' && balance.materialScore < 0.5) continue;
                }

                matchingWords.push({
                    word,
                    score: interaction.overallScore,
                    matchedMeanings,
                    balance: {
                        positive: balance.positiveScore,
                        negative: balance.negativeScore,
                        material: balance.materialScore,
                        psychological: balance.psychologicalScore
                    }
                });
            }
        }

        return matchingWords;
    }

    /**
     * اختيار أفضل الكلمات
     */
    private selectBestWords(
        candidates: GeneratedWord[],
        count: number,
        criteria: GenerationCriteria
    ): GeneratedWord[] {
        // ترتيب حسب عدد المعاني المطابقة والدرجة
        const sorted = candidates.sort((a, b) => {
            const scoreA = a.matchedMeanings.length * 0.6 + a.score * 0.4;
            const scoreB = b.matchedMeanings.length * 0.6 + b.score * 0.4;
            return scoreB - scoreA;
        });

        return sorted.slice(0, Math.min(count, sorted.length));
    }

    /**
     * ترتيب الكلمات لتحقيق أفضل تماسك
     */
    private orderWordsForCoherence(words: GeneratedWord[]): GeneratedWord[] {
        if (words.length <= 1) return words;

        // خوارزمية بسيطة: ترتيب حسب التشابه في الدرجات
        return words.sort((a, b) => {
            const diffA = Math.abs(a.balance.positive - a.balance.negative);
            const diffB = Math.abs(b.balance.positive - b.balance.negative);
            return diffA - diffB;
        });
    }

    /**
     * حساب درجة المطابقة
     */
    private calculateMatchScore(words: GeneratedWord[], criteria: GenerationCriteria): number {
        const totalMatched = words.reduce((sum, w) => sum + w.matchedMeanings.length, 0);
        const totalTarget = criteria.targetMeanings.length * words.length;
        
        return Math.min(totalMatched / totalTarget, 1.0);
    }

    /**
     * حساب درجة التماسك
     */
    private calculateCoherenceScore(words: GeneratedWord[]): number {
        if (words.length < 2) return 1.0;

        let totalCoherence = 0;
        for (let i = 0; i < words.length - 1; i++) {
            const score1 = words[i].score;
            const score2 = words[i + 1].score;
            totalCoherence += 1 - Math.abs(score1 - score2);
        }

        return totalCoherence / (words.length - 1);
    }

    /**
     * إضافة كلمات جديدة للقاموس
     */
    addWords(words: string[]): void {
        this.arabicWords.push(...words);
    }

    /**
     * الحصول على القاموس الحالي
     */
    getVocabulary(): string[] {
        return [...this.arabicWords];
    }
}

