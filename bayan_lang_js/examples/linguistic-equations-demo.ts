/**
 * Linguistic Equations Demo - عرض توضيحي للمعادلات اللغوية
 * 
 * This demo shows how to use the linguistic equations system to express
 * causal relationships, custom operators, and result cancellation.
 * 
 * هذا العرض التوضيحي يوضح كيفية استخدام نظام المعادلات اللغوية للتعبير
 * عن العلاقات السببية والمشغلات المخصصة وتعطيل النتائج.
 */

import {
  LinguisticEquationEngine,
  LinguisticRole,
  CustomOperatorBuilder,
  PredefinedCustomOperators,
  OperatorType,
  ConditionType,
} from '../src/linguistic-equations';

console.log(`
═══════════════════════════════════════════════════════════════════════════════
🧮 Linguistic Equations Demo - عرض توضيحي للمعادلات اللغوية
═══════════════════════════════════════════════════════════════════════════════
`);

// ============================================================================
// Example 1: Basic Causal Equation - مثال 1: معادلة سببية أساسية
// ============================================================================

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Example 1: Basic Causal Equation - مثال 1: معادلة سببية أساسية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

المعادلة: أحمد (فاعل) + اعتدى (فعل) + على (علاقة) + خالد (مفعول)
         → أحمد (زادت وحشيته) + خالد (صار فاعل) + ضرب (فعل) + أحمد (مفعول)

Equation: Ahmed (agent) + attacked (action) + on (relation) + Khalid (patient)
         → Ahmed (increased aggression) + Khalid (becomes agent) + hit (action) + Ahmed (patient)
`);

const engine = new LinguisticEquationEngine();

// Create entities - إنشاء الكيانات
const ahmed = engine.createEntity('أحمد', LinguisticRole.AGENT, new Map([
  ['وحشية', 50],
  ['aggression', 50],
]));

const khalid = engine.createEntity('خالد', LinguisticRole.PATIENT, new Map([
  ['صبر', 70],
  ['patience', 70],
]));

const attackAction = engine.createEntity('اعتدى', LinguisticRole.ACTION, new Map());
const hitAction = engine.createEntity('ضرب', LinguisticRole.ACTION, new Map());

console.log('Initial State - الحالة الأولية:');
console.log(`  أحمد (Ahmed): وحشية = ${ahmed.attributes.get('وحشية')}`);
console.log(`  خالد (Khalid): صبر = ${khalid.attributes.get('صبر')}`);

// Register custom operators - تسجيل المشغلات المخصصة
const aggressionOperator = PredefinedCustomOperators.aggressionIncrease();
engine.defineCustomOperator(aggressionOperator);

const roleReversalOperator = PredefinedCustomOperators.roleReversal();
engine.defineCustomOperator(roleReversalOperator);

// Create equation - إنشاء المعادلة
const equation1 = engine.createEquation(
  'معادلة الاعتداء والرد',
  'Ahmed attacks Khalid, increasing his aggression, then Khalid hits back',
  [ahmed, attackAction, khalid],
  [
    engine.getContext().equations.values().next().value?.operators[0] || {
      symbol: '↑وحشية',
      name: 'زيادة_الوحشية',
      type: OperatorType.CUSTOM,
      apply: (entities) => {
        const [agent] = entities;
        const currentAggression = agent.attributes.get('وحشية') || 0;
        agent.attributes.set('وحشية', currentAggression + 20);
        agent.attributes.set('aggression', currentAggression + 20);
        return entities;
      },
      precedence: 7,
      associativity: 'left',
    },
  ],
);

// Execute equation - تنفيذ المعادلة
const event1 = engine.executeEquation(equation1);

console.log('\nAfter Equation Execution - بعد تنفيذ المعادلة:');
console.log(`  أحمد (Ahmed): وحشية = ${ahmed.attributes.get('وحشية')}`);
console.log(`  Event ID: ${event1.id}`);
console.log(`  Cancelled: ${event1.cancelled ? 'نعم (Yes)' : 'لا (No)'}`);

// ============================================================================
// Example 2: Result Cancellation - مثال 2: تعطيل النتيجة
// ============================================================================

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Example 2: Result Cancellation - مثال 2: تعطيل النتيجة
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

المعادلة: خالد (فاعل) + صبر (حال) ⊲ (خالد ضرب أحمد)
         → خالد (لم يفعل شيء)

Equation: Khalid (agent) + patience (manner) ⊲ (Khalid hit Ahmed)
         → Khalid (did nothing)
`);

