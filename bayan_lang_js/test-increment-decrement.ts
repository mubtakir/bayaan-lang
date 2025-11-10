#!/usr/bin/env ts-node

import { Lexer } from './src/lexer/lexer';
import { Parser } from './src/parser/parser';
import { Compiler } from './src/compiler/compiler';

console.log('🧪 اختبار عوامل ++ و --\n');
console.log('='.repeat(60));

// Test 1: Postfix increment
console.log('\n1️⃣ اختبار س++:');
try {
  const code1 = `
متغير س = 0;
س++;
اطبع(س);
`;
  const lexer1 = new Lexer(code1);
  const tokens1 = lexer1.tokenize();
  const parser1 = new Parser(tokens1);
  const ast1 = parser1.parse();
  const compiler1 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js1 = compiler1.compile(ast1);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js1);
  
  // Execute
  eval(js1);
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 2: Prefix increment
console.log('\n2️⃣ اختبار ++س:');
try {
  const code2 = `
متغير س = 0;
++س;
اطبع(س);
`;
  const lexer2 = new Lexer(code2);
  const tokens2 = lexer2.tokenize();
  const parser2 = new Parser(tokens2);
  const ast2 = parser2.parse();
  const compiler2 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js2 = compiler2.compile(ast2);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js2);
  
  // Execute
  eval(js2);
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 3: Postfix decrement
console.log('\n3️⃣ اختبار س--:');
try {
  const code3 = `
متغير س = 10;
س--;
اطبع(س);
`;
  const lexer3 = new Lexer(code3);
  const tokens3 = lexer3.tokenize();
  const parser3 = new Parser(tokens3);
  const ast3 = parser3.parse();
  const compiler3 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js3 = compiler3.compile(ast3);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js3);
  
  // Execute
  eval(js3);
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 4: For loop with ++
console.log('\n4️⃣ اختبار حلقة for مع ++:');
try {
  const code4 = `
لكل (متغير ط = 0; ط < 5; ط++) {
  اطبع(ط);
}
`;
  const lexer4 = new Lexer(code4);
  const tokens4 = lexer4.tokenize();
  const parser4 = new Parser(tokens4);
  const ast4 = parser4.parse();
  const compiler4 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js4 = compiler4.compile(ast4);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js4);
  
  // Execute
  eval(js4);
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 5: While loop with ++
console.log('\n5️⃣ اختبار حلقة while مع ++:');
try {
  const code5 = `
متغير ط = 0;
بينما (ط < 3) {
  اطبع(ط);
  ط++;
}
`;
  const lexer5 = new Lexer(code5);
  const tokens5 = lexer5.tokenize();
  const parser5 = new Parser(tokens5);
  const ast5 = parser5.parse();
  const compiler5 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js5 = compiler5.compile(ast5);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js5);
  
  // Execute
  eval(js5);
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 6: Complex expression with ++
console.log('\n6️⃣ اختبار تعبير معقد مع ++:');
try {
  const code6 = `
متغير س = 5;
متغير ص = س++ + ++س;
اطبع("س =", س);
اطبع("ص =", ص);
`;
  const lexer6 = new Lexer(code6);
  const tokens6 = lexer6.tokenize();
  const parser6 = new Parser(tokens6);
  const ast6 = parser6.parse();
  const compiler6 = new Compiler({ module: 'commonjs', target: 'es2020' });
  const js6 = compiler6.compile(ast6);
  console.log('✅ نجح التحليل والترجمة');
  console.log('الكود المترجم:');
  console.log(js6);
  
  // Execute
  eval(js6);
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('✅ اكتملت جميع الاختبارات!');

