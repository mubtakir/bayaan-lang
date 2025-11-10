# Linguistic Equations System Guide
# دليل نظام المعادلات اللغوية

## 🌟 Overview - نظرة عامة

The **Linguistic Equations System** is a revolutionary feature of Bayan Language that allows programmers to express causal relationships, define custom operators, and reason about complex phenomena using linguistic roles and equations.

**نظام المعادلات اللغوية** هو ميزة ثورية في لغة البيان تسمح للمبرمجين بالتعبير عن العلاقات السببية، وتعريف مشغلات مخصصة، والتفكير في الظواهر المعقدة باستخدام الأدوار اللغوية والمعادلات.

### Why Linguistic Equations? - لماذا المعادلات اللغوية؟

Traditional programming languages focus on **how** to do things (imperative) or **what** to compute (declarative). Linguistic equations add a new dimension: **why** things happen (causal).

اللغات البرمجية التقليدية تركز على **كيفية** فعل الأشياء (أمرية) أو **ماذا** نحسب (تصريحية). المعادلات اللغوية تضيف بُعداً جديداً: **لماذا** تحدث الأشياء (سببية).

---

## 📚 Core Concepts - المفاهيم الأساسية

### 1. Linguistic Roles - الأدوار اللغوية

Every entity in a linguistic equation has a **role** that defines its function:

كل كيان في المعادلة اللغوية له **دور** يحدد وظيفته:

#### Core Roles - الأدوار الأساسية

| Role | Arabic | Arabic Symbol | English Symbol | Description |
|------|--------|---------------|----------------|-------------|
| Agent | فاعل | فا | AG | The one who performs the action |
| Patient | مفعول | مف | PT | The one affected by the action |
| Action | فعل | فع | AC | The action itself |
| Instrument | أداة | أد | IN | The tool/instrument used |
| Location | مكان | مك | LC | The location |
| Time | زمان | زم | TM | The time |
| Manner | حال | حا | MN | The manner/state |
| Reason | سبب | سب | RS | The reason/cause |
| Result | نتيجة | نت | RE | The result/effect |
| Condition | شرط | شر | CD | The condition |
| Relation | علاقة | عل | RL | The relation |
| Modifier | صفة | صف | MD | The modifier/attribute |
| Possessor | مالك | مل | PS | The possessor/owner |
| Possessed | مملوك | مم | PD | The possessed/owned |

#### Causal Roles - الأدوار السببية

| Role | Arabic | Arabic Symbol | English Symbol | Description |
|------|--------|---------------|----------------|-------------|
| Cause | مسبب | مس | CS | The causer |
| Effect | أثر | أث | EF | The effect |
| Enabler | ممكن | كن | EN | The enabler |
| Preventer | مانع | من | PR | The preventer |
| Catalyst | محفز | مح | CT | The catalyst |
| Inhibitor | معطل | مع | IH | The inhibitor |

### 2. Operators - المشغلات

Operators connect entities and define relationships:

المشغلات تربط الكيانات وتحدد العلاقات:

#### Built-in Operators - المشغلات المدمجة

| Symbol | Arabic | English | Precedence | Description |
|--------|--------|---------|------------|-------------|
| → | يسبب | causes | 10 | A causes B |
| ⊢ | يمكن | enables | 9 | A enables B |
| ⊣ | يمنع | prevents | 9 | A prevents B |
| ⊳ | يحفز | triggers | 8 | A triggers B |
| ⊲ | يعطل | inhibits | 8 | A inhibits B |
| ⇒ | يحول | transforms | 7 | A transforms into B |
| ↑ | يزيد | increases | 6 | A increases B |
| ↓ | ينقص | decreases | 6 | A decreases B |

### 3. Equations - المعادلات

An equation combines entities and operators to express a causal relationship:

المعادلة تجمع الكيانات والمشغلات للتعبير عن علاقة سببية:

```
Entity1 (Role1) + Operator + Entity2 (Role2) → Result
```

---

## 🚀 Getting Started - البدء

### Installation - التثبيت

```typescript
import {
  LinguisticEquationEngine,
  LinguisticRole,
  CustomOperatorBuilder,
  PredefinedCustomOperators,
} from './src/linguistic-equations';
```

### Basic Example - مثال أساسي

