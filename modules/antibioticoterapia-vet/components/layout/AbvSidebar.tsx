import { useEffect, useState } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AbvTab } from '../../types'
import { ABV_NAV_ITEMS } from './abvNavConfig'

const STORAGE_KEY = 'abv-sidebar-collapsed'

interface AbvSidebarProps {
  activeTab: AbvTab
  setActiveTab: (t: AbvTab) => void
}

export function AbvSidebar({ activeTab, setActiveTab }: AbvSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      const v = sessionStorage.getItem(STORAGE_KEY)
      if (v === '1') setCollapsed(true)
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
        'abv-sidebar hidden h-full shrink-0 flex-col border-r transition-[width] duration-200 md:flex',
        collapsed ? 'w-[4.25rem]' : 'w-64',
      )}
      style={{
        background: 'var(--sidebar)',
        borderColor: 'var(--sidebar-border)',
        color: 'var(--sidebar-foreground)',
      }}
    >
      <div className={cn('border-b p-4', collapsed && 'px-2')} style={{ borderColor: 'var(--sidebar-border)' }}>
        <div
          className="overflow-hidden rounded-2xl border p-2"
          style={{
            borderColor: 'var(--sidebar-border)',
            background: 'color-mix(in srgb, var(--sidebar) 88%, var(--foreground) 4%)',
          }}
        >
          <button
            type="button"
            className="abv-sidebar-logo-btn"
            onClick={() => setActiveTab('home')}
            aria-label="Ir para início"
          >
            <img
              src="/apps/ATB.png"
              alt=""
              className={cn(
                'mx-auto w-full rounded-lg object-contain',
                collapsed ? 'h-14 max-h-[3.25rem] max-w-[3.25rem]' : 'h-72 max-h-[min(18rem,calc(100vh-14rem))] max-w-[min(100%,12rem)]',
              )}
            />
          </button>
        </div>
        {!collapsed && (
          <p
            className="mt-3 text-center text-[11px] font-bold uppercase leading-tight tracking-[0.12em] sm:text-xs sm:tracking-[0.18em]"
            style={{ color: 'var(--sidebar-primary)' }}
          >
            Antibioticoterapia Vet
          </p>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3">
        {ABV_NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            title={collapsed ? label : undefined}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl py-2.5 text-left text-sm font-medium transition-colors',
              collapsed ? 'justify-center px-0' : 'px-3',
            )}
            style={
              activeTab === id
                ? {
                    background: 'color-mix(in srgb, var(--sidebar-accent) 22%, transparent)',
                    color: 'var(--sidebar-primary)',
                    boxShadow: '0 0 0 1px color-mix(in srgb, var(--sidebar-ring) 35%, transparent)',
                  }
                : {
                    color: 'var(--sidebar-foreground)',
                  }
            }
            onMouseEnter={(e) => {
              if (activeTab === id) return
              e.currentTarget.style.background = 'color-mix(in srgb, var(--foreground) 6%, transparent)'
            }}
            onMouseLeave={(e) => {
              if (activeTab === id) return
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="min-w-0 flex-1 leading-snug">{label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t p-2" style={{ borderColor: 'var(--sidebar-border)' }}>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition hover:opacity-90"
          style={{ color: 'var(--muted-foreground)' }}
          aria-expanded={!collapsed}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </aside>
  )
}
