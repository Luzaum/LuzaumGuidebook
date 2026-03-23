import React, { useState, useEffect } from 'react';
import { historyService, HistoryItem } from '../../application/services/historyService';
import { History, Trash2, ArrowRight, FlaskConical, Activity, Droplets, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryViewProps {
  onLoadHistory: (item: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onLoadHistory }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  const handleClearHistory = () => {
    historyService.clearHistory();
    setHistory([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-100 dark:border-indigo-500/20 transition-colors duration-200">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-200">Histórico</h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200">Últimos cálculos realizados (salvos ou copiados)</p>
          </div>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl transition-colors border border-rose-100 dark:border-rose-500/20"
          >
            <Trash2 className="w-4 h-4" /> Limpar Histórico
          </button>
        )}
      </div>

      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-200">
              <div className="flex items-center gap-3 text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-6 h-6" />
                <div>
                  <h4 className="font-bold">Limpar todo o histórico?</h4>
                  <p className="text-sm text-rose-600 dark:text-rose-400">Esta ação não pode ser desfeita.</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 md:flex-none px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClearHistory}
                  className="flex-1 md:flex-none px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Confirmar Limpeza
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center transition-colors duration-200">
          <History className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Nenhum histórico</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            Os cálculos que você copiar ou salvar como favoritos aparecerão aqui automaticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row transition-colors duration-200"
              >
                <div className="p-5 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-md uppercase tracking-wider">
                      {item.input.drug.namePt}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {item.input.dose} {item.input.doseUnit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(item.date).toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="p-5 flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-1">
                      <FlaskConical className="w-3 h-3" /> Paciente
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {item.input.patient.species === 'dog' ? 'Cão' : 'Gato'}, {item.input.patient.weight}kg
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-1">
                      <Droplets className="w-3 h-3" /> Diluente
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {item.input.diluent}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-1">
                      <Activity className="w-3 h-3" /> Conc. Final
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {item.result.finalConcentration.toFixed(2)} {item.result.finalConcentrationUnit}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-1">
                      <Activity className="w-3 h-3" /> Taxa
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {item.result.infusionRate.toFixed(1)} mL/h
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                  <button
                    onClick={() => onLoadHistory(item)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm whitespace-nowrap"
                  >
                    Carregar <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
