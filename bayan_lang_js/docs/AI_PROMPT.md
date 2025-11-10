# 🤖 Bayan Language Reference for AI Models - مرجع لغة البيان لنماذج الذكاء الاصطناعي

## 📋 Quick Reference - المرجع السريع

Copy this entire file and paste it to any AI model to teach it Bayan language instantly!

انسخ هذا الملف بالكامل والصقه في أي نموذج ذكاء اصطناعي ليتعلم لغة البيان فوراً!

---

## 🌍 What is Bayan? - ما هي البيان؟

**Bayan** is the world's first **bilingual programming language** supporting both **English** and **Arabic** keywords with the ability to mix both in the same file.

**البيان** هي أول لغة برمجة **ثنائية اللغة** في العالم تدعم الكلمات المفتاحية بالـ**إنجليزية** والـ**عربية** مع القدرة على خلطهما في نفس الملف.

### Key Features - الميزات الرئيسية:

1. **Bilingual** - English + Arabic keywords (ثنائية اللغة)
2. **Multi-paradigm** - Procedural + OOP + Logic Programming (متعددة الأنماط)
3. **Hybrid** - Mix all paradigms in one file (هجينة)
4. **Compiles to JavaScript** - Works everywhere JS works (تُترجم لـ JavaScript)
5. **100% Complete** - All advanced features implemented (مكتملة 100%)

### Advanced Features - الميزات المتقدمة:

✅ **Generators** - `function*`, `yield` (المولدات)
✅ **Enums** - `enum Color { Red, Green }` (التعدادات)
✅ **Pattern Matching** - `match`, `case`, `when` (مطابقة الأنماط)
✅ **Decorators** - `@decorator` (المزخرفات)
✅ **Type Annotations** - `param: type` (تعليقات الأنواع)
✅ **Named Parameters** - `func(name: value)` (المعاملات المسماة)
✅ **Namespaces** - `namespace Math { }` (النطاقات)
✅ **Optional Chaining** - `obj?.property` (السلسلة الاختيارية)
✅ **Nullish Coalescing** - `value ?? default` (الدمج الفارغ)
✅ **Spread/Rest** - `...args`, `[...array]` (النشر/الباقي)

---

## 📖 Complete Keyword Reference - مرجع الكلمات المفتاحية الكامل

### Variables & Constants - المتغيرات والثوابت

| English | Arabic | Example |
|---------|--------|---------|
| `let` | `متغير` | `let x = 5;` or `متغير س = 5;` |
| `const` | `ثابت` | `const PI = 3.14;` or `ثابت ط = 3.14;` |
| `var` | `عام` | `var name = "Ali";` or `عام الاسم = "علي";` |

### Functions - الدوال

| English | Arabic | Example |
|---------|--------|---------|
| `function` | `دالة` | `function add(a, b) { return a + b; }` |
| `return` | `ارجع` | `return result;` or `ارجع النتيجة;` |
| `async` | `غير_متزامن` | `async function getData() { ... }` |
| `await` | `انتظر` | `await fetch(url);` or `انتظر fetch(url);` |

### Control Flow - التحكم في التدفق

| English | Arabic | Example |
|---------|--------|---------|
| `if` | `إذا` | `if (x > 0) { ... }` or `إذا (س > 0) { ... }` |
| `else` | `وإلا` | `else { ... }` or `وإلا { ... }` |
| `else if` | `وإلا_إذا` | `else if (x < 0) { ... }` |
| `switch` | `حسب` | `switch (value) { ... }` |
| `case` | `حالة` | `case 1: ...` or `حالة 1: ...` |
| `default` | `افتراضي` | `default: ...` or `افتراضي: ...` |

### Loops - الحلقات

| English | Arabic | Example |
|---------|--------|---------|
| `for` | `لكل` | `for (let i = 0; i < 10; i++) { ... }` |
| `while` | `بينما` | `while (condition) { ... }` |
| `do` | `افعل` | `do { ... } while (condition);` |
| `break` | `اخرج` | `break;` or `اخرج;` |
| `continue` | `استمر` | `continue;` or `استمر;` |

### Object-Oriented Programming - البرمجة الكائنية

