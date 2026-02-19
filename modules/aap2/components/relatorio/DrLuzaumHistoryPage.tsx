import React from 'react';
import '../../styles/dr-luzaum.css';

interface HistoryItem {
    id: string;
    name: string;
    details: string;
    date: string;
    time: string;
    diagnosis: string;
    probability: string;
    riskColor: string;
    riskText: string;
    icon: string;
    iconColor: string;
    iconBg: string;
    iconBorder: string;
    opacity?: string;
}

const MOCK_HISTORY: HistoryItem[] = [
    {
        id: '#8392',
        name: 'Thor',
        details: 'Canino • Labrador • 28kg',
        date: '24 Out, 2023',
        time: '14:32',
        diagnosis: 'Acidente Crotálico',
        probability: '94%',
        riskColor: 'bg-red-500',
        riskText: 'text-red-500',
        icon: 'pets',
        iconColor: 'text-indigo-300',
        iconBg: 'bg-indigo-500/20',
        iconBorder: 'border-indigo-500/30'
    },
    {
        id: '#8391',
        name: 'Luna',
        details: 'Felino • Siamês • 4kg',
        date: '24 Out, 2023',
        time: '10:15',
        diagnosis: 'Intoxicação por Lírio',
        probability: '88%',
        riskColor: 'bg-orange-500',
        riskText: 'text-orange-400',
        icon: 'cruelty_free',
        iconColor: 'text-pink-300',
        iconBg: 'bg-pink-500/20',
        iconBorder: 'border-pink-500/30'
    },
    {
        id: '#8390',
        name: 'Max',
        details: 'Canino • Golden Ret. • 32kg',
        date: '23 Out, 2023',
        time: '18:45',
        diagnosis: 'Picada de Abelha',
        probability: 'Reação Alérgica Grave',
        riskColor: 'bg-yellow-500',
        riskText: 'text-yellow-400',
        icon: 'pets',
        iconColor: 'text-indigo-300',
        iconBg: 'bg-indigo-500/20',
        iconBorder: 'border-indigo-500/30'
    },
    {
        id: '#8389',
        name: 'Bob',
        details: 'Canino • SRD • 12kg',
        date: '23 Out, 2023',
        time: '09:12',
        diagnosis: 'Acidente Botrópico',
        probability: '91%',
        riskColor: 'bg-red-500',
        riskText: 'text-red-500',
        icon: 'pets',
        iconColor: 'text-indigo-300',
        iconBg: 'bg-indigo-500/20',
        iconBorder: 'border-indigo-500/30'
    },
    {
        id: '#8388',
        name: 'Mimi',
        details: 'Felino • Persa • 3.5kg',
        date: '22 Out, 2023',
        time: '22:30',
        diagnosis: 'Ingestão de Corpo Estranho',
        probability: 'Negativo para Toxinas',
        riskColor: 'bg-slate-500',
        riskText: 'text-slate-400',
        icon: 'cruelty_free',
        iconColor: 'text-pink-300',
        iconBg: 'bg-pink-500/20',
        iconBorder: 'border-pink-500/30'
    },
    {
        id: '#8387',
        name: 'Zeus',
        details: 'Canino • Rottweiler • 45kg',
        date: '22 Out, 2023',
        time: '16:10',
        diagnosis: 'Intoxicação por Chocolate',
        probability: 'Teobromina Estimada: Alta',
        riskColor: 'bg-orange-500',
        riskText: 'text-orange-400',
        icon: 'pets',
        iconColor: 'text-indigo-300',
        iconBg: 'bg-indigo-500/20',
        iconBorder: 'border-indigo-500/30'
    },
    {
        id: '#8386',
        name: 'Belinha',
        details: 'Canino • Poodle • 6kg',
        date: '21 Out, 2023',
        time: '08:00',
        diagnosis: 'Gastroenterite Inespecífica',
        probability: '',
        riskColor: 'bg-slate-500',
        riskText: 'text-slate-400',
        icon: 'pets',
        iconColor: 'text-indigo-300',
        iconBg: 'bg-indigo-500/20',
        iconBorder: 'border-indigo-500/30',
        opacity: 'opacity-60 hover:opacity-100'
    }
];

interface DrLuzaumHistoryPageProps {
    onBack: () => void;
    onNewTriage: () => void;
    onViewReport: (caseId: string) => void;
}

