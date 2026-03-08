import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Share2, SquarePen, LoaderCircle, Save, X } from 'lucide-react';
import { supabase } from '@/src/lib/supabaseClient';
import { ConsensusDocumentDetails, ConsensusRecord } from '../types/consenso';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { PdfViewerShell } from '../components/consensus/PdfViewerShell';
import { useRecents } from '../hooks/useRecents';
import { getConsensoRepository } from '../services/consensoRepository';

function formatSpecies(species: ConsensusRecord['species']): string {
  if (species === 'dog') return 'Canino';
  if (species === 'cat') return 'Felino';
  return 'Ambos';
}

type SharedDetailsFormState = {
  summaryText: string;
  keyPointsText: string;
  practicalApplicationText: string;
  appNotesText: string;
};

const EMPTY_SHARED_FORM: SharedDetailsFormState = {
  summaryText: '',
  keyPointsText: '',
  practicalApplicationText: '',
  appNotesText: '',
};

function toSharedForm(details: ConsensusDocumentDetails | null): SharedDetailsFormState {
  if (!details) return EMPTY_SHARED_FORM;

  return {
    summaryText: details.summaryText || '',
    keyPointsText: details.keyPointsText || '',
    practicalApplicationText: details.practicalApplicationText || '',
    appNotesText: details.appNotesText || '',
  };
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(String(value || '').trim());
}

