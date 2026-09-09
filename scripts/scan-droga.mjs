import fs from 'node:fs'
import path from 'node:path'

function searchDir(dir, pattern) {
  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (['node_modules', '.git', 'dist', '__tests__', 'test', 'tests', '.tmp'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...searchDir(full, pattern))
    } else if (/\.(ts|tsx|json|js)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8')
      const lines = content.split('\n')
      lines.forEach((line, idx) => {
        if (pattern.test(line)) {
          if (!/drogaria|droga raia/i.test(line)) {
            results.push({ file: full.replace(/\\/g, '/'), line: idx + 1, text: line.trim() })
          }
        }
      })
    }
  }
  return results
}

const drogaMatches = searchDir('modules', /\bdrogas?\b/i)
console.log(`Matches for droga (total ${drogaMatches.length}):`)
drogaMatches.forEach(m => console.log(`[${m.file}:${m.line}] ${m.text.slice(0, 130)}`))
