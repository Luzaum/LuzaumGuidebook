import type {
  CompoundedIngredientRole,
  CompoundedMedicationIngredientRecord,
  CompoundedMedicationRecord,
  CompoundedMedicationRegimenRecord,
} from '../../src/lib/compoundedRecords'
import { sanitizeDeepText, sanitizeVisibleText } from './textSanitizer'

export type ClinicalFormulaModel = 'fixed_concentration' | 'clinical_dose_oriented'
export type UniversalFormulaType = 'fixed_unit_formula' | 'clinical_dose_oriented' | 'procedural_topical'
export type DosageFormFamily =
  | 'oral_liquid'
  | 'oral_unit'
  | 'transdermal_measured'
  | 'topical_free_application'
  | 'otic_ophthalmic_local'
  | 'procedural_injectable'
export type ClinicalDoseSelectionStrategy = 'min' | 'mid' | 'max'
export type ClinicalPharmacyStrategy =
  | 'dose_base_per_1ml'
  | 'dose_base_per_custom_volume'
  | 'dose_base_per_unit'
  | 'dose_base_per_click'
  | 'qsp_x_doses'
  | 'adjustable_concentration'
  | 'dose_base_per_administration'
  | 'dose_base_1ml'
  | 'dose_base_1unit'
export type ClinicalRuleKind =
  | 'per_kg_per_dose'
  | 'per_kg_per_unit'
  | 'per_animal_per_dose'
  | 'per_animal_per_unit'
  | 'fixed_per_dose'
  | 'fixed_per_unit'
  | 'fixed_per_volume'

export interface DosageFormPreset {
  value: string
  family: DosageFormFamily
  administrationUnit: string
}

export interface ClinicalWeightTierRule {
  minWeightKg?: number
  maxWeightKg?: number
  doseValue: number
  doseUnit: string
  label: string
}

export interface ClinicalIngredientDoseRule {
  ingredientName: string
  ingredientRole: CompoundedIngredientRole
  rawText: string
  kind: ClinicalRuleKind
  doseMin?: number
  doseMax?: number
  doseUnit: string
  route?: string
  administrationUnit?: string
  isControlled?: boolean
  weightTiers?: ClinicalWeightTierRule[]
  notes?: string
}

export interface ClinicalRegimenSemantics {
  regimenId: string
  scenarioTitle: string
  pharmaceuticalForm: string
  dosageFormFamily: DosageFormFamily
  formulaType: UniversalFormulaType
  route: string
  administrationUnitLabel: string
  totalQuantityText: string
  totalQuantityValue?: number
  totalQuantityUnit?: string
  qspText?: string
  frequencyHours?: number
  frequencyLabel?: string
  durationDays?: number
  durationText?: string
  ownerInstruction?: string
  pharmacyInstruction?: string
  internalNote?: string
  reductionNote?: string
  doseSelectionStrategy: ClinicalDoseSelectionStrategy
  pharmacyStrategy: ClinicalPharmacyStrategy
  ingredientRules: ClinicalIngredientDoseRule[]
}

export interface ClinicalFormulaMetadata {
  source_type: 'structured' | 'clinical_text'
  entry_mode?: 'structured' | 'clinical_text'
  formula_model: ClinicalFormulaModel
  formula_type?: UniversalFormulaType
  dosage_form_family?: DosageFormFamily
  dosage_form?: string
  administration_unit?: string
  parser_version: number
  imported_clinical_text?: string
  parse_warnings?: string[]
  regimen_semantics?: Record<string, ClinicalRegimenSemantics>
}

export interface ParsedClinicalTextImport {
  medication: Partial<CompoundedMedicationRecord> & { name: string; pharmaceutical_form: string }
  ingredients: Array<Partial<CompoundedMedicationIngredientRecord>>
  regimens: Array<Partial<CompoundedMedicationRegimenRecord>>
  metadata: ClinicalFormulaMetadata
  warnings: string[]
}

type ParserScenario = {
  title: string
  species: string
  ingredients: ClinicalIngredientDoseRule[]
  pharmaceuticalForm?: string
  totalQuantityText?: string
  totalQuantityValue?: number
  totalQuantityUnit?: string
  qspText?: string
  route?: string
  administrationUnitLabel?: string
  frequencyHours?: number
  frequencyLabel?: string
  durationDays?: number
  durationText?: string
  ownerInstruction?: string
  reductionNote?: string
  internalNote?: string
}

