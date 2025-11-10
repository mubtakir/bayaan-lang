/**
 * المحلل النحوي (Parser) للغة البيان
 * يحول سلسلة الرموز إلى شجرة تجريدية (AST)
 */

import { Token, TokenType } from '../lexer/index';
import * as AST from '../ast/index';

export class ParserError extends Error {
  constructor(
    message: string,
    public token: Token
  ) {
    super(`خطأ نحوي في السطر ${token.line}، العمود ${token.column}: ${message}`);
    this.name = 'ParserError';
  }
}

export class Parser {
  private tokens: Token[];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  /**
   * تحليل البرنامج الكامل
   */
  parse(): AST.Program {
    const statements: AST.Statement[] = [];

    while (!this.isAtEnd()) {
      // تخطي الأسطر الجديدة
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    return new AST.Program(statements);
  }

  // ============================================================================
  // تحليل العبارات (Statements)
  // ============================================================================

  private parseStatement(): AST.Statement | null {
    // تخطي الأسطر الجديدة
    while (this.check(TokenType.NEWLINE)) {
      this.advance();
    }

    if (this.isAtEnd()) {
      return null;
    }

    // البرمجة المنطقية
    if (this.check(TokenType.FACT)) {
      return this.parseFactDeclaration();
    }

    if (this.check(TokenType.RULE)) {
      return this.parseRuleDeclaration();
    }

    if (this.check(TokenType.HYBRID)) {
      return this.parseHybridBlock();
    }

    // التصريحات
    if (this.check(TokenType.LET) || this.check(TokenType.CONST) || this.check(TokenType.VAR)) {
      return this.parseVariableDeclaration();
    }

    if (this.check(TokenType.ASYNC)) {
      this.advance(); // استهلاك async
      if (this.check(TokenType.FUNCTION)) {
        return this.parseFunctionDeclaration();
      }
      throw new ParserError("توقع 'دالة' بعد 'غير_متزامن'", this.peek());
    }

    if (this.check(TokenType.FUNCTION)) {
      return this.parseFunctionDeclaration();
    }

    if (this.check(TokenType.ABSTRACT)) {
      this.advance(); // استهلاك abstract
      if (this.check(TokenType.CLASS)) {
        return this.parseClassDeclaration();
      }
      throw new ParserError("توقع 'صنف' بعد 'مجرد'", this.peek());
    }

    if (this.check(TokenType.CLASS)) {
      return this.parseClassDeclaration();
    }

    if (this.check(TokenType.INTERFACE)) {
      return this.parseInterfaceDeclaration();
    }

    // عبارات التحكم
    if (this.check(TokenType.IF)) {
      return this.parseIfStatement();
    }

    if (this.check(TokenType.WHILE)) {
      return this.parseWhileStatement();
    }

    if (this.check(TokenType.DO)) {
      return this.parseDoWhileStatement();
    }

    if (this.check(TokenType.FOR)) {
      return this.parseForStatement();
    }

    if (this.check(TokenType.SWITCH)) {
      return this.parseSwitchStatement();
    }

    if (this.check(TokenType.RETURN)) {
      return this.parseReturnStatement();
    }

    if (this.check(TokenType.BREAK)) {
      return this.parseBreakStatement();
    }

    if (this.check(TokenType.CONTINUE)) {
      return this.parseContinueStatement();
    }

    if (this.check(TokenType.TRY)) {
      return this.parseTryStatement();
    }

    if (this.check(TokenType.THROW)) {
      return this.parseThrowStatement();
    }

    if (this.check(TokenType.IMPORT)) {
      return this.parseImportDeclaration();
    }

    if (this.check(TokenType.EXPORT)) {
      return this.parseExportDeclaration();
    }

    if (this.check(TokenType.LBRACE)) {
      return this.parseBlockStatement();
    }

    // عبارة تعبير
    return this.parseExpressionStatement();
  }

  private parseVariableDeclaration(): AST.VariableDeclaration {
    const kindToken = this.advance();
    const kind = kindToken.type === TokenType.CONST ? 'ثابت' :
                 kindToken.type === TokenType.VAR ? 'متغير' : 'دع';

    const declarations: AST.VariableDeclarator[] = [];

    do {
      if (this.check(TokenType.COMMA)) {
        this.advance();
      }

      const id = this.parseIdentifier();

      // Parse type annotation if present
      const typeAnnotation = this.parseTypeAnnotation();

      let init: AST.Expression | null = null;

      if (this.check(TokenType.ASSIGN)) {
        this.advance();
        init = this.parseExpression();
      }

      declarations.push(new AST.VariableDeclarator(id, init, typeAnnotation));
    } while (this.check(TokenType.COMMA));

    this.consumeSemicolon();
    return new AST.VariableDeclaration(kind, declarations);
  }

  private parseFunctionDeclaration(): AST.FunctionDeclaration {
    // التحقق من وجود async قبل function
    let isAsync = false;
    if (this.current > 0 && this.tokens[this.current - 1].type === TokenType.ASYNC) {
      isAsync = true;
    }

    this.consume(TokenType.FUNCTION, "توقع 'دالة'");

    const name = this.parseIdentifier();

    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الدالة");
    const parameters = this.parseFunctionParameters();
    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الدالة");

    // Parse return type annotation if present
    const returnType = this.parseTypeAnnotation();

    const body = this.parseBlockStatement();

    return new AST.FunctionDeclaration(name, parameters, body, isAsync, false, returnType);
  }

  private parseFunctionParameters(): AST.FunctionParameter[] {
    const parameters: AST.FunctionParameter[] = [];

    if (this.check(TokenType.RPAREN)) {
      return parameters;
    }

    do {
      if (this.check(TokenType.COMMA)) {
        this.advance();
      }

      // معامل rest
      const isRest = this.check(TokenType.DOT) && this.peek().type === TokenType.DOT;
      if (isRest) {
        this.advance(); // .
        this.advance(); // .
        this.advance(); // .
      }

      const name = this.parseIdentifier();

      // Parse type annotation if present
      const typeAnnotation = this.parseTypeAnnotation();

      let defaultValue: AST.Expression | null = null;

      if (this.check(TokenType.ASSIGN)) {
        this.advance();
        defaultValue = this.parseAssignment();
      }

      parameters.push(new AST.FunctionParameter(name, defaultValue, isRest, typeAnnotation));
    } while (this.check(TokenType.COMMA));

    return parameters;
  }

  private parseClassDeclaration(): AST.ClassDeclaration {
    // التحقق من وجود abstract قبل class
    let isAbstract = false;
    if (this.current > 0 && this.tokens[this.current - 1].type === TokenType.ABSTRACT) {
      isAbstract = true;
    }

    this.consume(TokenType.CLASS, "توقع 'صنف'");

    const name = this.parseIdentifier();
    
    let superClass: AST.Identifier | null = null;
    if (this.check(TokenType.EXTENDS)) {
      this.advance();
      superClass = this.parseIdentifier();
    }

    const interfaces: AST.Identifier[] = [];
    if (this.check(TokenType.IMPLEMENTS)) {
      this.advance();
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }
        interfaces.push(this.parseIdentifier());
      } while (this.check(TokenType.COMMA));
    }

