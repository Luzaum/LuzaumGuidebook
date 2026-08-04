import type { Species } from '../../types'

/** Versão do conjunto de regras clínicas V2. */
export const CLINICAL_RULE_SET_V2 = 'nutrition-clinical-v2.1.0'

export type TherapeuticProfileId =
  | 'renal_ckd_dog'
  | 'renal_ckd_cat'
  | 'renal_proteinuria'
  | 'hepatic_copper_restriction'
  | 'hepatic_encephalopathy'
  | 'hepatic_ascites'
  | 'urinary_struvite_dissolution'
  | 'urinary_struvite_prevention'
  | 'urinary_calcium_oxalate_prevention'
  | 'urinary_urate'
  | 'urinary_cystine'
  | 'gastrointestinal_highly_digestible'
  | 'gastrointestinal_low_fat'
  | 'hydrolyzed_protein'
  | 'novel_protein'
  | 'fiber_responsive'
  | 'diabetes_dog'
  | 'diabetes_cat'
  | 'weight_loss_dog'
  | 'weight_loss_cat'
  | 'critical_care_recovery'
  | 'cardiac_sodium_modified'
  | 'pancreatitis_dog'
  | 'pancreatitis_cat'
  | 'hyperlipidemia_dog'
  | 'growth_dog'
  | 'growth_cat'
  | 'gestation_lactation'

export type NutrientComparisonOperator = 'lte' | 'gte' | 'between' | 'present'

export interface NutrientGoal {
  nutrientKey: string
  labelPt: string
  operator: NutrientComparisonOperator
  min?: number
  max?: number
  unit: string
  basis: 'dry_matter_pct' | 'mg_per_kg_dm'
  /** Ausência impede adequação detalhada neste perfil. */
  critical: boolean
}

export interface TherapeuticProfile {
  id: TherapeuticProfileId
  namePt: string
  species: Species | 'both'
  clinicalContext: string
  inclusionCriteria: string
  nutritionalGoals: NutrientGoal[]
  desiredCharacteristics: string[]
  hardContraindications: string[]
  relativeCautions: string[]
  monitoring: string
  followUpInterval: string
  evidenceLevel: 'consensus' | 'guideline' | 'textbook' | 'manufacturer_claim'
  ruleSetVersion: string
  evidenceSourceIds: string[]
}

