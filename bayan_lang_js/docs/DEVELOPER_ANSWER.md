# 💬 إجابة سؤال المطور - Developer Question Answer

## ❓ السؤال الأصلي - Original Question

> "ما هي متطلبات التشغيل والتنفيذ وكيف استخدم اللغة في VS Code أو في الطرفية وكيف أحوله بعد ذلك إلى ملف تنفيذي سواء بنظام لينكس أو ماك أو ويندوز؟"

> "What are the runtime and execution requirements, how do I use the language in VS Code or terminal, and how do I convert it to an executable file for Linux, macOS, or Windows?"

---

## ✅ الإجابة الكاملة - Complete Answer

### 1️⃣ متطلبات التشغيل - Runtime Requirements

#### المتطلبات الأساسية - Basic Requirements:

```
✅ Node.js v16.0 أو أحدث
✅ npm v7.0 أو أحدث
✅ نظام التشغيل: Linux, macOS, أو Windows
✅ مساحة: 100 ميجابايت للتثبيت
✅ ذاكرة: 512 ميجابايت (يُفضل 1 جيجابايت)
```

#### التحقق من النظام - Check Your System:

```bash
# تحقق من إصدار Node.js
node --version
# يجب أن يظهر v16.0.0 أو أحدث

# تحقق من إصدار npm
npm --version
# يجب أن يظهر 7.0.0 أو أحدث
```

#### إذا لم يكن Node.js مثبتاً - If Node.js is not installed:

- **حمّل من**: https://nodejs.org/
- **أو استخدم nvm** (مُوصى به لـ Linux/macOS):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install 18
  nvm use 18
  ```

---

### 2️⃣ التثبيت - Installation

```bash
# استنسخ المستودع
git clone https://github.com/albayan-lang/albayan.git
cd albayan

# ثبّت المتطلبات
npm install

# ابنِ المشروع
npm run build

# اربط عالمياً (يجعل أمر 'bayan' متاحاً في كل مكان)
npm link

# تحقق من التثبيت
bayan --version
```

---

### 3️⃣ الاستخدام في VS Code - Using in VS Code

#### الخطوة 1: إنشاء ملف بيان

1. افتح VS Code
2. أنشئ ملف جديد: `hello.bn`
3. اكتب الكود:

```javascript
// English
function greet(name) {
    console.log("Hello, " + name + "!");
}

// Arabic - عربي
دالة رحب(الاسم) {
    console.log("مرحباً يا " + الاسم + "!");
}

greet("World");
رحب("العالم");
```

#### الخطوة 2: تشغيل من طرفية VS Code

1. افتح الطرفية: `Ctrl + `` أو `View > Terminal`
2. شغّل الملف:

```bash
bayan run hello.bn
```

#### الخطوة 3: إعداد VS Code (اختياري)

أنشئ `.vscode/settings.json`:

```json
{
  "files.associations": {
    "*.bn": "javascript"
  }
}
```

هذا يعطيك تلوين الكود لملفات `.bn`!

#### الخطوة 4: إضافة مهمة بناء (اختياري)

أنشئ `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Bayan",
      "type": "shell",
      "command": "bayan",
      "args": ["run", "${file}"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

الآن يمكنك الضغط على `Ctrl+Shift+B` لتشغيل ملف البيان!

---

### 4️⃣ الاستخدام في الطرفية - Using in Terminal

#### الأوامر الأساسية - Basic Commands:

```bash
# 1. تشغيل ملف
bayan run myfile.bn

# 2. الوضع التفاعلي (REPL)
bayan repl

# 3. ترجمة إلى JavaScript
bayan compile myfile.bn -o output.js

# 4. التحقق من الأخطاء
bayan check myfile.bn

# 5. المساعدة
bayan --help
```

---

### 5️⃣ إنشاء ملف تنفيذي - Creating Executable Files

#### الطريقة السهلة: استخدام السكريبت المساعد

**Linux/macOS:**
```bash
# اجعل السكريبت قابلاً للتنفيذ (مرة واحدة فقط)
chmod +x scripts/build-executable.sh

# ابنِ ملف تنفيذي
./scripts/build-executable.sh myapp.bn linux
./scripts/build-executable.sh myapp.bn macos
./scripts/build-executable.sh myapp.bn windows
./scripts/build-executable.sh myapp.bn all  # جميع المنصات

# شغّل الملف التنفيذي
./myapp-linux
```

**Windows:**
```cmd
REM ابنِ ملف تنفيذي
scripts\build-executable.bat myapp.bn windows
scripts\build-executable.bat myapp.bn all

REM شغّل الملف التنفيذي
myapp-windows.exe
```

#### الطريقة اليدوية - Manual Method:

**الخطوة 1: ترجم إلى JavaScript**
```bash
bayan compile myapp.bn -o myapp.js
```

**الخطوة 2: ثبّت pkg**
```bash
npm install -g pkg
```

**الخطوة 3: أنشئ الملف التنفيذي**
```bash
# لـ Linux
pkg myapp.js --targets node18-linux-x64 --output myapp-linux

# لـ macOS
pkg myapp.js --targets node18-macos-x64 --output myapp-macos

# لـ Windows
pkg myapp.js --targets node18-win-x64 --output myapp-windows.exe

