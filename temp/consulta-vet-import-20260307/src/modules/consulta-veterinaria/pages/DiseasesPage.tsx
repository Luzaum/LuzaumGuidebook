import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { diseaseRepository } from '../services/adapters/local/localDiseaseRepository';
import { DiseaseRecord } from '../types/disease';
import { EntityCard } from '../components/shared/EntityCard';

export function DiseasesPage() {
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (query) {
        setDiseases(await diseaseRepository.search(query));
      } else {
        setDiseases(await diseaseRepository.list());
      }
    };
    loadData();
  }, [query]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Doenças</h1>
          <p className="text-muted-foreground">Consulte informações detalhadas sobre doenças em cães e gatos.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, sinônimo ou tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="p-2.5 bg-card border border-border rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

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
        {diseases.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground">Nenhuma doença encontrada para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
