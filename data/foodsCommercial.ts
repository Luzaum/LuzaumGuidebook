import { CommercialFood } from './types/commercialFood'

export const COMMERCIAL_FOODS: CommercialFood[] = [
  {
    id: 'formula-natural_fresh-meat_dog_adult_medium_frango-mandioca-alecrim',
    brand: 'Fórmula Natural',
    line: 'Fresh Meat',
    product: 'Cães Adultos Porte Médio (Frango, Mandioca e Alecrim)',
    species: 'DOG',
    lifeStage: 'ADULT',
    neuterStatus: 'ANY',
    isTherapeutic: false,
    me_kcal_per_kg: 3950,
    guarantees: [
      { key: 'moisture_max_gkg', value: 90, unit: 'g/kg' },
      { key: 'protein_min_gkg', value: 290, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 170, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 30, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 85, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 8000, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 16000, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 8000, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 2000, unit: 'mg/kg' },
      { key: 'potassium_min_mgkg', value: 5000, unit: 'mg/kg' },
      { key: 'mos_min_mgkg', value: 220, unit: 'mg/kg' },
      { key: 'fos_min_mgkg', value: 220, unit: 'mg/kg' },
      { key: 'inulin_min_mgkg', value: 100, unit: 'mg/kg' },
      { key: 'omega6_min_mgkg', value: 20000, unit: 'mg/kg', note: 'Rótulo: 20 g/kg' },
      { key: 'omega3_min_mgkg', value: 3000, unit: 'mg/kg' },
    ],
    functionalNotes: ['Prebióticos (MOS/FOS) + inulina', 'Óleo de peixe (ômega-3) declarado'],
    sources: [
      {
        label: 'Cobasi — tabela de níveis de garantia + EM',
        url: 'https://www.cobasi.com.br/racao-formula-natural-fresh-meat-adulto-medio-frango-3934127/p',
      },
    ],
    updatedAtISO: '2026-01-16',
  },

  {
    id: 'formula-natural_fresh-meat_dog_weight-control_medium-large_frango-abobora-curcuma',
    brand: 'Fórmula Natural',
    line: 'Fresh Meat',
    product: 'Controle de Peso Cães Adultos Portes Médio e Grande (Frango, Abóbora e Cúrcuma)',
    species: 'DOG',
    lifeStage: 'ADULT',
    neuterStatus: 'ANY',
    isTherapeutic: false,
    me_kcal_per_kg: 3620,
    guarantees: [
      { key: 'moisture_max_gkg', value: 90, unit: 'g/kg' },
      { key: 'protein_min_gkg', value: 300, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 120, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 45, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 85, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 8000, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 16000, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 7000, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 2000, unit: 'mg/kg' },
      { key: 'potassium_min_mgkg', value: 5000, unit: 'mg/kg' },
      { key: 'mos_min_mgkg', value: 220, unit: 'mg/kg' },
      { key: 'fos_min_mgkg', value: 220, unit: 'mg/kg' },
      { key: 'inulin_min_mgkg', value: 100, unit: 'mg/kg' },
      { key: 'omega6_min_mgkg', value: 19000, unit: 'mg/kg', note: 'Rótulo: 19 g/kg' },
      { key: 'omega3_min_mgkg', value: 3000, unit: 'mg/kg' },
      { key: 'l_carnitine_min_mgkg', value: 100, unit: 'mg/kg' },
    ],
    functionalNotes: ['Controle de peso (L-carnitina declarada)', 'Fibra moderada (4,5%)'],
    sources: [
      {
        label: 'Cobasi — níveis de garantia + EM',
        url: 'https://www.cobasi.com.br/racao-formula-natural-fresh-meat-light-medio-e-grande-frango-3934283/p',
      },
    ],
    updatedAtISO: '2026-01-16',
  },

  {
    id: 'formula-natural_vet-care_dog_renal',
    brand: 'Fórmula Natural',
    line: 'Vet Care',
    product: 'Renal Cães',
    species: 'DOG',
    lifeStage: 'ALL',
    neuterStatus: 'ANY',
    isTherapeutic: true,
    therapeuticIndications: ['CKD'],
    cautions: ['HIGH_FAT_RISK_PANCREATITIS_IN_SUSCEPTIBLE'],
    me_kcal_per_kg: 4000,
    me_method_note: 'Rótulo: Cálculo NRC',
    guarantees: [
      { key: 'moisture_max_gkg', value: 100, unit: 'g/kg' },
      { key: 'protein_min_gkg', value: 140, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 170, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 30, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 55, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 4500, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 8500, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 2000, unit: 'mg/kg' },
      { key: 'phosphorus_max_mgkg', value: 3500, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 2000, unit: 'mg/kg' },
      { key: 'potassium_min_mgkg', value: 5000, unit: 'mg/kg' },
      { key: 'mos_min_mgkg', value: 600, unit: 'mg/kg' },
      { key: 'fos_min_mgkg', value: 300, unit: 'mg/kg' },
      { key: 'inulin_min_mgkg', value: 100, unit: 'mg/kg' },
      { key: 'omega6_min_mgkg', value: 25000, unit: 'mg/kg', note: 'Rótulo: 25 g/kg' },
      { key: 'omega3_min_mgkg', value: 5000, unit: 'mg/kg' },
      { key: 'epa_dha_min_mgkg', value: 2500, unit: 'mg/kg' },
    ],
    functionalNotes: [
      'Fósforo controlado (máx 0,35%)',
      'EPA+DHA declarado (2.500 mg/kg)',
      'Probióticos múltiplos declarados no rótulo',
    ],
    sources: [
      {
        label: 'Cobasi — níveis de garantia + EM',
        url: 'https://www.cobasi.com.br/racao-formula-natural-vet-care-caes-renal-31003984/p',
      },
      {
        label: 'Adimax — página oficial Vet Care Renal',
        url: 'https://adimax.com.br/produto/formula-natural-vet-care-renal-caes/',
      },
    ],
    updatedAtISO: '2026-01-16',
  },

  {
    id: 'formula-natural_vet-care_dog_obesity_medium-large',
    brand: 'Fórmula Natural',
    line: 'Vet Care',
    product: 'Obesidade Cães Médio e Grande',
    species: 'DOG',
    lifeStage: 'ALL',
    neuterStatus: 'ANY',
    isTherapeutic: true,
    therapeuticIndications: ['WEIGHT_LOSS'],
    me_kcal_per_kg: 3000,
    me_method_note: 'Rótulo: Cálculo NRC',
    guarantees: [
      { key: 'moisture_max_gkg', value: 90, unit: 'g/kg' },
      { key: 'protein_min_gkg', value: 300, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 85, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 130, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 90, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 8000, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 18000, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 9000, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 2000, unit: 'mg/kg' },
      { key: 'mos_min_mgkg', value: 300, unit: 'mg/kg' },
      { key: 'fos_min_mgkg', value: 300, unit: 'mg/kg' },
      { key: 'inulin_min_mgkg', value: 100, unit: 'mg/kg' },
      { key: 'omega6_min_mgkg', value: 16000, unit: 'mg/kg', note: 'Rótulo: 16 g/kg' },
      { key: 'omega3_min_mgkg', value: 3000, unit: 'mg/kg' },
      { key: 'l_carnitine_min_mgkg', value: 250, unit: 'mg/kg' },
    ],
    functionalNotes: ['Alta fibra (13%) para saciedade', 'Probióticos múltiplos declarados no rótulo'],
    sources: [
      {
        label: 'Cobasi — níveis de garantia + EM',
        url: 'https://www.cobasi.com.br/racao-formula-natural-vet-care-obesidade-caes-medio-e-grande-31003917/p',
      },
    ],
    updatedAtISO: '2026-01-16',
  },

  {
    id: 'biofresh_cat_adult_frango',
    brand: 'Biofresh',
    line: 'Super Premium Natural',
    product: 'Gatos Adultos (Frango)',
    species: 'CAT',
    lifeStage: 'ADULT',
    neuterStatus: 'ANY',
    isTherapeutic: false,
    me_kcal_per_kg: 4180,
    guarantees: [
      { key: 'moisture_max_gkg', value: 90, unit: 'g/kg' },
      { key: 'protein_min_gkg', value: 440, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 200, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 25, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 75, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 9000, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 15000, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 8000, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 3000, unit: 'mg/kg' },
      { key: 'methionine_min_mgkg', value: 4100, unit: 'mg/kg' },
      { key: 'taurine_min_mgkg', value: 2500, unit: 'mg/kg' },
      { key: 'omega3_min_mgkg', value: 4500, unit: 'mg/kg' },
      { key: 'omega6_min_mgkg', value: 26000, unit: 'mg/kg', note: 'Rótulo: 26 g/kg' },
      { key: 'mos_min_mgkg', value: 500, unit: 'mg/kg' },
      { key: 'hexametaphosphate_min_mgkg', value: 3000, unit: 'mg/kg' },
      { key: 'urinary_ph_min', value: 6.2, unit: 'pH' },
      { key: 'urinary_ph_max', value: 6.8, unit: 'pH' },
    ],
    functionalNotes: [
      'Controle de pH urinário declarado (6,2–6,8)',
      'Alta densidade energética (4.180 kcal/kg) — atenção a obesidade',
      'Taurina declarada (2.500 mg/kg)',
    ],
    sources: [
      {
        label: 'Cobasi — níveis de garantia + EM + pH urinário',
        url: 'https://www.cobasi.com.br/racao-biofresh-gatos-adultos-frango-31004050/p',
      },
    ],
    updatedAtISO: '2026-01-16',
  },

  {
    id: 'biofresh_dog_adult_neutered_small-mini',
    brand: 'Biofresh',
    line: 'Super Premium Natural',
    product: 'Cães Castrados Raças Pequenas e Minis',
    species: 'DOG',
    lifeStage: 'ADULT',
    neuterStatus: 'NEUTERED',
    isTherapeutic: false,
    me_kcal_per_kg: 3430,
    guarantees: [
      { key: 'moisture_max_gkg', value: 100, unit: 'g/kg' },
      { key: 'protein_min_gkg', value: 320, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 105, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 50, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 74, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 8000, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 13000, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 7000, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 2100, unit: 'mg/kg' },
      { key: 'methionine_min_mgkg', value: 6000, unit: 'mg/kg' },
      { key: 'omega6_min_mgkg', value: 15000, unit: 'mg/kg', note: 'Rótulo: 15 g/kg' },
      { key: 'omega3_min_mgkg', value: 3100, unit: 'mg/kg', note: 'Rótulo: ômega-3 (EPA/DHA)' },
      { key: 'l_carnitine_min_mgkg', value: 250, unit: 'mg/kg' },
      { key: 'glucosamine_min_mgkg', value: 250, unit: 'mg/kg' },
      { key: 'chondroitin_min_mgkg', value: 100, unit: 'mg/kg' },
    ],
    functionalNotes: ['Controle de apetite (castrados)', 'Suporte articular (glicosamina/condroitina declaradas)'],
    sources: [
      {
        label: 'Cobasi — níveis de garantia + EM',
        url: 'https://www.cobasi.com.br/racao-biofresh-caes-castrados-racas-pequenas-e-minis-3457140/p',
      },
    ],
    updatedAtISO: '2026-01-16',
  },

  {
    id: 'biofresh_dog_light_medium',
    brand: 'Biofresh',
    line: 'Super Premium Natural',
    product: 'Light Cães Adultos Raças Médias',
    species: 'DOG',
    lifeStage: 'ADULT',
    neuterStatus: 'ANY',
    isTherapeutic: false,
    therapeuticIndications: ['WEIGHT_LOSS'],
    me_kcal_per_kg: 3100,
    guarantees: [
      { key: 'protein_min_gkg', value: 290, unit: 'g/kg' },
      { key: 'fat_min_gkg', value: 46, unit: 'g/kg' },
      { key: 'fiber_max_gkg', value: 110, unit: 'g/kg' },
      { key: 'ash_max_gkg', value: 75, unit: 'g/kg' },
      { key: 'calcium_min_mgkg', value: 8600, unit: 'mg/kg' },
      { key: 'calcium_max_mgkg', value: 17000, unit: 'mg/kg' },
      { key: 'phosphorus_min_mgkg', value: 7400, unit: 'mg/kg' },
      { key: 'sodium_min_mgkg', value: 1400, unit: 'mg/kg' },
      { key: 'methionine_min_mgkg', value: 9000, unit: 'mg/kg' },
      { key: 'l_carnitine_min_mgkg', value: 300, unit: 'mg/kg' },
      { key: 'glucosamine_min_mgkg', value: 300, unit: 'mg/kg' },
      { key: 'chondroitin_min_mgkg', value: 100, unit: 'mg/kg' },
    ],
    functionalNotes: [
      'Baixa densidade energética (3.100 kcal/kg)',
      'Alta fibra (11%) — saciedade',
      'Suporte articular (glicosamina/condroitina declaradas)',
    ],
    sources: [
      {
        label: 'Cobasi — níveis de garantia + EM',
        url: 'https://www.cobasi.com.br/racao-biofresh-light-caes-adultos-racas-medias-3457299/p',
      },
    ],
    updatedAtISO: '2026-01-16',
  },
]

