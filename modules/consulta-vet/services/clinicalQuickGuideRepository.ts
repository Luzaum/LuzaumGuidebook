import { clinicalQuickGuidesSeed } from '../data/seed/clinicalQuickGuides.seed';
import { ClinicalQuickGuide } from '../types/clinicalQuickGuide';

export function getClinicalQuickGuideRepository() {
  return {
    list(): Promise<ClinicalQuickGuide[]> {
      return Promise.resolve(clinicalQuickGuidesSeed.filter((g) => g.isPublished));
    },
    getBySlug(slug: string): Promise<ClinicalQuickGuide | null> {
      return Promise.resolve(clinicalQuickGuidesSeed.find((g) => g.slug === slug && g.isPublished) ?? null);
    },
  };
}
