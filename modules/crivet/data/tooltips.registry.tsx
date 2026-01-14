import React from 'react'

// IDs padronizados (não quebra import)
export type TooltipId =
  | 'rate_help'
  | 'physiology_age'
  | 'comorbidities'
  | 'adjustment_guide'
  | 'ketamine_mechanism'
  | 'ketamine_cri'
  | 'ketamine_bolus'
  | 'ketamine_dilution'
  | 'dose_target'
  | 'dose_help'
  | 'concentration'
  | 'drug_concentration_help'
  | 'compatibility_help'
  | 'vehicle_help'

// Registry central
export const TOOLTIP_REGISTRY: Record<TooltipId, React.ReactNode> = {
  rate_help: (
    <div className="space-y-2 leading-relaxed">
      <p className="font-semibold">Taxa da bomba (mL/h)</p>
      <p>
        O app sugere automaticamente uma taxa segura e prática. Você pode ajustar depois. Mudar a taxa não muda a dose;
        muda a concentração final na seringa/bolsa.
      </p>
      <p className="text-xs opacity-80">Sugestões comuns (seringa): 1–5 mL/h (preferencial 2–5).</p>
    </div>
  ),

  physiology_age: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Idade fisiológica muda a farmacocinética</p>
      <p>
        <b>Neonatos:</b> ↑ água corporal, ↓ albumina, BHE mais permeável e fígado/rim imaturos → maior risco de droga
        livre e acúmulo. Sugestão: CRI ↓ ~50%.
      </p>
      <p>
        <b>Geriátricos:</b> ↑ gordura e ↓ clearance → iniciar baixo e titular; atenção ao volume.
      </p>
    </div>
  ),

  comorbidities: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Comorbidades alteram clearance e resposta</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>
          <b>Hepática:</b> ↑ meia-vida e droga livre → iniciar low end / reduzir CRI.
        </li>
        <li>
          <b>Renal:</b> risco de metabólitos/efeitos prolongados (ex.: morfina, metoclopramida).
        </li>
        <li>
          <b>Cardíaca:</b> evitar volume alto; cautela com α2 e cetamina em descompensados.
        </li>
        <li>
          <b>Sepse:</b> resposta errática; vasopressor pode precisar teto maior.
        </li>
      </ul>
    </div>
  ),

  adjustment_guide: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Ajuste ≠ receita: é titulação guiada por efeito</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>
          <b>Comece no low end</b> se risco (geriátrico, hepatopata, sepse, ICC).
        </li>
        <li>
          <b>Ajuste a cada 5–15 min</b> conforme objetivo (analgesia/sedação/PA).
        </li>
        <li>
          <b>Priorize monitorização</b> (FR/SpO₂/PA/temperatura, e glicemia em neonatos).
        </li>
        <li>
          <b>Se houver alerta crítico,</b> prefira alternativa do fármaco.
        </li>
      </ul>
    </div>
  ),

  ketamine_mechanism: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Cetamina: "reset" do NMDA</p>
      <p>Bloqueia NMDA (memória da dor) e reduz wind-up, ajudando em dor neuropática e somática intensa.</p>
    </div>
  ),

  ketamine_cri: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Cetamina — CRI analgésica</p>
      <p>2–10 mcg/kg/min (0,12–0,6 mg/kg/h). Bolus ataque: 0,25–0,5 mg/kg IV lento.</p>
      <p className="opacity-80">Acima de 10 mcg/kg/min em acordado → maior risco de disforia/psicomimético.</p>
    </div>
  ),

  ketamine_bolus: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Cetamina — Bolus</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>
          <b>Cães:</b> 2–5 mg/kg IV (com benzodiazepínico).
        </li>
        <li>
          <b>Gatos:</b> 2–5 mg/kg IV (com benzo) ou 5–10 mg/kg IM (contenção).
        </li>
      </ul>
    </div>
  ),

  ketamine_dilution: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Por que diluir?</p>
      <p>
        Em CRI analgésica a taxa pode ficar muito baixa (ex.: 0,05 mL/h com 100 mg/mL). Diluir para 1–2 mg/mL melhora
        precisão e segurança.
      </p>
    </div>
  ),

  dose_help: (
    <div className="space-y-2 leading-relaxed">
      <p className="font-semibold">Dose alvo</p>
      <p>Escolha a dose clínica. O CRIVET calcula automaticamente preparo, concentração e taxa sugerida.</p>
    </div>
  ),

  dose_target: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Dose alvo</p>
      <p>
        Escolha a dose prescrita e a unidade. O CRIVET converte automaticamente entre mcg/kg/min, mcg/kg/h, mg/kg/min e
        mg/kg/h.
      </p>
    </div>
  ),

  drug_concentration_help: (
    <div className="space-y-2 leading-relaxed">
      <p className="font-semibold">Concentração do fármaco</p>
      <p>Selecione a apresentação correta (ex.: 50 mcg/mL vs mg/mL) para evitar erro de ordem de grandeza.</p>
    </div>
  ),

  concentration: (
    <div className="space-y-2 text-sm leading-relaxed">
      <p className="font-semibold">Concentração do fármaco</p>
      <p>
        Selecione a concentração da ampola/frasco que você está usando. Se não estiver na lista, selecione 'Custom' para
        inserir manualmente.
      </p>
    </div>
  ),

  compatibility_help: (
    <div className="space-y-2 leading-relaxed">
      <p className="font-semibold">Compatibilidade</p>
      <p>
        Aqui o app mostra diluentes compatíveis, misturas usuais e incompatibilidades (precipitação/inativação). Se
        existir ⛔, não misturar na mesma seringa/bolsa.
      </p>
    </div>
  ),

  vehicle_help: (
    <div className="space-y-2 leading-relaxed">
      <p className="font-semibold">Veículo (seringa/bolsa)</p>
      <p>Define o volume final e influencia a concentração final e praticidade da infusão.</p>
    </div>
  ),
}
