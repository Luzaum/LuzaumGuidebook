import React, { useEffect, useMemo, useState } from 'react';
import { Pill } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EntityCard } from '../components/shared/EntityCard';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { getMedicationRepository } from '../services/medicationRepository';
import { MedicationRecord } from '../types/medication';

const UI_TEXT = {
  eyebrow: 'Farmacologia',
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const normalizedQuery = query.trim();
        const nextMedications = normalizedQuery
          ? await medicationRepository.search(normalizedQuery)
          : await medicationRepository.list();

        if (!isMounted) return;
        setMedications(nextMedications);
      } catch (loadError) {
        if (!isMounted) return;
        setMedications([]);
        setError(loadError instanceof Error ? loadError.message : 'Falha ao carregar medicamentos.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [medicationRepository, query]);

  return (
    <div className="mx-auto w-full max-w-[1560px] space-y-8 p-4 md:p-8">
      <ConsultaVetPageHero
        eyebrow={UI_TEXT.eyebrow}
        title={UI_TEXT.title}
        description={UI_TEXT.body}
        icon={Pill}
        accent="emerald"
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
          <span className="text-sm text-muted-foreground">{isLoading ? '...' : medications.length}</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {isLoading && (
            <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">Carregando medicamentos...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="col-span-full rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!isLoading && !error && medications.map((medication) => (
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

          {!isLoading && !error && medications.length === 0 && (
            <div className="col-span-full rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">{UI_TEXT.empty}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