| English | Arabic | Example |
|---------|--------|---------|
| `class` | `صنف` | `class Person { ... }` or `صنف شخص { ... }` |
| `constructor` | `منشئ` | `constructor(name) { ... }` |
| `this` | `هذا` | `this.name = name;` or `هذا.الاسم = الاسم;` |
| `new` | `جديد` | `new Person("Ali");` or `جديد شخص("علي");` |
| `extends` | `يمتد` / `يرث` | `class Student extends Person { ... }` |
| `super` | `الأساس` | `super(name);` or `الأساس(الاسم);` |
| `static` | `ثابت_صنف` | `static method() { ... }` |
| `private` | `خاص` | `private name;` or `خاص الاسم;` |
| `public` | `عام` | `public getName() { ... }` |

### Logic Programming - البرمجة المنطقية

| English | Arabic | Example |
|---------|--------|---------|
| `fact` | `حقيقة` | `fact parent("Ali", "Sara");` |
| `rule` | `قاعدة` | `rule grandparent(?x, ?z) :- parent(?x, ?y), parent(?y, ?z);` |
| `query` | `استعلام` | `query grandparent("Ali", ?who);` |

### Hybrid Programming - البرمجة الهجينة

| English | Arabic | Example |
|---------|--------|---------|
| `hybrid` | `هجين` / `بيان` | `hybrid { ... }` or `هجين { ... }` |

### Advanced Features - الميزات المتقدمة

| English | Arabic | Example |
|---------|--------|---------|
| `function*` | `دالة*` | `function* gen() { yield 1; }` |
| `yield` | `أنتج` | `yield value;` or `أنتج القيمة;` |
| `enum` | `تعداد` | `enum Color { Red, Green }` |
| `type` | `نوع_بيانات` | `type Point = { x: number, y: number };` |
| `match` | `طابق` | `match value { case 1 => "one" }` |
| `case` | `حالة` | `case 1 => "one"` |
| `when` | `عندما` | `case x when x > 10 => "big"` |
| `namespace` | `نطاق` | `namespace Math { ... }` |
| `readonly` | `للقراءة_فقط` | `@readonly property` |
| `@decorator` | `@مزخرف` | `@log class MyClass { }` |

### Operators - العمليات

| Operator | Usage | Example |
|----------|-------|---------|
| `?.` | Optional chaining | `obj?.property?.nested` |
| `??` | Nullish coalescing | `value ?? "default"` |
| `...` | Spread/Rest | `[...array]`, `{...obj}`, `...args` |
| `::` | Namespace access | `Math::add(5, 3)` |
| `:` | Type annotation | `param: type`, `function(): type` |

### Other Keywords - كلمات أخرى

| English | Arabic | Example |
|---------|--------|---------|
| `true` | `صحيح` | `let flag = true;` or `متغير علم = صحيح;` |
| `false` | `خطأ` | `let flag = false;` or `متغير علم = خطأ;` |
| `null` | `لاشيء` / `عدم` | `let value = null;` or `متغير قيمة = لاشيء;` |
| `undefined` | `غير_معرف` | `let x;` // x is undefined |
| `typeof` | `نوع` | `typeof x;` or `نوع س;` |
| `instanceof` | `نسخة_من` | `obj instanceof Class;` |
| `import` | `استورد` | `import { func } from './module';` |
| `export` | `صدر` | `export function func() { ... }` |
| `try` | `حاول` | `try { ... } catch (e) { ... }` |
| `catch` | `اصطد` | `catch (error) { ... }` |
| `finally` | `أخيرا` | `finally { ... }` |
| `throw` | `ارمي` | `throw new Error("message");` |

---

## 💡 Code Examples - أمثلة الكود

### Example 1: Variables and Functions - المتغيرات والدوال

```javascript
// English
let x = 10;
const PI = 3.14;

function greet(name) {
    return "Hello, " + name;
}

console.log(greet("World"));

// Arabic - عربي
متغير س = 10;
ثابت ط = 3.14;

دالة رحب(الاسم) {
    ارجع "مرحباً، " + الاسم;
}

console.log(رحب("العالم"));

// Mixed - مختلط
function مرحبا(name) {
    if (name) {
        return "Hello, " + name;
    } else {
        ارجع "مرحبا بالعالم";
    }
}
```

