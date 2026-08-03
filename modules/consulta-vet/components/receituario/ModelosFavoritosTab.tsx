import React from 'react';
import { Star } from 'lucide-react';
import type { DocumentTemplate } from '../../types/receituario';

interface Props {
  templates: DocumentTemplate[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
}

export function ModelosFavoritosTab({ templates, favorites, onToggleFavorite, onSelectTemplate }: Props) {
  const favoriteTemplates = templates.filter((template) => favorites.includes(template.id));

  if (!favoriteTemplates.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-12 text-center">
        <Star className="mx-auto h-9 w-9 text-amber-400" />
        <h2 className="mt-3 text-base font-semibold">Nenhum modelo favorito</h2>
        <p className="mt-1 text-sm text-muted-foreground">Use a estrela dos modelos para reuni-los nesta aba.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold"><Star className="h-5 w-5 fill-amber-400 text-amber-400" />Meus modelos favoritos</h2>
        <p className="mt-1 text-sm text-muted-foreground">Receitas e modelos próprios que você marcou para acesso rápido.</p>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteTemplates.map((template) => (
          <article key={template.id} className="flex min-h-40 flex-col justify-between rounded-xl border border-border/70 bg-card p-4 transition hover:border-primary/40 hover:shadow-md">
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="line-clamp-2 text-sm font-semibold">{template.title}</h3>
                <button type="button" onClick={() => onToggleFavorite(template.id)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-amber-400 hover:bg-muted" aria-label={`Remover ${template.title} dos favoritos`}><Star className="h-4 w-4 fill-current" /></button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]"><span className="rounded-md bg-muted px-2 py-1 text-muted-foreground">{template.category}</span><span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-700">{template.species === 'ambos' ? 'Cão e gato' : template.species}</span></div>
            </div>
            <button type="button" onClick={() => onSelectTemplate(template)} className="mt-4 min-h-10 self-end rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground">Usar modelo</button>
          </article>
        ))}
      </div>
    </div>
  );
}
