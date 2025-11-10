/**
 * عرض توضيحي للمحلل النحوي الذكي
 * Intelligent Parser Demo
 */

import { Lexer } from '../src/lexer/lexer.js';
import { IntelligentLexer } from '../src/lexer/intelligentLexer.js';
import { Parser } from '../src/parser/parser.js';
import { IntelligentParser, IntelligentParserHelpers } from '../src/parser/intelligentParser.js';

console.log(`
═══════════════════════════════════════════════════════════════════════════════
🧠 عرض توضيحي للمحلل النحوي الذكي
   Intelligent Parser Demo
═══════════════════════════════════════════════════════════════════════════════
`);

// ============================================================================
// الكود المراد تحليله - Code to Parse
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

console.log('📝 الكود المراد تحليله - Code to Parse:');
console.log(code);
console.log('');

// ============================================================================
// 1. المحلل التقليدي - Traditional Parser
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('1️⃣ المحلل التقليدي - Traditional Parser');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const traditionalStartTime = performance.now();

const traditionalLexer = new Lexer(code);
const traditionalTokens = traditionalLexer.tokenize();
const traditionalParser = new Parser(traditionalTokens);
const traditionalAST = traditionalParser.parse();

const traditionalEndTime = performance.now();
const traditionalTime = traditionalEndTime - traditionalStartTime;

console.log(`⏱️  الوقت - Time: ${traditionalTime.toFixed(2)} ms`);
console.log(`📊 العقد - Nodes: ${traditionalAST.body.length}`);
console.log(`🧠 الذكاء - Intelligence: ❌ لا ذكاء - NO INTELLIGENCE`);
console.log('');

// ============================================================================
// 2. المحلل الذكي - Intelligent Parser
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('2️⃣ المحلل الذكي - Intelligent Parser');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const intelligentStartTime = performance.now();

const intelligentLexer = new IntelligentLexer(code);
const intelligentTokens = intelligentLexer.tokenizeIntelligent();
const intelligentParser = new IntelligentParser(intelligentTokens);
const intelligentResult = intelligentParser.parseIntelligent();

const intelligentEndTime = performance.now();
const intelligentTime = intelligentEndTime - intelligentStartTime;

console.log(`⏱️  الوقت - Time: ${intelligentTime.toFixed(2)} ms`);
console.log(`📊 العقد - Nodes: ${intelligentResult.ast.body.length}`);
console.log(`🧠 الذكاء - Intelligence: ✅ ذكاء كامل - FULL INTELLIGENCE`);
console.log('');

// Print detailed summary
console.log(IntelligentParserHelpers.printSummary(intelligentResult));

// ============================================================================
// 3. المقارنة - Comparison
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('3️⃣ المقارنة - Comparison');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const speedRatio = intelligentTime / traditionalTime;

console.log(`⏱️  السرعة - Speed:`);
console.log(`   - المحلل التقليدي - Traditional: ${traditionalTime.toFixed(2)} ms`);
console.log(`   - المحلل الذكي - Intelligent: ${intelligentTime.toFixed(2)} ms`);
console.log(`   - الفرق - Difference: ${speedRatio.toFixed(2)}x أبطأ - slower`);
console.log('');

console.log(`🧠 الذكاء - Intelligence:`);
console.log(`   - المحلل التقليدي - Traditional:`);
console.log(`     ❌ لا شبكات سببية - No causal networks`);
console.log(`     ❌ لا كشف أحداث - No event detection`);
console.log(`     ❌ لا خرائط علاقات - No relationship mapping`);
console.log(`     ❌ لا تحليل سياق - No context analysis`);
console.log('');
console.log(`   - المحلل الذكي - Intelligent:`);
console.log(`     ✅ شبكات سببية: ${intelligentResult.causalNetwork?.nodes.length || 0} عقدة، ${intelligentResult.causalNetwork?.edges.length || 0} حافة`);
console.log(`     ✅ كشف أحداث: ${intelligentResult.events?.length || 0} حدث`);
console.log(`     ✅ خرائط علاقات: ${intelligentResult.relationships?.length || 0} علاقة`);
console.log(`     ✅ تحليل سياق: ${intelligentResult.context?.variables.size || 0} متغير، ${intelligentResult.context?.functions.size || 0} دالة`);
console.log('');

