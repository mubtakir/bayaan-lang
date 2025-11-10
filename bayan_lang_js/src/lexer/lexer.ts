/**
 * المحلل المعجمي (Lexer) للغة البيان
 * يحول النص المصدري إلى سلسلة من الرموز (Tokens)
 */

import { Token, TokenType, KEYWORDS, OPERATORS } from './tokens';

export class LexerError extends Error {
  constructor(
    message: string,
    public line: number,
    public column: number
  ) {
    super(`خطأ معجمي في السطر ${line}، العمود ${column}: ${message}`);
    this.name = 'LexerError';
  }
}

export class Lexer {
  private position = 0;
  private line = 1;
  private column = 1;
  private tokens: Token[] = [];
  private source: string;

  constructor(source: string) {
    this.source = source;
  }

  /**
   * تحليل النص المصدري وإرجاع قائمة الرموز
   */
  tokenize(): Token[] {
    this.tokens = [];
    this.position = 0;
    this.line = 1;
    this.column = 1;

    while (this.position < this.source.length) {
      this.skipWhitespace();
      
      if (this.position >= this.source.length) {
        break;
      }

      const char = this.currentChar();
      
      // التعليقات
      if (char === '/' && this.peek() === '/') {
        this.skipSingleLineComment();
        continue;
      }
      
      if (char === '/' && this.peek() === '*') {
        this.skipMultiLineComment();
        continue;
      }
      
      // الأرقام
      if (this.isDigit(char)) {
        this.readNumber();
        continue;
      }
      
      // المعرفات والكلمات المفتاحية
      if (this.isAlpha(char)) {
        this.readIdentifier();
        continue;
      }
      
      // النصوص
      if (char === '"' || char === "'" || char === '`') {
        this.readString(char);
        continue;
      }
      
      // الرموز والعمليات
      this.readOperatorOrSymbol();
    }

    this.addToken(TokenType.EOF, '');
    return this.tokens;
  }

  /**
   * قراءة رقم (صحيح أو عشري أو علمي)
   */
  private readNumber(): void {
    let value = '';
    let hasDot = false;
    let hasExponent = false;
    const startColumn = this.column;

    while (this.position < this.source.length) {
      const char = this.currentChar();
      
      if (this.isDigit(char)) {
        value += char;
        this.advance();
      } else if (char === '.' && !hasDot && !hasExponent) {
        // التحقق من أن النقطة ليست جزءاً من عملية الوصول للخصائص
        if (this.isDigit(this.peek())) {
          value += char;
          hasDot = true;
          this.advance();
        } else {
          break;
        }
      } else if ((char === 'e' || char === 'E') && !hasExponent) {
        value += char;
        hasExponent = true;
        this.advance();
        
        // التعامل مع الإشارة بعد E
        if (this.currentChar() === '+' || this.currentChar() === '-') {
          value += this.currentChar();
          this.advance();
        }
      } else if (char === '_') {
        // دعم الفواصل في الأرقام (مثل 1_000_000)
        this.advance();
      } else {
        break;
      }
    }

    this.tokens.push({
      type: TokenType.NUMBER,
      value: parseFloat(value),
      line: this.line,
      column: startColumn
    });
  }

  /**
   * قراءة معرف أو كلمة مفتاحية
   */
  private readIdentifier(): void {
    let value = '';
    const startColumn = this.column;

    while (this.position < this.source.length) {
      const char = this.currentChar();
      
      if (this.isAlphaNumeric(char)) {
        value += char;
        this.advance();
      } else {
        break;
      }
    }

    // التحقق من الكلمات المفتاحية (عربي أو إنجليزي)
    // Check for keywords (Arabic or English)
    const keywordType = KEYWORDS[value];
    const tokenType = keywordType || TokenType.IDENTIFIER;

    this.tokens.push({
      type: tokenType,
      value,
      line: this.line,
      column: startColumn
    });
  }

  /**
   * قراءة نص (string)
   */
  private readString(quote: string): void {
    let value = '';
    const startColumn = this.column;
    const startLine = this.line;
    
    this.advance(); // تخطي علامة الاقتباس الافتتاحية

    while (this.position < this.source.length) {
      const char = this.currentChar();
      
      if (char === quote) {
        this.advance(); // تخطي علامة الاقتباس الختامية
        break;
      }
      
      if (char === '\\') {
        this.advance();
        
        if (this.position >= this.source.length) {
          throw new LexerError('نهاية غير متوقعة للنص', this.line, this.column);
        }
        
        // معالجة تسلسلات الهروب
        const escapeChar = this.currentChar();
        switch (escapeChar) {
          case 'n': value += '\n'; break;
          case 't': value += '\t'; break;
          case 'r': value += '\r'; break;
          case '\\': value += '\\'; break;
          case '"': value += '"'; break;
          case "'": value += "'"; break;
          case '`': value += '`'; break;
          case '0': value += '\0'; break;
          case 'u': {
            // Unicode escape sequence
            this.advance();
            let unicode = '';
            for (let i = 0; i < 4; i++) {
              if (this.position >= this.source.length || !this.isHexDigit(this.currentChar())) {
                throw new LexerError('تسلسل Unicode غير صحيح', this.line, this.column);
              }
              unicode += this.currentChar();
              this.advance();
            }
            value += String.fromCharCode(parseInt(unicode, 16));
            continue;
          }
          default:
            value += escapeChar;
        }
        this.advance();
      } else if (char === '\n') {
        if (quote !== '`') {
          throw new LexerError('سطر جديد غير مسموح في النص', this.line, this.column);
        }
        value += char;
        this.advance();
        this.line++;
        this.column = 1;
      } else {
        value += char;
        this.advance();
      }
    }

    if (this.position >= this.source.length && this.source[this.position - 1] !== quote) {
      throw new LexerError('نص غير مكتمل', startLine, startColumn);
    }

    this.tokens.push({
      type: TokenType.STRING,
      value,
      line: startLine,
      column: startColumn
    });
  }

