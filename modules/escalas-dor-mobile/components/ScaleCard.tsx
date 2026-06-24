import React from 'react';
import { Scale } from '../types';
import { motion } from 'framer-motion';
import { Star, Info, ChevronRight, Award } from 'lucide-react';

interface ScaleCardProps {
  scale: Scale;
  onSelect: (scale: Scale) => void;
  onInfo?: (scale: Scale) => void;
}

const ScaleCard: React.FC<ScaleCardProps> = ({ scale, onSelect, onInfo }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/60 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md hover:border-teal-500/40 dark:hover:border-teal-400/40"
    >
      {scale.recommended && (
        <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-teal-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-teal-600 dark:bg-teal-400/15 dark:text-teal-400 ring-1 ring-teal-500/25">
          <Star className="h-3 w-3 fill-current text-yellow-500" />
          <span>Recomendado</span>
        </div>
      )}

      <div className="flex-1 pr-16">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {scale.painType === 'acute' ? '⚡ Dor Aguda' : '⏳ Dor Crônica'}
        </span>
        <h3 className="mt-1 text-lg font-black leading-snug text-slate-800 dark:text-teal-100">
          {scale.name}
        </h3>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {scale.developer}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {scale.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-600 dark:text-slate-300">
          Escore Máx: {scale.maxScore}
        </span>
        <span className="rounded-full bg-rose-50 dark:bg-rose-950/30 px-2.5 py-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/15">
          Resgate: {scale.rescueLabel}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3">
        {onInfo ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInfo(scale);
            }}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
            <span>Mais Detalhes</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => onSelect(scale)}
          className="flex items-center gap-1 rounded-xl bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all shadow-sm shadow-teal-500/10 hover:shadow-md hover:shadow-teal-500/25"
        >
          <span>Avaliar</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

export default ScaleCard;
