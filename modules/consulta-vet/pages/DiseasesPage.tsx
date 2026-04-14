import React, { useEffect, useMemo, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EntityCard } from '../components/shared/EntityCard';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { DiseaseRecord } from '../types/disease';
import { formatSpeciesList } from '../utils/navigation';

const UI_TEXT = {
  eyebrow: '\u00c1rea cl\u00ednica',
  title: 'Doen\u00e7as',
  body: 'Conte\u00fado editorial cl\u00ednico organizado para consulta pr\u00e1tica no atendimento.',
  placeholder: 'Buscar por nome, sin\u00f4nimo ou palavra-chave...',
  resultsLabel: 'Resultados',
  empty: 'Nenhuma doen\u00e7a encontrada com os filtros atuais.',
} as const;

export function DiseasesPage() {
  const diseaseRepository = useMemo(() => getDiseaseRepository(), []);
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const normalizedQuery = query.trim();
        const nextDiseases = normalizedQuery
          ? await diseaseRepository.search(normalizedQuery)
          : await diseaseRepository.list();

        if (!isMounted) return;
        setDiseases(nextDiseases);
      } catch (loadError) {
        if (!isMounted) return;
        setDiseases([]);
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar doenças.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [diseaseRepository, query]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow={UI_TEXT.eyebrow}
        title={UI_TEXT.title}
        description={UI_TEXT.body}
        icon={Stethoscope}
        accent="primary"
        aside={
          <ModuleSearchInput
            value={query}
            onChange={setQuery}
            placeholder={UI_TEXT.placeholder}
            className="w-full"
          />
        }
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.resultsLabel}</h2>
          <span className="text-sm text-muted-foreground">{isLoading ? '...' : diseases.length}</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {isLoading && (
            <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">Carregando doenças...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="col-span-full rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!isLoading && !error && diseases.map((disease) => (
            <EntityCard
              key={disease.id}
              to={`/consulta-vet/doencas/${disease.slug}`}
              title={disease.title}
              subtitle={`${disease.category} \u2022 ${formatSpeciesList(disease.species)}`}
              description={disease.quickSummary}
              entityType="disease"
              entityId={disease.id}
            />
          ))}

          {!isLoading && !error && diseases.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">{UI_TEXT.empty}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
