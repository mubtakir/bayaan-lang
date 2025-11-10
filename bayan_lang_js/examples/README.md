# 📚 Bayan Examples - أمثلة البيان

This directory contains example programs demonstrating the features of Bayan Programming Language.

هذا المجلد يحتوي على برامج مثالية توضح ميزات لغة البيان.

---

## 🌍 Bilingual Examples - أمثلة ثنائية اللغة

These examples demonstrate Bayan's unique bilingual capability - the ability to use both English and Arabic keywords in the same program!

هذه الأمثلة توضح القدرة الفريدة للبيان - استخدام الكلمات المفتاحية بالإنجليزية والعربية في نفس البرنامج!

### 1. `bilingual-hello.bn` - Hello World

**What it demonstrates:**
- Basic function syntax in English
- Basic function syntax in Arabic
- Mixed language functions
- Using both languages in same file

**Run it:**
```bash
bayan run bilingual-hello.bn
```

**Key concepts:**
- `function` = `دالة`
- `return` = `ارجع`
- `if` = `إذا`
- `else` = `وإلا`

---

### 2. `bilingual-oop.bn` - Object-Oriented Programming

**What it demonstrates:**
- Classes in English
- Classes in Arabic
- Mixed language class (English + Arabic methods)
- Inheritance with both languages

**Run it:**
```bash
bayan run bilingual-oop.bn
```

**Key concepts:**
- `class` = `صنف`
- `constructor` = `منشئ`
- `this` = `هذا`
- `extends` = `يمتد` / `يرث`
- `new` = `جديد`

**Example:**
```javascript
class حساب_بنكي {
    constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
    }
    
    deposit(amount) {
        this.balance += amount;
    }
    
    دالة سحب(المبلغ) {
        this.balance -= المبلغ;
        ارجع صحيح;
    }
}
```

---

### 3. `bilingual-logic.bn` - Logic Programming

**What it demonstrates:**
- Facts in English and Arabic
- Rules in English and Arabic
- Queries in both languages
- Mixed logic programming

**Run it:**
```bash
bayan run bilingual-logic.bn
```

**Key concepts:**
- `fact` = `حقيقة`
- `rule` = `قاعدة`
- `query` = `استعلام`
- Logic variables: `?x`, `?who`, `?س`, `?من`

**Example:**
```javascript
// English
fact parent("John", "Alice");
rule grandparent(?x, ?z) :- parent(?x, ?y), parent(?y, ?z);

// Arabic - عربي
حقيقة أب("خالد", "أحمد");
قاعدة جد(?س, ?ص) :- أب(?س, ?ع), أب(?ع, ?ص);

// Query in either language!
const result = query grandparent("John", ?who);
const نتيجة = query جد("خالد", ?من);
```

---

### 4. `bilingual-hybrid.bn` - Hybrid Programming ⭐

**This is the showcase example!** - **هذا هو المثال الرئيسي!**

**What it demonstrates:**
- Combining OOP + Logic + Procedural in one program
- Using both English and Arabic throughout
- Real-world example: Student course registration system
- How the three paradigms work together

**Run it:**
```bash
bayan run bilingual-hybrid.bn
```

**Key concepts:**
- `hybrid` = `هجين` / `بيان`
- Classes for data modeling
- Facts and rules for business logic
- Functions for procedural logic
- All three paradigms working together!

**Example scenario:**
```javascript
hybrid {
    // OOP: Student class
    class Student {
        enroll(course) {
            // Add logic fact when enrolling!
            fact enrolled(this.id, course);
        }
    }
    
    // Logic: Course prerequisites
    fact prerequisite("CS102", "CS101");
    rule canEnroll(?s, ?c) :- 
        prerequisite(?c, ?p),
        enrolled(?s, ?p);
    
    // Procedural: Registration function
    function registerStudent(student, course) {
        if (query canEnroll(student.id, course)) {
            student.enroll(course);
            return true;
        }
        return false;
    }
}
```

---

