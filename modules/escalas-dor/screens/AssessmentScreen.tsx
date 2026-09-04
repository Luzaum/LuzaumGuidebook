import React, { useState } from 'react';
import { Scale } from '../types';
import AssessmentRenderer from '../components/AssessmentRenderer';
import ScaleImage from '../components/ImagePlaceholder';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Info } from 'lucide-react';

interface AssessmentScreenProps {
  scale: Scale;
  answers: Record<string, number | string>;
  onAnswersChange: (answers: Record<string, number | string>) => void;
  onSubmit: (answers: Record<string, number | string>) => void;
  onBack: () => void;
}

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  scale,
  answers,
  onAnswersChange,
  onSubmit,
  onBack,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showProtocol, setShowProtocol] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const categories = scale.categories;
  const currentCategory = categories[currentStepIndex];

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === categories.length - 1;

  const handleAnswerChange = (questionId: string, value: number | string) => {
    setValidationMessage(null);
    onAnswersChange({
      ...answers,
      [questionId]: value,
    });
  };

  const handleNext = () => {
    const currentQuestions = currentCategory.questions;
    const unanswered = currentQuestions.filter((q) => answers[q.id] === undefined);

    if (unanswered.length > 0 && currentCategory.id !== 'mobility') {
      setValidationMessage(
        unanswered.length === 1
          ? 'Falta responder 1 item desta seção.'
          : `Faltam responder ${unanswered.length} itens desta seção.`,
      );
      return;
    }

    if (!isLastStep) {
      setDirection(1);
      setCurrentStepIndex((prev) => prev + 1);
      setValidationMessage(null);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setDirection(-1);
      setCurrentStepIndex((prev) => prev - 1);
      setValidationMessage(null);
    }
  };

  // Progress percentage calculation
  const progressPercent = ((currentStepIndex + 1) / categories.length) * 100;

  // Animation variants for slide
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.7, 0, 0.84, 0] as const,
      },
    }),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-6">
      {/* Header and Back navigation */}
      <div className="hidden lg:flex lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-850">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para Escalas</span>
        </button>

        <div className="text-right sm:text-right text-left">
          <h3 className="text-sm font-black text-slate-800 dark:text-teal-50 leading-none">
            {scale.name}
          </h3>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mt-1">
            Seção {currentStepIndex + 1} de {categories.length}
          </span>
        </div>
      </div>

      {isFirstStep && scale.compositeImageUrl && (
        <div className="mb-2">
          <ScaleImage
            src={scale.compositeImageUrl}
            alt={`Referência visual — ${scale.name}`}
            className="max-h-[320px]"
          />
        </div>
      )}

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-teal-500 dark:bg-teal-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>

      <div className="dorvet-step-scroll flex gap-1.5 overflow-x-auto pb-1" aria-label="Progresso das seções">
        {categories.map((category, index) => {
          const current = index === currentStepIndex;
          const completed = index < currentStepIndex;
          return (
            <span
              key={category.id}
              aria-current={current ? 'step' : undefined}
              className={`min-w-max rounded-full px-3 py-1.5 text-[10px] font-black transition-colors ${
                current
                  ? 'bg-teal-500 text-white shadow-sm shadow-teal-500/20'
                  : completed
                    ? 'bg-teal-500/10 text-teal-700 dark:text-teal-300'
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800/70 dark:text-slate-500'
              }`}
            >
              {index + 1}. {category.name}
            </span>
          );
        })}
      </div>

      {/* Collapsible Assessment Protocol Instruction Guide */}
      <div className="border border-slate-200/80 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40 rounded-2xl overflow-hidden backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setShowProtocol(!showProtocol)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left text-xs font-black uppercase tracking-widest text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Info className="h-4 w-4 shrink-0 text-teal-500" />
            Como Avaliar (Protocolo)
          </span>
          {showProtocol ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <AnimatePresence>
          {showProtocol && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-slate-650 dark:text-slate-350 space-y-2 border-t border-slate-100 dark:border-slate-850">
                {scale.assessmentProtocol.map((step, idx) => (
                  <p key={idx} className="font-medium">
                    {step}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {validationMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-amber-400/35 bg-amber-50/90 px-4 py-3 text-amber-900 shadow-sm dark:border-amber-400/25 dark:bg-amber-950/35 dark:text-amber-100"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-xs font-black">Revise esta seção</p>
              <p className="mt-0.5 text-xs leading-5 opacity-80">{validationMessage} Selecione a opção que melhor descreve o paciente.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide transition container for the active category */}
      <div className="relative overflow-hidden min-h-[300px] border border-slate-200/80 bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/60 p-6 rounded-2xl backdrop-blur-md">
        
        {/* Category Header */}
        <div className="mb-6 pb-3 border-b border-slate-100 dark:border-slate-850">
          <h3 className="text-lg font-black text-slate-850 dark:text-white">
            {currentCategory.name}
          </h3>
          {currentCategory.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentCategory.description}
            </p>
          )}
        </div>

        {/* Optional Category Image */}
        {currentCategory.hasImage && (
          <div className="mb-6">
            <ScaleImage
              src={currentCategory.imageUrl}
              text={currentCategory.imageDescription ?? 'Ilustração de suporte para a categoria'}
            />
          </div>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCategory.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            {currentCategory.questions.map((question) => (
              <AssessmentRenderer
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={handleAnswerChange}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Previous / Next) — sticky so they stay reachable */}
      <div className="sticky bottom-0 z-20 -mx-4 mt-2 border-t border-slate-200/80 bg-[#f4fffd]/95 px-4 py-3 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 sm:mx-0 sm:rounded-2xl sm:border">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirstStep}
            className={`flex items-center gap-1.5 rounded-xl border px-5 py-3 text-xs font-black uppercase tracking-wider transition-all ${
              isFirstStep
                ? 'border-slate-100 text-slate-350 cursor-not-allowed dark:border-slate-850 dark:text-slate-600'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden min-[380px]:inline">Anterior</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all shadow-md shadow-teal-500/10 hover:shadow-teal-500/20"
          >
            {isLastStep ? (
              <>
                <span>Finalizar avaliação</span>
                <CheckCircle className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentScreen;
