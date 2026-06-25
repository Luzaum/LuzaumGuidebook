import React, { useState, useMemo } from 'react';
import { Drug, DrugCategory } from '../../shared/types/drug';
import { cn } from '../lib/utils';
import { Search, AlertTriangle, CheckCircle2, Beaker, X, Sparkles, BookOpen } from 'lucide-react';
import { DrugReferenceCard } from './DrugReferenceCard';
import { InfoModal } from './InfoModal';
import { TipButton } from './TipButton';
import { formatRegimeLabel, getSupportedRegimes } from '../lib/drugContent';
import { motion } from 'framer-motion';

interface DrugSelectorProps {
  drugs: Drug[];
  selectedDrug: Drug | null;
  onSelect: (drug: Drug | null) => void;
  patientWeight: number;
}

export const DrugSelector: React.FC<DrugSelectorProps> = ({
  drugs,
  selectedDrug,
  onSelect,
  patientWeight,
}) => {
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

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 md:p-6">
      {/* Title Header */}
      <div className="mb-3 flex items-center gap-3 md:mb-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 md:h-10 md:w-10">
          <Beaker className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">2. Seleção de Fármaco</h2>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            Escolha o medicamento para infusão
          </p>
        </div>
      </div>

      {/* Selected Drug Banner (Active State Summary) */}
      {selectedDrug && (
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 p-4 shadow-sm dark:border-emerald-500/50 dark:bg-emerald-950/15 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold tracking-tight text-emerald-900 dark:text-emerald-450 md:text-2xl">
                  {selectedDrug.namePt}
                </h3>
                <span className="rounded-lg bg-emerald-550 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white dark:bg-emerald-600">
                  Fármaco Ativo
                </span>
                <TipButton
                  variant="book"
                  label="Ver Referência"
                  compact
                  onClick={() => setShowReference(true)}
                />
              </div>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-500/80">
                {categories.find((category) => category.id === selectedDrug.category)?.label}
              </p>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-emerald-900/85 dark:text-emerald-100/80">
                {selectedDrug.clinicalSummary}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onSelect(null)}
                className="flex h-10 px-4 items-center justify-center rounded-xl text-xs font-black border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:bg-slate-800 dark:hover:bg-slate-750 transition-colors cursor-pointer"
              >
                Limpar
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-emerald-150 dark:border-emerald-500/10 pt-3">
            {getSupportedRegimes(selectedDrug).map((regime) => (
              <span
                key={regime}
                className="rounded-lg border border-emerald-150 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-slate-800 dark:text-emerald-400"
              >
                {formatRegimeLabel(regime)}
              </span>
            ))}
            {selectedDrug.safetyMetadata?.dedicatedLineRequired && (
              <span className="flex items-center gap-1.5 rounded-lg bg-rose-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-700 shadow-sm dark:bg-rose-500/20 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" /> Via Exclusiva
              </span>
            )}
            {selectedDrug.highAlert && (
              <span className="flex items-center gap-1.5 rounded-lg bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 shadow-sm dark:bg-amber-500/20 dark:text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" /> Alto Risco
              </span>
            )}
          </div>
        </div>
      )}

      {/* Warnings & Inputs Section */}
      <div className="space-y-3 md:space-y-4">
        {patientWeight <= 0 && (
          <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 p-3 text-xs font-bold text-amber-700 dark:text-amber-450">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>Defina o peso do paciente no Passo 1 para ativar os cálculos automáticos e ver as faixas de doses indicadas.</p>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Buscar fármaco por nome..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-base font-medium text-slate-800 transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20"
          />
        </div>

        {/* Categories Bar */}
        <div className="-mx-2 flex gap-2 overflow-x-auto px-2 pb-2 scrollbar-hide">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className="relative min-h-10 shrink-0 min-w-max w-auto whitespace-nowrap rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/60 overflow-hidden cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 border-2 border-emerald-500 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors duration-200", isActive ? "text-emerald-700 dark:text-emerald-400" : "")}>
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Drugs */}
      <div className="grid max-h-[58dvh] grid-cols-1 gap-3 overflow-y-auto pr-1 custom-scrollbar sm:max-h-[400px] sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {filteredDrugs.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
            <Beaker className="mx-auto mb-3 h-12 w-12 text-slate-300 dark:text-slate-650" />
            <p className="font-medium">Nenhum fármaco encontrado com os filtros atuais.</p>
          </div>
        ) : (
          filteredDrugs.map((drug) => {
            const isSelected = selectedDrug?.id === drug.id;
            return (
              <motion.button
                key={drug.id}
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(drug)}
                className={cn(
                  "group flex min-h-36 flex-col gap-3 rounded-xl border p-4 text-left shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/10 dark:border-emerald-550/40 dark:bg-emerald-950/10 ring-2 ring-emerald-500/10"
                    : "border-slate-200 hover:border-emerald-450 bg-white dark:border-slate-700 dark:bg-slate-900"
                )}
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className={cn(
                      "text-base font-bold tracking-tight transition-colors line-clamp-1",
                      isSelected ? "text-emerald-900 dark:text-emerald-400" : "text-slate-800 group-hover:text-emerald-700 dark:text-slate-200 dark:group-hover:text-emerald-400"
                    )}>
                      {drug.namePt}
                    </h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 line-clamp-1">
                      {categories.find((category) => category.id === drug.category)?.label}
                    </p>
                  </div>
                  {isSelected ? (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  ) : drug.highAlert ? (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/20">
                      <AlertTriangle className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
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

                <div className="mt-auto flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {isSelected && (
                    <span className="rounded-lg bg-emerald-550 text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest dark:bg-emerald-650">
                      Ativo
                    </span>
                  )}
                  {getSupportedRegimes(drug).map((regime) => (
                    <span
                      key={regime}
                      className={cn(
                        "rounded-lg px-2 py-1 text-[9px] font-bold uppercase tracking-widest border",
                        isSelected
                          ? "border-emerald-250 bg-white text-emerald-800 dark:border-emerald-500/20 dark:bg-slate-800 dark:text-emerald-400"
                          : "border-slate-100 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400"
                      )}
                    >
                      {formatRegimeLabel(regime)}
                    </span>
                  ))}
                  {drug.safetyMetadata?.dedicatedLineRequired && (
                    <span className="flex items-center gap-1 rounded-lg bg-rose-100 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-rose-700 dark:bg-rose-500/20 dark:text-rose-450">
                      <AlertTriangle className="h-3 w-3" /> Via Exclusiva
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Info Modal Reference */}
      <InfoModal
        open={showReference}
        onClose={() => setShowReference(false)}
        title={selectedDrug ? `Banco de Fármacos • ${selectedDrug.namePt}` : 'Banco de Fármacos'}
        subtitle="Referência rápida do fármaco selecionado"
        icon={<BookOpen className="h-5 w-5" />}
      >
        {selectedDrug && <DrugReferenceCard drug={selectedDrug} categories={categories} condensed />}
      </InfoModal>
    </div>
  );
};
