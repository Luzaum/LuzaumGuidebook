import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist'])
const TEXT_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.css', '.scss', '.html', '.md', '.json', '.yml', '.yaml', '.toml'
])

const conflicts = []

function shouldScan(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return TEXT_EXTS.has(ext)
}

function scanFile(filePath) {
  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch {
    return
  }

  const lines = content.split(/\r?\n/)
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (line.startsWith('<<<<<<<') || line.startsWith('>>>>>>>')) {
      conflicts.push(`${filePath}:${i + 1}: ${line}`)
    }
  }
}

function walk(dir) {
  let entries = []
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      walk(abs)
      continue
    }
    if (!shouldScan(abs)) continue
    scanFile(abs)
  }
}

walk(ROOT)

if (conflicts.length > 0) {
  console.error('[check:conflicts] Marcadores de conflito encontrados:')
  for (const row of conflicts) {
    console.error(row)
  }
  process.exit(1)
}

console.log('[check:conflicts] OK - nenhum marcador de conflito encontrado.')
