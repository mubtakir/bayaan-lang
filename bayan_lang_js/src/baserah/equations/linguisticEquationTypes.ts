/**
 * Linguistic Causal Equations System - نظام المعادلات اللغوية السببية
 * 
 * This revolutionary system allows expressing causal relationships using linguistic roles
 * and custom equations, enabling scientific and logical reasoning in code.
 * 
 * هذا النظام الثوري يسمح بالتعبير عن العلاقات السببية باستخدام الأدوار اللغوية
 * والمعادلات المخصصة، مما يمكّن من التفكير العلمي والمنطقي في الكود.
 */

// ============================================================================
// Linguistic Roles - الأدوار اللغوية
// ============================================================================

/**
 * Linguistic Role Types - أنواع الأدوار اللغوية
 */
export enum LinguisticRole {
  // Core Roles - الأدوار الأساسية
  AGENT = 'فاعل',              // الفاعل - The one who performs the action
  PATIENT = 'مفعول',            // المفعول به - The one affected by the action
  ACTION = 'فعل',               // الفعل - The action itself
  INSTRUMENT = 'أداة',          // الأداة - The tool/instrument used
  LOCATION = 'مكان',            // المكان - The location
  TIME = 'زمان',                // الزمان - The time
  MANNER = 'حال',               // الحال - The manner/state
  REASON = 'سبب',               // السبب - The reason/cause
  RESULT = 'نتيجة',             // النتيجة - The result/effect
  CONDITION = 'شرط',            // الشرط - The condition
  
  // Relational Roles - الأدوار العلائقية
  RELATION = 'علاقة',           // العلاقة - The relationship
  MODIFIER = 'صفة',             // الصفة - The modifier/attribute
  POSSESSOR = 'مالك',           // المالك - The possessor
  POSSESSED = 'مملوك',          // المملوك - The possessed
  
  // Causal Roles - الأدوار السببية
  CAUSE = 'مسبب',               // المسبب - The causer
  EFFECT = 'أثر',               // الأثر - The effect
  ENABLER = 'ممكن',             // الممكن - The enabler
  PREVENTER = 'مانع',           // المانع - The preventer
  CATALYST = 'محفز',            // المحفز - The catalyst
  INHIBITOR = 'معطل',           // المعطل - The inhibitor
}

/**
 * Role Symbol Mapping - رموز الأدوار اللغوية
 */
export const RoleSymbols = {
  // Arabic Symbols - الرموز العربية (two-letter symbols for clarity and uniqueness)
  'فا': LinguisticRole.AGENT,        // فاعل
  'مف': LinguisticRole.PATIENT,      // مفعول
  'فع': LinguisticRole.ACTION,       // فعل
  'أد': LinguisticRole.INSTRUMENT,   // أداة
  'مك': LinguisticRole.LOCATION,     // مكان
  'زم': LinguisticRole.TIME,         // زمان
  'حا': LinguisticRole.MANNER,       // حال
  'سب': LinguisticRole.REASON,       // سبب
  'نت': LinguisticRole.RESULT,       // نتيجة
  'شر': LinguisticRole.CONDITION,    // شرط
  'عل': LinguisticRole.RELATION,     // علاقة
  'صف': LinguisticRole.MODIFIER,     // صفة
  'مل': LinguisticRole.POSSESSOR,    // مالك
  'مم': LinguisticRole.POSSESSED,    // مملوك
  'مس': LinguisticRole.CAUSE,        // مسبب
  'أث': LinguisticRole.EFFECT,       // أثر
  'كن': LinguisticRole.ENABLER,      // ممكّن (تمكين)
  'من': LinguisticRole.PREVENTER,    // مانع
  'مح': LinguisticRole.CATALYST,     // محفز
  'مع': LinguisticRole.INHIBITOR,    // معطل

  // English Symbols
  'AG': LinguisticRole.AGENT,
  'PT': LinguisticRole.PATIENT,
  'AC': LinguisticRole.ACTION,
  'IN': LinguisticRole.INSTRUMENT,
  'LC': LinguisticRole.LOCATION,
  'TM': LinguisticRole.TIME,
  'MN': LinguisticRole.MANNER,
  'RS': LinguisticRole.REASON,
  'RE': LinguisticRole.RESULT,
  'CD': LinguisticRole.CONDITION,
  'RL': LinguisticRole.RELATION,
  'MD': LinguisticRole.MODIFIER,
  'PS': LinguisticRole.POSSESSOR,
  'PD': LinguisticRole.POSSESSED,
  'CS': LinguisticRole.CAUSE,
  'EF': LinguisticRole.EFFECT,
  'EN': LinguisticRole.ENABLER,
  'PR': LinguisticRole.PREVENTER,
  'CT': LinguisticRole.CATALYST,
  'IH': LinguisticRole.INHIBITOR,
} as const;

