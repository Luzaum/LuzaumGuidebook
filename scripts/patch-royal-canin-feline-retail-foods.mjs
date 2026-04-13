/**
 * Royal Canin — rações secas felinas (varejo / site Brasil).
 * Insere novas entradas e substitui por id quando já existir (Sensible 33, Indoor 27).
 * Uso: node scripts/patch-royal-canin-feline-retail-foods.mjs
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
  workbook: 'Royal Canin Brasil — site varejo / felino seco (dados fornecidos abr 2026)',
  mnRow: 0,
  msRow: null,
}

function nf(moisture, pb, ee, fiber, ash) {
  return r6(100 - moisture - pb - ee - fiber - ash)
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

function buildFood(o) {
  const nfe = nf(o.moisture, o.pb, o.ee, o.fiber, o.ash)
  let energy = o.energyKcalPer100g
  const energyNotes = []
  if (energy == null) {
    energy = estKcal100(o.pb, o.ee, nfe)
    energyNotes.push('Energia metabolizável estimada por macronutrientes (Atwater aprox.); fabricante não informou EM na fonte.')
  }
  const en = o.enr

  const asFed = {
    moisturePct: o.moisture,
    dryMatterPct: r6(100 - o.moisture),
    energyKcalPer100g: energy,
    crudeProteinPct: o.pb,
    etherExtractPct: o.ee,
    ashPct: o.ash,
    crudeFiberPct: o.fiber,
    nitrogenFreeExtractPct: nfe,
    calciumPct: o.ca,
    phosphorusPct: o.p,
    potassiumPct: o.k,
    sodiumPct: o.na,
    chloridePct: o.cl,
    magnesiumPct: o.mg,
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
    taurinePct: o.taurinePct ?? null,
    methionineCystinePct: null,
    omega3Pct: o.o3 ?? null,
    omega6Pct: o.o6 ?? null,
    mcfaPct: null,
    cholineMg: en.choline != null ? e(en.choline) : null,
    ironMg: en.fe != null ? e(en.fe) : null,
    iodineMg: en.i != null ? e(en.i) : null,
    niacinMg: en.niacin != null ? e(en.niacin) : en.pp != null ? e(en.pp) : null,
    pantothenicAcidMg: en.pant != null ? e(en.pant) : en.b5 != null ? e(en.b5) : null,
    biotinMg: en.bio != null ? e(en.bio) : null,
    folicAcidMg: en.folic != null ? e(en.folic) : null,
    cobalaminMcg: en.b12 != null ? e(en.b12) : null,
    vitaminKMg: null,
    lysinePct: o.lysinePct ?? null,
    methioninePct: o.metPct ?? null,
    tryptophanPct: null,
    epaPct: o.epa ?? null,
    dhaPct: o.dha ?? null,
    epaDhaPct: o.epa != null && o.dha != null ? r6(o.epa + o.dha) : null,
    carnitineMgPerKg: o.carnitineMgPerKg ?? null,
    vitaminCMgPerKg: en.c ?? null,
    histidinePct: null,
    tyrosinePct: o.tyrosinePct ?? null,
    argininePct: o.argininePct ?? null,
  }

  const notes = [...(o.notes || []), ...energyNotes]

  return {
    id: o.id,
    slug: o.id,
    name: o.name,
    category: 'Ração',
    categoryNormalized: 'Ração',
    sourceSheet: 'Alimentos MN',
    sourceReference: SRC,
    speciesScope: 'cat',
    foodType: 'commercial',
    presentation: o.presentation,
    nutrientsAsFed: asFed,
    nutrientsDryMatter: buildDryMatter(asFed),
    missingNutrients: computeMissing(asFed),
    notes,
  }
}

const batch = [
  buildFood({
    id: 'racao-royal-canin-feline-fit-32',
    name: 'Royal Canin Fit 32 (Fit Feline)',
    presentation: 'Ração seca — gatos adultos atividade moderada, ≥1 ano; bolas de pelo e peso',
    moisture: 8,
    pb: 30,
    ee: 13,
    fiber: 5,
    ash: 7.9,
    ca: r6((0.93 + 1.39) / 2),
    p: 0.88,
    na: 0.42,
    cl: 0.37,
    k: 0.56,
    mg: 0.06,
    taurinePct: 0.18,
    metPct: 0.594,
    energyKcalPer100g: 386.7,
    enr: {
      a: 13500,
      c: 200,
      d: 700,
      e: 510,
      b1: 12.2,
      b2: 44.1,
      b5: 41,
      b6: 20.2,
      b12: 130,
      niacin: 140,
      folic: 3.3,
      bio: 1.29,
      choline: 1750,
      cu: 10,
      fe: 37,
      mn: 48,
      i: 4,
      zn: 145,
      se: 0.09,
    },
    notes: ['MANAN e extrato de marigold na composição.'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-sensible-33',
    name: 'Royal Canin Sensible 33',
    presentation: 'Ração seca — gatos adultos sensibilidade digestiva, ≥1 ano',
    moisture: 8,
    pb: 31,
    ee: 20,
    fiber: 2.5,
    ash: 8,
    ca: r6((0.88 + 1.32) / 2),
    p: 0.8,
    na: 0.4,
    cl: 0.48,
    k: 0.6,
    mg: 0.04,
    taurinePct: 0.171,
    metPct: 0.63,
    energyKcalPer100g: 430.4,
    enr: {
      a: 18600,
      c: 300,
      d: 1000,
      e: 600,
      b1: 16.9,
      b2: 60.9,
      b5: 56.7,
      b6: 27.9,
      b12: 170,
      niacin: 190,
      folic: 4.5,
      bio: 1.79,
      choline: 2130,
      cu: 10,
      fe: 40,
      mn: 51,
      i: 4,
      zn: 154,
      se: 0.1,
    },
    notes: [],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-sterilised-37',
    name: 'Royal Canin Sterilised 37 (castrados 1–7 anos)',
    presentation: 'Ração seca — gatos castrados 1 a 7 anos; L-carnitina',
    moisture: 8,
    pb: 35,
    ee: 10,
    fiber: 7,
    ash: 9.2,
    ca: r6((0.88 + 1.32) / 2),
    p: 0.8,
    na: 0.48,
    cl: 0.59,
    k: 0.64,
    mg: 0.08,
    taurinePct: 0.18,
    metPct: 0.81,
    carnitineMgPerKg: 100,
    energyKcalPer100g: 363.2,
    enr: {
      a: 19200,
      c: 200,
      d: 1000,
      e: 500,
      b1: 17.5,
      b2: 62.9,
      b5: 58.5,
      b6: 28.8,
      b12: 180,
      niacin: 194.7,
      folic: 4.7,
      bio: 1.84,
      choline: 2100,
      cu: 10,
      fe: 35,
      mn: 45,
      i: 3.5,
      zn: 136,
      se: 0.06,
    },
    notes: [],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-sterilised-7plus',
    name: 'Royal Canin Sterilised 7+ (castrados ≥7 anos)',
    presentation: 'Ração seca — gatos castrados maduros ≥7 anos; glucosamina/condroitina',
    moisture: 8,
    pb: 34,
    ee: 10,
    fiber: 5.8,
    ash: 8.5,
    ca: r6((0.72 + 1.08) / 2),
    p: 0.58,
    na: 0.56,
    cl: 0.85,
    k: 0.64,
    mg: 0.06,
    taurinePct: 0.198,
    metPct: 0.765,
    carnitineMgPerKg: 100,
    energyKcalPer100g: 370.3,
    enr: {
      a: 18000,
      c: 180,
      d: 900,
      e: 450,
      b1: 16.3,
      b2: 58.8,
      b6: 27,
      b12: 170,
      niacin: 182.3,
      b5: 54.8,
      folic: 4.4,
      bio: 1.73,
      choline: 2500,
      cu: 10,
      fe: 41,
      mn: 53,
      i: 4.1,
      zn: 158,
      se: 0.07,
    },
    notes: ['Extratos de chá verde e marigold; glucosamina e condroitina na composição.'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-digestive-care',
    name: 'Royal Canin Digestive Care (gato)',
    presentation: 'Ração seca — tendência a sensibilidade digestiva; psyllium, prebióticos',
    moisture: 7.5,
    pb: 36,
    ee: 13,
    fiber: 4.6,
    ash: 10.3,
    ca: r6((0.77 + 1.43) / 2),
    p: 0.665,
    na: 0.36,
    cl: 0.48,
    k: 0.42,
    mg: 0.042,
    taurinePct: 0.096,
    energyKcalPer100g: 336.6,
    enr: {
      a: 8700,
      c: 180,
      d: 480,
      e: 360,
      b1: 7.92,
      b2: 29.94,
      b5: 27.54,
      b6: 13.02,
      b12: 78,
      niacin: 103.8,
      bio: 0.834,
      folic: 2.1,
      choline: 1260,
      cu: 6,
      fe: 19.8,
      mn: 25.2,
      i: 1.98,
      zn: 76.2,
      se: 0.03,
    },
    notes: ['FOS, MOS, zeolita na composição.'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-indoor-27',
    name: 'Royal Canin Indoor 27 / Indoor Adult',
    presentation: 'Ração seca — gatos adultos em ambientes internos, ≥1 ano',
    moisture: 8,
    pb: 25,
    ee: 11,
    fiber: 4.9,
    ash: 8.1,
    ca: r6((0.88 + 1.32) / 2),
    p: 0.67,
    na: 0.4,
    cl: 0.54,
    k: 0.56,
    mg: 0.05,
    taurinePct: 0.153,
    metPct: 0.585,
    carnitineMgPerKg: 50,
    energyKcalPer100g: null,
    enr: {
      a: 14300,
      d: 700,
      e: 500,
      c: 200,
      b1: 13,
      b2: 46.7,
      b6: 21.4,
      b12: 130,
      pp: 144.5,
      pant: 43.4,
      folic: 3.5,
      bio: 1.37,
      choline: 1950,
      cu: 10,
      fe: 42,
      mn: 55,
      i: 4.2,
      zn: 164,
      se: 0.09,
    },
    notes: ['EM não indicada na página do site (abr 2026).'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-indoor-7plus',
    name: 'Royal Canin Indoor 7+',
    presentation: 'Ração seca — gatos maduros ≥7 anos, ambientes internos',
    moisture: 8,
    pb: 25,
    ee: 11,
    fiber: 4.9,
    ash: 7.3,
    ca: r6((0.72 + 1.08) / 2),
    p: 0.6,
    na: 0.32,
    cl: 0.39,
    k: 0.64,
    mg: 0.05,
    taurinePct: 0.171,
    metPct: 0.585,
    carnitineMgPerKg: 50,
    energyKcalPer100g: 377.4,
    enr: {
      a: 24400,
      c: 290,
      d: 900,
      e: 600,
      b1: 16.7,
      b2: 58.9,
      b5: 65.6,
      b6: 46.3,
      b12: 170,
      niacin: 182.1,
      folic: 12.9,
      bio: 3.48,
      choline: 2000,
      cu: 10,
      fe: 41,
      mn: 53,
      i: 4.1,
      zn: 160,
      se: 0.07,
    },
    notes: ['Glucosamina, condroitina e extratos de chá verde/marigold na composição.'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-exigent-savour',
    name: 'Royal Canin Exigent (Savour Exigent)',
    presentation: 'Ração seca — gatos adultos apetite exigente',
    moisture: 8,
    pb: 31,
    ee: 14,
    fiber: 3.8,
    ash: 7.9,
    ca: r6((0.83 + 1.25) / 2),
    p: 0.72,
    na: 0.4,
    cl: 0.41,
    k: 0.56,
    mg: 0.05,
    taurinePct: 0.18,
    metPct: 0.594,
    energyKcalPer100g: null,
    enr: {
      a: 14500,
      d: 800,
      e: 600,
      c: 300,
      b1: 13.5,
      b2: 48.6,
      b6: 22.3,
      b12: 140,
      pp: 150.5,
      pant: 45.2,
      folic: 3.6,
      bio: 1.43,
      choline: 2000,
      cu: 10,
      fe: 39,
      mn: 51,
      i: 3.9,
      zn: 153,
      se: 0.08,
    },
    notes: ['EM não informada na página do site (abr 2026).'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-persian-kitten',
    name: 'Royal Canin Persian Kitten (filhote Persa)',
    presentation: 'Ração seca — filhotes Persa 4–12 meses; croquete braquicefálico',
    moisture: 7,
    pb: 30,
    ee: 20,
    fiber: 3.3,
    ash: 8.7,
    ca: r6((0.71 + 1.66) / 2),
    p: 0.6,
    na: 0.46,
    cl: 0.61,
    k: 0.57,
    mg: 0.12,
    taurinePct: 0.24,
    metPct: 0.79,
    lysinePct: 1.37,
    carnitineMgPerKg: 50,
    o3: 0.55,
    o6: 3.2,
    energyKcalPer100g: 415.5,
    enr: {
      a: 34800,
      d: 900,
      e: 690,
      c: 200,
      b1: 31.9,
      b2: 61.4,
      b6: 89.5,
      b12: 160,
      niacin: 612,
      b5: 172.7,
      folic: 16.1,
      bio: 3.63,
      choline: 3400,
      cu: 12,
      fe: 37,
      mn: 49,
      i: 3.7,
      zn: 146,
      se: 0.06,
    },
    notes: ['FOS, MOS, beta-glucanas; ômega-6/3 conforme tabela de garantia.'],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-appetite-control',
    name: 'Royal Canin Appetite Control (gato)',
    presentation: 'Ração seca — controle de apetite / imploração; combinar úmido+seco (fabricante)',
    moisture: 7.5,
    pb: 32,
    ee: 10,
    fiber: 10,
    ash: 10.5,
    ca: r6((0.8 + 1.5) / 2),
    p: 0.7,
    na: 0.372,
    cl: 0.48,
    k: 0.468,
    mg: 0.072,
    taurinePct: 0.096,
    metPct: 0.504,
    carnitineMgPerKg: 140,
    energyKcalPer100g: 302,
    enr: {
      a: 11760,
      c: 120,
      d: 420,
      e: 300,
      b1: 7.26,
      b2: 28.08,
      b5: 30.96,
      b6: 23.34,
      b12: 72,
      niacin: 103.2,
      bio: 1.806,
      folic: 6.96,
      choline: 1380,
      cu: 6,
      fe: 19.2,
      mn: 24.6,
      i: 1.92,
      zn: 73.8,
      se: 0.03,
    },
    notes: ['Alta fibra (≤10%); zeolita e hidrolisado de fígado na composição.'],
  }),
].map(roundDeep)

const data = JSON.parse(fs.readFileSync(datasetPath, 'utf8'))
const indexById = new Map(data.foods.map((f, i) => [f.id, i]))
let inserted = 0
let replaced = 0
for (const food of batch) {
  const idx = indexById.get(food.id)
  if (idx !== undefined) {
    data.foods[idx] = food
    replaced++
  } else {
    data.foods.push(food)
    indexById.set(food.id, data.foods.length - 1)
    inserted++
  }
}
fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2) + '\n')
console.log('Royal Canin felino varejo: inseridos', inserted, '— substituídos', replaced, '—', datasetPath)
