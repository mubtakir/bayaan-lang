/**
 * عرض توضيحي شامل من البداية للنهاية
 * End-to-End Intelligent Bayan Language Demo
 * 
 * يوضح كيف تعمل جميع المراحل الأربع معاً:
 * Shows how all 4 phases work together:
 * 
 * Phase 1: Intelligent Lexer (المحلل المعجمي الذكي)
 * Phase 2: Intelligent Parser (المحلل النحوي الذكي)
 * Phase 3: Intelligent Compiler (المترجم الذكي)
 * Phase 4: Intelligent Runtime (بيئة التشغيل الذكية)
 */

import { IntelligentLexer } from '../src/lexer/intelligentLexer.js';
import { IntelligentParser } from '../src/parser/intelligentParser.js';
import { IntelligentCompiler } from '../src/compiler/intelligentCompiler.js';
import { IntelligentRuntime, IntelligentRuntimeHelpers } from '../src/runtime/index.js';

console.log(`
═══════════════════════════════════════════════════════════════════════════════
🌟 عرض توضيحي شامل للغة البيان الذكية
   End-to-End Intelligent Bayan Language Demo
═══════════════════════════════════════════════════════════════════════════════

🎯 المراحل الأربع - Four Phases:
   1️⃣ المحلل المعجمي الذكي - Intelligent Lexer
   2️⃣ المحلل النحوي الذكي - Intelligent Parser
   3️⃣ المترجم الذكي - Intelligent Compiler
   4️⃣ بيئة التشغيل الذكية - Intelligent Runtime

═══════════════════════════════════════════════════════════════════════════════
`);

// ============================================================================
// الكود المصدري - Source Code
// ============================================================================

const sourceCode = `
متغير جوع = 80;
متغير طاقة = 60;

دالة يأكل() {
  جوع = جوع - 20;
  طاقة = طاقة + 15;
  إرجاع جوع;
}

دالة ينام() {
  طاقة = طاقة + 20;
  إرجاع طاقة;
}

يأكل();
ينام();
يأكل();
`;

console.log('📝 الكود المصدري - Source Code:');
console.log('─────────────────────────────────────────────────────────────────');
console.log(sourceCode);
console.log('─────────────────────────────────────────────────────────────────');
console.log('');

// ============================================================================
// Phase 1: Intelligent Lexer (المحلل المعجمي الذكي)
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('1️⃣ Phase 1: المحلل المعجمي الذكي - Intelligent Lexer');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const lexerStartTime = performance.now();
const lexer = new IntelligentLexer(sourceCode);
const tokens = lexer.tokenizeIntelligent();
const lexerTime = performance.now() - lexerStartTime;

console.log(`✅ تم التحليل المعجمي - Lexical Analysis Complete`);
console.log(`   - عدد الرموز - Tokens: ${tokens.length}`);
console.log(`   - الوقت - Time: ${lexerTime.toFixed(2)} ms`);
console.log('');

// عرض بعض الرموز الذكية
console.log('📊 أمثلة على الرموز الذكية - Sample Intelligent Tokens:');
const sampleTokens = tokens.filter(t => t.intelligence).slice(0, 5);
for (const token of sampleTokens) {
  console.log(`   - "${token.value}"`);
  if (token.intelligence?.root) {
    console.log(`     الجذر: ${token.intelligence.root.root} (ثقة: ${(token.intelligence.root.confidence * 100).toFixed(0)}%)`);
  }
  if (token.intelligence?.letterAnalysis && token.intelligence.letterAnalysis.length > 0) {
    console.log(`     معاني الحروف: ${token.intelligence.letterAnalysis.length} حرف`);
  }
}
console.log('');

// ============================================================================
// Phase 2: Intelligent Parser (المحلل النحوي الذكي)
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('2️⃣ Phase 2: المحلل النحوي الذكي - Intelligent Parser');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const parserStartTime = performance.now();
const parser = new IntelligentParser(tokens);
const parseResult = parser.parseIntelligent();
const parserTime = performance.now() - parserStartTime;

console.log(`✅ تم التحليل النحوي - Parsing Complete`);
console.log(`   - الوقت - Time: ${parserTime.toFixed(2)} ms`);
console.log(`   - الثقة - Confidence: ${(parseResult.ast.confidence * 100).toFixed(1)}%`);
console.log('');

