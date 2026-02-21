import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../utils/theme';
import type { AnimalCategoryId, AppPage } from './types';
import { EXPLANATIONS } from './data/explanations';
import { AAP2Layout } from './components/layout/AAP2Layout';
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

interface EncyclopediaNavigationParams {
    query?: string;
    categoryId?: AnimalCategoryId | null;
    animalId?: string | null;
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
    const [selectedCategoryId, setSelectedCategoryId] = useState<AnimalCategoryId | null>(null);
    const [encyclopediaSearch, setEncyclopediaSearch] = useState('');

    // --- Global Theme Integration ---
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Dr. Luzaum state
    const [luzaumPatient, setLuzaumPatient] = useState<LuzaumPatient>({ species: null, weight: '', age: '', breed: '', history: '' });
    const [luzaumSigns, setLuzaumSigns] = useState<string[]>([]);

    const navigate = useNavigate();

    const showHelp = useCallback((title: string, content?: string) => {
        const finalContent = content ?? EXPLANATIONS[title];
        if (finalContent) {
            setHelpModal({ title, content: finalContent });
        }
    }, []);

    const closeHelp = useCallback(() => setHelpModal(null), []);

    const openEncyclopedia = useCallback((params?: EncyclopediaNavigationParams) => {
        if (typeof params?.query === 'string') {
            setEncyclopediaSearch(params.query);
        }
        if (params?.categoryId !== undefined) {
            setSelectedCategoryId(params.categoryId);
        } else if (params?.query !== undefined) {
            setSelectedCategoryId(null);
        }
        if (params?.animalId !== undefined) {
            setSelectedSpeciesId(params.animalId);
        } else if (params?.categoryId !== undefined || params?.query !== undefined) {
            setSelectedSpeciesId(null);
        }
        setPage('enciclopedia');
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

    const renderPage = () => {
        const dx = deriveDiagnosis(luzaumSigns);

        switch (page) {
            case 'home':
                return (
                    <Dashboard
                        onNavigate={setPage}
                        onOpenEncyclopedia={openEncyclopedia}
                        isDarkMode={isDarkMode}
                    />
                );
            case 'suspeitas':
                return <SuspeitasPage onHelpClick={showHelp} />;
            case 'tratamentos':
                return <TratamentosPage onHelpClick={showHelp} />;
            case 'enciclopedia':
                return (
                    <EncyclopediaPage
                        searchQuery={encyclopediaSearch}
                        onSearchQueryChange={setEncyclopediaSearch}
                        selectedCategoryId={selectedCategoryId}
                        onSelectCategory={setSelectedCategoryId}
                        selectedAnimalId={selectedSpeciesId}
                        onSelectSpecies={setSelectedSpeciesId}
                    />
                );
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

            <AAP2Layout
                currentPage={page}
                onNavigate={setPage}
                onOpenEncyclopedia={openEncyclopedia}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onBackToHub={() => navigate('/hub')}
            >
                {renderPage()}
            </AAP2Layout>
        </div>
    );
};

export default AAP2Module;
