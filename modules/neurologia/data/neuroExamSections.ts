/**
 * Única fonte de verdade: secções do exame neurológico (Step3, exame rápido, relatório rápido).
 */

export type NeuroExamSectionId = 1 | 2 | 3 | 4 | 5 | 6

export type NeuroExamSectionConfig = {
  id: NeuroExamSectionId
  /** Navegação / chips (exame rápido) */
  short: string
  /** Cabeçalho da secção no formulário */
  title: string
  /** Nome em relatórios (junto a “secção N”) */
  reportTitle: string
  /** Campos `neuroExam` desta secção */
  examKeys: readonly string[]
}

export const NEURO_EXAM_SECTIONS: readonly NeuroExamSectionConfig[] = [
  {
    id: 1,
    short: 'Mentação',
    title: '1. Mentação e Comportamento',
    reportTitle: 'Mentação e comportamento',
    examKeys: ['mentation', 'behavior', 'head_posture'],
  },
  {
    id: 2,
    short: 'Marcha',
    title: '2. Marcha e Postura',
    reportTitle: 'Marcha e postura',
    examKeys: ['ambulation', 'gait_thoracic', 'gait_pelvic', 'ataxia_type'],
  },
  {
    id: 3,
    short: 'Propriocep.',
    title: '3. Reações Posturais (Propriocepção)',
    reportTitle: 'Reações posturais (propriocepção)',
    examKeys: [
      'proprioception_thoracic_left',
      'proprioception_thoracic_right',
      'proprioception_pelvic_left',
      'proprioception_pelvic_right',
    ],
  },
  {
    id: 4,
    short: 'NC',
    title: '4. Nervos Cranianos',
    reportTitle: 'Nervos cranianos',
    examKeys: [
      'menace_left',
      'menace_right',
      'plr_left',
      'plr_right',
      'nystagmus',
      'strabismus',
      'cn_facial_sensation',
      'cn_swallowing',
    ],
  },
  {
    id: 5,
    short: 'Reflexos',
    title: '5. Reflexos Espinhais',
    reportTitle: 'Reflexos espinhais',
    examKeys: [
      'reflex_patellar_left',
      'reflex_patellar_right',
      'reflex_withdrawal_left_thoracic',
      'reflex_withdrawal_right_thoracic',
      'reflex_panniculus',
    ],
  },
  {
    id: 6,
    short: 'Dor',
    title: '6. Dor e Nocicepção',
    reportTitle: 'Dor e nocicepção',
    examKeys: ['deep_pain', 'pain_cervical', 'pain_thoracolumbar', 'pain_lumbosacral'],
  },
] as const

export const NEURO_EXAM_SECTION_BY_ID: Record<NeuroExamSectionId, NeuroExamSectionConfig> =
  NEURO_EXAM_SECTIONS.reduce(
    (acc, s) => {
      acc[s.id] = s
      return acc
    },
    {} as Record<NeuroExamSectionId, NeuroExamSectionConfig>,
  )

/** Mapa usado pelo relatório rápido por secção */
export const EXAM_KEYS_BY_NEURO_SECTION: Record<NeuroExamSectionId, string[]> = NEURO_EXAM_SECTIONS.reduce(
  (acc, s) => {
    acc[s.id] = [...s.examKeys]
    return acc
  },
  {} as Record<NeuroExamSectionId, string[]>,
)

export function getNeuroExamSectionTitle(sectionId: NeuroExamSectionId): string {
  return NEURO_EXAM_SECTION_BY_ID[sectionId].title
}

export function getNeuroExamReportTitle(sectionId: NeuroExamSectionId): string {
  return NEURO_EXAM_SECTION_BY_ID[sectionId].reportTitle
}
