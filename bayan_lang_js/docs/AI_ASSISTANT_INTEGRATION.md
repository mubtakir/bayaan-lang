# 🤖 دليل المساعد الذكي للبيان
# Bayan AI Assistant Integration Guide

**المؤلف / Author:** Basel Yahya Abdullah  
**التاريخ / Date:** 2025-11-03  
**الإصدار / Version:** 1.0.0

---

## 📋 جدول المحتويات / Table of Contents

1. [نظرة عامة](#نظرة-عامة)
2. [المكونات الرئيسية](#المكونات-الرئيسية)
3. [نظام المراقبة الذكية](#نظام-المراقبة-الذكية)
4. [نظام كشف الأخطاء](#نظام-كشف-الأخطاء)
5. [نظام توليد الكود](#نظام-توليد-الكود)
6. [واجهة المساعد الذكي](#واجهة-المساعد-الذكي)
7. [التكامل مع المحررات](#التكامل-مع-المحررات)
8. [أمثلة الاستخدام](#أمثلة-الاستخدام)

---

## 🎯 نظرة عامة / Overview

المساعد الذكي للبيان هو نظام متكامل يساعد المبرمجين في كتابة كود البيان من خلال:

- **المراقبة الذكية**: مراقبة كتابة المبرمج والتوقع بما يريد فعله
- **كشف الأخطاء**: اكتشاف الأخطاء والتنبيه الفوري
- **توليد الكود**: توليد كود البيان حسب الطلب
- **الحوار التفاعلي**: التفاعل مع المبرمج عبر واجهة حوار

---

## 🧩 المكونات الرئيسية / Main Components

### 1. CodeMonitor - نظام المراقبة الذكية

**الموقع:** `src/ide/utils/codeMonitor.ts`

**الوظائف الرئيسية:**
- مراقبة التغييرات في الكود
- كشف نية المبرمج
- كشف الأنماط (دوال، حلقات، شروط، أصناف)
- توليد التوقعات والاقتراحات
- تحليل سياق الكود

**مثال الاستخدام:**
```typescript
import CodeMonitor from './codeMonitor';

const monitor = new CodeMonitor();
const result = await monitor.monitorCodeChange(code, { line: 5, column: 10 });

console.log('النية:', result.intent);
console.log('التوقعات:', result.predictions);
console.log('الأنماط:', result.patterns);
```

### 2. ErrorDetector - نظام كشف الأخطاء

**الموقع:** `src/ide/utils/errorDetector.ts`

**أنواع الأخطاء المكتشفة:**
- أخطاء الأقواس (brackets)
- الفواصل المنقوطة المفقودة
- الكلمات المفتاحية الخاطئة
- الأخطاء الشائعة (= بدلاً من ==)
- أخطاء التسمية
- الأخطاء المنطقية (قسمة على صفر، شروط دائمة)

**مثال الاستخدام:**
```typescript
import ErrorDetector from './errorDetector';

const detector = new ErrorDetector();
const errors = await detector.detectErrors(code);

errors.forEach(error => {
  console.log(`[${error.severity}] السطر ${error.line}: ${error.message}`);
  if (error.fix) {
    console.log('الإصلاح المقترح:', error.fix);
  }
});
```

### 3. CodeGenerator - نظام توليد الكود

**الموقع:** `src/ide/utils/codeGenerator.ts`

**أنواع الكود المدعومة:**
- دوال (functions)
- أصناف (classes)
- حلقات (loops)
- شروط (conditions)
- متغيرات (variables)
- استيرادات (imports)
- خوارزميات (algorithms)

**مثال الاستخدام:**
```typescript
import CodeGenerator from './codeGenerator';

const generator = new CodeGenerator();

// توليد دالة
const result = await generator.generateCode({
  type: 'function',
  description: 'دالة لحساب المتوسط',
  language: 'ar',
  includeComments: true,
  complexity: 'simple'
});

console.log(result.code);
console.log(result.explanation);
```

### 4. AIAssistant - واجهة المساعد الذكي

**الموقع (React):** `src/ide/components/AIAssistant.tsx`  
**الموقع (JavaScript):** `public/ide/ai-assistant.js`

**الميزات:**
- واجهة حوار تفاعلية
- استخراج وعرض أكواد البيان
- إدراج واستبدال الكود
- أزرار الإجراءات السريعة
- مؤشر الكتابة

**مثال الاستخدام (React):**
```tsx
import AIAssistant from './AIAssistant';

<AIAssistant
  currentCode={code}
  onInsertCode={(code) => insertAtCursor(code)}
  onReplaceCode={(code) => replaceAll(code)}
  position="right"
  isVisible={true}
/>
```

---

## 🔍 نظام المراقبة الذكية / Code Monitoring System

### كشف النية / Intent Detection

النظام يكتشف نية المبرمج بناءً على ما يكتبه:

| النية | الكلمات المفتاحية | التوقعات |
|-------|-------------------|-----------|
| تعريف دالة | `دالة`, `function` | إكمال جسم الدالة |
| تعريف صنف | `صنف`, `class` | إكمال جسم الصنف |
| إنشاء حلقة | `لكل`, `for` | إكمال الحلقة + أمثلة |
| إنشاء شرط | `اذا`, `if` | إكمال الشرط + else |
| تعريف متغير | `متغير`, `var`, `let` | اقتراحات التهيئة |

### كشف الأنماط / Pattern Detection

```typescript
interface DetectedPattern {
  type: 'loop' | 'condition' | 'function' | 'class' | 'variable';
  name: string;
  line: number;
  status: 'incomplete' | 'complete' | 'error';
  suggestion?: string;
}
```

### التوقعات / Predictions

```typescript
interface CodePrediction {
  type: 'completion' | 'suggestion' | 'pattern' | 'function';
  text: string;
  confidence: number; // 0-1
  description: string;
}
```

---

## ⚠️ نظام كشف الأخطاء / Error Detection System

### مستويات الخطورة / Severity Levels

- **error**: أخطاء حرجة تمنع التنفيذ
- **warning**: تحذيرات قد تسبب مشاكل
- **info**: معلومات للتحسين
- **hint**: اقتراحات للممارسات الجيدة

### أمثلة الأخطاء المكتشفة

#### 1. أقواس غير متطابقة
```bayan
دالة مثال() {
    اطبع("مرحبا")؛
// ❌ خطأ: قوس غير مغلق
```

#### 2. فاصلة منقوطة مفقودة
```bayan
متغير x = 10
// ⚠️ تحذير: فاصلة منقوطة مفقودة
```

#### 3. قسمة على صفر
```bayan
متغير نتيجة = 10 / 0؛
// ❌ خطأ: قسمة على صفر
```

#### 4. شرط دائماً صحيح
```bayan
اذا (صحيح) {
    // ⚠️ تحذير: شرط دائماً صحيح
}
```

---

## 🤖 نظام توليد الكود / Code Generation System

### القوالب المدمجة / Built-in Templates

#### دالة / Function
```bayan
دالة {name}({params}) {
    // {description}
    {body}
    ارجع {return};
}
```

#### صنف / Class
```bayan
صنف {name} {
    // {description}
    
    // الخصائص
    {properties}
    
    // الدوال
    {methods}
}
```

#### حلقة / Loop
```bayan
لكل (متغير {iterator} = {start}; {iterator} < {end}; {iterator}++) {
    // {description}
    {body}
}
```

### التوليد من النص الطبيعي

```typescript
const result = await generator.generateFromNaturalLanguage(
  'اكتب دالة تحسب مجموع عناصر مصفوفة'
);
```

---

## 💬 واجهة المساعد الذكي / AI Assistant Interface

### الإجراءات السريعة / Quick Actions

1. **📖 اشرح الكود** - شرح الكود الحالي
2. **🔧 أصلح الأخطاء** - اكتشاف وإصلاح الأخطاء
3. **⚡ حسّن الأداء** - تحسين الكود
4. **💬 أضف تعليقات** - إضافة تعليقات توضيحية

### التفاعل مع الكود

- **إدراج (Insert)**: إدراج الكود عند موضع المؤشر
- **استبدال (Replace)**: استبدال كل الكود بالكود الجديد

---

## 🔗 التكامل مع المحررات / Editor Integration

### 1. BayanEditor (React)

```tsx
<BayanEditor
  initialContent={code}
  theme="dark"
  showAIAssistant={true}
  showErrorDetection={true}
  onChange={(code) => console.log(code)}
/>
```

### 2. bayan-runner.html

المساعد الذكي مدمج في الجانب الأيمن من المحرر.

**الوصول:**
```
http://localhost:3000/ide/bayan-runner.html
```

### 3. visual-ide.html

المساعد الذكي مدمج كلوحة رابعة في المحرر المرئي.

**الوصول:**
```
http://localhost:3000/ide/visual-ide.html
```

---

## 📚 أمثلة الاستخدام / Usage Examples

### مثال 1: مراقبة الكود في الوقت الفعلي

```typescript
const monitor = new CodeMonitor();
const editor = document.getElementById('editor');

editor.addEventListener('input', async () => {
  const code = editor.value;
  const cursor = editor.selectionStart;
  const line = code.substring(0, cursor).split('\n').length - 1;
  const column = cursor - code.lastIndexOf('\n', cursor - 1) - 1;
  
  const result = await monitor.monitorCodeChange(code, { line, column });
  
  // عرض التوقعات
  displayPredictions(result.predictions);
});
```

### مثال 2: كشف الأخطاء التلقائي

```typescript
const detector = new ErrorDetector();

async function checkCode(code) {
  const errors = await detector.detectErrors(code);
  
  // عرض الأخطاء
  errors.forEach(error => {
    highlightError(error.line, error.severity, error.message);
  });
}
```

### مثال 3: توليد كود بناءً على طلب المستخدم

```typescript
const generator = new CodeGenerator();

async function handleUserRequest(request) {
  const result = await generator.generateFromNaturalLanguage(request);
  
  // إدراج الكود المولد
  insertCode(result.code);
  
  // عرض الشرح
  showExplanation(result.explanation);
}
```

---

## 🎨 التخصيص / Customization

### تخصيص المراقبة

```typescript
const monitor = new CodeMonitor();
monitor.analysisInterval = 500; // تحليل كل 500ms
```

### تخصيص التوليد

```typescript
const generator = new CodeGenerator();

// إضافة قالب مخصص
generator.templates.set('custom', `
// قالب مخصص
{code}
`);
```

---

## 🚀 الأداء / Performance

- **المراقبة**: تحليل كل 1 ثانية (قابل للتخصيص)
- **كشف الأخطاء**: تأخير 500ms بعد التوقف عن الكتابة
- **التوليد**: يعتمد على تعقيد الطلب

---

## 📝 الملاحظات / Notes

1. النظام يدعم **اللغة العربية والإنجليزية** في نفس الملف
2. جميع الأنظمة تعمل **بدون اتصال بالإنترنت**
3. النظام يستخدم **النموذج اللغوي التوليدي** المدمج في البيان
4. التوقعات تتحسن مع **الاستخدام المتكرر**

---

## 🔮 التطوير المستقبلي / Future Development

- [ ] دعم المزيد من أنواع الأخطاء
- [ ] تحسين دقة التوقعات
- [ ] إضافة المزيد من القوالب
- [ ] دعم الإكمال التلقائي المتقدم
- [ ] تكامل مع أنظمة التحكم بالإصدارات

---

**© 2025 Basel Yahya Abdullah - لغة البيان / Bayan Language**

