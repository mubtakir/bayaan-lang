# 🌍 Bilingual Programming Guide - دليل البرمجة ثنائية اللغة

## 🎯 What Makes Bayan Unique?

**Bayan is the world's first truly bilingual programming language!**

You can:
- ✅ Write entirely in English
- ✅ Write entirely in Arabic (العربية)
- ✅ **Mix both languages in the same file!**

No other programming language offers this level of flexibility.

---

## 📖 Quick Start for English Speakers

### Hello World

```javascript
// Standard English syntax
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("World"));
```

### Classes

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        console.log("I'm " + this.name);
    }
}

const john = new Person("John", 25);
john.introduce();
```

### Logic Programming

```javascript
// Facts
fact parent("John", "Alice");
fact parent("Alice", "Bob");

// Rules
rule grandparent(?x, ?z) :- parent(?x, ?y), parent(?y, ?z);

// Query
const result = query grandparent("John", ?who);
console.log(result); // [{who: "Bob"}]
```

---

## 📖 دليل سريع للمتحدثين بالعربية

### مرحبا بالعالم

```javascript
// بناء جملة عربي قياسي
دالة رحب(الاسم) {
    ارجع "مرحباً يا " + الاسم + "!";
}

console.log(رحب("العالم"));
```

### الأصناف

```javascript
صنف شخص {
    منشئ(الاسم, العمر) {
        هذا.الاسم = الاسم;
        هذا.العمر = العمر;
    }
    
    دالة قدم_نفسك() {
        console.log("أنا " + هذا.الاسم);
    }
}

const أحمد = new شخص("أحمد", 25);
أحمد.قدم_نفسك();
```

### البرمجة المنطقية

```javascript
// حقائق
حقيقة أب("خالد", "أحمد");
حقيقة أب("أحمد", "محمد");

// قواعد
قاعدة جد(?س, ?ص) :- أب(?س, ?ع), أب(?ع, ?ص);

// استعلام
const نتيجة = query جد("خالد", ?من);
console.log(نتيجة); // [{من: "محمد"}]
```

---

## 🔀 Mixing Languages - خلط اللغات

### Example 1: Mixed Function Names

```javascript
// English function with Arabic name
function مرحبا(name) {
    return "Hello " + name;
}

// Arabic function with English name
دالة greet(الاسم) {
    ارجع "مرحباً " + الاسم;
}

// Both work!
console.log(مرحبا("Ahmed"));
console.log(greet("أحمد"));
```

### Example 2: Mixed Class

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
        if (المبلغ <= this.balance) {
            this.balance -= المبلغ;
            ارجع صحيح;
        }
        ارجع خطأ;
    }
}

const account = new حساب_بنكي("John", 1000);
account.deposit(500);
account.سحب(200);
```

### Example 3: Mixed Logic

```javascript
// English and Arabic facts together
fact city("London", "UK");
حقيقة مدينة("الرياض", "السعودية");

fact city("Paris", "France");
حقيقة مدينة("القاهرة", "مصر");

// Query works with both
const cities1 = query city(?name, "UK");
const مدن = query مدينة(?اسم, "السعودية");
```

---

## 📚 Complete Keyword Reference

### Control Flow

| English | Arabic | Description |
|---------|--------|-------------|
| `if` | `إذا` | If statement |
| `else` | `وإلا` | Else statement |
| `elif` / `elseif` | `وإلا_إذا` | Else if |
| `while` | `بينما` | While loop |
| `for` | `لكل` | For loop |
| `do` | `افعل` | Do statement |
| `break` | `اخرج` / `كسر` | Break |
| `continue` | `استمر` / `تابع` | Continue |
| `return` | `ارجع` / `إرجاع` | Return |

### Variables

| English | Arabic | Description |
|---------|--------|-------------|
| `const` | `ثابت` | Constant |
| `let` | `دع` / `ليكن` | Let |
| `var` | `متغير` | Variable |

### Functions

| English | Arabic | Description |
|---------|--------|-------------|
| `function` / `func` / `fn` | `دالة` | Function |
| `async` | `غير_متزامن` / `لامتزامن` | Async |
| `await` | `انتظر` | Await |

