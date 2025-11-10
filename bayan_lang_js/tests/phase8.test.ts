/**
 * اختبارات المرحلة 8 - Phase 8 Tests
 * 
 * اختبارات شاملة للأنظمة منخفضة الأولوية
 */

import {
  RestAPIEngine,
  APIRequest,
  RequestMethod,
  ResponseStatus
} from '../src/api/restAPI';

import {
  DevToolsEngine
} from '../src/devtools/devTools';

import {
  AdvancedFeaturesEngine,
  Event,
  EventType,
  NotificationLevel,
  LogLevel
} from '../src/advanced/advancedFeatures';

describe('REST API Engine - محرك REST API', () => {
  let engine: RestAPIEngine;
  let apiKey: string;

  beforeEach(() => {
    engine = new RestAPIEngine();
    const key = engine.createAPIKey('test-key', ['*'], 100);
    apiKey = key.key;
  });

  it('should create API key - إنشاء مفتاح API', () => {
    const key = engine.createAPIKey('my-app', ['logic:read', 'logic:write'], 50);

    expect(key).toBeDefined();
    expect(key.name).toBe('my-app');
    expect(key.rateLimit).toBe(50);
    expect(key.permissions.has('logic:read')).toBe(true);
  });

  it('should authenticate request - المصادقة على الطلب', async () => {
    const request: APIRequest = {
      method: RequestMethod.GET,
      endpoint: '/api/status',
      headers: new Map([['Authorization', `Bearer ${apiKey}`]]),
      timestamp: Date.now()
    };

    const response = await engine.handleRequest(request);

    expect(response.status).toBe(ResponseStatus.SUCCESS);
  });

  it('should reject invalid API key - رفض مفتاح غير صالح', async () => {
    const request: APIRequest = {
      method: RequestMethod.GET,
      endpoint: '/api/status',
      headers: new Map([['Authorization', 'Bearer invalid_key']]),
      timestamp: Date.now()
    };

    const response = await engine.handleRequest(request);

    expect(response.status).toBe(ResponseStatus.UNAUTHORIZED);
  });

  it('should enforce rate limiting - فرض حد المعدل', async () => {
    const key = engine.createAPIKey('limited', ['*'], 2); // 2 requests per minute

    const request: APIRequest = {
      method: RequestMethod.GET,
      endpoint: '/api/status',
      headers: new Map([['Authorization', `Bearer ${key.key}`]]),
      timestamp: Date.now()
    };

    // First request - should succeed
    const response1 = await engine.handleRequest(request);
    expect(response1.status).toBe(ResponseStatus.SUCCESS);

    // Second request - should succeed
    const response2 = await engine.handleRequest(request);
    expect(response2.status).toBe(ResponseStatus.SUCCESS);

    // Third request - should be rate limited
    const response3 = await engine.handleRequest(request);
    expect(response3.status).toBe(ResponseStatus.RATE_LIMITED);
  });

  it('should get statistics - الحصول على الإحصائيات', () => {
    engine.createAPIKey('key1');
    engine.createAPIKey('key2');

    const stats = engine.getStatistics();

    expect(stats.totalAPIKeys).toBeGreaterThanOrEqual(3); // including the one from beforeEach
  });
});

describe('Development Tools - أدوات التطوير', () => {
  let devTools: DevToolsEngine;

  beforeEach(() => {
    devTools = new DevToolsEngine();
  });

  describe('Debugger - المنقح', () => {
    it('should add breakpoint - إضافة نقطة توقف', () => {
      const bp = devTools.debugger.addBreakpoint('test.bn', 10);

      expect(bp).toBeDefined();
      expect(bp.file).toBe('test.bn');
      expect(bp.line).toBe(10);
    });

    it('should remove breakpoint - إزالة نقطة توقف', () => {
      devTools.debugger.addBreakpoint('test.bn', 10);
      const removed = devTools.debugger.removeBreakpoint('test.bn', 10);

      expect(removed).toBe(true);
    });

    it('should manage call stack - إدارة المكدس', () => {
      devTools.debugger.pushFrame('main', 'test.bn', 1);
      devTools.debugger.pushFrame('foo', 'test.bn', 5);

      const stack = devTools.debugger.getCallStack();

      expect(stack.length).toBe(2);
      expect(stack[1].functionName).toBe('foo');

      devTools.debugger.popFrame();
      expect(devTools.debugger.getCallStack().length).toBe(1);
    });
  });

  describe('Profiler - قياس الأداء', () => {
    it('should measure function execution - قياس تنفيذ دالة', () => {
      const result = devTools.profiler.measure('test', () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      });

      expect(result).toBe(499500);

      const stats = devTools.profiler.getStatistics('test');
      expect(stats).toBeDefined();
      expect(stats!.count).toBe(1);
    });

    it('should track multiple measurements - تتبع قياسات متعددة', () => {
      for (let i = 0; i < 5; i++) {
        devTools.profiler.measure('loop', () => {
          return i * 2;
        });
      }

      const stats = devTools.profiler.getStatistics('loop');

      expect(stats!.count).toBe(5);
      expect(stats!.calls).toBe(5);
    });
  });

  describe('Code Formatter - منسق الكود', () => {
    it('should format code - تنسيق الكود', () => {
      const code = `
function test() {
console.log('hello');
if (true) {
return 42;
}
}
      `.trim();

      const formatted = devTools.formatter.format(code);

      expect(formatted).toContain('  console.log');
      expect(formatted).toContain('    return 42');
    });
  });
});

