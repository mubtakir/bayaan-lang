/**
 * Multilingual Letter Meanings Manager
 * مدير معاني الحروف متعدد اللغات
 *
 * Supports both Arabic and English letter semantic analysis
 * يدعم التحليل الدلالي للحروف العربية والإنجليزية
 */
import { LetterMeaning } from './letterMeaningAnalyzer';
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
export declare class MultilingualLetterMeaningsManager {
    private arabicAnalyzer;
    private englishMeanings;
    constructor();
    /**
     * Initialize default Arabic letter meanings
     * تهيئة معاني الحروف العربية الافتراضية
     */
    private initializeArabicMeanings;
    /**
     * Detect language of a word
     * كشف لغة الكلمة
     */
    detectLanguage(word: string): SupportedLanguage;
    /**
     * Analyze a word in any supported language
     * تحليل كلمة بأي لغة مدعومة
     */
    analyzeWord(word: string): MultilingualAnalysisResult;
    /**
     * Analyze Arabic word
     * تحليل كلمة عربية
     */
    private analyzeArabicWord;
    /**
     * Analyze English word
     * تحليل كلمة إنجليزية
     */
    private analyzeEnglishWordInternal;
    /**
     * Analyze mixed language word
     * تحليل كلمة مختلطة
     */
    private analyzeMixedWord;
    /**
     * Add custom meaning for any language
     * إضافة معنى مخصص لأي لغة
     */
    addMeaning(letter: string, meaning: string, language?: SupportedLanguage, examples?: string[], strength?: number, confidence?: number): LetterMeaning;
    /**
     * Get all meanings for a letter in any language
     * الحصول على جميع معاني حرف بأي لغة
     */
    getMeanings(letter: string): LetterMeaning[];
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
    };
}
/**
 * Global instance for easy access
 * نسخة عامة للوصول السهل
 */
export declare const multilingualLetterMeanings: MultilingualLetterMeaningsManager;
