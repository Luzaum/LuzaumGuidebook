import fs from 'node:fs'
import path from 'node:path'
import { drugs } from '../modules/crivet/data/drugs'
import { calculateDirectInfusion, calculatePreparation } from '../modules/crivet/engine/calculateCRI'
import { convertDose, DoseUnit } from '../modules/crivet/engine/conversions'
import { getDrugProfileValidation } from '../modules/crivet/utils/drugProfileRegistry'

type CalcStatus = 'functional' | 'functional_guarded' | 'failed'
type AuditStatus = 'funcional' | 'funcional_com_ressalvas' | 'nao_funcional'

type DoseSelection = {
  dose: number
  unit: DoseUnit
  source: 'profile' | 'legacy' | 'synthetic'
  note?: string
}

type DrugAudit = {
  id: string
  name: string
  category: string
  auditStatus: AuditStatus
  calcStatus: CalcStatus
  directOk: boolean
  preparationOk: boolean
  preparationGuarded: boolean
  profileCompleteness: number
  missingCritical: number
  missingWarning: number
  missingInfo: number
  recommendedUnit?: string
  recommendedUnitSupported: boolean
  indicatedDoseAvailable: boolean
  concentrationAvailable: boolean
  compatibilityOptionAvailable: boolean
  compatibilityDetailsAvailable: boolean
  doseSelection: DoseSelection
  notes: string[]
}

const SUPPORTED_UNITS: DoseUnit[] = ['mcg/kg/min', 'mcg/kg/h', 'mg/kg/min', 'mg/kg/h', 'U/kg/h', 'U/kg/min']
const SUPPORTED_SET = new Set<string>(SUPPORTED_UNITS)

function asDoseUnitOrNull(value: unknown): DoseUnit | null {
  if (!value || typeof value !== 'string') return null
  if (SUPPORTED_SET.has(value)) return value as DoseUnit
  const normalized = value.replace(/\s+/g, '').toLowerCase()
  if (normalized === 'mukgmin') return 'U/kg/min'
  if (normalized === 'mukgh') return 'U/kg/h'
  return null
}

function getCriRange(profile: any): { unit: DoseUnit; min: number; max: number } | null {
  const cri = profile?.doses?.dog?.cri || profile?.doses?.cat?.cri
  if (!cri || typeof cri !== 'object') return null

  const ranges: Array<{ key: string; unit: DoseUnit; scale?: number }> = [
    { key: 'mcgkgmin', unit: 'mcg/kg/min' },
    { key: 'mgkgh', unit: 'mg/kg/h' },
    { key: 'mgkgmin', unit: 'mg/kg/min' },
    { key: 'u_kg_h', unit: 'U/kg/h' },
    { key: 'ukgh', unit: 'U/kg/h' },
    { key: 'mukgmin', unit: 'U/kg/min', scale: 0.001 },
    { key: 'mukgh', unit: 'U/kg/h', scale: 0.001 },
  ]

  for (const candidate of ranges) {
    const node = cri[candidate.key]
    if (!node || typeof node !== 'object') continue

    const min = Number(node.min)
    const max = Number(node.max)
    if (!Number.isFinite(min) || !Number.isFinite(max) || max <= 0) continue

    const scale = candidate.scale ?? 1
    return {
      unit: candidate.unit,
      min: min * scale,
      max: max * scale,
    }
  }

  return null
}

function getLegacyRange(drug: any): { unit: DoseUnit; min: number; max: number } | null {
  const list = Array.isArray(drug.indicatedDoses) ? drug.indicatedDoses : []
  const cri = list.find((entry: any) => entry.mode === 'CRI' && SUPPORTED_SET.has(entry.unit))
  if (!cri) return null

  const min = Number(cri.range?.min)
  const max = Number(cri.range?.max)
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= 0) return null

  return { unit: cri.unit as DoseUnit, min, max }
}

function chooseDose(drug: any): DoseSelection {
  const profileRange = getCriRange(drug.profile)
  const mappedProfileUnit = asDoseUnitOrNull(drug.profile?.doses?.unit_standard_cri)

  if (profileRange) {
    let selectedUnit = profileRange.unit
    let selectedDose = (profileRange.min + profileRange.max) / 2

    if (mappedProfileUnit) {
      selectedDose = convertDose(selectedDose, profileRange.unit, mappedProfileUnit)
      selectedUnit = mappedProfileUnit
    }

    return {
      dose: selectedDose,
      unit: selectedUnit,
      source: 'profile',
    }
  }

  const legacyRange = getLegacyRange(drug)
  if (legacyRange) {
    return {
      dose: (legacyRange.min + legacyRange.max) / 2,
      unit: legacyRange.unit,
      source: 'legacy',
    }
  }

  return {
    dose: 1,
    unit: 'mg/kg/h',
    source: 'synthetic',
    note: 'Dose sintetica usada por ausencia de faixa CRI estruturada.',
  }
}

