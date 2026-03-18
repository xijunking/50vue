import { promises as fs } from 'node:fs'
import path from 'node:path'

const DEFAULT_ROOT = 'raw-data'

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!args.author) {
    throw new Error('请传入作者名，例如: npm run create:deck-txt -- --author 炉石东少')
  }

  const cwd = process.cwd()
  const batch = args.batch || formatDate(new Date())
  const collectedAt = args.collectedAt || `${batch} 00:00:00`
  const publishedAt = args.publishedAt || collectedAt
  const sourceType = args.sourceType || ''
  const rootPath = path.resolve(cwd, DEFAULT_ROOT)
  const batchDir = path.join(rootPath, batch)
  const filePath = path.join(batchDir, `${sanitizeFileName(args.author)}.txt`)

  await fs.mkdir(batchDir, { recursive: true })

  const existing = await fs.stat(filePath).catch(() => null)
  if (existing) {
    throw new Error(`模板文件已存在: ${filePath}`)
  }

  const template = buildTemplate({
    author: args.author,
    sourceType,
    collectedAt,
    publishedAt,
  })

  await fs.writeFile(filePath, template, 'utf8')

  console.log(`已创建批次目录: ${batchDir}`)
  console.log(`已生成模板文件: ${filePath}`)
}

function parseArgs(argv) {
  const args = {
    author: '',
    batch: '',
    sourceType: '',
    collectedAt: '',
    publishedAt: '',
  }

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i]

    if (current === '--author') {
      args.author = argv[i + 1] || ''
      i += 1
      continue
    }

    if (current === '--batch') {
      args.batch = argv[i + 1] || ''
      i += 1
      continue
    }

    if (current === '--sourceType') {
      args.sourceType = argv[i + 1] || ''
      i += 1
      continue
    }

    if (current === '--collectedAt') {
      args.collectedAt = argv[i + 1] || ''
      i += 1
      continue
    }

    if (current === '--publishedAt') {
      args.publishedAt = argv[i + 1] || ''
      i += 1
      continue
    }
  }

  return args
}

function buildTemplate(metadata) {
  return [
    `author: ${metadata.author}`,
    `sourceType: ${metadata.sourceType}`,
    `collectedAt: ${metadata.collectedAt}`,
    `publishedAt: ${metadata.publishedAt}`,
    '',
    '# 每套卡组建议使用“名称 + 下一行卡组代码”的形式整理',
    '# 可以连续粘贴多套，脚本会自动识别',
    '',
    '<卡组名称>',
    '<卡组代码>',
    '',
    '<卡组名称2>',
    '<卡组代码2>',
    '',
  ].join('\n')
}

function sanitizeFileName(value) {
  return value.replace(/[\\/:*?"<>|]/g, '-').trim()
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
