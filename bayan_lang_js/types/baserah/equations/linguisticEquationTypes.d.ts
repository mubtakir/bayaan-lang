/**
 * Linguistic Causal Equations System - نظام المعادلات اللغوية السببية
 *
 * This revolutionary system allows expressing causal relationships using linguistic roles
 * and custom equations, enabling scientific and logical reasoning in code.
 *
 * هذا النظام الثوري يسمح بالتعبير عن العلاقات السببية باستخدام الأدوار اللغوية
 * والمعادلات المخصصة، مما يمكّن من التفكير العلمي والمنطقي في الكود.
 */
/**
 * Linguistic Role Types - أنواع الأدوار اللغوية
 */
export declare enum LinguisticRole {
    AGENT = "\u0641\u0627\u0639\u0644",// الفاعل - The one who performs the action
    PATIENT = "\u0645\u0641\u0639\u0648\u0644",// المفعول به - The one affected by the action
    ACTION = "\u0641\u0639\u0644",// الفعل - The action itself
    INSTRUMENT = "\u0623\u062F\u0627\u0629",// الأداة - The tool/instrument used
    LOCATION = "\u0645\u0643\u0627\u0646",// المكان - The location
    TIME = "\u0632\u0645\u0627\u0646",// الزمان - The time
    MANNER = "\u062D\u0627\u0644",// الحال - The manner/state
    REASON = "\u0633\u0628\u0628",// السبب - The reason/cause
    RESULT = "\u0646\u062A\u064A\u062C\u0629",// النتيجة - The result/effect
    CONDITION = "\u0634\u0631\u0637",// الشرط - The condition
    RELATION = "\u0639\u0644\u0627\u0642\u0629",// العلاقة - The relationship
    MODIFIER = "\u0635\u0641\u0629",// الصفة - The modifier/attribute
    POSSESSOR = "\u0645\u0627\u0644\u0643",// المالك - The possessor
    POSSESSED = "\u0645\u0645\u0644\u0648\u0643",// المملوك - The possessed
    CAUSE = "\u0645\u0633\u0628\u0628",// المسبب - The causer
    EFFECT = "\u0623\u062B\u0631",// الأثر - The effect
    ENABLER = "\u0645\u0645\u0643\u0646",// الممكن - The enabler
    PREVENTER = "\u0645\u0627\u0646\u0639",// المانع - The preventer
    CATALYST = "\u0645\u062D\u0641\u0632",// المحفز - The catalyst
    INHIBITOR = "\u0645\u0639\u0637\u0644"
}
/**
 * Role Symbol Mapping - رموز الأدوار اللغوية
 */
export declare const RoleSymbols: {
    readonly فا: LinguisticRole.AGENT;
    readonly مف: LinguisticRole.PATIENT;
    readonly فع: LinguisticRole.ACTION;
    readonly أد: LinguisticRole.INSTRUMENT;
    readonly مك: LinguisticRole.LOCATION;
    readonly زم: LinguisticRole.TIME;
    readonly حا: LinguisticRole.MANNER;
    readonly سب: LinguisticRole.REASON;
    readonly نت: LinguisticRole.RESULT;
    readonly شر: LinguisticRole.CONDITION;
    readonly عل: LinguisticRole.RELATION;
    readonly صف: LinguisticRole.MODIFIER;
    readonly مل: LinguisticRole.POSSESSOR;
    readonly مم: LinguisticRole.POSSESSED;
    readonly مس: LinguisticRole.CAUSE;
    readonly أث: LinguisticRole.EFFECT;
    readonly كن: LinguisticRole.ENABLER;
    readonly من: LinguisticRole.PREVENTER;
    readonly مح: LinguisticRole.CATALYST;
    readonly مع: LinguisticRole.INHIBITOR;
    readonly AG: LinguisticRole.AGENT;
    readonly PT: LinguisticRole.PATIENT;
    readonly AC: LinguisticRole.ACTION;
    readonly IN: LinguisticRole.INSTRUMENT;
    readonly LC: LinguisticRole.LOCATION;
    readonly TM: LinguisticRole.TIME;
    readonly MN: LinguisticRole.MANNER;
    readonly RS: LinguisticRole.REASON;
    readonly RE: LinguisticRole.RESULT;
    readonly CD: LinguisticRole.CONDITION;
    readonly RL: LinguisticRole.RELATION;
    readonly MD: LinguisticRole.MODIFIER;
    readonly PS: LinguisticRole.POSSESSOR;
    readonly PD: LinguisticRole.POSSESSED;
    readonly CS: LinguisticRole.CAUSE;
    readonly EF: LinguisticRole.EFFECT;
    readonly EN: LinguisticRole.ENABLER;
    readonly PR: LinguisticRole.PREVENTER;
    readonly CT: LinguisticRole.CATALYST;
    readonly IH: LinguisticRole.INHIBITOR;
};
/**
 * Entity in a linguistic equation - كيان في المعادلة اللغوية
 */
export interface LinguisticEntity {
    id: string;
    name: string;
    role: LinguisticRole;
    attributes: Map<string, any>;
    state: EntityState;
}
/**
 * Entity State - حالة الكيان
 */
export interface EntityState {
    properties: Map<string, any>;
    relations: Relation[];
    timestamp: number;
}
/**
 * Relation between entities - علاقة بين الكيانات
 */
