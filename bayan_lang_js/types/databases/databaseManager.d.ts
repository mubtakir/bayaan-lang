/**
 * مدير قواعد البيانات - Database Manager
 * Manages all database operations for Baserah AI
 */
export type DatabaseType = 'linguistic' | 'semantic' | 'logical' | 'mathematical' | 'physical' | 'visual' | 'symbolic' | 'interpretive' | 'harvested' | 'external' | 'expert' | 'revolutionary' | 'shape';
export type QueryType = 'select' | 'insert' | 'update' | 'delete' | 'search';
export interface DatabaseConfig {
    name: string;
    type: DatabaseType;
    path: string;
    maxConnections: number;
    cacheSize: number;
    autoVacuum: boolean;
}
export interface DatabaseConnection {
    id: string;
    database: string;
    type: DatabaseType;
    connected: boolean;
    lastUsed: number;
    queryCount: number;
}
export interface QueryRequest {
    id: string;
    database: string;
    type: QueryType;
    query: string;
    parameters?: any[];
    priority: number;
}
export interface QueryResult {
    id: string;
    requestId: string;
    success: boolean;
    data: any[];
    rowCount: number;
    executionTime: number;
    timestamp: number;
}
export declare class DatabaseManager {
    private databases;
    private connections;
    private queryResults;
    private connectionCounter;
    private queryCounter;
    constructor();
    private initializeDefaultDatabases;
    registerDatabase(config: DatabaseConfig): boolean;
    connect(databaseName: string): DatabaseConnection | null;
    disconnect(connectionId: string): boolean;
    executeQuery(request: QueryRequest): QueryResult;
    private simulateQuery;
    private simulateSelect;
    private simulateInsert;
    private simulateUpdate;
    private simulateDelete;
    private simulateSearch;
    private updateConnectionStats;
    searchAcrossDatabases(query: string, databases?: string[]): Map<string, QueryResult>;
    getKnowledge(type: DatabaseType, query: string): any[];
    storeKnowledge(type: DatabaseType, data: any): boolean;
    getDatabaseConfig(name: string): DatabaseConfig | null;
    getConnection(id: string): DatabaseConnection | null;
    getActiveConnections(): DatabaseConnection[];
    getQueryResult(id: string): QueryResult | null;
    getDatabases(): DatabaseConfig[];
    getDatabasesByType(type: DatabaseType): DatabaseConfig[];
    getStatistics(): {
        totalDatabases: number;
        totalConnections: number;
        activeConnections: number;
        totalQueries: number;
        successfulQueries: number;
        averageQueryTime: number;
        databaseTypeDistribution: Record<DatabaseType, number>;
        queryTypeDistribution: Record<QueryType, number>;
    };
    optimize(databaseName: string): {
        success: boolean;
        vacuumed: boolean;
        reindexed: boolean;
        cacheCleared: boolean;
        optimizationTime: number;
    };
    clear(): void;
}