## 📖 Original Examples - الأمثلة الأصلية

These examples use Arabic keywords only (original version).

هذه الأمثلة تستخدم الكلمات المفتاحية العربية فقط (النسخة الأصلية).

### `hello.bn` - مرحبا بالعالم
Basic hello world example in Arabic.

### `oop.bn` - البرمجة الكائنية
Object-oriented programming examples in Arabic.

### `logic.bn` - البرمجة المنطقية
Logic programming examples in Arabic.

### `hybrid.bn` - البرمجة الهجينة
Hybrid programming examples in Arabic.

### `stdlib.bn` - المكتبة القياسية
Standard library usage examples in Arabic.

---

## 🎯 Learning Path - مسار التعلم

### For English Speakers:

1. **Start with:** `bilingual-hello.bn`
   - See how English keywords work
   - Compare with Arabic equivalents

2. **Then try:** `bilingual-oop.bn`
   - Learn OOP in Bayan
   - See mixed language classes

3. **Next:** `bilingual-logic.bn`
   - Understand logic programming
   - See Prolog-style syntax

4. **Finally:** `bilingual-hybrid.bn`
   - See the full power of Bayan
   - Understand hybrid paradigm

### For Arabic Speakers - للمتحدثين بالعربية:

1. **ابدأ بـ:** `bilingual-hello.bn`
   - شاهد كيف تعمل الكلمات المفتاحية العربية
   - قارن مع المكافئات الإنجليزية

2. **ثم جرب:** `bilingual-oop.bn`
   - تعلم البرمجة الكائنية في البيان
   - شاهد الأصناف المختلطة

3. **بعد ذلك:** `bilingual-logic.bn`
   - افهم البرمجة المنطقية
   - شاهد صيغة Prolog

4. **أخيراً:** `bilingual-hybrid.bn`
   - شاهد القوة الكاملة للبيان
   - افهم النمط الهجين

---

## 💡 Tips - نصائح

### Mixing Languages - خلط اللغات

You can mix English and Arabic freely:

```javascript
// English function with Arabic name
function مرحبا(name) {
    return "Hello " + name;
}

// Arabic function with English name
دالة greet(الاسم) {
    ارجع "مرحباً " + الاسم;
}

// Mixed keywords in same function
function test() {
    إذا (true) {
        return "works!";
    } وإلا {
        ارجع "يعمل!";
    }
}
```

### Best Practices - أفضل الممارسات

1. **For international teams:** Use English keywords for shared code
   - **للفرق الدولية:** استخدم الكلمات المفتاحية الإنجليزية للكود المشترك

2. **For Arabic teams:** Use Arabic keywords for better readability
   - **للفرق العربية:** استخدم الكلمات المفتاحية العربية لقراءة أفضل

3. **For learning:** Start with one language, gradually mix
   - **للتعلم:** ابدأ بلغة واحدة، ثم امزج تدريجياً

4. **For domain logic:** Use the language that fits the domain
   - **للمنطق المجالي:** استخدم اللغة التي تناسب المجال

---

## 🚀 Running Examples - تشغيل الأمثلة

### Using the CLI:

```bash
# Run an example
bayan run bilingual-hello.bn

# Or in Arabic
البيان تشغيل bilingual-hello.bn

# Compile to JavaScript
bayan compile bilingual-hybrid.bn -o output.js

# Check for errors
bayan check bilingual-oop.bn
```

---

## 📚 More Resources - المزيد من الموارد

- **[Bilingual Guide](../docs/BILINGUAL_GUIDE.md)** - Complete guide for using both languages
- **[Learning Guide](../docs/LEARNING_GUIDE.md)** - Comprehensive learning path
- **[Quick Reference](../docs/QUICK_REFERENCE.md)** - Keyword reference
- **[README](../README.md)** - Main documentation

---

<div align="center">

**Happy coding in your preferred language!**  
**برمجة سعيدة بلغتك المفضلة!**

🌍 **Bayan: The World's First Bilingual Programming Language** 🌍

</div>

