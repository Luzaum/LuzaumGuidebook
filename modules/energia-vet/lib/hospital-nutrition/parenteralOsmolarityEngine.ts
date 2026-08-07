export interface ParenteralComponent {
  name: string
  volumeMl: number
  osmolarityMosmL?: number
  osmolarityMosmPerMl?: number
  source: 'manufacturer' | 'institutional_protocol' | 'manual'
}

export interface ParenteralOsmolarityInput {
  components: ParenteralComponent[]
  additionalDiluentMl?: number
  additionalDiluentOsmolarityMosmL?: number
  peripheralOsmolarityLimitMosmL?: number
  vascularAccess?: 'peripheral' | 'central' | 'not_defined'
}

export interface ParenteralOsmolarityResult {
  finalOsmolarityMosmL: number | null
  totalVolumeMl: number
  componentWarnings: string[]
  alerts: string[]
}

export const DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L = 900

function componentOsmolarityMosmL(component: ParenteralComponent): number | null {
  if (component.osmolarityMosmL != null && component.osmolarityMosmL >= 0) {
    return component.osmolarityMosmL
  }
  if (component.osmolarityMosmPerMl != null && component.osmolarityMosmPerMl >= 0) {
    return component.osmolarityMosmPerMl * 1000
  }
  return null
}

export function calculateParenteralOsmolarity(input: ParenteralOsmolarityInput): ParenteralOsmolarityResult {
  const componentWarnings: string[] = []
  const alerts: string[] = []
  const limit = input.peripheralOsmolarityLimitMosmL ?? DEFAULT_PERIPHERAL_OSMOLARITY_LIMIT_MOSM_L

  const allComponents = [...input.components]
  if (input.additionalDiluentMl != null && input.additionalDiluentMl > 0) {
    allComponents.push({
      name: 'Diluente adicional',
      volumeMl: input.additionalDiluentMl,
      osmolarityMosmL: input.additionalDiluentOsmolarityMosmL ?? 0,
      source: 'manual',
    })
  }

  const totalVolumeMl = allComponents.reduce((sum, c) => sum + Math.max(0, c.volumeMl), 0)
  if (totalVolumeMl <= 0) {
    return {
      finalOsmolarityMosmL: null,
      totalVolumeMl: 0,
      componentWarnings: ['Volume final zero — osmolaridade não calculada.'],
      alerts: ['Volume final zero.'],
    }
  }

  let weightedSum = 0
  let hasMissing = false

  for (const component of allComponents) {
    if (component.volumeMl <= 0) continue
    const osm = componentOsmolarityMosmL(component)
    if (osm == null) {
      hasMissing = true
      componentWarnings.push(`Componente "${component.name}" sem osmolaridade conhecida.`)
      continue
    }
    weightedSum += component.volumeMl * osm
  }

  if (hasMissing) {
    return {
      finalOsmolarityMosmL: null,
      totalVolumeMl,
      componentWarnings,
      alerts: [...componentWarnings, 'Não calculada — dados insuficientes.'],
    }
  }

  const finalOsmolarityMosmL = weightedSum / totalVolumeMl

  if (input.vascularAccess === 'not_defined' || !input.vascularAccess) {
    alerts.push('Via vascular não definida — confirmar acesso antes da infusão.')
  }

  if (
    input.vascularAccess === 'peripheral' &&
    finalOsmolarityMosmL > limit
  ) {
    alerts.push(
      `Atenção: osmolaridade estimada acima do limite configurado para acesso periférico (${limit} mOsm/L).`,
    )
  }

  return {
    finalOsmolarityMosmL,
    totalVolumeMl,
    componentWarnings,
    alerts,
  }
}

/** Osmolaridades típicas (mOsm/L) para soluções comerciais comuns — referência clínica. */
export const TYPICAL_PN_COMPONENT_OSMOLARITY: Record<string, number> = {
  'aminoacidos_8.5': 850,
  'dextrose_10': 500,
  'dextrose_50': 2500,
  'lipideos_20': 260,
  'agua_destilada': 0,
}
