import React, { useEffect, useMemo, useState } from 'react';
import { FileText, Plus, Save, Upload, X } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EditorialField } from '../components/editorial/EditorialField';
import { EditorialPermissionGate } from '../components/editorial/EditorialPermissionGate';
import { ReferencesEditor } from '../components/editorial/ReferencesEditor';
import { RelationshipSelector } from '../components/editorial/RelationshipSelector';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useConsultaVetEditorialAccess } from '../hooks/useConsultaVetEditorialAccess';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { getConsensoRepository } from '../services/consensoRepository';
import { ConsensusRecord } from '../types/consenso';
import { EditorialReference } from '../types/common';
import { ConsensusUpsertInput } from '../types/editorial';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';

type StatusFilter = 'all' | 'published' | 'draft';

type ConsensosFormState = {
    id?: string;
    title: string;
    slug: string;
    organization: string;
    year: string;
    category: string;
    species: 'dog' | 'cat' | 'both';
    tags: string;
    description: string;
    // Detalhes editoriais
    summaryText: string;
    keyPointsText: string;
    practicalApplicationText: string;
    appNotesText: string;
    // PDF
    currentPdfUrl: string;
    currentPdfName: string;
    newPdfFile: File | null;
    // Relacionamentos
    relatedDiseaseSlugs: string[];
    relatedMedicationSlugs: string[];
    // Referências
    references: EditorialReference[];
    isPublished: boolean;
};

function createEmpty(): ConsensosFormState {
    return {
        title: '',
        slug: '',
        organization: '',
        year: '',
        category: '',
        species: 'both',
        tags: '',
        description: '',
        summaryText: '',
        keyPointsText: '',
        practicalApplicationText: '',
        appNotesText: '',
        currentPdfUrl: '',
        currentPdfName: '',
        newPdfFile: null,
        relatedDiseaseSlugs: [],
        relatedMedicationSlugs: [],
        references: [],
        isPublished: true,
    };
}

function mapRecordToForm(record: ConsensusRecord): ConsensosFormState {
    return {
        id: record.id,
        title: record.title,
        slug: record.slug,
        organization: record.organization || '',
        year: record.year ? String(record.year) : '',
        category: record.category || '',
        species: record.species,
        tags: (record.tags || []).join('\n'),
        description: record.description || '',
        summaryText: '',
        keyPointsText: '',
        practicalApplicationText: '',
        appNotesText: '',
        currentPdfUrl: record.fileUrl || record.pdfUrl || '',
        currentPdfName: record.pdfFileName || record.filePath?.split('/').pop() || '',
        newPdfFile: null,
        relatedDiseaseSlugs: record.relatedDiseaseSlugs || [],
        relatedMedicationSlugs: record.relatedMedicationSlugs || [],
        references: [],
        isPublished: record.isPublished,
    };
}

