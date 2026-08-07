import { getFoodById } from './genutriData'
import { getBasisLabel } from './fediaf'
import { getNutrientDisplayUnit } from './nutrientDisplayUtils'
import type {
  EvaluatedNutrient,
  FoodContribution,
  FoodItem,
  NutrientTargetValue,
  RequirementProfile,
} from '../types'

export interface NutrientGapAdvice {
  nutrientTitle: string
  profileContext: string
  referenceLabel: string
  deliveredLabel: string
  gapLabel: string
  clinicalImpact: string
  supplementIdeas: string[]
  formulationIdeas: string[]
}

const CLINICAL_IMPACTS: Record<string, string> = {
  crudeProteinPct: 'Pode reduzir a oferta de aminoácidos, favorecer perda de massa magra e limitar reparo tecidual.',
  etherExtractPct: 'Pode reduzir a densidade energética e a oferta de ácidos graxos essenciais.',
  crudeFiberPct: 'Pode diminuir o suporte à motilidade intestinal e à qualidade fecal quando a fibra é meta clínica.',
  calciumPct: 'Pode comprometer o equilíbrio mineral e ósseo; interprete junto ao fósforo.',
  phosphorusPct: 'Pode comprometer a oferta mineral; interprete sempre junto ao cálcio e ao perfil renal.',
  potassiumPct: 'Pode afetar equilíbrio eletrolítico, função neuromuscular e apetite.',
  sodiumPct: 'Pode alterar o equilíbrio hidroeletrolítico conforme o diagnóstico.',
  magnesiumPct: 'Pode afetar equilíbrio eletrolítico e função neuromuscular.',
  taurinePct: 'Em gatos, baixa oferta pode comprometer retina e função cardíaca ao longo do tempo.',
  ironMg: 'Pode limitar eritropoiese e transporte de oxigênio.',
  zincMg: 'Pode afetar pele, cicatrização e resposta imune.',
  copperMg: 'Pode afetar metabolismo do ferro; use cautela em pacientes hepatobiliares.',
  seleniumMg: 'Pode reduzir suporte antioxidante; evite suplementar sem confirmar o dado.',
  vitaminAPerKg: 'Pode afetar integridade epitelial, visão e imunidade.',
  vitaminDPerKg: 'Pode afetar homeostase de cálcio e fósforo; excesso também é relevante.',
  vitaminEPerKg: 'Pode reduzir suporte antioxidante, especialmente em dietas mais gordurosas.',
}

const SUPPLEMENT_IDEAS: Record<string, string[]> = {
  crudeProteinPct: [
    'Incluir fonte proteica magra (peito de frango, ovo cozido, peixe) com composição analítica conhecida.',
    'Proteína concentrada veterinária apenas após confirmar déficit e relação proteína:energia.',
  ],
  etherExtractPct: [
    'Azeite ou óleo de peixe em dose calculada para elevar densidade energética sem aumentar volume.',
    'Evitar equivalência entre óleos; ajustar pela composição de ácidos graxos quando disponível.',
  ],
  crudeFiberPct: [
    'Vegetais fibrosos cozidos (abóbora, brócolis, psyllium) conforme tolerância gastrointestinal.',
    'Fibras funcionais veterinárias se houver meta clínica específica de trânsito ou microbiota.',
  ],
  calciumPct: [
    'Carbonato ou citrato de cálcio apenas após calcular déficit e relação Ca:P.',
    'Osso moído ou fontes lácteas somente com composição analítica confiável.',
  ],
  phosphorusPct: [
    'Revisar fontes proteicas ricas em fósforo antes de suplementar.',
    'Fosfato ou fonte mineral específica somente com controle laboratorial e perfil renal.',
  ],
  potassiumPct: [
    'Fontes naturais como batata-doce ou vegetais ricos em potássio, se compatíveis com o quadro.',
    'Suplementação eletrolítica apenas com confirmação de déficit e função renal.',
  ],
  sodiumPct: [
    'Sal dietético ou fonte eletrolítica somente se o perfil clínico permitir e o déficit for confirmado.',
  ],
  taurinePct: [
    'Em gatos, priorizar fontes animais (coração, peixe) ou taurina suplementar com dose calculada.',
  ],
  ironMg: ['Fontes hemáticas ou ferro quelado somente após confirmar anemia ou déficit documentado.'],
  zincMg: ['Zinco quelado em dose calculada; confirmar interação com cálcio e fitatos da dieta.'],
}

