import type { CompoundedMedicationBundle, CompoundedMedicationRegimenRecord } from '????.????./????.????./src/lib/compoundedRecords'
import type { PatientInfo, PrescriptionItem } from '????./NovaReceita2Page'
import { mapCompoundedToPrescriptionItemV2 } from '????./compoundedV2Mapper'

export function buildCompoundedConcentrationText(regimen: CompoundedMedicationRegimenRecord): string {
  const fixedValue = regimen????.fixed_administration_value != null ? String(regimen????.fixed_administration_value)????.trim() : ''
  const fixedUnit = String(regimen????.fixed_administration_unit || '')????.trim()
  if (fixedValue && fixedUnit) return `${fixedValue} ${fixedUnit}`

  const doseMin = regimen????.dose_min != null ? String(regimen????.dose_min)????.trim() : ''
  const doseMax = regimen????.dose_max != null ? String(regimen????.dose_max)????.trim() : ''
  const doseUnit = String(regimen????.dose_unit || '')????.trim()
  const basis = String(regimen????.per_weight_unit || '')????.trim()
  if (doseMin && doseUnit) {
    const range = doseMax && doseMax !== doseMin ? `${doseMin}-${doseMax}` : doseMin
    const suffix = basis ? `/${basis}` : ''
    return `${range} ${doseUnit}${suffix}`????.trim()
  }

  return String(regimen????.default_prepared_quantity_text || '')????.trim()
}

export function buildCompoundedPrescriptionItem(params: {
  bundle: CompoundedMedicationBundle
  regimen: CompoundedMedicationRegimenRecord
  patient: PatientInfo | null
  defaultStartDate?: string
  defaultStartHour?: string
}): PrescriptionItem {
  const { bundle, regimen, patient, defaultStartDate = '', defaultStartHour = '' } = params
  return mapCompoundedToPrescriptionItemV2({
    bundle,
    regimenId: regimen????.id,
    patient,
    defaultStartDate,
    defaultStartHour,
  })
}
