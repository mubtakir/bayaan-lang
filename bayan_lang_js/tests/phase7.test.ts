/**
 * اختبارات المرحلة 7 - Phase 7 Tests
 * 
 * اختبارات شاملة للأنظمة المتوسطة الأولوية
 */

import {
  ProbabilityEngine,
  ProbabilisticRule,
  Evidence,
  EvidenceType,
  ProbabilityLevel,
  CombinationMethod
} from '../src/probability/probabilityEngine';

import {
  GoalEngine,
  Goal,
  Action,
  Condition,
  GoalState,
  GoalPriority,
  GoalType
} from '../src/planning/goalEngine';

import {
  PerformanceEngine,
  Cache
} from '../src/performance/performanceEngine';

describe('Probability Engine - محرك الاحتمالات', () => {
  let engine: ProbabilityEngine;

  beforeEach(() => {
    engine = new ProbabilityEngine();
  });

  it('should create probabilistic fact - إنشاء حقيقة احتمالية', () => {
    const fact = engine.addFact('سيمطر غداً', 0.7);

    expect(fact).toBeDefined();
    expect(fact.statement).toBe('سيمطر غداً');
    expect(fact.probability).toBe(0.7);
    expect(fact.getProbabilityLevel()).toBe(ProbabilityLevel.LIKELY);
  });

  it('should add evidence and recalculate - إضافة دليل وإعادة حساب', () => {
    engine.addFact('سيمطر غداً', 0.5);

    const evidence1 = new Evidence('غيوم داكنة', EvidenceType.SUPPORTING, 0.8);
    const evidence2 = new Evidence('رطوبة عالية', EvidenceType.SUPPORTING, 0.6);

    engine.addEvidence('سيمطر غداً', evidence1);
    engine.addEvidence('سيمطر غداً', evidence2);

    const fact = engine.getFact('سيمطر غداً');
    expect(fact).toBeDefined();
    expect(fact!.probability).toBeGreaterThan(0.5);
  });

  it('should apply probabilistic rules - تطبيق القواعد الاحتمالية', () => {
    engine.addFact('غيوم', 0.9);
    engine.addFact('رطوبة', 0.8);

    const premises = new Map<string, number>();
    premises.set('غيوم', 0.7);
    premises.set('رطوبة', 0.6);

    const rule = new ProbabilisticRule('قاعدة_المطر', premises, 'مطر', 0.9);
    engine.addRule(rule);

    const newFacts = engine.applyRules();

    expect(newFacts.length).toBeGreaterThan(0);
    const rainFact = engine.getFact('مطر');
    expect(rainFact).toBeDefined();
    expect(rainFact!.probability).toBeGreaterThan(0);
  });

  it('should combine probabilities - دمج الاحتمالات', () => {
    const p1 = 0.7;
    const p2 = 0.8;

    const avg = engine.combineProbabilities(p1, p2, CombinationMethod.AVERAGE);
    expect(avg).toBe(0.75);

    const bayesian = engine.combineProbabilities(p1, p2, CombinationMethod.BAYESIAN);
    expect(bayesian).toBeGreaterThan(0);
    expect(bayesian).toBeLessThanOrEqual(1);
  });

  it('should get facts above threshold - الحصول على حقائق فوق عتبة', () => {
    engine.addFact('حقيقة1', 0.9);
    engine.addFact('حقيقة2', 0.3);
    engine.addFact('حقيقة3', 0.8);

    const highProbFacts = engine.getFactsAboveThreshold(0.7);

    expect(highProbFacts.length).toBe(2);
    expect(highProbFacts[0].probability).toBeGreaterThanOrEqual(0.7);
  });

  it('should get statistics - الحصول على الإحصائيات', () => {
    engine.addFact('حقيقة1', 0.9);
    engine.addFact('حقيقة2', 0.4);
    engine.addFact('حقيقة3', 0.2);

    const stats = engine.getStatistics();

    expect(stats.totalFacts).toBe(3);
    expect(stats.certainFacts).toBe(1);
    expect(stats.uncertainFacts).toBe(2);
    expect(stats.averageProbability).toBeCloseTo(0.5, 1);
  });
});

