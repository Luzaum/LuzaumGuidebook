import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { COMMERCIAL_FOODS, generateAutomaticWarnings } from './data/foodsCommercial';
import type { FoodItem, FoodUnit } from './data/types/foodTypes';
import { factors, determineNutritionProfile, determineIsCompleteAndBalanced, determineRequiresVetSupervision } from './utils/nutritionUtils';
import { predefinedFoods } from './data/foodsPredefined';
import { knowledgeBase } from './data/nutritionKnowledge';

// Components
import { Modal } from './components/UI/Modal';
import { EnergyTab } from './components/EnergyTab';
import { FoodCalculatorTab } from './components/FoodCalculatorTab';
import { IndicationsTab } from './components/IndicationsTab';

const CalculadoraEnergetica = ({ onBack }: { onBack: () => void }) => {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState('energia');
    const [species, setSpecies] = useState('dog');
    const [weight, setWeight] = useState('');
    const [status, setStatus] = useState('Adulto Castrado / Inativo');

    const [predefinedFoodIndex, setPredefinedFoodIndex] = useState('');
    const [customFoodName, setCustomFoodName] = useState('');
    const [customFoodCalories, setCustomFoodCalories] = useState('');
    const [customFoodUnit, setCustomFoodUnit] = useState('g');
    const [foodPrescriptionList, setFoodPrescriptionList] = useState<any[]>([]);

    const [selectedUnifiedFoodId, setSelectedUnifiedFoodId] = useState('');
    const [selectedCommercialFoodId, setSelectedCommercialFoodId] = useState('');
    const [commercialFoodFilters, setCommercialFoodFilters] = useState({
        species: species === 'dog' ? 'DOG' as const : 'CAT' as const,
        lifeStage: 'ALL' as const,
        neuterStatus: 'ANY' as const,
        isTherapeutic: undefined as boolean | undefined,
    });

    const [foodSearchQuery, setFoodSearchQuery] = useState('');
    const [modalContent, setModalContent] = useState<any>(null);

    const [nutritionalGoal, setNutritionalGoal] = useState('maintenance');
    const [targetWeight, setTargetWeight] = useState('');

    const [idealWeightModalOpenFor, setIdealWeightModalOpenFor] = useState<string | null>(null);
    const [iwcInput, setIwcInput] = useState({ weight: '', ecc: '6' });
    const [iwcResult, setIwcResult] = useState('');

    // --- CALCULATIONS ---
    const calculationResults = useMemo(() => {
        const w = parseFloat(weight);
        if (!w || w <= 0) return null;

        let rer = 0;
        let rerFormula = '';
        if (species === 'dog' && (w < 2 || w > 45)) {
            rer = (30 * w) + 70;
            rerFormula = "Fórmula Linear: (30 x Peso) + 70";
        } else {
            rer = 70 * Math.pow(w, 0.75);
            rerFormula = "Fórmula Alométrica: 70 x Peso^0.75";
        }

        const factorData = factors[species][status] || factors[species]['Adulto Castrado / Inativo'];
        const k = factorData.k;

        let der = 0;
        let derRange = null;

        if (typeof k === 'string' && k.includes('-')) {
            const [minK, maxK] = k.split('-').map(parseFloat);
            const minDer = rer * minK;
            const maxDer = rer * maxK;
            der = minDer;
            derRange = `${minDer.toFixed(1)} a ${maxDer.toFixed(1)}`;
        } else {
            der = rer * parseFloat(k as string);
        }
        return { rer, rerFormula, k, factorDesc: factorData.desc, der, derRange };
    }, [species, weight, status]);

    const targetKcal = useMemo(() => {
        if (!calculationResults) return 0;
        if (nutritionalGoal === 'maintenance') return calculationResults.der;

        const tw = parseFloat(targetWeight);
        if (!tw || tw <= 0) return 0;

        const rerIdeal = (species === 'dog' && (tw < 2 || tw > 45)) ? (30 * tw) + 70 : 70 * Math.pow(tw, 0.75);

        if (nutritionalGoal === 'deficit') {
            const kDeficit = species === 'dog' ? 1.0 : 0.8;
            return rerIdeal * kDeficit;
        }

        if (nutritionalGoal === 'surplus') {
            const kSurplus = species === 'dog' ? 1.4 : 1.2;
            return rerIdeal * kSurplus;
        }
        return 0;
    }, [calculationResults, nutritionalGoal, targetWeight, species]);

    const migrateFood = useCallback((food: any): FoodItem => {
        if ('nutritionProfile' in food && food.nutritionProfile) return food as FoodItem;
        const nutritionProfile = determineNutritionProfile(food);
        const isCompleteAndBalanced = determineIsCompleteAndBalanced(nutritionProfile);
        const requiresVetSupervision = determineRequiresVetSupervision(nutritionProfile, food.isTherapeutic || false);

        let unit: FoodUnit = 'g';
        if (food.unit === 'ml' || food.unit === 'L' || food.unit === 'l') unit = 'ml';
        else if (food.unit === 'g' || food.unit === 'kg') unit = 'g';

        let calories = food.calories || 0;
        if (food.unit === 'kg' && calories > 0) calories = calories / 1000;

        const speciesSafetyNotes: { dog?: string[]; cat?: string[] } = {};
        if (nutritionProfile === 'HUMAN_ENTERAL' && food.species?.includes('cat')) {
            speciesSafetyNotes.cat = ['Gatos: risco por taurina e perfil mineral inadequado se uso exclusivo/prolongado.'];
        }
        if (nutritionProfile === 'SUPPLEMENT' && food.species?.includes('cat')) {
            speciesSafetyNotes.cat = ['Não usar como dieta exclusiva.'];
        }

        return {
            ...food, nutritionProfile, isCompleteAndBalanced,
            requiresVetSupervision, unit, calories,
            speciesSafetyNotes: Object.keys(speciesSafetyNotes).length > 0 ? speciesSafetyNotes : undefined,
        } as FoodItem;
    }, []);

    const isCritical = status.toLowerCase().includes('crítico') || status.toLowerCase().includes('hospitalizado');

    const sortedFoods = useMemo(() => {
        const foods = [...predefinedFoods]
            .map(migrateFood)
            .filter(food => food.species.includes(species as 'dog' | 'cat'))
            .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }));

        if (foodSearchQuery.trim()) {
            const query = foodSearchQuery.toLowerCase().trim();
            return foods.filter(food => food.name.toLowerCase().includes(query));
        }
        return foods;
    }, [species, migrateFood, foodSearchQuery]);

    const unifiedFoods = useMemo(() => {
        const convertedPredefined = predefinedFoods
            .map(migrateFood)
            .filter((food) => {
                const foodSpecies = food.species.includes('dog') ? 'DOG' : food.species.includes('cat') ? 'CAT' : null;
                return foodSpecies === commercialFoodFilters.species;
            })
            .filter((food) => {
                const foodLifeStage = food.lifeStage || 'ALL';
                if (commercialFoodFilters.lifeStage !== 'ALL' && foodLifeStage !== commercialFoodFilters.lifeStage && foodLifeStage !== 'ALL') return false;
                const foodNeuterStatus = food.neuterStatus || 'ANY';
                if (commercialFoodFilters.neuterStatus !== 'ANY' && foodNeuterStatus !== commercialFoodFilters.neuterStatus && foodNeuterStatus !== 'ANY') return false;
                const foodIsTherapeutic = food.isTherapeutic ?? false;
                if (commercialFoodFilters.isTherapeutic !== undefined && foodIsTherapeutic !== commercialFoodFilters.isTherapeutic) return false;
                return true;
            })
            .map((food) => ({
                id: `predefined-${food.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                name: food.name, species: food.species.includes('dog') ? 'DOG' as const : 'CAT' as const,
                lifeStage: (food.lifeStage || 'ALL'), neuterStatus: (food.neuterStatus || 'ANY'),
                isTherapeutic: food.isTherapeutic ?? false, therapeuticIndications: food.therapeuticIndications || [],
                calories: food.calories, unit: food.unit, protein: food.protein, fat: food.fat,
                indication: food.indication, alerts: food.alerts, dilution: food.dilution,
                nutritionProfile: food.nutritionProfile || determineNutritionProfile(food),
                isCompleteAndBalanced: food.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(food.nutritionProfile || determineNutritionProfile(food)),
                requiresVetSupervision: food.requiresVetSupervision ?? determineRequiresVetSupervision(food.nutritionProfile || determineNutritionProfile(food), food.isTherapeutic ?? false),
                speciesSafetyNotes: food.speciesSafetyNotes, isPredefined: true,
            }));

        const convertedCommercial = COMMERCIAL_FOODS.filter((food) => {
            if (food.species !== commercialFoodFilters.species) return false;
            if (commercialFoodFilters.lifeStage !== 'ALL' && food.lifeStage !== commercialFoodFilters.lifeStage) return false;
            if (commercialFoodFilters.neuterStatus !== 'ANY' && food.neuterStatus !== commercialFoodFilters.neuterStatus && food.neuterStatus !== 'ANY') return false;
            if (commercialFoodFilters.isTherapeutic !== undefined && food.isTherapeutic !== commercialFoodFilters.isTherapeutic) return false;
            return true;
        }).map((food) => {
            const profile = food.nutritionProfile || determineNutritionProfile(food as any);
            return {
                ...food, nutritionProfile: profile, isCompleteAndBalanced: food.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(profile),
                requiresVetSupervision: food.requiresVetSupervision ?? determineRequiresVetSupervision(profile, food.isTherapeutic),
                isPredefined: false, alerts: undefined, dilution: undefined,
            };
        });

        const allFoods = [...convertedCommercial, ...convertedPredefined] as any[];
        let filteredFoods = allFoods;
        if (foodSearchQuery.trim()) {
            const query = foodSearchQuery.toLowerCase().trim();
            filteredFoods = allFoods.filter(food => {
                const name = food.isPredefined ? food.name : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                return name.toLowerCase().includes(query);
            });
        }

        return filteredFoods.sort((a, b) => {
            const nameA = a.isPredefined ? a.name : `${a.brand} ${a.line ? `- ${a.line}` : ''}: ${a.product}`;
            const nameB = b.isPredefined ? b.name : `${b.brand} ${b.line ? `- ${b.line}` : ''}: ${b.product}`;
            return nameA.localeCompare(nameB, 'pt-BR', { sensitivity: 'base' });
        });
    }, [commercialFoodFilters, foodSearchQuery, migrateFood]);

    const selectedUnifiedFood = useMemo(() => unifiedFoods.find(f => f.id === selectedUnifiedFoodId) || null, [selectedUnifiedFoodId, unifiedFoods]);
    const selectedCommercialFood = useMemo(() => COMMERCIAL_FOODS.find((f) => f.id === selectedCommercialFoodId) || null, [selectedCommercialFoodId]);
    const commercialFoodWarnings = useMemo(() => selectedCommercialFood ? generateAutomaticWarnings(selectedCommercialFood) : [], [selectedCommercialFood]);

    // --- EFFECTS ---
    useEffect(() => {
        setStatus('Adulto Castrado / Inativo');
        setFoodPrescriptionList([]);
        setPredefinedFoodIndex('');
        setSelectedCommercialFoodId('');
        setCommercialFoodFilters({
            species: species === 'dog' ? 'DOG' : 'CAT',
            lifeStage: 'ALL',
            neuterStatus: 'ANY',
            isTherapeutic: undefined,
        })
    }, [species]);

    useEffect(() => setFoodPrescriptionList([]), [weight, status]);

    // --- HANDLERS ---
    const handleAddUnifiedFood = () => {
        if (!selectedUnifiedFood) return;
        setFoodPrescriptionList(prev => [...prev, {
            name: selectedUnifiedFood.isPredefined ? selectedUnifiedFood.name : `${selectedUnifiedFood.brand} ${selectedUnifiedFood.line ? `- ${selectedUnifiedFood.line}` : ''}: ${selectedUnifiedFood.product}`,
            calories: selectedUnifiedFood.isPredefined ? selectedUnifiedFood.calories : (selectedUnifiedFood.me_kcal_per_kg / 1000),
            unit: selectedUnifiedFood.isPredefined ? selectedUnifiedFood.unit : 'g',
            isCommercial: !selectedUnifiedFood.isPredefined,
            commercialData: selectedUnifiedFood.isPredefined ? undefined : selectedUnifiedFood
        }]);
        setSelectedUnifiedFoodId('');
    };

    const handleAddCommercialFood = () => {
        if (!selectedCommercialFood) return;
        setFoodPrescriptionList(prev => [...prev, {
            name: `${selectedCommercialFood.brand} ${selectedCommercialFood.line ? `- ${selectedCommercialFood.line}` : ''}: ${selectedCommercialFood.product}`,
            calories: selectedCommercialFood.me_kcal_per_kg / 1000,
            unit: 'g',
            isCommercial: true,
            commercialData: selectedCommercialFood
        }]);
        setSelectedCommercialFoodId('');
    };

    const handleAddFood = () => {
        let foodToAdd = null;
        if (predefinedFoodIndex) {
            foodToAdd = sortedFoods[parseInt(predefinedFoodIndex, 10)];
        } else if (customFoodName && customFoodCalories) {
            foodToAdd = { name: customFoodName, calories: parseFloat(customFoodCalories), unit: customFoodUnit };
        }

        if (!foodToAdd || foodToAdd.calories === null || isNaN(foodToAdd.calories)) {
            alert("Por favor, preencha ou selecione um alimento com calorias válidas.");
            return;
        }

        if (foodToAdd.calories <= 0) {
            if (!confirm("Este alimento tem 0 kcal/unidade e não pode ser usado para cálculos. Deseja adicioná-lo mesmo assim para consulta?")) return;
        }

        setFoodPrescriptionList(prev => [...prev, foodToAdd!]);
        setPredefinedFoodIndex('');
        setCustomFoodName('');
        setCustomFoodCalories('');
    };

    const handleCalculateIdealWeight = () => {
        const w = parseFloat(iwcInput.weight);
        const ecc = parseInt(iwcInput.ecc);
        let iw = 0;

        if (idealWeightModalOpenFor === 'dog') {
            const excess = (ecc - 5) * 10;
            iw = w * (100 / (100 + excess));
        } else if (idealWeightModalOpenFor === 'cat') {
            const excess = (ecc - 5) * 15;
            iw = w * (100 / (100 + excess));
        }

        if (iw > 0) {
            setIwcResult(`Peso Ideal Estimado: ${iw.toFixed(1)} kg`);
            setTargetWeight(iw.toFixed(1));
        } else {
            setIwcResult('Entrada inválida.');
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* Background com Aurora exclusivo do Vetius */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#0a0510]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/10" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            <Modal content={modalContent} onClose={() => setModalContent(null)} />

            {/* Ideal Weight Modal */}
            {idealWeightModalOpenFor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIdealWeightModalOpenFor(null)}>
                    <div className="bg-slate-900 border border-white/10 rounded-[40px] shadow-2xl max-w-sm w-full p-10 backdrop-blur-xl transform transition-all scale-100 shadow-purple-900/20" onClick={(e) => e.stopPropagation()}>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-purple-400 scale-125">scale</span>
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">Peso Ideal Estimado</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Cálculo Baseado em ECC</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-center block">Peso Atual (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl text-center text-3xl font-black text-white focus:bg-white/10 focus:border-purple-500/50 transition-all outline-none placeholder:text-slate-800"
                                    value={iwcInput.weight}
                                    onChange={e => setIwcInput({ ...iwcInput, weight: e.target.value })}
                                    placeholder="0.0"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-center block">ECC (Escala 1-9)</label>
                                <div className="grid grid-cols-5 gap-1.5 h-12">
                                    {[5, 6, 7, 8, 9].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setIwcInput({ ...iwcInput, ecc: val.toString() })}
                                            className={`rounded-xl font-black text-xs transition-all ${iwcInput.ecc === val.toString() ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={handleCalculateIdealWeight}
                                    className="w-full h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Calcular e Aplicar
                                </button>
                            </div>

                            {iwcResult && (
                                <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-[28px] text-center animate-in zoom-in-95 duration-500">
                                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Resultado</p>
                                    <p className="text-2xl font-black text-white">{iwcResult.replace('Peso Ideal Estimado: ', '').replace(' kg', '')}<span className="text-xs text-slate-500 ml-1">kg</span></p>
                                </div>
                            )}

                            <button onClick={() => setIdealWeightModalOpenFor(null)} className="w-full text-[10px] font-black text-slate-600 hover:text-slate-400 p-2 uppercase tracking-widest transition-colors">Voltar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Layout Principal Expandido */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8">

                {/* Header Integrado com Navegação */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
                    <div className="flex items-center gap-6 w-full lg:w-auto">
                        <button
                            onClick={onBack}
                            className="flex h-12 px-5 items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-300 font-bold transition-all group active:scale-95"
                        >
                            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            <span>Sair</span>
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                <span className="p-2 bg-purple-500/20 rounded-xl">⚡</span>
                                Calculadora Metabólica
                            </h1>
                            <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-widest px-1">NUTRIVET PRO SYSTEM</p>
                        </div>
                    </div>

                    <div className="flex p-1.5 bg-slate-900/60 border border-white/10 rounded-2xl gap-2 w-full lg:w-auto backdrop-blur-md">
                        {[
                            { id: 'energia', label: 'Energia', icon: 'bolt' },
                            { id: 'racao', label: 'Dieta', icon: 'restaurant' },
                            { id: 'indicacoes', label: 'Guia', icon: 'menu_book' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de Conteúdo: Lado Esquerdo (Tabs) + Lado Direito (Resumo fixo em telas grandes) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* Conteúdo Principal (8 Colunas) */}
                    <div className="xl:col-span-8 space-y-6">
                        <div className="bg-slate-900/40 border border-white/10 rounded-[32px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                            {/* Efeito de brilho sutil no card principal */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700" />

                            {activeTab === 'energia' && (
                                <EnergyTab
                                    species={species}
                                    setSpecies={setSpecies}
                                    weight={weight}
                                    setWeight={setWeight}
                                    status={status}
                                    setStatus={setStatus}
                                    setModalContent={setModalContent}
                                    calculationResults={calculationResults}
                                    isCritical={isCritical}
                                />
                            )}

                            {activeTab === 'racao' && (
                                <FoodCalculatorTab
                                    species={species} isCritical={isCritical}
                                    nutritionalGoal={nutritionalGoal} setNutritionalGoal={setNutritionalGoal}
                                    targetWeight={targetWeight} setTargetWeight={setTargetWeight}
                                    setIwcInput={setIwcInput} setIwcResult={setIwcResult} setIdealWeightModalOpenFor={setIdealWeightModalOpenFor}
                                    foodSearchQuery={foodSearchQuery} setFoodSearchQuery={setFoodSearchQuery}
                                    unifiedFoods={unifiedFoods} selectedUnifiedFoodId={selectedUnifiedFoodId} setSelectedUnifiedFoodId={setSelectedUnifiedFoodId} selectedUnifiedFood={selectedUnifiedFood}
                                    commercialFoodFilters={commercialFoodFilters} setCommercialFoodFilters={setCommercialFoodFilters}
                                    selectedCommercialFoodId={selectedCommercialFoodId} setSelectedCommercialFoodId={setSelectedCommercialFoodId} selectedCommercialFood={selectedCommercialFood} commercialFoodWarnings={commercialFoodWarnings}
                                    setPredefinedFoodIndex={setPredefinedFoodIndex} customFoodName={customFoodName} setCustomFoodName={setCustomFoodName}
                                    customFoodCalories={customFoodCalories} setCustomFoodCalories={setCustomFoodCalories} customFoodUnit={customFoodUnit} setCustomFoodUnit={setCustomFoodUnit}
                                    handleAddUnifiedFood={handleAddUnifiedFood} handleAddCommercialFood={handleAddCommercialFood} handleAddFood={handleAddFood}
                                    foodPrescriptionList={foodPrescriptionList} calculationResults={calculationResults} targetKcal={targetKcal} setModalContent={setModalContent} sortedFoods={sortedFoods}
                                />
                            )}

                            {activeTab === 'indicacoes' && (
                                <IndicationsTab species={species} sortedFoods={sortedFoods} />
                            )}
                        </div>
                    </div>

                    {/* Sidebar de Resumo (4 Colunas) */}
                    <aside className="xl:col-span-4 space-y-6">
                        <div className="bg-slate-900/60 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl shadow-2xl sticky top-6">
                            <h2 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4 flex items-center gap-3">
                                <span className="material-symbols-outlined text-purple-400">monitoring</span>
                                Resumo Nutricional
                            </h2>

                            {calculationResults ? (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RER (Básico)</p>
                                            <p className="text-2xl font-black text-white">{calculationResults.rer.toFixed(0)} <span className="text-xs text-slate-500">kcal</span></p>
                                        </div>
                                        <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
                                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">DER (Meta)</p>
                                            <p className="text-2xl font-black text-white">
                                                {nutritionalGoal === 'maintenance' ? calculationResults.der.toFixed(0) : targetKcal.toFixed(0)}
                                                <span className="text-xs text-purple-400 ml-1 font-bold">kcal</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1 h-1 bg-purple-500 rounded-full" /> Perfil do Paciente
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-slate-400">Espécie</span>
                                                <span className="text-white font-bold uppercase tracking-tight">{species === 'dog' ? 'Cão' : 'Gato'}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-slate-400">Peso Atual</span>
                                                <span className="text-white font-bold">{weight} <span className="text-[10px] text-slate-500">kg</span></span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-slate-400">Fator (K)</span>
                                                <span className="text-purple-400 font-black">{calculationResults.k}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {foodPrescriptionList.length > 0 && (
                                        <div className="space-y-4 pt-6 border-t border-white/5">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-1 h-1 bg-green-500 rounded-full" /> Dieta Prescrita
                                            </p>
                                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                {foodPrescriptionList.map((food, i) => (
                                                    <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 group hover:bg-white/10 transition-all">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className="font-black text-slate-200 text-[10px] uppercase truncate flex-1">{food.name}</div>
                                                            <span className="text-[10px] font-black text-purple-400 ml-2">#{(i + 1).toString().padStart(2, '0')}</span>
                                                        </div>
                                                        <div className="flex justify-between items-end">
                                                            <div className="text-[9px] font-bold text-slate-500">{(food.calories * (food.unit === 'g' || food.unit === 'ml' ? 1000 : 1)).toFixed(0)} kcal/{food.unit === 'g' ? 'kg' : food.unit === 'ml' ? 'L' : 'un'}</div>
                                                            <div className="text-right">
                                                                <div className="text-[8px] font-black text-slate-600 uppercase">PB / EE</div>
                                                                <div className="text-[10px] font-black text-slate-300">{food.protein}% / {food.fat}%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Box */}
                                    <div className="pt-6 border-t border-white/5">
                                        <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-sm">
                                            <span className="material-symbols-outlined">print</span>
                                            GERAR RELATÓRIO
                                        </button>
                                        <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-tighter mt-4">Vetius Nutrimetabolic v2.0</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                                    <span className="material-symbols-outlined text-5xl mb-4">analytics</span>
                                    <p className="text-sm font-bold uppercase tracking-widest">Aguardando dados...</p>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CalculadoraEnergetica;
