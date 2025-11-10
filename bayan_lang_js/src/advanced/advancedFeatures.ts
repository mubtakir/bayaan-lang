/**
 * الميزات المتقدمة الإضافية - Additional Advanced Features
 * 
 * نظام الأحداث، الإشعارات، التسجيل، التكوين
 */

/**
 * نوع الحدث
 */
export enum EventType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  CUSTOM = 'CUSTOM'
}

/**
 * حدث
 */
export class Event {
  public timestamp: number = Date.now();

  constructor(
    public type: EventType,
    public name: string,
    public data: any = {},
    public source?: string
  ) {}

  toString(): string {
    return `[${this.type}] ${this.name} at ${new Date(this.timestamp).toISOString()}`;
  }
}

/**
 * مستمع الحدث
 */
export type EventListener = (event: Event) => void;

/**
 * محرك الأحداث (Event Engine)
 */
export class EventEngine {
  private listeners: Map<string, EventListener[]> = new Map();
  private eventHistory: Event[] = [];
  private maxHistorySize: number = 1000;

  /**
   * الاستماع لحدث
   */
  on(eventName: string, listener: EventListener): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    this.listeners.get(eventName)!.push(listener);
  }

  /**
   * إلغاء الاستماع
   */
  off(eventName: string, listener: EventListener): boolean {
    const listeners = this.listeners.get(eventName);
    if (!listeners) return false;

    const index = listeners.indexOf(listener);
    if (index === -1) return false;

    listeners.splice(index, 1);
    return true;
  }

  /**
   * إطلاق حدث
   */
  emit(event: Event): void {
    // حفظ في السجل
    this.eventHistory.push(event);
    
    // الحفاظ على حجم السجل
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    // إشعار المستمعين
    const listeners = this.listeners.get(event.name);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(event);
        } catch (error) {
          console.error(`Error in event listener for ${event.name}:`, error);
        }
      }
    }

    // إشعار المستمعين العامين (*)
    const wildcardListeners = this.listeners.get('*');
    if (wildcardListeners) {
      for (const listener of wildcardListeners) {
        try {
          listener(event);
        } catch (error) {
          console.error(`Error in wildcard event listener:`, error);
        }
      }
    }
  }

  /**
   * الحصول على سجل الأحداث
   */
  getHistory(eventName?: string, limit?: number): Event[] {
    let history = eventName
      ? this.eventHistory.filter(e => e.name === eventName)
      : this.eventHistory;

    if (limit) {
      history = history.slice(-limit);
    }

    return history;
  }

  /**
   * مسح السجل
   */
  clearHistory(): void {
    this.eventHistory = [];
  }

  /**
   * الحصول على الإحصائيات
   */
  getStatistics() {
    const eventCounts = new Map<string, number>();
    
    for (const event of this.eventHistory) {
      eventCounts.set(event.name, (eventCounts.get(event.name) || 0) + 1);
    }

    return {
      totalEvents: this.eventHistory.length,
      totalListeners: Array.from(this.listeners.values()).reduce((sum, ls) => sum + ls.length, 0),
      eventCounts: Object.fromEntries(eventCounts)
    };
  }
}

/**
 * مستوى الإشعار
 */
export enum NotificationLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

/**
 * إشعار
 */
export class Notification {
  public timestamp: number = Date.now();
  public read: boolean = false;

  constructor(
    public level: NotificationLevel,
    public title: string,
    public message: string,
    public data?: any
  ) {}

  markAsRead(): void {
    this.read = true;
  }

  toString(): string {
    return `[${this.level}] ${this.title}: ${this.message}`;
  }
}

/**
 * محرك الإشعارات (Notification Engine)
 */
export class NotificationEngine {
  private notifications: Notification[] = [];
  private maxNotifications: number = 100;

  /**
   * إنشاء إشعار
   */
  notify(level: NotificationLevel, title: string, message: string, data?: any): Notification {
    const notification = new Notification(level, title, message, data);
    
    this.notifications.push(notification);

    // الحفاظ على الحد الأقصى
    if (this.notifications.length > this.maxNotifications) {
      this.notifications.shift();
    }

    return notification;
  }

  /**
   * الحصول على الإشعارات
   */
  getNotifications(unreadOnly: boolean = false): Notification[] {
    return unreadOnly
      ? this.notifications.filter(n => !n.read)
      : [...this.notifications];
  }

  /**
   * تحديد الكل كمقروء
   */
  markAllAsRead(): void {
    for (const notification of this.notifications) {
      notification.markAsRead();
    }
  }

  /**
   * مسح الإشعارات
   */
  clear(): void {
    this.notifications = [];
  }

  /**
   * الحصول على الإحصائيات
   */
  getStatistics() {
    return {
      total: this.notifications.length,
      unread: this.notifications.filter(n => !n.read).length,
      byLevel: {
        info: this.notifications.filter(n => n.level === NotificationLevel.INFO).length,
        success: this.notifications.filter(n => n.level === NotificationLevel.SUCCESS).length,
        warning: this.notifications.filter(n => n.level === NotificationLevel.WARNING).length,
        error: this.notifications.filter(n => n.level === NotificationLevel.ERROR).length
      }
    };
  }
}

/**
 * مستوى السجل
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

/**
 * مدخل السجل
 */
export class LogEntry {
  public timestamp: number = Date.now();

  constructor(
    public level: LogLevel,
    public message: string,
    public data?: any,
    public source?: string
  ) {}

