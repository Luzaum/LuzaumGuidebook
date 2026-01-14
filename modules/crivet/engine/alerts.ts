import { Comorbidity, PhysiologyState, Species } from '../types/patient'

export type ClinicalSeverity = 'critical' | 'warning' | 'info'

export interface ClinicalAlert {
  severity: ClinicalSeverity
  title?: string
  message: string
}

export interface DoseRange {
  min: number
  max: number
  unit: 'mg/kg/h' // normalizado para comparação
  subdoseMessage: string
  overdoseMessage: string
}

export const doseRanges: Record<string, DoseRange> = {
  // Cetamina: 0.6-2.0 mg/kg/h (baseado em indicatedDoses: 2-10 mcg/kg/min = 0.12-0.6 mg/kg/h, mas faixa mais ampla para cobrir todos os casos)
  cetamina: {
    min: 0.6,
    max: 2.0,
    unit: 'mg/kg/h',
    subdoseMessage: 'SUBDOSE: abaixo de 0,6 mg/kg/h → analgesia/sedação pode ser insuficiente.',
    overdoseMessage:
      'SOBREDOSE: acima de 2,0 mg/kg/h → risco de depressão cardiorrespiratória, salivação, recuperação prolongada.',
  },
  // Fentanil: 1-20 mcg/kg/h = 0.001-0.02 mg/kg/h (baseado em indicatedDoses: analgesia 1-7, anestesia 5-20)
  fentanil: {
    min: 0.001, // 1 mcg/kg/h
    max: 0.02, // 20 mcg/kg/h
    unit: 'mg/kg/h',
    subdoseMessage: 'SUBDOSE: abaixo de 1 mcg/kg/h → analgesia pode ser insuficiente. Reavaliar dose e titulação.',
    overdoseMessage:
      'SOBREDOSE: acima de 20 mcg/kg/h → risco de depressão respiratória severa, apneia e necessidade de ventilação mecânica.',
  },
  // Remifentanil: 0.05-1.0 mcg/kg/min = 0.003-0.06 mg/kg/h (baseado em indicatedDoses: UTI 0.05-0.1, manutenção 0.1-0.5, cirurgia 0.5-1.0)
  remifentanil: {
    min: 0.003, // 0.05 mcg/kg/min
    max: 0.06, // 1.0 mcg/kg/min
    unit: 'mg/kg/h',
    subdoseMessage: 'SUBDOSE: abaixo de 0,05 mcg/kg/min → analgesia pode ser insuficiente. Reavaliar dose e titulação.',
    overdoseMessage:
      'SOBREDOSE: acima de 1,0 mcg/kg/min → risco de apneia, depressão respiratória e necessidade de ventilação mecânica.',
  },
  // Midazolam: 0.1-1.0 mg/kg/h (baseado em indicatedDoses: padrão 0.1-0.5, refratário 0.5-1.0)
  midazolam: {
    min: 0.1,
    max: 1.0,
    unit: 'mg/kg/h',
    subdoseMessage: 'SUBDOSE: abaixo de 0,1 mg/kg/h → sedação/efeito anticonvulsivante pode ser insuficiente.',
    overdoseMessage:
      'SOBREDOSE: acima de 1,0 mg/kg/h → risco de sedação profunda, depressão respiratória e recuperação prolongada.',
  },
}

export function getClinicalAlerts(
  drugId: string,
  species: Species,
  physiology: PhysiologyState,
  comorbidities: Comorbidity[],
): ClinicalAlert[] {
  const alerts: ClinicalAlert[] = []
  const isCat = species === 'cat'
  const hasHepatopata = comorbidities.includes('Hepatopata')
  const hasRenopata = comorbidities.includes('Renopata')
  const hasCardiopata = comorbidities.includes('Cardiopata')
  const hasEndocrinopata = comorbidities.includes('Endocrinopata')

  // Alertas por idade fisiológica
  if (physiology === 'Neonato' || physiology === 'Filhote') {
    alerts.push({
      severity: 'critical',
      title: '🚨 NEONATO: risco de depressão respiratória e acúmulo',
      message:
        'BHE mais permeável + baixa albumina + fígado/rim imaturos → mais droga livre e clearance lento. Sugestão: reduzir CRI em ~50% e titular. Monitorar: glicemia, temperatura e ventilação.',
    })
  }

  if (physiology === 'Idoso') {
    alerts.push({
      severity: 'warning',
      title: '⚠️ GERIÁTRICO: iniciar com dose mínima eficaz',
      message:
        '↑ gordura + ↓ fluxo hepato-renal → acúmulo e recuperação lenta ("hangover"). Sugestão: dose inicial ↓ 20–30% + titulação. Atenção ao volume (prefira diluição mais concentrada).',
    })
  }

  switch (drugId) {
    case 'lidocaina':
      if (hasHepatopata) {
        alerts.push({
          severity: 'critical',
          title: 'Lidocaína + hepatopata',
          message: 'Reduzir ~50% e monitorar neurotoxicidade. Metabolismo hepático extenso.',
        })
      }
      if (isCat) {
        alerts.push({
          severity: 'critical',
          title: 'Lidocaína em felinos',
          message: 'Gatos são mais sensíveis: usar 50–75% da dose canina e monitorar sinais neurológicos.',
        })
      }
      break

    case 'dexmedetomidina':
      if (hasCardiopata) {
        alerts.push({
          severity: 'critical',
          title: 'Cardiopatia + dexmedetomidina',
          message: 'Redução importante do débito cardíaco. Evitar ou monitorar intensamente.',
        })
      }
      break

    case 'metoclopramida':
      if (hasRenopata) {
        alerts.push({
          severity: 'warning',
          title: 'Metoclopramida + renopata',
          message: 'Reduzir ~50% por excreção renal; risco de efeitos extrapiramidais.',
        })
      }
      break

    case 'insulina_nph':
    case 'insulina_pzi':
      alerts.push({
        severity: 'critical',
        title: 'Insulina NPH/PZI',
        message: 'NUNCA administrar NPH ou PZI em infusão IV. Apenas insulina regular é segura.',
      })
      break

    case 'nitroprussiato':
      if (hasHepatopata || hasRenopata) {
        alerts.push({
          severity: 'critical',
          title: 'Nitroprussiato + disfunção hepato-renal',
          message: 'Risco de intoxicação por cianeto/tiocianato. Evite uso prolongado >24h.',
        })
      }
      break
  }

  return alerts
}
