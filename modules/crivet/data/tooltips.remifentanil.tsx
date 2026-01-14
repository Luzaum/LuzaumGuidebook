import React from 'react'
import type { ReactNode } from 'react'

export const remifentanilTooltips: Record<string, ReactNode> = {
  concept: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Remifentanil: desligou a bomba, acabou ⚡</p>
      <p>
        Ele é quebrado por <b>esterases plasmáticas/tecido</b>. Não depende de fígado ou rim. Por isso o efeito some em{' '}
        <b>3–5 min</b> após parar.
      </p>
    </div>
  ),
  unit: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Unidade obrigatória: mcg/kg/min ⏱️</p>
      <p>Remifentanil é titulado minuto a minuto. Não padronize em /h para evitar confusão.</p>
    </div>
  ),
  transition: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Analgesia de transição (CRÍTICO) 🔁</p>
      <p>
        Remi não deixa “resíduo”. Planeje analgesia (metadona/morfina/AINE, etc.) antes de desligar, ou o paciente acorda
        com dor intensa.
      </p>
      <p className="opacity-80 text-xs">Sugestão do app: alerta automático ~30 min antes do fim do procedimento.</p>
    </div>
  ),
  reconstitution: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Reconstituição e diluição 🧪</p>
      <p>
        Reconstituir: <b>1 mL por 1 mg</b> → solução mãe <b>1 mg/mL (1000 mcg/mL)</b>. Depois diluir para{' '}
        <b>50 mcg/mL</b> (padrão) ou <b>20 mcg/mL</b> (pequenos/gatos).
      </p>
      <p className="text-xs opacity-80">Nunca administrar a solução mãe direto.</p>
    </div>
  ),
}
