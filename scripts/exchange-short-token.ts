#!/usr/bin/env node

/**
 * Instagram Graph API - 短期トークンを長期トークンに交換するスクリプト
 *
 * 使用方法:
 * ```bash
 * npx tsx scripts/exchange-short-token.ts <短期トークン>
 * ```
 *
 * または環境変数で指定:
 * ```bash
 * SHORT_TOKEN=<短期トークン> npx tsx scripts/exchange-short-token.ts
 * ```
 *
 * 例:
 * ```bash
 * npx tsx scripts/exchange-short-token.ts IGQVJWYnh3RWx...
 * ```
 */

import * as fs from 'fs';
import * as path from 'path';

// 環境変数読み込み
const loadEnv = () => {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    const env: Record<string, string> = {};

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        if (key && value) {
          env[key] = value;
        }
      }
    });

    return env;
  }
  return {};
};

// カラー出力用ユーティリティ
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const log = {
  info: (msg: string) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg: string) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  section: (msg: string) => console.log(`\n${colors.bright}${msg}${colors.reset}`),
  muted: (msg: string) => console.log(`${colors.gray}${msg}${colors.reset}`),
};

interface TokenExchangeResult {
  success: boolean;
  access_token?: string;
  expires_in?: number;
  expiryDate?: string;
  error?: string;
  errorDescription?: string;
}

/**
 * 短期トークンを長期トークンに交換
 */
