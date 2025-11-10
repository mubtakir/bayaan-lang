/**
 * نظام التعرف على الأنماط - Pattern Recognition System
 * يتعرف على الأنماط في البيانات والسلوكيات
 */

import { LearningPattern, LearningType } from './learningEngine';

// ============================================================================
// Types
// ============================================================================

export type PatternCategory = 
  | 'sequential'
  | 'frequency'
  | 'correlation'
  | 'anomaly'
  | 'temporal';

export interface RecognizedPattern {
  patternId: string;
  category: PatternCategory;
  description: string;
  confidence: number;
  occurrences: number;
  firstSeen: number;
  lastSeen: number;
  features: Record<string, any>;
  examples: any[];
}

export interface PatternMatch {
  pattern: RecognizedPattern;
  matchScore: number;
  matchedFeatures: string[];
  context: Record<string, any>;
}

export interface PatternStatistics {
  totalPatterns: number;
  patternsByCategory: Map<PatternCategory, number>;
  averageConfidence: number;
  mostFrequentPattern: RecognizedPattern | null;
  recentPatterns: RecognizedPattern[];
}

// ============================================================================
// Pattern Recognition Engine
// ============================================================================

export class PatternRecognitionEngine {
  private patterns: Map<string, RecognizedPattern>;
  private minOccurrences: number;
  private minConfidence: number;
  private maxPatterns: number;

  constructor(options: {
    minOccurrences?: number;
    minConfidence?: number;
    maxPatterns?: number;
  } = {}) {
    this.patterns = new Map();
    this.minOccurrences = options.minOccurrences || 3;
    this.minConfidence = options.minConfidence || 0.5;
    this.maxPatterns = options.maxPatterns || 500;
  }

  /**
   * إضافة نمط معروف
   */
  public addPattern(
    patternId: string,
    category: PatternCategory,
    description: string,
    features: Record<string, any>
  ): RecognizedPattern {
    const pattern: RecognizedPattern = {
      patternId,
      category,
      description,
      confidence: 0.5,
      occurrences: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
      features,
      examples: []
    };

    this.patterns.set(patternId, pattern);
    return pattern;
  }

