import type { InstagramPost } from '../types/instagram';

/**
 * AIを使って投稿本文からタイトルを生成
 * 注：実際のAI APIを使用する場合は、APIキーの設定が必要
 */
export async function generateTitleFromContent(content: string): Promise<string> {
  // クライアントサイドでMCPを使う場合の例
  if (typeof window !== 'undefined' && (window as any).ai) {
    try {
      const ai = (window as any).ai;
      const session = await ai.createSession({
        systemPrompt: '投稿内容から適切な短いタイトル（20文字以内）を生成してください。イベント名や主要なキーワードを含めてください。'
      });
      
      const result = await session.prompt(`次の投稿内容からタイトルを生成してください：\n\n${content}`);
      return result;
    } catch (error) {
      console.error('AI タイトル生成エラー:', error);
    }
  }
  
  // フォールバック：シンプルなルールベースのタイトル生成
  return generateTitleWithRules(content);
}

/**
 * ルールベースでタイトルを生成（フォールバック用）
 */
export function generateTitleWithRules(content: string): string {
  // 改行で分割して最初の意味のある行を探す
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  
  // イベント名っぽいパターンを探す
  const eventPatterns = [
    /「([^」]+)」/,  // 「」で囲まれた部分
    /『([^』]+)』/,  // 『』で囲まれた部分
    /【([^】]+)】/,  // 【】で囲まれた部分
    /^\s*([^。！？\n]{5,30})[。！？]/,  // 最初の文
  ];
  
  for (const pattern of eventPatterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return cleanTitle(match[1]);
    }
  }
  
  // キーワードベースのタイトル生成
  const keywords = extractKeywords(content);
  if (keywords.length > 0) {
    return keywords.slice(0, 3).join('・');
  }
  
  // 最初の20文字を使用
  const firstLine = lines[0] || content;
  return cleanTitle(firstLine.slice(0, 20));
}

/**
 * タイトルをクリーンアップ
 */
function cleanTitle(title: string): string {
  return title
    .replace(/[#＃]\S+/g, '')  // ハッシュタグを除去
    .replace(/https?:\/\/\S+/g, '')  // URLを除去
    .replace(/\s+/g, ' ')  // 連続する空白を1つに
    .trim()
    .slice(0, 30);  // 最大30文字
}

/**
 * キーワード抽出（簡易版）
 */
function extractKeywords(content: string): string[] {
  // 重要そうな単語パターン
  const importantWords = content.match(/[ァ-ヶー]{4,}|[一-龯]{2,}/g) || [];
  
  // 頻出順でソート
  const wordCount = new Map<string, number>();
  importantWords.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });
  
  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 5);
}

/**
 * バッチでタイトルを生成（パフォーマンス最適化）
 */
export async function generateTitlesForPosts(
  posts: InstagramPost[]
): Promise<Map<string, string>> {
  const titleMap = new Map<string, string>();
  
  // 既にタイトルがある投稿はスキップ
  const postsNeedingTitles = posts.filter(post => 
    !post.title || post.title === 'Instagram Post' || post.title.length === 0
  );
  
  // 並列で処理（最大5件ずつ）
  const batchSize = 5;
  for (let i = 0; i < postsNeedingTitles.length; i += batchSize) {
    const batch = postsNeedingTitles.slice(i, i + batchSize);
    const titles = await Promise.all(
      batch.map(post => generateTitleFromContent(post.content))
    );
    
    batch.forEach((post, index) => {
      titleMap.set(post.id, titles[index]);
    });
  }
  
  return titleMap;
}

/**
 * キャッシュ付きタイトル生成
 */
const titleCache = new Map<string, string>();

export async function generateTitleWithCache(
  postId: string,
  content: string
): Promise<string> {
  // キャッシュチェック
  const cached = titleCache.get(postId);
  if (cached) return cached;
  
  // 新規生成
  const title = await generateTitleFromContent(content);
  titleCache.set(postId, title);
  
  return title;
}