export const DrLuzaumHistoryPage: React.FC<DrLuzaumHistoryPageProps> = ({ onBack, onNewTriage, onViewReport }) => {
    return (
        <div className="bg-[#f6f5f8] dark:bg-[#161022] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display selection:bg-[#6a25f4] selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 px-6 py-4 border-b border-white/10" style={{ background: 'rgba(30, 27, 46, 0.6)', backdropFilter: 'blur(12px)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={onBack}>
                        <div className="relative size-10 rounded-xl bg-[#6a25f4]/20 flex items-center justify-center text-[#6a25f4] border border-[#6a25f4]/30 transition-transform group-hover:scale-105" style={{ boxShadow: '0 0 20px rgba(106, 37, 244, 0.4)' }}>
                            <span className="material-symbols-outlined text-2xl">pets</span>
                        </div>
                        <div>
                            <h1 className="text-white text-xl font-bold leading-tight tracking-tight group-hover:text-[#8b5cf6] transition-colors">Dr. Luzaum AI</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-[#8b5cf6] uppercase tracking-wider">Toxicologia Veterinária</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#1e1b2e] border border-white/10 hover:bg-white/5 transition-colors text-slate-300 text-sm font-semibold">
                            <span className="material-symbols-outlined text-[18px]">settings</span>
                            <span>Configurações</span>
                        </button>
                        <button
                            onClick={onNewTriage}
                            className="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#6a25f4] hover:bg-[#8b5cf6] transition-all hover:-translate-y-0.5 text-white text-sm font-bold shadow-lg shadow-[#6a25f4]/30"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            <span>Nova Triagem</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-6 lg:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">

                {/* Automatic Cleaning Policy Card */}
                <div className="rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden group"
                    style={{
                        background: 'linear-gradient(135deg, rgba(106, 37, 244, 0.15), rgba(30, 27, 46, 0.6))',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(106, 37, 244, 0.2)'
                    }}>
                    <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#6a25f4]/20 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="flex items-start gap-4 z-10">
                        <div className="p-3 rounded-lg bg-[#6a25f4]/20 text-[#6a25f4] border border-[#6a25f4]/30 shrink-0">
                            <span className="material-symbols-outlined text-2xl">auto_delete</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white mb-1">Política de Limpeza Automática</h2>
                            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                                Para garantir o desempenho ideal do sistema e a privacidade, mantemos apenas os <strong className="text-white">últimos 20 casos</strong> ativos no painel. O registro mais antigo (21º) será arquivado automaticamente ao iniciar um novo diagnóstico.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 z-10 shrink-0">
                        <span className="text-xs font-semibold text-[#6a25f4] uppercase tracking-wider">Capacidade Atual</span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white">18</span>
                            <span className="text-sm text-slate-400 font-medium">/ 20 Casos</span>
                        </div>
                        <div className="w-32 h-1.5 bg-[#1e1b2e] rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-[#6a25f4] shadow-[0_0_10px_rgba(106,37,244,0.8)]" style={{ width: '90%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="rounded-xl flex flex-col overflow-hidden h-full min-h-[600px] shadow-2xl shadow-black/20"
                    style={{
                        background: 'rgba(30, 27, 46, 0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>

                    <div className="px-6 py-5 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#1e1b2e]/50">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#6a25f4]">history</span>
                                Histórico Recente
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Casos finalizados pela IA são salvos automaticamente aqui.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative group/search">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg group-focus-within/search:text-[#6a25f4] transition-colors">search</span>
                                <input
                                    className="bg-[#161022] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6a25f4]/50 focus:ring-1 focus:ring-[#6a25f4]/50 w-64 transition-all"
                                    placeholder="Buscar paciente ou ID..."
                                    type="text"
                                />
                            </div>
                            <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
                            <button className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg" title="Filtrar">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[#1e1b2e]/80 border-b border-white/5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-3">Paciente</div>
                        <div className="col-span-2">Data/Hora</div>
                        <div className="col-span-4">Diagnóstico Final</div>
                        <div className="col-span-2 text-right">Relatório IA</div>
                    </div>

                    {/* Table Body */}
                    <div className="overflow-y-auto flex-1 dl-scroll">
                        {MOCK_HISTORY.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => onViewReport(item.id)}
                                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 cursor-pointer group transition-all duration-200 hover:bg-[#6a25f4]/5 hover:shadow-[inset_0_0_0_1px_rgba(106,37,244,0.2)] hover:-translate-y-[1px] ${item.opacity || ''}`}
                            >
                                <div className="col-span-1 text-slate-500 font-mono text-xs group-hover:text-slate-300 transition-colors">{item.id}</div>
                                <div className="col-span-3 flex items-center gap-3">
                                    <div className={`size-9 rounded-full flex items-center justify-center border transition-transform group-hover:scale-110 ${item.iconBg} ${item.iconColor} ${item.iconBorder}`}>
                                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{item.name}</div>
                                        <div className="text-xs text-slate-400">{item.details}</div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-slate-300 text-sm">{item.date}</div>
                                    <div className="text-xs text-slate-500">{item.time}</div>
                                </div>
                                <div className="col-span-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${item.riskColor} animate-pulse shadow-[0_0_8px_currentColor]`}></span>
                                        <span className="text-white font-medium text-sm">{item.diagnosis}</span>
                                    </div>
                                    <div className={`text-xs ${item.riskText}/80 mt-0.5`}>
                                        {item.probability}
                                    </div>
                                </div>
                                <div className="col-span-2 text-right">
                                    <span className="inline-flex items-center gap-1 text-[#6a25f4] text-xs font-bold uppercase tracking-wide group-hover:text-[#8b5cf6] transition-colors bg-[#6a25f4]/0 group-hover:bg-[#6a25f4]/10 px-2 py-1 rounded-lg">
                                        Ver Relatório <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="px-6 py-4 text-center border-t border-white/5">
                            <p className="text-xs text-slate-500">Exibindo os últimos casos. Os registros mais antigos foram arquivados.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
