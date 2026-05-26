import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TopRightAuthMenu } from '@/src/components/TopRightAuthMenu'
import Logo from '../../components/Logo'
import {
  Grid,
  FilePlus2,
  BookOpen,
  FlaskConical,
  FileClock,
  Users,
  ShieldAlert,
  ClipboardList,
  UserCog,
  Layers,
  Settings,
  PanelLeftClose,
  PanelRightOpen
} from 'lucide-react'
import { LayoutGroup, motion } from 'framer-motion'
import './receituarioChrome.css'

type RxSection =
  | 'hub'
  | 'home'
  | 'nova'
  | 'manipulados'
  | 'drafts'
  | 'perfil'
  | 'clientes'
  | 'catalogo'
  | 'catalogo2'
  | 'catalogo3'
  | 'protocolos'
  | 'protocolos3'
  | 'controle'
  | 'templates'
  | 'settings'
  | 'historico'
  | 'print'
type RxTheme = 'dark' | 'light'
type RxAccent = 'sky' | 'emerald' | 'amber' | 'violet' | 'rose' | 'indigo' | 'orange' | 'cyan' | 'slate' | 'pink' | 'teal'

interface RxNavItem {
  key: RxSection
  label: string
  to: string
  icon: React.ComponentType<{ className?: string }>
  accent: RxAccent
}

interface RxNavGroup {
  title: string
  items: RxNavItem[]
}

const THEME_KEY = 'receituario-vet:theme:v1'

// ✅ Menu agrupado e modernizado com ícones Lucide e cores accents customizadas
const NAV_GROUPS: RxNavGroup[] = [
  {
    title: 'Atendimento Clínico',
    items: [
      { key: 'hub', label: 'HUB', to: '/receituario-vet', icon: Grid, accent: 'sky' },
      { key: 'nova', label: 'Nova Receita', to: '/receituario-vet/nova-receita-2', icon: FilePlus2, accent: 'emerald' },
      { key: 'clientes', label: 'Tutores e Pacientes', to: '/receituario-vet/clientes', icon: Users, accent: 'indigo' },
      { key: 'drafts', label: 'Rascunhos', to: '/receituario-vet/rascunhos', icon: FileClock, accent: 'rose' },
    ],
  },
  {
    title: 'Bases & Protocolos',
    items: [
      { key: 'catalogo3', label: 'Catálogo', to: '/receituario-vet/catalogo3', icon: BookOpen, accent: 'amber' },
      { key: 'manipulados', label: 'Manipulados', to: '/receituario-vet/manipulados', icon: FlaskConical, accent: 'violet' },
      { key: 'protocolos3', label: 'Protocolos', to: '/receituario-vet/protocolos-3', icon: ClipboardList, accent: 'cyan' },
      { key: 'controle', label: 'Controle Especial', to: '/receituario-vet/controle-especial', icon: ShieldAlert, accent: 'orange' },
    ],
  },
  {
    title: 'Preferências',
    items: [
      { key: 'perfil', label: 'Configurar Médico', to: '/receituario-vet/configuração', icon: UserCog, accent: 'slate' },
      { key: 'templates', label: 'Templates', to: '/receituario-vet/templates', icon: Layers, accent: 'pink' },
      { key: 'settings', label: 'Configurações', to: '/receituario-vet/configurações', icon: Settings, accent: 'teal' },
    ],
  },
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
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
  forcedTheme?: RxTheme
  onThemeChange?: (theme: RxTheme) => void
}

