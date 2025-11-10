/**
 * عرض توضيحي للمترجم الذكي
 * Intelligent Compiler Demo
 */

import { Lexer } from '../src/lexer/lexer.js';
import { IntelligentLexer } from '../src/lexer/intelligentLexer.js';
import { Parser } from '../src/parser/parser.js';
import { IntelligentParser } from '../src/parser/intelligentParser.js';
import { Compiler } from '../src/compiler/compiler.js';
import { IntelligentCompiler, IntelligentCompilerHelpers } from '../src/compiler/intelligentCompiler.js';

console.log(`
═══════════════════════════════════════════════════════════════════════════════
🧠 عرض توضيحي للمترجم الذكي
   Intelligent Compiler Demo
═══════════════════════════════════════════════════════════════════════════════
`);

// ============================================================================
// الكود المراد ترجمته - Code to Compile
// ============================================================================

const code = `
دع محمد = "شخص"
دع تفاحة = "طعام"
دع جوع = 80
دع طاقة = 60

دالة يأكل(طعام) {
  جوع = جوع - 20
  طاقة = طاقة + 15
}

دالة ينام(ساعات) {
  طاقة = طاقة + 20
}

يأكل(تفاحة)
ينام(8)
`;

console.log('📝 الكود المراد ترجمته - Code to Compile:');
console.log(code);
console.log('');

// ============================================================================
// 1. المترجم التقليدي - Traditional Compiler
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('1️⃣ المترجم التقليدي - Traditional Compiler');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const traditionalStartTime = performance.now();

const traditionalLexer = new Lexer(code);
const traditionalTokens = traditionalLexer.tokenize();
const traditionalParser = new Parser(traditionalTokens);
const traditionalAST = traditionalParser.parse();
const traditionalCompiler = new Compiler();
const traditionalCode = traditionalCompiler.compile(traditionalAST);

const traditionalEndTime = performance.now();
const traditionalTime = traditionalEndTime - traditionalStartTime;

console.log(`⏱️  الوقت - Time: ${traditionalTime.toFixed(2)} ms`);
console.log(`📊 الأسطر - Lines: ${traditionalCode.split('\n').length}`);
console.log(`🧠 الذكاء - Intelligence: ❌ لا ذكاء - NO INTELLIGENCE`);
console.log('');

console.log('📄 الكود المترجم - Compiled Code (first 20 lines):');
console.log('─'.repeat(70));
const traditionalLines = traditionalCode.split('\n');
for (let i = 0; i < Math.min(20, traditionalLines.length); i++) {
  console.log(traditionalLines[i]);
}
if (traditionalLines.length > 20) {
  console.log(`... و ${traditionalLines.length - 20} سطر آخر`);
}
console.log('─'.repeat(70));
console.log('');

// ============================================================================
// 2. المترجم الذكي - Intelligent Compiler
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('2️⃣ المترجم الذكي - Intelligent Compiler');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const intelligentStartTime = performance.now();

const intelligentLexer = new IntelligentLexer(code);
const intelligentTokens = intelligentLexer.tokenizeIntelligent();
const intelligentParser = new IntelligentParser(intelligentTokens);
const intelligentParseResult = intelligentParser.parseIntelligent();
const intelligentCompiler = new IntelligentCompiler();
const intelligentResult = intelligentCompiler.compileIntelligent(
  intelligentParseResult.ast,
  intelligentTokens
);

const intelligentEndTime = performance.now();
const intelligentTime = intelligentEndTime - intelligentStartTime;

console.log(`⏱️  الوقت - Time: ${intelligentTime.toFixed(2)} ms`);
console.log(`📊 الأسطر - Lines: ${intelligentResult.code.split('\n').length}`);
console.log(`🧠 الذكاء - Intelligence: ✅ ذكاء كامل - FULL INTELLIGENCE`);
console.log('');

// Print detailed summary
console.log(IntelligentCompilerHelpers.printSummary(intelligentResult));

console.log('📄 الكود المترجم الذكي - Intelligent Compiled Code (first 30 lines):');
console.log('─'.repeat(70));
const intelligentLines = intelligentResult.code.split('\n');
for (let i = 0; i < Math.min(30, intelligentLines.length); i++) {
  console.log(intelligentLines[i]);
}
if (intelligentLines.length > 30) {
  console.log(`... و ${intelligentLines.length - 30} سطر آخر`);
}
console.log('─'.repeat(70));
console.log('');

// ============================================================================
// 3. المقارنة - Comparison
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('3️⃣ المقارنة - Comparison');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const speedRatio = intelligentTime / traditionalTime;

