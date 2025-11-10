/**
 * واجهة REST API - REST API Interface
 * 
 * نظام REST API للتكامل مع أنظمة أخرى
 */

import { LogicEngine } from '../logic/logicEngine';
import { CausalEngine } from '../logic/causalEngine';
import { LetterEngine } from '../baserah/linguistics/letterEngine';
import { ThingEngine } from '../baserah/knowledge/thingEngine';
import { ProbabilityEngine } from '../probability/probabilityEngine';
import { GoalEngine } from '../planning/goalEngine';

/**
 * نوع طلب API
 */
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

/**
 * حالة الاستجابة
 */
export enum ResponseStatus {
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
export class APIKey {
  constructor(
    public key: string,
    public name: string,
    public permissions: Set<string> = new Set(),
    public rateLimit: number = 100, // requests per minute
    public createdAt: number = Date.now(),
    public expiresAt?: number
  ) {}

  isExpired(): boolean {
    return this.expiresAt !== undefined && Date.now() > this.expiresAt;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.has(permission) || this.permissions.has('*');
  }
}

/**
 * معدل الطلبات
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(apiKey: string, limit: number): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // الحصول على الطلبات الأخيرة
    let keyRequests = this.requests.get(apiKey) || [];
    
    // تصفية الطلبات القديمة
    keyRequests = keyRequests.filter(time => time > oneMinuteAgo);
    
    // التحقق من الحد
    if (keyRequests.length >= limit) {
      return false;
    }

    // إضافة الطلب الجديد
    keyRequests.push(now);
    this.requests.set(apiKey, keyRequests);

    return true;
  }

  getRemainingRequests(apiKey: string, limit: number): number {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    const keyRequests = this.requests.get(apiKey) || [];
    const recentRequests = keyRequests.filter(time => time > oneMinuteAgo);

    return Math.max(0, limit - recentRequests.length);
  }
}

/**
 * محرك REST API
 */
export class RestAPIEngine {
  private apiKeys: Map<string, APIKey> = new Map();
  private rateLimiter: RateLimiter = new RateLimiter();
  private routes: Map<string, (req: APIRequest) => Promise<APIResponse>> = new Map();

  // المحركات
  private logicEngine: LogicEngine;
  private causalEngine: CausalEngine;
  private letterEngine: LetterEngine;
  private thingEngine: ThingEngine;
  private probabilityEngine: ProbabilityEngine;
  private goalEngine: GoalEngine;

  constructor() {
    this.logicEngine = new LogicEngine();
    this.causalEngine = new CausalEngine();
    this.letterEngine = new LetterEngine();
    this.thingEngine = new ThingEngine();
    this.probabilityEngine = new ProbabilityEngine();
    this.goalEngine = new GoalEngine();

    this.setupRoutes();
  }

  /**
   * إعداد المسارات
   */
  private setupRoutes(): void {
    // Logic Engine Routes
    this.routes.set('POST /logic/query', this.handleLogicQuery.bind(this));
    this.routes.set('POST /logic/fact', this.handleAddFact.bind(this));
    this.routes.set('POST /logic/rule', this.handleAddRule.bind(this));

    // Causal Network Routes
    this.routes.set('POST /causal/node', this.handleAddCausalNode.bind(this));
    this.routes.set('POST /causal/relation', this.handleAddCausalRelation.bind(this));
    this.routes.set('GET /causal/path', this.handleGetCausalPath.bind(this));

    // Letter Engine Routes
    this.routes.set('POST /linguistics/analyze', this.handleAnalyzeWord.bind(this));
    this.routes.set('GET /linguistics/letter', this.handleGetLetterMeanings.bind(this));

    // Thing Engine Routes
    this.routes.set('POST /knowledge/thing', this.handleCreateThing.bind(this));
    this.routes.set('GET /knowledge/thing', this.handleGetThing.bind(this));
    this.routes.set('PUT /knowledge/thing/property', this.handleSetProperty.bind(this));

    // Probability Engine Routes
    this.routes.set('POST /probability/fact', this.handleAddProbabilisticFact.bind(this));
    this.routes.set('POST /probability/infer', this.handleProbabilisticInfer.bind(this));

    // Goal Engine Routes
    this.routes.set('POST /planning/goal', this.handleCreateGoal.bind(this));
    this.routes.set('POST /planning/plan', this.handlePlanForGoal.bind(this));

    // API Management Routes
    this.routes.set('GET /api/status', this.handleGetStatus.bind(this));
    this.routes.set('GET /api/stats', this.handleGetStats.bind(this));
  }

