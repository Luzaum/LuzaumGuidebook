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
  const { addRecent } = useRecents();

  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        const m = await medicationRepository.getBySlug(slug);
        setMedication(m);
        if (m) {
          addRecent('medication', m.id);
        }
      }
    };
    loadData();
  }, [slug, addRecent]);

  if (!medication) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Link to="/consulta-veterinaria" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Início</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/consulta-veterinaria/medicamentos" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Medicamentos</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate">{medication.title}</span>
      </nav>

      <header>
        {medication.isDemonstrative && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full">
            <AlertTriangle className="w-3 h-3" />
            {medication.warningLabel}
          </div>
        )}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3 leading-tight">
              {medication.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 font-medium">
              {medication.activeIngredient} • {medication.pharmacologicClass}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider rounded-lg border border-emerald-500/20">
                {medication.species.join(', ')}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-bold uppercase tracking-wider rounded-lg border border-border">
                {medication.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-3 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-full transition-colors" title="Copiar Link">
              <Share2 className="w-5 h-5" />
            </button>
            <FavoriteButton entityType="medication" entityId={medication.id} className="w-12 h-12 p-3" />
          </div>
        </div>
        <div className="mt-6">
          <TagPills tags={medication.tags} />
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-12">
          
          <DoseCalculatorCard doses={medication.doses} presentations={medication.presentations} />

          <section className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Informações Farmacológicas
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Mecanismo de Ação</h3>
                <p className="text-foreground/80 leading-relaxed">{medication.mechanismOfAction}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Indicações</h3>
                  <ul className="space-y-2">
                    {medication.indications.map((ind, i) => (
                      <li key={i} className="text-foreground/80 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        {ind}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-destructive uppercase tracking-wider mb-2">Contraindicações</h3>
                  <ul className="space-y-2">
                    {medication.contraindications.map((contra, i) => (
                      <li key={i} className="text-foreground/80 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                        {contra}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-2">Precauções</h3>
                <ul className="space-y-2">
                  {medication.cautions.map((c, i) => (
                    <li key={i} className="text-foreground/80 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Efeitos Adversos</h3>
                <ul className="space-y-2">
                  {medication.adverseEffects.map((e, i) => (
                    <li key={i} className="text-foreground/80 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-emerald-500/5 rounded-2xl p-6 md:p-8 border border-emerald-500/20">
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-6 tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-emerald-600 dark:text-emerald-500" /> Notas do Administrador
            </h2>
            <div 
              className="prose prose-emerald dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: medication.adminNotesRichText }}
            />
          </section>

          <NotesEditor entityType="medication" entityId={medication.id} />
        </div>

        <div>
          {medication.relatedDiseaseSlugs.length > 0 && (
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Stethoscope className="w-4 h-4" /> Doenças Relacionadas
              </h3>
              <div className="space-y-3">
                {medication.relatedDiseaseSlugs.map((slug) => (
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
