/**
 * مولد الاشتقاقات - Derivation Generator
 * Generates word derivations from roots
 */

export type DerivationType = 
  | 'verb' | 'noun' | 'adjective' | 'adverb' 
  | 'active_participle' | 'passive_participle' 
  | 'verbal_noun' | 'comparative';

export type DerivationForm = 
  | 'form_i' | 'form_ii' | 'form_iii' | 'form_iv' 
  | 'form_v' | 'form_vi' | 'form_vii' | 'form_viii';

export interface Derivation {
  id: string;
  root: string;
  word: string;
  type: DerivationType;
  form: DerivationForm | null;
  pattern: string;
  meaning: string;
  confidence: number;
  timestamp: number;
}

export interface DerivationRule {
  form: DerivationForm;
  pattern: string;
  type: DerivationType;
  example: string;
}

export class DerivationGenerator {
  private derivations: Map<string, Derivation> = new Map();
  private derivationCounter: number = 0;
  
  // Common derivation patterns
  private readonly patterns: DerivationRule[] = [
    // Form I (فعل)
    { form: 'form_i', pattern: 'فعل', type: 'verb', example: 'كتب' },
    { form: 'form_i', pattern: 'فاعل', type: 'active_participle', example: 'كاتب' },
    { form: 'form_i', pattern: 'مفعول', type: 'passive_participle', example: 'مكتوب' },
    { form: 'form_i', pattern: 'فعال', type: 'verbal_noun', example: 'كتاب' },
    
    // Form II (فعّل)
    { form: 'form_ii', pattern: 'فعّل', type: 'verb', example: 'علّم' },
    { form: 'form_ii', pattern: 'مفعّل', type: 'active_participle', example: 'معلّم' },
    { form: 'form_ii', pattern: 'تفعيل', type: 'verbal_noun', example: 'تعليم' },
    
    // Form III (فاعل)
    { form: 'form_iii', pattern: 'فاعل', type: 'verb', example: 'كاتب' },
    { form: 'form_iii', pattern: 'مفاعل', type: 'active_participle', example: 'مكاتب' },
    { form: 'form_iii', pattern: 'مفاعلة', type: 'verbal_noun', example: 'مكاتبة' },
    
    // Form IV (أفعل)
    { form: 'form_iv', pattern: 'أفعل', type: 'verb', example: 'أكرم' },
    { form: 'form_iv', pattern: 'مفعل', type: 'active_participle', example: 'مكرم' },
    { form: 'form_iv', pattern: 'إفعال', type: 'verbal_noun', example: 'إكرام' },
    
    // Form V (تفعّل)
    { form: 'form_v', pattern: 'تفعّل', type: 'verb', example: 'تعلّم' },
    { form: 'form_v', pattern: 'متفعّل', type: 'active_participle', example: 'متعلّم' },
    { form: 'form_v', pattern: 'تفعّل', type: 'verbal_noun', example: 'تعلّم' },
  ];
  
  generateDerivation(
    root: string,
    type: DerivationType,
    form: DerivationForm = 'form_i',
    meaning: string = ''
  ): Derivation {
    const id = `deriv_${this.derivationCounter++}`;
    
    // Find matching pattern
    const rule = this.patterns.find(p => p.form === form && p.type === type);
    const pattern = rule?.pattern || 'فعل';
    
    // Generate word from root and pattern
    const word = this.applyPattern(root, pattern);
    
    // Calculate confidence
    const confidence = rule ? 0.8 : 0.5;
    
    const derivation: Derivation = {
      id,
      root,
      word,
      type,
      form,
      pattern,
      meaning,
      confidence,
      timestamp: Date.now()
    };
    
    this.derivations.set(id, derivation);
    return derivation;
  }
  
  private applyPattern(root: string, pattern: string): string {
    const rootLetters = root.split('');
    
    if (rootLetters.length !== 3) {
      return root; // Only works for trilateral roots
    }
    
    const [r1, r2, r3] = rootLetters;
    
    // Replace pattern placeholders with root letters
    let result = pattern
      .replace(/ف/g, r1)
      .replace(/ع/g, r2)
      .replace(/ل/g, r3);
    
    return result;
  }
  
  generateAllForms(root: string): Derivation[] {
    const derivations: Derivation[] = [];
    
    // Generate common forms
    const commonForms: Array<{ type: DerivationType; form: DerivationForm }> = [
      { type: 'verb', form: 'form_i' },
      { type: 'active_participle', form: 'form_i' },
      { type: 'passive_participle', form: 'form_i' },
      { type: 'verbal_noun', form: 'form_i' },
      { type: 'verb', form: 'form_ii' },
      { type: 'verbal_noun', form: 'form_ii' },
    ];
    
    for (const { type, form } of commonForms) {
      derivations.push(this.generateDerivation(root, type, form));
    }
    
    return derivations;
  }
  
  findDerivationsByRoot(root: string): Derivation[] {
    return Array.from(this.derivations.values())
      .filter(d => d.root === root);
  }
  
  findDerivationsByType(type: DerivationType): Derivation[] {
    return Array.from(this.derivations.values())
      .filter(d => d.type === type);
  }
  
  getDerivation(id: string): Derivation | null {
    return this.derivations.get(id) || null;
  }
  
  getStatistics(): {
    totalDerivations: number;
    typeDistribution: Record<DerivationType, number>;
    formDistribution: Record<DerivationForm, number>;
    averageConfidence: number;
  } {
    const typeDistribution: Record<DerivationType, number> = {
      verb: 0,
      noun: 0,
      adjective: 0,
      adverb: 0,
      active_participle: 0,
      passive_participle: 0,
      verbal_noun: 0,
      comparative: 0
    };
    
    const formDistribution: Record<DerivationForm, number> = {
      form_i: 0,
      form_ii: 0,
      form_iii: 0,
      form_iv: 0,
      form_v: 0,
      form_vi: 0,
      form_vii: 0,
      form_viii: 0
    };
    
    let totalConfidence = 0;
    
    for (const derivation of this.derivations.values()) {
      typeDistribution[derivation.type]++;
      if (derivation.form) {
        formDistribution[derivation.form]++;
      }
      totalConfidence += derivation.confidence;
    }
    
    return {
      totalDerivations: this.derivations.size,
      typeDistribution,
      formDistribution,
      averageConfidence: this.derivations.size > 0 ? totalConfidence / this.derivations.size : 0
    };
  }
  
  clear(): void {
    this.derivations.clear();
    this.derivationCounter = 0;
  }
}

