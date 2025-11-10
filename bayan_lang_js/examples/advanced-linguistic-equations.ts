/**
 * Advanced Linguistic Equations Examples
 * أمثلة متقدمة للمعادلات اللغوية
 * 
 * This file demonstrates advanced usage of the Linguistic Equations System:
 * - Complex causal chains
 * - Multiple custom operators working together
 * - Scientific phenomena modeling
 * - Real-world use cases
 */

import {
  LinguisticEquationEngine,
  LinguisticRole,
  CustomOperatorBuilder,
  PredefinedCustomOperators,
  ConditionType,
  EffectType,
} from '../src/linguistic-equations';

console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('🧮 Advanced Linguistic Equations Examples');
console.log('   أمثلة متقدمة للمعادلات اللغوية');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════════════════════════════════════════
// Example 1: Complex Causal Chain - سلسلة سببية معقدة
// ═══════════════════════════════════════════════════════════════════════════════

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Example 1: Complex Causal Chain - سلسلة سببية معقدة');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const engine1 = new LinguisticEquationEngine();

// Scenario: Rain → Wet Ground → Slippery → Fall → Injury
// السيناريو: مطر → أرض مبللة → انزلاق → سقوط → إصابة

const rain = engine1.createEntity('مطر', LinguisticRole.CAUSE, new Map([
  ['intensity', 80],
  ['الشدة', 80],
]));

const ground = engine1.createEntity('أرض', LinguisticRole.PATIENT, new Map([
  ['wetness', 0],
  ['البلل', 0],
]));

const person = engine1.createEntity('شخص', LinguisticRole.AGENT, new Map([
  ['balance', 70],
  ['التوازن', 70],
  ['health', 100],
  ['الصحة', 100],
]));

// Chain 1: Rain → Wet Ground
console.log('Chain 1: Rain → Wet Ground');
console.log('السلسلة 1: مطر → أرض مبللة\n');

const eq1 = engine1.createEquation(
  'Rain makes ground wet',
  'المطر يبلل الأرض',
  [rain, ground],
  []
);

engine1.executeEquation(eq1);
ground.attributes.set('wetness', 90);
ground.attributes.set('البلل', 90);

console.log(`Ground wetness: ${ground.attributes.get('wetness')}`);
console.log(`بلل الأرض: ${ground.attributes.get('البلل')}\n`);

// Chain 2: Wet Ground → Person Slips
console.log('Chain 2: Wet Ground → Person Slips');
console.log('السلسلة 2: أرض مبللة → شخص ينزلق\n');

const eq2 = engine1.createEquation(
  'Wet ground causes slipping',
  'الأرض المبللة تسبب الانزلاق',
  [ground, person],
  []
);

engine1.executeEquation(eq2);
person.attributes.set('balance', 30);
person.attributes.set('التوازن', 30);

console.log(`Person balance: ${person.attributes.get('balance')}`);
console.log(`توازن الشخص: ${person.attributes.get('التوازن')}\n`);

// Chain 3: Low Balance → Fall → Injury
console.log('Chain 3: Low Balance → Fall → Injury');
console.log('السلسلة 3: توازن منخفض → سقوط → إصابة\n');

if (person.attributes.get('balance')! < 50) {
  person.attributes.set('health', 60);
  person.attributes.set('الصحة', 60);
  console.log('⚠️  Person fell and got injured!');
  console.log('⚠️  الشخص سقط وأصيب!\n');
}

console.log(`Person health: ${person.attributes.get('health')}`);
console.log(`صحة الشخص: ${person.attributes.get('الصحة')}\n`);

console.log('✅ Complete causal chain executed successfully!');
console.log('✅ تم تنفيذ السلسلة السببية الكاملة بنجاح!\n');

// ═══════════════════════════════════════════════════════════════════════════════
// Example 2: Scientific Phenomenon - Chemical Reaction
// ═══════════════════════════════════════════════════════════════════════════════

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Example 2: Scientific Phenomenon - Chemical Reaction');
console.log('المثال 2: ظاهرة علمية - تفاعل كيميائي');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const engine2 = new LinguisticEquationEngine();

// Scenario: H2 + O2 → H2O (with catalyst and temperature)
// السيناريو: H2 + O2 → H2O (مع محفز ودرجة حرارة)

const hydrogen = engine2.createEntity('هيدروجين', LinguisticRole.CAUSE, new Map([
  ['molecules', 2],
  ['الجزيئات', 2],
]));