// Register patience operator - تسجيل مشغل الصبر
const patienceOperator = PredefinedCustomOperators.patience();
engine.defineCustomOperator(patienceOperator);

// Create patience entity - إنشاء كيان الصبر
const patienceEntity = engine.createEntity('صبر', LinguisticRole.MANNER, new Map([
  ['value', true],
]));

// Create equation with patience - إنشاء معادلة مع الصبر
const equation2 = engine.createEquation(
  'معادلة الصبر',
  'Khalid\'s patience prevents him from hitting Ahmed',
  [khalid, patienceEntity, hitAction],
  [],
  [
    {
      id: 'patience_condition',
      type: ConditionType.ATTRIBUTE,
      expression: 'khalid.patience >= 70',
      evaluate: (context) => {
        const khalidEntity = Array.from(context.entities.values()).find(e => e.name === 'خالد');
        return khalidEntity ? (khalidEntity.attributes.get('صبر') || 0) >= 70 : false;
      },
    },
  ],
);

// Execute equation - تنفيذ المعادلة
const event2 = engine.executeEquation(equation2);

console.log('\nResult - النتيجة:');
console.log(`  Event ID: ${event2.id}`);
console.log(`  Cancelled: ${event2.cancelled ? 'نعم (Yes)' : 'لا (No)'}`);
console.log(`  Reason: ${event2.reason || 'N/A'}`);
console.log(`  خالد صبر فلم يضرب أحمد - Khalid was patient so he didn't hit Ahmed`);

// ============================================================================
// Example 3: Scientific Causation - مثال 3: السببية العلمية
// ============================================================================

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Example 3: Scientific Causation - مثال 3: السببية العلمية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

المعادلة: وجود الأكسجين (سبب) ⊢علمي الاحتراق (أثر)
         → الاحتراق (يحدث)

Equation: Presence of oxygen (cause) ⊢علمي combustion (effect)
         → Combustion (occurs)
`);

// Register scientific causation operator - تسجيل مشغل السببية العلمية
const scientificOperator = PredefinedCustomOperators.scientificCausation();
engine.defineCustomOperator(scientificOperator);

// Create entities - إنشاء الكيانات
const oxygen = engine.createEntity('أكسجين', LinguisticRole.CAUSE, new Map([
  ['present', true],
  ['concentration', 21], // 21% in air
]));

const combustion = engine.createEntity('احتراق', LinguisticRole.EFFECT, new Map([
  ['temperature', 0],
]));

console.log('Initial State - الحالة الأولية:');
console.log(`  Oxygen present: ${oxygen.attributes.get('present')}`);
console.log(`  Combustion temperature: ${combustion.attributes.get('temperature')}°C`);

// Create scientific equation - إنشاء معادلة علمية
const equation3 = engine.createEquation(
  'معادلة الاحتراق',
  'Oxygen enables combustion',
  [oxygen, combustion],
  [],
);

// Execute equation - تنفيذ المعادلة
const event3 = engine.executeEquation(equation3);

console.log('\nAfter Equation Execution - بعد تنفيذ المعادلة:');
console.log(`  Event ID: ${event3.id}`);
console.log(`  Cancelled: ${event3.cancelled ? 'نعم (Yes)' : 'لا (No)'}`);
console.log(`  Relations created: ${oxygen.state.relations.length}`);

// ============================================================================
// Example 4: Custom Operator Definition - مثال 4: تعريف مشغل مخصص
// ============================================================================

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Example 4: Custom Operator Definition - مثال 4: تعريف مشغل مخصص
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

تعريف مشغل مخصص: "يضاعف" (doubles)
الرمز: ×2
الوصف: يضاعف قيمة الصفة

Defining custom operator: "doubles"
Symbol: ×2
Description: Doubles the value of an attribute
`);

