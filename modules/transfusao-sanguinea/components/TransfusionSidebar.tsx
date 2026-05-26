import React, { useEffect, useState } from 'react';
import { PanelLeftClose, PanelLeftOpen, ArrowLeft, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { TRANSFUSION_NAV_ITEMS, type TransfusionPage } from '../navConfig';

const STORAGE_KEY = 'transfusion-sidebar-collapsed';

interface TransfusionSidebarProps {
  activeKey: TransfusionPage;
  onNavigate: (page: TransfusionPage) => void;
  onBackToHub: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const TransfusionSidebar: React.FC<TransfusionSidebarProps> = ({ 
  activeKey, 
  onNavigate, 
  onBackToHub,
  isMobile = false,
  onCloseMobile
}) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setCollapsed(true);
    } catch {
      /* ignore */
    }
  }, [isMobile]);

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c;
      try {
        sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const activeWidthClass = collapsed ? 'w-[4.25rem]' : 'w-64';

  return (
    <aside
      className={cn(
        'flex h-full min-h-0 shrink-0 flex-col border-r border-border/80 bg-card/95 text-card-foreground backdrop-blur-sm transition-[width] duration-300',
        isMobile ? 'w-72 border-r-0' : activeWidthClass
      )}
      aria-label="Navegação da hemoterapia"
    >
      {/* Header do Sidebar */}
      <div className="flex items-center gap-2 border-b border-border/50 p-2.5">
        <button
          type="button"
          onClick={() => onNavigate('calculator')}
          className={cn(
            'flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1.5 text-left transition duration-200 hover:bg-muted/80',
            collapsed && !isMobile ? 'justify-center px-0' : 'px-2'
          )}
          aria-label="Início — Transfusão"
        >
          <span className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center bg-red-500/10 text-xl shadow-inner select-none font-bold">🩸</span>
          {(!collapsed || isMobile) && (
            <div className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold text-foreground">Hemoterapia</span>
              <span className="block text-[10px] text-muted-foreground font-medium truncate">Módulo de Transfusão</span>
            </div>
          )}
        </button>

        {isMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleCollapsed}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Navegação principal */}
      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-2 py-4 custom-scrollbar">
        <div className="space-y-1.5">
          {(!collapsed || isMobile) ? (
            <p className="px-3.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 select-none">
              Navegação Interna
            </p>
          ) : (
            <div className="mx-auto h-px w-6 bg-border" aria-hidden />
          )}

          {TRANSFUSION_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.page === activeKey;

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => {
                  onNavigate(item.page);
                  if (isMobile && onCloseMobile) onCloseMobile();
                }}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-500/20',
                  collapsed && !isMobile ? 'justify-center px-0' : '',
                  isActive
                    ? 'bg-red-500/10 text-red-500 font-semibold ring-1 ring-red-500/20'
                    : 'text-foreground/90 hover:bg-muted/90'
                )}
                title={(collapsed && !isMobile) ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={cn(
                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200',
                    isActive
                      ? 'border-red-500/30 bg-red-500/10 text-red-500'
                      : 'border-border bg-card text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  <Icon className="h-4.5 w-4.5 stroke-[2]" />
                </span>
                {(!collapsed || isMobile) && (
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="truncate text-xs font-semibold">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto shrink-0 rounded-full bg-red-500/15 px-1.5 py-0.5 text-[9px] font-bold text-red-500">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Botão de Rodapé (Voltar ao Hub) */}
      <div className="border-t border-border/50 p-2.5 bg-muted/20">
        <button
          type="button"
          onClick={onBackToHub}
          className={cn(
            'flex w-full items-center gap-2 rounded-xl border border-border bg-background/80 px-3 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-muted focus:outline-none focus:ring-1 focus:ring-red-500/20',
            collapsed && !isMobile ? 'justify-center px-0' : ''
          )}
          title={(collapsed && !isMobile) ? 'Voltar ao Hub Principal' : undefined}
        >
          <ArrowLeft className="h-4.5 w-4.5 shrink-0" />
          {(!collapsed || isMobile) && <span>Voltar ao Hub</span>}
        </button>
      </div>

    </aside>
  );
};

TransfusionSidebar.displayName = 'TransfusionSidebar';
export default TransfusionSidebar;
