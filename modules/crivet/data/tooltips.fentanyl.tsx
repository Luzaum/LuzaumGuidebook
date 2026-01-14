import React from 'react'
import type { ReactNode } from 'react'

export const fentanylTooltips: Record<string, ReactNode> = {
  unit: (
    <div className="space-y-3 text-sm leading-relaxed">
      <p className="font-semibold">Unidade padrão do CRIVET: mcg/kg/h ⏱️</p>
      <p>
        Para CRI em UTI, padronize em <b>mcg/kg/h</b>. Alguns livros antigos usam /min: isso pode gerar erro fatal de{' '}
        <b>60×</b> se confundido.
      </p>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="font-semibold mb-2">⚠️ Fentanil deve ser calculado em MICROGRAMAS (mcg)</p>
        <p className="text-white/80">
          Erro mcg↔mg muda a dose em <b>1000×</b>. Sempre verifique a unidade antes de calcular.
        </p>
      </div>
    </div>
  ),
  mechanism: (
    <div className="space-y-3 text-sm leading-relaxed">
      <p className="font-semibold">Fentanil = "mute" da dor 🔇</p>
      <p>
        <b>Classe:</b> Opioide agonista µ (Mu) puro. <b>Potência:</b> ~75–100× morfina.
      </p>
      <p>
        <b>Alta lipofilicidade</b> → atravessa BHE muito rápido → <b>início de ação em 1–2 min</b>, duração 20–30 min.
      </p>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="font-semibold mb-2">Context-sensitive</p>
        <p className="text-white/80">
          Em infusões prolongadas, tende a prolongar recuperação. Quanto mais tempo de infusão, maior chance de
          recuperação prolongada.
        </p>
      </div>
      <p>
        <b>Dica prática:</b> Bolus dura pouco → CRI é preferível para dor contínua.
      </p>
    </div>
  ),
  pvc: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Dica prática: adsorção em PVC 🧪</p>
      <p>
        Parte do fentanil pode aderir ao equipo (PVC), especialmente com taxa lenta e linha longa. Prefira linhas
        curtas/polietileno ou purgue antes de conectar.
      </p>
    </div>
  ),
  dose_help: (
    <div className="space-y-3 text-sm leading-relaxed">
      <p className="font-semibold">Dose alvo (Fentanil)</p>
      <p>
        <b>O que é:</b> microgramas por kg por hora (mcg/kg/h).
      </p>
      <p>
        <b>Por que importa:</b> fentanil é muito potente; errar mcg↔mg muda a dose em <b>1000×</b>.
      </p>
      <p>
        <b>Dica prática:</b> bolus dura pouco → CRI é preferível para dor contínua.
      </p>
    </div>
  ),
  compatibility: (
    <div className="space-y-3 text-sm leading-relaxed">
      <p className="font-semibold">Compatibilidade do Fentanil</p>
      <div>
        <p className="font-medium text-emerald-400 mb-1">✅ Diluentes compatíveis</p>
        <p className="text-white/80">NaCl 0,9%, Ringer Lactato, Glicose 5%</p>
      </div>
      <div>
        <p className="font-medium text-blue-400 mb-1">✅ Misturas usuais</p>
        <p className="text-white/80">Midazolam, Cetamina, Lidocaína (MLK)</p>
      </div>
      <div>
        <p className="font-medium text-red-400 mb-1">⛔ Incompatibilidades</p>
        <ul className="list-disc pl-5 text-white/80 space-y-1">
          <li>
            <b>Barbitúricos:</b> Risco de precipitação. Não misturar.
          </li>
          <li>
            <b>Propofol:</b> Evitar na mesma seringa. Preferir via em Y/linha separada.
          </li>
        </ul>
      </div>
    </div>
  ),
  recovery: (
    <div className="space-y-3 text-sm leading-relaxed">
      <p className="font-semibold">Por que pode demorar para acordar?</p>
      <p>
        Fentanil é <b>context-sensitive</b>: quanto mais tempo de infusão, maior chance de recuperação prolongada.
      </p>
      <p>
        Isso ocorre por <b>acúmulo/redistribuição</b> em infusões longas. A recuperação pode demorar mais que a meia-vida
        inicial (20–30 min).
      </p>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="font-semibold mb-2">Dica prática</p>
        <p className="text-white/80">
          Em infusões prolongadas, considere reduzir gradualmente a taxa antes de desligar completamente, ou ter
          naloxona disponível se necessário.
        </p>
      </div>
    </div>
  ),
}
