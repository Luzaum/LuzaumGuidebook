import type { MedicationDose, MedicationPresentation } from '../types/medication'
import { roundTo } from './math'

export type DoseCalculationResult = {
  mgMin?: number
  mgMax?: number
  mgValue?: number
  volumeMlMin?: number
  volumeMlMax?: number
  volumeMlValue?: number
  tabletsMin?: number
  tabletsMax?: number
  frequency?: string
  duration?: string
  notes?: string
  summary: string
  warnings: string[]
}

function concentrationMatchesMgPerMl(presentation?: MedicationPresentation): boolean {
  return Boolean(
    presentation?.concentrationValue &&
      presentation?.concentrationUnit &&
      /mg\s*\/\s*ml/i.test(presentation.concentrationUnit)
  )
}

function concentrationMatchesTablet(presentation?: MedicationPresentation): boolean {
  return Boolean(
    presentation?.concentrationValue &&
      presentation?.concentrationUnit &&
      /mg\s*\/\s*(comp|comprimido|tab)/i.test(presentation.concentrationUnit)
  )
}

export function calculateDose({
  weightKg,
  dose,
  presentation,
}: {
  weightKg: number
  dose: MedicationDose
  presentation?: MedicationPresentation
}): DoseCalculationResult {
  const warnings: string[] = []
  const multiplier = dose.perWeightUnit === 'kg' ? weightKg : 1
  const mgMin = dose.doseMin ? roundTo(dose.doseMin * multiplier, 2) : undefined
  const mgMax = dose.doseMax ? roundTo(dose.doseMax * multiplier, 2) : undefined
  const mgValue = mgMin !== undefined && mgMax !== undefined && mgMin === mgMax ? mgMin : undefined

  let volumeMlMin: number | undefined
  let volumeMlMax: number | undefined
  let volumeMlValue: number | undefined
  let tabletsMin: number | undefined
  let tabletsMax: number | undefined

  if (concentrationMatchesMgPerMl(presentation) && presentation?.concentrationValue) {
    if (mgMin !== undefined) volumeMlMin = roundTo(mgMin / presentation.concentrationValue, 2)
    if (mgMax !== undefined) volumeMlMax = roundTo(mgMax / presentation.concentrationValue, 2)
    if (volumeMlMin !== undefined && volumeMlMax !== undefined && volumeMlMin === volumeMlMax) {
      volumeMlValue = volumeMlMin
    }
  } else if (presentation) {
    warnings.push('Apresentação sem concentração convertível em mL; exibindo dose teórica em mg.')
  }

  if (concentrationMatchesTablet(presentation) && presentation?.concentrationValue) {
    if (mgMin !== undefined) tabletsMin = roundTo(mgMin / presentation.concentrationValue, 2)
    if (mgMax !== undefined) tabletsMax = roundTo(mgMax / presentation.concentrationValue, 2)
    warnings.push('Estimativa em comprimidos depende da apresentação e do sulco da formulação.')
  }

  const summary = mgValue !== undefined
    ? `${mgValue} ${dose.doseUnit}`
    : `${mgMin ?? '?'}–${mgMax ?? '?'} ${dose.doseUnit}`

  return {
    mgMin,
    mgMax,
    mgValue,
    volumeMlMin,
    volumeMlMax,
    volumeMlValue,
    tabletsMin,
    tabletsMax,
    frequency: dose.frequency,
    duration: dose.duration,
    notes: dose.notes,
    summary,
    warnings,
  }
}