# لجميع المنصات دفعة واحدة
pkg myapp.js --targets node18-linux-x64,node18-macos-x64,node18-win-x64
```

**الخطوة 4: شغّل الملف التنفيذي**
```bash
# Linux/macOS
chmod +x myapp-linux
./myapp-linux

# Windows
myapp-windows.exe
```

---

### 6️⃣ مثال عملي كامل - Complete Practical Example

#### أنشئ تطبيق مدير مهام - Create Task Manager App

**ملف: `taskmanager.bn`**

```javascript
// Bilingual Task Manager
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    
    addTask(title) {
        this.tasks.push(title);
        console.log("✅ Added:", title);
    }
    
    listTasks() {
        console.log("\n📋 Tasks:");
        let i = 0;
        while (i < this.tasks.length) {
            console.log(`  ${i + 1}. ${this.tasks[i]}`);
            i = i + 1;
        }
    }
}

const manager = new TaskManager();
manager.addTask("Learn Bayan");
manager.addTask("Build an app");
manager.listTasks();
```

#### شغّله - Run It:

```bash
bayan run taskmanager.bn
```

**النتيجة - Output:**
```
✅ Added: Learn Bayan
✅ Added: Build an app

📋 Tasks:
  1. Learn Bayan
  2. Build an app
```

#### حوّله لملف تنفيذي - Convert to Executable:

```bash
# طريقة سريعة - Quick way
./scripts/build-executable.sh taskmanager.bn all

# أو يدوياً - Or manually
bayan compile taskmanager.bn -o taskmanager.js
pkg taskmanager.js --targets node18-linux-x64 --output taskmanager-linux
chmod +x taskmanager-linux
./taskmanager-linux
```

---

### 7️⃣ ملخص سريع - Quick Summary

| الخطوة | الأمر | الوصف |
|--------|-------|-------|
| **1. التثبيت** | `npm install && npm run build && npm link` | ثبّت البيان |
| **2. إنشاء ملف** | `code myapp.bn` | أنشئ ملف `.bn` |
| **3. التشغيل** | `bayan run myapp.bn` | شغّل الملف |
| **4. الترجمة** | `bayan compile myapp.bn -o myapp.js` | ترجم لـ JS |
| **5. ملف تنفيذي** | `pkg myapp.js --targets node18-linux-x64` | أنشئ تنفيذي |
| **6. التشغيل** | `./myapp-linux` | شغّل التنفيذي |

---

### 8️⃣ الملفات الناتجة - Output Files

بعد البناء، ستحصل على:

```
myapp.bn          ← الملف الأصلي (Bayan source)
myapp.js          ← JavaScript المترجم (Compiled JS)
myapp-linux       ← ملف تنفيذي Linux (40-50 MB)
myapp-macos       ← ملف تنفيذي macOS (40-50 MB)
myapp-windows.exe ← ملف تنفيذي Windows (40-50 MB)
```

**ملاحظة:** حجم الملف التنفيذي كبير لأنه يتضمن بيئة تشغيل Node.js كاملة، مما يسمح بتشغيله على أي نظام بدون الحاجة لتثبيت Node.js!

---

### 9️⃣ حل المشاكل الشائعة - Common Issues

#### المشكلة: `bayan: command not found`

**الحل:**
```bash
cd /path/to/albayan
sudo npm link
```

#### المشكلة: `pkg: command not found`

**الحل:**
```bash
npm install -g pkg
```

#### المشكلة: Permission denied (Linux/macOS)

**الحل:**
```bash
chmod +x scripts/build-executable.sh
chmod +x myapp-linux
```

---

### 🔟 موارد إضافية - Additional Resources

📚 **التوثيق الكامل - Full Documentation:**
- [دليل التثبيت والاستخدام الكامل](./docs/INSTALLATION_AND_USAGE.md)
- [دليل البرمجة ثنائية اللغة](./docs/BILINGUAL_GUIDE.md)
- [أمثلة عملية](./examples/)
- [سكريبتات البناء](./scripts/README.md)

🎯 **أمثلة جاهزة - Ready Examples:**
- `examples/bilingual-hello.bn` - مثال بسيط
- `examples/bilingual-oop.bn` - برمجة كائنية
- `examples/standalone-app.bn` - تطبيق كامل قابل للتحويل لملف تنفيذي

---

## 🎉 الخلاصة - Conclusion

### بالعربية:

الآن لديك كل ما تحتاجه لـ:
1. ✅ تثبيت لغة البيان
2. ✅ استخدامها في VS Code
3. ✅ استخدامها في الطرفية
4. ✅ إنشاء ملفات تنفيذية لـ Linux, macOS, Windows

**ابدأ الآن:**
```bash
git clone https://github.com/albayan-lang/albayan.git
cd albayan
npm install && npm run build && npm link
bayan run examples/bilingual-hello.bn
```

### In English:

You now have everything you need to:
1. ✅ Install Bayan language
2. ✅ Use it in VS Code
3. ✅ Use it in terminal
4. ✅ Create executables for Linux, macOS, Windows

**Get started now:**
```bash
git clone https://github.com/albayan-lang/albayan.git
cd albayan
npm install && npm run build && npm link
bayan run examples/bilingual-hello.bn
```

---

<div align="center">

## 🌟 مرحباً بك في عالم البيان! 🌟
## 🌟 Welcome to the World of Bayan! 🌟

**Code in your language, run anywhere!**  
**ابرمج بلغتك، شغّل في أي مكان!**

</div>

