/**
 * CRIVET 2.0 - Perfil Completo de Fármaco
 * Schema oficial para garantir que todos os fármacos tenham informações completas
 */

import type { HelpContent } from './help'

export type AlertLevel = 'SAFE' | 'MONITOR' | 'WARNING' | 'CRITICAL' | 'BLOCK'
export type Species = 'dog' | 'cat' | 'both'
export type Route = 'IV' | 'IM' | 'SC' | 'PO'
export type Mode = 'CRI' | 'BOLUS'

// Seção 1: Identidade
export interface DrugIdentity {
  drug_id: string // slug único, estável
  name_pt: string
  name_en: string
  synonyms?: string[] // nomes comerciais
  class: string[] // classes farmacológicas
  taglines?: string[] // 2-5 frases curtas
  status?: 'first_line' | 'second_line' | 'rescue' | 'avoid'
  legal_control?: string // requisitos legais
}

// Seção 2: Perfil Farmacológico
export interface MechanismOfAction {
  receptors_targets?: string[] // ["α1", "β1", "NMDA"]
  primary_effects?: {
    cardiovascular?: string
    respiratory?: string
    cns?: string
    renal_hepatic?: string
    gi?: string
  }
  clinical_metaphor?: string // "tanque", "ralo", "filtro"
}

export interface Pharmacodynamics {
  onset_iv?: string
  onset_im?: string
  peak?: string
  duration?: string
  dependencies?: string[] // ["catecolaminas", "volume", "ventilação"]
}

export interface Pharmacokinetics {
  metabolism?: string // "hepático", "extra-hepático"
  excretion?: string // "renal", "biliar"
  dog_vs_cat?: string
  accumulation?: string
  active_metabolites?: string
}

export interface FormulationNotes {
  stability?: string // pH, oxidação, luz
  equipment_adsorption?: string // adsorção em equipo
}

export interface CoreConcepts {
  taglines: string[]
  mechanism?: MechanismOfAction
  pharmacodynamics?: Pharmacodynamics
  pharmacokinetics?: Pharmacokinetics
  formulation_notes?: FormulationNotes
}

export interface SpeciesNotes {
  dogs?: {
    key_point?: string
    high_risk_notes?: string[]
    metabolism_excretion?: string
  }
  cats?: {
    key_point?: string
    high_risk_notes?: string[]
    metabolism_excretion?: string
  }
}

// Seção 3: Indicações e Contraindicações
export interface Indications {
  primary?: string[]
  secondary?: string[]
  off_label_notes?: string[]
}

export interface Contraindication {
  condition: string
  why: string
  level?: AlertLevel
}

export interface Contraindications {
  absolute: Contraindication[]
  relative: Contraindication[]
}

// Seção 4: Doses
export interface DoseRange {
  min: number
  max: number
  note?: string
}

export interface DoseAdjustment {
  obesity?: string
  shock?: string
  hypoalbuminemia?: string
  comorbidities?: string
}

export interface TherapeuticTargets {
  target_map?: string
  target_etco2?: string
  analgesia_scale?: string
  sedation_target?: string
}

export interface SpeciesDoses {
  bolus?: {
    mgkg?: DoseRange
    mcgkg?: DoseRange
    ukg?: DoseRange
    route?: Route
    loading_dose?: DoseRange
  }
  cri?: {
    mcgkgmin?: DoseRange
    mgkgmin?: DoseRange // Para propofol, etc.
    mukgmin?: DoseRange // Para vasopressina
    mgkgh?: DoseRange
    titration?: {
      increment: string
      interval: string
    }
    maintenance?: DoseRange
    rescue?: DoseRange
    max?: number
  }
  epidural?: {
    mgkg?: DoseRange
    mcgkg?: DoseRange
    route?: string // "Epidural" ou custom
    volume_mlkg?: DoseRange // Para volume total
  }
  adjustments?: DoseAdjustment
  therapeutic_targets?: TherapeuticTargets
}

export interface Doses {
  unit_standard_cri: string // "mcg/kg/min" | "mg/kg/h"
  dog: SpeciesDoses
  cat: SpeciesDoses
}

// Seção 5: Apresentações
export interface Presentation {
  concentration_mg_ml?: number
  concentration_mcg_ml?: number
  concentration_percent?: number
  volume_ml?: number
  total_mg?: number
  label: string
  examples?: string[]
  concentration_trap_warning?: string // "pegadinha de concentração"
}

// Seção 6: Diluição
export interface DilutionTarget {
  target_mg_ml?: number
  target_mcg_ml?: number
  target_u_ml?: number
  use_cases: string[]
  how_to_make: string
  recipe?: string // "1 mL + X mL = Y mg/mL"
}

export interface Stability {
  diluent: string
  max_time_hours?: number
  light_protection?: boolean
  syringe_bag_change?: string
}

export interface DilutionAndPreparation {
  hard_rules: string[]
  recommended_targets: DilutionTarget[]
  diluents_allowed: string[]
  preferred_diluent?: {
    diluent: string
    why: string
  }
  stability?: Stability[]
  dedicated_line_required?: boolean
  dedicated_line_why?: string
}

// Seção 7: Compatibilidade
export interface Compatibility {
  compatible_in_syringe_or_bag?: string[]
  compatible_y_site_only?: string[]
  incompatible?: Array<{
    agent: string
    why: string
    risk?: string // "precipitação", "inativação", "adsorção"
  }>
  avoid_same_syringe_or_precipitation_risk?: string[] // avisos de mistura/precipitação
  dedicated_line_rules?: string[]
}

