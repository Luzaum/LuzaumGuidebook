/**
 * Atualiza/insere linhas renais terapêuticas (Royal Canin, PremieR, Hill's, Farmina)
 * a partir de rótulos / sites oficiais BR (ago 2026).
 * Uso: node scripts/patch-renal-therapeutic-foods.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const datasetPath = path.join(root, 'modules/energia-vet/data/genutri-dataset.json')

const SOURCE = {
  workbook: 'Alimentos renais terapêuticos — rótulo / site oficial BR (ago 2026)',
  mnRow: 0,
  msRow: null,
}

function r6(x) {
  if (x == null || typeof x !== 'number' || Number.isNaN(x)) return x
  return Math.round(x * 1e6) / 1e6
}

function mid(min, max) {
  if (min != null && max != null) return r6((min + max) / 2)
  return min ?? max ?? null
}

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

const nullMicro = {
  manganeseMg: null,
  copperMg: null,
  zincMg: null,
  seleniumMg: null,
  vitaminAIu: null,
  vitaminDIu: null,
  vitaminEIu: null,
  thiamineMg: null,
  riboflavinMg: null,
  pyridoxineMg: null,
  methionineCystinePct: null,
  mcfaPct: null,
  cholineMg: null,
  ironMg: null,
  iodineMg: null,
  niacinMg: null,
  pantothenicAcidMg: null,
  biotinMg: null,
  folicAcidMg: null,
  cobalaminMcg: null,
  vitaminKMg: null,
  carnitineMgPerKg: null,
  vitaminCMgPerKg: null,
  histidinePct: null,
  tyrosinePct: null,
  lysinePct: null,
  methioninePct: null,
  tryptophanPct: null,
}

/** Monta perfil MN a partir de níveis de garantia (% ou frações decimais). */
function fromGa({
  moistureMaxPct,
  proteinMinPct,
  fatMinPct,
  fiberMaxPct,
  ashMaxPct,
  energyKcalKg,
  calciumMinPct,
  calciumMaxPct,
  phosphorusMinPct,
  phosphorusMaxPct,
  sodiumMinPct,
  chlorideMinPct,
  potassiumMinPct,
  magnesiumMinPct,
  taurineMinPct,
  methionineMinPct,
  lysineMinPct,
  tryptophanMinPct,
  arginineMinPct,
  epaMinPct,
  dhaMinPct,
  omega3MinPct,
  omega6MinPct,
}) {
  const moisturePct = moistureMaxPct
  const dryMatterPct = r6(100 - moistureMaxPct)
  const crudeProteinPct = proteinMinPct
  const etherExtractPct = fatMinPct
  const crudeFiberPct = fiberMaxPct
  const ashPct = ashMaxPct
  return {
    moisturePct,
    dryMatterPct,
    energyKcalPer100g: r6(energyKcalKg / 10),
    crudeProteinPct,
    etherExtractPct,
    ashPct,
    crudeFiberPct,
    nitrogenFreeExtractPct: r6(100 - moisturePct - crudeProteinPct - etherExtractPct - crudeFiberPct - ashPct),
    calciumPct: mid(calciumMinPct, calciumMaxPct),
    phosphorusPct: mid(phosphorusMinPct, phosphorusMaxPct),
    potassiumPct: potassiumMinPct ?? null,
    sodiumPct: sodiumMinPct ?? null,
    chloridePct: chlorideMinPct ?? null,
    magnesiumPct: magnesiumMinPct ?? null,
    taurinePct: taurineMinPct ?? null,
    methioninePct: methionineMinPct ?? null,
    lysinePct: lysineMinPct ?? null,
    tryptophanPct: tryptophanMinPct ?? null,
    argininePct: arginineMinPct ?? null,
    epaPct: epaMinPct ?? null,
    dhaPct: dhaMinPct ?? null,
    epaDhaPct: epaMinPct != null && dhaMinPct != null ? r6(epaMinPct + dhaMinPct) : null,
    omega3Pct: omega3MinPct ?? null,
    omega6Pct: omega6MinPct ?? null,
    ...nullMicro,
  }
}

