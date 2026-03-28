import { CalculatorState, ClinicalAlert, MaintenanceConfig, OngoingLossesConfig, PatientProfile, RehydrationConfig, ResuscitationConfig } from '../../types';

export function generateAlerts(
  patient: PatientProfile,
  maintenance: MaintenanceConfig,
  rehydration: RehydrationConfig,
  ongoingLosses: OngoingLossesConfig,
  _resuscitation: ResuscitationConfig,
): ClinicalAlert[] {
  const alerts: ClinicalAlert[] = [];

  if (patient.weightKg < 5 || patient.ageGroup === 'neonate' || patient.ageGroup === 'puppy') {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Paciente pequeno ou pediatrico',
      explanation: 'Volumes pequenos mudam muito a fisiologia. Erros discretos aumentam risco de sobrecarga, hipoglicemia e hipotermia.',
      whyItMatters: 'Em pacientes menores, uma margem pequena de volume ja pode alterar o compartimento intravascular de forma importante.',
      whatToMonitor: 'Peso, FR, ausculta, temperatura, glicemia e diurese.',
      recommendation: 'Preferir bomba ou microgotas e reavaliacao mais curta.',
      source: 'AAHA 2024',
    });
  }

  if (patient.ageGroup === 'senior') {
    alerts.push({
      level: 'WARNING',
      title: 'Paciente idoso',
      explanation: 'Idosos podem ter reserva cardiaca e renal menor mesmo sem diagnostico formal.',
      whyItMatters: 'Excesso de volume, sodio ou anestesia podem descompensar mais cedo.',
      whatToMonitor: 'FR, ausculta, peso, diurese, PA e creatinina.',
      recommendation: 'Comecar de forma conservadora e revisar a prescricao cedo.',
      source: 'AAHA 2024',
    });
  }

  if (rehydration.enabled && rehydration.dehydrationPercent >= 10) {
    alerts.push({
      level: 'CRITICAL',
      title: 'Desidratacao severa',
      explanation: 'Desidratacao acima de 10% sugere chance real de hipovolemia associada e risco de choque.',
      whyItMatters: 'O paciente pode precisar restaurar perfusao intravascular antes de completar a reposicao lenta do intersticio.',
      whatToMonitor: 'PA, TPC, lactato, pulso, mentacao, FR e ausculta.',
      recommendation: 'Avaliar ressuscitacao separadamente. Nao misturar bolus de perfusao com a conta de reidratacao.',
      source: 'AAHA 2024',
    });
  }

  if (ongoingLosses.enabled) {
    alerts.push({
      level: 'WARNING',
      title: 'Perdas continuas ativas',
      explanation: 'Vomitos, diarreia, poliuria, drenos e terceiro espaco exigem revisao frequente da taxa.',
      whyItMatters: 'Perdas podem mudar cloro, sodio, potassio e acidobase rapidamente.',
      whatToMonitor: 'Balanco hidrico, eletrólitos, acidobase, peso e diurese.',
      recommendation: 'Mensurar mL sempre que possivel e atualizar a conta em tempo real.',
      source: 'AAHA 2024',
    });
  }

  if (patient.comorbidities.includes('cardiopatia')) {
    alerts.push({
      level: 'CRITICAL',
      title: 'Risco de congestao cardiaca',
      explanation: 'Cardiopatia e ICC exigem estrategia conservadora e reavaliacao respiratoria estreita.',
      whyItMatters: 'Hipotensao em cardiopata nem sempre e hipovolemia. Mais soro pode precipitar edema pulmonar.',
      whatToMonitor: 'FR, esforco, ausculta, peso, PA e perfusao.',
      recommendation: 'Reduzir agressividade do plano e considerar vias nao IV ou vasoativo quando apropriado.',
      source: 'AAHA 2024',
      action: {
        label: 'Aplicar taxa conservadora',
        apply: (state: CalculatorState) => ({
          maintenance: { ...state.maintenance, method: 'manual', manualMlPerKgDay: 48 },
          rehydration: { ...state.rehydration, correctionHours: 24, customCorrectionHours: 24 },
        }),
      },
    });
  }

  if (patient.comorbidities.includes('doenca_renal')) {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Doenca renal importante',
      explanation: 'Fluidoterapia apoia o rim, mas nao corrige azotemia sozinha.',
      whyItMatters: 'Oliguria ou anuria mudam completamente a margem de seguranca para excesso de volume.',
      whatToMonitor: 'Diurese, peso, FR, ausculta, PA e azotemia.',
      recommendation: 'Se o paciente nao estiver hipotenso, corrigir desidratacao gradualmente e pesar o risco de sobrecarga.',
      source: 'AAHA 2024',
    });
  }

  if (patient.comorbidities.includes('tce')) {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Paciente com TCE',
      explanation: 'TCE pede euvolemia com perfusao adequada, sem hipotonicidade e sem hiperhidratacao.',
      whyItMatters: 'Hipotensao e queda de osmolaridade podem agravar lesao cerebral secundaria.',
      whatToMonitor: 'Neurologico seriado, pupilas, PA, glicemia, eletrólitos e FR.',
      recommendation: 'Use o modulo TCE / Osmoterapia para mannitol e hipertônica com cautelas completas.',
      source: 'AAHA 2024',
    });
  }

  if (patient.comorbidities.includes('hipoalbuminemia')) {
    alerts.push({
      level: 'WARNING',
      title: 'Hipoalbuminemia',
      explanation: 'Edema nao exclui hipovolemia e plasma nao corrige albumina de forma simples.',
      whyItMatters: 'A baixa pressao oncotica aumenta risco de edema intersticial com volume excessivo.',
      whatToMonitor: 'Perfusao, peso, FR, ausculta e perdas em terceiro espaco.',
      recommendation: 'Nao prometa correcao da albumina apenas com plasma; foque no objetivo hemodinamico real.',
      source: 'AAHA 2024',
    });
  }

  if (patient.comorbidities.includes('anemia')) {
    alerts.push({
      level: 'WARNING',
      title: 'Anemia ou hemorragia',
      explanation: 'Cristaloide nao trata anemia significativa e pode hemodiluir ainda mais.',
      whyItMatters: 'A oferta de O2 pode piorar apesar de uma pressao melhor.',
      whatToMonitor: 'PCV/TP, lactato, perfusao, sangramento e PA.',
      recommendation: 'Se houver hipovolemia, ressuscitar. Se a limitacao for hemocomponente, pensar em transfusao.',
      source: 'AAHA 2024',
    });
  }

  if (patient.comorbidities.includes('sepse')) {
    alerts.push({
      level: 'HIGH_RISK',
      title: 'Choque distributivo ou vasodilatacao',
      explanation: 'Manutencao nao resolve sepse nem vasodilatacao importante.',
      whyItMatters: 'Esses pacientes podem precisar bolus fracionados e vasoativo cedo.',
      whatToMonitor: 'PA, lactato, mentacao, diurese, temperatura e peso.',
      recommendation: 'Separar fase de ressuscitacao da taxa continua e evitar excesso de volume apos recuperar volemia.',
      source: 'AAHA 2024',
    });
  }

  if (patient.comorbidities.includes('anestesia') || maintenance.method === 'anesthesia') {
    alerts.push({
      level: 'INFO',
      title: 'Anestesia com estrategia conservadora',
      explanation: 'A hipotensao anestesica nem sempre e por falta de volume.',
      whyItMatters: 'Escalar soro automaticamente pode gerar sobrecarga perioperatoria sem corrigir a causa hemodinamica.',
      whatToMonitor: 'PA, profundidade anestesica, FC, temperatura, perdas e perfusao.',
      recommendation: 'Avaliar plano anestesico, vasodilatacao, analgesia, hemorragia e necessidade de vasoativo antes de subir taxa.',
      source: 'AAHA 2024 / Lumb & Jones',
      action: {
        label: 'Usar default anestesico',
        apply: (state: CalculatorState) => ({
          maintenance: {
            ...state.maintenance,
            method: 'anesthesia',
            anesthesiaMlPerKgHour: state.patient.species === 'canine' ? 5 : 3,
          },
        }),
      },
    });
  }

  return alerts;
}
