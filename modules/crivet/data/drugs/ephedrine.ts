import type { IndicatedDose } from '../../types/drug'

// Sistema de unidade recomendada
export const ephedrineRecommendedUnit = 'mg/kg/h' // Para bolus, será tratado como mg/kg
export const ephedrineRecommendedUnitWhy = [
  'Efedrina é usada principalmente como bolus IV (0.1-0.2 mg/kg).',
  'CRI não é uso típico; se hipotensão persistente, preferir vasopressor direto em CRI.',
  'Unidade mg/kg facilita cálculo de bolus e evita confusão.',
  'Padrão para vasopressores de ação curta em bolus.',
]

export const ephedrineIndicatedDoses: IndicatedDose[] = [
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 0.1, max: 0.2 },
    purpose: 'Hipotensão intra-anestésica',
    note: '🔴 FISIOLOGIA: Efedrina é simpaticomimético misto (ação direta α/β + liberação de noradrenalina endógena). Aumenta PA e DC via múltiplos mecanismos. Taquifilaxia é esperada com doses repetidas (depleção de estoques de NE). 🟢 PROTOCOLO: Bolus IV lento, titulado ao efeito pressórico. Reavaliar PA/FC em 1-3 min. Duração típica ~10-15 min. Se 2ª dose for pouco efetiva, suspeitar taquifilaxia e migrar para vasopressor direto (norepinefrina/dobutamina).',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg/h', // Será tratado como mg/kg para bolus
    range: { min: 0.1, max: 0.2 },
    purpose: 'Hipotensão intra-anestésica',
    note: '🔴 FISIOLOGIA: Gatos podem responder bem a efedrina, mas cautela em HCM devido ao risco de piorar taquicardia e obstrução dinâmica. Simpaticomimese pode aumentar demanda miocárdica. 🟢 PROTOCOLO: Bolus IV lento, dose mínima efetiva. Evitar em HCM com obstrução dinâmica. Monitorar ECG e PA invasiva se possível. Se resposta cai após repetição, trocar estratégia.',
  },
]
