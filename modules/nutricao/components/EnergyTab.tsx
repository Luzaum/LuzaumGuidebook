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
        <div id="page-calc-energia" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Cálculo de Energia</h1>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400 font-medium">
                    Necessidades energéticas precisas para cães e gatos
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="group">
                    <label htmlFor="species" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">Espécie</label>
                    <div className="relative">
                        <select id="species" value={species} onChange={(e) => setSpecies(e.target.value)} className="w-full p-3.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-800 dark:text-slate-200 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 appearance-none cursor-pointer">
                            <option value="dog">Cão 🐶</option>
                            <option value="cat">Gato 🐱</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="group">
                    <label htmlFor="weight" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">Peso Atual (kg)</label>
                    <input type="number" id="weight" placeholder="Ex: 15.5" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-800 dark:text-slate-200 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 placeholder:text-slate-400" step="0.1" min="0.1" />
                </div>
                <div className="group">
                    <label htmlFor="status" className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">Estado Fisiológico <div className="ml-1 scale-90 opacity-80 hover:opacity-100 transition-opacity"><HelpIcon term="status" onOpenModal={setModalContent} /></div></label>
                    <div className="relative">
                        <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="w-full p-3.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-800 dark:text-slate-200 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 appearance-none cursor-pointer truncate pr-10">
                            {Object.keys(factors[species]).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div id="results-container" className={`space-y-5 transition-all duration-500 transform ${calculationResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="result-card bg-gradient-to-r from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 backdrop-blur-md border border-blue-200 dark:border-blue-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                            <h3 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2"><span className="text-xl">💤</span> RER (Energia em Repouso)</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-400 mt-0.5">{calculationResults?.rerFormula || 'Ponto de partida.'}</p>
                        </div>
                        <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-300 drop-shadow-sm">{calculationResults?.rer.toFixed(1) || 0} <span className="text-lg font-bold opacity-80">kcal/dia</span></p>
                    </div>
                </div>

                <div className="result-card bg-gradient-to-r from-indigo-50/80 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10 backdrop-blur-md border border-indigo-200 dark:border-indigo-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
                    <div>
                        <h3 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2"><span className="text-xl">✖️</span> Fator (k)</h3>
                        <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-0.5">{calculationResults?.factorDesc || 'Multiplicador.'}</p>
                    </div>
                    <p className="text-3xl font-extrabold text-indigo-900 dark:text-indigo-300 drop-shadow-sm">{calculationResults?.k || 0.0}</p>
                </div>

                <div className="result-card bg-gradient-to-r from-emerald-50/80 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 backdrop-blur-md border border-emerald-200 dark:border-emerald-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
                    <div>
                        <h3 className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2"><span className="text-xl">🏃</span> NED (Energia Diária)</h3>
                        <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">Meta calórica para manutenção de peso.</p>
                    </div>
                    <p className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-300 drop-shadow-sm">{calculationResults?.derRange || calculationResults?.der.toFixed(1) || 0} <span className="text-lg font-bold opacity-80">kcal/dia</span></p>
                </div>
            </div>

            {isCritical && calculationResults && (
                <div className="progression-section mt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-2xl">⚠️</span>
                        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Plano de Progressão Alimentar</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 pointer-events-none"></div>
                            <h3 className="font-bold text-orange-700 dark:text-orange-400 mb-4 text-center text-lg">Protocolo de 3 Dias</h3>
                            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 relative z-10">
                                <li className="flex justify-between items-center p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Dia 1 (33%):</span>
                                    <strong className="text-orange-700 dark:text-orange-400 text-base">{(calculationResults.rer * 0.33).toFixed(1)} kcal</strong>
                                </li>
                                <li className="flex justify-between items-center p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Dia 2 (66%):</span>
                                    <strong className="text-orange-700 dark:text-orange-400 text-base">{(calculationResults.rer * 0.66).toFixed(1)} kcal</strong>
                                </li>
                                <li className="flex justify-between items-center p-3 bg-orange-100/50 dark:bg-orange-900/30 rounded-xl shadow-sm border border-orange-200 dark:border-orange-800/50">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-600"></div> Dia 3 (100%):</span>
                                    <strong className="text-orange-700 dark:text-orange-400 text-base">{calculationResults.rer.toFixed(1)} kcal</strong>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 pointer-events-none"></div>
                            <h3 className="font-bold text-red-700 dark:text-red-400 mb-4 text-center text-lg">Protocolo de 4 Dias</h3>
                            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 relative z-10">
                                <li className="flex justify-between items-center p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-400"></div> Dia 1 (25%):</span>
                                    <strong className="text-red-700 dark:text-red-400 text-base">{(calculationResults.rer * 0.25).toFixed(1)} kcal</strong>
                                </li>
                                <li className="flex justify-between items-center p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Dia 2 (50%):</span>
                                    <strong className="text-red-700 dark:text-red-400 text-base">{(calculationResults.rer * 0.50).toFixed(1)} kcal</strong>
                                </li>
                                <li className="flex justify-between items-center p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-600"></div> Dia 3 (75%):</span>
                                    <strong className="text-red-700 dark:text-red-400 text-base">{(calculationResults.rer * 0.75).toFixed(1)} kcal</strong>
                                </li>
                                <li className="flex justify-between items-center p-3 bg-red-100/50 dark:bg-red-900/30 rounded-xl shadow-sm border border-red-200 dark:border-red-800/50">
                                    <span className="font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-700"></div> Dia 4 (100%):</span>
                                    <strong className="text-red-700 dark:text-red-400 text-base">{calculationResults.rer.toFixed(1)} kcal</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
