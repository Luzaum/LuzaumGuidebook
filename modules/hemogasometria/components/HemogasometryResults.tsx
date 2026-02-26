import React from 'react';
import { AnalysisResult } from '../types/hemoTypes';

interface Props {
  result: AnalysisResult;
  onOpenModal: (key: string) => void;
}

const ResultCard = ({ title, content, emoji, dataKey, onOpenModal, delay }: any) => (
    <div className={`bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/20 dark:border-slate-800 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4`} style={{ animationDelay: `${delay}ms` }}>
        <div className="text-3xl bg-white/50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner">{emoji}</div>
        <div className="flex-grow pt-1">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{title}</h3>
                {dataKey && <button type="button" onClick={() => onOpenModal(dataKey)} className="text-xl text-slate-400 hover:text-blue-500 transition-colors ml-2">❓</button>}
            </div>
            <div className="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
);

const ElectrolyteCard = ({ electrolyteStatus, onOpenModal, delay }: { electrolyteStatus: any[], onOpenModal: any, delay: number }) => {
    if (electrolyteStatus.length === 0) return null;
    return (
        <div className={`bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-800 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4`} style={{ animationDelay: `${delay}ms` }}>
            <div className="flex items-center gap-3">
              <div className="text-3xl bg-amber-500/10 text-amber-500 p-3 rounded-xl border border-amber-500/20">⚡</div>
              <h3 className="font-bold text-xl text-slate-800 dark:text-white">Eletrólitos e Proteínas</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {electrolyteStatus.map((e: any) => {
                    const isNormal = e.status === 'Normal';
                    return (
                        <div key={e.name} className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.02] ${isNormal ? 'bg-green-500/5 border-green-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                            <div>
                                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{e.name}</div>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="font-black text-2xl text-slate-900 dark:text-white">{e.value}</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase">{e.unit}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1 font-mono">Ref: {e.ref}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${isNormal ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>{e.status}</span>
                                <button type="button" onClick={() => onOpenModal(e.status.toLowerCase())} className="text-xl text-slate-400 hover:text-blue-500 transition-colors">❓</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const HemogasometryResults: React.FC<Props> = ({ result, onOpenModal }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard title="1. Origem da Amostra" content={result.sampleCheck.message} emoji={result.sampleCheck.emoji} dataKey="sampleType" onOpenModal={onOpenModal} delay={0} />
        <ResultCard title="2. Status do pH" content={`O paciente apresenta <strong>${result.phStatus.state}</strong>.`} emoji={result.phStatus.emoji} dataKey="diagnosis" onOpenModal={onOpenModal} delay={100} />
        <ResultCard title="3. Distúrbio Primário" content={`<div class="text-lg font-bold text-blue-600 dark:text-blue-400">${result.primaryDisorder.disorder}</div><div class="mt-1 text-slate-500 dark:text-slate-400">Causa Primária: ${result.primaryDisorder.cause}</div>`} emoji={result.primaryDisorder.emoji} dataKey="diagnosis" onOpenModal={onOpenModal} delay={200} />
        <ResultCard title="4. Status de Ventilação" content={result.ventilationStatus.state} emoji={result.ventilationStatus.emoji} dataKey="ventilation" onOpenModal={onOpenModal} delay={300} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ResultCard 
          title="5. Avaliação da Compensação" 
          content={`<div class="space-y-2">
            <div><span class="font-bold">Status:</span> ${result.compensation.status}</div>
            <div><span class="font-bold">pCO₂ Esperado:</span> ${result.compensation.expected.pco2 || result.compensation.expected.hco3 || 'N/A'}</div>
            ${result.compensation.mixedDisorder ? `<div class="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2 animate-pulse"><span class="material-symbols-outlined">warning</span> ${result.compensation.mixedDisorder}</div>` : ''}
          </div>`} 
          emoji='⚖️' 
          dataKey="compensation" 
          onOpenModal={onOpenModal} 
          delay={400} 
        />
        
        <ResultCard title="6. Avaliação da Oxigenação" content={result.oxygenation.content} emoji={result.oxygenation.emoji} dataKey="oxygenation" onOpenModal={onOpenModal} delay={500} />
      </div>

      <ElectrolyteCard electrolyteStatus={result.electrolyteStatus} onOpenModal={onOpenModal} delay={600} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard 
          title="7. Ânion Gap" 
          content={`<div class="grid grid-cols-2 gap-4">
            <div><div class="text-xs uppercase font-bold text-slate-400">AG Mensurado</div><div class="text-xl font-black">${result.anionGap.value}</div></div>
            <div><div class="text-xs uppercase font-bold text-slate-400">AG Corrigido</div><div class="text-xl font-black text-blue-500">${result.anionGap.correctedValue}</div></div>
          </div><div class="mt-3 p-2 bg-slate-500/10 rounded-lg text-center font-bold">${result.anionGap.interpretation}</div>`} 
          emoji='🧪' 
          dataKey="anionGap" 
          onOpenModal={onOpenModal} 
          delay={700} 
        />
        <ResultCard 
          title="8. Diagnósticos Diferenciais" 
          content={`<div class="space-y-1">${result.differentials.map(d => `<div class="flex items-center gap-2"><span class="size-1.5 rounded-full bg-blue-500"></span> ${d}</div>`).join('')}</div>`} 
          emoji='🩺' 
          dataKey="differentials" 
          onOpenModal={onOpenModal} 
          delay={800} 
        />
      </div>
    </div>
  );
};
