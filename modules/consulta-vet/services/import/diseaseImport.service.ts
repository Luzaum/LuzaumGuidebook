import { ImportPreviewItem, ImportResult } from '../../types/import';
import { DiseaseUpsertInput } from '../../types/editorial';
import { getDiseaseRepository } from '../diseaseRepository';
import { generateSafeSlug, normalizeArray, normalizeBoolean, normalizeString } from './importNormalizers';

export async function previewDiseasesImport(
    validItems: { originalIndex: number; data: any }[]
): Promise<ImportPreviewItem[]> {
    const repository = getDiseaseRepository();
    const existingRecords = await repository.list({ includeDrafts: true });

    // Transformar num Map para O(1) de check by slug
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

        // Validar se precisa avisar algo normalizado
        if (!data.slug) warnings.push('Slug ausente. Gerado a partir do título.');

        // Construir obj mapeado
        const mapped: DiseaseUpsertInput = {
            id: entityId,
            slug,
            title,
            synonyms: normalizeArray(data.synonyms),
            species: normalizeArray(data.species),
            category: normalizeString(data.category, 'Não categorizado'),
            tags: normalizeArray(data.tags),
            isPublished: normalizeBoolean(data.isPublished, true),
            quickSummary: normalizeString(data.quickSummary),
            thirtySecondView: normalizeArray(data.thirtySecondView),
            doNotForget: normalizeArray(data.dontForget),
            redFlags: normalizeArray(data.redFlags),
            whenToSuspect: normalizeArray(data.whenToSuspect),
            initialApproach: normalizeArray(data.initialApproach),
            dogVsCatDifferences: normalizeArray(data.dogVsCatDifferences),
            mostHelpfulTests: normalizeArray(data.mostHelpfulTests),
            commonMistakes: normalizeArray(data.commonMistakes),
            clinicalPearls: normalizeArray(data.clinicalPearls),
            introduction: data.introduction || {},
            etiology: data.etiology || {},
            transmission: data.transmission || {},
            pathophysiology: data.pathophysiology || {},
            epidemiology: data.epidemiology || {},
            clinicalPresentation: data.clinicalPresentation || {},
            physicalExam: data.physicalExam || {},
            differentialDiagnoses: data.differentialDiagnoses || {},
            diagnostics: data.diagnostics || {},
            diagnosticApproach: data.diagnosticApproach || {},
            treatment: data.treatment || {},
            prognosis: data.prognosis || {},
            complications: data.complications || {},
            prevention: data.prevention || {},
            adminNotesRichText: normalizeString(data.adminNotesRichText),
            references: normalizeArray(data.references),
            relatedMedicationSlugs: normalizeArray(data.relatedMedicationSlugs),
            relatedConsensusSlugs: normalizeArray(data.relatedConsensusSlugs),
        };

        return {
            index: originalIndex,
            slug,
            title,
            entityType: 'diseases',
            action,
            warnings,
            data: mapped,
        };
    });
}

export async function executeDiseasesUpsert(
    items: ImportPreviewItem[]
): Promise<ImportResult> {
    const repository = getDiseaseRepository();
    const result: ImportResult = {
        created: 0,
        updated: 0,
        failed: 0,
        errors: [],
    };

    for (const item of items) {
        try {
            await repository.upsert(item.data as DiseaseUpsertInput);
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
