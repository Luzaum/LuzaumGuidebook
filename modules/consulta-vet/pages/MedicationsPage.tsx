import React, { useEffect, useMemo, useState } from 'react';
import { Pill } from 'lucide-react';
import { EntityCard } from '../components/shared/EntityCard';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { getMedicationRepository } from '../services/medicationRepository';
import { MedicationRecord } from '../types/medication';

const UI_TEXT = {
  title: 'Medicamentos',
  body: 'Posologias, apresenta\u00e7\u00f5es e observa\u00e7\u00f5es essenciais para decis\u00e3o cl\u00ednica.',
  placeholder: 'Buscar por princ\u00edpio ativo, nome comercial ou indica\u00e7\u00e3o...',
  resultsLabel: 'Resultados',
  empty: 'Nenhum medicamento encontrado com os filtros atuais.',
} as const;

export function MedicationsPage() {
  const medicationRepository = useMemo(() => getMedicationRepository(), []);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const normalizedQuery = query.trim();
      const nextMedications = normalizedQuery
        ? await medicationRepository.search(normalizedQuery)
        : await medicationRepository.list();

      setMedications(nextMedications);
    };

    void loadData();
  }, [medicationRepository, query]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <section className="rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
              <Pill className="h-3.5 w-3.5" />
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
          <span className="text-sm text-muted-foreground">{medications.length}</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {medications.map((medication) => (
            <EntityCard
              key={medication.id}
              to={`/consulta-vet/medicamentos/${medication.slug}`}
              title={medication.title}
              subtitle={medication.pharmacologicClass}
              description={medication.indications.join(', ')}
              icon={<Pill className="h-5 w-5 text-emerald-600" />}
              entityType="medication"
              entityId={medication.id}
            />
          ))}

          {medications.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">{UI_TEXT.empty}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
