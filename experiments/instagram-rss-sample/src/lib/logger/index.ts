/**
 * 🔥 プロフェッショナルロギングシステム
 */

export { createLogger, ProfessionalLogger } from './logger';
export type { LogLevel, LogContext, LogEntry } from './logger';

// デフォルトのグローバルロガー
import { createLogger } from './logger';

export const logger = createLogger('App');