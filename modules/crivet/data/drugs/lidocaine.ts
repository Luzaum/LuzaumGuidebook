import type { IndicatedDose } from '../../types/drug'

export const lidocaineRecommendedUnit = 'mcg/kg/min'
export const lidocaineRecommendedUnitWhy = [
  'Unidade padrão para antiarrítmicos em CRI.',
  'Facilita titulação e monitoramento da resposta antiarrítmica.',
  'Permite ajuste fino conforme ritmo cardíaco e sinais de toxicidade.',
]

export const lidocaineIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 25, max: 80 },
    purpose: 'Taquiarritmias ventriculares (VT) e ectopia ventricular',
    note: 'Bolus inicial 2–4 mg/kg IV lento. CRI 25–80 mcg/kg/min após resposta ao bolus. Monitorar SNC e PA.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 10, max: 40 },
    purpose: 'Taquiarritmias ventriculares (alto risco de toxicidade)',
    note: 'Bolus inicial 0.25–0.5 mg/kg IV lento. CRI 10–40 mcg/kg/min com monitorização intensiva. Gatos são muito sensíveis à toxicidade.',
  },
  // Bolus - Cão
  {
    mode: 'bolus',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 2, max: 4 },
    purpose: 'Bolus IV para VT',
    note: 'IV lento. Repetir até dose total 8 mg/kg em ≥10 min se necessário.',
  },
  // Bolus - Gato
  {
    mode: 'bolus',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 0.25, max: 0.5 },
    purpose: 'Bolus IV para VT (alto risco)',
    note: 'IV lento. Pode considerar até 1 mg/kg em situações selecionadas. Repetir 0.15–0.25 mg/kg até dose total 4 mg/kg se efetivo.',
  },
]
