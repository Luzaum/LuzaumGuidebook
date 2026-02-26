import React from 'react';
import { HelpIcon } from './UI/HelpIcon';
import { generateAutomaticWarnings } from '../data/foodsCommercial';
import { determineNutritionProfile, determineIsCompleteAndBalanced, getNutritionProfileBadge } from '../utils/nutritionUtils';

interface FoodCalculatorTabProps {
    species: string;
    isCritical: boolean;
    nutritionalGoal: string;
    setNutritionalGoal: (goal: string) => void;
    targetWeight: string;
    setTargetWeight: (weight: string) => void;
    setIwcInput: (input: any) => void;
    setIwcResult: (result: string) => void;
    setIdealWeightModalOpenFor: (forSpecies: string | null) => void;

    foodSearchQuery: string;
    setFoodSearchQuery: (query: string) => void;
    unifiedFoods: any[];
    selectedUnifiedFoodId: string;
    setSelectedUnifiedFoodId: (id: string) => void;
    selectedUnifiedFood: any;

    commercialFoodFilters: any;
    setCommercialFoodFilters: (filters: any) => void;
    selectedCommercialFoodId: string;
    setSelectedCommercialFoodId: (id: string) => void;
    selectedCommercialFood: any;
    commercialFoodWarnings: any[];

    setPredefinedFoodIndex: (index: string) => void;
    customFoodName: string;
    setCustomFoodName: (name: string) => void;
    customFoodCalories: string;
    setCustomFoodCalories: (cals: string) => void;
    customFoodUnit: string;
    setCustomFoodUnit: (unit: string) => void;

    handleAddUnifiedFood: () => void;
    handleAddCommercialFood: () => void;
    handleAddFood: () => void;

    foodPrescriptionList: any[];
    calculationResults: any;
    targetKcal: number;
    setModalContent: (content: any) => void;
    sortedFoods: any[];
}