  /**
   * قراءة عملية أو رمز
   */
  private readOperatorOrSymbol(): void {
    const char = this.currentChar();
    const startColumn = this.column;
    
    // محاولة قراءة عمليات متعددة الأحرف
    const threeChar = this.source.substr(this.position, 3);
    const twoChar = this.source.substr(this.position, 2);
    const oneChar = char;
    
    if (OPERATORS[threeChar]) {
      this.tokens.push({
        type: OPERATORS[threeChar],
        value: threeChar,
        line: this.line,
        column: startColumn
      });
      this.advance();
      this.advance();
      this.advance();
      return;
    }
    
    if (OPERATORS[twoChar]) {
      this.tokens.push({
        type: OPERATORS[twoChar],
        value: twoChar,
        line: this.line,
        column: startColumn
      });
      this.advance();
      this.advance();
      return;
    }
    
    if (OPERATORS[oneChar]) {
      this.tokens.push({
        type: OPERATORS[oneChar],
        value: oneChar,
        line: this.line,
        column: startColumn
      });
      this.advance();
      return;
    }
    
    // الرموز الأخرى
    switch (char) {
      case '(': this.addToken(TokenType.LPAREN, char); this.advance(); break;
      case ')': this.addToken(TokenType.RPAREN, char); this.advance(); break;
      case '{': this.addToken(TokenType.LBRACE, char); this.advance(); break;
      case '}': this.addToken(TokenType.RBRACE, char); this.advance(); break;
      case '[': this.addToken(TokenType.LBRACKET, char); this.advance(); break;
      case ']': this.addToken(TokenType.RBRACKET, char); this.advance(); break;
      case ',':
      case '،': // Arabic comma
        this.addToken(TokenType.COMMA, char); this.advance(); break;
      case '.': this.addToken(TokenType.DOT, char); this.advance(); break;
      case ':': this.addToken(TokenType.COLON, char); this.advance(); break;
      case ';': this.addToken(TokenType.SEMICOLON, char); this.advance(); break;
      case '?':
      case '؟': // Arabic question mark
        this.addToken(TokenType.QUESTION, char); this.advance(); break;
      default:
        throw new LexerError(`رمز غير معروف: '${char}'`, this.line, this.column);
    }
  }

  /**
   * تخطي المسافات البيضاء
   */
  private skipWhitespace(): void {
    while (this.position < this.source.length) {
      const char = this.currentChar();

      if (char === ' ' || char === '\t' || char === '\r') {
        this.advance();
      } else if (char === '\n') {
        this.advance();
        this.line++;
        this.column = 1;
      } else {
        break;
      }
    }
  }

  /**
   * تخطي تعليق سطر واحد
   */
  private skipSingleLineComment(): void {
    while (this.position < this.source.length && this.currentChar() !== '\n') {
      this.advance();
    }
  }

  /**
   * تخطي تعليق متعدد الأسطر
   */
  private skipMultiLineComment(): void {
    const startLine = this.line;
    const startColumn = this.column;

    this.advance(); // تخطي /
    this.advance(); // تخطي *

    while (this.position < this.source.length - 1) {
      if (this.currentChar() === '*' && this.peek() === '/') {
        this.advance(); // تخطي *
        this.advance(); // تخطي /
        return;
      }

      if (this.currentChar() === '\n') {
        this.line++;
        this.column = 1;
      }

      this.advance();
    }

    throw new LexerError('تعليق غير مكتمل', startLine, startColumn);
  }

  /**
   * الحصول على الحرف الحالي
   */
  private currentChar(): string {
    return this.source[this.position];
  }

  /**
   * النظر إلى الحرف التالي دون التقدم
   */
  private peek(offset: number = 1): string {
    const pos = this.position + offset;
    if (pos >= this.source.length) {
      return '\0';
    }
    return this.source[pos];
  }

  /**
   * التقدم إلى الحرف التالي
   */
  private advance(): void {
    this.position++;
    this.column++;
  }

  /**
   * إضافة رمز إلى القائمة
   */
  private addToken(type: TokenType, value: string): void {
    this.tokens.push({
      type,
      value,
      line: this.line,
      column: this.column
    });
  }

  /**
   * التحقق من أن الحرف رقم
   */
  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  /**
   * التحقق من أن الحرف رقم سداسي عشري
   */
  private isHexDigit(char: string): boolean {
    return /[0-9a-fA-F]/.test(char);
  }

  /**
   * التحقق من أن الحرف حرف أبجدي (عربي أو إنجليزي)
   */
  private isAlpha(char: string): boolean {
    // Exclude Arabic comma (،) and other punctuation
    if (char === '،' || char === '؛' || char === '؟') {
      return false;
    }
    return /[a-zA-Z_ء-ي\u0600-\u06FF]/.test(char);
  }

  /**
   * التحقق من أن الحرف حرف أبجدي رقمي
   */
  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }

  /**
   * الحصول على معلومات الموقع الحالي
   */
  getPosition(): { line: number; column: number; position: number } {
    return {
      line: this.line,
      column: this.column,
      position: this.position
    };
  }
}

