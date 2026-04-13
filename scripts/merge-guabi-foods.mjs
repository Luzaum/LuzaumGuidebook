import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')

const json = execSync('node scripts/gen-guabi-natural-foods.mjs', {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
})
const batch = JSON.parse(json)
const main = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))

const existing = new Set(main.foods.map((f) => f.id))
for (const item of batch) {
  if (existing.has(item.id)) {
    console.error('ID duplicado, ignorado:', item.id)
    continue
  }
  main.foods.push(item)
  existing.add(item.id)
}

fs.writeFileSync(datasetPath, JSON.stringify(main, null, 2) + '\n')
console.log('Inseridos', batch.length, 'itens Guabi Natural em', datasetPath)