### Example 2: Classes - الأصناف

```javascript
// English
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return "Hello, I'm " + this.name;
    }
}

const person = new Person("Ali", 25);
console.log(person.greet());

// Arabic - عربي
صنف شخص {
    منشئ(الاسم, العمر) {
        هذا.الاسم = الاسم;
        هذا.العمر = العمر;
    }
    
    دالة رحب() {
        ارجع "مرحباً، أنا " + هذا.الاسم;
    }
}

const شخص = جديد شخص("علي", 25);
console.log(شخص.رحب());
```

### Example 3: Control Flow - التحكم في التدفق

```javascript
// English
let score = 85;

if (score >= 90) {
    console.log("Excellent");
} else if (score >= 70) {
    console.log("Good");
} else {
    console.log("Need improvement");
}

// Arabic - عربي
متغير الدرجة = 85;

إذا (الدرجة >= 90) {
    console.log("ممتاز");
} وإلا_إذا (الدرجة >= 70) {
    console.log("جيد");
} وإلا {
    console.log("يحتاج تحسين");
}
```

### Example 4: Loops - الحلقات

```javascript
// English
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let count = 0;
while (count < 3) {
    console.log(count);
    count = count + 1;
}

// Arabic - عربي
لكل (متغير ع = 0; ع < 5; ع++) {
    console.log(ع);
}

متغير العدد = 0;
بينما (العدد < 3) {
    console.log(العدد);
    العدد = العدد + 1;
}
```

### Example 5: Logic Programming - البرمجة المنطقية

```javascript
// Facts - الحقائق
fact parent("Ahmed", "Sara");
fact parent("Ahmed", "Ali");
fact parent("Sara", "Omar");

// Rules - القواعد
rule grandparent(?x, ?z) :- parent(?x, ?y), parent(?y, ?z);

// Queries - الاستعلامات
query grandparent("Ahmed", ?grandchild);
// Result: Omar

// Arabic version - النسخة العربية
حقيقة أب("أحمد", "سارة");
حقيقة أب("أحمد", "علي");
حقيقة أب("سارة", "عمر");

قاعدة جد(?س, ?ص) :- أب(?س, ?ع), أب(?ع, ?ص);

استعلام جد("أحمد", ?الحفيد);
```

### Example 6: Hybrid Programming - البرمجة الهجينة

```javascript
hybrid {
    // OOP
    class Student {
        constructor(id, name) {
            this.id = id;
            this.name = name;
        }
    }
    
    // Logic Programming
    fact enrolled("S001", "CS101");
    fact enrolled("S002", "CS101");
    
    rule canEnroll(?student, ?course) :- 
        enrolled(?student, ?course);
    
    // Procedural
    function registerStudent(id, course) {
        query canEnroll(id, course);
        return "Registered";
    }
}
```

### Example 7: Async/Await - غير متزامن

```javascript
// English
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Arabic - عربي
غير_متزامن دالة جلب_البيانات(الرابط) {
    const الاستجابة = انتظر fetch(الرابط);
    const البيانات = انتظر الاستجابة.json();
    ارجع البيانات;
}
```

---

## 🎯 Important Rules - قواعد مهمة

### 1. Mixing Languages - خلط اللغات

You can mix English and Arabic keywords in the same file:

```javascript
function calculateSum(numbers) {
    متغير المجموع = 0;
    لكل (let num of numbers) {
        المجموع = المجموع + num;
    }
    ارجع المجموع;
}
```

### 2. Logic Variables - المتغيرات المنطقية

Logic variables start with `?`:

```javascript
rule sibling(?x, ?y) :- parent(?p, ?x), parent(?p, ?y);
query sibling("Ali", ?who);
```

### 3. Semicolons - الفواصل المنقوطة

Semicolons are required at the end of statements:

```javascript
let x = 5;  // ✅ Correct
let y = 10  // ❌ Error - missing semicolon
```

### 4. File Extension - امتداد الملف

Bayan files use `.bn` extension:

```
myapp.bn
utils.bn
```

### 5. Compilation - الترجمة

Bayan compiles to JavaScript:

```bash
bayan compile myapp.bn -o myapp.js
```

