import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { EditorialField } from '../components/editorial/EditorialField';
import { EditorialPermissionGate } from '../components/editorial/EditorialPermissionGate';
import { MedicationDoseEditor } from '../components/editorial/MedicationDoseEditor';
import { MedicationPresentationEditor } from '../components/editorial/MedicationPresentationEditor';
import { ReferencesEditor } from '../components/editorial/ReferencesEditor';
import { RelationshipSelector } from '../components/editorial/RelationshipSelector';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useConsultaVetEditorialAccess } from '../hooks/useConsultaVetEditorialAccess';
import { getCategoryRepository } from '../services/categoryRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { Category } from '../types/category';
import { EditorialReference } from '../types/common';
import { DiseaseRecord } from '../types/disease';
import { MedicationDose, MedicationPresentation, MedicationRecord } from '../types/medication';
import { validateMedicationDoses, validateMedicationPresentations } from '../utils/medicationRules';
import { editorTextToHtml, formatMultiline, htmlToEditorText, splitMultiline } from '../utils/editorialForm';

type StatusFilter = 'all' | 'published' | 'draft';

type MedicationFormState = {
  id?: string;
  title: string;
  slug: string;
  activeIngredient: string;
  pharmacologicClass: string;
  category: string;
  species: Array<'dog' | 'cat'>;
  tradeNames: string;
  tags: string;
  mechanismOfAction: string;
  indications: string;
  contraindications: string;
  cautions: string;
  adverseEffects: string;
  interactions: string;
  routes: string;
  doses: MedicationDose[];
  presentations: MedicationPresentation[];
  clinicalNotesText: string;
  adminNotesText: string;
  relatedDiseaseSlugs: string[];
  references: EditorialReference[];
  isPublished: boolean;
};

function createEmptyMedication(): MedicationFormState {
  return {
    title: '',
    slug: '',
    activeIngredient: '',
    pharmacologicClass: '',
    category: '',
    species: ['dog'],
    tradeNames: '',
    tags: '',
    mechanismOfAction: '',
    indications: '',
    contraindications: '',
    cautions: '',
    adverseEffects: '',
    interactions: '',
    routes: '',
    doses: [],
    presentations: [],
    clinicalNotesText: '',
    adminNotesText: '',
    relatedDiseaseSlugs: [],
    references: [],
    isPublished: true,
  };
}

function mapMedicationToForm(record: MedicationRecord): MedicationFormState {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    activeIngredient: record.activeIngredient,
    pharmacologicClass: record.pharmacologicClass,
    category: record.category,
    species: record.species,
    tradeNames: formatMultiline(record.tradeNames),
    tags: formatMultiline(record.tags),
    mechanismOfAction: record.mechanismOfAction,
    indications: formatMultiline(record.indications),
    contraindications: formatMultiline(record.contraindications),
    cautions: formatMultiline(record.cautions),
    adverseEffects: formatMultiline(record.adverseEffects),
    interactions: formatMultiline(record.interactions),
    routes: formatMultiline(record.routes),
    doses: record.doses || [],
    presentations: record.presentations || [],
    clinicalNotesText: htmlToEditorText(record.clinicalNotesRichText),
    adminNotesText: record.adminNotesText || '',
    relatedDiseaseSlugs: record.relatedDiseaseSlugs || [],
    references: record.references || [],
    isPublished: record.isPublished ?? true,
  };
}

