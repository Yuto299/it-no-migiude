# ディレクトリ構成

## プロジェクトルート

```
it-no-migite/
├── .env.local                  # 環境変数（Git管理外）
├── .env.example                # 環境変数サンプル（Git管理対象）
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── next-sitemap.config.js
├── package.json
└── public/
    ├── favicon.ico
    ├── og-default.png          # デフォルトOGP画像
    └── icons/
```

## srcディレクトリ

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト（ヘッダー・フッター）
│   ├── page.tsx                # トップページ
│   ├── not-found.tsx           # 404ページ
│   ├── sitemap.ts              # サイトマップ自動生成
│   │
│   ├── articles/
│   │   ├── page.tsx            # 記事一覧 /articles
│   │   └── [slug]/
│   │       └── page.tsx        # 記事詳細 /articles/[slug]
│   │
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx        # カテゴリ別一覧 /categories/[slug]
│   │
│   ├── contact/
│   │   ├── page.tsx            # 問い合わせフォーム /contact
│   │   └── thanks/
│   │       └── page.tsx        # 送信完了ページ
│   │
│   ├── consultation/
│   │   └── page.tsx            # 無料相談予約 /consultation
│   │
│   ├── about/
│   │   └── page.tsx            # 運営者紹介 /about
│   │
│   └── api/
│       └── contact/
│           └── route.ts        # 問い合わせ送信API（Resend）
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   │
│   ├── article/
│   │   ├── ArticleCard.tsx     # 記事カード（一覧・トップ用）
│   │   ├── ArticleList.tsx     # 記事カードのグリッド
│   │   ├── ArticleBody.tsx     # 記事本文レンダラー
│   │   ├── ArticleMeta.tsx     # 日付・カテゴリ・タグ
│   │   └── RelatedArticles.tsx # 関連記事
│   │
│   ├── cta/
│   │   ├── CtaBanner.tsx       # 記事内・中間CTA共通バナー
│   │   ├── HeroCta.tsx         # ヒーローセクションのCTA
│   │   └── FooterCta.tsx       # フッター直上のCTAセクション
│   │
│   ├── form/
│   │   ├── ContactForm.tsx     # 問い合わせフォーム本体
│   │   └── FormField.tsx       # 入力フィールド共通コンポーネント
│   │
│   ├── sections/               # トップページ各セクション
│   │   ├── HeroSection.tsx
│   │   ├── LatestArticles.tsx
│   │   ├── CategoryList.tsx
│   │   ├── CtaSection.tsx
│   │   └── AboutSection.tsx
│   │
│   └── ui/                     # 汎用UIパーツ
│       ├── Badge.tsx           # カテゴリ・タグバッジ
│       ├── Button.tsx
│       └── SectionTitle.tsx
│
├── lib/
│   ├── microcms.ts             # microCMS クライアント・フェッチ関数
│   ├── resend.ts               # Resend メール送信関数
│   └── utils.ts                # 日付フォーマット等のユーティリティ
│
├── types/
│   └── index.ts                # Article / Category 等の型定義
│
└── styles/
    └── globals.css             # Tailwindディレクティブ・グローバルスタイル
```

## 補足

- `src/app/` 以下はすべて App Router の規約に従う
- `src/components/` はページをまたいで再利用するコンポーネントのみ配置
- ページ固有のコンポーネントはページファイル内に直接記述して良い
- `src/lib/` はサードパーティとの接続ロジックのみ。UIロジックは入れない
