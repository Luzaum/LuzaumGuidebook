import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ToxSidebar } from './ToxSidebar'
import { AapMobileDrawer, AapMobileTopBar } from './AapMobileNav'
import type { AppPage } from '../../types'
import { pageTitleForAppPage } from './aapNavConfig'

interface AAP2LayoutProps {
  children: React.ReactNode
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
  onOpenEncyclopedia: (params?: { query?: string }) => void
  onAjuda: () => void
  onBackToHub: () => void
}

export const AAP2Layout: React.FC<AAP2LayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  onOpenEncyclopedia,
  onAjuda,
  onBackToHub,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const pageTitle = useMemo(() => pageTitleForAppPage(currentPage), [currentPage])

  const handleSearchSubmit = () => {
    const q = searchTerm.trim()
    if (q) {
      onOpenEncyclopedia({ query: q })
      setMobileNavOpen(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-background text-foreground md:flex-row">
      <div className="hidden h-full min-h-0 shrink-0 md:flex">
        <ToxSidebar activeKey={currentPage} onNavigate={onNavigate} onAjuda={onAjuda} onBackToHub={onBackToHub} />
      </div>

      <AapMobileTopBar onOpenMenu={() => setMobileNavOpen(true)} currentPage={currentPage} />
      <AapMobileDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
        onAjuda={onAjuda}
        onBackToHub={onBackToHub}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="hidden shrink-0 border-b border-border bg-card/60 px-4 py-3 backdrop-blur-sm md:block">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">{pageTitle}</h1>
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                className="w-full rounded-xl border border-input bg-background py-2 pl-10 pr-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                placeholder="Pesquisar na enciclopédia (espécies, toxinas, sintomas)…"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                aria-label="Pesquisar na enciclopédia"
              />
            </div>
          </div>
        </header>

        <main className="aap2-main-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 md:px-6 md:py-5">
          {children}
          <footer className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
            <p className="text-center">
              Conteúdo educativo de apoio à decisão clínica. Não substitui protocolo institucional nem relação médico-paciente.
            </p>
            <p className="mt-2 text-center">© {new Date().getFullYear()} Vetius — Animais Peçonhentos (AAP2)</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
