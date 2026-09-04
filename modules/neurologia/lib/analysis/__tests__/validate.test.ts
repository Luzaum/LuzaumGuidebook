/**
 * Testes unitários para validação de dados mínimos
 */

import { validateMinimumData, validateStep1, validateStep2, validateStep3 } from '../validate'

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message)
}

export const testValidateMinimumData = () => {
  console.log('[TEST] validateMinimumData')

  const completeCase = {
    patient: { species: 'dog', ageYears: 5, ageMonths: 0, lifeStage: 'adult' },
    complaint: {
      chiefComplaintIds: ['Ataxia'],
      temporalPattern: 'agudo',
      evolutionPattern: 'progressivo',
    },
    neuroExam: {
      mentation: 'Alerta',
      ambulation: 'Ambulatório',
    },
  }

  const result1 = validateMinimumData(completeCase)
  assert(result1.ok === true, 'Caso completo deve passar validação')
  assert(result1.missing.length === 0, 'Caso completo não deve ter dados faltando')

  const incompleteCase = {
    patient: { species: 'dog' },
    complaint: { chiefComplaintIds: ['Ataxia'] },
    neuroExam: {},
  }

  const result2 = validateMinimumData(incompleteCase)
  assert(result2.ok === false, 'Caso incompleto deve falhar validação')
  assert(result2.missing.length > 0, 'Caso incompleto deve ter dados faltando')
  assert(result2.missing.includes('Idade do paciente'), 'Deve detectar idade faltando')

  console.log('[TEST] validateMinimumData - OK')

  const step1Fail = validateStep1({ patient: { species: 'dog' } })
  assert(step1Fail.ok === false, 'Etapa 1 sem idade deve falhar')

  const step1Ok = validateStep1({ patient: { species: 'dog', ageYears: 2, ageMonths: 0 } })
  assert(step1Ok.ok === true, 'Etapa 1 com idade deve passar')

  const step2Ok = validateStep2({
    complaint: {
      chiefComplaintIds: ['Ataxia'],
      temporalPattern: 'agudo',
      evolutionPattern: 'progressivo',
    },
  })
  assert(step2Ok.ok === true, 'Etapa 2 completa deve passar')

  const step3Ok = validateStep3({ neuroExam: {} })
  assert(step3Ok.ok === true, 'Etapa 3 deve permitir avanço mesmo com exame vazio')

  console.log('[TEST] validateWizardSteps - OK')
}
