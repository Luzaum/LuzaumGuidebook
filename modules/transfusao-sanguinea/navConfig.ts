import { 
  Calculator, 
  ClipboardCheck, 
  FlaskConical, 
  ShieldAlert, 
  Pill,
  LucideIcon 
} from 'lucide-react';

export type TransfusionPage = 'calculator' | 'prep' | 'crossmatch' | 'reactions' | 'drugs';

export interface TransfusionNavEntry {
  page: TransfusionPage;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const TRANSFUSION_NAV_ITEMS: TransfusionNavEntry[] = [
  { page: 'calculator', label: 'Calculadora 🧮', icon: Calculator },
  { page: 'prep', label: 'Preparo e Guias 📋', icon: ClipboardCheck },
  { page: 'crossmatch', label: 'Prova Cruzada 🔬', icon: FlaskConical },
  { page: 'reactions', label: 'Reações 🚨', icon: ShieldAlert },
  { page: 'drugs', label: 'Fármacos 💊', icon: Pill, badge: '6' }
];

export function titleForTransfusionPage(page: TransfusionPage): string {
  switch (page) {
    case 'calculator':
      return 'Calculadora de Transfusão';
    case 'prep':
      return 'Guia de Preparo e Monitoramento';
    case 'crossmatch':
      return 'Prova de Compatibilidade Cruzada';
    case 'reactions':
      return 'Gerenciador de Reações Agudas';
    case 'drugs':
      return 'Guia Rápido de Fármacos';
    default:
      return 'Transfusão Sanguínea';
  }
}
