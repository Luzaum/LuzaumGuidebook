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
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] relative overflow-x-hidden font-sans selection:bg-indigo-500/30">
            {/* Aura Efects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10 pointer-events-none opacity-60 dark:opacity-30"></div>
            <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-gradient-to-bl from-blue-400/20 to-teal-400/20 rounded-full blur-3xl -z-10 pointer-events-none opacity-50 dark:opacity-20 mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }}></div>

            <Modal content={modalContent} onClose={() => setModalContent(null)} />

            {/* Ideal Weight Modal */}
            {idealWeightModalOpenFor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIdealWeightModalOpenFor(null)}>
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">Peso Ideal Calculado</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Peso Atual (kg)</label>
                                <input type="number" className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" value={iwcInput.weight} onChange={e => setIwcInput({ ...iwcInput, weight: e.target.value })} step="0.1" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Escore de Condição Corporal (1 a 9)</label>
                                <select className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" value={iwcInput.ecc} onChange={e => setIwcInput({ ...iwcInput, ecc: e.target.value })}>
                                    {[6, 7, 8, 9].map(val => <option key={val} value={val}>{val} - Acima do peso</option>)}
                                    <option value="5" disabled>5 - Ideal (Não usar calculadora)</option>
                                    {[1, 2, 3, 4].map(val => <option key={val} value={val} disabled>{val} - Abaixo do peso (Use % de ganho semanal)</option>)}
                                </select>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">Apenas para sobrepeso/obesidade.</p>
                            </div>
                            <button onClick={handleCalculateIdealWeight} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">Calcular e Usar</button>
                            {iwcResult && (
                                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-300 rounded-r-xl text-center font-bold animate-in fade-in slide-in-from-bottom-2">
                                    {iwcResult}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl mx-auto backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-white/10 rounded-[2rem] shadow-2xl p-5 md:p-8 my-6 md:my-10 relative z-10 transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-5 relative z-20">
                    <button onClick={onBack} className="w-full md:w-auto px-6 py-3 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl font-semibold shadow-sm hover:shadow border-b-2 hover:border-b-slate-300 dark:hover:border-b-slate-600 transition-all flex items-center justify-center gap-2 group backdrop-blur-md">
                        <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span> <span>Voltar</span>
                    </button>
                    <div className="flex p-1.5 bg-slate-200/50 dark:bg-slate-950/50 backdrop-blur-md rounded-2xl gap-1 w-full md:w-auto border border-white/20 dark:border-white/5 shadow-inner">
                        {['energia', 'racao', 'indicacoes'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10 scale-105 z-10' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-800/40'}`}
                            >
                                {tab === 'energia' ? '⚡ Energia' : tab === 'racao' ? '🍚 Prescrição' : '📖 Catálogo'}
                            </button>
                        ))}
                    </div>
                </div>

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
    );
};

export default CalculadoraEnergetica;
