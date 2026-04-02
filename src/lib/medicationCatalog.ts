import globalCatalogJson from '../data/globalMedicationCatalog.json'

export type CatalogSource = 'clinic' | 'global'
export type CatalogScope = 'clinic' | 'global'
export type AdministrationMode =
  | 'tablet'
  | 'capsule'
  | 'liquid_oral'
  | 'drops'
  | 'actuation'
  | 'unit'
  | 'topical_manual'

export interface DoseEngineMetadata extends Record<string, unknown> {
  administration_mode?: AdministrationMode
  allow_split?: boolean
  split_increment?: number
  scored?: boolean
  modified_release?: boolean
  enteric_coated?: boolean
  whole_unit_only?: boolean
  can_open_and_disperse?: boolean
  drops_per_ml?: number
  dose_per_actuation?: number
  dose_per_actuation_unit?: string
  actuation_label?: string
  round_ml_to?: number
}

export interface MedicationPresentationMetadata extends Record<string, unknown> {
  manufacturer?: string
  administration_routes?: string[]
  obs?: string
  dose_engine?: DoseEngineMetadata
  administration_mode?: AdministrationMode
  allow_split?: boolean
  split_increment?: number
  scored?: boolean
  modified_release?: boolean
  enteric_coated?: boolean
  whole_unit_only?: boolean
  can_open_and_disperse?: boolean
  drops_per_ml?: number
  dose_per_actuation?: number
  dose_per_actuation_unit?: string
  actuation_label?: string
  round_ml_to?: number
}

export interface CanonicalMedicationPresentation {
  id?: string
  slug: string
  pharmaceutical_form?: string | null
  concentration_text?: string | null
  additional_component?: string | null
  presentation_unit?: string | null
  commercial_name?: string | null
  value?: number | null
  value_unit?: string | null
  per_value?: number | null
  per_unit?: string | null
  package_quantity?: number | null
  package_unit?: string | null
  avg_price_brl?: number | null
  pharmacy_veterinary?: boolean
  pharmacy_human?: boolean
  pharmacy_compounding?: boolean
  metadata?: MedicationPresentationMetadata | null
}

export interface CanonicalRecommendedDose {
  id?: string
  slug?: string
  species: string
  route: string
  dose_value: number
  dose_max?: number | null
  dose_unit: string
  per_weight_unit?: string | null
  indication?: string | null
  frequency?: string | null
  frequency_min?: number | null
  frequency_max?: number | null
  frequency_mode?: string | null
  frequency_text?: string | null
  duration?: string | null
  calculator_default_dose?: number | null
  calculator_default_frequency?: number | null
  notes?: string | null
  metadata?: Record<string, unknown> | null
}

export interface CanonicalMedication {
  id?: string
  slug: string
  name: string
  active_ingredient?: string | null
  is_controlled?: boolean
  is_active?: boolean
  species?: string[] | null
  routes?: string[] | null
  notes?: string | null
  tags?: string[] | null
  metadata?: Record<string, unknown> | null
  presentations?: CanonicalMedicationPresentation[]
  recommended_doses?: CanonicalRecommendedDose[]
}

export interface MedicationCatalogBundle {
  schema_version: number
  catalog_scope: CatalogScope
  source?: string | null
  generated_at?: string | null
  medications: CanonicalMedication[]
}

interface PresentationShape {
  concentration_text?: unknown
  value?: unknown
  value_unit?: unknown
  per_value?: unknown
  per_unit?: unknown
  metadata?: Record<string, unknown> | null
}

export type MergeableCatalogSearchEntry = {
  id: string
  name?: string | null
  metadata?: Record<string, unknown> | null
}

type ValidationResult<T> = {
  valid: boolean
  errors: string[]
  data: T
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

/** Resolve first non-undefined value from multiple possible JSON key aliases (camelCase + snake_case) */
function resolveAlias(input: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    if (input[k] !== undefined) return input[k]
  }
  return undefined
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim()
    if (!normalized) return null
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function toBooleanOrUndefined(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (normalized === 'true') return true
    if (normalized === 'false') return false
  }
  return undefined
}

function safeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function safeStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.map((entry) => safeString(entry)).filter(Boolean)
    : []
}

function normalizeAdministrationMode(value: unknown): AdministrationMode | undefined {
  const normalized = safeString(value) as AdministrationMode
  if (!normalized) return undefined
  if ([
    'tablet',
    'capsule',
    'liquid_oral',
    'drops',
    'actuation',
    'unit',
    'topical_manual',
  ].includes(normalized)) {
    return normalized
  }
  return undefined
}

