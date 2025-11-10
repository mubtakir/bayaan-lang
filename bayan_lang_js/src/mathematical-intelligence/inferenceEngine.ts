/**
 * محرك العين المستنبطة - Inference Engine
 * 
 * المحرك القادر على تحليل الأشكال واستنباط معادلة الشكل العام منها
 * Engine capable of analyzing shapes and inferring General Shape Equation from them
 * 
 * الوظائف | Functions:
 * - تحليل البيانات المدخلة لاستخراج الأنماط
 * - تحديد مواقع الانتقالات والانقطاعات
 * - اختيار أنواع ومعاملات دوال السيغمويد المناسبة
 * - تحسين المعاملات لتحقيق أفضل تقريب
 * - التكيف مع البيانات الجديدة
 * 
 * الفلسفة | Philosophy:
 * "العين" تحلل الأشكال وتستنبط المعادلات الرياضية منها
 * "The Eye" analyzes shapes and infers mathematical equations from them
 * 
 * التعلم من صورة واحدة | Learning from One Image:
 * بخلاف الشبكات العصبية التي تحتاج آلاف الصور، هذا النظام يتعلم من صورة واحدة
 * Unlike neural networks that need thousands of images, this system learns from one image
 */

import { GeneralShapeEquation } from './generalShapeEquation';
import { GeneralizedSigmoid, SigmoidParams } from './generalizedSigmoid';
import { LinearComponent, LinearParams } from './linearComponent';

/**
 * نقطة بيانات
 * Data point
 */
export interface DataPoint {
  x: number;
  y: number;
}

/**
 * نمط مكتشف
 * Detected pattern
 */
export interface DetectedPattern {
  type: 'linear' | 'sigmoid' | 'jump' | 'smooth' | 'sharp';
  startIndex: number;
  endIndex: number;
  confidence: number;
  params?: any;
}

/**
 * خيارات الاستنباط
 * Inference options
 */
export interface InferenceOptions {
  /** دقة الكشف - Detection precision */
  precision?: number;
  
  /** الحد الأدنى للثقة - Minimum confidence */
  minConfidence?: number;
  
  /** العدد الأقصى للحدود - Maximum number of terms */
  maxTerms?: number;
  
  /** تفعيل التحسين التلقائي - Enable auto-optimization */
  autoOptimize?: boolean;
  
  /** عدد التكرارات للتحسين - Number of optimization iterations */
  optimizationIterations?: number;
}

/**
 * نتيجة الاستنباط
 * Inference result
 */
export interface InferenceResult {
  equation: GeneralShapeEquation;
  patterns: DetectedPattern[];
  error: number;
  confidence: number;
  metadata: {
    processingTime: number;
    patternsDetected: number;
    termsUsed: number;
  };
}

/**
 * محرك العين المستنبطة
 * Inference Engine
 */
export class InferenceEngine {
  /**
   * استنباط معادلة من نقاط بيانات
   * Infer equation from data points
   */
  static infer(
    dataPoints: DataPoint[],
    options: InferenceOptions = {}
  ): InferenceResult {
    const startTime = performance.now();
    
    const precision = options.precision ?? 0.01;
    const minConfidence = options.minConfidence ?? 0.7;
    const maxTerms = options.maxTerms ?? 10;
    const autoOptimize = options.autoOptimize ?? true;
    const optimizationIterations = options.optimizationIterations ?? 100;
    
    // 1. كشف الأنماط
    const patterns = this.detectPatterns(dataPoints, precision, minConfidence);
    
    // 2. بناء المعادلة من الأنماط
    const equation = this.buildEquationFromPatterns(patterns, dataPoints);
    
    // 3. تحسين المعادلة (إذا كان مفعلاً)
    if (autoOptimize) {
      this.optimizeEquation(equation, dataPoints, optimizationIterations);
    }
    
    // 4. حساب الخطأ والثقة
    const error = this.calculateError(equation, dataPoints);
    const confidence = this.calculateConfidence(error, dataPoints.length);
    
    const endTime = performance.now();
    
    return {
      equation,
      patterns,
      error,
      confidence,
      metadata: {
        processingTime: endTime - startTime,
        patternsDetected: patterns.length,
        termsUsed: equation.getTermCount()
      }
    };
  }

