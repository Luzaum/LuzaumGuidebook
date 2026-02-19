import React from 'react';
import type { AppPage } from '../../types';

interface HeaderProps {
    currentPage: AppPage;
    onNavigate: (page: AppPage) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const NAV_ITEMS: { page: AppPage; label: string }[] = [
    { page: 'enciclopedia', label: 'Enciclopedia' },
    { page: 'bulario', label: 'Bulario' },
    { page: 'suspeitas', label: 'Suspeitas' },
    { page: 'tratamentos', label: 'Tratamentos' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, isDarkMode, toggleTheme }) => (
    <header className={`header ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : ''}`}>
        <div className="flex items-center justify-between w-full px-4">
            <button
                className="header-brand flex items-center gap-2"
                onClick={() => onNavigate('home')}
                aria-label="Ir para a pagina inicial"
            >
                <span className="material-symbols-outlined header-icon text-2xl" aria-hidden="true">pets</span>
                <span className={`header-title font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Animais Peconhentos</span>
            </button>

            <div className="flex items-center gap-4">
                <nav className="header-nav flex gap-2" aria-label="Navegacao principal">
                    {NAV_ITEMS.map(({ page, label }) => {
                        const isActive = currentPage === page || (page === 'enciclopedia' && currentPage === 'species_detail');
                        return (
                            <button
                                key={page}
                                className={`header-nav-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-aap-primary text-white'
                                    : isDarkMode
                                        ? 'text-slate-300 hover:bg-slate-800'
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                onClick={() => onNavigate(page)}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {label}
                            </button>
                        );
                    })}
                </nav>

                <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>

                <button
                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-white/50 hover:text-aap-primary'}`}
                    onClick={toggleTheme}
                    title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
                >
                    <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>
            </div>
        </div>
    </header>
);