```typescript
// Create engine - إنشاء المحرك
const engine = new LinguisticEquationEngine();

// Create entities - إنشاء الكيانات
const fire = engine.createEntity('نار', LinguisticRole.CAUSE);
const heat = engine.createEntity('حرارة', LinguisticRole.EFFECT);

// Create equation - إنشاء المعادلة
const equation = engine.createEquation(
  'Fire causes heat',
  'النار تسبب الحرارة',
  [fire, heat],
  [] // operators will be applied automatically
);

// Execute - تنفيذ
const event = engine.executeEquation(equation);
console.log(`Event created: ${event.id}`);
```

---

## 💡 Examples - أمثلة

### Example 1: Social Interaction - مثال 1: التفاعل الاجتماعي

**Scenario:** Ahmed attacks Khalid, increasing his aggression, then Khalid hits back.

**السيناريو:** أحمد يعتدي على خالد، فتزداد وحشيته، ثم خالد يضرب أحمد.

```typescript
// Create entities
const ahmed = engine.createEntity('أحمد', LinguisticRole.AGENT, new Map([
  ['وحشية', 50],
  ['aggression', 50],
]));

const khalid = engine.createEntity('خالد', LinguisticRole.PATIENT);
const attackAction = engine.createEntity('اعتدى', LinguisticRole.ACTION);

// Register aggression increase operator
const aggressionOp = PredefinedCustomOperators.aggressionIncrease();
engine.defineCustomOperator(aggressionOp);

// Create equation
const equation = engine.createEquation(
  'Attack and Response',
  'أحمد اعتدى على خالد ↑وحشية أحمد',
  [ahmed, attackAction, khalid],
  []
);

// Execute
const event = engine.executeEquation(equation);

console.log(`Ahmed's aggression: ${ahmed.attributes.get('وحشية')}`); // 70
```

### Example 2: Result Cancellation - مثال 2: تعطيل النتيجة

**Scenario:** Khalid's patience prevents him from hitting Ahmed.

**السيناريو:** صبر خالد يمنعه من ضرب أحمد.

```typescript
// Create entities
const khalid = engine.createEntity('خالد', LinguisticRole.AGENT, new Map([
  ['صبر', 80],
  ['patience', 80],
]));

const hitAction = engine.createEntity('ضرب', LinguisticRole.ACTION);

// Register patience operator
const patienceOp = PredefinedCustomOperators.patience();
engine.defineCustomOperator(patienceOp);

// Create equation with condition
const equation = engine.createEquation(
  'Patience prevents action',
  'خالد صبر⊲ (خالد ضرب أحمد)',
  [khalid, hitAction],
  [],
  [
    {
      id: 'patience_check',
      type: ConditionType.ATTRIBUTE,
      expression: 'khalid.patience >= 70',
      evaluate: (context) => {
        const k = Array.from(context.entities.values())
          .find(e => e.name === 'خالد');
        return k ? (k.attributes.get('صبر') || 0) >= 70 : false;
      },
    },
  ]
);

// Execute
const event = engine.executeEquation(equation);

console.log(`Action cancelled: ${event.cancelled}`); // true
console.log(`Reason: ${event.reason}`); // Condition not met
```

### Example 3: Scientific Causation - مثال 3: السببية العلمية

**Scenario:** Oxygen enables combustion.

**السيناريو:** الأكسجين يمكّن الاحتراق.

```typescript
// Create entities
const oxygen = engine.createEntity('أكسجين', LinguisticRole.CAUSE, new Map([
  ['present', true],
  ['concentration', 21],
]));

const combustion = engine.createEntity('احتراق', LinguisticRole.EFFECT);

// Register scientific causation operator
const scientificOp = PredefinedCustomOperators.scientificCausation();
engine.defineCustomOperator(scientificOp);

// Create equation
const equation = engine.createEquation(
  'Oxygen enables combustion',
  'الأكسجين ⊢علمي الاحتراق',
  [oxygen, combustion],
  []
);

// Execute
const event = engine.executeEquation(equation);

console.log(`Relations created: ${oxygen.state.relations.length}`);
```

### Example 4: Custom Operator - مثال 4: مشغل مخصص

**Scenario:** Define a custom "doubles" operator.

**السيناريو:** تعريف مشغل "يضاعف" مخصص.

```typescript
// Define custom operator
const doublesOp = new CustomOperatorBuilder()
  .withSymbol('×2')
  .withName('يضاعف')
  .withNameEn('doubles')
  .withDescription('Doubles numeric attributes')
  .withPrecedence(6)
  .withAssociativity('left')
  .withInputRoles(LinguisticRole.AGENT)
  .withOutputRoles(LinguisticRole.AGENT)
  .withImplementation(`
    const [entity] = entities;
    entity.attributes.forEach((value, key) => {
      if (typeof value === 'number') {
        entity.attributes.set(key, value * 2);
      }
    });
    return [entity];
  `)
  .addExample('القوة ×2 السرعة')
  .build();

