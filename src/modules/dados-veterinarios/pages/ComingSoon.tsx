import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hammer, ArrowLeft } from 'lucide-react';
import { dvPath } from '../DadosVeterinariosModule';

export const ComingSoon = () => {
  const location = useLocation();
  const fromLabel = (location.state as { from?: string } | null)?.from;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
        <div className="w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center mb-5">
          <Hammer size={26} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Em desenvolvimento</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Esta função ainda está em construção no módulo Dados Veterinários.
        </p>
        {fromLabel ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Origem: {fromLabel}
          </p>
        ) : null}
        <div className="mt-6">
          <Link
            to={dvPath('')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90"
          >
            <ArrowLeft size={16} />
            Voltar ao dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

