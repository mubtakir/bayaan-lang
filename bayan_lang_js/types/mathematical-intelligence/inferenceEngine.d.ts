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
export declare class InferenceEngine {
    /**
     * استنباط معادلة من نقاط بيانات
     * Infer equation from data points
     */
    static infer(dataPoints: DataPoint[], options?: InferenceOptions): InferenceResult;
    /**
     * كشف الأنماط في البيانات
     * Detect patterns in data
     */
    private static detectPatterns;
    /**
     * كشف الاتجاه الخطي العام
     * Detect general linear trend
     */
    private static detectLinearTrend;
    /**
     * كشف انتقالات سيغمويد
     * Detect sigmoid transitions
     */
    private static detectSigmoidTransitions;
    /**
     * كشف القفزات
     * Detect jumps
     */
    private static detectJumps;
    /**
     * بناء معادلة من الأنماط المكتشفة
     * Build equation from detected patterns
     */
    private static buildEquationFromPatterns;
    /**
     * تحسين المعادلة
     * Optimize equation
     */
    private static optimizeEquation;
    /**
     * حساب الخطأ
     * Calculate error
     */
    private static calculateError;
    /**
     * حساب الثقة
     * Calculate confidence
     */
    private static calculateConfidence;
    /**
     * استنباط من صورة (تحليل بكسلات)
     * Infer from image (pixel analysis)
     */
    static inferFromImage(imageData: ImageData, options?: InferenceOptions): InferenceResult;
    /**
     * استخراج نقاط من صورة
     * Extract points from image
     */
    private static extractPointsFromImage;
}
