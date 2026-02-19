// ============================================================
// TRATAMENTOS — Protocolos de Tratamento
// ============================================================
import React, { useState } from 'react';
import { TREATMENT_PROTOCOLS, TREATMENT_TOPICS } from '../../data/protocols';
import { EXPLANATIONS } from '../../data/explanations';
import type { ProtocolSection } from '../../types';
import { EnrichedText } from '../ui';

interface TratamentosPageProps {
    onHelpClick: (title: string, content?: string) => void;
}

export const TratamentosPage: React.FC<TratamentosPageProps> = ({ onHelpClick }) => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    if (!selectedTopic) {
        return (
            <>
                <h2 className="page-title">Protocolos de Tratamento</h2>
                <p className="page-description">
                    Selecione o tipo de acidente para consultar o guia de tratamento detalhado.
                </p>
                <div className="card-grid">
                    {TREATMENT_TOPICS.map(topic => (
                        <button
                            key={topic}
                            className="protocol-card"
                            onClick={() => setSelectedTopic(topic)}
                        >
                            <h3 className="protocol-card-title">{topic}</h3>
                        </button>
                    ))}
                </div>
            </>
        );
    }

    const protocol = TREATMENT_PROTOCOLS[selectedTopic];
    if (!protocol) return <p>Protocolo não encontrado.</p>;

    return (
        <>
            <button className="back-btn" onClick={() => setSelectedTopic(null)}>
                ← Voltar para a lista de protocolos
            </button>
            <h2 className="page-title">{selectedTopic}</h2>

            <div className="protocol-sections">
                {(
                    ['keyTherapy', 'supportiveCare', 'painManagement', 'complications', 'monitoring', 'contraindications'] as const
                ).map(key => {
                    const section = protocol[key];
                    if (!section) return null;
                    return (
                        <ProtocolSectionCard
                            key={key}
                            section={section}
                            onHelpClick={term => onHelpClick(term, EXPLANATIONS[term])}
                        />
                    );
                })}

                <div className="protocol-references">
                    <strong>Referências:</strong> {protocol.references}
                </div>
            </div>
        </>
    );
};

// --- Sub-componente: Card de seção do protocolo ---
// Parser robusto que suporta HTML parcial (<strong>) + markdown (**) + emojis

const ProtocolSectionCard: React.FC<{
    section: ProtocolSection;
    onHelpClick: (term: string) => void;
}> = ({ section, onHelpClick }) => {
    const renderContent = () => {
        const lines = section.content.split(/<br\s*\/?>|\n/);
        return lines
            .filter(line => line.trim() !== '')
            .map((line, lineIdx) => {
                // Tokeniza por tags <strong> e markdown **
                const tokens = line.split(/(<strong>.*?<\/strong>|\*\*.*?\*\*)/g).filter(Boolean);

                return (
                    <p key={lineIdx} className="protocol-line">
                        {tokens.map((token, tokenIdx) => {
                            if (token.startsWith('<strong>')) {
                                const text = token.slice(8, -9);
                                return (
                                    <strong key={tokenIdx}>
                                        <EnrichedText text={text} onHelpClick={onHelpClick} />
                                    </strong>
                                );
                            }
                            if (token.startsWith('**')) {
                                const text = token.slice(2, -2);
                                return (
                                    <strong key={tokenIdx}>
                                        <EnrichedText text={text} onHelpClick={onHelpClick} />
                                    </strong>
                                );
                            }

                            // Texto normal: verifica prefixos especiais
                            let remaining = token;
                            let prefix: React.ReactNode = null;

                            if (remaining.trim().startsWith('🚫')) {
                                prefix = <span className="contraindication-icon" aria-label="Contraindicado">🚫 </span>;
                                remaining = remaining.replace('🚫', '').trim();
                            }

                            return (
                                <React.Fragment key={tokenIdx}>
                                    {prefix}
                                    <EnrichedText text={remaining} onHelpClick={onHelpClick} />
                                </React.Fragment>
                            );
                        })}
                    </p>
                );
            });
    };

    return (
        <div className="protocol-section-card">
            <h4 className="protocol-section-title">{section.title}</h4>
            <div className="protocol-section-content">{renderContent()}</div>
        </div>
    );
};
