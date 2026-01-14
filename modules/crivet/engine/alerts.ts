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
  cetamina: {
    min: 0.6,
    max: 2.0,
    unit: 'mg/kg/h',
    subdoseMessage: 'SUBDOSE: abaixo de 0,6 mg/kg/h → analgesia/sedação pode ser insuficiente.',
    overdoseMessage:
      'SOBREDOSE: acima de 2,0 mg/kg/h → risco de depressão cardiorrespiratória, salivação, recuperação prolongada.',
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
