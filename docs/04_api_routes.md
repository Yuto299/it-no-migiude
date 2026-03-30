# APIルート仕様

## 概要

Next.js App Routerの `route.ts` によるAPIルートと、microCMSのデータ取得関数を定義する。

---

## 1. 問い合わせ送信 API

### `POST /api/contact`

**概要:** ContactFormからの送信を受け取り、Resendでメール通知する。

**リクエスト:**

```json
{
  "name": "山田 太郎",
  "company": "株式会社サンプル",
  "email": "yamada@example.com",
  "message": "DXについて相談したいです。"
}
```

**バリデーション（サーバーサイド）:**

| フィールド | チェック内容 |
|---|---|
| name | 必須・文字列・最大50文字 |
| company | 必須・文字列・最大100文字 |
| email | 必須・メール形式 |
| message | 必須・最小10文字・最大1000文字 |

**レスポンス（成功）:**

```json
HTTP 200
{ "success": true }
```

**レスポンス（バリデーションエラー）:**

```json
HTTP 400
{ "error": "入力内容を確認してください。" }
```

**レスポンス（サーバーエラー）:**

```json
HTTP 500
{ "error": "送信に失敗しました。時間をおいて再度お試しください。" }
```

**実装例 (`src/app/api/contact/route.ts`):**

```typescript
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, company, email, message } = body

  // サーバーサイドバリデーション
  if (!name || !company || !email || !message) {
    return NextResponse.json({ error: '入力内容を確認してください。' }, { status: 400 })
  }

  await resend.emails.send({
    from: 'noreply@itno-migite.com',
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `【ITの右腕】お問い合わせ: ${name} 様`,
    html: `
      <p><strong>名前:</strong> ${name}</p>
      <p><strong>会社名:</strong> ${company}</p>
      <p><strong>メール:</strong> ${email}</p>
      <p><strong>内容:</strong><br>${message}</p>
    `
  })

  return NextResponse.json({ success: true })
}
```

---

## 2. microCMS データ取得関数

`src/lib/microcms.ts` に集約する。

### 型定義 (`src/types/index.ts`)

```typescript
export type Category = {
  id: string
  name: string
  slug: string
  description?: string
}

export type Article = {
  id: string
  title: string
  slug: string
  body: string           // HTML文字列
  thumbnail: {
    url: string
    width: number
    height: number
  }
  category: Category
  tags?: string[]
  publishedAt: string    // ISO8601
  metaDescription?: string
}

export type ArticleListResponse = {
  contents: Article[]
  totalCount: number
  offset: number
  limit: number
}
```

---

### `getArticles` — 記事一覧取得

```typescript
type GetArticlesOptions = {
  limit?: number       // デフォルト: 10
  offset?: number      // デフォルト: 0
  categorySlug?: string
  fields?: string      // 取得フィールドの絞り込み
}

async function getArticles(options?: GetArticlesOptions): Promise<ArticleListResponse>
```

**使用箇所:** `/articles`, `/categories/[slug]`, トップページ新着記事

---

### `getArticleBySlug` — 記事詳細取得

```typescript
async function getArticleBySlug(slug: string): Promise<Article | null>
```

**使用箇所:** `/articles/[slug]`

**注意:** 存在しないslugの場合は `null` を返す。呼び出し側で `notFound()` を呼ぶ。

---

### `getAllArticleSlugs` — 全スラッグ取得（SSG用）

```typescript
async function getAllArticleSlugs(): Promise<string[]>
```

**使用箇所:** `generateStaticParams` in `/articles/[slug]/page.tsx`

---

### `getCategories` — カテゴリ一覧取得

```typescript
async function getCategories(): Promise<Category[]>
```

**使用箇所:** ナビゲーション、トップページカテゴリセクション

---

### `getCategoryBySlug` — カテゴリ詳細取得

```typescript
async function getCategoryBySlug(slug: string): Promise<Category | null>
```

**使用箇所:** `/categories/[slug]`

---

## 3. キャッシュ・再検証の設定

| ページ | 戦略 | 設定 |
|---|---|---|
| 記事詳細 | ISR | `revalidate: 60`（60秒） |
| 記事一覧 | ISR | `revalidate: 60` |
| トップページ | ISR | `revalidate: 60` |
| カテゴリ一覧 | ISR | `revalidate: 300`（5分） |
| 問い合わせ・相談 | 静的 | `revalidate: false` |

**実装例:**

```typescript
// app/articles/[slug]/page.tsx
export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map(slug => ({ slug }))
}
```
