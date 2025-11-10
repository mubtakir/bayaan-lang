/**
 * محرك الارتباطات - Association Engine
 * Manages relationships and associations between letter meanings
 */

export type RelationType = 
  | 'causes' 
  | 'caused_by' 
  | 'requires' 
  | 'leads_to' 
  | 'related_to' 
  | 'opposite_of';

export type AssociationStrength = 'weak' | 'moderate' | 'strong' | 'very_strong';

export interface MeaningAssociation {
  id: string;
  fromMeaning: string;
  toMeaning: string;
  relationType: RelationType;
  strength: AssociationStrength;
  confidence: number;
  examples: string[];
  bidirectional: boolean;
  timestamp: number;
}

export interface AssociationChain {
  meanings: string[];
  relations: RelationType[];
  totalStrength: number;
  averageConfidence: number;
}

export class AssociationEngine {
  private associations: Map<string, MeaningAssociation> = new Map();
  private meaningIndex: Map<string, Set<string>> = new Map(); // meaning -> association IDs
  private associationCounter: number = 0;
  
  addAssociation(
    fromMeaning: string,
    toMeaning: string,
    relationType: RelationType,
    strength: AssociationStrength = 'moderate',
    examples: string[] = [],
    bidirectional: boolean = false
  ): MeaningAssociation {
    const id = `assoc_${this.associationCounter++}`;
    
    const association: MeaningAssociation = {
      id,
      fromMeaning,
      toMeaning,
      relationType,
      strength,
      confidence: this.calculateConfidence(strength, examples.length),
      examples,
      bidirectional,
      timestamp: Date.now()
    };
    
    this.associations.set(id, association);
    
    // Index by meaning
    if (!this.meaningIndex.has(fromMeaning)) {
      this.meaningIndex.set(fromMeaning, new Set());
    }
    this.meaningIndex.get(fromMeaning)!.add(id);
    
    if (bidirectional) {
      if (!this.meaningIndex.has(toMeaning)) {
        this.meaningIndex.set(toMeaning, new Set());
      }
      this.meaningIndex.get(toMeaning)!.add(id);
    }
    
    return association;
  }
  
  private calculateConfidence(strength: AssociationStrength, exampleCount: number): number {
    const strengthValues: Record<AssociationStrength, number> = {
      weak: 0.3,
      moderate: 0.5,
      strong: 0.7,
      very_strong: 0.9
    };
    
    const baseConfidence = strengthValues[strength];
    const exampleBonus = Math.min(0.1, exampleCount * 0.02);
    
    return Math.min(1.0, baseConfidence + exampleBonus);
  }
  
  getAssociations(meaning: string): MeaningAssociation[] {
    const associationIds = this.meaningIndex.get(meaning);
    if (!associationIds) return [];
    
    const results: MeaningAssociation[] = [];
    
    for (const id of associationIds) {
      const association = this.associations.get(id);
      if (association) {
        results.push(association);
      }
    }
    
    return results;
  }
  
  getAssociationsByType(meaning: string, relationType: RelationType): MeaningAssociation[] {
    return this.getAssociations(meaning)
      .filter(a => a.relationType === relationType);
  }
  
