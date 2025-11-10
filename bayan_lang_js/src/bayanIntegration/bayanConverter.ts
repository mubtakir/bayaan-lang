/**
 * محول البيان - Bayan Converter
 * Converts between Bayan language and Baserah AI representations
 */

export type BayanType = 'number' | 'string' | 'boolean' | 'array' | 'object' | 'function' | 'class' | 'module';
export type ConversionDirection = 'bayan-to-baserah' | 'baserah-to-bayan';

export interface BayanToken {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface BayanAST {
  type: string;
  value?: any;
  children: BayanAST[];
  metadata: Map<string, any>;
}

export interface BaserahRepresentation {
  id: string;
  type: BayanType;
  properties: Map<string, any>;
  states: Map<string, any>;
  transformations: Array<(input: any) => any>;
  timestamp: number;
}

export interface ConversionResult {
  success: boolean;
  result: BaserahRepresentation | BayanAST | null;
  errors: string[];
  warnings: string[];
  metadata: Map<string, any>;
}

export class BayanConverter {
  private conversionCache: Map<string, ConversionResult> = new Map();
  private conversionCounter: number = 0;
  
  // Bayan keywords
  private readonly bayanKeywords: Set<string> = new Set([
    'متغير', 'ثابت', 'دالة', 'فئة', 'وحدة', 'استيراد', 'تصدير',
    'إذا', 'وإلا', 'كرر', 'طالما', 'لكل', 'أرجع', 'اطبع',
    'صحيح', 'خطأ', 'فارغ', 'غير_معرف'
  ]);
  
  convertBayanToBaserah(bayanCode: string): ConversionResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const metadata = new Map<string, any>();
    
    try {
      // Tokenize
      const tokens = this.tokenize(bayanCode);
      metadata.set('tokenCount', tokens.length);
      
      // Parse to AST
      const ast = this.parse(tokens);
      metadata.set('astNodeCount', this.countASTNodes(ast));
      
      // Convert to Baserah representation
      const baserahRep = this.astToBaserah(ast);
      
      metadata.set('conversionTime', Date.now());
      
      return {
        success: true,
        result: baserahRep,
        errors,
        warnings,
        metadata
      };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
      
      return {
        success: false,
        result: null,
        errors,
        warnings,
        metadata
      };
    }
  }
  
  convertBaserahToBayan(baserahRep: BaserahRepresentation): ConversionResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const metadata = new Map<string, any>();
    
