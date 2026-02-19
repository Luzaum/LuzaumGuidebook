// ============================================================
// AAP2 Module — Acidentes com Animais Peçonhentos
// ============================================================
import React, { useState, useCallback } from 'react';
import type { AppPage } from './types';
import { EXPLANATIONS } from './data/explanations';
import { Header } from './components/layout/Header';
import { BularioPage } from './components/bulario/index';
import { SuspeitasPage } from './components/suspeitas/SuspeitasPage';
import { TratamentosPage } from './components/tratamentos/TratamentosPage';
import { Modal } from './components/ui';

// Importa estilos globais do módulo
import './styles/tokens.css';

import { Dashboard } from './components/dashboard/Dashboard';

// ---- Main Module Component ----
const AAP2Module: React.FC = () => {
    const [page, setPage] = useState<AppPage>('home');
    const [helpModal, setHelpModal] = useState<{ title: string; content: string } | null>(null);

    const showHelp = useCallback((title: string, content?: string) => {
        const finalContent = content ?? EXPLANATIONS[title];
        if (finalContent) setHelpModal({ title, content: finalContent });
    }, []);

    const closeHelp = useCallback(() => setHelpModal(null), []);

    const renderPage = () => {
        switch (page) {
            case 'bulario':
                return <BularioPage onHelpClick={showHelp} />;
            case 'suspeitas':
                return <SuspeitasPage onHelpClick={showHelp} />;
            case 'tratamentos':
                return <TratamentosPage onHelpClick={showHelp} />;
            default:
                return null;
        }
    };

    if (page === 'home') {
        return (
            <div id="aap2-module-root">
                <Dashboard onNavigate={setPage} />
            </div>
        );
    }

    return (
        <div id="aap2-module-root"> {/* Wrapper para isolamento de CSS se necessário */}
            {/* Modal de ajuda fisiopatológica */}
            {helpModal && (
                <Modal onClose={closeHelp}>
                    <h3 className="modal-title">{helpModal.title}</h3>
                    <div
                        className="modal-body"
                        dangerouslySetInnerHTML={{ __html: helpModal.content }}
                    />
                </Modal>
            )}

            <Header currentPage={page} onNavigate={setPage} />

            <main className="main-content">
                {renderPage()}
            </main>

            <footer className="footer">
                <p>Ferramenta de apoio clínico. Não substitui o julgamento do médico veterinário.</p>
            </footer>
        </div>
    );
};

export default AAP2Module;