  toString(): string {
    const time = new Date(this.timestamp).toISOString();
    const source = this.source ? ` [${this.source}]` : '';
    return `${time} ${this.level}${source}: ${this.message}`;
  }
}

/**
 * محرك التسجيل (Logging Engine)
 */
export class LoggingEngine {
  private logs: LogEntry[] = [];
  private maxLogs: number = 10000;
  private minLevel: LogLevel = LogLevel.DEBUG;

  /**
   * تسجيل رسالة
   */
  log(level: LogLevel, message: string, data?: any, source?: string): void {
    // التحقق من المستوى
    if (!this.shouldLog(level)) return;

    const entry = new LogEntry(level, message, data, source);
    this.logs.push(entry);

    // الحفاظ على الحد الأقصى
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // طباعة للكونسول
    this.printToConsole(entry);
  }

  /**
   * debug
   */
  debug(message: string, data?: any, source?: string): void {
    this.log(LogLevel.DEBUG, message, data, source);
  }

  /**
   * info
   */
  info(message: string, data?: any, source?: string): void {
    this.log(LogLevel.INFO, message, data, source);
  }

  /**
   * warn
   */
  warn(message: string, data?: any, source?: string): void {
    this.log(LogLevel.WARN, message, data, source);
  }

  /**
   * error
   */
  error(message: string, data?: any, source?: string): void {
    this.log(LogLevel.ERROR, message, data, source);
  }

  /**
   * التحقق من ضرورة التسجيل
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentIndex = levels.indexOf(this.minLevel);
    const levelIndex = levels.indexOf(level);
    return levelIndex >= currentIndex;
  }

  /**
   * طباعة للكونسول
   */
  private printToConsole(entry: LogEntry): void {
    const message = entry.toString();
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message);
        break;
      case LogLevel.INFO:
        console.info(message);
        break;
      case LogLevel.WARN:
        console.warn(message);
        break;
      case LogLevel.ERROR:
        console.error(message);
        break;
    }
  }

  /**
   * الحصول على السجلات
   */
  getLogs(level?: LogLevel, limit?: number): LogEntry[] {
    let logs = level
      ? this.logs.filter(l => l.level === level)
      : this.logs;

    if (limit) {
      logs = logs.slice(-limit);
    }

    return logs;
  }

  /**
   * مسح السجلات
   */
  clear(): void {
    this.logs = [];
  }

  /**
   * تعيين المستوى الأدنى
   */
  setMinLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * الحصول على الإحصائيات
   */
  getStatistics() {
    return {
      total: this.logs.length,
      byLevel: {
        debug: this.logs.filter(l => l.level === LogLevel.DEBUG).length,
        info: this.logs.filter(l => l.level === LogLevel.INFO).length,
        warn: this.logs.filter(l => l.level === LogLevel.WARN).length,
        error: this.logs.filter(l => l.level === LogLevel.ERROR).length
      }
    };
  }
}

/**
 * محرك التكوين (Configuration Engine)
 */
export class ConfigurationEngine {
  private config: Map<string, any> = new Map();
  private defaults: Map<string, any> = new Map();

  /**
   * تعيين قيمة
   */
  set(key: string, value: any): void {
    this.config.set(key, value);
  }

  /**
   * الحصول على قيمة
   */
  get<T = any>(key: string, defaultValue?: T): T | undefined {
    if (this.config.has(key)) {
      return this.config.get(key) as T;
    }

    if (this.defaults.has(key)) {
      return this.defaults.get(key) as T;
    }

    return defaultValue;
  }

  /**
   * تعيين قيمة افتراضية
   */
  setDefault(key: string, value: any): void {
    this.defaults.set(key, value);
  }

  /**
   * التحقق من وجود مفتاح
   */
  has(key: string): boolean {
    return this.config.has(key) || this.defaults.has(key);
  }

  /**
   * حذف مفتاح
   */
  delete(key: string): boolean {
    return this.config.delete(key);
  }

  /**
   * مسح الكل
   */
  clear(): void {
    this.config.clear();
  }

  /**
   * الحصول على جميع المفاتيح
   */
  keys(): string[] {
    const allKeys = new Set([...this.config.keys(), ...this.defaults.keys()]);
    return Array.from(allKeys);
  }

  /**
   * تحميل من كائن
   */
  load(obj: Record<string, any>): void {
    for (const [key, value] of Object.entries(obj)) {
      this.set(key, value);
    }
  }

  /**
   * تصدير إلى كائن
   */
  export(): Record<string, any> {
    const result: Record<string, any> = {};
    
    for (const key of this.keys()) {
      result[key] = this.get(key);
    }

    return result;
  }
}

/**
 * محرك الميزات المتقدمة
 */
export class AdvancedFeaturesEngine {
  public events: EventEngine;
  public notifications: NotificationEngine;
  public logging: LoggingEngine;
  public config: ConfigurationEngine;

  constructor() {
    this.events = new EventEngine();
    this.notifications = new NotificationEngine();
    this.logging = new LoggingEngine();
    this.config = new ConfigurationEngine();
  }

  /**
   * الحصول على الإحصائيات الشاملة
   */
  getOverallStatistics() {
    return {
      events: this.events.getStatistics(),
      notifications: this.notifications.getStatistics(),
      logging: this.logging.getStatistics(),
      config: {
        totalKeys: this.config.keys().length
      }
    };
  }
}

