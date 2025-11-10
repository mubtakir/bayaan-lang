/**
 * محلل معاني الحروف - Letter Meaning Analyzer
 * Analyzes and manages meanings of Arabic letters
 */

export type MeaningType = 'psychological' | 'physical' | 'mixed';
export type ArticulationPoint = 'throat' | 'pharynx' | 'palate' | 'alveolar' | 'dental' | 'labial' | 'glottal';
export type ArticulationDepth = 'internal' | 'middle' | 'external';
export type MeaningSource = 'developer' | 'dictionary' | 'pattern' | 'context' | 'system';

export interface LetterMeaning {
  id: string;
  letter: string;
  meaning: string;
  opposite: string | null;
  examples: string[];
  strength: number;
  confidence: number;
  source: MeaningSource;
  wordsCount: number;
  timestamp: number;
}

export interface LetterProfile {
  letter: string;
  articulationPoint: ArticulationPoint;
  articulationDepth: ArticulationDepth;
  meaningType: MeaningType;
  meanings: LetterMeaning[];
  totalMeanings: number;
  averageStrength: number;
  averageConfidence: number;
}

export class LetterMeaningAnalyzer {
  private meanings: Map<string, LetterMeaning[]> = new Map(); // letter -> meanings
  private profiles: Map<string, LetterProfile> = new Map();
  private meaningCounter: number = 0;
  
  // Articulation point mappings
  private readonly articulationMap: Record<string, ArticulationPoint> = {
    'ء': 'glottal', 'ه': 'glottal', 'ع': 'pharynx', 'ح': 'pharynx',
    'غ': 'throat', 'خ': 'throat', 'ق': 'palate', 'ك': 'palate',
    'ج': 'palate', 'ش': 'palate', 'ي': 'palate',
    'ض': 'alveolar', 'ل': 'alveolar', 'ن': 'alveolar', 'ر': 'alveolar',
    'ط': 'dental', 'د': 'dental', 'ت': 'dental', 'ز': 'dental', 'س': 'dental', 'ص': 'dental',
    'ث': 'dental', 'ذ': 'dental', 'ظ': 'dental',
    'ف': 'labial', 'ب': 'labial', 'م': 'labial', 'و': 'labial'
  };
  
  // Depth mappings
  private readonly depthMap: Record<ArticulationPoint, ArticulationDepth> = {
    'glottal': 'internal',
    'pharynx': 'internal',
    'throat': 'internal',
    'palate': 'middle',
    'alveolar': 'middle',
    'dental': 'external',
    'labial': 'external'
  };
  
  // Type mappings
  private readonly typeMap: Record<ArticulationDepth, MeaningType> = {
    'internal': 'psychological',
    'middle': 'mixed',
    'external': 'physical'
  };
  
  addMeaning(
    letter: string,
    meaning: string,
    source: MeaningSource = 'developer',
    opposite: string | null = null,
    examples: string[] = [],
    strength: number = 1.0,
    confidence: number = 1.0
  ): LetterMeaning {
    const id = `meaning_${this.meaningCounter++}`;
    
    const letterMeaning: LetterMeaning = {
      id,
      letter,
      meaning,
      opposite,
      examples,
      strength: Math.max(0, Math.min(1, strength)),
      confidence: Math.max(0, Math.min(1, confidence)),
      source,
      wordsCount: examples.length,
      timestamp: Date.now()
    };
    
    if (!this.meanings.has(letter)) {
      this.meanings.set(letter, []);
    }
    
    this.meanings.get(letter)!.push(letterMeaning);
    
    // Update profile
    this.updateProfile(letter);
    
    return letterMeaning;
  }
  
  private updateProfile(letter: string): void {
    const meanings = this.meanings.get(letter) || [];
    
    if (meanings.length === 0) return;
    
    const articulationPoint = this.articulationMap[letter] || 'palate';
    const articulationDepth = this.depthMap[articulationPoint];
    const meaningType = this.typeMap[articulationDepth];
    
    let totalStrength = 0;
    let totalConfidence = 0;
    
    for (const meaning of meanings) {
      totalStrength += meaning.strength;
      totalConfidence += meaning.confidence;
    }
    
    const profile: LetterProfile = {
      letter,
      articulationPoint,
      articulationDepth,
      meaningType,
      meanings: [...meanings],
      totalMeanings: meanings.length,
      averageStrength: meanings.length > 0 ? totalStrength / meanings.length : 0,
      averageConfidence: meanings.length > 0 ? totalConfidence / meanings.length : 0
    };
    
    this.profiles.set(letter, profile);
  }
  
