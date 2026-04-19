import type { HelpTopic } from '../../types/helpTopics'

export const section3ReacoesPosturais: HelpTopic[] = [
  {
    id: 's3-propriocepcao-geral',
    title: 'Reações posturais (propriocepção)',
    whatItAssesses:
      'Avaliam a capacidade do sistema nervoso de reconhecer a posição do membro no espaço e executar uma resposta motora corretiva consciente. São extremamente sensíveis para detectar disfunções neurológicas, frequentemente alterando antes da marcha ou dos reflexos espinhais. No fluxo do exame neurológico completo, costumam ser feitas após observar marcha/postura e antes dos reflexos segmentares, para não confundir fraqueza com déficit sensitivo.',
    neuroanatomy:
      'Receptores proprioceptivos periféricos → nervos periféricos → medula espinhal → tronco encefálico → prosencéfalo (córtex somatossensorial) → vias motoras descendentes. A resposta depende de integração sensorial consciente, diferente dos reflexos espinhais. Envolve vias ascendentes longas e controle motor voluntário. O teste de “knuckling” (dorso do pé no solo) explora esse arco consciente; testes dinâmicos (ex.: saltos, apoio assimétrico) acrescentam carga e podem revelar déficits subtis.',
    howToPerform:
      'O animal deve estar em estação, sobre superfície antiderrapante. O examinador posiciona o dorso da pata em contato com o solo e observa se o animal corrige rapidamente para a posição normal. Repetir em cada membro e sempre comparar lados (simetria e velocidade). Se o paciente não suporta estação, adie ou adapte (ex.: apoio leve) para não misturar medo, dor ortopédica ou fraqueira com falha proprioceptiva.',
    interpretation:
      'Déficits indicam doença neurológica em qualquer ponto do arco: nervo periférico, medula ou encéfalo. A distribuição ajuda na neurolocalização: déficits só em pélvicos com torácicos preservados apontam para segmento caudal (ex.: T3–L3), enquanto envolvimento de todos os membros amplia o diferencial (cervical, multifocal ou difuso). Déficit unilateral reforça lateralização; bilateral pode ser medular central, difuso ou sistêmico, conforme o restante do exame.',
    pitfalls:
      'Avaliar em animal sentado, piso escorregadio, dor ortopédica não considerada ou interpretar fraqueza como déficit proprioceptivo. Não confundir lentidão por dor com falha proprioceptiva; não concluir localização só pelo knuckling sem integrar marcha, reflexos e NC.',
    tags: ['propriocepcao', 'vias-longas', 'reações-posturais', 'consciente', 'sensitivo-motor'],
    severityWeight: 2,
    localizationHint: ['prosencefalo', 'tronco-encefalico', 'medula', 'periferico'],
  },
  {
    id: 's3-testes-dinamicos-complementares',
    title: 'Testes dinâmicos complementares (hop, apoio assimétrico, “wheelbarrow”)',
    whatItAssesses:
      'Complementam o knuckling estático ao exigir suporte de peso, coordenação e força em padrões assimétricos. Úteis quando o exame em estação é pouco revelador ou quando há suspeita de déficit leve. Não substituem o exame básico; ampliam a sensibilidade em alguns casos (ex.: lesões parciais de via longa).',
    neuroanatomy:
      'Envolvem os mesmos arcos sensitivo-motores do knuckling, com maior demanda sobre controle postural, propriocepção inconsciente e ajuste motor — com participação de cerebelo e vias vestibulares na manutenção do equilíbrio durante o salto ou o deslocamento do centro de massa.',
    howToPerform:
      'Em ambiente seguro e antiderrapante: (1) hop — sustentar levemente o tronco para o animal saltar sobre um membro de cada vez e observar simetria; (2) hemi-walking — elevar membros do mesmo lado e fazer andar os opostos; (3) wheelbarrow leve — elevar membros pélvicos e incentivar marcha nos torácicos (ou o inverso, conforme tolerância), sempre com apoio mínimo para evitar queda. Interromper se houver dor, pânico ou instabilidade cervical suspeita.',
    interpretation:
      'Assimetria clara entre lados reforça lesão lateralizada ou segmentar. Queda repetida ou recusa pode refletir dor, fraqueza UMN/LMN ou medo — correlacionar com reflexos, dor espinhal e marcha livre.',
    pitfalls:
      'Forçar obese, idosos ou pós-operados; confundir recusa comportamental com déficit; usar sem superfície segura; extrapolar para localização sem reflexos e NC.',
    tags: ['hop', 'wheelbarrow', 'propriocepcao-dinamica', 'exame-neurologico'],
    severityWeight: 1,
    localizationHint: ['medula', 'cerebelo', 'vestibular'],
    diagnosticWeight: 1,
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
    diagnosticWeight: 2,
    neuroLocalization: ['C1_C5', 'C6_T2', 'brainstem', 'forebrain', 'peripheral_nerve'],
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
    diagnosticWeight: 2,
    neuroLocalization: ['C1_C5', 'C6_T2', 'brainstem', 'forebrain', 'peripheral_nerve'],
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
    diagnosticWeight: 2,
    neuroLocalization: ['T3_L3', 'L4_S3', 'C1_C5', 'C6_T2', 'brainstem', 'forebrain', 'peripheral_nerve'],
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
    diagnosticWeight: 2,
    neuroLocalization: ['T3_L3', 'L4_S3', 'C1_C5', 'C6_T2', 'brainstem', 'forebrain', 'peripheral_nerve'],
  },
]
