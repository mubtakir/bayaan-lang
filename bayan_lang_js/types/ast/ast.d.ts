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
export declare class Program implements ASTNode {
    body: Statement[];
    type: string;
    constructor(body: Statement[]);
}
export type Statement = Program | ExpressionStatement | VariableDeclaration | FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | IfStatement | WhileStatement | DoWhileStatement | ForStatement | ForInStatement | ForOfStatement | ReturnStatement | BreakStatement | ContinueStatement | BlockStatement | TryStatement | ThrowStatement | SwitchStatement | ImportDeclaration | ExportDeclaration | HybridBlock | FactDeclaration | RuleDeclaration;
export type Expression = Identifier | Literal | BinaryExpression | UnaryExpression | UpdateExpression | CallExpression | MemberExpression | AssignmentExpression | LogicalExpression | ConditionalExpression | ArrayExpression | ObjectExpression | FunctionExpression | ArrowFunctionExpression | ThisExpression | SuperExpression | NewExpression | QueryExpression | AwaitExpression | SpreadExpression | TemplateExpression | NegationExpression | CutExpression | FindAllExpression | BagOfExpression | SetOfExpression | AssertExpression | RetractExpression | IsExpression;
export declare class ExpressionStatement implements ASTNode {
    expression: Expression;
    type: string;
    constructor(expression: Expression);
}
export declare class VariableDeclaration implements ASTNode {
    kind: 'دع' | 'ثابت' | 'متغير';
    declarations: VariableDeclarator[];
    type: string;
    constructor(kind: 'دع' | 'ثابت' | 'متغير', declarations: VariableDeclarator[]);
}
export declare class VariableDeclarator implements ASTNode {
    id: Identifier;
    init: Expression | null;
    type: string;
    constructor(id: Identifier, init: Expression | null);
}
export declare class FunctionDeclaration implements ASTNode {
    name: Identifier;
    parameters: FunctionParameter[];
    body: BlockStatement;
    isAsync: boolean;
    isGenerator: boolean;
    type: string;
    constructor(name: Identifier, parameters: FunctionParameter[], body: BlockStatement, isAsync?: boolean, isGenerator?: boolean);
}
export declare class FunctionParameter implements ASTNode {
    name: Identifier;
    defaultValue: Expression | null;
    isRest: boolean;
    type: string;
    constructor(name: Identifier, defaultValue?: Expression | null, isRest?: boolean);
}
export declare class ClassDeclaration implements ASTNode {
    name: Identifier;
    superClass: Identifier | null;
    interfaces: Identifier[];
    body: ClassBody;
    isAbstract: boolean;
    type: string;
    constructor(name: Identifier, superClass: Identifier | null, interfaces: Identifier[], body: ClassBody, isAbstract?: boolean);
}
export declare class ClassBody implements ASTNode {
    body: (MethodDefinition | PropertyDefinition)[];
    type: string;
    constructor(body: (MethodDefinition | PropertyDefinition)[]);
}
export declare class MethodDefinition implements ASTNode {
    kind: 'method' | 'constructor' | 'get' | 'set';
    key: Identifier;
    parameters: FunctionParameter[];
    body: BlockStatement;
    isStatic: boolean;
    isAsync: boolean;
    isAbstract: boolean;
    accessModifier: 'public' | 'private' | 'protected';
    type: string;
    constructor(kind: 'method' | 'constructor' | 'get' | 'set', key: Identifier, parameters: FunctionParameter[], body: BlockStatement, isStatic?: boolean, isAsync?: boolean, isAbstract?: boolean, accessModifier?: 'public' | 'private' | 'protected');
}
export declare class PropertyDefinition implements ASTNode {
    key: Identifier;
    value: Expression | null;
    isStatic: boolean;
    accessModifier: 'public' | 'private' | 'protected';
    type: string;
    constructor(key: Identifier, value: Expression | null, isStatic?: boolean, accessModifier?: 'public' | 'private' | 'protected');
}
export declare class InterfaceDeclaration implements ASTNode {
    name: Identifier;
    extendsInterfaces: Identifier[];
    body: InterfaceBody;
    type: string;
    constructor(name: Identifier, extendsInterfaces: Identifier[], body: InterfaceBody);
}
export declare class InterfaceBody implements ASTNode {
    body: (MethodSignature | PropertySignature)[];
    type: string;
    constructor(body: (MethodSignature | PropertySignature)[]);
}
export declare class MethodSignature implements ASTNode {
    key: Identifier;
    parameters: FunctionParameter[];
    type: string;
    constructor(key: Identifier, parameters: FunctionParameter[]);
}
export declare class PropertySignature implements ASTNode {
    key: Identifier;
    type: string;
    constructor(key: Identifier);
}
export declare class IfStatement implements ASTNode {
    test: Expression;
    consequent: BlockStatement;
    alternate: BlockStatement | IfStatement | null;
    type: string;
    constructor(test: Expression, consequent: BlockStatement, alternate: BlockStatement | IfStatement | null);
}
export declare class WhileStatement implements ASTNode {
    test: Expression;
    body: BlockStatement;
    type: string;
    constructor(test: Expression, body: BlockStatement);
}
export declare class DoWhileStatement implements ASTNode {
    body: BlockStatement;
    test: Expression;
    type: string;
    constructor(body: BlockStatement, test: Expression);
}
export declare class ForStatement implements ASTNode {
    init: VariableDeclaration | Expression | null;
    test: Expression | null;
    update: Expression | null;
    body: BlockStatement;
    type: string;
    constructor(init: VariableDeclaration | Expression | null, test: Expression | null, update: Expression | null, body: BlockStatement);
}
export declare class ForInStatement implements ASTNode {
    left: VariableDeclaration | Identifier;
    right: Expression;
    body: BlockStatement;
    type: string;
    constructor(left: VariableDeclaration | Identifier, right: Expression, body: BlockStatement);
}
export declare class ForOfStatement implements ASTNode {
    left: VariableDeclaration | Identifier;
    right: Expression;
    body: BlockStatement;
    type: string;
    constructor(left: VariableDeclaration | Identifier, right: Expression, body: BlockStatement);
}
export declare class SwitchStatement implements ASTNode {
    discriminant: Expression;
    cases: SwitchCase[];
    type: string;
    constructor(discriminant: Expression, cases: SwitchCase[]);
}
export declare class SwitchCase implements ASTNode {
    test: Expression | null;
    consequent: Statement[];
    type: string;
    constructor(test: Expression | null, // null for default case
    consequent: Statement[]);
}
export declare class ReturnStatement implements ASTNode {
    argument: Expression | null;
    type: string;
    constructor(argument: Expression | null);
}
export declare class BreakStatement implements ASTNode {
    label: Identifier | null;
    type: string;
    constructor(label?: Identifier | null);
}
export declare class ContinueStatement implements ASTNode {
    label: Identifier | null;
    type: string;
    constructor(label?: Identifier | null);
}
export declare class BlockStatement implements ASTNode {
    body: Statement[];
    type: string;
    constructor(body: Statement[]);
}
export declare class TryStatement implements ASTNode {
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
    type: string;
    constructor(block: BlockStatement, handler: CatchClause | null, finalizer: BlockStatement | null);
}
export declare class CatchClause implements ASTNode {
    param: Identifier | null;
    body: BlockStatement;
    type: string;
    constructor(param: Identifier | null, body: BlockStatement);
}
export declare class ThrowStatement implements ASTNode {
    argument: Expression;
    type: string;
    constructor(argument: Expression);
}
export declare class ImportDeclaration implements ASTNode {
    specifiers: ImportSpecifier[];
    source: Literal;
    type: string;
    constructor(specifiers: ImportSpecifier[], source: Literal);
}
export declare class ImportSpecifier implements ASTNode {
    imported: Identifier;
    local: Identifier | null;
    type: string;
    constructor(imported: Identifier, local?: Identifier | null);
}
export declare class ExportDeclaration implements ASTNode {
    declaration: Statement | null;
    specifiers: ExportSpecifier[];
    source: Literal | null;
    isDefault: boolean;
    type: string;
    constructor(declaration: Statement | null, specifiers: ExportSpecifier[], source?: Literal | null, isDefault?: boolean);
}
export declare class ExportSpecifier implements ASTNode {
    local: Identifier;
    exported: Identifier | null;
    type: string;
    constructor(local: Identifier, exported?: Identifier | null);
}
export declare class HybridBlock implements ASTNode {
    body: Statement[];
    type: string;
    constructor(body: Statement[]);
}
export declare class FactDeclaration implements ASTNode {
    predicate: string;
    args: Expression[];
    type: string;
    constructor(predicate: string, args: Expression[]);
}
export declare class RuleDeclaration implements ASTNode {
    head: FactDeclaration;
    body: FactDeclaration[];
    type: string;
    constructor(head: FactDeclaration, body: FactDeclaration[]);
}
export declare class QueryExpression implements ASTNode {
    goal: FactDeclaration;
    type: string;
    constructor(goal: FactDeclaration);
}
export declare class Identifier implements ASTNode {
    name: string;
    type: string;
    constructor(name: string);
}
export declare class Literal implements ASTNode {
    value: any;
    raw?: string | undefined;
    type: string;
    constructor(value: any, raw?: string | undefined);
}
export declare class BinaryExpression implements ASTNode {
    operator: string;
    left: Expression;
    right: Expression;
    type: string;
    constructor(operator: string, left: Expression, right: Expression);
}
export declare class UnaryExpression implements ASTNode {
    operator: string;
    argument: Expression;
    prefix: boolean;
    type: string;
    constructor(operator: string, argument: Expression, prefix?: boolean);
}
export declare class UpdateExpression implements ASTNode {
    operator: '++' | '--';
    argument: Expression;
    prefix: boolean;
    type: string;
    constructor(operator: '++' | '--', argument: Expression, prefix?: boolean);
}
export declare class CallExpression implements ASTNode {
    callee: Expression;
    args: Expression[];
    type: string;
    constructor(callee: Expression, args: Expression[]);
}
export declare class MemberExpression implements ASTNode {
    object: Expression;
    property: Expression;
    computed: boolean;
    type: string;
    constructor(object: Expression, property: Expression, computed?: boolean);
}
export declare class AssignmentExpression implements ASTNode {
    operator: string;
    left: Expression;
    right: Expression;
    type: string;
    constructor(operator: string, left: Expression, right: Expression);
}
export declare class LogicalExpression implements ASTNode {
    operator: 'و' | 'أو' | '&&' | '||';
    left: Expression;
    right: Expression;
    type: string;
    constructor(operator: 'و' | 'أو' | '&&' | '||', left: Expression, right: Expression);
}
export declare class ConditionalExpression implements ASTNode {
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    type: string;
    constructor(test: Expression, consequent: Expression, alternate: Expression);
}
export declare class ArrayExpression implements ASTNode {
    elements: (Expression | null)[];
    type: string;
    constructor(elements: (Expression | null)[]);
}
export declare class ObjectExpression implements ASTNode {
    properties: Property[];
    type: string;
    constructor(properties: Property[]);
}
export declare class Property implements ASTNode {
    key: Identifier | Literal;
    value: Expression;
    kind: 'init' | 'get' | 'set';
    computed: boolean;
    shorthand: boolean;
    type: string;
    constructor(key: Identifier | Literal, value: Expression, kind?: 'init' | 'get' | 'set', computed?: boolean, shorthand?: boolean);
}
export declare class FunctionExpression implements ASTNode {
    name: Identifier | null;
    parameters: FunctionParameter[];
    body: BlockStatement;
    isAsync: boolean;
    isGenerator: boolean;
    type: string;
    constructor(name: Identifier | null, parameters: FunctionParameter[], body: BlockStatement, isAsync?: boolean, isGenerator?: boolean);
}
export declare class ArrowFunctionExpression implements ASTNode {
    parameters: FunctionParameter[];
    body: BlockStatement | Expression;
    isAsync: boolean;
    type: string;
    constructor(parameters: FunctionParameter[], body: BlockStatement | Expression, isAsync?: boolean);
}
export declare class ThisExpression implements ASTNode {
    type: string;
}
export declare class SuperExpression implements ASTNode {
    type: string;
}
export declare class NewExpression implements ASTNode {
    callee: Expression;
    args: Expression[];
    type: string;
    constructor(callee: Expression, args: Expression[]);
}
export declare class AwaitExpression implements ASTNode {
    argument: Expression;
    type: string;
    constructor(argument: Expression);
}
export declare class SpreadExpression implements ASTNode {
    argument: Expression;
    type: string;
    constructor(argument: Expression);
}
export declare class TemplateExpression implements ASTNode {
    quasis: TemplateLiteral[];
    expressions: Expression[];
    type: string;
    constructor(quasis: TemplateLiteral[], expressions: Expression[]);
}
export declare class TemplateLiteral implements ASTNode {
    value: string;
    tail: boolean;
    type: string;
    constructor(value: string, tail?: boolean);
}
/**
 * النفي كفشل (Negation as Failure)
 * مثال: ليس والد("أحمد", "علي")
 * Example: not parent("Ahmed", "Ali")
 */
