/**
 * محرك الاستدلال الموحد - Unified Inference Engine
 * 
 * يجمع جميع أنواع الاستدلال في محرك واحد:
 * - الاستدلال المنطقي (Logic)
 * - الاستدلال السببي (Causal)
 * - الاستدلال اللغوي (Linguistic)
 * - الاستدلال المعرفي (Knowledge)
 */

import { LogicEngine } from '../../logic/logicEngine';
import { CausalEngine } from '../../logic/causalEngine';
import { LetterEngine } from '../linguistics/letterEngine';
import { InferenceEngine, Inference } from '../knowledge/inferenceEngine';
import { ThingEngine } from '../knowledge/thingEngine';
import { EventEngine } from '../knowledge/eventEngine';
import { EquationEngine } from '../knowledge/equationEngine';

/**
 * نوع الاستدلال المطلوب
 * Type of inference requested
 */
export enum QueryType {
  LOGIC = 'logic',           // استدلال منطقي
  CAUSAL = 'causal',         // استدلال سببي
  LINGUISTIC = 'linguistic', // استدلال لغوي
  KNOWLEDGE = 'knowledge',   // استدلال معرفي
  ALL = 'all'                // جميع الأنواع
}

/**
 * نتيجة الاستدلال الموحد
 * Unified inference result
 */
export class UnifiedInferenceResult {
  constructor(
    public queryType: QueryType,
    public question: string,
    public logicResults: any[] = [],
    public causalResults: any[] = [],
    public linguisticResults: any[] = [],
    public knowledgeResults: Inference[] = [],
    public confidence: number = 0,
    public explanation: string = ''
  ) {}

  /**
   * هل هناك نتائج؟
   * Are there any results?
   */
  hasResults(): boolean {
    return this.logicResults.length > 0 ||
           this.causalResults.length > 0 ||
           this.linguisticResults.length > 0 ||
           this.knowledgeResults.length > 0;
  }

  /**
   * عدد النتائج الكلي
   * Total number of results
   */
  totalResults(): number {
    return this.logicResults.length +
           this.causalResults.length +
           this.linguisticResults.length +
           this.knowledgeResults.length;
  }

  toString(): string {
    let result = `\n=== نتيجة الاستدلال الموحد ===\n`;
    result += `السؤال: ${this.question}\n`;
    result += `نوع الاستدلال: ${this.queryType}\n`;
    result += `درجة الثقة: ${(this.confidence * 100).toFixed(1)}%\n\n`;

    if (this.logicResults.length > 0) {
      result += `--- النتائج المنطقية (${this.logicResults.length}) ---\n`;
      this.logicResults.forEach((r, i) => {
        result += `  ${i + 1}. ${JSON.stringify(r)}\n`;
      });
      result += '\n';
    }

    if (this.causalResults.length > 0) {
      result += `--- النتائج السببية (${this.causalResults.length}) ---\n`;
      this.causalResults.forEach((r, i) => {
        result += `  ${i + 1}. ${JSON.stringify(r)}\n`;
      });
      result += '\n';
    }

    if (this.linguisticResults.length > 0) {
      result += `--- النتائج اللغوية (${this.linguisticResults.length}) ---\n`;
      this.linguisticResults.forEach((r, i) => {
        result += `  ${i + 1}. ${JSON.stringify(r)}\n`;
      });
      result += '\n';
    }

    if (this.knowledgeResults.length > 0) {
      result += `--- النتائج المعرفية (${this.knowledgeResults.length}) ---\n`;
      this.knowledgeResults.forEach((r, i) => {
        result += `  ${i + 1}. ${r.conclusion}\n`;
      });
      result += '\n';
    }

    if (this.explanation) {
      result += `التفسير: ${this.explanation}\n`;
    }

    return result;
  }
}

/**
 * محرك الاستدلال الموحد
 * Unified Inference Engine
 */
export class UnifiedInferenceEngine {
  private logicEngine: LogicEngine;
  private causalEngine: CausalEngine;
  private letterEngine: LetterEngine;
  private inferenceEngine: InferenceEngine;
  private thingEngine: ThingEngine;
  private eventEngine: EventEngine;
  private equationEngine: EquationEngine;

  constructor(
    logicEngine?: LogicEngine,
    causalEngine?: CausalEngine,
    letterEngine?: LetterEngine,
    inferenceEngine?: InferenceEngine,
    thingEngine?: ThingEngine,
    eventEngine?: EventEngine,
    equationEngine?: EquationEngine
  ) {
    this.logicEngine = logicEngine || new LogicEngine();
    this.causalEngine = causalEngine || new CausalEngine();
    this.letterEngine = letterEngine || new LetterEngine();
    this.inferenceEngine = inferenceEngine || new InferenceEngine();
    this.thingEngine = thingEngine || new ThingEngine();
    this.eventEngine = eventEngine || new EventEngine();
    this.equationEngine = equationEngine || new EquationEngine();
  }

  /**
   * استعلام موحد
   * Unified query
   * 
   * يبحث في جميع الأنظمة ويجمع النتائج
   */
  query(question: string, queryType: QueryType = QueryType.ALL): UnifiedInferenceResult {
    const result = new UnifiedInferenceResult(queryType, question);

    // 1. محاولة الاستدلال المنطقي
    if (queryType === QueryType.LOGIC || queryType === QueryType.ALL) {
      result.logicResults = this.queryLogic(question);
    }

    // 2. محاولة الاستدلال السببي
    if (queryType === QueryType.CAUSAL || queryType === QueryType.ALL) {
      result.causalResults = this.queryCausal(question);
    }

    // 3. محاولة الاستدلال اللغوي
    if (queryType === QueryType.LINGUISTIC || queryType === QueryType.ALL) {
      result.linguisticResults = this.queryLinguistic(question);
    }

    // 4. محاولة الاستدلال المعرفي
    if (queryType === QueryType.KNOWLEDGE || queryType === QueryType.ALL) {
      result.knowledgeResults = this.queryKnowledge(question);
    }

    // حساب درجة الثقة الإجمالية
    result.confidence = this.calculateConfidence(result);

    // توليد التفسير
    result.explanation = this.generateExplanation(result);

    return result;
  }

