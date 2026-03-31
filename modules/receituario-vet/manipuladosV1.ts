import { sanitizeDeepText, sanitizeVisibleText } from './textSanitizer'

export type ManipuladoSpeciesScope = 'cao' | 'gato' | 'ambos'
export type ManipuladoSaleClassification = 'free' | 'controlled'

export type ManipuladoPosologyMode =
  | 'fixed_per_animal'
  | 'mg_per_kg_dose'
  | 'mg_per_m2_dose'
  | 'fixed_per_application'
  | 'fixed_concentration'
  | 'variant_table'

export type ManipuladoFrequencyMode =
  | 'q6h'
  | 'q8h'
  | 'q12h'
  | 'q24h'
  | 'one_to_two_daily'
  | 'single_dose'
  | 'continuous_use'
  | 'until_recheck'
  | 'until_finished'
  | 'custom'

export type ManipuladoFinalUnit =
  | 'doses'
  | 'aplicacoes'
  | 'capsulas'
  | 'biscoitos'
  | 'mL'
  | 'saches'
  | 'petiscos'
  | 'unidades'

export type ManipuladoIngredientRole = 'active' | 'vehicle' | 'excipient' | 'base'
export type ManipuladoIngredientRule = 'fixed' | 'per_kg' | 'per_m2' | 'weight_range' | 'concentration'

export interface ManipuladoV1Identity {
  id: string
  clinic_id: string
  slug: string
  name: string
  species_scope: ManipuladoSpeciesScope
  pharmaceutical_form: string
  primary_route: string
  sale_classification: ManipuladoSaleClassification
  indication_summary: string
  description: string
  is_active: boolean
}

export interface ManipuladoV1Prescribing {
  posology_mode: ManipuladoPosologyMode
  dose_min: number | null
  dose_max: number | null
  dose_unit: string
  frequency_mode: ManipuladoFrequencyMode
  frequency_label: string
  duration_value: number | null
  duration_unit: string
  duration_label: string
  start_text: string
  generated_usage_text: string
  manual_usage_override: string
  clinical_note: string
}

export interface ManipuladoV1Ingredient {
  id: string
  name: string
  quantity: number | null
  unit: string
  role: ManipuladoIngredientRole
  rule: ManipuladoIngredientRule
  note: string
  min_quantity: number | null
  max_quantity: number | null
  weight_range_text: string
}

export interface ManipuladoV1Variant {
  id: string
  name: string
  species_scope: ManipuladoSpeciesScope
  indication: string
  scenario: string
  weight_range: string
  posology_override: Partial<ManipuladoV1Prescribing> | null
  pharmacy_note: string
}

export interface ManipuladoV1Pharmacy {
  qsp_text: string
  total_quantity: string
  final_unit: ManipuladoFinalUnit
  flavor_mode: string
  flavor_text: string
  base_text: string
  compounding_instructions: string
  pharmaceutic_note: string
}

export interface ManipuladoV1Display {
  auto_print_line: boolean
  print_line_left: string
  print_line_right: string
}

export interface ManipuladoV1Formula {
  identity: ManipuladoV1Identity
  prescribing: ManipuladoV1Prescribing
  pharmacy: ManipuladoV1Pharmacy
  ingredients: ManipuladoV1Ingredient[]
  variants: ManipuladoV1Variant[]
  display: ManipuladoV1Display
}

export const MANIPULADO_V1_FORMS = [
  'Cápsula',
  'Petisco',
  'Pasta oral',
  'Suspensão',
  'Sachê',
  'Gel transdérmico',
  'Solução de uso externo',
  'Solução otológica',
  'Shampoo',
  'Espuma',
  'Gel',
  'Creme',
  'Loção',
  'Lenço umedecido',
  'Floral',
] as const

export const MANIPULADO_V1_FLAVORS = [
  'Sem sabor',
  'Frango',
  'Picanha',
  'Bacon',
  'Salmão',
  'Queijo',
  'Chocolate',
  'Banana',
  'Morango',
  'Abacaxi',
  'Maçã',
  'Sabor a escolher',
  'Outro',
] as const

function slugify(value: string): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function createEmptyManipuladoV1(clinicId = ''): ManipuladoV1Formula {
  const id = crypto.randomUUID()
  return {
    identity: {
      id,
      clinic_id: clinicId,
      slug: '',
      name: '',
      species_scope: 'ambos',
      pharmaceutical_form: 'Cápsula',
      primary_route: 'ORAL',
      sale_classification: 'free',
      indication_summary: '',
      description: '',
      is_active: true,
    },
    prescribing: {
      posology_mode: 'fixed_per_animal',
      dose_min: null,
      dose_max: null,
      dose_unit: 'mg',
      frequency_mode: 'q12h',
      frequency_label: 'a cada 12 horas',
      duration_value: null,
      duration_unit: 'dias',
      duration_label: '',
      start_text: '',
      generated_usage_text: '',
      manual_usage_override: '',
      clinical_note: '',
    },
    pharmacy: {
      qsp_text: '',
      total_quantity: '',
      final_unit: 'unidades',
      flavor_mode: 'Sem sabor',
      flavor_text: '',
      base_text: '',
      compounding_instructions: '',
      pharmaceutic_note: '',
    },
    ingredients: [
      {
        id: crypto.randomUUID(),
        name: '',
        quantity: null,
        unit: 'mg',
        role: 'active',
        rule: 'fixed',
        note: '',
        min_quantity: null,
        max_quantity: null,
        weight_range_text: '',
      },
    ],
    variants: [],
    display: {
      auto_print_line: true,
      print_line_left: '',
      print_line_right: '',
    },
  }
}

