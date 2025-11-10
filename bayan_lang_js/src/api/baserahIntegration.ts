/**
 * API للتكامل مع بصيرة AI
 * API for Baserah AI Integration
 * 
 * يوفر واجهة برمجية للتكامل مع نظام بصيرة AI
 * Provides API interface for Baserah AI integration
 */

import { TextAnalyzer, TextAnalysis } from '../baserah/ai/textAnalyzer';
import { TextGenerator, GenerationCriteria, GeneratedText } from '../baserah/ai/textGenerator';
import { DeepUnderstandingEngine, DeepInsight, DreamInterpretation } from '../baserah/ai/deepUnderstandingEngine';
import { LetterEngine } from '../baserah/linguistics/letterEngine';
import { LetterInteractionEngine } from '../baserah/linguistics/letterInteractionEngine';

/**
 * طلب تحليل نص
 * Text analysis request
 */
export interface AnalysisRequest {
    text: string;
    analysisType: 'basic' | 'deep' | 'dream';
    options?: {
        includeLetterMeanings?: boolean;
        includeInteractions?: boolean;
        includePsychologicalProfile?: boolean;
    };
}

/**
 * استجابة تحليل نص
 * Text analysis response
 */
export interface AnalysisResponse {
    success: boolean;
    data?: TextAnalysis | DeepInsight | DreamInterpretation;
    error?: string;
    timestamp: number;
}

/**
 * طلب توليد نص
 * Text generation request
 */
export interface GenerationRequest {
    criteria: GenerationCriteria;
    options?: {
        returnAlternatives?: boolean;
        alternativesCount?: number;
    };
}

/**
 * استجابة توليد نص
 * Text generation response
 */
export interface GenerationResponse {
    success: boolean;
    data?: GeneratedText;
    alternatives?: GeneratedText[];
    error?: string;
    timestamp: number;
}

/**
 * طلب معاني حرف
 * Letter meanings request
 */
export interface LetterMeaningsRequest {
    letter: string;
}

/**
 * استجابة معاني حرف
 * Letter meanings response
 */
export interface LetterMeaningsResponse {
    success: boolean;
    data?: {
        letter: string;
        meanings: string[];
        category: string;
    };
    error?: string;
    timestamp: number;
}

/**
 * API بصيرة
 * Baserah API
 */
export class BaserahAPI {
    private textAnalyzer: TextAnalyzer;
    private textGenerator: TextGenerator;
    private deepEngine: DeepUnderstandingEngine;
    private letterEngine: LetterEngine;
    private interactionEngine: LetterInteractionEngine;

    constructor() {
        this.textAnalyzer = new TextAnalyzer();
        this.textGenerator = new TextGenerator();
        this.deepEngine = new DeepUnderstandingEngine();
        this.letterEngine = new LetterEngine();
        this.interactionEngine = new LetterInteractionEngine();
    }

