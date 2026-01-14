import type { DrugRule } from '../../types/patientFlags'

export const DEXMEDETOMIDINE_RULES: DrugRule[] = [
  {
    drugId: 'dexmedetomidina',
    when: ['cardiopata_icc'],
    alert: {
      level: 'critical',
      title: 'ICC descompensada × Dexmedetomidina',
      short: 'Aumenta pós-carga e reduz débito cardíaco. Evitar em ICC descompensada.',
      why: [
        'Vasoconstrição periférica aumenta resistência vascular sistêmica (pós-carga).',
        'Redução do débito cardíaco pode piorar insuficiência cardíaca.',
      ],
      actions: [
        'Evitar em cardiopatia descompensada/ICC grave.',
        'Se inevitável: doses muito baixas, monitorização intensiva de FC/PA.',
        'Preferir alternativas hemodinamicamente neutras.',
      ],
    },
  },
]
