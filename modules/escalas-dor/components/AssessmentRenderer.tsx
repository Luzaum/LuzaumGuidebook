import React from 'react';
import { Question, Option } from '../types';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

interface AssessmentRendererProps {
  question: Question;
  value: number | string | undefined;
  onChange: (questionId: string, value: number | string) => void;
}

const AssessmentRenderer: React.FC<AssessmentRendererProps> = ({
  question,
  value,
  onChange,
}) => {
  const selectedScore = value !== undefined ? Number(value) : undefined;

  const renderRadio = () => {
    if (!question.options) return null;
    return (
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedScore === option.score;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              onClick={() => onChange(question.id, option.score)}
              className={`flex items-start justify-between gap-4 w-full rounded-2xl border text-left p-4 transition-all duration-300 ${
                isSelected
                  ? 'border-teal-500 bg-teal-50/80 dark:border-teal-400 dark:bg-teal-950/20 shadow-sm shadow-teal-500/10'
                  : 'border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-500 text-white dark:border-teal-400 dark:bg-teal-400'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`radio-dot-${question.id}`}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  )}
                </div>
                <span className="text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
                  {option.text}
                </span>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${
                  isSelected
                    ? 'bg-teal-500 text-white ring-teal-500 dark:bg-teal-400 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700'
                }`}
              >
                +{option.score}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderSlider = () => {
    const minVal = question.min ?? 0;
    const maxVal = question.max ?? 10;
    const currentVal = value !== undefined ? Number(value) : minVal;

    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40 p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Ajuste a intensidade
          </span>
          <span className="text-3xl font-black text-teal-500 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-4 py-1.5 rounded-xl border border-teal-100 dark:border-teal-900/40 shadow-inner">
            {currentVal}
          </span>
        </div>

        <input
          type="range"
          min={minVal}
          max={maxVal}
          step={question.step ?? 1}
          value={currentVal}
          onChange={(e) => onChange(question.id, Number(e.target.value))}
          className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-800 accent-teal-500 dark:accent-teal-400 cursor-pointer outline-none transition-all"
        />

        <div className="flex items-center justify-between mt-3 px-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <span>{question.labelMin ?? minVal}</span>
          <span>{question.labelMax ?? maxVal}</span>
        </div>
      </div>
    );
  };

  const renderGrimace = () => {
    if (!question.options) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedScore === option.score;
          return (
            <motion.button
              key={index}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(question.id, option.score)}
              className={`flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 bg-white/70 dark:bg-slate-900/40 ${
                isSelected
                  ? 'border-teal-500 bg-teal-50/60 dark:border-teal-400 dark:bg-teal-950/20 shadow-md shadow-teal-500/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="p-2 w-full bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-850">
                <ImagePlaceholder
                  text={option.imageDescription ?? `Foto: ${option.text}`}
                  className="h-[120px]"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs font-bold leading-relaxed text-slate-700 dark:text-slate-200 mb-3">
                  {option.text}
                </p>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Escore Unitário
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${
                      isSelected
                        ? 'bg-teal-500 text-white ring-teal-500 dark:bg-teal-400 dark:text-slate-900'
                        : 'bg-slate-100 text-slate-500 ring-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    +{option.score}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    );
  };

  const renderText = () => {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40 p-4">
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder="Digite observações clínicas adicionais aqui..."
          rows={4}
          className="w-full text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 outline-none focus:border-teal-500 dark:focus:border-teal-400 text-slate-700 dark:text-slate-200 transition-colors"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="text-base font-extrabold leading-snug text-slate-800 dark:text-teal-50">
        {question.text}
      </h4>

      {question.imageDescription && (
        <div className="mb-4">
          <ImagePlaceholder text={question.imageDescription} />
        </div>
      )}

      {question.type === 'radio' && renderRadio()}
      {question.type === 'slider' && renderSlider()}
      {question.type === 'grimace' && renderGrimace()}
      {question.type === 'text' && renderText()}
    </div>
  );
};

export default AssessmentRenderer;
