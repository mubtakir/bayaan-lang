/**
 * المشغلات الرياضية اللغوية - Linguistic Mathematical Operators
 * مشغلات جديدة لتمثيل الأفعال والأحداث في اللغة الطبيعية
 * 
 * بدلاً من العمليات التقليدية (+, -, *, /)، نستخدم مشغلات تحاكي الأفعال الطبيعية
 */

import { MotherEquation } from './motherEquation';

/**
 * نتيجة تطبيق مشغل
 */
export interface OperatorResult {
  success: boolean;
  message: string;
  affectedObjects: MotherEquation[];
  changes: Map<string, any>;
}

/**
 * رموز خاصة للأدوار
 */
export enum Role {
  ACTOR = 'فاعل',      // الفاعل
  OBJECT = 'مفعول',    // المفعول به
  RECIPIENT = 'متلقي', // المتلقي
  INSTRUMENT = 'أداة',  // الأداة
  LOCATION = 'مكان',   // المكان
  TIME = 'زمان'        // الزمان
}

/**
 * المشغلات الرياضية اللغوية
 */
export class LinguisticOperators {
  
  /**
   * 1. مشغل الانتقال - Go Operator
   * يمثل انتقال كائن من مكان إلى آخر
   * 
   * Go(object, fromLocation, toLocation)
   */
  static Go(
    object: MotherEquation,
    fromLocation: any,
    toLocation: any
  ): OperatorResult {
    // تحديث موقع الكائن
    object.updateState('location', toLocation);
    object.updateState('previousLocation', fromLocation);
    
    return {
      success: true,
      message: `انتقل ${object.id} من ${fromLocation} إلى ${toLocation}`,
      affectedObjects: [object],
      changes: new Map<string, any>([
        ['location', toLocation],
        ['previousLocation', fromLocation]
      ])
    };
  }

  /**
   * 2. مشغل التأثير - Affect Operator
   * يمثل تأثير كائن على آخر
   * 
   * Affect(actor, recipient, effectType, intensity)
   */
  static Affect(
    actor: MotherEquation,
    recipient: MotherEquation,
    effectType: string,
    intensity: number = 1.0
  ): OperatorResult {
    // تطبيق التأثير على المتلقي
    const currentState = recipient.getDynamicState(effectType) || 0;
    recipient.updateState(effectType, currentState + intensity);
    
    // تحديث حالة الفاعل
    actor.updateState('lastAction', `أثر على ${recipient.id}`);
    
    return {
      success: true,
      message: `${actor.id} أثر على ${recipient.id} بـ ${effectType} بشدة ${intensity}`,
      affectedObjects: [actor, recipient],
      changes: new Map([
        [effectType, currentState + intensity]
      ])
    };
  }

  /**
   * 3. مشغل الالتحام - Bond Operator
   * يمثل التحام كائنين بزاوية معينة
   * 
   * Bond(object1, object2, angle, bondType)
   */
  static Bond(
    object1: MotherEquation,
    object2: MotherEquation,
    angle: number = 0,
    bondType: string = 'physical'
  ): OperatorResult {
    // إنشاء رابطة بين الكائنين
    object1.updateState('bondedTo', object2.id);
    object1.updateState('bondAngle', angle);
    object1.updateState('bondType', bondType);
    
    object2.updateState('bondedTo', object1.id);
    object2.updateState('bondAngle', (angle + 180) % 360); // الزاوية المعاكسة
    object2.updateState('bondType', bondType);
    
    return {
      success: true,
      message: `التحم ${object1.id} مع ${object2.id} بزاوية ${angle}°`,
      affectedObjects: [object1, object2],
      changes: new Map<string, any>([
        ['bondedTo', object2.id],
        ['bondAngle', angle]
      ])
    };
  }

  /**
   * 4. مشغل التحول - Transform Operator
   * يمثل تحول وتغيير في خصائص وحالات الكائن
   * يفيد للتعبير عن: صنع، عمل، أنجز، حوّل، غيّر
   * 
   * Transform(object, transformations)
   */
  static Transform(
    object: MotherEquation,
    transformations: Map<string, any>
  ): OperatorResult {
    const changes = new Map<string, any>();
    
    // تطبيق كل التحولات
    transformations.forEach((newValue, property) => {
      const oldValue = object.getDynamicState(property);
      object.updateState(property, newValue);
      changes.set(property, { from: oldValue, to: newValue });
    });
    
    return {
      success: true,
      message: `تحول ${object.id}: ${transformations.size} تغييرات`,
      affectedObjects: [object],
      changes
    };
  }

  /**
   * 5. مشغل الفاعل - Actor Operator
   * يحدد الكائن كفاعل في الحدث
   * 
   * Actor(object)
   */
  static Actor(object: MotherEquation): MotherEquation {
    object.updateState('role', Role.ACTOR);
    object.updateState('isActive', true);
    return object;
  }

  /**
   * 6. مشغل المفعول - Object Operator
   * يحدد الكائن كمفعول به في الحدث
   * 
   * Object(object)
   */
  static Object(object: MotherEquation): MotherEquation {
    object.updateState('role', Role.OBJECT);
    object.updateState('isPassive', true);
    return object;
  }

