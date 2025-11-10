/**
 * عرض تفاعلي شامل لتحليل النصوص العربية
 * Interactive Comprehensive Demo for Arabic Text Analysis
 *
 * هذا الملف يوفر واجهة تفاعلية لتشغيل جميع الأمثلة
 */
/**
 * تحليل كلمة واحدة
 */
declare function analyzeWord(word: string): void;
/**
 * تحليل جملة
 */
declare function analyzeSentence(words: string[]): void;
/**
 * بدء البرنامج
 */
declare function start(): void;
export { start, analyzeWord, analyzeSentence };
