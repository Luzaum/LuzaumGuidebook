import type { MonitoringRecommendation } from '../catalog/types'
import type { TherapeuticProfile } from './therapeuticProfiles'

export function buildMonitoringPlanForProfiles(profiles: TherapeuticProfile[]): MonitoringRecommendation[] {
  const seen = new Set<string>()
  const recommendations: MonitoringRecommendation[] = []

  for (const profile of profiles) {
    const key = `${profile.id}:${profile.monitoring}`
    if (seen.has(key)) continue
    seen.add(key)

    recommendations.push({
      parameter: profile.namePt,
      interval: profile.followUpInterval,
      notes: profile.monitoring,
    })
  }

  return recommendations
}

export function mergeMonitoringRecommendations(
  base: MonitoringRecommendation[],
  extra: MonitoringRecommendation[],
): MonitoringRecommendation[] {
  const seen = new Set(base.map((item) => `${item.parameter}:${item.interval}`))
  const merged = [...base]

  for (const item of extra) {
    const key = `${item.parameter}:${item.interval}`
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }

  return merged
}
