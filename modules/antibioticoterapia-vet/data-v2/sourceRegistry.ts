import type { VersionedInstitutionalSource } from '../model/versionedSource'

/** ID canônico da fonte CCIH 2024 no módulo (metadados; sem PDF no bundle). */
export const INSTITUTIONAL_SOURCE_CCIH_2024 = 'institutional.ccih_guidance_2024' as const

/**
 * Registro central de documentos versionados.
 * Guia_CCIH_2024: circulação restrita — não entra no bundle, sem URL pública, sem download no app.
 */
export const VERSIONED_SOURCE_REGISTRY: Record<string, VersionedInstitutionalSource> = {
  [INSTITUTIONAL_SOURCE_CCIH_2024]: {
    sourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    title: 'Guia de controle de infecção hospitalar (CCIH) — edição 2024',
    sourceType: 'institutional_guideline',
    versionLabel: '2024',
    publicationDate: null,
    provenance:
      'Documento de referência interna para controle de infecção; cópia controlada fora do repositório público do aplicativo.',
    lifecycleStatus: 'active',
    accessPolicy: 'restricted_not_distributed',
    distributionMode: 'metadata_only',
    verificationMode: 'metadata_verified',
    filePresentInRepo: false,
    fileExposedToClient: false,
    auditedByHuman: false,
    lastAuditNote:
      'Política restrita + metadata_only. Páginas auditadas: preencher data-v2/ccih2024PageAudit.ts (mapa prioritário); entradas válidas promovem o vínculo a linked_verified_page_locator em institutionalMappings. Sem PDF no bundle; fileExposedToClient permanece false.',
    notes:
      'O PDF Guia_CCIH_2024 não é servido nem referenciado como caminho público (public/). Não há link de download no frontend. Integração limitada a metadados, locators simbólicos e rastreabilidade.',
    internalStorageDesignation: 'Guia_CCIH_2024.pdf (referência interna controlada)',
    reliabilityTier: 'institutional',
    mappingsModulePath: 'modules/antibioticoterapia-vet/data-v2/institutionalMappings.ts',
  },
}

export function getVersionedSource(sourceId: string): VersionedInstitutionalSource | undefined {
  return VERSIONED_SOURCE_REGISTRY[sourceId]
}

export function listVersionedSources(): VersionedInstitutionalSource[] {
  return Object.values(VERSIONED_SOURCE_REGISTRY)
}
