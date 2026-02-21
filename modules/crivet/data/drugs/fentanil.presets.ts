import type { DosePreset } from '../../types/presets'

export const fentanylPresets: DosePreset[] = [
  {
    id: 'fent_analgesia_leve_cao',
    label: 'Analgesia leve (cão)',
    mode: 'CRI',
    value: 3,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'cão', 'baixa'],
    note: 'Faixa comum de analgesia/UTI. Início de ação 1–2 min.',
  },
  {
    id: 'fent_analgesia_intensa_cao',
    label: 'Analgesia intensa/trauma (cão)',
    mode: 'CRI',
    value: 7,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'cão', 'alta', 'trauma'],
    note: 'Faixa superior de analgesia. Monitorar ventilação.',
  },
  {
    id: 'fent_analgesia_gato_low',
    label: 'Analgesia padrão (gato - low)',
    mode: 'CRI',
    value: 2,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'gato', 'baixa'],
    note: 'Dose conservadora para gatos. Monitorar recuperação.',
  },
  {
    id: 'fent_analgesia_gato',
    label: 'Analgesia padrão (gato)',
    mode: 'CRI',
    value: 4,
    unit: 'mcg/kg/h',
    tags: ['analgesia', 'gato'],
    note: 'Faixa prática para analgesia em gatos.',
  },
  {
    id: 'fent_intraop_cao',
    label: 'Intra-operatório (cão ventilado)',
    mode: 'CRI',
    value: 10,
    unit: 'mcg/kg/h',
    tags: ['anestesia', 'cão', 'ventilado', 'intraop'],
    note: 'Dose mais alta → ideal com via aérea protegida.',
  },
]
