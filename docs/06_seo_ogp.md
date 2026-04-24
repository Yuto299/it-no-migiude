# SEO・OGP設定仕様

## 基本方針

- Next.js 14 App Routerの `Metadata API` を使用する（`<Head>` タグは使わない）
- 全ページに `title` / `description` / OGP3点セットを必ず設定する
- 記事ページは動的メタデータを生成する（`generateMetadata`）

---

## メタデータの設定方法

### ルートレイアウト（サイト共通デフォルト）

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'ITの右腕',
    template: '%s | ITの右腕',
  },
  description: '中小企業・スタートアップのDX推進を支援するITメディア。現場で使えるIT活用のヒントが見つかります。',
  openGraph: {
    siteName: 'ITの右腕',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'ITの右腕',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

---

### 静的ページの個別設定

```typescript
// app/about/page.tsx
export const metadata: Metadata = {
  title: '運営者紹介',
  description: 'ITの右腕の運営者について。DX支援・システム開発の実績とスキルをご紹介します。',
}
```

`template: '%s | ITの右腕'` により、タイトルは「運営者紹介 | ITの右腕」と展開される。

---

### 動的ページのメタデータ生成（記事詳細）

```typescript
// app/articles/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) return {}

  return {
    title: article.title,
    description: article.metaDescription ?? article.title,
    openGraph: {
      title: article.title,
      description: article.metaDescription ?? article.title,
      type: 'article',
      publishedTime: article.publishedAt,
      images: [
        {
          url: article.thumbnail.url,
          width: article.thumbnail.width,
          height: article.thumbnail.height,
          alt: article.title,
        },
      ],
    },
  }
}
```

---

## 各ページのメタデータ一覧

| ページ | title | description |
|---|---|---|
| / | （デフォルト）ITの右腕 | サイト共通説明文 |
| /articles | 記事一覧 | DX・IT活用に関する記事の一覧です。 |
| /articles/[slug] | 記事タイトル | article.metaDescription |
| /categories/[slug] | カテゴリ名の記事一覧 | カテゴリ説明文 |
| /contact | 無料相談・お問い合わせ | 無料相談も受付中。DX・IT活用のご相談はこちらから。 |
| /about | 運営者紹介 | 運営者のプロフィール・スキル・実績。 |

---

## 構造化データ（JSON-LD）

記事詳細ページに `Article` スキーマを追加する。

```typescript
// app/articles/[slug]/page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  image: article.thumbnail.url,
  datePublished: article.publishedAt,
  author: {
    '@type': 'Person',
    name: '運営者名',
  },
}

// JSX内
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## サイトマップ

`next-sitemap` を使用して自動生成する。

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/contact/thanks'],
}
```

**build後に生成:** `next build && next-sitemap`

`package.json` に追記:

```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

---

## OGP画像仕様

| 項目 | 値 |
|---|---|
| サイズ | 1200 × 630px |
| 形式 | PNG |
| デフォルト画像 | `/public/og-default.png` |
| 記事別画像 | microCMSのthumbnailをそのまま使用 |

**microCMS画像のリサイズ:** `?w=1200&h=630&fit=crop` をURLに付与してトリミング取得が可能。
