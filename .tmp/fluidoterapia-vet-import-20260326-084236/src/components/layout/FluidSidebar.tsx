import { Activity, BookOpen, Droplet, Settings, Stethoscope, Syringe, Zap, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';

export type Tab = 'calculator' | 'resuscitation' | 'osmotherapy' | 'guide' | 'protocols' | 'dilutions' | 'monitoring' | 'settings';

interface FluidSidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function FluidSidebar({ activeTab, setActiveTab }: FluidSidebarProps) {
  const tabs = [
    { id: 'calculator', label: 'Calculadora', icon: <Activity className="w-5 h-5" /> },
    { id: 'resuscitation', label: 'Ressuscitação Volêmica', icon: <Zap className="w-5 h-5" /> },
    { id: 'osmotherapy', label: 'TCE / Osmoterapia', icon: <Brain className="w-5 h-5" /> },
    { id: 'guide', label: 'Guia Clínico', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'protocols', label: 'Doenças e Protocolos', icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'dilutions', label: 'Diluições e Soluções', icon: <Syringe className="w-5 h-5" /> },
    { id: 'monitoring', label: 'Monitorização e Alertas', icon: <Droplet className="w-5 h-5" /> },
    { id: 'settings', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-teal-400 flex items-center gap-2">
          <Droplet className="w-6 h-6" />
          Fluidoterapia
        </h1>
        <p className="text-xs text-slate-500 mt-1">Módulo Clínico VETIUS</p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-teal-500/10 text-teal-400 shadow-sm'
                : 'hover:bg-slate-800 hover:text-slate-100'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-400">
          <p className="font-medium text-slate-300 mb-1">Baseado em Evidências</p>
          <p>AAHA 2024 Fluid Therapy Guidelines</p>
        </div>
      </div>
    </div>
  );
}
