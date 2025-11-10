/**
 * نظام المعادلات اللغوية - Linguistic Equations System
 * تحويل الجمل الطبيعية إلى معادلات رياضية قابلة للتنفيذ
 * 
 * الفكرة = (أشياء، حدث، نتيجة)
 * Idea = (Things, Event, Result)
 */

import { MotherEquation } from './motherEquation';
import { LinguisticOperators, Role, OperatorResult } from './linguisticOperators';

/**
 * عنصر في المعادلة اللغوية
 */
export interface EquationElement {
  type: 'thing' | 'event' | 'result';
  value: any;
  role?: Role;
}

/**
 * المعادلة اللغوية
 * الفكرة = (أشياء، حدث، نتيجة)
 */
export class LinguisticEquation {
  // الأشياء المشاركة في الفكرة
  public things: Map<Role, MotherEquation>;
  
  // الحدث (الفعل)
  public event: {
    verb: string;
    operator: string;
    params: any[];
  };
  
  // النتيجة المتوقعة
  public result: {
    expectedChanges: Map<string, any>;
    actualChanges?: Map<string, any>;
  };

  constructor() {
    this.things = new Map();
    this.event = {
      verb: '',
      operator: '',
      params: []
    };
    this.result = {
      expectedChanges: new Map()
    };
  }

  /**
   * إضافة شيء بدور معين
   */
  addThing(role: Role, thing: MotherEquation): void {
    this.things.set(role, thing);
  }

  /**
   * تعيين الحدث
   */
  setEvent(verb: string, operator: string, params: any[] = []): void {
    this.event = { verb, operator, params };
  }

  /**
   * تعيين النتيجة المتوقعة
   */
  setExpectedResult(changes: Map<string, any>): void {
    this.result.expectedChanges = changes;
  }

  /**
   * تنفيذ المعادلة
   */
  execute(): OperatorResult {
    const actor = this.things.get(Role.ACTOR);
    const object = this.things.get(Role.OBJECT);
    const recipient = this.things.get(Role.RECIPIENT);
    const location = this.things.get(Role.LOCATION);
    
    let result: OperatorResult;
    
    // تنفيذ المشغل المناسب
    switch (this.event.operator) {
      case 'Go':
        if (actor && location) {
          result = LinguisticOperators.Go(
            actor,
            this.event.params[0],
            this.event.params[1]
          );
        } else {
          throw new Error('مشغل Go يحتاج فاعل وموقع');
        }
        break;
      
      case 'Affect':
        if (actor && object) {
          result = LinguisticOperators.Affect(
            actor,
            object,
            this.event.params[0] || 'effect',
            this.event.params[1] || 1.0
          );
        } else {
          throw new Error('مشغل Affect يحتاج فاعل ومفعول');
        }
        break;
      
      case 'Transform':
        if (object) {
          result = LinguisticOperators.Transform(
            object,
            this.event.params[0] || new Map()
          );
        } else {
          throw new Error('مشغل Transform يحتاج مفعول');
        }
        break;
      
      case 'Transfer':
        if (actor && object && recipient) {
          result = LinguisticOperators.Transfer(
            object,
            actor,
            recipient,
            this.event.params[0] || 'ownership'
          );
        } else {
          throw new Error('مشغل Transfer يحتاج فاعل ومفعول ومتلقي');
        }
        break;
      
      case 'Create':
        if (actor) {
          const components = Array.from(this.things.values());
          const newObject = LinguisticOperators.Create(
            components,
            this.event.params[0] || new Map()
          );
          result = {
            success: true,
            message: `تم إنشاء ${newObject.id}`,
            affectedObjects: [newObject, ...components],
            changes: new Map([['created', newObject.id]])
          };
        } else {
          throw new Error('مشغل Create يحتاج فاعل');
        }
        break;
      
      default:
        throw new Error(`مشغل غير معروف: ${this.event.operator}`);
    }
    
    // حفظ النتيجة الفعلية
    this.result.actualChanges = result.changes;
    
    return result;
  }

  /**
   * التحقق من تطابق النتيجة المتوقعة مع الفعلية
   */
  verifyResult(): boolean {
    if (!this.result.actualChanges) {
      return false;
    }
    
    let allMatch = true;
    
    this.result.expectedChanges.forEach((expectedValue, key) => {
      const actualValue = this.result.actualChanges!.get(key);
      if (actualValue !== expectedValue) {
        allMatch = false;
      }
    });
    
    return allMatch;
  }

  /**
   * تصدير إلى نص
   */
  toString(): string {
    const thingsStr = Array.from(this.things.entries())
      .map(([role, thing]) => `${role}: ${thing.id}`)
      .join(', ');
    
    return `[${thingsStr}] → ${this.event.verb}(${this.event.operator}) → ${this.result.expectedChanges.size} تغييرات`;
  }
}

/**
 * محلل الجمل إلى معادلات لغوية
 */
