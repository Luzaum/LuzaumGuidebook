import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './receituarioChrome.css'

type RxSection =
  | 'hub'
  | 'home'
  | 'nova'
  | 'drafts'
  | 'perfil'
  | 'clientes'
  | 'catalogo'
  | 'catalogo2'
  | 'catalogo3'
  | 'protocolos'
  | 'controle'
  | 'templates'
  | 'settings'
  | 'dev'
  | 'print'
type RxTheme = 'dark' | 'light'

const THEME_KEY = 'receituario-vet:theme:v1'

const NAV_ITEMS: Array<{ key: RxSection; label: string; to: string; icon: string }> = [
  { key: 'hub', label: 'HUB', to: '/receituario-vet', icon: 'hub' },
  { key: 'nova', label: 'Nova Receita', to: '/receituario-vet/nova-receita', icon: 'description' },
  { key: 'catalogo3', label: 'Catálogo 3.0', to: '/receituario-vet/catalogo3', icon: 'inventory_2' },
  { key: 'catalogo2', label: 'Catálogo 2.0', to: '/receituario-vet/catalogo2', icon: 'inventory_2' },
  { key: 'catalogo', label: 'Catálogo', to: '/receituario-vet/catalogo', icon: 'inventory_2' },
  { key: 'drafts', label: 'Rascunhos', to: '/receituario-vet/rascunhos', icon: 'draft' },
  { key: 'clientes', label: 'Tutores e Pacientes', to: '/receituario-vet/clientes', icon: 'group' },
  { key: 'controle', label: 'Controle Especial', to: '/receituario-vet/controle-especial', icon: 'shield' },
  { key: 'protocolos', label: 'Protocolos', to: '/receituario-vet/protocolos', icon: 'inventory_2' },
  { key: 'perfil', label: 'Configurar Médico', to: '/receituario-vet/configuração', icon: 'assignment_ind' },
  { key: 'templates', label: 'Templates', to: '/receituario-vet/templates', icon: 'palette' },
  { key: 'settings', label: 'Configurações', to: '/receituario-vet/configurações', icon: 'settings' },
  { key: 'dev', label: 'Desenvolvimento', to: '/receituario-vet/desenvolvimento', icon: 'science' },
]

function readTheme(): RxTheme {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    return raw === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function saveTheme(theme: RxTheme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // noop
  }
}

interface SidebarUserIdentity {
  name: string
  id: string
}

function readSidebarUserIdentity(): SidebarUserIdentity {
  try {
    const raw = localStorage.getItem('luzaum-user')
    if (raw) {
      const parsed = JSON.parse(raw) as {
        id?: string
        name?: string
        fullName?: string
        email?: string
      }
      const nameSource = String(parsed?.name || parsed?.fullName || parsed?.email || '').trim()
      const idSource = String(parsed?.id || '').trim()
      return {
        name: nameSource || 'Usuário VETIUS',
        id: idSource || 'local',
      }
    }
  } catch {
    // noop
  }
  return { name: 'Usuário VETIUS', id: 'local' }
}

