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
export enum TimeUnit {
  MILLISECOND = 'millisecond',
  SECOND = 'second',
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

/**
 * نقطة زمنية
 * Time point
 */
export class TimePoint {
  constructor(
    public timestamp: number,  // Unix timestamp in milliseconds
    public label?: string      // تسمية اختيارية
  ) {}

  toString(): string {
    const date = new Date(this.timestamp);
    return this.label 
      ? `${this.label} (${date.toISOString()})`
      : date.toISOString();
  }

  /**
   * الفرق بين نقطتين زمنيتين
   * Difference between two time points
   */
  diff(other: TimePoint, unit: TimeUnit = TimeUnit.MILLISECOND): number {
    const diffMs = Math.abs(this.timestamp - other.timestamp);

    switch (unit) {
      case TimeUnit.SECOND: return diffMs / 1000;
      case TimeUnit.MINUTE: return diffMs / (1000 * 60);
      case TimeUnit.HOUR: return diffMs / (1000 * 60 * 60);
      case TimeUnit.DAY: return diffMs / (1000 * 60 * 60 * 24);
      case TimeUnit.WEEK: return diffMs / (1000 * 60 * 60 * 24 * 7);
      case TimeUnit.MONTH: return diffMs / (1000 * 60 * 60 * 24 * 30);
      case TimeUnit.YEAR: return diffMs / (1000 * 60 * 60 * 24 * 365);
      default: return diffMs;
    }
  }
}

/**
 * لقطة زمنية لشيء
 * Snapshot of a thing at a point in time
 */
export class ThingSnapshot {
  constructor(
    public thing: Thing,
    public timePoint: TimePoint,
    public properties: Map<string, any>,
    public states: Map<string, boolean>
  ) {}

  toString(): string {
    let result = `\n=== لقطة: ${this.thing.name} @ ${this.timePoint.toString()} ===\n`;
    
    result += `الخصائص:\n`;
    for (const [key, value] of this.properties.entries()) {
      result += `  ${key}: ${value}\n`;
    }

    result += `الحالات:\n`;
    for (const [key, value] of this.states.entries()) {
      result += `  ${key}: ${value ? 'نشط' : 'خامل'}\n`;
    }

    return result;
  }
}

/**
 * سجل تاريخي لحدث
 * Historical record of an event
 */
export class EventRecord {
  constructor(
    public event: Event,
    public timePoint: TimePoint,
    public description: string = ''
  ) {}

  toString(): string {
    return `[${this.timePoint.toString()}] ${this.event.name}: ${this.description}`;
  }
}

/**
 * محرك الزمن
 * Time Engine
 */
export class TimeEngine {
  private currentTime: TimePoint;
  private snapshots: Map<string, ThingSnapshot[]> = new Map(); // thing.name -> snapshots
  private eventHistory: EventRecord[] = [];
  private timeRules: Map<string, (thing: Thing, elapsed: number, unit: TimeUnit) => void> = new Map();

  constructor(startTime?: number) {
    this.currentTime = new TimePoint(startTime || Date.now(), 'البداية');
  }

  /**
   * الحصول على الوقت الحالي
   * Get current time
   */
  getCurrentTime(): TimePoint {
    return this.currentTime;
  }

  /**
   * تقدم الزمن
   * Advance time
   */
  advance(amount: number, unit: TimeUnit = TimeUnit.SECOND): void {
    const msToAdd = this.convertToMilliseconds(amount, unit);
    this.currentTime = new TimePoint(
      this.currentTime.timestamp + msToAdd,
      `+${amount} ${unit}`
    );

    // تطبيق قواعد الزمن على جميع الأشياء
    this.applyTimeRules(amount, unit);
  }

  /**
   * تحويل إلى ميلي ثانية
   * Convert to milliseconds
   */
  private convertToMilliseconds(amount: number, unit: TimeUnit): number {
    switch (unit) {
      case TimeUnit.SECOND: return amount * 1000;
      case TimeUnit.MINUTE: return amount * 1000 * 60;
      case TimeUnit.HOUR: return amount * 1000 * 60 * 60;
      case TimeUnit.DAY: return amount * 1000 * 60 * 60 * 24;
      case TimeUnit.WEEK: return amount * 1000 * 60 * 60 * 24 * 7;
      case TimeUnit.MONTH: return amount * 1000 * 60 * 60 * 24 * 30;
      case TimeUnit.YEAR: return amount * 1000 * 60 * 60 * 24 * 365;
      default: return amount;
    }
  }

  /**
   * أخذ لقطة لشيء
   * Take snapshot of a thing
   */
  takeSnapshot(thing: Thing, label?: string): ThingSnapshot {
    const properties = new Map<string, any>();
    const states = new Map<string, boolean>();

    // نسخ الخصائص
    for (const prop of thing.getAllProperties()) {
      properties.set(prop.name, prop.value);
    }

    // نسخ الحالات
    for (const state of thing.getAllStates()) {
      states.set(state.name, state.active);
    }

    const timePoint = label 
      ? new TimePoint(this.currentTime.timestamp, label)
      : this.currentTime;

    const snapshot = new ThingSnapshot(thing, timePoint, properties, states);

    // حفظ اللقطة
    if (!this.snapshots.has(thing.name)) {
      this.snapshots.set(thing.name, []);
    }
    this.snapshots.get(thing.name)!.push(snapshot);

    return snapshot;
  }

