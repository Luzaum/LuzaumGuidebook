import { DoseUnit, normalizeConcentration, normalizeDoseToMcgKgMin, normalizeDoseToMgKgH } from './conversions'
import { formatNumberPtBR } from '../../../utils/format'

export interface DirectInfusionResult {
  rateMlMin: number
  rateMlHr: number
  steps: string[]
}

export interface PreparationResult {
  drugVolumeMl: number
  diluentVolumeMl: number
  finalConcentrationMgMl: number
  totalDrugMg: number
  steps: string[]
  error?: {
    level: 'critical' | 'warning'
    title: string
    message: string
  }
}

export function calculateDirectInfusion(
  dose: number,
  doseUnit: DoseUnit,
  weight: number,
  concentrationMgMl: number,
): DirectInfusionResult {
  const steps: string[] = []

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
): PreparationResult {
  const steps: string[] = []

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

  return {
    drugVolumeMl,
    diluentVolumeMl,
    finalConcentrationMgMl: neededConcentrationMgMl,
    totalDrugMg,
    steps,
  }
}
