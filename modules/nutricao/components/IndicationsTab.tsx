import React from 'react';

interface IndicationsTabProps {
    species: string;
    sortedFoods: any[];
}

export const IndicationsTab: React.FC<IndicationsTabProps> = ({ species, sortedFoods }) => {
    return (
        <div id="page-indicacoes" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10 relative">
                <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full -z-10 w-2/3 mx-auto translate-y-4"></div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center justify-center gap-3">
                    <span className="text-4xl">📚</span> Guia de Alimentos ({species === 'dog' ? 'Cães' : 'Gatos'})
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
                    Catálogo completo de dietas veterinárias e suas principais indicações.
                </p>
            </div>
            <div id="food-catalog" className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
                {sortedFoods.map((food, i) => {
                    let kcalDisplay = 'N/A';
                    if (food.calories > 0) {
                        if (food.unit === 'g' || food.unit === 'ml') {
                            kcalDisplay = (food.calories * 1000).toFixed(0);
                        } else {
                            kcalDisplay = `${food.calories.toFixed(0)} /unidade`;
                        }
                    }
                    const foodCatalogKey = `${food.name}-${food.calories ?? ""}-${food.unit ?? ""}-${i}`;
                    return (
                        <div key={foodCatalogKey} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-12 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

                            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg mb-4 relative z-10 pr-6 break-words tracking-tight">{food.name}</h4>

                            <div className="grid grid-cols-3 gap-3 text-sm mb-5 relative z-10">
                                <div className="text-center bg-indigo-50/80 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/40 shadow-inner">
                                    <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">kcal/kg ou /L</p>
                                    <p className="font-extrabold text-indigo-900 dark:text-indigo-300">{kcalDisplay}</p>
                                </div>
                                <div className="text-center bg-emerald-50/80 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/40 shadow-inner">
                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">% PB</p>
                                    <p className="font-extrabold text-emerald-900 dark:text-emerald-300">{food.protein}</p>
                                </div>
                                <div className="text-center bg-amber-50/80 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-100 dark:border-amber-800/40 shadow-inner">
                                    <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1">% EE</p>
                                    <p className="font-extrabold text-amber-900 dark:text-amber-300">{food.fat}</p>
                                </div>
                            </div>

                            <div className="relative z-10 mb-4 bg-slate-50/80 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><span className="text-indigo-400">🎯</span> Indicação Principal</p>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">{food.indication}</p>
                            </div>

                            {food.alerts && food.alerts.length > 0 && (
                                <div className="space-y-2.5 relative z-10">
                                    {food.alerts.map((alert: any, alertIndex: number) => {
                                        const alertClasses: Record<string, string> = {
                                            red: 'bg-rose-50/90 dark:bg-rose-900/20 border-rose-300 dark:border-rose-800/60 text-rose-800 dark:text-rose-300',
                                            yellow: 'bg-amber-50/90 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800/60 text-amber-800 dark:text-amber-300',
                                            green: 'bg-emerald-50/90 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                                        };
                                        const icon: Record<string, string> = { red: '🚨', yellow: '⚠️', green: '✅' };
                                        return (
                                            <div key={`${alert.type}-${alert.text?.substring(0, 20) ?? ""}-${alertIndex}`} className={`p-3 rounded-xl text-xs font-semibold flex items-start gap-2 border shadow-sm backdrop-blur-sm ${alertClasses[alert.type]}`}>
                                                <span className="text-base mt-[-2px]">{icon[alert.type]}</span>
                                                <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: alert.text }} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
