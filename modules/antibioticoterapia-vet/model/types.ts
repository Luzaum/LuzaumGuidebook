/**
 * Modelo v2 — IDs estáveis; nenhuma lógica clínica deve depender de nomes soltos.
 * Referências a PDF/fontes externas: apenas placeholders (referenceKey).
 */

export type SpeciesId = 'dog' | 'cat'

export type AgeBand = 'neonate' | 'juvenile' | 'adult' | 'senior'

/** Cenário assistencial escolhido pelo usuário (engine não infere gravidade). */
export type SeverityTier = 'ambulatory_stable' | 'hospitalized' | 'severe' | 'septic_unstable'

export type CultureRecommendationLevel = 'strong' | 'recommended' | 'optional' | 'not_typically_indicated'

export type AntibioticIndication = 'yes_empiric' | 'yes_after_sampling' | 'no_not_routine' | 'conditional'

export interface ComorbidityFlagsV2 {
  renal: boolean
  hepatic: boolean
  cardiac: boolean
  neurological: boolean
  /** Inclui suspeita clínica de sepse / choque (checkbox legado + consistência com severity). */
  septic: boolean
}

export interface PatientContextV2 {
  species: SpeciesId
  ageBand: AgeBand
  isGestante: boolean
  isLactante: boolean
  severity: SeverityTier
  comorbidities: ComorbidityFlagsV2
}

/** Molécula antimicrobiana (catálogo mínimo piloto). */
export interface AntibioticMolecule {
  id: string
  /** Nome para exibição */
  displayName: string
  classId: string
  /** Categorias para regras (ex.: evitar em gestação) */
  ruleTags: Array<
    | 'beta_lactam'
    | 'fluoroquinolone'
    | 'nitroimidazole'
    | 'lincosamide'
    | 'macrolide'
    | 'tetracycline'
    | 'aminoglycoside'
    | 'cephalosporin_3g'
  >
  /** Chave opcional para futura referência bibliográfica versionada */
  referenceKey?: string
}

export type RegimenRoute = 'oral' | 'parenteral' | 'mixed'

/** Regime estruturado — sem parse de dose para decisão; texto de apoio opcional. */
export interface AntibioticRegimen {
  id: string
  moleculeIds: string[]
  label: string
  route: RegimenRoute
  /** Texto educacional fixo (não é calculado por string parsing). */
  dosingNotes?: Partial<Record<SpeciesId, string>>
  settingNote?: string
  referenceKey?: string
}

export type ScenarioKey = 'ambulatory_stable' | 'hospitalized' | 'severe' | 'septic_unstable'

export interface SyndromeScenarioBlock {
  firstLineRegimenIds: string[]
  alternativeRegimenIds: string[]
  avoidMoleculeIds?: string[]
  rationaleBullets: string[]
}

export interface SyndromeProfileV2 {
  id: string
  /** Slug estável para rota futura (geralmente igual a id). */
  slug: string
  label: string
  synonyms: string[]
  summary: string
  antibioticIndication: AntibioticIndication
  cultureRecommendation: CultureRecommendationLevel
  likelyMicrobiologySummary: string
  durationGuidance: string
  stewardshipNotes: string[]
  interpretiveNotes: string[]
  /** Cenários cobertos por esta síndrome (IDs de regime). */
  scenarios: Partial<Record<ScenarioKey, SyndromeScenarioBlock>>
  /** Evitar independentemente de cenário (IDs de molécula). */
  globalAvoidMoleculeIds?: string[]
  referenceKeys?: string[]
}

export type AlertSeverity = 'info' | 'caution' | 'warning' | 'block'

export interface ClinicalAlert {
  id: string
  severity: AlertSeverity
  title: string
  detail: string
  /** Por que esta regra disparou */
  because: string
}

export interface RegimenRecommendation {
  regimenId: string
  regimen: AntibioticRegimen
  /** Ajustes explicados (ex.: gestação) */
  modifiersApplied: string[]
}

export interface AvoidEntry {
  moleculeId?: string
  molecule?: AntibioticMolecule
  reason: string
}

export interface CultureRecommendationDetail {
  level: CultureRecommendationLevel
  summary: string
  because: string[]
}

export interface RecommendationResult {
  syndromeId: string
  syndromeLabel: string
  scenarioResolved: ScenarioKey
  /** Quando o perfil não define o cenário exato, documentar fallback */
  scenarioFallbackFrom?: ScenarioKey
  antibioticIndication: AntibioticIndication
  culture: CultureRecommendationDetail
  firstLine: RegimenRecommendation[]
  alternatives: RegimenRecommendation[]
  avoid: AvoidEntry[]
  patientAlerts: ClinicalAlert[]
  stewardshipAlerts: ClinicalAlert[]
  rationale: string[]
  referenceKeys: string[]
}
