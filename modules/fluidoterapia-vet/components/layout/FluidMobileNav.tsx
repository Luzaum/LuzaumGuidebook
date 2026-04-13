import type { ReactNode } from 'react';
import { Activity, BookOpen, Brain, Droplet, Settings, Stethoscope, Syringe, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Tab } from './FluidSidebar';

const MOBILE_TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'calculator', label: 'Calc.', icon: <Activity className="h-5 w-5" /> },
  { id: 'resuscitation', label: 'Bolus', icon: <Zap className="h-5 w-5" /> },
  { id: 'osmotherapy', label: 'TCE', icon: <Brain className="h-5 w-5" /> },
  { id: 'guide', label: 'Guia', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'protocols', label: 'Protocolos', icon: <Stethoscope className="h-5 w-5" /> },
  { id: 'dilutions', label: 'Diluições', icon: <Syringe className="h-5 w-5" /> },
  { id: 'monitoring', label: 'Monitor.', icon: <Droplet className="h-5 w-5" /> },
  { id: 'settings', label: 'Ajustes', icon: <Settings className="h-5 w-5" /> },
];

interface FluidMobileNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function FluidMobileNav({ activeTab, setActiveTab }: FluidMobileNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-800 bg-slate-950/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md lg:hidden"
      aria-label="Navegação Fluidoterapia"
    >
      <div className="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MOBILE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex min-w-[4.25rem] shrink-0 snap-center flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors',
              activeTab === tab.id ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300',
            )}
          >
            <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', activeTab === tab.id ? 'bg-teal-500/15' : '')}>
              {tab.icon}
            </span>
            <span className="max-w-[4.5rem] truncate">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
