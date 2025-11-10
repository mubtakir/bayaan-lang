# 🌐 Using Bayan in HTML - استخدام البيان في HTML

## ❓ السؤال - The Question

> "هل يمكنني استخدام لغة البيان كبديل لجافا سكريبت في ملف HTML؟"
> 
> "Can I use Bayan language as a replacement for JavaScript in HTML files?"

## ✅ الإجابة المختصرة - Short Answer

**نعم، يمكنك ذلك! - Yes, you can!**

لكن البيان تُترجم إلى JavaScript أولاً، ثم تُستخدم في HTML. هناك طريقتان:

But Bayan compiles to JavaScript first, then is used in HTML. There are two methods:

1. **Pre-compilation** - ترجمة مسبقة (الطريقة الموصى بها)
2. **Runtime compilation** - ترجمة وقت التشغيل (قيد التطوير)

---

## 🎯 Method 1: Pre-compilation (Recommended) - الترجمة المسبقة

### الخطوة 1: اكتب كود البيان - Step 1: Write Bayan Code

**File: `app.bn`**

```javascript
// Bilingual web app - تطبيق ويب ثنائي اللغة

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
    
    reset() {
        this.count = 0;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const display = document.getElementById("counter-display");
        if (display) {
            display.textContent = this.count;
        }
    }
}

// Arabic version - النسخة العربية
صنف عداد {
    منشئ() {
        هذا.العدد = 0;
    }
    
    دالة زيادة() {
        هذا.العدد = هذا.العدد + 1;
        هذا.حدث_العرض();
    }
    
    دالة نقصان() {
        هذا.العدد = هذا.العدد - 1;
        هذا.حدث_العرض();
    }
    
    دالة إعادة_تعيين() {
        هذا.العدد = 0;
        هذا.حدث_العرض();
    }
    
    دالة حدث_العرض() {
        const عرض = document.getElementById("counter-display");
        if (عرض) {
            عرض.textContent = هذا.العدد;
        }
    }
}

// Initialize when page loads
function initApp() {
    const counter = new Counter();
    
    document.getElementById("btn-increment").onclick = function() {
        counter.increment();
    };
    
    document.getElementById("btn-decrement").onclick = function() {
        counter.decrement();
    };
    
    document.getElementById("btn-reset").onclick = function() {
        counter.reset();
    };
}

// Wait for DOM to load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
```

### الخطوة 2: ترجم إلى JavaScript - Step 2: Compile to JavaScript

```bash
bayan compile app.bn -o app.js
```

### الخطوة 3: استخدم في HTML - Step 3: Use in HTML