  findRelatedMeanings(meaning: string, maxDepth: number = 2): string[] {
    const visited = new Set<string>();
    const queue: Array<{ meaning: string; depth: number }> = [{ meaning, depth: 0 }];
    const related: string[] = [];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current.meaning)) continue;
      visited.add(current.meaning);
      
      if (current.meaning !== meaning) {
        related.push(current.meaning);
      }
      
      if (current.depth < maxDepth) {
        const associations = this.getAssociations(current.meaning);
        
        for (const assoc of associations) {
          if (!visited.has(assoc.toMeaning)) {
            queue.push({ meaning: assoc.toMeaning, depth: current.depth + 1 });
          }
          
          if (assoc.bidirectional && !visited.has(assoc.fromMeaning)) {
            queue.push({ meaning: assoc.fromMeaning, depth: current.depth + 1 });
          }
        }
      }
    }
    
    return related;
  }
  
  findAssociationChain(fromMeaning: string, toMeaning: string, maxDepth: number = 3): AssociationChain | null {
    const visited = new Set<string>();
    const queue: Array<{
      meaning: string;
      depth: number;
      path: string[];
      relations: RelationType[];
      totalStrength: number;
      totalConfidence: number;
    }> = [{
      meaning: fromMeaning,
      depth: 0,
      path: [fromMeaning],
      relations: [],
      totalStrength: 0,
      totalConfidence: 0
    }];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.meaning === toMeaning && current.depth > 0) {
        return {
          meanings: current.path,
          relations: current.relations,
          totalStrength: current.totalStrength,
          averageConfidence: current.depth > 0 ? current.totalConfidence / current.depth : 0
        };
      }
      
      if (visited.has(current.meaning) || current.depth >= maxDepth) continue;
      visited.add(current.meaning);
      
      const associations = this.getAssociations(current.meaning);
      
      for (const assoc of associations) {
        const strengthValue = this.getStrengthValue(assoc.strength);
        
        queue.push({
          meaning: assoc.toMeaning,
          depth: current.depth + 1,
          path: [...current.path, assoc.toMeaning],
          relations: [...current.relations, assoc.relationType],
          totalStrength: current.totalStrength + strengthValue,
          totalConfidence: current.totalConfidence + assoc.confidence
        });
      }
    }
    
    return null;
  }
  
  private getStrengthValue(strength: AssociationStrength): number {
    const values: Record<AssociationStrength, number> = {
      weak: 0.25,
      moderate: 0.5,
      strong: 0.75,
      very_strong: 1.0
    };
    return values[strength];
  }
  
  findOpposites(meaning: string): string[] {
    return this.getAssociationsByType(meaning, 'opposite_of')
      .map(a => a.toMeaning);
  }
  
  findCauses(meaning: string): string[] {
    return this.getAssociationsByType(meaning, 'causes')
      .map(a => a.toMeaning);
  }
  
  findEffects(meaning: string): string[] {
    return this.getAssociationsByType(meaning, 'caused_by')
      .map(a => a.fromMeaning);
  }
  
  addExample(associationId: string, example: string): boolean {
    const association = this.associations.get(associationId);
    if (!association) return false;
    
    if (!association.examples.includes(example)) {
      association.examples.push(example);
      association.confidence = this.calculateConfidence(association.strength, association.examples.length);
      association.timestamp = Date.now();
    }
    
    return true;
  }
  
  updateStrength(associationId: string, newStrength: AssociationStrength): boolean {
    const association = this.associations.get(associationId);
    if (!association) return false;
    
    association.strength = newStrength;
    association.confidence = this.calculateConfidence(newStrength, association.examples.length);
    association.timestamp = Date.now();
    
    return true;
  }
  
  getStatistics(): {
    totalAssociations: number;
    typeDistribution: Record<RelationType, number>;
    strengthDistribution: Record<AssociationStrength, number>;
    bidirectionalCount: number;
    averageConfidence: number;
    totalMeanings: number;
  } {
    const typeDistribution: Record<RelationType, number> = {
      causes: 0,
      caused_by: 0,
      requires: 0,
      leads_to: 0,
      related_to: 0,
      opposite_of: 0
    };
    
    const strengthDistribution: Record<AssociationStrength, number> = {
      weak: 0,
      moderate: 0,
      strong: 0,
      very_strong: 0
    };
    
    let bidirectionalCount = 0;
    let totalConfidence = 0;
    
    for (const association of this.associations.values()) {
      typeDistribution[association.relationType]++;
      strengthDistribution[association.strength]++;
      if (association.bidirectional) bidirectionalCount++;
      totalConfidence += association.confidence;
    }
    
    return {
      totalAssociations: this.associations.size,
      typeDistribution,
      strengthDistribution,
      bidirectionalCount,
      averageConfidence: this.associations.size > 0 ? totalConfidence / this.associations.size : 0,
      totalMeanings: this.meaningIndex.size
    };
  }
  
  clear(): void {
    this.associations.clear();
    this.meaningIndex.clear();
    this.associationCounter = 0;
  }
}

