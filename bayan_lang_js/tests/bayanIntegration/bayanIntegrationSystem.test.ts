/**
 * اختبارات نظام التكامل مع البيان - Bayan Integration System Tests
 */

import {
  BayanConverter,
  ExecutionEngine,
  ResourceManager,
  IntegrationManager
} from '../../src/bayanIntegration';

describe('نظام التكامل مع البيان - Bayan Integration System', () => {
  
  // ============================================
  // محول البيان - Bayan Converter
  // ============================================
  
  describe('محول البيان - Bayan Converter', () => {
    let converter: BayanConverter;
    
    beforeEach(() => {
      converter = new BayanConverter();
    });
    
    test('تحويل كود بيان إلى بصيرة', () => {
      const bayanCode = 'متغير س = 10';
      
      const result = converter.convertBayanToBaserah(bayanCode);
      
      expect(result.success).toBe(true);
      expect(result.result).not.toBeNull();
      expect(result.errors).toHaveLength(0);
    });
    
    test('تحويل متغير', () => {
      const bayanCode = 'متغير عدد = 42';
      
      const result = converter.convertBayanToBaserah(bayanCode);
      
      expect(result.success).toBe(true);
      expect(result.metadata.get('tokenCount')).toBeGreaterThan(0);
    });
    
    test('تحويل ثابت', () => {
      const bayanCode = 'ثابت باي = 3.14';
      
      const result = converter.convertBayanToBaserah(bayanCode);
      
      expect(result.success).toBe(true);
    });
    
    test('تحويل دالة', () => {
      const bayanCode = 'دالة جمع س ص';
      
      const result = converter.convertBayanToBaserah(bayanCode);
      
      expect(result.success).toBe(true);
    });
    
    test('معالجة كود فارغ', () => {
      const bayanCode = '';
      
      const result = converter.convertBayanToBaserah(bayanCode);
      
      expect(result.success).toBe(true);
    });
    
    test('الحصول على الإحصائيات', () => {
      converter.convertBayanToBaserah('متغير س = 10');
      
      const stats = converter.getStatistics();
      
      expect(stats.totalConversions).toBeGreaterThan(0);
      expect(stats.supportedKeywords).toBeGreaterThan(0);
    });
    
    test('مسح الذاكرة المؤقتة', () => {
      converter.convertBayanToBaserah('متغير س = 10');
      converter.clearCache();
      
      const cache = converter.getConversionCache();
      expect(cache.size).toBe(0);
    });
  });
  
  // ============================================
  // محرك التنفيذ - Execution Engine
  // ============================================
  
  describe('محرك التنفيذ - Execution Engine', () => {
    let engine: ExecutionEngine;
    
    beforeEach(() => {
      engine = new ExecutionEngine();
    });
    
    test('تنفيذ كود بسيط', () => {
      const bayanCode = 'متغير س = 10';
      
      const result = engine.execute(bayanCode);
      
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    test('تنفيذ في وضع عادي', () => {
      const bayanCode = 'متغير عدد = 42';
      
      const result = engine.execute(bayanCode, 'normal');
      
      expect(result.success).toBe(true);
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
    });
    
    test('تنفيذ في وضع التنقيح', () => {
      const bayanCode = 'متغير س = 10';
      
      const result = engine.execute(bayanCode, 'debug');
      
      expect(result.success).toBe(true);
    });
    
    test('إضافة نقطة توقف', () => {
      engine.addBreakpoint(5);
      
      const breakpoints = engine.getBreakpoints();
      
      expect(breakpoints).toHaveLength(1);
      expect(breakpoints[0].line).toBe(5);
    });
    
    test('إزالة نقطة توقف', () => {
      engine.addBreakpoint(5);
      engine.removeBreakpoint(5);
      
      const breakpoints = engine.getBreakpoints();
      
      expect(breakpoints).toHaveLength(0);
    });
    
    test('تبديل نقطة توقف', () => {
      engine.addBreakpoint(5);
      engine.toggleBreakpoint(5);
      
      const breakpoints = engine.getBreakpoints();
      
      expect(breakpoints[0].enabled).toBe(false);
    });
    
    test('الحصول على متغير', () => {
      engine.setVariable('س', 42);
      
      const value = engine.getVariable('س');
      
      expect(value).toBe(42);
    });
    
    test('تعيين متغير', () => {
      engine.setVariable('عدد', 100);
      
      const value = engine.getVariable('عدد');
      
      expect(value).toBe(100);
    });
    
    test('الحصول على مكدس الاستدعاء', () => {
      const callStack = engine.getCallStack();
      
      expect(Array.isArray(callStack)).toBe(true);
    });
    
    test('الحصول على الحالة', () => {
      const state = engine.getState();
      
      expect(['idle', 'running', 'paused', 'completed', 'error']).toContain(state);
    });
    
    test('الحصول على الوضع', () => {
      const mode = engine.getMode();
      
      expect(['normal', 'debug', 'step', 'trace']).toContain(mode);
    });
    
    test('الحصول على السياق', () => {
      const context = engine.getContext();
      
      expect(context.variables).toBeDefined();
      expect(context.functions).toBeDefined();
    });
    
    test('الحصول على الإحصائيات', () => {
      engine.execute('متغير س = 10');
      
      const stats = engine.getStatistics();
      
      expect(stats.totalExecutions).toBeGreaterThan(0);
    });
    
    test('إعادة تعيين', () => {
      engine.execute('متغير س = 10');
      engine.reset();
      
      const stats = engine.getStatistics();
      expect(stats.totalExecutions).toBe(0);
    });
  });
  
  // ============================================
  // مدير الموارد - Resource Manager
  // ============================================
  
  describe('مدير الموارد - Resource Manager', () => {
    let manager: ResourceManager;
    
    beforeEach(() => {
      manager = new ResourceManager();
    });
    
    test('إنشاء مورد', () => {
      const resource = manager.createResource('memory', 1024);
      
      expect(resource.type).toBe('memory');
      expect(resource.capacity).toBe(1024);
      expect(resource.available).toBe(1024);
    });
    
    test('تخصيص مورد', () => {
      const allocation = manager.allocate('memory', 100, 'test', 5);
      
      expect(allocation).not.toBeNull();
      expect(allocation!.amount).toBe(100);
      expect(allocation!.owner).toBe('test');
    });
    
    test('إلغاء تخصيص مورد', () => {
      const allocation = manager.allocate('memory', 100, 'test', 5);
      
      const success = manager.deallocate(allocation!.id);
      
      expect(success).toBe(true);
    });
    
    test('الحصول على مورد', () => {
      const created = manager.createResource('cpu', 100);
      
      const resource = manager.getResource(created.id);
      
      expect(resource).not.toBeNull();
      expect(resource!.type).toBe('cpu');
    });
    
    test('الحصول على الموارد حسب النوع', () => {
      const resources = manager.getResourcesByType('memory');
      
      expect(resources.length).toBeGreaterThan(0);
    });
    
    test('الحصول على التخصيصات', () => {
      manager.allocate('memory', 100, 'test1', 5);
      manager.allocate('cpu', 10, 'test2', 5);
      
      const allocations = manager.getAllocations();
      
      expect(allocations.length).toBeGreaterThan(0);
    });
    
    test('الحصول على التخصيصات حسب المالك', () => {
      manager.allocate('memory', 100, 'owner1', 5);
      manager.allocate('cpu', 10, 'owner2', 5);
      
      const allocations = manager.getAllocations('owner1');
      
      expect(allocations.length).toBeGreaterThan(0);
      expect(allocations[0].owner).toBe('owner1');
    });
    
    test('الحصول على استخدام المورد', () => {
      const usage = manager.getResourceUsage('memory');
      
      expect(usage.total).toBeGreaterThan(0);
      expect(usage.percentage).toBeGreaterThanOrEqual(0);
    });
    
    test('تعيين حصة', () => {
      manager.setQuota('memory', 2048, 1600, 1900);
      
      const quota = manager.getQuota('memory');
      
      expect(quota).not.toBeNull();
      expect(quota!.limit).toBe(2048);
    });
    
    test('فحص الحصة', () => {
      const check = manager.checkQuota('memory');
      
      expect(check.withinLimit).toBeDefined();
      expect(check.usage).toBeGreaterThanOrEqual(0);
    });
    
    test('الحصول على الإحصائيات', () => {
      const stats = manager.getStatistics();
      
      expect(stats.totalResources).toBeGreaterThan(0);
      expect(stats.overallUsage).toBeGreaterThanOrEqual(0);
    });
    
    test('مسح البيانات', () => {
      manager.allocate('memory', 100, 'test', 5);
      manager.clear();
      
      const allocations = manager.getAllocations();
      expect(allocations).toHaveLength(0);
    });
  });
  
  // ============================================
  // مدير التكامل - Integration Manager
  // ============================================
  
  describe('مدير التكامل - Integration Manager', () => {
    let manager: IntegrationManager;
    
    beforeEach(() => {
      manager = new IntegrationManager();
    });
    
    test('بدء جلسة', () => {
      const session = manager.startSession();
      
      expect(session.id).toBeDefined();
      expect(session.startTime).toBeGreaterThan(0);
      expect(session.endTime).toBeNull();
    });
    
    test('إنهاء جلسة', () => {
      manager.startSession();
      const session = manager.endSession();
      
      expect(session).not.toBeNull();
      expect(session!.endTime).not.toBeNull();
    });
    
    test('معالجة كود', () => {
      manager.startSession();
      
      const result = manager.processCode('متغير س = 10', false);
      
      expect(result.conversion).not.toBeNull();
    });
    
    test('معالجة كود مع التنفيذ', () => {
      manager.startSession();
      
      const result = manager.processCode('متغير س = 10', true);
      
      expect(result.conversion).not.toBeNull();
    });
    
    test('تحويل كود', () => {
      const result = manager.convertCode('متغير س = 10');
      
      expect(result.success).toBe(true);
    });
    
    test('تنفيذ كود', () => {
      const result = manager.executeCode('متغير س = 10');
      
      expect(result.success).toBe(true);
    });
    
    test('الوصول إلى المكونات', () => {
      const converter = manager.getConverter();
      const engine = manager.getExecutionEngine();
      const resourceMgr = manager.getResourceManager();
      
      expect(converter).toBeInstanceOf(BayanConverter);
      expect(engine).toBeInstanceOf(ExecutionEngine);
      expect(resourceMgr).toBeInstanceOf(ResourceManager);
    });
    
    test('الحصول على الحالة', () => {
      const status = manager.getStatus();
      
      expect(['active', 'inactive', 'error', 'maintenance']).toContain(status);
    });
    
    test('الحصول على الإعدادات', () => {
      const settings = manager.getSettings();
      
      expect(settings.mode).toBeDefined();
      expect(settings.autoConvert).toBeDefined();
    });
    
    test('تحديث الإعدادات', () => {
      manager.updateSettings({ mode: 'production' });
      
      const settings = manager.getSettings();
      
      expect(settings.mode).toBe('production');
    });
    
    test('الحصول على الجلسة الحالية', () => {
      manager.startSession();
      
      const session = manager.getCurrentSession();
      
      expect(session).not.toBeNull();
    });
    
    test('الحصول على الجلسات', () => {
      manager.startSession();
      manager.endSession();
      
      const sessions = manager.getSessions();
      
      expect(sessions.length).toBeGreaterThan(0);
    });
    
    test('الحصول على استخدام الموارد', () => {
      const usage = manager.getResourceUsage();
      
      expect(usage.memory).toBeDefined();
      expect(usage.cpu).toBeDefined();
      expect(usage.storage).toBeDefined();
    });
    
    test('الحصول على الإحصائيات الشاملة', () => {
      manager.startSession();
      manager.processCode('متغير س = 10', false);
      
      const stats = manager.getStatistics();
      
      expect(stats.converter).toBeDefined();
      expect(stats.execution).toBeDefined();
      expect(stats.resources).toBeDefined();
      expect(stats.sessions).toBeDefined();
    });
    
    test('مسح التاريخ', () => {
      manager.startSession();
      manager.processCode('متغير س = 10', false);
      manager.clearHistory();
      
      const sessions = manager.getSessions();
      expect(sessions).toHaveLength(0);
    });
    
    test('إعادة تعيين', () => {
      manager.startSession();
      manager.processCode('متغير س = 10', false);
      manager.reset();
      
      const stats = manager.getStatistics();
      expect(stats.sessions.total).toBe(0);
    });
  });
});