---

## 🚀 Usage Examples - أمثلة الاستخدام

### Command Line - سطر الأوامر

```bash
# Run a file
bayan run myapp.bn

# Compile to JavaScript
bayan compile myapp.bn -o myapp.js

# Interactive REPL
bayan repl

# Check for errors
bayan check myapp.bn
```

### In HTML - في HTML

```html
<!-- Compile first -->
<!-- bayan compile app.bn -o app.js -->

<!DOCTYPE html>
<html>
<head><title>Bayan App</title></head>
<body>
    <h1>My App</h1>
    <script src="app.js"></script>
</body>
</html>
```

---

## 📝 When Generating Code - عند توليد الكود

### AI Model Instructions:

When asked to write Bayan code, follow these rules:

1. **Use the correct keywords** from the table above
2. **Add semicolons** at the end of statements
3. **Support both languages** - generate English, Arabic, or mixed code based on user preference
4. **Use proper syntax**:
   - Classes: `class Name { ... }` or `صنف الاسم { ... }`
   - Functions: `function name() { ... }` or `دالة الاسم() { ... }`
   - Logic: `fact name(args);` or `حقيقة الاسم(المعاملات);`

5. **Example response format**:

```javascript
// User asks: "Write a counter class in Bayan"

// English version
class Counter {
    constructor() {
        this.count = 0;
    }
    
    increment() {
        this.count = this.count + 1;
    }
    
    getCount() {
        return this.count;
    }
}

// Arabic version - النسخة العربية
صنف عداد {
    منشئ() {
        هذا.العدد = 0;
    }
    
    دالة زيادة() {
        هذا.العدد = هذا.العدد + 1;
    }
    
    دالة احصل_على_العدد() {
        ارجع هذا.العدد;
    }
}
```

---

## ✅ Quick Checklist for AI - قائمة سريعة للذكاء الاصطناعي

When generating Bayan code, ensure:

- [ ] Keywords are from the official list above
- [ ] Semicolons are present
- [ ] Syntax matches the examples
- [ ] Both English and Arabic versions provided (if requested)
- [ ] Logic variables use `?` prefix
- [ ] File extension is `.bn`
- [ ] Code is valid and compilable

---

## 🎓 Summary - الملخص

**Bayan = JavaScript syntax + Bilingual keywords + Logic programming**

### Core Concepts:
1. **Bilingual**: Every keyword has English and Arabic versions
2. **Multi-paradigm**: Procedural + OOP + Logic
3. **Hybrid**: Mix all paradigms in one file
4. **Compiles to JS**: Works everywhere JavaScript works

### Most Common Keywords:

```javascript
// Variables
let / متغير
const / ثابت

// Functions
function / دالة
return / ارجع

// Control
if / إذا
else / وإلا
for / لكل
while / بينما

// OOP
class / صنف
constructor / منشئ
this / هذا
new / جديد

// Logic
fact / حقيقة
rule / قاعدة
query / استعلام

// Advanced (NEW!)
function* / دالة*      // Generators
yield / أنتج           // Yield
enum / تعداد           // Enums
match / طابق           // Pattern matching
@decorator / @مزخرف    // Decorators
namespace / نطاق       // Namespaces
```

### Advanced Features Quick Examples:

```javascript
// Generators
function* gen() { yield 1; yield 2; }

// Enums
enum Color { Red, Green, Blue }

// Pattern Matching
match x { case 1 => "one", default => "other" }

// Decorators
@log class MyClass { }

// Type Annotations
function add(a: number, b: number): number { return a + b; }

// Named Parameters
createUser(name: "Ali", age: 25);

// Namespaces
namespace Math { export function add(a, b) { return a + b; } }
Math::add(5, 3);

// Optional Chaining & Nullish Coalescing
user?.profile?.name
value ?? "default"

// Spread/Rest
[...array]
{...object}
function(...args) { }
```

---

<div align="center">

## 🤖 Ready to Generate Bayan Code! 🤖
## 🤖 جاهز لتوليد كود البيان! 🤖

**This reference is complete and sufficient for any AI model to understand and generate Bayan code with ALL features!**

**هذا المرجع كامل وكافٍ لأي نموذج ذكاء اصطناعي لفهم وتوليد كود البيان بجميع الميزات!**

