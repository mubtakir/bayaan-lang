/**
 * English Derivation Generator
 * مولد الاشتقاقات الإنجليزية
 *
 * Generates English word derivations and inflections
 * يولد الاشتقاقات والتصريفات للكلمات الإنجليزية
 */
export type EnglishDerivationType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'plural' | 'past_tense' | 'present_participle' | 'past_participle' | 'comparative' | 'superlative' | 'gerund';
export interface EnglishDerivation {
    id: string;
    baseWord: string;
    derivedWord: string;
    type: EnglishDerivationType;
    rule: string;
    confidence: number;
    timestamp: number;
}
export interface DerivationRule {
    type: EnglishDerivationType;
    suffix: string;
    description: string;
    example: string;
}
/**
 * English Derivation Generator
 * مولد الاشتقاقات الإنجليزية
 */
export declare class EnglishDerivationGenerator {
    private derivations;
    private derivationCounter;
    private readonly rules;
    /**
     * Generate derivation
     * توليد اشتقاق
     */
    generateDerivation(baseWord: string, type: EnglishDerivationType): EnglishDerivation | null;
    /**
     * Apply derivation rule
     * تطبيق قاعدة الاشتقاق
     */
    private applyRule;
    /**
     * Make plural form
     * صيغة الجمع
     */
    private makePlural;
    /**
     * Make past tense
     * صيغة الماضي
     */
    private makePastTense;
    /**
     * Make present participle
     * صيغة اسم الفاعل
     */
    private makePresentParticiple;
    /**
     * Make comparative form
     * صيغة المقارنة
     */
    private makeComparative;
    /**
     * Make superlative form
     * صيغة التفضيل
     */
    private makeSuperlative;
    /**
     * Add suffix to word
     * إضافة لاحقة للكلمة
     */
    private addSuffix;
    /**
     * Check if word follows CVC pattern
     * التحقق من نمط CVC
     */
    private isCVC;
    /**
     * Check if character is consonant
     * التحقق من كون الحرف ساكن
     */
    private isConsonant;
    /**
     * Check if character is vowel
     * التحقق من كون الحرف حرف علة
     */
    private isVowel;
    /**
     * Generate all common derivations
     * توليد جميع الاشتقاقات الشائعة
     */
    generateAllDerivations(baseWord: string): EnglishDerivation[];
    /**
     * Get derivation by ID
     * الحصول على اشتقاق بالمعرف
     */
    getDerivation(id: string): EnglishDerivation | null;
    /**
     * Find derivations by base word
     * إيجاد الاشتقاقات بالكلمة الأساسية
     */
    findDerivationsByBaseWord(baseWord: string): EnglishDerivation[];
    /**
     * Clear all derivations
     * مسح جميع الاشتقاقات
     */
    clear(): void;
}
