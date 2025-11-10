/**
 * محرك المعجم - Lexicon Engine
 * Core lexicon management and lookup
 */
export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'particle' | 'pronoun';
export type DefinitionSource = 'manual' | 'imported' | 'generated' | 'derived';
export interface LexiconEntry {
    id: string;
    word: string;
    type: WordType;
    root: string | null;
    definition: string;
    examples: string[];
    synonyms: string[];
    antonyms: string[];
    source: DefinitionSource;
    confidence: number;
    timestamp: number;
}
export interface SearchOptions {
    exactMatch?: boolean;
    includeRoot?: boolean;
    includeSynonyms?: boolean;
    minConfidence?: number;
    wordType?: WordType;
}
export declare class LexiconEngine {
    private entries;
    private rootIndex;
    private typeIndex;
    private entryCounter;
    addEntry(word: string, type: WordType, definition: string, root?: string | null, source?: DefinitionSource): LexiconEntry;
    private updateIndices;
    getEntry(word: string): LexiconEntry | null;
    getAllEntries(): LexiconEntry[];
    search(query: string, options?: SearchOptions): LexiconEntry[];
    findByRoot(root: string): LexiconEntry[];
    findByType(type: WordType): LexiconEntry[];
    addExample(word: string, example: string): boolean;
    addSynonym(word: string, synonym: string): boolean;
    addAntonym(word: string, antonym: string): boolean;
    updateDefinition(word: string, newDefinition: string): boolean;
    deleteEntry(word: string): boolean;
    getStatistics(): {
        totalEntries: number;
        totalRoots: number;
        typeDistribution: Record<WordType, number>;
        sourceDistribution: Record<DefinitionSource, number>;
        averageConfidence: number;
        entriesWithExamples: number;
        entriesWithSynonyms: number;
    };
    clear(): void;
}
