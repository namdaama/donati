/**
 * Instagram Graph API - アクセストークン更新スクリプト
 *
 * 現在の短期トークンから新しい長期トークン（60日有効）を生成します。
 *
 * 実行方法:
 *   npm run refresh-token
 *
 * 必要な環境変数:
 *   - FACEBOOK_APP_ID: Meta App ID
 *   - FACEBOOK_APP_SECRET: Meta App Secret
 *   - INSTAGRAM_ACCESS_TOKEN: 現在のアクセストークン
 *
 * 出力:
 *   - 新しいアクセストークン
 *   - 有効期限（日数）
 *   - Vercel環境変数更新コマンド
 */

const GRAPH_API_VERSION = 'v21.0';
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

interface TokenRefreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function refreshToken() {
  console.log('🔄 Instagram アクセストークン更新を開始します...\n');

  // 環境変数チェック
  const APP_ID = process.env.FACEBOOK_APP_ID;
  const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
  const CURRENT_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!APP_ID || !APP_SECRET || !CURRENT_TOKEN) {
    console.error('❌ 必要な環境変数が設定されていません:');
    if (!APP_ID) console.error('  - FACEBOOK_APP_ID');
    if (!APP_SECRET) console.error('  - FACEBOOK_APP_SECRET');
    if (!CURRENT_TOKEN) console.error('  - INSTAGRAM_ACCESS_TOKEN');
    console.error('\n.envファイルに環境変数を設定してください。');
    process.exit(1);
  }

  try {
    // トークン交換API呼び出し
    const url = new URL(`${GRAPH_API_BASE}/oauth/access_token`);
    url.searchParams.set('grant_type', 'fb_exchange_token');
    url.searchParams.set('client_id', APP_ID);
    url.searchParams.set('client_secret', APP_SECRET);
    url.searchParams.set('fb_exchange_token', CURRENT_TOKEN);

    console.log('📡 Graph APIにリクエスト送信中...');
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API呼び出しエラー:', errorData);
      process.exit(1);
    }

    const data: TokenRefreshResponse = await response.json();

    // 結果出力
    console.log('\n✅ 新しいアクセストークンの生成に成功しました!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('新しいアクセストークン:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(data.access_token);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const expiresInDays = Math.round(data.expires_in / 86400);
    console.log(`⏰ 有効期限: ${expiresInDays}日（約${Math.round(expiresInDays / 30)}ヶ月）\n`);

    console.log('📝 次のステップ:\n');
    console.log('1. Vercel環境変数を更新:');
    console.log('   vercel env rm INSTAGRAM_ACCESS_TOKEN production');
    console.log('   vercel env add INSTAGRAM_ACCESS_TOKEN production');
    console.log('   （↑のコマンド実行後、上記のトークンを貼り付けてください）\n');

    console.log('2. ローカル環境変数を更新:');
    console.log('   .envファイルのINSTAGRAM_ACCESS_TOKENを上記の値に更新\n');

    console.log('3. カレンダーリマインダーを設定:');
    console.log(`   ${expiresInDays - 2}日後（${new Date(Date.now() + (expiresInDays - 2) * 86400000).toLocaleDateString('ja-JP')}）に次回更新のリマインダー\n`);

    console.log('✨ トークン更新完了！\n');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

// スクリプト実行
refreshToken();
