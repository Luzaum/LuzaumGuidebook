/**
 * Testes unitários para geração de diferenciais
 */

import { generateDifferentials } from '../differentialsV2'

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

  console.assert(Array.isArray(result), 'Resultado deve ser array')
  console.assert(result.length === 5, 'SEMPRE deve retornar 5 diferenciais')
  console.assert(
    result.every((dx) => dx.name && dx.likelihood >= 0 && dx.likelihood <= 100),
    'Cada DDx deve ter nome e likelihood válido',
  )
  console.assert(
    result.every((dx) => Array.isArray(dx.why) && dx.why.length > 0),
    'Cada DDx deve ter justificativas',
  )
  console.assert(
    result.every((dx) => Array.isArray(dx.diagnostics) && dx.diagnostics.length > 0),
    'Cada DDx deve ter diagnóstico',
  )
  console.assert(
    result.every((dx) => Array.isArray(dx.treatment) && dx.treatment.length > 0),
    'Cada DDx deve ter tratamento',
  )

  console.log('[TEST] generateDifferentials - OK')
}
