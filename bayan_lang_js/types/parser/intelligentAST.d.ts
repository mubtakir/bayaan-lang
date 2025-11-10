/**
 * الشجرة التجريدية الذكية - Intelligent AST
 * Extends traditional AST with AI intelligence from Baserah systems
 */
import * as AST from '../ast/index.js';
import { SemanticType } from '../lexer/intelligentTokens.js';
/**
 * العقدة الذكية الأساسية - Base Intelligent Node
 * Extends ASTNode with intelligence properties
 */
export interface IntelligentASTNode extends AST.ASTNode {
    type: string;
    line?: number;
    column?: number;
    semanticType?: SemanticType;
    causalNetwork?: CausalNetwork;
    events?: Event[];
    relationships?: Relationship[];
    context?: Context;
    confidence: number;
    metadata: Map<string, any>;
}
/**
 * الشبكة السببية - Causal Network
 * Represents causal relationships in code
 */
export interface CausalNetwork {
    nodes: CausalNode[];
    edges: CausalEdge[];
    confidence: number;
}
/**
 * عقدة سببية - Causal Node
 * Represents a state or variable in the causal network
 */
export interface CausalNode {
    id: string;
    name: string;
    type: 'state' | 'variable' | 'property' | 'event';
    initialValue?: any;
    currentValue?: any;
    semanticType?: SemanticType;
    confidence: number;
}
/**
 * حافة سببية - Causal Edge
 * Represents a causal relationship between nodes
 */
export interface CausalEdge {
    id: string;
    source: string;
    target: string;
    type: CausalEdgeType;
    strength: number;
    condition?: string;
    confidence: number;
}
export type CausalEdgeType = 'causes' | 'prevents' | 'enhances' | 'requires' | 'enables' | 'disables';
/**
 * حدث - Event
 * Represents an event detected in code
 */
export interface Event {
    id: string;
    name: string;
    type: EventType;
    trigger?: string;
    effects: EventEffect[];
    preconditions: string[];
    postconditions: string[];
    confidence: number;
}
export type EventType = 'function_call' | 'state_change' | 'object_creation' | 'object_destruction' | 'condition_check' | 'loop_iteration' | 'exception_throw' | 'return_value';
/**
 * تأثير الحدث - Event Effect
 * Represents the effect of an event
 */
export interface EventEffect {
    target: string;
    type: 'increase' | 'decrease' | 'set' | 'toggle' | 'create' | 'destroy';
    magnitude?: number;
    value?: any;
    confidence: number;
}
/**
 * علاقة - Relationship
 * Represents a relationship between AST nodes
 */
export interface Relationship {
    id: string;
    type: RelationshipType;
    source: string;
    target: string;
    description?: string;
    confidence: number;
}
export type RelationshipType = 'calls' | 'uses' | 'modifies' | 'depends_on' | 'inherits_from' | 'implements' | 'contains' | 'references';
/**
 * السياق - Context
 * Represents the context of an AST node
 */
export interface Context {
    scope: Scope;
    variables: Map<string, VariableInfo>;
    functions: Map<string, FunctionInfo>;
    classes: Map<string, ClassInfo>;
    imports: Map<string, ImportInfo>;
    confidence: number;
}
export interface Scope {
    type: 'global' | 'function' | 'block' | 'class' | 'module';
    parent?: Scope;
    depth: number;
}
export interface VariableInfo {
    name: string;
    type?: string;
    semanticType?: SemanticType;
    initialValue?: any;
    mutable: boolean;
    usages: number;
    confidence: number;
}
export interface FunctionInfo {
    name: string;
    parameters: string[];
    returnType?: string;
    isAsync: boolean;
    isGenerator: boolean;
    calls: string[];
    calledBy: string[];
    confidence: number;
}
export interface ClassInfo {
    name: string;
    superClass?: string;
    interfaces: string[];
    methods: string[];
    properties: string[];
    confidence: number;
}
export interface ImportInfo {
    source: string;
    imports: string[];
    confidence: number;
}
/**
 * البرنامج الذكي - Intelligent Program
 * Extends Program with intelligence
 */
export declare class IntelligentProgram extends AST.Program implements IntelligentASTNode {
    semanticType?: SemanticType;
    causalNetwork?: CausalNetwork;
    events?: Event[];
    relationships?: Relationship[];
    context?: Context;
    confidence: number;
    metadata: Map<string, any>;
    constructor(body: AST.Statement[], intelligence?: Partial<IntelligentASTNode>);
}
/**
 * عبارة ذكية - Intelligent Statement
 * Base type for intelligent statements
 */
export interface IntelligentStatement extends IntelligentASTNode {
}
/**
 * تصريح دالة ذكي - Intelligent Function Declaration
 */
export declare class IntelligentFunctionDeclaration extends AST.FunctionDeclaration implements IntelligentStatement {
    semanticType?: SemanticType;
    causalNetwork?: CausalNetwork;
    events?: Event[];
    relationships?: Relationship[];
    context?: Context;
    confidence: number;
    metadata: Map<string, any>;
    constructor(name: AST.Identifier, parameters: AST.FunctionParameter[], body: AST.BlockStatement, isAsync?: boolean, isGenerator?: boolean, intelligence?: Partial<IntelligentASTNode>);
}
/**
 * تصريح متغير ذكي - Intelligent Variable Declaration
 */
export declare class IntelligentVariableDeclaration extends AST.VariableDeclaration implements IntelligentStatement {
    semanticType?: SemanticType;
    causalNetwork?: CausalNetwork;
    events?: Event[];
    relationships?: Relationship[];
    context?: Context;
    confidence: number;
    metadata: Map<string, any>;
    constructor(kind: 'دع' | 'ثابت' | 'متغير', declarations: AST.VariableDeclarator[], intelligence?: Partial<IntelligentASTNode>);
}
/**
 * إنشاء شبكة سببية فارغة - Create empty causal network
 */
export declare function createEmptyCausalNetwork(): CausalNetwork;
/**
 * إضافة عقدة سببية - Add causal node
 */
export declare function addCausalNode(network: CausalNetwork, node: CausalNode): CausalNetwork;
/**
 * إضافة حافة سببية - Add causal edge
 */
export declare function addCausalEdge(network: CausalNetwork, edge: CausalEdge): CausalNetwork;
/**
 * دمج شبكات سببية - Merge causal networks
 */
export declare function mergeCausalNetworks(networks: CausalNetwork[]): CausalNetwork;
