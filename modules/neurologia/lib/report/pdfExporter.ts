import jsPDF from 'jspdf'
import type { CaseReport } from '../../types/analysis'
import { parseAiClinicalReport } from './aiClinicalReportParser'

const CHIEF_COMPLAINT_LABELS: Record<string, string> = {
  ConvulsaoFocal: 'Convulsão focal',
  ConvulsaoGeneralizada: 'Convulsão generalizada',
  ClusterConvulsoes: 'Cluster de convulsões',
  Sincope: 'Síncope / colapso',
  AlteracaoConsciencia: 'Alteração do nível de consciência',
  Comportamento: 'Alteração comportamental',
  AndarCirculos: 'Andar em círculos / head pressing',
  Cegueira: 'Cegueira aguda',
  Anisocoria: 'Anisocoria / alteração pupilar',
  HeadTilt: 'Head tilt',
  Vertigem: 'Vertigem / vômito vestibular',
  Nistagmo: 'Nistagmo',
  Ataxia: 'Ataxia / descoordenação',
  Paresia: 'Paresia / paralisia',
  Tetraparesia: 'Tetraparesia',
  Paraparesia: 'Paraparesia',
  Hipermetria: 'Hipermetria / tremor de intenção',
  DorCervical: 'Dor espinhal cervical',
  DorToracolombar: 'Dor espinhal toracolombar',
  DorLombossacra: 'Dor espinhal lombossacra',
  DisfuncaoFacial: 'Disfunção de nervo facial',
  Disfagia: 'Disfagia / regurgitação',
  Disfonia: 'Disfonia / alteração de voz',
  DisfuncaoUrinaria: 'Disfunção urinária / fecal',
  IncontinenciaUrinaria: 'Incontinência urinária',
  RetencaoUrinaria: 'Retenção urinária',
  Tremores: 'Tremores / mioclonias',
  FraquezaFlacida: 'Fraqueza flácida / intolerância ao exercício',
  Colapso: 'Colapso recorrente',
  Outros: 'Outros sinais',
}

const RED_FLAG_LABELS: Record<string, string> = {
  coma_estupor: 'Coma / estupor',
  status_epilepticus: 'Status epilepticus / cluster grave',
  severe_progression_24h: 'Piora neurológica rápida (<24h)',
  acute_nonambulatory: 'Não ambulatório agudo',
  respiratory_compromise: 'Sinais respiratórios / aspiração',
  deep_pain_loss: 'Dor profunda ausente',
  severe_cervical_pain: 'Cervicalgia intensa',
  anisocoria_acute: 'Anisocoria aguda',
  dysphagia_aspiration_risk: 'Disfagia com risco de aspiração',
}

const EXAM_FIELD_LABELS: Record<string, string> = {
  mentation: 'Mentação',
  behavior: 'Comportamento',
  head_posture: 'Postura da cabeça',
  ambulation: 'Deambulação',
  gait_thoracic: 'Marcha dos membros torácicos',
  gait_pelvic: 'Marcha dos membros pélvicos',
  ataxia_type: 'Tipo de ataxia',
  proprioception_thoracic_left: 'Propriocepção torácico esquerdo',
  proprioception_thoracic_right: 'Propriocepção torácico direito',
  proprioception_pelvic_left: 'Propriocepção pélvico esquerdo',
  proprioception_pelvic_right: 'Propriocepção pélvico direito',
  menace_left: 'Resposta à ameaça esquerda',
  menace_right: 'Resposta à ameaça direita',
  plr_left: 'PLR esquerdo',
  plr_right: 'PLR direito',
  nystagmus: 'Nistagmo',
  strabismus: 'Estrabismo',
  cn_facial_sensation: 'Sensibilidade facial',
  cn_swallowing: 'Reflexo de deglutição',
  reflex_patellar_left: 'Reflexo patelar esquerdo',
  reflex_patellar_right: 'Reflexo patelar direito',
  reflex_withdrawal_left_thoracic: 'Retirada torácico esquerdo',
  reflex_withdrawal_right_thoracic: 'Retirada torácico direito',
  reflex_panniculus: 'Panniculus',
  deep_pain: 'Dor profunda',
  pain_cervical: 'Dor cervical',
  pain_thoracolumbar: 'Dor toracolombar',
  pain_lumbosacral: 'Dor lombossacra',
}

