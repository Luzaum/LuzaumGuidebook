import React from 'react'
import { AlertTriangle, Brain, HeartPulse, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'
import { DISEASE_GUIDES } from './content'

export function FluidoterapiaConditionsView() {
  return (
    <div className="space-y-6">
      <motion.section 
        id="triage" 
        className="fluid-panel rounded-[32px] p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="fluid-kicker text-xs font-semibold uppercase tracking-[0.24em]">
              Página dedicada
            </div>
            <h2 className="fluid-heading mt-3 text-3xl font-semibold">
              Fluidos em doenças específicas
            </h2>
            <p className="fluid-muted mt-3 max-w-3xl text-sm leading-7">
              Esta página isola cenários em que o raciocínio muda por causa da doença e da
              tolerância a volume. Ela fica separada da calculadora para não poluir o fluxo
              principal.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <div className="fluid-panel-strong rounded-[28px] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ShieldAlert className="h-4 w-4" />
                Regra de triagem
              </div>
              <p className="fluid-muted mt-3 text-sm leading-6">
                Primeiro pergunte: o paciente precisa de reanimação, reidratação ou sustentação?
                A doença muda a forma de executar, não a ordem lógica do raciocínio.
              </p>
            </div>
            <div className="fluid-panel-strong rounded-[28px] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Onde mais se erra
              </div>
              <p className="fluid-muted mt-3 text-sm leading-6">
                O erro recorrente é repetir bolus ou usar uma taxa “bonita” de manutenção sem
                olhar perfusão, peso, perdas e tolerância do paciente.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="cards" 
        className="fluid-panel rounded-[32px] p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {DISEASE_GUIDES.map((guide) => (
            <article key={guide.title} className="fluid-panel-strong rounded-[28px] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fluid-muted)]">
                    {guide.category}
                  </div>
                  <h3 className="fluid-heading mt-2 text-2xl font-semibold">{guide.title}</h3>
                </div>
              </div>

              <div className="mt-5 grid gap-3 text-sm leading-6">
                <div className="rounded-[22px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                  <div className="font-semibold">Objetivo clínico</div>
                  <div className="fluid-muted mt-1">{guide.objective}</div>
                </div>
                <div className="rounded-[22px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                  <div className="font-semibold">Quando escolher</div>
                  <div className="fluid-muted mt-1">{guide.choose}</div>
                </div>
                <div className="rounded-[22px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                  <div className="font-semibold">Evite</div>
                  <div className="fluid-muted mt-1">{guide.avoid}</div>
                </div>
                <div className="rounded-[22px] border border-[var(--fluid-border)] bg-[var(--fluid-panel)] p-4">
                  <div className="font-semibold">Monitorar</div>
                  <div className="fluid-muted mt-1">{guide.monitor}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="cautions" 
        className="fluid-panel rounded-[32px] p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {[
            {
              title: 'Neurológico',
              icon: Brain,
              text: 'Em TCE, escolha de fluido e velocidade passam a ter impacto direto na pressão intracraniana.',
            },
            {
              title: 'Cardiorrenal',
              icon: HeartPulse,
              text: 'Cardiopatas e renais são os pacientes em que sobrecarga iatrogênica aparece mais cedo.',
            },
            {
              title: 'Segurança',
              icon: AlertTriangle,
              text: 'Nenhum card desta página substitui pressão arterial, eletrólitos, peso corporal e débito urinário.',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="fluid-panel-strong rounded-[28px] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="h-4 w-4" />
                  {item.title}
                </div>
                <p className="fluid-muted mt-3 text-sm leading-6">{item.text}</p>
              </div>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}
