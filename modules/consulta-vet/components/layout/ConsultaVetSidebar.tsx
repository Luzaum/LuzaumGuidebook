import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import {
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Grid,
  LucideIcon,
  Pill,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { CONSULTA_VET_LOGO_ALT, CONSULTA_VET_LOGO_SIDEBAR_CLASS, CONSULTA_VET_LOGO_SRC } from '../../constants/branding';
import { canManageConsultaVetEditorial } from '../../services/consultaVetEditorialPermissions';
import {
  ConsultaVetNavAccent,
  consultaVetNavPillTransition,
  navAccentPillBg,
  navIconClass,
  navLinkClass,
} from './consultaVetNavAccents';

type NavLinkItem = { to: string; label: string; icon: LucideIcon; accent: ConsultaVetNavAccent };

interface ConsultaVetSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapsed: () => void;
}

export function ConsultaVetSidebar({ isOpen, isCollapsed, onClose, onToggleCollapsed }: ConsultaVetSidebarProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [canManageEditorial, setCanManageEditorial] = useState(false);
  const [isHoverPreview, setIsHoverPreview] = useState(false);
  const hoverCloseTimerRef = useRef<number | null>(null);

  const isDesktopPreviewOpen = isCollapsed && isHoverPreview;
  const isExpanded = !isCollapsed || isDesktopPreviewOpen;

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      const next = await canManageConsultaVetEditorial();
      if (!isMounted) return;
      setCanManageEditorial(next);
    };

    void run();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hoverCloseTimerRef.current !== null) {
        window.clearTimeout(hoverCloseTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isCollapsed) return;
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
    setIsHoverPreview(false);
  }, [isCollapsed]);

  const openHoverPreview = () => {
    if (!isCollapsed) return;
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
    setIsHoverPreview(true);
  };

  const closeHoverPreview = () => {
    if (!isCollapsed) return;
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
    }
    hoverCloseTimerRef.current = window.setTimeout(() => {
      setIsHoverPreview(false);
      hoverCloseTimerRef.current = null;
    }, 160);
  };

  const links = useMemo((): NavLinkItem[] => {
    const baseLinks: NavLinkItem[] = [
      { to: '/consulta-vet', label: 'Início', icon: Grid, accent: 'sky' },
      { to: '/consulta-vet/doencas', label: 'Doenças', icon: Stethoscope, accent: 'emerald' },
      { to: '/consulta-vet/medicamentos', label: 'Medicamentos', icon: Pill, accent: 'amber' },
      { to: '/consulta-vet/apresentacoes-comerciais', label: 'Comerciais', icon: ShoppingBag, accent: 'cyan' },
      { to: '/consulta-vet/manejo-emergencial', label: 'Manejo emergencial', icon: Zap, accent: 'orange' },
      { to: '/consulta-vet/guias-rapidos', label: 'Guia rápido clínico', icon: BookOpen, accent: 'slate' },
      { to: '/consulta-vet/consensos', label: 'Consensos', icon: FileText, accent: 'violet' },
      { to: '/consulta-vet/favoritos', label: 'Favoritos', icon: Bookmark, accent: 'rose' },
      { to: '/consulta-vet/recentes', label: 'Recentes', icon: Clock, accent: 'cyan' },
    ];

    if (canManageEditorial) {
      baseLinks.push({ to: '/consulta-vet/editorial', label: 'Editorial', icon: ShieldCheck, accent: 'slate' });
    }

    return baseLinks;
  }, [canManageEditorial]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      <aside
        data-collapsed={isCollapsed ? 'true' : 'false'}
        onMouseEnter={openHoverPreview}
        onMouseLeave={closeHoverPreview}
        className={cn(
          'consulta-vet-sidebar-panel fixed inset-y-0 left-0 z-50 flex w-[min(100vw,18rem)] shrink-0 flex-col border-r transition-[width,transform,border-color,box-shadow] duration-300 ease-in-out md:relative md:translate-x-0 md:overflow-visible',
          isCollapsed ? 'md:w-20' : 'md:w-72',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={isCollapsed ? 'Mostrar barra lateral' : 'Esconder barra lateral'}
          title={isCollapsed ? 'Mostrar barra lateral' : 'Esconder barra lateral'}
          className={cn(
            'consulta-vet-sidebar-toggle absolute right-0 top-1/2 z-[70] hidden h-12 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border/80 bg-background/95 text-muted-foreground shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:border-primary/35 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:flex',
            isDesktopPreviewOpen && 'md:left-72 md:right-auto opacity-90'
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        <div
          className={cn(
            'consulta-vet-sidebar-surface flex flex-1 flex-col overflow-hidden transition-[width,box-shadow,background-color] duration-300 ease-in-out',
            isExpanded
              ? 'md:w-72 md:shadow-2xl md:shadow-black/20'
              : 'md:w-20'
          )}
        >
          <div
            className={cn(
              'consulta-vet-sidebar-header flex items-start justify-between gap-1.5 border-b border-border/60 px-2 pb-1 pt-1 transition-[height,padding,border-color] duration-300 ease-in-out md:px-2 md:pb-1 md:pt-1',
              !isExpanded && 'md:h-3 md:border-transparent md:p-0'
            )}
          >
            <div
              className={cn(
                'consulta-vet-sidebar-logo-wrap min-w-0 flex-1 transition-[height,opacity,transform,width] duration-300 ease-in-out',
                isExpanded ? 'h-24 opacity-100 md:h-28' : 'md:h-0 md:w-0 md:-translate-x-2 md:opacity-0'
              )}
            >
              <Link
                to="/consulta-vet"
                onClick={() => window.innerWidth < 768 && onClose()}
                className="group block h-full w-full rounded-lg outline-none ring-offset-background transition-transform duration-200 ease-out hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]"
              >
                <img
                  src={CONSULTA_VET_LOGO_SRC}
                  alt={CONSULTA_VET_LOGO_ALT}
                  className={cn(
                    'h-auto w-full max-w-full object-contain object-left transition-[filter,transform] duration-200 ease-out group-hover:brightness-105 group-hover:drop-shadow-md dark:group-hover:brightness-110',
                    CONSULTA_VET_LOGO_SIDEBAR_CLASS
                  )}
                  width={220}
                  height={72}
                  decoding="async"
                />
              </Link>
            </div>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <LayoutGroup id="consulta-vet-sidebar-nav">
            <nav
              className={cn(
                'consulta-vet-sidebar-nav-scroll flex-1 space-y-1 overflow-y-auto px-2 pb-3 pt-1 md:px-2',
                !isExpanded && 'md:px-3 md:pt-0'
              )}
            >
              {links.map((link) => {
                const isActive =
                  location.pathname === link.to ||
                  (link.to !== '/consulta-vet' && location.pathname.startsWith(link.to));

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      if (window.innerWidth < 768) onClose();
                    }}
                    title={!isExpanded ? link.label : undefined}
                    className={cn(
                      'consulta-vet-sidebar-nav-link group relative flex min-h-[2.5rem] items-center gap-2.5 overflow-hidden rounded-xl py-1.5 pr-1.5 text-[14px] font-semibold leading-snug tracking-tight outline-none ring-offset-background transition-[padding,gap,width] duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-primary md:min-h-[2.625rem] md:gap-2.5 md:pr-2 md:text-[14px]',
                      !isExpanded && 'md:h-12 md:w-12 md:justify-center md:gap-0 md:px-0',
                      navLinkClass(isActive, link.accent)
                    )}
                  >
                    {isActive && !reduceMotion ? (
                      <motion.span
                        layout
                        layoutId="consulta-vet-nav-pill"
                        initial={false}
                        className={cn('absolute inset-0 rounded-xl', navAccentPillBg[link.accent])}
                        transition={consultaVetNavPillTransition}
                        aria-hidden
                      />
                    ) : null}
                    {isActive && reduceMotion ? (
                      <span
                        className={cn('absolute inset-0 rounded-xl', navAccentPillBg[link.accent])}
                        aria-hidden
                      />
                    ) : null}
                    <link.icon
                      className={cn('relative z-10', navIconClass(isActive, link.accent))}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        'consulta-vet-sidebar-nav-label relative z-10 min-w-0 flex-1 whitespace-nowrap transition-[opacity,transform,max-width] duration-200 ease-out',
                        isExpanded ? 'max-w-48 opacity-100' : 'md:max-w-0 md:translate-x-2 md:opacity-0'
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
        </div>
      </aside>
    </>
  );
}


