import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Search,
  Sparkles,
  Stethoscope,
  HelpCircle,
} from 'lucide-react'
import type { AppPage } from '../../types'

export type AapNavEntry =
  | { kind: 'page'; page: AppPage; label: string; icon: LucideIcon; badge?: string }
  | { kind: 'action'; id: 'ajuda'; label: string; icon: LucideIcon }

/** Navegação principal — apenas chaves válidas de `AppPage` ou ação Ajuda. */
export const AAP_NAV_GROUPS: { title: string; items: AapNavEntry[] }[] = [
  {
    title: 'Início',
    items: [{ kind: 'page', page: 'home', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Clínica',
    items: [
      { kind: 'page', page: 'suspeitas', label: 'Suspeitas', icon: Search },
      { kind: 'page', page: 'tratamentos', label: 'Protocolos', icon: ClipboardList },
      { kind: 'page', page: 'nova_consulta', label: 'Nova triagem', icon: Stethoscope },
    ],
  },
  {
    title: 'Referência',
    items: [{ kind: 'page', page: 'enciclopedia', label: 'Enciclopédia', icon: BookOpen }],
  },
  {
    title: 'Ferramentas',
    items: [
      { kind: 'page', page: 'histórico', label: 'Dr. Luzaum AI', icon: Sparkles, badge: 'IA' },
      { kind: 'action', id: 'ajuda', label: 'Ajuda do módulo', icon: HelpCircle },
    ],
  },
]

export function pageTitleForAppPage(page: AppPage): string {
  switch (page) {
    case 'home':
      return 'Dashboard'
    case 'enciclopedia':
      return 'Enciclopédia'
    case 'suspeitas':
      return 'Suspeitas clínicas'
    case 'tratamentos':
      return 'Protocolos de tratamento'
    case 'nova_consulta':
      return 'Nova triagem — Dr. Luzaum'
    case 'relatório':
      return 'Relatório — Dr. Luzaum'
    case 'relatorio_detalhado':
      return 'Relatório detalhado'
    case 'histórico':
      return 'Histórico — Dr. Luzaum'
    default:
      return 'Animais Peçonhentos'
  }
}
