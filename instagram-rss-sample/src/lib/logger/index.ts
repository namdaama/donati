/**
 * 🔥 シンプルなロガー実装（後で本格的なものに置き換え予定）
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug(message: string, context?: any): void;
  info(message: string, context?: any): void;
  warn(message: string, context?: any): void;
  error(message: string, context?: any): void;
}

class SimpleLogger implements Logger {
  private isDevelopment = import.meta.env.MODE === 'development';

  debug(message: string, context?: any): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context);
    }
  }

  info(message: string, context?: any): void {
    console.info(`[INFO] ${message}`, context);
  }

  warn(message: string, context?: any): void {
    console.warn(`[WARN] ${message}`, context);
  }

  error(message: string, context?: any): void {
    console.error(`[ERROR] ${message}`, context);
  }
}

export const logger = new SimpleLogger();