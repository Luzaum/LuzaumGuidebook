import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { modules } from '../modules/registry'
import { Menu, X, Home } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuthSession } from '@/src/components/AuthSessionProvider'
import { useClinic } from '@/src/components/ClinicProvider'
import { TopRightAuthMenu } from '@/src/components/TopRightAuthMenu'

const APP_FORM_DRAFT_PREFIX = 'vetius:app-form-draft:v1:'
const NON_DRAFT_FIELD_TYPES = new Set(['button', 'submit', 'reset', 'file', 'image', 'password'])

type DraftableField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

function isDraftableAppRoute(pathname: string): boolean {
  if (!pathname || pathname === '/' || pathname === '/hub') return false
  const routeAliases = ['/transfusao-sanguinea', '/emergencias']
  return (
    modules.some((module) => pathname === module.route || pathname.startsWith(`${module.route}/`)) ||
    routeAliases.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  )
}

function getAppFormDraftKey(pathname: string): string | null {
  if (!isDraftableAppRoute(pathname)) return null
  return `${APP_FORM_DRAFT_PREFIX}${pathname}`
}

function isDraftableField(element: Element | null): element is DraftableField {
  if (!element) return false
  const tag = element.tagName.toLowerCase()
  if (tag === 'textarea' || tag === 'select') return true
  if (tag !== 'input') return false
  const type = (element as HTMLInputElement).type?.toLowerCase() || 'text'
  return !NON_DRAFT_FIELD_TYPES.has(type)
}

function getFieldKey(field: DraftableField, index: number): string {
  const stable =
    field.getAttribute('data-draft-key') ||
    field.getAttribute('name') ||
    field.getAttribute('id') ||
    field.getAttribute('aria-label') ||
    field.getAttribute('placeholder')
  return `${field.tagName.toLowerCase()}:${stable || index}`
}

function collectFormDraft(root: HTMLElement): Record<string, unknown> {
  const draft: Record<string, unknown> = {}
  const fields = Array.from(root.querySelectorAll('input, textarea, select')).filter(isDraftableField)

  fields.forEach((field, index) => {
    const key = getFieldKey(field, index)
    if (field instanceof HTMLInputElement && (field.type === 'checkbox' || field.type === 'radio')) {
      draft[key] = field.checked
      return
    }
    if (field instanceof HTMLSelectElement && field.multiple) {
      draft[key] = Array.from(field.selectedOptions).map((option) => option.value)
      return
    }
    draft[key] = field.value
  })

  return draft
}

