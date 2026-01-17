import type { IndicatedDose } from '../../types/drug'

export const metoclopramidaRecommendedUnit = 'mg/kg/h'
export const metoclopramidaRecommendedUnitWhy = [
  'Unidade padrão para metoclopramida em CRI para tratamento de vômito persistente.',
  'CRI costuma ter melhor eficácia clínica que bolus repetidos (especialmente em parvovirose).',
  'Meta: reduzir frequência de vômitos e promover esvaziamento gástrico sem excitação/tremores.',
  'IMPORTANTE: Não usar se houver suspeita de obstrução GI/corpo estranho/perfuração.',
]

export const metoclopramidaIndicatedDoses: IndicatedDose[] = [
  // CRI - Cão - Vômito persistente/Pró-cinético
  {
    mode: 'CRI',
    species: 'cao',
    unit: 'mg/kg/h',
    range: { min: 0.04, max: 0.08 },
    purpose: 'Vômito persistente / Pró-cinético GI superior',
    note: '🔴 FISIOLOGIA: Metoclopramida bloqueia receptores D2 no centro do vômito (CRTZ) e age como pró-cinético no GI superior. Em CRI, mantém níveis estáveis e geralmente tem melhor eficácia clínica que bolus repetidos, especialmente em parvovirose e vômito persistente. A dose de 0.04–0.08 mg/kg/h equivale a 1–2 mg/kg/dia. Em gatos, a eficácia antiemética é menor (CRTZ menos dependente de D2) e há maior risco de efeitos extrapiramidais (excitação/tremores). 🟢 PROTOCOLO: Preferir CRI IV ao invés de bolus repetidos. Iniciar no mínimo da faixa (0.04 mg/kg/h) e subir conforme resposta e ausência de sinais extrapiramidais. Reavaliar vômito e status neurológico em 30–60 min. Se surgirem tremores/excitação, reduzir 25–50% ou suspender e trocar para maropitant/ondansetron. Proteger da luz em CRI (fotossensível). Reduzir dose em insuficiência renal (25% menor). BLOQUEAR se suspeita de obstrução GI.',
  },
  // CRI - Gato - Conservadora
  {
    mode: 'CRI',
    species: 'gato',
    unit: 'mg/kg/h',
    range: { min: 0.03, max: 0.06 },
    purpose: 'CRI conservadora — Gatos (maior risco de efeitos SNC)',
    note: '🔴 FISIOLOGIA: Em gatos, a CRTZ é menos dependente de D2, então a eficácia antiemética da metoclopramida é frequentemente inferior. Além disso, há maior risco de sinais extrapiramidais (excitação/tremores/ataxia), especialmente com doses > 0.06 mg/kg/h. Por isso, doses conservadoras (0.03–0.06 mg/kg/h, equivalente a 0.72–1.44 mg/kg/dia) são recomendadas quando a metoclopramida é usada em gatos. 🟢 PROTOCOLO: Preferir maropitant ou ondansetron quando o objetivo é antiemese pura. Se usar metoclopramida, manter dose conservadora (iniciar 0.03 mg/kg/h) e monitorar rigorosamente sinais extrapiramidais. Se surgirem tremores/excitação, suspender imediatamente. Reduzir dose em insuficiência renal. BLOQUEAR se suspeita de obstrução GI.',
  },
  // Bolus - Cão
  {
    mode: 'BOLUS',
    species: 'cao',
    unit: 'mg/kg',
    range: { min: 0.1, max: 0.5 },
    purpose: 'Antiemético/Pró-cinético (bolus IV)',
    note: 'Dose típica antiemética/pró-cinética q6–8h. Preferir dose menor (0.1–0.2 mg/kg) em cães sensíveis/idosos/renais. Se objetivo é vômito persistente, considerar CRI ao invés de bolus repetidos. IV lento quando possível. BLOQUEAR se suspeita de obstrução GI.',
  },
  // Bolus - Gato
  {
    mode: 'BOLUS',
    species: 'gato',
    unit: 'mg/kg',
    range: { min: 0.1, max: 0.3 },
    purpose: 'Bolus IV (uso com cautela)',
    note: 'Em gatos, preferir menor dose por maior risco de excitação/tremores e menor eficácia antiemética. Preferir maropitant/ondansetron quando objetivo é antiemese pura. IV lento. BLOQUEAR se suspeita de obstrução GI.',
  },
]
