import React from 'react';
import { REFERENCES } from '../data/references';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink, Bookmark } from 'lucide-react';

interface ReferencesScreenProps {
  onBack: () => void;
}

const ReferencesScreen: React.FC<ReferencesScreenProps> = ({ onBack }) => {
  const dogRefs = REFERENCES.filter((r) => r.category === 'dog');
  const catRefs = REFERENCES.filter((r) => r.category === 'cat');
  const generalRefs = REFERENCES.filter((r) => r.category === 'general');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          📚 Referências Científicas
        </h3>
      </div>

      {/* Main citation banner */}
      <div className="rounded-2xl border border-teal-200 bg-teal-500/5 dark:border-teal-900/40 p-5 space-y-2 backdrop-blur-sm">
        <span className="text-[10px] font-black uppercase tracking-widest text-teal-650 dark:text-teal-400 block">
          Fonte Principal de Subsídio Científico
        </span>
        <h4 className="text-sm font-black text-slate-800 dark:text-teal-50">
          Projeto Dor e Qualidade de Vida em Animais — animalpain.org
        </h4>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Esta ferramenta foi construída e estruturada sob as diretrizes científicas do portal <strong>animalpain.org</strong>, coordenado e mantido pelo Prof. Dr. Stelio Pacca Loureiro Luna e equipe da Faculdade de Medicina Veterinária e Zootecnia (FMVZ) da UNESP, campus Botucatu/SP, referência mundial no estudo e validação de escalas de dor em animais.
        </p>
        <div className="pt-2">
          <a
            href="https://animalpain.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest hover:underline"
          >
            <span>Acesse o Portal Científico</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Canines section */}
        {dogRefs.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2">
              <Bookmark className="h-4 w-4 text-teal-500" />
              <span>Diretrizes e Escalas Caninas</span>
            </h4>

            <div className="space-y-4">
              {dogRefs.map((ref) => (
                <div key={ref.id} className="text-xs leading-relaxed bg-white/50 dark:bg-slate-900/30 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 block mb-1">
                    {ref.topic}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-350">
                    {ref.authors} ({ref.year}).
                  </span>{' '}
                  <span className="font-bold text-slate-800 dark:text-teal-50 italic">
                    "{ref.title}"
                  </span>{' '}
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {ref.journal}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Felines section */}
        {catRefs.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2">
              <Bookmark className="h-4 w-4 text-teal-500" />
              <span>Diretrizes e Escalas Felinas</span>
            </h4>

            <div className="space-y-4">
              {catRefs.map((ref) => (
                <div key={ref.id} className="text-xs leading-relaxed bg-white/50 dark:bg-slate-900/30 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 block mb-1">
                    {ref.topic}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-350">
                    {ref.authors} ({ref.year}).
                  </span>{' '}
                  <span className="font-bold text-slate-800 dark:text-teal-50 italic">
                    "{ref.title}"
                  </span>{' '}
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {ref.journal}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* General Guidelines section */}
        {generalRefs.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2">
              <BookOpen className="h-4 w-4 text-teal-500" />
              <span>Diretrizes Globais e Manuais Veterinários</span>
            </h4>

            <div className="space-y-4">
              {generalRefs.map((ref) => (
                <div key={ref.id} className="text-xs leading-relaxed bg-white/50 dark:bg-slate-900/30 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 block mb-1">
                    {ref.topic}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-350">
                    {ref.authors} ({ref.year}).
                  </span>{' '}
                  <span className="font-bold text-slate-800 dark:text-teal-50 italic">
                    "{ref.title}"
                  </span>{' '}
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {ref.journal}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ReferencesScreen;
