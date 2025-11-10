/**
 * نظام تحسينات الأداء - Performance Improvements System
 *
 * يوفر تخزين مؤقت، فهرسة، وقياس الأداء
 */
/**
 * إدخال التخزين المؤقت - Cache Entry
 */
export declare class CacheEntry<T> {
    key: string;
    value: T;
    timestamp: number;
    hits: number;
    ttl?: number | undefined;
    constructor(key: string, value: T, timestamp?: number, hits?: number, ttl?: number | undefined);
    /**
     * التحقق من انتهاء الصلاحية
     */
    isExpired(): boolean;
    /**
     * تسجيل استخدام
     */
    recordHit(): void;
}
/**
 * التخزين المؤقت - Cache
 */
export declare class Cache<T> {
    private entries;
    private maxSize;
    private defaultTTL?;
    constructor(maxSize?: number, defaultTTL?: number);
    /**
     * إضافة إلى التخزين المؤقت
     */
    set(key: string, value: T, ttl?: number): void;
    /**
     * الحصول من التخزين المؤقت
     */
    get(key: string): T | undefined;
    /**
     * التحقق من وجود مفتاح
     */
    has(key: string): boolean;
    /**
     * حذف من التخزين المؤقت
     */
    delete(key: string): boolean;
    /**
     * مسح التخزين المؤقت
     */
    clear(): void;
    /**
     * تنظيف المدخلات المنتهية الصلاحية
     */
    private cleanup;
    /**
     * إزالة الأقل استخداماً (LRU)
     */
    private evictLeastUsed;
    /**
     * إحصائيات
     */
    getStatistics(): {
        size: number;
        maxSize: number;
        hitRate: number;
        totalHits: number;
    };
}
/**
 * الفهرس - Index
 */
export declare class Index<T> {
    private indices;
    /**
     * إنشاء فهرس لخاصية
     */
    createIndex(property: string): void;
    /**
     * إضافة عنصر للفهرس
     */
    add(item: T, property: string, value: any): void;
    /**
     * البحث في الفهرس
     */
    find(property: string, value: any): T[];
    /**
     * حذف من الفهرس
     */
    remove(item: T, property: string, value: any): void;
    /**
     * مسح الفهرس
     */
    clear(property?: string): void;
    /**
     * الحصول على جميع القيم المفهرسة
     */
    getIndexedValues(property: string): any[];
}
/**
 * قياس الأداء - Benchmark
 */
export declare class Benchmark {
    private measurements;
    /**
     * قياس وقت تنفيذ دالة
     */
    measure<T>(name: string, fn: () => T): T;
    /**
     * قياس وقت تنفيذ دالة غير متزامنة
     */
    measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T>;
    /**
     * الحصول على إحصائيات القياس
     */
    getStatistics(name: string): {
        count: number;
        min: number;
        max: number;
        average: number;
        total: number;
    } | null;
    /**
     * الحصول على جميع الإحصائيات
     */
    getAllStatistics(): Map<string, any>;
    /**
     * مسح القياسات
     */
    clear(name?: string): void;
    /**
     * طباعة التقرير
     */
    printReport(): void;
}
/**
 * محرك الأداء - Performance Engine
 */
export declare class PerformanceEngine {
    cache: Cache<any>;
    index: Index<any>;
    benchmark: Benchmark;
    constructor(cacheSize?: number, cacheTTL?: number);
    /**
     * تنفيذ مع التخزين المؤقت
     */
    withCache<T>(key: string, fn: () => T, ttl?: number): T;
    /**
     * تنفيذ مع القياس
     */
    withBenchmark<T>(name: string, fn: () => T): T;
    /**
     * تنفيذ مع التخزين المؤقت والقياس
     */
    withCacheAndBenchmark<T>(key: string, name: string, fn: () => T, ttl?: number): T;
    /**
     * إحصائيات شاملة
     */
    getOverallStatistics(): {
        cache: any;
        benchmarks: Map<string, any>;
    };
}