interface ReceituarioChromeProps {
  section: RxSection
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

function SidebarContent({
  section,
  locationPath,
  expanded,
  pinned,
  onTogglePin,
  user,
}: {
  section: RxSection
  locationPath: string
  expanded: boolean
  pinned: boolean
  onTogglePin: () => void
  user: SidebarUserIdentity
}) {
  return (
    <div className={`rxv-sidebar h-full ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="rxv-sidebar-head">
        <button
          type="button"
          className="rxv-sidebar-toggle rxv-sidebar-toggle-compact"
          title={expanded ? 'Guardar menu lateral' : 'Abrir menu lateral'}
          onClick={onTogglePin}
        >
          <span className="material-symbols-outlined text-[18px]">{expanded ? 'left_panel_close' : 'right_panel_open'}</span>
          <span className="rxv-sidebar-toggle-label">{pinned ? 'Guardar menu' : 'Fixar menu'}</span>
        </button>
      </div>

      <div className="rxv-sidebar-rail-top" />

      <nav className="rxv-sidebar-nav">
        <Link to="/receituario-vet" className="rxv-sidebar-app-logo" title="Voltar para página inicial do Receituário">
          <img src="/apps/REECEITA.png" alt="Logo do app Receituário Vet" className="rxv-sidebar-app-logo-image" />
          <span className="rxv-sidebar-app-logo-title">ReceituarioVET</span>
        </Link>

        {NAV_ITEMS.map((item) => {
          const active = section === item.key || locationPath === item.to
          return (
            <Link key={item.key} to={item.to} className={`rxv-nav-item ${active ? 'active' : ''}`} title={item.label}>
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="rxv-nav-label">{item.label}</span>
              {active ? <span className="rxv-nav-active-dot" aria-hidden="true" /> : null}
            </Link>
          )
        })}

        <button
          type="button"
          className="rxv-nav-item rxv-nav-toggle"
          title={pinned ? 'Guardar menu lateral' : 'Fixar menu lateral'}
          onClick={onTogglePin}
        >
          <span className="material-symbols-outlined text-[20px]">{pinned ? 'left_panel_close' : 'right_panel_open'}</span>
          <span className="rxv-nav-label">{pinned ? 'Guardar menu' : 'Fixar menu'}</span>
        </button>
      </nav>

      <div className="rxv-sidebar-footer">
        <Link to="/hub" className="rxv-sidebar-user" title={`${user.name} - ID ${user.id}`}>
          <span className="material-symbols-outlined text-[18px]">account_circle</span>
          <span className="rxv-sidebar-user-copy">
            <strong>{user.name}</strong>
            <small>ID {user.id}</small>
          </span>
        </Link>
      </div>

      <div className="rxv-sidebar-rail-bottom" />
    </div>
  )
}

export default function ReceituarioChrome({ section, title, subtitle, actions, children }: ReceituarioChromeProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState<RxTheme>(() => readTheme())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarPinned, setSidebarPinned] = useState(true)
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const [sidebarUser] = useState<SidebarUserIdentity>(() => readSidebarUserIdentity())

  useEffect(() => {
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!sidebarPinned) setSidebarHovered(false)
  }, [sidebarPinned])

  const dark = theme === 'dark'

  useEffect(() => {
    // Keep body background synced with this module to avoid visual bleed.
    document.body.style.backgroundColor = dark ? '#091108' : '#eef6ea'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [dark])

  const pageClass = dark ? 'rxv-dark' : 'rxv-light'
  const sidebarExpanded = sidebarPinned || sidebarHovered
  const sidebarClass = `rxv-sidebar-shell ${sidebarExpanded ? 'expanded' : 'collapsed'}`
  const handleTopbarMenuClick = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      setSidebarPinned((prev) => !prev)
      setSidebarHovered(false)
      return
    }
    setMobileMenuOpen(true)
  }

  const topRight = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rxv-icon-btn"
          title={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        >
          <span className="material-symbols-outlined text-[20px]">{dark ? 'light_mode' : 'dark_mode'}</span>
        </button>
        <button
          type="button"
          className="rxv-icon-btn"
          title="Home do Receituário Vet"
          onClick={() => navigate('/receituario-vet')}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
        </button>
      </div>
    ),
    [dark, navigate]
  )

  return (
    <div className={`rxv-page ${pageClass}`}>
      <div className="rxv-bg-layer" />

      <div className="rxv-layout">
        <aside
          className={`rxv-desktop-sidebar ${sidebarClass}`}
          onMouseEnter={() => {
            if (!sidebarPinned) setSidebarHovered(true)
          }}
          onMouseLeave={() => {
            if (!sidebarPinned) setSidebarHovered(false)
          }}
        >
          <SidebarContent
            section={section}
            locationPath={location.pathname}
            expanded={sidebarExpanded}
            pinned={sidebarPinned}
            onTogglePin={() => setSidebarPinned((prev) => !prev)}
            user={sidebarUser}
          />
        </aside>

        <main className="rxv-main-content">
          <header className="rxv-topbar">
            <div className="rxv-topbar-row">
              <div className="flex items-center gap-2">
                <button type="button" className="rxv-icon-btn rxv-top-menu-btn" onClick={handleTopbarMenuClick} title={sidebarPinned ? 'Guardar menu lateral' : 'Abrir menu lateral'}>
                  <span className="material-symbols-outlined text-[20px]">menu</span>
                </button>
              </div>

              <button
                type="button"
                className="rxv-top-logo"
                title="Ir para página inicial do VETIUS"
                onClick={() => navigate('/hub')}
              >
                <img src="/apps/VETIUS.png" alt="Ícone VETIUS" className="rxv-top-logo-image" />
                <span className="rxv-top-logo-text">VETIUS</span>
              </button>

              <div className="flex justify-end">{topRight}</div>
            </div>
          </header>

          <section className="rxv-main">
            <div className="mx-auto max-w-[1900px]">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
                  {subtitle ? <p className="text-sm text-[color:var(--rxv-muted)]">{subtitle}</p> : null}
                </div>
                {actions ? <div className="rxv-action-row">{actions}</div> : null}
              </div>
              <div className="rxv-form">{children}</div>
            </div>
          </section>
        </main>
      </div>

      {mobileMenuOpen ? (
        <div className="rxv-mobile-overlay lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <aside className="rxv-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <SidebarContent
              section={section}
              locationPath={location.pathname}
              expanded={true}
              pinned={true}
              onTogglePin={() => setMobileMenuOpen(false)}
              user={sidebarUser}
            />
          </aside>
        </div>
      ) : null}
    </div>
  )
}
