import { DoseUnit, normalizeConcentration, normalizeDoseToMcgKgMin, normalizeDoseToMgKgH } from './conversions'
import { formatNumberPtBR } from '../../../utils/format'

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTE DE SEGURANÇA CLÍNICA: Volume mínimo mensurável com precisão
// ─── Por que isso existe? ──────────────────────────────────────────────────
// Seringas de 1 mL (insulina ou tuberculina) têm precisão de ~0,01 mL,
// mas na prática clínica, volumes < 0,2 mL em seringa de 10–60 mL resultam
// em erros de aspiração de até 40–100% (Stewart JD, Textbook of Small Animal
// Emergency Medicine, Wiley Blackwell, 2019).
// Quando o volume de fármaco a aspirar é menor que este limiar, a engine
// deve mudar de estratégia para pré-diluição obrigatória e entregar a
// receita em duas etapas.
// ─────────────────────────────────────────────────────────────────────────────
export const MIN_DRAW_VOLUME_ML = 0.2 // mL — configurável por serviço

// ─────────────────────────────────────────────────────────────────────────────
// CONCENTRAÇÕES QUE REQUEREM PRÉ-DILUIÇÃO OBRIGATÓRIA ANTES DE SERINGA CRI
// Vasopressina 20 U/mL: Plumb's Veterinary Drug Handbook recomenda diluir
// para 0,1–1 U/mL antes de qualquer infusão (confusão U×mU = erro 1000x fatal).
// ─────────────────────────────────────────────────────────────────────────────
const VASOPRESSIN_MANDATORY_DILUTION_THRESHOLD_U_ML = 10 // U/mL

// Fármacos com fotossensibilidade: indicar proteção da luz na CRI
const LIGHT_SENSITIVE_DRUG_IDS = ['metoclopramida']

export interface DirectInfusionResult {
  rateMlMin: number
  rateMlHr: number
  steps: string[]
}

export interface PreDilutionRecipe {
  step: 'pre_dilution'
  why: string
  drugVolumeFromVialMl: number
  vialConcentration: string
  diluentVolumeMl: number
  preDilutedConcentration: string
  preDilutedVolumeMl: number
  warning: string
}

