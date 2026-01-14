import type { DosePreset } from '../../types/presets'

export const norepinephrinePresets: DosePreset[] = [
  {
    id: 'norepi_start',
    label: 'Start (cão/gato)',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 0.05,
    tags: ['start', 'vasopressor'],
    note: 'Dose inicial. Após otimização volêmica. Monitorar MAP invasiva.',
  },
  {
    id: 'norepi_meio_termo',
    label: 'Meio termo',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 0.2,
    tags: ['vasopressor', 'meio_termo'],
    note: 'Dose intermediária. Titular por MAP e perfusão (lactato, diurese).',
  },
  {
    id: 'norepi_alto',
    label: 'Alto (se necessário)',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 0.4,
    tags: ['vasopressor', 'alto'],
    note: 'Dose alta. Reavaliar volume responsivo e considerar vasopressina adjuvante se doses sobem muito.',
  },
]
