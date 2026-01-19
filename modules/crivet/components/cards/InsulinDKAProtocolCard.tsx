
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

export function InsulinDKAProtocolCard() {
    const [isExpanded, setIsExpanded] = useState(true)
    const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs')

    return (
        <div className="rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 overflow-hidden shadow-sm">
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-lg">
                        ⚡
                    </span>
                    <div className="text-left">
                        <h3 className="font-bold text-sm">Protocolo DKA (Insulina Regular)</h3>
                        <p className="text-xs text-orange-800 dark:text-orange-200 opacity-90">
                            Protocolo bolsa 250 mL • Metas de queda glicêmica
                        </p>
                    </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {isExpanded && (
                <div className="p-4 space-y-4">
                    <div className="flex space-x-1 bg-orange-200/50 dark:bg-orange-900/50 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('dogs')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'dogs'
                                    ? 'bg-white dark:bg-slate-800 text-orange-900 dark:text-orange-100 shadow-sm'
                                    : 'text-orange-800 dark:text-orange-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                                }`}
                        >
                            Cães
                        </button>
                        <button
                            onClick={() => setActiveTab('cats')}
                            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'cats'
                                    ? 'bg-white dark:bg-slate-800 text-orange-900 dark:text-orange-100 shadow-sm'
                                    : 'text-orange-800 dark:text-orange-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                                }`}
                        >
                            Gatos
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-orange-100 dark:border-orange-800/50 space-y-3">
                        <div className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-blue-800 dark:text-blue-200 text-xs font-semibold whitespace-nowrap">
                                PREPARO
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {activeTab === 'dogs' ? '2,2 UI/kg' : '1,1 UI/kg'} de Insulina Regular
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Adicionar em bolsa de <span className="font-bold text-slate-700 dark:text-slate-300">250 mL de NaCl 0,9%</span>.
                                </p>
                                <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Usar APENAS NaCl 0,9% (SF) para diluição.</span>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="p-2 min-w-[100px]">Glicemia (mg/dL)</th>
                                        <th className="p-2">Taxa (mL/h)</th>
                                        <th className="p-2">Dextrose nos Fluidos*</th>
                                        <th className="p-2 min-w-[150px]">Conduta</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/10">
                                        <td className="p-2 font-bold text-slate-800 dark:text-slate-200">&gt; 350</td>
                                        <td className="p-2 font-mono text-slate-900 dark:text-white font-bold">10</td>
                                        <td className="p-2">0%</td>
                                        <td className="p-2">Reduzir glicemia; sem dextrose.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold text-slate-800 dark:text-slate-200">250 – 350</td>
                                        <td className="p-2 font-mono text-slate-900 dark:text-white font-bold">7</td>
                                        <td className="p-2">0%</td>
                                        <td className="p-2">Manter queda gradual.</td>
                                    </tr>
                                    <tr className="bg-orange-50/50 dark:bg-orange-900/10">
                                        <td className="p-2 font-bold text-slate-800 dark:text-slate-200">150 – 250</td>
                                        <td className="p-2 font-mono text-slate-900 dark:text-white font-bold">5</td>
                                        <td className="p-2 font-bold text-orange-700 dark:text-orange-400">2,5%</td>
                                        <td className="p-2">Introduzir dextrose; manter insulina.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 font-bold text-slate-800 dark:text-slate-200">100 – 150</td>
                                        <td className="p-2 font-mono text-slate-900 dark:text-white font-bold">3 – 5</td>
                                        <td className="p-2 font-bold text-orange-700 dark:text-orange-400">5%</td>
                                        <td className="p-2">Evitar hipoglicemia; resolver cetose.</td>
                                    </tr>
                                    <tr className="bg-red-50 dark:bg-red-900/10 border-l-2 border-red-500">
                                        <td className="p-2 font-bold text-red-700 dark:text-red-400">≤ 100</td>
                                        <td className="p-2 font-bold text-red-700 dark:text-red-400">PARAR</td>
                                        <td className="p-2 font-bold text-orange-700 dark:text-orange-400">5%</td>
                                        <td className="p-2">Suspender insulina; manter dextrose.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-2 pt-1">
                            <div className="flex gap-2">
                                <div className="w-1 h-full bg-blue-400 rounded-full shrink-0 self-stretch min-h-[1rem]"></div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    *Dextrose (2,5-5%) é adicionada ao <span className="font-semibold">fluido de manutenção/reidratação do paciente</span>. Não à bolsa de insulina.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1 h-full bg-slate-300 rounded-full shrink-0 self-stretch min-h-[1rem]"></div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {activeTab === 'dogs'
                                        ? "Segurança: Se glicemia cair > 50–100 mg/dL/h, reduzir a taxa e/ou aumentar dextrose."
                                        : "Segurança: Gatos exigem controle estrito de eletrólitos (K+); se cair rápido demais, reduzir a taxa."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
