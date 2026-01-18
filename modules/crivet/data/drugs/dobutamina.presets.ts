import type { DosePreset } from '../../types/presets'

export const dobutaminePresets: DosePreset[] = [
  {
    id: 'dobu_start_low_cao',
    label: 'Start Low (Cão)',
    mode: 'CRI',
    species: 'dog',
    unit: 'mcg/kg/min',
    value: 2.5,
    tags: ['start', 'inotrópico', 'cão'],
    note: 'Dose inicial conservadora. Titular +2.5 µg/kg/min a cada 15–30 min conforme resposta.',
  },
  {
    id: 'dobu_suporte_cardiaco_cao',
    label: 'Suporte Cardíaco (Cão)',
    mode: 'CRI',
    species: 'dog',
    unit: 'mcg/kg/min',
    value: 7.5,
    tags: ['inotrópico', 'cão', 'meio_termo'],
    note: 'Dose de manutenção para suporte inotrópico em cães. Monitorar ECG e perfusão.',
  },
  {
    id: 'dobu_felino_seguro',
    label: 'Felino Seguro',
    mode: 'CRI',
    species: 'cat',
    unit: 'mcg/kg/min',
    value: 1.0,
    tags: ['inotrópico', 'gato', 'start'],
    note: 'Dose inicial segura para gatos. Titular com extrema cautela (+0.5 µg/kg/min). Monitorar sinais neurológicos.',
  },
  {
    id: 'dobu_felino_teto',
    label: 'Felino Teto',
    mode: 'CRI',
    species: 'cat',
    unit: 'mcg/kg/min',
    value: 4.0,
    tags: ['inotrópico', 'gato', 'teto'],
    note: 'Próximo ao teto absoluto (5.0 µg/kg/min). RISCO ALTO de tremor/convulsão. Desligar imediatamente se surgirem sinais neurológicos.',
  },
]
