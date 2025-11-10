/**
 * اختبارات التكامل - Integration Tests
 * 
 * اختبارات للأنظمة المتكاملة الجديدة
 */

import { UnifiedInferenceEngine, QueryType } from '../src/baserah/integration/unifiedInferenceEngine';
import { LinguisticIntegration } from '../src/baserah/integration/linguisticIntegration';
import { TimeEngine, TimeUnit } from '../src/time/timeEngine';
import { KnowledgeStorage, StorageFormat } from '../src/storage/knowledgeStorage';
import { Thing, ThingProperty, PropertyType } from '../src/baserah/knowledge/thingEngine';
import { Event, EventType } from '../src/baserah/knowledge/eventEngine';
import { Predicate, Term, Fact } from '../src/logic/logicEngine';
import { RelationType } from '../src/logic/causalEngine';
import * as fs from 'fs';

describe('Unified Inference Engine - محرك الاستدلال الموحد', () => {
  let unifiedEngine: UnifiedInferenceEngine;

  beforeEach(() => {
    unifiedEngine = new UnifiedInferenceEngine();
  });

  it('should create unified engine - إنشاء محرك موحد', () => {
    expect(unifiedEngine).toBeDefined();
    expect(unifiedEngine.getLogicEngine()).toBeDefined();
    expect(unifiedEngine.getCausalEngine()).toBeDefined();
    expect(unifiedEngine.getLetterEngine()).toBeDefined();
    expect(unifiedEngine.getInferenceEngine()).toBeDefined();
  });

  it('should query with all types - استعلام بجميع الأنواع', () => {
    // إضافة بعض البيانات
    const causalEngine = unifiedEngine.getCausalEngine();
    causalEngine.addRelation('حرارة_عالية', 'احتراق', RelationType.CAUSES, 0.9);

    const result = unifiedEngine.query('لماذا احتراق؟', QueryType.ALL);

    expect(result).toBeDefined();
    expect(result.question).toBe('لماذا احتراق؟');
    expect(result.queryType).toBe(QueryType.ALL);
  });

  it('should query causal relations - استعلام العلاقات السببية', () => {
    const causalEngine = unifiedEngine.getCausalEngine();
    causalEngine.addRelation('دك', 'امتلاء', RelationType.CAUSES, 0.9);
    causalEngine.addRelation('امتلاء', 'تشبع', RelationType.CAUSES, 0.85);

    const result = unifiedEngine.query('لماذا تشبع؟', QueryType.CAUSAL);

    // التحقق من أن الاستعلام تم
    expect(result).toBeDefined();
    expect(result.queryType).toBe(QueryType.CAUSAL);
  });

  it('should query linguistic analysis - استعلام التحليل اللغوي', () => {
    const result = unifiedEngine.query('ما معنى كلمة شجرة؟', QueryType.LINGUISTIC);

    expect(result.linguisticResults.length).toBeGreaterThan(0);
    // الكلمة قد تحتوي على علامات ترقيم
    expect(result.linguisticResults[0].word).toMatch(/شجرة/);
  });

  it('should calculate confidence - حساب درجة الثقة', () => {
    const letterEngine = unifiedEngine.getLetterEngine();
    letterEngine.analyzeWord('شجرة');

    const result = unifiedEngine.query('ما معنى شجرة؟', QueryType.LINGUISTIC);

    expect(result.confidence).toBeGreaterThan(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });
});

describe('Linguistic Integration - التكامل اللغوي', () => {
  let integration: LinguisticIntegration;

  beforeEach(() => {
    integration = new LinguisticIntegration();
  });

  it('should create thing from word - إنشاء شيء من كلمة', () => {
    const thing = integration.createThingFromWord('شجرة');

    expect(thing).toBeDefined();
    expect(thing!.name).toBe('شجرة');
    expect(thing!.category).toBe('نبات');
  });

  it('should add properties from analysis - إضافة خصائص من التحليل', () => {
    const thing = integration.createThingFromWord('شجرة');

    expect(thing).toBeDefined();
    
    const meanings = thing!.getProperty('معاني_الكلمة');
    expect(meanings).toBeDefined();
    expect(Array.isArray(meanings!.value)).toBe(true);

    const confidence = thing!.getProperty('ثقة_التحليل');
    expect(confidence).toBeDefined();
    expect(confidence!.value).toBeGreaterThan(0);
  });

  it('should add states from analysis - إضافة حالات من التحليل', () => {
    const thing = integration.createThingFromWord('شجرة');

    expect(thing).toBeDefined();
    
    const states = thing!.getAllStates();
    expect(states.length).toBeGreaterThan(0);
  });

  it('should create thing with causal relations - إنشاء شيء مع علاقات سببية', () => {
    const thing = integration.createThingWithCausalRelations('شجرة');

    expect(thing).toBeDefined();

    // التحقق من أن Thing تم إنشاؤه
    const thingEngine = integration.getThingEngine();
    const allThings = thingEngine.getAllThings();
    expect(allThings.length).toBeGreaterThan(0);
  });

  it('should analyze sentence - تحليل جملة', () => {
    const things = integration.analyzeSentence('الشجرة في الحديقة');

    expect(things.length).toBeGreaterThan(0);
    expect(things.some(t => t.name === 'الشجرة' || t.name === 'شجرة')).toBe(true);
  });

  it('should find things by word meaning - البحث عن أشياء بمعنى كلمة', () => {
    // إنشاء شيء أولاً
    integration.createThingFromWord('شجرة');

    // البحث
    const results = integration.findThingsByWordMeaning('شجرة');

    expect(results.length).toBeGreaterThan(0);
  });
});

describe('Time Engine - محرك الزمن', () => {
  let timeEngine: TimeEngine;

  beforeEach(() => {
    timeEngine = new TimeEngine();
  });

  it('should create time engine - إنشاء محرك الزمن', () => {
    expect(timeEngine).toBeDefined();
    
    const currentTime = timeEngine.getCurrentTime();
    expect(currentTime).toBeDefined();
    expect(currentTime.timestamp).toBeGreaterThan(0);
  });

  it('should advance time - تقدم الزمن', () => {
    const before = timeEngine.getCurrentTime().timestamp;
    
    timeEngine.advance(1, TimeUnit.HOUR);
    
    const after = timeEngine.getCurrentTime().timestamp;
    expect(after).toBeGreaterThan(before);
    expect(after - before).toBe(1000 * 60 * 60); // 1 hour in ms
  });

  it('should take snapshot - أخذ لقطة', () => {
    const thing = new Thing('أحمد', 'إنسان');
    thing.addProperty(new ThingProperty('عمر', 25, PropertyType.BIOLOGICAL, 'سنة'));

    const snapshot = timeEngine.takeSnapshot(thing, 'البداية');

    expect(snapshot).toBeDefined();
    expect(snapshot.thing.name).toBe('أحمد');
    expect(snapshot.properties.get('عمر')).toBe(25);
  });

  it('should get snapshot at time - الحصول على لقطة في وقت معين', () => {
    const thing = new Thing('أحمد', 'إنسان');
    thing.addProperty(new ThingProperty('عمر', 25, PropertyType.BIOLOGICAL, 'سنة'));

    // لقطة 1
    timeEngine.takeSnapshot(thing, 'البداية');

    // تقدم الزمن
    timeEngine.advance(1, TimeUnit.YEAR);

    // تغيير العمر
    thing.updateProperty('عمر', 26);

    // لقطة 2
    timeEngine.takeSnapshot(thing, 'بعد سنة');

    // الحصول على اللقطة الأولى
    const snapshots = timeEngine.getSnapshots('أحمد');
    expect(snapshots.length).toBe(2);
    expect(snapshots[0].properties.get('عمر')).toBe(25);
    expect(snapshots[1].properties.get('عمر')).toBe(26);
  });

  it('should query history - استعلام تاريخي', () => {
    const thing = new Thing('أحمد', 'إنسان');
    thing.addProperty(new ThingProperty('عمر', 25, PropertyType.BIOLOGICAL, 'سنة'));

    timeEngine.takeSnapshot(thing);
    timeEngine.advance(2, TimeUnit.YEAR);

    const ageBeforeTwoYears = timeEngine.queryHistory('أحمد', 'عمر', 2, TimeUnit.YEAR);
    expect(ageBeforeTwoYears).toBe(25);
  });

  it('should record events - تسجيل الأحداث', () => {
    const event = new Event('أكل', EventType.ACTION, 'أحمد', 'تفاحة');
    
    const record = timeEngine.recordEvent(event, 'أحمد أكل تفاحة');

    expect(record).toBeDefined();
    expect(record.event.name).toBe('أكل');
    expect(record.description).toBe('أحمد أكل تفاحة');
  });

  it('should get event history - الحصول على تاريخ الأحداث', () => {
    const event1 = new Event('أكل', EventType.ACTION);
    const event2 = new Event('شرب', EventType.ACTION);

    timeEngine.recordEvent(event1);
    timeEngine.advance(1, TimeUnit.HOUR);
    timeEngine.recordEvent(event2);

    const history = timeEngine.getEventHistory();
    expect(history.length).toBe(2);
  });

  it('should get statistics - الحصول على الإحصائيات', () => {
    const thing = new Thing('أحمد', 'إنسان');
    timeEngine.takeSnapshot(thing);
    timeEngine.recordEvent(new Event('test', EventType.ACTION));

    const stats = timeEngine.getStatistics();

    expect(stats.totalSnapshots).toBe(1);
    expect(stats.totalEvents).toBe(1);
    expect(stats.currentTime).toBeDefined();
  });
});

describe('Knowledge Storage - نظام التخزين', () => {
  const testFilePath = './test-knowledge.json';
  let storage: KnowledgeStorage;

  beforeEach(() => {
    storage = new KnowledgeStorage(testFilePath, StorageFormat.JSON);
    
    // حذف الملف إذا كان موجوداً
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  afterEach(() => {
    // تنظيف
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should create storage - إنشاء نظام التخزين', () => {
    expect(storage).toBeDefined();
  });

  it('should save and load things - حفظ وتحميل الأشياء', () => {
    const thing = new Thing('شجرة', 'نبات');
    thing.addProperty(new ThingProperty('طول', 5, PropertyType.PHYSICAL, 'متر'));

    storage.save({ things: [thing] });

    const loaded = storage.load();
    expect(loaded).toBeDefined();
    expect(loaded!.things.length).toBe(1);
    expect(loaded!.things[0].name).toBe('شجرة');
  });

  it('should save and load events - حفظ وتحميل الأحداث', () => {
    const event = new Event('أكل', EventType.ACTION, 'أحمد', 'تفاحة');

    storage.save({ events: [event] });

    const loaded = storage.load();
    expect(loaded).toBeDefined();
    expect(loaded!.events.length).toBe(1);
    expect(loaded!.events[0].name).toBe('أكل');
  });

  it('should save and load facts - حفظ وتحميل الحقائق', () => {
    const fact = new Fact(new Predicate('والد', [
      new Term('أحمد', false),
      new Term('محمد', false)
    ]));

    storage.save({ facts: [fact] });

    const loaded = storage.load();
    expect(loaded).toBeDefined();
    expect(loaded!.facts.length).toBe(1);
  });

  it('should get statistics - الحصول على الإحصائيات', () => {
    const thing = new Thing('test', 'test');
    storage.save({ things: [thing] });

    const stats = storage.getStatistics();

    expect(stats.exists).toBe(true);
    expect(stats.size).toBeGreaterThan(0);
    expect(stats.format).toBe(StorageFormat.JSON);
  });

  it('should handle empty load - التعامل مع تحميل فارغ', () => {
    const loaded = storage.load();
    expect(loaded).toBeNull();
  });
});

describe('Integration Tests - اختبارات التكامل الشامل', () => {
  it('should integrate all systems - تكامل جميع الأنظمة', () => {
    // 1. إنشاء المحركات
    const unifiedEngine = new UnifiedInferenceEngine();
    const integration = new LinguisticIntegration();
    const timeEngine = new TimeEngine();

    // 2. تحليل كلمة وإنشاء Thing
    const thing = integration.createThingFromWord('شجرة');
    expect(thing).toBeDefined();

    // 3. أخذ لقطة زمنية
    const snapshot = timeEngine.takeSnapshot(thing!);
    expect(snapshot).toBeDefined();

    // 4. استعلام موحد
    const result = unifiedEngine.query('ما معنى شجرة؟', QueryType.ALL);
    expect(result.hasResults()).toBe(true);

    // 5. حفظ المعرفة
    const storage = new KnowledgeStorage('./test-integration.json');
    storage.save({ things: [thing!] });

    const loaded = storage.load();
    expect(loaded).toBeDefined();

    // تنظيف
    if (fs.existsSync('./test-integration.json')) {
      fs.unlinkSync('./test-integration.json');
    }
  });
});

