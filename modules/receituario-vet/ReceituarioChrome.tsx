import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './receituarioChrome.css'

type RxSection =
  | 'home'
  | 'nova'
  | 'drafts'
  | 'perfil'
  | 'clientes'
  | 'catalogo'
  | 'protocolos'
  | 'controle'
  | 'templates'
  | 'settings'
  | 'print'
type RxTheme = 'dark' | 'light'

const THEME_KEY = 'receituario-vet:theme:v1'

const NAV_ITEMS: Array<{ key: RxSection; label: string; to: string; icon: string }> = [
  { key: 'home', label: 'Home', to: '/receituario-vet', icon: 'grid_view' },
  { key: 'nova', label: 'Nova Receita', to: '/receituario-vet/nova-receita', icon: 'description' },
  { key: 'drafts', label: 'Rascunhos', to: '/receituario-vet/rascunhos', icon: 'draft' },
  { key: 'protocolos', label: 'Protocolos', to: '/receituario-vet/protocolos', icon: 'inventory_2' },
  { key: 'controle', label: 'Controle Especial', to: '/receituario-vet/controle-especial', icon: 'shield' },
  { key: 'perfil', label: 'Configurar Médico', to: '/receituario-vet/configuracao', icon: 'assignment_ind' },
  { key: 'clientes', label: 'Tutores e Pacientes', to: '/receituario-vet/clientes', icon: 'group' },
  { key: 'catalogo', label: 'Catálogo', to: '/receituario-vet/catalogo', icon: 'content_paste' },
  { key: 'templates', label: 'Templates', to: '/receituario-vet/templates', icon: 'palette' },
  { key: 'settings', label: 'Configurações', to: '/receituario-vet/configuracoes', icon: 'settings' },
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
      <div className="rxv-sidebar-brand-wrap">
        <button type="button" className="rxv-sidebar-brand" title="Receituário Vet" onClick={onTogglePin}>
          <img src="/images/receituario-vet/reeceita.png" alt="Logo Receituário Vet" className="rxv-sidebar-brand-logo" />
          <span className="rxv-sidebar-brand-copy">
            <strong>Receituário Vet</strong>
            <small>{pinned ? 'Menu fixo' : 'Menu automático'}</small>
          </span>
          <span className="material-symbols-outlined text-[18px]">{expanded ? 'left_panel_close' : 'right_panel_open'}</span>
        </button>
      </div>

      <div className="rxv-sidebar-rail-top" />

      <nav className="rxv-sidebar-nav">
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
  const [sidebarPinned, setSidebarPinned] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const [sidebarUser] = useState<SidebarUserIdentity>(() => readSidebarUserIdentity())

  useEffect(() => {
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

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

  const topRight = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rxv-icon-btn hidden lg:inline-flex"
          title={sidebarPinned ? 'Recolher menu lateral' : 'Fixar menu lateral'}
          onClick={() => setSidebarPinned((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-[20px]">{sidebarPinned ? 'left_panel_close' : 'right_panel_open'}</span>
        </button>
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
    [dark, navigate, sidebarPinned]
  )

  return (
    <div className={`rxv-page ${pageClass}`}>
      <div className="rxv-bg-layer" />

      <div className="rxv-layout">
        <aside
          className={`rxv-desktop-sidebar ${sidebarClass}`}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
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
                <button type="button" className="rxv-icon-btn lg:hidden" onClick={() => setMobileMenuOpen(true)} title="Abrir menu">
                  <span className="material-symbols-outlined text-[20px]">menu</span>
                </button>
              </div>

              <button
                type="button"
                className="rxv-top-logo"
                title="Voltar para Home VETIUS"
                onClick={() => navigate('/hub')}
              >
                <img src="/apps/VETIUS.png" alt="Ícone VETIUS" className="h-5 w-5 rounded-sm object-contain" />
                <span>VETIUS</span>
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
