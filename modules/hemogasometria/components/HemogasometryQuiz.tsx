import React from 'react';
import { QuizCase } from '../types/hemoTypes';
import { QUIZ_THERAPY_OPTIONS, EXPLANATION_DATA } from '../data/hemoData';

interface Props {
  quizCase: QuizCase;
  userAnswers: { [key: string]: string };
  setUserAnswers: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  quizSubmitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onNewCase: () => void;
  onOpenModal: (key: string) => void;
}

const QuizQuestion = ({ qKey, text, options, quizCase, userAnswers, setUserAnswers, quizSubmitted, onOpenModal }: any) => {
    const handleSelect = (option: string) => {
        if (quizSubmitted) return;
        setUserAnswers((prev: any) => ({ ...prev, [qKey]: option }));
    };

    const selectedValue = userAnswers[qKey];
    const correctAnswer = quizCase.correctAnswers[qKey];
    const isCorrect = selectedValue === correctAnswer;

    const getExplanation = () => {
        let explanationStart = `A resposta correta é <strong>${correctAnswer}</strong>. `;
        if (isCorrect) explanationStart = '';

        switch (qKey) {
            case 'sampleType': return `${explanationStart}O valor de pO₂ (${quizCase.inputs.po2.toFixed(1)} mmHg) é característico de uma amostra <strong>${correctAnswer === 'arterial' ? 'Arterial' : 'Venosa'}</strong>.`;
            case 'diagnosis': return `${explanationStart}A combinação de <strong>${quizCase.inputs.ph < 7.35 ? 'Acidemia' : 'Alcalemia'}</strong> com a alteração primária em ${correctAnswer.includes('Metabólica') ? 'HCO₃⁻' : 'pCO₂'} caracteriza <strong>${correctAnswer}</strong>.`;
            case 'compensation': return `${explanationStart}A análise da resposta compensatória indica um quadro <strong>${correctAnswer}</strong>.`;
            default: return explanationStart;
        }
    }

    return (
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-slate-800 shadow-xl animate-in slide-in-from-bottom-4">
            <p className="font-bold text-slate-800 dark:text-white mb-6 text-xl leading-tight">{text}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt: string) => {
                    let classes = 'text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 p-5 rounded-2xl cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-all font-bold flex items-center gap-4';
                    let icon = <div className="size-6 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0"></div>;

                    if (quizSubmitted) {
                        if (opt === correctAnswer) {
                            classes = 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400 font-black p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-green-500/10 scale-[1.02]';
                            icon = <span className="material-symbols-outlined text-green-500 text-2xl flex-shrink-0">check_circle</span>;
                        } else if (opt === selectedValue && !isCorrect) {
                            classes = 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400 font-black p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-red-500/10';
                            icon = <span className="material-symbols-outlined text-red-500 text-2xl flex-shrink-0">cancel</span>;
                        }
                    } else if (opt === selectedValue) {
                        classes = 'bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400 font-black p-5 rounded-2xl flex items-center gap-4 shadow-lg shadow-blue-600/10 scale-[1.02]';
                        icon = <span className="material-symbols-outlined text-blue-600 text-2xl flex-shrink-0">radio_button_checked</span>;
                    }
                    return <div key={opt} className={classes} onClick={() => handleSelect(opt)}>{icon}{opt}</div>;
                })}
            </div>
            {quizSubmitted && (
                <div className="mt-6 p-5 rounded-2xl bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 animate-in zoom-in-95">
                    <div className="flex items-start gap-4">
                        <span className={`material-symbols-outlined text-3xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>{isCorrect ? 'verified' : 'priority_high'}</span>
                        <div className="flex-grow">
                            <p className="font-extrabold text-lg mb-1">{isCorrect ? 'Excelente!' : 'Não foi dessa vez.'}</p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: getExplanation() }} />
                        </div>
                        {EXPLANATION_DATA[qKey as keyof typeof EXPLANATION_DATA] && (
                          <button type="button" onClick={() => onOpenModal(qKey)} className="p-3 bg-blue-600/10 text-blue-600 rounded-xl hover:bg-blue-600/20 transition-colors">
                            <span className="material-symbols-outlined">menu_book</span>
                          </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const HemogasometryQuiz: React.FC<Props> = ({ quizCase, userAnswers, setUserAnswers, quizSubmitted, onSubmit, onNewCase, onOpenModal }) => {
  const numericQuizKeys: any[] = ['ph', 'pco2', 'hco3', 'po2', 'temp', 'na', 'k', 'cl', 'albumin', 'fio2'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-8 rounded-3xl border border-white/20 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="size-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-5xl">school</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Desafio Médico</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-black uppercase tracking-widest">{quizCase.inputs.species === 'dog' ? 'Cão 🐕' : 'Gato 🐈'}</span>
                  <span className="px-3 py-1 bg-slate-500/20 text-slate-500 rounded-full text-xs font-black uppercase tracking-widest">Complexidade Alta</span>
                </div>
              </div>
            </div>
            <button type="button" onClick={onNewCase} className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-slate-700 dark:text-slate-200 font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl">
                Próximo Caso
            </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {numericQuizKeys.map(key => (
                <div key={key} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/20 dark:border-slate-800 text-center shadow-lg transform transition-all hover:-translate-y-1">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] mb-2">{key === 'po2' ? 'pO₂' : key === 'pco2' ? 'pCO₂' : key === 'hco3' ? 'HCO₃⁻' : key === 'ph' ? 'pH' : key}</div>
                    <div className="text-2xl font-black text-slate-800 dark:text-white">{(quizCase.inputs[key as keyof typeof quizCase.inputs] as number).toFixed(key === 'ph' ? 2 : 1)}</div>
                </div>
            ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
            <QuizQuestion qKey="sampleType" text="1. Qual a origem mais provável da amostra?" options={['arterial', 'venous', 'mista/indeterminada']} {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, onOpenModal }} />
            <QuizQuestion qKey="diagnosis" text="2. Qual o distúrbio ácido-básico primário?" options={['Acidose Metabólica', 'Alcalose Metabólica', 'Acidose Respiratória', 'Alcalose Respiratória', 'Distúrbio Misto Compensado']} {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, onOpenModal }} />
            {quizCase.inputs.species === 'dog' && <QuizQuestion qKey="compensation" text="3. Como você classifica a compensação?" options={['Compensado', 'Descompensado (Distúrbio Misto)']} {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, onOpenModal }} />}
            
            {Object.entries(QUIZ_THERAPY_OPTIONS).map(([disorderKey, therapy], idx) => {
                if (quizCase.correctAnswers[disorderKey]) {
                    const qNum = 4 + idx;
                    return <QuizQuestion
                        key={disorderKey}
                        qKey={disorderKey}
                        text={`${qNum}. Este paciente tem ${disorderKey.charAt(0).toUpperCase() + disorderKey.slice(1)}. Qual a conduta correta?`}
                        options={[...therapy.incorrect, therapy.correct].sort(() => 0.5 - Math.random())}
                        {...{ quizCase, userAnswers, setUserAnswers, quizSubmitted, onOpenModal }}
                    />;
                }
                return null;
            })}

            <div className="flex justify-center pt-8">
                <button type="submit" disabled={quizSubmitted} className="group relative px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-3xl shadow-2xl shadow-green-500/20 transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-4 disabled:opacity-50 disabled:scale-100">
                    <span className="material-symbols-outlined text-3xl group-hover:animate-bounce">fact_check</span>
                    <span className="text-2xl font-black uppercase tracking-widest">Corrigir Desafio</span>
                </button>
            </div>
        </form>
    </div>
  );
};
