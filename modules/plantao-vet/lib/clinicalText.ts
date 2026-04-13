import { BulletinType, ShiftPatient, ShiftType, Task } from '../types';
import {
  formatClinicalBoolean,
  getActiveMedicationEntries,
  getLatestDailySummaryEntries,
  getLatestVitalsRecord,
  getRecentExamRecords,
} from './patientClinical';
import { compareScheduledTimes, getPatientStatusLabel, getTaskCategoryLabel } from './presentation';

function formatPtDate(dateTime: string | null) {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleDateString('pt-BR');
}

function formatPtTime(dateTime: string | null) {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatPtDateTime(dateTime: string | null) {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getOpenPatientTasks(tasks: Task[], shiftPatientId: string) {
  return tasks
    .filter((task) => task.shiftPatientId === shiftPatientId && !task.completed && !task.deletedAt)
    .sort((left, right) => compareScheduledTimes(left.scheduledTime, right.scheduledTime));
}

function getCompletedPatientTasks(tasks: Task[], shiftPatientId: string) {
  return tasks
    .filter((task) => task.shiftPatientId === shiftPatientId && task.completed && !task.deletedAt)
    .sort((left, right) => (right.completedAt || '').localeCompare(left.completedAt || ''));
}

function buildParameterLine(patient: ShiftPatient) {
  const latestVitals = getLatestVitalsRecord(patient);
  if (!latestVitals) return 'Sem parâmetros recentes registrados.';

  return [
    `FC ${latestVitals.heartRate || '--'} bpm`,
    `FR ${latestVitals.respiratoryRate || '--'} mpm`,
    latestVitals.cardiacAuscultation ? `Ausculta cardíaca: ${latestVitals.cardiacAuscultation}` : '',
    latestVitals.pulmonaryAuscultation ? `Ausculta pulmonar ${latestVitals.pulmonaryAuscultation}` : '',
    `Mucosas ${latestVitals.mucousMembranes || '--'}`,
    `TPC ${latestVitals.capillaryRefillTime || '--'}`,
    `TR ${latestVitals.temperature || '--'}`,
    `PAS ${latestVitals.systolicPressure || '--'}`,
    `Glicemia ${latestVitals.glucose || '--'}`,
    latestVitals.observations ? `Palpação/observações: ${latestVitals.observations}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
}

function buildTutorTurnSummary(patient: ShiftPatient) {
  const latestVitals = getLatestVitalsRecord(patient);
  const recentSummary = getLatestDailySummaryEntries(patient, 8);
  const segments = [
    latestVitals?.fed === true
      ? `Alimentou durante o turno${latestVitals.feedingDetails ? ` (${latestVitals.feedingDetails})` : ''}.`
      : latestVitals?.fed === false
        ? 'Não houve alimentação espontânea durante o turno.'
        : '',
    latestVitals?.appetite === true
      ? 'Manteve apetite.'
      : latestVitals?.appetite === false
        ? 'Permaneceu sem apetite.'
        : '',
    latestVitals?.urinated !== null ? `Urinou: ${formatClinicalBoolean(latestVitals.urinated, 'sim', 'não')}.` : '',
    latestVitals?.defecated !== null ? `Defecou: ${formatClinicalBoolean(latestVitals.defecated, 'sim', 'não')}.` : '',
    latestVitals?.vomiting ? 'Apresentou episódio de vômito no turno.' : '',
    latestVitals?.diarrhea ? 'Apresentou diarreia no turno.' : '',
    latestVitals?.pain ? `Dor/desconforto: ${latestVitals.pain}.` : '',
    latestVitals?.mentalState ? `Comportamento/estado geral: ${latestVitals.mentalState}.` : '',
    recentSummary
      .filter((entry) => entry.type === 'manual' || entry.type === 'observation')
      .slice(0, 2)
      .map((entry) => entry.content)
      .join(' '),
  ].filter(Boolean);

  return segments.join(' ') || 'O paciente permaneceu em acompanhamento durante o turno, sem intercorrências relevantes adicionais.';
}

function buildVetTurnNarrative(patient: ShiftPatient, tasks: Task[]) {
  const summaryEntries = getLatestDailySummaryEntries(patient, 20).sort((left, right) => left.occurredAt.localeCompare(right.occurredAt));
  const completedTasks = getCompletedPatientTasks(tasks, patient.id);
  const recentExams = getRecentExamRecords(patient, 5);
  const activeMedications = getActiveMedicationEntries(patient);

  const lines: string[] = [];

  summaryEntries.forEach((entry) => {
    lines.push(`${formatPtTime(entry.occurredAt)} - ${entry.title}: ${entry.content}`);
  });

  completedTasks.forEach((task) => {
    const line = `${task.completedAt ? formatPtTime(task.completedAt) : task.scheduledTime || '--'} - Tarefa executada: ${task.title}${task.description ? ` (${task.description})` : ''}.`;
    if (!lines.some((item) => item.includes(task.title))) {
      lines.push(line);
    }
  });

  recentExams.forEach((exam) => {
    const examLine = `${formatPtTime(exam.recordedAt)} - Exame ${exam.title || 'registrado'}: ${exam.mainFinding || exam.summary}.`;
    if (!lines.some((item) => item.includes(exam.mainFinding || exam.summary))) {
      lines.push(examLine);
    }
  });

  activeMedications.forEach((medication) => {
    if (medication.newBadgeDate === new Date().toISOString().slice(0, 10)) {
      lines.push(
        `${formatPtTime(medication.updatedAt)} - Medicação em uso atualizada: ${[medication.name, medication.dose, medication.frequency, medication.route]
          .filter(Boolean)
          .join(' | ')}.`
      );
    }
  });

  return lines.join('\n') || patient.summary || 'Sem eventos estruturados do turno para este paciente.';
}

function buildDailySummaryBlock(patient: ShiftPatient) {
  const summaryEntries = getLatestDailySummaryEntries(patient, 10).sort((left, right) => left.occurredAt.localeCompare(right.occurredAt));
  if (summaryEntries.length === 0) {
    return '- Sem resumo diário consolidado.';
  }

  return summaryEntries.map((entry) => `- ${formatPtDateTime(entry.occurredAt)} | ${entry.title}: ${entry.content}`).join('\n');
}

export function buildBulletinText(
  patient: ShiftPatient,
  tasks: Task[],
  type: BulletinType,
  options?: { shiftType?: ShiftType | null; authorLabel?: string }
) {
  const shiftLabel = options?.shiftType === 'night' ? 'noturno' : 'diurno';
  const authorLabel = options?.authorLabel || 'Equipe do plantão';
  const latestVitals = getLatestVitalsRecord(patient);
  const latestDate = latestVitals ? formatPtDate(latestVitals.recordedAt) : formatPtDate(patient.updatedAt);

  if (type === 'tutor') {
    return [
      'BOLETIM TUTOR',
      '',
      `Prezados, seguem as informações do plantão ${shiftLabel} sobre o quadro do(a) paciente ${patient.displayName}, acompanhado(a) no serviço de internação clínica de pequenos animais.`,
      '',
      buildTutorTurnSummary(patient),
      '',
      'Seguimos à disposição e aguardamos o horário de visitas (15 às 16h) para maiores esclarecimentos.',
      '',
      'Atenciosamente,',
      'Equipe de Clínica Médica',
    ].join('\n');
  }

  if (type === 'handover') {
    return buildPatientHandoverText(patient, tasks);
  }

  return [
    `BOLETIM ${shiftLabel === 'noturno' ? 'NOTURNO' : 'DIURNO'} - ${latestDate}`,
    '',
    `M.V. ${authorLabel}`,
    '',
    buildVetTurnNarrative(patient, tasks),
    '',
    patient.importantNotes ? `Observações importantes: ${patient.importantNotes}` : '',
    '',
    'Resumo diário da internação:',
    buildDailySummaryBlock(patient),
    '',
    latestVitals ? `${formatPtTime(latestVitals.recordedAt)} - ${buildParameterLine(patient)}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildPatientHandoverText(patient: ShiftPatient, tasks: Task[]) {
  const openTasks = getOpenPatientTasks(tasks, patient.id);
  const activeProblems = patient.problems.filter((problem) => problem.status === 'active' && !problem.deletedAt);
  const recentExams = getRecentExamRecords(patient, 3);
  const latestVitals = getLatestVitalsRecord(patient);
  const activeMedications = getActiveMedicationEntries(patient);

  return [
    `${patient.displayName} - ${getPatientStatusLabel(patient.status)}`,
    `Identificação: ${patient.species}, ${patient.breed || 'raça não informada'}, ${patient.baseWeightLabel || patient.weightLabel || 'peso não informado'}, tutor ${patient.tutorName || 'não informado'}.`,
    `Diagnóstico/suspeita: ${patient.mainDiagnosis || 'Não informado'}.`,
    `Frase definidora: ${patient.definingPhrase || 'Sem frase definidora registrada.'}`,
    '',
    'Resumo do caso:',
    patient.summary || 'Sem resumo clínico registrado.',
    '',
    'Problemas ativos:',
    activeProblems.length > 0 ? activeProblems.map((problem) => `- ${problem.title}${problem.notes ? `: ${problem.notes}` : ''}`).join('\n') : '- Nenhum problema ativo registrado.',
    '',
    'Parâmetros recentes:',
    buildParameterLine(patient),
    latestVitals
      ? `Estado mental: ${latestVitals.mentalState || '--'} | Urinou: ${formatClinicalBoolean(latestVitals.urinated)} | Defecou: ${formatClinicalBoolean(latestVitals.defecated)} | Alimentou: ${formatClinicalBoolean(latestVitals.fed)}`
      : '',
    '',
    'Exames recentes:',
    recentExams.length > 0 ? recentExams.map((exam) => `- ${exam.title || 'Exame'}: ${exam.mainFinding || exam.summary}`).join('\n') : '- Nenhum exame recente registrado.',
    '',
    'Medicações em uso:',
    activeMedications.length > 0
      ? activeMedications.map((medication) => `- ${[medication.name, medication.dose, medication.frequency, medication.route].filter(Boolean).join(' | ')}`).join('\n')
      : '- Nenhuma medicação ativa registrada.',
    '',
    'Pendências abertas:',
    openTasks.length > 0 ? openTasks.map((task) => `- ${task.scheduledTime || '--'} | ${task.title} (${getTaskCategoryLabel(task.category)})`).join('\n') : '- Nenhuma pendência aberta.',
    '',
    'Resumo diário do turno:',
    buildDailySummaryBlock(patient),
    '',
    'Observações importantes:',
    patient.importantNotes || 'Sem observações importantes registradas.',
    '',
    'Pontos de atenção para o próximo turno:',
    patient.nextShiftPlan || 'Sem plano registrado para o próximo turno.',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildShiftHandoverText(patients: ShiftPatient[], tasks: Task[]) {
  return patients.map((patient) => buildPatientHandoverText(patient, tasks)).join('\n\n');
}