export function EditorialMedicationsPage() {
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const categoryRepository = useMemo(() => getCategoryRepository(), []);
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const { isLoading: isLoadingAccess, canManage } = useConsultaVetEditorialAccess();

  const [items, setItems] = useState<MedicationRecord[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<MedicationFormState>(createEmptyMedication());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = async (nextSelectedSlug?: string | null) => {
    setIsLoadingData(true);
    try {
      const [medicationData, categoryData, diseaseData] = await Promise.all([
        medicationRepository.list({ includeDrafts: true }),
        categoryRepository.list({ includeDrafts: true }),
        diseaseRepository.list({ includeDrafts: true }),
      ]);

      setItems(medicationData);
      setCategories(categoryData);
      setDiseases(diseaseData);

      const slugToUse = nextSelectedSlug ?? selectedSlug;
      const selected = slugToUse ? medicationData.find((item) => item.slug === slugToUse) : medicationData[0];
      setSelectedSlug(selected?.slug || null);
      setForm(selected ? mapMedicationToForm(selected) : createEmptyMedication());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar medicamentos.');
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
        item.activeIngredient.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalized)))
    );
  });

  const diseaseOptions = diseases.map((item) => ({
    slug: item.slug,
    label: item.title,
    meta: `${item.category} • ${item.species.join('/')}`,
  }));

  const handleSelect = (item: MedicationRecord) => {
    setSelectedSlug(item.slug);
    setForm(mapMedicationToForm(item));
    setError(null);
    setSuccess(null);
  };

  const handleCreate = () => {
    setSelectedSlug(null);
    setForm(createEmptyMedication());
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
      const medicationSpecies = form.species.length ? form.species : ['dog'];
      const doseErrors = validateMedicationDoses(form.doses, medicationSpecies);
      const presentationErrors = validateMedicationPresentations(form.presentations);

      if (!form.species.length) {
        throw new Error('Selecione ao menos uma espécie para o medicamento.');
      }
      if (doseErrors.length > 0 || presentationErrors.length > 0) {
        throw new Error([...doseErrors, ...presentationErrors].join('\n'));
      }

      const saved = await medicationRepository.upsert({
        id: form.id,
        title: form.title,
        slug: form.slug,
        activeIngredient: form.activeIngredient,
        pharmacologicClass: form.pharmacologicClass,
        category: form.category,
        species: medicationSpecies,
        tradeNames: splitMultiline(form.tradeNames),
        tags: splitMultiline(form.tags),
        mechanismOfAction: form.mechanismOfAction.trim(),
        indications: splitMultiline(form.indications),
        contraindications: splitMultiline(form.contraindications),
        cautions: splitMultiline(form.cautions),
        adverseEffects: splitMultiline(form.adverseEffects),
        interactions: splitMultiline(form.interactions),
        routes: splitMultiline(form.routes),
        doses: form.doses,
        presentations: form.presentations,
        clinicalNotesRichText: editorTextToHtml(form.clinicalNotesText),
        adminNotesText: form.adminNotesText.trim(),
        relatedDiseaseSlugs: form.relatedDiseaseSlugs,
        references: form.references,
        isPublished: form.isPublished,
      });

      await load(saved.slug);
      setSuccess(form.isPublished ? 'Medicamento publicado e salvo com sucesso.' : 'Medicamento salvo como rascunho.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Falha ao salvar medicamento.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1680px] space-y-8 p-4 md:p-8">
      <header className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Editorial de medicamentos</h1>
        <p className="mt-2 max-w-4xl text-sm text-muted-foreground">
          Formulário estruturado para farmacologia, doses, apresentações, referências e vínculos clínicos sem depender de JSON cru no dia a dia.
        </p>
      </header>

      <EditorialPermissionGate isLoading={isLoadingAccess} canManage={canManage}>
        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <section className="rounded-[28px] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">Medicamentos</h2>
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
              placeholder="Buscar medicamento..."
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
              <div className="py-12 text-center text-sm text-muted-foreground">Carregando medicamentos...</div>
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
                          {item.activeIngredient} • {item.pharmacologicClass}
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
                  {form.id ? 'Editar medicamento' : 'Novo medicamento'}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  As doses e apresentações alimentam a calculadora pública. Mantenha os campos clínicos e farmacológicos consistentes.
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
                <EditorialField label="Princípio ativo">
                  <input
                    value={form.activeIngredient}
                    onChange={(event) => setForm((current) => ({ ...current, activeIngredient: event.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </EditorialField>

                <EditorialField label="Classe farmacológica">
                  <input
                    value={form.pharmacologicClass}
                    onChange={(event) => setForm((current) => ({ ...current, pharmacologicClass: event.target.value }))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </EditorialField>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <EditorialField label="Nomes comerciais" hint="Um por linha.">
                  <textarea
                    value={form.tradeNames}
                    onChange={(event) => setForm((current) => ({ ...current, tradeNames: event.target.value }))}
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
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Conteúdo farmacológico</h3>
              <EditorialField label="Mecanismo de ação">
                <textarea
                  value={form.mechanismOfAction}
                  onChange={(event) => setForm((current) => ({ ...current, mechanismOfAction: event.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </EditorialField>

              <div className="grid gap-4 md:grid-cols-2">
                <EditorialField label="Indicações" hint="Uma por linha.">
                  <textarea
                    value={form.indications}
                    onChange={(event) => setForm((current) => ({ ...current, indications: event.target.value }))}
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Contraindicações" hint="Uma por linha.">
                  <textarea
                    value={form.contraindications}
                    onChange={(event) => setForm((current) => ({ ...current, contraindications: event.target.value }))}
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Cautelas" hint="Uma por linha.">
                  <textarea
                    value={form.cautions}
                    onChange={(event) => setForm((current) => ({ ...current, cautions: event.target.value }))}
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Efeitos adversos" hint="Uma por linha.">
                  <textarea
                    value={form.adverseEffects}
                    onChange={(event) => setForm((current) => ({ ...current, adverseEffects: event.target.value }))}
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Interações" hint="Uma por linha.">
                  <textarea
                    value={form.interactions}
                    onChange={(event) => setForm((current) => ({ ...current, interactions: event.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Vias" hint="Uma por linha.">
                  <textarea
                    value={form.routes}
                    onChange={(event) => setForm((current) => ({ ...current, routes: event.target.value }))}
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Doses</h3>
              <p className="text-sm text-muted-foreground">
                Cada dose deve representar um único protocolo/regime. Separe por espécie quando necessário e não misture dose única com manutenção.
              </p>
              <MedicationDoseEditor
                value={form.doses}
                onChange={(nextValue) => setForm((current) => ({ ...current, doses: nextValue }))}
                presentationOptions={form.presentations.map((p) => ({
                  id: p.id,
                  label: p.label || p.id,
                }))}
              />
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Apresentações</h3>
              <p className="text-sm text-muted-foreground">
                Cadastre apresentações calculáveis em entradas individuais para melhorar cálculo, seleção e leitura pública.
              </p>
              <MedicationPresentationEditor
                value={form.presentations}
                onChange={(nextValue) => setForm((current) => ({ ...current, presentations: nextValue }))}
              />
            </section>

            <section className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Notas e referências</h3>
              <div className="grid gap-4 xl:grid-cols-2">
                <EditorialField label="Observações clínicas" hint="Texto simples; o front converte para HTML leve.">
                  <textarea
                    value={form.clinicalNotesText}
                    onChange={(event) => setForm((current) => ({ ...current, clinicalNotesText: event.target.value }))}
                    rows={10}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>

                <EditorialField label="Notas do administrador" hint="Visível apenas em fluxo editorial e manutenção.">
                  <textarea
                    value={form.adminNotesText}
                    onChange={(event) => setForm((current) => ({ ...current, adminNotesText: event.target.value }))}
                    rows={10}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </EditorialField>
              </div>

              <RelationshipSelector
                title="Doenças relacionadas"
                searchPlaceholder="Buscar doença..."
                options={diseaseOptions}
                value={form.relatedDiseaseSlugs}
                onChange={(nextValue) => setForm((current) => ({ ...current, relatedDiseaseSlugs: nextValue }))}
              />

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
                {isSaving ? 'Salvando...' : form.isPublished ? 'Salvar medicamento' : 'Salvar rascunho'}
              </button>
            </div>
          </form>
        </div>
      </EditorialPermissionGate>
    </div>
  );
}
