# raw-data 目录规范

## 推荐结构

```text
raw-data/
  README.md
  2026-03-18/
    炉石东少.txt
    白石邮报.txt
  2026-03-20/
    其他作者.txt
```

## 说明

- 每个子目录表示一次数据整理批次，目录名建议使用 `YYYY-MM-DD`
- 每个 `txt` 表示一个来源作者
- 生成脚本会递归扫描 `raw-data` 下以 `txt` 结尾的文件
- 建议先运行模板生成命令，再往模板里粘贴内容，避免头部元信息漏填

## 相关命令注释

```json
"type-check": "vue-tsc --build --force",
"generate:decks": "node scripts/deck-txt-to-json.mjs",
"create:deck-txt": "node scripts/create-deck-txt-template.mjs"
```

- `type-check`
  校验项目里的 TypeScript 和 Vue 类型是否正确，和卡组数据无直接关系，但适合改代码后做检查。
- `generate:decks`
  读取当前 `raw-data` 下所有符合规则的原始 `txt`，生成卡组 `json` 数据文件。
- `create:deck-txt`
  自动创建 `raw-data/批次目录/作者.txt` 模板，并预填 `author / sourceType / collectedAt / publishedAt` 头部字段。

## txt 模板

```txt
author: 炉石东少
sourceType: bilibili
collectedAt: 2026-03-18 15:17:00
publishedAt: 2026-03-18 12:37:00

卡组名称
卡组代码

卡组名称2
卡组代码2
```

## 快速创建模板

```bash
npm run create:deck-txt -- --author 炉石东少 --batch 2026-03-18 --sourceType bilibili --publishedAt "2026-03-18 12:37:00"
```

如果不传 `--batch`，脚本会默认使用当天日期。

## 生成 json

```bash
npm run generate:decks
```

如果后续你只想处理某个批次目录，也可以直接指定输入路径：

```bash
npm run generate:decks -- raw-data/2026-03-18
```
