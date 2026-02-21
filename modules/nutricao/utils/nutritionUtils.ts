import type { CommercialFood } from '../data/types/commercialFood';
import type { FoodItem, NutritionProfile, CaloriesInfo } from '../data/types/foodTypes';

const factors = {
    dog: {
        'Paciente Crítico / Hospitalizado': { k: 1.0, desc: 'Meta inicial. Ajustar conforme tolerância.' },
        'Filhote (25% peso adulto)': { k: 3.0, desc: 'Início do crescimento.' },
        'Filhote (50% peso adulto)': { k: 2.5, desc: 'Meio do crescimento.' },
        'Filhote (75% peso adulto)': { k: 2.0, desc: 'Final do crescimento.' },
        'Adulto Castrado / Inativo': { k: 1.6, desc: 'Para prevenir ganho de peso.' },
        'Adulto Ativo / Não Castrado': { k: 1.8, desc: 'Atividade normal.' },
        'Perda de Peso (Sedentário/Obeso)': { k: 1.0, desc: 'Aplicado sobre o RER do PESO IDEAL.' },
        'Idoso': { k: 1.4, desc: 'Necessidade energética reduzida.' },
        'Gestação (1-5 semanas)': { k: 1.8, desc: 'Início da gestação.' },
        'Gestação (6-9 semanas)': { k: 2.0, desc: 'Final da gestação.' },
        'Lactação (Ninhada pequena 1-4)': { k: '2.0-4.0', desc: 'Ajustar conforme nº de filhotes.' },
        'Lactação (Ninhada grande 5-12)': { k: '4.0-8.0', desc: 'Ajustar conforme nº de filhotes.' },
    },
    cat: {
        'Paciente Crítico / Hospitalizado': { k: 1.0, desc: 'Meta inicial. Ajustar conforme tolerância.' },
        'Filhote (até 4 meses)': { k: 2.5, desc: 'Crescimento rápido.' },
        'Filhote (4-12 meses)': { k: 2.0, desc: 'Fase final de crescimento.' },
        'Adulto Castrado / Inativo': { k: 1.0, desc: 'Para prevenir ganho de peso.' },
        'Adulto Ativo / Não Castrado': { k: 1.2, desc: 'Atividade normal.' },
        'Perda de Peso (Sedentário/Obeso)': { k: 0.8, desc: 'Aplicado sobre o RER do PESO IDEAL.' },
        'Idoso (sem sobrepeso)': { k: '1.0-1.2', desc: 'Ajustar conforme condição corporal.' },
        'Gestação': { k: 2.0, desc: 'Aumento gradual ao longo da gestação.' },
        'Lactação (Ninhada pequena)': { k: '2.0-3.0', desc: 'Ajustar conforme o número de filhotes.' },
        'Lactação (Ninhada grande)': { k: '4.0-6.0', desc: 'Ajustar conforme o número de filhotes.' },
    }
};
export { factors };

export function getCaloriesPerGramOrMl(food: FoodItem | CommercialFood): CaloriesInfo {
    if ('unit' in food && food.unit) {
        // Se já tem unit definido, usar diretamente
        if (food.unit === 'g' || food.unit === 'ml') {
            return { kcalPerUnit: (food as any).calories, unit: food.unit };
        }
        // Normalizar outras unidades
        if (food.unit === 'L' || food.unit === 'l') {
            return { kcalPerUnit: (food as any).calories, unit: 'ml' };
        }
        if (food.unit === 'kg') {
            return { kcalPerUnit: (food as any).calories / 1000, unit: 'g' };
        }
        // Default: assumir gramas
        return { kcalPerUnit: (food as any).calories, unit: 'g' };
    }
    // Fallback: assumir gramas
    return { kcalPerUnit: (food as any).calories || 0, unit: 'g' };
}

export function determineNutritionProfile(food: Partial<FoodItem>): NutritionProfile {
    const name = food.name?.toLowerCase() || '';

    // Recovery completo
    if (name.includes('recovery') || name.includes('recuperação') ||
        name.includes('a/d') || name.includes('urgent care')) {
        if (name.includes('liquid') || name.includes('líquido')) {
            return 'SUPPORT_ENTERAL';
        }
        return 'VET_RECOVERY_COMPLETE';
    }

    // Enterais humanas
    if (name.includes('fresubin') || name.includes('complett peptide') ||
        name.includes('complett') && name.includes('líquido')) {
        return 'HUMAN_ENTERAL';
    }

    // Suplementos
    if (name.includes('churu') || name.includes('cat stix') ||
        name.includes('nutrapet') || name.includes('nutralife') && name.includes('pasta') ||
        name.includes('gourmet') && (name.includes('sachê') || name.includes('sache'))) {
        return 'SUPPLEMENT';
    }

    // Terapêuticos
    if (food.isTherapeutic) {
        return 'VET_THERAPEUTIC_COMPLETE';
    }

    // Default: completo
    return 'COMPLETE';
}

export function determineIsCompleteAndBalanced(profile: NutritionProfile): boolean {
    return profile === 'COMPLETE' ||
        profile === 'VET_THERAPEUTIC_COMPLETE' ||
        profile === 'VET_RECOVERY_COMPLETE' ||
        profile === 'SUPPORT_ENTERAL'; // Assumindo que enterais de suporte são completas
}

export function determineRequiresVetSupervision(profile: NutritionProfile, isTherapeutic: boolean): boolean {
    return profile === 'VET_THERAPEUTIC_COMPLETE' ||
        profile === 'VET_RECOVERY_COMPLETE' ||
        profile === 'SUPPORT_ENTERAL' ||
        profile === 'HUMAN_ENTERAL' ||
        isTherapeutic;
}

export function getNutritionProfileBadge(profile: NutritionProfile): { text: string; color: string } {
    switch (profile) {
        case 'COMPLETE':
            return { text: 'Completo', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
        case 'VET_THERAPEUTIC_COMPLETE':
            return { text: 'Terapêutico', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' };
        case 'VET_RECOVERY_COMPLETE':
            return { text: 'Recovery', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' };
        case 'SUPPORT_ENTERAL':
            return { text: 'Suporte enteral', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' };
        case 'SUPPLEMENT':
            return { text: 'Suplemento', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' };
        case 'HUMAN_ENTERAL':
            return { text: 'Enteral humana (cuidado)', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' };
        default:
            return { text: 'Completo', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
    }
}
