import { PatientProfile, MaintenanceConfig, RehydrationConfig, OngoingLossesConfig, ResuscitationConfig, ClinicalAlert, CalculatorState } from '../../types';

export function generateAlerts(
  patient: PatientProfile, 
  maintenance: MaintenanceConfig, 
  rehydration: RehydrationConfig, 
  ongoingLosses: OngoingLossesConfig, 
  resuscitation: ResuscitationConfig
): ClinicalAlert[] {
  const alerts: ClinicalAlert[] = [];

  // Regra 1: Peso < 5kg
  if (patient.weightKg < 5) {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Paciente de Pequeno Porte (< 5kg)',
      explanation: 'Atenção: Paciente pediátrico/pequeno porte. Risco alto de sobrecarga hídrica.',
      whyItMatters: 'Pequenos volumes podem representar uma grande porcentagem do volume sanguíneo total.',
      whatToMonitor: 'Peso corporal, frequência respiratória e ausculta pulmonar.',
      recommendation: 'Considere uso de bomba de infusão ou bureta para controle rigoroso do volume.',
      source: 'AAHA 2024 Fluid Therapy Guidelines'
    });
  }

  // Regra 2: Idade = Geriátrico
  if (patient.ageGroup === 'geriatric') {
    alerts.push({
      level: 'WARNING',
      title: 'Paciente Geriátrico',
      explanation: 'Atenção: Pacientes geriátricos podem ter disfunção renal ou cardíaca oculta.',
      whyItMatters: 'A capacidade de lidar com sobrecargas de volume ou sódio é reduzida.',
      whatToMonitor: 'Monitore sinais de sobrecarga (FR, ausculta) de perto.',
      recommendation: 'Inicie com taxas mais conservadoras e reavalie frequentemente.',
      source: 'AAHA 2024 Fluid Therapy Guidelines'
    });
  }

  // Regra 3: Desidratação > 10%
  if (rehydration.enabled && rehydration.dehydrationPercent > 10) {
    alerts.push({
      level: 'CRITICAL',
      title: 'Desidratação Severa (> 10%)',
      explanation: 'Atenção: Desidratação severa. Sinais de choque hipovolêmico prováveis.',
      whyItMatters: 'A perfusão tecidual está comprometida e requer restauração imediata do volume intravascular.',
      whatToMonitor: 'Pressão arterial, lactato, tempo de preenchimento capilar, frequência cardíaca.',
      recommendation: 'Avalie necessidade de bolus de choque (Ressuscitação) antes de iniciar a reposição lenta.',
      source: 'AAHA 2024 Fluid Therapy Guidelines'
    });
  }

  // Regra 4: Vômito/Diarreia ativos
  if (ongoingLosses.enabled && ongoingLosses.type === 'events' && ongoingLosses.events.length > 0) {
    alerts.push({
      level: 'WARNING',
      title: 'Perdas Ativas (Vômito/Diarreia)',
      explanation: 'Atenção: Perdas ativas gastrointestinais.',
      whyItMatters: 'A perda de fluidos gástricos ou entéricos leva a desequilíbrios ácido-base e eletrolíticos severos.',
      whatToMonitor: 'Monitore eletrólitos (especialmente Potássio e Cloro) e equilíbrio ácido-base.',
      recommendation: 'Considere suplementação de KCl e ajuste o tipo de fluido (ex: Ringer Lactato vs NaCl 0.9%) baseado no perfil eletrolítico.',
      source: 'AAHA 2024 Fluid Therapy Guidelines'
    });
  }

  // Regras originais mantidas e adaptadas
  if (patient.species === 'feline') {
    alerts.push({
      level: 'WARNING',
      title: 'Gatos são sensíveis à sobrecarga',
      explanation: 'Gatos em choque podem cursar com bradicardia, hipotermia e hipotensão.',
      whyItMatters: 'Estratégias agressivas (como em cães) podem causar edema pulmonar fatal.',
      whatToMonitor: 'Frequência respiratória, esforço, ausculta pulmonar, peso.',
      recommendation: 'Use bolus menores (5-10 mL/kg) e reavalie frequentemente.',
      source: 'AAHA 2024 Fluid Therapy Guidelines'
    });
  }

  if (patient.comorbidities.includes('cardiopatia')) {
    alerts.push({
      level: 'CRITICAL',
      title: 'Risco Cardíaco / Edema Pulmonar',
      explanation: 'Evite precipitar insuficiência cardíaca congestiva.',
      whyItMatters: 'O coração não consegue lidar com grandes volumes, causando congestão e edema.',
      whatToMonitor: 'Frequência respiratória, B-lines no US, sopro, galope.',
      recommendation: 'Prefira estratégia conservadora. Considere água enteral e dieta úmida se possível. Se IV for necessário, use taxas conservadoras.',
      source: 'AAHA 2024 Fluid Therapy Guidelines',
      action: {
        label: 'Aplicar Taxa Conservadora (2 mL/kg/h)',
        apply: (state: CalculatorState) => ({
          maintenance: { ...state.maintenance, method: 'manual', manualMlPerKgDay: 48 }, // 2ml/kg/h * 24h = 48ml/kg/dia
          rehydration: { ...state.rehydration, correctionHours: 24 } // Correção mais lenta
        })
      }
    });
  }

  if (patient.comorbidities.includes('doenca_renal')) {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Doença Renal',
      explanation: 'Corrija lentamente quando necessário. Não "persiga pressão" com excesso de fluido.',
      whyItMatters: 'Rins doentes não conseguem excretar o excesso de fluido, levando a sobrecarga rápida.',
      whatToMonitor: 'Sobrecarga, diurese, peso, eletrólitos.',
      recommendation: 'A fluidoterapia deve repor perdas insensíveis e mensuradas. Evite sobrecarga.',
      source: 'AAHA 2024 Fluid Therapy Guidelines'
    });
  }

  if (patient.comorbidities.includes('tce')) {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'TCE / TBI',
      explanation: 'Meta principal: manter perfusão e pressão.',
      whyItMatters: 'Hipoperfusão é pior que "não dar fluido". Hipotensão agrava a lesão cerebral secundária.',
      whatToMonitor: 'Pressão arterial, mentação, pupilas.',
      recommendation: 'Permitido usar hipersalina e manitol. Mantenha normovolemia.',
      source: 'Brain Trauma Foundation Guidelines'
    });
  }

  if (patient.comorbidities.includes('anestesia')) {
    alerts.push({
      level: 'INFO',
      title: 'Anestesia',
      explanation: 'Taxas menores são recomendadas (3-5 mL/kg/h).',
      whyItMatters: 'Nem toda hipotensão é resolvida com fluidos. Vasodilatação anestésica é comum.',
      whatToMonitor: 'Pressão arterial, profundidade anestésica.',
      recommendation: 'Se hipotensão persistir, considere vapor, analgesia, temperatura, vasopressor/inotrópico.',
      source: 'AAHA 2024 Fluid Therapy Guidelines',
      action: {
        label: 'Aplicar Taxa Anestésica (3 mL/kg/h)',
        apply: (state: CalculatorState) => ({
          maintenance: { ...state.maintenance, method: 'anesthesia', anesthesiaMlPerKgHour: 3 }
        })
      }
    });
  }

  if (patient.ageGroup === 'neonate') {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Neonatos e Pediátricos',
      explanation: 'Maior água corporal total e superfície corporal. Risco alto de sobrecarga com volumes pequenos.',
      whyItMatters: 'Menor capacidade de concentração renal e reserva menor.',
      whatToMonitor: 'Peso, temperatura, hidratação.',
      recommendation: 'Use fluidos mornos (não muito acima da temp. corporal). Prefira seringa/microvolumes.',
      source: 'AAHA 2024 Fluid Therapy Guidelines',
      action: {
        label: 'Ajustar para Microgotas',
        apply: (state: CalculatorState) => ({
          fluidSelection: { ...state.fluidSelection, deliveryMode: 'micro' }
        })
      }
    });
  }

  return alerts;
}
