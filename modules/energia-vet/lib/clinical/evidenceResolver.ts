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
  {
    id: 'applied-clinical-nutrition',
    title: 'Applied Veterinary Clinical Nutrition',
    sourceType: 'textbook',
    authors: 'Becvarova, Morgan, et al.',
    year: 2024,
    edition: '2ª ed.',
    licenseStatus: 'reference_only',
  },
  {
    id: 'bsava-critical-care',
    title: 'BSAVA Manual of Canine and Feline Emergency and Critical Care',
    sourceType: 'textbook',
    chapter: 'Suporte nutricional',
    licenseStatus: 'reference_only',
  },
  {
    id: 'bsava-nephrology',
    title: 'BSAVA Manual of Canine and Feline Nephrology and Urology',
    sourceType: 'textbook',
    chapter: 'Manejo nutricional da DRC',
    licenseStatus: 'reference_only',
  },
  {
    id: 'bsava-urology',
    title: 'BSAVA Manual of Canine and Feline Nephrology and Urology',
    sourceType: 'textbook',
    chapter: 'Urolitíase',
    licenseStatus: 'reference_only',
  },
  {
    id: 'canine-hepatobiliary-2024',
    title: 'Canine Hepatobiliary and Exocrine Pancreatic Diseases',
    sourceType: 'textbook',
    year: 2024,
    licenseStatus: 'reference_only',
  },
  {
    id: 'wsava-nutrition',
    title: 'WSAVA Global Nutrition Guidelines',
    sourceType: 'guideline',
    licenseStatus: 'reference_only',
  },
  {
    id: 'fediaf-2025-ref',
    title: 'FEDIAF Nutritional Guidelines 2025',
    sourceType: 'guideline',
    year: 2025,
    licenseStatus: 'restricted',
  },
]

const sourceById = new Map(CLINICAL_EVIDENCE_SOURCES.map((source) => [source.id, source]))

export function resolveEvidenceReferences(sourceIds: string[]): EvidenceReference[] {
  return sourceIds.flatMap((sourceId) => {
    const source = sourceById.get(sourceId)
    if (!source) return []
    return [{
      sourceId: source.id,
      title: source.title,
      sourceType: source.sourceType,
    }]
  })
}

export function getEvidenceSourceById(id: string): ClinicalEvidenceSource | undefined {
  return sourceById.get(id)
}
