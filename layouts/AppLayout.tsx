import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { modules } from '../modules/registry'
import { Menu, X, Home } from 'lucide-react'
import Logo from '../components/Logo'
import { Button } from '../components/ui/button'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const internalModules = modules.filter((m) => m.status === 'internal')
  const iframeModules = modules.filter((m) => m.status === 'iframe')
  const plannedModules = modules.filter((m) => m.status === 'planned')

  const isActive = (route: string) => location.pathname === route

  return (
    <div className="min-h-dvh flex bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-background/95 backdrop-blur-sm">
        <Link
          to="/"
          className="flex flex-col items-center pt-4 pb-2 cursor-pointer select-none overflow-visible gap-0 border-b border-border"
          aria-label="Voltar para a Home"
        >
          <Logo 
            size={144} 
            className="h-36 w-36 select-none object-contain drop-shadow-[0_0_28px_rgba(96,165,250,0.35)] transition-all duration-300"
          />
          <span className="neon-wave neon-wave-glow -mt-4 text-xl font-semibold tracking-wide">Vetius</span>
          <div className="my-3 h-px w-10/12 bg-border opacity-40" />
        </Link>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Hub Button */}
          <div>
            <button
              onClick={() => navigate('/')}
              className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive('/')
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium'
                  : 'text-foreground hover:bg-surface/50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Hub</span>
            </button>
          </div>

          {internalModules.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Módulos Internos
              </h3>
              <ul className="space-y-1">
                {internalModules.map((module) => {
                  const Icon = module.icon
                  return (
                    <li key={module.id}>
                      <button
                        onClick={() => navigate(module.route)}
                        className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive(module.route)
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium'
                            : 'text-foreground hover:bg-surface/50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="truncate">{module.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {iframeModules.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Módulos Externos
              </h3>
              <ul className="space-y-1">
                {iframeModules.map((module) => {
                  const Icon = module.icon
                  return (
                    <li key={module.id}>
                      <button
                        onClick={() => navigate(module.route)}
                        className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          isActive(module.route)
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium'
                            : 'text-foreground hover:bg-surface/50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="truncate">{module.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {plannedModules.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Em Desenvolvimento
              </h3>
              <ul className="space-y-1">
                {plannedModules.map((module) => {
                  const Icon = module.icon
                  return (
                    <li key={module.id}>
                      <button
                        onClick={() => navigate(module.route)}
                        className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors opacity-60 ${
                          isActive(module.route)
                            ? 'bg-slate-800/50 dark:bg-slate-700/50 text-white'
                            : 'text-slate-200/90 dark:text-foreground hover:bg-slate-800/40 dark:hover:bg-surface/50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="truncate">{module.title}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-border">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-background border-r border-border overflow-y-auto">
            <div className="flex flex-col items-center pt-4 pb-2 overflow-visible gap-0 border-b border-border relative">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-surface/50 rounded-lg z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex flex-col items-center cursor-pointer select-none overflow-visible gap-0"
                aria-label="Voltar para a Home"
              >
                <Logo 
                  size={144} 
                  className="h-36 w-36 select-none object-contain drop-shadow-[0_0_28px_rgba(96,165,250,0.35)] transition-all duration-300"
                />
                <span className="neon-wave neon-wave-glow -mt-4 text-xl font-semibold tracking-wide">Vetius</span>
                <div className="my-3 h-px w-10/12 bg-border opacity-40" />
              </Link>
            </div>

            <nav className="p-4 space-y-6">
              {/* Hub Button */}
              <div>
                <button
                  onClick={() => {
                    navigate('/')
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive('/')
                      ? 'bg-slate-800/50 dark:bg-slate-700/50 text-white'
                      : 'text-slate-200/90 dark:text-foreground hover:bg-slate-800/40 dark:hover:bg-surface/50'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Hub</span>
                </button>
              </div>

              {internalModules.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Módulos Internos
                  </h3>
                  <ul className="space-y-1">
                    {internalModules.map((module) => {
                      const Icon = module.icon
                      return (
                        <li key={module.id}>
                          <button
                            onClick={() => {
                              navigate(module.route)
                              setSidebarOpen(false)
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive(module.route)
                                ? 'bg-slate-800/50 dark:bg-slate-700/50 text-white'
                                : 'text-slate-200/90 dark:text-foreground hover:bg-slate-800/40 dark:hover:bg-surface/50'
                            }`}
                          >
                            {module.iconImage ? (
                              <img 
                                src={module.iconImage} 
                                alt={`${module.title} logo`}
                                className="h-4 w-4 object-contain dark:invert dark:brightness-0 dark:contrast-200"
                              />
                            ) : (
                              <Icon className="h-4 w-4" />
                            )}
                            <span className="truncate">{module.title}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {iframeModules.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Módulos Externos
                  </h3>
                  <ul className="space-y-1">
                    {iframeModules.map((module) => {
                      const Icon = module.icon
                      return (
                        <li key={module.id}>
                          <button
                            onClick={() => {
                              navigate(module.route)
                              setSidebarOpen(false)
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                              isActive(module.route)
                                ? 'bg-slate-800/50 dark:bg-slate-700/50 text-white'
                                : 'text-slate-200/90 dark:text-foreground hover:bg-slate-800/40 dark:hover:bg-surface/50'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="truncate">{module.title}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {plannedModules.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Em Desenvolvimento
                  </h3>
                  <ul className="space-y-1">
                    {plannedModules.map((module) => {
                      const Icon = module.icon
                      return (
                        <li key={module.id}>
                          <button
                            onClick={() => {
                              navigate(module.route)
                              setSidebarOpen(false)
                            }}
                            className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors opacity-60 ${
                              isActive(module.route)
                                ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium'
                                : 'text-foreground hover:bg-surface/50'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="truncate">{module.title}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </nav>

            <div className="p-4 border-t border-border">
              <ThemeToggle />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-surface/50 rounded-lg"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link
              to="/"
              className="flex flex-col items-center gap-0 cursor-pointer select-none"
              aria-label="Voltar para a Home"
            >
              <div className="h-12 w-12">
                <Logo size={48} />
              </div>
              <span className="neon-wave neon-wave-glow -mt-2 text-xs font-semibold tracking-wide">Vetius</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
