export type EvidenceType =
  | 'guideline'
  | 'consensus'
  | 'systematic_review'
  | 'clinical_trial'
  | 'observational_study'
  | 'textbook'
  | 'expert_opinion'

export type EvidenceConfidence = 'high' | 'moderate' | 'low' | 'expert_consensus'

export interface EvidenceReference {
  id: string
  organization?: string
  authors?: string[]
  title: string
  year: number
  edition?: string
  guidelineVersion?: string
  pages?: string
  url?: string
  accessedAt?: string
  evidenceType: EvidenceType
  confidence: EvidenceConfidence
  species?: Array<'dog' | 'cat' | 'both'>
  population?: string
  condition?: string
  limitations?: string
  lastReviewedAt?: string
}

export const EVIDENCE_CATALOG: Record<string, EvidenceReference> = {
  'fediaf-2025': {
    id: 'fediaf-2025',
    organization: 'FEDIAF',
    title: 'Nutritional Guidelines for Complete and Complementary Pet Food for Cats and Dogs',
    year: 2025,
    evidenceType: 'guideline',
    confidence: 'high',
    species: ['both'],
    lastReviewedAt: '2026-08-01',
  },
  'aaha-2021-nutrition': {
    id: 'aaha-2021-nutrition',
    organization: 'AAHA',
    title: '2021 AAHA Nutrition and Weight Management Guidelines',
    year: 2021,
    evidenceType: 'guideline',
    confidence: 'high',
    species: ['both'],
    url: 'https://www.aaha.org/resources/2021-aaha-nutrition-and-weight-management-guidelines/',
    lastReviewedAt: '2026-08-01',
  },
  'aaha-2026-cat-diabetes': {
    id: 'aaha-2026-cat-diabetes',
    organization: 'AAHA',
    title: '2026 AAHA Diabetes Management Guidelines for Cats',
    year: 2026,
    evidenceType: 'guideline',
    confidence: 'high',
    species: ['cat'],
    condition: 'diabetes mellitus felina',
    lastReviewedAt: '2026-08-01',
  },
  'iris-ckd-2023': {
    id: 'iris-ckd-2023',
    organization: 'IRIS',
    title: 'IRIS Treatment Recommendations for CKD in Dogs and Cats',
    year: 2023,
    guidelineVersion: '2023',
    evidenceType: 'consensus',
    confidence: 'high',
    species: ['both'],
    condition: 'doença renal crônica',
    lastReviewedAt: '2026-08-01',
  },
  'acvim-urolith-2016': {
    id: 'acvim-urolith-2016',
    organization: 'ACVIM',
    title: 'ACVIM Consensus Recommendations on Uroliths in Dogs and Cats',
    year: 2016,
    evidenceType: 'consensus',
    confidence: 'moderate',
    species: ['both'],
    condition: 'urolitíase',
    lastReviewedAt: '2026-08-01',
  },
  'acvim-pancreatitis-cat-2021': {
    id: 'acvim-pancreatitis-cat-2021',
    organization: 'ACVIM',
    title: 'ACVIM Consensus Statement on Pancreatitis in Cats',
    year: 2021,
    evidenceType: 'consensus',
    confidence: 'moderate',
    species: ['cat'],
    lastReviewedAt: '2026-08-01',
  },
  'ettinger-internal-medicine-2024': {
    id: 'ettinger-internal-medicine-2024',
    authors: ['Ettinger S.J.', 'Feldman E.C.', 'Cote E.'],
    title: "Ettinger's Textbook of Veterinary Internal Medicine",
    year: 2024,
    edition: '9ª',
    evidenceType: 'textbook',
    confidence: 'high',
    species: ['both'],
    lastReviewedAt: '2026-08-15',
  },
  'nelson-couto-internal-medicine-2020': {
    id: 'nelson-couto-internal-medicine-2020',
    authors: ['Nelson R.W.', 'Couto C.G.'],
    title: 'Medicina Interna de Pequenos Animais',
    year: 2020,
    edition: '6ª',
    evidenceType: 'textbook',
    confidence: 'high',
    species: ['both'],
    lastReviewedAt: '2026-08-15',
  },
  'bsava-gastroenterology-2020': {
    id: 'bsava-gastroenterology-2020',
    organization: 'BSAVA',
    title: 'BSAVA Manual of Canine and Feline Gastroenterology',
    year: 2020,
    edition: '3ª',
    evidenceType: 'textbook',
    confidence: 'high',
    species: ['both'],
    condition: 'gastroenterologia',
    lastReviewedAt: '2026-08-15',
  },
  'canine-hepatobiliary-2020': {
    id: 'canine-hepatobiliary-2020',
    authors: ['Rothuizen J.', 'Bunch S.E.', 'Charles J.A.'],
    title: 'Canine Hepatobiliary and Exocrine Pancreatic Diseases',
    year: 2020,
    evidenceType: 'textbook',
    confidence: 'high',
    species: ['dog'],
    condition: 'hepatologia e pâncreas',
    lastReviewedAt: '2026-08-15',
  },
  'interprofessional-nutrition-2023': {
    id: 'interprofessional-nutrition-2023',
    title: 'Interprofessional Veterinary Nutrition',
    year: 2023,
    evidenceType: 'textbook',
    confidence: 'moderate',
    species: ['both'],
    lastReviewedAt: '2026-08-15',
  },
  'applied-clinical-nutrition': {
    id: 'applied-clinical-nutrition',
    authors: ['Fascetti A.J.', 'Delaney S.J.', 'Larsen J.A.', 'Villaverde C.'],
    title: 'Applied Veterinary Clinical Nutrition',
    year: 2024,
    edition: '2ª',
    evidenceType: 'textbook',
    confidence: 'expert_consensus',
    species: ['both'],
    lastReviewedAt: '2026-08-07',
  },
  /** Alias legado usado pelo motor energético canônico. */
  'avcn-2024': {
    id: 'avcn-2024',
    authors: ['Fascetti A.J.', 'Delaney S.J.', 'Larsen J.A.', 'Villaverde C.'],
    title: 'Applied Veterinary Clinical Nutrition',
    year: 2024,
    edition: '2ª',
    evidenceType: 'textbook',
    confidence: 'expert_consensus',
    species: ['both'],
    lastReviewedAt: '2026-08-07',
  },
  'hospital-nutrition-small-animals': {
    id: 'hospital-nutrition-small-animals',
    title: 'Nutritional Management of Hospitalized Small Animals',
    year: 2015,
    evidenceType: 'textbook',
    confidence: 'expert_consensus',
    species: ['both'],
    condition: 'nutrição hospitalar',
    lastReviewedAt: '2026-08-07',
  },
  'microbiome-nutrition': {
    id: 'microbiome-nutrition',
    title: 'Small Animal Microbiomes and Nutrition',
    year: 2022,
    evidenceType: 'textbook',
    confidence: 'moderate',
    species: ['both'],
    lastReviewedAt: '2026-08-07',
  },
  'nrc-2006': {
    id: 'nrc-2006',
    organization: 'NRC',
    title: 'Nutrient Requirements of Dogs and Cats',
    year: 2006,
    evidenceType: 'textbook',
    confidence: 'high',
    species: ['both'],
    lastReviewedAt: '2026-08-01',
  },
}

export function getEvidenceReference(id: string): EvidenceReference | undefined {
  return EVIDENCE_CATALOG[id]
}
