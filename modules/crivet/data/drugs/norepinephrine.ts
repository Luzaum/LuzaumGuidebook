import type { IndicatedDose } from '../../types/drug'

export const norepinephrinePresentations = [
  { label: 'Norepinefrina 1 mg/mL (ampola 4 mL = 4 mg)', mgPerMl: 1 },
  { label: 'Norepinefrina 2 mg/mL', mgPerMl: 2 },
]

export const norepinephrineDoses = {
  dog: {
    criStart: { min: 0.05, max: 0.1, unit: 'mcg/kg/min' as const },
    criUsual: { min: 0.1, max: 1.0, unit: 'mcg/kg/min' as const },
    criMax: { max: 3.0, unit: 'mcg/kg/min' as const },
    titration: 'Aumentar 0.05 mcg/kg/min a cada 5–10 min conforme resposta',
    alert: 'Choque refratário: até 1.0–3.0 mcg/kg/min. Reavaliar volume responsivo e considerar vasopressina adjuvante.',
  },
  cat: {
    criStart: { min: 0.05, max: 0.1, unit: 'mcg/kg/min' as const },
    criUsual: { min: 0.1, max: 0.5, unit: 'mcg/kg/min' as const },
    criMax: { max: 0.5, unit: 'mcg/kg/min' as const },
    titration: 'Aumentar 0.05 mcg/kg/min a cada 5–10 min conforme resposta',
    alert: 'Gatos são mais sensíveis à vasoconstrição renal. Monitorar débito urinário rigorosamente. Teto: 0.5 mcg/kg/min.',
  },
}

export const norepinephrineRecommendedUnit = 'mcg/kg/min'
export const norepinephrineRecommendedUnitWhy = [
  'Unidade padrão para vasopressores em CRI.',
  'Dose é por MINUTO, não por hora.',
  'Facilita titulação por MAP e perfusão.',
  'Permite ajuste fino conforme resposta clínica (lactato, diurese, extremidades).',
]

export const norepinephrineIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão - Inicial
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.1 },
    purpose: 'Dose inicial - Choque distributivo/vasoplegia',
    note: 'Iniciar após otimização volêmica. Titular +0.05 mcg/kg/min a cada 5–10 min. Monitorar MAP invasiva (alvo: ≥65 mmHg) e perfusão (lactato, diurese, extremidades).',
  },
  // CRI - Cão - Manutenção
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.1, max: 1.0 },
    purpose: 'Manutenção usual - Choque distributivo/vasoplegia',
    note: 'Dose de manutenção após resposta inicial. Continuar monitoramento MAP e perfusão. Reavaliar volume responsivo se doses sobem.',
  },
  // CRI - Cão - Choque Refratário
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 1.0, max: 3.0 },
    purpose: 'Choque refratário - Doses altas',
    note: 'Usar apenas em choque refratário após otimização volêmica. Reavaliar volume responsivo e considerar vasopressina adjuvante se doses sobem muito. Monitoramento intensivo obrigatório.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.5 },
    purpose: 'Choque distributivo/vasoplegia (gatos mais sensíveis)',
    note: 'Gatos são mais sensíveis à vasoconstrição renal. Iniciar 0.05–0.1 mcg/kg/min. Titular +0.05 mcg/kg/min a cada 5–10 min. Monitorar débito urinário rigorosamente. Teto absoluto: 0.5 mcg/kg/min. Alvo MAP: ≥60 mmHg.',
  },
]

