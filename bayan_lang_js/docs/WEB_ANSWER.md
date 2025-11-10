# 🌐 إجابة سؤال: استخدام البيان في HTML

## ❓ السؤال الأصلي - Original Question

> **"هل يمكنني استخدام لغة البيان كبديل لجافا سكريبت في ملف HTML؟"**
>
> **"Can I use Bayan language as a replacement for JavaScript in HTML files?"**

---

## ✅ الإجابة المختصرة - Short Answer

### نعم، يمكنك ذلك! - Yes, You Can!

**البيان تعمل في كل مكان تعمل فيه JavaScript!**  
**Bayan works everywhere JavaScript works!**

لكن يجب ترجمة كود البيان إلى JavaScript أولاً، ثم استخدامه في HTML.

But you must compile Bayan code to JavaScript first, then use it in HTML.

---

## 🎯 الطريقة - The Method

### خطوات بسيطة - Simple Steps:

```bash
# 1. اكتب كود البيان
# Write Bayan code
code myapp.bn

# 2. ترجمه إلى JavaScript
# Compile to JavaScript
bayan compile myapp.bn -o myapp.js

# 3. استخدمه في HTML
# Use in HTML
<script src="myapp.js"></script>
```

---

## 💡 مثال عملي كامل - Complete Practical Example

### 1. ملف البيان - Bayan File

**File: `counter.bn`**

```javascript
// Bilingual Counter - عداد ثنائي اللغة

class Counter {
    constructor() {
        this.count = 0;
    }
    
    increment() {
        this.count = this.count + 1;
        this.updateDisplay();
    }
    
    decrement() {
        this.count = this.count - 1;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const display = document.getElementById("counter");
        display.textContent = this.count;
    }
}

// النسخة العربية - Arabic Version
صنف عداد {
    منشئ() {
        هذا.العدد = 0;
    }
    
    دالة زيادة() {
        هذا.العدد = هذا.العدد + 1;
        هذا.حدث_العرض();
    }
    
    دالة حدث_العرض() {
        const عرض = document.getElementById("counter");
        عرض.textContent = هذا.العدد;
    }
}

// Initialize
function init() {
    const counter = new Counter();
    
    document.getElementById("btn-inc").onclick = function() {
        counter.increment();
    };
    
    document.getElementById("btn-dec").onclick = function() {
        counter.decrement();
    };
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
```

### 2. ترجمة - Compilation

```bash
bayan compile counter.bn -o counter.js
```

### 3. ملف HTML - HTML File

**File: `index.html`**

```html
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>Bayan Counter - عداد البيان</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        #counter {
            font-size: 72px;
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
        }
        
        button {
            padding: 15px 30px;
            font-size: 18px;
            margin: 10px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            background: white;
            color: #667eea;
            font-weight: bold;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body>
    <h1>🌍 Bayan Counter - عداد البيان</h1>
    
    <div id="counter">0</div>
    
    <button id="btn-dec">➖ Decrease - نقصان</button>
    <button id="btn-inc">➕ Increase - زيادة</button>
    
    <p style="margin-top: 50px;">
        Built with Bayan Programming Language<br>
        مبني بلغة البيان البرمجية
    </p>
    
    <!-- Include compiled JavaScript -->
    <script src="counter.js"></script>
</body>
</html>
```

### 4. تشغيل - Running

```bash
# Option 1: Python HTTP server
python3 -m http.server 8000

# Option 2: Node.js HTTP server
npx http-server

# Option 3: VS Code Live Server
# Right-click on index.html -> "Open with Live Server"

# Then open browser:
# http://localhost:8000
```

---

## ✅ ما يمكنك فعله - What You Can Do

### جميع ميزات JavaScript متاحة - All JavaScript Features Available:

| الميزة | Feature | مثال | Example |
|--------|---------|------|---------|
| ✅ DOM | DOM Manipulation | `document.getElementById()` | ✅ |
| ✅ الأحداث | Events | `button.onclick = ...` | ✅ |
| ✅ Fetch | API Calls | `await fetch(url)` | ✅ |
| ✅ التخزين | LocalStorage | `localStorage.setItem()` | ✅ |
| ✅ المؤقتات | Timers | `setTimeout()` | ✅ |
| ✅ الأصناف | Classes | `class MyClass {}` | ✅ |
| ✅ الوحدات | Modules | `import/export` | ✅ |
| ✅ Async | Async/Await | `async function` | ✅ |

---

## 📦 أمثلة جاهزة - Ready Examples

### تم إنشاء أمثلة عملية في - Created Practical Examples in:

```
examples/web/
├── counter.bn          # Bayan source code
├── counter.html        # HTML page (ready to use!)
└── README.md           # Complete guide
```