function makeFood({ id, slug, name, speciesScope, presentation, asFed, notes, therapeuticIndications = ['CKD'] }) {
  return {
    id,
    slug: slug ?? id,
    name,
    category: 'Ração',
    categoryNormalized: 'Ração',
    sourceSheet: 'Alimentos MN',
    sourceReference: SOURCE,
    speciesScope,
    foodType: 'commercial',
    presentation,
    nutrientsAsFed: asFed,
    nutrientsDryMatter: buildDryMatter(asFed),
    missingNutrients: computeMissing(asFed),
    notes,
    lifeStage: 'ALL',
    neuterStatus: 'ANY',
    isTherapeutic: true,
    therapeuticIndications,
  }
}

// ── Royal Canin ─────────────────────────────────────────────────────────────

const rcRenalCanine = fromGa({
  moistureMaxPct: 11.5,
  proteinMinPct: 12,
  fatMinPct: 16,
  fiberMaxPct: 4.2,
  ashMaxPct: 6.2,
  energyKcalKg: 3992,
  calciumMinPct: 0.24,
  calciumMaxPct: 0.56,
  phosphorusMinPct: 0.12,
  phosphorusMaxPct: 0.28,
  sodiumMinPct: 0.216,
  chlorideMinPct: 0.54,
  potassiumMinPct: 0.36,
  magnesiumMinPct: 0.072,
  lysineMinPct: 0.455,
  methionineMinPct: 0.385,
  taurineMinPct: 0.14,
  tryptophanMinPct: 0.14,
  epaMinPct: 0.16,
  dhaMinPct: 0.13,
})

const rcRenalSpecialCanine = fromGa({
  moistureMaxPct: 11.5,
  proteinMinPct: 11.5,
  fatMinPct: 14,
  fiberMaxPct: 4.3,
  ashMaxPct: 6.6,
  energyKcalKg: 3875,
  calciumMinPct: 0.336,
  calciumMaxPct: 0.784,
  phosphorusMinPct: 0.168,
  phosphorusMaxPct: 0.392,
  sodiumMinPct: 0.216,
  chlorideMinPct: 0.45,
  potassiumMinPct: 0.36,
  magnesiumMinPct: 0.078,
  methionineMinPct: 0.343,
  lysineMinPct: 0.448,
  taurineMinPct: 0.133,
  tryptophanMinPct: 0.14,
  epaMinPct: 0.16,
  dhaMinPct: 0.13,
})

const rcRenalSmallDog = fromGa({
  moistureMaxPct: 11.5,
  proteinMinPct: 11.5,
  fatMinPct: 16,
  fiberMaxPct: 4.1,
  ashMaxPct: 6.2,
  energyKcalKg: 3537,
  calciumMinPct: 0.24,
  calciumMaxPct: 0.56,
  phosphorusMinPct: 0.12,
  phosphorusMaxPct: 0.28,
  sodiumMinPct: 0.216,
  chlorideMinPct: 0.546,
  potassiumMinPct: 0.36,
  magnesiumMinPct: 0.072,
  lysineMinPct: 0.39,
  methionineMinPct: 0.33,
  taurineMinPct: 0.12,
  tryptophanMinPct: 0.12,
  epaMinPct: 0.16,
  dhaMinPct: 0.13,
})

const rcRenalFeline = fromGa({
  moistureMaxPct: 7.5,
  proteinMinPct: 21,
  fatMinPct: 15,
  fiberMaxPct: 5.6,
  ashMaxPct: 8.3,
  energyKcalKg: 3953,
  calciumMinPct: 0.36,
  calciumMaxPct: 0.84,
  phosphorusMinPct: 0.186,
  phosphorusMaxPct: 0.434,
  sodiumMinPct: 0.24,
  chlorideMinPct: 0.576,
  potassiumMinPct: 0.54,
  magnesiumMinPct: 0.042,
  arginineMinPct: 1.071,
  methionineMinPct: 0.532,
  taurineMinPct: 0.175,
  lysineMinPct: 0.518,
  epaMinPct: 0.14,
  dhaMinPct: 0.11,
})

