/**
 * مدير المعادلات اللغوية - Linguistic Equations Manager
 * Integrates all linguistic equations components
 */
import { EquationEngine, LinguisticEquation, PropertyState, StateChange } from './equationEngine';
import { StructureAnalyzer, SentenceStructure } from './structureAnalyzer';
import { EquationGenerator, VerbEffect } from './equationGenerator';
export interface WorldState {
    things: Map<string, Map<string, PropertyState>>;
    lastUpdate: number;
}
export interface ProcessingResult {
    sentence: string;
    equation: LinguisticEquation;
    structure: SentenceStructure;
    worldChanges: StateChange[];
    confidence: number;
}
export interface LinguisticEquationsSettings {
    autoUpdateWorld: boolean;
    trackHistory: boolean;
    maxHistorySize: number;
    defaultConfidence: number;
}
export declare class LinguisticEquationsManager {
    private equationEngine;
    private structureAnalyzer;
    private equationGenerator;
    private worldState;
    private history;
    private settings;
    constructor(settings?: Partial<LinguisticEquationsSettings>);
    processSentence(sentence: string): ProcessingResult;
    private updateWorldState;
    processStory(sentences: string[]): ProcessingResult[];
    getThingState(thingName: string): Map<string, PropertyState> | null;
    getWorldState(): WorldState;
    getHistory(limit?: number): ProcessingResult[];
    findHistoryByThing(thingName: string): ProcessingResult[];
    findHistoryByVerb(verb: string): ProcessingResult[];
    analyzeSentence(sentence: string): SentenceStructure;
    addVerbEffect(effect: VerbEffect): void;
    getVerbEffect(verb: string): VerbEffect | null;
    updateSettings(newSettings: Partial<LinguisticEquationsSettings>): void;
    getSettings(): LinguisticEquationsSettings;
    getEquationEngine(): EquationEngine;
    getStructureAnalyzer(): StructureAnalyzer;
    getEquationGenerator(): EquationGenerator;
    getStatistics(): {
        equations: ReturnType<EquationEngine['getStatistics']>;
        structures: ReturnType<StructureAnalyzer['getStatistics']>;
        generator: ReturnType<EquationGenerator['getStatistics']>;
        world: {
            totalThings: number;
            totalProperties: number;
            averagePropertiesPerThing: number;
        };
        history: {
            totalProcessed: number;
            averageConfidence: number;
            averageChangesPerSentence: number;
        };
    };
    clearHistory(): void;
    clearWorld(): void;
    clearAll(): void;
}
