import React, { useMemo, useState } from 'react';
import { ToxSidebar } from './ToxSidebar';
import type { AppPage } from '../../types';
import '../dashboard/dashboard.css';

interface AAP2LayoutProps {
    children: React.ReactNode;
    currentPage: AppPage;
    onNavigate: (page: AppPage) => void;
    onOpenEncyclopedia: (params?: { query?: string }) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    onBackToHub: () => void;
}

export const AAP2Layout: React.FC<AAP2LayoutProps> = ({
    children,
    currentPage,
    onNavigate,
    onOpenEncyclopedia,
    isDarkMode,
    toggleTheme,
    onBackToHub,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSidebarPinned, setIsSidebarPinned] = useState(false);
    const [isSidebarHover, setIsSidebarHover] = useState(false);
    const [isHeaderPinned, setIsHeaderPinned] = useState(false);
    const [isHeaderHover, setIsHeaderHover] = useState(false);

    const sidebarVisible = isSidebarPinned || isSidebarHover;
    const headerVisible = isHeaderPinned || isHeaderHover;

    const pageTitle = useMemo(() => {
        if (currentPage === 'home') return 'Dashboard';
        if (currentPage === 'enciclopedia') return 'Enciclopedia';
        if (currentPage === 'suspeitas') return 'Suspeitas';
        if (currentPage === 'tratamentos') return 'Protocolos';
        return currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('_', ' ');
    }, [currentPage]);

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            onOpenEncyclopedia({ query: searchTerm.trim() });
        }
    };

    return (
        <div className={`relative h-screen w-full overflow-hidden font-display ${isDarkMode ? 'bg-[#171121] text-slate-100' : 'bg-[#f3f4f6] text-slate-900'}`}>
            <div
                className="absolute left-0 top-0 z-[85] h-full w-4"
                onMouseEnter={() => setIsSidebarHover(true)}
                onMouseLeave={() => setIsSidebarHover(false)}
                aria-hidden="true"
            />

            <button
                type="button"
                onClick={() => setIsSidebarPinned((v) => !v)}
                className={`absolute left-3 top-3 z-[110] inline-flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-xl transition ${isDarkMode ? 'border-white/10 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'}`}
                title={isSidebarPinned ? 'Ocultar menu lateral automático' : 'Fixar menu lateral'}
                aria-label={isSidebarPinned ? 'Ocultar menu lateral automático' : 'Fixar menu lateral'}
            >
                <span className="material-symbols-outlined text-[20px]">{isSidebarPinned ? 'left_panel_close' : 'left_panel_open'}</span>
            </button>

            <div
                className={`absolute left-0 top-0 z-[100] h-full w-[320px] transition-transform duration-300 ease-out ${sidebarVisible ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
                onMouseEnter={() => setIsSidebarHover(true)}
                onMouseLeave={() => setIsSidebarHover(false)}
            >
                <ToxSidebar
                    activeKey={currentPage}
                    collapsed={isSidebarCollapsed}
                    onToggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    onNavigate={onNavigate}
                    onBackToHub={onBackToHub}
                    isDarkMode={isDarkMode}
                />
            </div>

            <div
                className="absolute top-0 left-0 z-[75] h-4 w-full"
                onMouseEnter={() => setIsHeaderHover(true)}
                onMouseLeave={() => setIsHeaderHover(false)}
                aria-hidden="true"
            />

            <button
                type="button"
                onClick={() => setIsHeaderPinned((v) => !v)}
                className={`absolute left-1/2 top-2 z-[110] -translate-x-1/2 inline-flex h-9 items-center gap-1 rounded-full border px-3 text-xs font-semibold backdrop-blur-xl transition ${isDarkMode ? 'border-white/10 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'}`}
                title={isHeaderPinned ? 'Ocultar barra superior automatica' : 'Fixar barra superior'}
                aria-label={isHeaderPinned ? 'Ocultar barra superior automatica' : 'Fixar barra superior'}
            >
                <span className="material-symbols-outlined text-[16px]">{isHeaderPinned ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
                {isHeaderPinned ? 'Topo fixo' : 'Mostrar topo'}
            </button>

            <main className="relative z-10 h-full w-full overflow-hidden">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-200/40'}`} />
                <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100/40'}`} />

                <header
                    className={`absolute left-0 right-0 z-[80] shrink-0 border-b glass-panel transition-transform duration-300 ease-out ${headerVisible ? 'translate-y-0' : '-translate-y-[110%]'} ${isDarkMode ? 'border-slate-800' : 'border-white/50'}`}
                    onMouseEnter={() => setIsHeaderHover(true)}
                    onMouseLeave={() => setIsHeaderHover(false)}
                >
                    <div className="flex items-center justify-between px-8 py-5">
                        <div className="flex flex-1 items-center gap-4">
                            <h2 className={`hidden text-2xl font-bold tracking-tight md:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {pageTitle}
                            </h2>
                            <div className="group relative ml-8 w-full max-w-md">
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-slate-400 transition-colors group-focus-within:text-[#7e40e7]">search</span>
                                </div>
                                <input
                                    className={`block w-full rounded-xl border-none py-2.5 pl-10 pr-3 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7e40e7]/50 ${isDarkMode ? 'bg-slate-800/80 text-white placeholder-slate-500 hover:bg-slate-800 focus:bg-slate-800' : 'bg-white/60 text-slate-900 placeholder-slate-400 focus:bg-white'}`}
                                    placeholder="Pesquisar por especies, toxinas ou sintomas..."
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className={`relative rounded-lg p-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-[#7e40e7]' : 'text-slate-500 hover:bg-white/50 hover:text-[#7e40e7]'}`}>
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-red-500" />
                            </button>
                            <button className={`rounded-lg p-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-[#7e40e7]' : 'text-slate-500 hover:bg-white/50 hover:text-[#7e40e7]'}`}>
                                <span className="material-symbols-outlined">chat_bubble</span>
                            </button>
                            <div className={`mx-2 h-8 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                            <button
                                onClick={toggleTheme}
                                className={`rounded-xl p-2 transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white/50 text-slate-600 hover:bg-white hover:text-[#7e40e7]'}`}
                                title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
                            >
                                <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                            </button>
                            <div className="ml-2 hidden text-right lg:block">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status do Sistema</p>
                                <p className="flex items-center justify-end gap-1 text-xs font-bold text-[#7e40e7]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={`h-full overflow-y-auto scroll-smooth px-4 pb-20 pt-6 md:px-8 ${headerVisible ? 'md:pt-28' : 'md:pt-8'}`}>
                    {children}

                    <div className={`mt-10 flex flex-col items-center justify-between border-t pt-6 text-xs md:flex-row ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
                        <p>© 2026 AAP2 Vetius. Todos os direitos reservados.</p>
                        <div className="mt-2 flex gap-4 md:mt-0">
                            <span className="cursor-pointer hover:text-[#7e40e7]">Termos de Uso</span>
                            <span className="cursor-pointer hover:text-[#7e40e7]">Privacidade</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
