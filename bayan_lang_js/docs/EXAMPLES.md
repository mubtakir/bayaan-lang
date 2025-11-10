# 📚 أمثلة الاستخدام - Usage Examples

<div align="center">

# بصيرة AI - Baserah AI
## دليل شامل لأمثلة الاستخدام

</div>

---

## 📋 جدول المحتويات

1. [البدء السريع](#البدء-السريع)
2. [النظام الأساسي](#النظام-الأساسي)
3. [نظام الدماغ](#نظام-الدماغ)
4. [نظام التعلم](#نظام-التعلم)
5. [نظام قواعد البيانات](#نظام-قواعد-البيانات)
6. [نظام التكامل](#نظام-التكامل)
7. [أمثلة متقدمة](#أمثلة-متقدمة)

---

## 🚀 البدء السريع

### التثبيت

```bash
npm install baserah-ai
```

### الاستخدام الأساسي

```typescript
import { FinalBrainManager } from 'baserah-ai';

// إنشاء نظام الدماغ
const brain = new FinalBrainManager();

// معالجة معلومة
const result = await brain.processInformation({
  type: 'text',
  content: 'ما هو الذكاء الاصطناعي؟',
  priority: 5
});

console.log(result.processedData);
```

---

## 🧮 النظام الأساسي

### استخدام المعادلة الأم

```typescript
import { MotherEquation } from 'baserah-ai/core';

// إنشاء كيان جديد
class Person extends MotherEquation {
  constructor(name: string, age: number) {
    super(`person-${name}`);
    
    // الخصائص الثابتة
    this.staticProperties = {
      name: name,
      species: 'human'
    };
    
    // الخصائص الديناميكية
    this.dynamicProperties = {
      age: age,
      mood: 'neutral'
    };
  }
  
  // تحويل: زيادة العمر
  birthday(): void {
    this.dynamicProperties.age += 1;
    this.dynamicProperties.mood = 'happy';
  }
  
  // تحويل: تغيير المزاج
  changeMood(newMood: string): void {
    this.dynamicProperties.mood = newMood;
  }
}

// الاستخدام
const person = new Person('أحمد', 25);
console.log(person.getState()); // { age: 25, mood: 'neutral' }

person.birthday();
console.log(person.getState()); // { age: 26, mood: 'happy' }
```

### استخدام ثنائية الصفر

```typescript
import { ZeroDuality } from 'baserah-ai/core';

// إنشاء ثنائية جديدة
const emotionDuality = new ZeroDuality(
  'emotion-duality',
  { type: 'joy', intensity: 0.8 },      // القطب الموجب
  { type: 'sadness', intensity: 0.2 }   // القطب السالب
);

// الحصول على التوازن
const balance = emotionDuality.getBalance();
console.log(balance); // 0.6 (نحو الفرح)

// تحديث الأقطاب
emotionDuality.updatePoles(
  { type: 'joy', intensity: 0.5 },
  { type: 'sadness', intensity: 0.5 }
);

console.log(emotionDuality.getBalance()); // 0.0 (متوازن)
```

---

## 🧠 نظام الدماغ

### معالجة المعلومات

```typescript
import { FinalBrainManager } from 'baserah-ai/brain';

const brain = new FinalBrainManager();

// معالجة نص
const textResult = await brain.processInformation({
  type: 'text',
  content: 'الذكاء الاصطناعي يغير العالم',
  priority: 8
});

console.log(textResult.processedData);
console.log(textResult.insights);

// معالجة بيانات رقمية
const numericResult = await brain.processInformation({
  type: 'numeric',
  content: [1, 2, 3, 4, 5],
  priority: 5
});

console.log(numericResult.statistics);
```

### إدارة الذاكرة

```typescript
import { FinalBrainManager } from 'baserah-ai/brain';

const brain = new FinalBrainManager();

// تخزين في الذاكرة
brain.storeInMemory({
  id: 'memory-1',
  type: 'short_term',
  content: 'معلومة مهمة',
  importance: 8
});

// استرجاع من الذاكرة
const memory = brain.retrieveFromMemory('memory-1');
console.log(memory);

// البحث في الذاكرة
const results = brain.searchMemory('مهمة');
console.log(results);
```

### التفكير والتحليل

```typescript
import { FinalBrainManager } from 'baserah-ai/brain';

const brain = new FinalBrainManager();

// تفكير منطقي
const logicalResult = brain.think({
  type: 'logical',
  problem: 'إذا كان A > B و B > C، فما العلاقة بين A و C؟',
  context: {}
});

console.log(logicalResult.solution);

// تفكير إبداعي
const creativeResult = brain.think({
  type: 'creative',
  problem: 'اقترح أفكار جديدة لتطبيق ذكاء اصطناعي',
  context: { domain: 'education' }
});

console.log(creativeResult.ideas);
```

---

## 🎓 نظام التعلم

### التعلم من الحوارات

```typescript
import { FinalLearningManager } from 'baserah-ai/learning';

const learningManager = new FinalLearningManager();

// التعلم من حوار ناجح
const results = learningManager.learnFromConversation(
  'ما هو الذكاء الاصطناعي؟',
  'الذكاء الاصطناعي هو علم يهدف إلى إنشاء آلات ذكية...',
  'شرح ممتاز وواضح!',
  true  // تغذية راجعة إيجابية
);

console.log(results);

// التعلم من حوار يحتاج تحسين
learningManager.learnFromConversation(
  'اشرح لي الذكاء الاصطناعي',
  'AI هو ذكاء',
  'الشرح قصير جداً',
  false  // تغذية راجعة سلبية
);
```

### التعرف على الأنماط

```typescript
import { PatternRecognitionEngine } from 'baserah-ai/learning';

const patternEngine = new PatternRecognitionEngine();

// إضافة نمط
patternEngine.addPattern(
  'greeting-pattern',
  'sequential',
  'نمط التحية في الحوارات',
  {
    sequence: ['مرحبا', 'كيف حالك', 'أنا بخير'],
    language: 'arabic'
  }
);

// التعرف على نمط في بيانات جديدة
const data = {
  messages: ['مرحبا', 'كيف حالك', 'أنا بخير', 'شكراً']
};

const recognizedPattern = patternEngine.recognizePattern(data, 'sequential');

if (recognizedPattern) {
  console.log('تم التعرف على النمط:', recognizedPattern.description);
  console.log('الثقة:', recognizedPattern.confidence);
}
```

### التعلم التكيفي

```typescript
import { AdaptiveLearningSystem } from 'baserah-ai/learning';

const adaptiveSystem = new AdaptiveLearningSystem();

// إضافة قاعدة تحسين
adaptiveSystem.addRule(
  'expand-technical',
  'توسيع الإجابات التقنية',
  'يضيف أمثلة وتفاصيل للإجابات التقنية',
  'add_examples',
  { topic: 'technical', length: 'short' },
  { exampleCount: 3, detailLevel: 'high' },
  8
);

// تحسين إجابة
const response = 'AI هو ذكاء اصطناعي';
const context = { topic: 'technical', userLevel: 'beginner' };

const improved = adaptiveSystem.improveResponse(response, context);

console.log('الإجابة الأصلية:', response);
console.log('الإجابة المحسنة:', improved.improvedResponse);
console.log('الاستراتيجيات المطبقة:', improved.appliedStrategies);
```

### معالجة طلبات التعلم

```typescript
import { FinalLearningManager } from 'baserah-ai/learning';

const learningManager = new FinalLearningManager();

// طلب تعلم نمط
const patternRequest = {
  requestId: 'req-1',
  type: 'pattern' as const,
  data: {
    patternId: 'user-behavior-1',
    category: 'frequency',
    description: 'سلوك المستخدم المتكرر',
    features: { action: 'search', frequency: 10 }
  },
  context: { userId: 'user-123' },
  priority: 7
};

const result = await learningManager.processLearningRequest(patternRequest);
console.log(result);

// طلب تحسين تكيفي
const adaptiveRequest = {
  requestId: 'req-2',
  type: 'adaptive' as const,
  data: {
    response: 'إجابة قصيرة',
    context: { userType: 'expert' }
  },
  context: {},
  priority: 5
};

const adaptiveResult = await learningManager.processLearningRequest(adaptiveRequest);
console.log(adaptiveResult);
```

---

## 💾 نظام قواعد البيانات

### إدارة قواعد البيانات

```typescript
import { DatabaseManager } from 'baserah-ai/databases';

const dbManager = new DatabaseManager();

// تسجيل قاعدة بيانات
dbManager.registerDatabase({
  name: 'knowledge_db',
  type: 'semantic',
  path: '/data/knowledge.db',
  maxConnections: 10,
  cacheSize: 1000,
  autoVacuum: true
});

// الاتصال بقاعدة البيانات
const connection = dbManager.connect('knowledge_db');

if (connection) {
  console.log('متصل بقاعدة البيانات:', connection.database);
}

// الحصول على معلومات قاعدة البيانات
const info = dbManager.getDatabaseInfo('knowledge_db');
console.log(info);
```

### تنفيذ الاستعلامات

```typescript
import { DatabaseManager } from 'baserah-ai/databases';

const dbManager = new DatabaseManager();

// استعلام SELECT
const selectResult = dbManager.executeQuery({
  id: 'query-1',
  database: 'knowledge_db',
  type: 'select',
  query: 'SELECT * FROM concepts WHERE category = "AI"',
  priority: 5
});

console.log('النتائج:', selectResult.data);
console.log('عدد الصفوف:', selectResult.rowsAffected);

// استعلام INSERT
const insertResult = dbManager.executeQuery({
  id: 'query-2',
  database: 'knowledge_db',
  type: 'insert',
  query: 'INSERT INTO concepts (name, category) VALUES ("ML", "AI")',
  priority: 7
});

console.log('تم الإدراج:', insertResult.success);

// استعلام UPDATE
const updateResult = dbManager.executeQuery({
  id: 'query-3',
  database: 'knowledge_db',
  type: 'update',
  query: 'UPDATE concepts SET importance = 10 WHERE name = "ML"',
  priority: 6
});

console.log('الصفوف المحدثة:', updateResult.rowsAffected);
```

### محرك الاستعلامات المتقدم

```typescript
import { QueryEngine } from 'baserah-ai/databases';

const queryEngine = new QueryEngine();

// إنشاء خطة استعلام
const plan = queryEngine.createQueryPlan(
  'SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.age > 25'
);

console.log('خطة الاستعلام:', plan);
console.log('التكلفة المقدرة:', plan.estimatedCost);

// تحسين استعلام
const optimization = queryEngine.optimizeQuery(
  'SELECT * FROM large_table WHERE column1 = "value" AND column2 = "value"'
);

console.log('الاستعلام الأصلي:', optimization.originalQuery);
console.log('الاستعلام المحسن:', optimization.optimizedQuery);
console.log('مستوى التحسين:', optimization.optimizationLevel);
console.log('التحسينات المطبقة:', optimization.improvements);

// تنفيذ JOIN
const joinResult = queryEngine.executeJoin({
  id: 'join-1',
  leftTable: 'users',
  rightTable: 'orders',
  joinType: 'inner',
  condition: 'users.id = orders.user_id',
  priority: 7
});

console.log('نتائج JOIN:', joinResult.data);
```

---

## 🔗 نظام التكامل

### تنسيق الأنظمة

```typescript
import { FinalIntegrationManager } from 'baserah-ai/integration';

const integrationManager = new FinalIntegrationManager();

// تسجيل الأنظمة
integrationManager.registerSystem({
  id: 'brain-system',
  name: 'Brain System',
  type: 'core',
  capabilities: ['processing', 'thinking', 'memory'],
  priority: 10,
  enabled: true
});

integrationManager.registerSystem({
  id: 'learning-system',
  name: 'Learning System',
  type: 'advanced',
  capabilities: ['pattern_recognition', 'adaptive_learning'],
  priority: 8,
  enabled: true
});

// تنفيذ سير عمل متكامل
const workflow = {
  id: 'workflow-1',
  name: 'معالجة وتعلم',
  steps: [
    {
      id: 'step-1',
      system: 'brain-system',
      action: 'process',
      input: { text: 'معلومة جديدة' },
      dependencies: []
    },
    {
      id: 'step-2',
      system: 'learning-system',
      action: 'learn',
      input: { pattern: 'new-pattern' },
      dependencies: ['step-1']
    }
  ],
  priority: 7
};

const result = await integrationManager.executeWorkflow(workflow);
console.log('نتيجة سير العمل:', result);
```

### إنشاء خطة تكامل

```typescript
import { FinalIntegrationManager } from 'baserah-ai/integration';

const integrationManager = new FinalIntegrationManager();

// إنشاء خطة تكامل
const plan = integrationManager.createIntegrationPlan({
  id: 'plan-1',
  goal: 'معالجة وتحليل وتعلم',
  requiredCapabilities: ['processing', 'analysis', 'learning'],
  constraints: { maxTime: 5000, maxSystems: 3 },
  priority: 8
});

console.log('خطة التكامل:', plan);
console.log('الأنظمة المشاركة:', plan.systems);
console.log('الخطوات:', plan.steps);

// تنفيذ الخطة
const executionResult = await integrationManager.executePlan(plan);
console.log('نتيجة التنفيذ:', executionResult);
```

---

## 🚀 أمثلة متقدمة

### مثال 1: نظام ذكاء اصطناعي متكامل

```typescript
import {
  FinalBrainManager,
  FinalLearningManager,
  FinalIntegrationManager,
  DatabaseManager
} from 'baserah-ai';

class IntelligentAssistant {
  private brain: FinalBrainManager;
  private learning: FinalLearningManager;
  private integration: FinalIntegrationManager;
  private database: DatabaseManager;
  
  constructor() {
    this.brain = new FinalBrainManager();
    this.learning = new FinalLearningManager();
    this.integration = new FinalIntegrationManager();
    this.database = new DatabaseManager();
    
    this.setupDatabase();
  }
  
  private setupDatabase(): void {
    this.database.registerDatabase({
      name: 'conversations_db',
      type: 'relational',
      path: '/data/conversations.db',
      maxConnections: 5,
      cacheSize: 500,
      autoVacuum: true
    });
  }
  
  async processUserQuery(query: string): Promise<string> {
    // 1. معالجة الاستعلام بالدماغ
    const brainResult = await this.brain.processInformation({
      type: 'text',
      content: query,
      priority: 8
    });
    
    // 2. توليد الإجابة
    const response = brainResult.processedData.summary;
    
    // 3. تحسين الإجابة بالتعلم
    const improvedResponse = this.learning.improveResponseWithLearning(
      response,
      { userQuery: query }
    );
    
    // 4. حفظ في قاعدة البيانات
    this.database.executeQuery({
      id: `query-${Date.now()}`,
      database: 'conversations_db',
      type: 'insert',
      query: `INSERT INTO conversations (query, response, timestamp) 
              VALUES ("${query}", "${improvedResponse}", ${Date.now()})`,
      priority: 5
    });
    
    return improvedResponse;
  }
  
  async learnFromFeedback(
    query: string,
    response: string,
    feedback: string,
    isPositive: boolean
  ): Promise<void> {
    // التعلم من التغذية الراجعة
    this.learning.learnFromConversation(
      query,
      response,
      feedback,
      isPositive
    );
    
    // تحديث قاعدة البيانات
    this.database.executeQuery({
      id: `feedback-${Date.now()}`,
      database: 'conversations_db',
      type: 'update',
      query: `UPDATE conversations 
              SET feedback = "${feedback}", is_positive = ${isPositive}
              WHERE query = "${query}"`,
      priority: 6
    });
  }
  
  getStatistics() {
    return {
      brain: this.brain.getStatistics(),
      learning: this.learning.getComprehensiveStatistics(),
      database: this.database.getStatistics()
    };
  }
}

// الاستخدام
const assistant = new IntelligentAssistant();

// معالجة استعلام
const response = await assistant.processUserQuery('ما هو التعلم الآلي؟');
console.log('الإجابة:', response);

// التعلم من التغذية الراجعة
await assistant.learnFromFeedback(
  'ما هو التعلم الآلي؟',
  response,
  'إجابة ممتازة وشاملة!',
  true
);

// الحصول على الإحصائيات
const stats = assistant.getStatistics();
console.log('الإحصائيات:', stats);
```

### مثال 2: نظام تحليل المشاعر

```typescript
import {
  FinalBrainManager,
  FinalEmotionalManager,
  PatternRecognitionEngine
} from 'baserah-ai';

class SentimentAnalyzer {
  private brain: FinalBrainManager;
  private emotional: FinalEmotionalManager;
  private patterns: PatternRecognitionEngine;
  
  constructor() {
    this.brain = new FinalBrainManager();
    this.emotional = new FinalEmotionalManager();
    this.patterns = new PatternRecognitionEngine();
    
    this.setupPatterns();
  }
  
  private setupPatterns(): void {
    // إضافة أنماط المشاعر الإيجابية
    this.patterns.addPattern(
      'positive-pattern',
      'frequency',
      'كلمات إيجابية متكررة',
      {
        keywords: ['ممتاز', 'رائع', 'جميل', 'مفيد'],
        sentiment: 'positive'
      }
    );
    
    // إضافة أنماط المشاعر السلبية
    this.patterns.addPattern(
      'negative-pattern',
      'frequency',
      'كلمات سلبية متكررة',
      {
        keywords: ['سيء', 'ضعيف', 'غير مفيد'],
        sentiment: 'negative'
      }
    );
  }
  
  async analyzeSentiment(text: string) {
    // 1. معالجة النص
    const brainResult = await this.brain.processInformation({
      type: 'text',
      content: text,
      priority: 7
    });
    
    // 2. تحليل المشاعر
    const emotionResult = this.emotional.analyzeEmotion({
      id: `emotion-${Date.now()}`,
      text: text,
      context: {},
      priority: 7
    });
    
    // 3. التعرف على الأنماط
    const pattern = this.patterns.recognizePattern(
      { text: text },
      'frequency'
    );
    
    return {
      text: text,
      sentiment: emotionResult.emotion,
      intensity: emotionResult.intensity,
      pattern: pattern?.description,
      confidence: pattern?.confidence || 0
    };
  }
}

// الاستخدام
const analyzer = new SentimentAnalyzer();

const result1 = await analyzer.analyzeSentiment('هذا المنتج ممتاز ورائع جداً!');
console.log(result1);
// { sentiment: 'joy', intensity: 0.9, pattern: 'كلمات إيجابية متكررة', confidence: 0.95 }

const result2 = await analyzer.analyzeSentiment('المنتج سيء وغير مفيد');
console.log(result2);
// { sentiment: 'sadness', intensity: 0.8, pattern: 'كلمات سلبية متكررة', confidence: 0.9 }
```

---

<div align="center">

**لمزيد من الأمثلة، راجع التوثيق الكامل في [ARCHITECTURE.md](ARCHITECTURE.md)**

**نحن متحمسون لرؤية ما ستبنيه باستخدام بصيرة AI! 🚀**

</div>

