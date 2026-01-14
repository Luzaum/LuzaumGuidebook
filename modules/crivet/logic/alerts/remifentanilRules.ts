import type { DrugRule } from '../../types/patientFlags'

export const REMIFENTANIL_RULES: DrugRule[] = [
  {
    drugId: 'remifentanil',
    when: ['hepatopata'],
    alert: {
      level: 'info',
      title: 'Hepatopatia × Remifentanil',
      short: 'Ótima escolha: metabolizado por esterases, independente do fígado.',
      why: ['Hidrólise por esterases plasmáticas/teciduais → clearance preservado.'],
      actions: ['Manter titulação por efeito; planejar analgesia de transição antes de desligar.'],
    },
  },
  {
    drugId: 'remifentanil',
    when: ['renopata'],
    alert: {
      level: 'info',
      title: 'Renopatia × Remifentanil',
      short: 'Ótima escolha: efeito termina em minutos após desligar.',
      why: ['Metabólitos são inativos; principal efeito não depende do rim.'],
      actions: [
        'Monitorar ventilação; lembrar que não há efeito residual (fazer transição analgésica).',
      ],
    },
  },
  {
    drugId: 'remifentanil',
    when: ['cardiopata_icc'],
    alert: {
      level: 'warning',
      title: 'ICC × Remifentanil',
      short: 'Muito vagotônico: risco de bradicardia. Tenha atropina/glico à mão.',
      why: ['Opioide µ potente pode aumentar tônus vagal.'],
      actions: ['Monitorar FC/ECG; titulação cuidadosa; anticolinérgico se necessário.'],
    },
  },
]
