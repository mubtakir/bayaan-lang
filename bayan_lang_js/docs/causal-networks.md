# الشبكات السببية في لغة البيان
# Causal Networks in Bayan Language

## 📋 جدول المحتويات | Table of Contents

1. [المقدمة | Introduction](#المقدمة--introduction)
2. [المفاهيم الأساسية | Core Concepts](#المفاهيم-الأساسية--core-concepts)
3. [أنواع العلاقات | Relation Types](#أنواع-العلاقات--relation-types)
4. [الأمثلة | Examples](#الأمثلة--examples)
5. [الميزات المتقدمة | Advanced Features](#الميزات-المتقدمة--advanced-features)
6. [API Reference](#api-reference)

---

## المقدمة | Introduction

**الشبكات السببية** هي ميزة فريدة في لغة البيان تسمح بتمثيل وتحليل العلاقات السببية بين الأحداث والحالات. هذه الميزة تجعل لغة البيان مثالية لبناء:

**Causal Networks** are a unique feature in Bayan language that allows representing and analyzing causal relationships between events and states. This feature makes Bayan ideal for building:

- 🧠 أنظمة الذكاء الاصطناعي | AI Systems
- 🔍 أنظمة التحليل السببي | Causal Analysis Systems
- 💡 أنظمة العصف الذهني | Brainstorming Systems
- 📊 أنظمة دعم القرار | Decision Support Systems
- 🎯 أنظمة التخطيط الاستراتيجي | Strategic Planning Systems

---

## المفاهيم الأساسية | Core Concepts

### 1. العلاقة السببية | Causal Relation

العلاقة السببية تربط بين **سبب** و**نتيجة** مع **وزن** يمثل قوة العلاقة:

A causal relation connects a **cause** and an **effect** with a **weight** representing the strength:

```bayan
حقيقة يسبب("اعتداء", "غضب", 0.9);
fact causes("assault", "anger", 0.9);
```

- **السبب | Cause**: `"اعتداء"` / `"assault"`
- **النتيجة | Effect**: `"غضب"` / `"anger"`
- **الوزن | Weight**: `0.9` (90% احتمال | 90% probability)

### 2. المسار السببي | Causal Path

المسار السببي هو سلسلة من العلاقات السببية:

A causal path is a chain of causal relations:

```
اعتداء → غضب → تصرف_خاطئ → كوارث → تدمير_البلد
assault → anger → wrong_action → disasters → country_destruction
```

### 3. الوزن الكلي | Total Weight

الوزن الكلي للمسار = ضرب أوزان جميع العلاقات:

Total path weight = product of all relation weights:

```
0.9 × 0.7 × 0.6 × 0.8 = 0.3024 (30.24%)
```

---

## أنواع العلاقات | Relation Types

لغة البيان تدعم 8 أنواع من العلاقات السببية:

Bayan supports 8 types of causal relations:

### 1. يسبب | CAUSES
**X يسبب Y** - X causes Y

```bayan
حقيقة يسبب("اعتداء", "غضب", 0.9);
fact causes("assault", "anger", 0.9);
```

### 2. يمنع | PREVENTS
**X يمنع Y** - X prevents Y

```bayan
حقيقة يمنع("صبر", "غضب", 0.8);
fact prevents("patience", "anger", 0.8);
```

### 3. يعزز | ENHANCES
**X يعزز Y** - X enhances Y

```bayan
حقيقة يعزز("تعليم", "وعي", 0.85);
fact enhances("education", "awareness", 0.85);
```

### 4. يضعف | WEAKENS
**X يضعف Y** - X weakens Y

```bayan
حقيقة يضعف("جهل", "وعي", 0.7);
fact weakens("ignorance", "awareness", 0.7);
```

### 5. يؤدي_إلى | LEADS_TO
**X يؤدي إلى Y** - X leads to Y

```bayan
حقيقة يؤدي_إلى("دراسة", "نجاح", 0.8);
fact leads_to("study", "success", 0.8);
```

### 6. يتطلب | REQUIRES
**X يتطلب Y** - X requires Y

```bayan
حقيقة يتطلب("نجاح", "جهد", 0.9);
fact requires("success", "effort", 0.9);
```

### 7. يمكّن | ENABLES
**X يمكّن Y** - X enables Y

```bayan
حقيقة يمكّن("تعليم", "فرص", 0.85);
fact enables("education", "opportunities", 0.85);
```

### 8. يثبط | INHIBITS
**X يثبط Y** - X inhibits Y

```bayan
حقيقة يثبط("خوف", "إبداع", 0.75);
fact inhibits("fear", "creativity", 0.75);
```

---

## الأمثلة | Examples

### مثال 1: شبكة سببية بسيطة | Simple Causal Network

```bayan
// تعريف العلاقات
حقيقة يسبب("اعتداء", "غضب", 0.9);
حقيقة يسبب("غضب", "تصرف_خاطئ", 0.7);
حقيقة يسبب("تصرف_خاطئ", "كوارث", 0.6);

// Define relations
fact causes("assault", "anger", 0.9);
fact causes("anger", "wrong_action", 0.7);
fact causes("wrong_action", "disasters", 0.6);

// قاعدة: السببية غير المباشرة
قاعدة يسبب_بشكل_غير_مباشر(?س, ?ص, ?وزن) :-
  يسبب(?س, ?ص, ?وزن);

قاعدة يسبب_بشكل_غير_مباشر(?س, ?ص, ?وزن) :-
  يسبب(?س, ?ع, ?وزن1),
  يسبب_بشكل_غير_مباشر(?ع, ?ص, ?وزن2),
  ?وزن هو ?وزن1 * ?وزن2;

// Rule: Indirect causality
rule causes_indirectly(?x, ?y, ?weight) :-
  causes(?x, ?y, ?weight);

rule causes_indirectly(?x, ?y, ?weight) :-
  causes(?x, ?z, ?weight1),
  causes_indirectly(?z, ?y, ?weight2),
  ?weight is ?weight1 * ?weight2;

// استعلام: هل الاعتداء يسبب كوارث؟
دع نتيجة = استعلام يسبب_بشكل_غير_مباشر("اعتداء", "كوارث", ?وزن);
اطبع("الوزن الكلي: " + نتيجة[0].احصل("وزن"));

// Query: Does assault cause disasters?
let result = query causes_indirectly("assault", "disasters", ?weight);
print("Total weight: " + result[0].get("weight"));
```

### مثال 2: شبكة مع علاقات متعددة | Network with Multiple Relations

```bayan
// علاقات السبب
حقيقة يسبب("اعتداء", "غضب", 0.9);
fact causes("assault", "anger", 0.9);

// علاقات المنع
حقيقة يمنع("صبر", "غضب", 0.8);
fact prevents("patience", "anger", 0.8);

// علاقات التعزيز
حقيقة يعزز("تربية_صالحة", "صبر", 0.85);
fact enhances("good_upbringing", "patience", 0.85);

// علاقات الإضعاف
حقيقة يضعف("جهل", "وعي", 0.7);
fact weakens("ignorance", "awareness", 0.7);

// قاعدة: ما يمنع تأثير X
قاعدة يمنع_تأثير(?ع, ?س, ?ص) :-
  يسبب(?س, ?ص, ?),
  يمنع(?ع, ?ص, ?);

// Rule: What prevents the effect of X
rule prevents_effect(?z, ?x, ?y) :-
  causes(?x, ?y, ?),
  prevents(?z, ?y, ?);

// استعلام: ما الذي يمنع تأثير الاعتداء على الغضب؟
دع موانع = اجمع_كل(?مانع, استعلام يمنع_تأثير(?مانع, "اعتداء", "غضب"));
اطبع("الموانع: " + موانع);

// Query: What prevents the effect of assault on anger?
let preventers = findall(?preventer, query prevents_effect(?preventer, "assault", "anger"));
print("Preventers: " + preventers);
```

### مثال 3: تحليل الأسباب الجذرية | Root Cause Analysis

```bayan
// بناء شبكة معقدة
حقيقة يسبب("فقر", "جهل", 0.75);
حقيقة يسبب("جهل", "كوارث", 0.8);
حقيقة يسبب("اعتداء", "غضب", 0.9);
حقيقة يسبب("غضب", "كوارث", 0.7);

// Build complex network
fact causes("poverty", "ignorance", 0.75);
fact causes("ignorance", "disasters", 0.8);
fact causes("assault", "anger", 0.9);
fact causes("anger", "disasters", 0.7);

// قاعدة: السبب الجذري
قاعدة سبب_جذري(?س) :-
  يسبب(?س, ?, ?),
  ليس يسبب(?, ?س, ?);

// Rule: Root cause
rule root_cause(?x) :-
  causes(?x, ?, ?),
  not causes(?, ?x, ?);

// استعلام: ما هي الأسباب الجذرية للكوارث؟
دع أسباب = اجمع_كل(?سبب, استعلام سبب_جذري(?سبب));
اطبع("الأسباب الجذرية: " + أسباب);

// Query: What are the root causes of disasters?
let causes_list = findall(?cause, query root_cause(?cause));
print("Root causes: " + causes_list);
```

---

## الميزات المتقدمة | Advanced Features

### 1. البُعد الزمني | Temporal Dimension

```bayan
// علاقات مع بُعد زمني
حقيقة يسبب("اعتداء", "غضب", 0.9, "فوري");
حقيقة يسبب("غضب", "تصرف_خاطئ", 0.7, "قصير_المدى");
حقيقة يسبب("كوارث", "تدمير_البلد", 0.8, "طويل_المدى");

// Relations with temporal dimension
fact causes("assault", "anger", 0.9, "immediate");
fact causes("anger", "wrong_action", 0.7, "short_term");
fact causes("disasters", "country_destruction", 0.8, "long_term");
```

**الأنواع الزمنية | Temporal Types:**
- `فوري` / `immediate` - يحدث فوراً
- `قصير_المدى` / `short_term` - ساعات/أيام
- `متوسط_المدى` / `medium_term` - أسابيع/أشهر
- `طويل_المدى` / `long_term` - سنوات

### 2. المستويات المتعددة | Multi-Level Impact

```bayan
// علاقات مع مستويات تأثير
حقيقة يسبب("اعتداء", "غضب", 0.9, "فوري", "فردي", "فردي");
حقيقة يسبب("كوارث", "تدمير_البلد", 0.8, "طويل_المدى", "مجتمعي", "وطني");

// Relations with impact levels
fact causes("assault", "anger", 0.9, "immediate", "individual", "individual");
fact causes("disasters", "country_destruction", 0.8, "long_term", "societal", "national");
```

**مستويات التأثير | Impact Levels:**
- `فردي` / `individual` - المستوى الفردي
- `جماعي` / `group` - مستوى المجموعة
- `مجتمعي` / `societal` - المستوى المجتمعي
- `وطني` / `national` - المستوى الوطني
- `عالمي` / `global` - المستوى العالمي

---

## API Reference

### CausalEngine Class

```typescript
class CausalEngine extends LogicEngine {
  // إضافة علاقة سببية
  addRelation(from, to, type, weight, temporal?, fromLevel?, toLevel?): void
  
  // الحصول على العلاقات من عقدة
  getRelationsFrom(node: string): CausalRelation[]
  
  // الحصول على العلاقات إلى عقدة
  getRelationsTo(node: string): CausalRelation[]
  
  // إيجاد جميع المسارات
  findAllPaths(from: string, to: string, maxDepth?: number): CausalPath[]
  
  // إيجاد أقصر مسار
  findShortestPath(from: string, to: string): CausalPath | null
  
  // إيجاد أقوى مسار
  findStrongestPath(from: string, to: string): CausalPath | null
  
  // إيجاد الأسباب الجذرية
  findRootCauses(result: string): string[]
  
  // إيجاد النتائج النهائية
  findFinalResults(cause: string): string[]
  
  // حساب قوة التأثير
  calculateImpactStrength(from: string, to: string): number
}
```

---

## 🎯 حالات الاستخدام | Use Cases

### 1. تحليل المخاطر | Risk Analysis
تحديد المخاطر المحتملة وأسبابها الجذرية

Identify potential risks and their root causes

### 2. التخطيط الاستراتيجي | Strategic Planning
تحليل تأثير القرارات على المدى الطويل

Analyze long-term impact of decisions

### 3. أنظمة الخبرة | Expert Systems
بناء أنظمة خبيرة للتشخيص والتوصيات

Build expert systems for diagnosis and recommendations

### 4. العصف الذهني | Brainstorming
استكشاف العلاقات بين الأفكار

Explore relationships between ideas

### 5. تحليل السيناريوهات | Scenario Analysis
محاكاة "ماذا لو" لفهم العواقب

"What-if" simulation to understand consequences

---

## 🔬 الميزات المتقدمة | Advanced Features

### 1. اكتشاف الحلقات السببية | Cycle Detection

```typescript
// اكتشاف الحلقات في الشبكة
const cycles = engine.detectCycles();

if (cycles.length > 0) {
  console.log('تحذير: وجدت حلقات سببية!');
  console.log('Warning: Causal loops detected!');
}
```

### 2. نقاط التدخل | Intervention Points

```typescript
// إيجاد أفضل نقاط التدخل لكسر السلسلة السببية
const interventionPoints = engine.findInterventionPoints('اعتداء', 'تدمير_البلد');

console.log('أفضل نقاط التدخل:', interventionPoints);
// ['كوارث', 'غضب', 'تصرف_خاطئ']
```

### 3. محاكاة "ماذا لو" | What-If Simulation

```bayan
// ماذا لو أزلنا "الغضب" من الشبكة؟
دع محرك_جديد = محرك.ماذا_لو("غضب");
let new_engine = engine.whatIf("anger");

// هل لا يزال الاعتداء يؤدي إلى تدمير البلد؟
دع مسارات = محرك_جديد.اجد_كل_المسارات("اعتداء", "تدمير_البلد");
let paths = new_engine.findAllPaths("assault", "country_destruction");

اطبع("عدد المسارات بعد التدخل: " + مسارات.طول);
print("Paths after intervention: " + paths.length);
```

### 4. التعلم من البيانات | Learning from Data

```bayan
// تعلم العلاقات السببية من الملاحظات
دع ملاحظات = [
  { "مطر": صحيح, "أرض_مبللة": صحيح, "حادث": صحيح },
  { "مطر": صحيح, "أرض_مبللة": صحيح, "حادث": خطأ },
  { "مطر": صحيح, "أرض_مبللة": صحيح, "حادث": صحيح },
  { "مطر": خطأ, "أرض_مبللة": خطأ, "حادث": خطأ }
];

let observations = [
  { "rain": true, "wet_ground": true, "accident": true },
  { "rain": true, "wet_ground": true, "accident": false },
  { "rain": true, "wet_ground": true, "accident": true },
  { "rain": false, "wet_ground": false, "accident": false }
];

محرك.تعلم_من_البيانات(ملاحظات, 0.7);
engine.learnFromData(observations, 0.7);

// الآن المحرك تعلم أن المطر يسبب أرض مبللة بنسبة 100%
// Now the engine learned that rain causes wet ground with 100% probability
```

### 5. تحليل أهمية العقد | Node Importance Analysis

```typescript
// إيجاد العقد الأكثر تأثيراً
const influential = engine.findMostInfluentialNodes(5);

console.log('العقد الأكثر تأثيراً:', influential);
console.log('Most influential nodes:', influential);
```

### 6. التصدير والتصور | Export and Visualization

```typescript
// تصدير إلى JSON
const json = engine.toJSON();
console.log(JSON.stringify(json, null, 2));

// تصدير إلى DOT (لـ Graphviz)
const dot = engine.toDOT();
// يمكن استخدامه مع Graphviz لإنشاء رسم بياني

// تصدير إلى Mermaid
const mermaid = engine.toMermaid();
// يمكن استخدامه في Markdown أو مواقع الويب
```

### 7. المسافة والقرب | Distance and Proximity

```typescript
// حساب المسافة بين عقدتين
const distance = engine.calculateDistance('اعتداء', 'تدمير_البلد');
console.log(`المسافة: ${distance} خطوات`);

// إيجاد العقد القريبة
const nearby = engine.findNearbyNodes('اعتداء', 2);
console.log('العقد القريبة:', Array.from(nearby.keys()));
```

---

## 🚀 الميزات المكتملة | Completed Features

- ✅ **المرحلة 1**: الأوزان والعلاقات المتعددة
- ✅ **المرحلة 2**: البُعد الزمني والمستويات المتعددة
- ✅ **المرحلة 3**: الميزات المتقدمة
  - ✅ اكتشاف الحلقات السببية
  - ✅ نقاط التدخل
  - ✅ محاكاة "ماذا لو"
  - ✅ التعلم من البيانات
  - ✅ تحليل أهمية العقد
  - ✅ التصدير (JSON, DOT, Mermaid)
  - ✅ المسافة والقرب

---

## 📊 الإحصائيات | Statistics

- **32 اختبار** - جميعها نجحت ✅
- **730+ سطر** من الكود
- **8 أنواع** من العلاقات السببية
- **15+ ميزة** متقدمة
- **3 تنسيقات** للتصدير

---

**لغة البيان - أول لغة برمجة ثنائية اللغة مع شبكات سببية متقدمة!**

**Bayan Language - The first bilingual programming language with advanced causal networks!**

