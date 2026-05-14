import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import {
  Stethoscope,
  Database,
  Zap,
  History,
  Activity,
  ChevronRight,
} from 'lucide-react'

const SECTIONS = [
  {
    to: '/neurologia/exame',
    title: 'Exame neurológico completo',
    desc: 'Fluxo em 5 etapas: paciente, queixa, exame (6 seções), revisão e análise.',
    icon: Stethoscope,
    accent: 'from-gold/25 via-amber-500/15 to-amber-600/10',
    ring: 'group-hover:shadow-[0_0_0_1px_rgba(245,197,66,0.35),0_20px_50px_-12px_rgba(245,197,66,0.2)]',
  },
  {
    to: '/neurologia/base-dados',
    title: 'Base neurológica',
    desc: 'Consulta rápida de achados (estrabismo, nistagmo, ataxias, reflexos…).',
    icon: Database,
    accent: 'from-sky-500/20 via-cyan-500/12 to-cyan-600/10',
    ring: 'group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_20px_50px_-12px_rgba(34,211,238,0.15)]',
  },
  {
    to: '/neurologia/exame-rapido',
    title: 'Exame rápido',
    desc: 'Apenas paciente, queixa ou uma das 6 seções do exame físico.',
    icon: Zap,
    accent: 'from-violet-500/20 via-purple-500/12 to-fuchsia-500/10',
    ring: 'group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_20px_50px_-12px_rgba(167,139,250,0.18)]',
  },
  {
    to: '/neurologia/historico',
    title: 'Histórico local',
    desc: 'Exames salvos neste dispositivo — reabrir e continuar depois.',
    icon: History,
    accent: 'from-emerald-500/20 via-teal-500/12 to-teal-600/10',
    ring: 'group-hover:shadow-[0_0_0_1px_rgba(45,212,191,0.3),0_20px_50px_-12px_rgba(45,212,191,0.15)]',
  },
  {
    to: '/neurologia/glasgow',
    title: 'Escala de coma de Glasgow (MGCS)',
    desc: 'Pontuação interativa e interpretação por faixas (3–18).',
    icon: Activity,
    accent: 'from-rose-500/20 via-orange-500/12 to-amber-500/10',
    ring: 'group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_20px_50px_-12px_rgba(251,113,133,0.16)]',
  },
]

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 28 } },
}

export function NeuroHomePage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative min-h-[70vh] w-full">
      <div className="relative z-10 w-full space-y-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            NeuroVet
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
            Neurologia canina e felina — exame estruturado, base de achados e ferramentas clínicas.
          </p>
        </motion.div>

        <motion.div
          className="grid w-full gap-5 sm:grid-cols-1 xl:grid-cols-2 xl:gap-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {SECTIONS.map((s) => {
            const Icon = s.icon
            return (
              <motion.div key={s.to} variants={item} className="min-h-[8.5rem]">
                <Link
                  to={s.to}
                  className={`group relative flex min-h-[8.5rem] items-center gap-5 overflow-hidden rounded-3xl border border-border/90 bg-gradient-to-br ${s.accent} p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition duration-300 ${s.ring} hover:-translate-y-0.5`}
                >
                  {!reduceMotion && (
                    <span
                      className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5 blur-2xl"
                      aria-hidden
                    />
                  )}
                  <motion.span
                    className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-background/85 text-gold ring-2 ring-gold/25 shadow-inner md:h-[4.5rem] md:w-[4.5rem]"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            boxShadow: [
                              '0 0 0 0 rgba(245,197,66,0)',
                              '0 0 24px 2px rgba(245,197,66,0.2)',
                              '0 0 0 0 rgba(245,197,66,0)',
                            ],
                          }
                    }
                    transition={reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon className="h-8 w-8 md:h-9 md:w-9" strokeWidth={1.75} />
                  </motion.span>
                  <div className="min-w-0 flex-1 text-left">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-gold md:text-[1.35rem]">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{s.desc}</p>
                  </div>
                  <ChevronRight className="h-6 w-6 shrink-0 text-muted-foreground transition duration-300 group-hover:translate-x-1 group-hover:text-gold" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
