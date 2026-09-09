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
  { id: 'calculator', label: 'Calcular', shortLabel: 'Calcular', icon: Calculator, mobilePrimary: true },
  { id: 'database', label: 'Fármacos', shortLabel: 'Fármacos', icon: Database, mobilePrimary: true },
  { id: 'protocols', label: 'Protocolos', shortLabel: 'Protocolos', icon: FileText, mobilePrimary: true },
  { id: 'favorites', label: 'Favoritos', shortLabel: 'Favoritos', icon: Star, mobilePrimary: true },
  { id: 'history', label: 'Histórico', shortLabel: 'Histórico', icon: History },
  { id: 'settings', label: 'Configurações', shortLabel: 'Config.', icon: Settings },
  { id: 'about', label: 'Sobre', shortLabel: 'Sobre', icon: Info },
];

const mobilePrimaryItems = navItems.filter((item) => item.mobilePrimary);
const mobileMoreItems = navItems.filter((item) => !item.mobilePrimary);

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

  useEffect(() => setShowMoreMenu(false), [activePage]);

  const isMoreActive = mobileMoreItems.some((item) => item.id === activePage);

  return (
    <div className="min-h-dvh bg-[#f6f7f8] font-sans text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[212px] flex-col border-r border-slate-200 bg-white md:flex dark:border-slate-800 dark:bg-slate-950">
        <button
          type="button"
          onClick={() => navigate('calculator')}
          className="flex h-[76px] items-center border-b border-slate-100 px-5 text-left dark:border-slate-900"
          aria-label="Ir para a calculadora"
        >
          <CrivetLogo size="md" />
        </button>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5" aria-label="Navegação principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={cn(
                  'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white',
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl bg-emerald-50 px-3 py-3 dark:bg-emerald-500/10">
          <p className="text-[11px] font-semibold leading-4 text-emerald-800 dark:text-emerald-300">
            Apoio à decisão clínica veterinária
          </p>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95">
        <button type="button" onClick={() => navigate('calculator')} aria-label="Ir para a calculadora">
          <CrivetLogo size="sm" />
        </button>
      </header>

      <main className="min-h-dvh pt-14 pb-20 md:ml-[212px] md:pt-0 md:pb-0">
        <div className="w-full px-4 py-5 sm:px-6 md:px-8 md:py-9 lg:px-10">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95" aria-label="Navegação principal">
        {mobilePrimaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={cn(
                'flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold',
                isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500',
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
              {item.shortLabel}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowMoreMenu((value) => !value)}
          className={cn(
            'flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold',
            isMoreActive || showMoreMenu ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500',
          )}
          aria-expanded={showMoreMenu}
        >
          <MoreHorizontal className="h-5 w-5" />
          Mais
        </button>
      </nav>

      {showMoreMenu && (
        <>
          <button type="button" className="fixed inset-0 z-[60] bg-slate-950/35 md:hidden" aria-label="Fechar menu" onClick={() => setShowMoreMenu(false)} />
          <div className="fixed inset-x-3 bottom-[4.6rem] z-[70] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl md:hidden dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="text-sm font-semibold">Mais opções</p>
              <button type="button" onClick={() => setShowMoreMenu(false)} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500" aria-label="Fechar">
                <X className="h-4 w-4" />
              </button>
            </div>
            {mobileMoreItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} type="button" onClick={() => navigate(item.id)} className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                  <Icon className="h-5 w-5 text-slate-400" /> {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
