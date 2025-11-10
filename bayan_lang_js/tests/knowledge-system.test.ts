/**
 * اختبارات نظام المعرفة الشامل
 * Comprehensive Knowledge System Tests
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { 
  Thing, ThingProperty, ThingState, ThingEngine, 
  PropertyType, StateType 
} from '../src/baserah/knowledge/thingEngine';
import { 
  Event, EventResult, EventRule, EventEngine, 
  EventType 
} from '../src/baserah/knowledge/eventEngine';
import {
  LogicalOperation,
  EquationEngine, OperationType
} from '../src/baserah/knowledge/equationEngine';
import {
  InferenceEngine, InferenceRule, Unknown
} from '../src/baserah/knowledge/inferenceEngine';
import { RelationType } from '../src/logic/causalEngine';

describe('Knowledge System - نظام المعرفة', () => {
  
  // ============================================
  // Thing Engine Tests - اختبارات محرك الأشياء
  // ============================================
  
  describe('Thing Engine - محرك الأشياء', () => {
    let thingEngine: ThingEngine;

    beforeEach(() => {
      thingEngine = new ThingEngine();
    });

    it('should create a tree with properties - إنشاء شجرة بخصائص', () => {
      const tree = new Thing('شجرة', 'نبات');
      
      tree.addProperty(new ThingProperty('نوع', 'تفاح', PropertyType.BIOLOGICAL));
      tree.addProperty(new ThingProperty('طول', 5, PropertyType.PHYSICAL, 'متر'));
      tree.addProperty(new ThingProperty('لون', 'أخضر', PropertyType.PHYSICAL));
      
      expect(tree.name).toBe('شجرة');
      expect(tree.category).toBe('نبات');
      expect(tree.getProperty('نوع')?.value).toBe('تفاح');
      expect(tree.getProperty('طول')?.value).toBe(5);
      expect(tree.getAllProperties()).toHaveLength(3);
    });

    it('should create a human with psychological properties - إنشاء إنسان بخصائص نفسية', () => {
      const human = new Thing('أحمد', 'إنسان');
      
      human.addProperty(new ThingProperty('مزاج', 'سعيد', PropertyType.PSYCHOLOGICAL));
      human.addProperty(new ThingProperty('عمر', 25, PropertyType.BIOLOGICAL, 'سنة'));
      
      expect(human.getProperty('مزاج')?.value).toBe('سعيد');
      expect(human.getProperty('عمر')?.value).toBe(25);
    });

    it('should create iron with physical properties - إنشاء حديد بخصائص فيزيائية', () => {
      const iron = new Thing('حديد', 'معدن');
      
      iron.addProperty(new ThingProperty('درجة_الانصهار', 1538, PropertyType.PHYSICAL, '°C'));
      iron.addProperty(new ThingProperty('الكثافة', 7.87, PropertyType.PHYSICAL, 'g/cm³'));
      iron.addProperty(new ThingProperty('درجة_الاتقاد', 1200, PropertyType.CHEMICAL, '°C'));
      
      expect(iron.getProperty('درجة_الانصهار')?.value).toBe(1538);
      expect(iron.getProperty('الكثافة')?.value).toBe(7.87);
    });

    it('should manage thing states - إدارة حالات الشيء', () => {
      const paper = new Thing('ورقة', 'مادة');
      
      paper.addState(new ThingState('عادية', StateType.STABLE, true));
      paper.addState(new ThingState('محترقة', StateType.PERMANENT, false));
      
      expect(paper.getState('عادية')?.active).toBe(true);
      expect(paper.getState('محترقة')?.active).toBe(false);
      
      paper.deactivateState('عادية');
      paper.activateState('محترقة');
      
      expect(paper.getState('عادية')?.active).toBe(false);
      expect(paper.getState('محترقة')?.active).toBe(true);
    });

    it('should check property thresholds - فحص عتبات الخصائص', () => {
      const material = new Thing('مادة', 'عنصر');
      
      const temp = new ThingProperty('درجة_الحرارة', 250, PropertyType.PHYSICAL, '°C');
      material.addProperty(temp);
      
      expect(temp.exceeds(200)).toBe(true);
      expect(temp.exceeds(300)).toBe(false);
      expect(temp.below(300)).toBe(true);
      expect(temp.below(200)).toBe(false);
    });

    it('should set shape equation - تعيين معادلة الشكل', () => {
      const tree = new Thing('شجرة', 'نبات');
      tree.setShape('y = sqrt(x) + branches(x)');
      
      expect(tree.getShape()).toBe('y = sqrt(x) + branches(x)');
    });

    it('should find things by category - البحث عن أشياء حسب الفئة', () => {
      const tree1 = new Thing('شجرة_تفاح', 'نبات');
      const tree2 = new Thing('شجرة_برتقال', 'نبات');
      const cat = new Thing('قطة', 'حيوان');
      
      thingEngine.addThing(tree1);
      thingEngine.addThing(tree2);
      thingEngine.addThing(cat);
      
      const plants = thingEngine.findByCategory('نبات');
      expect(plants).toHaveLength(2);
      expect(plants.map(p => p.name)).toContain('شجرة_تفاح');
      expect(plants.map(p => p.name)).toContain('شجرة_برتقال');
    });
  });

  // ============================================
  // Event Engine Tests - اختبارات محرك الأحداث
  // ============================================
  
  describe('Event Engine - محرك الأحداث', () => {
    let eventEngine: EventEngine;

    beforeEach(() => {
      eventEngine = new EventEngine();
    });

    it('should create an eating event - إنشاء حدث الأكل', () => {
      const event = new Event('أكل', EventType.ACTION, 'أحمد', 'تفاحة');
      
      const result1 = new EventResult('أحمد');
      result1.stateChanges.set('شبع', true);
      result1.description = 'أحمد شبع';
      
      const result2 = new EventResult('حقل');
      result2.propertyChanges.set('عدد_التفاح', -1);
      result2.description = 'الحقل نقص تفاحة';
      
      event.addResult(result1);
      event.addResult(result2);
      
      expect(event.subject).toBe('أحمد');
      expect(event.object).toBe('تفاحة');
      expect(event.getResults()).toHaveLength(2);
    });

    it('should create a hitting event - إنشاء حدث الضرب', () => {
      const event = new Event('ضرب', EventType.ACTION, 'زيد', 'عمرو');
      
      const result1 = new EventResult('زيد');
      result1.stateChanges.set('اعتدى', true);
      
      const result2 = new EventResult('عمرو');
      result2.stateChanges.set('تألم', true);
      
      event.addResult(result1);
      event.addResult(result2);
      
      expect(event.getResults()).toHaveLength(2);
      expect(event.getResultsForThing('زيد')).toHaveLength(1);
      expect(event.getResultsForThing('عمرو')).toHaveLength(1);
    });

    it('should apply event rules automatically - تطبيق قواعد الأحداث تلقائياً', () => {
      // Create rule: if temperature > 233°C, paper burns
      const rule = new EventRule('احتراق_الورقة', 'تسخين');
      rule.conditions.set('درجة_الحرارة', { operator: '>', value: 233 });
      
      const burnResult = new EventResult('ورقة');
      burnResult.stateChanges.set('محترقة', true);
      burnResult.description = 'الورقة احترقت';
      rule.results.push(burnResult);
      
      eventEngine.addRule(rule);
      
      // Create heating event
      const event = new Event('تسخين', EventType.TRANSFORMATION);
      event.addCondition('درجة_الحرارة', 250);
      
      eventEngine.addEvent(event);
      
      // Rule should have been applied
      expect(event.getResults()).toHaveLength(1);
      expect(event.getResults()[0].thing).toBe('ورقة');
      expect(event.getResults()[0].stateChanges.get('محترقة')).toBe(true);
    });

    it('should simulate events without recording - محاكاة أحداث دون تسجيل', () => {
      const event = new Event('اختبار', EventType.ACTION);
      
      const simulated = eventEngine.simulateEvent(event);
      
      expect(eventEngine.getEventCount()).toBe(0); // Not recorded
      expect(simulated.name).toBe('اختبار');
    });

    it('should find events by subject - البحث عن أحداث حسب الفاعل', () => {
      const event1 = new Event('أكل', EventType.ACTION, 'أحمد', 'تفاحة');
      const event2 = new Event('شرب', EventType.ACTION, 'أحمد', 'ماء');
      const event3 = new Event('أكل', EventType.ACTION, 'زيد', 'برتقالة');
      
      eventEngine.addEvent(event1);
      eventEngine.addEvent(event2);
      eventEngine.addEvent(event3);
      
      const ahmedEvents = eventEngine.getEventsBySubject('أحمد');
      expect(ahmedEvents).toHaveLength(2);
    });
  });

  // ============================================
  // Equation Engine Tests - اختبارات محرك المعادلات
  // ============================================
  
  describe('Equation Engine - محرك المعادلات', () => {
    let equationEngine: EquationEngine;

    beforeEach(() => {
      equationEngine = new EquationEngine();
    });

    it('should create eating equation - إنشاء معادلة الأكل', () => {
      const equation = equationEngine.createSimpleEquation(
        'معادلة_الأكل',
        'أحمد',
        'أكل',
        'تفاحة',
        [
          { name: 'أحمد', description: 'شبع' },
          { name: 'حقل', description: 'نقص تفاحة' },
          { name: 'أحمد', description: 'انتعش' },
          { name: 'تفاحة', description: 'تم ابتلاعها' }
        ]
      );
      
      expect(equation.getSubject()?.name).toBe('أحمد');
      expect(equation.getAction()?.name).toBe('أكل');
      expect(equation.getObject()?.name).toBe('تفاحة');
      expect(equation.getResults()).toHaveLength(4);
      expect(equation.isComplete()).toBe(true);
    });

    it('should create hitting equation - إنشاء معادلة الضرب', () => {
      const equation = equationEngine.createSimpleEquation(
        'معادلة_الضرب',
        'زيد',
        'ضرب',
        'عمرو',
        [
          { name: 'زيد', description: 'اعتدى' },
          { name: 'عمرو', description: 'تألم' }
        ]
      );
      
      expect(equation.getResults()).toHaveLength(2);
    });

    it('should create opposite operation - إنشاء عملية عكسية', () => {
      const operation = equationEngine.createOppositeOperation(
        'حر_برد',
        'الحر',
        'البرد'
      );
      
      expect(operation.left).toBe('الحر');
      expect(operation.right).toBe('البرد');
      expect(operation.operation).toBe(OperationType.OPPOSITE);
    });

    it('should evaluate operations - تقييم العمليات', () => {
      const values = new Map<string, any>();
      values.set('الحر', 30);
      values.set('البرد', -10);
      
      const addOp = new LogicalOperation('الحر', OperationType.ADD, 'البرد');
      expect(addOp.evaluate(values)).toBe(20);
      
      const subOp = new LogicalOperation('الحر', OperationType.SUBTRACT, 'البرد');
      expect(subOp.evaluate(values)).toBe(40);
    });

    it('should convert equation to event - تحويل معادلة إلى حدث', () => {
      const equation = equationEngine.createSimpleEquation(
        'معادلة_اختبار',
        'فاعل',
        'فعل',
        'مفعول',
        [{ name: 'نتيجة', description: 'وصف' }]
      );
      
      const event = equation.toEvent();
      
      expect(event.subject).toBe('فاعل');
      expect(event.object).toBe('مفعول');
      expect(event.getResults()).toHaveLength(1);
    });
  });

  // ============================================
  // Inference Engine Tests - اختبارات محرك الاستنتاج
  // ============================================
  
  describe('Inference Engine - محرك الاستنتاج', () => {
    let inferenceEngine: InferenceEngine;

    beforeEach(() => {
      inferenceEngine = new InferenceEngine();
    });

    it('should infer paper burning - استنتاج احتراق الورقة', () => {
      // Rule: if temperature > 233°C, paper burns
      const rule = new InferenceRule('احتراق_الورقة');
      rule.conditions.set('درجة_الحرارة', { operator: '>', value: 233 });
      rule.conclusion = 'الورقة ستحترق';
      rule.confidence = 0.95;
      
      inferenceEngine.addRule(rule);
      
      const paper = new Thing('ورقة', 'مادة');
      paper.addProperty(new ThingProperty('درجة_الحرارة', 250, PropertyType.PHYSICAL, '°C'));
      
      const inferences = inferenceEngine.autoCheckThing(paper);
      
      expect(inferences).toHaveLength(1);
      expect(inferences[0].conclusion).toBe('الورقة ستحترق');
      expect(inferences[0].confidence).toBe(0.95);
    });

    it('should register unknowns - تسجيل المجهولات', () => {
      const unknown = new Unknown(
        'unknown_1',
        'لماذا احترقت الورقة؟'
      );
      unknown.addContext('ورقة', 'محترقة');
      unknown.addRelatedThing('ورقة');
      
      inferenceEngine.registerUnknown(unknown);
      
      expect(inferenceEngine.getAllUnknowns()).toHaveLength(1);
      expect(inferenceEngine.getUnknown('unknown_1')?.question).toBe('لماذا احترقت الورقة؟');
    });

    it('should resolve unknowns with new information - حل المجهولات بمعلومات جديدة', () => {
      // Register unknown
      const unknown = new Unknown('unknown_1', 'لماذا احترقت الورقة؟');
      unknown.addContext('ورقة', 'محترقة');
      inferenceEngine.registerUnknown(unknown);
      
      // Add rule
      const rule = new InferenceRule('سبب_الاحتراق');
      rule.conditions.set('ورقة', 'محترقة');
      rule.conditions.set('درجة_الحرارة', { operator: '>', value: 200 });
      rule.conclusion = 'احترقت بسبب الحرارة العالية';
      inferenceEngine.addRule(rule);
      
      // Try to resolve with new information
      const newContext = new Map<string, any>();
      newContext.set('درجة_الحرارة', 250);
      
      const inference = inferenceEngine.tryResolveUnknown('unknown_1', newContext);
      
      expect(inference).not.toBeNull();
      expect(inference?.conclusion).toBe('احترقت بسبب الحرارة العالية');
      expect(inferenceEngine.getAllUnknowns()).toHaveLength(0); // Resolved
    });

    it('should create rules from observations - إنشاء قواعد من الملاحظات', () => {
      const observation = new Map<string, any>();
      observation.set('مادة', 'ورقة');
      observation.set('درجة_الحرارة', 233);
      
      const rule = inferenceEngine.createRuleFromObservation(
        'ملاحظة_احتراق',
        observation,
        'الورقة تحترق عند 233°C',
        0.8
      );
      
      expect(rule.name).toBe('ملاحظة_احتراق');
      expect(rule.confidence).toBe(0.8);
      expect(inferenceEngine.getRule('ملاحظة_احتراق')).toBeDefined();
    });

    it('should use causal engine for finding causes - استخدام المحرك السببي للبحث عن الأسباب', () => {
      inferenceEngine.addCausalRelation('حرارة_عالية', 'احتراق', RelationType.CAUSES, 0.9);
      inferenceEngine.addCausalRelation('أكسجين', 'احتراق', RelationType.ENABLES, 0.95);
      
      const causes = inferenceEngine.findCause('احتراق');
      
      expect(causes.length).toBeGreaterThan(0);
      expect(causes).toContain('حرارة_عالية');
    });

    it('should provide statistics - توفير إحصائيات', () => {
      inferenceEngine.addRule(new InferenceRule('قاعدة_1'));
      inferenceEngine.addRule(new InferenceRule('قاعدة_2'));
      inferenceEngine.registerUnknown(new Unknown('u1', 'سؤال'));
      
      const stats = inferenceEngine.getStatistics();
      
      expect(stats.rulesCount).toBe(2);
      expect(stats.unknownsCount).toBe(1);
    });
  });
});