### ✅ Feature Completeness - اكتمال الميزات

✅ Core Features (12/12) - الميزات الأساسية
✅ Advanced Features (10/10) - الميزات المتقدمة
✅ Logic Programming (3/3) - البرمجة المنطقية
✅ **Baserah AI System** 🔥 NEW - **نظام بصيرة AI**
✅ **Visual IDE** 🎨 NEW - **بيئة التطوير المرئية**
✅ **Total: 100% Complete** - **المجموع: مكتملة 100%**

**Bayan is the world's most complete bilingual programming language!**
**البيان هي أكثر لغة برمجة ثنائية اللغة اكتمالاً في العالم!**

</div>

---

## 🔥 PHASE 13: Baserah AI System - نظام بصيرة AI

### Overview - نظرة عامة

**Baserah AI** is a revolutionary mathematical AI system **without neural networks**, based on the principle:

**"المعادلة = المعلومة"** - "The Equation = The Information"

### Mother Equation - المعادلة الأم

**Formula:** `O = (id, Φ, Ψ(t), Γ)`

**Components:**
- **id**: Unique identifier (string)
- **Φ (Phi)**: Static properties - خصائص ثابتة (Map)
- **Ψ(t) (Psi)**: Dynamic states over time - حالات متغيرة عبر الزمن (Map)
- **Γ (Gamma)**: Shape equation - معادلة الشكل (Function)

### Linguistic Operators - المشغلات اللغوية (15 operators)

| Operator | Arabic | Description | Parameters |
|----------|--------|-------------|------------|
| `Go` | `انتقل` | Movement | (object, from, to) |
| `Affect` | `أثر` | Influence | (actor, object, type, intensity) |
| `Bond` | `اربط` | Connection | (obj1, obj2, bondType, strength) |
| `Transform` | `حول` | Change | (object, transformations) |
| `Actor` | `فاعل` | Mark actor | (object) |
| `Object` | `مفعول` | Mark object | (object) |
| `Create` | `أنشئ` | Creation | (components, recipe) |
| `Destroy` | `أتلف` | Destruction | (object) |
| `Transfer` | `انقل` | Transfer | (from, to, what, amount) |
| `Merge` | `ادمج` | Merge | (objects, strategy) |
| `Decompose` | `فكك` | Break down | (object, parts) |
| `Evolve` | `تطور` | Evolution | (object, direction, rate) |
| `Interact` | `تفاعل` | Interaction | (obj1, obj2, type) |
| `Contain` | `احتوى` | Containment | (container, content) |
| `Release` | `أطلق` | Release | (container, content) |

### Linguistic Roles - الأدوار اللغوية

```javascript
enum Role {
  ACTOR = 'فاعل',      // Actor - الفاعل
  OBJECT = 'مفعول',    // Object - المفعول به
  RECIPIENT = 'متلقي', // Recipient - المتلقي
  INSTRUMENT = 'أداة',  // Instrument - الأداة
  LOCATION = 'مكان',   // Location - المكان
  TIME = 'زمان'        // Time - الزمان
}
```

### Complete Example - مثال كامل

```javascript
// English version
let ball = mother_equation("ball_1");
ball.static_property("material", "leather");
ball.static_property("color", "white");
ball.static_property("diameter", 22);

ball.state("location", "ground");
ball.state("speed", 0);
ball.state("height", 0);

let player = mother_equation("player_1");
player.static_property("name", "Ahmed");
player.state("energy", 100);

// Apply operators
Go(ball, "ground", "air");
Affect(player, ball, "kick", 0.8);
Transform(ball, {
  "speed": 15,
  "height": 3
});

print("Ball location: " + ball.state("location")); // "air"
print("Ball speed: " + ball.state("speed"));       // 15
print("Ball height: " + ball.state("height"));     // 3

// Arabic version - النسخة العربية
متغير كرة = معادلة_أم("كرة_1");
كرة.خاصية_ثابتة("مادة", "جلد");
كرة.خاصية_ثابتة("لون", "أبيض");
كرة.خاصية_ثابتة("قطر", 22);

كرة.حالة("موقع", "أرض");
كرة.حالة("سرعة", 0);
كرة.حالة("ارتفاع", 0);

متغير لاعب = معادلة_أم("لاعب_1");
لاعب.خاصية_ثابتة("اسم", "أحمد");
لاعب.حالة("طاقة", 100);

// تطبيق المشغلات
انتقل(كرة, "أرض", "هواء");
أثر(لاعب, كرة, "ضربة", 0.8);
حول(كرة, {
  "سرعة": 15,
  "ارتفاع": 3
});

اطبع("موقع الكرة: " + كرة.حالة("موقع"));   // "هواء"
اطبع("سرعة الكرة: " + كرة.حالة("سرعة"));   // 15
اطبع("ارتفاع الكرة: " + كرة.حالة("ارتفاع")); // 3
```

