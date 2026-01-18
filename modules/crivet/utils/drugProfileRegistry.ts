/**
 * Registro de Perfis Completos de Fármacos
 * Mapeia drug_id -> perfil completo validado
 */

import type { DrugProfile } from '../types/drugProfile'
import { validateDrugProfile, type ValidationResult } from './drugProfileValidation'
import { normalizeDrug } from '../services/normalizeDrug'
import { lintClinical, type ClinicalLintResult } from '../services/clinicalLint'

// Importações de todos os perfis
import { cetaminaProfile } from '../data/drugs/cetamina.profile'
import { dobutaminaProfile } from '../data/drugs/dobutamina.profile'
import { norepinefrinaProfile } from '../data/drugs/norepinefrina.profile'
import { fentanilProfile } from '../data/drugs/fentanil.profile'
import { remifentanilProfile } from '../data/drugs/remifentanil.profile'
import { lidocainaProfile } from '../data/drugs/lidocaina.profile'
import { dexmedetomidinaProfile } from '../data/drugs/dexmedetomidina.profile'
import { propofolProfile } from '../data/drugs/propofol.profile'
import { metadonaProfile } from '../data/drugs/metadona.profile'
import { efedrinaProfile } from '../data/drugs/efedrina.profile'
import { maropitantProfile } from '../data/drugs/maropitant.profile'
import { insulina_regularProfile } from '../data/drugs/insulina_regular.profile'
import { metoclopramidaProfile } from '../data/drugs/metoclopramida.profile'
import { morfinaProfile } from '../data/drugs/morfina.profile'
import { butorfanolProfile } from '../data/drugs/butorfanol.profile'
import { dopaminaProfile } from '../data/drugs/dopamina.profile'
import { nitroprussiatoProfile } from '../data/drugs/nitroprussiato.profile'
import { diltiazemProfile } from '../data/drugs/diltiazem.profile'
import { esmololProfile } from '../data/drugs/esmolol.profile'
import { vasopressinaProfile } from '../data/drugs/vasopressina.profile'
import { ceftriaxonaProfile } from '../data/drugs/ceftriaxona.profile'
import { meropenemProfile } from '../data/drugs/meropenem.profile'
import { enrofloxacinaProfile } from '../data/drugs/enrofloxacina.profile'
import { cefalexinaProfile } from '../data/drugs/cefalexina.profile'
import { clindamicinaProfile } from '../data/drugs/clindamicina.profile'
import { metronidazolProfile } from '../data/drugs/metronidazol.profile'
import { rocuronioProfile } from '../data/drugs/rocuronio.profile'
import { mlkProfile } from '../data/drugs/mlk.profile'
import { flkProfile } from '../data/drugs/flk.profile'

// Registry de perfis completos (somente fármacos que seguem o padrão completo)
const DRUG_PROFILE_REGISTRY: Record<string, Partial<DrugProfile>> = {
  cetamina: cetaminaProfile as Partial<DrugProfile>,
  dobutamina: dobutaminaProfile as Partial<DrugProfile>,
  norepinefrina: norepinefrinaProfile as Partial<DrugProfile>,
  fentanil: fentanilProfile as Partial<DrugProfile>,
  remifentanil: remifentanilProfile as Partial<DrugProfile>,
  lidocaina: lidocainaProfile as Partial<DrugProfile>,
  dexmedetomidina: dexmedetomidinaProfile as Partial<DrugProfile>,
  propofol: propofolProfile as Partial<DrugProfile>,
  metadona: metadonaProfile as Partial<DrugProfile>,
  efedrina: efedrinaProfile as Partial<DrugProfile>,
  maropitant: maropitantProfile as Partial<DrugProfile>,
  insulina_regular: insulina_regularProfile as Partial<DrugProfile>,
  metoclopramida: metoclopramidaProfile as Partial<DrugProfile>,
  morfina: morfinaProfile as Partial<DrugProfile>,
  butorfanol: butorfanolProfile as Partial<DrugProfile>,
  dopamina: dopaminaProfile as Partial<DrugProfile>,
  nitroprussiato: nitroprussiatoProfile as Partial<DrugProfile>,
  diltiazem: diltiazemProfile as Partial<DrugProfile>,
  esmolol: esmololProfile as Partial<DrugProfile>,
  vasopressina: vasopressinaProfile as Partial<DrugProfile>,
  ceftriaxona: ceftriaxonaProfile as Partial<DrugProfile>,
  meropenem: meropenemProfile as Partial<DrugProfile>,
  enrofloxacina: enrofloxacinaProfile as Partial<DrugProfile>,
  cefalexina: cefalexinaProfile as Partial<DrugProfile>,
  clindamicina: clindamicinaProfile as Partial<DrugProfile>,
  metronidazol: metronidazolProfile as Partial<DrugProfile>,
  rocuronio: rocuronioProfile as Partial<DrugProfile>,
  mlk: mlkProfile as Partial<DrugProfile>,
  flk: flkProfile as Partial<DrugProfile>,
}

// Cache de validações
const validationCache = new Map<string, ValidationResult>()

/**
 * Obtém o perfil completo de um fármaco (se existir)
 */
export function getDrugProfile(drugId: string): Partial<DrugProfile> | null {
  return DRUG_PROFILE_REGISTRY[drugId] || null
}

/**
 * Valida o perfil de um fármaco (com cache)
 */
export function getDrugProfileValidation(drugId: string): ValidationResult {
  if (validationCache.has(drugId)) {
    return validationCache.get(drugId)!
  }

  const profile = getDrugProfile(drugId)
  const validation = validateDrugProfile(profile || {})

  validationCache.set(drugId, validation)
  return validation
}

