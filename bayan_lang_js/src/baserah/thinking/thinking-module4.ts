/**
 * وحدة التفكير الفيزيائي - Physical Thinking Module
 *
 * متخصصة في تحليل القوانين الفيزيائية والظواهر الطبيعية
 *
 * @author Basel Yahya Abdullah
 */

export interface PhysicalAnalysis {
  physicalConcepts: string[];
  laws: string[];
  measurements: Array<{quantity: string, value: number, unit: string}>;
  forces: string[];
  energy: {type: string, description: string}[];
}

/**
 * وحدة التفكير الفيزيائي
 */
export class PhysicalThinkingModule {

  analyze(input: any): PhysicalAnalysis {
    const text = typeof input === 'string' ? input : String(input);

    return {
      physicalConcepts: this.extractConcepts(text),
      laws: this.identifyLaws(text),
      measurements: this.extractMeasurements(text),
      forces: this.identifyForces(text),
      energy: this.analyzeEnergy(text)
    };
  }

  private extractConcepts(text: string): string[] {
    const concepts = ['قوة', 'طاقة', 'حركة', 'سرعة', 'تسارع', 'كتلة', 'وزن'];
    return concepts.filter(c => text.includes(c));
  }

  private identifyLaws(text: string): string[] {
    const laws: string[] = [];
    if (text.includes('نيوتن')) laws.push('قوانين نيوتن');
    if (text.includes('طاقة')) laws.push('قانون حفظ الطاقة');
    return laws;
  }

  private extractMeasurements(text: string): Array<{quantity: string, value: number, unit: string}> {
    const measurements: Array<{quantity: string, value: number, unit: string}> = [];
    const numberMatches = text.match(/(\d+\.?\d*)\s*(متر|كيلو|ثانية|م\/ث)/g);

    if (numberMatches) {
      numberMatches.forEach(match => {
        const parts = match.split(/\s+/);
        measurements.push({
          quantity: 'قياس',
          value: parseFloat(parts[0]),
          unit: parts[1] || ''
        });
      });
    }

    return measurements;
  }

  private identifyForces(text: string): string[] {
    const forces = ['جاذبية', 'احتكاك', 'دفع', 'شد'];
    return forces.filter(f => text.includes(f));
  }

  private analyzeEnergy(text: string): {type: string, description: string}[] {
    const energy: {type: string, description: string}[] = [];

    if (text.includes('حركة')) {
      energy.push({type: 'حركية', description: 'طاقة الحركة'});
    }
    if (text.includes('وضع') || text.includes('ارتفاع')) {
      energy.push({type: 'وضع', description: 'طاقة الوضع'});
    }

    return energy;
  }
}

export class ThinkingModule4 extends PhysicalThinkingModule {}
