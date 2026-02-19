import type { HelpContent } from '../types/help'

export const remifentanilTooltips: Record<string, HelpContent> = {

  // ─── Conceito principal ───────────────────────────────────────────────────
  concept: {
    title: 'Remifentanil: o opioide que "desliga" em minutos',
    sections: [
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'O remifentanil é um opioide de duração extremamente curta. Diferente de outros opioides que dependem do fígado ou dos rins para serem eliminados, ele é quebrado por enzimas chamadas esterases inespecíficas, presentes no sangue e nos tecidos de todo o corpo. Isso significa que sua eliminação é muito rápida e não depende do estado do fígado ou dos rins — uma vantagem importante em pacientes com essas doenças.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          {
            text: 'O efeito analgésico desaparece em 3 a 5 minutos após interromper a infusão. Por isso, é fundamental planejar uma analgesia de transição (outro opioide de maior duração, bloqueio local ou anti-inflamatório) antes de desligar a bomba.',
          },
        ],
      },
    ],
  },

  // ─── Unidade de dose ──────────────────────────────────────────────────────
  unit: {
    title: 'Unidade do remifentanil: mcg/kg/min (microgramas por quilo por minuto)',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'O remifentanil é padronizado em mcg/kg/min (microgramas por quilo por minuto) — diferente do fentanil, que usa mcg/kg/h (por hora). Confundir as duas unidades significa programar a bomba 60 vezes errada. Sempre confirme a unidade antes de programar.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          {
            text: 'Como o efeito é muito curto, pequenas mudanças na taxa produzem efeito rapidamente — isso permite titulação fina minuto a minuto durante procedimentos cirúrgicos.',
          },
        ],
      },
    ],
  },

  // ─── Analgesia de transição ───────────────────────────────────────────────
  transition: {
    title: 'Analgesia de transição: planeje antes de desligar',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'O remifentanil não deixa nenhum efeito residual após ser interrompido — o paciente fica sem analgesia em 3 a 5 minutos. Se você desligar a bomba sem ter preparado outro analgésico, o paciente acorda com dor intensa e agitação.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Planeje a analgesia de transição com antecedência: administre um opioide de maior duração (como morfina, metadona ou fentanil em dose única), realize um bloqueio local/regional ou administre um anti-inflamatório (quando indicado) antes de interromper a infusão de remifentanil.',
          },
        ],
      },
      {
        level: 'INFO',
        items: [
          { text: 'Sugestão prática: programe um alerta para iniciar a transição analgésica cerca de 30 minutos antes do fim previsto do procedimento.' },
        ],
      },
    ],
  },

  // ─── Reconstituição ───────────────────────────────────────────────────────
  reconstitution: {
    title: 'Como preparar o remifentanil para uso',
    sections: [
      {
        level: 'CRITICAL',
        items: [
          {
            text: 'O remifentanil é comercializado como pó liofilizado (pó seco em frasco). Nunca administre o pó diretamente — ele precisa ser reconstituído (dissolvido) e depois diluído antes do uso.',
            highlight: 'red',
          },
        ],
      },
      {
        level: 'IMPORTANT',
        items: [
          {
            text: 'Reconstituição: adicione 1 mL de diluente (soro fisiológico ou glicose 5%) para cada 1 mg de remifentanil no frasco. Isso gera uma solução de 1 mg/mL (1.000 mcg/mL) — ainda muito concentrada para uso direto.',
          },
          {
            text: 'Diluição para infusão: dilua a solução reconstituída até atingir a concentração alvo. O padrão mais usado é 50 mcg/mL. Para pacientes muito pequenos ou gatos, pode-se usar 20 mcg/mL para maior precisão na programação da bomba.',
          },
        ],
      },
    ],
  },
}
