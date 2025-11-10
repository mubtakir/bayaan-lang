/**
 * نظام التخزين الدائم - Knowledge Storage System
 *
 * يحفظ ويسترجع المعرفة من الملفات/قاعدة البيانات
 */
import { Thing } from '../baserah/knowledge/thingEngine';
import { Event } from '../baserah/knowledge/eventEngine';
import { LogicalEquation } from '../baserah/knowledge/equationEngine';
import { Inference } from '../baserah/knowledge/inferenceEngine';
import { Fact, Rule } from '../logic/logicEngine';
import { CausalRelation } from '../logic/causalEngine';
/**
 * تنسيق التخزين
 * Storage format
 */
export declare enum StorageFormat {
    JSON = "json",
    BAYAN = "bayan"
}
/**
 * قاعدة المعرفة المحفوظة
 * Saved knowledge base
 */
export interface SavedKnowledgeBase {
    version: string;
    timestamp: number;
    things: any[];
    events: any[];
    equations: any[];
    inferences: any[];
    facts: any[];
    rules: any[];
    causalRelations: any[];
}
/**
 * محرك التخزين
 * Storage Engine
 */
export declare class KnowledgeStorage {
    private filePath;
    private format;
    constructor(filePath: string, format?: StorageFormat);
    /**
     * حفظ قاعدة المعرفة
     * Save knowledge base
     */
    save(knowledgeBase: {
        things?: Thing[];
        events?: Event[];
        equations?: LogicalEquation[];
        inferences?: Inference[];
        facts?: Fact[];
        rules?: Rule[];
        causalRelations?: CausalRelation[];
    }): void;
    /**
     * تحميل قاعدة المعرفة
     * Load knowledge base
     */
    load(): SavedKnowledgeBase | null;
    /**
     * حفظ كـ JSON
     * Save as JSON
     */
    private saveAsJSON;
    /**
     * تحميل من JSON
     * Load from JSON
     */
    private loadFromJSON;
    /**
     * حفظ بتنسيق البيان
     * Save as Bayan format
     */
    private saveAsBayan;
    /**
     * تحميل من تنسيق البيان
     * Load from Bayan format
     */
    private loadFromBayan;
    private serializeThings;
    private serializeEvents;
    private serializeEquations;
    private serializeInferences;
    private serializeFacts;
    private serializeRules;
    private serializePredicate;
    private serializeCausalRelations;
    private thingToBayan;
    private eventToBayan;
    private factToBayan;
    private causalRelationToBayan;
    /**
     * تصدير إلى تنسيق آخر
     * Export to another format
     */
    exportTo(targetPath: string, format: StorageFormat): void;
    /**
     * إحصائيات الملف
     * File statistics
     */
    getStatistics(): {
        exists: boolean;
        size?: number;
        format: StorageFormat;
        path: string;
    };
}
