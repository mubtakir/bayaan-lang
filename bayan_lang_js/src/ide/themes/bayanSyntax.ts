/**
 * نظام إبراز الصيغة للغة البيان
 * Bayan Language Syntax Highlighting System
 */

import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

/**
 * الكلمات المفتاحية العربية
 * Arabic Keywords
 */
export const arabicKeywords = [
  // Control Flow - التحكم في التدفق
  'إذا', 'وإلا', 'وإلا_إذا', 'بينما', 'لكل', 'في', 'كرر', 'توقف', 'استمر',
  'if', 'else', 'else_if', 'while', 'for', 'in', 'repeat', 'break', 'continue',
  
  // Declarations - التصريحات
  'دالة', 'ليكن', 'متغير', 'ثابت', 'صنف', 'واجهة', 'تعداد', 'نطاق',
  'function', 'let', 'var', 'const', 'class', 'interface', 'enum', 'namespace',
  
  // OOP - البرمجة الكائنية
  'هذا', 'جديد', 'يمتد', 'ينفذ', 'منشئ', 'عام', 'خاص', 'محمي', 'ثابت_صنف',
  'this', 'new', 'extends', 'implements', 'constructor', 'public', 'private', 'protected', 'static',
  
  // Logic Programming - البرمجة المنطقية
  'حقيقة', 'قاعدة', 'استعلام', 'أضف_حقيقة', 'أضف_قاعدة', 'احذف_حقيقة',
  'fact', 'rule', 'query', 'assert', 'retract',
  
  // Returns - الإرجاع
  'إرجاع', 'return',
  
  // Types - الأنواع
  'رقم', 'نص', 'منطقي', 'قائمة', 'كائن', 'فارغ', 'غير_معرف',
  'number', 'string', 'boolean', 'list', 'object', 'null', 'undefined',
  
  // Boolean Values - القيم المنطقية
  'صحيح', 'خطأ', 'true', 'false',
  
  // Causal Networks - الشبكات السببية
  'شبكة_سببية', 'عقدة', 'علاقة', 'يسبب', 'يمنع', 'يؤدي_إلى',
  'causal_network', 'node', 'relation', 'causes', 'prevents', 'leads_to',
  
  // Knowledge System - نظام المعرفة
  'شيء', 'حدث', 'معادلة', 'استنتاج', 'معرفة',
  'thing', 'event', 'equation', 'inference', 'knowledge',
  
  // Baserah AI - نظام بصيرة
  'معادلة_أم', 'انتقل', 'أثر', 'حول', 'أنشئ', 'ادمج', 'فكك', 'تفاعل',
  'mother_equation', 'go', 'affect', 'transform', 'create', 'merge', 'decompose', 'interact',
  
  // Generators - المولدات
  'أنتج', 'yield',
  
  // Pattern Matching - مطابقة الأنماط
  'طابق', 'حالة', 'عندما', 'افتراضي',
  'match', 'case', 'when', 'default',
  
  // Async - غير متزامن
  'غير_متزامن', 'انتظر', 'async', 'await',
  
  // Import/Export - الاستيراد والتصدير
  'استورد', 'صدر', 'من', 'import', 'export', 'from',
  
  // Try/Catch - معالجة الأخطاء
  'حاول', 'اصطد', 'أخيراً', 'ارمي',
  'try', 'catch', 'finally', 'throw'
];

/**
 * الدوال المدمجة
 * Built-in Functions
 */
export const builtinFunctions = [
  'اطبع', 'print',
  'طول', 'length',
  'انضم', 'join',
  'قسم', 'split',
  'استبدل', 'replace',
  'ابحث', 'find',
  'رشح', 'filter',
  'خريطة', 'map',
  'اطوي', 'reduce',
  'نوع', 'typeof',
  'تحليل_رقم', 'parseInt',
  'تحليل_عشري', 'parseFloat',
  'نص_إلى_رقم', 'Number',
  'نص_إلى_منطقي', 'Boolean',
  'نص_إلى_نص', 'String'
];

