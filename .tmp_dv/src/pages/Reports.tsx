import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Download, Printer, Share2 } from 'lucide-react';

export const Reports = () => {
  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar - Report Structure */}
      <div className="w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 overflow-y-auto hidden lg:block transition-colors">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 px-2">Estrutura</h3>
        <ul className="space-y-1">
          {['Resumo Executivo', 'Indicadores Chave', 'Análise Financeira', 'Desempenho Clínico', 'Estoque e Insumos', 'Feedback de Clientes'].map((item, i) => (
            <li key={i}>
              <button className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content - Report Preview */}
      <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden transition-colors">
        {/* Toolbar */}
        <div className="h-14 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 bg-gray-50/50 dark:bg-gray-800/50 transition-colors">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Relatório Mensal - Outubro 2023</h2>
            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">Finalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Diminuir Zoom">
              <Minus size={20} />
            </button>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">100%</span>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Aumentar Zoom">
              <Plus size={20} />
            </button>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <button 
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors" 
              title="Baixar PDF"
            >
              <Download size={20} />
            </button>
            <button 
              onClick={() => window.print()}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors" 
              title="Imprimir"
            >
              <Printer size={20} />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors" title="Compartilhar">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Document View */}
        <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900/50 p-8 flex justify-center transition-colors">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-3xl min-h-[800px] shadow-lg p-12 text-gray-800"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-secondary mb-2">Relatório de Desempenho</h1>
                <p className="text-gray-500">Período: 01/10/2023 - 31/10/2023</p>
              </div>
              <div className="text-right">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold mb-2 ml-auto">V</div>
                <p className="font-bold text-gray-900">VetFlow</p>
                <p className="text-sm text-gray-500">Gestão Veterinária</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">1. Resumo Executivo</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  O mês de outubro apresentou um crescimento sólido de <strong className="text-gray-900">12%</strong> em relação ao mês anterior, impulsionado principalmente pelo aumento na demanda por serviços de cirurgia e vacinação. A receita total atingiu <strong className="text-gray-900">R$ 124.500,00</strong>, superando a meta estabelecida em 5%.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Receita Total</p>
                    <p className="text-xl font-bold text-green-600">R$ 124.5k</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Novos Clientes</p>
                    <p className="text-xl font-bold text-blue-600">86</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-semibold">NPS</p>
                    <p className="text-xl font-bold text-purple-600">78</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary pl-3">2. Análise de Serviços</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As consultas de rotina continuam sendo o principal serviço, representando 40% do volume total. No entanto, observou-se um aumento significativo na procura por exames laboratoriais (+15%), sugerindo uma maior conscientização dos tutores sobre a medicina preventiva.
                </p>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex mt-4">
                  <div className="w-[40%] bg-primary h-full" title="Consultas (40%)"></div>
                  <div className="w-[30%] bg-blue-500 h-full" title="Exames (30%)"></div>
                  <div className="w-[20%] bg-orange-500 h-full" title="Cirurgias (20%)"></div>
                  <div className="w-[10%] bg-gray-400 h-full" title="Outros (10%)"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div>Consultas</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Exames</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div>Cirurgias</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-400"></div>Outros</span>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
