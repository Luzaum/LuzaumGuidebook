import re

filepath = r"c:\PROJETOS VET\Vetius\Fluidoterapia.tsx"

content = """import React, { useState, useEffect, useMemo, useCallback } from 'react';

const DROPS_PER_ML_MACRO = 20;
const SECONDS_PER_HOUR = 3600;

export default function Fluidoterapia({ onBack }: { onBack?: () => void }) {
    // --- State ---
    const [especie, setEspecie] = useState<string>('cao');
    const [nomePaciente, setNomePaciente] = useState('');
    const [peso, setPeso] = useState('');
    const [idade, setIdade] = useState('');
    const [estadoFisiologico, setEstadoFisiologico] = useState('adulto');
    
    // Config da Terapia
    const [taxaManutencao, setTaxaManutencao] = useState('60');
    
    // Reidratação
    const [incluirReidratacao, setIncluirReidratacao] = useState(false);
    const [desidratacao, setDesidratacao] = useState('8');
    const [tempoReidratacao, setTempoReidratacao] = useState('12');
    
    // Perdas Contínuas
    const [incluirPerdas, setIncluirPerdas] = useState(false);
    const [perdas, setPerdas] = useState('');
    
    // Comorbidades
    const [comorbidade, setComorbidade] = useState('');

    // --- Calculadora Choque ---
    const [taxaBolus, setTaxaBolus] = useState('15');
    const [tempoBolus, setTempoBolus] = useState('20');

    // --- Memoized Calculations ---
    const manutencaoRange = useMemo(() => {
        switch (estadoFisiologico) {
            case 'filhote': return { min: 80, max: 120 };
            case 'idoso': return { min: 40, max: 50 };
            case 'gestante': return { min: 60, max: 90 };
            case 'obeso': return { min: 40, max: 50 };
            default: return { min: 40, max: 80 };
        }
    }, [estadoFisiologico]);

    useEffect(() => {
        if (especie === 'cao') {
            setTaxaBolus('15');
        } else {
            setTaxaBolus('7');
        }
    }, [especie]);

    const bolusRange = useMemo(() => especie === 'cao' ? {min: 10, max: 20} : {min: 4, max: 10}, [especie]);

    const results = useMemo(() => {
        const p = parseFloat(peso) || 0;
        const tm = parseFloat(taxaManutencao) || 0;
        const vManutencao = p > 0 ? p * tm : 0;

        let vReidratacao = 0;
        if (incluirReidratacao && p > 0) {
            const d = parseFloat(desidratacao) || 0;
            vReidratacao = p * (d / 100) * 1000;
        }

        let vPerdas = 0;
        if (incluirPerdas) {
            vPerdas = parseFloat(perdas) || 0;
        }
        
        const vTotal = vManutencao + vReidratacao + vPerdas;
        
        // Taxa em 24h (para display simples) ou quebrada
        const tReid = parseFloat(tempoReidratacao) || 12;
        const manutencaoHr = vManutencao / 24;
        const perdasHr = vPerdas / 24;
        const reidratacaoHr = vReidratacao > 0 ? vReidratacao / tReid : 0;
        
        const taxaInicialHr = manutencaoHr + perdasHr + reidratacaoHr;
        const gotasSeg = taxaInicialHr > 0 ? (taxaInicialHr / SECONDS_PER_HOUR) * DROPS_PER_ML_MACRO : 0;
        
        const tb = parseFloat(taxaBolus) || 0;
        const vBolus = p * tb;

        return { vManutencao, vReidratacao, vPerdas, vTotal, taxaInicialHr, gotasSeg, vBolus };
    }, [peso, taxaManutencao, incluirReidratacao, desidratacao, tempoReidratacao, incluirPerdas, perdas, taxaBolus, tempoBolus]);


    return (
        <div className="w-full bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-slate-100 font-sans min-h-[calc(100vh-140px)] flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 shadow-xl relative">
            <style>{`
            .glass-panel {
                background: rgba(30, 41, 59, 0.4);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            }
            .glass-input {
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: white;
                transition: all 0.3s ease;
            }
            .glass-input:focus {
                border-color: #137fec;
                box-shadow: 0 0 0 2px rgba(19, 127, 236, 0.2);
                background: rgba(15, 23, 42, 0.8);
            }
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            .shimmer-bg {
                background: linear-gradient(90deg, rgba(19,127,236,0) 0%, rgba(19,127,236,0.15) 50%, rgba(19,127,236,0) 100%);
                background-size: 200% 100%;
                animation: shimmer 3s infinite;
            }
            input[type=range] {
                -webkit-appearance: none; 
                background: transparent; 
            }
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #137fec;
                cursor: pointer;
                margin-top: -8px; 
                box-shadow: 0 0 10px rgba(19, 127, 236, 0.5);
            }
            input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #334155;
                border-radius: 2px;
            }
            `}</style>
            
            <header className="h-16 border-b border-white/10 bg-[#111418] px-6 flex items-center justify-between shrink-0 top-0 sticky z-40 hidden lg:flex">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                        <span className="material-symbols-outlined text-[18px]">pets</span>
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-white">Vetius <span className="text-slate-500 font-normal text-sm ml-2 hidden sm:inline">Calculadora de Fluidoterapia</span></h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-400">Motor Ativo</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
                
                {/* --- LEFT SIDEBAR: PATIENT INTAKE --- */}
                <aside className="lg:col-span-3 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#111418] flex flex-col overflow-y-auto p-6 gap-6 relative z-10 custom-scrollbar h-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dados do Paciente</h2>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Espécie</label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="cursor-pointer group">
                                <input type="radio" name="species" value="cao" className="peer sr-only" checked={especie === 'cao'} onChange={() => setEspecie('cao')} />
                                <div className="h-24 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/40 peer-checked:bg-blue-500/10 dark:peer-checked:bg-blue-500/20 peer-checked:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800/80">
                                    <span className="material-symbols-outlined text-3xl">sound_detection_dog_barking</span>
                                    <span className="text-sm font-medium">Canino</span>
                                </div>
                            </label>
                            <label className="cursor-pointer group">
                                <input type="radio" name="species" value="gato" className="peer sr-only" checked={especie === 'gato'} onChange={() => setEspecie('gato')} />
                                <div className="h-24 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/40 peer-checked:bg-blue-500/10 dark:peer-checked:bg-blue-500/20 peer-checked:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 flex flex-col items-center justify-center gap-2 transition-all hover:bg-slate-100 dark:hover:bg-slate-800/80">
                                    <span className="material-symbols-outlined text-3xl">cruelty_free</span>
                                    <span className="text-sm font-medium">Felino</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Nome do Paciente</label>
                            <input type="text" className="w-full rounded-lg px-3 py-2.5 text-sm border border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:text-white focus:border-blue-500 outline-none transition-colors" placeholder="Ex: Thor" value={nomePaciente} onChange={e => setNomePaciente(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Peso (kg)</label>
                                <input type="number" min="0" step="0.1" className="w-full rounded-lg px-3 py-2.5 text-sm border border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:text-white focus:border-blue-500 outline-none transition-colors" placeholder="0.0" value={peso} onChange={e => setPeso(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Idade (anos)</label>
                                <input type="number" min="0" className="w-full rounded-lg px-3 py-2.5 text-sm border border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:text-white focus:border-blue-500 outline-none transition-colors" placeholder="0" value={idade} onChange={e => setIdade(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Estado Fisiológico</label>
                            <select className="w-full rounded-lg px-3 py-2.5 text-sm border border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:text-white focus:border-blue-500 outline-none transition-colors appearance-none" value={estadoFisiologico} onChange={e => setEstadoFisiologico(e.target.value)}>
                                <option value="adulto">Adulto (Manutenção)</option>
                                <option value="filhote">Filhote (&lt;6m)</option>
                                <option value="idoso">Idoso</option>
                                <option value="gestante">Gestante/Lactante</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10">
                        {estadoFisiologico === 'idoso' && (
                            <div className="bg-amber-100 dark:bg-slate-800/70 p-4 rounded-xl border border-amber-200 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-amber-500">warning</span>
                                    <span className="text-sm font-bold text-amber-800 dark:text-white">Alerta: Idoso</span>
                                </div>
                                <p className="text-xs text-amber-700/80 dark:text-slate-400 leading-relaxed">
                                    O paciente é <strong>Idoso</strong>. Monitore sobrecarga hídrica. Recomendado início com taxas conservadoras.
                                </p>
                            </div>
                        )}
                        {estadoFisiologico === 'filhote' && (
                            <div className="bg-blue-100 dark:bg-slate-800/70 p-4 rounded-xl border border-blue-200 dark:border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-blue-500">info</span>
                                    <span className="text-sm font-bold text-blue-800 dark:text-white">Nota Filhotes</span>
                                </div>
                                <p className="text-xs text-blue-700/80 dark:text-slate-400 leading-relaxed">
                                    Atenção ao risco de hipoglicemia e hipotermia nos fluidos.
                                </p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* --- CENTER PANEL: THERAPY CONFIGURATION --- */}
                <section className="lg:col-span-6 bg-slate-50 dark:bg-[#0B111A] flex flex-col relative overflow-y-auto h-full scroll-smooth">
                    <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
                    
                    <div className="p-6 md:p-8 flex-1 flex flex-col gap-8 relative z-10 pb-32">
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">Configuração da Terapia</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Ajuste os parâmetros com base na avaliação clínica.</p>
                            </div>
                            <div className="hidden sm:block">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-[16px]">science</span>
                                    AAHA Guidelines 2024
                                </span>
                            </div>
                        </div>

                        {/* 1. MANUTENÇÃO */}
                        <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                            <span className="material-symbols-outlined">water_drop</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Taxa de Manutenção</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Requerimento hídrico basal</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-slate-800 dark:text-white tabular-nums">{taxaManutencao}</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">mL/kg/dia</span>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <input type="range" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" min={manutencaoRange.min} max={manutencaoRange.max} value={taxaManutencao} onChange={e => setTaxaManutencao(e.target.value)} />
                                    <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                                        <span>{manutencaoRange.min} (Repouso)</span>
                                        <span>{(manutencaoRange.min+manutencaoRange.max)/2} (Padrão)</span>
                                        <span>{manutencaoRange.max} (Ativo)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. REIDRATAÇÃO & PERDAS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Reidratação */}
                            <div className={`bg-white dark:bg-slate-800/40 backdrop-blur-md border ${incluirReidratacao ? 'border-orange-500 shadow-lg shadow-orange-500/10' : 'border-slate-200 dark:border-white/10 opacity-80'} rounded-2xl p-6 transition-all relative overflow-hidden group`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                        <span className={`material-symbols-outlined ${incluirReidratacao ? 'text-orange-500' : 'text-slate-400'}`}>dry</span>
                                        <span className="font-medium">Reidratação</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={incluirReidratacao} onChange={e => setIncluirReidratacao(e.target.checked)} />
                                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                                <div className={`space-y-4 transition-all duration-300 ${!incluirReidratacao ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-500 dark:text-slate-400">% Desidratação</span>
                                            <span className="text-slate-800 dark:text-white font-mono">{desidratacao}%</span>
                                        </div>
                                        <input type="range" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" style={{accentColor: '#f97316'}} min="5" max="15" step="1" value={desidratacao} onChange={e => setDesidratacao(e.target.value)} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-500 dark:text-slate-400">Tempo de Correção</span>
                                            <span className="text-slate-800 dark:text-white font-mono">{tempoReidratacao} hrs</span>
                                        </div>
                                        <input type="range" className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" style={{accentColor: '#f97316'}} min="4" max="24" step="4" value={tempoReidratacao} onChange={e => setTempoReidratacao(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Perdas */}
                            <div className={`bg-white dark:bg-slate-800/40 backdrop-blur-md border ${incluirPerdas ? 'border-rose-500 shadow-lg shadow-rose-500/10' : 'border-slate-200 dark:border-white/10 opacity-80'} rounded-2xl p-6 transition-all relative overflow-hidden group`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                        <span className={`material-symbols-outlined ${incluirPerdas ? 'text-rose-500' : 'text-slate-400'}`}>fluid_balance</span>
                                        <span className="font-medium">Perdas Contínuas</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={incluirPerdas} onChange={e => setIncluirPerdas(e.target.checked)} />
                                        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                                    </label>
                                </div>
                                <div className={`space-y-4 transition-all duration-300 ${!incluirPerdas ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                                    <div className="space-y-2 pt-2">
                                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Vômito / Diarreia Estimados</label>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 focus-within:border-rose-500 transition-colors">
                                            <input type="number" className="w-20 bg-transparent outline-none text-slate-900 dark:text-white font-mono text-center" placeholder="0" min="0" value={perdas} onChange={e => setPerdas(e.target.value)} />
                                            <span className="text-xs text-slate-500 dark:text-slate-400">mL per 24h</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. COMORBIDADES & COND ESPECIAIS */}
                        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
                            <label className="text-sm font-medium text-slate-800 dark:text-slate-300 flex items-center gap-2">
                                Comorbidades Clínicas
                                <span className="material-symbols-outlined text-[16px] text-slate-500 cursor-help" title="Altera as recomendações e emite alertas na terapia!">help</span>
                            </label>
                            <div className="relative">
                                <select className="w-full rounded-xl px-4 py-3 bg-white dark:bg-slate-800/60 text-sm border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white appearance-none outline-none focus:border-blue-500 transition-colors" value={comorbidade} onChange={e => setComorbidade(e.target.value)}>
                                    <option value="">Nenhuma Condição Selecionada</option>
                                    <option value="cardiopata">Insuficiência Cardíaca Congestiva (ICC)</option>
                                    <option value="renal">Insuficiência Renal Aguda / Anúria</option>
                                    <option value="hipo">Hipoalbuminemia Severa</option>
                                </select>
                                <div className="absolute right-4 top-3 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined">expand_more</span>
                                </div>
                            </div>

                            {comorbidade === 'cardiopata' && (
                                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 backdrop-blur-md transition-all mt-4">
                                    <div className="shrink-0 text-rose-500 dark:text-rose-400 pt-1"><span className="material-symbols-outlined">ecg_heart</span></div>
                                    <div>
                                        <h4 className="text-sm font-bold text-rose-700 dark:text-rose-200">Alerta de Risco Cardíaco</h4>
                                        <p className="text-xs text-rose-600 dark:text-rose-200/70 mt-1 leading-relaxed">
                                            Paciente possui risco de sobrecarga de volume. Considere reduzir a taxa de manutenção em 25-50% e monitorar a frequência respiratória a cada 4 horas.
                                        </p>
                                    </div>
                                    <button onClick={() => setTaxaManutencao(String(Math.round(parseInt(taxaManutencao)*0.75)))} className="mt-2 sm:mt-0 ml-auto whitespace-nowrap text-xs font-bold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 self-start border border-rose-200 dark:border-rose-500/30 bg-white dark:bg-rose-950 px-3 py-1.5 rounded-lg shadow-sm">Aplicar Redução</button>
                                </div>
                            )}
                            
                            {comorbidade === 'renal' && (
                                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 backdrop-blur-md transition-all mt-4">
                                    <div className="shrink-0 text-rose-500 dark:text-rose-400 pt-1"><span className="material-symbols-outlined">water_drop</span></div>
                                    <div>
                                        <h4 className="text-sm font-bold text-rose-700 dark:text-rose-200">Alerta Renal Oligúrico</h4>
                                        <p className="text-xs text-rose-600 dark:text-rose-200/70 mt-1 leading-relaxed">
                                            Risco de hipervolemia fatal se não houver produção de urina. Provas fluidas ("Fluid Challenge") devem ser curtas e com extremo cuidado.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* BOTTOM CALCULATION BAR - FIXED AT BOTTOM */}
                    <div className="mt-auto sticky bottom-0 left-0 right-0 z-20 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl p-4 md:p-6 border-t border-slate-200 dark:border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-50px_100px_rgba(0,0,0,0.6)]">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center divide-x divide-slate-200 dark:divide-white/10">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Taxa de Infusão</span>
                                <span className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">{results.taxaInicialHr.toFixed(1)}</span>
                                <span className="text-[10px] md:text-xs text-blue-600 dark:text-blue-500 font-bold">mL/hr</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Volume (24h)</span>
                                <span className="text-xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 tracking-tight tabular-nums mt-1">{results.vTotal.toFixed(0)}</span>
                                <span className="text-[10px] md:text-xs text-slate-500 font-bold">mL</span>
                            </div>
                            <div className="flex flex-col gap-1 hidden md:flex">
                                <span className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Gotejamento</span>
                                <span className="text-xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 tracking-tight tabular-nums mt-1">{results.gotasSeg.toFixed(1)}</span>
                                <span className="text-[10px] md:text-xs text-slate-500 font-bold">gotas/seg (macro)</span>
                            </div>
                            <div className="flex flex-col gap-1 justify-center pl-4 md:pl-6">
                                <button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-95 shimmer-bg border border-blue-500/50 shrink-0 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">print</span>
                                    <span>Exportar Plano</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- RIGHT SIDEBAR: SMART HELP --- */}
                <aside className="hidden xl:flex lg:col-span-3 border-l border-slate-200 dark:border-white/10 bg-white dark:bg-[#111418] flex-col overflow-y-auto p-6 relative z-10 custom-scrollbar h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-500">lightbulb</span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Assistente Clínico</h3>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                        {/* Context 1: Desidratação */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase">Guia Clínico: Desidratação</h4>
                            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
                                <table className="w-full text-left text-xs bg-slate-50 dark:bg-transparent">
                                    <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                                        <tr>
                                            <th className="px-3 py-2.5 font-bold w-1/4">%</th>
                                            <th className="px-3 py-2.5 font-bold">Sinais Sugestivos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-white/5 bg-white dark:bg-[#161f2c]">
                                        <tr>
                                            <td className="px-3 py-2.5 text-blue-600 dark:text-blue-500 font-black">5%</td>
                                            <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400 leading-relaxed">Mucosas pegajosas, perda muito sutil de turgor.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2.5 text-orange-600 dark:text-orange-500 font-black">8%</td>
                                            <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400 leading-relaxed">Mucosas secas, turgor cutâneo reduzido, TPC prolongado.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2.5 text-rose-600 dark:text-rose-500 font-black">10%</td>
                                            <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400 leading-relaxed">Sinais de choque, taquicardia, pulso fraco, olhos encovados.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Context 2: Manutenção */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase">Contexto: Manutenção</h4>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 space-y-3 text-sm">
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                    A necessidade de manutenção diária base para um {especie === 'cao' ? 'cão' : 'gato'} é de <b className="dark:text-white text-slate-900 border-b border-blue-500/30">60 mL/kg/dia</b> em teoria.
                                </p>
                                <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-black/30 p-3 rounded-lg border border-slate-200 dark:border-white/5">
                                    <div className="flex justify-between mb-2">
                                        <span>Repouso</span>
                                        <span className="text-slate-900 dark:text-white font-mono">40-50 mL/kg</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Padrão</span>
                                        <span className="text-slate-900 dark:text-white font-mono">60 mL/kg</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pediátrico</span>
                                        <span className="text-slate-900 dark:text-white font-mono">80-120 mL/kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tip */}
                        <div className="mt-auto bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-500/20 p-5 rounded-xl shadow-sm">
                            <div className="flex gap-4">
                                <div className="shrink-0 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full w-10 h-10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px]">school</span>
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-indigo-900 dark:text-indigo-100 mb-1.5">Você sabia?</h5>
                                    <p className="text-xs text-indigo-800/80 dark:text-indigo-200/70 leading-relaxed">
                                        Gatos (<span className="italic font-medium">F. catus</span>) tendem a tolerar muito menos do que cães o repasse de fluídos intravenosos agressivos. Recomendamos redobrar a atenção na ausculta pulmonar em felinos!
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </aside>

            </main>
        </div>
    );
}

"""

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Fluidoterapia UX updated via write_to_file python bridge")
