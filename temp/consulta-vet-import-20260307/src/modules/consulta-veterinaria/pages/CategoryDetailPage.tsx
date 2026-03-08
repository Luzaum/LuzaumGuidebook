import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Grid, Stethoscope, Pill, FileText } from 'lucide-react';
import { categoryRepository } from '../services/adapters/local/localCategoryRepository';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { Category } from '../types/category';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';

export function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        const c = await categoryRepository.getBySlug(slug);
        setCategory(c);
        if (c) {
          setDiseases(await diseaseRepository.listByCategory(c.slug));
          setMedications(await medicationRepository.listByCategory(c.slug));
          setConsensos(await consensoRepository.listByCategory(c.slug));
        }
      }
    };
    loadData();
  }, [slug]);

  if (!category) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Link to="/consulta-veterinaria" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Início</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/consulta-veterinaria/categorias" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Categorias</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate capitalize">{category.title}</span>
      </nav>

      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3 leading-tight flex items-center gap-3">
          <Grid className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          {category.title}
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Explorando conteúdo de {category.title.toLowerCase()}.
        </p>
      </header>

      <div className="space-y-16">
        {diseases.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2 mb-6">
              <Stethoscope className="w-5 h-5 text-primary" /> Doenças
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diseases.map((d) => (
                <EntityCard
                  key={d.id}
                  to={`/consulta-veterinaria/doencas/${d.slug}`}
                  title={d.title}
                  subtitle={d.category}
                  description={d.quickSummary}
                  tags={d.tags}
                  entityType="disease"
                  entityId={d.id}
                />
              ))}
            </div>
          </section>
        )}

        {medications.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2 mb-6">
              <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Medicamentos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medications.map((m) => (
                <EntityCard
                  key={m.id}
                  to={`/consulta-veterinaria/medicamentos/${m.slug}`}
                  title={m.title}
                  subtitle={m.pharmacologicClass}
                  description={m.indications.join(', ')}
                  tags={m.tags}
                  entityType="medication"
                  entityId={m.id}
                />
              ))}
            </div>
          </section>
        )}

        {consensos.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Consensos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consensos.map((c) => (
                <EntityCard
                  key={c.id}
                  to={`/consulta-veterinaria/consensos/${c.slug}`}
                  title={c.title}
                  subtitle={`${c.sourceOrganization} • ${c.year}`}
                  description={c.summary}
                  tags={c.tags}
                  entityType="consensus"
                  entityId={c.id}
                />
              ))}
            </div>
          </section>
        )}

        {diseases.length === 0 && medications.length === 0 && consensos.length === 0 && (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <Grid className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-foreground mb-2">Categoria Vazia</h2>
            <p className="text-muted-foreground">Ainda não há conteúdo cadastrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