  /**
   * استدلال منطقي
   * Logic inference
   */
  private queryLogic(_question: string): any[] {
    // محاولة تحليل السؤال كاستعلام منطقي
    // مثال: "من هو والد أحمد؟" -> query(والد(?x, أحمد))

    // هنا يمكن إضافة معالجة اللغة الطبيعية لتحويل السؤال إلى استعلام منطقي
    // حالياً نرجع نتائج فارغة إذا لم يكن هناك استعلام صريح

    return [];
  }

  /**
   * استدلال سببي
   * Causal inference
   */
  private queryCausal(question: string): any[] {
    const results: any[] = [];

    // البحث عن كلمات مفتاحية سببية
    if (question.includes('لماذا') || question.includes('why') || 
        question.includes('سبب') || question.includes('cause')) {
      
      // استخراج الموضوع من السؤال
      // مثال: "لماذا احترقت الورقة؟" -> البحث عن أسباب "احتراق"
      
      const words = question.split(' ');
      for (const word of words) {
        const causes = this.causalEngine.findRootCauses(word);
        if (causes.length > 0) {
          results.push({ effect: word, causes });
        }
      }
    }

    // البحث عن نتائج
    if (question.includes('ماذا') || question.includes('what') ||
        question.includes('نتيجة') || question.includes('result')) {
      
      const words = question.split(' ');
      for (const word of words) {
        const effects = this.causalEngine.findFinalResults(word);
        if (effects.length > 0) {
          results.push({ cause: word, effects });
        }
      }
    }

    return results;
  }

  /**
   * استدلال لغوي
   * Linguistic inference
   */
  private queryLinguistic(question: string): any[] {
    const results: any[] = [];

    // البحث عن كلمات مفتاحية لغوية
    if (question.includes('معنى') || question.includes('meaning') ||
        question.includes('تحليل') || question.includes('analyze')) {
      
      // استخراج الكلمات العربية من السؤال
      const arabicWords = question.match(/[\u0600-\u06FF]+/g) || [];
      
      for (const word of arabicWords) {
        if (word.length > 1 && !['معنى', 'تحليل', 'كلمة', 'ما', 'هو'].includes(word)) {
          const analysis = this.letterEngine.analyzeWord(word);
          if (analysis) {
            results.push({
              word,
              meanings: analysis.wordMeanings,
              confidence: analysis.confidence
            });
          }
        }
      }
    }

    return results;
  }

  /**
   * استدلال معرفي
   * Knowledge inference
   */
  private queryKnowledge(_question: string): Inference[] {
    const results: Inference[] = [];

    // البحث في الأشياء المعروفة
    const allThings = this.thingEngine.getAllThings();

    for (const thing of allThings) {
      // فحص تلقائي للشيء
      const inferences = this.inferenceEngine.autoCheckThing(thing);
      results.push(...inferences);
    }

    return results;
  }

  /**
   * حساب درجة الثقة الإجمالية
   * Calculate overall confidence
   */
  private calculateConfidence(result: UnifiedInferenceResult): number {
    let totalConfidence = 0;
    let count = 0;

    // من النتائج المعرفية
    for (const inf of result.knowledgeResults) {
      totalConfidence += inf.confidence;
      count++;
    }

    // من النتائج اللغوية
    for (const ling of result.linguisticResults) {
      if (ling.confidence !== undefined) {
        totalConfidence += ling.confidence;
        count++;
      }
    }

    // إذا كانت هناك نتائج منطقية أو سببية، نعطيها ثقة عالية
    if (result.logicResults.length > 0) {
      totalConfidence += 0.95;
      count++;
    }

    if (result.causalResults.length > 0) {
      totalConfidence += 0.9;
      count++;
    }

    return count > 0 ? totalConfidence / count : 0;
  }

  /**
   * توليد التفسير
   * Generate explanation
   */
  private generateExplanation(result: UnifiedInferenceResult): string {
    const parts: string[] = [];

    if (result.logicResults.length > 0) {
      parts.push(`وجدت ${result.logicResults.length} نتيجة منطقية`);
    }

    if (result.causalResults.length > 0) {
      parts.push(`وجدت ${result.causalResults.length} علاقة سببية`);
    }

    if (result.linguisticResults.length > 0) {
      parts.push(`حللت ${result.linguisticResults.length} كلمة`);
    }

    if (result.knowledgeResults.length > 0) {
      parts.push(`استنتجت ${result.knowledgeResults.length} نتيجة معرفية`);
    }

    return parts.join('، ');
  }

  // Getters للمحركات الفردية
  getLogicEngine(): LogicEngine { return this.logicEngine; }
  getCausalEngine(): CausalEngine { return this.causalEngine; }
  getLetterEngine(): LetterEngine { return this.letterEngine; }
  getInferenceEngine(): InferenceEngine { return this.inferenceEngine; }
  getThingEngine(): ThingEngine { return this.thingEngine; }
  getEventEngine(): EventEngine { return this.eventEngine; }
  getEquationEngine(): EquationEngine { return this.equationEngine; }
}

