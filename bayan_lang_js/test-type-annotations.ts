#!/usr/bin/env ts-node

import { Lexer } from './src/lexer/lexer';
import { Parser } from './src/parser/parser';
import { Compiler } from './src/compiler/compiler';

console.log('🧪 اختبار Type Annotations\n');
console.log('='.repeat(60));

// Test 1: Variable with type annotation
console.log('\n1️⃣ اختبار متغير مع نوع:');
try {
  const code1 = `
متغير س: رقم = 5;
متغير اسم: نص = "أحمد";
متغير نشط: منطقي = صحيح;
`;
  const lexer1 = new Lexer(code1);
  const tokens1 = lexer1.tokenize();
  console.log('Tokens:', tokens1.map(t => `${t.type}:${t.value}`).join(', '));
  
  const parser1 = new Parser(tokens1);
  const ast1 = parser1.parse();
  console.log('✅ نجح التحليل');
  console.log('AST:', JSON.stringify(ast1, null, 2).substring(0, 500));
} catch (error: any) {
  console.log('❌ فشل:', error.message);
  console.log('Stack:', error.stack);
}

// Test 2: Function with parameter types and return type
console.log('\n2️⃣ اختبار دالة مع أنواع المعاملات ونوع الإرجاع:');
try {
  const code2 = `
دالة جمع(أ: رقم، ب: رقم): رقم {
  ارجع أ + ب;
}
`;
  const lexer2 = new Lexer(code2);
  const tokens2 = lexer2.tokenize();
  console.log('Tokens:', tokens2.map(t => `${t.type}:${t.value}`).join(', '));
  const parser2 = new Parser(tokens2);
  const ast2 = parser2.parse();
  console.log('✅ نجح التحليل');
  console.log('AST:', JSON.stringify(ast2, null, 2).substring(0, 500));
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 3: Union types
console.log('\n3️⃣ اختبار Union Types:');
try {
  const code3 = `
متغير قيمة: رقم | نص = 5;
`;
  const lexer3 = new Lexer(code3);
  const tokens3 = lexer3.tokenize();
  const parser3 = new Parser(tokens3);
  const ast3 = parser3.parse();
  console.log('✅ نجح التحليل');
  console.log('AST:', JSON.stringify(ast3, null, 2).substring(0, 500));
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 4: Array types
console.log('\n4️⃣ اختبار Array Types:');
try {
  const code4 = `
متغير أرقام: رقم = [1, 2, 3];
`;
  const lexer4 = new Lexer(code4);
  const tokens4 = lexer4.tokenize();
  const parser4 = new Parser(tokens4);
  const ast4 = parser4.parse();
  console.log('✅ نجح التحليل');
  console.log('AST:', JSON.stringify(ast4, null, 2).substring(0, 500));
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 5: English keywords
console.log('\n5️⃣ اختبار الكلمات المفتاحية الإنجليزية:');
try {
  const code5 = `
var x: number = 5;
var name: string = "Ahmed";
var active: boolean = true;
`;
  const lexer5 = new Lexer(code5);
  const tokens5 = lexer5.tokenize();
  const parser5 = new Parser(tokens5);
  const ast5 = parser5.parse();
  console.log('✅ نجح التحليل');
  console.log('AST:', JSON.stringify(ast5, null, 2).substring(0, 500));
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

// Test 6: Function with English keywords
console.log('\n6️⃣ اختبار دالة بالإنجليزية:');
try {
  const code6 = `
function add(a: number, b: number): number {
  return a + b;
}
`;
  const lexer6 = new Lexer(code6);
  const tokens6 = lexer6.tokenize();
  const parser6 = new Parser(tokens6);
  const ast6 = parser6.parse();
  console.log('✅ نجح التحليل');
  console.log('AST:', JSON.stringify(ast6, null, 2).substring(0, 500));
} catch (error: any) {
  console.log('❌ فشل:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('✅ اكتملت جميع الاختبارات!');

