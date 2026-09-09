import type { ReferenceDomain, ReferenceGroupV2, SourceEntryV2 } from '../model/institutional'
import { INSTITUTIONAL_SOURCE_CCIH_2024 } from './sourceRegistry'

/**
 * Registro canÃ´nico de fontes do mÃ³dulo (chaves estÃ¡veis para fichas v2).
 * Fontes institucionais versionadas: metadado completo em sourceRegistry.ts.
 */
export const SOURCE_REGISTRY: Record<string, SourceEntryV2> = {
  'ref_registry.institutional_ccih_2024': {
    key: 'ref_registry.institutional_ccih_2024',
    domain: 'institutional_versioned',
    title: 'Guia de Uso de Antimicrobianos e Controle de InfecÃ§Ã£o Hospitalar â€” HV-UFMG (EdiÃ§Ã£o 2026)',
    description:
      'Diretriz da CCIH do Hospital VeterinÃ¡rio da UFMG (Portaria NÂ°9737) com regras de uso racional, condutas empÃ­ricas e dirigidas, desescalonamento e doses.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Diretriz institucional de 03 de Julho de 2026 com tabela completa de afecÃ§Ãµes e tratamentos.',
  },
  'ref_registry.clinical_syndromes_v2': {
    key: 'ref_registry.clinical_syndromes_v2',
    domain: 'clinical_v2',
    title: 'SÃ­ndromes infecciosas e terapia antimicrobiana',
    description:
      'RaciocÃ­nio por foco infeccioso, gravidade, coleta de cultura e desescalonamento.',
    status: 'placeholder',
    note: 'A conduta deve ser individualizada conforme o paciente e o protocolo local.',
  },
  'ref_registry.molecules_v2_sheets': {
    key: 'ref_registry.molecules_v2_sheets',
    domain: 'molecules_v2',
    title: 'Monografias de antimicrobianos',
    description:
      'Espectro, farmacocinÃ©tica, farmacodinÃ¢mica, doses, cautelas e monitorizaÃ§Ã£o; confirmar bula e protocolo local.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'As recomendaÃ§Ãµes institucionais sÃ£o indicadas quando disponÃ­veis.',
  },
  'ref_registry.microbiology_v2_general': {
    key: 'ref_registry.microbiology_v2_general',
    domain: 'microbiology_v2',
    title: 'Microbiologia clÃ­nica e resistÃªncia',
    description: 'Perfis de patÃ³genos e conceitos de resistÃªncia para apoio ao raciocÃ­nio clÃ­nico e ao uso racional de antimicrobianos.',
    status: 'placeholder',
  },
  'ref_registry.microbiology_v2_resistance': {
    key: 'ref_registry.microbiology_v2_resistance',
    domain: 'microbiology_v2',
    title: 'Conceitos de resistÃªncia (MRSP, ESBL, etc.)',
    description:
      'DefiniÃ§Ãµes clÃ­nicas de resistÃªncia e sua relaÃ§Ã£o com a escolha e o uso racional de antimicrobianos.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Interpretar em conjunto com cultura, antibiograma e contexto clÃ­nico.',
  },
  'ref_registry.microbiology_v2_sampling': {
    key: 'ref_registry.microbiology_v2_sampling',
    domain: 'microbiology_v2',
    title: 'Amostragem e interpretaÃ§Ã£o',
    description: 'Boas prÃ¡ticas de coleta, transporte, cultura, antibiograma e interpretaÃ§Ã£o clÃ­nica.',
    status: 'placeholder',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Alinhar a coleta aos manuais laboratoriais e ao protocolo institucional.',
  },
  'ref_registry.hospital_culture_timing': {
    key: 'ref_registry.hospital_culture_timing',
    domain: 'hospital_institutional_pending',
    title: 'Momento da cultura e inÃ­cio do antimicrobiano',
    description:
      'Como conciliar coleta adequada, gravidade clÃ­nica e inÃ­cio oportuno da terapia.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'Em pacientes instÃ¡veis, a estabilizaÃ§Ã£o e a terapia nÃ£o devem ser atrasadas indevidamente.',
  },
  'ref_registry.hospital_stewardship_core': {
    key: 'ref_registry.hospital_stewardship_core',
    domain: 'hospital_institutional_pending',
    title: 'Uso racional de antimicrobianos',
    description:
      'SeleÃ§Ã£o, reavaliaÃ§Ã£o, descalonamento e duraÃ§Ã£o do tratamento com foco em seguranÃ§a.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'A decisÃ£o final depende do foco, da cultura, da resposta e do protocolo local.',
  },
  'ref_registry.hospital_institutional_pending': {
    key: 'ref_registry.hospital_institutional_pending',
    domain: 'hospital_institutional_pending',
    title: 'PrevenÃ§Ã£o e controle de infecÃ§Ã£o hospitalar',
    description:
      'Medidas de vigilÃ¢ncia, isolamento, higiene e prevenÃ§Ã£o da transmissÃ£o hospitalar.',
    status: 'versioned_restricted_metadata',
    versionedSourceId: INSTITUTIONAL_SOURCE_CCIH_2024,
    note: 'ReferÃªncia institucional para medidas de prevenÃ§Ã£o e controle.',
  },
  /** SÃ­ntese educacional das fichas de fisiopatologia â€” metadado; PDFs dos manuais nÃ£o sÃ£o distribuÃ­dos no app. */
  'ref_registry.textbook_nelson_couto_siim_6': {
    key: 'ref_registry.textbook_nelson_couto_siim_6',
    domain: 'clinical_v2',
    title: 'Nelson & Couto â€” Small Animal Internal Medicine (6.Âª ed.)',
    description:
      'Base conceitual para condiÃ§Ãµes sistÃªmicas, reprodutivas e infecciosas descritas nas fichas.',
    status: 'placeholder',
    note: 'ReferÃªncia de medicina interna para raciocÃ­nio clÃ­nico, diagnÃ³stico e tratamento.',
  },
  'ref_registry.textbook_cunningham_physiology_6': {
    key: 'ref_registry.textbook_cunningham_physiology_6',
    domain: 'clinical_v2',
    title: "Cunningham's Textbook of Veterinary Physiology (6.Âª ed.)",
    description:
      'Fundamentos de inflamaÃ§Ã£o sistÃ©mica, febre, resposta vascular e fisiologia respiratÃ³ria integrados nas explicaÃ§Ãµes de sepse e pneumonia.',
    status: 'placeholder',
    note: 'SÃ­ntese educacional; doses e decisÃµes seguem bula e protocolo local.',
  },
  'ref_registry.textbook_neuro_practical_3': {
    key: 'ref_registry.textbook_neuro_practical_3',
    domain: 'clinical_v2',
    title: 'Practical Guide to Canine and Feline Neurology (3.Âª ed.)',
    description:
      'ReferÃªncia para localizaÃ§Ã£o neurolÃ³gica e abordagem de processos neurolÃ³gicos infecciosos/inflamatÃ³rios quando relevantes ao raciocÃ­nio clÃ­nico global do doente sÃ©ptico ou com complicaÃ§Ãµes neurolÃ³gicas.',
    status: 'placeholder',
    note: 'A neurologia contribui para a avaliaÃ§Ã£o de complicaÃ§Ãµes infecciosas e inflamatÃ³rias.',
  },
  'ref_registry.pathophysiology_excluded_pathologic_basis': {
    key: 'ref_registry.pathophysiology_excluded_pathologic_basis',
    domain: 'clinical_v2',
    title: 'Pathologic Basis of Veterinary Disease',
    description:
      'ReferÃªncia para mecanismos de lesÃ£o tecidual e fundamentos anatomopatolÃ³gicos.',
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
    label: 'Literatura clÃ­nica',
    sourceKeys: ['ref_registry.clinical_syndromes_v2'],
  },
  {
    domain: 'clinical_v2',
    label: 'Literatura de apoio â€” sÃ­ntese das fichas de fisiopatologia',
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
    label: 'Microbiologia e resistÃªncia',
    sourceKeys: [
      'ref_registry.microbiology_v2_general',
      'ref_registry.microbiology_v2_resistance',
      'ref_registry.microbiology_v2_sampling',
    ],
  },
  {
    domain: 'hospital_institutional_pending',
    label: 'Hospital e controle de infecÃ§Ã£o',
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
