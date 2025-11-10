#!/usr/bin/env ts-node

import { Lexer } from './src/lexer/lexer';
import { Parser } from './src/parser/parser';
import { Compiler } from './src/compiler/compiler';

console.log('🧪 اختبار تطابق الكلمات المفتاحية العربية والإنجليزية\n');
console.log('='.repeat(80));

interface TestCase {
  name: string;
  arabic: string;
  english: string;
}

const testCases: TestCase[] = [
  // Variables
  {
    name: 'متغير / var',
    arabic: 'متغير س = 5;',
    english: 'var x = 5;'
  },
  {
    name: 'ثابت / const',
    arabic: 'ثابت س = 5;',
    english: 'const x = 5;'
  },
  {
    name: 'دع / let',
    arabic: 'دع س = 5;',
    english: 'let x = 5;'
  },
  
  // Functions
  {
    name: 'دالة / function',
    arabic: 'دالة جمع(أ، ب) { ارجع أ + ب; }',
    english: 'function add(a, b) { return a + b; }'
  },
  {
    name: 'ارجع / return',
    arabic: 'دالة اختبار() { ارجع 5; }',
    english: 'function test() { return 5; }'
  },
  
  // Conditionals
  {
    name: 'اذا / if',
    arabic: 'اذا (صحيح) { اطبع("نعم"); }',
    english: 'if (true) { print("yes"); }'
  },
  {
    name: 'والا / else',
    arabic: 'اذا (خطأ) { } والا { اطبع("لا"); }',
    english: 'if (false) { } else { print("no"); }'
  },
  
  // Loops
  {
    name: 'لكل / for',
    arabic: 'لكل (متغير ط = 0; ط < 5; ط++) { اطبع(ط); }',
    english: 'for (var i = 0; i < 5; i++) { print(i); }'
  },
  {
    name: 'بينما / while',
    arabic: 'متغير س = 0; بينما (س < 5) { س++; }',
    english: 'var x = 0; while (x < 5) { x++; }'
  },
  {
    name: 'افعل_بينما / do_while',
    arabic: 'متغير س = 0; افعل { س++; } بينما (س < 5);',
    english: 'var x = 0; do { x++; } while (x < 5);'
  },
  
  // Classes
  {
    name: 'صنف / class',
    arabic: 'صنف شخص { منشئ(اسم) { هذا.اسم = اسم; } }',
    english: 'class Person { constructor(name) { this.name = name; } }'
  },
  {
    name: 'يمتد / extends',
    arabic: 'صنف طالب يمتد شخص { }',
    english: 'class Student extends Person { }'
  },
  {
    name: 'مجرد / abstract',
    arabic: 'مجرد صنف حيوان { مجرد دالة صوت(); }',
    english: 'abstract class Animal { abstract function sound(); }'
  },
  
  // Access modifiers
  {
    name: 'عام / public',
    arabic: 'صنف س { عام اسم = ""; }',
    english: 'class X { public name = ""; }'
  },
  {
    name: 'خاص / private',
    arabic: 'صنف س { خاص اسم = ""; }',
    english: 'class X { private name = ""; }'
  },
  {
    name: 'محمي / protected',
    arabic: 'صنف س { محمي اسم = ""; }',
    english: 'class X { protected name = ""; }'
  },
  
  // Getters/Setters
  {
    name: 'احصل / get',
    arabic: 'صنف س { احصل اسم() { ارجع ""; } }',
    english: 'class X { get name() { return ""; } }'
  },
  {
    name: 'اضبط / set',
    arabic: 'صنف س { اضبط اسم(ق) { } }',
    english: 'class X { set name(v) { } }'
  },
  
  // Logic
  {
    name: 'حقيقة / fact',
    arabic: 'حقيقة والد("علي", "محمد");',
    english: 'fact parent("Ali", "Mohamed");'
  },
  {
    name: 'قاعدة / rule',
    arabic: 'قاعدة جد(س، ص) :- والد(س، ع)، والد(ع، ص);',
    english: 'rule grandparent(X, Y) :- parent(X, Z), parent(Z, Y);'
  },
  {
    name: 'استعلام / query',
    arabic: 'استعلام والد("علي", ؟س);',
    english: 'query parent("Ali", ?X);'
  },
  
  // Type annotations
  {
    name: 'رقم / number',
    arabic: 'متغير س: رقم = 5;',
    english: 'var x: number = 5;'
  },
  {
    name: 'نص / string',
    arabic: 'متغير س: نص = "";',
    english: 'var x: string = "";'
  },
  {
    name: 'منطقي / boolean',
    arabic: 'متغير س: منطقي = صحيح;',
    english: 'var x: boolean = true;'
  },
  
  // Boolean literals
  {
    name: 'صحيح / true',
    arabic: 'متغير س = صحيح;',
    english: 'var x = true;'
  },
  {
    name: 'خطأ / false',
    arabic: 'متغير س = خطأ;',
    english: 'var x = false;'
  },
  
  // Null/undefined
  {
    name: 'عدم / null',
    arabic: 'متغير س = عدم;',
    english: 'var x = null;'
  },
  {
    name: 'غير_معرف / undefined',
    arabic: 'متغير س = غير_معرف;',
    english: 'var x = undefined;'
  },
  
  // Break/Continue
  {
    name: 'اكسر / break',
    arabic: 'لكل (متغير ط = 0; ط < 5; ط++) { اكسر; }',
    english: 'for (var i = 0; i < 5; i++) { break; }'
  },
  {
    name: 'استمر / continue',
    arabic: 'لكل (متغير ط = 0; ط < 5; ط++) { استمر; }',
    english: 'for (var i = 0; i < 5; i++) { continue; }'
  },
  
  // Try/Catch
  {
    name: 'حاول / try',
    arabic: 'حاول { } اصطد (خ) { }',
    english: 'try { } catch (e) { }'
  },
  {
    name: 'ارمي / throw',
    arabic: 'ارمي "خطأ";',
    english: 'throw "error";'
  },
  
  // Switch
  {
    name: 'حول / switch',
    arabic: 'حول (س) { حالة 1: اكسر; }',
    english: 'switch (x) { case 1: break; }'
  },
  
  // Async
  {
    name: 'غير_متزامن / async',
    arabic: 'غير_متزامن دالة اختبار() { }',
    english: 'async function test() { }'
  },
  {
    name: 'انتظر / await',
    arabic: 'غير_متزامن دالة اختبار() { انتظر شيء(); }',
    english: 'async function test() { await something(); }'
  },
];

