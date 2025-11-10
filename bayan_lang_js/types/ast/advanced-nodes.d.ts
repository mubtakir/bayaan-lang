/**
 * Advanced AST Nodes for Bayan Language
 * عقد AST المتقدمة للغة البيان
 */
import { ASTNode } from './nodes';
/**
 * Generator Function - دالة مولدة
 * function* generator() { yield 1; }
 * دالة* مولد() { أنتج 1; }
 */
export interface GeneratorFunctionNode extends ASTNode {
    type: 'GeneratorFunction';
    name: string | null;
    params: string[];
    body: ASTNode[];
    isAsync?: boolean;
}
/**
 * Yield Expression - تعبير الإنتاج
 * yield value;
 * أنتج القيمة;
 */
export interface YieldExpressionNode extends ASTNode {
    type: 'YieldExpression';
    value: ASTNode | null;
    delegate: boolean;
}
/**
 * Enum Declaration - تعريف التعداد
 * enum Color { Red, Green, Blue }
 * تعداد اللون { أحمر، أخضر، أزرق }
 */
export interface EnumDeclarationNode extends ASTNode {
    type: 'EnumDeclaration';
    name: string;
    members: EnumMemberNode[];
}
export interface EnumMemberNode extends ASTNode {
    type: 'EnumMember';
    name: string;
    value?: ASTNode;
}
/**
 * Type Alias - اسم مستعار للنوع
 * type Point = { x: number, y: number };
 * نوع_بيانات نقطة = { س: رقم، ص: رقم };
 */
export interface TypeAliasNode extends ASTNode {
    type: 'TypeAlias';
    name: string;
    typeAnnotation: TypeNode;
}
/**
 * Type Annotation - تعليق النوع
 */
export interface TypeNode extends ASTNode {
    type: 'Type';
    kind: 'primitive' | 'array' | 'object' | 'function' | 'union' | 'tuple' | 'generic';
    value?: any;
    elementType?: TypeNode;
    properties?: PropertySignature[];
    parameters?: TypeNode[];
    returnType?: TypeNode;
    types?: TypeNode[];
}
export interface PropertySignature extends ASTNode {
    type: 'PropertySignature';
    name: string;
    typeAnnotation: TypeNode;
    optional?: boolean;
    readonly?: boolean;
}
/**
 * Match Expression - تعبير المطابقة
 * match value {
 *   case 1 => "one",
 *   case 2 => "two",
 *   default => "other"
 * }
 */
export interface MatchExpressionNode extends ASTNode {
    type: 'MatchExpression';
    value: ASTNode;
    cases: MatchCaseNode[];
    defaultCase?: ASTNode;
}
export interface MatchCaseNode extends ASTNode {
    type: 'MatchCase';
    pattern: ASTNode;
    guard?: ASTNode;
    body: ASTNode;
}
/**
 * Pattern - نمط
 * Used in match expressions and destructuring
 */
export interface PatternNode extends ASTNode {
    type: 'Pattern';
    kind: 'literal' | 'identifier' | 'array' | 'object' | 'rest';
    value?: any;
    elements?: PatternNode[];
    properties?: PatternPropertyNode[];
}
export interface PatternPropertyNode extends ASTNode {
    type: 'PatternProperty';
    key: string;
    value: PatternNode;
    shorthand?: boolean;
}
/**
 * Decorator - مزخرف
 * @decorator
 * class MyClass { }
 */
export interface DecoratorNode extends ASTNode {
    type: 'Decorator';
    expression: ASTNode;
}
/**
 * Decorated Declaration - تعريف مزخرف
 */
export interface DecoratedDeclarationNode extends ASTNode {
    type: 'DecoratedDeclaration';
    decorators: DecoratorNode[];
    declaration: ASTNode;
}
/**
 * Getter/Setter - محصل/مضبط
 * class Person {
 *   get name() { return this._name; }
 *   set name(value) { this._name = value; }
 * }
 */
export interface GetterNode extends ASTNode {
    type: 'Getter';
    name: string;
    body: ASTNode[];
}
export interface SetterNode extends ASTNode {
    type: 'Setter';
    name: string;
    param: string;
    body: ASTNode[];
}
/**
 * Namespace - نطاق
 * namespace Math {
 *   export function add(a, b) { return a + b; }
 * }
 */
export interface NamespaceNode extends ASTNode {
    type: 'Namespace';
    name: string;
    body: ASTNode[];
}
/**
 * Spread Element - عنصر النشر
 * [...array]
 * {...object}
 */
