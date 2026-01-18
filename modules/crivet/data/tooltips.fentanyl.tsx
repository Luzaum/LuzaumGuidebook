import type { HelpContent } from '../types/help'

export const fentanylTooltips: Record<string, HelpContent> = {
  unit: {
    title: 'Unidade padrao do CRIVET: mcg/kg/h',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          { text: 'Fentanil deve ser calculado em microgramas (mcg); erro mcg<->mg muda dose 1000x.', highlight: 'red' },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Padronize CRI em mcg/kg/h; livros antigos usam /min.', highlight: 'yellow' },
        ],
      },
      {
        level: 'INFO',
        items: [{ text: 'Verifique a unidade antes de calcular.', highlight: 'green' }],
      },
    ],
  },
  mechanism: {
    title: 'Fentanil: "mute" da dor',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Agonista mu puro; potencia ~75-100x morfina.' },
          { text: 'Infusao prolongada pode prolongar recuperacao (context-sensitive).' },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Lipofilico: inicio 1-2 min; duracao 20-30 min.' },
          { text: 'Bolus dura pouco -> CRI para dor continua.', highlight: 'green' },
        ],
      },
    ],
  },
  pvc: {
    title: 'Dica: adsorcao em PVC',
    sections: [
      {
        level: 'IMPORTANT',
        items: [{ text: 'Adsorcao em PVC pode reduzir dose efetiva.', highlight: 'yellow' }],
      },
      {
        level: 'INFO',
        items: [{ text: 'Prefira linhas curtas/polietileno ou purgue antes.', highlight: 'green' }],
      },
    ],
  },
  dose_help: {
    title: 'Dose alvo (Fentanil)',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          { text: 'Erro mcg<->mg muda dose 1000x.', highlight: 'red' },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [{ text: 'Dose alvo em mcg/kg/h.' }],
      },
      {
        level: 'INFO',
        items: [{ text: 'Bolus dura pouco -> CRI preferivel.', highlight: 'green' }],
      },
    ],
  },
  compatibility: {
    title: 'Compatibilidade do Fentanil',
    sections: [
      {
        level: 'CRITICAL',
        items: [{ text: 'Barbituricos: precipita -> nao misturar.', highlight: 'red' }],
      },
      {
        level: 'IMPORTANT',
        items: [
          { text: 'Diluentes compativeis: NaCl 0,9%, Ringer Lactato, Glicose 5%.' },
          { text: 'Misturas usuais: Midazolam, Cetamina, Lidocaina (MLK).' },
          { text: 'Propofol: evitar mesma seringa; usar Y/linha separada.', highlight: 'yellow' },
        ],
      },
    ],
  },
  recovery: {
    title: 'Por que pode demorar para acordar?',
    sections: [
      {
        level: 'IMPORTANT',
        items: [{ text: 'Infusao prolongada prolonga recuperacao (context-sensitive).' }],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Acumulo/redistribuicao pode ultrapassar meia-vida inicial.' },
          { text: 'Dica: reduzir taxa gradualmente; considerar naloxona.', highlight: 'green' },
        ],
      },
    ],
  },
}
