/**
 * English Root Analyzer
 * محلل الجذور الإنجليزية
 * 
 * Analyzes English word roots, stems, and morphological patterns
 * يحلل جذور الكلمات الإنجليزية والأنماط الصرفية
 */

export type EnglishRootType = 'simple' | 'compound' | 'derived' | 'latin' | 'greek';
export type EnglishAffixType = 'prefix' | 'suffix' | 'infix';

export interface EnglishWordRoot {
  id: string;
  root: string;
  type: EnglishRootType;
  stem: string;
  affixes: EnglishAffix[];
  etymology: string | null;
  confidence: number;
  timestamp: number;
}

export interface EnglishAffix {
  type: EnglishAffixType;
  value: string;
  meaning: string;
  position: number;
}

export interface EnglishRootFamily {
  root: string;
  words: string[];
  commonMeaning: string;
  derivations: number;
}

/**
 * English Root Analyzer
 * محلل الجذور الإنجليزية
 */
export class EnglishRootAnalyzer {
  private roots: Map<string, EnglishWordRoot> = new Map();
  private families: Map<string, EnglishRootFamily> = new Map();
  private rootCounter: number = 0;
  
  // Common English prefixes
  private readonly commonPrefixes = [
    'un', 're', 'in', 'im', 'dis', 'en', 'non', 'over', 'mis', 'sub',
    'pre', 'inter', 'fore', 'de', 'trans', 'super', 'semi', 'anti',
    'mid', 'under', 'auto', 'co', 'ex', 'bi', 'tri', 'multi', 'poly'
  ];
  
  // Common English suffixes
  private readonly commonSuffixes = [
    'ed', 'ing', 'ly', 'er', 'est', 'tion', 'sion', 'ness', 'ment',
    'ful', 'less', 'able', 'ible', 'al', 'ial', 'ous', 'ious', 'ive',
    'en', 'ize', 'ise', 'ate', 'fy', 'ship', 'hood', 'dom', 'ward',
    'wise', 'like', 'some', 'y', 's', 'es'
  ];
  
  /**
   * Analyze English word root
   * تحليل جذر الكلمة الإنجليزية
   */
  analyzeRoot(word: string): EnglishWordRoot {
    const id = `en_root_${this.rootCounter++}`;
    
    // Normalize word (lowercase)
    const normalizedWord = word.toLowerCase();
    
    // Extract stem and affixes
    const { stem, affixes } = this.extractStemAndAffixes(normalizedWord);
    
    // Determine root type
    const type = this.determineRootType(stem);
    
    // Detect etymology (simplified)
    const etymology = this.detectEtymology(stem);
    
    // Calculate confidence
    const confidence = this.calculateConfidence(normalizedWord, stem, affixes);
    
    const root: EnglishWordRoot = {
      id,
      root: stem,
      type,
      stem,
      affixes,
      etymology,
      confidence,
      timestamp: Date.now()
    };
    
    this.roots.set(normalizedWord, root);
    
    // Update family
    this.updateFamily(stem, normalizedWord);
    
    return root;
  }
  
  /**
   * Extract stem and affixes from word
   * استخراج الجذع واللواحق من الكلمة
   */
  private extractStemAndAffixes(word: string): { stem: string; affixes: EnglishAffix[] } {
    let stem = word;
    const affixes: EnglishAffix[] = [];
    
    // Check for prefixes
    for (const prefix of this.commonPrefixes) {
      if (word.startsWith(prefix) && word.length > prefix.length + 2) {
        affixes.push({
          type: 'prefix',
          value: prefix,
          meaning: this.getPrefixMeaning(prefix),
          position: 0
        });
        stem = word.substring(prefix.length);
        break;
      }
    }
    
    // Check for suffixes (from longest to shortest)
    const sortedSuffixes = [...this.commonSuffixes].sort((a, b) => b.length - a.length);
    for (const suffix of sortedSuffixes) {
      if (stem.endsWith(suffix) && stem.length > suffix.length + 2) {
        affixes.push({
          type: 'suffix',
          value: suffix,
          meaning: this.getSuffixMeaning(suffix),
          position: stem.length - suffix.length
        });
        stem = stem.substring(0, stem.length - suffix.length);
        
        // Handle spelling changes (e.g., "running" -> "run")
        stem = this.normalizestem(stem, suffix);
        break;
      }
    }
    
    return { stem, affixes };
  }
  
  /**
   * Normalize stem after suffix removal
   * تطبيع الجذع بعد إزالة اللاحقة
   */
  private normalizestem(stem: string, suffix: string): string {
    // Handle doubled consonants (e.g., "running" -> "run")
    if (suffix === 'ing' || suffix === 'ed') {
      if (stem.length >= 2 && stem[stem.length - 1] === stem[stem.length - 2]) {
        const lastChar = stem[stem.length - 1];
        // Common doubled consonants
        if ('bdfglmnprst'.includes(lastChar)) {
          return stem.substring(0, stem.length - 1);
        }
      }
    }
    
    // Handle 'e' dropping (e.g., "making" -> "make")
    if (suffix === 'ing' || suffix === 'ed' || suffix === 'er') {
      // Add 'e' back if stem ends with consonant + consonant
      if (stem.length >= 2) {
        const lastTwo = stem.substring(stem.length - 2);
        if (this.isConsonant(lastTwo[0]) && this.isConsonant(lastTwo[1])) {
          // Don't add 'e' for words like "help" -> "helping"
        } else if (this.isConsonant(stem[stem.length - 1])) {
          // Might need 'e' (e.g., "make" -> "making")
          // This is a simplified heuristic
        }
      }
    }
    
    return stem;
  }
  
