import { validateMinimumData } from './validate'
import { determineNeuroLocalization } from './localization'
import { generateDifferentials } from './differentialsV2'
import { replaceForbiddenEnglish, auditCaseReport } from '../quality/noEnglish'
import { applyComorbidityRules } from '../engine/comorbidityRules'
import type { CaseReport } from '../../types/analysis'
import {
  CHIEF_COMPLAINT_LABELS,
  RED_FLAG_LABELS,
  TEMPORAL_LABELS,
  EVOLUTION_LABELS,
} from '../../data/complaintDictionaries'

const EXAM_VALUE_LABELS: Record<string, string> = {
  Alerta: 'Alerta',
  Deprimido: 'Deprimido',
  Estupor: 'Estupor',
  Coma: 'Coma',
  Normal: 'Normal',
  Ausente: 'Ausente',
  Presente: 'Presente',
  Diminuido: 'Diminuido',
  Aumentado: 'Aumentado',
  Lento: 'Lento',
  Ambulatorio: 'Ambulatorio',
  'Com Apoio': 'Com apoio',
  'Nao Ambulatorio': 'Não ambulatório',
  Plegia: 'Plegia',
  Ataxia: 'Ataxia',
  Proprioceptiva: 'Proprioceptiva',
  Vestibular: 'Vestibular',
  Cerebelar: 'Cerebelar',
  Leve: 'Leve',
  Moderada: 'Moderada',
  Grave: 'Grave',
  'Cabeca Baixa': 'Cabeca baixa',
}

function humanizeComplaint(id: string): string {
  return CHIEF_COMPLAINT_LABELS[id] || id
}

function humanizeRedFlag(id: string): string {
  return RED_FLAG_LABELS[id as keyof typeof RED_FLAG_LABELS] || id
}

function humanizeExamValue(value: unknown): string {
  const text = String(value || '').trim()
  if (!text) return 'Não informado'
  return EXAM_VALUE_LABELS[text] || text
}

function collectExamSection(
  exam: Record<string, any>,
  fields: Array<{ key: string; label: string }>,
): string[] {
  return fields
    .filter(({ key }) => exam[key] !== null && exam[key] !== undefined && String(exam[key]).trim() !== '')
    .map(({ key, label }) => `${label}: ${humanizeExamValue(exam[key])}`)
}

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
        narrative: 'Dados insuficientes para neurolocalizacao com segurança clínica.',
        missing: v.missing,
      },
      differentials: [],
    }
  }

  const neuroLocalization = determineNeuroLocalization(caseState)
  const differentials = generateDifferentials(caseState, neuroLocalization)

  let report: CaseReport = {
    generatedAtISO: now,
    patientSummary,
    historySummary,
    examSummary,
    neuroLocalization,
    differentials,
  }

  const comorbidities = caseState?.patient?.comorbidities || []
  if (comorbidities.length > 0) {
    const { updatedReport } = applyComorbidityRules({
      report,
      comorbidities:
        Array.isArray(comorbidities) && typeof comorbidities[0] === 'string'
          ? comorbidities.map((c) => ({ key: c as any, label: c }))
          : comorbidities,
    })
    report = updatedReport
  }

  report.patientSummary = replaceForbiddenEnglish(report.patientSummary)
  report.historySummary = replaceForbiddenEnglish(report.historySummary)
  report.examSummary = replaceForbiddenEnglish(report.examSummary)
  report.neuroLocalization.narrative = replaceForbiddenEnglish(report.neuroLocalization.narrative)
  report.neuroLocalization.supportiveFindings = report.neuroLocalization.supportiveFindings.map((finding) =>
    replaceForbiddenEnglish(finding),
  )
  report.neuroLocalization.contradictoryFindings = report.neuroLocalization.contradictoryFindings.map((finding) =>
    replaceForbiddenEnglish(finding),
  )
  report.differentials = report.differentials.map((dx) => ({
    ...dx,
    why: dx.why.map((reason) => replaceForbiddenEnglish(reason)),
    diagnostics: dx.diagnostics.map((diag) => ({
      ...diag,
      test: replaceForbiddenEnglish(diag.test),
      whatItAdds: replaceForbiddenEnglish(diag.whatItAdds),
      expectedFindings: replaceForbiddenEnglish(diag.expectedFindings),
      limitations: replaceForbiddenEnglish(diag.limitations),
    })),
    treatment: dx.treatment.map((tx) => ({
      ...tx,
      plan: tx.plan.map((item) => replaceForbiddenEnglish(item)),
      cautions: tx.cautions.map((item) => replaceForbiddenEnglish(item)),
    })),
  }))

  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
    const audit = auditCaseReport(report)
    if (audit.length > 0) {
      console.warn('[NeuroVet] Termos em ingles detectados após sanitizacao:', audit)
    }
  }

  return report
}

