/**
 * اختبارات المحلل النحوي
 */

import { Lexer } from '../src/lexer/lexer';
import { Parser } from '../src/parser/parser';
import * as AST from '../src/ast/ast';

describe('المحلل النحوي (Parser)', () => {
  const parse = (code: string) => {
    const lexer = new Lexer(code);
    const tokens = lexer.tokenize();
    const parser = new Parser(tokens);
    return parser.parse();
  };

  describe('تعريف المتغيرات', () => {
    test('يجب أن يحلل تعريف متغير بسيط', () => {
      const ast = parse('متغير س = 5;');
      
      expect(ast.type).toBe('Program');
      expect(ast.body.length).toBe(1);
      expect(ast.body[0].type).toBe('VariableDeclaration');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      expect(varDecl.kind).toBe('متغير');
      expect(varDecl.declarations.length).toBe(1);
      expect(varDecl.declarations[0].id.name).toBe('س');
    });

    test('يجب أن يحلل تعريف ثابت', () => {
      const ast = parse('ثابت باي = 3.14;');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      expect(varDecl.kind).toBe('ثابت');
      expect(varDecl.declarations[0].id.name).toBe('باي');
    });

    test('يجب أن يحلل تعريف متغيرات متعددة', () => {
      const ast = parse('متغير س = 1, ص = 2, ع = 3;');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      expect(varDecl.declarations.length).toBe(3);
      expect(varDecl.declarations[0].id.name).toBe('س');
      expect(varDecl.declarations[1].id.name).toBe('ص');
      expect(varDecl.declarations[2].id.name).toBe('ع');
    });
  });

  describe('تعريف الدوال', () => {
    test('يجب أن يحلل دالة بسيطة', () => {
      const ast = parse('دالة جمع(أ, ب) { ارجع أ + ب; }');
      
      expect(ast.body[0].type).toBe('FunctionDeclaration');
      
      const funcDecl = ast.body[0] as AST.FunctionDeclaration;
      expect(funcDecl.name.name).toBe('جمع');
      expect(funcDecl.parameters.length).toBe(2);
      expect(funcDecl.parameters[0].name.name).toBe('أ');
      expect(funcDecl.parameters[1].name.name).toBe('ب');
    });

    test('يجب أن يحلل دالة غير متزامنة', () => {
      const ast = parse('غير_متزامن دالة احضر_بيانات() { انتظر fetch(); }');
      
      const funcDecl = ast.body[0] as AST.FunctionDeclaration;
      expect(funcDecl.isAsync).toBe(true);
    });

    test('يجب أن يحلل دالة سهمية', () => {
      const ast = parse('ثابت مربع = (س) => س * س;');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      const init = varDecl.declarations[0].init as AST.ArrowFunctionExpression;
      expect(init.type).toBe('ArrowFunctionExpression');
      expect(init.parameters.length).toBe(1);
    });
  });

  describe('تعريف الأصناف', () => {
    test('يجب أن يحلل صنف بسيط', () => {
      const ast = parse(`
        صنف شخص {
          اسم = "غير معروف";
          
          دالة تحية() {
            اطبع("مرحبا");
          }
        }
      `);
      
      expect(ast.body[0].type).toBe('ClassDeclaration');
      
      const classDecl = ast.body[0] as AST.ClassDeclaration;
      expect(classDecl.name.name).toBe('شخص');
      expect(classDecl.body.body.length).toBeGreaterThan(0);
    });

    test('يجب أن يحلل صنف مع وراثة', () => {
      const ast = parse('صنف طالب يرث شخص { }');
      
      const classDecl = ast.body[0] as AST.ClassDeclaration;
      expect(classDecl.superClass).not.toBeNull();
      expect(classDecl.superClass?.name).toBe('شخص');
    });
  });

  describe('العبارات الشرطية', () => {
    test('يجب أن يحلل عبارة if بسيطة', () => {
      const ast = parse('إذا (س > 5) { اطبع("كبير"); }');
      
      expect(ast.body[0].type).toBe('IfStatement');
      
      const ifStmt = ast.body[0] as AST.IfStatement;
      expect(ifStmt.test.type).toBe('BinaryExpression');
      expect(ifStmt.consequent.type).toBe('BlockStatement');
    });

    test('يجب أن يحلل عبارة if-else', () => {
      const ast = parse('إذا (س > 5) { اطبع("كبير"); } وإلا { اطبع("صغير"); }');
      
      const ifStmt = ast.body[0] as AST.IfStatement;
      expect(ifStmt.alternate).not.toBeNull();
      expect(ifStmt.alternate?.type).toBe('BlockStatement');
    });

    test('يجب أن يحلل عبارة if-else if-else', () => {
      const ast = parse(`
        إذا (س > 10) {
          اطبع("كبير جداً");
        } وإلا_إذا (س > 5) {
          اطبع("كبير");
        } وإلا {
          اطبع("صغير");
        }
      `);
      
      const ifStmt = ast.body[0] as AST.IfStatement;
      expect(ifStmt.alternate).not.toBeNull();
      expect(ifStmt.alternate?.type).toBe('IfStatement');
    });
  });

  describe('الحلقات', () => {
    test('يجب أن يحلل حلقة while', () => {
      const ast = parse('بينما (س < 10) { س = س + 1; }');
      
      expect(ast.body[0].type).toBe('WhileStatement');
      
      const whileStmt = ast.body[0] as AST.WhileStatement;
      expect(whileStmt.test.type).toBe('BinaryExpression');
      expect(whileStmt.body.type).toBe('BlockStatement');
    });

    test('يجب أن يحلل حلقة for', () => {
      const ast = parse('لكل (متغير ط = 0; ط < 10; ط = ط + 1) { اطبع(ط); }');
      
      expect(ast.body[0].type).toBe('ForStatement');
      
      const forStmt = ast.body[0] as AST.ForStatement;
      expect(forStmt.init).not.toBeNull();
      expect(forStmt.test).not.toBeNull();
      expect(forStmt.update).not.toBeNull();
    });

    test('يجب أن يحلل حلقة for-in', () => {
      const ast = parse('لكل (متغير عنصر في مصفوفة) { اطبع(عنصر); }');
      
      expect(ast.body[0].type).toBe('ForInStatement');
    });
  });

  describe('التعبيرات', () => {
    test('يجب أن يحلل التعبيرات الحسابية', () => {
      const ast = parse('متغير نتيجة = 2 + 3 * 4;');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      const init = varDecl.declarations[0].init as AST.BinaryExpression;
      
      expect(init.type).toBe('BinaryExpression');
      expect(init.operator).toBe('+');
      
      // يجب أن يحترم أولوية العمليات
      expect(init.right.type).toBe('BinaryExpression');
      const rightExpr = init.right as AST.BinaryExpression;
      expect(rightExpr.operator).toBe('*');
    });

    test('يجب أن يحلل استدعاء الدوال', () => {
      const ast = parse('اطبع("مرحبا", "عالم");');
      
      const exprStmt = ast.body[0] as AST.ExpressionStatement;
      const callExpr = exprStmt.expression as AST.CallExpression;
      
      expect(callExpr.type).toBe('CallExpression');
      expect((callExpr.callee as AST.Identifier).name).toBe('اطبع');
      expect(callExpr.args.length).toBe(2);
    });

    test('يجب أن يحلل الوصول للخصائص', () => {
      const ast = parse('متغير حجم = مصفوفة.حجم;');

      const varDecl = ast.body[0] as AST.VariableDeclaration;
      const init = varDecl.declarations[0].init as AST.MemberExpression;

      expect(init.type).toBe('MemberExpression');
      expect((init.object as AST.Identifier).name).toBe('مصفوفة');
      expect((init.property as AST.Identifier).name).toBe('حجم');
    });

    test('يجب أن يحلل المصفوفات', () => {
      const ast = parse('متغير أرقام = [1, 2, 3, 4, 5];');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      const init = varDecl.declarations[0].init as AST.ArrayExpression;
      
      expect(init.type).toBe('ArrayExpression');
      expect(init.elements.length).toBe(5);
    });

    test('يجب أن يحلل الكائنات', () => {
      const ast = parse('متغير شخص = { اسم: "أحمد", عمر: 25 };');
      
      const varDecl = ast.body[0] as AST.VariableDeclaration;
      const init = varDecl.declarations[0].init as AST.ObjectExpression;
      
      expect(init.type).toBe('ObjectExpression');
      expect(init.properties.length).toBe(2);
    });
  });

  describe('البرمجة المنطقية', () => {
    test('يجب أن يحلل تعريف حقيقة', () => {
      const ast = parse('حقيقة والد("أحمد", "محمد");');
      
      expect(ast.body[0].type).toBe('FactDeclaration');
      
      const factDecl = ast.body[0] as AST.FactDeclaration;
      expect(factDecl.predicate).toBe('والد');
      expect(factDecl.args.length).toBe(2);
    });

    test('يجب أن يحلل تعريف قاعدة', () => {
      const ast = parse('قاعدة جد(?س, ?ص) :- والد(?س, ?ع), والد(?ع, ?ص);');
      
      expect(ast.body[0].type).toBe('RuleDeclaration');
      
      const ruleDecl = ast.body[0] as AST.RuleDeclaration;
      expect(ruleDecl.head.predicate).toBe('جد');
      expect(ruleDecl.body.length).toBe(2);
    });

    test('يجب أن يحلل استعلام', () => {
      const ast = parse('استعلام جد(?س, "محمد");');
      
      const exprStmt = ast.body[0] as AST.ExpressionStatement;
      const queryExpr = exprStmt.expression as AST.QueryExpression;
      
      expect(queryExpr.type).toBe('QueryExpression');
      expect(queryExpr.goal.predicate).toBe('جد');
    });
  });

  describe('معالجة الأخطاء', () => {
    test('يجب أن يرمي خطأ عند وجود بناء جملة غير صحيح', () => {
      expect(() => parse('متغير = 5;')).toThrow();
    });

    test('يجب أن يرمي خطأ عند نقص قوس', () => {
      expect(() => parse('إذا (س > 5 { اطبع("كبير"); }')).toThrow();
    });

    test('يجب أن يرمي خطأ عند نقص فاصلة منقوطة', () => {
      // في لغة البيان، الفاصلة المنقوطة اختيارية، لذا هذا الكود صحيح
      // نختبر بدلاً من ذلك خطأً نحوياً حقيقياً
      expect(() => parse('متغير س =')).toThrow();
    });
  });

  describe('الكتل الهجينة', () => {
    test('يجب أن يحلل كتلة هجينة', () => {
      const ast = parse(`
        هجين {
          متغير س = 5;
          حقيقة رقم(5);
          استعلام رقم(?ع);
        }
      `);
      
      expect(ast.body[0].type).toBe('HybridBlock');
      
      const hybridBlock = ast.body[0] as AST.HybridBlock;
      expect(hybridBlock.body.length).toBe(3);
    });
  });
});

