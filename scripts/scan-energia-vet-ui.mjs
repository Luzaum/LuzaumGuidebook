import fs from 'node:fs'
import path from 'node:path'

function scanDir(dir) {
  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (['node_modules', '.git', 'dist', '__tests__', 'test', 'tests'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...scanDir(full))
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8')
      const lines = content.split('\n')
      lines.forEach((line, idx) => {
        // check for English words in user-visible JSX / strings
        const matches = line.match(/(['"`])(?:\s*)([A-Za-z0-9\s/.,:;%()&+\-—]+)\1/g)
        if (matches) {
          matches.forEach(m => {
            const raw = m.slice(1, -1).trim()
            if (raw.length > 3 && /^[A-Z][a-z]+(\s+[A-Za-z]+)*$/.test(raw)) {
              // candidate English title or term
              if (/^(Save|Cancel|Delete|Loading|Search|Select|Overview|Back|Next|Submit|Update|Weight|Target|Daily|Meals|Food|Energy|Protein|Fat|Carbohydrate|Fiber|Moisture|Breed|Senior|Puppy|Kitten|Adult)$/i.test(raw)) {
                results.push({ file: full.replace(/\\/g, '/'), line: idx + 1, text: raw, lineText: line.trim() })
              }
            }
          })
        }
      })
    }
  }
  return results
}

const res = scanDir('modules/energia-vet')
console.log(`Potential English UI terms in energia-vet (${res.length}):`)
res.forEach(r => console.log(`[${r.file}:${r.line}] "${r.text}" -> ${r.lineText}`))
