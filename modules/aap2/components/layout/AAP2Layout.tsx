import React, { useMemo, useState } from 'react'
import { ToxSidebar } from './ToxSidebar'
import type { AppPage } from '../../types'
import { VetiusAppTopbar } from '../../../../components/VetiusAppTopbar'
import '../dashboard/dashboard.css'

interface AAP2LayoutProps {
  children: React.ReactNode
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
  onOpenEncyclopedia: (params?: { query?: string }) => void
  isDarkMode: boolean
  toggleTheme: () => void
  onBackToHub: () => void
}

export const AAP2Layout: React.FC<AAP2LayoutProps> = ({
  children,
  currentPage,
  onNavigate,
  onOpenEncyclopedia,
  isDarkMode,
  toggleTheme,
  onBackToHub,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isSidebarPinned, setIsSidebarPinned] = useState(false)
  const [isSidebarHover, setIsSidebarHover] = useState(false)

  const sidebarVisible = isSidebarPinned || isSidebarHover

  const pageTitle = useMemo(() => {
    if (currentPage === 'home') return 'Dashboard'
    if (currentPage === 'enciclopedia') return 'Enciclopedia'
    if (currentPage === 'suspeitas') return 'Suspeitas'
    if (currentPage === 'tratamentos') return 'Protocolos'
    return currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('_', ' ')
  }, [currentPage])

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      onOpenEncyclopedia({ query: searchTerm.trim() })
    }
  }

  const handleTopbarMenuClick = () => {
    setIsSidebarPinned((prev) => !prev)
    setIsSidebarHover(false)
  }

  return (
    <div className={`relative h-screen w-full overflow-hidden font-display ${isDarkMode ? 'bg-[#171121] text-slate-100' : 'bg-[#f3f4f6] text-slate-900'}`}>
      <div
        className="absolute left-0 top-0 z-[85] h-full w-4"
        onMouseEnter={() => {
          if (!isSidebarPinned) setIsSidebarHover(true)
        }}
        onMouseLeave={() => {
          if (!isSidebarPinned) setIsSidebarHover(false)
        }}
        aria-hidden="true"
      />

      <div
        className={`absolute left-0 top-0 z-[100] h-full w-[320px] transition-transform duration-300 ease-out ${sidebarVisible ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
        onMouseEnter={() => {
          if (!isSidebarPinned) setIsSidebarHover(true)
        }}
        onMouseLeave={() => {
          if (!isSidebarPinned) setIsSidebarHover(false)
        }}
      >
        <ToxSidebar
          activeKey={currentPage}
          collapsed={isSidebarCollapsed}
          onToggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onNavigate={onNavigate}
          onBackToHub={onBackToHub}
          isDarkMode={isDarkMode}
        />
      </div>

      <main className="relative z-10 h-full w-full overflow-hidden">
        <div className={`absolute top-0 right-0 -z-10 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-200/40'}`} />
        <div className={`absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full blur-3xl pointer-events-none ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/40'}`} />

        <VetiusAppTopbar
          isDark={isDarkMode}
          onMenuClick={handleTopbarMenuClick}
          onHubClick={onBackToHub}
          onThemeToggle={toggleTheme}
          onHomeClick={() => onNavigate('home')}
          className={isDarkMode ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-white/80'}
          buttonClassName={isDarkMode ? 'border-white/10 bg-slate-900/80 text-slate-200 hover:bg-slate-800' : 'border-slate-200 bg-white/90 text-slate-700 hover:bg-white'}
          logoClassName={isDarkMode ? 'hover:bg-slate-900/70' : 'hover:bg-slate-100/90'}
          logoTextClassName={isDarkMode ? 'text-slate-100' : 'text-slate-900'}
        />

        <div className="h-full overflow-y-auto scroll-smooth px-4 pb-20 pt-6 md:px-8">
          <div className={`mb-6 rounded-2xl border px-4 py-4 backdrop-blur-md md:px-5 ${isDarkMode ? 'border-slate-800 bg-slate-900/45' : 'border-slate-200 bg-white/70'}`}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className={`text-xl font-black tracking-tight md:text-2xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {pageTitle}
              </h2>
              <div className="group relative w-full max-w-xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                  <span className="material-symbols-outlined text-slate-400 transition-colors group-focus-within:text-[#7e40e7]">search</span>
                </div>
                <input
                  className={`block w-full rounded-xl border-none py-2.5 pl-10 pr-3 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7e40e7]/50 ${isDarkMode ? 'bg-slate-800/80 text-white placeholder-slate-500 hover:bg-slate-800 focus:bg-slate-800' : 'bg-white/60 text-slate-900 placeholder-slate-400 focus:bg-white'}`}
                  placeholder="Pesquisar por especies, toxinas ou sintomas..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
              </div>
            </div>
          </div>

          {children}

          <div className={`mt-10 flex flex-col items-center justify-between border-t pt-6 text-xs md:flex-row ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
            <p>© 2026 AAP2 Vetius. Todos os direitos reservados.</p>
            <div className="mt-2 flex gap-4 md:mt-0">
              <span className="cursor-pointer hover:text-[#7e40e7]">Termos de Uso</span>
              <span className="cursor-pointer hover:text-[#7e40e7]">Privacidade</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
