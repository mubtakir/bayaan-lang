/**
 * أمثلة تطبيقية لأسس الذكاء الرياضي
 * Practical Examples for Mathematical Intelligence Foundations
 * 
 * هذا الملف يحتوي على أمثلة عملية لاستخدام نظام الذكاء الرياضي
 * This file contains practical examples of using the Mathematical Intelligence system
 */

import {
  GeneralizedSigmoid,
  LinearComponent,
  GeneralShapeEquation,
  DrawingEngine,
  InferenceEngine,
  createLineEquation,
  createStepFunction,
  createBellCurve,
  createSquareWave,
  printSystemInfo
} from '../src/mathematical-intelligence';

// ═══════════════════════════════════════════════════════════════
// مثال 1: دالة سيغمويد المعممة
// Example 1: Generalized Sigmoid Function
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('📊 مثال 1: دالة سيغمويد المعممة - Generalized Sigmoid');
console.log('═'.repeat(70));

// دالة سيغمويد تقليدية (n=1)
const traditionalSigmoid = GeneralizedSigmoid.traditional(1, 1, 0);
console.log('\n🔹 دالة سيغمويد تقليدية (n=1):');
console.log(`   f(0) = ${traditionalSigmoid.evaluate(0).toFixed(4)}`);
console.log(`   f(-5) = ${traditionalSigmoid.evaluate(-5).toFixed(4)}`);
console.log(`   f(5) = ${traditionalSigmoid.evaluate(5).toFixed(4)}`);

// دالة سيغمويد حادة (n=7)
const sharpSigmoid = GeneralizedSigmoid.sharp(1, 100, 0);
console.log('\n🔹 دالة سيغمويد حادة (n=7):');
console.log(`   f(0) = ${sharpSigmoid.evaluate(0).toFixed(4)}`);
console.log(`   f(-1) = ${sharpSigmoid.evaluate(-1).toFixed(4)}`);
console.log(`   f(1) = ${sharpSigmoid.evaluate(1).toFixed(4)}`);

// دالة جرسية (n=2)
const bellSigmoid = GeneralizedSigmoid.bell(1, 10, 0);
console.log('\n🔹 دالة جرسية (n=2):');
console.log(`   f(0) = ${bellSigmoid.evaluate(0).toFixed(4)}`);
console.log(`   f(1) = ${bellSigmoid.evaluate(1).toFixed(4)}`);
console.log(`   f(2) = ${bellSigmoid.evaluate(2).toFixed(4)}`);

// ═══════════════════════════════════════════════════════════════
// مثال 2: المكون الخطي
// Example 2: Linear Component
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('📏 مثال 2: المكون الخطي - Linear Component');
console.log('═'.repeat(70));

// إنشاء خط من نقطتين
const line1 = LinearComponent.fromTwoPoints(
  { x: 0, y: 0 },
  { x: 10, y: 20 }
);
console.log('\n🔹 خط من نقطتين (0,0) و (10,20):');
console.log(`   f(x) = ${line1.params.beta}x + ${line1.params.gamma}`);
console.log(`   f(5) = ${line1.evaluate(5)}`);

// إنشاء خط من نقطة وميل
const line2 = LinearComponent.fromPointAndSlope({ x: 0, y: 5 }, 3);
console.log('\n🔹 خط من نقطة (0,5) وميل 3:');
console.log(`   f(x) = ${line2.params.beta}x + ${line2.params.gamma}`);
console.log(`   f(10) = ${line2.evaluate(10)}`);

// إيجاد نقطة التقاطع
const intersection = line1.intersect(line2);
if (intersection) {
  console.log('\n🔹 نقطة التقاطع بين الخطين:');
  console.log(`   (${intersection.x.toFixed(2)}, ${intersection.y.toFixed(2)})`);
}