type ExamSection = {
  title: string
  keys: string[]
}

const EXAM_SECTIONS: ExamSection[] = [
  { title: 'Mentação e comportamento', keys: ['mentation', 'behavior', 'head_posture'] },
  { title: 'Marcha e postura', keys: ['ambulation', 'gait_thoracic', 'gait_pelvic', 'ataxia_type'] },
  {
    title: 'Reações posturais',
    keys: [
      'proprioception_thoracic_left',
      'proprioception_thoracic_right',
      'proprioception_pelvic_left',
      'proprioception_pelvic_right',
    ],
  },
  {
    title: 'Nervos cranianos',
    keys: [
      'menace_left',
      'menace_right',
      'plr_left',
      'plr_right',
      'nystagmus',
      'strabismus',
      'cn_facial_sensation',
      'cn_swallowing',
    ],
  },
  {
    title: 'Reflexos espinhais',
    keys: [
      'reflex_patellar_left',
      'reflex_patellar_right',
      'reflex_withdrawal_left_thoracic',
      'reflex_withdrawal_right_thoracic',
      'reflex_panniculus',
    ],
  },
  {
    title: 'Dor e nocicepção',
    keys: ['deep_pain', 'pain_cervical', 'pain_thoracolumbar', 'pain_lumbosacral'],
  },
]

type RenderState = {
  y: number
}

function fixMojibake(value: string): string {
  if (!/[ÃÂâ]/.test(value)) {
    return value
  }

  try {
    return decodeURIComponent(escape(value))
  } catch {
    return value
      .replace(/Ã§/g, 'ç')
      .replace(/Ã£/g, 'ã')
      .replace(/Ã¡/g, 'á')
      .replace(/Ã /g, 'à')
      .replace(/Ã¢/g, 'â')
      .replace(/Ãª/g, 'ê')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ã³/g, 'ó')
      .replace(/Ã´/g, 'ô')
      .replace(/Ãµ/g, 'õ')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã‰/g, 'É')
      .replace(/Ã“/g, 'Ó')
      .replace(/Ã/g, 'à')
      .replace(/Â/g, '')
      .replace(/â€¢/g, '-')
      .replace(/â€“|â€”/g, '-')
  }
}

function sanitizeText(input: unknown, options: { preserveNewlines?: boolean } = {}): string {
  const preserveNewlines = options.preserveNewlines === true
  let value = String(input ?? '')
    .replace(/\u0000/g, '')
    .replace(/[\u200B-\u200F\uFEFF]/g, '')
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .replace(/\r/g, '')

  value = fixMojibake(value)

  if (preserveNewlines) {
    return value
      .split('\n')
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n')
  }

  return value.replace(/\s+/g, ' ').trim()
}

function prettifyToken(token: string): string {
  return sanitizeText(token)
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
}

function toPtBrDate(): string {
  return new Date().toLocaleDateString('pt-BR')
}

function formatValue(value: unknown, fallback = 'Não informado'): string {
  const sanitized = sanitizeText(value)
  return sanitized || fallback
}