describe('Advanced Features - الميزات المتقدمة', () => {
  let features: AdvancedFeaturesEngine;

  beforeEach(() => {
    features = new AdvancedFeaturesEngine();
  });

  describe('Event Engine - محرك الأحداث', () => {
    it('should emit and listen to events - إطلاق والاستماع للأحداث', () => {
      let received: Event | null = null;

      features.events.on('test-event', (event) => {
        received = event;
      });

      const event = new Event(EventType.CUSTOM, 'test-event', { value: 42 });
      features.events.emit(event);

      expect(received).toBeDefined();
      expect(received!.name).toBe('test-event');
      expect(received!.data.value).toBe(42);
    });

    it('should track event history - تتبع سجل الأحداث', () => {
      features.events.emit(new Event(EventType.INFO, 'event1'));
      features.events.emit(new Event(EventType.INFO, 'event2'));
      features.events.emit(new Event(EventType.INFO, 'event3'));

      const history = features.events.getHistory();

      expect(history.length).toBe(3);
    });

    it('should support wildcard listeners - دعم المستمعين العامين', () => {
      let count = 0;

      features.events.on('*', () => {
        count++;
      });

      features.events.emit(new Event(EventType.INFO, 'event1'));
      features.events.emit(new Event(EventType.INFO, 'event2'));

      expect(count).toBe(2);
    });
  });

  describe('Notification Engine - محرك الإشعارات', () => {
    it('should create notification - إنشاء إشعار', () => {
      const notification = features.notifications.notify(
        NotificationLevel.INFO,
        'Test',
        'This is a test notification'
      );

      expect(notification).toBeDefined();
      expect(notification.title).toBe('Test');
      expect(notification.read).toBe(false);
    });

    it('should get unread notifications - الحصول على الإشعارات غير المقروءة', () => {
      features.notifications.notify(NotificationLevel.INFO, 'N1', 'Message 1');
      features.notifications.notify(NotificationLevel.INFO, 'N2', 'Message 2');

      const unread = features.notifications.getNotifications(true);

      expect(unread.length).toBe(2);

      features.notifications.markAllAsRead();

      const stillUnread = features.notifications.getNotifications(true);
      expect(stillUnread.length).toBe(0);
    });

    it('should get statistics - الحصول على الإحصائيات', () => {
      features.notifications.notify(NotificationLevel.INFO, 'N1', 'M1');
      features.notifications.notify(NotificationLevel.ERROR, 'N2', 'M2');

      const stats = features.notifications.getStatistics();

      expect(stats.total).toBe(2);
      expect(stats.byLevel.info).toBe(1);
      expect(stats.byLevel.error).toBe(1);
    });
  });

  describe('Logging Engine - محرك التسجيل', () => {
    it('should log messages - تسجيل الرسائل', () => {
      features.logging.info('Test message');
      features.logging.warn('Warning message');
      features.logging.error('Error message');

      const logs = features.logging.getLogs();

      expect(logs.length).toBe(3);
    });

    it('should filter by level - التصفية حسب المستوى', () => {
      features.logging.info('Info');
      features.logging.error('Error');

      const errors = features.logging.getLogs(LogLevel.ERROR);

      expect(errors.length).toBe(1);
      expect(errors[0].level).toBe(LogLevel.ERROR);
    });

    it('should respect minimum level - احترام المستوى الأدنى', () => {
      features.logging.setMinLevel(LogLevel.WARN);

      features.logging.debug('Debug'); // should not be logged
      features.logging.info('Info');   // should not be logged
      features.logging.warn('Warn');   // should be logged
      features.logging.error('Error'); // should be logged

      const logs = features.logging.getLogs();

      expect(logs.length).toBe(2);
    });
  });

  describe('Configuration Engine - محرك التكوين', () => {
    it('should set and get values - تعيين والحصول على القيم', () => {
      features.config.set('app.name', 'Bayan');
      features.config.set('app.version', '1.0.0');

      expect(features.config.get('app.name')).toBe('Bayan');
      expect(features.config.get('app.version')).toBe('1.0.0');
    });

    it('should use default values - استخدام القيم الافتراضية', () => {
      features.config.setDefault('timeout', 5000);

      expect(features.config.get('timeout')).toBe(5000);

      features.config.set('timeout', 10000);
      expect(features.config.get('timeout')).toBe(10000);
    });

    it('should load and export - التحميل والتصدير', () => {
      const config = {
        'key1': 'value1',
        'key2': 'value2'
      };

      features.config.load(config);

      const exported = features.config.export();

      expect(exported['key1']).toBe('value1');
      expect(exported['key2']).toBe('value2');
    });
  });

  it('should get overall statistics - الحصول على الإحصائيات الشاملة', () => {
    features.events.emit(new Event(EventType.INFO, 'test'));
    features.notifications.notify(NotificationLevel.INFO, 'Test', 'Message');
    features.logging.info('Log message');
    features.config.set('key', 'value');

    const stats = features.getOverallStatistics();

    expect(stats.events.totalEvents).toBeGreaterThan(0);
    expect(stats.notifications.total).toBeGreaterThan(0);
    expect(stats.logging.total).toBeGreaterThan(0);
    expect(stats.config.totalKeys).toBeGreaterThan(0);
  });
});

