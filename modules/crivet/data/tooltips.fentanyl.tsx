import type { HelpContent } from '../types/help'

export const fentanylTooltips: Record<string, HelpContent> = {

  // ─── Unidade de dose ───────────────────────────────────────────────────────
  unit: {
    title: 'Por que o fentanil é calculado em microgramas (mcg)?',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'O fentanil é um opioide muito potente — cerca de 75 a 100 vezes mais potente que a morfina. Por isso, as doses são minúsculas e medidas em microgramas (mcg), não em miligramas (mg). Um micrograma equivale a 0,001 mg. Confundir as duas unidades significa calcular uma dose 1.000 vezes errada — o que pode causar parada respiratória.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'O CriVET padroniza a dose de infusão contínua em mcg/kg/h (microgramas por quilo por hora). Alguns livros mais antigos usam mcg/kg/min — se você encontrar essa unidade, divida por 60 para converter para /h.',
            highlight: 'yellow',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Sempre verifique a unidade antes de calcular e rotule a seringa com a concentração em mcg/mL.' },
        ],
      },
    ],
  },

  // ─── Mecanismo ────────────────────────────────────────────────────────────
  mechanism: {
    title: 'Como o fentanil age no organismo',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'O fentanil se liga aos receptores mu-opioides (receptores específicos no sistema nervoso que controlam a percepção de dor). Ele é cerca de 75 a 100 vezes mais potente que a morfina, o que significa que doses muito pequenas já produzem analgesia intensa.',
          },
          {
            text: 'Em infusões contínuas prolongadas, o fármaco vai se acumulando nos tecidos gordurosos do corpo. Quando a infusão é interrompida, esse fármaco "guardado" volta lentamente para o sangue, prolongando o efeito e o tempo de recuperação.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          {
            text: 'O fentanil é lipossolúvel (dissolve-se em gordura), o que explica seu início de ação rápido (1 a 2 minutos) e sua curta duração após um bolus isolado (redistribuição rápida para os tecidos). Por isso, para manter analgesia contínua, é necessária a infusão contínua.',
          },
          { text: 'Um bolus isolado dura pouco — use infusão contínua para dor persistente.' },
        ],
      },
    ],
  },

  // ─── Adsorção em PVC ──────────────────────────────────────────────────────
  pvc: {
    title: 'Atenção: fentanil pode ser absorvido pelo equipo de PVC',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'O fentanil pode ser adsorvido (absorvido e retido) pelo material de PVC (policloreto de vinila) dos equipos e cateteres. Isso significa que parte da dose calculada pode ficar "presa" no tubo e não chegar ao paciente, reduzindo a dose efetiva entregue.',
            highlight: 'yellow',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          {
            text: 'Para minimizar esse problema: prefira equipos curtos, de polietileno (PE) ou poliuretano (PU), ou purgue o equipo com a solução do fármaco antes de conectar ao paciente.',
          },
        ],
      },
    ],
  },

  // ─── Dose alvo ────────────────────────────────────────────────────────────
  dose_help: {
    title: 'Dose alvo do fentanil: cuidados essenciais',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'O erro mais perigoso com fentanil é confundir miligramas (mg) com microgramas (mcg). Como o fentanil é 1.000 vezes mais potente em mcg do que em mg, uma troca de unidade resulta em uma dose 1.000 vezes errada — podendo causar apneia (parada respiratória) imediata.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'A dose alvo deve ser sempre expressa em mcg/kg/h. Confirme a unidade antes de programar a bomba.' },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Como o efeito de um bolus isolado é curto (redistribuição rápida), a infusão contínua é preferível para manter analgesia estável.' },
        ],
      },
    ],
  },

  // ─── Compatibilidade ──────────────────────────────────────────────────────
  compatibility: {
    title: 'Compatibilidade do fentanil com outros fármacos',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'Barbitúricos (como o tiopental): incompatíveis com fentanil na mesma seringa ou bolsa — ocorre precipitação (formação de partículas sólidas) que pode obstruir o cateter ou causar embolia.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Diluentes compatíveis: soro fisiológico (NaCl 0,9%), Ringer Lactato e glicose 5%.' },
          {
            text: 'Misturas comuns em protocolos multimodais: midazolam (benzodiazepínico sedativo), cetamina (anestésico dissociativo) e lidocaína — combinação conhecida como MLK (morfina-lidocaína-cetamina, mas frequentemente adaptada com fentanil no lugar da morfina).',
          },
          {
            text: 'Propofol: evite misturar na mesma seringa. Se precisar infundir ao mesmo tempo, use uma conexão em Y (dois fármacos chegam ao mesmo acesso venoso por vias separadas, encontrando-se apenas próximo ao paciente) ou uma linha separada.',
            highlight: 'yellow',
          },
        ],
      },
    ],
  },

  // ─── Recuperação prolongada ───────────────────────────────────────────────
  recovery: {
    title: 'Por que o paciente pode demorar para acordar após fentanil?',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Em infusões contínuas longas, o fentanil vai se acumulando nos tecidos gordurosos do corpo. Quando a infusão é interrompida, esse fármaco "guardado" retorna lentamente para o sangue, prolongando o efeito sedativo e analgésico muito além do esperado pela meia-vida inicial.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          {
            text: 'Esse fenômeno é chamado de "acúmulo dependente do contexto" — quanto mais longa a infusão, mais o fármaco se acumula nos tecidos e mais lenta é a recuperação.',
          },
          {
            text: 'Estratégia prática: reduza a taxa gradualmente antes de interromper (desmame) em vez de parar abruptamente. Se necessário, a naloxona (antagonista opioide) pode reverter o efeito, mas também reverte a analgesia.',
          },
        ],
      },
    ],
  },
}
