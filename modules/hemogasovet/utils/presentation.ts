import {
  AcidBasePrimaryDisorder,
  CompensationStatus,
  DeepOxygenationAssessment,
  DomainStatus,
} from '../types';

export function formatDomainStatus(status: DomainStatus): string {
  const labels: Record<DomainStatus, string> = {
    ok: 'ok',
    limited: 'limitado',
    inconclusive: 'inconclusivo',
    blocked: 'bloqueado por dados implausiveis',
  };

  return labels[status] || 'inconclusivo';
}

export function formatQualityStatus(status: 'reliable' | 'caution' | 'probable_error'): string {
  const labels = {
    reliable: 'confiavel',
    caution: 'interpretar com cautela',
    probable_error: 'provavel erro de entrada/parser/unidade',
  };

  return labels[status];
}

export function formatPrimaryDisorder(disorder: AcidBasePrimaryDisorder): string {
  const labels: Record<AcidBasePrimaryDisorder, string> = {
    normal: 'sem disturbio acido-base dominante',
    metabolic_acidosis: 'acidose metabolica',
    metabolic_alkalosis: 'alcalose metabolica',
    respiratory_acidosis: 'acidose respiratoria',
    respiratory_alkalosis: 'alcalose respiratoria',
    mixed: 'disturbio misto',
    unknown: 'inconclusivo',
  };

  return labels[disorder] || 'inconclusivo';
}

export function formatCompensationStatus(status: CompensationStatus): string {
  const labels: Record<CompensationStatus, string> = {
    compensated: 'compensacao adequada',
    partially_compensated: 'compensacao parcial',
    uncompensated: 'sem compensacao observavel',
    inadequately_compensated: 'compensacao inadequada',
    mixed_suspected: 'sugere disturbio misto',
    not_applicable: 'nao aplicavel neste cenario',
  };

  return labels[status] || 'inconclusivo';
}

export function formatOxygenationStatus(assessment: DeepOxygenationAssessment): string {
  if (assessment.status === 'cannot_assess') {
    return 'nao avaliavel com os dados atuais';
  }

  if (assessment.status === 'hypoxemia') {
    return assessment.severity ? `hipoxemia ${assessment.severity}` : 'hipoxemia';
  }

  if (assessment.status === 'hyperoxemia') {
    return 'hiperoxia';
  }

  return 'oxigenacao sem alteracao dominante';
}
