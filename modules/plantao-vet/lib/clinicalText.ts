import { BulletinType, ShiftPatient, Task } from '../types';
import { compareScheduledTimes, getPatientStatusLabel, getTaskCategoryLabel } from './presentation';

function getOpenPatientTasks(tasks: Task[], shiftPatientId: string) {
  return tasks
    .filter((task) => task.shiftPatientId === shiftPatientId && !task.completed)
    .sort((left, right) => compareScheduledTimes(left.scheduledTime, right.scheduledTime));
}

function getPatientLines(patient: ShiftPatient, tasks: Task[]) {
  const openTasks = getOpenPatientTasks(tasks, patient.id);
  const activeProblems = patient.problems.filter((problem) => problem.status === 'active');

  return {
    activeProblems,
    openTasks,
    alertsLine:
      patient.alertBadges.length > 0 ? patient.alertBadges.join(', ') : 'Sem alertas importantes neste turno.',
    tasksLine:
      openTasks.length > 0
        ? openTasks
            .map((task) => {
              const time = task.scheduledTime || '--';
              return `- ${time} | ${task.title} (${getTaskCategoryLabel(task.category)})`;
            })
            .join('\n')
        : '- Nenhuma pendencia aberta.',
    problemsLine:
      activeProblems.length > 0
        ? activeProblems.map((problem) => `- ${problem.title}${problem.notes ? `: ${problem.notes}` : ''}`).join('\n')
        : '- Nenhum problema ativo registrado.',
  };
}

export function buildBulletinText(patient: ShiftPatient, tasks: Task[], type: BulletinType) {
  const context = getPatientLines(patient, tasks);

  if (type === 'tutor') {
    return [
      `BOLETIM DO TUTOR - ${patient.displayName}`,
      '',
      `Estado do paciente: ${getPatientStatusLabel(patient.status)}.`,
      patient.summary || 'O paciente segue em acompanhamento pela equipe do plantao.',
      '',
      'Pontos importantes:',
      patient.alertBadges.length > 0
        ? `- ${patient.alertBadges.join('; ')}`
        : '- Sem alertas adicionais registrados neste turno.',
      '',
      'O que ainda estamos acompanhando:',
      context.tasksLine,
      '',
      patient.nextShiftPlan
        ? `Orientacao do proximo periodo: ${patient.nextShiftPlan}`
        : 'Seguimos acompanhando evolucao e respostas ao tratamento durante o turno.',
    ].join('\n');
  }

  if (type === 'handover') {
    return buildPatientHandoverText(patient, tasks);
  }

  return [
    `BOLETIM VETERINARIO - ${patient.displayName}`,
    '',
    `Status do turno: ${getPatientStatusLabel(patient.status)}`,
    `Diagnostico principal: ${patient.mainDiagnosis || 'Nao informado'}`,
    '',
    'Resumo clinico:',
    patient.summary || 'Sem resumo clinico registrado.',
    '',
    'Alertas:',
    context.alertsLine,
    '',
    'Problemas ativos:',
    context.problemsLine,
    '',
    'Pendencias abertas:',
    context.tasksLine,
    '',
    'Observacoes importantes:',
    patient.importantNotes || 'Sem observacoes adicionais registradas.',
  ].join('\n');
}

export function buildPatientHandoverText(patient: ShiftPatient, tasks: Task[]) {
  const context = getPatientLines(patient, tasks);

  return [
    `${patient.displayName} - ${getPatientStatusLabel(patient.status)}`,
    `Identificacao: ${patient.species}, ${patient.breed || 'raca nao informada'}, ${patient.weightLabel || 'peso nao informado'}, tutor ${patient.tutorName || 'nao informado'}.`,
    `Diagnostico/suspeita: ${patient.mainDiagnosis || 'Nao informado'}.`,
    `Frase definidora: ${patient.definingPhrase || 'Sem frase definidora registrada.'}`,
    '',
    'Resumo do caso:',
    patient.summary || 'Sem resumo clinico registrado.',
    '',
    'Alertas:',
    context.alertsLine,
    '',
    'Problemas ativos:',
    context.problemsLine,
    '',
    'Pendencias abertas:',
    context.tasksLine,
    '',
    'Observacoes importantes:',
    patient.importantNotes || 'Sem observacoes importantes registradas.',
    '',
    'Pontos de atencao para o proximo turno:',
    patient.nextShiftPlan || 'Sem plano registrado para o proximo turno.',
  ].join('\n');
}

export function buildShiftHandoverText(patients: ShiftPatient[], tasks: Task[]) {
  return patients.map((patient) => buildPatientHandoverText(patient, tasks)).join('\n\n');
}
