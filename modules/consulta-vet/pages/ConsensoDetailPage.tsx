import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight, LoaderCircle, Pill, Save, Share2, SquarePen, Stethoscope, X } from 'lucide-react';
import { PdfViewerShell } from '../components/consensus/PdfViewerShell';
import { ReferencesEditor } from '../components/editorial/ReferencesEditor';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { ReferencesList } from '../components/shared/ReferencesList';
import { canManageConsensusSharedDetails } from '../services/consensusSharedDetailsPermissions';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { useRecents } from '../hooks/useRecents';
import { ConsensusDocumentDetails, ConsensusRecord } from '../types/consenso';
import { EditorialReference } from '../types/common';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { formatConsensusSpecies } from '../utils/navigation';

const UI_TEXT = {
  notFoundTitle: 'Consenso não encontrado',
  notFoundBody: 'Não foi possível localizar o consenso solicitado.',
  organizationFallback: 'Organização não informada',
  sharedContentTitle: 'Conteúdo compartilhado',
  sharedReferencesTitle: 'Referências editoriais',
  editSharedDetails: 'Editar detalhes',
  editSharedDetailsBody: 'Conteúdo visível para todos os usuários no detalhe do consenso.',
  summary: 'Resumo do consenso',
  keyPoints: 'Pontos-chave',
  practicalApplication: 'Aplicação prática',
  appNotes: 'Alertas e observações do app',
  references: 'Referências',
  summaryPlaceholder: 'Descreva de forma objetiva o escopo e as conclusões principais.',
  keyPointsPlaceholder: 'Liste os pontos mais importantes para consulta rápida.',
  practicalApplicationPlaceholder: 'Explique como aplicar no atendimento de rotina.',
  appNotesPlaceholder: 'Inclua alertas editoriais, limites e cuidados de interpretação.',
} as const;

type SharedDetailsFormState = {
  summaryText: string;
  keyPointsText: string;
  practicalApplicationText: string;
  appNotesText: string;
  references: EditorialReference[];
};

type ResumeLocationState = {
  pageNumber?: number;
};

const EMPTY_SHARED_FORM: SharedDetailsFormState = {
  summaryText: '',
  keyPointsText: '',
  practicalApplicationText: '',
  appNotesText: '',
  references: [],
};

function toSharedForm(details: ConsensusDocumentDetails | null): SharedDetailsFormState {
  if (!details) return EMPTY_SHARED_FORM;

  return {
    summaryText: details.summaryText || '',
    keyPointsText: details.keyPointsText || '',
    practicalApplicationText: details.practicalApplicationText || '',
    appNotesText: details.appNotesText || '',
    references: details.references || [],
  };
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(String(value || '').trim());
}

