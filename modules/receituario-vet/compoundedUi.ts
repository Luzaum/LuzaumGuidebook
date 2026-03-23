import type {
  CompoundedMedicationSnapshot,
  CompoundedPrescriptionItem,
  CompoundedRegimenSnapshot,
  PatientInfo,
  PrescriptionItem,
} from './NovaReceita2Page'
import {
  getClinicalFormulaMetadata,
  type ClinicalDoseSelectionStrategy,
  type ClinicalIngredientDoseRule,
  type ClinicalRegimenSemantics,
  type ClinicalWeightTierRule,
} from './compoundedClinicalText'

type ClinicalRouteOption = { value: string; label: string }

type CalculationStatus =
  | 'fixed'
  | 'ok'
  | 'missing_weight'
  | 'missing_concentration'
  | 'missing_dose'
  | 'incompatible_units'
  | 'impractical'

export type CompoundedCalculationSummary = {
  mode: 'fixed_per_animal' | 'weight_based'
  status: CalculationStatus
  weightKg: number | null
  route: string
  routeLabel: string
  concentrationText: string
  regimenLabel: string
  doseDescriptorText: string
  perAdministrationValue: number | null
  perAdministrationUnit: string
  perAdministrationText: string
  calculatedTotalValue: number | null
  calculatedTotalUnit: string
  calculatedTotalText: string
  estimatedTotalValue: number | null
  estimatedTotalUnit: string
  estimatedTotalText: string
  finalQuantityText: string
  ingredientBreakdown?: Array<{
    ingredientName: string
    rawRuleText: string
    selectedDoseText: string
    rangeText?: string
    controlled?: boolean
  }>
  administrationLabelText?: string
  selectionStrategy?: ClinicalDoseSelectionStrategy
  warnings: string[]
}

function normalizeText(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function toNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  const parsed = Number(String(value).replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : null
}

function formatDecimal(value: number, maxFractionDigits = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  }).format(value)
}

function isCompounded(item: PrescriptionItem): item is CompoundedPrescriptionItem {
  return item.kind === 'compounded'
}

function getClinicalFormula(item: CompoundedPrescriptionItem): ReturnType<typeof getClinicalFormulaMetadata> {
  return getClinicalFormulaMetadata(item.compounded_snapshot?.metadata || null)
}

function getClinicalRegimen(item: CompoundedPrescriptionItem): ClinicalRegimenSemantics | null {
  const direct = item.compounded_regimen_snapshot?.metadata
  if (direct && typeof direct === 'object' && !Array.isArray(direct)) {
    return direct as ClinicalRegimenSemantics
  }
  const formula = getClinicalFormula(item)
  const regimenId = item.compounded_regimen_id || item.compounded_regimen_snapshot?.id
  if (!formula?.regimen_semantics || !regimenId) return null
  return formula.regimen_semantics[String(regimenId)] || null
}

function isClinicalDoseOrientedItem(item: PrescriptionItem): item is CompoundedPrescriptionItem {
  return isCompounded(item) && getClinicalFormula(item)?.formula_model === 'clinical_dose_oriented'
}

function normalizeUnit(unit?: string | null): string {
  const normalized = normalizeText(unit || '').replace(/\./g, '')
  const aliases: Record<string, string> = {
    mg: 'mg',
    g: 'g',
    mcg: 'mcg',
    ug: 'mcg',
    'µg': 'mcg',
    ui: 'ui',
    iu: 'ui',
    ml: 'mL',
    l: 'L',
    capsula: 'cápsula',
    capsulas: 'cápsula',
    capsule: 'cápsula',
    comprimido: 'comprimido',
    comprimidos: 'comprimido',
    gota: 'gota',
    gotas: 'gota',
    puff: 'puff',
    puffs: 'puff',
    jato: 'jato',
    jatos: 'jato',
    ato: 'ato',
    atos: 'ato',
    sache: 'sachê',
    saches: 'sachê',
    unidade: 'unidade',
    unidades: 'unidade',
  }
  return aliases[normalized] || String(unit || '').trim()
}

function normalizeRouteValue(route?: string | null): string {
  const normalized = normalizeText(route || '')
  if (!normalized) return ''
  if (normalized === 'vo' || normalized.includes('oral')) return 'VO'
  if (normalized === 'sc' || normalized.includes('subcut')) return 'SC'
  if (normalized === 'im' || normalized.includes('intramus')) return 'IM'
  if (normalized === 'iv' || normalized.includes('intraven')) return 'IV'
  if (normalized.includes('top')) return 'Topico'
  if (normalized.includes('oft')) return 'Oftalmico'
  if (normalized.includes('oto')) return 'Otologico'
  if (normalized.includes('nasal')) return 'Intranasal'
  if (normalized.includes('retal')) return 'Retal'
  if (normalized.includes('inal')) return 'Inalatorio'
  if (normalized.includes('transd')) return 'Transdermico'
  return String(route || '').trim()
}

function routeToClinicalLabel(route?: string | null): string {
  const value = normalizeRouteValue(route)
  if (!value) return ''
  const labels: Record<string, string> = {
    VO: 'por via oral',
    SC: 'por via subcutânea',
    IM: 'por via intramuscular',
    IV: 'por via intravenosa',
    Topico: 'por via tópica',
    Oftalmico: 'por via oftálmica',
    Otologico: 'por via otológica',
    Intranasal: 'por via intranasal',
    Retal: 'por via retal',
    Inalatorio: 'por via inalatória',
    Transdermico: 'por via transdérmica',
  }
  return labels[value] || `por via ${route}`
}

