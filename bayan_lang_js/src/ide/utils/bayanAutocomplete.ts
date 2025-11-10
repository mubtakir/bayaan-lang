/**
 * نظام الإكمال التلقائي للغة البيان
 * Bayan Language Autocomplete System
 */

import { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';

/**
 * اقتراحات الكلمات المفتاحية
 * Keyword Suggestions
 */
const keywordCompletions: Completion[] = [
  // Control Flow
  { label: 'إذا', type: 'keyword', detail: 'if - شرط', info: 'إذا (شرط) { ... }' },
  { label: 'if', type: 'keyword', detail: 'إذا - condition', info: 'if (condition) { ... }' },
  { label: 'وإلا', type: 'keyword', detail: 'else - خلاف ذلك', info: 'وإلا { ... }' },
  { label: 'else', type: 'keyword', detail: 'وإلا - otherwise', info: 'else { ... }' },
  { label: 'وإلا_إذا', type: 'keyword', detail: 'else if - شرط آخر', info: 'وإلا_إذا (شرط) { ... }' },
  { label: 'else_if', type: 'keyword', detail: 'وإلا_إذا - another condition', info: 'else_if (condition) { ... }' },
  { label: 'بينما', type: 'keyword', detail: 'while - حلقة', info: 'بينما (شرط) { ... }' },
  { label: 'while', type: 'keyword', detail: 'بينما - loop', info: 'while (condition) { ... }' },
  { label: 'لكل', type: 'keyword', detail: 'for - حلقة تكرار', info: 'لكل (عنصر في قائمة) { ... }' },
  { label: 'for', type: 'keyword', detail: 'لكل - iteration loop', info: 'for (item in list) { ... }' },
  
  // Declarations
  { label: 'دالة', type: 'keyword', detail: 'function - تعريف دالة', info: 'دالة اسم(معاملات) { ... }' },
  { label: 'function', type: 'keyword', detail: 'دالة - function definition', info: 'function name(params) { ... }' },
  { label: 'ليكن', type: 'keyword', detail: 'let - متغير', info: 'ليكن اسم = قيمة' },
  { label: 'let', type: 'keyword', detail: 'ليكن - variable', info: 'let name = value' },
  { label: 'متغير', type: 'keyword', detail: 'var - متغير', info: 'متغير اسم = قيمة' },
  { label: 'var', type: 'keyword', detail: 'متغير - variable', info: 'var name = value' },
  { label: 'ثابت', type: 'keyword', detail: 'const - ثابت', info: 'ثابت اسم = قيمة' },
  { label: 'const', type: 'keyword', detail: 'ثابت - constant', info: 'const name = value' },
  
  // OOP
  { label: 'صنف', type: 'keyword', detail: 'class - تعريف صنف', info: 'صنف اسم { ... }' },
  { label: 'class', type: 'keyword', detail: 'صنف - class definition', info: 'class Name { ... }' },
  { label: 'جديد', type: 'keyword', detail: 'new - إنشاء كائن', info: 'جديد صنف()' },
  { label: 'new', type: 'keyword', detail: 'جديد - create object', info: 'new Class()' },
  { label: 'هذا', type: 'keyword', detail: 'this - الكائن الحالي', info: 'هذا.خاصية' },
  { label: 'this', type: 'keyword', detail: 'هذا - current object', info: 'this.property' },
  { label: 'يمتد', type: 'keyword', detail: 'extends - الوراثة', info: 'صنف فرع يمتد أصل { ... }' },
  { label: 'extends', type: 'keyword', detail: 'يمتد - inheritance', info: 'class Child extends Parent { ... }' },
  
  // Logic Programming
  { label: 'حقيقة', type: 'keyword', detail: 'fact - حقيقة منطقية', info: 'حقيقة اسم(معاملات)' },
  { label: 'fact', type: 'keyword', detail: 'حقيقة - logical fact', info: 'fact name(params)' },
  { label: 'قاعدة', type: 'keyword', detail: 'rule - قاعدة منطقية', info: 'قاعدة رأس ← جسم' },
  { label: 'rule', type: 'keyword', detail: 'قاعدة - logical rule', info: 'rule head ← body' },
  { label: 'استعلام', type: 'keyword', detail: 'query - استعلام منطقي', info: 'استعلام هدف' },
  { label: 'query', type: 'keyword', detail: 'استعلام - logical query', info: 'query goal' },
  
  // Returns
  { label: 'إرجاع', type: 'keyword', detail: 'return - إرجاع قيمة', info: 'إرجاع قيمة' },
  { label: 'return', type: 'keyword', detail: 'إرجاع - return value', info: 'return value' },
  
  // Boolean
  { label: 'صحيح', type: 'keyword', detail: 'true - قيمة منطقية', info: 'صحيح' },
  { label: 'true', type: 'keyword', detail: 'صحيح - boolean value', info: 'true' },
  { label: 'خطأ', type: 'keyword', detail: 'false - قيمة منطقية', info: 'خطأ' },
  { label: 'false', type: 'keyword', detail: 'خطأ - boolean value', info: 'false' },
  
  // Baserah AI
  { label: 'معادلة_أم', type: 'keyword', detail: 'mother_equation - المعادلة الأم', info: 'معادلة_أم(id, Φ, Ψ, Γ)' },
  { label: 'mother_equation', type: 'keyword', detail: 'معادلة_أم - Mother Equation', info: 'mother_equation(id, Φ, Ψ, Γ)' },
  { label: 'انتقل', type: 'keyword', detail: 'go - مشغل الانتقال', info: 'انتقل(كائن, من, إلى)' },
  { label: 'go', type: 'keyword', detail: 'انتقل - Go operator', info: 'go(object, from, to)' },
  { label: 'أثر', type: 'keyword', detail: 'affect - مشغل التأثير', info: 'أثر(فاعل, مفعول, نوع, شدة)' },
  { label: 'affect', type: 'keyword', detail: 'أثر - Affect operator', info: 'affect(actor, object, type, intensity)' },
  { label: 'حول', type: 'keyword', detail: 'transform - مشغل التحول', info: 'حول(كائن, تحولات)' },
  { label: 'transform', type: 'keyword', detail: 'حول - Transform operator', info: 'transform(object, transformations)' },
  { label: 'أنشئ', type: 'keyword', detail: 'create - مشغل الإنشاء', info: 'أنشئ(مكونات, وصفة)' },
  { label: 'create', type: 'keyword', detail: 'أنشئ - Create operator', info: 'create(components, recipe)' },
  { label: 'ادمج', type: 'keyword', detail: 'merge - مشغل الدمج', info: 'ادمج(كائنات, استراتيجية)' },
  { label: 'merge', type: 'keyword', detail: 'ادمج - Merge operator', info: 'merge(objects, strategy)' },
  { label: 'فكك', type: 'keyword', detail: 'decompose - مشغل التفكيك', info: 'فكك(كائن, أجزاء)' },
  { label: 'decompose', type: 'keyword', detail: 'فكك - Decompose operator', info: 'decompose(object, parts)' },
  { label: 'تفاعل', type: 'keyword', detail: 'interact - مشغل التفاعل', info: 'تفاعل(كائن1, كائن2, نوع)' },
  { label: 'interact', type: 'keyword', detail: 'تفاعل - Interact operator', info: 'interact(obj1, obj2, type)' }
];

/**
 * اقتراحات الدوال المدمجة
 * Built-in Function Suggestions
 */
const functionCompletions: Completion[] = [
  { label: 'اطبع', type: 'function', detail: 'print - طباعة', info: 'اطبع(نص)' },
  { label: 'print', type: 'function', detail: 'اطبع - print', info: 'print(text)' },
  { label: 'طول', type: 'function', detail: 'length - طول القائمة', info: 'طول(قائمة)' },
  { label: 'length', type: 'function', detail: 'طول - list length', info: 'length(list)' },
  { label: 'انضم', type: 'function', detail: 'join - دمج نصوص', info: 'انضم(قائمة, فاصل)' },
  { label: 'join', type: 'function', detail: 'انضم - join strings', info: 'join(list, separator)' },
  { label: 'قسم', type: 'function', detail: 'split - تقسيم نص', info: 'قسم(نص, فاصل)' },
  { label: 'split', type: 'function', detail: 'قسم - split string', info: 'split(text, separator)' },
  { label: 'رشح', type: 'function', detail: 'filter - ترشيح قائمة', info: 'رشح(قائمة, دالة)' },
  { label: 'filter', type: 'function', detail: 'رشح - filter list', info: 'filter(list, function)' },
  { label: 'خريطة', type: 'function', detail: 'map - تحويل قائمة', info: 'خريطة(قائمة, دالة)' },
  { label: 'map', type: 'function', detail: 'خريطة - map list', info: 'map(list, function)' },
  { label: 'اطوي', type: 'function', detail: 'reduce - طي قائمة', info: 'اطوي(قائمة, دالة, قيمة_أولية)' },
  { label: 'reduce', type: 'function', detail: 'اطوي - reduce list', info: 'reduce(list, function, initial)' }
];

/**
 * قوالب الكود
 * Code Snippets
 */
const snippetCompletions: Completion[] = [
  {
    label: 'دالة_كاملة',
    type: 'snippet',
    detail: 'قالب دالة كاملة',
    apply: 'دالة ${1:اسم}(${2:معاملات}) {\n\t${3:// الكود هنا}\n\tإرجاع ${4:قيمة}\n}'
  },
  {
    label: 'صنف_كامل',
    type: 'snippet',
    detail: 'قالب صنف كامل',
    apply: 'صنف ${1:اسم} {\n\tمنشئ(${2:معاملات}) {\n\t\t${3:// التهيئة}\n\t}\n\n\t${4:// الدوال}\n}'
  },
  {
    label: 'حلقة_لكل',
    type: 'snippet',
    detail: 'قالب حلقة لكل',
    apply: 'لكل (${1:عنصر} في ${2:قائمة}) {\n\t${3:// الكود هنا}\n}'
  },
  {
    label: 'شرط_إذا',
    type: 'snippet',
    detail: 'قالب شرط إذا',
    apply: 'إذا (${1:شرط}) {\n\t${2:// الكود هنا}\n} وإلا {\n\t${3:// خلاف ذلك}\n}'
  }
];

/**
 * دالة الإكمال التلقائي الرئيسية
 * Main Autocomplete Function
 */
export function bayanAutocomplete(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/[\u0600-\u06FF\w]*/);
  
  if (!word || (word.from === word.to && !context.explicit)) {
    return null;
  }

  const allCompletions = [
    ...keywordCompletions,
    ...functionCompletions,
    ...snippetCompletions
  ];

  // تصفية الاقتراحات بناءً على النص المدخل
  const options = allCompletions.filter(item => 
    item.label.startsWith(word.text) || 
    item.label.toLowerCase().startsWith(word.text.toLowerCase())
  );

  return {
    from: word.from,
    options: options,
    validFor: /^[\u0600-\u06FF\w]*$/
  };
}

