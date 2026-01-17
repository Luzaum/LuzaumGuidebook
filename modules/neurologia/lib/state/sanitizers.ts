import type { Patient, ComplaintContext } from '../../stores/caseStore'

/**
 * Sanitiza e normaliza dados do paciente para garantir coerência
 */
export function sanitizePatient(patient: Partial<Patient>): Partial<Patient> {
  const sanitized = { ...patient }

  // Sexo: garantir que é 'male' ou 'female' ou null
  if (sanitized.sex && sanitized.sex !== 'male' && sanitized.sex !== 'female') {
    sanitized.sex = null
  }

  // Se macho: forçar gestante/lactante = false
  if (sanitized.sex === 'male') {
    sanitized.pregnant = false
    sanitized.lactating = false
  }

  // Life stage: garantir único (radio)
  // Se houver múltiplos selecionados, manter apenas o primeiro válido
  if (sanitized.lifeStage && !['neonate', 'pediatric', 'adult', 'geriatric'].includes(sanitized.lifeStage)) {
    sanitized.lifeStage = null
  }

  // Repro status: garantir único (radio)
  if (
    sanitized.reproStatus &&
    sanitized.reproStatus !== 'intact' &&
    sanitized.reproStatus !== 'neutered'
  ) {
    sanitized.reproStatus = null
  }

  // Gestante/lactante só faz sentido para fêmea
  if (sanitized.sex !== 'female') {
    sanitized.pregnant = false
    sanitized.lactating = false
  }

  // Comorbidades: garantir que é array de ComorbidityItem e remover duplicatas por key
  if (Array.isArray(sanitized.comorbidities)) {
    // Migrar formato antigo (string[]) para novo (ComorbidityItem[])
    const migrated = sanitized.comorbidities.map((c: any) => {
      if (typeof c === 'string') {
        // Formato antigo: converter para ComorbidityItem
        return { key: c as any, label: c }
      }
      return c // Já é ComorbidityItem
    })

    // Remover duplicatas por key
    const seen = new Set<string>()
    sanitized.comorbidities = migrated.filter((c: any) => {
      const key = c.key || c
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  } else {
    sanitized.comorbidities = []
  }

  return sanitized
}

/**
 * Sanitiza e normaliza dados da queixa/história
 */
export function sanitizeHistory(complaint: Partial<ComplaintContext>): Partial<ComplaintContext> {
  const sanitized = { ...complaint }

  // Temporal pattern: garantir único (radio)
  if (
    sanitized.temporalPattern &&
    !['peragudo', 'agudo', 'subagudo', 'cronico', 'episodico'].includes(sanitized.temporalPattern)
  ) {
    sanitized.temporalPattern = null
  }

  // Evolution pattern: garantir único (radio)
  if (
    sanitized.evolutionPattern &&
    !['melhorando', 'estatico', 'flutuante', 'progressivo'].includes(sanitized.evolutionPattern)
  ) {
    sanitized.evolutionPattern = null
  }

  // Chief complaint IDs: garantir array e remover duplicatas
  if (Array.isArray(sanitized.chiefComplaintIds)) {
    sanitized.chiefComplaintIds = [...new Set(sanitized.chiefComplaintIds)]
  } else {
    sanitized.chiefComplaintIds = []
  }

  // Red flags: garantir array e remover duplicatas
  if (Array.isArray(sanitized.redFlags)) {
    sanitized.redFlags = [...new Set(sanitized.redFlags)]
  } else {
    sanitized.redFlags = []
  }

  // Context notes: garantir string
  if (sanitized.contextNotes !== undefined && typeof sanitized.contextNotes !== 'string') {
    sanitized.contextNotes = ''
  }

  // Toggles: garantir boolean
  const toggles: (keyof ComplaintContext)[] = [
    'trauma',
    'toxin',
    'fever',
    'ectoparasiticideExposure',
    'systemicDisease',
    'recentSurgeryAnesthesia',
  ]

  for (const toggle of toggles) {
    if (sanitized[toggle] !== undefined && typeof sanitized[toggle] !== 'boolean') {
      ;(sanitized as any)[toggle] = false
    }
  }

  return sanitized
}

/**
 * Valida coerência completa do estado do caso
 * Retorna lista de problemas encontrados
 */
export function validateCaseCoherence(caseState: {
  patient?: Partial<Patient>
  complaint?: Partial<ComplaintContext>
}): string[] {
  const issues: string[] = []

  // Validar paciente
  if (caseState.patient) {
    if (caseState.patient.sex === 'male' && (caseState.patient.pregnant || caseState.patient.lactating)) {
      issues.push('Paciente macho não pode estar gestante ou lactante')
    }

    if (caseState.patient.sex === 'male' && caseState.patient.pregnant === true) {
      issues.push('Paciente macho marcado como gestante')
    }

    if (caseState.patient.sex === 'male' && caseState.patient.lactating === true) {
      issues.push('Paciente macho marcado como lactante')
    }
  }

  // Validar queixa (sem regras complexas por enquanto)

  return issues
}
