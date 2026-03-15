import { PatientStatus, ProblemPriority, ProblemStatus, Species, TaskCategory, TaskPriority } from '../types';

export function getSpeciesLabel(species: Species) {
  switch (species) {
    case 'canina':
      return 'Canina';
    case 'felina':
      return 'Felina';
    default:
      return 'Outra';
  }
}

export function getPatientStatusLabel(status: PatientStatus) {
  switch (status) {
    case 'critical':
      return 'Crítico';
    case 'watch':
      return 'Observação';
    case 'stable':
      return 'Estável';
    case 'discharge_today':
      return 'Alta hoje';
    default:
      return 'Observação';
  }
}

export function getPatientStatusVariant(status: PatientStatus) {
  switch (status) {
    case 'critical':
      return 'destructive' as const;
    case 'watch':
      return 'warning' as const;
    case 'stable':
      return 'success' as const;
    case 'discharge_today':
      return 'secondary' as const;
    default:
      return 'default' as const;
  }
}

export function getTaskCategoryLabel(category: TaskCategory) {
  switch (category) {
    case 'exam':
      return 'Exame';
    case 'procedure':
      return 'Procedimento';
    case 'feeding':
      return 'Alimentação';
    case 'medication':
      return 'Medicação';
    case 'monitoring':
      return 'Monitorização';
    case 'tutor':
      return 'Tutor';
    case 'discharge':
      return 'Alta';
    case 'documents':
      return 'Documentos';
    case 'communication':
      return 'Comunicação';
    case 'hydration':
      return 'Hidratação';
    case 'nutrition':
      return 'Nutrição';
    case 'hygiene':
      return 'Higiene / dispositivo';
    default:
      return 'Outros';
  }
}

export function getTaskPriorityLabel(priority: TaskPriority) {
  switch (priority) {
    case 'high':
      return 'Alta prioridade';
    case 'medium':
      return 'Média prioridade';
    case 'low':
      return 'Baixa prioridade';
    default:
      return 'Média prioridade';
  }
}

export function getProblemPriorityLabel(priority: ProblemPriority) {
  switch (priority) {
    case 'high':
      return 'Alta prioridade';
    case 'medium':
      return 'Média prioridade';
    case 'low':
      return 'Baixa prioridade';
    default:
      return 'Média prioridade';
  }
}

export function getProblemStatusLabel(status: ProblemStatus) {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'resolved':
      return 'Resolvido';
    case 'historical':
      return 'Histórico';
    case 'suspected':
      return 'Suspeito';
    default:
      return 'Ativo';
  }
}

export function compareScheduledTimes(a: string | null, b: string | null) {
  if (!a && !b) {
    return 0;
  }

  if (!a) {
    return 1;
  }

  if (!b) {
    return -1;
  }

  return a.localeCompare(b);
}
