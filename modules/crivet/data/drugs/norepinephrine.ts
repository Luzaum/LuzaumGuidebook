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
  'Vasopressor de escolha em choque vasodilatado; titulação por minuto.',
]

export const norepinephrineIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.1, max: 1.0 },
    purpose: 'Vasopressor (faixa comum)',
    routine_default: '0.1 mcg/kg/min',
    note: 'Iniciar 0.05-0.1 após volume. Titular MAP ≥65 mmHg. Manter até 2.0 mcg/kg/min como preset alto com alerta.',
  },
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 0.1, max: 2.0 },
    purpose: 'Vasopressor (faixa reportada alta)',
    routine_default: '0.1 mcg/kg/min',
    note: 'Usar alertas de hipoperfusão periférica/vasoconstrição excessiva. Considerar vasopressina se >1-2 mcg/kg/min.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 0.05, max: 0.5 },
    purpose: 'Choque distributivo (gatos sensíveis)',
    routine_default: '0.05 mcg/kg/min',
    note: 'Gatos são mais sensíveis à vasoconstrição renal. Monitorar débito urinário rigorosamente. Teto prudente: 0.5 mcg/kg/min.',
  },
]

