/**
 * محلل التراكيب - Structure Analyzer
 * Analyzes linguistic structures and extracts grammatical roles
 */

export type GrammaticalRole = 'subject' | 'object' | 'verb' | 'complement' | 'modifier';
export type SentenceType = 'nominal' | 'verbal' | 'imperative' | 'interrogative' | 'exclamatory';
export type VerbTense = 'past' | 'present' | 'future' | 'imperative';

export interface GrammaticalElement {
  text: string;
  role: GrammaticalRole;
  position: number;
  confidence: number;
}

export interface SentenceStructure {
  id: string;
  sentence: string;
  type: SentenceType;
  elements: GrammaticalElement[];
  subject: string | null;
  verb: string | null;
  object: string | null;
  complements: string[];
  modifiers: string[];
  tense: VerbTense | null;
  confidence: number;
  timestamp: number;
}

export class StructureAnalyzer {
  private structures: Map<string, SentenceStructure> = new Map();
  private structureCounter: number = 0;
  
  // Common Arabic verbs and their patterns
  private readonly verbPatterns: string[] = [
    'ضرب', 'أكل', 'شرب', 'قرأ', 'كتب', 'ذهب', 'جاء', 'نام', 'استيقظ',
    'جلس', 'وقف', 'ركض', 'مشى', 'سبح', 'طار', 'قفز', 'رمى', 'أخذ',
    'أعطى', 'قال', 'سمع', 'رأى', 'فهم', 'علم', 'درس', 'عمل', 'لعب'
  ];
  
  // Common Arabic nouns
  private readonly nounPatterns: string[] = [
    'أحمد', 'محمد', 'علي', 'فاطمة', 'عائشة', 'خديجة', 'زيد', 'عمر',
    'الكرة', 'الكتاب', 'القلم', 'الماء', 'الخبز', 'التفاحة', 'الرسالة',
    'البيت', 'المدرسة', 'الحديقة', 'الشارع', 'السيارة'
  ];
  
  analyzeSentence(sentence: string): SentenceStructure {
    const id = `struct_${this.structureCounter++}`;
    
    const words = this.tokenize(sentence);
    const elements = this.extractElements(words);
    
    const structure: SentenceStructure = {
      id,
      sentence,
      type: this.detectSentenceType(words, elements),
      elements,
      subject: this.findSubject(elements),
      verb: this.findVerb(elements),
      object: this.findObject(elements),
      complements: this.findComplements(elements),
      modifiers: this.findModifiers(elements),
      tense: this.detectTense(elements),
      confidence: this.calculateConfidence(elements),
      timestamp: Date.now()
    };
    
    this.structures.set(id, structure);
    
    return structure;
  }
  
  private tokenize(sentence: string): string[] {
    // Simple tokenization by spaces
    return sentence.trim().split(/\s+/).filter(w => w.length > 0);
  }
  
  private extractElements(words: string[]): GrammaticalElement[] {
    const elements: GrammaticalElement[] = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const role = this.detectRole(word, i, words);
      
      elements.push({
        text: word,
        role,
        position: i,
        confidence: this.getRoleConfidence(word, role)
      });
    }
    
