import type { IndicatedDose } from '../../types/drug'

export const dobutaminePresentations = [
  { label: 'Dobutamina 12,5 mg/mL (frasco 20 mL = 250 mg)', mgPerMl: 12.5 },
]

export const dobutamineDoses = {
  dog: {
    criStart: { min: 2.5, max: 5.0, unit: 'mcg/kg/min' as const },
    criUsual: { min: 5.0, max: 15.0, unit: 'mcg/kg/min' as const },
    criMax: { max: 20, unit: 'mcg/kg/min' as const },
    titration: 'Aumentar 2.5 mcg/kg/min a cada 15–30 min conforme resposta',
    alert: 'Risco elevado de taquiarritmia acima de 20 mcg/kg/min',
  },
  cat: {
    criStart: { min: 0.5, max: 1.0, unit: 'mcg/kg/min' as const },
    criUsual: { min: 0.5, max: 4.0, unit: 'mcg/kg/min' as const },
    criMax: { max: 5.0, unit: 'mcg/kg/min' as const },
    titration: 'Aumentar 0.5 mcg/kg/min a cada 15–30 min conforme resposta',
    alert: 'RISCO DE TREMOR/CONVULSÃO acima de 5 mcg/kg/min. Desligar imediatamente se surgirem sinais neurológicos.',
  },
}

export const dobutamineRecommendedUnit = 'mcg/kg/min'
export const dobutamineRecommendedUnitWhy = [
  'Unidade padrão para inotrópicos em CRI.',
  'Facilita titulação e monitoramento da resposta hemodinâmica.',
  'Permite ajuste fino conforme resposta clínica (pulso, perfusão, lactato).',
]

export const dobutamineIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mcg/kg/min',
    range: { min: 2.5, max: 20 },
    purpose: 'Suporte inotrópico (choque cardiogênico, baixo débito, sepse com disfunção miocárdica)',
    note: 'Iniciar em 2.5–5.0 µg/kg/min. Titular +2.5 µg/kg/min a cada 15–30 min conforme resposta. Manutenção usual: 5–15 µg/kg/min. Teto segurança: 20 µg/kg/min.',
  },
  // CRI - Gato
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mcg/kg/min',
    range: { min: 0.5, max: 5.0 },
    purpose: 'Suporte inotrópico (com extrema cautela)',
    note: 'Teto ABSOLUTO: 5.0 µg/kg/min. Iniciar em 0.5–1.0 µg/kg/min. Titular +0.5 µg/kg/min a cada 15–30 min. Monitorar sinais neurológicos (tremores/convulsões). Desligar imediatamente se surgirem.',
  },
]

