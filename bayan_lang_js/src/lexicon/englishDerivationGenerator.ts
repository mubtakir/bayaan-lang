/**
 * English Derivation Generator
 * مولد الاشتقاقات الإنجليزية
 * 
 * Generates English word derivations and inflections
 * يولد الاشتقاقات والتصريفات للكلمات الإنجليزية
 */

export type EnglishDerivationType = 
  | 'noun' | 'verb' | 'adjective' | 'adverb'
  | 'plural' | 'past_tense' | 'present_participle' | 'past_participle'
  | 'comparative' | 'superlative' | 'gerund';

export interface EnglishDerivation {
  id: string;
  baseWord: string;
  derivedWord: string;
  type: EnglishDerivationType;
  rule: string;
  confidence: number;
  timestamp: number;
}

export interface DerivationRule {
  type: EnglishDerivationType;
  suffix: string;
  description: string;
  example: string;
}

/**
 * English Derivation Generator
 * مولد الاشتقاقات الإنجليزية
 */
export class EnglishDerivationGenerator {
  private derivations: Map<string, EnglishDerivation> = new Map();
  private derivationCounter: number = 0;
  
  // Common derivation rules
  private readonly rules: DerivationRule[] = [
    // Noun derivations
    { type: 'noun', suffix: 'ness', description: 'state or quality', example: 'happy -> happiness' },
    { type: 'noun', suffix: 'ment', description: 'action or result', example: 'develop -> development' },
    { type: 'noun', suffix: 'tion', description: 'action or state', example: 'create -> creation' },
    { type: 'noun', suffix: 'sion', description: 'action or state', example: 'decide -> decision' },
    { type: 'noun', suffix: 'ity', description: 'state or quality', example: 'real -> reality' },
    { type: 'noun', suffix: 'er', description: 'one who does', example: 'teach -> teacher' },
    { type: 'noun', suffix: 'or', description: 'one who does', example: 'act -> actor' },
    { type: 'noun', suffix: 'ist', description: 'one who practices', example: 'art -> artist' },
    { type: 'noun', suffix: 'ism', description: 'belief or practice', example: 'real -> realism' },
    
    // Verb derivations
    { type: 'verb', suffix: 'ize', description: 'make or become', example: 'real -> realize' },
    { type: 'verb', suffix: 'ify', description: 'make or become', example: 'simple -> simplify' },
    { type: 'verb', suffix: 'ate', description: 'make or become', example: 'active -> activate' },
    { type: 'verb', suffix: 'en', description: 'make or become', example: 'dark -> darken' },
    
    // Adjective derivations
    { type: 'adjective', suffix: 'ful', description: 'full of', example: 'care -> careful' },
    { type: 'adjective', suffix: 'less', description: 'without', example: 'care -> careless' },
    { type: 'adjective', suffix: 'able', description: 'capable of', example: 'read -> readable' },
    { type: 'adjective', suffix: 'ible', description: 'capable of', example: 'sense -> sensible' },
    { type: 'adjective', suffix: 'ous', description: 'full of', example: 'danger -> dangerous' },
    { type: 'adjective', suffix: 'ive', description: 'having nature of', example: 'create -> creative' },
    { type: 'adjective', suffix: 'al', description: 'relating to', example: 'nature -> natural' },
    { type: 'adjective', suffix: 'ic', description: 'relating to', example: 'base -> basic' },
    
    // Adverb derivations
    { type: 'adverb', suffix: 'ly', description: 'in a manner', example: 'quick -> quickly' },
    
    // Verb inflections
    { type: 'past_tense', suffix: 'ed', description: 'past tense', example: 'walk -> walked' },
    { type: 'present_participle', suffix: 'ing', description: 'present participle', example: 'walk -> walking' },
    { type: 'past_participle', suffix: 'ed', description: 'past participle', example: 'walk -> walked' },
    { type: 'gerund', suffix: 'ing', description: 'gerund', example: 'walk -> walking' },
    
    // Noun inflections
    { type: 'plural', suffix: 's', description: 'plural', example: 'cat -> cats' },
    { type: 'plural', suffix: 'es', description: 'plural (after s,x,z,ch,sh)', example: 'box -> boxes' },
    
    // Adjective inflections
    { type: 'comparative', suffix: 'er', description: 'comparative', example: 'fast -> faster' },
    { type: 'superlative', suffix: 'est', description: 'superlative', example: 'fast -> fastest' }
  ];
  
