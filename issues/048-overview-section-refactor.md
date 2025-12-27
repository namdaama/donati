# OverViewSection コンポーネント再設計 (Issue #48)

## 概要
OverViewSection およびその子コンポーネント群が過度に柔軟で、保守性が低下しています。
複数のページで異なる設定が必要となり、条件分岐が複雑化しているため、コンポーネント設計を見直す必要があります。

## 現在の問題点

### 1. コンポーネント構造の複雑性
- **OverViewSection**: 左列・中列・右列のすべてがカスタマイズ可能
  - `leftStaff`, `leftTitle`, `leftIcon`, `leftLink`
  - `middleStaff` OR `middleServices`（条件分岐）
  - `middleTitle`, `middleIcon`, `middleLink`, `hideMiddleIcon`
  - `links`（右列）

### 2. 責任の曖昧性
- OverViewSection が「3列レイアウト」という責任だけでなく
- コンテンツの「種類」（スタッフか サービスか）を判定する責任も持つ
- 各ページでプロップを異なる方法で設定する必要がある

### 3. 保守性の低下
- ページごとに異なる設定が必要で、何が正しいのか不明確
- 新しいページを追加する際に、どのプロップを使うべきか判断が難しい
- テストが複雑になり、エッジケースが増える

### 4. 再利用性とのバランス
- 「万能」を目指すあまり、実際の使用パターンに合わなくなっている

## 現在の使用パターン

### OverView (index.astro)
```astro
<OverViewSection
  leftStaff={staffMembers}      // スタッフ表示
  leftTitle="私たちについて"
  middleServices={services}      // サービス表示
  middleTitle="サービス内容"
  links={overviewLinks}
/>
```

### Service (services.astro)
```astro
<OverViewSection
  leftStaff={fujiStaff}          // スタッフ表示
  leftTitle="フジ"
  middleStaff={hideyukiStaff}    // スタッフ表示（別の人）
  middleTitle="ひでゆき"
  links={overviewLinks}
/>
```

## 解決方針（案）

### オプション A: ページ別コンポーネント化（推奨）
特定のレイアウトパターンごとに専用コンポーネントを作成

```
- OverViewAboutServiceSection.astro (左：スタッフ、中：サービス)
- OverViewAboutAboutSection.astro (左：スタッフ、中：スタッフ)
  または
- ServiceOverViewSection.astro (Service用に特化)
```

**メリット**:
- 各コンポーネントの責任が明確
- プロップが少なく、シンプル
- テストしやすい
- 新規ページ追加時に選択肢が明確

**デメリット**:
- コンポーネント数が増える

### オプション B: ページごとに static 構成を明記
OverViewSection は固定的な3列構成を持ち、プロップは最小限に

```astro
<OverViewAboutService
  leftContent={{ type: 'staff', data: staffMembers, title: '...' }}
  middleContent={{ type: 'service', data: services, title: '...' }}
  links={overviewLinks}
/>
```

**メリット**:
- 構成が明示的
- 型安全

**デメリット**:
- プロップオブジェクトが複雑になる可能性

## 実装タスク

### Phase 1: 現状分析（完了）
- [x] 両ページでの使用パターンを確認
- [x] 複雑性の原因を特定

### Phase 2: 設計決定
- [ ] オプション A または B を選択
- [ ] 新コンポーネント設計書作成
- [ ] 既存プロップとの互換性確認

### Phase 3: 実装
- [ ] 新コンポーネント作成
- [ ] 既存コンポーネントからの移行
- [ ] 型チェック・テスト
- [ ] 不要な既存コンポーネント削除

### Phase 4: 検証
- [ ] すべてのページで正しく表示確認
- [ ] 本番ビルド確認
- [ ] パフォーマンス確認

## 対象ファイル
- src/components/OverViewSection.astro
- src/components/OverViewAboutSection.astro
- src/components/OverViewServiceSection.astro
- src/components/OverViewLinkCard.astro
- src/pages/index.astro
- src/pages/services.astro

## 関連 Issue
- #48: ourServices.jpgデザイン忠実再現（本Issue の原因となったIssue）

## 優先度
中程度（機能は正常に動作しているが、将来のメンテナンス性向上のため）

## 備考
- 現在は機能上の問題はない
- デザインレビュー後に実施予定
- 他のIssueの進捗に応じて優先順位は変更の可能性あり