/**
 * Valida um alimento comercial
 */
export function validateCommercialFood(food: CommercialFood): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  if (food.me_kcal_per_kg <= 0) {
    errors.push('ME (kcal/kg) deve ser > 0')
  }

  const protein = food.guarantees.find((g) => g.key === 'protein_min_gkg')
  if (!protein || protein.value <= 0) {
    errors.push('Proteína mínima (PB) não encontrada ou inválida')
  }

  const fat = food.guarantees.find((g) => g.key === 'fat_min_gkg')
  if (!fat || fat.value <= 0) {
    errors.push('Gordura mínima (EE) não encontrada ou inválida')
  }

  const fiber = food.guarantees.find((g) => g.key === 'fiber_max_gkg')
  if (!fiber) {
    warnings.push('Fibra bruta não declarada (importante para dietas de obesidade)')
  }

  if (food.species === 'CAT') {
    const taurine = food.guarantees.find((g) => g.key === 'taurine_min_mgkg')
    if (!taurine) {
      warnings.push('Taurina não declarada (essencial para gatos)')
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Gera warnings automáticos baseados nos valores de garantia
 */
export function generateAutomaticWarnings(food: CommercialFood): Array<{
  type: 'high_fat' | 'ultra_low_fat' | 'renal_diet' | 'urinary_ph_control'
  message: string
}> {
  const warnings: Array<{ type: string; message: string }> = []

  const fat = food.guarantees.find((g) => g.key === 'fat_min_gkg')
  if (fat) {
    if (fat.value >= 170) {
      warnings.push({
        type: 'high_fat',
        message: `Alto teor de gordura (≥17%): risco aumentado para pancreatite/hiperlipidemia em pacientes susceptíveis.`,
      })
    } else if (fat.value <= 60) {
      warnings.push({
        type: 'ultra_low_fat',
        message: `Teor de gordura muito baixo (≤6%): útil em dietas low-fat, mas pode comprometer palatabilidade.`,
      })
    }
  }

  if (food.isTherapeutic && food.therapeuticIndications?.includes('CKD')) {
    const phosphorus = food.guarantees.find((g) => g.key === 'phosphorus_max_mgkg')
    const protein = food.guarantees.find((g) => g.key === 'protein_min_gkg')
    if (
      (phosphorus && phosphorus.value <= 3500) ||
      (protein && protein.value <= 160)
    ) {
      warnings.push({
        type: 'renal_diet',
        message: `Dieta renal: fósforo e/ou proteína controlados para manejo de DRC.`,
      })
    }
  }

  const urinaryPhMin = food.guarantees.find((g) => g.key === 'urinary_ph_min')
  const urinaryPhMax = food.guarantees.find((g) => g.key === 'urinary_ph_max')
  if (urinaryPhMin && urinaryPhMax) {
    warnings.push({
      type: 'urinary_ph_control',
      message: `Controle de pH urinário declarado (${urinaryPhMin.value}–${urinaryPhMax.value}): útil para prevenção de cálculos urinários.`,
    })
  }

  return warnings as Array<{
    type: 'high_fat' | 'ultra_low_fat' | 'renal_diet' | 'urinary_ph_control'
    message: string
  }>
}
