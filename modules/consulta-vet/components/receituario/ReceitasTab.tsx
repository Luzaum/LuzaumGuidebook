import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, LayoutGrid, ListChecks, LockKeyhole, Pill, Search, Star, Stethoscope, Trash2, X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { RECEITUARIO_CATEGORIES } from '../../data/receituarioSeed';
import { getMedicationRepository } from '../../services/medicationRepository';
import { DocumentTemplate, ReceituarioSpecies } from '../../types/receituario';
import { getEntityCategoryTheme } from '../shared/EntityCard';

interface ReceitasTabProps {
  templates: DocumentTemplate[];
  favorites: string[];
  recents: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
  onDeleteTemplates: (ids: string[]) => Promise<void>;
}

type MedicationLink = { name: string; slug?: string };

const CATEGORY_LABELS: Record<string, { icon: string; theme: string }> = {
  Gastroenterologia: { icon: '🩺', theme: 'gastroenterologia' },
  'Nefrologia e urologia': { icon: '🧪', theme: 'nefrologia-urologia' },
  Endocrinologia: { icon: '🧬', theme: 'endocrinologia' },
  Cardiologia: { icon: '❤️', theme: 'cardiologia' },
  Respiratório: { icon: '🫁', theme: 'respiratorio' },
  Neurologia: { icon: '🧠', theme: 'neurologia' },
  Dermatologia: { icon: '🐾', theme: 'dermatologia' },
  Infectologia: { icon: '🦠', theme: 'infectologia' },
  Emergência: { icon: '⚕️', theme: 'default' },
};

function categoryInfo(category: string) {
  return CATEGORY_LABELS[category] || { icon: '📁', theme: 'default' };
}

