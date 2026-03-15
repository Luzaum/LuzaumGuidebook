import React, { useState } from 'react';
import { Database, FileJson, Loader2 } from 'lucide-react';
import { EditorialPermissionGate } from '../components/editorial/EditorialPermissionGate';
import { useConsultaVetEditorialAccess } from '../hooks/useConsultaVetEditorialAccess';
import { ImportEntityType, ImportPreviewItem } from '../types/import';
import { parseImportPayload } from '../services/import/importNormalizers';
import { runValidation } from '../services/import/importValidators';
import { executeDiseasesUpsert, previewDiseasesImport } from '../services/import/diseaseImport.service';
import { executeMedicationsUpsert, previewMedicationsImport } from '../services/import/medicationImport.service';
import { JsonImportPanel } from '../components/editorial/import/JsonImportPanel';
import { ImportValidationSummary } from '../components/editorial/import/ImportValidationSummary';
import { ImportPreviewList } from '../components/editorial/import/ImportPreviewList';
import { getCategoryRepository } from '../services/categoryRepository';

type ImportStep = 'input' | 'validating' | 'preview' | 'importing' | 'results';

export function EditorialImportPage() {
    const { isLoading: isLoadingAccess, canManage } = useConsultaVetEditorialAccess();

    const [entityType, setEntityType] = useState<ImportEntityType>('diseases');
    const [step, setStep] = useState<ImportStep>('input');

    const [validationResult, setValidationResult] = useState<{
        validCount: number;
        invalidCount: number;
        errors: any[];
    } | null>(null);

    const [previewItems, setPreviewItems] = useState<ImportPreviewItem[]>([]);
    const [importResult, setImportResult] = useState<{
        created: number;
        updated: number;
        failed: number;
        errors: any[];
    } | null>(null);

    const handleValidate = async (rawJson: string) => {
        setStep('validating');
        setValidationResult(null);
        setPreviewItems([]);
        setImportResult(null);

        try {
            const items = parseImportPayload(rawJson);
            const categoryRepo = getCategoryRepository();
            const categories = await categoryRepo.list();
            const categorySlugs = new Set(categories.map(c => c.slug));

            const { validItems, invalidItems, allErrors } = runValidation(items, entityType, categorySlugs);

            setValidationResult({
                validCount: validItems.length,
                invalidCount: invalidItems.length,
                errors: allErrors,
            });

            if (validItems.length > 0 && invalidItems.length === 0) {
                // Only run preview if fully valid, or user might decide to drop invalid. 
                // We'll enforce that the JSON must be fully valid for safety in this version.
                const previews =
                    entityType === 'diseases'
                        ? await previewDiseasesImport(validItems)
                        : await previewMedicationsImport(validItems);

                setPreviewItems(previews);
                setStep('preview');
            } else {
                setStep('input');
            }
        } catch (error) {
            setValidationResult({
                validCount: 0,
                invalidCount: 1,
                errors: [{ index: 0, message: error instanceof Error ? error.message : 'Erro genérico ao processar JSON.' }],
            });
            setStep('input');
        }
    };

    const handleImport = async () => {
        setStep('importing');

        try {
            const result =
                entityType === 'diseases'
                    ? await executeDiseasesUpsert(previewItems)
                    : await executeMedicationsUpsert(previewItems);

            setImportResult(result);
        } catch (e) {
            setImportResult({ created: 0, updated: 0, failed: previewItems.length, errors: [] });
        } finally {
            setStep('results');
        }
    };

    const currentExampleUrl =
        entityType === 'diseases' ? '/examples/disease.import.example.json' : '/examples/medication.import.example.json';

    const titleMap = {
        diseases: 'Doenças',
        medications: 'Medicamentos'
    };

    const resetState = () => {
        setStep('input');
        setValidationResult(null);
        setPreviewItems([]);
        setImportResult(null);
    }

    return (
        <div className="mx-auto w-full max-w-5xl space-y-8 p-4 md:p-8">
            <header className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Importar via JSON</h1>
                        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                            Ferramenta administrativa para upload massivo e atualização por batch gerados por IAs (NeuroVet, GenAI).
                        </p>
                    </div>
                </div>
            </header>

            <EditorialPermissionGate isLoading={isLoadingAccess} canManage={canManage}>

                {/* Entity Tabs */}
                {step === 'input' && (
                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm w-fit">
                        <button
                            type="button"
                            onClick={() => { setEntityType('diseases'); setValidationResult(null); }}
                            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${entityType === 'diseases'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                }`}
                        >
                            Doenças
                        </button>
                        <button
                            type="button"
                            onClick={() => { setEntityType('medications'); setValidationResult(null); }}
                            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${entityType === 'medications'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                }`}
                        >
                            Medicamentos
                        </button>
                    </div>
                )}

                <div className="grid gap-6">
                    {/* Validação Feedback */}
                    {validationResult && (
                        <ImportValidationSummary
                            validCount={validationResult.validCount}
                            invalidCount={validationResult.invalidCount}
                            errors={validationResult.errors}
                        />
                    )}

                    {/* Estado de Input */}
                    {step === 'input' && (
                        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
                            <h2 className="mb-6 text-lg font-semibold text-foreground">Importar {titleMap[entityType]}</h2>
                            <JsonImportPanel
                                onValidate={handleValidate}
                                isLoading={false}
                                exampleUrl={currentExampleUrl}
                            />
                        </div>
                    )}

                    {step === 'validating' && (
                        <div className="flex h-48 flex-col items-center justify-center gap-4 rounded-[28px] border border-border bg-card">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm font-medium text-foreground">Validando schema do JSON...</p>
                        </div>
                    )}

                    {/* Preview State */}
                    {step === 'preview' && (
                        <div className="space-y-6">
                            <ImportPreviewList items={previewItems} />
                            <div className="flex gap-4 justify-end border-t border-border pt-6">
                                <button
                                    type="button"
                                    onClick={resetState}
                                    className="rounded-xl border border-border bg-background px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleImport}
                                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                                >
                                    <Database className="h-4 w-4" />
                                    Confirmar e Importar {previewItems.length} Itens
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'importing' && (
                        <div className="flex h-48 flex-col items-center justify-center gap-4 rounded-[28px] border border-border bg-card">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm font-medium text-foreground">Efetivando alterações no Supabase...</p>
                        </div>
                    )}

                    {/* Results State */}
                    {step === 'results' && importResult && (
                        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm space-y-6">
                            <h2 className="text-xl font-bold text-foreground">Importação Finalizada</h2>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                    <p className="text-sm text-muted-foreground">Novos</p>
                                    <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{importResult.created}</p>
                                </div>
                                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                                    <p className="text-sm text-muted-foreground">Atualizados</p>
                                    <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">{importResult.updated}</p>
                                </div>
                                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
                                    <p className="text-sm text-muted-foreground">Falhas</p>
                                    <p className="mt-1 text-2xl font-bold text-destructive">{importResult.failed}</p>
                                </div>
                            </div>

                            {importResult.failed > 0 && (
                                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 space-y-2">
                                    <h3 className="text-sm font-semibold text-destructive">Detalhes das Falhas</h3>
                                    <ul className="text-xs space-y-1 text-destructive">
                                        {importResult.errors.map((e, idx) => (
                                            <li key={idx}>[{e.slug || `Índice ${e.index}`}] {e.message}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={resetState}
                                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                                >
                                    Nova Importação
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </EditorialPermissionGate>
        </div>
    );
}
