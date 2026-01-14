import type { DrugRule } from '../../types/patientFlags'

export const METOCLOPRAMIDE_RULES: DrugRule[] = [
  {
    drugId: 'metoclopramida',
    when: ['renopata'],
    alert: {
      level: 'warning',
      title: 'Renopatia × Metoclopramida',
      short: 'Risco de efeitos extrapiramidais. Reduzir ~50% e monitorar.',
      why: [
        'Excreção renal; em insuficiência renal, meia-vida aumenta.',
        'Metabólitos podem causar sinais extrapiramidais (tremores, rigidez).',
      ],
      actions: [
        'Reduzir dose em ~50% em insuficiência renal.',
        'Monitorar sinais neurológicos (tremores, rigidez).',
        'Evitar em anúricos/obstrução urinária grave.',
      ],
    },
  },
]
