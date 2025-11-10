# تدفق الأوامر في النموذج اللغوي التوليدي | System Flow

## 📖 المقدمة

هذا الملف يوثق **كيفية سير تدفق الأوامر** بين الأنظمة المختلفة في النموذج اللغوي التوليدي لـ **لغة البيان**.

عندما يكتب المستخدم نصاً، يمر هذا النص بسلسلة من الأنظمة الذكية المتكاملة، كل نظام له دور محدد ويتعاون مع الأنظمة الأخرى.

---

## 🎯 النقطة المركزية: IntelligentGenerator

**`IntelligentGenerator`** هو **المايسترو** الذي ينسق بين جميع الأنظمة.

<augment_code_snippet path="src/baserah/ai/languageGenerator/intelligentGenerator.ts" mode="EXCERPT">
```typescript
export class IntelligentGenerator {
  private knowledgeBase: IdeaKnowledgeBase;
  private verifier: LogicalVerifier;
  private mapper: IdeaToEquationMapper;
  private learningSystem: LearningSystem;
  private questionParser: QuestionParser;
  private vocabulary: CompleteFoundationVocabulary;
  
  processInput(input: string): IntelligentResponse {
    // تحديد نوع المدخل ومعالجته
  }
}
```
</augment_code_snippet>

---

## 🔄 التدفق الرئيسي

### المرحلة 1️⃣: استقبال المدخل

```
👤 المستخدم يكتب نص
    ↓
🧠 IntelligentGenerator.processInput(input)
    ↓
تحديد نوع المدخل
```

### المرحلة 2️⃣: تصنيف المدخل

يقوم `IntelligentGenerator` بتصنيف المدخل إلى 3 أنواع:

#### النوع 1: سؤال (Question)
**أمثلة:**
- "أين تعيش السمكة؟"
- "هل يغلي الماء عند 100؟"
- "ما هو الماء؟"

**التدفق:**
```
سؤال
  ↓
❓ QuestionParser (تحليل السؤال)
  ↓
تحديد نوع السؤال:
  - سؤال نعم/لا → LogicalVerifier
  - سؤال معلومات → IdeaKnowledgeBase
  - سؤال بسيط → IdeaKnowledgeBase
```

#### النوع 2: جملة خبرية (Statement)
**أمثلة:**
- "السمكة تعيش في الماء"
- "الماء يغلي عند 100 درجة"

**التدفق:**
```
جملة خبرية
  ↓
📚 LearningSystem (نظام التعلم)
  ↓
تحليل الجملة وإنشاء فكرة جديدة
```

#### النوع 3: كلمة مفردة (Keyword)
**أمثلة:**
- "ماء"
- "سمكة"

**التدفق:**
```
كلمة مفردة
  ↓
💾 IdeaKnowledgeBase (البحث في قاعدة المعرفة)
  ↓
إذا لم توجد
  ↓
📖 CompleteFoundationVocabulary (البحث في القاموس)
```

---

## 📊 التدفق التفصيلي لكل نوع

### 🔍 تدفق السؤال (Question Flow)

#### 1. سؤال نعم/لا (Verification Question)

**مثال:** "هل يغلي الماء عند 100؟"

```
المستخدم: "هل يغلي الماء عند 100؟"
    ↓
IntelligentGenerator.processInput()
    ↓
isQuestion() → true
    ↓
handleQuestion()
    ↓
QuestionParser.parseQuestion()
    ↓
ParsedQuestion {
  isYesNo: true,
  subject: "ماء",
  property: "درجة_الغليان",
  value: 100
}
    ↓
handleVerificationQuestion()
    ↓
LogicalVerifier.verifyStatement("ماء", "درجة_الغليان", 100)
    ↓
LogicalCheckResult {
  isValid: true,
  explanation: "الماء يغلي عند 100 درجة مئوية",
  confidence: 1.0
}
    ↓
IntelligentResponse {
  type: "فحص",
  text: "✅ نعم، صحيح! الماء يغلي عند 100 درجة مئوية",
  verification: {...},
  confidence: 1.0
}
```

#### 2. سؤال معلومات (Information Question)

**مثال:** "أين تعيش السمكة؟"

