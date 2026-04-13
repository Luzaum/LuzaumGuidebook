/**
 * Rações VD / nutrição clínica — obesidade, saciedade, diabetes (mercado BR + refs. citadas).
 * Insere entradas; não substitui ids existentes (avisar se duplicar).
 * Uso: node scripts/patch-obesity-satiety-vd-foods.mjs
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

function estKcal100(pb, ee, nfe) {
  return r6(4 * pb + 9 * ee + 4 * nfe)
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

const SRC = {
  workbook: 'Obesidade/Satiety VD — fabricantes, PDFs e revendedores BR (dados compilados abr 2026)',
  mnRow: 0,
  msRow: null,
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

/**
 * Monta FoodItem. `asFedPartial` = campos já calculados em % MN ou mg (pós e() onde couber).
 * Passar `nutrientsAsFed` completo via builder interno mais simples: recebe números crus de análise.
 */
function makeItem({
  id,
  name,
  speciesScope,
  presentation,
  moisturePct,
  crudeProteinPct,
  etherExtractPct,
  crudeFiberPct,
  ashPct,
  nitrogenFreeExtractPct,
  energyKcalPer100g,
  energyNote,
  calciumPct,
  phosphorusPct,
  potassiumPct,
  sodiumPct,
  chloridePct,
  magnesiumPct,
  taurinePct,
  methioninePct,
  lysinePct,
  omega3Pct,
  omega6Pct,
  epaPct,
  dhaPct,
  carnitineMgPerKg,
  enr,
  notes = [],
}) {
  const energyNotes = []
  let energy = energyKcalPer100g
  if (energy == null && nitrogenFreeExtractPct != null) {
    energy = estKcal100(crudeProteinPct, etherExtractPct, nitrogenFreeExtractPct)
    energyNotes.push(energyNote || 'EM estimada por macronutrientes (Atwater aprox.).')
  }
  const en = enr || {}

  const asFed = {
    moisturePct,
    dryMatterPct: r6(100 - moisturePct),
    energyKcalPer100g: energy,
    crudeProteinPct,
    etherExtractPct,
    ashPct,
    crudeFiberPct,
    nitrogenFreeExtractPct,
    calciumPct: calciumPct ?? null,
    phosphorusPct: phosphorusPct ?? null,
    potassiumPct: potassiumPct ?? null,
    sodiumPct: sodiumPct ?? null,
    chloridePct: chloridePct ?? null,
    magnesiumPct: magnesiumPct ?? null,
    manganeseMg: en.mn != null ? e(en.mn) : null,
    copperMg: en.cu != null ? e(en.cu) : null,
    zincMg: en.zn != null ? e(en.zn) : null,
    seleniumMg: en.se != null ? e(en.se) : null,
    vitaminAIu: en.a != null ? e(en.a) : null,
    vitaminDIu: en.d != null ? e(en.d) : null,
    vitaminEIu: en.e != null ? e(en.e) : null,
    thiamineMg: en.b1 != null ? e(en.b1) : null,
    riboflavinMg: en.b2 != null ? e(en.b2) : null,
    pyridoxineMg: en.b6 != null ? e(en.b6) : null,
    taurinePct: taurinePct ?? null,
    methionineCystinePct: null,
    omega3Pct: omega3Pct ?? null,
    omega6Pct: omega6Pct ?? null,
    mcfaPct: null,
    cholineMg: en.choline != null ? e(en.choline) : null,
    ironMg: en.fe != null ? e(en.fe) : null,
    iodineMg: en.i != null ? e(en.i) : null,
    niacinMg: en.niacin != null ? e(en.niacin) : en.pp != null ? e(en.pp) : null,
    pantothenicAcidMg: en.pant != null ? e(en.pant) : en.b5 != null ? e(en.b5) : null,
    biotinMg: en.bio != null ? e(en.bio) : null,
    folicAcidMg: en.folic != null ? e(en.folic) : null,
    cobalaminMcg: en.b12 != null ? e(en.b12) : null,
    vitaminKMg: en.k != null ? e(en.k) : null,
    lysinePct: lysinePct ?? null,
    methioninePct: methioninePct ?? null,
    tryptophanPct: null,
    epaPct: epaPct ?? null,
    dhaPct: dhaPct ?? null,
    epaDhaPct: epaPct != null && dhaPct != null ? r6(epaPct + dhaPct) : null,
    carnitineMgPerKg: carnitineMgPerKg ?? null,
    vitaminCMgPerKg: en.c ?? null,
    histidinePct: null,
    tyrosinePct: null,
    argininePct: null,
  }

  const allNotes = [...notes, ...energyNotes]

  return {
    id,
    slug: id,
    name,
    category: 'Ração',
    categoryNormalized: 'Ração',
    sourceSheet: 'Alimentos MN',
    sourceReference: SRC,
    speciesScope,
    foodType: 'commercial',
    presentation,
    nutrientsAsFed: asFed,
    nutrientsDryMatter: buildDryMatter(asFed),
    missingNutrients: computeMissing(asFed),
    notes: allNotes,
  }
}