    try {
      // Convert Baserah to AST
      const ast = this.baserahToAST(baserahRep);
      metadata.set('astNodeCount', this.countASTNodes(ast));
      
      // Generate Bayan code
      const bayanCode = this.generateBayanCode(ast);
      metadata.set('codeLength', bayanCode.length);
      metadata.set('conversionTime', Date.now());
      
      return {
        success: true,
        result: ast,
        errors,
        warnings,
        metadata
      };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
      
      return {
        success: false,
        result: null,
        errors,
        warnings,
        metadata
      };
    }
  }
  
  private tokenize(code: string): BayanToken[] {
    const tokens: BayanToken[] = [];
    const lines = code.split('\n');
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];
      const words = line.trim().split(/\s+/);
      
      for (let colNum = 0; colNum < words.length; colNum++) {
        const word = words[colNum];
        if (word.length === 0) continue;
        
        const type = this.getTokenType(word);
        
        tokens.push({
          type,
          value: word,
          line: lineNum + 1,
          column: colNum + 1
        });
      }
    }
    
    return tokens;
  }
  
  private getTokenType(word: string): string {
    if (this.bayanKeywords.has(word)) {
      return 'KEYWORD';
    }
    
    if (/^\d+$/.test(word)) {
      return 'NUMBER';
    }
    
    if (/^".*"$/.test(word) || /^'.*'$/.test(word)) {
      return 'STRING';
    }
    
    if (/^[a-zA-Zأ-ي_][a-zA-Zأ-ي0-9_]*$/.test(word)) {
      return 'IDENTIFIER';
    }
    
    return 'OPERATOR';
  }
  
  private parse(tokens: BayanToken[]): BayanAST {
    const root: BayanAST = {
      type: 'PROGRAM',
      children: [],
      metadata: new Map()
    };
    
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      
      if (token.type === 'KEYWORD') {
        if (token.value === 'متغير' || token.value === 'ثابت') {
          const varNode = this.parseVariable(tokens, i);
          root.children.push(varNode);
          i += 3; // Skip variable declaration
        } else if (token.value === 'دالة') {
          const funcNode = this.parseFunction(tokens, i);
          root.children.push(funcNode);
          i += 4; // Skip function declaration
        } else {
          i++;
        }
      } else {
        i++;
      }
    }
    
    return root;
  }
  
  private parseVariable(tokens: BayanToken[], startIndex: number): BayanAST {
    const keyword = tokens[startIndex];
    const name = tokens[startIndex + 1];
    const value = tokens[startIndex + 2];
    
    return {
      type: 'VARIABLE',
      value: {
        name: name?.value || '',
        value: value?.value || '',
        isConstant: keyword.value === 'ثابت'
      },
      children: [],
      metadata: new Map([
        ['line', keyword.line],
        ['column', keyword.column]
      ])
    };
  }
  
  private parseFunction(tokens: BayanToken[], startIndex: number): BayanAST {
    const keyword = tokens[startIndex];
    const name = tokens[startIndex + 1];
    
    return {
      type: 'FUNCTION',
      value: {
        name: name?.value || '',
        parameters: [],
        body: []
      },
      children: [],
      metadata: new Map([
        ['line', keyword.line],
        ['column', keyword.column]
      ])
    };
  }
  
  private astToBaserah(ast: BayanAST): BaserahRepresentation {
    const id = `baserah_${this.conversionCounter++}`;
    
    const representation: BaserahRepresentation = {
      id,
      type: this.mapASTTypeToBaserahType(ast.type),
      properties: new Map(),
      states: new Map(),
      transformations: [],
      timestamp: Date.now()
    };
    
    // Map AST properties to Baserah properties
    if (ast.value) {
      for (const [key, value] of Object.entries(ast.value)) {
        representation.properties.set(key, value);
      }
    }
    
    // Map AST metadata to Baserah states
    for (const [key, value] of ast.metadata.entries()) {
      representation.states.set(key, value);
    }
    
    return representation;
  }
  
  private baserahToAST(baserahRep: BaserahRepresentation): BayanAST {
    const ast: BayanAST = {
      type: this.mapBaserahTypeToBayanType(baserahRep.type),
      value: {},
      children: [],
      metadata: new Map()
    };
    
    // Map Baserah properties to AST value
    for (const [key, value] of baserahRep.properties.entries()) {
      ast.value[key] = value;
    }
    
    // Map Baserah states to AST metadata
    for (const [key, value] of baserahRep.states.entries()) {
      ast.metadata.set(key, value);
    }
    
    return ast;
  }
  
  private generateBayanCode(ast: BayanAST): string {
    let code = '';
    
    if (ast.type === 'PROGRAM') {
      for (const child of ast.children) {
        code += this.generateBayanCode(child) + '\n';
      }
    } else if (ast.type === 'VARIABLE') {
      const keyword = ast.value.isConstant ? 'ثابت' : 'متغير';
      code = `${keyword} ${ast.value.name} = ${ast.value.value}`;
    } else if (ast.type === 'FUNCTION') {
      code = `دالة ${ast.value.name}() {\n  // Function body\n}`;
    }
    
    return code;
  }
  
  private mapASTTypeToBaserahType(astType: string): BayanType {
    const mapping: Record<string, BayanType> = {
      'VARIABLE': 'object',
      'FUNCTION': 'function',
      'CLASS': 'class',
      'MODULE': 'module',
      'NUMBER': 'number',
      'STRING': 'string',
      'BOOLEAN': 'boolean',
      'ARRAY': 'array'
    };
    
    return mapping[astType] || 'object';
  }
  
  private mapBaserahTypeToBayanType(baserahType: BayanType): string {
    const mapping: Record<BayanType, string> = {
      'object': 'VARIABLE',
      'function': 'FUNCTION',
      'class': 'CLASS',
      'module': 'MODULE',
      'number': 'NUMBER',
      'string': 'STRING',
      'boolean': 'BOOLEAN',
      'array': 'ARRAY'
    };
    
    return mapping[baserahType] || 'VARIABLE';
  }
  
  private countASTNodes(ast: BayanAST): number {
    let count = 1;
    for (const child of ast.children) {
      count += this.countASTNodes(child);
    }
    return count;
  }
  
  getConversionCache(): Map<string, ConversionResult> {
    return new Map(this.conversionCache);
  }
  
  clearCache(): void {
    this.conversionCache.clear();
  }
  
  getStatistics(): {
    totalConversions: number;
    cacheSize: number;
    supportedKeywords: number;
  } {
    return {
      totalConversions: this.conversionCounter,
      cacheSize: this.conversionCache.size,
      supportedKeywords: this.bayanKeywords.size
    };
  }
}