function routeVerb(route?: string | null): string {
  const value = normalizeRouteValue(route)
  if (value === 'Topico' || value === 'Oftalmico' || value === 'Otologico' || value === 'Transdermico') return 'Aplicar'
  if (value === 'Intranasal' || value === 'Inalatorio') return 'Administrar'
  return 'Administrar'
}

function getCalculationMode(regimen?: CompoundedRegimenSnapshot | null): 'fixed_per_animal' | 'weight_based' {
  const explicit = normalizeText(String((regimen as { calculation_mode?: string } | null)?.calculation_mode || ''))
  if (explicit === 'weight_based') return 'weight_based'
  if (explicit === 'fixed_per_animal') return 'fixed_per_animal'
  return regimen?.dosing_mode === 'calculated' ? 'weight_based' : 'fixed_per_animal'
}

function buildCompoundedConcentrationLine(regimen?: CompoundedRegimenSnapshot | null, item?: CompoundedPrescriptionItem): string {
  if (regimen?.concentration_value && regimen?.concentration_unit) {
    const perValue = regimen.concentration_per_value || 1
    const perUnit = regimen.concentration_per_unit || 'mL'
    return `${formatDecimal(regimen.concentration_value)} ${regimen.concentration_unit}/${formatDecimal(perValue)} ${perUnit}`.replace('/1 ', '/')
  }
  return String(item?.concentration_text || '').trim()
}

function frequencyTokenLabel(timesPerDay?: number): string {
  if (!timesPerDay || timesPerDay <= 0) return ''
  if (timesPerDay === 1) return 'a cada 24 horas'
  const interval = 24 / timesPerDay
  if (Number.isFinite(interval) && Math.round(interval) === interval) {
    return `a cada ${interval} horas`
  }
  return `${formatDecimal(timesPerDay)} vezes ao dia`
}

export function getCompoundedFrequencySummary(item: PrescriptionItem): string {
  if (!isCompounded(item)) return String(item.frequency || '').trim()
  if (item.frequencyMode === 'interval_hours' && item.intervalHours && item.intervalHours > 0) {
    return `a cada ${formatDecimal(item.intervalHours)} horas`
  }
  if (item.frequencyMode === 'times_per_day' && item.timesPerDay && item.timesPerDay > 0) {
    return frequencyTokenLabel(item.timesPerDay)
  }
  return String(item.frequency || '').trim()
}

function durationModeLabel(mode?: PrescriptionItem['durationMode']): string {
  if (mode === 'continuous_until_recheck') return 'até reavaliação clínica'
  if (mode === 'until_recheck') return 'até reavaliação clínica'
  if (mode === 'continuous_use') return 'uso contínuo'
  if (mode === 'until_finished') return 'até terminar o medicamento'
  return ''
}

function getDurationDays(item: PrescriptionItem): number | null {
  if (item.durationMode !== 'fixed_days' || !item.durationValue || item.durationValue <= 0) return null
  const unit = normalizeText(item.durationUnit || 'dias')
  if (unit.startsWith('semana')) return item.durationValue * 7
  if (unit.startsWith('mes')) return item.durationValue * 30
  return item.durationValue
}

export function getCompoundedDurationSummary(item: PrescriptionItem): string {
  if (!isCompounded(item)) return String(item.duration || '').trim()
  if (item.durationMode === 'fixed_days' && item.durationValue && item.durationValue > 0) {
    return `${formatDecimal(item.durationValue)} ${item.durationUnit || 'dias'}`
  }
  return durationModeLabel(item.durationMode) || String(item.duration || '').trim()
}

function dosesPerDayFromItem(item: PrescriptionItem): number | null {
  if (item.frequencyMode === 'times_per_day' && item.timesPerDay && item.timesPerDay > 0) return item.timesPerDay
  if (item.frequencyMode === 'interval_hours' && item.intervalHours && item.intervalHours > 0) return 24 / item.intervalHours
  const normalized = normalizeText(item.frequency || '')
  const match = normalized.match(/a cada\s*(\d+(?:[.,]\d+)?)\s*hora/)
  if (match) {
    const hours = toNumber(match[1])
    return hours && hours > 0 ? 24 / hours : null
  }
  const times = normalized.match(/(\d+)\s*x\s*ao\s*dia/)
  if (times) return toNumber(times[1])
  return null
}

function convertUnitValue(value: number, unit?: string | null): { family: 'mass' | 'volume' | 'ui' | 'unknown'; value: number } | null {
  const normalized = normalizeUnit(unit)
  if (!normalized) return null
  if (normalized === 'mg') return { family: 'mass', value }
  if (normalized === 'g') return { family: 'mass', value: value * 1000 }
  if (normalized === 'mcg') return { family: 'mass', value: value / 1000 }
  if (normalized === 'ui') return { family: 'ui', value }
  if (normalized === 'mL') return { family: 'volume', value }
  if (normalized === 'L') return { family: 'volume', value: value * 1000 }
  return null
}

function formatAdministrationAmount(value: number, unit: string): string {
  const normalized = normalizeUnit(unit)
  if (normalized === 'gota' || normalized === 'puff' || normalized === 'jato' || normalized === 'ato' || normalized === 'cápsula' || normalized === 'comprimido' || normalized === 'sachê' || normalized === 'unidade') {
    const rounded = normalized === 'cápsula' || normalized === 'comprimido' || normalized === 'sachê' || normalized === 'unidade'
      ? Math.round(value * 100) / 100
      : Math.round(value)
    return `${formatDecimal(rounded)} ${normalized}${rounded > 1 && !normalized.endsWith('s') ? 's' : ''}`.replace('cápsulas', 'cápsulas').replace('comprimidos', 'comprimidos')
  }
  return `${formatDecimal(value)} ${normalized || unit}`.trim()
}

