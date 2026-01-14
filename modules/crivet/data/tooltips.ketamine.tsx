import React from 'react'

export const ketamineTooltips: Record<string, React.ReactNode> = {
  mechanism: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Como a cetamina funciona (modo simples)</p>
      <p>
        Ela bloqueia o receptor <b>NMDA</b>, envolvido na "memória da dor" na medula. Isso reduz{' '}
        <b>wind-up</b> (sensibilização central) e ajuda em dor neuropática.
      </p>
      <p className="text-xs opacity-80">
        Conceito-chave: menos amplificação crônica da dor → melhor analgesia como adjuvante.
      </p>
    </div>
  ),

  criMode: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Modo CRI (analgesia / anti-wind-up)</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>
          Faixa analgésica ("microdose"): <b>2–10 mcg/kg/min</b> (0,12–0,6 mg/kg/h).
        </li>
        <li>
          Bolus de ataque (opcional): <b>0,25–0,5 mg/kg IV lento</b>.
        </li>
        <li>
          Acima de <b>10 mcg/kg/min</b> em acordado: ↑ risco de disforia/efeitos psicomiméticos.
        </li>
      </ul>
    </div>
  ),

  bolusMode: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Modo Bolus (indução / contenção)</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>
          <b>Cães:</b> 2–5 mg/kg IV (preferir com benzodiazepínico).
        </li>
        <li>
          <b>Gatos:</b> 2–5 mg/kg IV (com benzo) ou 5–10 mg/kg IM (contenção).
        </li>
      </ul>
    </div>
  ),

  dilution: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Por que diluir?</p>
      <p>
        Em CRI analgésica, a taxa pode ficar tão baixa (ex.: 0,05 mL/h) que muitas bombas perdem
        precisão. Diluir para <b>1–2 mg/mL</b> torna a infusão segura e controlável.
      </p>
    </div>
  ),
}
