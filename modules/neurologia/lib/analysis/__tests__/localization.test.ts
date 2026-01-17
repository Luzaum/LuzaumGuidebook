/**
 * Testes unitários para neurolocalização
 */

import { determineNeuroLocalization } from '../localization'

// Mock de teste básico
export const testDetermineNeuroLocalization = () => {
  console.log('[TEST] determineNeuroLocalization')

  // Cenário 1: T3-L3 (paraparesia pélvica UMN)
  const case1 = {
    patient: { species: 'dog' },
    complaint: { temporalPattern: 'agudo' },
    neuroExam: {
      mentation: 'Alerta',
      ambulation: 'Ambulatório',
      gait_thoracic: 'Normal',
      gait_pelvic: 'Paresia',
      reflex_patellar_left: 'Aumentado',
      reflex_patellar_right: 'Aumentado',
    },
  }

  const result1 = determineNeuroLocalization(case1)
  console.assert(result1.status === 'ok', 'Caso válido deve ter status ok')
  console.assert(result1.primary === 'MEDULA_T3_L3', 'Deve localizar em T3-L3')
  console.assert(result1.motorPattern === 'UMN', 'Deve identificar padrão UMN')
  console.assert(result1.confidence > 0, 'Deve ter confiança > 0')

  // Cenário 2: Prosencéfalo (alteração de consciência)
  const case2 = {
    patient: { species: 'cat' },
    complaint: { temporalPattern: 'agudo' },
    neuroExam: {
      mentation: 'Deprimido',
      behavior: 'Desorientado',
      ambulation: 'Ambulatório',
    },
  }

  const result2 = determineNeuroLocalization(case2)
  console.assert(result2.status === 'ok', 'Caso válido deve ter status ok')
  console.assert(result2.primary === 'PROSENCEFALO', 'Deve localizar em prosencéfalo')

  console.log('[TEST] determineNeuroLocalization - OK')
}
