/**
 * تعريفات الشجرة التجريدية (AST) للغة البيان
 * تدعم البرمجة الإجرائية والكائنية والمنطقية
 */

/**
 * العقدة الأساسية لجميع عقد AST
 */
export interface ASTNode {
  type: string;
  line?: number;
  column?: number;
}

// ============================================================================
// البرنامج الرئيسي
// ============================================================================

export class Program implements ASTNode {
  type = 'Program';
  constructor(public body: Statement[]) {}
}

// ============================================================================
// أنواع العبارات (Statements)
// ============================================================================

export type Statement = 
  | Program
  | ExpressionStatement
  | VariableDeclaration
  | FunctionDeclaration
  | ClassDeclaration
  | InterfaceDeclaration
  | IfStatement
  | WhileStatement
  | DoWhileStatement
  | ForStatement
  | ForInStatement
  | ForOfStatement
  | ReturnStatement
  | BreakStatement
  | ContinueStatement
  | BlockStatement
  | TryStatement
  | ThrowStatement
  | SwitchStatement
  | ImportDeclaration
  | ExportDeclaration
  | HybridBlock
  | FactDeclaration
  | RuleDeclaration;

// ============================================================================
// أنواع التعبيرات (Expressions)
// ============================================================================

export type Expression =
  | Identifier
  | Literal
  | BinaryExpression
  | UnaryExpression
  | UpdateExpression
  | CallExpression
  | MemberExpression
  | AssignmentExpression
  | LogicalExpression
  | ConditionalExpression
  | ArrayExpression
  | ObjectExpression
  | FunctionExpression
  | ArrowFunctionExpression
  | ThisExpression
  | SuperExpression
  | NewExpression
  | QueryExpression
  | AwaitExpression
  | SpreadExpression
  | TemplateExpression
  | NegationExpression
  | CutExpression
  | FindAllExpression
  | BagOfExpression
  | SetOfExpression
  | AssertExpression
  | RetractExpression
  | IsExpression;

// ============================================================================
// العبارات الأساسية
// ============================================================================

export class ExpressionStatement implements ASTNode {
  type = 'ExpressionStatement';
  constructor(public expression: Expression) {}
}

export class VariableDeclaration implements ASTNode {
  type = 'VariableDeclaration';
  constructor(
    public kind: 'دع' | 'ثابت' | 'متغير',
    public declarations: VariableDeclarator[]
  ) {}
}

export class VariableDeclarator implements ASTNode {
  type = 'VariableDeclarator';
  constructor(
    public id: Identifier,
    public init: Expression | null,
    public typeAnnotation?: TypeAnnotation | null
  ) {}
}

export class FunctionDeclaration implements ASTNode {
  type = 'FunctionDeclaration';
  constructor(
    public name: Identifier,
    public parameters: FunctionParameter[],
    public body: BlockStatement,
    public isAsync: boolean = false,
    public isGenerator: boolean = false,
    public returnType?: TypeAnnotation | null
  ) {}
}

export class FunctionParameter implements ASTNode {
  type = 'FunctionParameter';
  constructor(
    public name: Identifier,
    public defaultValue: Expression | null = null,
    public isRest: boolean = false,
    public typeAnnotation?: TypeAnnotation | null
  ) {}
}

// ============================================================================
// البرمجة الكائنية
// ============================================================================

export class ClassDeclaration implements ASTNode {
  type = 'ClassDeclaration';
  constructor(
    public name: Identifier,
    public superClass: Identifier | null,
    public interfaces: Identifier[],
    public body: ClassBody,
    public isAbstract: boolean = false
  ) {}
}

export class ClassBody implements ASTNode {
  type = 'ClassBody';
  constructor(public body: (MethodDefinition | PropertyDefinition)[]) {}
}

export class MethodDefinition implements ASTNode {
  type = 'MethodDefinition';
  constructor(
    public kind: 'method' | 'constructor' | 'get' | 'set',
    public key: Identifier,
    public parameters: FunctionParameter[],
    public body: BlockStatement,
    public isStatic: boolean = false,
    public isAsync: boolean = false,
    public isAbstract: boolean = false,
    public accessModifier: 'public' | 'private' | 'protected' = 'public'
  ) {}
}

export class PropertyDefinition implements ASTNode {
  type = 'PropertyDefinition';
  constructor(
    public key: Identifier,
    public value: Expression | null,
    public isStatic: boolean = false,
    public accessModifier: 'public' | 'private' | 'protected' = 'public'
  ) {}
}

export class InterfaceDeclaration implements ASTNode {
  type = 'InterfaceDeclaration';
  constructor(
    public name: Identifier,
    public extendsInterfaces: Identifier[],
    public body: InterfaceBody
  ) {}
}

