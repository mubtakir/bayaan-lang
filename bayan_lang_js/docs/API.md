# 📖 توثيق API - API Documentation

<div align="center">

# بصيرة AI - Baserah AI
## دليل شامل لواجهات البرمجة

</div>

---

## 📋 جدول المحتويات

1. [النظام الأساسي](#النظام-الأساسي)
2. [نظام الدماغ](#نظام-الدماغ)
3. [نظام التعلم](#نظام-التعلم)
4. [نظام قواعد البيانات](#نظام-قواعد-البيانات)
5. [نظام التكامل](#نظام-التكامل)

---

## 🧮 النظام الأساسي

### MotherEquation

المعادلة الأم - الأساس الرياضي لجميع الكيانات.

#### Constructor

```typescript
constructor(id: string)
```

**المعاملات:**
- `id`: المعرف الفريد للكيان

#### Properties

```typescript
id: string                              // المعرف الفريد
staticProperties: Record<string, any>   // الخصائص الثابتة (Φ)
dynamicProperties: Record<string, any>  // الخصائص الديناميكية (Ψ)
transformations: Map<string, Function>  // التحويلات (Γ)
```

#### Methods

##### `getState(): Record<string, any>`

الحصول على الحالة الحالية للكيان.

**القيمة المرجعة:**
- كائن يحتوي على جميع الخصائص الديناميكية

**مثال:**
```typescript
const entity = new MotherEquation('entity-1');
entity.dynamicProperties = { status: 'active', count: 5 };
const state = entity.getState();
// { status: 'active', count: 5 }
```

##### `transform(transformationName: string, ...args: any[]): any`

تطبيق تحويل على الكيان.

**المعاملات:**
- `transformationName`: اسم التحويل
- `args`: معاملات التحويل

**القيمة المرجعة:**
- نتيجة التحويل

**مثال:**
```typescript
entity.transformations.set('increment', (value: number) => value + 1);
const result = entity.transform('increment', 5);
// 6
```

---

### ZeroDuality

ثنائية الصفر - تمثيل التوازن بين المتناقضات.

#### Constructor

```typescript
constructor(
  id: string,
  positivePole: Record<string, any>,
  negativePole: Record<string, any>
)
```

**المعاملات:**
- `id`: المعرف الفريد
- `positivePole`: القطب الموجب
- `negativePole`: القطب السالب

#### Methods

##### `getBalance(): number`

حساب التوازن بين القطبين.

**القيمة المرجعة:**
- رقم بين -1 و 1 يمثل التوازن

**مثال:**
```typescript
const duality = new ZeroDuality(
  'emotion',
  { intensity: 0.8 },
  { intensity: 0.2 }
);
const balance = duality.getBalance();
// 0.6
```

##### `updatePoles(positive: Record<string, any>, negative: Record<string, any>): void`

تحديث قيم الأقطاب.

**المعاملات:**
- `positive`: القيم الجديدة للقطب الموجب
- `negative`: القيم الجديدة للقطب السالب

---

## 🧠 نظام الدماغ

### FinalBrainManager

المدير النهائي لنظام الدماغ - يوحد جميع وظائف الدماغ.

#### Constructor

```typescript
constructor()
```

#### Methods

##### `processInformation(request: InformationRequest): Promise<ProcessingResult>`

معالجة المعلومات.

**المعاملات:**
```typescript
interface InformationRequest {
  type: 'text' | 'numeric' | 'image' | 'audio' | 'video';
  content: any;
  priority: number;
}
```

**القيمة المرجعة:**
```typescript
interface ProcessingResult {
  success: boolean;
  processedData: any;
  insights: string[];
  confidence: number;
  processingTime: number;
}
```

**مثال:**
```typescript
const brain = new FinalBrainManager();
const result = await brain.processInformation({
  type: 'text',
  content: 'نص للمعالجة',
  priority: 7
});
```

##### `storeInMemory(item: MemoryItem): boolean`

تخزين عنصر في الذاكرة.

**المعاملات:**
```typescript
interface MemoryItem {
  id: string;
  type: 'short_term' | 'long_term' | 'working';
  content: any;
  importance: number;
}
```

**القيمة المرجعة:**
- `true` إذا تم التخزين بنجاح

##### `retrieveFromMemory(id: string): MemoryItem | null`

استرجاع عنصر من الذاكرة.

**المعاملات:**
- `id`: معرف العنصر

**القيمة المرجعة:**
- العنصر المسترجع أو `null`

##### `think(problem: ThinkingProblem): ThinkingResult`

التفكير في مشكلة.

**المعاملات:**
```typescript
interface ThinkingProblem {
  type: 'logical' | 'creative' | 'analytical';
  problem: string;
  context: Record<string, any>;
}
```

**القيمة المرجعة:**
```typescript
interface ThinkingResult {
  solution: string;
  steps: string[];
  confidence: number;
  alternatives: string[];
}
```

##### `getStatistics(): BrainStatistics`

الحصول على إحصائيات النظام.

**القيمة المرجعة:**
```typescript
interface BrainStatistics {
  totalProcessed: number;
  memoryUsage: number;
  thinkingOperations: number;
  averageProcessingTime: number;
}
```

---

## 🎓 نظام التعلم

### FinalLearningManager

المدير النهائي لنظام التعلم.

#### Constructor

```typescript
constructor()
```

#### Methods

##### `processLearningRequest(request: LearningRequest): Promise<LearningResult>`

معالجة طلب تعلم.

**المعاملات:**
```typescript
interface LearningRequest {
  requestId: string;
  type: 'pattern' | 'adaptive' | 'feedback' | 'experience';
  data: any;
  context: Record<string, any>;
  priority: number;
}
```

**القيمة المرجعة:**
```typescript
interface LearningResult {
  success: boolean;
  learnedData: any;
  confidence: number;
  improvements: string[];
}
```

##### `learnFromConversation(userMessage: string, aiResponse: string, userFeedback?: string, isPositive?: boolean): LearningResult[]`

التعلم من حوار.

**المعاملات:**
- `userMessage`: رسالة المستخدم
- `aiResponse`: إجابة الذكاء الاصطناعي
- `userFeedback`: (اختياري) تغذية راجعة من المستخدم
- `isPositive`: (اختياري) هل التغذية الراجعة إيجابية

**القيمة المرجعة:**
- مصفوفة من نتائج التعلم

**مثال:**
```typescript
const learningManager = new FinalLearningManager();
const results = learningManager.learnFromConversation(
  'ما هو AI؟',
  'AI هو ذكاء اصطناعي...',
  'شرح ممتاز',
  true
);
```

##### `improveResponseWithLearning(response: string, context: Record<string, any>): string`

تحسين إجابة باستخدام التعلم.

**المعاملات:**
- `response`: الإجابة الأصلية
- `context`: سياق الإجابة

**القيمة المرجعة:**
- الإجابة المحسنة

##### `getComprehensiveStatistics(): ComprehensiveLearningStats`

الحصول على إحصائيات شاملة.

**القيمة المرجعة:**
```typescript
interface ComprehensiveLearningStats {
  learningEngine: LearningStatistics;
  patternRecognition: PatternStatistics;
  adaptiveLearning: AdaptiveStatistics;
  totalLearningEvents: number;
  overallSuccessRate: number;
  systemHealth: number;
}
```

##### `exportLearning(): object`

تصدير بيانات التعلم.

**القيمة المرجعة:**
- كائن يحتوي على جميع بيانات التعلم

##### `importLearning(data: object): boolean`

استيراد بيانات التعلم.

**المعاملات:**
- `data`: البيانات المراد استيرادها

**القيمة المرجعة:**
- `true` إذا تم الاستيراد بنجاح

---

### LearningEngine

محرك التعلم الأساسي.

#### Methods

##### `addPattern(patternId: string, patternType: LearningType, description: string, conditions: Record<string, any>, actions: Record<string, any>): LearningPattern`

إضافة نمط تعلم جديد.

**المعاملات:**
- `patternId`: معرف النمط
- `patternType`: نوع التعلم
- `description`: وصف النمط
- `conditions`: شروط النمط
- `actions`: إجراءات النمط

**أنواع التعلم:**
```typescript
type LearningType = 
  | 'pattern_recognition'
  | 'response_optimization'
  | 'context_learning'
  | 'user_preference'
  | 'error_correction'
  | 'adaptive_behavior'
  | 'knowledge_acquisition';
```

##### `findMatchingPatterns(context: Record<string, any>, patternType?: LearningType): LearningPattern[]`

البحث عن أنماط مطابقة.

**المعاملات:**
- `context`: السياق للبحث
- `patternType`: (اختياري) نوع النمط

**القيمة المرجعة:**
- مصفوفة من الأنماط المطابقة

##### `learnFromFeedback(context: Record<string, any>, action: Record<string, any>, feedback: string, isPositive: boolean): LearningPattern | null`

التعلم من التغذية الراجعة.

**المعاملات:**
- `context`: السياق
- `action`: الإجراء المنفذ
- `feedback`: التغذية الراجعة
- `isPositive`: هل التغذية إيجابية

**القيمة المرجعة:**
- النمط المتعلم أو `null`

---

### PatternRecognitionEngine

محرك التعرف على الأنماط.

#### Methods

##### `addPattern(patternId: string, category: PatternCategory, description: string, features: Record<string, any>): RecognizedPattern`

إضافة نمط جديد.

**فئات الأنماط:**
```typescript
type PatternCategory = 
  | 'sequential'
  | 'frequency'
  | 'correlation'
  | 'anomaly'
  | 'temporal';
```

##### `recognizePattern(data: any, category?: PatternCategory): RecognizedPattern | null`

التعرف على نمط في البيانات.

**المعاملات:**
- `data`: البيانات للتحليل
- `category`: (اختياري) فئة النمط

**القيمة المرجعة:**
- النمط المتعرف عليه أو `null`

##### `extractFeatures(data: any): Record<string, any>`

استخراج الميزات من البيانات.

**المعاملات:**
- `data`: البيانات

**القيمة المرجعة:**
- كائن يحتوي على الميزات المستخرجة

---

### AdaptiveLearningSystem

نظام التعلم التكيفي.

#### Methods

##### `addRule(ruleId: string, name: string, description: string, strategy: ImprovementStrategy, conditions: Record<string, any>, transformations: Record<string, any>, priority: number): ImprovementRule`

إضافة قاعدة تحسين.

**استراتيجيات التحسين:**
```typescript
type ImprovementStrategy = 
  | 'expand'
  | 'simplify'
  | 'add_examples'
  | 'restructure'
  | 'change_style'
  | 'add_context'
  | 'enhance_clarity';
```

##### `improveResponse(response: string, context: Record<string, any>, performanceMetrics?: PerformanceMetrics): AdaptiveResponse`

تحسين إجابة.

**المعاملات:**
- `response`: الإجابة الأصلية
- `context`: السياق
- `performanceMetrics`: (اختياري) مقاييس الأداء

**القيمة المرجعة:**
```typescript
interface AdaptiveResponse {
  originalResponse: string;
  improvedResponse: string;
  appliedStrategies: ImprovementStrategy[];
  improvementLevel: 'minor' | 'moderate' | 'major' | 'complete_rewrite';
  confidence: number;
}
```

---

## 💾 نظام قواعد البيانات

### DatabaseManager

مدير قواعد البيانات.

#### Methods

##### `registerDatabase(config: DatabaseConfig): boolean`

تسجيل قاعدة بيانات جديدة.

**المعاملات:**
```typescript
interface DatabaseConfig {
  name: string;
  type: DatabaseType;
  path: string;
  maxConnections: number;
  cacheSize: number;
  autoVacuum: boolean;
}

type DatabaseType = 
  | 'relational'
  | 'document'
  | 'graph'
  | 'key_value'
  | 'time_series'
  | 'semantic'
  | 'vector'
  | 'columnar'
  | 'object'
  | 'spatial'
  | 'in_memory'
  | 'distributed'
  | 'multi_model';
```

##### `connect(databaseName: string): DatabaseConnection | null`

الاتصال بقاعدة بيانات.

**المعاملات:**
- `databaseName`: اسم قاعدة البيانات

**القيمة المرجعة:**
```typescript
interface DatabaseConnection {
  id: string;
  database: string;
  connectedAt: number;
  isActive: boolean;
}
```

##### `executeQuery(request: QueryRequest): QueryResult`

تنفيذ استعلام.

**المعاملات:**
```typescript
interface QueryRequest {
  id: string;
  database: string;
  type: QueryType;
  query: string;
  priority: number;
}

type QueryType = 'select' | 'insert' | 'update' | 'delete' | 'create';
```

**القيمة المرجعة:**
```typescript
interface QueryResult {
  success: boolean;
  data: any[];
  rowsAffected: number;
  executionTime: number;
  error?: string;
}
```

##### `searchAcrossDatabases(query: string): Map<string, QueryResult>`

البحث عبر جميع قواعد البيانات.

**المعاملات:**
- `query`: استعلام البحث

**القيمة المرجعة:**
- خريطة من اسم قاعدة البيانات إلى النتائج

---

### QueryEngine

محرك الاستعلامات المتقدم.

#### Methods

##### `createQueryPlan(query: string): QueryPlan`

إنشاء خطة استعلام.

**المعاملات:**
- `query`: الاستعلام

**القيمة المرجعة:**
```typescript
interface QueryPlan {
  id: string;
  query: string;
  steps: QueryStep[];
  estimatedCost: number;
  estimatedTime: number;
}
```

##### `optimizeQuery(query: string): QueryOptimization`

تحسين استعلام.

**المعاملات:**
- `query`: الاستعلام الأصلي

**القيمة المرجعة:**
```typescript
interface QueryOptimization {
  originalQuery: string;
  optimizedQuery: string;
  optimizationLevel: 'none' | 'basic' | 'moderate' | 'aggressive';
  improvements: string[];
  estimatedSpeedup: number;
}
```

##### `executeJoin(joinQuery: JoinQuery): JoinResult`

تنفيذ عملية JOIN.

**المعاملات:**
```typescript
interface JoinQuery {
  id: string;
  leftTable: string;
  rightTable: string;
  joinType: 'inner' | 'left' | 'right' | 'full' | 'cross';
  condition: string;
  priority: number;
}
```

---

## 🔗 نظام التكامل

### FinalIntegrationManager

المدير النهائي للتكامل.

#### Methods

##### `registerSystem(system: SystemInfo): boolean`

تسجيل نظام.

**المعاملات:**
```typescript
interface SystemInfo {
  id: string;
  name: string;
  type: 'core' | 'advanced' | 'utility';
  capabilities: string[];
  priority: number;
  enabled: boolean;
}
```

##### `executeWorkflow(workflow: Workflow): Promise<WorkflowResult>`

تنفيذ سير عمل.

**المعاملات:**
```typescript
interface Workflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  priority: number;
}

interface WorkflowStep {
  id: string;
  system: string;
  action: string;
  input: any;
  dependencies: string[];
}
```

**القيمة المرجعة:**
```typescript
interface WorkflowResult {
  success: boolean;
  completedSteps: number;
  results: Map<string, any>;
  executionTime: number;
}
```

##### `createIntegrationPlan(request: IntegrationRequest): IntegrationPlan`

إنشاء خطة تكامل.

**المعاملات:**
```typescript
interface IntegrationRequest {
  id: string;
  goal: string;
  requiredCapabilities: string[];
  constraints: Record<string, any>;
  priority: number;
}
```

**القيمة المرجعة:**
```typescript
interface IntegrationPlan {
  id: string;
  goal: string;
  systems: string[];
  steps: IntegrationStep[];
  estimatedTime: number;
}
```

---

<div align="center">

**للمزيد من التفاصيل، راجع [EXAMPLES.md](EXAMPLES.md) و [ARCHITECTURE.md](ARCHITECTURE.md)**

</div>

