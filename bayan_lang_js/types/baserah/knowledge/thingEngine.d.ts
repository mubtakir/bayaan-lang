/**
 * محرك الأشياء والحالات والخصائص
 * Thing, State, and Property Engine
 *
 * نظام شامل لتمثيل الأشياء بحالاتها وخصائصها
 * Comprehensive system for representing things with their states and properties
 */
/**
 * نوع الخاصية - Property Type
 */
export declare enum PropertyType {
    PHYSICAL = "\u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0629",// Physical property
    CHEMICAL = "\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629",// Chemical property
    PSYCHOLOGICAL = "\u0646\u0641\u0633\u064A\u0629",// Psychological property
    LITERARY = "\u0623\u062F\u0628\u064A\u0629",// Literary property
    BIOLOGICAL = "\u0628\u064A\u0648\u0644\u0648\u062C\u064A\u0629",// Biological property
    MATHEMATICAL = "\u0631\u064A\u0627\u0636\u064A\u0629",// Mathematical property
    GEOMETRIC = "\u0647\u0646\u062F\u0633\u064A\u0629",// Geometric property
    TEMPORAL = "\u0632\u0645\u0646\u064A\u0629",// Temporal property
    SPATIAL = "\u0645\u0643\u0627\u0646\u064A\u0629",// Spatial property
    SOCIAL = "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629",// Social property
    ECONOMIC = "\u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629",// Economic property
    CULTURAL = "\u062B\u0642\u0627\u0641\u064A\u0629"
}
/**
 * نوع الحالة - State Type
 */
export declare enum StateType {
    ACTIVE = "\u0646\u0634\u0637",// Active state
    PASSIVE = "\u062E\u0627\u0645\u0644",// Passive state
    TRANSITIONAL = "\u0627\u0646\u062A\u0642\u0627\u0644\u064A",// Transitional state
    STABLE = "\u0645\u0633\u062A\u0642\u0631",// Stable state
    UNSTABLE = "\u063A\u064A\u0631_\u0645\u0633\u062A\u0642\u0631",// Unstable state
    TEMPORARY = "\u0645\u0624\u0642\u062A",// Temporary state
    PERMANENT = "\u062F\u0627\u0626\u0645"
}
/**
 * خاصية الشيء - Thing Property
 */
export declare class ThingProperty {
    name: string;
    value: any;
    type: PropertyType;
    unit?: string | undefined;
    min?: number | undefined;
    max?: number | undefined;
    mutable: boolean;
    constructor(name: string, // اسم الخاصية - Property name
    value: any, // قيمة الخاصية - Property value
    type: PropertyType, // نوع الخاصية - Property type
    unit?: string | undefined, // الوحدة - Unit (e.g., "kg", "°C", "m")
    min?: number | undefined, // القيمة الدنيا - Minimum value
    max?: number | undefined, // القيمة القصوى - Maximum value
    mutable?: boolean);
    /**
     * تحديث قيمة الخاصية
     * Update property value
     */
    setValue(newValue: any): boolean;
    /**
     * التحقق من تجاوز حد معين
     * Check if exceeds a threshold
     */
    exceeds(threshold: number): boolean;
    /**
     * التحقق من أقل من حد معين
     * Check if below a threshold
     */
    below(threshold: number): boolean;
    toString(): string;
}
/**
 * حالة الشيء - Thing State
 */
export declare class ThingState {
    name: string;
    type: StateType;
    active: boolean;
    duration?: number | undefined;
    conditions: Map<string, any>;
    constructor(name: string, // اسم الحالة - State name
    type: StateType, // نوع الحالة - State type
    active?: boolean, // نشطة - Active
    duration?: number | undefined, // المدة (بالثواني) - Duration in seconds
    conditions?: Map<string, any>);
    /**
     * تفعيل الحالة
     * Activate state
     */
    activate(): void;
    /**
     * إلغاء تفعيل الحالة
     * Deactivate state
     */
    deactivate(): void;
    /**
     * التحقق من شرط
     * Check condition
     */
    checkCondition(key: string, value: any): boolean;
    toString(): string;
}
/**
 * الشيء - Thing
 */
export declare class Thing {
    name: string;
    category: string;
    private properties;
    private states;
    private shape?;
    constructor(name: string, // اسم الشيء - Thing name
    category: string);
    /**
     * إضافة خاصية
     * Add property
     */
    addProperty(property: ThingProperty): void;
    /**
     * الحصول على خاصية
     * Get property
     */
    getProperty(name: string): ThingProperty | undefined;
    /**
     * تحديث خاصية
     * Update property
     */
    updateProperty(name: string, value: any): boolean;
    /**
     * إضافة حالة
     * Add state
     */
    addState(state: ThingState): void;
    /**
     * الحصول على حالة
     * Get state
     */
    getState(name: string): ThingState | undefined;
    /**
     * تفعيل حالة
     * Activate state
     */
    activateState(name: string): boolean;
    /**
     * إلغاء تفعيل حالة
     * Deactivate state
     */
    deactivateState(name: string): boolean;
    /**
     * الحصول على جميع الحالات النشطة
     * Get all active states
     */
    getActiveStates(): ThingState[];
    /**
     * تعيين معادلة الشكل
     * Set shape equation
     */
    setShape(shapeEquation: string): void;
    /**
     * الحصول على معادلة الشكل
     * Get shape equation
     */
    getShape(): string | undefined;
    /**
     * الحصول على جميع الخصائص
     * Get all properties
     */
    getAllProperties(): ThingProperty[];
    /**
     * الحصول على جميع الحالات
     * Get all states
     */
    getAllStates(): ThingState[];
    /**
     * نسخ الشيء
     * Clone thing
     */
    clone(): Thing;
    toString(): string;
}
/**
 * محرك الأشياء - Thing Engine
 */
export declare class ThingEngine {
    private things;
    /**
     * إضافة شيء
     * Add thing
     */
    addThing(thing: Thing): void;
    /**
     * الحصول على شيء
     * Get thing
     */
    getThing(name: string): Thing | undefined;
    /**
     * حذف شيء
     * Remove thing
     */
    removeThing(name: string): boolean;
    /**
     * الحصول على جميع الأشياء
     * Get all things
     */
    getAllThings(): Thing[];
    /**
     * البحث عن أشياء حسب الفئة
     * Find things by category
     */
    findByCategory(category: string): Thing[];
    /**
     * البحث عن أشياء حسب خاصية
     * Find things by property
     */
    findByProperty(propertyName: string, value: any): Thing[];
    /**
     * البحث عن أشياء حسب حالة نشطة
     * Find things by active state
     */
    findByActiveState(stateName: string): Thing[];
}
