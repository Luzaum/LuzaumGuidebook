import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Camera } from 'lucide-react';

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
  >
    <motion.div 
      layout
      className={`bg-white w-4 h-4 rounded-full shadow-sm`}
      animate={{ x: enabled ? 20 : 0 }}
    />
  </button>
);

export const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Configurações</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Personalize o sistema de acordo com suas preferências.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Perfil da Clínica</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Informações básicas exibidas em documentos e relatórios.</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:border-primary hover:text-primary transition-colors">
              <Camera size={24} />
            </div>
            <div>
              <button className="text-sm font-medium text-primary hover:underline">Alterar Logo</button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recomendado: 400x400px, PNG ou JPG.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome da Clínica</label>
              <input type="text" defaultValue="VetFlow Clínica Veterinária" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CNPJ</label>
              <input type="text" defaultValue="12.345.678/0001-90" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Endereço</label>
              <input type="text" defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Preferências do Sistema</h2>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Notificações no Navegador</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receba alertas sobre agendamentos e estoque baixo.</p>
            </div>
            <Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Modo Escuro</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Alternar para o tema escuro da interface.</p>
            </div>
            <Toggle enabled={theme === 'dark'} onChange={toggleTheme} />
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Relatórios por E-mail</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receber resumo semanal automaticamente.</p>
            </div>
            <Toggle enabled={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors">
          Cancelar
        </button>
        <button className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-green-500 font-medium transition-colors shadow-lg shadow-primary/20">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};
