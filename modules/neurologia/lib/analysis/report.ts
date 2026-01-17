import { validateMinimumData } from './validate'
import { determineNeuroLocalization } from './localization'
import { generateDifferentials } from './differentialsV2'
import { replaceForbiddenEnglish, auditCaseReport } from '../quality/noEnglish'
import { getCombinedComorbidityCautions } from '../engine/comorbidityRules'
import type { CaseReport } from '../../types/analysis'

export function buildCaseReport(caseState: any): CaseReport {
  const now = new Date().toISOString()
  const v = validateMinimumData(caseState)

  const patientSummary = buildPatientSummary(caseState)
  const historySummary = buildHistorySummary(caseState)
  const examSummary = buildExamSummary(caseState)

  if (!v.ok) {
    return {
      generatedAtISO: now,
      patientSummary,
      historySummary,
      examSummary,
      neuroLocalization: {
        status: 'insufficient_data',
        primary: 'INDETERMINADO',
        distribution: 'INDETERMINADA',
        motorPattern: 'INDEFINIDO',
        confidence: 0,
        supportiveFindings: [],
        contradictoryFindings: [],
        narrative: 'Dados insuficientes para neurolocalização com segurança clínica.',
        missing: v.missing,
      },
      differentials: [],
    }
  }

  const neuroLocalization = determineNeuroLocalization(caseState)
  const differentials = generateDifferentials(caseState, neuroLocalization)

  // Gerar cautelas por comorbidades
  const comorbidities = caseState?.patient?.comorbidities || []
  const comorbidityCautions = comorbidities.length > 0
    ? getCombinedComorbidityCautions(comorbidities)
    : []

  // Construir report inicial
  let report: CaseReport = {
    generatedAtISO: now,
    patientSummary,
    historySummary,
    examSummary,
    neuroLocalization,
    differentials,
    comorbidityCautions,
  }

  // Aplicar sanitização de inglês
  report.patientSummary = replaceForbiddenEnglish(report.patientSummary)
  report.historySummary = replaceForbiddenEnglish(report.historySummary)
  report.examSummary = replaceForbiddenEnglish(report.examSummary)
  report.neuroLocalization.narrative = replaceForbiddenEnglish(report.neuroLocalization.narrative)

  // Sanitizar supportiveFindings e contradictoryFindings
  report.neuroLocalization.supportiveFindings = report.neuroLocalization.supportiveFindings.map((f) =>
    replaceForbiddenEnglish(f),
  )
  report.neuroLocalization.contradictoryFindings = report.neuroLocalization.contradictoryFindings.map((f) =>
    replaceForbiddenEnglish(f),
  )

  // Sanitizar diferenciais
  report.differentials = report.differentials.map((dx) => ({
    ...dx,
    why: dx.why.map((w) => replaceForbiddenEnglish(w)),
    diagnostics: dx.diagnostics.map((d) => ({
      ...d,
      test: replaceForbiddenEnglish(d.test),
      whatItAdds: replaceForbiddenEnglish(d.whatItAdds),
      expectedFindings: replaceForbiddenEnglish(d.expectedFindings),
      limitations: replaceForbiddenEnglish(d.limitations),
    })),
    treatment: dx.treatment.map((t) => ({
      ...t,
      plan: t.plan.map((p) => replaceForbiddenEnglish(p)),
      cautions: t.cautions.map((c) => replaceForbiddenEnglish(c)),
    })),
  }))

  // Auditoria em dev (warn se ainda houver termos proibidos)
  if (import.meta.env.DEV) {
    const audit = auditCaseReport(report)
    if (audit.length > 0) {
      console.warn('[NeuroVet] Termos em inglês detectados após sanitização:', audit)
    }
  }

  return report
}

