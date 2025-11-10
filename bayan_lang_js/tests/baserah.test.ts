/**
 * اختبارات نظام بصيرة AI - المعادلة الأم والمشغلات اللغوية
 */

import { MotherEquation, ShapeEquation } from '../src/baserah/core/motherEquation';
import { LinguisticOperators, Role } from '../src/baserah/core/linguisticOperators';
import { LinguisticEquation, SentenceParser, LinguisticEquationEngine } from '../src/baserah/core/linguisticEquations';

describe('المعادلة الأم - Mother Equation', () => {
  test('إنشاء معادلة أم بسيطة', () => {
    const staticProps = new Map<string, any>([
      ['name', 'كرة'],
      ['material', 'مطاط']
    ]);

    const dynamicStates = new Map<string, any>([
      ['location', 'أرض'],
      ['temperature', 25]
    ]);
    
    const eq = new MotherEquation('ball_1', staticProps, dynamicStates);
    
    expect(eq.id).toBe('ball_1');
    expect(eq.getStaticProperty('name')).toBe('كرة');
    expect(eq.getDynamicState('location')).toBe('أرض');
  });

  test('تحديث الحالات المتغيرة', () => {
    const eq = new MotherEquation('obj_1');
    
    eq.updateState('temperature', 20);
    expect(eq.getDynamicState('temperature')).toBe(20);
    
    eq.updateState('temperature', 30);
    expect(eq.getDynamicState('temperature')).toBe(30);
  });

  test('تتبع التاريخ عبر الزمن', () => {
    const eq = new MotherEquation('obj_1');
    
    eq.updateState('value', 10);
    eq.updateState('value', 20);
    eq.updateState('value', 30);
    
    const stateAt0 = eq.getStateAtTime(0);
    const stateAt1 = eq.getStateAtTime(1);
    
    expect(stateAt0?.get('value')).toBe(10);
    expect(stateAt1?.get('value')).toBe(20);
  });

  test('معادلة الشكل - تقييم sigmoid', () => {
    const shapeEq: ShapeEquation = {
      type: 'sigmoid',
      coefficients: [1, 0],
      terms: [
        { type: 'sigmoid', params: [1, 0], order: 0 }
      ],
      visualProperties: {}
    };
    
    const eq = new MotherEquation('shape_1', new Map(), new Map(), shapeEq);
    
    const y = eq.evaluateShape(0);
    expect(y).toBeCloseTo(0.5, 1);
  });

  test('رسم الشكل', () => {
    const shapeEq: ShapeEquation = {
      type: 'linear',
      coefficients: [1, 0],
      terms: [
        { type: 'line', params: [1, 0], order: 0 }
      ],
      visualProperties: {}
    };
    
    const eq = new MotherEquation('line_1', new Map(), new Map(), shapeEq);
    const points = eq.renderShape(10);
    
    expect(points.length).toBe(11);
    expect(points[0].x).toBeCloseTo(-1, 1);
    expect(points[10].x).toBeCloseTo(1, 1);
  });

  test('تصدير واستيراد JSON', () => {
    const eq = new MotherEquation(
      'test_1',
      new Map([['name', 'اختبار']]),
      new Map([['value', 42]])
    );
    
    const json = eq.toJSON();
    const restored = MotherEquation.fromJSON(json);
    
    expect(restored.id).toBe('test_1');
    expect(restored.getStaticProperty('name')).toBe('اختبار');
    expect(restored.getDynamicState('value')).toBe(42);
  });
});