export function EditorialConsensosPage() {
    const consensoRepository = useMemo(() => getConsensoRepository(), []);
    const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
    const medicationRepository = useMemo(() => getMedicationRepository(), []);
    const { isLoading: isLoadingAccess, canManage } = useConsultaVetEditorialAccess();

    const [items, setItems] = useState<ConsensusRecord[]>([]);
    const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
    const [medications, setMedications] = useState<MedicationRecord[]>([]);
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const [form, setForm] = useState<ConsensosFormState>(createEmpty());
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const load = async (nextSlug?: string | null) => {
        setIsLoadingData(true);
        try {
            const [consensoData, diseaseData, medicationData] = await Promise.all([
                consensoRepository.list(undefined, { includeDrafts: true }),
                diseaseRepository.list({ includeDrafts: true }),
                medicationRepository.list({ includeDrafts: true }),
            ]);

            setItems(consensoData);
            setDiseases(diseaseData);
            setMedications(medicationData);

            const slugToUse = nextSlug ?? selectedSlug;
            const selected = slugToUse ? consensoData.find((item) => item.slug === slugToUse) : consensoData[0];
            setSelectedSlug(selected?.slug || null);
            if (selected) {
                const mapped = mapRecordToForm(selected);
                setForm(mapped);
                if (selected.id && selected.source === 'supabase') {
                    void loadDetails(selected.id, mapped);
                }
            } else {
                setForm(createEmpty());
            }
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar consensos.');
        } finally {
            setIsLoadingData(false);
        }
    };

    const loadDetails = async (consensusId: string, baseForm: ConsensosFormState) => {
        setIsLoadingDetails(true);
        try {
            const details = await consensoRepository.getSharedDetailsByConsensusId(consensusId);
            if (details) {
                setForm((current) => ({
                    ...current,
                    summaryText: details.summaryText || baseForm.summaryText,
                    keyPointsText: details.keyPointsText || '',
                    practicalApplicationText: details.practicalApplicationText || '',
                    appNotesText: details.appNotesText || '',
                    references: details.references || [],
                }));
            }
        } catch {
            // Details are optional — don't break the form
        } finally {
            setIsLoadingDetails(false);
        }
    };

    useEffect(() => {
        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredItems = items.filter((item) => {
        const normalized = query.trim().toLowerCase();
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'published' ? item.isPublished !== false : item.isPublished === false);

        if (!normalized) return matchesStatus;

        return (
            matchesStatus &&
            (item.title.toLowerCase().includes(normalized) ||
                item.slug.toLowerCase().includes(normalized) ||
                String(item.organization || '').toLowerCase().includes(normalized) ||
                (item.tags || []).some((tag) => tag.toLowerCase().includes(normalized)))
        );
    });

    const diseaseOptions = diseases.map((item) => ({
        slug: item.slug,
        label: item.title,
        meta: `${item.category} • ${item.species.join('/')}`,
    }));

    const medicationOptions = medications.map((item) => ({
        slug: item.slug,
        label: item.title,
        meta: `${item.pharmacologicClass} • ${item.category}`,
    }));

    const handleSelect = (item: ConsensusRecord) => {
        setSelectedSlug(item.slug);
        const mapped = mapRecordToForm(item);
        setForm(mapped);
        setError(null);
        setSuccess(null);
        if (item.id && item.source === 'supabase') {
            void loadDetails(item.id, mapped);
        }
    };

    const handleCreate = () => {
        setSelectedSlug(null);
        setForm(createEmpty());
        setError(null);
        setSuccess(null);
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const parsedYear = form.year.trim() ? Number(form.year.trim()) : null;
            if (parsedYear !== null && (!Number.isFinite(parsedYear) || parsedYear < 1900 || parsedYear > 3000)) {
                throw new Error('Ano inválido. Informe um valor entre 1900 e 3000.');
            }

            const input: ConsensusUpsertInput = {
                id: form.id,
                slug: form.slug.trim() || undefined,
                title: form.title,
                organization: form.organization.trim() || null,
                year: parsedYear,
                category: form.category.trim() || null,
                species: form.species,
                tags: form.tags
                    .split('\n')
                    .map((t) => t.trim())
                    .filter(Boolean),
                description: form.description.trim() || null,
                file: form.newPdfFile || undefined,
                isPublished: form.isPublished,
                summaryText: form.summaryText.trim() || null,
                keyPointsText: form.keyPointsText.trim() || null,
                practicalApplicationText: form.practicalApplicationText.trim() || null,
                appNotesText: form.appNotesText.trim() || null,
                references: form.references,
                relatedDiseaseSlugs: form.relatedDiseaseSlugs,
                relatedMedicationSlugs: form.relatedMedicationSlugs,
            };

            const saved = await consensoRepository.upsert(input);
            await load(saved.slug);
            setSuccess(form.isPublished ? 'Consenso publicado e salvo com sucesso.' : 'Consenso salvo como rascunho.');
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Falha ao salvar consenso.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm((current) => ({ ...current, newPdfFile: file }));
    };

    const clearNewFile = () => {
        setForm((current) => ({ ...current, newPdfFile: null }));
    };

    const isNew = !form.id;
    const isSeedRecord = items.find((i) => i.slug === selectedSlug)?.source === 'seed';

    return (
        <div className="mx-auto w-full max-w-[1680px] space-y-8 p-4 md:p-8">
            <ConsultaVetPageHero
                eyebrow="Editorial"
                title="Consensos"
                description="CRUD editorial completo para consensos: metadados, detalhes, PDF, referências e relacionamentos. Preserva fallback local para consensos seed."
                icon={FileText}
                accent="violet"
            />

            <EditorialPermissionGate isLoading={isLoadingAccess} canManage={canManage}>
                <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
                    {/* ——— Painel esquerdo: listagem ——— */}
                    <section className="rounded-[28px] border border-border bg-card p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-foreground">Consensos</h2>
                            <button
                                type="button"
                                onClick={handleCreate}
                                className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                <Plus className="h-4 w-4" />
                                Novo
                            </button>
                        </div>

                        <ModuleSearchInput
                            value={query}
                            onChange={setQuery}
                            placeholder="Buscar consenso..."
                            className="mb-4"
                        />

                        <div className="mb-4 flex flex-wrap gap-2">
                            {[
                                { value: 'all', label: 'Todos' },
                                { value: 'published', label: 'Publicados' },
                                { value: 'draft', label: 'Rascunhos' },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setStatusFilter(option.value as StatusFilter)}
                                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${statusFilter === option.value
                                            ? 'border-primary/30 bg-primary/10 text-primary'
                                            : 'border-border bg-background text-muted-foreground hover:bg-muted'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        {isLoadingData ? (
                            <div className="py-12 text-center text-sm text-muted-foreground">Carregando consensos...</div>
                        ) : (
                            <div className="space-y-2">
                                {filteredItems.length === 0 && (
                                    <p className="py-8 text-center text-sm text-muted-foreground">Nenhum consenso encontrado.</p>
                                )}
                                {filteredItems.map((item) => (
                                    <button
                                        key={item.slug}
                                        type="button"
                                        onClick={() => handleSelect(item)}
                                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${selectedSlug === item.slug
                                                ? 'border-primary/40 bg-primary/5'
                                                : 'border-border bg-background hover:bg-muted/50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="font-medium text-foreground">{item.title}</p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {item.organization || '—'} • {item.year || '—'} • {item.slug}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 flex-col items-end gap-1">
                                                <StatusBadge isPublished={item.isPublished} />
                                                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                                                    {item.source || 'seed'}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* ——— Painel direito: formulário ——— */}
                    <form onSubmit={handleSave} className="space-y-8 rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
                        {/* Header do form */}
                        <section className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    {isNew ? 'Novo consenso' : 'Editar consenso'}
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Edite metadados, detalhes editoriais, PDF, referências e relacionamentos.
                                    {isSeedRecord && (
                                        <span className="ml-2 inline-block rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                                            Registro seed — salve para migrar para o banco
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <StatusBadge isPublished={form.isPublished} />
                                <button
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, isPublished: !prev.isPublished }))}
                                    className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                >
                                    {form.isPublished ? 'Marcar como rascunho' : 'Publicar'}
                                </button>
                            </div>
                        </section>

                        {/* Metadados */}
                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-foreground">Metadados</h3>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                <EditorialField label="Título">
                                    <input
                                        value={form.title}
                                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        required
                                    />
                                </EditorialField>

                                <EditorialField label="Slug" hint="Deixe vazio para gerar do título.">
                                    <input
                                        value={form.slug}
                                        onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="ex.: iris-drc-2023"
                                    />
                                </EditorialField>

                                <EditorialField label="Organização / Fonte">
                                    <input
                                        value={form.organization}
                                        onChange={(e) => setForm((prev) => ({ ...prev, organization: e.target.value }))}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ex.: WSAVA, Brasileish"
                                    />
                                </EditorialField>

                                <EditorialField label="Ano">
                                    <input
                                        type="number"
                                        min={1900}
                                        max={3000}
                                        value={form.year}
                                        onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="2023"
                                    />
                                </EditorialField>

                                <EditorialField label="Categoria">
                                    <input
                                        value={form.category}
                                        onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ex.: nefrologia, infecciosas"
                                    />
                                </EditorialField>

                                <EditorialField label="Espécie">
                                    <select
                                        value={form.species}
                                        onChange={(e) => setForm((prev) => ({ ...prev, species: e.target.value as 'dog' | 'cat' | 'both' }))}
                                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="dog">Canino</option>
                                        <option value="cat">Felino</option>
                                        <option value="both">Ambos</option>
                                    </select>
                                </EditorialField>
                            </div>

                            <EditorialField label="Tags" hint="Uma por linha.">
                                <textarea
                                    value={form.tags}
                                    onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                                    rows={3}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    placeholder="DRC&#10;Estadiamento&#10;Renal"
                                />
                            </EditorialField>

                            <EditorialField label="Descritivo curto (campo descrição)">
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    placeholder="Resumo breve exibido na listagem pública."
                                />
                            </EditorialField>
                        </section>

                        {/* Blocos Editoriais */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold text-foreground">Detalhes editoriais</h3>
                                {isLoadingDetails && (
                                    <span className="text-xs text-muted-foreground">Carregando detalhes...</span>
                                )}
                            </div>

                            <EditorialField label="Resumo no aplicativo" hint="Exibido na aba Resumo do consenso.">
                                <textarea
                                    value={form.summaryText}
                                    onChange={(e) => setForm((prev) => ({ ...prev, summaryText: e.target.value }))}
                                    rows={5}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </EditorialField>

                            <EditorialField label="Pontos-chave" hint="Aceita texto simples ou marcadores por linha.">
                                <textarea
                                    value={form.keyPointsText}
                                    onChange={(e) => setForm((prev) => ({ ...prev, keyPointsText: e.target.value }))}
                                    rows={6}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    placeholder="• Estadiamento baseado em creatinina ou SDMA&#10;• 4 estágios com subestágios de pressão arterial&#10;• Proteinúria avaliada pelo RPCU"
                                />
                            </EditorialField>

                            <EditorialField label="Aplicação prática">
                                <textarea
                                    value={form.practicalApplicationText}
                                    onChange={(e) => setForm((prev) => ({ ...prev, practicalApplicationText: e.target.value }))}
                                    rows={5}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </EditorialField>

                            <EditorialField label="Alertas / Notas do app" hint="Avisos importantes exibidos em destaque no detalhe.">
                                <textarea
                                    value={form.appNotesText}
                                    onChange={(e) => setForm((prev) => ({ ...prev, appNotesText: e.target.value }))}
                                    rows={4}
                                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    placeholder="Sempre avaliar o paciente hidratado antes de estadiar a DRC."
                                />
                            </EditorialField>
                        </section>

                        {/* PDF */}
                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-foreground">PDF associado</h3>

                            {form.currentPdfUrl && (
                                <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-4">
                                    <FileText className="h-5 w-5 shrink-0 text-primary" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-foreground">{form.currentPdfName || 'PDF atual'}</p>
                                        <a
                                            href={form.currentPdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Abrir PDF
                                        </a>
                                    </div>
                                </div>
                            )}

                            {!form.currentPdfUrl && !isNew && (
                                <p className="text-sm text-muted-foreground">Nenhum PDF associado a este consenso.</p>
                            )}

                            <EditorialField
                                label={form.currentPdfUrl ? 'Substituir PDF' : 'Fazer upload de PDF'}
                                hint="Apenas arquivos .pdf. Deixe em branco para manter o PDF atual."
                            >
                                {form.newPdfFile ? (
                                    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-3">
                                        <Upload className="h-4 w-4 shrink-0 text-primary" />
                                        <span className="min-w-0 flex-1 truncate text-sm text-foreground">{form.newPdfFile.name}</span>
                                        <button
                                            type="button"
                                            onClick={clearNewFile}
                                            className="shrink-0 rounded-lg p-1 text-muted-foreground hover:bg-muted"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        accept="application/pdf,.pdf"
                                        onChange={handleFileChange}
                                        className="block w-full cursor-pointer rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium"
                                    />
                                )}
                            </EditorialField>

                            {isNew && !form.newPdfFile && (
                                <p className="text-xs text-muted-foreground">
                                    Para criar um consenso sem PDF por enquanto, o campo é opcional. O PDF pode ser adicionado depois.
                                </p>
                            )}
                        </section>

                        {/* Relacionamentos */}
                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-foreground">Relacionamentos</h3>
                            <div className="grid gap-4 xl:grid-cols-2">
                                <RelationshipSelector
                                    title="Doenças relacionadas"
                                    searchPlaceholder="Buscar doença..."
                                    options={diseaseOptions}
                                    value={form.relatedDiseaseSlugs}
                                    onChange={(nextValue) => setForm((prev) => ({ ...prev, relatedDiseaseSlugs: nextValue }))}
                                />
                                <RelationshipSelector
                                    title="Medicamentos relacionados"
                                    searchPlaceholder="Buscar medicamento..."
                                    options={medicationOptions}
                                    value={form.relatedMedicationSlugs}
                                    onChange={(nextValue) => setForm((prev) => ({ ...prev, relatedMedicationSlugs: nextValue }))}
                                />
                            </div>
                        </section>

                        {/* Referências */}
                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-foreground">Referências</h3>
                            <ReferencesEditor
                                value={form.references}
                                onChange={(nextValue) => setForm((prev) => ({ ...prev, references: nextValue }))}
                            />
                        </section>

                        {/* Feedback */}
                        {error ? (
                            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                {error}
                            </div>
                        ) : null}
                        {success ? (
                            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                                {success}
                            </div>
                        ) : null}

                        {/* Ação: salvar */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />
                                {isSaving ? 'Salvando...' : form.isPublished ? 'Salvar consenso' : 'Salvar rascunho'}
                            </button>
                        </div>
                    </form>
                </div>
            </EditorialPermissionGate>
        </div>
    );
}
