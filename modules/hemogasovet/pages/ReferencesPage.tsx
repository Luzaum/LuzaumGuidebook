import React from 'react';
import { FileText, ExternalLink, BookOpen } from 'lucide-react';

export default function ReferencesPage() {
  const references = [
    {
      title: "Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice",
      author: "DiBartola, S. P.",
      year: "2011",
      species: "Cães e Gatos",
      theme: "Distúrbios Ácido-Base, Anion Gap, Eletrólitos",
      description: "Referência padrão-ouro mundial para distúrbios ácido-base, cálculo de Anion Gap, Base Excess e eletrólitos.",
      type: "Livro Texto"
    },
    {
      title: "BSAVA Manual of Canine and Feline Emergency and Critical Care",
      author: "King, L. G., & Boag, A.",
      year: "2018",
      species: "Cães e Gatos",
      theme: "Oxigenação, Gradiente A-a, Lactato",
      description: "Utilizado para diretrizes de oxigenação, gradiente A-a, e condutas de emergência baseadas em lactato e perfusão.",
      type: "Manual"
    },
    {
      title: "Canine and Feline Respiratory Medicine",
      author: "Venker-van Haagen, A. J.",
      year: "2006",
      species: "Cães e Gatos",
      theme: "Interpretação da PaO2 e PaCO2",
      description: "Aprofundamento na interpretação da PaO2, PaCO2 e limitações da gasometria venosa na avaliação pulmonar.",
      type: "Livro Texto"
    },
    {
      title: "Cunningham's Textbook of Veterinary Physiology",
      author: "Klein, B. G.",
      year: "2019",
      species: "Geral",
      theme: "Fisiologia Respiratória e Renal",
      description: "Base fisiológica para o entendimento dos mecanismos de hipoxemia (V/Q mismatch, shunt, difusão) e controle ventilatório.",
      type: "Livro Texto"
    },
    {
      title: "Guia Prático da Hemogasometria de Cães e Gatos",
      year: "2023",
      species: "Cães e Gatos",
      theme: "Valores de Referência e Fórmulas",
      description: "Fonte primária para valores de referência, fórmulas de compensação e distinção entre amostras arteriais e venosas.",
      type: "Manual Clínico"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Referências Científicas</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">
            A base de conhecimento que alimenta o motor de interpretação do HemoGasoVet.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {references.map((ref, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex items-start gap-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
          >
            <div className="mt-1">
              <BookOpen className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{ref.title}</h3>
                {ref.year && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {ref.year}
                  </span>
                )}
              </div>
              {ref.author && <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">{ref.author}</p>}
              
              <div className="flex flex-wrap gap-2 mb-3">
                {ref.species && (
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700">
                    Espécie: {ref.species}
                  </span>
                )}
                {ref.theme && (
                  <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-md border border-purple-100 dark:border-purple-800/50">
                    {ref.theme}
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {ref.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {ref.type}
                </span>
                <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium flex items-center gap-1 transition-colors">
                  Saber mais <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          O HemoGasoVet é uma ferramenta de apoio à decisão clínica. 
          Os resultados gerados não substituem o julgamento clínico do médico veterinário responsável pelo caso.
        </p>
      </div>
    </div>
  );
}
