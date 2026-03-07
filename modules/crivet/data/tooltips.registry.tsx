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
    <div className="space-y-3 leading-relaxed">
      <p className="font-semibold text-sky-300">Taxa da Bomba de Infusão (mL/h)</p>
      <p>
        Refere-se à velocidade com que o fluido (com o fármaco diluído) será infundido no paciente. O CRIVET sugere uma taxa automática com base no tipo de veículo (seringa ou bolsa) para ser prática e não sobrecarregar o volume do paciente.
      </p>
      <div className="bg-sky-900/40 p-3 rounded-lg border border-sky-500/30 text-xs space-y-2 mt-2">
        <p><strong className="text-white">Se você mudar a taxa aqui:</strong> o aplicativo recalculará a quantidade de fármaco (mL) que você deve colocar dentro da seringa ou bolsa para manter a dose constante. <b>A dose recebida pelo paciente NÃO muda.</b></p>
        <ul className="list-disc pl-4 opacity-80 mt-1">
          <li><strong>Seringa:</strong> Taxas ideais entre 1,0 e 5,0 mL/h (para modelos de 50 mL durarem de 10 a 50 horas).</li>
          <li><strong>Bolsa:</strong> Taxas maiores (ex: 10 a 30 mL/h) são mais fáceis de calibrar em equipos macrogotas/microgotas caso você não tenha bomba infusora contínua.</li>
        </ul>
      </div>
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
      <p className="opacity-80">Acima de 10 mcg/kg/min tende a TIVA; nunca usar isolada.</p>
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
          <b>Gatos:</b> 2–5 mg/kg IV (sempre com benzo) ou 5–10 mg/kg IM (contenção).
        </li>
        <li>
          <b>TIVA:</b> 10–50 mcg/kg/min com benzo + opioide.
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
      <p className="opacity-80">Para bolus/indução em pacientes pequenos, considerar 10 mg/mL (1:10).</p>
    </div>
  ),

  dose_help: (
    <div className="space-y-3 leading-relaxed">
      <p className="font-semibold text-emerald-300">Dose Alvo (Dose Clínica)</p>
      <p>
        Esta é a dose prescrita que o paciente deve receber. O cálculo de preparo será todo baseado nesta dose.
      </p>
      <div className="bg-emerald-900/30 p-3 rounded-md border border-emerald-500/20 text-xs">
        <p className="font-semibold text-emerald-100 mb-1">💡 Dose Indicada:</p>
        <p>Abaixo do campo da dose, você encontra as faixas indicadas para o fármaco selecionado. Essas são as faixas baseadas nos perfis farmacológicos atualizados para a espécie correspondente.</p>
        <ul className="list-disc pl-4 mt-2 mb-1 space-y-1 opacity-90">
          <li>Se você preencher uma subdose ou superdose, o sistema alertará abaixo do campo.</li>
        </ul>
      </div>
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
    <div className="space-y-3 leading-relaxed">
      <p className="font-semibold text-violet-300">Veículo e Volume Final</p>
      <p>Onde o fármaco será diluído. Esta decisão define a praticidade e a precisão do seu preparo.</p>
      <div className="grid grid-cols-2 gap-2 text-xs mt-2">
        <div className="bg-violet-900/20 p-2 rounded border border-violet-500/20">
          <p className="font-bold mb-1">Seringa (Perfusora)</p>
          <p className="opacity-80">Recomendada para infusões de precisão, pacientes pequenos, e fármacos vasoativos (nora, dobuta).</p>
        </div>
        <div className="bg-violet-900/20 p-2 rounded border border-violet-500/20">
          <p className="font-bold mb-1">Bolsa (Fluido)</p>
          <p className="opacity-80">Comum para CRI analgésicas em equipos de microgotas quando bombas de seringa não estão disponíveis.</p>
        </div>
      </div>
      <p className="text-xs text-white/60 italic mt-2">O volume escolhido ditará o tempo de duração que este preparo irá render.</p>
    </div>
  ),
}
