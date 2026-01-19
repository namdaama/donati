# Issue #186 - ファイル分類・移動計画

## 概要
現在の `svg/Parts/` の60ファイルを新しい用途別ディレクトリ構成に再編成する。

---

## 1. ルート直下の背景画像 → `rough/` に移動

### 移動対象（ルート直下）
```
public/images/
├── AboutUs.jpg                  → rough/AboutUs.jpg
├── backGround.png               → rough/backGround.png
├── Contact.jpg                  → rough/Contact.jpg
├── FAQ.jpg                      → rough/FAQ.jpg
├── logoBackGround.png           → rough/logoBackGround.png
├── OurService-fuji.jpg          → rough/OurService-fuji.jpg
├── OurService-hide.jpg          → rough/OurService-hide.jpg
├── OverView.jpg                 → rough/OverView.jpg
└── ProfessionalExperience.jpg   → rough/ProfessionalExperience.jpg
```

---

## 2. Carousel と Screen の小文字化

### Carousel
```
svg/Carousel/ → svg/carousel/
├── Carousel_AboutDonati.svg
├── Carousel_Career.svg
├── Carousel_Services_Science.svg
└── Carousel_Services_StarrySky.svg
```

### Screen
```
svg/Screen/ → svg/screen/
├── AboutUs.svg
├── Contact.svg
├── OurService_fuji.svg
├── ourServices.svg
├── OverView.svg
└── ProfessionalExperience.svg
```

---

## 3. svg/Parts の分類・移動

### svg/icons/header/ ← header用アイコン

- icon_AboutUs.svg → icon_AboutUs.svg
- icon_Achivements.svg → icon_Achivements.svg
- icon_Contact.svg → icon_Contact.svg
- icon_FAQ.svg → icon_FAQ.svg
- icon_A.svg → icon_A.svg
- icon_PullDown.svg → icon_PullDown.svg

### svg/icons/sub/ ← その他サブアイコン、矢印等

- icon_dotStar.svg
- icon_detailHere.svg
- icon_Pro_Science.svg
- icon_Pro_StarrySky.svg
- subIcon_Science.svg
- subIcon_StarrySky.svg
- DetailButton.svg
- DetailTableButton.svg
- roundDetailButton.svg

### svg/text/ ← テキストSVG

- text_AboutDonati.svg
- text_AboutUs.svg
- text_Carrer.svg
- text_Example.svg
- text_Offer.svg
- text_OverViewScience.svg
- text_OverViewStarrySky.svg
- text_Price.svg
- text_QA.svg
- text_Question.svg
- text_science.svg
- text_scienceParformShow.svg
- text_service.svg
- text_space.svg
- text_wakuwakuScienceLab.svg
- text_workShop.svg

### svg/decorations/waveline/ ← waveLine系

- waveLine.svg
- waveLine_300px.svg
- waveLine_752px.svg
- waveLine_994px.svg

### svg/steps/ ← ステップ表示用

- step_star1.svg
- step_star2.svg
- step_star3.svg
- step_star4.svg
- step_star5.svg
- step_star6.svg

### svg/performers/fuji/ ← Fuji関連

- fuji_name.svg
- fuji_pict.svg

### svg/performers/hide/ ← Hide関連

- hide_name.svg
- hide_pict.svg

### svg/conference/ ← 講演関連

- conference_thing1.svg
- conference_thing2.svg
- conference_thing3.svg
- conference_thing4.svg

### svg/logos/ ← ロゴ類

- DonatiLogo.svg
- homeLogo.svg
- QA.svg

### svg/decorations/ ← その他装飾系（waveline以外）

- blue_star.svg
- introductionCloud.svg
- contact_confirm_clean.svg
- sectionGrayRound.svg
- starrySkySubPlan.svg

---

## 4. picture/ ディレクトリ

現状維持（既に正しく分類されている）
```
picture/
├── About/
│   ├── icon_Community.jpg
│   ├── icon_Hideyuki.jpg
│   ├── icon_Instagram.jpg
│   ├── icon_Youtube.jpg
│   └── StarrySky.png
├── OverView/
│   ├── Science.jpg
│   └── StarrySky.jpg
└── Science/
    ├── card_Lab.jpg
    ├── card_Show.jpg
    ├── card_WorkShop.jpg
    ├── detail_Lab01.jpg
    ├── detail_Lab02.jpg
    ├── detail_Show01.jpg
    ├── detail_Show02.jpg
    ├── detail_WorkShop01.jpg
    └── detail_WorkShop02.jpg
```

---

## 5. forDev/ ディレクトリ

現状維持（既に正しく分類されている）
```
forDev/
├── ourServices_FujiService.jpg
├── ourServices_HideService.jpg
├── serviceScienceStarMap.png
└── serviceScienceTable.png
```

---

## 6. 削除対象（_old ディレクトリ）

### 削除するディレクトリ
```
svg/Carousel/_old/     # 削除
svg/Parts/_old/        # 削除
_old/                  # 削除
```

### 削除するファイル
```
svg/Carousel/_old/Carousel_Contact.svg
svg/Carousel/_old/Carousel_Services.svg
svg/Carousel/_old/Carousel_Staff.svg
svg/Parts/_old/icon_AboutDonati.svg
svg/Parts/_old/icon_Info.svg
svg/Parts/_old/icon_Services.svg
_old/ourServices.jpg
```

---

## 実装手順

1. 新ディレクトリ構造を作成
   ```bash
   mkdir -p public/images/rough
   mkdir -p public/images/svg/carousel
   mkdir -p public/images/svg/screen
   mkdir -p public/images/svg/icons/header
   mkdir -p public/images/svg/icons/sub
   mkdir -p public/images/svg/text
   mkdir -p public/images/svg/decorations/waveline
   mkdir -p public/images/svg/steps
   mkdir -p public/images/svg/performers/fuji
   mkdir -p public/images/svg/performers/hide
   mkdir -p public/images/svg/conference
   mkdir -p public/images/svg/logos
   ```

2. ファイルを移動（上記の分類に従う）

3. `_old` ディレクトリを削除

4. 移動完了後、ファイル数と構成を確認

---

## チェックリスト

- [ ] 新ディレクトリ構造を作成
- [ ] rough/ へのファイル移動（9ファイル）
- [ ] svg/carousel/ への移動（小文字化）
- [ ] svg/screen/ への移動（小文字化）
- [ ] svg/icons/header/ へのファイル移動
- [ ] svg/icons/sub/ へのファイル移動
- [ ] svg/text/ へのファイル移動
- [ ] svg/decorations/waveline/ へのファイル移動
- [ ] svg/steps/ へのファイル移動
- [ ] svg/performers/fuji/ へのファイル移動
- [ ] svg/performers/hide/ へのファイル移動
- [ ] svg/conference/ へのファイル移動
- [ ] svg/logos/ へのファイル移動
- [ ] svg/decorations/ へのその他装飾ファイル移動
- [ ] _old ディレクトリ削除
- [ ] ファイル数と構成の確認