export function normalizeManipuladoV1(raw?: Partial<ManipuladoV1Formula> | null): ManipuladoV1Formula {
  const base = createEmptyManipuladoV1(String(raw?.identity?.clinic_id || ''))
  const next: ManipuladoV1Formula = {
    identity: {
      ...base.identity,
      ...sanitizeDeepText(raw?.identity || {}),
    },
    prescribing: {
      ...base.prescribing,
      ...sanitizeDeepText(raw?.prescribing || {}),
    },
    pharmacy: {
      ...base.pharmacy,
      ...sanitizeDeepText(raw?.pharmacy || {}),
    },
    ingredients: Array.isArray(raw?.ingredients) && raw?.ingredients.length
      ? raw.ingredients.map((ingredient) => ({
          ...base.ingredients[0],
          ...sanitizeDeepText(ingredient || {}),
          id: String(ingredient?.id || crypto.randomUUID()),
        }))
      : base.ingredients,
    variants: Array.isArray(raw?.variants)
      ? raw.variants.map((variant) => ({
          id: String(variant?.id || crypto.randomUUID()),
          name: sanitizeVisibleText(variant?.name || ''),
          species_scope: (variant?.species_scope || 'ambos') as ManipuladoSpeciesScope,
          indication: sanitizeVisibleText(variant?.indication || ''),
          scenario: sanitizeVisibleText(variant?.scenario || ''),
          weight_range: sanitizeVisibleText(variant?.weight_range || ''),
          posology_override: sanitizeDeepText(variant?.posology_override || null),
          pharmacy_note: sanitizeVisibleText(variant?.pharmacy_note || ''),
        }))
      : [],
    display: {
      ...base.display,
      ...sanitizeDeepText(raw?.display || {}),
    },
  }

  next.identity.slug = slugify(next.identity.slug || next.identity.name)
  next.prescribing.generated_usage_text = buildGeneratedUsageText(next)
  if (next.display.auto_print_line) {
    next.display.print_line_left = buildPrintLineLeft(next)
    next.display.print_line_right = buildPrintLineRight(next)
  }
  return next
}

export function formatDurationPhrase(text: string): string {
  const t = text.trim().toLowerCase()
  if (t === 'dose única' || t === 'dose unica') return 'em dose única'
  if (t === 'uso contínuo' || t === 'uso continuo') return 'em uso contínuo'
  if (t.startsWith('até ') || t.startsWith('ate ')) return t.replace(/^ate\s/, 'até ')
  return `por ${text.trim()}`
}

export function buildGeneratedUsageText(formula: ManipuladoV1Formula): string {
  const unit = formula.pharmacy.final_unit === 'mL' ? 'mL' : formula.identity.pharmaceutical_form.toLowerCase()
  void unit
  const doseText =
    formula.prescribing.dose_min != null
      ? formula.prescribing.dose_max != null && formula.prescribing.dose_max !== formula.prescribing.dose_min
        ? `${formula.prescribing.dose_min}-${formula.prescribing.dose_max} ${formula.prescribing.dose_unit}`
        : `${formula.prescribing.dose_min} ${formula.prescribing.dose_unit}`
      : '1 dose'
  const durationText =
    formula.prescribing.duration_label ||
    (formula.prescribing.duration_value
      ? `${formula.prescribing.duration_value} ${formula.prescribing.duration_unit}`
      : '')
  return sanitizeVisibleText(
    `Administrar ${doseText} por via ${formula.identity.primary_route.toLowerCase()}, ${formula.prescribing.frequency_label}${durationText ? `, ${formatDurationPhrase(durationText)}` : ''}.`
  )
}

export function buildPrintLineLeft(formula: ManipuladoV1Formula): string {
  const primary = formula.ingredients.find((ingredient) => ingredient.role === 'active')
  const amountText = primary?.quantity != null ? `${primary.quantity} ${primary.unit}` : ''
  return sanitizeVisibleText([formula.identity.name, amountText].filter(Boolean).join(' '))
}

export function buildPrintLineRight(formula: ManipuladoV1Formula): string {
  return sanitizeVisibleText(formula.identity.pharmaceutical_form)
}
