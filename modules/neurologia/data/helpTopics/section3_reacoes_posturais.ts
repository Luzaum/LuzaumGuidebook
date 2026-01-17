import type { HelpTopic } from '../../types/helpTopics'

export const section3ReacoesPosturais: HelpTopic[] = [
  {
    id: 's3-propriocepcao-geral',
    title: 'Reações posturais (propriocepção)',
    whatItAssesses:
      'Avaliam a capacidade do sistema nervoso de reconhecer a posição do membro no espaço e executar uma resposta motora corretiva consciente. São extremamente sensíveis para detectar disfunções neurológicas, frequentemente alterando antes da marcha ou dos reflexos espinhais.',
    neuroanatomy:
      'Receptores proprioceptivos periféricos → nervos periféricos → medula espinhal → tronco encefálico → prosencéfalo (córtex somatossensorial) → vias motoras descendentes. A resposta depende de integração sensorial consciente, diferente dos reflexos espinhais. Envolve vias ascendentes longas e controle motor voluntário.',
    howToPerform:
      'O animal deve estar em estação, sobre superfície antiderrapante. O examinador posiciona o dorso da pata em contato com o solo e observa se o animal corrige rapidamente para a posição normal.',
    interpretation:
      'Déficits indicam doença neurológica em qualquer ponto do arco: nervo periférico, medula ou encéfalo. A distribuição ajuda na neurolocalização.',
    pitfalls:
      'Avaliar em animal sentado, piso escorregadio, dor ortopédica não considerada ou interpretar fraqueza como déficit proprioceptivo.',
    tags: ['propriocepcao', 'vias-longas', 'reacoes-posturais', 'consciente', 'sensitivo-motor'],
    severityWeight: 2,
    localizationHint: ['prosencefalo', 'tronco-encefalico', 'medula', 'periferico'],
  },
  {
    id: 's3-toracico-esquerdo',
    title: 'Propriocepção – Membro torácico esquerdo',
    whatItAssesses: 'Capacidade proprioceptiva consciente do membro torácico esquerdo.',
    neuroanatomy:
      'Nervos periféricos → segmentos cervicais da medula → vias ascendentes → córtex contralateral. Requer condução sensorial intacta e resposta motora voluntária.',
    howToPerform:
      'Colocar o dorso da pata torácica esquerda no solo e observar a correção. Repetir e comparar com o lado direito.',
    interpretation:
      'Déficit isolado sugere lesão lateralizada. Déficits bilaterais sugerem lesão cervical ou encefálica. Déficits em torácicos ajudam a diferenciar lesões cervicais (C1–T2) de lesões toracolombares.',
    pitfalls: 'Confundir incapacidade motora com déficit sensorial.',
    tags: ['propriocepcao', 'toracico', 'esquerdo', 'vias-longas', 'C1-T2'],
    severityWeight: 2,
    localizationHint: ['C1-T2', 'prosencefalo-contralateral', 'periferico-ipsilateral'],
  },
  {
    id: 's3-toracico-direito',
    title: 'Propriocepção – Membro torácico direito',
    whatItAssesses: 'Capacidade proprioceptiva consciente do membro torácico direito.',
    neuroanatomy: 'Receptores periféricos → medula cervical → prosencéfalo contralateral. Integração sensório-motora consciente.',
    howToPerform:
      'Mesmo método do membro esquerdo, sempre comparando simetria e velocidade da correção.',
    interpretation:
      'Déficit unilateral aponta para lesão contralateral encefálica ou ipsilateral periférica. Comparação bilateral é essencial para identificar lateralização da lesão.',
    pitfalls: 'Não comparar com o lado oposto.',
    tags: ['propriocepcao', 'toracico', 'direito', 'vias-longas', 'C1-T2'],
    severityWeight: 2,
    localizationHint: ['C1-T2', 'prosencefalo-contralateral', 'periferico-ipsilateral'],
  },
  {
    id: 's3-pelvico-esquerdo',
    title: 'Propriocepção – Membro pélvico esquerdo',
    whatItAssesses: 'Propriocepção consciente do membro pélvico esquerdo.',
    neuroanatomy: 'Nervos periféricos → medula toracolombar → vias ascendentes → córtex. Resposta consciente dependente de vias longas da medula.',
    howToPerform: 'Colocar o dorso da pata pélvica esquerda no solo e observar correção.',
    interpretation:
      'Déficits apenas em pélvicos com torácicos normais sugerem lesão T3–S3. Fundamental para identificar lesões toracolombares (T3–L3) ou lombossacras.',
    pitfalls: 'Avaliar com dor ortopédica não controlada.',
    tags: ['propriocepcao', 'pelvico', 'esquerdo', 'vias-longas', 'T3-S3'],
    severityWeight: 2,
    localizationHint: ['T3-L3', 'L4-S3', 'medula-toracolombar'],
  },
  {
    id: 's3-pelvico-direito',
    title: 'Propriocepção – Membro pélvico direito',
    whatItAssesses: 'Propriocepção consciente do membro pélvico direito.',
    neuroanatomy: 'Medula toracolombar/lombossacra e vias encefálicas. Integração sensorial consciente.',
    howToPerform: 'Mesmo método do pélvico esquerdo.',
    interpretation:
      'Déficits bilaterais reforçam mielopatia; unilateral sugere lateralização. Confirma simetria e lateralização do déficit neurológico.',
    pitfalls: 'Não correlacionar com reflexos patelares.',
    tags: ['propriocepcao', 'pelvico', 'direito', 'vias-longas', 'T3-S3'],
    severityWeight: 2,
    localizationHint: ['T3-L3', 'L4-S3', 'medula-toracolombar'],
  },
]
