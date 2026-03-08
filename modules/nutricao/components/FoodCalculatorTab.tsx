import React, { useEffect, useState } from 'react';
import { Beef, Droplets, Flame, Info } from 'lucide-react';
import { HelpIcon } from './UI/HelpIcon';
import { generateAutomaticWarnings } from '../data/foodsCommercial';
import { determineNutritionProfile, determineIsCompleteAndBalanced, getNutritionProfileBadge } from '../utils/nutritionUtils';

interface FoodCalculatorTabProps {
    species: string;
    weight: string;
    isCritical: boolean;
    nutritionalGoal: string;
    setNutritionalGoal: (goal: string) => void;
    targetWeight: string;
    setTargetWeight: (weight: string) => void;
    iwcInput: { weight: string; ecc: string };
    setIwcInput: (input: { weight: string; ecc: string }) => void;
    iwcResult: string;
    handleCalculateIdealWeight: () => void;
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
    setPredefinedFoodIndex: (index: string) => void;
    customFoodName: string;
    setCustomFoodName: (name: string) => void;
    customFoodCalories: string;
    setCustomFoodCalories: (cals: string) => void;
    customFoodUnit: string;
    setCustomFoodUnit: (unit: string) => void;
    handleAddUnifiedFood: () => void;
    handleAddFood: () => void;
    foodPrescriptionList: any[];
    calculationResults: any;
    targetKcal: number;
    setModalContent: (content: any) => void;
    sortedFoods: any[];
}

