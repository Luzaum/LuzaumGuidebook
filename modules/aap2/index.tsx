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
import { Dashboard } from './components/dashboard/Dashboard';
import { NovaConsultaPage } from './components/nova-consulta/NovaConsultaPage';
import { DrLuzaumReportPage } from './components/relatorio/DrLuzaumReportPage';
import { RelatorioDetalhadoPage } from './components/relatorio/RelatorioDetalhadoPage';
import { DrLuzaumHistoryPage } from './components/relatorio/DrLuzaumHistoryPage';
import { sanitizeHtml } from './utils/sanitizeHtml';
import './styles/tokens.css';

/* ── Patient data shared across Dr. Luzaum pages ───────────────── */
interface LuzaumPatient {
    species: string | null;
    weight: string;
    age: string;
    breed: string;
    history: string;
}

/* ── Derive diagnosis from selected signs ───────────────────────── */
function deriveDiagnosis(signs: string[]): { name: string; sciName: string; confidence: number } {
    const hasNeuro = signs.some(s => ['fraqueza', 'ataxia', 'tremores', 'paralisia', 'ptose', 'midriase'].includes(s));
    const hasHemo = signs.some(s => ['hemorragia', 'equimose', 'mioglobinuria'].includes(s));
    const hasEdema = signs.includes('edema');
    if (hasNeuro && hasHemo) return { name: 'Acidente Crotálico', sciName: 'Crotalus durissus', confidence: 88 };
    if (hasHemo || hasEdema) return { name: 'Acidente Botrópico', sciName: 'Bothrops (Jararaca)', confidence: 92 };
    if (hasNeuro) return { name: 'Acidente Elapídico', sciName: 'Micrurus spp.', confidence: 72 };
    return { name: 'Envenenamento Indeterminado', sciName: 'Análise pendente', confidence: 45 };
}

const AAP2Module: React.FC = () => {
    const [page, setPage] = useState<AppPage>('home');
    const [helpModal, setHelpModal] = useState<{ title: string; content: string } | null>(null);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);
    const [encyclopediaSearch, setEncyclopediaSearch] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    // Dr. Luzaum state
    const [luzaumPatient, setLuzaumPatient] = useState<LuzaumPatient>({ species: null, weight: '', age: '', breed: '', history: '' });
    const [luzaumSigns, setLuzaumSigns] = useState<string[]>([]);

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
        setPage('enciclopedia');
    }, []);

    const openEncyclopedia = useCallback((initialQuery?: string) => {
        if (typeof initialQuery === 'string') {
            setEncyclopediaSearch(initialQuery);
        }
        setPage('enciclopedia');
        // Optional: clear selection when opening main encyclopedia link?
        // setSelectedSpeciesId(null); 
    }, []);

    const handleNovaConsultaSubmit = useCallback((patient: LuzaumPatient, signs: string[]) => {
        setLuzaumPatient(patient);
        setLuzaumSigns(signs);
        setPage('relatorio');
    }, []);

    const handleNewConsulta = useCallback(() => {
        setLuzaumPatient({ species: null, weight: '', age: '', breed: '', history: '' });
        setLuzaumSigns([]);
        setPage('nova_consulta');
    }, []);

    const handleViewDetailed = useCallback(() => {
        setPage('relatorio_detalhado');
    }, []);

    const renderPage = () => {
        const dx = deriveDiagnosis(luzaumSigns);

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
                        selectedAnimalId={selectedSpeciesId}
                        onSelectSpecies={setSelectedSpeciesId}
                    />
                );
            // case 'species_detail': removed, integrated into encyclopedia
            case 'nova_consulta':
                return (
                    <NovaConsultaPage
                        onNavigateToReport={handleNovaConsultaSubmit}
                        onBack={() => setPage('home')}
                    />
                );
            case 'relatorio':
                return (
                    <DrLuzaumReportPage
                        patient={luzaumPatient}
                        selectedSigns={luzaumSigns}
                        onBack={() => setPage('nova_consulta')}
                        onNewConsulta={handleNewConsulta}
                    />
                );
            case 'relatorio_detalhado':
                return (
                    <RelatorioDetalhadoPage
                        patient={luzaumPatient}
                        selectedSigns={luzaumSigns}
                        diagnosis={dx.name}
                        diagnosisSciName={dx.sciName}
                        confidence={dx.confidence}
                        onBack={() => setPage('relatorio')}
                        onNewConsulta={handleNewConsulta}
                    />
                );
            case 'historico':
                return (
                    <DrLuzaumHistoryPage
                        onBack={() => setPage('home')}
                        onNewTriage={handleNewConsulta}
                        onViewReport={(id) => {
                            // detailed view not linked to specific ID yet, going to generic view
                            setPage('relatorio_detalhado');
                        }}
                    />
                );
            default:
                return null;
        }
    };

    if (page === 'home') {
        return (
            <div id="aap2-module-root" className="relative">
                <Dashboard
                    onNavigate={setPage}
                    onOpenEncyclopedia={openEncyclopedia}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    onBackToHub={() => navigate('/hub')}
                />
            </div>
        );
    }

    // Full-page chrome-free view for Dr. Luzaum pages
    if (page === 'nova_consulta' || page === 'relatorio' || page === 'relatorio_detalhado') {
        return (
            <div id="aap2-module-root">
                {renderPage()}
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
