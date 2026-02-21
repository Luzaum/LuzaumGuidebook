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
        <div id="page-calc-racao">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Plano e Prescrição Diária
                </h1>
                <p className="mt-2 text-muted-foreground text-lg">Defina a meta, selecione o alimento e veja a quantidade diária.</p>
            </div>

            {!isCritical ? (
                <div className="bg-gradient-to-br from-muted to-muted/50 p-6 rounded-xl mb-6 border-2 border-border shadow-md">
                    <h3 className="font-semibold text-foreground text-xl mb-5 flex items-center gap-2">
                        <span className="text-2xl">1️⃣</span>
                        <span>Defina a Meta Nutricional</span>
                    </h3>
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
                    {(nutritionalGoal === 'deficit' || nutritionalGoal === 'surplus') && (
                        <div className="mt-4">
                            <label htmlFor="targetWeight" className="block text-sm font-medium text-foreground mb-2 flex items-center">
                                {nutritionalGoal === 'deficit' ? 'Peso Ideal para Perda (kg)' : 'Peso Ideal para Ganho (kg)'}
                                <span
                                    className="inline-flex items-center justify-center w-5 h-5 ml-2 text-sm font-bold text-white bg-blue-500 rounded-full cursor-pointer transition-colors hover:bg-blue-700 shrink-0"
                                    role="button"
                                    aria-label="Abrir guia para cálculo do peso ideal"
                                    onClick={() => {
                                        setIwcInput({ weight: '', ecc: '6' });
                                        setIwcResult('');
                                        setIdealWeightModalOpenFor(species);
                                    }}
                                >?</span>
                            </label>
                            <input type="number" id="targetWeight" placeholder="Ex: 5" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} className="input-field" step="0.1" min="0.1" />
                            {nutritionalGoal === 'deficit' && (
                                <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 text-amber-800 p-4 rounded-r-lg text-sm">
                                    <h4 className="font-bold">💡 Curiosidade Clínica: O "Efeito Platô"</h4>
                                    <p className="mt-1">É comum que o animal pare de perder peso mesmo com a dieta. Isso ocorre por uma adaptação do metabolismo. O acompanhamento veterinário é crucial para reajustar o plano e continuar a perda de peso de forma segura.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg mb-6">
                    <p><strong>Paciente Crítico:</strong> O plano de alimentação é fixo na progressão do RER para evitar síndrome de realimentação. A meta de manutenção será usada.</p>
                </div>
            )}

            <div className="bg-gradient-to-br from-muted to-muted/50 p-6 rounded-xl mb-6 border-2 border-border shadow-md">
                <h3 className="font-semibold text-foreground text-xl mb-5 flex items-center gap-2">
                    <span className="text-2xl">2️⃣</span>
                    <span>Selecione o Alimento</span>
                </h3>

                {/* Banco de Alimentos */}
                <div className="mb-6 pb-6 border-b border-border">
                    <h4 className="font-medium text-foreground mb-4 text-xl">Banco de Alimentos</h4>

                    {/* Campo de Busca */}
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar alimento (ex: digite 'hill' para Hill's)..."
                                value={foodSearchQuery}
                                onChange={(e) => setFoodSearchQuery(e.target.value)}
                                className="w-full p-3 pl-10 bg-card border-2 border-input rounded-lg text-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">🔍</span>
                            {foodSearchQuery && (
                                <button
                                    onClick={() => {
                                        setFoodSearchQuery('');
                                        setSelectedUnifiedFoodId('');
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                    aria-label="Limpar busca"
                                >✕</button>
                            )}
                        </div>

                        {/* Lista de resultados da busca */}
                        {foodSearchQuery.trim() && unifiedFoods.length > 0 && (
                            <div className="mt-3 max-h-64 overflow-y-auto border-2 border-border rounded-lg bg-card shadow-lg">
                                <div className="p-2 text-xs text-muted-foreground border-b border-border sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                                    {unifiedFoods.length} alimento{unifiedFoods.length !== 1 ? 's' : ''} encontrado{unifiedFoods.length !== 1 ? 's' : ''}
                                </div>
                                <div className="divide-y divide-border">
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
                                                className="w-full text-left p-3 hover:bg-muted transition-colors focus:bg-muted focus:outline-none"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-foreground">{displayName}</span>
                                                    {food.isTherapeutic && (
                                                        <span className="ml-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded">Terapêutico</span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {unifiedFoods.length > 20 && (
                                        <div className="p-2 text-xs text-muted-foreground text-center">... e mais {unifiedFoods.length - 20} alimento{unifiedFoods.length - 20 !== 1 ? 's' : ''}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filtros */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <select
                            value={commercialFoodFilters.lifeStage}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, lifeStage: e.target.value }))}
                            className="p-2 bg-card border border-input rounded-lg text-sm text-foreground"
                        >
                            <option value="ALL">Todos os estágios</option>
                            <option value="PUPPY">Filhotes</option>
                            <option value="ADULT">Adulto</option>
                            <option value="SENIOR">Sênior</option>
                        </select>
                        <select
                            value={commercialFoodFilters.neuterStatus}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, neuterStatus: e.target.value }))}
                            className="p-2 bg-card border border-input rounded-lg text-sm text-foreground"
                        >
                            <option value="ANY">Qualquer status</option>
                            <option value="NEUTERED">Castrado</option>
                            <option value="INTACT">Inteiro</option>
                        </select>
                        <select
                            value={commercialFoodFilters.isTherapeutic === undefined ? 'all' : commercialFoodFilters.isTherapeutic ? 'therapeutic' : 'regular'}
                            onChange={(e) => setCommercialFoodFilters((prev: any) => ({ ...prev, isTherapeutic: e.target.value === 'all' ? undefined : e.target.value === 'therapeutic' }))}
                            className="p-2 bg-card border border-input rounded-lg text-sm text-foreground"
                        >
                            <option value="all">Todos</option>
                            <option value="regular">Regular</option>
                            <option value="therapeutic">Terapêutico</option>
                        </select>
                        <button
                            onClick={() => {
                                setCommercialFoodFilters({ species: species === 'dog' ? 'DOG' : 'CAT', lifeStage: 'ALL', neuterStatus: 'ANY', isTherapeutic: undefined });
                                setSelectedCommercialFoodId('');
                            }}
                            className="p-2 bg-slate-200 dark:bg-slate-700 text-foreground rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                        >Limpar filtros</button>
                    </div>

                    {/* Seleção de alimento - Banco Unificado */}
                    <div className="mb-3">
                        <select
                            value={selectedUnifiedFoodId}
                            onChange={(e) => {
                                setSelectedUnifiedFoodId(e.target.value);
                                setSelectedCommercialFoodId('');
                                setPredefinedFoodIndex('');
                                setCustomFoodName('');
                                setCustomFoodCalories('');
                            }}
                            className="w-full p-3 bg-card border-2 border-input rounded-lg text-foreground focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Selecione um alimento...</option>
                            {unifiedFoods.map((food) => {
                                const displayName = food.isPredefined
                                    ? food.name
                                    : `${food.brand} ${food.line ? `- ${food.line}` : ''}: ${food.product}`;
                                return (
                                    <option key={food.id} value={food.id}>{displayName}</option>
                                );
                            })}
                        </select>
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">🍽️</span>
                    </div>

                    {/* Informações do alimento selecionado */}
                    {selectedUnifiedFood && !selectedUnifiedFood.isPredefined && (
                        <div className="bg-gradient-to-br from-card to-muted/50 p-5 rounded-xl border-2 border-border shadow-lg mb-3">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-2xl">🍖</span>
                                        <h5 className="font-bold text-foreground text-lg">
                                            {selectedUnifiedFood.brand}
                                            {selectedUnifiedFood.line && ` - ${selectedUnifiedFood.line}`}
                                        </h5>
                                    </div>
                                    <p className="text-sm text-muted-foreground ml-8">{selectedUnifiedFood.product}</p>
                                </div>
                                {(() => {
                                    const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                    const badge = getNutritionProfileBadge(profile);
                                    return <span className={`px-2 py-1 ${badge.color} text-xs font-semibold rounded`}>{badge.text}</span>;
                                })()}
                                {selectedUnifiedFood.requiresVetSupervision && (
                                    <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-semibold rounded">⚕️ Uso sob supervisão</span>
                                )}
                            </div>

                            {/* ME e valores principais */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-3 rounded-lg text-center border border-indigo-200 dark:border-indigo-800">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><span>⚡</span> ME</p>
                                    <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">{selectedUnifiedFood.me_kcal_per_kg.toLocaleString('pt-BR')} kcal/kg</p>
                                </div>
                                {(() => {
                                    const protein = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'protein_min_gkg');
                                    const fat = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'fat_min_gkg');
                                    const fiber = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'fiber_max_gkg');
                                    const moisture = selectedUnifiedFood.guarantees.find((g: any) => g.key === 'moisture_max_gkg');
                                    return (
                                        <>
                                            {protein && <div className="bg-muted p-2 rounded text-center"><p className="text-xs text-muted-foreground mb-1">PB mín</p><p className="font-bold text-foreground text-sm">{(protein.value / 10).toFixed(1)}%</p></div>}
                                            {fat && <div className="bg-muted p-2 rounded text-center"><p className="text-xs text-muted-foreground mb-1">EE mín</p><p className="font-bold text-foreground text-sm">{(fat.value / 10).toFixed(1)}%</p></div>}
                                            {fiber && <div className="bg-muted p-2 rounded text-center"><p className="text-xs text-muted-foreground mb-1">FB máx</p><p className="font-bold text-foreground text-sm">{(fiber.value / 10).toFixed(1)}%</p></div>}
                                            {moisture && <div className="bg-muted p-2 rounded text-center"><p className="text-xs text-muted-foreground mb-1">Umidade máx</p><p className="font-bold text-foreground text-sm">{(moisture.value / 10).toFixed(1)}%</p></div>}
                                        </>
                                    )
                                })()}
                            </div>

                            {/* Warnings automáticos */}
                            {(() => {
                                const warnings = generateAutomaticWarnings(selectedUnifiedFood)
                                if (warnings.length === 0) return null
                                return (
                                    <div className="space-y-2 mb-3">
                                        {warnings.map((warning, idx) => {
                                            const colorClass = warning.type === 'high_fat' ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300'
                                                : warning.type === 'ultra_low_fat' ? 'bg-blue-100 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-300'
                                                    : warning.type === 'renal_diet' ? 'bg-emerald-100 dark:bg-emerald-900/20 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                                                        : 'bg-purple-100 dark:bg-purple-900/20 border-purple-500 text-purple-800 dark:text-purple-300'
                                            return <div key={idx} className={`p-2 rounded text-xs border-l-4 ${colorClass}`}>{warning.message}</div>
                                        })}
                                    </div>
                                )
                            })()}

                            {selectedUnifiedFood.functionalNotes && selectedUnifiedFood.functionalNotes.length > 0 && (
                                <div className="mb-3">
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">Características:</p>
                                    <ul className="text-xs text-foreground space-y-1">
                                        {selectedUnifiedFood.functionalNotes.map((note: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-1"><span>•</span><span>{note}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button onClick={handleAddUnifiedFood} className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition text-sm">Adicionar à Lista</button>
                        </div>
                    )}

                    {/* Informações do alimento predefinido } */}
                    {selectedUnifiedFood && selectedUnifiedFood.isPredefined && (
                        <div className="bg-gradient-to-br from-card to-muted/50 p-5 rounded-xl border-2 border-border shadow-lg mb-3">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h5 className="font-bold text-foreground text-lg mb-1">{selectedUnifiedFood.name}</h5>
                                    <p className="text-sm text-muted-foreground">{selectedUnifiedFood.indication}</p>
                                </div>
                                {(() => {
                                    const profile = selectedUnifiedFood.nutritionProfile || determineNutritionProfile(selectedUnifiedFood);
                                    const badge = getNutritionProfileBadge(profile);
                                    return <span className={`px-2 py-1 ${badge.color} text-xs font-semibold rounded`}>{badge.text}</span>;
                                })()}
                                {selectedUnifiedFood.requiresVetSupervision && (
                                    <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-semibold rounded">⚕️ Uso sob supervisão</span>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-3 rounded-lg text-center border border-indigo-200 dark:border-indigo-800">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><span>⚡</span> Calorias</p>
                                    <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">{selectedUnifiedFood.calories} {selectedUnifiedFood.unit === 'g' ? 'kcal/g' : selectedUnifiedFood.unit === 'ml' ? 'kcal/mL' : `kcal/${selectedUnifiedFood.unit}`}</p>
                                </div>
                                {selectedUnifiedFood.protein && selectedUnifiedFood.protein !== 'N/A' && (
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg text-center border border-green-200 dark:border-green-800">
                                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><span>🥩</span> PB</p>
                                        <p className="font-bold text-green-700 dark:text-green-300 text-sm">{selectedUnifiedFood.protein}</p>
                                    </div>
                                )}
                                {selectedUnifiedFood.fat && selectedUnifiedFood.fat !== 'N/A' && (
                                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-3 rounded-lg text-center border border-yellow-200 dark:border-yellow-800">
                                        <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><span>🧈</span> EE</p>
                                        <p className="font-bold text-yellow-700 dark:text-yellow-300 text-sm">{selectedUnifiedFood.fat}</p>
                                    </div>
                                )}
                            </div>
                            {selectedUnifiedFood.alerts && selectedUnifiedFood.alerts.length > 0 && (
                                <div className="space-y-2 mb-3">
                                    {selectedUnifiedFood.alerts.map((alert: any, alertIndex: number) => {
                                        const alertClasses: Record<string, string> = { red: 'bg-red-100 border-l-4 border-red-500 text-red-800', yellow: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800', green: 'bg-green-100 border-l-4 border-green-500 text-green-800' };
                                        const icon: Record<string, string> = { red: '🚨', yellow: '⚠️', green: '✅' };
                                        return (
                                            <div key={`${alert.type}-${alert.text?.substring(0, 20) ?? ""}-${alertIndex}`} className={`p-3 rounded-r-md text-sm flex items-start ${alertClasses[alert.type]}`}>
                                                <span className="mr-2 text-base">{icon[alert.type]}</span>
                                                <p dangerouslySetInnerHTML={{ __html: alert.text }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <button onClick={handleAddUnifiedFood} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm">
                                <span>➕</span><span>Adicionar à Lista</span>
                            </button>
                        </div>
                    )}
                </div>

                <h4 className="font-medium text-foreground mb-2">Adicionar Manualmente</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" value={customFoodName} onChange={e => { setCustomFoodName(e.target.value); setPredefinedFoodIndex(''); }} placeholder="Nome do alimento" className="input-field col-span-3 md:col-span-1" />
                    <input type="number" value={customFoodCalories} onChange={e => { setCustomFoodCalories(e.target.value); setPredefinedFoodIndex(''); }} placeholder="Calorias" className="input-field" />
                    <select value={customFoodUnit} onChange={e => { setCustomFoodUnit(e.target.value); setPredefinedFoodIndex(''); }} className="p-3 bg-card border border-input rounded-lg text-foreground">
                        <option value="g">kcal/g</option>
                        <option value="lata">kcal/lata</option>
                        <option value="sache">kcal/sachê</option>
                        <option value="ml">kcal/mL</option>
                    </select>
                </div>
                <button onClick={handleAddFood} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Adicionar Alimento à Lista</button>
            </div>

            <div>
                <h3 className="font-semibold text-foreground text-lg mb-4">3. Prescrição Diária</h3>
                <div id="food-list" className="space-y-4">
                    {foodPrescriptionList.length === 0 ? (
                        <p className="text-center text-muted-foreground">Nenhum alimento adicionado ainda.</p>
                    ) : foodPrescriptionList.map((food, i) => {
                        const unitLabel = food.unit === 'g' ? 'g' : (food.unit === 'ml' ? 'mL' : food.unit);
                        const foodKey = `${food.name}-${food.calories ?? ""}-${food.unit ?? ""}-${i}`;

                        if (isCritical) {
                            const rerKcal = calculationResults?.rer || 0;
                            return (
                                <div key={foodKey} className="bg-card p-4 rounded-lg border border-border">
                                    <h4 className="font-bold text-foreground text-lg mb-3">{food.name}</h4>
                                    <p className='text-sm text-center text-red-600 mb-2'>Paciente crítico: usando plano de progressão para meta de manutenção (RER).</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
                                        <div>
                                            <h5 className="font-semibold text-foreground mb-2 text-center">Protocolo de 3 Dias</h5>
                                            <ul className="space-y-1">
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 1 (33%):</span> <strong className="text-foreground">{((rerKcal * 0.33) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 2 (66%):</span> <strong className="text-foreground">{((rerKcal * 0.66) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 3 (100%):</span> <strong className="text-foreground">{(rerKcal / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-foreground mb-2 text-center">Protocolo de 4 Dias</h5>
                                            <ul className="space-y-1">
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 1 (25%):</span> <strong className="text-foreground">{((rerKcal * 0.25) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 2 (50%):</span> <strong className="text-foreground">{((rerKcal * 0.50) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 3 (75%):</span> <strong className="text-foreground">{((rerKcal * 0.75) / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
                                                <li className="flex justify-between p-1.5 bg-muted rounded"><span>Dia 4 (100%):</span> <strong className="text-foreground">{(rerKcal / food.calories).toFixed(1)} {unitLabel}/dia</strong></li>
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
                                <div key={foodKey} className="bg-card p-4 rounded-lg border border-border">
                                    <h4 className="font-bold text-foreground text-lg mb-3">{food.name}</h4>

                                    {food.isCommercial && food.commercialData && (
                                        <div className="mb-3 space-y-2">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                                <div className="bg-muted p-2 rounded text-center"><p className="text-muted-foreground mb-1">ME</p><p className="font-semibold text-foreground">{food.commercialData.me_kcal_per_kg.toLocaleString('pt-BR')} kcal/kg</p></div>
                                                {(() => {
                                                    const protein = food.commercialData.guarantees.find((g: any) => g.key === 'protein_min_gkg');
                                                    const fat = food.commercialData.guarantees.find((g: any) => g.key === 'fat_min_gkg');
                                                    const fiber = food.commercialData.guarantees.find((g: any) => g.key === 'fiber_max_gkg');
                                                    return (
                                                        <>
                                                            {protein && <div className="bg-muted p-2 rounded text-center"><p className="text-muted-foreground mb-1">PB</p><p className="font-semibold text-foreground">{(protein.value / 10).toFixed(1)}%</p></div>}
                                                            {fat && <div className="bg-muted p-2 rounded text-center"><p className="text-muted-foreground mb-1">EE</p><p className="font-semibold text-foreground">{(fat.value / 10).toFixed(1)}%</p></div>}
                                                            {fiber && <div className="bg-muted p-2 rounded text-center"><p className="text-muted-foreground mb-1">FB</p><p className="font-semibold text-foreground">{(fiber.value / 10).toFixed(1)}%</p></div>}
                                                        </>
                                                    )
                                                })()}
                                            </div>
                                            {(() => {
                                                const warnings = generateAutomaticWarnings(food.commercialData)
                                                if (warnings.length === 0) return null
                                                return (
                                                    <div className="space-y-1">
                                                        {warnings.map((warning, idx) => {
                                                            const colorClass = warning.type === 'high_fat' ? 'bg-red-50 dark:bg-red-900/10 border-red-300 text-red-700 dark:text-red-300'
                                                                : warning.type === 'ultra_low_fat' ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-300 text-blue-700 dark:text-blue-300'
                                                                    : warning.type === 'renal_diet' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                                                                        : 'bg-purple-50 dark:bg-purple-900/10 border-purple-300 text-purple-700 dark:text-purple-300'
                                                            return <div key={idx} className={`p-1.5 rounded text-xs border-l-2 ${colorClass}`}>{warning.message}</div>
                                                        })}
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                                        <span className="flex items-center text-md font-semibold text-blue-800">
                                            {goalOptions.find(g => g.id === nutritionalGoal)?.label || 'Meta:'}
                                            <HelpIcon term="foodAmount" onOpenModal={setModalContent} />
                                        </span>
                                        <strong className="text-xl font-bold text-blue-800">
                                            {targetKcal > 0 ? (food.isCommercial ? `${amount} g/dia` : `${amount} ${unitLabel}/dia`) : 'Insira o peso ideal'}
                                        </strong>
                                    </div>

                                    {(() => {
                                        const foodItem = food.isCommercial ? null : sortedFoods.find(f => f.name === food.name);
                                        if (!foodItem) return null;
                                        const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                        const isComplete = foodItem.isCompleteAndBalanced ?? determineIsCompleteAndBalanced(profile);
                                        if (isComplete) return null;
                                        if (profile === 'SUPPLEMENT') return <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 rounded"><p className="text-sm font-semibold mb-1">⚠️ Suplemento</p><p className="text-xs">Isso não é dieta completa. Use como complemento, não como única fonte.</p></div>;
                                        if (profile === 'HUMAN_ENTERAL') {
                                            const hasCat = foodItem.species?.includes('cat');
                                            return <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded"><p className="text-sm font-semibold mb-1">🚨 Enteral Humana</p><p className="text-xs mb-1">Risco de desequilíbrio metabólico. Use com supervisão.</p>{hasCat && foodItem.speciesSafetyNotes?.cat && <p className="text-xs mt-1 font-semibold">{foodItem.speciesSafetyNotes.cat[0]}</p>}</div>;
                                        }
                                        if (profile === 'SUPPORT_ENTERAL' && !isComplete) return <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 rounded"><p className="text-sm font-semibold mb-1">⚠️ Suporte Enteral</p><p className="text-xs">Não é completo e balanceado. Use sob supervisão.</p></div>;
                                        return null;
                                    })()}

                                    {(() => {
                                        const foodItem = food.isCommercial ? null : sortedFoods.find(f => f.name === food.name);
                                        if (!foodItem) return null;
                                        const profile = foodItem.nutritionProfile || determineNutritionProfile(foodItem);
                                        const badge = getNutritionProfileBadge(profile);
                                        return (
                                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>Tipo:</span>
                                                <span className={`px-2 py-1 ${badge.color} rounded text-xs font-semibold`}>{badge.text}</span>
                                                {foodItem.requiresVetSupervision && <span className="text-orange-600 dark:text-orange-400">⚕️ Uso sob supervisão</span>}
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
