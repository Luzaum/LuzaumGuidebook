import type { DrugRule } from '../../types/patientFlags'

export const MIDAZOLAM_RULES: DrugRule[] = [
  {
    drugId: 'midazolam',
    when: ['hepatopata'],
    alert: {
      level: 'critical',
      title: 'Hepatopatia × Midazolam',
      short: 'Risco de sedação profunda prolongada e encefalopatia. Evitar ou reduzir drasticamente.',
      why: [
        'Depende de biotransformação hepática; clearance cai e meia-vida aumenta.',
        'Benzodiazepínicos podem piorar encefalopatia hepática via potencialização GABA.',
      ],
      actions: [
        'Evitar em suspeita de encefalopatia hepática/shunt.',
        'Se inevitável: reduzir 50–75% e titular; ter flumazenil disponível.',
        'Monitorar ventilação e recuperação.',
      ],
    },
  },
  {
    drugId: 'midazolam',
    when: ['shunt'],
    alert: {
      level: 'critical',
      title: 'Shunt × Midazolam',
      short: 'Evitar: alto risco de precipitar/agravar encefalopatia hepática e recuperação prolongada.',
      why: ['Shunt reduz metabolismo de primeira passagem e clearance hepático efetivo.'],
      actions: [
        'Preferir alternativas; se usar, reduzir agressivamente e titular; considerar flumazenil.',
      ],
    },
  },
  {
    drugId: 'midazolam',
    when: ['geriatrico'],
    alert: {
      level: 'warning',
      title: 'Geriátrico × Midazolam',
      short: 'Maior sensibilidade do SNC. Começar 20–50% abaixo e titular.',
      why: ['SNC mais sensível e perfusão hepática/renal reduzida.'],
      actions: [
        'Iniciar baixo, titular ao efeito; monitorar ventilação sobretudo se associado a opioide.',
      ],
    },
  },
  {
    drugId: 'midazolam',
    when: ['neonato'],
    alert: {
      level: 'warning',
      title: 'Neonato × Midazolam',
      short: 'Risco de acúmulo (clearance imaturo). Reduzir CRI e monitorar glicemia/ventilação.',
      why: ['CYP/TFG imaturos e BHE mais permeável.'],
      actions: ['Reduzir CRI (~50% como regra inicial) e titular; monitorar glicemia e respiração.'],
    },
  },
]
