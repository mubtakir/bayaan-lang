# 🌐 Bayan Web Examples - أمثلة الويب للبيان

This directory contains examples of using Bayan in web applications.

هذا المجلد يحتوي على أمثلة لاستخدام البيان في تطبيقات الويب.

---

## 🌟 Featured Example - المثال المميز

### 🌳 **Intelligent Family Tree - شجرة العائلة الذكية**

**The most impressive Bayan example that's impossible to replicate in pure JavaScript!**

**المثال الأكثر إبهاراً للبيان والذي يستحيل تكراره في JavaScript النقية!**

#### 🎯 What Makes It Unique - ما يجعله فريداً

This example showcases Bayan's **hybrid paradigm** - the ability to seamlessly combine three programming paradigms in one file:

1. **🧠 Logic Programming** - Define family relationships using Prolog-style facts and rules
2. **🎨 Object-Oriented** - Person and Component classes for clean architecture
3. **⚡ Procedural** - Direct DOM manipulation and event handling

**No other web programming language can do this natively!**

#### 🚀 Try It Now - جربه الآن

```bash
# Option 1: Open directly (demo version works immediately)
open intelligent-family-tree.html

# Option 2: Compile and run (full Bayan version)
bayan compile intelligent-family-tree.bn -o intelligent-family-tree.js
# Then open intelligent-family-tree.html in browser
```

#### ✨ Features - الميزات

- ✅ **Automatic Relationship Inference** - Define parents once, get grandparents, uncles, cousins, ancestors automatically!
- ✅ **Bilingual Interface** - Switch between English and Arabic
- ✅ **Interactive Visualization** - Click on any person to see all their relationships
- ✅ **Logic Rules** - 10+ family relationship rules (grandparent, sibling, uncle, aunt, cousin, ancestor, etc.)
- ✅ **Beautiful UI** - Modern gradient design with smooth animations
- ✅ **Impossible in Pure JS** - Would require external Prolog libraries!

#### 🧠 The Logic Programming Magic

In Bayan, you define simple facts:

```javascript
fact parent("Ahmed", "Fatima");
fact parent("Ahmed", "Ali");
fact parent("Fatima", "Omar");
```

And rules:

```javascript
rule grandparent(?gp, ?gc) :- parent(?gp, ?p), parent(?p, ?gc);
rule uncle(?u, ?n) :- parent(?p, ?n), brother(?u, ?p);
rule ancestor(?a, ?d) :- parent(?a, ?d);
rule ancestor(?a, ?d) :- parent(?a, ?x), ancestor(?x, ?d);
```

**The system automatically infers:**
- Ahmed is Omar's grandparent
- Ali is Omar's uncle
- Ahmed is ancestor of all descendants

**In JavaScript, you'd need:**
- Manual loops and conditionals
- Complex recursive functions
- External Prolog libraries (tau-prolog, etc.)
- Hundreds of lines of code!

**In Bayan: Just define facts and rules!** 🎉

---

---

## 📁 Examples - الأمثلة

### 1. Counter App - تطبيق العداد

**Files:**
- `counter.bn` - Bayan source code
- `counter.html` - HTML page

**Description:**
A simple counter application demonstrating:
- ✅ DOM manipulation
- ✅ Event handling
- ✅ Bilingual code (English + Arabic)
- ✅ Class-based architecture

**How to use:**

```bash
# Method 1: Use the demo HTML (works immediately)
# Just open counter.html in your browser

# Method 2: Compile and use (recommended for production)
bayan compile counter.bn -o counter.js
# Then uncomment the script tag in counter.html
```

---

## 🚀 Quick Start - بداية سريعة

### Option 1: Direct Browser (Demo)

Just open any `.html` file in your browser. The demo versions have inline JavaScript for immediate testing.

```bash
# Linux/macOS
open counter.html

# Windows
start counter.html
```

### Option 2: Compile First (Production)

```bash
# 1. Compile Bayan to JavaScript
bayan compile counter.bn -o counter.js

# 2. Update HTML to use compiled file
# Edit counter.html and uncomment:
# <script src="counter.js"></script>

# 3. Serve with HTTP server
python3 -m http.server 8000
# Or
npx http-server

# 4. Open browser
# http://localhost:8000/counter.html
```

---

## 📖 How It Works - كيف يعمل

### Step-by-Step Process:

1. **Write Bayan Code** (`.bn` file)
   ```javascript
   class Counter {
       constructor() {
           this.count = 0;
       }
       increment() {
           this.count = this.count + 1;
       }
   }
   ```