### Linguistic Equations - المعادلات اللغوية

**Structure:** `الفكرة = (أشياء، حدث، نتيجة)` / `Idea = (Things, Event, Result)`

```javascript
// Parse natural language sentence
let sentence = "ضرب أحمد الكرة";
let equation = parseSentence(sentence, {
  "أحمد": player,
  "الكرة": ball
});

// Execute the equation
let result = equation.execute();

print(result.affectedObjects); // [ball]
print(result.changes);         // Map of state changes
```

---

## 🎨 Visual IDE - بيئة التطوير المرئية

Bayan includes **TWO IDE options** for different user levels:

---

### 🎨 Option 1: Visual Drag-and-Drop IDE (Recommended for Beginners) ⭐⭐⭐

**File:** `public/ide/visual-ide.html`

A **complete visual programming environment** where you can build Bayan programs **without writing code**!

#### Features - الميزات

- ✅ **Drag & Drop Interface** - واجهة سحب وإفلات
  - Drag blocks from toolbox
  - Drop on canvas
  - No coding required!

- ✅ **8 Block Types** - 8 أنواع من الكتل
  1. 🖨️ **Print** - اطبع (print text)
  2. 📦 **Variable** - متغير (define variable)
  3. 🔧 **Function** - دالة (create function)
  4. ❓ **If** - إذا (conditional)
  5. 🔄 **Loop** - حلقة (iteration)
  6. 📦 **Class** - صنف (class definition)
  7. 🧮 **Mother Equation** - معادلة أم (Baserah AI object)
  8. ⚡ **Operator** - مشغل (linguistic operator)

- ✅ **Professional Interface** - واجهة احترافية
  - **Toolbox** (right) - صندوق الأدوات
  - **Canvas** (center) - منطقة الرسم
  - **Properties Panel** (left) - لوحة الخصائص
  - **Toolbar** (top) - شريط الأدوات
  - **Status Bar** (bottom) - شريط الحالة

- ✅ **Auto Code Generation** - توليد كود تلقائي
  - Generate clean Bayan code
  - Syntax highlighting
  - Copy & download code

- ✅ **Save & Load Projects** - حفظ وتحميل المشاريع
  - Save as `.bayan` file
  - Load existing projects

#### How to Use - كيفية الاستخدام

```bash
# Open in browser - افتح في المتصفح
file:///path/to/bayan_js/public/ide/visual-ide.html

# Or double-click the file - أو انقر نقرة مزدوجة
```

**Steps:**
1. Drag a block from toolbox (right)
2. Drop it on canvas (center)
3. Edit properties (click edit icon or use left panel)
4. Click "Generate Code" to see Bayan code
5. Click "Save" to save project

#### Example - مثال

**Visual Blocks:**
```
[Print Block]
  Message: "مرحباً بالعالم!"

[Variable Block]
  Name: x
  Value: 10

[Loop Block]
  Variable: i
  Start: 0
  End: 10
  Body: اطبع(i);
```

**Generated Code:**
```javascript
اطبع('مرحباً بالعالم!');

متغير x = 10;

لكل (متغير i = 0; i < 10; i++) {
    اطبع(i);
}
```

---

### 📝 Option 2: Text Editor IDE (For Advanced Users)

**File:** `public/ide/standalone.html`

A **modern text editor** built with React + TypeScript + CodeMirror 6:

#### 🖥️ Advanced Editor - المحرر المتقدم