export class InterfaceBody implements ASTNode {
  type = 'InterfaceBody';
  constructor(public body: (MethodSignature | PropertySignature)[]) {}
}

export class MethodSignature implements ASTNode {
  type = 'MethodSignature';
  constructor(
    public key: Identifier,
    public parameters: FunctionParameter[]
  ) {}
}

export class PropertySignature implements ASTNode {
  type = 'PropertySignature';
  constructor(public key: Identifier) {}
}

// ============================================================================
// عبارات التحكم
// ============================================================================

export class IfStatement implements ASTNode {
  type = 'IfStatement';
  constructor(
    public test: Expression,
    public consequent: BlockStatement,
    public alternate: BlockStatement | IfStatement | null
  ) {}
}

export class WhileStatement implements ASTNode {
  type = 'WhileStatement';
  constructor(
    public test: Expression,
    public body: BlockStatement
  ) {}
}

export class DoWhileStatement implements ASTNode {
  type = 'DoWhileStatement';
  constructor(
    public body: BlockStatement,
    public test: Expression
  ) {}
}

export class ForStatement implements ASTNode {
  type = 'ForStatement';
  constructor(
    public init: VariableDeclaration | Expression | null,
    public test: Expression | null,
    public update: Expression | null,
    public body: BlockStatement
  ) {}
}

export class ForInStatement implements ASTNode {
  type = 'ForInStatement';
  constructor(
    public left: VariableDeclaration | Identifier,
    public right: Expression,
    public body: BlockStatement
  ) {}
}

export class ForOfStatement implements ASTNode {
  type = 'ForOfStatement';
  constructor(
    public left: VariableDeclaration | Identifier,
    public right: Expression,
    public body: BlockStatement
  ) {}
}

export class SwitchStatement implements ASTNode {
  type = 'SwitchStatement';
  constructor(
    public discriminant: Expression,
    public cases: SwitchCase[]
  ) {}
}

export class SwitchCase implements ASTNode {
  type = 'SwitchCase';
  constructor(
    public test: Expression | null, // null for default case
    public consequent: Statement[]
  ) {}
}

export class ReturnStatement implements ASTNode {
  type = 'ReturnStatement';
  constructor(public argument: Expression | null) {}
}

export class BreakStatement implements ASTNode {
  type = 'BreakStatement';
  constructor(public label: Identifier | null = null) {}
}

export class ContinueStatement implements ASTNode {
  type = 'ContinueStatement';
  constructor(public label: Identifier | null = null) {}
}

export class BlockStatement implements ASTNode {
  type = 'BlockStatement';
  constructor(public body: Statement[]) {}
}

// ============================================================================
// معالجة الأخطاء
// ============================================================================

export class TryStatement implements ASTNode {
  type = 'TryStatement';
  constructor(
    public block: BlockStatement,
    public handler: CatchClause | null,
    public finalizer: BlockStatement | null
  ) {}
}

export class CatchClause implements ASTNode {
  type = 'CatchClause';
  constructor(
    public param: Identifier | null,
    public body: BlockStatement
  ) {}
}

export class ThrowStatement implements ASTNode {
  type = 'ThrowStatement';
  constructor(public argument: Expression) {}
}

// ============================================================================
// الاستيراد والتصدير
// ============================================================================

export class ImportDeclaration implements ASTNode {
  type = 'ImportDeclaration';
  constructor(
    public specifiers: ImportSpecifier[],
    public source: Literal
  ) {}
}

export class ImportSpecifier implements ASTNode {
  type = 'ImportSpecifier';
  constructor(
    public imported: Identifier,
    public local: Identifier | null = null
  ) {}
}

export class ExportDeclaration implements ASTNode {
  type = 'ExportDeclaration';
  constructor(
    public declaration: Statement | null,
    public specifiers: ExportSpecifier[],
    public source: Literal | null = null,
    public isDefault: boolean = false
  ) {}
}

export class ExportSpecifier implements ASTNode {
  type = 'ExportSpecifier';
  constructor(
    public local: Identifier,
    public exported: Identifier | null = null
  ) {}
}

// ============================================================================
// البرمجة المنطقية
// ============================================================================

export class HybridBlock implements ASTNode {
  type = 'HybridBlock';
  constructor(
    public body: Statement[]
  ) {}
}

export class FactDeclaration implements ASTNode {
  type = 'FactDeclaration';
  constructor(
    public predicate: string,
    public args: Expression[]
  ) {}
}

export class RuleDeclaration implements ASTNode {
  type = 'RuleDeclaration';
  constructor(
    public head: FactDeclaration,
    public body: FactDeclaration[]
  ) {}
}

