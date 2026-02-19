// ============================================================
// BULARIO — Componentes da seção de Bulário Peçonhento
// ============================================================

// --- BularioPage.tsx ---
// Navegação em 3 níveis: Categorias → Lista de Animais → Detalhe

import React, { useState } from 'react';
import { ANIMAL_CATEGORIES } from '../../data/animals';
import type { Animal, AnimalCategory } from '../../types';
import { AIImage } from '../shared/AIImage';
import { HelpButton, SignificanceBadge } from '../ui';
import { renderSafeFormattedText } from '../../utils/renderSafeFormattedText';

interface BularioPageProps {
    onHelpClick: (title: string, content?: string) => void;
}

export const BularioPage: React.FC<BularioPageProps> = ({ onHelpClick }) => {
    const [selectedCategory, setSelectedCategory] = useState<AnimalCategory | null>(null);
    const [selectedAnimal, setSelectedAnimal] = useState<(Animal & { categoryId: string; categoryColor: string }) | null>(null);

    const handleBack = () => {
        if (selectedAnimal) {
            setSelectedAnimal(null);
        } else {
            setSelectedCategory(null);
        }
    };

    // Nível 3: Detalhe do animal
    if (selectedAnimal) {
        return (
            <>
                <button className="back-btn" onClick={handleBack}>← Voltar para {selectedCategory?.label}</button>
                <AnimalDetailView animal={selectedAnimal} onHelpClick={onHelpClick} />
            </>
        );
    }

    // Nível 2: Lista de animais da categoria
    if (selectedCategory) {
        const animalsWithMeta = selectedCategory.animals.map(a => ({
            ...a,
            categoryId: selectedCategory.id,
            categoryColor: selectedCategory.color,
        }));

        return (
            <>
                <button className="back-btn" onClick={handleBack}>← Voltar para Categorias</button>
                <h2 className="page-title" style={{ color: selectedCategory.color }}>{selectedCategory.label}</h2>
                <div className="card-grid">
                    {animalsWithMeta.map(animal => (
                        <button
                            key={animal.id}
                            className="animal-card"
                            onClick={() => setSelectedAnimal(animal)}
                            style={{ borderBottom: `4px solid ${selectedCategory.color}` }}
                        >
                            <AIImage
                                animalId={animal.id}
                                animalName={animal.name}
                                imagePrompt={animal.imagePrompt}
                                staticImagePath={animal.staticImagePath}
                            />
                            <h3 className="animal-card-name" style={{ color: selectedCategory.color }}>
                                {animal.name}
                            </h3>
                            <p className="animal-card-accident">{animal.accidentName}</p>
                        </button>
                    ))}
                </div>
            </>
        );
    }

    // Nível 1: Categorias
    return (
        <>
            <h2 className="page-title">Bulário Peçonhento</h2>
            <p className="page-description">Selecione uma categoria para explorar os animais, sinais clínicos e protocolos.</p>
            <div className="card-grid">
                {ANIMAL_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className="category-card"
                        onClick={() => setSelectedCategory(cat)}
                        style={{ borderBottom: `4px solid ${cat.color}` }}
                    >
                        <h3 className="category-card-title" style={{ color: cat.color }}>{cat.label}</h3>
                        <p className="category-card-count">{cat.animals.length} {cat.animals.length === 1 ? 'animal' : 'animais'}</p>
                    </button>
                ))}
            </div>
        </>
    );
};


// --- AnimalDetailView.tsx ---
// Ficha clínica completa de um animal

interface AnimalDetailViewProps {
    animal: Animal & { categoryId: string; categoryColor: string };
    onHelpClick: (title: string, content?: string) => void;
}

export const AnimalDetailView: React.FC<AnimalDetailViewProps> = ({ animal, onHelpClick }) => {
    return (
        <article className="animal-detail" style={{ borderLeft: `5px solid ${animal.categoryColor}` }}>
            <h2 className="animal-detail-name" style={{ color: animal.categoryColor }}>{animal.name}</h2>
            <h3 className="animal-detail-accident">{animal.accidentName}</h3>

            <AIImage
                animalId={animal.id}
                animalName={animal.name}
                imagePrompt={animal.imagePrompt}
                staticImagePath={animal.staticImagePath}
            />

            <p className="animal-detail-identification">{animal.identification}</p>

            {/* Sinais Clínicos */}
            <section className="animal-detail-section">
                <h3 className="section-title">Sinais Clínicos Detalhados</h3>
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

            {/* Epidemiologia */}
            <section className="animal-detail-section">
                <h3 className="section-title">Epidemiologia</h3>
                <p>{animal.epidemiology}</p>
            </section>

            {/* Diagnóstico */}
            <section className="animal-detail-section">
                <h3 className="section-title">Diagnóstico</h3>
                <div>{renderSafeFormattedText(animal.diagnosis)}</div>
            </section>

            {/* Tratamento */}
            <section className="animal-detail-section">
                <h3 className="section-title">Tratamento</h3>
                <div>{renderSafeFormattedText(animal.treatment)}</div>
            </section>
        </article>
    );
};
