/**
 * محسّن الأداء لنظام التفكير متعدد الطبقات
 * Performance Optimizer for Multi-Layer Thinking System
 * 
 * @author Basel Yahya Abdullah
 */

/**
 * واجهة نتيجة التحليل المخزنة
 */
interface CachedResult {
  input: string;
  result: any;
  timestamp: number;
  accessCount: number;
}

/**
 * إحصائيات الأداء
 */
export interface PerformanceStats {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  averageProcessingTime: number;
  cacheHitRate: number;
  totalCacheSize: number;
}

/**
 * محسّن الأداء
 */
export class PerformanceOptimizer {
  private cache: Map<string, CachedResult>;
  private maxCacheSize: number;
  private cacheExpirationTime: number; // بالميلي ثانية
  private stats: {
    totalRequests: number;
    cacheHits: number;
    cacheMisses: number;
    processingTimes: number[];
  };

  constructor(maxCacheSize: number = 1000, cacheExpirationTime: number = 3600000) {
    this.cache = new Map();
    this.maxCacheSize = maxCacheSize;
    this.cacheExpirationTime = cacheExpirationTime; // ساعة واحدة افتراضياً
    this.stats = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      processingTimes: []
    };
  }

  /**
   * توليد مفتاح التخزين المؤقت
   */
  private generateCacheKey(input: string, layerName: string): string {
    // استخدام hash بسيط للمدخل
    const hash = this.simpleHash(input);
    return `${layerName}:${hash}`;
  }

  /**
   * دالة hash بسيطة
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // تحويل إلى 32bit integer
    }
    return hash.toString(36);
  }

  /**
   * الحصول على نتيجة من التخزين المؤقت
   */
  getCached(input: string, layerName: string): any | null {
    this.stats.totalRequests++;
    
    const key = this.generateCacheKey(input, layerName);
    const cached = this.cache.get(key);

    if (!cached) {
      this.stats.cacheMisses++;
      return null;
    }

    // فحص انتهاء الصلاحية
    const now = Date.now();
    if (now - cached.timestamp > this.cacheExpirationTime) {
      this.cache.delete(key);
      this.stats.cacheMisses++;
      return null;
    }

    // تحديث عداد الوصول
    cached.accessCount++;
    this.stats.cacheHits++;
    
    return cached.result;
  }

  /**
   * حفظ نتيجة في التخزين المؤقت
   */
  setCached(input: string, layerName: string, result: any): void {
    const key = this.generateCacheKey(input, layerName);

    // إذا وصل الحجم للحد الأقصى، احذف الأقل استخداماً
    if (this.cache.size >= this.maxCacheSize) {
      this.evictLeastUsed();
    }

    this.cache.set(key, {
      input,
      result,
      timestamp: Date.now(),
      accessCount: 1
    });
  }

  /**
   * حذف العنصر الأقل استخداماً
   */
  private evictLeastUsed(): void {
    let leastUsedKey: string | null = null;
    let leastAccessCount = Infinity;

    for (const [key, value] of this.cache.entries()) {
      if (value.accessCount < leastAccessCount) {
        leastAccessCount = value.accessCount;
        leastUsedKey = key;
      }
    }

    if (leastUsedKey) {
      this.cache.delete(leastUsedKey);
    }
  }

  /**
   * تسجيل وقت المعالجة
   */
  recordProcessingTime(time: number): void {
    this.stats.processingTimes.push(time);
    
    // الاحتفاظ بآخر 1000 قياس فقط
    if (this.stats.processingTimes.length > 1000) {
      this.stats.processingTimes.shift();
    }
  }

  /**
   * الحصول على إحصائيات الأداء
   */
  getStats(): PerformanceStats {
    const avgTime = this.stats.processingTimes.length > 0
      ? this.stats.processingTimes.reduce((a, b) => a + b, 0) / this.stats.processingTimes.length
      : 0;

    const hitRate = this.stats.totalRequests > 0
      ? (this.stats.cacheHits / this.stats.totalRequests) * 100
      : 0;

    return {
      totalRequests: this.stats.totalRequests,
      cacheHits: this.stats.cacheHits,
      cacheMisses: this.stats.cacheMisses,
      averageProcessingTime: avgTime,
      cacheHitRate: hitRate,
      totalCacheSize: this.cache.size
    };
  }

  /**
   * مسح التخزين المؤقت
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * مسح الإحصائيات
   */
  resetStats(): void {
    this.stats = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      processingTimes: []
    };
  }

  /**
   * تنظيف التخزين المؤقت من العناصر المنتهية الصلاحية
   */
  cleanupExpired(): number {
    const now = Date.now();
    let removedCount = 0;

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheExpirationTime) {
        this.cache.delete(key);
        removedCount++;
      }
    }

    return removedCount;
  }
}

