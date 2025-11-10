/**
 * محرك الرسام - Drawing Engine
 *
 * المحرك التوليدي القادر على قراءة معادلة الشكل العام وتوليد الرسم المقابل
 * Generative engine capable of reading General Shape Equation and generating corresponding drawing
 *
 * الوظائف | Functions:
 * - تفسير معاملات معادلة الشكل العامة
 * - توليد النقاط والمنحنيات المقابلة
 * - إنتاج التمثيلات البصرية
 * - التحقق من صحة وثبات المعادلة
 *
 * الفلسفة | Philosophy:
 * "الرسام" يحول المعادلات الرياضية إلى تمثيلات بصرية
 * "The Painter" transforms mathematical equations into visual representations
 */
import { GeneralShapeEquation } from './generalShapeEquation';
/**
 * نقطة رسم مع خصائص بصرية
 * Drawing point with visual properties
 */
export interface DrawingPoint {
    x: number;
    y: number;
    lineColor?: string;
    lineWidth?: number;
    fillColor?: string;
    opacity?: number;
}
/**
 * مسار رسم (مجموعة نقاط متصلة)
 * Drawing path (collection of connected points)
 */
export interface DrawingPath {
    points: DrawingPoint[];
    closed: boolean;
    fillStyle?: 'solid' | 'gradient' | 'pattern';
}
/**
 * نتيجة الرسم الكاملة
 * Complete drawing result
 */
export interface DrawingResult {
    paths: DrawingPath[];
    bounds: {
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
    };
    metadata: {
        termCount: number;
        pointCount: number;
        renderTime: number;
    };
}
/**
 * خيارات الرسم
 * Drawing options
 */
export interface DrawingOptions {
    /** نطاق X - X range */
    xRange: {
        min: number;
        max: number;
    };
    /** نطاق Y (اختياري، يتم حسابه تلقائياً إذا لم يُحدد) */
    yRange?: {
        min: number;
        max: number;
    };
    /** دقة الرسم (عدد النقاط) - Resolution (number of points) */
    resolution?: number;
    /** تفعيل التدرج اللوني - Enable color gradients */
    enableGradients?: boolean;
    /** تفعيل التدرج في سمك الخط - Enable line width gradients */
    enableLineWidthGradients?: boolean;
    /** تفعيل التحسين التلقائي - Enable auto-optimization */
    autoOptimize?: boolean;
}
/**
 * محرك الرسام
 * Drawing Engine
 */
export declare class DrawingEngine {
    /**
     * رسم معادلة شكل عام
     * Draw general shape equation
     */
    static draw(equation: GeneralShapeEquation, options: DrawingOptions): DrawingResult;
    /**
     * تحويل النقاط الخام إلى نقاط رسم
     * Convert raw points to drawing points
     */
    private static convertToDrawingPoints;
    /**
     * تدرج لوني بين لونين
     * Color interpolation between two colors
     */
    private static interpolateColor;
    /**
     * تدرج رقمي بين قيمتين
     * Numeric interpolation between two values
     */
    private static interpolateNumber;
    /**
     * تحويل HEX إلى RGB
     * Convert HEX to RGB
     */
    private static hexToRgb;
    /**
     * تحويل RGB إلى HEX
     * Convert RGB to HEX
     */
    private static rgbToHex;
    /**
     * إنشاء مسارات من النقاط
     * Create paths from points
     */
    private static createPaths;
    /**
     * حساب حدود الرسم
     * Calculate drawing bounds
     */
    private static calculateBounds;
    /**
     * رسم على Canvas HTML5
     * Draw on HTML5 Canvas
     */
    static drawToCanvas(equation: GeneralShapeEquation, canvas: HTMLCanvasElement, options: DrawingOptions): void;
    /**
     * تصدير إلى SVG
     * Export to SVG
     */
    static toSVG(equation: GeneralShapeEquation, options: DrawingOptions): string;
}