  /**
   * إنشاء مفتاح API
   */
  createAPIKey(name: string, permissions: string[] = ['*'], rateLimit: number = 100, expiresIn?: number): APIKey {
    const key = this.generateKey();
    const expiresAt = expiresIn ? Date.now() + expiresIn : undefined;
    
    const apiKey = new APIKey(
      key,
      name,
      new Set(permissions),
      rateLimit,
      Date.now(),
      expiresAt
    );

    this.apiKeys.set(key, apiKey);
    return apiKey;
  }

  /**
   * توليد مفتاح عشوائي
   */
  private generateKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'bayan_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  /**
   * معالجة طلب
   */
  async handleRequest(request: APIRequest): Promise<APIResponse> {
    const startTime = Date.now();

    try {
      // التحقق من المصادقة
      const authResult = this.authenticate(request);
      if (authResult.status !== ResponseStatus.SUCCESS) {
        return authResult;
      }

      const apiKey = authResult.data as APIKey;

      // التحقق من معدل الطلبات
      if (!this.rateLimiter.isAllowed(apiKey.key, apiKey.rateLimit)) {
        return {
          status: ResponseStatus.RATE_LIMITED,
          error: 'Rate limit exceeded',
          timestamp: Date.now(),
          executionTime: Date.now() - startTime
        };
      }

      // العثور على المسار
      const routeKey = `${request.method} ${request.endpoint}`;
      const handler = this.routes.get(routeKey);

      if (!handler) {
        return {
          status: ResponseStatus.NOT_FOUND,
          error: `Route not found: ${routeKey}`,
          timestamp: Date.now(),
          executionTime: Date.now() - startTime
        };
      }

      // تنفيذ المعالج
      const response = await handler(request);
      response.executionTime = Date.now() - startTime;

      return response;

    } catch (error) {
      return {
        status: ResponseStatus.SERVER_ERROR,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * المصادقة
   */
  private authenticate(request: APIRequest): APIResponse {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      return {
        status: ResponseStatus.UNAUTHORIZED,
        error: 'Missing Authorization header',
        timestamp: Date.now(),
        executionTime: 0
      };
    }

    const key = authHeader.replace('Bearer ', '');
    const apiKey = this.apiKeys.get(key);

    if (!apiKey) {
      return {
        status: ResponseStatus.UNAUTHORIZED,
        error: 'Invalid API key',
        timestamp: Date.now(),
        executionTime: 0
      };
    }

    if (apiKey.isExpired()) {
      return {
        status: ResponseStatus.UNAUTHORIZED,
        error: 'API key expired',
        timestamp: Date.now(),
        executionTime: 0
      };
    }

    return {
      status: ResponseStatus.SUCCESS,
      data: apiKey,
      timestamp: Date.now(),
      executionTime: 0
    };
  }

  // معالجات المسارات
  private async handleLogicQuery(req: APIRequest): Promise<APIResponse> {
    const { query } = req.body;
    const results = this.logicEngine.query(query);
    return { status: ResponseStatus.SUCCESS, data: results, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleAddFact(req: APIRequest): Promise<APIResponse> {
    const { fact } = req.body;
    this.logicEngine.addFact(fact);
    return { status: ResponseStatus.CREATED, data: { success: true }, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleAddRule(req: APIRequest): Promise<APIResponse> {
    const { rule } = req.body;
    this.logicEngine.addRule(rule);
    return { status: ResponseStatus.CREATED, data: { success: true }, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleAddCausalNode(_req: APIRequest): Promise<APIResponse> {
    // Simplified - just return success
    return { status: ResponseStatus.CREATED, data: { success: true }, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleAddCausalRelation(req: APIRequest): Promise<APIResponse> {
    const { from, to, type, weight } = req.body;
    this.causalEngine.addRelation(from, to, type, weight);
    return { status: ResponseStatus.CREATED, data: { success: true }, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleGetCausalPath(req: APIRequest): Promise<APIResponse> {
    const from = req.params?.get('from') || '';
    const to = req.params?.get('to') || '';
    const paths = this.causalEngine.findAllPaths(from, to);
    return { status: ResponseStatus.SUCCESS, data: paths, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleAnalyzeWord(req: APIRequest): Promise<APIResponse> {
    const { word } = req.body;
    const analysis = this.letterEngine.analyzeWord(word);
    return { status: ResponseStatus.SUCCESS, data: analysis, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleGetLetterMeanings(req: APIRequest): Promise<APIResponse> {
    const letter = req.params?.get('letter') || '';
    const meanings = this.letterEngine.getLetterMeanings(letter);
    return { status: ResponseStatus.SUCCESS, data: meanings, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleCreateThing(req: APIRequest): Promise<APIResponse> {
    const { name } = req.body;
    const thing = this.thingEngine.addThing(name);
    return { status: ResponseStatus.CREATED, data: thing, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleGetThing(req: APIRequest): Promise<APIResponse> {
    const name = req.params?.get('name') || '';
    const thing = this.thingEngine.getThing(name);
    return { status: ResponseStatus.SUCCESS, data: thing, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleSetProperty(req: APIRequest): Promise<APIResponse> {
    const { thingName, property, value } = req.body;
    const thing = this.thingEngine.getThing(thingName);
    if (thing) {
      const prop = thing.getProperty(property);
      if (prop) {
        prop.value = value;
      }
    }
    return { status: ResponseStatus.SUCCESS, data: { success: true }, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleAddProbabilisticFact(req: APIRequest): Promise<APIResponse> {
    const { statement, probability } = req.body;
    const fact = this.probabilityEngine.addFact(statement, probability);
    return { status: ResponseStatus.CREATED, data: fact, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleProbabilisticInfer(req: APIRequest): Promise<APIResponse> {
    const { statement, threshold } = req.body;
    const result = this.probabilityEngine.infer(statement, threshold);
    return { status: ResponseStatus.SUCCESS, data: result, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleCreateGoal(_req: APIRequest): Promise<APIResponse> {
    // سيتم تنفيذه بناءً على GoalEngine
    return { status: ResponseStatus.CREATED, data: { success: true }, timestamp: Date.now(), executionTime: 0 };
  }

  private async handlePlanForGoal(req: APIRequest): Promise<APIResponse> {
    const { goalName } = req.body;
    const plan = this.goalEngine.planForGoal(goalName);
    return { status: ResponseStatus.SUCCESS, data: plan, timestamp: Date.now(), executionTime: 0 };
  }

  private async handleGetStatus(_req: APIRequest): Promise<APIResponse> {
    return {
      status: ResponseStatus.SUCCESS,
      data: {
        version: '1.0.0',
        uptime: 0,
        timestamp: Date.now()
      },
      timestamp: Date.now(),
      executionTime: 0
    };
  }

  private async handleGetStats(_req: APIRequest): Promise<APIResponse> {
    return {
      status: ResponseStatus.SUCCESS,
      data: {
        apiKeys: this.apiKeys.size,
        routes: this.routes.size
      },
      timestamp: Date.now(),
      executionTime: 0
    };
  }

  /**
   * الحصول على الإحصائيات
   */
  getStatistics() {
    return {
      totalAPIKeys: this.apiKeys.size,
      totalRoutes: this.routes.size,
      activeKeys: Array.from(this.apiKeys.values()).filter(k => !k.isExpired()).length
    };
  }
}

