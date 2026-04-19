/**
 * Modified Glasgow Coma Scale (MGCS) — cães e gatos.
 * Três domínios, cada um pontuado de 1 (pior) a 6 (melhor). Total 3–18.
 * Referência: Platt SR et al.; uso clínico em neurologia veterinária.
 */

export type MgcsDomainId = 'motor' | 'brainstem' | 'consciousness'

export type MgcsLevel = {
  score: 1 | 2 | 3 | 4 | 5 | 6
  label: string
  summary: string
  detail: string
}

export const MGCS_DOMAINS: {
  id: MgcsDomainId
  title: string
  shortTitle: string
  description: string
  levels: MgcsLevel[]
}[] = [
  {
    id: 'motor',
    title: 'Atividade motora',
    shortTitle: 'Motor',
    description:
      'Avalia postura espontânea, movimentos voluntários e resposta a estímulos. Reflete integridade do sistema motor e grau de depressão do SNC.',
    levels: [
      {
        score: 6,
        label: 'Normal',
        summary: 'Marcha e postura normais; movimentos voluntários adequados.',
        detail:
          'Animal alerta, ambulatório quando esperado, sem paresia/plegia evidente. Ausência de posturas anormais persistentes atribuíveis a depressão do SNC.',
      },
      {
        score: 5,
        label: 'Levemente alterado',
        summary: 'Hesitação leve ou fraqueza discreta, mas ainda funcional.',
        detail:
          'Pode haver leve ataxia ou assimetria sem perda grave de função. Útil para diferenciar de piora progressiva.',
      },
      {
        score: 4,
        label: 'Moderadamente alterado',
        summary: 'Paresia evidente ou marcha muito comprometida.',
        detail:
          'Déficit motor claro (ex.: paraparesia, hemiparesia) ou ataxia severa que limita deslocamento.',
      },
      {
        score: 3,
        label: 'Gravemente alterado',
        summary: 'Recumbência com movimento involuntário ou mínima atividade voluntária.',
        detail:
          'Animal em decúbito com poucos movimentos propositais; pode haver opistótono ou rigidez.',
      },
      {
        score: 2,
        label: 'Muito grave',
        summary: 'Recumbência, sem movimentos voluntários significativos.',
        detail:
          'Resposta motora mínima a estímulos; preocupação com progressão para arreflexia.',
      },
      {
        score: 1,
        label: 'Ausente / pior prognóstico motor',
        summary: 'Sem atividade motora voluntária detectável.',
        detail:
          'Compatível com lesão encefálica/medular grave ou estado terminal do SNC. Correlacionar sempre com reflexos de tronco e nocicepção.',
      },
    ],
  },
  {
    id: 'brainstem',
    title: 'Função do tronco encefálico (reflexos)',
    shortTitle: 'Tronco',
    description:
      'Reflexos pupilares, oculocefálicos, palpebral e outros reflexos de tronco. Indicam integridade de vias vitais no mesencéfalo/ponte/medula.',
    levels: [
      {
        score: 6,
        label: 'Normal',
        summary: 'PLR e reflexos de tronco simétricos e presentes.',
        detail:
          'Pupilas reativas; reflexo de ameaça quando aplicável; reflexo palpebral normal; função facial e mandibular preservadas conforme teste.',
      },
      {
        score: 5,
        label: 'Levemente alterado',
        summary: 'Assimetria leve ou lentificação de reflexos.',
        detail:
          'Pode ocorrer em processos iniciais ou edema; monitorar evolução horária.',
      },
      {
        score: 4,
        label: 'Moderadamente alterado',
        summary: 'PLR lento ou parcial; déficits cranianos focais.',
        detail:
          'Sugere comprometimento de tronco ou nervos cranianos; correlacionar com imagem e MGCS global.',
      },
      {
        score: 3,
        label: 'Gravemente alterado',
        summary: 'PLR ausente ou muito anormal; múltiplos déficits de tronco.',
        detail:
          'Alerta para hipertensão intracraniana, herniação ou lesão difusa. Prognóstico reservado.',
      },
      {
        score: 2,
        label: 'Muito grave',
        summary: 'Reflexos de tronco em risco; sinais de desfunção bulbar.',
        detail:
          'Pode coexistir com alteração respiratória. Considerar suporte intensivo.',
      },
      {
        score: 1,
        label: 'Ausente / pior prognóstico de tronco',
        summary: 'Reflexos de tronco essencialmente ausentes.',
        detail:
          'Compatível com lesão troncoencefálica grave. Prognóstico muito reservado sem resposta ao tratamento.',
      },
    ],
  },
  {
    id: 'consciousness',
    title: 'Nível de consciência',
    shortTitle: 'Consciência',
    description:
      'Vigília e resposta a estímulos ambientais e dolorosos. Integra córtex e ARAS.',
    levels: [
      {
        score: 6,
        label: 'Alerta',
        summary: 'Consciência e interação normais.',
        detail:
          'Animal vigoroso, orientado ao ambiente, responde a chamados de forma apropriada.',
      },
      {
        score: 5,
        label: 'Deprimido leve',
        summary: 'Sonolento, mas desperta facilmente.',
        detail:
          'Resposta a estímulos leves; menor interação espontânea.',
      },
      {
        score: 4,
        label: 'Deprimido moderado',
        summary: 'Letárgico; desperta com estímulo moderado.',
        detail:
          'Menos responsivo; pode haver desorientação.',
      },
      {
        score: 3,
        label: 'Estupor',
        summary: 'Só desperta com estímulo intenso ou repetido.',
        detail:
          'Depressão importante do SNC; risco de piora com edema ou convulsões.',
      },
      {
        score: 2,
        label: 'Coma superficial',
        summary: 'Sem resposta adequada a estímulos verbais; resposta mínima a dor.',
        detail:
          'Compatível com disfunção difusa ou focal extensa. Monitorar parâmetros vitais.',
      },
      {
        score: 1,
        label: 'Coma profundo',
        summary: 'Sem resposta consciente a estímulos.',
        detail:
          'Prognóstico muito reservado; correlacionar com reflexos de tronco e causa subjacente.',
      },
    ],
  },
]

