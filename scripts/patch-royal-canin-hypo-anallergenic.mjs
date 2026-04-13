/**
 * Atualiza/inserir Royal Canin VD Hypoallergenic (felino, canino) e Anallergenic (felino)
 * a partir de rótulo BR (dados usuário abr 2026).
 * Uso: node scripts/patch-royal-canin-hypo-anallergenic.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')

function r6(x) {
  if (x == null || typeof x !== 'number' || Number.isNaN(x)) return x
  return Math.round(x * 1e6) / 1e6
}

/** Converte valor em base MN (por 100 g produto) para MS */
function toDry(af, dryMatterPct) {
  if (af == null || typeof af !== 'number') return af
  return r6((af * 100) / dryMatterPct)
}

function buildDryMatter(asFed) {
  const dm = asFed.dryMatterPct
  const out = {}
  for (const [k, v] of Object.entries(asFed)) {
    if (k === 'moisturePct') out[k] = 0
    else if (k === 'dryMatterPct') out[k] = 100
    else if (v == null || typeof v !== 'number') out[k] = v
    else out[k] = toDry(v, dm)
  }
  return out
}

/** Aditivos expressos por kg produto → valor por 100 g (÷10), exceto vitamina C (mg/kg bruto). */
function e(x) {
  return r6(x / 10)
}

const OPTIONAL_MISSING = [
  'chloridePct',
  'epaPct',
  'dhaPct',
  'magnesiumPct',
  'mcfaPct',
  'methionineCystinePct',
  'phenylalaninePct',
  'sodiumPct',
]

function computeMissing(n) {
  const m = OPTIONAL_MISSING.filter((k) => {
    if (k === 'sodiumPct' && n.sodiumPct != null) return false
    return n[k] == null
  })
  if (n.tryptophanPct == null) m.push('tryptophanPct')
  return [...new Set(m)]
}

const SOURCE = {
  workbook: 'Royal Canin Veterinary Diet — rótulo / bula BR (dados fornecidos abr 2026)',
  mnRow: 0,
  msRow: null,
}

// --- Hypoallergenic Feline
const hypoFelAsFed = {
  moisturePct: 7.5,
  dryMatterPct: 92.5,
  energyKcalPer100g: 408.1,
  crudeProteinPct: 24.1,
  etherExtractPct: 18,
  ashPct: 8.8,
  crudeFiberPct: 5.7,
  nitrogenFreeExtractPct: r6(100 - 7.5 - 24.1 - 18 - 5.7 - 8.8),
  calciumPct: 0.735,
  phosphorusPct: 0.625,
  potassiumPct: 0.48,
  sodiumPct: 0.36,
  chloridePct: 0.6,
  magnesiumPct: 0.036,
  manganeseMg: e(33.6),
  copperMg: e(9.6),
  zincMg: e(121.2),
  seleniumMg: e(0.162),
  vitaminAIu: e(19680),
  vitaminDIu: e(480),
  vitaminEIu: e(372),
  thiamineMg: e(17.22),
  riboflavinMg: e(31.26),
  pyridoxineMg: e(48.24),
  taurinePct: 0.156,
  methionineCystinePct: null,
  omega3Pct: 0.8,
  omega6Pct: null,
  mcfaPct: null,
  cholineMg: e(1560),
  ironMg: e(25.8),
  iodineMg: e(2.28),
  niacinMg: e(309.72),
  pantothenicAcidMg: e(92.52),
  biotinMg: e(1.962),
  folicAcidMg: e(8.7),
  cobalaminMcg: e(84),
  vitaminKMg: null,
  lysinePct: null,
  methioninePct: 0.54,
  tryptophanPct: null,
  epaPct: 0.19,
  dhaPct: 0.15,
  epaDhaPct: 0.34,
  carnitineMgPerKg: null,
  vitaminCMgPerKg: 120,
  histidinePct: null,
  tyrosinePct: null,
}

