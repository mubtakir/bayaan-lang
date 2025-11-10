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

export class LexiconEngine {
  private entries: Map<string, LexiconEntry> = new Map();
  private rootIndex: Map<string, Set<string>> = new Map(); // root -> word IDs
  private typeIndex: Map<WordType, Set<string>> = new Map(); // type -> word IDs
  private entryCounter: number = 0;
  
  addEntry(
    word: string,
    type: WordType,
    definition: string,
    root: string | null = null,
    source: DefinitionSource = 'manual'
  ): LexiconEntry {
    const id = `entry_${this.entryCounter++}`;
    
    const entry: LexiconEntry = {
      id,
      word,
      type,
      root,
      definition,
      examples: [],
      synonyms: [],
      antonyms: [],
      source,
      confidence: source === 'manual' ? 1.0 : 0.7,
      timestamp: Date.now()
    };
    
    this.entries.set(word, entry);
    
    // Update indices
    this.updateIndices(entry);
    
    return entry;
  }
  
  private updateIndices(entry: LexiconEntry): void {
    // Update root index
    if (entry.root) {
      if (!this.rootIndex.has(entry.root)) {
        this.rootIndex.set(entry.root, new Set());
      }
      this.rootIndex.get(entry.root)!.add(entry.id);
    }
    
    // Update type index
    if (!this.typeIndex.has(entry.type)) {
      this.typeIndex.set(entry.type, new Set());
    }
    this.typeIndex.get(entry.type)!.add(entry.id);
  }
  
  getEntry(word: string): LexiconEntry | null {
    return this.entries.get(word) || null;
  }

  getAllEntries(): LexiconEntry[] {
    return Array.from(this.entries.values());
  }

  search(query: string, options: SearchOptions = {}): LexiconEntry[] {
    const {
      exactMatch = false,
      includeRoot = true,
      includeSynonyms = true,
      minConfidence = 0.0,
      wordType
    } = options;
    
    const results: LexiconEntry[] = [];
    
    for (const entry of this.entries.values()) {
      // Filter by confidence
      if (entry.confidence < minConfidence) continue;
      
      // Filter by word type
      if (wordType && entry.type !== wordType) continue;
      
      // Check word match
      if (exactMatch) {
        if (entry.word === query) {
          results.push(entry);
        }
      } else {
        if (entry.word.includes(query)) {
          results.push(entry);
          continue;
        }
        
        // Check root match
        if (includeRoot && entry.root && entry.root.includes(query)) {
          results.push(entry);
          continue;
        }
        
        // Check synonyms
        if (includeSynonyms && entry.synonyms.some(s => s.includes(query))) {
          results.push(entry);
          continue;
        }
      }
    }
    
    return results;
  }
  
  findByRoot(root: string): LexiconEntry[] {
    const wordIds = this.rootIndex.get(root);
    if (!wordIds) return [];
    
    const results: LexiconEntry[] = [];
    for (const entry of this.entries.values()) {
      if (wordIds.has(entry.id)) {
        results.push(entry);
      }
    }
    
    return results;
  }
  
  findByType(type: WordType): LexiconEntry[] {
    const wordIds = this.typeIndex.get(type);
    if (!wordIds) return [];
    
    const results: LexiconEntry[] = [];
    for (const entry of this.entries.values()) {
      if (wordIds.has(entry.id)) {
        results.push(entry);
      }
    }
    
    return results;
  }
  
  addExample(word: string, example: string): boolean {
    const entry = this.entries.get(word);
    if (!entry) return false;
    
    if (!entry.examples.includes(example)) {
      entry.examples.push(example);
    }
    
    return true;
  }
  
  addSynonym(word: string, synonym: string): boolean {
    const entry = this.entries.get(word);
    if (!entry) return false;
    
    if (!entry.synonyms.includes(synonym)) {
      entry.synonyms.push(synonym);
    }
    
    return true;
  }
  
  addAntonym(word: string, antonym: string): boolean {
    const entry = this.entries.get(word);
    if (!entry) return false;
    
    if (!entry.antonyms.includes(antonym)) {
      entry.antonyms.push(antonym);
    }
    
    return true;
  }
  
  updateDefinition(word: string, newDefinition: string): boolean {
    const entry = this.entries.get(word);
    if (!entry) return false;
    
    entry.definition = newDefinition;
    entry.timestamp = Date.now();
    
    return true;
  }
  
  deleteEntry(word: string): boolean {
    const entry = this.entries.get(word);
    if (!entry) return false;
    
    // Remove from indices
    if (entry.root) {
      const rootSet = this.rootIndex.get(entry.root);
      if (rootSet) {
        rootSet.delete(entry.id);
        if (rootSet.size === 0) {
          this.rootIndex.delete(entry.root);
        }
      }
    }
    
    const typeSet = this.typeIndex.get(entry.type);
    if (typeSet) {
      typeSet.delete(entry.id);
      if (typeSet.size === 0) {
        this.typeIndex.delete(entry.type);
      }
    }
    
    return this.entries.delete(word);
  }
  
  getStatistics(): {
    totalEntries: number;
    totalRoots: number;
    typeDistribution: Record<WordType, number>;
    sourceDistribution: Record<DefinitionSource, number>;
    averageConfidence: number;
    entriesWithExamples: number;
    entriesWithSynonyms: number;
  } {
    const typeDistribution: Record<WordType, number> = {
      noun: 0,
      verb: 0,
      adjective: 0,
      adverb: 0,
      particle: 0,
      pronoun: 0
    };
    
    const sourceDistribution: Record<DefinitionSource, number> = {
      manual: 0,
      imported: 0,
      generated: 0,
      derived: 0
    };
    
    let totalConfidence = 0;
    let entriesWithExamples = 0;
    let entriesWithSynonyms = 0;
    
    for (const entry of this.entries.values()) {
      typeDistribution[entry.type]++;
      sourceDistribution[entry.source]++;
      totalConfidence += entry.confidence;
      
      if (entry.examples.length > 0) entriesWithExamples++;
      if (entry.synonyms.length > 0) entriesWithSynonyms++;
    }
    
    return {
      totalEntries: this.entries.size,
      totalRoots: this.rootIndex.size,
      typeDistribution,
      sourceDistribution,
      averageConfidence: this.entries.size > 0 ? totalConfidence / this.entries.size : 0,
      entriesWithExamples,
      entriesWithSynonyms
    };
  }
  
  clear(): void {
    this.entries.clear();
    this.rootIndex.clear();
    this.typeIndex.clear();
    this.entryCounter = 0;
  }
}

