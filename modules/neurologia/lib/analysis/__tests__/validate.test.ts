/**
 * Testes unitários para validação de dados mínimos
 * TODO: Instalar Vitest quando necessário (npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom)
 */

import { validateMinimumData } from '../validate'

// Mock de teste básico (pode ser expandido quando Vitest estiver instalado)
export const testValidateMinimumData = () => {
  console.log('[TEST] validateMinimumData')

  // Caso completo
  const completeCase = {
    patient: { species: 'dog' },
    complaint: { chiefComplaintIds: ['convulsao'] },
    neuroExam: {
      mentation: 'Alerta',
      ambulation: 'Ambulatório',
      proprioception_thoracic_left: 'Normal',
      reflex_patellar_left: 'Normal',
      deep_pain: 'Presente',
    },
  }

  const result1 = validateMinimumData(completeCase)
  console.assert(result1.ok === true, 'Caso completo deve passar validação')
  console.assert(result1.missing.length === 0, 'Caso completo não deve ter dados faltando')

  // Caso incompleto (sem mentação)
  const incompleteCase = {
    patient: { species: 'dog' },
    complaint: { chiefComplaintIds: ['convulsao'] },
    neuroExam: {
      ambulation: 'Ambulatório',
    },
  }

  const result2 = validateMinimumData(incompleteCase)
  console.assert(result2.ok === false, 'Caso incompleto deve falhar validação')
  console.assert(result2.missing.length > 0, 'Caso incompleto deve ter dados faltando')
  console.assert(
    result2.missing.includes('Mentação/consciência'),
    'Deve detectar mentação faltando',
  )

  console.log('[TEST] validateMinimumData - OK')
}
