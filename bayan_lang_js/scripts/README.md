# 🛠️ Build Scripts - سكريبتات البناء

This directory contains helper scripts for building Bayan executables.

هذا المجلد يحتوي على سكريبتات مساعدة لبناء ملفات تنفيذية للبيان.

---

## 📜 Available Scripts - السكريبتات المتاحة

### 1. `build-executable.sh` (Linux/macOS)

Automatically compiles a `.bn` file to JavaScript and creates an executable.

يقوم تلقائياً بترجمة ملف `.bn` إلى JavaScript وإنشاء ملف تنفيذي.

**Usage:**
```bash
./scripts/build-executable.sh <file.bn> [platform]
```

**Examples:**
```bash
# Build for Linux (default)
./scripts/build-executable.sh myapp.bn

# Build for specific platform
./scripts/build-executable.sh myapp.bn linux
./scripts/build-executable.sh myapp.bn macos
./scripts/build-executable.sh myapp.bn windows

# Build for all platforms
./scripts/build-executable.sh myapp.bn all
```

**What it does:**
1. ✅ Checks if Bayan is installed
2. ✅ Compiles `.bn` file to `.js`
3. ✅ Checks if `pkg` is installed (installs if needed)
4. ✅ Creates executable for specified platform(s)
5. ✅ Shows file size and usage instructions

---

### 2. `build-executable.bat` (Windows)

Windows version of the build script.

نسخة ويندوز من سكريبت البناء.

**Usage:**
```cmd
scripts\build-executable.bat <file.bn> [platform]
```

**Examples:**
```cmd
REM Build for Windows (default)
scripts\build-executable.bat myapp.bn

REM Build for specific platform
scripts\build-executable.bat myapp.bn windows
scripts\build-executable.bat myapp.bn linux
scripts\build-executable.bat myapp.bn macos

REM Build for all platforms
scripts\build-executable.bat myapp.bn all
```

---

## 🎯 Quick Start - بداية سريعة

### Linux/macOS:

```bash
# Make script executable (first time only)
chmod +x scripts/build-executable.sh

# Build the standalone app example
./scripts/build-executable.sh examples/standalone-app.bn

# Run it
./standalone-app-linux
```

### Windows:

```cmd
REM Build the standalone app example
scripts\build-executable.bat examples\standalone-app.bn

REM Run it
standalone-app-windows.exe
```

---

## 📋 Prerequisites - المتطلبات

### Required - مطلوب

- ✅ **Node.js** (v16+)
- ✅ **Bayan** installed and linked (`npm link`)
- ✅ **npm** (comes with Node.js)

### Auto-installed - يُثبت تلقائياً

- ⚙️ **pkg** - The script will install this if not found

---

## 🔧 Manual Build Process - عملية البناء اليدوية

If you prefer to build manually without the scripts:

إذا كنت تفضل البناء يدوياً بدون السكريبتات:

### Step 1: Compile to JavaScript

```bash
bayan compile myapp.bn -o myapp.js
```

### Step 2: Install pkg (if not installed)

```bash
npm install -g pkg
```

### Step 3: Create Executable

```bash
# For Linux
pkg myapp.js --targets node18-linux-x64 --output myapp-linux

# For macOS
pkg myapp.js --targets node18-macos-x64 --output myapp-macos

# For Windows
pkg myapp.js --targets node18-win-x64 --output myapp-windows.exe

# For all platforms
pkg myapp.js --targets node18-linux-x64,node18-macos-x64,node18-win-x64
```

### Step 4: Run

```bash
# Linux/macOS
chmod +x myapp-linux
./myapp-linux

# Windows
myapp-windows.exe
```

---

## 🎨 Example: Building the Task Manager

Let's build the standalone task manager example:

دعنا نبني مثال مدير المهام المستقل:

### Linux/macOS:

```bash
# Build for Linux
./scripts/build-executable.sh examples/standalone-app.bn linux

# Run it
./standalone-app-linux

# Output:
# 🌍 Bayan Task Manager - مدير المهام البيان
# ...
```

### Windows:

```cmd
REM Build for Windows
scripts\build-executable.bat examples\standalone-app.bn windows

REM Run it
standalone-app-windows.exe
```

---

## 📦 Output Files - الملفات الناتجة

After running the build script, you'll get:

بعد تشغيل سكريبت البناء، ستحصل على:

```
myapp.bn          # Original Bayan source - الملف الأصلي
myapp.js          # Compiled JavaScript - JavaScript المترجم
myapp-linux       # Linux executable - ملف تنفيذي لينكس
myapp-macos       # macOS executable - ملف تنفيذي ماك
myapp-windows.exe # Windows executable - ملف تنفيذي ويندوز
```

**File sizes:** Typically 40-50 MB (includes Node.js runtime)

**أحجام الملفات:** عادة 40-50 ميجابايت (تتضمن بيئة تشغيل Node.js)

---

## 🧹 Cleanup - التنظيف

To remove intermediate files:

لإزالة الملفات الوسيطة:

```bash
# Remove compiled JavaScript
rm myapp.js

# Remove all generated files
rm myapp.js myapp-linux myapp-macos myapp-windows.exe
```

---

## 🐛 Troubleshooting - حل المشاكل

### Problem: "bayan: command not found"

**Solution:**
```bash
cd /path/to/bayan
npm link
```

### Problem: "pkg: command not found"

**Solution:**
```bash
npm install -g pkg
```

### Problem: Permission denied (Linux/macOS)

**Solution:**
```bash
chmod +x scripts/build-executable.sh
chmod +x myapp-linux
```

### Problem: Large executable size

**Explanation:** The executable includes the Node.js runtime (~40MB). This is normal and allows the executable to run without requiring Node.js to be installed on the target system.

**التفسير:** الملف التنفيذي يتضمن بيئة تشغيل Node.js (~40 ميجابايت). هذا طبيعي ويسمح للملف التنفيذي بالعمل بدون الحاجة لتثبيت Node.js على النظام المستهدف.

---

## 🌟 Advanced Options - خيارات متقدمة

### Custom Node.js Version

```bash
pkg myapp.js --targets node16-linux-x64
pkg myapp.js --targets node20-linux-x64
```

### Compress Executable

```bash
# Linux/macOS
upx myapp-linux

# Windows
upx myapp-windows.exe
```

This can reduce file size by 50-70%!

هذا يمكن أن يقلل حجم الملف بنسبة 50-70%!

### Include Assets

If your app needs additional files:

```bash
pkg myapp.js --assets "data/**/*" --output myapp
```

---

## 📚 More Information - المزيد من المعلومات

- **pkg documentation**: https://github.com/vercel/pkg
- **Bayan documentation**: [../docs/INSTALLATION_AND_USAGE.md](../docs/INSTALLATION_AND_USAGE.md)
- **Examples**: [../examples/](../examples/)

---

<div align="center">

**Build once, run anywhere!**  
**ابنِ مرة واحدة، شغّل في أي مكان!**

🌍 **Bayan: Code in Your Language** 🌍

</div>