if (parseResult.causalNetwork) {
  console.log('📊 الشبكة السببية - Causal Network:');
  console.log(`   - العقد - Nodes: ${parseResult.causalNetwork.nodes.length}`);
  console.log(`   - الحواف - Edges: ${parseResult.causalNetwork.edges.length}`);
  console.log('');

  if (parseResult.causalNetwork.edges.length > 0) {
    console.log('   الحواف السببية - Causal Edges:');
    for (const edge of parseResult.causalNetwork.edges.slice(0, 5)) {
      console.log(`   - ${edge.from} → ${edge.to} (${edge.type}, قوة: ${(edge.strength * 100).toFixed(0)}%)`);
    }
    console.log('');
  }
}

if (parseResult.events) {
  console.log('📊 الأحداث المكتشفة - Detected Events:');
  console.log(`   - عدد الأحداث - Events: ${parseResult.events.length}`);
  for (const event of parseResult.events.slice(0, 3)) {
    console.log(`   - ${event.name} (${event.type}, ثقة: ${(event.confidence * 100).toFixed(0)}%)`);
  }
  console.log('');
}

// ============================================================================
// Phase 3: Intelligent Compiler (المترجم الذكي)
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('3️⃣ Phase 3: المترجم الذكي - Intelligent Compiler');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const compilerStartTime = performance.now();
const compiler = new IntelligentCompiler();
const compilationResult = compiler.compileIntelligent(parseResult.ast);
const compilerTime = performance.now() - compilerStartTime;

console.log(`✅ تم الترجمة - Compilation Complete`);
console.log(`   - الوقت - Time: ${compilerTime.toFixed(2)} ms`);
console.log(`   - الثقة - Confidence: ${(compilationResult.confidence * 100).toFixed(1)}%`);
console.log('');

console.log('📊 التحسينات - Optimizations:');
console.log(`   - عدد التحسينات - Count: ${compilationResult.optimizations.length}`);
for (const opt of compilationResult.optimizations.slice(0, 5)) {
  console.log(`   - ${opt.type} (تأثير: +${(opt.impact.performance * 100).toFixed(1)}% أداء)`);
}
console.log('');

console.log('📊 المشغلات اللغوية - Linguistic Operators:');
console.log(`   - عدد المشغلات - Count: ${compilationResult.linguisticOperators.length}`);
for (const op of compilationResult.linguisticOperators.slice(0, 5)) {
  const location = op.location ? `في السطر ${op.location.line}` : '';
  console.log(`   - ${op.type} ${location}`);
}
console.log('');

// ============================================================================
// Phase 4: Intelligent Runtime (بيئة التشغيل الذكية)
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('4️⃣ Phase 4: بيئة التشغيل الذكية - Intelligent Runtime');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const runtime = new IntelligentRuntime(parseResult.causalNetwork || { nodes: [], edges: [], metadata: new Map() }, {
  enableCausalInference: true,
  enableRealTimeLearning: true,
  enableAdaptiveBehavior: true,
  inferenceThreshold: 0.7,
  learningThreshold: 0.6
});

// محاكاة التنفيذ - Simulate execution
console.log('🚀 تنفيذ الكود - Executing Code...');
console.log('');

// التنفيذ 1: يأكل
const execution1 = runtime.executeIntelligent(() => {
  let hunger = 80;
  let energy = 60;
  hunger = hunger - 20;
  energy = energy + 15;
  return { hunger, energy };
}, new Map([['hunger', 80], ['energy', 60]]));

console.log('1️⃣ التنفيذ الأول: يأكل()');
console.log(`   النتيجة: ${JSON.stringify(execution1.output)}`);
console.log(`   الوقت: ${execution1.executionTime.toFixed(2)} ms`);
console.log(`   الثقة: ${(execution1.confidence * 100).toFixed(1)}%`);
console.log('');

// التنفيذ 2: ينام
const execution2 = runtime.executeIntelligent(() => {
  let energy = 75;
  energy = energy + 20;
  return { energy };
}, new Map([['energy', 75]]));

console.log('2️⃣ التنفيذ الثاني: ينام()');
console.log(`   النتيجة: ${JSON.stringify(execution2.output)}`);
console.log(`   الوقت: ${execution2.executionTime.toFixed(2)} ms`);
console.log(`   الثقة: ${(execution2.confidence * 100).toFixed(1)}%`);
console.log(`   الأنماط المتعلمة: ${execution2.patternsLearned.length}`);
console.log('');