const rcRenalSpecialFeline = fromGa({
  moistureMaxPct: 7.5,
  proteinMinPct: 24,
  fatMinPct: 15,
  fiberMaxPct: 5.6,
  ashMaxPct: 8.5,
  energyKcalKg: 3964,
  calciumMinPct: 0.378,
  calciumMaxPct: 0.882,
  phosphorusMinPct: 0.27,
  phosphorusMaxPct: 0.63,
  sodiumMinPct: 0.24,
  chlorideMinPct: 0.42,
  potassiumMinPct: 0.54,
  magnesiumMinPct: 0.042,
  methionineMinPct: 0.749,
  taurineMinPct: 0.175,
  lysineMinPct: 0.63,
  epaMinPct: 0.13,
  dhaMinPct: 0.11,
})

// ── PremieR Nutrição Clínica ─────────────────────────────────────────────────

const premierRenalCaes = fromGa({
  moistureMaxPct: 10,
  proteinMinPct: 14.5,
  fatMinPct: 18,
  fiberMaxPct: 3.5,
  ashMaxPct: 5.5,
  energyKcalKg: 4292,
  calciumMinPct: 0.4,
  calciumMaxPct: 0.9,
  phosphorusMinPct: 0.3,
  phosphorusMaxPct: 0.45,
  potassiumMinPct: 0.6,
  methionineMinPct: 0.6,
  taurineMinPct: 0.15,
  tryptophanMinPct: 0.18,
  omega3MinPct: 0.5,
  omega6MinPct: 2,
})

const premierRenalGatos = fromGa({
  moistureMaxPct: 10,
  proteinMinPct: 24,
  fatMinPct: 20,
  fiberMaxPct: 3.5,
  ashMaxPct: 6,
  energyKcalKg: 4497,
  calciumMinPct: 0.4,
  calciumMaxPct: 0.65,
  phosphorusMinPct: 0.3,
  phosphorusMaxPct: 0.45,
  potassiumMinPct: 0.9,
  sodiumMinPct: 0.25,
  methionineMinPct: 0.5,
  lysineMinPct: 1,
  taurineMinPct: 0.13,
  omega3MinPct: 0.8,
  omega6MinPct: 3,
})

// ── Hill's k/d seco ─────────────────────────────────────────────────────────

const hillsKdCanine = fromGa({
  moistureMaxPct: 8,
  proteinMinPct: 13.9,
  fatMinPct: 20.5,
  fiberMaxPct: 1.5,
  ashMaxPct: 4.4,
  energyKcalKg: 4021,
  calciumMinPct: 0.63,
  phosphorusMinPct: 0.27,
  sodiumMinPct: 0.16,
  potassiumMinPct: 0.68,
  magnesiumMinPct: 0.102,
  taurineMinPct: 0.12,
  epaMinPct: 0.315,
  dhaMinPct: 0.229,
  omega3MinPct: 1.11,
  omega6MinPct: 3.65,
})

const hillsKdFeline = fromGa({
  moistureMaxPct: 8,
  proteinMinPct: 28.8,
  fatMinPct: 22.1,
  fiberMaxPct: 1.5,
  ashMaxPct: 5.5,
  energyKcalKg: 4177,
  calciumMinPct: 0.75,
  phosphorusMinPct: 0.6,
  sodiumMinPct: 0.22,
  potassiumMinPct: 0.71,
  magnesiumMinPct: 0.089,
  taurineMinPct: 0.25,
  omega3MinPct: 0.79,
})

// ── Farmina Vet Life renal seco ─────────────────────────────────────────────

const farminaRenalCanine = fromGa({
  moistureMaxPct: 9,
  proteinMinPct: 13.3,
  fatMinPct: 17,
  fiberMaxPct: 1.6,
  ashMaxPct: 4.6,
  energyKcalKg: 4242,
  calciumMinPct: 0.4,
  calciumMaxPct: 0.8,
  phosphorusMinPct: 0.16,
  sodiumMinPct: 0.15,
  potassiumMinPct: 0.5,
  methionineMinPct: 0.3,
  lysineMinPct: 0.46,
  taurineMinPct: 0.1,
  tryptophanMinPct: 0.17,
  epaMinPct: 0.25,
  dhaMinPct: 0.2,
  omega3MinPct: 0.6,
})

