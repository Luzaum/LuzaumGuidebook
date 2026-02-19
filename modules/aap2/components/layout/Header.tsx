// ============================================================
// LAYOUT — Header
// ============================================================
import React from 'react';
import type { AppPage } from '../../types';

interface HeaderProps {
    currentPage: AppPage;
    onNavigate: (page: AppPage) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => (
    <header className="header">
        <button
            className="header-brand"
            onClick={() => onNavigate('home')}
            aria-label="Ir para a página inicial"
        >
            <span className="header-icon" aria-hidden="true">🐍</span>
            <span className="header-title">Animais Peçonhentos</span>
        </button>

        <nav className="header-nav" aria-label="Navegação principal">
            {(
                [
                    { page: 'bulario', label: 'Bulário' },
                    { page: 'suspeitas', label: 'Suspeitas' },
                    { page: 'tratamentos', label: 'Tratamentos' },
                ] as { page: AppPage; label: string }[]
            ).map(({ page, label }) => (
                <button
                    key={page}
                    className={`header-nav-btn ${currentPage === page ? 'header-nav-btn--active' : ''}`}
                    onClick={() => onNavigate(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {label}
                </button>
            ))}
        </nav>
    </header>
);
