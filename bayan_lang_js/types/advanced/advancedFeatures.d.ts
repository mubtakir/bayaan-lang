/**
 * الميزات المتقدمة الإضافية - Additional Advanced Features
 *
 * نظام الأحداث، الإشعارات، التسجيل، التكوين
 */
/**
 * نوع الحدث
 */
export declare enum EventType {
    SYSTEM = "SYSTEM",
    USER = "USER",
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
    CUSTOM = "CUSTOM"
}
/**
 * حدث
 */
export declare class Event {
    type: EventType;
    name: string;
    data: any;
    source?: string | undefined;
    timestamp: number;
    constructor(type: EventType, name: string, data?: any, source?: string | undefined);
    toString(): string;
}
/**
 * مستمع الحدث
 */
export type EventListener = (event: Event) => void;
/**
 * محرك الأحداث (Event Engine)
 */
export declare class EventEngine {
    private listeners;
    private eventHistory;
    private maxHistorySize;
    /**
     * الاستماع لحدث
     */
    on(eventName: string, listener: EventListener): void;
    /**
     * إلغاء الاستماع
     */
    off(eventName: string, listener: EventListener): boolean;
    /**
     * إطلاق حدث
     */
    emit(event: Event): void;
    /**
     * الحصول على سجل الأحداث
     */
    getHistory(eventName?: string, limit?: number): Event[];
    /**
     * مسح السجل
     */
    clearHistory(): void;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): {
        totalEvents: number;
        totalListeners: number;
        eventCounts: {
            [k: string]: number;
        };
    };
}
/**
 * مستوى الإشعار
 */
export declare enum NotificationLevel {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR"
}
/**
 * إشعار
 */
export declare class Notification {
    level: NotificationLevel;
    title: string;
    message: string;
    data?: any | undefined;
    timestamp: number;
    read: boolean;
    constructor(level: NotificationLevel, title: string, message: string, data?: any | undefined);
    markAsRead(): void;
    toString(): string;
}
/**
 * محرك الإشعارات (Notification Engine)
 */
export declare class NotificationEngine {
    private notifications;
    private maxNotifications;
    /**
     * إنشاء إشعار
     */
    notify(level: NotificationLevel, title: string, message: string, data?: any): Notification;
    /**
     * الحصول على الإشعارات
     */
    getNotifications(unreadOnly?: boolean): Notification[];
    /**
     * تحديد الكل كمقروء
     */
    markAllAsRead(): void;
    /**
     * مسح الإشعارات
     */
    clear(): void;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): {
        total: number;
        unread: number;
        byLevel: {
            info: number;
            success: number;
            warning: number;
            error: number;
        };
    };
}
/**
 * مستوى السجل
 */
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
/**
 * مدخل السجل
 */
export declare class LogEntry {
    level: LogLevel;
    message: string;
    data?: any | undefined;
    source?: string | undefined;
    timestamp: number;
    constructor(level: LogLevel, message: string, data?: any | undefined, source?: string | undefined);
    toString(): string;
}
/**
 * محرك التسجيل (Logging Engine)
 */
export declare class LoggingEngine {
    private logs;
    private maxLogs;
    private minLevel;
    /**
     * تسجيل رسالة
     */
    log(level: LogLevel, message: string, data?: any, source?: string): void;
    /**
     * debug
     */
    debug(message: string, data?: any, source?: string): void;
    /**
     * info
     */
    info(message: string, data?: any, source?: string): void;
    /**
     * warn
     */
    warn(message: string, data?: any, source?: string): void;
    /**
     * error
     */
    error(message: string, data?: any, source?: string): void;
    /**
     * التحقق من ضرورة التسجيل
     */
    private shouldLog;
    /**
     * طباعة للكونسول
     */
    private printToConsole;
    /**
     * الحصول على السجلات
     */
    getLogs(level?: LogLevel, limit?: number): LogEntry[];
    /**
     * مسح السجلات
     */
    clear(): void;
    /**
     * تعيين المستوى الأدنى
     */
    setMinLevel(level: LogLevel): void;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): {
        total: number;
        byLevel: {
            debug: number;
            info: number;
            warn: number;
            error: number;
        };
    };
}
/**
 * محرك التكوين (Configuration Engine)
 */
export declare class ConfigurationEngine {
    private config;
    private defaults;
    /**
     * تعيين قيمة
     */
    set(key: string, value: any): void;
    /**
     * الحصول على قيمة
     */
    get<T = any>(key: string, defaultValue?: T): T | undefined;
    /**
     * تعيين قيمة افتراضية
     */
    setDefault(key: string, value: any): void;
    /**
     * التحقق من وجود مفتاح
     */
    has(key: string): boolean;
    /**
     * حذف مفتاح
     */
    delete(key: string): boolean;
    /**
     * مسح الكل
     */
    clear(): void;
    /**
     * الحصول على جميع المفاتيح
     */
    keys(): string[];
    /**
     * تحميل من كائن
     */
    load(obj: Record<string, any>): void;
    /**
     * تصدير إلى كائن
     */
    export(): Record<string, any>;
}
/**
 * محرك الميزات المتقدمة
 */
export declare class AdvancedFeaturesEngine {
    events: EventEngine;
    notifications: NotificationEngine;
    logging: LoggingEngine;
    config: ConfigurationEngine;
    constructor();
    /**
     * الحصول على الإحصائيات الشاملة
     */
    getOverallStatistics(): {
        events: {
            totalEvents: number;
            totalListeners: number;
            eventCounts: {
                [k: string]: number;
            };
        };
        notifications: {
            total: number;
            unread: number;
            byLevel: {
                info: number;
                success: number;
                warning: number;
                error: number;
            };
        };
        logging: {
            total: number;
            byLevel: {
                debug: number;
                info: number;
                warn: number;
                error: number;
            };
        };
        config: {
            totalKeys: number;
        };
    };
}
