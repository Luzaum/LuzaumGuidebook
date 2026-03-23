import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowLeft,
  BookOpenText,
  Droplets,
  Menu,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react'
import { NavLink, Outlet, matchPath, useLocation, useNavigate } from 'react-router-dom'
import './fluidoterapia.css'
import { FLUID_PAGE_SECTIONS } from './content'

type PageKey = keyof typeof FLUID_PAGE_SECTIONS

const APP_NAV_ITEMS = [
  { key: 'calculator' as const, label: 'Calculadora', path: '/fluidoterapia', icon: Activity },
  { key: 'conditions' as const, label: 'Doenças específicas', path: '/fluidoterapia/doencas', icon: ShieldPlus },
  { key: 'guide' as const, label: 'Guia clínico', path: '/fluidoterapia/guia', icon: BookOpenText },
]

function resolvePageKey(pathname: string): PageKey {
  if (matchPath('/fluidoterapia/doencas', pathname)) {
    return 'conditions'
  }

  if (matchPath('/fluidoterapia/guia', pathname)) {
    return 'guide'
  }

  return 'calculator'
}

export function FluidoterapiaShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const pageKey = resolvePageKey(location.pathname)
  const currentSections = useMemo(() => FLUID_PAGE_SECTIONS[pageKey], [pageKey])

  useEffect(() => {
    const sectionNodes = currentSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[]

    if (sectionNodes.length === 0) {
      setActiveSection('')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        threshold: [0.3, 0.5, 0.75],
        rootMargin: '-18% 0px -40% 0px',
      },
    )

    sectionNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [currentSections, location.pathname])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    setDrawerOpen(false)
  }

  const sidebar = (
    <aside className="fluid-panel sticky top-16 flex h-[calc(100vh-4rem)] flex-col rounded-none border-y-0 border-l-0 border-r px-4 py-5 xl:rounded-[32px] xl:border xl:px-5 xl:py-6">
      <div className="fluid-panel-strong rounded-[28px] p-5">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="fluid-card-hover mb-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--fluid-border)] px-4 py-2 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="fluid-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
          <Sparkles className="h-3.5 w-3.5" />
          Webapp clínico
        </div>

        <h1 className="fluid-heading mt-4 text-[1.9rem] font-semibold leading-tight">
          Fluidoterapia
        </h1>
        <p className="fluid-muted mt-3 text-sm leading-6">
          Fluxo pensado para consulta rápida: paciente, método, resultado e decisão clínica.
        </p>
      </div>

      <div className="mt-6">
        <div className="fluid-muted text-xs font-semibold uppercase tracking-[0.22em]">
          Páginas do app
        </div>
        <nav className="mt-3 space-y-2">
          {APP_NAV_ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/fluidoterapia'}
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  [
                    'fluid-card-hover flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium',
                    isActive
                      ? 'border-[var(--fluid-primary)] bg-[var(--fluid-accent-soft)] text-[var(--fluid-primary)]'
                      : 'border-transparent text-[var(--fluid-muted)] hover:border-[var(--fluid-border)] hover:bg-[var(--fluid-accent-soft)]/60',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-5 right-5">
        <div className="rounded-xl bg-[var(--fluid-accent-soft)] p-4 text-xs leading-5">
          <span className="mb-2 block font-semibold text-[var(--fluid-primary)]">Dica</span>
          <span className="text-[var(--fluid-muted)]">O Vetius Fluidoterapia foi desenvolvido especificamente para cenários de resgate intensivo e internação.</span>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="fluid-webapp min-h-full w-full">
      <div className="flex w-full gap-0 xl:gap-6">
        <div className="hidden w-[320px] shrink-0 xl:block">{sidebar}</div>

        <div className="min-w-0 flex-1">
          <div className="fluid-panel sticky top-16 z-40 rounded-none border-x-0 border-t-0 px-4 py-3 xl:hidden">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="fluid-card-hover inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--fluid-border)] px-4 py-2 text-sm font-semibold"
              >
                <Menu className="h-4 w-4" />
                Navegação
              </button>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--fluid-primary)]">
                <Droplets className="h-4 w-4" />
                Vetius Fluidoterapia
              </div>
            </div>
          </div>

          <main className="min-w-0 px-3 pb-6 pt-3 sm:px-4 md:px-6 xl:px-0 xl:pr-6 xl:pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            className="fixed inset-0 z-50 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              onClick={() => setDrawerOpen(false)}
              aria-label="Fechar navegação"
            />
            <motion.div
              className="absolute inset-y-0 left-0 w-[min(92vw,340px)] p-0"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-full">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--fluid-border)] bg-[var(--fluid-panel-strong)]"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
                {sidebar}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
