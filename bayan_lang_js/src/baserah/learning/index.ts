/**
 * نظام التعلم - Learning System
 * نظام تعلم ذكي متكامل يجمع التعلم من الأنماط والتكيف والتغذية الراجعة
 */

// Learning Engine
export {
  LearningEngine,
  LearningType,
  ConfidenceLevel,
  LearningOutcome,
  LearningPattern,
  LearningExperience,
  LearningStatistics
} from './learningEngine';

// Pattern Recognition
export {
  PatternRecognitionEngine,
  PatternCategory,
  RecognizedPattern,
  PatternMatch,
  PatternStatistics
} from './patternRecognition';

// Adaptive Learning
export {
  AdaptiveLearningSystem,
  ImprovementStrategy,
  ImprovementLevel,
  ImprovementRule,
  AdaptiveResponse,
  PerformanceMetrics,
  AdaptiveStatistics
} from './adaptiveLearning';

// Final Learning Manager
export {
  FinalLearningManager,
  LearningRequest,
  LearningResult,
  ComprehensiveLearningStats
} from './finalLearningManager';