export class QueryExpression implements ASTNode {
  type = 'QueryExpression';
  constructor(
    public goal: FactDeclaration
  ) {}
}

// ============================================================================
// التعبيرات الأساسية
// ============================================================================

export class Identifier implements ASTNode {
  type = 'Identifier';
  constructor(public name: string) {}
}

export class Literal implements ASTNode {
  type = 'Literal';
  constructor(
    public value: any,
    public raw?: string
  ) {}
}

export class BinaryExpression implements ASTNode {
  type = 'BinaryExpression';
  constructor(
    public operator: string,
    public left: Expression,
    public right: Expression
  ) {}
}

export class UnaryExpression implements ASTNode {
  type = 'UnaryExpression';
  constructor(
    public operator: string,
    public argument: Expression,
    public prefix: boolean = true
  ) {}
}

export class UpdateExpression implements ASTNode {
  type = 'UpdateExpression';
  constructor(
    public operator: '++' | '--',
    public argument: Expression,
    public prefix: boolean = true
  ) {}
}

export class CallExpression implements ASTNode {
  type = 'CallExpression';
  constructor(
    public callee: Expression,
    public args: Expression[]
  ) {}
}

export class MemberExpression implements ASTNode {
  type = 'MemberExpression';
  constructor(
    public object: Expression,
    public property: Expression,
    public computed: boolean = false
  ) {}
}

export class AssignmentExpression implements ASTNode {
  type = 'AssignmentExpression';
  constructor(
    public operator: string,
    public left: Expression,
    public right: Expression
  ) {}
}

export class LogicalExpression implements ASTNode {
  type = 'LogicalExpression';
  constructor(
    public operator: 'و' | 'أو' | '&&' | '||',
    public left: Expression,
    public right: Expression
  ) {}
}

export class ConditionalExpression implements ASTNode {
  type = 'ConditionalExpression';
  constructor(
    public test: Expression,
    public consequent: Expression,
    public alternate: Expression
  ) {}
}

export class ArrayExpression implements ASTNode {
  type = 'ArrayExpression';
  constructor(public elements: (Expression | null)[]) {}
}

export class ObjectExpression implements ASTNode {
  type = 'ObjectExpression';
  constructor(public properties: Property[]) {}
}

export class Property implements ASTNode {
  type = 'Property';
  constructor(
    public key: Identifier | Literal,
    public value: Expression,
    public kind: 'init' | 'get' | 'set' = 'init',
    public computed: boolean = false,
    public shorthand: boolean = false
  ) {}
}

export class FunctionExpression implements ASTNode {
  type = 'FunctionExpression';
  constructor(
    public name: Identifier | null,
    public parameters: FunctionParameter[],
    public body: BlockStatement,
    public isAsync: boolean = false,
    public isGenerator: boolean = false
  ) {}
}

export class ArrowFunctionExpression implements ASTNode {
  type = 'ArrowFunctionExpression';
  constructor(
    public parameters: FunctionParameter[],
    public body: BlockStatement | Expression,
    public isAsync: boolean = false
  ) {}
}

export class ThisExpression implements ASTNode {
  type = 'ThisExpression';
}

export class SuperExpression implements ASTNode {
  type = 'SuperExpression';
}

export class NewExpression implements ASTNode {
  type = 'NewExpression';
  constructor(
    public callee: Expression,
    public args: Expression[]
  ) {}
}

export class AwaitExpression implements ASTNode {
  type = 'AwaitExpression';
  constructor(public argument: Expression) {}
}

export class SpreadExpression implements ASTNode {
  type = 'SpreadExpression';
  constructor(public argument: Expression) {}
}

export class TemplateExpression implements ASTNode {
  type = 'TemplateExpression';
  constructor(
    public quasis: TemplateLiteral[],
    public expressions: Expression[]
  ) {}
}

export class TemplateLiteral implements ASTNode {
  type = 'TemplateLiteral';
  constructor(
    public value: string,
    public tail: boolean = false
  ) {}
}

// ============================================================================
// التعبيرات المنطقية المتقدمة (Advanced Logic Expressions)
// ============================================================================

/**
 * النفي كفشل (Negation as Failure)
 * مثال: ليس والد("أحمد", "علي")
 * Example: not parent("Ahmed", "Ali")
 */
export class NegationExpression implements ASTNode {
  type = 'NegationExpression';
  constructor(public goal: QueryExpression) {}
}

/**
 * عامل القطع (Cut Operator)
 * يمنع التراجع في القواعد المنطقية
 * مثال: قاعدة أكبر(?س, ?ص) :- ?س >= ?ص, قطع;
 */
export class CutExpression implements ASTNode {
  type = 'CutExpression';
}

