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
    provenance: 'Diretriz institucional de controle de infecção hospitalar.',
    lifecycleStatus: 'active',
    accessPolicy: 'restricted_not_distributed',
    distributionMode: 'metadata_only',
    verificationMode: 'metadata_verified',
    filePresentInRepo: false,
    fileExposedToClient: false,
    auditedByHuman: false,
    lastAuditNote: 'Conteúdo revisado conforme a edição institucional de 2024.',
    notes: 'Referência utilizada para prevenção e controle de infecções.',
    internalStorageDesignation: null,
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
