import type { Omega3DosePrescription, VeterinaryOmega3Indication } from './types'

/** Doses de referência — Plumb's / NRC / Nelson & Couto (uso extrarrótulo). */
export const VETERINARY_OMEGA3_PRESETS: Record<VeterinaryOmega3Indication, Omega3DosePrescription> = {
  nutritional_general: {
    indication: 'nutritional_general',
    combinedMgPerMetabolicKg: 30,
  },
  nrc_upper_safe: {
    indication: 'nrc_upper_safe',
    combinedMgPerMetabolicKg: 370,
  },
  hyperlipidemia: {
    indication: 'hyperlipidemia',
    combinedMgPerMetabolicKg: 120,
  },
  renal_disease: {
    indication: 'renal_disease',
    combinedMgPerMetabolicKg: 140,
  },
  cardiovascular: {
    indication: 'cardiovascular',
    epaMgPerKg: 40,
    dhaMgPerKg: 25,
  },
  osteoarthritis_metabolic: {
    indication: 'osteoarthritis_metabolic',
    combinedMgPerMetabolicKg: 310,
  },
  osteoarthritis_individual: {
    indication: 'osteoarthritis_individual',
    epaMgPerKg: 90,
    dhaMgPerKg: 20,
  },
  inflammatory_immunologic: {
    indication: 'inflammatory_immunologic',
    combinedMgPerMetabolicKg: 125,
  },
  atopic_cyclosporine_sparing: {
    indication: 'atopic_cyclosporine_sparing',
    epaMgPerKg: 36,
    dhaMgPerKg: 25,
  },
  symmetric_lupoid_onychodystrophy: {
    indication: 'symmetric_lupoid_onychodystrophy',
    epaMgPerKg: 82.5,
    dhaMgPerKg: 53,
  },
  glomerular_disease: {
    indication: 'glomerular_disease',
    combinedMgPerMetabolicKg: undefined,
    epaMgPerKg: undefined,
    dhaMgPerKg: undefined,
  },
  custom_combined: {
    indication: 'custom_combined',
    combinedMgPerMetabolicKg: 30,
  },
  custom_epa_dha: {
    indication: 'custom_epa_dha',
    epaMgPerKg: 40,
    dhaMgPerKg: 25,
  },
}

export const PRESET_LABELS_PT: Record<VeterinaryOmega3Indication, string> = {
  nutritional_general: 'Suplementação nutricional geral (30 mg/kg^0,75 EPA+DHA)',
  nrc_upper_safe: 'Limite superior seguro NRC (370 mg/kg^0,75)',
  hyperlipidemia: 'Hiperlipidemia idiopática (120 mg/kg^0,75)',
  renal_disease: 'Doença renal (140 mg/kg^0,75)',
  cardiovascular: 'Doença cardiovascular (EPA 40 + DHA 25 mg/kg/dia)',
  osteoarthritis_metabolic: 'Osteoartrite — peso metabólico (310 mg/kg^0,75)',
  osteoarthritis_individual: 'Osteoartrite — EPA/DHA individual (90/20 mg/kg)',
  inflammatory_immunologic: 'Doenças inflamatórias/imunológicas (125 mg/kg^0,75)',
  atopic_cyclosporine_sparing: 'Dermatite atópica — poupadora de ciclosporina',
  symmetric_lupoid_onychodystrophy: 'Onicodistrofia lupoide simétrica',
  glomerular_disease: 'Doença glomerular (0,25–0,5 g/kg ácidos n-3 — revisar manualmente)',
  custom_combined: 'Dose combinada personalizada',
  custom_epa_dha: 'EPA e DHA personalizados',
}

/** Doença glomerular: 0,25–0,5 g/kg/dia de ácidos n-3 — converter para mg/kg */
export function glomerularCombinedMgPerKg(weightKg: number, factor: 0.25 | 0.5): number {
  return weightKg * factor * 1000
}
