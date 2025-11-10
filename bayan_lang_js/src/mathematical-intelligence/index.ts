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

// ═══════════════════════════════════════════════════════════════
// دالة سيغمويد المعممة | Generalized Sigmoid
// ═══════════════════════════════════════════════════════════════

export {
  GeneralizedSigmoid,
  SigmoidParams,
  SAFE_PARAM_RANGES,
  SigmoidPresets
} from './generalizedSigmoid';

// ═══════════════════════════════════════════════════════════════
// المكون الخطي | Linear Component
// ═══════════════════════════════════════════════════════════════

export {
  LinearComponent,
  LinearParams,
  LinearPresets
} from './linearComponent';

// ═══════════════════════════════════════════════════════════════
// معادلة الشكل العام | General Shape Equation
// ═══════════════════════════════════════════════════════════════

export {
  GeneralShapeEquation,
  ShapeTerm,
  TermVisualProperties,
  GlobalVisualProperties
} from './generalShapeEquation';

// ═══════════════════════════════════════════════════════════════
// محرك الرسام | Drawing Engine
// ═══════════════════════════════════════════════════════════════

export {
  DrawingEngine,
  DrawingPoint,
  DrawingPath,
  DrawingResult,
  DrawingOptions
} from './drawingEngine';

// ═══════════════════════════════════════════════════════════════
// محرك العين المستنبطة | Inference Engine
// ═══════════════════════════════════════════════════════════════

export {
  InferenceEngine,
  DataPoint,
  DetectedPattern,
  InferenceOptions,
  InferenceResult
} from './inferenceEngine';

// ═══════════════════════════════════════════════════════════════
// دوال مساعدة | Helper Functions
// ═══════════════════════════════════════════════════════════════

import { GeneralShapeEquation } from './generalShapeEquation';
import { LinearComponent } from './linearComponent';

/**
 * إنشاء معادلة شكل بسيطة من نقطتين
 * Create simple shape equation from two points
 */
export function createLineEquation(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  const linear = LinearComponent.fromTwoPoints(p1, p2);
  equation.setGlobalLinear(linear.params);
  return equation;
}

/**
 * إنشاء معادلة دالة خطوة (Step function)
 * Create step function equation
 */
export function createStepFunction(
  x0: number = 0,
  amplitude: number = 1
): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  equation.addSigmoidTerm({
    alpha: amplitude,
    n: 7,
    k: 100,
    x0
  });
  return equation;
}

/**
 * إنشاء معادلة دالة جرسية (Bell curve)
 * Create bell curve equation
 */
export function createBellCurve(
  center: number = 0,
  width: number = 1,
  height: number = 1
): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  equation.addSigmoidTerm({
    alpha: height,
    n: 2,
    k: 10 / width,
    x0: center
  });
  return equation;
}

/**
 * إنشاء معادلة موجة مربعة (Square wave)
 * Create square wave equation
 */
export function createSquareWave(
  period: number = 2 * Math.PI,
  amplitude: number = 1,
  cycles: number = 3
): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  
  for (let i = 0; i < cycles; i++) {
    const x0 = i * period;
    
    // صعود
    equation.addSigmoidTerm({
      alpha: amplitude,
      n: 7,
      k: 100,
      x0
    });
    
    // هبوط
    equation.addSigmoidTerm({
      alpha: -amplitude,
      n: 7,
      k: 100,
      x0: x0 + period / 2
    });
  }
  
  return equation;
}

/**
 * إنشاء معادلة دالة مثلثية (Triangular function)
 * Create triangular function equation
 */
export function createTriangularFunction(
  start: number = 0,
  peak: number = 1,
  end: number = 2,
  height: number = 1
): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  
  // الجزء الصاعد
  const upSlope = height / (peak - start);
  equation.addLinearTerm({ beta: upSlope, gamma: -upSlope * start });
  
  // الجزء الهابط
  const downSlope = -height / (end - peak);
  equation.addLinearTerm({ beta: downSlope, gamma: -downSlope * end });
  
  return equation;
}

/**
 * إنشاء معادلة دائرة (Circle equation)
 * Create circle equation
 */
export function createCircle(
  centerX: number = 0,
  centerY: number = 0,
  radius: number = 1
): GeneralShapeEquation {
  const equation = new GeneralShapeEquation();
  
  // دائرة: (x - cx)² + (y - cy)² = r²
  // يمكن تمثيلها بمعادلة شكل عام معقدة
  // هذا مثال مبسط
  
  equation.setGlobalLinear({ beta: 0, gamma: centerY });
  
  // إضافة مكونات سيغمويد لتقريب الشكل الدائري
  const segments = 8;
  for (let i = 0; i < segments; i++) {
    const angle = (2 * Math.PI * i) / segments;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    equation.addSigmoidTerm({
      alpha: y - centerY,
      n: 2,
      k: 5,
      x0: x
    });
  }
  
  return equation;
}

// ═══════════════════════════════════════════════════════════════
// ثوابت ومعلومات النظام | System Constants and Information
// ═══════════════════════════════════════════════════════════════

export const MATHEMATICAL_INTELLIGENCE_INFO = {
  name: 'أسس الذكاء الرياضي - Mathematical Intelligence Foundations',
  version: '1.0.0',
  author: 'باسل يحيى عبدالله - Basil Yahya Abdullah',
  description: {
    ar: 'نظام رياضي ثوري لتمثيل الأشكال والدوال بمعادلات ذكية',
    en: 'Revolutionary mathematical system for representing shapes and functions with intelligent equations'
  },
  features: [
    'دالة سيغمويد المعممة مع معامل التقطيع الأسي',
    'معادلة الشكل العام (GSE) لتمثيل أي شكل',
    'التعلم من صورة واحدة',
    'شفافية كاملة وقابلية للتفسير',
    'كفاءة عالية في استخدام البيانات'
  ],
  references: [
    'taq.md - البحث الكامل عن نموذج التقريب الشامل',
    'baserah-bayan/BASERAH_SYSTEM_OVERVIEW.md - نظرة عامة على نظام بصيرة'
  ]
} as const;

/**
 * طباعة معلومات النظام
 * Print system information
 */
export function printSystemInfo(): void {
  console.log('\n' + '═'.repeat(70));
  console.log(`🎯 ${MATHEMATICAL_INTELLIGENCE_INFO.name}`);
  console.log('═'.repeat(70));
  console.log(`📦 Version: ${MATHEMATICAL_INTELLIGENCE_INFO.version}`);
  console.log(`👤 Author: ${MATHEMATICAL_INTELLIGENCE_INFO.author}`);
  console.log(`\n📝 Description:`);
  console.log(`   AR: ${MATHEMATICAL_INTELLIGENCE_INFO.description.ar}`);
  console.log(`   EN: ${MATHEMATICAL_INTELLIGENCE_INFO.description.en}`);
  console.log(`\n✨ Features:`);
  MATHEMATICAL_INTELLIGENCE_INFO.features.forEach((feature, i) => {
    console.log(`   ${i + 1}. ${feature}`);
  });
  console.log(`\n📚 References:`);
  MATHEMATICAL_INTELLIGENCE_INFO.references.forEach((ref, i) => {
    console.log(`   ${i + 1}. ${ref}`);
  });
  console.log('═'.repeat(70) + '\n');
}

