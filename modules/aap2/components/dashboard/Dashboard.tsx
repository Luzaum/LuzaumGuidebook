import React, { useMemo, useState } from 'react';
import type { AppPage } from '../../types';
import './dashboard.css';

interface DashboardProps {
    onNavigate: (page: AppPage) => void;
    onOpenEncyclopedia: (initialQuery?: string) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    onBackToHub: () => void;
}

const IDENTIFICATION_CARDS = [
    {
        label: 'Serpentes',
        subtitle: 'Bothrops, Crotalus, Micrurus, Lachesis',
        bg: '/images/aap2/jararaca.jpg',
        query: 'serpentes',
        desc: 'Identifique jararacas, cascavéis, corais e surucucus por características visuais e sintomas.'
    },
    {
        label: 'Escorpiões',
        subtitle: 'Tityus serrulatus (Amarelo), Tityus bahiensis',
        bg: '/images/aap2/escorpiao-amarelo.jpg',
        query: 'escorpiao',
        desc: 'Escorpião amarelo é o mais perigoso. Identifique pelo serrilhado na cauda e coloração.'
    },
    {
        label: 'Aranhas',
        subtitle: 'Phoneutria (Armadeira), Loxosceles (Marrom)',
        bg: '/images/aap2/armadeira.jpg',
        query: 'aranha',
        desc: 'Armadeira assume postura de defesa. Aranha-marrom possui desenho de violino no dorso.'
    },
    {
        label: 'Anfíbios',
        subtitle: 'Rhinella (Sapo-cururu), Phyllomedusa',
        bg: '/images/aap2/sapo-cururu.jpg',
        query: 'sapo',
        desc: 'Intoxicação por bufotoxinas. Contato com mucosas ou ingestão acidental por cães.'
    },
    {
        label: 'Moluscos / Outros',
        subtitle: 'Lagartas (Lonomia), Caramujos, Abelhas',
        bg: '/images/aap2/lesmas-caracois.jpg',
        query: 'molusco',
        desc: 'Acidentes com animais peçonhentos atípicos e invertebrados terrestres.'
    },
];

