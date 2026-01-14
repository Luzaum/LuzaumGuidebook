import type { DosePreset } from '../../types/presets'

export const dobutaminePresets: DosePreset[] = [
  {
    id: 'dobu_start',
    label: 'Start (cão/gato)',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 1,
    tags: ['start', 'inotrópico'],
    note: 'Dose inicial. Titular conforme resposta a cada 15–30 min.',
  },
  {
    id: 'dobu_suporte_cao',
    label: 'Suporte inotrópico (cão) – meio termo',
    mode: 'CRI',
    species: 'dog',
    unit: 'mcg/kg/min',
    value: 7.5,
    tags: ['inotrópico', 'cão', 'meio_termo'],
    note: 'Dose intermediária para suporte inotrópico em cães.',
  },
  {
    id: 'dobu_alto_cao',
    label: 'Alvo alto (cão) – se necessário',
    mode: 'CRI',
    species: 'dog',
    unit: 'mcg/kg/min',
    value: 15,
    tags: ['inotrópico', 'cão', 'alto'],
    note: 'Dose alta para casos que necessitam maior suporte inotrópico. Monitorar ECG.',
  },
  {
    id: 'dobu_teto_gato',
    label: 'Teto ref (gato)',
    mode: 'CRI',
    species: 'cat',
    unit: 'mcg/kg/min',
    value: 10,
    tags: ['inotrópico', 'gato', 'teto'],
    note: 'Teto de referência para gatos. Em doses altas pode causar tremores/convulsões.',
  },
]
