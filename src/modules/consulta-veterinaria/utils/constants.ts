export const CONSULTA_VET_BASE_ROUTE = '/consulta-veterinaria'

export const STORAGE_KEYS = {
  favorites: 'vetius:consulta-veterinaria:favorites:v1',
  recents: 'vetius:consulta-veterinaria:recents:v1',
  notes: 'vetius:consulta-veterinaria:notes:v1',
  pdfProgress: 'vetius:consulta-veterinaria:pdf-progress:v1',
  diseaseProgress: 'vetius:consulta-veterinaria:disease-progress:v1',
} as const

export const MODULE_SHORTCUTS = [
  { label: 'Doenças', href: `${CONSULTA_VET_BASE_ROUTE}/doencas` },
  { label: 'Medicamentos', href: `${CONSULTA_VET_BASE_ROUTE}/medicamentos` },
  { label: 'Consensos', href: `${CONSULTA_VET_BASE_ROUTE}/consensos` },
  { label: 'Categorias', href: `${CONSULTA_VET_BASE_ROUTE}/categorias` },
  { label: 'Favoritos', href: `${CONSULTA_VET_BASE_ROUTE}/favoritos` },
  { label: 'Recentes', href: `${CONSULTA_VET_BASE_ROUTE}/recentes` },
] as const

export const SPECIES_LABELS = {
  dog: 'Cão',
  cat: 'Gato',
  both: 'Cão e gato',
} as const

