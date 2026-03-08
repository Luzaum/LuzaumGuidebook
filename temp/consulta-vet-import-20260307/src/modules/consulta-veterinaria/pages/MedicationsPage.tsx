import React, { useEffect, useState } from 'react';
import { Search, Filter, Pill } from 'lucide-react';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { MedicationRecord } from '../types/medication';
import { EntityCard } from '../components/shared/EntityCard';

export function MedicationsPage() {
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (query) {
        setMedications(await medicationRepository.search(query));
      } else {
        setMedications(await medicationRepository.list());
      }
    };
    loadData();
  }, [query]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Medicamentos</h1>
          <p className="text-muted-foreground">Consulte bulas, doses e calcule posologias para cães e gatos.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por princípio ativo ou comercial..."
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
        {medications.map((m) => (
          <EntityCard
            key={m.id}
            to={`/consulta-veterinaria/medicamentos/${m.slug}`}
            title={m.title}
            subtitle={m.pharmacologicClass}
            description={m.indications.join(', ')}
            tags={m.tags}
            icon={<Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            entityType="medication"
            entityId={m.id}
          />
        ))}
        {medications.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-muted-foreground">Nenhum medicamento encontrado para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
