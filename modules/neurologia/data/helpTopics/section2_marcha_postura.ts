import type { HelpTopic } from '../../types/helpTopics'

export const section2MarchaPostura: HelpTopic[] = [
  {
    id: 's2-marcha-postura-geral',
    title: 'Marcha e postura (visão geral) — por que isso localiza a lesão',
    whatItAssesses:
      'Avalia a capacidade de sustentar peso, iniciar movimento, coordenar membros e manter equilíbrio. Integra sistemas motor (UMN/LMN), proprioceptivo, cerebelar e vestibular. Padrões de marcha e postura são a base da neurolocalização: ajudam a separar doença medular (segmentar), encefálica (prosencéfalo/tronco), cerebelar e vestibular.',
    neuroanatomy:
      'Motor: UMN (vias descendentes) e LMN (corno ventral/nervos). Propriocepção: vias ascendentes longas até prosencéfalo. Cerebelo: coordenação e modulação. Vestibular: equilíbrio e reflexo vestíbulo-ocular. Paresia = falha de geração/execução de força (motor). Ataxia = falha de coordenação/posicionamento (sensitiva, vestibular ou cerebelar). Plegia = perda funcional grave do movimento voluntário.',
    howToPerform:
      'Observar o paciente andando em linha reta e em curvas, em piso antiderrapante. Avaliar antes de manipular. Registrar: ambulatório/com apoio/não ambulatório/plegia. Depois classificar por membro (torácicos/pélvicos): normal/ataxia/paresia/plegia e tipo de ataxia (proprioceptiva/vestibular/cerebelar).',
    interpretation:
      'Pélvicos afetados com torácicos normais sugere lesão T3–S3 (medular). Quatro membros afetados sugere lesão cervical (C1–T2) ou encefálica difusa. Ataxia vestibular frequentemente acompanha head tilt/nistagmo. Ataxia cerebelar se manifesta com hipermetria e tremor de intenção.',
    pitfalls:
      'Confundir fraqueza ortopédica com paresia; avaliar em piso escorregadio; não observar curvas; interpretar ansiedade como incoordenação.',
    tags: ['marcha', 'postura', 'paresia', 'ataxia', 'plegia', 'UMN', 'LMN', 'proprioceptivo', 'vestibular', 'cerebelar'],
    severityWeight: 3,
    localizationHint: ['T3-S3', 'C1-T2', 'prosencefalo', 'tronco-encefalico', 'cerebelo', 'vestibular'],
  },
  {
    id: 's2-capacidade-ambulatorio',
    title: 'Capacidade de deambular — Ambulatório',
    whatItAssesses:
      'Paciente caminha sem ajuda, embora possa ter ataxia/paresia. Define gravidade funcional e ajuda a estratificar urgência e prognóstico em várias mielopatias.',
    neuroanatomy: 'Circuitos motores e de coordenação suficientes para locomoção independente. Mesmo com déficits, há força e coordenação suficientes para sustentar peso e progredir.',
    howToPerform: 'Observar caminhada contínua, curvas e mudanças de velocidade.',
    interpretation:
      'Ambulatório com ataxia proprioceptiva sugere lesão incompleta de vias sensitivas/motoras. Com ataxia vestibular, pensar em vestibular periférico/central.',
    pitfalls: 'Classificar como ambulatório quando o paciente só dá poucos passos e cai.',
  },
  {
    id: 's2-capacidade-com-apoio',
    title: 'Capacidade de deambular — Com apoio',
    whatItAssesses:
      'Paciente necessita auxílio (toalha, suporte) para caminhar. Indica déficit motor/coordenação moderado a grave; útil para acompanhar progressão/melhora.',
    neuroanatomy: 'Déficit significativo de vias motoras/proprioceptivas/coordenação. Força e/ou coordenação insuficientes para sustentação sem ajuda.',
    howToPerform: 'Usar suporte mínimo necessário e observar se consegue progredir e posicionar membros.',
    interpretation: 'Com reflexos aumentados em pélvicos sugere UMN (T3–L3). Com reflexos diminuídos sugere LMN (L4–S3).',
    pitfalls: 'Não diferenciar apoio por medo/dor ortopédica.',
  },
  {
    id: 's2-capacidade-não-ambulatorio',
    title: 'Capacidade de deambular — Não ambulatório',
    whatItAssesses:
      'Paciente não consegue caminhar, mas pode mover membros. É marco de gravidade e influencia prioridades diagnósticas e de estabilização.',
    neuroanatomy: 'Comprometimento motor e/ou proprioceptivo importante. Falha de sustentação e progressão por força insuficiente ou coordenação severamente alterada.',
    howToPerform: 'Observar se consegue sustentar peso, ficar em estação e dar passos.',
    interpretation: 'Diferenciar de plegia. Se há movimentos voluntários, não é plegia. Integrar com dor profunda e reflexos.',
    pitfalls: 'Classificar como plegia sem confirmar ausência de movimento voluntário.',
  },
  {
    id: 's2-capacidade-plegia',
    title: 'Capacidade de deambular — Plegia',
    whatItAssesses:
      'Ausência de movimento voluntário funcional no(s) membro(s) afetado(s). Define quadro grave e exige correlação com dor profunda (prognóstico) e reflexos (UMN vs LMN).',
    neuroanatomy: 'Pode ocorrer em lesões graves UMN/LMN, medulares ou periféricas. Interrupção severa de vias motoras voluntárias.',
    howToPerform: 'Confirmar que não há movimento voluntário; diferenciar de rigidez/contrações reflexas.',
    interpretation:
      'Em mielopatia aguda, plegia + dor profunda ausente é red flag prognóstica. Com reflexos ausentes, considerar LMN/periférico.',
    pitfalls: 'Confundir espasmos reflexos com movimento voluntário.',
    diagnosticWeight: 3,
    urgencyFlag: true,
    emergencyTriggers: ['acute_plegia'],
    neuroLocalization: ['C1_C5', 'C6_T2', 'T3_L3', 'L4_S3', 'peripheral_nerve', 'neuromuscular'],
    clinicalAlerts: ['Plegia aguda sem dor profunda = Prognóstico reservado. Requer ação imediata.'],
  },
  {
    id: 's2-membros-toracicos-normal',
    title: 'Membros torácicos — Normal',
    whatItAssesses:
      'Sem paresia/ataxia evidente em torácicos. Quando pélvicos estão alterados e torácicos normais, sugere lesão caudal a T2 (T3–S3).',
    neuroanatomy: 'Vias motoras e proprioceptivas de torácicos preservadas. Força e coordenação preservadas.',
    howToPerform: 'Observar protração, sustentação, colocação de patas e tropeços.',
    interpretation: 'Torácicos normais + pélvicos alterados = forte pista para mielopatia toracolombar/lombossacra.',
    pitfalls: 'Não avaliar curvas — déficits sutis podem aparecer em manobras.',
  },
  {
    id: 's2-membros-toracicos-ataxia',
    title: 'Membros torácicos — Ataxia',
    whatItAssesses:
      'Incoordenação (colocação irregular, base alargada/estreita, tropeços) nos torácicos. Ataxia em torácicos indica envolvimento cervical (C1–T2) ou encefálico (dependendo de outros sinais).',
    neuroanatomy:
      'Vias proprioceptivas de torácicos e/ou coordenação central. Falha de feedback sensorial (ataxia proprioceptiva) ou coordenação (cerebelar) ou equilíbrio (vestibular).',
    howToPerform: 'Observar marcha em linha e curvas; procurar cruzamento, tropeços e colocação atrasada.',
    interpretation: 'Ataxia em quatro membros sugere C1–T2 ou encéfalo difuso; integrar com mentação e nervos cranianos.',
    pitfalls: 'Confundir tremor por ansiedade com ataxia.',
  },
  {
    id: 's2-membros-toracicos-paresia',
    title: 'Membros torácicos — Paresia',
    whatItAssesses:
      'Fraqueza: passos curtos, arrasto, dificuldade de sustentar peso em torácicos. Paresia de torácicos indica lesão cervical (C1–T2) ou periférica (plexo/nervo) dependendo do padrão de reflexos/tônus.',
    neuroanatomy:
      'UMN cranial a C6 ou LMN C6–T2/plexo braquial. Paresia pode ser por falha UMN (via descendente) ou LMN (arco motor).',
    howToPerform: 'Observar sustentação, protração e capacidade de suporte. Correlacionar com retirada e tônus.',
    interpretation:
      'Se reflexos torácicos diminuídos/atrofia → LMN C6–T2. Se reflexos normais/aumentados e hipertonia → UMN cranial.',
    pitfalls: 'Confundir dor ortopédica de ombro/cotovelo com paresia neurológica.',
  },
  {
    id: 's2-membros-toracicos-plegia',
    title: 'Membros torácicos — Plegia',
    whatItAssesses:
      'Ausência de movimento voluntário funcional em torácicos. Quadro grave; precisa correlacionar reflexos (retirada) para diferenciar UMN/LMN.',
    neuroanatomy: 'Cervical alta grave ou LMN severo C6–T2/plexo. Interrupção severa da via motora voluntária.',
    howToPerform: 'Confirmar ausência de movimento voluntário; avaliar retirada e tônus.',
    interpretation: 'Se retirada ausente e hipotonia/atrofia → LMN. Se retirada preservada/aumentada com hipertonia → UMN cranial.',
    pitfalls: 'Assumir encefálico sem avaliar reflexos segmentares.',
    diagnosticWeight: 3,
    urgencyFlag: true,
    neuroLocalization: ['C1_C5', 'C6_T2', 'peripheral_nerve'],
  },
  {
    id: 's2-membros-pelvicos-normal',
    title: 'Membros pélvicos — Normal',
    whatItAssesses:
      'Sem paresia/ataxia evidente nos pélvicos. Ajuda a excluir mielopatias toracolombares/lombossacras quando combinado com propriocepção/reflexos.',
    neuroanatomy: 'Vias motoras e proprioceptivas pélvicas preservadas. Força e coordenação preservadas.',
    howToPerform: 'Observar protração, sustentação e colocação de patas em linha e curvas.',
    interpretation: 'Se queixa é pélvica mas exame normal, considerar ortopedia, dor, ou déficits muito sutis.',
    pitfalls: 'Não avaliar em curvas e em piso diferente.',
  },
  {
    id: 's2-membros-pelvicos-ataxia',
    title: 'Membros pélvicos — Ataxia',
    whatItAssesses:
      'Incoordenação em pélvicos (tropeços, cruzamento, base alterada). Muito comum em mielopatias T3–L3 e em doenças proprioceptivas; padrão ajuda na neurolocalização.',
    neuroanatomy:
      'Vias proprioceptivas ascendentes e integração medular/central. Falha de feedback sensorial (proprioceptiva) ou desequilíbrio (vestibular) ou coordenação (cerebelar).',
    howToPerform: 'Observar marcha em linha e curvas; procurar atraso na colocação de patas e escoriações dorsais.',
    interpretation:
      'Se apenas pélvicos → suspeitar T3–S3. Se com head tilt/nistagmo → vestibular. Se hipermetria → cerebelar.',
    pitfalls: 'Confundir fraqueza (paresia) com ataxia; muitos casos têm ambos.',
  },
  {
    id: 's2-membros-pelvicos-paresia',
    title: 'Membros pélvicos — Paresia',
    whatItAssesses:
      'Fraqueza em pélvicos (passos curtos, arrasto, dificuldade em levantar). Com reflexos patelares e tônus, diferencia lesões UMN (T3–L3) de LMN (L4–S3).',
    neuroanatomy:
      'UMN T3–L3 influencia pélvicos; LMN L4–S3 controla arcos segmentares e força periférica. UMN lesionado → hipertonia/hiperreflexia; LMN lesionado → hipotonia/hiporreflexia/atrofia.',
    howToPerform: 'Observar sustentação e impulso; correlacionar com patelar, retirada e tônus.',
    interpretation: 'Paresia + patelar aumentado = UMN (T3–L3). Paresia + patelar diminuído = LMN (L4–S3).',
    pitfalls: 'Atribuir paresia a ortopedia sem testar propriocepção/reflexos.',
  },
  {
    id: 's2-membros-pelvicos-plegia',
    title: 'Membros pélvicos — Plegia',
    whatItAssesses:
      'Ausência de movimento voluntário funcional em pélvicos. Situação grave que exige avaliar dor profunda e reflexos para prognóstico e urgência.',
    neuroanatomy:
      'Pode ser mielopatia severa (UMN) ou LMN grave; localização depende de reflexos. Interrupção severa de vias motoras; reflexos podem estar aumentados (UMN) ou ausentes (LMN).',
    howToPerform: 'Confirmar ausência de movimento voluntário, avaliar patelar/retirada e dor profunda.',
    interpretation: 'Plegia + dor profunda ausente = red flag prognóstica. Reflexos aumentados sugerem UMN; ausentes sugerem LMN.',
    pitfalls: 'Confundir espasmo reflexo com movimento voluntário.',
    diagnosticWeight: 3,
    urgencyFlag: true,
    neuroLocalization: ['T3_L3', 'L4_S3', 'peripheral_nerve'],
  },
  {
    id: 's2-tipo-ataxia-ausente',
    title: 'Tipo de ataxia — Ausente',
    whatItAssesses:
      'Não há incoordenação identificável na marcha. Ajuda a focar em paresia pura, dor ou déficits focais.',
    neuroanatomy: 'Coordenação e vias proprioceptivas preservadas. Sem falha de feedback sensorial ou coordenação.',
    howToPerform: 'Confirmar em linha reta e curvas.',
    interpretation: 'Se ainda há claudicação, pode ser ortopedia.',
    pitfalls: 'Não observar tempo suficiente para ver ataxia intermitente.',
  },
  {
    id: 's2-tipo-ataxia-proprioceptiva',
    title: 'Tipo de ataxia — Proprioceptiva',
    whatItAssesses:
      'Incoordenação por falha de percepção de posição (tropeços, arrasto dorsal, passos cruzados). É a mais comum em doenças medulares (T3–L3, C1–T2) e ajuda a identificar disfunção de vias ascendentes longas.',
    neuroanatomy:
      'Vias proprioceptivas periféricas → medula → tronco → prosencéfalo. Sem feedback adequado, o membro é posicionado incorretamente durante a marcha.',
    howToPerform: 'Observar tropeços, knuckling, arrasto dorsal e atraso na colocação. Confirmar com reações posturais.',
    interpretation:
      'Com reflexos aumentados e paresia, favorece UMN medular. Frequentemente acompanha déficits posturais.',
    pitfalls: 'Confundir com vestibular/cerebelar sem checar nistagmo e hipermetria.',
    tags: ['ataxia-proprioceptiva', 'vias-longas', 'medula', 'T3-L3', 'C1-T2', 'UMN'],
    severityWeight: 2,
    localizationHint: ['medula-T3-L3', 'medula-C1-T2', 'prosencefalo', 'vias-ascendentes-longas'],
    diagnosticWeight: 2,
    neuroLocalization: ['C1_C5', 'C6_T2', 'T3_L3'], // Lesão medular predominante
  },
  {
    id: 's2-tipo-ataxia-vestibular',
    title: 'Tipo de ataxia — Vestibular',
    whatItAssesses:
      'Desequilíbrio com tendência a cair/rolar para um lado, frequentemente com head tilt/nistagmo. Direciona para síndrome vestibular periférica ou central.',
    neuroanatomy:
      'Orelha interna/VIII (periférico) ou núcleos vestibulares/tronco/cerebelo (central). Assimetria vestibular altera equilíbrio e VOR.',
    howToPerform: 'Observar queda/rolamento, inclinação da cabeça e movimentos oculares. Integrar com mentação e déficits posturais.',
    interpretation:
      'Mentação normal favorece periférico; mentação alterada e déficits posturais severos favorecem central.',
    pitfalls: 'Rotular como vestibular sem examinar nervos cranianos e mentação.',
    diagnosticWeight: 3,
    neuroLocalization: ['vestibular_peripheral', 'vestibular_central'],
    cranialNerves: [8],
  },
  {
    id: 's2-tipo-ataxia-cerebelar',
    title: 'Tipo de ataxia — Cerebelar',
    whatItAssesses:
      'Incoordenação por falha de modulação cerebelar: hipermetria, tremor de intenção, base alargada, força preservada. Localiza para cerebelo e ajuda a diferenciar de proprioceptiva (sensitiva) e vestibular.',
    neuroanatomy:
      'Cerebelo (hemisférios/vermis) e conexões com tronco e córtex motor. Cerebelo ajusta precisão e amplitude do movimento; lesão gera movimentos exagerados, não fraqueza primária.',
    howToPerform: 'Observar hipermetria (passos altos), tremor ao alcançar objeto, oscilação do tronco. Reflexos podem estar normais.',
    interpretation:
      'Se força está preservada e há hipermetria/tremor de intenção, favorece cerebelar. Pode coexistir com sinais vestibulares.',
    pitfalls: 'Confundir hipermetria com paresia; cerebelar geralmente não causa paresia marcada.',
    diagnosticWeight: 3,
    neuroLocalization: ['cerebellum'],
    clinicalAlerts: ['Ataxia cerebelar pura preserva força (sem paresia).'],
  },
]