// ═══════════════════════════════════════════════════════════════
// مثال 3: معادلة الشكل العام
// Example 3: General Shape Equation
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('🎨 مثال 3: معادلة الشكل العام - General Shape Equation');
console.log('═'.repeat(70));

// معادلة بسيطة: خط مستقيم
const simpleEquation = createLineEquation(
  { x: 0, y: 0 },
  { x: 10, y: 10 }
);
console.log('\n🔹 معادلة خط مستقيم:');
console.log(`   f(0) = ${simpleEquation.evaluate(0)}`);
console.log(`   f(5) = ${simpleEquation.evaluate(5)}`);
console.log(`   f(10) = ${simpleEquation.evaluate(10)}`);

// معادلة مركبة: خط + سيغمويد
const complexEquation = new GeneralShapeEquation();
complexEquation.setGlobalLinear({ beta: 0.5, gamma: 0 });
complexEquation.addSigmoidTerm({
  alpha: 2,
  n: 1,
  k: 1,
  x0: 5
});
console.log('\n🔹 معادلة مركبة (خط + سيغمويد):');
console.log(`   f(0) = ${complexEquation.evaluate(0).toFixed(4)}`);
console.log(`   f(5) = ${complexEquation.evaluate(5).toFixed(4)}`);
console.log(`   f(10) = ${complexEquation.evaluate(10).toFixed(4)}`);

// ═══════════════════════════════════════════════════════════════
// مثال 4: محرك الرسام
// Example 4: Drawing Engine
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('🎨 مثال 4: محرك الرسام - Drawing Engine');
console.log('═'.repeat(70));

// رسم دالة خطوة
const stepFunction = createStepFunction(5, 1);
const stepResult = DrawingEngine.draw(stepFunction, {
  xRange: { min: 0, max: 10 },
  resolution: 100
});
console.log('\n🔹 رسم دالة خطوة:');
console.log(`   عدد المسارات: ${stepResult.paths.length}`);
console.log(`   عدد النقاط: ${stepResult.metadata.pointCount}`);
console.log(`   وقت الرسم: ${stepResult.metadata.renderTime.toFixed(2)} ms`);
console.log(`   الحدود: x[${stepResult.bounds.xMin}, ${stepResult.bounds.xMax}], y[${stepResult.bounds.yMin.toFixed(2)}, ${stepResult.bounds.yMax.toFixed(2)}]`);

// تصدير إلى SVG
const svg = DrawingEngine.toSVG(stepFunction, {
  xRange: { min: 0, max: 10 },
  resolution: 50
});
console.log(`\n🔹 تصدير إلى SVG: ${svg.length} حرف`);

// ═══════════════════════════════════════════════════════════════
// مثال 5: محرك العين المستنبطة
// Example 5: Inference Engine
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('👁️ مثال 5: محرك العين المستنبطة - Inference Engine');
console.log('═'.repeat(70));

// استنباط خط مستقيم من نقاط
const dataPoints = [
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 5 },
  { x: 3, y: 7 },
  { x: 4, y: 9 }
];

const inferenceResult = InferenceEngine.infer(dataPoints);
console.log('\n🔹 استنباط معادلة من نقاط:');
console.log(`   عدد الأنماط المكتشفة: ${inferenceResult.patterns.length}`);
console.log(`   عدد الحدود المستخدمة: ${inferenceResult.metadata.termsUsed}`);
console.log(`   الخطأ: ${inferenceResult.error.toFixed(4)}`);
console.log(`   الثقة: ${(inferenceResult.confidence * 100).toFixed(2)}%`);
console.log(`   وقت المعالجة: ${inferenceResult.metadata.processingTime.toFixed(2)} ms`);

// اختبار المعادلة المستنبطة
console.log('\n🔹 اختبار المعادلة المستنبطة:');
for (const point of dataPoints) {
  const predicted = inferenceResult.equation.evaluate(point.x);
  const error = Math.abs(predicted - point.y);
  console.log(`   f(${point.x}) = ${predicted.toFixed(4)} (actual: ${point.y}, error: ${error.toFixed(4)})`);
}

