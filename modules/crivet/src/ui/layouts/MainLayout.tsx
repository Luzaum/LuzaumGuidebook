import React, { useState } from 'react';
import { Calculator, Database, FileText, Star, History, Settings, Info, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'calculator', label: 'Calculadora CRI', icon: Calculator },
  { id: 'database', label: 'Banco de Fármacos', icon: Database },
  { id: 'protocols', label: 'Protocolos', icon: FileText },
  { id: 'favorites', label: 'Favoritos', icon: Star },
  { id: 'history', label: 'Histórico', icon: History },
  { id: 'settings', label: 'Configurações', icon: Settings },
  { id: 'about', label: 'Sobre / Referências', icon: Info },
];

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (pageId: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-sans text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed hidden h-full w-60 flex-col border-r border-transparent bg-slate-900 text-slate-300 dark:border-slate-800 md:flex">
        <div className="border-b border-slate-800 px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <button 
              onClick={() => onNavigate('calculator')}
              className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-[1.05]"
              aria-label="Ir para calculadora CRI"
            >
              <img
                src="/apps/CRIVET.png"
                alt="Logo do CRI VET"
                className="h-56 w-56 rounded-full object-contain drop-shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-300 group-hover:drop-shadow-[0_0_60px_rgba(56,189,248,0.95)]"
              />
            </button>
            <h1 className="mt-4 text-lg font-bold tracking-tight text-white">CRI VET</h1>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition-all',
                  isActive ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white',
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="text-center text-xs text-slate-500">v2.0.0 &copy; {new Date().getFullYear()}</div>
        </div>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 grid h-20 grid-cols-[56px_1fr_56px] items-center bg-slate-900 px-2 text-white shadow-md md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-200 transition-colors hover:bg-slate-800"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="flex flex-col items-center justify-center">
          <button 
            onClick={() => {
              onNavigate('calculator');
              setIsMobileMenuOpen(false);
            }} 
            className="group mt-4 transition-transform duration-300 hover:scale-110"
          >
            <img
              src="/apps/CRIVET.png"
              alt="Logo do CRI VET"
              className="h-40 w-40 rounded-full object-contain drop-shadow-[0_0_24px_rgba(56,189,248,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_40px_rgba(56,189,248,0.9)]"
            />
          </button>
          <span className="mt-1 flex-1 text-sm font-bold tracking-tight text-white">CRI VET</span>
        </div>

        <div />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-slate-900/95 pt-20 md:hidden">
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-xl px-4 py-4 text-base font-medium transition-all',
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      <main className="flex min-h-screen min-w-0 flex-1 flex-col bg-slate-50 pt-20 dark:bg-slate-950 md:ml-60 md:pt-0">
        <div className="min-w-0 flex-1 w-full p-4 md:p-6 xl:p-7">{children}</div>
      </main>
    </div>
  );
};
