/**
 * نظام تحسينات الأداء - Performance Improvements System
 * 
 * يوفر تخزين مؤقت، فهرسة، وقياس الأداء
 */

/**
 * إدخال التخزين المؤقت - Cache Entry
 */
export class CacheEntry<T> {
  constructor(
    public key: string,
    public value: T,
    public timestamp: number = Date.now(),
    public hits: number = 0,
    public ttl?: number // Time to live in milliseconds
  ) {}

  /**
   * التحقق من انتهاء الصلاحية
   */
  isExpired(): boolean {
    if (!this.ttl) return false;
    return Date.now() - this.timestamp > this.ttl;
  }

  /**
   * تسجيل استخدام
   */
  recordHit(): void {
    this.hits++;
  }
}

/**
 * التخزين المؤقت - Cache
 */
export class Cache<T> {
  private entries: Map<string, CacheEntry<T>> = new Map();
  private maxSize: number;
  private defaultTTL?: number;

  constructor(maxSize: number = 1000, defaultTTL?: number) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  /**
   * إضافة إلى التخزين المؤقت
   */
  set(key: string, value: T, ttl?: number): void {
    // إزالة المدخلات المنتهية الصلاحية
    this.cleanup();

    // إذا وصلنا للحد الأقصى، نحذف الأقل استخداماً
    if (this.entries.size >= this.maxSize) {
      this.evictLeastUsed();
    }

    const entry = new CacheEntry(key, value, Date.now(), 0, ttl || this.defaultTTL);
    this.entries.set(key, entry);
  }

  /**
   * الحصول من التخزين المؤقت
   */
  get(key: string): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;

    if (entry.isExpired()) {
      this.entries.delete(key);
      return undefined;
    }

    entry.recordHit();
    return entry.value;
  }

  /**
   * التحقق من وجود مفتاح
   */
  has(key: string): boolean {
    const entry = this.entries.get(key);
    if (!entry) return false;
    if (entry.isExpired()) {
      this.entries.delete(key);
      return false;
    }
    return true;
  }

  /**
   * حذف من التخزين المؤقت
   */
  delete(key: string): boolean {
    return this.entries.delete(key);
  }

  /**
   * مسح التخزين المؤقت
   */
  clear(): void {
    this.entries.clear();
  }

  /**
   * تنظيف المدخلات المنتهية الصلاحية
   */
  private cleanup(): void {
    for (const [key, entry] of this.entries) {
      if (entry.isExpired()) {
        this.entries.delete(key);
      }
    }
  }

  /**
   * إزالة الأقل استخداماً (LRU)
   */
  private evictLeastUsed(): void {
    let minHits = Infinity;
    let keyToEvict: string | null = null;

    for (const [key, entry] of this.entries) {
      if (entry.hits < minHits) {
        minHits = entry.hits;
        keyToEvict = key;
      }
    }

    if (keyToEvict) {
      this.entries.delete(keyToEvict);
    }
  }

  /**
   * إحصائيات
   */
  getStatistics(): {
    size: number;
    maxSize: number;
    hitRate: number;
    totalHits: number;
  } {
    let totalHits = 0;
    for (const entry of this.entries.values()) {
      totalHits += entry.hits;
    }

    return {
      size: this.entries.size,
      maxSize: this.maxSize,
      hitRate: totalHits > 0 ? totalHits / this.entries.size : 0,
      totalHits
    };
  }
}

/**
 * الفهرس - Index
 */
export class Index<T> {
  private indices: Map<string, Map<any, Set<T>>> = new Map();

  /**
   * إنشاء فهرس لخاصية
   */
  createIndex(property: string): void {
    if (!this.indices.has(property)) {
      this.indices.set(property, new Map());
    }
  }

  /**
   * إضافة عنصر للفهرس
   */
  add(item: T, property: string, value: any): void {
    if (!this.indices.has(property)) {
      this.createIndex(property);
    }

    const index = this.indices.get(property)!;
    if (!index.has(value)) {
      index.set(value, new Set());
    }

    index.get(value)!.add(item);
  }

  /**
   * البحث في الفهرس
   */
  find(property: string, value: any): T[] {
    const index = this.indices.get(property);
    if (!index) return [];

    const items = index.get(value);
    return items ? Array.from(items) : [];
  }