export interface PreparationResult {
  drugVolumeMl: number
  diluentVolumeMl: number
  finalConcentrationMgMl: number
  totalDrugMg: number
  steps: string[]
  preDilutionRequired?: PreDilutionRecipe
  lightProtectionRequired?: boolean
  error?: {
    level: 'critical' | 'warning'
    title: string
    message: string
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Gerar receita de pré-diluição quando volume < MIN_DRAW_VOLUME_ML
// Estratégia:
//   1. Calcula o fator de diluição necessário para que o volume pós-diluição
//      seja >= MIN_DRAW_VOLUME_ML × fatorSegurança (usamos ×5 = 1 mL mínimo)
//   2. Sugere diluição para 1/10 da concentração original como prática padrão
//   3. Entrega o volume a aspirar DA SOLUÇÃO pré-diluída, não do frasco original
// ─────────────────────────────────────────────────────────────────────────────
function buildPreDilutionRecipe(
  drugVolumeMl: number,
  vialConcentrationMgMl: number,
  totalDrugMg: number,
): PreDilutionRecipe {
  // Queremos que o volume final seja pelo menos 1 mL (5× o limiar mínimo)
  const targetDrawVolumeMl = Math.max(1.0, MIN_DRAW_VOLUME_ML * 5)

  // Fator de diluição necessário
  const dilutionFactor = Math.ceil(targetDrawVolumeMl / drugVolumeMl)
  const clampedFactor = Math.min(dilutionFactor, 100) // máx 1:100

  // Pré-diluição: ex. 1 mL do frasco + (clampedFactor-1) mL de diluente
  const volumeFromVial = 1.0 // aspirar 1 mL do frasco original para facilitar
  const diluentForPreDilution = volumeFromVial * (clampedFactor - 1)
  const preDilutedConcentration = vialConcentrationMgMl / clampedFactor
  const preDilutedVolumeMl = volumeFromVial + diluentForPreDilution

  // Agora, quanto da solução pré-diluída precisamos para totalDrugMg?
  const volumeFromPreDiluted = totalDrugMg / preDilutedConcentration

  return {
    step: 'pre_dilution',
    why: `Volume calculado (${formatNumberPtBR(drugVolumeMl, 3)} mL) é menor que o mínimo mensurável com precisão (${formatNumberPtBR(MIN_DRAW_VOLUME_ML)} mL). Volumes muito pequenos em seringas de grande capacidade podem ter erro real de 40–100% — risco clínico inaceitável.`,
    drugVolumeFromVialMl: volumeFromPreDiluted,
    vialConcentration: `${formatNumberPtBR(vialConcentrationMgMl)} mg/mL (frasco original)`,
    diluentVolumeMl: diluentForPreDilution,
    preDilutedConcentration: `${formatNumberPtBR(preDilutedConcentration, 4)} mg/mL (1:${clampedFactor})`,
    preDilutedVolumeMl,
    warning: `⚠️ PRÉ-DILUIÇÃO OBRIGATÓRIA\n1️⃣ Aspirar 1 mL do frasco (${formatNumberPtBR(vialConcentrationMgMl)} mg/mL)\n2️⃣ Adicionar ${formatNumberPtBR(diluentForPreDilution, 1)} mL de NaCl 0,9% → solução 1:${clampedFactor} = ${formatNumberPtBR(preDilutedConcentration, 4)} mg/mL\n3️⃣ Desta solução, aspirar ${formatNumberPtBR(volumeFromPreDiluted, 2)} mL para a seringa de CRI\n4️⃣ Completar com diluente até o volume final desejado\n📌 Rotular obrigatoriamente com concentração final e data/hora`,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HARD BLOCK: Vasopressina em concentração de ampola
// A ampola comercial é de 20 U/mL (= 20.000 mU/mL). Confusão U↔mU gera
// erro de 1000× — potencialmente letal. Plumb's recomenda diluir para
// 0,1–1 U/mL ANTES de preparar a seringa de CRI.
// ─────────────────────────────────────────────────────────────────────────────
function checkVasopressinConcentration(
  drugId: string | undefined,
  vialConcentrationMgMl: number,
): PreparationResult['error'] | undefined {
  if (drugId !== 'vasopressina') return undefined
  // Para vasopressina, vialConcentrationMgMl é interpretado como U/mL
  if (vialConcentrationMgMl >= VASOPRESSIN_MANDATORY_DILUTION_THRESHOLD_U_ML) {
    return {
      level: 'critical',
      title: '⛔ BLOQUEADO: Concentração de ampola não permitida para CRI direta',
      message:
        '🆘 CRÍTICO — UNIDADES: A dose de vasopressina é em mU/kg/min (MILIUNIDADES). A ampola é 20 U/mL. 1 U = 1.000 mU. Erro de unidade é 1.000× a dose.\n\n' +
        'Pré-diluição OBRIGATÓRIA (Plumb\'s Veterinary Drug Handbook):\n' +
        '• Opção A (0,1 U/mL): 0,5 mL da ampola + 99,5 mL NaCl 0,9% = 100 mL a 0,1 U/mL\n' +
        '• Opção B (0,5 U/mL): 0,5 mL da ampola + 19,5 mL NaCl 0,9% = 20 mL a 0,5 U/mL\n' +
        '• Opção C (1 U/mL): 1 mL da ampola + 19 mL NaCl 0,9% = 20 mL a 1 U/mL\n\n' +
        'Selecione a concentração APÓS pré-diluição e insira-a como concentração do frasco.',
    }
  }
  return undefined
}

export function calculateDirectInfusion(
  dose: number,
  doseUnit: DoseUnit,
  weight: number,
  concentrationMgMl: number,
): DirectInfusionResult {
  const steps: string[] = []

  // Verificar se é unidade (U)
  const isUnit = doseUnit.startsWith('U/')

  if (isUnit) {
    // Cálculo para unidades (U/kg/h ou U/kg/min)
    const dosePerMin = doseUnit.endsWith('/min')
    const dosePerHr = doseUnit.endsWith('/h')

    let doseUPerKgPerH: number
    if (dosePerMin) {
      doseUPerKgPerH = dose * 60 // U/kg/min -> U/kg/h
      steps.push(`Dose normalizada: ${formatNumberPtBR(dose)} ${doseUnit} = ${formatNumberPtBR(doseUPerKgPerH, 4)} U/kg/h`)
    } else {
      doseUPerKgPerH = dose
      steps.push(`Dose: ${formatNumberPtBR(dose)} ${doseUnit}`)
    }

    const totalUPerH = doseUPerKgPerH * weight
    steps.push(`Dose total/h: ${formatNumberPtBR(doseUPerKgPerH, 4)} × ${formatNumberPtBR(weight, 1)} kg = ${formatNumberPtBR(totalUPerH, 4)} U/h`)

    // Concentração em U/mL (assumindo que concentrationMgMl é na verdade U/mL para insulina)
    const concentrationUMl = concentrationMgMl
    steps.push(`Concentração: ${formatNumberPtBR(concentrationUMl)} U/mL`)

    const rateMlHr = totalUPerH / concentrationUMl
    steps.push(`Taxa (mL/h): ${formatNumberPtBR(totalUPerH, 4)} ÷ ${formatNumberPtBR(concentrationUMl)} = ${formatNumberPtBR(rateMlHr, 4)} mL/h`)

    const rateMlMin = rateMlHr / 60
    steps.push(`Taxa (mL/min): ${formatNumberPtBR(rateMlHr, 4)} ÷ 60 = ${formatNumberPtBR(rateMlMin, 4)} mL/min`)

    return { rateMlMin, rateMlHr, steps }
  }

  // Cálculo normal para mg/mcg
  const doseMcgKgMin = normalizeDoseToMcgKgMin(dose, doseUnit)
  steps.push(`Dose normalizada: ${formatNumberPtBR(dose)} ${doseUnit} = ${formatNumberPtBR(doseMcgKgMin, 4)} mcg/kg/min`)

  const totalMcgMin = doseMcgKgMin * weight
  steps.push(`Dose total/min: ${formatNumberPtBR(doseMcgKgMin, 4)} × ${formatNumberPtBR(weight, 1)} kg = ${formatNumberPtBR(totalMcgMin, 2)} mcg/min`)

  const totalMcgHr = totalMcgMin * 60
  steps.push(`Dose total/h: ${formatNumberPtBR(totalMcgMin, 2)} × 60 = ${formatNumberPtBR(totalMcgHr, 2)} mcg/h`)

  const conc = normalizeConcentration(concentrationMgMl)
  steps.push(`Concentração: ${formatNumberPtBR(conc.mgMl)} mg/mL = ${formatNumberPtBR(conc.mcgMl)} mcg/mL`)

  const rateMlMin = totalMcgMin / conc.mcgMl
  steps.push(`Taxa (mL/min): ${formatNumberPtBR(totalMcgMin, 2)} ÷ ${formatNumberPtBR(conc.mcgMl)} = ${formatNumberPtBR(rateMlMin, 4)} mL/min`)

  const rateMlHr = rateMlMin * 60
  steps.push(`Taxa (mL/h): ${formatNumberPtBR(rateMlMin, 4)} × 60 = ${formatNumberPtBR(rateMlHr, 2)} mL/h`)

  return { rateMlMin, rateMlHr, steps }
}

export function calculatePreparation(
  dose: number,
  doseUnit: DoseUnit,
  weight: number,
  pumpRateMlHr: number,
  vehicleVolumeMl: number,
  vialConcentrationMgMl: number,
  // Parâmetros opcionais para checagens clínicas
  options?: {
    drugId?: string
  },
): PreparationResult {
  const steps: string[] = []
  const drugId = options?.drugId

  // ───────────────────────────────────────────────────────────────────────────
  // HARD BLOCK: Vasopressina em concentração de ampola
  // ───────────────────────────────────────────────────────────────────────────
  const vasopressinError = checkVasopressinConcentration(drugId, vialConcentrationMgMl)
  if (vasopressinError) {
    return {
      drugVolumeMl: 0,
      diluentVolumeMl: 0,
      finalConcentrationMgMl: 0,
      totalDrugMg: 0,
      steps,
      error: vasopressinError,
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // ALERTA DE FOTOSSENSIBILIDADE
  // ───────────────────────────────────────────────────────────────────────────
  const lightProtectionRequired = drugId ? LIGHT_SENSITIVE_DRUG_IDS.includes(drugId) : false

  // ───────────────────────────────────────────────────────────────────────────
  // Verificar se é unidade (U) — ex: insulina, vasopressina pós-diluída
  // ───────────────────────────────────────────────────────────────────────────
  const isUnit = doseUnit.startsWith('U/')

  if (isUnit) {
    // Cálculo para unidades (U/kg/h ou U/kg/min)
    const dosePerMin = doseUnit.endsWith('/min')

    let doseUPerKgPerH: number
    if (dosePerMin) {
      doseUPerKgPerH = dose * 60 // U/kg/min -> U/kg/h
      steps.push(`Dose normalizada: ${formatNumberPtBR(dose)} ${doseUnit} = ${formatNumberPtBR(doseUPerKgPerH, 4)} U/kg/h`)
    } else {
      doseUPerKgPerH = dose
      steps.push(`Dose: ${formatNumberPtBR(dose)} ${doseUnit}`)
    }

    const doseUPerHr = doseUPerKgPerH * weight
    steps.push(`Dose por hora: ${formatNumberPtBR(doseUPerKgPerH, 4)} × ${formatNumberPtBR(weight, 1)} kg = ${formatNumberPtBR(doseUPerHr, 4)} U/h`)

    // Concentração necessária em U/mL
    const neededConcentrationUMl = doseUPerHr / pumpRateMlHr
    steps.push(`Conc. necessária: ${formatNumberPtBR(doseUPerHr, 4)} ÷ ${formatNumberPtBR(pumpRateMlHr, 1)} = ${formatNumberPtBR(neededConcentrationUMl, 4)} U/mL`)

    // Concentração do frasco em U/mL (assumindo que vialConcentrationMgMl é na verdade U/mL para insulina)
    const vialConcentrationUMl = vialConcentrationMgMl

    const totalDrugU = neededConcentrationUMl * vehicleVolumeMl
    steps.push(`Total fármaco: ${formatNumberPtBR(neededConcentrationUMl, 4)} × ${formatNumberPtBR(vehicleVolumeMl)} = ${formatNumberPtBR(totalDrugU, 4)} U`)

    const drugVolumeMl = totalDrugU / vialConcentrationUMl
    steps.push(`Volume a aspirar: ${formatNumberPtBR(totalDrugU, 4)} ÷ ${formatNumberPtBR(vialConcentrationUMl)} = ${formatNumberPtBR(drugVolumeMl, 4)} mL`)

    // ── CHECAGEM MIN_DRAW_VOLUME ──────────────────────────────────────────────
    if (drugVolumeMl < MIN_DRAW_VOLUME_ML && drugVolumeMl > 0) {
      const preDilutionRecipe = buildPreDilutionRecipe(drugVolumeMl, vialConcentrationUMl, totalDrugU)
      const diluentVolumeMl = vehicleVolumeMl - preDilutionRecipe.drugVolumeFromVialMl
      steps.push(`⚠️ Volume < ${MIN_DRAW_VOLUME_ML} mL → pré-diluição obrigatória (ver receita abaixo)`)
      return {
        drugVolumeMl: preDilutionRecipe.drugVolumeFromVialMl,
        diluentVolumeMl: Math.max(0, diluentVolumeMl),
        finalConcentrationMgMl: neededConcentrationUMl,
        totalDrugMg: totalDrugU,
        steps,
        preDilutionRequired: preDilutionRecipe,
        lightProtectionRequired,
      }
    }

    // Validação física
    if (drugVolumeMl > vehicleVolumeMl) {
      return {
        drugVolumeMl,
        diluentVolumeMl: 0,
        finalConcentrationMgMl: neededConcentrationUMl,
        totalDrugMg: totalDrugU,
        steps,
        error: {
          level: 'critical',
          title: '⛔ Preparo impossível',
          message:
            'O volume de fármaco excede o volume do veículo. Reduza dose, aumente volume do veículo, aumente a taxa (se fizer sentido) ou revise a unidade.',
        },
      }
    }

    const diluentVolumeMl = vehicleVolumeMl - drugVolumeMl
    steps.push(`Volume de diluente: ${formatNumberPtBR(vehicleVolumeMl)} - ${formatNumberPtBR(drugVolumeMl, 4)} = ${formatNumberPtBR(diluentVolumeMl, 4)} mL`)

    if (lightProtectionRequired) {
      steps.push(`💡 FOTOPROTEÇÃO: Proteger equipo/bolsa da luz (formulação fotossensível)`)
    }

    return {
      drugVolumeMl,
      diluentVolumeMl,
      finalConcentrationMgMl: neededConcentrationUMl,
      totalDrugMg: totalDrugU,
      steps,
      lightProtectionRequired,
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CÁLCULO NORMAL (mg/mcg)
  // ─────────────────────────────────────────────────────────────────────────
  const doseMgKgH = normalizeDoseToMgKgH(dose, doseUnit)
  steps.push(`Dose normalizada: ${formatNumberPtBR(dose)} ${doseUnit} = ${formatNumberPtBR(doseMgKgH, 4)} mg/kg/h`)

  const doseMgHr = doseMgKgH * weight
  steps.push(`Dose por hora: ${formatNumberPtBR(doseMgKgH, 4)} × ${formatNumberPtBR(weight, 1)} kg = ${formatNumberPtBR(doseMgHr, 4)} mg/h`)

  const neededConcentrationMgMl = doseMgHr / pumpRateMlHr
  steps.push(`Conc. necessária: ${formatNumberPtBR(doseMgHr, 4)} ÷ ${formatNumberPtBR(pumpRateMlHr, 1)} = ${formatNumberPtBR(neededConcentrationMgMl, 4)} mg/mL`)

  const totalDrugMg = neededConcentrationMgMl * vehicleVolumeMl
  steps.push(`Total fármaco: ${formatNumberPtBR(neededConcentrationMgMl, 4)} × ${formatNumberPtBR(vehicleVolumeMl)} = ${formatNumberPtBR(totalDrugMg, 2)} mg`)

  const drugVolumeMl = totalDrugMg / vialConcentrationMgMl
  steps.push(`Volume a aspirar: ${formatNumberPtBR(totalDrugMg, 2)} ÷ ${formatNumberPtBR(vialConcentrationMgMl)} = ${formatNumberPtBR(drugVolumeMl, 2)} mL`)

  // ── CHECAGEM MIN_DRAW_VOLUME ────────────────────────────────────────────────
  if (drugVolumeMl > 0 && drugVolumeMl < MIN_DRAW_VOLUME_ML) {
    const preDilutionRecipe = buildPreDilutionRecipe(drugVolumeMl, vialConcentrationMgMl, totalDrugMg)
    const diluentVolumeMl = vehicleVolumeMl - preDilutionRecipe.drugVolumeFromVialMl
    steps.push(`⚠️ Volume calculado ${formatNumberPtBR(drugVolumeMl, 3)} mL < mínimo mensurável (${formatNumberPtBR(MIN_DRAW_VOLUME_ML)} mL) → pré-diluição obrigatória`)

    if (lightProtectionRequired) {
      steps.push(`💡 FOTOPROTEÇÃO: Proteger equipo/bolsa da luz`)
    }

    return {
      drugVolumeMl: preDilutionRecipe.drugVolumeFromVialMl,
      diluentVolumeMl: Math.max(0, diluentVolumeMl),
      finalConcentrationMgMl: neededConcentrationMgMl,
      totalDrugMg,
      steps,
      preDilutionRequired: preDilutionRecipe,
      lightProtectionRequired,
    }
  }

  // Validação física: volume de fármaco não pode exceder volume do veículo
  if (drugVolumeMl > vehicleVolumeMl) {
    return {
      drugVolumeMl,
      diluentVolumeMl: 0,
      finalConcentrationMgMl: neededConcentrationMgMl,
      totalDrugMg,
      steps,
      error: {
        level: 'critical',
        title: '⛔ Preparo impossível',
        message:
          'O volume de fármaco excede o volume do veículo. Reduza dose, aumente volume do veículo, aumente a taxa (se fizer sentido) ou revise a unidade.',
      },
    }
  }

  const diluentVolumeMl = vehicleVolumeMl - drugVolumeMl
  steps.push(`Volume de diluente: ${formatNumberPtBR(vehicleVolumeMl)} - ${formatNumberPtBR(drugVolumeMl, 2)} = ${formatNumberPtBR(diluentVolumeMl, 2)} mL`)

  if (lightProtectionRequired) {
    steps.push(`💡 FOTOPROTEÇÃO: Proteger equipo/bolsa da luz (formulação fotossensível — BSAVA Gastroenterology 3rd ed.)`)
  }

  return {
    drugVolumeMl,
    diluentVolumeMl,
    finalConcentrationMgMl: neededConcentrationMgMl,
    totalDrugMg,
    steps,
    lightProtectionRequired,
  }
}
