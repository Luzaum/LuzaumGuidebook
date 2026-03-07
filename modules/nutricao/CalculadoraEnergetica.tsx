import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Activity,
    BookCopy,
    ChevronLeft,
    ChevronRight,
    Download,
    History,
    Home,
    Leaf,
    Menu,
    PackageSearch,
    Save,
    Scale,
    UtensilsCrossed,
    X,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { COMMERCIAL_FOODS } from './data/foodsCommercial';
import type { FoodItem, FoodUnit } from './data/types/foodTypes';
import { factors, determineNutritionProfile, determineIsCompleteAndBalanced, determineRequiresVetSupervision } from './utils/nutritionUtils';
import { predefinedFoods } from './data/foodsPredefined';
import { NATURAL_DIET_PLANS } from './data/naturalDiets';
import calcEnergeticaLogo from '../../assets/logos/logo-calculadora-energetica.png';

// Components
import { Modal } from './components/UI/Modal';
import { EnergyTab } from './components/EnergyTab';
import { FoodCalculatorTab } from './components/FoodCalculatorTab';
import './calculadoraEnergetica.theme.css';

type SectionId = 'home' | 'energia' | 'racao' | 'catalogo' | 'natural' | 'historico';

interface NaturalDraftItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
}

interface HistoryEntry {
    id: string;
    createdAt: string;
    patientName: string;
    tutorName: string;
    species: string;
    weight: string;
    status: string;
    targetKcal: number;
    foods: string[];
    naturalPlan: string;
    naturalItems: string[];
}

const HISTORY_STORAGE_KEY = 'vetius-nutricao-history-v1';
const DRAFT_STORAGE_KEY = 'vetius-nutricao-draft-v1';

const NAV_ITEMS: Array<{ id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', label: 'Homepage', icon: Home },
    { id: 'energia', label: 'Calculadora energética', icon: Activity },
    { id: 'racao', label: 'Calculadora de ração', icon: UtensilsCrossed },
    { id: 'catalogo', label: 'Rações cadastradas', icon: PackageSearch },
    { id: 'natural', label: 'Alimentação natural', icon: Leaf },
    { id: 'historico', label: 'Histórico de pacientes', icon: History },
];

const getSpeciesLabel = (value: string) => (value === 'dog' ? 'Canino' : 'Felino');

const formatNumber = (value: number, decimals = 1) => {
    if (!Number.isFinite(value)) return '0';
    return value.toFixed(decimals).replace('.', ',');
};

const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleString('pt-BR');
};

