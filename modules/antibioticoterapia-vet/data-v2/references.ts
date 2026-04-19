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
  /** Síntese educacional das fichas de fisiopatologia — metadado; PDFs dos manuais não são distribuídos no app. */
  'ref_registry.textbook_nelson_couto_siim_6': {
    key: 'ref_registry.textbook_nelson_couto_siim_6',
    domain: 'clinical_v2',
    title: 'Nelson & Couto — Small Animal Internal Medicine (6.ª ed.)',
    description:
      'Base conceitual para condições sistémicas, reprodutivas e infecciosas descritas nas fichas; conteúdo do app é paráfrase clínica, não transcrição.',
    status: 'placeholder',
    note: 'Obra em suporte físico/digital da equipa; sem link no frontend.',
  },
  'ref_registry.textbook_cunningham_physiology_6': {
    key: 'ref_registry.textbook_cunningham_physiology_6',
    domain: 'clinical_v2',
    title: "Cunningham's Textbook of Veterinary Physiology (6.ª ed.)",
    description:
      'Fundamentos de inflamação sistémica, febre, resposta vascular e fisiologia respiratória integrados nas explicações de sepse e pneumonia.',
    status: 'placeholder',
    note: 'Síntese educacional; doses e decisões seguem bula e protocolo local.',
  },
  'ref_registry.textbook_neuro_practical_3': {
    key: 'ref_registry.textbook_neuro_practical_3',
    domain: 'clinical_v2',
    title: 'Practical Guide to Canine and Feline Neurology (3.ª ed.)',
    description:
      'Referência para localização neurológica e abordagem de processos neurológicos infecciosos/inflamatórios quando relevantes ao raciocínio clínico global do doente séptico ou com complicações neurológicas.',
    status: 'placeholder',
    note: 'O módulo antibiótico foca infecção e antimicrobianos; neuro é apoio conceitual transversal.',
  },
  'ref_registry.pathophysiology_excluded_pathologic_basis': {
    key: 'ref_registry.pathophysiology_excluded_pathologic_basis',
    domain: 'clinical_v2',
    title: 'Exclusão editorial — Pathologic Basis of Veterinary Disease',
    description:
      'As fichas de fisiopatologia deste módulo não utilizam esta obra como fonte de síntese; evita-se dependência de texto unicamente anátomo-patológico para decisões terapêuticas no app.',
    status: 'placeholder',
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
    domain: 'clinical_v2',
    label: 'Literatura de apoio — síntese das fichas de fisiopatologia',
    sourceKeys: [
      'ref_registry.textbook_nelson_couto_siim_6',
      'ref_registry.textbook_cunningham_physiology_6',
      'ref_registry.textbook_neuro_practical_3',
      'ref_registry.pathophysiology_excluded_pathologic_basis',
    ],
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
