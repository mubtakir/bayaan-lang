/**
 * مستخرج الأنماط - Pattern Extractor
 * Extracts patterns from words based on letter meanings
 */

export type PatternType = 'prefix' | 'suffix' | 'infix' | 'root' | 'combination';
export type PatternStrength = 'weak' | 'moderate' | 'strong' | 'very_strong';

export interface LetterPattern {
  id: string;
  pattern: string;
  type: PatternType;
  letters: string[];
  meaning: string;
  examples: string[];
  frequency: number;
  strength: PatternStrength;
  confidence: number;
  timestamp: number;
}

export interface PatternMatch {
  pattern: LetterPattern;
  word: string;
  position: number;
  matchedLetters: string[];
  confidence: number;
}

export class PatternExtractor {
  private patterns: Map<string, LetterPattern> = new Map();
  private patternCounter: number = 0;
  
  addPattern(
    pattern: string,
    type: PatternType,
    meaning: string,
    examples: string[] = [],
    strength: PatternStrength = 'moderate'
  ): LetterPattern {
    const id = `pattern_${this.patternCounter++}`;
    const letters = pattern.split('');
    
    const letterPattern: LetterPattern = {
      id,
      pattern,
      type,
      letters,
      meaning,
      examples,
      frequency: examples.length,
      strength,
      confidence: this.calculateConfidence(strength, examples.length),
      timestamp: Date.now()
    };
    
    this.patterns.set(id, letterPattern);
    
    return letterPattern;
  }
  
  private calculateConfidence(strength: PatternStrength, exampleCount: number): number {
    const strengthValues: Record<PatternStrength, number> = {
      weak: 0.3,
      moderate: 0.5,
      strong: 0.7,
      very_strong: 0.9
    };
    
    const baseConfidence = strengthValues[strength];
    const exampleBonus = Math.min(0.1, exampleCount * 0.01);
    
    return Math.min(1.0, baseConfidence + exampleBonus);
  }
  
  extractPatterns(word: string): PatternMatch[] {
    const matches: PatternMatch[] = [];
    
    for (const pattern of this.patterns.values()) {
      const match = this.matchPattern(word, pattern);
      if (match) {
        matches.push(match);
      }
    }
    
    return matches.sort((a, b) => b.confidence - a.confidence);
  }
  
  private matchPattern(word: string, pattern: LetterPattern): PatternMatch | null {
    const wordLetters = word.split('');
    
    switch (pattern.type) {
      case 'prefix':
        return this.matchPrefix(word, wordLetters, pattern);
      case 'suffix':
        return this.matchSuffix(word, wordLetters, pattern);
      case 'infix':
        return this.matchInfix(word, wordLetters, pattern);
      case 'root':
        return this.matchRoot(word, wordLetters, pattern);
      case 'combination':
        return this.matchCombination(word, wordLetters, pattern);
      default:
        return null;
    }
  }
  
  private matchPrefix(word: string, wordLetters: string[], pattern: LetterPattern): PatternMatch | null {
    if (wordLetters.length < pattern.letters.length) return null;
    
    for (let i = 0; i < pattern.letters.length; i++) {
      if (wordLetters[i] !== pattern.letters[i]) {
        return null;
      }
    }
    
    return {
      pattern,
      word,
      position: 0,
      matchedLetters: pattern.letters,
      confidence: pattern.confidence
    };
  }
  
  private matchSuffix(word: string, wordLetters: string[], pattern: LetterPattern): PatternMatch | null {
    if (wordLetters.length < pattern.letters.length) return null;
    
    const startPos = wordLetters.length - pattern.letters.length;
    
    for (let i = 0; i < pattern.letters.length; i++) {
      if (wordLetters[startPos + i] !== pattern.letters[i]) {
        return null;
      }
    }
    
    return {
      pattern,
      word,
      position: startPos,
      matchedLetters: pattern.letters,
      confidence: pattern.confidence
    };
  }
  
