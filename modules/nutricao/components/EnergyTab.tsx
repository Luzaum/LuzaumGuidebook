import React from 'react';
import { HelpIcon } from './UI/HelpIcon';
import { factors } from '../utils/nutritionUtils';

interface EnergyTabProps {
    species: string;
    setSpecies: (s: string) => void;
    weight: string;
    setWeight: (w: string) => void;
    status: string;
    setStatus: (s: string) => void;
    setModalContent: (content: any) => void;
    calculationResults: any;
    isCritical: boolean;
}

export const EnergyTab: React.FC<EnergyTabProps> = ({
    species,
    setSpecies,
    weight,
    setWeight,
    status,
    setStatus,
    setModalContent,
    calculationResults,
    isCritical
}) => {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Seção 1: Espécie & Peso */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-purple-500 rounded-full" /> Selecione a Espécie
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { id: 'dog', label: 'Cão', icon: '🐩', color: 'from-orange-500/20 to-red-500/20' },
                            { id: 'cat', label: 'Gato', icon: '🐈', color: 'from-blue-500/20 to-indigo-500/20' }
                        ].map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSpecies(s.id)}
                                className={`relative h-24 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden group ${species === s.id ? 'border-purple-500 bg-purple-500/10 scale-[1.02]' : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10'}`}
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform">{s.icon}</span>
                                <span className={`text-xs font-bold uppercase tracking-widest ${species === s.id ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
                                {species === s.id && <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-blue-500 rounded-full" /> Peso do Paciente
                    </label>
                    <div className="relative group">
                        <input
                            type="number"
                            placeholder="0.0"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            className="w-full h-24 bg-white/5 border-2 border-white/5 rounded-[24px] text-4xl font-black text-white px-8 transition-all focus:border-purple-500/50 focus:bg-white/10 outline-none placeholder:text-slate-800"
                            step="0.1"
                            min="0.1"
                        />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-xl font-black text-slate-600 uppercase tracking-widest group-focus-within:text-purple-500 transition-colors">KG</span>
                    </div>
                </div>
            </div>

            {/* Seção 2: Fator de Atividade */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full" /> Estado Fisiológico & Atividade
                        <HelpIcon term="status" onOpenModal={setModalContent} />
                    </label>
                    <button onClick={() => setModalContent(factors[species][status])} className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest">
                        Detalhes do Fator
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.keys(factors[species]).map(key => (
                        <button
                            key={key}
                            onClick={() => setStatus(key)}
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 group ${status === key ? 'border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-900/20' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                        >
                            <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${status === key ? 'text-purple-400' : 'text-slate-500'}`}>K = {factors[species][key].k}</div>
                            <div className={`text-xs font-bold leading-tight ${status === key ? 'text-white' : 'text-slate-300'}`}>{key}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Seção 3: Plano de Internação (Se Crítico) */}
            {isCritical && calculationResults && (
                <div className="pt-6 border-t border-white/5 animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-[28px] p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="p-3 bg-red-500/20 rounded-2xl text-red-500">
                                <span className="material-symbols-outlined">vital_signs</span>
                            </span>
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Protocolo de Realimentação</h3>
                                <p className="text-xs font-semibold text-red-400/60 uppercase tracking-widest">Paciente Hospitalizado / Crítico</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Transição em 3 Dias</h4>
                                <div className="space-y-2">
                                    {[0.33, 0.66, 1.00].map((perc, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                                            <span className="text-xs font-bold text-slate-400">Dia {i + 1} <span className="text-[10px] opacity-50 ml-1">({(perc * 100).toFixed(0)}%)</span></span>
                                            <span className="text-sm font-black text-white">{(calculationResults.rer * perc).toFixed(0)} <span className="text-[10px] text-slate-500 uppercase">kcal</span></span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Transição em 4 Dias</h4>
                                <div className="space-y-2">
                                    {[0.25, 0.50, 0.75, 1.00].map((perc, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                                            <span className="text-xs font-bold text-slate-400">Dia {i + 1} <span className="text-[10px] opacity-50 ml-1">({(perc * 100).toFixed(0)}%)</span></span>
                                            <span className="text-sm font-black text-white">{(calculationResults.rer * perc).toFixed(0)} <span className="text-[10px] text-slate-500 uppercase">kcal</span></span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
