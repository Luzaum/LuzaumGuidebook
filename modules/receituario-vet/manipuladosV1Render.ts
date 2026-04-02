import { sanitizeVisibleText } from './textSanitizer'
import { buildGeneratedUsageText, buildPrintLineLeft, buildPrintLineRight, normalizeManipuladoV1, type ManipuladoV1Formula } from './manipuladosV1'

function titleCase(value: string): string {
  return sanitizeVisibleText(value)
    .toLowerCase()
    .replace(/(^|\s)([a-zà-ÿ])/g, (_, lead, char) => `${lead}${char.toUpperCase()}`)
}

export function getManipuladoV1CatalogTitle(formula: ManipuladoV1Formula): string {
  const normalized = normalizeManipuladoV1(formula)
  return sanitizeVisibleText(normalized.identity.name)
}

export function getManipuladoV1CatalogSubtitle(formula: ManipuladoV1Formula): string {
  const normalized = normalizeManipuladoV1(formula)
  return [
    titleCase(normalized.identity.pharmaceutical_form),
    normalized.pharmacy.qsp_text || normalized.pharmacy.total_quantity,
    normalized.identity.indication_summary,
  ].filter(Boolean).join(' • ')
}

export function renderManipuladoV1TutorInstruction(formula: ManipuladoV1Formula): string {
  const normalized = normalizeManipuladoV1(formula)
  return normalized.prescribing.manual_usage_override || normalized.prescribing.generated_usage_text || buildGeneratedUsageText(normalized)
}

export function renderManipuladoV1PharmacyInstruction(formula: ManipuladoV1Formula): string {
  const normalized = normalizeManipuladoV1(formula)
  const activeParts = normalized.ingredients
    .filter((ingredient) => ingredient.role === 'active' && ingredient.name)
    .map((ingredient) => {
      const quantityText =
        ingredient.rule === 'per_kg' || ingredient.rule === 'per_m2' || ingredient.rule === 'weight_range'
          ? 'de acordo com a dose prescrita'
          : ingredient.quantity != null
            ? `${ingredient.quantity} ${ingredient.unit}`.trim()
            : ingredient.weight_range_text
      return [ingredient.name, quantityText].filter(Boolean).join(' ')
    })
    .filter(Boolean)

  const qsp = normalized.pharmacy.qsp_text || normalized.pharmacy.total_quantity
  const flavor =
    normalized.pharmacy.flavor_mode === 'Outro'
      ? normalized.pharmacy.flavor_text
      : normalized.pharmacy.flavor_mode

  return sanitizeVisibleText(
    [
      `Manipulação: Favor manipular ${titleCase(normalized.identity.pharmaceutical_form)}`,
      activeParts.length ? `contendo ${activeParts.join(', ')}` : '',
      qsp ? `q.s.p. ${qsp}` : '',
      normalized.pharmacy.base_text ? normalized.pharmacy.base_text : '',
      flavor && flavor !== 'Sem sabor' ? `sabor ${flavor}` : '',
      normalized.pharmacy.compounding_instructions || '',
    ].filter(Boolean).join(', ') + '.'
  )
}

export function renderManipuladoV1Recommendations(formula: ManipuladoV1Formula): string[] {
  const normalized = normalizeManipuladoV1(formula)
  return sanitizeVisibleText(
    [normalized.prescribing.clinical_note, normalized.pharmacy.pharmaceutic_note].filter(Boolean).join('\n')
  )
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

export function getManipuladoV1PrintLineLeft(formula: ManipuladoV1Formula): string {
  const normalized = normalizeManipuladoV1(formula)
  return normalized.display.auto_print_line ? buildPrintLineLeft(normalized) : sanitizeVisibleText(normalized.display.print_line_left)
}

export function getManipuladoV1PrintLineRight(formula: ManipuladoV1Formula): string {
  const normalized = normalizeManipuladoV1(formula)
  return normalized.display.auto_print_line ? buildPrintLineRight(normalized) : sanitizeVisibleText(normalized.display.print_line_right)
}