    return elements;
  }
  
  private detectRole(word: string, position: number, words: string[]): GrammaticalRole {
    // Check if it's a verb
    if (this.isVerb(word)) {
      return 'verb';
    }
    
    // Check if it's a noun
    if (this.isNoun(word)) {
      // First noun is usually subject, second is object
      const nounsBefore = words.slice(0, position).filter(w => this.isNoun(w)).length;
      
      if (nounsBefore === 0) {
        return 'subject';
      } else if (nounsBefore === 1) {
        return 'object';
      } else {
        return 'complement';
      }
    }
    
    // Default to modifier
    return 'modifier';
  }
  
  private isVerb(word: string): boolean {
    return this.verbPatterns.some(pattern => word.includes(pattern) || pattern.includes(word));
  }
  
  private isNoun(word: string): boolean {
    // Check if starts with 'ال' (definite article)
    if (word.startsWith('ال')) {
      return true;
    }
    
    // Check against known nouns
    return this.nounPatterns.some(pattern => word.includes(pattern) || pattern.includes(word));
  }
  
  private getRoleConfidence(word: string, role: GrammaticalRole): number {
    if (role === 'verb' && this.verbPatterns.includes(word)) {
      return 0.9;
    }
    
    if (role === 'subject' || role === 'object') {
      if (this.nounPatterns.includes(word)) {
        return 0.9;
      }
      if (word.startsWith('ال')) {
        return 0.8;
      }
      return 0.6;
    }
    
    return 0.5;
  }
  
  private detectSentenceType(words: string[], elements: GrammaticalElement[]): SentenceType {
    const hasVerb = elements.some(e => e.role === 'verb');
    
    if (hasVerb) {
      return 'verbal';
    }
    
    return 'nominal';
  }
  
  private findSubject(elements: GrammaticalElement[]): string | null {
    const subject = elements.find(e => e.role === 'subject');
    return subject ? subject.text : null;
  }
  
  private findVerb(elements: GrammaticalElement[]): string | null {
    const verb = elements.find(e => e.role === 'verb');
    return verb ? verb.text : null;
  }
  
  private findObject(elements: GrammaticalElement[]): string | null {
    const object = elements.find(e => e.role === 'object');
    return object ? object.text : null;
  }
  
  private findComplements(elements: GrammaticalElement[]): string[] {
    return elements
      .filter(e => e.role === 'complement')
      .map(e => e.text);
  }
  
  private findModifiers(elements: GrammaticalElement[]): string[] {
    return elements
      .filter(e => e.role === 'modifier')
      .map(e => e.text);
  }
  
  private detectTense(elements: GrammaticalElement[]): VerbTense | null {
    const verb = elements.find(e => e.role === 'verb');
    if (!verb) return null;
    
    // Simple heuristic: most Arabic verbs in past tense
    // This is a simplified approach
    return 'past';
  }
  
  private calculateConfidence(elements: GrammaticalElement[]): number {
    if (elements.length === 0) return 0;
    
    const totalConfidence = elements.reduce((sum, e) => sum + e.confidence, 0);
    return totalConfidence / elements.length;
  }
  
  getStructure(id: string): SentenceStructure | null {
    return this.structures.get(id) || null;
  }
  
  findStructuresBySentence(sentence: string): SentenceStructure[] {
    return Array.from(this.structures.values())
      .filter(s => s.sentence.includes(sentence));
  }
  
  findStructuresBySubject(subject: string): SentenceStructure[] {
    return Array.from(this.structures.values())
      .filter(s => s.subject === subject);
  }
  
  findStructuresByVerb(verb: string): SentenceStructure[] {
    return Array.from(this.structures.values())
      .filter(s => s.verb === verb);
  }
  
  findStructuresByType(type: SentenceType): SentenceStructure[] {
    return Array.from(this.structures.values())
      .filter(s => s.type === type);
  }
  
  getStatistics(): {
    totalStructures: number;
    typeDistribution: Record<SentenceType, number>;
    roleDistribution: Record<GrammaticalRole, number>;
    tenseDistribution: Record<VerbTense, number>;
    averageConfidence: number;
    averageElementsPerSentence: number;
  } {
    const typeDistribution: Record<SentenceType, number> = {
      nominal: 0,
      verbal: 0,
      imperative: 0,
      interrogative: 0,
      exclamatory: 0
    };
    
    const roleDistribution: Record<GrammaticalRole, number> = {
      subject: 0,
      object: 0,
      verb: 0,
      complement: 0,
      modifier: 0
    };
    
    const tenseDistribution: Record<VerbTense, number> = {
      past: 0,
      present: 0,
      future: 0,
      imperative: 0
    };
    
    let totalConfidence = 0;
    let totalElements = 0;
    
    for (const structure of this.structures.values()) {
      typeDistribution[structure.type]++;
      totalConfidence += structure.confidence;
      totalElements += structure.elements.length;
      
      if (structure.tense) {
        tenseDistribution[structure.tense]++;
      }
      
      for (const element of structure.elements) {
        roleDistribution[element.role]++;
      }
    }
    
    return {
      totalStructures: this.structures.size,
      typeDistribution,
      roleDistribution,
      tenseDistribution,
      averageConfidence: this.structures.size > 0 ? totalConfidence / this.structures.size : 0,
      averageElementsPerSentence: this.structures.size > 0 ? totalElements / this.structures.size : 0
    };
  }
  
  clear(): void {
    this.structures.clear();
    this.structureCounter = 0;
  }
}

