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

  // ─── Taxa da bomba ────────────────────────────────────────────────────────
  rate_help: {
    title: 'Taxa da bomba (mL/h): como escolher',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'A taxa (mL/h) determina a velocidade com que o líquido entra na veia — ela não muda a dose, mas muda a concentração que você precisa preparar. Quanto mais lenta a taxa, mais concentrada precisa ser a solução.',
            highlight: 'yellow',
          },
          {
            text: 'Taxas abaixo de 0,5 mL/h são imprecisas: a maioria das bombas de seringa não consegue entregar volumes tão pequenos de forma confiável, e pequenas variações mecânicas causam erros grandes na dose real. Nesses casos, dilua mais o fármaco e aumente a taxa.',
            highlight: 'yellow',
          },
          {
            text: 'Taxas muito altas (acima de 10 mL/h em seringa) aumentam muito o volume de líquido infundido por hora — reavalie se o paciente tolera essa sobrecarga de volume.',
            highlight: 'yellow',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Fórmula: Concentração necessária (mg/mL) = Dose total (mg/h) ÷ Taxa (mL/h).' },
          { text: 'Taxas mais usadas em bomba de seringa: 1, 2, 3, 5 e 10 mL/h. O ideal em UTI é manter entre 2 e 5 mL/h para equilibrar precisão e volume.' },
          { text: 'Se a taxa calculada for menor que 0,5 mL/h, refaça a diluição para uma concentração menor e recalcule.' },
        ],
      },
    ],
  },

  // ─── Dose alvo ────────────────────────────────────────────────────────────
  dose_help: {
    title: 'Dose alvo: o que o CriVET faz com esse número',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'A dose define o efeito clínico que você quer (analgesia, sedação, suporte cardiovascular). O CriVET usa esse valor para calcular automaticamente como preparar a solução e a que velocidade programar a bomba.',
          },
          {
            text: 'Em pacientes idosos ou com doenças graves, sempre comece pela dose mínima da faixa e aumente devagar — esses pacientes são mais sensíveis e têm menos reserva para tolerar efeitos adversos.',
          },
          {
            text: 'Em sepse (infecção grave com resposta inflamatória sistêmica), a resposta aos fármacos é imprevisível: sedativos podem ter efeito exagerado (precisam de dose menor), enquanto vasopressores (medicamentos que elevam a pressão) podem precisar de doses maiores.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Prefira diluições que gerem taxas práticas na bomba (entre 2 e 5 mL/h em seringa), pois isso reduz erros de programação.' },
        ],
      },
    ],
  },

  // ─── Veículo ──────────────────────────────────────────────────────────────
  vehicle_help: {
    title: 'Veículo: seringa ou bolsa?',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Seringa (bomba de seringa): ideal para microdoses e fármacos potentes. Permite maior precisão, menor volume total infundido e troca rápida. Preferida em UTI e para fármacos vasoativos.',
          },
          {
            text: 'Bolsa (equipo de infusão): prática para manutenção prolongada, mas aumenta o volume total de líquido que o paciente recebe por hora — avalie se o paciente tolera essa carga hídrica extra.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'O veículo escolhido define o volume final da solução e, consequentemente, a taxa (mL/h) calculada.' },
        ],
      },
    ],
  },

  // ─── Concentração do fármaco ──────────────────────────────────────────────
  drug_concentration_help: {
    title: 'Concentração do fármaco: principal fonte de erro grave',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'Um erro na concentração muda a dose em 10 vezes ou mais. Por exemplo: confundir mg/mL com mcg/mL (micrograma por mililitro) faz você calcular uma dose 1.000 vezes errada.',
            highlight: 'red',
          },
          {
            text: 'Sempre confirme a unidade no rótulo do frasco (mg/mL ou mcg/mL) antes de calcular. Faça dupla checagem com outro profissional quando possível.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Cetamina 100 mg/mL (frasco de 10%): é uma concentração muito alta. Para infusão contínua em pacientes pequenos, o volume aspirado pode ser tão pequeno (ex.: 0,05 mL) que qualquer erro de medida representa uma dose muito diferente da calculada. Sempre dilua antes de usar em infusão contínua.',
            highlight: 'yellow',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Verifique o rótulo e a apresentação comercial disponível no seu serviço antes de iniciar o cálculo.' },
        ],
      },
    ],
  },

  // ─── Compatibilidade ──────────────────────────────────────────────────────
  compatibility_help: {
    title: 'Compatibilidade: diluentes e misturas de fármacos',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Compatibilidade significa que dois fármacos ou um fármaco e seu diluente podem ser misturados sem que ocorra precipitação (formação de partículas sólidas) ou inativação química de um deles.',
          },
          {
            text: 'Incompatibilidade: nunca misture fármacos incompatíveis na mesma seringa ou bolsa. A mistura pode parecer normal visualmente, mas o fármaco pode estar inativo ou formar partículas que obstruem o cateter ou causam embolia.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Compatível na mesma seringa/bolsa: os dois fármacos podem ser misturados diretamente.' },
          {
            text: 'Compatível em Y-site: os fármacos não podem ser misturados, mas podem ser infundidos ao mesmo tempo pelo mesmo acesso venoso, desde que cada um venha em sua própria seringa/bolsa e se encontrem apenas no ponto de conexão em Y (próximo ao paciente). Sempre faça flush (lavagem com soro) entre trocas.',
          },
        ],
      },
    ],
  },

  // ─── Fisiologia por idade ─────────────────────────────────────────────────
  physiology_age_help: {
    title: 'Como a idade do paciente muda a resposta aos fármacos',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Neonatos (filhotes com menos de 4 semanas): têm muito mais água no corpo (o que dilui os fármacos), menos albumina no sangue (proteína que "segura" os fármacos — com menos albumina, mais fármaco fica livre e ativo), a barreira hematoencefálica (filtro que protege o cérebro) ainda não está completamente formada (deixa mais fármaco entrar no sistema nervoso central), e as enzimas do fígado responsáveis por metabolizar fármacos (chamadas de enzimas do citocromo P450) e os rins ainda estão imaturos. Resultado: mais fármaco livre circulando e risco de acúmulo — reduza a dose de infusão contínua em cerca de 50% e monitore a glicemia (açúcar no sangue), pois neonatos têm reservas baixas.',
            highlight: 'yellow',
          },
          {
            text: 'Pacientes geriátricos (idosos): têm menos água corporal, mais gordura (fármacos que se dissolvem em gordura ficam "presos" por mais tempo), débito cardíaco reduzido (o coração bombeia menos sangue por minuto, o que lentifica a distribuição e eliminação dos fármacos), e o sistema nervoso central é mais sensível — reagem com mais intensidade à mesma dose. Comece sempre pela dose mínima e aumente devagar.',
          },
          {
            text: 'Conduta prática em neonatos: reduza a infusão contínua em cerca de 50% da dose adulta e monitore a glicemia regularmente.',
            highlight: 'yellow',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Em pacientes idosos: comece com a menor dose e aumente gradualmente conforme a resposta clínica.' },
          { text: 'Fármacos que se dissolvem em gordura (lipossolúveis, como propofol e fentanil) tendem a precisar de redução maior em idosos, pois se acumulam no tecido adiposo e têm efeito mais prolongado.' },
        ],
      },
    ],
  },

  // ─── Comorbidades ─────────────────────────────────────────────────────────
  comorbidities_help: {
    title: 'Como as doenças do paciente mudam a dose dos fármacos',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Doença hepática (fígado): o fígado é o principal órgão que metaboliza (quebra e elimina) a maioria dos fármacos. Quando ele está comprometido, os fármacos ficam mais tempo no sangue e o efeito dura mais — reduza a dose de infusão contínua. Além disso, com menos albumina produzida pelo fígado, mais fármaco fica livre e ativo no sangue.',
          },
          {
            text: 'Doença renal (rins): os rins eliminam os metabólitos (produtos da quebra dos fármacos) pela urina. Quando os rins não funcionam bem, esses metabólitos se acumulam e podem ter efeito prolongado ou tóxico. Atenção especial com morfina (cujo metabólito ativo se acumula) e metoclopramida.',
          },
          {
            text: 'Doença cardíaca: o coração comprometido não tolera sobrecarga de volume — prefira soluções mais concentradas em menor volume. Evite agonistas alfa-2 (como dexmedetomidina) em pacientes com insuficiência cardíaca descompensada, pois causam bradicardia e reduzem o débito cardíaco.',
          },
          {
            text: 'Sepse e síndrome de resposta inflamatória sistêmica (infecção grave ou inflamação intensa que afeta o corpo todo): o volume de distribuição dos fármacos aumenta (eles se "espalham" mais) e a ligação às proteínas diminui. Sedativos podem ter efeito exagerado (use menos); vasopressores (medicamentos que elevam a pressão) podem precisar de doses maiores.',
          },
          {
            text: 'Doenças endócrinas: pacientes com hipoadrenocorticismo (doença de Addison — glândulas adrenais que não produzem cortisol e aldosterona) costumam estar hipovolêmicos (com pouco volume circulante) — prefira soro fisiológico (NaCl 0,9%) como diluente. Pacientes diabéticos: evite diluir fármacos em soluções de glicose, pois isso pode descompensar a glicemia.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Sempre cruze a doença do paciente com o perfil do fármaco antes de iniciar ou titular a dose.' },
        ],
      },
    ],
  },

  // ─── Fentanil (delegados ao arquivo de tooltips) ──────────────────────────
  fent_unit: fentanylTooltips.unit,
  fent_mechanism: fentanylTooltips.mechanism,
  fent_pvc: fentanylTooltips.pvc,
  fent_dose_help: fentanylTooltips.dose_help,
  fent_compatibility: fentanylTooltips.compatibility,
  fent_recovery: fentanylTooltips.recovery,

  // ─── Remifentanil (delegados ao arquivo de tooltips) ─────────────────────
  remi_concept: remifentanilTooltips.concept,
  remi_unit: remifentanilTooltips.unit,
  remi_transition: remifentanilTooltips.transition,
  remi_reconstitution: remifentanilTooltips.reconstitution,
}
