/**
 * 🔥 Result型 - エレガントなエラーハンドリングのための型
 */

export type Success<T> = {
  success: true;
  data: T;
  warning?: string;
};

export type Failure<E extends Error = Error> = {
  success: false;
  error: E;
};

export type Result<T, E extends Error = Error> = Success<T> | Failure<E>;

/**
 * Result型のヘルパー関数
 */
export const Result = {
  success<T>(data: T, warning?: string): Success<T> {
    return { success: true, data, warning };
  },

  failure<E extends Error>(error: E): Failure<E> {
    return { success: false, error };
  },

  isSuccess<T, E extends Error>(result: Result<T, E>): result is Success<T> {
    return result.success === true;
  },

  isFailure<T, E extends Error>(result: Result<T, E>): result is Failure<E> {
    return result.success === false;
  },

  /**
   * Result型をマッピング
   */
  map<T, U, E extends Error>(
    result: Result<T, E>,
    fn: (value: T) => U
  ): Result<U, E> {
    if (Result.isSuccess(result)) {
      return Result.success(fn(result.data), result.warning);
    }
    return result;
  },

  /**
   * Result型をフラットマップ
   */
  flatMap<T, U, E extends Error>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
  ): Result<U, E> {
    if (Result.isSuccess(result)) {
      const newResult = fn(result.data);
      if (Result.isSuccess(newResult) && result.warning) {
        return { ...newResult, warning: result.warning };
      }
      return newResult;
    }
    return result;
  },

  /**
   * 複数のResultを結合
   */
  all<T extends ReadonlyArray<Result<any, any>>>(
    results: T
  ): Result<
    { [K in keyof T]: T[K] extends Result<infer U, any> ? U : never },
    T[number] extends Result<any, infer E> ? E : never
  > {
    const errors = results.filter(Result.isFailure);
    if (errors.length > 0) {
      return Result.failure(errors[0].error);
    }

    const successValues = results
      .filter(Result.isSuccess)
      .map((r) => r.data);

    return Result.success(successValues as any);
  },

  /**
   * デフォルト値でアンラップ
   */
  unwrapOr<T, E extends Error>(result: Result<T, E>, defaultValue: T): T {
    return Result.isSuccess(result) ? result.data : defaultValue;
  },

  /**
   * エラーをスロー
   */
  unwrapOrThrow<T, E extends Error>(result: Result<T, E>): T {
    if (Result.isSuccess(result)) {
      return result.data;
    }
    throw result.error;
  },
};