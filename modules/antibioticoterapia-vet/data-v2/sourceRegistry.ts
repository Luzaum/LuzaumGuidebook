import type { VersionedInstitutionalSource } from '../model/versionedSource'

/** ID canônico da fonte CCIH no módulo. */
export const INSTITUTIONAL_SOURCE_CCIH_2024 = 'institutional.ccih_guidance_2024' as const

/**
 * Registro central de documentos versionados.
 * Guia CCIH HV-UFMG 2026: circulação institucional restrita.
 */
export const VERSIONED_SOURCE_REGISTRY: Record<string, VersionedInstitutionalSource> = {
  [INSTITUTIONAL_SOURCE_CCIH_2024]: {
    sourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    title: 'Guia de Uso de Antimicrobianos e Controle de Infecção Hospitalar — HV-UFMG (Edição 2026)',
    sourceType: 'institutional_guideline',
    versionLabel: '2026',
    publicationDate: '2026-07-03',
    provenance: 'Comissão de Controle de Infecção Hospitalar (CCIH-EV-UFMG), designada pela Portaria N°9737.',
    lifecycleStatus: 'active',
    accessPolicy: 'restricted_not_distributed',
    distributionMode: 'metadata_only',
    verificationMode: 'metadata_verified',
    filePresentInRepo: false,
    fileExposedToClient: false,
    auditedByHuman: true,
    lastAuditNote: 'Conteúdo integralmente auditado e cadastrado conforme o Guia HV-UFMG de 03 de Julho de 2026.',
    notes: 'Diretriz institucional para uso racional de antimicrobianos, dosagens, durações e prevenção de infecção hospitalar.',
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