export const DOSAGE_FORM_PRESETS: DosageFormPreset[] = [
  { value: 'Suspensão oral', family: 'oral_liquid', administrationUnit: 'mL' },
  { value: 'Solução oral', family: 'oral_liquid', administrationUnit: 'mL' },
  { value: 'Xarope', family: 'oral_liquid', administrationUnit: 'mL' },
  { value: 'Pasta oral', family: 'oral_liquid', administrationUnit: 'g' },
  { value: 'Cápsula', family: 'oral_unit', administrationUnit: 'cápsula' },
  { value: 'Comprimido', family: 'oral_unit', administrationUnit: 'comprimido' },
  { value: 'Biscoito medicamentoso', family: 'oral_unit', administrationUnit: 'biscoito' },
  { value: 'Sachê', family: 'oral_unit', administrationUnit: 'sachê' },
  { value: 'Gel transdérmico', family: 'transdermal_measured', administrationUnit: 'click' },
  { value: 'Spray', family: 'topical_free_application', administrationUnit: 'jato' },
  { value: 'Pomada', family: 'topical_free_application', administrationUnit: 'aplicação' },
  { value: 'Creme', family: 'topical_free_application', administrationUnit: 'aplicação' },
  { value: 'Loção', family: 'topical_free_application', administrationUnit: 'mL' },
  { value: 'Shampoo', family: 'topical_free_application', administrationUnit: 'banho' },
  { value: 'Lenço', family: 'topical_free_application', administrationUnit: 'lenço' },
  { value: 'Colírio', family: 'otic_ophthalmic_local', administrationUnit: 'gota' },
  { value: 'Solução otológica', family: 'otic_ophthalmic_local', administrationUnit: 'gota' },
  { value: 'Gel dental', family: 'otic_ophthalmic_local', administrationUnit: 'aplicação' },
  { value: 'Solução injetável', family: 'procedural_injectable', administrationUnit: 'mL' },
]

const CONTROLLED_KEYWORDS = ['codeina', 'tramadol', 'morfina', 'metadona', 'fenobarbital', 'diazepam', 'clonazepam', 'fluoxetina', 'gabapentina']