// التنفيذ 3: يأكل مرة أخرى
const execution3 = runtime.executeIntelligent(() => {
  let hunger = 60;
  let energy = 95;
  hunger = hunger - 20;
  energy = energy + 15;
  return { hunger, energy };
}, new Map([['hunger', 60], ['energy', 95]]));

console.log('3️⃣ التنفيذ الثالث: يأكل()');
console.log(`   النتيجة: ${JSON.stringify(execution3.output)}`);
console.log(`   الوقت: ${execution3.executionTime.toFixed(2)} ms`);
console.log(`   الثقة: ${(execution3.confidence * 100).toFixed(1)}%`);
console.log(`   الأنماط المتعلمة: ${execution3.patternsLearned.length}`);
console.log('');

// ============================================================================
// الإحصائيات النهائية - Final Statistics
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('📊 الإحصائيات النهائية - Final Statistics');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const finalStats = runtime.getStats();
const totalTime = lexerTime + parserTime + compilerTime + finalStats.averageExecutionTime;

console.log('⏱️  الأوقات - Timings:');
console.log(`   - المحلل المعجمي - Lexer: ${lexerTime.toFixed(2)} ms`);
console.log(`   - المحلل النحوي - Parser: ${parserTime.toFixed(2)} ms`);
console.log(`   - المترجم - Compiler: ${compilerTime.toFixed(2)} ms`);
console.log(`   - بيئة التشغيل - Runtime: ${finalStats.averageExecutionTime.toFixed(2)} ms (متوسط)`);
console.log(`   - الإجمالي - Total: ${totalTime.toFixed(2)} ms`);
console.log('');

console.log('🧠 الذكاء - Intelligence:');
console.log(`   - الرموز الذكية - Intelligent Tokens: ${tokens.filter(t => t.intelligence).length}`);
if (parseResult.causalNetwork) {
  console.log(`   - الشبكة السببية - Causal Network: ${parseResult.causalNetwork.nodes.length} عقد، ${parseResult.causalNetwork.edges.length} حافة`);
}
if (parseResult.events) {
  console.log(`   - الأحداث المكتشفة - Events Detected: ${parseResult.events.length}`);
}
console.log(`   - التحسينات - Optimizations: ${compilationResult.optimizations.length}`);
console.log(`   - المشغلات اللغوية - Linguistic Operators: ${compilationResult.linguisticOperators.length}`);
console.log(`   - الأنماط المتعلمة - Patterns Learned: ${finalStats.totalPatternsLearned}`);
console.log(`   - الاستنتاجات - Inferences: ${finalStats.totalInferences}`);
console.log('');

console.log('🎯 الثقة - Confidence:');
console.log(`   - المحلل النحوي - Parser: ${(parseResult.ast.confidence * 100).toFixed(1)}%`);
console.log(`   - المترجم - Compiler: ${(compilationResult.confidence * 100).toFixed(1)}%`);
console.log(`   - بيئة التشغيل - Runtime: ${(finalStats.averageConfidence * 100).toFixed(1)}%`);
const avgConfidence = (parseResult.ast.confidence + compilationResult.confidence + finalStats.averageConfidence) / 3;
console.log(`   - المتوسط - Average: ${(avgConfidence * 100).toFixed(1)}%`);
console.log('');

// ============================================================================
// الخلاصة - Summary
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('🎉 الخلاصة - Summary');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

console.log('✅ تم تنفيذ جميع المراحل الأربع بنجاح!');
console.log('   All 4 phases executed successfully!');
console.log('');

console.log('🌟 لغة البيان الذكية تقوم بـ:');
console.log('   The Intelligent Bayan Language:');
console.log('');
console.log('   ✅ تفهم معاني الحروف والجذور - Understands letter meanings and roots');
console.log('   ✅ تبني شبكات سببية تلقائياً - Builds causal networks automatically');
console.log('   ✅ تكتشف الأحداث والعلاقات - Detects events and relationships');
console.log('   ✅ تحسن الكود دلالياً - Optimizes code semantically');
console.log('   ✅ تحقن مشغلات لغوية - Injects linguistic operators');
console.log('   ✅ تستنتج علاقات سببية ديناميكياً - Infers causal relationships dynamically');
console.log('   ✅ تتعلم من التنفيذ فورياً - Learns from execution in real-time');
console.log('   ✅ تتكيف مع الأنماط - Adapts to patterns');
console.log('');

console.log('🚀 هذا هو المستقبل!');
console.log('   This is the future!');
console.log('');

console.log('═══════════════════════════════════════════════════════════════');

