/**
 * واجهة REST API - REST API Interface
 *
 * نظام REST API للتكامل مع أنظمة أخرى
 */
/**
 * نوع طلب API
 */
export declare enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
/**
 * حالة الاستجابة
 */
export declare enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    RATE_LIMITED = 429,
    SERVER_ERROR = 500
}
/**
 * طلب API
 */
export interface APIRequest {
    method: RequestMethod;
    endpoint: string;
    headers: Map<string, string>;
    body?: any;
    params?: Map<string, string>;
    timestamp: number;
}
/**
 * استجابة API
 */
export interface APIResponse {
    status: ResponseStatus;
    data?: any;
    error?: string;
    timestamp: number;
    executionTime: number;
}
/**
 * مفتاح API
 */
export declare class APIKey {
    key: string;
    name: string;
    permissions: Set<string>;
    rateLimit: number;
    createdAt: number;
    expiresAt?: number | undefined;
    constructor(key: string, name: string, permissions?: Set<string>, rateLimit?: number, // requests per minute
    createdAt?: number, expiresAt?: number | undefined);
    isExpired(): boolean;
    hasPermission(permission: string): boolean;
}
/**
 * محرك REST API
 */
export declare class RestAPIEngine {
    private apiKeys;
    private rateLimiter;
    private routes;
    private logicEngine;
    private causalEngine;
    private letterEngine;
    private thingEngine;
    private probabilityEngine;
    private goalEngine;
    constructor();
    /**
     * إعداد المسارات
     */
    private setupRoutes;
    /**
     * إنشاء مفتاح API
     */
    createAPIKey(name: string, permissions?: string[], rateLimit?: number, expiresIn?: number): APIKey;
    /**
     * توليد مفتاح عشوائي
     */
    private generateKey;
    /**
     * معالجة طلب
     */
    handleRequest(request: APIRequest): Promise<APIResponse>;
    /**
     * المصادقة
     */
    private authenticate;
    private handleLogicQuery;
    private handleAddFact;
    private handleAddRule;
    private handleAddCausalNode;
    private handleAddCausalRelation;
    private handleGetCausalPath;
    private handleAnalyzeWord;
    private handleGetLetterMeanings;
    private handleCreateThing;
    private handleGetThing;
    private handleSetProperty;
    private handleAddProbabilisticFact;
    private handleProbabilisticInfer;
    private handleCreateGoal;
    private handlePlanForGoal;
    private handleGetStatus;
    private handleGetStats;
    /**
     * الحصول على الإحصائيات
     */
    getStatistics(): {
        totalAPIKeys: number;
        totalRoutes: number;
        activeKeys: number;
    };
}
