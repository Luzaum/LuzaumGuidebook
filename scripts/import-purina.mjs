// Script de importação da marca PURINA (primeira leva) para o NutriçãoVET
// Fonte: site oficial Purina Brasil + varejistas (sinalizado por produto)
// Pesquisa consolidada: abril 2026

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '../modules/energia-vet/data/genutri-dataset.json')

const db = JSON.parse(readFileSync(DB_PATH, 'utf8'))

// -------------------------------------------------------------------
// Campos null padrão (nutrientes opcionais não disponíveis)
// -------------------------------------------------------------------
const NULL_OPTIONALS = {
  potassiumPct: null, sodiumPct: null, chloridePct: null, magnesiumPct: null,
  manganeseMg: null, copperMg: null, zincMg: null, seleniumMg: null,
  vitaminAIu: null, vitaminDIu: null, vitaminEIu: null,
  thiamineMg: null, riboflavinMg: null, pyridoxineMg: null,
  taurinePct: null, methionineCystinePct: null,
  omega3Pct: null, omega6Pct: null, mcfaPct: null,
  cholineMg: null, ironMg: null, iodineMg: null, niacinMg: null,
  pantothenicAcidMg: null, biotinMg: null, folicAcidMg: null,
  cobalaminMcg: null, vitaminKMg: null,
}

const MISSING_NUTRIENTS = Object.keys(NULL_OPTIONALS)

function buildNutrients({ moisturePct, dryMatterPct, energyKcalPer100g,
  crudeProteinPct, etherExtractPct, ashPct, crudeFiberPct,
  nitrogenFreeExtractPct, calciumPct, phosphorusPct }) {
  return {
    moisturePct, dryMatterPct,
    energyKcalPer100g: energyKcalPer100g ?? null,
    crudeProteinPct, etherExtractPct, ashPct,
    crudeFiberPct, nitrogenFreeExtractPct, calciumPct, phosphorusPct,
    ...NULL_OPTIONALS,
  }
}

const BASE_NOTES_OFFICIAL = [
  'Fonte: site oficial Purina Brasil / pesquisa consolidada abril 2026',
  'Campos derivados: Matéria Seca (100-Umidade), ENN por diferença',
]

const BASE_NOTES_SECONDARY = [
  'Fonte: rótulo varejista Petlove (fonte secundária) — inconsistência/incompletude detectada em páginas oficiais equivalentes / pesquisa consolidada abril 2026',
  'Campos derivados: Matéria Seca (100-Umidade), ENN por diferença',
]

function food(id, name, speciesScope, presentation, mnRow, asFed, dryMatter, notes = []) {
  const categoryMap = { 'Ração': 'Ração', 'Sachê': 'Sachê' }
  return {
    id,
    slug: id,
    name,
    category: categoryMap[presentation] ?? 'Ração',
    categoryNormalized: categoryMap[presentation] ?? 'Ração',
    sourceSheet: 'Alimentos MN',
    sourceReference: {
      workbook: 'Purina — pesquisa consolidada abril 2026',
      mnRow,
      msRow: mnRow,
    },
    speciesScope,
    foodType: 'commercial',
    presentation,
    nutrientsAsFed: buildNutrients(asFed),
    nutrientsDryMatter: buildNutrients({ ...dryMatter, moisturePct: 0, dryMatterPct: 100 }),
    missingNutrients: MISSING_NUTRIENTS,
    notes,
  }
}