function buildEstimatedTotalText(value: number, unit: string, marginPercent = 10): string {
  const normalized = normalizeUnit(unit)
  const withMargin = value * (1 + marginPercent / 100)
  if (normalized === 'mL' || normalized === 'L') {
    const rounded = withMargin <= 5 ? Math.ceil(withMargin * 2) / 2 : withMargin <= 20 ? Math.ceil(withMargin) : Math.ceil(withMargin / 5) * 5
    return `${formatDecimal(rounded)} ${normalized}`
  }
  if (normalized === 'cápsula' || normalized === 'comprimido' || normalized === 'sachê' || normalized === 'unidade' || normalized === 'gota' || normalized === 'puff' || normalized === 'jato' || normalized === 'ato') {
    const rounded = Math.max(1, Math.ceil(withMargin))
    return `${formatDecimal(rounded, 0)} ${normalized}${rounded > 1 ? 's' : ''}`
  }
  return `${formatDecimal(withMargin)} ${normalized || unit}`.trim()
}

function isDiscreteAdministrationUnit(unit: string): boolean {
  const normalized = normalizeUnit(unit)
  return ['cápsula', 'comprimido', 'sachê', 'unidade', 'gota', 'puff', 'jato', 'ato'].includes(normalized)
}

function resolveQuantityMarginPercent(item: CompoundedPrescriptionItem): number {
  const explicit = toNumber((item.compounded_regimen_snapshot as { total_quantity_margin_percent?: unknown } | null)?.total_quantity_margin_percent)
  if (explicit != null && explicit >= 0) return explicit
  const metadataMargin = toNumber((item.compounded_snapshot as { metadata?: Record<string, unknown> | null })?.metadata?.total_quantity_margin_percent)
  if (metadataMargin != null && metadataMargin >= 0) return metadataMargin
  const form = normalizeText(item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form || '')
  if (form.includes('gel') || form.includes('pomada') || form.includes('creme') || form.includes('suspens') || form.includes('solucao') || form.includes('xarope')) return 20
  return 10
}

function resolveFinalQuantityText(
  item: CompoundedPrescriptionItem,
  suggestedText: string,
  fallbackText: string
): string {
  const manual = String(item.manualQuantity || '').trim()
  if (manual) return manual
  const applied = String(item.compounded_regimen_snapshot?.applied_quantity_text || '').trim()
  if (applied) return applied
  return suggestedText || fallbackText
}

function pickRangeDose(minValue: number, maxValue: number, strategy: ClinicalDoseSelectionStrategy): number {
  if (strategy === 'max') return maxValue
  if (strategy === 'mid') return minValue + (maxValue - minValue) / 2
  return minValue
}

function buildTierDoseText(tier: ClinicalWeightTierRule): string {
  const bound =
    tier.maxWeightKg != null
      ? `até ${formatDecimal(tier.maxWeightKg)} kg`
      : tier.minWeightKg != null
        ? `acima de ${formatDecimal(tier.minWeightKg)} kg`
        : 'faixa definida'
  return `${bound}: ${formatDecimal(tier.doseValue)} ${tier.doseUnit}`
}

function resolveClinicalRuleDose(
  rule: ClinicalIngredientDoseRule,
  weightKg: number | null,
  strategy: ClinicalDoseSelectionStrategy
): {
  value: number | null
  unit: string
  perAdministrationText: string
  rangeText?: string
  warning?: string
} {
  const minDose = rule.doseMin ?? null
  const maxDose = rule.doseMax ?? minDose
  const rangeText =
    minDose != null && maxDose != null && maxDose !== minDose
      ? `${formatDecimal(minDose)} a ${formatDecimal(maxDose)} ${rule.doseUnit}`
      : undefined

  if (rule.weightTiers?.length) {
    if (!weightKg || weightKg <= 0) {
      return {
        value: null,
        unit: rule.weightTiers[0]?.doseUnit || rule.doseUnit,
        perAdministrationText: '',
        rangeText: rule.weightTiers.map(buildTierDoseText).join(' • '),
        warning: 'Peso necessário para aplicar a faixa por peso deste ingrediente.',
      }
    }
    const matchedTier = rule.weightTiers.find((tier) => {
      if (tier.maxWeightKg != null && weightKg <= tier.maxWeightKg) return true
      if (tier.minWeightKg != null && weightKg > tier.minWeightKg) return true
      return false
    }) || rule.weightTiers[0]
    return {
      value: matchedTier?.doseValue || null,
      unit: matchedTier?.doseUnit || rule.doseUnit,
      perAdministrationText: matchedTier ? `${formatDecimal(matchedTier.doseValue)} ${matchedTier.doseUnit}` : '',
      rangeText: rule.weightTiers.map(buildTierDoseText).join(' • '),
    }
  }

  if (rule.kind === 'per_kg_per_dose' || rule.kind === 'per_kg_per_unit') {
    if (!weightKg || weightKg <= 0) {
      return {
        value: null,
        unit: rule.doseUnit,
        perAdministrationText: '',
        rangeText,
        warning: 'Peso necessário para calcular a dose deste ingrediente.',
      }
    }
    const chosenDose = minDose != null && maxDose != null ? pickRangeDose(minDose, maxDose, strategy) : minDose
    if (chosenDose == null) {
      return { value: null, unit: rule.doseUnit, perAdministrationText: '', rangeText, warning: 'Regra clínica sem dose definida.' }
    }
    const value = chosenDose * weightKg
    return {
      value,
      unit: rule.doseUnit,
      perAdministrationText: `${formatDecimal(value)} ${rule.doseUnit}`,
      rangeText,
    }
  }

  const chosenDose = minDose != null && maxDose != null ? pickRangeDose(minDose, maxDose, strategy) : minDose
  if (chosenDose == null) {
    return { value: null, unit: rule.doseUnit, perAdministrationText: '', rangeText, warning: 'Regra clínica sem dose definida.' }
  }
  return {
    value: chosenDose,
    unit: rule.doseUnit,
    perAdministrationText: `${formatDecimal(chosenDose)} ${rule.doseUnit}`,
    rangeText,
  }
}

