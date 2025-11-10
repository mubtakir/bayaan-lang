/**
 * عرض توضيحي للمحلل المعجمي الذكي
 * Intelligent Lexer Demo
 * 
 * يوضح الفرق الهائل بين المحلل التقليدي والمحلل الذكي
 * Shows the massive difference between traditional and intelligent lexer
 */

import { Lexer } from '../src/lexer/lexer.js';
import { IntelligentLexer, IntelligentTokenHelpers } from '../src/lexer/index.js';

console.log(`
═══════════════════════════════════════════════════════════════════════════════
🧠 عرض توضيحي للمحلل المعجمي الذكي
   INTELLIGENT LEXER DEMO
═══════════════════════════════════════════════════════════════════════════════
`);

// الكود المراد تحليله
const code = `
شيء محمد {
  خصائص: {نوع: "إنسان"}
  حالات: {جوع: 80, سعادة: 50}
}

شيء تفاحة {
  خصائص: {نوع: "فاكهة"}
  حالات: {موجودة: true}
}

دالة يأكل(شخص، طعام) {
  شخص.جوع = شخص.جوع - 20
  طعام.موجودة = false
}

يأكل(محمد، تفاحة)
`;

console.log(`
📝 الكود المراد تحليله:
───────────────────────────────────────────────────────────────────────────────
${code}
═══════════════════════════════════════════════════════════════════════════════
`);

// ═══════════════════════════════════════════════════════════════════════════════
// 1️⃣ المحلل التقليدي - Traditional Lexer
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`
1️⃣ المحلل التقليدي - Traditional Lexer:
───────────────────────────────────────────────────────────────────────────────
`);

const traditionalLexer = new Lexer(code);
const traditionalStart = performance.now();
const traditionalTokens = traditionalLexer.tokenize();
const traditionalTime = performance.now() - traditionalStart;

console.log(`⏱️  وقت التحليل: ${traditionalTime.toFixed(2)} ms`);
console.log(`📊 عدد الرموز: ${traditionalTokens.length}`);
console.log(`\n🔍 أمثلة على الرموز التقليدية:\n`);

