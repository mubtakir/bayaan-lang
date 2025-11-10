# 🚀 Installation and Usage Guide - دليل التثبيت والاستخدام

## 📋 System Requirements - متطلبات النظام

### Minimum Requirements - المتطلبات الدنيا

- **Node.js**: Version 16.0 or higher - الإصدار 16.0 أو أحدث
- **npm**: Version 7.0 or higher - الإصدار 7.0 أو أحدث
- **Operating System - نظام التشغيل**:
  - ✅ Linux (Ubuntu, Debian, Fedora, etc.)
  - ✅ macOS (10.15 or higher)
  - ✅ Windows (10 or higher)
- **RAM**: 512 MB minimum, 1 GB recommended
- **Disk Space**: 100 MB for installation

### Check Your System - تحقق من نظامك

```bash
# Check Node.js version
node --version
# Should show v16.0.0 or higher

# Check npm version
npm --version
# Should show 7.0.0 or higher
```

If you don't have Node.js installed:
- **Download from**: https://nodejs.org/
- **Or use nvm** (recommended for Linux/macOS):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install 18
  nvm use 18
  ```

---

## 📦 Installation - التثبيت

### Method 1: From Source (Current) - من المصدر

```bash
# Clone the repository
git clone https://github.com/albayan-lang/albayan.git
cd albayan

# Install dependencies
npm install

# Build the project
npm run build

# Link globally (makes 'bayan' command available)
npm link
```

After `npm link`, you can use `bayan` command from anywhere:

```bash
bayan --version
```

### Method 2: From npm (Coming Soon) - من npm (قريباً)

```bash
# This will be available soon
npm install -g @albayan/lang

# Then use it
bayan --version
```

---

## 🖥️ Using Bayan in VS Code - استخدام البيان في VS Code

### Step 1: Install VS Code

Download from: https://code.visualstudio.com/

### Step 2: Create a Bayan File

1. Open VS Code
2. Create a new file: `hello.bn`
3. Write your code:

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

### Step 3: Run from VS Code Terminal

1. Open terminal in VS Code: `Ctrl + `` (backtick) or `View > Terminal`
2. Run your file:

```bash
bayan run hello.bn
```

### Step 4: Configure VS Code (Optional)

Create `.vscode/settings.json` in your project:

```json
{
  "files.associations": {
    "*.bn": "javascript"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

This gives you syntax highlighting for `.bn` files!

### Step 5: Add Build Task (Optional)

Create `.vscode/tasks.json`:

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
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Compile Bayan",
      "type": "shell",
      "command": "bayan",
      "args": [
        "compile",
        "${file}",
        "-o",
        "${fileDirname}/${fileBasenameNoExtension}.js"
      ],
      "group": "build"
    }
  ]
}
```

Now you can press `Ctrl+Shift+B` to run your Bayan file!

---

## 💻 Using Bayan in Terminal - استخدام البيان في الطرفية

### Basic Commands - الأوامر الأساسية

#### 1. Run a File - تشغيل ملف

```bash
# English
bayan run myfile.bn

# Arabic - عربي
البيان تشغيل myfile.bn
```

#### 2. Interactive REPL - الوضع التفاعلي

```bash
# Start REPL
bayan repl

# Or in Arabic
البيان تفاعلي
```

In REPL:
```javascript
> function test() { return "Hello!"; }
> test()
"Hello!"
> دالة اختبار() { ارجع "مرحبا!"; }
> اختبار()
"مرحبا!"
> .exit  // to exit
```

#### 3. Compile to JavaScript - ترجمة إلى JavaScript

```bash
# Basic compilation
bayan compile myfile.bn -o output.js

# With options
bayan compile myfile.bn \
  --output output.js \
  --target es2020 \
  --module esm

# Arabic - عربي
البيان ترجم myfile.bn -o output.js
```

#### 4. Check File for Errors - التحقق من الأخطاء

```bash
bayan check myfile.bn

# Or
البيان تحقق myfile.bn
```

#### 5. Get Help - المساعدة

```bash
bayan --help
bayan run --help
bayan compile --help
```

---

## 📦 Creating Executable Files - إنشاء ملفات تنفيذية

### Method 1: Using pkg (Recommended) - باستخدام pkg

#### Step 1: Install pkg

```bash
npm install -g pkg
```

#### Step 2: Compile Your Bayan Code to JavaScript

```bash
# Compile your .bn file to .js
bayan compile myapp.bn -o myapp.js
```

#### Step 3: Create Executable

```bash
# For Linux
pkg myapp.js --targets node18-linux-x64 --output myapp-linux

# For macOS
pkg myapp.js --targets node18-macos-x64 --output myapp-macos

# For Windows
pkg myapp.js --targets node18-win-x64 --output myapp-windows.exe

# For all platforms at once
pkg myapp.js --targets node18-linux-x64,node18-macos-x64,node18-win-x64
```