export function getCompoundedActiveIngredients(snapshot?: CompoundedMedicationSnapshot | null): string[] {
  if (!snapshot?.ingredients?.length) return []
  return snapshot.ingredients
    .filter((entry) => entry.ingredient_name && entry.ingredient_role === 'active')
    .map((entry) => entry.ingredient_name.trim())
}

function inferRouteCandidatesFromForm(form?: string | null): string[] {
  const normalized = normalizeText(form || '')
  if (!normalized) return []
  if (normalized.includes('transderm')) return ['Transdermico']
  if (normalized.includes('colir') || normalized.includes('oft')) return ['Oftalmico']
  if (normalized.includes('otol')) return ['Otologico']
  if (normalized.includes('inal') || normalized.includes('spray')) return ['Inalatorio']
  if (normalized.includes('pomada') || normalized.includes('creme') || normalized.includes('locao') || normalized.includes('top')) return ['Topico']
  if (normalized.includes('caps') || normalized.includes('comprim') || normalized.includes('sache') || normalized.includes('xarope') || normalized.includes('solucao') || normalized.includes('suspens') || normalized.includes('pasta oral') || normalized.includes('biscoito')) return ['VO']
  return []
}

export function getCompoundedAllowedRouteValues(item: PrescriptionItem): string[] {
  if (!isCompounded(item)) return []
  const regimenRoute = normalizeRouteValue(item.compounded_regimen_snapshot?.route)
  if (regimenRoute) return [regimenRoute]
  const currentRoute = normalizeRouteValue(item.route)
  const defaultRoute = normalizeRouteValue(item.compounded_snapshot?.default_route || item.route)
  const formRoutes = inferRouteCandidatesFromForm(item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form)
  const candidates = [currentRoute, defaultRoute, ...formRoutes].filter(Boolean)
  return Array.from(new Set(candidates))
}

export function getCompoundedRouteOptions(
  item: PrescriptionItem,
  allOptions: ClinicalRouteOption[]
): ClinicalRouteOption[] {
  if (!isCompounded(item)) return allOptions
  const allowed = getCompoundedAllowedRouteValues(item)
  if (!allowed.length) return allOptions
  return allOptions.filter((option) => allowed.includes(option.value))
}

export function resolveCompoundedRoute(item: PrescriptionItem): string {
  if (!isCompounded(item)) return String(item.route || '').trim()
  const current = normalizeRouteValue(item.route)
  const allowed = getCompoundedAllowedRouteValues(item)
  if (!allowed.length) return current || normalizeRouteValue(item.compounded_snapshot?.default_route || '')
  if (current && allowed.includes(current)) return current
  return allowed[0]
}

