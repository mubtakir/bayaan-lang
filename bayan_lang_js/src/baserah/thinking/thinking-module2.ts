/**
 * وحدة التفكير المنطقي - Logical Thinking Module
 *
 * متخصصة في التحليل المنطقي والاستنتاج والاستدلال
 *
 * @author Basel Yahya Abdullah
 */

export interface LogicalStatement {
  premise: string;
  conclusion: string;
  validity: boolean;
  confidence: number;
}

export interface LogicalAnalysis {
  statements: LogicalStatement[];
  inferences: string[];
  contradictions: string[];
  logicalStructure: string;
  validity: number;
}

/**
 * وحدة التفكير المنطقي
 */
export class LogicalThinkingModule {

  /**
   * تحليل منطقي شامل
   */
  analyze(input: any): LogicalAnalysis {
    const statements = this.extractStatements(input);
    const inferences = this.makeInferences(statements);
    const contradictions = this.detectContradictions(statements);
    const logicalStructure = this.analyzeStructure(input);
    const validity = this.calculateValidity(statements);

    return {
      statements,
      inferences,
      contradictions,
      logicalStructure,
      validity
    };
  }

  /**
   * استخراج العبارات المنطقية
   */
  private extractStatements(input: any): LogicalStatement[] {
    const statements: LogicalStatement[] = [];

    if (typeof input === 'string') {
      // كشف عبارات "إذا...فإن"
      if (input.includes('إذا') && input.includes('فإن')) {
        const parts = input.split('فإن');
        if (parts.length === 2) {
          statements.push({
            premise: parts[0].replace('إذا', '').trim(),
            conclusion: parts[1].trim(),
            validity: true,
            confidence: 0.8
          });
        }
      }
    }

    return statements;
  }

  /**
   * الاستنتاج المنطقي
   */
  private makeInferences(statements: LogicalStatement[]): string[] {
    const inferences: string[] = [];

    statements.forEach(stmt => {
      if (stmt.validity) {
        inferences.push(`من ${stmt.premise} نستنتج ${stmt.conclusion}`);
      }
    });

    return inferences;
  }

  /**
   * كشف التناقضات
   */
  private detectContradictions(statements: LogicalStatement[]): string[] {
    const contradictions: string[] = [];

    // فحص بسيط للتناقضات
    for (let i = 0; i < statements.length; i++) {
      for (let j = i + 1; j < statements.length; j++) {
        if (this.areContradictory(statements[i], statements[j])) {
          contradictions.push(`تناقض بين: "${statements[i].premise}" و "${statements[j].premise}"`);
        }
      }
    }

    return contradictions;
  }

  /**
   * تحليل البنية المنطقية
   */
  private analyzeStructure(input: any): string {
    if (typeof input === 'string') {
      if (input.includes('إذا') && input.includes('فإن')) {
        return 'شرطية (if-then)';
      } else if (input.includes('و') || input.includes('أو')) {
        return 'منطق ثنائي (binary logic)';
      } else {
        return 'عبارة بسيطة';
      }
    }
    return 'غير محدد';
  }

  /**
   * حساب الصحة المنطقية
   */
  private calculateValidity(statements: LogicalStatement[]): number {
    if (statements.length === 0) return 0;

    const validCount = statements.filter(s => s.validity).length;
    return validCount / statements.length;
  }

  /**
   * فحص التناقض بين عبارتين
   */
  private areContradictory(stmt1: LogicalStatement, stmt2: LogicalStatement): boolean {
    // فحص بسيط جداً
    return stmt1.conclusion.includes('لا') && !stmt2.conclusion.includes('لا') ||
           !stmt1.conclusion.includes('لا') && stmt2.conclusion.includes('لا');
  }
}

// تصدير للتوافق مع الاسم القديم
export class ThinkingModule2 extends LogicalThinkingModule {}