  /**
   * 7. مشغل الإنشاء - Create Operator
   * يمثل إنشاء كائن جديد من مكونات
   * يفيد للتعبير عن: صنع، بنى، أنشأ، كوّن
   * 
   * Create(components, recipe)
   */
  static Create(
    components: MotherEquation[],
    recipe: Map<string, any>
  ): MotherEquation {
    // إنشاء كائن جديد
    const newId = `created_${Date.now()}`;
    const newObject = new MotherEquation(
      newId,
      new Map([['createdFrom', components.map(c => c.id)]]),
      new Map(recipe)
    );
    
    // تحديث حالة المكونات
    components.forEach(comp => {
      comp.updateState('usedInCreation', newId);
    });
    
    return newObject;
  }

  /**
   * 8. مشغل التدمير - Destroy Operator
   * يمثل تدمير أو إزالة كائن
   * يفيد للتعبير عن: هدم، كسر، أزال، محا
   * 
   * Destroy(object, method)
   */
  static Destroy(
    object: MotherEquation,
    method: string = 'default'
  ): OperatorResult {
    object.updateState('destroyed', true);
    object.updateState('destructionMethod', method);
    object.updateState('destructionTime', Date.now());
    
    return {
      success: true,
      message: `تم تدمير ${object.id} بطريقة ${method}`,
      affectedObjects: [object],
      changes: new Map<string, any>([
        ['destroyed', true],
        ['destructionMethod', method]
      ])
    };
  }

  /**
   * 9. مشغل النقل - Transfer Operator
   * يمثل نقل شيء من مكان/شخص إلى آخر
   * يفيد للتعبير عن: نقل، أعطى، سلّم، حوّل
   * 
   * Transfer(object, from, to, property)
   */
  static Transfer(
    object: MotherEquation,
    from: MotherEquation,
    to: MotherEquation,
    property: string = 'ownership'
  ): OperatorResult {
    // تحديث الملكية أو الموقع
    object.updateState(property, to.id);
    object.updateState(`previous_${property}`, from.id);
    
    // تحديث حالة المانح والمتلقي
    from.updateState('transferred', object.id);
    to.updateState('received', object.id);
    
    return {
      success: true,
      message: `نُقل ${object.id} من ${from.id} إلى ${to.id}`,
      affectedObjects: [object, from, to],
      changes: new Map<string, any>([
        [property, to.id],
        [`previous_${property}`, from.id]
      ])
    };
  }

  /**
   * 10. مشغل الدمج - Merge Operator
   * يمثل دمج كائنين أو أكثر في كائن واحد
   * يفيد للتعبير عن: دمج، خلط، مزج، وحّد
   * 
   * Merge(objects, mergeStrategy)
   */
  static Merge(
    objects: MotherEquation[],
    mergeStrategy: 'average' | 'sum' | 'max' | 'min' = 'average'
  ): MotherEquation {
    if (objects.length === 0) {
      throw new Error('لا يمكن دمج قائمة فارغة');
    }
    
    // إنشاء كائن مدمج جديد
    const mergedId = `merged_${objects.map(o => o.id).join('_')}`;
    const mergedStates = new Map<string, any>();
    
    // جمع كل الحالات من جميع الكائنات
    const allKeys = new Set<string>();
    objects.forEach(obj => {
      obj.Ψ.forEach((_, key) => allKeys.add(key));
    });
    
    // دمج القيم حسب الاستراتيجية
    allKeys.forEach(key => {
      const values = objects
        .map(obj => obj.getDynamicState(key))
        .filter(v => v !== undefined && v !== null);
      
      if (values.length > 0) {
        let mergedValue;
        
        switch (mergeStrategy) {
          case 'sum':
            mergedValue = values.reduce((a, b) => a + b, 0);
            break;
          case 'average':
            mergedValue = values.reduce((a, b) => a + b, 0) / values.length;
            break;
          case 'max':
            mergedValue = Math.max(...values);
            break;
          case 'min':
            mergedValue = Math.min(...values);
            break;
        }
        
        mergedStates.set(key, mergedValue);
      }
    });
    
    return new MotherEquation(
      mergedId,
      new Map([['mergedFrom', objects.map(o => o.id)]]),
      mergedStates
    );
  }

  /**
   * 11. مشغل التفكيك - Decompose Operator
   * يمثل تفكيك كائن إلى مكوناته
   * يفيد للتعبير عن: فكك، حلل، قسّم، جزّأ
   *
   * Decompose(object, parts)
   */
  static Decompose(
    object: MotherEquation,
    parts: number
  ): MotherEquation[] {
    const decomposed: MotherEquation[] = [];

    for (let i = 0; i < parts; i++) {
      const partId = `${object.id}_part_${i}`;
      const partStates = new Map<string, any>();

      // توزيع الحالات على الأجزاء
      object.Ψ.forEach((value, key) => {
        if (typeof value === 'number') {
          partStates.set(key, value / parts);
        } else {
          partStates.set(key, value);
        }
      });

      const part = new MotherEquation(
        partId,
        new Map<string, any>([['partOf', object.id], ['partNumber', i]]),
        partStates
      );

      decomposed.push(part);
    }

    // تحديث الكائن الأصلي
    object.updateState('decomposed', true);
    object.updateState('parts', decomposed.map(p => p.id));

    return decomposed;
  }

