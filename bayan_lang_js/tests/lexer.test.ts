/**
 * اختبارات المحلل المعجمي
 */

import { Lexer } from '../src/lexer/lexer';
import { TokenType } from '../src/lexer/tokens';

describe('المحلل المعجمي (Lexer)', () => {
  describe('الكلمات المفتاحية', () => {
    test('يجب أن يتعرف على الكلمات المفتاحية العربية', () => {
      const lexer = new Lexer('متغير ثابت دالة صنف إذا وإلا');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.VAR);
      expect(tokens[1].type).toBe(TokenType.CONST);
      expect(tokens[2].type).toBe(TokenType.FUNCTION);
      expect(tokens[3].type).toBe(TokenType.CLASS);
      expect(tokens[4].type).toBe(TokenType.IF);
      expect(tokens[5].type).toBe(TokenType.ELSE);
    });

    test('يجب أن يتعرف على كلمات البرمجة المنطقية', () => {
      const lexer = new Lexer('حقيقة قاعدة استعلام');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.FACT);
      expect(tokens[1].type).toBe(TokenType.RULE);
      expect(tokens[2].type).toBe(TokenType.QUERY);
    });
  });

  describe('المعرفات', () => {
    test('يجب أن يتعرف على المعرفات العربية', () => {
      const lexer = new Lexer('اسم عدد_الطلاب مجموع_الدرجات');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
      expect(tokens[0].value).toBe('اسم');
      expect(tokens[1].type).toBe(TokenType.IDENTIFIER);
      expect(tokens[1].value).toBe('عدد_الطلاب');
      expect(tokens[2].type).toBe(TokenType.IDENTIFIER);
      expect(tokens[2].value).toBe('مجموع_الدرجات');
    });

    test('يجب أن يتعرف على المعرفات الإنجليزية', () => {
      const lexer = new Lexer('name studentCount totalGrades');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.IDENTIFIER);
      expect(tokens[0].value).toBe('name');
      expect(tokens[1].type).toBe(TokenType.IDENTIFIER);
      expect(tokens[1].value).toBe('studentCount');
      expect(tokens[2].type).toBe(TokenType.IDENTIFIER);
      expect(tokens[2].value).toBe('totalGrades');
    });
  });

  describe('الأرقام', () => {
    test('يجب أن يتعرف على الأعداد الصحيحة', () => {
      const lexer = new Lexer('42 0 123');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.NUMBER);
      expect(tokens[0].value).toBe(42);
      expect(tokens[1].type).toBe(TokenType.NUMBER);
      expect(tokens[1].value).toBe(0);
      expect(tokens[2].type).toBe(TokenType.NUMBER);
      expect(tokens[2].value).toBe(123);
    });

    test('يجب أن يتعرف على الأعداد العشرية', () => {
      const lexer = new Lexer('3.14 0.5 123.456');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.NUMBER);
      expect(tokens[0].value).toBe(3.14);
      expect(tokens[1].type).toBe(TokenType.NUMBER);
      expect(tokens[1].value).toBe(0.5);
      expect(tokens[2].type).toBe(TokenType.NUMBER);
      expect(tokens[2].value).toBe(123.456);
    });

    test('يجب أن يتعرف على الأعداد بالصيغة العلمية', () => {
      const lexer = new Lexer('1e5 2.5e-3 3.14e+2');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.NUMBER);
      expect(tokens[0].value).toBe(1e5);
      expect(tokens[1].type).toBe(TokenType.NUMBER);
      expect(tokens[1].value).toBe(2.5e-3);
      expect(tokens[2].type).toBe(TokenType.NUMBER);
      expect(tokens[2].value).toBe(3.14e+2);
    });
  });

  describe('النصوص', () => {
    test('يجب أن يتعرف على النصوص بعلامات الاقتباس المزدوجة', () => {
      const lexer = new Lexer('"مرحبا" "عالم"');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.STRING);
      expect(tokens[0].value).toBe('مرحبا');
      expect(tokens[1].type).toBe(TokenType.STRING);
      expect(tokens[1].value).toBe('عالم');
    });

    test('يجب أن يتعرف على النصوص بعلامات الاقتباس المفردة', () => {
      const lexer = new Lexer("'مرحبا' 'عالم'");
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.STRING);
      expect(tokens[0].value).toBe('مرحبا');
      expect(tokens[1].type).toBe(TokenType.STRING);
      expect(tokens[1].value).toBe('عالم');
    });

    test('يجب أن يتعامل مع رموز الهروب', () => {
      const lexer = new Lexer('"سطر\\nجديد" "علامة\\tتبويب"');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.STRING);
      expect(tokens[0].value).toBe('سطر\nجديد');
      expect(tokens[1].type).toBe(TokenType.STRING);
      expect(tokens[1].value).toBe('علامة\tتبويب');
    });
  });

  describe('العمليات', () => {
    test('يجب أن يتعرف على العمليات الحسابية', () => {
      const lexer = new Lexer('+ - * / %');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.PLUS);
      expect(tokens[1].type).toBe(TokenType.MINUS);
      expect(tokens[2].type).toBe(TokenType.MULTIPLY);
      expect(tokens[3].type).toBe(TokenType.DIVIDE);
      expect(tokens[4].type).toBe(TokenType.MODULO);
    });

    test('يجب أن يتعرف على عمليات المقارنة', () => {
      const lexer = new Lexer('== != < > <= >=');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.EQUALS);
      expect(tokens[1].type).toBe(TokenType.NOT_EQUALS);
      expect(tokens[2].type).toBe(TokenType.LESS_THAN);
      expect(tokens[3].type).toBe(TokenType.GREATER_THAN);
      expect(tokens[4].type).toBe(TokenType.LESS_EQUALS);
      expect(tokens[5].type).toBe(TokenType.GREATER_EQUALS);
    });

    test('يجب أن يتعرف على العمليات المنطقية', () => {
      const lexer = new Lexer('&& || not');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.AND);
      expect(tokens[1].type).toBe(TokenType.OR);
      expect(tokens[2].type).toBe(TokenType.NOT);
    });
  });

  describe('التعليقات', () => {
    test('يجب أن يتجاهل التعليقات أحادية السطر', () => {
      const lexer = new Lexer('متغير س = 5; // هذا تعليق\nمتغير ص = 10;');
      const tokens = lexer.tokenize();

      // يجب ألا تحتوي الرموز على التعليق
      const hasComment = tokens.some(t => t.value && t.value.toString().includes('تعليق'));
      expect(hasComment).toBe(false);
    });

    test('يجب أن يتجاهل التعليقات متعددة الأسطر', () => {
      const lexer = new Lexer('متغير س = 5; /* هذا تعليق\nمتعدد الأسطر */ متغير ص = 10;');
      const tokens = lexer.tokenize();

      // يجب ألا تحتوي الرموز على التعليق
      const hasComment = tokens.some(t => t.value && t.value.toString().includes('تعليق'));
      expect(hasComment).toBe(false);
    });
  });

  describe('القيم الخاصة', () => {
    test('يجب أن يتعرف على القيم المنطقية', () => {
      const lexer = new Lexer('صحيح خطأ');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.TRUE);
      expect(tokens[1].type).toBe(TokenType.FALSE);
    });

    test('يجب أن يتعرف على null', () => {
      const lexer = new Lexer('عدم');
      const tokens = lexer.tokenize();

      expect(tokens[0].type).toBe(TokenType.NULL);
    });
  });

  describe('معلومات الموقع', () => {
    test('يجب أن يتتبع أرقام الأسطر', () => {
      const lexer = new Lexer('متغير س = 5;\nمتغير ص = 10;');
      const tokens = lexer.tokenize();

      expect(tokens[0].line).toBe(1);
      expect(tokens.find(t => t.value === 'ص')?.line).toBe(2);
    });

    test('يجب أن يتتبع أرقام الأعمدة', () => {
      const lexer = new Lexer('متغير س = 5;');
      const tokens = lexer.tokenize();

      expect(tokens[0].column).toBe(1);
      expect(tokens[1].column).toBeGreaterThan(tokens[0].column);
    });
  });

  describe('حالات الخطأ', () => {
    test('يجب أن يرمي خطأ عند وجود حرف غير صالح', () => {
      const lexer = new Lexer('متغير س = @;');
      
      expect(() => lexer.tokenize()).toThrow();
    });

    test('يجب أن يرمي خطأ عند وجود نص غير مغلق', () => {
      const lexer = new Lexer('"نص غير مغلق');
      
      expect(() => lexer.tokenize()).toThrow();
    });
  });
});

