import { PatientStatus, ProblemPriority, Species, TaskCategory, TaskPriority } from '../types';

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
      return 'Critico';
    case 'watch':
      return 'Observacao';
    case 'stable':
      return 'Estavel';
    case 'discharge_today':
      return 'Alta hoje';
    default:
      return 'Observacao';
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
      return 'Alimentacao';
    case 'medication':
      return 'Medicacao';
    case 'monitoring':
      return 'Monitoramento';
    case 'tutor':
      return 'Tutor';
    case 'discharge':
      return 'Alta';
    case 'documents':
      return 'Documentos';
    case 'communication':
      return 'Comunicacao';
    case 'nutrition':
      return 'Nutricao';
    default:
      return 'Outro';
  }
}

export function getTaskPriorityLabel(priority: TaskPriority) {
  switch (priority) {
    case 'high':
      return 'Alta prioridade';
    case 'medium':
      return 'Media prioridade';
    case 'low':
      return 'Baixa prioridade';
    default:
      return 'Media prioridade';
  }
}

export function getProblemPriorityLabel(priority: ProblemPriority) {
  switch (priority) {
    case 'high':
      return 'Alta prioridade';
    case 'medium':
      return 'Media prioridade';
    case 'low':
      return 'Baixa prioridade';
    default:
      return 'Media prioridade';
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
