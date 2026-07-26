import {
  AcidBasePrimaryDisorder,
  CompensationStatus,
  DeepOxygenationAssessment,
  DomainStatus,
} from '../types';

export function formatDomainStatus(status: DomainStatus): string {
  const labels: Record<DomainStatus, string> = {
    ok: 'adequado',
    limited: 'limitado',
    inconclusive: 'inconclusivo',
    blocked: 'bloqueado por dados implausíveis',
  };

  return labels[status] || 'inconclusivo';
}

export function formatQualityStatus(status: 'reliable' | 'caution' | 'probable_error'): string {
  const labels = {
    reliable: 'confiável',
    caution: 'interpretar com cautela',
    probable_error: 'provável erro de entrada, leitura ou unidade',
  };

  return labels[status];
}

export function formatConfidence(
  confidence: 'high' | 'moderate' | 'low' | 'blocked'
): string {
  const labels = {
    high: 'alta',
    moderate: 'moderada',
    low: 'baixa',
    blocked: 'bloqueada',
  };

  return labels[confidence];
}

export function formatPhysiologicalSignal(
  signal: 'acidosis' | 'alkalosis' | 'neutral'
): string {
  const labels = {
    acidosis: 'acidificante',
    alkalosis: 'alcalinizante',
    neutral: 'neutro',
  };

  return labels[signal];
}

export function formatPrimaryDisorder(disorder: AcidBasePrimaryDisorder): string {
  const labels: Record<AcidBasePrimaryDisorder, string> = {
    normal: 'sem distúrbio ácido-base dominante',
    metabolic_acidosis: 'acidose metabólica',
    metabolic_alkalosis: 'alcalose metabólica',
    respiratory_acidosis: 'acidose respiratória',
    respiratory_alkalosis: 'alcalose respiratória',
    mixed: 'distúrbio misto',
    unknown: 'inconclusivo',
  };

  return labels[disorder] || 'inconclusivo';
}

export function formatCompensationStatus(status: CompensationStatus): string {
  const labels: Record<CompensationStatus, string> = {
    compensated: 'compensação adequada',
    partially_compensated: 'compensação parcial',
    uncompensated: 'sem compensação observável',
    inadequately_compensated: 'compensação inadequada',
    mixed_suspected: 'sugere distúrbio misto',
    not_applicable: 'não aplicável neste cenário',
  };

  return labels[status] || 'inconclusivo';
}

export function formatOxygenationStatus(assessment: DeepOxygenationAssessment): string {
  if (assessment.status === 'cannot_assess') {
    return 'não avaliável com os dados atuais';
  }

  if (assessment.status === 'hypoxemia') {
    const severity = assessment.severity === 'mild'
      ? 'leve'
      : assessment.severity === 'moderate'
        ? 'moderada'
        : assessment.severity === 'severe'
          ? 'grave'
          : '';
    return severity ? `hipoxemia ${severity}` : 'hipoxemia';
  }

  if (assessment.status === 'hyperoxemia') {
    return 'hiperóxia';
  }

  return 'oxigenação sem alteração dominante';
}
