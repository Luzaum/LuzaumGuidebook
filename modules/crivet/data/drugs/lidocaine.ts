import type { IndicatedDose } from '../../types/drug'

export const lidocaineRecommendedUnit = 'mcg/kg/min'
export const lidocaineRecommendedUnitWhy = [
  'Unidade padrão em emergência/anestesia para CRI antiarrítmica; facilita titulação minuto-a-minuto.',
]

export const lidocaineIndicatedDoses: IndicatedDose[] = [
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 2, max: 2 },
    purpose: 'Taquiarritmias ventriculares (VT/VPCs)',
    routine_default: '2 mg/kg',
    note: '2 mg/kg IV/IO lento; pode repetir conforme resposta. Seguir com CRI após controle.',
  },
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 30, max: 80 },
    purpose: 'Taquiarritmias ventriculares (manutenção)',
    routine_default: '50 mcg/kg/min',
    note: 'Titular ao efeito e sinais de toxicidade. Ocasionalmente até 100 mcg/kg/min.',
  },
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 25, max: 75 },
    purpose: 'CRI (faixa comum em tabelas de CRI)',
    routine_default: '50 mcg/kg/min',
  },
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 0.25, max: 0.75 },
    purpose: 'Taquiarritmias ventriculares (cautela)',
    routine_default: '0.5 mg/kg',
    note: '0.25–0.75 mg/kg IV lento (~5 min). ALERTA: maior risco de convulsões/toxicidade; usar apenas se realmente indicado.',
  },
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 10, max: 40 },
    purpose: 'Taquiarritmias ventriculares (alto risco de toxicidade)',
    note: 'Bolus inicial 0.25–0.5 mg/kg IV lento. CRI 10–40 mcg/kg/min com monitorização intensiva. Gatos são muito sensíveis à toxicidade.',
  },
]
