import React, { useEffect, useMemo, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { EntityCard } from '../components/shared/EntityCard';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { getDiseaseRepository } from '../services/diseaseRepository';
import { DiseaseRecord } from '../types/disease';
import { formatSpeciesList } from '../utils/navigation';

const UI_TEXT = {
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

  useEffect(() => {
    const loadData = async () => {
      const normalizedQuery = query.trim();
      const nextDiseases = normalizedQuery
        ? await diseaseRepository.search(normalizedQuery)
        : await diseaseRepository.list();

      setDiseases(nextDiseases);
    };

    void loadData();
  }, [diseaseRepository, query]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <section className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Stethoscope className="h-3.5 w-3.5" />
              {UI_TEXT.title}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{UI_TEXT.title}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{UI_TEXT.body}</p>
          </div>

          <div className="w-full xl:max-w-[420px]">
            <ModuleSearchInput
              value={query}
              onChange={setQuery}
              placeholder={UI_TEXT.placeholder}
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{UI_TEXT.resultsLabel}</h2>
          <span className="text-sm text-muted-foreground">{diseases.length}</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {diseases.map((disease) => (
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

          {diseases.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">{UI_TEXT.empty}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
