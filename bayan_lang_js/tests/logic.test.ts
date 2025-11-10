/**
 * اختبارات المحرك المنطقي
 */

import { LogicEngine, Term, Predicate, Fact, Rule } from '../src/logic/logicEngine';

describe('المحرك المنطقي (Logic Engine)', () => {
  let engine: LogicEngine;

  beforeEach(() => {
    engine = new LogicEngine();
  });

  describe('الحقائق (Facts)', () => {
    test('يجب أن يضيف حقيقة ويسترجعها', () => {
      const fact = new Fact(
        new Predicate('والد', [
          new Term('أحمد', false),
          new Term('محمد', false),
        ])
      );

      engine.addFact(fact);

      const results = engine.query(
        new Predicate('والد', [
          new Term('أحمد', false),
          new Term('محمد', false),
        ])
      );

      expect(results.length).toBe(1);
    });

    test('يجب أن يسترجع حقائق متعددة', () => {
      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('أحمد', false),
            new Term('محمد', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('أحمد', false),
            new Term('فاطمة', false),
          ])
        )
      );

      const results = engine.query(
        new Predicate('والد', [
          new Term('أحمد', false),
          new Term('X', true),
        ])
      );

      expect(results.length).toBe(2);
      expect(results[0].get('X')).toBe('محمد');
      expect(results[1].get('X')).toBe('فاطمة');
    });
  });

  describe('القواعد (Rules)', () => {
    test('يجب أن يطبق قاعدة بسيطة', () => {
      // حقائق: والد(أحمد, محمد), والد(محمد, علي)
      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('أحمد', false),
            new Term('محمد', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('محمد', false),
            new Term('علي', false),
          ])
        )
      );

      // قاعدة: جد(X, Z) :- والد(X, Y), والد(Y, Z)
      engine.addRule(
        new Rule(
          new Predicate('جد', [
            new Term('X', true),
            new Term('Z', true),
          ]),
          [
            new Predicate('والد', [
              new Term('X', true),
              new Term('Y', true),
            ]),
            new Predicate('والد', [
              new Term('Y', true),
              new Term('Z', true),
            ]),
          ]
        )
      );

      // استعلام: جد(أحمد, ?)
      const results = engine.query(
        new Predicate('جد', [
          new Term('أحمد', false),
          new Term('Z', true),
        ])
      );

      expect(results.length).toBe(1);
      expect(results[0].get('Z')).toBe('علي');
    });

    test('يجب أن يطبق قواعد متعددة', () => {
      // حقائق
      engine.addFact(
        new Fact(new Predicate('رجل', [new Term('أحمد', false)]))
      );
      engine.addFact(
        new Fact(new Predicate('رجل', [new Term('محمد', false)]))
      );
      engine.addFact(
        new Fact(new Predicate('امرأة', [new Term('فاطمة', false)]))
      );

      // قاعدة: إنسان(X) :- رجل(X)
      engine.addRule(
        new Rule(
          new Predicate('إنسان', [new Term('X', true)]),
          [new Predicate('رجل', [new Term('X', true)])]
        )
      );

      // قاعدة: إنسان(X) :- امرأة(X)
      engine.addRule(
        new Rule(
          new Predicate('إنسان', [new Term('X', true)]),
          [new Predicate('امرأة', [new Term('X', true)])]
        )
      );

      // استعلام: إنسان(?)
      const results = engine.query(
        new Predicate('إنسان', [new Term('X', true)])
      );

      expect(results.length).toBe(3);
    });
  });

  describe('التوحيد (Unification)', () => {
    test('يجب أن يوحد متغيرين', () => {
      const results = engine.query(
        new Predicate('test', [
          new Term('X', true),
          new Term('Y', true),
        ])
      );

      // لا توجد حقائق، لذا لا نتائج
      expect(results.length).toBe(0);
    });

    test('يجب أن يوحد متغير مع قيمة', () => {
      engine.addFact(
        new Fact(
          new Predicate('لون', [
            new Term('سماء', false),
            new Term('أزرق', false),
          ])
        )
      );

      const results = engine.query(
        new Predicate('لون', [
          new Term('سماء', false),
          new Term('X', true),
        ])
      );

      expect(results.length).toBe(1);
      expect(results[0].get('X')).toBe('أزرق');
    });

    test('يجب أن يفشل التوحيد عند عدم التطابق', () => {
      engine.addFact(
        new Fact(
          new Predicate('لون', [
            new Term('سماء', false),
            new Term('أزرق', false),
          ])
        )
      );

      const results = engine.query(
        new Predicate('لون', [
          new Term('سماء', false),
          new Term('أحمر', false),
        ])
      );

      expect(results.length).toBe(0);
    });
  });

  describe('الرجوع للخلف (Backtracking)', () => {
    test('يجب أن يرجع للخلف عند الفشل', () => {
      // حقائق
      engine.addFact(
        new Fact(
          new Predicate('يحب', [
            new Term('أحمد', false),
            new Term('برمجة', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('يحب', [
            new Term('محمد', false),
            new Term('رياضيات', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('صعب', [new Term('رياضيات', false)])
        )
      );

      // قاعدة: يحب_صعب(X, Y) :- يحب(X, Y), صعب(Y)
      engine.addRule(
        new Rule(
          new Predicate('يحب_صعب', [
            new Term('X', true),
            new Term('Y', true),
          ]),
          [
            new Predicate('يحب', [
              new Term('X', true),
              new Term('Y', true),
            ]),
            new Predicate('صعب', [new Term('Y', true)]),
          ]
        )
      );

      const results = engine.query(
        new Predicate('يحب_صعب', [
          new Term('X', true),
          new Term('Y', true),
        ])
      );

      expect(results.length).toBe(1);
      expect(results[0].get('X')).toBe('محمد');
      expect(results[0].get('Y')).toBe('رياضيات');
    });
  });

  describe('استعلامات معقدة', () => {
    test('يجب أن يحل مسألة شجرة العائلة', () => {
      // حقائق الوالدين
      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('إبراهيم', false),
            new Term('أحمد', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('أحمد', false),
            new Term('محمد', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('أحمد', false),
            new Term('فاطمة', false),
          ])
        )
      );

      engine.addFact(
        new Fact(
          new Predicate('والد', [
            new Term('محمد', false),
            new Term('علي', false),
          ])
        )
      );

      // قاعدة الجد
      engine.addRule(
        new Rule(
          new Predicate('جد', [
            new Term('X', true),
            new Term('Z', true),
          ]),
          [
            new Predicate('والد', [
              new Term('X', true),
              new Term('Y', true),
            ]),
            new Predicate('والد', [
              new Term('Y', true),
              new Term('Z', true),
            ]),
          ]
        )
      );

      // قاعدة الجد الأكبر
      engine.addRule(
        new Rule(
          new Predicate('جد_أكبر', [
            new Term('X', true),
            new Term('Z', true),
          ]),
          [
            new Predicate('والد', [
              new Term('X', true),
              new Term('Y', true),
            ]),
            new Predicate('جد', [
              new Term('Y', true),
              new Term('Z', true),
            ]),
          ]
        )
      );

      // استعلام: من هو جد علي؟
      const جد_results = engine.query(
        new Predicate('جد', [
          new Term('X', true),
          new Term('علي', false),
        ])
      );

      expect(جد_results.length).toBe(1);
      expect(جد_results[0].get('X')).toBe('أحمد');

      // استعلام: من هو الجد الأكبر لعلي؟
      const جد_أكبر_results = engine.query(
        new Predicate('جد_أكبر', [
          new Term('X', true),
          new Term('علي', false),
        ])
      );

      expect(جد_أكبر_results.length).toBe(1);
      expect(جد_أكبر_results[0].get('X')).toBe('إبراهيم');
    });
  });

  describe('التعويض (Substitution)', () => {
    test('يجب أن يطبق التعويضات بشكل صحيح', () => {
      engine.addFact(
        new Fact(
          new Predicate('يساوي', [
            new Term('س', false),
            new Term('5', false),
          ])
        )
      );

      const results = engine.query(
        new Predicate('يساوي', [
          new Term('X', true),
          new Term('Y', true),
        ])
      );

      expect(results.length).toBe(1);
      expect(results[0].get('X')).toBe('س');
      expect(results[0].get('Y')).toBe('5');
    });
  });
});