console.log(`⏱️  السرعة - Speed:`);
console.log(`   - المترجم التقليدي - Traditional: ${traditionalTime.toFixed(2)} ms`);
console.log(`   - المترجم الذكي - Intelligent: ${intelligentTime.toFixed(2)} ms`);
console.log(`   - الفرق - Difference: ${speedRatio.toFixed(2)}x أبطأ - slower`);
console.log('');

console.log(`🧠 الذكاء - Intelligence:`);
console.log(`   - المترجم التقليدي - Traditional:`);
console.log(`     ❌ لا تحسينات دلالية - No semantic optimizations`);
console.log(`     ❌ لا مشغلات لغوية - No linguistic operators`);
console.log(`     ❌ لا تحسين سببي - No causal optimization`);
console.log(`     ❌ لا ترتيب أحداث - No event ordering`);
console.log('');
console.log(`   - المترجم الذكي - Intelligent:`);
console.log(`     ✅ تحسينات دلالية: ${intelligentResult.optimizations.length}`);
console.log(`     ✅ مشغلات لغوية: ${intelligentResult.linguisticOperators.length}`);
console.log(`     ✅ عقد سببية: ${intelligentResult.causalNetwork?.nodes.length || 0}`);
console.log(`     ✅ أحداث: ${intelligentResult.events?.length || 0}`);
console.log('');

// ============================================================================
// 4. تفاصيل التحسينات - Optimization Details
// ============================================================================

if (intelligentResult.optimizations.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('4️⃣ تفاصيل التحسينات - Optimization Details');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  for (const opt of intelligentResult.optimizations.slice(0, 5)) {
    console.log(`🔧 تحسين - Optimization: ${opt.description}`);
    console.log(`   - النوع - Type: ${opt.type}`);
    console.log(`   - الثقة - Confidence: ${(opt.confidence * 100).toFixed(0)}%`);
    console.log(`   - السبب - Reason: ${opt.reason}`);
    console.log(`   - التأثير - Impact:`);
    console.log(`     • الأداء - Performance: ${opt.impact.performance > 0 ? '+' : ''}${opt.impact.performance.toFixed(1)}%`);
    console.log(`     • الذاكرة - Memory: ${opt.impact.memory > 0 ? '+' : ''}${opt.impact.memory.toFixed(1)}%`);
    console.log(`     • القراءة - Readability: ${opt.impact.readability > 0 ? '+' : ''}${opt.impact.readability.toFixed(1)}%`);
    console.log('');
  }
  
  if (intelligentResult.optimizations.length > 5) {
    console.log(`... و ${intelligentResult.optimizations.length - 5} تحسين آخر`);
    console.log('');
  }
}

// ============================================================================
// 5. تفاصيل المشغلات اللغوية - Linguistic Operator Details
// ============================================================================

if (intelligentResult.linguisticOperators.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('5️⃣ تفاصيل المشغلات اللغوية - Linguistic Operator Details');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  for (const op of intelligentResult.linguisticOperators.slice(0, 5)) {
    console.log(`🔤 مشغل - Operator: ${op.name}`);
    console.log(`   - النوع - Type: ${op.type}`);
    console.log(`   - الهدف - Target: ${op.targetVariable}`);
    console.log(`   - الحروف - Letters: ${op.sourceLetters.join(', ')}`);
    if (op.letterMeanings.length > 0) {
      console.log(`   - المعاني - Meanings: ${op.letterMeanings.join(', ')}`);
    }
    console.log(`   - الثقة - Confidence: ${(op.confidence * 100).toFixed(0)}%`);
    console.log('');
  }
  
  if (intelligentResult.linguisticOperators.length > 5) {
    console.log(`... و ${intelligentResult.linguisticOperators.length - 5} مشغل آخر`);
    console.log('');
  }
}

// ============================================================================
// 6. الخلاصة - Summary
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('6️⃣ الخلاصة - Summary');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

console.log('✅ انتهى العرض التوضيحي!');
console.log('   Demo Complete!');
console.log('');
console.log('🎯 الخلاصة:');
console.log('   المترجم الذكي يفهم الكود ويحسنه!');
console.log('   The Intelligent Compiler understands and optimizes code!');
console.log('');
console.log('   ✅ تحسينات دلالية - Semantic optimizations');
console.log('   ✅ مشغلات لغوية - Linguistic operators');
console.log('   ✅ تحسين سببي - Causal optimization');
console.log('   ✅ ترتيب أحداث - Event ordering');
console.log('');
console.log(`   مكسب الأداء المتوقع: ${intelligentResult.statistics.performanceGain.toFixed(1)}%`);
console.log(`   Expected Performance Gain: ${intelligentResult.statistics.performanceGain.toFixed(1)}%`);
console.log('');
console.log('   هذا هو المستقبل! 🚀');
console.log('   This is the future! 🚀');
console.log('');
console.log('═══════════════════════════════════════════════════════════════');

