import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Share2, AlertTriangle, Pill, Stethoscope } from 'lucide-react';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { MedicationRecord } from '../types/medication';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { TagPills } from '../components/shared/TagPills';
import { DoseCalculatorCard } from '../components/medication/DoseCalculatorCard';
import { NotesEditor } from '../components/shared/NotesEditor';
import { useRecents } from '../hooks/useRecents';

export function MedicationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [medication, setMedication] = useState<MedicationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addRecent } = useRecents();

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      if (!slug) {
        if (isMounted) {
          setMedication(null);
          setIsLoading(false);
        }
        return;
      }

      const found = await medicationRepository.getBySlug(slug);
      if (!isMounted) return;

      setMedication(found);
      if (found) {
        addRecent('medication', found.id);
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!medication) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">Medicamento não encontrado</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Não foi possível localizar o conteúdo solicitado.
          </p>
          <Link
            to="/consulta-vet/medicamentos"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Voltar para Medicamentos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Início</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/consulta-vet/medicamentos" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Medicamentos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{medication.title}</span>
      </nav>

      <header>
        {medication.isDemonstrative && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertTriangle className="h-3 w-3" />
            {medication.warningLabel}
          </div>
        )}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              {medication.title}
            </h1>
            <p className="mb-6 text-lg font-medium text-muted-foreground">
              {medication.activeIngredient} • {medication.pharmacologicClass}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {medication.species.join(', ')}
              </span>
              <span className="rounded-lg border border-border bg-muted px-3 py-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {medication.category}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="rounded-full bg-muted p-3 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground" title="Copiar link" type="button">
              <Share2 className="h-5 w-5" />
            </button>
            <FavoriteButton entityType="medication" entityId={medication.id} className="h-12 w-12 p-3" />
          </div>
        </div>
        <div className="mt-6">
          <TagPills tags={medication.tags} />
        </div>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <DoseCalculatorCard doses={medication.doses} presentations={medication.presentations} />

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
              <Pill className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /> Informações farmacológicas
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">Mecanismo de ação</h3>
                <p className="leading-relaxed text-foreground/80">{medication.mechanismOfAction}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Indicações</h3>
                  <ul className="space-y-2">
                    {medication.indications.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-destructive">Contraindicações</h3>
                  <ul className="space-y-2">
                    {medication.contraindications.map((contra, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                        {contra}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">Precauções</h3>
                <ul className="space-y-2">
                  {medication.cautions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">Efeitos adversos</h3>
                <ul className="space-y-2">
                  {medication.adverseEffects.map((effect, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-400">
              <AlertTriangle className="h-5 w-5 text-emerald-600 dark:text-emerald-500" /> Notas do administrador
            </h2>
            <div
              className="prose prose-emerald max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: medication.adminNotesRichText }}
            />
          </section>

          <NotesEditor entityType="medication" entityId={medication.id} />
        </div>

        <div>
          {medication.relatedDiseaseSlugs.length > 0 && (
            <section className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <Stethoscope className="h-4 w-4" /> Doenças relacionadas
              </h3>
              <div className="space-y-3">
                {medication.relatedDiseaseSlugs.map((relatedSlug) => (
                  <Link
                    key={relatedSlug}
                    to={`/consulta-vet/doencas/${relatedSlug}`}
                    className="group block rounded-xl border border-border bg-muted/30 p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                  >
                    <p className="capitalize font-semibold text-foreground transition-colors group-hover:text-primary">{relatedSlug.replace('-', ' ')}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Ver detalhes da doença.</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
