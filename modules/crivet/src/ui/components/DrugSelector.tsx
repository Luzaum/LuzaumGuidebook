import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Beaker, BookOpen, Check, ChevronRight, Search, X } from 'lucide-react';
import { Drug, DrugCategory } from '../../shared/types/drug';
import { cn } from '../lib/utils';
import { formatRegimeLabel, getSupportedRegimes } from '../lib/drugContent';
import { DrugReferenceCard } from './DrugReferenceCard';
import { InfoModal } from './InfoModal';
import { SectionCard } from './SectionCard';

interface DrugSelectorProps {
  drugs: Drug[];
  selectedDrug: Drug | null;
  onSelect: (drug: Drug | null) => void;
  patientWeight: number;
}

const categories: { id: DrugCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'anestesicos_analgesicos', label: 'Anestesia e analgesia' },
  { id: 'sedativos_tranquilizantes', label: 'Sedação' },
  { id: 'opioides', label: 'Opioides' },
  { id: 'vasopressores_inotropicos', label: 'Vasoativos' },
  { id: 'antiarritmicos', label: 'Antiarrítmicos' },
  { id: 'anticonvulsivantes', label: 'Anticonvulsivantes' },
  { id: 'diureticos', label: 'Diuréticos' },
  { id: 'metabolicos_insulina', label: 'Metabólicos' },
  { id: 'outros', label: 'Outros' },
];

export const DrugSelector: React.FC<DrugSelectorProps> = ({
  drugs,
  selectedDrug,
  onSelect,
  patientWeight,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'all'>('all');
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [isChoosing, setIsChoosing] = useState(!selectedDrug);

  useEffect(() => {
    if (selectedDrug) setIsChoosing(false);
  }, [selectedDrug]);

  const filteredDrugs = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('pt-BR');
    return drugs.filter((drug) => {
      const matchesText = !query || drug.namePt.toLocaleLowerCase('pt-BR').includes(query) ||
        drug.synonyms.some((synonym) => synonym.toLocaleLowerCase('pt-BR').includes(query));
      return matchesText && (selectedCategory === 'all' || drug.category === selectedCategory);
    });
  }, [drugs, searchTerm, selectedCategory]);

  const selectDrug = (drug: Drug) => {
    onSelect(drug);
    setIsChoosing(false);
  };

  return (
    <>
      <SectionCard step={2} icon={Beaker} title="Fármaco" subtitle={`Paciente de ${patientWeight} kg`} complete={Boolean(selectedDrug)}>
        {selectedDrug && !isChoosing ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/25 dark:bg-emerald-500/[0.07]">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">{selectedDrug.namePt}</h3>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{selectedDrug.pharmacologicalClass}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{selectedDrug.clinicalSummary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {getSupportedRegimes(selectedDrug).map((regime) => (
                    <span key={regime} className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
                      {formatRegimeLabel(regime)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-emerald-200/70 pt-3 dark:border-emerald-500/15">
              <button type="button" onClick={() => setIsChoosing(true)} className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                Trocar fármaco
              </button>
              <button type="button" onClick={() => setShowAdditionalInfo(true)} aria-label={`Informações adicionais sobre ${selectedDrug.namePt}`} className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 text-sm font-semibold leading-4 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500/20 dark:bg-slate-900 dark:text-emerald-300">
                <BookOpen className="h-4 w-4 shrink-0" />
                <span>Informações<br />adicionais</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Buscar fármaco"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                autoFocus={isChoosing && Boolean(selectedDrug)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              {selectedDrug && (
                <button type="button" onClick={() => setIsChoosing(false)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:bg-slate-200" aria-label="Cancelar troca">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'min-h-9 shrink-0 rounded-full px-3 text-xs font-semibold transition-colors',
                    selectedCategory === category.id
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300',
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="mt-1 max-h-[410px] divide-y divide-slate-100 overflow-y-auto rounded-xl border border-slate-200 bg-white custom-scrollbar dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              {filteredDrugs.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">Nenhum fármaco encontrado.</div>
              ) : filteredDrugs.map((drug) => {
                const isSelected = selectedDrug?.id === drug.id;
                return (
                  <button key={drug.id} type="button" onClick={() => selectDrug(drug)} className={cn('group flex min-h-[72px] w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60', isSelected && 'bg-emerald-50 dark:bg-emerald-500/[0.07]')}>
                    <div className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', isSelected ? 'bg-emerald-600 text-white' : drug.highAlert ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10' : 'bg-slate-100 text-slate-400 dark:bg-slate-800')}>
                      {isSelected ? <Check className="h-4 w-4" /> : drug.highAlert ? <AlertTriangle className="h-4 w-4" /> : <Beaker className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-bold text-slate-900 dark:text-white">{drug.namePt}</span>
                        {drug.highAlert && <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-orange-600">Alta vigilância</span>}
                      </div>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{drug.clinicalSummary}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </SectionCard>

      <InfoModal
        open={showAdditionalInfo}
        onClose={() => setShowAdditionalInfo(false)}
        title={selectedDrug ? `Informações adicionais • ${selectedDrug.namePt}` : 'Informações adicionais'}
        subtitle="Dados farmacológicos, uso clínico e fontes do acervo"
        icon={<BookOpen className="h-5 w-5" />}
      >
        {selectedDrug && <DrugReferenceCard drug={selectedDrug} categories={categories} condensed />}
      </InfoModal>
    </>
  );
};