#### Step 4: Run the Executable

```bash
# Linux/macOS
chmod +x myapp-linux
./myapp-linux

# Windows
myapp-windows.exe
```

---

### Method 2: Using nexe - باستخدام nexe

#### Step 1: Install nexe

```bash
npm install -g nexe
```

#### Step 2: Compile and Create Executable

```bash
# Compile Bayan to JS first
bayan compile myapp.bn -o myapp.js

# Create executable
# For Linux
nexe myapp.js -t linux-x64-18.0.0 -o myapp-linux

# For macOS
nexe myapp.js -t mac-x64-18.0.0 -o myapp-macos

# For Windows
nexe myapp.js -t windows-x64-18.0.0 -o myapp-windows.exe
```

---

### Method 3: Using Node.js SEA (Single Executable Applications)

Node.js 20+ has built-in support for creating executables.

#### Step 1: Compile to JavaScript

```bash
bayan compile myapp.bn -o myapp.js
```

#### Step 2: Create sea-config.json

```json
{
  "main": "myapp.js",
  "output": "sea-prep.blob"
}
```

#### Step 3: Generate Blob

```bash
node --experimental-sea-config sea-config.json
```

#### Step 4: Create Executable

**Linux/macOS:**
```bash
cp $(command -v node) myapp
npx postject myapp NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
chmod +x myapp
```

**Windows:**
```cmd
copy %NODE_PATH%\node.exe myapp.exe
npx postject myapp.exe NODE_SEA_BLOB sea-prep.blob ^
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
```

---

## 🔧 Complete Example - مثال كامل

### Create a Simple App - إنشاء تطبيق بسيط

**File: `calculator.bn`**

```javascript
// Bilingual Calculator - آلة حاسبة ثنائية اللغة

class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
}

صنف آلة_حاسبة {
    دالة جمع(أ, ب) {
        ارجع أ + ب;
    }
    
    دالة طرح(أ, ب) {
        ارجع أ - ب;
    }
}

// Test - اختبار
const calc = new Calculator();
console.log("5 + 3 =", calc.add(5, 3));
console.log("5 - 3 =", calc.subtract(5, 3));

const حاسبة = new آلة_حاسبة();
console.log("٥ + ٣ =", حاسبة.جمع(5, 3));
console.log("٥ - ٣ =", حاسبة.طرح(5, 3));
```

### Run It - شغله

```bash
bayan run calculator.bn
```

### Compile It - ترجمه

```bash
bayan compile calculator.bn -o calculator.js
```

### Create Executable - أنشئ ملف تنفيذي

```bash
# Using pkg
pkg calculator.js --targets node18-linux-x64 --output calculator

# Run it
./calculator
```

---

## 🐧 Platform-Specific Instructions

### Linux (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Bayan
git clone https://github.com/albayan-lang/albayan.git
cd albayan
npm install
npm run build
sudo npm link

# Test
bayan --version
```

### macOS

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Bayan
git clone https://github.com/albayan-lang/albayan.git
cd albayan
npm install
npm run build
npm link

# Test
bayan --version
```

### Windows

```powershell
# Install Node.js from https://nodejs.org/

# Install Bayan
git clone https://github.com/albayan-lang/albayan.git
cd albayan
npm install
npm run build
npm link

# Test
bayan --version
```

---

## 🎯 Quick Start Checklist - قائمة البدء السريع

- [ ] Install Node.js (v16+)
- [ ] Clone Bayan repository
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm link`
- [ ] Test with `bayan --version`
- [ ] Create your first `.bn` file
- [ ] Run it with `bayan run myfile.bn`
- [ ] Compile it with `bayan compile myfile.bn -o output.js`
- [ ] Create executable with `pkg output.js`

---

## 🆘 Troubleshooting - حل المشاكل

### Problem: `bayan: command not found`

**Solution:**
```bash
# Make sure you ran npm link
cd /path/to/albayan
sudo npm link

# Or add to PATH manually
export PATH=$PATH:/path/to/albayan/dist/cli
```

### Problem: `Cannot find module`

**Solution:**
```bash
# Rebuild the project
npm run build
```

### Problem: Permission denied on Linux/macOS

**Solution:**
```bash
# Use sudo for npm link
sudo npm link

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## 📚 Additional Resources - موارد إضافية

- **[Bilingual Guide](./BILINGUAL_GUIDE.md)** - Complete language guide
- **[Examples](../examples/)** - Sample programs
- **[API Reference](./API_REFERENCE.md)** - Detailed API docs
- **[GitHub Issues](https://github.com/albayan-lang/albayan/issues)** - Report bugs

---

<div align="center">

**Happy Coding! - برمجة سعيدة!**

🌍 **Bayan: Code in Your Language** 🌍

</div>

