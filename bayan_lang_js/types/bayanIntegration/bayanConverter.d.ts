/**
 * محول البيان - Bayan Converter
 * Converts between Bayan language and Baserah AI representations
 */
export type BayanType = 'number' | 'string' | 'boolean' | 'array' | 'object' | 'function' | 'class' | 'module';
export type ConversionDirection = 'bayan-to-baserah' | 'baserah-to-bayan';
export interface BayanToken {
    type: string;
    value: string;
    line: number;
    column: number;
}
export interface BayanAST {
    type: string;
    value?: any;
    children: BayanAST[];
    metadata: Map<string, any>;
}
export interface BaserahRepresentation {
    id: string;
    type: BayanType;
    properties: Map<string, any>;
    states: Map<string, any>;
    transformations: Array<(input: any) => any>;
    timestamp: number;
}
export interface ConversionResult {
    success: boolean;
    result: BaserahRepresentation | BayanAST | null;
    errors: string[];
    warnings: string[];
    metadata: Map<string, any>;
}
export declare class BayanConverter {
    private conversionCache;
    private conversionCounter;
    private readonly bayanKeywords;
    convertBayanToBaserah(bayanCode: string): ConversionResult;
    convertBaserahToBayan(baserahRep: BaserahRepresentation): ConversionResult;
    private tokenize;
    private getTokenType;
    private parse;
    private parseVariable;
    private parseFunction;
    private astToBaserah;
    private baserahToAST;
    private generateBayanCode;
    private mapASTTypeToBaserahType;
    private mapBaserahTypeToBayanType;
    private countASTNodes;
    getConversionCache(): Map<string, ConversionResult>;
    clearCache(): void;
    getStatistics(): {
        totalConversions: number;
        cacheSize: number;
        supportedKeywords: number;
    };
}
