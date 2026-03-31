import React, { useState } from 'react';
import { guidelinesContent } from '../data/guidelinesContent';
import { preanalyticalErrors } from '../data/preanalyticalErrors';
import { FileText, AlertTriangle, Info, ShieldAlert, ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import { cn } from '../../../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function GuidelinesPage() {
  const [activeTab, setActiveTab] = useState<'reading' | 'errors'>('reading');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            Boas Práticas e Diretrizes
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-lg">
            Guia clínico definitivo para leitura estruturada e prevenção de erros.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('reading')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === 'reading' 
                ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            Leitura Estruturada
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === 'errors' 
                ? "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            Erros Pré-Analíticos
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'reading' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            {guidelinesContent.map((guide, idx) => (
              <div key={guide.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50/50 dark:bg-slate-800/20 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{guide.title}</h2>
                </div>
                <div className="p-6 prose prose-slate dark:prose-invert prose-purple max-w-none">
                  <ReactMarkdown>{guide.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
          
          <div className="md:col-span-4 space-y-6">
            {/* Quick Tips Sidebar */}
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-6">
              <h3 className="font-bold text-amber-900 dark:text-amber-500 flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5" />
                Regras de Ouro
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-amber-800 dark:text-amber-400/80">
                  <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Nunca confie em pO2 de sangue venoso para diagnosticar hipoxemia.</span>
                </li>
                <li className="flex gap-3 text-sm text-amber-800 dark:text-amber-400/80">
                  <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Se o Anion Gap está alto, HÁ um ácido orgânico oculto matando o paciente, mesmo se o pH estiver normal.</span>
                </li>
                <li className="flex gap-3 text-sm text-amber-800 dark:text-amber-400/80">
                  <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Ofegância (panting) por dor derruba o CO2 em segundos. Não entube sem antes sedar a dor.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 dark:text-blue-500 flex items-center gap-2 mb-4">
                <Info className="w-5 h-5" />
                Equação de Winters
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-400/80 mb-3">
                Calcula a compensação respiratória na Acidose Metabólica primária:
              </p>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-blue-100 dark:border-blue-800 text-center font-mono text-blue-900 dark:text-blue-300 font-bold">
                pCO2 = (1.5 × HCO3) + 8 ± 2
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-3">
                O Vetius faz todo o cálculo de compensação esperado automaticamente no interpretador!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'errors' && (
        <div className="space-y-6">
           <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-6 mb-8">
             <div className="flex items-start gap-4">
               <ShieldAlert className="w-8 h-8 text-rose-600 dark:text-rose-500 shrink-0" />
               <div>
                  <h2 className="text-xl font-bold text-rose-900 dark:text-rose-400 mb-2">A Morte da Amostra</h2>
                  <p className="text-rose-800 dark:text-rose-300/80">
                    A hemogasometria é O EXAME MAIS SENSÍVEL DA CLÍNICA a erros de coleta. Uma seringa mal manipulada durante 3 minutos anula a ciência de um intensivista brilhante.
                  </p>
               </div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {preanalyticalErrors.map(error => (
               <div key={error.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-full shadow-sm hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <FlaskConical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{error.name}</h3>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-400 mb-1 block">O que acontece</span>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">{error.mechanism}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs font-bold uppercase text-rose-500 mb-1 block">Resultados Falsos Gerados</span>
                      <ul className="space-y-1">
                        {error.falseFindings.map((finding, idx) => (
                          <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                             <span className="text-rose-500 shrink-0 mt-1">•</span> {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-500 mb-1 block">Como Prevenir</span>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{error.prevention}</p>
                      </div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      )}

    </div>
  );
}
