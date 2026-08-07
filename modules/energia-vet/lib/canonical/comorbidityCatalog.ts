import type { CanonicalSpecies } from './types'

export interface ComorbidityOption {
  id: string
  label: string
  description?: string
  /** Referência no livro (capítulo AVCN 2ª ed. ou outro). */
  bookChapter?: string
  species: CanonicalSpecies[]
  group: string
  therapeuticProfileIds: string[]
  evidenceIds: string[]
}

/**
 * Condicionantes clínicos selecionáveis na etapa Paciente.
 * Conteúdo alinhado ao sumário de Applied Veterinary Clinical Nutrition, 2ª ed. (2024)
 * e referências complementares (NRC 2006, nutrição hospitalar).
 */
export const COMORBIDITY_OPTIONS: ComorbidityOption[] = [
  // —— Renal (AVCN cap. 15) ——
  {
    id: 'insuficiencia_renal_estagio_1',
    label: 'DRC — IRIS estágio 1',
    description: 'Priorizar hidratação e palatabilidade; restrição proteica/fósforo não automática.',
    bookChapter: 'AVCN 2ª ed., cap. 15 — Doença renal',
    species: ['dog', 'cat'],
    group: 'Renal',
    therapeuticProfileIds: ['ckd_dog_iris_1', 'ckd_cat_iris_1'],
    evidenceIds: ['applied-clinical-nutrition', 'iris-ckd-2023'],
  },
  {
    id: 'insuficiencia_renal_estagio_2',
    label: 'DRC — IRIS estágio 2',
    description: 'Dieta renal com controle de fósforo; proteína conforme UPC e palatabilidade.',
    bookChapter: 'AVCN 2ª ed., cap. 15',
    species: ['dog', 'cat'],
    group: 'Renal',
    therapeuticProfileIds: ['ckd_dog_iris_2', 'ckd_cat_iris_2'],
    evidenceIds: ['applied-clinical-nutrition', 'iris-ckd-2023', 'nrc-2006'],
  },
  {
    id: 'insuficiencia_renal_estagio_3',
    label: 'DRC — IRIS estágio 3',
    description: 'Restrição de fósforo e proteína de alta qualidade; densidade energética elevada.',
    bookChapter: 'AVCN 2ª ed., cap. 15',
    species: ['dog', 'cat'],
    group: 'Renal',
    therapeuticProfileIds: ['ckd_dog_iris_3', 'ckd_cat_iris_3'],
    evidenceIds: ['applied-clinical-nutrition', 'iris-ckd-2023'],
  },
  {
    id: 'insuficiencia_renal_estagio_4',
    label: 'DRC — IRIS estágio 4',
    description: 'Manejo de uremia, hiporexia e desequilíbrios eletrolíticos; suporte proteico-energético.',
    bookChapter: 'AVCN 2ª ed., cap. 15',
    species: ['dog', 'cat'],
    group: 'Renal',
    therapeuticProfileIds: ['ckd_dog_iris_3', 'ckd_cat_iris_3'],
    evidenceIds: ['applied-clinical-nutrition', 'iris-ckd-2023'],
  },
  {
    id: 'injuria_renal_aguda',
    label: 'Injúria renal aguda',
    description: 'Suporte calórico-proteico; ajuste conforme fase oligo/anúrica e vômitos.',
    bookChapter: 'AVCN 2ª ed., cap. 15 — AKI',
    species: ['dog', 'cat'],
    group: 'Renal',
    therapeuticProfileIds: ['ckd_dog_iris_3', 'ckd_cat_iris_3'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Urinário (AVCN cap. 16) ——
  {
    id: 'urolitiase_estruvita_dissolucao',
    label: 'Urolitíase — estruvita (dissolução)',
    description: 'Dieta de dissolução exclusiva; controle de pH urinário e RSS.',
    bookChapter: 'AVCN 2ª ed., cap. 16 — LUTD',
    species: ['dog', 'cat'],
    group: 'Urinário',
    therapeuticProfileIds: ['urolith_struvite_dissolution'],
    evidenceIds: ['applied-clinical-nutrition', 'acvim-urolith-2016'],
  },
  {
    id: 'urolitiase_oxalato',
    label: 'Urolitíase — oxalato de cálcio',
    description: 'Prevenção; priorizar umidade urinária e evitar acidificação excessiva.',
    bookChapter: 'AVCN 2ª ed., cap. 16',
    species: ['dog', 'cat'],
    group: 'Urinário',
    therapeuticProfileIds: ['urolith_calcium_oxalate_prevention'],
    evidenceIds: ['applied-clinical-nutrition', 'acvim-urolith-2016'],
  },
  {
    id: 'cistite_idiopatica_felina',
    label: 'Cistite idiopática felina',
    description: 'Aumentar ingestão hídrica; dieta úmida e enriquecimento ambiental.',
    bookChapter: 'AVCN 2ª ed., cap. 16 — Idiopathic cystitis',
    species: ['cat'],
    group: 'Urinário',
    therapeuticProfileIds: ['feline_idiopathic_cystitis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'infeccao_trato_urinario',
    label: 'Infecção do trato urinário',
    description: 'Manter hidratação; evitar mistura de dietas terapêuticas sem indicação.',
    bookChapter: 'AVCN 2ª ed., cap. 16',
    species: ['dog', 'cat'],
    group: 'Urinário',
    therapeuticProfileIds: ['urinary_tract_infection_support'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Endócrino (AVCN cap. 17) ——
  {
    id: 'diabetes_mellitus',
    label: 'Diabetes mellitus',
    description: 'Horários consistentes; fibra e composição conforme espécie; água livre.',
    bookChapter: 'AVCN 2ª ed., cap. 17 — Diabetes',
    species: ['dog', 'cat'],
    group: 'Endócrino',
    therapeuticProfileIds: ['diabetes_dog', 'diabetes_cat_insulin'],
    evidenceIds: ['applied-clinical-nutrition', 'aaha-2021-nutrition'],
  },
  {
    id: 'diabetes_sglt2',
    label: 'Diabetes felina — iSGLT2',
    description: 'Manter dieta habitual nas primeiras 2 semanas; monitorar cetose.',
    bookChapter: 'AVCN 2ª ed., cap. 17; AAHA 2026',
    species: ['cat'],
    group: 'Endócrino',
    therapeuticProfileIds: ['diabetes_cat_sglt2'],
    evidenceIds: ['aaha-2026-cat-diabetes', 'applied-clinical-nutrition'],
  },
  {
    id: 'hipertireoidismo_felino',
    label: 'Hipertireoidismo felino',
    description: 'Suporte proteico-energético; evitar deficiência de nutrientes essenciais.',
    bookChapter: 'AVCN 2ª ed., cap. 17',
    species: ['cat'],
    group: 'Endócrino',
    therapeuticProfileIds: ['hyperthyroid_cat'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'hiperlipidemia',
    label: 'Hiperlipidemia',
    description: 'Controle de gordura dietética e peso; investigar comorbidades.',
    bookChapter: 'AVCN 2ª ed., cap. 17 — Hyperlipidemia',
    species: ['dog', 'cat'],
    group: 'Endócrino',
    therapeuticProfileIds: ['hyperlipidemia_dog'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Metabólico / peso (AVCN cap. 9) ——
  {
    id: 'obesidade',
    label: 'Obesidade / sobrepeso',
    description: 'Meta sobre peso ideal; proteína mínima para preservar massa magra.',
    bookChapter: 'AVCN 2ª ed., cap. 9 — Peso corporal',
    species: ['dog', 'cat'],
    group: 'Metabólico',
    therapeuticProfileIds: ['obesity_dog', 'obesity_cat'],
    evidenceIds: ['applied-clinical-nutrition', 'aaha-2021-nutrition'],
  },

  // —— Gastrointestinal (AVCN cap. 11) ——
  {
    id: 'gastroenterite_aguda',
    label: 'Gastroenterite aguda',
    description: 'Nutrição luminal precoce quando tolerada; hidratação e palatabilidade.',
    bookChapter: 'AVCN 2ª ed., cap. 11 — Doença GI aguda',
    species: ['dog', 'cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_acute_gastroenteritis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'enteropatia_cronica',
    label: 'Enteropatia crônica / IBD',
    description: 'Proteína altamente digestível; ajuste de gordura e fibras fermentáveis.',
    bookChapter: 'AVCN 2ª ed., cap. 11 — Doença intestinal crônica',
    species: ['dog', 'cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_chronic_enteropathy'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'reacao_adversa_alimento',
    label: 'Reação adversa a alimento',
    description: 'Dieta de eliminação com proteína nova ou hidrolisada por 8–12 semanas.',
    bookChapter: 'AVCN 2ª ed., cap. 11 e cap. 14',
    species: ['dog', 'cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_adverse_food_reaction'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'colite_cronica',
    label: 'Colite crônica',
    description: 'Fibras fermentáveis e moderadamente solúveis; proteína digestível.',
    bookChapter: 'AVCN 2ª ed., cap. 11 — Colite',
    species: ['dog', 'cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_colitis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'vomito',
    label: 'Vômito persistente',
    description: 'Fracionar refeições; palatabilidade e hidratação; avaliar via enteral.',
    bookChapter: 'AVCN 2ª ed., cap. 11',
    species: ['dog', 'cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_acute_gastroenteritis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'diarreia',
    label: 'Diarreia crônica',
    description: 'Ajuste de fibras, gordura e digestibilidade; investigar enteropatia.',
    bookChapter: 'AVCN 2ª ed., cap. 11',
    species: ['dog', 'cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_chronic_enteropathy', 'gi_colitis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'megacolon_constipacao',
    label: 'Constipação / megacólon',
    description: 'Fibras insolúveis e hidratação; gatos: manejo específico de trato grosso.',
    bookChapter: 'AVCN 2ª ed., cap. 11',
    species: ['cat'],
    group: 'Gastrointestinal',
    therapeuticProfileIds: ['gi_constipation_cat'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Pâncreas (AVCN cap. 12) ——
  {
    id: 'pancreatite',
    label: 'Pancreatite',
    description: 'Alimentação enteral precoce quando possível; perfil distinto entre espécies.',
    bookChapter: 'AVCN 2ª ed., cap. 12',
    species: ['dog', 'cat'],
    group: 'Pâncreas',
    therapeuticProfileIds: ['pancreatitis_dog', 'pancreatitis_cat'],
    evidenceIds: ['applied-clinical-nutrition', 'acvim-pancreatitis-cat-2021'],
  },
  {
    id: 'insuficiencia_pancreatica_exocrina',
    label: 'Insuficiência pancreática exócrina',
    description: 'Dieta altamente digestível; suplementação enzimática e cobalamina.',
    bookChapter: 'AVCN 2ª ed., cap. 12 — EPI',
    species: ['dog', 'cat'],
    group: 'Pâncreas',
    therapeuticProfileIds: ['exocrine_pancreatic_insufficiency'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Hepático (AVCN cap. 13) ——
  {
    id: 'lipidose_hepatica_felina',
    label: 'Lipidose hepática felina',
    description: 'Suporte calórico-proteico agressivo; evitar deficiência de arginina/taurina.',
    bookChapter: 'AVCN 2ª ed., cap. 13 — HL felina',
    species: ['cat'],
    group: 'Hepático',
    therapeuticProfileIds: ['hepatic_lipidosis_cat'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'encefalopatia_hepatica',
    label: 'Encefalopatia hepática / shunt',
    description: 'Controle de proteína e cobalamina; fibras e lactulose conforme caso.',
    bookChapter: 'AVCN 2ª ed., cap. 13 — PSS/HE',
    species: ['dog', 'cat'],
    group: 'Hepático',
    therapeuticProfileIds: ['hepatic_encephalopathy'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'hepatopatia_cobre_cao',
    label: 'Toxicidade por cobre (cão)',
    description: 'Restrição de cobre dietético; antioxidantes e densidade energética.',
    bookChapter: 'AVCN 2ª ed., cap. 13',
    species: ['dog'],
    group: 'Hepático',
    therapeuticProfileIds: ['hepatic_copper_dog'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'hepatite_cronica',
    label: 'Hepatite crônica',
    description: 'Proteína de alta qualidade; evitar desnutrição; antioxidantes.',
    bookChapter: 'AVCN 2ª ed., cap. 13',
    species: ['dog', 'cat'],
    group: 'Hepático',
    therapeuticProfileIds: ['chronic_hepatitis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Cardiovascular (AVCN cap. 18) ——
  {
    id: 'cardiopatia_assintomatica',
    label: 'Cardiopatia — assintomática (estágio B)',
    description: 'Manutenção de peso; moderação de sódio conforme espécie.',
    bookChapter: 'AVCN 2ª ed., cap. 18 — ACVIM estágio B',
    species: ['dog', 'cat'],
    group: 'Cardiovascular',
    therapeuticProfileIds: ['cardiac_dog_stage_b', 'cardiac_cat_hcm'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
  {
    id: 'insuficiencia_cardiaca',
    label: 'Insuficiência cardíaca congestiva',
    description: 'Densidade energética; ômega-3; sódio/potássio conforme medicação.',
    bookChapter: 'AVCN 2ª ed., cap. 18 — ACVIM estágio C/D',
    species: ['dog', 'cat'],
    group: 'Cardiovascular',
    therapeuticProfileIds: ['cardiac_dog_stage_c', 'cardiac_cat_hcm'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Oncologia (AVCN cap. 19) ——
  {
    id: 'neoplasia',
    label: 'Neoplasia / caquexia oncológica',
    description: 'Priorizar ingestão e densidade energética; proteína e n-3 quando tolerados.',
    bookChapter: 'AVCN 2ª ed., cap. 19',
    species: ['dog', 'cat'],
    group: 'Oncologia',
    therapeuticProfileIds: ['oncology_support'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Dermatologia (AVCN cap. 14) ——
  {
    id: 'dermatite_alergia_alimentar',
    label: 'Dermatite — alergia alimentar',
    description: 'Eliminação dietética rigorosa; reintrodução controlada para diagnóstico.',
    bookChapter: 'AVCN 2ª ed., cap. 14',
    species: ['dog', 'cat'],
    group: 'Dermatologia',
    therapeuticProfileIds: ['gi_adverse_food_reaction'],
    evidenceIds: ['applied-clinical-nutrition'],
  },

  // —— Ortopedia (AVCN cap. 10) ——
  {
    id: 'osteoartrite',
    label: 'Osteoartrite',
    description: 'Controle de peso; ácidos graxos n-3 e palatabilidade.',
    bookChapter: 'AVCN 2ª ed., cap. 10',
    species: ['dog', 'cat'],
    group: 'Ortopedia',
    therapeuticProfileIds: ['orthopedic_osteoarthritis'],
    evidenceIds: ['applied-clinical-nutrition'],
  },
]

export function getSelectableComorbidities(species: CanonicalSpecies): ComorbidityOption[] {
  return COMORBIDITY_OPTIONS.filter((option) => option.species.includes(species))
}

export function getComorbidityOptionById(id: string): ComorbidityOption | undefined {
  return COMORBIDITY_OPTIONS.find((option) => option.id === id)
}

export function getComorbidityLabel(id: string): string {
  return getComorbidityOptionById(id)?.label ?? id.replace(/_/g, ' ')
}

export function getComorbidityBadges(ids: string[] | undefined): string[] {
  return (ids ?? []).map((id) => getComorbidityLabel(id))
}
