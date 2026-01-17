export function validateMinimumData(caseState: any): { ok: boolean; missing: string[] } {
  const missing: string[] = []

  // Verificar dados básicos
  if (!caseState?.patient) {
    missing.push('Dados do paciente')
    return { ok: false, missing }
  }

  if (!caseState?.complaint) {
    missing.push('Queixa principal')
    return { ok: false, missing }
  }

  if (!caseState?.neuroExam || Object.keys(caseState.neuroExam).length === 0) {
    missing.push('Exame neurológico')
    return { ok: false, missing }
  }

  // Verificar mentação/consciência
  const hasMentation = !!caseState.neuroExam.mentation

  // Verificar marcha/capacidade de deambular
  const hasGait = !!caseState.neuroExam.ambulation

  // Verificar pelo menos um dos seguintes:
  const hasPosturals =
    !!caseState.neuroExam.proprioception_thoracic_left ||
    !!caseState.neuroExam.proprioception_thoracic_right ||
    !!caseState.neuroExam.proprioception_pelvic_left ||
    !!caseState.neuroExam.proprioception_pelvic_right

  const hasCN =
    !!caseState.neuroExam.menace_left ||
    !!caseState.neuroExam.menace_right ||
    !!caseState.neuroExam.plr_left ||
    !!caseState.neuroExam.plr_right ||
    !!caseState.neuroExam.nystagmus ||
    !!caseState.neuroExam.strabismus ||
    !!caseState.neuroExam.cn_facial_sensation ||
    !!caseState.neuroExam.cn_swallowing

  const hasSpinalReflexes =
    !!caseState.neuroExam.reflex_patellar_left ||
    !!caseState.neuroExam.reflex_patellar_right ||
    !!caseState.neuroExam.reflex_withdrawal_left_thoracic ||
    !!caseState.neuroExam.reflex_withdrawal_right_thoracic ||
    !!caseState.neuroExam.reflex_panniculus

  const hasPain =
    !!caseState.neuroExam.deep_pain ||
    !!caseState.neuroExam.pain_cervical ||
    !!caseState.neuroExam.pain_thoracolumbar ||
    !!caseState.neuroExam.pain_lumbosacral

  if (!hasMentation) missing.push('Mentação/consciência')
  if (!hasGait) missing.push('Marcha/capacidade de deambular')
  if (!hasPosturals && !hasCN && !hasSpinalReflexes && !hasPain) {
    missing.push(
      'Pelo menos 1 entre: reações posturais, nervos cranianos, reflexos espinhais ou dor/nocicepção',
    )
  }

  return { ok: missing.length === 0, missing }
}