  /**
   * التعرف على نمط في البيانات
   */
  public recognizePattern(
    data: any[],
    category?: PatternCategory
  ): RecognizedPattern | null {
    if (data.length < this.minOccurrences) {
      return null;
    }

    // استخراج الميزات
    const features = this.extractFeatures(data);

    // البحث عن نمط مطابق
    const matchingPattern = this.findMatchingPattern(features, category);

    if (matchingPattern) {
      // تحديث النمط الموجود
      matchingPattern.occurrences++;
      matchingPattern.lastSeen = Date.now();
      matchingPattern.confidence = Math.min(
        1.0,
        matchingPattern.confidence + 0.1
      );
      matchingPattern.examples.push(data);

      // الحفاظ على عدد محدود من الأمثلة
      if (matchingPattern.examples.length > 10) {
        matchingPattern.examples.shift();
      }

      return matchingPattern;
    } else {
      // إنشاء نمط جديد
      const patternId = `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const detectedCategory = category || this.detectCategory(data, features);
      const description = this.generateDescription(detectedCategory, features);

      const newPattern = this.addPattern(
        patternId,
        detectedCategory,
        description,
        features
      );
      newPattern.examples.push(data);

      return newPattern;
    }
  }

  /**
   * استخراج الميزات من البيانات
   */
  private extractFeatures(data: any[]): Record<string, any> {
    const features: Record<string, any> = {};

    // الطول
    features.length = data.length;

    // نوع البيانات
    const types = new Set(data.map(item => typeof item));
    features.dataTypes = Array.from(types);

    // التكرار
    const frequency = new Map<any, number>();
    for (const item of data) {
      const count = frequency.get(item) || 0;
      frequency.set(item, count + 1);
    }
    features.uniqueValues = frequency.size;
    features.mostFrequent = this.getMostFrequent(frequency);

    // التسلسل (للأرقام)
    if (data.every(item => typeof item === 'number')) {
      features.isSequential = this.isSequential(data as number[]);
      features.average = data.reduce((a, b) => a + b, 0) / data.length;
      features.min = Math.min(...data);
      features.max = Math.max(...data);
    }

    return features;
  }

  /**
   * إيجاد نمط مطابق
   */
  private findMatchingPattern(
    features: Record<string, any>,
    category?: PatternCategory
  ): RecognizedPattern | null {
    let bestMatch: RecognizedPattern | null = null;
    let bestScore = 0;

    for (const pattern of this.patterns.values()) {
      if (category && pattern.category !== category) {
        continue;
      }

      const score = this.calculateSimilarity(features, pattern.features);
      if (score > bestScore && score >= this.minConfidence) {
        bestScore = score;
        bestMatch = pattern;
      }
    }

    return bestMatch;
  }

  /**
   * حساب التشابه بين مجموعتي ميزات
   */
  private calculateSimilarity(
    features1: Record<string, any>,
    features2: Record<string, any>
  ): number {
    const keys = new Set([...Object.keys(features1), ...Object.keys(features2)]);
    let matches = 0;
    let total = 0;

    for (const key of keys) {
      total++;
      const val1 = features1[key];
      const val2 = features2[key];

      if (val1 === val2) {
        matches++;
      } else if (typeof val1 === 'number' && typeof val2 === 'number') {
        const diff = Math.abs(val1 - val2);
        const avg = (val1 + val2) / 2;
        if (avg > 0) {
          matches += Math.max(0, 1 - diff / avg);
        }
      } else if (Array.isArray(val1) && Array.isArray(val2)) {
        const intersection = val1.filter(v => val2.includes(v));
        const union = [...new Set([...val1, ...val2])];
        matches += intersection.length / union.length;
      }
    }

    return total > 0 ? matches / total : 0;
  }

  /**
   * اكتشاف فئة النمط
   */
  private detectCategory(data: any[], features: Record<string, any>): PatternCategory {
    if (features.isSequential) {
      return 'sequential';
    } else if (features.uniqueValues < data.length * 0.5) {
      return 'frequency';
    } else {
      return 'correlation';
    }
  }

  /**
   * توليد وصف للنمط
   */
  private generateDescription(
    category: PatternCategory,
    features: Record<string, any>
  ): string {
    switch (category) {
      case 'sequential':
        return `Sequential pattern with ${features.length} elements`;
      case 'frequency':
        return `Frequency pattern with ${features.uniqueValues} unique values`;
      case 'correlation':
        return `Correlation pattern detected`;
      case 'anomaly':
        return `Anomaly pattern detected`;
      case 'temporal':
        return `Temporal pattern detected`;
      default:
        return `Pattern detected`;
    }
  }

  /**
   * الحصول على العنصر الأكثر تكراراً
   */
  private getMostFrequent(frequency: Map<any, number>): any {
    let maxCount = 0;
    let mostFrequent: any = null;

    for (const [item, count] of frequency.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = item;
      }
    }

    return mostFrequent;
  }

  /**
   * التحقق من التسلسل
   */
  private isSequential(numbers: number[]): boolean {
    if (numbers.length < 2) return false;

    const diff = numbers[1] - numbers[0];
    for (let i = 2; i < numbers.length; i++) {
      if (Math.abs((numbers[i] - numbers[i - 1]) - diff) > 0.01) {
        return false;
      }
    }

    return true;
  }

  /**
   * الحصول على الإحصائيات
   */
  public getStatistics(): PatternStatistics {
    const patternsByCategory = new Map<PatternCategory, number>();
    let totalConfidence = 0;
    let mostFrequent: RecognizedPattern | null = null;
    let maxOccurrences = 0;

    for (const pattern of this.patterns.values()) {
      const count = patternsByCategory.get(pattern.category) || 0;
      patternsByCategory.set(pattern.category, count + 1);
      totalConfidence += pattern.confidence;

      if (pattern.occurrences > maxOccurrences) {
        maxOccurrences = pattern.occurrences;
        mostFrequent = pattern;
      }
    }

    const recentPatterns = Array.from(this.patterns.values())
      .filter(p => Date.now() - p.lastSeen < 24 * 60 * 60 * 1000)
      .sort((a, b) => b.lastSeen - a.lastSeen)
      .slice(0, 10);

    return {
      totalPatterns: this.patterns.size,
      patternsByCategory,
      averageConfidence: this.patterns.size > 0 ? totalConfidence / this.patterns.size : 0,
      mostFrequentPattern: mostFrequent,
      recentPatterns
    };
  }

  /**
   * مسح البيانات
   */
  public clear(): void {
    this.patterns.clear();
  }
}

