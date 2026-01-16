import { NeuroExamFindings, NormalizedFindings } from '../../types/case'

export function normalizeFindings(
  findings: NeuroExamFindings,
): NormalizedFindings {
  // Normalize mentation
  const mentation = normalizeValue(
    findings.mentation,
    {
      Alerta: 'normal',
      Deprimido: 'depressed',
      Estupor: 'stupor',
      Coma: 'coma',
    },
    'normal',
  ) as NormalizedFindings['mentation']

  // Normalize gait
  const gaitThoracic = normalizeValue(
    findings.gait_thoracic,
    {
      Normal: 'normal',
      Ataxia: 'ataxia',
      Paresia: 'paresis',
      Plegia: 'plegia',
    },
    'normal',
  ) as NormalizedFindings['gaitThoracic']

  const gaitPelvic = normalizeValue(
    findings.gait_pelvic,
    {
      Normal: 'normal',
      Ataxia: 'ataxia',
      Paresia: 'paresis',
      Plegia: 'plegia',
    },
    'normal',
  ) as NormalizedFindings['gaitPelvic']

  // Normalize reflexes
  const patellarLeft = normalizeValue(
    findings.reflex_patellar_left,
    {
      Normal: 'normal',
      Aumentado: 'increased',
      Diminuído: 'decreased',
      Ausente: 'absent',
    },
    'normal',
  ) as NormalizedFindings['patellarLeft']

  const patellarRight = normalizeValue(
    findings.reflex_patellar_right,
    {
      Normal: 'normal',
      Aumentado: 'increased',
      Diminuído: 'decreased',
      Ausente: 'absent',
    },
    'normal',
  ) as NormalizedFindings['patellarRight']

  // Normalize deep pain
  const deepPain = normalizeValue(
    findings.deep_pain,
    {
      Presente: 'present',
      Ausente: 'absent',
      Duvidoso: 'equivocal',
    },
    'present',
  ) as NormalizedFindings['deepPain']

  // Normalize spinal pain
  const spinalPainCervical = normalizeValue(
    findings.pain_cervical,
    {
      Ausente: 'none',
      Leve: 'mild',
      Moderada: 'moderate',
      Severa: 'severe',
    },
    'none',
  ) as NormalizedFindings['spinalPainCervical']

  const spinalPainThoracolumbar = normalizeValue(
    findings.pain_thoracolumbar,
    {
      Ausente: 'none',
      Leve: 'mild',
      Moderada: 'moderate',
      Severa: 'severe',
    },
    'none',
  ) as NormalizedFindings['spinalPainThoracolumbar']

  const spinalPainLumbosacral = normalizeValue(
    findings.pain_lumbosacral,
    {
      Ausente: 'none',
      Leve: 'mild',
      Moderada: 'moderate',
      Severa: 'severe',
    },
    'none',
  ) as NormalizedFindings['spinalPainLumbosacral']

  // Derived flags
  const headTilt = findings.head_posture === 'Head Tilt'
  const nystagmusPresent = findings.nystagmus === 'Presente'

  // Count cranial nerve deficits
  let cnDeficits = 0
  if (findings.menace_left === 'Ausente' || findings.menace_right === 'Ausente')
    cnDeficits++
  if (findings.plr_left === 'Ausente' || findings.plr_right === 'Ausente')
    cnDeficits++
  if (
    findings.cn_facial_sensation === 'Ausente' ||
    findings.cn_facial_sensation === 'Diminuído'
  )
    cnDeficits++
  if (
    findings.cn_swallowing === 'Ausente' ||
    findings.cn_swallowing === 'Diminuído'
  )
    cnDeficits++
  const multiCranialDeficits = cnDeficits >= 2

  // Postural reactions
  const posturalTL = findings.proprioception_thoracic_left
  const posturalTR = findings.proprioception_thoracic_right
  const posturalPL = findings.proprioception_pelvic_left
  const posturalPR = findings.proprioception_pelvic_right

  const all4PosturalsAffected =
    (posturalTL === 'Diminuído' || posturalTL === 'Ausente') &&
    (posturalTR === 'Diminuído' || posturalTR === 'Ausente') &&
    (posturalPL === 'Diminuído' || posturalPL === 'Ausente') &&
    (posturalPR === 'Diminuído' || posturalPR === 'Ausente')

  const pelvicOnlyDeficit =
    posturalTL === 'Normal' &&
    posturalTR === 'Normal' &&
    (posturalPL === 'Diminuído' ||
      posturalPL === 'Ausente' ||
      posturalPR === 'Diminuído' ||
      posturalPR === 'Ausente')

  const thoracicAndPelvicDeficit =
    (posturalTL === 'Diminuído' ||
      posturalTL === 'Ausente' ||
      posturalTR === 'Diminuído' ||
      posturalTR === 'Ausente') &&
    (posturalPL === 'Diminuído' ||
      posturalPL === 'Ausente' ||
      posturalPR === 'Diminuído' ||
      posturalPR === 'Ausente')

  const asymmetricPosturals =
    posturalTL !== posturalTR || posturalPL !== posturalPR

  // Motor neuron patterns
  const umnPattern =
    patellarLeft === 'increased' ||
    patellarRight === 'increased' ||
    findings.reflex_withdrawal_left_thoracic === 'Aumentado' ||
    findings.reflex_withdrawal_right_thoracic === 'Aumentado'

  const lmnPattern =
    patellarLeft === 'decreased' ||
    patellarLeft === 'absent' ||
    patellarRight === 'decreased' ||
    patellarRight === 'absent' ||
    findings.reflex_withdrawal_left_thoracic === 'Diminuído' ||
    findings.reflex_withdrawal_left_thoracic === 'Ausente' ||
    findings.reflex_withdrawal_right_thoracic === 'Diminuído' ||
    findings.reflex_withdrawal_right_thoracic === 'Ausente'

  const spinalPainPresent =
    spinalPainCervical !== 'none' ||
    spinalPainThoracolumbar !== 'none' ||
    spinalPainLumbosacral !== 'none'

  return {
    mentation,
    gaitThoracic,
    gaitPelvic,
    patellarLeft,
    patellarRight,
    deepPain,
    spinalPainCervical,
    spinalPainThoracolumbar,
    spinalPainLumbosacral,
    headTilt,
    nystagmusPresent,
    multiCranialDeficits,
    all4PosturalsAffected,
    pelvicOnlyDeficit,
    thoracicAndPelvicDeficit,
    asymmetricPosturals,
    umnPattern,
    lmnPattern,
    spinalPainPresent,
  }
}

function normalizeValue(
  value: string | undefined,
  mapping: Record<string, string>,
  defaultValue: string,
): string {
  if (!value) return defaultValue
  return mapping[value] || defaultValue
}