export const THERAPEUTIC_PROFILES: TherapeuticProfile[] = [
  {
    id: 'renal_ckd_dog',
    namePt: 'Doença renal crônica — cão',
    species: 'dog',
    clinicalContext: 'DRC em cães — restrição de fósforo, ajuste proteico conforme estágio, sódio e densidade energética.',
    inclusionCriteria: 'DRC confirmada; considerar estágio IRIS, proteinúria, BCS e massa muscular.',
    nutritionalGoals: [
      { nutrientKey: 'phosphorusPct', labelPt: 'Fósforo', operator: 'lte', max: 0.5, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína bruta', operator: 'between', min: 14, max: 20, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'sodiumPct', labelPt: 'Sódio', operator: 'lte', max: 0.3, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'omega3Pct', labelPt: 'Ômega-3', operator: 'between', min: 0.4, max: 2.5, unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Densidade energética adequada', 'Palatabilidade', 'Ômega-3 quando disponível'],
    hardContraindications: ['Fósforo elevado sem controle em estágios avançados'],
    relativeCautions: ['Conflito com perda muscular se proteína excessivamente restrita', 'Ingestão energética insuficiente'],
    monitoring: 'Fósforo sérico, creatinina, UPC, peso, BCS, MCS, apetite.',
    followUpInterval: '2–4 semanas após mudança dietética',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-nephrology', 'applied-clinical-nutrition'],
  },
  {
    id: 'renal_ckd_cat',
    namePt: 'Doença renal crônica — gato',
    species: 'cat',
    clinicalContext: 'DRC felina — fósforo, potássio, proteína ajustada ao estágio; evitar restricao proteica indiscriminada.',
    inclusionCriteria: 'DRC felina; avaliar hipocalemia, proteinúria e condição muscular.',
    nutritionalGoals: [
      { nutrientKey: 'phosphorusPct', labelPt: 'Fósforo', operator: 'between', min: 0.3, max: 0.6, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'potassiumPct', labelPt: 'Potássio', operator: 'gte', min: 0.7, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína bruta', operator: 'between', min: 28, max: 35, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'taurinePct', labelPt: 'Taurina', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Alta palatabilidade', 'Forma úmida quando possível', 'Suporte à massa muscular'],
    hardContraindications: ['Dieta incompleta para gato', 'Taurina ausente'],
    relativeCautions: ['Hipocalemia não corrigida apenas com dieta sem monitoramento'],
    monitoring: 'Fósforo, potássio, creatinina, peso, BCS, MCS, ingestão.',
    followUpInterval: '2–4 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-nephrology', 'applied-clinical-nutrition'],
  },
  {
    id: 'renal_proteinuria',
    namePt: 'Proteinúria renal',
    species: 'both',
    clinicalContext: 'Proteinúria com impacto na escolha proteica e controle de fósforo.',
    inclusionCriteria: 'UPC elevado ou proteinúria documentada.',
    nutritionalGoals: [
      { nutrientKey: 'phosphorusPct', labelPt: 'Fósforo', operator: 'lte', max: 0.45, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína bruta', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Controle de fósforo', 'Qualidade proteica'],
    hardContraindications: [],
    relativeCautions: ['Balancear restrição proteica vs perda muscular'],
    monitoring: 'UPC, fósforo, albumina, peso, MCS.',
    followUpInterval: '4 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-nephrology'],
  },
  {
    id: 'hepatic_copper_restriction',
    namePt: 'Hepatopatia associada ao cobre',
    species: 'dog',
    clinicalContext: 'Restrição de cobre em raças predisponíveis ou doença confirmada.',
    inclusionCriteria: 'Doença hepática com acúmulo de cobre ou suspeita em raça predisposta.',
    nutritionalGoals: [
      { nutrientKey: 'copperMg', labelPt: 'Cobre', operator: 'lte', max: 10, unit: 'mg/kg MS', basis: 'mg_per_kg_dm', critical: true },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína bruta', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Cobre controlado', 'Digestibilidade adequada'],
    hardContraindications: ['Cobre elevado em dieta para restrição de cobre'],
    relativeCautions: ['Não restringir proteína sem encefalopatia'],
    monitoring: 'Cobre sérico, enzimas hepáticas, bilirrubina, BCS.',
    followUpInterval: '4–8 semanas',
    evidenceLevel: 'textbook',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['canine-hepatobiliary-2024'],
  },
  {
    id: 'hepatic_encephalopathy',
    namePt: 'Encefalopatia hepática',
    species: 'both',
    clinicalContext: 'Controle de proteína e qualidade proteica; evitar excesso que piore ammonemia.',
    inclusionCriteria: 'Sinais neurológicos atribuíveis a encefalopatia hepática.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína bruta', operator: 'lte', max: 18, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína bruta', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Proteína altamente digestível', 'Fibras fermentáveis moderadas conforme tolerância'],
    hardContraindications: ['Alimento incompleto como única fonte'],
    relativeCautions: ['Conflito com necessidade de suporte muscular em DRC concomitante'],
    monitoring: 'Sinais neurológicos, amônia (quando disponível), apetite, peso.',
    followUpInterval: '1–2 semanas na fase aguda',
    evidenceLevel: 'textbook',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['canine-hepatobiliary-2024'],
  },
  {
    id: 'hepatic_ascites',
    namePt: 'Ascite / retenção hídrica hepática',
    species: 'both',
    clinicalContext: 'Modificação de sódio na presença de ascite ou edema.',
    inclusionCriteria: 'Ascite ou necessidade de restrição de sódio documentada.',
    nutritionalGoals: [
      { nutrientKey: 'sodiumPct', labelPt: 'Sódio', operator: 'lte', max: 0.25, unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Baixo sódio', 'Energia adequada'],
    hardContraindications: ['Sódio elevado em dieta para ascite'],
    relativeCautions: ['Garantir palatabilidade e ingestão'],
    monitoring: 'Peso, circunferência abdominal, apetite, eletrólitos.',
    followUpInterval: '1–2 semanas',
    evidenceLevel: 'textbook',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['canine-hepatobiliary-2024'],
  },
  {
    id: 'urinary_struvite_dissolution',
    namePt: 'Dissolução de estruvita',
    species: 'cat',
    clinicalContext: 'Dissolução de cristais de estruvita — não equivale a dieta de manutenção.',
    inclusionCriteria: 'Estruvita com indicação de dissolução; produto com validação apropriada.',
    nutritionalGoals: [
      { nutrientKey: 'magnesiumPct', labelPt: 'Magnésio', operator: 'lte', max: 0.08, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Indicação de dissolução declarada', 'Forma úmida e hidratação'],
    hardContraindications: ['Usar como manutenção de oxalato', 'Alimento incompleto isolado'],
    relativeCautions: ['pH urinário não inferir só por ingredientes', 'Monitorar urinálise'],
    monitoring: 'Urinálise, radiografia/ultrassom, ingestão hídrica.',
    followUpInterval: '2–4 semanas até dissolução',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-urology'],
  },
  {
    id: 'urinary_struvite_prevention',
    namePt: 'Prevenção de estruvita',
    species: 'both',
    clinicalContext: 'Prevenção de recorrência de estruvita após dissolução.',
    inclusionCriteria: 'Histórico de estruvita; meta de prevenção.',
    nutritionalGoals: [
      { nutrientKey: 'magnesiumPct', labelPt: 'Magnésio', operator: 'lte', max: 0.1, unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Controle de peso', 'Hidratação'],
    hardContraindications: [],
    relativeCautions: ['Diferente de prevenção de oxalato de cálcio'],
    monitoring: 'Urinálise periódica, peso.',
    followUpInterval: '3–6 meses',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-urology'],
  },
  {
    id: 'urinary_calcium_oxalate_prevention',
    namePt: 'Prevenção de oxalato de cálcio',
    species: 'both',
    clinicalContext: 'Prevenção de oxalato — objetivos distintos da dissolução de estruvita.',
    inclusionCriteria: 'Histórico ou risco de oxalato de cálcio.',
    nutritionalGoals: [
      { nutrientKey: 'calciumPct', labelPt: 'Cálcio', operator: 'between', min: 0.5, max: 1.2, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Evitar excesso de oxalato dietético', 'Hidratação'],
    hardContraindications: ['Confundir com dieta de dissolução de estruvita'],
    relativeCautions: ['Objetivos opostos a estruvita em alguns parâmetros'],
    monitoring: 'Urinálise, densidade urinária, recorrência.',
    followUpInterval: '3–6 meses',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-urology'],
  },
  {
    id: 'urinary_urate',
    namePt: 'Urólito de urato',
    species: 'dog',
    clinicalContext: 'Manejo nutricional de uratos em cães predispostos.',
    inclusionCriteria: 'Urato confirmado ou alta suspeita.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Baixa purina relativa quando aplicável'],
    hardContraindications: [],
    relativeCautions: ['Monitorar urinálise e pH'],
    monitoring: 'Urinálise, função hepática quando relevante.',
    followUpInterval: '4–8 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-urology'],
  },
  {
    id: 'urinary_cystine',
    namePt: 'Cistina',
    species: 'dog',
    clinicalContext: 'Prevenção/dissolução de cistina em raças predispostas.',
    inclusionCriteria: 'Cistinúria ou cálculos de cistina.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Produto específico quando disponível'],
    hardContraindications: [],
    relativeCautions: [],
    monitoring: 'Urinálise, recorrência.',
    followUpInterval: '3–6 meses',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-urology'],
  },
  {
    id: 'gastrointestinal_highly_digestible',
    namePt: 'Trato gastrointestinal — alta digestibilidade',
    species: 'both',
    clinicalContext: 'Dieta altamente digestível para enteropatias agudas/crônicas.',
    inclusionCriteria: 'Diarreia, má digestão, enteropatia responsiva à dieta.',
    nutritionalGoals: [
      { nutrientKey: 'etherExtractPct', labelPt: 'Gordura', operator: 'lte', max: 15, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeFiberPct', labelPt: 'Fibra', operator: 'lte', max: 5, unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Alta digestibilidade', 'Proteína de alta qualidade'],
    hardContraindications: ['Ingrediente único humano como dieta completa'],
    relativeCautions: [],
    monitoring: 'Fezes, apetite, peso, vômito.',
    followUpInterval: '2 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'gastrointestinal_low_fat',
    namePt: 'Trato gastrointestinal — baixo teor de gordura',
    species: 'both',
    clinicalContext: 'Restrição de gordura em hiperlipidemia, pancreatite ou intolerância.',
    inclusionCriteria: 'Pancreatite, hiperlipidemia ou intolerância a gordura.',
    nutritionalGoals: [
      { nutrientKey: 'etherExtractPct', labelPt: 'Extrato etéreo', operator: 'lte', max: 12, unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Gordura moderada a baixa', 'Digestibilidade'],
    hardContraindications: ['Gordura elevada em pancreatite ativa'],
    relativeCautions: ['Garantir densidade energética adequada'],
    monitoring: 'Lipase, TG, fezes, apetite.',
    followUpInterval: '2–4 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'hydrolyzed_protein',
    namePt: 'Proteína hidrolisada',
    species: 'both',
    clinicalContext: 'Dieta de proteína hidrolisada para alergia alimentar.',
    inclusionCriteria: 'Suspeita ou confirmação de alergia alimentar.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Proteína hidrolisada declarada', 'Dieta completa'],
    hardContraindications: ['Ingrediente intacto como única fonte proteica'],
    relativeCautions: ['Exclusão dietética adequada de petiscos'],
    monitoring: 'Prurido, otite, fezes, peso.',
    followUpInterval: '8–12 semanas de prova',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'novel_protein',
    namePt: 'Proteína nova',
    species: 'both',
    clinicalContext: 'Proteína nova limitada para eliminação/alergia.',
    inclusionCriteria: 'Dieta de eliminação com proteína não previamente exposta.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Fonte proteica única declarada'],
    hardContraindications: ['Mistura proteica complexa sem controle'],
    relativeCautions: [],
    monitoring: 'Sinais cutâneos/GI, adesão.',
    followUpInterval: '8–12 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'fiber_responsive',
    namePt: 'Enteropatia responsiva à fibra',
    species: 'both',
    clinicalContext: 'Ajuste de fibra fermentável/solúvel conforme resposta.',
    inclusionCriteria: 'Constipação, fiber-responsive diarrhea ou megacólon.',
    nutritionalGoals: [
      { nutrientKey: 'crudeFiberPct', labelPt: 'Fibra', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Fibra ajustada ao quadro'],
    hardContraindications: [],
    relativeCautions: [],
    monitoring: 'Frequência/defecação, fezes, flatulência.',
    followUpInterval: '2–4 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'diabetes_dog',
    namePt: 'Diabetes mellitus — cão',
    species: 'dog',
    clinicalContext: 'Fibras, consistência calórica e palatabilidade para DM canina.',
    inclusionCriteria: 'Diabetes mellitus diagnosticada.',
    nutritionalGoals: [
      { nutrientKey: 'crudeFiberPct', labelPt: 'Fibra', operator: 'gte', min: 5, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Consistência de refeições', 'Controle de peso'],
    hardContraindications: ['Alimento incompleto'],
    relativeCautions: ['Ajuste de insulina com mudança dietética'],
    monitoring: 'Glicemia, frutosamina, peso, apetite.',
    followUpInterval: '1–2 semanas após mudança',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'diabetes_cat',
    namePt: 'Diabetes mellitus — gato',
    species: 'cat',
    clinicalContext: 'Dieta baixa carboidrato relativo e alta proteína em gatos diabéticos.',
    inclusionCriteria: 'Diabetes felina.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'gte', min: 40, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'nitrogenFreeExtractPct', labelPt: 'Carboidrato (NFE)', operator: 'lte', max: 15, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'taurinePct', labelPt: 'Taurina', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Alta proteína', 'Baixo carboidrato relativo', 'Forma úmida preferível'],
    hardContraindications: ['Taurina ausente', 'Dieta incompleta'],
    relativeCautions: ['Transição gradual se obeso'],
    monitoring: 'Glicemia, remissão, peso, apetite.',
    followUpInterval: '1–2 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'weight_loss_dog',
    namePt: 'Perda de peso — cão',
    species: 'dog',
    clinicalContext: 'Redução calórica preservando proteína e micronutrientes.',
    inclusionCriteria: 'Sobrepeso/obesidade canina.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'gte', min: 18, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'crudeFiberPct', labelPt: 'Fibra', operator: 'gte', min: 8, unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Baixa densidade energética', 'Saciedade'],
    hardContraindications: [],
    relativeCautions: ['Não subestimar energia de petiscos'],
    monitoring: 'Peso semanal, BCS, apetite.',
    followUpInterval: 'Semanal na fase ativa',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'weight_loss_cat',
    namePt: 'Perda de peso — gato',
    species: 'cat',
    clinicalContext: 'Perda ponderal felina com preservação de massa muscular.',
    inclusionCriteria: 'Sobrepeso/obesidade felina.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'gte', min: 35, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'taurinePct', labelPt: 'Taurina', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Alta proteína', 'Forma úmida para saciedade'],
    hardContraindications: ['Perda rápida/hepática lipídica — monitorar'],
    relativeCautions: ['Perda >1–2%/semana requer vigilância'],
    monitoring: 'Peso, BCS, MCS, apetite.',
    followUpInterval: 'Semanal',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'critical_care_recovery',
    namePt: 'Cuidados críticos / recuperação',
    species: 'both',
    clinicalContext: 'Suporte nutricional em paciente crítico ou convalescente.',
    inclusionCriteria: 'Hospitalização, convalescença, hiporexia prolongada.',
    nutritionalGoals: [
      { nutrientKey: 'energyKcalPer100g', labelPt: 'Energia', operator: 'present', unit: 'kcal/100g', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Alta palatabilidade', 'Densidade energética adequada'],
    hardContraindications: ['Realimentação agressiva em alto risco sem protocolo'],
    relativeCautions: ['Risco de realimentação — seguir protocolo hospitalar'],
    monitoring: 'Eletrólitos, apetite, tolerância, peso.',
    followUpInterval: 'Diário em internação',
    evidenceLevel: 'textbook',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['bsava-critical-care'],
  },
  {
    id: 'cardiac_sodium_modified',
    namePt: 'Cardiopatia — sódio modificado',
    species: 'both',
    clinicalContext: 'Modificação de sódio em insuficiência cardíaca.',
    inclusionCriteria: 'Cardiopatia com indicação de restrição de sódio.',
    nutritionalGoals: [
      { nutrientKey: 'sodiumPct', labelPt: 'Sódio', operator: 'between', min: 0.15, max: 0.25, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'phosphorusPct', labelPt: 'Fósforo', operator: 'between', min: 0.2, max: 0.7, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'taurinePct', labelPt: 'Taurina', operator: 'gte', min: 0.1, unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Palatabilidade', 'Densidade energética'],
    hardContraindications: ['Sódio elevado em restrição marcada'],
    relativeCautions: ['Conflito com ascite/hepatopatia — alinhar perfil dominante'],
    monitoring: 'Peso, tosse, esforço respiratório, apetite.',
    followUpInterval: '2–4 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'pancreatitis_dog',
    namePt: 'Pancreatite — cão',
    species: 'dog',
    clinicalContext: 'Baixo teor de gordura na pancreatite canina.',
    inclusionCriteria: 'Pancreatite aguda ou crônica.',
    nutritionalGoals: [
      { nutrientKey: 'etherExtractPct', labelPt: 'Gordura', operator: 'lte', max: 15, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'between', min: 15, max: 30, unit: '% MS', basis: 'dry_matter_pct', critical: false },
    ],
    desiredCharacteristics: ['Gordura ≤15% MS (≤10% se obeso)', 'Digestibilidade alta'],
    hardContraindications: ['Gordura elevada na fase aguda'],
    relativeCautions: [],
    monitoring: 'Lipase, TG, vômito, apetite.',
    followUpInterval: '1–2 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'pancreatitis_cat',
    namePt: 'Pancreatite — gato',
    species: 'cat',
    clinicalContext: 'Gordura moderada a baixa na pancreatite felina; restrição menos agressiva que em cães (SACN / cap. 12).',
    inclusionCriteria: 'Pancreatite aguda ou crônica felina.',
    nutritionalGoals: [
      { nutrientKey: 'etherExtractPct', labelPt: 'Gordura', operator: 'lte', max: 25, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'between', min: 30, max: 40, unit: '% MS', basis: 'dry_matter_pct', critical: false },
      { nutrientKey: 'taurinePct', labelPt: 'Taurina', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Gordura ≤25% MS (≤15% se obeso)', 'Alta digestibilidade', 'Forma úmida preferível'],
    hardContraindications: ['Gordura elevada na fase aguda'],
    relativeCautions: ['Monitorar apetite e vômito'],
    monitoring: 'Lipase, TG, vômito, apetite.',
    followUpInterval: '1–2 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'hyperlipidemia_dog',
    namePt: 'Hiperlipidemia — cão',
    species: 'dog',
    clinicalContext: 'Controle de gordura dietética em hipertrigliceridemia.',
    inclusionCriteria: 'Hipertrigliceridemia persistente.',
    nutritionalGoals: [
      { nutrientKey: 'etherExtractPct', labelPt: 'Gordura', operator: 'lte', max: 12, unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Fibra moderada', 'Digestibilidade'],
    hardContraindications: [],
    relativeCautions: [],
    monitoring: 'Triglicerídeos, colesterol, peso.',
    followUpInterval: '4–8 semanas',
    evidenceLevel: 'consensus',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'growth_dog',
    namePt: 'Crescimento — cão',
    species: 'dog',
    clinicalContext: 'Nutrição completa para filhotes em crescimento.',
    inclusionCriteria: 'Filhote em fase de crescimento.',
    nutritionalGoals: [
      { nutrientKey: 'calciumPct', labelPt: 'Cálcio', operator: 'between', min: 0.8, max: 1.8, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'phosphorusPct', labelPt: 'Fósforo', operator: 'between', min: 0.6, max: 1.4, unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Dieta completa para crescimento', 'Ca:P equilibrado'],
    hardContraindications: ['Ingrediente único', 'Dieta de manutenção adulta como única fonte'],
    relativeCautions: ['Raças gigantes — curva de crescimento'],
    monitoring: 'Peso, condição corporal, desenvolvimento.',
    followUpInterval: '4 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['fediaf-2025-ref'],
  },
  {
    id: 'growth_cat',
    namePt: 'Crescimento — gato',
    species: 'cat',
    clinicalContext: 'Nutrição completa para filhotes felinos.',
    inclusionCriteria: 'Filhote felino em crescimento.',
    nutritionalGoals: [
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'gte', min: 35, unit: '% MS', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'taurinePct', labelPt: 'Taurina', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Dieta completa filhote', 'Alta proteína'],
    hardContraindications: ['Taurina ausente', 'Ingrediente único'],
    relativeCautions: [],
    monitoring: 'Peso, BCS, desenvolvimento.',
    followUpInterval: '4 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['fediaf-2025-ref'],
  },
  {
    id: 'gestation_lactation',
    namePt: 'Gestação e lactação',
    species: 'both',
    clinicalContext: 'Demanda energética e nutricional elevada reprodutiva.',
    inclusionCriteria: 'Gestação confirmada ou lactação.',
    nutritionalGoals: [
      { nutrientKey: 'energyKcalPer100g', labelPt: 'Energia', operator: 'present', unit: 'kcal/100g', basis: 'dry_matter_pct', critical: true },
      { nutrientKey: 'crudeProteinPct', labelPt: 'Proteína', operator: 'present', unit: '% MS', basis: 'dry_matter_pct', critical: true },
    ],
    desiredCharacteristics: ['Dieta completa reprodutiva ou crescimento', 'Alta digestibilidade'],
    hardContraindications: ['Dieta incompleta', 'Restrição calórica'],
    relativeCautions: [],
    monitoring: 'Peso, condição corporal, produção de leite, filhotes.',
    followUpInterval: '2 semanas',
    evidenceLevel: 'guideline',
    ruleSetVersion: CLINICAL_RULE_SET_V2,
    evidenceSourceIds: ['fediaf-2025-ref'],
  },
]

const profileById = new Map(THERAPEUTIC_PROFILES.map((profile) => [profile.id, profile]))

export function getTherapeuticProfileById(id: string): TherapeuticProfile | undefined {
  return profileById.get(id as TherapeuticProfileId)
}

export function getTherapeuticProfilesForSpecies(species: Species): TherapeuticProfile[] {
  return THERAPEUTIC_PROFILES.filter((profile) => profile.species === species || profile.species === 'both')
}
