import React, { useState, useMemo } from 'react';
import { Drug, DrugCategory } from '../../shared/types/drug';
import { drugCatalog } from '../../catalog/drugs';
import { Search, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DrugReferenceCard } from './DrugReferenceCard';

interface DrugDatabaseProps {
  onUseInCalculator: (drug: Drug) => void;
}

export const DrugDatabase: React.FC<DrugDatabaseProps> = ({ onUseInCalculator }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'all'>('all');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

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
    return drugCatalog.filter((drug) => {
      const matchesSearch =
        drug.namePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.synonyms.some((synonym) => synonym.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || drug.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Buscar fármaco..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500"
            />
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all',
                  selectedCategory === category.id
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-400'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="max-h-[calc(100vh-280px)] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {filteredDrugs.map((drug) => (
              <button
                key={drug.id}
                type="button"
                onClick={() => setSelectedDrug(drug)}
                className={cn(
                  'flex w-full flex-col gap-1 rounded-xl border p-3 text-left transition-all',
                  selectedDrug?.id === drug.id
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm dark:border-indigo-500/50 dark:bg-indigo-500/10'
                    : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:bg-slate-800/50',
                )}
              >
                <h3
                  className={cn(
                    'text-sm font-bold',
                    selectedDrug?.id === drug.id ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200',
                  )}
                >
                  {drug.namePt}
                </h3>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {categories.find((category) => category.id === drug.category)?.label}
                </p>
              </button>
            ))}
            {filteredDrugs.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Nenhum fármaco encontrado.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          {selectedDrug ? (
            <motion.div
              key={selectedDrug.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-w-0"
            >
              <DrugReferenceCard
                drug={selectedDrug}
                categories={categories}
                onUseInCalculator={onUseInCalculator}
              />
            </motion.div>
          ) : (
            <div className="flex min-h-[400px] h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-400 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-500">
              <BookOpen className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
              <h3 className="mb-2 text-xl font-bold text-slate-600 dark:text-slate-400">Banco de Fármacos</h3>
              <p className="max-w-md">
                Selecione um fármaco na lista ao lado para visualizar informações detalhadas,
                farmacologia, segurança e diretrizes de preparo.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
