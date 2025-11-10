/**
 * أسس الذكاء الرياضي - Mathematical Intelligence Foundations
 *
 * نظام رياضي ثوري متكامل لتمثيل الأشكال والدوال بمعادلات ذكية
 * Revolutionary integrated mathematical system for representing shapes and functions with intelligent equations
 *
 * المكونات الأساسية | Core Components:
 * 1. دالة سيغمويد المعممة (Generalized Sigmoid)
 * 2. المكون الخطي (Linear Component)
 * 3. معادلة الشكل العام (General Shape Equation - GSE)
 * 4. محرك الرسام (Drawing Engine)
 * 5. محرك العين المستنبطة (Inference Engine)
 *
 * الفلسفة | Philosophy:
 * - التعلم من صورة واحدة بدلاً من آلاف الصور
 * - تمثيل المعرفة في المعادلة نفسها وليس في الأوزان
 * - شفافية كاملة وقابلية للتفسير
 * - كفاءة عالية في استخدام البيانات والموارد
 *
 * الاستخدامات | Use Cases:
 * - رسم الأشكال الهندسية والطبيعية
 * - تقريب الدوال المعقدة
 * - ضغط البيانات
 * - معالجة الإشارات
 * - الرؤية الحاسوبية
 * - النمذجة المالية
 * - الفيزياء الحاسوبية
 */
export { GeneralizedSigmoid, SigmoidParams, SAFE_PARAM_RANGES, SigmoidPresets } from './generalizedSigmoid';
export { LinearComponent, LinearParams, LinearPresets } from './linearComponent';
export { GeneralShapeEquation, ShapeTerm, TermVisualProperties, GlobalVisualProperties } from './generalShapeEquation';
export { DrawingEngine, DrawingPoint, DrawingPath, DrawingResult, DrawingOptions } from './drawingEngine';
export { InferenceEngine, DataPoint, DetectedPattern, InferenceOptions, InferenceResult } from './inferenceEngine';
import { GeneralShapeEquation } from './generalShapeEquation';
/**
 * إنشاء معادلة شكل بسيطة من نقطتين
 * Create simple shape equation from two points
 */
export declare function createLineEquation(p1: {
    x: number;
    y: number;
}, p2: {
    x: number;
    y: number;
}): GeneralShapeEquation;
/**
 * إنشاء معادلة دالة خطوة (Step function)
 * Create step function equation
 */
export declare function createStepFunction(x0?: number, amplitude?: number): GeneralShapeEquation;
/**
 * إنشاء معادلة دالة جرسية (Bell curve)
 * Create bell curve equation
 */
export declare function createBellCurve(center?: number, width?: number, height?: number): GeneralShapeEquation;
/**
 * إنشاء معادلة موجة مربعة (Square wave)
 * Create square wave equation
 */
export declare function createSquareWave(period?: number, amplitude?: number, cycles?: number): GeneralShapeEquation;
/**
 * إنشاء معادلة دالة مثلثية (Triangular function)
 * Create triangular function equation
 */
export declare function createTriangularFunction(start?: number, peak?: number, end?: number, height?: number): GeneralShapeEquation;
/**
 * إنشاء معادلة دائرة (Circle equation)
 * Create circle equation
 */
export declare function createCircle(centerX?: number, centerY?: number, radius?: number): GeneralShapeEquation;
export declare const MATHEMATICAL_INTELLIGENCE_INFO: {
    readonly name: "أسس الذكاء الرياضي - Mathematical Intelligence Foundations";
    readonly version: "1.0.0";
    readonly author: "باسل يحيى عبدالله - Basil Yahya Abdullah";
    readonly description: {
        readonly ar: "نظام رياضي ثوري لتمثيل الأشكال والدوال بمعادلات ذكية";
        readonly en: "Revolutionary mathematical system for representing shapes and functions with intelligent equations";
    };
    readonly features: readonly ["دالة سيغمويد المعممة مع معامل التقطيع الأسي", "معادلة الشكل العام (GSE) لتمثيل أي شكل", "التعلم من صورة واحدة", "شفافية كاملة وقابلية للتفسير", "كفاءة عالية في استخدام البيانات"];
    readonly references: readonly ["taq.md - البحث الكامل عن نموذج التقريب الشامل", "baserah-bayan/BASERAH_SYSTEM_OVERVIEW.md - نظرة عامة على نظام بصيرة"];
};
/**
 * طباعة معلومات النظام
 * Print system information
 */
export declare function printSystemInfo(): void;
