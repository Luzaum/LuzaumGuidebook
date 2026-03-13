import type { Differential, NeuroAxis } from '../types/analysis'
import { ANALYSIS_DISEASE_CATALOG_RAW } from './analysisDiseaseCatalog.generated'

type RawCatalogEntry = (typeof ANALYSIS_DISEASE_CATALOG_RAW)[number]

export type AnalysisDiseaseCatalogEntry = {
  id: string
  name: string
  rawCategory: string
  category: Differential['category']
  axes: NeuroAxis[]
  species: Array<'dog' | 'cat'>
  onset: string
  course: string
  keyFeatures: string[]
  priorityTests: string[]
  redFlags: string[]
  evidenceLevel: RawCatalogEntry['evidenceLevel']
  broadSyndrome: boolean
}

function normalizeText(value: unknown): string {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function repairText(value: unknown): string {
  const text = String(value || '').trim()
  if (!text) return ''

  if (!/[ÃÂâ]/.test(text)) {
    return text
  }

  try {
    return decodeURIComponent(escape(text))
  } catch {
    return text
  }
}

function mapLocalization(rawAxis: string): NeuroAxis[] {
  switch (rawAxis) {
    case 'forebrain':
      return ['PROSENCEFALO']
    case 'brainstem':
      return ['TRONCO_ENCEFALICO']
    case 'cerebellum':
      return ['CEREBELO']
    case 'vestibular_peripheral':
      return ['VESTIBULAR_PERIFERICO']
    case 'vestibular_central':
      return ['VESTIBULAR_CENTRAL', 'TRONCO_ENCEFALICO', 'CEREBELO']
    case 'C1_C5':
      return ['MEDULA_C1_C5']
    case 'C6_T2':
      return ['MEDULA_C6_T2']
    case 'T3_L3':
      return ['MEDULA_T3_L3']
    case 'L4_S3':
      return ['MEDULA_L4_S3', 'CAUDA_EQUINA']
    case 'spinal_any':
      return ['MEDULA_C1_C5', 'MEDULA_C6_T2', 'MEDULA_T3_L3', 'MEDULA_L4_S3', 'CAUDA_EQUINA']
    case 'multifocal':
    case 'diffuse':
      return ['MULTIFOCAL_OU_DIFUSA']
    case 'brain':
      return ['MULTIFOCAL_OU_DIFUSA', 'PROSENCEFALO', 'TRONCO_ENCEFALICO']
    case 'neuromuscular':
    case 'peripheral_nerve':
    case 'cranial_muscle':
      return ['NEUROMUSCULAR']
    default:
      return []
  }
}

function mapCategory(rawCategory: string, name: string): Differential['category'] {
  const raw = normalizeText(rawCategory)
  const normalizedName = normalizeText(name)

  if (raw.includes('infect')) return 'INFECCIOSA'
  if (raw.includes('immune') || raw.includes('inflam')) return 'INFLAMATORIA'
  if (raw.includes('neoplas')) return 'NEOPLASICA'
  if (raw.includes('vascular')) return 'VASCULAR'
  if (raw.includes('traumatic')) return normalizedName.includes('disco') ? 'COMPRESSIVA' : 'TRAUMATICA'
  if (raw.includes('compress')) return 'COMPRESSIVA'
  if (raw.includes('endocr')) return 'ENDOCRINA'
  if (raw.includes('toxic') || raw.includes('metabolic') || raw.includes('iatrogenic')) return 'TOXICO_METABOLICA'
  if (raw.includes('idiopathic')) return 'IDIOPATICA'
  if (raw.includes('degenerative')) return normalizedName.includes('epilepsia idiopatica') ? 'IDIOPATICA' : 'DEGENERATIVA'
  if (raw.includes('anomal')) return 'DEGENERATIVA'
  if (raw.includes('neuro_emergency')) {
    if (normalizedName.includes('herni')) return 'COMPRESSIVA'
    if (normalizedName.includes('mielomal')) return 'TRAUMATICA'
    return 'VASCULAR'
  }

  if (normalizedName.includes('epilepsia idiopatica')) return 'IDIOPATICA'
  if (normalizedName.includes('miastenia')) return 'INFLAMATORIA'
  if (normalizedName.includes('wobbler') || normalizedName.includes('disco') || normalizedName.includes('cauda equina')) {
    return 'COMPRESSIVA'
  }
  if (normalizedName.includes('intoxic')) return 'TOXICO_METABOLICA'

  return 'IDIOPATICA'
}

function uniqueAxes(values: NeuroAxis[]): NeuroAxis[] {
  return Array.from(new Set(values))
}

export const ANALYSIS_DISEASE_CATALOG: AnalysisDiseaseCatalogEntry[] = ANALYSIS_DISEASE_CATALOG_RAW.map((entry) => {
  const name = repairText(entry.name_pt)
  const keyFeatures = entry.key_features.map((item) => repairText(item)).filter(Boolean)
  const normalizedName = normalizeText(name)

  return {
    id: entry.id,
    name,
    rawCategory: entry.category,
    category: mapCategory(entry.category, name),
    axes: uniqueAxes(entry.localizations.flatMap((item) => mapLocalization(item))),
    species: entry.species.filter((item): item is 'dog' | 'cat' => item === 'dog' || item === 'cat'),
    onset: entry.onset,
    course: entry.course,
    keyFeatures,
    priorityTests: [...entry.priority_tests],
    redFlags: [...entry.red_flags],
    evidenceLevel: entry.evidenceLevel,
    broadSyndrome:
      entry.id.startsWith('ddx_syn_') ||
      normalizedName.includes('suspeita clinica') ||
      normalizedName.includes('sindrome ') ||
      normalizedName.includes('provavel'),
  }
}).filter((entry) => entry.axes.length > 0)
