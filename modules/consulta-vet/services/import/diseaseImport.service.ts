import { ImportPreviewItem, ImportResult } from '../../types/import';
import { DiseaseUpsertInput } from '../../types/editorial';
import { mergeDiseaseDiagnosticSections } from '../../utils/diseaseDiagnosticMerge';
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

        const quickDecisionStripRaw = normalizeArray(data.quickDecisionStrip);
        const quickDecisionStrip = quickDecisionStripRaw.length
            ? quickDecisionStripRaw.slice(0, 5)
            : [...normalizeArray(data.thirtySecondView), ...normalizeArray(data.whenToSuspect)]
                  .map((s) => String(s).trim())
                  .filter(Boolean)
                  .slice(0, 5);

        const diagnosisMerged =
            data.diagnosis !== undefined && data.diagnosis !== null && data.diagnosis !== ''
                ? data.diagnosis
                : mergeDiseaseDiagnosticSections(data.diagnostics, data.diagnosticApproach);

        const clinicalSignsPathophysiology =
            data.clinicalSignsPathophysiology !== undefined && data.clinicalSignsPathophysiology !== null
                ? data.clinicalSignsPathophysiology
                : data.physicalExam !== undefined &&
                    data.physicalExam !== null &&
                    String(JSON.stringify(data.physicalExam)).replace(/\s/g, '') !== '{}'
                  ? { apresentacaoClinica: data.clinicalPresentation ?? '', exameFisico: data.physicalExam }
                  : data.clinicalPresentation ?? '';

        const etiology =
            data.etiology !== undefined && data.etiology !== null && data.etiology !== ''
                ? data.etiology
                : data.introduction ?? '';

        const references = Array.isArray(data.references) ? data.references : [];

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
            quickDecisionStrip,
            etiology,
            epidemiology: data.epidemiology || {},
            pathogenesisTransmission: data.pathogenesisTransmission || data.transmission || {},
            pathophysiology: data.pathophysiology || {},
            clinicalSignsPathophysiology,
            diagnosis: diagnosisMerged ?? '',
            treatment: data.treatment || {},
            prevention: data.prevention || {},
            references,
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
