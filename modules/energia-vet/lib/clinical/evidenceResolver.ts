import type { EvidenceReference } from '../catalog/types'

export interface ClinicalEvidenceSource {
  id: string
  title: string
  sourceType: 'guideline' | 'consensus' | 'textbook' | 'peer_reviewed_article' | 'regulation'
  authors?: string
  year?: number
  edition?: string
  chapter?: string
  pages?: string
  licenseStatus: 'reference_only' | 'restricted' | 'public'
}

export const CLINICAL_EVIDENCE_SOURCES: ClinicalEvidenceSource[] = [
  { id: 'applied-clinical-nutrition', title: 'Applied Veterinary Clinical Nutrition, 2nd Edition', sourceType: 'textbook', edition: '2ª ed.', chapter: 'Energia e manejo nutricional por doença', pages: '57-83; 191-565', licenseStatus: 'reference_only' },
  { id: 'bsava-critical-care', title: 'Nutritional Management of Hospitalized Small Animals', sourceType: 'textbook', chapter: 'Energia, vias de suporte, dietas enterais e síndrome de realimentação', pages: '15-33; 94-104; 131-140; 173-177', licenseStatus: 'reference_only' },
  { id: 'bsava-nephrology', title: 'Applied Veterinary Clinical Nutrition, 2nd Edition', sourceType: 'textbook', chapter: 'Nutritional Management of Kidney Disease', pages: '412-430', licenseStatus: 'reference_only' },
  { id: 'bsava-urology', title: 'Applied Veterinary Clinical Nutrition, 2nd Edition', sourceType: 'textbook', chapter: 'Nutritional Management of Lower Urinary Tract Disease', pages: '440-461', licenseStatus: 'reference_only' },
  { id: 'canine-hepatobiliary-2024', title: 'Applied Veterinary Clinical Nutrition, 2nd Edition', sourceType: 'textbook', chapter: 'Exocrine Pancreatic and Hepatobiliary Diseases', pages: '327-365', licenseStatus: 'reference_only' },
  { id: 'wsava-nutrition', title: 'WSAVA Global Nutrition Guidelines', sourceType: 'guideline', licenseStatus: 'reference_only' },
  { id: 'fediaf-2025-ref', title: 'Nutrient Requirements of Dogs and Cats', sourceType: 'textbook', chapter: 'Nutrient requirements and dietary nutrient concentrations', pages: '701-719', licenseStatus: 'reference_only' },
  { id: 'nrc-dogs-cats-2006', title: 'Nutrient Requirements of Dogs and Cats', sourceType: 'textbook', chapter: 'Energy, nutrients, formulation and ingredient composition', pages: '72-102; 113-535; 656-719', licenseStatus: 'reference_only' },
  { id: 'small-animal-microbiomes', title: 'Small Animal Microbiomes and Nutrition', sourceType: 'textbook', chapter: 'Microbiome, dysbiosis, dietary treatment plans and nutrition consultation', pages: '95-147; 232-280; 333-372', licenseStatus: 'reference_only' },
]

const sourceById = new Map(CLINICAL_EVIDENCE_SOURCES.map((source) => [source.id, source]))

export function resolveEvidenceReferences(sourceIds: string[]): EvidenceReference[] {
  return sourceIds.flatMap((sourceId) => {
    const source = sourceById.get(sourceId)
    if (!source) return []
    return [{ sourceId: source.id, title: source.title, sourceType: source.sourceType }]
  })
}

export function getEvidenceSourceById(id: string): ClinicalEvidenceSource | undefined {
  return sourceById.get(id)
}