  /**
   * Check if character is consonant
   * التحقق من كون الحرف ساكن
   */
  private isConsonant(char: string): boolean {
    return !!char && !'aeiou'.includes(char.toLowerCase());
  }
  
  /**
   * Determine root type
   * تحديد نوع الجذر
   */
  private determineRootType(stem: string): EnglishRootType {
    // Check if compound (contains hyphen or common compound patterns)
    if (stem.includes('-')) return 'compound';
    
    // Check for Latin/Greek roots (simplified heuristic)
    if (this.hasLatinPattern(stem)) return 'latin';
    if (this.hasGreekPattern(stem)) return 'greek';
    
    // Check if derived (has recognizable morphemes)
    if (stem.length > 6) return 'derived';
    
    return 'simple';
  }
  
  /**
   * Detect Latin patterns
   * كشف الأنماط اللاتينية
   */
  private hasLatinPattern(stem: string): boolean {
    const latinPatterns = ['tion', 'sion', 'ment', 'ance', 'ence', 'ity', 'ate'];
    return latinPatterns.some(pattern => stem.includes(pattern));
  }
  
  /**
   * Detect Greek patterns
   * كشف الأنماط اليونانية
   */
  private hasGreekPattern(stem: string): boolean {
    const greekPatterns = ['graph', 'phon', 'log', 'bio', 'geo', 'tele', 'photo', 'auto'];
    return greekPatterns.some(pattern => stem.includes(pattern));
  }
  
  /**
   * Detect etymology (simplified)
   * كشف أصل الكلمة
   */
  private detectEtymology(stem: string): string | null {
    if (this.hasLatinPattern(stem)) return 'Latin';
    if (this.hasGreekPattern(stem)) return 'Greek';
    return 'Germanic'; // Default for English
  }
  
  /**
   * Get prefix meaning
   * الحصول على معنى البادئة
   */
  private getPrefixMeaning(prefix: string): string {
    const meanings: Record<string, string> = {
      'un': 'not, opposite',
      're': 'again, back',
      'in': 'not, into',
      'im': 'not',
      'dis': 'not, opposite',
      'en': 'make, put into',
      'non': 'not',
      'over': 'too much',
      'mis': 'wrongly',
      'sub': 'under',
      'pre': 'before',
      'inter': 'between',
      'fore': 'before',
      'de': 'opposite, remove',
      'trans': 'across',
      'super': 'above',
      'semi': 'half',
      'anti': 'against',
      'mid': 'middle',
      'under': 'below'
    };
    return meanings[prefix] || 'unknown';
  }
  
  /**
   * Get suffix meaning
   * الحصول على معنى اللاحقة
   */
  private getSuffixMeaning(suffix: string): string {
    const meanings: Record<string, string> = {
      'ed': 'past tense',
      'ing': 'present participle',
      'ly': 'in a manner',
      'er': 'one who, more',
      'est': 'most',
      'tion': 'act or state',
      'sion': 'act or state',
      'ness': 'state or quality',
      'ment': 'action or result',
      'ful': 'full of',
      'less': 'without',
      'able': 'capable of',
      'ible': 'capable of',
      'al': 'relating to',
      'ous': 'full of',
      'ive': 'having nature of',
      's': 'plural',
      'es': 'plural'
    };
    return meanings[suffix] || 'unknown';
  }
  
  /**
   * Calculate confidence score
   * حساب درجة الثقة
   */
  private calculateConfidence(word: string, stem: string, affixes: EnglishAffix[]): number {
    let confidence = 0.5; // Base confidence
    
    // Higher confidence if we found affixes
    if (affixes.length > 0) confidence += 0.2;
    
    // Higher confidence if stem is reasonable length
    if (stem.length >= 3 && stem.length <= 8) confidence += 0.2;
    
    // Lower confidence if stem is too short or too long
    if (stem.length < 2) confidence -= 0.3;
    if (stem.length > 12) confidence -= 0.2;
    
    return Math.max(0, Math.min(1, confidence));
  }
  
  /**
   * Update word family
   * تحديث عائلة الكلمات
   */
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
  
  /**
   * Get root information
   * الحصول على معلومات الجذر
   */
  getRoot(word: string): EnglishWordRoot | null {
    return this.roots.get(word.toLowerCase()) || null;
  }
  
  /**
   * Get root family
   * الحصول على عائلة الجذر
   */
  getRootFamily(root: string): EnglishRootFamily | null {
    return this.families.get(root) || null;
  }
  
  /**
   * Find related words
   * إيجاد الكلمات المرتبطة
   */
  findRelatedWords(word: string): string[] {
    const rootInfo = this.roots.get(word.toLowerCase());
    if (!rootInfo) return [];
    
    const family = this.families.get(rootInfo.stem);
    return family ? family.words.filter(w => w !== word.toLowerCase()) : [];
  }
  
  /**
   * Get statistics
   * الحصول على الإحصائيات
   */
  getStatistics(): {
    totalRoots: number;
    totalFamilies: number;
    averageDerivations: number;
    rootTypeDistribution: Record<EnglishRootType, number>;
  } {
    const rootTypeDistribution: Record<EnglishRootType, number> = {
      simple: 0,
      compound: 0,
      derived: 0,
      latin: 0,
      greek: 0
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
  
  /**
   * Clear all data
   * مسح جميع البيانات
   */
  clear(): void {
    this.roots.clear();
    this.families.clear();
    this.rootCounter = 0;
  }
}