function formatTarget(target: NutrientTargetValue): string {
  if (target.kind === 'number' || target.kind === 'number_with_text') {
    return target.value == null ? '—' : String(target.value)
  }
  if (target.kind === 'range') {
    if (target.min == null || target.max == null) return '—'
    return `${target.min}–${target.max}`
  }
  if (target.kind === 'comparator' && target.value != null && target.operator) {
    return `${target.operator} ${target.value}`
  }
  return target.raw == null ? '—' : String(target.raw)
}

function getTargetMinimum(target: NutrientTargetValue): number | null {
  if (target.kind === 'number' || target.kind === 'number_with_text') return target.value
  if (target.kind === 'range') return target.min
  if (target.kind === 'comparator' && target.operator && target.value != null) {
    if (target.operator === '>' || target.operator === '>=') return target.value
  }
  return null
}

function getFoodNutrientOnBasis(
  food: FoodItem,
  key: string,
  basisType: RequirementProfile['basisType'],
): number | null {
  if (basisType === 'percent_dm') {
    return food.nutrientsDryMatter[key] ?? null
  }

  const asFedValue = food.nutrientsAsFed[key]
  const energy = food.nutrientsAsFed.energyKcalPer100g
  if (asFedValue == null || energy == null || energy <= 0) return null

  if (basisType === 'per_1000kcal') return (asFedValue / energy) * 1000
  if (basisType === 'per_100kcal') return (asFedValue / energy) * 100
  return null
}

function simulateBlendScore(
  contributions: FoodContribution[],
  row: EvaluatedNutrient,
  inclusionByFoodId: Map<string, number>,
): number {
  let total = 0
  for (const contribution of contributions) {
    const food = getFoodById(contribution.foodId)
    if (!food) continue
    const score = getFoodNutrientOnBasis(food, row.key, row.basisType)
    if (score == null) continue
    total += score * (inclusionByFoodId.get(contribution.foodId) ?? contribution.inclusionPct) / 100
  }
  return total
}

