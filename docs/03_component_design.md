# コンポーネント設計

## 設計方針

- コンポーネントは「再利用できるか」を基準に切り出す
- propsはTypeScriptで必ず型定義する
- Server Component を基本とし、インタラクションが必要な箇所のみ `"use client"` を付与する
- スタイルはすべてTailwind CSSクラスで記述する（CSS Modulesは使わない）

---

## レイアウト系

### `Header`

```tsx
// 使用箇所: app/layout.tsx
// Server Component

type Props = {} // propsなし（固定ナビゲーション）
```

**内部構造:**
- ロゴ（テキスト or SVG）
- ナビリンク: 記事一覧 / カテゴリ / 運営者紹介
- CTAボタン: 無料相談（アウトライン） / お問い合わせ（グリーン塗り）
- モバイル: ハンバーガーメニュー（`"use client"`）

---

### `Footer`

```tsx
// Server Component

type Props = {} // propsなし
```

**内部構造:**
- 3カラム: サイト説明 / コンテンツリンク / お問い合わせリンク
- コピーライト / プライバシーポリシー / 特商法

---

### `Breadcrumb`

```tsx
type BreadcrumbItem = {
  label: string
  href?: string  // 省略時は現在地（リンクなし）
}

type Props = {
  items: BreadcrumbItem[]
}
```

---

## 記事系

### `ArticleCard`

```tsx
// Server Component
// 使用箇所: トップ新着記事・記事一覧・関連記事

type Props = {
  title: string
  slug: string
  thumbnail: { url: string; width: number; height: number }
  category: { name: string; slug: string }
  publishedAt: string        // ISO8601
  excerpt?: string           // 一覧ページのみ使用
}
```

---

### `ArticleList`

```tsx
// Server Component
// 使用箇所: /articles, /categories/[slug], トップページ

type Props = {
  articles: ArticleCardProps[]
  columns?: 2 | 3            // デフォルト: 3
}
```

---

### `ArticleBody`

```tsx
// Server Component
// 使用箇所: /articles/[slug]

type Props = {
  content: string            // microCMSのリッチテキスト（HTML文字列）
}
```

**注意:** dangerouslySetInnerHTMLを使用。XSS対策としてmicroCMS側で信頼されたHTMLのみ入稿する前提。

---

### `ArticleMeta`

```tsx
// Server Component

type Props = {
  publishedAt: string
  category: { name: string; slug: string }
  tags?: string[]
}
```

---

### `RelatedArticles`

```tsx
// Server Component

type Props = {
  articles: ArticleCardProps[]  // 最大3件
}
```

---

## CTA系

### `CtaBanner`

```tsx
// Server Component
// 使用箇所: 記事本文中間・記事末尾・中間CTAセクション

type Props = {
  variant: "inline" | "section"
  // inline: 記事本文内の帯バナー（コンパクト）
  // section: フルワイドのCTAセクション（グリーン背景）
  title?: string             // デフォルトテキスト有り
  description?: string
}
```

---

### `HeroCta`

```tsx
// Server Component
// 使用箇所: トップページヒーローセクション専用

type Props = {} // テキスト・リンクはハードコード
```

---

## フォーム系

### `ContactForm`

```tsx
"use client"
// 使用箇所: /contact

type ContactInput = {
  name: string
  company: string
  email: string
  message: string
}

type Props = {} // propsなし（内部でuseFormを使用）
```

**バリデーションルール:**
| フィールド | ルール |
|---|---|
| name | 必須・最大50文字 |
| company | 必須・最大100文字 |
| email | 必須・メール形式 |
| message | 必須・最小10文字・最大1000文字 |

**送信フロー:**
1. `handleSubmit` → `/api/contact` へPOST
2. 成功時: `/contact/thanks` へリダイレクト
3. 失敗時: フォーム内にエラーメッセージ表示

---

### `FormField`

```tsx
"use client"

type Props = {
  label: string
  name: string
  type?: "text" | "email" | "textarea"
  placeholder?: string
  required?: boolean
  error?: string             // バリデーションエラーメッセージ
  register: UseFormRegister<any>  // React Hook Form
}
```

---

## UIパーツ

### `Badge`

```tsx
type Props = {
  label: string
  variant?: "category" | "tag"  // デフォルト: category
  href?: string              // リンクにする場合
}
```

---

### `Button`

```tsx
type Props = {
  children: React.ReactNode
  variant?: "primary" | "outline"
  // primary: グリーン塗り
  // outline: ボーダーのみ
  href?: string              // aタグ化（外部リンク対応）
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
}
```

---

### `SectionTitle`

```tsx
type Props = {
  title: string
  linkLabel?: string         // 「一覧を見る →」等
  linkHref?: string
}
```

---

## Server / Client の分け方

| コンポーネント | Server / Client | 理由 |
|---|---|---|
| Header（ナビ） | Server | 静的 |
| Header（ハンバーガー） | Client | 開閉トグル |
| ArticleCard | Server | データ表示のみ |
| ArticleBody | Server | HTML描画のみ |
| ContactForm | Client | useForm・送信処理 |
| FormField | Client | register prop |
| CtaBanner | Server | 静的 |
