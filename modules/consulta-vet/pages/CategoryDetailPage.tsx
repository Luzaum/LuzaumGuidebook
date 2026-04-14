import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, FileText, Grid, Pill, Stethoscope } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EntityCard } from '../components/shared/EntityCard';
import { getCategoryRepository } from '../services/categoryRepository';
import { getConsensoRepository } from '../services/consensoRepository';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { getMedicationRepository } from '../services/medicationRepository';
import { Category } from '../types/category';
import { ConsensusRecord } from '../types/consenso';
import { DiseaseRecord } from '../types/disease';
import { MedicationRecord } from '../types/medication';

const UI_TEXT = {
  notFoundTitle: 'Categoria n\u00e3o encontrada',
  notFoundBody: 'N\u00e3o foi poss\u00edvel localizar a categoria solicitada.',
  backToCategories: 'Voltar para Categorias',
  home: 'In\u00edcio',
  categories: 'Categorias',
  body: 'Conte\u00fado relacionado \u00e0 categoria',
  diseases: 'Doen\u00e7as',
  medications: 'Medicamentos',
  consensos: 'Consensos',
  noOrganization: 'Sem organiza\u00e7\u00e3o',
  emptyTitle: 'Sem conte\u00fado nesta categoria',
  emptyBody: 'Os materiais ser\u00e3o exibidos aqui assim que forem cadastrados.',
} as const;

export function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryRepository = useMemo(() => getCategoryRepository(), []);
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const consensoRepository = useMemo(() => getConsensoRepository(), []);

  const [category, setCategory] = useState<Category | null>(null);
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);

      if (!slug) {
        if (isMounted) {
          setCategory(null);
          setDiseases([]);
          setMedications([]);
          setConsensos([]);
          setIsLoading(false);
        }
        return;
      }

      const found = await categoryRepository.getBySlug(slug);
      if (!isMounted) return;

      setCategory(found);
      if (!found) {
        setDiseases([]);
        setMedications([]);
        setConsensos([]);
        setIsLoading(false);
        return;
      }

      const [loadedDiseases, loadedMedications, loadedConsensos] = await Promise.all([
        diseaseRepository.listByCategory(found.slug),
        medicationRepository.listByCategory(found.slug),
        consensoRepository.listByCategory(found.slug),
      ]);

      if (!isMounted) return;

      setDiseases(loadedDiseases);
      setMedications(loadedMedications);
      setConsensos(loadedConsensos);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [categoryRepository, consensoRepository, diseaseRepository, medicationRepository, slug]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="mx-auto flex h-full w-full max-w-[860px] items-center justify-center p-6">
        <div className="w-full rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-foreground">{UI_TEXT.notFoundTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">{UI_TEXT.notFoundBody}</p>
          <Link
            to="/consulta-vet/categorias"
            className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {UI_TEXT.backToCategories}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-10 p-4 md:p-8">
      <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Link to="/consulta-vet" className="transition-colors hover:text-amber-600 dark:hover:text-amber-400">
          {UI_TEXT.home}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/consulta-vet/categorias" className="transition-colors hover:text-amber-600 dark:hover:text-amber-400">
          {UI_TEXT.categories}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate capitalize text-foreground">{category.title}</span>
      </nav>

      <ConsultaVetPageHero
        eyebrow="Categoria"
        title={category.title}
        description={`${UI_TEXT.body} ${category.title.toLowerCase()}.`}
        icon={Grid}
        accent="amber"
      />

      <div className="space-y-10">
        {diseases.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <Stethoscope className="h-5 w-5 text-primary" />
              {UI_TEXT.diseases}
            </h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {diseases.map((disease) => (
                <EntityCard
                  key={disease.id}
                  to={`/consulta-vet/doencas/${disease.slug}`}
                  title={disease.title}
                  subtitle={disease.category}
                  description={disease.quickSummary}
                  entityType="disease"
                  entityId={disease.id}
                />
              ))}
            </div>
          </section>
        )}

        {medications.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <Pill className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {UI_TEXT.medications}
            </h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {medications.map((medication) => (
                <EntityCard
                  key={medication.id}
                  to={`/consulta-vet/medicamentos/${medication.slug}`}
                  title={medication.title}
                  subtitle={medication.pharmacologicClass}
                  description={medication.indications.join(', ')}
                  entityType="medication"
                  entityId={medication.id}
                />
              ))}
            </div>
          </section>
        )}

        {consensos.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              {UI_TEXT.consensos}
            </h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {consensos.map((consenso) => (
                <EntityCard
                  key={consenso.id}
                  to={`/consulta-vet/consensos/${consenso.slug}`}
                  title={consenso.title}
                  subtitle={`${consenso.organization || UI_TEXT.noOrganization}${consenso.year ? ` \u2022 ${consenso.year}` : ''}`}
                  description={consenso.description || ''}
                  entityType="consensus"
                  entityId={consenso.id}
                />
              ))}
            </div>
          </section>
        )}

        {diseases.length === 0 && medications.length === 0 && consensos.length === 0 && (
          <div className="rounded-2xl border border-border bg-card py-16 text-center">
            <Grid className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h2 className="mb-2 text-lg font-medium text-foreground">{UI_TEXT.emptyTitle}</h2>
            <p className="text-muted-foreground">{UI_TEXT.emptyBody}</p>
          </div>
        )}
      </div>
    </div>
  );
}
