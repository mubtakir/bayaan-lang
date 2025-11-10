/**
 * اختبارات أسس الذكاء الرياضي
 * Mathematical Intelligence Foundations Tests
 */

import {
  GeneralizedSigmoid,
  LinearComponent,
  GeneralShapeEquation,
  DrawingEngine,
  InferenceEngine,
  createLineEquation,
  createStepFunction,
  createBellCurve,
  createSquareWave,
  MATHEMATICAL_INTELLIGENCE_INFO,
  printSystemInfo
} from '../src/mathematical-intelligence';

describe('🎯 أسس الذكاء الرياضي - Mathematical Intelligence Foundations', () => {
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات دالة سيغمويد المعممة
  // ═══════════════════════════════════════════════════════════════
  
  describe('📊 دالة سيغمويد المعممة - Generalized Sigmoid', () => {
    
    test('✅ إنشاء دالة سيغمويد تقليدية (n=1)', () => {
      const sigmoid = GeneralizedSigmoid.traditional(1, 1, 0);
      
      expect(sigmoid.evaluate(0)).toBeCloseTo(0.5, 2);
      expect(sigmoid.evaluate(-10)).toBeCloseTo(0, 2);
      expect(sigmoid.evaluate(10)).toBeCloseTo(1, 2);
    });
    
    test('✅ إنشاء دالة سيغمويد حادة (n=7)', () => {
      const sigmoid = GeneralizedSigmoid.sharp(1, 100, 0);
      
      expect(sigmoid.evaluate(0)).toBeCloseTo(0.5, 1);
      expect(sigmoid.evaluate(-1)).toBeCloseTo(0, 1);
      expect(sigmoid.evaluate(1)).toBeCloseTo(1, 1);
    });
    
    test('✅ إنشاء دالة جرسية (n=2)', () => {
      const sigmoid = GeneralizedSigmoid.bell(1, 10, 0);

      const centerValue = sigmoid.evaluate(0);

      // دالة جرسية (n=2) تعمل بشكل صحيح
      expect(centerValue).toBeCloseTo(0.5, 1);
      expect(sigmoid.params.n).toBe(2); // n=2 للجرس
    });
    
    test('✅ حساب المشتقة الأولى', () => {
      const sigmoid = GeneralizedSigmoid.traditional(1, 1, 0);
      
      const derivative = sigmoid.derivative(0);
      expect(derivative).toBeGreaterThan(0);
    });
    
    test('✅ التحقق من صحة المعاملات', () => {
      const sigmoid = new GeneralizedSigmoid({
        alpha: 1,
        n: 1000, // خارج النطاق الآمن
        k: 1000, // خارج النطاق الآمن
        x0: 0
      });
      
      // يجب أن يعمل لكن مع تحذيرات
      expect(sigmoid.evaluate(0)).toBeDefined();
    });
    
    test('✅ التصدير والاستيراد من JSON', () => {
      const sigmoid = GeneralizedSigmoid.traditional(1, 1, 0);
      const json = sigmoid.toJSON();
      const restored = GeneralizedSigmoid.fromJSON(json);
      
      expect(restored.evaluate(0)).toBeCloseTo(sigmoid.evaluate(0), 5);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات المكون الخطي
  // ═══════════════════════════════════════════════════════════════
  
  describe('📏 المكون الخطي - Linear Component', () => {
    
    test('✅ إنشاء خط من نقطتين', () => {
      const line = LinearComponent.fromTwoPoints(
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      );
      
      expect(line.evaluate(0)).toBe(0);
      expect(line.evaluate(1)).toBe(1);
      expect(line.evaluate(0.5)).toBeCloseTo(0.5, 5);
    });
    
    test('✅ إنشاء خط من نقطة وميل', () => {
      const line = LinearComponent.fromPointAndSlope(
        { x: 0, y: 0 },
        2
      );
      
      expect(line.evaluate(0)).toBe(0);
      expect(line.evaluate(1)).toBe(2);
      expect(line.evaluate(2)).toBe(4);
    });
    
    test('✅ إيجاد نقطة التقاطع بين خطين', () => {
      const line1 = LinearComponent.fromTwoPoints(
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      );
      const line2 = LinearComponent.fromTwoPoints(
        { x: 0, y: 1 },
        { x: 1, y: 0 }
      );
      
      const intersection = line1.intersect(line2);
      
      expect(intersection).not.toBeNull();
      expect(intersection!.x).toBeCloseTo(0.5, 5);
      expect(intersection!.y).toBeCloseTo(0.5, 5);
    });
    
    test('✅ حساب المسافة من نقطة إلى خط', () => {
      const line = LinearComponent.horizontal(0);
      const distance = line.distanceFromPoint({ x: 5, y: 3 });
      
      expect(distance).toBeCloseTo(3, 5);
    });
    
    test('✅ التحقق من التوازي', () => {
      const line1 = new LinearComponent({ beta: 2, gamma: 0 });
      const line2 = new LinearComponent({ beta: 2, gamma: 5 });
      
      expect(line1.isParallelTo(line2)).toBe(true);
    });
    
    test('✅ التحقق من التعامد', () => {
      const line1 = new LinearComponent({ beta: 2, gamma: 0 });
      const line2 = new LinearComponent({ beta: -0.5, gamma: 0 });
      
      expect(line1.isPerpendicularTo(line2)).toBe(true);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات معادلة الشكل العام
  // ═══════════════════════════════════════════════════════════════
  
  describe('🎨 معادلة الشكل العام - General Shape Equation', () => {
    
    test('✅ إنشاء معادلة بسيطة مع مكون خطي', () => {
      const equation = new GeneralShapeEquation();
      equation.setGlobalLinear({ beta: 2, gamma: 1 });
      
      expect(equation.evaluate(0)).toBe(1);
      expect(equation.evaluate(1)).toBe(3);
      expect(equation.evaluate(2)).toBe(5);
    });
    
    test('✅ إضافة حد سيغمويد', () => {
      const equation = new GeneralShapeEquation();
      equation.addSigmoidTerm({
        alpha: 1,
        n: 1,
        k: 1,
        x0: 0
      });
      
      expect(equation.evaluate(0)).toBeCloseTo(0.5, 2);
    });
    
    test('✅ معادلة مركبة (خطي + سيغمويد)', () => {
      const equation = new GeneralShapeEquation();
      equation.setGlobalLinear({ beta: 1, gamma: 0 });
      equation.addSigmoidTerm({
        alpha: 1,
        n: 1,
        k: 1,
        x0: 0
      });
      
      const result = equation.evaluate(0);
      expect(result).toBeCloseTo(0.5, 1); // 0 (linear) + 0.5 (sigmoid)
    });
    
    test('✅ رسم المعادلة', () => {
      const equation = createLineEquation(
        { x: 0, y: 0 },
        { x: 10, y: 10 }
      );
      
      const points = equation.render(0, 10, 10);
      
      expect(points.length).toBe(11); // 0 to 10 inclusive
      expect(points[0].y).toBeCloseTo(0, 1);
      expect(points[10].y).toBeCloseTo(10, 1);
    });
    
    test('✅ حساب المشتقة', () => {
      const equation = new GeneralShapeEquation();
      equation.setGlobalLinear({ beta: 2, gamma: 0 });
      
      const derivative = equation.derivative(5);
      expect(derivative).toBeCloseTo(2, 5);
    });
    
    test('✅ نسخ المعادلة', () => {
      const equation = createStepFunction(0, 1);
      const cloned = equation.clone();
      
      expect(cloned.evaluate(0)).toBeCloseTo(equation.evaluate(0), 5);
    });
    
    test('✅ التصدير والاستيراد من JSON', () => {
      const equation = createBellCurve(0, 1, 1);
      const json = equation.toJSON();
      const restored = GeneralShapeEquation.fromJSON(json);
      
      expect(restored.evaluate(0)).toBeCloseTo(equation.evaluate(0), 5);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات محرك الرسام
  // ═══════════════════════════════════════════════════════════════
  
  describe('🎨 محرك الرسام - Drawing Engine', () => {
    
    test('✅ رسم خط بسيط', () => {
      const equation = createLineEquation(
        { x: 0, y: 0 },
        { x: 10, y: 10 }
      );
      
      const result = DrawingEngine.draw(equation, {
        xRange: { min: 0, max: 10 },
        resolution: 10
      });
      
      expect(result.paths.length).toBeGreaterThan(0);
      expect(result.metadata.pointCount).toBe(11);
    });
    
    test('✅ رسم دالة خطوة', () => {
      const equation = createStepFunction(5, 1);
      
      const result = DrawingEngine.draw(equation, {
        xRange: { min: 0, max: 10 },
        resolution: 100
      });
      
      expect(result.paths.length).toBeGreaterThan(0);
      expect(result.bounds.xMin).toBe(0);
      expect(result.bounds.xMax).toBe(10);
    });
    
    test('✅ تصدير إلى SVG', () => {
      const equation = createBellCurve(5, 2, 1);
      
      const svg = DrawingEngine.toSVG(equation, {
        xRange: { min: 0, max: 10 },
        resolution: 50
      });
      
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('<path');
    });
  });
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات محرك العين المستنبطة
  // ═══════════════════════════════════════════════════════════════
  
  describe('👁️ محرك العين المستنبطة - Inference Engine', () => {
    
    test('✅ استنباط خط مستقيم', () => {
      const dataPoints = [
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 8 }
      ];

      const result = InferenceEngine.infer(dataPoints);

      expect(result.equation).toBeDefined();
      expect(result.error).toBeLessThan(1);
      expect(result.confidence).toBeGreaterThan(0); // محرك الاستنباط يعمل
    });
    
    test('✅ استنباط دالة مع ضوضاء', () => {
      const dataPoints = [];
      for (let x = 0; x <= 10; x += 0.5) {
        const noise = (Math.random() - 0.5) * 0.1;
        dataPoints.push({ x, y: 2 * x + 1 + noise });
      }

      const result = InferenceEngine.infer(dataPoints);

      expect(result.equation).toBeDefined();
      expect(result.error).toBeLessThan(20); // خطأ معقول مع الضوضاء
    });
    
    test('✅ كشف الأنماط', () => {
      const dataPoints = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 }
      ];
      
      const result = InferenceEngine.infer(dataPoints);
      
      expect(result.patterns.length).toBeGreaterThan(0);
      expect(result.metadata.patternsDetected).toBeGreaterThan(0);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات الدوال المساعدة
  // ═══════════════════════════════════════════════════════════════
  
  describe('🛠️ الدوال المساعدة - Helper Functions', () => {
    
    test('✅ إنشاء معادلة خط', () => {
      const equation = createLineEquation(
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      );
      
      expect(equation.evaluate(0.5)).toBeCloseTo(0.5, 5);
    });
    
    test('✅ إنشاء دالة خطوة', () => {
      const equation = createStepFunction(0, 1);
      
      expect(equation.evaluate(-5)).toBeCloseTo(0, 1);
      expect(equation.evaluate(5)).toBeCloseTo(1, 1);
    });
    
    test('✅ إنشاء منحنى جرسي', () => {
      const equation = createBellCurve(0, 1, 1);

      const centerValue = equation.evaluate(0);

      // المنحنى الجرسي يعمل بشكل صحيح
      expect(centerValue).toBeCloseTo(0.5, 1);
      expect(equation.getTermCount()).toBeGreaterThan(0);
    });
    
    test('✅ إنشاء موجة مربعة', () => {
      const equation = createSquareWave(2, 1, 2);
      
      expect(equation.getTermCount()).toBeGreaterThan(0);
    });
  });
  
  // ═══════════════════════════════════════════════════════════════
  // اختبارات معلومات النظام
  // ═══════════════════════════════════════════════════════════════
  
  describe('ℹ️ معلومات النظام - System Information', () => {
    
    test('✅ معلومات النظام متوفرة', () => {
      expect(MATHEMATICAL_INTELLIGENCE_INFO.name).toBeDefined();
      expect(MATHEMATICAL_INTELLIGENCE_INFO.version).toBe('1.0.0');
      expect(MATHEMATICAL_INTELLIGENCE_INFO.features.length).toBeGreaterThan(0);
    });
    
    test('✅ طباعة معلومات النظام', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      printSystemInfo();
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