// ============================================================================
// 4. تفاصيل الشبكة السببية - Causal Network Details
// ============================================================================

if (intelligentResult.causalNetwork && intelligentResult.causalNetwork.nodes.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('4️⃣ تفاصيل الشبكة السببية - Causal Network Details');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  console.log(`🔗 العقد السببية - Causal Nodes (${intelligentResult.causalNetwork.nodes.length}):`);
  for (const node of intelligentResult.causalNetwork.nodes.slice(0, 10)) {
    console.log(`   - ${node.name} (${node.type}) - ثقة: ${(node.confidence * 100).toFixed(0)}%`);
  }
  if (intelligentResult.causalNetwork.nodes.length > 10) {
    console.log(`   ... و ${intelligentResult.causalNetwork.nodes.length - 10} عقدة أخرى`);
  }
  console.log('');
  
  console.log(`🔀 الحواف السببية - Causal Edges (${intelligentResult.causalNetwork.edges.length}):`);
  for (const edge of intelligentResult.causalNetwork.edges.slice(0, 10)) {
    const sourceNode = intelligentResult.causalNetwork.nodes.find(n => n.id === edge.source);
    const targetNode = intelligentResult.causalNetwork.nodes.find(n => n.id === edge.target);
    console.log(`   - ${sourceNode?.name || edge.source} ${edge.type} ${targetNode?.name || edge.target} (قوة: ${edge.strength})`);
  }
  if (intelligentResult.causalNetwork.edges.length > 10) {
    console.log(`   ... و ${intelligentResult.causalNetwork.edges.length - 10} حافة أخرى`);
  }
  console.log('');
}

// ============================================================================
// 5. تفاصيل الأحداث - Event Details
// ============================================================================

if (intelligentResult.events && intelligentResult.events.length > 0) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('5️⃣ تفاصيل الأحداث - Event Details');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  for (const event of intelligentResult.events.slice(0, 5)) {
    console.log(`🎬 حدث - Event: ${event.name}`);
    console.log(`   - النوع - Type: ${event.type}`);
    console.log(`   - الثقة - Confidence: ${(event.confidence * 100).toFixed(0)}%`);
    
    if (event.effects.length > 0) {
      console.log(`   - التأثيرات - Effects:`);
      for (const effect of event.effects) {
        console.log(`     • ${effect.target}: ${effect.type} ${effect.magnitude ? `(${effect.magnitude})` : ''}`);
      }
    }
    
    if (event.preconditions.length > 0) {
      console.log(`   - الشروط المسبقة - Preconditions: ${event.preconditions.join(', ')}`);
    }
    
    if (event.postconditions.length > 0) {
      console.log(`   - الشروط اللاحقة - Postconditions: ${event.postconditions.join(', ')}`);
    }
    
    console.log('');
  }
  
  if (intelligentResult.events.length > 5) {
    console.log(`... و ${intelligentResult.events.length - 5} حدث آخر`);
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
console.log('   المحلل الذكي يفهم الكود بعمق!');
console.log('   The Intelligent Parser deeply understands the code!');
console.log('');
console.log('   ✅ شبكات سببية - Causal networks');
console.log('   ✅ كشف أحداث - Event detection');
console.log('   ✅ خرائط علاقات - Relationship mapping');
console.log('   ✅ تحليل سياق - Context analysis');
console.log('');
console.log('   هذا هو المستقبل! 🚀');
console.log('   This is the future! 🚀');
console.log('');
console.log('═══════════════════════════════════════════════════════════════');

