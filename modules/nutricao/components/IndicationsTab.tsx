import React from 'react';

interface IndicationsTabProps {
    species: string;
    sortedFoods: any[];
}

export const IndicationsTab: React.FC<IndicationsTabProps> = ({ species, sortedFoods }) => {
    const [search, setSearch] = React.useState('');

    const filteredFoods = sortedFoods.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.indication.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-black text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-purple-400">library_books</span>
                        Guia de Alimentos
                    </h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Biblioteca de Consultas para {species === 'dog' ? 'Cães' : 'Gatos'}</p>
                </div>

                <div className="relative group w-full md:w-80">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 group-focus-within:text-purple-500 transition-colors text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Buscar indicação..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs text-white focus:bg-white/10 focus:border-purple-500/50 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredFoods.map((food, i) => {
                    let kcalDisplay = '---';
                    if (food.calories > 0) {
                        kcalDisplay = (food.unit === 'g' || food.unit === 'ml') ? (food.calories * 1000).toFixed(0) : food.calories.toFixed(0);
                    }

                    return (
                        <div key={i} className="group bg-white/5 border border-white/5 rounded-[28px] p-6 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-sm font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">{food.name}</h4>
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-slate-500 uppercase">kcal/kg</p>
                                    <p className="text-sm font-black text-slate-300">{kcalDisplay}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {[
                                    { label: 'PB', val: food.protein },
                                    { label: 'EE', val: food.fat },
                                    { label: 'Unit', val: food.unit === 'g' ? 'Gramas' : food.unit === 'ml' ? 'mL' : food.unit }
                                ].map((stat, idx) => (
                                    <div key={idx} className="bg-black/20 rounded-xl p-2 text-center border border-white/5">
                                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">{stat.label}</p>
                                        <p className="text-[10px] font-black text-slate-200">{stat.val}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <p className="text-[11px] leading-relaxed text-slate-400 font-medium italic">"{food.indication}"</p>

                                {food.alerts && food.alerts.length > 0 && (
                                    <div className="space-y-2 pt-4 border-t border-white/5">
                                        {food.alerts.map((alert: any, idx: number) => (
                                            <div key={idx} className={`flex items-start gap-3 p-3 rounded-2xl text-[10px] font-bold ${alert.type === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                    alert.type === 'yellow' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                }`}>
                                                <span className="material-symbols-outlined text-sm mt-0.5">{
                                                    alert.type === 'red' ? 'error' : alert.type === 'yellow' ? 'warning' : 'check_circle'
                                                }</span>
                                                <p dangerouslySetInnerHTML={{ __html: alert.text }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
