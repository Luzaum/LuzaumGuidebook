import type { NeuroFindingEntry } from './types'

/**
 * Textos didáticos para consulta rápida (parafraseados de conhecimento clínico geral).
 * Enriqueça com referências próprias sem copiar obras protegidas integralmente.
 */
export const NEURO_FINDING_ENTRIES: NeuroFindingEntry[] = [
  {
    id: '1',
    slug: 'estrabismo-ventral',
    title: 'Estrabismo ventral (desvio ventromedial)',
    synonyms: ['strabismus ventral', 'desvio ocular ventral', 'olho para baixo'],
    category: 'Nervos cranianos',
    summary:
      'Desvio do eixo do globo ocular em direção ventromedial; frequentemente associado a déficits de nervos oculomotores ou lesões centrais/periféricas do tronco.',
    neuroanatomia:
      'O controle motor extraocular envolve núcleos do III (oculomotor), IV (troclear) e VI (abducente) no tronco encefálico, com circuitos de fascículos longos e integração vestibular no núcleo do trato solitário e núcleos vestibulares. Lesões que afetam inervação do reto dorsal (IV) ou oblíquo, ou que liberam tônus ventral, podem favorecer desvio ventral.',
    neurofisiologia:
      'O alinhamento binocular depende de tônus equilibrado dos músculos extraoculares e de sinais vestibulares que estabilizam o olhar. Assimetria de tônus ou paralisia parcial altera a posição de repouso do globo.',
    localizacao:
      'Pode ser periférico (neuropatia de NC) ou central (tronco, cerebelo, prosencéfalo com sinais de hipertensão intracraniana). Estrabismo isolado exige correlacionar com PLR, resposta ao movimento cefálico e outros NC.',
    diferenciais: [
      'Neuropatia de III vs IV vs VI (padrões de desvio diferentes).',
      'Hipertensão intracraniana com paralisia de VI bilateral ou assimétrica.',
      'Doença vestibular periférica (pode coexistir com posição anormal ocular).',
    ],
    populacoes:
      'Cães braquicefálicos com alterações ósseas/orbitárias podem simular ou exacerbar desvios; gatos com hipertensão sistêmica podem apresentar alterações oculares associadas.',
    images: [
      {
        alt: 'Ilustração esquemática de desvio ventromedial',
        caption: 'Esquema conceitual: eixo do globo desviado ventromedialmente em relação ao plano órbito.',
      },
    ],
  },
  {
    id: '2',
    slug: 'estrabismo-lateral',
    title: 'Estrabismo lateral (desvio lateral)',
    synonyms: ['desvio lateral', 'exo', 'desvio temporal'],
    category: 'Nervos cranianos',
    summary: 'Desvio do globo ocular lateralmente; sugere desequilíbrio de músculos extraoculares ou processo expansivo/orbitário.',
    neuroanatomia:
      'Músculos retos lateral e medial, inervados principalmente por VI e III, definem movimento horizontal. Lesões focais podem alterar o repouso.',
    neurofisiologia:
      'Perda de inervação ou aumento de resistência mecânica altera a posição de repouso.',
    localizacao:
      'Orbitária (massa), neuropatia de VI, ou central com sinais associados.',
    diferenciais: ['Massa retrobulbar', 'Neuropatia de VI', 'Trauma orbitário'],
    populacoes: 'Qualquer idade; investigar trauma e neoplasias em idosos.',
  },
  {
    id: '3',
    slug: 'nistagmo',
    title: 'Nistagmo',
    synonyms: ['nystagmus', 'movimento oscilatório ocular'],
    category: 'Nervos cranianos',
    summary:
      'Movimento rítmico involuntário dos olhos. Pode ser horizontal, vertical ou rotacional; fase rápida indica direção vestibular/cerebelar.',
    neuroanatomia:
      'Gerado por circuitos vestibulares (labirinto, núcleos vestibulares, cerebelo, tronco) e modulado pelo prosencéfalo.',
    neurofisiologia:
      'Assimetria de entrada vestibular ou disfunção central do controle do olhar produz correções repetidas (fases lenta/rápida).',
    localizacao:
      'Periférico: geralmente horizontal-rotacional com vertigem; central: pode ser puramente vertical ou mudar direção com posição.',
    diferenciais: [
      'Vestibular periférico vs central',
      'Encefalite/meningoencefalite',
      'Intoxicações',
    ],
    populacoes: 'Comum em síndrome vestibular canina idiopática; gatos também afetados.',
  },
  {
    id: '4',
    slug: 'head-tilt',
    title: 'Head tilt (inclinação cefálica)',
    synonyms: ['cabeça inclinada', 'inclinação da cabeça'],
    category: 'Marcha e postura',
    summary:
      'Inclinação lateral da cabeça; frequentemente vestibular (periférico ou central) ou cervical doloroso.',
    neuroanatomia:
      'Sistema vestibular periférico e central integra postura cefálica; dor cervical pode gerar antalgismo.',
    neurofisiologia:
      'Assimetria vestibular gera sensação de desequilíbrio compensada por inclinação.',
    localizacao:
      'Orelha média/interna, tronco (vestibular central), cerebelo; excluir dor cervical.',
    diferenciais: ['Vestibular periférico', 'Central', 'Síndrome cervical dolorosa'],
    populacoes: 'Vestibular idiopático em cães adultos; gatos: otite/neoplasia.',
  },
  {
    id: '5',
    slug: 'ataxia-cerebelar',
    title: 'Ataxia cerebelar',
    synonyms: ['ataxia intenção', 'marcha hipermetrica'],
    category: 'Marcha e postura',
    summary:
      'Marcha com passos irregulares, hipermetria, tremor de intenção; não há paresia proporcional típica de medula.',
    neuroanatomia:
      'Cerebelo coordena timing e amplitude do movimento; lesões causam descoordenação ipsilateral.',
    neurofisiologia:
      'Circuito cerebelar comparador de intenção vs feedback proprioceptivo.',
    localizacao: 'Cerebelo ou pedúnculos cerebelares.',
    diferenciais: ['Hipoplasia', 'Inflamatório', 'Neoplasia', 'Degenerativo'],
    populacoes: 'Raças com degeneração cerebelar hereditária; qualquer idade com massa.',
  },
  {
    id: '6',
    slug: 'plegia-pelvica',
    title: 'Plegia / paresia pélvica',
    synonyms: ['paralisão posterior', 'não ambula com membros posteriores'],
    category: 'Marcha e postura',
    summary:
      'Perda de função motora dos membros posteriores; localiza-se pela distribuição de déficits e reflexos.',
    neuroanatomia:
      'Segmentos medulares e raízes lombossacrais; nervos periféricos; também considerar dor lombossacra que impede a marcha.',
    neurofisiologia:
      'LMN reduz reflexos e tônus; UMN aumenta reflexos em membros com paresia.',
    localizacao:
      'Medula T3–L3 vs L4–S3 vs cauda equina vs neuromuscular — combinar com posturais e dor profunda.',
    diferenciais: ['IVDD', 'FCE', 'Neoplasia', 'Discopatia', 'Miopatia'],
    populacoes: 'Cães condrodistróficos (IVDD); gatos com espondilopatia.',
  },
  {
    id: '7',
    slug: 'deficit-propriocepcao',
    title: 'Déficit de propriocepção (knuckling)',
    synonyms: ['propriocepção ausente', 'não corrige posição da pata'],
    category: 'Reações posturais',
    summary:
      'Atraso ou ausência de correção quando a pata é colocada em dorsiflexão; sensível para lesão de via longa.',
    neuroanatomia:
      'Via proprioceptiva sobe pela medula dorsal e áreas ascendentes até cerebelo e córtex.',
    neurofisiologia:
      'Integração reflexa para reposicionar a pata; déficit precoce em compressões medulares.',
    localizacao:
      'Lateralização ajuda a lado da lesão; tetraparesia sugere lesão cervical ou difusa.',
    diferenciais: ['Compressão medular', 'Mielopatia', 'Doença multifocal'],
    populacoes: 'Muito comum em compressões intervertebrais.',
  },
  {
    id: '8',
    slug: 'reflexo-patelar-ausente',
    title: 'Reflexo patelar ausente',
    synonyms: ['patela ausente', 'L4-L5'],
    category: 'Reflexos espinhais',
    summary:
      'Ausência de extensão do joelho ao tapar tendão patelar — sugere arco reflexo L4–L6 ou choque medular severo.',
    neuroanatomia:
      'Reflexo de arco medular local + inervação do músculo quadríceps.',
    neurofisiologia:
      'LMN lesionado diminui reflexo; UMN crônico pode inicialmente diminuir até hiperreflexia dependendo do estágio.',
    localizacao:
      'Comparar com outros reflexos e sensibilidade para segmentar.',
    diferenciais: ['Lesão de raiz/periférica', 'Medula lombar', 'Choque medular agudo'],
    populacoes: 'IVDD lombar; trauma raquimedular.',
  },
  {
    id: '9',
    slug: 'dor-profunda-ausente',
    title: 'Dor profunda ausente',
    synonyms: ['nocicepção ausente', 'deep pain negative'],
    category: 'Dor e nocicepção',
    summary:
      'Ausência de resposta comportamental a estímulo nociceptivo profundo; prognóstico neurológico mais reservado em compressões medulares.',
    neuroanatomia:
      'Vias espinotalâmicas e tratos profundos até prosencéfalo para percepção consciente.',
    neurofisiologia:
      'Perda indica comprometimento grave de função medular ou trato ascendente.',
    localizacao: 'Segmento medular correspondente ao déficit motor.',
    diferenciais: ['Compressão grave', 'Infarto medular', 'Trauma'],
    populacoes: 'Avaliação serial crítica em paresia aguda.',
  },
  {
    id: '10',
    slug: 'opistotono',
    title: 'Opistótono',
    synonyms: ['postura em arco', 'hiperextensão cervical'],
    category: 'Mentação e comportamento',
    summary:
      'Hiperextensão do pescoço e tronco; pode ser cerebelar, tronco, tóxico ou metabólico.',
    neuroanatomia:
      'Pode refletir irritação meníngea, disfunção cerebelar ou tronco.',
    neurofisiologia:
      'Aumento de tônico extensor por desinibição ou irritação.',
    localizacao: 'Lista amplia: encefalite, TCE, hipertensão intracraniana, distúrbio hepático.',
    diferenciais: ['Infeccioso', 'Tóxico', 'Metabólico', 'Trauma'],
    populacoes: 'Emergência neurológica até excluir causa tratável.',
  },
  {
    id: '11',
    slug: 'rigidez-descerebrada',
    title: 'Rigidez descerebrada (postura descerebrada)',
    synonyms: ['decerebrate rigidity', 'extensão em decúbito'],
    category: 'Marcha e postura',
    summary:
      'Extensão dos quatro membros, frequentemente com opistótono; associa-se a lesão de tronco encefálico e depressão do nível de consciência.',
    neuroanatomia:
      'Liberação de vias extensoras bulbares/reticulares em relação a vias inibitórias rostrais; envolve tronco e integração vestibular.',
    neurofisiologia:
      'Predomínio tônico extensor por desfacilitação de circuitos que modulam antigravidade.',
    localizacao:
      'Tronco encefálico (mesencéfalo/ponte) com comprometimento de consciência; prognóstico geralmente grave.',
    diferenciais: [
      'Rigidez descerebelar (consciência frequentemente preservada no início)',
      'Opistótono tóxico/metabólico',
      'Hipertensão intracraniana com herniação',
    ],
    populacoes: 'Qualquer idade; trauma, massas, encefalite grave.',
    etiologia: 'Trauma, hipóxia-isquemia, expansão massa, encefalite necrotizante.',
    patologia: 'Depende da etiologia (edema, hemorragia, necrose).',
    patofisiologia: 'Disfunção de tronco com perda de modulação cortical e de tratos descendentes inibitórios.',
    epidemiologia: 'Manifestação de emergência; não há predileção racial específica.',
  },
  {
    id: '12',
    slug: 'postura-schiff-sherrington',
    title: 'Postura de Schiff–Sherrington',
    synonyms: ['Schiff-Sherrington', 'extensão torácica com plegia pélvica'],
    category: 'Marcha e postura',
    summary:
      'Extensão dos membros torácicos com paraplegia ou paraparesia dos membros pélvicos; indica lesão espinhal cranial à origem dos segmentos lombossacrais (ex.: T3–L3).',
    neuroanatomia:
      'Interrupção de tratos espino-cerebelares e circuitos que inibem reflexamente motoneurônios extensores torácicos; os membros pélvicos refletem lesão caudal.',
    neurofisiologia:
      'Desinibição segmentar torácica com perda de modulação de neurônios extensores após lesão medular rostral aos centros pélvicos.',
    localizacao:
      'Medula toracolombar (lesão acima da intumescência lombossacra, com déficit pélvico).',
    diferenciais: [
      'Trauma vs extrusão discal vs neoplasia vs embolia fibrocartilaginosa',
      'Diferenciar de dor cervical com rigidez (outro mecanismo)',
    ],
    populacoes: 'Cães condrodistróficos e grandes raças com doença discal; gatos com trauma ou neoplasia.',
    etiologia: 'Discopatia, trauma vertebral, neoplasia medular, FCE.',
    patologia: 'Compressão, concussão ou infarto do parênquima medular.',
    patofisiologia: 'Perda de suprassegmentar com segmentos pélvicos mais gravemente afetados.',
    epidemiologia: 'Muito descrita em cães com extrusão toracolombar aguda.',
  },
  {
    id: '13',
    slug: 'knuckling-proprioceptivo',
    title: 'Knuckling / posicionamento em flexão dorsal',
    synonyms: ['knuckling', 'pata virada', 'propriocepção dorsal'],
    category: 'Marcha e postura',
    summary:
      'Incapacidade de reposicionar rapidamente o membro quando o dorso do pé permanece em flexão dorsal; indica déficit proprioceptivo (e localização segmentar conforme o membro afetado).',
    neuroanatomia:
      'A propriocepção consciente e inconsciente ascende principalmente pelas colunas dorsais e funículos laterais, com integração em tronco e cerebelo; o teste explora circuitos medulares e, indiretamente, integridade de vias ascendentes.',
    neurofisiologia:
      'O animal precisa integrar feedback de posição e corrigir a postura do membro; atraso ou falha indica interrupção ou lentificação do sinal proprioceptivo.',
    localizacao:
      'Depende do membro: torácico sugere lesão ipsilateral cervical ou intumescência cervical; pélvico sugere lesão toracolombar ou caudal, conforme padrão UMN/LMN e outros testes.',
    diferenciais: [
      'Dor ortopédica (evita apoio por outro motivo)',
      'Fraqueza muscular grave sem déficit proprioceptivo primário',
      'Lesão multifocal (dois membros podem sugerir difuso)',
    ],
    populacoes: 'Cães com doença discal e medular; gatos com trauma ou isquemia medular.',
    etiologia: 'Compressão medular, trauma, FCE, neoplasia, malformação.',
    patologia: 'Conforme etiologia (edema, hemorragia, compressão crônica).',
    patofisiologia: 'Interrupção de vias ascendentes ou disfunção de integração cerebelar.',
    epidemiologia: 'Achado frequente em exames neurológicos de pacientes com claudicação medular.',
  },
]

export function getFindingBySlug(slug: string): NeuroFindingEntry | undefined {
  return NEURO_FINDING_ENTRIES.find((e) => e.slug === slug)
}

export function searchFindings(query: string): NeuroFindingEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return NEURO_FINDING_ENTRIES
  return NEURO_FINDING_ENTRIES.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.synonyms.some((s) => s.toLowerCase().includes(q)) ||
      e.category.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q),
  )
}
