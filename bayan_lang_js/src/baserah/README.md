# بصيرة - Baserah Intelligent System
# النظام الذكي الشامل للغة البيان

**النسخة / Version:** 1.0.0  
**التاريخ / Date:** 2 نوفمبر 2025

---

## 📖 نظرة عامة / Overview

**بصيرة** هو النظام الذكي الشامل للغة البيان، يجمع جميع الأنظمة الذكية في مكان واحد منظم.

**Baserah** is the comprehensive intelligent system for Bayan language, combining all intelligent systems in one organized place.

---

## 🏗️ البنية / Structure

```
src/baserah/
├── core/              # النواة الأساسية / Core
├── linguistics/       # الأنظمة اللغوية / Linguistic Systems
├── equations/         # نظام المعادلات اللغوية / Equations System
├── ai/                # نظام الذكاء الاصطناعي / AI System
├── brain/             # نظام الدماغ / Brain System
├── knowledge/         # نظام المعرفة / Knowledge System
├── learning/          # نظام التعلم / Learning System
├── integration/       # نظام التكامل / Integration System
├── api/               # الواجهة البرمجية الموحدة / Unified API
└── index.ts           # نقطة الدخول الرئيسية / Main Entry Point
```

---

## 📦 الأنظمة الفرعية / Subsystems

### 1. النواة الأساسية / Core (`core/`)

**الوصف / Description:**  
النواة الأساسية تحتوي على المعادلة الأم والمعاملات اللغوية الأساسية.

**المكونات / Components:**
- `motherEquation.ts` - المعادلة الأم (الفكرة = أشياء + حدث + نتيجة)
- `linguisticOperators.ts` - المعاملات اللغوية (Go, Affect, Bond, Transform, etc.)
- `linguisticEquations.ts` - المعادلات اللغوية الأساسية

**الاستخدام / Usage:**
```typescript
import { MotherEquation, LinguisticOperators } from './baserah/core';

const equation = new MotherEquation(staticProps, dynamicStates);
const result = LinguisticOperators.go(actor, target, params);
```

---

### 2. الأنظمة اللغوية / Linguistic Systems (`linguistics/`)

**الوصف / Description:**  
أنظمة التحليل اللغوي ومعاني الحروف.

**المكونات / Components:**
- `letterEngine.ts` - محرك تحليل الحروف والكلمات
- `letterInteractionEngine.ts` - محرك تفاعل الحروف
- `letterMeanings/` - نظام معاني الحروف الكامل

**الاستخدام / Usage:**
```typescript
import { LetterEngine } from './baserah/linguistics';

const engine = new LetterEngine();
const analysis = engine.analyzeWord('حياة');
```

---

### 3. نظام المعادلات اللغوية / Equations System (`equations/`)

**الوصف / Description:**  
نظام شامل للمعادلات اللغوية والمعاملات المخصصة.

**المكونات / Components:**
- `equationEngine.ts` - محرك المعادلات
- `equationGenerator.ts` - مولد المعادلات
- `structureAnalyzer.ts` - محلل البنية
- `linguisticEquationEngine.ts` - محرك المعادلات اللغوية
- `customOperators.ts` - المعاملات المخصصة

**الاستخدام / Usage:**
```typescript
import { EquationEngine, EquationGenerator } from './baserah/equations';

const engine = new EquationEngine();
const equation = engine.createEquation(components);
```

---

### 4. نظام الذكاء الاصطناعي / AI System (`ai/`)

**الوصف / Description:**  
نظام الذكاء الاصطناعي للتحليل والتوليد والفهم العميق.

**المكونات / Components:**
- `textAnalyzer.ts` - محلل النصوص
- `textGenerator.ts` - مولد النصوص
- `deepUnderstandingEngine.ts` - محرك الفهم العميق

**الاستخدام / Usage:**
```typescript
import { TextAnalyzer, TextGenerator } from './baserah/ai';

const analyzer = new TextAnalyzer();
const analysis = analyzer.analyze('النص العربي');

const generator = new TextGenerator();
const text = generator.generate(criteria);
```

---

### 5. نظام الدماغ / Brain System (`brain/`)

**الوصف / Description:**  
نظام الدماغ يجمع بين الخبير والمستكشف.

**المكونات / Components:**
- `expert.ts` - نظام الخبير (يدير المعرفة المكتسبة)
- `explorer.ts` - نظام المستكشف (يكتشف أنماط جديدة)
- `integration.ts` - نظام التكامل
- `theories/` - النظريات الفلسفية والرياضية

**الاستخدام / Usage:**
```typescript
import { Expert, Explorer } from './baserah/brain';

const expert = new Expert();
const decision = expert.decide(situation);

const explorer = new Explorer();
const discovery = explorer.explore(space);
```

---

### 6. نظام المعرفة / Knowledge System (`knowledge/`)

