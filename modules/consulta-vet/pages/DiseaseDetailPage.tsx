import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Stethoscope, AlertTriangle, Lightbulb, Share2, FileText, Pill } from 'lucide-react';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { consensosSeed } from '../data/seed/consensos.seed';
import { DiseaseRecord } from '../types/disease';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { TagPills } from '../components/shared/TagPills';
import { SectionAnchorNav } from '../components/shared/SectionAnchorNav';
import { DiseaseSectionRenderer } from '../components/disease/DiseaseSectionRenderer';
import { NotesEditor } from '../components/shared/NotesEditor';
import { useRecents } from '../hooks/useRecents';

export function DiseaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [disease, setDisease] = useState<DiseaseRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addRecent } = useRecents();

  const consensusSlugById = useMemo(() => {
    const map = new Map<string, string>();
    consensosSeed.forEach((consenso) => map.set(consenso.id, consenso.slug));
    return map;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      if (!slug) {
        if (isMounted) {
          setDisease(null);
          setIsLoading(false);
        }
        return;
      }

      const found = await diseaseRepository.getBySlug(slug);
      if (!isMounted) return;

      setDisease(found);
      if (found) {
        addRecent('disease', found.id);
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

  if (!disease) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">Doença não encontrada</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Não foi possível localizar o conteúdo solicitado.
          </p>
          <Link
            to="/consulta-vet/doencas"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Voltar para Doenças
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'quick-summary', label: 'Resumo rápido' },
    { id: 'key-points', label: 'Pontos-chave' },
    { id: 'introduction', label: 'Introdução' },
    { id: 'etiology', label: 'Etiologia' },
    { id: 'transmission', label: 'Transmissão' },
    { id: 'pathophysiology', label: 'Fisiopatologia' },
    { id: 'epidemiology', label: 'Epidemiologia' },
    { id: 'clinicalPresentation', label: 'Apresentação clínica' },
    { id: 'physicalExam', label: 'Exame físico' },
    { id: 'differentialDiagnoses', label: 'Diagnósticos diferenciais' },
    { id: 'diagnostics', label: 'Exames' },
    { id: 'diagnosticApproach', label: 'Abordagem diagnóstica' },
    { id: 'treatment', label: 'Tratamento' },
    { id: 'prognosis', label: 'Prognóstico' },
    { id: 'complications', label: 'Complicações' },
    { id: 'prevention', label: 'Prevenção' },
    { id: 'related', label: 'Relacionados' },
    { id: 'notes', label: 'Anotações' },
  ];

  return (
    <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col lg:flex-row">
      <div className="w-full flex-1 overflow-y-auto p-4 md:p-8 lg:pr-12">
        <nav className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Link to="/consulta-vet" className="transition-colors hover:text-primary">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/consulta-vet/doencas" className="transition-colors hover:text-primary">Doenças</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{disease.title}</span>
        </nav>

        <header className="mb-12">
          {disease.isDemonstrative && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              <AlertTriangle className="h-3 w-3" />
              {disease.warningLabel}
            </div>
          )}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {disease.title}
              </h1>
              {disease.synonyms.length > 0 && (
                <p className="mb-6 text-lg font-medium text-muted-foreground">
                  {disease.synonyms.join(' • ')}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-bold uppercase tracking-wider text-primary">
                  {disease.species.join(', ')}
                </span>
                <span className="rounded-lg border border-border bg-muted px-3 py-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {disease.category}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button className="rounded-full bg-muted p-3 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground" title="Copiar link" type="button">
                <Share2 className="h-5 w-5" />
              </button>
              <FavoriteButton entityType="disease" entityId={disease.id} className="h-12 w-12 p-3" />
            </div>
          </div>
          <div className="mt-6">
            <TagPills tags={disease.tags} />
          </div>
        </header>

        <section id="quick-summary" className="mb-12 scroll-mt-24">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg md:p-8">
            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/4 -translate-y-1/2 rounded-full bg-white opacity-5 blur-3xl" />
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
              <Stethoscope className="h-4 w-4" /> Resumo rápido
            </h2>
            <p className="relative z-10 text-xl font-medium leading-relaxed md:text-2xl">
              {disease.quickSummary}
            </p>
          </div>
        </section>

        <section id="key-points" className="mb-12 grid gap-6 scroll-mt-24 md:grid-cols-2">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold tracking-tight text-destructive">
              <AlertTriangle className="h-5 w-5" /> Red flags
            </h3>
            <ul className="space-y-3">
              {disease.redFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold tracking-tight text-amber-600 dark:text-amber-500">
              <Lightbulb className="h-5 w-5" /> Pérolas clínicas
            </h3>
            <ul className="space-y-3">
              {disease.clinicalPearls.map((pearl, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {pearl}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="space-y-16">
          <DiseaseSectionRenderer id="introduction" title="Introdução" data={disease.introduction} />
          <DiseaseSectionRenderer id="etiology" title="Etiologia" data={disease.etiology} />
          <DiseaseSectionRenderer id="transmission" title="Transmissão" data={disease.transmission} />
          <DiseaseSectionRenderer id="pathophysiology" title="Fisiopatologia" data={disease.pathophysiology} />
          <DiseaseSectionRenderer id="epidemiology" title="Epidemiologia" data={disease.epidemiology} />
          <DiseaseSectionRenderer id="clinicalPresentation" title="Apresentação clínica" data={disease.clinicalPresentation} />
          <DiseaseSectionRenderer id="physicalExam" title="Exame físico" data={disease.physicalExam} />
          <DiseaseSectionRenderer id="differentialDiagnoses" title="Diagnósticos diferenciais" data={disease.differentialDiagnoses} />
          <DiseaseSectionRenderer id="diagnostics" title="Exames e diagnóstico" data={disease.diagnostics} />
          <DiseaseSectionRenderer id="diagnosticApproach" title="Abordagem diagnóstica" data={disease.diagnosticApproach} />
          <DiseaseSectionRenderer id="treatment" title="Tratamento" data={disease.treatment} />
          <DiseaseSectionRenderer id="prognosis" title="Prognóstico" data={disease.prognosis} />
          <DiseaseSectionRenderer id="complications" title="Complicações" data={disease.complications} />
          <DiseaseSectionRenderer id="prevention" title="Prevenção" data={disease.prevention} />
        </div>

        <section id="related" className="mt-16 scroll-mt-24 border-t border-border pt-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">Conteúdo relacionado</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {disease.relatedConsensusIds.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <FileText className="h-4 w-4" /> Consensos
                </h3>
                <div className="space-y-3">
                  {disease.relatedConsensusIds.map((id) => {
                    const consensusSlug = consensusSlugById.get(id);
                    if (!consensusSlug) return null;

                    return (
                      <Link
                        key={id}
                        to={`/consulta-vet/consensos/${consensusSlug}`}
                        className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                      >
                        <p className="font-semibold text-foreground transition-colors group-hover:text-primary">Consenso relacionado</p>
                        <p className="mt-1 text-xs text-muted-foreground">Clique para abrir o PDF e os metadados.</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {disease.relatedMedicationSlugs.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  <Pill className="h-4 w-4" /> Medicamentos
                </h3>
                <div className="space-y-3">
                  {disease.relatedMedicationSlugs.map((relatedSlug) => (
                    <Link
                      key={relatedSlug}
                      to={`/consulta-vet/medicamentos/${relatedSlug}`}
                      className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-emerald-300 hover:shadow-sm dark:hover:border-emerald-700"
                    >
                      <p className="capitalize font-semibold text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {relatedSlug.replace('-demo', '').replace('-', ' ')}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Ver doses e calculadora.</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="notes" className="mt-16 scroll-mt-24 border-t border-border pb-24 pt-12">
          <NotesEditor entityType="disease" entityId={disease.id} />
        </section>
      </div>

      <div className="hidden w-64 shrink-0 py-8 pr-8 lg:block">
        <SectionAnchorNav sections={sections} />
      </div>
    </div>
  );
}
