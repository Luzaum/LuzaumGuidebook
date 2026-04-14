import type { LucideIcon } from 'lucide-react'
import {
  Bone,
  Brain,
  Bug,
  Dog,
  Droplets,
  FlaskConical,
  Heart,
  Pill,
  Scissors,
  Smile,
  TestTube2,
  Venus,
  Wind,
} from 'lucide-react'
import type { Disease, DiseaseSystem } from '../types'
import { safeList } from '../utils/dataUtils'

/** Identificadores estáveis das tags de sistema (filtro). */
export type ClinicalSystemTagId =
  | 'cardio'
  | 'neuro'
  | 'endocrino'
  | 'ortopedico'
  | 'cirurgia'
  | 'dermato'
  | 'odonto'
  | 'pneumo'
  | 'reprodutor'
  | 'urinario'
  | 'renal'
  | 'vascular_sepse'
  | 'gastro'

export interface ClinicalSystemTagDef {
  id: ClinicalSystemTagId
  label: string
  Icon: LucideIcon
  /** Classes Tailwind opcionais no ícone (ex.: cor de urina). */
  iconClassName?: string
}

/**
 * Ordem de exibição dos chips. Ícones Lucide alinhados ao pedido clínico.
 */
export const CLINICAL_SYSTEM_TAGS: ClinicalSystemTagDef[] = [
  { id: 'pneumo', label: 'Respiratório', Icon: Wind },
  { id: 'cardio', label: 'Cardiovascular', Icon: Heart },
  { id: 'vascular_sepse', label: 'Sepse / vascular', Icon: Bug },
  { id: 'reprodutor', label: 'Reprodutor', Icon: Venus },
  { id: 'urinario', label: 'Urinário', Icon: TestTube2 },
  { id: 'renal', label: 'Renal', Icon: Droplets },
  { id: 'gastro', label: 'Gastrointestinal', Icon: FlaskConical },
  { id: 'neuro', label: 'Neurológico', Icon: Brain },
  { id: 'endocrino', label: 'Endócrino', Icon: Pill },
  { id: 'ortopedico', label: 'Ortopédico', Icon: Bone },
  { id: 'cirurgia', label: 'Cirúrgico', Icon: Scissors },
  { id: 'dermato', label: 'Dermatológico', Icon: Dog },
  { id: 'odonto', label: 'Odontológico', Icon: Smile },
]

/** Liga cada chave de `DZ_SEED` a uma ou mais tags (OR no filtro). */
export const DISEASE_SYSTEM_KEY_TO_TAG_IDS: Record<string, ClinicalSystemTagId[]> = {
  'Sistema Respiratório': ['pneumo'],
  'Sistema Reprodutor': ['reprodutor'],
  'Sepse e instabilidade sistémica': ['vascular_sepse'],
  'Sistema Urinário': ['urinario', 'renal'],
}

export function tagIdsForDiseaseSystemKey(systemKey: string): ClinicalSystemTagId[] {
  return DISEASE_SYSTEM_KEY_TO_TAG_IDS[systemKey] ?? []
}

/** Primeira tag da chave de sistema — define a cor do card no catálogo (suspeita clínica). */
export function primaryCatalogTagForSystemKey(systemKey: string): ClinicalSystemTagId {
  const tags = tagIdsForDiseaseSystemKey(systemKey)
  return tags[0] ?? 'pneumo'
}

/**
 * Tema visual por sistema (fundo suave, borda e barra de destaque).
 * Cores alinhadas ao pedido clínico (resp. azul claro, cardio vermelho claro, etc.).
 */
export const CLINICAL_TAG_CARD_THEME: Record<
  ClinicalSystemTagId,
  { bg: string; border: string; accent: string; bgHover: string; bgSelected: string }
