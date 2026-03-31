import { createEmptyManipuladoV1, normalizeManipuladoV1, type ManipuladoFinalUnit, type ManipuladoV1Formula } from './manipuladosV1'

function normalizeLine(line: string): string {
  return String(line || '').replace(/\s+/g, ' ').trim()
}

function parseAmountLine(line: string) {
  const match = normalizeLine(line).match(/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*([a-zA-Z%²/]+)$/i)
  if (!match) return null
  return {
    name: match[1].trim(),
    quantity: Number(match[2].replace(',', '.')),
    unit: match[3].trim(),
  }
}

function inferFinalUnit(text: string): ManipuladoFinalUnit {
  const safe = text.toLowerCase()
  if (safe.includes('capsul')) return 'capsulas'
  if (safe.includes('biscoit')) return 'biscoitos'
  if (safe.includes('petisc')) return 'petiscos'
  if (safe.includes('sach')) return 'saches'
  if (safe.includes('dose')) return 'doses'
  if (safe.includes('aplica')) return 'aplicacoes'
  if (safe.includes('ml')) return 'mL'
  return 'unidades'
}

function inferPosologyMode(text: string) {
  const safe = text.toLowerCase()
  if (safe.includes('mg/kg')) return 'mg_per_kg_dose' as const
  if (safe.includes('mg/m²') || safe.includes('mg/m2')) return 'mg_per_m2_dose' as const
  if (safe.includes('mg/animal')) return 'fixed_per_animal' as const
  if (safe.includes('mg/ml') || safe.includes('%')) return 'fixed_concentration' as const
  return 'fixed_per_application' as const
}

function inferFrequencyLabel(text: string): { mode: ManipuladoV1Formula['prescribing']['frequency_mode']; label: string } {
  const safe = text.toLowerCase()
  if (safe.includes('q12h') || safe.includes('12 horas')) return { mode: 'q12h', label: 'a cada 12 horas' }
  if (safe.includes('q24h') || safe.includes('24 horas')) return { mode: 'q24h', label: 'a cada 24 horas' }
  if (safe.includes('q8h') || safe.includes('8 horas')) return { mode: 'q8h', label: 'a cada 8 horas' }
  if (safe.includes('q6h') || safe.includes('6 horas')) return { mode: 'q6h', label: 'a cada 6 horas' }
  if (safe.includes('2 a 3x ao dia') || safe.includes('2-3x')) return { mode: 'custom', label: '2 a 3x ao dia' }
  if (safe.includes('dose única')) return { mode: 'single_dose', label: 'dose única' }
  if (safe.includes('uso contínuo')) return { mode: 'continuous_use', label: 'uso contínuo' }
  return { mode: 'custom', label: '' }
}

export function parseManipuladoV1FromText(rawText: string, clinicId = ''): ManipuladoV1Formula {
  const formula = createEmptyManipuladoV1(clinicId)
  const lines = String(rawText || '')
    .split(/\r?\n/)
    .map(normalizeLine)
    .filter(Boolean)

  if (!lines.length) return formula

  formula.identity.name = lines[0]
  formula.identity.slug = lines[0]

  const ingredientLines = lines.map(parseAmountLine).filter(Boolean) as Array<{ name: string; quantity: number; unit: string }>
  if (ingredientLines.length) {
    formula.ingredients = ingredientLines.map((entry, index) => ({
      id: `${index + 1}-${entry.name}`,
      name: entry.name,
      quantity: entry.quantity,
      unit: entry.unit,
      role: 'active',
      rule: 'fixed',
      note: '',
      min_quantity: null,
      max_quantity: null,
      weight_range_text: '',
    }))
  }

  const qspLine = lines.find((line) => /\bq\.?s\.?p\b/i.test(line) || /\bqsp\b/i.test(line))
  if (qspLine) {
    formula.pharmacy.qsp_text = qspLine
    formula.pharmacy.total_quantity = qspLine
    formula.pharmacy.final_unit = inferFinalUnit(qspLine)
    if (/biscoit/i.test(qspLine)) formula.identity.pharmaceutical_form = 'Petisco'
    else if (/pasta/i.test(qspLine)) formula.identity.pharmaceutical_form = 'Pasta oral'
    else if (/suspens/i.test(qspLine)) formula.identity.pharmaceutical_form = 'Suspensão'
    else if (/sach/i.test(qspLine)) formula.identity.pharmaceutical_form = 'Sachê'
  }

  const posologyLine = lines.find((line) => /\bdar\b|\badministrar\b/i.test(line))
  const allText = lines.join(' ')
  formula.prescribing.posology_mode = inferPosologyMode(allText)
  const frequency = inferFrequencyLabel(allText)
  formula.prescribing.frequency_mode = frequency.mode
  formula.prescribing.frequency_label = frequency.label

  if (posologyLine) {
    formula.prescribing.manual_usage_override = posologyLine
  }

  const indicationLine = lines.find((line) => /dermatite|analg|antif|controle|tratamento|colapso|dor|inflama/i.test(line))
  if (indicationLine) {
    formula.identity.indication_summary = indicationLine
  }

  const speciesText = allText.toLowerCase()
  if (speciesText.includes('cães') || speciesText.includes('caes') || speciesText.includes('cão')) formula.identity.species_scope = 'cao'
  if (speciesText.includes('gatos') || speciesText.includes('gato')) formula.identity.species_scope = formula.identity.species_scope === 'cao' ? 'ambos' : 'gato'

  const flavorMatch = allText.match(/\bsabor\s+([a-zA-ZÀ-ÿ& ]+)/i)
  if (flavorMatch) {
    formula.pharmacy.flavor_mode = flavorMatch[1].trim()
    formula.pharmacy.flavor_text = flavorMatch[1].trim()
  }

  return normalizeManipuladoV1(formula)
}
