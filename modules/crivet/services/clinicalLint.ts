/**
 * Lint Clínico para Fármacos Normalizados
 * Verifica se o fármaco tem conteúdo mínimo necessário para uso clínico
 */

import type { NormalizedDrug } from '../models/normalizedDrug'

export type LintSeverity = 'ERROR' | 'WARNING' | 'INFO'

export interface ClinicalLintIssue {
  severity: LintSeverity
  message: string
  field?: string
}

export interface ClinicalLintResult {
  isValid: boolean // false se houver ERRORs que bloqueiem salvar
  issues: ClinicalLintIssue[]
  errors: ClinicalLintIssue[]
  warnings: ClinicalLintIssue[]
  infos: ClinicalLintIssue[]
}

/**
 * Verifica se o fármaco normalizado tem conteúdo mínimo necessário
 */
export function lintClinical(normalized: NormalizedDrug): ClinicalLintResult {
  const issues: ClinicalLintIssue[] = []

  // Verificar Help Drawer
  if (!normalized.helpDrawer.sections || normalized.helpDrawer.sections.length === 0) {
    issues.push({
      severity: 'ERROR',
      message: 'Help drawer vazio: fármaco não possui informações básicas para exibição no botão "?"',
      field: 'helpDrawer.sections',
    })
  } else {
    // Verificar se pelo menos uma seção tem conteúdo
    const hasContent = normalized.helpDrawer.sections.some((section) => section.items && section.items.length > 0)
    if (!hasContent) {
      issues.push({
        severity: 'ERROR',
        message: 'Help drawer sem conteúdo: todas as seções estão vazias',
        field: 'helpDrawer.sections',
      })
    }
  }

  // Verificar Indicações
  if (!normalized.indications || normalized.indications.all.length === 0) {
    issues.push({
      severity: 'ERROR',
      message: 'Indicações vazias: fármaco não possui indicações de uso cadastradas',
      field: 'indications',
    })
  }

  // Verificar Doses
  const hasDogCRI = !!(normalized.doses.dog.cri?.mcgkgmin || normalized.doses.dog.cri?.mgkgh)
  const hasDogBolus = !!(normalized.doses.dog.bolus?.mgkg || normalized.doses.dog.bolus?.mcgkg || normalized.doses.dog.bolus?.ukg)
  const hasCatCRI = !!(normalized.doses.cat.cri?.mcgkgmin || normalized.doses.cat.cri?.mgkgh)
  const hasCatBolus = !!(normalized.doses.cat.bolus?.mgkg || normalized.doses.cat.bolus?.mcgkg || normalized.doses.cat.bolus?.ukg)

  if (!hasDogCRI && !hasDogBolus) {
    issues.push({
      severity: 'ERROR',
      message: 'Doses sem CRI nem bolus para cão: necessário ter pelo menos uma forma de dosagem',
      field: 'doses.dog',
    })
  }

  if (!hasCatCRI && !hasCatBolus) {
    issues.push({
      severity: 'ERROR',
      message: 'Doses sem CRI nem bolus para gato: necessário ter pelo menos uma forma de dosagem',
      field: 'doses.cat',
    })
  }

  // Verificar Compatibilidade (se fármaco requer diluição/uso IV)
  // Esta verificação é condicional: só bloqueia se o fármaco claramente requer diluição
  const requiresDilution = 
    normalized.doses.dog.cri || normalized.doses.cat.cri || // Tem CRI = geralmente requer diluição
    normalized.helpDrawer.sections.some((s) => 
      s.items.some((item) => item.text.toLowerCase().includes('diluir') || item.text.toLowerCase().includes('iv'))
    )

  if (requiresDilution && (!normalized.compatibility.diluentsAllowed || normalized.compatibility.diluentsAllowed.length === 0)) {
    issues.push({
      severity: 'ERROR',
      message: 'Compatibilidade sem diluentes permitidos: fármaco requer diluição mas não tem diluentes cadastrados',
      field: 'compatibility.diluentsAllowed',
    })
  }

  // Warnings (não bloqueiam salvar, mas indicam problemas)
  if (normalized.summary.taglines.length < 2) {
    issues.push({
      severity: 'WARNING',
      message: 'Poucas taglines: recomenda-se ter pelo menos 2-3 taglines para melhor compreensão',
      field: 'summary.taglines',
    })
  }

  if (normalized.helpDrawer.sections.length < 2) {
    issues.push({
      severity: 'WARNING',
      message: 'Help drawer com poucos niveis: recomenda-se ter pelo menos IMPORTANT + INFO',
      field: 'helpDrawer.sections',
    })
  }

  // Separar por severidade
  const errors = issues.filter((i) => i.severity === 'ERROR')
  const warnings = issues.filter((i) => i.severity === 'WARNING')
  const infos = issues.filter((i) => i.severity === 'INFO')

  return {
    isValid: errors.length === 0,
    issues,
    errors,
    warnings,
    infos,
  }
}
