import type { ReferenceDomain, ReferenceGroupV2, SourceEntryV2 } from '../model/institutional'
import { INSTITUTIONAL_SOURCE_CCIH_2024 } from './sourceRegistry'

/**
 * Registro canônico de fontes do módulo (chaves estáveis para fichas v2).
 * Fontes institucionais versionadas: metadado completo em sourceRegistry.ts.
 */
export const SOURCE_REGISTRY: Record<string, SourceEntryV2> = {
  'ref_registry.institutional_ccih_2024': {
    key: 'ref_registry.institutional_ccih_2024',
    domain: 'institutional_versioned',
    title: 'Guia CCIH 2024 (circulação restrita)',
    description:
      'Documento interno de referência; não é distribuído no aplicativo nem servido em URL pública. O módulo mantém apenas metadados, política de acesso e locators simbólicos (sectionRef) para rastreabilidade.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note:
      'Sem link de download no frontend. Números de página opcionais no código apenas após conferência humana com o PDF restrito.',
  },
  'ref_registry.clinical_syndromes_v2': {
    key: 'ref_registry.clinical_syndromes_v2',
    domain: 'clinical_v2',
    title: 'Bloco clínico v2 (síndromes e engine)',
    description:
      'Textos educacionais e estruturas de cenário gerados para o módulo; revisão clínica periódica recomendada. Síndromes listadas para integração CCIH possuem mapeamento de auditoria em institutionalMappings.ts.',
    status: 'placeholder',
    note: 'Base interna do produto; vínculo ao guia institucional é rastreável por síndrome quando aplicável.',
  },
  'ref_registry.molecules_v2_sheets': {
    key: 'ref_registry.molecules_v2_sheets',
    domain: 'molecules_v2',
    title: 'Biblioteca de moléculas v2',
    description:
      'Fichas estruturadas alinhadas aos moleculeIds da engine; doses e indicações finais conforme bula e protocolo local. Moléculas do núcleo v2 têm slot de mapeamento institucional genérico até capítulos específicos serem auditados.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Mapeamento em MOLECULE_SHEET_INSTITUTIONAL_MAPPINGS (metadata; páginas opcionais só via ccih2024PageAudit se no futuro incluir moléculas).',
  },
  'ref_registry.microbiology_v2_general': {
    key: 'ref_registry.microbiology_v2_general',
    domain: 'microbiology_v2',
    title: 'Microbiologia e resistência (núcleo v2)',
    description: 'Perfis de patógenos e conceitos de resistência para apoio ao raciocínio clínico e stewardship.',
    status: 'placeholder',
  },
  'ref_registry.microbiology_v2_resistance': {
    key: 'ref_registry.microbiology_v2_resistance',
    domain: 'microbiology_v2',
    title: 'Conceitos de resistência (MRSP, ESBL, etc.)',
    description:
      'Definições operacionais para uso no app; conceitos com interface hospitalar referenciam o guia CCIH via locators simbólicos (metadados).',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Subconjunto mapeado em RESISTANCE_INSTITUTIONAL_MAPPINGS.',
  },
  'ref_registry.microbiology_v2_sampling': {
    key: 'ref_registry.microbiology_v2_sampling',
    domain: 'microbiology_v2',
    title: 'Amostragem e interpretação',
    description: 'Boas práticas de coleta e valor interpretativo; alinhar a manuais laboratoriais locais e ao guia CCIH (metadados / exemplar restrito).',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Conceitos stewardship/amostra vinculados em RESISTANCE_INSTITUTIONAL_MAPPINGS.',
  },
  'ref_registry.hospital_culture_timing': {
    key: 'ref_registry.hospital_culture_timing',
    domain: 'hospital_institutional_pending',
    title: 'Timing de cultura e início de antimicrobiano',
    description:
      'Princípios gerais de stewardship alinhados ao cartão v2; detalhes normativos no exemplar restrito Guia CCIH 2024.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Cartão mapeado com linked_verified_metadata em HOSPITAL_CARD_INSTITUTIONAL_MAPPINGS.',
  },
  'ref_registry.hospital_stewardship_core': {
    key: 'ref_registry.hospital_stewardship_core',
    domain: 'hospital_institutional_pending',
    title: 'Stewardship hospitalar (núcleo)',
    description:
      'Reavaliação, descalonamento e indicação de antimicrobiano — cartões v2 com sectionRef simbólico; PDF não exposto ao cliente.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Sem transcrição literal de trechos; conteúdo do app permanece educacional.',
  },
  'ref_registry.hospital_institutional_pending': {
    key: 'ref_registry.hospital_institutional_pending',
    domain: 'hospital_institutional_pending',
    title: 'Hospital / controle de infecção — núcleo v2',
    description:
      'Agregador para cartões de precaução, MDR e nosocomial; vínculo ao Guia CCIH 2024 via sourceRegistry (restrito / metadata_only).',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Ligação explícita ao documento central; sem publicação do binário no bundle.',
  },
}

export const REFERENCE_GROUPS: ReferenceGroupV2[] = [
  {
    domain: 'institutional_versioned',
    label: 'Institucional versionada (documento central)',
    sourceKeys: ['ref_registry.institutional_ccih_2024'],
  },
  {
    domain: 'clinical_v2',
    label: 'Bloco clínico v2',
    sourceKeys: ['ref_registry.clinical_syndromes_v2'],
  },
  {
    domain: 'molecules_v2',
    label: 'Antimicrobianos v2',
    sourceKeys: ['ref_registry.molecules_v2_sheets'],
  },
  {
    domain: 'microbiology_v2',
    label: 'Microbiologia e resistência',
    sourceKeys: [
      'ref_registry.microbiology_v2_general',
      'ref_registry.microbiology_v2_resistance',
      'ref_registry.microbiology_v2_sampling',
    ],
  },
  {
    domain: 'hospital_institutional_pending',
    label: 'Hospital / controle de infecção (mapeamentos v2 → Guia CCIH)',
    sourceKeys: [
      'ref_registry.hospital_culture_timing',
      'ref_registry.hospital_stewardship_core',
      'ref_registry.hospital_institutional_pending',
    ],
  },
]

export function getSourceEntry(key: string): SourceEntryV2 | undefined {
  return SOURCE_REGISTRY[key]
}

export function listAllSourceEntries(): SourceEntryV2[] {
  return Object.values(SOURCE_REGISTRY)
}