// ============================================================================
// Linguistic Equation Components - مكونات المعادلة اللغوية
// ============================================================================

/**
 * Entity in a linguistic equation - كيان في المعادلة اللغوية
 */
export interface LinguisticEntity {
  id: string;                    // معرف الكيان
  name: string;                  // اسم الكيان
  role: LinguisticRole;          // دور الكيان
  attributes: Map<string, any>;  // صفات الكيان
  state: EntityState;            // حالة الكيان
}

/**
 * Entity State - حالة الكيان
 */
export interface EntityState {
  properties: Map<string, any>;  // الخصائص
  relations: Relation[];         // العلاقات
  timestamp: number;             // الطابع الزمني
}

/**
 * Relation between entities - علاقة بين الكيانات
 */
export interface Relation {
  type: string;                  // نوع العلاقة
  source: string;                // المصدر (معرف الكيان)
  target: string;                // الهدف (معرف الكيان)
  strength: number;              // قوة العلاقة (0-1)
  metadata: Map<string, any>;    // بيانات إضافية
}

/**
 * Linguistic Equation - المعادلة اللغوية
 */
export interface LinguisticEquation {
  id: string;                    // معرف المعادلة
  name: string;                  // اسم المعادلة
  description: string;           // وصف المعادلة
  inputs: LinguisticEntity[];    // المدخلات
  outputs: LinguisticEntity[];   // المخرجات
  operators: EquationOperator[]; // المشغلات
  conditions: Condition[];       // الشروط
  effects: Effect[];             // التأثيرات
  priority: number;              // الأولوية
  enabled: boolean;              // مفعلة أم لا
}

/**
 * Equation Operator - مشغل المعادلة
 */
export interface EquationOperator {
  symbol: string;                // الرمز
  name: string;                  // الاسم
  type: OperatorType;            // النوع
  apply: (entities: LinguisticEntity[]) => LinguisticEntity[]; // التطبيق
  precedence: number;            // الأسبقية
  associativity: 'left' | 'right'; // الترابطية
}

/**
 * Operator Types - أنواع المشغلات
 */
export enum OperatorType {
  // Causal Operators - المشغلات السببية
  CAUSES = 'يسبب',               // يسبب - causes
  ENABLES = 'يمكن',              // يمكن - enables
  PREVENTS = 'يمنع',             // يمنع - prevents
  REQUIRES = 'يتطلب',            // يتطلب - requires
  TRIGGERS = 'يحفز',             // يحفز - triggers
  INHIBITS = 'يعطل',             // يعطل - inhibits
  
  // Transformational Operators - المشغلات التحويلية
  TRANSFORMS = 'يحول',           // يحول - transforms
  INCREASES = 'يزيد',            // يزيد - increases
  DECREASES = 'ينقص',            // ينقص - decreases
  MAINTAINS = 'يحافظ',           // يحافظ - maintains
  
  // Relational Operators - المشغلات العلائقية
  RELATES = 'يربط',              // يربط - relates
  SEPARATES = 'يفصل',            // يفصل - separates
  COMBINES = 'يجمع',             // يجمع - combines
  DIVIDES = 'يقسم',              // يقسم - divides
  
