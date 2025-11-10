/**
 * نظام التخزين - Storage System
 * Manages data storage and retrieval
 */

export type StorageType = 'memory' | 'disk' | 'hybrid';
export type CompressionType = 'none' | 'gzip' | 'lz4' | 'zstd';
export type EncryptionType = 'none' | 'aes128' | 'aes256';

export interface StorageConfig {
  type: StorageType;
  compression: CompressionType;
  encryption: EncryptionType;
  maxSize: number;
  autoFlush: boolean;
  flushInterval: number;
}

export interface StorageEntry {
  id: string;
  key: string;
  value: any;
  size: number;
  compressed: boolean;
  encrypted: boolean;
  timestamp: number;
  expiresAt?: number;
}

export interface StorageStats {
  totalEntries: number;
  totalSize: number;
  compressionRatio: number;
  hitRate: number;
  missRate: number;
}

export class StorageSystem {
  private storage: Map<string, StorageEntry> = new Map();
  private cache: Map<string, any> = new Map();
  private config: StorageConfig;
  private entryCounter: number = 0;
  private hits: number = 0;
  private misses: number = 0;
  
  constructor(config?: Partial<StorageConfig>) {
    this.config = {
      type: config?.type || 'hybrid',
      compression: config?.compression || 'lz4',
      encryption: config?.encryption || 'none',
      maxSize: config?.maxSize || 1024 * 1024 * 100, // 100MB
      autoFlush: config?.autoFlush !== undefined ? config.autoFlush : true,
      flushInterval: config?.flushInterval || 60000 // 1 minute
    };
    
    if (this.config.autoFlush) {
      this.startAutoFlush();
    }
  }
  
  private startAutoFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }
  
  store(key: string, value: any, options?: {
    ttl?: number;
    compress?: boolean;
    encrypt?: boolean;
  }): StorageEntry {
    const id = `entry_${this.entryCounter++}`;
    
    const compressed = options?.compress !== undefined ? options.compress : 
                      this.config.compression !== 'none';
    const encrypted = options?.encrypt !== undefined ? options.encrypt :
                     this.config.encryption !== 'none';
    
    const size = this.calculateSize(value);
    const compressedSize = compressed ? Math.floor(size * 0.6) : size; // Simulate compression
    
    const entry: StorageEntry = {
      id,
      key,
      value: this.processValue(value, compressed, encrypted),
      size: compressedSize,
      compressed,
      encrypted,
      timestamp: Date.now(),
      expiresAt: options?.ttl ? Date.now() + options.ttl : undefined
    };
    
    this.storage.set(key, entry);
    
    // Update cache
    if (this.config.type === 'memory' || this.config.type === 'hybrid') {
      this.cache.set(key, value);
    }
    
    return entry;
  }
  
  private processValue(value: any, compress: boolean, encrypt: boolean): any {
    let processed = value;
    
    if (compress) {
      // Simulate compression
      processed = { compressed: true, data: processed };
    }
    
    if (encrypt) {
      // Simulate encryption
      processed = { encrypted: true, data: processed };
    }
    
    return processed;
  }
  
  private calculateSize(value: any): number {
    // Simple size estimation
    const str = JSON.stringify(value);
    return str.length;
  }
  
  retrieve(key: string): any | null {
    // Check cache first
    if (this.cache.has(key)) {
      this.hits++;
      return this.cache.get(key);
    }
    
    // Check storage
    const entry = this.storage.get(key);
    if (!entry) {
      this.misses++;
      return null;
    }
    
    // Check expiration
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.storage.delete(key);
      this.misses++;
      return null;
    }
    
    this.hits++;
    
    // Decompress and decrypt if needed
    let value = entry.value;
    
    if (entry.encrypted) {
      value = value.data; // Simulate decryption
    }
    
    if (entry.compressed) {
      value = value.data; // Simulate decompression
    }
    
    // Update cache
    this.cache.set(key, value);
    
    return value;
  }
  
  delete(key: string): boolean {
    this.cache.delete(key);
    return this.storage.delete(key);
  }
  
  exists(key: string): boolean {
    return this.storage.has(key);
  }
  
  keys(): string[] {
    return Array.from(this.storage.keys());
  }
  
  values(): any[] {
    return Array.from(this.storage.values()).map(entry => entry.value);
  }
  
  entries(): Array<[string, any]> {
    return Array.from(this.storage.entries()).map(([key, entry]) => [key, entry.value]);
  }
  
  size(): number {
    return this.storage.size;
  }
  
  totalSize(): number {
    let total = 0;
    for (const entry of this.storage.values()) {
      total += entry.size;
    }
    return total;
  }
  
  flush(): number {
    // Simulate flushing to disk
    const flushedCount = this.storage.size;
    
    // Clear expired entries
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (entry.expiresAt && entry.expiresAt < now) {
        this.storage.delete(key);
        this.cache.delete(key);
      }
    }
    
    return flushedCount;
  }
  
  compact(): {
    beforeSize: number;
    afterSize: number;
    freedSpace: number;
    removedEntries: number;
  } {
    const beforeSize = this.totalSize();
    const beforeCount = this.storage.size;
    
    // Remove expired entries
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (entry.expiresAt && entry.expiresAt < now) {
        this.storage.delete(key);
        this.cache.delete(key);
      }
    }
    
    const afterSize = this.totalSize();
    const afterCount = this.storage.size;
    
    return {
      beforeSize,
      afterSize,
      freedSpace: beforeSize - afterSize,
      removedEntries: beforeCount - afterCount
    };
  }
  
  getEntry(key: string): StorageEntry | null {
    return this.storage.get(key) || null;
  }
  
  getStatistics(): StorageStats {
    let totalSize = 0;
    let originalSize = 0;
    
    for (const entry of this.storage.values()) {
      totalSize += entry.size;
      // Estimate original size (before compression)
      originalSize += entry.compressed ? Math.floor(entry.size / 0.6) : entry.size;
    }
    
    const compressionRatio = originalSize > 0 ? totalSize / originalSize : 1;
    const totalAccesses = this.hits + this.misses;
    const hitRate = totalAccesses > 0 ? this.hits / totalAccesses : 0;
    const missRate = totalAccesses > 0 ? this.misses / totalAccesses : 0;
    
    return {
      totalEntries: this.storage.size,
      totalSize,
      compressionRatio,
      hitRate,
      missRate
    };
  }
  
  getConfig(): StorageConfig {
    return { ...this.config };
  }
  
  updateConfig(updates: Partial<StorageConfig>): void {
    Object.assign(this.config, updates);
  }
  
  clear(): void {
    this.storage.clear();
    this.cache.clear();
    this.entryCounter = 0;
    this.hits = 0;
    this.misses = 0;
  }
  
  export(): Array<[string, any]> {
    return Array.from(this.storage.entries()).map(([key, entry]) => [key, entry.value]);
  }
  
  import(data: Array<[string, any]>): number {
    let imported = 0;
    
    for (const [key, value] of data) {
      this.store(key, value);
      imported++;
    }
    
    return imported;
  }
  
  backup(): {
    timestamp: number;
    entries: number;
    size: number;
    data: Array<[string, StorageEntry]>;
  } {
    return {
      timestamp: Date.now(),
      entries: this.storage.size,
      size: this.totalSize(),
      data: Array.from(this.storage.entries())
    };
  }
  
  restore(backup: {
    data: Array<[string, StorageEntry]>;
  }): number {
    this.clear();
    
    let restored = 0;
    for (const [key, entry] of backup.data) {
      this.storage.set(key, entry);
      restored++;
    }
    
    return restored;
  }
}

