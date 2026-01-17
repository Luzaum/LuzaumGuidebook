/**
 * Valida dados mínimos obrigatórios para análise neurológica
 * Baseado nos requisitos da FASE 3:
 * - patient: species, ageGroup
 * - timeline: onset (temporalPattern), evolution (evolutionPattern)
 * - exam: mentation, gait, posturalReactions, cranialNerves
 */

export function validateMinimumData(caseState: any): { ok: boolean; missing: string[] } {
  const missing: string[] = []

  // Verificar dados básicos do paciente
  if (!caseState?.patient) {
    missing.push('Dados do paciente')
    return { ok: false, missing }
  }

  // Verificar espécie (obrigatório)
  if (!caseState.patient.species || !['dog', 'cat'].includes(caseState.patient.species)) {
    missing.push('Espécie do paciente (cão/gato)')
  }

  // Verificar grupo etário (ageGroup pode ser lifeStage)
  const hasAgeGroup = caseState.patient.lifeStage || caseState.patient.ageGroup
  if (!hasAgeGroup) {
    missing.push('Grupo etário do paciente')
  }

  // Verificar queixa e histórico
  if (!caseState?.complaint) {
    missing.push('Queixa principal')
    return { ok: false, missing }
  }

  // Verificar padrão temporal (onset)
  if (!caseState.complaint.temporalPattern) {
    missing.push('Padrão temporal (início: peragudo/agudo/subagudo/crônico/episódico)')
  }

  // Verificar evolução
  if (!caseState.complaint.evolutionPattern) {
    missing.push('Padrão de evolução (melhorando/estático/flutuante/progressivo)')
  }

  // Verificar exame neurológico
  if (!caseState?.neuroExam || Object.keys(caseState.neuroExam).length === 0) {
    missing.push('Exame neurológico')
    return { ok: false, missing }
  }

  // Verificar mentação/consciência (obrigatório)
  const hasMentation = !!caseState.neuroExam.mentation
  if (!hasMentation) {
    missing.push('Mentação/consciência')
  }

  // Verificar marcha/capacidade de deambular (obrigatório)
  const hasGait = !!caseState.neuroExam.ambulation
  if (!hasGait) {
    missing.push('Marcha/capacidade de deambular')
  }

  // Verificar reações posturais (obrigatório - pelo menos um membro)
  const hasPosturals =
    !!caseState.neuroExam.proprioception_thoracic_left ||
    !!caseState.neuroExam.proprioception_thoracic_right ||
    !!caseState.neuroExam.proprioception_pelvic_left ||
    !!caseState.neuroExam.proprioception_pelvic_right

  // Verificar nervos cranianos (obrigatório - pelo menos um teste)
  const hasCN =
    !!caseState.neuroExam.menace_left ||
    !!caseState.neuroExam.menace_right ||
    !!caseState.neuroExam.plr_left ||
    !!caseState.neuroExam.plr_right ||
    !!caseState.neuroExam.nystagmus ||
    !!caseState.neuroExam.strabismus ||
    !!caseState.neuroExam.cn_facial_sensation ||
    !!caseState.neuroExam.cn_swallowing

  // Verificar reflexos espinhais (opcional mas útil)
  const hasSpinalReflexes =
    !!caseState.neuroExam.reflex_patellar_left ||
    !!caseState.neuroExam.reflex_patellar_right ||
    !!caseState.neuroExam.reflex_withdrawal_left_thoracic ||
    !!caseState.neuroExam.reflex_withdrawal_right_thoracic ||
    !!caseState.neuroExam.reflex_panniculus

  // Verificar dor/nocicepção (opcional)
  const hasPain =
    !!caseState.neuroExam.deep_pain ||
    !!caseState.neuroExam.pain_cervical ||
    !!caseState.neuroExam.pain_thoracolumbar ||
    !!caseState.neuroExam.pain_lumbosacral

  // Requisito: pelo menos reações posturais OU nervos cranianos
  // (reflexos espinhais e dor são opcionais, mas ajudam)
  if (!hasPosturals && !hasCN) {
    missing.push('Pelo menos um entre: reações posturais ou nervos cranianos')
  }

  // Se nenhum dos elementos básicos do exame, adicionar mensagem genérica
  if (!hasMentation && !hasGait && !hasPosturals && !hasCN && !hasSpinalReflexes && !hasPain) {
    missing.push('Exame neurológico incompleto - falta pelo menos um dos elementos obrigatórios')
  }

  return { ok: missing.length === 0, missing }
}