const batch = [
  makeItem({
    id: 'racao-royal-canin-vd-satiety-support-canine',
    name: 'Royal Canin Satiety Support Weight Management (cão)',
    speciesScope: 'dog',
    presentation: 'Ração seca VD — obesidade/perda de peso e saciedade (referência US)',
    moisturePct: 10.5,
    crudeProteinPct: 28,
    etherExtractPct: 9.5,
    crudeFiberPct: 14.6,
    ashPct: 8,
    nitrogenFreeExtractPct: r6(100 - 10.5 - 28 - 9.5 - 14.6 - 8),
    energyKcalPer100g: 291.1,
    calciumPct: null,
    phosphorusPct: null,
    enr: {},
    notes: [
      'Gordura 7,5–11,5% e fibra 11,2–18%: valores médios adotados na MN.',
      'Cinzas ~8% estimadas (não explícitas na fonte); ajustar se houver rótulo completo.',
      'Metionina, lisina, L-carnitina e quelatos citados sem doses numéricas na fonte.',
    ],
  }),
  makeItem({
    id: 'racao-farmina-vet-life-obesity-diabetic-canine',
    name: 'Farmina Vet Life Obesity & Diabetic (cão)',
    speciesScope: 'dog',
    presentation: 'Ração seca — obesidade e diabetes mellitus',
    moisturePct: 8,
    crudeProteinPct: 22,
    etherExtractPct: 6.2,
    crudeFiberPct: 7.8,
    ashPct: 7.8,
    nitrogenFreeExtractPct: r6(100 - 8 - 22 - 6.2 - 7.8 - 7.8),
    energyKcalPer100g: 307.7,
    calciumPct: 1,
    phosphorusPct: 0.8,
    sodiumPct: 0.3,
    potassiumPct: 0.7,
    magnesiumPct: 0.13,
    omega3Pct: 0.6,
    omega6Pct: 1.5,
    enr: {},
    notes: [
      'Umidade 8% típica (não explícita na tabela resumida).',
      'Aditivos vitamínicos/minerais citados genericamente na fonte.',
    ],
  }),
  makeItem({
    id: 'racao-equilibrio-vet-obesity-diabetic-canine',
    name: 'Equilíbrio Veterinary Obesity & Diabetic (cão)',
    speciesScope: 'dog',
    presentation: 'Ração seca — obesidade/diabetes; fibras e saciedade',
    moisturePct: 10,
    crudeProteinPct: 30,
    etherExtractPct: 7.5,
    crudeFiberPct: 10,
    ashPct: 7.2,
    nitrogenFreeExtractPct: r6(100 - 10 - 30 - 7.5 - 10 - 7.2),
    energyKcalPer100g: 297.3,
    calciumPct: 1,
    phosphorusPct: 0.7,
    sodiumPct: 0.5,
    taurinePct: 0.15,
    omega3Pct: 0.4,
    omega6Pct: 1.4,
    carnitineMgPerKg: 500,
    enr: {},
    notes: ['Fibra declarada até 10% (mín. 5% no texto); adotado 10%.', 'MOS, betaglucanos e probióticos na composição.'],
  }),
  makeItem({
    id: 'racao-premier-nutricao-clinica-obesidade-caes-pequeno-porte',
    name: 'Premier Nutrição Clínica Obesidade (cães pequeno porte)',
    speciesScope: 'dog',
    presentation: 'Ração seca — perda de peso cães pequenos',
    moisturePct: 10,
    crudeProteinPct: 35.5,
    etherExtractPct: 8,
    crudeFiberPct: 15,
    ashPct: 8,
    nitrogenFreeExtractPct: r6(100 - 10 - 35.5 - 8 - 15 - 8),
    energyKcalPer100g: 297.9,
    calciumPct: r6((0.7 + 1.6) / 2),
    phosphorusPct: r6((0.4 + 0.9) / 2),
    potassiumPct: 0.5,
    omega3Pct: 0.4,
    omega6Pct: 2.5,
    taurinePct: 0.1,
    carnitineMgPerKg: 500,
    enr: {},
    notes: ['Cinzas ~8% estimadas (balanço MN).', 'β-glucano 0,1% MN; MOS na composição.'],
  }),
  makeItem({
    id: 'racao-premier-nutricao-clinica-obesidade-caes-medio-grande',
    name: 'Premier Nutrição Clínica Obesidade (cães médio/grande)',
    speciesScope: 'dog',
    presentation: 'Ração seca — obesidade cães médios e grandes; saciedade',
    moisturePct: 10,
    crudeProteinPct: 35.5,
    etherExtractPct: 8,
    crudeFiberPct: 15,
    ashPct: 6.8,
    nitrogenFreeExtractPct: r6(100 - 10 - 35.5 - 8 - 15 - 6.8),
    energyKcalPer100g: 297.9,
    calciumPct: 1.4,
    phosphorusPct: 0.9,
    omega3Pct: 0.3,
    omega6Pct: 1.2,
    taurinePct: 0.1,
    carnitineMgPerKg: 500,
    enr: {},
    notes: [],
  }),
  makeItem({
    id: 'racao-purina-pro-plan-vd-om-obesity-management-canine',
    name: 'Purina Pro Plan Veterinary Diets OM Obesity Management (cão seco)',
    speciesScope: 'dog',
    presentation: 'Ração seca VD — obesidade; alto teor de fibras',
    moisturePct: 7.5,
    crudeProteinPct: 29,
    etherExtractPct: 6,
    crudeFiberPct: 10,
    ashPct: 6.5,
    nitrogenFreeExtractPct: 41,
    energyKcalPer100g: 296,
    enr: { e: 300 },
    notes: [
      'Carboidratos 41% MN conforme ficha (como ENN).',
      'Fibras solúveis/insolúveis detalhadas no PDF; MN usa fibra bruta total.',
      'Demais vitaminas/minerais não quantificados na fonte resumida.',
    ],
  }),
  makeItem({
    id: 'racao-formula-natural-vet-care-obesidade-caes-medio-grande',
    name: 'Fórmula Natural Vet Care Obesidade (cães médio/grande)',
    speciesScope: 'dog',
    presentation: 'Ração seca — obesidade; articulações (condroitina/glucosamina)',
    moisturePct: 9,
    crudeProteinPct: 30,
    etherExtractPct: 8.5,
    crudeFiberPct: 13,
    ashPct: 9,
    nitrogenFreeExtractPct: r6(100 - 9 - 30 - 8.5 - 13 - 9),
    energyKcalPer100g: 300,
    calciumPct: r6((0.8 + 1.8) / 2),
    phosphorusPct: 0.9,
    potassiumPct: 0.62,
    sodiumPct: 0.2,
    lysinePct: 2,
    methioninePct: 0.75,
    taurinePct: 0.2,
    carnitineMgPerKg: 250,
    enr: {
      a: 21000,
      d: 1000,
      e: 600,
      k: 0.15,
    },
    notes: [
      'EM “≥3 000 kcal/kg”: adotado 3 000 kcal/kg.',
      'MOS/FOS 300 mg/kg cada; β-glucanas 700 mg/kg — ver composição.',
      'Complexo B e colina citados sem doses na fonte; apenas A, D3, E, K3 preenchidos.',
    ],
  }),
  makeItem({
    id: 'racao-royal-canin-vd-satiety-support-feline',
    name: 'Royal Canin Satiety Support Weight Management (gato)',
    speciesScope: 'cat',
    presentation: 'Ração seca VD — obesidade; saciedade (alta fibra)',
    moisturePct: 7.5,
    crudeProteinPct: 32,
    etherExtractPct: 7,
    crudeFiberPct: 14.8,
    ashPct: 10.7,
    nitrogenFreeExtractPct: r6(100 - 7.5 - 32 - 7 - 14.8 - 10.7),
    energyKcalPer100g: 318.7,
    calciumPct: r6((0.9 + 1.4) / 2),
    phosphorusPct: 0.6,
    sodiumPct: 0.46,
    chloridePct: 0.69,
    potassiumPct: 0.78,
    magnesiumPct: 0.1,
    taurinePct: 0.27,
    methioninePct: 1.1,
    enr: {},
    notes: ['L-carnitina e condroitina na composição; doses não numéricas na fonte.'],
  }),
  makeItem({
    id: 'racao-farmina-vet-life-obesity-feline',
    name: 'Farmina Vet Life Obesity (gato)',
    speciesScope: 'cat',
    presentation: 'Ração seca — excesso de peso; baixa densidade energética',
    moisturePct: 8,
    crudeProteinPct: 43,
    etherExtractPct: 9,
    crudeFiberPct: 10,
    ashPct: 7.5,
    nitrogenFreeExtractPct: r6(100 - 8 - 43 - 9 - 10 - 7.5),
    energyKcalPer100g: 336.9,
    calciumPct: 1.1,
    phosphorusPct: 0.95,
    sodiumPct: 0.4,
    potassiumPct: 0.8,
    magnesiumPct: 0.08,
    omega3Pct: 0.3,
    omega6Pct: 1.3,
    epaPct: 0.1,
    dhaPct: 0.15,
    enr: {
      a: 15000,
      d: 1000,
      c: 250,
      niacin: 125,
      b5: 42,
      choline: 2500,
    },
    notes: [
      'Vitamina E no rótulo em mg/kg (550 mg/kg) — não mapeada em UI no catálogo.',
      'B1, B2, B6, B12, folato, biotina e minerais sem valores na fonte resumida.',
      'Lisina, metionina, taurina e L-carnitina citadas sem doses numéricas.',
    ],
  }),
  makeItem({
    id: 'racao-equilibrio-vet-obesity-diabetic-feline',
    name: 'Equilíbrio Veterinary Obesity & Diabetic (gato)',
    speciesScope: 'cat',
    presentation: 'Ração seca — obesidade/diabetes; saciedade',
    moisturePct: 10,
    crudeProteinPct: 40,
    etherExtractPct: 7.5,
    crudeFiberPct: 10,
    ashPct: 8,
    nitrogenFreeExtractPct: r6(100 - 10 - 40 - 7.5 - 10 - 8),
    energyKcalPer100g: 320,
    calciumPct: 1.4,
    phosphorusPct: 0.5,
    potassiumPct: 0.6,
    sodiumPct: 0.45,
    enr: {},
    notes: ['Taurina e L-carnitina citadas sem mg/kg na fonte.'],
  }),
  makeItem({
    id: 'racao-purina-pro-plan-vd-feline-om-st-ox-obesity',
    name: 'Purina Pro Plan VD Feline OM ST/OX Obesity Management (seco)',
    speciesScope: 'cat',
    presentation: 'Ração seca VD — obesidade; apoio urinário (ST/OX)',
    moisturePct: 6.5,
    crudeProteinPct: 48,
    etherExtractPct: 8,
    crudeFiberPct: 7.5,
    ashPct: 8,
    nitrogenFreeExtractPct: 22,
    energyKcalPer100g: 343,
    taurinePct: r6(1707 / 10000),
    omega3Pct: 0.4,
    omega6Pct: 1.5,
    enr: { e: 559 },
    notes: [
      'Carboidratos 22% MN conforme ficha.',
      'Xilitol na composição (lista de ingredientes).',
      'Vitaminas/minerais quelatos e condroitina/glucosamina sem doses na fonte resumida.',
    ],
  }),
].map(roundDeep)

const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
const existing = new Set(data.foods.map((f) => f.id))
let n = 0
for (const food of batch) {
  if (existing.has(food.id)) {
    console.warn('[skip] já existe:', food.id)
    continue
  }
  data.foods.push(food)
  existing.add(food.id)
  n++
}
fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2) + '\n')
console.log('Obesidade/Satiety VD: inseridos', n, 'de', batch.length, '—', datasetPath)
