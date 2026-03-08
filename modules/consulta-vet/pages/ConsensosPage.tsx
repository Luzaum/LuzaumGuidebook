import React, { useEffect, useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { consensoRepository } from '../services/adapters/local/localConsensoRepository';
import { ConsensusRecord } from '../types/consenso';
import { EntityCard } from '../components/shared/EntityCard';

export function ConsensosPage() {
  const [consensos, setConsensos] = useState<ConsensusRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (query.trim()) {
        setConsensos(await consensoRepository.search(query));
      } else {
        setConsensos(await consensoRepository.list());
      }
    };
    loadData();
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Consensos</h1>
          <p className="text-muted-foreground">Documentos de referência clínica para consulta rápida.</p>
        </div>

        <div className="relative w-full md:w-[380px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por título, fonte ou tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {consensos.map((c) => (
          <EntityCard
            key={c.id}
            to={`/consulta-vet/consensos/${c.slug}`}
            title={c.title}
            subtitle={`${c.sourceOrganization} • ${c.year}`}
            description={c.summary}
            icon={<FileText className="h-5 w-5 text-primary" />}
            entityType="consensus"
            entityId={c.id}
          />
        ))}

        {consensos.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">Nenhum consenso encontrado para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
