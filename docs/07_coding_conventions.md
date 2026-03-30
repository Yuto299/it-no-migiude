# コーディング規約

## 基本方針

- TypeScript を必ず使用する（`any` は原則禁止）
- ESLint / Prettier の設定に従う（Next.js デフォルト設定を使用）
- コンポーネントは関数コンポーネントのみ（クラスコンポーネント禁止）
- `"use client"` は必要最小限のコンポーネントにのみ付与する

---

## ファイル・ディレクトリ命名

| 対象 | 規則 | 例 |
|---|---|---|
| コンポーネントファイル | PascalCase | `ArticleCard.tsx` |
| ページファイル | Next.js規約（小文字） | `page.tsx`, `layout.tsx` |
| lib / utils | camelCase | `microcms.ts`, `utils.ts` |
| 型定義ファイル | camelCase | `index.ts` |
| CSSクラス | Tailwindのみ使用 | — |

---

## コンポーネント記述ルール

### 基本構造

```typescript
// ① import（外部ライブラリ → 内部モジュールの順）
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'

// ② 型定義
type Props = {
  article: Article
}

// ③ コンポーネント（default export）
export default function ArticleCard({ article }: Props) {
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 命名規則

```typescript
// ✅ 正しい
export default function ArticleCard({ article }: Props) {}

// ❌ 誤り（アロー関数で default export しない）
const ArticleCard = ({ article }: Props) => {}
export default ArticleCard
```

---

## Tailwind CSS ルール

### クラスの記述順序

レイアウト → サイズ → スペーシング → 見た目の順で記述する。

```tsx
// ✅ 推奨順序
<div className="flex items-center gap-4 w-full px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700">

// ❌ バラバラに書かない
<div className="text-sm bg-white gap-4 border-gray-200 flex py-2 px-4 items-center rounded-lg w-full border text-gray-700">
```

### レスポンシブ対応

**モバイルファースト**で記述する。

```tsx
// ✅ モバイルファースト
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ❌ デスクトップファーストは使わない
<div className="grid grid-cols-3 sm:grid-cols-1">
```

### カラーパレット

Tailwind標準カラーに加え、以下のブランドカラーを `tailwind.config.ts` に定義して使用する。

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        green: '#1D9E75',
        'green-dark': '#0F6E56',
        'green-light': '#E1F5EE',
        blue: '#378ADD',
        'blue-dark': '#185FA5',
        'blue-light': '#E6F1FB',
      }
    }
  }
}
```

---

## データ取得ルール

### Server Componentでのfetch

```typescript
// ✅ Server Componentで直接fetchする
export default async function ArticlesPage() {
  const { contents: articles } = await getArticles({ limit: 10 })
  return <ArticleList articles={articles} />
}

// ❌ useEffectでクライアント側からfetchしない
```

### エラーハンドリング

```typescript
// notFound()を使って404ページに飛ばす
import { notFound } from 'next/navigation'

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  return <div>{article.title}</div>
}
```

---

## 画像の扱い

必ず `next/image` を使用する。widthとheightは常に指定する。

```tsx
// ✅ 正しい
import Image from 'next/image'

<Image
  src={article.thumbnail.url}
  alt={article.title}
  width={800}
  height={450}
  className="w-full h-auto rounded-lg"
/>

// ❌ <img>タグを直接使わない
<img src={article.thumbnail.url} alt={article.title} />
```

**microCMS画像のドメインを `next.config.js` に追加する:**

```javascript
// next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.microcms-assets.io',
    },
  ],
},
```

---

## リンクの扱い

内部リンクは必ず `next/link` を使用する。

```tsx
// ✅ 内部リンク
import Link from 'next/link'
<Link href="/articles">記事一覧</Link>

// ✅ 外部リンク
<a href="https://..." target="_blank" rel="noopener noreferrer">外部サイト</a>

// ❌ 内部リンクに<a>タグを使わない
<a href="/articles">記事一覧</a>
```

---

## 禁止事項

| 禁止 | 理由 |
|---|---|
| `any` 型の使用 | 型安全性の低下 |
| `<img>` タグの直接使用 | 画像最適化が効かない |
| `useEffect` でのデータ取得 | Server Componentで取得すべき |
| インラインスタイル（`style={{}}`） | Tailwindに統一 |
| CSS Modules / styled-components | Tailwindに統一 |
| `console.log` をコミットに含める | デバッグコードは削除する |
