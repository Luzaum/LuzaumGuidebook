/**
 * Camada institucional v2 — patógenos, resistência e alertas hospitalares.
 * Conteúdo educacional; sem citação literal de diretrizes não versionadas no repositório.
 */

export type PathogenProfileKind = 'species' | 'group'

export interface PathogenProfileV2 {
  id: string
  slug: string
  label: string
  kind: PathogenProfileKind
  synonyms: string[]
  habitatSummary: string
  clinicalRoleSummary: string
  resistanceHighlights: string[]
  stewardshipBullets: string[]
  samplingNotes: string[]
  referenceKeys: string[]
}

export interface ResistanceConceptV2 {
  id: string
  slug: string
  label: string
  synonyms: string[]
  definitionShort: string
  clinicalImplication: string[]
  stewardshipBullets: string[]
  relatedPathogenIds?: string[]
  referenceKeys: string[]
}

export type HospitalCardCategory =
  | 'risk'
  | 'precaution'
  | 'culture'
  | 'deescalation'
  | 'indication'
  | 'nosocomial'
  | 'mdr'
  /** Vigilância / notificação obrigatória à CCIH ou equivalente. */
  | 'notification'
  /** Cateter urinário e ITU associada ao cuidado hospitalar. */
  | 'catheter_uti'

export interface HospitalStewardshipCardV2 {
  id: string
  slug: string
  title: string
  category: HospitalCardCategory
  lead: string
  bullets: string[]
  whenToThink: string[]
  /** Chave lógica para rastreio interno (não é citação literal). */
  sourceKey: string
  /** Documento versionado central (sourceRegistry) ao qual o cartão está vinculado para auditoria. */
  versionedSourceId?: string
  referenceKeys: string[]
}

export type ReferenceDomain =
  | 'clinical_v2'
  | 'molecules_v2'
  | 'microbiology_v2'
  | 'hospital_institutional_pending'
  | 'institutional_versioned'

export type SourceEntryStatus =
  | 'placeholder'
  | 'external_pending'
  /** Documento designado no sourceRegistry; arquivo PDF ainda não verificado no repo. */
  | 'versioned_pending_import'
  /** PDF e locators auditados no repositório. */
  | 'versioned_active'
  /** Documento institucional restrito: metadados e locators simbólicos no app; binário não distribuído ao cliente. */
  | 'versioned_restricted_metadata'

export interface SourceEntryV2 {
  key: string
  domain: ReferenceDomain
  title: string
  description: string
  status: SourceEntryStatus
  note?: string
  /** Quando a entrada representa ou espelha um registro em VERSIONED_SOURCE_REGISTRY. */
  versionedSourceId?: string
}

export interface ReferenceGroupV2 {
  domain: ReferenceDomain
  label: string
  sourceKeys: string[]
}
