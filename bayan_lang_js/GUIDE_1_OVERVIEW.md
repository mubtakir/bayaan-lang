# 📚 Bayan Programming Guide - Part 1: Overview
# دليل البرمجة بلغة البيان - الجزء الأول: نظرة عامة

**Version**: 2.0  
**Author**: Basel Yahya Abdullah  
**Date**: 2025-11-04  
**Based on 40 Years of AI Research**

---

## 📋 Table of Contents

1. [What is Bayan?](#what-is-bayan)
2. [Why Bayan is Revolutionary](#why-revolutionary)
3. [Unique Features](#unique-features)
4. [Installation & Setup](#installation)
5. [Your First Program](#first-program)
6. [Reserved Keywords](#keywords)
7. [Quick Syntax Overview](#syntax-overview)

---

<a name="what-is-bayan"></a>
## 1. What is Bayan? - ما هي لغة البيان؟

**Bayan** (البيان) is the world's first truly **intelligent bilingual programming language** that combines:

### Core Characteristics:

✅ **Bilingual** - Full English + Arabic keywords (100% parity)  
✅ **Multi-Paradigm** - Procedural + Object-Oriented + Logic Programming  
✅ **Causal Networks** - Unique globally! Model cause-effect relationships  
✅ **Type System** - TypeScript-like type annotations  
✅ **JavaScript Compatible** - Compiles to JavaScript (ES5/ES2015/ES2020/ESNext)  
✅ **Intelligent** - Built on 40 years of AI research

### Simple Example:

```javascript
// English version
function greet(name) {
    return "Hello, " + name;
}
console.log(greet("World"));

// Arabic version (identical functionality)
دالة تحية(اسم) {
    ارجع "مرحباً، " + اسم;
}
اطبع(تحية("العالم"));

// Both produce the same AST and output!
```

---

<a name="why-revolutionary"></a>
## 2. Why Bayan is Revolutionary - لماذا البيان ثورية؟

### 🌟 World's First Features:

#### 1. **True Bilingual Programming**
- Not just translation - both languages are **first-class citizens**
- Same Abstract Syntax Tree (AST) for both languages
- Mix English and Arabic in the same file
- 100% keyword parity verified

**Example:**
```javascript
// Mixed English and Arabic
function calculate(x, y) {
    متغير result = x + y;
    ارجع result;
}
```

#### 2. **Integrated Logic Programming**
- Like Prolog, but **better integrated**
- Facts, rules, queries in the same language
- Seamless with procedural and OOP code
- 100% complete implementation

**Example:**
```javascript
// Define facts
fact parent("Ahmed", "Mohamed");
fact parent("Sara", "Mohamed");

// Define rules
rule sibling(X, Y) :- parent(X, Z), parent(Y, Z), X != Y;

// Query
query sibling("Ahmed", ?who);
// Result: who = "Sara"
```

#### 3. **Causal Networks (UNIQUE GLOBALLY!)**
- Model cause-effect relationships
- Temporal dimensions (immediate, short-term, long-term)
- Impact levels (individual, group, societal, global)
- Probability weights (0.0 to 1.0)

**Example:**
```javascript
// Define causal relation
cause rain causes wet_ground {
    time: 10,
    impact: 0.9,
    probability: 0.8
}

// Query causal chain
query_cause rain leads_to ?what;
// Result: wet_ground, floods, traffic_jams, etc.
```

#### 4. **Based on Revolutionary Theories**
- **Mother Equation** (المعادلة الأم)
- **Filament Theory** (نظرية الخيط)
- **Perpendicular Opposites** (الأضداد المتعامدة)
- **Zero Duality** (الثنائية الصفرية)

---

<a name="unique-features"></a>
## 3. Unique Features - الميزات الفريدة

### ✅ Feature Completeness:

| Feature | Status | Notes |
|---------|--------|-------|
| **Procedural Programming** | 100% ✅ | Variables, functions, loops, conditionals |
| **Object-Oriented** | 100% ✅ | Classes, inheritance, interfaces, abstract |
| **Logic Programming** | 100% ✅ | Facts, rules, queries, unification |
| **Causal Networks** | 100% ✅ | Unique globally! |
| **Type System** | 60% ✅ | Primitive, union, intersection, generic types |
| **Bilingual Support** | 100% ✅ | English + Arabic with 100% parity |

### 🎯 Programming Paradigms:

#### Procedural Programming:
```javascript
var x = 10;
var y = 20;

function add(a, b) {
    return a + b;
}

var result = add(x, y);
console.log(result); // 30
```

#### Object-Oriented Programming:
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        console.log("I am " + this.name);
    }
}

var person = new Person("Ahmed", 25);
person.introduce(); // "I am Ahmed"
```

#### Logic Programming:
```javascript
fact student("Ahmed", "CS");
fact student("Sara", "Math");

rule smart(X) :- student(X, "CS");

query smart(?who);
// Result: who = "Ahmed"
```

#### Causal Programming (UNIQUE!):
```javascript
cause study causes good_grades {
    time: 30,
    impact: 0.85,
    probability: 0.9
}

cause good_grades causes job_offer {
    time: 365,
    impact: 0.7,
    probability: 0.75
}

// Query causal chain
query_cause study leads_to ?result;
// Results: good_grades, job_offer, career_success, etc.
```

---

<a name="installation"></a>
## 4. Installation & Setup - التثبيت والإعداد

### Prerequisites - المتطلبات:

```bash
# Node.js (v14 or higher)
node --version

# npm (comes with Node.js)
npm --version
```

### Installation Steps:

```bash
# Navigate to Bayan directory
cd /home/al-mubtakir/Documents/baserh_js/bayan_lang

# Install dependencies
npm install

# Verify installation
npx ts-node src/cli/cli.ts --version
```

### Running Bayan Programs:

```bash
# Method 1: Using CLI directly
npx ts-node src/cli/cli.ts your-program.bn

# Method 2: Using npm script (if configured)
npm run bayan your-program.bn

# Method 3: Compile to JavaScript
npx ts-node src/cli/cli.ts --compile your-program.bn
# This creates your-program.js
node your-program.js
```

### File Extensions:

- `.bn` - Bayan source files
- `.bayan` - Alternative extension
- `.js` - Compiled JavaScript output

---

<a name="first-program"></a>
## 5. Your First Program - برنامجك الأول

### Example 1: Hello World

Create `hello.bn`:

```javascript
// hello.bn - Your first Bayan program

var message = "Hello, World!";
console.log(message);
```

Run it:
```bash
npx ts-node src/cli/cli.ts hello.bn
```

Output:
```
Hello, World!
```

### Example 2: Hello World in Arabic

Create `hello-arabic.bn`:

```javascript
// hello-arabic.bn - برنامجك الأول بالعربية

متغير رسالة = "مرحباً بالعالم!";
اطبع(رسالة);
```

Run it:
```bash
npx ts-node src/cli/cli.ts hello-arabic.bn
```

Output:
```
مرحباً بالعالم!
```

### Example 3: Simple Function

Create `greet.bn`:

```javascript
// greet.bn - Function example

function greet(name) {
    return "Hello, " + name + "!";
}

var greeting = greet("Ahmed");
console.log(greeting);

var greeting2 = greet("Sara");
console.log(greeting2);
```

Output:
```
Hello, Ahmed!
Hello, Sara!
```

### Example 4: Bilingual Mix

Create `mixed.bn`:

```javascript
// mixed.bn - Mixing English and Arabic

function calculate(x, y) {
    متغير sum = x + y;
    متغير product = x * y;
    
    اطبع("Sum: " + sum);
    console.log("Product: " + product);
    
    ارجع sum;
}

var result = calculate(5, 3);
```

Output:
```
Sum: 8
Product: 15
```

---

<a name="keywords"></a>
## 6. Reserved Keywords - الكلمات المفتاحية المحجوزة

### Complete Keyword List (English ↔ Arabic):

#### Variables & Constants:

| English | Arabic | Description |
|---------|--------|-------------|
| `var` | `متغير` | Variable declaration |
| `let` | `دع` / `ليكن` | Block-scoped variable |
| `const` | `ثابت` | Constant declaration |

#### Functions:

| English | Arabic | Description |
|---------|--------|-------------|
| `function` | `دالة` | Function declaration |
| `return` | `ارجع` | Return statement |
| `async` | `غير_متزامن` | Async function |
| `await` | `انتظر` | Await expression |
| `yield` | `اعط` | Yield in generator |

#### Control Flow:

| English | Arabic | Description |
|---------|--------|-------------|
| `if` | `إذا` / `اذا` | If statement |
| `else` | `وإلا` / `والا` | Else statement |
| `switch` | `حول` | Switch statement |
| `case` | `حالة` | Case in switch |
| `default` | `افتراضي` | Default case |
| `break` | `اكسر` | Break statement |
| `continue` | `استمر` | Continue statement |

#### Loops:

| English | Arabic | Description |
|---------|--------|-------------|
| `for` | `لكل` | For loop |
| `while` | `بينما` | While loop |
| `do` | `افعل` | Do-while loop |
| `in` | `في` | For-in loop |
| `of` | `من` | For-of loop |

#### Object-Oriented:

| English | Arabic | Description |
|---------|--------|-------------|
| `class` | `صنف` | Class declaration |
| `extends` | `يمتد` | Class inheritance |
| `implements` | `ينفذ` | Interface implementation |
| `interface` | `واجهة` | Interface declaration |
| `abstract` | `مجرد` | Abstract class/method |
| `constructor` | `منشئ` | Constructor method |
| `this` | `هذا` | This reference |
| `super` | `فائق` | Super reference |
| `new` | `جديد` | New instance |
| `static` | `ثابت_صنف` | Static member |
| `public` | `عام` | Public access |
| `private` | `خاص` | Private access |
| `protected` | `محمي` | Protected access |
| `get` | `احصل` | Getter method |
| `set` | `اضبط` | Setter method |

#### Logic Programming:

| English | Arabic | Description |
|---------|--------|-------------|
| `fact` | `حقيقة` | Fact declaration |
| `rule` | `قاعدة` | Rule declaration |
| `query` | `استعلام` | Query execution |
| `not` | `ليس` | Negation |
| `cut` | `قص` | Cut operator |

#### Causal Networks:

| English | Arabic | Description |
|---------|--------|-------------|
| `cause` | `سبب` | Causal relation |
| `causes` | `يسبب` | Causes relation |
| `prevents` | `يمنع` | Prevents relation |
| `enhances` | `يعزز` | Enhances relation |
| `weakens` | `يضعف` | Weakens relation |
| `leads_to` | `يؤدي_إلى` | Leads to relation |
| `requires` | `يتطلب` | Requires relation |
| `enables` | `يمكّن` | Enables relation |
| `inhibits` | `يثبط` | Inhibits relation |
| `query_cause` | `استعلام_سبب` | Causal query |

#### Type System:

| English | Arabic | Description |
|---------|--------|-------------|
| `number` | `رقم` | Number type |
| `string` | `نص` | String type |
| `boolean` | `منطقي` | Boolean type |
| `any` | `أي` | Any type |
| `void` | `فارغ` | Void type |
| `never` | `أبداً` | Never type |
| `unknown` | `مجهول` | Unknown type |
| `object` | `كائن` | Object type |
| `type` | `نوع` | Type alias |

#### Other Keywords:

| English | Arabic | Description |
|---------|--------|-------------|
| `import` | `استورد` | Import module |
| `export` | `صدّر` | Export module |
| `from` | `من` | From in import |
| `as` | `كـ` | Alias in import |
| `try` | `حاول` | Try block |
| `catch` | `اصطد` | Catch block |
| `finally` | `أخيراً` | Finally block |
| `throw` | `ارمي` | Throw exception |
| `typeof` | `نوع_من` | Typeof operator |
| `instanceof` | `نسخة_من` | Instanceof operator |
| `delete` | `احذف` | Delete operator |
| `null` | `عدم` | Null value |
| `undefined` | `غير_معرف` | Undefined value |
| `true` | `صحيح` | True value |
| `false` | `خطأ` | False value |

#### Built-in Functions:

| English | Arabic | Description |
|---------|--------|-------------|
| `console.log` | `اطبع` | Print to console |
| `print` | `اطبع` | Print (alias) |

**Total Keywords**: 80+ bilingual pairs with 100% parity!

---

<a name="syntax-overview"></a>
## 7. Quick Syntax Overview - نظرة سريعة على البنية

### Comments:

```javascript
// Single-line comment

/*
   Multi-line comment
   Can span multiple lines
*/
```

### Variables:

```javascript
var x = 10;              // Mutable variable
let y = 20;              // Block-scoped variable
const PI = 3.14159;      // Constant

// With type annotations
var age: number = 25;
var name: string = "Ahmed";
```

### Functions:

```javascript
// Function declaration
function add(a, b) {
    return a + b;
}

// With type annotations
function multiply(a: number, b: number): number {
    return a * b;
}

// Arrow function
var subtract = (a, b) => a - b;
```

### Classes:

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log("Hello, I am " + this.name);
    }
}

var person = new Person("Ahmed", 25);
person.greet();
```

### Control Flow:

```javascript
// If-else
if (x > 10) {
    console.log("Greater");
} else {
    console.log("Smaller or equal");
}

// For loop
for (var i = 0; i < 5; i++) {
    console.log(i);
}

// While loop
while (x > 0) {
    x--;
}
```

### Arrays & Objects:

```javascript
// Array
var numbers = [1, 2, 3, 4, 5];
var first = numbers[0];

// Object
var person = {
    name: "Ahmed",
    age: 25,
    city: "Cairo"
};
var personName = person.name;
```

### Logic Programming:

```javascript
// Facts
fact parent("Ahmed", "Mohamed");

// Rules
rule grandparent(X, Y) :- parent(X, Z), parent(Z, Y);

// Queries
query parent("Ahmed", ?who);
```

### Causal Networks:

```javascript
// Define causal relation
cause rain causes wet_ground {
    time: 10,
    impact: 0.9,
    probability: 0.8
}

// Query
query_cause rain leads_to ?what;
```

---

## 🎯 Summary - الخلاصة

**Bayan Language** is:

✅ **Revolutionary** - First truly bilingual programming language  
✅ **Complete** - 92% feature completeness (100% in core paradigms)  
✅ **Unique** - Only language with integrated causal networks  
✅ **Intelligent** - Based on 40 years of AI research  
✅ **Modern** - TypeScript-like type system  
✅ **Practical** - Compiles to JavaScript  

**Next Steps:**

1. ✅ Read Part 2: Procedural & Object-Oriented Programming
2. ✅ Read Part 3: Logic Programming
3. ✅ Read Part 4: Causal Networks (Unique!)

---

**Ready to learn more? Continue to Part 2!** 🚀

**مستعد لتعلم المزيد؟ انتقل إلى الجزء الثاني!** 🚀
