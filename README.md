# 50project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

## 常用命令说明

```json
"type-check": "vue-tsc --build --force",
"generate:decks": "node scripts/deck-txt-to-json.mjs",
"create:deck-txt": "node scripts/create-deck-txt-template.mjs"
```

- `type-check`
  用于执行 Vue + TypeScript 类型检查，不启动页面、不产出构建文件，适合提交前快速检查类型问题。
- `generate:decks`
  用于扫描 `raw-data` 下的卡组原始 `txt` 文件，并生成页面使用的 `json` 数据，默认输出到 `src/data/hearthstone-decks.json`。
- `create:deck-txt`
  用于快速创建新的批次目录和作者模板 `txt`，避免手动新建文件和手动填写头部元信息。

### 卡组数据工作流

1. 先用 `create:deck-txt` 生成原始模板。
2. 在 `raw-data/批次日期/作者名.txt` 中粘贴和整理卡组内容。
3. 再执行 `generate:decks` 生成 `json` 数据。

示例：

```sh
npm run create:deck-txt -- --author 炉石东少 --batch 2026-03-18 --sourceType bilibili --publishedAt "2026-03-18 12:37:00"
npm run generate:decks
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```
