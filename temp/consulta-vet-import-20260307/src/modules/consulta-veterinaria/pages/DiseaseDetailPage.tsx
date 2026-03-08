import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Stethoscope, AlertTriangle, Lightbulb, Share2, FileText, Pill } from 'lucide-react';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { DiseaseRecord } from '../types/disease';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { TagPills } from '../components/shared/TagPills';
import { SectionAnchorNav } from '../components/shared/SectionAnchorNav';
import { DiseaseSectionRenderer } from '../components/disease/DiseaseSectionRenderer';
import { NotesEditor } from '../components/shared/NotesEditor';
import { useRecents } from '../hooks/useRecents';
import { cn } from '../../../lib/utils';

export function DiseaseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [disease, setDisease] = useState<DiseaseRecord | null>(null);
  const { addRecent } = useRecents();

  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        const d = await diseaseRepository.getBySlug(slug);
        setDisease(d);
        if (d) {
          addRecent('disease', d.id);
        }
      }
    };
    loadData();
  }, [slug, addRecent]);

  if (!disease) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const sections = [
    { id: 'quick-summary', label: 'Resumo Rápido' },
    { id: 'key-points', label: 'Pontos-Chave' },
    { id: 'introduction', label: 'Introdução' },
    { id: 'etiology', label: 'Etiologia' },
    { id: 'transmission', label: 'Transmissão' },
    { id: 'pathophysiology', label: 'Fisiopatologia' },
    { id: 'epidemiology', label: 'Epidemiologia' },
    { id: 'clinicalPresentation', label: 'Apresentação Clínica' },
    { id: 'physicalExam', label: 'Exame Físico' },
    { id: 'differentialDiagnoses', label: 'Diagnósticos Diferenciais' },
    { id: 'diagnostics', label: 'Exames' },
    { id: 'diagnosticApproach', label: 'Abordagem Diagnóstica' },
    { id: 'treatment', label: 'Tratamento' },
    { id: 'prognosis', label: 'Prognóstico' },
    { id: 'complications', label: 'Complicações' },
    { id: 'prevention', label: 'Prevenção' },
    { id: 'related', label: 'Relacionados' },
    { id: 'notes', label: 'Anotações' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-full max-w-7xl mx-auto">
      <div className="flex-1 overflow-y-auto w-full p-4 md:p-8 lg:pr-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-8">
          <Link to="/consulta-veterinaria" className="hover:text-primary transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/consulta-veterinaria/doencas" className="hover:text-primary transition-colors">Doenças</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate">{disease.title}</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          {disease.isDemonstrative && (
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full">
              <AlertTriangle className="w-3 h-3" />
              {disease.warningLabel}
            </div>
          )}
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3 leading-tight">
                {disease.title}
              </h1>
              {disease.synonyms.length > 0 && (
                <p className="text-lg text-muted-foreground mb-6 font-medium">
                  {disease.synonyms.join(' • ')}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider rounded-lg border border-primary/20">
                  {disease.species.join(', ')}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-bold uppercase tracking-wider rounded-lg border border-border">
                  {disease.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="p-3 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-full transition-colors" title="Copiar Link">
                <Share2 className="w-5 h-5" />
              </button>
              <FavoriteButton entityType="disease" entityId={disease.id} className="w-12 h-12 p-3" />
            </div>
          </div>
          <div className="mt-6">
            <TagPills tags={disease.tags} />
          </div>
        </header>

        {/* Quick Summary */}
        <section id="quick-summary" className="mb-12 scroll-mt-24">
          <div className="bg-primary text-primary-foreground rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <h2 className="text-sm font-bold text-primary-foreground/80 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> Resumo Rápido
            </h2>
            <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10">
              {disease.quickSummary}
            </p>
          </div>
        </section>

        {/* Key Points Panels */}
        <section id="key-points" className="mb-12 scroll-mt-24 grid md:grid-cols-2 gap-6">
          <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/20">
            <h3 className="text-destructive font-bold flex items-center gap-2 mb-4 tracking-tight">
              <AlertTriangle className="w-5 h-5" /> Red Flags
            </h3>
            <ul className="space-y-3">
              {disease.redFlags.map((flag, i) => (
                <li key={i} className="text-foreground text-sm flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20">
            <h3 className="text-amber-600 dark:text-amber-500 font-bold flex items-center gap-2 mb-4 tracking-tight">
              <Lightbulb className="w-5 h-5" /> Pérolas Clínicas
            </h3>
            <ul className="space-y-3">
              {disease.clinicalPearls.map((pearl, i) => (
                <li key={i} className="text-foreground text-sm flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  {pearl}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Main Content Sections */}
        <div className="space-y-16">
          <DiseaseSectionRenderer id="introduction" title="Introdução" data={disease.introduction} />
          <DiseaseSectionRenderer id="etiology" title="Etiologia" data={disease.etiology} />
          <DiseaseSectionRenderer id="transmission" title="Transmissão" data={disease.transmission} />
          <DiseaseSectionRenderer id="pathophysiology" title="Fisiopatologia" data={disease.pathophysiology} />
          <DiseaseSectionRenderer id="epidemiology" title="Epidemiologia" data={disease.epidemiology} />
          <DiseaseSectionRenderer id="clinicalPresentation" title="Apresentação Clínica" data={disease.clinicalPresentation} />
          <DiseaseSectionRenderer id="physicalExam" title="Exame Físico" data={disease.physicalExam} />
          <DiseaseSectionRenderer id="differentialDiagnoses" title="Diagnósticos Diferenciais" data={disease.differentialDiagnoses} />
          <DiseaseSectionRenderer id="diagnostics" title="Exames e Diagnóstico" data={disease.diagnostics} />
          <DiseaseSectionRenderer id="diagnosticApproach" title="Abordagem Diagnóstica" data={disease.diagnosticApproach} />
          <DiseaseSectionRenderer id="treatment" title="Tratamento" data={disease.treatment} />
          <DiseaseSectionRenderer id="prognosis" title="Prognóstico" data={disease.prognosis} />
          <DiseaseSectionRenderer id="complications" title="Complicações" data={disease.complications} />
          <DiseaseSectionRenderer id="prevention" title="Prevenção" data={disease.prevention} />
        </div>

        {/* Related Content */}
        <section id="related" className="mt-16 pt-12 border-t border-border scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">Conteúdo Relacionado</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {disease.relatedConsensusIds.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Consensos
                </h3>
                <div className="space-y-3">
                  {disease.relatedConsensusIds.map((id) => (
                    <Link
                      key={id}
                      to={`/consulta-veterinaria/consensos/${id.replace('con-', '')}`}
                      className="block p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-sm transition-all group"
                    >
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Consenso Relacionado</p>
                      <p className="text-xs text-muted-foreground mt-1">Clique para abrir o PDF e resumo.</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {disease.relatedMedicationSlugs.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Pill className="w-4 h-4" /> Medicamentos
                </h3>
                <div className="space-y-3">
                  {disease.relatedMedicationSlugs.map((slug) => (
                    <Link
                      key={slug}
                      to={`/consulta-veterinaria/medicamentos/${slug}`}
                      className="block p-4 bg-card border border-border rounded-xl hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm transition-all group"
                    >
                      <p className="font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors capitalize">{slug.replace('-demo', '').replace('-', ' ')}</p>
                      <p className="text-xs text-muted-foreground mt-1">Ver doses e calculadora.</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Notes */}
        <section id="notes" className="mt-16 pt-12 border-t border-border scroll-mt-24 pb-24">
          <NotesEditor entityType="disease" entityId={disease.id} />
        </section>

      </div>

      {/* Sticky Nav Desktop */}
      <div className="hidden lg:block w-64 shrink-0 py-8 pr-8">
        <SectionAnchorNav sections={sections} />
      </div>
    </div>
  );
}
