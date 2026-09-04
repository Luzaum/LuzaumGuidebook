// Script de importação da marca QUATREE para o banco de alimentos do NutriçãoVET
// Fonte: quatreepet.com.br / retailers BR — atualizado ago 2026

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '../modules/energia-vet/data/genutri-dataset.json')

const db = JSON.parse(readFileSync(DB_PATH, 'utf8'))

function buildNutrients({
  moisturePct, dryMatterPct, energyKcalPer100g,
  crudeProteinPct, etherExtractPct, ashPct,
  crudeFiberPct, nitrogenFreeExtractPct,
  calciumPct, phosphorusPct,
}) {
  return {
    moisturePct, dryMatterPct, energyKcalPer100g,
    crudeProteinPct, etherExtractPct, ashPct,
    crudeFiberPct, nitrogenFreeExtractPct,
    calciumPct, phosphorusPct,
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
}

const MISSING_NUTRIENTS = [
  'biotinMg', 'chloridePct', 'cholineMg', 'cobalaminMcg', 'copperMg',
  'folicAcidMg', 'iodineMg', 'ironMg', 'magnesiumPct', 'manganeseMg',
  'mcfaPct', 'methionineCystinePct', 'niacinMg', 'omega3Pct', 'omega6Pct',
  'pantothenicAcidMg', 'potassiumPct', 'pyridoxineMg', 'riboflavinMg',
  'seleniumMg', 'sodiumPct', 'taurinePct', 'thiamineMg',
  'vitaminAIu', 'vitaminDIu', 'vitaminEIu', 'vitaminKMg', 'zincMg',
]

const BASE_NOTES = [
  'Fonte: quatreepet.com.br / retailers BR — atualizado ago 2026',
  'Campos derivados: Matéria Seca (100-Umidade), ENN por diferença, Energia MS derivada',
]

function dmFrom(asFed) {
  const factor = 100 / asFed.dryMatterPct
  const keys = [
    'energyKcalPer100g', 'crudeProteinPct', 'etherExtractPct', 'ashPct',
    'crudeFiberPct', 'nitrogenFreeExtractPct', 'calciumPct', 'phosphorusPct',
  ]
  const out = { moisturePct: 0, dryMatterPct: 100 }
  for (const key of keys) {
    out[key] = asFed[key] == null ? null : Math.round(asFed[key] * factor * 100) / 100
  }
  return out
}

function food(id, name, speciesScope, mnRow, asFed, dryMatter, extraNotes = []) {
  return {
    id,
    slug: id,
    name,
    category: 'Ração',
    categoryNormalized: 'Ração',
    sourceSheet: 'Alimentos MN',
    sourceReference: {
      workbook: 'Quatree — pesquisa consolidada ago 2026',
      mnRow,
      msRow: mnRow,
    },
    speciesScope,
    foodType: 'commercial',
    presentation: 'Ração',
    nutrientsAsFed: buildNutrients(asFed),
    nutrientsDryMatter: buildNutrients({ ...dryMatter, moisturePct: 0, dryMatterPct: 100 }),
    missingNutrients: MISSING_NUTRIENTS,
    notes: [...BASE_NOTES, ...extraNotes],
  }
}

function f(id, name, speciesScope, mnRow, asFed, extraNotes = []) {
  const nfe = asFed.nitrogenFreeExtractPct ?? (
    100 - asFed.moisturePct - asFed.crudeProteinPct - asFed.etherExtractPct
    - asFed.ashPct - asFed.crudeFiberPct
  )
  const asFedFull = { ...asFed, nitrogenFreeExtractPct: Math.round(nfe * 100) / 100 }
  return food(id, name, speciesScope, mnRow, asFedFull, dmFrom(asFedFull), extraNotes)
}

const M10 = { moisturePct: 10, dryMatterPct: 90 }
const M9 = { moisturePct: 9, dryMatterPct: 91 }

// ── CÃES ────────────────────────────────────────────────────────────────────
const dogFoods = [
  f('quatree-supreme-caes-adultos-rmg', 'Quatree Supreme Cães Adultos RMG (Frango + BD)', 'dog', 131,
    { ...M10, energyKcalPer100g: 420, crudeProteinPct: 26, etherExtractPct: 16, ashPct: 7, crudeFiberPct: 3, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-supreme-caes-adultos-rp', 'Quatree Supreme Cães Adultos RP (Frango + BD)', 'dog', 132,
    { ...M10, energyKcalPer100g: 432, crudeProteinPct: 28, etherExtractPct: 18, ashPct: 7, crudeFiberPct: 3, calciumPct: 0.8, phosphorusPct: 0.7 }),
  f('quatree-supreme-caes-dermasense-rmg', 'Quatree Supreme Cães Dermato RMG (Cordeiro+Salmão)', 'dog', 133,
    { ...M10, energyKcalPer100g: 393, crudeProteinPct: 24, etherExtractPct: 15, ashPct: 7, crudeFiberPct: 3, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-supreme-caes-dermasense-rp', 'Quatree Supreme Cães Dermato RP (Cordeiro+Salmão)', 'dog', 134,
    { ...M10, energyKcalPer100g: 393, crudeProteinPct: 24, etherExtractPct: 15, ashPct: 7, crudeFiberPct: 3, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-supreme-caes-filhotes-rmg', 'Quatree Supreme Cães Filhotes RMG (Frango + BD)', 'dog', 135,
    { ...M10, energyKcalPer100g: 427, crudeProteinPct: 30, etherExtractPct: 17, ashPct: 7, crudeFiberPct: 3, calciumPct: 0.9, phosphorusPct: 0.8 }),
  f('quatree-supreme-caes-filhotes-rp', 'Quatree Supreme Cães Filhotes RP (Frango + BD)', 'dog', 136,
    { ...M10, energyKcalPer100g: 438, crudeProteinPct: 30, etherExtractPct: 19, ashPct: 7, crudeFiberPct: 3, calciumPct: 0.9, phosphorusPct: 0.8 }),
  f('quatree-supreme-caes-light-castrados-rmg', 'Quatree Supreme Cães Light/Castrados RMG (Frango+Salmão)', 'dog', 137,
    { ...M10, energyKcalPer100g: 354.5, crudeProteinPct: 28, etherExtractPct: 8, ashPct: 7, crudeFiberPct: 4.5, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-supreme-caes-light-castrados-rp', 'Quatree Supreme Cães Light/Castrados RP (Frango+Salmão)', 'dog', 138,
    { ...M10, energyKcalPer100g: 354.5, crudeProteinPct: 30, etherExtractPct: 8, ashPct: 7, crudeFiberPct: 4.5, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-supreme-caes-senior7-rmg', 'Quatree Supreme Cães Sênior+7 RMG (Cordeiro+Frango)', 'dog', 139,
    { ...M10, energyKcalPer100g: 404, crudeProteinPct: 26, etherExtractPct: 12, ashPct: 6, crudeFiberPct: 4, calciumPct: 0.8, phosphorusPct: 0.5 }),
  f('quatree-supreme-caes-senior7-rp', 'Quatree Supreme Cães Sênior+7 RP (Salmão+Frango)', 'dog', 140,
    { ...M10, energyKcalPer100g: 409, crudeProteinPct: 27, etherExtractPct: 13, ashPct: 6, crudeFiberPct: 3, calciumPct: 0.7, phosphorusPct: 0.5 }),
  f('quatree-life-caes-adultos-rmg', 'Quatree Life Cães Adultos RMG (Frango+Arroz)', 'dog', 141,
    { ...M10, energyKcalPer100g: 395, crudeProteinPct: 24, etherExtractPct: 14, ashPct: 6.5, crudeFiberPct: 3, calciumPct: 0.8, phosphorusPct: 0.7 }),
  f('quatree-life-caes-adultos-rp', 'Quatree Life Cães Adultos RP (Frango+Arroz)', 'dog', 142,
    { ...M10, energyKcalPer100g: 395, crudeProteinPct: 24, etherExtractPct: 14, ashPct: 6.5, crudeFiberPct: 3, calciumPct: 0.8, phosphorusPct: 0.7 }),
  f('quatree-life-caes-filhotes-rmg', 'Quatree Life Cães Filhotes RMG (Frango+Arroz)', 'dog', 143,
    { ...M10, energyKcalPer100g: 381, crudeProteinPct: 27, etherExtractPct: 12, ashPct: 6, crudeFiberPct: 3, calciumPct: 0.8, phosphorusPct: 0.8 }),
  f('quatree-life-caes-filhotes-rp', 'Quatree Life Cães Filhotes RP (Frango+Arroz)', 'dog', 144,
    { ...M10, energyKcalPer100g: 381, crudeProteinPct: 27, etherExtractPct: 12, ashPct: 6, crudeFiberPct: 3, calciumPct: 0.8, phosphorusPct: 0.8 }),
  f('quatree-select-caes-adultos-rmg', 'Quatree Select Cães Adultos RMG (Frango+Arroz+BD)', 'dog', 145,
    { ...M10, energyKcalPer100g: 380, crudeProteinPct: 23, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-select-caes-adultos-rmg-carne', 'Quatree Select Cães Adultos RMG (Carne+Arroz+BD)', 'dog', 146,
    { ...M10, energyKcalPer100g: 380, crudeProteinPct: 23, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-select-caes-adultos-rp', 'Quatree Select Cães Adultos RP (Frango+Arroz+BD)', 'dog', 147,
    { ...M10, energyKcalPer100g: 380, crudeProteinPct: 23, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.7 }),
  f('quatree-select-caes-adultos-rp-carne', 'Quatree Select Cães Adultos RP (Carne+Arroz+BD)', 'dog', 148,
    { ...M10, energyKcalPer100g: 380, crudeProteinPct: 23, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-select-caes-filhotes-rmg', 'Quatree Select Cães Filhotes RMG (Frango+Arroz+BD)', 'dog', 149,
    { ...M10, energyKcalPer100g: 383.5, crudeProteinPct: 27, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-select-caes-filhotes-rp', 'Quatree Select Cães Filhotes RP (Frango+Arroz+BD)', 'dog', 150,
    { ...M10, energyKcalPer100g: 383.5, crudeProteinPct: 27, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.8 }),
  f('quatree-select-caes-senior7-rmg', 'Quatree Select Cães Sênior+7 RMG (Frango+Arroz+BD)', 'dog', 151,
    { ...M10, energyKcalPer100g: 363, crudeProteinPct: 25, etherExtractPct: 10, ashPct: 8, crudeFiberPct: 4, calciumPct: 1.0, phosphorusPct: 0.6 }),
  f('quatree-select-caes-senior7-rp', 'Quatree Select Cães Sênior+7 RP (Frango+Arroz+BD)', 'dog', 152,
    { ...M10, energyKcalPer100g: 363, crudeProteinPct: 25, etherExtractPct: 10, ashPct: 8, crudeFiberPct: 4, calciumPct: 1.0, phosphorusPct: 0.6 }),
  f('quatree-select-power-caes-adultos', 'Quatree Select Power Cães Adultos Todas Raças (Frango+Arroz+BD)', 'dog', 153,
    { ...M10, energyKcalPer100g: 389, crudeProteinPct: 25, etherExtractPct: 14, ashPct: 8, crudeFiberPct: 3, calciumPct: 1.0, phosphorusPct: 0.8 }),
  f('quatree-select-one-caes-adultos', 'Quatree Select ONE Cães Adultos Todas Raças', 'dog', 154,
    { ...M9, energyKcalPer100g: 363, crudeProteinPct: 22, etherExtractPct: 11, ashPct: 9, crudeFiberPct: 3.5, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-gourmet-caes-adultos-rmg', 'Quatree Gourmet Cães Adultos RMG (Mix carnes)', 'dog', 155,
    { ...M10, energyKcalPer100g: 356, crudeProteinPct: 22, etherExtractPct: 11, ashPct: 9, crudeFiberPct: 3.5, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-gourmet-caes-adultos-rp', 'Quatree Gourmet Cães Adultos RP (Peixe+Carne+Frango)', 'dog', 156,
    { ...M10, energyKcalPer100g: 357, crudeProteinPct: 23, etherExtractPct: 12, ashPct: 10, crudeFiberPct: 4, calciumPct: 1.0, phosphorusPct: 0.9 }),
  f('quatree-premium-adultos-carne', 'Quatree Premium Adultos Carne Todas Raças', 'dog', 157,
    { ...M10, energyKcalPer100g: 331, crudeProteinPct: 22, etherExtractPct: 13, ashPct: 8, crudeFiberPct: 4, calciumPct: 0.9, phosphorusPct: 0.6 }),
  f('quatree-premium-adultos-frango', 'Quatree Premium Adultos Frango Todas Raças', 'dog', 158,
    { ...M10, energyKcalPer100g: 331, crudeProteinPct: 22, etherExtractPct: 13, ashPct: 8, crudeFiberPct: 4, calciumPct: 0.9, phosphorusPct: 0.6 },
    ['GA alinhada à linha Premium carne — confirmar lote se houver divergência de sabor.']),
]

// ── GATOS ───────────────────────────────────────────────────────────────────
const catFoods = [
  f('quatree-supreme-gatos-adultos-salmao', 'Quatree Supreme Gatos Adultos (Salmão + BD)', 'cat', 159,
    { ...M9, energyKcalPer100g: 396, crudeProteinPct: 34, etherExtractPct: 15, ashPct: 8, crudeFiberPct: 3, calciumPct: 0.7, phosphorusPct: 0.6 }),
  f('quatree-supreme-gatos-castrado-senior7', 'Quatree Supreme Gatos Castrado Sênior+7', 'cat', 160,
    { ...M9, energyKcalPer100g: 403.5, crudeProteinPct: 36, etherExtractPct: 16, ashPct: 7.5, crudeFiberPct: 4, calciumPct: 0.7, phosphorusPct: 0.55 }),
  f('quatree-supreme-gatos-castrados-frango', 'Quatree Supreme Gatos Castrados (Frango + BD)', 'cat', 161,
    { ...M9, energyKcalPer100g: 382, crudeProteinPct: 40, etherExtractPct: 12, ashPct: 7.5, crudeFiberPct: 4.5, calciumPct: 0.7, phosphorusPct: 0.7 }),
  f('quatree-supreme-gatos-castrados-salmao', 'Quatree Supreme Gatos Castrados (Salmão + BD)', 'cat', 162,
    { ...M9, energyKcalPer100g: 382, crudeProteinPct: 40, etherExtractPct: 12, ashPct: 7.5, crudeFiberPct: 4.5, calciumPct: 0.7, phosphorusPct: 0.7 }),
  f('quatree-supreme-gatos-filhotes', 'Quatree Supreme Gatos Filhotes (Salmão + BD)', 'cat', 163,
    { ...M9, energyKcalPer100g: 413, crudeProteinPct: 36, etherExtractPct: 18, ashPct: 8, crudeFiberPct: 3, calciumPct: 0.7, phosphorusPct: 0.75 }),
  f('quatree-life-gatos-adultos', 'Quatree Life Gatos Adultos (Salmão+Arroz)', 'cat', 164,
    { ...M9, energyKcalPer100g: 395.3, crudeProteinPct: 32, etherExtractPct: 13, ashPct: 8, crudeFiberPct: 3, calciumPct: 0.7, phosphorusPct: 0.6 }),
  f('quatree-life-gatos-castrados', 'Quatree Life Gatos Castrados (Salmão+Arroz)', 'cat', 165,
    { ...M9, energyKcalPer100g: 377, crudeProteinPct: 36, etherExtractPct: 10, ashPct: 7.5, crudeFiberPct: 4, calciumPct: 0.8, phosphorusPct: 0.7 }),
  f('quatree-life-gatos-castrados-frango', 'Quatree Life Gatos Castrados (Frango+Arroz)', 'cat', 166,
    { ...M9, energyKcalPer100g: 377, crudeProteinPct: 36, etherExtractPct: 10, ashPct: 7.5, crudeFiberPct: 4, calciumPct: 0.8, phosphorusPct: 0.7 },
    ['GA alinhada à variante salmão — sabores Life castrados compartilham tabela no site oficial.']),
  f('quatree-life-gatos-filhotes', 'Quatree Life Gatos Filhotes (Salmão+Arroz)', 'cat', 167,
    { ...M9, energyKcalPer100g: 390, crudeProteinPct: 35, etherExtractPct: 14, ashPct: 8, crudeFiberPct: 3, calciumPct: 0.95, phosphorusPct: 0.82 }),
  f('quatree-select-gatos-castrados-frango', 'Quatree Select Gatos Castrados (Frango+Arroz)', 'cat', 168,
    { ...M9, energyKcalPer100g: 377, crudeProteinPct: 36, etherExtractPct: 10, ashPct: 7.5, crudeFiberPct: 4, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-select-gatos-castrados-carne', 'Quatree Select Gatos Castrados (Carne)', 'cat', 169,
    { ...M9, energyKcalPer100g: 377, crudeProteinPct: 36, etherExtractPct: 10, ashPct: 7.5, crudeFiberPct: 4, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-select-gatos-castrados-mix-carnes', 'Quatree Select Gatos Castrados (Mix carnes)', 'cat', 170,
    { ...M9, energyKcalPer100g: 377, crudeProteinPct: 36, etherExtractPct: 10, ashPct: 7.5, crudeFiberPct: 4, calciumPct: 0.9, phosphorusPct: 0.7 }),
  f('quatree-gourmet-gatos-castrados-mar', 'Quatree Gourmet Gatos Castrados (Delícias do mar)', 'cat', 171,
    { ...M9, energyKcalPer100g: 370.5, crudeProteinPct: 32, etherExtractPct: 9, ashPct: 8.5, crudeFiberPct: 4.5, calciumPct: 0.8, phosphorusPct: 0.8 }),
  f('quatree-gourmet-gatos-castrados-carnes', 'Quatree Gourmet Gatos Castrados (Mix carnes)', 'cat', 172,
    { ...M9, energyKcalPer100g: 370.5, crudeProteinPct: 32, etherExtractPct: 9, ashPct: 8.5, crudeFiberPct: 4.5, calciumPct: 0.8, phosphorusPct: 0.8 }),
]

const existing = db.foods.filter((entry) => entry.id.startsWith('quatree-'))
if (existing.length > 0) {
  console.log(`⚠️  Encontradas ${existing.length} entradas Quatree. Removendo antes de reimportar...`)
  db.foods = db.foods.filter((entry) => !entry.id.startsWith('quatree-'))
}

const allNew = [...dogFoods, ...catFoods]
db.foods.push(...allNew)

writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')

console.log('✅ Importação concluída!')
console.log(`   Cães: ${dogFoods.length} produtos`)
console.log(`   Gatos: ${catFoods.length} produtos`)
console.log(`   Total adicionado: ${allNew.length} produtos`)
console.log(`   Total no banco: ${db.foods.length} alimentos`)