export const FoodCalculatorTab: React.FC<FoodCalculatorTabProps> = ({
    species, isCritical,
    nutritionalGoal, setNutritionalGoal,
    targetWeight, setTargetWeight,
    setIwcInput, setIwcResult, setIdealWeightModalOpenFor,
    foodSearchQuery, setFoodSearchQuery, unifiedFoods,
    selectedUnifiedFoodId, setSelectedUnifiedFoodId, selectedUnifiedFood,
    commercialFoodFilters, setCommercialFoodFilters,
    selectedCommercialFoodId, setSelectedCommercialFoodId, selectedCommercialFood, commercialFoodWarnings,
    setPredefinedFoodIndex,
    customFoodName, setCustomFoodName,
    customFoodCalories, setCustomFoodCalories,
    customFoodUnit, setCustomFoodUnit,
    handleAddUnifiedFood, handleAddCommercialFood, handleAddFood,
    foodPrescriptionList, calculationResults, targetKcal, setModalContent, sortedFoods
}) => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Meta Nutricional */}
            {!isCritical ? (
                <div className="space-y-6">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-1 h-1 bg-purple-500 rounded-full" /> 1. Meta Nutricional
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: 'maintenance', label: 'Manutenção', icon: '⚖️', desc: 'Manter peso atual' },
                            { id: 'deficit', label: 'Perda de Peso', icon: '📉', desc: 'Restrição calórica' },
                            { id: 'surplus', label: 'Ganho de Peso', icon: '📈', desc: 'Suporte calórico' }
                        ].map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setNutritionalGoal(goal.id)}
                                className={`p-5 rounded-[24px] border-2 text-left transition-all duration-300 relative group ${nutritionalGoal === goal.id ? 'border-purple-500 bg-purple-500/10 shadow-lg' : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10'}`}
                            >
                                <div className="flex items-center justify-between gap-3 mb-2 w-full">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{goal.icon}</span>
                                        <span className={`text-xs font-black uppercase tracking-widest ${nutritionalGoal === goal.id ? 'text-white' : 'text-slate-500'}`}>{goal.label}</span>
                                    </div>
                                    <HelpIcon term={goal.id} onOpenModal={setModalContent} />
                                </div>
                                <p className="text-[10px] font-semibold text-slate-400">{goal.desc}</p>
                                {nutritionalGoal === goal.id && <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
                            </button>
                        ))}
                    </div>

                    {(nutritionalGoal === 'deficit' || nutritionalGoal === 'surplus') && (
                        <div className="pt-4 animate-in slide-in-from-left-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Peso Alvo (Ideal)</label>
                                        <button
                                            onClick={() => {
                                                setIwcInput({ weight: '', ecc: '6' });
                                                setIwcResult('');
                                                setIdealWeightModalOpenFor(species);
                                            }}
                                            className="text-[10px] font-black text-purple-400 hover:text-purple-300 transition-colors uppercase"
                                        >
                                            Calcular Peso Ideal
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            value={targetWeight}
                                            onChange={e => setTargetWeight(e.target.value)}
                                            className="w-full h-20 bg-white/5 border-2 border-white/5 rounded-[20px] text-3xl font-black text-white px-8 transition-all focus:border-purple-500/50 outline-none"
                                            placeholder="0.0"
                                            step="0.1"
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-black text-slate-600">KG</span>
                                    </div>
                                </div>
                                {nutritionalGoal === 'deficit' && (
                                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-4">
                                        <span className="material-symbols-outlined text-amber-500 mt-1">lightbulb</span>
                                        <p className="text-[10px] font-medium text-amber-200 leading-relaxed">
                                            <strong className="block mb-1 text-white uppercase tracking-widest">Efeito Platô:</strong>
                                            O metabolismo se adapta. Monitore mensalmente para reajustar o plano.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-[28px] animate-pulse">
                    <p className="text-sm font-bold text-red-500 text-center uppercase tracking-widest">⚠️ Protocolo Crítico Ativado - Meta Fixa (RER)</p>
                </div>
            )}

            {/* Seleção de Alimento */}
            <div className="space-y-6">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full" /> 2. Seleção de Alimento
                </label>

                <div className="bg-slate-900/40 border border-white/5 rounded-[32px] p-8 space-y-8">
                    {/* Busca Inteligente */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 group-focus-within:text-purple-500 transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Busque por marca, linha ou ingrediente (ex: Royal Canin)..."
                                value={foodSearchQuery}
                                onChange={(e) => setFoodSearchQuery(e.target.value)}
                                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 text-white text-sm font-medium focus:bg-white/10 focus:border-purple-500/50 outline-none transition-all"
                            />
                        </div>

                        {foodSearchQuery.trim() && unifiedFoods.length > 0 && (
                            <div className="mt-2 h-max max-h-80 overflow-y-auto bg-slate-900 border border-white/10 rounded-[24px] shadow-2xl divide-y divide-white/5 custom-scrollbar animate-in zoom-in-95 duration-200">
                                {unifiedFoods.slice(0, 15).map((food) => (
                                    <button
                                        key={food.id}
                                        onClick={() => { setSelectedUnifiedFoodId(food.id); setFoodSearchQuery(''); }}
                                        className="w-full p-4 text-left hover:bg-white/5 transition-colors flex items-center justify-between group"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-200">
                                                {food.isPredefined ? food.name : `${food.brand} ${food.line ? `- ${food.line}` : ''}`}
                                            </span>
                                            {!food.isPredefined && <span className="text-[10px] font-bold text-slate-500 uppercase">{food.product}</span>}
                                        </div>
                                        <span className="material-symbols-outlined text-slate-700 group-hover:text-purple-500 transition-colors">add_circle</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filtros Estilizados */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <select
                            value={commercialFoodFilters.lifeStage}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, lifeStage: e.target.value }))}
                            className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold text-slate-400 outline-none hover:bg-white/10 transition-colors"
                        >
                            <option value="ALL">Estágio: Todos</option>
                            <option value="PUPPY">Filhotes</option>
                            <option value="ADULT">Adultos</option>
                            <option value="SENIOR">Sênior</option>
                        </select>
                        <select
                            value={commercialFoodFilters.isTherapeutic === undefined ? 'all' : commercialFoodFilters.isTherapeutic ? 'therapeutic' : 'regular'}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, isTherapeutic: e.target.value === 'all' ? undefined : e.target.value === 'therapeutic' }))}
                            className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-bold text-slate-400 outline-none hover:bg-white/10 transition-colors"
                        >
                            <option value="all">Linha: Todas</option>
                            <option value="regular">Regular</option>
                            <option value="therapeutic">Terapêutico</option>
                        </select>
                        <div />
                        <button
                            onClick={() => setCommercialFoodFilters({ species: species === 'dog' ? 'DOG' : 'CAT', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: undefined })}
                            className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest text-right"
                        >Limpar Filtros</button>
                    </div>

                    {/* Card de Detalhes do Alimento Selecionado */}
                    {selectedUnifiedFood && (
                        <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-[28px] p-8 space-y-6 animate-in zoom-in-95 duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-black text-white">
                                            {selectedUnifiedFood.isPredefined ? selectedUnifiedFood.name : selectedUnifiedFood.brand}
                                        </h3>
                                        {selectedUnifiedFood.isTherapeutic && <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full font-black uppercase tracking-widest border border-purple-500/20">Terapêutico</span>}
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedUnifiedFood.product || selectedUnifiedFood.indication}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-white px-4 border-l border-white/10">
                                        {selectedUnifiedFood.me_kcal_per_kg?.toLocaleString() || selectedUnifiedFood.calories}
                                        <span className="text-xs text-slate-500 ml-2 font-black">kcal/{selectedUnifiedFood.unit === 'kg' ? 'kg' : selectedUnifiedFood.unit}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/5">
                                {[
                                    { label: 'Prot. Bruta', val: selectedUnifiedFood.guarantees?.find((g: any) => g.key === 'protein_min_gkg')?.value ? `${(selectedUnifiedFood.guarantees.find((g: any) => g.key === 'protein_min_gkg').value / 10).toFixed(1)}%` : selectedUnifiedFood.protein || 'N/A' },
                                    { label: 'Gordura', val: selectedUnifiedFood.guarantees?.find((g: any) => g.key === 'fat_min_gkg')?.value ? `${(selectedUnifiedFood.guarantees.find((g: any) => g.key === 'fat_min_gkg').value / 10).toFixed(1)}%` : selectedUnifiedFood.fat || 'N/A' },
                                    { label: 'Umidade', val: selectedUnifiedFood.guarantees?.find((g: any) => g.key === 'moisture_max_gkg')?.value ? `${(selectedUnifiedFood.guarantees.find((g: any) => g.key === 'moisture_max_gkg').value / 10).toFixed(1)}%` : 'N/A' },
                                    { label: 'Perfil', val: selectedUnifiedFood.nutritionProfile ? getNutritionProfileBadge(selectedUnifiedFood.nutritionProfile).text : 'Standard' }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-sm font-bold text-slate-200">{stat.val}</p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleAddUnifiedFood}
                                className="w-full h-16 bg-white text-slate-950 rounded-[20px] font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                            >
                                Adicionar à Dieta
                            </button>
                        </div>
                    )}

                    {/* Adicionar Manual (Compacto) */}
                    <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6 text-center">Ou adicione manualmente</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                value={customFoodName}
                                onChange={e => { setCustomFoodName(e.target.value); setPredefinedFoodIndex(''); }}
                                placeholder="Nome do alimento..."
                                className="md:col-span-2 h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-xs outline-none focus:border-purple-500/50"
                            />
                            <div className="relative">
                                <input
                                    type="number"
                                    value={customFoodCalories}
                                    onChange={e => { setCustomFoodCalories(e.target.value); setPredefinedFoodIndex(''); }}
                                    placeholder="Calorias"
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-xs outline-none focus:border-purple-500/50"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600 uppercase">kcal</span>
                            </div>
                            <button
                                onClick={handleAddFood}
                                className="h-12 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                            >Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista Final de Prescrição */}
            <div className="space-y-6">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-500 rounded-full" /> 3. Prescrição Diária
                    <HelpIcon term="foodAmount" onOpenModal={setModalContent} />
                </label>

                {foodPrescriptionList.length === 0 ? (
                    <div className="p-12 border-2 border-dashed border-white/5 rounded-[32px] text-center opacity-40">
                        <span className="material-symbols-outlined text-4xl mb-2">restaurant_menu</span>
                        <p className="text-sm font-medium">Nenhum alimento selecionado na dieta.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {foodPrescriptionList.map((food, i) => {
                            const amount = targetKcal > 0 ? (food.isCommercial ? ((targetKcal / food.commercialData.me_kcal_per_kg) * 1000).toFixed(1) : (targetKcal / food.calories).toFixed(1)) : '---';
                            return (
                                <div key={i} className="group relative bg-slate-900/60 border border-white/10 rounded-[32px] p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[40px] pointer-events-none" />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                                    <span className="material-symbols-outlined">tapas</span>
                                                </span>
                                                <h4 className="text-lg font-black text-white">{food.name}</h4>
                                            </div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-13">Densidade Calórica: {food.calories.toFixed(1)} kcal/{food.unit}</p>
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col items-center justify-center min-w-[180px]">
                                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">{nutritionalGoal === 'maintenance' ? 'Manutenção' : 'Meta Alvo'}</p>
                                            <div className="text-3xl font-black text-white">
                                                {amount}
                                                <span className="text-xs text-slate-500 ml-2 uppercase font-black">{food.isCommercial ? 'g' : food.unit} <span className="text-[10px] opacity-50">/dia</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
