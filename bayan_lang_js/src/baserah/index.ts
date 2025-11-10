/**
 * بصيرة - Baserah Intelligent System
 *
 * النظام الذكي الشامل للغة البيان
 * Comprehensive intelligent system for Bayan language
 *
 * يجمع جميع الأنظمة الذكية في مكان واحد:
 * - النواة الأساسية (المعادلة الأم والمعاملات اللغوية)
 * - الأنظمة اللغوية (معاني الحروف والتحليل اللغوي)
 * - نظام المعادلات اللغوية
 * - نظام الذكاء الاصطناعي
 * - نظام الدماغ
 * - نظام المعرفة
 * - نظام التعلم
 * - نظام التكامل
 * - الواجهة البرمجية الموحدة
 *
 * Combines all intelligent systems in one place:
 * - Core (Mother Equation and Linguistic Operators)
 * - Linguistic Systems (Letter Meanings and Analysis)
 * - Linguistic Equations System
 * - AI System
 * - Brain System
 * - Knowledge System
 * - Learning System
 * - Integration System
 * - Unified API
 */

// تصدير الوحدات الفرعية كمساحات أسماء لتجنب التعارضات
// Export sub-modules as namespaces to avoid conflicts
export * as Core from './core';
export * as Linguistics from './linguistics';
export * as Equations from './equations';
export * as AI from './ai';
export * as Brain from './brain';
export * as Knowledge from './knowledge';
export * as Learning from './learning';
export * as Integration from './integration';
export * as API from './api';

// تصدير نظام التفكير متعدد الطبقات
// Export Multi-Layer Thinking System
export * from './thinking/thinking-module1';
export * from './thinking/thinking-module2';
export * from './thinking/thinking-module3';
export * from './thinking/thinking-module4';
export * from './thinking/thinking-module5';
export * from './thinking/thinking-module6';
export * from './thinking/thinking-module7';
export * from './thinking/thinking-module8';
export { ThinkingEngine } from './thinking/thinking-engine';
export { CreativeThinking } from './thinking/creative-thinking';

