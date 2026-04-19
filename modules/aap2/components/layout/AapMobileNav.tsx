import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AppPage } from '../../types'
import { AAP_NAV_GROUPS, pageTitleForAppPage, type AapNavEntry } from './aapNavConfig'

interface AapMobileTopBarProps {
  onOpenMenu: () => void
  currentPage: AppPage
}

export function AapMobileTopBar({ onOpenMenu, currentPage }: AapMobileTopBarProps) {
  return (
    <header
      className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background/95 px-3 backdrop-blur-sm md:hidden"
    >
      <button
        type="button"
        onClick={onOpenMenu}
        className="rounded-lg p-2 text-foreground transition hover:bg-muted"
        aria-label="Abrir menu do módulo"
      >
        <Menu className="h-5 w-5" />
      </button>
      <span className="truncate text-center text-sm font-semibold text-foreground">
        {pageTitleForAppPage(currentPage)}
      </span>
      <span className="w-9 shrink-0" aria-hidden />
    </header>
  )
}

interface AapMobileDrawerProps {
  open: boolean
  onClose: () => void
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
  onAjuda: () => void
  onBackToHub: () => void
}

function handleEntryClick(
  entry: AapNavEntry,
  onNavigate: (page: AppPage) => void,
  onAjuda: () => void,
  onClose: () => void
) {
  if (entry.kind === 'action' && entry.id === 'ajuda') {
    onAjuda()
    onClose()
    return
  }
  if (entry.kind === 'page') {
    onNavigate(entry.page)
    onClose()
  }
}

export function AapMobileDrawer({
  open,
  onClose,
  currentPage,
  onNavigate,
  onAjuda,
  onBackToHub,
}: AapMobileDrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Fechar menu" onClick={onClose} />
      <aside className="absolute left-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col border-r border-border bg-card text-card-foreground shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-3 py-3">
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 text-left"
            onClick={() => {
              onNavigate('home')
              onClose()
            }}
            aria-label="Ir para início do módulo"
          >
            <img src="/apps/aap.png" alt="" className="h-10 w-10 shrink-0 rounded-lg object-contain" />
            <span className="truncate text-xs font-bold uppercase tracking-wide text-primary">
              Animais Peçonhentos
            </span>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 transition hover:bg-muted"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-4 overflow-y-auto p-2">
          {AAP_NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              {group.items.map((entry) => {
                const active = entry.kind === 'page' && entry.page === currentPage
                const Icon = entry.icon
                return (
                  <button
                    key={entry.kind === 'page' ? entry.page : entry.id}
                    type="button"
                    onClick={() => handleEntryClick(entry, onNavigate, onAjuda, onClose)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary/10 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]'
                        : 'text-card-foreground hover:bg-muted/80',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{entry.label}</span>
                    {entry.kind === 'page' && entry.badge ? (
                      <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {entry.badge}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
        <div className="border-t border-border p-2">
          <button
            type="button"
            onClick={() => {
              onBackToHub()
              onClose()
            }}
            className="w-full rounded-xl border border-border bg-background/80 px-3 py-2.5 text-center text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Voltar ao Hub
          </button>
        </div>
      </aside>
    </div>
  )
}