function buildPatientSection(caseState: any): string[] {
  const patient = caseState?.patient || {}
  const species = patient.species === 'dog' ? 'Cão' : patient.species === 'cat' ? 'Gato' : 'Não informado'
  const sex = patient.sex === 'male' ? 'Macho' : patient.sex === 'female' ? 'Fêmea' : 'Não informado'
  const repro =
    patient.reproStatus === 'intact' ? 'Inteiro' : patient.reproStatus === 'neutered' ? 'Castrado' : 'Não informado'
  const lifeStageMap: Record<string, string> = {
    neonate: 'Neonato',
    pediatric: 'Pediátrico',
    adult: 'Adulto',
    geriatric: 'Geriátrico',
  }
  const age =
    typeof patient.ageYears === 'number' && patient.ageYears > 0
      ? `${patient.ageYears} ano(s)`
      : typeof patient.ageMonths === 'number' && patient.ageMonths > 0
        ? `${patient.ageMonths} mes(es)`
        : 'Não informado'
  const weight = typeof patient.weightKg === 'number' ? `${patient.weightKg} kg` : 'Não informado'
  const comorbidities =
    Array.isArray(patient.comorbidities) && patient.comorbidities.length > 0
      ? patient.comorbidities
          .map((item: any) =>
            formatValue(typeof item === 'string' ? item : item?.label || item?.key || 'Comorbidade'),
          )
          .join(', ')
      : 'Nenhuma informada'
  const physiologicFlags = [patient.pregnant ? 'Gestante' : null, patient.lactating ? 'Lactante' : null].filter(
    Boolean,
  )

  return [
    `Espécie: ${species}`,
    `Sexo: ${sex}`,
    `Estado reprodutivo: ${repro}`,
    `Faixa etária: ${
      patient.lifeStage ? formatValue(lifeStageMap[patient.lifeStage] || patient.lifeStage) : 'Não informado'
    }`,
    `Idade: ${age}`,
    `Peso: ${weight}`,
    `Comorbidades: ${comorbidities}`,
    `Condições fisiológicas: ${physiologicFlags.join(', ') || 'Nenhuma informada'}`,
  ]
}

function buildSignsSection(caseState: any): string[] {
  const complaint = caseState?.complaint || {}
  const temporalMap: Record<string, string> = {
    peragudo: 'Peragudo',
    agudo: 'Agudo',
    subagudo: 'Subagudo',
    cronico: 'Crônico',
    episodico: 'Episódico',
  }
  const evolutionMap: Record<string, string> = {
    melhorando: 'Melhorando',
    estatico: 'Estático',
    flutuante: 'Flutuante',
    progressivo: 'Progressivo',
  }
  const complaints =
    Array.isArray(complaint.chiefComplaintIds) && complaint.chiefComplaintIds.length > 0
      ? complaint.chiefComplaintIds
          .map((item: string) => CHIEF_COMPLAINT_LABELS[item] || prettifyToken(item))
          .join(', ')
      : 'Não informado'
  const redFlags =
    Array.isArray(complaint.redFlags) && complaint.redFlags.length > 0
      ? complaint.redFlags.map((item: string) => RED_FLAG_LABELS[item] || prettifyToken(item)).join(', ')
      : 'Nenhuma red flag marcada'
  const contextFlags = [
    complaint.trauma ? 'Trauma' : null,
    complaint.toxin ? 'Toxinas' : null,
    complaint.fever ? 'Febre' : null,
    complaint.ectoparasiticideExposure ? 'Exposição a ectoparasiticidas' : null,
    complaint.systemicDisease ? 'Doença sistêmica recente' : null,
    complaint.recentSurgeryAnesthesia ? 'Cirurgia / anestesia recente' : null,
  ].filter(Boolean)

  return [
    `Sinais principais: ${complaints}`,
    `Padrão temporal: ${
      complaint.temporalPattern ? formatValue(temporalMap[complaint.temporalPattern] || complaint.temporalPattern) : 'Não informado'
    }`,
    `Evolução: ${
      complaint.evolutionPattern
        ? formatValue(evolutionMap[complaint.evolutionPattern] || complaint.evolutionPattern)
        : 'Não informado'
    }`,
    `Contexto clínico: ${contextFlags.join(', ') || 'Sem contexto adicional marcado'}`,
    `Red flags: ${redFlags}`,
    `Observações adicionais: ${formatValue(complaint.contextNotes, 'Nenhuma observação livre informada')}`,
  ]
}

function buildExamSections(caseState: any): Array<{ title: string; lines: string[] }> {
  const exam = caseState?.neuroExam || {}

  return EXAM_SECTIONS.map((section) => {
    const lines = section.keys
      .filter((key) => exam[key] !== undefined && exam[key] !== null && String(exam[key]).trim() !== '')
      .map((key) => `${EXAM_FIELD_LABELS[key] || prettifyToken(key)}: ${formatValue(exam[key])}`)

    return { title: section.title, lines }
  }).filter((section) => section.lines.length > 0)
}

