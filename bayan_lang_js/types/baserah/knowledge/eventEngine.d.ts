/**
 * محرك الأحداث والأفعال
 * Event and Action Engine
 *
 * نظام لتمثيل الأحداث والأفعال والتفاعلات بين الأشياء
 * System for representing events, actions, and interactions between things
 */
/**
 * نوع الحدث - Event Type
 */
export declare enum EventType {
    ACTION = "\u0641\u0639\u0644",// Action event
    REACTION = "\u0631\u062F_\u0641\u0639\u0644",// Reaction event
    INTERACTION = "\u062A\u0641\u0627\u0639\u0644",// Interaction event
    TRANSFORMATION = "\u062A\u062D\u0648\u0644",// Transformation event
    CREATION = "\u0625\u0646\u0634\u0627\u0621",// Creation event
    DESTRUCTION = "\u062A\u062F\u0645\u064A\u0631",// Destruction event
    TRANSFER = "\u0646\u0642\u0644",// Transfer event
    CHANGE = "\u062A\u063A\u064A\u064A\u0631"
}
/**
 * نتيجة الحدث - Event Result
 */
export declare class EventResult {
    thing: string;
    propertyChanges: Map<string, any>;
    stateChanges: Map<string, boolean>;
    description: string;
    constructor(thing: string, // الشيء المتأثر - Affected thing
    propertyChanges?: Map<string, any>, // تغييرات الخصائص
    stateChanges?: Map<string, boolean>, // تغييرات الحالات
    description?: string);
    toString(): string;
}
/**
 * الحدث - Event
 */
export declare class Event {
    name: string;
    type: EventType;
    subject?: string | undefined;
    object?: string | undefined;
    timestamp: number;
    private results;
    private conditions;
    constructor(name: string, // اسم الحدث - Event name
    type: EventType, // نوع الحدث - Event type
    subject?: string | undefined, // الفاعل - Subject (who does the action)
    object?: string | undefined, // المفعول به - Object (what receives the action)
    timestamp?: number);
    /**
     * إضافة شرط للحدث
     * Add condition to event
     */
    addCondition(key: string, value: any): void;
    /**
     * التحقق من شرط
     * Check condition
     */
    checkCondition(key: string, value: any): boolean;
    /**
     * الحصول على جميع الشروط
     * Get all conditions
     */
    getConditions(): Map<string, any>;
    /**
     * إضافة نتيجة
     * Add result
     */
    addResult(result: EventResult): void;
    /**
     * الحصول على جميع النتائج
     * Get all results
     */
    getResults(): EventResult[];
    /**
     * الحصول على نتائج شيء معين
     * Get results for specific thing
     */
    getResultsForThing(thingName: string): EventResult[];
    toString(): string;
}
/**
 * قاعدة الحدث - Event Rule
 *
 * تمثل قاعدة: إذا حدث X في ظروف Y، فإن النتيجة Z
 * Represents: If event X happens under conditions Y, then result Z
 */
export declare class EventRule {
    name: string;
    eventPattern: string;
    conditions: Map<string, any>;
    results: EventResult[];
    constructor(name: string, // اسم القاعدة - Rule name
    eventPattern: string, // نمط الحدث - Event pattern
    conditions?: Map<string, any>, // الشروط
    results?: EventResult[]);
    /**
     * التحقق من تطابق الحدث مع القاعدة
     * Check if event matches rule
     */
    matches(event: Event): boolean;
    /**
     * تطبيق القاعدة على حدث
     * Apply rule to event
     */
    apply(event: Event): void;
    toString(): string;
}
/**
 * محرك الأحداث - Event Engine
 */
export declare class EventEngine {
    private events;
    private rules;
    /**
     * إضافة حدث
     * Add event
     */
    addEvent(event: Event): void;
    /**
     * إضافة قاعدة
     * Add rule
     */
    addRule(rule: EventRule): void;
    /**
     * الحصول على قاعدة
     * Get rule
     */
    getRule(name: string): EventRule | undefined;
    /**
     * الحصول على جميع الأحداث
     * Get all events
     */
    getAllEvents(): Event[];
    /**
     * الحصول على أحداث حسب النوع
     * Get events by type
     */
    getEventsByType(type: EventType): Event[];
    /**
     * الحصول على أحداث حسب الفاعل
     * Get events by subject
     */
    getEventsBySubject(subject: string): Event[];
    /**
     * الحصول على أحداث حسب المفعول به
     * Get events by object
     */
    getEventsByObject(object: string): Event[];
    /**
     * الحصول على أحداث في فترة زمنية
     * Get events in time range
     */
    getEventsInTimeRange(start: number, end: number): Event[];
    /**
     * محاكاة حدث
     * Simulate event
     *
     * ينشئ حدثاً ويطبق القواعد عليه دون إضافته للسجل
     * Creates an event and applies rules without adding to history
     */
    simulateEvent(event: Event): Event;
    /**
     * مسح السجل
     * Clear history
     */
    clearHistory(): void;
    /**
     * الحصول على عدد الأحداث
     * Get event count
     */
    getEventCount(): number;
}