export function getCompoundedCalculationSummary(
  item: PrescriptionItem,
  patient?: PatientInfo | null
): CompoundedCalculationSummary | null {
  if (!isCompounded(item)) return null

  if (isClinicalDoseOrientedItem(item)) {
    const regimen = getClinicalRegimen(item)
    const route = resolveCompoundedRoute(item)
    const routeLabel = routeToClinicalLabel(route)
    const weightKg = toNumber(patient?.weight_kg)
    const warnings: string[] = []
    const selectionStrategy = (regimen?.doseSelectionStrategy || 'min') as ClinicalDoseSelectionStrategy
    const administrationLabel = regimen?.administrationUnitLabel || 'dose'
    const ingredientBreakdown = (regimen?.ingredientRules || []).map((rule) => {
      const resolved = resolveClinicalRuleDose(rule, weightKg, selectionStrategy)
      if (resolved.warning) warnings.push(`${rule.ingredientName}: ${resolved.warning}`)
      return {
        ingredientName: rule.ingredientName,
        rawRuleText: rule.rawText,
        selectedDoseText: resolved.perAdministrationText || 'peso necessário',
        rangeText: resolved.rangeText,
        controlled: !!rule.isControlled,
      }
    })
    const frequency = getCompoundedFrequencySummary(item)
    const duration = getCompoundedDurationSummary(item)
    const dosesPerDay = dosesPerDayFromItem(item)
    const durationDays = getDurationDays(item)
    const quantityText =
      String(item.manualQuantity || '').trim() ||
      regimen?.totalQuantityText ||
      item.compounded_regimen_snapshot?.applied_quantity_text ||
      item.compounded_snapshot?.qsp_text ||
      item.compounded_snapshot?.quantity_text ||
      ''

    return {
      mode: 'weight_based',
      status: warnings.length ? 'missing_weight' : 'ok',
      weightKg,
      route,
      routeLabel,
      concentrationText: '',
      regimenLabel: regimen?.scenarioTitle || item.compounded_regimen_snapshot?.regimen_name || 'Regime clínico',
      doseDescriptorText: ingredientBreakdown.map((entry) => `${entry.ingredientName}: ${entry.selectedDoseText}`).join(' • '),
      perAdministrationValue: 1,
      perAdministrationUnit: administrationLabel,
      perAdministrationText: administrationLabel === 'dose' ? '1 dose' : `1 ${administrationLabel}`,
      calculatedTotalValue: dosesPerDay && durationDays ? dosesPerDay * durationDays : null,
      calculatedTotalUnit: administrationLabel,
      calculatedTotalText: dosesPerDay && durationDays ? `${formatDecimal(dosesPerDay * durationDays, 0)} ${administrationLabel}${dosesPerDay * durationDays > 1 ? 's' : ''}` : '',
      estimatedTotalValue: null,
      estimatedTotalUnit: '',
      estimatedTotalText: quantityText,
      finalQuantityText: quantityText,
      ingredientBreakdown,
      administrationLabelText: administrationLabel,
      selectionStrategy,
      warnings,
    }
  }

  const regimen = item.compounded_regimen_snapshot
  const mode = getCalculationMode(regimen)
  const route = resolveCompoundedRoute(item)
  const routeLabel = routeToClinicalLabel(route)
  const weightKg = toNumber(patient?.weight_kg)
  const concentrationText = buildCompoundedConcentrationLine(regimen, item)
  const regimenLabel = regimen?.regimen_name || (mode === 'weight_based' ? 'Calculado pelo peso' : 'Dose fixa do regime')
  const warnings: string[] = []

  const fallbackQuantityText =
    item.compounded_snapshot?.qsp_text ||
    item.compounded_snapshot?.quantity_text ||
    ''
  const fixedText = String(item.dose || regimen?.applied_dose_text || regimen?.fixed_administration_value && regimen?.fixed_administration_unit ? `${regimen.fixed_administration_value} ${regimen.fixed_administration_unit}` : '').trim()

  if (mode === 'fixed_per_animal') {
    const finalQuantityText = resolveFinalQuantityText(item, '', fallbackQuantityText)
    return {
      mode,
      status: 'fixed',
      weightKg,
      route,
      routeLabel,
      concentrationText,
      regimenLabel,
      doseDescriptorText: fixedText || 'Dose fixa do regime',
      perAdministrationValue: toNumber(fixedText.split(' ')[0]),
      perAdministrationUnit: fixedText.split(' ').slice(1).join(' '),
      perAdministrationText: fixedText,
      calculatedTotalValue: null,
      calculatedTotalUnit: '',
      calculatedTotalText: '',
      estimatedTotalValue: null,
      estimatedTotalUnit: '',
      estimatedTotalText: '',
      finalQuantityText,
      warnings,
    }
  }

  const doseValue = toNumber(regimen?.dose_min)
  const doseUnit = String(regimen?.dose_unit || '').trim()
  const perWeightUnit = String(regimen?.per_weight_unit || 'kg').trim() || 'kg'
  if (!doseValue || !doseUnit) {
    return {
      mode,
      status: 'missing_dose',
      weightKg,
      route,
      routeLabel,
      concentrationText,
      regimenLabel,
      doseDescriptorText: '',
      perAdministrationValue: null,
      perAdministrationUnit: '',
      perAdministrationText: '',
      calculatedTotalValue: null,
      calculatedTotalUnit: '',
      calculatedTotalText: '',
      estimatedTotalValue: null,
      estimatedTotalUnit: '',
      estimatedTotalText: '',
      finalQuantityText: resolveFinalQuantityText(item, '', fallbackQuantityText),
      warnings: ['Dose por peso incompleta no regime.'],
    }
  }

  if (!weightKg || weightKg <= 0) {
    return {
      mode,
      status: 'missing_weight',
      weightKg,
      route,
      routeLabel,
      concentrationText,
      regimenLabel,
      doseDescriptorText: `${formatDecimal(doseValue)} ${doseUnit}/${perWeightUnit}`.trim(),
      perAdministrationValue: null,
      perAdministrationUnit: '',
      perAdministrationText: '',
      calculatedTotalValue: null,
      calculatedTotalUnit: '',
      calculatedTotalText: '',
      estimatedTotalValue: null,
      estimatedTotalUnit: '',
      estimatedTotalText: '',
      finalQuantityText: resolveFinalQuantityText(item, '', fallbackQuantityText),
      warnings: ['Peso necessário para cálculo da dose final.'],
    }
  }

  const dosePerAdmin = doseValue * weightKg
  const normalizedDoseUnit = normalizeUnit(doseUnit)

  if (normalizedDoseUnit === 'mL' || normalizedDoseUnit === 'gota' || normalizedDoseUnit === 'cápsula' || normalizedDoseUnit === 'comprimido' || normalizedDoseUnit === 'puff' || normalizedDoseUnit === 'jato' || normalizedDoseUnit === 'ato' || normalizedDoseUnit === 'unidade') {
    const dosesPerDay = dosesPerDayFromItem(item)
    const durationDays = getDurationDays(item)
    const calculatedTotalValue = dosesPerDay && durationDays ? dosePerAdmin * dosesPerDay * durationDays : null
    const marginPercent = resolveQuantityMarginPercent(item)
    const estimatedTotalText = calculatedTotalValue ? buildEstimatedTotalText(calculatedTotalValue, normalizedDoseUnit, marginPercent) : ''
    const calculatedTotalText = calculatedTotalValue ? `${formatAdministrationAmount(calculatedTotalValue, normalizedDoseUnit)}` : ''
    if (isDiscreteAdministrationUnit(normalizedDoseUnit)) {
      const rounded = Math.round(dosePerAdmin)
      if (Math.abs(dosePerAdmin - rounded) > 0.001) {
        warnings.push(`Dose impraticável para ${normalizedDoseUnit}: ${formatDecimal(dosePerAdmin)} ${normalizedDoseUnit}. Ajuste a concentração ou a formulação.`)
        return {
          mode,
          status: 'impractical',
          weightKg,
          route,
          routeLabel,
          concentrationText,
          regimenLabel,
          doseDescriptorText: `${formatDecimal(doseValue)} ${normalizedDoseUnit}/${perWeightUnit}`.trim(),
          perAdministrationValue: dosePerAdmin,
          perAdministrationUnit: normalizedDoseUnit,
          perAdministrationText: formatAdministrationAmount(dosePerAdmin, normalizedDoseUnit),
          calculatedTotalValue,
          calculatedTotalUnit: normalizedDoseUnit,
          calculatedTotalText,
          estimatedTotalValue: calculatedTotalValue,
          estimatedTotalUnit: normalizedDoseUnit,
          estimatedTotalText,
          finalQuantityText: resolveFinalQuantityText(item, estimatedTotalText, fallbackQuantityText),
          warnings,
        }
      }
    }
    if ((normalizedDoseUnit === 'mL' || normalizedDoseUnit === 'L') && dosePerAdmin < 0.1) {
      warnings.push(`Volume muito pequeno por administração (${formatDecimal(dosePerAdmin)} ${normalizedDoseUnit}). Considere diluição ou concentração diferente.`)
    }
    return {
      mode,
      status: 'ok',
      weightKg,
      route,
      routeLabel,
      concentrationText,
      regimenLabel,
      doseDescriptorText: `${formatDecimal(doseValue)} ${normalizedDoseUnit}/${perWeightUnit}`.trim(),
      perAdministrationValue: dosePerAdmin,
      perAdministrationUnit: normalizedDoseUnit,
      perAdministrationText: formatAdministrationAmount(dosePerAdmin, normalizedDoseUnit),
      calculatedTotalValue,
      calculatedTotalUnit: normalizedDoseUnit,
      calculatedTotalText,
      estimatedTotalValue: calculatedTotalValue,
      estimatedTotalUnit: normalizedDoseUnit,
      estimatedTotalText,
      finalQuantityText: resolveFinalQuantityText(item, estimatedTotalText, fallbackQuantityText),
      warnings,
    }
  }

  const concentrationValue = toNumber(regimen?.concentration_value)
  if (!concentrationValue || !regimen?.concentration_unit) {
    return {
      mode,
      status: 'missing_concentration',
      weightKg,
      route,
      routeLabel,
      concentrationText,
      regimenLabel,
      doseDescriptorText: `${formatDecimal(doseValue)} ${doseUnit}/${perWeightUnit}`.trim(),
      perAdministrationValue: null,
      perAdministrationUnit: '',
      perAdministrationText: '',
      calculatedTotalValue: null,
      calculatedTotalUnit: '',
      calculatedTotalText: '',
      estimatedTotalValue: null,
      estimatedTotalUnit: '',
      estimatedTotalText: '',
      finalQuantityText: resolveFinalQuantityText(item, '', fallbackQuantityText),
      warnings: ['Concentração final necessária para calcular a dose administrada.'],
    }
  }

  const doseBase = convertUnitValue(dosePerAdmin, doseUnit)
  const concentrationBase = convertUnitValue(concentrationValue, regimen.concentration_unit)
  const administrationUnit = String(regimen.concentration_per_unit || regimen.fixed_administration_unit || 'mL').trim() || 'mL'
  const concentrationPerValue = toNumber(regimen.concentration_per_value) || 1

  if (!doseBase || !concentrationBase || doseBase.family !== concentrationBase.family) {
    return {
      mode,
      status: 'incompatible_units',
      weightKg,
      route,
      routeLabel,
      concentrationText,
      regimenLabel,
      doseDescriptorText: `${formatDecimal(doseValue)} ${doseUnit}/${perWeightUnit}`.trim(),
      perAdministrationValue: null,
      perAdministrationUnit: administrationUnit,
      perAdministrationText: '',
      calculatedTotalValue: null,
      calculatedTotalUnit: '',
      calculatedTotalText: '',
      estimatedTotalValue: null,
      estimatedTotalUnit: '',
      estimatedTotalText: '',
      finalQuantityText: resolveFinalQuantityText(item, '', fallbackQuantityText),
      warnings: ['Dose e concentração estão em unidades incompatíveis para cálculo automático.'],
    }
  }

  const perAdministrationValue = (doseBase.value / concentrationBase.value) * concentrationPerValue
  const dosesPerDay = dosesPerDayFromItem(item)
  const durationDays = getDurationDays(item)
  const normalizedAdministrationUnit = normalizeUnit(administrationUnit)
  const calculatedTotalValue = dosesPerDay && durationDays ? perAdministrationValue * dosesPerDay * durationDays : null
  const marginPercent = resolveQuantityMarginPercent(item)
  const estimatedTotalText = calculatedTotalValue ? buildEstimatedTotalText(calculatedTotalValue, normalizedAdministrationUnit, marginPercent) : ''
  const calculatedTotalText = calculatedTotalValue ? formatAdministrationAmount(calculatedTotalValue, normalizedAdministrationUnit) : ''
  let status: CalculationStatus = 'ok'
  if ((normalizedAdministrationUnit === 'cápsula' || normalizedAdministrationUnit === 'comprimido' || normalizedAdministrationUnit === 'sachê') && Math.abs(perAdministrationValue - Math.round(perAdministrationValue)) > 0.001) {
    warnings.push(`Dose impraticável para ${normalizedAdministrationUnit}: ${formatDecimal(perAdministrationValue)} ${normalizedAdministrationUnit}. Ajuste a concentração ou a formulação.`)
    status = 'impractical'
  }
  if ((normalizedAdministrationUnit === 'mL' || normalizedAdministrationUnit === 'L') && perAdministrationValue < 0.1) {
    warnings.push(`Volume muito pequeno por administração (${formatDecimal(perAdministrationValue)} ${normalizedAdministrationUnit}). Considere diluição ou concentração diferente.`)
    status = 'impractical'
  }

  return {
    mode,
    status,
    weightKg,
    route,
    routeLabel,
    concentrationText,
    regimenLabel,
    doseDescriptorText: `${formatDecimal(doseValue)} ${doseUnit}/${perWeightUnit}`.trim(),
    perAdministrationValue,
    perAdministrationUnit: administrationUnit,
    perAdministrationText: formatAdministrationAmount(perAdministrationValue, administrationUnit),
    calculatedTotalValue,
    calculatedTotalUnit: normalizedAdministrationUnit,
    calculatedTotalText,
    estimatedTotalValue: calculatedTotalValue,
    estimatedTotalUnit: normalizedAdministrationUnit,
    estimatedTotalText,
    finalQuantityText: resolveFinalQuantityText(item, estimatedTotalText, fallbackQuantityText),
    warnings,
  }
}