const farminaRenalFeline = fromGa({
  moistureMaxPct: 8,
  proteinMinPct: 24.5,
  fatMinPct: 20,
  fiberMaxPct: 1.2,
  ashMaxPct: 5.8,
  energyKcalKg: 4500,
  calciumMinPct: 0.4,
  calciumMaxPct: 1,
  phosphorusMinPct: 0.3,
  sodiumMinPct: 0.2,
  potassiumMinPct: 0.7,
  methionineMinPct: 0.5,
  lysineMinPct: 0.4,
  arginineMinPct: 1,
  taurineMinPct: 0.2,
  epaMinPct: 0.14,
  dhaMinPct: 0.17,
  omega3MinPct: 0.45,
  omega6MinPct: 2.25,
})

const patchList = [
  makeFood({
    id: 'royal-canin-renal-caes',
    name: 'Royal Canin Renal Cães',
    speciesScope: 'dog',
    presentation: 'Ração seca — RENAL CANINE; 2 kg, 7,5 kg, 10,1 kg',
    asFed: rcRenalCanine,
    notes: [
      'DRC cães adultos — baixo fósforo, proteína moderada de alta qualidade.',
      'Contraindicado: gestação, lactação e crescimento.',
      'Dados: royalcanin.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'royal-canin-renal-small-dog',
    name: 'Royal Canin Renal Small Dog',
    speciesScope: 'dog',
    presentation: 'Ração seca — RENAL SMALL DOG; croquete pequeno porte; 7,5 kg',
    asFed: rcRenalSmallDog,
    notes: [
      'DRC cães adultos de pequeno porte.',
      'Contraindicado: gestação, lactação e crescimento.',
      'Dados: royalcanin.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'racao-royal-canin-renal-special-caes',
    name: 'Ração Royal Canin Renal Special Cães',
    speciesScope: 'dog',
    presentation: 'Ração seca — RENAL SPECIAL CANINE; 2 kg, 7,5 kg',
    asFed: rcRenalSpecialCanine,
    notes: [
      'Perfil aromático diferenciado para apetite reduzido; DRC cães adultos.',
      'Contraindicado: gestação, lactação e crescimento.',
      'Dados: royalcanin.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'royal-canin-renal-feline',
    name: 'Royal Canin Renal Feline',
    speciesScope: 'cat',
    presentation: 'Ração seca — RENAL FELINE; 400 g, 1,5 kg, 4 kg, 7,5 kg',
    asFed: rcRenalFeline,
    notes: [
      'DRC gatos adultos; auxilia redução de cálculos de oxalato.',
      'Contraindicado: gestação, lactação e crescimento.',
      'Dados: royalcanin.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'royal-canin-renal-special-feline',
    name: 'Royal Canin Renal Special Feline',
    speciesScope: 'cat',
    presentation: 'Ração seca — RENAL SPECIAL FELINE; 400 g, 1,5 kg, 4 kg',
    asFed: rcRenalSpecialFeline,
    notes: [
      'Palatabilidade reforçada; DRC e redução de oxalato em gatos adultos.',
      'Contraindicado: gestação, lactação e crescimento.',
      'Dados: royalcanin.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'racao-premier-nutricao-clinica-renal',
    name: 'Ração Premier Nutrição Clínica Renal',
    speciesScope: 'dog',
    presentation: 'Ração seca — Renal cães adultos (porte pequeno, médio e grande)',
    asFed: premierRenalCaes,
    notes: [
      'Auxilia controle de hiperfosfatemia e progressão da DRC.',
      'Mesma fórmula para portes pequeno, médio e grande (PremieR BR).',
      'Dados: premierpet.com.br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'premier-nutricao-clinica-renal-caes-pequeno',
    name: 'PremieR Nutrição Clínica Renal — Cães Porte Pequeno',
    speciesScope: 'dog',
    presentation: 'Ração seca — Renal; embalagens 2 kg e 10 kg',
    asFed: premierRenalCaes,
    notes: ['SKU porte pequeno; composição idêntica à linha renal cães PremieR.', 'Dados: premierpet.com.br (ago 2026).'],
  }),
  makeFood({
    id: 'premier-nutricao-clinica-renal-caes-medio-grande',
    name: 'PremieR Nutrição Clínica Renal — Cães Porte Médio e Grande',
    speciesScope: 'dog',
    presentation: 'Ração seca — Renal; embalagens 2 kg e 15 kg',
    asFed: premierRenalCaes,
    notes: ['SKU porte médio/grande; composição idêntica à linha renal cães PremieR.', 'Dados: premierpet.com.br (ago 2026).'],
  }),
  makeFood({
    id: 'racao-premier-nutricao-clinica-renal-gatos',
    name: 'Ração Premier Nutrição Clínica Renal Gatos',
    speciesScope: 'cat',
    presentation: 'Ração seca — Renal gatos adultos; 500 g, 1,5 kg',
    asFed: premierRenalGatos,
    notes: ['DRC gatos adultos; baixo fósforo e EPA+DHA.', 'Dados: premierpet.com.br / revendedores BR (ago 2026).'],
  }),
  makeFood({
    id: 'racao-premierpet-nutricao-clinica-renal-gatos',
    name: 'Ração PremierPet Nutrição Clínica Renal Gatos',
    speciesScope: 'cat',
    presentation: 'Ração seca — Renal gatos adultos; 500 g, 1,5 kg',
    asFed: premierRenalGatos,
    notes: ['Alias legado PremieR renal felino; mesma composição da linha atual.', 'Dados: premierpet.com.br (ago 2026).'],
  }),
  makeFood({
    id: 'racao-vetlife-renal-canine-farmina',
    name: 'Ração VetLife Renal Canine Farmina',
    speciesScope: 'dog',
    presentation: 'Ração seca — Vet Life Natural Canine Renal; 2 kg, 10 kg',
    asFed: farminaRenalCanine,
    notes: [
      'IRC crônica ou aguda; baixo fósforo, sódio e proteína de alta qualidade.',
      'Contraindicado: filhotes, gestação/lactação.',
      'Dados: farmina.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'racao-vetlife-renal-feline-farmina',
    name: 'Ração VetLife Renal Feline Farmina',
    speciesScope: 'cat',
    presentation: 'Ração seca — Vet Life Natural Feline Renal; 400 g, 2 kg, 7,5 kg',
    asFed: farminaRenalFeline,
    notes: [
      'DRC ou ICC; baixo fósforo e proteína de alta qualidade.',
      'Contraindicado: filhotes, gestação/lactação.',
      'Dados: farmina.com/br (ago 2026).',
    ],
  }),
  makeFood({
    id: 'hills-prescription-kd-canine-dry',
    name: "Hill's Prescription Diet k/d Kidney Care — Cães (seco)",
    speciesScope: 'dog',
    presentation: 'Ração seca — k/d Kidney Care; 1,5 kg, 7,98 kg',
    asFed: hillsKdCanine,
    notes: [
      'Nutrientes médios (cont. médio Hill\'s); fórmula frango.',
      'Verificar lote BR; valores podem variar levemente por mercado.',
      'Dados: hillspet.co.uk / rótulo internacional (ago 2026).',
    ],
  }),
  makeFood({
    id: 'hills-prescription-kd-feline-dry',
    name: "Hill's Prescription Diet k/d Kidney Care — Gatos (seco)",
    speciesScope: 'cat',
    presentation: 'Ração seca — k/d Kidney Care; 1,81 kg, 3,85 kg',
    asFed: hillsKdFeline,
    notes: [
      'Nutrientes médios (cont. médio Hill\'s); fórmula frango.',
      'Verificar lote BR; valores podem variar levemente por mercado.',
      'Dados: rótulo internacional / entirelypets (ago 2026).',
    ],
  }),
].map((f) => ({
  ...f,
  nutrientsAsFed: Object.fromEntries(Object.entries(f.nutrientsAsFed).map(([k, v]) => [k, typeof v === 'number' ? r6(v) : v])),
  nutrientsDryMatter: buildDryMatter(f.nutrientsAsFed),
}))

const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
const byId = new Map(patchList.map((f) => [f.id, f]))

let inserted = 0
let updated = 0

data.foods = data.foods.map((f) => {
  const p = byId.get(f.id)
  if (p) {
    updated++
    byId.delete(f.id)
    return p
  }
  return f
})

for (const p of patchList) {
  if (byId.has(p.id)) {
    data.foods.push(p)
    inserted++
  }
}

fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2) + '\n')
console.log('Renais terapêuticos: atualizados', updated, '— inseridos', inserted, '—', datasetPath)
