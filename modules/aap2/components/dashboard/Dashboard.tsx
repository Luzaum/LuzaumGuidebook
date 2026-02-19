import React, { useMemo, useState } from 'react';
import type { AppPage } from '../../types';
import './dashboard.css';

interface DashboardProps {
    onNavigate: (page: AppPage) => void;
    onOpenEncyclopedia: (initialQuery?: string) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const FEATURED_SPECIES = [
    { label: 'Jararaca', subtitle: 'Bothrops spp.', risk: 'Alto risco', query: 'jararaca' },
    { label: 'Cascavel', subtitle: 'Crotalus durissus', risk: 'Alto risco', query: 'cascavel' },
    { label: 'Coral', subtitle: 'Micrurus spp.', risk: 'Alto risco', query: 'coral' },
    { label: 'Escorpiao amarelo', subtitle: 'Tityus serrulatus', risk: 'Risco moderado', query: 'escorpiao' },
];

const QUICK_ACTIONS: { page: AppPage; title: string; description: string; icon: string }[] = [
    {
        page: 'suspeitas',
        title: 'Ferramenta de Suspeitas',
        description: 'Ranqueie hipoteses por sinais clinicos e gere analise aprofundada.',
        icon: 'stethoscope',
    },
    {
        page: 'bulario',
        title: 'Bulario Peconhento',
        description: 'Consulte sinais, epidemiologia, diagnostico e tratamento por especie.',
        icon: 'menu_book',
    },
    {
        page: 'tratamentos',
        title: 'Protocolos de Tratamento',
        description: 'Acesse condutas de emergencia organizadas por tipo de acidente.',
        icon: 'medical_services',
    },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenEncyclopedia, isDarkMode, toggleTheme }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSpecies = useMemo(() => {
        const value = searchTerm.trim().toLowerCase();
        if (!value) {
            return FEATURED_SPECIES;
        }
        return FEATURED_SPECIES.filter(item =>
            `${item.label} ${item.subtitle} ${item.risk}`.toLowerCase().includes(value)
        );
    }, [searchTerm]);

    const handleSearchSubmit = () => {
        onOpenEncyclopedia(searchTerm.trim());
    };

    return (
        <div className={`min-h-screen w-full flex ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <aside className={`hidden lg:flex w-72 shrink-0 flex-col border-r ${isDarkMode ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`}>
                <div className="p-6 border-b border-current/10">
                    <h1 className="text-xl font-black tracking-tight">Animais Peconhentos</h1>
                    <p className="text-xs uppercase tracking-[0.2em] mt-1 text-aap-primary font-bold">Vetius</p>
                </div>
                <nav className="p-4 space-y-2">
                    <button type="button" className="w-full text-left px-4 py-3 rounded-xl bg-aap-primary/10 text-aap-primary font-bold">Dashboard</button>
                    <button type="button" className={`w-full text-left px-4 py-3 rounded-xl ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} onClick={() => onNavigate('enciclopedia')}>Enciclopedia</button>
                    <button type="button" className={`w-full text-left px-4 py-3 rounded-xl ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} onClick={() => onNavigate('bulario')}>Bulario</button>
                    <button type="button" className={`w-full text-left px-4 py-3 rounded-xl ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`} onClick={() => onNavigate('tratamentos')}>Tratamentos</button>
                </nav>
                <div className="mt-auto p-4">
                    <button type="button" className="w-full py-3 px-4 rounded-xl bg-aap-primary text-white font-bold" onClick={() => onNavigate('suspeitas')}>
                        Nova Consulta
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                <header className="flex flex-wrap gap-4 items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Hub de Identificacao</h2>
                        <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm mt-1`}>Busca rapida e acesso direto ao fluxo clinico.</p>
                    </div>
                    <button
                        type="button"
                        className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-yellow-400' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'}`}
                        onClick={toggleTheme}
                        title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
                    >
                        <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                </header>

                <section className={`rounded-3xl p-4 sm:p-6 border mb-8 ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            className={`flex-1 rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-aap-primary/30 ${isDarkMode ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                            placeholder="Buscar especie, sinal ou toxina..."
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    handleSearchSubmit();
                                }
                            }}
                        />
                        <button type="button" className="px-5 py-3 rounded-xl bg-aap-primary text-white font-bold" onClick={handleSearchSubmit}>
                            Buscar
                        </button>
                    </div>
                </section>

                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black">Identificacao Visual Rapida</h3>
                        <button type="button" className="text-sm font-bold text-aap-primary" onClick={() => onNavigate('enciclopedia')}>Ver catalogo completo</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {filteredSpecies.map(item => (
                            <button
                                key={item.label}
                                type="button"
                                className={`id-card text-left rounded-2xl p-5 border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-aap-primary/40' : 'bg-white border-slate-200 hover:border-aap-primary/40'}`}
                                onClick={() => onOpenEncyclopedia(item.query)}
                            >
                                <span className="inline-flex text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded-full bg-red-500/10 text-red-600">{item.risk}</span>
                                <h4 className="text-lg font-black mt-3">{item.label}</h4>
                                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>{item.subtitle}</p>
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-black mb-4">Acoes Rapidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {QUICK_ACTIONS.map(action => (
                            <button
                                key={action.page}
                                type="button"
                                className={`text-left rounded-2xl p-5 border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-aap-primary/40' : 'bg-white border-slate-200 hover:border-aap-primary/40'}`}
                                onClick={() => onNavigate(action.page)}
                            >
                                <span className="material-symbols-outlined text-aap-primary text-3xl">{action.icon}</span>
                                <h4 className="font-black text-lg mt-3">{action.title}</h4>
                                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm mt-2`}>{action.description}</p>
                            </button>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
