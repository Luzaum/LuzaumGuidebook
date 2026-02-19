import React, { useState, useEffect } from 'react';
import { EncyclopediaSidebar } from './EncyclopediaSidebar';
import { EncyclopediaDetail } from './EncyclopediaDetail';
import { ALL_ANIMALS } from '../../data/animals';

interface EncyclopediaPageProps {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    selectedAnimalId: string | null;
    onSelectSpecies: (animalId: string) => void;
}

export const EncyclopediaPage: React.FC<EncyclopediaPageProps> = ({
    searchQuery,
    onSearchQueryChange,
    selectedAnimalId,
    onSelectSpecies,
}) => {
    // Selection state is now controlled by parent (AAP2Module)

    const selectedAnimal = selectedAnimalId ? ALL_ANIMALS.find(a => a.id === selectedAnimalId) : null;

    return (
        <div className="flex h-full overflow-hidden bg-slate-50">
            <EncyclopediaSidebar
                searchQuery={searchQuery}
                onSearchChange={onSearchQueryChange}
                selectedAnimalId={selectedAnimalId}
                onSelectAnimal={onSelectSpecies}
            />

            {selectedAnimal ? (
                <EncyclopediaDetail animal={selectedAnimal} />
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <span className="material-symbols-outlined text-5xl text-slate-300">menu_book</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">Enciclopédia de Espécies</h2>
                    <p className="max-w-md text-slate-500">
                        Selecione uma espécie na barra lateral para visualizar informações detalhadas sobre identificação, sinais clínicos e tratamento.
                    </p>
                </div>
            )}
        </div>
    );
};
