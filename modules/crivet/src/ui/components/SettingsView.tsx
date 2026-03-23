import React, { useState } from 'react';
import { Settings, Save, Bell, Shield, Moon, Sun, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export const SettingsView: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors duration-200">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-200">Configurações</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200">Ajuste suas preferências do aplicativo</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 transition-colors duration-200">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-slate-500 dark:text-slate-400" /> Aparência
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Escolha o tema visual do aplicativo.</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 py-4 px-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${theme === 'light' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'}`}
            >
              <Sun className="w-6 h-6" />
              <span className="font-semibold text-sm">Claro</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 py-4 px-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${theme === 'dark' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'}`}
            >
              <Moon className="w-6 h-6" />
              <span className="font-semibold text-sm">Escuro</span>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex-1 py-4 px-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${theme === 'system' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'}`}
            >
              <Settings className="w-6 h-6" />
              <span className="font-semibold text-sm">Sistema</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 transition-colors duration-200">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" /> Notificações e Alertas
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gerencie como você recebe avisos clínicos.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">Alertas Sonoros</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tocar som para alertas de segurança críticos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between transition-colors duration-200">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">Alertas Visuais Intensos</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Destacar erros de cálculo com cores fortes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 transition-colors duration-200">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-slate-500 dark:text-slate-400" /> Idioma e Região
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure o idioma e unidades de medida.</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Idioma</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Sistema de Unidades</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            >
              <option value="metric">Métrico (kg, mL)</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20">
          <Save className="w-5 h-5" /> Salvar Configurações
        </button>
      </div>
    </div>
  );
};
