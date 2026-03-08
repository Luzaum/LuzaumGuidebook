import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Share2, Stethoscope } from 'lucide-react';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { ConsensusRecord } from '../types/consenso';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { PdfViewerShell } from '../components/consensus/PdfViewerShell';
import { useRecents } from '../hooks/useRecents';
import { consensoFeatureFlags } from '../config/consensoFeatureFlags';

export function ConsensoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [consenso, setConsenso] = useState<ConsensusRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addRecent } = useRecents();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      if (!slug) {
        if (isMounted) {
          setConsenso(null);
          setIsLoading(false);
        }
        return;
      }

      const found = await consensoRepository.getBySlug(slug);
      if (!isMounted) return;

      setConsenso(found);
      if (found) {
        addRecent('consensus', found.id);
      }
      setIsLoading(false);
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [slug, addRecent]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
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
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-primary">Início</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/consulta-vet/consensos" className="transition-colors hover:text-primary">Consensos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{consenso.shortTitle}</span>
      </nav>

      <header className="rounded-2xl border border-border bg-card p-6 md:p-8">
        {consensoFeatureFlags.showDemoBadge && consenso.isDemonstrative && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {consenso.warningLabel || 'Conteúdo de demonstração'}
          </p>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              {consenso.title}
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              {consenso.sourceOrganization} • {consenso.year}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-md border border-border bg-muted px-2 py-1">
                {consenso.species === 'dog' ? 'Cão' : consenso.species === 'cat' ? 'Gato' : 'Cão e gato'}
              </span>
              <span className="rounded-md border border-border bg-muted px-2 py-1">
                {consenso.category}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
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

      <PdfViewerShell url={consenso.pdfUrl} title={consenso.pdfFileName} />

      {consenso.relatedDiseaseSlugs.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Stethoscope className="h-4 w-4" />
            Doenças relacionadas
          </h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {consenso.relatedDiseaseSlugs.map((relatedSlug) => (
              <Link
                key={relatedSlug}
                to={`/consulta-vet/doencas/${relatedSlug}`}
                className="rounded-xl border border-border bg-muted/40 p-4 transition-all hover:border-primary/40 hover:bg-muted/70"
              >
                <p className="capitalize font-medium text-foreground">{relatedSlug.replace('-', ' ')}</p>
                <p className="mt-1 text-xs text-muted-foreground">Abrir detalhes da doença</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
