/**
 * وحدة التفكير الرياضي - Mathematical Thinking Module
 *
 * متخصصة في التحليل الرياضي وكشف الأنماط والمعادلات
 *
 * @author Basel Yahya Abdullah
 */

export interface MathematicalPattern {
  type: string;
  description: string;
  formula?: string;
  confidence: number;
}

export interface MathematicalAnalysis {
  numbers: number[];
  equations: string[];
  patterns: MathematicalPattern[];
  statistics: {
    sum: number;
    average: number;
    min: number;
    max: number;
    count: number;
  };
  relationships: Array<{type: string, description: string}>;
}

/**
 * وحدة التفكير الرياضي
 */
export class MathematicalThinkingModule {

  /**
   * تحليل رياضي شامل
   */
  analyze(input: any): MathematicalAnalysis {
    const numbers = this.extractNumbers(input);
    const equations = this.detectEquations(input);
    const patterns = this.detectPatterns(numbers);
    const statistics = this.calculateStatistics(numbers);
    const relationships = this.findRelationships(numbers);

    return {
      numbers,
      equations,
      patterns,
      statistics,
      relationships
    };
  }

  /**
   * استخراج الأرقام
   */
  private extractNumbers(input: any): number[] {
    const numbers: number[] = [];

    if (typeof input === 'string') {
      const matches = input.match(/\d+\.?\d*/g);
      if (matches) {
        numbers.push(...matches.map(m => parseFloat(m)));
      }
    } else if (typeof input === 'number') {
      numbers.push(input);
    } else if (Array.isArray(input)) {
      input.forEach(item => {
        if (typeof item === 'number') numbers.push(item);
      });
    }

    return numbers;
  }

  /**
   * كشف المعادلات
   */
  private detectEquations(input: any): string[] {
    const equations: string[] = [];

    if (typeof input === 'string') {
      // كشف معادلات بسيطة
      const eqPattern = /(\d+\s*[+\-*/]\s*\d+\s*=\s*\d+)/g;
      const matches = input.match(eqPattern);
      if (matches) {
        equations.push(...matches);
      }
    }

    return equations;
  }

  /**
   * كشف الأنماط
   */
  private detectPatterns(numbers: number[]): MathematicalPattern[] {
    const patterns: MathematicalPattern[] = [];

    if (numbers.length < 2) return patterns;

    // نمط تصاعدي
    if (this.isAscending(numbers)) {
      patterns.push({
        type: 'ascending',
        description: 'نمط تصاعدي',
        confidence: 0.9
      });
    }

    // نمط تنازلي
    if (this.isDescending(numbers)) {
      patterns.push({
        type: 'descending',
        description: 'نمط تنازلي',
        confidence: 0.9
      });
    }

    // نمط حسابي (فرق ثابت)
    const arithmeticDiff = this.detectArithmeticSequence(numbers);
    if (arithmeticDiff !== null) {
      patterns.push({
        type: 'arithmetic',
        description: `متتالية حسابية بفرق ${arithmeticDiff}`,
        formula: `a_n = a_1 + (n-1) * ${arithmeticDiff}`,
        confidence: 0.85
      });
    }

    // نمط هندسي (نسبة ثابتة)
    const geometricRatio = this.detectGeometricSequence(numbers);
    if (geometricRatio !== null) {
      patterns.push({
        type: 'geometric',
        description: `متتالية هندسية بنسبة ${geometricRatio}`,
        formula: `a_n = a_1 * ${geometricRatio}^(n-1)`,
        confidence: 0.85
      });
    }

    return patterns;
  }

  /**
   * حساب الإحصائيات
   */
  private calculateStatistics(numbers: number[]): any {
    if (numbers.length === 0) {
      return { sum: 0, average: 0, min: 0, max: 0, count: 0 };
    }

    const sum = numbers.reduce((a, b) => a + b, 0);
    const average = sum / numbers.length;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return {
      sum,
      average,
      min,
      max,
      count: numbers.length
    };
  }

  /**
   * إيجاد العلاقات
   */
  private findRelationships(numbers: number[]): Array<{type: string, description: string}> {
    const relationships: Array<{type: string, description: string}> = [];

    if (numbers.length >= 2) {
      const diff = numbers[1] - numbers[0];
      relationships.push({
        type: 'difference',
        description: `الفرق بين أول رقمين: ${diff}`
      });

      if (numbers[0] !== 0) {
        const ratio = numbers[1] / numbers[0];
        relationships.push({
          type: 'ratio',
          description: `النسبة بين أول رقمين: ${ratio.toFixed(2)}`
        });
      }
    }

    return relationships;
  }

  private isAscending(numbers: number[]): boolean {
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] <= numbers[i-1]) return false;
    }
    return true;
  }

  private isDescending(numbers: number[]): boolean {
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] >= numbers[i-1]) return false;
    }
    return true;
  }

  private detectArithmeticSequence(numbers: number[]): number | null {
    if (numbers.length < 3) return null;

    const diff = numbers[1] - numbers[0];
    for (let i = 2; i < numbers.length; i++) {
      if (Math.abs((numbers[i] - numbers[i-1]) - diff) > 0.001) {
        return null;
      }
    }
    return diff;
  }

  private detectGeometricSequence(numbers: number[]): number | null {
    if (numbers.length < 3) return null;
    if (numbers[0] === 0) return null;

    const ratio = numbers[1] / numbers[0];
    for (let i = 2; i < numbers.length; i++) {
      if (numbers[i-1] === 0) return null;
      if (Math.abs((numbers[i] / numbers[i-1]) - ratio) > 0.001) {
        return null;
      }
    }
    return ratio;
  }
}

// تصدير للتوافق مع الاسم القديم
export class ThinkingModule1 extends MathematicalThinkingModule {}
