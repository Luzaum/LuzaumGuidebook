// Script de importação da marca QUATREE para o banco de alimentos do NutriçãoVET
// Fonte: site oficial Quatree / pesquisa consolidada abril 2026

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '../modules/energia-vet/data/genutri-dataset.json')

const db = JSON.parse(readFileSync(DB_PATH, 'utf8'))

// -------------------------------------------------------------------
// Helper: monta objeto nutrientes com todos os campos null por padrão
// -------------------------------------------------------------------
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
  'Fonte: site oficial Quatree / pesquisa consolidada abril 2026',
  'Campos derivados: Matéria Seca (100-Umidade), ENN por diferença, Energia MS derivada',
]

// -------------------------------------------------------------------
// Fábrica de food entry
// -------------------------------------------------------------------
function food(id, name, speciesScope, mnRow, asFed, dryMatter, extraNotes = []) {
  return {
    id,
    slug: id,
    name,
    category: 'Ração',
    categoryNormalized: 'Ração',
    sourceSheet: 'Alimentos MN',
    sourceReference: {
      workbook: 'Quatree — pesquisa consolidada abril 2026',
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

// -------------------------------------------------------------------
// 19 produtos para CÃES
// -------------------------------------------------------------------
const dogFoods = [
  food(
    'quatree-supreme-caes-adultos-rmg',
    'Quatree Supreme Cães Adultos RMG (Frango + BD)',
    'dog', 131,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 420, crudeProteinPct: 26, etherExtractPct: 16, ashPct: 7, crudeFiberPct: 3, nitrogenFreeExtractPct: 38, calciumPct: 0.9, phosphorusPct: 0.7 },
    { energyKcalPer100g: 466.67, crudeProteinPct: 28.89, etherExtractPct: 17.78, ashPct: 7.78, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 42.22, calciumPct: 1.0, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-supreme-caes-adultos-rp',
    'Quatree Supreme Cães Adultos RP (Frango + BD)',
    'dog', 132,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 432, crudeProteinPct: 28, etherExtractPct: 18, ashPct: 7, crudeFiberPct: 3, nitrogenFreeExtractPct: 34, calciumPct: 0.8, phosphorusPct: 0.7 },
    { energyKcalPer100g: 480, crudeProteinPct: 31.11, etherExtractPct: 20, ashPct: 7.78, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 37.78, calciumPct: 0.89, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-supreme-caes-dermasense-rmg',
    'Quatree Supreme Cães Dermasense RMG (Cordeiro+Salmão)',
    'dog', 133,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 393, crudeProteinPct: 24, etherExtractPct: 15, ashPct: 7, crudeFiberPct: 3, nitrogenFreeExtractPct: 41, calciumPct: 0.9, phosphorusPct: 0.7 },
    { energyKcalPer100g: 436.67, crudeProteinPct: 26.67, etherExtractPct: 16.67, ashPct: 7.78, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 45.56, calciumPct: 1.0, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-supreme-caes-dermasense-rp',
    'Quatree Supreme Cães Dermasense RP (Cordeiro+Salmão)',
    'dog', 134,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 393, crudeProteinPct: 24, etherExtractPct: 15, ashPct: 7, crudeFiberPct: 3, nitrogenFreeExtractPct: 41, calciumPct: 0.9, phosphorusPct: 0.7 },
    { energyKcalPer100g: 436.67, crudeProteinPct: 26.67, etherExtractPct: 16.67, ashPct: 7.78, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 45.56, calciumPct: 1.0, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-supreme-caes-filhotes-rmg',
    'Quatree Supreme Cães Filhotes RMG (Frango + BD)',
    'dog', 135,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 427, crudeProteinPct: 30, etherExtractPct: 17, ashPct: 7, crudeFiberPct: 3, nitrogenFreeExtractPct: 33, calciumPct: 0.9, phosphorusPct: 0.8 },
    { energyKcalPer100g: 474.44, crudeProteinPct: 33.33, etherExtractPct: 18.89, ashPct: 7.78, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 36.67, calciumPct: 1.0, phosphorusPct: 0.89 },
  ),
  food(
    'quatree-supreme-caes-filhotes-rp',
    'Quatree Supreme Cães Filhotes RP (Frango + BD)',
    'dog', 136,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 438, crudeProteinPct: 30, etherExtractPct: 19, ashPct: 7, crudeFiberPct: 3, nitrogenFreeExtractPct: 31, calciumPct: 0.9, phosphorusPct: 0.8 },
    { energyKcalPer100g: 486.67, crudeProteinPct: 33.33, etherExtractPct: 21.11, ashPct: 7.78, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 34.44, calciumPct: 1.0, phosphorusPct: 0.89 },
  ),
  food(
    'quatree-supreme-caes-light-castrados-rmg',
    'Quatree Supreme Cães Light/Castrados RMG (Frango+Salmão)',
    'dog', 137,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 354.5, crudeProteinPct: 28, etherExtractPct: 8, ashPct: 7, crudeFiberPct: 4.5, nitrogenFreeExtractPct: 42.5, calciumPct: 0.9, phosphorusPct: 0.7 },
    { energyKcalPer100g: 393.89, crudeProteinPct: 31.11, etherExtractPct: 8.89, ashPct: 7.78, crudeFiberPct: 5.0, nitrogenFreeExtractPct: 47.22, calciumPct: 1.0, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-supreme-caes-light-castrados-rp',
    'Quatree Supreme Cães Light/Castrados RP (Frango+Salmão)',
    'dog', 138,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 354.5, crudeProteinPct: 30, etherExtractPct: 8, ashPct: 7, crudeFiberPct: 4.5, nitrogenFreeExtractPct: 40.5, calciumPct: 0.9, phosphorusPct: 0.7 },
    { energyKcalPer100g: 393.89, crudeProteinPct: 33.33, etherExtractPct: 8.89, ashPct: 7.78, crudeFiberPct: 5.0, nitrogenFreeExtractPct: 45.0, calciumPct: 1.0, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-supreme-caes-senior7-rmg',
    'Quatree Supreme Cães Sênior+7 RMG (Cordeiro+Frango)',
    'dog', 139,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 404, crudeProteinPct: 26, etherExtractPct: 12, ashPct: 6, crudeFiberPct: 4, nitrogenFreeExtractPct: 42, calciumPct: 0.8, phosphorusPct: 0.5 },
    { energyKcalPer100g: 448.89, crudeProteinPct: 28.89, etherExtractPct: 13.33, ashPct: 6.67, crudeFiberPct: 4.44, nitrogenFreeExtractPct: 46.67, calciumPct: 0.89, phosphorusPct: 0.56 },
  ),
  food(
    'quatree-supreme-caes-senior7-rp',
    'Quatree Supreme Cães Sênior+7 RP (Salmão+Frango)',
    'dog', 140,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 409, crudeProteinPct: 27, etherExtractPct: 13, ashPct: 6, crudeFiberPct: 3, nitrogenFreeExtractPct: 41, calciumPct: 0.7, phosphorusPct: 0.5 },
    { energyKcalPer100g: 454.44, crudeProteinPct: 30.0, etherExtractPct: 14.44, ashPct: 6.67, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 45.56, calciumPct: 0.78, phosphorusPct: 0.56 },
  ),
  food(
    'quatree-life-caes-adultos-rmg',
    'Quatree Life Cães Adultos RMG (Frango+Arroz)',
    'dog', 141,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 395, crudeProteinPct: 24, etherExtractPct: 14, ashPct: 6.5, crudeFiberPct: 3, nitrogenFreeExtractPct: 42.5, calciumPct: 0.8, phosphorusPct: 0.7 },
    { energyKcalPer100g: 438.89, crudeProteinPct: 26.67, etherExtractPct: 15.56, ashPct: 7.22, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 47.22, calciumPct: 0.89, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-life-caes-adultos-rp',
    'Quatree Life Cães Adultos RP (Frango+Arroz)',
    'dog', 142,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 395, crudeProteinPct: 24, etherExtractPct: 14, ashPct: 6.5, crudeFiberPct: 3, nitrogenFreeExtractPct: 42.5, calciumPct: 0.8, phosphorusPct: 0.7 },
    { energyKcalPer100g: 438.89, crudeProteinPct: 26.67, etherExtractPct: 15.56, ashPct: 7.22, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 47.22, calciumPct: 0.89, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-life-caes-filhotes-rmg',
    'Quatree Life Cães Filhotes RMG (Frango+Arroz)',
    'dog', 143,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 381, crudeProteinPct: 27, etherExtractPct: 12, ashPct: 6, crudeFiberPct: 3, nitrogenFreeExtractPct: 42, calciumPct: 0.8, phosphorusPct: 0.8 },
    { energyKcalPer100g: 423.33, crudeProteinPct: 30.0, etherExtractPct: 13.33, ashPct: 6.67, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 46.67, calciumPct: 0.89, phosphorusPct: 0.89 },
  ),
  food(
    'quatree-life-caes-filhotes-rp',
    'Quatree Life Cães Filhotes RP (Frango+Arroz)',
    'dog', 144,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 381, crudeProteinPct: 27, etherExtractPct: 12, ashPct: 6, crudeFiberPct: 3, nitrogenFreeExtractPct: 42, calciumPct: 0.8, phosphorusPct: 0.8 },
    { energyKcalPer100g: 423.33, crudeProteinPct: 30.0, etherExtractPct: 13.33, ashPct: 6.67, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 46.67, calciumPct: 0.89, phosphorusPct: 0.89 },
  ),
  food(
    'quatree-select-caes-adultos-rp',
    'Quatree Select Cães Adultos RP',
    'dog', 145,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 380, crudeProteinPct: 23, etherExtractPct: 12, ashPct: 8, crudeFiberPct: 3, nitrogenFreeExtractPct: 44, calciumPct: 1.0, phosphorusPct: 0.7 },
    { energyKcalPer100g: 422.22, crudeProteinPct: 25.56, etherExtractPct: 13.33, ashPct: 8.89, crudeFiberPct: 3.33, nitrogenFreeExtractPct: 48.89, calciumPct: 1.11, phosphorusPct: 0.78 },
  ),
  food(
    'quatree-select-caes-senior7-rmg',
    'Quatree Select Cães Sênior+7 RMG',
    'dog', 146,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 363, crudeProteinPct: 25, etherExtractPct: 10, ashPct: 8, crudeFiberPct: 4, nitrogenFreeExtractPct: 43, calciumPct: 1.0, phosphorusPct: 0.6 },
    { energyKcalPer100g: 403.33, crudeProteinPct: 27.78, etherExtractPct: 11.11, ashPct: 8.89, crudeFiberPct: 4.44, nitrogenFreeExtractPct: 47.78, calciumPct: 1.11, phosphorusPct: 0.67 },
    ['QUALIDADE DE DADO REDUZIDA: umidade não informada no rótulo indexado — assumida 10% (padrão recorrente em rações secas Quatree) para viabilizar cálculo de MS e ENN.'],
  ),
  food(
    'quatree-select-one-caes-adultos',
    'Quatree Select ONE Cães Adultos Todas Raças',
    'dog', 147,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 363, crudeProteinPct: 22, etherExtractPct: 11, ashPct: 9, crudeFiberPct: 3.5, nitrogenFreeExtractPct: 45.5, calciumPct: 1.0, phosphorusPct: 0.9 },
    { energyKcalPer100g: 398.9, crudeProteinPct: 24.18, etherExtractPct: 12.09, ashPct: 9.89, crudeFiberPct: 3.85, nitrogenFreeExtractPct: 50.0, calciumPct: 1.1, phosphorusPct: 0.99 },
  ),
  food(
    'quatree-gourmet-caes-adultos-rmg',
    'Quatree Gourmet Cães Adultos RMG (Mix carnes)',
    'dog', 148,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 356, crudeProteinPct: 22, etherExtractPct: 11, ashPct: 9, crudeFiberPct: 3.5, nitrogenFreeExtractPct: 44.5, calciumPct: 1.0, phosphorusPct: 0.9 },
    { energyKcalPer100g: 395.56, crudeProteinPct: 24.44, etherExtractPct: 12.22, ashPct: 10.0, crudeFiberPct: 3.89, nitrogenFreeExtractPct: 49.44, calciumPct: 1.11, phosphorusPct: 1.0 },
  ),
  food(
    'quatree-premium-adultos-carne',
    'Quatree Adultos Carne Todas Raças',
    'dog', 149,
    { moisturePct: 10, dryMatterPct: 90, energyKcalPer100g: 331, crudeProteinPct: 22, etherExtractPct: 13, ashPct: 8, crudeFiberPct: 4, nitrogenFreeExtractPct: 43, calciumPct: 0.9, phosphorusPct: 0.6 },
    { energyKcalPer100g: 367.78, crudeProteinPct: 24.44, etherExtractPct: 14.44, ashPct: 8.89, crudeFiberPct: 4.44, nitrogenFreeExtractPct: 47.78, calciumPct: 1.0, phosphorusPct: 0.67 },
  ),
]

