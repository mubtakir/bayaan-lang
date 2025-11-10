/**
 * عرض توضيحي لبيئة التشغيل الذكية
 * Intelligent Runtime Demo
 */

import { IntelligentRuntime, IntelligentRuntimeHelpers } from '../src/runtime/index.js';
import { CausalNetwork, CausalNode, CausalEdge } from '../src/parser/intelligentAST.js';

console.log(`
═══════════════════════════════════════════════════════════════════════════════
🧠 عرض توضيحي لبيئة التشغيل الذكية
   Intelligent Runtime Demo
═══════════════════════════════════════════════════════════════════════════════
`);

// ============================================================================
// إنشاء شبكة سببية - Create Causal Network
// ============================================================================

console.log('📊 إنشاء الشبكة السببية - Creating Causal Network...');
console.log('');

const nodes: CausalNode[] = [
  {
    id: 'node_hunger',
    name: 'جوع',
    type: 'variable',
    value: 80,
    confidence: 0.9,
    metadata: new Map([['type', 'number']])
  },
  {
    id: 'node_energy',
    name: 'طاقة',
    type: 'variable',
    value: 60,
    confidence: 0.9,
    metadata: new Map([['type', 'number']])
  },
  {
    id: 'node_eat',
    name: 'يأكل',
    type: 'event',
    value: null,
    confidence: 0.85,
    metadata: new Map([['action', 'eating']])
  },
  {
    id: 'node_sleep',
    name: 'ينام',
    type: 'event',
    value: null,
    confidence: 0.85,
    metadata: new Map([['action', 'sleeping']])
  }
];

const edges: CausalEdge[] = [
  {
    id: 'edge_eat_hunger',
    from: 'يأكل',
    to: 'جوع',
    type: 'prevents',
    strength: 0.9,
    confidence: 0.85,
    metadata: new Map([['effect', 'reduces hunger']])
  },
  {
    id: 'edge_eat_energy',
    from: 'يأكل',
    to: 'طاقة',
    type: 'enhances',
    strength: 0.8,
    confidence: 0.85,
    metadata: new Map([['effect', 'increases energy']])
  },
  {
    id: 'edge_sleep_energy',
    from: 'ينام',
    to: 'طاقة',
    type: 'enhances',
    strength: 0.9,
    confidence: 0.9,
    metadata: new Map([['effect', 'restores energy']])
  }
];

const causalNetwork: CausalNetwork = {
  nodes,
  edges,
  metadata: new Map([
    ['description', 'شبكة سببية لنموذج الجوع والطاقة'],
    ['created', Date.now()]
  ])
};

console.log(`✅ تم إنشاء الشبكة السببية:`);
console.log(`   - العقد - Nodes: ${nodes.length}`);
console.log(`   - الحواف - Edges: ${edges.length}`);
console.log('');

// ============================================================================
// إنشاء بيئة التشغيل الذكية - Create Intelligent Runtime
// ============================================================================

console.log('🚀 إنشاء بيئة التشغيل الذكية - Creating Intelligent Runtime...');
console.log('');

const runtime = new IntelligentRuntime(causalNetwork, {
  enableCausalInference: true,
  enableRealTimeLearning: true,
  enableAdaptiveBehavior: true,
  inferenceThreshold: 0.7,
  learningThreshold: 0.6,
  maxInferencesPerExecution: 10,
  maxPatternsToStore: 100
});

console.log('✅ تم إنشاء بيئة التشغيل الذكية');
console.log('');

// ============================================================================
// التنفيذ 1: الأكل - Execution 1: Eating
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('1️⃣ التنفيذ الأول: الأكل - First Execution: Eating');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const eatFunction = () => {
  let hunger = 80;
  let energy = 60;
  
  // Eating reduces hunger and increases energy
  hunger = hunger - 20;
  energy = energy + 15;
  
  return { hunger, energy };
};

const result1 = runtime.executeIntelligent(eatFunction, new Map([
  ['hunger', 80],
  ['energy', 60]
]));

console.log('📊 النتيجة - Result:');
console.log(`   Output: ${JSON.stringify(result1.output)}`);
console.log('');

console.log(IntelligentRuntimeHelpers.printSummary(result1));

// ============================================================================
// التنفيذ 2: النوم - Execution 2: Sleeping
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('2️⃣ التنفيذ الثاني: النوم - Second Execution: Sleeping');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const sleepFunction = () => {
  let energy = 60;
  
  // Sleeping increases energy
  energy = energy + 20;
  
  return { energy };
};

