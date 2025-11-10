/**
 * مدير معاني الحروف - Letter Meanings Manager
 * Integrates all letter meanings components
 */

import { LetterMeaningAnalyzer, LetterMeaning, LetterProfile, MeaningType, ArticulationPoint, MeaningSource } from './letterMeaningAnalyzer';
import { PatternExtractor, LetterPattern, PatternMatch, PatternType, PatternStrength } from './patternExtractor';
import { AssociationEngine, MeaningAssociation, AssociationChain, RelationType, AssociationStrength } from './associationEngine';

export interface LetterAnalysis {
  letter: string;
  profile: LetterProfile | null;
  meanings: LetterMeaning[];
  patterns: PatternMatch[];
  associations: MeaningAssociation[];
  relatedMeanings: string[];
}

export interface WordAnalysis {
  word: string;
  letters: string[];
  patterns: PatternMatch[];
  letterMeanings: Map<string, LetterMeaning[]>;
  dominantMeaningType: MeaningType | null;
  confidence: number;
}

export interface LetterMeaningsSettings {
  autoExtractPatterns: boolean;
  autoCreateAssociations: boolean;
  minPatternConfidence: number;
  maxRelatedDepth: number;
}

export class LetterMeaningsManager {
  private analyzer: LetterMeaningAnalyzer;
  private patternExtractor: PatternExtractor;
  private associationEngine: AssociationEngine;
  private settings: LetterMeaningsSettings;
  
  constructor(settings?: Partial<LetterMeaningsSettings>) {
    this.analyzer = new LetterMeaningAnalyzer();
    this.patternExtractor = new PatternExtractor();
    this.associationEngine = new AssociationEngine();
    
    this.settings = {
      autoExtractPatterns: true,
      autoCreateAssociations: true,
      minPatternConfidence: 0.5,
      maxRelatedDepth: 2,
      ...settings
    };
  }
  
  addLetterMeaning(
    letter: string,
    meaning: string,
    source: MeaningSource = 'developer',
    opposite: string | null = null,
    examples: string[] = [],
    strength: number = 1.0,
    confidence: number = 1.0
  ): LetterMeaning {
    const letterMeaning = this.analyzer.addMeaning(
      letter,
      meaning,
      source,
      opposite,
      examples,
      strength,
      confidence
    );
    
    // Auto-create opposite association
    if (opposite && this.settings.autoCreateAssociations) {
      this.associationEngine.addAssociation(
        meaning,
        opposite,
        'opposite_of',
        'strong',
        [],
        true
      );
    }
    
    return letterMeaning;
  }
  
  addPattern(
    pattern: string,
    type: PatternType,
    meaning: string,
    examples: string[] = [],
    strength: PatternStrength = 'moderate'
  ): LetterPattern {
    return this.patternExtractor.addPattern(pattern, type, meaning, examples, strength);
  }
  
  addAssociation(
    fromMeaning: string,
    toMeaning: string,
    relationType: RelationType,
    strength: AssociationStrength = 'moderate',
    examples: string[] = [],
    bidirectional: boolean = false
  ): MeaningAssociation {
    return this.associationEngine.addAssociation(
      fromMeaning,
      toMeaning,
      relationType,
      strength,
      examples,
      bidirectional
    );
  }
  
  analyzeLetter(letter: string): LetterAnalysis {
    const profile = this.analyzer.getProfile(letter);
    const meanings = this.analyzer.getMeanings(letter);
    
    // Get associations for all meanings of this letter
    const associations: MeaningAssociation[] = [];
    const relatedMeaningsSet = new Set<string>();
    
    for (const meaning of meanings) {
      const assocs = this.associationEngine.getAssociations(meaning.meaning);
      associations.push(...assocs);
      
      const related = this.associationEngine.findRelatedMeanings(
        meaning.meaning,
        this.settings.maxRelatedDepth
      );
      related.forEach(m => relatedMeaningsSet.add(m));
    }
    
    return {
      letter,
      profile,
      meanings,
      patterns: [],
      associations,
      relatedMeanings: Array.from(relatedMeaningsSet)
    };
  }
  
  analyzeWord(word: string): WordAnalysis {
    const letters = word.split('');
    const letterMeanings = new Map<string, LetterMeaning[]>();
    
    // Get meanings for each letter
    for (const letter of letters) {
      const meanings = this.analyzer.getMeanings(letter);
      if (meanings.length > 0) {
        letterMeanings.set(letter, meanings);
      }
    }
    
    // Extract patterns
    let patterns: PatternMatch[] = [];
    if (this.settings.autoExtractPatterns) {
      patterns = this.patternExtractor.extractPatterns(word)
        .filter(p => p.confidence >= this.settings.minPatternConfidence);
    }
    
    // Determine dominant meaning type
    const typeCount: Record<MeaningType, number> = {
      psychological: 0,
      physical: 0,
      mixed: 0
    };
    
    for (const letter of letters) {
      const profile = this.analyzer.getProfile(letter);
      if (profile) {
        typeCount[profile.meaningType]++;
      }
    }
    
    let dominantMeaningType: MeaningType | null = null;
    let maxCount = 0;
    
    for (const [type, count] of Object.entries(typeCount)) {
      if (count > maxCount) {
        maxCount = count;
        dominantMeaningType = type as MeaningType;
      }
    }
    
    // Calculate confidence
    let totalConfidence = 0;
    let meaningCount = 0;
    
    for (const meanings of letterMeanings.values()) {
      for (const meaning of meanings) {
        totalConfidence += meaning.confidence;
        meaningCount++;
      }
    }
    
    const confidence = meaningCount > 0 ? totalConfidence / meaningCount : 0;
    
    return {
      word,
      letters,
      patterns,
      letterMeanings,
      dominantMeaningType,
      confidence
    };
  }
  
  findMeaningChain(fromMeaning: string, toMeaning: string, maxDepth: number = 3): AssociationChain | null {
    return this.associationEngine.findAssociationChain(fromMeaning, toMeaning, maxDepth);
  }
  
  searchMeanings(query: string): LetterMeaning[] {
    return this.analyzer.searchMeanings(query);
  }
  
  getLetterProfile(letter: string): LetterProfile | null {
    return this.analyzer.getProfile(letter);
  }
  
  findLettersByType(meaningType: MeaningType): LetterProfile[] {
    return this.analyzer.findMeaningsByType(meaningType);
  }
  
  findLettersByArticulation(articulationPoint: ArticulationPoint): LetterProfile[] {
    return this.analyzer.findMeaningsByArticulation(articulationPoint);
  }
  
  updateSettings(newSettings: Partial<LetterMeaningsSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }
  
  getSettings(): LetterMeaningsSettings {
    return { ...this.settings };
  }
  
  getAnalyzer(): LetterMeaningAnalyzer {
    return this.analyzer;
  }
  
  getPatternExtractor(): PatternExtractor {
    return this.patternExtractor;
  }
  
  getAssociationEngine(): AssociationEngine {
    return this.associationEngine;
  }
  
  getStatistics(): {
    analyzer: ReturnType<LetterMeaningAnalyzer['getStatistics']>;
    patterns: ReturnType<PatternExtractor['getStatistics']>;
    associations: ReturnType<AssociationEngine['getStatistics']>;
  } {
    return {
      analyzer: this.analyzer.getStatistics(),
      patterns: this.patternExtractor.getStatistics(),
      associations: this.associationEngine.getStatistics()
    };
  }
  
  clearAll(): void {
    this.analyzer.clear();
    this.patternExtractor.clear();
    this.associationEngine.clear();
  }
}

