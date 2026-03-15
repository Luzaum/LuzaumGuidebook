import { ImportValidationError, ImportEntityType } from '../../types/import';
import { validateMedicationDoses, validateMedicationPresentations } from '../../utils/medicationRules';
import {
    normalizeCategoryName,
    normalizeSpeciesList,
    normalizeString
} from './importNormalizers';

export function validateDisease(
    item: any,
    index: number,
    validCategorySlugs?: Set<string>
): { valid: boolean; errors: ImportValidationError[] } {
    const errors: ImportValidationError[] = [];
    const slug = normalizeString(item.slug);
    const title = normalizeString(item.title);

    if (!slug && !title) {
        errors.push({ index, field: 'slug/title', message: 'Falta slug ou title para identificar a doença.' });
    }

    if (!item.species || (Array.isArray(item.species) && item.species.length === 0) || (typeof item.species === 'string' && !item.species)) {
        errors.push({ index, slug, field: 'species', message: 'Especifique ao menos uma species (dog, cat, both).' });
    }

    const category = normalizeString(item.category);
    if (!category) {
        errors.push({ index, slug, field: 'category', message: 'A categoria (category) é obrigatória.' });
    } else if (validCategorySlugs) {
        const catSlug = normalizeCategoryName(category);
        if (!validCategorySlugs.has(catSlug)) {
            const suggestions = Array.from(validCategorySlugs).slice(0, 5).join(', ') + '...';
            errors.push({ index, slug, field: 'category', message: `Categoria inválida: '${category}'. Categorias válidas disponíveis: ${suggestions}` });
        } else {
            item.category = catSlug;
        }
    }

    if (!normalizeString(item.quickSummary)) {
        errors.push({ index, slug, field: 'quickSummary', message: 'O resumo curto (quickSummary) é obrigatório.' });
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function validateMedication(
    item: any,
    index: number,
    validCategorySlugs?: Set<string>
): { valid: boolean; errors: ImportValidationError[] } {
    const errors: ImportValidationError[] = [];
    const slug = normalizeString(item.slug);
    const title = normalizeString(item.title);

    if (!slug && !title) {
        errors.push({ index, field: 'slug/title', message: 'Falta slug ou title para identificar o medicamento.' });
    }

    const medicationSpecies = normalizeSpeciesList(item.species);
    if (!medicationSpecies.length) {
        errors.push({ index, slug, field: 'species', message: 'Especifique ao menos uma species válida (dog, cat ou both).' });
    }

    const category = normalizeString(item.category);
    if (!category) {
        errors.push({ index, slug, field: 'category', message: 'A categoria (category) é obrigatória.' });
    } else if (validCategorySlugs) {
        const catSlug = normalizeCategoryName(category);
        if (!validCategorySlugs.has(catSlug)) {
            const suggestions = Array.from(validCategorySlugs).slice(0, 5).join(', ') + '...';
            errors.push({ index, slug, field: 'category', message: `Categoria inválida: '${category}'. Categorias válidas disponíveis: ${suggestions}` });
        } else {
            item.category = catSlug;
        }
    }

    if (!normalizeString(item.activeIngredient)) {
        errors.push({ index, slug, field: 'activeIngredient', message: 'Princípio ativo (activeIngredient) é obrigatório.' });
    }

    if (!normalizeString(item.pharmacologicClass)) {
        errors.push({ index, slug, field: 'pharmacologicClass', message: 'Classe farmacológica (pharmacologicClass) é obrigatória.' });
    }

    if (!Array.isArray(item.doses) || item.doses.length === 0) {
        errors.push({ index, slug, field: 'doses', message: 'Informe ao menos uma dose para o medicamento.' });
    } else {
        validateMedicationDoses(item.doses, medicationSpecies).forEach((message) => {
            errors.push({ index, slug, field: 'doses', message });
        });
    }

    if (!Array.isArray(item.presentations) || item.presentations.length === 0) {
        errors.push({ index, slug, field: 'presentations', message: 'Informe ao menos uma apresentação para o medicamento.' });
    } else {
        validateMedicationPresentations(item.presentations).forEach((message) => {
            errors.push({ index, slug, field: 'presentations', message });
        });
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function runValidation(
    items: any[],
    entityType: ImportEntityType,
    validCategorySlugs?: Set<string>
): { validItems: any[]; invalidItems: any[]; allErrors: ImportValidationError[] } {
    const validItems: any[] = [];
    const invalidItems: any[] = [];
    const allErrors: ImportValidationError[] = [];

    items.forEach((item, index) => {
        const result =
            entityType === 'diseases'
                ? validateDisease(item, index, validCategorySlugs)
                : validateMedication(item, index, validCategorySlugs);

        if (result.valid) {
            validItems.push({ originalIndex: index, data: item });
        } else {
            invalidItems.push({ originalIndex: index, data: item, errors: result.errors });
            allErrors.push(...result.errors);
        }
    });

    return { validItems, invalidItems, allErrors };
}
