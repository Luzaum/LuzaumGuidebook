import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Flame, ShieldAlert, Award, Clock } from 'lucide-react';

interface RescueScreenProps {
  onBack: () => void;
}

const RescueScreen: React.FC<RescueScreenProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 space-y-8"
    >
      {/* Main warning card */}
      <div className="flex items-start gap-4 rounded-2xl border border-rose-200 bg-rose-500/10 dark:border-rose-950/40 p-5 text-rose-700 dark:text-rose-400 ring-1 ring-rose-500/10 shadow-sm">
        <AlertTriangle className="h-7 w-7 text-rose-500 shrink-0" />
        <div className="space-y-1.5">
          <h4 className="text-sm font-black uppercase tracking-wider">
            Diretriz de Segurança e Proteção Animal
          </h4>
          <p className="text-xs leading-relaxed font-semibold opacity-90">
            A dor grave pós-cirúrgica é uma emergência clínica! Não hesite em intervir assim que o escore correspondente for ultrapassado.
          </p>
        </div>
      </div>

      {/* Table of Thresholds (Refactored to Card Stacks for Mobile) */}
      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Award className="h-4.5 w-4.5 text-rose-500" />
          <span>Limiares Clínicos para Intervenção Analgésica</span>
        </h4>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">Glasgow CMPS-SF</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐕 Cão
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 6/24 (ou ≥ 5/20 se sem mobilidade)</span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">UMPS Melbourne</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐕 Cão
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 8/27 (ou ≥ 10/27)</span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">4A-VET</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐕 Cão
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 8/18</span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">UNESP-Botucatu Completa</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐱 Gato
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 8/30</span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">UNESP-Botucatu Simplificada (UFEPS-SF)</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐱 Gato
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 4/12</span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">Grimace Scale (FGS)</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐱 Gato
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 4/10 (ou média ≥ 0.8)</span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3 backdrop-blur-md hover:border-teal-500/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-850 dark:text-teal-50 text-sm">Glasgow CMPS-Feline</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300">
                🐱 Gato
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-1.5 border-t border-slate-150 dark:border-slate-800/60">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Limiar de Intervenção (Resgate)</span>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400">≥ 5/20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Sections: Benefício da Dúvida, Escalada, Reavaliação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60 p-5 space-y-2 backdrop-blur-md">
          <h4 className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
            <Flame className="h-4.5 w-4.5" />
            <span>Princípio do Benefício da Dúvida</span>
          </h4>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            Muitas vezes o paciente está apático, quieto no canto ou agressivo. Se houver qualquer dúvida diagnóstica entre dor e distúrbio comportamental (especialmente no pós-anestésico ou felinos arredios), adote o <strong>benefício da dúvida</strong>: faça a analgesia preventiva de resgate e avalie o alívio.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/60 p-5 space-y-2 backdrop-blur-md">
          <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <Clock className="h-4.5 w-4.5" />
            <span>Reavaliação e Janela Analgésica</span>
          </h4>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            A reavaliação de dor deve ocorrer em intervalos de <strong>30 a 60 minutos</strong> após a administração de qualquer resgate endovenoso ou intramuscular. Não espere a próxima dose agendada de 8 ou 12 horas caso o paciente ainda demonstre sofrimento agudo marcante.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RescueScreen;
