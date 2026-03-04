import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarUserIdentity {
    name: string;
    id: string;
}

function readSidebarUserIdentity(): SidebarUserIdentity {
    try {
        const raw = localStorage.getItem('luzaum-user');
        if (raw) {
            const parsed = JSON.parse(raw) as {
                id?: string;
                name?: string;
                fullName?: string;
                email?: string;
            };
            const nameSource = String(parsed?.name || parsed?.fullName || parsed?.email || '').trim();
            const idSource = String(parsed?.id || '').trim();
            return {
                name: nameSource || 'Usuário VETIUS',
                id: idSource || 'local',
            };
        }
    } catch {
        // noop
    }
    return { name: 'Usuário VETIUS', id: 'local' };
}

interface HemogasometryLayoutProps {
    children: React.ReactNode;
    activeTab: 'analyzer' | 'quiz' | 'settings';
    setActiveTab: (tab: 'analyzer' | 'quiz' | 'settings') => void;
    onBack: () => void;
}

const NAV_ITEMS: Array<{ key: 'analyzer' | 'quiz' | 'settings'; label: string; icon: string }> = [
    { key: 'analyzer', label: 'Interpretação', icon: 'science' },
    { key: 'quiz', label: 'Modo Quiz', icon: 'school' },
    { key: 'settings', label: 'Configurações', icon: 'settings' },
];

export const HemogasometryLayout: React.FC<HemogasometryLayoutProps> = ({ children, activeTab, setActiveTab, onBack }) => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarPinned, setSidebarPinned] = useState(true);
    const [sidebarHovered, setSidebarHovered] = useState(false);
    const [user] = useState<SidebarUserIdentity>(() => readSidebarUserIdentity());

    // Handle responsive sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarPinned(false);
            } else {
                setSidebarPinned(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarExpanded = sidebarPinned || sidebarHovered;

    const SidebarContent = () => (
        <div className={`flex flex-col h-full bg-white dark:bg-[#091108] border-r border-slate-200 dark:border-white/10 transition-all duration-300 ${sidebarExpanded ? 'w-64' : 'w-20'}`}>
            {/* Head / Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 h-16">
                <button
                    type="button"
                    className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors w-full gap-3 overflow-hidden"
                    onClick={() => setSidebarPinned(!sidebarPinned)}
                    title={sidebarExpanded ? 'Recolher menu' : 'Expandir menu'}
                >
                    <span className="material-symbols-outlined flex-shrink-0">{sidebarExpanded ? 'left_panel_close' : 'right_panel_open'}</span>
                    {sidebarExpanded && <span className="text-sm font-medium whitespace-nowrap opacity-100 transition-opacity">Menu Lateral</span>}
                </button>
            </div>

            {/* App Logo */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-center">
                <button onClick={onBack} title="Voltar ao HUB" className="flex items-center gap-3 w-full group overflow-hidden">
                    <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0 transition-transform group-hover:scale-105">
                        <span className="material-symbols-outlined text-white text-[20px]">science</span>
                    </div>
                    {sidebarExpanded && (
                        <div className="flex flex-col items-start whitespace-nowrap opacity-100 transition-opacity">
                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Hemogasometria</span>
                            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest mt-1">Vetius</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.key;
                    return (
                        <button
                            key={item.key}
                            onClick={() => {
                                setActiveTab(item.key);
                                if (window.innerWidth < 1024) setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all overflow-hidden ${isActive
                                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 font-medium'}`}
                            title={item.label}
                        >
                            <span className="material-symbols-outlined flex-shrink-0 text-[22px]">{item.icon}</span>
                            {sidebarExpanded && <span className="text-sm whitespace-nowrap opacity-100 transition-opacity">{item.label}</span>}
                            {isActive && sidebarExpanded && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>}
                        </button>
                    );
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10">
                <button onClick={() => navigate('/hub')} className="w-full flex items-center gap-3 p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all overflow-hidden group" title="Perfil do Usuário">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-full p-1.5 flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    {sidebarExpanded && (
                        <div className="flex flex-col items-start whitespace-nowrap opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate w-32 text-left">{user.name}</span>
                            <span className="text-[10px] text-slate-500 truncate w-32 text-left">ID {user.id}</span>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-hidden isolate relative print:bg-white">
            {/* Desktop Sidebar */}
            <aside
                className="hidden lg:block h-screen fixed top-0 left-0 z-40"
                onMouseEnter={() => !sidebarPinned && setSidebarHovered(true)}
                onMouseLeave={() => !sidebarPinned && setSidebarHovered(false)}
            >
                <SidebarContent />
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${sidebarPinned ? 'lg:ml-64' : 'lg:ml-20'}`}>

                {/* Mobile Header (Only visible on small screens) */}
                <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 z-30 relative">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 -ml-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[16px]">science</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Hemogasometria<span className="text-blue-600 dark:text-blue-400">Vet</span></span>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <div className="flex-1 overflow-hidden relative z-10 w-full">
                    {children}
                </div>
            </main>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)} />
                    <div className="relative z-50 w-64 h-full shadow-2xl animate-in slide-in-from-left duration-300">
                        <SidebarContent />
                    </div>
                </div>
            )}
        </div>
    );
};
