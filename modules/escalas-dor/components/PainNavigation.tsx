import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Bookmark,
  Grid2X2,
  Home,
  MoreHorizontal,
  Scale as ScaleIcon,
  X,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AppLogo } from './Icons';
import type { Species } from '../types';
import { SpeciesPortrait } from '@/components/SpeciesPortraitCards';

export type PainNavigationTarget = 'home' | 'scaleSelect' | 'guide' | 'rescue' | 'references';

interface PainNavigationProps {
  active: PainNavigationTarget | 'assessment' | 'result';
  species: Species | null;
  contextLabel?: string;
  canGoBack: boolean;
  onBack: () => void;
  onNavigate: (target: PainNavigationTarget) => void;
  onHub: () => void;
}

const primaryItems = [
  { id: 'home' as const, label: 'Início', icon: Home },
  { id: 'scaleSelect' as const, label: 'Avaliar dor', icon: ScaleIcon },
  { id: 'guide' as const, label: 'Manejo', icon: BookOpen },
  { id: 'rescue' as const, label: 'Resgate', icon: AlertTriangle },
  { id: 'references' as const, label: 'Referências', icon: Bookmark },
];

const assessmentScreens = new Set(['scaleSelect', 'assessment', 'result']);

export default function PainNavigation({
  active,
  species,
  contextLabel,
  canGoBack,
  onBack,
  onNavigate,
  onHub,
}: PainNavigationProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const isActive = (id: PainNavigationTarget) => id === 'scaleSelect'
    ? assessmentScreens.has(active)
    : active === id;

  useEffect(() => setMoreOpen(false), [active]);

  const navButton = (item: typeof primaryItems[number], compact = false) => {
    const Icon = item.icon;
    const selected = isActive(item.id);
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onNavigate(item.id)}
        aria-current={selected ? 'page' : undefined}
        className={`${compact ? 'dorvet-bottom-nav-item' : 'dorvet-adaptive-nav-item'} ${selected ? 'is-active' : ''}`}
      >
        <span className="dorvet-nav-icon-wrap"><Icon className="h-[18px] w-[18px]" /></span>
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      <aside className="dorvet-desktop-nav" aria-label="Navegação da Escala de Dor">
        <div className="dorvet-brand-block">
          <div className="dorvet-brand-logo"><AppLogo className="h-9 w-9 object-contain" /></div>
          <div className="min-w-0">
            <p className="dorvet-brand-kicker">Vetius Clinical</p>
            <h1 className="dorvet-brand-title">Escala de Dor</h1>
          </div>
        </div>

        {species && (
          <div className="dorvet-patient-context">
            <span className="dorvet-species-avatar">
              <SpeciesPortrait species={species} decorative className="h-full w-full" />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400">Paciente</span>
              <span className="block truncate text-sm font-bold text-slate-800 dark:text-slate-100">{species === 'dog' ? 'Canino' : 'Felino'}</span>
              {contextLabel && <span className="block truncate text-[11px] text-slate-500 dark:text-slate-400">{contextLabel}</span>}
            </div>
          </div>
        )}

        <nav className="dorvet-adaptive-nav-list">
          {primaryItems.map((item) => navButton(item))}
        </nav>

        <div className="dorvet-desktop-footer">
          <button type="button" onClick={onHub} className="dorvet-hub-button">
            <Grid2X2 className="h-4 w-4" />
            <span>Todos os apps</span>
          </button>
          <ThemeToggle />
        </div>
      </aside>

      <header className="dorvet-responsive-header">
        <div className="flex min-w-0 items-center gap-2.5">
          {canGoBack ? (
            <button type="button" onClick={onBack} className="dorvet-header-icon" aria-label="Voltar">
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <span className="dorvet-header-logo"><AppLogo className="h-7 w-7 object-contain" /></span>
          )}
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Vetius Clinical</p>
            <p className="truncate text-sm font-black text-slate-850 dark:text-white">{contextLabel || 'Escala de Dor'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {species && (
            <span className="dorvet-header-species" title={species === 'dog' ? 'Paciente canino' : 'Paciente felino'}>
              <SpeciesPortrait species={species} decorative className="h-full w-full" />
            </span>
          )}
          <button type="button" onClick={onHub} className="dorvet-header-icon hidden sm:inline-flex" aria-label="Abrir Hub Vetius">
            <Grid2X2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <nav className="dorvet-tablet-nav" aria-label="Seções da Escala de Dor">
        {primaryItems.map((item) => navButton(item))}
      </nav>

      <nav className="dorvet-mobile-bottom-nav" aria-label="Navegação principal">
        {primaryItems.slice(0, 3).map((item) => navButton(item, true))}
        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className={`dorvet-bottom-nav-item ${active === 'rescue' || active === 'references' ? 'is-active' : ''}`}
          aria-expanded={moreOpen}
        >
          <span className="dorvet-nav-icon-wrap"><MoreHorizontal className="h-[19px] w-[19px]" /></span>
          <span>Mais</span>
        </button>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <div className="fixed inset-0 z-[120] flex items-end lg:hidden">
            <motion.button
              type="button"
              className="absolute inset-0 h-full w-full border-0 bg-slate-950/65 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              aria-label="Fechar opções"
            />
            <motion.div
              className="relative z-10 w-full rounded-t-[28px] border border-b-0 border-slate-200 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] shadow-2xl dark:border-slate-800 dark:bg-slate-950"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            >
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-slate-850 dark:text-white">Mais opções</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Conteúdo clínico e preferências</p>
                </div>
                <button type="button" onClick={() => setMoreOpen(false)} className="dorvet-header-icon" aria-label="Fechar">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {primaryItems.slice(3).map((item) => navButton(item))}
                <button type="button" onClick={onHub} className="dorvet-adaptive-nav-item">
                  <span className="dorvet-nav-icon-wrap"><Grid2X2 className="h-[18px] w-[18px]" /></span>
                  <span>Hub Vetius</span>
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Aparência</span>
                <ThemeToggle />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