function hasCompatibilityDetails(drug: any): boolean {
  const compat = drug.compatibility || {}
  const hasKnownDiluent = Array.isArray(compat.diluents) && compat.diluents.some((entry: any) => entry?.status && entry.status !== 'unknown')
  const hasDiluentList = Array.isArray(compat.compatibleDiluent) && compat.compatibleDiluent.length > 0
  const hasMeds = Array.isArray(compat.compatibleMeds) && compat.compatibleMeds.length > 0
  const hasIncompat = Array.isArray(compat.incompatibilities) && compat.incompatibilities.length > 0
  const hasWarnings = Array.isArray(compat.materialWarnings) && compat.materialWarnings.length > 0

  return hasKnownDiluent || hasDiluentList || hasMeds || hasIncompat || hasWarnings
}

function asFinitePositive(value: unknown): boolean {
  return Number.isFinite(value) && Number(value) > 0
}

function auditDrug(drug: any): DrugAudit {
  const notes: string[] = []
  const validation = getDrugProfileValidation(drug.id)

  const recommendedUnit = drug.recommendedUnit || drug.profile?.doses?.unit_standard_cri || ''
  const recommendedUnitSupported = !!asDoseUnitOrNull(recommendedUnit)
  if (!recommendedUnit) notes.push('Unidade recomendada ausente.')
  if (recommendedUnit && !recommendedUnitSupported) notes.push(`Unidade recomendada não suportada pela engine: ${recommendedUnit}`)

  const doseSelection = chooseDose(drug)
  const indicatedDoseAvailable = doseSelection.source !== 'synthetic'
  if (!indicatedDoseAvailable) notes.push('Faixa de dose indicada ausente para CRI (perfil/legacy).')

  const concentrationAvailable = Array.isArray(drug.concentrations) && drug.concentrations.length > 0
  const concentration = concentrationAvailable ? Number(drug.concentrations[0]) : 1
  if (!concentrationAvailable) notes.push('Concentracao comercial ausente na lista principal; usado valor sintetico 1 mg/mL para teste.')

  const compatibilityOptionAvailable = !!drug.compatibility
  const compatibilityDetailsAvailable = hasCompatibilityDetails(drug)
  if (!compatibilityOptionAvailable) notes.push('Objeto de compatibilidade ausente.')
  if (compatibilityOptionAvailable && !compatibilityDetailsAvailable) notes.push('Compatibilidade sem detalhes especificos (apenas desconhecido/generico).')

  let directOk = false
  let preparationOk = false
  let preparationGuarded = false

  try {
    const direct = calculateDirectInfusion(doseSelection.dose, doseSelection.unit, 10, concentration)
    directOk = asFinitePositive(direct.rateMlHr) && asFinitePositive(direct.rateMlMin)
    if (!directOk) notes.push('Falha no calculo direto: taxa invalida.')
  } catch (error) {
    notes.push(`Excecao no calculo direto: ${String(error)}`)
  }

  try {
    const prep = calculatePreparation(doseSelection.dose, doseSelection.unit, 10, 5, 20, concentration, {
      drugId: drug.id,
    })

    if (prep.error) {
      if (drug.id === 'vasopressina') {
        preparationGuarded = true
        notes.push('Bloqueio de seguranca esperado para vasopressina sem pre-diluicao.')
      } else {
        notes.push(`Preparo retornou erro: ${prep.error.title}`)
      }
    } else {
      preparationOk =
        Number.isFinite(prep.drugVolumeMl) &&
        Number.isFinite(prep.diluentVolumeMl) &&
        Number.isFinite(prep.finalConcentrationMgMl) &&
        Number.isFinite(prep.totalDrugMg) &&
        prep.drugVolumeMl >= 0 &&
        prep.diluentVolumeMl >= 0

      if (!preparationOk) notes.push('Falha no preparo: resultado invalido (NaN ou negativo).')
    }
  } catch (error) {
    notes.push(`Excecao no calculo de preparo: ${String(error)}`)
  }

  const calcStatus: CalcStatus = directOk && preparationOk
    ? 'functional'
    : directOk && preparationGuarded
    ? 'functional_guarded'
    : 'failed'

  const hasCriticalMissing = validation.missing.some((item) => item.severity === 'critical')
  const hasDataGaps = !recommendedUnit || !recommendedUnitSupported || !indicatedDoseAvailable || !concentrationAvailable || !compatibilityDetailsAvailable || hasCriticalMissing

  let auditStatus: AuditStatus
  if (calcStatus === 'failed') {
    auditStatus = 'nao_funcional'
  } else if (hasDataGaps) {
    auditStatus = 'funcional_com_ressalvas'
  } else {
    auditStatus = 'funcional'
  }

  if (doseSelection.note) notes.push(doseSelection.note)

  return {
    id: drug.id,
    name: drug.name,
    category: drug.category,
    auditStatus,
    calcStatus,
    directOk,
    preparationOk,
    preparationGuarded,
    profileCompleteness: validation.completeness,
    missingCritical: validation.missing.filter((item) => item.severity === 'critical').length,
    missingWarning: validation.missing.filter((item) => item.severity === 'warning').length,
    missingInfo: validation.missing.filter((item) => item.severity === 'info').length,
    recommendedUnit: recommendedUnit || undefined,
    recommendedUnitSupported,
    indicatedDoseAvailable,
    concentrationAvailable,
    compatibilityOptionAvailable,
    compatibilityDetailsAvailable,
    doseSelection,
    notes,
  }
}

