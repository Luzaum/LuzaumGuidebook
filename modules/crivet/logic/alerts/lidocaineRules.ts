import type { DrugRule } from '../../types/patientFlags'

export const LIDOCAINE_RULES: DrugRule[] = [
  {
    drugId: 'lidocaina',
    when: ['hepatopata'],
    alert: {
      level: 'critical',
      title: 'Hepatopatia × Lidocaína',
      short: 'Risco de neurotoxicidade e convulsões. Reduzir 50–70% ou evitar.',
      why: [
        'Metabolismo hepático extenso; clearance reduzido aumenta meia-vida e concentrações plasmáticas.',
        'Em insuficiência hepática, risco de acúmulo e toxicidade neurológica (convulsões, tremores).',
      ],
      actions: [
        'Reduzir CRI em 50–70% ou evitar em hepatopatia grave.',
        'Monitorar sinais neurológicos (tremores, convulsões).',
        'Preferir alternativas com metabolismo extra-hepático.',
      ],
    },
  },
]
