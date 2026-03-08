import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { DiseaseRecord } from '../types/disease';
import { EntityCard } from '../components/shared/EntityCard';

export function DiseasesPage() {
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (query.trim()) {
        setDiseases(await diseaseRepository.search(query));
      } else {
        setDiseases(await diseaseRepository.list());
      }
    };
    loadData();
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Doenças</h1>
          <p className="text-muted-foreground">Informações clínicas organizadas para consulta prática.</p>
        </div>

        <div className="relative w-full md:w-[380px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome, sinônimo ou tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

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

        {diseases.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">Nenhuma doença encontrada para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
