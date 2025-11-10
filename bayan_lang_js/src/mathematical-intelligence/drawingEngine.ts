/**
 * محرك الرسام - Drawing Engine
 * 
 * المحرك التوليدي القادر على قراءة معادلة الشكل العام وتوليد الرسم المقابل
 * Generative engine capable of reading General Shape Equation and generating corresponding drawing
 * 
 * الوظائف | Functions:
 * - تفسير معاملات معادلة الشكل العامة
 * - توليد النقاط والمنحنيات المقابلة
 * - إنتاج التمثيلات البصرية
 * - التحقق من صحة وثبات المعادلة
 * 
 * الفلسفة | Philosophy:
 * "الرسام" يحول المعادلات الرياضية إلى تمثيلات بصرية
 * "The Painter" transforms mathematical equations into visual representations
 */

import { GeneralShapeEquation, ShapeTerm, TermVisualProperties } from './generalShapeEquation';

/**
 * نقطة رسم مع خصائص بصرية
 * Drawing point with visual properties
 */
export interface DrawingPoint {
  x: number;
  y: number;
  lineColor?: string;
  lineWidth?: number;
  fillColor?: string;
  opacity?: number;
}

/**
 * مسار رسم (مجموعة نقاط متصلة)
 * Drawing path (collection of connected points)
 */
export interface DrawingPath {
  points: DrawingPoint[];
  closed: boolean;
  fillStyle?: 'solid' | 'gradient' | 'pattern';
}

/**
 * نتيجة الرسم الكاملة
 * Complete drawing result
 */
export interface DrawingResult {
  paths: DrawingPath[];
  bounds: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };
  metadata: {
    termCount: number;
    pointCount: number;
    renderTime: number;
  };
}

/**
 * خيارات الرسم
 * Drawing options
 */
export interface DrawingOptions {
  /** نطاق X - X range */
  xRange: { min: number; max: number };
  
  /** نطاق Y (اختياري، يتم حسابه تلقائياً إذا لم يُحدد) */
  yRange?: { min: number; max: number };
  
  /** دقة الرسم (عدد النقاط) - Resolution (number of points) */
  resolution?: number;
  
  /** تفعيل التدرج اللوني - Enable color gradients */
  enableGradients?: boolean;
  
  /** تفعيل التدرج في سمك الخط - Enable line width gradients */
  enableLineWidthGradients?: boolean;
  
  /** تفعيل التحسين التلقائي - Enable auto-optimization */
  autoOptimize?: boolean;
}

/**
 * محرك الرسام
 * Drawing Engine
 */
export class DrawingEngine {
  /**
   * رسم معادلة شكل عام
   * Draw general shape equation
   */
  static draw(
    equation: GeneralShapeEquation,
    options: DrawingOptions
  ): DrawingResult {
    const startTime = performance.now();
    
    const resolution = options.resolution ?? 100;
    const { xRange } = options;
    
    // توليد النقاط من المعادلة
    const rawPoints = equation.render(xRange.min, xRange.max, resolution);
    
    // تحويل النقاط إلى نقاط رسم مع خصائص بصرية
    const drawingPoints = this.convertToDrawingPoints(
      rawPoints,
      options
    );
    
    // تقسيم النقاط إلى مسارات (paths) بناءً على نقاط القفز
    const paths = this.createPaths(drawingPoints, equation);
    
    // حساب الحدود
    const bounds = this.calculateBounds(drawingPoints, options.yRange);
    
    const endTime = performance.now();
    
    return {
      paths,
      bounds,
      metadata: {
        termCount: equation.getTermCount(),
        pointCount: drawingPoints.length,
        renderTime: endTime - startTime
      }
    };
  }

  /**
   * تحويل النقاط الخام إلى نقاط رسم
   * Convert raw points to drawing points
   */
  private static convertToDrawingPoints(
    rawPoints: Array<{ x: number; y: number; props?: TermVisualProperties }>,
    options: DrawingOptions
  ): DrawingPoint[] {
    const drawingPoints: DrawingPoint[] = [];
    const totalPoints = rawPoints.length;

    for (let i = 0; i < rawPoints.length; i++) {
      const point = rawPoints[i];
      const props = point.props || {};
      
      // حساب نسبة التقدم (0 إلى 1)
      const progress = i / (totalPoints - 1);
      
      // تطبيق التدرجات
      const lineColor = this.interpolateColor(
        props.lineColorStart,
        props.lineColorEnd,
        progress,
        options.enableGradients
      );
      
      const lineWidth = this.interpolateNumber(
        props.lineWidthStart,
        props.lineWidthEnd,
        progress,
        options.enableLineWidthGradients
      );
      
      const fillColor = this.interpolateColor(
        props.fillColorStart,
        props.fillColorEnd,
        progress,
        options.enableGradients
      );
      
      const opacity = this.interpolateNumber(
        props.opacityStart,
        props.opacityEnd,
        progress,
        true
      );
      
      drawingPoints.push({
        x: point.x,
        y: point.y,
        lineColor,
        lineWidth,
        fillColor,
        opacity
      });
    }

    return drawingPoints;
  }

