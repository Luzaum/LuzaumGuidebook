import type { DosePreset } from '../../types/presets'

export const fentanylPresets: DosePreset[] = [
  {
    id: 'fent_analgesia_leve_cao',
    label: 'Analgesia leve (cão)',
    dose: 3,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'cão', 'baixa'],
    note: 'Faixa comum de analgesia/UTI. Início de ação 1–2 min.',
  },
  {
    id: 'fent_analgesia_intensa_cao',
    label: 'Analgesia intensa/trauma (cão)',
    dose: 7,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'cão', 'alta', 'trauma'],
    note: 'Faixa superior de analgesia. Monitorar ventilação.',
  },
  {
    id: 'fent_analgesia_gato_low',
    label: 'Analgesia padrão (gato - low)',
    dose: 2,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'gato', 'baixa'],
    note: 'Dose conservadora para gatos. Monitorar recuperação.',
  },
  {
    id: 'fent_analgesia_gato',
    label: 'Analgesia padrão (gato)',
    dose: 4,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'gato'],
    note: 'Faixa prática para analgesia em gatos.',
  },
  {
    id: 'fent_intraop_cao',
    label: 'Intra-operatório (cão ventilado)',
    dose: 10,
    unit: 'mcg/kg/h',
    tags: ['anestesia', 'cão', 'ventilado', 'intraop'],
    note: 'Dose mais alta → ideal com via aérea protegida.',
  },
]