function getOwnerGuidance(item: CompoundedPrescriptionItem): string {
  return String(item.cautionsText || item.compounded_regimen_snapshot?.default_administration_sig || '').trim()
}

function getPharmacyExtraGuidance(item: CompoundedPrescriptionItem): string {
  return String(item.compounded_pharmacy_guidance || item.compounded_snapshot?.manipulation_instructions || item.compounded_regimen_snapshot?.default_prepared_quantity_text || '').trim()
}

export function getCompoundedInternalNote(item: PrescriptionItem): string {
  if (!isCompounded(item)) return ''
  return String(item.compounded_internal_note || item.compounded_regimen_snapshot?.notes || '').trim()
}

export function buildCompoundedCardSubtitle(item: PrescriptionItem, patient?: PatientInfo | null): string {
  if (!isCompounded(item)) return ''
  const clinicalRegimen = isClinicalDoseOrientedItem(item) ? getClinicalRegimen(item) : null
  const regimen = item.compounded_regimen_snapshot
  const concentration = buildCompoundedConcentrationLine(regimen, item)
  const calculation = getCompoundedCalculationSummary(item, patient)
  const quantityOrQsp =
    calculation?.finalQuantityText ||
    item.compounded_snapshot?.qsp_text ||
    item.compounded_snapshot?.quantity_text ||
    (calculation?.estimatedTotalText ? `Quantidade sugerida ${calculation.estimatedTotalText}` : '')

  return [
    clinicalRegimen?.pharmaceuticalForm || item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form || '',
    clinicalRegimen ? '' : concentration,
    quantityOrQsp,
    item.compounded_snapshot?.vehicle ? `Veículo ${item.compounded_snapshot.vehicle}` : '',
    item.compounded_snapshot?.flavor ? `Sabor ${item.compounded_snapshot.flavor}` : '',
  ].filter(Boolean).join(' • ')
}

