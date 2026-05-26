import React from 'react';
import { InterpretationResult, Species } from '../types';
import ResultDisplay from '../components/ResultDisplay';
import { motion } from 'framer-motion';
import { RefreshCw, PlusCircle, BookOpen, ExternalLink } from 'lucide-react';

interface ResultScreenProps {
  result: InterpretationResult;
  scaleName: string;
  species: Species | null;
  onRestart: () => void;
  onNewAssessment: () => void;
  onShowGuide: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  scaleName,
  species,
  onRestart,
  onNewAssessment,
  onShowGuide,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl mx-auto px-4 space-y-8"
    >
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
          Laudo de Escala de Dor
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Resultados processados e interpretados clinicamente
        </p>
      </div>

      {/* Render the core Result Display */}
      <ResultDisplay result={result} scaleName={scaleName} />

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-850">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 py-3 text-xs font-black uppercase tracking-wider transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refazer Avaliação</span>
        </button>

        <button
          onClick={onNewAssessment}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-white py-3 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-teal-500/10 hover:shadow-teal-500/20"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Nova Avaliação</span>
        </button>

        <button
          onClick={onShowGuide}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 py-3 text-xs font-black uppercase tracking-wider transition-all"
        >
          <BookOpen className="h-4 w-4" />
          <span>Guia de Manejo</span>
        </button>
      </div>

      {/* Citation footer card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-850 dark:bg-slate-950/20 p-5 text-center space-y-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Validação e Respaldos Clínicos
        </h4>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Esta escala e sua correspondente interpretação clínica são validadas cientificamente e baseadas nas referências do portal internacional <strong>animalpain.org</strong>.
        </p>
        <a
          href="https://animalpain.org"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest hover:underline"
        >
          <span>Visite animalpain.org</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
};

export default ResultScreen;
