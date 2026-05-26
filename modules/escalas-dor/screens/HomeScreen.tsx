import React from 'react';
import { Species } from '../types';
import { motion } from 'framer-motion';
import { SpeciesPortraitCards } from '@/components/SpeciesPortraitCards';
import { BookOpen, AlertTriangle, Bookmark } from 'lucide-react';

interface HomeScreenProps {
  selectedSpecies: Species | null;
  onSelectSpecies: (species: Species) => void;
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedSpecies,
  onSelectSpecies,
  onNavigate,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 max-w-4xl mx-auto px-4 py-3"
    >
      {/* Header section with title */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white sm:text-4xl">
          Avaliação de Dor Veterinária
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Ferramenta clínica de suporte à decisão baseada nas principais escalas de dor validadas para cães e gatos.
        </p>
      </motion.div>

      {/* Species Selection cards */}
      <motion.div variants={itemVariants} className="my-8">
        <SpeciesPortraitCards
          variant="teal"
          canineLabel="CÃO"
          felineLabel="GATO"
          canineSubtitle="Escalas, caretas e diretrizes"
          felineSubtitle="Careta facial, UNESP-Botucatu e guias"
          canineSelected={selectedSpecies === 'dog'}
          felineSelected={selectedSpecies === 'cat'}
          onSelectCanine={() => onSelectSpecies('dog')}
          onSelectFeline={() => onSelectSpecies('cat')}
          showHeading={true}
        />
      </motion.div>

      {/* Quick Action Navigation Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850"
      >
        <button
          onClick={() => onNavigate('guide')}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/60 p-4 transition-all duration-300 hover:border-teal-500/30 hover:shadow-md text-left group"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-teal-150">
              Guia de Manejo
            </h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Protocolos e classes farmacológicas
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('rescue')}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/60 p-4 transition-all duration-300 hover:border-rose-500/30 hover:shadow-md text-left group"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-rose-250">
              Resgate Analgésico
            </h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Limiares de intervenção e tiers
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('references')}
          className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/60 p-4 transition-all duration-300 hover:border-teal-500/30 hover:shadow-md text-left group"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform">
            <Bookmark className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-teal-150">
              Referências
            </h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Artigos e fontes científicas
            </p>
          </div>
        </button>
      </motion.div>

      {/* Footer credit */}
      <motion.p
        variants={itemVariants}
        className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest pt-8"
      >
        Fonte Científica: unesp / animalpain.org — FMVZ/UNESP-Botucatu
      </motion.p>
    </motion.div>
  );
};

export default HomeScreen;