export function buildCompoundedInstruction(item: PrescriptionItem, patient?: PatientInfo | null): string {
  if (!isCompounded(item)) return String(item.instructions || '').trim()
  if (isClinicalDoseOrientedItem(item)) {
    const calculation = getCompoundedCalculationSummary(item, patient)
    const route = routeToClinicalLabel(resolveCompoundedRoute(item))
    const frequency = getCompoundedFrequencySummary(item)
    const duration = getCompoundedDurationSummary(item)
    const administration = calculation?.perAdministrationText || item.dose || '1 dose'
    if (!patient?.weight_kg && (calculation?.warnings || []).length) {
      return 'Posologia: peso necessário para confirmar a dose clínica deste paciente.'
    }
    return [
      `Posologia: Administrar ${administration}`,
      route,
      frequency,
      duration ? `por ${duration}` : '',
    ].filter(Boolean).join(', ').replace(/\s+/g, ' ').trim() + '.'
  }

  const calculation = getCompoundedCalculationSummary(item, patient)
  const route = routeToClinicalLabel(resolveCompoundedRoute(item))
  const frequency = getCompoundedFrequencySummary(item)
  const duration = getCompoundedDurationSummary(item)
  const verb = routeVerb(resolveCompoundedRoute(item))

  if (calculation?.mode === 'weight_based' && calculation.status !== 'ok') {
    if (calculation.status === 'missing_weight') return 'Posologia: peso necessário para cálculo da dose final.'
    if (calculation.status === 'missing_concentration') return 'Posologia: concentração final necessária para calcular a dose administrada.'
    if (calculation.status === 'incompatible_units') return 'Posologia: revisar dose e concentração para cálculo automático.'
    if (calculation.status === 'missing_dose') return 'Posologia: dose do regime incompleta.'
  }

  const administration = String(
    calculation?.perAdministrationText ||
    item.dose ||
    item.compounded_regimen_snapshot?.applied_dose_text ||
    ''
  ).trim()

  if (!administration) {
    return 'Posologia: dose final ainda não definida.'
  }

  return [
    `Posologia: ${verb} ${administration}`,
    route,
    frequency,
    duration ? `por ${duration}` : '',
  ].filter(Boolean).join(', ').replace(/\s+/g, ' ').trim() + '.'
}

