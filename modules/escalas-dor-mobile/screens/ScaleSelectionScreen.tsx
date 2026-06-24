import React, { useState } from 'react';
import { Species, Scale, PainType } from '../types';
import { DOG_SCALES } from '../data/dog-scales';
import { CAT_SCALES } from '../data/cat-scales';
import ScaleCard from '../components/ScaleCard';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface ScaleSelectionScreenProps {
  species: Species;
  onSelectScale: (scale: Scale) => void;
  onBack: () => void;
}

const ScaleSelectionScreen: React.FC<ScaleSelectionScreenProps> = ({
  species,
  onSelectScale,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<PainType>('acute');

  // Collect the scales based on chosen species
  const allScales = species === 'dog' ? DOG_SCALES : CAT_SCALES;

  // Filter based on selected pain type (acute vs chronic)
  const filteredScales = allScales.filter((scale) => scale.painType === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4">
      {/* Segmented control tabs for Acute vs Chronic */}
      <div className="relative flex justify-center">
        <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 w-full sm:w-auto sm:min-w-[320px]">
          <button
            onClick={() => setActiveTab('acute')}
            className={`relative flex-1 text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors z-10 ${
              activeTab === 'acute'
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {activeTab === 'acute' && (
              <motion.div
                layoutId="activePainType"
                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/10 -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            ⚡ Dor Aguda
          </button>

          <button
            onClick={() => setActiveTab('chronic')}
            className={`relative flex-1 text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors z-10 ${
              activeTab === 'chronic'
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {activeTab === 'chronic' && (
              <motion.div
                layoutId="activePainType"
                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/10 -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            ⏳ Dor Crônica
          </button>
        </div>
      </div>

      {/* Grid containingfiltered scales */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeTab} // triggers re-animation when activeTab changes
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {filteredScales.length > 0 ? (
          filteredScales.map((scale) => (
            <motion.div key={scale.id} variants={cardVariants}>
              <ScaleCard
                scale={scale}
                onSelect={onSelectScale}
                onInfo={(s) => {
                  alert(
                    `📚 Protocolo de Avaliação (${s.name}):\n\n` +
                      s.assessmentProtocol.join('\n') +
                      `\n\n🔬 Referências:\n` +
                      s.references.join('\n')
                  );
                }}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/30 dark:bg-slate-900/10">
            <BookOpen className="h-10 w-10 text-slate-400 mb-3" />
            <h4 className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Nenhuma escala cadastrada
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-555 mt-1">
              Não há escalas de dor cadastradas para esta categoria específica no momento.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ScaleSelectionScreen;