// Seção 8: Administração
export interface AdministrationAndTitration {
  bolus_guidance?: string[] // tempo mínimo, velocidade
  titration_rules?: string[] // quanto subir/descer, quando
  monitoring_minimum?: string[] // ECG, PAM, lactato, diurese
  endpoints?: {
    desired_effect?: string[]
    toxicity_signs?: string[]
  }
  therapeutic_failure?: {
    check_first?: string[]
    common_causes?: string[]
    when_to_change?: string[]
  }
}

// Seção 9: Efeitos Adversos
export interface AdverseEffectsAndToxicity {
  common?: string[]
  serious?: string[]
  subdose_signs?: string[]
  overdose_signs?: string[]
  management?: string[] // reduzir/parar, antídoto, suporte
  special_events?: Array<{
    event: string // "extravasamento", "necrose", "disforia"
    management: string
  }>
}

// Seção 10: Alertas por Comorbidade
export interface ComorbidityAlert {
  key: string // "hcm_feline", "ckd", "hepatic_shunt"
  level: AlertLevel
  title: string
  why: string
  action: string[]
  dose_adjustment?: {
    reduce_percent?: number
    avoid_bolus?: boolean
    require_central_line?: boolean
    require_monitoring?: string[]
    suggest_alternative?: string
  }
}

// Seção 11: Presets
export interface Preset {
  id: string
  label: string
  dose_mcgkgmin?: number
  dose_mgkgmin?: number // Para propofol
  dose_mukgmin?: number // Para vasopressina
  dose_mgkg?: number
  dose_mcgkg?: number
  dose_ukg?: number // Para vasopressina bolus
  dose_mgkgh?: number
  limits?: {
    min?: number
    max?: number
  }
  clinical_target?: string
  linked_alerts?: string[] // ["precisa volume", "precisa benzo"]
}

// Seção 12: Templates de Cálculo
export interface CalculationTemplate {
  required_inputs: string[]
  algorithm: string[]
  conversions?: string[]
  hard_safety_checks?: Array<{
    if: string
    then: 'BLOCK' | 'WARN'
    message: string
  }>
  soft_safety_checks?: Array<{
    if: string
    then: 'WARN' | 'INFO'
    message: string
  }>
  outputs?: string[] // ["mL/h", "mg/kg/h equivalente"]
  error_cost?: string // "risco em paciente pequeno"
}

export interface CalculationTemplates {
  cri?: CalculationTemplate
  bolus?: CalculationTemplate
  dilution_builder?: CalculationTemplate
}

// Seção 13: Bloco Didático
export interface HowWeGotHereBlock {
  title: string
  render_steps: Array<{
    step: number
    label: string
    formula: string
  }>
  interpretation_rules?: string[]
  example?: {
    scenario: string
    calculation: string[]
    result: string
  }
}

// Seção 14: Integrações
export interface ProtocolIntegrationRule {
  if: string // condição
  then: {
    action: 'REMOVE_DRUG' | 'REDUCE_DOSE' | 'PREFER_ALTERNATIVE'
    drug_id?: string
    factor?: number
    message: string
  }
}

export interface ProtocolIntegrations {
  enabled: boolean
  protocols?: string[] // ["MLK", "neuroanestesia"]
  rules?: ProtocolIntegrationRule[]
  why_combo_exists?: string
}

// Seção 15: Fluxogramas
export interface ClinicalFlowchart {
  id: string
  title: string
  mermaid?: string
  steps?: Array<{
    id: string
    label: string
    condition?: string
    action?: string
    next?: string[]
  }>
}

export interface ClinicalFlowcharts {
  format: 'mermaid' | 'steps'
  flows: ClinicalFlowchart[]
}

// Seção 16: UI Copy
export interface UICopy {
  critical_warning_banner?: string // "regra de ouro"
  alert_messages?: {
    short?: string
    long?: string
  }
  block_message?: string
  common_errors?: string[]
}

// Seção 17: Referências
export interface Reference {
  section: string // "doses", "compatibility"
  source: string // livro, capítulo
  page?: string
  edition?: string
  year?: number
  doi?: string
  internal_link?: string
}

// PERFIL COMPLETO (Schema Oficial CRIVET 2.0)
export interface DrugProfile {
  // Seção 1
  drug_id: string
  name_pt: string
  name_en: string
  synonyms?: string[]
  class: string[]
  core_concepts: CoreConcepts
  species_notes?: SpeciesNotes

  // Seção 2 (integrado em core_concepts)
  // Seção 3
  indications?: Indications
  contraindications?: Contraindications

  // Seção 4
  doses: Doses

  // Seção 5
  presentations: Presentation[]

  // Seção 6
  dilution_and_preparation: DilutionAndPreparation

  // Seção 7
  compatibility: Compatibility

  // Seção 8
  administration_and_titration?: AdministrationAndTitration

  // Seção 9
  adverse_effects_and_toxicity?: AdverseEffectsAndToxicity

  // Seção 10
  alerts_by_comorbidity?: ComorbidityAlert[]

  // Seção 11
  presets?: Preset[]

  // Seção 12
  calculation_templates?: CalculationTemplates

  // Seção 13
  how_we_got_here_block?: HowWeGotHereBlock

  // Seção 14
  protocol_integrations?: ProtocolIntegrations

  // Seção 15
  clinical_flowcharts?: ClinicalFlowcharts

  // Seção 16
  ui_copy?: UICopy

  // Ajuda clÇðnica estruturada (botÇœo "?")
  help?: HelpContent

  // Seção 17
  references?: Reference[]
}
