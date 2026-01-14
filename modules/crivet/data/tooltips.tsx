import React from 'react'

export const physiologyTooltipContent = (
  <div className="space-y-3 text-sm leading-relaxed">
    <p className="font-semibold">Idade fisiológica muda a farmacocinética</p>
    
    <div className="space-y-2">
      <p>
        <strong>Neonatos (&lt;12 sem):</strong> ↑ água corporal, ↓ albumina, BHE mais permeável, fígado/rim imaturos → maior risco de droga "livre" e acúmulo.
      </p>
      <p>
        <strong>Regra prática:</strong> hidrossolúveis podem precisar bolus igual/↑ leve; lipofílicas pedem bolus ↓; CRI ↓ ~50%. Monitorar glicemia.
      </p>
    </div>

    <div className="space-y-2 pt-2 border-t border-border/40">
      <p>
        <strong>Geriátricos:</strong> ↓ água, ↑ gordura, ↓ débito/fluxo hepato-renal, SNC mais sensível → comece baixo e titule.
      </p>
      <p>
        <strong>Regra prática:</strong> dose inicial ↓ 20–30% e atenção ao volume (prefira diluições mais concentradas).
      </p>
    </div>
  </div>
)

export const comorbiditiesTooltipContent = (
  <div className="space-y-3 text-sm leading-relaxed">
    <p className="font-semibold">Doença muda "clearance" e volume de distribuição</p>
    
    <div className="space-y-2">
      <p>
        <strong>Hepática:</strong> ↓ metabolismo + ↓ albumina → ↑ droga livre e ↑ meia-vida → CRI geralmente ↓ ~50% (dependente do fármaco).
      </p>
      <p>
        <strong>Renal:</strong> ↑ acúmulo de metabólitos/efeitos tardios → cuidado com morfina e metoclopramida.
      </p>
      <p>
        <strong>Cardíaca (ICC):</strong> não tolera volume; baixo débito → indução/eliminação lentas. Evitar α2 descompensado.
      </p>
      <p>
        <strong>Sepse/SIRS:</strong> Vd ↑ e ligação proteica ↓ → resposta errática. Vasopressores podem precisar teto maior; sedativos podem precisar menos.
      </p>
      <p>
        <strong>Endócrinas:</strong> Addison = hipovolêmico/sensível; Diabetes = evitar diluir em glicose e cuidado com drogas que alteram insulina.
      </p>
    </div>
  </div>
)

export const adjustmentTooltipContent = (
  <div className="space-y-3 text-sm leading-relaxed">
    <p className="font-semibold">Ajuste ≠ receita: é titulação guiada por efeito</p>
    
    <div className="space-y-2">
      <p>
        <strong>Comece no low end</strong> se risco (geriátrico, hepatopata, sepse, ICC).
      </p>
      <p>
        <strong>Ajuste a cada 5–15 min</strong> conforme objetivo (analgesia/sedação/PA).
      </p>
      <p>
        <strong>Priorize monitorização</strong> (FR/SpO₂/PA/temperatura, e glicemia em neonatos).
      </p>
      <p>
        <strong>Se houver alerta crítico,</strong> prefira alternativa do fármaco.
      </p>
    </div>
  </div>
)