  /**
   * الحصول على لقطات شيء
   * Get snapshots of a thing
   */
  getSnapshots(thingName: string): ThingSnapshot[] {
    return this.snapshots.get(thingName) || [];
  }

  /**
   * الحصول على لقطة في وقت معين
   * Get snapshot at specific time
   */
  getSnapshotAt(thingName: string, timePoint: TimePoint): ThingSnapshot | null {
    const snapshots = this.getSnapshots(thingName);
    
    // البحث عن أقرب لقطة قبل أو عند الوقت المحدد
    let closest: ThingSnapshot | null = null;
    let minDiff = Infinity;

    for (const snapshot of snapshots) {
      if (snapshot.timePoint.timestamp <= timePoint.timestamp) {
        const diff = timePoint.timestamp - snapshot.timePoint.timestamp;
        if (diff < minDiff) {
          minDiff = diff;
          closest = snapshot;
        }
      }
    }

    return closest;
  }

  /**
   * استعلام تاريخي
   * Historical query
   * 
   * مثال: "ما كان عمر أحمد قبل سنتين؟"
   */
  queryHistory(thingName: string, propertyName: string, timeAgo: number, unit: TimeUnit): any {
    const targetTime = new TimePoint(
      this.currentTime.timestamp - this.convertToMilliseconds(timeAgo, unit)
    );

    const snapshot = this.getSnapshotAt(thingName, targetTime);
    if (!snapshot) {
      return null;
    }

    return snapshot.properties.get(propertyName);
  }

  /**
   * تسجيل حدث
   * Record event
   */
  recordEvent(event: Event, description: string = ''): EventRecord {
    const record = new EventRecord(event, this.currentTime, description);
    this.eventHistory.push(record);
    return record;
  }

  /**
   * الحصول على تاريخ الأحداث
   * Get event history
   */
  getEventHistory(startTime?: TimePoint, endTime?: TimePoint): EventRecord[] {
    if (!startTime && !endTime) {
      return this.eventHistory;
    }

    return this.eventHistory.filter(record => {
      const time = record.timePoint.timestamp;
      const afterStart = !startTime || time >= startTime.timestamp;
      const beforeEnd = !endTime || time <= endTime.timestamp;
      return afterStart && beforeEnd;
    });
  }

  /**
   * إضافة قاعدة زمنية
   * Add time rule
   * 
   * قاعدة تطبق تلقائياً عند تقدم الزمن
   * مثال: كل سنة، عمر الإنسان يزيد بواحد
   */
  addTimeRule(
    name: string,
    rule: (thing: Thing, elapsed: number, unit: TimeUnit) => void
  ): void {
    this.timeRules.set(name, rule);
  }

  /**
   * تطبيق قواعد الزمن
   * Apply time rules
   */
  private applyTimeRules(_elapsed: number, _unit: TimeUnit): void {
    // هنا نحتاج إلى الوصول إلى جميع الأشياء
    // سنضيف هذا لاحقاً عند التكامل مع ThingEngine
  }

  /**
   * إنشاء قاعدة زمنية للعمر
   * Create age time rule
   */
  createAgeRule(propertyName: string = 'عمر'): void {
    this.addTimeRule('age_increment', (thing: Thing, elapsed: number, unit: TimeUnit) => {
      const ageProp = thing.getProperty(propertyName);
      if (ageProp) {
        // تحويل الزمن المنقضي إلى سنوات
        const years = this.convertToYears(elapsed, unit);
        const newAge = (ageProp.value as number) + years;
        thing.updateProperty(propertyName, newAge);
      }
    });
  }

  /**
   * تحويل إلى سنوات
   * Convert to years
   */
  private convertToYears(amount: number, unit: TimeUnit): number {
    switch (unit) {
      case TimeUnit.YEAR: return amount;
      case TimeUnit.MONTH: return amount / 12;
      case TimeUnit.WEEK: return amount / 52;
      case TimeUnit.DAY: return amount / 365;
      case TimeUnit.HOUR: return amount / (365 * 24);
      case TimeUnit.MINUTE: return amount / (365 * 24 * 60);
      case TimeUnit.SECOND: return amount / (365 * 24 * 60 * 60);
      default: return amount / (365 * 24 * 60 * 60 * 1000);
    }
  }

  /**
   * مسح التاريخ
   * Clear history
   */
  clearHistory(): void {
    this.snapshots.clear();
    this.eventHistory = [];
  }

  /**
   * إحصائيات
   * Statistics
   */
  getStatistics(): {
    totalSnapshots: number;
    totalEvents: number;
    totalTimeRules: number;
    currentTime: string;
  } {
    let totalSnapshots = 0;
    for (const snapshots of this.snapshots.values()) {
      totalSnapshots += snapshots.length;
    }

    return {
      totalSnapshots,
      totalEvents: this.eventHistory.length,
      totalTimeRules: this.timeRules.size,
      currentTime: this.currentTime.toString()
    };
  }
}

