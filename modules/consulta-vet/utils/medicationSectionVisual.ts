import type { LucideIcon } from 'lucide-react';
import {
  BookMarked,
  Calculator,
  FlaskConical,
  Link2,
  ListChecks,
  NotebookPen,
  Package,
} from 'lucide-react';

/**
 * Paleta por seção da ficha de medicamento — espelha a lógica de doenças (Tailwind claro/escuro).
 */
export type MedicationSectionVisual = {
  Icon: LucideIcon;
  titleClass: string;
  headerTintClass: string;
  iconWrapClass: string;
  iconClass: string;
  leftBarClass: string;
  contentTintClass: string;
  bulletDotClass: string;
  /** Classes completas do link ativo no índice lateral (SectionAnchorNav) */
  navItemActiveClass: string;
};

const VISUAL_BY_ID: Record<string, MedicationSectionVisual> = {
  'dose-calculator': {
    Icon: Calculator,
    titleClass: 'text-sky-800 dark:text-sky-200',
    headerTintClass: 'bg-sky-500/[0.09] dark:bg-sky-400/[0.12]',
    iconWrapClass: 'bg-sky-500/20 dark:bg-sky-400/25',
    iconClass: 'text-sky-700 dark:text-sky-300',
    leftBarClass: 'border-l-sky-600 dark:border-l-sky-400',
    contentTintClass: 'bg-sky-500/[0.025] dark:bg-sky-400/[0.05]',
    bulletDotClass: 'bg-sky-600/70 dark:bg-sky-400/70',
    navItemActiveClass:
      'border-sky-500 bg-sky-500/[0.08] font-semibold text-sky-800 dark:border-sky-400 dark:bg-sky-400/[0.12] dark:text-sky-100',
  },
  'dose-regimens': {
    Icon: ListChecks,
    titleClass: 'text-emerald-800 dark:text-emerald-200',
    headerTintClass: 'bg-emerald-500/[0.09] dark:bg-emerald-400/[0.12]',
    iconWrapClass: 'bg-emerald-500/20 dark:bg-emerald-400/25',
    iconClass: 'text-emerald-700 dark:text-emerald-300',
    leftBarClass: 'border-l-emerald-600 dark:border-l-emerald-400',
    contentTintClass: 'bg-emerald-500/[0.025] dark:bg-emerald-400/[0.05]',
    bulletDotClass: 'bg-emerald-600/70 dark:bg-emerald-400/70',
    navItemActiveClass:
      'border-emerald-500 bg-emerald-500/[0.08] font-semibold text-emerald-800 dark:border-emerald-400 dark:bg-emerald-400/[0.12] dark:text-emerald-100',
  },
  presentations: {
    Icon: Package,
    titleClass: 'text-amber-900 dark:text-amber-200',
    headerTintClass: 'bg-amber-500/[0.11] dark:bg-amber-400/[0.12]',
    iconWrapClass: 'bg-amber-500/25 dark:bg-amber-400/25',
    iconClass: 'text-amber-800 dark:text-amber-300',
    leftBarClass: 'border-l-amber-600 dark:border-l-amber-400',
    contentTintClass: 'bg-amber-500/[0.03] dark:bg-amber-400/[0.05]',
    bulletDotClass: 'bg-amber-600/75 dark:bg-amber-400/70',
    navItemActiveClass:
      'border-amber-500 bg-amber-500/[0.1] font-semibold text-amber-900 dark:border-amber-400 dark:bg-amber-400/[0.12] dark:text-amber-100',
  },
  pharmacology: {
    Icon: FlaskConical,
    titleClass: 'text-indigo-800 dark:text-indigo-200',
    headerTintClass: 'bg-indigo-500/[0.09] dark:bg-indigo-400/[0.12]',
    iconWrapClass: 'bg-indigo-500/20 dark:bg-indigo-400/25',
    iconClass: 'text-indigo-700 dark:text-indigo-300',
    leftBarClass: 'border-l-indigo-600 dark:border-l-indigo-400',
    contentTintClass: 'bg-indigo-500/[0.025] dark:bg-indigo-400/[0.05]',
    bulletDotClass: 'bg-indigo-600/70 dark:bg-indigo-400/70',
    navItemActiveClass:
      'border-indigo-500 bg-indigo-500/[0.08] font-semibold text-indigo-800 dark:border-indigo-400 dark:bg-indigo-400/[0.12] dark:text-indigo-100',
  },
  'clinical-notes': {
    Icon: NotebookPen,
    titleClass: 'text-teal-800 dark:text-teal-200',
    headerTintClass: 'bg-teal-500/[0.09] dark:bg-teal-400/[0.12]',
    iconWrapClass: 'bg-teal-500/20 dark:bg-teal-400/25',
    iconClass: 'text-teal-700 dark:text-teal-300',
    leftBarClass: 'border-l-teal-600 dark:border-l-teal-400',
    contentTintClass: 'bg-teal-500/[0.025] dark:bg-teal-400/[0.05]',
    bulletDotClass: 'bg-teal-600/70 dark:bg-teal-400/70',
    navItemActiveClass:
      'border-teal-500 bg-teal-500/[0.08] font-semibold text-teal-800 dark:border-teal-400 dark:bg-teal-400/[0.12] dark:text-teal-100',
  },
  references: {
    Icon: BookMarked,
    titleClass: 'text-slate-800 dark:text-slate-200',
    headerTintClass: 'bg-slate-500/[0.08] dark:bg-slate-400/[0.1]',
    iconWrapClass: 'bg-slate-500/20 dark:bg-slate-400/22',
    iconClass: 'text-slate-700 dark:text-slate-300',
    leftBarClass: 'border-l-slate-500 dark:border-l-slate-400',
    contentTintClass: 'bg-slate-500/[0.02] dark:bg-slate-400/[0.04]',
    bulletDotClass: 'bg-slate-600/60 dark:bg-slate-400/60',
    navItemActiveClass:
      'border-slate-500 bg-slate-500/[0.08] font-semibold text-slate-800 dark:border-slate-400 dark:bg-slate-400/[0.1] dark:text-slate-100',
  },
  related: {
    Icon: Link2,
    titleClass: 'text-violet-800 dark:text-violet-200',
    headerTintClass: 'bg-violet-500/[0.09] dark:bg-violet-400/[0.12]',
    iconWrapClass: 'bg-violet-500/20 dark:bg-violet-400/25',
    iconClass: 'text-violet-700 dark:text-violet-300',
    leftBarClass: 'border-l-violet-600 dark:border-l-violet-400',
    contentTintClass: 'bg-violet-500/[0.025] dark:bg-violet-400/[0.05]',
    bulletDotClass: 'bg-violet-600/70 dark:bg-violet-400/70',
    navItemActiveClass:
      'border-violet-500 bg-violet-500/[0.08] font-semibold text-violet-800 dark:border-violet-400 dark:bg-violet-400/[0.12] dark:text-violet-100',
  },
};

const FALLBACK = VISUAL_BY_ID.pharmacology;

export function getMedicationSectionVisual(sectionId: string): MedicationSectionVisual {
  return VISUAL_BY_ID[sectionId] ?? FALLBACK;
}
