import React, { useState } from 'react';
import { Species, Scale, PainType } from '../types';
import { DOG_SCALES } from '../data/dog-scales';
import { CAT_SCALES } from '../data/cat-scales';
import ScaleCard from '../components/ScaleCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, X } from 'lucide-react';
import { SpeciesPortrait } from '@/components/SpeciesPortraitCards';

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
  const [infoScale, setInfoScale] = useState<Scale | null>(null);

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
      {/* Top back button and title header */}
      <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/65 py-1.5 pl-2 pr-3 dark:border-slate-800/80 dark:bg-slate-900/55">
          <span className="h-9 w-9 overflow-hidden rounded-xl bg-white shadow-sm">
            <SpeciesPortrait species={species} decorative className="h-full w-full" />
          </span>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400">Paciente</p>
            <h3 className="text-xs font-black text-slate-750 dark:text-slate-100">
              {species === 'dog' ? 'Escalas caninas' : 'Escalas felinas'}
            </h3>
          </div>
        </div>
      </div>

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
                onInfo={setInfoScale}
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

      <AnimatePresence>
        {infoScale && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm border-0"
              onClick={() => setInfoScale(null)}
              aria-label="Fechar detalhes"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-teal-50">
                    {infoScale.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {infoScale.developer}
                  </p>
                </div>
                <button
                  onClick={() => setInfoScale(null)}
                  className="rounded-full p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
                    Protocolo de Avaliação
                  </h5>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    {infoScale.assessmentProtocol.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
                    Referências
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                    {infoScale.references.map((ref, idx) => (
                      <li key={idx}>{ref}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScaleSelectionScreen;
