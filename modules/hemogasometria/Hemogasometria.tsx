import React, { useState, useEffect, useCallback } from 'react';
import { AuroraBackground } from '../../components/ui/aurora-background';
import { HemogasometryAnalyzer } from './components/HemogasometryAnalyzer';
import { HemogasometryResults } from './components/HemogasometryResults';
import { HemogasometrySidebar } from './components/HemogasometrySidebar';
import { HemogasometryQuiz } from './components/HemogasometryQuiz';
import { BloodGasInputs, AnalysisResult, QuizCase } from './types/hemoTypes';
import { analyzeBloodGas } from './utils/bloodGasLogic';
import { generateQuizCase } from './utils/quizLogic';
import { EXPLANATION_DATA } from './data/hemoData';

interface Props {
  onBack: () => void;
}

const Hemogasometria: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'quiz'>('analyzer');
  const [modalData, setModalData] = useState<{ title: string; content: string } | null>(null);

  // Analyzer State
  const [inputs, setInputs] = useState<BloodGasInputs>({
    species: 'dog',
    declaredSampleType: 'arterial',
    fio2: 21,
    ph: 7.40,
    pco2: 36.8,
    hco3: 22.2,
    po2: 92.0,
    temp: 38.5,
    na: 145,
    k: 4.5,
    cl: 117,
    albumin: 2.7,
    glucose: 100,
    lactate: 1.5,
    be: 0
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Quiz State
  const [quizCase, setQuizCase] = useState<QuizCase | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    handleNewQuizCase();
  }, []);

  const handleNewQuizCase = useCallback(() => {
    setQuizCase(generateQuizCase());
    setUserAnswers({});
    setQuizSubmitted(false);
  }, []);

  const handleAnalyzerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = analyzeBloodGas(inputs);
    setAnalysisResult(result);
    setShowResults(true);
  };

  const handleReset = () => {
    setInputs({
      species: 'dog',
      declaredSampleType: 'arterial',
      fio2: 21,
      ph: 7.40,
      pco2: 36.8,
      hco3: 22.2,
      po2: 92.0,
      temp: 38.5,
      na: 145,
      k: 4.5,
      cl: 117,
      albumin: 2.7,
      glucose: 100,
      lactate: 1.5,
      be: 0
    });
    setShowResults(false);
    setAnalysisResult(null);
  };

  const openModal = (key: string) => {
    const data = (EXPLANATION_DATA as any)[key];
    if (data) setModalData(data);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950 isolate print:bg-white">
      <AuroraBackground className="fixed inset-0 pointer-events-none opacity-40 print:hidden">{null}</AuroraBackground>

      <div className="relative z-10 flex flex-col h-screen overflow-hidden print:h-auto print:overflow-visible">
        {/* Superior Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white/5 dark:bg-slate-900/50 backdrop-blur-xl border-b border-white/10 print:hidden">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-xl transition-all flex items-center justify-center group active:scale-95">
              <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-white">arrow_back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <span className="material-symbols-outlined text-white text-2xl">science</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Hemogasometria<span className="text-blue-500">Vet</span></h1>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em]">Advanced Diagnostics</span>
              </div>
            </div>
          </div>

          <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-2xl">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`px-6 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'analyzer' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-500 hover:text-white'}`}
            >
              Analisador
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'quiz' ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'text-slate-500 hover:text-white'}`}
            >
              Modo Quiz
            </button>
          </div>
        </header>

        {/* Dynamic Content + Sidebar */}
        <div className="flex-1 flex overflow-hidden print:block print:overflow-visible">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 xl:p-12 custom-scrollbar print:p-0 print:overflow-visible">
            <div className="w-full">
              {activeTab === 'analyzer' ? (
                <div className="space-y-12">
                  <div className="print:hidden">
                    <HemogasometryAnalyzer
                      inputs={inputs}
                      setInputs={setInputs}
                      onSubmit={handleAnalyzerSubmit}
                      onReset={handleReset}
                    />
                  </div>

                  {showResults && analysisResult && (
                    <div className="animate-in slide-in-from-bottom-8 duration-700 print:animate-none">
                      <div className="flex items-center gap-4 mb-8 print:mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent print:hidden"></div>
                        <h2 className="text-xl font-black uppercase tracking-[0.4em] text-blue-500/80 print:text-blue-600 print:tracking-normal print:text-2xl">Relatório de Hemogasometria</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent print:hidden"></div>
                      </div>
                      <HemogasometryResults result={analysisResult} onOpenModal={openModal} />
                    </div>
                  )}
                </div>
              ) : (
                quizCase && (
                  <HemogasometryQuiz
                    quizCase={quizCase}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    quizSubmitted={quizSubmitted}
                    onSubmit={(e) => { e.preventDefault(); setQuizSubmitted(true); }}
                    onNewCase={handleNewQuizCase}
                    onOpenModal={openModal}
                  />
                )
              )}

              {/* Footer Guide - Hidden by default, showing only when needed */}
              <div className="mt-20 opacity-50 hover:opacity-100 transition-opacity print:hidden">
                <details className="group border border-white/10 rounded-3xl overflow-hidden bg-slate-900/40 divide-y divide-white/5">
                  <summary className="p-6 cursor-pointer list-none flex justify-between items-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                    Guia de Referência Clínica
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-sm leading-relaxed">
                    <div>
                      <h4 className="flex items-center gap-2 text-white font-black mb-4"><span className="material-symbols-outlined text-blue-500">verified</span> BOAS PRÁTICAS DE COLETA</h4>
                      <ul className="space-y-3 list-disc pl-5 marker:text-blue-500">
                        <li>Sempre remover bolhas de ar imediatamente após a coleta.</li>
                        <li>Processar a amostra em no máximo 5-10 minutos.</li>
                        <li>Amostra arterial é mandatória para avaliação real de pO₂.</li>
                        <li>Vedação hermética da seringa para evitar trocas gasosas.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-white font-black mb-4"><span className="material-symbols-outlined text-red-500">warning</span> ARMADILHAS DIAGNÓSTICAS</h4>
                      <ul className="space-y-3 list-disc pl-5 marker:text-red-500">
                        <li>Excesso de heparina reduz artificialmente o HCO₃⁻ e pCO₂.</li>
                        <li>Hemólise severa pode elevar níveis de K⁺ falsamente.</li>
                        <li>Retardo no processamento consome O₂ e gera CO₂ (acidose artificial).</li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </main>

          {/* Persistent Sidebar Area */}
          <aside className="w-[400px] xl:w-[450px] flex-shrink-0 animate-in slide-in-from-right-12 duration-500 print:hidden">
            <HemogasometrySidebar
              result={analysisResult}
              inputs={inputs}
              onOpenModal={openModal}
              onPrint={handlePrint}
            />
          </aside>
        </div>
      </div>

      {/* Modal System */}
      {modalData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setModalData(null)}
        >
          <div
            className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-500 text-3xl">library_books</span>
                {modalData.title}
              </h3>
              <button onClick={() => setModalData(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>
            <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar prose-primary">
              <div
                className="text-slate-300 space-y-4 leading-relaxed hemo-content-box"
                dangerouslySetInnerHTML={{ __html: modalData.content }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        
        .hemo-content-box strong { color: #3b82f6; font-weight: 900; }
        .flowchart-box { 
          background: rgba(59, 130, 246, 0.1); 
          border: 1px solid rgba(59, 130, 246, 0.2); 
          padding: 1rem; 
          border-radius: 1rem; 
          text-align: center;
          font-weight: bold;
          margin: 1rem 0;
        }
        .flowchart-arrow { text-align: center; font-size: 1.5rem; color: #3b82f6; }
      `}</style>
    </div>
  );
};

export default Hemogasometria;