/**
 * نمط إبراز الصيغة الفاتح
 * Light Syntax Highlighting Style
 */
export const bayanLightHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#d73a49', fontWeight: 'bold' },
  { tag: t.controlKeyword, color: '#d73a49', fontWeight: 'bold' },
  { tag: t.definitionKeyword, color: '#6f42c1', fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: '#005cc5' },
  { tag: t.operatorKeyword, color: '#d73a49' },
  
  { tag: t.variableName, color: '#24292e' },
  { tag: t.function(t.variableName), color: '#6f42c1' },
  { tag: t.definition(t.variableName), color: '#005cc5' },
  { tag: t.propertyName, color: '#005cc5' },
  
  { tag: t.string, color: '#032f62' },
  { tag: t.number, color: '#005cc5' },
  { tag: t.bool, color: '#005cc5' },
  { tag: t.null, color: '#005cc5' },
  
  { tag: t.comment, color: '#6a737d', fontStyle: 'italic' },
  { tag: t.lineComment, color: '#6a737d', fontStyle: 'italic' },
  { tag: t.blockComment, color: '#6a737d', fontStyle: 'italic' },
  
  { tag: t.operator, color: '#d73a49' },
  { tag: t.punctuation, color: '#24292e' },
  { tag: t.bracket, color: '#24292e' },
  { tag: t.paren, color: '#24292e' },
  
  { tag: t.className, color: '#6f42c1', fontWeight: 'bold' },
  { tag: t.typeName, color: '#6f42c1' },
  { tag: t.namespace, color: '#6f42c1' },
  
  { tag: t.special(t.variableName), color: '#e36209' },
  { tag: t.meta, color: '#6a737d' },
  { tag: t.invalid, color: '#cb2431', textDecoration: 'underline' }
]);

/**
 * نمط إبراز الصيغة الداكن
 * Dark Syntax Highlighting Style
 */
export const bayanDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#ff7b72', fontWeight: 'bold' },
  { tag: t.controlKeyword, color: '#ff7b72', fontWeight: 'bold' },
  { tag: t.definitionKeyword, color: '#d2a8ff', fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: '#79c0ff' },
  { tag: t.operatorKeyword, color: '#ff7b72' },
  
  { tag: t.variableName, color: '#c9d1d9' },
  { tag: t.function(t.variableName), color: '#d2a8ff' },
  { tag: t.definition(t.variableName), color: '#79c0ff' },
  { tag: t.propertyName, color: '#79c0ff' },
  
  { tag: t.string, color: '#a5d6ff' },
  { tag: t.number, color: '#79c0ff' },
  { tag: t.bool, color: '#79c0ff' },
  { tag: t.null, color: '#79c0ff' },
  
  { tag: t.comment, color: '#8b949e', fontStyle: 'italic' },
  { tag: t.lineComment, color: '#8b949e', fontStyle: 'italic' },
  { tag: t.blockComment, color: '#8b949e', fontStyle: 'italic' },
  
  { tag: t.operator, color: '#ff7b72' },
  { tag: t.punctuation, color: '#c9d1d9' },
  { tag: t.bracket, color: '#c9d1d9' },
  { tag: t.paren, color: '#c9d1d9' },
  
  { tag: t.className, color: '#d2a8ff', fontWeight: 'bold' },
  { tag: t.typeName, color: '#d2a8ff' },
  { tag: t.namespace, color: '#d2a8ff' },
  
  { tag: t.special(t.variableName), color: '#ffa657' },
  { tag: t.meta, color: '#8b949e' },
  { tag: t.invalid, color: '#f85149', textDecoration: 'underline' }
]);

/**
 * تصدير أنماط الإبراز
 * Export Highlighting Styles
 */
export const bayanLightSyntax = syntaxHighlighting(bayanLightHighlightStyle);
export const bayanDarkSyntax = syntaxHighlighting(bayanDarkHighlightStyle);

