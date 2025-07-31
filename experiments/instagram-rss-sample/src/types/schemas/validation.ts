import { z } from 'zod';
import { ValidationError } from '../../lib/errors/custom-errors';
import { Result } from '../../lib/errors/result';

/**
 * 🔥 バリデーションユーティリティ - 愛を込めた型チェック
 */

/**
 * Zodスキーマを使った安全なパース
 */
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string
): Result<T, ValidationError> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return Result.success(result.data);
  }
  
  const errors: Record<string, string[]> = {};
  
  // エラーを整形
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(issue.message);
  });
  
  return Result.failure(
    new ValidationError(
      `バリデーションエラー${context ? ` (${context})` : ''}: データが俺の基準を満たしていない！`,
      undefined,
      data,
      errors
    )
  );
}

/**
 * 複数のデータを一括バリデーション
 */
export function validateBatch<T>(
  schema: z.ZodSchema<T>,
  items: unknown[],
  context?: string
): Result<T[], ValidationError> {
  const results: T[] = [];
  const errors: Array<{ index: number; errors: Record<string, string[]> }> = [];
  
  items.forEach((item, index) => {
    const result = safeParse(schema, item, `${context} [${index}]`);
    
    if (Result.isSuccess(result)) {
      results.push(result.data);
    } else {
      errors.push({
        index,
        errors: result.error.errors || {},
      });
    }
  });
  
  if (errors.length > 0) {
    return Result.failure(
      new ValidationError(
        `バッチバリデーションエラー: ${errors.length}件のアイテムが不正だ！`,
        undefined,
        items,
        { batch: errors.map(e => `Item ${e.index}: ${JSON.stringify(e.errors)}`) }
      )
    );
  }
  
  return Result.success(results);
}

/**
 * 部分的なバリデーション（将来的に実装予定）
 * 現在は必要に応じて個別のスキーマを作成してください
 */

/**
 * カスタムバリデーションルール
 */
export const customValidators = {
  /**
   * 日本語の日付形式をバリデート
   */
  japaneseDate: z.string().regex(
    /^\d{4}年\d{1,2}月\d{1,2}日$/,
    '日付は「YYYY年MM月DD日」形式で入力してくれ！'
  ),
  
  /**
   * Instagram URL をバリデート
   */
  instagramUrl: z.string().regex(
    /^https?:\/\/(www\.)?instagram\.com\/.+$/,
    'Instagram のURLじゃないぞ！'
  ),
  
  /**
   * 安全な画像URLをバリデート
   */
  safeImageUrl: z.string().url().refine(
    (url) => {
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      return allowedExtensions.some(ext => url.toLowerCase().includes(ext));
    },
    '画像URLは.jpg, .jpeg, .png, .gif, .webpのいずれかを含む必要がある！'
  ),
  
  /**
   * ハッシュタグ配列のバリデート（最大数制限付き）
   */
  hashtagArray: (maxCount: number = 30) => z.array(
    z.string().regex(/^#[^\s#]+$/)
  ).max(maxCount, `ハッシュタグは最大${maxCount}個までだ！`),
};

/**
 * 環境変数の安全な読み込み
 */
export function validateEnv<T>(
  schema: z.ZodSchema<T>,
  env: any
): T {
  const result = schema.safeParse(env);
  
  if (!result.success) {
    console.error('環境変数のバリデーションエラー:', result.error.format());
    throw new Error(
      '環境変数が正しく設定されていない！.envファイルを確認してくれ！'
    );
  }
  
  return result.data;
}