// ═══════════════════════════════════════════════════════════════
// مثال 6: الدوال المساعدة
// Example 6: Helper Functions
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('🛠️ مثال 6: الدوال المساعدة - Helper Functions');
console.log('═'.repeat(70));

// دالة خطوة
const step = createStepFunction(0, 1);
console.log('\n🔹 دالة خطوة:');
console.log(`   f(-5) = ${step.evaluate(-5).toFixed(4)}`);
console.log(`   f(0) = ${step.evaluate(0).toFixed(4)}`);
console.log(`   f(5) = ${step.evaluate(5).toFixed(4)}`);

// منحنى جرسي
const bell = createBellCurve(0, 2, 1);
console.log('\n🔹 منحنى جرسي:');
console.log(`   f(-2) = ${bell.evaluate(-2).toFixed(4)}`);
console.log(`   f(0) = ${bell.evaluate(0).toFixed(4)}`);
console.log(`   f(2) = ${bell.evaluate(2).toFixed(4)}`);

// موجة مربعة
const square = createSquareWave(4, 1, 2);
console.log('\n🔹 موجة مربعة:');
console.log(`   عدد الحدود: ${square.getTermCount()}`);
console.log(`   f(0) = ${square.evaluate(0).toFixed(4)}`);
console.log(`   f(2) = ${square.evaluate(2).toFixed(4)}`);
console.log(`   f(4) = ${square.evaluate(4).toFixed(4)}`);

// ═══════════════════════════════════════════════════════════════
// مثال 7: تطبيق عملي - رسم شكل طبيعي
// Example 7: Practical Application - Drawing Natural Shape
// ═══════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(70));
console.log('🌿 مثال 7: تطبيق عملي - رسم شكل طبيعي');
console.log('═'.repeat(70));

// رسم منحنى يشبه ورقة شجر
const leafShape = new GeneralShapeEquation();

// الجزء السفلي (خط مستقيم)
leafShape.setGlobalLinear({ beta: 0.1, gamma: 0 });

// الجزء الأيسر (منحنى)
leafShape.addSigmoidTerm({
  alpha: 2,
  n: 3,
  k: 50,
  x0: 2
}, {
  lineColorStart: '#228B22',
  lineColorEnd: '#32CD32',
  lineWidthStart: 2,
  lineWidthEnd: 1
});

// الجزء الأيمن (منحنى)
leafShape.addSigmoidTerm({
  alpha: -2,
  n: 3,
  k: 50,
  x0: 8
}, {
  lineColorStart: '#32CD32',
  lineColorEnd: '#228B22',
  lineWidthStart: 1,
  lineWidthEnd: 2
});

console.log('\n🔹 شكل ورقة شجر:');
console.log(`   عدد الحدود: ${leafShape.getTermCount()}`);
console.log(`   f(0) = ${leafShape.evaluate(0).toFixed(4)}`);
console.log(`   f(5) = ${leafShape.evaluate(5).toFixed(4)}`);
console.log(`   f(10) = ${leafShape.evaluate(10).toFixed(4)}`);

const leafResult = DrawingEngine.draw(leafShape, {
  xRange: { min: 0, max: 10 },
  resolution: 100,
  enableGradients: true,
  enableLineWidthGradients: true
});

console.log(`   عدد النقاط المرسومة: ${leafResult.metadata.pointCount}`);
console.log(`   وقت الرسم: ${leafResult.metadata.renderTime.toFixed(2)} ms`);

// ═══════════════════════════════════════════════════════════════
// معلومات النظام
// System Information
// ═══════════════════════════════════════════════════════════════

printSystemInfo();

console.log('\n' + '═'.repeat(70));
console.log('✅ اكتملت جميع الأمثلة بنجاح!');
console.log('✅ All examples completed successfully!');
console.log('═'.repeat(70) + '\n');

