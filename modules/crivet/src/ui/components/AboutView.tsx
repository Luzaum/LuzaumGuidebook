import React from 'react';
import { Info, BookOpen, ShieldAlert, HeartPulse, ActivitySquare, ExternalLink, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20 transition-colors duration-200">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-200">Sobre o CRI VET</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-200">Informações, referências e termos de uso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 transition-colors duration-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                <ActivitySquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-200">CRI VET</h1>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-sm mt-1 transition-colors duration-200">Clinical Tool v2.0.0</p>
              </div>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 transition-colors duration-200">
              <p className="text-lg leading-relaxed mb-4">
                O CRI VET é uma ferramenta de suporte à decisão clínica desenvolvida especificamente para médicos veterinários. Seu objetivo é facilitar e aumentar a segurança no cálculo de infusões contínuas (CRI) e preparo de fármacos em ambiente hospitalar.
              </p>
              <p className="leading-relaxed">
                Nossa arquitetura é baseada em um banco de dados farmacológico rigoroso, que cruza informações do paciente com as propriedades físico-químicas e farmacocinéticas dos medicamentos para gerar alertas de segurança em tempo real.
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 shadow-sm transition-colors duration-200">
            <h3 className="text-red-800 dark:text-red-400 font-bold text-lg flex items-center gap-2 mb-3 transition-colors duration-200">
              <ShieldAlert className="w-5 h-5" /> Aviso Legal Importante
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed font-medium transition-colors duration-200">
              Este aplicativo é uma ferramenta auxiliar e <strong>NÃO SUBSTITUI</strong> o julgamento clínico do médico veterinário. Todos os cálculos, doses e diluições devem ser conferidos pelo profissional responsável antes da administração em qualquer paciente. Os desenvolvedores não se responsabilizam por erros de prescrição, reações adversas ou desfechos clínicos decorrentes do uso desta ferramenta.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-colors duration-200">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 transition-colors duration-200">
              <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Referências Base
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
              <li className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-1.5 shrink-0 transition-colors duration-200" />
                <span>Plumb's Veterinary Drug Handbook (9th Ed.)</span>
              </li>
              <li className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-1.5 shrink-0 transition-colors duration-200" />
                <span>BSAVA Small Animal Formulary (10th Ed.)</span>
              </li>
              <li className="flex gap-2 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mt-1.5 shrink-0 transition-colors duration-200" />
                <span>Veterinary Anesthesia and Analgesia (Lumb and Jones, 5th Ed.)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-colors duration-200">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 transition-colors duration-200">
              <HeartPulse className="w-5 h-5 text-rose-500 dark:text-rose-400" /> Equipe & Contato
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-200">
              Desenvolvido com foco em segurança do paciente e usabilidade clínica.
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                <ExternalLink className="w-4 h-4" /> Site Oficial
              </a>
              <a href="mailto:suporte@crivet.app" className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                <Mail className="w-4 h-4" /> suporte@crivet.app
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
