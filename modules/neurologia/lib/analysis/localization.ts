import type { NeuroAxis, MotorPattern, NeuroLocalizationResult } from '../../types/analysis'

type ExamData = {
  mentation?: string
  behavior?: string
  ambulation?: string
  gait_thoracic?: string
  gait_pelvic?: string
  ataxia_type?: string
  proprioception_thoracic_left?: string
  proprioception_thoracic_right?: string
  proprioception_pelvic_left?: string
  proprioception_pelvic_right?: string
  menace_left?: string
  menace_right?: string
  plr_left?: string
  plr_right?: string
  nystagmus?: string
  strabismus?: string
  cn_facial_sensation?: string
  cn_swallowing?: string
  reflex_patellar_left?: string
  reflex_patellar_right?: string
  reflex_withdrawal_left_thoracic?: string
  reflex_withdrawal_right_thoracic?: string
  reflex_panniculus?: string
  deep_pain?: string
  pain_cervical?: string
  pain_thoracolumbar?: string
  pain_lumbosacral?: string
}

type LocalizationScore = {
  axis: NeuroAxis
  score: number
  evidence: string[]
}

export function determineNeuroLocalization(caseState: any): NeuroLocalizationResult {
  const exam: ExamData = caseState.neuroExam || {}
  const scores: LocalizationScore[] = []
  const supportiveFindings: string[] = []
  const contradictoryFindings: string[] = []

  // Verificar sinais vestibulares (definir antes de usar)
  const hasVestibularSigns =
    exam.nystagmus === 'Presente' ||
    exam.strabismus === 'Presente' ||
    (exam.behavior || '').includes('Head Tilt') ||
    (exam.mentation || '').includes('Head Tilt')

  // PROSENCEFALO - Regras melhoradas
  let prosScore = 0
  const prosEvidence: string[] = []
  const hasAlteredMentation = exam.mentation && ['Deprimido', 'Estupor', 'Coma'].includes(exam.mentation)
  const hasAlteredBehavior = exam.behavior && exam.behavior !== 'Normal'

  // Verificar déficits posturais contralaterais (suporta prosencéfalo)
  const posturalDeficits =
    [
      exam.proprioception_thoracic_left,
      exam.proprioception_thoracic_right,
      exam.proprioception_pelvic_left,
      exam.proprioception_pelvic_right,
    ].filter((v) => v === 'Diminuído' || v === 'Ausente').length

  // Menace ausente com PLR normal → reforça prosencéfalo/cerebelo
  const menaceAbsent =
    (exam.menace_left === 'Ausente' && exam.plr_left === 'Normal') ||
    (exam.menace_right === 'Ausente' && exam.plr_right === 'Normal')

  if (hasAlteredMentation) {
    prosScore += 35
    prosEvidence.push('Alteração de consciência')
    supportiveFindings.push('Alteração de consciência (deprimido/estupor/coma)')
  }

  if (hasAlteredBehavior) {
    prosScore += 25
    prosEvidence.push('Alteração comportamental')
    supportiveFindings.push(`Alteração comportamental: ${exam.behavior}`)
  }

  // Reforçar se déficits posturais contralaterais (sem padrão vestibular)
  if (posturalDeficits > 0 && !hasVestibularSigns) {
    prosScore += 15
    prosEvidence.push('Déficits posturais presentes')
  }

  // Reforçar se menace ausente com PLR normal
  if (menaceAbsent && !exam.nystagmus && !exam.strabismus) {
    prosScore += 10
    prosEvidence.push('Menace ausente com PLR preservado')
    supportiveFindings.push('Menace ausente com reflexo pupilar preservado (sugere prosencéfalo)')
  }

  if (prosScore > 0) {
    scores.push({ axis: 'PROSENCEFALO', score: prosScore, evidence: prosEvidence })
  }

  // VESTIBULAR - Regras melhoradas
  let vestScore = 0
  const vestEvidence: string[] = []

  if (hasVestibularSigns) {
    vestScore += 40
    vestEvidence.push('Sinais vestibulares presentes')
    if (exam.nystagmus === 'Presente') supportiveFindings.push('Nistagmo presente')
    if (exam.strabismus === 'Presente') supportiveFindings.push('Estrabismo presente')

    // Verificar déficits posturais (para diferenciar central vs periférico)
    const hasPosturalDeficits =
      exam.proprioception_thoracic_left === 'Diminuído' ||
      exam.proprioception_thoracic_left === 'Ausente' ||
      exam.proprioception_thoracic_right === 'Diminuído' ||
      exam.proprioception_thoracic_right === 'Ausente' ||
      exam.proprioception_pelvic_left === 'Diminuído' ||
      exam.proprioception_pelvic_left === 'Ausente' ||
      exam.proprioception_pelvic_right === 'Diminuído' ||
      exam.proprioception_pelvic_right === 'Ausente'

    // Verificar paresia/UMN (indica central)
    const hasParesia =
      exam.gait_thoracic === 'Paresia' ||
      exam.gait_thoracic === 'Plegia' ||
      exam.gait_pelvic === 'Paresia' ||
      exam.gait_pelvic === 'Plegia'

    // Verificar múltiplos déficits de NC (indica central)
    const hasMultipleCNDeficits =
      (exam.plr_left === 'Lento' || exam.plr_left === 'Ausente' ? 1 : 0) +
      (exam.plr_right === 'Lento' || exam.plr_right === 'Ausente' ? 1 : 0) +
      (exam.cn_swallowing === 'Diminuído' || exam.cn_swallowing === 'Ausente' ? 1 : 0) >=
      2

    // VESTIBULAR_CENTRAL: se alteração de mentação OU déficits posturais OU paresia/UMN OU múltiplos NC
    if (
      (exam.mentation && exam.mentation !== 'Alerta') ||
      hasPosturalDeficits ||
      hasParesia ||
      hasMultipleCNDeficits
    ) {
      scores.push({
        axis: 'VESTIBULAR_CENTRAL',
        score: vestScore + 25,
        evidence: [
          ...vestEvidence,
          hasPosturalDeficits ? 'Déficits posturais presentes' : '',
          hasParesia ? 'Paresia/plegia associada' : '',
          hasMultipleCNDeficits ? 'Múltiplos déficits de nervos cranianos' : '',
          exam.mentation && exam.mentation !== 'Alerta' ? 'Alteração de consciência' : '',
        ].filter(Boolean),
      })
      supportiveFindings.push('Vestibular central: sinais vestibulares + déficits posturais/NC/paresia')
    } else {
      // VESTIBULAR_PERIFERICO: head tilt + nistagmo + sem déficits posturais + mentação normal
      scores.push({
        axis: 'VESTIBULAR_PERIFERICO',
        score: vestScore + 15,
        evidence: [...vestEvidence, 'Sem déficits posturais ou de NC', 'Mentação preservada'],
      })
      supportiveFindings.push('Vestibular periférico: sinais vestibulares isolados sem déficits posturais')
    }
  }

  // CEREBELO
  let cerebScore = 0
  const cerebEvidence: string[] = []
  if (exam.ataxia_type === 'Cerebelar') {
    cerebScore += 50
    cerebEvidence.push('Ataxia cerebelar')
    supportiveFindings.push('Ataxia do tipo cerebelar')
  }
  if (cerebScore > 0) {
    scores.push({ axis: 'CEREBELO', score: cerebScore, evidence: cerebEvidence })
  }

  // MEDULA (baseado em padrão UMN/LMN e distribuição)
  const thoracicGait = exam.gait_thoracic
  const pelvicGait = exam.gait_pelvic
  const patellarLeft = exam.reflex_patellar_left
  const patellarRight = exam.reflex_patellar_right
  const withdrawalLeft = exam.reflex_withdrawal_left_thoracic
  const withdrawalRight = exam.reflex_withdrawal_right_thoracic

  // C1-C5: Torácicos e pélvicos com sinais UMN
  if (
    (thoracicGait === 'Paresia' || thoracicGait === 'Plegia') &&
    (pelvicGait === 'Paresia' || pelvicGait === 'Plegia') &&
    (patellarLeft === 'Normal' || patellarLeft === 'Aumentado') &&
    (patellarRight === 'Normal' || patellarRight === 'Aumentado')
  ) {
    scores.push({
      axis: 'MEDULA_C1_C5',
      score: 60,
      evidence: ['Quadriparesia/plegia com reflexos espinhais preservados ou aumentados'],
    })
    supportiveFindings.push('Quadriparesia/plegia com reflexos aumentados (padrão UMN C1-C5)')
  }

  // C6-T2: Torácicos LMN + pélvicos UMN
  if (
    (thoracicGait === 'Paresia' || thoracicGait === 'Plegia') &&
    (withdrawalLeft === 'Diminuído' || withdrawalLeft === 'Ausente') &&
    (withdrawalRight === 'Diminuído' || withdrawalRight === 'Ausente') &&
    (patellarLeft === 'Normal' || patellarLeft === 'Aumentado')
  ) {
    scores.push({
      axis: 'MEDULA_C6_T2',
      score: 65,
      evidence: ['Paresia torácica LMN + pélvica UMN'],
    })
    supportiveFindings.push('Paresia torácica com reflexos diminuídos + pélvica com reflexos aumentados')
  }

  // T3-L3: Pélvicos UMN, torácicos normais
  if (
    thoracicGait === 'Normal' &&
    (pelvicGait === 'Paresia' || pelvicGait === 'Plegia') &&
    (patellarLeft === 'Normal' || patellarLeft === 'Aumentado') &&
    (patellarRight === 'Normal' || patellarRight === 'Aumentado')
  ) {
    scores.push({
      axis: 'MEDULA_T3_L3',
      score: 70,
      evidence: ['Paraparesia/plegia pélvica com reflexos preservados/aumentados, torácicos normais'],
    })
    supportiveFindings.push('Paraparesia/plegia pélvica com reflexos aumentados (padrão UMN T3-L3)')
  }

  // L4-S3 / CAUDA_EQUINA: Pélvicos LMN
  if (
    (pelvicGait === 'Paresia' || pelvicGait === 'Plegia') &&
    (patellarLeft === 'Diminuído' || patellarLeft === 'Ausente') &&
    (patellarRight === 'Diminuído' || patellarRight === 'Ausente')
  ) {
    const hasIncontinence =
      exam.deep_pain === 'Ausente' || exam.pain_lumbosacral === 'Severa'
    if (hasIncontinence) {
      scores.push({
        axis: 'CAUDA_EQUINA',
        score: 75,
        evidence: ['Paraparesia/plegia pélvica LMN com possível incontinência'],
      })
      supportiveFindings.push('Paraparesia/plegia pélvica com reflexos diminuídos/ausentes (padrão LMN L4-S3/Cauda Equina)')
    } else {
      scores.push({
        axis: 'MEDULA_L4_S3',
        score: 70,
        evidence: ['Paraparesia/plegia pélvica LMN'],
      })
      supportiveFindings.push('Paraparesia/plegia pélvica com reflexos diminuídos (padrão LMN L4-S3)')
    }
  }

  // NEUROMUSCULAR: Fraqueza generalizada + reflexos diminuídos difusos
  if (
    (exam.ambulation === 'Não Ambulatório' || exam.ambulation === 'Plegia') &&
    (patellarLeft === 'Diminuído' || patellarLeft === 'Ausente') &&
    (patellarRight === 'Diminuído' || patellarRight === 'Ausente') &&
    (withdrawalLeft === 'Diminuído' || withdrawalLeft === 'Ausente') &&
    (withdrawalRight === 'Diminuído' || withdrawalRight === 'Ausente')
  ) {
    scores.push({
      axis: 'NEUROMUSCULAR',
      score: 60,
      evidence: ['Fraqueza generalizada com reflexos diminuídos difusos'],
    })
    supportiveFindings.push('Fraqueza generalizada com reflexos espinhais diminuídos difusos (padrão neuromuscular)')
  }

  // TRONCO_ENCEFALICO - Regras melhoradas
  const hasAlteredMentationForTronco = exam.mentation && ['Deprimido', 'Estupor', 'Coma'].includes(exam.mentation)

  const cnDeficits: string[] = []
  let cnDeficitCount = 0

  if (exam.plr_left === 'Lento' || exam.plr_left === 'Ausente') {
    cnDeficits.push('PLR esquerdo alterado')
    cnDeficitCount++
  }
  if (exam.plr_right === 'Lento' || exam.plr_right === 'Ausente') {
    cnDeficits.push('PLR direito alterado')
    cnDeficitCount++
  }
  if (exam.cn_swallowing === 'Diminuído' || exam.cn_swallowing === 'Ausente') {
    cnDeficits.push('Déficit de deglutição (IX/X)')
    cnDeficitCount++
  }
  if (exam.cn_facial_sensation === 'Diminuído' || exam.cn_facial_sensation === 'Ausente') {
    cnDeficits.push('Déficit de sensibilidade facial (V)')
    cnDeficitCount++
  }
  if (exam.nystagmus === 'Presente' || exam.strabismus === 'Presente') {
    cnDeficits.push('Sinais vestibulares/oculomotores')
    cnDeficitCount++
  }

  // Verificar déficits posturais ipsilaterais (quando presentes)
  const hasPosturalDeficitsIpsilateral =
    (exam.proprioception_thoracic_left === 'Diminuído' ||
      exam.proprioception_thoracic_left === 'Ausente') ||
    (exam.proprioception_pelvic_left === 'Diminuído' || exam.proprioception_pelvic_left === 'Ausente')

  if (hasAlteredMentationForTronco && cnDeficitCount >= 2) {
    let troncoScore = 60
    const troncoEvidence: string[] = ['Alteração de consciência', `Múltiplos déficits de nervos cranianos (${cnDeficitCount})`]

    if (hasPosturalDeficitsIpsilateral) {
      troncoScore += 10
      troncoEvidence.push('Déficits posturais presentes')
    }

    scores.push({
      axis: 'TRONCO_ENCEFALICO',
      score: troncoScore,
      evidence: troncoEvidence,
    })
    supportiveFindings.push(
      `Alteração de consciência + múltiplos déficits de nervos cranianos (${cnDeficits.slice(0, 3).join(', ')}) - tronco encefálico`,
    )
  }

  // MULTIFOCAL_OU_DIFUSA: Se múltiplas localizações com scores similares
  const sortedScores = scores.sort((a, b) => b.score - a.score)
  if (sortedScores.length >= 2 && sortedScores[0].score > 0 && sortedScores[1].score > 0) {
    const diff = sortedScores[0].score - sortedScores[1].score
    if (diff < 15 && sortedScores[0].score >= 40) {
      // Scores próximos e significativos → multifocal/difusa
      scores.push({
        axis: 'MULTIFOCAL_OU_DIFUSA',
        score: Math.max(sortedScores[0].score, sortedScores[1].score),
        evidence: ['Sinais conflitantes em múltiplos eixos neurológicos'],
      })
      contradictoryFindings.push('Múltiplas localizações sugeridas simultaneamente (padrão multifocal/difuso)')
    }
  }

  // Se nenhum score significativo, retornar INDETERMINADO
  if (sortedScores.length === 0 || sortedScores[0].score < 30) {
    return {
      status: 'ok',
      primary: 'INDETERMINADO',
      distribution: 'INDETERMINADA',
      motorPattern: 'INDEFINIDO',
      confidence: 0,
      supportiveFindings: ['Dados insuficientes para localização confiável'],
      contradictoryFindings: [],
      narrative:
        'Não foi possível determinar a neurolocalização com confiança com base nos dados fornecidos. Recomenda-se completar o exame neurológico.',
    }
  }

  const primary = sortedScores[0].axis
  const secondary = sortedScores.length > 1 && sortedScores[1].score >= 40 ? [sortedScores[1].axis] : undefined

  // Determinar padrão motor
  let motorPattern: MotorPattern = 'INDEFINIDO'
  if (primary.startsWith('MEDULA_') || primary === 'PROSENCEFALO' || primary === 'TRONCO_ENCEFALICO') {
    if (patellarLeft === 'Aumentado' || patellarRight === 'Aumentado') {
      motorPattern = 'UMN'
    } else if (patellarLeft === 'Diminuído' || patellarLeft === 'Ausente' || patellarRight === 'Diminuído' || patellarRight === 'Ausente') {
      motorPattern = 'LMN'
    }
  } else if (primary === 'VESTIBULAR_PERIFERICO' || primary === 'VESTIBULAR_CENTRAL') {
    motorPattern = 'VESTIBULAR'
  } else if (primary === 'CEREBELO') {
    motorPattern = 'CEREBELAR'
  } else if (primary === 'NEUROMUSCULAR') {
    motorPattern = 'NEUROMUSCULAR'
  }

  // Determinar distribuição
  let distribution: 'FOCAL' | 'MULTIFOCAL' | 'DIFUSA' | 'INDETERMINADA' = 'FOCAL'
  if (primary === 'MULTIFOCAL_OU_DIFUSA') {
    distribution = 'DIFUSA'
  } else if (secondary && secondary.length > 0) {
    distribution = 'MULTIFOCAL'
  }

  // Calcular confiança (baseado na diferença entre top scores e volume de evidência)
  const topScore = sortedScores[0].score
  const secondScore = sortedScores.length > 1 ? sortedScores[1].score : 0
  const scoreDiff = topScore - secondScore
  const evidenceCount = supportiveFindings.length

  let confidence = Math.min(100, topScore + scoreDiff * 0.5 + evidenceCount * 5)
  confidence = Math.max(20, confidence) // Mínimo 20% de confiança se passou do threshold

  // Gerar narrativa
  const narrative = buildNarrative(primary, motorPattern, distribution, supportiveFindings, contradictoryFindings, confidence)

  return {
    status: 'ok',
    primary,
    secondary,
    distribution,
    motorPattern,
    confidence: Math.round(confidence),
    supportiveFindings,
    contradictoryFindings,
    narrative,
  }
}

