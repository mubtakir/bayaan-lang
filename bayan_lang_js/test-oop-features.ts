#!/usr/bin/env ts-node

import { Lexer } from './src/lexer/lexer';
import { Parser } from './src/parser/parser';
import { Compiler } from './src/compiler/compiler';

console.log('🧪 اختبار ميزات البرمجة الكائنية\n');
console.log('='.repeat(60));

// Test 1: Getters and Setters
console.log('\n1️⃣ اختبار Getters و Setters:');
try {
  const code1 = `
صنف شخص {
  خاص _اسم = "";
  
  احصل اسم() {
    ارجع هذا._اسم;
  }
  
  اضبط اسم(قيمة) {
    هذا._اسم = قيمة;
  }
}

متغير ش = جديد شخص();
ش.اسم = "أحمد";
اطبع(ش.اسم);
`;
  const lexer1 = new Lexer(code1);
  const tokens1 = lexer1.tokenize();
  const parser1 = new Parser(tokens1);
  const ast1 = parser1.parse();
  const compiler1 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js1 = compiler1.compile(ast1);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js1.substring(0, 500) + '...');
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 2: Abstract class with abstract method
console.log('\n2️⃣ اختبار Abstract Class:');
try {
  const code2 = `
مجرد صنف حيوان {
  مجرد دالة صوت();
  
  دالة تحرك() {
    اطبع("يتحرك");
  }
}

صنف قط يمتد حيوان {
  دالة صوت() {
    اطبع("مواء");
  }
}
`;
  const lexer2 = new Lexer(code2);
  const tokens2 = lexer2.tokenize();
  const parser2 = new Parser(tokens2);
  const ast2 = parser2.parse();
  const compiler2 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js2 = compiler2.compile(ast2);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js2.substring(0, 500) + '...');
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 3: Interface with "دالة" keyword
console.log('\n3️⃣ اختبار Interface مع كلمة "دالة":');
try {
  const code3 = `
واجهة قابل_للطباعة {
  دالة اطبع();
  دالة احصل_على_نص();
}

صنف كتاب ينفذ قابل_للطباعة {
  دالة اطبع() {
    اطبع("طباعة الكتاب");
  }
  
  دالة احصل_على_نص() {
    ارجع "نص الكتاب";
  }
}
`;
  const lexer3 = new Lexer(code3);
  const tokens3 = lexer3.tokenize();
  const parser3 = new Parser(tokens3);
  const ast3 = parser3.parse();
  const compiler3 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js3 = compiler3.compile(ast3);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js3.substring(0, 500) + '...');
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 4: Constructor with "دالة منشئ"
console.log('\n4️⃣ اختبار Constructor مع "دالة منشئ":');
try {
  const code4 = `
صنف شخص {
  دالة منشئ(اسم) {
    هذا.اسم = اسم;
  }
  
  دالة قل_مرحبا() {
    اطبع("مرحبا، أنا " + هذا.اسم);
  }
}

متغير ش = جديد شخص("أحمد");
ش.قل_مرحبا();
`;
  const lexer4 = new Lexer(code4);
  const tokens4 = lexer4.tokenize();
  const parser4 = new Parser(tokens4);
  const ast4 = parser4.parse();
  const compiler4 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js4 = compiler4.compile(ast4);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js4.substring(0, 500) + '...');
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 5: All features combined
console.log('\n5️⃣ اختبار جميع الميزات معاً:');
try {
  const code5 = `
واجهة قابل_للعد {
  دالة احصل_على_العدد();
}

مجرد صنف كائن_قابل_للعد ينفذ قابل_للعد {
  خاص _عدد = 0;
  
  احصل عدد() {
    ارجع هذا._عدد;
  }
  
  اضبط عدد(قيمة) {
    هذا._عدد = قيمة;
  }
  
  مجرد دالة احصل_على_العدد();
}

صنف عداد يمتد كائن_قابل_للعد {
  دالة منشئ() {
    هذا.عدد = 0;
  }
  
  دالة احصل_على_العدد() {
    ارجع هذا.عدد;
  }
  
  دالة زد() {
    هذا.عدد++;
  }
}

متغير ع = جديد عداد();
ع.زد();
ع.زد();
اطبع("العدد:", ع.احصل_على_العدد());
`;
  const lexer5 = new Lexer(code5);
  const tokens5 = lexer5.tokenize();
  const parser5 = new Parser(tokens5);
  const ast5 = parser5.parse();
  const compiler5 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js5 = compiler5.compile(ast5);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js5.substring(0, 800) + '...');
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('✅ اكتملت جميع الاختبارات!');

