import React from 'react';
import { Plus, Star, Trash2, UserCheck } from 'lucide-react';
import { DocumentTemplate } from '../../types/receituario';

interface MeusModelosTabProps {
  customTemplates: DocumentTemplate[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onDeleteTemplate: (id: string) => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
  onCreateNewModel: () => void;
}

export function MeusModelosTab({
  customTemplates,
  favorites,
  onToggleFavorite,
  onDeleteTemplate,
  onSelectTemplate,
  onCreateNewModel,
}: MeusModelosTabProps) {
  return (
    <div className="space-y-6">
      {/* Header with New Model Button */}
      <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Meus Modelos Pessoais</h2>
            <p className="text-xs text-muted-foreground">
              Seus modelos salvos e modificados para uso frequente.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCreateNewModel}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          <span>Criar do zero</span>
        </button>
      </div>

      {/* Models Grid */}
      {customTemplates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <UserCheck className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
          <p className="text-sm font-medium text-foreground">Nenhum modelo pessoal cadastrado.</p>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Você pode salvar qualquer receita ou termo modificado no editor clicando em &quot;Salvar modelo próprio&quot;.
          </p>
          <button
            type="button"
            onClick={onCreateNewModel}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4" />
            <span>Criar primeiro modelo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {customTemplates.map((template) => {
            const isFav = favorites.includes(template.id);
            return (
              <div
                key={template.id}
                className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {template.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(template.id)}
                        className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-amber-400 transition-colors shrink-0"
                      >
                        <Star className={`h-4 w-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteTemplate(template.id)}
                        className="p-1 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors shrink-0"
                        title="Excluir modelo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
                    onClick={() => onSelectTemplate(template)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <span>Usar modelo</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
