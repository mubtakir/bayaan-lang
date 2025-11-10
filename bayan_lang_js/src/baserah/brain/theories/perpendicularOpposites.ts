/**
 * نظرية الأضداد المتعامدة - Perpendicular Opposites Theory
 *
 * نظرية تتعامل مع الأضداد المتعامدة في الفضاء المفاهيمي
 * Theory dealing with perpendicular opposites in conceptual space
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface OppositesPair {
  concept1: string;
  concept2: string;
  angle: number; // الزاوية بين المفهومين (90 درجة للأضداد المتعامدة)
  relationship: 'perpendicular' | 'parallel' | 'oblique';
}

export class PerpendicularOppositesTheory {
  private oppositesPairs: OppositesPair[] = [];

  constructor() {
    this.initializeOpposites();
  }

  private initializeOpposites(): void {
    this.oppositesPairs = [
      {
        concept1: 'وجود',
        concept2: 'عدم',
        angle: 180,
        relationship: 'perpendicular'
      },
      {
        concept1: 'حركة',
        concept2: 'سكون',
        angle: 180,
        relationship: 'perpendicular'
      },
      {
        concept1: 'نور',
        concept2: 'ظلام',
        angle: 180,
        relationship: 'perpendicular'
      }
    ];
  }

  getOppositesPairs(): OppositesPair[] {
    return this.oppositesPairs;
  }

  addOppositesPair(pair: OppositesPair): void {
    this.oppositesPairs.push(pair);
  }

  findOpposite(concept: string): string | null {
    const pair = this.oppositesPairs.find(
      p => p.concept1 === concept || p.concept2 === concept
    );
    
    if (!pair) return null;
    
    return pair.concept1 === concept ? pair.concept2 : pair.concept1;
  }

  calculateRelationship(concept1: string, concept2: string): 'perpendicular' | 'parallel' | 'oblique' | 'unknown' {
    const pair = this.oppositesPairs.find(
      p => (p.concept1 === concept1 && p.concept2 === concept2) ||
           (p.concept1 === concept2 && p.concept2 === concept1)
    );

    return pair ? pair.relationship : 'unknown';
  }

  /**
   * إنشاء متجه استكشاف ثنائي الأبعاد
   * Create exploration vector in 2D space
   */
  static createExplorationVector2D(magnitude: number, angle: number): Vector2D {
    return {
      x: magnitude * Math.cos(angle * Math.PI / 180),
      y: magnitude * Math.sin(angle * Math.PI / 180)
    };
  }
}

// تصدير باسم مستعار للتوافق
export { PerpendicularOppositesTheory as PerpendicularOpposites };