describe('Goal Engine - محرك الأهداف', () => {
  let engine: GoalEngine;

  beforeEach(() => {
    engine = new GoalEngine();
  });

  it('should create goal - إنشاء هدف', () => {
    const goal = new Goal(
      'تعلم البرمجة',
      'إتقان لغة البيان',
      GoalType.ACHIEVEMENT,
      GoalPriority.HIGH
    );

    engine.addGoal(goal);

    const retrieved = engine.getGoal('تعلم البرمجة');
    expect(retrieved).toBeDefined();
    expect(retrieved!.name).toBe('تعلم البرمجة');
  });

  it('should check goal achievement - التحقق من تحقق الهدف', () => {
    const conditions = [
      new Condition('مستوى', '>=', 5)
    ];

    const goal = new Goal(
      'الوصول للمستوى 5',
      'تحقيق المستوى الخامس',
      GoalType.ACHIEVEMENT,
      GoalPriority.MEDIUM,
      conditions
    );

    engine.addGoal(goal);
    engine.updateContext('مستوى', 3);

    let achieved = engine.checkGoals();
    expect(achieved.length).toBe(0);

    engine.updateContext('مستوى', 5);
    achieved = engine.checkGoals();
    expect(achieved.length).toBe(1);
    expect(goal.state).toBe(GoalState.ACHIEVED);
  });

  it('should manage subgoals - إدارة الأهداف الفرعية', () => {
    const mainGoal = new Goal(
      'بناء تطبيق',
      'بناء تطبيق كامل',
      GoalType.ACHIEVEMENT,
      GoalPriority.HIGH
    );

    const subgoal1 = new Goal(
      'التصميم',
      'تصميم الواجهة',
      GoalType.ACHIEVEMENT,
      GoalPriority.MEDIUM
    );

    const subgoal2 = new Goal(
      'البرمجة',
      'كتابة الكود',
      GoalType.ACHIEVEMENT,
      GoalPriority.MEDIUM
    );

    mainGoal.addSubgoal(subgoal1);
    mainGoal.addSubgoal(subgoal2);

    expect(mainGoal.subgoals.length).toBe(2);

    subgoal1.achieve();
    mainGoal.updateProgress();
    expect(mainGoal.progress).toBe(50);

    subgoal2.achieve();
    mainGoal.updateProgress();
    expect(mainGoal.progress).toBe(100);
  });

  it('should plan for goal - التخطيط لتحقيق هدف', () => {
    const goal = new Goal(
      'فتح الباب',
      'فتح الباب المغلق',
      GoalType.ACHIEVEMENT,
      GoalPriority.HIGH,
      [new Condition('باب_مفتوح', '==', true)]
    );

    engine.addGoal(goal);
    engine.updateContext('باب_مفتوح', false);
    engine.updateContext('لديك_مفتاح', true);

    const action = new Action(
      'استخدام المفتاح',
      'فتح الباب بالمفتاح',
      [new Condition('لديك_مفتاح', '==', true)],
      new Map([['باب_مفتوح', true]]),
      1
    );

    engine.addAction(action);

    const plan = engine.planForGoal('فتح الباب');

    expect(plan).toBeDefined();
    expect(plan!.actions.length).toBeGreaterThan(0);
    expect(plan!.actions[0].name).toBe('استخدام المفتاح');
  });

  it('should get goals by state - الحصول على الأهداف حسب الحالة', () => {
    const goal1 = new Goal('هدف1', 'وصف1', GoalType.ACHIEVEMENT, GoalPriority.HIGH);
    const goal2 = new Goal('هدف2', 'وصف2', GoalType.ACHIEVEMENT, GoalPriority.MEDIUM);

    goal1.start();
    goal2.achieve();

    engine.addGoal(goal1);
    engine.addGoal(goal2);

    const inProgress = engine.getGoalsByState(GoalState.IN_PROGRESS);
    const achieved = engine.getGoalsByState(GoalState.ACHIEVED);

    expect(inProgress.length).toBe(1);
    expect(achieved.length).toBe(1);
  });

  it('should get statistics - الحصول على الإحصائيات', () => {
    const goal1 = new Goal('هدف1', 'وصف1', GoalType.ACHIEVEMENT, GoalPriority.HIGH);
    const goal2 = new Goal('هدف2', 'وصف2', GoalType.ACHIEVEMENT, GoalPriority.MEDIUM);
    const goal3 = new Goal('هدف3', 'وصف3', GoalType.ACHIEVEMENT, GoalPriority.LOW);

    goal1.start();
    goal2.achieve();

    engine.addGoal(goal1);
    engine.addGoal(goal2);
    engine.addGoal(goal3);

    const stats = engine.getStatistics();

    expect(stats.totalGoals).toBe(3);
    expect(stats.inProgress).toBe(1);
    expect(stats.achieved).toBe(1);
    expect(stats.pending).toBe(1);
  });
});

describe('Performance Engine - محرك الأداء', () => {
  let engine: PerformanceEngine;

  beforeEach(() => {
    engine = new PerformanceEngine(100, 1000);
  });

  it('should cache values - التخزين المؤقت', () => {
    let callCount = 0;
    const expensiveFunction = () => {
      callCount++;
      return 42;
    };

    const result1 = engine.withCache('key1', expensiveFunction);
    const result2 = engine.withCache('key1', expensiveFunction);

    expect(result1).toBe(42);
    expect(result2).toBe(42);
    expect(callCount).toBe(1); // يجب أن تُستدعى مرة واحدة فقط
  });

  it('should benchmark functions - قياس الأداء', () => {
    const result = engine.withBenchmark('test', () => {
      let sum = 0;
      for (let i = 0; i < 1000; i++) {
        sum += i;
      }
      return sum;
    });

    expect(result).toBe(499500);

    const stats = engine.benchmark.getStatistics('test');
    expect(stats).toBeDefined();
    expect(stats!.count).toBe(1);
    expect(stats!.average).toBeGreaterThan(0);
  });

  it('should use index for fast lookup - استخدام الفهرس للبحث السريع', () => {
    const items = [
      { id: 1, name: 'أحمد', age: 25 },
      { id: 2, name: 'محمد', age: 30 },
      { id: 3, name: 'علي', age: 25 }
    ];

    engine.index.createIndex('age');

    for (const item of items) {
      engine.index.add(item, 'age', item.age);
    }

    const age25 = engine.index.find('age', 25);

    expect(age25.length).toBe(2);
    expect(age25[0].age).toBe(25);
  });

  it('should handle cache expiration - انتهاء صلاحية التخزين المؤقت', (done) => {
    const cache = new Cache<number>(100, 100); // TTL = 100ms

    cache.set('key1', 42);
    expect(cache.get('key1')).toBe(42);

    setTimeout(() => {
      expect(cache.get('key1')).toBeUndefined();
      done();
    }, 150);
  });

  it('should get overall statistics - الحصول على الإحصائيات الشاملة', () => {
    engine.withCache('key1', () => 1);
    engine.withCache('key2', () => 2);
    engine.withBenchmark('test1', () => 42);

    const stats = engine.getOverallStatistics();

    expect(stats.cache).toBeDefined();
    expect(stats.cache.size).toBe(2);
    expect(stats.benchmarks.size).toBeGreaterThan(0);
  });
});