export declare class NegationExpression implements ASTNode {
    goal: QueryExpression;
    type: string;
    constructor(goal: QueryExpression);
}
/**
 * عامل القطع (Cut Operator)
 * يمنع التراجع في القواعد المنطقية
 * مثال: قاعدة أكبر(?س, ?ص) :- ?س >= ?ص, قطع;
 */
export declare class CutExpression implements ASTNode {
    type: string;
}
/**
 * FindAll - جمع كل الحلول
 * مثال: اجمع_كل(?س, والد("أحمد", ?س), ?أبناء)
 * Example: findall(?x, parent("Ahmed", ?x), ?children)
 */
export declare class FindAllExpression implements ASTNode {
    template: Expression;
    goal: QueryExpression;
    result: Identifier;
    type: string;
    constructor(template: Expression, goal: QueryExpression, result: Identifier);
}
/**
 * BagOf - جمع الحلول مع التكرار
 * مثال: كيس_من(?س, طالب(?س, "حاسب"), ?طلاب)
 */
export declare class BagOfExpression implements ASTNode {
    template: Expression;
    goal: QueryExpression;
    result: Identifier;
    type: string;
    constructor(template: Expression, goal: QueryExpression, result: Identifier);
}
/**
 * SetOf - جمع الحلول الفريدة
 * مثال: مجموعة_من(?س, مدينة(?س), ?مدن)
 */
