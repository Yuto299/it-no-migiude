# ITの右腕 — Claude Code プロジェクト設定

## プロジェクト概要

中小企業・スタートアップ向けのDX・IT活用メディアサイト。
記事で信頼を積み上げ、無料相談・問い合わせから案件獲得につなげる。

## 作業開始前に必ず読むこと

以下のドキュメントを全て読んでから作業を開始すること。

- `docs/01_spec.md` — 要件定義・ワイヤーフレーム仕様
- `docs/02_directory_structure.md` — ディレクトリ構成
- `docs/03_component_design.md` — コンポーネント設計・props定義
- `docs/04_api_routes.md` — APIルート・microCMSフェッチ関数仕様
- `docs/05_env_variables.md` — 環境変数一覧
- `docs/06_seo_ogp.md` — SEO・OGP設定仕様
- `docs/07_coding_conventions.md` — コーディング規約
- `docs/08_frontend_design_prompts.md` — デザイン共通制約・ページ別プロンプト

## 技術スタック

- Next.js 14（App Router）
- TypeScript（any禁止）
- Tailwind CSS（インラインスタイル禁止）
- microCMS（headless CMS）
- Resend（メール送信）
- Vercel（デプロイ）

## コーディング規約（要点）

- Server Component を基本とし `"use client"` は最小限
- `<img>` タグ禁止 → `next/image` を使う
- 内部リンクは `next/link` を使う
- `useEffect` でのデータ取得禁止 → Server Component で fetch
- 画像のドメインは `next.config.js` の `remotePatterns` に追加する
- コンポーネントは `export default function ComponentName()` 形式

## ブランドカラー

- メイングリーン: `#1D9E75`
- ダークグリーン: `#0F6E56`
- ライトグリーン: `#E1F5EE`
- メインブルー: `#378ADD`
- ダークブルー: `#185FA5`

## 開発フェーズ

| Phase | 内容 |
|---|---|
| 1 | Next.jsセットアップ + microCMS連携 + 記事一覧・詳細 |
| 2 | トップページ実装 |
| 3 | 問い合わせ・相談フォーム |
| 4 | SEO・OGP・サイトマップ |
| 5 | CTA・デザイン磨き・GA4 |

## 作業指示の受け方

- 1タスクずつ指示を出す。複数タスクを同時にやらない
- 実装前に「何を作るか」を一言確認してから進める
- 不明点があれば作業を止めて質問する
