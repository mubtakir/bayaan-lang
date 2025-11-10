/**
 * Databases System Tests - اختبارات نظام قواعد البيانات
 */

import {
  DatabaseManager,
  QueryEngine,
  StorageSystem,
  IndexManager,
  QueryRequest,
  IndexConfig
} from '../../src/databases';

describe('Databases System - نظام قواعد البيانات', () => {
  
  // ═══════════════════════════════════════════════════════════════════════
  // Database Manager Tests - اختبارات مدير قواعد البيانات
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('DatabaseManager - مدير قواعد البيانات', () => {
    let manager: DatabaseManager;
    
    beforeEach(() => {
      manager = new DatabaseManager();
    });
    
    test('should create database manager with default databases', () => {
      expect(manager).toBeDefined();
      
      const databases = manager.getDatabases();
      expect(databases.length).toBeGreaterThan(0);
    });
    
    test('should register new database', () => {
      const registered = manager.registerDatabase({
        name: 'test_db',
        type: 'linguistic',
        path: './test.db',
        maxConnections: 5,
        cacheSize: 500,
        autoVacuum: true
      });
      
      expect(registered).toBe(true);
      
      const config = manager.getDatabaseConfig('test_db');
      expect(config).toBeDefined();
      expect(config?.name).toBe('test_db');
    });
    
    test('should not register duplicate database', () => {
      manager.registerDatabase({
        name: 'duplicate_db',
        type: 'semantic',
        path: './dup.db',
        maxConnections: 5,
        cacheSize: 500,
        autoVacuum: true
      });
      
      const registered = manager.registerDatabase({
        name: 'duplicate_db',
        type: 'semantic',
        path: './dup.db',
        maxConnections: 5,
        cacheSize: 500,
        autoVacuum: true
      });
      
      expect(registered).toBe(false);
    });
    
    test('should connect to database', () => {
      const connection = manager.connect('linguistic_knowledge');
      
      expect(connection).toBeDefined();
      expect(connection?.connected).toBe(true);
      expect(connection?.database).toBe('linguistic_knowledge');
    });
    
    test('should disconnect from database', () => {
      const connection = manager.connect('semantic_knowledge');
      expect(connection).toBeDefined();
      
      const disconnected = manager.disconnect(connection!.id);
      expect(disconnected).toBe(true);
    });
    
    test('should execute SELECT query', () => {
      const request: QueryRequest = {
        id: 'query1',
        database: 'logical_knowledge',
        type: 'select',
        query: 'SELECT * FROM knowledge',
        priority: 5
      };
      
      const result = manager.executeQuery(request);
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
    
    test('should execute INSERT query', () => {
      const request: QueryRequest = {
        id: 'query2',
        database: 'mathematical_knowledge',
        type: 'insert',
        query: 'INSERT INTO knowledge VALUES (?)',
        parameters: ['test data'],
        priority: 6
      };
      
      const result = manager.executeQuery(request);
      
      expect(result.success).toBe(true);
    });
    
    test('should execute UPDATE query', () => {
      const request: QueryRequest = {
        id: 'query3',
        database: 'physical_knowledge',
        type: 'update',
        query: 'UPDATE knowledge SET data = ?',
        parameters: ['updated data'],
        priority: 5
      };
      
      const result = manager.executeQuery(request);
      
      expect(result.success).toBe(true);
    });
    
    test('should execute DELETE query', () => {
      const request: QueryRequest = {
        id: 'query4',
        database: 'visual_knowledge',
        type: 'delete',
        query: 'DELETE FROM knowledge WHERE id = ?',
        parameters: [1],
        priority: 5
      };
      
      const result = manager.executeQuery(request);
      
      expect(result.success).toBe(true);
    });
    
    test('should execute SEARCH query', () => {
      const request: QueryRequest = {
        id: 'query5',
        database: 'symbolic_knowledge',
        type: 'search',
        query: 'test search',
        priority: 7
      };
      
      const result = manager.executeQuery(request);
      
      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });
    
    test('should search across multiple databases', () => {
      const results = manager.searchAcrossDatabases('test query', [
        'linguistic_knowledge',
        'semantic_knowledge'
      ]);
      
      expect(results.size).toBe(2);
    });
    
    test('should get knowledge by type', () => {
      const knowledge = manager.getKnowledge('linguistic', 'test query');
      
      expect(knowledge).toBeDefined();
      expect(Array.isArray(knowledge)).toBe(true);
    });
    
    test('should store knowledge', () => {
      const stored = manager.storeKnowledge('semantic', { test: 'data' });
      
      expect(stored).toBe(true);
    });
    
    test('should get databases by type', () => {
      const databases = manager.getDatabasesByType('linguistic');
      
      expect(databases.length).toBeGreaterThan(0);
    });
    
    test('should get statistics', () => {
      manager.executeQuery({
        id: 'stat_query',
        database: 'linguistic_knowledge',
        type: 'select',
        query: 'SELECT * FROM test',
        priority: 5
      });
      
      const stats = manager.getStatistics();
      
      expect(stats.totalDatabases).toBeGreaterThan(0);
      expect(stats.totalQueries).toBeGreaterThan(0);
    });
    
    test('should optimize database', () => {
      const result = manager.optimize('linguistic_knowledge');
      
      expect(result.success).toBe(true);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // Query Engine Tests - اختبارات محرك الاستعلامات
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('QueryEngine - محرك الاستعلامات', () => {
    let engine: QueryEngine;
    
    beforeEach(() => {
      engine = new QueryEngine();
    });
    
    test('should create query engine', () => {
      expect(engine).toBeDefined();
    });
    
    test('should create query plan', () => {
      const plan = engine.createQueryPlan('SELECT * FROM users WHERE id = 1');
      
      expect(plan).toBeDefined();
      expect(plan.steps.length).toBeGreaterThan(0);
      expect(plan.estimatedCost).toBeGreaterThan(0);
    });
    
    test('should optimize query', () => {
      const optimization = engine.optimizeQuery('SELECT * FROM users', 'advanced');
      
      expect(optimization).toBeDefined();
      expect(optimization.improvements.length).toBeGreaterThan(0);
    });
    
    test('should execute JOIN query', () => {
      const result = engine.executeJoin({
        leftTable: 'users',
        rightTable: 'orders',
        joinType: 'inner',
        onCondition: 'users.id = orders.user_id',
        selectFields: ['users.name', 'orders.total']
      });
      
      expect(result.success).toBe(true);
      expect(result.resultCount).toBeGreaterThan(0);
    });
    
    test('should execute aggregate query', () => {
      const result = engine.executeAggregate({
        table: 'orders',
        function: 'count',
        field: 'id'
      });
      
      expect(result.success).toBe(true);
      expect(result.result).toBeGreaterThan(0);
    });
    
    test('should explain query', () => {
      const explanation = engine.explainQuery('SELECT * FROM users WHERE age > 18');
      
      expect(explanation).toBeDefined();
      expect(explanation.plan).toBeDefined();
      expect(explanation.optimization).toBeDefined();
      expect(explanation.recommendations).toBeDefined();
    });
    
    test('should analyze query performance', () => {
      const analysis = engine.analyzeQueryPerformance('SELECT * FROM users', 25);
      
      expect(analysis).toBeDefined();
      expect(analysis.performance).toBeDefined();
      expect(['excellent', 'good', 'fair', 'poor']).toContain(analysis.performance);
    });
    
    test('should get statistics', () => {
      engine.createQueryPlan('SELECT * FROM test');
      engine.optimizeQuery('SELECT * FROM test');
      
      const stats = engine.getStatistics();
      
      expect(stats.totalPlans).toBeGreaterThan(0);
      expect(stats.totalOptimizations).toBeGreaterThan(0);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // Storage System Tests - اختبارات نظام التخزين
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('StorageSystem - نظام التخزين', () => {
    let storage: StorageSystem;
    
    beforeEach(() => {
      storage = new StorageSystem();
    });
    
    test('should create storage system', () => {
      expect(storage).toBeDefined();
    });
    
    test('should store data', () => {
      const entry = storage.store('key1', { data: 'test' });
      
      expect(entry).toBeDefined();
      expect(entry.key).toBe('key1');
    });
    
    test('should retrieve data', () => {
      storage.store('key2', { data: 'test value' });
      
      const value = storage.retrieve('key2');
      
      expect(value).toBeDefined();
    });
    
    test('should delete data', () => {
      storage.store('key3', { data: 'to delete' });
      
      const deleted = storage.delete('key3');
      expect(deleted).toBe(true);
      
      const value = storage.retrieve('key3');
      expect(value).toBeNull();
    });
    
    test('should check if key exists', () => {
      storage.store('key4', { data: 'exists' });
      
      expect(storage.exists('key4')).toBe(true);
      expect(storage.exists('nonexistent')).toBe(false);
    });
    
    test('should get all keys', () => {
      storage.store('key5', 'value1');
      storage.store('key6', 'value2');
      
      const keys = storage.keys();
      
      expect(keys.length).toBeGreaterThanOrEqual(2);
    });
    
    test('should get storage size', () => {
      storage.store('key7', 'value');
      
      const size = storage.size();
      expect(size).toBeGreaterThan(0);
    });
    
    test('should get total size in bytes', () => {
      storage.store('key8', { large: 'data' });
      
      const totalSize = storage.totalSize();
      expect(totalSize).toBeGreaterThan(0);
    });
    
    test('should flush storage', () => {
      storage.store('key9', 'value');
      
      const flushed = storage.flush();
      expect(flushed).toBeGreaterThan(0);
    });
    
    test('should compact storage', () => {
      storage.store('key10', 'value', { ttl: 1 }); // Expires in 1ms
      
      setTimeout(() => {
        const result = storage.compact();
        expect(result).toBeDefined();
      }, 10);
    });
    
    test('should get statistics', () => {
      storage.store('key11', 'value');
      storage.retrieve('key11');
      
      const stats = storage.getStatistics();
      
      expect(stats.totalEntries).toBeGreaterThan(0);
      expect(stats.hitRate).toBeGreaterThan(0);
    });
    
    test('should export data', () => {
      storage.store('key12', 'value1');
      storage.store('key13', 'value2');
      
      const exported = storage.export();
      
      expect(exported.length).toBeGreaterThanOrEqual(2);
    });
    
    test('should import data', () => {
      const data: Array<[string, any]> = [
        ['import1', 'value1'],
        ['import2', 'value2']
      ];
      
      const imported = storage.import(data);
      
      expect(imported).toBe(2);
    });
    
    test('should backup and restore', () => {
      storage.store('backup1', 'value1');
      storage.store('backup2', 'value2');
      
      const backup = storage.backup();
      expect(backup.entries).toBeGreaterThan(0);
      
      storage.clear();
      expect(storage.size()).toBe(0);
      
      const restored = storage.restore(backup);
      expect(restored).toBe(backup.entries);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════════════
  // Index Manager Tests - اختبارات مدير الفهارس
  // ═══════════════════════════════════════════════════════════════════════
  
  describe('IndexManager - مدير الفهارس', () => {
    let manager: IndexManager;
    
    beforeEach(() => {
      manager = new IndexManager();
    });
    
    test('should create index manager', () => {
      expect(manager).toBeDefined();
    });
    
    test('should create BTree index', () => {
      const config: IndexConfig = {
        name: 'idx_users_id',
        table: 'users',
        columns: ['id'],
        type: 'btree',
        unique: true,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      expect(index).toBeDefined();
      expect(index.config.type).toBe('btree');
    });
    
    test('should create Hash index', () => {
      const config: IndexConfig = {
        name: 'idx_users_email',
        table: 'users',
        columns: ['email'],
        type: 'hash',
        unique: true,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      expect(index.config.type).toBe('hash');
    });
    
    test('should create FullText index', () => {
      const config: IndexConfig = {
        name: 'idx_posts_content',
        table: 'posts',
        columns: ['content'],
        type: 'fulltext',
        unique: false,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      expect(index.config.type).toBe('fulltext');
    });
    
    test('should add to index', (done) => {
      const config: IndexConfig = {
        name: 'test_index',
        table: 'test',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      setTimeout(() => {
        const added = manager.addToIndex(index.id, 'key1', { data: 'value1' });
        expect(added).toBe(true);
        done();
      }, 150);
    });
    
    test('should search using index', (done) => {
      const config: IndexConfig = {
        name: 'search_index',
        table: 'test',
        columns: ['name'],
        type: 'btree',
        unique: false,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      setTimeout(() => {
        manager.addToIndex(index.id, 'searchKey', { data: 'found' });
        
        const result = manager.search(index.id, 'searchKey');
        
        expect(result).toBeDefined();
        expect(result.indexUsed).toBe(true);
        done();
      }, 150);
    });
    
    test('should remove from index', (done) => {
      const config: IndexConfig = {
        name: 'remove_index',
        table: 'test',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      setTimeout(() => {
        manager.addToIndex(index.id, 'removeKey', { data: 'value' });
        
        const removed = manager.removeFromIndex(index.id, 'removeKey');
        expect(removed).toBe(true);
        done();
      }, 150);
    });
    
    test('should rebuild index', () => {
      const config: IndexConfig = {
        name: 'rebuild_index',
        table: 'test',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      const rebuilt = manager.rebuildIndex(index.id);
      expect(rebuilt).toBe(true);
    });
    
    test('should drop index', () => {
      const config: IndexConfig = {
        name: 'drop_index',
        table: 'test',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      };
      
      const index = manager.createIndex(config);
      
      const dropped = manager.dropIndex(index.id);
      expect(dropped).toBe(true);
    });
    
    test('should get indexes by table', () => {
      manager.createIndex({
        name: 'idx1',
        table: 'users',
        columns: ['id'],
        type: 'btree',
        unique: true,
        sparse: false
      });
      
      manager.createIndex({
        name: 'idx2',
        table: 'users',
        columns: ['email'],
        type: 'hash',
        unique: true,
        sparse: false
      });
      
      const indexes = manager.getIndexesByTable('users');
      
      expect(indexes.length).toBe(2);
    });
    
    test('should get indexes by type', () => {
      manager.createIndex({
        name: 'btree1',
        table: 'test1',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      });
      
      manager.createIndex({
        name: 'btree2',
        table: 'test2',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      });
      
      const indexes = manager.getIndexesByType('btree');
      
      expect(indexes.length).toBeGreaterThanOrEqual(2);
    });
    
    test('should get statistics', () => {
      manager.createIndex({
        name: 'stat_index',
        table: 'test',
        columns: ['id'],
        type: 'btree',
        unique: false,
        sparse: false
      });
      
      const stats = manager.getStatistics();
      
      expect(stats.totalIndexes).toBeGreaterThan(0);
    });
  });
});