// -------------------------------------------------------------------
// CÃES — 6 produtos
// -------------------------------------------------------------------
const dogFoods = [

  // 1. Dog Chow ExtraLife – Adulto minis e pequenos (seco)
  food(
    'purina-dog-chow-adulto-minis-seco',
    'Purina Dog Chow ExtraLife Adulto Minis e Pequenos (Carne, Frango e Arroz)',
    'dog', 'Ração', 158,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: null,
      crudeProteinPct: 23, etherExtractPct: 12, ashPct: 9,
      crudeFiberPct: 4, nitrogenFreeExtractPct: 40,
      calciumPct: 1.10, phosphorusPct: 0.80 },
    { energyKcalPer100g: null,
      crudeProteinPct: 26.1, etherExtractPct: 13.64, ashPct: 10.2,
      crudeFiberPct: 4.5, nitrogenFreeExtractPct: 45.5,
      calciumPct: 1.25, phosphorusPct: 0.91 },
    [...BASE_NOTES_OFFICIAL,
      'Energia metabolizável não informada no rótulo público consultado (missing_energy: true)',
      'Ca e P expressos como mín; usado o valor mínimo como referência de ponto único'],
  ),

  // 2. Dog Chow ExtraLife – Ração úmida salmão (sachê 100g)
  food(
    'purina-dog-chow-adulto-minis-salmao-sache',
    'Purina Dog Chow ExtraLife Ração Úmida Adulto Minis Salmão (Sachê 100g)',
    'dog', 'Sachê', 159,
    { moisturePct: 81, dryMatterPct: 19, energyKcalPer100g: 88,
      crudeProteinPct: 10.5, etherExtractPct: 2.3, ashPct: 3,
      crudeFiberPct: 1, nitrogenFreeExtractPct: 2.2,
      calciumPct: 0.15, phosphorusPct: 0.13 },
    { energyKcalPer100g: 463.2,
      crudeProteinPct: 55.3, etherExtractPct: 12.11, ashPct: 15.8,
      crudeFiberPct: 5.3, nitrogenFreeExtractPct: 11.6,
      calciumPct: 0.79, phosphorusPct: 0.68 },
    [...BASE_NOTES_OFFICIAL,
      'Alimento úmido — alta umidade (81%) resulta em concentração elevada de nutrientes em MS (comportamento esperado)',
      'Ca e P: usados valores mínimos (mín/máx disponíveis no rótulo)'],
  ),

  // 3. Purina ONE – Cães Adultos Raças Minis e Pequenas
  food(
    'purina-one-caes-adultos-minis-pequenos',
    'Purina ONE Frango e Carne Cães Adultos Raças Minis e Pequenas',
    'dog', 'Ração', 160,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 393,
      crudeProteinPct: 27, etherExtractPct: 17, ashPct: 9,
      crudeFiberPct: 4, nitrogenFreeExtractPct: 31,
      calciumPct: 1.00, phosphorusPct: 0.80 },
    { energyKcalPer100g: 446.6,
      crudeProteinPct: 30.7, etherExtractPct: 19.32, ashPct: 10.2,
      crudeFiberPct: 4.5, nitrogenFreeExtractPct: 35.2,
      calciumPct: 1.14, phosphorusPct: 0.91 },
    [...BASE_NOTES_SECONDARY,
      'Inconsistência detectada em página oficial (umidade 81% em produto seco) — dado de varejista utilizado como referência',
      'Ca e P: usados valores mínimos'],
  ),

  // 4. Purina ONE – Cães Filhotes (todos os portes)
  food(
    'purina-one-caes-filhotes',
    'Purina ONE Frango e Carne Cães Filhotes (Todos os Portes)',
    'dog', 'Ração', 161,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 395,
      crudeProteinPct: 28, etherExtractPct: 16, ashPct: 8.5,
      crudeFiberPct: 3.5, nitrogenFreeExtractPct: 32,
      calciumPct: 1.00, phosphorusPct: 0.90 },
    { energyKcalPer100g: 448.9,
      crudeProteinPct: 31.8, etherExtractPct: 18.18, ashPct: 9.7,
      crudeFiberPct: 4.0, nitrogenFreeExtractPct: 36.4,
      calciumPct: 1.14, phosphorusPct: 1.02 },
    [...BASE_NOTES_SECONDARY,
      'Inconsistência detectada em página oficial — dado de varejista utilizado como referência',
      'Ca e P: usados valores mínimos'],
  ),

  // 5. Purina ONE – Cães Adultos Raças Médias e Grandes
  food(
    'purina-one-caes-adultos-medios-grandes',
    'Purina ONE Frango e Carne Cães Adultos Raças Médias e Grandes',
    'dog', 'Ração', 162,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 370,
      crudeProteinPct: 25, etherExtractPct: 12, ashPct: 8.5,
      crudeFiberPct: 4, nitrogenFreeExtractPct: 38.5,
      calciumPct: 1.00, phosphorusPct: 0.80 },
    { energyKcalPer100g: 420.5,
      crudeProteinPct: 28.4, etherExtractPct: 13.64, ashPct: 9.7,
      crudeFiberPct: 4.5, nitrogenFreeExtractPct: 43.8,
      calciumPct: 1.14, phosphorusPct: 0.91 },
    [...BASE_NOTES_SECONDARY,
      'Inconsistência detectada em página oficial — dado de varejista utilizado como referência',
      'Ca e P: usados valores mínimos'],
  ),

  // 6. Pro Plan Veterinary Diets OM (canino, seco)
  food(
    'purina-proplan-vet-om-canino-seco',
    'Purina Pro Plan Veterinary Diets OM Overweight Management Canino (Seco)',
    'dog', 'Ração', 163,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 299,
      crudeProteinPct: 26, etherExtractPct: 4.0, ashPct: 7.5,
      crudeFiberPct: 13, nitrogenFreeExtractPct: 37.5,
      calciumPct: 0.90, phosphorusPct: 0.70 },
    { energyKcalPer100g: 339.8,
      crudeProteinPct: 29.5, etherExtractPct: 4.55, ashPct: 8.5,
      crudeFiberPct: 14.8, nitrogenFreeExtractPct: 42.61,
      calciumPct: 1.02, phosphorusPct: 0.80 },
    [...BASE_NOTES_OFFICIAL,
      'Alimento terapêutico veterinário — uso sob orientação clínica',
      'Extrato Etéreo em MN é faixa 4,0–8,5% (mín/máx no rótulo); usado valor mínimo (4,0%); ENN calculado com EE mín = 37,5%',
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),
]