function buildFormulationIdeas(
  row: EvaluatedNutrient,
  contributions: FoodContribution[],
): string[] {
  const unit = getNutrientDisplayUnit(row.key, row.basisType, row.unit) ?? ''
  const unitSuffix = unit ? ` ${unit}` : ''
  const basisLabel = getBasisLabel(row.basisType)
  const minimum = row.target ? getTargetMinimum(row.target) : null
  const delivered = row.deliveredValue ?? 0
  const gap = minimum != null ? minimum - delivered : null

  const ranked = contributions
    .map((contribution) => {
      const food = getFoodById(contribution.foodId)
      if (!food) return null
      const score = getFoodNutrientOnBasis(food, row.key, row.basisType)
      if (score == null) return null
      return { ...contribution, score }
    })
    .filter((item): item is FoodContribution & { score: number } => Boolean(item))
    .sort((left, right) => right.score - left.score)

  if (!ranked.length) {
    return [`Inclua um alimento mais rico em ${row.label} ou confirme a composição analítica dos itens atuais.`]
  }

  const richest = ranked[0]
  const poorest = ranked[ranked.length - 1]

  if (minimum != null && richest.score < minimum * 0.95) {
    return [
      `Nenhum alimento da fórmula atual aproxima a referência (${minimum.toFixed(2)}${unitSuffix} na base ${basisLabel}). ${richest.foodName} é o mais concentrado (${richest.score.toFixed(2)}${unitSuffix}), mas redistribuir proporções não fecha o déficit — inclua ou substitua por fonte mais adequada.`,
      gap != null && gap > 0
        ? `Déficit estimado: ${gap.toFixed(2)}${unitSuffix} abaixo do mínimo (${minimum.toFixed(2)}${unitSuffix}).`
        : 'Recalcule a energia total após incluir novos ingredientes.',
    ]
  }

  if (ranked.length === 1 || richest.foodId === poorest.foodId) {
    return [
      `${richest.foodName} é a principal fonte de ${row.label} na fórmula (${richest.score.toFixed(2)}${unitSuffix}). Considere aumentar sua participação em ~5–10 p.p. e reduzir proporcionalmente os demais alimentos para manter a energia-alvo.`,
    ]
  }

  const spread = richest.score - poorest.score
  if (gap != null && gap > 0 && spread < gap * 0.2) {
    return [
      `A diferença entre ${richest.foodName} (${richest.score.toFixed(2)}${unitSuffix}) e ${poorest.foodName} (${poorest.score.toFixed(2)}${unitSuffix}) é pequena frente ao déficit (${gap.toFixed(2)}${unitSuffix}). Priorize trocar ou incluir alimento mais concentrado em ${row.label}.`,
      'Se mantiver estes ingredientes, complemente com fonte específica (ver suplementação) em vez de microajuste de proporção.',
    ]
  }

  const shiftPp = 8
  const adjustedInclusion = new Map(
    contributions.map((contribution) => [contribution.foodId, contribution.inclusionPct]),
  )
  adjustedInclusion.set(richest.foodId, Math.min(100, richest.inclusionPct + shiftPp))
  adjustedInclusion.set(poorest.foodId, Math.max(0, poorest.inclusionPct - shiftPp))
  const projectedBlend = simulateBlendScore(contributions, row, adjustedInclusion)
  const projectedGain = projectedBlend - delivered

  if (gap != null && gap > 0 && projectedGain < gap * 0.05) {
    return [
      `Redistribuir ~${shiftPp} p.p. de ${poorest.foodName} para ${richest.foodName} altera pouco a entrega (${projectedGain.toFixed(2)}${unitSuffix} estimados). Inclua fonte mais concentrada ou suplemento antes de insistir no ajuste fino da fórmula.`,
    ]
  }

  const suggestedIncrease = Math.min(100, richest.inclusionPct + shiftPp)
  const suggestedDecrease = Math.max(0, poorest.inclusionPct - shiftPp)
  const ideas: string[] = [
    `${richest.foodName} concentra mais ${row.label} (${richest.score.toFixed(2)}${unitSuffix} na base ${basisLabel}). Considere subir de ${richest.inclusionPct.toFixed(1)}% para cerca de ${suggestedIncrease.toFixed(0)}%.`,
    `${poorest.foodName} contribui menos (${poorest.score.toFixed(2)}${unitSuffix}). Pode ser reduzido de ${poorest.inclusionPct.toFixed(1)}% para cerca de ${suggestedDecrease.toFixed(0)}% para abrir espaço sem abandonar diversidade alimentar.`,
    'Recalcule a energia total após o ajuste; se ultrapassar a meta calórica, reduza primeiro alimentos mais densos energeticamente.',
  ]

  return ideas
}

export function buildNutrientGapAdvice(
  row: EvaluatedNutrient,
  contributions: FoodContribution[],
): NutrientGapAdvice {
  const unit = getNutrientDisplayUnit(row.key, row.basisType, row.unit) ?? ''
  const unitSuffix = unit ? ` ${unit}` : ''
  const delivered = row.deliveredValue ?? 0
  const reference = row.target ? formatTarget(row.target) : '—'
  const minimum = row.target ? getTargetMinimum(row.target) : null
  const basisLabel = getBasisLabel(row.basisType)

  let gapLabel = 'Déficit não quantificado para este tipo de referência.'
  if (minimum != null && row.deliveredValue != null) {
    const gap = minimum - delivered
    gapLabel =
      gap > 0
        ? `${gap.toFixed(2)}${unitSuffix} abaixo do mínimo (${minimum.toFixed(2)}${unitSuffix}, base ${basisLabel}).`
        : `Entrega ${delivered.toFixed(2)}${unitSuffix}; referência mínima ${minimum.toFixed(2)}${unitSuffix} (base ${basisLabel}).`
  }

  const supplementIdeas =
    SUPPLEMENT_IDEAS[row.key] ?? [
      'Confirmar composição analítica dos alimentos antes de suplementar.',
      'Preferir correção pela fórmula quando houver fonte alimentar adequada no catálogo.',
    ]

  return {
    nutrientTitle: row.label,
    profileContext: row.profileLabel ? `${row.profileLabel} · ${basisLabel}` : basisLabel,
    referenceLabel: `${reference}${unitSuffix}`,
    deliveredLabel: `${delivered.toFixed(2)}${unitSuffix}`,
    gapLabel,
    clinicalImpact:
      CLINICAL_IMPACTS[row.key] ??
      'A entrega abaixo da referência pode comprometer a adequação nutricional deste plano. Confirme o dado analítico antes de corrigir.',
    supplementIdeas,
    formulationIdeas: buildFormulationIdeas(row, contributions),
  }
}
