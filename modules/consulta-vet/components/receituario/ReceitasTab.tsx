import React, { useMemo, useState } from 'react';
import { Clock, Search, Star, Stethoscope } from 'lucide-react';
import { RECEITUARIO_CATEGORIES } from '../../data/receituarioSeed';
import { DocumentTemplate, ReceituarioSpecies } from '../../types/receituario';

interface ReceitasTabProps {
  templates: DocumentTemplate[];
  favorites: string[];
  recents: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
}

export function ReceitasTab({
  templates,
  favorites,
  recents,
  onToggleFavorite,
  onSelectTemplate,
}: ReceitasTabProps) {
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<ReceituarioSpecies | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const recipesOnly = useMemo(() => {
    return templates.filter((t) => t.document_type === 'recipe');
  }, [templates]);

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    return recipesOnly.filter((t) => {
      // Species match
      if (selectedSpecies !== 'all' && t.species !== 'ambos' && t.species !== selectedSpecies) {
        return false;
      }

      // Category match
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }

      // Favorites match
      if (showOnlyFavorites && !favorites.includes(t.id)) {
        return false;
      }

      // Search term
      if (search.trim()) {
        const query = search.toLowerCase();
        const inTitle = t.title.toLowerCase().includes(query);
        const inCategory = t.category.toLowerCase().includes(query);
        const inBody = t.body_plain_text.toLowerCase().includes(query);
        return inTitle || inCategory || inBody;
      }

      return true;
    });
  }, [recipesOnly, selectedSpecies, selectedCategory, showOnlyFavorites, search, favorites]);

  // Favorite recipes list
  const favoriteRecipes = useMemo(() => {
    return recipesOnly.filter((t) => favorites.includes(t.id));
  }, [recipesOnly, favorites]);

  // Recent recipes list
  const recentRecipes = useMemo(() => {
    return recents
      .map((id) => recipesOnly.find((t) => t.id === id))
      .filter((t): t is DocumentTemplate => Boolean(t));
  }, [recipesOnly, recents]);

  const handleOpenRecipe = (template: DocumentTemplate) => {
    onSelectTemplate(template);
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Doença, condição ou medicamento..."
              className="w-full rounded-xl border border-border/80 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Species Filter Toggle */}
          <div className="flex min-h-11 items-center rounded-xl border border-border/80 bg-muted/50 p-1 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedSpecies('all')}
              className={`min-h-9 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedSpecies === 'all'
                  ? 'bg-background text-foreground shadow-sm font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setSelectedSpecies('cão')}
              className={`min-h-9 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedSpecies === 'cão'
                  ? 'bg-background text-foreground shadow-sm font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🐶 Cão
            </button>
            <button
              type="button"
              onClick={() => setSelectedSpecies('gato')}
              className={`min-h-9 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedSpecies === 'gato'
                  ? 'bg-background text-foreground shadow-sm font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🐱 Gato
            </button>
          </div>

          <label className="relative shrink-0">
            <span className="sr-only">Filtrar por categoria</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-11 min-w-48 rounded-xl border border-border/80 bg-background px-3 pr-9 text-xs font-medium text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Filtrar receitas por categoria"
            >
              <option value="all">Todas as categorias</option>
              {RECEITUARIO_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          {/* Favorites Only Toggle */}
          <button
            type="button"
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            className={`inline-flex min-h-11 items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-colors shrink-0 ${
              showOnlyFavorites
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-500'
                : 'border-border/80 bg-background text-muted-foreground hover:bg-muted'
            }`}
          >
            <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-amber-500' : ''}`} />
            <span>Favoritos ({favorites.length})</span>
          </button>
        </div>

      </div>

      {/* Favorites Showcase (if any) */}
      {!search && selectedCategory === 'all' && !showOnlyFavorites && favoriteRecipes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>Receitas Favoritas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteRecipes.slice(0, 6).map((item) => (
              <RecipeCard
                key={item.id}
                template={item}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onOpen={handleOpenRecipe}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recents Showcase (if any) */}
      {!search && selectedCategory === 'all' && !showOnlyFavorites && recentRecipes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4 text-sky-400" />
            <span>Usados Recentemente</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentRecipes.slice(0, 3).map((item) => (
              <RecipeCard
                key={`recent-${item.id}`}
                template={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={onToggleFavorite}
                onOpen={handleOpenRecipe}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main List of Recipes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-emerald-500" />
            <span>Modelos de Receita ({filteredRecipes.length})</span>
          </h2>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            <Stethoscope className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
            <p className="text-sm">Nenhuma receita encontrada para os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredRecipes.map((item) => (
              <RecipeCard
                key={item.id}
                template={item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={onToggleFavorite}
                onOpen={handleOpenRecipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Clean Minimal Recipe Card (showing title, category, species, use button, favorite button)
function RecipeCard({
  template,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: {
  template: DocumentTemplate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (template: DocumentTemplate) => void;
}) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {template.title}
          </h3>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(template.id);
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
            aria-label={isFavorite ? `Remover ${template.title} dos favoritos` : `Favoritar ${template.title}`}
          >
            <Star className={`h-4 w-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {template.category}
          </span>
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 capitalize">
            {template.species === 'ambos' ? 'Cão e Gato' : template.species}
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-border/50 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onOpen(template)}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span>Usar modelo</span>
        </button>
      </div>
    </div>
  );
}
