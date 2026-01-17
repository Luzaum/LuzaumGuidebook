/**
 * Verificador de termos em inglês proibidos
 * Garante que UI + PDF + Report estejam 100% em PT-BR
 */

const FORBIDDEN_TERMS: Array<{ en: string; pt: string; caseSensitive?: boolean }> = [
  // Níveis de consciência/comportamento
  { en: 'mentation', pt: 'mentação', caseSensitive: false },
  { en: 'MENTATION', pt: 'mentação', caseSensitive: false },
  { en: 'behavior', pt: 'comportamento', caseSensitive: false },
  { en: 'BEHAVIOR', pt: 'comportamento', caseSensitive: false },

  // Marcha/postura
  { en: 'gait', pt: 'marcha', caseSensitive: false },
  { en: 'GAIT', pt: 'marcha', caseSensitive: false },
  { en: 'forebrain', pt: 'prosencéfalo', caseSensitive: false },
  { en: 'brainstem', pt: 'tronco encefálico', caseSensitive: false },
  { en: 'brain stem', pt: 'tronco encefálico', caseSensitive: false },

  // Medula/nervos
  { en: 'spinal', pt: 'espinhal', caseSensitive: false },
  { en: 'cranial nerves', pt: 'nervos cranianos', caseSensitive: false },
  { en: 'proprioception', pt: 'propriocepção', caseSensitive: false },
  { en: 'PROPRIOCEPTION', pt: 'propriocepção', caseSensitive: false },

  // Testes neurológicos
  { en: 'menace', pt: 'ameaça', caseSensitive: true }, // Só quando isolado (não "menace_left")
  { en: 'PLR', pt: 'reflexo pupilar', caseSensitive: true },
  { en: 'cutoff', pt: 'corte', caseSensitive: false },
  { en: 'paw placing', pt: 'posicionamento de pata', caseSensitive: false },
  { en: 'hopping', pt: 'salto', caseSensitive: false },

  // Dor
  { en: 'pain perception', pt: 'percepção de dor', caseSensitive: false },
  { en: 'deep pain', pt: 'dor profunda', caseSensitive: false },
  { en: 'DEEP PAIN', pt: 'dor profunda', caseSensitive: false },

  // Outros
  { en: 'UMN', pt: 'neurônio motor superior', caseSensitive: true }, // Apenas quando isolado
  { en: 'LMN', pt: 'neurônio motor inferior', caseSensitive: true },
  { en: 'head tilt', pt: 'inclinação de cabeça', caseSensitive: false },
  { en: 'headTilt', pt: 'inclinação de cabeça', caseSensitive: false },
]

/**
 * Encontra termos em inglês proibidos em um texto
 */
export function findForbiddenEnglish(text: string): Array<{ term: string; replacement: string; position: number }> {
  const found: Array<{ term: string; replacement: string; position: number }> = []
  const lowerText = text.toLowerCase()

  for (const { en, pt, caseSensitive } of FORBIDDEN_TERMS) {
    const searchText = caseSensitive ? text : lowerText
    const searchTerm = caseSensitive ? en : en.toLowerCase()
    const regex = new RegExp(`\\b${escapeRegex(searchTerm)}\\b`, caseSensitive ? 'g' : 'gi')

    let match
    while ((match = regex.exec(searchText)) !== null) {
      // Verificar se não está dentro de outra palavra
      const before = text.substring(Math.max(0, match.index - 1), match.index)
      const after = text.substring(match.index + match[0].length, match.index + match[0].length + 1)

      if (!/[a-zA-Z]/.test(before) && !/[a-zA-Z]/.test(after)) {
        found.push({
          term: match[0],
          replacement: pt,
          position: match.index,
        })
      }
    }
  }

  return found
}

/**
 * Substitui termos em inglês por PT-BR
 */
export function replaceForbiddenEnglish(text: string): string {
  let result = text
  const found = findForbiddenEnglish(text)

  // Ordenar por posição (descendente) para não quebrar índices ao substituir
  found.sort((a, b) => b.position - a.position)

  for (const { term, replacement } of found) {
    const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi')
    result = result.replace(regex, replacement)
  }

  return result
}

/**
 * Escapa caracteres especiais para regex
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Verifica se um objeto CaseReport contém termos proibidos
 * Retorna lista de strings que precisam ser corrigidas
 */
export function auditCaseReport(report: any): Array<{ field: string; issues: string[] }> {
  const issues: Array<{ field: string; issues: string[] }> = []

  const fieldsToCheck: Array<{ path: string; getValue: (r: any) => string | string[] | undefined }> = [
    { path: 'patientSummary', getValue: (r) => r.patientSummary },
    { path: 'historySummary', getValue: (r) => r.historySummary },
    { path: 'examSummary', getValue: (r) => r.examSummary },
    { path: 'neuroLocalization.narrative', getValue: (r) => r.neuroLocalization?.narrative },
    { path: 'neuroLocalization.supportiveFindings', getValue: (r) => r.neuroLocalization?.supportiveFindings },
    { path: 'neuroLocalization.contradictoryFindings', getValue: (r) => r.neuroLocalization?.contradictoryFindings },
  ]

  for (const { path, getValue } of fieldsToCheck) {
    const value = getValue(report)
    if (!value) continue

    const texts = Array.isArray(value) ? value : [value]
    const foundTerms: string[] = []

    for (const text of texts) {
      if (typeof text !== 'string') continue
      const found = findForbiddenEnglish(text)
      if (found.length > 0) {
        foundTerms.push(...found.map((f) => `"${f.term}" → "${f.replacement}"`))
      }
    }

    if (foundTerms.length > 0) {
      issues.push({ field: path, issues: foundTerms })
    }
  }

  // Verificar diferenciais
  if (Array.isArray(report.differentials)) {
    for (let i = 0; i < report.differentials.length; i++) {
      const dx = report.differentials[i]
      const dxIssues: string[] = []

      // why
      if (Array.isArray(dx.why)) {
        for (const whyText of dx.why) {
          const found = findForbiddenEnglish(whyText)
          if (found.length > 0) {
            dxIssues.push(`why: ${found.map((f) => `"${f.term}"`).join(', ')}`)
          }
        }
      }

      // diagnostics
      if (Array.isArray(dx.diagnostics)) {
        for (const diag of dx.diagnostics) {
          const texts = [diag.test, diag.whatItAdds, diag.expectedFindings, diag.limitations]
          for (const text of texts) {
            if (text) {
              const found = findForbiddenEnglish(text)
              if (found.length > 0) {
                dxIssues.push(`diagnostics: ${found.map((f) => `"${f.term}"`).join(', ')}`)
              }
            }
          }
        }
      }

      // treatment
      if (Array.isArray(dx.treatment)) {
        for (const tx of dx.treatment) {
          if (Array.isArray(tx.plan)) {
            for (const planText of tx.plan) {
              const found = findForbiddenEnglish(planText)
              if (found.length > 0) {
                dxIssues.push(`treatment: ${found.map((f) => `"${f.term}"`).join(', ')}`)
              }
            }
          }
        }
      }

      if (dxIssues.length > 0) {
        issues.push({ field: `differentials[${i}].${dx.name}`, issues: dxIssues })
      }
    }
  }

  return issues
}
