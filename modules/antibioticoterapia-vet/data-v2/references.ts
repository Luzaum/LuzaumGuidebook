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
    title: 'Guia de controle de infecção hospitalar — 2024',
    description:
      'Diretriz institucional para prevenção de infecções e uso racional de antimicrobianos.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'As páginas indicadas foram conferidas na edição institucional.',
  },
  'ref_registry.clinical_syndromes_v2': {
    key: 'ref_registry.clinical_syndromes_v2',
    domain: 'clinical_v2',
    title: 'Síndromes infecciosas e terapia antimicrobiana',
    description:
      'Raciocínio por foco infeccioso, gravidade, coleta de cultura e desescalonamento.',
    status: 'placeholder',
    note: 'A conduta deve ser individualizada conforme o paciente e o protocolo local.',
  },
  'ref_registry.molecules_v2_sheets': {
    key: 'ref_registry.molecules_v2_sheets',
    domain: 'molecules_v2',
    title: 'Monografias de antimicrobianos',
    description:
      'Espectro, farmacocinética, farmacodinâmica, doses, cautelas e monitorização; confirmar bula e protocolo local.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'As recomendações institucionais são indicadas quando disponíveis.',
  },
  'ref_registry.microbiology_v2_general': {
    key: 'ref_registry.microbiology_v2_general',
    domain: 'microbiology_v2',
    title: 'Microbiologia clínica e resistência',
    description: 'Perfis de patógenos e conceitos de resistência para apoio ao raciocínio clínico e ao uso racional de antimicrobianos.',
    status: 'placeholder',
  },
  'ref_registry.microbiology_v2_resistance': {
    key: 'ref_registry.microbiology_v2_resistance',
    domain: 'microbiology_v2',
    title: 'Conceitos de resistência (MRSP, ESBL, etc.)',
    description:
      'Definições clínicas de resistência e sua relação com a escolha e o uso racional de antimicrobianos.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Interpretar em conjunto com cultura, antibiograma e contexto clínico.',
  },
  'ref_registry.microbiology_v2_sampling': {
    key: 'ref_registry.microbiology_v2_sampling',
    domain: 'microbiology_v2',
    title: 'Amostragem e interpretação',
    description: 'Boas práticas de coleta, transporte, cultura, antibiograma e interpretação clínica.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Alinhar a coleta aos manuais laboratoriais e ao protocolo institucional.',
  },
  'ref_registry.hospital_culture_timing': {
    key: 'ref_registry.hospital_culture_timing',
    domain: 'hospital_institutional_pending',
    title: 'Momento da cultura e início do antimicrobiano',
    description:
      'Como conciliar coleta adequada, gravidade clínica e início oportuno da terapia.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Em pacientes instáveis, a estabilização e a terapia não devem ser atrasadas indevidamente.',
  },
  'ref_registry.hospital_stewardship_core': {
    key: 'ref_registry.hospital_stewardship_core',
    domain: 'hospital_institutional_pending',
    title: 'Uso racional de antimicrobianos',
    description:
      'Seleção, reavaliação, descalonamento e duração do tratamento com foco em segurança.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'A decisão final depende do foco, da cultura, da resposta e do protocolo local.',
  },
  'ref_registry.hospital_institutional_pending': {
    key: 'ref_registry.hospital_institutional_pending',
    domain: 'hospital_institutional_pending',
    title: 'Prevenção e controle de infecção hospitalar',
    description:
      'Medidas de vigilância, isolamento, higiene e prevenção da transmissão hospitalar.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Referência institucional para medidas de prevenção e controle.',
  },
  /** Síntese educacional das fichas de fisiopatologia — metadado; PDFs dos manuais não são distribuídos no app. */
  'ref_registry.textbook_nelson_couto_siim_6': {
    key: 'ref_registry.textbook_nelson_couto_siim_6',
    domain: 'clinical_v2',
    title: 'Nelson & Couto — Small Animal Internal Medicine (6.ª ed.)',
    description:
      'Base conceitual para condições sistêmicas, reprodutivas e infecciosas descritas nas fichas.',
    status: 'placeholder',
    note: 'Referência de medicina interna para raciocínio clínico, diagnóstico e tratamento.',
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
    note: 'A neurologia contribui para a avaliação de complicações infecciosas e inflamatórias.',
  },
  'ref_registry.pathophysiology_excluded_pathologic_basis': {
    key: 'ref_registry.pathophysiology_excluded_pathologic_basis',
    domain: 'clinical_v2',
    title: 'Pathologic Basis of Veterinary Disease',
    description:
      'Referência para mecanismos de lesão tecidual e fundamentos anatomopatológicos.',
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
    label: 'Literatura clínica',
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
    label: 'Antimicrobianos',
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
    label: 'Hospital e controle de infecção',
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
