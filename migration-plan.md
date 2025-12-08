# わーどるめーかー 依存関係アップグレード計画

## 現状 → 目標

| パッケージ | 現在 | 目標 |
|-----------|------|------|
| Node.js | 指定なし | **23.7** |
| Next.js | 12.0.10 | **15.5.7** |
| React | 17.0.2 | **19.2.1** |
| Firebase | 8.6.1 | 11.x |
| TypeScript | 4.5.5 | 5.x |
| Tailwind CSS | 3.0.18 | 3.4.x |

## 方針

- 脆弱性対応のため React 19.2.1、Next.js 15.5.7 へ更新
- Pages Router を維持（App Router移行は含まない）
- 段階的にアップグレードし各ステップで動作確認

---

## Phase 1: TypeScript 5.x アップグレード

### 変更内容
- `typescript`: 4.5.5 → 5.7.x
- `@types/node`: 17.0.15 → 23.x（Node.js 23.7対応）

### tsconfig.json変更
- `target`: es5 → ES2017
- `moduleResolution`: node → bundler

### 動作確認
- [ ] `npm run build` 成功

### 進捗
- [x] 完了

---

## Phase 2: React 19.2.1 + Next.js 15.5.7 アップグレード

### 変更内容
- `react`: 17.0.2 → **19.2.1**
- `react-dom`: 17.0.2 → **19.2.1**
- `next`: 12.0.10 → **15.5.7**
- `@types/react`: 17.0.39 → 19.x
- `@types/react-dom`: 追加
- `eslint-config-next`: 12.0.10 → 15.x

### コード変更
- `pages/index.tsx`: `<Link><a>...</a></Link>` → `<Link>...</Link>`
- `components/layout/navbar.tsx`: Link修正
- `components/layout/layout.tsx`: children の型を明示（React 19対応）
- ESLint設定をフラットコンフィグへ移行

### 動作確認
- [ ] ビルド成功
- [ ] 全画面動作確認

### 進捗
- [x] 完了

---

## Phase 3: Firebase 11 アップグレード（最重要）

### 変更内容
- `firebase`: 8.6.1 → 11.x

### コード変更（モジュラーAPI移行）

#### plugins/firebase.ts
```typescript
// Before: 名前空間API
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// After: モジュラーAPI
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
```

#### pages/api/games.ts
```typescript
// Before
database.ref('games').orderByChild('created').limitToLast(10).get()
auth.signInAnonymously()
database.ref().child('games').push().set(game)

// After
import { ref, query, orderByChild, limitToLast, get, push, set } from 'firebase/database'
import { signInAnonymously } from 'firebase/auth'

get(query(ref(database, 'games'), orderByChild('created'), limitToLast(10)))
signInAnonymously(auth)
set(push(ref(database, 'games')), game)
```

#### pages/api/game.ts
```typescript
// Before
database.ref(`games/${key}`).get()

// After
import { ref, get } from 'firebase/database'
get(ref(database, `games/${key}`))
```

### 動作確認
- [ ] ゲーム一覧取得が正常動作
- [ ] ゲーム作成が正常動作
- [ ] ゲームプレイが正常動作

### 進捗
- [x] 完了

---

## Phase 4: その他の依存関係更新

### 変更内容
- `tailwindcss`: 3.0.18 → 3.4.x
- `@fortawesome/*`: 最新版
- `react-share`: 4.4.0 → 5.x
- `eslint`: 8.8.0 → 9.x
- `prettier`: 2.5.1 → 3.x（devDependenciesへ移動）
- `eslint-config-prettier`: devDependenciesへ移動

### tailwind.config.js変更
- `mode: 'jit'` を削除（v3ではデフォルト）

### 動作確認
- [ ] lint成功
- [ ] build成功

### 進捗
- [x] 完了

---

## Phase 5: コード品質改善（オプション）

### 変更内容
- `onKeyPress` → `onKeyDown` への移行（非推奨API）
- 不要なimport削除（`pages/api/game.ts`の`useRouter`）

### 進捗
- [x] 完了（textarea.tsxでonKeyDown対応済み、game.tsのuseRouter削除済み）

---

## 変更対象ファイル一覧

| ファイル | 変更内容 | Phase |
|---------|---------|-------|
| `package.json` | 全依存関係の更新 | 1-4 |
| `tsconfig.json` | TypeScript 5対応設定 | 1 |
| `plugins/firebase.ts` | モジュラーAPI移行（全面書き換え） | 3 |
| `pages/api/games.ts` | Firebase モジュラーAPI | 3 |
| `pages/api/game.ts` | Firebase モジュラーAPI、不要import削除 | 3, 5 |
| `pages/index.tsx` | Link修正 | 2 |
| `components/layout/navbar.tsx` | Link修正 | 2 |
| `components/layout/layout.tsx` | children型明示 | 2 |
| `tailwind.config.js` | JITモード設定削除 | 4 |
| `eslint.config.mjs` | 新規作成（ESLint 9対応） | 2 |
| `.eslintrc.json` | 削除 | 2 |