  /**
   * 12. مشغل التطور - Evolve Operator
   * يمثل تطور تدريجي للكائن عبر الزمن
   * يفيد للتعبير عن: نما، تطور، تقدم، نضج
   *
   * Evolve(object, evolutionFunction, steps)
   */
  static Evolve(
    object: MotherEquation,
    evolutionFunction: (current: any, step: number) => any,
    steps: number = 1
  ): OperatorResult {
    const changes = new Map<string, any>();

    for (let step = 0; step < steps; step++) {
      object.Ψ.forEach((value, key) => {
        const newValue = evolutionFunction(value, step);
        object.updateState(key, newValue);
        changes.set(`${key}_step_${step}`, newValue);
      });
    }

    return {
      success: true,
      message: `تطور ${object.id} عبر ${steps} خطوات`,
      affectedObjects: [object],
      changes
    };
  }

  /**
   * 13. مشغل التفاعل - Interact Operator
   * يمثل تفاعل متبادل بين كائنين
   * يفيد للتعبير عن: تفاعل، تبادل، تعاون، تصادم
   *
   * Interact(object1, object2, interactionType)
   */
  static Interact(
    object1: MotherEquation,
    object2: MotherEquation,
    interactionType: 'exchange' | 'collision' | 'cooperation' | 'competition'
  ): OperatorResult {
    const changes = new Map<string, any>();

    switch (interactionType) {
      case 'exchange':
        // تبادل خاصية معينة
        const temp = object1.getDynamicState('energy') || 0;
        object1.updateState('energy', object2.getDynamicState('energy') || 0);
        object2.updateState('energy', temp);
        changes.set('exchanged', 'energy');
        break;

      case 'collision':
        // تصادم - تبادل الزخم
        const momentum1 = object1.getDynamicState('momentum') || 0;
        const momentum2 = object2.getDynamicState('momentum') || 0;
        object1.updateState('momentum', -momentum1);
        object2.updateState('momentum', -momentum2);
        changes.set('collision', true);
        break;

      case 'cooperation':
        // تعاون - زيادة القدرات
        const power1 = object1.getDynamicState('power') || 1;
        const power2 = object2.getDynamicState('power') || 1;
        object1.updateState('power', power1 * 1.5);
        object2.updateState('power', power2 * 1.5);
        changes.set('cooperation', true);
        break;

      case 'competition':
        // منافسة - تقليل القدرات
        const strength1 = object1.getDynamicState('strength') || 1;
        const strength2 = object2.getDynamicState('strength') || 1;
        if (strength1 > strength2) {
          object1.updateState('strength', strength1 * 1.2);
          object2.updateState('strength', strength2 * 0.8);
        } else {
          object1.updateState('strength', strength1 * 0.8);
          object2.updateState('strength', strength2 * 1.2);
        }
        changes.set('competition', true);
        break;
    }

    return {
      success: true,
      message: `تفاعل ${object1.id} مع ${object2.id}: ${interactionType}`,
      affectedObjects: [object1, object2],
      changes
    };
  }

  /**
   * 14. مشغل الاحتواء - Contain Operator
   * يمثل احتواء كائن لكائن آخر
   * يفيد للتعبير عن: احتوى، ضمّ، شمل، حوى
   *
   * Contain(container, content)
   */
  static Contain(
    container: MotherEquation,
    content: MotherEquation
  ): OperatorResult {
    // إضافة المحتوى للحاوي
    const currentContents = container.getDynamicState('contents') || [];
    currentContents.push(content.id);
    container.updateState('contents', currentContents);

    // تحديث موقع المحتوى
    content.updateState('containedIn', container.id);
    content.updateState('location', `inside_${container.id}`);

    return {
      success: true,
      message: `${container.id} يحتوي ${content.id}`,
      affectedObjects: [container, content],
      changes: new Map([
        ['contents', currentContents],
        ['containedIn', container.id]
      ])
    };
  }

  /**
   * 15. مشغل الإطلاق - Release Operator
   * يمثل إطلاق أو تحرير كائن
   * يفيد للتعبير عن: أطلق، حرر، أفرج، أخرج
   *
   * Release(container, content)
   */
  static Release(
    container: MotherEquation,
    content: MotherEquation
  ): OperatorResult {
    // إزالة المحتوى من الحاوي
    const currentContents = container.getDynamicState('contents') || [];
    const updatedContents = currentContents.filter((id: string) => id !== content.id);
    container.updateState('contents', updatedContents);

    // تحديث حالة المحتوى
    content.updateState('containedIn', null);
    content.updateState('released', true);
    content.updateState('releaseTime', Date.now());

    return {
      success: true,
      message: `${container.id} أطلق ${content.id}`,
      affectedObjects: [container, content],
      changes: new Map([
        ['contents', updatedContents],
        ['released', true]
      ])
    };
  }
}

