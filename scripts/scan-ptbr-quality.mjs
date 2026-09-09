import fs from 'node:fs'
import path from 'node:path'

const scannedDirs = ['modules', 'src']
const skipDirs = ['node_modules', '.git', 'dist', '__tests__', 'test', 'tests']

const patterns = [
  { id: 'literal_translations', regex: /\b(falha renal|falha cardíaca|falha cardiaca|falha hepática|falha hepatica|escórias?|escorias? nitrogenadas?|desperdício nitrogenado|comida de cão|comida de cachorro|massa do corpo|droga de escolha|drogas de escolha)\b/gi },
  { id: 'english_food_terms', regex: /\b(low fat|urgent care|dry food|wet food|pouch|kibble|canned food|puppy food|kitten food|senior dog|senior cat|novel protein)\b/gi },
  { id: 'english_medical_terms', regex: /\b(heart failure|kidney failure|renal failure|liver failure|blood pressure|side effects|body condition score|muscle condition score)\b/gi },
  { id: 'english_ui_words', regex: /['"`][^'"`]*\b(Loading\.\.\.|Select\.\.\.|Search\.\.\.|Please wait|No data found|Submit|Cancel|Save changes|Go back)\b[^'"`]*['"`]/gi },
  { id: 'awkward_pt', regex: /\b(alimentando com|alimentar com|comida húmida|peso alvo|balanço de nitrogênio|taxa de respiração|pressão de sangue)\b/gi },
]

const findings = []

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      scan(full)
    } else if (/\.(ts|tsx|json|js)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8')
      const lines = content.split('\n')
      lines.forEach((line, idx) => {
        const trimmed = line.trim()
        if (trimmed.startsWith('import ') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return
        
        for (const p of patterns) {
          p.regex.lastIndex = 0
          let match
          while ((match = p.regex.exec(line)) !== null) {
            // avoid pure code definitions
            if (!/className=|style=|path:|url:|id:|slug:|href=/.test(line) || /['"`].*['"`]/.test(line)) {
              findings.push({
                file: full.replace(/\\/g, '/'),
                line: idx + 1,
                type: p.id,
                matched: match[0],
                context: trimmed
              })
            }
          }
        }
      })
    }
  }
}

for (const d of scannedDirs) {
  scan(d)
}

console.log(`\n=== SCAN COMPLETED: ${findings.length} POTENTIAL ITEMS FOUND ===\n`)
const grouped = {}
findings.forEach(f => {
  grouped[f.type] = (grouped[f.type] || [])
  grouped[f.type].push(f)
})

for (const [type, list] of Object.entries(grouped)) {
  console.log(`\n--- Type: ${type} (${list.length} occurrences) ---`)
  list.forEach(item => {
    console.log(`[${item.file}:${item.line}] Match: "${item.matched}" -> Context: ${item.context.slice(0, 140)}`)
  })
}