function SidebarContent({
  section,
  locationPath,
  expanded,
  pinned,
  onTogglePin,
}: {
  section: RxSection
  locationPath: string
  expanded: boolean
  pinned: boolean
  onTogglePin: () => void
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
          {expanded ? (
            <PanelLeftClose className="h-[18px] w-[18px] stroke-[2.5]" />
          ) : (
            <PanelRightOpen className="h-[18px] w-[18px] stroke-[2.5]" />
          )}
          <span className="rxv-sidebar-toggle-label">{pinned ? 'Guardar menu' : 'Fixar menu'}</span>
        </button>
      </div>

      <div className="rxv-sidebar-rail-top" />

      <Link to="/receituario-vet" className="rxv-sidebar-app-logo" title="Voltar para página inicial do Receituário">
        <div className="rxv-sidebar-app-logo-icon-wrapper">
          <img src="/apps/REECEITA.png" alt="Logo do app Receituário Vet" className="rxv-sidebar-app-logo-image" />
        </div>
        <span className="rxv-sidebar-app-logo-title">ReceituarioVET</span>
      </Link>

      <LayoutGroup id="receituario-sidebar-nav">
        <nav className="rxv-sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="rxv-nav-group-container">
              {expanded && (
                <div className="rxv-nav-group-header">
                  {group.title}
                </div>
              )}
              <div className="rxv-nav-group-items">
                {group.items.map((item) => {
                  const active = section === item.key || locationPath === item.to
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.key}
                      to={item.to}
                      className={`rxv-nav-item rxv-nav-item-${item.accent} ${active ? 'active' : ''}`}
                      title={item.label}
                    >
                      {active && (
                        <motion.span
                          layout
                          layoutId="receituario-sidebar-active-bubble"
                          className="rxv-nav-active-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 33 }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon className="rxv-nav-icon stroke-[2.5]" />
                      <span className="rxv-nav-label">{item.label}</span>
                      {active && !expanded && <span className="rxv-nav-active-dot" aria-hidden="true" />}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="rxv-nav-item rxv-nav-item-slate rxv-nav-toggle"
            title={pinned ? 'Guardar menu lateral' : 'Fixar menu lateral'}
            onClick={onTogglePin}
          >
            <span className="rxv-nav-toggle-icon-wrap" aria-hidden="true">
              {pinned ? (
                <PanelLeftClose className="h-5 w-5 rxv-nav-toggle-icon stroke-[2.5]" />
              ) : (
                <PanelRightOpen className="h-5 w-5 rxv-nav-toggle-icon stroke-[2.5]" />
              )}
            </span>
            <span className="rxv-nav-label rxv-nav-toggle-label-text">{pinned ? 'Guardar menu' : 'Fixar menu'}</span>
          </button>
        </nav>
      </LayoutGroup>

      <div className="rxv-sidebar-rail-bottom" />
    </div>
  )
}

export default function ReceituarioChrome({
  section,
  title,
  subtitle,
  actions,
  children,
  forcedTheme,
  onThemeChange,
}: ReceituarioChromeProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState<RxTheme>(() => readTheme())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarPinned, setSidebarPinned] = useState(true)
  const htmlDarkBeforeRxvRef = useRef<boolean | null>(null)
  const dark = theme === 'dark'

  useLayoutEffect(() => {
    if (htmlDarkBeforeRxvRef.current === null) {
      htmlDarkBeforeRxvRef.current = document.documentElement.classList.contains('dark')
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    return () => {
      const prev = htmlDarkBeforeRxvRef.current
      if (prev !== null) {
        document.documentElement.classList.toggle('dark', prev)
      }
    }
  }, [])

  useEffect(() => {
    saveTheme(theme)
    if (onThemeChange) onThemeChange(theme)
  }, [theme, onThemeChange])

  useEffect(() => {
    if (forcedTheme && forcedTheme !== theme) {
      setTheme(forcedTheme)
    }
  }, [forcedTheme])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#050a12' : '#f0f5fc'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [dark])

  const pageClass = dark ? 'rxv-dark' : 'rxv-light'
  const sidebarExpanded = sidebarPinned
  const sidebarClass = `rxv-sidebar-shell ${sidebarExpanded ? 'expanded' : 'collapsed'}`
  const handleTopbarMenuClick = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      setSidebarPinned((prev) => !prev)
      return
    }
    setMobileMenuOpen(true)
  }

  const topRight = useMemo(
    () => (
      <div className="flex items-center gap-1 sm:gap-2">
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
        <TopRightAuthMenu />
      </div>
    ),
    [dark, navigate]
  )

  return (
    <div className={`rxv-page ${pageClass}`}>
      <div className="rxv-bg-layer" />

      <div className="rxv-scale-shell">
        <div className="rxv-layout">
          {/* Barra Vetius em largura total; sidebar e conteúdo ficam só abaixo disto */}
          <header className="rxv-app-topbar sticky top-0 z-[60] w-full shrink-0 border-b">
            <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4">
              <button
                type="button"
                className="rxv-icon-btn rxv-top-menu-btn shrink-0 rounded-lg"
                onClick={handleTopbarMenuClick}
                title={sidebarPinned ? 'Guardar menu lateral' : 'Abrir menu lateral'}
                aria-label={sidebarPinned ? 'Guardar menu lateral' : 'Abrir menu lateral'}
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>

              <Link
                to="/hub"
                className="flex min-w-0 flex-col items-center gap-0 cursor-pointer select-none"
                aria-label="Ir para o hub VETIUS"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10">
                  <Logo size={40} />
                </div>
                <span className="neon-wave neon-wave-glow -mt-2 text-xs font-semibold tracking-wide">Vetius</span>
              </Link>

              <div className="flex min-w-0 justify-end">{topRight}</div>
            </div>
          </header>

          <div className="rxv-layout-body">
            <aside
              className={`rxv-desktop-sidebar ${sidebarClass}`}
            >
              <SidebarContent
                section={section}
                locationPath={location.pathname}
                expanded={sidebarExpanded}
                pinned={sidebarPinned}
                onTogglePin={() => setSidebarPinned((prev) => !prev)}
              />
            </aside>

            <main className="rxv-main-content">
              <section className="rxv-main">
                <div className="rxv-page-frame w-full min-w-0">
                  {section === 'home' ? (
                    <div className="rxv-home-chrome-head mb-6 flex flex-col gap-4 border-b border-[color:var(--rxv-border)]/55 pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <div className="min-w-0">
                        <h1 className="text-xl font-bold tracking-tight text-[color:var(--rxv-text)] sm:text-2xl">{title}</h1>
                        {subtitle ? (
                          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[color:var(--rxv-muted)]">{subtitle}</p>
                        ) : null}
                      </div>
                      {actions ? <div className="rxv-action-row shrink-0">{actions}</div> : null}
                    </div>
                  ) : title || subtitle ? (
                    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        {title ? (
                          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
                        ) : null}
                        {subtitle ? <p className="text-sm text-[color:var(--rxv-muted)]">{subtitle}</p> : null}
                      </div>
                      {actions ? <div className="rxv-action-row">{actions}</div> : null}
                    </div>
                  ) : actions ? (
                    <div className="mb-5 flex flex-wrap justify-end gap-3">{actions}</div>
                  ) : null}
                  <div className="rxv-form">{children}</div>
                </div>
              </section>
            </main>
          </div>
        </div>
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
            />
          </aside>
        </div>
      ) : null}
    </div>
  )
}
