import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../../lib/utils';

export type ShortcutItem = {
  to: string;
  label: string;
  body: string;
  icon: LucideIcon;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 28 } },
};

interface ConsultaVetShortcutGridProps {
  title: string;
  shortcuts: ShortcutItem[];
}

export function ConsultaVetShortcutGrid({ title, shortcuts }: ConsultaVetShortcutGridProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</h2>
      </div>
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.to} variants={itemVariants} className="min-h-[200px]">
              <Link
                to={s.to}
                className="block h-full rounded-[1.35rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <motion.div
                  className={cn(
                    'group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[1.35rem] border border-border/80 bg-card text-center shadow-sm',
                    'before:pointer-events-none before:absolute before:inset-0 before:rounded-[1.35rem] before:bg-gradient-to-br before:from-primary/[0.07] before:via-transparent before:to-primary/[0.04]',
                    'after:pointer-events-none after:absolute after:inset-x-4 after:top-[48%] after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary/25 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
                    'hover:after:opacity-100'
                  )}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 40px -12px hsl(217.2 91.2% 59.8% / 0.22)',
                    borderColor: 'hsl(217.2 91.2% 59.8% / 0.45)',
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/[0.12] blur-2xl transition-all duration-500 group-hover:bg-primary/[0.2] group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-primary/[0.08] blur-3xl transition-all duration-500 group-hover:bg-primary/[0.14]"
                  />

                  <div className="relative flex flex-1 flex-col items-center px-4 pb-5 pt-8">
                    <motion.div
                      className="relative mb-5 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner ring-1 ring-primary/15 transition-colors duration-300 group-hover:bg-primary/16"
                      whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.45 } }}
                    >
                      <Icon className="h-9 w-9" aria-hidden />
                    </motion.div>

                    <h3 className="relative z-[1] text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                      {s.label}
                    </h3>
                    <p className="relative z-[1] mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>

                    <span className="relative z-[1] mt-4 inline-flex items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Abrir
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
