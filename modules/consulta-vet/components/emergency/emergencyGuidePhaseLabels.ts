import { EmergencyGuidePhase } from '../../types/emergencyGuide';

export const EMERGENCY_PHASE_LABEL: Record<EmergencyGuidePhase, string> = {
  reconhecimento: 'Reconhecimento',
  estabilizacao: 'Estabilização',
  tratamento_especifico: 'Tratamento específico',
  monitoramento: 'Monitoramento',
};

export const EMERGENCY_PHASE_ORDER: EmergencyGuidePhase[] = [
  'reconhecimento',
  'estabilizacao',
  'tratamento_especifico',
  'monitoramento',
];