async function exchangeShortToken(
  shortToken: string,
  appId: string,
  appSecret: string
): Promise<TokenExchangeResult> {
  try {
    const url = new URL('https://graph.instagram.com/v21.0/access_token');

    url.searchParams.append('grant_type', 'fb_exchange_token');
    url.searchParams.append('client_id', appId);
    url.searchParams.append('client_secret', appSecret);
    url.searchParams.append('access_token', shortToken);

    log.info(`トークン交換API呼び出し中...`);
    log.muted(`エンドポイント: ${url.origin}/v21.0/access_token`);

    const response = await fetch(url.toString());
    const data = (await response.json()) as any;

    if (!response.ok) {
      return {
        success: false,
        error: data.error?.message || `HTTP ${response.status}`,
        errorDescription: data.error?.type || undefined,
      };
    }

    if (data.error) {
      return {
        success: false,
        error: data.error.message || 'Unknown error',
        errorDescription: data.error.type || undefined,
      };
    }

    if (!data.access_token || !data.expires_in) {
      return {
        success: false,
        error: 'No token in response',
      };
    }

    // 有効期限を計算
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + data.expires_in);

    return {
      success: true,
      access_token: data.access_token,
      expires_in: data.expires_in,
      expiryDate: expiryDate.toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * トークン有効期限を確認
 */
async function debugToken(
  token: string,
  appId: string,
  appSecret: string
): Promise<{
  isValid: boolean;
  expiresAt?: number;
  expiryDate?: string;
  appId?: string;
  scopes?: string[];
  error?: string;
}> {
  try {
    const url = new URL('https://graph.facebook.com/v21.0/debug_token');
    url.searchParams.append('input_token', token);
    url.searchParams.append('access_token', `${appId}|${appSecret}`);

    const response = await fetch(url.toString());
    const data = (await response.json()) as any;

    if (data.error) {
      return {
        isValid: false,
        error: data.error.message,
      };
    }

    const expiresAt = data.data?.expires_at || 0;
    const expiryDate = expiresAt > 0 ? new Date(expiresAt * 1000).toISOString() : undefined;

    return {
      isValid: data.data?.is_valid === true && expiresAt > Math.floor(Date.now() / 1000),
      expiresAt,
      expiryDate,
      appId: data.data?.app_id,
      scopes: data.data?.scopes,
    };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * 秒を日時に変換
 */
function secondsToDaysHours(seconds: number): string {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  return `${days}日${hours}時間`;
}

/**
 * メイン処理
 */
async function main() {
  log.title('📱 Instagram Graph API - トークン交換ツール');

  // 環境変数を読み込む
  const envVars = loadEnv();
  const envAppId = process.env.FACEBOOK_APP_ID || envVars.FACEBOOK_APP_ID;
  const envAppSecret = process.env.FACEBOOK_APP_SECRET || envVars.FACEBOOK_APP_SECRET;

  // コマンドライン引数から短期トークンを取得
  const shortToken =
    process.argv[2] ||
    process.env.SHORT_TOKEN ||
    envVars.SHORT_TOKEN;

  // 入力チェック
  if (!shortToken) {
    log.error('短期トークンが指定されていません');
    console.log(`
${colors.bright}使用方法:${colors.reset}
  npx tsx scripts/exchange-short-token.ts <短期トークン>

${colors.bright}環境変数で指定する場合:${colors.reset}
  SHORT_TOKEN=<短期トークン> npx tsx scripts/exchange-short-token.ts

${colors.bright}例:${colors.reset}
  npx tsx scripts/exchange-short-token.ts IGQVJWYnh3RWx...
`);
    process.exit(1);
  }

  if (!envAppId || !envAppSecret) {
    log.error('Meta App ID または App Secret が見つかりません');
    console.log(`
${colors.bright}必要な環境変数:${colors.reset}
  FACEBOOK_APP_ID
  FACEBOOK_APP_SECRET

これらを以下の方法で設定してください:
  1. .env ファイルに記載
  2. 環境変数として設定

${colors.gray}参考: .env.example を参照${colors.reset}
`);
    process.exit(1);
  }

  log.section('ステップ 1: 短期トークンの検証');
  log.muted(`トークン: ${shortToken.substring(0, 20)}...${shortToken.substring(shortToken.length - 10)}`);

  const debugResult = await debugToken(shortToken, envAppId, envAppSecret);

  if (!debugResult.isValid) {
    log.error(`トークンが無効です: ${debugResult.error}`);
    process.exit(1);
  }

  log.success('トークンは有効です');
  if (debugResult.expiryDate) {
    log.muted(`有効期限: ${debugResult.expiryDate}`);
  }
  if (debugResult.scopes) {
    log.muted(`スコープ: ${debugResult.scopes.join(', ')}`);
  }

  log.section('ステップ 2: 短期トークンを長期トークンに交換');

  const result = await exchangeShortToken(shortToken, envAppId, envAppSecret);

  if (!result.success) {
    log.error(`トークン交換に失敗しました`);
    if (result.error) {
      log.muted(`エラー: ${result.error}`);
    }
    if (result.errorDescription) {
      log.muted(`タイプ: ${result.errorDescription}`);
    }
    process.exit(1);
  }

  log.success('トークン交換に成功しました！');

  log.section('📋 新しい長期トークン情報');

  console.log(`
${colors.bright}アクセストークン:${colors.reset}
${colors.green}${result.access_token}${colors.reset}

${colors.bright}有効期限:${colors.reset}
  ${result.expires_in ? secondsToDaysHours(result.expires_in) : 'N/A'}
  (${result.expiryDate})

${colors.bright}有効期限（秒）:${colors.reset}
  ${result.expires_in} 秒
`);

  log.section('🔐 セキュリティ確認');
  log.warn('このトークンを安全に保管してください');
  log.muted('- .env ファイルに INSTAGRAM_ACCESS_TOKEN として保存');
  log.muted('- ソースコードには絶対に含めない');
  log.muted('- Git リポジトリにはコミットしない');

  log.section('📝 .env 更新手順');
  console.log(`
1. .env ファイルを開く
2. INSTAGRAM_ACCESS_TOKEN をこの値に置き換える:

   INSTAGRAM_ACCESS_TOKEN=${result.access_token}

3. ファイルを保存

または、Vercel にデプロイしている場合:

   vercel env add INSTAGRAM_ACCESS_TOKEN production

新しいトークンをペーストしてください。
`);

  log.section('✅ トークン更新完了');
  log.muted(`有効期限: ${result.expiryDate}`);
  log.muted(`次のリフレッシュ予定日: 約50日後`);
}

main().catch((error) => {
  log.error('予期しないエラーが発生しました');
  console.error(error);
  process.exit(1);
});