// -------------------------------------------------------------------
// GATOS — 10 produtos
// -------------------------------------------------------------------
const catFoods = [

  // 7. Cat Chow Castrados Frango (seco)
  food(
    'purina-cat-chow-castrados-frango-seco',
    'Purina Cat Chow Defense Plus Castrados Frango (Seco)',
    'cat', 'Ração', 164,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 360,
      crudeProteinPct: 36, etherExtractPct: 9, ashPct: 8.5,
      crudeFiberPct: 6, nitrogenFreeExtractPct: 28.5,
      calciumPct: 1.10, phosphorusPct: 1.00 },
    { energyKcalPer100g: 409.1,
      crudeProteinPct: 40.9, etherExtractPct: 10.23, ashPct: 9.7,
      crudeFiberPct: 6.8, nitrogenFreeExtractPct: 32.4,
      calciumPct: 1.25, phosphorusPct: 1.14 },
    [...BASE_NOTES_OFFICIAL,
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),

  // 8. Purina ONE – Gatos Adultos
  food(
    'purina-one-gatos-adultos',
    'Purina ONE Frango e Carne Gatos Adultos',
    'cat', 'Ração', 165,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: null,
      crudeProteinPct: 34, etherExtractPct: 14, ashPct: 8.5,
      crudeFiberPct: 3, nitrogenFreeExtractPct: 28.5,
      calciumPct: 0.90, phosphorusPct: 0.90 },
    { energyKcalPer100g: null,
      crudeProteinPct: 38.6, etherExtractPct: 15.91, ashPct: 9.7,
      crudeFiberPct: 3.4, nitrogenFreeExtractPct: 32.4,
      calciumPct: 1.02, phosphorusPct: 1.02 },
    [...BASE_NOTES_OFFICIAL,
      'Energia metabolizável não informada no rótulo público consultado (missing_energy: true)',
      'Ca e P: usados valores mínimos'],
  ),

  // 9. Purina ONE – Gatos Filhotes
  food(
    'purina-one-gatos-filhotes',
    'Purina ONE Frango e Carne Gatos Filhotes',
    'cat', 'Ração', 166,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 425,
      crudeProteinPct: 39, etherExtractPct: 18, ashPct: 8.5,
      crudeFiberPct: 3, nitrogenFreeExtractPct: 19.5,
      calciumPct: 0.90, phosphorusPct: 0.90 },
    { energyKcalPer100g: 483.0,
      crudeProteinPct: 44.3, etherExtractPct: 20.45, ashPct: 9.7,
      crudeFiberPct: 3.4, nitrogenFreeExtractPct: 22.2,
      calciumPct: 1.02, phosphorusPct: 1.02 },
    [...BASE_NOTES_OFFICIAL,
      'Ca e P: usados valores mínimos'],
  ),

  // 10. Purina ONE – Gatos Castrados (Frango e Salmão)
  food(
    'purina-one-gatos-castrados-salmao',
    'Purina ONE Frango e Salmão Gatos Castrados',
    'cat', 'Ração', 167,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: null,
      crudeProteinPct: 37, etherExtractPct: 12, ashPct: 8.5,
      crudeFiberPct: 5, nitrogenFreeExtractPct: 25.5,
      calciumPct: 0.90, phosphorusPct: 0.90 },
    { energyKcalPer100g: null,
      crudeProteinPct: 42.0, etherExtractPct: 13.64, ashPct: 9.7,
      crudeFiberPct: 5.7, nitrogenFreeExtractPct: 29.0,
      calciumPct: 1.02, phosphorusPct: 1.02 },
    [...BASE_NOTES_OFFICIAL,
      'Energia metabolizável não informada no rótulo público consultado (missing_energy: true)',
      'Ca e P: usados valores mínimos'],
  ),

  // 11. Friskies – Megamix 7 Proteínas (seco)
  food(
    'purina-friskies-megamix-7-proteinas',
    'Purina Friskies Megamix 7 Proteínas Gatos Adultos (Seco)',
    'cat', 'Ração', 168,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 370,
      crudeProteinPct: 30, etherExtractPct: 10, ashPct: 9.5,
      crudeFiberPct: 4, nitrogenFreeExtractPct: 34.5,
      calciumPct: 1.10, phosphorusPct: 0.80 },
    { energyKcalPer100g: 420.5,
      crudeProteinPct: 34.1, etherExtractPct: 11.36, ashPct: 10.8,
      crudeFiberPct: 4.5, nitrogenFreeExtractPct: 39.2,
      calciumPct: 1.25, phosphorusPct: 0.91 },
    [...BASE_NOTES_OFFICIAL,
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),

  // 12. Friskies – Megamix Adultos e Castrados (seco)
  food(
    'purina-friskies-megamix-adultos-castrados',
    'Purina Friskies Megamix Adultos e Castrados Gatos (Seco)',
    'cat', 'Ração', 169,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 360,
      crudeProteinPct: 30, etherExtractPct: 9, ashPct: 9.5,
      crudeFiberPct: 5, nitrogenFreeExtractPct: 34.5,
      calciumPct: 1.00, phosphorusPct: 0.90 },
    { energyKcalPer100g: 409.1,
      crudeProteinPct: 34.1, etherExtractPct: 10.23, ashPct: 10.8,
      crudeFiberPct: 5.7, nitrogenFreeExtractPct: 39.2,
      calciumPct: 1.14, phosphorusPct: 1.02 },
    [...BASE_NOTES_OFFICIAL,
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),

  // 13. Friskies – Mar de Sabores (seco)
  food(
    'purina-friskies-mar-de-sabores',
    'Purina Friskies Mar de Sabores Gatos Adultos (Seco)',
    'cat', 'Ração', 170,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 370,
      crudeProteinPct: 30, etherExtractPct: 10, ashPct: 9.5,
      crudeFiberPct: 4, nitrogenFreeExtractPct: 34.5,
      calciumPct: 1.10, phosphorusPct: 0.80 },
    { energyKcalPer100g: 420.5,
      crudeProteinPct: 34.1, etherExtractPct: 11.36, ashPct: 10.8,
      crudeFiberPct: 4.5, nitrogenFreeExtractPct: 39.2,
      calciumPct: 1.25, phosphorusPct: 0.91 },
    [...BASE_NOTES_OFFICIAL,
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),

  // 14. Fancy Feast – Goulash com Atum (sachê 85g)
  food(
    'purina-fancy-feast-goulash-atum-sache',
    'Purina Fancy Feast Goulash com Atum Gatos Adultos (Sachê 85g)',
    'cat', 'Sachê', 171,
    { moisturePct: 82, dryMatterPct: 18, energyKcalPer100g: 105.9,
      crudeProteinPct: 11, etherExtractPct: 2, ashPct: 3,
      crudeFiberPct: 1.5, nitrogenFreeExtractPct: 0.5,
      calciumPct: 0.10, phosphorusPct: 0.10 },
    { energyKcalPer100g: 588.2,
      crudeProteinPct: 61.1, etherExtractPct: 11.11, ashPct: 16.7,
      crudeFiberPct: 8.3, nitrogenFreeExtractPct: 2.8,
      calciumPct: 0.56, phosphorusPct: 0.56 },
    [...BASE_NOTES_OFFICIAL,
      'Alimento úmido premium — alta umidade (82%) resulta em concentração elevada de nutrientes em MS',
      'Energia derivada: 90 kcal/unidade (sachê 85g) → 105,9 kcal/100g (conversão oficial)',
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),

  // 15. Pro Plan Veterinary Diets Fln UR – trato urinário frango (seco)
  food(
    'purina-proplan-vet-fln-ur-frango-seco',
    'Purina Pro Plan Veterinary Diets Fln UR Trato Urinário Frango Gatos (Seco)',
    'cat', 'Ração', 172,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 375,
      crudeProteinPct: 40, etherExtractPct: 11, ashPct: 9.5,
      crudeFiberPct: 4, nitrogenFreeExtractPct: 23.5,
      calciumPct: 0.90, phosphorusPct: 0.80 },
    { energyKcalPer100g: 426.1,
      crudeProteinPct: 45.5, etherExtractPct: 12.50, ashPct: 10.8,
      crudeFiberPct: 4.5, nitrogenFreeExtractPct: 26.7,
      calciumPct: 1.02, phosphorusPct: 0.91 },
    [...BASE_NOTES_OFFICIAL,
      'Alimento terapêutico veterinário — suporte ao trato urinário inferior (DTUIF), dissolução de urólitos de estruvita',
      'Uso sob orientação clínica exclusiva',
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),

  // 16. Pro Plan Veterinary Diets Fln HA Hydrolyzed frango (seco)
  food(
    'purina-proplan-vet-fln-ha-hydrolyzed-frango-seco',
    'Purina Pro Plan Veterinary Diets Fln HA Hydrolyzed Frango Gatos (Seco)',
    'cat', 'Ração', 173,
    { moisturePct: 12, dryMatterPct: 88, energyKcalPer100g: 375,
      crudeProteinPct: 31, etherExtractPct: 10, ashPct: 8.5,
      crudeFiberPct: 3, nitrogenFreeExtractPct: 35.5,
      calciumPct: 1.00, phosphorusPct: 0.90 },
    { energyKcalPer100g: 426.1,
      crudeProteinPct: 35.2, etherExtractPct: 11.36, ashPct: 9.7,
      crudeFiberPct: 3.4, nitrogenFreeExtractPct: 40.3,
      calciumPct: 1.14, phosphorusPct: 1.02 },
    [...BASE_NOTES_OFFICIAL,
      'Alimento terapêutico veterinário — dieta hidrolisada para alergias e intolerâncias alimentares',
      'Uso sob orientação clínica exclusiva',
      'Ca e P: usados valores mínimos da faixa do rótulo'],
  ),
]

// -------------------------------------------------------------------
// Idempotência: remove entradas purina-* existentes antes de reimportar
// -------------------------------------------------------------------
const existing = db.foods.filter(f => f.id.startsWith('purina-'))
if (existing.length > 0) {
  console.log(`⚠️  Encontradas ${existing.length} entradas Purina. Removendo antes de reimportar...`)
  db.foods = db.foods.filter(f => !f.id.startsWith('purina-'))
}

const allNew = [...dogFoods, ...catFoods]
db.foods.push(...allNew)

writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')

console.log('✅ Importação Purina concluída!')
console.log(`   Cães:  ${dogFoods.length} produtos`)
console.log(`   Gatos: ${catFoods.length} produtos`)
console.log(`   Total adicionado: ${allNew.length} produtos`)
console.log(`   Total no banco: ${db.foods.length} alimentos`)
console.log('')
console.log('Produtos com energia ausente (null):')
allNew.filter(f => f.nutrientsAsFed.energyKcalPer100g === null)
  .forEach(f => console.log('  ⚠️ ', f.id))
console.log('')
console.log('Produtos com fonte secundária:')
allNew.filter(f => f.notes[0].includes('varejista'))
  .forEach(f => console.log('  📦 ', f.id))