let passed = 0;
let failed = 0;
const failures: string[] = [];

for (const testCase of testCases) {
  try {
    // Parse Arabic
    const lexerAr = new Lexer(testCase.arabic);
    const tokensAr = lexerAr.tokenize();
    const parserAr = new Parser(tokensAr);
    const astAr = parserAr.parse();
    
    // Parse English
    const lexerEn = new Lexer(testCase.english);
    const tokensEn = lexerEn.tokenize();
    const parserEn = new Parser(tokensEn);
    const astEn = parserEn.parse();
    
    // Compare AST structure (simplified - just check types match)
    const astArStr = JSON.stringify(astAr, (key, value) => {
      // Ignore string values (names, literals, etc.)
      if (typeof value === 'string') return 'STRING';
      // Ignore number values
      if (typeof value === 'number') return 'NUMBER';
      // Ignore boolean values
      if (typeof value === 'boolean') return 'BOOLEAN';
      return value;
    });

    const astEnStr = JSON.stringify(astEn, (key, value) => {
      // Ignore string values (names, literals, etc.)
      if (typeof value === 'string') return 'STRING';
      // Ignore number values
      if (typeof value === 'number') return 'NUMBER';
      // Ignore boolean values
      if (typeof value === 'boolean') return 'BOOLEAN';
      return value;
    });
    
    if (astArStr === astEnStr) {
      console.log(`✅ ${testCase.name}`);
      passed++;
    } else {
      console.log(`⚠️  ${testCase.name} - AST مختلف`);
      failures.push(`${testCase.name}: AST structure differs`);
      failed++;
    }
  } catch (error: any) {
    console.log(`❌ ${testCase.name} - ${error.message}`);
    failures.push(`${testCase.name}: ${error.message}`);
    failed++;
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n📊 النتائج:`);
console.log(`   ✅ نجح: ${passed}/${testCases.length}`);
console.log(`   ❌ فشل: ${failed}/${testCases.length}`);
console.log(`   📈 النسبة: ${((passed / testCases.length) * 100).toFixed(1)}%`);

if (failures.length > 0) {
  console.log(`\n❌ الفشل:`);
  failures.forEach(f => console.log(`   - ${f}`));
}

console.log('\n' + '='.repeat(80));

