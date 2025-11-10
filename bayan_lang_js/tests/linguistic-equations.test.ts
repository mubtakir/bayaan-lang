/**
 * Unit Tests for Linguistic Equations System
 * اختبارات وحدة لنظام المعادلات اللغوية
 */

import {
  LinguisticEquationEngine,
  LinguisticRole,
  CustomOperatorBuilder,
  PredefinedCustomOperators,
  ConditionType,
} from '../src/baserah/equations';

describe('Linguistic Equations System Tests', () => {
  let engine: LinguisticEquationEngine;

  beforeEach(() => {
    engine = new LinguisticEquationEngine();
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // Test Suite 1: Entity Creation
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Entity Creation', () => {
    test('should create entity with role and attributes', () => {
      const entity = engine.createEntity('أحمد', LinguisticRole.AGENT, new Map([
        ['age', 25],
        ['العمر', 25],
      ]));

      expect(entity.name).toBe('أحمد');
      expect(entity.role).toBe(LinguisticRole.AGENT);
      expect(entity.attributes.get('age')).toBe(25);
      expect(entity.attributes.get('العمر')).toBe(25);
    });

    test('should create entity without attributes', () => {
      const entity = engine.createEntity('فعل', LinguisticRole.ACTION);

      expect(entity.name).toBe('فعل');
      expect(entity.role).toBe(LinguisticRole.ACTION);
      expect(entity.attributes.size).toBe(0);
    });

    test('should assign unique IDs to entities', () => {
      const entity1 = engine.createEntity('كيان1', LinguisticRole.AGENT);
      const entity2 = engine.createEntity('كيان2', LinguisticRole.PATIENT);

      expect(entity1.id).not.toBe(entity2.id);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // Test Suite 2: Equation Creation and Execution
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Equation Creation and Execution', () => {
    test('should create and execute simple equation', () => {
      const cause = engine.createEntity('سبب', LinguisticRole.CAUSE);
      const effect = engine.createEntity('أثر', LinguisticRole.EFFECT);

      const equation = engine.createEquation(
        'Cause and Effect',
        'السبب والأثر',
        [cause, effect],
        []
      );

      expect(equation.name).toBe('Cause and Effect');
      expect(equation.description).toBe('السبب والأثر');
      expect(equation.inputs.length).toBe(2);

      const event = engine.executeEquation(equation);
      expect(event.cancelled).toBe(false);
    });

    test('should execute equation with conditions', () => {
      const entity = engine.createEntity('كيان', LinguisticRole.AGENT, new Map([
        ['value', 100],
      ]));

      const equation = engine.createEquation(
        'Conditional Equation',
        'معادلة شرطية',
        [entity],
        [],
        [
          {
            id: 'value_check',
            type: ConditionType.ATTRIBUTE,
            expression: 'value >= 50',
            evaluate: (context) => {
              const e = Array.from(context.entities.values())
                .find(ent => ent.name === 'كيان');
              return e ? (e.attributes.get('value') || 0) >= 50 : false;
            },
          },
        ]
      );

      const event = engine.executeEquation(equation);
      expect(event.cancelled).toBe(false);
    });

    test('should cancel equation when condition not met', () => {
      const entity = engine.createEntity('كيان', LinguisticRole.AGENT, new Map([
        ['value', 30],
      ]));

      const equation = engine.createEquation(
        'Conditional Equation',
        'معادلة شرطية',
        [entity],
        [],
        [
          {
            id: 'value_check',
            type: ConditionType.ATTRIBUTE,
            expression: 'value >= 50',
            evaluate: (context) => {
              const e = Array.from(context.entities.values())
                .find(ent => ent.name === 'كيان');
              return e ? (e.attributes.get('value') || 0) >= 50 : false;
            },
          },
        ]
      );

      const event = engine.executeEquation(equation);
      expect(event.cancelled).toBe(true);
      expect(event.reason).toContain('Condition not met');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // Test Suite 3: Custom Operators
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Custom Operators', () => {
    test('should define and use custom operator', () => {
      const doublesOp = new CustomOperatorBuilder()
        .withSymbol('×2')
        .withName('يضاعف')
        .withNameEn('doubles')
        .withDescription('Doubles numeric attributes')
        .withImplementation(`
          const [entity] = entities;
          entity.attributes.forEach((value, key) => {
            if (typeof value === 'number') {
              entity.attributes.set(key, value * 2);
            }
          });
          return [entity];
        `)
        .build();

      engine.defineCustomOperator(doublesOp);

      const entity = engine.createEntity('كيان', LinguisticRole.AGENT, new Map([
        ['value', 50],
      ]));

      const customOp = Array.from(engine['customOperators'].values())
        .find(op => op.symbol === '×2');

      customOp?.apply([entity]);

      expect(entity.attributes.get('value')).toBe(100);
    });

    test('should use predefined patience operator', () => {
      const patienceOp = PredefinedCustomOperators.patience();
      engine.defineCustomOperator(patienceOp);

      const agent = engine.createEntity('فاعل', LinguisticRole.AGENT, new Map([
        ['صبر', 80],
      ]));

      const action = engine.createEntity('فعل', LinguisticRole.ACTION);

      const customOp = Array.from(engine['customOperators'].values())
        .find(op => op.symbol === 'صبر⊲');

      const result = customOp?.apply([agent, action]);

      expect(agent.attributes.get('صبر')).toBe(true);
      expect(result?.length).toBe(1); // Action prevented
    });

    test('should use predefined aggression increase operator', () => {
      const aggressionOp = PredefinedCustomOperators.aggressionIncrease();
      engine.defineCustomOperator(aggressionOp);

      const agent = engine.createEntity('أحمد', LinguisticRole.AGENT, new Map([
        ['وحشية', 50],
      ]));

      const action = engine.createEntity('اعتدى', LinguisticRole.ACTION);

      const customOp = Array.from(engine['customOperators'].values())
        .find(op => op.symbol === '↑وحشية');

      if (customOp) {
        customOp.apply([agent, action]);
      }

      expect(agent.attributes.get('وحشية')).toBe(70);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // Test Suite 4: Linguistic Roles
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Linguistic Roles', () => {
    test('should support all 20 linguistic roles', () => {
      const roles = [
        LinguisticRole.AGENT,
        LinguisticRole.PATIENT,
        LinguisticRole.ACTION,
        LinguisticRole.INSTRUMENT,
        LinguisticRole.LOCATION,
        LinguisticRole.TIME,
        LinguisticRole.MANNER,
        LinguisticRole.REASON,
        LinguisticRole.RESULT,
        LinguisticRole.CONDITION,
        LinguisticRole.RELATION,
        LinguisticRole.MODIFIER,
        LinguisticRole.POSSESSOR,
        LinguisticRole.POSSESSED,
        LinguisticRole.CAUSE,
        LinguisticRole.EFFECT,
        LinguisticRole.ENABLER,
        LinguisticRole.PREVENTER,
        LinguisticRole.CATALYST,
        LinguisticRole.INHIBITOR,
      ];

      roles.forEach((role, index) => {
        const entity = engine.createEntity(`كيان${index}`, role);
        expect(entity.role).toBe(role);
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════════
  // Test Suite 5: Complex Scenarios
  // ═══════════════════════════════════════════════════════════════════════════════

  describe('Complex Scenarios', () => {
    test('should handle causal chain', () => {
      const cause1 = engine.createEntity('سبب1', LinguisticRole.CAUSE, new Map([
        ['strength', 100],
      ]));

      const cause2 = engine.createEntity('سبب2', LinguisticRole.CAUSE, new Map([
        ['strength', 0],
      ]));

      const effect = engine.createEntity('أثر', LinguisticRole.EFFECT, new Map([
        ['value', 0],
      ]));

      // First equation: cause1 → cause2
      const eq1 = engine.createEquation(
        'First Link',
        'الرابط الأول',
        [cause1, cause2],
        []
      );

      engine.executeEquation(eq1);
      cause2.attributes.set('strength', 80);

      // Second equation: cause2 → effect
      const eq2 = engine.createEquation(
        'Second Link',
        'الرابط الثاني',
        [cause2, effect],
        []
      );

      engine.executeEquation(eq2);
      effect.attributes.set('value', 60);

      expect(cause2.attributes.get('strength')).toBe(80);
      expect(effect.attributes.get('value')).toBe(60);
    });

    test('should handle multiple operators on same entity', () => {
      const doublesOp = new CustomOperatorBuilder()
        .withSymbol('×2')
        .withName('يضاعف')
        .withNameEn('Doubles')
        .withImplementation(`
          const [entity] = entities;
          const value = entity.attributes.get('value') || 0;
          entity.attributes.set('value', value * 2);
          return [entity];
        `)
        .build();

      const triplesOp = new CustomOperatorBuilder()
        .withSymbol('×3')
        .withName('يثلث')
        .withNameEn('Triples')
        .withImplementation(`
          const [entity] = entities;
          const value = entity.attributes.get('value') || 0;
          entity.attributes.set('value', value * 3);
          return [entity];
        `)
        .build();

      engine.defineCustomOperator(doublesOp);
      engine.defineCustomOperator(triplesOp);

      const entity = engine.createEntity('كيان', LinguisticRole.AGENT, new Map([
        ['value', 10],
      ]));

      const op1 = Array.from(engine['customOperators'].values())
        .find(op => op.symbol === '×2');
      const op2 = Array.from(engine['customOperators'].values())
        .find(op => op.symbol === '×3');

      op1?.apply([entity]); // 10 * 2 = 20
      op2?.apply([entity]); // 20 * 3 = 60

      expect(entity.attributes.get('value')).toBe(60);
    });
  });
});