export declare class SetOfExpression implements ASTNode {
    template: Expression;
    goal: QueryExpression;
    result: Identifier;
    type: string;
    constructor(template: Expression, goal: QueryExpression, result: Identifier);
}
/**
 * Assert - إضافة حقيقة أو قاعدة ديناميكياً
 * مثال: أضف والد("علي", "محمد")
 * Example: assert parent("Ali", "Mohamed")
 */
export declare class AssertExpression implements ASTNode {
    fact: FactDeclaration | RuleDeclaration;
    type: string;
    constructor(fact: FactDeclaration | RuleDeclaration);
}
/**
 * Retract - حذف حقيقة أو قاعدة ديناميكياً
 * مثال: احذف والد("علي", "محمد")
 * Example: retract parent("Ali", "Mohamed")
 */
export declare class RetractExpression implements ASTNode {
    fact: FactDeclaration | RuleDeclaration;
    type: string;
    constructor(fact: FactDeclaration | RuleDeclaration);
}
/**
 * Is - التقييم الحسابي
 * مثال: ?س هو 5 + 3
 * Example: ?x is 5 + 3
 */
export declare class IsExpression implements ASTNode {
    variable: Identifier;
    expression: Expression;
    type: string;
    constructor(variable: Identifier, expression: Expression);
}
