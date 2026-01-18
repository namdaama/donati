# CLAUDE.md 更新ドラフト - Issue #188

## 更新対象セクション

### 1. ディレクトリ構成セクション（53-71行目）

**現在の内容:**
```
public/
└── images/          # 画像一元管理
    ├── svg/Carousel/  # カルーセル用SVG
    ├── svg/Parts/     # UI用SVGパーツ
    └── (直下)         # ページ用画像・背景画像
```

**新しい内容:**
```
public/
└── images/          # 画像一元管理（用途別階層構成）
    ├── rough/                    # ページ背景画像
    ├── picture/                  # 写真素材
    ├── svg/
    │   ├── carousel/             # カルーセル用SVG
    │   ├── screen/               # 画面全体のSVG
    │   ├── icons/
    │   │   ├── header/          # ヘッダー用アイコン
    │   │   └── sub/             # その他サブアイコン
    │   ├── text/                 # テキストSVG
    │   ├── decorations/
    │   │   └── waveline/        # waveLine系の装飾
    │   ├── steps/                # ステップ表示用SVG
    │   ├── performers/
    │   │   ├── fuji/            # Fuji関連SVG
    │   │   └── hide/            # Hide関連SVG
    │   ├── conference/           # 講演関連SVG
    │   └── logos/                # ロゴ類
    └── forDev/                   # 開発用画像
```

### 2. 画像管理セクション（85-89行目）

**現在の内容:**
```
- **配置**: `public/images/` に一元管理（Figma書き出しも直接配置）
- **構造**: svg/Carousel/, svg/Parts/, 直下にページ用画像
- **Figmaワークフロー**: Dev Modeから数値取得、public/images/に配置
- **詳細**: docs/04-workflow-collaboration/figma-workflow.md を参照
```

**新しい内容:**
```
- **配置**: `public/images/` に一元管理（Figma書き出しも直接配置）
- **構造**: 用途別ディレクトリ階層構成（rough/, svg/*, picture/, forDev/）
- **ファイル移動**: #186で完了した新ディレクトリ構成に従う
- **Figmaワークフロー**: Dev Modeから数値取得、public/images/に配置
- **詳細**: docs/04-workflow-collaboration/figma-workflow.md を参照
```

### 3. Figmaワークフロー更新（docs/04-workflow-collaboration/figma-workflow.md の更新）

**対象セクション: アセット書き出しフェーズ - 配置（110-119行目）**

**現在の内容:**
```
public/images/
├── svg/Carousel/      # カルーセル用SVG（5枚）
├── svg/Parts/         # UI用SVGパーツ、キャラクター画像
├── svg/Screen/        # デザインモックアップSVG
└── (直下)             # ページ用画像、背景画像
```

**新しい内容:**
```
public/images/
├── rough/                       # ページ背景画像
├── picture/                     # 写真素材
├── svg/
│   ├── carousel/                # カルーセル用SVG
│   ├── screen/                  # 画面全体のSVG
│   ├── icons/header/            # ヘッダー用アイコン
│   ├── icons/sub/               # その他サブアイコン
│   ├── text/                    # テキストSVG
│   ├── decorations/waveline/    # waveLine系の装飾
│   ├── steps/                   # ステップ表示用SVG
│   ├── performers/fuji/         # Fuji関連SVG
│   ├── performers/hide/         # Hide関連SVG
│   ├── conference/              # 講演関連SVG
│   └── logos/                   # ロゴ類
└── forDev/                      # 開発用画像
```

---

## 注意事項

- **実施タイミング**: #186（ディレクトリ再構成）完了後に、このドラフトを元に最終更新を実施
- **確認項目**:
  - [ ] 新ディレクトリ構成が正確に反映されているか
  - [ ] ファイル移動がすべて完了しているか（#186の確認）
  - [ ] ツリー表示の階層が正しいか
  - [ ] 各ディレクトリの説明が正確か
