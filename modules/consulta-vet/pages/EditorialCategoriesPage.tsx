import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { EditorialField } from '../components/editorial/EditorialField';
import { EditorialPermissionGate } from '../components/editorial/EditorialPermissionGate';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { StatusBadge } from '../components/shared/StatusBadge';
import { useConsultaVetEditorialAccess } from '../hooks/useConsultaVetEditorialAccess';
import { getCategoryRepository } from '../services/categoryRepository';
import { Category } from '../types/category';
import { normalizeOptionalText } from '../utils/editorialForm';

type StatusFilter = 'all' | 'published' | 'draft';

type CategoryFormState = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  sortOrder: string;
  isPublished: boolean;
};

function createEmptyCategory(): CategoryFormState {
  return {
    slug: '',
    title: '',
    description: '',
    sortOrder: '0',
    isPublished: true,
  };
}

function mapCategoryToForm(category: Category): CategoryFormState {
  return {
    id: category.id,
    slug: category.slug,
    title: category.title,
    description: category.description || '',
    sortOrder: String(category.sortOrder),
    isPublished: category.isPublished ?? true,
  };
}

export function EditorialCategoriesPage() {
  const repository = useMemo(() => getCategoryRepository(), []);
  const { isLoading: isLoadingAccess, canManage } = useConsultaVetEditorialAccess();

  const [items, setItems] = useState<Category[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryFormState>(createEmptyCategory());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const load = async (nextSelectedSlug?: string | null) => {
    setIsLoadingData(true);
    try {
      const data = await repository.list({ includeDrafts: true });
      setItems(data);

      const slugToUse = nextSelectedSlug ?? selectedSlug;
      const selected = slugToUse ? data.find((item) => item.slug === slugToUse) : data[0];
      setSelectedSlug(selected?.slug || null);
      setForm(selected ? mapCategoryToForm(selected) : createEmptyCategory());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar categorias.');
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
      (item.title.toLowerCase().includes(normalized) || item.slug.toLowerCase().includes(normalized))
    );
  });

  const handleSelect = (item: Category) => {
    setSelectedSlug(item.slug);
    setForm(mapCategoryToForm(item));
    setError(null);
    setSuccess(null);
  };

  const handleCreate = () => {
    setSelectedSlug(null);
    setForm(createEmptyCategory());
    setError(null);
    setSuccess(null);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const saved = await repository.upsert({
        id: form.id,
        slug: form.slug,
        title: form.title,
        description: normalizeOptionalText(form.description),
        sortOrder: Number.parseInt(form.sortOrder || '0', 10) || 0,
        isPublished: form.isPublished,
      });

      await load(saved.slug);
      setSuccess(form.isPublished ? 'Categoria publicada e salva com sucesso.' : 'Categoria salva como rascunho.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Falha ao salvar categoria.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1620px] space-y-8 p-4 md:p-8">
      <header className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Editorial de categorias</h1>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
              Taxonomia do módulo com status claro, fallback híbrido preservado e edição segura apenas para owner.
            </p>
          </div>
        </div>
      </header>

      <EditorialPermissionGate isLoading={isLoadingAccess} canManage={canManage}>
        <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
          <section className="rounded-[28px] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-foreground">Categorias</h2>
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
              placeholder="Buscar categoria..."
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
              <div className="py-12 text-center text-sm text-muted-foreground">Carregando categorias...</div>
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
                          {item.slug} • ordem {item.sortOrder}
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
                  {form.id ? 'Editar categoria' : 'Nova categoria'}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Conteúdo publicado aparece no módulo público. Rascunhos ficam apenas no editorial.
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

            <div className="grid gap-4 md:grid-cols-2">
              <EditorialField label="Título">
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </EditorialField>

              <EditorialField label="Slug" hint="Se vazio, o repository gera a partir do título.">
                <input
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </EditorialField>
            </div>

            <div className="grid gap-4 md:grid-cols-[200px_1fr]">
              <EditorialField label="Ordem">
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </EditorialField>

              <EditorialField label="Descrição curta">
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </EditorialField>
            </div>

            {error ? <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div> : null}
            {success ? <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">{success}</div> : null}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Salvando...' : form.isPublished ? 'Salvar categoria' : 'Salvar rascunho'}
              </button>
            </div>
          </form>
        </div>
      </EditorialPermissionGate>
    </div>
  );
}