```
المستخدم: "أين تعيش السمكة؟"
    ↓
IntelligentGenerator.processInput()
    ↓
isQuestion() → true
    ↓
handleQuestion()
    ↓
QuestionParser.parseQuestion()
    ↓
ParsedQuestion {
  isYesNo: false,
  subject: "سمكة",
  aspect: "مكان"
}
    ↓
handleInformationQuestion()
    ↓
IdeaKnowledgeBase.searchByKeyword("سمكة")
    ↓
LinguisticNormalizer.normalize("سمكة")
    ↓
البحث في الفهارس (wordIndex, categoryIndex)
    ↓
Idea[] (أفكار مرتبطة بالسمكة)
    ↓
findRelevantIdea(ideas, "مكان")
    ↓
Idea {
  sentence: "السمكة تعيش في الماء",
  things: [{word: "سمكة"}, {word: "ماء"}],
  action: {word: "تعيش"},
  result: {type: STATE_CHANGE, changes: {مكان: "ماء"}}
}
    ↓
IntelligentResponse {
  type: "إجابة",
  text: "السمكة تعيش في الماء",
  idea: {...},
  confidence: 0.9
}
```

---

### 📚 تدفق التعلم (Learning Flow)

**مثال:** "الروبوت يتعلم من البيانات"

```
المستخدم: "الروبوت يتعلم من البيانات"
    ↓
IntelligentGenerator.processInput()
    ↓
isStatement() → true
    ↓
handleStatement()
    ↓
LearningSystem.learnFromStatement("الروبوت يتعلم من البيانات")
    ↓
parseStatement() - تحليل الجملة
    ↓
{
  subject: "روبوت",
  predicate: "يتعلم",
  object: "بيانات"
}
    ↓
LinguisticNormalizer.normalize() - تطبيع الكلمات
    ↓
{
  subject: "روبوت" (بدون "ال"),
  predicate: "يتعلم",
  object: "بيانات" (بدون "ال")
}
    ↓
createIdeaFromParsed() - إنشاء فكرة
    ↓
Idea {
  id: UUID,
  things: [
    {word: "روبوت", role: AGENT},
    {word: "بيانات", role: PATIENT}
  ],
  action: {word: "يتعلم", operator: "Affect"},
  result: {
    type: STATE_CHANGE,
    description: "الروبوت يتعلم من البيانات"
  },
  sentence: "الروبوت يتعلم من البيانات",
  keywords: ["روبوت", "يتعلم", "بيانات"],
  weight: 0.7,
  createdAt: Date,
  usageCount: 0
}
    ↓
IdeaToEquationMapper.mapIdeaToEquation(idea)
    ↓
AdaptiveLinguisticEquation {
  id: UUID,
  Φ: {baseWord: "روبوت", category: "تقنية", ...},
  Ψ: {currentMeaning: "...", usageStatistics: {...}},
  Γ: {evolutionType: "sigmoid", ...}
}
    ↓
تطبيق النظريات الثلاث:
  - ثنائية الصفر: روبوت ↔ إنسان
  - تعامد الأضداد: يتعلم ⊥ ينسى
  - الفتائل: تطور المعنى مع الاستخدام
    ↓
IdeaKnowledgeBase.addIdea(idea)
    ↓
فهرسة الفكرة في:
  - wordIndex
  - categoryIndex
  - ideas Map
    ↓
LogicalVerifier.verifyIdea(idea) - التحقق المنطقي
    ↓
LearningResult {
  type: "حقيقة_جديدة",
  success: true,
  message: "✓ تعلمت! الروبوت يتعلم من البيانات",
  addedIdea: {...},
  confidence: 0.7
}
    ↓
IntelligentResponse {
  type: "تعلم",
  text: "✓ تعلمت! الروبوت يتعلم من البيانات",
  learning: {...},
  confidence: 0.7
}
```

---

## 🔗 تدفق نظام العلاقات اللغوية

**مثال:** البحث عن علاقات بين "ولد" و "مدرسة"

