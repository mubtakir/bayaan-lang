# Changelog | سجل التغييرات

All notable changes to the Bayan Programming Language will be documented in this file.

---

## [1.0.0] - 2024-11-05

### 🎉 Initial Release | الإصدار الأول

This is the first public release of Bayan Programming Language!

### ✨ Features | الميزات

#### Core Language Features
- ✅ **Hybrid Programming** - Three paradigms in one language:
  - Imperative programming
  - Object-oriented programming (OOP)
  - Logic programming (Prolog-style)
- ✅ **Bilingual Keywords** - Full support for Arabic and English keywords
- ✅ **Arabic Text Support** - Perfect handling of Arabic text without external libraries
- ✅ **Modern Syntax** - Clean, Python-inspired syntax with `hybrid { }` wrapper

#### Data Types
- ✅ Integer, Float, String, Boolean, None
- ✅ Lists with indexing and slicing
- ✅ Dictionaries
- ✅ Tuples

#### Control Flow
- ✅ `if`, `elif`, `else` statements
- ✅ `for` loops with `range()` and iterables
- ✅ `while` loops
- ✅ `break` and `continue`

#### Functions
- ✅ Function definitions with `def`
- ✅ Return values
- ✅ Default parameters
- ✅ `*args` and `**kwargs`
- ✅ Lambda functions
- ✅ Nested functions
- ✅ Closures

#### Object-Oriented Programming
- ✅ Class definitions
- ✅ `__init__` constructor
- ✅ Instance methods and attributes
- ✅ Inheritance (single and multiple)
- ✅ `super()` for parent class access
- ✅ Polymorphism
- ✅ Encapsulation
- ✅ Special methods (`__str__`, `__repr__`, `__add__`, etc.)

#### Logic Programming
- ✅ Facts (e.g., `parent("أحمد", "محمد").`)
- ✅ Rules (e.g., `grandparent(?X, ?Z) :- parent(?X, ?Y), parent(?Y, ?Z).`)
- ✅ Queries (e.g., `query parent(?X, "محمد")?`)
- ✅ Unification with pattern matching
- ✅ Backtracking
- ✅ Cut operator (`!`)
- ✅ Dynamic knowledge base:
  - `assertz()` - Add facts at runtime
  - `retract()` - Remove facts at runtime
- ✅ Meta-predicates:
  - `bagof()` - Collect all solutions
  - `setof()` - Collect unique solutions
- ✅ List pattern matching (e.g., `[?H|?T]`)
- ✅ `is` operator for arithmetic evaluation

#### Advanced Features
- ✅ **Generators** - `yield` keyword with proper state preservation
- ✅ **Async/Await** - Asynchronous programming support
- ✅ **Decorators** - Function decorators with `@` syntax
- ✅ **Context Managers** - `with` statement support
- ✅ **Exception Handling** - `try`, `except`, `finally`, `raise`
- ✅ **Import System** - Import Bayan and Python modules

#### Built-in Functions
- ✅ **I/O**: `print()`, `input()`
- ✅ **Type Conversion**: `int()`, `float()`, `str()`, `bool()`, `list()`, `dict()`, `tuple()`
- ✅ **Type Checking**: `type()`, `isinstance()`
- ✅ **Utilities**: `len()`, `range()`
- ✅ **AI/ML Functions**:
  - `sum()`, `min()`, `max()`
  - `sorted()`, `reversed()`
  - `enumerate()`, `zip()`
  - `map()`, `filter()`
  - `all()`, `any()`
  - `abs()`, `round()`, `pow()`

#### Testing
- ✅ **267 Tests** - Comprehensive test suite
- ✅ **100% Pass Rate** - All tests passing
- ✅ **Test Coverage**:
  - Lexer tests
  - Parser tests
  - Interpreter tests
  - OOP tests
  - Logic programming tests
  - Advanced features tests
  - Arabic text handling tests
  - AI/ML integration tests

#### Documentation
- ✅ **Comprehensive Tutorials** (5,594+ lines):
  - Part 1: Introduction (515 lines)
  - Part 2: Procedural & OOP (1,394 lines)
  - Part 3: Logic Programming (1,154 lines)
- ✅ **LLM Integration Files** (2,531+ lines):
  - System Prompt for AI models
  - Quick Reference
  - Complete Guide with 10 examples
  - Usage Guide
  - Test Prompts
- ✅ **Technical Documentation**:
  - Language Guide
  - Architecture
  - Examples
  - Arabic Text Support

#### Examples
- ✅ **15+ Working Examples**:
  - Hello World
  - Calculator
  - Family tree (logic programming)
  - Student management (hybrid)
  - Async/await example
  - Generators example
  - Decorators example
  - Context managers example
  - Arabic text demo
  - And more...

### 🐛 Bug Fixes | إصلاح الأخطاء

- ✅ Fixed generator state preservation
- ✅ Fixed async/await coroutine handling
- ✅ Fixed Arabic text rendering (RTL, character joining, diacritics)
- ✅ Fixed exception handling for Python exceptions
- ✅ Fixed multiple inheritance method resolution
- ✅ Fixed list pattern matching in logic programming
- ✅ Fixed `is` operator for arithmetic evaluation

### 📚 Documentation | الوثائق