**File: `index.html`**

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bayan Web App - تطبيق ويب البيان</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            margin-bottom: 30px;
        }
        
        #counter-display {
            font-size: 72px;
            font-weight: bold;
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
        }
        
        .buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 30px;
        }
        
        button {
            padding: 15px 30px;
            font-size: 18px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            background: white;
            color: #667eea;
            font-weight: bold;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .footer {
            margin-top: 40px;
            font-size: 14px;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌍 Bayan Counter - عداد البيان</h1>
        
        <div id="counter-display">0</div>
        
        <div class="buttons">
            <button id="btn-decrement">➖ Decrease - نقصان</button>
            <button id="btn-reset">🔄 Reset - إعادة تعيين</button>
            <button id="btn-increment">➕ Increase - زيادة</button>
        </div>
        
        <div class="footer">
            <p>Built with Bayan Programming Language</p>
            <p>مبني بلغة البيان البرمجية</p>
        </div>
    </div>
    
    <!-- Include the compiled JavaScript -->
    <script src="app.js"></script>
</body>
</html>
```

### الخطوة 4: شغّل في المتصفح - Step 4: Run in Browser

```bash
# Option 1: Simple HTTP server with Python
python3 -m http.server 8000

# Option 2: Simple HTTP server with Node.js
npx http-server

# Option 3: Use VS Code Live Server extension
# Right-click on index.html -> "Open with Live Server"
```

ثم افتح المتصفح على: `http://localhost:8000`

---

## 🚀 Method 2: Using Build Tools - استخدام أدوات البناء

### مع Webpack - With Webpack

**Step 1: Install dependencies**

```bash
npm install --save-dev webpack webpack-cli
```

**Step 2: Create webpack config**

**File: `webpack.config.js`**

```javascript
const path = require('path');

module.exports = {
  entry: './src/app.bn.js', // Your compiled Bayan file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
};
```

**Step 3: Build**

```bash
# First compile Bayan to JS
bayan compile src/app.bn -o src/app.bn.js

# Then bundle with webpack
npx webpack
```

**Step 4: Use in HTML**

```html
<script src="dist/bundle.js"></script>
```

---

### مع Vite - With Vite

**Step 1: Create Vite project**

```bash
npm create vite@latest my-bayan-app -- --template vanilla
cd my-bayan-app
npm install
```

**Step 2: Compile Bayan files**

```bash
# Compile your Bayan code
bayan compile src/app.bn -o src/app.js
```

**Step 3: Import in main.js**

```javascript
import './app.js';
```

**Step 4: Run dev server**

```bash
npm run dev
```

---

## 🎨 Complete Example: Todo App - مثال كامل: تطبيق المهام

### File: `todo.bn`

```javascript
// Bilingual Todo App - تطبيق المهام ثنائي اللغة

class TodoApp {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    
    addTodo(text) {
        const todo = {
            id: this.nextId,
            text: text,
            completed: false
        };
        this.todos.push(todo);
        this.nextId = this.nextId + 1;
        this.render();
    }
    
    toggleTodo(id) {
        let i = 0;
        while (i < this.todos.length) {
            if (this.todos[i].id === id) {
                this.todos[i].completed = !this.todos[i].completed;
                break;
            }
            i = i + 1;
        }
        this.render();
    }
    
    deleteTodo(id) {
        let newTodos = [];
        let i = 0;
        while (i < this.todos.length) {
            if (this.todos[i].id !== id) {
                newTodos.push(this.todos[i]);
            }
            i = i + 1;
        }
        this.todos = newTodos;
        this.render();
    }
    
    render() {
        const list = document.getElementById("todo-list");
        list.innerHTML = "";
        
        let i = 0;
        while (i < this.todos.length) {
            const todo = this.todos[i];
            const li = document.createElement("li");
            li.className = todo.completed ? "completed" : "";
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.onclick = () => this.toggleTodo(todo.id);
            
            const span = document.createElement("span");
            span.textContent = todo.text;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑️";
            deleteBtn.onclick = () => this.deleteTodo(todo.id);
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            list.appendChild(li);
            
            i = i + 1;
        }
    }
}

// Initialize app
let app;

function initTodoApp() {
    app = new TodoApp();
    
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    
    addBtn.onclick = function() {
        const text = input.value.trim();
        if (text) {
            app.addTodo(text);
            input.value = "";
        }
    };
    
    input.onkeypress = function(e) {
        if (e.key === "Enter") {
            addBtn.click();
        }
    };
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTodoApp);
} else {
    initTodoApp();
}
```

### Compile and use:

```bash
# Compile
bayan compile todo.bn -o todo.js

# Create HTML file (see below)
# Open in browser
```

---

## 📦 Creating a Bayan Web Library - إنشاء مكتبة ويب

You can compile Bayan code into a reusable library:

```bash
# Compile with module export
bayan compile mylib.bn -o mylib.js --module esm
```

Then use in HTML:

```html
<script type="module">
    import { MyClass, myFunction } from './mylib.js';
    
    const instance = new MyClass();
    myFunction();
</script>
```

---

## ⚠️ Current Limitations - القيود الحالية

### ❌ Not Yet Supported - غير مدعوم حالياً

1. **Direct `<script type="text/bayan">` tags**
   - You cannot write Bayan directly in HTML yet
   - Must compile to JavaScript first

2. **Browser-based compilation**
   - No in-browser Bayan compiler yet
   - All compilation must be done beforehand

3. **Source maps**
   - Debugging shows compiled JavaScript, not original Bayan
   - Source map support coming soon

### ✅ Fully Supported - مدعوم بالكامل

1. ✅ Pre-compilation to JavaScript
2. ✅ All DOM APIs
3. ✅ All browser APIs (fetch, localStorage, etc.)
4. ✅ ES modules
5. ✅ CommonJS modules
6. ✅ Webpack/Vite/Rollup integration
7. ✅ Modern JavaScript features

---

## 🔮 Future Plans - الخطط المستقبلية

### Coming Soon:

1. **Bayan Browser Runtime**
   ```html
   <script src="https://cdn.bayan-lang.org/runtime.js"></script>
   <script type="text/bayan">
       دالة مرحبا() {
           console.log("مرحباً من البيان!");
       }
   </script>
   ```

2. **VS Code Extension**
   - Compile on save
   - Live reload
   - Debugging support

3. **Bayan Dev Server**
   ```bash
   bayan serve --watch
   ```

---

## 📚 More Examples - المزيد من الأمثلة

Check the `examples/web/` directory for:
- ✅ Counter app
- ✅ Todo app
- ✅ Form validation
- ✅ API integration
- ✅ Interactive games

---

## 🎯 Best Practices - أفضل الممارسات

### 1. Use Build Tools

```bash
# Development
bayan compile src/app.bn -o dist/app.js --watch

# Production
bayan compile src/app.bn -o dist/app.js --minify
```

### 2. Organize Your Code

```
project/
├── src/
│   ├── app.bn          # Main app
│   ├── utils.bn        # Utilities
│   └── components.bn   # Components
├── dist/
│   └── app.js          # Compiled output
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

---

<div align="center">

## ✅ الخلاصة - Summary

**Yes, you can use Bayan in HTML!**  
**نعم، يمكنك استخدام البيان في HTML!**

### الطريقة:
1. اكتب كود البيان (`.bn`)
2. ترجمه إلى JavaScript
3. استخدم الملف المترجم في HTML

### The Method:
1. Write Bayan code (`.bn`)
2. Compile to JavaScript
3. Use compiled file in HTML

---

**🌍 Bayan works everywhere JavaScript works!**  
**🌍 البيان تعمل في كل مكان تعمل فيه JavaScript!**

</div>

