import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Home, Stethoscope, Database, History, Activity, ArrowLeft } from 'lucide-react'
import { cn } from '../../../lib/utils'
import '../theme-mobile.css'

const TABS = [
  { to: '/neuro-mobile', label: 'Início', end: true, icon: Home },
  { to: '/neuro-mobile/exame', label: 'Exame', end: false, icon: Stethoscope },
  { to: '/neuro-mobile/base-dados', label: 'Base', end: false, icon: Database },
  { to: '/neuro-mobile/historico', label: 'Histórico', end: false, icon: History },
  { to: '/neuro-mobile/glasgow', label: 'Glasgow', end: false, icon: Activity },
] as const

export function NeuroMobileShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    // Monitor documentElement classes to synchronize light/dark theme dynamically
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Calculate active tab title for header
  const activeTab = TABS.find((t) =>
    t.end ? location.pathname === t.to : location.pathname.startsWith(t.to)
  )
  const headerTitle = activeTab ? activeTab.label : 'Neuro Mobile'

  const handleBackToHub = () => {
    navigate('/hub')
  }

  return (
    <div className={cn('neurologia-mobile-shell w-full min-h-screen flex flex-col', isDark ? 'dark' : 'light')}>
      {/* Top Header */}
      <header className="sticky top-12 z-40 flex items-center justify-between border-b border-border bg-card/90 px-4 py-3 backdrop-blur-md">
        <button
          onClick={handleBackToHub}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground active:text-foreground transition-colors py-1 px-2 -ml-2 rounded-lg active:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Hub
        </button>
        <div className="flex items-center gap-2">
          <img src="/apps/NEURO.png" alt="" className="h-6 w-6 object-contain" />
          <h1 className="text-sm font-bold tracking-tight text-foreground">{headerTitle}</h1>
        </div>
        <div className="w-12" aria-hidden /> {/* Balance flex spacer */}
      </header>

      {/* Main Screen Outlet */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-28 neurologia-mobile-content-container nm-fade-in" key={location.pathname}>
        <Outlet />
      </main>

      {/* Bottom Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 nm-tabbar">
        <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.end
              ? location.pathname === tab.to
              : location.pathname.startsWith(tab.to)

            return (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive: linkActive }) =>
                  cn(
                    'flex flex-col items-center justify-center flex-1 h-full gap-1 text-[10px] font-semibold py-1 rounded-lg transition-all',
                    'active:scale-95',
                    linkActive ? 'text-gold font-bold' : 'text-slate-400 dark:text-slate-500'
                  )
                }
                style={({ isActive: linkActive }) => ({
                  color: linkActive ? 'var(--nm-gold)' : undefined,
                })}
              >
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.75} />
                <span>{tab.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
