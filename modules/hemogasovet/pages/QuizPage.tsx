import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, XCircle, ArrowRight, RotateCcw, Activity, Info, Beaker, Stethoscope } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { quizCases as QUIZ_CASES } from '../data/quizCases';
import { QuizCase, QuizQuestion } from '../types';

export default function QuizPage() {
  const [selectedCase, setSelectedCase] = useState<QuizCase | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [caseFinished, setCaseFinished] = useState(false);

  const handleSelectCase = (quizCase: QuizCase) => {
    setSelectedCase(quizCase);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCaseFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null || !selectedCase) return;
    
    setShowResult(true);
    const question = selectedCase.questions[currentQuestionIdx];
    if (selectedOption === question.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (!selectedCase) return;
    
    if (currentQuestionIdx < selectedCase.questions.length - 1) {
      setCurrentQuestionIdx(i => i + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCaseFinished(true);
    }
  };

  const handleBackToList = () => {
    setSelectedCase(null);
  };

  if (!selectedCase) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              Casos Clínicos Interativos
            </h1>
            <p className="text-purple-200 text-sm max-w-2xl">
              Teste seus conhecimentos em hemogasometria com cenários reais, interpretação passo a passo e explicações fisiológicas detalhadas.
            </p>
          </div>
          <div className="hidden md:block text-purple-500/20">
            <BrainCircuit className="w-20 h-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUIZ_CASES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => handleSelectCase(c)}
              className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all text-left flex flex-col h-full group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                  {c.questions.length} questões
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {c.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-grow">
                {c.scenario}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400">
                Iniciar Caso <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (caseFinished) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 py-12">
        <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Caso Concluído!</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Você acertou <strong className="text-purple-600 dark:text-purple-400 text-2xl">{score}</strong> de {selectedCase.questions.length} questões.
        </p>
        
        <div className="pt-8 flex justify-center gap-4">
          <button
            onClick={() => handleSelectCase(selectedCase)}
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Refazer Caso
          </button>
          <button
            onClick={handleBackToList}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors"
          >
            Voltar aos Casos
          </button>
        </div>
      </div>
    );
  }

  const question = selectedCase.questions[currentQuestionIdx];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={handleBackToList}
          className="text-sm font-medium text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
        >
          &larr; Voltar aos Casos
        </button>
        <div className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 px-3 py-1.5 rounded-full uppercase tracking-wider">
          Questão {currentQuestionIdx + 1} de {selectedCase.questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
        <div 
          className="bg-purple-600 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${((currentQuestionIdx) / selectedCase.questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scenario & Data */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 sticky top-6">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Cenário Clínico
            </h3>
            <h2 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{selectedCase.title}</h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5">
              {selectedCase.scenario}
            </p>
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Beaker className="w-4 h-4" />
                Dados do Exame
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedCase.data).map(([key, val]) => {
                  if (key === 'clinicalContext' || key === 'species' || key === 'sampleType' || val === undefined) return null;
                  return (
                    <div key={key} className="bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1.5 rounded-md border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{key}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{String(val)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {selectedCase.data.species === 'canine' ? 'Canino' : 'Felino'}
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {selectedCase.data.sampleType === 'arterial' ? 'Arterial' : 'Venosa'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Question & Options */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 leading-snug">
              {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctAnswerIndex;
                
                let optionClass = "border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-slate-50 dark:hover:bg-slate-800/50";
                
                if (showResult) {
                  if (isCorrect) {
                    optionClass = "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500/50";
                  } else if (isSelected && !isCorrect) {
                    optionClass = "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500/50";
                  } else {
                    optionClass = "border-slate-200 dark:border-slate-800 opacity-50";
                  }
                } else if (isSelected) {
                  optionClass = "border-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-500";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start",
                      optionClass
                    )}
                  >
                    <div className="flex-1">
                      <span className={cn(
                        "font-medium text-sm md:text-base",
                        showResult && isCorrect ? "text-green-900 dark:text-green-300" :
                        showResult && isSelected && !isCorrect ? "text-red-900 dark:text-red-300" :
                        isSelected ? "text-purple-900 dark:text-purple-300" :
                        "text-slate-700 dark:text-slate-300"
                      )}>
                        {option}
                      </span>
                    </div>
                    {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 ml-3 mt-0.5" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 ml-3 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
              {!showResult ? (
                <button
                  onClick={handleConfirm}
                  disabled={selectedOption === null}
                  className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:dark:bg-slate-800 disabled:dark:text-slate-600 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base shadow-sm transition-colors"
                >
                  Confirmar Resposta
                </button>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className={cn(
                    "p-5 rounded-xl border",
                    selectedOption === question.correctAnswerIndex 
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50" 
                      : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50"
                  )}>
                    <h4 className={cn(
                      "font-bold mb-3 flex items-center gap-2 text-lg",
                      selectedOption === question.correctAnswerIndex ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
                    )}>
                      {selectedOption === question.correctAnswerIndex ? (
                        <><CheckCircle2 className="w-6 h-6" /> Correto!</>
                      ) : (
                        <><XCircle className="w-6 h-6" /> Incorreto</>
                      )}
                    </h4>
                    
                    <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg">
                      <h5 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Info className="w-4 h-4" /> Explicação Fisiológica
                      </h5>
                      <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-base shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {currentQuestionIdx < selectedCase.questions.length - 1 ? (
                      <>Próxima Questão <ArrowRight className="w-5 h-5" /></>
                    ) : (
                      <>Finalizar Caso <CheckCircle2 className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainCircuit(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M9 13a4.5 4.5 0 0 0 3-4" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M16 8V5a2 2 0 0 1 2-2" />
      <circle cx="16" cy="13" r=".5" />
      <circle cx="18" cy="3" r=".5" />
      <circle cx="20" cy="21" r=".5" />
      <circle cx="20" cy="8" r=".5" />
    </svg>
  );
}