  /**
   * Generate derivation
   * توليد اشتقاق
   */
  generateDerivation(
    baseWord: string,
    type: EnglishDerivationType
  ): EnglishDerivation | null {
    const id = `en_deriv_${this.derivationCounter++}`;
    
    // Find matching rules
    const matchingRules = this.rules.filter(r => r.type === type);
    if (matchingRules.length === 0) return null;
    
    // Try each rule
    for (const rule of matchingRules) {
      const derivedWord = this.applyRule(baseWord, rule);
      if (derivedWord) {
        const derivation: EnglishDerivation = {
          id,
          baseWord,
          derivedWord,
          type,
          rule: rule.suffix,
          confidence: 0.7,
          timestamp: Date.now()
        };
        
        this.derivations.set(id, derivation);
        return derivation;
      }
    }
    
    return null;
  }
  
  /**
   * Apply derivation rule
   * تطبيق قاعدة الاشتقاق
   */
  private applyRule(baseWord: string, rule: DerivationRule): string | null {
    const word = baseWord.toLowerCase();
    
    // Handle special cases based on type
    switch (rule.type) {
      case 'plural':
        return this.makePlural(word, rule.suffix);
      
      case 'past_tense':
      case 'past_participle':
        return this.makePastTense(word);
      
      case 'present_participle':
      case 'gerund':
        return this.makePresentParticiple(word);
      
      case 'comparative':
        return this.makeComparative(word);
      
      case 'superlative':
        return this.makeSuperlative(word);
      
      default:
        return this.addSuffix(word, rule.suffix);
    }
  }
  
  /**
   * Make plural form
   * صيغة الجمع
   */
  private makePlural(word: string, suffix: string): string {
    // Words ending in s, x, z, ch, sh -> add 'es'
    if (word.match(/[sxz]$/) || word.match(/(ch|sh)$/)) {
      return word + 'es';
    }
    
    // Words ending in consonant + y -> change y to ies
    if (word.match(/[^aeiou]y$/)) {
      return word.slice(0, -1) + 'ies';
    }
    
    // Words ending in f or fe -> change to ves
    if (word.match(/f$/)) {
      return word.slice(0, -1) + 'ves';
    }
    if (word.match(/fe$/)) {
      return word.slice(0, -2) + 'ves';
    }
    
    // Words ending in consonant + o -> add 'es'
    if (word.match(/[^aeiou]o$/)) {
      return word + 'es';
    }
    
    // Default: add 's'
    return word + 's';
  }
  
  /**
   * Make past tense
   * صيغة الماضي
   */
  private makePastTense(word: string): string {
    // Words ending in 'e' -> add 'd'
    if (word.endsWith('e')) {
      return word + 'd';
    }
    
    // Words ending in consonant + y -> change y to ied
    if (word.match(/[^aeiou]y$/)) {
      return word.slice(0, -1) + 'ied';
    }
    
    // Short words ending in CVC (consonant-vowel-consonant) -> double last consonant
    if (this.isCVC(word) && word.length <= 4) {
      return word + word[word.length - 1] + 'ed';
    }
    
    // Default: add 'ed'
    return word + 'ed';
  }
  
  /**
   * Make present participle
   * صيغة اسم الفاعل
   */
  private makePresentParticiple(word: string): string {
    // Words ending in 'e' (not 'ee', 'oe', 'ye') -> drop 'e' and add 'ing'
    if (word.endsWith('e') && !word.match(/(ee|oe|ye)$/)) {
      return word.slice(0, -1) + 'ing';
    }
    
    // Words ending in 'ie' -> change to 'ying'
    if (word.endsWith('ie')) {
      return word.slice(0, -2) + 'ying';
    }
    
    // Short words ending in CVC -> double last consonant
    if (this.isCVC(word) && word.length <= 4) {
      return word + word[word.length - 1] + 'ing';
    }
    
    // Default: add 'ing'
    return word + 'ing';
  }
  
