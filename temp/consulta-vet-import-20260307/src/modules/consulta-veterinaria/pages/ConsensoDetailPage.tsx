import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Share2, AlertTriangle, FileText, Stethoscope } from 'lucide-react';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { ConsensusRecord } from '../types/consenso';
import { FavoriteButton } from '../components/shared/FavoriteButton';
import { TagPills } from '../components/shared/TagPills';
import { PdfViewerShell } from '../components/consensus/PdfViewerShell';
import { NotesEditor } from '../components/shared/NotesEditor';
import { useRecents } from '../hooks/useRecents';

export function ConsensoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [consenso, setConsenso] = useState<ConsensusRecord | null>(null);
  const { addRecent } = useRecents();

  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        const c = await consensoRepository.getBySlug(slug);
        setConsenso(c);
        if (c) {
          addRecent('consensus', c.id);
        }
      }
    };
    loadData();
  }, [slug, addRecent]);

  if (!consenso) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Link to="/consulta-veterinaria" className="hover:text-primary transition-colors">Início</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/consulta-veterinaria/consensos" className="hover:text-primary transition-colors">Consensos</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate">{consenso.shortTitle}</span>
      </nav>

      <header>
        {consenso.isDemonstrative && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full">
            <AlertTriangle className="w-3 h-3" />
            {consenso.warningLabel}
          </div>
        )}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3 leading-tight">
              {consenso.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 font-medium">
              {consenso.sourceOrganization} • {consenso.year}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wider rounded-lg border border-purple-500/20">
                {consenso.species === 'dog' ? 'Cão' : consenso.species === 'cat' ? 'Gato' : 'Cão e Gato'}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-bold uppercase tracking-wider rounded-lg border border-border">
                {consenso.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-3 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-full transition-colors" title="Copiar Link">
              <Share2 className="w-5 h-5" />
            </button>
            <FavoriteButton entityType="consensus" entityId={consenso.id} className="w-12 h-12 p-3" />
          </div>
        </div>
        <div className="mt-6">
          <TagPills tags={consenso.tags} />
        </div>
      </header>

      <PdfViewerShell url={consenso.pdfUrl} title={consenso.pdfFileName} />

      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Resumo do Artigo
            </h2>
            <div 
              className="prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: consenso.articleSummaryRichText }}
            />
          </section>

          <section className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20">
            <h2 className="text-xl font-bold text-primary mb-6 tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" /> Notas do Administrador
            </h2>
            <div 
              className="prose prose-blue dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: consenso.adminNotesRichText }}
            />
          </section>

          <NotesEditor entityType="consensus" entityId={consenso.id} />
        </div>

        <div>
          {consenso.relatedDiseaseSlugs.length > 0 && (
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Stethoscope className="w-4 h-4" /> Doenças Relacionadas
              </h3>
              <div className="space-y-3">
                {consenso.relatedDiseaseSlugs.map((slug) => (
                  <Link
                    key={slug}
                    to={`/consulta-veterinaria/doencas/${slug}`}
                    className="block p-4 bg-muted/30 border border-border rounded-xl hover:border-primary/50 hover:shadow-sm transition-all group"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors capitalize">{slug.replace('-', ' ')}</p>
                    <p className="text-xs text-muted-foreground mt-1">Ver detalhes da doença.</p>
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