export interface SpreadElementNode extends ASTNode {
    type: 'SpreadElement';
    argument: ASTNode;
}
/**
 * Rest Element - عنصر الباقي
 * function(...args) { }
 * [first, ...rest] = array
 */
export interface RestElementNode extends ASTNode {
    type: 'RestElement';
    argument: ASTNode;
}
/**
 * Optional Chain Expression - تعبير السلسلة الاختيارية
 * obj?.property
 * obj?.[key]
 * func?.()
 */
export interface OptionalChainExpressionNode extends ASTNode {
    type: 'OptionalChainExpression';
    object: ASTNode;
    property?: ASTNode;
    computed?: boolean;
    optional: boolean;
}
/**
 * Nullish Coalescing - الدمج الفارغ
 * value ?? defaultValue
 */
export interface NullishCoalescingNode extends ASTNode {
    type: 'NullishCoalescing';
    left: ASTNode;
    right: ASTNode;
}
/**
 * Template Literal - قالب نصي
 * `Hello ${name}`
 */
export interface TemplateLiteralNode extends ASTNode {
    type: 'TemplateLiteral';
    quasis: TemplateElementNode[];
    expressions: ASTNode[];
}
export interface TemplateElementNode extends ASTNode {
    type: 'TemplateElement';
    value: string;
    tail: boolean;
}
/**
 * Tagged Template - قالب موسوم
 * tag`Hello ${name}`
 */
export interface TaggedTemplateNode extends ASTNode {
    type: 'TaggedTemplate';
    tag: ASTNode;
    template: TemplateLiteralNode;
}
/**
 * Tuple Type - نوع الصف
 * type Point = [number, number];
 */
export interface TupleTypeNode extends ASTNode {
    type: 'TupleType';
    elementTypes: TypeNode[];
}
/**
 * Named Parameters - معاملات مسماة
 * function greet(name: "Ali", age: 25) { }
 */
export interface NamedParameterNode extends ASTNode {
    type: 'NamedParameter';
    name: string;
    typeAnnotation?: TypeNode;
    defaultValue?: ASTNode;
    optional?: boolean;
}
/**
 * Named Argument - وسيط مسمى
 * greet(name: "Ali", age: 25)
 */
export interface NamedArgumentNode extends ASTNode {
    type: 'NamedArgument';
    name: string;
    value: ASTNode;
}
/**
 * Interface Declaration - تعريف الواجهة
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 */
export interface InterfaceDeclarationNode extends ASTNode {
    type: 'InterfaceDeclaration';
    name: string;
    extends?: string[];
    body: PropertySignature[];
}
/**
 * Abstract Class - صنف مجرد
 * abstract class Animal {
 *   abstract makeSound(): void;
 * }
 */
export interface AbstractClassNode extends ASTNode {
    type: 'AbstractClass';
    name: string;
    extends?: string;
    implements?: string[];
    body: ASTNode[];
}
/**
 * Abstract Method - دالة مجردة
 */
export interface AbstractMethodNode extends ASTNode {
    type: 'AbstractMethod';
    name: string;
    params: NamedParameterNode[];
    returnType?: TypeNode;
}
/**
 * Override Method - دالة متجاوزة
 */
export interface OverrideMethodNode extends ASTNode {
    type: 'OverrideMethod';
    name: string;
    params: NamedParameterNode[];
    returnType?: TypeNode;
    body: ASTNode[];
}
/**
 * Readonly Property - خاصية للقراءة فقط
 */
export interface ReadonlyPropertyNode extends ASTNode {
    type: 'ReadonlyProperty';
    name: string;
    typeAnnotation?: TypeNode;
    value?: ASTNode;
}
/**
 * Generic Type - نوع عام
 * class List<T> { }
 * function identity<T>(value: T): T { }
 */
export interface GenericTypeNode extends ASTNode {
    type: 'GenericType';
    name: string;
    typeParameters: TypeParameterNode[];
}
export interface TypeParameterNode extends ASTNode {
    type: 'TypeParameter';
    name: string;
    constraint?: TypeNode;
    default?: TypeNode;
}
/**
 * Union Type - نوع اتحادي
 * type StringOrNumber = string | number;
 */
export interface UnionTypeNode extends ASTNode {
    type: 'UnionType';
    types: TypeNode[];
}
/**
 * Intersection Type - نوع تقاطعي
 * type Combined = Type1 & Type2;
 */
export interface IntersectionTypeNode extends ASTNode {
    type: 'IntersectionType';
    types: TypeNode[];
}
