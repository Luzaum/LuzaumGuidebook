/**
 * Validação por etapa do exame neurológico completo.
 */

export type WizardValidationResult = { ok: boolean; missing: string[] }

function hasValidAge(patient: any): boolean {
  const years = patient?.ageYears ?? 0
  const months = patient?.ageMonths ?? 0
  return years > 0 || months > 0
}

export function validateStep1(caseState: any): WizardValidationResult {
  const missing: string[] = []
  if (!caseState?.patient?.species || !['dog', 'cat'].includes(caseState.patient.species)) {
    missing.push('Espécie do paciente (cão/gato)')
  }
  if (!hasValidAge(caseState?.patient)) {
    missing.push('Idade do paciente (anos e/ou meses)')
  }
  return { ok: missing.length === 0, missing }
}

export function validateStep2(caseState: any): WizardValidationResult {
  const missing: string[] = []
  const complaint = caseState?.complaint
  if (!complaint) {
    return { ok: false, missing: ['Queixa principal e história'] }
  }
  const hasComplaint =
    (Array.isArray(complaint.chiefComplaintIds) && complaint.chiefComplaintIds.length > 0) ||
    String(complaint.contextNotes || '').trim().length >= 8
  if (!hasComplaint) {
    missing.push('Pelo menos uma queixa principal ou descrição (≥8 caracteres)')
  }
  if (!complaint.temporalPattern) {
    missing.push('Padrão temporal (início)')
  }
  if (!complaint.evolutionPattern) {
    missing.push('Padrão de evolução')
  }
  return { ok: missing.length === 0, missing }
}

/** Etapa 3: sempre pode avançar; campos vazios serão assumidos como normais após confirmação. */
export function validateStep3(_caseState: any): WizardValidationResult {
  return { ok: true, missing: [] }
}

export function validateWizardStep(
  step: number,
  caseState: { patient?: unknown; complaint?: unknown; neuroExam?: unknown },
): WizardValidationResult {
  switch (step) {
    case 1:
      return validateStep1(caseState)
    case 2:
      return validateStep2(caseState)
    case 3:
      return validateStep3(caseState)
    case 4:
      return validateMinimumData(caseState)
    default:
      return { ok: true, missing: [] }
  }
}

export function validateMinimumData(caseState: any): WizardValidationResult {
  const missing: string[] = []

  if (!caseState?.patient) {
    missing.push('Dados do paciente')
    return { ok: false, missing }
  }

  if (!caseState.patient.species || !['dog', 'cat'].includes(caseState.patient.species)) {
    missing.push('Espécie do paciente (cão/gato)')
  }

  if (!hasValidAge(caseState.patient)) {
    missing.push('Idade do paciente')
  }

  if (!caseState?.complaint) {
    missing.push('Queixa principal')
    return { ok: false, missing }
  }

  if (!caseState.complaint.temporalPattern) {
    missing.push('Padrão temporal (início)')
  }

  if (!caseState.complaint.evolutionPattern) {
    missing.push('Padrão de evolução')
  }

  const hasComplaint =
    (Array.isArray(caseState.complaint.chiefComplaintIds) &&
      caseState.complaint.chiefComplaintIds.length > 0) ||
    String(caseState.complaint.contextNotes || '').trim().length >= 8
  if (!hasComplaint) {
    missing.push('Queixa principal ou descrição')
  }

  return { ok: missing.length === 0, missing }
}
