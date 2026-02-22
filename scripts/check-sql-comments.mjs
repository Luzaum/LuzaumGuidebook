import fs from 'node:fs'
import path from 'node:path'

const MIGRATIONS_DIR = path.resolve('supabase', 'migrations')

function listSqlFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...listSqlFiles(fullPath))
      continue
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.sql')) {
      files.push(fullPath)
    }
  }
  return files
}

function findHashLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split(/\r?\n/)
  const hits = []
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].includes('#')) {
      hits.push({
        line: i + 1,
        text: lines[i],
      })
    }
  }
  return hits
}

const sqlFiles = listSqlFiles(MIGRATIONS_DIR)
let totalHits = 0

for (const file of sqlFiles) {
  const hits = findHashLines(file)
  if (hits.length === 0) continue
  totalHits += hits.length
  const relative = path.relative(process.cwd(), file)
  console.error(`\n[SQL HASH COMMENT] ${relative}`)
  for (const hit of hits) {
    console.error(`  L${hit.line}: ${hit.text}`)
  }
}

if (totalHits > 0) {
  console.error('\nErro: migrations SQL contem "#" . Use apenas comentarios "--".')
  process.exit(1)
}

console.log('OK: nenhuma migration SQL contem "#".')