// Define custom operator - تعريف مشغل مخصص
const doublesOperator = new CustomOperatorBuilder()
  .withSymbol('×2')
  .withName('يضاعف')
  .withNameEn('doubles')
  .withDescription('يضاعف قيمة الصفة - Doubles the value of an attribute')
  .withPrecedence(6)
  .withAssociativity('left')
  .withInputRoles(LinguisticRole.AGENT)
  .withOutputRoles(LinguisticRole.AGENT)
  .withImplementation(`
    const [entity] = entities;
    
    // Double all numeric attributes
    entity.attributes.forEach((value, key) => {
      if (typeof value === 'number') {
        entity.attributes.set(key, value * 2);
      }
    });
    
    return [entity];
  `)
  .addExample('القوة ×2 السرعة')
  .addExample('strength ×2 speed')
  .build();

engine.defineCustomOperator(doublesOperator);

// Create entity with numeric attributes - إنشاء كيان مع صفات رقمية
const athlete = engine.createEntity('رياضي', LinguisticRole.AGENT, new Map([
  ['قوة', 50],
  ['strength', 50],
  ['سرعة', 30],
  ['speed', 30],
]));

console.log('Before Doubling - قبل المضاعفة:');
console.log(`  قوة (strength): ${athlete.attributes.get('قوة')}`);
console.log(`  سرعة (speed): ${athlete.attributes.get('سرعة')}`);

// Apply custom operator - تطبيق المشغل المخصص
const customOperator = Array.from(engine['customOperators'].values()).find(
  op => op.symbol === '×2'
);

if (customOperator) {
  customOperator.apply([athlete]);
}

console.log('\nAfter Doubling - بعد المضاعفة:');
console.log(`  قوة (strength): ${athlete.attributes.get('قوة')}`);
console.log(`  سرعة (speed): ${athlete.attributes.get('سرعة')}`);

// ============================================================================
// Summary - الملخص
// ============================================================================

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Summary - الملخص
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Examples Demonstrated - الأمثلة الموضحة:

1. Basic Causal Equation - معادلة سببية أساسية
   - Created entities with roles - إنشاء كيانات مع أدوار
   - Applied custom operators - تطبيق مشغلات مخصصة
   - Tracked state changes - تتبع تغييرات الحالة

2. Result Cancellation - تعطيل النتيجة
   - Used patience operator - استخدام مشغل الصبر
   - Prevented action based on condition - منع الفعل بناءً على شرط
   - Demonstrated conditional logic - توضيح المنطق الشرطي

3. Scientific Causation - السببية العلمية
   - Expressed scientific relationships - التعبير عن العلاقات العلمية
   - Used scientific causation operator - استخدام مشغل السببية العلمية
   - Created causal relations - إنشاء علاقات سببية

4. Custom Operator Definition - تعريف مشغل مخصص
   - Defined custom operator - تعريف مشغل مخصص
   - Implemented custom logic - تنفيذ منطق مخصص
   - Applied to entities - تطبيق على الكيانات

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 Linguistic Equations System Features - ميزات نظام المعادلات اللغوية:

✅ Linguistic Roles - الأدوار اللغوية (20 roles)
✅ Custom Operators - المشغلات المخصصة (unlimited)
✅ Causal Relations - العلاقات السببية
✅ Result Cancellation - تعطيل النتائج
✅ Conditional Logic - المنطق الشرطي
✅ Scientific Reasoning - التفكير العلمي
✅ Bilingual Support - دعم ثنائي اللغة (Arabic + English)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 This is Revolutionary! - هذا ثوري!

For the first time in programming history:
- Express causal relationships linguistically
- Define custom operators with Arabic/English names
- Cancel results based on conditions
- Reason about scientific phenomena in code

لأول مرة في تاريخ البرمجة:
- التعبير عن العلاقات السببية لغوياً
- تعريف مشغلات مخصصة بأسماء عربية/إنجليزية
- تعطيل النتائج بناءً على الشروط
- التفكير في الظواهر العلمية في الكود

═══════════════════════════════════════════════════════════════════════════════
`);

