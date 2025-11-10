/**
 * اختبارات نظام التعلم - Learning System Tests
 */

import {
  LearningEngine,
  LearningType,
  LearningOutcome,
  PatternRecognitionEngine,
  PatternCategory,
  AdaptiveLearningSystem,
  ImprovementStrategy,
  FinalLearningManager,
  LearningRequest
} from '../../src/baserah/learning';

describe('Learning System', () => {
  // ============================================================================
  // Learning Engine Tests
  // ============================================================================

  describe('LearningEngine', () => {
    let engine: LearningEngine;

    beforeEach(() => {
      engine = new LearningEngine({
        maxExperiences: 100,
        learningRate: 0.1,
        confidenceThreshold: 0.6
      });
    });

    test('should create learning engine', () => {
      expect(engine).toBeDefined();
    });

    test('should add learning pattern', () => {
      const pattern = engine.addPattern(
        'pattern1',
        'pattern_recognition',
        'Test pattern',
        { key: 'value' },
        { action: 'test' }
      );

      expect(pattern).toBeDefined();
      expect(pattern.patternId).toBe('pattern1');
      expect(pattern.patternType).toBe('pattern_recognition');
      expect(pattern.confidence).toBe(0.5);
    });

    test('should get pattern by id', () => {
      engine.addPattern(
        'pattern1',
        'response_optimization',
        'Test pattern',
        {},
        {}
      );

      const pattern = engine.getPattern('pattern1');
      expect(pattern).toBeDefined();
      expect(pattern?.patternId).toBe('pattern1');
    });

    test('should find matching patterns', () => {
      engine.addPattern(
        'pattern1',
        'context_learning',
        'Test pattern',
        { temperature: 25 },
        {}
      );

      const matches = engine.findMatchingPatterns({ temperature: 25 });
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].patternId).toBe('pattern1');
    });

    test('should record experience', () => {
      const experience = engine.recordExperience(
        { context: 'test' },
        'action1',
        'success',
        'Good result',
        []
      );

      expect(experience).toBeDefined();
      expect(experience.outcome).toBe('success');
      expect(experience.feedback).toBe('Good result');
    });

    test('should learn from positive feedback', () => {
      const pattern = engine.learnFromFeedback(
        { userType: 'beginner' },
        'simple_explanation',
        'Very clear!',
        true
      );

      expect(pattern).toBeDefined();
      expect(pattern?.confidence).toBeGreaterThan(0.5);
    });

    test('should learn from negative feedback', () => {
      engine.addPattern(
        'pattern1',
        'response_optimization',
        'Test',
        { userType: 'beginner' },
        {}
      );

      const pattern = engine.learnFromFeedback(
        { userType: 'beginner' },
        'complex_explanation',
        'Too complicated',
        false
      );

      expect(pattern).toBeDefined();
    });

    test('should update pattern confidence on success', () => {
      const pattern = engine.addPattern(
        'pattern1',
        'user_preference',
        'Test',
        {},
        {}
      );

      const initialConfidence = pattern.confidence;

      engine.recordExperience(
        {},
        'action',
        'success',
        'Good',
        ['pattern1']
      );

      const updated = engine.getPattern('pattern1');
      expect(updated?.confidence).toBeGreaterThan(initialConfidence);
    });

    test('should update pattern confidence on failure', () => {
      const pattern = engine.addPattern(
        'pattern1',
        'error_correction',
        'Test',
        {},
        {}
      );

      const initialConfidence = pattern.confidence;

      engine.recordExperience(
        {},
        'action',
        'failure',
        'Bad',
        ['pattern1']
      );

      const updated = engine.getPattern('pattern1');
      expect(updated?.confidence).toBeLessThan(initialConfidence);
    });

    test('should get statistics', () => {
      engine.addPattern('p1', 'pattern_recognition', 'Test 1', {}, {});
      engine.addPattern('p2', 'response_optimization', 'Test 2', {}, {});
      engine.recordExperience({}, 'action', 'success', 'Good', []);

      const stats = engine.getStatistics();
      expect(stats.totalPatterns).toBe(2);
      expect(stats.totalExperiences).toBe(1);
      expect(stats.averageConfidence).toBeGreaterThan(0);
    });

    test('should clear all data', () => {
      engine.addPattern('p1', 'adaptive_behavior', 'Test', {}, {});
      engine.recordExperience({}, 'action', 'success', 'Good', []);

      engine.clear();

      const stats = engine.getStatistics();
      expect(stats.totalPatterns).toBe(0);
      expect(stats.totalExperiences).toBe(0);
    });
  });

  // ============================================================================
  // Pattern Recognition Tests
  // ============================================================================

  describe('PatternRecognitionEngine', () => {
    let engine: PatternRecognitionEngine;

    beforeEach(() => {
      engine = new PatternRecognitionEngine({
        minOccurrences: 2,
        minConfidence: 0.5,
        maxPatterns: 100
      });
    });

    test('should create pattern recognition engine', () => {
      expect(engine).toBeDefined();
    });

    test('should add pattern', () => {
      const pattern = engine.addPattern(
        'pattern1',
        'sequential',
        'Sequential pattern',
        { length: 5 }
      );

      expect(pattern).toBeDefined();
      expect(pattern.category).toBe('sequential');
    });

    test('should recognize sequential pattern', () => {
      const data = [1, 2, 3, 4, 5];
      const pattern = engine.recognizePattern(data, 'sequential');

      expect(pattern).toBeDefined();
      expect(pattern?.category).toBe('sequential');
    });

    test('should recognize frequency pattern', () => {
      const data = ['a', 'b', 'a', 'c', 'a', 'b'];
      const pattern = engine.recognizePattern(data, 'frequency');

      expect(pattern).toBeDefined();
      expect(pattern?.category).toBe('frequency');
    });

    test('should update existing pattern on recognition', () => {
      const data1 = [1, 2, 3];
      const pattern1 = engine.recognizePattern(data1);

      const data2 = [1, 2, 3];
      const pattern2 = engine.recognizePattern(data2);

      expect(pattern2?.occurrences).toBeGreaterThan(1);
    });

    test('should increase confidence on repeated recognition', () => {
      const data = [1, 2, 3, 4];
      const pattern1 = engine.recognizePattern(data);
      const initialConfidence = pattern1?.confidence || 0;

      const pattern2 = engine.recognizePattern(data);
      expect(pattern2?.confidence).toBeGreaterThan(initialConfidence);
    });

    test('should get statistics', () => {
      engine.addPattern('p1', 'sequential', 'Test 1', {});
      engine.addPattern('p2', 'frequency', 'Test 2', {});

      const stats = engine.getStatistics();
      expect(stats.totalPatterns).toBe(2);
      expect(stats.patternsByCategory.size).toBeGreaterThan(0);
    });

    test('should clear all patterns', () => {
      engine.addPattern('p1', 'correlation', 'Test', {});
      engine.clear();

      const stats = engine.getStatistics();
      expect(stats.totalPatterns).toBe(0);
    });
  });

  // ============================================================================
  // Adaptive Learning Tests
  // ============================================================================

  describe('AdaptiveLearningSystem', () => {
    let system: AdaptiveLearningSystem;

    beforeEach(() => {
      system = new AdaptiveLearningSystem({
        maxHistory: 100,
        adaptationRate: 0.15
      });
    });

    test('should create adaptive learning system', () => {
      expect(system).toBeDefined();
    });

    test('should add improvement rule', () => {
      const rule = system.addRule(
        'rule1',
        'Test Rule',
        'Test description',
        'expand',
        { maxLength: 100 },
        { addDetails: true },
        7
      );

      expect(rule).toBeDefined();
      expect(rule.strategy).toBe('expand');
      expect(rule.priority).toBe(7);
    });

    test('should improve short response', () => {
      const response = 'Short answer';
      const result = system.improveResponse(response, {});

      expect(result).toBeDefined();
      expect(result.improvedResponse).toBeDefined();
    });

    test('should apply expand strategy', () => {
      const response = 'Brief';
      const result = system.improveResponse(response, {});

      expect(result.appliedRules.length).toBeGreaterThan(0);
      expect(result.improvementLevel).toBeDefined();
    });

    test('should not improve good response', () => {
      const response = 'This is a well-detailed response that provides comprehensive information about the topic with clear explanations and examples.';
      const result = system.improveResponse(response, {});

      expect(result.originalResponse).toBe(response);
    });

    test('should record success', () => {
      const rule = system.addRule(
        'rule1',
        'Test',
        'Test',
        'simplify',
        {},
        {},
        5
      );

      const initialRate = rule.successRate;
      system.recordSuccess('rule1');

      const stats = system.getStatistics();
      expect(stats.averageSuccessRate).toBeGreaterThanOrEqual(initialRate);
    });

    test('should record failure', () => {
      const rule = system.addRule(
        'rule1',
        'Test',
        'Test',
        'add_examples',
        {},
        {},
        5
      );

      const initialRate = rule.successRate;
      system.recordFailure('rule1');

      const stats = system.getStatistics();
      expect(stats.averageSuccessRate).toBeLessThanOrEqual(initialRate);
    });

    test('should get statistics', () => {
      system.addRule('r1', 'Rule 1', 'Test', 'expand', {}, {}, 5);
      system.addRule('r2', 'Rule 2', 'Test', 'simplify', {}, {}, 6);

      const stats = system.getStatistics();
      expect(stats.totalRules).toBeGreaterThan(0);
      expect(stats.activeRules).toBeGreaterThan(0);
    });

    test('should clear history', () => {
      system.improveResponse('Test', {});
      system.clear();

      const stats = system.getStatistics();
      expect(stats.totalImprovements).toBe(0);
    });
  });

  // ============================================================================
  // Final Learning Manager Tests
  // ============================================================================

  describe('FinalLearningManager', () => {
    let manager: FinalLearningManager;

    beforeEach(() => {
      manager = new FinalLearningManager({
        maxExperiences: 100,
        maxPatterns: 100,
        maxHistory: 100,
        learningRate: 0.1
      });
    });

    test('should create final learning manager', () => {
      expect(manager).toBeDefined();
      expect(manager.isEnabled()).toBe(true);
    });

    test('should process pattern learning request', async () => {
      const request: LearningRequest = {
        requestId: 'req1',
        type: 'pattern',
        data: [1, 2, 3, 4, 5],
        context: { category: 'sequential' },
        priority: 5
      };

      const result = await manager.processLearningRequest(request);
      expect(result.success).toBe(true);
      expect(result.requestId).toBe('req1');
    });

    test('should process adaptive learning request', async () => {
      const request: LearningRequest = {
        requestId: 'req2',
        type: 'adaptive',
        data: { response: 'Short' },
        context: {},
        priority: 5
      };

      const result = await manager.processLearningRequest(request);
      expect(result.success).toBe(true);
    });

    test('should process feedback learning request', async () => {
      const request: LearningRequest = {
        requestId: 'req3',
        type: 'feedback',
        data: {
          action: 'explanation',
          feedback: 'Very clear!',
          isPositive: true
        },
        context: { userType: 'beginner' },
        priority: 8
      };

      const result = await manager.processLearningRequest(request);
      expect(result.success).toBe(true);
    });

    test('should process experience learning request', async () => {
      const request: LearningRequest = {
        requestId: 'req4',
        type: 'experience',
        data: {
          action: 'test_action',
          outcome: 'success',
          feedback: 'Good',
          patterns: []
        },
        context: {},
        priority: 5
      };

      const result = await manager.processLearningRequest(request);
      expect(result.success).toBe(true);
    });

    test('should learn from conversation', () => {
      const results = manager.learnFromConversation(
        'What is AI?',
        'AI is artificial intelligence...',
        'Great explanation!',
        true
      );

      expect(results.length).toBeGreaterThan(0);
    });

    test('should improve response with learning', () => {
      const improved = manager.improveResponseWithLearning(
        'Short answer',
        { userType: 'beginner' }
      );

      expect(improved).toBeDefined();
      expect(typeof improved).toBe('string');
    });

    test('should get comprehensive statistics', () => {
      const stats = manager.getComprehensiveStatistics();

      expect(stats).toBeDefined();
      expect(stats.learningEngine).toBeDefined();
      expect(stats.patternRecognition).toBeDefined();
      expect(stats.adaptiveLearning).toBeDefined();
      expect(stats.systemHealth).toBeGreaterThanOrEqual(0);
      expect(stats.systemHealth).toBeLessThanOrEqual(1);
    });

    test('should export learning data', () => {
      const exported = manager.exportLearning();

      expect(exported).toBeDefined();
      expect(exported.patterns).toBeDefined();
      expect(exported.statistics).toBeDefined();
    });

    test('should import learning data', () => {
      const success = manager.importLearning({
        patterns: [],
        experiences: [],
        rules: []
      });

      expect(success).toBe(true);
    });

    test('should reset learning system', () => {
      manager.learnFromConversation('Test', 'Response');
      manager.reset();

      const stats = manager.getComprehensiveStatistics();
      expect(stats.totalLearningEvents).toBe(0);
    });

    test('should enable/disable system', () => {
      manager.setEnabled(false);
      expect(manager.isEnabled()).toBe(false);

      manager.setEnabled(true);
      expect(manager.isEnabled()).toBe(true);
    });

    test('should reject requests when disabled', async () => {
      manager.setEnabled(false);

      const request: LearningRequest = {
        requestId: 'req1',
        type: 'pattern',
        data: [1, 2, 3],
        context: {},
        priority: 5
      };

      const result = await manager.processLearningRequest(request);
      expect(result.success).toBe(false);
    });
  });
});