function buildPatientSummary(s: any): string {
  const species = s?.patient?.species === 'dog' ? 'Cão' : s?.patient?.species === 'cat' ? 'Gato' : 'Não informado'
  const age =
    s?.patient?.ageYears !== null && s?.patient?.ageYears !== undefined
      ? `${s.patient.ageYears} anos`
      : s?.patient?.ageMonths !== null && s?.patient?.ageMonths !== undefined
        ? `${s.patient.ageMonths} meses`
        : 'Não informado'
  const sex = s?.patient?.sex === 'male' ? 'Macho' : s?.patient?.sex === 'female' ? 'Fêmea' : 'Não informado'
  const reproStatus =
    s?.patient?.reproStatus === 'intact'
      ? 'Inteiro'
      : s?.patient?.reproStatus === 'neutered'
        ? 'Castrado'
        : 'Não informado'
  const lifeStageLabels: Record<string, string> = {
    neonate: 'Neonato',
    pediatric: 'Pediatrico',
    adult: 'Adulto',
    geriatric: 'Geriatrico',
  }
  const lifeStage = s?.patient?.lifeStage ? lifeStageLabels[s.patient.lifeStage] || 'Não informado' : 'Não informado'
  const physiologicConditions = [
    s?.patient?.pregnant ? 'Gestante' : null,
    s?.patient?.lactating ? 'Lactante' : null,
  ].filter(Boolean)

  return [
    `Especie: ${species}`,
    `Idade: ${age}`,
    `Sexo: ${sex}`,
    `Estado reprodutivo: ${reproStatus}`,
    `Faixa etaria: ${lifeStage}`,
    `Condicoes fisiologicas: ${physiologicConditions.length > 0 ? physiologicConditions.join(', ') : 'Nenhuma informada'}`,
  ].join('\n')
}

function buildHistorySummary(s: any): string {
  const chiefComplaints =
    Array.isArray(s?.complaint?.chiefComplaintIds) && s.complaint.chiefComplaintIds.length
      ? s.complaint.chiefComplaintIds.map(humanizeComplaint)
      : []
  const temporalPattern = s?.complaint?.temporalPattern
    ? TEMPORAL_LABELS[s.complaint.temporalPattern as keyof typeof TEMPORAL_LABELS] || 'Não informado'
    : 'Não informado'
  const evolutionPattern = s?.complaint?.evolutionPattern
    ? EVOLUTION_LABELS[s.complaint.evolutionPattern as keyof typeof EVOLUTION_LABELS] || 'Não informado'
    : 'Não informado'

  return [
    `Sinais principais: ${chiefComplaints.length > 0 ? chiefComplaints.join(', ') : 'Nenhum informado'}`,
    `Padrao temporal: ${temporalPattern}`,
    `Evolucao: ${evolutionPattern}`,
    `Observacoes: ${s?.complaint?.contextNotes?.trim() || 'Nenhuma observacao informada'}`,
  ].join('\n')
}

function buildExamSummary(s: any): string {
  const exam = s?.neuroExam || {}
  const sections = [
    {
      title: 'Mentacao e comportamento',
      items: collectExamSection(exam, [
        { key: 'mentation', label: 'Mentacao' },
        { key: 'behavior', label: 'Comportamento' },
        { key: 'head_posture', label: 'Postura da cabeca' },
      ]),
    },
    {
      title: 'Marcha e postura',
      items: collectExamSection(exam, [
        { key: 'ambulation', label: 'Deambulacao' },
        { key: 'gait_thoracic', label: 'Marcha dos membros toracicos' },
        { key: 'gait_pelvic', label: 'Marcha dos membros pelvicos' },
        { key: 'ataxia_type', label: 'Tipo de ataxia' },
      ]),
    },
    {
      title: 'Reacoes posturais',
      items: collectExamSection(exam, [
        { key: 'proprioception_thoracic_left', label: 'Propriocepcao toracico esquerdo' },
        { key: 'proprioception_thoracic_right', label: 'Propriocepcao toracico direito' },
        { key: 'proprioception_pelvic_left', label: 'Propriocepcao pelvico esquerdo' },
        { key: 'proprioception_pelvic_right', label: 'Propriocepcao pelvico direito' },
      ]),
    },
    {
      title: 'Nervos cranianos',
      items: collectExamSection(exam, [
        { key: 'menace_left', label: 'Resposta a ameaca esquerda' },
        { key: 'menace_right', label: 'Resposta a ameaca direita' },
        { key: 'plr_left', label: 'PLR esquerdo' },
        { key: 'plr_right', label: 'PLR direito' },
        { key: 'nystagmus', label: 'Nistagmo' },
        { key: 'strabismus', label: 'Estrabismo' },
        { key: 'cn_facial_sensation', label: 'Sensibilidade facial' },
        { key: 'cn_swallowing', label: 'Reflexo de degluticao' },
      ]),
    },
    {
      title: 'Reflexos espinhais',
      items: collectExamSection(exam, [
        { key: 'reflex_patellar_left', label: 'Patelar esquerdo' },
        { key: 'reflex_patellar_right', label: 'Patelar direito' },
        { key: 'reflex_withdrawal_left_thoracic', label: 'Retirada toracico esquerdo' },
        { key: 'reflex_withdrawal_right_thoracic', label: 'Retirada toracico direito' },
        { key: 'reflex_panniculus', label: 'Panniculus' },
      ]),
    },
    {
      title: 'Dor e nocicepcao',
      items: collectExamSection(exam, [
        { key: 'deep_pain', label: 'Dor profunda' },
        { key: 'pain_cervical', label: 'Dor cervical' },
        { key: 'pain_thoracolumbar', label: 'Dor toracolombar' },
        { key: 'pain_lumbosacral', label: 'Dor lombossacra' },
      ]),
    },
  ]

  const lines = sections
    .filter((section) => section.items.length > 0)
    .map((section) => `${section.title}: ${section.items.join('; ')}`)

  return lines.length > 0 ? lines.join('\n') : 'Exame neurologico não preenchido.'
}