### جرّب الآن - Try Now:

```bash
# 1. افتح المثال مباشرة
# Open example directly
cd examples/web
open counter.html  # macOS
# or
xdg-open counter.html  # Linux
# or
start counter.html  # Windows

# 2. أو ترجم وشغّل
# Or compile and run
bayan compile counter.bn -o counter.js
python3 -m http.server 8000
# Open: http://localhost:8000/counter.html
```

---

## 🛠️ استخدام متقدم - Advanced Usage

### مع أدوات البناء - With Build Tools

#### Webpack:

```bash
# 1. Install
npm install --save-dev webpack webpack-cli

# 2. Compile Bayan
bayan compile src/app.bn -o src/app.js

# 3. Bundle
npx webpack
```

#### Vite:

```bash
# 1. Create project
npm create vite@latest my-app

# 2. Compile Bayan files
bayan compile src/app.bn -o src/app.js

# 3. Import in main.js
import './app.js';

# 4. Run
npm run dev
```

---

## 📚 التوثيق الكامل - Complete Documentation

### للمزيد من التفاصيل - For More Details:

1. **[دليل استخدام الويب الكامل](./docs/WEB_USAGE.md)**
   - شرح مفصل لجميع الطرق
   - أمثلة متقدمة
   - استخدام أدوات البناء
   - حل المشاكل

2. **[أمثلة الويب](./examples/web/README.md)**
   - أمثلة عملية جاهزة
   - كود قابل للتشغيل مباشرة
   - شروحات مفصلة

3. **[دليل التثبيت](./docs/INSTALLATION_AND_USAGE.md)**
   - كيفية تثبيت البيان
   - إعداد بيئة التطوير

---

## ⚠️ ملاحظات مهمة - Important Notes

### ✅ مدعوم حالياً - Currently Supported:

1. ✅ **الترجمة المسبقة** - Pre-compilation to JavaScript
2. ✅ **جميع واجهات المتصفح** - All browser APIs
3. ✅ **أدوات البناء** - Build tools (webpack, vite, etc.)
4. ✅ **الوحدات** - ES modules and CommonJS

### ⏳ قيد التطوير - In Development:

1. ⏳ **`<script type="text/bayan">`** - Direct Bayan in HTML
2. ⏳ **Browser Runtime** - In-browser compilation
3. ⏳ **Source Maps** - Debug original Bayan code
4. ⏳ **VS Code Extension** - Auto-compile on save

---

## 🎯 الخلاصة - Summary

### للمطور الذي سأل - For the Developer Who Asked:

#### ✅ نعم، يمكنك استخدام البيان في HTML!

**الطريقة:**
1. اكتب كود البيان (`.bn`)
2. ترجمه إلى JavaScript (`bayan compile`)
3. استخدم الملف المترجم في HTML (`<script src="...">`)

#### ✅ Yes, you can use Bayan in HTML!

**The Method:**
1. Write Bayan code (`.bn`)
2. Compile to JavaScript (`bayan compile`)
3. Use compiled file in HTML (`<script src="...">`)

---

### 🚀 ابدأ الآن - Start Now:

```bash
# 1. جرّب المثال الجاهز
# Try the ready example
cd examples/web
open counter.html

# 2. أو أنشئ تطبيقك الخاص
# Or create your own app
echo 'class MyApp { ... }' > myapp.bn
bayan compile myapp.bn -o myapp.js
# Use myapp.js in your HTML
```

---

## 📞 موارد إضافية - Additional Resources

| المورد | الرابط | الوصف |
|--------|--------|-------|
| **دليل الويب الكامل** | [docs/WEB_USAGE.md](./docs/WEB_USAGE.md) | شرح شامل |
| **أمثلة الويب** | [examples/web/](./examples/web/) | أمثلة عملية |
| **دليل البيان** | [docs/BILINGUAL_GUIDE.md](./docs/BILINGUAL_GUIDE.md) | مرجع اللغة |
| **التثبيت** | [docs/INSTALLATION_AND_USAGE.md](./docs/INSTALLATION_AND_USAGE.md) | كيفية البدء |

---

<div align="center">

# 🎉 البيان تعمل في الويب! 🎉
# 🎉 Bayan Works on the Web! 🎉

## ✅ اكتب بالعربية أو الإنجليزية
## ✅ Write in Arabic or English

## ✅ ترجم إلى JavaScript
## ✅ Compile to JavaScript

## ✅ استخدم في أي متصفح
## ✅ Use in Any Browser

---

**🌍 Bayan: Code in Your Language, Run Everywhere!**  
**🌍 البيان: ابرمج بلغتك، شغّل في كل مكان!**

</div>

