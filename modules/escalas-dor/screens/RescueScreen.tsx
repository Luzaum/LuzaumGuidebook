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
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>

        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          🚨 Resgate Analgésico e Limiares
        </h3>
      </div>

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

      {/* Table of Thresholds */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Award className="h-4.5 w-4.5" />
          <span>Limiares Clínicos para Intervenção Analgésica</span>
        </h4>

        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
          <table className="w-full border-collapse text-left text-xs text-slate-700 dark:text-slate-350">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                <th className="px-5 py-3.5">Escala Utilizada</th>
                <th className="px-5 py-3.5">Espécie</th>
                <th className="px-5 py-3.5">Limiar de Intervenção (Resgate)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">Glasgow CMPS-SF</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐕 Cão</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 6/24 (ou ≥ 5/20 se sem mobilidade)</td>
              </tr>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">UMPS Melbourne</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐕 Cão</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 8/27 (ou ≥ 10/27)</td>
              </tr>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">4A-VET</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐕 Cão</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 8/18</td>
              </tr>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">UNESP-Botucatu Completa</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐱 Gato</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 8/30</td>
              </tr>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">UNESP-Botucatu Simplificada (UFEPS-SF)</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐱 Gato</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 4/12</td>
              </tr>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">Grimace Scale (FGS)</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐱 Gato</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 4/10 (ou média ≥ 0.8)</td>
              </tr>
              <tr className="border-b border-slate-150 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-teal-50">Glasgow CMPS-Feline</td>
                <td className="px-5 py-3.5 font-semibold text-slate-500">🐱 Gato</td>
                <td className="px-5 py-3.5 font-black text-rose-600 dark:text-rose-455 text-xs">≥ 5/20</td>
              </tr>
            </tbody>
          </table>
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
