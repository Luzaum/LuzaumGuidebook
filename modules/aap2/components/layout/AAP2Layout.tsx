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

            {/* Botão flutuante do Vetius no centro superior (Nav p/ Hub) */}
            <button
                type="button"
                onClick={onBackToHub}
                className={`absolute left-1/2 top-3 z-[120] -translate-x-1/2 flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-xl transition-all duration-300 active:scale-95 group ${isDarkMode ? 'border-white/10 bg-slate-900/90 text-white hover:bg-slate-800' : 'border-slate-200 bg-white/90 text-slate-900 hover:bg-slate-50'}`}
                title="Voltar ao Hub Vetius"
            >
                <img src="/apps/VETIUS.png" alt="Vetius" className="h-5 w-auto" />
                <span className="text-[10px] font-bold tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">HUB</span>
            </button>

            {/* Sidebar toggle better positioned */}
            <button
                type="button"
                onClick={() => setIsSidebarPinned((v) => !v)}
                className={`absolute left-6 top-5 z-[110] inline-flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-lg ${isDarkMode ? 'border-white/10 bg-slate-900/70 text-slate-200 hover:bg-slate-800' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'} ${sidebarVisible ? 'translate-x-[270px]' : 'translate-x-0'}`}
                title={isSidebarPinned ? 'Ocultar menu' : 'Fixar menu'}
                aria-label={isSidebarPinned ? 'Ocultar menu' : 'Fixar menu'}
                style={{
                    transform: sidebarVisible ? (isSidebarCollapsed ? 'translateX(82px)' : 'translateX(270px)') : 'translateX(0)'
                }}
            >
                <span className="material-symbols-outlined text-[22px]">{sidebarVisible ? 'menu_open' : 'menu'}</span>
            </button>

            <div
                className={`absolute left-0 top-0 z-[100] h-full ${isSidebarCollapsed ? 'w-[124px]' : 'w-[320px]'} transition-transform duration-300 ease-out ${sidebarVisible ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
                onMouseEnter={() => setIsSidebarHover(true)}
                onMouseLeave={() => setIsSidebarHover(false)}
            >
                <div className="h-full w-full overflow-hidden">
                    <ToxSidebar
                        activeKey={currentPage}
                        collapsed={isSidebarCollapsed}
                        onToggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        onNavigate={onNavigate}
                        onBackToHub={onBackToHub}
                        isDarkMode={isDarkMode}
                    />
                </div>
            </div>

            {/* Header toggle - Removido texto e simplificado para ser menos intrusivo */}
            <button
                type="button"
                onClick={() => setIsHeaderPinned((v) => !v)}
                className={`absolute right-10 top-5 z-[110] inline-flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-lg ${isDarkMode ? 'border-white/10 bg-slate-900/70 text-slate-200 hover:bg-slate-800/80' : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'}`}
                title={isHeaderPinned ? 'Ocultar cabeçalho' : 'Fixar cabeçalho'}
            >
                <span className="material-symbols-outlined text-[22px]">{isHeaderPinned ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
            </button>

            <main className="relative z-10 h-full w-full overflow-hidden">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'bg-purple-900/10' : 'bg-purple-200/30'}`} />
                <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none ${isDarkMode ? 'bg-blue-900/10' : 'bg-blue-100/30'}`} />

                <header
                    className={`absolute left-0 right-0 z-[80] shrink-0 border-b glass-panel transition-transform duration-300 ease-out ${headerVisible ? 'translate-y-0' : '-translate-y-[110%]'} ${isDarkMode ? 'border-slate-800 bg-[#171121]/80 backdrop-blur-md' : 'border-white/50 bg-white/70 backdrop-blur-md'}`}
                    onMouseEnter={() => setIsHeaderHover(true)}
                    onMouseLeave={() => setIsHeaderHover(false)}
                >
                    <div className="flex items-center justify-between px-8 py-4">
                        <div className="flex flex-1 items-center gap-4">
                            <h2 className={`hidden text-xl font-bold tracking-tight md:block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {pageTitle}
                            </h2>
                            <div className="group relative ml-8 w-full max-w-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                                </div>
                                <input
                                    className={`block w-full rounded-xl border-none py-2 pl-9 pr-3 text-xs shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#7e40e7]/50 ${isDarkMode ? 'bg-slate-800/60 text-white placeholder-slate-500 hover:bg-slate-800' : 'bg-white/40 text-slate-900 placeholder-slate-400 focus:bg-white'}`}
                                    placeholder="Pesquisar..."
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className={`relative rounded-lg p-2 transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-white/50'}`}>
                                <span className="material-symbols-outlined text-xl">notifications</span>
                            </button>
                            <div className={`mx-1 h-6 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
                            <div className="text-right hidden sm:block">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-[#7e40e7]">Sistema</p>
                                <p className="text-[10px] font-bold text-green-500">OPERACIONAL</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={`h-full overflow-y-auto scroll-smooth px-4 pb-20 pt-6 md:px-8 ${headerVisible ? 'pt-24' : 'pt-24'}`}>
                    {children}

                    <footer className={`mt-10 flex flex-col items-center justify-between border-t border-dashed py-6 text-[10px] md:flex-row ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
                        <p>© 2026 AAP2 Vetius • Ecossistema Clínico</p>
                        <div className="mt-2 flex gap-4 md:mt-0 font-medium">
                            <span className="cursor-pointer hover:text-[#7e40e7]">Tutorial</span>
                            <span className="cursor-pointer hover:text-[#7e40e7]">Protocolos Oficiais</span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};