const QUICK_ACTIONS: { page: AppPage; title: string; description: string; icon: string; color: string; bg: string }[] = [
    {
        page: 'nova_consulta',
        title: 'Dr. Luzaum AI',
        description: 'Triagem inteligente: informe sinais e receba análise e protocolo.',
        icon: 'psychology',
        color: 'text-[#7e40e7]',
        bg: 'bg-[#7e40e7]/10',
    },
    {
        page: 'suspeitas',
        title: 'Ferramenta de Suspeitas',
        description: 'Ranqueie hipóteses por sinais clínicos.',
        icon: 'stethoscope',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
    },
    {
        page: 'bulario',
        title: 'Bulário Peçonhento',
        description: 'Enciclopédia de espécies e tratamentos.',
        icon: 'menu_book',
        color: 'text-amber-600',
        bg: 'bg-amber-100',
    },
    {
        page: 'tratamentos',
        title: 'Protocolos',
        description: 'Guias de emergência e estabilização.',
        icon: 'medical_services',
        color: 'text-red-600',
        bg: 'bg-red-100',
    },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenEncyclopedia, isDarkMode, toggleTheme, onBackToHub }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            onOpenEncyclopedia(searchTerm.trim());
        }
    };

    return (
        <div className={`min-h-screen w-full flex overflow-hidden font-display ${isDarkMode ? 'bg-[#171121] text-slate-100' : 'bg-[#f3f4f6] text-slate-900'}`}>
            {/* Sidebar with Glassmorphism */}
            <aside className={`hidden lg:flex w-72 h-full flex-col justify-between glass-sidebar shrink-0 z-20 transition-all duration-300 border-r ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 flex items-center gap-3">
                        <div className="bg-gradient-to-br from-[#7e40e7] to-[#5e2bb8] rounded-xl w-10 h-10 flex items-center justify-center shadow-lg shadow-[#7e40e7]/30 text-white">
                            <span className="material-symbols-outlined text-2xl">pets</span>
                        </div>
                        <div>
                            <h1 className={`text-lg font-bold leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AAP2 Vetius</h1>
                            <p className="text-[#7e40e7] text-xs font-bold mt-1 tracking-wide">Toxicologia Veterinária</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Menu Principal</p>
                        <button
                            onClick={() => onNavigate('home')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${isDarkMode ? 'bg-[#7e40e7]/20 text-[#7e40e7]' : 'bg-[#7e40e7]/10 text-[#7e40e7]'}`}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => onNavigate('enciclopedia')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                        >
                            <span className="material-symbols-outlined">menu_book</span>
                            <span>Enciclopédia</span>
                        </button>
                        <button
                            onClick={() => onNavigate('bulario')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                        >
                            <span className="material-symbols-outlined">inventory_2</span>
                            <span>Bulário</span>
                        </button>
                        <button
                            onClick={() => onNavigate('tratamentos')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                        >
                            <span className="material-symbols-outlined">medical_services</span>
                            <span>Protocolos</span>
                        </button>

                        <div className="pt-6 pb-2">
                            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ferramentas</p>
                            <button
                                onClick={() => onNavigate('suspeitas')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                            >
                                <span className="material-symbols-outlined">stethoscope</span>
                                <span>Suspeitas</span>
                            </button>
                        </div>

                        <div className="pt-6 pb-2">
                            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sistema</p>
                            <button
                                onClick={() => { }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                            >
                                <span className="material-symbols-outlined">settings</span>
                                <span>Configurações</span>
                            </button>
                            <button
                                onClick={() => { }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                            >
                                <span className="material-symbols-outlined">help</span>
                                <span>Suporte</span>
                            </button>
                        </div>
                    </nav>

                    <div className="p-4">
                        <button
                            onClick={() => onNavigate('historico')}
                            className="w-full flex items-center justify-center gap-2 bg-[#7e40e7] hover:bg-[#5e2bb8] text-white py-3.5 px-4 rounded-xl shadow-lg shadow-[#7e40e7]/25 transition-all active:scale-95 font-bold text-sm tracking-tight"
                        >
                            <span className="material-symbols-outlined text-xl">psychology</span>
                            <span>Dr. Luzaum AI</span>
                        </button>
                    </div>

                    <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200/60 bg-white/50'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWe7Fd0Mjd6RDb7RdyROid-tuPRGsdEPxvqY7YHESxTQv7ypRv-kEgqdcllYihBE-F-L1ZthZwpDvPCbKh-BBFMg19pJE5Ao2IrjPfNytbvncVqjUC42T1JW4RfU98nRr5o2EOrrPSSls1Vx43b8Ok1flg_FhMkXFt5_UhS3PZe78jFV3e1FHaxGkQYCQ5JoqaHxlzTqO0sEm9mP7vAjKjniHR6tB-BB5f_MNvUiEPaOD29N7I-jCPgL3uLw4tN9gDQQwXijaUYYVt')" }}></div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dr. Julia Santos</p>
                                <p className="text-xs text-slate-500 truncate">Veterinária Chefe</p>
                            </div>
                            <button
                                onClick={onBackToHub}
                                className="text-slate-400 hover:text-[#7e40e7] transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                                title="Voltar ao Hub"
                            >
                                <span className="material-symbols-outlined text-xl">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Background Blobs */}
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-200/40'}`}></div>
                <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/40'}`}></div>

                {/* Header */}
                <header className={`flex items-center justify-between px-8 py-5 glass-panel border-b border-l-0 border-r-0 border-t-0 z-10 shrink-0 sticky top-0 ${isDarkMode ? 'border-slate-800' : 'border-white/50'}`}>
                    <div className="flex items-center gap-4 flex-1">
                        <h2 className={`text-2xl font-bold tracking-tight hidden md:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Dashboard</h2>
                        <div className="max-w-md w-full ml-8 relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#7e40e7] transition-colors">search</span>
                            </div>
                            <input
                                className={`block w-full pl-10 pr-3 py-2.5 border-none rounded-xl text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7e40e7]/50 ${isDarkMode ? 'bg-slate-800/80 text-white placeholder-slate-500 hover:bg-slate-800 focus:bg-slate-800' : 'bg-white/60 text-slate-900 placeholder-slate-400 focus:bg-white'}`}
                                placeholder="Pesquisar por espécies, toxinas ou sintomas..."
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className={`relative p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-[#7e40e7]' : 'text-slate-500 hover:bg-white/50 hover:text-[#7e40e7]'}`}>
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-[#7e40e7]' : 'text-slate-500 hover:bg-white/50 hover:text-[#7e40e7]'}`}>
                            <span className="material-symbols-outlined">chat_bubble</span>
                        </button>
                        <div className={`h-8 w-px mx-2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-white/50 hover:bg-white text-slate-600 hover:text-[#7e40e7]'}`}
                            title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
                        >
                            <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                        </button>

                        <div className="text-right hidden lg:block ml-2">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status do Sistema</p>
                            <p className="text-xs font-bold text-[#7e40e7] flex items-center justify-end gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                            </p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scroll-smooth pb-20">
                    {/* Identification Guide (Accordion) */}
                    <section className="mb-10">
                        <h3 className={`text-lg font-bold mb-5 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            <span className="material-symbols-outlined text-[#7e40e7]">visibility</span>
                            Guia de Identificação Rápida
                        </h3>
                        <div className="species-card-container flex gap-4 h-[450px] w-full">
                            {IDENTIFICATION_CARDS.map((card, idx) => (
                                <div
                                    key={card.label}
                                    className="species-card rounded-2xl group/link relative flex cursor-pointer"
                                    onClick={() => onOpenEncyclopedia(card.query)}
                                >
                                    <div
                                        className="image-bg absolute inset-0 bg-cover bg-center transition-transform duration-700"
                                        style={{ backgroundImage: `url('${card.bg}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                                        <h4 className="text-white text-2xl font-bold mb-1 translate-y-8 group-hover/link:translate-y-0 transition-transform duration-300">{card.label}</h4>
                                        <div className="overlay-content text-white/90">
                                            <p className="text-xs font-bold text-[#efe9fc] uppercase tracking-wider mb-2">{card.subtitle}</p>
                                            <p className="text-xs leading-relaxed mb-4 text-slate-200 line-clamp-3">
                                                {card.desc}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 transition px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                                Ver Detalhes <span className="material-symbols-outlined text-xs">open_in_new</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick Actions Grid */}
                    <section className="mb-10">
                        <h3 className={`text-lg font-bold mb-5 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            <span className="material-symbols-outlined text-[#7e40e7]">bolt</span>
                            Ações Rápidas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {QUICK_ACTIONS.map((action, idx) => (
                                <button
                                    key={action.title}
                                    onClick={() => onNavigate(action.page)}
                                    className={`glass-panel p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer relative overflow-hidden text-left ${isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:border-[#7e40e7]/40' : 'bg-white border-slate-200 hover:border-[#7e40e7]/40'} ${idx === 0 ? 'ring-1 ring-[#7e40e7]/30' : ''}`}
                                >
                                    <div className={`absolute right-0 top-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-all opacity-0 group-hover:opacity-100 ${action.bg.replace('bg-', 'bg-').replace('100', '500/20')}`}></div>

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-slate-800 group-hover:bg-slate-700' : 'bg-slate-100 group-hover:bg-white'} ${action.color}`}>
                                            <span className="material-symbols-outlined text-3xl">{action.icon}</span>
                                        </div>
                                        {idx === 0 && (
                                            <span className="bg-[#7e40e7]/10 text-[#7e40e7] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-[#7e40e7]/20">Novo</span>
                                        )}
                                    </div>

                                    <h4 className={`text-lg font-bold mb-1 relative z-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{action.title}</h4>
                                    <p className={`text-xs mb-4 leading-relaxed relative z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{action.description}</p>

                                    <div className={`font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all relative z-10 ${action.color}`}>
                                        Acessar <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <div className={`mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-xs ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
                        <p>© 2026 AAP2 Vetius. Todos os direitos reservados.</p>
                        <div className="flex gap-4 mt-2 md:mt-0">
                            <span className="cursor-pointer hover:text-[#7e40e7]">Termos de Uso</span>
                            <span className="cursor-pointer hover:text-[#7e40e7]">Privacidade</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