  private matchInfix(word: string, wordLetters: string[], pattern: LetterPattern): PatternMatch | null {
    if (wordLetters.length < pattern.letters.length + 2) return null;
    
    for (let pos = 1; pos < wordLetters.length - pattern.letters.length; pos++) {
      let match = true;
      
      for (let i = 0; i < pattern.letters.length; i++) {
        if (wordLetters[pos + i] !== pattern.letters[i]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        return {
          pattern,
          word,
          position: pos,
          matchedLetters: pattern.letters,
          confidence: pattern.confidence * 0.9 // Slightly lower confidence for infixes
        };
      }
    }
    
    return null;
  }
  
  private matchRoot(word: string, wordLetters: string[], pattern: LetterPattern): PatternMatch | null {
    // Check if all pattern letters exist in word (order doesn't matter)
    const matchedLetters: string[] = [];
    const remainingLetters = [...wordLetters];
    
    for (const patternLetter of pattern.letters) {
      const index = remainingLetters.indexOf(patternLetter);
      if (index === -1) {
        return null;
      }
      matchedLetters.push(patternLetter);
      remainingLetters.splice(index, 1);
    }
    
    return {
      pattern,
      word,
      position: -1, // Root doesn't have specific position
      matchedLetters,
      confidence: pattern.confidence * 0.8 // Lower confidence for root matching
    };
  }
  
  private matchCombination(word: string, wordLetters: string[], pattern: LetterPattern): PatternMatch | null {
    // Check if pattern letters appear in sequence (but not necessarily consecutive)
    let wordIndex = 0;
    const matchedLetters: string[] = [];
    
    for (const patternLetter of pattern.letters) {
      let found = false;
      
      while (wordIndex < wordLetters.length) {
        if (wordLetters[wordIndex] === patternLetter) {
          matchedLetters.push(patternLetter);
          found = true;
          wordIndex++;
          break;
        }
        wordIndex++;
      }
      
      if (!found) {
        return null;
      }
    }
    
    return {
      pattern,
      word,
      position: 0,
      matchedLetters,
      confidence: pattern.confidence * 0.85
    };
  }
  
  findPatternsByType(type: PatternType): LetterPattern[] {
    return Array.from(this.patterns.values())
      .filter(p => p.type === type);
  }
  
  findPatternsByStrength(strength: PatternStrength): LetterPattern[] {
    return Array.from(this.patterns.values())
      .filter(p => p.strength === strength);
  }
  
  getPattern(id: string): LetterPattern | null {
    return this.patterns.get(id) || null;
  }
  
  updatePatternFrequency(id: string, newExample: string): boolean {
    const pattern = this.patterns.get(id);
    if (!pattern) return false;
    
    if (!pattern.examples.includes(newExample)) {
      pattern.examples.push(newExample);
      pattern.frequency = pattern.examples.length;
      pattern.confidence = this.calculateConfidence(pattern.strength, pattern.frequency);
      pattern.timestamp = Date.now();
    }
    
    return true;
  }
  
  getStatistics(): {
    totalPatterns: number;
    typeDistribution: Record<PatternType, number>;
    strengthDistribution: Record<PatternStrength, number>;
    averageFrequency: number;
    averageConfidence: number;
  } {
    const typeDistribution: Record<PatternType, number> = {
      prefix: 0,
      suffix: 0,
      infix: 0,
      root: 0,
      combination: 0
    };
    
    const strengthDistribution: Record<PatternStrength, number> = {
      weak: 0,
      moderate: 0,
      strong: 0,
      very_strong: 0
    };
    
    let totalFrequency = 0;
    let totalConfidence = 0;
    
    for (const pattern of this.patterns.values()) {
      typeDistribution[pattern.type]++;
      strengthDistribution[pattern.strength]++;
      totalFrequency += pattern.frequency;
      totalConfidence += pattern.confidence;
    }
    
    return {
      totalPatterns: this.patterns.size,
      typeDistribution,
      strengthDistribution,
      averageFrequency: this.patterns.size > 0 ? totalFrequency / this.patterns.size : 0,
      averageConfidence: this.patterns.size > 0 ? totalConfidence / this.patterns.size : 0
    };
  }
  
  clear(): void {
    this.patterns.clear();
    this.patternCounter = 0;
  }
}