**الوصف / Description:**  
نظام إدارة المعرفة والاستدلال.

**المكونات / Components:**
- `inferenceEngine.ts` - محرك الاستدلال
- `thingEngine.ts` - محرك الأشياء
- `eventEngine.ts` - محرك الأحداث
- `equationEngine.ts` - محرك المعادلات

**الاستخدام / Usage:**
```typescript
import { InferenceEngine, ThingEngine } from './baserah/knowledge';

const inference = new InferenceEngine();
const result = inference.infer(premises);
```

---

### 7. نظام التعلم / Learning System (`learning/`)

**الوصف / Description:**  
نظام التعلم الآلي والتكيفي.

**المكونات / Components:**
- `learningEngine.ts` - محرك التعلم
- `patternRecognition.ts` - التعرف على الأنماط
- `adaptiveLearning.ts` - التعلم التكيفي

**الاستخدام / Usage:**
```typescript
import { LearningEngine } from './baserah/learning';

const learner = new LearningEngine();
learner.learn(examples);
const prediction = learner.predict(input);
```

---

### 8. نظام التكامل / Integration System (`integration/`)

**الوصف / Description:**  
نظام تكامل جميع الأنظمة الفرعية.

**المكونات / Components:**
- `integrationEngine.ts` - محرك التكامل
- `unifiedInferenceEngine.ts` - محرك الاستدلال الموحد
- `linguisticIntegration.ts` - التكامل اللغوي
- `systemsCoordinator.ts` - منسق الأنظمة

**الاستخدام / Usage:**
```typescript
import { IntegrationEngine } from './baserah/integration';

const integration = new IntegrationEngine();
const result = integration.integrate(systems);
```

---

### 9. الواجهة البرمجية الموحدة / Unified API (`api/`)

**الوصف / Description:**  
واجهة برمجية موحدة للوصول إلى جميع أنظمة بصيرة.

**المكونات / Components:**
- `baserahIntegration.ts` - واجهة التكامل الموحدة

**الاستخدام / Usage:**
```typescript
import { BaserahIntegration } from './baserah/api';

const baserah = new BaserahIntegration();
const analysis = baserah.analyzeText('النص');
const generation = baserah.generateText(criteria);
```

---

## 🚀 الاستخدام السريع / Quick Start

### الاستيراد الموحد / Unified Import

```typescript
// استيراد جميع الأنظمة
// Import all systems
import * as Baserah from './baserah';

// استخدام الأنظمة
// Use systems
const letterEngine = new Baserah.Linguistics.LetterEngine();
const textAnalyzer = new Baserah.AI.TextAnalyzer();
```

### الاستيراد المحدد / Specific Import

```typescript
// استيراد أنظمة محددة
// Import specific systems
import { Core, Linguistics, AI } from './baserah';

// استخدام الأنظمة
// Use systems
const equation = new Core.MotherEquation(props, states);
const analysis = new Linguistics.LetterEngine().analyzeWord('كلمة');
const text = new AI.TextGenerator().generate(criteria);
```

---

## 📚 الوثائق / Documentation

لمزيد من التفاصيل، راجع:
- [خطة إعادة التنظيم](../../INTELLIGENT_SYSTEMS_REORGANIZATION_PLAN.md)
- [تقرير الإنجاز](../../INTELLIGENT_SYSTEMS_REORGANIZATION_COMPLETE.md)

For more details, see:
- [Reorganization Plan](../../INTELLIGENT_SYSTEMS_REORGANIZATION_PLAN.md)
- [Completion Report](../../INTELLIGENT_SYSTEMS_REORGANIZATION_COMPLETE.md)

---

## 🧪 الاختبارات / Tests

جميع الأنظمة مختبرة بشكل شامل:
- ✅ 741 اختبار نشط ناجح
- ✅ معدل نجاح 100%
- ✅ تغطية شاملة لجميع الأنظمة

All systems are comprehensively tested:
- ✅ 741 active tests passing
- ✅ 100% success rate
- ✅ Comprehensive coverage of all systems

---

## 🤝 المساهمة / Contributing

للمساهمة في تطوير بصيرة:
1. اتبع البنية الموجودة
2. أضف اختبارات لأي ميزات جديدة
3. حافظ على التعليقات ثنائية اللغة
4. وثق التغييرات بشكل واضح

To contribute to Baserah development:
1. Follow the existing structure
2. Add tests for any new features
3. Maintain bilingual comments
4. Document changes clearly

---

## 📄 الترخيص / License

جزء من مشروع لغة البيان  
Part of Bayan Language Project

**المطور / Developer:** Basel Yahya Abdullah  
**الفريق / Team:** فريق لغة البيان / Bayan Language Team

---

**صُنع بـ ❤️ بواسطة فريق لغة البيان**  
**Made with ❤️ by Bayan Language Team**

