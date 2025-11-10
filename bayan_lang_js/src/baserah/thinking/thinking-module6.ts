/**
 * وحدة التفكير البصري - Visual Thinking Module
 *
 * متخصصة في التحليل البصري والأنماط الهندسية والمكانية
 *
 * @author Basel Yahya Abdullah
 */

export interface VisualAnalysis {
  shapes: string[];
  patterns: string[];
  spatialRelations: Array<{object1: string, relation: string, object2: string}>;
  colors: string[];
  dimensions: {width?: number, height?: number, depth?: number};
}

/**
 * وحدة التفكير البصري
 */
export class VisualThinkingModule {

  analyze(input: any): VisualAnalysis {
    const text = typeof input === 'string' ? input : String(input);

    return {
      shapes: this.detectShapes(text),
      patterns: this.detectPatterns(text),
      spatialRelations: this.analyzeSpatialRelations(text),
      colors: this.detectColors(text),
      dimensions: this.extractDimensions(text)
    };
  }

  private detectShapes(text: string): string[] {
    const shapes = ['دائرة', 'مربع', 'مثلث', 'مستطيل', 'خط', 'نقطة'];
    return shapes.filter(s => text.includes(s));
  }

  private detectPatterns(text: string): string[] {
    const patterns: string[] = [];

    if (text.includes('تكرار') || text.includes('نمط')) {
      patterns.push('نمط متكرر');
    }
    if (text.includes('تناظر')) {
      patterns.push('تناظر');
    }

    return patterns;
  }

  private analyzeSpatialRelations(text: string): Array<{object1: string, relation: string, object2: string}> {
    const relations: Array<{object1: string, relation: string, object2: string}> = [];

    const spatialWords = ['فوق', 'تحت', 'يمين', 'يسار', 'أمام', 'خلف', 'داخل', 'خارج'];

    spatialWords.forEach(relation => {
      if (text.includes(relation)) {
        relations.push({
          object1: 'كائن1',
          relation,
          object2: 'كائن2'
        });
      }
    });

    return relations;
  }

  private detectColors(text: string): string[] {
    const colors = ['أحمر', 'أزرق', 'أخضر', 'أصفر', 'أبيض', 'أسود'];
    return colors.filter(c => text.includes(c));
  }

  private extractDimensions(text: string): {width?: number, height?: number, depth?: number} {
    const dimensions: {width?: number, height?: number, depth?: number} = {};

    const widthMatch = text.match(/عرض\s*(\d+)/);
    const heightMatch = text.match(/ارتفاع\s*(\d+)/);
    const depthMatch = text.match(/عمق\s*(\d+)/);

    if (widthMatch) dimensions.width = parseInt(widthMatch[1]);
    if (heightMatch) dimensions.height = parseInt(heightMatch[1]);
    if (depthMatch) dimensions.depth = parseInt(depthMatch[1]);

    return dimensions;
  }
}

export class ThinkingModule6 extends VisualThinkingModule {}
