import { Activity, BookOpen, Brain, Droplet, Settings, Stethoscope, Syringe, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

export type Tab = 'calculator' | 'resuscitation' | 'osmotherapy' | 'guide' | 'protocols' | 'dilutions' | 'monitoring' | 'settings';

interface FluidSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function FluidSidebar({ activeTab, setActiveTab }: FluidSidebarProps) {
  const tabs = [
    { id: 'calculator', label: 'Calculadora', icon: <Activity className="w-5 h-5" /> },
    { id: 'resuscitation', label: 'Ressuscitacao Volemica', icon: <Zap className="w-5 h-5" /> },
    { id: 'osmotherapy', label: 'TCE / Osmoterapia', icon: <Brain className="w-5 h-5" /> },
    { id: 'guide', label: 'Guia Clinico', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'protocols', label: 'Doencas e Protocolos', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'dilutions', label: 'Diluicoes e Solucoes', icon: <Syringe className="w-5 h-5" /> },
    { id: 'monitoring', label: 'Monitorizacao e Alertas', icon: <Droplet className="w-5 h-5" /> },
    { id: 'settings', label: 'Configuracoes', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900 text-slate-300">
      <div className="p-6">
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
          <img
            src="/apps/fluidoterapia.png"
            alt="Fluidoterapia Vet"
            className="mx-auto h-auto w-full rounded-xl object-contain"
          />
        </div>
        <p className="mt-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-teal-400">Fluidoterapia Vet</p>
        <p className="mt-1 text-center text-xs text-slate-500">Modulo Clinico VETIUS</p>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              'w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 flex items-center gap-3',
              activeTab === tab.id ? 'bg-teal-500/10 text-teal-400 shadow-sm' : 'hover:bg-slate-800 hover:text-slate-100',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
          <p className="mb-1 font-medium text-slate-300">Baseado em evidencias</p>
          <p>AAHA 2024 Fluid Therapy Guidelines</p>
        </div>
      </div>
    </div>
  );
}
