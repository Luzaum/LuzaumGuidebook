import React, { useMemo } from 'react';
import { ANIMAL_CATEGORIES } from '../../data/animals';
import { AIImage } from '../shared/AIImage';

interface EncyclopediaPageProps {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    onSelectSpecies: (animalId: string) => void;
}

const CATEGORY_TONE: Record<string, { badge: string; title: string; border: string }> = {
    cobras: {
        badge: 'bg-red-500/10 text-red-600',
        title: 'text-red-600',
        border: 'border-red-500/30',
    },
    aranhas: {
        badge: 'bg-orange-500/10 text-orange-600',
        title: 'text-orange-600',
        border: 'border-orange-500/30',
    },
    escorpioes: {
        badge: 'bg-amber-500/10 text-amber-600',
        title: 'text-amber-600',
        border: 'border-amber-500/30',
    },
    sapos: {
        badge: 'bg-lime-500/10 text-lime-600',
        title: 'text-lime-600',
        border: 'border-lime-500/30',
    },
    outros: {
        badge: 'bg-emerald-500/10 text-emerald-600',
        title: 'text-emerald-600',
        border: 'border-emerald-500/30',
    },
};

export const EncyclopediaPage: React.FC<EncyclopediaPageProps> = ({
    searchQuery,
    onSearchQueryChange,
    onSelectSpecies,
}) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredCategories = useMemo(() => {
        if (!normalizedQuery) {
            return ANIMAL_CATEGORIES;
        }

        return ANIMAL_CATEGORIES.map(category => ({
            ...category,
            animals: category.animals.filter(animal => {
                const haystack = [
                    animal.name,
                    animal.accidentName,
                    animal.identification,
                    animal.epidemiology,
                    ...animal.signs.map(sign => sign.name),
                ].join(' ').toLowerCase();
                return haystack.includes(normalizedQuery);
            }),
        })).filter(category => category.animals.length > 0);
    }, [normalizedQuery]);

    const totalResults = filteredCategories.reduce((acc, category) => acc + category.animals.length, 0);

    return (
        <>
            <h2 className="page-title">Enciclopedia de Especies</h2>
            <p className="page-description">
                Consulte morfologia, sinais clinicos e condutas por especie. A busca filtra por nome, acidente e sinais.
            </p>

            <section className="form-section">
                <label className="form-label" htmlFor="encyclopedia-search">Busca rapida</label>
                <input
                    id="encyclopedia-search"
                    className="form-input"
                    placeholder="Ex.: jararaca, edema, urina escura..."
                    type="text"
                    value={searchQuery}
                    onChange={e => onSearchQueryChange(e.target.value)}
                />
                <p className="page-description" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                    {totalResults} resultado(s) encontrado(s).
                </p>
            </section>

            {filteredCategories.length === 0 && (
                <section className="results-section">
                    <p className="page-description" style={{ marginBottom: 0 }}>
                        Nenhuma especie encontrada para esta busca.
                    </p>
                </section>
            )}

            {filteredCategories.map(category => {
                const tone = CATEGORY_TONE[category.id] ?? {
                    badge: 'bg-slate-500/10 text-slate-700',
                    title: 'text-slate-700',
                    border: 'border-slate-300',
                };

                return (
                    <section key={category.id} className="form-section">
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className={`text-xl font-black ${tone.title}`}>{category.label}</h3>
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${tone.badge}`}>
                                {category.animals.length} especie(s)
                            </span>
                        </div>

                        <div className="card-grid">
                            {category.animals.map(animal => (
                                <button
                                    key={animal.id}
                                    type="button"
                                    className={`animal-card ${tone.border}`}
                                    onClick={() => onSelectSpecies(animal.id)}
                                >
                                    <AIImage
                                        animalId={animal.id}
                                        animalName={animal.name}
                                        imagePrompt={animal.imagePrompt}
                                        staticImagePath={animal.staticImagePath}
                                    />
                                    <h4 className="animal-card-name">{animal.name}</h4>
                                    <p className="animal-card-accident">{animal.accidentName}</p>
                                </button>
                            ))}
                        </div>
                    </section>
                );
            })}
        </>
    );
};
