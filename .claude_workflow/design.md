# 設計: [実績] 文言の全般的な書き換え (Issue #215)

## 前段階の確認
`.claude_workflow/requirements.md` を読み込みました。

## 変更対象と方針

### 変更1: わくわく科学実験室のサービス名修正
**ファイル**: `src/pages/professional-experience.astro`（データ部分のみ）

**現在:**
```typescript
{
  serviceName: 'わくわく科学実験室（スライム・色変パンケーキ・DNA抽出 ほか）',
  locations: [
    '大野市内 小学校PTA',
    // ...
  ]
}
```

**変更後:**
```typescript
{
  serviceName: 'わくわく科学実験室',
  locations: [
    '（スライム・色変パンケーキ・DNA抽出 ほか）',
    '大野市内 小学校PTA',
    // ...
  ]
}
```

- サービス名から括弧記述を分離
- `（スライム・色変パンケーキ・DNA抽出 ほか）` を locations 配列の先頭に移動
- 既存の場所データはそのまま維持

### 変更2: メディア出演・その他セクションの構造変更
**ファイル**: `src/pages/professional-experience.astro`（データ部分）、`src/components/professional-experience/CategorySection.astro`

#### アプローチ: categoryTitle を省略可能にする

**理由:**
- Issue #215 ではメディア出演・その他セクションにカテゴリ（###）ヘッダーがない
- 「メディア出演」「自主企画イベント」「声の出演」はサービスレベルの項目
- CategorySection の categoryTitle を省略可能にし、空の場合は SectionGrayHeading を非表示にする

**CategorySection.astro の変更:**

```astro
interface Props {
  categoryTitle?: string;  // optional に変更
  services: Service[];
}

const { categoryTitle, services } = Astro.props;
```

```html
<div class="rounded-lg p-4 md:p-6">
  <!-- categoryTitle がある場合のみグレーバーを表示 -->
  {categoryTitle && <SectionGrayHeading title={categoryTitle} level="h3" />}

  <!-- サービスごとの表示（変更なし） -->
  ...
</div>
```

**ページデータの変更:**

```typescript
// 変更前: 3階層（カテゴリ→サービス→場所）
const mediaSection = {
  title: 'メディア出演・その他',
  categories: [
    {
      categoryTitle: 'メディア出演',
      services: [
        { serviceName: 'ラジオ・テレビ出演', locations: [...] }
      ]
    },
    {
      categoryTitle: '自主企画イベント',
      services: [
        { serviceName: '主催イベント', locations: [...] }
      ]
    },
    {
      categoryTitle: '声の出演',
      services: [
        { serviceName: 'Moon Night Circus 2025', locations: ['オーディオガイド ナレーション'] }
      ]
    }
  ]
};

// 変更後: 2階層（サービス→場所）、カテゴリタイトルなし
const mediaSection = {
  title: 'メディア出演・その他',
  categories: [
    {
      categoryTitle: '',
      services: [
        {
          serviceName: 'メディア出演',
          locations: [
            'FM福井「Morning Tune」',
            'FBCテレビ「おじゃまっテレ」',
            'FBCラジオ「ふむふむいっぱいラジカフェ」'
          ]
        },
        {
          serviceName: '自主企画イベント',
          locations: [
            'お菓子な科学実験教室',
            '星のお話と音楽会',
            '【R15】大人のプラネタリウム など'
          ]
        },
        {
          serviceName: '声の出演',
          locations: [
            'Moon Night Circus 2025 （オーディオガイド ナレーション）'
          ]
        }
      ]
    }
  ]
};
```

**ポイント:**
- categories 配列は1要素のみ（categoryTitle は空文字列）
- 旧カテゴリ名（メディア出演、自主企画イベント、声の出演）をサービス名に降格
- 旧サービス名（ラジオ・テレビ出演、主催イベント）を削除し、場所を直接紐づけ
- 「Moon Night Circus 2025 （オーディオガイド ナレーション）」を1つの場所項目に統合

### 変更3: スペース表記の統一
**ファイル**: `src/pages/professional-experience.astro`

Issue の内容に合わせて全角スペース「　」を半角スペース「 」に統一する箇所:
- `'ふじしま認定こども園　など'` → `'ふじしま認定こども園 など'`
- `'Fun! Family　など'` → `'Fun! Family など'`
- `'子ども食堂 木のおうち　など'` → `'子ども食堂 木のおうち など'`
- `'イオンそよら福井開発　など'` → `'イオンそよら福井開発 など'`
- `'【R15】大人のプラネタリウム　など'` → `'【R15】大人のプラネタリウム など'`

## 変更ファイル一覧

| ファイル | 変更内容 |
|---------|---------|
| `src/components/professional-experience/CategorySection.astro` | categoryTitle を optional 化、空の場合 SectionGrayHeading 非表示 |
| `src/pages/professional-experience.astro` | データ更新（差分1〜3） |
| `docs/05-implementation-guides/components-guide.md` | CategorySection の Props 変更を反映 |

## 影響範囲

- CategorySection は `professional-experience.astro` でのみ使用されているため、他ページへの影響なし
- MajorSection、SectionGrayHeading は変更不要
- 既存のスタイル変更（青色テキスト、・マーク）はそのまま維持

## 検証項目

1. サイエンス事業セクションのカテゴリ見出し（グレーバー）が正常に表示されること
2. 星空事業セクションのカテゴリ見出し（グレーバー）が正常に表示されること
3. メディア出演・その他セクションにカテゴリ見出しが表示されないこと
4. メディア出演・その他セクションのサービス名（青色・太字）が正しく表示されること
5. わくわく科学実験室のサービス名に括弧記述が含まれていないこと
6. `（スライム・色変パンケーキ・DNA抽出 ほか）` が場所リストの先頭に表示されること
7. 全角スペースが半角スペースに統一されていること
8. `npm run build` がエラーなく完了すること
