import React, { useEffect, useMemo, useState } from 'react';
import { Pill, LayoutGrid } from 'lucide-react';
import { ConsultaVetPageHero } from '../components/layout/ConsultaVetPageHero';
import { EntityCard } from '../components/shared/EntityCard';
import { ModuleSearchInput } from '../components/shared/ModuleSearchInput';
import { getMedicationRepository } from '../services/medicationRepository';
import { MedicationRecord } from '../types/medication';
import { cn } from '../../../lib/utils';
import {
  getMedicationTherapeuticClassIds,
  getPrimaryMedicationTherapeuticClass,
  MEDICATION_THERAPEUTIC_CLASSES,
} from '../utils/medicationTherapeuticClasses';

const UI_TEXT = {
  eyebrow: 'Farmacologia',
  title: 'Medicamentos & Classes',
  body: 'Busca rápida de posologias, apresentações e diretrizes de dosagem organizadas por classes farmacológicas.',
  placeholder: 'Buscar por princípio ativo, nome comercial ou indicação...',
  resultsLabel: 'Catálogo de Fármacos',
  empty: 'Nenhum medicamento encontrado com os filtros atuais.',
  allClasses: 'Todas as Classes',
} as const;

export const MEDICATION_CLASSES = MEDICATION_THERAPEUTIC_CLASSES;

export function getMedicationClassInfo(slug: string) {
  const match = MEDICATION_CLASSES.find((item) => item.medicationSlugs.includes(slug));
  if (match) {
    return { label: match.label, icon: match.icon, theme: match.theme };
  }
  return { label: 'Outras Classes', icon: Pill, theme: 'default' };
}

export function MedicationsPage() {
  const medicationRepository = useMemo(() => getMedicationRepository(), []);

  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega os medicamentos
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const nextMedications = query.trim()
          ? await medicationRepository.search(query.trim())
          : await medicationRepository.list();

        if (!isMounted) return;
        setMedications(nextMedications);
      } catch (loadError) {
        if (!isMounted) return;
        setMedications([]);
        setError('Não foi possível carregar o catálogo de princípios ativos.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, [medicationRepository, query]);

  // Filtra medicamentos com base na classe selecionada no sidebar
  const filteredMedications = useMemo(() => {
    if (selectedClass === 'all') return medications;
    const targetClass = MEDICATION_CLASSES.find((c) => c.slug === selectedClass);
    if (!targetClass) return medications;
    return medications.filter((medication) => getMedicationTherapeuticClassIds(medication).includes(targetClass.slug));
  }, [medications, selectedClass]);

  // Contagem dinâmica em tempo real de itens por classe
  const classCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    medications.forEach((m) => {
      getMedicationTherapeuticClassIds(m).forEach((classId) => {
        counts[classId] = (counts[classId] || 0) + 1;
      });
    });
    return counts;
  }, [medications]);

  // Filtra apenas as classes que possuem itens ativos no momento
  const activeClasses = useMemo(() => {
    return MEDICATION_CLASSES.filter((c) => (classCounts[c.slug] || 0) > 0);
  }, [classCounts]);

  return (
    <div className="mx-auto w-full max-w-[1720px] space-y-8 p-4 md:p-8">
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
            className="w-full max-w-md"
          />
        }
      />

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        {/* Sidebar de Classes Terapêuticas com Glassmorphism */}
        <aside className="w-full shrink-0 rounded-2xl border border-border/80 bg-background/50 p-5 backdrop-blur-xs xl:w-72">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Classe Farmacológica</h3>
            <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
              {activeClasses.length} Ativas
            </span>
          </div>

          <nav className="flex flex-row flex-wrap gap-2 xl:flex-col xl:gap-1.5">
            <button
              type="button"
              aria-pressed={selectedClass === 'all'}
              onClick={() => setSelectedClass('all')}
              className={cn(
                'group flex min-h-11 items-center gap-3.5 rounded-xl border border-border/60 px-4 py-3 text-left text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none xl:w-full',
                selectedClass === 'all'
                  ? 'border-emerald-500 bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400 shadow-[0_0_12px_-3px_rgba(16,185,129,0.12)]'
                  : 'bg-card/50 text-foreground/80 hover:border-border-hover hover:bg-card'
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <LayoutGrid className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 text-muted-foreground" />
              </span>
              <span className="flex-1 text-left text-xs sm:text-sm font-semibold leading-tight whitespace-normal break-words">{UI_TEXT.allClasses}</span>
              <span className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0',
                selectedClass === 'all' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'
              )}>
                {medications.length}
              </span>
            </button>

            {activeClasses.map((cls) => {
              const isSelected = selectedClass === cls.slug;
              const IconComponent = cls.icon;

              return (
                <button
                  key={cls.slug}
                  type="button"
                  aria-pressed={isSelected}
                  title={cls.description}
                  onClick={() => setSelectedClass(cls.slug)}
                  className={cn(
                    'group flex min-h-11 items-center gap-3.5 rounded-xl border border-border/60 px-4 py-3 text-left text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none xl:w-full',
                    isSelected
                      ? cn('border-solid font-extrabold shadow-xs', cls.selectedClassName)
                      : 'bg-card/50 text-foreground/80 hover:border-border-hover hover:bg-card'
                  )}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    <IconComponent className={cn(
                      'h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none',
                      cls.iconClassName,
                    )} />
                  </span>
                  <span className="flex-1 text-left text-xs sm:text-sm font-semibold leading-tight whitespace-normal break-words">{cls.label}</span>
                  <span className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors shrink-0',
                    isSelected ? 'bg-background/80' : 'bg-muted text-muted-foreground'
                  )}>
                    {classCounts[cls.slug] || 0}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Grade de Medicamentos */}
        <main className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{UI_TEXT.resultsLabel}</h2>
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-foreground">
              {isLoading ? '...' : filteredMedications.length} {filteredMedications.length === 1 ? 'fármaco' : 'fármacos'}
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {isLoading && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-24 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">Buscando diretrizes farmacológicas...</p>
              </div>
            )}

            {!isLoading && error && (
              <div className="col-span-full rounded-2xl border border-destructive/30 bg-destructive/10 px-6 py-5">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {!isLoading && !error && filteredMedications.map((medication) => {
              const classInfo = getPrimaryMedicationTherapeuticClass(medication);

              return (
                <div
                  key={medication.id}
                  className="animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
                >
                  <EntityCard
                    to={`/consulta-vet/medicamentos/${medication.slug}`}
                    title={medication.title}
                    subtitle={`${classInfo?.label || 'Classe farmacológica a revisar'} \u2022 ${medication.pharmacologicClass}`}
                    description={medication.indications.join(', ')}
                    entityType="medication"
                    entityId={medication.id}
                    category={classInfo?.theme || 'default'}
                  />
                </div>
              );
            })}

            {!isLoading && !error && filteredMedications.length === 0 && (
              <div className="col-span-full rounded-2xl border border-border bg-card py-20 text-center">
                <p className="text-sm font-medium text-muted-foreground">{UI_TEXT.empty}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
