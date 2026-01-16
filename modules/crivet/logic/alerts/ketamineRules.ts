import type { DrugRule } from '../../types/patientFlags'

export const KETAMINE_RULES: DrugRule[] = [
  {
    drugId: 'cetamina',
    when: ['cardiopata_icc'],
    alert: {
      level: 'warning',
      title: 'Cardiopatia × Cetamina',
      short: 'Pode aumentar FC/PA e demanda miocárdica. Cautela em CMH felina.',
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
      level: 'warning',
      title: 'Glaucoma/lesão ocular × Cetamina',
      short: 'Pode aumentar pressão intraocular. Evitar quando houver alternativa.',
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
  {
    drugId: 'cetamina',
    when: ['convulsao_nao_controlada'],
    alert: {
      level: 'warning',
      title: 'Convulsões não controladas × Cetamina',
      short: 'Pode reduzir limiar convulsivo; associar benzodiazepínico.',
      why: ['Pode precipitar/exacerbar atividade convulsiva em alguns cenários.'],
      actions: ['Associar midazolam e evitar doses altas/isoladas.'],
    },
  },
]
