import { useState, type ReactNode } from 'react';
import { Activity, Beaker, BookOpen, Brain, Droplet, Menu, Settings, Stethoscope, Syringe, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../../components/ui/dialog';
import { cn } from '../../lib/utils';
import type { Tab } from './FluidSidebar';

const MOBILE_TABS: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'calculator', label: 'Cálculo', icon: <Activity className="h-5 w-5" /> },
  { id: 'resuscitation', label: 'Bolus', icon: <Zap className="h-5 w-5" /> },
  { id: 'osmotherapy', label: 'TCE', icon: <Brain className="h-5 w-5" /> },
  { id: 'guide', label: 'Guia', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'protocols', label: 'Protocolos', icon: <Stethoscope className="h-5 w-5" /> },
  { id: 'dilutions', label: 'Diluições', icon: <Syringe className="h-5 w-5" /> },
  { id: 'glucoseSolutions', label: 'Glicosada', icon: <Beaker className="h-5 w-5" /> },
  { id: 'monitoring', label: 'Alertas', icon: <Droplet className="h-5 w-5" /> },
  { id: 'settings', label: 'Ajustes', icon: <Settings className="h-5 w-5" /> },
];

interface FluidMobileNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function FluidMobileNav({ activeTab, setActiveTab }: FluidMobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-800 bg-slate-950/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md lg:hidden"
      aria-label="Navegação da Fluidoterapia Vet"
    >
      <div className="grid w-full grid-cols-5 gap-1 px-2">
        {MOBILE_TABS.slice(0, 4).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/80',
              activeTab === tab.id ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300',
            )}
          >
            <span className={cn('flex h-8 w-8 items-center justify-center rounded-full', activeTab === tab.id ? 'bg-teal-500/15' : '')}>
              {tab.icon}
            </span>
            <span className="max-w-[4.5rem] truncate">{tab.label}</span>
          </button>
        ))}
        <button type="button" aria-label="Todas as seções da Fluidoterapia" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className={cn('flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-medium', MOBILE_TABS.slice(4).some(tab => tab.id === activeTab) ? 'text-teal-400' : 'text-slate-400')}>
          <span className="flex h-8 w-8 items-center justify-center"><Menu className="h-5 w-5" /></span>
          Mais
        </button>
      </div>
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent onClose={() => setMenuOpen(false)}>
          <DialogHeader><DialogTitle>Seções da Fluidoterapia</DialogTitle></DialogHeader>
          <div className="grid gap-1 p-3">
            {MOBILE_TABS.map(tab => (
              <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }} aria-current={activeTab === tab.id ? 'page' : undefined} className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-foreground hover:bg-muted aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary">
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
