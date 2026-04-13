import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BarChart3,
  BookMarked,
  ClipboardList,
  Dna,
  GitBranch,
  Pill,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

/**
 * Paleta por seção da ficha de doença — classes Tailwind compatíveis com claro/escuro.
 */
export type DiseaseSectionVisual = {
  Icon: LucideIcon;
  /** Cor do título e ícone */
  titleClass: string;
  headerTintClass: string;
  iconWrapClass: string;
  iconClass: string;
  leftBarClass: string;
  contentTintClass: string;
  bulletDotClass: string;
  diagnosticRailClass: string;
  diagnosticNumBgClass: string;
  diagnosticNumTextClass: string;
  systemRailClass: string;
};

const VISUAL_BY_ID: Record<string, DiseaseSectionVisual> = {
  etiology: {
    Icon: Dna,
    titleClass: 'text-blue-800 dark:text-blue-200',
    headerTintClass: 'bg-blue-500/[0.09] dark:bg-blue-400/[0.12]',
    iconWrapClass: 'bg-blue-500/20 dark:bg-blue-400/25',
    iconClass: 'text-blue-700 dark:text-blue-300',
    leftBarClass: 'border-l-blue-600 dark:border-l-blue-400',
    contentTintClass: 'bg-blue-500/[0.025] dark:bg-blue-400/[0.05]',
    bulletDotClass: 'bg-blue-600/70 dark:bg-blue-400/70',
    diagnosticRailClass: 'border-l-blue-500/35 dark:border-l-blue-400/40',
    diagnosticNumBgClass: 'bg-blue-500/15 dark:bg-blue-400/20',
    diagnosticNumTextClass: 'text-blue-800 dark:text-blue-200',
    systemRailClass: 'border-l-blue-500/20 dark:border-l-blue-400/25',
  },
  epidemiology: {
    Icon: BarChart3,
    titleClass: 'text-teal-800 dark:text-teal-200',
    headerTintClass: 'bg-teal-500/[0.09] dark:bg-teal-400/[0.12]',
    iconWrapClass: 'bg-teal-500/20 dark:bg-teal-400/25',
    iconClass: 'text-teal-700 dark:text-teal-300',
    leftBarClass: 'border-l-teal-600 dark:border-l-teal-400',
    contentTintClass: 'bg-teal-500/[0.025] dark:bg-teal-400/[0.05]',
    bulletDotClass: 'bg-teal-600/70 dark:bg-teal-400/70',
    diagnosticRailClass: 'border-l-teal-500/35 dark:border-l-teal-400/40',
    diagnosticNumBgClass: 'bg-teal-500/15 dark:bg-teal-400/20',
    diagnosticNumTextClass: 'text-teal-800 dark:text-teal-200',
    systemRailClass: 'border-l-teal-500/20 dark:border-l-teal-400/25',
  },
  pathogenesisTransmission: {
    Icon: GitBranch,
    titleClass: 'text-violet-800 dark:text-violet-200',
    headerTintClass: 'bg-violet-500/[0.09] dark:bg-violet-400/[0.12]',
    iconWrapClass: 'bg-violet-500/20 dark:bg-violet-400/25',
    iconClass: 'text-violet-700 dark:text-violet-300',
    leftBarClass: 'border-l-violet-600 dark:border-l-violet-400',
    contentTintClass: 'bg-violet-500/[0.025] dark:bg-violet-400/[0.05]',
    bulletDotClass: 'bg-violet-600/70 dark:bg-violet-400/70',
    diagnosticRailClass: 'border-l-violet-500/35 dark:border-l-violet-400/40',
    diagnosticNumBgClass: 'bg-violet-500/15 dark:bg-violet-400/20',
    diagnosticNumTextClass: 'text-violet-800 dark:text-violet-200',
    systemRailClass: 'border-l-violet-500/20 dark:border-l-violet-400/25',
  },
  pathophysiology: {
    Icon: Activity,
    titleClass: 'text-indigo-800 dark:text-indigo-200',
    headerTintClass: 'bg-indigo-500/[0.09] dark:bg-indigo-400/[0.12]',
    iconWrapClass: 'bg-indigo-500/20 dark:bg-indigo-400/25',
    iconClass: 'text-indigo-700 dark:text-indigo-300',
    leftBarClass: 'border-l-indigo-600 dark:border-l-indigo-400',
    contentTintClass: 'bg-indigo-500/[0.025] dark:bg-indigo-400/[0.05]',
    bulletDotClass: 'bg-indigo-600/70 dark:bg-indigo-400/70',
    diagnosticRailClass: 'border-l-indigo-500/35 dark:border-l-indigo-400/40',
    diagnosticNumBgClass: 'bg-indigo-500/15 dark:bg-indigo-400/20',
    diagnosticNumTextClass: 'text-indigo-800 dark:text-indigo-200',
    systemRailClass: 'border-l-indigo-500/20 dark:border-l-indigo-400/25',
  },
  clinicalSignsPathophysiology: {
    Icon: Stethoscope,
    titleClass: 'text-rose-800 dark:text-rose-200',
    headerTintClass: 'bg-rose-500/[0.09] dark:bg-rose-400/[0.12]',
    iconWrapClass: 'bg-rose-500/20 dark:bg-rose-400/25',
    iconClass: 'text-rose-700 dark:text-rose-300',
    leftBarClass: 'border-l-rose-600 dark:border-l-rose-400',
    contentTintClass: 'bg-rose-500/[0.025] dark:bg-rose-400/[0.05]',
    bulletDotClass: 'bg-rose-600/70 dark:bg-rose-400/70',
    diagnosticRailClass: 'border-l-rose-500/35 dark:border-l-rose-400/40',
    diagnosticNumBgClass: 'bg-rose-500/15 dark:bg-rose-400/20',
    diagnosticNumTextClass: 'text-rose-800 dark:text-rose-200',
    systemRailClass: 'border-l-rose-500/20 dark:border-l-rose-400/25',
  },
  diagnosis: {
    Icon: ClipboardList,
    titleClass: 'text-emerald-800 dark:text-emerald-200',
    headerTintClass: 'bg-emerald-500/[0.09] dark:bg-emerald-400/[0.12]',
    iconWrapClass: 'bg-emerald-500/20 dark:bg-emerald-400/25',
    iconClass: 'text-emerald-700 dark:text-emerald-300',
    leftBarClass: 'border-l-emerald-600 dark:border-l-emerald-400',
    contentTintClass: 'bg-emerald-500/[0.025] dark:bg-emerald-400/[0.05]',
    bulletDotClass: 'bg-emerald-600/70 dark:bg-emerald-400/70',
    diagnosticRailClass: 'border-l-emerald-500/40 dark:border-l-emerald-400/45',
    diagnosticNumBgClass: 'bg-emerald-500/15 dark:bg-emerald-400/20',
    diagnosticNumTextClass: 'text-emerald-800 dark:text-emerald-200',
    systemRailClass: 'border-l-emerald-500/20 dark:border-l-emerald-400/25',
  },
  treatment: {
    Icon: Pill,
    titleClass: 'text-amber-900 dark:text-amber-200',
    headerTintClass: 'bg-amber-500/[0.11] dark:bg-amber-400/[0.12]',
    iconWrapClass: 'bg-amber-500/25 dark:bg-amber-400/25',
    iconClass: 'text-amber-800 dark:text-amber-300',
    leftBarClass: 'border-l-amber-600 dark:border-l-amber-400',
    contentTintClass: 'bg-amber-500/[0.03] dark:bg-amber-400/[0.05]',
    bulletDotClass: 'bg-amber-600/75 dark:bg-amber-400/70',
    diagnosticRailClass: 'border-l-amber-500/35 dark:border-l-amber-400/40',
    diagnosticNumBgClass: 'bg-amber-500/15 dark:bg-amber-400/20',
    diagnosticNumTextClass: 'text-amber-900 dark:text-amber-200',
    systemRailClass: 'border-l-amber-500/20 dark:border-l-amber-400/25',
  },
  prevention: {
    Icon: ShieldCheck,
    titleClass: 'text-green-800 dark:text-green-200',
    headerTintClass: 'bg-green-500/[0.09] dark:bg-green-400/[0.12]',
    iconWrapClass: 'bg-green-500/20 dark:bg-green-400/25',
    iconClass: 'text-green-700 dark:text-green-300',
    leftBarClass: 'border-l-green-600 dark:border-l-green-400',
    contentTintClass: 'bg-green-500/[0.025] dark:bg-green-400/[0.05]',
    bulletDotClass: 'bg-green-600/70 dark:bg-green-400/70',
    diagnosticRailClass: 'border-l-green-500/35 dark:border-l-green-400/40',
    diagnosticNumBgClass: 'bg-green-500/15 dark:bg-green-400/20',
    diagnosticNumTextClass: 'text-green-800 dark:text-green-200',
    systemRailClass: 'border-l-green-500/20 dark:border-l-green-400/25',
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
    diagnosticRailClass: 'border-l-slate-500/30 dark:border-l-slate-400/35',
    diagnosticNumBgClass: 'bg-slate-500/12 dark:bg-slate-400/18',
    diagnosticNumTextClass: 'text-slate-800 dark:text-slate-200',
    systemRailClass: 'border-l-slate-500/18 dark:border-l-slate-400/22',
  },
};

const FALLBACK = VISUAL_BY_ID.etiology;

export function getDiseaseSectionVisual(sectionId: string): DiseaseSectionVisual {
  return VISUAL_BY_ID[sectionId] ?? FALLBACK;
}