export interface Relation {
    type: string;
    source: string;
    target: string;
    strength: number;
    metadata: Map<string, any>;
}
/**
 * Linguistic Equation - المعادلة اللغوية
 */
export interface LinguisticEquation {
    id: string;
    name: string;
    description: string;
    inputs: LinguisticEntity[];
    outputs: LinguisticEntity[];
    operators: EquationOperator[];
    conditions: Condition[];
    effects: Effect[];
    priority: number;
    enabled: boolean;
}
/**
 * Equation Operator - مشغل المعادلة
 */
export interface EquationOperator {
    symbol: string;
    name: string;
    type: OperatorType;
    apply: (entities: LinguisticEntity[]) => LinguisticEntity[];
    precedence: number;
    associativity: 'left' | 'right';
}
/**
 * Operator Types - أنواع المشغلات
 */
export declare enum OperatorType {
    CAUSES = "\u064A\u0633\u0628\u0628",// يسبب - causes
    ENABLES = "\u064A\u0645\u0643\u0646",// يمكن - enables
    PREVENTS = "\u064A\u0645\u0646\u0639",// يمنع - prevents
    REQUIRES = "\u064A\u062A\u0637\u0644\u0628",// يتطلب - requires
    TRIGGERS = "\u064A\u062D\u0641\u0632",// يحفز - triggers
    INHIBITS = "\u064A\u0639\u0637\u0644",// يعطل - inhibits
    TRANSFORMS = "\u064A\u062D\u0648\u0644",// يحول - transforms
    INCREASES = "\u064A\u0632\u064A\u062F",// يزيد - increases
    DECREASES = "\u064A\u0646\u0642\u0635",// ينقص - decreases
    MAINTAINS = "\u064A\u062D\u0627\u0641\u0638",// يحافظ - maintains
    RELATES = "\u064A\u0631\u0628\u0637",// يربط - relates
    SEPARATES = "\u064A\u0641\u0635\u0644",// يفصل - separates
    COMBINES = "\u064A\u062C\u0645\u0639",// يجمع - combines
    DIVIDES = "\u064A\u0642\u0633\u0645",// يقسم - divides
    IF = "\u0625\u0630\u0627",// إذا - if
    UNLESS = "\u0625\u0644\u0627",// إلا - unless
    WHEN = "\u0639\u0646\u062F\u0645\u0627",// عندما - when
    WHILE = "\u0628\u064A\u0646\u0645\u0627",// بينما - while
    CUSTOM = "\u0645\u062E\u0635\u0635"
}
/**
 * Condition - الشرط
 */
export interface Condition {
    id: string;
    type: ConditionType;
    expression: string;
    evaluate: (context: EquationContext) => boolean;
}
/**
 * Condition Types - أنواع الشروط
 */
export declare enum ConditionType {
    STATE = "\u062D\u0627\u0644\u0629",// حالة - state condition
    RELATION = "\u0639\u0644\u0627\u0642\u0629",// علاقة - relation condition
    ATTRIBUTE = "\u0635\u0641\u0629",// صفة - attribute condition
    TEMPORAL = "\u0632\u0645\u0646\u064A\u0629",// زمنية - temporal condition
    LOGICAL = "\u0645\u0646\u0637\u0642\u064A\u0629"
}
/**
 * Effect - التأثير
 */
export interface Effect {
    id: string;
    type: EffectType;
    target: string;
    magnitude: number;
    duration: number;
    apply: (entity: LinguisticEntity) => void;
    cancelled: boolean;
}
/**
 * Effect Types - أنواع التأثيرات
 */
export declare enum EffectType {
    STATE_CHANGE = "\u062A\u063A\u064A\u064A\u0631_\u062D\u0627\u0644\u0629",// تغيير حالة - state change
    ATTRIBUTE_CHANGE = "\u062A\u063A\u064A\u064A\u0631_\u0635\u0641\u0629",// تغيير صفة - attribute change
    RELATION_CHANGE = "\u062A\u063A\u064A\u064A\u0631_\u0639\u0644\u0627\u0642\u0629",// تغيير علاقة - relation change
    CREATION = "\u0625\u0646\u0634\u0627\u0621",// إنشاء - creation
    DESTRUCTION = "\u0625\u062A\u0644\u0627\u0641",// إتلاف - destruction
    TRANSFORMATION = "\u062A\u062D\u0648\u064A\u0644"
}
/**
 * Equation Context - سياق المعادلة
 */
export interface EquationContext {
    entities: Map<string, LinguisticEntity>;
    equations: Map<string, LinguisticEquation>;
    history: EquationEvent[];
    timestamp: number;
    metadata: Map<string, any>;
}
/**
 * Equation Event - حدث المعادلة
 */
export interface EquationEvent {
    id: string;
    equationId: string;
    timestamp: number;
    inputs: LinguisticEntity[];
    outputs: LinguisticEntity[];
    cancelled: boolean;
    reason?: string;
}
/**
 * Custom Operator Definition - تعريف المشغل المخصص
 */
export interface CustomOperatorDefinition {
    symbol: string;
    name: string;
    nameEn: string;
    description: string;
    precedence: number;
    associativity: 'left' | 'right';
    inputRoles: LinguisticRole[];
    outputRoles: LinguisticRole[];
    implementation: string;
    examples: string[];
}
/**
 * Result Cancellation - تعطيل النتيجة
 */
export interface ResultCancellation {
    id: string;
    effectId: string;
    reason: string;
    condition: Condition;
    timestamp: number;
}
