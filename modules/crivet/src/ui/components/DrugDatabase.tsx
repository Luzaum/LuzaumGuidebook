import React, { useState, useMemo } from 'react';
import { Drug, DrugCategory } from '../../shared/types/drug';
import { drugCatalog } from '../../catalog/drugs';
import { Search, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { DrugReferenceCard } from './DrugReferenceCard';
import { PageHeader } from './PageHeader';

interface DrugDatabaseProps {
  onUseInCalculator: (drug: Drug) => void;
}

export const DrugDatabase: React.FC<DrugDatabaseProps> = ({ onUseInCalculator }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DrugCategory | 'all'>('all');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(drugCatalog[0] ?? null);

  const categories: { id: DrugCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'anestesicos_analgesicos', label: 'Anestésicos' },
    { id: 'sedativos_tranquilizantes', label: 'Sedativos' },
    { id: 'opioides', label: 'Opioides' },
    { id: 'vasopressores_inotropicos', label: 'Vasopressores' },
    { id: 'antiarritmicos', label: 'Antiarrítmicos' },
    { id: 'anticonvulsivantes', label: 'Anticonvulsivantes' },
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
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        icon={Database}
        title="Banco de fármacos"
        description="Monografias alinhadas ao acervo (Lumb & Jones, Plumb's, Ettinger)"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <aside className="space-y-3 lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar fármaco..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                    selectedCategory === category.id
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="max-h-[min(60vh,520px)] space-y-1 overflow-y-auto custom-scrollbar">
              {filteredDrugs.map((drug) => (
                <button
                  key={drug.id}
                  type="button"
                  onClick={() => setSelectedDrug(drug)}
                  className={cn(
                    'flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors',
                    selectedDrug?.id === drug.id
                      ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800',
                  )}
                >
                  <span className="text-sm font-semibold">{drug.namePt}</span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">
                    {categories.find((c) => c.id === drug.category)?.label}
                  </span>
                </button>
              ))}
              {filteredDrugs.length === 0 && (
                <p className="py-6 text-center text-sm text-slate-500">Nenhum fármaco encontrado.</p>
              )}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedDrug ? (
              <motion.div
                key={selectedDrug.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <DrugReferenceCard
                  drug={selectedDrug}
                  categories={categories}
                  onUseInCalculator={onUseInCalculator}
                />
              </motion.div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">Selecione um fármaco na lista.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