/**
 * معالج متوازي للطبقات
 */
export class ParallelProcessor {
  /**
   * معالجة متوازية لعدة طبقات
   */
  static async processParallel<T>(
    tasks: Array<() => Promise<T> | T>
  ): Promise<T[]> {
    return Promise.all(tasks.map(task => {
      try {
        const result = task();
        return result instanceof Promise ? result : Promise.resolve(result);
      } catch (error) {
        console.error('خطأ في المعالجة المتوازية:', error);
        return Promise.resolve(null as T);
      }
    }));
  }

  /**
   * معالجة متوازية مع حد أقصى للتزامن
   */
  static async processWithConcurrencyLimit<T>(
    tasks: Array<() => Promise<T> | T>,
    concurrencyLimit: number = 4
  ): Promise<T[]> {
    const results: T[] = [];
    const executing: Promise<void>[] = [];

    for (const task of tasks) {
      const promise = (async () => {
        try {
          const result = task();
          const resolved = result instanceof Promise ? await result : result;
          results.push(resolved);
        } catch (error) {
          console.error('خطأ في المعالجة:', error);
          results.push(null as T);
        }
      })();

      executing.push(promise);

      if (executing.length >= concurrencyLimit) {
        await Promise.race(executing);
        executing.splice(executing.findIndex(p => p === promise), 1);
      }
    }

    await Promise.all(executing);
    return results;
  }

  /**
   * معالجة مع timeout
   */
  static async processWithTimeout<T>(
    task: () => Promise<T> | T,
    timeoutMs: number = 5000
  ): Promise<T | null> {
    return Promise.race([
      (async () => {
        const result = task();
        return result instanceof Promise ? await result : result;
      })(),
      new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), timeoutMs);
      })
    ]);
  }
}

/**
 * مدير الأداء الشامل
 */
export class PerformanceManager {
  private optimizer: PerformanceOptimizer;
  private enableParallel: boolean;
  private enableCache: boolean;

  constructor(
    enableCache: boolean = true,
    enableParallel: boolean = true,
    maxCacheSize: number = 1000
  ) {
    this.optimizer = new PerformanceOptimizer(maxCacheSize);
    this.enableCache = enableCache;
    this.enableParallel = enableParallel;
  }

  /**
   * معالجة مع تحسينات الأداء
   */
  async processWithOptimization<T>(
    input: string,
    layerName: string,
    processor: () => T | Promise<T>
  ): Promise<T> {
    const startTime = Date.now();

    // محاولة الحصول من التخزين المؤقت
    if (this.enableCache) {
      const cached = this.optimizer.getCached(input, layerName);
      if (cached !== null) {
        this.optimizer.recordProcessingTime(Date.now() - startTime);
        return cached;
      }
    }

    // المعالجة
    const result = processor();
    const resolved = result instanceof Promise ? await result : result;

    // حفظ في التخزين المؤقت
    if (this.enableCache) {
      this.optimizer.setCached(input, layerName, resolved);
    }

    this.optimizer.recordProcessingTime(Date.now() - startTime);
    return resolved;
  }

  /**
   * الحصول على الإحصائيات
   */
  getStats(): PerformanceStats {
    return this.optimizer.getStats();
  }

  /**
   * مسح التخزين المؤقت
   */
  clearCache(): void {
    this.optimizer.clearCache();
  }

  /**
   * تنظيف العناصر المنتهية
   */
  cleanup(): number {
    return this.optimizer.cleanupExpired();
  }
}

