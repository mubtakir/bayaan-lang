/**
 * المحلل النحوي الذكي - Intelligent Parser
 * Extends traditional parser with AI intelligence
 */
import { Parser } from './parser.js';
import { IntelligentToken } from '../lexer/intelligentTokens.js';
import { Token } from '../lexer/tokens.js';
import * as AST from '../ast/index.js';
import { IntelligentProgram, CausalNetwork, Event, Relationship, Context } from './intelligentAST.js';
/**
 * إعدادات التحليل الذكي - Intelligent Parsing Settings
 */
export interface IntelligentParsingSettings {
    enableCausalNetworks: boolean;
    enableEventDetection: boolean;
    enableRelationshipMapping: boolean;
    enableContextAnalysis: boolean;
    cacheResults: boolean;
}
/**
 * الإعدادات الافتراضية - Default Settings
 */
export declare const DEFAULT_INTELLIGENT_PARSING_SETTINGS: IntelligentParsingSettings;
/**
 * نتيجة التحليل الذكي - Intelligent Parsing Result
 */
export interface IntelligentParsingResult {
    ast: IntelligentProgram;
    causalNetwork?: CausalNetwork;
    events?: Event[];
    relationships?: Relationship[];
    context?: Context;
    parsingTime: number;
    warnings: string[];
    suggestions: string[];
}
/**
 * إحصائيات التحليل الذكي - Intelligent Parsing Statistics
 */
export interface IntelligentParsingStats {
    totalNodes: number;
    causalNodes: number;
    causalEdges: number;
    eventsDetected: number;
    relationshipsFound: number;
    averageConfidence: number;
    parsingTime: number;
}
/**
 * المحلل النحوي الذكي - Intelligent Parser
 * Extends Parser with AI intelligence from Baserah systems
 */
export declare class IntelligentParser extends Parser {
    private settings;
    private causalNetworkBuilder;
    private eventDetector;
    private stats;
    constructor(tokens: Token[] | IntelligentToken[], settings?: Partial<IntelligentParsingSettings>);
    /**
     * تحليل ذكي - Intelligent Parse
     * Parses code with full AI intelligence
     */
    parseIntelligent(): IntelligentParsingResult;
    /**
     * خريطة العلاقات - Map Relationships
     * Maps relationships between AST nodes
     */
    private mapRelationships;
    /**
     * تحليل السياق - Analyze Context
     * Analyzes the context of the code
     */
    private analyzeContext;
    /**
     * عد العقد - Count Nodes
     * Counts total nodes in AST
     */
    private countNodes;
    /**
     * استخراج اسم المعرف - Extract Identifier Name
     */
    private extractIdentifierName;
    /**
     * الحصول على الإحصائيات - Get Statistics
     */
    getStats(): IntelligentParsingStats;
    /**
     * إعادة تعيين الإحصائيات - Reset Statistics
     */
    resetStats(): void;
}
/**
 * مساعدات المحلل الذكي - Intelligent Parser Helpers
 */
export declare class IntelligentParserHelpers {
    /**
     * تحويل AST تقليدي إلى ذكي
     * Convert traditional AST to intelligent
     */
    static convertToIntelligent(ast: AST.Program): IntelligentProgram;
    /**
     * دمج نتائج التحليل
     * Merge parsing results
     */
    static mergeResults(results: IntelligentParsingResult[]): IntelligentParsingResult;
    /**
     * طباعة ملخص النتيجة
     * Print result summary
     */
    static printSummary(result: IntelligentParsingResult): string;
}
