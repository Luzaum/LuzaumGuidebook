import type { HelpTopic } from '../../types/helpTopics'

export const section1Mentacao: HelpTopic[] = [
  {
    id: 's1-mentacao-comportamento-geral',
    title: 'Mentação e comportamento (visão geral) — por que isso localiza lesão',
    whatItAssesses:
      'Avalia o nível de consciência (arousal) e a qualidade do comportamento/resposta ao ambiente, que refletem a integridade do prosencéfalo (córtex/tálamo) e do sistema ativador reticular ascendente (SARA) no tronco encefálico. Mentação é um dos achados mais úteis para diferenciar lesões intracranianas (prosencéfalo/tronco) de doenças medulares. Alterações de mentação mudam completamente neurolocalização e prioridades diagnósticas.',
    neuroanatomy:
      'Arousal depende do SARA (tronco encefálico) projetando para tálamo e córtex. Comportamento e cognição dependem do prosencéfalo (córtex cerebral, sistema límbico) e suas conexões subcorticais. Arousal é a "ligação" do SNC (vigília). O conteúdo de consciência (atenção, orientação, comportamento) é mais cortical. Lesões difusas metabólicas/toxinas podem deprimir globalmente; lesões estruturais focais tendem a produzir déficits lateralizados e/ou sinais focais adicionais.',
    howToPerform:
      'Observar o paciente antes de manipular: postura espontânea, interação com tutor, resposta a ruídos/estímulos leves. Depois, avaliar reatividade dirigida (chamar, bater palmas, oferecer estímulo visual) e resposta a manuseio. Registrar estado (alerta/deprimido/estupor/coma) e comportamento (normal/desorientado/agressivo/vocalização).',
    interpretation:
      'Mentação alterada sugere prosencéfalo ou tronco encefálico (ou encefalopatia metabólica). Medula espinhal isolada geralmente não altera mentação. Desorientação/alteração comportamental com déficits posturais contralaterais sugere prosencéfalo. Estupor/coma com sinais de nervos cranianos sugere tronco.',
    pitfalls:
      'Confundir dor/ansiedade com alteração neurológica; avaliar após sedativos/analgésicos sem considerar efeito; interpretar depressão por hipotensão/hipoxemia/hipoglicemia como lesão primária do SNC.',
  },
  {
    id: 's1-nivel-consciencia-alerta',
    title: 'Nível de consciência — Alerta',
    whatItAssesses:
      'Vigília preservada: paciente atento, responsivo e com reatividade apropriada ao ambiente. Ajuda a excluir depressão central importante e favorece lesões não encefálicas (ex.: medulares) quando outros achados concordam.',
    neuroanatomy: 'SARA funcional e conexões tálamo-corticais preservadas. Arousal e atenção intactos; respostas comportamentais compatíveis com o ambiente.',
    howToPerform: 'Observar resposta a estímulos leves (voz, palmas, aproximação), interação com tutor e foco visual.',
    interpretation:
      'Com déficit locomotor/proprioceptivo e mentação normal, aumenta suspeita de lesão medular/periférica. Não exclui prosencéfalo se sinais focais existirem (ex.: convulsões).',
    pitfalls: 'Classificar como alerta em animal altamente estressado/hiperreativo sem avaliar orientação.',
  },
  {
    id: 's1-nivel-consciencia-deprimido',
    title: 'Nível de consciência — Deprimido',
    whatItAssesses:
      'Redução de responsividade, mas paciente desperta facilmente e mantém alguma interação. Sugere disfunção intracraniana (prosencéfalo/tronco) ou encefalopatia metabólica, hipoperfusão, dor intensa ou efeitos farmacológicos.',
    neuroanatomy:
      'Pode envolver SARA (tronco) ou prosencéfalo difusamente; também causas extracranianas (metabólicas). Menor arousal/atenção por disfunção central ou por distúrbio sistêmico (hipoglicemia, hipoxemia, uremia).',
    howToPerform: 'Observar resposta a estímulos auditivos/táteis; verificar se responde de forma dirigida e consistente.',
    interpretation:
      'Se associada a déficits de nervos cranianos ou alterações posturais assimétricas, favorece lesão intracraniana. Se associada a sinais sistêmicos (desidratação, choque), considerar encefalopatia secundária.',
    pitfalls: 'Ignorar hipotensão/hipoxemia/hipoglicemia e atribuir depressão ao SNC primariamente.',
  },
  {
    id: 's1-nivel-consciencia-estupor',
    title: 'Nível de consciência — Estupor (RED FLAG)',
    whatItAssesses:
      'Paciente responde apenas a estímulos intensos e rapidamente retorna à não responsividade. Sinal de disfunção grave do SARA/tronco encefálico, aumento de pressão intracraniana, intoxicações ou encefalopatias graves.',
    neuroanatomy:
      'SARA no tronco encefálico e conexões tálamo-corticais. Arousal severamente comprometido → pouco conteúdo de consciência.',
    howToPerform: 'Aplicar estímulo forte (voz alta, estímulo tátil firme) de forma ética e observar se há resposta direcionada.',
    interpretation: 'Emergência neurológica. Correlacionar com pupilas/PLR, respiração e sinais de tronco.',
    pitfalls: 'Confundir com sedação/analgesia profunda ou choque. Sempre correlacionar com sinais vitais e medicações.',
  },
  {
    id: 's1-nivel-consciencia-coma',
    title: 'Nível de consciência — Coma (RED FLAG)',
    whatItAssesses:
      'Ausência de resposta voluntária e de interação com o ambiente; paciente não desperta a estímulos. Indica disfunção central extrema (SARA/tronco) ou encefalopatia metabólica/toxicológica grave e exige abordagem de emergência.',
    neuroanatomy:
      'Tronco encefálico (SARA) e/ou lesão difusa cortical severa. Falha global do arousal; pode ocorrer por herniação, edema, intoxicação, hipoglicemia/hipóxia severa.',
    howToPerform: 'Confirmar ausência de resposta a estímulos apropriados, avaliar reflexos de tronco (pupilas/PLR) e padrão respiratório.',
    interpretation: 'Emergência crítica. Priorizar estabilização e investigação de causas reversíveis imediatas.',
    pitfalls: 'Assumir coma por lesão estrutural sem checar glicemia, oxigenação, perfusão e fármacos.',
  },
  {
    id: 's1-comportamento-normal',
    title: 'Comportamento — Normal',
    whatItAssesses:
      'Orientação, interação social e reatividade apropriadas. Ajuda a separar doenças medulares/periféricas de doenças encefálicas (quando combinado a mentação e déficits focais).',
    neuroanatomy: 'Integração cortical e límbica preservada. Processamento sensorial e resposta comportamental adequados.',
    howToPerform: 'Observar resposta ao tutor, exploração do ambiente e reatividade proporcional.',
    interpretation:
      'Comportamento normal com déficits de marcha e reflexos sugere lesão fora do prosencéfalo. Não exclui epilepsia interictal ou lesão focal pequena.',
    pitfalls: 'Interpretar ansiedade como comportamento anormal neurológico.',
  },
  {
    id: 's1-comportamento-desorientado',
    title: 'Comportamento — Desorientado',
    whatItAssesses:
      'Alteração de percepção/integração ambiental (andar sem propósito, perder rotas, "olhar vazio", respostas inadequadas). É marcador forte de disfunção do prosencéfalo ou encefalopatia metabólica/toxicológica.',
    neuroanatomy:
      'Prosencéfalo (córtex associativo) e sistema límbico; também pode ocorrer em encefalopatias difusas. Falha no processamento cortical/atenção e integração sensorial.',
    howToPerform: 'Observar exploração, resposta ao chamado, reconhecimento do tutor e capacidade de se orientar no espaço.',
    interpretation:
      'Com déficits posturais contralaterais e/ou alterações de ameaça, sugere prosencéfalo. Se junto de sinais sistêmicos, considerar metabólico/toxina.',
    pitfalls: 'Confundir com senilidade sem correlacionar com início, curso e outros déficits.',
  },
  {
    id: 's1-comportamento-agressivo',
    title: 'Comportamento — Agressivo',
    whatItAssesses:
      'Agressividade desproporcional ou alteração abrupta de limiar comportamental. Pode refletir dor intensa, medo, ou alteração límbica/prosencefálica (mudança comportamental neurológica).',
    neuroanatomy:
      'Sistema límbico (amígdala, hipotálamo) e conexões corticais; também influência de dor periférica. Alterações límbicas mudam reatividade emocional; dor e estresse ativam vias simpáticas.',
    howToPerform: 'Registrar contexto: dor/manuseio, presença do tutor, estímulos. Priorizar segurança e evitar provocação.',
    interpretation:
      'Agressividade isolada raramente localiza; deve ser interpretada com mentação, déficits focais e história. Dor cervical/toracolombar severa pode justificar agressão ao toque.',
    pitfalls: 'Assumir lesão encefálica sem avaliar dor/ansiedade e sinais vitais.',
  },
  {
    id: 's1-comportamento-vocalizacao',
    title: 'Comportamento — Vocalização',
    whatItAssesses:
      'Vocalização espontânea ou desencadeada, possivelmente por dor, disforia, ansiedade ou encefalopatia. Ajuda a reconhecer dor espinhal/radicular e estados disautonômicos/encefalopáticos.',
    neuroanatomy:
      'Dor: nociceptores periféricos + vias ascendentes; disforia: circuitos centrais (córtex/límbico). Dor ativa circuitos nociceptivos e simpáticos; encefalopatia pode gerar disinibição e vocalização.',
    howToPerform: 'Diferenciar vocalização ao toque (dor) de vocalização espontânea contínua (disforia/encefalopatia). Correlacionar com palpação de coluna.',
    interpretation:
      'Vocalização à palpação sugere dor espinhal. Vocalização sem relação com estímulo pode acompanhar encefalite/metabólico/toxina.',
    pitfalls: 'Assumir dor sempre; alguns animais vocalizam por medo. Usar história e exame físico.',
  },
  {
    id: 's1-postura-cabeca-normal',
    title: 'Postura da cabeça — Normal',
    whatItAssesses:
      'Alinhamento normal cabeça/pescoço, sem desvios persistentes. Serve como referência para identificar síndrome vestibular, dor cervical ou postura de hipertensão intracraniana.',
    neuroanatomy: 'Vestibular periférico/central, músculos cervicais e integração postural. Controle postural normal do eixo cabeça-pescoço.',
    howToPerform: 'Observar em repouso e durante marcha/viradas; procurar assimetria persistente.',
    interpretation: 'Não exclui vestibular se sinais forem episódicos; integrar com nistagmo e ataxia vestibular.',
    pitfalls: 'Avaliar apenas parado e não observar durante marcha.',
  },
  {
    id: 's1-postura-cabeca-headtilt',
    title: 'Postura da cabeça — Head tilt (inclinação)',
    whatItAssesses:
      'Inclinação persistente da cabeça, típica de disfunção vestibular. Sinal-chave de síndrome vestibular. Associado a nistagmo/estrabismo e ataxia vestibular, diferencia periférico vs central quando combinado com mentação e déficits posturais.',
    neuroanatomy:
      'Sistema vestibular periférico (orelha interna/VIII) ou central (núcleos vestibulares no tronco e conexões cerebelares). Assimetria vestibular → desequilíbrio no reflexo vestíbulo-ocular/postural → inclinação para compensar.',
    howToPerform: 'Observar em repouso e marcha; registrar lado da inclinação e sinais associados (nistagmo, queda, rotação).',
    interpretation:
      'Mentação normal e ausência de déficits posturais severos favorecem vestibular periférico. Mentação alterada e múltiplos déficits de NC favorecem vestibular central.',
    pitfalls: 'Confundir com torcicolo doloroso. Sempre checar dor cervical e nistagmo.',
  },
  {
    id: 's1-postura-cabeca-opistotono',
    title: 'Postura da cabeça — Opistótono (RED FLAG)',
    whatItAssesses:
      'Extensão rígida de cabeça/pescoço e às vezes do tronco, sugerindo disfunção central grave. Pode ocorrer em lesões de tronco encefálico, cerebelo, intoxicações ou aumento de pressão intracraniana. É sinal de gravidade e exige correlação com mentação e nervos cranianos.',
    neuroanatomy:
      'Tronco encefálico (controle postural) e cerebelo; vias extensores e modulação central. Desbalanço entre vias facilitadoras/inibitórias de tônus extensor pode gerar extensão sustentada.',
    howToPerform: 'Observar postura espontânea; não provocar. Avaliar mentação, pupilas/PLR e sinais de tronco.',
    interpretation: 'Red flag: priorizar estabilização e investigação intracraniana/metabólica.',
    pitfalls: 'Confundir com rigidez por dor severa. Avaliar dor cervical e sinais sistêmicos.',
  },
  {
    id: 's1-postura-cabeca-cabeca-baixa',
    title: 'Postura da cabeça — Cabeça baixa',
    whatItAssesses:
      'Manutenção persistente de cabeça/colo em flexão ou posição baixa. Sugere dor cervical, fraqueza muscular (neuromuscular) ou postura antálgica; pode aparecer também em doença sistêmica grave.',
    neuroanatomy:
      'Músculos cervicais, estruturas cervical (disco/meninges/raízes), junção neuromuscular (se fraqueza). Dor leva a postura protetora; fraqueza muscular limita sustentação da cabeça.',
    howToPerform: 'Observar durante repouso e ao tentar movimentar. Palpar coluna cervical buscando dor/espasmo.',
    interpretation: 'Com dor cervical à palpação → suspeitar lesão cervical dolorosa. Sem dor, considerar neuromuscular ou sistêmico.',
    pitfalls: 'Assumir vestibular. Cabeça baixa ≠ head tilt.',
  },
]
