import type { MotorPattern, NeuroAxis, NeuroLocalizationResult } from '../../types/analysis'

type LocalizationScore = {
  axis: NeuroAxis
  score: number
  evidence: string[]
}

function normalizeText(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function equalsOneOf(value: unknown, ...targets: string[]): boolean {
  const normalized = normalizeText(value)
  return targets.some((target) => normalized === normalizeText(target))
}

function includesOneOf(value: unknown, ...targets: string[]): boolean {
  const normalized = normalizeText(value)
  return targets.some((target) => normalized.includes(normalizeText(target)))
}

function hasComplaint(ids: string[], ...targets: string[]): boolean {
  return ids.some((item) => targets.includes(item))
}

function countMatching(values: unknown[], ...targets: string[]): number {
  return values.filter((value) => equalsOneOf(value, ...targets)).length
}

function unique(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)))
}

function buildNarrative(
  primary: NeuroAxis,
  secondary: NeuroAxis[] | undefined,
  motorPattern: MotorPattern,
  distribution: NeuroLocalizationResult['distribution'],
  supportiveFindings: string[],
  contradictoryFindings: string[],
  confidence: number,
): string {
  const axisLabels: Record<NeuroAxis, string> = {
    PROSENCEFALO: 'prosencefalo',
    TRONCO_ENCEFALICO: 'tronco encefalico',
    CEREBELO: 'cerebelo',
    VESTIBULAR_PERIFERICO: 'vestibular periferico',
    VESTIBULAR_CENTRAL: 'vestibular central',
    MEDULA_C1_C5: 'medula cervical (C1-C5)',
    MEDULA_C6_T2: 'medula cervicotoracica (C6-T2)',
    MEDULA_T3_L3: 'medula toracolombar (T3-L3)',
    MEDULA_L4_S3: 'medula lombossacra (L4-S3)',
    CAUDA_EQUINA: 'cauda equina',
    NEUROMUSCULAR: 'unidade neuromuscular',
    MULTIFOCAL_OU_DIFUSA: 'comprometimento multifocal ou difuso do SNC',
    INDETERMINADO: 'localizacao indeterminada',
  }

  const motorLabels: Record<MotorPattern, string> = {
    UMN: 'padrao de neuronio motor superior',
    LMN: 'padrao de neuronio motor inferior',
    VESTIBULAR: 'padrao vestibular',
    CEREBELAR: 'padrao cerebelar',
    NEUROMUSCULAR: 'padrao neuromuscular',
    INDEFINIDO: 'padrao motor indefinido',
  }

  const distributionLabels: Record<NeuroLocalizationResult['distribution'], string> = {
    FOCAL: 'focal',
    MULTIFOCAL: 'multifocal',
    DIFUSA: 'difusa',
    INDETERMINADA: 'indeterminada',
  }

  const anchors = supportiveFindings.slice(0, 4).join(', ')
  const secondaryText =
    secondary && secondary.length > 0
      ? ` Ha sobreposicao com ${secondary.map((axis) => axisLabels[axis]).join(' e ')}.`
      : ''
  const contradictionText =
    contradictoryFindings.length > 0 ? ` Pontos de cautela: ${contradictoryFindings.slice(0, 2).join('; ')}.` : ''

  return (
    `A leitura integrada do caso favorece ${axisLabels[primary]} com distribuicao ${distributionLabels[distribution]} ` +
    `e ${motorLabels[motorPattern]}. Os achados que mais sustentam essa interpretacao sao ${anchors || 'os deficits neurologicos registrados'}.` +
    secondaryText +
    ` A confianca estimada e ${confidence}%, devendo ser reinterpretada junto da evolucao clinica, dos pares cranianos, das reacoes posturais e da resposta aos exames prioritarios.` +
    contradictionText
  )
}

