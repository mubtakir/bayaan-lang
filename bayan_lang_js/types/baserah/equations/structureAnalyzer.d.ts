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
export declare class StructureAnalyzer {
    private structures;
    private structureCounter;
    private readonly verbPatterns;
    private readonly nounPatterns;
    analyzeSentence(sentence: string): SentenceStructure;
    private tokenize;
    private extractElements;
    private detectRole;
    private isVerb;
    private isNoun;
    private getRoleConfidence;
    private detectSentenceType;
    private findSubject;
    private findVerb;
    private findObject;
    private findComplements;
    private findModifiers;
    private detectTense;
    private calculateConfidence;
    getStructure(id: string): SentenceStructure | null;
    findStructuresBySentence(sentence: string): SentenceStructure[];
    findStructuresBySubject(subject: string): SentenceStructure[];
    findStructuresByVerb(verb: string): SentenceStructure[];
    findStructuresByType(type: SentenceType): SentenceStructure[];
    getStatistics(): {
        totalStructures: number;
        typeDistribution: Record<SentenceType, number>;
        roleDistribution: Record<GrammaticalRole, number>;
        tenseDistribution: Record<VerbTense, number>;
        averageConfidence: number;
        averageElementsPerSentence: number;
    };
    clear(): void;
}
