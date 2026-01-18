import type { DosePreset } from '../../types/presets'

export const norepinephrinePresets: DosePreset[] = [
  {
    id: 'norepi_start_septico',
    label: 'Start Low (Séptico Inicial)',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 0.1,
    tags: ['start', 'vasopressor', 'sepse'],
    note: 'Dose inicial para choque séptico após otimização volêmica. Titular +0.05 mcg/kg/min a cada 5–10 min por MAP (alvo: ≥65 mmHg cães, ≥60 mmHg gatos).',
  },
  {
    id: 'norepi_hipotensao_anestesica',
    label: 'Hipotensão Anestésica',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 0.05,
    tags: ['start', 'vasopressor', 'anestesia'],
    note: 'Dose inicial para hipotensão refratária a fluido durante anestesia. Titular conforme resposta MAP.',
  },
  {
    id: 'norepi_choque_pos_volume',
    label: 'Choque Grave Pós-Volume',
    mode: 'CRI',
    species: 'both' as const,
    unit: 'mcg/kg/min',
    value: 0.5,
    tags: ['vasopressor', 'choque', 'dose_alta'],
    note: 'Para choque refratário após otimização volêmica. Reavaliar volume responsivo. Monitoramento intensivo MAP e perfusão (lactato, diurese, extremidades).',
  },
  {
    id: 'norepi_rescue_dose',
    label: 'Rescue Dose',
    mode: 'CRI',
    species: 'dog' as const,
    unit: 'mcg/kg/min',
    value: 1.5,
    tags: ['vasopressor', 'rescue', 'dose_muito_alta'],
    note: 'Dose de resgate para choque refratário extremo (apenas cães). Considerar vasopressina adjuvante. Reavaliar estratégia se doses sobem muito. Teto: 3.0 mcg/kg/min.',
  },
]
