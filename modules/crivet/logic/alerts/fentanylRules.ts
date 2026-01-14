import type { DrugRule } from '../../types/patientFlags'

export const FENTANYL_RULES: DrugRule[] = [
  {
    drugId: 'fentanil',
    when: ['tce_pic'],
    alert: {
      level: 'warning',
      title: 'TCE/PIC × Fentanil',
      short: 'Pode elevar PIC indiretamente se hipoventilar (CO₂↑). Usar com ventilação/ETCO₂.',
      why: ['Hipoventilação → hipercapnia → vasodilatação cerebral → PIC↑.'],
      actions: ['Se usar, preferir paciente intubado/ventilado; monitorar ETCO₂ e nível de sedação.'],
    },
  },
  {
    drugId: 'fentanil',
    when: ['hepatopata'],
    alert: {
      level: 'warning',
      title: 'Hepatopatia × Fentanil',
      short: 'Metabolismo hepático: risco de recuperação prolongada. Reduzir 25–50% e titular.',
      why: ['Clearance hepático reduzido pode prolongar efeito, especialmente em infusões longas.'],
      actions: ['Reduzir taxa e reavaliar frequentemente; considerar remifentanil se disponível.'],
    },
  },
  {
    drugId: 'fentanil',
    when: ['sepse'],
    alert: {
      level: 'warning',
      title: 'Sepse × Fentanil',
      short: 'Resposta imprevisível: sedação pode ser mais forte. Titular em pequenos ajustes.',
      why: ['Albumina↓/acidose alteram fração livre e efeito no SNC.'],
      actions: ['Preferir titulação lenta; monitorar ventilação e perfusão.'],
    },
  },
  {
    drugId: 'fentanil',
    when: ['cardiopata_icc'],
    alert: {
      level: 'info',
      title: 'ICC × Fentanil',
      short: 'Em geral é opioide seguro hemodinamicamente. Vigiar bradicardia.',
      why: ['Menos tendência a hipotensão por histamina vs morfina.'],
      actions: ['Monitorar FC; considerar anticolinérgico se bradicardia clinicamente relevante.'],
    },
  },
]
