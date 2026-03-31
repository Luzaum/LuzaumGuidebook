import React, { useState } from 'react';
import { History, Trash2, FileText, ChevronRight, X, Activity, CheckCircle2 } from 'lucide-react';
import { useHemoStore } from '../store/useHemoStore';
import { cn } from '../../../lib/utils';
import { exportToPDF } from '../utils/pdfExport';
import * as Dialog from '@radix-ui/react-dialog';
import { SavedBloodGasRecord } from '../types';
import { formatFiO2Percent } from '../utils/fio2';
import { formatCompensationStatus, formatOxygenationStatus, formatPrimaryDisorder, formatQualityStatus } from '../utils/presentation';

export default function HistoryPage() {
  const { history, removeRecord, clearHistory } = useHemoStore();
  const [selectedRecord, setSelectedRecord] = useState<SavedBloodGasRecord | null>(null);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 dark:text-slate-600">
        <History className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">Nenhum exame salvo no histórico.</p>
        <p className="text-sm mt-2">Os exames salvos aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Histórico de Exames</h1>
          <p className="text-slate-500 dark:text-slate-400">Exames salvos localmente neste dispositivo.</p>
        </div>
        <button
          onClick={() => {
            if (confirm('Tem certeza que deseja apagar todo o histórico?')) {
              clearHistory();
            }
          }}
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" />
          Limpar Histórico
        </button>
      </div>

      <div className="grid gap-4">
        {history.map((record) => (
          <div 
            key={record.id} 
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 hover:border-purple-300 dark:hover:border-purple-700 transition-colors group cursor-pointer"
            onClick={() => setSelectedRecord(record)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{record.patientName}</h3>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {record.result.input.species === 'canine' ? 'Canino' : 'Felino'}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    record.result.input.sampleType === 'arterial' 
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" 
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  )}>
                    {record.result.input.sampleType === 'arterial' ? 'Arterial' : 'Venosa'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(record.date).toLocaleString('pt-BR')}
                </p>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-400 mt-2">
                  {record.result.executiveSummary.join(' ')}
                </p>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); removeRecord(record.id); }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); exportToPDF(record); }}
                  className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                  title="Exportar PDF"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
              <div className="flex gap-4 text-slate-600 dark:text-slate-400">
                <span>pH: <strong className="text-slate-900 dark:text-white">{record.result.input.pH || '--'}</strong></span>
                <span>pCO2: <strong className="text-slate-900 dark:text-white">{record.result.input.pCO2 || '--'}</strong></span>
                <span>HCO3: <strong className="text-slate-900 dark:text-white">{record.result.input.HCO3 || '--'}</strong></span>
                  <span>FiO2: <strong className="text-slate-900 dark:text-white">{record.result.input.fio2 !== undefined ? formatFiO2Percent(record.result.input.fio2) : '--'}</strong></span>
              </div>
              <button className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:underline">
                Ver detalhes <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog.Root open={!!selectedRecord} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 p-6 animate-in fade-in zoom-in-95">
            {selectedRecord && (
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {selectedRecord.patientName}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {new Date(selectedRecord.date).toLocaleString('pt-BR')} • {selectedRecord.result.input.species === 'canine' ? 'Canino' : 'Felino'} • {selectedRecord.result.input.sampleType === 'arterial' ? 'Arterial' : 'Venosa'}
                    </Dialog.Description>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => exportToPDF(selectedRecord)}
                      className="p-2 text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-md transition-colors"
                      title="Exportar PDF"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                    <Dialog.Close asChild>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <div><span className="block text-xs text-slate-500">pH</span><strong className="text-lg">{selectedRecord.result.input.pH || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">pCO2</span><strong className="text-lg">{selectedRecord.result.input.pCO2 || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">HCO3</span><strong className="text-lg">{selectedRecord.result.input.HCO3 || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">BE</span><strong className="text-lg">{selectedRecord.result.input.BE || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">pO2</span><strong className="text-lg">{selectedRecord.result.input.pO2 || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">Lactato</span><strong className="text-lg">{selectedRecord.result.input.lactate || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">Sódio</span><strong className="text-lg">{selectedRecord.result.input.Na || '--'}</strong></div>
                  <div><span className="block text-xs text-slate-500">Potássio</span><strong className="text-lg">{selectedRecord.result.input.K || '--'}</strong></div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/50">
                  <h4 className="font-bold text-purple-900 dark:text-purple-100 flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Resumo Executivo
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200">{selectedRecord.result.executiveSummary.join(' ')}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-500" />
                    Análise Detalhada
                  </h4>
                  <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                    <p><strong>Qualidade:</strong> {formatQualityStatus(selectedRecord.result.dataQuality.status)}</p>
                    <p><strong>Dist?rbio Prim?rio:</strong> {formatPrimaryDisorder(selectedRecord.result.deepAcidBase.primaryDisorder)}</p>
                    <p><strong>Compensa??o:</strong> {formatCompensationStatus(selectedRecord.result.deepAcidBase.compensationStatus)}</p>
                    {selectedRecord.result.anionGap && <p><strong>Anion Gap:</strong> {selectedRecord.result.anionGap.explanation}</p>}
                    <p><strong>Oxigena??o:</strong> {formatOxygenationStatus(selectedRecord.result.deepOxygenation)}</p>
                    <p><strong>Temperatura:</strong> {selectedRecord.result.temperatureContext.summary}</p>
                  </div>
                </div>

                {selectedRecord.result.dataQuality.consistencyChecks.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white">Checagens de Consist?ncia</h4>
                    <div className="space-y-2">
                      {selectedRecord.result.dataQuality.consistencyChecks.map((check, idx) => (
                        <div key={idx} className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3 text-sm text-slate-700 dark:text-slate-300">
                          <p className="font-medium">{check.message}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{check.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRecord.result.clinicalActions.immediate.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white">Ações Imediatas</h4>
                    <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      {selectedRecord.result.clinicalActions.immediate.map((action, idx) => (
                        <li key={idx}>{action}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