  /**
   * حذف من الفهرس
   */
  remove(item: T, property: string, value: any): void {
    const index = this.indices.get(property);
    if (!index) return;

    const items = index.get(value);
    if (items) {
      items.delete(item);
      if (items.size === 0) {
        index.delete(value);
      }
    }
  }

  /**
   * مسح الفهرس
   */
  clear(property?: string): void {
    if (property) {
      this.indices.delete(property);
    } else {
      this.indices.clear();
    }
  }

  /**
   * الحصول على جميع القيم المفهرسة
   */
  getIndexedValues(property: string): any[] {
    const index = this.indices.get(property);
    return index ? Array.from(index.keys()) : [];
  }
}

/**
 * قياس الأداء - Benchmark
 */
export class Benchmark {
  private measurements: Map<string, number[]> = new Map();

  /**
   * قياس وقت تنفيذ دالة
   */
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    this.measurements.get(name)!.push(duration);

    return result;
  }

  /**
   * قياس وقت تنفيذ دالة غير متزامنة
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    this.measurements.get(name)!.push(duration);

    return result;
  }

  /**
   * الحصول على إحصائيات القياس
   */
  getStatistics(name: string): {
    count: number;
    min: number;
    max: number;
    average: number;
    total: number;
  } | null {
    const measurements = this.measurements.get(name);
    if (!measurements || measurements.length === 0) return null;

    const min = Math.min(...measurements);
    const max = Math.max(...measurements);
    const total = measurements.reduce((sum, m) => sum + m, 0);
    const average = total / measurements.length;

    return { count: measurements.length, min, max, average, total };
  }

  /**
   * الحصول على جميع الإحصائيات
   */
  getAllStatistics(): Map<string, any> {
    const stats = new Map();
    for (const name of this.measurements.keys()) {
      stats.set(name, this.getStatistics(name));
    }
    return stats;
  }

  /**
   * مسح القياسات
   */
  clear(name?: string): void {
    if (name) {
      this.measurements.delete(name);
    } else {
      this.measurements.clear();
    }
  }

  /**
   * طباعة التقرير
   */
  printReport(): void {
    console.log('\n=== تقرير الأداء - Performance Report ===\n');
    
    for (const [name, stats] of this.getAllStatistics()) {
      if (stats) {
        console.log(`${name}:`);
        console.log(`  العدد: ${stats.count}`);
        console.log(`  الأدنى: ${stats.min.toFixed(2)}ms`);
        console.log(`  الأعلى: ${stats.max.toFixed(2)}ms`);
        console.log(`  المتوسط: ${stats.average.toFixed(2)}ms`);
        console.log(`  الإجمالي: ${stats.total.toFixed(2)}ms`);
        console.log('');
      }
    }
  }
}

/**
 * محرك الأداء - Performance Engine
 */
export class PerformanceEngine {
  public cache: Cache<any>;
  public index: Index<any>;
  public benchmark: Benchmark;

  constructor(cacheSize: number = 1000, cacheTTL?: number) {
    this.cache = new Cache(cacheSize, cacheTTL);
    this.index = new Index();
    this.benchmark = new Benchmark();
  }

  /**
   * تنفيذ مع التخزين المؤقت
   */
  withCache<T>(key: string, fn: () => T, ttl?: number): T {
    // التحقق من التخزين المؤقت
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      return cached;
    }

    // تنفيذ وتخزين
    const result = fn();
    this.cache.set(key, result, ttl);
    return result;
  }

  /**
   * تنفيذ مع القياس
   */
  withBenchmark<T>(name: string, fn: () => T): T {
    return this.benchmark.measure(name, fn);
  }

  /**
   * تنفيذ مع التخزين المؤقت والقياس
   */
  withCacheAndBenchmark<T>(key: string, name: string, fn: () => T, ttl?: number): T {
    return this.benchmark.measure(name, () => {
      return this.withCache(key, fn, ttl);
    });
  }

  /**
   * إحصائيات شاملة
   */
  getOverallStatistics(): {
    cache: any;
    benchmarks: Map<string, any>;
  } {
    return {
      cache: this.cache.getStatistics(),
      benchmarks: this.benchmark.getAllStatistics()
    };
  }
}

