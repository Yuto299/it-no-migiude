# 記事投稿自動化

## 概要

Claude Code に microCMS MCP を接続することで、記事生成から microCMS への投稿までを自動化する。

---

## MCP 設定

`.claude/settings.json` に以下を設定済み（`.gitignore` で除外済み）：

```json
{
  "mcpServers": {
    "microcms": {
      "command": "npx",
      "args": ["-y", "microcms-mcp-server@latest"],
      "env": {
        "MICROCMS_SERVICE_ID": "it-no-migiude",
        "MICROCMS_API_KEY": "<書き込み権限付きAPIキー>"
      }
    }
  }
}
```

> APIキーは GET / POST / PUT / PATCH 権限が必要。DELETE は不要。

---

## microCMS コンテンツスキーマ（articles）

| フィールドID | 型 | 備考 |
|---|---|---|
| title | テキスト | 必須 |
| slug | テキスト | 必須。英数字ハイフン区切り |
| body | リッチエディタ（HTML） | 必須 |
| thumbnail | 画像 | Gemini/Imagen で生成 |
| category | コンテンツ参照（categories） | 必須 |
| tags | テキスト | カンマ区切り |
| metaDescription | テキスト | 80〜120字 |

### カテゴリ一覧

| カテゴリ名 | ID | slug |
|---|---|---|
| AI活用 | `832tdrrb1nu` | ai-utilization |
| DX入門 | `6zm4okhu6y8a` | dx-basics |
| 業務効率化 | `1yfm3jzpp` | business-efficiency |

---

## 記事フォーマット（実績から抽出）

### タイトルパターン
`メインキーワード——補足説明` の形式（全角ダッシュ「——」で区切る）

```
例:
SharePointの使い方——社内ポータルとして活用するための基本設定
在宅勤務でも生産性を落とさない——チームの仕事管理術
AIで会議を変える——準備・進行・議事録を効率化する具体的な方法
```

### 本文構成
- 文字数: 2,000〜3,500字
- 見出し階層: **H2**（大テーマ）+ **H3**（細分化）の2段構造
  - H2: セクションの大見出し（`<h2>`）
  - H3: H2内の細かいトピック（`<h3>`）
  - ※ H1・H4以下は使わない
- セクション区切り: H2の前に `<hr>` を挿入
- 締め: 必ず「まとめ」H2セクション＋無料相談へのCTAで終わる

```
冒頭: 読者の課題・疑問を提示（見出しなし、2〜3段落）
<hr>
<h2>大テーマA</h2>
  <h3>細分化トピックA-1</h3>
  <h3>細分化トピックA-2</h3>
<hr>
<h2>大テーマB</h2>
  <h3>細分化トピックB-1</h3>
<hr>
...
<hr>
<h2>まとめ：〇〇は〇〇が重要</h2>
締めの文章＋「30分の無料相談でご状況を聞かせてください」
```

### tags
カンマ区切り、5個前後の日本語キーワード

```
例: "SharePoint, Microsoft 365, 社内ポータル, 情報共有, 業務効率化"
```

### metaDescription
疑問文や問いかけで始まるパターンが多い。80〜120字。

```
例: "SharePointを社内ポータルとして活用する具体的な設定方法を解説。ファイル管理・情報共有・権限設定まで、Microsoft 365環境で最初にやるべきことをまとめます。"
```

### slug
英数字ハイフン区切り（kebab-case）、25字以内目安

```
例: sharepoint-internal-portal-setup-guide
```

---

## 自動化フロー

```
1. トピック・キーワード・カテゴリを Claude に伝える
2. Claude が本文を生成（H2+H3構造、<hr>区切り、CTA締め）
3. microCMS MCP で下書き投稿（サムネイルは仮画像）
4. Gemini/Imagen でサムネイル画像を手動生成
5. microCMS ダッシュボードでサムネイル差し替え・確認・公開
```

---

## Claude への指示テンプレート

```
以下のトピックで記事を書いて microCMS に下書き投稿してください。

トピック: [テーマ]
カテゴリ: [AI活用 / DX入門 / 業務効率化]
ターゲット: 中小企業・スタートアップの経営者・担当者
文字数: 2,000〜3,000字
```

---

## 今後の自動化候補

### サムネイル自動生成（課金有効化後に対応）
`scripts/generate-thumbnail.mjs.disabled` にスクリプト作成済み。
Google AI Studio で課金を有効にしたら `.disabled` を外すだけで使える。

```
流れ:
1. 記事タイトル・テーマを Imagen API に渡してサムネイル生成
2. 生成画像を microCMS メディアAPIでアップロード → URLを取得
3. 取得した URL を thumbnail フィールドにセットして投稿
```

### 定期自動投稿
- GitHub Actions で週次など定期的に記事生成・投稿をスケジュール実行