function buildPatientSummary(s: any): string {
  const sp = s?.patient?.species === 'dog' ? 'Cão' : s?.patient?.species === 'cat' ? 'Gato' : '—'
  const age =
    s?.patient?.ageYears !== null && s?.patient?.ageYears !== undefined
      ? `${s.patient.ageYears} anos`
      : s?.patient?.ageMonths !== null && s?.patient?.ageMonths !== undefined
        ? `${s.patient.ageMonths} meses`
        : '—'
  const sex = s?.patient?.sex === 'male' ? 'Macho' : s?.patient?.sex === 'female' ? 'Fêmea' : '—'
  const repro =
    s?.patient?.reproStatus === 'intact' ? 'Inteiro' : s?.patient?.reproStatus === 'neutered' ? 'Castrado' : '—'
  const lifeStageLabels: Record<string, string> = {
    neonate: 'Neonato',
    pediatric: 'Pediátrico',
    adult: 'Adulto',
    geriatric: 'Geriátrico',
  }
  const phys = s?.patient?.lifeStage ? lifeStageLabels[s.patient.lifeStage] || '—' : '—'
  const w = s?.patient?.weightKg ? `${s.patient.weightKg} kg` : '—'
  const com =
    Array.isArray(s?.patient?.comorbidities) && s.patient.comorbidities.length
      ? s.patient.comorbidities.join(', ')
      : 'Nenhuma informada'
  return `Espécie: ${sp} | Idade: ${age} | Sexo: ${sex} | Reprodutivo: ${repro} | Fase: ${phys} | Peso: ${w} | Comorbidades: ${com}`
}

function buildHistorySummary(s: any): string {
  const chief = Array.isArray(s?.complaint?.chiefComplaintIds) && s.complaint.chiefComplaintIds.length
    ? s.complaint.chiefComplaintIds.join(', ')
    : '—'
  const temporalLabels: Record<string, string> = {
    peragudo: 'Peragudo',
    agudo: 'Agudo',
    subagudo: 'Subagudo',
    cronico: 'Crônico',
    episodico: 'Episódico',
  }
  const course = s?.complaint?.temporalPattern ? temporalLabels[s.complaint.temporalPattern] || '—' : '—'
  const evolutionLabels: Record<string, string> = {
    melhorando: 'Melhorando',
    estatico: 'Estático',
    flutuante: 'Flutuante',
    progressivo: 'Progressivo',
  }
  const prog = s?.complaint?.evolutionPattern
    ? evolutionLabels[s.complaint.evolutionPattern] || '—'
    : '—'
  const ctxParts: string[] = []
  if (s?.complaint?.trauma) ctxParts.push('Trauma')
  if (s?.complaint?.toxin) ctxParts.push('Toxina')
  if (s?.complaint?.fever) ctxParts.push('Febre')
  if (s?.complaint?.ectoparasiticideExposure) ctxParts.push('Exposição a ectoparasiticidas')
  if (s?.complaint?.systemicDisease) ctxParts.push('Doença sistêmica')
  if (s?.complaint?.recentSurgeryAnesthesia) ctxParts.push('Cirurgia/Anestesia recente')
  const ctx = ctxParts.length > 0 ? ctxParts.join(', ') : 'Sem contexto adicional'
  const flags =
    Array.isArray(s?.complaint?.redFlags) && s.complaint.redFlags.length
      ? s.complaint.redFlags.join(', ')
      : 'Nenhuma red flag selecionada'
  return `Queixa: ${chief} | Curso: ${course} | Evolução: ${prog} | Contexto: ${ctx} | Red flags: ${flags}`
}

function buildExamSummary(s: any): string {
  const mentationLabels: Record<string, string> = {
    Alerta: 'Alerta',
    Deprimido: 'Deprimido',
    Estupor: 'Estupor',
    Coma: 'Coma',
  }
  const ment = s?.neuroExam?.mentation ? mentationLabels[s.neuroExam.mentation] || s.neuroExam.mentation : '—'
  const gaitLabels: Record<string, string> = {
    Ambulatório: 'Ambulatório',
    'Com Apoio': 'Com apoio',
    'Não Ambulatório': 'Não ambulatorial',
    Plegia: 'Plegia',
  }
  const gait = s?.neuroExam?.ambulation ? gaitLabels[s.neuroExam.ambulation] || s.neuroExam.ambulation : '—'
  return `Mentação/Consciência: ${ment} | Marcha/Deambulação: ${gait}`
}
