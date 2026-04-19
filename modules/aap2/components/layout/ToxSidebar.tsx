import React, { useEffect, useState } from 'react'
import { PanelLeftClose, PanelLeftOpen, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AppPage } from '../../types'
import { AAP_NAV_GROUPS, type AapNavEntry } from './aapNavConfig'

const STORAGE_KEY = 'aap2-sidebar-collapsed'

interface ToxSidebarProps {
  activeKey: AppPage
  onNavigate: (page: AppPage) => void
  onAjuda: () => void
  onBackToHub: () => void
}

function NavButton({
  entry,
  active,
  collapsed,
  onNavigate,
  onAjuda,
}: {
  entry: AapNavEntry
  active: boolean
  collapsed: boolean
  onNavigate: (page: AppPage) => void
  onAjuda: () => void
}) {
  const Icon = entry.icon

  if (entry.kind === 'action') {
    return (
      <button
        type="button"
        onClick={onAjuda}
        className={cn(
          'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
          collapsed ? 'justify-center px-0' : '',
          'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
        title={collapsed ? entry.label : undefined}
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground">
          <Icon className="h-4 w-4" />
        </span>
        {!collapsed ? <span className="min-w-0 truncate">{entry.label}</span> : null}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate(entry.page)}
      className={cn(
        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
        collapsed ? 'justify-center px-0' : '',
        active
          ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
          : 'text-foreground/90 hover:bg-muted/90',
      )}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? entry.label : undefined}
    >
      <span
        className={cn(
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
          active
            ? 'border-primary/35 bg-primary/10 text-primary'
            : 'border-border bg-card text-muted-foreground group-hover:text-foreground',
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      {!collapsed ? (
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate font-medium">{entry.label}</span>
          {entry.badge ? (
            <span className="ml-auto shrink-0 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              {entry.badge}
            </span>
          ) : null}
        </span>
      ) : null}
    </button>
  )
}

export function ToxSidebar({ activeKey, onNavigate, onAjuda, onBackToHub }: ToxSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setCollapsed(true)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return (
    <aside
      className={cn(
        'flex h-full min-h-0 shrink-0 flex-col border-r border-border bg-card/95 text-card-foreground backdrop-blur-sm transition-[width] duration-200',
        collapsed ? 'w-[4.25rem]' : 'w-64',
      )}
      aria-label="Navegação do módulo"
    >
      <div className="flex items-center gap-2 border-b border-border p-2">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={cn(
            'flex min-w-0 flex-1 items-center gap-2 rounded-xl py-2 text-left transition hover:bg-muted/80',
            collapsed ? 'justify-center px-0' : 'px-2',
          )}
          aria-label="Início — Animais Peçonhentos"
        >
          <img
            src="/apps/aap.png"
            alt=""
            className="h-9 w-9 shrink-0 rounded-lg object-contain"
          />
          {!collapsed ? (
            <span className="min-w-0 truncate text-sm font-semibold text-foreground">Peçonhentos</span>
          ) : null}
        </button>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
          title={collapsed ? 'Expandir' : 'Recolher'}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-2 py-3">
        {AAP_NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed ? (
              <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
            ) : (
              <div className="mx-auto h-px w-6 bg-border" aria-hidden />
            )}
            {group.items.map((entry) => (
              <NavButton
                key={entry.kind === 'page' ? entry.page : entry.id}
                entry={entry}
                active={entry.kind === 'page' && entry.page === activeKey}
                collapsed={collapsed}
                onNavigate={onNavigate}
                onAjuda={onAjuda}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-2">
        <button
          type="button"
          onClick={onBackToHub}
          className={cn(
            'flex w-full items-center gap-2 rounded-xl border border-border bg-background/80 px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted',
            collapsed ? 'justify-center px-0' : '',
          )}
          title={collapsed ? 'Voltar ao Hub' : undefined}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {!collapsed ? <span>Voltar ao Hub</span> : null}
        </button>
      </div>
    </aside>
  )
}
