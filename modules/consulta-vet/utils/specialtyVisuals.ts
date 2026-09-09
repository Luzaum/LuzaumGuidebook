import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  Apple,
  Baby,
  Bone,
  Brain,
  Bug,
  CircleDot,
  ClipboardList,
  Droplet,
  Droplets,
  Ear,
  Eye,
  Filter,
  FlaskConical,
  Hammer,
  HeartHandshake,
  HeartPulse,
  Microscope,
  Ribbon,
  Scan,
  Scissors,
  Shield,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Utensils,
  Wind,
} from 'lucide-react';
import type { DiseaseRecord } from '../types/disease';
import { getDiseaseCategorySlugs, normalizeCategorySlug } from './diseaseCategories';

export interface SpecialtyVisual {
  label: string;
  icon: string;
  Icon: LucideIcon;
  borderActive: string;
  textActive: string;
  bgActive: string;
}

export const SPECIALTY_VISUALS: Record<string, SpecialtyVisual> = {
  'emergencia-intensivismo': {
    label: 'Emergência / Intensivismo',
    icon: '',
    Icon: Siren,
    borderActive: 'border-red-500',
    textActive: 'text-red-600 dark:text-red-400',
    bgActive: 'bg-red-500/[0.06]',
  },
  'emergencia-uti': {
    label: 'Emergência / Intensivismo',
    icon: '',
    Icon: Siren,
    borderActive: 'border-red-500',
    textActive: 'text-red-600 dark:text-red-400',
    bgActive: 'bg-red-500/[0.06]',
  },
  hematologia: {
    label: 'Hematologia',
    icon: '',
    Icon: Droplet,
    borderActive: 'border-rose-600',
    textActive: 'text-rose-600 dark:text-rose-400',
    bgActive: 'bg-rose-500/[0.06]',
  },
  infectologia: {
    label: 'Infectologia',
    icon: '',
    Icon: Microscope,
    borderActive: 'border-emerald-500',
    textActive: 'text-emerald-600 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/[0.06]',
  },
  infecciosas: {
    label: 'Infectologia',
    icon: '',
    Icon: Microscope,
    borderActive: 'border-emerald-500',
    textActive: 'text-emerald-600 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/[0.06]',
  },
  parasitologia: {
    label: 'Parasitologia',
    icon: '',
    Icon: Bug,
    borderActive: 'border-lime-600',
    textActive: 'text-lime-700 dark:text-lime-400',
    bgActive: 'bg-lime-500/[0.06]',
  },
  gastroenterologia: {
    label: 'Gastroenterologia',
    icon: '',
    Icon: Utensils,
    borderActive: 'border-orange-500',
    textActive: 'text-orange-600 dark:text-orange-400',
    bgActive: 'bg-orange-500/[0.06]',
  },
  endocrinologia: {
    label: 'Endocrinologia',
    icon: '',
    Icon: FlaskConical,
    borderActive: 'border-purple-500',
    textActive: 'text-purple-600 dark:text-purple-400',
    bgActive: 'bg-purple-500/[0.06]',
  },
  respiratorio: {
    label: 'Pneumologia',
    icon: '',
    Icon: Wind,
    borderActive: 'border-sky-500',
    textActive: 'text-sky-600 dark:text-sky-400',
    bgActive: 'bg-sky-500/[0.06]',
  },
  cardiologia: {
    label: 'Cardiologia',
    icon: '',
    Icon: HeartPulse,
    borderActive: 'border-rose-500',
    textActive: 'text-rose-600 dark:text-rose-400',
    bgActive: 'bg-rose-500/[0.06]',
  },
  'nefrologia-urologia': {
    label: 'Nefrologia e Urologia',
    icon: '',
    Icon: Filter,
    borderActive: 'border-amber-500',
    textActive: 'text-amber-600 dark:text-amber-400',
    bgActive: 'bg-amber-500/[0.06]',
  },
  dermatologia: {
    label: 'Dermatologia',
    icon: '',
    Icon: Sparkles,
    borderActive: 'border-pink-500',
    textActive: 'text-pink-600 dark:text-pink-400',
    bgActive: 'bg-pink-500/[0.06]',
  },
  neurologia: {
    label: 'Neurologia',
    icon: '',
    Icon: Brain,
    borderActive: 'border-indigo-500',
    textActive: 'text-indigo-600 dark:text-indigo-400',
    bgActive: 'bg-indigo-500/[0.06]',
  },
  oncologia: {
    label: 'Oncologia',
    icon: '',
    Icon: Ribbon,
    borderActive: 'border-yellow-500',
    textActive: 'text-yellow-600 dark:text-yellow-400',
    bgActive: 'bg-yellow-500/[0.06]',
  },
  'reproducao-neonatologia': {
    label: 'Reprodução e Neonatologia',
    icon: '',
    Icon: Baby,
    borderActive: 'border-fuchsia-500',
    textActive: 'text-fuchsia-600 dark:text-fuchsia-400',
    bgActive: 'bg-fuchsia-500/[0.06]',
  },
  ortopedia: {
    label: 'Ortopedia',
    icon: '',
    Icon: Bone,
    borderActive: 'border-teal-500',
    textActive: 'text-teal-600 dark:text-teal-400',
    bgActive: 'bg-teal-500/[0.06]',
  },
  'cirurgia-ortopedica-traumatologia': {
    label: 'Cirurgia ortopédica / Traumatologia',
    icon: '',
    Icon: Hammer,
    borderActive: 'border-teal-600',
    textActive: 'text-teal-700 dark:text-teal-400',
    bgActive: 'bg-teal-500/[0.06]',
  },
  'cirurgia-tecidos-moles': {
    label: 'Cirurgia de tecidos moles',
    icon: '',
    Icon: Scissors,
    borderActive: 'border-emerald-600',
    textActive: 'text-emerald-700 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/[0.06]',
  },
  'cirurgia-neurologica': {
    label: 'Cirurgia neurológica',
    icon: '',
    Icon: Brain,
    borderActive: 'border-indigo-600',
    textActive: 'text-indigo-700 dark:text-indigo-400',
    bgActive: 'bg-indigo-500/[0.06]',
  },
  imunologia: {
    label: 'Imunologia',
    icon: '',
    Icon: ShieldCheck,
    borderActive: 'border-violet-500',
    textActive: 'text-violet-600 dark:text-violet-400',
    bgActive: 'bg-violet-500/[0.06]',
  },
  odontologia: {
    label: 'Odontologia',
    icon: '',
    Icon: Smile,
    borderActive: 'border-cyan-500',
    textActive: 'text-cyan-600 dark:text-cyan-400',
    bgActive: 'bg-cyan-500/[0.06]',
  },
  'odontologia-odontostomatologia': {
    label: 'Odontologia',
    icon: '',
    Icon: Smile,
    borderActive: 'border-cyan-500',
    textActive: 'text-cyan-600 dark:text-cyan-400',
    bgActive: 'bg-cyan-500/[0.06]',
  },
  'hepatologia-pancreas': {
    label: 'Hepatologia e Pâncreas',
    icon: '',
    Icon: Activity,
    borderActive: 'border-yellow-600',
    textActive: 'text-yellow-700 dark:text-yellow-400',
    bgActive: 'bg-yellow-500/[0.06]',
  },
  'clinica-medica': {
    label: 'Clínica médica',
    icon: '',
    Icon: Stethoscope,
    borderActive: 'border-slate-500',
    textActive: 'text-slate-600 dark:text-slate-400',
    bgActive: 'bg-slate-500/[0.06]',
  },
  otologia: {
    label: 'Otologia',
    icon: '',
    Icon: Ear,
    borderActive: 'border-blue-500',
    textActive: 'text-blue-600 dark:text-blue-400',
    bgActive: 'bg-blue-500/[0.06]',
  },
  oftalmologia: {
    label: 'Oftalmologia',
    icon: '',
    Icon: Eye,
    borderActive: 'border-indigo-500',
    textActive: 'text-indigo-600 dark:text-indigo-400',
    bgActive: 'bg-indigo-500/[0.06]',
  },
  'anestesia-dor': {
    label: 'Dor / Anestesia / Analgesia',
    icon: '',
    Icon: Syringe,
    borderActive: 'border-purple-500',
    textActive: 'text-purple-600 dark:text-purple-400',
    bgActive: 'bg-purple-500/[0.06]',
  },
  'fluidoterapia-disturbios-hidroeletroliticos': {
    label: 'Fluidoterapia / Eletrólitos',
    icon: '',
    Icon: Droplets,
    borderActive: 'border-sky-500',
    textActive: 'text-sky-600 dark:text-sky-400',
    bgActive: 'bg-sky-500/[0.06]',
  },
  'diagnostico-por-imagem': {
    label: 'Diagnóstico por imagem',
    icon: '',
    Icon: Scan,
    borderActive: 'border-violet-500',
    textActive: 'text-violet-600 dark:text-violet-400',
    bgActive: 'bg-violet-500/[0.06]',
  },
  toxicologia: {
    label: 'Toxicologia',
    icon: '',
    Icon: AlertTriangle,
    borderActive: 'border-amber-600',
    textActive: 'text-amber-700 dark:text-amber-400',
    bgActive: 'bg-amber-500/[0.06]',
  },
  comportamento: {
    label: 'Comportamento',
    icon: '',
    Icon: Smile,
    borderActive: 'border-emerald-500',
    textActive: 'text-emerald-600 dark:text-emerald-400',
    bgActive: 'bg-emerald-500/[0.06]',
  },
  'nutricao-clinica': {
    label: 'Nutrição clínica',
    icon: '',
    Icon: Apple,
    borderActive: 'border-green-600',
    textActive: 'text-green-700 dark:text-green-400',
    bgActive: 'bg-green-500/[0.06]',
  },
  'medicina-preventiva': {
    label: 'Medicina preventiva',
    icon: '',
    Icon: Shield,
    borderActive: 'border-teal-500',
    textActive: 'text-teal-600 dark:text-teal-400',
    bgActive: 'bg-teal-500/[0.06]',
  },
  'cuidados-paliativos': {
    label: 'Cuidados paliativos',
    icon: '',
    Icon: HeartHandshake,
    borderActive: 'border-rose-400',
    textActive: 'text-rose-500 dark:text-rose-300',
    bgActive: 'bg-rose-500/[0.06]',
  },
  procedimentos: {
    label: 'Procedimentos',
    icon: '',
    Icon: ClipboardList,
    borderActive: 'border-slate-500',
    textActive: 'text-slate-600 dark:text-slate-400',
    bgActive: 'bg-slate-500/[0.06]',
  },
  outros: {
    label: 'Outros',
    icon: '',
    Icon: CircleDot,
    borderActive: 'border-slate-400',
    textActive: 'text-slate-500 dark:text-slate-400',
    bgActive: 'bg-slate-500/[0.06]',
  },
};

export function getSpecialtyVisual(slug: string): SpecialtyVisual {
  const normalized = normalizeCategorySlug(slug.trim().toLowerCase());
  return (
    SPECIALTY_VISUALS[normalized] ?? {
      label: slug.replace(/-/g, ' '),
      icon: '',
      Icon: CircleDot,
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
      return visual.label;
    })
    .join(' • ');
}