  // Conditional Operators - المشغلات الشرطية
  IF = 'إذا',                    // إذا - if
  UNLESS = 'إلا',                // إلا - unless
  WHEN = 'عندما',                // عندما - when
  WHILE = 'بينما',               // بينما - while
  
  // Custom - مخصص
  CUSTOM = 'مخصص',               // مخصص - custom
}

/**
 * Condition - الشرط
 */
export interface Condition {
  id: string;                    // معرف الشرط
  type: ConditionType;           // نوع الشرط
  expression: string;            // التعبير
  evaluate: (context: EquationContext) => boolean; // التقييم
}

/**
 * Condition Types - أنواع الشروط
 */
export enum ConditionType {
  STATE = 'حالة',                // حالة - state condition
  RELATION = 'علاقة',            // علاقة - relation condition
  ATTRIBUTE = 'صفة',             // صفة - attribute condition
  TEMPORAL = 'زمنية',            // زمنية - temporal condition
  LOGICAL = 'منطقية',            // منطقية - logical condition
}

/**
 * Effect - التأثير
 */
export interface Effect {
  id: string;                    // معرف التأثير
  type: EffectType;              // نوع التأثير
  target: string;                // الهدف (معرف الكيان)
  magnitude: number;             // الحجم (0-1)
  duration: number;              // المدة (بالميلي ثانية)
  apply: (entity: LinguisticEntity) => void; // التطبيق
  cancelled: boolean;            // ملغى أم لا
}

/**
 * Effect Types - أنواع التأثيرات
 */
export enum EffectType {
  STATE_CHANGE = 'تغيير_حالة',   // تغيير حالة - state change
  ATTRIBUTE_CHANGE = 'تغيير_صفة', // تغيير صفة - attribute change
  RELATION_CHANGE = 'تغيير_علاقة', // تغيير علاقة - relation change
  CREATION = 'إنشاء',            // إنشاء - creation
  DESTRUCTION = 'إتلاف',         // إتلاف - destruction
  TRANSFORMATION = 'تحويل',      // تحويل - transformation
}

/**
 * Equation Context - سياق المعادلة
 */
export interface EquationContext {
  entities: Map<string, LinguisticEntity>; // الكيانات
  equations: Map<string, LinguisticEquation>; // المعادلات
  history: EquationEvent[];      // التاريخ
  timestamp: number;             // الطابع الزمني
  metadata: Map<string, any>;    // بيانات إضافية
}

/**
 * Equation Event - حدث المعادلة
 */
export interface EquationEvent {
  id: string;                    // معرف الحدث
  equationId: string;            // معرف المعادلة
  timestamp: number;             // الطابع الزمني
  inputs: LinguisticEntity[];    // المدخلات
  outputs: LinguisticEntity[];   // المخرجات
  cancelled: boolean;            // ملغى أم لا
  reason?: string;               // السبب (إذا كان ملغى)
}

// ============================================================================
// Custom Operator Definition - تعريف المشغل المخصص
// ============================================================================

/**
 * Custom Operator Definition - تعريف المشغل المخصص
 */
export interface CustomOperatorDefinition {
  symbol: string;                // الرمز
  name: string;                  // الاسم (عربي)
  nameEn: string;                // الاسم (إنجليزي)
  description: string;           // الوصف
  precedence: number;            // الأسبقية
  associativity: 'left' | 'right'; // الترابطية
  inputRoles: LinguisticRole[];  // أدوار المدخلات
  outputRoles: LinguisticRole[]; // أدوار المخرجات
  implementation: string;        // التنفيذ (كود)
  examples: string[];            // أمثلة
}

/**
 * Result Cancellation - تعطيل النتيجة
 */
export interface ResultCancellation {
  id: string;                    // معرف التعطيل
  effectId: string;              // معرف التأثير المعطل
  reason: string;                // السبب
  condition: Condition;          // الشرط
  timestamp: number;             // الطابع الزمني
}

