/**
 * محلل الجذور - Root Analyzer
 * Analyzes Arabic word roots and patterns
 */

export type RootType = 'trilateral' | 'quadrilateral' | 'quinqueliteral';
export type RootPattern = 'فعل' | 'فعال' | 'فاعل' | 'مفعول' | 'فعيل' | 'فعلان' | 'فعلى';

export interface WordRoot {
  id: string;
  root: string;
  type: RootType;
  letters: string[];
  pattern: RootPattern | null;
  confidence: number;
  timestamp: number;
}

export interface RootFamily {
  root: string;
  words: string[];
  commonMeaning: string;
  derivations: number;
}

export class RootAnalyzer {
  private roots: Map<string, WordRoot> = new Map();
  private families: Map<string, RootFamily> = new Map();
  private rootCounter: number = 0;
  
  // Arabic letters that are typically removed to find root
  private readonly removableLetters = ['ا', 'و', 'ي', 'ت', 'م', 'ن', 'ه'];
  
  analyzeRoot(word: string): WordRoot {
    const id = `root_${this.rootCounter++}`;
    
    // Remove diacritics
    const cleanWord = this.removeDiacritics(word);
    
    // Extract root letters
    const rootLetters = this.extractRootLetters(cleanWord);
    
    // Determine root type
    const type = this.determineRootType(rootLetters);
    
    // Detect pattern
    const pattern = this.detectPattern(cleanWord, rootLetters);
    
    // Calculate confidence
    const confidence = this.calculateConfidence(cleanWord, rootLetters);
    
    const root: WordRoot = {
      id,
      root: rootLetters.join(''),
      type,
      letters: rootLetters,
      pattern,
      confidence,
      timestamp: Date.now()
    };
    
    this.roots.set(word, root);
    
    // Update family
    this.updateFamily(root.root, word);
    
    return root;
  }
  
  private removeDiacritics(word: string): string {
    // Remove Arabic diacritics (tashkeel)
    return word.replace(/[\u064B-\u065F\u0670]/g, '');
  }
  
  private extractRootLetters(word: string): string[] {
    const letters = word.split('');
    const rootLetters: string[] = [];
    
    // Simple heuristic: remove common affixes and infixes
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      
      // Skip if it's a removable letter in certain positions
      if (i === 0 && letter === 'ا') continue; // Alif at start
      if (i === 0 && letter === 'م') continue; // Meem at start (مفعول)
      if (i === 0 && letter === 'ت') continue; // Ta at start (تفعيل)
      if (i === letters.length - 1 && letter === 'ه') continue; // Ha at end
      if (i === letters.length - 1 && letter === 'ة') continue; // Ta marbuta at end
      
      // Skip doubled letters (keep only one)
      if (i > 0 && letter === letters[i - 1] && rootLetters.includes(letter)) {
        continue;
      }
      
      rootLetters.push(letter);
    }
    
    // If we have more than 3 letters, try to reduce to 3
    if (rootLetters.length > 3) {
      return this.reduceToThreeLetters(rootLetters, word);
    }
    
    return rootLetters;
  }
  
  private reduceToThreeLetters(letters: string[], word: string): string[] {
    // Try to identify and remove infixes
    const result: string[] = [];
    
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      
      // Skip long vowels in middle positions
      if (i > 0 && i < letters.length - 1) {
        if (letter === 'ا' || letter === 'و' || letter === 'ي') {
          continue;
        }
      }
      
      result.push(letter);
      
      if (result.length === 3) break;
    }
    
    return result.length === 3 ? result : letters.slice(0, 3);
  }
  
  private determineRootType(letters: string[]): RootType {
    switch (letters.length) {
      case 3:
        return 'trilateral';
      case 4:
        return 'quadrilateral';
      case 5:
        return 'quinqueliteral';
      default:
        return 'trilateral'; // Default to most common
    }
  }
  
  private detectPattern(word: string, rootLetters: string[]): RootPattern | null {
    if (rootLetters.length !== 3) return null;
    
    const [r1, r2, r3] = rootLetters;
    
    // فعل pattern
    if (word === `${r1}${r2}${r3}`) return 'فعل';
    
    // فاعل pattern
    if (word === `${r1}ا${r2}${r3}` || word === `${r1}ائ${r2}`) return 'فاعل';
    
    // مفعول pattern
    if (word.startsWith('م') && word.includes(r1) && word.includes(r2) && word.includes(r3)) {
      return 'مفعول';
    }
    
    // فعيل pattern
    if (word === `${r1}${r2}ي${r3}` || word === `${r1}ع${r2}ي${r3}`) return 'فعيل';
    
    // فعال pattern
    if (word === `${r1}${r2}ا${r3}` || word === `${r1}عا${r3}`) return 'فعال';
    
    return null;
  }
  
  private calculateConfidence(word: string, rootLetters: string[]): number {
    let confidence = 0.5; // Base confidence
    
    // Higher confidence for 3-letter roots
    if (rootLetters.length === 3) confidence += 0.2;
    
    // Higher confidence if word length is reasonable
    if (word.length >= 3 && word.length <= 7) confidence += 0.1;
    
    // Higher confidence if no numbers or special chars
    if (!/[0-9]/.test(word)) confidence += 0.1;
    
    // Higher confidence if all Arabic letters
    if (/^[\u0600-\u06FF]+$/.test(word)) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }
  
  private updateFamily(root: string, word: string): void {
    if (!this.families.has(root)) {
      this.families.set(root, {
        root,
        words: [],
        commonMeaning: '',
        derivations: 0
      });
    }
    
    const family = this.families.get(root)!;
    if (!family.words.includes(word)) {
      family.words.push(word);
      family.derivations = family.words.length;
    }
  }
  
  getRoot(word: string): WordRoot | null {
    return this.roots.get(word) || null;
  }
  
  getRootFamily(root: string): RootFamily | null {
    return this.families.get(root) || null;
  }
  
  findRelatedWords(word: string): string[] {
    const rootInfo = this.roots.get(word);
    if (!rootInfo) return [];
    
    const family = this.families.get(rootInfo.root);
    return family ? family.words.filter(w => w !== word) : [];
  }
  
  getStatistics(): {
    totalRoots: number;
    totalFamilies: number;
    averageDerivations: number;
    rootTypeDistribution: Record<RootType, number>;
  } {
    const rootTypeDistribution: Record<RootType, number> = {
      trilateral: 0,
      quadrilateral: 0,
      quinqueliteral: 0
    };
    
    for (const root of this.roots.values()) {
      rootTypeDistribution[root.type]++;
    }
    
    let totalDerivations = 0;
    for (const family of this.families.values()) {
      totalDerivations += family.derivations;
    }
    
    return {
      totalRoots: this.roots.size,
      totalFamilies: this.families.size,
      averageDerivations: this.families.size > 0 ? totalDerivations / this.families.size : 0,
      rootTypeDistribution
    };
  }
  
  clear(): void {
    this.roots.clear();
    this.families.clear();
    this.rootCounter = 0;
  }
}

