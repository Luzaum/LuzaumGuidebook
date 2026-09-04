import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, BookOpen, Bookmark, ShieldCheck, Sparkles, Timer, ZoomIn } from 'lucide-react';
import { SpeciesPortraitCards } from '@/components/SpeciesPortraitCards';
import type { Species } from '../types';
import { AppLogo } from '../components/Icons';

interface HomeScreenProps {
  selectedSpecies: Species | null;
  onSelectSpecies: (species: Species) => void;
  onNavigate: (screen: string) => void;
}

const quickActions = [
  { id: 'guide', title: 'Guia de manejo', description: 'Conduta por intensidade e contexto clínico', icon: BookOpen, tone: 'teal' },
  { id: 'rescue', title: 'Resgate analgésico', description: 'Limiares de intervenção e reavaliação', icon: AlertTriangle, tone: 'rose' },
  { id: 'references', title: 'Base científica', description: 'Escalas validadas e referências primárias', icon: Bookmark, tone: 'indigo' },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ selectedSpecies, onSelectSpecies, onNavigate }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className="mx-auto max-w-5xl space-y-6 px-3 sm:px-5"
  >
    <section className="relative overflow-hidden rounded-[28px] border border-teal-500/20 bg-gradient-to-br from-white/90 via-teal-50/80 to-cyan-50/70 px-5 py-7 shadow-[0_24px_70px_rgba(13,148,136,0.12)] backdrop-blur-xl dark:from-slate-900/90 dark:via-teal-950/25 dark:to-slate-950/80 sm:px-8 sm:py-9">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-500/10" />
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
            <Sparkles className="h-3.5 w-3.5" /> Decisão clínica estruturada
          </span>
          <h2 className="max-w-2xl text-3xl font-black tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
            Avalie a dor com mais clareza e menos atrito.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            Escalas validadas para cães e gatos, imagens clínicas ampliáveis e uma sequência guiada para apoiar observação, escore e reavaliação.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="dorvet-feature-chip"><ShieldCheck className="h-3.5 w-3.5" /> Escalas validadas</span>
            <span className="dorvet-feature-chip"><Timer className="h-3.5 w-3.5" /> Fluxo rápido</span>
            <span className="dorvet-feature-chip"><ZoomIn className="h-3.5 w-3.5" /> Imagens com zoom</span>
          </div>
        </div>
        <div className="hidden h-36 w-36 place-items-center rounded-[32px] border border-white/50 bg-white/65 shadow-xl shadow-teal-900/10 backdrop-blur-md md:grid dark:border-white/10 dark:bg-slate-900/50">
          <AppLogo className="h-24 w-24 object-contain drop-shadow-lg" />
        </div>
      </div>
    </section>

    <section className="rounded-[28px] border border-slate-200/80 bg-white/72 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/55 sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Comece por aqui</p>
          <h3 className="mt-1 text-xl font-black tracking-tight text-slate-850 dark:text-white">Selecione a espécie do paciente</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">A seleção filtra apenas escalas compatíveis.</p>
      </div>
      <SpeciesPortraitCards
        variant="teal"
        size="compact"
        canineLabel="CÃO"
        felineLabel="GATO"
        canineSubtitle="Escalas caninas agudas e crônicas"
        felineSubtitle="Escalas felinas e careta facial"
        canineSelected={selectedSpecies === 'dog'}
        felineSelected={selectedSpecies === 'cat'}
        onSelectCanine={() => onSelectSpecies('dog')}
        onSelectFeline={() => onSelectSpecies('cat')}
        showHeading={false}
      />
    </section>

    <section>
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-black text-slate-800 dark:text-white">Consulta rápida</h3>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Conteúdo de apoio</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.06 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onNavigate(action.id)}
              className="group flex min-h-28 items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/75 p-4 text-left shadow-sm transition-colors hover:border-teal-500/35 dark:border-slate-800/80 dark:bg-slate-900/55"
            >
              <span className={`dorvet-quick-icon dorvet-quick-icon-${action.tone}`}><Icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black text-slate-800 dark:text-white">{action.title}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{action.description}</span>
              </span>
              <ArrowRight className="h-4 w-4 flex-none text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-teal-500" />
            </motion.button>
          );
        })}
      </div>
    </section>

    <p className="pb-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
      Conteúdo educacional para apoio ao médico-veterinário · UNESP / Animal Pain
    </p>
  </motion.div>
);

export default HomeScreen;