function restoreFormDraft(root: HTMLElement, draft: Record<string, unknown>): void {
  const fields = Array.from(root.querySelectorAll('input, textarea, select')).filter(isDraftableField)

  fields.forEach((field, index) => {
    const key = getFieldKey(field, index)
    if (!Object.prototype.hasOwnProperty.call(draft, key)) return
    const value = draft[key]

    if (field instanceof HTMLInputElement && (field.type === 'checkbox' || field.type === 'radio')) {
      const nextChecked = Boolean(value)
      if (field.checked !== nextChecked) {
        field.checked = nextChecked
        field.dispatchEvent(new Event('change', { bubbles: true }))
      }
      return
    }

    if (field instanceof HTMLSelectElement && field.multiple && Array.isArray(value)) {
      const selected = new Set(value.map(String))
      Array.from(field.options).forEach((option) => {
        option.selected = selected.has(option.value)
      })
      field.dispatchEvent(new Event('change', { bubbles: true }))
      return
    }

    const nextValue = String(value ?? '')
    if (field.value !== nextValue) {
      field.value = nextValue
      field.dispatchEvent(new Event(field instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }))
    }
  })
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const appContentRef = useRef<HTMLDivElement | null>(null)
  const saveDraftTimerRef = useRef<number | null>(null)
  
  const { profile } = useAuthSession()
  const { clinicName } = useClinic()

  const internalModules = modules.filter((m) => m.status === 'internal')
  const iframeModules = modules.filter((m) => m.status === 'iframe')
  const plannedModules = modules.filter((m) => m.status === 'planned')

  const decodedPathname = decodeURIComponent(location.pathname)
  const isActive = (route: string) => decodedPathname === route
  const isImmersiveModuleRoute =
    decodedPathname.startsWith('/receituario-vet') ||
    decodedPathname.startsWith('/dados-veterinarios')
  const isFullBleedRoute =
    isActive('/') ||
    isActive('/hub') ||
    isImmersiveModuleRoute ||
    decodedPathname.startsWith('/peconhentos') ||
    decodedPathname.startsWith('/fluidoterapia') ||
    decodedPathname.startsWith('/antibioticoterapia') ||
    decodedPathname.startsWith('/hemogasovet') ||
    decodedPathname.startsWith('/plantao-vet') ||
    decodedPathname.startsWith('/calculadora-energetica') ||
    decodedPathname.startsWith('/crivet') ||
    decodedPathname.startsWith('/consulta-vet') ||
    decodedPathname.startsWith('/dor') ||
    decodedPathname.startsWith('/neurologia') ||
    decodedPathname.startsWith('/veteletrolitico') ||
    decodedPathname.startsWith('/transfusao-sanguinea') ||
    decodedPathname.startsWith('/transfusão-sanguinea')

  const saveCurrentFormDraft = useCallback(() => {
    const root = appContentRef.current
    const key = getAppFormDraftKey(location.pathname)
    if (!root || !key) return
    try {
      localStorage.setItem(key, JSON.stringify(collectFormDraft(root)))
    } catch (error) {
      if (import.meta.env?.DEV) console.warn('[AppLayout] Failed to persist app form draft', error)
    }
  }, [location.pathname])

  const scheduleFormDraftSave = useCallback(() => {
    if (saveDraftTimerRef.current !== null) window.clearTimeout(saveDraftTimerRef.current)
    saveDraftTimerRef.current = window.setTimeout(saveCurrentFormDraft, 120)
  }, [saveCurrentFormDraft])

  useEffect(() => {
    return () => {
      if (saveDraftTimerRef.current !== null) window.clearTimeout(saveDraftTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const root = appContentRef.current
    const key = getAppFormDraftKey(location.pathname)
    if (!root || !key) return

    let cancelled = false
    const restore = () => {
      if (cancelled) return
      try {
        const raw = localStorage.getItem(key)
        if (!raw) return
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          restoreFormDraft(root, parsed as Record<string, unknown>)
        }
      } catch (error) {
        if (import.meta.env?.DEV) console.warn('[AppLayout] Failed to restore app form draft', error)
      }
    }

    const frame = window.requestAnimationFrame(() => {
      restore()
      window.setTimeout(restore, 250)
    })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
    }
  }, [location.pathname])

  if (isImmersiveModuleRoute) {
    return (
      <div
        ref={appContentRef}
        onInputCapture={scheduleFormDraftSave}
        onChangeCapture={scheduleFormDraftSave}
        className="h-dvh min-h-0 w-full overflow-hidden bg-background"
      >
        <Outlet />
      </div>
    )
  }

  function renderSidebarContent(isMobile: boolean) {
    return (
      <div className="flex flex-col h-full overflow-hidden select-none bg-[#05060b]">
        {/* Sidebar Header */}
        <div className="flex flex-col items-center pt-6 pb-5 gap-0 border-b border-slate-850 shrink-0 relative">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors z-10"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <Link
            to="/"
            onClick={() => isMobile && setSidebarOpen(false)}
            className="flex flex-col items-center cursor-pointer select-none relative group"
            aria-label="Voltar para a Home"
          >
            {/* Ambient emerald aura behind logo */}
            <div className="absolute top-2 h-14 w-14 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/15 transition-all duration-500" />
            <Logo
              size={76}
              className="h-20 w-20 select-none object-contain drop-shadow-[0_0_24px_rgba(16,185,129,0.2)] transition-all duration-500 group-hover:scale-105"
            />
            <span className="neon-wave neon-wave-glow -mt-2 text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Vetius
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Hub Button */}
          <div>
            <button
              onClick={() => {
                navigate('/hub')
                if (isMobile) setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 border border-transparent ${
                isActive('/hub')
                  ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500/25 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 hover:border-slate-850/60'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Hub Principal</span>
            </button>
          </div>

          {/* Internal Modules */}
          {internalModules.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3.5 px-3">
                Ferramentas Clínicas
              </h3>
              <ul className="space-y-1.5">
                {internalModules.map((module) => {
                  const Icon = module.icon
                  const active = isActive(module.route)
                  return (
                    <li key={module.id}>
                      <button
                        onClick={() => {
                          navigate(module.route)
                          if (isMobile) setSidebarOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 border border-transparent ${
                          active
                            ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500/25 text-emerald-400'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 hover:border-slate-850/60'
                        }`}
                      >
                        {module.iconImage ? (
                          <img
                            src={module.iconImage}
                            alt={`${module.title} logo`}
                            className={`object-contain flex-shrink-0 ${
                              module.id === 'receituario-vet' ? '' : 'dark:invert'
                            }`}
                            style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }}
                          />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                        <span className="truncate">{module.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* External Modules */}
          {iframeModules.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3.5 px-3">
                Módulos Integrados
              </h3>
              <ul className="space-y-1.5">
                {iframeModules.map((module) => {
                  const Icon = module.icon
                  const active = isActive(module.route)
                  return (
                    <li key={module.id}>
                      <button
                        onClick={() => {
                          navigate(module.route)
                          if (isMobile) setSidebarOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 border border-transparent ${
                          active
                            ? 'bg-gradient-to-r from-emerald-600/20 to-teal-600/10 border-emerald-500/25 text-emerald-400'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 hover:border-slate-850/60'
                        }`}
                      >
                        {module.iconImage ? (
                          <img
                            src={module.iconImage}
                            alt={`${module.title} logo`}
                            className="object-contain flex-shrink-0 dark:invert"
                            style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px' }}
                          />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                        <span className="truncate">{module.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Planned Modules */}
          {plannedModules.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3.5 px-3">
                Em Desenvolvimento
              </h3>
              <ul className="space-y-1.5">
                {plannedModules.map((module) => {
                  const Icon = module.icon
                  const active = isActive(module.route)
                  return (
                    <li key={module.id}>
                      <button
                        onClick={() => {
                          navigate(module.route)
                          if (isMobile) setSidebarOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 border border-transparent opacity-55 ${
                          active
                            ? 'bg-emerald-505/10 text-emerald-400'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="truncate">{module.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </nav>

        {/* Sidebar Footer with Session card */}
        <div className="mt-auto p-4 border-t border-slate-850 bg-slate-950/20 flex flex-col gap-3 shrink-0">
          {profile ? (
            <Link
              to="/conta/perfil"
              onClick={() => isMobile && setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-900/35 p-2.5 hover:bg-slate-900/60 transition-all duration-300 group shadow-inner"
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`Avatar de ${profile.name}`}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300"
                />
              ) : (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-300 ring-2 ring-slate-700/50">
                  US
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                  {profile.name}
                </p>
                <p className="truncate text-[10px] text-slate-500 mt-0.5 font-semibold">
                  {clinicName || 'Espaço de Atendimento'}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => isMobile && setSidebarOpen(false)}
              className="flex h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-md shadow-emerald-500/10"
            >
              Entrar na Conta
            </Link>
          )}

          <div className="flex items-center justify-between gap-2 px-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-650">Tema Visual</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-dvh min-h-dvh bg-background">
      {/* Sliding Drawer Left Sidebar (Mobile and Desktop) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-[#05060b] border-r border-slate-850 overflow-hidden z-50 shadow-2xl animate-in slide-in-from-left duration-300">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}

      {/* Main Content Pane */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
          <div className="flex items-center justify-between px-4 py-2 h-14">
            
            {/* Left Side: Toggle and Branding */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-slate-900/50 rounded-lg text-slate-350 hover:text-white transition-colors"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <Link
                to="/"
                className="flex items-center gap-2 cursor-pointer select-none"
                aria-label="Voltar para a Home"
              >
                <div className="h-7 w-7">
                  <Logo size={28} />
                </div>
                <span className="neon-wave neon-wave-glow text-base font-extrabold tracking-wide hidden sm:inline-block">
                  Vetius
                </span>
              </Link>
            </div>
            
            {/* Right Side: Theme and User Menu */}
            <div className="flex items-center gap-3 ml-auto">
              <ThemeToggle />
              <TopRightAuthMenu />
            </div>
          </div>
        </header>

        {/* Page Content viewport */}
        <main
          ref={appContentRef}
          onInputCapture={scheduleFormDraftSave}
          onChangeCapture={scheduleFormDraftSave}
          className="relative flex w-full flex-1 flex-col min-h-0 overflow-auto bg-slate-50/50 dark:bg-slate-950/20"
        >
          {isFullBleedRoute ? (
            <div className="flex min-h-0 flex-1 w-full">
              <Outlet />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-6 pb-12">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