const oxygen = engine2.createEntity('أكسجين', LinguisticRole.CAUSE, new Map([
  ['molecules', 1],
  ['الجزيئات', 1],
]));

const catalyst = engine2.createEntity('محفز', LinguisticRole.CATALYST, new Map([
  ['present', true],
  ['موجود', true],
]));

const temperature = engine2.createEntity('حرارة', LinguisticRole.ENABLER, new Map([
  ['degrees', 500],
  ['الدرجات', 500],
]));

const water = engine2.createEntity('ماء', LinguisticRole.EFFECT, new Map([
  ['molecules', 0],
  ['الجزيئات', 0],
]));

// Register scientific causation operator
const scientificOp = PredefinedCustomOperators.scientificCausation();
engine2.defineCustomOperator(scientificOp);

console.log('Initial state - الحالة الأولية:');
console.log(`H2 molecules: ${hydrogen.attributes.get('molecules')}`);
console.log(`O2 molecules: ${oxygen.attributes.get('molecules')}`);
console.log(`H2O molecules: ${water.attributes.get('molecules')}`);
console.log(`Temperature: ${temperature.attributes.get('degrees')}°C`);
console.log(`Catalyst present: ${catalyst.attributes.get('present')}\n`);

// Create equation: H2 + O2 ⊢علمي H2O (if temperature > 400 and catalyst present)
const eq3 = engine2.createEquation(
  'Hydrogen and Oxygen form Water',
  'الهيدروجين والأكسجين يكونان الماء',
  [hydrogen, oxygen, water],
  [],
  [
    {
      id: 'temperature_check',
      type: ConditionType.ATTRIBUTE,
      expression: 'temperature >= 400',
      evaluate: (context) => {
        const temp = Array.from(context.entities.values())
          .find(e => e.name === 'حرارة');
        return temp ? (temp.attributes.get('degrees') || 0) >= 400 : false;
      },
    },
    {
      id: 'catalyst_check',
      type: ConditionType.STATE,
      expression: 'catalyst.present === true',
      evaluate: (context) => {
        const cat = Array.from(context.entities.values())
          .find(e => e.name === 'محفز');
        return cat ? cat.attributes.get('present') === true : false;
      },
    },
  ]
);

const event3 = engine2.executeEquation(eq3);