function medicationLookupKey(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function medicationSummary(template: DocumentTemplate, medicationSlugs: Record<string, string>): MedicationLink[] {
  const medications = template.structured_defaults?.clinical_model?.options.flatMap((option) => option.medications || []) || [];
  const seen = new Set<string>();
  return medications.flatMap((medication) => {
    const name = medication.name.trim();
    if (!name || seen.has(name)) return [];
    seen.add(name);
    const slug = medication.canonicalMedicationId
      ? medicationSlugs[`id:${medication.canonicalMedicationId}`]
      : medicationSlugs[`name:${medicationLookupKey(medication.canonicalLookupName || name)}`];
    return [{ name, slug }];
  });
}

export function ReceitasTab({ templates, favorites, onToggleFavorite, onSelectTemplate, onDeleteTemplates }: ReceitasTabProps) {
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<ReceituarioSpecies | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [medicationSlugs, setMedicationSlugs] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const recipesOnly = useMemo(() => templates.filter((template) => template.document_type === 'recipe'), [templates]);

  useEffect(() => {
    let active = true;
    void getMedicationRepository().list().then((medications) => {
      if (!active) return;
      setMedicationSlugs(Object.fromEntries(medications.flatMap((medication) => [
        [`id:${medication.id}`, medication.slug],
        [`name:${medicationLookupKey(medication.title)}`, medication.slug],
        [`name:${medicationLookupKey(medication.activeIngredient)}`, medication.slug],
      ])));
    }).catch(() => {
      if (active) setMedicationSlugs({});
    });
    return () => { active = false; };
  }, []);

  const recipesMatchingFilters = useMemo(() => recipesOnly.filter((template) => {
    if (selectedSpecies !== 'all' && template.species !== 'ambos' && template.species !== selectedSpecies) return false;
    if (showOnlyFavorites && !favorites.includes(template.id)) return false;
    if (!search.trim()) return true;
    const query = search.trim().toLowerCase();
    const medications = medicationSummary(template, medicationSlugs).map((item) => item.name).join(' ').toLowerCase();
    return template.title.toLowerCase().includes(query)
      || template.category.toLowerCase().includes(query)
      || template.body_plain_text.toLowerCase().includes(query)
      || medications.includes(query);
  }), [favorites, medicationSlugs, recipesOnly, search, selectedSpecies, showOnlyFavorites]);

  const filteredRecipes = useMemo(() => selectedCategory === 'all'
    ? recipesMatchingFilters
    : recipesMatchingFilters.filter((template) => template.category === selectedCategory), [recipesMatchingFilters, selectedCategory]);

  const categories = useMemo(() => {
    const counts = recipesMatchingFilters.reduce<Record<string, number>>((result, template) => {
      result[template.category] = (result[template.category] || 0) + 1;
      return result;
    }, {});
    return Object.keys(counts)
      .sort((first, second) => RECEITUARIO_CATEGORIES.indexOf(first as typeof RECEITUARIO_CATEGORIES[number]) - RECEITUARIO_CATEGORIES.indexOf(second as typeof RECEITUARIO_CATEGORIES[number]))
      .map((category) => ({ category, count: counts[category] }));
  }, [recipesMatchingFilters]);

  const favoriteRecipeCount = recipesOnly.filter((template) => favorites.includes(template.id)).length;
  const personalRecipeCount = recipesOnly.filter((template) => !template.is_global).length;
  const visiblePersonalIds = filteredRecipes.filter((template) => !template.is_global).map((template) => template.id);

  useEffect(() => {
    const availableIds = new Set(recipesOnly.filter((template) => !template.is_global).map((template) => template.id));
    setSelectedIds((current) => current.filter((id) => availableIds.has(id)));
  }, [recipesOnly]);

  const closeEditing = () => {
    setEditing(false);
    setSelectedIds([]);
    setConfirmDeleteOpen(false);
    setDeleteError('');
  };

  const toggleSelected = (templateId: string) => {
    setSelectedIds((current) => current.includes(templateId)
      ? current.filter((id) => id !== templateId)
      : [...current, templateId]);
  };

  const toggleAllVisible = () => {
    const allVisibleSelected = visiblePersonalIds.length > 0 && visiblePersonalIds.every((id) => selectedIds.includes(id));
    setSelectedIds((current) => allVisibleSelected
      ? current.filter((id) => !visiblePersonalIds.includes(id))
      : Array.from(new Set([...current, ...visiblePersonalIds])));
  };

  const confirmBulkDelete = async () => {
    if (!selectedIds.length) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await onDeleteTemplates(selectedIds);
      closeEditing();
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Não foi possível excluir os modelos selecionados.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm backdrop-blur-md lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Doença, condição ou medicamento..."
            className="w-full rounded-xl border border-border/80 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex min-h-11 items-center rounded-xl border border-border/80 bg-muted/50 p-1">
          {([
            { value: 'all', label: 'Todos' },
            { value: 'cão', label: '🐶 Cão' },
            { value: 'gato', label: '🐱 Gato' },
          ] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedSpecies(option.value)}
              className={`min-h-9 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${selectedSpecies === option.value ? 'bg-background font-semibold text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowOnlyFavorites((current) => !current)}
          className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${showOnlyFavorites ? 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200' : 'border-border/80 bg-background text-muted-foreground hover:bg-muted'}`}
        >
          <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-current' : ''}`} /> Favoritos ({favoriteRecipeCount})
        </button>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <aside className="w-full shrink-0 rounded-2xl border border-border/80 bg-background/50 p-5 backdrop-blur-xs xl:w-72">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Especialidades</h2>
            <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{categories.length} ativas</span>
          </div>
          <nav className="flex flex-row flex-wrap gap-2 xl:flex-col xl:gap-1.5" aria-label="Filtrar receitas por especialidade">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={cn('flex items-center gap-3 rounded-xl border border-border/60 px-4 py-3 text-left text-sm font-semibold transition-all duration-200 xl:w-full', selectedCategory === 'all' ? 'border-primary bg-primary/[0.06] text-primary shadow-xs' : 'bg-card/50 text-foreground/80 hover:border-border-hover hover:bg-card')}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="flex-1">Todas</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{recipesMatchingFilters.length}</span>
            </button>
            {categories.map(({ category, count }) => {
              const visual = categoryInfo(category);
              const theme = getEntityCategoryTheme(visual.theme);
              const selected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn('flex items-center gap-3 rounded-xl border border-border/60 px-4 py-3 text-left text-sm font-semibold transition-all duration-200 xl:w-full', selected ? cn(theme.badge, 'shadow-xs') : 'bg-card/50 text-foreground/80 hover:border-border-hover hover:bg-card')}
                >
                  <span aria-hidden="true">{visual.icon}</span>
                  <span className="flex-1 truncate">{category}</span>
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold', selected ? 'bg-background/80 text-foreground' : 'bg-muted text-muted-foreground')}>{count}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground"><Stethoscope className="h-4 w-4" />Modelos de receita</h2>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-foreground">{filteredRecipes.length} {filteredRecipes.length === 1 ? 'receita' : 'receitas'}</span>
              <button
                type="button"
                onClick={() => editing ? closeEditing() : setEditing(true)}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                title={personalRecipeCount ? 'Selecionar modelos próprios para excluir' : 'Ver quais modelos podem ser excluídos'}
              >
                {editing ? <X className="h-4 w-4" /> : <ListChecks className="h-4 w-4" />}
                {editing ? 'Sair da edição' : 'Editar modelos'}
              </button>
            </div>
          </div>
          {editing ? (
            <section className="sticky top-2 z-20 mb-4 flex flex-col gap-3 rounded-2xl border border-sky-300 bg-sky-50/95 p-3 shadow-lg backdrop-blur dark:border-sky-900 dark:bg-sky-950/95 sm:flex-row sm:items-center sm:justify-between" aria-label="Ações dos modelos selecionados">
              <div>
                <p className="text-sm font-bold text-sky-950 dark:text-sky-100">{selectedIds.length} {selectedIds.length === 1 ? 'modelo selecionado' : 'modelos selecionados'}</p>
                <p className="text-xs text-sky-800 dark:text-sky-300">Somente modelos próprios podem ser excluídos. Modelos globais ficam protegidos.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <button type="button" onClick={toggleAllVisible} disabled={!visiblePersonalIds.length} className="min-h-11 rounded-xl border border-sky-300 bg-background px-3 text-xs font-semibold disabled:opacity-50">
                  {visiblePersonalIds.length > 0 && visiblePersonalIds.every((id) => selectedIds.includes(id)) ? 'Desmarcar visíveis' : 'Selecionar visíveis'}
                </button>
                <button type="button" onClick={() => setConfirmDeleteOpen(true)} disabled={!selectedIds.length} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-3 text-xs font-bold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-45">
                  <Trash2 className="h-4 w-4" />Excluir ({selectedIds.length})
                </button>
              </div>
            </section>
          ) : null}
          {filteredRecipes.length ? (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredRecipes.map((template) => (
                <RecipeCard
                  key={template.id}
                  template={template}
                  isFavorite={favorites.includes(template.id)}
                  medicationSlugs={medicationSlugs}
                  onToggleFavorite={onToggleFavorite}
                  onOpen={onSelectTemplate}
                  editing={editing}
                  selected={selectedIds.includes(template.id)}
                  onToggleSelected={toggleSelected}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card py-20 text-center text-sm font-medium text-muted-foreground">Nenhuma receita encontrada com os filtros atuais.</div>
          )}
        </main>
      </div>

      {confirmDeleteOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-recipes-title">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-5 shadow-2xl sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"><Trash2 className="h-5 w-5" /></span>
              <div><h3 id="delete-recipes-title" className="text-base font-bold">Excluir {selectedIds.length} {selectedIds.length === 1 ? 'modelo' : 'modelos'}?</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">Essa ação remove os modelos próprios selecionados, seus favoritos e rascunhos vinculados. Receitas já emitidas permanecem preservadas.</p></div>
            </div>
            {deleteError ? <p className="mt-4 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">{deleteError}</p> : null}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => { setConfirmDeleteOpen(false); setDeleteError(''); }} disabled={deleting} className="min-h-11 rounded-xl border border-border px-4 text-sm font-semibold">Cancelar</button>
              <button type="button" onClick={() => void confirmBulkDelete()} disabled={deleting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-50"><Trash2 className="h-4 w-4" />{deleting ? 'Excluindo…' : 'Excluir'}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RecipeCard({
  template,
  isFavorite,
  medicationSlugs,
  onToggleFavorite,
  onOpen,
  editing,
  selected,
  onToggleSelected,
}: {
  template: DocumentTemplate;
  isFavorite: boolean;
  medicationSlugs: Record<string, string>;
  onToggleFavorite: (id: string) => void;
  onOpen: (template: DocumentTemplate) => void;
  editing: boolean;
  selected: boolean;
  onToggleSelected: (id: string) => void;
}) {
  const visual = categoryInfo(template.category);
  const theme = getEntityCategoryTheme(visual.theme);
  const medications = medicationSummary(template, medicationSlugs);

  return (
    <article className={cn('group relative flex h-full flex-col rounded-2xl border bg-card p-5 transition-all duration-200', selected ? 'border-sky-500 ring-2 ring-sky-500/25' : 'border-border/80', !editing && theme.borderHover, !editing && theme.glow)} style={{ background: `linear-gradient(135deg, var(--card) 0%, ${theme.glowBg || 'var(--card)'} 100%)` }}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{template.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className={cn('inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide', theme.badge)}>{visual.icon} {template.category}</span>
            <span className="inline-flex items-center rounded-lg border border-border/50 bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground/80">{template.species === 'ambos' ? 'Cão e gato' : template.species}</span>
          </div>
        </div>
        {editing ? template.is_global ? (
          <span className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg border border-border/60 bg-muted/50 px-2 text-[10px] font-semibold text-muted-foreground" title="Modelos globais são protegidos"><LockKeyhole className="h-3.5 w-3.5" />Protegido</span>
        ) : (
          <button type="button" onClick={() => onToggleSelected(template.id)} aria-pressed={selected} className={cn('flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600', selected ? 'border-sky-600 bg-sky-600 text-white' : 'border-border bg-background text-muted-foreground hover:border-sky-500 hover:text-sky-700')} aria-label={selected ? `Desmarcar ${template.title}` : `Selecionar ${template.title}`}>
            {selected ? <Check className="h-5 w-5" /> : <span className="h-4 w-4 rounded border-2 border-current" />}
          </button>
        ) : (
          <button type="button" onClick={() => onToggleFavorite(template.id)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:bg-background hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'} aria-label={isFavorite ? `Remover ${template.title} dos favoritos` : `Favoritar ${template.title}`}>
            <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        )}
      </div>

      {medications.length ? (
        <div className="mb-4">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground"><Pill className="h-3.5 w-3.5" />Medicamentos do modelo</p>
          <div className="flex flex-wrap gap-1.5">
            {medications.slice(0, 4).map((medication) => medication.slug ? (
              <Link key={medication.name} to={`/consulta-vet/medicamentos/${medication.slug}`} className="relative z-10 rounded-md border border-border/60 bg-muted/35 px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10 hover:underline">{medication.name}</Link>
            ) : (
              <span key={medication.name} className="rounded-md border border-border/50 bg-muted/30 px-2 py-1 text-[11px] font-medium text-muted-foreground">{medication.name}</span>
            ))}
            {medications.length > 4 ? <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">+{medications.length - 4}</span> : null}
          </div>
        </div>
      ) : <p className="mb-4 text-sm leading-relaxed text-muted-foreground">Abra o modelo para revisar e incluir os medicamentos necessários.</p>}

      <div className={cn('mt-auto flex items-center justify-between border-t pt-3.5', theme.line)}>
        <span className="text-[11px] font-medium text-muted-foreground/75">{editing ? template.is_global ? 'Modelo global protegido' : selected ? 'Selecionado para exclusão' : 'Modelo próprio' : 'Revise antes de emitir'}</span>
        {editing ? !template.is_global ? <button type="button" onClick={() => onToggleSelected(template.id)} className="relative z-10 min-h-11 rounded-lg px-2 text-xs font-bold uppercase tracking-wider text-sky-700 transition-colors hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:text-sky-300 dark:hover:bg-sky-950">{selected ? 'Desmarcar' : 'Selecionar'}</button> : null : <button type="button" onClick={() => onOpen(template)} className="relative z-10 min-h-11 rounded-lg px-2 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Usar modelo</button>}
      </div>
    </article>
  );
}
