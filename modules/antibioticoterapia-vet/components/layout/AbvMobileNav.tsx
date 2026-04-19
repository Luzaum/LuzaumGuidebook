import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AbvTab } from '../../types'
import { ABV_NAV_ITEMS } from './abvNavConfig'

const shortLabels: Partial<Record<AbvTab, string>> = {
  home: 'Início',
  syndrome: 'Suspeita clínica',
  diseases: 'Doenças',
  antibiotics: 'Antimicrobianos',
  pathogens: 'Microrganismos',
  perioperative: 'Perioperatório',
  'patient-context': 'Alertas',
  references: 'Referências',
}

interface AbvMobileTopBarProps {
  onOpenMenu: () => void
  activeTab: AbvTab
}

export function AbvMobileTopBar({ onOpenMenu, activeTab }: AbvMobileTopBarProps) {
  return (
    <header
      className="flex h-12 shrink-0 items-center justify-between border-b px-3 md:hidden"
      style={{
        background: 'hsl(var(--background))',
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--foreground))',
      }}
    >
      <button
        type="button"
        onClick={onOpenMenu}
        className="rounded-lg p-2 transition hover:opacity-90"
        style={{ color: 'hsl(var(--foreground))' }}
        aria-label="Abrir menu do módulo"
      >
        <Menu className="h-5 w-5" />
      </button>
      <span className="truncate text-sm font-semibold">{shortLabels[activeTab] ?? 'Antibioticoterapia Vet'}</span>
      <span className="w-9" aria-hidden />
    </header>
  )
}

interface AbvMobileDrawerProps {
  open: boolean
  onClose: () => void
  activeTab: AbvTab
  setActiveTab: (t: AbvTab) => void
}

export function AbvMobileDrawer({ open, onClose, activeTab, setActiveTab }: AbvMobileDrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Fechar menu" onClick={onClose} />
      <aside
        className="absolute left-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col border-r shadow-xl"
        style={{
          background: 'var(--sidebar)',
          borderColor: 'var(--sidebar-border)',
          color: 'var(--sidebar-foreground)',
        }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--sidebar-border)' }}>
          <button
            type="button"
            className="abv-sidebar-logo-btn flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 text-left"
            onClick={() => {
              setActiveTab('home')
              onClose()
            }}
            aria-label="Ir para início"
          >
            <img
              src="/apps/ATB.png"
              alt=""
              className="h-[6.75rem] w-auto max-w-[min(15rem,55%)] shrink-0 rounded-md object-contain"
            />
            <span className="truncate text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--sidebar-primary)' }}>
              Antibioticoterapia Vet
            </span>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 transition hover:opacity-80"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {ABV_NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setActiveTab(id)
                onClose()
              }}
              className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium')}
              style={
                activeTab === id
                  ? {
                      background: 'color-mix(in srgb, var(--sidebar-accent) 22%, transparent)',
                      color: 'var(--sidebar-primary)',
                    }
                  : { color: 'var(--sidebar-foreground)' }
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  )
}
