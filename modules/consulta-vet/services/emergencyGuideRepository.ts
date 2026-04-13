import { emergencyGuidesSeed } from '../data/seed/emergencyGuides.seed';
import { EmergencyGuide } from '../types/emergencyGuide';

export function getEmergencyGuideRepository() {
  return {
    list(): Promise<EmergencyGuide[]> {
      return Promise.resolve(emergencyGuidesSeed.filter((g) => g.isPublished));
    },
    getBySlug(slug: string): Promise<EmergencyGuide | null> {
      return Promise.resolve(emergencyGuidesSeed.find((g) => g.slug === slug && g.isPublished) ?? null);
    },
  };
}
