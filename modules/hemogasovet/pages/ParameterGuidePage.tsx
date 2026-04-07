import React, { useState } from 'react';
import { parameterGuide } from '../data/parameterGuide';
import { cn } from '../../../lib/utils';
import { BookOpen, Droplet, Wind, Zap, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity, Brain } from 'lucide-react';

export default function ParameterGuidePage() {
  const [selectedParamId, setSelectedParamId] = useState(parameterGuide[0].id);

  const selectedParam = parameterGuide.find(p => p.id === selectedParamId) || parameterGuide[0];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'acid-base': return <Droplet className="w-5 h-5 text-purple-500" />;
      case 'oxygenation': return <Wind className="w-5 h-5 text-blue-500" />;
      case 'electrolyte': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'metabolite': return <Activity className="w-5 h-5 text-emerald-500" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'acid-base': return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case 'oxygenation': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case 'electrolyte': return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case 'metabolite': return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'acid-base': return "Ácido-Base";
      case 'oxygenation': return "Oxigenação";
      case 'electrolyte': return "Eletrólito";
      case 'metabolite': return "Metabólito";
      default: return "Geral";
    }
  };

  return (
    <div className="w-full py-2 h-[calc(100dvh-6.5rem)] min-h-[28rem] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          Guia de Parâmetros
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-lg">
          Explore a fisiologia profunda, significado clínico e armadilhas de cada componente da hemogasometria.
        </p>
      </div>
      
      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar parameters list */}
        <div className="w-64 shrink-0 flex flex-col gap-2 overflow-y-auto pr-2 pb-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
          {['acid-base', 'oxygenation', 'electrolyte', 'metabolite'].map(category => {
             const items = parameterGuide.filter(p => p.category === category);
             if(items.length === 0) return null;
             
             return (
               <div key={category} className="mb-4">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 pl-2">
                   {getCategoryLabel(category)}
                 </h3>
                 <div className="space-y-1">
                   {items.map(param => (
                     <button
                       key={param.id}
                       onClick={() => setSelectedParamId(param.id)}
                       className={cn(
                         "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                         selectedParamId === param.id 
                           ? "bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-purple-700 dark:text-purple-400" 
                           : "text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
                       )}
                     >
                       <span className="truncate">{param.name}</span>
                       {param.unit && <span className="text-[10px] opacity-60 ml-2 shrink-0">{param.unit}</span>}
                     </button>
                   ))}
                 </div>
               </div>
             )
          })}
        </div>

        {/* Main content display */}
        <div className="flex-1 overflow-y-auto pb-8 pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border", getCategoryColor(selectedParam.category))}>
                    {getCategoryLabel(selectedParam.category)}
                  </div>
                  {getCategoryIcon(selectedParam.category)}
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {selectedParam.name}
                  {selectedParam.unit && <span className="text-xl font-normal text-slate-400 dark:text-slate-500 ml-3">{selectedParam.unit}</span>}
                </h2>
                <h3 className="text-lg text-slate-500 dark:text-slate-400 font-medium">{selectedParam.fullName}</h3>
              </div>
            </div>

            {/* Description & Physiology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
               <div className="space-y-4">
                 <div>
                   <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                     <BookOpen className="w-4 h-4 text-purple-500" />
                     O que é?
                   </h4>
                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                     {selectedParam.description}
                   </p>
                 </div>
                 
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                   <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                     <Brain className="w-4 h-4 text-blue-500" />
                     Fisiologia Profunda
                   </h4>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     {selectedParam.physiology}
                   </p>
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                   <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                     <Activity className="w-4 h-4 text-emerald-500" />
                     Importância Clínica
                   </h4>
                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                     {selectedParam.importance}
                   </p>
                 </div>

                 {/* High / Low Interpretations */}
                 <div className="grid grid-cols-1 gap-4">
                   <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
                     <h5 className="text-rose-800 dark:text-rose-400 font-bold flex items-center gap-2 mb-1">
                       <ArrowUpRight className="w-4 h-4" /> Alta significa:
                     </h5>
                     <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{selectedParam.highMeaning}</p>
                   </div>
                   
                   <div className="bg-sky-50 dark:bg-sky-900/10 p-4 rounded-xl border border-sky-100 dark:border-sky-900/30">
                     <h5 className="text-sky-800 dark:text-sky-400 font-bold flex items-center gap-2 mb-1">
                       <ArrowDownRight className="w-4 h-4" /> Baixa significa:
                     </h5>
                     <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{selectedParam.lowMeaning}</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Bottom Content (Scenarios & Pitfalls) */}
            <div className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-8">
               
               <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Cenários Clínicos Comuns</h4>
                  <ul className="space-y-2">
                    {selectedParam.clinicalScenarios.map((scenario, i) => (
                      <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{scenario}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-5 rounded-r-xl">
                   <h4 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-500 mb-2">
                     <AlertTriangle className="w-5 h-5" />
                     Armadilhas (Pitfalls)
                   </h4>
                   <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                     {selectedParam.pitfalls}
                   </p>
                 </div>

                 <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-2">Relacionamentos Clínicos</h4>
                   <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                     {selectedParam.relationship}
                   </p>
                 </div>
               </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