// Register operator
engine.defineCustomOperator(doublesOp);

// Create entity
const athlete = engine.createEntity('رياضي', LinguisticRole.AGENT, new Map([
  ['قوة', 50],
  ['سرعة', 30],
]));

// Apply operator
const customOp = Array.from(engine['customOperators'].values())
  .find(op => op.symbol === '×2');
customOp?.apply([athlete]);

console.log(`Strength: ${athlete.attributes.get('قوة')}`); // 100
console.log(`Speed: ${athlete.attributes.get('سرعة')}`); // 60
```

---

## 🎯 Use Cases - حالات الاستخدام

### 1. Modeling Human Behavior - نمذجة السلوك البشري

```typescript
// Anger increases aggression
const anger = engine.createEntity('غضب', LinguisticRole.CAUSE);
const aggression = engine.createEntity('عدوانية', LinguisticRole.EFFECT);

// anger → aggression
```

### 2. Scientific Simulations - المحاكاة العلمية

```typescript
// Temperature increases pressure
const temperature = engine.createEntity('حرارة', LinguisticRole.CAUSE);
const pressure = engine.createEntity('ضغط', LinguisticRole.EFFECT);

// temperature ↑ pressure
```

### 3. Business Logic - منطق الأعمال

```typescript
// Discount decreases price
const discount = engine.createEntity('خصم', LinguisticRole.CAUSE);
const price = engine.createEntity('سعر', LinguisticRole.EFFECT);

// discount ↓ price
```

### 4. Game Development - تطوير الألعاب

```typescript
// Potion increases health
const potion = engine.createEntity('جرعة', LinguisticRole.INSTRUMENT);
const health = engine.createEntity('صحة', LinguisticRole.EFFECT);

// potion ↑ health
```

---

## 📖 API Reference - مرجع API

### LinguisticEquationEngine

#### Methods - الطرق

- `createEntity(name, role, attributes?)` - Create an entity
- `createEquation(name, description, inputs, operators, conditions?)` - Create an equation
- `executeEquation(equation)` - Execute an equation
- `registerOperator(operator)` - Register a custom operator
- `defineCustomOperator(definition)` - Define a custom operator from definition
- `cancelEffect(effectId, reason, condition)` - Cancel an effect
- `getContext()` - Get the current context
- `getEntity(id)` - Get an entity by ID
- `getEquation(id)` - Get an equation by ID

### CustomOperatorBuilder

#### Methods - الطرق

- `withSymbol(symbol)` - Set operator symbol
- `withName(name)` - Set Arabic name
- `withNameEn(nameEn)` - Set English name
- `withDescription(description)` - Set description
- `withPrecedence(precedence)` - Set precedence
- `withAssociativity(associativity)` - Set associativity
- `withInputRoles(...roles)` - Set input roles
- `withOutputRoles(...roles)` - Set output roles
- `withImplementation(implementation)` - Set implementation
- `addExample(example)` - Add example
- `build()` - Build the operator definition

---

## 🌟 Best Practices - أفضل الممارسات

1. **Use meaningful role names** - استخدم أسماء أدوار ذات معنى
2. **Define clear conditions** - حدد شروطاً واضحة
3. **Document custom operators** - وثّق المشغلات المخصصة
4. **Test equations thoroughly** - اختبر المعادلات بدقة
5. **Use bilingual names** - استخدم أسماء ثنائية اللغة

---

## 🚀 Future Enhancements - التحسينات المستقبلية

- [ ] Visual equation editor - محرر معادلات مرئي
- [ ] Equation validation - التحقق من صحة المعادلات
- [ ] Equation optimization - تحسين المعادلات
- [ ] Equation debugging - تصحيح أخطاء المعادلات
- [ ] Equation library - مكتبة معادلات

---

<div align="center">

## 🎉 Linguistic Equations - The Future of Programming!
## 🎉 المعادلات اللغوية - مستقبل البرمجة!

**Express causality, not just computation!**

**عبّر عن السببية، ليس فقط الحساب!**

</div>