// -------------------------------------------------------------------
// 8 produtos para GATOS
// -------------------------------------------------------------------
const catFoods = [
  food(
    'quatree-supreme-gatos-castrado-senior7',
    'Quatree Supreme Gatos Castrado Sênior+7',
    'cat', 150,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 403.5, crudeProteinPct: 36, etherExtractPct: 16, ashPct: 7.5, crudeFiberPct: 4, nitrogenFreeExtractPct: 27.5, calciumPct: 0.7, phosphorusPct: 0.55 },
    { energyKcalPer100g: 443.41, crudeProteinPct: 39.56, etherExtractPct: 17.58, ashPct: 8.24, crudeFiberPct: 4.4, nitrogenFreeExtractPct: 30.22, calciumPct: 0.77, phosphorusPct: 0.60 },
  ),
  food(
    'quatree-supreme-gatos-castrados-frango',
    'Quatree Supreme Gatos Castrados (Frango + BD)',
    'cat', 151,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 382, crudeProteinPct: 40, etherExtractPct: 12, ashPct: 7.5, crudeFiberPct: 4.5, nitrogenFreeExtractPct: 27, calciumPct: 0.7, phosphorusPct: 0.7 },
    { energyKcalPer100g: 419.78, crudeProteinPct: 43.96, etherExtractPct: 13.19, ashPct: 8.24, crudeFiberPct: 4.95, nitrogenFreeExtractPct: 29.67, calciumPct: 0.77, phosphorusPct: 0.77 },
  ),
  food(
    'quatree-supreme-gatos-castrados-salmao',
    'Quatree Supreme Gatos Castrados (Salmão + BD)',
    'cat', 152,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 382, crudeProteinPct: 40, etherExtractPct: 12, ashPct: 7.5, crudeFiberPct: 4.5, nitrogenFreeExtractPct: 27, calciumPct: 0.7, phosphorusPct: 0.7 },
    { energyKcalPer100g: 419.78, crudeProteinPct: 43.96, etherExtractPct: 13.19, ashPct: 8.24, crudeFiberPct: 4.95, nitrogenFreeExtractPct: 29.67, calciumPct: 0.77, phosphorusPct: 0.77 },
  ),
  food(
    'quatree-supreme-gatos-filhotes',
    'Quatree Supreme Gatos Filhotes (Salmão + BD)',
    'cat', 153,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 413, crudeProteinPct: 36, etherExtractPct: 18, ashPct: 8, crudeFiberPct: 3, nitrogenFreeExtractPct: 26, calciumPct: 0.7, phosphorusPct: 0.75 },
    { energyKcalPer100g: 453.85, crudeProteinPct: 39.56, etherExtractPct: 19.78, ashPct: 8.79, crudeFiberPct: 3.3, nitrogenFreeExtractPct: 28.57, calciumPct: 0.77, phosphorusPct: 0.82 },
  ),
  food(
    'quatree-life-gatos-castrados',
    'Quatree Life Gatos Castrados (Salmão+Arroz)',
    'cat', 154,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 377, crudeProteinPct: 36, etherExtractPct: 10, ashPct: 7.5, crudeFiberPct: 4, nitrogenFreeExtractPct: 33.5, calciumPct: 0.8, phosphorusPct: 0.7 },
    { energyKcalPer100g: 414.29, crudeProteinPct: 39.56, etherExtractPct: 10.99, ashPct: 8.24, crudeFiberPct: 4.4, nitrogenFreeExtractPct: 36.81, calciumPct: 0.88, phosphorusPct: 0.77 },
  ),
  food(
    'quatree-life-gatos-filhotes',
    'Quatree Life Gatos Filhotes (Salmão+Arroz)',
    'cat', 155,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 390, crudeProteinPct: 35, etherExtractPct: 14, ashPct: 8, crudeFiberPct: 3, nitrogenFreeExtractPct: 31, calciumPct: 0.95, phosphorusPct: 0.82 },
    { energyKcalPer100g: 428.57, crudeProteinPct: 38.46, etherExtractPct: 15.38, ashPct: 8.79, crudeFiberPct: 3.3, nitrogenFreeExtractPct: 34.07, calciumPct: 1.04, phosphorusPct: 0.90 },
  ),
  food(
    'quatree-gourmet-gatos-castrados-mar',
    'Quatree Gourmet Gatos Castrados (Delícias do mar)',
    'cat', 156,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 370.5, crudeProteinPct: 32, etherExtractPct: 9, ashPct: 8.5, crudeFiberPct: 4.5, nitrogenFreeExtractPct: 37, calciumPct: 0.8, phosphorusPct: 0.8 },
    { energyKcalPer100g: 407.14, crudeProteinPct: 35.16, etherExtractPct: 9.89, ashPct: 9.34, crudeFiberPct: 4.95, nitrogenFreeExtractPct: 40.66, calciumPct: 0.88, phosphorusPct: 0.88 },
  ),
  food(
    'quatree-gourmet-gatos-castrados-carnes',
    'Quatree Gourmet Gatos Castrados (Mix carnes)',
    'cat', 157,
    { moisturePct: 9, dryMatterPct: 91, energyKcalPer100g: 370.5, crudeProteinPct: 32, etherExtractPct: 9, ashPct: 8.5, crudeFiberPct: 4.5, nitrogenFreeExtractPct: 37, calciumPct: 0.8, phosphorusPct: 0.8 },
    { energyKcalPer100g: 407.14, crudeProteinPct: 35.16, etherExtractPct: 9.89, ashPct: 9.34, crudeFiberPct: 4.95, nitrogenFreeExtractPct: 40.66, calciumPct: 0.88, phosphorusPct: 0.88 },
  ),
]

// -------------------------------------------------------------------
// Verifica se já existem entradas Quatree (idempotência)
// -------------------------------------------------------------------
const existing = db.foods.filter(f => f.id.startsWith('quatree-'))
if (existing.length > 0) {
  console.log(`⚠️  Encontradas ${existing.length} entradas Quatree. Removendo antes de reimportar...`)
  db.foods = db.foods.filter(f => !f.id.startsWith('quatree-'))
}

const allNew = [...dogFoods, ...catFoods]
db.foods.push(...allNew)

writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')

console.log(`✅ Importação concluída!`)
console.log(`   Cães: ${dogFoods.length} produtos`)
console.log(`   Gatos: ${catFoods.length} produtos`)
console.log(`   Total adicionado: ${allNew.length} produtos`)
console.log(`   Total no banco: ${db.foods.length} alimentos`)