export function buildCompoundedPharmacyInstruction(item: PrescriptionItem, patient?: PatientInfo | null): string {
  if (!isCompounded(item)) return ''
  if (isClinicalDoseOrientedItem(item)) {
    const regimen = getClinicalRegimen(item)
    const calculation = getCompoundedCalculationSummary(item, patient)
    const strategy = regimen?.pharmacyStrategy || 'dose_base_per_administration'
    const baseLabel =
      strategy === 'dose_base_1ml'
        ? 'cada 1 mL'
        : strategy === 'dose_base_1unit'
          ? `cada 1 ${regimen?.administrationUnitLabel || 'unidade'}`
          : 'por dose do paciente'
    const ingredientsText = (calculation?.ingredientBreakdown || [])
      .map((entry) => `${entry.ingredientName} ${entry.selectedDoseText}`)
      .join(', ')
    const quantity = calculation?.finalQuantityText || regimen?.totalQuantityText || item.compounded_snapshot?.qsp_text || item.compounded_snapshot?.quantity_text || ''
    const parts = [
      `Manipulação: Favor manipular ${regimen?.pharmaceuticalForm || item.compounded_snapshot.pharmaceutical_form}`,
      quantity ? `q.s.p. ${quantity}` : '',
      ingredientsText ? `contendo, ${baseLabel}, ${ingredientsText}` : '',
      item.compounded_snapshot?.vehicle ? `veículo ${item.compounded_snapshot.vehicle}` : '',
      regimen?.ownerInstruction ? `posologia prevista: ${regimen.ownerInstruction}` : '',
    ].filter(Boolean)
    return `${parts.join(', ')}.`
  }
  const calculation = getCompoundedCalculationSummary(item, patient)
  const concentration = calculation?.concentrationText || buildCompoundedConcentrationLine(item.compounded_regimen_snapshot, item)
  const quantity = calculation?.finalQuantityText || item.compounded_snapshot?.qsp_text || item.compounded_snapshot?.quantity_text || (calculation?.estimatedTotalText ? `q.s.p. ${calculation.estimatedTotalText}` : '')
  const details = [
    item.compounded_snapshot?.pharmaceutical_form || item.pharmaceutical_form || '',
    concentration ? `na concentração de ${concentration}` : '',
    quantity,
    item.compounded_snapshot?.vehicle ? `veículo ${item.compounded_snapshot.vehicle}` : '',
    item.compounded_snapshot?.flavor ? `sabor ${item.compounded_snapshot.flavor}` : '',
  ].filter(Boolean)

  const extra = getPharmacyExtraGuidance(item)
  const base = [`Manipulação: Favor manipular ${item.name}`]
  if (details.length) base.push(details.join(', '))
  let text = base.join(', ').replace(/\s+/g, ' ').trim()
  if (!text.endsWith('.')) text += '.'
  if (extra) {
    const cleanedExtra = extra.replace(/^manipula[cç][aã]o:\s*/i, '').trim()
    text += ` ${cleanedExtra.endsWith('.') ? cleanedExtra : `${cleanedExtra}.`}`
  }
  return text.trim()
}

export function buildCompoundedPreviewCautions(item: PrescriptionItem, patient?: PatientInfo | null): string[] {
  if (!isCompounded(item)) return []
  const ownerGuidance = getOwnerGuidance(item)
  const lines = [
    ownerGuidance ? `Orientações ao tutor: ${ownerGuidance}` : '',
    buildCompoundedPharmacyInstruction(item, patient),
  ].filter(Boolean)

  const unique = new Set<string>()
  return lines.filter((line) => {
    const key = normalizeText(line)
    if (!key || unique.has(key)) return false
    unique.add(key)
    return true
  })
}

export function buildCompoundedRegimenSummary(item: PrescriptionItem, patient?: PatientInfo | null): string {
  if (!isCompounded(item)) return ''
  const calculation = getCompoundedCalculationSummary(item, patient)
  if (!calculation) return ''
  if (isClinicalDoseOrientedItem(item)) {
    const pieces = ['Template magistral orientado por dose clínica']
    if (calculation.weightKg) pieces.push(`Peso usado ${formatDecimal(calculation.weightKg)} kg`)
    if (calculation.selectionStrategy === 'min') pieces.push('Faixas usando dose mínima')
    if (calculation.selectionStrategy === 'mid') pieces.push('Faixas usando ponto médio')
    if (calculation.selectionStrategy === 'max') pieces.push('Faixas usando dose máxima')
    if (calculation.finalQuantityText) pieces.push(`Quantidade total ${calculation.finalQuantityText}`)
    return pieces.join(' • ')
  }
  const modeLabel = calculation.mode === 'weight_based' ? 'Calculado pelo peso do paciente' : 'Dose fixa do regime'
  const pieces = [modeLabel]
  if (calculation.weightKg) pieces.push(`Peso usado ${formatDecimal(calculation.weightKg)} kg`)
  if (calculation.perAdministrationText) pieces.push(`Dose por administração ${calculation.perAdministrationText}`)
  if (calculation.calculatedTotalText) pieces.push(`Total calculado ${calculation.calculatedTotalText}`)
  if (calculation.estimatedTotalText) pieces.push(`Quantidade sugerida ${calculation.estimatedTotalText}`)
  return pieces.join(' • ')
}

export function getCompoundedCalculationWarnings(item: PrescriptionItem, patient?: PatientInfo | null): string[] {
  if (!isCompounded(item)) return []
  return getCompoundedCalculationSummary(item, patient)?.warnings || []
}