    /**
     * تحليل نص
     * Analyze text
     */
    async analyzeText(request: AnalysisRequest): Promise<AnalysisResponse> {
        try {
            let data: TextAnalysis | DeepInsight | DreamInterpretation;

            switch (request.analysisType) {
                case 'basic':
                    data = this.textAnalyzer.analyzeText(request.text);
                    break;
                
                case 'deep':
                    data = this.deepEngine.analyzeDeep(request.text);
                    break;
                
                case 'dream':
                    data = this.deepEngine.interpretDream(request.text);
                    break;
                
                default:
                    throw new Error('نوع تحليل غير معروف');
            }

            return {
                success: true,
                data,
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * توليد نص
     * Generate text
     */
    async generateText(request: GenerationRequest): Promise<GenerationResponse> {
        try {
            const data = this.textGenerator.generateText(request.criteria);
            
            let alternatives: GeneratedText[] | undefined;
            
            if (request.options?.returnAlternatives) {
                const count = request.options.alternativesCount || 3;
                alternatives = [];
                
                for (let i = 0; i < count; i++) {
                    alternatives.push(this.textGenerator.generateText(request.criteria));
                }
            }

            return {
                success: true,
                data,
                alternatives,
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * الحصول على معاني حرف
     * Get letter meanings
     */
    async getLetterMeanings(request: LetterMeaningsRequest): Promise<LetterMeaningsResponse> {
        try {
            const letterMeanings = this.letterEngine.getLetterMeanings(request.letter);

            if (letterMeanings.length === 0) {
                throw new Error('حرف غير موجود في قاعدة البيانات');
            }

            const meanings = letterMeanings.map(m => m.meaning);
            const category = letterMeanings[0].type.toString() || 'غير محدد';

            return {
                success: true,
                data: {
                    letter: request.letter,
                    meanings,
                    category
                },
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * تحليل تفاعل كلمة
     * Analyze word interaction
     */
    async analyzeWordInteraction(word: string): Promise<any> {
        try {
            const interaction = this.interactionEngine.analyzeWordInteraction(word);
            
            return {
                success: true,
                data: interaction,
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * الحصول على إحصائيات النظام
     * Get system statistics
     */
    async getSystemStats(): Promise<any> {
        try {
            const stats = {
                totalLetters: 30,
                totalMeanings: 100,
                vocabularySize: this.textGenerator.getVocabulary().length,
                version: '1.0.0',
                capabilities: [
                    'تحليل نصوص',
                    'توليد نصوص',
                    'فهم عميق',
                    'تفسير أحلام',
                    'تحليل تفاعلات الحروف'
                ]
            };

            return {
                success: true,
                data: stats,
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * معالجة دفعة من النصوص
     * Process batch of texts
     */
    async processBatch(texts: string[], analysisType: 'basic' | 'deep' | 'dream'): Promise<any> {
        try {
            const results = await Promise.all(
                texts.map(text => this.analyzeText({ text, analysisType }))
            );

            return {
                success: true,
                data: results,
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * البحث عن كلمات بمعنى محدد
     * Search for words with specific meaning
     */
    async searchWordsByMeaning(meaning: string): Promise<any> {
        try {
            const vocabulary = this.textGenerator.getVocabulary();
            const matchingWords: string[] = [];

            for (const word of vocabulary) {
                const letters = word.split('');
                const allMeanings: string[] = [];

                letters.forEach(letter => {
                    const letterMeanings = this.letterEngine.getLetterMeanings(letter);
                    letterMeanings.forEach(m => allMeanings.push(m.meaning));
                });

                if (allMeanings.some(m => m.includes(meaning) || meaning.includes(m))) {
                    matchingWords.push(word);
                }
            }

            return {
                success: true,
                data: {
                    meaning,
                    matchingWords,
                    count: matchingWords.length
                },
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * مقارنة بين نصين
     * Compare two texts
     */
    async compareTexts(text1: string, text2: string): Promise<any> {
        try {
            const analysis1 = this.textAnalyzer.analyzeText(text1);
            const analysis2 = this.textAnalyzer.analyzeText(text2);

            const comparison = {
                text1: {
                    theme: analysis1.overallTheme,
                    tone: analysis1.emotionalTone,
                    quality: analysis1.qualityScore
                },
                text2: {
                    theme: analysis2.overallTheme,
                    tone: analysis2.emotionalTone,
                    quality: analysis2.qualityScore
                },
                similarity: this.calculateSimilarity(analysis1, analysis2),
                differences: this.findDifferences(analysis1, analysis2)
            };

            return {
                success: true,
                data: comparison,
                timestamp: Date.now()
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'خطأ غير معروف',
                timestamp: Date.now()
            };
        }
    }

    /**
     * حساب التشابه بين نصين
     */
    private calculateSimilarity(analysis1: TextAnalysis, analysis2: TextAnalysis): number {
        const themeSimilarity = analysis1.overallTheme === analysis2.overallTheme ? 1 : 0;
        const toneSimilarity = analysis1.emotionalTone === analysis2.emotionalTone ? 1 : 0;
        const qualitySimilarity = 1 - Math.abs(analysis1.qualityScore - analysis2.qualityScore);

        return (themeSimilarity + toneSimilarity + qualitySimilarity) / 3;
    }

    /**
     * إيجاد الفروقات بين نصين
     */
    private findDifferences(analysis1: TextAnalysis, analysis2: TextAnalysis): string[] {
        const differences: string[] = [];

        if (analysis1.overallTheme !== analysis2.overallTheme) {
            differences.push(`الموضوع: ${analysis1.overallTheme} مقابل ${analysis2.overallTheme}`);
        }

        if (analysis1.emotionalTone !== analysis2.emotionalTone) {
            differences.push(`النبرة: ${analysis1.emotionalTone} مقابل ${analysis2.emotionalTone}`);
        }

        if (Math.abs(analysis1.qualityScore - analysis2.qualityScore) > 0.2) {
            differences.push(`الجودة: ${analysis1.qualityScore.toFixed(2)} مقابل ${analysis2.qualityScore.toFixed(2)}`);
        }

        return differences;
    }
}

// تصدير نسخة واحدة من API
export const baserahAPI = new BaserahAPI();