export function determineNeuroLocalization(caseState: any): NeuroLocalizationResult {
  const exam = caseState?.neuroExam || {}
  const complaintIds = Array.isArray(caseState?.complaint?.chiefComplaintIds) ? caseState.complaint.chiefComplaintIds : []

  const supportiveFindings: string[] = []
  const contradictoryFindings: string[] = []
  const scores: LocalizationScore[] = []

  const seizures =
    hasComplaint(complaintIds, 'ConvulsaoFocal', 'ConvulsaoGeneralizada', 'ClusterConvulsoes') ||
    includesOneOf(caseState?.complaint?.contextNotes, 'convuls')
  const circlingOrHeadPressing = hasComplaint(complaintIds, 'AndarCirculos', 'Comportamento')
  const acuteBlindness = hasComplaint(complaintIds, 'Cegueira')
  const collapse = hasComplaint(complaintIds, 'Sincope', 'Colapso')
  const headTilt =
    equalsOneOf(exam.head_posture, 'Head Tilt') || hasComplaint(complaintIds, 'HeadTilt') || hasComplaint(complaintIds, 'Vertigem')
  const alteredMentation = equalsOneOf(exam.mentation, 'Deprimido', 'Estupor', 'Coma')
  const alteredBehavior = !!exam.behavior && !equalsOneOf(exam.behavior, 'Normal')
  const menaceAbsent = equalsOneOf(exam.menace_left, 'Ausente') || equalsOneOf(exam.menace_right, 'Ausente')
  const menaceWithFunctionalPupil =
    (equalsOneOf(exam.menace_left, 'Ausente') && !equalsOneOf(exam.plr_left, 'Ausente')) ||
    (equalsOneOf(exam.menace_right, 'Ausente') && !equalsOneOf(exam.plr_right, 'Ausente'))

  const posturalDeficitCount = countMatching(
    [
      exam.proprioception_thoracic_left,
      exam.proprioception_thoracic_right,
      exam.proprioception_pelvic_left,
      exam.proprioception_pelvic_right,
    ],
    'Diminuido',
    'Ausente',
  )

  const thoracicAffected =
    equalsOneOf(exam.gait_thoracic, 'Ataxia', 'Paresia', 'Plegia') ||
    equalsOneOf(exam.proprioception_thoracic_left, 'Diminuido', 'Ausente') ||
    equalsOneOf(exam.proprioception_thoracic_right, 'Diminuido', 'Ausente')
  const pelvicAffected =
    equalsOneOf(exam.gait_pelvic, 'Ataxia', 'Paresia', 'Plegia') ||
    equalsOneOf(exam.proprioception_pelvic_left, 'Diminuido', 'Ausente') ||
    equalsOneOf(exam.proprioception_pelvic_right, 'Diminuido', 'Ausente')
  const allFourLimbsAffected = thoracicAffected && pelvicAffected

  const vestibularSigns =
    equalsOneOf(exam.nystagmus, 'Presente') || equalsOneOf(exam.strabismus, 'Presente') || headTilt
  const facialDeficit = equalsOneOf(exam.cn_facial_sensation, 'Diminuido', 'Ausente')
  const swallowingDeficit = equalsOneOf(exam.cn_swallowing, 'Diminuido', 'Ausente')
  const plrAbnormal = equalsOneOf(exam.plr_left, 'Lento', 'Ausente') || equalsOneOf(exam.plr_right, 'Lento', 'Ausente')
  const cranialDeficitCount =
    (menaceAbsent ? 1 : 0) +
    (plrAbnormal ? 1 : 0) +
    (facialDeficit ? 1 : 0) +
    (swallowingDeficit ? 1 : 0) +
    (vestibularSigns ? 1 : 0)

  const cervicalPain = equalsOneOf(exam.pain_cervical, 'Leve', 'Moderada', 'Severa')
  const thoracolumbarPain = equalsOneOf(exam.pain_thoracolumbar, 'Leve', 'Moderada', 'Severa')
  const lumbosacralPain = equalsOneOf(exam.pain_lumbosacral, 'Leve', 'Moderada', 'Severa')

  const patellarIncreased = equalsOneOf(exam.reflex_patellar_left, 'Aumentado') || equalsOneOf(exam.reflex_patellar_right, 'Aumentado')
  const patellarReduced = equalsOneOf(exam.reflex_patellar_left, 'Diminuido', 'Ausente') || equalsOneOf(exam.reflex_patellar_right, 'Diminuido', 'Ausente')
  const panniculusCutoff = equalsOneOf(exam.reflex_panniculus, 'Cutoff')
  const withdrawalReduced =
    equalsOneOf(exam.reflex_withdrawal_left_thoracic, 'Diminuido', 'Ausente') ||
    equalsOneOf(exam.reflex_withdrawal_right_thoracic, 'Diminuido', 'Ausente')
  const nonAmbulatory = equalsOneOf(exam.ambulation, 'Nao Ambulatorio', 'Plegia')
  const cerebellarAtaxia = equalsOneOf(exam.ataxia_type, 'Cerebelar') || hasComplaint(complaintIds, 'Hipermetria')
  const vestibularAtaxia = equalsOneOf(exam.ataxia_type, 'Vestibular')
  const proprioceptiveAtaxia = equalsOneOf(exam.ataxia_type, 'Proprioceptiva')

  let prosencephalonScore = 0
  const prosencephalonEvidence: string[] = []
  if (seizures) {
    prosencephalonScore += 40
    prosencephalonEvidence.push('convulsoes focais/generalizadas')
    supportiveFindings.push('Convulsoes focais/generalizadas sugerem prosencefalo')
  }
  if (circlingOrHeadPressing) {
    prosencephalonScore += 24
    prosencephalonEvidence.push('andar em circulos/head pressing')
    supportiveFindings.push('Andar em circulos ou head pressing favorece prosencefalo')
  }
  if (acuteBlindness || menaceWithFunctionalPupil) {
    prosencephalonScore += 22
    prosencephalonEvidence.push('cegueira cortical/ameaca ausente com reflexo pupilar preservado')
    supportiveFindings.push('Resposta a ameaca ausente com reflexo pupilar preservado favorece via visual central')
  }
  /** Padrão cruzado: ameaça ausente em um olho + propriocepção torácica contralateral alterada — sugere prosencéfalo (integração cortical). */
  const menaceLeftAbsentOnly =
    equalsOneOf(exam.menace_left, 'Ausente') && !equalsOneOf(exam.menace_right, 'Ausente')
  const menaceRightAbsentOnly =
    equalsOneOf(exam.menace_right, 'Ausente') && !equalsOneOf(exam.menace_left, 'Ausente')
  const propThoracicRightBad =
    equalsOneOf(exam.proprioception_thoracic_right, 'Diminuido', 'Ausente')
  const propThoracicLeftBad =
    equalsOneOf(exam.proprioception_thoracic_left, 'Diminuido', 'Ausente')
  if (menaceLeftAbsentOnly && propThoracicRightBad) {
    prosencephalonScore += 14
    prosencephalonEvidence.push('ameaca olho esquerdo ausente com propriocepcao toracica direita alterada')
    supportiveFindings.push(
      'Padrao cruzado (ameaca a esquerda ausente com propriocepcao toracica direita alterada) pode indicar prosencefalo',
    )
  }
  if (menaceRightAbsentOnly && propThoracicLeftBad) {
    prosencephalonScore += 14
    prosencephalonEvidence.push('ameaca olho direito ausente com propriocepcao toracica esquerda alterada')
    supportiveFindings.push(
      'Padrao cruzado (ameaca a direita ausente com propriocepcao toracica esquerda alterada) pode indicar prosencefalo',
    )
  }
  if (alteredMentation || alteredBehavior) {
    prosencephalonScore += 15
    prosencephalonEvidence.push('alteracao de mentacao/comportamento')
  }
  if (posturalDeficitCount >= 2 && !vestibularSigns) {
    prosencephalonScore += 10
    prosencephalonEvidence.push('deficits posturais sem vestibular puro')
  }
  if (prosencephalonScore > 0) {
    scores.push({ axis: 'PROSENCEFALO', score: prosencephalonScore, evidence: prosencephalonEvidence })
  }

  let brainstemScore = 0
  const brainstemEvidence: string[] = []
  if (cranialDeficitCount >= 2) {
    brainstemScore += 28
    brainstemEvidence.push('multiplos deficits de pares cranianos')
    supportiveFindings.push('Multiplos deficits de pares cranianos sugerem tronco encefalico')
  }
  if (allFourLimbsAffected && posturalDeficitCount >= 2) {
    brainstemScore += 20
    brainstemEvidence.push('tetraparesia/tetrapostural')
  }
  if (alteredMentation) {
    brainstemScore += 16
    brainstemEvidence.push('alteracao de mentacao')
  }
  if (vestibularSigns && (posturalDeficitCount > 0 || cranialDeficitCount >= 2)) {
    brainstemScore += 12
    brainstemEvidence.push('sindrome vestibular central')
  }
  if (facialDeficit || swallowingDeficit || plrAbnormal) {
    brainstemScore += 10
    brainstemEvidence.push('pares cranianos centrais alterados')
  }
  if (brainstemScore > 0) {
    scores.push({ axis: 'TRONCO_ENCEFALICO', score: brainstemScore, evidence: brainstemEvidence })
  }

  let vestibularPeripheralScore = 0
  if (vestibularSigns && !alteredMentation && posturalDeficitCount === 0 && cranialDeficitCount <= 1) {
    vestibularPeripheralScore = 62
    supportiveFindings.push('Sindrome vestibular periferica: vestibular puro com mentacao preservada')
    scores.push({
      axis: 'VESTIBULAR_PERIFERICO',
      score: vestibularPeripheralScore,
      evidence: ['head tilt/nistagmo sem deficits posturais ou alteracao de mentacao'],
    })
  }

  let vestibularCentralScore = 0
  if (vestibularSigns && (alteredMentation || posturalDeficitCount > 0 || cranialDeficitCount >= 2)) {
    vestibularCentralScore = 68
    supportiveFindings.push('Sindrome vestibular central: vestibular associado a deficits centrais')
    scores.push({
      axis: 'VESTIBULAR_CENTRAL',
      score: vestibularCentralScore,
      evidence: ['head tilt/nistagmo com deficits posturais ou pares cranianos'],
    })
  }

  if (cerebellarAtaxia) {
    supportiveFindings.push('Ataxia cerebelar/hipermetria favorece cerebelo')
    scores.push({
      axis: 'CEREBELO',
      score: 62,
      evidence: ['ataxia cerebelar ou hipermetria'],
    })
  }

  const thoracicLmn = equalsOneOf(exam.gait_thoracic, 'Paresia', 'Plegia') && withdrawalReduced
  const pelvicUmn = equalsOneOf(exam.gait_pelvic, 'Paresia', 'Plegia') && !patellarReduced

  if (allFourLimbsAffected && (patellarIncreased || (!patellarReduced && !withdrawalReduced)) && cervicalPain) {
    supportiveFindings.push('Tetraparesia com dor cervical sugere medula cervical cranial')
    scores.push({
      axis: 'MEDULA_C1_C5',
      score: 50,
      evidence: ['quatro membros afetados com dor cervical e padrao medular cranial'],
    })
  }

  if (thoracicLmn && pelvicUmn) {
    supportiveFindings.push('Toracicos com padrao LMN e pelvicos com padrao UMN sugerem C6-T2')
    scores.push({
      axis: 'MEDULA_C6_T2',
      score: 64,
      evidence: ['toracicos LMN com pelvicos UMN'],
    })
  }

  if (!thoracicAffected && pelvicAffected && !patellarReduced) {
    supportiveFindings.push('Paraparesia/propriocepcao pelvica isolada favorece T3-L3')
    scores.push({
      axis: 'MEDULA_T3_L3',
      score: 68,
      evidence: ['toracicos preservados com pelvicos UMN'],
    })
  }

  if (panniculusCutoff && !thoracicAffected && pelvicAffected && !patellarReduced) {
    supportiveFindings.push('Cutoff do panniculus com deficit pelvico e padrao UMN reforca segmento T3-L3')
    scores.push({
      axis: 'MEDULA_T3_L3',
      score: 58,
      evidence: ['cutoff panniculus + pelvicos UMN + toracicos preservados'],
    })
  }
  if (panniculusCutoff && patellarReduced && !thoracicAffected && pelvicAffected) {
    contradictoryFindings.push(
      'Cutoff do panniculus com reflexos pelvicos diminuidos: ponderar tambem L4-S3/cauda em paralelo ao T3-L3',
    )
  }

  if (!thoracicAffected && pelvicAffected && patellarReduced) {
    supportiveFindings.push('Pelvicos com reflexos reduzidos favorecem L4-S3')
    scores.push({
      axis: 'MEDULA_L4_S3',
      score: 66,
      evidence: ['pelvicos LMN'],
    })
  }

  if (lumbosacralPain && pelvicAffected && patellarReduced) {
    supportiveFindings.push('Dor lombossacra com pelvicos LMN favorece cauda equina')
    scores.push({
      axis: 'CAUDA_EQUINA',
      score: 70,
      evidence: ['dor lombossacra com pelvicos LMN'],
    })
  }

  if (nonAmbulatory && patellarReduced && withdrawalReduced && !alteredMentation && !cranialDeficitCount) {
    supportiveFindings.push('Fraqueza difusa com hiporreflexia favorece unidade neuromuscular')
    scores.push({
      axis: 'NEUROMUSCULAR',
      score: 64,
      evidence: ['fraqueza difusa com hiporreflexia'],
    })
  }

  const explicitMultifocalPattern =
    prosencephalonScore >= 60 && cranialDeficitCount >= 2 && posturalDeficitCount >= 3

  if (explicitMultifocalPattern) {
    supportiveFindings.push('Sindrome prosencefalica associada a deficits de pares cranianos e propriocepcao em quatro membros sugere processo multifocal')
    contradictoryFindings.push('Mentacao alerta nao impede processo multifocal quando ha sinais focais combinados')
    const confidence = Math.min(94, Math.max(68, Math.round(prosencephalonScore * 0.55 + brainstemScore * 0.45)))
    const motorPattern: MotorPattern = nonAmbulatory && allFourLimbsAffected ? 'UMN' : 'INDEFINIDO'
    return {
      status: 'ok',
      primary: 'MULTIFOCAL_OU_DIFUSA',
      secondary: unique(['PROSENCEFALO', brainstemScore >= 38 ? 'TRONCO_ENCEFALICO' : '', cervicalPain ? 'MEDULA_C1_C5' : '']).filter(
        Boolean,
      ) as NeuroAxis[],
      distribution: alteredMentation ? 'DIFUSA' : 'MULTIFOCAL',
      motorPattern,
      confidence,
      supportiveFindings: unique(supportiveFindings).slice(0, 6),
      contradictoryFindings: unique(contradictoryFindings).slice(0, 4),
      narrative: buildNarrative(
        'MULTIFOCAL_OU_DIFUSA',
        unique(['PROSENCEFALO', brainstemScore >= 38 ? 'TRONCO_ENCEFALICO' : '', cervicalPain ? 'MEDULA_C1_C5' : '']).filter(
          Boolean,
        ) as NeuroAxis[],
        motorPattern,
        alteredMentation ? 'DIFUSA' : 'MULTIFOCAL',
        unique(supportiveFindings),
        unique(contradictoryFindings),
        confidence,
      ),
    }
  }

  const centralAxes = scores.filter((item) =>
    ['PROSENCEFALO', 'TRONCO_ENCEFALICO', 'CEREBELO', 'MEDULA_C1_C5', 'MEDULA_C6_T2', 'VESTIBULAR_CENTRAL'].includes(
      item.axis,
    ),
  )
  const highCentralAxes = centralAxes.filter((item) => item.score >= 42)

  if (highCentralAxes.length >= 2) {
    const multifocalScore = Math.max(...highCentralAxes.map((item) => item.score)) + 8
    supportiveFindings.push('Combinacao de sinais de prosencefalo, tronco encefalico ou medula cervical sugere multifocal/difusa')
    if (!alteredMentation && highCentralAxes.some((item) => item.axis === 'PROSENCEFALO')) {
      contradictoryFindings.push('Mentacao alerta nao exclui encefalopatia multifocal, mas reduz a forca de doenca difusa grave')
    }
    if (!vestibularSigns && highCentralAxes.some((item) => item.axis === 'TRONCO_ENCEFALICO')) {
      contradictoryFindings.push('Ausencia de nistagmo/estrabismo nao afasta lesao de tronco encefalico rostral')
    }
    scores.push({
      axis: 'MULTIFOCAL_OU_DIFUSA',
      score: multifocalScore,
      evidence: highCentralAxes.flatMap((item) => item.evidence).slice(0, 4),
    })
  }

  if (collapse && !seizures && !cranialDeficitCount && !posturalDeficitCount) {
    contradictoryFindings.push('Colapso sem deficits neurologicos sustentados pode representar causa nao neurologica primaria')
  }
  if (thoracolumbarPain && (prosencephalonScore > 0 || brainstemScore > 0)) {
    contradictoryFindings.push('Dor toracolombar relevante sugere procurar componente espinhal associado')
  }
  if (proprioceptiveAtaxia && !thoracicAffected && !pelvicAffected) {
    contradictoryFindings.push('Ataxia proprioceptiva sem paresia clara exige reavaliar propriocepcao e marcha em video')
  }

  const ranked = scores.sort((left, right) => right.score - left.score)
  if (ranked.length === 0 || ranked[0].score < 30) {
    return {
      status: 'ok',
      primary: 'INDETERMINADO',
      distribution: 'INDETERMINADA',
      motorPattern: 'INDEFINIDO',
      confidence: 0,
      supportiveFindings: ['Dados insuficientes para localizacao confiavel'],
      contradictoryFindings: [],
      narrative:
        'Nao foi possivel determinar a neurolocalizacao com confianca com base nos dados registrados. Recomenda-se completar exame neurologico, historia e contexto clinico.',
    }
  }

  const primary = ranked[0].axis
  const secondary = ranked
    .filter((item) => item.axis !== primary && item.score >= Math.max(40, ranked[0].score - 12))
    .slice(0, 2)
    .map((item) => item.axis)

  let distribution: NeuroLocalizationResult['distribution'] = 'FOCAL'
  if (primary === 'MULTIFOCAL_OU_DIFUSA') {
    distribution = alteredMentation && highCentralAxes.length >= 3 ? 'DIFUSA' : 'MULTIFOCAL'
  } else if (secondary.length > 0) {
    distribution = 'MULTIFOCAL'
  }

  let motorPattern: MotorPattern = 'INDEFINIDO'
  if (primary === 'VESTIBULAR_PERIFERICO' || primary === 'VESTIBULAR_CENTRAL' || vestibularAtaxia) {
    motorPattern = 'VESTIBULAR'
  } else if (primary === 'CEREBELO' || cerebellarAtaxia) {
    motorPattern = 'CEREBELAR'
  } else if (primary === 'NEUROMUSCULAR') {
    motorPattern = 'NEUROMUSCULAR'
  } else if (patellarReduced || withdrawalReduced) {
    motorPattern = 'LMN'
  } else if (patellarIncreased || (nonAmbulatory && allFourLimbsAffected)) {
    motorPattern = 'UMN'
  }

  const scoreGap = ranked[0].score - (ranked[1]?.score || 0)
  const confidence = Math.max(
    35,
    Math.min(92, Math.round(ranked[0].score + scoreGap * 0.6 + supportiveFindings.length * 2)),
  )

  return {
    status: 'ok',
    primary,
    secondary: secondary.length > 0 ? secondary : undefined,
    distribution,
    motorPattern,
    confidence,
    supportiveFindings: unique(supportiveFindings).slice(0, 6),
    contradictoryFindings: unique(contradictoryFindings).slice(0, 4),
    narrative: buildNarrative(
      primary,
      secondary.length > 0 ? secondary : undefined,
      motorPattern,
      distribution,
      unique(supportiveFindings),
      unique(contradictoryFindings),
      confidence,
    ),
  }
}