export function ConsensoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const repository = useMemo(() => getConsensoRepository(), []);

  const [consenso, setConsenso] = useState<ConsensusRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sharedDetails, setSharedDetails] = useState<ConsensusDocumentDetails | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [canEditSharedDetails, setCanEditSharedDetails] = useState(false);
  const [isEditingSharedDetails, setIsEditingSharedDetails] = useState(false);
  const [isSavingSharedDetails, setIsSavingSharedDetails] = useState(false);
  const [saveSharedDetailsError, setSaveSharedDetailsError] = useState<string | null>(null);
  const [sharedDetailsForm, setSharedDetailsForm] = useState<SharedDetailsFormState>(EMPTY_SHARED_FORM);

  const { addRecent } = useRecents();

  useEffect(() => {
    let isMounted = true;

    const resolvePermissions = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!isMounted) return;
        setCanEditSharedDetails(Boolean(data.user));
      } catch {
        if (!isMounted) return;
        setCanEditSharedDetails(false);
      }
    };

    void resolvePermissions();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      setDetailsError(null);
      setSharedDetails(null);

      if (!slug) {
        if (isMounted) {
          setConsenso(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const found = await repository.getBySlug(slug);
        if (!isMounted) return;

        setConsenso(found);

        if (found) {
          addRecent('consensus', found.id);

          setIsDetailsLoading(true);
          try {
            const details = await repository.getSharedDetailsByConsensusId(found.id);
            if (!isMounted) return;
            setSharedDetails(details);
            setSharedDetailsForm(toSharedForm(details));
          } catch (detailsLoadError) {
            if (!isMounted) return;
            setDetailsError(
              detailsLoadError instanceof Error
                ? detailsLoadError.message
                : 'Falha ao carregar detalhes compartilhados.'
            );
          } finally {
            if (isMounted) setIsDetailsLoading(false);
          }
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Falha ao carregar consenso.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [slug, addRecent, repository]);

  const sharedBlocks = useMemo(() => {
    if (!sharedDetails) return [];

    const blocks = [
      { key: 'summary', title: 'Resumo do consenso', text: sharedDetails.summaryText },
      { key: 'keyPoints', title: 'Pontos-chave', text: sharedDetails.keyPointsText },
      { key: 'practicalApplication', title: 'Aplicação prática', text: sharedDetails.practicalApplicationText },
      { key: 'appNotes', title: 'Alertas e observações do app', text: sharedDetails.appNotesText },
    ];

    return blocks.filter((block) => hasText(block.text));
  }, [sharedDetails]);

  const hasAnySharedContent = sharedBlocks.length > 0;

  const openEditSharedDetails = () => {
    setSharedDetailsForm(toSharedForm(sharedDetails));
    setSaveSharedDetailsError(null);
    setIsEditingSharedDetails(true);
  };

  const closeEditSharedDetails = () => {
    if (isSavingSharedDetails) return;
    setIsEditingSharedDetails(false);
    setSaveSharedDetailsError(null);
  };

  const handleSharedFieldChange = <K extends keyof SharedDetailsFormState>(
    field: K,
    value: SharedDetailsFormState[K]
  ) => {
    setSharedDetailsForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSharedDetails = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consenso) return;

    setIsSavingSharedDetails(true);
    setSaveSharedDetailsError(null);

    try {
      const saved = await repository.upsertSharedDetails(consenso.id, {
        summaryText: sharedDetailsForm.summaryText,
        keyPointsText: sharedDetailsForm.keyPointsText,
        practicalApplicationText: sharedDetailsForm.practicalApplicationText,
        appNotesText: sharedDetailsForm.appNotesText,
      });

      setSharedDetails(saved);
      setSharedDetailsForm(toSharedForm(saved));
      setIsEditingSharedDetails(false);
    } catch (saveError) {
      setSaveSharedDetailsError(
        saveError instanceof Error ? saveError.message : 'Falha ao salvar detalhes compartilhados.'
      );
    } finally {
      setIsSavingSharedDetails(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-destructive">Erro ao abrir consenso</h2>
          <p className="mb-6 text-sm text-destructive/80">{error}</p>
          <Link
            to="/consulta-vet/consensos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Voltar para Consensos
          </Link>
        </div>
      </div>
    );
  }

  if (!consenso) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">Consenso não encontrado</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Não foi possível localizar o consenso solicitado.
          </p>
          <Link
            to="/consulta-vet/consensos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Voltar para Consensos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
        <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Link to="/consulta-vet" className="transition-colors hover:text-primary">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/consensos" className="transition-colors hover:text-primary">Consensos</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{consenso.title}</span>
        </nav>

        <header className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                {consenso.title}
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                {consenso.organization || 'Organização não informada'}
                {consenso.year ? ` • ${consenso.year}` : ''}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-md border border-border bg-muted px-2 py-1">
                  {consenso.category || 'Sem categoria'}
                </span>
                <span className="rounded-md border border-border bg-muted px-2 py-1">
                  {formatSpecies(consenso.species)}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {canEditSharedDetails && (
                <button
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-muted px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
                  title="Editar detalhes compartilhados"
                  type="button"
                  onClick={openEditSharedDetails}
                >
                  <SquarePen className="h-4 w-4" />
                  Editar detalhes
                </button>
              )}

              <button
                className="rounded-full bg-muted p-3 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                title="Copiar link"
                type="button"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <FavoriteButton entityType="consensus" entityId={consenso.id} className="h-12 w-12 p-3" />
            </div>
          </div>
        </header>

        <PdfViewerShell url={consenso.fileUrl} title={consenso.filePath.split('/').pop() || consenso.title} />

        {isDetailsLoading && (
          <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <p className="text-sm text-muted-foreground">Carregando detalhes compartilhados...</p>
          </section>
        )}

        {!isDetailsLoading && detailsError && (
          <section className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 md:p-6">
            <p className="text-sm text-destructive">{detailsError}</p>
          </section>
        )}

        {!isDetailsLoading && !detailsError && hasAnySharedContent && (
          <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">Conteúdo compartilhado</h2>
            <div className="space-y-6">
              {sharedBlocks.map((block) => (
                <article key={block.key} className="space-y-2 border-b border-border/70 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-base font-semibold text-foreground">{block.title}</h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{block.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {isEditingSharedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[90vh] w-full max-w-[900px] overflow-y-auto rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Editar detalhes compartilhados</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Conteúdo visível para todos os usuários no detalhe do consenso.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditSharedDetails}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
                title="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSaveSharedDetails}>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">Resumo do consenso</span>
                <textarea
                  rows={5}
                  value={sharedDetailsForm.summaryText}
                  onChange={(event) => handleSharedFieldChange('summaryText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Descreva de forma objetiva o escopo e as conclusões principais."
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">Pontos-chave</span>
                <textarea
                  rows={5}
                  value={sharedDetailsForm.keyPointsText}
                  onChange={(event) => handleSharedFieldChange('keyPointsText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Liste os pontos mais importantes para consulta rápida."
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">Aplicação prática</span>
                <textarea
                  rows={5}
                  value={sharedDetailsForm.practicalApplicationText}
                  onChange={(event) => handleSharedFieldChange('practicalApplicationText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Explique como aplicar no atendimento de rotina."
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">Alertas e observações do app</span>
                <textarea
                  rows={4}
                  value={sharedDetailsForm.appNotesText}
                  onChange={(event) => handleSharedFieldChange('appNotesText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Inclua alertas editoriais, limites e cuidados de interpretação."
                />
              </label>

              {saveSharedDetailsError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {saveSharedDetailsError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={closeEditSharedDetails}
                  disabled={isSavingSharedDetails}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingSharedDetails}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSavingSharedDetails ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Salvar detalhes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}