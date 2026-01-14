import React from 'react'
import type { ReactNode } from 'react'

export const midazolamTooltips: Record<string, ReactNode> = {
  mechanism: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Midazolam: o “óleo do freio” GABA 🧠</p>
      <p>
        O GABA é o “pedal de freio” do cérebro. O midazolam torna esse freio mais eficiente: neurônios ficam mais
        silenciosos → ansiólise, sedação, relaxamento muscular e efeito anticonvulsivante.
      </p>
      <p className="opacity-80 text-xs">Em doença hepática grave, esse “freio” pode travar → sedação prolongada/coma.</p>
    </div>
  ),

  paradoxical: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Excitação paradoxal (“gremlin”) 😵‍💫</p>
      <p>
        Em pacientes jovens, hígidos e sem dor, benzodiazepínicos isolados podem causar desinibição: vocalização,
        agitação, tentativa de morder.
      </p>
      <p className="opacity-80 text-xs">
        Regra prática: preferir associar opioide/anestésico. Se ocorrer, considerar flumazenil ou aprofundar anestesia.
      </p>
    </div>
  ),

  antidote: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Antídoto: Flumazenil 💉</p>
      <p>Reversão: 0,01–0,02 mg/kg IV.</p>
      <p className="opacity-80 text-xs">Útil em sedação excessiva, principalmente quando combinado com opioides.</p>
    </div>
  ),
}
