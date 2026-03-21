import React from 'react'
import { BookOpenText, CheckCircle2, Route, Scale } from 'lucide-react'
import { GUIDE_BLOCKS } from './content'

export function FluidoterapiaGuideView() {
  return (
    <div className="space-y-6">
      <section id="principles" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="fluid-kicker text-xs font-semibold uppercase tracking-[0.24em]">
              Guia clínico
            </div>
            <h2 className="fluid-heading mt-3 text-3xl font-semibold">
              Como pensar a fluidoterapia e por que os cálculos existem
            </h2>
            <p className="fluid-muted mt-3 max-w-3xl text-sm leading-7">
              Esta página é a parte didática do webapp. Ela explica o racional do consenso,
              quando escolher cada cálculo e por que manutenção não substitui choque nem
              reidratação.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              'Ressuscitação não é manutenção.',
              'Reidratação corrige déficit ao longo do tempo.',
              'Perdas contínuas nunca devem ser esquecidas.',
            ].map((item) => (
              <div key={item} className="fluid-panel-strong rounded-[26px] p-4 text-sm font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="formulas" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Scale className="h-4 w-4" />
              Fórmulas de manutenção
            </div>
            <ul className="fluid-muted mt-4 space-y-2 text-sm leading-6">
              <li>• Cão: 60 mL/kg/dia.</li>
              <li>• Cão: 132 x kg^0,75.</li>
              <li>• Gato: 40 mL/kg/dia.</li>
              <li>• Gato: 80 x kg^0,75.</li>
              <li>• Ambos: 30 x kg + 70.</li>
            </ul>
          </div>
          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BookOpenText className="h-4 w-4" />
              Déficit de reidratação
            </div>
            <p className="fluid-muted mt-4 text-sm leading-6">
              Déficit = peso (kg) x % de desidratação x 1000. O consenso propõe distribuir essa
              correção ao longo de 12 a 24 horas, em vez de despejar o volume como se fosse
              ressuscitação.
            </p>
          </div>
          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Route className="h-4 w-4" />
              Plano total
            </div>
            <p className="fluid-muted mt-4 text-sm leading-6">
              O total do dia nasce da soma entre manutenção, déficit de reidratação e perdas
              contínuas. Bolus de choque ficam fora dessa conta contínua.
            </p>
          </div>
        </div>
      </section>

      <section id="when" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-4 xl:grid-cols-3">
          {GUIDE_BLOCKS.map((block) => (
            <article key={block.title} className="fluid-panel-strong rounded-[28px] p-5">
              <h3 className="fluid-heading text-2xl font-semibold">{block.title}</h3>
              <p className="fluid-muted mt-3 text-sm leading-7">{block.body}</p>
              <ul className="fluid-muted mt-4 space-y-2 text-sm leading-6">
                {block.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="routes" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-4 xl:grid-cols-4">
          {[
            { title: 'IV / IO', body: 'Via prioritária para hipovolemia, choque e pacientes com perfusão ruim.' },
            { title: 'SC', body: 'Mais útil em ambulatório e pacientes selecionados, nunca como reflexo automático.' },
            { title: 'Enteral', body: 'Subutilizada. Deve entrar sempre que o trato gastrointestinal permitir.' },
            { title: 'Hipertônica', body: 'Ferramenta de nicho para indicações específicas, não substituta da reidratação.' },
          ].map((item) => (
            <div key={item.title} className="fluid-panel-strong rounded-[28px] p-5">
              <div className="text-base font-semibold">{item.title}</div>
              <p className="fluid-muted mt-3 text-sm leading-6">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="trust" className="fluid-panel rounded-[32px] p-6 md:p-8">
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Quando confiar no número
            </div>
            <ul className="fluid-muted mt-4 space-y-2 text-sm leading-6">
              <li>• Peso foi confirmado.</li>
              <li>• Espécie e fase fisiológica fazem sentido.</li>
              <li>• Déficit e perdas foram estimados conscientemente.</li>
              <li>• O método escolhido foi revisado e está visível na tela.</li>
            </ul>
          </div>
          <div className="fluid-panel-strong rounded-[28px] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Quando não confiar sozinho
            </div>
            <ul className="fluid-muted mt-4 space-y-2 text-sm leading-6">
              <li>• Cardiopata, renal oligúrico ou hipoalbuminêmico.</li>
              <li>• Distúrbio importante de sódio, potássio ou glicose.</li>
              <li>• Quadro neurológico ou necessidade de osmoterapia.</li>
              <li>• Sinais de sobrecarga surgindo durante a infusão.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