export class SentenceParser {
  // قاموس الأفعال والمشغلات المقابلة
  private verbToOperator: Map<string, string> = new Map([
    // أفعال الحركة
    ['ذهب', 'Go'],
    ['انتقل', 'Go'],
    ['سافر', 'Go'],
    ['رحل', 'Go'],
    
    // أفعال التأثير
    ['ضرب', 'Affect'],
    ['دفع', 'Affect'],
    ['سحب', 'Affect'],
    ['أثر', 'Affect'],
    
    // أفعال التحول
    ['تحول', 'Transform'],
    ['تغير', 'Transform'],
    ['صار', 'Transform'],
    ['أصبح', 'Transform'],
    
    // أفعال النقل
    ['أعطى', 'Transfer'],
    ['سلم', 'Transfer'],
    ['نقل', 'Transfer'],
    ['حول', 'Transfer'],
    
    // أفعال الإنشاء
    ['صنع', 'Create'],
    ['بنى', 'Create'],
    ['أنشأ', 'Create'],
    ['كون', 'Create'],
    
    // أفعال التدمير
    ['هدم', 'Destroy'],
    ['كسر', 'Destroy'],
    ['حطم', 'Destroy'],
    ['أزال', 'Destroy'],
    
    // أفعال الدمج
    ['دمج', 'Merge'],
    ['خلط', 'Merge'],
    ['مزج', 'Merge'],
    ['وحد', 'Merge'],
    
    // أفعال التفكيك
    ['فكك', 'Decompose'],
    ['قسم', 'Decompose'],
    ['جزأ', 'Decompose'],
    ['حلل', 'Decompose']
  ]);

  /**
   * تحليل جملة إلى معادلة لغوية
   *
   * مثال: "ضرب أحمد الكرة"
   * → الفاعل: أحمد، الفعل: ضرب، المفعول: الكرة
   */
  parse(sentence: string, objects: Map<string, MotherEquation>): LinguisticEquation {
    const equation = new LinguisticEquation();

    // تحليل بسيط (يمكن تطويره لاحقاً)
    const words = sentence.trim().split(/\s+/);

    // البحث عن الفعل
    let verb = '';
    let operator = '';
    let verbIndex = -1;

    for (let i = 0; i < words.length; i++) {
      if (this.verbToOperator.has(words[i])) {
        verb = words[i];
        operator = this.verbToOperator.get(words[i])!;
        verbIndex = i;
        break;
      }
    }

    if (!verb) {
      throw new Error('لم يتم العثور على فعل في الجملة');
    }

    equation.setEvent(verb, operator);

    // تحديد الأدوار (تحليل بسيط)
    // إذا كان الفعل في البداية: الفعل + الفاعل + المفعول
    // إذا كان الفعل في الوسط: الفاعل + الفعل + المفعول

    if (verbIndex === 0) {
      // الفعل في البداية: الكلمة الأولى بعد الفعل فاعل، الثانية مفعول
      let actorFound = false;
      for (let i = verbIndex + 1; i < words.length; i++) {
        if (objects.has(words[i])) {
          if (!actorFound) {
            equation.addThing(Role.ACTOR, objects.get(words[i])!);
            actorFound = true;
          } else {
            equation.addThing(Role.OBJECT, objects.get(words[i])!);
            break;
          }
        }
      }
    } else {
      // الفعل في الوسط: قبله فاعل، بعده مفعول
      // الكلمات قبل الفعل غالباً فاعل
      for (let i = 0; i < verbIndex; i++) {
        if (objects.has(words[i])) {
          equation.addThing(Role.ACTOR, objects.get(words[i])!);
          break;
        }
      }

      // الكلمات بعد الفعل غالباً مفعول
      for (let i = verbIndex + 1; i < words.length; i++) {
        if (objects.has(words[i])) {
          equation.addThing(Role.OBJECT, objects.get(words[i])!);
          break;
        }
      }
    }

    return equation;
  }

  /**
   * إضافة فعل جديد
   */
  addVerb(verb: string, operator: string): void {
    this.verbToOperator.set(verb, operator);
  }

  /**
   * الحصول على جميع الأفعال
   */
  getVerbs(): string[] {
    return Array.from(this.verbToOperator.keys());
  }
}

/**
 * محرك المعادلات اللغوية
 */
export class LinguisticEquationEngine {
  private parser: SentenceParser;
  private objects: Map<string, MotherEquation>;
  private equations: LinguisticEquation[];

  constructor() {
    this.parser = new SentenceParser();
    this.objects = new Map();
    this.equations = [];
  }

  /**
   * تسجيل كائن
   */
  registerObject(name: string, object: MotherEquation): void {
    this.objects.set(name, object);
  }

  /**
   * تحليل وتنفيذ جملة
   */
  executeSentence(sentence: string): OperatorResult {
    const equation = this.parser.parse(sentence, this.objects);
    this.equations.push(equation);
    return equation.execute();
  }

  /**
   * الحصول على جميع المعادلات
   */
  getEquations(): LinguisticEquation[] {
    return this.equations;
  }

  /**
   * الحصول على Parser
   */
  getParser(): SentenceParser {
    return this.parser;
  }
}

