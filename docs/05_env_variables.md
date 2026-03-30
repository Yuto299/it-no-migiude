# 環境変数一覧

## `.env.local`（ローカル開発用・Git管理外）

```env
# microCMS
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# Resend（メール送信）
RESEND_API_KEY=re_xxxxxxxxxxxx

# 問い合わせ通知の送信先メールアドレス
CONTACT_TO_EMAIL=your@email.com

# サイトURL（OGP・サイトマップ生成に使用）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## `.env.example`（Git管理対象・テンプレート）

```env
# microCMS
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=

# Resend
RESEND_API_KEY=

# 問い合わせ通知の送信先
CONTACT_TO_EMAIL=

# サイトURL
NEXT_PUBLIC_SITE_URL=
```

---

## Vercel 本番環境への設定

Vercelダッシュボードの「Settings > Environment Variables」に以下を登録する。

| 変数名 | 対象環境 | 備考 |
|---|---|---|
| MICROCMS_SERVICE_DOMAIN | Production / Preview | microCMSのサービスドメイン |
| MICROCMS_API_KEY | Production / Preview | microCMS APIキー（読み取り専用キーを使用） |
| RESEND_API_KEY | Production | Resendのシークレットキー |
| CONTACT_TO_EMAIL | Production | 通知メールの受信アドレス |
| NEXT_PUBLIC_SITE_URL | Production / Preview | 本番: `https://itno-migite.com` |

---

## 変数の使い分け

| プレフィックス | 用途 | ブラウザから参照 |
|---|---|---|
| `NEXT_PUBLIC_` | クライアント側でも使用する変数 | ✓ 可能 |
| （プレフィックスなし） | サーバーサイドのみで使用する変数 | ✗ 不可 |

**重要:** `MICROCMS_API_KEY` と `RESEND_API_KEY` は `NEXT_PUBLIC_` を付けてはいけない。クライアントに露出するとセキュリティリスクになる。

---

## 各サービスのキー取得先

| サービス | 取得場所 |
|---|---|
| microCMS SERVICE_DOMAIN | microCMSダッシュボード > APIの基本情報 > サービスドメイン |
| microCMS API_KEY | microCMSダッシュボード > APIの基本情報 > APIキー（読み取り専用） |
| Resend API_KEY | resend.com > API Keys > Create API Key |
