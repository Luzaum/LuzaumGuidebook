/**
 * Testes unitários para detecção de inglês
 */

import { findForbiddenEnglish, replaceForbiddenEnglish } from '../noEnglish'

const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message)
}

// Mock de teste básico
export const testFindForbiddenEnglish = () => {
  console.log('[TEST] findForbiddenEnglish')

  // Deve detectar "mentation"
  const text1 = 'Alteração de mentation presente'
  const found1 = findForbiddenEnglish(text1)
  assert(found1.length > 0, 'Deve detectar "mentation"')
  assert(found1.some((f) => f.term.toLowerCase().includes('mentation')), 'Deve encontrar mentation')

  // Deve detectar "behavior"
  const text2 = 'Comportamento normal, sem alteração de behavior'
  const found2 = findForbiddenEnglish(text2)
  assert(found2.length > 0, 'Deve detectar "behavior"')

  // Não deve detectar em palavras compostas (ex: "mentation_left" é ID, não texto)
  const text3 = 'Avaliar mentação e comportamento'
  const found3 = findForbiddenEnglish(text3)
  assert(found3.length === 0, 'Não deve detectar falsos positivos')

  console.log('[TEST] findForbiddenEnglish - OK')
}

export const testReplaceForbiddenEnglish = () => {
  console.log('[TEST] replaceForbiddenEnglish')

  const text1 = 'Alteração de mentation e behavior'
  const replaced1 = replaceForbiddenEnglish(text1)
  assert(!replaced1.includes('mentation'), 'Deve substituir "mentation"')
  assert(!replaced1.includes('behavior'), 'Deve substituir "behavior"')
  assert(replaced1.includes('mentação'), 'Deve conter "mentação"')
  assert(replaced1.includes('comportamento'), 'Deve conter "comportamento"')

  console.log('[TEST] replaceForbiddenEnglish - OK')
}
