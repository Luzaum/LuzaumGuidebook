/**
 * Suite de testes unitários para NeuroVet
 * Para executar quando Vitest estiver instalado:
 * npm run test
 */

import { testValidateMinimumData } from '../analysis/__tests__/validate.test'
import { testDetermineNeuroLocalization } from '../analysis/__tests__/localization.test'
import { testGenerateDifferentials } from '../analysis/__tests__/differentials.test'
import { testFindForbiddenEnglish, testReplaceForbiddenEnglish } from '../quality/__tests__/noEnglish.test'
import { testExamDefaults } from '../exam/__tests__/examDefaults.test'

/**
 * Executa todos os testes (smoke tests básicos)
 * Pode ser chamado manualmente no console do navegador
 */
export function runAllTests() {
  console.log('🧪 Executando suite de testes NeuroVet...\n')

  try {
    testValidateMinimumData()
    testDetermineNeuroLocalization()
    testGenerateDifferentials()
    testFindForbiddenEnglish()
    testReplaceForbiddenEnglish()
    testExamDefaults()

    console.log('\n✅ Todos os testes passaram!')
    return true
  } catch (error) {
    console.error('\n❌ Teste falhou:', error)
    return false
  }
}

// Expor globalmente para execução manual no console do navegador
if (typeof window !== 'undefined') {
  ;(window as any).__vetneuro_tests__ = { runAllTests }
}