2. **Compile to JavaScript**
   ```bash
   bayan compile counter.bn -o counter.js
   ```

3. **Include in HTML**
   ```html
   <script src="counter.js"></script>
   ```

4. **Use in Browser**
   - The compiled JavaScript runs like any other JS file
   - All browser APIs work normally
   - DOM manipulation works as expected

---

## 🎯 What You Can Do - ما يمكنك فعله

### ✅ Fully Supported - مدعوم بالكامل

- ✅ **DOM Manipulation** - التعامل مع DOM
  ```javascript
  const element = document.getElementById("myId");
  element.textContent = "Hello!";
  ```

- ✅ **Event Handling** - معالجة الأحداث
  ```javascript
  button.onclick = function() {
      console.log("Clicked!");
  };
  ```

- ✅ **Fetch API** - واجهة Fetch
  ```javascript
  async function getData() {
      const response = await fetch("/api/data");
      const data = await response.json();
      return data;
  }
  ```

- ✅ **LocalStorage** - التخزين المحلي
  ```javascript
  localStorage.setItem("key", "value");
  const value = localStorage.getItem("key");
  ```

- ✅ **Timers** - المؤقتات
  ```javascript
  setTimeout(function() {
      console.log("Delayed!");
  }, 1000);
  ```

- ✅ **Classes and OOP** - الأصناف والبرمجة الكائنية
  ```javascript
  class MyComponent {
      constructor() {
          this.state = {};
      }
  }
  ```

---

## 🛠️ Development Workflow - سير العمل التطويري

### For Development:

```bash
# Watch mode (recompile on changes)
bayan compile counter.bn -o counter.js --watch

# In another terminal, run HTTP server
npx http-server -c-1
```

### For Production:

```bash
# Compile with optimizations
bayan compile counter.bn -o counter.js --minify

# Or use build tools (webpack, vite, etc.)
```

---

## 📚 More Examples Coming Soon - المزيد من الأمثلة قريباً

- [ ] Todo App - تطبيق المهام
- [ ] Form Validation - التحقق من النماذج
- [ ] API Integration - تكامل API
- [ ] Interactive Game - لعبة تفاعلية
- [ ] Chart Visualization - تصور البيانات
- [ ] Real-time Chat - دردشة فورية

---

## 💡 Tips - نصائح

### 1. Use Build Tools for Large Projects

For complex applications, use webpack or vite:

```bash
# With Vite
npm create vite@latest my-app
# Then compile Bayan files and import them
```

### 2. Organize Your Code

```
project/
├── src/
│   ├── components/
│   │   ├── counter.bn
│   │   └── todo.bn
│   ├── utils/
│   │   └── helpers.bn
│   └── app.bn
├── dist/
│   └── bundle.js
└── index.html
```

### 3. Use Modules

```javascript
// utils.bn
export function formatDate(date) {
    return date.toLocaleDateString();
}

// app.bn
import { formatDate } from './utils.js';
```

### 4. Debug Compiled Code

The compiled JavaScript is readable and debuggable:
- Use browser DevTools
- Set breakpoints in compiled code
- Console.log works normally

---

## 🔗 Related Documentation - التوثيق ذو الصلة

- **[Web Usage Guide](../../docs/WEB_USAGE.md)** - Complete guide for using Bayan in web
- **[Installation Guide](../../docs/INSTALLATION_AND_USAGE.md)** - Setup and installation
- **[Bilingual Guide](../../docs/BILINGUAL_GUIDE.md)** - Language reference

---

## ❓ FAQ - الأسئلة الشائعة

### Q: Can I use Bayan directly in `<script>` tags?
**A:** Not yet. You must compile to JavaScript first. Browser runtime is planned for future releases.

### Q: Does it work with React/Vue/Angular?
**A:** Yes! Compile Bayan to JavaScript, then use it like any other JS module.

### Q: Can I use npm packages?
**A:** Yes! Import them in your Bayan code after compilation.

### Q: Is there a performance penalty?
**A:** No! Bayan compiles to clean JavaScript. Performance is identical to hand-written JS.

### Q: Can I debug Bayan code?
**A:** Currently you debug the compiled JavaScript. Source maps support is coming soon.

---

<div align="center">

## 🌟 Start Building Web Apps with Bayan! 🌟
## 🌟 ابدأ ببناء تطبيقات الويب بالبيان! 🌟

**Bayan works everywhere JavaScript works!**  
**البيان تعمل في كل مكان تعمل فيه JavaScript!**

</div>

