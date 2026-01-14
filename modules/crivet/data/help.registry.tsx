import React from 'react'
import type { ReactNode } from 'react'
import { fentanylTooltips } from './tooltips.fentanyl'
import { remifentanilTooltips } from './tooltips.remifentanil'

export type TooltipId =
  | 'rate_help'
  | 'dose_help'
  | 'vehicle_help'
  | 'drug_concentration_help'
  | 'compatibility_help'
  | 'physiology_age_help'
  | 'comorbidities_help'
  // Fentanil
  | 'fent_unit'
  | 'fent_mechanism'
  | 'fent_pvc'
  | 'fent_dose_help'
  | 'fent_compatibility'
  | 'fent_recovery'
  // Remifentanil
  | 'remi_concept'
  | 'remi_unit'
  | 'remi_transition'
  | 'remi_reconstitution'

export const HELP_REGISTRY: Record<TooltipId, { title: string; content: ReactNode }> = {
  rate_help: {
    title: 'Taxa da bomba (mL/h): como escolher + valores comuns',
    content: (
      <div className="space-y-3">
        <p>
          A <b>dose</b> é a prescrição (ex.: mg/kg/h). A <b>taxa</b> é uma decisão operacional (mL/h). O CRIVET usa a
          taxa para calcular a <b>concentração final</b> na seringa/bolsa mantendo a dose correta.
        </p>

        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Fórmula</p>
          <p className="text-white/80">
            Concentração necessária (mg/mL) = Dose total (mg/h) ÷ Taxa (mL/h)
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Sugestões comuns (seringa)</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              <b>1 mL/h</b>: drogas muito potentes / pacientes muito pequenos
            </li>
            <li>
              <b>2 mL/h</b>: UTI, gatos, cães pequenos
            </li>
            <li>
              <b>3 mL/h</b>: CRI analgésica comum
            </li>
            <li>
              <b>5 mL/h</b>: padrão "equilíbrio" (precisão + praticidade)
            </li>
            <li>
              <b>10 mL/h</b>: quando a diluição já é confortável
            </li>
          </ul>
          <p className="text-xs text-white/60">
            Faixa preferencial em UTI: <b>2–5 mL/h</b>.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Alertas úteis</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              Taxas <b>&lt; 0,5 mL/h</b> podem ser imprecisas → considere diluir mais e aumentar a taxa.
            </li>
            <li>Taxas altas em seringa podem aumentar volume/h → reavaliar objetivo e sobrecarga.</li>
          </ul>
        </div>
      </div>
    ),
  },

  dose_help: {
    title: 'Dose alvo: o que o CRIVET faz com isso',
    content: (
      <div className="space-y-3">
        <p>
          A dose alvo define o <b>efeito clínico</b> (analgesia, sedação, vasopressor). O CRIVET converte essa dose para
          a necessidade por hora/minuto e calcula a concentração final do preparo.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Boas práticas</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              Comece no <b>low end</b> em geriátricos e comorbidades relevantes.
            </li>
            <li>Em sepse, a resposta pode ser imprevisível (sedativos ↓, vasopressores ↑).</li>
            <li>Se a droga for muito concentrada, prefira diluições que gerem taxas "usáveis".</li>
          </ul>
        </div>
      </div>
    ),
  },

  vehicle_help: {
    title: 'Veículo: seringa vs bolsa (por que isso importa)',
    content: (
      <div className="space-y-3">
        <p>
          O veículo define o <b>volume final</b> e impacta: precisão da bomba, praticidade e risco de sobrecarga.
        </p>
        <ul className="list-disc pl-5 text-white/85 space-y-1">
          <li>
            <b>Seringa</b>: ideal para microdoses/ICU, menor volume, alta precisão.
          </li>
          <li>
            <b>Bolsa</b>: útil quando a droga acompanha manutenção, mas cuidado com volume total.
          </li>
        </ul>
      </div>
    ),
  },

  drug_concentration_help: {
    title: 'Concentração do fármaco: a principal fonte de erro grave',
    content: (
      <div className="space-y-3">
        <p>
          O mesmo fármaco pode existir em apresentações muito diferentes. Errar aqui muda a dose em ordem de grandeza.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Exemplos de pegadinha</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              Cetamina: comum <b>100 mg/mL</b> (10%) → volume aspirado pode ser minúsculo
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  compatibility_help: {
    title: 'Compatibilidade: diluentes, misturas e incompatibilidades',
    content: (
      <div className="space-y-3">
        <p>
          Compatibilidade evita precipitação/inativação e erros de mistura. O CRIVET deve exibir: <b>diluentes
          compatíveis</b>, <b>misturas aceitas</b> e <b>incompatibilidades</b>.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="font-semibold">Como interpretar</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>✅: geralmente seguro na mesma seringa/bolsa</li>
            <li>⚠️: pode correr em Y/linha separada, depende da concentração</li>
            <li>⛔: não misturar (precipita/inativa)</li>
          </ul>
        </div>
      </div>
    ),
  },

  physiology_age_help: {
    title: 'Impacto da idade fisiológica nas CRIs (neonato vs geriátrico)',
    content: (
      <div className="space-y-4">
        <p>
          Idade não é só tempo de vida: é <b>compartimentação de água</b>, <b>ligação proteica</b>, <b>barreira
          hematoencefálica</b> e <b>clearance hepato-renal</b>.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">🍼 Neonatos &lt; 12 semanas — "saco de água + fígado imaturo"</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              <b>Água corporal total</b> ~80% (adultos ~60%) → Vd ↑ para hidrossolúveis
            </li>
            <li>
              <b>Albumina ↓</b> → mais droga livre
            </li>
            <li>
              <b>BHE mais permeável</b> → SNC mais sensível
            </li>
            <li>
              <b>CYP/TFG imaturos</b> até ~3–4 meses → clearance ↓ e acúmulo
            </li>
          </ul>
          <div className="mt-2 rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="font-semibold">Conduta sugerida no CRIVET</p>
            <ul className="list-disc pl-5 text-white/85 space-y-1">
              <li>
                <b>CRI:</b> reduzir ~50% (tende a acumular)
              </li>
              <li>
                <b>Lipofílicos</b> (ex.: propofol): reduzir mais, risco de depressão respiratória
              </li>
              <li>
                <b>Monitorar glicemia</b> (hipoglicemia é comum com estresse/jejum)
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">👴 Geriátricos — "motor cansado + pouca reserva"</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              <b>Água ↓</b>, <b>gordura ↑</b>, <b>músculo ↓</b>
            </li>
            <li>
              <b>Débito cardíaco ↓</b> → menor perfusão hepática/renal
            </li>
            <li>
              <b>SNC mais sensível</b> a depressores
            </li>
          </ul>
          <div className="mt-2 rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="font-semibold">Conduta sugerida no CRIVET</p>
            <ul className="list-disc pl-5 text-white/85 space-y-1">
              <li>Iniciar <b>20–30% abaixo</b> e titular ("start low, go slow")</li>
              <li>Preferir diluições mais concentradas para <b>reduzir volume</b></li>
              <li>Atenção a "hangover" por redistribuição em gordura</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },

  comorbidities_help: {
    title: 'Impacto das comorbidades em CRIs (fármaco × doença)',
    content: (
      <div className="space-y-4">
        <p>
          Comorbidades mudam <b>clearance</b>, <b>fração livre</b> e <b>resposta de receptor</b>. O CRIVET deve cruzar:
          <b> Droga × Doença</b> e gerar alertas práticos.
        </p>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">🟤 Hepatopatas / Shunt — "filtro entupido"</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>Metabolismo hepático ↓ → meia-vida ↑ (acúmulo)</li>
            <li>Hipoalbuminemia → droga livre ↑ (sobredose relativa)</li>
            <li>
              <b>Evitar benzos</b> (risco encefalopatia hepática)
            </li>
            <li>
              <b>Lidocaína</b>: reduzir 50–70% ou evitar (risco convulsão)
            </li>
            <li>
              Opioides: preferir <b>remifentanil</b> quando possível; senão reduzir taxa
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">🟦 Renopatas — "ralo fechado"</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>Metabólitos ativos/tóxicos podem acumular (ex.: morfina)</li>
            <li>Metoclopramida pode acumular → sinais extrapiramidais</li>
            <li>
              Preferir bombas de seringa para <b>não sobrecarregar volume</b>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">❤️ Cardiopatas / ICC — "bomba fraca"</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>Baixo débito → indução e clearance mais lentos</li>
            <li>
              Não tolera volume → preferir <b>concentração maior / volume menor</b>
            </li>
            <li>
              <b>Dexmedetomidina</b>: evitar em descompensados (↑ pós-carga)
            </li>
            <li>
              <b>Cetamina</b>: cuidado em CMH/estenose (↑ consumo O₂ miocárdio)
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">🟥 Sepse / SIRS — "vaso furado e dilatado"</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>Vd ↑, albumina ↓, acidose altera ligação proteica</li>
            <li>Sedativos: frequentemente <b>precisam de menos</b> (BHE inflamada)</li>
            <li>Vasopressores: podem precisar <b>doses acima do usual</b> (refratariedade)</li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <p className="font-semibold">🟨 Endocrinopatias</p>
          <ul className="list-disc pl-5 text-white/85 space-y-1">
            <li>
              <b>Addison</b>: hipovolêmico/sensível; NaCl 0,9% é preferência; evitar etomidato
            </li>
            <li>
              <b>Diabetes</b>: evitar diluir em SG 5% e cautela com dexmedetomidina (↓ insulina)
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  // Fentanil
  fent_unit: {
    title: 'Unidade padrão do CRIVET: mcg/kg/h',
    content: fentanylTooltips.unit,
  },
  fent_mechanism: {
    title: 'Fentanil = "mute" da dor',
    content: fentanylTooltips.mechanism,
  },
  fent_pvc: {
    title: 'Dica: adsorção em PVC',
    content: fentanylTooltips.pvc,
  },
  fent_dose_help: {
    title: 'Dose alvo (Fentanil)',
    content: fentanylTooltips.dose_help,
  },
  fent_compatibility: {
    title: 'Compatibilidade do Fentanil',
    content: fentanylTooltips.compatibility,
  },
  fent_recovery: {
    title: 'Por que pode demorar para acordar?',
    content: fentanylTooltips.recovery,
  },

  // Remifentanil
  remi_concept: {
    title: 'Remifentanil: desligou a bomba, acabou',
    content: remifentanilTooltips.concept,
  },
  remi_unit: {
    title: 'Unidade obrigatória: mcg/kg/min',
    content: remifentanilTooltips.unit,
  },
  remi_transition: {
    title: 'Analgesia de transição (crítico)',
    content: remifentanilTooltips.transition,
  },
  remi_reconstitution: {
    title: 'Reconstituição e diluição',
    content: remifentanilTooltips.reconstitution,
  },
}