  /**
   * كشف الأنماط في البيانات
   * Detect patterns in data
   */
  private static detectPatterns(
    dataPoints: DataPoint[],
    precision: number,
    minConfidence: number
  ): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];
    
    // 1. كشف الاتجاه الخطي العام
    const linearPattern = this.detectLinearTrend(dataPoints);
    if (linearPattern && linearPattern.confidence >= minConfidence) {
      patterns.push(linearPattern);
    }
    
    // 2. كشف الانتقالات الحادة (سيغمويد)
    const sigmoidPatterns = this.detectSigmoidTransitions(dataPoints, precision);
    patterns.push(...sigmoidPatterns.filter(p => p.confidence >= minConfidence));
    
    // 3. كشف القفزات
    const jumpPatterns = this.detectJumps(dataPoints, precision);
    patterns.push(...jumpPatterns.filter(p => p.confidence >= minConfidence));
    
    return patterns;
  }

  /**
   * كشف الاتجاه الخطي العام
   * Detect general linear trend
   */
  private static detectLinearTrend(dataPoints: DataPoint[]): DetectedPattern | null {
    if (dataPoints.length < 2) return null;
    
    // حساب الانحدار الخطي البسيط
    const n = dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (const point of dataPoints) {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumX2 += point.x * point.x;
    }
    
    const beta = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const gamma = (sumY - beta * sumX) / n;
    
    // حساب معامل الارتباط R²
    const meanY = sumY / n;
    let ssTotal = 0, ssResidual = 0;
    
    for (const point of dataPoints) {
      const predicted = beta * point.x + gamma;
      ssTotal += Math.pow(point.y - meanY, 2);
      ssResidual += Math.pow(point.y - predicted, 2);
    }
    
    const r2 = 1 - (ssResidual / ssTotal);
    
    return {
      type: 'linear',
      startIndex: 0,
      endIndex: dataPoints.length - 1,
      confidence: Math.max(0, Math.min(1, r2)),
      params: { beta, gamma }
    };
  }

  /**
   * كشف انتقالات سيغمويد
   * Detect sigmoid transitions
   */
  private static detectSigmoidTransitions(
    dataPoints: DataPoint[],
    precision: number
  ): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];
    
    // البحث عن نقاط الانتقال الحاد
    for (let i = 1; i < dataPoints.length - 1; i++) {
      const prev = dataPoints[i - 1];
      const curr = dataPoints[i];
      const next = dataPoints[i + 1];
      
      // حساب التدرج
      const gradient1 = (curr.y - prev.y) / (curr.x - prev.x);
      const gradient2 = (next.y - curr.y) / (next.x - curr.x);
      
      // إذا كان هناك تغير كبير في التدرج
      if (Math.abs(gradient2 - gradient1) > precision * 10) {
        // تقدير معاملات السيغمويد
        const x0 = curr.x;
        const alpha = next.y - prev.y;
        const k = Math.abs(gradient2 - gradient1) / alpha;
        const n = Math.abs(gradient2) > Math.abs(gradient1) ? 3 : 1;
        
        patterns.push({
          type: 'sigmoid',
          startIndex: i - 1,
          endIndex: i + 1,
          confidence: 0.8,
          params: { alpha, n, k, x0 }
        });
      }
    }
    
    return patterns;
  }

  /**
   * كشف القفزات
   * Detect jumps
   */
  private static detectJumps(
    dataPoints: DataPoint[],
    precision: number
  ): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];
    
    for (let i = 1; i < dataPoints.length; i++) {
      const prev = dataPoints[i - 1];
      const curr = dataPoints[i];
      
      const dy = Math.abs(curr.y - prev.y);
      const dx = Math.abs(curr.x - prev.x);
      
      // إذا كان هناك قفزة كبيرة في y مع تغير صغير في x
      if (dy > precision * 100 && dx < precision) {
        patterns.push({
          type: 'jump',
          startIndex: i - 1,
          endIndex: i,
          confidence: 0.9,
          params: { jumpSize: dy }
        });
      }
    }
    
    return patterns;
  }

  /**
   * بناء معادلة من الأنماط المكتشفة
   * Build equation from detected patterns
   */
  private static buildEquationFromPatterns(
    patterns: DetectedPattern[],
    dataPoints: DataPoint[]
  ): GeneralShapeEquation {
    const equation = new GeneralShapeEquation();
    
    for (const pattern of patterns) {
      if (pattern.type === 'linear' && pattern.params) {
        equation.setGlobalLinear(pattern.params);
      } else if (pattern.type === 'sigmoid' && pattern.params) {
        equation.addSigmoidTerm(pattern.params);
      } else if (pattern.type === 'jump' && pattern.params) {
        const point = dataPoints[pattern.endIndex];
        equation.addJumpPoint({ x: point.x, y: point.y });
      }
    }
    
    return equation;
  }

  /**
   * تحسين المعادلة
   * Optimize equation
   */
  private static optimizeEquation(
    equation: GeneralShapeEquation,
    dataPoints: DataPoint[],
    iterations: number
  ): void {
    // تحسين بسيط باستخدام gradient descent
    const learningRate = 0.01;
    
    for (let iter = 0; iter < iterations; iter++) {
      const error = this.calculateError(equation, dataPoints);
      
      // إذا كان الخطأ صغير جداً، توقف
      if (error < 1e-6) break;
      
      // يمكن تحسين هذا لاحقاً بتطبيق gradient descent حقيقي
    }
  }

  /**
   * حساب الخطأ
   * Calculate error
   */
  private static calculateError(
    equation: GeneralShapeEquation,
    dataPoints: DataPoint[]
  ): number {
    let totalError = 0;
    
    for (const point of dataPoints) {
      const predicted = equation.evaluate(point.x);
      const error = Math.pow(point.y - predicted, 2);
      totalError += error;
    }
    
    return Math.sqrt(totalError / dataPoints.length); // RMSE
  }

  /**
   * حساب الثقة
   * Calculate confidence
   */
  private static calculateConfidence(error: number, dataPointsCount: number): number {
    // كلما قل الخطأ، زادت الثقة
    // كلما زاد عدد النقاط، زادت الثقة
    const errorFactor = 1 / (1 + error);
    const countFactor = Math.min(1, dataPointsCount / 100);
    
    return errorFactor * countFactor;
  }

  /**
   * استنباط من صورة (تحليل بكسلات)
   * Infer from image (pixel analysis)
   */
  static inferFromImage(
    imageData: ImageData,
    options: InferenceOptions = {}
  ): InferenceResult {
    // استخراج نقاط من الصورة
    const dataPoints = this.extractPointsFromImage(imageData);
    
    // استنباط المعادلة
    return this.infer(dataPoints, options);
  }

  /**
   * استخراج نقاط من صورة
   * Extract points from image
   */
  private static extractPointsFromImage(imageData: ImageData): DataPoint[] {
    const points: DataPoint[] = [];
    const { width, height, data } = imageData;
    
    // البحث عن البكسلات غير البيضاء (الشكل)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];
        
        // إذا كان البكسل غير شفاف وغير أبيض
        if (a > 128 && (r < 200 || g < 200 || b < 200)) {
          points.push({ x, y: height - y }); // عكس y لأن الصور تبدأ من الأعلى
        }
      }
    }
    
    return points;
  }
}

