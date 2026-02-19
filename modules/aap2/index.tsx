import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AppPage } from './types';
import { EXPLANATIONS } from './data/explanations';
import { Header } from './components/layout/Header';
import { BularioPage } from './components/bulario/index';
import { SuspeitasPage } from './components/suspeitas/SuspeitasPage';
import { TratamentosPage } from './components/tratamentos/TratamentosPage';
import { Modal } from './components/ui';
import { EncyclopediaPage } from './components/encyclopedia/EncyclopediaPage';
import { SpeciesDetailPage } from './components/encyclopedia/SpeciesDetail';
import { Dashboard } from './components/dashboard/Dashboard';
import { sanitizeHtml } from './utils/sanitizeHtml';
import './styles/tokens.css';

const AAP2Module: React.FC = () => {
    const [page, setPage] = useState<AppPage>('home');
    const [helpModal, setHelpModal] = useState<{ title: string; content: string } | null>(null);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);
    const [encyclopediaSearch, setEncyclopediaSearch] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    const showHelp = useCallback((title: string, content?: string) => {
        const finalContent = content ?? EXPLANATIONS[title];
        if (finalContent) {
            setHelpModal({ title, content: finalContent });
        }
    }, []);

    const closeHelp = useCallback(() => setHelpModal(null), []);

    const openSpeciesDetail = useCallback((animalId: string) => {
        setSelectedSpeciesId(animalId);
        setPage('species_detail');
    }, []);

    const openEncyclopedia = useCallback((initialQuery?: string) => {
        if (typeof initialQuery === 'string') {
            setEncyclopediaSearch(initialQuery);
        }
        setPage('enciclopedia');
    }, []);

    const renderPage = () => {
        switch (page) {
            case 'bulario':
                return <BularioPage onHelpClick={showHelp} />;
            case 'suspeitas':
                return <SuspeitasPage onHelpClick={showHelp} />;
            case 'tratamentos':
                return <TratamentosPage onHelpClick={showHelp} />;
            case 'enciclopedia':
                return (
                    <EncyclopediaPage
                        searchQuery={encyclopediaSearch}
                        onSearchQueryChange={setEncyclopediaSearch}
                        onSelectSpecies={openSpeciesDetail}
                    />
                );
            case 'species_detail':
                return (
                    <SpeciesDetailPage
                        animalId={selectedSpeciesId}
                        onBackToEncyclopedia={() => setPage('enciclopedia')}
                        onHelpClick={showHelp}
                    />
                );
            default:
                return null;
        }
    };

    if (page === 'home') {
        return (
            <div id="aap2-module-root" className="relative">
                <button
                    onClick={() => navigate('/hub')}
                    className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white dark:bg-slate-800/60 dark:hover:bg-slate-700/80 dark:border-slate-600/40 dark:text-slate-200 transition-all duration-200 shadow-lg group cursor-pointer"
                    title="Voltar ao Hub de Aplicativos"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Voltar ao Hub
                </button>
                <Dashboard
                    onNavigate={setPage}
                    onOpenEncyclopedia={openEncyclopedia}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                />
            </div>
        );
    }

    return (
        <div id="aap2-module-root">
            {helpModal && (
                <Modal onClose={closeHelp}>
                    <h3 className="modal-title">{helpModal.title}</h3>
                    <div
                        className="modal-body"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(helpModal.content) }}
                    />
                </Modal>
            )}

            <Header currentPage={page} onNavigate={setPage} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            <main className="main-content">
                {renderPage()}
            </main>

            <footer className="footer">
                <p>Ferramenta de apoio clinico. Nao substitui o julgamento do medico veterinario.</p>
            </footer>
        </div>
    );
};

export default AAP2Module;
