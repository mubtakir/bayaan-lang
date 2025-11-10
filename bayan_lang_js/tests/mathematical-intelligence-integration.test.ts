/**
 * اختبارات التكامل لأسس الذكاء الرياضي مع لغة البيان
 * Integration tests for Mathematical Intelligence Foundations with Bayan Language
 */

import {
  الذكاء_الرياضي,
  MathematicalIntelligence,
  أنشئ_خط_مستقيم,
  أنشئ_دالة_خطوة,
  أنشئ_منحنى_جرسي,
  أنشئ_موجة_مربعة,
  أنشئ_سيغمويد,
  أنشئ_معادلة_شكل,
  استنبط_معادلة,
  ارسم_معادلة,
  صدّر_إلى_svg
} from '../src/stdlib/math';

describe('🔗 التكامل مع لغة البيان - Integration with Bayan Language', () => {
  
  describe('📦 التصدير من المكتبة القياسية - Stdlib Exports', () => {
    
    test('✅ الذكاء_الرياضي متاح', () => {
      expect(الذكاء_الرياضي).toBeDefined();
      expect(الذكاء_الرياضي.سيغمويد_معممة).toBeDefined();
      expect(الذكاء_الرياضي.مكون_خطي).toBeDefined();
      expect(الذكاء_الرياضي.معادلة_الشكل_العام).toBeDefined();
      expect(الذكاء_الرياضي.محرك_الرسام).toBeDefined();
      expect(الذكاء_الرياضي.محرك_الاستنباط).toBeDefined();
    });
    
    test('✅ MathematicalIntelligence متاح (الاسم الإنجليزي)', () => {
      expect(MathematicalIntelligence).toBeDefined();
      expect(MathematicalIntelligence).toBe(الذكاء_الرياضي);
    });
    
    test('✅ الدوال المساعدة متاحة', () => {
      expect(الذكاء_الرياضي.دوال_مساعدة).toBeDefined();
      expect(الذكاء_الرياضي.دوال_مساعدة.خط_مستقيم).toBeDefined();
      expect(الذكاء_الرياضي.دوال_مساعدة.دالة_خطوة).toBeDefined();
      expect(الذكاء_الرياضي.دوال_مساعدة.منحنى_جرسي).toBeDefined();
      expect(الذكاء_الرياضي.دوال_مساعدة.موجة_مربعة).toBeDefined();
      expect(الذكاء_الرياضي.دوال_مساعدة.دالة_مثلثية).toBeDefined();
      expect(الذكاء_الرياضي.دوال_مساعدة.دائرة).toBeDefined();
    });
  });
  
  describe('🔧 الدوال المساعدة السريعة - Quick Helper Functions', () => {
    
    test('✅ أنشئ_خط_مستقيم', () => {
      const خط = أنشئ_خط_مستقيم(2, 3);
      expect(خط.evaluate(0)).toBeCloseTo(3, 1);
      expect(خط.evaluate(5)).toBeCloseTo(13, 1);
      expect(خط.evaluate(10)).toBeCloseTo(23, 1);
    });
    
    test('✅ أنشئ_دالة_خطوة', () => {
      const خطوة = أنشئ_دالة_خطوة(5, 1);
      expect(خطوة.evaluate(4)).toBeCloseTo(0, 0);
      expect(خطوة.evaluate(5)).toBeCloseTo(0.5, 0);
      expect(خطوة.evaluate(6)).toBeCloseTo(1, 0);
    });
    
    test('✅ أنشئ_منحنى_جرسي', () => {
      const جرس = أنشئ_منحنى_جرسي(0, 2, 1);
      const قيمة_المركز = جرس.evaluate(0);
      expect(قيمة_المركز).toBeGreaterThan(0.4);
      expect(قيمة_المركز).toBeLessThan(0.6);
    });
    
    test('✅ أنشئ_موجة_مربعة', () => {
      const موجة = أنشئ_موجة_مربعة(4, 1, 2);
      expect(موجة).toBeDefined();
      expect(موجة.evaluate).toBeDefined();
    });
    
    test('✅ أنشئ_سيغمويد', () => {
      const سيغمويد = أنشئ_سيغمويد(1, 1, 1, 0);
      expect(سيغمويد.evaluate(0)).toBeCloseTo(0.5, 1);
    });
    
    test('✅ أنشئ_معادلة_شكل', () => {
      const معادلة = أنشئ_معادلة_شكل();
      معادلة.setGlobalLinear({ beta: 0.5, gamma: 0 });
      expect(معادلة.evaluate(0)).toBeCloseTo(0, 1);
      expect(معادلة.evaluate(10)).toBeCloseTo(5, 1);
    });
  });
  
  describe('🎨 معادلة الشكل العام - General Shape Equation', () => {
    
    test('✅ معادلة بسيطة (خطي فقط)', () => {
      const معادلة = أنشئ_معادلة_شكل();
      معادلة.setGlobalLinear({ beta: 0.5, gamma: 0 });
      
      expect(معادلة.evaluate(0)).toBeCloseTo(0, 1);
      expect(معادلة.evaluate(10)).toBeCloseTo(5, 1);
    });
    
    test('✅ معادلة مركبة (خطي + سيغمويد)', () => {
      const معادلة = أنشئ_معادلة_شكل();
      معادلة.setGlobalLinear({ beta: 0.5, gamma: 0 });
      معادلة.addSigmoidTerm({
        alpha: 2,
        n: 1,
        k: 1,
        x0: 5
      });
      
      const قيمة_عند_5 = معادلة.evaluate(5);
      expect(قيمة_عند_5).toBeCloseTo(3.5, 0);
    });
    
    test('✅ شكل ورقة شجر مع خصائص بصرية', () => {
      const شكل_ورقة = أنشئ_معادلة_شكل();
      
      // الجزء السفلي (خط مستقيم)
      شكل_ورقة.setGlobalLinear({ beta: 0.1, gamma: 0 });
      
      // الجزء الأيسر (منحنى)
      شكل_ورقة.addSigmoidTerm({
        alpha: 2,
        n: 3,
        k: 50,
        x0: 2
      }, {
        lineColorStart: '#228B22',
        lineColorEnd: '#32CD32',
        lineWidthStart: 2,
        lineWidthEnd: 1
      });
      
      // الجزء الأيمن (منحنى)
      شكل_ورقة.addSigmoidTerm({
        alpha: -2,
        n: 3,
        k: 50,
        x0: 8
      }, {
        lineColorStart: '#32CD32',
        lineColorEnd: '#228B22',
        lineWidthStart: 1,
        lineWidthEnd: 2
      });
      
      expect(شكل_ورقة.evaluate(0)).toBeDefined();
      expect(شكل_ورقة.evaluate(5)).toBeDefined();
      expect(شكل_ورقة.evaluate(10)).toBeDefined();
    });
    
    test('✅ دالة مركبة معقدة (3 موجات + خط)', () => {
      const دالة_مركبة = أنشئ_معادلة_شكل();
      
      // خط أساسي
      دالة_مركبة.setGlobalLinear({ beta: 0.2, gamma: 1 });
      
      // موجة أولى
      دالة_مركبة.addSigmoidTerm({
        alpha: 1.5,
        n: 1,
        k: 2,
        x0: 2
      }, {
        lineColorStart: '#FF0000',
        lineColorEnd: '#FF6666'
      });
      
      // موجة ثانية
      دالة_مركبة.addSigmoidTerm({
        alpha: -1,
        n: 1,
        k: 2,
        x0: 5
      }, {
        lineColorStart: '#0000FF',
        lineColorEnd: '#6666FF'
      });
      
      // موجة ثالثة
      دالة_مركبة.addSigmoidTerm({
        alpha: 0.8,
        n: 1,
        k: 2,
        x0: 8
      }, {
        lineColorStart: '#00FF00',
        lineColorEnd: '#66FF66'
      });
      
      expect(دالة_مركبة.evaluate(0)).toBeDefined();
      expect(دالة_مركبة.evaluate(2)).toBeDefined();
      expect(دالة_مركبة.evaluate(5)).toBeDefined();
      expect(دالة_مركبة.evaluate(8)).toBeDefined();
      expect(دالة_مركبة.evaluate(10)).toBeDefined();
    });
  });
  
  describe('👁️ محرك العين المستنبطة - Inference Engine', () => {
    
    test('✅ استنباط خط مستقيم من نقاط', () => {
      const بيانات = [
        { x: 0, y: 1 },
        { x: 1, y: 3 },
        { x: 2, y: 5 },
        { x: 3, y: 7 }
      ];
      
      const معادلة = استنبط_معادلة(بيانات);
      
      expect(معادلة.evaluate(0)).toBeCloseTo(1, 0);
      expect(معادلة.evaluate(1)).toBeCloseTo(3, 0);
      expect(معادلة.evaluate(2)).toBeCloseTo(5, 0);
      expect(معادلة.evaluate(3)).toBeCloseTo(7, 0);
      
      // تنبؤ
      expect(معادلة.evaluate(4)).toBeCloseTo(9, 0);
    });
  });
  
  describe('🎨 محرك الرسام - Drawing Engine', () => {
    
    test('✅ رسم معادلة خط مستقيم', () => {
      const خط = أنشئ_خط_مستقيم(2, 3);
      const نتيجة = ارسم_معادلة(خط, {
        xRange: { min: 0, max: 10 },
        resolution: 100
      });

      expect(نتيجة).toBeDefined();
      expect(نتيجة.paths).toBeDefined();
      expect(نتيجة.paths.length).toBeGreaterThan(0);
      expect(نتيجة.metadata.pointCount).toBeGreaterThan(0);
    });
    
    test('✅ تصدير معادلة إلى SVG', () => {
      const جرس = أنشئ_منحنى_جرسي(0, 2, 1);
      const svg = صدّر_إلى_svg(جرس, {
        xRange: { min: -5, max: 5 },
        resolution: 100
      });
      
      expect(svg).toBeDefined();
      expect(typeof svg).toBe('string');
      expect(svg.length).toBeGreaterThan(0);
      expect(svg).toContain('svg');
    });
  });
  
  describe('🌟 سيناريوهات متقدمة - Advanced Scenarios', () => {
    
    test('✅ سيناريو كامل: إنشاء + رسم + تصدير', () => {
      // 1. إنشاء معادلة
      const معادلة = أنشئ_معادلة_شكل();
      معادلة.setGlobalLinear({ beta: 0.5, gamma: 0 });
      معادلة.addSigmoidTerm({
        alpha: 2,
        n: 1,
        k: 1,
        x0: 5
      });

      // 2. رسم المعادلة
      const رسم = ارسم_معادلة(معادلة, {
        xRange: { min: 0, max: 10 },
        resolution: 50
      });

      expect(رسم.paths).toBeDefined();
      expect(رسم.metadata.pointCount).toBeGreaterThan(0);

      // 3. تصدير إلى SVG
      const svg = صدّر_إلى_svg(معادلة, {
        xRange: { min: 0, max: 10 }
      });

      expect(svg).toContain('svg');
    });
    
    test('✅ سيناريو: استنباط + تقييم + رسم', () => {
      // 1. استنباط من بيانات
      const بيانات = [
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 }
      ];

      const معادلة = استنبط_معادلة(بيانات);

      // 2. تقييم
      expect(معادلة.evaluate(4)).toBeCloseTo(8, 0);

      // 3. رسم
      const رسم = ارسم_معادلة(معادلة, {
        xRange: { min: 0, max: 5 },
        resolution: 20
      });

      expect(رسم.paths).toBeDefined();
      expect(رسم.metadata.pointCount).toBeGreaterThan(0);
    });
  });
});