export const FoodCalculatorTab: React.FC<FoodCalculatorTabProps> = ({
    species,
    weight,
    isCritical,
    nutritionalGoal,
    setNutritionalGoal,
    targetWeight,
    setTargetWeight,
    iwcInput,
    setIwcInput,
    iwcResult,
    handleCalculateIdealWeight,
    foodSearchQuery,
    setFoodSearchQuery,
    unifiedFoods,
    selectedUnifiedFoodId,
    setSelectedUnifiedFoodId,
    selectedUnifiedFood,
    commercialFoodFilters,
    setCommercialFoodFilters,
    setSelectedCommercialFoodId,
    setPredefinedFoodIndex,
    customFoodName,
    setCustomFoodName,
    customFoodCalories,
    setCustomFoodCalories,
    customFoodUnit,
    setCustomFoodUnit,
    handleAddUnifiedFood,
    handleAddFood,
    foodPrescriptionList,
    calculationResults,
    targetKcal,
    setModalContent,
    sortedFoods,
}) => {
    const [eccZoomOpen, setEccZoomOpen] = useState(false);
    const formatPt = (value: number, decimals = 1) => value.toFixed(decimals).replace('.', ',');
    const stripHtml = (text: string) => String(text || '').replace(/<[^>]*>/g, '').trim();
    const goalOptions = [
        { id: 'maintenance', label: 'Manutenção' },
        { id: 'deficit', label: 'Perda de peso' },
        { id: 'surplus', label: 'Ganho de peso' },
    ];
    const extractMacroSummary = (food: any) => {
        const kcalPerGram = food?.isCommercial && food?.commercialData
            ? Number(food.commercialData.me_kcal_per_kg || 0) / 1000
            : Number(food?.calories || 0);
        const protein = food?.isCommercial && food?.commercialData
            ? (() => {
                const g = food.commercialData.guarantees?.find((row: any) => row.key === 'protein_min_gkg');
                return g ? `${(Number(g.value) / 10).toFixed(1)}%` : 'N/A';
            })()
            : (food?.protein || 'N/A');
        const fat = food?.isCommercial && food?.commercialData
            ? (() => {
                const g = food.commercialData.guarantees?.find((row: any) => row.key === 'fat_min_gkg');
                return g ? `${(Number(g.value) / 10).toFixed(1)}%` : 'N/A';
            })()
            : (food?.fat || 'N/A');

        return {
            kcalPerGram: kcalPerGram > 0 ? formatPt(kcalPerGram, 3) : 'N/A',
            protein,
            fat,
        };
    };

    const currentWeight = Number(weight.replace(',', '.'));
    const targetWeightNumber = Number(targetWeight.replace(',', '.'));
    const hasCurrentWeight = Number.isFinite(currentWeight) && currentWeight > 0;
    const isGoalMode = nutritionalGoal === 'deficit' || nutritionalGoal === 'surplus';
    const eccOptions = nutritionalGoal === 'deficit'
        ? [5, 6, 7, 8, 9]
        : nutritionalGoal === 'surplus'
            ? [1, 2, 3, 4, 5]
            : [5];
    const isTargetWeightValid = nutritionalGoal === 'maintenance'
        ? true
        : Number.isFinite(targetWeightNumber) && targetWeightNumber > 0 && (
            nutritionalGoal === 'deficit' ? targetWeightNumber < currentWeight : targetWeightNumber > currentWeight
        );
    const eccImageSrc = species === 'cat' ? '/ecc-gato-2025.jpg' : '/ecc-cao-2025.jpg';
    const kcalForPlan = nutritionalGoal === 'maintenance' ? (calculationResults?.der || 0) : targetKcal;
    const hasEnergyBase = Number.isFinite(currentWeight) && currentWeight > 0;
    const goalKFactor = nutritionalGoal === 'deficit'
        ? (species === 'dog' ? 1.0 : 0.8)
        : nutritionalGoal === 'surplus'
            ? (species === 'dog' ? 1.4 : 1.2)
            : (typeof calculationResults?.k === 'number' ? calculationResults.k : null);

    const goalCalculationDescription = (() => {
        if (!hasEnergyBase) return 'Informe o peso do paciente na Calculadora Energética para liberar a prescrição.';
        if (nutritionalGoal === 'maintenance') {
            const rer = calculationResults?.rer || 0;
            if (!rer || !goalKFactor) return 'Meta de manutenção baseada no RER do peso atual e fator fisiológico.';
            return `Manutenção: RER(${formatPt(currentWeight, 1)} kg) ${formatPt(rer, 1)} x K ${formatPt(goalKFactor, 2)} = ${formatPt(kcalForPlan, 1)} kcal/dia.`;
        }

        if (!isTargetWeightValid) {
            return nutritionalGoal === 'deficit'
                ? 'Perda de peso: informe peso ideal menor que o peso atual para calcular a prescrição.'
                : 'Ganho de peso: informe peso ideal maior que o peso atual para calcular a prescrição.';
        }

        const tw = targetWeightNumber;
        const rerIdeal = (species === 'dog' && (tw < 2 || tw > 45)) ? (30 * tw) + 70 : 70 * Math.pow(tw, 0.75);
        const factor = nutritionalGoal === 'deficit' ? (species === 'dog' ? 1.0 : 0.8) : (species === 'dog' ? 1.4 : 1.2);
        return `${nutritionalGoal === 'deficit' ? 'Perda' : 'Ganho'}: RER(${formatPt(tw, 1)} kg) ${formatPt(rerIdeal, 1)} x K ${formatPt(factor, 1)} = ${formatPt(kcalForPlan, 1)} kcal/dia.`;
    })();
    const isPrescriptionReady = hasEnergyBase && (nutritionalGoal === 'maintenance' || isTargetWeightValid) && kcalForPlan > 0;
    const prescriptionPendingMessage = !hasEnergyBase
        ? 'Informe o peso atual na Calculadora Energética'
        : nutritionalGoal === 'maintenance'
            ? 'Meta energética indisponível'
            : 'Informe um peso ideal válido';

    useEffect(() => {
        setIwcInput({ ...iwcInput, weight: weight || '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weight]);

    useEffect(() => {
        const currentEcc = Number(iwcInput.ecc);
        if (!eccOptions.includes(currentEcc)) {
            setIwcInput({ ...iwcInput, ecc: String(eccOptions[0]) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nutritionalGoal]);

    return (
        <div id="page-calc-racao" className="metab-racao-page">
            {eccZoomOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3" onClick={() => setEccZoomOpen(false)}>
                    <div className="metab-modal-card max-w-5xl w-full p-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end mb-2">
                            <button className="metab-subtle-btn" type="button" onClick={() => setEccZoomOpen(false)}>Fechar</button>
                        </div>
                        <img src={eccImageSrc} alt={`Guia ECC ampliado ${species === 'cat' ? 'felino' : 'canino'}`} className="w-full max-h-[80vh] object-contain rounded-lg border border-[color:var(--metab-border)]" />
                    </div>
                </div>
            )}
            <div className="text-center mb-8">
                <h1 className="metab-racao-title">Plano e Prescrição Diária</h1>
                <p className="mt-2 text-muted-foreground text-lg">Defina a meta, selecione o alimento e veja a quantidade diária.</p>
            </div>

            {!isCritical ? (
                <div className="metab-racao-block p-6 mb-6">
                    <h3 className="font-semibold text-foreground text-xl mb-5 flex items-center gap-2"><span className="metab-step-badge">1</span><span>Defina a meta nutricional</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        {goalOptions.map(goal => (
                            <div key={goal.id}>
                                <input type="radio" id={goal.id} name="nutritionalGoal" value={goal.id} checked={nutritionalGoal === goal.id} onChange={(e) => setNutritionalGoal(e.target.value)} className="hidden goal-radio" />
                                <label htmlFor={goal.id} className="flex items-center justify-center p-3 w-full text-center rounded-lg border-2 cursor-pointer transition-all bg-card border-input hover:bg-muted">
                                    <span className="font-medium text-foreground">{goal.label}</span>
                                    <HelpIcon term={goal.id} onOpenModal={setModalContent} />
                                </label>
                            </div>
                        ))}
                    </div>

                    {isGoalMode && (
                        <div className="metab-goal-layout mt-4">
                            <div className="metab-goal-image-card">
                                <p className="metab-small font-semibold mb-2">Guia de escore corporal</p>
                                <button type="button" className="w-full text-left" onClick={() => setEccZoomOpen(true)} title="Clique para ampliar">
                                    <img src={eccImageSrc} alt={`Guia ECC ${species === 'cat' ? 'felino' : 'canino'}`} className="metab-goal-image" />
                                    <p className="metab-small mt-2">Clique para ampliar</p>
                                </button>
                            </div>
                            <div className="metab-goal-form-card">
                                <label className="block text-sm font-medium mb-1">Peso atual para estimativa (kg)</label>
                                <input type="number" value={iwcInput.weight} onChange={e => setIwcInput({ ...iwcInput, weight: e.target.value })} className="input-field" step="0.1" min="0.1" placeholder="Ex: 12.4" />
                                <label className="block text-sm font-medium mt-3 mb-1">ECC ({nutritionalGoal === 'deficit' ? '5 a 9' : '1 a 5'})</label>
                                <select value={iwcInput.ecc} onChange={e => setIwcInput({ ...iwcInput, ecc: e.target.value })} className="input-field">
                                    {eccOptions.map(val => <option key={val} value={val}>{val}</option>)}
                                </select>
                                <button type="button" onClick={handleCalculateIdealWeight} className="metab-subtle-btn w-full mt-3">Calcular peso ideal estimado</button>
                                {iwcResult && <p className="metab-small mt-2">{iwcResult}</p>}
                                {hasCurrentWeight && (
                                    <p className="metab-small mt-2">
                                        Cálculo base: peso ideal estimado pelo ECC atual e peso informado ({currentWeight.toFixed(1)} kg).
                                    </p>
                                )}

                                <label htmlFor="targetWeight" className="block text-sm font-medium mt-3 mb-1">{nutritionalGoal === 'deficit' ? 'Peso ideal para perda (kg)' : 'Peso ideal para ganho (kg)'}</label>
                                <input type="number" id="targetWeight" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} className="input-field" step="0.1" min="0.1" disabled={!hasCurrentWeight} placeholder={hasCurrentWeight ? 'Ex: 9.8' : 'Informe o peso atual na energia'} />
                                {!hasCurrentWeight && <p className="metab-small mt-2">Para perda/ganho, informe antes o peso atual do paciente na Calculadora Energética.</p>}
                                {hasCurrentWeight && targetWeight && !isTargetWeightValid && (
                                    <p className="metab-small mt-2 text-red-500">{nutritionalGoal === 'deficit' ? 'Para perda de peso, o peso ideal deve ser menor que o peso atual.' : 'Para ganho de peso, o peso ideal deve ser maior que o peso atual.'}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg mb-6">
                    <p><strong>Paciente crítico:</strong> plano fixo em progressão de RER para reduzir risco de realimentação.</p>
                </div>
            )}

            <div className="metab-racao-block p-6 mb-6">
                <h3 className="font-semibold text-foreground text-xl mb-5 flex items-center gap-2"><span className="metab-step-badge">2</span><span>Selecione o alimento</span></h3>
                <div className="mb-6 pb-6 border-b border-border">
                    <h4 className="font-medium text-foreground mb-4 text-xl">Banco de alimentos</h4>
                    <input type="text" placeholder="Buscar alimento (ex: hill)..." value={foodSearchQuery} onChange={(e) => setFoodSearchQuery(e.target.value)} className="input-field" />

                    {foodSearchQuery.trim() && unifiedFoods.length > 0 && (
                        <div className="mt-3 max-h-64 overflow-y-auto border-2 border-border rounded-lg bg-card shadow-lg">
                            <div className="p-2 text-xs text-muted-foreground border-b border-border sticky top-0 bg-muted/80 backdrop-blur-sm z-10">{unifiedFoods.length} alimento(s) encontrado(s)</div>
                            <div className="divide-y divide-border">
                                {unifiedFoods.slice(0, 20).map((food) => {
                                    const displayName = food.isPredefined ? food.name : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                    return <button key={food.id} onClick={() => { setSelectedUnifiedFoodId(food.id); setFoodSearchQuery(''); }} className="w-full text-left p-3 hover:bg-muted transition-colors focus:bg-muted focus:outline-none"><span className="text-sm font-medium text-foreground">{displayName}</span></button>;
                                })}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 mt-3">
                        <select value={commercialFoodFilters.lifeStage} onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, lifeStage: e.target.value }))} className="input-field is-select text-sm"><option value="ALL">Todos os estágios</option><option value="PUPPY">Filhotes</option><option value="ADULT">Adulto</option><option value="SENIOR">Sênior</option></select>
                        <select value={commercialFoodFilters.neuterStatus} onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, neuterStatus: e.target.value }))} className="input-field is-select text-sm"><option value="ANY">Qualquer status</option><option value="NEUTERED">Castrado</option><option value="INTACT">Inteiro</option></select>
                        <select value={commercialFoodFilters.isTherapeutic === undefined ? 'all' : commercialFoodFilters.isTherapeutic ? 'therapeutic' : 'regular'} onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, isTherapeutic: e.target.value === 'all' ? undefined : e.target.value === 'therapeutic' }))} className="input-field is-select text-sm"><option value="all">Todos</option><option value="regular">Regular</option><option value="therapeutic">Terapêutico</option></select>
                        <button onClick={() => { setCommercialFoodFilters({ species: species === 'dog' ? 'DOG' : 'CAT', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: undefined }); setSelectedCommercialFoodId(''); }} className="p-2 bg-slate-200 dark:bg-slate-700 text-foreground rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition">Limpar filtros</button>
                    </div>

                    <div className="mb-3">
                        <select value={selectedUnifiedFoodId} onChange={(e) => { setSelectedUnifiedFoodId(e.target.value); setSelectedCommercialFoodId(''); setPredefinedFoodIndex(''); setCustomFoodName(''); setCustomFoodCalories(''); }} className="input-field is-select appearance-none cursor-pointer">
                            <option value="">Selecione um alimento...</option>
                            {unifiedFoods.map((food) => {
                                const displayName = food.isPredefined ? food.name : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                return <option key={food.id} value={food.id}>{displayName}</option>;
                            })}
                        </select>
                    </div>

                    {selectedUnifiedFood && (
                        <div className="metab-food-card p-5 mb-3">
                            <div className="metab-food-hero mb-3">
                                <div className="metab-food-avatar" aria-hidden>🥣</div>
                                <div>
                                    <h5 className="font-bold text-foreground text-lg">{selectedUnifiedFood.isPredefined ? selectedUnifiedFood.name : `${selectedUnifiedFood.brand}${selectedUnifiedFood.line ? ` - ${selectedUnifiedFood.line}` : ''}`}</h5>
                                    {!selectedUnifiedFood.isPredefined && <p className="text-sm text-muted-foreground">{selectedUnifiedFood.product}</p>}
                                    {selectedUnifiedFood.isPredefined && <p className="text-sm text-muted-foreground">{selectedUnifiedFood.indication}</p>}
                                </div>
                                {(() => {
                                    const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                    const badge = getNutritionProfileBadge(profile);
                                    return <span className={`px-2 py-1 ${badge.color} text-xs font-semibold rounded`}>{badge.text}</span>;
                                })()}
                            </div>
                            {(() => {
                                const kcalPerGram = selectedUnifiedFood.isPredefined
                                    ? Number(selectedUnifiedFood.calories || 0)
                                    : Number(selectedUnifiedFood.me_kcal_per_kg || 0) / 1000;
                                const proteinPercent = selectedUnifiedFood.isPredefined
                                    ? (selectedUnifiedFood.protein || 'N/A')
                                    : (() => {
                                        const g = selectedUnifiedFood.guarantees?.find((row: any) => row.key === 'protein_min_gkg');
                                        return g ? `${(Number(g.value) / 10).toFixed(1)}%` : 'N/A';
                                    })();
                                const fatPercent = selectedUnifiedFood.isPredefined
                                    ? (selectedUnifiedFood.fat || 'N/A')
                                    : (() => {
                                        const g = selectedUnifiedFood.guarantees?.find((row: any) => row.key === 'fat_min_gkg');
                                        return g ? `${(Number(g.value) / 10).toFixed(1)}%` : 'N/A';
                                    })();

                                const advantages: string[] = [];
                                const disadvantages: string[] = [];
                                if (selectedUnifiedFood.isPredefined) {
                                    (selectedUnifiedFood.alerts || []).forEach((a: any) => {
                                        const text = stripHtml(a?.text || '');
                                        if (!text) return;
                                        if (a?.type === 'green') advantages.push(text);
                                        else disadvantages.push(text);
                                    });
                                } else {
                                    (selectedUnifiedFood.functionalNotes || []).forEach((note: string) => {
                                        const text = stripHtml(note);
                                        if (!text) return;
                                        if (/(aten|risco|cautela|obesidade|contraindicado)/i.test(text)) disadvantages.push(text);
                                        else advantages.push(text);
                                    });
                                    const autoWarnings = generateAutomaticWarnings(selectedUnifiedFood) || [];
                                    autoWarnings.forEach((warning) => {
                                        if (warning.type === 'high_fat') disadvantages.push(warning.message);
                                        else advantages.push(warning.message);
                                    });
                                }

                                return (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                                            <div className="metab-food-highlight-card metab-food-highlight-card-kcal">
                                                <p className="metab-chip-label flex items-center gap-1">🔥 <Flame className="h-3.5 w-3.5" /> kcal/g</p>
                                                <p className="metab-chip-value">{kcalPerGram > 0 ? formatPt(kcalPerGram, 3) : 'N/A'}</p>
                                            </div>
                                            <div className="metab-food-highlight-card metab-food-highlight-card-pb">
                                                <p className="metab-chip-label flex items-center gap-1">💪 <Beef className="h-3.5 w-3.5" /> %PB</p>
                                                <p className="metab-chip-value">{proteinPercent}</p>
                                            </div>
                                            <div className="metab-food-highlight-card metab-food-highlight-card-ee">
                                                <p className="metab-chip-label flex items-center gap-1">💧 <Droplets className="h-3.5 w-3.5" /> %EE</p>
                                                <p className="metab-chip-value">{fatPercent}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                            <div className="metab-food-pros p-3">
                                                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">✅ Vantagens</p>
                                                {(advantages.length ? advantages : ['Sem vantagens específicas cadastradas.']).slice(0, 4).map((text, idx) => (
                                                    <p key={`adv-${idx}`} className="metab-small">{text}</p>
                                                ))}
                                            </div>
                                            <div className="metab-food-cons p-3">
                                                <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 mb-1">⚠️ Desvantagens / alertas</p>
                                                {(disadvantages.length ? disadvantages : ['Sem alertas específicos cadastrados.']).slice(0, 4).map((text, idx) => (
                                                    <p key={`dis-${idx}`} className="metab-small">{text}</p>
                                                ))}
                                            </div>
                                        </div>
                                        {!selectedUnifiedFood.isPredefined && Array.isArray(selectedUnifiedFood.sources) && selectedUnifiedFood.sources.length > 0 && (
                                            <div className="mb-3 rounded-lg border border-[color:var(--metab-border)] p-3">
                                                <p className="metab-small font-semibold flex items-center gap-1"><Info className="h-3.5 w-3.5" /> Fontes do fabricante / revendedor</p>
                                                {selectedUnifiedFood.sources.slice(0, 3).map((source: any, idx: number) => (
                                                    <a key={`source-${idx}`} href={source.url} target="_blank" rel="noreferrer" className="metab-small block underline underline-offset-2">{source.label}</a>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                            <button onClick={handleAddUnifiedFood} className="metab-primary-btn w-full py-2 text-sm">Adicionar à lista</button>
                        </div>
                    )}
                </div>

                <h4 className="font-medium text-foreground mb-2">Adicionar manualmente</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" value={customFoodName} onChange={e => { setCustomFoodName(e.target.value); setPredefinedFoodIndex(''); }} placeholder="Nome do alimento" className="input-field col-span-3 md:col-span-1" />
                    <input type="number" value={customFoodCalories} onChange={e => { setCustomFoodCalories(e.target.value); setPredefinedFoodIndex(''); }} placeholder="Calorias" className="input-field" />
                    <select value={customFoodUnit} onChange={e => { setCustomFoodUnit(e.target.value); setPredefinedFoodIndex(''); }} className="input-field is-select"><option value="g">kcal/g</option><option value="lata">kcal/lata</option><option value="sache">kcal/sachê</option><option value="ml">kcal/mL</option></select>
                </div>
                <button onClick={handleAddFood} className="metab-primary-btn w-full mt-4 py-3">Adicionar alimento à lista</button>
            </div>

            <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">3. Prescrição diária</h3>
                <p className="metab-small mb-4">{goalCalculationDescription}</p>
                <div id="food-list" className="space-y-4">
                    {foodPrescriptionList.length === 0 ? <p className="text-center text-muted-foreground">Nenhum alimento adicionado ainda.</p> : foodPrescriptionList.map((food, i) => {
                        const unitLabel = food.unit === 'g' ? 'g' : (food.unit === 'ml' ? 'mL' : food.unit);
                        const foodKey = `${food.name}-${food.calories ?? ''}-${food.unit ?? ''}-${i}`;
                        const summary = extractMacroSummary(food);
                        const amount = kcalForPlan > 0
                            ? (food.isCommercial && food.commercialData ? ((kcalForPlan / food.commercialData.me_kcal_per_kg) * 1000).toFixed(1) : (food.calories > 0 ? (kcalForPlan / food.calories).toFixed(1) : '0.0'))
                            : '0.0';
                        return (
                            <div key={foodKey} className="metab-prescription-card bg-card p-4 rounded-lg border border-border">
                                <div className="metab-prescription-head mb-3">
                                    <div className="metab-prescription-avatar" aria-hidden>{food.isCommercial ? '🧴' : '🍲'}</div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-foreground text-lg mb-1">{food.name}</h4>
                                        <div className="metab-prescription-metrics">
                                            <span>🔥 {summary.kcalPerGram} kcal/g</span>
                                            <span>💪 {summary.protein} PB</span>
                                            <span>💧 {summary.fat} EE</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md gap-3">
                                    <span className="flex items-center text-md font-semibold text-blue-800">{goalOptions.find(g => g.id === nutritionalGoal)?.label || 'Meta:'}<HelpIcon term="foodAmount" onOpenModal={setModalContent} /></span>
                                    <strong className="text-xl font-bold text-blue-800 text-right">{isPrescriptionReady ? (food.isCommercial ? `${amount} g/dia` : `${amount} ${unitLabel}/dia`) : prescriptionPendingMessage}</strong>
                                </div>
                                {(() => {
                                    const foodItem = food.isCommercial ? null : sortedFoods.find(f => f.name === food.name);
                                    if (!foodItem) return null;
                                    const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                    const isComplete = foodItem.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(profile);
                                    if (isComplete) return null;
                                    return <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded"><p className="text-xs">Dieta incompleta para uso exclusivo. Avaliar conduta.</p></div>;
                                })()}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};





