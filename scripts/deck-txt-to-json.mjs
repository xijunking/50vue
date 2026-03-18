import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const DEFAULT_INPUT = 'raw-data'
const DEFAULT_OUTPUT = 'src/data/hearthstone-decks.json'
const DECK_CODE_RE = /^[A-Za-z0-9+/=]{60,}$/
const META_RE = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.+)$/

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const cwd = process.cwd()
  const inputPath = path.resolve(cwd, args.input || DEFAULT_INPUT)
  const outputPath = path.resolve(cwd, args.output || getDefaultOutput(args.input))

  const stat = await fs.stat(inputPath).catch(() => null)

  if (!stat) {
    throw new Error(`输入路径不存在: ${inputPath}`)
  }

  const files = stat.isDirectory()
    ? await collectFiles(inputPath)
    : [inputPath]

  if (files.length === 0) {
    throw new Error(`未在输入路径中找到可解析文件: ${inputPath}`)
  }

  const existingRecords = await readExistingRecords(outputPath)
  const existingCreatedAtMap = new Map(existingRecords.map((item) => [item.id, item.createdAt]))
  const seenIds = new Set()
  const now = new Date().toISOString()
  const records = []

  for (const filePath of files) {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const parsed = parseDeckFile(fileContent, filePath, inputPath)

    for (const deck of parsed.decks) {
      const id = createDeckId(parsed.metadata.author, deck.deckCode)

      if (seenIds.has(id)) {
        continue
      }

      seenIds.add(id)

      records.push({
        id,
        name: normalizeDeckName(deck.rawName),
        rawName: deck.rawName,
        className: inferClassName(deck.rawName),
        format: inferFormat(deck.rawName),
        deckCode: deck.deckCode,
        sourceAuthor: parsed.metadata.author || '',
        sourceType: parsed.metadata.sourceType || '',
        sourceFile: path.basename(filePath),
        batch: parsed.batch,
        collectedAt: parsed.metadata.collectedAt || '',
        publishedAt: parsed.metadata.publishedAt || '',
        createdAt: existingCreatedAtMap.get(id) || now,
      })
    }
  }

  records.sort(compareDeckRecords)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${JSON.stringify(records, null, 2)}\n`, 'utf8')

  console.log(`已生成 ${records.length} 条卡组数据`)
  console.log(`输入路径: ${inputPath}`)
  console.log(`输出文件: ${outputPath}`)
}

function parseArgs(argv) {
  const args = {
    input: '',
    output: '',
  }

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i]

    if (current === '--input' || current === '-i') {
      args.input = argv[i + 1] || ''
      i += 1
      continue
    }

    if (current === '--output' || current === '-o') {
      args.output = argv[i + 1] || ''
      i += 1
      continue
    }

    if (!args.input) {
      args.input = current
      continue
    }

    if (!args.output) {
      args.output = current
    }
  }

  return args
}

function getDefaultOutput(inputArg) {
  if (!inputArg) {
    return DEFAULT_OUTPUT
  }

  const normalized = inputArg.replace(/[\\/]+$/, '')
  const baseName = path.basename(normalized)

  if (!baseName || baseName === 'raw-data') {
    return DEFAULT_OUTPUT
  }

  return path.join('src/data', `${baseName}.json`)
}

async function collectFiles(rootPath) {
  const files = []
  const stack = [rootPath]

  while (stack.length > 0) {
    const currentPath = stack.pop()
    const entries = await fs.readdir(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory()) {
        stack.push(fullPath)
        continue
      }

      if (entry.isFile()) {
        if (isRawDeckTextFile(entry.name)) {
          files.push(fullPath)
        }
      }
    }
  }

  return files.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

function isRawDeckTextFile(fileName) {
  const lowerName = fileName.toLowerCase()
  return lowerName.endsWith('.txt') || lowerName.endsWith('txt')
}

async function readExistingRecords(outputPath) {
  const content = await fs.readFile(outputPath, 'utf8').catch(() => '')

  if (!content) {
    return []
  }

  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function parseDeckFile(content, filePath, inputRoot) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const metadata = {}
  let index = 0

  while (index < lines.length && !lines[index].trim()) {
    index += 1
  }

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      break
    }

    const match = line.match(META_RE)

    if (!match) {
      break
    }

    metadata[match[1]] = match[2].trim()
    index += 1
  }

  const bodyLines = lines.slice(index)
  const decks = extractDecks(bodyLines)

  if (decks.length === 0) {
    throw new Error(`未从文件中解析到卡组: ${filePath}`)
  }

  return {
    metadata,
    decks,
    batch: resolveBatchName(filePath, inputRoot),
  }
}

function extractDecks(lines) {
  const decks = []

  for (let i = 0; i < lines.length; i += 1) {
    const current = lines[i].trim()

    if (!isDeckCode(current)) {
      continue
    }

    const rawName = findDeckName(lines, i)

    if (!rawName) {
      continue
    }

    decks.push({
      rawName,
      deckCode: current,
    })
  }

  return dedupeDecks(decks)
}

function findDeckName(lines, codeIndex) {
  for (let i = codeIndex - 1; i >= 0; i -= 1) {
    const line = lines[i].trim()

    if (!line || line === '图片' || isDeckCode(line)) {
      continue
    }

    if (isLikelyDeckName(line)) {
      return line
    }
  }

  return ''
}

function isLikelyDeckName(line) {
  if (!line) {
    return false
  }

  if (line.length > 40) {
    return false
  }

  if (/[。！？!?,，：:]/.test(line)) {
    return false
  }

  if (/^(author|sourceType|collectedAt|publishedAt)\s*:/i.test(line)) {
    return false
  }

  return true
}

function isDeckCode(value) {
  return DECK_CODE_RE.test(value)
}

function dedupeDecks(decks) {
  const seen = new Set()
  const result = []

  for (const deck of decks) {
    const key = `${deck.rawName}__${deck.deckCode}`

    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    result.push(deck)
  }

  return result
}

function normalizeDeckName(name) {
  return name
    .replace(/^(标准|狂野|竞技场)\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function inferFormat(name) {
  if (/^标准/.test(name)) {
    return 'standard'
  }

  if (/^狂野/.test(name)) {
    return 'wild'
  }

  if (/^竞技场/.test(name)) {
    return 'arena'
  }

  return ''
}

function inferClassName(name) {
  const normalized = normalizeDeckName(name)
  const matchers = [
    { patterns: ['死亡骑士', 'DK', '死骑'], value: '死亡骑士' },
    { patterns: ['恶魔猎手', '瞎'], value: '恶魔猎手' },
    { patterns: ['德鲁伊', '德'], value: '德鲁伊' },
    { patterns: ['猎人', '猎'], value: '猎人' },
    { patterns: ['法师', '法'], value: '法师' },
    { patterns: ['圣骑士', '骑'], value: '圣骑士' },
    { patterns: ['牧师', '牧'], value: '牧师' },
    { patterns: ['潜行者', '盗贼', '贼'], value: '潜行者' },
    { patterns: ['萨满', '萨'], value: '萨满祭司' },
    { patterns: ['术士', '术'], value: '术士' },
    { patterns: ['战士', '战'], value: '战士' },
  ]

  for (const matcher of matchers) {
    if (matcher.patterns.some((pattern) => normalized.includes(pattern))) {
      return matcher.value
    }
  }

  return ''
}

function resolveBatchName(filePath, inputRoot) {
  const relative = path.relative(inputRoot, filePath)
  const segments = relative.split(path.sep).filter(Boolean)

  if (segments.length > 1) {
    return segments[0]
  }

  const parentDir = path.basename(path.dirname(filePath))
  return parentDir === path.basename(inputRoot) ? '' : parentDir
}

function createDeckId(author, deckCode) {
  return createHash('sha1')
    .update(`${author}::${deckCode}`)
    .digest('hex')
    .slice(0, 16)
}

function compareDeckRecords(a, b) {
  return [
    a.batch || '',
    a.sourceAuthor || '',
    a.className || '',
    a.name || '',
  ]
    .join('::')
    .localeCompare(
      [
        b.batch || '',
        b.sourceAuthor || '',
        b.className || '',
        b.name || '',
      ].join('::'),
      'zh-Hans-CN'
    )
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