// عرض بعض الرموز المهمة
const importantTokens = ['محمد', 'تفاحة', 'يأكل', 'جوع', 'سعادة'];
for (const tokenValue of importantTokens) {
  const token = traditionalTokens.find(t => t.value === tokenValue);
  if (token) {
    console.log(`Token: "${token.value}"`);
    console.log(`  Type: ${token.type}`);
    console.log(`  Line: ${token.line}, Column: ${token.column}`);
    console.log(`  ❌ لا معلومات ذكية! (No intelligence!)\n`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2️⃣ المحلل الذكي - Intelligent Lexer
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`
═══════════════════════════════════════════════════════════════════════════════
2️⃣ المحلل الذكي - Intelligent Lexer:
───────────────────────────────────────────────────────────────────────────────
`);

const intelligentLexer = new IntelligentLexer(code);
const intelligentStart = performance.now();
const intelligentTokens = intelligentLexer.tokenizeIntelligent();
const intelligentTime = performance.now() - intelligentStart;

console.log(`⏱️  وقت التحليل: ${intelligentTime.toFixed(2)} ms`);
console.log(`📊 عدد الرموز: ${intelligentTokens.length}`);
console.log(`\n🔍 أمثلة على الرموز الذكية:\n`);

// عرض نفس الرموز لكن بذكاء!
for (const tokenValue of importantTokens) {
  const token = intelligentTokens.find(t => t.value === tokenValue);
  if (token) {
    console.log(`═══════════════════════════════════════════════════════════════════════════════`);
    console.log(IntelligentTokenHelpers.getSummary(token));
    console.log(`═══════════════════════════════════════════════════════════════════════════════\n`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3️⃣ الإحصائيات - Statistics
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`
═══════════════════════════════════════════════════════════════════════════════
3️⃣ الإحصائيات - Statistics:
───────────────────────────────────────────────────────────────────────────────
`);

const stats = intelligentLexer.getStats();

console.log(`📊 إحصائيات التحليل الذكي:`);
console.log(`   إجمالي الرموز: ${stats.totalTokens}`);
console.log(`   الرموز الذكية: ${stats.intelligentTokens}`);
console.log(`   نجاحات الذاكرة المؤقتة: ${stats.cacheHits}`);
console.log(`   إخفاقات الذاكرة المؤقتة: ${stats.cacheMisses}`);
console.log(`   متوسط وقت التحليل: ${stats.averageAnalysisTime.toFixed(2)} ms`);
console.log(`   إجمالي وقت التحليل: ${stats.totalAnalysisTime.toFixed(2)} ms`);

console.log(`\n🌍 توزيع اللغات:`);
console.log(`   عربي: ${stats.languageDistribution.arabic}`);
console.log(`   إنجليزي: ${stats.languageDistribution.english}`);
console.log(`   مختلط: ${stats.languageDistribution.mixed}`);
console.log(`   محايد: ${stats.languageDistribution.neutral}`);

console.log(`\n🎯 توزيع الأنواع الدلالية:`);
for (const [type, count] of stats.semanticDistribution.entries()) {
  console.log(`   ${type}: ${count}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4️⃣ المقارنة - Comparison
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`
═══════════════════════════════════════════════════════════════════════════════
4️⃣ المقارنة - Comparison:
───────────────────────────────────────────────────────────────────────────════
`);

console.log(`⏱️  السرعة:`);
console.log(`   المحلل التقليدي: ${traditionalTime.toFixed(2)} ms`);
console.log(`   المحلل الذكي: ${intelligentTime.toFixed(2)} ms`);
console.log(`   الفرق: ${(intelligentTime - traditionalTime).toFixed(2)} ms`);
console.log(`   النسبة: ${(intelligentTime / traditionalTime).toFixed(2)}x أبطأ`);

console.log(`\n🧠 الذكاء:`);
console.log(`   المحلل التقليدي: ❌ لا ذكاء`);
console.log(`   المحلل الذكي: ✅ ذكاء كامل`);
console.log(`     ✅ تحليل معاني الحروف`);
console.log(`     ✅ تحليل الجذور`);
console.log(`     ✅ الاشتقاقات`);
console.log(`     ✅ الأنواع الدلالية`);
console.log(`     ✅ التحليل السببي`);

// ═══════════════════════════════════════════════════════════════════════════════
// 5️⃣ مثال تفصيلي - Detailed Example
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`
═══════════════════════════════════════════════════════════════════════════════
5️⃣ مثال تفصيلي - Detailed Example:
───────────────────────────────────────────────────────────────────────────────
`);

const muhammadToken = intelligentTokens.find(t => t.value === 'محمد');
if (muhammadToken) {
  console.log(`🔍 تحليل عميق للرمز "محمد":\n`);
  
  console.log(`📝 المعلومات الأساسية:`);
  console.log(`   القيمة: ${muhammadToken.value}`);
  console.log(`   النوع: ${muhammadToken.type}`);
  console.log(`   النوع الدلالي: ${muhammadToken.semanticType}`);
  console.log(`   اللغة: ${muhammadToken.language}`);
  console.log(`   مستوى الثقة: ${(muhammadToken.confidence * 100).toFixed(1)}%`);
  
  if (muhammadToken.letterAnalysis) {
    console.log(`\n🔤 تحليل الحروف:`);
    console.log(`   الحروف: [${muhammadToken.letterAnalysis.letters.join(', ')}]`);
    console.log(`   المعاني: [${muhammadToken.letterAnalysis.meanings.slice(0, 5).join(', ')}]`);
    console.log(`   المعنى المركب: ${muhammadToken.letterAnalysis.combinedMeaning}`);
    if (muhammadToken.letterAnalysis.personality) {
      console.log(`   الشخصية: ${muhammadToken.letterAnalysis.personality}`);
    }
  }
  
  if (muhammadToken.rootInfo) {
    console.log(`\n🌳 معلومات الجذر:`);
    console.log(`   الجذر: ${muhammadToken.rootInfo.root}`);
    console.log(`   النوع: ${muhammadToken.rootInfo.type}`);
    console.log(`   مستوى الثقة: ${(muhammadToken.rootInfo.confidence * 100).toFixed(1)}%`);
  }
  
  if (muhammadToken.derivationsInfo) {
    console.log(`\n📚 الاشتقاقات:`);
    console.log(`   العدد: ${muhammadToken.derivationsInfo.count}`);
    console.log(`   أمثلة: [${muhammadToken.derivationsInfo.derivations.slice(0, 5).join(', ')}]`);
  }
}

const yakulToken = intelligentTokens.find(t => t.value === 'يأكل');
if (yakulToken) {
  console.log(`\n🔍 تحليل عميق للرمز "يأكل":\n`);
  
  console.log(`📝 المعلومات الأساسية:`);
  console.log(`   القيمة: ${yakulToken.value}`);
  console.log(`   النوع: ${yakulToken.type}`);
  console.log(`   النوع الدلالي: ${yakulToken.semanticType}`);
  console.log(`   اللغة: ${yakulToken.language}`);
  
  if (yakulToken.causalInfo) {
    console.log(`\n⚡ التحليل السببي:`);
    console.log(`   هل هو حدث؟ ${yakulToken.causalInfo.isEvent ? 'نعم ✅' : 'لا ❌'}`);
    console.log(`   التأثيرات:`);
    for (const [effect, strength] of yakulToken.causalInfo.causes.entries()) {
      console.log(`     - ${effect}: ${strength > 0 ? '+' : ''}${strength}`);
    }
    if (yakulToken.causalInfo.requires.length > 0) {
      console.log(`   المتطلبات: [${yakulToken.causalInfo.requires.join(', ')}]`);
    }
    console.log(`   مستوى الثقة: ${(yakulToken.causalInfo.confidence * 100).toFixed(1)}%`);
  }
}

console.log(`
═══════════════════════════════════════════════════════════════════════════════
✅ انتهى العرض التوضيحي!
   Demo Complete!
═══════════════════════════════════════════════════════════════════════════════

🎯 الخلاصة:
   المحلل الذكي يفهم الكود بعمق!
   The Intelligent Lexer deeply understands the code!
   
   ✅ معاني الحروف
   ✅ الجذور والاشتقاقات
   ✅ الأنواع الدلالية
   ✅ العلاقات السببية
   ✅ الشخصيات والمعاني
   
   هذا هو المستقبل! 🚀
   This is the future! 🚀

═══════════════════════════════════════════════════════════════════════════════
`);