  /**
   * تدرج لوني بين لونين
   * Color interpolation between two colors
   */
  private static interpolateColor(
    colorStart?: string,
    colorEnd?: string,
    progress: number = 0,
    enabled: boolean = true
  ): string | undefined {
    if (!enabled || !colorStart) {
      return colorStart || colorEnd;
    }
    
    if (!colorEnd) {
      return colorStart;
    }
    
    // تحويل الألوان إلى RGB
    const rgbStart = this.hexToRgb(colorStart);
    const rgbEnd = this.hexToRgb(colorEnd);
    
    if (!rgbStart || !rgbEnd) {
      return colorStart;
    }
    
    // تدرج خطي
    const r = Math.round(rgbStart.r + (rgbEnd.r - rgbStart.r) * progress);
    const g = Math.round(rgbStart.g + (rgbEnd.g - rgbStart.g) * progress);
    const b = Math.round(rgbStart.b + (rgbEnd.b - rgbStart.b) * progress);
    
    return this.rgbToHex(r, g, b);
  }

  /**
   * تدرج رقمي بين قيمتين
   * Numeric interpolation between two values
   */
  private static interpolateNumber(
    start?: number,
    end?: number,
    progress: number = 0,
    enabled: boolean = true
  ): number | undefined {
    if (!enabled || start === undefined) {
      return start ?? end;
    }
    
    if (end === undefined) {
      return start;
    }
    
    return start + (end - start) * progress;
  }

  /**
   * تحويل HEX إلى RGB
   * Convert HEX to RGB
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * تحويل RGB إلى HEX
   * Convert RGB to HEX
   */
  private static rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * إنشاء مسارات من النقاط
   * Create paths from points
   */
  private static createPaths(
    points: DrawingPoint[],
    equation: GeneralShapeEquation
  ): DrawingPath[] {
    const paths: DrawingPath[] = [];
    let currentPath: DrawingPoint[] = [];
    
    for (const point of points) {
      currentPath.push(point);
    }
    
    if (currentPath.length > 0) {
      paths.push({
        points: currentPath,
        closed: false
      });
    }
    
    return paths;
  }

  /**
   * حساب حدود الرسم
   * Calculate drawing bounds
   */
  private static calculateBounds(
    points: DrawingPoint[],
    yRange?: { min: number; max: number }
  ): { xMin: number; xMax: number; yMin: number; yMax: number } {
    if (points.length === 0) {
      return { xMin: 0, xMax: 0, yMin: 0, yMax: 0 };
    }
    
    let xMin = points[0].x;
    let xMax = points[0].x;
    let yMin = points[0].y;
    let yMax = points[0].y;
    
    for (const point of points) {
      xMin = Math.min(xMin, point.x);
      xMax = Math.max(xMax, point.x);
      yMin = Math.min(yMin, point.y);
      yMax = Math.max(yMax, point.y);
    }
    
    // استخدام yRange إذا كان محدداً
    if (yRange) {
      yMin = yRange.min;
      yMax = yRange.max;
    }
    
    return { xMin, xMax, yMin, yMax };
  }

  /**
   * رسم على Canvas HTML5
   * Draw on HTML5 Canvas
   */
  static drawToCanvas(
    equation: GeneralShapeEquation,
    canvas: HTMLCanvasElement,
    options: DrawingOptions
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('❌ فشل الحصول على سياق Canvas');
    }

    const result = this.draw(equation, options);
    
    // مسح Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // تحويل الإحداثيات من نطاق المعادلة إلى نطاق Canvas
    const scaleX = canvas.width / (result.bounds.xMax - result.bounds.xMin);
    const scaleY = canvas.height / (result.bounds.yMax - result.bounds.yMin);
    
    // رسم كل مسار
    for (const path of result.paths) {
      ctx.beginPath();
      
      for (let i = 0; i < path.points.length; i++) {
        const point = path.points[i];
        
        // تحويل الإحداثيات
        const canvasX = (point.x - result.bounds.xMin) * scaleX;
        const canvasY = canvas.height - (point.y - result.bounds.yMin) * scaleY;
        
        if (i === 0) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
        
        // تطبيق الخصائص البصرية
        if (point.lineColor) {
          ctx.strokeStyle = point.lineColor;
        }
        if (point.lineWidth) {
          ctx.lineWidth = point.lineWidth;
        }
        if (point.opacity !== undefined) {
          ctx.globalAlpha = point.opacity;
        }
      }
      
      ctx.stroke();
      
      if (path.closed && path.points[0].fillColor) {
        ctx.fillStyle = path.points[0].fillColor;
        ctx.fill();
      }
    }
  }

  /**
   * تصدير إلى SVG
   * Export to SVG
   */
  static toSVG(
    equation: GeneralShapeEquation,
    options: DrawingOptions
  ): string {
    const result = this.draw(equation, options);
    const { bounds } = result;
    
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bounds.xMin} ${bounds.yMin} ${bounds.xMax - bounds.xMin} ${bounds.yMax - bounds.yMin}">\n`;
    
    for (const path of result.paths) {
      let pathData = '';
      
      for (let i = 0; i < path.points.length; i++) {
        const point = path.points[i];
        const command = i === 0 ? 'M' : 'L';
        pathData += `${command} ${point.x} ${point.y} `;
      }
      
      if (path.closed) {
        pathData += 'Z';
      }
      
      const firstPoint = path.points[0];
      const stroke = firstPoint.lineColor || '#000000';
      const strokeWidth = firstPoint.lineWidth || 1;
      const fill = path.closed && firstPoint.fillColor ? firstPoint.fillColor : 'none';
      const opacity = firstPoint.opacity !== undefined ? firstPoint.opacity : 1;
      
      svg += `  <path d="${pathData}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" opacity="${opacity}" />\n`;
    }
    
    svg += '</svg>';
    
    return svg;
  }
}