/** Faixas totais MGCS (3–18): interpretação clínica orientativa (acompanhamento serial). */
export const MGCS_TOTAL_BANDS = [
  {
    band: '3–8',
    min: 3,
    max: 8,
    severity: 'Grave',
    summary:
      'Depressão neurológica importante em múltiplos domínios (motor, tronco e/ou consciência). Compatível com necessidade de suporte intensivo e causa potencialmente ameaçadora à vida.',
    whatItSuggests: [
      'Risco elevado de complicações (aspiração, hipóxia, piora por edema ou convulsões).',
      'Correlacionar com reflexos de tronco, padrão respiratório e causa subjacente (TCE, encefalite, intoxicação, etc.).',
    ],
    monitoring: [
      'Monitorização contínua ou intervalos curtos (ex.: a cada 15–30 min nas primeiras horas, conforme estabilidade).',
      'Repetir MGCS após intervenções e sempre que o quadro mudar.',
    ],
  },
  {
    band: '9–12',
    min: 9,
    max: 12,
    severity: 'Moderado a grave',
    summary:
      'Comprometimento substancial, mas com margem para resposta terapêutica dependendo da etiologia.',
    whatItSuggests: [
      'Investigar e tratar causa de base com urgência proporcional ao quadro sistêmico.',
      'Déficits de tronco ou consciência ainda impactam prognóstico de curto prazo.',
    ],
    monitoring: [
      'Serialização frequente até estabilização; imagem e laboratório conforme suspeita diagnóstica.',
    ],
  },
  {
    band: '13–14',
    min: 13,
    max: 14,
    severity: 'Moderado',
    summary:
      'Disfunção neurológica clara, porém menos catastrófica que faixas inferiores; evolução depende da causa e da resposta ao tratamento.',
    whatItSuggests: [
      'Pode haver reserva para recuperação parcial ou total se a causa for reversível.',
    ],
    monitoring: [
      'Reavaliações seriadas nas primeiras 24–72 h são úteis para tendência (melhora vs deterioração).',
    ],
  },
  {
    band: '15–18',
    min: 15,
    max: 18,
    severity: 'Leve a preservado',
    summary:
      'Pontuação global mais favorável nos domínios testados; não exclui lesão focal ou problema evolutivo.',
    whatItSuggests: [
      'Correlacionar com exame neurológico segmentar, história e imagem quando indicado.',
      'Mudanças agudas no comportamento ou marcha ainda exigem investigação mesmo com MGCS alta.',
    ],
    monitoring: [
      'Em casos estáveis, repetir conforme evolução clínica; em TCE/encefalite, manter vigilância serial inicial.',
    ],
  },
] as const

export function interpretMgcsTotal(total: number): {
  band: string
  shortText: string
  severity: string
  whatItSuggests: string[]
  monitoring: string[]
} {
  const row = MGCS_TOTAL_BANDS.find((b) => total >= b.min && total <= b.max)
  if (row) {
    return {
      band: row.band,
      shortText: row.summary,
      severity: row.severity,
      whatItSuggests: [...row.whatItSuggests],
      monitoring: [...row.monitoring],
    }
  }
  return {
    band: '?',
    shortText: 'Pontuação fora do intervalo esperado (3–18).',
    severity: 'Indefinido',
    whatItSuggests: [],
    monitoring: [],
  }
}
