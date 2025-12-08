# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

「わーどるめーかー」- オリジナルのWordle問題を作成・プレイできる日本語（ひらがな）版Wordleクローンアプリケーション

## 開発コマンド

```bash
npm run dev     # 開発サーバー起動 (http://localhost:3000)
npm run build   # プロダクションビルド
npm run start   # プロダクションサーバー起動
npm run lint    # ESLint実行
```

## 技術スタック

- **フレームワーク**: Next.js 12 (Pages Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + CSS Modules
- **データベース**: Firebase Realtime Database
- **認証**: Firebase Anonymous Auth

## アーキテクチャ

### ページ構成
- `pages/index.tsx` - トップページ（最近作成されたゲーム一覧）
- `pages/create-game.tsx` - ゲーム作成フォーム
- `pages/game.tsx` - ゲームプレイ画面（?key=でゲーム指定）

### API Routes
- `pages/api/games.ts` - GET: ゲーム一覧取得 / POST: ゲーム作成
- `pages/api/game.ts` - GET: 特定ゲーム取得（辞書からランダムに正解を選択）

### 重要な型定義
- `@types/game.d.ts` - `Game`型がグローバルに定義されている

### Firebase設定
- `plugins/firebase.ts` - Firebase初期化と`auth`, `database`のエクスポート
- 環境変数で設定（API_KEY, AUTH_DOMAIN, DATABASE_URL等）

## ゲームロジック

回答判定は`pages/game.tsx`の`addAnswer`関数で実装:
- 緑（完全一致）: 位置も文字も正解
- 黄（部分一致）: 文字は正解に含まれるが位置が違う
- 灰（不一致）: 正解に含まれない

重複文字の処理: 緑が優先され、正解に含まれる文字数を超える黄色は表示されない

## 注意事項

- ひらがなのみ対応（`components/const.ts`の`HIRAGANAS`で定義）
- 解答は3〜10文字
- モバイル対応のため、五十音キーボードは`onTouchEnd`を使用
