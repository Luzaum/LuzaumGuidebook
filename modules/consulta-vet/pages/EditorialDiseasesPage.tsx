import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Save, Stethoscope } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EditorialField } from '../components/editorial/EditorialField';
import { EditorialPermissionGate } from '../components/editorial/EditorialPermissionGate';
import { ReferencesEditor } from '../components/editorial/ReferencesEditor';
import { RelationshipSelector } from '../components/editorial/RelationshipSelector';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useConsultaVetEditorialAccess } from '../hooks/useConsultaVetEditorialAccess';
import { getCategoryRepository } from '../services/categoryRepository';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { Category } from '../types/category';
import { ConsensusRecord } from '../types/consenso';
import { EditorialReference } from '../types/common';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { formatMultiline, formatSectionValue, parseSectionValue, splitMultiline } from '../utils/editorialForm';

type StatusFilter = 'all' | 'published' | 'draft';

type DiseaseFormState = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  species: Array<'dog' | 'cat'>;
  synonyms: string;
  tags: string;
  quickSummary: string;
  quickDecisionStrip: string;
  etiology: string;
  epidemiology: string;
  pathogenesisTransmission: string;
  pathophysiology: string;
  clinicalSignsPathophysiology: string;
  diagnosis: string;
  treatment: string;
  prevention: string;
  relatedMedicationSlugs: string[];
  relatedConsensusSlugs: string[];
  references: EditorialReference[];
  isPublished: boolean;
};

const SECTION_FIELDS: Array<{ key: keyof DiseaseFormState; label: string; hint?: string; rows?: number }> = [
  { key: 'etiology', label: '1. Etiologia', rows: 8 },
  { key: 'epidemiology', label: '2. Epidemiologia', rows: 7 },
  { key: 'pathogenesisTransmission', label: '3. Patogênese / transmissão', rows: 8 },
  { key: 'pathophysiology', label: '4. Fisiopatologia', hint: 'Aceita texto, lista por linha ou JSON.', rows: 10 },
  {
    key: 'clinicalSignsPathophysiology',
    label: '5. Sinais clínicos (correlacionar com fisiopatologia)',
    hint: 'Aceita texto, lista por linha ou JSON.',
    rows: 12,
  },
  {
    key: 'diagnosis',
    label: '6. Como diagnosticar',
    hint:
      'Ordem dos exames por importância. Para passos em JSON, use array com title, description, stepNumber e isGoldStandard: true no padrão ouro.',
    rows: 12,
  },
  {
    key: 'treatment',
    label: '7. Como tratar',
    hint: 'Prioridade do tratamento e terapias adjuvantes. Aceita texto ou JSON.',
    rows: 12,
  },
  { key: 'prevention', label: '8. Prevenção', rows: 7 },
];

function createEmptyDisease(): DiseaseFormState {
  return {
    title: '',
    slug: '',
    category: '',
    species: ['dog'],
    synonyms: '',
    tags: '',
    quickSummary: '',
    quickDecisionStrip: '',
    etiology: '',
    epidemiology: '',
    pathogenesisTransmission: '',
    pathophysiology: '',
    clinicalSignsPathophysiology: '',
    diagnosis: '',
    treatment: '',
    prevention: '',
    relatedMedicationSlugs: [],
    relatedConsensusSlugs: [],
    references: [],
    isPublished: true,
  };
}

function mapDiseaseToForm(record: DiseaseRecord): DiseaseFormState {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    category: record.category,
    species: record.species,
    synonyms: formatMultiline(record.synonyms),
    tags: formatMultiline(record.tags),
    quickSummary: record.quickSummary,
    quickDecisionStrip: formatMultiline(record.quickDecisionStrip),
    etiology: formatSectionValue(record.etiology),
    epidemiology: formatSectionValue(record.epidemiology),
    pathogenesisTransmission: formatSectionValue(record.pathogenesisTransmission),
    pathophysiology: formatSectionValue(record.pathophysiology),
    clinicalSignsPathophysiology: formatSectionValue(record.clinicalSignsPathophysiology),
    diagnosis: formatSectionValue(record.diagnosis),
    treatment: formatSectionValue(record.treatment),
    prevention: formatSectionValue(record.prevention),
    relatedMedicationSlugs: record.relatedMedicationSlugs || [],
    relatedConsensusSlugs: record.relatedConsensusSlugs || [],
    references: record.references || [],
    isPublished: record.isPublished ?? true,
  };
}

