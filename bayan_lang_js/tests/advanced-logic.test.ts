/**
 * اختبارات شاملة للميزات المنطقية المتقدمة في لغة البيان
 * Comprehensive tests for advanced logic features in Bayan language
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { LogicEngine, Fact, Rule, Predicate, Term, Substitution } from '../src/logic/logicEngine';

describe('Advanced Logic Features - الميزات المنطقية المتقدمة', () => {
  let engine: LogicEngine;

  beforeEach(() => {
    engine = new LogicEngine();
  });

  // ============================================================================
  // اختبارات النفي كفشل (Negation as Failure)
  // ============================================================================

  describe('Negation as Failure - النفي كفشل', () => {
    it('should succeed when goal cannot be proven - English', () => {
      // حقيقة: والد("أحمد", "علي")
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Ali', false)
      ])));

      // استعلام: ليس والد("أحمد", "سارة")
      const goal = new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Sara', false)
      ]);

      const result = engine.negationAsFailure(goal);
      expect(result).toBe(true); // يجب أن ينجح لأن "أحمد" ليس والد "سارة"
    });

    it('should fail when goal can be proven - العربية', () => {
      // حقيقة: والد("أحمد", "علي")
      engine.addFact(new Fact(new Predicate('والد', [
        new Term('أحمد', false),
        new Term('علي', false)
      ])));

      // استعلام: ليس والد("أحمد", "علي")
      const goal = new Predicate('والد', [
        new Term('أحمد', false),
        new Term('علي', false)
      ]);

      const result = engine.negationAsFailure(goal);
      expect(result).toBe(false); // يجب أن يفشل لأن "أحمد" هو والد "علي"
    });

    it('should work with variables', () => {
      engine.addFact(new Fact(new Predicate('married', [new Term('John', false)])));
      
      const goal = new Predicate('married', [new Term('x', true)]);
      const result = engine.negationAsFailure(goal);
      
      expect(result).toBe(false); // يوجد شخص متزوج
    });
  });

  // ============================================================================
  // اختبارات عامل القطع (Cut Operator)
  // ============================================================================

  describe('Cut Operator - عامل القطع', () => {
    it('should prevent backtracking after cut', () => {
      // قاعدة بسيطة: first(?X) :- cut
      // قاعدة: second(?X)

      engine.addFact(new Fact(new Predicate('option', [new Term('a', false)])));
      engine.addFact(new Fact(new Predicate('option', [new Term('b', false)])));
      engine.addFact(new Fact(new Predicate('option', [new Term('c', false)])));

      engine.addRule(new Rule(
        new Predicate('test', [new Term('X', true)]),
        [
          new Predicate('option', [new Term('X', true)]),
          new Predicate('cut', [])
        ]
      ));

      // استعلام: test(?X)
      const goal = new Predicate('test', [new Term('X', true)]);
      const solutions = engine.query(goal);

      // يجب أن يكون هناك حل واحد فقط بسبب القطع (الخيار الأول 'a')
      expect(solutions.length).toBe(1);
      expect(solutions[0].get('X')).toBe('a');
    });
  });

  // ============================================================================
  // اختبارات FindAll/BagOf/SetOf
  // ============================================================================

  describe('FindAll/BagOf/SetOf - جمع الحلول', () => {
    beforeEach(() => {
      // إضافة حقائق للاختبار
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Ali', false)
      ])));
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Sara', false)
      ])));
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Omar', false)
      ])));
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Fatima', false),
        new Term('Ali', false)
      ])));
    });

    it('should collect all solutions with findAll - English', () => {
      const template = new Term('X', true);
      const goal = new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('X', true)
      ]);

      const results = engine.findAll(template, goal);
      
      expect(results).toHaveLength(3);
      expect(results).toContain('Ali');
      expect(results).toContain('Sara');
      expect(results).toContain('Omar');
    });

    it('should collect all solutions with bagOf - العربية', () => {
      const template = new Term('س', true);
      const goal = new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('س', true)
      ]);

      const results = engine.bagOf(template, goal);
      
      expect(results).toHaveLength(3);
    });

    it('should collect unique solutions with setOf', () => {
      // إضافة حقيقة مكررة
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Ali', false)
      ])));

      const template = new Term('X', true);
      const goal = new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('X', true)
      ]);

      const results = engine.setOf(template, goal);
      
      // setOf يجب أن يزيل التكرارات
      expect(results).toHaveLength(3);
      expect(new Set(results).size).toBe(3);
    });

    it('should return empty array when no solutions exist', () => {
      const template = new Term('X', true);
      const goal = new Predicate('parent', [
        new Term('NonExistent', false),
        new Term('X', true)
      ]);

      const results = engine.findAll(template, goal);
      expect(results).toHaveLength(0);
    });
  });

  // ============================================================================
  // اختبارات Assert/Retract الديناميكي
  // ============================================================================

  describe('Dynamic Assert/Retract - الإضافة والحذف الديناميكي', () => {
    it('should add facts dynamically with assertFact - English', () => {
      const predicate = new Predicate('likes', [
        new Term('John', false),
        new Term('Pizza', false)
      ]);

      engine.assertFact(predicate);

      const goal = new Predicate('likes', [
        new Term('John', false),
        new Term('Pizza', false)
      ]);

      const solutions = engine.query(goal);
      expect(solutions).toHaveLength(1);
    });

    it('should remove facts dynamically with retractFact - العربية', () => {
      // إضافة حقيقة
      const predicate = new Predicate('يحب', [
        new Term('أحمد', false),
        new Term('البرمجة', false)
      ]);

      engine.assertFact(predicate);

      // التحقق من وجودها
      let solutions = engine.query(predicate);
      expect(solutions).toHaveLength(1);

      // حذف الحقيقة
      const removed = engine.retractFact(predicate);
      expect(removed).toBe(true);

      // التحقق من عدم وجودها
      solutions = engine.query(predicate);
      expect(solutions).toHaveLength(0);
    });

    it('should add rules dynamically with assertRule', () => {
      const head = new Predicate('grandparent', [
        new Term('X', true),
        new Term('Z', true)
      ]);

      const body = [
        new Predicate('parent', [new Term('X', true), new Term('Y', true)]),
        new Predicate('parent', [new Term('Y', true), new Term('Z', true)])
      ];

      engine.assertRule(head, body);

      // إضافة حقائق للاختبار
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ahmed', false),
        new Term('Ali', false)
      ])));
      engine.addFact(new Fact(new Predicate('parent', [
        new Term('Ali', false),
        new Term('Omar', false)
      ])));

      const goal = new Predicate('grandparent', [
        new Term('Ahmed', false),
        new Term('Omar', false)
      ]);

      const solutions = engine.query(goal);
      expect(solutions).toHaveLength(1);
    });
  });

  // ============================================================================
  // اختبارات التقييم الحسابي (Arithmetic Evaluation)
  // ============================================================================

  describe('Arithmetic Evaluation - التقييم الحسابي', () => {
    it('should evaluate arithmetic expressions with is', () => {
      const result = new Term('X', true);
      const expression = 5 + 3;
      const sub = new Substitution();

      const newSub = engine.evaluateArithmetic(result, expression, sub);
      
      expect(newSub).not.toBeNull();
      expect(newSub?.get('X')).toBe(8);
    });

    it('should evaluate string expressions', () => {
      const result = new Term('Y', true);
      const expression = '10 * 2';
      const sub = new Substitution();

      const newSub = engine.evaluateArithmetic(result, expression, sub);
      
      expect(newSub).not.toBeNull();
      expect(newSub?.get('Y')).toBe(20);
    });

    it('should compare values with greaterThan', () => {
      expect(engine.greaterThan(10, 5)).toBe(true);
      expect(engine.greaterThan(5, 10)).toBe(false);
      expect(engine.greaterThan(5, 5)).toBe(false);
    });

    it('should compare values with lessThan', () => {
      expect(engine.lessThan(5, 10)).toBe(true);
      expect(engine.lessThan(10, 5)).toBe(false);
      expect(engine.lessThan(5, 5)).toBe(false);
    });

    it('should compare values with arithmeticEqual', () => {
      expect(engine.arithmeticEqual(5, 5)).toBe(true);
      expect(engine.arithmeticEqual(5, 10)).toBe(false);
      expect(engine.arithmeticEqual('5', 5)).toBe(true);
    });
  });
});