/**
 * Verifica se um fármaco tem perfil completo
 */
export function hasCompleteProfile(drugId: string): boolean {
  const validation = getDrugProfileValidation(drugId)
  return validation.isValid && validation.completeness === 100
}

/**
 * Lista todos os fármacos com seus status de completude
 */
export function getAllDrugProfileStatus(): Array<{
  drugId: string
  name: string
  hasProfile: boolean
  validation: ValidationResult
}> {
  // Importar lista de fármacos do registry principal
  const { drugs } = require('../data/drugs')

  return drugs.map((drug: { id: string; name: string }) => ({
    drugId: drug.id,
    name: drug.name,
    hasProfile: !!getDrugProfile(drug.id),
    validation: getDrugProfileValidation(drug.id),
  }))
}

/**
 * Lista fármacos com perfis incompletos (para revisão)
 */
export function getIncompleteDrugProfiles(): Array<{
  drugId: string
  name: string
  validation: ValidationResult
}> {
  const all = getAllDrugProfileStatus()
  return all
    .filter((item) => !item.validation.isValid || item.validation.completeness < 100)
    .sort((a, b) => {
      // Prioriza críticos primeiro
      const aCritical = a.validation.missing.filter((m) => m.severity === 'critical').length
      const bCritical = b.validation.missing.filter((m) => m.severity === 'critical').length
      if (aCritical !== bCritical) return bCritical - aCritical
      return b.validation.completeness - a.validation.completeness
    })
}

/**
 * Valida estrutura básica do JSON
 * Verifica se tem campos mínimos necessários
 */
function validateBasicStructure(raw: any): { valid: boolean; error?: string } {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, error: 'JSON deve ser um objeto' }
  }

  // Verificar se tem pelo menos um campo de identificação
  const hasId = raw.drug_id || raw.id || raw.drugId
  if (!hasId) {
    return { valid: false, error: 'JSON deve ter pelo menos um campo de identificação (drug_id, id, ou drugId)' }
  }

  // Verificar se tem pelo menos um campo de nome
  const hasName = raw.name_pt || raw.namePt || raw.name
  if (!hasName) {
    return { valid: false, error: 'JSON deve ter pelo menos um campo de nome (name_pt, namePt, ou name)' }
  }

  return { valid: true }
}

/**
 * Valida e normaliza um fármaco antes de salvar/importar
 * Retorna erro se não passar nas validações
 */
export function validateAndNormalizeDrug(raw: any): {
  success: boolean
  normalized?: ReturnType<typeof normalizeDrug>
  validation?: ValidationResult
  lint?: ClinicalLintResult
  errors?: string[]
} {
  const errors: string[] = []

  // 1. Validar estrutura básica do JSON
  const structureCheck = validateBasicStructure(raw)
  if (!structureCheck.valid) {
    errors.push(`Estrutura JSON inválida: ${structureCheck.error}`)
    return { success: false, errors }
  }

  // 2. Normalizar o fármaco
  let normalized
  try {
    normalized = normalizeDrug(raw)
  } catch (error) {
    errors.push(`Erro ao normalizar fármaco: ${String(error)}`)
    return { success: false, errors }
  }

  // 3. Validar perfil completo (se existir)
  let validation: ValidationResult | undefined
  try {
    validation = validateDrugProfile(raw as Partial<DrugProfile>)
    if (!validation.isValid) {
      const criticalMissing = validation.missing.filter((m) => m.severity === 'critical')
      if (criticalMissing.length > 0) {
        errors.push(`Perfil incompleto: ${criticalMissing.map((m) => m.field).join(', ')}`)
      }
    }
  } catch (error) {
    // Validação de perfil é opcional, não bloqueia
    console.warn('Erro ao validar perfil:', error)
  }

  // 4. Lint clínico (obrigatório - bloqueia se houver ERRORs)
  let lint: ClinicalLintResult
  try {
    lint = lintClinical(normalized)
    if (!lint.isValid) {
      errors.push(...lint.errors.map((e) => e.message))
    }
  } catch (error) {
    errors.push(`Erro ao executar lint clínico: ${String(error)}`)
    return { success: false, errors }
  }

  // Se houver erros, não permitir salvar
  if (errors.length > 0) {
    return { success: false, errors, normalized, validation, lint }
  }

  return { success: true, normalized, validation, lint }
}

/**
 * Função auxiliar para importar e salvar fármaco com validação completa
 * BLOQUEIA salvar se houver erros críticos
 */
export function importDrug(raw: any, drugId?: string): {
  success: boolean
  drugId?: string
  normalized?: ReturnType<typeof normalizeDrug>
  errors?: string[]
  warnings?: string[]
} {
  const result = validateAndNormalizeDrug(raw)

  if (!result.success) {
    return {
      success: false,
      errors: result.errors,
    }
  }

  // Extrair drugId
  const id = drugId || raw.drug_id || raw.id || result.normalized?.id
  if (!id) {
    return {
      success: false,
      errors: ['ID do fármaco não fornecido e não encontrado no JSON'],
    }
  }

  // Aqui você salvaria no banco/registry
  // Por enquanto, apenas retornamos sucesso
  // TODO: Implementar salvamento no DRUG_PROFILE_REGISTRY ou banco

  const warnings: string[] = []
  if (result.lint && result.lint.warnings.length > 0) {
    warnings.push(...result.lint.warnings.map((w) => w.message))
  }

  return {
    success: true,
    drugId: id,
    normalized: result.normalized,
    warnings,
  }
}