const CalculadoraEnergetica = ({ onBack }: { onBack: () => void }) => {
    // --- STATE MANAGEMENT ---
    const [activeSection, setActiveSection] = useState<SectionId>('home');
    const [sidebarPinned, setSidebarPinned] = useState(true);
    const [sidebarHover, setSidebarHover] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const [patientName, setPatientName] = useState('');
    const [tutorName, setTutorName] = useState('');

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

    const [iwcInput, setIwcInput] = useState({ weight: '', ecc: '6' });
    const [iwcResult, setIwcResult] = useState('');
    const [catalogQuery, setCatalogQuery] = useState('');
    const [naturalPlanId, setNaturalPlanId] = useState('');
    const [naturalSearch, setNaturalSearch] = useState('');
    const [naturalDraft, setNaturalDraft] = useState<NaturalDraftItem[]>([]);
    const [customNaturalName, setCustomNaturalName] = useState('');
    const [customNaturalQty, setCustomNaturalQty] = useState('');
    const [includeNaturalPlan, setIncludeNaturalPlan] = useState(false);
    const [reviewEntry, setReviewEntry] = useState<HistoryEntry | null>(null);
    const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>(() => {
        if (typeof window === 'undefined') return [];
        try {
            const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw) as HistoryEntry[];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

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

        const currentWeight = parseFloat((weight || iwcInput.weight || '').replace(',', '.'));
        const tw = parseFloat((targetWeight || '').replace(',', '.'));
        if (!tw || tw <= 0) return 0;
        if (!currentWeight || currentWeight <= 0) return 0;
        if (nutritionalGoal === 'deficit' && tw >= currentWeight) return 0;
        if (nutritionalGoal === 'surplus' && tw <= currentWeight) return 0;

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
    }, [calculationResults, nutritionalGoal, targetWeight, species, weight, iwcInput.weight]);

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
    const effectiveTargetKcal = targetKcal > 0 ? targetKcal : calculationResults?.der || 0;
    const sidebarExpanded = sidebarPinned || sidebarHover;

    const catalogFoods = useMemo(() => {
        const query = catalogQuery.toLowerCase().trim();
        const rows = sortedFoods.map(food => ({
            id: food.name,
            name: food.name,
                indication: food.indication || 'Sem indicação principal.',
            kcalPerGram: typeof food.calories === 'number' ? food.calories : null,
            protein: food.protein || 'N/A',
            fat: food.fat || 'N/A',
            advantages: (food.alerts || []).filter((a: any) => a.type === 'green').map((a: any) => String(a.text).replace(/<[^>]*>/g, '')),
            disadvantages: (food.alerts || []).filter((a: any) => a.type !== 'green').map((a: any) => String(a.text).replace(/<[^>]*>/g, '')),
        }));
        if (!query) return rows;
        return rows.filter(row => row.name.toLowerCase().includes(query) || row.indication.toLowerCase().includes(query));
    }, [sortedFoods, catalogQuery]);

    const naturalSheet = species === 'dog' ? 'dog' : nutritionalGoal === 'deficit' ? 'cat_obese' : 'cat_normal';
    const naturalPlans = useMemo(() => NATURAL_DIET_PLANS.filter(p => p.sheet === naturalSheet), [naturalSheet]);
    const visibleNaturalPlans = useMemo(() => {
        const query = naturalSearch.toLowerCase().trim();
        if (!query) return naturalPlans;
        return naturalPlans.filter(p => p.title.toLowerCase().includes(query));
    }, [naturalPlans, naturalSearch]);
    const naturalSuggestions = useMemo(() => {
        const query = naturalSearch.toLowerCase().trim();
        if (!query) return [];
        const starts = naturalPlans.filter(p => p.title.toLowerCase().startsWith(query));
        const includes = naturalPlans.filter(p => !p.title.toLowerCase().startsWith(query) && p.title.toLowerCase().includes(query));
        return [...starts, ...includes].slice(0, 6);
    }, [naturalPlans, naturalSearch]);
    const selectedNaturalPlan = useMemo(() => naturalPlans.find(p => p.id === naturalPlanId) || null, [naturalPlans, naturalPlanId]);

    const naturalBaseNem = selectedNaturalPlan ? Number(selectedNaturalPlan.info['NEM']?.value || 0) : 0;
    const naturalScale = naturalBaseNem > 0 && effectiveTargetKcal > 0 ? effectiveTargetKcal / naturalBaseNem : 1;

    const naturalAutoDraft = useMemo(() => {
        if (!selectedNaturalPlan) return [] as NaturalDraftItem[];
        return selectedNaturalPlan.ingredients
            .filter(item => item.quantity !== null)
            .map(item => ({
                id: `${selectedNaturalPlan.id}-${item.name}`,
                name: item.name,
                quantity: Number(((item.quantity || 0) * naturalScale).toFixed(2)),
                unit: item.unit || 'g',
            }));
    }, [selectedNaturalPlan, naturalScale]);

    const naturalTotal = useMemo(() => naturalDraft.reduce((sum, item) => sum + item.quantity, 0), [naturalDraft]);
    const naturalEm = selectedNaturalPlan ? Number(selectedNaturalPlan.info['EM']?.value || 0) : 0;
    const naturalKcal = naturalEm > 0 ? naturalTotal * naturalEm : 0;

    useEffect(() => {
        if (!selectedNaturalPlan) {
            setNaturalDraft([]);
            return;
        }
        setNaturalDraft(naturalAutoDraft);
    }, [selectedNaturalPlan, naturalAutoDraft]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyEntries.slice(0, 80)));
    }, [historyEntries]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
            if (!raw) return;
            const draft = JSON.parse(raw);
            if (typeof draft.patientName === 'string') setPatientName(draft.patientName);
            if (typeof draft.tutorName === 'string') setTutorName(draft.tutorName);
            if (typeof draft.species === 'string') setSpecies(draft.species);
            if (typeof draft.weight === 'string') setWeight(draft.weight);
            if (typeof draft.status === 'string') setStatus(draft.status);
            if (typeof draft.nutritionalGoal === 'string') setNutritionalGoal(draft.nutritionalGoal);
            if (typeof draft.targetWeight === 'string') setTargetWeight(draft.targetWeight);
            if (typeof draft.catalogQuery === 'string') setCatalogQuery(draft.catalogQuery);
            if (typeof draft.naturalSearch === 'string') setNaturalSearch(draft.naturalSearch);
            if (typeof draft.naturalPlanId === 'string') setNaturalPlanId(draft.naturalPlanId);
            if (typeof draft.includeNaturalPlan === 'boolean') setIncludeNaturalPlan(draft.includeNaturalPlan);
            if (Array.isArray(draft.foodPrescriptionList)) setFoodPrescriptionList(draft.foodPrescriptionList);
            if (Array.isArray(draft.naturalDraft)) setNaturalDraft(draft.naturalDraft);
            if (typeof draft.iwcWeight === 'string' || typeof draft.iwcEcc === 'string') {
                setIwcInput({
                    weight: typeof draft.iwcWeight === 'string' ? draft.iwcWeight : '',
                    ecc: typeof draft.iwcEcc === 'string' ? draft.iwcEcc : '6',
                });
            }
        } catch {
            // ignore corrupted draft
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const draft = {
            patientName,
            tutorName,
            species,
            weight,
            status,
            nutritionalGoal,
            targetWeight,
            catalogQuery,
            naturalSearch,
            naturalPlanId,
            includeNaturalPlan,
            foodPrescriptionList,
            naturalDraft,
            iwcWeight: iwcInput.weight,
            iwcEcc: iwcInput.ecc,
        };
        window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }, [patientName, tutorName, species, weight, status, nutritionalGoal, targetWeight, catalogQuery, naturalSearch, naturalPlanId, includeNaturalPlan, foodPrescriptionList, naturalDraft, iwcInput.weight, iwcInput.ecc]);

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

        if (species === 'dog') {
            const excess = (ecc - 5) * 10;
            iw = w * (100 / (100 + excess));
        } else if (species === 'cat') {
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

    const handleNaturalQtyChange = (id: string, value: string) => {
        const parsed = Number(value.replace(',', '.'));
        if (!Number.isFinite(parsed)) return;
        setNaturalDraft(prev => prev.map(item => item.id === id ? { ...item, quantity: parsed } : item));
    };

    const handleAddCustomNatural = () => {
        const qty = Number(customNaturalQty.replace(',', '.'));
        if (!customNaturalName.trim() || !Number.isFinite(qty) || qty <= 0) return;
        setNaturalDraft(prev => [...prev, {
            id: `custom-${Date.now()}`,
            name: customNaturalName.trim(),
            quantity: qty,
            unit: 'g',
        }]);
        setCustomNaturalName('');
        setCustomNaturalQty('');
    };

    const buildSummary = () => {
        const foods = foodPrescriptionList.map((food: any) => {
            if (effectiveTargetKcal <= 0) return `${food.name}: sem meta energética.`;
            if (food.isCommercial && food.commercialData) {
                const grams = ((effectiveTargetKcal / food.commercialData.me_kcal_per_kg) * 1000).toFixed(1);
                return `${food.name}: ${grams} g/dia`;
            }
            if (food.calories > 0) {
                const amount = (effectiveTargetKcal / food.calories).toFixed(1);
                return `${food.name}: ${amount} ${food.unit === 'g' ? 'g/dia' : `${food.unit}/dia`}`;
            }
            return `${food.name}: sem kcal valida.`;
        });
            const naturalItems = includeNaturalPlan ? naturalDraft.map(item => `${item.name}: ${formatNumber(item.quantity, 2)} ${item.unit}`) : [];
            return { foods, naturalItems };
    };

    const exportPdf = (entry?: HistoryEntry) => {
        try {
            const { foods, naturalItems } = entry ? { foods: entry.foods, naturalItems: entry.naturalItems } : buildSummary();
            const patient = entry?.patientName || patientName || 'Paciente sem nome';
            const tutor = entry?.tutorName || tutorName || 'Tutor não informado';
            const statusLabel = entry?.status || status;
            const weightLabel = entry?.weight || weight || '-';
            const kcal = entry?.targetKcal ?? effectiveTargetKcal;
            const naturalPlanLabel = entry?.naturalPlan || (includeNaturalPlan ? (selectedNaturalPlan?.title || 'Não selecionado') : 'Não incluída');

            const doc = new jsPDF();
            let y = 14;
            const write = (text: string, bold = false) => {
                if (y > 275) { doc.addPage(); y = 14; }
                doc.setFont('helvetica', bold ? 'bold' : 'normal');
                const lines = doc.splitTextToSize(text, 182);
                doc.text(lines, 14, y);
                y += lines.length * 6;
            };

            write('Calculadora Energética - Plano Nutricional', true);
            write(`Data: ${new Date().toLocaleString('pt-BR')}`);
            y += 2;
            write(`Paciente: ${patient}`, true);
            write(`Tutor: ${tutor}`);
            write(`Espécie: ${entry?.species ? getSpeciesLabel(entry.species) : getSpeciesLabel(species)}`);
            write(`Peso: ${weightLabel}`);
            write(`Estado fisiológico: ${statusLabel}`);
            write(`Meta energética: ${formatNumber(kcal, 1)} kcal/dia`);
            y += 2;
            write('Rações prescritas', true);
            foods.forEach(line => write(`- ${line}`));
            y += 2;
            if ((entry ? entry.naturalItems.length > 0 : includeNaturalPlan) && naturalItems.length > 0) {
                write(`Alimentação natural: ${naturalPlanLabel}`, true);
                write(`Estimativa: ${formatNumber(entry?.targetKcal ?? naturalKcal, 1)} kcal/dia`);
                naturalItems.forEach(line => write(`- ${line}`));
            }

            const safeFile = patient
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/[^a-z0-9-_\s]/g, '')
                .trim()
                .replace(/\s+/g, '-');
            doc.save(`calculadora-energetica-${safeFile || 'paciente'}.pdf`);
        } catch (error) {
            console.error('Falha ao gerar PDF', error);
            alert('Não foi possível gerar o PDF. Tente novamente.');
        }
    };

    const saveHistory = () => {
        if (!weight) return;
        const { foods, naturalItems } = buildSummary();
        const row: HistoryEntry = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
            createdAt: new Date().toISOString(),
            patientName: patientName || 'Paciente sem nome',
            tutorName: tutorName || 'Tutor não informado',
            species,
            weight,
            status,
            targetKcal: effectiveTargetKcal,
            foods,
            naturalPlan: includeNaturalPlan ? (selectedNaturalPlan?.title || 'Não selecionado') : 'Não incluída',
            naturalItems: includeNaturalPlan ? naturalItems : [],
        };
        setHistoryEntries(prev => [row, ...prev].slice(0, 80));
        setActiveSection('historico');
    };

    const renderSection = () => {
        if (activeSection === 'energia') {
            return (
                <div className="space-y-4">
                    <div className="metab-card p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="text-sm">Nome do paciente
                            <span className="metab-field-meta">Texto livre • Ex: Thor</span>
                            <input className="input-field mt-1 w-full" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Ex: Thor" />
                        </label>
                        <label className="text-sm">Tutor
                            <span className="metab-field-meta">Texto livre • Ex: Ana Silva</span>
                            <input className="input-field mt-1 w-full" value={tutorName} onChange={(e) => setTutorName(e.target.value)} placeholder="Ex: Ana Silva" />
                        </label>
                    </div>
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
                </div>
            );
        }

        if (activeSection === 'racao') {
            return (
                <FoodCalculatorTab
                    species={species} weight={weight} isCritical={isCritical}
                    nutritionalGoal={nutritionalGoal} setNutritionalGoal={setNutritionalGoal}
                    targetWeight={targetWeight} setTargetWeight={setTargetWeight}
                    iwcInput={iwcInput} setIwcInput={setIwcInput} iwcResult={iwcResult} handleCalculateIdealWeight={handleCalculateIdealWeight}
                    foodSearchQuery={foodSearchQuery} setFoodSearchQuery={setFoodSearchQuery}
                    unifiedFoods={unifiedFoods} selectedUnifiedFoodId={selectedUnifiedFoodId} setSelectedUnifiedFoodId={setSelectedUnifiedFoodId} selectedUnifiedFood={selectedUnifiedFood}
                    commercialFoodFilters={commercialFoodFilters} setCommercialFoodFilters={setCommercialFoodFilters}
                    selectedCommercialFoodId={selectedCommercialFoodId} setSelectedCommercialFoodId={setSelectedCommercialFoodId}
                    setPredefinedFoodIndex={setPredefinedFoodIndex} customFoodName={customFoodName} setCustomFoodName={setCustomFoodName}
                    customFoodCalories={customFoodCalories} setCustomFoodCalories={setCustomFoodCalories} customFoodUnit={customFoodUnit} setCustomFoodUnit={setCustomFoodUnit}
                    handleAddUnifiedFood={handleAddUnifiedFood} handleAddFood={handleAddFood}
                    foodPrescriptionList={foodPrescriptionList} calculationResults={calculationResults} targetKcal={targetKcal} setModalContent={setModalContent} sortedFoods={sortedFoods}
                />
            );
        }

        if (activeSection === 'catalogo') {
            return (
                <div className="space-y-4">
                    <div className="metab-card p-4">
                        <label className="text-sm block">Buscar rações
                            <span className="metab-field-meta">Texto livre • Ex: renal, obesidade</span>
                            <input className="input-field mt-1 w-full" value={catalogQuery} onChange={(e) => setCatalogQuery(e.target.value)} placeholder="Buscar por nome/indicação" />
                        </label>
                    </div>
                    <div className="metab-food-grid">
                        {catalogFoods.map(food => (
                            <div key={food.id} className="metab-card p-4">
                                <h3 className="font-semibold">{food.name}</h3>
                                <p className="metab-small mt-1">{food.indication}</p>
                                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                    <div><strong>kcal/g:</strong> {food.kcalPerGram !== null ? formatNumber(food.kcalPerGram, 3) : 'N/A'}</div>
                                    <div><strong>%PB:</strong> {food.protein}</div>
                                    <div><strong>%EE:</strong> {food.fat}</div>
                                </div>
                                <div className="mt-3">
                                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Vantagens</p>
                                    {(food.advantages.length ? food.advantages : ['Sem vantagens listadas.']).slice(0, 3).map((line, idx) => (
                                        <p key={idx} className="metab-small">{line}</p>
                                    ))}
                                </div>
                                <div className="mt-2">
                                    <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">Desvantagens</p>
                                    {(food.disadvantages.length ? food.disadvantages : ['Sem desvantagens listadas.']).slice(0, 3).map((line, idx) => (
                                        <p key={idx} className="metab-small">{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (activeSection === 'natural') {
            return (
                <div className="space-y-4">
                    <div className="metab-card p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label className="text-sm md:col-span-3 flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={includeNaturalPlan}
                                onChange={(e) => setIncludeNaturalPlan(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <span>Incluir alimentação natural para este paciente (salvamento e PDF)</span>
                        </label>
                        <label className="text-sm">Buscar protocolo
                            <span className="metab-field-meta">Texto livre • Ex: car</span>
                            <input className="input-field mt-1 w-full" value={naturalSearch} onChange={(e) => setNaturalSearch(e.target.value)} placeholder="Ex: car" />
                            {naturalSuggestions.length > 0 && (
                                <div className="mt-2 rounded-lg border border-[color:var(--metab-border)] p-2 space-y-1">
                                    {naturalSuggestions.map(plan => (
                                        <button
                                            key={plan.id}
                                            className="w-full text-left metab-small rounded px-2 py-1 hover:bg-[color:var(--metab-surface)]"
                                            onClick={() => {
                                                setNaturalPlanId(plan.id);
                                                setNaturalSearch(plan.title);
                                            }}
                                        >
                                            {plan.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </label>
                        <label className="text-sm">Protocolo
                            <span className="metab-field-meta">Seleção</span>
                            <select className="input-field mt-1 w-full" value={selectedNaturalPlan?.id || ''} onChange={(e) => setNaturalPlanId(e.target.value)}>
                                <option value="">Selecione um protocolo</option>
                                {visibleNaturalPlans.map(plan => <option key={plan.id} value={plan.id}>{plan.title}</option>)}
                            </select>
                        </label>
                        <div className="text-sm rounded-lg border border-[color:var(--metab-border)] p-3">
                            <p><strong>Kcal alvo:</strong> {effectiveTargetKcal > 0 ? `${formatNumber(effectiveTargetKcal, 1)} kcal` : 'Sem meta'}</p>
                            <p className="metab-small mt-1"><strong>Escala:</strong> {formatNumber(naturalScale, 3)}x</p>
                        </div>
                    </div>
                    {!selectedNaturalPlan && (
                        <div className="metab-card p-4">
                            <p className="metab-small">Nenhum protocolo selecionado. Use a busca ou selecione um protocolo para visualizar composição e quantidades.</p>
                        </div>
                    )}
                    {selectedNaturalPlan && (
                        <div className="metab-card p-4">
                            <h3 className="font-semibold">{selectedNaturalPlan.title}</h3>
                            <p className="metab-small mt-1">
                                NEM base: {formatNumber(Number(selectedNaturalPlan.info['NEM']?.value || 0), 1)} kcal |
                                EM: {formatNumber(Number(selectedNaturalPlan.info['EM']?.value || 0), 2)} kcal/g |
                                Qtd total base: {formatNumber(Number(selectedNaturalPlan.info['Quantidade Total']?.value || 0), 2)} g/dia
                            </p>
                            <p className="metab-small mt-2">
                                Composição: {(selectedNaturalPlan.composition || []).map(item => `${item.label}: ${formatNumber(Number(item.value || 0), 2)}%`).join(' | ') || 'Sem composição detalhada'}
                            </p>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {Object.entries(selectedNaturalPlan.info || {}).map(([label, meta]) => {
                                    const value = typeof meta?.value === 'number' ? formatNumber(meta.value, 2) : String(meta?.value ?? '-');
                                    const unit = meta?.unit ? ` ${meta.unit}` : '';
                                    return (
                                        <div key={`${selectedNaturalPlan.id}-${label}`} className="metab-metric-chip">
                                            <p className="metab-chip-label">{label}</p>
                                            <p className="metab-chip-value">{value}{unit}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <div className="metab-card p-4">
                        <h3 className="metab-section-title">Montagem do zero</h3>
                        <p className="metab-small mt-1">Os ingredientes já vieram ajustados pela energia do paciente. Edite os gramas conforme a conduta.</p>
                        <div className="mt-3 overflow-x-auto">
                            <table className="metab-table">
                                <thead><tr><th>Ingrediente</th><th>Quantidade</th><th>Unidade</th><th>Ações</th></tr></thead>
                                <tbody>
                                    {naturalDraft.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td><input type="number" className="input-field metab-qty-input" value={item.quantity} onChange={(e) => handleNaturalQtyChange(item.id, e.target.value)} /></td>
                                            <td>{item.unit}</td>
                                            <td><button className="metab-danger-btn px-2 py-1 text-xs" onClick={() => setNaturalDraft(prev => prev.filter(row => row.id !== item.id))}>Remover</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-[1fr_120px_auto] gap-2">
                            <input className="input-field" value={customNaturalName} onChange={(e) => setCustomNaturalName(e.target.value)} placeholder="Ingrediente extra" />
                            <input className="input-field" value={customNaturalQty} onChange={(e) => setCustomNaturalQty(e.target.value)} placeholder="Qtd." />
                            <button className="metab-subtle-btn" onClick={handleAddCustomNatural}>Adicionar</button>
                        </div>
                        <p className="metab-small mt-3">Total: {formatNumber(naturalTotal, 2)} g/dia | Estimativa: {formatNumber(naturalKcal, 1)} kcal/dia</p>
                    </div>
                </div>
            );
        }

        if (activeSection === 'historico') {
            return (
                <div className="space-y-4">
                    <div className="metab-card p-4 flex flex-wrap gap-2 items-center justify-between">
                        <p className="metab-small">Consultas salvas localmente neste navegador.</p>
                        <button className="metab-primary-btn" onClick={saveHistory}><Save className="h-4 w-4" /> Salvar consulta atual</button>
                    </div>
                    <div className="metab-history-grid">
                        {historyEntries.length === 0 && (
                            <div className="metab-card p-4">
                                <p className="metab-small">Nenhuma consulta salva ainda.</p>
                            </div>
                        )}
                        {historyEntries.map(entry => (
                            <div key={entry.id} className="metab-card p-4">
                                <h3 className="font-semibold">{entry.patientName}</h3>
                                <p className="metab-small">{formatDateTime(entry.createdAt)}</p>
                                <p className="metab-small">Peso: {entry.weight} kg | Meta: {formatNumber(entry.targetKcal, 1)} kcal</p>
                                <div className="mt-3 flex gap-2">
                                    <button className="metab-subtle-btn" onClick={() => setReviewEntry(entry)}>Revisar</button>
                                    <button className="metab-subtle-btn" onClick={() => exportPdf(entry)}><Download className="h-4 w-4" /> PDF</button>
                                    <button className="metab-danger-btn" onClick={() => setHistoryEntries(prev => prev.filter(row => row.id !== entry.id))}>Excluir</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
                        <div className="space-y-4">
                <div className="metab-home-row">
                    <button className="metab-home-card metab-home-card-lg metab-home-col-70" onClick={() => setActiveSection('energia')}>
                        <div className="metab-home-card-head">
                            <div className="metab-home-icon"><Scale className="h-4 w-4" /></div>
                            <h3>Calculadora Energética</h3>
                        </div>
                        <p className="metab-small mt-2">Fluxo principal do atendimento: identificação do paciente, cálculo energético e decisão nutricional com base clínica.</p>
                    </button>
                    <button className="metab-home-card metab-home-card-lg metab-home-col-30" onClick={() => setActiveSection('racao')}>
                        <div className="metab-home-card-head">
                            <div className="metab-home-icon"><UtensilsCrossed className="h-4 w-4" /></div>
                            <h3>Calculadora de Ração</h3>
                        </div>
                        <p className="metab-small mt-2">Meta nutricional e prescrição diária.</p>
                    </button>
                </div>

                <div className="metab-home-row">
                    <button className="metab-home-card metab-home-card-lg metab-home-col-70" onClick={() => setActiveSection('catalogo')}>
                        <div className="metab-home-card-head">
                            <div className="metab-home-icon"><BookCopy className="h-4 w-4" /></div>
                            <h3>Rações Cadastradas</h3>
                        </div>
                        <p className="metab-small mt-2">Consulta indicação, vantagens, desvantagens, kcal/g, %PB e %EE.</p>
                    </button>
                    <button className="metab-home-card metab-home-card-lg metab-home-col-30" onClick={() => setActiveSection('natural')}>
                        <div className="metab-home-card-head">
                            <div className="metab-home-icon"><Leaf className="h-4 w-4" /></div>
                            <h3>Alimentação Natural</h3>
                        </div>
                        <p className="metab-small mt-2">Busca protocolo e ajusta quantidades.</p>
                    </button>
                </div>

                <div className="metab-home-row">
                    <button className="metab-home-card metab-home-card-lg metab-home-col-70" onClick={() => setActiveSection('historico')}>
                        <div className="metab-home-card-head">
                            <div className="metab-home-icon"><History className="h-4 w-4" /></div>
                            <h3>Histórico de Pacientes</h3>
                        </div>
                        <p className="metab-small mt-2">Salva consultas locais, revisa condutas e exporta PDF.</p>
                    </button>
                    <div className="metab-home-card metab-home-col-30 metab-home-spacer" aria-hidden="true" />
                </div>
            </div>
        );
    };

    const sectionLabel = NAV_ITEMS.find(item => item.id === activeSection)?.label || 'Homepage';

    return (
        <div className="metab-app">
            <Modal content={modalContent} onClose={() => setModalContent(null)} />

            {reviewEntry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setReviewEntry(null)}>
                    <div className="metab-modal-card max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-bold">{reviewEntry.patientName}</h3>
                                <p className="metab-small">{formatDateTime(reviewEntry.createdAt)}</p>
                            </div>
                            <button className="metab-subtle-btn px-2 py-1" onClick={() => setReviewEntry(null)}>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="metab-modal-block">
                                <p><strong>Tutor:</strong> {reviewEntry.tutorName}</p>
                                <p><strong>Espécie:</strong> {getSpeciesLabel(reviewEntry.species)}</p>
                                <p><strong>Peso:</strong> {reviewEntry.weight} kg</p>
                                <p><strong>Estado:</strong> {reviewEntry.status}</p>
                                <p><strong>Meta:</strong> {formatNumber(reviewEntry.targetKcal, 1)} kcal/dia</p>
                            </div>
                            <div className="metab-modal-block">
                                <p><strong>Protocolo natural:</strong> {reviewEntry.naturalPlan || 'Não selecionado'}</p>
                                <p className="metab-small mt-2">Resumo de conduta salvo no histórico local.</p>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="metab-modal-block">
                                <p className="font-semibold mb-2">Rações / alimentos prescritos</p>
                                {reviewEntry.foods.length ? reviewEntry.foods.map((food, idx) => (
                                    <p key={`${reviewEntry.id}-food-${idx}`} className="metab-small">{food}</p>
                                )) : <p className="metab-small">Sem itens salvos.</p>}
                            </div>
                            <div className="metab-modal-block">
                                <p className="font-semibold mb-2">Itens da alimentação natural</p>
                                {reviewEntry.naturalItems.length ? reviewEntry.naturalItems.map((item, idx) => (
                                    <p key={`${reviewEntry.id}-natural-${idx}`} className="metab-small">{item}</p>
                                )) : <p className="metab-small">Sem itens salvos.</p>}
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 justify-end">
                            <button className="metab-subtle-btn" onClick={() => setReviewEntry(null)}>Fechar</button>
                            <button className="metab-primary-btn" onClick={() => exportPdf(reviewEntry)}>
                                <Download className="h-4 w-4" /> Gerar PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {mobileSidebarOpen && <div className="metab-mobile-drawer lg:hidden" onClick={() => setMobileSidebarOpen(false)} />}
            <div className="metab-shell">
                <aside className={`metab-sidebar ${sidebarExpanded ? 'metab-sidebar-expanded' : 'metab-sidebar-collapsed'} ${mobileSidebarOpen ? 'fixed inset-y-2 left-2 z-[90]' : 'hidden lg:flex'}`} onMouseEnter={() => setSidebarHover(true)} onMouseLeave={() => setSidebarHover(false)}>
                    <div className="metab-brand">
                        <div className="metab-logo">
                            <img src={calcEnergeticaLogo} alt="Calculadora Energética" className="h-7 w-7 object-contain" />
                        </div>
                        {sidebarExpanded && <div><p className="metab-brand-title">Calculadora Energética</p><p className="metab-brand-subtitle">Fluxo completo</p></div>}
                    </div>
                    <nav className="metab-nav">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button key={item.id} className={`metab-nav-btn ${activeSection === item.id ? 'active' : ''}`} onClick={() => { setActiveSection(item.id); setMobileSidebarOpen(false); }}>
                                    <Icon className="metab-nav-icon h-4 w-4" />
                                    {sidebarExpanded && <span className="text-sm font-semibold">{item.label}</span>}
                                </button>
                            );
                        })}
                    </nav>
                    <div className="metab-sidebar-actions space-y-2">
                        <button className="metab-toggle-btn" onClick={() => setSidebarPinned(prev => !prev)}>
                            {sidebarPinned ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            {sidebarExpanded && <span>{sidebarPinned ? 'Recolher' : 'Fixar'}</span>}
                        </button>
                        <button className="metab-back-btn" onClick={onBack}>
                            <Home className="h-4 w-4" />
                            {sidebarExpanded && <span>Voltar</span>}
                        </button>
                    </div>
                </aside>

                <main className="metab-main">
                    <header className="metab-topbar">
                        <div className="flex items-center gap-2">
                            <button className="metab-mobile-toggle lg:hidden" onClick={() => setMobileSidebarOpen(true)}><Menu className="h-4 w-4" /></button>
                            <div>
                                <h1 className="metab-heading">{sectionLabel}</h1>
                                <p className="metab-subheading">{getSpeciesLabel(species)} | {weight ? `${weight} kg` : 'sem peso'} | {effectiveTargetKcal > 0 ? `${formatNumber(effectiveTargetKcal, 1)} kcal` : 'sem meta'}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button className="metab-subtle-btn" onClick={saveHistory}><Save className="h-4 w-4" /> <span className="hidden sm:inline">Salvar</span></button>
                            <button className="metab-primary-btn" onClick={() => exportPdf()}><Download className="h-4 w-4" /> <span className="hidden sm:inline">PDF</span></button>
                        </div>
                    </header>
                    <section className="metab-content metab-scroll">{renderSection()}</section>
                </main>
            </div>

            {mobileSidebarOpen && (
                <button className="fixed right-3 top-3 z-[95] rounded-full border border-white/30 bg-black/40 p-2 text-white lg:hidden" onClick={() => setMobileSidebarOpen(false)}>
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default CalculadoraEnergetica;

