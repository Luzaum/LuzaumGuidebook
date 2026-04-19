import React, { useState } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import {
  Home,
  Stethoscope,
  Database,
  Zap,
  History,
  Activity,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react'
import { ThemeSync } from './components/ThemeSync'
import { NEURO_WIZARD_STEPS } from './neuroWizardSteps'
import { useCaseStore } from './stores/caseStore'
import { cn } from '../../lib/utils'
import { AnimatedShaderBackground } from '@/components/ui/animated-shader-background'
import { NeuroSidebarIconWrap, neuroSidebarNavItemClassName } from './components/NeuroSidebarNavStyles'

const MAIN_NAV = [
  { to: '/neurologia', label: 'Início', end: true, icon: Home },
  { to: '/neurologia/exame', label: 'Exame completo', end: false, icon: Stethoscope },
  { to: '/neurologia/base-dados', label: 'Base neurológica', end: false, icon: Database },
  { to: '/neurologia/exame-rapido', label: 'Exame rápido', end: false, icon: Zap },
  { to: '/neurologia/historico', label: 'Histórico', end: false, icon: History },
  { to: '/neurologia/glasgow', label: 'Escala de Glasgow', end: false, icon: Activity },
] as const

function NeuroLogoCard() {
  return (
    <Link
      to="/neurologia"
      className={cn(
        'group relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-4',
        'shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
      )}
      aria-label="NeuroVet — início"
    >
      <span
        className="pointer-events-none absolute inset-x-4 bottom-0 h-1 rounded-full bg-gradient-to-r from-transparent via-amber-300/90 to-transparent opacity-0 shadow-[0_0_16px_rgba(250,204,21,0.85)] transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <img
        src="/apps/NEURO.png"
        alt=""
        className="h-[168px] max-h-[40vw] w-auto max-w-full object-contain drop-shadow-[0_0_18px_rgba(245,197,66,0.45)] transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">NeuroVet</p>
        <p className="text-xs text-muted-foreground">Neurologia veterinária</p>
      </div>
    </Link>
  )
}

export function NeuroShell() {
  const location = useLocation()
  const isExamRoute =
    location.pathname === '/neurologia/exame' || location.pathname === '/neurologia/exame/'
  const currentStep = useCaseStore((s) => s.currentStep)
  const setCurrentStep = useCaseStore((s) => s.setCurrentStep)
  const [mainMenuOpen, setMainMenuOpen] = useState(false)

  return (
    <>
      <ThemeSync />
      <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-transparent font-sans text-foreground selection:bg-gold/30">
        {/* Fundo shader em tela cheia (área do módulo) */}
        <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh] w-full">
          <AnimatedShaderBackground className="h-full min-h-[100dvh] w-full" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/65 to-background/85"
          aria-hidden
        />
        <aside className="fixed bottom-0 left-0 top-12 z-30 hidden w-80 border-r border-border/60 bg-card/55 backdrop-blur-xl lg:block">
          <div className="border-b border-border/70 p-4">
            <NeuroLogoCard />
          </div>

          {isExamRoute ? (
            <div className="flex flex-col gap-2 p-4">
              <Link
                to="/neurologia"
                className="mb-1 inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm font-medium text-foreground transition hover:border-gold/50"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao menu NeuroVet
              </Link>
              <div className="rounded-xl border border-border bg-background/50 px-3 py-2">
                <p className="text-xs font-semibold text-foreground">Etapas do exame</p>
              </div>
              <nav className="space-y-1.5">
                {NEURO_WIZARD_STEPS.map((item) => {
                  const isActive = item.step === currentStep
                  const isDone = item.step < currentStep
                  const Icon = item.icon
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setCurrentStep(item.step)}
                      aria-label={`Ir para etapa ${item.step}: ${item.label}`}
                      className={cn(
                        'group w-full cursor-pointer text-left',
                        'flex items-start gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-200',
                        neuroSidebarNavItemClassName({ active: isActive, done: isDone }),
                      )}
                    >
                      <NeuroSidebarIconWrap active={isActive} done={isDone}>
                        <Icon className="h-4 w-4" />
                      </NeuroSidebarIconWrap>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">
                          Etapa {item.step}: {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                          {item.desc}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          ) : (
            <nav className="space-y-1.5 p-4">
              {MAIN_NAV.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-200',
                        neuroSidebarNavItemClassName({ active: isActive }),
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <NeuroSidebarIconWrap active={isActive}>
                          <Icon className="h-4 w-4" />
                        </NeuroSidebarIconWrap>
                        {item.label}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          )}
        </aside>

        {/* Mobile header + main menu */}
        <div className="sticky top-12 z-20 flex w-full items-center justify-between gap-2 border-b border-border/60 bg-card/50 px-4 py-2 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setMainMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
            aria-expanded={mainMenuOpen}
          >
            <Menu className="h-4 w-4 text-gold" />
            Menu
          </button>
          <Link to="/neurologia" className="text-sm font-semibold text-foreground">
            NeuroVet
          </Link>
          <span className="w-14" aria-hidden />
        </div>

        {mainMenuOpen && (
          <div className="fixed inset-0 z-[55] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu NeuroVet">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Fechar menu"
              onClick={() => setMainMenuOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 max-h-[min(85dvh,36rem)] overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-sm font-semibold">Navegação</p>
                <button
                  type="button"
                  onClick={() => setMainMenuOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="max-h-[calc(min(85dvh,36rem)-3.5rem)] space-y-1 overflow-y-auto p-4 pb-8">
                {MAIN_NAV.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMainMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-200',
                          neuroSidebarNavItemClassName({ active: isActive }),
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <NeuroSidebarIconWrap active={isActive}>
                            <Icon className="h-4 w-4" />
                          </NeuroSidebarIconWrap>
                          {item.label}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </nav>
            </div>
          </div>
        )}

        <div className="relative z-10 w-full lg:pl-80">
          <div className="w-full px-4 pb-24 pt-4 sm:px-6 lg:px-10 xl:px-14 lg:pb-32 lg:pt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
