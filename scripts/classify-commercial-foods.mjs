/**
 * Classifica alimentos comerciais do genutri-dataset com base em nome/apresentação.
 * Uso: node scripts/classify-commercial-foods.mjs [--write]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')

const THERapeutic_PATTERNS = [
  { re: /renal|kidney|k\/d|ren[aá]l/i, tags: ['CKD'] },
  { re: /urin[aá]ri|urinary|c\/d|struvit|s\/o|oxalat|calciur/i, tags: ['URINARY'] },
  { re: /gastro|digest|i\/d|biome|intestinal|hepatic|hep[aá]tic/i, tags: ['GI'] },
  { re: /hypo|hipoalerg|z\/d|hydrol|ultrahypo|sensitiv/i, tags: ['ALLERGY'] },
  { re: /obes|satiety|metabolic|perfect weight|weight management|light weight|om overweight|perda de peso/i, tags: ['WEIGHT_LOSS'] },
  { re: /diabet|diabetic/i, tags: ['DIABETES'] },
  { re: /onc|oncolog|c[aâ]ncer/i, tags: ['ONCOLOGY'] },
  { re: /cardiac|heart|cardio/i, tags: ['CARDIAC'] },
  { re: /hepatic|hep[aá]t/i, tags: ['HEPATIC'] },
  { re: /joint|articul|mobility|j\/d/i, tags: ['JOINT'] },
  { re: /recover|convalesc|a\/d urgent|recupera|enteral|hipercal[oó]ric|intensiv|support first|nutralife intensiv|complett peptide|dieta enteral|mucilon/i, tags: ['RECOVERY'] },
]

const THERapeutic_LINE =
  /prescription|vet life|vetlife|nutri[cç][aã]o cl[ií]nica|veterinary|veterin[aá]ri|vet care|vet care|vd |formula natural vet|equil[ií]brio veterinary|pro plan veterinary|royal canin veterinary|hypoallergenic|renal special|gastrointestinal low fat|satiety support|multi-benefit w\/d|urinary s\/o|hydrolized|hydrolyzed|ultrahypo|struvite|obesity management|kidney care|food sensitivities|onc care|metabolic weight|diabetic special|hepatic|cardiac canine|convalescence|urinary care|dermasense/i

function norm(s) {
  return `${s ?? ''}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function inferLifeStage(name, presentation) {
  const t = norm(`${name} ${presentation}`)
  if (/petmilk|orga milk|support first milk|leite|milk powder|suced[aâ]neo|desmame|papinha desmame|substituto.*leite|neonat|maternal|mother and baby|filhote.*gato|kitten|puppy|filhote|filhotes|crescimento|optistart|baby cat|baby dog|growth|junior/.test(t)) {
    if (/mother and baby|all life|convalesc|recover|a\/d|enteral|intensiv|hipercalor|nutri[cç][aã]o cl[ií]nica.*recuper/.test(t)) return 'ALL'
    return 'PUPPY'
  }
  if (/senior|s[eê]nior|7\+|12\+|ageing|aging|madur|\+7|\+12/.test(t)) return 'SENIOR'
  if (/adult|adulto|castrad|sterilis|indoor 7|fit 32|maintenance|manuten/.test(t)) return 'ADULT'
  if (/recover|convalesc|a\/d|enteral|intensiv|recupera|support|nutrapet|nutri[cç][aã]o cl[ií]nica|veterinary|prescription|vet life/.test(t)) return 'ALL'
  return 'ADULT'
}

function inferNeuterStatus(name, presentation) {
  const t = norm(`${name} ${presentation}`)
  if (/castrad|sterilis|neuter|indoor cat|light\/castrad|light weight care|perfect weight|obes|satiety|metabolic weight|om overweight|defense plus castrad|extra.*castrad/.test(t)) {
    return 'NEUTERED'
  }
  return 'ANY'
}

function inferTherapeutic(name, presentation) {
  const t = `${name} ${presentation}`
  if (THERapeutic_LINE.test(t)) return true
  for (const p of THERapeutic_PATTERNS) {
    if (p.re.test(t)) return true
  }
  return false
}

function inferIndications(name, presentation) {
  const t = `${name} ${presentation}`
  const tags = new Set()
  for (const p of THERapeutic_PATTERNS) {
    if (p.re.test(t)) p.tags.forEach((x) => tags.add(x))
  }
  return [...tags]
}

function classifyFood(food) {
  if (food.foodType !== 'commercial') return null
  const lifeStage = inferLifeStage(food.name, food.presentation)
  const neuterStatus = inferNeuterStatus(food.name, food.presentation)
  const isTherapeutic = inferTherapeutic(food.name, food.presentation)
  const therapeuticIndications = isTherapeutic ? inferIndications(food.name, food.presentation) : []
  return { lifeStage, neuterStatus, isTherapeutic, therapeuticIndications }
}

const write = process.argv.includes('--write')
const raw = fs.readFileSync(datasetPath, 'utf8')
const dataset = JSON.parse(raw)
let changed = 0

for (const food of dataset.foods) {
  const c = classifyFood(food)
  if (!c) continue
  const before = JSON.stringify({
    lifeStage: food.lifeStage,
    neuterStatus: food.neuterStatus,
    isTherapeutic: food.isTherapeutic,
    therapeuticIndications: food.therapeuticIndications,
  })
  food.lifeStage = c.lifeStage
  food.neuterStatus = c.neuterStatus
  food.isTherapeutic = c.isTherapeutic
  food.therapeuticIndications = c.therapeuticIndications
  const after = JSON.stringify({
    lifeStage: food.lifeStage,
    neuterStatus: food.neuterStatus,
    isTherapeutic: food.isTherapeutic,
    therapeuticIndications: food.therapeuticIndications,
  })
  if (before !== after) changed++
}

console.log(`Classificados ${changed} alimentos comerciais.`)

if (write) {
  fs.writeFileSync(datasetPath, `${JSON.stringify(dataset, null, 2)}\n`, 'utf8')
  console.log(`Gravado em ${datasetPath}`)
} else {
  console.log('Dry-run. Use --write para persistir.')
}
