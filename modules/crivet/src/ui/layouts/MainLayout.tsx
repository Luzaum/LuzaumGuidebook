import React, { useEffect, useState } from 'react';
import {
  Calculator,
  Database,
  FileText,
  Star,
  History,
  Settings,
  Info,
  MoreHorizontal,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CrivetLogo } from '../components/CrivetLogo';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  mobilePrimary?: boolean;
}

const navItems: NavItem[] = [
  { id: 'calculator', label: 'Calculadora', shortLabel: 'Calc', icon: Calculator, mobilePrimary: true },
  { id: 'database', label: 'Fármacos', shortLabel: 'Fármacos', icon: Database, mobilePrimary: true },
  { id: 'protocols', label: 'Protocolos', shortLabel: 'Protocolos', icon: FileText, mobilePrimary: true },
  { id: 'favorites', label: 'Favoritos', shortLabel: 'Favoritos', icon: Star, mobilePrimary: true },
  { id: 'history', label: 'Histórico', shortLabel: 'Histórico', icon: History },
  { id: 'settings', label: 'Configurações', shortLabel: 'Config', icon: Settings },
  { id: 'about', label: 'Sobre', shortLabel: 'Sobre', icon: Info },
];

const mobilePrimaryItems = navItems.filter((item) => item.mobilePrimary);
const mobileMoreItems = navItems.filter((item) => !item.mobilePrimary);

const pageTitles: Record<string, string> = Object.fromEntries(
  navItems.map((item) => [item.id, item.label]),
);

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (pageId: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activePage, onNavigate }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navigate = (pageId: string) => {
    onNavigate(pageId);
    setShowMoreMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setShowMoreMenu(false);
  }, [activePage]);

  const isMoreActive = mobileMoreItems.some((item) => item.id === activePage);

  return (
    <div className="flex min-h-dvh font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop sidebar */}
      <aside className="fixed hidden h-dvh w-[220px] flex-col border-r border-slate-800 bg-slate-900 md:flex">
        <div className="border-b border-slate-800 px-4 py-5">
          <button
            type="button"
            onClick={() => navigate('calculator')}
            className="w-full transition-opacity hover:opacity-90"
            aria-label="Ir para calculadora"
          >
            <CrivetLogo size="md" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 px-4 py-3">
          <p className="text-center text-[11px] text-slate-500">Uso veterinário</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-12 items-center border-b border-slate-800 bg-slate-900 px-4 md:hidden">
        <button
          type="button"
          onClick={() => navigate('calculator')}
          className="min-w-0 flex-1"
          aria-label="Ir para calculadora"
        >
          <CrivetLogo size="sm" showLabel={false} />
        </button>
        <p className="truncate text-sm font-semibold text-white">
          {pageTitles[activePage] ?? 'CRI VET'}
        </p>
        <div className="min-w-0 flex-1" />
      </header>

      {/* Main content */}
      <main className="flex min-h-dvh min-w-0 flex-1 flex-col bg-slate-50 pt-12 pb-[4.5rem] dark:bg-slate-950 md:ml-[220px] md:pt-0 md:pb-0">
        <div className="min-w-0 flex-1 w-full px-3 py-4 sm:px-5 md:p-6 lg:p-7">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
        aria-label="Navegação principal"
      >
        {mobilePrimaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={cn(
                'flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-semibold transition-colors',
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-500 dark:text-slate-400',
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
              <span className="truncate">{item.shortLabel}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setShowMoreMenu((value) => !value)}
          className={cn(
            'flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-semibold transition-colors',
            isMoreActive || showMoreMenu
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400',
          )}
          aria-expanded={showMoreMenu}
          aria-label="Mais opções"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span>Mais</span>
        </button>
      </nav>

      {/* Mobile more menu sheet */}
      {showMoreMenu && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-black/40 md:hidden"
            aria-label="Fechar menu"
            onClick={() => setShowMoreMenu(false)}
          />
          <div className="fixed bottom-[3.25rem] left-0 right-0 z-[70] rounded-t-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900 md:hidden">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Mais opções</p>
              <button
                type="button"
                onClick={() => setShowMoreMenu(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1">
              {mobileMoreItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
