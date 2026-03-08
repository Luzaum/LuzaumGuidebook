import React, { useEffect, useState } from 'react';
import { Search, Filter, FileText } from 'lucide-react';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';

export function ConsensosPage() {
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (query) {
        setConsensos(await consensoRepository.search(query));
      } else {
        setConsensos(await consensoRepository.list());
      }
    };
    loadData();
  }, [query]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Consensos e Diretrizes</h1>
          <p className="text-muted-foreground">Acesse PDFs de consensos, guidelines e artigos importantes.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar consensos..."
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
        {consensos.map((c) => (
          <EntityCard
            key={c.id}
            to={`/consulta-veterinaria/consensos/${c.slug}`}
            title={c.title}
            subtitle={`${c.sourceOrganization} • ${c.year}`}
            description={c.summary}
            tags={c.tags}
            icon={<FileText className="w-5 h-5 text-primary" />}
            entityType="consensus"
            entityId={c.id}
          />
        ))}
        {consensos.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground">Nenhum consenso encontrado para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
