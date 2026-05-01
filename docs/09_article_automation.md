# 記事投稿自動化

## 概要

Claude Code に microCMS MCP を接続することで、記事生成から microCMS への投稿までを自動化する。

---

## MCP 設定

`~/.claude/settings.json` に以下を設定済み：

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

> APIキーは書き込み権限（POST/PUT/PATCH）が必要。読み取り専用キーでは投稿できない。

---

## 自動化フロー

```
1. トピック・キーワードを Claude に伝える
2. Claude が記事本文を生成（見出しはすべて H3）
3. Gemini / Imagen でサムネイル画像を生成（手動 or 別途自動化）
4. microCMS MCP で記事を下書き投稿
5. microCMS ダッシュボードで確認・公開
```

---

## Claude への指示テンプレート

記事生成から投稿まで一括で依頼する際の雛形：

```
以下のトピックで記事を書いて microCMS に下書き投稿してください。

トピック: [テーマ]
ターゲット: 中小企業・スタートアップの経営者・担当者
文字数: 2000〜3000字
見出し: すべて H3（### ）で統一
スラッグ: [英数字-ハイフン区切り]
```

---

## microCMS コンテンツスキーマ（記事）

| フィールド名 | フィールドID | 型 |
|---|---|---|
| タイトル | title | テキスト |
| 本文 | content | リッチエディタ |
| サムネイル | thumbnail | 画像 |
| スラッグ | slug | テキスト |
| カテゴリ | category | コンテンツ参照 |

> 実際のスキーマは microCMS ダッシュボードで確認・更新すること。

---

## 今後の自動化候補

- Gemini Imagen API をスクリプト化してサムネイル生成も自動化
- GitHub Actions で定期的な記事生成・投稿をスケジュール実行