- ✅ **Syntax Highlighting** - إبراز الصيغة
  - 100+ keywords (Arabic + English)
  - Color-coded by type
  - Light and dark themes

- ✅ **Smart Autocomplete** - إكمال تلقائي ذكي
  - 60+ keyword suggestions
  - 15+ built-in functions
  - 4 code snippets
  - Context-aware suggestions

- ✅ **Line Numbers** - أرقام الأسطر
  - Active line highlighting
  - Gutter customization

- ✅ **Code Folding** - طي الكود
  - Fold/unfold sections
  - Nested folding support

- ✅ **Bracket Matching** - مطابقة الأقواس
  - Highlight matching brackets
  - Error on mismatch

- ✅ **Search & Replace** - بحث واستبدال
  - Regex support
  - Case-sensitive option
  - Replace all

- ✅ **Undo/Redo** - تراجع/إعادة
  - Full history tracking
  - Ctrl+Z / Ctrl+Shift+Z

#### 🎨 Three Professional Themes - ثلاث سمات احترافية

1. **Light Theme** - السمة الفاتحة
   - White background
   - High contrast
   - Daytime work

2. **Dark Theme** - السمة الداكنة
   - Dark background (#0d1117)
   - GitHub Dark colors
   - Nighttime work
   - Reduced eye strain

3. **Arabic Theme** - السمة العربية
   - **Full RTL support** - دعم RTL كامل
   - Arabic fonts (Cairo, Amiri)
   - Line numbers on left
   - Text starts from right
   - Larger font size (16px)
   - Better line spacing (1.8)

#### ⌨️ Keyboard Shortcuts - اختصارات لوحة المفاتيح

| Shortcut | Function |
|----------|----------|
| `Ctrl+S` / `Cmd+S` | Save file - حفظ |
| `Ctrl+Z` / `Cmd+Z` | Undo - تراجع |
| `Ctrl+Shift+Z` | Redo - إعادة |
| `Ctrl+F` / `Cmd+F` | Search - بحث |
| `Ctrl+H` / `Cmd+H` | Replace - استبدال |
| `Ctrl+/` / `Cmd+/` | Comment - تعليق |
| `Ctrl+Space` | Autocomplete - إكمال تلقائي |

### Usage Example - مثال الاستخدام

```tsx
import { BayanEditor } from './ide/components/BayanEditor';

<BayanEditor
  initialContent="اطبع('مرحباً بالعالم!')"
  theme="light"  // "light" | "dark" | "arabic"
  onChange={(content) => console.log(content)}
  onSave={(content) => console.log('Saved:', content)}
  showLineNumbers={true}
  height="600px"
/>
```

---

## 📝 Updated Generation Guidelines - إرشادات التوليد المحدثة

When generating Bayan code with **Baserah AI** and **IDE features**:

### For Baserah AI:

1. ✅ Use `mother_equation()` to create objects
2. ✅ Use `.static_property()` for unchanging properties
3. ✅ Use `.state()` for time-dependent states
4. ✅ Use linguistic operators: `Go`, `Affect`, `Transform`, etc.
5. ✅ Track state changes over time
6. ✅ Use roles: `ACTOR`, `OBJECT`, `RECIPIENT`, etc.
7. ✅ Parse natural language with `parseSentence()`
8. ✅ Execute linguistic equations with `.execute()`

### For IDE:

1. ✅ Mention syntax highlighting support
2. ✅ Mention autocomplete features
3. ✅ Mention three themes (Light, Dark, Arabic)
4. ✅ Mention RTL support for Arabic
5. ✅ Mention keyboard shortcuts

### Example Request - مثال طلب

```
Write a Bayan program using Baserah AI to model:
- A car moving from home to work
- The car's speed changes during the journey
- Use linguistic operators
- Include both English and Arabic versions
- Show how it would look in the Visual IDE
```

---

**🎉 Bayan is now the most advanced bilingual programming language with AI-powered mathematical modeling and a modern Visual IDE! 🎉**

**🎉 البيان الآن أكثر لغة برمجة ثنائية اللغة تقدماً مع نمذجة رياضية مدعومة بالذكاء الاصطناعي وبيئة تطوير مرئية حديثة! 🎉**

</div>

