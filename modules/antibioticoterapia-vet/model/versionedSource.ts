/**
 * Fontes institucionais versionadas — metadados auditáveis.
 * Documentos restritos: nunca expor binário ao cliente; locators de página só com auditoria real.
 */

export type VersionedSourceType = 'institutional_guideline' | 'internal_policy_draft' | 'product_internal'

/** Ciclo editorial do registro (independente de haver PDF no bundle). */
export type VersionedLifecycleStatus = 'draft' | 'active' | 'archived'

export type AccessPolicy = 'public' | 'private_internal' | 'restricted_not_distributed'

export type DistributionMode = 'bundled' | 'repo_private_only' | 'external_audit_only' | 'metadata_only'

export type VerificationMode = 'pending_import' | 'metadata_verified' | 'content_verified'

/** Confiabilidade / camada epistemológica (não substitui revisão clínica). */
export type SourceReliabilityTier = 'institutional' | 'product_internal' | 'external_literature'

/**
 * Estado do vínculo entidade ↔ documento.
 * - linked_verified_metadata: sectionRef estável; sem registo de páginas no código para este tópico.
 * - linked_verified_page_locator: pageStart/pageEnd + auditNote preenchidos via ccih2024PageAudit.ts após leitura do exemplar restrito.
 * - linked_verified_content: conteúdo textual relevante auditado (uso raro neste módulo).
 */
export type InstitutionalMappingLinkStatus =
  | 'prepared_pending_pdf'
  | 'linked_verified_metadata'
  | 'linked_verified_page_locator'
  | 'linked_verified_content'
  | 'unresolved'

/** Locator: sectionRef é âncora de auditoria interna (não é transcrição do PDF). */
export interface InstitutionalPdfLocator {
  sectionRef: string | null
  pageStart: number | null
  pageEnd: number | null
  auditNote: string
}

export interface InstitutionalContentMapping {
  versionedSourceId: string
  linkStatus: InstitutionalMappingLinkStatus
  /** Rótulo clínico / produto para contexto. */
  topicHint: string
  locator: InstitutionalPdfLocator
}

export interface VersionedInstitutionalSource {
  sourceId: string
  title: string
  sourceType: VersionedSourceType
  versionLabel: string
  publicationDate: string | null
  provenance: string
  lifecycleStatus: VersionedLifecycleStatus
  accessPolicy: AccessPolicy
  distributionMode: DistributionMode
  verificationMode: VerificationMode
  /**
   * Indica existência de ficheiro binário em repositório acessível ao time (ex.: git privado).
   * Não implica que o build público o inclua nem que o cliente o receba.
   */
  filePresentInRepo: boolean
  /** Se true, o utilizador final pode obter o documento via app ou URL pública do produto. Sempre false para CCIH restrito. */
  fileExposedToClient: boolean
  auditedByHuman: boolean
  lastAuditNote: string
  notes: string
  /**
   * Designação interna do arquivo (ex.: nome do ficheiro na intranet). Não é URL, não é caminho público, não é link de download.
   */
  internalStorageDesignation: string | null
  reliabilityTier: SourceReliabilityTier
  mappingsModulePath: string
}
