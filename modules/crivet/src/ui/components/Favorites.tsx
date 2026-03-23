import React, { useState, useEffect } from 'react';
import { favoritesService, FavoriteItem } from '../../application/services/favoritesService';
import { Star, Trash2, ArrowRight, FlaskConical, Activity, Droplets, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FavoritesProps {
  onLoadFavorite: (item: FavoriteItem) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onLoadFavorite }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadFavorites = async () => {
    const data = await favoritesService.getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const confirmDelete = async (id: string) => {
    await favoritesService.deleteFavorite(id);
    await loadFavorites();
    setDeletingId(null);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-100 dark:border-amber-500/20 transition-colors duration-200">
          <Star className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-200">Protocolos Favoritos</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200">Acesse rapidamente suas prescrições salvas</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center transition-colors duration-200">
          <Star className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Nenhum favorito salvo</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            Você ainda não salvou nenhum protocolo. Use o botão "Salvar" na tela de resultados da calculadora para adicionar protocolos aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {favorites.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col relative transition-colors duration-200"
              >
                {deletingId === item.id ? (
                  <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                    <AlertTriangle className="w-10 h-10 text-rose-500 dark:text-rose-400 mb-3" />
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Excluir Favorito?</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Esta ação não pode ser desfeita.</p>
                    <div className="flex gap-3 w-full">
                      <button 
                        onClick={() => setDeletingId(null)}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={() => confirmDelete(item.id)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ) : null}

                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start bg-slate-50/50 dark:bg-slate-800/30">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">{item.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Salvo em {new Date(item.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => setDeletingId(item.id)}
                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Remover favorito"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-md uppercase tracking-wider">
                      {item.input.drug.namePt}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {item.input.dose} {item.input.doseUnit}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
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
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <button
                    onClick={() => onLoadFavorite(item)}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm"
                  >
                    Carregar na Calculadora <ArrowRight className="w-4 h-4" />
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
