import {
  NeuroExam,
  NeuroLocalization,
  PatientProfile,
  EvaluationStatus,
} from '../types'

export function analyzeNeuroExam(
  exam: NeuroExam,
  patient: PatientProfile,
): NeuroLocalization {
  const findings = exam.findings
  let primary = 'Indeterminado'
  let secondary: string[] = []
  let explanation = 'Não há dados suficientes para localização precisa.'
  let confidence = 0

  // --- SIMPLE RULE-BASED LOGIC (MOCK AI) ---

  // 1. SPINAL CORD SEGMENTS
  const pelvicReflexes =
    findings['reflex_patellar_right'] || EvaluationStatus.Normal
  const thoracicReflexes =
    findings['reflex_withdrawal_right_thoracic'] || EvaluationStatus.Normal
  const pelvicGait = findings['gait_pelvic'] || 'Normal'
  const thoracicGait = findings['gait_thoracic'] || 'Normal'

  const pelvicAtaxia = pelvicGait !== 'Normal'
  const thoracicAtaxia = thoracicGait !== 'Normal'

  const pelvicLMN =
    pelvicReflexes === 'Diminuído' || pelvicReflexes === 'Ausente'
  const thoracicLMN =
    thoracicReflexes === 'Diminuído' || thoracicReflexes === 'Ausente'

  if (pelvicAtaxia && thoracicAtaxia) {
    if (thoracicLMN) {
      primary = 'C6-T2 (Intumescência Cervical)'
      explanation =
        'Ataxia/Paresia nos 4 membros com sinais de Neurônio Motor Inferior (LMN) nos membros torácicos.'
      confidence = 85
    } else {
      primary = 'C1-C5 (Cervical Cranial)'
      explanation =
        'Ataxia/Paresia nos 4 membros com reflexos normais ou aumentados (UMN) em todos os membros.'
      confidence = 80
    }
  } else if (pelvicAtaxia && !thoracicAtaxia) {
    if (pelvicLMN) {
      primary = 'L4-S3 (Intumescência Lombar)'
      explanation =
        'Déficits apenas nos membros pélvicos com sinais de LMN (reflexos diminuídos).'
      confidence = 85
    } else {
      primary = 'T3-L3 (Toracolombar)'
      explanation =
        'Déficits apenas nos membros pélvicos com reflexos normais ou aumentados (UMN).'
      confidence = 90
    }
  }

  // 2. INTRACRANIAL / VESTIBULAR
  const mentation = findings['mentation']
  const seizures =
    patient.comorbidities.includes('Epilepsia') ||
    patient.redFlags.includes('Convulsão ativa / Status')
  const headTilt = findings['head_posture'] === 'Head Tilt'
  const nystagmus = findings['nystagmus'] === 'Presente'

  if (
    seizures ||
    mentation === 'Estupor' ||
    mentation === 'Coma' ||
    mentation === 'Deprimido'
  ) {
    primary = 'Prosencéfalo (Cérebro)'
    explanation =
      'Alteração de estado mental e/ou convulsões indicam lesão em córtex/tálamo.'
    confidence = 90
    if (headTilt || nystagmus) {
      secondary.push('Tronco Encefálico')
    }
  } else if (headTilt || nystagmus) {
    // Vestibular logic
    const cnDeficits =
      findings['cn_facial_sensation'] === 'Alterado' ||
      findings['cn_swallowing'] === 'Alterado'
    const proprioception =
      findings['proprioception_thoracic_left'] === 'Alterado' ||
      findings['proprioception_thoracic_right'] === 'Alterado' ||
      findings['proprioception_pelvic_left'] === 'Alterado' ||
      findings['proprioception_pelvic_right'] === 'Alterado'

    if (cnDeficits || proprioception) {
      primary = 'Vestibular Central (Tronco Encefálico)'
      explanation =
        'Sinais vestibulares associados a déficits de nervos cranianos ou proprioceptivos.'
      confidence = 85
    } else {
      primary = 'Vestibular Periférico'
      explanation =
        'Sinais vestibulares puros sem alteração de mentação ou outros déficits de nervos cranianos.'
      confidence = 80
    }
  }

  return {
    primary,
    secondary,
    explanation,
    confidence,
  }
}