    this.consume(TokenType.LBRACE, "توقع '{' قبل جسم الصنف");
    const body = this.parseClassBody();
    this.consume(TokenType.RBRACE, "توقع '}' بعد جسم الصنف");

    return new AST.ClassDeclaration(name, superClass, interfaces, body, isAbstract);
  }

  private parseClassBody(): AST.ClassBody {
    const members: (AST.MethodDefinition | AST.PropertyDefinition)[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      // تخطي الأسطر الجديدة
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      // معدلات الوصول
      let accessModifier: 'public' | 'private' | 'protected' = 'public';
      if (this.check(TokenType.PUBLIC)) {
        this.advance();
        accessModifier = 'public';
      } else if (this.check(TokenType.PRIVATE)) {
        this.advance();
        accessModifier = 'private';
      } else if (this.check(TokenType.PROTECTED)) {
        this.advance();
        accessModifier = 'protected';
      }

      // static
      const isStatic = this.check(TokenType.STATIC);
      if (isStatic) {
        this.advance();
      }

      // async
      const isAsync = this.check(TokenType.ASYNC);
      if (isAsync) {
        this.advance();
      }

      // abstract
      const isAbstract = this.check(TokenType.ABSTRACT);
      if (isAbstract) {
        this.advance();
      }

      // Getter
      if (this.check(TokenType.GET)) {
        this.advance();
        const key = this.parseIdentifier();
        this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الـ getter");
        this.consume(TokenType.RPAREN, "توقع ')' بعد '(' في الـ getter");
        const body = this.parseBlockStatement();

        members.push(new AST.MethodDefinition(
          'get',
          key,
          [],
          body,
          isStatic,
          false, // getters can't be async
          false,
          accessModifier
        ));
        continue;
      }

      // Setter
      if (this.check(TokenType.SET)) {
        this.advance();
        const key = this.parseIdentifier();
        this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الـ setter");
        const parameters = this.parseFunctionParameters();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الـ setter");
        const body = this.parseBlockStatement();

        members.push(new AST.MethodDefinition(
          'set',
          key,
          parameters,
          body,
          isStatic,
          false, // setters can't be async
          false,
          accessModifier
        ));
        continue;
      }

      // المنشئ - support both "منشئ" and "دالة منشئ"
      if (this.check(TokenType.CONSTRUCTOR)) {
        this.advance();
        this.consume(TokenType.LPAREN, "توقع '(' بعد 'منشئ'");
        const parameters = this.parseFunctionParameters();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات المنشئ");
        const body = this.parseBlockStatement();

        members.push(new AST.MethodDefinition(
          'constructor',
          new AST.Identifier('منشئ'),
          parameters,
          body,
          isStatic,
          isAsync,
          isAbstract,
          accessModifier
        ));
        continue;
      }

      // دالة منشئ - alternative constructor syntax
      if (this.check(TokenType.FUNCTION)) {
        // Look ahead to see if next token is CONSTRUCTOR
        const savedPosition = this.current;
        this.advance(); // consume "دالة"

        if (this.check(TokenType.CONSTRUCTOR)) {
          this.advance(); // consume "منشئ"
          this.consume(TokenType.LPAREN, "توقع '(' بعد 'دالة منشئ'");
          const parameters = this.parseFunctionParameters();
          this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات المنشئ");
          const body = this.parseBlockStatement();

          members.push(new AST.MethodDefinition(
            'constructor',
            new AST.Identifier('منشئ'),
            parameters,
            body,
            isStatic,
            isAsync,
            isAbstract,
            accessModifier
          ));
          continue;
        } else {
          // Not a constructor, restore position
          this.current = savedPosition;
        }
      }

      // دالة (method)
      if (this.check(TokenType.FUNCTION)) {
        this.advance(); // استهلاك 'دالة'
        const key = this.parseIdentifier();
        this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الدالة");
        const parameters = this.parseFunctionParameters();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الدالة");

        // Abstract methods don't have a body
        let body: AST.BlockStatement;
        if (isAbstract && this.check(TokenType.SEMICOLON)) {
          this.advance(); // consume semicolon
          body = new AST.BlockStatement([]); // empty body for abstract methods
        } else {
          body = this.parseBlockStatement();
        }

        members.push(new AST.MethodDefinition(
          'method',
          key,
          parameters,
          body,
          isStatic,
          isAsync,
          isAbstract,
          accessModifier
        ));
        continue;
      }

      const key = this.parseIdentifier();

      // دالة
      if (this.check(TokenType.LPAREN)) {
        this.advance();
        const parameters = this.parseFunctionParameters();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الدالة");
        const body = this.parseBlockStatement();
        
        members.push(new AST.MethodDefinition(
          'method',
          key,
          parameters,
          body,
          isStatic,
          isAsync,
          isAbstract,
          accessModifier
        ));
      } else {
        // خاصية
        let value: AST.Expression | null = null;
        if (this.check(TokenType.ASSIGN)) {
          this.advance();
          value = this.parseExpression();
        }
        this.consumeSemicolon();
        
        members.push(new AST.PropertyDefinition(key, value, isStatic, accessModifier));
      }
    }

    return new AST.ClassBody(members);
  }

  private parseInterfaceDeclaration(): AST.InterfaceDeclaration {
    this.consume(TokenType.INTERFACE, "توقع 'واجهة'");
    const name = this.parseIdentifier();

    const extendsInterfaces: AST.Identifier[] = [];
    if (this.check(TokenType.EXTENDS)) {
      this.advance();
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }
        extendsInterfaces.push(this.parseIdentifier());
      } while (this.check(TokenType.COMMA));
    }

    this.consume(TokenType.LBRACE, "توقع '{' قبل جسم الواجهة");
    const body = this.parseInterfaceBody();
    this.consume(TokenType.RBRACE, "توقع '}' بعد جسم الواجهة");

    return new AST.InterfaceDeclaration(name, extendsInterfaces, body);
  }

  private parseInterfaceBody(): AST.InterfaceBody {
    const members: (AST.MethodSignature | AST.PropertySignature)[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      // Support "دالة" keyword for method signatures
      if (this.check(TokenType.FUNCTION)) {
        this.advance(); // consume "دالة"
        const key = this.parseIdentifier();
        this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الدالة");
        const parameters = this.parseFunctionParameters();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الدالة");
        this.consumeSemicolon();
        members.push(new AST.MethodSignature(key, parameters));
        continue;
      }

      const key = this.parseIdentifier();

      if (this.check(TokenType.LPAREN)) {
        this.advance();
        const parameters = this.parseFunctionParameters();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الدالة");
        this.consumeSemicolon();
        members.push(new AST.MethodSignature(key, parameters));
      } else {
        this.consumeSemicolon();
        members.push(new AST.PropertySignature(key));
      }
    }

    return new AST.InterfaceBody(members);
  }

  private parseIfStatement(): AST.IfStatement {
    this.consume(TokenType.IF, "توقع 'إذا'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'إذا'");
    const test = this.parseExpression();
    this.consume(TokenType.RPAREN, "توقع ')' بعد شرط 'إذا'");

    const consequent = this.parseBlockStatement();
    let alternate: AST.BlockStatement | AST.IfStatement | null = null;

    if (this.check(TokenType.ELSE_IF)) {
      this.advance(); // استهلاك وإلا_إذا
      this.consume(TokenType.LPAREN, "توقع '(' بعد 'وإلا_إذا'");
      const elseIfTest = this.parseExpression();
      this.consume(TokenType.RPAREN, "توقع ')' بعد شرط 'وإلا_إذا'");
      const elseIfConsequent = this.parseBlockStatement();

      // التحقق من وجود else أو else if آخر
      let elseIfAlternate: AST.BlockStatement | AST.IfStatement | null = null;
      if (this.check(TokenType.ELSE_IF) || this.check(TokenType.ELSE)) {
        // استدعاء parseIfStatement بشكل متكرر للتعامل مع else if المتعددة
        if (this.check(TokenType.ELSE_IF)) {
          elseIfAlternate = this.parseIfStatement();
        } else if (this.check(TokenType.ELSE)) {
          this.advance();
          elseIfAlternate = this.parseBlockStatement();
        }
      }

      alternate = new AST.IfStatement(elseIfTest, elseIfConsequent, elseIfAlternate);
    } else if (this.check(TokenType.ELSE)) {
      this.advance();

      if (this.check(TokenType.IF)) {
        alternate = this.parseIfStatement();
      } else {
        alternate = this.parseBlockStatement();
      }
    }

    return new AST.IfStatement(test, consequent, alternate);
  }

  private parseWhileStatement(): AST.WhileStatement {
    this.consume(TokenType.WHILE, "توقع 'بينما'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'بينما'");
    const test = this.parseExpression();
    this.consume(TokenType.RPAREN, "توقع ')' بعد شرط 'بينما'");

    const body = this.parseBlockStatement();

    return new AST.WhileStatement(test, body);
  }

  private parseDoWhileStatement(): AST.DoWhileStatement {
    this.consume(TokenType.DO, "توقع 'افعل'");
    const body = this.parseBlockStatement();
    this.consume(TokenType.WHILE, "توقع 'بينما' بعد جسم 'افعل'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'بينما'");
    const test = this.parseExpression();
    this.consume(TokenType.RPAREN, "توقع ')' بعد شرط 'بينما'");
    this.consumeSemicolon();

    return new AST.DoWhileStatement(body, test);
  }

  private parseForStatement(): AST.ForStatement | AST.ForInStatement | AST.ForOfStatement {
    this.consume(TokenType.FOR, "توقع 'لكل'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'لكل'");

    // التحقق من for-in أو for-of
    const checkpoint = this.current;

    // محاولة تحليل for-in/for-of
    if (this.check(TokenType.LET) || this.check(TokenType.CONST) || this.check(TokenType.VAR)) {
      const kind = this.advance().type === TokenType.CONST ? 'ثابت' :
                   this.previous().type === TokenType.VAR ? 'متغير' : 'دع';
      const id = this.parseIdentifier();

      if (this.check(TokenType.IN)) {
        this.advance();
        const right = this.parseExpression();
        this.consume(TokenType.RPAREN, "توقع ')' بعد تعبير 'في'");
        const body = this.parseBlockStatement();

        const left = new AST.VariableDeclaration(kind, [new AST.VariableDeclarator(id, null)]);
        return new AST.ForInStatement(left, right, body);
      }

      if (this.check(TokenType.OF)) {
        this.advance();
        const right = this.parseExpression();
        this.consume(TokenType.RPAREN, "توقع ')' بعد تعبير 'من_بين'");
        const body = this.parseBlockStatement();

        const left = new AST.VariableDeclaration(kind, [new AST.VariableDeclarator(id, null)]);
        return new AST.ForOfStatement(left, right, body);
      }
    }

    // العودة للحلقة العادية
    this.current = checkpoint;

    let init: AST.VariableDeclaration | AST.Expression | null = null;
    if (!this.check(TokenType.SEMICOLON)) {
      if (this.check(TokenType.LET) || this.check(TokenType.CONST) || this.check(TokenType.VAR)) {
        init = this.parseVariableDeclaration();
        // لا نحتاج semicolon هنا لأن parseVariableDeclaration يستهلكه
      } else {
        init = this.parseExpression();
        this.consume(TokenType.SEMICOLON, "توقع ';' بعد تهيئة الحلقة");
      }
    } else {
      this.advance();
    }

    let test: AST.Expression | null = null;
    if (!this.check(TokenType.SEMICOLON)) {
      test = this.parseExpression();
    }
    this.consume(TokenType.SEMICOLON, "توقع ';' بعد شرط الحلقة");

    let update: AST.Expression | null = null;
    if (!this.check(TokenType.RPAREN)) {
      update = this.parseExpression();
    }
    this.consume(TokenType.RPAREN, "توقع ')' بعد تحديث الحلقة");

    const body = this.parseBlockStatement();

    return new AST.ForStatement(init, test, update, body);
  }

  private parseSwitchStatement(): AST.SwitchStatement {
    this.consume(TokenType.SWITCH, "توقع 'حول'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'حول'");
    const discriminant = this.parseExpression();
    this.consume(TokenType.RPAREN, "توقع ')' بعد تعبير 'حول'");
    this.consume(TokenType.LBRACE, "توقع '{' قبل حالات 'حول'");

    const cases: AST.SwitchCase[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      if (this.check(TokenType.CASE)) {
        this.advance();
        const test = this.parseExpression();
        this.consume(TokenType.COLON, "توقع ':' بعد حالة");

        const consequent: AST.Statement[] = [];
        while (!this.check(TokenType.CASE) && !this.check(TokenType.DEFAULT) &&
               !this.check(TokenType.RBRACE) && !this.isAtEnd()) {
          if (this.check(TokenType.NEWLINE)) {
            this.advance();
            continue;
          }
          const stmt = this.parseStatement();
          if (stmt) consequent.push(stmt);
        }

        cases.push(new AST.SwitchCase(test, consequent));
      } else if (this.check(TokenType.DEFAULT)) {
        this.advance();
        this.consume(TokenType.COLON, "توقع ':' بعد 'افتراضي'");

        const consequent: AST.Statement[] = [];
        while (!this.check(TokenType.CASE) && !this.check(TokenType.RBRACE) && !this.isAtEnd()) {
          if (this.check(TokenType.NEWLINE)) {
            this.advance();
            continue;
          }
          const stmt = this.parseStatement();
          if (stmt) consequent.push(stmt);
        }

        cases.push(new AST.SwitchCase(null, consequent));
      } else {
        break;
      }
    }

    this.consume(TokenType.RBRACE, "توقع '}' بعد حالات 'حول'");

    return new AST.SwitchStatement(discriminant, cases);
  }

  private parseReturnStatement(): AST.ReturnStatement {
    this.consume(TokenType.RETURN, "توقع 'إرجاع'");

    let argument: AST.Expression | null = null;
    if (!this.check(TokenType.SEMICOLON) && !this.check(TokenType.NEWLINE) && !this.isAtEnd()) {
      argument = this.parseExpression();
    }

    this.consumeSemicolon();
    return new AST.ReturnStatement(argument);
  }

  private parseBreakStatement(): AST.BreakStatement {
    this.consume(TokenType.BREAK, "توقع 'اخرج'");
    this.consumeSemicolon();
    return new AST.BreakStatement();
  }

  private parseContinueStatement(): AST.ContinueStatement {
    this.consume(TokenType.CONTINUE, "توقع 'استمر'");
    this.consumeSemicolon();
    return new AST.ContinueStatement();
  }

  private parseTryStatement(): AST.TryStatement {
    this.consume(TokenType.TRY, "توقع 'حاول'");
    const block = this.parseBlockStatement();

    let handler: AST.CatchClause | null = null;
    if (this.check(TokenType.CATCH)) {
      this.advance();

      let param: AST.Identifier | null = null;
      if (this.check(TokenType.LPAREN)) {
        this.advance();
        param = this.parseIdentifier();
        this.consume(TokenType.RPAREN, "توقع ')' بعد معامل 'اصطد'");
      }

      const body = this.parseBlockStatement();
      handler = new AST.CatchClause(param, body);
    }

    let finalizer: AST.BlockStatement | null = null;
    if (this.check(TokenType.FINALLY)) {
      this.advance();
      finalizer = this.parseBlockStatement();
    }

    if (!handler && !finalizer) {
      throw new ParserError("يجب أن يحتوي 'حاول' على 'اصطد' أو 'أخيراً'", this.previous());
    }

    return new AST.TryStatement(block, handler, finalizer);
  }

  private parseThrowStatement(): AST.ThrowStatement {
    this.consume(TokenType.THROW, "توقع 'ارمي'");
    const argument = this.parseExpression();
    this.consumeSemicolon();
    return new AST.ThrowStatement(argument);
  }

  private parseImportDeclaration(): AST.ImportDeclaration {
    this.consume(TokenType.IMPORT, "توقع 'استورد'");

    const specifiers: AST.ImportSpecifier[] = [];

    if (this.check(TokenType.LBRACE)) {
      this.advance();

      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }

        const imported = this.parseIdentifier();
        let local: AST.Identifier | null = null;

        if (this.check(TokenType.AS)) {
          this.advance();
          local = this.parseIdentifier();
        }

        specifiers.push(new AST.ImportSpecifier(imported, local));
      } while (this.check(TokenType.COMMA));

      this.consume(TokenType.RBRACE, "توقع '}' بعد قائمة الاستيراد");
    } else {
      const imported = this.parseIdentifier();
      specifiers.push(new AST.ImportSpecifier(imported));
    }

    this.consume(TokenType.FROM, "توقع 'من' بعد قائمة الاستيراد");

    if (!this.check(TokenType.STRING)) {
      throw new ParserError("توقع نص بعد 'من'", this.peek());
    }

    const source = new AST.Literal(this.advance().value);
    this.consumeSemicolon();

    return new AST.ImportDeclaration(specifiers, source);
  }

  private parseExportDeclaration(): AST.ExportDeclaration {
    this.consume(TokenType.EXPORT, "توقع 'صدر'");

    const isDefault = this.check(TokenType.DEFAULT);
    if (isDefault) {
      this.advance();
    }

    let declaration: AST.Statement | null = null;
    const specifiers: AST.ExportSpecifier[] = [];

    if (this.check(TokenType.LBRACE)) {
      this.advance();

      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }

        const local = this.parseIdentifier();
        let exported: AST.Identifier | null = null;

        if (this.check(TokenType.AS)) {
          this.advance();
          exported = this.parseIdentifier();
        }

        specifiers.push(new AST.ExportSpecifier(local, exported));
      } while (this.check(TokenType.COMMA));

      this.consume(TokenType.RBRACE, "توقع '}' بعد قائمة التصدير");
      this.consumeSemicolon();
    } else {
      declaration = this.parseStatement();
    }

    return new AST.ExportDeclaration(declaration, specifiers, null, isDefault);
  }

  private parseBlockStatement(): AST.BlockStatement {
    this.consume(TokenType.LBRACE, "توقع '{'");

    const statements: AST.Statement[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    this.consume(TokenType.RBRACE, "توقع '}'");

    return new AST.BlockStatement(statements);
  }

  private parseExpressionStatement(): AST.ExpressionStatement {
    const expr = this.parseExpression();
    this.consumeSemicolon();
    return new AST.ExpressionStatement(expr);
  }

  // ============================================================================
  // البرمجة المنطقية
  // ============================================================================

  private parseHybridBlock(): AST.HybridBlock {
    this.consume(TokenType.HYBRID, "توقع 'بيان'");
    this.consume(TokenType.LBRACE, "توقع '{' بعد 'بيان'");

    const statements: AST.Statement[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      const stmt = this.parseStatement();
      if (stmt) {
        statements.push(stmt);
      }
    }

    this.consume(TokenType.RBRACE, "توقع '}' بعد كتلة 'بيان'");

    return new AST.HybridBlock(statements);
  }

  private parseFactDeclaration(): AST.FactDeclaration {
    this.consume(TokenType.FACT, "توقع 'حقيقة'");

    const predicate = this.parseIdentifier().name;

    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الحقيقة");

    const args: AST.Expression[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }
        args.push(this.parseExpression());
      } while (this.check(TokenType.COMMA));
    }

    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الحقيقة");
    this.consumeSemicolon();

    return new AST.FactDeclaration(predicate, args);
  }

  private parseRuleDeclaration(): AST.RuleDeclaration {
    this.consume(TokenType.RULE, "توقع 'قاعدة'");

    const headPredicate = this.parseIdentifier().name;
    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم القاعدة");

    const headArgs: AST.Expression[] = [];
    if (!this.check(TokenType.RPAREN)) {
      headArgs.push(this.parseExpression());
      while (this.check(TokenType.COMMA)) {
        this.advance(); // استهلاك الفاصلة
        headArgs.push(this.parseExpression());
      }
    }

    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات رأس القاعدة");

    const head = new AST.FactDeclaration(headPredicate, headArgs);

    this.consume(TokenType.IMPLIES, "توقع ':-' أو 'يستلزم' بعد رأس القاعدة");

    const body: AST.FactDeclaration[] = [];

    // تحليل المحمول الأول في الجسم
    const firstBodyPredicate = this.parseIdentifier().name;
    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم المحمول");

    const firstBodyArgs: AST.Expression[] = [];
    if (!this.check(TokenType.RPAREN)) {
      firstBodyArgs.push(this.parseExpression());
      while (this.check(TokenType.COMMA)) {
        this.advance(); // استهلاك الفاصلة
        firstBodyArgs.push(this.parseExpression());
      }
    }

    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات المحمول");
    body.push(new AST.FactDeclaration(firstBodyPredicate, firstBodyArgs));

    // تحليل المحمولات المتبقية (مفصولة بفاصلة أو 'و')
    while (this.check(TokenType.COMMA) || this.check(TokenType.AND)) {
      this.advance(); // استهلاك الفاصلة أو 'و'

      const bodyPredicate = this.parseIdentifier().name;
      this.consume(TokenType.LPAREN, "توقع '(' بعد اسم المحمول");

      const bodyArgs: AST.Expression[] = [];
      if (!this.check(TokenType.RPAREN)) {
        bodyArgs.push(this.parseExpression());
        while (this.check(TokenType.COMMA)) {
          this.advance(); // استهلاك الفاصلة
          bodyArgs.push(this.parseExpression());
        }
      }

      this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات المحمول");
      body.push(new AST.FactDeclaration(bodyPredicate, bodyArgs));
    }

    this.consumeSemicolon();

    return new AST.RuleDeclaration(head, body);
  }

  // ============================================================================
  // تحليل التعبيرات (Expressions)
  // ============================================================================

  private parseExpression(): AST.Expression {
    return this.parseAssignment();
  }

  private parseAssignment(): AST.Expression {
    const expr = this.parseConditional();

    if (this.check(TokenType.ASSIGN)) {
      const operator = String(this.advance().value);
      const right = this.parseAssignment();
      return new AST.AssignmentExpression(operator, expr, right);
    }

    return expr;
  }

  private parseConditional(): AST.Expression {
    let expr = this.parseLogicalOr();

    if (this.check(TokenType.QUESTION)) {
      this.advance();
      const consequent = this.parseExpression();
      this.consume(TokenType.COLON, "توقع ':' في التعبير الشرطي");
      const alternate = this.parseExpression();
      return new AST.ConditionalExpression(expr, consequent, alternate);
    }

    return expr;
  }

  private parseLogicalOr(): AST.Expression {
    let left = this.parseLogicalAnd();

    while (this.check(TokenType.OR)) {
      const operator = this.advance().value;
      const right = this.parseLogicalAnd();
      left = new AST.LogicalExpression(operator as any, left, right);
    }

    return left;
  }

  private parseLogicalAnd(): AST.Expression {
    let left = this.parseEquality();

    while (this.check(TokenType.AND)) {
      const operator = this.advance().value;
      const right = this.parseEquality();
      left = new AST.LogicalExpression(operator as any, left, right);
    }

    return left;
  }

  private parseEquality(): AST.Expression {
    let left = this.parseRelational();

    while (this.check(TokenType.EQUALS) || this.check(TokenType.NOT_EQUALS) ||
           this.check(TokenType.STRICT_EQUALS) || this.check(TokenType.STRICT_NOT_EQUALS)) {
      const operator = String(this.advance().value);
      const right = this.parseRelational();
      left = new AST.BinaryExpression(operator, left, right);
    }

    return left;
  }

  private parseRelational(): AST.Expression {
    let left = this.parseAdditive();

    while (this.check(TokenType.LESS_THAN) || this.check(TokenType.GREATER_THAN) ||
           this.check(TokenType.LESS_EQUALS) || this.check(TokenType.GREATER_EQUALS) ||
           this.check(TokenType.IN) || this.check(TokenType.INSTANCEOF)) {
      const operator = String(this.advance().value);
      const right = this.parseAdditive();
      left = new AST.BinaryExpression(operator, left, right);
    }

    return left;
  }

  private parseAdditive(): AST.Expression {
    let left = this.parseMultiplicative();

    while (this.check(TokenType.PLUS) || this.check(TokenType.MINUS)) {
      const operator = String(this.advance().value);
      const right = this.parseMultiplicative();
      left = new AST.BinaryExpression(operator, left, right);
    }

    return left;
  }

  private parseMultiplicative(): AST.Expression {
    let left = this.parseExponentiation();

    while (this.check(TokenType.MULTIPLY) || this.check(TokenType.DIVIDE) ||
           this.check(TokenType.MODULO)) {
      const operator = String(this.advance().value);
      const right = this.parseExponentiation();
      left = new AST.BinaryExpression(operator, left, right);
    }

    return left;
  }

  private parseExponentiation(): AST.Expression {
    let left = this.parseUnary();

    if (this.check(TokenType.POWER)) {
      const operator = String(this.advance().value);
      const right = this.parseExponentiation(); // Right associative
      return new AST.BinaryExpression(operator, left, right);
    }

    return left;
  }

  private parseUnary(): AST.Expression {
    // Prefix increment/decrement (++x, --x)
    if (this.check(TokenType.INCREMENT) || this.check(TokenType.DECREMENT)) {
      const operator = String(this.advance().value) as '++' | '--';
      const argument = this.parseUnary();
      return new AST.UpdateExpression(operator, argument, true); // prefix = true
    }

    if (this.check(TokenType.NOT) || this.check(TokenType.MINUS) ||
        this.check(TokenType.PLUS) || this.check(TokenType.TYPEOF)) {
      const operator = String(this.advance().value);
      const argument = this.parseUnary();
      return new AST.UnaryExpression(operator, argument);
    }

    if (this.check(TokenType.AWAIT)) {
      this.advance();
      const argument = this.parseUnary();
      return new AST.AwaitExpression(argument);
    }

    return this.parsePostfix();
  }

  private parsePostfix(): AST.Expression {
    let expr = this.parseCallMember();

    // Postfix increment/decrement (x++, x--)
    if (this.check(TokenType.INCREMENT) || this.check(TokenType.DECREMENT)) {
      const operator = String(this.advance().value) as '++' | '--';
      return new AST.UpdateExpression(operator, expr, false); // prefix = false
    }

    return expr;
  }

  private parseCallMember(): AST.Expression {
    let expr = this.parsePrimary();

    while (true) {
      if (this.check(TokenType.LPAREN)) {
        // Call expression
        this.advance();
        const args: AST.Expression[] = [];

        if (!this.check(TokenType.RPAREN)) {
          do {
            if (this.check(TokenType.COMMA)) {
              this.advance();
            }

            // Spread operator
            if (this.check(TokenType.DOT) && this.peek().type === TokenType.DOT) {
              this.advance(); // .
              this.advance(); // .
              this.advance(); // .
              const argument = this.parseExpression();
              args.push(new AST.SpreadExpression(argument));
            } else {
              args.push(this.parseExpression());
            }
          } while (this.check(TokenType.COMMA));
        }

        this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الاستدعاء");
        expr = new AST.CallExpression(expr, args);
      } else if (this.check(TokenType.DOT)) {
        // Member expression (dot notation)
        this.advance();
        const property = this.parseIdentifier();
        expr = new AST.MemberExpression(expr, property, false);
      } else if (this.check(TokenType.LBRACKET)) {
        // Member expression (bracket notation)
        this.advance();
        const property = this.parseExpression();
        this.consume(TokenType.RBRACKET, "توقع ']' بعد تعبير الفهرس");
        expr = new AST.MemberExpression(expr, property, true);
      } else {
        break;
      }
    }

    return expr;
  }

  private parsePrimary(): AST.Expression {
    // Literals
    if (this.check(TokenType.NUMBER)) {
      const value = this.advance().value;
      return new AST.Literal(typeof value === 'number' ? value : parseFloat(value));
    }

    if (this.check(TokenType.STRING)) {
      const value = this.advance().value;
      return new AST.Literal(value);
    }

    if (this.check(TokenType.TRUE)) {
      this.advance();
      return new AST.Literal(true);
    }

    if (this.check(TokenType.FALSE)) {
      this.advance();
      return new AST.Literal(false);
    }

    if (this.check(TokenType.NULL)) {
      this.advance();
      return new AST.Literal(null);
    }

    if (this.check(TokenType.UNDEFINED)) {
      this.advance();
      return new AST.Literal(undefined);
    }

    // this
    if (this.check(TokenType.THIS)) {
      this.advance();
      return new AST.ThisExpression();
    }

    // super
    if (this.check(TokenType.SUPER)) {
      this.advance();
      return new AST.SuperExpression();
    }

    // new
    if (this.check(TokenType.NEW)) {
      return this.parseNewExpression();
    }

    // Query expression
    if (this.check(TokenType.QUERY)) {
      return this.parseQueryExpression();
    }

    // Negation as Failure - النفي كفشل
    if (this.check(TokenType.NOT)) {
      return this.parseNegationExpression();
    }

    // Cut - القطع
    if (this.check(TokenType.CUT)) {
      this.advance();
      return new AST.CutExpression();
    }

    // FindAll - اجمع_كل
    if (this.check(TokenType.FINDALL)) {
      return this.parseFindAllExpression();
    }

    // BagOf - كيس_من
    if (this.check(TokenType.BAGOF)) {
      return this.parseBagOfExpression();
    }

    // SetOf - مجموعة_من
    if (this.check(TokenType.SETOF)) {
      return this.parseSetOfExpression();
    }

    // Assert - أضف
    if (this.check(TokenType.ASSERT)) {
      return this.parseAssertExpression();
    }

    // Retract - احذف
    if (this.check(TokenType.RETRACT)) {
      return this.parseRetractExpression();
    }

    // Array
    if (this.check(TokenType.LBRACKET)) {
      return this.parseArrayExpression();
    }

    // Object
    if (this.check(TokenType.LBRACE)) {
      return this.parseObjectExpression();
    }

    // Function expression
    if (this.check(TokenType.FUNCTION)) {
      return this.parseFunctionExpression();
    }

    // Arrow function (starts with identifier or parenthesis)
    if (this.check(TokenType.LPAREN)) {
      const checkpoint = this.current;
      try {
        return this.parseArrowFunction();
      } catch {
        this.current = checkpoint;
      }
    }

    // Grouped expression
    if (this.check(TokenType.LPAREN)) {
      this.advance();
      const expr = this.parseExpression();
      this.consume(TokenType.RPAREN, "توقع ')' بعد التعبير");
      return expr;
    }

    // Logic variable (starts with ?)
    if (this.check(TokenType.QUESTION)) {
      this.advance(); // استهلاك ?
      if (!this.check(TokenType.IDENTIFIER)) {
        throw new ParserError("توقع معرف بعد '?'", this.peek());
      }
      const varName = this.advance().value;
      return new AST.Identifier(`?${varName}`);
    }

    // Identifier (must be last)
    if (this.check(TokenType.IDENTIFIER)) {
      const id = this.parseIdentifier();

      // Check for arrow function
      if (this.check(TokenType.ARROW)) {
        this.advance();
        const params = [new AST.FunctionParameter(id, null, false)];
        const body = this.check(TokenType.LBRACE) ?
          this.parseBlockStatement() :
          this.parseExpression();
        return new AST.ArrowFunctionExpression(params, body);
      }

      return id;
    }

    throw new ParserError(`تعبير غير متوقع: ${this.peek().value}`, this.peek());
  }

  private parseNewExpression(): AST.NewExpression {
    this.consume(TokenType.NEW, "توقع 'جديد'");
    const callee = this.parsePrimary();

    let args: AST.Expression[] = [];
    if (this.check(TokenType.LPAREN)) {
      this.advance();

      if (!this.check(TokenType.RPAREN)) {
        do {
          if (this.check(TokenType.COMMA)) {
            this.advance();
          }
          args.push(this.parseExpression());
        } while (this.check(TokenType.COMMA));
      }

      this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات 'جديد'");
    }

    return new AST.NewExpression(callee, args);
  }

  private parseQueryExpression(): AST.QueryExpression {
    this.consume(TokenType.QUERY, "توقع 'استعلام'");

    const predicate = this.parseIdentifier().name;
    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم الاستعلام");

    const args: AST.Expression[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }
        args.push(this.parseExpression());
      } while (this.check(TokenType.COMMA));
    }

    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الاستعلام");

    const goal = new AST.FactDeclaration(predicate, args);
    return new AST.QueryExpression(goal);
  }

  private parseArrayExpression(): AST.ArrayExpression {
    this.consume(TokenType.LBRACKET, "توقع '['");

    const elements: (AST.Expression | null)[] = [];

    if (!this.check(TokenType.RBRACKET)) {
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
          elements.push(null); // Sparse array
          continue;
        }

        // Spread operator
        if (this.check(TokenType.DOT) && this.peek().type === TokenType.DOT) {
          this.advance(); // .
          this.advance(); // .
          this.advance(); // .
          const argument = this.parseExpression();
          elements.push(new AST.SpreadExpression(argument));
        } else {
          elements.push(this.parseExpression());
        }

        if (!this.check(TokenType.RBRACKET)) {
          this.consume(TokenType.COMMA, "توقع ',' أو ']' في المصفوفة");
        }
      } while (!this.check(TokenType.RBRACKET));
    }

    this.consume(TokenType.RBRACKET, "توقع ']' بعد عناصر المصفوفة");

    return new AST.ArrayExpression(elements);
  }

  private parseObjectExpression(): AST.ObjectExpression {
    this.consume(TokenType.LBRACE, "توقع '{'");

    const properties: AST.Property[] = [];

    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.NEWLINE)) {
        this.advance();
        continue;
      }

      // Spread operator
      if (this.check(TokenType.DOT) && this.peek().type === TokenType.DOT) {
        this.advance(); // .
        this.advance(); // .
        this.advance(); // .
        const argument = this.parseExpression();
        // We'll treat spread as a special property
        properties.push(new AST.Property(
          new AST.Literal('...'),
          argument,
          'init',
          false,
          false
        ));

        if (!this.check(TokenType.RBRACE)) {
          this.consume(TokenType.COMMA, "توقع ',' أو '}' في الكائن");
        }
        continue;
      }

      let key: AST.Identifier | AST.Literal;
      let computed = false;

      if (this.check(TokenType.LBRACKET)) {
        // Computed property
        this.advance();
        const expr = this.parseExpression();
        this.consume(TokenType.RBRACKET, "توقع ']' بعد اسم الخاصية المحسوبة");
        key = expr as any;
        computed = true;
      } else if (this.check(TokenType.STRING)) {
        key = new AST.Literal(this.advance().value);
      } else {
        key = this.parseIdentifier();
      }

      // Shorthand property
      if (this.check(TokenType.COMMA) || this.check(TokenType.RBRACE)) {
        if (key instanceof AST.Identifier) {
          properties.push(new AST.Property(key, key, 'init', computed, true));
        } else {
          throw new ParserError("الخاصية المختصرة يجب أن تكون معرفاً", this.previous());
        }
      } else {
        this.consume(TokenType.COLON, "توقع ':' بعد مفتاح الخاصية");
        const value = this.parseExpression();
        properties.push(new AST.Property(key, value, 'init', computed, false));
      }

      if (!this.check(TokenType.RBRACE)) {
        this.consume(TokenType.COMMA, "توقع ',' أو '}' في الكائن");
      }
    }

    this.consume(TokenType.RBRACE, "توقع '}' بعد خصائص الكائن");

    return new AST.ObjectExpression(properties);
  }

  private parseFunctionExpression(): AST.FunctionExpression {
    this.consume(TokenType.FUNCTION, "توقع 'دالة'");

    let name: AST.Identifier | null = null;
    if (this.check(TokenType.IDENTIFIER)) {
      name = this.parseIdentifier();
    }

    this.consume(TokenType.LPAREN, "توقع '(' بعد 'دالة'");
    const parameters = this.parseFunctionParameters();
    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات الدالة");

    const body = this.parseBlockStatement();

    return new AST.FunctionExpression(name, parameters, body);
  }

  private parseArrowFunction(): AST.ArrowFunctionExpression {
    this.consume(TokenType.LPAREN, "توقع '(' في دالة السهم");
    const parameters = this.parseFunctionParameters();
    this.consume(TokenType.RPAREN, "توقع ')' في دالة السهم");
    this.consume(TokenType.ARROW, "توقع '=>' في دالة السهم");

    const body = this.check(TokenType.LBRACE) ?
      this.parseBlockStatement() :
      this.parseExpression();

    return new AST.ArrowFunctionExpression(parameters, body);
  }

  private parseIdentifier(): AST.Identifier {
    if (!this.check(TokenType.IDENTIFIER)) {
      throw new ParserError(`توقع معرف، وجد: ${this.peek().value}`, this.peek());
    }

    return new AST.Identifier(String(this.advance().value));
  }

  // ============================================================================
  // دوال مساعدة
  // ============================================================================

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) {
      return this.advance();
    }

    throw new ParserError(message, this.peek());
  }

  // ============================================================================
  // تحليل التعبيرات المنطقية المتقدمة
  // ============================================================================

  /**
   * تحليل النفي كفشل
   * مثال: ليس والد("أحمد", "علي")
   * Example: not parent("Ahmed", "Ali")
   */
  private parseNegationExpression(): AST.NegationExpression {
    this.consume(TokenType.NOT, "توقع 'ليس' أو 'not'");

    // تحليل الاستعلام المنفي
    const goal = this.parseQueryExpression();

    return new AST.NegationExpression(goal);
  }

  /**
   * تحليل FindAll
   * مثال: اجمع_كل(?س, والد("أحمد", ?س), ?أبناء)
   * Example: findall(?x, parent("Ahmed", ?x), ?children)
   */
  private parseFindAllExpression(): AST.FindAllExpression {
    this.consume(TokenType.FINDALL, "توقع 'اجمع_كل' أو 'findall'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'اجمع_كل'");

    // Template - القالب
    const template = this.parseExpression();
    this.consume(TokenType.COMMA, "توقع ',' بعد القالب");

    // Goal - الهدف
    const goal = this.parseQueryExpression();
    this.consume(TokenType.COMMA, "توقع ',' بعد الهدف");

    // Result - النتيجة
    const result = this.parseIdentifier();
    this.consume(TokenType.RPAREN, "توقع ')' بعد النتيجة");

    return new AST.FindAllExpression(template, goal, result);
  }

  /**
   * تحليل BagOf
   * مثال: كيس_من(?س, طالب(?س, "حاسب"), ?طلاب)
   */
  private parseBagOfExpression(): AST.BagOfExpression {
    this.consume(TokenType.BAGOF, "توقع 'كيس_من' أو 'bagof'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'كيس_من'");

    const template = this.parseExpression();
    this.consume(TokenType.COMMA, "توقع ',' بعد القالب");

    const goal = this.parseQueryExpression();
    this.consume(TokenType.COMMA, "توقع ',' بعد الهدف");

    const result = this.parseIdentifier();
    this.consume(TokenType.RPAREN, "توقع ')' بعد النتيجة");

    return new AST.BagOfExpression(template, goal, result);
  }

  /**
   * تحليل SetOf
   * مثال: مجموعة_من(?س, مدينة(?س), ?مدن)
   */
  private parseSetOfExpression(): AST.SetOfExpression {
    this.consume(TokenType.SETOF, "توقع 'مجموعة_من' أو 'setof'");
    this.consume(TokenType.LPAREN, "توقع '(' بعد 'مجموعة_من'");

    const template = this.parseExpression();
    this.consume(TokenType.COMMA, "توقع ',' بعد القالب");

    const goal = this.parseQueryExpression();
    this.consume(TokenType.COMMA, "توقع ',' بعد الهدف");

    const result = this.parseIdentifier();
    this.consume(TokenType.RPAREN, "توقع ')' بعد النتيجة");

    return new AST.SetOfExpression(template, goal, result);
  }

  /**
   * تحليل Assert
   * مثال: أضف والد("علي", "محمد")
   * Example: assert parent("Ali", "Mohamed")
   */
  private parseAssertExpression(): AST.AssertExpression {
    this.consume(TokenType.ASSERT, "توقع 'أضف' أو 'assert'");

    // يمكن أن يكون حقيقة أو قاعدة
    // نحاول تحليله كحقيقة أولاً
    const predicate = this.parseIdentifier().name;
    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم المحمول");

    const args: AST.Expression[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }
        args.push(this.parseExpression());
      } while (this.check(TokenType.COMMA));
    }

    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات المحمول");

    const fact = new AST.FactDeclaration(predicate, args);
    return new AST.AssertExpression(fact);
  }

  /**
   * تحليل Retract
   * مثال: احذف والد("علي", "محمد")
   * Example: retract parent("Ali", "Mohamed")
   */
  private parseRetractExpression(): AST.RetractExpression {
    this.consume(TokenType.RETRACT, "توقع 'احذف' أو 'retract'");

    const predicate = this.parseIdentifier().name;
    this.consume(TokenType.LPAREN, "توقع '(' بعد اسم المحمول");

    const args: AST.Expression[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        if (this.check(TokenType.COMMA)) {
          this.advance();
        }
        args.push(this.parseExpression());
      } while (this.check(TokenType.COMMA));
    }

    this.consume(TokenType.RPAREN, "توقع ')' بعد معاملات المحمول");

    const fact = new AST.FactDeclaration(predicate, args);
    return new AST.RetractExpression(fact);
  }

  private consumeSemicolon(): void {
    // Semicolons are optional in our language
    if (this.check(TokenType.SEMICOLON)) {
      this.advance();
    } else if (this.check(TokenType.NEWLINE)) {
      this.advance();
    }
    // Otherwise, we allow implicit semicolons
  }

  // ============================================================================
  // Type System Parsing - تحليل نظام الأنواع
  // ============================================================================

  /**
   * تحليل Type Annotation
   * مثال: : رقم، : نص[]، : رقم | نص
   */
  private parseTypeAnnotation(): AST.TypeAnnotation | null {
    if (!this.check(TokenType.COLON)) {
      return null;
    }

    this.advance(); // consume ':'
    return this.parseType();
  }

  /**
   * تحليل Type
   */
  private parseType(): AST.TypeAnnotation {
    return this.parseUnionType();
  }

  /**
   * تحليل Union Type
   * مثال: رقم | نص | منطقي
   */
  private parseUnionType(): AST.TypeAnnotation {
    const types: AST.TypeAnnotation[] = [this.parseIntersectionType()];

    while (this.check(TokenType.PIPE)) {
      this.advance(); // consume '|'
      types.push(this.parseIntersectionType());
    }

    return types.length === 1 ? types[0] : new AST.UnionType(types);
  }

  /**
   * تحليل Intersection Type
   * مثال: شخص & موظف
   */
  private parseIntersectionType(): AST.TypeAnnotation {
    const types: AST.TypeAnnotation[] = [this.parsePrimaryType()];

    while (this.check(TokenType.AND)) {
      this.advance(); // consume '&'
      types.push(this.parsePrimaryType());
    }

    return types.length === 1 ? types[0] : new AST.IntersectionType(types);
  }

  /**
   * تحليل Primary Type
   */
  private parsePrimaryType(): AST.TypeAnnotation {
    // Primitive types
    if (this.check(TokenType.NUMBER_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('number');
    }
    if (this.check(TokenType.STRING_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('string');
    }
    if (this.check(TokenType.BOOLEAN_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('boolean');
    }
    if (this.check(TokenType.ANY_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('any');
    }
    if (this.check(TokenType.VOID_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('void');
    }
    if (this.check(TokenType.NEVER_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('never');
    }
    if (this.check(TokenType.UNKNOWN_TYPE)) {
      this.advance();
      return new AST.PrimitiveType('unknown');
    }

    // Type reference or generic type
    if (this.check(TokenType.IDENTIFIER)) {
      const name = this.parseIdentifier();

      // Check for generic type parameters
      if (this.check(TokenType.LESS_THAN)) {
        this.advance(); // consume '<'
        const typeParameters: AST.TypeAnnotation[] = [];

        do {
          if (this.check(TokenType.COMMA)) {
            this.advance();
          }
          typeParameters.push(this.parseType());
        } while (this.check(TokenType.COMMA));

        this.consume(TokenType.GREATER_THAN, "توقع '>' بعد معاملات النوع");
        return new AST.GenericType(name, typeParameters);
      }

      return new AST.TypeReference(name);
    }

    // Array type with []
    if (this.check(TokenType.LBRACKET)) {
      this.advance(); // consume '['
      this.consume(TokenType.RBRACKET, "توقع ']'");
      // This is actually handled in postfix, but we support it here too
      return new AST.ArrayType(new AST.PrimitiveType('any'));
    }

    throw new Error(`نوع غير متوقع: ${this.peek().type}`);
  }

  // Error recovery - currently unused but kept for future use
  // @ts-ignore - unused but kept for future error recovery
  private synchronize(): void {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) return;

      switch (this.peek().type) {
        case TokenType.CLASS:
        case TokenType.FUNCTION:
        case TokenType.LET:
        case TokenType.CONST:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.RETURN:
          return;
      }

      this.advance();
    }
  }
}