export function ConsensoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const repository = useMemo(() => getConsensoRepository(), []);
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const { addRecent } = useRecents();

  const [consenso, setConsenso] = useState<ConsensusRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sharedDetails, setSharedDetails] = useState<ConsensusDocumentDetails | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [relatedDiseases, setRelatedDiseases] = useState<DiseaseRecord[]>([]);
  const [relatedMedications, setRelatedMedications] = useState<MedicationRecord[]>([]);

  const [canEditSharedDetails, setCanEditSharedDetails] = useState(false);
  const [isEditingSharedDetails, setIsEditingSharedDetails] = useState(false);
  const [isSavingSharedDetails, setIsSavingSharedDetails] = useState(false);
  const [saveSharedDetailsError, setSaveSharedDetailsError] = useState<string | null>(null);
  const [sharedDetailsForm, setSharedDetailsForm] = useState<SharedDetailsFormState>(EMPTY_SHARED_FORM);

  const resumeState = (location.state as ResumeLocationState | null) || null;
  const lastSavedPageRef = useRef<number>(resumeState?.pageNumber || 1);

  useEffect(() => {
    let isMounted = true;

    const resolvePermissions = async () => {
      const canEdit = await canManageConsensusSharedDetails();
      if (!isMounted) return;
      setCanEditSharedDetails(canEdit);
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
      setRelatedDiseases([]);
      setRelatedMedications([]);

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
        if (!found) {
          setIsLoading(false);
          return;
        }

        addRecent('consensus', found.id, resumeState?.pageNumber);

        setIsDetailsLoading(true);
        try {
          const [details, loadedDiseases, loadedMedications] = await Promise.all([
            repository.getSharedDetailsByConsensusId(found.id),
            diseaseRepository.list(),
            medicationRepository.list(),
          ]);

          if (!isMounted) return;

          const nextRelatedDiseases = loadedDiseases.filter((item) => item.relatedConsensusSlugs.includes(found.slug));
          const relatedDiseaseSlugSet = new Set(nextRelatedDiseases.map((item) => item.slug));

          setSharedDetails(details);
          setSharedDetailsForm(toSharedForm(details));
          setRelatedDiseases(nextRelatedDiseases);
          setRelatedMedications(
            loadedMedications.filter((item) => item.relatedDiseaseSlugs.some((relatedSlug) => relatedDiseaseSlugSet.has(relatedSlug)))
          );
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
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar consenso.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [addRecent, diseaseRepository, medicationRepository, repository, resumeState?.pageNumber, slug]);

  const sharedBlocks = useMemo(() => {
    if (!sharedDetails) return [];

    return [
      { key: 'summary', title: UI_TEXT.summary, text: sharedDetails.summaryText },
      { key: 'keyPoints', title: UI_TEXT.keyPoints, text: sharedDetails.keyPointsText },
      { key: 'practicalApplication', title: UI_TEXT.practicalApplication, text: sharedDetails.practicalApplicationText },
      { key: 'appNotes', title: UI_TEXT.appNotes, text: sharedDetails.appNotesText },
    ].filter((block) => hasText(block.text));
  }, [sharedDetails]);

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
        references: sharedDetailsForm.references,
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

  const handlePdfPageChange = (pageNumber: number) => {
    if (!consenso || lastSavedPageRef.current === pageNumber) return;
    lastSavedPageRef.current = pageNumber;
    addRecent('consensus', consenso.id, pageNumber);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // noop
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
          <h2 className="mb-2 text-xl font-semibold text-foreground">{UI_TEXT.notFoundTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{UI_TEXT.notFoundBody}</p>
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
                {consenso.organization || UI_TEXT.organizationFallback}
                {consenso.year ? ` • ${consenso.year}` : ''}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-md border border-border bg-muted px-2 py-1">
                  {consenso.category || 'Sem categoria'}
                </span>
                <span className="rounded-md border border-border bg-muted px-2 py-1">
                  {formatConsensusSpecies(consenso.species)}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {canEditSharedDetails && (
                <button
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-muted px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
                  title={UI_TEXT.editSharedDetails}
                  type="button"
                  onClick={openEditSharedDetails}
                >
                  <SquarePen className="h-4 w-4" />
                  {UI_TEXT.editSharedDetails}
                </button>
              )}

              <button
                className="rounded-full bg-muted p-3 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                title="Copiar link"
                type="button"
                onClick={handleCopyLink}
              >
                <Share2 className="h-5 w-5" />
              </button>
              <FavoriteButton entityType="consensus" entityId={consenso.id} className="h-12 w-12 p-3" />
            </div>
          </div>
        </header>

        <PdfViewerShell
          url={consenso.fileUrl}
          title={consenso.filePath.split('/').pop() || consenso.title}
          initialPage={resumeState?.pageNumber || 1}
          onPageChange={handlePdfPageChange}
        />

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

        {!isDetailsLoading && !detailsError && sharedBlocks.length > 0 && (
          <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">{UI_TEXT.sharedContentTitle}</h2>
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

        {!isDetailsLoading && !detailsError && sharedDetails?.references && sharedDetails.references.length > 0 && (
          <ReferencesList
            references={sharedDetails.references}
            title={UI_TEXT.sharedReferencesTitle}
          />
        )}

        {(relatedDiseases.length > 0 || relatedMedications.length > 0) && (
          <section className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground">Relacionados</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedDiseases.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    <Stethoscope className="h-4 w-4" />
                    Doenças
                  </h3>
                  <div className="space-y-3">
                    {relatedDiseases.map((disease) => (
                      <Link
                        key={disease.id}
                        to={`/consulta-vet/doencas/${disease.slug}`}
                        className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                      >
                        <p className="font-semibold text-foreground transition-colors group-hover:text-primary">
                          {disease.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{disease.category}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedMedications.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    <Pill className="h-4 w-4" />
                    Medicamentos
                  </h3>
                  <div className="space-y-3">
                    {relatedMedications.map((medication) => (
                      <Link
                        key={medication.id}
                        to={`/consulta-vet/medicamentos/${medication.slug}`}
                        className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-emerald-300 hover:shadow-sm dark:hover:border-emerald-700"
                      >
                        <p className="font-semibold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {medication.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{medication.pharmacologicClass}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {isEditingSharedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[90vh] w-full max-w-[980px] overflow-y-auto rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{UI_TEXT.editSharedDetails}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{UI_TEXT.editSharedDetailsBody}</p>
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

            <form className="space-y-5" onSubmit={handleSaveSharedDetails}>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">{UI_TEXT.summary}</span>
                <textarea
                  rows={5}
                  value={sharedDetailsForm.summaryText}
                  onChange={(event) => handleSharedFieldChange('summaryText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={UI_TEXT.summaryPlaceholder}
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">{UI_TEXT.keyPoints}</span>
                <textarea
                  rows={5}
                  value={sharedDetailsForm.keyPointsText}
                  onChange={(event) => handleSharedFieldChange('keyPointsText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={UI_TEXT.keyPointsPlaceholder}
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">{UI_TEXT.practicalApplication}</span>
                <textarea
                  rows={5}
                  value={sharedDetailsForm.practicalApplicationText}
                  onChange={(event) => handleSharedFieldChange('practicalApplicationText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={UI_TEXT.practicalApplicationPlaceholder}
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-foreground">{UI_TEXT.appNotes}</span>
                <textarea
                  rows={4}
                  value={sharedDetailsForm.appNotesText}
                  onChange={(event) => handleSharedFieldChange('appNotesText', event.target.value)}
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={UI_TEXT.appNotesPlaceholder}
                />
              </label>

              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{UI_TEXT.references}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Adicione múltiplas fontes editoriais com citação, tipo, URL e notas curtas.
                  </p>
                </div>
                <ReferencesEditor
                  value={sharedDetailsForm.references}
                  onChange={(nextValue) => handleSharedFieldChange('references', nextValue)}
                />
              </div>

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
