import { ImportPreviewItem, ImportResult } from '../../types/import';
import { MedicationUpsertInput } from '../../types/editorial';
import { getMedicationRepository } from '../medicationRepository';
import {
    generateSafeSlug,
    normalizeArray,
    normalizeBoolean,
    normalizeMedicationDoseArray,
    normalizeMedicationPresentationArray,
    normalizeSpeciesList,
    normalizeString
} from './importNormalizers';

export async function previewMedicationsImport(
    validItems: { originalIndex: number; data: any }[]
): Promise<ImportPreviewItem[]> {
    const repository = getMedicationRepository();
    const existingRecords = await repository.list({ includeDrafts: true });

    const existingBySlug = new Map(existingRecords.map(r => [r.slug, r]));

    return validItems.map(({ originalIndex, data }) => {
        let slug = normalizeString(data.slug);
        if (!slug) {
            slug = generateSafeSlug(data.title);
        }
        const title = normalizeString(data.title);

        let action: 'create' | 'update' = 'create';
        let entityId: string | undefined = undefined;

        const existing = existingBySlug.get(slug);
        if (existing) {
            action = 'update';
            entityId = existing.id;
        }

        const warnings: string[] = [];
        if (!data.slug) warnings.push('Slug ausente. Gerado a partir do título.');

        const mapped: MedicationUpsertInput = {
            id: entityId,
            slug,
            title,
            activeIngredient: normalizeString(data.activeIngredient, 'Desconhecido'),
            tradeNames: normalizeArray(data.tradeNames),
            species: normalizeSpeciesList(data.species),
            category: normalizeString(data.category, 'nao-categorizado'),
            pharmacologicClass: normalizeString(data.pharmacologicClass, 'Geral'),
            tags: normalizeArray(data.tags),
            isPublished: normalizeBoolean(data.isPublished, true),
            mechanismOfAction: normalizeString(data.mechanismOfAction),
            indications: normalizeArray(data.indications),
            contraindications: normalizeArray(data.contraindications),
            cautions: normalizeArray(data.cautions),
            adverseEffects: normalizeArray(data.adverseEffects),
            interactions: normalizeArray(data.interactions),
            routes: normalizeArray(data.routes),
            presentations: normalizeMedicationPresentationArray(data.presentations),
            doses: normalizeMedicationDoseArray(data.doses),
            clinicalNotesRichText: normalizeArray<string>(data.clinicalNotes).map((n) => `<p>${n}</p>`).join(''),
            adminNotesText: normalizeString(data.adminNotesRichText),
            references: normalizeArray(data.references),
            relatedDiseaseSlugs: normalizeArray(data.relatedDiseaseSlugs),
        };

        return {
            index: originalIndex,
            slug,
            title,
            entityType: 'medications',
            action,
            warnings,
            data: mapped,
        };
    });
}

export async function executeMedicationsUpsert(
    items: ImportPreviewItem[]
): Promise<ImportResult> {
    const repository = getMedicationRepository();
    const result: ImportResult = {
        created: 0,
        updated: 0,
        failed: 0,
        errors: [],
    };

    for (const item of items) {
        try {
            await repository.upsert(item.data as MedicationUpsertInput);
            if (item.action === 'create') result.created++;
            else result.updated++;
        } catch (error) {
            result.failed++;
            result.errors.push({
                index: item.index,
                slug: item.slug,
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }

    return result;
}