const hypoFel = {
  id: 'racao-royal-canin-hypoallergenic-feline',
  slug: 'racao-royal-canin-hypoallergenic-feline',
  name: 'Ração Royal Canin Hypoallergenic Feline',
  category: 'Ração',
  categoryNormalized: 'Ração',
  sourceSheet: 'Alimentos MN',
  sourceReference: SOURCE,
  speciesScope: 'cat',
  foodType: 'commercial',
  presentation: 'Ração seca — HYPOALLERGENIC FELINE S/O; formatos 400 g, 1,5 kg, 4 kg',
  nutrientsAsFed: hypoFelAsFed,
  nutrientsDryMatter: buildDryMatter(hypoFelAsFed),
  missingNutrients: computeMissing(hypoFelAsFed),
  notes: [
    'Alimento coadjuvante seco para gatos adultos — redução de intolerâncias; proteína hidrolisada de soja (23,5% na composição).',
    'Contraindicado: gestação, lactação e crescimento.',
    'Cálcio e fósforo: valores médios entre mín. e máx. da tabela de garantia.',
    'Ômega-6: não informado no extrato utilizado.',
  ],
}

// --- Anallergenic Feline
const anaFelAsFed = {
  moisturePct: 7.5,
  dryMatterPct: 92.5,
  energyKcalPer100g: 391.6,
  crudeProteinPct: 22.5,
  etherExtractPct: 15,
  ashPct: 9.5,
  crudeFiberPct: 5.7,
  nitrogenFreeExtractPct: r6(100 - 7.5 - 22.5 - 15 - 5.7 - 9.5),
  calciumPct: 0.6,
  phosphorusPct: 0.29,
  potassiumPct: 0.39,
  sodiumPct: 0.66,
  chloridePct: 0.978,
  magnesiumPct: 0.048,
  manganeseMg: e(30.02),
  copperMg: e(9.25),
  zincMg: e(112),
  seleniumMg: e(0.2),
  vitaminAIu: e(15000),
  vitaminDIu: e(480),
  vitaminEIu: e(590),
  thiamineMg: e(29.7),
  riboflavinMg: e(48.5),
  pyridoxineMg: e(75.5),
  taurinePct: 0.17,
  methionineCystinePct: null,
  omega3Pct: null,
  omega6Pct: null,
  mcfaPct: null,
  cholineMg: e(1860),
  ironMg: e(10.01),
  iodineMg: e(2.05),
  niacinMg: e(483),
  pantothenicAcidMg: e(144.9),
  biotinMg: e(2.82),
  folicAcidMg: e(14.7),
  cobalaminMcg: e(140),
  vitaminKMg: null,
  lysinePct: 0.68,
  methioninePct: 0.75,
  tryptophanPct: 0.14,
  epaPct: null,
  dhaPct: null,
  epaDhaPct: null,
  carnitineMgPerKg: null,
  vitaminCMgPerKg: 200,
  histidinePct: 0.08,
  tyrosinePct: null,
}

const anaFel = {
  id: 'racao-royal-canin-anallergenic-feline',
  slug: 'racao-royal-canin-anallergenic-feline',
  name: 'Ração Royal Canin Anallergenic Feline',
  category: 'Ração',
  categoryNormalized: 'Ração',
  sourceSheet: 'Alimentos MN',
  sourceReference: SOURCE,
  speciesScope: 'cat',
  foodType: 'commercial',
  presentation: 'Ração seca — ANALLERGENIC FELINE; formato 2 kg',
  nutrientsAsFed: anaFelAsFed,
  nutrientsDryMatter: buildDryMatter(anaFelAsFed),
  missingNutrients: computeMissing(anaFelAsFed),
  notes: [
    'Alimento coadjuvante seco para gatos adultos — oligopeptídeos / restrição de alérgenos (conforme fabricante).',
    'Contraindicado: fêmeas prenhes ou lactantes; animais em crescimento.',
    'Cálcio: médio entre mín. e máx.; fósforo: apenas mínimo no rótulo — valor adotado = mínimo garantido.',
    'Ômega-3/6 e EPA+DHA: não constavam na tabela de garantia utilizada.',
  ],
}

