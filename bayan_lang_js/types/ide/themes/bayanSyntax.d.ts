/**
 * نظام إبراز الصيغة للغة البيان
 * Bayan Language Syntax Highlighting System
 */
import { HighlightStyle } from '@codemirror/language';
/**
 * الكلمات المفتاحية العربية
 * Arabic Keywords
 */
export declare const arabicKeywords: string[];
/**
 * الدوال المدمجة
 * Built-in Functions
 */
export declare const builtinFunctions: string[];
/**
 * نمط إبراز الصيغة الفاتح
 * Light Syntax Highlighting Style
 */
export declare const bayanLightHighlightStyle: HighlightStyle;
/**
 * نمط إبراز الصيغة الداكن
 * Dark Syntax Highlighting Style
 */
export declare const bayanDarkHighlightStyle: HighlightStyle;
/**
 * تصدير أنماط الإبراز
 * Export Highlighting Styles
 */
export declare const bayanLightSyntax: import("@codemirror/state").Extension;
export declare const bayanDarkSyntax: import("@codemirror/state").Extension;
