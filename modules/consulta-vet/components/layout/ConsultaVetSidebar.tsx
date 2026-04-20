import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Bookmark, BookOpen, Clock, FileText, Grid, LucideIcon, Pill, ShieldCheck, Stethoscope, X, Zap } from 'lucide-react';
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
  onClose: () => void;
}

export function ConsultaVetSidebar({ isOpen, onClose }: ConsultaVetSidebarProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [canManageEditorial, setCanManageEditorial] = useState(false);

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

  const links = useMemo((): NavLinkItem[] => {
    const baseLinks: NavLinkItem[] = [
      { to: '/consulta-vet', label: 'Início', icon: Grid, accent: 'sky' },
      { to: '/consulta-vet/doencas', label: 'Doenças', icon: Stethoscope, accent: 'emerald' },
      { to: '/consulta-vet/medicamentos', label: 'Medicamentos', icon: Pill, accent: 'amber' },
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
        className={cn(
          'consulta-vet-sidebar-panel fixed inset-y-0 left-0 z-50 flex w-[min(100vw,18rem)] shrink-0 flex-col border-r transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-start justify-between gap-1.5 border-b border-border/60 px-2 pb-1.5 pt-2 md:px-2.5">
          <div className="min-w-0 flex-1">
            <Link
              to="/consulta-vet"
              onClick={() => window.innerWidth < 768 && onClose()}
              className="group block w-full rounded-lg outline-none ring-offset-background transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]"
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
          <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4 pt-0.5 md:px-2.5">
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
                  className={cn(
                    'group relative flex min-h-[2.875rem] items-center gap-2.5 overflow-hidden rounded-xl py-2 pr-1.5 text-[14px] font-semibold leading-snug tracking-tight outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary md:min-h-[3rem] md:gap-3 md:pr-2 md:text-[15px]',
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
                  <span className="relative z-10 min-w-0 flex-1 whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>
      </aside>
    </>
  );
}