function normalizeText(value: string): string {
  return sanitizeVisibleText(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

function sanitizeToken(value: string): string {
  return normalizeText(value).replace(/[^\w/%.:,-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function toNumber(value: string): number | undefined {
  const parsed = Number(String(value || '').replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : undefined
}

function dedupe<T>(items: T[]): T[] { return Array.from(new Set(items)) }
function isCanineText(value: string): boolean { const normalized = sanitizeToken(value); return ['cao', 'caes', 'cachorro', 'canin'].some((term) => normalized.includes(term)) }
function isFelineText(value: string): boolean { const normalized = sanitizeToken(value); return ['gato', 'felino', 'felina', 'felin'].some((term) => normalized.includes(term)) }
function titleCaseSpecies(value: string): string { if (isCanineText(value)) return 'Canina'; if (isFelineText(value)) return 'Felina'; return value.trim() }
function guessControlled(text: string): boolean { const normalized = sanitizeToken(text); return CONTROLLED_KEYWORDS.some((keyword) => normalized.includes(keyword)) }

export function getDosageFormPreset(form?: string | null): DosageFormPreset | null {
  const normalized = normalizeText(form || '')
  if (!normalized) return null
  return DOSAGE_FORM_PRESETS.find((entry) => normalizeText(entry.value) === normalized) || null
}

export function inferDosageFormFamily(form?: string | null): DosageFormFamily {
  const normalized = normalizeText(form || '')
  const exact = getDosageFormPreset(form)
  if (exact) return exact.family
  if (normalized.includes('transderm')) return 'transdermal_measured'
  if (normalized.includes('caps') || normalized.includes('comprim') || normalized.includes('biscoito') || normalized.includes('sache') || normalized.includes('filme')) return 'oral_unit'
  if (normalized.includes('colirio') || normalized.includes('otolog') || normalized.includes('gel dental') || normalized.includes('enxagu')) return 'otic_ophthalmic_local'
  if (normalized.includes('spray') || normalized.includes('mousse') || normalized.includes('espuma') || normalized.includes('pomada') || normalized.includes('creme') || normalized.includes('locao') || normalized.includes('shampoo') || normalized.includes('wipe') || normalized.includes('lenco') || normalized.includes('spot-on') || normalized.includes('pour-on')) return 'topical_free_application'
  if (normalized.includes('injet')) return 'procedural_injectable'
  return 'oral_liquid'
}

export function inferAdministrationUnit(form?: string | null, explicitUnit?: string | null): string {
  const explicit = String(explicitUnit || '').trim()
  if (explicit) return explicit
  return getDosageFormPreset(form)?.administrationUnit || 'dose'
}

export function normalizeClinicalPharmacyStrategy(strategy?: string | null): ClinicalPharmacyStrategy {
  const normalized = normalizeText(strategy || '')
  if (normalized === 'dose_base_per_administration') return 'qsp_x_doses'
  if (normalized === 'dose_base_1ml') return 'dose_base_per_1ml'
  if (normalized === 'dose_base_1unit') return 'dose_base_per_unit'
  if (['dose_base_per_1ml', 'dose_base_per_custom_volume', 'dose_base_per_unit', 'dose_base_per_click', 'qsp_x_doses', 'adjustable_concentration'].includes(normalized)) return normalized as ClinicalPharmacyStrategy
  return 'qsp_x_doses'
}

export function getUniversalFormulaType(metadata: unknown): UniversalFormulaType {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return 'fixed_unit_formula'
  const record = metadata as Record<string, unknown>
  const formulaType = String(record.formula_type || '').trim()
  if (formulaType === 'fixed_unit_formula' || formulaType === 'clinical_dose_oriented' || formulaType === 'procedural_topical') return formulaType as UniversalFormulaType
  return String(record.formula_model || '') === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_unit_formula'
}

export function inferFormulaTypeFromText(text: string, form?: string | null, administrationUnit?: string | null): UniversalFormulaType {
  const normalized = sanitizeToken(text)
  const family = inferDosageFormFamily(form)
  const unit = normalizeText(administrationUnit || '')
  if (/(mg|mcg|g)\s*\/\s*(ml|capsula|comprimido|biscoito|sache|click|pump|gota)/i.test(normalized)) return 'fixed_unit_formula'
  if (/mg\s*\/\s*kg\s*\/\s*(dose|biscoito|capsula|comprimido|sache|click|pump)/i.test(normalized) || /mg\s*\/\s*animal/i.test(normalized) || /q\.?\s*s\.?\s*p\.?\s*\d+\s*doses?/i.test(normalized)) return 'clinical_dose_oriented'
  if ((family === 'topical_free_application' || family === 'otic_ophthalmic_local') && (normalized.includes('aplicar') || normalized.includes('banho') || normalized.includes('spray') || unit === 'aplicacao')) return 'procedural_topical'
  return family === 'oral_liquid' || family === 'oral_unit' || family === 'transdermal_measured' ? 'clinical_dose_oriented' : 'fixed_unit_formula'
}

export function getDosageFamilyLabel(family?: DosageFormFamily | null): string {
  const labels: Record<DosageFormFamily, string> = {
    oral_liquid: 'Oral líquida',
    oral_unit: 'Oral unitizada',
    transdermal_measured: 'Transdérmica',
    topical_free_application: 'Tópica livre',
    otic_ophthalmic_local: 'Oto/Oftálmica local',
    procedural_injectable: 'Procedimental',
  }
  return family ? labels[family] : ''
}

export function getFormulaTypeLabel(type?: UniversalFormulaType | null): string {
  const labels: Record<UniversalFormulaType, string> = {
    fixed_unit_formula: 'Concentração/unidade fixa',
    clinical_dose_oriented: 'Orientada por dose clínica',
    procedural_topical: 'Procedural/tópico livre',
  }
  return type ? labels[type] : ''
}

function parseQspLine(line: string): Pick<ParserScenario, 'pharmaceuticalForm' | 'totalQuantityText' | 'totalQuantityValue' | 'totalQuantityUnit' | 'qspText'> | null {
  const match = line.match(/^(.+?)\s+q\.?\s*s\.?\s*p\.?\s+(\d+(?:[.,]\d+)?)\s*([a-zA-ZÀ-ÿ]+)$/i)
  if (!match) return null
  const quantityUnit = String(match[3] || '').trim()
  return {
    pharmaceuticalForm: String(match[1] || '').trim(),
    totalQuantityText: `${match[2]} ${quantityUnit}`.trim(),
    totalQuantityValue: toNumber(match[2]) || undefined,
    totalQuantityUnit: quantityUnit,
    qspText: `${match[2]} ${quantityUnit}`.trim(),
  }
}

function parseModeOfUse(line: string): Pick<ParserScenario, 'frequencyHours' | 'frequencyLabel' | 'durationDays' | 'durationText' | 'ownerInstruction' | 'administrationUnitLabel' | 'reductionNote'> {
  const clean = line.replace(/^modo de uso:\s*/i, '').trim()
  const result: Pick<ParserScenario, 'frequencyHours' | 'frequencyLabel' | 'durationDays' | 'durationText' | 'ownerInstruction' | 'administrationUnitLabel' | 'reductionNote'> = { ownerInstruction: clean }
  const administrationMatch = clean.match(/administrar\s+(uma dose|um[a]?\s+[\p{L}-]+)/iu)
  if (administrationMatch) {
    const token = sanitizeToken(administrationMatch[1] || '')
    if (token.includes('biscoito')) result.administrationUnitLabel = 'biscoito'
    else if (token.includes('caps')) result.administrationUnitLabel = 'cápsula'
    else if (token.includes('comprim')) result.administrationUnitLabel = 'comprimido'
    else result.administrationUnitLabel = 'dose'
  }
  const frequencyMatch = clean.match(/a cada\s*(\d+(?:[.,]\d+)?)\s*h/i)
  if (frequencyMatch) {
    const hours = toNumber(frequencyMatch[1])
    if (hours) {
      result.frequencyHours = hours
      result.frequencyLabel = `a cada ${hours} horas`
    }
  }
  const durationMatch = clean.match(/por\s*(\d+(?:[.,]\d+)?)\s*(dias?|semanas?|meses?)/i)
  if (durationMatch) {
    const value = toNumber(durationMatch[1])
    const unit = normalizeText(durationMatch[2] || '')
    if (value) {
      result.durationDays = unit.startsWith('semana') ? value * 7 : unit.startsWith('mes') ? value * 30 : value
      result.durationText = `${durationMatch[1]} ${durationMatch[2]}`.trim()
    }
  }
  const reductionMatch = clean.match(/reduzid[ao]\s+em\s+(\d+(?:[.,]\d+)?)%/i)
  if (reductionMatch) result.reductionNote = `Redução sugerida de ${reductionMatch[1]}% em cenário crônico controlado.`
  return result
}

function inferRuleKind(tokens: string[]): ClinicalRuleKind {
  const normalizedTokens = tokens.map((token) => normalizeText(token))
  const hasKg = normalizedTokens.includes('kg')
  const hasDose = normalizedTokens.includes('dose')
  const hasAnimal = normalizedTokens.includes('animal')
  if (normalizedTokens.includes('ml') || normalizedTokens.includes('gota') || normalizedTokens.includes('click') || normalizedTokens.includes('pump')) return hasKg ? 'per_kg_per_unit' : 'fixed_per_volume'
  const unitToken = normalizedTokens.find((token) => ['biscoito', 'capsula', 'comprimido', 'sache', 'unidade', 'filme'].includes(token))
  if (hasKg && unitToken) return 'per_kg_per_unit'
  if (hasKg && hasDose) return 'per_kg_per_dose'
  if (hasAnimal && unitToken) return 'per_animal_per_unit'
  if (hasAnimal) return 'per_animal_per_dose'
  if (unitToken) return 'fixed_per_unit'
  return 'fixed_per_dose'
}

function inferAdministrationUnitFromTokens(tokens: string[], fallbackForm?: string): string {
  const normalizedTokens = tokens.map((token) => normalizeText(token))
  if (normalizedTokens.includes('biscoito')) return 'biscoito'
  if (normalizedTokens.includes('capsula')) return 'cápsula'
  if (normalizedTokens.includes('comprimido')) return 'comprimido'
  if (normalizedTokens.includes('sache')) return 'sachê'
  if (normalizedTokens.includes('click') || normalizedTokens.includes('pump')) return 'click'
  if (normalizedTokens.includes('gota')) return 'gota'
  if (normalizedTokens.includes('ml')) return 'mL'
  return inferAdministrationUnit(fallbackForm)
}

function parseIngredientRule(line: string, form?: string): ClinicalIngredientDoseRule | null {
  if (line.includes(':')) return null
  const match = line.match(/^(.+?)\s+(\d+(?:[.,]\d+)?)(?:\s*(?:a|-)\s*(\d+(?:[.,]\d+)?))?\s*([a-zA-ZÀ-ÿµ%]+)(.*)$/i)
  if (!match) return null
  const tokens = String(match[5] || '').split('/').map((token) => token.trim()).filter(Boolean)
  const routeToken = tokens.find((token) => ['vo', 'sc', 'im', 'iv', 'topico', 'transdermico', 'intranasal', 'oftalmico', 'otologico'].includes(normalizeText(token)))
  return {
    ingredientName: String(match[1] || '').trim(),
    ingredientRole: 'active',
    rawText: line,
    kind: inferRuleKind(tokens),
    doseMin: toNumber(match[2]),
    doseMax: toNumber(match[3] || '') ?? toNumber(match[2]),
    doseUnit: String(match[4] || '').trim(),
    route: routeToken ? routeToken.toUpperCase() : 'VO',
    administrationUnit: inferAdministrationUnitFromTokens(tokens, form),
    isControlled: guessControlled(String(match[1] || '')),
  }
}

function parseTierRule(line: string): ClinicalWeightTierRule | null {
  const normalized = normalizeText(line)
  const untilMatch = normalized.match(/ate\s+(\d+(?:[.,]\d+)?)\s*kg:\s*(\d+(?:[.,]\d+)?)\s*([a-z%µ]+)\/animal/i)
  if (untilMatch) return { maxWeightKg: toNumber(untilMatch[1]), doseValue: toNumber(untilMatch[2]) || 0, doseUnit: untilMatch[3], label: line.trim() }
  const aboveMatch = normalized.match(/acima de\s+(\d+(?:[.,]\d+)?)\s*kg:\s*(\d+(?:[.,]\d+)?)\s*([a-z%µ]+)\/animal/i)
  if (aboveMatch) return { minWeightKg: toNumber(aboveMatch[1]), doseValue: toNumber(aboveMatch[2]) || 0, doseUnit: aboveMatch[3], label: line.trim() }
  return null
}

function looksLikeScenarioTitle(line: string): boolean {
  const normalized = sanitizeToken(line)
  if (!normalized || normalized.startsWith('*') || normalized.startsWith('conheca') || normalized.startsWith('modo de uso') || normalized.startsWith('observacao')) return false
  if (normalized.includes('q.s.p') || normalized.includes(':') || /\d/.test(normalized)) return false
  return isCanineText(normalized) || isFelineText(normalized)
}

function defaultPharmacyStrategy(formulaType: UniversalFormulaType, family: DosageFormFamily, administrationUnit: string): ClinicalPharmacyStrategy {
  const unit = normalizeText(administrationUnit)
  if (formulaType === 'procedural_topical') return 'adjustable_concentration'
  if (family === 'oral_liquid') return formulaType === 'fixed_unit_formula' ? 'dose_base_per_1ml' : 'qsp_x_doses'
  if (family === 'transdermal_measured') return unit === 'click' || unit === 'pump' ? 'dose_base_per_click' : 'dose_base_per_custom_volume'
  if (family === 'oral_unit') return 'dose_base_per_unit'
  return 'dose_base_per_unit'
}

function buildMedicationName(uniqueIngredients: string[]): string {
  if (!uniqueIngredients.length) return 'Fórmula clínica importada'
  if (uniqueIngredients.length <= 3) return `Fórmula clínica - ${uniqueIngredients.join(' + ')}`
  return `Fórmula clínica - ${uniqueIngredients.slice(0, 3).join(' + ')} + ${uniqueIngredients.length - 3}`
}

function buildUniqueIngredientsSummary(scenarios: ParserScenario[]): Array<Partial<CompoundedMedicationIngredientRecord>> {
  const map = new Map<string, Partial<CompoundedMedicationIngredientRecord>>()
  for (const scenario of scenarios) {
    for (const rule of scenario.ingredients) {
      const key = sanitizeToken(rule.ingredientName)
      const current = map.get(key)
      map.set(key, {
        id: crypto.randomUUID(),
        ingredient_name: rule.ingredientName,
        ingredient_role: rule.ingredientRole,
        free_text: current ? `${current.free_text || ''} | ${rule.rawText}`.replace(/^ \| /, '') : rule.rawText,
        notes: rule.weightTiers?.length ? rule.weightTiers.map((tier) => tier.label).join(' | ') : '',
        is_controlled_ingredient: !!rule.isControlled,
      })
    }
  }
  return Array.from(map.values())
}

function matchTierTarget(currentScenario: ParserScenario, tierHeading: string): ClinicalIngredientDoseRule | undefined {
  const heading = sanitizeToken(tierHeading)
  return currentScenario.ingredients.find((entry) => {
    const ingredient = sanitizeToken(entry.ingredientName)
    return heading.includes(ingredient) || ingredient.includes(heading)
  })
}

export function getClinicalFormulaMetadata(input: unknown): ClinicalFormulaMetadata | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const metadata = sanitizeDeepText(input as Record<string, unknown>)
  const payloadV2 = metadata.payload_v2
  if (payloadV2 && typeof payloadV2 === 'object' && !Array.isArray(payloadV2)) {
    const formula = (payloadV2 as { formula?: Record<string, unknown> }).formula || {}
    return {
      source_type: 'structured',
      entry_mode: 'structured',
      formula_model: String(formula.formula_type || '') === 'clinical_dose_oriented' ? 'clinical_dose_oriented' : 'fixed_concentration',
      formula_type: (formula.formula_type as UniversalFormulaType) || 'fixed_unit_formula',
      dosage_form_family: formula.dosage_form_family as DosageFormFamily,
      dosage_form: String(formula.pharmaceutical_form || ''),
      administration_unit: String(formula.administration_unit || ''),
      parser_version: 2,
      parse_warnings: [],
      regimen_semantics: {},
    }
  }
  return metadata.formula_model === 'clinical_dose_oriented' || metadata.formula_type === 'clinical_dose_oriented' || metadata.formula_type === 'procedural_topical'
    ? metadata as ClinicalFormulaMetadata
    : null
}

export function getClinicalRegimenSemantics(metadata: unknown, regimenId?: string | null): ClinicalRegimenSemantics | null {
  const formula = getClinicalFormulaMetadata(metadata)
  if (!formula?.regimen_semantics || !regimenId) return null
  return formula.regimen_semantics[String(regimenId)] || null
}

export function buildClinicalRuleSummary(rule: ClinicalIngredientDoseRule): string {
  const rangeText = rule.doseMin != null && rule.doseMax != null && rule.doseMax !== rule.doseMin
    ? `${String(rule.doseMin).replace('.', ',')} a ${String(rule.doseMax).replace('.', ',')}`
    : `${String(rule.doseMin ?? '').replace('.', ',')}`
  const basisMap: Record<ClinicalRuleKind, string> = {
    per_kg_per_dose: `${rule.doseUnit}/kg/dose`,
    per_kg_per_unit: `${rule.doseUnit}/kg/${rule.administrationUnit || 'unidade'}`,
    per_animal_per_dose: `${rule.doseUnit}/animal/dose`,
    per_animal_per_unit: `${rule.doseUnit}/animal/${rule.administrationUnit || 'unidade'}`,
    fixed_per_dose: `${rule.doseUnit}/dose`,
    fixed_per_unit: `${rule.doseUnit}/${rule.administrationUnit || 'unidade'}`,
    fixed_per_volume: `${rule.doseUnit}/${rule.administrationUnit || 'mL'}`,
  }
  return `${rule.ingredientName}: ${rangeText} ${basisMap[rule.kind]}${rule.route ? `/${rule.route}` : ''}`.trim()
}

export function parseClinicalTextImport(text: string): ParsedClinicalTextImport {
  const sanitizedSource = sanitizeVisibleText(text)
  const lines = sanitizedSource
    .split(/\r?\n/)
    .map((line) => sanitizeVisibleText(line).replace(/[•·]/g, '').trim())
    .filter(Boolean)
  const warnings: string[] = []
  const scenarios: ParserScenario[] = []
  let currentScenario: ParserScenario | null = null
  let tierTargetHeading = ''

  const ensureScenario = (title: string) => {
    if (currentScenario) scenarios.push(currentScenario)
    currentScenario = { title, species: titleCaseSpecies(title), ingredients: [] }
  }

  for (const line of lines) {
    if (/^(\*+)?observa[cç][aã]o:/i.test(line) || sanitizeToken(line).includes('medicamento controlado')) {
      if (currentScenario) currentScenario.internalNote = [currentScenario.internalNote, line.replace(/^(\*+)?observa[cç][aã]o:\s*/i, '').trim()].filter(Boolean).join(' ')
      continue
    }
    if (/^\*/.test(line) && line.includes(':')) {
      tierTargetHeading = line.replace(/^\*+/, '').split(':')[0] || ''
      continue
    }
    if (looksLikeScenarioTitle(line)) {
      ensureScenario(line)
      tierTargetHeading = ''
      continue
    }
    if (!currentScenario) continue
    const qsp = parseQspLine(line)
    if (qsp) {
      currentScenario = { ...currentScenario, ...qsp }
      continue
    }
    if (/^modo de uso:/i.test(line)) {
      currentScenario = { ...currentScenario, ...parseModeOfUse(line) }
      continue
    }
    const tier = parseTierRule(line)
    if (tier && tierTargetHeading) {
      const target = matchTierTarget(currentScenario, tierTargetHeading)
      if (target) target.weightTiers = [...(target.weightTiers || []), tier]
      else warnings.push(`Faixa por peso sem ingrediente associado: ${line}`)
      continue
    }
    const rule = parseIngredientRule(line, currentScenario.pharmaceuticalForm)
    if (rule) {
      currentScenario.ingredients.push(rule)
      if (!currentScenario.route && rule.route) currentScenario.route = rule.route
      if (!currentScenario.administrationUnitLabel && rule.administrationUnit) currentScenario.administrationUnitLabel = rule.administrationUnit
    }
  }

  if (currentScenario) scenarios.push(currentScenario)
  const effectiveScenarios = scenarios.filter((scenario) => scenario.ingredients.length > 0 || scenario.totalQuantityText)
  if (!effectiveScenarios.length) throw new Error('Não foi possível identificar cenários clínicos no texto importado.')

  const uniqueIngredients = dedupe(effectiveScenarios.flatMap((scenario) => scenario.ingredients.map((entry) => entry.ingredientName)).filter(Boolean))
  const isControlled = effectiveScenarios.some((scenario) => scenario.ingredients.some((entry) => entry.isControlled) || sanitizeToken(scenario.internalNote || '').includes('controlado'))
  const primaryForm = effectiveScenarios[0]?.pharmaceuticalForm || 'Suspensão oral'
  const family = inferDosageFormFamily(primaryForm)
  const administrationUnit = inferAdministrationUnit(primaryForm, effectiveScenarios[0]?.administrationUnitLabel)
  const formulaType = inferFormulaTypeFromText(sanitizedSource, primaryForm, administrationUnit)

  const regimenSemantics: Record<string, ClinicalRegimenSemantics> = {}
  const regimens = effectiveScenarios.map((scenario) => {
    const regimenId = crypto.randomUUID()
    const route = scenario.route || scenario.ingredients[0]?.route || 'VO'
    const form = scenario.pharmaceuticalForm || primaryForm
    const regimenFamily = inferDosageFormFamily(form)
    const regimenAdministrationUnit = inferAdministrationUnit(form, scenario.administrationUnitLabel || scenario.ingredients[0]?.administrationUnit)
    const regimenFormulaType = inferFormulaTypeFromText([scenario.title, ...scenario.ingredients.map((entry) => entry.rawText), scenario.ownerInstruction || '', scenario.totalQuantityText || ''].join('\n'), form, regimenAdministrationUnit)
    const primaryRule = scenario.ingredients[0]
    regimenSemantics[regimenId] = {
      regimenId,
      scenarioTitle: scenario.title,
      pharmaceuticalForm: form,
      dosageFormFamily: regimenFamily,
      formulaType: regimenFormulaType,
      route,
      administrationUnitLabel: regimenAdministrationUnit,
      totalQuantityText: scenario.totalQuantityText || '',
      totalQuantityValue: scenario.totalQuantityValue,
      totalQuantityUnit: scenario.totalQuantityUnit,
      qspText: scenario.qspText,
      frequencyHours: scenario.frequencyHours,
      frequencyLabel: scenario.frequencyLabel,
      durationDays: scenario.durationDays,
      durationText: scenario.durationText,
      ownerInstruction: scenario.ownerInstruction,
      internalNote: scenario.internalNote,
      reductionNote: scenario.reductionNote,
      doseSelectionStrategy: 'min',
      pharmacyStrategy: defaultPharmacyStrategy(regimenFormulaType, regimenFamily, regimenAdministrationUnit),
      ingredientRules: scenario.ingredients,
    }
    return {
      id: regimenId,
      regimen_name: `${scenario.title} — ${form}`,
      indication: scenario.title,
      species: scenario.species || 'Canina',
      route,
      dosing_mode: regimenFormulaType === 'fixed_unit_formula' ? 'fixed_per_patient' : 'calculated',
      dose_min: primaryRule?.doseMin ?? null,
      dose_max: primaryRule?.doseMax ?? null,
      dose_unit: primaryRule?.doseUnit || null,
      per_weight_unit:
        primaryRule?.kind === 'per_kg_per_dose' || primaryRule?.kind === 'per_kg_per_unit'
          ? 'kg'
          : primaryRule?.kind === 'per_animal_per_dose' || primaryRule?.kind === 'per_animal_per_unit'
            ? 'animal'
            : primaryRule?.kind === 'fixed_per_unit' || primaryRule?.kind === 'fixed_per_dose'
              ? 'unit'
              : null,
      duration_mode: scenario.durationDays ? 'fixed_days' : 'continuous_until_recheck',
      duration_value: scenario.durationDays || null,
      duration_unit: scenario.durationDays ? 'dias' : null,
      frequency_value_min: scenario.frequencyHours || null,
      frequency_unit: scenario.frequencyHours ? 'hours' : null,
      frequency_label: scenario.frequencyLabel || null,
      default_administration_sig: scenario.ownerInstruction || '',
      default_prepared_quantity_text: scenario.totalQuantityText || '',
      notes: [scenario.internalNote, scenario.reductionNote].filter(Boolean).join(' ').trim(),
      allow_edit: true,
      inherit_default_start: true,
    } satisfies Partial<CompoundedMedicationRegimenRecord>
  })

  const metadata: ClinicalFormulaMetadata = {
    source_type: 'clinical_text',
    entry_mode: 'clinical_text',
    formula_model: formulaType === 'fixed_unit_formula' ? 'fixed_concentration' : 'clinical_dose_oriented',
    formula_type: formulaType,
    dosage_form_family: family,
    dosage_form: primaryForm,
    administration_unit: administrationUnit,
    parser_version: 1,
    imported_clinical_text: sanitizedSource,
    parse_warnings: warnings,
    regimen_semantics: regimenSemantics,
  }

  const allSpecies = dedupe(effectiveScenarios.map((scenario) => scenario.species).filter(Boolean))
  const defaultRoute = effectiveScenarios[0]?.route || effectiveScenarios[0]?.ingredients[0]?.route || 'VO'
  return {
    medication: {
      name: buildMedicationName(uniqueIngredients),
      description: effectiveScenarios.map((scenario) => scenario.title).join(' | '),
      pharmaceutical_form: primaryForm,
      default_route: defaultRoute,
      species: allSpecies.length ? allSpecies : ['Canina'],
      routes: dedupe(effectiveScenarios.map((scenario) => scenario.route || defaultRoute).filter(Boolean)),
      is_controlled: isControlled,
      control_type: isControlled ? 'controlado' : 'venda_livre',
      is_active: true,
      default_quantity_text: effectiveScenarios[0]?.totalQuantityText || '',
      default_qsp_text: effectiveScenarios[0]?.qspText || '',
      notes: effectiveScenarios.map((scenario) => scenario.internalNote).filter(Boolean).join(' '),
      manipulation_instructions: '',
      metadata,
    },
    ingredients: buildUniqueIngredientsSummary(effectiveScenarios),
    regimens,
    metadata,
    warnings,
  }
}
