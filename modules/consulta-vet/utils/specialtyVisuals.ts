import type { DiseaseRecord } from '../types/disease';
import { getDiseaseCategorySlugs } from './diseaseCategories';
export interface SpecialtyVisual {
  label: string;
  icon: string;
  borderActive: string;
  textActive: string;
  bgActive: string;
}

export const SPECIALTY_VISUALS: Record<string, SpecialtyVisual> = {
  infectologia: {
    label: 'Infectologia',
    icon: '🦠',
    borderActive: 'border-emerald-500',
    textActive: 'text-emerald-600 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/[0.06]',
  },
  infecciosas: {
    label: 'Infectologia',
    icon: '🦠',
    borderActive: 'border-emerald-500',
    textActive: 'text-emerald-600 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/[0.06]',
  },
  parasitologia: {
    label: 'Parasitologia',
    icon: '🪱',
    borderActive: 'border-lime-600',
    textActive: 'text-lime-700 dark:text-lime-400',
    bgActive: 'bg-lime-500/[0.06]',
  },
  gastroenterologia: {
    label: 'Gastroenterologia',
    icon: '🍽️',
    borderActive: 'border-orange-500',
    textActive: 'text-orange-600 dark:text-orange-400',
    bgActive: 'bg-orange-500/[0.06]',
  },
  endocrinologia: {
    label: 'Endocrinologia',
    icon: '⚗️',
    borderActive: 'border-purple-500',
    textActive: 'text-purple-600 dark:text-purple-400',
    bgActive: 'bg-purple-500/[0.06]',
  },
  respiratorio: {
    label: 'Pneumologia',
    icon: '💨',
    borderActive: 'border-sky-500',
    textActive: 'text-sky-600 dark:text-sky-400',
    bgActive: 'bg-sky-500/[0.06]',
  },
  'bombas-asma-terapia-inalatoria': {
    label: 'Bombas para asma / Terapia inalatória',
    icon: '🌬️',
    borderActive: 'border-cyan-500',
    textActive: 'text-cyan-600 dark:text-cyan-400',
    bgActive: 'bg-cyan-500/[0.06]',
  },
  cardiologia: {
    label: 'Cardiologia',
    icon: '🫀',
    borderActive: 'border-rose-500',
    textActive: 'text-rose-600 dark:text-rose-400',
    bgActive: 'bg-rose-500/[0.06]',
  },
  'nefrologia-urologia': {
    label: 'Nefrologia e Urologia',
    icon: '🧪',
    borderActive: 'border-amber-500',
    textActive: 'text-amber-600 dark:text-amber-400',
    bgActive: 'bg-amber-500/[0.06]',
  },
  dermatologia: {
    label: 'Dermatologia',
    icon: '🐾',
    borderActive: 'border-pink-500',
    textActive: 'text-pink-600 dark:text-pink-400',
    bgActive: 'bg-pink-500/[0.06]',
  },
  neurologia: {
    label: 'Neurologia',
    icon: '🧠',
    borderActive: 'border-indigo-500',
    textActive: 'text-indigo-600 dark:text-indigo-400',
    bgActive: 'bg-indigo-500/[0.06]',
  },
  oncologia: {
    label: 'Oncologia',
    icon: '🎗️',
    borderActive: 'border-yellow-500',
    textActive: 'text-yellow-600 dark:text-yellow-400',
    bgActive: 'bg-yellow-500/[0.06]',
  },
  'reproducao-neonatologia': {
    label: 'Reprodução e Neonatologia',
    icon: '🍼',
    borderActive: 'border-fuchsia-500',
    textActive: 'text-fuchsia-600 dark:text-fuchsia-400',
    bgActive: 'bg-fuchsia-500/[0.06]',
  },
  ortopedia: {
    label: 'Ortopedia',
    icon: '🦴',
    borderActive: 'border-teal-500',
    textActive: 'text-teal-600 dark:text-teal-400',
    bgActive: 'bg-teal-500/[0.06]',
  },
  imunologia: {
    label: 'Imunologia',
    icon: '🛡️',
    borderActive: 'border-violet-500',
    textActive: 'text-violet-600 dark:text-violet-400',
    bgActive: 'bg-violet-500/[0.06]',
  },
  odontologia: {
    label: 'Odontologia',
    icon: '🦷',
    borderActive: 'border-cyan-500',
    textActive: 'text-cyan-600 dark:text-cyan-400',
    bgActive: 'bg-cyan-500/[0.06]',
  },
  'odontologia-odontostomatologia': {
    label: 'Odontologia',
    icon: '🦷',
    borderActive: 'border-cyan-500',
    textActive: 'text-cyan-600 dark:text-cyan-400',
    bgActive: 'bg-cyan-500/[0.06]',
  },
  'hepatologia-pancreas': {
    label: 'Hepatologia e Pâncreas',
    icon: '🫀',
    borderActive: 'border-yellow-600',
    textActive: 'text-yellow-700 dark:text-yellow-400',
    bgActive: 'bg-yellow-500/[0.06]',
  },
  'emergencia-intensivismo': {
    label: 'Emergência e UTI',
    icon: '🚑',
    borderActive: 'border-red-500',
    textActive: 'text-red-600 dark:text-red-400',
    bgActive: 'bg-red-500/[0.06]',
  },
  'clínica-medica': {
    label: 'Clínica médica',
    icon: '🩺',
    borderActive: 'border-slate-500',
    textActive: 'text-slate-600 dark:text-slate-400',
    bgActive: 'bg-slate-500/[0.06]',
  },
};

export function getSpecialtyVisual(slug: string): SpecialtyVisual {
  const normalized = slug.trim().toLowerCase();
  return (
    SPECIALTY_VISUALS[normalized] ?? {
      label: slug.replace(/-/g, ' '),
      icon: '📋',
      borderActive: 'border-primary',
      textActive: 'text-primary',
      bgActive: 'bg-primary/[0.06]',
    }
  );
}

export function formatDiseaseCategoryLabels(
  disease: Pick<DiseaseRecord, 'category' | 'categories'>
): string {
  return getDiseaseCategorySlugs(disease)
    .map((slug) => {
      const visual = getSpecialtyVisual(slug);
      return `${visual.icon} ${visual.label}`;
    })
    .join(' • ');
}