### OOP

| English | Arabic | Description |
|---------|--------|-------------|
| `class` | `صنف` | Class |
| `new` | `جديد` | New |
| `this` | `هذا` | This |
| `extends` | `يمتد` / `يرث` | Extends |
| `super` | `فائق` / `الأب` | Super |
| `constructor` | `منشئ` | Constructor |
| `public` | `عام` | Public |
| `private` | `خاص` | Private |
| `protected` | `محمي` | Protected |
| `static` | `ثابت_صنف` | Static |
| `abstract` | `مجرد` | Abstract |
| `interface` | `واجهة` | Interface |
| `implements` | `ينفذ` | Implements |

### Logic Programming

| English | Arabic | Description |
|---------|--------|-------------|
| `fact` | `حقيقة` | Fact |
| `rule` | `قاعدة` | Rule |
| `query` | `استعلام` | Query |
| `and` | `و` | And |
| `or` | `أو` | Or |
| `not` | `ليس` | Not |

### Hybrid

| English | Arabic | Description |
|---------|--------|-------------|
| `hybrid` / `bayan` | `هجين` / `بيان` | Hybrid block |

### Values

| English | Arabic | Description |
|---------|--------|-------------|
| `true` | `صحيح` | True |
| `false` | `خطأ` / `خاطئ` | False |
| `null` | `لاشيء` / `عدم` | Null |
| `undefined` | `غير_محدد` / `غير_معرف` | Undefined |

### Error Handling

| English | Arabic | Description |
|---------|--------|-------------|
| `try` | `حاول` | Try |
| `catch` | `اصطد` / `التقط` | Catch |
| `finally` | `أخيراً` / `أخيرا` | Finally |
| `throw` | `ارم` / `ارمي` | Throw |

---

## 🎯 Best Practices

### For International Teams

1. **Use English keywords for shared code**
   ```javascript
   // Good for international teams
   function calculateTotal(items) {
       return items.reduce((sum, item) => sum + item.price, 0);
   }
   ```

2. **Use Arabic for domain-specific logic**
   ```javascript
   // Good for Arabic business logic
   دالة احسب_الزكاة(المال) {
       ارجع المال * 0.025;
   }
   ```

3. **Mix when it makes sense**
   ```javascript
   class نظام_المبيعات {
       constructor() {
           this.sales = [];
       }
       
       addSale(sale) {
           this.sales.push(sale);
       }
       
       دالة احسب_الإجمالي() {
           return this.sales.reduce((sum, s) => sum + s.amount, 0);
       }
   }
   ```

### For Arabic Developers

- ✅ Use Arabic keywords for better readability in Arabic contexts
- ✅ Mix with English when using international libraries
- ✅ Comment in Arabic for Arabic teams

### For English Developers

- ✅ Use English keywords for familiarity
- ✅ Learn basic Arabic keywords for collaboration
- ✅ Respect Arabic naming in shared codebases

---

## 🌟 Why Bilingual?

### 1. **Accessibility**
- Makes programming accessible to Arabic speakers
- Allows English speakers to collaborate easily
- No language barrier in international teams

### 2. **Flexibility**
- Choose the language that fits your context
- Mix languages for domain-specific code
- Gradual learning curve

### 3. **Unique Capability**
- No other language offers this
- Perfect for Middle East + International teams
- Educational tool for language learning

---

## 📖 More Examples

See the `examples/` directory for complete bilingual examples:
- `bilingual-hello.bn` - Basic syntax in both languages
- `bilingual-oop.bn` - Object-oriented programming
- `bilingual-logic.bn` - Logic programming
- `bilingual-hybrid.bn` - Full hybrid example

---

## 🤝 Contributing

We welcome contributions in both English and Arabic!

- English documentation: `docs/`
- Arabic documentation: `docs/`
- Bilingual examples: `examples/bilingual-*.bn`

---

**Made with ❤️ for developers worldwide**  
**صُنع بـ ❤️ للمطورين في جميع أنحاء العالم**