describe('المشغلات الرياضية اللغوية', () => {
  test('مشغل الانتقال - Go', () => {
    const person = new MotherEquation('أحمد');
    
    const result = LinguisticOperators.Go(person, 'بيت', 'مدرسة');
    
    expect(result.success).toBe(true);
    expect(person.getDynamicState('location')).toBe('مدرسة');
    expect(person.getDynamicState('previousLocation')).toBe('بيت');
  });

  test('مشغل التأثير - Affect', () => {
    const actor = new MotherEquation('لاعب');
    const object = new MotherEquation('كرة');
    
    const result = LinguisticOperators.Affect(actor, object, 'speed', 10);
    
    expect(result.success).toBe(true);
    expect(object.getDynamicState('speed')).toBe(10);
    expect(actor.getDynamicState('lastAction')).toContain('كرة');
  });

  test('مشغل الالتحام - Bond', () => {
    const obj1 = new MotherEquation('لبنة1');
    const obj2 = new MotherEquation('لبنة2');
    
    const result = LinguisticOperators.Bond(obj1, obj2, 90, 'cement');
    
    expect(result.success).toBe(true);
    expect(obj1.getDynamicState('bondedTo')).toBe('لبنة2');
    expect(obj1.getDynamicState('bondAngle')).toBe(90);
    expect(obj2.getDynamicState('bondAngle')).toBe(270);
  });

  test('مشغل التحول - Transform', () => {
    const object = new MotherEquation('ماء');

    const transformations = new Map<string, any>([
      ['state', 'بخار'],
      ['temperature', 100]
    ]);
    
    const result = LinguisticOperators.Transform(object, transformations);
    
    expect(result.success).toBe(true);
    expect(object.getDynamicState('state')).toBe('بخار');
    expect(object.getDynamicState('temperature')).toBe(100);
  });

  test('مشغل الفاعل والمفعول', () => {
    const actor = new MotherEquation('فاعل');
    const object = new MotherEquation('مفعول');
    
    LinguisticOperators.Actor(actor);
    LinguisticOperators.Object(object);
    
    expect(actor.getDynamicState('role')).toBe(Role.ACTOR);
    expect(actor.getDynamicState('isActive')).toBe(true);
    expect(object.getDynamicState('role')).toBe(Role.OBJECT);
    expect(object.getDynamicState('isPassive')).toBe(true);
  });

  test('مشغل الإنشاء - Create', () => {
    const wood = new MotherEquation('خشب');
    const nails = new MotherEquation('مسامير');

    const recipe = new Map<string, any>([
      ['type', 'طاولة'],
      ['color', 'بني']
    ]);
    
    const table = LinguisticOperators.Create([wood, nails], recipe);
    
    expect(table.getDynamicState('type')).toBe('طاولة');
    expect(wood.getDynamicState('usedInCreation')).toBe(table.id);
  });

  test('مشغل التدمير - Destroy', () => {
    const building = new MotherEquation('مبنى');
    
    const result = LinguisticOperators.Destroy(building, 'explosion');
    
    expect(result.success).toBe(true);
    expect(building.getDynamicState('destroyed')).toBe(true);
    expect(building.getDynamicState('destructionMethod')).toBe('explosion');
  });

  test('مشغل النقل - Transfer', () => {
    const book = new MotherEquation('كتاب');
    const from = new MotherEquation('أحمد');
    const to = new MotherEquation('محمد');
    
    const result = LinguisticOperators.Transfer(book, from, to, 'ownership');
    
    expect(result.success).toBe(true);
    expect(book.getDynamicState('ownership')).toBe('محمد');
    expect(from.getDynamicState('transferred')).toBe('كتاب');
    expect(to.getDynamicState('received')).toBe('كتاب');
  });

  test('مشغل الدمج - Merge', () => {
    const obj1 = new MotherEquation('obj1');
    const obj2 = new MotherEquation('obj2');
    
    obj1.updateState('value', 10);
    obj2.updateState('value', 20);
    
    const merged = LinguisticOperators.Merge([obj1, obj2], 'average');
    
    expect(merged.getDynamicState('value')).toBe(15);
  });

  test('مشغل التفكيك - Decompose', () => {
    const whole = new MotherEquation('كل');
    whole.updateState('mass', 100);
    
    const parts = LinguisticOperators.Decompose(whole, 4);
    
    expect(parts.length).toBe(4);
    expect(parts[0].getDynamicState('mass')).toBe(25);
    expect(whole.getDynamicState('decomposed')).toBe(true);
  });

  test('مشغل التفاعل - Interact (تبادل)', () => {
    const obj1 = new MotherEquation('obj1');
    const obj2 = new MotherEquation('obj2');
    
    obj1.updateState('energy', 100);
    obj2.updateState('energy', 50);
    
    const result = LinguisticOperators.Interact(obj1, obj2, 'exchange');
    
    expect(result.success).toBe(true);
    expect(obj1.getDynamicState('energy')).toBe(50);
    expect(obj2.getDynamicState('energy')).toBe(100);
  });

  test('مشغل الاحتواء - Contain', () => {
    const box = new MotherEquation('صندوق');
    const item = new MotherEquation('شيء');
    
    const result = LinguisticOperators.Contain(box, item);
    
    expect(result.success).toBe(true);
    expect(box.getDynamicState('contents')).toContain('شيء');
    expect(item.getDynamicState('containedIn')).toBe('صندوق');
  });

  test('مشغل الإطلاق - Release', () => {
    const box = new MotherEquation('صندوق');
    const item = new MotherEquation('شيء');
    
    LinguisticOperators.Contain(box, item);
    const result = LinguisticOperators.Release(box, item);
    
    expect(result.success).toBe(true);
    expect(box.getDynamicState('contents')).not.toContain('شيء');
    expect(item.getDynamicState('released')).toBe(true);
  });
});

describe('المعادلات اللغوية', () => {
  test('إنشاء معادلة لغوية بسيطة', () => {
    const equation = new LinguisticEquation();
    
    const actor = new MotherEquation('أحمد');
    const object = new MotherEquation('كرة');
    
    equation.addThing(Role.ACTOR, actor);
    equation.addThing(Role.OBJECT, object);
    equation.setEvent('ضرب', 'Affect', ['force', 10]);
    
    const result = equation.execute();
    
    expect(result.success).toBe(true);
    expect(object.getDynamicState('force')).toBe(10);
  });

  test('محلل الجمل - تحليل جملة بسيطة', () => {
    const parser = new SentenceParser();
    const objects = new Map([
      ['أحمد', new MotherEquation('أحمد')],
      ['الكرة', new MotherEquation('الكرة')]
    ]);
    
    const equation = parser.parse('ضرب أحمد الكرة', objects);
    
    expect(equation.event.verb).toBe('ضرب');
    expect(equation.event.operator).toBe('Affect');
    expect(equation.things.has(Role.ACTOR)).toBe(true);
  });

  test('محرك المعادلات اللغوية - تنفيذ جملة', () => {
    const engine = new LinguisticEquationEngine();
    
    const ahmad = new MotherEquation('أحمد');
    const ball = new MotherEquation('الكرة');
    
    engine.registerObject('أحمد', ahmad);
    engine.registerObject('الكرة', ball);
    
    const result = engine.executeSentence('ضرب أحمد الكرة');
    
    expect(result.success).toBe(true);
    expect(engine.getEquations().length).toBe(1);
  });
});

