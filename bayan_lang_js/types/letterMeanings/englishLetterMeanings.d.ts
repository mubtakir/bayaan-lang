/**
 * English Letter Meanings Database
 * قاعدة بيانات معاني الحروف الإنجليزية
 *
 * This module provides semantic meanings for English letters
 * based on phonetic properties, historical etymology, and usage patterns.
 *
 * Note: These are placeholder meanings that will be filled with proper
 * research-based meanings later.
 */
import { LetterMeaning } from './letterMeaningAnalyzer';
export interface EnglishLetterData {
    letter: string;
    meanings: string[];
    phonetic: string;
    articulationPoint: string;
    examples: string[];
}
/**
 * English Letter Meanings Database
 * قاعدة بيانات معاني الحروف الإنجليزية
 *
 * Temporary structure - to be filled with proper meanings later
 */
export declare const ENGLISH_LETTER_MEANINGS: EnglishLetterData[];
/**
 * Initialize English letter meanings in the system
 * تهيئة معاني الحروف الإنجليزية في النظام
 */
export declare function initializeEnglishLetterMeanings(): Map<string, LetterMeaning[]>;
/**
 * Get phonetic information for an English letter
 * الحصول على المعلومات الصوتية لحرف إنجليزي
 */
export declare function getPhoneticInfo(letter: string): EnglishLetterData | undefined;
/**
 * Analyze English name/word using letter meanings
 * تحليل اسم/كلمة إنجليزية باستخدام معاني الحروف
 */
export declare function analyzeEnglishWord(word: string): {
    word: string;
    letters: string[];
    meanings: string[];
    phonetics: string[];
};
/**
 * Export for use in examples
 */
export declare const englishLetterMeaningsForExamples: {
    a: string[];
    b: string[];
    c: string[];
    d: string[];
    e: string[];
    f: string[];
    g: string[];
    h: string[];
    i: string[];
    j: string[];
    k: string[];
    l: string[];
    m: string[];
    n: string[];
    o: string[];
    p: string[];
    q: string[];
    r: string[];
    s: string[];
    t: string[];
    u: string[];
    v: string[];
    w: string[];
    x: string[];
    y: string[];
    z: string[];
};
