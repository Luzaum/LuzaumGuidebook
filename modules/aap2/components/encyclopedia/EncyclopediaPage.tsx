import React, { useMemo } from 'react';
import type { AnimalCategoryId } from '../../types';
import { ALL_ANIMALS } from '../../data/animals';
import { EncyclopediaDetail } from './EncyclopediaDetail';

interface EncyclopediaPageProps {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    selectedCategoryId: AnimalCategoryId | null;
    onSelectCategory: (categoryId: AnimalCategoryId | null) => void;
    selectedAnimalId: string | null;
    onSelectSpecies: (animalId: string | null) => void;
}

const CATEGORY_ORDER: AnimalCategoryId[] = ['cobras', 'aranhas', 'escorpioes', 'sapos', 'outros'];

const CATEGORY_LABELS: Record<AnimalCategoryId, string> = {
    cobras: 'Cobras',
    aranhas: 'Aranhas',
    escorpioes: 'Escorpioes',
    sapos: 'Sapos',
    outros: 'Outros & Invertebrados',
};

const getRiskStyles = (riskLevel?: string) => {
    switch (riskLevel) {
        case 'high':
            return 'bg-red-500/20 text-red-200 border-red-400/20';
        case 'moderate':
            return 'bg-amber-500/20 text-amber-200 border-amber-400/20';
        case 'infectious':
            return 'bg-purple-500/20 text-purple-200 border-purple-400/20';
        default:
            return 'bg-blue-500/20 text-blue-200 border-blue-400/20';
    }
};

export const EncyclopediaPage: React.FC<EncyclopediaPageProps> = ({
    searchQuery,
    onSearchQueryChange,
    selectedCategoryId,
    onSelectCategory,
    selectedAnimalId,
    onSelectSpecies,
}) => {
    const selectedAnimal = selectedAnimalId ? ALL_ANIMALS.find((animal) => animal.id === selectedAnimalId) ?? null : null;
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const visibleAnimals = useMemo(() => {
        return ALL_ANIMALS.filter((animal) => {
            if (selectedCategoryId && animal.categoryId !== selectedCategoryId) {
                return false;
            }
            if (!normalizedQuery) {
                return true;
            }

            const haystack = [
                animal.name,
                animal.accidentName,
                animal.family,
                animal.identification,
                ...animal.signs.map((sign) => sign.name),
            ]
                .join(' ')
                .toLowerCase();

            return haystack.includes(normalizedQuery);
        });
    }, [normalizedQuery, selectedCategoryId]);

    const categoryCounts = useMemo(() => {
        const counts = new Map<AnimalCategoryId, number>();
        for (const categoryId of CATEGORY_ORDER) {
            counts.set(categoryId, 0);
        }
        for (const animal of visibleAnimals) {
            counts.set(animal.categoryId as AnimalCategoryId, (counts.get(animal.categoryId as AnimalCategoryId) ?? 0) + 1);
        }
        return counts;
    }, [visibleAnimals]);

    return (
        <div className="flex h-full w-full flex-col gap-5">
            <section className="glass-panel rounded-3xl border border-white/10 bg-white/40 p-5 dark:bg-slate-900/30">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => onSelectCategory(null)}
                            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                                selectedCategoryId === null
                                    ? 'bg-[#7e40e7] text-white shadow-lg shadow-[#7e40e7]/30'
                                    : 'bg-white/60 text-slate-700 hover:bg-white dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700/70'
                            }`}
                        >
                            Todas
                        </button>
                        {CATEGORY_ORDER.map((categoryId) => (
                            <button
                                key={categoryId}
                                type="button"
                                onClick={() => {
                                    onSelectCategory(categoryId);
                                    onSelectSpecies(null);
                                }}
                                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                                    selectedCategoryId === categoryId
                                        ? 'bg-[#7e40e7] text-white shadow-lg shadow-[#7e40e7]/30'
                                        : 'bg-white/60 text-slate-700 hover:bg-white dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700/70'
                                }`}
                            >
                                {CATEGORY_LABELS[categoryId]}
                                <span className="ml-2 rounded-full bg-black/10 px-1.5 py-0.5 text-[10px] dark:bg-white/10">
                                    {categoryCounts.get(categoryId) ?? 0}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                        {visibleAnimals.length} {visibleAnimals.length === 1 ? 'especie encontrada' : 'especies encontradas'}
                    </div>
                </div>
            </section>

            {selectedAnimal ? (
                <section className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/45 backdrop-blur-xl dark:bg-slate-900/25">
                    <div className="border-b border-slate-200/70 p-4 dark:border-white/10">
                        <button
                            type="button"
                            onClick={() => onSelectSpecies(null)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700/70"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Voltar para cards
                        </button>
                    </div>
                    <div className="h-[calc(100%-69px)]">
                        <EncyclopediaDetail animal={selectedAnimal} />
                    </div>
                </section>
            ) : (
                <section className="min-h-0 flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-white/35 p-5 backdrop-blur-xl dark:bg-slate-900/20">
                    {visibleAnimals.length === 0 ? (
                        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 text-center dark:border-white/20 dark:bg-slate-900/30">
                            <span className="material-symbols-outlined mb-3 text-4xl text-slate-400 dark:text-slate-500">search_off</span>
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-100">Nenhum resultado</h3>
                            <p className="mt-2 max-w-lg text-sm text-slate-500 dark:text-slate-300">
                                Ajuste o termo da busca no topo ou troque a tag de categoria para encontrar as especies.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    onSearchQueryChange('');
                                    onSelectCategory(null);
                                }}
                                className="mt-4 rounded-xl bg-[#7e40e7] px-4 py-2 text-xs font-bold text-white"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {visibleAnimals.map((animal) => (
                                <button
                                    key={animal.id}
                                    type="button"
                                    onClick={() => onSelectSpecies(animal.id)}
                                    className="group overflow-hidden rounded-3xl border border-white/20 bg-white/60 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/40"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={animal.staticImagePath ?? '/images/aap2/invertebrados.jpg'}
                                            alt={animal.name}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${getRiskStyles(animal.riskLevel)}`}>
                                                {animal.accidentName}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 p-4">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{animal.name}</h3>
                                        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{animal.identification}</p>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                {CATEGORY_LABELS[animal.categoryId as AnimalCategoryId]}
                                            </span>
                                            <span className="font-semibold text-[#7e40e7]">Abrir ficha</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};