- ✅ Added comprehensive Arabic tutorials
- ✅ Added LLM integration guides
- ✅ Added technical documentation
- ✅ Added code examples
- ✅ Added README with badges
- ✅ Added CONTRIBUTING guide
- ✅ Added LICENSE (MIT)
- ✅ Added AUTHORS file
- ✅ Added this CHANGELOG

### 🔧 Internal Changes | التغييرات الداخلية

- ✅ Refactored interpreter architecture
- ✅ Improved error messages
- ✅ Optimized performance
- ✅ Enhanced code organization
- ✅ Added comprehensive comments

---

## [Unreleased] | قيد التطوير

### Planned Features | الميزات المخططة

#### Short-term (Next Release)
- [ ] Standard library modules
- [ ] File I/O operations
- [ ] Regular expressions
- [ ] JSON support
- [ ] Better error messages with line numbers
- [ ] REPL improvements

#### Medium-term
- [ ] Package manager
- [ ] Debugger
- [ ] Profiler
- [ ] Code formatter
- [ ] Syntax highlighting for popular editors
- [ ] Language server protocol (LSP)

#### Long-term
- [ ] JIT compilation for performance
- [ ] Native executable generation
- [ ] Web assembly support
- [ ] Mobile platform support
- [ ] IDE plugins (VSCode, PyCharm, etc.)
- [ ] Online playground

### Known Issues | المشاكل المعروفة

Currently, there are no known critical issues. All 267 tests are passing.

If you find a bug, please report it on GitHub: [Issues](https://github.com/mubtakir/Bayan-Hybrid-Programming-Language/issues)

---

## Version History | تاريخ الإصدارات

### [1.0.0] - 2024-11-05
- Initial public release
- 154 files
- 41,889 lines of code and documentation
- 267 passing tests
- Full feature set as described above

---

## How to Upgrade | كيفية الترقية

### From Source

```bash
cd Bayan-Hybrid-Programming-Language
git pull origin main
```

### Fresh Install

```bash
git clone https://github.com/mubtakir/Bayan-Hybrid-Programming-Language.git
cd Bayan-Hybrid-Programming-Language
```

---

## Breaking Changes | التغييرات الجذرية

### Version 1.0.0
- First release, no breaking changes

---

## Deprecations | الميزات المهملة

### Version 1.0.0
- No deprecations in first release

---

## Contributors | المساهمون

### Version 1.0.0
- **Basel Yahya Abdullah** - Creator and lead developer
- **AI Language Models** - Development assistance

See [AUTHORS.md](AUTHORS.md) for more details.

---

## Links | الروابط

- **Repository**: https://github.com/mubtakir/Bayan-Hybrid-Programming-Language
- **Issues**: https://github.com/mubtakir/Bayan-Hybrid-Programming-Language/issues
- **Discussions**: https://github.com/mubtakir/Bayan-Hybrid-Programming-Language/discussions
- **Documentation**: [docs/](docs/)

---

## Changelog Format | تنسيق سجل التغييرات

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Categories
- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security fixes

---

**Developed by: Basel Yahya Abdullah (باسل يحيى عبدالله)**  
**With assistance from: AI Language Models**

---

**🌟 Bayan - The World's First True Hybrid Programming Language 🌟**


## [1.4.0] - 2025-11-06

### Added - الإضافات
- ✨ **نظام الاستدلال الاحتمالي والتشكيك** - Probabilistic Reasoning and Uncertainty System
  - قاعدة بيانات الحقائق الاحتمالية `prob(fact, entity, probability)`
  - 5 أدوات تشكيك ثنائية اللغة (عربي + إنجليزي):
    - `ربما/maybe` (احتمال > 50%)
    - `محتمل/likely` (احتمال > 70%)
    - `غير_محتمل/unlikely` (احتمال < 30%)
    - `ممكن/possible` (احتمال بين 20% و 80%)
    - `مؤكد/certain` (احتمال > 95%)
  - حساب الحالات المتعددة (Multiple States)
  - الاستدلال الشرطي الاحتمالي (Conditional Probabilistic Inference)
  - ملف جديد: `bayan_solutions/probabilistic_reasoning.by` (~209 سطر)
  - وثائق جديدة: `docs/04_PROBABILISTIC_REASONING_AR.md`

### Features - الميزات
- 🎲 التعبير عن عدم اليقين بشكل صريح ورقمي
- 🌍 دعم كامل للكلمات المفتاحية العربية والإنجليزية
- 📊 حسابات احتمالية شفافة وقابلة للتفسير
- ⚙️ استدلال شرطي مبني على الاحتمالات
- ✅ أمثلة عملية (الحديقة، المركب الكيميائي)

### Technical Details - التفاصيل التقنية
- استخدام بنية مسطحة (flat structure) لتجنب الأقواس المتداخلة
- عمليات احتمالية: AND (P(A∧B) = P(A)×P(B)), NOT (P(¬A) = 1-P(A))
- دعم 4 حالات متعددة لكل زوج من المتغيرات
- شفافية كاملة - كل احتمال قابل للتتبع

### Use Cases - حالات الاستخدام
- 🏥 التشخيص الطبي
- 💼 التنبؤ بالمبيعات
- 🔒 تقييم المخاطر
- �� أنظمة الخبراء الاحتمالية
- 📈 اتخاذ القرارات المبنية على البيانات

