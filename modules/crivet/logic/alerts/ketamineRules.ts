import type { DrugRule } from '../../types/patientFlags'

export const KETAMINE_RULES: DrugRule[] = [
  {
    drugId: 'cetamina',
    when: ['cardiopata_icc'],
    alert: {
      level: 'warning',
      title: 'ICC/Doença cardíaca × Cetamina',
      short: 'Pode aumentar demanda miocárdica (FC/PA). Cautela em CMH/estenose.',
      why: ['Estímulo simpático aumenta consumo de O₂ e trabalho cardíaco.'],
      actions: [
        'Evitar em cardiopatia descompensada; se usar, doses baixas e monitorização rigorosa.',
      ],
    },
  },
  {
    drugId: 'cetamina',
    when: ['tce_pic'],
    alert: {
      level: 'warning',
      title: 'TCE/PIC × Cetamina',
      short: 'Cautela: usar preferencialmente com ventilação/monitorização. Titular.',
      why: ['Historicamente controversa; risco maior se hipoventilar/hipercapnia.'],
      actions: ['Se usar, manter ventilação e ETCO₂; evitar bolus rápido; monitorar PA e neurologia.'],
    },
  },
  {
    drugId: 'cetamina',
    when: ['glaucoma'],
    alert: {
      level: 'critical',
      title: 'Glaucoma/lesão ocular × Cetamina',
      short: 'Evitar: pode aumentar pressão intraocular e piorar condição ocular.',
      why: ['Pode aumentar PIO e causar nistagmo/hipertonia.'],
      actions: ['Preferir outra estratégia anestésica/sedativa.'],
    },
  },
  {
    drugId: 'cetamina',
    when: ['renopata'],
    alert: {
      level: 'warning',
      title: 'Renopatia (gatos) × Cetamina',
      short: 'Em gatos, excreção renal pode prolongar efeito. Reduzir dose/evitar CRI prolongada.',
      why: ['Eliminação e/ou metabólitos podem prolongar sedação em disfunção renal.'],
      actions: [
        'Preferir doses mais baixas e monitorar recuperação; evitar se anúrico/obstruído.',
      ],
    },
  },
]
