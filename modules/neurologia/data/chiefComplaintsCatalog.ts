import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  AlertCircle,
  Brain,
  Droplet,
  Ear,
  Eye,
  EyeOff,
  FlaskConical,
  Footprints,
  MoveDiagonal,
  Stethoscope,
  TrendingUp,
  Video,
  Zap,
} from 'lucide-react'

export type ChiefComplaintItem = {
  id: string
  label: string
  icon: LucideIcon
  keywords?: string
}

export type ChiefComplaintCategory = {
  id: string
  label: string
  description: string
  items: ChiefComplaintItem[]
}

/** Queixas principais curadas (cap. 1 — história clínica neurológica). */
export const CHIEF_COMPLAINT_CATEGORIES: ChiefComplaintCategory[] = [
  {
    id: 'paroxisms',
    label: 'Convulsões e paroxismos',
    description: 'Crises, episódios agudos ou movimentos involuntários',
    items: [
      { id: 'Convulsao', label: 'Convulsão', icon: Zap, keywords: 'focal generalizada crise epilepsia' },
      { id: 'ClusterConvulsoes', label: 'Cluster de convulsões', icon: Zap, keywords: 'status múltiplas crises' },
      { id: 'EpisodiosIndefinidos', label: 'Episódios indefinidos', icon: Video, keywords: 'vídeo paroxismo colapso' },
      { id: 'MovimentosInvoluntarios', label: 'Movimentos involuntários', icon: Activity, keywords: 'mioclonia fasciculação tremor' },
      { id: 'Sincope', label: 'Síncope / colapso', icon: TrendingUp, keywords: 'desmaio queda' },
    ],
  },
  {
    id: 'consciousness',
    label: 'Consciência e comportamento',
    description: 'Alterações mentais ou comportamentais',
    items: [
      { id: 'AlteracaoConsciencia', label: 'Alteração de consciência', icon: Brain, keywords: 'letargia estupor coma' },
      { id: 'Comportamento', label: 'Alteração comportamental', icon: Brain, keywords: 'agressividade desorientação' },
      { id: 'AndarCirculos', label: 'Andar em círculos / head pressing', icon: Activity, keywords: 'compulsivo' },
    ],
  },
  {
    id: 'vestibular',
    label: 'Vestibular e visual',
    description: 'Sinais de tronco, vestibular ou vias visuais',
    items: [
      { id: 'HeadTilt', label: 'Head tilt / vertigem', icon: Activity, keywords: 'inclinação cefálica vômito' },
      { id: 'Nistagmo', label: 'Nistagmo', icon: Eye, keywords: 'movimento ocular' },
      { id: 'Cegueira', label: 'Cegueira / déficit visual', icon: EyeOff, keywords: 'amaurose bumping' },
      { id: 'Anisocoria', label: 'Anisocoria / alteração pupilar', icon: EyeOff, keywords: 'midríase mióse' },
    ],
  },
  {
    id: 'motor',
    label: 'Motor e marcha',
    description: 'Fraqueza, ataxia ou alteração de deambulação',
    items: [
      { id: 'Paresia', label: 'Paresia / paralisia', icon: Footprints, keywords: 'hemi tetra para plegia fraqueza' },
      { id: 'Ataxia', label: 'Ataxia / descoordenação', icon: MoveDiagonal, keywords: 'hipermetria vestibular cerebelar' },
      { id: 'ArrastarPatas', label: 'Arrastar patas / knuckling', icon: Footprints, keywords: 'escorregar propriocepção' },
      { id: 'FraquezaFlacida', label: 'Fraqueza flácida', icon: Footprints, keywords: 'exercício intolerância LMN' },
    ],
  },
  {
    id: 'spinal',
    label: 'Dor espinhal',
    description: 'Dor vertebral ou claudicação radicular',
    items: [
      { id: 'DorCervical', label: 'Dor cervical', icon: AlertCircle, keywords: 'pescoço cervicalgia' },
      { id: 'DorToracolombar', label: 'Dor toracolombar', icon: AlertCircle, keywords: 'coluna dorsal' },
      { id: 'DorLombossacra', label: 'Dor lombossacra', icon: AlertCircle, keywords: 'cauda equina lombar' },
      { id: 'RootSignature', label: 'Claudicação / root signature', icon: Stethoscope, keywords: 'radicular' },
    ],
  },
  {
    id: 'cranial',
    label: 'Cranianos e autonômicos',
    description: 'NC, deglutição, urinário e sinais autonômicos',
    items: [
      { id: 'DisfuncaoFacial', label: 'Disfunção facial', icon: AlertCircle, keywords: 'paralisia facial' },
      { id: 'Disfagia', label: 'Disfagia / regurgitação', icon: Droplet, keywords: 'megaesôfago' },
      { id: 'DisfuncaoUrinaria', label: 'Disfunção urinária / fecal', icon: Droplet, keywords: 'incontinência retenção' },
      { id: 'Horner', label: 'Síndrome de Horner', icon: Eye, keywords: 'mióse ptose' },
      { id: 'Surdez', label: 'Surdez / hipoacusia', icon: Ear, keywords: 'audição' },
    ],
  },
  {
    id: 'other',
    label: 'Outros',
    description: 'Sinais adicionais ou descrição livre',
    items: [{ id: 'Outros', label: 'Outros sinais neurológicos', icon: FlaskConical, keywords: 'diversos' }],
  },
]

export const ALL_CATALOG_COMPLAINTS = CHIEF_COMPLAINT_CATEGORIES.flatMap((category) => category.items)
