import React, { useMemo } from 'react';
import { AnimalCategory } from '../../types';
import { ANIMAL_CATEGORIES } from '../../data/animals';

interface EncyclopediaSidebarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedAnimalId: string | null;
    onSelectAnimal: (id: string) => void;
}

export const EncyclopediaSidebar: React.FC<EncyclopediaSidebarProps> = ({
    searchQuery,
    onSearchChange,
    selectedAnimalId,
    onSelectAnimal,
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
                    animal.family,
                    animal.identification,
                    ...animal.signs.map(sign => sign.name),
                ].join(' ').toLowerCase();
                return haystack.includes(normalizedQuery);
            }),
        })).filter(category => category.animals.length > 0);
    }, [normalizedQuery]);

    return (
        <aside className="w-80 h-full flex flex-col glass-sidebar border-r border-slate-200/60 bg-white/50 backdrop-blur-xl z-20 shrink-0">
            <div className="p-6 border-b border-slate-200/60">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">menu_book</span>
                    Enciclopédia
                </h2>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-xl">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-white/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-sm text-sm"
                        placeholder="Buscar espécie, sinal..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {filteredCategories.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-sm">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">pest_control_rodent</span>
                        <p>Nenhuma espécie encontrada.</p>
                    </div>
                )}

                {filteredCategories.map(category => (
                    <div key={category.id}>
                        <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                            {category.label}
                            <span className="bg-slate-100 text-slate-500 rounded-full px-1.5 py-0.5">{category.animals.length}</span>
                        </h3>
                        <div className="space-y-1">
                            {category.animals.map(animal => {
                                const isSelected = selectedAnimalId === animal.id;
                                return (
                                    <button
                                        key={animal.id}
                                        onClick={() => onSelectAnimal(animal.id)}
                                        className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${isSelected
                                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                                : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                                            }`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-lg bg-cover bg-center shrink-0 border-2 ${isSelected ? 'border-white/30' : 'border-slate-100'}`}
                                            style={{ backgroundImage: `url(${animal.staticImagePath})` }}
                                        />
                                        <div className="min-w-0">
                                            <p className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                                {animal.name.split('(')[0].trim()}
                                            </p>
                                            <p className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                                {animal.accidentName}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};