const result2 = runtime.executeIntelligent(sleepFunction, new Map([
  ['energy', 60]
]));

console.log('📊 النتيجة - Result:');
console.log(`   Output: ${JSON.stringify(result2.output)}`);
console.log('');

console.log(IntelligentRuntimeHelpers.printSummary(result2));

// ============================================================================
// التنفيذ 3: تسلسل معقد - Execution 3: Complex Sequence
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('3️⃣ التنفيذ الثالث: تسلسل معقد - Third Execution: Complex Sequence');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const complexFunction = () => {
  let hunger = 80;
  let energy = 60;
  
  // Eat
  hunger = hunger - 20;
  energy = energy + 15;
  
  // Sleep
  energy = energy + 20;
  
  // Eat again
  hunger = hunger - 20;
  energy = energy + 15;
  
  return { hunger, energy };
};

const result3 = runtime.executeIntelligent(complexFunction, new Map([
  ['hunger', 80],
  ['energy', 60]
]));

console.log('📊 النتيجة - Result:');
console.log(`   Output: ${JSON.stringify(result3.output)}`);
console.log('');

console.log(IntelligentRuntimeHelpers.printSummary(result3));

// ============================================================================
// الإحصائيات النهائية - Final Statistics
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('📈 الإحصائيات النهائية - Final Statistics');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

const finalStats = runtime.getStats();

console.log(`📊 إحصائيات بيئة التشغيل - Runtime Statistics:`);
console.log(`   - إجمالي التنفيذات - Total Executions: ${finalStats.totalExecutions}`);
console.log(`   - إجمالي الاستنتاجات - Total Inferences: ${finalStats.totalInferences}`);
console.log(`   - إجمالي الأنماط المتعلمة - Total Patterns Learned: ${finalStats.totalPatternsLearned}`);
console.log(`   - إجمالي السلوكيات المفعلة - Total Behaviors Activated: ${finalStats.totalBehaviorsActivated}`);
console.log(`   - متوسط وقت التنفيذ - Average Execution Time: ${finalStats.averageExecutionTime.toFixed(2)} ms`);
console.log(`   - متوسط الثقة - Average Confidence: ${(finalStats.averageConfidence * 100).toFixed(1)}%`);
console.log(`   - حجم الشبكة السببية - Causal Network Size: ${finalStats.causalNetworkSize}`);
console.log(`   - معدل التعلم - Learning Rate: ${(finalStats.learningRate * 100).toFixed(1)}%`);
console.log('');

// ============================================================================
// المقارنة - Comparison
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('🔍 المقارنة - Comparison');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

console.log('التنفيذ التقليدي - Traditional Execution:');
console.log('   ❌ لا استنتاج سببي - No causal inference');
console.log('   ❌ لا تعلم فوري - No real-time learning');
console.log('   ❌ لا سلوك تكيفي - No adaptive behavior');
console.log('   ❌ لا فهم للسياق - No context understanding');
console.log('');

console.log('التنفيذ الذكي - Intelligent Execution:');
console.log(`   ✅ استنتاج سببي ديناميكي: ${finalStats.totalInferences} استنتاج`);
console.log(`   ✅ تعلم فوري: ${finalStats.totalPatternsLearned} نمط متعلم`);
console.log(`   ✅ سلوك تكيفي: ${finalStats.totalBehaviorsActivated} سلوك مفعل`);
console.log(`   ✅ فهم السياق: ${(finalStats.averageConfidence * 100).toFixed(1)}% ثقة`);
console.log('');

// ============================================================================
// الخلاصة - Summary
// ============================================================================

console.log('═══════════════════════════════════════════════════════════════');
console.log('🎉 الخلاصة - Summary');
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

console.log('✅ انتهى العرض التوضيحي!');
console.log('   Demo Complete!');
console.log('');
console.log('🎯 الخلاصة:');
console.log('   بيئة التشغيل الذكية تفهم وتتعلم وتتكيف!');
console.log('   The Intelligent Runtime understands, learns, and adapts!');
console.log('');
console.log('   ✅ استنتاج سببي ديناميكي - Dynamic causal inference');
console.log('   ✅ تعلم فوري من التنفيذ - Real-time learning from execution');
console.log('   ✅ سلوك تكيفي ذكي - Intelligent adaptive behavior');
console.log('   ✅ فهم عميق للسياق - Deep context understanding');
console.log('');
console.log('   هذا هو المستقبل! 🚀');
console.log('   This is the future! 🚀');
console.log('');
console.log('═══════════════════════════════════════════════════════════════');

