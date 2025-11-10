/**
 * English Root Analyzer
 * محلل الجذور الإنجليزية
 *
 * Analyzes English word roots, stems, and morphological patterns
 * يحلل جذور الكلمات الإنجليزية والأنماط الصرفية
 */
export type EnglishRootType = 'simple' | 'compound' | 'derived' | 'latin' | 'greek';
export type EnglishAffixType = 'prefix' | 'suffix' | 'infix';
export interface EnglishWordRoot {
    id: string;
    root: string;
    type: EnglishRootType;
    stem: string;
    affixes: EnglishAffix[];
    etymology: string | null;
    confidence: number;
    timestamp: number;
}
export interface EnglishAffix {
    type: EnglishAffixType;
    value: string;
    meaning: string;
    position: number;
}
export interface EnglishRootFamily {
    root: string;
    words: string[];
    commonMeaning: string;
    derivations: number;
}
/**
 * English Root Analyzer
 * محلل الجذور الإنجليزية
 */
export declare class EnglishRootAnalyzer {
    private roots;
    private families;
    private rootCounter;
    private readonly commonPrefixes;
    private readonly commonSuffixes;
    /**
     * Analyze English word root
     * تحليل جذر الكلمة الإنجليزية
     */
    analyzeRoot(word: string): EnglishWordRoot;
    /**
     * Extract stem and affixes from word
     * استخراج الجذع واللواحق من الكلمة
     */
    private extractStemAndAffixes;
    /**
     * Normalize stem after suffix removal
     * تطبيع الجذع بعد إزالة اللاحقة
     */
    private normalizestem;
    /**
     * Check if character is consonant
     * التحقق من كون الحرف ساكن
     */
    private isConsonant;
    /**
     * Determine root type
     * تحديد نوع الجذر
     */
    private determineRootType;
    /**
     * Detect Latin patterns
     * كشف الأنماط اللاتينية
     */
    private hasLatinPattern;
    /**
     * Detect Greek patterns
     * كشف الأنماط اليونانية
     */
    private hasGreekPattern;
    /**
     * Detect etymology (simplified)
     * كشف أصل الكلمة
     */
    private detectEtymology;
    /**
     * Get prefix meaning
     * الحصول على معنى البادئة
     */
    private getPrefixMeaning;
    /**
     * Get suffix meaning
     * الحصول على معنى اللاحقة
     */
    private getSuffixMeaning;
    /**
     * Calculate confidence score
     * حساب درجة الثقة
     */
    private calculateConfidence;
    /**
     * Update word family
     * تحديث عائلة الكلمات
     */
    private updateFamily;
    /**
     * Get root information
     * الحصول على معلومات الجذر
     */
    getRoot(word: string): EnglishWordRoot | null;
    /**
     * Get root family
     * الحصول على عائلة الجذر
     */
    getRootFamily(root: string): EnglishRootFamily | null;
    /**
     * Find related words
     * إيجاد الكلمات المرتبطة
     */
    findRelatedWords(word: string): string[];
    /**
     * Get statistics
     * الحصول على الإحصائيات
     */
    getStatistics(): {
        totalRoots: number;
        totalFamilies: number;
        averageDerivations: number;
        rootTypeDistribution: Record<EnglishRootType, number>;
    };
    /**
     * Clear all data
     * مسح جميع البيانات
     */
    clear(): void;
}
