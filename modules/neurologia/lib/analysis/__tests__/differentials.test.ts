/**
 * Testes unitários para geração de diferenciais
 */

import { generateDifferentials } from '../differentialsV2'

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message)
}

// Mock de teste básico
export const testGenerateDifferentials = () => {
  console.log('[TEST] generateDifferentials')

  const caseState = {
    patient: { species: 'dog', lifeStage: 'adult', comorbidities: [] },
    complaint: { temporalPattern: 'agudo', evolutionPattern: 'progressivo', trauma: false },
  }

  const neuroLocalization = {
    primary: 'MEDULA_T3_L3' as const,
    secondary: undefined,
  }

  const result = generateDifferentials(caseState, neuroLocalization)

  assert(Array.isArray(result), 'Resultado deve ser array')
  assert(result.length > 0 && result.length <= 12, 'Deve retornar a lista priorizada de até 12 diferenciais')
  assert(
    result.every((dx) => dx.name && dx.likelihood >= 0 && dx.likelihood <= 100),
    'Cada DDx deve ter nome e likelihood válido',
  )
  assert(
    result.every((dx) => Array.isArray(dx.why) && dx.why.length > 0),
    'Cada DDx deve ter justificativas',
  )
  assert(
    result.every((dx) => Array.isArray(dx.diagnostics) && dx.diagnostics.length > 0),
    'Cada DDx deve ter diagnóstico',
  )
  assert(
    result.every((dx) => Array.isArray(dx.treatment) && dx.treatment.length > 0),
    'Cada DDx deve ter tratamento',
  )

  console.log('[TEST] generateDifferentials - OK')
}