/**
 * FindAll - جمع كل الحلول
 * مثال: اجمع_كل(?س, والد("أحمد", ?س), ?أبناء)
 * Example: findall(?x, parent("Ahmed", ?x), ?children)
 */
export class FindAllExpression implements ASTNode {
  type = 'FindAllExpression';
  constructor(
    public template: Expression,
    public goal: QueryExpression,
    public result: Identifier
  ) {}
}

/**
 * BagOf - جمع الحلول مع التكرار
 * مثال: كيس_من(?س, طالب(?س, "حاسب"), ?طلاب)
 */
export class BagOfExpression implements ASTNode {
  type = 'BagOfExpression';
  constructor(
    public template: Expression,
    public goal: QueryExpression,
    public result: Identifier
  ) {}
}

/**
 * SetOf - جمع الحلول الفريدة
 * مثال: مجموعة_من(?س, مدينة(?س), ?مدن)
 */
export class SetOfExpression implements ASTNode {
  type = 'SetOfExpression';
  constructor(
    public template: Expression,
    public goal: QueryExpression,
    public result: Identifier
  ) {}
}

/**
 * Assert - إضافة حقيقة أو قاعدة ديناميكياً
 * مثال: أضف والد("علي", "محمد")
 * Example: assert parent("Ali", "Mohamed")
 */
export class AssertExpression implements ASTNode {
  type = 'AssertExpression';
  constructor(
    public fact: FactDeclaration | RuleDeclaration
  ) {}
}

/**
 * Retract - حذف حقيقة أو قاعدة ديناميكياً
 * مثال: احذف والد("علي", "محمد")
 * Example: retract parent("Ali", "Mohamed")
 */
export class RetractExpression implements ASTNode {
  type = 'RetractExpression';
  constructor(
    public fact: FactDeclaration | RuleDeclaration
  ) {}
}

/**
 * Is - التقييم الحسابي
 * مثال: ?س هو 5 + 3
 * Example: ?x is 5 + 3
 */
export class IsExpression implements ASTNode {
  type = 'IsExpression';
  constructor(
    public variable: Identifier,
    public expression: Expression
  ) {}
}

// ============================================================================
// نظام الأنواع (Type System)
// ============================================================================

/**
 * Type Annotation - التعليق النوعي
 * مثال: متغير س: رقم = 5
 * Example: var x: number = 5
 */
export type TypeAnnotation =
  | PrimitiveType
  | ArrayType
  | ObjectType
  | UnionType
  | IntersectionType
  | GenericType
  | TypeReference;

/**
 * Primitive Type - النوع البدائي
 * مثال: رقم، نص، منطقي
 */
export class PrimitiveType implements ASTNode {
  type = 'PrimitiveType';
  constructor(
    public typeName: 'number' | 'string' | 'boolean' | 'any' | 'void' | 'never' | 'unknown'
  ) {}
}

/**
 * Array Type - نوع المصفوفة
 * مثال: رقم[]
 */
export class ArrayType implements ASTNode {
  type = 'ArrayType';
  constructor(
    public elementType: TypeAnnotation
  ) {}
}

/**
 * Object Type - نوع الكائن
 * مثال: { اسم: نص، عمر: رقم }
 */
export class ObjectType implements ASTNode {
  type = 'ObjectType';
  constructor(
    public properties: PropertySignature[]
  ) {}
}

/**
 * Union Type - نوع الاتحاد
 * مثال: رقم | نص
 */
export class UnionType implements ASTNode {
  type = 'UnionType';
  constructor(
    public types: TypeAnnotation[]
  ) {}
}

/**
 * Intersection Type - نوع التقاطع
 * مثال: شخص & موظف
 */
export class IntersectionType implements ASTNode {
  type = 'IntersectionType';
  constructor(
    public types: TypeAnnotation[]
  ) {}
}

/**
 * Generic Type - النوع العام
 * مثال: قائمة<رقم>
 */
export class GenericType implements ASTNode {
  type = 'GenericType';
  constructor(
    public name: Identifier,
    public typeParameters: TypeAnnotation[]
  ) {}
}

/**
 * Type Reference - مرجع النوع
 * مثال: شخص
 */
export class TypeReference implements ASTNode {
  type = 'TypeReference';
  constructor(
    public name: Identifier
  ) {}
}

/**
 * Type Alias Declaration - تعريف الاسم المستعار للنوع
 * مثال: نوع معرف = رقم | نص;
 */
export class TypeAliasDeclaration implements ASTNode {
  type = 'TypeAliasDeclaration';
  constructor(
    public name: Identifier,
    public typeParameters: Identifier[] | null,
    public typeAnnotation: TypeAnnotation
  ) {}
}

