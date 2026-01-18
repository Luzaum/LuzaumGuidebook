import type { HelpContent } from '../types/help'
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

export const HELP_REGISTRY: Record<TooltipId, HelpContent> = {
  rate_help: {
    title: 'Taxa da bomba (mL/h): como escolher',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Taxa muda a concentracao, nao a dose.', highlight: 'yellow' },
          { text: 'Taxas < 0,5 mL/h sao imprecisas -> dilua e aumente a taxa.', highlight: 'yellow' },
          { text: 'Taxas altas aumentam volume/h -> reavaliar sobrecarga.', highlight: 'yellow' },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Concentracao necessaria = Dose total (mg/h) / Taxa (mL/h)' },
          { text: 'Sugestoes comuns (seringa): 1, 2, 3, 5, 10 mL/h.' },
          { text: 'Preferencial em UTI: 2-5 mL/h.' },
        ],
      },
    ],
  },

  dose_help: {
    title: 'Dose alvo: o que o CRIVET faz com isso',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Dose define o efeito clinico; CRIVET calcula preparo e concentracao.' },
          { text: 'Comece no low end em geriatrico/comorbidades.' },
          { text: 'Sepse: resposta imprevisivel (sedativos diminuem; vasopressores podem subir).' },
        ],
      },
      {
        level: 'INFO',
        items: [{ text: 'Prefira diluicoes que gerem taxas usaveis na bomba.' }],
      },
    ],
  },

  vehicle_help: {
    title: 'Veiculo: seringa vs bolsa',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Seringa: microdoses, menor volume, maior precisao.' },
          { text: 'Bolsa: pratica com manutencao, mas aumenta volume total.' },
        ],
      },
      {
        level: 'INFO',
        items: [{ text: 'Veiculo define volume final e taxa.' }],
      },
    ],
  },

  drug_concentration_help: {
    title: 'Concentracao do farmaco: principal fonte de erro grave',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          { text: 'Erro de concentracao muda a dose em ordem de grandeza.', highlight: 'red' },
          { text: 'Confirme unidade (mg/mL vs mcg/mL) antes de calcular.', highlight: 'red' },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Cetamina 100 mg/mL (10%) gera volume aspirado minusculo.', highlight: 'yellow' },
        ],
      },
      {
        level: 'INFO',
        items: [{ text: 'Cheque rotulo e apresentacao comercial.' }],
      },
    ],
  },

  compatibility_help: {
    title: 'Compatibilidade: diluentes e misturas',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Compatibilidade evita precipitacao/inativacao.' },
          { text: 'Incompatibilidade: nao misturar na mesma seringa/bolsa.', highlight: 'red' },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Compativel: mesma seringa/bolsa.' },
          { text: 'Y-site: usar linha separada.' },
        ],
      },
    ],
  },

  physiology_age_help: {
    title: 'Impacto da idade fisiologica em CRIs',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Neonatos: agua corporal alta, albumina baixa, BHE permeavel, CYP/TFG imaturos -> mais droga livre/acumulo.' },
          { text: 'Geriatricos: agua baixa, gordura alta, debito/perfusao baixos, SNC mais sensivel.' },
          { text: 'Conduta neonatal: reduzir CRI ~50% e monitorar glicemia.', highlight: 'green' },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Start low, go slow em geriatrico.' },
          { text: 'Lipofilicos tendem a exigir reducao maior.' },
        ],
      },
    ],
  },

  comorbidities_help: {
    title: 'Impacto das comorbidades em CRIs',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Hepatica: metabolismo baixo -> meia-vida alta; reduzir CRI.' },
          { text: 'Renal: acumulo de metabolitos; cuidado com morfina/metoclopramida.' },
          { text: 'Cardiaca: nao tolera volume; evitar alfa-2 em descompensados.' },
          { text: 'Sepse/SIRS: sedativos podem precisar menos; vasopressores podem precisar mais.' },
          { text: 'Endocrinas: Addison hipovolemico (NaCl 0,9%); Diabetes evitar diluir em glicose.' },
        ],
      },
      {
        level: 'INFO',
        items: [{ text: 'Cruzar droga x doenca antes de titular.' }],
      },
    ],
  },

  // Fentanil
  fent_unit: fentanylTooltips.unit,
  fent_mechanism: fentanylTooltips.mechanism,
  fent_pvc: fentanylTooltips.pvc,
  fent_dose_help: fentanylTooltips.dose_help,
  fent_compatibility: fentanylTooltips.compatibility,
  fent_recovery: fentanylTooltips.recovery,

  // Remifentanil
  remi_concept: remifentanilTooltips.concept,
  remi_unit: remifentanilTooltips.unit,
  remi_transition: remifentanilTooltips.transition,
  remi_reconstitution: remifentanilTooltips.reconstitution,
}
