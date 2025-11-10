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
export declare class StorageSystem {
    private storage;
    private cache;
    private config;
    private entryCounter;
    private hits;
    private misses;
    constructor(config?: Partial<StorageConfig>);
    private startAutoFlush;
    store(key: string, value: any, options?: {
        ttl?: number;
        compress?: boolean;
        encrypt?: boolean;
    }): StorageEntry;
    private processValue;
    private calculateSize;
    retrieve(key: string): any | null;
    delete(key: string): boolean;
    exists(key: string): boolean;
    keys(): string[];
    values(): any[];
    entries(): Array<[string, any]>;
    size(): number;
    totalSize(): number;
    flush(): number;
    compact(): {
        beforeSize: number;
        afterSize: number;
        freedSpace: number;
        removedEntries: number;
    };
    getEntry(key: string): StorageEntry | null;
    getStatistics(): StorageStats;
    getConfig(): StorageConfig;
    updateConfig(updates: Partial<StorageConfig>): void;
    clear(): void;
    export(): Array<[string, any]>;
    import(data: Array<[string, any]>): number;
    backup(): {
        timestamp: number;
        entries: number;
        size: number;
        data: Array<[string, StorageEntry]>;
    };
    restore(backup: {
        data: Array<[string, StorageEntry]>;
    }): number;
}
