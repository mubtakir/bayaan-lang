/**
 * التكامل اللغوي - Linguistic Integration
 *
 * يربط بين محرك تحليل الحروف ونظام المعرفة
 * Creates Things automatically from Arabic word analysis
 */
import { LetterEngine } from '../baserah/linguistics/letterEngine';
import { ThingEngine, Thing } from '../baserah/knowledge/thingEngine';
import { InferenceEngine } from '../baserah/knowledge/inferenceEngine';
import { CausalEngine } from '../logic/causalEngine';
/**
 * محرك التكامل اللغوي
 * Linguistic Integration Engine
 */
export declare class LinguisticIntegration {
    private letterEngine;
    private thingEngine;
    private inferenceEngine;
    private causalEngine;
    constructor(letterEngine?: LetterEngine, thingEngine?: ThingEngine, inferenceEngine?: InferenceEngine, causalEngine?: CausalEngine);
    /**
     * إنشاء Thing من تحليل كلمة عربية
     * Create Thing from Arabic word analysis
     *
     * مثال: "شجرة" -> Thing بخصائص مستنتجة من معاني الحروف
     */
    createThingFromWord(word: string, category?: string): Thing | null;
    /**
     * استنتاج الفئة من التحليل
     * Infer category from analysis
     */
    private inferCategoryFromAnalysis;
    /**
     * إضافة خصائص من التحليل
     * Add properties from analysis
     */
    private addPropertiesFromAnalysis;
    /**
     * إضافة حالات من التحليل
     * Add states from analysis
     */
    private addStatesFromAnalysis;
    /**
     * تحليل كلمة وإنشاء Thing مع علاقات سببية
     * Analyze word and create Thing with causal relations
     */
    createThingWithCausalRelations(word: string, category?: string): Thing | null;
    /**
     * توليد كلمة جديدة من Thing
     * Generate new word from Thing
     *
     * عكس العملية: من Thing إلى كلمة عربية
     */
    generateWordFromThing(thing: Thing): string[];
    /**
     * تحليل جملة كاملة وإنشاء Things
     * Analyze full sentence and create Things
     */
    analyzeSentence(sentence: string): Thing[];
    /**
     * هل الكلمة شائعة؟
     * Is word common?
     */
    private isCommonWord;
    /**
     * إنشاء قاعدة استنتاج من تحليل كلمة
     * Create inference rule from word analysis
     */
    createInferenceRuleFromWord(word: string): void;
    /**
     * البحث عن Things بناءً على معنى كلمة
     * Find Things based on word meaning
     */
    findThingsByWordMeaning(word: string): Thing[];
    getLetterEngine(): LetterEngine;
    getThingEngine(): ThingEngine;
    getInferenceEngine(): InferenceEngine;
    getCausalEngine(): CausalEngine;
}
