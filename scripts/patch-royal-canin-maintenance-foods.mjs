/**
 * Insere rações Royal Canin (manutenção) — cães e gatos — no genutri-dataset.json.
 * Convenções: aditivos por kg → ÷10 para base por 100 g (exceto vitamina C em mg/kg bruto);
 * EM em kcal/kg → ÷10 para kcal/100 g; faixas de Ca → média; P só mínimo → valor único;
 * EM ausente → estimativa 4×PB + 9×EE + 4×ENN (nota no item).
 * Uso: node scripts/patch-royal-canin-maintenance-foods.mjs
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

/** Estimativa Atwater aproximada (kcal/100 g produto). */
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
  workbook: 'Royal Canin — linha manutenção / site BR (dados fornecidos abr 2026)',
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
    omega6Pct: null,
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
    speciesScope: o.species,
    foodType: 'commercial',
    presentation: o.presentation,
    nutrientsAsFed: asFed,
    nutrientsDryMatter: buildDryMatter(asFed),
    missingNutrients: computeMissing(asFed),
    notes,
  }
}

// --- Lotes (11 fórmulas)
const batch = [
  buildFood({
    id: 'racao-royal-canin-maxi-adult',
    name: 'Royal Canin Maxi Adult',
    species: 'dog',
    presentation: 'Ração seca — cães adultos porte grande (26–44 kg), 15 meses a 5 anos',
    moisture: 11,
    pb: 24,
    ee: 15,
    fiber: 2.3,
    ash: 6.8,
    ca: r6((0.726 + 1.694) / 2),
    p: 0.486,
    na: 0.28,
    cl: 0.48,
    k: 0.48,
    mg: 0.06,
    taurinePct: 0.12,
    o3: 0.5,
    epa: 0.14,
    dha: 0.1,
    energyKcalPer100g: null,
    enr: {
      a: 15800,
      d: 1000,
      e: 500,
      c: 200,
      b1: 4.1,
      b2: 7.1,
      b6: 8.1,
      b12: 70,
      pp: 50,
      pant: 25.5,
      folic: 0.8,
      bio: 1.07,
      choline: 2500,
      cu: 10,
      fe: 33,
      mn: 43,
      i: 3.3,
      zn: 128,
      se: 0.05,
    },
    notes: [
      'Contém glucosamina, condroitina e zeolita na composição (conforme lista de ingredientes).',
      'Antioxidante BHA e palatabilizante de fígado de frango.',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-medium-adult',
    name: 'Royal Canin Medium Adult',
    species: 'dog',
    presentation: 'Ração seca — cães adultos porte médio (11–25 kg), 12 meses a 7 anos',
    moisture: 11.5,
    pb: 23,
    ee: 12,
    fiber: 4,
    ash: 8,
    ca: r6((0.84 + 1.56) / 2),
    p: 0.55,
    na: 0.24,
    cl: 0.46,
    k: 0.41,
    mg: 0.06,
    metPct: 0.35,
    energyKcalPer100g: 379.6,
    enr: {
      a: 8460,
      d: 540,
      e: 300,
      c: 72,
      b1: 2.22,
      b2: 8.82,
      b5: 14.52,
      b6: 4.38,
      b12: 40,
      niacin: 27.24,
      bio: 0.58,
      folic: 0.48,
      choline: 540,
      se: 0.06,
      zn: 94,
      cu: 7.2,
      fe: 24,
      mn: 31.2,
      i: 2.4,
    },
    notes: [
      'Fonte cita também 3 588 kcal EM/kg em outro trecho; adotado 3 796 kcal/kg conforme texto “ração fornecida em…”.',
      'Ômega-3/6 não discriminados na análise garantida utilizada.',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-mini-adult',
    name: 'Royal Canin Mini Adult',
    species: 'dog',
    presentation: 'Ração seca — cães adultos porte pequeno (até 10 kg), 10 meses a 8 anos',
    moisture: 11,
    pb: 25,
    ee: 14,
    fiber: 2.3,
    ash: 5.8,
    ca: r6((0.552 + 1.288) / 2),
    p: 0.486,
    na: 0.33,
    cl: 0.45,
    k: 0.55,
    mg: 0.06,
    metPct: 0.74,
    tyrosinePct: 0.81,
    taurinePct: 0.09,
    epa: 0.09,
    dha: 0.06,
    carnitineMgPerKg: 50,
    energyKcalPer100g: 390,
    enr: {
      a: 21100,
      d: 1000,
      e: 500,
      c: 200,
      b1: 4.3,
      b2: 7,
      b6: 23,
      b12: 70,
      pp: 49,
      pant: 33.9,
      folic: 7.4,
      bio: 2.44,
      choline: 2400,
      cu: 10,
      fe: 33,
      mn: 43,
      i: 3.3,
      zn: 129,
      se: 0.08,
    },
    notes: [
      'Tirosina declarada como ≥8,1 g/kg (≈0,81% MN).',
      'Antioxidante BHA; FOS na composição.',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-mini-indoor-adult',
    name: 'Royal Canin Mini Indoor Adult',
    species: 'dog',
    presentation: 'Ração seca — cães pequenos em ambientes internos, 10 meses a 8 anos',
    moisture: 11,
    pb: 19,
    ee: 12,
    fiber: 2.8,
    ash: 6.9,
    ca: r6((0.456 + 1.06) / 2),
    p: 0.37,
    na: 0.48,
    cl: 0.79,
    k: 0.55,
    mg: 0.1,
    tyrosinePct: 1.37,
    metPct: 0.82,
    lysinePct: 0.99,
    argininePct: 1.27,
    taurinePct: 0.09,
    carnitineMgPerKg: 100,
    epa: 0.08,
    dha: 0.07,
    energyKcalPer100g: null,
    enr: {
      a: 25400,
      d: 1200,
      e: 600,
      c: 300,
      b1: 5,
      b2: 6.9,
      b6: 28.3,
      b12: 80,
      pp: 42,
      pant: 40.5,
      folic: 9.2,
      bio: 2.98,
      choline: 2300,
      cu: 12,
      fe: 38,
      mn: 49,
      i: 3.8,
      zn: 148,
      se: 0.06,
    },
    notes: [
      'Formulação para teor calórico “sob medida” para interior; EM não numérica na página (estimativa por macronutrientes).',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-indoor-27',
    name: 'Royal Canin Indoor 27 (gato adulto interior)',
    species: 'cat',
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
    notes: [
      'EM não informada na página; estimativa por macronutrientes.',
      'Antioxidante BHA; palatabilizante de fígado de frango.',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-sensible-33',
    name: 'Royal Canin Sensible 33',
    species: 'cat',
    presentation: 'Ração seca — gatos adultos com sensibilidade digestiva, ≥1 ano',
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
      d: 1000,
      e: 600,
      c: 300,
      b1: 16.9,
      b2: 60.9,
      b5: 56.68,
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
    notes: [
      'Lista completa de ingredientes não transcrita na fonte; proteína de frango e vegetais citados genericamente.',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-feline-light-weight-care',
    name: 'Royal Canin Light Weight Care (gato)',
    species: 'cat',
    presentation: 'Ração seca — gatos adultos de interior; controle de peso e bolas de pelo',
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
    energyKcalPer100g: 374.6,
    enr: {
      a: 14300,
      d: 700,
      e: 500,
      c: 200,
      b1: 13,
      b2: 46.7,
      b5: 43.4,
      b6: 21.4,
      b12: 130,
      niacin: 144.5,
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
    notes: [
      'Página cita também “EM calculada” 2 906 kcal/kg — possível método ou lote distinto; valor principal 3 746 kcal/kg.',
      'Sem corantes artificiais (conforme fabricante).',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-mini-coat-care',
    name: 'Royal Canin Mini Coat Care',
    species: 'dog',
    presentation: 'Ração seca — cães adultos/maduros pequenos (até 10 kg); pelagem, ≥10 meses',
    moisture: 10,
    pb: 27,
    ee: 15,
    fiber: 2.6,
    ash: 7.3,
    ca: r6((0.8 + 1.6) / 2),
    p: 0.6,
    na: 0.52,
    cl: 0.8,
    k: 0.6,
    mg: 0.05,
    tyrosinePct: 0.84,
    metPct: 0.58,
    taurinePct: 0.2,
    epa: 0.15,
    dha: 0.1,
    energyKcalPer100g: 388.4,
    enr: {
      a: 29300,
      d: 800,
      e: 580,
      c: 280,
      b1: 26.9,
      b2: 50.6,
      b5: 145.3,
      b6: 75.4,
      b12: 130,
      niacin: 505,
      folic: 13.6,
      bio: 3.06,
      choline: 2300,
      cu: 13,
      fe: 41,
      mn: 54,
      i: 4.1,
      zn: 161,
      se: 0.09,
    },
    notes: ['MOS (mananoligossacarídeos) e extratos de chá verde/marigold na composição.'],
  }),
  buildFood({
    id: 'racao-royal-canin-mini-ageing-12',
    name: 'Royal Canin Mini Ageing 12+',
    species: 'dog',
    presentation: 'Ração seca — cães maduros porte pequeno (até 10 kg), ≥12 anos',
    moisture: 11,
    pb: 24,
    ee: 12,
    fiber: 3,
    ash: 5.2,
    ca: r6((0.43 + 1.1) / 2),
    p: 0.31,
    na: 0.25,
    cl: 0.37,
    k: 0.48,
    mg: 0.12,
    tyrosinePct: 1.05,
    metPct: 0.72,
    taurinePct: 0.18,
    argininePct: 1.35,
    carnitineMgPerKg: 50,
    epa: 0.16,
    dha: 0.11,
    energyKcalPer100g: null,
    enr: {
      a: 30000,
      d: 800,
      e: 600,
      c: 300,
      b1: 27.5,
      b2: 51.5,
      b6: 77.2,
      b12: 140,
      niacin: 515,
      pant: 148.9,
      folic: 13.9,
      bio: 3.13,
      choline: 2400,
      cu: 11,
      fe: 36,
      mn: 46,
      i: 3.6,
      zn: 139,
      se: 0.07,
    },
    notes: [
      'FOS, MOS e extratos de marigold/chá verde na composição.',
      'EM não explícita na página (estimativa por macronutrientes).',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-bulldog-ingles-adult',
    name: 'Royal Canin Bulldog Inglês Adult',
    species: 'dog',
    presentation: 'Ração seca — Bulldog Inglês adulto/maduro, ≥12 meses',
    moisture: 11,
    pb: 22,
    ee: 12,
    fiber: 3.9,
    ash: 7,
    ca: r6((0.486 + 1.134) / 2),
    p: 0.306,
    na: 0.48,
    cl: 0.728,
    k: 0.48,
    mg: 0.06,
    tyrosinePct: 0.99,
    metPct: 0.567,
    taurinePct: 0.171,
    epa: 0.14,
    dha: 0.1,
    energyKcalPer100g: 363.4,
    enr: {
      a: 29300,
      d: 800,
      e: 580,
      c: 280,
      b1: 26.9,
      b2: 50.6,
      b5: 145.3,
      b6: 75.4,
      b12: 130,
      niacin: 505,
      folic: 13.6,
      bio: 3.06,
      choline: 2300,
      cu: 13,
      fe: 41,
      mn: 54,
      i: 4.1,
      zn: 161,
      se: 0.09,
    },
    notes: [
      'Glicosamina e condroitina na composição; croquetes para braquicefalia.',
      'MOS, extratos de marigold e chá verde.',
    ],
  }),
  buildFood({
    id: 'racao-royal-canin-pug-puppy',
    name: 'Royal Canin Pug Puppy',
    species: 'dog',
    presentation: 'Ração seca — filhotes de Pug, desmame até 10 meses',
    moisture: 11,
    pb: 27,
    ee: 16,
    fiber: 2.6,
    ash: 8.3,
    ca: r6((0.87 + 1.3) / 2),
    p: 0.6,
    na: 0.36,
    cl: 0.536,
    k: 0.52,
    mg: 0.05,
    metPct: 0.819,
    tyrosinePct: 1.035,
    lysinePct: 1.215,
    taurinePct: 0.171,
    carnitineMgPerKg: 50,
    epa: 0.14,
    dha: 0.1,
    energyKcalPer100g: null,
    enr: {
      a: 29500,
      d: 800,
      e: 590,
      c: 380,
      b1: 27.1,
      b2: 51.9,
      b6: 76,
      b12: 130,
      niacin: 518,
      pant: 146.1,
      folic: 13.7,
      bio: 3.08,
      choline: 2000,
      cu: 12,
      fe: 39,
      mn: 50,
      i: 3.9,
      zn: 151,
      se: 0.06,
    },
    notes: [
      'Glicosamina e condroitina na composição; FOS/MOS e extratos.',
      'EM não explicitada na página (estimativa por macronutrientes).',
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
console.log('Inseridas', n, 'fórmulas Royal Canin (manutenção). Total no lote:', batch.length, '—', datasetPath)