function buildNarrative(
  primary: NeuroAxis,
  motorPattern: MotorPattern,
  distribution: string,
  supportive: string[],
  contradictory: string[],
  confidence: number,
): string {
  const axisLabels: Record<NeuroAxis, string> = {
    PROSENCEFALO: 'prosencéfalo',
    TRONCO_ENCEFALICO: 'tronco encefálico',
    CEREBELO: 'cerebelo',
    VESTIBULAR_PERIFERICO: 'vestibular periférico',
    VESTIBULAR_CENTRAL: 'vestibular central',
    MEDULA_C1_C5: 'medula espinhal cervical (C1-C5)',
    MEDULA_C6_T2: 'medula espinhal cervicotorácica (C6-T2)',
    MEDULA_T3_L3: 'medula espinhal toracolombar (T3-L3)',
    MEDULA_L4_S3: 'medula espinhal lombossacra (L4-S3)',
    CAUDA_EQUINA: 'cauda equina',
    NEUROMUSCULAR: 'neuromuscular',
    MULTIFOCAL_OU_DIFUSA: 'multifocal ou difusa',
    INDETERMINADO: 'indeterminado',
  }

  const motorLabels: Record<MotorPattern, string> = {
    UMN: 'neurônio motor superior',
    LMN: 'neurônio motor inferior',
    VESTIBULAR: 'vestibular',
    CEREBELAR: 'cerebelar',
    NEUROMUSCULAR: 'neuromuscular',
    INDEFINIDO: 'indefinido',
  }

  const distLabels: Record<string, string> = {
    FOCAL: 'focal',
    MULTIFOCAL: 'multifocal',
    DIFUSA: 'difusa',
    INDETERMINADA: 'indeterminada',
  }

  // Construir narrativa veterinária estruturada (6-10 linhas) seguindo formato FASE 5
  const primaryLabel = axisLabels[primary] || primary.toLowerCase()

  // Início: síndrome
  let text = `Quadro compatível com disfunção ${primaryLabel}. `

  // Citar 2-5 achados-chave que sustentam (dos supportiveFindings)
  if (supportive.length > 0) {
    const keyFindings = supportive.slice(0, 3).join(', ')
    text += `Os achados clínicos que sustentam esta localização incluem: ${keyFindings}. `
  }

  // Se confiança baixa, mencionar limitações
  if (confidence < 50) {
    const missingElements: string[] = []
    if (supportive.length === 0) missingElements.push('achados suportadores limitados')
    if (contradictory.length > 0) missingElements.push('achados contraditórios presentes')
    if (missingElements.length > 0) {
      text += `A neurolocalização permanece limitada por ${missingElements.join(' e ')} no exame neurológico. `
    }
  }

  // Padrão motor quando aplicável
  if (motorPattern === 'UMN' || motorPattern === 'LMN') {
    text += `O padrão de ${motorLabels[motorPattern]} está evidenciado pela combinação de reflexos espinhais e tônus muscular observados. `
  }

  // Distribuição
  text += `A distribuição dos déficits é ${distLabels[distribution] || distribution.toLowerCase()}, sugerindo ${distribution === 'FOCAL' ? 'uma lesão localizada' : distribution === 'MULTIFOCAL' ? 'múltiplas lesões' : 'um processo difuso'}. `

  // Contradições (se houver)
  if (contradictory.length > 0) {
    text += `Contudo, observa-se ${contradictory[0].toLowerCase()}, o que pode indicar envolvimento de múltiplos eixos neurológicos ou evolução da lesão. `
  }

  // Finalizar com próximos passos
  text += `Os próximos passos diagnósticos devem priorizar exames de imagem e análise de líquor para confirmar a localização e estabelecer etiologia.`

  return text
}
