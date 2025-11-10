/**
 * نظرية الفتائل - Filament Theory
 * 
 * المبدأ: النتيجة المعقدة مبنية من فتائل بسيطة (sigmoid + linear)
 * 
 * @author Al-Mubtakir
 * @version 1.0.0
 */

/**
 * نوع الفتيل
 * Filament Type
 */
export type FilamentType = 'sigmoid' | 'linear' | 'relu' | 'tanh';

/**
 * معاملات الفتيل
 * Filament Parameters
 */
export interface FilamentParams {
  type: FilamentType;
  weight: number;      // الوزن
  bias: number;        // الانحياز
  steepness?: number;  // الانحدار (للسيغمويد والتانه)
  threshold?: number;  // العتبة (للريلو)
}

/**
 * الفتيل
 * Filament
 */
export interface Filament {
  id: string;
  params: FilamentParams;
  calculate: (input: number) => number;
}

/**
 * دالة السيغمويد
 * Sigmoid function
 * 
 * @param x المدخل
 * @param steepness الانحدار (افتراضي: 1)
 * @returns القيمة (0-1)
 */
export function sigmoid(x: number, steepness: number = 1): number {
  return 1 / (1 + Math.exp(-steepness * x));
}

/**
 * دالة خطية
 * Linear function
 * 
 * @param x المدخل
 * @returns القيمة
 */
export function linear(x: number): number {
  return x;
}

/**
 * دالة ReLU (Rectified Linear Unit)
 * 
 * @param x المدخل
 * @param threshold العتبة (افتراضي: 0)
 * @returns القيمة
 */
export function relu(x: number, threshold: number = 0): number {
  return Math.max(threshold, x);
}

/**
 * دالة التانه (Hyperbolic Tangent)
 * 
 * @param x المدخل
 * @param steepness الانحدار (افتراضي: 1)
 * @returns القيمة (-1 إلى 1)
 */
export function tanh(x: number, steepness: number = 1): number {
  return Math.tanh(steepness * x);
}

/**
 * إنشاء فتيل
 * Create filament
 * 
 * @param id معرف الفتيل
 * @param params معاملات الفتيل
 * @returns الفتيل
 */
export function createFilament(id: string, params: FilamentParams): Filament {
  let calculate: (input: number) => number;
  
  switch (params.type) {
    case 'sigmoid':
      calculate = (input: number) => {
        const x = input * params.weight + params.bias;
        return sigmoid(x, params.steepness || 1);
      };
      break;
      
    case 'linear':
      calculate = (input: number) => {
        return input * params.weight + params.bias;
      };
      break;
      
    case 'relu':
      calculate = (input: number) => {
        const x = input * params.weight + params.bias;
        return relu(x, params.threshold || 0);
      };
      break;
      
    case 'tanh':
      calculate = (input: number) => {
        const x = input * params.weight + params.bias;
        return tanh(x, params.steepness || 1);
      };
      break;
      
    default:
      throw new Error(`نوع فتيل غير معروف: ${params.type}`);
  }
  
  return { id, params, calculate };
}

/**
 * فئة نظرية الفتائل
 * Filament Theory Class
 */
export class FilamentTheory {
  private filaments: Map<string, Filament> = new Map();
  
  /**
   * إضافة فتيل
   * Add filament
   */
  addFilament(filament: Filament): void {
    this.filaments.set(filament.id, filament);
  }
  
  /**
   * إزالة فتيل
   * Remove filament
   */
  removeFilament(id: string): boolean {
    return this.filaments.delete(id);
  }
  
  /**
   * الحصول على فتيل
   * Get filament
   */
  getFilament(id: string): Filament | undefined {
    return this.filaments.get(id);
  }
  
  /**
   * حساب النتيجة من جميع الفتائل
   * Calculate result from all filaments
   * 
   * @param input المدخل
   * @param combineMethod طريقة الدمج (sum, average, max, min)
   * @returns النتيجة
   */
  calculate(
    input: number,
    combineMethod: 'sum' | 'average' | 'max' | 'min' = 'sum'
  ): number {
    if (this.filaments.size === 0) {
      return 0;
    }
    
    const results: number[] = [];
    for (const filament of this.filaments.values()) {
      results.push(filament.calculate(input));
    }
    
    switch (combineMethod) {
      case 'sum':
        return results.reduce((sum, val) => sum + val, 0);
        
      case 'average':
        return results.reduce((sum, val) => sum + val, 0) / results.length;
        
      case 'max':
        return Math.max(...results);
        
      case 'min':
        return Math.min(...results);
        
      default:
        throw new Error(`طريقة دمج غير معروفة: ${combineMethod}`);
    }
  }
  
  /**
   * حساب النتيجة من فتائل محددة
   * Calculate result from specific filaments
   */
  calculateFromFilaments(
    input: number,
    filamentIds: string[],
    combineMethod: 'sum' | 'average' | 'max' | 'min' = 'sum'
  ): number {
    const results: number[] = [];
    
    for (const id of filamentIds) {
      const filament = this.filaments.get(id);
      if (filament) {
        results.push(filament.calculate(input));
      }
    }
    
    if (results.length === 0) {
      return 0;
    }
    
    switch (combineMethod) {
      case 'sum':
        return results.reduce((sum, val) => sum + val, 0);
        
      case 'average':
        return results.reduce((sum, val) => sum + val, 0) / results.length;
        
      case 'max':
        return Math.max(...results);
        
      case 'min':
        return Math.min(...results);
        
      default:
        throw new Error(`طريقة دمج غير معروفة: ${combineMethod}`);
    }
  }
  
  /**
   * الحصول على عدد الفتائل
   * Get filament count
   */
  getFilamentCount(): number {
    return this.filaments.size;
  }
  
  /**
   * الحصول على جميع معرفات الفتائل
   * Get all filament IDs
   */
  getFilamentIds(): string[] {
    return Array.from(this.filaments.keys());
  }
  
  /**
   * مسح جميع الفتائل
   * Clear all filaments
   */
  clear(): void {
    this.filaments.clear();
  }
  
  /**
   * استنساخ
   * Clone
   */
  clone(): FilamentTheory {
    const cloned = new FilamentTheory();
    for (const [id, filament] of this.filaments) {
      cloned.addFilament({
        id: filament.id,
        params: { ...filament.params },
        calculate: filament.calculate
      });
    }
    return cloned;
  }
}

/**
 * بناء فتائل من مصفوفة معاملات
 * Build filaments from parameter array
 */
export function buildFilaments(
  paramsArray: Array<{ id: string; params: FilamentParams }>
): FilamentTheory {
  const theory = new FilamentTheory();
  
  for (const item of paramsArray) {
    const filament = createFilament(item.id, item.params);
    theory.addFilament(filament);
  }
  
  return theory;
}

