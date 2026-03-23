import React, { useState, useMemo } from 'react';
import { Drug, DrugCategory } from '../../shared/types/drug';
import { cn } from '../lib/utils';
import { Search, AlertTriangle, CheckCircle2, Beaker, X, Sparkles, BookOpen } from 'lucide-react';
import { DrugReferenceCard } from './DrugReferenceCard';
import { InfoModal } from './InfoModal';
import { TipButton } from './TipButton';
import { formatRegimeLabel, getSupportedRegimes } from '../lib/drugContent';

interface DrugSelectorProps {
  drugs: Drug[];
  selectedDrug: Drug | null;
  onSelect: (drug: Drug | null) => void;
}

export const DrugSelector: React.FC<DrugSelectorProps> = ({ drugs, selectedDrug, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'all'>('all');
  const [showReference, setShowReference] = useState(false);

  const categories: { id: DrugCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'anestesicos_analgesicos', label: 'Anestésicos/Analgésicos' },
    { id: 'sedativos_tranquilizantes', label: 'Sedativos/Tranquilizantes' },
    { id: 'opioides', label: 'Opioides' },
    { id: 'vasopressores_inotropicos', label: 'Vasopressores/Inotrópicos' },
    { id: 'antiarritmicos', label: 'Antiarrítmicos' },
    { id: 'anticonvulsivantes', label: 'Anticonvulsivantes' },
    { id: 'diureticos', label: 'Diuréticos' },
    { id: 'metabolicos_insulina', label: 'Metabólicos/Insulina' },
    { id: 'outros', label: 'Outros' },
  ];

  const filteredDrugs = useMemo(() => {
    return drugs.filter((drug) => {
      const matchesSearch =
        drug.namePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.synonyms.some((synonym) => synonym.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [drugs, searchTerm, selectedCategory]);

  if (selectedDrug) {
    return (
      <>
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Beaker className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">2. Fármaco Selecionado</h2>
              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                Confirme as informações do medicamento
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              title="Trocar fármaco"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 p-5 shadow-sm dark:border-emerald-500/50 dark:bg-emerald-500/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-400 md:text-2xl">
                    {selectedDrug.namePt}
                  </h3>
                  <TipButton
                    variant="book"
                    label="Tip"
                    compact
                    onClick={() => setShowReference(true)}
                  />
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-500/80">
                  {categories.find((category) => category.id === selectedDrug.category)?.label}
                </p>
                <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-emerald-900/80 dark:text-emerald-100/80">
                  {selectedDrug.clinicalSummary}
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {getSupportedRegimes(selectedDrug).map((regime) => (
                <span
                  key={regime}
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-slate-800 dark:text-emerald-400"
                >
                  {formatRegimeLabel(regime)}
                </span>
              ))}
              {selectedDrug.safetyMetadata?.dedicatedLineRequired && (
                <span className="flex items-center gap-1.5 rounded-lg bg-rose-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-700 shadow-sm dark:bg-rose-500/20 dark:text-rose-400">
                  <AlertTriangle className="h-4 w-4" /> Via Exclusiva
                </span>
              )}
              {selectedDrug.highAlert && (
                <span className="flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 shadow-sm dark:bg-amber-500/20 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" /> Alto Risco
                </span>
              )}
            </div>
          </div>
        </div>

        <InfoModal
          open={showReference}
          onClose={() => setShowReference(false)}
          title={`Banco de Fármacos • ${selectedDrug.namePt}`}
          subtitle="Referência rápida do fármaco selecionado"
          icon={<BookOpen className="h-5 w-5" />}
        >
          <DrugReferenceCard drug={selectedDrug} categories={categories} condensed />
        </InfoModal>
      </>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Beaker className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">2. Seleção de Fármaco</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            Escolha o medicamento para infusão
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Buscar fármaco por nome..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-base font-medium text-slate-800 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
          />
        </div>

        <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'whitespace-nowrap rounded-xl border-2 px-4 py-2 text-xs font-bold transition-all',
                selectedCategory === category.id
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700',
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid max-h-[450px] grid-cols-1 gap-4 overflow-y-auto pr-2 custom-scrollbar sm:grid-cols-2 xl:grid-cols-3">
        {filteredDrugs.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
            <Beaker className="mx-auto mb-3 h-12 w-12 text-slate-300 dark:text-slate-600" />
            <p className="font-medium">Nenhum fármaco encontrado com os filtros atuais.</p>
          </div>
        ) : (
          filteredDrugs.map((drug) => (
            <button
              key={drug.id}
              type="button"
              onClick={() => onSelect(drug)}
              className={cn(
                'group flex flex-col gap-3 rounded-xl border-2 bg-white p-4 text-left transition-all hover:shadow-md dark:bg-slate-900',
                'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 dark:border-slate-700 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/5',
              )}
            >
              <div className="flex w-full items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-slate-800 transition-colors group-hover:text-emerald-700 dark:text-slate-200 dark:group-hover:text-emerald-400">
                    {drug.namePt}
                  </h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {categories.find((category) => category.id === drug.category)?.label}
                  </p>
                </div>
                {drug.highAlert ? (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
              </div>

              <p className="line-clamp-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                {drug.clinicalSummary}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {getSupportedRegimes(drug).map((regime) => (
                  <span
                    key={regime}
                    className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {formatRegimeLabel(regime)}
                  </span>
                ))}
                {drug.safetyMetadata?.dedicatedLineRequired && (
                  <span className="flex items-center gap-1 rounded-lg bg-rose-100 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-700 dark:bg-rose-500/20 dark:text-rose-400">
                    <AlertTriangle className="h-3 w-3" /> Via Exclusiva
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
