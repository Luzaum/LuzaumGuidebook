import React, { useEffect, useState } from 'react';
import { Search, Pill } from 'lucide-react';
import { medicationRepository } from '../services/adapters/local/localMedicationRepository';
import { MedicationRecord } from '../types/medication';
import { EntityCard } from '../components/shared/EntityCard';

export function MedicationsPage() {
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (query.trim()) {
        setMedications(await medicationRepository.search(query));
      } else {
        setMedications(await medicationRepository.list());
      }
    };
    loadData();
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Medicamentos</h1>
          <p className="text-muted-foreground">Posologias e informações essenciais para decisão clínica.</p>
        </div>

        <div className="relative w-full md:w-[380px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por princípio ativo ou nome comercial..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {medications.map((medication) => (
          <EntityCard
            key={medication.id}
            to={`/consulta-vet/medicamentos/${medication.slug}`}
            title={medication.title}
            subtitle={medication.pharmacologicClass}
            description={medication.indications.join(', ')}
            icon={<Pill className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
            entityType="medication"
            entityId={medication.id}
          />
        ))}

        {medications.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">Nenhum medicamento encontrado para "{query}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
