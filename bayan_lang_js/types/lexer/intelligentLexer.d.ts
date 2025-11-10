/**
 * المحلل المعجمي الذكي - Intelligent Lexer
 * Extends traditional lexer with AI intelligence from Baserah systems
 */
import { Lexer } from './lexer';
import { IntelligentToken, IntelligentAnalysisSettings, IntelligentAnalysisStats } from './intelligentTokens';
/**
 * المحلل المعجمي الذكي
 * Intelligent Lexer - extends traditional lexer with AI
 */
export declare class IntelligentLexer extends Lexer {
    private settings;
    private cache;
    private stats;
    private letterMeaningsManager;
    private arabicRootAnalyzer;
    private arabicDerivationGenerator;
    private englishRootAnalyzer;
    private englishDerivationGenerator;
    private lexiconManager;
    constructor(source: string, settings?: Partial<IntelligentAnalysisSettings>);
    /**
     * تحليل ذكي - يرجع رموز ذكية
     * Intelligent tokenization - returns intelligent tokens
     */
    tokenizeIntelligent(): IntelligentToken[];
    /**
     * إثراء رمز واحد بالذكاء
     * Enrich a single token with intelligence
     */
    private enrichToken;
    /**
     * تحليل الحروف
     * Analyze letters
     */
    private analyzeLetters;
    /**
     * تحليل الجذر
     * Analyze root
     */
    private analyzeRoot;
    /**
     * توليد الاشتقاقات
     * Generate derivations
     */
    private generateDerivations;
    /**
     * كشف النوع الدلالي
     * Detect semantic type
     */
    private detectSemanticType;
    /**
     * تحليل سببي
     * Analyze causal relationships
     */
    private analyzeCausal;
    /**
     * كشف اللغة
     * Detect language
     */
    private detectLanguage;
    /**
     * هل يجب تخطي الذكاء؟
     * Should skip intelligence?
     */
    private shouldSkipIntelligence;
    /**
     * الحصول على النوع الدلالي الأساسي
     * Get basic semantic type
     */
    private getBasicSemanticType;
    /**
     * هل هو كلمة مفتاحية؟
     */
    private isKeyword;
    /**
     * هل هو عامل؟
     */
    private isOperator;
    /**
     * هل هو فعل؟
     */
    private isVerb;
    /**
     * هل هو اسم شخص؟
     */
    private isPersonName;
    /**
     * هل هو طعام؟
     */
    private isFood;
    /**
     * مفتاح الذاكرة المؤقتة
     */
    private getCacheKey;
    /**
     * تحديث الإحصائيات
     */
    private updateStats;
    /**
     * الحصول على الإحصائيات
     */
    getStats(): IntelligentAnalysisStats;
    /**
     * مسح الذاكرة المؤقتة
     */
    clearCache(): void;
    /**
     * الحصول على حجم الذاكرة المؤقتة
     */
    getCacheSize(): number;
}