> = {
  pneumo: {
    bg: 'color-mix(in srgb, rgb(147 197 253) 38%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(147 197 253) 48%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(147 197 253) 52%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(59 130 246) 42%, hsl(var(--border)))',
    accent: 'rgb(37 99 235)',
  },
  cardio: {
    bg: 'color-mix(in srgb, rgb(252 165 165) 36%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(252 165 165) 46%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(252 165 165) 52%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(248 113 113) 40%, hsl(var(--border)))',
    accent: 'rgb(220 38 38)',
  },
  vascular_sepse: {
    bg: 'color-mix(in srgb, rgb(110 231 183) 34%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(110 231 183) 44%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(110 231 183) 50%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(52 211 153) 38%, hsl(var(--border)))',
    accent: 'rgb(5 150 105)',
  },
  reprodutor: {
    bg: 'color-mix(in srgb, rgb(244 114 182) 32%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(244 114 182) 42%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(244 114 182) 48%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(236 72 153) 36%, hsl(var(--border)))',
    accent: 'rgb(190 24 93)',
  },
  urinario: {
    /* Âmbar (amarelo urinário), distinto do neurológico (amarelo limão). */
    bg: 'color-mix(in srgb, rgb(251 191 36) 34%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(251 191 36) 44%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(251 191 36) 50%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(245 158 11) 40%, hsl(var(--border)))',
    accent: 'rgb(217 119 6)',
  },
  renal: {
    bg: 'color-mix(in srgb, rgb(214 211 209) 40%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(214 211 209) 50%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(214 211 209) 55%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(168 162 158) 45%, hsl(var(--border)))',
    accent: 'rgb(120 113 108)',
  },
  gastro: {
    bg: 'color-mix(in srgb, rgb(20 83 45) 16%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(20 83 45) 22%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(20 83 45) 26%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(22 101 52) 35%, hsl(var(--border)))',
    accent: 'rgb(22 101 52)',
  },
  neuro: {
    bg: 'color-mix(in srgb, rgb(254 240 138) 42%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(254 240 138) 52%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(254 240 138) 58%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(234 179 8) 38%, hsl(var(--border)))',
    accent: 'rgb(161 98 7)',
  },
  endocrino: {
    bg: 'color-mix(in srgb, rgb(251 146 60) 30%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(251 146 60) 40%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(251 146 60) 46%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(249 115 22) 38%, hsl(var(--border)))',
    accent: 'rgb(194 65 12)',
  },
  ortopedico: {
    bg: 'color-mix(in srgb, rgb(30 58 138) 18%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(30 58 138) 24%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(30 58 138) 28%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(29 78 216) 35%, hsl(var(--border)))',
    accent: 'rgb(29 78 216)',
  },
  cirurgia: {
    bg: 'color-mix(in srgb, rgb(127 29 29) 16%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(127 29 29) 22%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(127 29 29) 26%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(185 28 28) 38%, hsl(var(--border)))',
    accent: 'rgb(153 27 27)',
  },
  dermato: {
    bg: 'color-mix(in srgb, rgb(234 179 8) 28%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(234 179 8) 38%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(234 179 8) 44%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(202 138 4) 40%, hsl(var(--border)))',
    accent: 'rgb(161 98 7)',
  },
  odonto: {
    bg: 'color-mix(in srgb, rgb(34 211 238) 26%, hsl(var(--card)))',
    bgHover: 'color-mix(in srgb, rgb(34 211 238) 36%, hsl(var(--card)))',
    bgSelected: 'color-mix(in srgb, rgb(34 211 238) 42%, hsl(var(--card)))',
    border: 'color-mix(in srgb, rgb(6 182 212) 38%, hsl(var(--border)))',
    accent: 'rgb(8 145 178)',
  },
}

export function catalogCardThemeForSystemKey(systemKey: string) {
  const id = primaryCatalogTagForSystemKey(systemKey)
  return { tagId: id, theme: CLINICAL_TAG_CARD_THEME[id] }
}

export interface DiseaseCatalogEntry {
  systemKey: string
  disease: Disease
}

/** Lista plana de todas as fichas (uma entrada por doença). */
export function flattenDiseaseCatalog(dzDict: DiseaseSystem): DiseaseCatalogEntry[] {
  const out: DiseaseCatalogEntry[] = []
  for (const systemKey of Object.keys(dzDict).sort((a, b) => a.localeCompare(b, 'pt'))) {
    for (const dz of safeList(dzDict[systemKey])) {
      out.push({ systemKey, disease: dz })
    }
  }
  return out
}

/**
 * Contagem de fichas por tag: uma doença conta em cada tag associada à sua chave.
 * (Ex.: pielonefrite incrementa urinario e renal.)
 */
export function countDiseasesPerTag(dzDict: DiseaseSystem): Record<ClinicalSystemTagId, number> {
  const counts = {} as Record<ClinicalSystemTagId, number>
  for (const t of CLINICAL_SYSTEM_TAGS) {
    counts[t.id] = 0
  }
  for (const { systemKey } of flattenDiseaseCatalog(dzDict)) {
    for (const tid of tagIdsForDiseaseSystemKey(systemKey)) {
      counts[tid] = (counts[tid] ?? 0) + 1
    }
  }
  return counts
}

/**
 * Filtro OR: sem seleção → todas as fichas; com seleção → fichas cuja chave mapeia para alguma tag escolhida.
 */
export function filterDiseaseCatalogByTags(
  dzDict: DiseaseSystem,
  selectedTagIds: ReadonlySet<string>,
): DiseaseCatalogEntry[] {
  const all = flattenDiseaseCatalog(dzDict)
  if (selectedTagIds.size === 0) return all

  return all.filter(({ systemKey }) => {
    const tags = tagIdsForDiseaseSystemKey(systemKey)
    return tags.some((tid) => selectedTagIds.has(tid))
  })
}

/** Agrupa entradas filtradas por chave de sistema (para cabeçalhos de secção). */
export function groupCatalogBySystemKey(entries: DiseaseCatalogEntry[]): { systemKey: string; diseases: Disease[] }[] {
  const map = new Map<string, Disease[]>()
  for (const { systemKey, disease } of entries) {
    if (!map.has(systemKey)) map.set(systemKey, [])
    map.get(systemKey)!.push(disease)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, 'pt'))
    .map(([systemKey, diseases]) => ({ systemKey, diseases }))
}