function buildFallbackClinicalSections(report: CaseReport): Array<{ title: string; lines: string[]; bullets?: string[] }> {
  const supportFindings =
    Array.isArray(report.neuroLocalization.supportingFindings) && report.neuroLocalization.supportingFindings.length > 0
      ? report.neuroLocalization.supportingFindings.map((item) => formatValue(item)).filter(Boolean)
      : []

  const differentialLines = report.differentials.slice(0, 5).map((item, index) => {
    const title = formatValue(item.name, 'Diagnóstico não especificado')
    const category = item.category ? ` | Categoria: ${formatValue(item.category)}` : ''
    return `${index + 1}. ${title} - ${item.likelihood}%${category}`
  })

  return [
    {
      title: 'NEUROLOCALIZAÇÃO',
      lines: [
        `Localização provável: ${formatValue(report.neuroLocalization.primary).replace(/_/g, ' ')}`,
        `Distribuição: ${formatValue(report.neuroLocalization.distribution)}`,
        `Padrão motor: ${formatValue(report.neuroLocalization.motorPattern)}`,
        `Confiança estimada: ${report.neuroLocalization.confidence}%`,
        `Raciocínio: ${formatValue(report.neuroLocalization.narrative)}`,
      ],
      bullets: supportFindings,
    },
    {
      title: 'TOP 5 DIAGNÓSTICOS DIFERENCIAIS',
      lines: differentialLines.length > 0 ? differentialLines : ['Nenhum diferencial disponível.'],
    },
  ]
}

function writeBulletList(
  doc: jsPDF,
  items: string[],
  state: RenderState,
  options: { left: number; width: number; pageHeight: number; fontSize?: number; bulletIndent?: number; textIndent?: number },
): void {
  const fontSize = options.fontSize || 12
  const bulletIndent = options.bulletIndent || options.left
  const textIndent = options.textIndent || bulletIndent + 4

  const ensureSpace = (requiredHeight: number) => {
    if (state.y + requiredHeight <= options.pageHeight - 18) {
      return
    }
    doc.addPage()
    state.y = 20
  }

  items.forEach((item) => {
    const cleaned = sanitizeText(item)
    if (!cleaned) {
      return
    }

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(fontSize)
    const textWidth = options.width - (textIndent - options.left)
    const lines = doc.splitTextToSize(cleaned, textWidth)
    ensureSpace(lines.length * 6 + 2)
    doc.text('-', bulletIndent, state.y)
    doc.text(lines, textIndent, state.y)
    state.y += lines.length * 6 + 2
  })
}