function formatNumberLabel(value: number): string {
  return String(value).replace('.', ',')
}

function normalizeRecommendedDoseSlug(value: string): string {
  return normalizeCatalogKey(value)
}

export function normalizeCatalogKey(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function makeGlobalMedicationId(slug: string): string {
  return `global:${normalizeCatalogKey(slug)}`
}

export function isGlobalMedicationId(value?: string | null): boolean {
  return String(value || '').startsWith('global:')
}

export function parseGlobalMedicationId(value?: string | null): string {
  return String(value || '').replace(/^global:/, '').trim()
}

export function getPresentationMetadata(input?: { metadata?: Record<string, unknown> | null } | null): MedicationPresentationMetadata {
  return (isObject(input?.metadata) ? input?.metadata : {}) as MedicationPresentationMetadata
}

export function getDoseEngineMetadata(input?: { metadata?: Record<string, unknown> | null } | null): DoseEngineMetadata {
  const metadata = getPresentationMetadata(input)
  const nested = isObject(metadata.dose_engine) ? metadata.dose_engine : {}
  return {
    ...nested,
    administration_mode: normalizeAdministrationMode(nested.administration_mode ?? metadata.administration_mode),
    allow_split: toBooleanOrUndefined(nested.allow_split ?? metadata.allow_split),
    split_increment: toNumberOrNull(nested.split_increment ?? metadata.split_increment) ?? undefined,
    scored: toBooleanOrUndefined(nested.scored ?? metadata.scored),
    modified_release: toBooleanOrUndefined(nested.modified_release ?? metadata.modified_release),
    enteric_coated: toBooleanOrUndefined(nested.enteric_coated ?? metadata.enteric_coated),
    whole_unit_only: toBooleanOrUndefined(nested.whole_unit_only ?? metadata.whole_unit_only),
    can_open_and_disperse: toBooleanOrUndefined(nested.can_open_and_disperse ?? metadata.can_open_and_disperse),
    drops_per_ml: toNumberOrNull(nested.drops_per_ml ?? metadata.drops_per_ml) ?? undefined,
    dose_per_actuation: toNumberOrNull(nested.dose_per_actuation ?? metadata.dose_per_actuation) ?? undefined,
    dose_per_actuation_unit: safeString(nested.dose_per_actuation_unit ?? metadata.dose_per_actuation_unit) || undefined,
    actuation_label: safeString(nested.actuation_label ?? metadata.actuation_label) || undefined,
    round_ml_to: toNumberOrNull(nested.round_ml_to ?? metadata.round_ml_to) ?? undefined,
  }
}

export function getPresentationFlag(
  input: { metadata?: Record<string, unknown> | null } | null | undefined,
  key:
    | 'allow_split'
    | 'scored'
    | 'modified_release'
    | 'enteric_coated'
    | 'whole_unit_only'
    | 'can_open_and_disperse'
): boolean {
  return !!getDoseEngineMetadata(input)[key]
}

export function getPresentationNumber(
  input: { metadata?: Record<string, unknown> | null } | null | undefined,
  key: 'split_increment' | 'drops_per_ml' | 'dose_per_actuation' | 'round_ml_to'
): number | null {
  return toNumberOrNull(getDoseEngineMetadata(input)[key])
}

export function getPresentationString(
  input: { metadata?: Record<string, unknown> | null } | null | undefined,
  key: 'administration_mode' | 'dose_per_actuation_unit' | 'actuation_label'
): string {
  return safeString(getDoseEngineMetadata(input)[key])
}

export function buildConcentrationLabel(input?: PresentationShape | null): string {
  const fallback = safeString(input?.concentration_text)
  const value = toNumberOrNull(input?.value)
  const valueUnit = safeString(input?.value_unit)
  const perValue = toNumberOrNull(input?.per_value)
  const perUnit = safeString(input?.per_unit)

  if (value !== null && value > 0 && valueUnit) {
    const base = `${formatNumberLabel(value)} ${valueUnit}`
    if (perUnit) {
      const divisor = perValue !== null && perValue > 0 && perValue !== 1
        ? `${formatNumberLabel(perValue)} ${perUnit}`
        : perUnit
      return `${base}/${divisor}`.trim()
    }
    return base
  }

  return fallback
}

export const buildPresentationConcentrationText = buildConcentrationLabel

export function buildMedicationDisplayName(params: {
  name: string
  commercialName?: string | null
  concentrationText?: string | null
}): string {
  const name = safeString(params.name)
  const commercialName = safeString(params.commercialName)
  const concentrationText = safeString(params.concentrationText)
  if (!name) return ''
  // Quando há nome comercial, ele vai primeiro na receita (o que o tutor lê no balcão da farmácia)
  if (commercialName && concentrationText) return `${commercialName} ${concentrationText}`
  if (commercialName) return `${commercialName} (${name})`
  if (concentrationText) return `${name} ${concentrationText}`
  return name
}

export function mergeCatalogSearchResults<T extends MergeableCatalogSearchEntry>(results: T[], limit: number): T[] {
  const seen = new Set<string>()
  const deduped: T[] = []
  for (const entry of results) {
    const key = normalizeCatalogKey(String(entry.metadata?.global_slug || entry.name || entry.id))
    if (!key || seen.has(key)) continue
    seen.add(key)
    deduped.push(entry)
    if (deduped.length >= limit) break
  }
  return deduped
}

function resolvePharmacyFlags(input: Record<string, unknown>): { pharmacy_veterinary: boolean; pharmacy_human: boolean; pharmacy_compounding: boolean } {
  // Handle pharmacy_type enum from JSON: 'veterinary'|'human'|'compounding'
  const pharmacyType = safeString(resolveAlias(input, 'pharmacy_type', 'pharmacyType')).toLowerCase()
  if (pharmacyType) {
    return {
      pharmacy_veterinary: pharmacyType === 'veterinary' || pharmacyType === 'vet',
      pharmacy_human: pharmacyType === 'human' || pharmacyType === 'humana',
      pharmacy_compounding: pharmacyType === 'compounding' || pharmacyType === 'manipulacao',
    }
  }
  return {
    pharmacy_veterinary: input.pharmacy_veterinary !== false,
    pharmacy_human: !!input.pharmacy_human,
    pharmacy_compounding: !!input.pharmacy_compounding,
  }
}

function normalizePresentation(raw: unknown, medicationSlug: string, fallbackIndex: number): CanonicalMedicationPresentation {
  const input = isObject(raw) ? raw : {}
  const slug = normalizeCatalogKey(safeString(input.slug) || safeString(input.id) || `${medicationSlug}-presentation-${fallbackIndex + 1}`)
  const pharmaceuticalForm = safeString(resolveAlias(input, 'pharmaceutical_form', 'pharmaceuticalForm')) || null
  const commercialName = safeString(resolveAlias(input, 'commercial_name', 'commercialName')) || null
  const additionalComponent = safeString(resolveAlias(input, 'additional_component', 'additionalComponent')) || null
  const presentationUnit = safeString(resolveAlias(input, 'presentation_unit', 'presentationUnit')) || null
  const concentrationText = safeString(resolveAlias(input, 'concentration_text', 'concentrationText')) || null
  const rawValue = toNumberOrNull(resolveAlias(input, 'value', 'concentration_value', 'concentrationValue'))
  const rawValueUnit = safeString(resolveAlias(input, 'value_unit', 'concentration_unit', 'concentrationUnit')) || null
  const rawPerValue = toNumberOrNull(resolveAlias(input, 'per_value', 'quantity_per_unit', 'quantityPerUnit'))
  const rawPerUnit = safeString(resolveAlias(input, 'per_unit', 'perUnit')) || null
  const packageQuantity = toNumberOrNull(resolveAlias(input, 'package_quantity', 'packageQuantity'))
  const packageUnit = safeString(resolveAlias(input, 'package_unit', 'packageUnit')) || null
  const avgPrice = toNumberOrNull(resolveAlias(input, 'avg_price_brl', 'avgPriceBrl'))
  const pharmacyFlags = resolvePharmacyFlags(input)
  const rawMetadata = isObject(input.metadata) ? input.metadata : {}
  // Also accept top-level manufacturer/summary
  const manufacturer = safeString(resolveAlias(input, 'manufacturer') ?? rawMetadata.manufacturer)
  const summary = safeString(resolveAlias(input, 'summary'))

  // Auto-build concentration_text from structured fields if missing
  let finalConcentrationText = concentrationText
  if (!finalConcentrationText && rawValue !== null && rawValue > 0 && rawValueUnit) {
    const perPart = rawPerUnit ? `/${rawPerValue && rawPerValue > 1 ? `${rawPerValue} ` : ''}${rawPerUnit}` : ''
    finalConcentrationText = `${rawValue} ${rawValueUnit}${perPart}`
  }

  return {
    id: safeString(input.id) || undefined,
    slug,
    pharmaceutical_form: pharmaceuticalForm,
    concentration_text: finalConcentrationText,
    additional_component: additionalComponent,
    presentation_unit: presentationUnit,
    commercial_name: commercialName,
    value: rawValue,
    value_unit: rawValueUnit,
    per_value: rawPerValue,
    per_unit: rawPerUnit,
    package_quantity: packageQuantity,
    package_unit: packageUnit,
    avg_price_brl: avgPrice,
    ...pharmacyFlags,
    metadata: {
      ...getPresentationMetadata({ metadata: rawMetadata }),
      dose_engine: getDoseEngineMetadata({ metadata: rawMetadata }),
      manufacturer: manufacturer || undefined,
      summary: summary || undefined,
    },
  }
}

function normalizeRecommendedDose(raw: unknown, medicationSlug: string, fallbackIndex: number): CanonicalRecommendedDose | null {
  const input = isObject(raw) ? raw : {}
  const species = safeString(resolveAlias(input, 'species'))
  const route = safeString(resolveAlias(input, 'route'))
  // Dose: support dose_value, doseMin/dose_min (as min), doseMax/dose_max
  const doseValue = toNumberOrNull(resolveAlias(input, 'dose_value', 'doseValue', 'dose_min', 'doseMin'))
  const doseMax = toNumberOrNull(resolveAlias(input, 'dose_max', 'doseMax'))
  const doseUnit = safeString(resolveAlias(input, 'dose_unit', 'doseUnit'))
  const perWeightUnit = safeString(resolveAlias(input, 'per_weight_unit', 'perWeightUnit')) || null
  if (!species || !route || doseValue === null || !doseUnit) return null
  const slugBase = safeString(input.slug) || `${medicationSlug}-${species}-${route}-${fallbackIndex + 1}`
  // Frequency: support ranges and structured modes
  const frequencyMin = toNumberOrNull(resolveAlias(input, 'frequency_min', 'frequencyMin'))
  const frequencyMax = toNumberOrNull(resolveAlias(input, 'frequency_max', 'frequencyMax'))
  const frequencyMode = safeString(resolveAlias(input, 'frequency_mode', 'frequencyMode')) || null
  const frequencyText = safeString(resolveAlias(input, 'frequency_text', 'frequencyText')) || null
  const frequency = safeString(resolveAlias(input, 'frequency')) || frequencyText || null
  // Clinical fields
  const indication = safeString(resolveAlias(input, 'indication')) || null
  const duration = safeString(resolveAlias(input, 'duration')) || null
  const calculatorDefaultDose = toNumberOrNull(resolveAlias(input, 'calculator_default_dose', 'calculatorDefaultDose'))
  const calculatorDefaultFrequency = toNumberOrNull(resolveAlias(input, 'calculator_default_frequency', 'calculatorDefaultFrequency'))
  const notes = safeString(resolveAlias(input, 'notes')) || null
  return {
    id: safeString(input.id) || undefined,
    slug: normalizeRecommendedDoseSlug(slugBase),
    species,
    route,
    dose_value: doseValue,
    dose_max: doseMax,
    dose_unit: doseUnit,
    per_weight_unit: perWeightUnit,
    indication,
    frequency,
    frequency_min: frequencyMin,
    frequency_max: frequencyMax,
    frequency_mode: frequencyMode,
    frequency_text: frequencyText,
    duration,
    calculator_default_dose: calculatorDefaultDose,
    calculator_default_frequency: calculatorDefaultFrequency,
    notes,
    metadata: isObject(input.metadata) ? input.metadata : {},
  }
}

function normalizeMedication(raw: unknown, fallbackIndex: number): CanonicalMedication | null {
  const input = isObject(raw) ? raw : {}
  const name = safeString(input.name)
  if (!name) return null
  const slug = normalizeCatalogKey(safeString(input.slug) || safeString(input.id) || name || `global-${fallbackIndex + 1}`)
  const presentations = Array.isArray(input.presentations)
    ? input.presentations
        .map((entry, index) => normalizePresentation(entry, slug, index))
    : []
  const recommendedDoses = Array.isArray(input.recommended_doses)
    ? input.recommended_doses
        .map((entry, index) => normalizeRecommendedDose(entry, slug, index))
        .filter((entry): entry is CanonicalRecommendedDose => !!entry)
    : []
  return {
    id: safeString(input.id) || undefined,
    slug,
    name,
    active_ingredient: safeString(input.active_ingredient) || null,
    is_controlled: !!input.is_controlled,
    is_active: input.is_active !== false,
    species: safeStringArray(input.species),
    routes: safeStringArray(input.routes),
    notes: safeString(input.notes) || null,
    tags: safeStringArray(input.tags),
    metadata: isObject(input.metadata) ? input.metadata : {},
    presentations,
    recommended_doses: recommendedDoses,
  }
}

export function normalizeMedicationCatalogBundle(raw: unknown): MedicationCatalogBundle {
  const input = isObject(raw) ? raw : {}
  const medications = Array.isArray(input.medications)
    ? input.medications
        .map((entry, index) => normalizeMedication(entry, index))
        .filter((entry): entry is CanonicalMedication => !!entry)
    : []
  return {
    schema_version: toNumberOrNull(input.schema_version) || 1,
    catalog_scope: (safeString(input.catalog_scope) as CatalogScope) || 'global',
    source: safeString(input.source) || 'Vetius Global Catalog',
    generated_at: safeString(input.generated_at) || null,
    medications,
  }
}

export function validateMedicationCatalogBundle(raw: unknown): ValidationResult<MedicationCatalogBundle> {
  const normalized = normalizeMedicationCatalogBundle(raw)
  const errors: string[] = []

  if (!normalized.schema_version || normalized.schema_version < 1) {
    errors.push('schema_version deve ser >= 1')
  }
  if (!['clinic', 'global'].includes(normalized.catalog_scope)) {
    errors.push('catalog_scope deve ser clinic ou global')
  }

  const seenMedicationSlugs = new Set<string>()
  normalized.medications.forEach((medication, medicationIndex) => {
    const prefix = `medications[${medicationIndex}]`
    if (!medication.slug) errors.push(`${prefix}.slug é obrigatório`)
    if (!medication.name) errors.push(`${prefix}.name é obrigatório`)
    if (seenMedicationSlugs.has(medication.slug)) errors.push(`${prefix}.slug duplicado: ${medication.slug}`)
    seenMedicationSlugs.add(medication.slug)

    const seenPresentationSlugs = new Set<string>()
    ;(medication.presentations || []).forEach((presentation, presentationIndex) => {
      const path = `${prefix}.presentations[${presentationIndex}]`
      if (!presentation.slug) errors.push(`${path}.slug é obrigatório`)
      if (seenPresentationSlugs.has(presentation.slug)) errors.push(`${path}.slug duplicado: ${presentation.slug}`)
      seenPresentationSlugs.add(presentation.slug)
    })

    const seenDoseSlugs = new Set<string>()
    ;(medication.recommended_doses || []).forEach((dose, doseIndex) => {
      const path = `${prefix}.recommended_doses[${doseIndex}]`
      if (!dose.species) errors.push(`${path}.species é obrigatório`)
      if (!dose.route) errors.push(`${path}.route é obrigatório`)
      if (dose.dose_value == null) errors.push(`${path}.dose_value é obrigatório`)
      if (!dose.dose_unit) errors.push(`${path}.dose_unit é obrigatório`)
      if (dose.slug) {
        if (seenDoseSlugs.has(dose.slug)) errors.push(`${path}.slug duplicado: ${dose.slug}`)
        seenDoseSlugs.add(dose.slug)
      }
    })
  })

  return {
    valid: errors.length === 0,
    errors,
    data: normalized,
  }
}

export function assertValidMedicationCatalogBundle(raw: unknown): MedicationCatalogBundle {
  const result = validateMedicationCatalogBundle(raw)
  if (!result.valid) {
    throw new Error(`Catálogo inválido:\n- ${result.errors.join('\n- ')}`)
  }
  return result.data
}

export function serializeMedicationCatalogBundle(bundle: MedicationCatalogBundle): string {
  return JSON.stringify(assertValidMedicationCatalogBundle(bundle), null, 2)
}

export const GLOBAL_MEDICATION_CATALOG = assertValidMedicationCatalogBundle(globalCatalogJson)

export function getGlobalCatalogMedications(): CanonicalMedication[] {
  return GLOBAL_MEDICATION_CATALOG.medications
}

export function findGlobalMedicationById(medicationId: string): CanonicalMedication | null {
  const slug = parseGlobalMedicationId(medicationId)
  if (!slug) return null
  return (
    GLOBAL_MEDICATION_CATALOG.medications.find((entry) => normalizeCatalogKey(entry.slug || entry.name) === slug) ||
    null
  )
}