  /**
   * Make comparative form
   * صيغة المقارنة
   */
  private makeComparative(word: string): string {
    // Words ending in 'e' -> add 'r'
    if (word.endsWith('e')) {
      return word + 'r';
    }
    
    // Words ending in consonant + y -> change y to ier
    if (word.match(/[^aeiou]y$/)) {
      return word.slice(0, -1) + 'ier';
    }
    
    // Short words ending in CVC -> double last consonant
    if (this.isCVC(word) && word.length <= 4) {
      return word + word[word.length - 1] + 'er';
    }
    
    // Default: add 'er'
    return word + 'er';
  }
  
  /**
   * Make superlative form
   * صيغة التفضيل
   */
  private makeSuperlative(word: string): string {
    // Words ending in 'e' -> add 'st'
    if (word.endsWith('e')) {
      return word + 'st';
    }
    
    // Words ending in consonant + y -> change y to iest
    if (word.match(/[^aeiou]y$/)) {
      return word.slice(0, -1) + 'iest';
    }
    
    // Short words ending in CVC -> double last consonant
    if (this.isCVC(word) && word.length <= 4) {
      return word + word[word.length - 1] + 'est';
    }
    
    // Default: add 'est'
    return word + 'est';
  }
  
  /**
   * Add suffix to word
   * إضافة لاحقة للكلمة
   */
  private addSuffix(word: string, suffix: string): string {
    // Handle 'e' dropping before vowel suffixes
    if (word.endsWith('e') && 'aeiou'.includes(suffix[0])) {
      return word.slice(0, -1) + suffix;
    }
    
    // Handle consonant + y before suffixes
    if (word.match(/[^aeiou]y$/) && !suffix.startsWith('i')) {
      return word.slice(0, -1) + 'i' + suffix;
    }
    
    return word + suffix;
  }
  
  /**
   * Check if word follows CVC pattern
   * التحقق من نمط CVC
   */
  private isCVC(word: string): boolean {
    if (word.length < 3) return false;
    
    const last3 = word.slice(-3);
    const c1 = this.isConsonant(last3[0]);
    const v = this.isVowel(last3[1]);
    const c2 = this.isConsonant(last3[2]);
    
    // Exclude 'w', 'x', 'y' as final consonant
    const validFinal = c2 && !'wxy'.includes(last3[2]);
    
    return c1 && v && validFinal;
  }
  
  /**
   * Check if character is consonant
   * التحقق من كون الحرف ساكن
   */
  private isConsonant(char: string): boolean {
    return !!char && !'aeiou'.includes(char.toLowerCase());
  }

  /**
   * Check if character is vowel
   * التحقق من كون الحرف حرف علة
   */
  private isVowel(char: string): boolean {
    return !!char && 'aeiou'.includes(char.toLowerCase());
  }
  
  /**
   * Generate all common derivations
   * توليد جميع الاشتقاقات الشائعة
   */
  generateAllDerivations(baseWord: string): EnglishDerivation[] {
    const derivations: EnglishDerivation[] = [];
    
    // Try all derivation types
    const types: EnglishDerivationType[] = [
      'plural', 'past_tense', 'present_participle', 'past_participle',
      'comparative', 'superlative', 'gerund', 'noun', 'adjective', 'adverb'
    ];
    
    for (const type of types) {
      const derivation = this.generateDerivation(baseWord, type);
      if (derivation) {
        derivations.push(derivation);
      }
    }
    
    return derivations;
  }
  
  /**
   * Get derivation by ID
   * الحصول على اشتقاق بالمعرف
   */
  getDerivation(id: string): EnglishDerivation | null {
    return this.derivations.get(id) || null;
  }
  
  /**
   * Find derivations by base word
   * إيجاد الاشتقاقات بالكلمة الأساسية
   */
  findDerivationsByBaseWord(baseWord: string): EnglishDerivation[] {
    return Array.from(this.derivations.values())
      .filter(d => d.baseWord.toLowerCase() === baseWord.toLowerCase());
  }
  
  /**
   * Clear all derivations
   * مسح جميع الاشتقاقات
   */
  clear(): void {
    this.derivations.clear();
    this.derivationCounter = 0;
  }
}