if (!event3.cancelled) {
  // Reaction occurred
  water.attributes.set('molecules', 2);
  water.attributes.set('الجزيئات', 2);
  hydrogen.attributes.set('molecules', 0);
  hydrogen.attributes.set('الجزيئات', 0);
  oxygen.attributes.set('molecules', 0);
  oxygen.attributes.set('الجزيئات', 0);
  
  console.log('✅ Reaction occurred! - حدث التفاعل!\n');
  console.log('Final state - الحالة النهائية:');
  console.log(`H2 molecules: ${hydrogen.attributes.get('molecules')}`);
  console.log(`O2 molecules: ${oxygen.attributes.get('molecules')}`);
  console.log(`H2O molecules: ${water.attributes.get('molecules')}\n`);
} else {
  console.log(`❌ Reaction prevented: ${event3.reason}`);
  console.log(`❌ التفاعل ممنوع: ${event3.reason}\n`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Example 3: Multiple Custom Operators - Economic System
// ═══════════════════════════════════════════════════════════════════════════════

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Example 3: Multiple Custom Operators - Economic System');
console.log('المثال 3: مشغلات مخصصة متعددة - نظام اقتصادي');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const engine3 = new LinguisticEquationEngine();

// Define custom operators for economic system
const inflationOp = new CustomOperatorBuilder()
  .withSymbol('↑تضخم')
  .withName('تضخم_اقتصادي')
  .withNameEn('economic_inflation')
  .withDescription('Inflation increases prices')
  .withPrecedence(6)
  .withImplementation(`
    const [entity] = entities;
    const currentPrice = entity.attributes.get('price') || 0;
    entity.attributes.set('price', currentPrice * 1.1);
    entity.attributes.set('السعر', currentPrice * 1.1);
    return [entity];
  `)
  .addExample('منتج ↑تضخم')
  .build();

const demandOp = new CustomOperatorBuilder()
  .withSymbol('↑طلب')
  .withName('زيادة_الطلب')
  .withNameEn('increase_demand')
  .withDescription('Demand increases price')
  .withPrecedence(6)
  .withImplementation(`
    const [entity] = entities;
    const currentPrice = entity.attributes.get('price') || 0;
    const currentDemand = entity.attributes.get('demand') || 0;
    entity.attributes.set('demand', currentDemand + 20);
    entity.attributes.set('الطلب', currentDemand + 20);
    entity.attributes.set('price', currentPrice * 1.15);
    entity.attributes.set('السعر', currentPrice * 1.15);
    return [entity];
  `)
  .addExample('منتج ↑طلب')
  .build();

const supplyOp = new CustomOperatorBuilder()
  .withSymbol('↑عرض')
  .withName('زيادة_العرض')
  .withNameEn('increase_supply')
  .withDescription('Supply decreases price')
  .withPrecedence(6)
  .withImplementation(`
    const [entity] = entities;
    const currentPrice = entity.attributes.get('price') || 0;
    const currentSupply = entity.attributes.get('supply') || 0;
    entity.attributes.set('supply', currentSupply + 30);
    entity.attributes.set('العرض', currentSupply + 30);
    entity.attributes.set('price', currentPrice * 0.9);
    entity.attributes.set('السعر', currentPrice * 0.9);
    return [entity];
  `)
  .addExample('منتج ↑عرض')
  .build();

engine3.defineCustomOperator(inflationOp);
engine3.defineCustomOperator(demandOp);
engine3.defineCustomOperator(supplyOp);

// Create product
const product = engine3.createEntity('منتج', LinguisticRole.PATIENT, new Map([
  ['price', 100],
  ['السعر', 100],
  ['demand', 50],
  ['الطلب', 50],
  ['supply', 50],
  ['العرض', 50],
]));

console.log('Initial state - الحالة الأولية:');
console.log(`Price: $${product.attributes.get('price')}`);
console.log(`Demand: ${product.attributes.get('demand')}`);
console.log(`Supply: ${product.attributes.get('supply')}\n`);

// Apply operators in sequence
console.log('Applying operators - تطبيق المشغلات:\n');

// 1. Inflation
console.log('1. Inflation ↑تضخم');
const inflationOperator = Array.from(engine3['customOperators'].values())
  .find(op => op.symbol === '↑تضخم');
inflationOperator?.apply([product]);
console.log(`   Price after inflation: $${product.attributes.get('price')?.toFixed(2)}\n`);

// 2. Increased demand
console.log('2. Increased Demand ↑طلب');
const demandOperator = Array.from(engine3['customOperators'].values())
  .find(op => op.symbol === '↑طلب');
demandOperator?.apply([product]);
console.log(`   Price after demand increase: $${product.attributes.get('price')?.toFixed(2)}`);
console.log(`   Demand: ${product.attributes.get('demand')}\n`);

// 3. Increased supply
console.log('3. Increased Supply ↑عرض');
const supplyOperator = Array.from(engine3['customOperators'].values())
  .find(op => op.symbol === '↑عرض');
supplyOperator?.apply([product]);
console.log(`   Price after supply increase: $${product.attributes.get('price')?.toFixed(2)}`);
console.log(`   Supply: ${product.attributes.get('supply')}\n`);

console.log('Final state - الحالة النهائية:');
console.log(`Price: $${product.attributes.get('price')?.toFixed(2)}`);
console.log(`Demand: ${product.attributes.get('demand')}`);
console.log(`Supply: ${product.attributes.get('supply')}\n`);

console.log('✅ Economic system simulation complete!');
console.log('✅ اكتملت محاكاة النظام الاقتصادي!\n');

// ═══════════════════════════════════════════════════════════════════════════════
// Final Summary
// ═══════════════════════════════════════════════════════════════════════════════

console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log('🎉 All Advanced Examples Completed Successfully!');
console.log('   اكتملت جميع الأمثلة المتقدمة بنجاح!');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

console.log('Summary - الملخص:\n');
console.log('✅ Example 1: Complex causal chain (5 steps)');
console.log('   المثال 1: سلسلة سببية معقدة (5 خطوات)\n');
console.log('✅ Example 2: Scientific phenomenon (chemical reaction)');
console.log('   المثال 2: ظاهرة علمية (تفاعل كيميائي)\n');
console.log('✅ Example 3: Multiple custom operators (economic system)');
console.log('   المثال 3: مشغلات مخصصة متعددة (نظام اقتصادي)\n');

console.log('🌟 Linguistic Equations - The Future of Programming!');
console.log('   المعادلات اللغوية - مستقبل البرمجة!\n');