function buildReport(results: DrugAudit[]): string {
  const total = results.length
  const funcional = results.filter((item) => item.auditStatus === 'funcional').length
  const ressalvas = results.filter((item) => item.auditStatus === 'funcional_com_ressalvas').length
  const naoFuncional = results.filter((item) => item.auditStatus === 'nao_funcional').length

  const missingDose = results.filter((item) => !item.indicatedDoseAvailable).length
  const missingUnit = results.filter((item) => !item.recommendedUnit).length
  const unsupportedUnit = results.filter((item) => item.recommendedUnit && !item.recommendedUnitSupported).length
  const missingConcentration = results.filter((item) => !item.concentrationAvailable).length
  const missingCompatibilityOption = results.filter((item) => !item.compatibilityOptionAvailable).length
  const missingCompatibilityDetail = results.filter((item) => !item.compatibilityDetailsAvailable).length

  const sectionMissing = new Map<string, number>()
  for (const item of results) {
    const validation = getDrugProfileValidation(item.id)
    for (const missing of validation.missing) {
      sectionMissing.set(missing.section, (sectionMissing.get(missing.section) || 0) + 1)
    }
  }

  const topSections = [...sectionMissing.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)

  const lines: string[] = []
  lines.push('# Auditoria CRIVET - Engine de Calculo e Dados')
  lines.push('')
  lines.push(`Data: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## Resumo Executivo')
  lines.push(`- Total de farmacos auditados: ${total}`)
  lines.push(`- Funcionais: ${funcional}`)
  lines.push(`- Funcionais com ressalvas: ${ressalvas}`)
  lines.push(`- Não funcionais: ${naoFuncional}`)
  lines.push('')
  lines.push('## Lacunas de Dados')
  lines.push(`- Sem dose indicada CRI estruturada: ${missingDose}`)
  lines.push(`- Sem unidade recomendada: ${missingUnit}`)
  lines.push(`- Unidade recomendada não suportada pela engine: ${unsupportedUnit}`)
  lines.push(`- Sem concentracao comercial no cadastro principal: ${missingConcentration}`)
  lines.push(`- Sem objeto de compatibilidade no cadastro: ${missingCompatibilityOption}`)
  lines.push(`- Compatibilidade sem detalhe especifico: ${missingCompatibilityDetail}`)
  lines.push('')
  lines.push('### Secoes com mais faltas (top 10)')
  for (const [section, count] of topSections) {
    lines.push(`- ${section}: ${count}`)
  }

  lines.push('')
  lines.push('## Resultado por Farmaco')
  lines.push('| Farmaco | Categoria | Status | Calc Direto | Calc Preparo | Dose indicada | Unidade recomendada | Concentracao | Compatibilidade detalhada | Completude |')
  lines.push('|---|---|---|---|---|---|---|---|---|---|')

  for (const item of results) {
    const prep = item.preparationGuarded ? 'Guardado' : item.preparationOk ? 'OK' : 'Falha'
    const unitCell = item.recommendedUnit
      ? item.recommendedUnitSupported
        ? `${item.recommendedUnit} (OK)`
        : `${item.recommendedUnit} (NAO SUPORTADA)`
      : 'Ausente'

    lines.push(
      `| ${item.name} | ${item.category} | ${item.auditStatus} | ${item.directOk ? 'OK' : 'Falha'} | ${prep} | ${
        item.indicatedDoseAvailable ? 'OK' : 'Não'
      } | ${unitCell} | ${item.concentrationAvailable ? 'OK' : 'Não'} | ${item.compatibilityDetailsAvailable ? 'OK' : 'Não'} | ${item.profileCompleteness}% |`,
    )
  }

  const problematic = results.filter((item) => item.auditStatus !== 'funcional' || item.notes.length > 0)
  lines.push('')
  lines.push('## Observacoes Tecnicas')
  for (const item of problematic) {
    if (item.notes.length === 0) continue
    lines.push(`- ${item.name} (${item.id}): ${item.notes.join(' | ')}`)
  }

  return lines.join('\n')
}

function main() {
  const results = drugs.map(auditDrug)
  const report = buildReport(results)

  const date = new Date().toISOString().slice(0, 10)
  const outputPath = path.resolve(process.cwd(), `docs/CRIVET_ENGINE_AUDIT_${date}.md`)
  fs.writeFileSync(outputPath, report, 'utf8')

  const summary = {
    total: results.length,
    funcional: results.filter((item) => item.auditStatus === 'funcional').length,
    funcional_com_ressalvas: results.filter((item) => item.auditStatus === 'funcional_com_ressalvas').length,
    nao_funcional: results.filter((item) => item.auditStatus === 'nao_funcional').length,
    outputPath,
  }

  console.log(JSON.stringify(summary, null, 2))
}

main()