export function exportToPDF(report: CaseReport, caseState: any, aiOpinion?: string | null): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const left = 18
  const right = 192
  const width = right - left
  const pageHeight = doc.internal.pageSize.getHeight()
  const state: RenderState = { y: 20 }

  const ensureSpace = (requiredHeight: number) => {
    if (state.y + requiredHeight <= pageHeight - 18) {
      return
    }
    doc.addPage()
    state.y = 20
  }

  const writeWrapped = (
    text: string,
    fontStyle: 'normal' | 'bold' = 'normal',
    fontSize = 12,
    gapAfter = 3,
  ) => {
    const cleaned = sanitizeText(text)
    if (!cleaned) {
      return
    }

    doc.setFont('helvetica', fontStyle)
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(cleaned, width)
    ensureSpace(lines.length * 6 + gapAfter)
    doc.text(lines, left, state.y)
    state.y += lines.length * 6 + gapAfter
  }

  const writeSectionTitle = (title: string) => {
    ensureSpace(10)
    writeWrapped(title, 'bold', 12, 2)
  }

  const writeList = (items: string[]) => {
    items.forEach((item) => writeWrapped(item, 'normal', 12, 2))
    state.y += 1
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('FICHA CLÍNICA NEUROLÓGICA', 105, state.y, { align: 'center' })
  state.y += 10

  writeSectionTitle('IDENTIFICAÇÃO DO PACIENTE')
  writeList(buildPatientSection(caseState))

  writeSectionTitle('SINAIS E CONTEXTO CLÍNICO')
  writeList(buildSignsSection(caseState))

  writeSectionTitle('EXAME NEUROLÓGICO')
  const examSections = buildExamSections(caseState)
  if (examSections.length === 0) {
    writeWrapped('Nenhum achado do exame neurológico foi registrado.', 'normal', 12, 3)
  } else {
    examSections.forEach((section) => {
      writeWrapped(section.title, 'bold', 12, 2)
      writeList(section.lines)
    })
  }

  writeSectionTitle('RELATÓRIO CLÍNICO')

  const cleanedAiOpinion = sanitizeText(aiOpinion, { preserveNewlines: true })
  const parsedAiReport = cleanedAiOpinion ? parseAiClinicalReport(cleanedAiOpinion) : null

  if (parsedAiReport) {
    writeWrapped('NEUROLOCALIZAÇÃO', 'bold', 12, 2)
    writeList([
      `Localização provável: ${formatValue(parsedAiReport.neurolocalization.probableLocation)}`,
      `Distribuição: ${formatValue(parsedAiReport.neurolocalization.distribution)}`,
      `Padrão motor: ${formatValue(parsedAiReport.neurolocalization.motorPattern)}`,
      `Confiança estimada: ${formatValue(parsedAiReport.neurolocalization.confidence)}`,
    ])

    writeWrapped('Raciocínio de neurolocalização:', 'bold', 12, 2)
    writeWrapped(formatValue(parsedAiReport.neurolocalization.reasoning), 'normal', 12, 3)

    if (parsedAiReport.neurolocalization.supportiveFindings.length > 0) {
      writeWrapped('Achados que sustentam:', 'bold', 12, 2)
      writeBulletList(doc, parsedAiReport.neurolocalization.supportiveFindings, state, { left, width, pageHeight })
      state.y += 1
    }

    if (parsedAiReport.neurolocalization.contradictoryFindings.length > 0) {
      writeWrapped('Achados contraditórios:', 'bold', 12, 2)
      writeBulletList(doc, parsedAiReport.neurolocalization.contradictoryFindings, state, {
        left,
        width,
        pageHeight,
      })
      state.y += 1
    }

    if (parsedAiReport.differentials.length > 0) {
      writeWrapped('TOP 5 DIAGNÓSTICOS DIFERENCIAIS', 'bold', 12, 2)

      parsedAiReport.differentials.forEach((dx, index) => {
        writeWrapped(`${index + 1}. ${formatValue(dx.title)}${dx.probability !== null ? ` - ${dx.probability}%` : ''}`, 'bold', 12, 2)
        writeWrapped(`Categoria: ${formatValue(dx.category, 'Não informada')}`, 'normal', 12, 2)

        if (dx.clinicalFit) {
          writeWrapped('Síntese clínica:', 'bold', 12, 2)
          writeWrapped(dx.clinicalFit, 'normal', 12, 2)
        }
        if (dx.supportingFindings.length > 0) {
          writeWrapped('Achados a favor:', 'bold', 12, 2)
          writeBulletList(doc, dx.supportingFindings, state, { left, width, pageHeight })
        }
        if (dx.opposingFindings.length > 0) {
          writeWrapped('Achados contra:', 'bold', 12, 2)
          writeBulletList(doc, dx.opposingFindings, state, { left, width, pageHeight })
        }
        if (dx.prioritizedDiagnostics.length > 0) {
          writeWrapped('Exames priorizados:', 'bold', 12, 2)
          writeBulletList(doc, dx.prioritizedDiagnostics, state, { left, width, pageHeight })
        }
        if (dx.patientAssessment.length > 0) {
          writeWrapped('Como avaliar este paciente no plantão:', 'bold', 12, 2)
          writeBulletList(doc, dx.patientAssessment, state, { left, width, pageHeight })
        }
        if (dx.monitoringPlan.length > 0) {
          writeWrapped('Monitorização e reavaliação:', 'bold', 12, 2)
          writeBulletList(doc, dx.monitoringPlan, state, { left, width, pageHeight })
        }
        if (dx.treatmentPlan.length > 0) {
          writeWrapped('Tratamento e conduta:', 'bold', 12, 2)
          writeBulletList(doc, dx.treatmentPlan, state, { left, width, pageHeight })
        }
        if (dx.allowedDrugs.length > 0) {
          writeWrapped('Fármacos que posso considerar:', 'bold', 12, 2)
          writeBulletList(doc, dx.allowedDrugs, state, { left, width, pageHeight })
        }
        if (dx.avoidDrugs.length > 0) {
          writeWrapped('Fármacos a evitar ou ajustar:', 'bold', 12, 2)
          writeBulletList(doc, dx.avoidDrugs, state, { left, width, pageHeight })
        }
        if (dx.comorbidityIntegration.length > 0) {
          writeWrapped('Como as comorbidades mudam a conduta:', 'bold', 12, 2)
          writeBulletList(doc, dx.comorbidityIntegration, state, { left, width, pageHeight })
        }

        state.y += 2
      })
    }

    if (parsedAiReport.priorities.length > 0) {
      writeWrapped('PRIORIDADES PRÁTICAS NAS PRÓXIMAS 6 HORAS', 'bold', 12, 2)
      writeBulletList(doc, parsedAiReport.priorities, state, { left, width, pageHeight })
      state.y += 1
    }

    if (parsedAiReport.criticalAlerts.length > 0) {
      writeWrapped('ALERTAS CLÍNICOS CRÍTICOS', 'bold', 12, 2)
      writeBulletList(doc, parsedAiReport.criticalAlerts, state, { left, width, pageHeight })
      state.y += 1
    }

    if (
      parsedAiReport.comorbidityImpact.alerts.length > 0 ||
      parsedAiReport.comorbidityImpact.cautions.length > 0 ||
      parsedAiReport.comorbidityImpact.recommendedTests.length > 0 ||
      parsedAiReport.comorbidityImpact.avoidOrAdjust.length > 0
    ) {
      writeWrapped('IMPACTO DAS COMORBIDADES', 'bold', 12, 2)

      if (parsedAiReport.comorbidityImpact.alerts.length > 0) {
        writeWrapped('Alertas clínicos:', 'bold', 12, 2)
        writeBulletList(doc, parsedAiReport.comorbidityImpact.alerts, state, { left, width, pageHeight })
      }
      if (parsedAiReport.comorbidityImpact.cautions.length > 0) {
        writeWrapped('Cautelas terapêuticas:', 'bold', 12, 2)
        writeBulletList(doc, parsedAiReport.comorbidityImpact.cautions, state, { left, width, pageHeight })
      }
      if (parsedAiReport.comorbidityImpact.recommendedTests.length > 0) {
        writeWrapped('Exames recomendados:', 'bold', 12, 2)
        writeBulletList(doc, parsedAiReport.comorbidityImpact.recommendedTests, state, {
          left,
          width,
          pageHeight,
        })
      }
      if (parsedAiReport.comorbidityImpact.avoidOrAdjust.length > 0) {
        writeWrapped('Evitar ou ajustar:', 'bold', 12, 2)
        writeBulletList(doc, parsedAiReport.comorbidityImpact.avoidOrAdjust, state, { left, width, pageHeight })
      }

      state.y += 1
    }

    if (parsedAiReport.limitations.length > 0) {
      writeWrapped('LIMITAÇÕES E DADOS FALTANTES', 'bold', 12, 2)
      writeBulletList(doc, parsedAiReport.limitations, state, { left, width, pageHeight })
      state.y += 1
    }

    if (parsedAiReport.references.length > 0) {
      writeWrapped('BASE BIBLIOGRÁFICA CONSIDERADA', 'bold', 12, 2)
      writeBulletList(doc, parsedAiReport.references, state, { left, width, pageHeight })
    }
  } else {
    buildFallbackClinicalSections(report).forEach((section) => {
      writeWrapped(section.title, 'bold', 12, 2)
      writeList(section.lines)
      if (section.bullets && section.bullets.length > 0) {
        writeBulletList(doc, section.bullets, state, { left, width, pageHeight })
        state.y += 1
      }
    })
  }

  ensureSpace(10)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Gerado em ${toPtBrDate()} - NeuroVet`, left, pageHeight - 10)

  const speciesLabel = sanitizeText(caseState?.patient?.species || 'paciente').replace(/\s+/g, '_')
  const fileDate = new Date().toISOString().split('T')[0]
  doc.save(`Ficha_Clinica_Neurologica_${speciesLabel}_${fileDate}.pdf`)
}
