import React, { useMemo } from 'react';
import { ALL_ANIMALS, ANIMAL_CATEGORIES } from '../../data/animals';
import { AIImage } from '../shared/AIImage';
import { HelpButton, SignificanceBadge } from '../ui';
import { renderSafeFormattedText } from '../../utils/renderSafeFormattedText';

interface SpeciesDetailPageProps {
    animalId: string | null;
    onBackToEncyclopedia: () => void;
    onHelpClick: (title: string, content?: string) => void;
}

export const SpeciesDetailPage: React.FC<SpeciesDetailPageProps> = ({
    animalId,
    onBackToEncyclopedia,
    onHelpClick,
}) => {
    const animal = useMemo(() => ALL_ANIMALS.find(item => item.id === animalId) ?? null, [animalId]);

    const category = useMemo(() => {
        if (!animal) {
            return null;
        }
        return ANIMAL_CATEGORIES.find(cat => cat.animals.some(item => item.id === animal.id)) ?? null;
    }, [animal]);

    if (!animal) {
        return (
            <>
                <button className="back-btn" onClick={onBackToEncyclopedia}>Voltar para Enciclopedia</button>
                <section className="results-section">
                    <h3 className="results-title">Especie nao encontrada</h3>
                    <p className="page-description" style={{ marginBottom: 0 }}>
                        Selecione uma especie na Enciclopedia para visualizar os detalhes.
                    </p>
                </section>
            </>
        );
    }

    return (
        <>
            <button className="back-btn" onClick={onBackToEncyclopedia}>Voltar para Enciclopedia</button>

            <article className="animal-detail" style={category ? { borderLeft: `5px solid ${category.color}` } : undefined}>
                <h2 className="animal-detail-name" style={category ? { color: category.color } : undefined}>{animal.name}</h2>
                <h3 className="animal-detail-accident">{animal.accidentName}</h3>

                <AIImage
                    animalId={animal.id}
                    animalName={animal.name}
                    imagePrompt={animal.imagePrompt}
                    staticImagePath={animal.staticImagePath}
                />

                <p className="animal-detail-identification">{animal.identification}</p>

                <section className="animal-detail-section">
                    <h3 className="section-title">Sinais Clinicos</h3>
                    <ul className="signs-list">
                        {animal.signs.map(sign => (
                            <li key={sign.name} className="sign-item">
                                <div className="sign-header">
                                    <SignificanceBadge level={sign.significance} name={sign.name} />
                                    <HelpButton onClick={() => onHelpClick(sign.name, sign.explanation)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="animal-detail-section">
                    <h3 className="section-title">Epidemiologia</h3>
                    <p>{animal.epidemiology}</p>
                </section>

                <section className="animal-detail-section">
                    <h3 className="section-title">Diagnostico</h3>
                    <div>{renderSafeFormattedText(animal.diagnosis)}</div>
                </section>

                <section className="animal-detail-section">
                    <h3 className="section-title">Tratamento</h3>
                    <div>{renderSafeFormattedText(animal.treatment)}</div>
                </section>
            </article>
        </>
    );
};