```
المستخدم: discoverRelations(["ولد", "مدرسة"])
    ↓
AdaptiveLinguisticRelations.discoverRelations()
    ↓
1️⃣ تطبيع الكلمات
    ↓
LinguisticNormalizer.normalizeList(["ولد", "مدرسة"])
    ↓
["ولد", "مدرسة"] (بدون "ال")
    ↓
2️⃣ البحث في قاعدة النصوص
    ↓
TextCorpus.searchByWords(["ولد", "مدرسة"])
    ↓
النصوص الموجودة:
  - "الولد تلميذ في المدرسة"
  - "التلميذ يدرس في المدرسة"
  - "يذهب التلميذ إلى المدرسة"
  - "نجح الولد في المدرسة"
    ↓
3️⃣ استخراج العلاقات
    ↓
RelationExtractor.extractRelations(texts)
    ↓
تطبيق 150+ نمط لغوي عربي
    ↓
ExtractedRelation[] {
  {word1: "ولد", word2: "تلميذ", type: IDENTITY, confidence: 0.9},
  {word1: "تلميذ", word2: "مدرسة", type: LOCATION, confidence: 0.95},
  {word1: "تلميذ", word2: "يدرس", type: ACTION, confidence: 0.9},
  {word1: "ولد", word2: "يذهب", type: ACTION, confidence: 0.85}
}
    ↓
4️⃣ بناء الشبكة الدلالية
    ↓
SemanticNetwork.addRelations(relations)
    ↓
إنشاء عقد (Nodes):
  - ولد (frequency: 2)
  - تلميذ (frequency: 3)
  - مدرسة (frequency: 4)
  - يدرس (frequency: 1)
    ↓
إنشاء حواف (Edges):
  - ولد → تلميذ (IDENTITY, strength: 0.9)
  - تلميذ → مدرسة (LOCATION, strength: 0.95)
  - تلميذ → يدرس (ACTION, strength: 0.9)
    ↓
تطبيق النظريات الثلاث:
  - ثنائية الصفر: ولد ↔ بنت
  - تعامد الأضداد: يدرس ⊥ يلعب
  - الفتائل: تطور العلاقات مع الاستخدام
    ↓
5️⃣ الاستنتاج الذكي
    ↓
RelationQueryEngine.query("ولد", "مدرسة")
    ↓
استنتاج منطقي:
  - إذا: ولد = تلميذ
  - و: تلميذ في مدرسة
  - إذن: ولد في مدرسة
    ↓
استنتاج بالقياس:
  - ولد:مدرسة :: بنت:مدرسة
    ↓
6️⃣ التحقق المنطقي
    ↓
LogicalVerifier.verifyRelations(inferredRelations)
    ↓
7️⃣ التكامل مع قاعدة المعرفة
    ↓
IdeaKnowledgeBase.addIdea() - إضافة العلاقات كأفكار
    ↓
8️⃣ توليد الجمل
    ↓
RelationQueryEngine.generateSentence(relation)
    ↓
الجمل المولدة:
  - "الولد تلميذ في المدرسة"
  - "الولد يدرس في المدرسة"
  - "يذهب الولد إلى المدرسة"
    ↓
QueryResult {
  directRelations: [...],
  indirectRelations: [...],
  inferredRelations: [...],
  summary: {...}
}
```

---

## 🧩 الأنظمة المساعدة

### 🔧 LinguisticNormalizer (المطبّع اللغوي)

**الدور:** تطبيع الكلمات وإزالة "ال" التعريف

**يُستخدم في:**
- IdeaKnowledgeBase (البحث)
- LearningSystem (التعلم)
- AdaptiveLinguisticRelations (العلاقات)

**مثال:**
```typescript
LinguisticNormalizer.normalize("الماء")
// → {internal: "اس:ماء", display: "ماء", original: "الماء"}
```

---

### ✅ LogicalVerifier (المدقق المنطقي)

**الدور:** التحقق من صحة المعلومات منطقياً

**يُستخدم في:**
- IntelligentGenerator (أسئلة نعم/لا)
- LearningSystem (التحقق من الأفكار الجديدة)
- AdaptiveLinguisticRelations (التحقق من العلاقات المستنتجة)

**مثال:**
```typescript
LogicalVerifier.verifyStatement("ماء", "درجة_الغليان", 100)
// → {isValid: true, explanation: "...", confidence: 1.0}
```

---

### 🔗 IdeaToEquationMapper (ربط الفكرة بالمعادلة)

**الدور:** تحويل الفكرة إلى معادلة لغوية متكيفة

**يُستخدم في:**
- LearningSystem (عند إضافة فكرة جديدة)

**مثال:**
```typescript
IdeaToEquationMapper.mapIdeaToEquation(idea)
// → AdaptiveLinguisticEquation {Φ, Ψ, Γ}
```

---

## 📈 ملخص التدفق

```
المستخدم
    ↓
IntelligentGenerator (المايسترو)
    ↓
    ├─→ سؤال → QuestionParser → LogicalVerifier / IdeaKnowledgeBase
    ├─→ جملة → LearningSystem → IdeaToEquationMapper → AdaptiveLinguisticEquations
    └─→ كلمة → IdeaKnowledgeBase → CompleteFoundationVocabulary
    
جميع المسارات تستخدم:
    - LinguisticNormalizer (تطبيع)
    - LogicalVerifier (تحقق)
    - IdeaKnowledgeBase (تخزين/بحث)
```

---

**المؤلف:** Basel Yahya Abdullah  
**التاريخ:** 2025-11-03  
**الإصدار:** 1.0