  getMeanings(letter: string): LetterMeaning[] {
    return this.meanings.get(letter) || [];
  }
  
  getProfile(letter: string): LetterProfile | null {
    return this.profiles.get(letter) || null;
  }
  
  findMeaningsByType(meaningType: MeaningType): LetterProfile[] {
    const results: LetterProfile[] = [];
    
    for (const profile of this.profiles.values()) {
      if (profile.meaningType === meaningType) {
        results.push(profile);
      }
    }
    
    return results;
  }
  
  findMeaningsByArticulation(articulationPoint: ArticulationPoint): LetterProfile[] {
    const results: LetterProfile[] = [];
    
    for (const profile of this.profiles.values()) {
      if (profile.articulationPoint === articulationPoint) {
        results.push(profile);
      }
    }
    
    return results;
  }
  
  updateMeaningStrength(letter: string, meaningId: string, newStrength: number): boolean {
    const meanings = this.meanings.get(letter);
    if (!meanings) return false;
    
    const meaning = meanings.find(m => m.id === meaningId);
    if (!meaning) return false;
    
    meaning.strength = Math.max(0, Math.min(1, newStrength));
    meaning.timestamp = Date.now();
    
    this.updateProfile(letter);
    
    return true;
  }
  
  addExample(letter: string, meaningId: string, example: string): boolean {
    const meanings = this.meanings.get(letter);
    if (!meanings) return false;
    
    const meaning = meanings.find(m => m.id === meaningId);
    if (!meaning) return false;
    
    if (!meaning.examples.includes(example)) {
      meaning.examples.push(example);
      meaning.wordsCount = meaning.examples.length;
      meaning.timestamp = Date.now();
    }
    
    return true;
  }
  
  searchMeanings(query: string): LetterMeaning[] {
    const results: LetterMeaning[] = [];
    
    for (const meanings of this.meanings.values()) {
      for (const meaning of meanings) {
        if (meaning.meaning.includes(query) || 
            meaning.letter === query ||
            meaning.examples.some(ex => ex.includes(query))) {
          results.push(meaning);
        }
      }
    }
    
    return results;
  }
  
  getStatistics(): {
    totalLetters: number;
    totalMeanings: number;
    averageMeaningsPerLetter: number;
    typeDistribution: Record<MeaningType, number>;
    sourceDistribution: Record<MeaningSource, number>;
    articulationDistribution: Record<ArticulationPoint, number>;
  } {
    const typeDistribution: Record<MeaningType, number> = {
      psychological: 0,
      physical: 0,
      mixed: 0
    };
    
    const sourceDistribution: Record<MeaningSource, number> = {
      developer: 0,
      dictionary: 0,
      pattern: 0,
      context: 0,
      system: 0
    };
    
    const articulationDistribution: Record<ArticulationPoint, number> = {
      throat: 0,
      pharynx: 0,
      palate: 0,
      alveolar: 0,
      dental: 0,
      labial: 0,
      glottal: 0
    };
    
    let totalMeanings = 0;
    
    for (const profile of this.profiles.values()) {
      typeDistribution[profile.meaningType]++;
      articulationDistribution[profile.articulationPoint]++;
      
      for (const meaning of profile.meanings) {
        sourceDistribution[meaning.source]++;
        totalMeanings++;
      }
    }
    
    return {
      totalLetters: this.profiles.size,
      totalMeanings,
      averageMeaningsPerLetter: this.profiles.size > 0 ? totalMeanings / this.profiles.size : 0,
      typeDistribution,
      sourceDistribution,
      articulationDistribution
    };
  }
  
  clear(): void {
    this.meanings.clear();
    this.profiles.clear();
    this.meaningCounter = 0;
  }
}

