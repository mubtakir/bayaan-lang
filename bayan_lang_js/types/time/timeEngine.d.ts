/**
 * محرك الزمن - Time Engine
 *
 * يتتبع تطور الأشياء عبر الزمن ويسمح بالاستعلامات التاريخية
 */
import { Thing } from '../baserah/knowledge/thingEngine';
import { Event } from '../baserah/knowledge/eventEngine';
/**
 * وحدة الزمن
 * Time unit
 */
export declare enum TimeUnit {
    MILLISECOND = "millisecond",
    SECOND = "second",
    MINUTE = "minute",
    HOUR = "hour",
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year"
}
/**
 * نقطة زمنية
 * Time point
 */
export declare class TimePoint {
    timestamp: number;
    label?: string | undefined;
    constructor(timestamp: number, // Unix timestamp in milliseconds
    label?: string | undefined);
    toString(): string;
    /**
     * الفرق بين نقطتين زمنيتين
     * Difference between two time points
     */
    diff(other: TimePoint, unit?: TimeUnit): number;
}
/**
 * لقطة زمنية لشيء
 * Snapshot of a thing at a point in time
 */
export declare class ThingSnapshot {
    thing: Thing;
    timePoint: TimePoint;
    properties: Map<string, any>;
    states: Map<string, boolean>;
    constructor(thing: Thing, timePoint: TimePoint, properties: Map<string, any>, states: Map<string, boolean>);
    toString(): string;
}
/**
 * سجل تاريخي لحدث
 * Historical record of an event
 */
export declare class EventRecord {
    event: Event;
    timePoint: TimePoint;
    description: string;
    constructor(event: Event, timePoint: TimePoint, description?: string);
    toString(): string;
}
/**
 * محرك الزمن
 * Time Engine
 */
export declare class TimeEngine {
    private currentTime;
    private snapshots;
    private eventHistory;
    private timeRules;
    constructor(startTime?: number);
    /**
     * الحصول على الوقت الحالي
     * Get current time
     */
    getCurrentTime(): TimePoint;
    /**
     * تقدم الزمن
     * Advance time
     */
    advance(amount: number, unit?: TimeUnit): void;
    /**
     * تحويل إلى ميلي ثانية
     * Convert to milliseconds
     */
    private convertToMilliseconds;
    /**
     * أخذ لقطة لشيء
     * Take snapshot of a thing
     */
    takeSnapshot(thing: Thing, label?: string): ThingSnapshot;
    /**
     * الحصول على لقطات شيء
     * Get snapshots of a thing
     */
    getSnapshots(thingName: string): ThingSnapshot[];
    /**
     * الحصول على لقطة في وقت معين
     * Get snapshot at specific time
     */
    getSnapshotAt(thingName: string, timePoint: TimePoint): ThingSnapshot | null;
    /**
     * استعلام تاريخي
     * Historical query
     *
     * مثال: "ما كان عمر أحمد قبل سنتين؟"
     */
    queryHistory(thingName: string, propertyName: string, timeAgo: number, unit: TimeUnit): any;
    /**
     * تسجيل حدث
     * Record event
     */
    recordEvent(event: Event, description?: string): EventRecord;
    /**
     * الحصول على تاريخ الأحداث
     * Get event history
     */
    getEventHistory(startTime?: TimePoint, endTime?: TimePoint): EventRecord[];
    /**
     * إضافة قاعدة زمنية
     * Add time rule
     *
     * قاعدة تطبق تلقائياً عند تقدم الزمن
     * مثال: كل سنة، عمر الإنسان يزيد بواحد
     */
    addTimeRule(name: string, rule: (thing: Thing, elapsed: number, unit: TimeUnit) => void): void;
    /**
     * تطبيق قواعد الزمن
     * Apply time rules
     */
    private applyTimeRules;
    /**
     * إنشاء قاعدة زمنية للعمر
     * Create age time rule
     */
    createAgeRule(propertyName?: string): void;
    /**
     * تحويل إلى سنوات
     * Convert to years
     */
    private convertToYears;
    /**
     * مسح التاريخ
     * Clear history
     */
    clearHistory(): void;
    /**
     * إحصائيات
     * Statistics
     */
    getStatistics(): {
        totalSnapshots: number;
        totalEvents: number;
        totalTimeRules: number;
        currentTime: string;
    };
}