// --- Hypoallergenic Canine
const hypoCanAsFed = {
  moisturePct: 11.5,
  dryMatterPct: 88.5,
  energyKcalPer100g: 403.8,
  crudeProteinPct: 19,
  etherExtractPct: 17,
  ashPct: 9.2,
  crudeFiberPct: 3.1,
  nitrogenFreeExtractPct: r6(100 - 11.5 - 19 - 17 - 3.1 - 9.2),
  calciumPct: 1.0,
  phosphorusPct: 0.48,
  potassiumPct: 0.36,
  sodiumPct: 0.24,
  chloridePct: 0.44,
  magnesiumPct: 0.05,
  manganeseMg: e(53),
  copperMg: e(15),
  zincMg: e(192),
  seleniumMg: e(0.25),
  vitaminAIu: e(31100),
  vitaminDIu: e(800),
  vitaminEIu: e(590),
  thiamineMg: e(27.3),
  riboflavinMg: e(49.5),
  pyridoxineMg: e(76.3),
  taurinePct: 0.14,
  methionineCystinePct: null,
  omega3Pct: 0.48,
  omega6Pct: null,
  mcfaPct: null,
  cholineMg: e(2500),
  ironMg: e(40),
  iodineMg: e(3.6),
  niacinMg: e(490),
  pantothenicAcidMg: e(146.3),
  biotinMg: e(3.1),
  folicAcidMg: e(13.7),
  cobalaminMcg: e(140),
  vitaminKMg: null,
  lysinePct: null,
  methioninePct: 0.48,
  tryptophanPct: null,
  epaPct: 0.11,
  dhaPct: 0.08,
  epaDhaPct: 0.19,
  carnitineMgPerKg: null,
  vitaminCMgPerKg: 300,
  histidinePct: null,
  tyrosinePct: 0.735,
}

const hypoCan = {
  id: 'royal-canin-hypoallergenic-cao',
  slug: 'royal-canin-hypoallergenic-cao',
  name: 'Royal Canin Hypoallergenic (cão)',
  category: 'Ração',
  categoryNormalized: 'Ração',
  sourceSheet: 'Alimentos MN',
  sourceReference: SOURCE,
  speciesScope: 'dog',
  foodType: 'commercial',
  presentation: 'Ração seca — HYPOALLERGENIC CANINE',
  nutrientsAsFed: hypoCanAsFed,
  nutrientsDryMatter: buildDryMatter(hypoCanAsFed),
  missingNutrients: computeMissing(hypoCanAsFed),
  notes: [
    'Alimento coadjuvante seco para cães adultos — proteína hidrolisada; sem aromas/corantes artificiais; matéria-prima não transgênica (conforme fabricante).',
    'Antioxidante BHA e palatabilizante à base de fígado na composição.',
    'Cálcio: médio entre mín. e máx.; fósforo = mínimo garantido.',
    'Ômega-6: não informado no extrato utilizado.',
  ],
}

function roundDeep(obj) {
  if (obj == null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(roundDeep)
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === 'number' ? r6(v) : roundDeep(v)
  }
  return out
}

const patchList = [hypoFel, anaFel, hypoCan].map(roundDeep)

const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
const byId = new Map(patchList.map((f) => [f.id, f]))

let inserted = 0
let updated = 0

data.foods = data.foods.map((f) => {
  const p = byId.get(f.id)
  if (p) {
    updated++
    return p
  }
  return f
})

for (const p of patchList) {
  if (!data.foods.some((f) => f.id === p.id)) {
    data.foods.push(p)
    inserted++
  }
}

fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2) + '\n')
console.log('Royal Canin VD: atualizados', updated, '— inseridos', inserted, '—', datasetPath)
