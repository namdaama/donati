import { z } from 'zod';

/**
 * 🔥 プロフェッショナルなロギングシステム - 愛を込めたログ出力
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  [key: string]: any;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: {
    message: string;
    stack?: string;
    name: string;
  };
}

// ログレベルの優先度
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// ログ設定のスキーマ
const LoggerConfigSchema = z.object({
  level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  pretty: z.boolean().default(true),
  timestamp: z.boolean().default(true),
  colors: z.boolean().default(true),
});

type LoggerConfig = z.infer<typeof LoggerConfigSchema>;

export class ProfessionalLogger {
  private config: LoggerConfig;
  private name: string;

  constructor(name: string, config: Partial<LoggerConfig> = {}) {
    this.name = name;
    this.config = LoggerConfigSchema.parse(config);
  }

  /**
   * ログレベルのチェック
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
  }

  /**
   * ログエントリのフォーマット
   */
  private formatEntry(entry: LogEntry): string {
    if (this.config.pretty) {
      return this.prettyFormat(entry);
    }
    return JSON.stringify(entry);
  }

  /**
   * 美しいフォーマット
   */
  private prettyFormat(entry: LogEntry): string {
    const parts: string[] = [];
    
    // タイムスタンプ
    if (this.config.timestamp) {
      parts.push(`[${entry.timestamp}]`);
    }
    
    // ログレベル（色付き）
    const levelStr = this.config.colors
      ? this.colorize(entry.level.toUpperCase(), entry.level)
      : entry.level.toUpperCase();
    parts.push(`[${levelStr}]`);
    
    // ロガー名
    parts.push(`[${this.name}]`);
    
    // メッセージ
    parts.push(entry.message);
    
    // コンテキスト
    if (entry.context && Object.keys(entry.context).length > 0) {
      const contextStr = this.config.pretty
        ? this.prettyContext(entry.context)
        : JSON.stringify(entry.context);
      parts.push(contextStr);
    }
    
    // エラー情報
    if (entry.error) {
      parts.push(`\n  Error: ${entry.error.message}`);
      if (entry.error.stack && this.config.level === 'debug') {
        parts.push(`\n  Stack: ${entry.error.stack}`);
      }
    }
    
    return parts.join(' ');
  }

  /**
   * コンテキストの美しい表示
   */
  private prettyContext(context: LogContext): string {
    const items = Object.entries(context)
      .map(([key, value]) => {
        const valueStr = typeof value === 'object'
          ? JSON.stringify(value)
          : String(value);
        return `${key}=${valueStr}`;
      })
      .join(' ');
    
    return `{ ${items} }`;
  }

  /**
   * 色付け（ブラウザコンソール用）
   */
  private colorize(text: string, level: LogLevel): string {
    // ブラウザ環境では色付けは効かないが、将来の拡張のため
    const colors: Record<LogLevel, string> = {
      debug: '\x1b[36m',   // cyan
      info: '\x1b[32m',    // green
      warn: '\x1b[33m',    // yellow
      error: '\x1b[31m',   // red
    };
    
    const reset = '\x1b[0m';
    return `${colors[level]}${text}${reset}`;
  }

  /**
   * ログ出力の実装
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    // エラーオブジェクトの処理
    if (context?.error instanceof Error) {
      entry.error = {
        message: context.error.message,
        stack: context.error.stack,
        name: context.error.name,
      };
      delete context.error;
    }

    const formatted = this.formatEntry(entry);

    // コンソールに出力
    switch (level) {
      case 'debug':
        console.debug(formatted);
        break;
      case 'info':
        console.info(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
        console.error(formatted);
        break;
    }
  }

  // パブリックメソッド
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  /**
   * 子ロガーの作成
   */
  child(name: string, config?: Partial<LoggerConfig>): ProfessionalLogger {
    return new ProfessionalLogger(
      `${this.name}:${name}`,
      { ...this.config, ...config }
    );
  }

  /**
   * 設定の更新
   */
  updateConfig(config: Partial<LoggerConfig>): void {
    this.config = LoggerConfigSchema.parse({ ...this.config, ...config });
  }
}

/**
 * デフォルトロガーの作成
 */
export function createLogger(name: string, config?: Partial<LoggerConfig>): ProfessionalLogger {
  const defaultConfig: Partial<LoggerConfig> = {
    level: import.meta.env.MODE === 'production' ? 'info' : 'debug',
    pretty: import.meta.env.MODE !== 'production',
    colors: import.meta.env.MODE !== 'production',
  };
  
  return new ProfessionalLogger(name, { ...defaultConfig, ...config });
}