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
    const goalOptions = [
        { id: 'maintenance', label: '⚖️ Manutenção' },
        { id: 'deficit', label: '📉 Perda de Peso' },
        { id: 'surplus', label: '📈 Ganho de Peso' },
    ];

    return (
        <div id="page-calc-racao" className="animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="text-center md:text-left mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2 tracking-tight">
                    Plano e Prescrição Diária
                </h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400 text-lg font-medium">Defina a meta, selecione o alimento e veja a quantidade diária recomendada.</p>
            </div>

            {!isCritical ? (
                <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] mb-8 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl mb-6 flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm">1</div>
                        <span>Defina a Meta Nutricional</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {goalOptions.map(goal => (
                            <div key={goal.id} className="relative">
                                <input type="radio" id={goal.id} name="nutritionalGoal" value={goal.id} checked={nutritionalGoal === goal.id} onChange={(e) => setNutritionalGoal(e.target.value)} className="peer sr-only" />
                                <label htmlFor={goal.id} className="flex items-center justify-center p-4 w-full text-center rounded-2xl border-2 cursor-pointer transition-all duration-300 bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/30 peer-checked:shadow-sm">
                                    <span className={`font-bold text-base ${nutritionalGoal === goal.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300'}`}>{goal.label}</span>
                                    <div className="ml-2 opacity-70 hover:opacity-100"><HelpIcon term={goal.id} onOpenModal={setModalContent} /></div>
                                </label>
                                {nutritionalGoal === goal.id && (
                                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900 shadow-sm animate-in zoom-in"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    {(nutritionalGoal === 'deficit' || nutritionalGoal === 'surplus') && (
                        <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                            <label htmlFor="targetWeight" className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                {nutritionalGoal === 'deficit' ? '🎯 Peso Ideal para Perda (kg)' : '🎯 Peso Ideal para Ganho (kg)'}
                                <button
                                    className="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-bold text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-slate-900 shrink-0"
                                    aria-label="Abrir calculadora de peso ideal"
                                    onClick={() => {
                                        setIwcInput({ weight: '', ecc: '6' });
                                        setIwcResult('');
                                        setIdealWeightModalOpenFor(species);
                                    }}
                                >?</button>
                            </label>
                            <input type="number" id="targetWeight" placeholder="Ex: 5" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} className="w-full md:w-1/2 p-3.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium text-slate-800 dark:text-slate-200 shadow-inner placeholder:text-slate-400" step="0.1" min="0.1" />
                            {nutritionalGoal === 'deficit' && (
                                <div className="mt-5 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-transparent border-l-4 border-amber-400 text-amber-800 dark:text-amber-300 p-4 rounded-r-xl shadow-sm text-sm">
                                    <h4 className="font-bold flex items-center gap-2">💡 Curiosidade Clínica: O "Efeito Platô"</h4>
                                    <p className="mt-1.5 opacity-90 leading-relaxed">É comum que o animal pare de perder peso mesmo com a dieta rigorosa. Isso ocorre por uma adaptação do metabolismo basal. O recálculo e acompanhamento veterinário quinzenal são cruciais para continuar a perda com segurança.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-transparent border-l-4 border-amber-500 text-amber-800 dark:text-amber-300 p-5 rounded-r-xl shadow-sm mb-8">
                    <p className="flex items-center gap-2 font-medium"><span className="text-xl">⚠️</span> <strong>Paciente Crítico:</strong> O plano de alimentação baseia-se na progressão do RER em % para evitar síndrome de realimentação. A meta de manutenção será usada automaticamente.</p>
                </div>
            )}

            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] mb-8 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden group">
                <div className="absolute top-0 left-0 p-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl mb-6 flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm">2</div>
                    <span>Selecione o Alimento</span>
                </h3>

                {/* Banco de Alimentos */}
                <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800/60">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-5 text-lg flex items-center gap-2"><span className="text-blue-500">📚</span> Banco de Alimentos</h4>

                    {/* Campo de Busca */}
                    <div className="mb-5">
                        <div className="relative group/search">
                            <input
                                type="text"
                                placeholder="Buscar alimento (ex: digite 'hill' para Hill's)..."
                                value={foodSearchQuery}
                                onChange={(e) => setFoodSearchQuery(e.target.value)}
                                className="w-full p-4 pl-12 bg-white/80 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all shadow-sm group-hover/search:shadow-md placeholder:text-slate-400 font-medium"
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within/search:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            {foodSearchQuery && (
                                <button
                                    onClick={() => {
                                        setFoodSearchQuery('');
                                        setSelectedUnifiedFoodId('');
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-full transition-all"
                                    aria-label="Limpar busca"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            )}
                        </div>

                        {/* Lista de resultados da busca */}
                        {foodSearchQuery.trim() && unifiedFoods.length > 0 && (
                            <div className="mt-2 max-h-72 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl absolute w-full z-30 custom-scrollbar animate-in fade-in slide-in-from-top-2">
                                <div className="p-3 text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 flex justify-between items-center">
                                    <span>{unifiedFoods.length} resultados</span>
                                    <span className="text-indigo-500">Pressione ESC para fechar</span>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {unifiedFoods.slice(0, 20).map((food) => {
                                        const displayName = food.isPredefined
                                            ? food.name
                                            : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                        return (
                                            <button
                                                key={food.id}
                                                onClick={() => {
                                                    setSelectedUnifiedFoodId(food.id);
                                                    setFoodSearchQuery('');
                                                }}
                                                className="w-full text-left p-4 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors focus:bg-indigo-50/50 dark:focus:bg-indigo-900/20 focus:outline-none group/item"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300">{displayName}</span>
                                                    {food.isTherapeutic && (
                                                        <span className="ml-3 px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] uppercase font-bold tracking-wider rounded-md border border-amber-200 dark:border-amber-800/50">Terapêutico</span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {unifiedFoods.length > 20 && (
                                        <div className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 text-center bg-slate-50/50 dark:bg-slate-800/20">... escaneando mais {unifiedFoods.length - 20} rótulos no banco</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filtros */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                        <select
                            value={commercialFoodFilters.lifeStage}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, lifeStage: e.target.value }))}
                            className="p-3 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all hover:bg-white dark:hover:bg-slate-800 cursor-pointer shadow-sm appearance-none"
                        >
                            <option value="ALL">Etapa: Todas</option>
                            <option value="PUPPY">Filhotes</option>
                            <option value="ADULT">Adulto</option>
                            <option value="SENIOR">Sênior</option>
                        </select>
                        <select
                            value={commercialFoodFilters.neuterStatus}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, neuterStatus: e.target.value }))}
                            className="p-3 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all hover:bg-white dark:hover:bg-slate-800 cursor-pointer shadow-sm appearance-none"
                        >
                            <option value="ANY">Castração: Qualquer</option>
                            <option value="NEUTERED">Castrado</option>
                            <option value="INTACT">Inteiro</option>
                        </select>
                        <select
                            value={commercialFoodFilters.isTherapeutic === undefined ? 'all' : commercialFoodFilters.isTherapeutic ? 'therapeutic' : 'regular'}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, isTherapeutic: e.target.value === 'all' ? undefined : e.target.value === 'therapeutic' }))}
                            className="p-3 bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all hover:bg-white dark:hover:bg-slate-800 cursor-pointer shadow-sm appearance-none"
                        >
                            <option value="all">Linha: Todas</option>
                            <option value="regular">Regular</option>
                            <option value="therapeutic">Terapêutico</option>
                        </select>
                        <button
                            onClick={() => {
                                setCommercialFoodFilters({ species: species === 'dog' ? 'DOG' : 'CAT', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: undefined });
                                setSelectedCommercialFoodId('');
                            }}
                            className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Limpar Filtros
                        </button>
                    </div>

                    {/* Seleção de alimento - Banco Unificado */}
                    <div className="relative z-0">
                        <select
                            value={selectedUnifiedFoodId}
                            onChange={(e) => {
                                setSelectedUnifiedFoodId(e.target.value);
                                setSelectedCommercialFoodId('');
                                setPredefinedFoodIndex('');
                                setCustomFoodName('');
                                setCustomFoodCalories('');
                            }}
                            className="w-full p-4 pl-12 bg-white/70 dark:bg-slate-900/70 border-2 border-indigo-100 dark:border-indigo-500/20 rounded-2xl text-slate-800 dark:text-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all appearance-none cursor-pointer font-semibold shadow-sm hover:shadow-md"
                        >
                            <option value="">👇 Selecione um alimento da lista filtrada...</option>
                            {unifiedFoods.map((food) => {
                                const displayName = food.isPredefined
                                    ? food.name
                                    : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                return (
                                    <option key={food.id} value={food.id}>{displayName}</option>
                                );
                            })}
                        </select>
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-xl">🍽️</span>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-indigo-500">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Informações do alimento selecionado */}
                    {selectedUnifiedFood && !selectedUnifiedFood.isPredefined && (
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group/card mt-2">
                            <div className="absolute top-0 right-0 p-16 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-full pointer-events-none"></div>
                            <div className="flex items-start justify-between mb-5 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl shadow-sm border border-blue-200 dark:border-blue-800/50">🍖</div>
                                        <h5 className="font-extrabold text-slate-800 dark:text-slate-100 text-xl tracking-tight">
                                            {selectedUnifiedFood.brand}
                                            {selectedUnifiedFood.line && <span className="text-slate-500 dark:text-slate-400 font-medium"> - {selectedUnifiedFood.line}</span>}
                                        </h5>
                                    </div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-13">{selectedUnifiedFood.product}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {(() => {
                                        const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                        const badge = getNutritionProfileBadge(profile);
                                        return <span className={`px-3 py-1.5 ${badge.color} text-[11px] uppercase font-bold tracking-wider rounded-lg shadow-sm border ${badge.color.includes('green') ? 'border-green-200 dark:border-green-800/50' : badge.color.includes('amber') ? 'border-amber-200 dark:border-amber-800/50' : 'border-slate-200 dark:border-slate-700'} `}>{badge.text}</span>;
                                    })()}
                                    {selectedUnifiedFood.requiresVetSupervision && (
                                        <span className="px-3 py-1.5 bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-[11px] uppercase font-bold tracking-wider rounded-lg shadow-sm border border-rose-200 dark:border-rose-800/50 flex items-center gap-1.5">
                                            <span>⚕️</span> Supervisão
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* ME e valores principais */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5 relative z-10">
                                <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 p-4 rounded-xl text-center border border-blue-200 dark:border-blue-800/60 shadow-inner">
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center justify-center gap-1.5"><span>⚡</span> Energia (ME)</p>
                                    <p className="font-black text-blue-900 dark:text-blue-300 text-lg">{selectedUnifiedFood.me_kcal_per_kg.toLocaleString('pt-BR')} <span className="text-xs font-bold opacity-70">kcal/kg</span></p>
                                </div>
                                <div className="col-span-2 md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50/50 dark:bg-slate-800/30 p-2 rounded-xl border border-slate-100 dark:border-slate-800/60">
                                    {(() => {
                                        const protein = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'protein_min_gkg');
                                        const fat = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'fat_min_gkg');
                                        const fiber = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'fiber_max_gkg');
                                        const moisture = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'moisture_max_gkg');
                                        return (
                                            <>
                                                {protein && <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg text-center shadow-sm border border-slate-100 dark:border-slate-700/50"><p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wide">Prot. Bruta (mín)</p><p className="font-extrabold text-slate-800 dark:text-slate-200 text-base">{(protein.value / 10).toFixed(1)}%</p></div>}
                                                {fat && <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg text-center shadow-sm border border-slate-100 dark:border-slate-700/50"><p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wide">Ext. Etéreo (mín)</p><p className="font-extrabold text-slate-800 dark:text-slate-200 text-base">{(fat.value / 10).toFixed(1)}%</p></div>}
                                                {fiber && <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg text-center shadow-sm border border-slate-100 dark:border-slate-700/50"><p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wide">Mat. Fibrosa (máx)</p><p className="font-extrabold text-slate-800 dark:text-slate-200 text-base">{(fiber.value / 10).toFixed(1)}%</p></div>}
                                                {moisture && <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg text-center shadow-sm border border-slate-100 dark:border-slate-700/50"><p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-0.5 uppercase tracking-wide">Umidade (máx)</p><p className="font-extrabold text-slate-800 dark:text-slate-200 text-base">{(moisture.value / 10).toFixed(1)}%</p></div>}
                                            </>
                                        )
                                    })()}
                                </div>
                            </div>

                            {/* Warnings automáticos */}
                            {(() => {
                                const warnings = generateAutomaticWarnings(selectedUnifiedFood)
                                if (warnings.length === 0) return null
                                return (
                                    <div className="space-y-2.5 mb-5 relative z-10">
                                        {warnings.map((warning, idx) => {
                                            const colorClass = warning.type === 'high_fat' ? 'bg-rose-50/80 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                                                : warning.type === 'ultra_low_fat' ? 'bg-sky-50/80 dark:bg-sky-900/20 border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300'
                                                    : warning.type === 'renal_diet' ? 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                                                        : 'bg-indigo-50/80 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300'
                                            return <div key={idx} className={`p-3 rounded-xl text-xs font-semibold border ${colorClass} shadow-sm backdrop-blur-sm flex items-start gap-2`}>
                                                <span className="text-base mt-[-2px]">
                                                    {warning.type === 'high_fat' ? '⚠️' : warning.type === 'ultra_low_fat' ? 'ℹ️' : warning.type === 'renal_diet' ? '⚕️' : '🔔'}
                                                </span>
                                                <span className="leading-relaxed">{warning.message}</span>
                                            </div>
                                        })}
                                    </div>
                                )
                            })()}

                            {selectedUnifiedFood.functionalNotes && selectedUnifiedFood.functionalNotes.length > 0 && (
                                <div className="mb-6 relative z-10">
                                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5"><span className="text-indigo-400">✨</span> Características Principais</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {selectedUnifiedFood.functionalNotes.map((note: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/50"><span className="text-indigo-500 text-base leading-none">•</span><span className="leading-snug">{note}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button onClick={handleAddUnifiedFood} className="w-full relative group overflow-hidden py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -ml-8"></div>
                                <span className="text-lg">➕</span><span>Adicionar à Prescrição Diária</span>
                            </button>
                        </div>
                    )}

                    {/* Informações do alimento predefinido } */}
                    {selectedUnifiedFood && selectedUnifiedFood.isPredefined && (
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group/card mt-2">
                            <div className="absolute top-0 right-0 p-16 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
                            <div className="flex items-start justify-between mb-5 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xl shadow-sm border border-emerald-200 dark:border-emerald-800/50">🥗</div>
                                        <h5 className="font-extrabold text-slate-800 dark:text-slate-100 text-xl tracking-tight">{selectedUnifiedFood.name}</h5>
                                    </div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-13">{selectedUnifiedFood.indication}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {(() => {
                                        const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                        const badge = getNutritionProfileBadge(profile);
                                        return <span className={`px-3 py-1.5 ${badge.color} text-[11px] uppercase font-bold tracking-wider rounded-lg shadow-sm border ${badge.color.includes('green') ? 'border-green-200 dark:border-green-800/50' : badge.color.includes('amber') ? 'border-amber-200 dark:border-amber-800/50' : 'border-slate-200 dark:border-slate-700'} `}>{badge.text}</span>;
                                    })()}
                                    {selectedUnifiedFood.requiresVetSupervision && (
                                        <span className="px-3 py-1.5 bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-[11px] uppercase font-bold tracking-wider rounded-lg shadow-sm border border-rose-200 dark:border-rose-800/50 flex items-center gap-1.5">
                                            <span>⚕️</span> Supervisão
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/10 p-4 rounded-xl text-center border border-indigo-200 dark:border-indigo-800/60 shadow-inner">
                                    <p className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 mb-1 uppercase tracking-wide flex items-center justify-center gap-1.5"><span>⚡</span> Calorias</p>
                                    <p className="font-black text-indigo-900 dark:text-indigo-300 text-lg">{selectedUnifiedFood.calories} <span className="text-xs font-bold opacity-70">{selectedUnifiedFood.unit === 'g' ? 'kcal/g' : selectedUnifiedFood.unit === 'ml' ? 'kcal/mL' : `kcal/${selectedUnifiedFood.unit}`}</span></p>
                                </div>
                                {selectedUnifiedFood.protein && selectedUnifiedFood.protein !== 'N/A' && (
                                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 p-4 rounded-xl text-center border border-emerald-200 dark:border-emerald-800/60 shadow-inner">
                                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wide flex items-center justify-center gap-1.5"><span>🥩</span> Prot. Bruta</p>
                                        <p className="font-extrabold text-emerald-900 dark:text-emerald-300 text-base">{selectedUnifiedFood.protein}</p>
                                    </div>
                                )}
                                {selectedUnifiedFood.fat && selectedUnifiedFood.fat !== 'N/A' && (
                                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 p-4 rounded-xl text-center border border-amber-200 dark:border-amber-800/60 shadow-inner">
                                        <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-wide flex items-center justify-center gap-1.5"><span>🧈</span> Ext. Etéreo</p>
                                        <p className="font-extrabold text-amber-900 dark:text-amber-300 text-base">{selectedUnifiedFood.fat}</p>
                                    </div>
                                )}
                            </div>

                            {selectedUnifiedFood.alerts && selectedUnifiedFood.alerts.length > 0 && (
                                <div className="space-y-2.5 mb-6 relative z-10">
                                    {selectedUnifiedFood.alerts.map((alert: any, alertIndex: number) => {
                                        const alertClasses: Record<string, string> = {
                                            red: 'bg-rose-50/80 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300',
                                            yellow: 'bg-amber-50/80 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300',
                                            green: 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                                        };
                                        const icon: Record<string, string> = { red: '🚨', yellow: '⚠️', green: '✅' };
                                        return (
                                            <div key={`${alert.type}-${alert.text?.substring(0, 20) ?? ""}-${alertIndex}`} className={`p-3 rounded-xl text-xs font-semibold border ${alertClasses[alert.type]} shadow-sm backdrop-blur-sm flex items-start gap-2 pt-3`}>
                                                <span className="text-base mt-[-2px]">{icon[alert.type]}</span>
                                                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: alert.text }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <button onClick={handleAddUnifiedFood} className="w-full relative group overflow-hidden py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -ml-8"></div>
                                <span className="text-lg">➕</span><span>Adicionar à Prescrição Diária</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4 text-sm uppercase tracking-wider flex items-center gap-2"><span className="text-slate-400">✏️</span> Adicionar Manualmente</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                        <input type="text" value={customFoodName} onChange={e => { setCustomFoodName(e.target.value); setPredefinedFoodIndex(''); }} placeholder="Nome do alimento" className="col-span-1 md:col-span-2 p-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-400" />
                        <input type="number" value={customFoodCalories} onChange={e => { setCustomFoodCalories(e.target.value); setPredefinedFoodIndex(''); }} placeholder="Calorias" className="p-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm placeholder:text-slate-400" />
                        <select value={customFoodUnit} onChange={e => { setCustomFoodUnit(e.target.value); setPredefinedFoodIndex(''); }} className="p-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm appearance-none cursor-pointer">
                            <option value="g">kcal/g</option>
                            <option value="lata">kcal/lata</option>
                            <option value="sache">kcal/sachê</option>
                            <option value="ml">kcal/mL</option>
                        </select>
                    </div>
                    <button onClick={handleAddFood} className="w-full mt-3 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shadow-sm text-sm flex items-center justify-center gap-2"><span>➕</span> Adicionar Alimento Manual</button>
                </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl mb-6 flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-sm shadow-sm border border-emerald-200 dark:border-emerald-800/50">3</div>
                    <span>Prescrição Diária</span>
                </h3>
                <div id="food-list" className="space-y-5">
                    {foodPrescriptionList.length === 0 ? (
                        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-3xl shadow-sm">🍽️</div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Nenhum alimento na prescrição.</p>
                            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Selecione e adicione alimentos acima para montar a dieta.</p>
                        </div>
                    ) : foodPrescriptionList.map((food, i) => {
                        const unitLabel = food.unit === 'g' ? 'g' : (food.unit === 'ml' ? 'mL' : food.unit);
                        const foodKey = `${food.name}-${food.calories ?? ""}-${food.unit ?? ""}-${i}`;

                        if (isCritical) {
                            const rerKcal = calculationResults?.rer || 0;
                            return (
                                <div key={foodKey} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-rose-200 dark:border-rose-900/50 shadow-sm relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500"></div>
                                    <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xl mb-4 ml-2">{food.name}</h4>
                                    <div className="bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-400 text-rose-800 dark:text-rose-300 p-3 rounded-r-lg text-sm font-medium flex items-center gap-2 mb-5">
                                        <span>⚠️</span> Paciente crítico: usando progressão da meta basal (RER).
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-center uppercase tracking-wide text-xs">Protocolo de 3 Dias</h5>
                                            <ul className="space-y-2">
                                                <li className="flex justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700/60 font-medium"><span className="text-slate-500 dark:text-slate-400">Dia 1 (33%):</span> <strong className="text-rose-600 dark:text-rose-400">{((rerKcal * 0.33) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700/60 font-medium"><span className="text-slate-500 dark:text-slate-400">Dia 2 (66%):</span> <strong className="text-rose-600 dark:text-rose-400">{((rerKcal * 0.66) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg shadow-sm border border-rose-100 dark:border-rose-800/40 font-bold"><span className="text-slate-700 dark:text-slate-300">Dia 3 (100%):</span> <strong className="text-rose-700 dark:text-rose-300">{(rerKcal / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                            </ul>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                            <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-center uppercase tracking-wide text-xs">Protocolo de 4 Dias</h5>
                                            <ul className="space-y-2">
                                                <li className="flex justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700/60 font-medium"><span className="text-slate-500 dark:text-slate-400">Dia 1 (25%):</span> <strong className="text-rose-600 dark:text-rose-400">{((rerKcal * 0.25) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700/60 font-medium"><span className="text-slate-500 dark:text-slate-400">Dia 2 (50%):</span> <strong className="text-rose-600 dark:text-rose-400">{((rerKcal * 0.50) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-2.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700/60 font-medium"><span className="text-slate-500 dark:text-slate-400">Dia 3 (75%):</span> <strong className="text-rose-600 dark:text-rose-400">{((rerKcal * 0.75) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-2.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg shadow-sm border border-rose-100 dark:border-rose-800/40 font-bold"><span className="text-slate-700 dark:text-slate-300">Dia 4 (100%):</span> <strong className="text-rose-700 dark:text-rose-300">{(rerKcal / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            let amount = '0.0'
                            if (targetKcal > 0) {
                                if (food.isCommercial && food.commercialData) {
                                    amount = ((targetKcal / food.commercialData.me_kcal_per_kg) * 1000).toFixed(1)
                                } else if (food.calories > 0) {
                                    amount = (targetKcal / food.calories).toFixed(1)
                                }
                            }
                            return (
                                <div key={foodKey} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>

                                    <div className="flex justify-between items-start mb-4 ml-2">
                                        <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xl">{food.name}</h4>
                                    </div>

                                    {food.isCommercial && food.commercialData && (
                                        <div className="mb-5 ml-2">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
                                                <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg text-center border border-slate-100 dark:border-slate-800"><p className="text-slate-400 dark:text-slate-500 mb-0.5 font-bold uppercase tracking-wider text-[10px]">Energia (ME)</p><p className="font-extrabold text-slate-700 dark:text-slate-200">{food.commercialData.me_kcal_per_kg.toLocaleString('pt-BR')} kcal/kg</p></div>
                                                {(() => {
                                                    const protein = food.commercialData.guarantees.find((g: any) => g.key === 'protein_min_gkg');
                                                    const fat = food.commercialData.guarantees.find((g: any) => g.key === 'fat_min_gkg');
                                                    const fiber = food.commercialData.guarantees.find((g: any) => g.key === 'fiber_max_gkg');
                                                    return (
                                                        <>
                                                            {protein && <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg text-center border border-slate-100 dark:border-slate-800"><p className="text-slate-400 dark:text-slate-500 mb-0.5 font-bold uppercase tracking-wider text-[10px]">Prot. Bruta</p><p className="font-extrabold text-slate-700 dark:text-slate-200">{(protein.value / 10).toFixed(1)}%</p></div>}
                                                            {fat && <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg text-center border border-slate-100 dark:border-slate-800"><p className="text-slate-400 dark:text-slate-500 mb-0.5 font-bold uppercase tracking-wider text-[10px]">Ext. Etéreo</p><p className="font-extrabold text-slate-700 dark:text-slate-200">{(fat.value / 10).toFixed(1)}%</p></div>}
                                                            {fiber && <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg text-center border border-slate-100 dark:border-slate-800"><p className="text-slate-400 dark:text-slate-500 mb-0.5 font-bold uppercase tracking-wider text-[10px]">Fibra</p><p className="font-extrabold text-slate-700 dark:text-slate-200">{(fiber.value / 10).toFixed(1)}%</p></div>}
                                                        </>
                                                    )
                                                })()}
                                            </div>
                                            {(() => {
                                                const warnings = generateAutomaticWarnings(food.commercialData)
                                                if (warnings.length === 0) return null
                                                return (
                                                    <div className="space-y-1.5">
                                                        {warnings.map((warning, idx) => {
                                                            const colorClass = warning.type === 'high_fat' ? 'bg-rose-50/50 dark:bg-rose-900/10 border-rose-200 text-rose-700 dark:text-rose-400'
                                                                : warning.type === 'ultra_low_fat' ? 'bg-sky-50/50 dark:bg-sky-900/10 border-sky-200 text-sky-700 dark:text-sky-400'
                                                                    : warning.type === 'renal_diet' ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 text-emerald-700 dark:text-emerald-400'
                                                                        : 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 text-indigo-700 dark:text-indigo-400'
                                                            return <div key={idx} className={`p-2 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 border border-transparent border-l-2 ${colorClass}`}><span>{warning.type === 'high_fat' ? '⚠️' : warning.type === 'renal_diet' ? '⚕️' : '🔔'}</span> {warning.message}</div>
                                                        })}
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    )}

                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/30 ml-2 gap-3 shadow-inner">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">⚖️</span>
                                            <div>
                                                <span className="flex items-center text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                                                    {goalOptions.find(g => g.id === nutritionalGoal)?.label || 'Meta:'}
                                                    <div className="ml-1 opacity-70 hover:opacity-100"><HelpIcon term="foodAmount" onOpenModal={setModalContent} /></div>
                                                </span>
                                                <p className="text-[11px] font-medium text-emerald-600/80 dark:text-emerald-500/80 mt-0.5">Quantidade Diária Total</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/60 dark:bg-slate-900/40 px-5 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700/50 shadow-sm flex items-end gap-1">
                                            <strong className="text-3xl font-black text-emerald-700 dark:text-emerald-300 tracking-tight leading-none drop-shadow-sm">
                                                {targetKcal > 0 ? amount : '...'}
                                            </strong>
                                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                                                {targetKcal > 0 ? (food.isCommercial ? `g/dia` : `${unitLabel}/dia`) : ''}
                                            </span>
                                            {targetKcal === 0 && <span className="text-sm font-medium text-amber-500">Insira o peso ideal</span>}
                                        </div>
                                    </div>

                                    {(() => {
                                        const foodItem = food.isCommercial ? null : sortedFoods.find(f => f.name === food.name);
                                        if (!foodItem) return null;
                                        const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                        const isComplete = foodItem.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(profile);
                                        if (isComplete) return null;
                                        if (profile === 'SUPPLEMENT') return <div className="mt-4 ml-2 p-3 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 text-amber-800 dark:text-amber-300 rounded-r-lg"><p className="text-sm font-bold mb-1 flex items-center gap-1.5"><span>⚠️</span> Suplemento</p><p className="text-xs font-medium opacity-90">Não é dieta completa. Use como complemento, não como única fonte.</p></div>;
                                        if (profile === 'HUMAN_ENTERAL') {
                                            const hasCat = foodItem.species?.includes('cat');
                                            return <div className="mt-4 ml-2 p-3 bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-500 text-rose-800 dark:text-rose-300 rounded-r-lg"><p className="text-sm font-bold mb-1 flex items-center gap-1.5"><span>🚨</span> Enteral Humana</p><p className="text-xs font-medium opacity-90 mb-1">Risco de desequilíbrio metabólico. Requer alta supervisão.</p>{hasCat && foodItem.speciesSafetyNotes?.cat && <p className="text-xs mt-1.5 font-bold px-2 py-1 bg-white/50 dark:bg-black/20 rounded inline-block">{foodItem.speciesSafetyNotes.cat[0]}</p>}</div>;
                                        }
                                        if (profile === 'SUPPORT_ENTERAL' && !isComplete) return <div className="mt-4 ml-2 p-3 bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 text-orange-800 dark:text-orange-300 rounded-r-lg"><p className="text-sm font-bold mb-1 flex items-center gap-1.5"><span>⚠️</span> Suporte Enteral</p><p className="text-xs font-medium opacity-90">Não é completo e balanceado. Use sob estrita supervisão.</p></div>;
                                        return null;
                                    })()}

                                    {(() => {
                                        const foodItem = food.isCommercial ? null : sortedFoods.find(f => f.name === food.name);
                                        if (!foodItem) return null;
                                        const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                        const badge = getNutritionProfileBadge(profile);
                                        return (
                                            <div className="mt-4 ml-2 flex items-center gap-2">
                                                <span className={`px-2.5 py-1 ${badge.color} rounded-md text-[10px] uppercase font-bold tracking-wider border ${badge.color.includes('green') ? 'border-green-200 dark:border-green-800/50' : badge.color.includes('amber') ? 'border-amber-200 dark:border-amber-800/50' : 'border-slate-200 dark:border-slate-700'} `}>{badge.text}</span>
                                                {foodItem.requiresVetSupervision && <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-[10px] uppercase font-bold tracking-wider rounded-md border border-rose-200 dark:border-rose-800/50 flex items-center gap-1"><span>⚕️</span> Supervisão Veterinária</span>}
                                            </div>
                                        );
                                    })()}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
};