export function EditorialDiseasesPage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const categoryRepository = useMemo(() => getCategoryRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);
  const { isLoading: isLoadingAccess, canManage } = useConsultaVetEditorialAccess();

  const [items, setItems] = useState<DiseaseRecord[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<DiseaseFormState>(createEmptyDisease());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = async (nextSelectedSlug?: string | null) => {
    setIsLoadingData(true);
    try {
      const [diseaseData, categoryData, medicationData, consensoData] = await Promise.all([
        diseaseRepository.list({ includeDrafts: true }),
        categoryRepository.list({ includeDrafts: true }),
        medicationRepository.list({ includeDrafts: true }),
        consensoRepository.list(),
      ]);

      setItems(diseaseData);
      setCategories(categoryData);
      setMedications(medicationData);
      setConsensos(consensoData);

      const slugToUse = nextSelectedSlug ?? selectedSlug;
      const selected = slugToUse ? diseaseData.find((item) => item.slug === slugToUse) : diseaseData[0];
      setSelectedSlug(selected?.slug || null);
      setForm(selected ? mapDiseaseToForm(selected) : createEmptyDisease());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar doenças.');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    void load();
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
        item.tags.some((tag) => tag.toLowerCase().includes(normalized)) ||
        item.synonyms.some((synonym) => synonym.toLowerCase().includes(normalized)))
    );
  });

  const medicationOptions = medications.map((item) => ({
    slug: item.slug,
    label: item.title,
    meta: `${item.pharmacologicClass} • ${item.category}`,
  }));

  const consensoOptions = consensos.map((item) => ({
    slug: item.slug,
    label: item.title,
    meta: [item.organization, item.year].filter(Boolean).join(' • '),
  }));

  const handleSelect = (item: DiseaseRecord) => {
    setSelectedSlug(item.slug);
    setForm(mapDiseaseToForm(item));
    setError(null);
    setSuccess(null);
  };

  const handleCreate = () => {
    setSelectedSlug(null);
    setForm(createEmptyDisease());
    setError(null);
    setSuccess(null);
  };

  const toggleSpecies = (species: 'dog' | 'cat') => {
    setForm((current) => ({
      ...current,
      species: current.species.includes(species)
        ? current.species.filter((item) => item !== species)
        : [...current.species, species],
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const saved = await diseaseRepository.upsert({
        id: form.id,
        title: form.title,
        slug: form.slug,
        category: form.category,
        species: form.species,
        synonyms: splitMultiline(form.synonyms),
        tags: splitMultiline(form.tags),
        quickSummary: form.quickSummary.trim(),
        quickDecisionStrip: splitMultiline(form.quickDecisionStrip).slice(0, 5),
        etiology: parseSectionValue(form.etiology),
        epidemiology: parseSectionValue(form.epidemiology),
        pathogenesisTransmission: parseSectionValue(form.pathogenesisTransmission),
        pathophysiology: parseSectionValue(form.pathophysiology),
        clinicalSignsPathophysiology: parseSectionValue(form.clinicalSignsPathophysiology),
        diagnosis: parseSectionValue(form.diagnosis),
        treatment: parseSectionValue(form.treatment),
        prevention: parseSectionValue(form.prevention),
        relatedMedicationSlugs: form.relatedMedicationSlugs,
        relatedConsensusSlugs: form.relatedConsensusSlugs,
        references: form.references,
        isPublished: form.isPublished,
      });

      await load(saved.slug);
      setSuccess(form.isPublished ? 'Doença publicada e salva com sucesso.' : 'Doença salva como rascunho.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Falha ao salvar doença.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1680px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow="Editorial"
        title="Doenças"
        description="Edição estruturada dos blocos rápidos, seções clínicas, referências e relacionamentos, preservando a UI pública e o fallback híbrido do módulo."
        icon={Stethoscope}
        accent="primary"
      />

      <EditorialPermissionGate isLoading={isLoadingAccess} canManage={canManage}>
        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <section className="rounded-[28px] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">Doenças</h2>
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
                Nova
              </button>
            </div>

            <ModuleSearchInput
              value={query}
              onChange={setQuery}
              placeholder="Buscar doença..."
              className="mb-4"
            />

            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Todas' },
                { value: 'published', label: 'Publicadas' },
                { value: 'draft', label: 'Rascunhos' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value as StatusFilter)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    statusFilter === option.value
                      ? 'border-primary/30 bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {isLoadingData ? (
              <div className="py-12 text-center text-sm text-muted-foreground">Carregando doenças...</div>
            ) : (
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                      selectedSlug === item.slug
                        ? 'border-primary/40 bg-primary/5'
                        : 'border-border bg-background hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.category} • {item.species.join('/')} • {item.slug}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
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

          <form onSubmit={handleSave} className="space-y-8 rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
            <section className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {form.id ? 'Editar doença' : 'Nova doença'}
                </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Modelo em 9 blocos clínicos + faixa de decisão rápida (até 5 frases). Diagnóstico: ordene exames por importância; marque padrão ouro com JSON{' '}
              <code className="rounded bg-muted px-1">isGoldStandard: true</code> nos passos.
            </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge isPublished={form.isPublished} />
                <button
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, isPublished: !current.isPublished }))}
                  className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {form.isPublished ? 'Marcar como rascunho' : 'Publicar'}
                </button>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Base</h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <EditorialField label="Título">
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </EditorialField>

                <EditorialField label="Slug" hint="Se vazio, será gerado do título.">
                  <input
                    value={form.slug}
                    onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Categoria">
                  <select
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Selecione</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </EditorialField>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <EditorialField label="Sinônimos" hint="Um por linha.">
                  <textarea
                    value={form.synonyms}
                    onChange={(event) => setForm((current) => ({ ...current, synonyms: event.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Tags" hint="Uma por linha.">
                  <textarea
                    value={form.tags}
                    onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>
              </div>

              <EditorialField label="Espécies">
                <div className="flex flex-wrap gap-3">
                  {(['dog', 'cat'] as Array<'dog' | 'cat'>).map((species) => (
                    <label key={species} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={form.species.includes(species)}
                        onChange={() => toggleSpecies(species)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      {species === 'dog' ? 'Canino' : 'Felino'}
                    </label>
                  ))}
                </div>
              </EditorialField>

              <EditorialField label="Resumo rápido">
                <textarea
                  value={form.quickSummary}
                  onChange={(event) => setForm((current) => ({ ...current, quickSummary: event.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </EditorialField>
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Decisão rápida (horizontal no app)</h3>
              <EditorialField
                label="Até 5 frases curtas"
                hint="Uma frase por linha. Apenas o essencial para triagem — aparecem como cartões horizontais na ficha."
              >
                <textarea
                  value={form.quickDecisionStrip}
                  onChange={(event) => setForm((current) => ({ ...current, quickDecisionStrip: event.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </EditorialField>
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Conteúdo clínico (ordem fixa)</h3>
              <div className="grid gap-4">
                {SECTION_FIELDS.map((field) => (
                  <EditorialField key={field.key} label={field.label} hint={field.hint}>
                    <textarea
                      value={form[field.key] as string}
                      onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                      rows={field.rows || 7}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </EditorialField>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Relacionamentos</h3>
              <div className="grid gap-4 xl:grid-cols-2">
                <RelationshipSelector
                  title="Medicamentos relacionados"
                  searchPlaceholder="Buscar medicamento..."
                  options={medicationOptions}
                  value={form.relatedMedicationSlugs}
                  onChange={(nextValue) => setForm((current) => ({ ...current, relatedMedicationSlugs: nextValue }))}
                />
                <RelationshipSelector
                  title="Consensos relacionados"
                  searchPlaceholder="Buscar consenso..."
                  options={consensoOptions}
                  value={form.relatedConsensusSlugs}
                  onChange={(nextValue) => setForm((current) => ({ ...current, relatedConsensusSlugs: nextValue }))}
                />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">9. Referências</h3>
              <ReferencesEditor
                value={form.references}
                onChange={(nextValue) => setForm((current) => ({ ...current, references: nextValue }))}
              />
            </section>

            {error ? <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}
            {success ? <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">{success}</div> : null}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Salvando...' : form.isPublished ? 'Salvar doença' : 'Salvar rascunho'}
              </button>
            </div>
          </form>
        </div>
      </EditorialPermissionGate>
    </div>
  );
}
