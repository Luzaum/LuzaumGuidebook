/** Normaliza espécie e idade do paciente para regras JSON (CAO/GATO, GERIATRICO…). */

const SPECIES_TO_DDX: Record<string, string> = {
  dog: 'CAO',
  cao: 'CAO',
  caes: 'CAO',
  cat: 'GATO',
  gato: 'GATO',
  gatos: 'GATO',
}

const LIFE_STAGE_TO_DDX: Record<string, string> = {
  neonate: 'NEONATO',
  neonato: 'NEONATO',
  pediatric: 'PEDIATRICO',
  pediatrico: 'PEDIATRICO',
  filhote: 'PEDIATRICO',
  adult: 'ADULTO',
  adulto: 'ADULTO',
  geriatric: 'GERIATRICO',
  geriatrico: 'GERIATRICO',
  idoso: 'GERIATRICO',
}

export function normalizeSpeciesForDdx(species: string | null | undefined): string | null {
  if (!species) return null
  const key = species.trim().toLowerCase()
  return SPECIES_TO_DDX[key] ?? species.trim().toUpperCase()
}

export function normalizeLifeStageForDdx(lifeStage: string | null | undefined): string | null {
  if (!lifeStage) return null
  const key = lifeStage.trim().toLowerCase()
  return LIFE_STAGE_TO_DDX[key] ?? lifeStage.trim().toUpperCase()
}

export function speciesMatchesDdxRule(patientSpecies: string | null | undefined, ruleSpecies: string[]): boolean {
  if (!ruleSpecies.length) return true
  const normalized = normalizeSpeciesForDdx(patientSpecies)
  if (!normalized) return false
  return ruleSpecies.some((s) => s.toUpperCase() === normalized)
}

export function lifeStageMatchesDdxRule(patientStage: string | null | undefined, ruleStages: string[]): boolean {
  if (!ruleStages.length) return true
  const normalized = normalizeLifeStageForDdx(patientStage)
  if (!normalized) return false
  return ruleStages.some((s) => s.toUpperCase() === normalized)
}

export function temporalPatternMatchesRule(
  temporalPattern: string | null | undefined,
  ruleCourse: string[],
): boolean {
  if (!temporalPattern || !ruleCourse.length) return false
  const t = temporalPattern.toLowerCase()
  return ruleCourse.some((c) => c.toLowerCase() === t || c.toLowerCase().includes(t))
}
