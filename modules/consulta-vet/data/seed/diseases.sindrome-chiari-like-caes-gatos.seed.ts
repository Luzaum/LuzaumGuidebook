import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const sindromeChiariLikeCaesGatosRecord: DiseaseRecord = {
  id: 'disease-sindrome-chiari-like-caes-gatos',
  slug: 'sindrome-chiari-like-caes-gatos',
  title: 'Síndrome de Chiari-like em cães e gatos',
  subtitle:
    'Alteração estrutural complexa da região caudal do crânio e da junção craniocervical com aglomeração encefálica e distúrbio da dinâmica pulsátil do líquido cefalorraquidiano, frequentemente associada a dor neuropática, coceira fantasma e siringomielia em cães de raças pequenas (especialmente Cavalier King Charles Spaniel) e descrita raramente em gatos.',
  synonyms: [
    'Malformação tipo Chiari (CM / CLM)',
    'Chiari-like malformation',
    'Siringomielia secundária à malformação tipo Chiari (CM/SM)',
    'Siringohidromielia canina',
    'CM-pain',
    'Malformação da fossa caudal canina',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  categories: ['neurologia', 'clinica-medica', 'ortopedia', 'emergencia'],
  tags: ['Cães e Gatos'],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['sindrome-chiari-like-caes-gatos'],

  quickSummary:
    'Malformação estrutural craniocervical caracterizada por desproporção entre o volume encefálico e o espaço ósseo da fossa caudal, gerando aglomeração cerebelar e perturbação do fluxo pulsátil do líquido cefalorraquidiano (LCR). Chiari-like (CM) e siringomielia (SM) são entidades distintas: pode existir dor craniocervical sem siringe (CM-pain) e existem cães com CM ou SM assintomáticos. A ressonância magnética (RM) é o exame central após exclusão de dermatopatias, otites (como PSOM) e outras doenças cervicais. O manejo é multimodal — gabapentinoides (com aprovação condicional FDA da pregabalina veterinária em maio de 2026), adjuvantes e cirurgia descompressiva em casos refratários ou progressivos.',

  quickDecisionStrip: [
    'CM não é sinônimo de siringomielia: a malformação craniocervical e a cavidade intramedular são entidades distintas — e a siringomielia pode ter outras causas além de CM.',
    'RM é o exame de referência: radiografia e TC avaliam estruturas ósseas e instabilidade, mas não substituem a RM para visualizar cerebelo, espaços de LCR e siringes.',
    'Coceira fantasma (phantom scratching): movimentos rítmicos do membro pélvico sem tocar a pele refletem desregulação de circuitos espinhais (fictive scratching), mas exigem excluir pele e orelhas.',
    'Dor intensa sem paresia: o cão pode apresentar vocalização espontânea e alodinia cervical severa mantendo marcha e propriocepção normais.',
    'Achado incidental frequente: a presença de CM ou SM na RM não prova sozinha a causa da dor — investigue otite média secretória (PSOM), doença discal cervical e instabilidade atlantoaxial.',
    'Atualização terapêutica 2026: pregabalina veterinária mastigável (Liavium-CA1, 5–10 mg/kg VO q12h com alimento) obteve aprovação condicional da FDA nos EUA em 12/05/2026; aprovação condicional não implica registro automático no Brasil.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Na síndrome de Chiari-like e siringomielia, o erro mais comum é tratar a imagem da ressonância magnética em vez do paciente. A malformação craniocervical pode permanecer assintomática em grande parcela dos cães predispostos, enquanto outros apresentam dor neuropática severa mesmo sem cavidade medular visível. A conduta clínica exige separar o escore anatômico de imagem (como o esquema BVA/Kennel Club) da quantificação clínica longitudinal da dor (como o questionário CHASE validado em 2026), individualizar a farmacoterapia multimodal com gabapentinoides e reservar a neurocirurgia descompressiva para casos selecionados com dor refratária ou mielopatia progressiva.',
    leadHighlights: [
      'tratar a imagem da ressonância magnética em vez do paciente',
      'separar o escore anatômico de imagem',
      'quantificação clínica longitudinal da dor',
      'reservar a neurocirurgia descompressiva para casos selecionados',
    ],
    pillars: [],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico — Da Triagem Clínica à Correlação por RM',
      steps: [
        {
          label: '1. Reconhecer o fenótipo clínico e sinais de urgência',
          timing: 'Admissão',
          detail:
            'Investigar dor cervical recorrente, vocalização espontânea, alodinia ao toque, coceira fantasma (com vídeo do tutor) ou ataxia/paresia; paresia aguda ou dor intratável exigem avaliação neurológica urgente.',
        },
        {
          label: '2. Exame físico, neurológico, dermatológico e otológico',
          timing: 'Consulta inicial',
          detail:
            'Definir localização neuroanatômica (C1–C5 vs. C6–T2 vs. dor craniocervical isolada) e descartar dermatopatias, ectoparasitoses, otite externa/média e doenças cervicais concomitantes.',
        },
        {
          label: '3. Triagem laboratorial pré-anestésica e basal',
          timing: 'Pré-RM e pré-fármacos',
          detail:
            'Hemograma, bioquímica e avaliação renal/hepática são normalmente normais em CM/SM isolada, mas são indispensáveis para anestesia segura, exclusão de diferenciais e ajuste de gabapentinoides.',
        },
        {
          label: '4. Ressonância magnética do encéfalo caudal e medula espinhal',
          timing: 'Exame de referência',
          detail:
            'Incluir sequências T2 sagital e transversal (além de T1, pós-contraste/FLAIR conforme diferenciais) avaliando fossa caudal, forame magno, extensão/largura da siringe, bulas timpânicas (PSOM) e discos cervicais; complementar com TC se suspeita óssea/atlantoaxial.',
        },
        {
          label: '5. Correlação clínico-radiológica rigorosa',
          timing: 'Definição causal',
          detail:
            'Confirmar se localização e características da CM/SM explicam o quadro atual, evitando atribuir convulsões, doença discal ou sinais vestibulares automaticamente a uma CM incidental.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Controle Multimodal, Monitoramento e Neurocirurgia',
      steps: [
        {
          label: '1. Definir se o quadro é assintomático ou sintomático',
          timing: 'Estratificação',
          detail:
            'Achados incidentais assintomáticos não exigem medicação analgésica nem cirurgia — apenas orientação ao tutor, vigilância clínica e manejo reprodutivo conforme triagem BVA/Kennel Club.',
        },
        {
          label: '2. Analgesia dirigida à dor neuropática (1ª linha)',
          timing: 'Tratamento clínico',
          detail:
            'Iniciar gabapentina (10–20 mg/kg VO q8–12h em cães) ou pregabalina (evidência de ensaios randomizados; regime condicional FDA 2026: 5–10 mg/kg VO q12h com alimento em cães), titulando para equilibrar analgesia e sedação/ataxia.',
        },
        {
          label: '3. Adjuvantes, comorbidades e manejo ambiental',
          timing: 'Terapia multimodal',
          detail:
            'Associar AINE criterioso se houver dor nociceptiva/musculoesquelética concomitante (nunca com corticoide sistêmico), considerar amitriptilina (1–2 mg/kg VO q12h) ou outros adjuvantes em refratários; substituir coleira cervical por peitoral ergonômico e elevar comedouros.',
        },
        {
          label: '4. Avaliar criticamente fármacos voltados ao LCR',
          timing: 'Uso criterioso',
          detail:
            'Evitar uso automático de furosemida, omeprazol ou acetazolamida como modificadores comprovados da siringomielia — a evidência clínica para redução estrutural da cavidade é insuficiente ou negativa.',
        },
        {
          label: '5. Monitorar longitudinalmente e discutir neurocirurgia',
          timing: '2–4 semanas e seguimento',
          detail:
            'Reavaliar dor, vídeos de coceira, sono, marcha (diferenciando ataxia medicamentosa de mielopatia) e escore CHASE; encaminhar para descompressão do forame magno (ou derivação selecionada) diante de dor refratária ou déficits progressivos.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Consulta rápida em 60 segundos: abordagem essencial da síndrome de Chiari-like',
      headers: ['Eixo clínico', 'Diretriz prática imediata'],
      rows: [
        [
          'Conceito central',
          'Desproporção entre o volume encefálico e a fossa craniana caudal, com aglomeração cerebelar e distúrbio pulsátil do LCR. CM e siringomielia são relacionadas, mas não são sinônimos.',
        ],
        [
          'Paciente típico',
          'Cão de raça pequena ou miniatura (especialmente Cavalier King Charles Spaniel, Griffon Bruxellois e Spitz Alemão/Pomeranian) com dor cervical intermitente, vocalização, alodinia, coceira fantasma e possível ataxia.',
        ],
        [
          'Exame central',
          'Ressonância magnética (T2 sagital e transversal do encéfalo caudal e medula cervical/torácica), sempre após exame neurológico e exclusão de causas dermatológicas, otológicas (PSOM) e discais.',
        ],
        [
          'Terapia farmacológica (cães)',
          'Gabapentinoides (gabapentina 10–20 mg/kg VO q8–12h; pregabalina 5–10 mg/kg VO q12h no regime condicional FDA 2026) como base neuropática; adjuvantes individualizados (amitriptilina, AINE se dor nociceptiva).',
        ],
        [
          'Neurocirurgia',
          'Descompressão do forame magno (com ou sem cranioplastia de titânio) reservada a dor refratária ou mielopatia progressiva; nem toda CM2/SM2 é cirúrgica, e dor neuropática pode persistir após a cirurgia.',
        ],
        [
          'Gatos',
          'Ocorrência rara baseada em relatos de caso (paresia/ataxia progressivas mesmo sem siringomielia); não extrapolar prevalências, escores ou doses caninas diretamente aos felinos.',
        ],
      ],
    },
  },

  etiology: {
    chiariDefinicaoETerminologia:
      'A expressão ==Chiari-like malformation (CM ou CLM)== foi adotada porque o quadro canino lembra a malformação de Chiari tipo I humana, porém não é anatomicamente idêntico. Como demonstrado por Rusbridge, Stringer e Knowler (2018), não se trata de um cerebelo que simplesmente "escorregou" pelo forame magno, mas de uma ==desordem complexa de conformação de todo o crânio e da junção craniocervical== {{ref:ref-rusbridge-2018}}:\n\n' +
      '- ==Alterações estruturais integradas==: encurtamento da base do crânio (basicrânio e osso pré-esfenoide), achatamento do osso supraoccipital e redução da crista occipital, redução do espaço funcional da fossa craniana caudal, aglomeração (*crowding*) do cerebelo e do bulbo, aproximação anômala do atlas ao crânio, eventual flexura cervical com angulação aguda do processo odontoide (*kinking* da junção cranioespinhal) e deformação do fluxo pulsátil do líquido cefalorraquidiano (LCR) no forame magno {{ref:ref-rusbridge-2018}}.\n' +
      '- ==Separação obrigatória entre CM e siringomielia (SM)==: a siringomielia é uma alteração anatômica com múltiplas etiologias possíveis — além de CM, pode surgir secundariamente a neoplasias intramedulares, meningomielites, trauma espinhal ou malformações vertebrais. Assim, um paciente pode ter CM sem siringomielia (inclusive com dor: *CM-pain*) e pode apresentar siringomielia sem CM.\n' +
      '- ==Classificação funcional por apresentação clínica==: diferenciar rigorosamente quatro fenótipos evita tratar exames em vez de pacientes: (1) ==CM assintomática== (achado de imagem sem sinais atribuíveis); (2) ==CM dolorosa sem SM (CM-pain)==; (3) ==CM com SM assintomática==; e (4) ==CM com SM sintomática== (localização e extensão da siringe coerentes com dor neuropática, coceira fantasma ou déficits locomotores).',

    chiariTabelaGlossarioTermos: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Terminologia essencial: termos relacionados que não devem ser confundidos',
      headers: ['Termo', 'Definição anatômica / clínica', 'Significado prático'],
      rows: [
        [
          'Chiari-like malformation (CM / CLM)',
          'Alteração estrutural complexa da região caudal do crânio e junção craniocervical',
          'Pode existir com ou sem sinais clínicos; frequente como achado incidental em raças predispostas.',
        ],
        [
          'CM-pain',
          'Síndrome dolorosa craniocervical atribuída à malformação após exclusão de outras causas',
          'Comprova que pode haver dor clinicamente relevante mesmo na ausência de siringomielia.',
        ],
        [
          'Siringomielia (SM)',
          'Cavidade preenchida por fluido (siringe) dentro do parênquima da medula espinhal',
          'Pode causar dor neuropática, disestesia, coceira fantasma, escoliose e mielopatia — mas também pode ser assintomática.',
        ],
        [
          'Hidromielia',
          'Dilatação do canal central ependimário da medula espinhal por acúmulo de líquido',
          'Conceitualmente distinta da cavitação parenquimatosa da siringomielia.',
        ],
        [
          'Siringohidromielia',
          'Sobreposição ou associação entre dilatação do canal central e cavitação parenquimatosa',
          'Termo usado quando a imagem não consegue separar completamente ambos os processos.',
        ],
        [
          'Pré-siringe (pre-syrinx)',
          'Alteração de sinal medular em T2 compatível com edema intersticial pré-cavitário',
          'Sinaliza distúrbio hídrico medular associado à dinâmica alterada do LCR antes da cavidade franca.',
        ],
        [
          'Ventriculomegalia',
          'Aumento das dimensões dos ventrículos cerebrais',
          'Frequentemente acompanha CM, sem implicar automaticamente hidrocefalia hipertensiva.',
        ],
        [
          'Siringobulbia',
          'Cavidade intramedular estendendo-se para o bulbo / tronco encefálico',
          'Localização crítica associada a risco de disfunção de nervos cranianos e centros vitais.',
        ],
      ],
    },

    chiariGeneticaEHeranca:
      'A condição apresenta ==forte predisposição genética e herança complexa==, particularmente documentada no Cavalier King Charles Spaniel e no Griffon Bruxellois.\n\n' +
      '- ==Superação do modelo monogênico simples==: embora descrições históricas sugerissem um padrão autossômico recessivo simples com penetrância incompleta, as investigações genômicas contemporâneas (como Ancot et al., 2018) e o próprio programa do Royal Kennel Club reconhecem ==herança poligênica/complexa== envolvendo múltiplas variantes cromossômicas associadas ao fechamento de suturas/sincondroses da base craniana, miniaturização, braquicefalia e geometria craniocervical {{ref:ref-ancot-2018}} {{ref:ref-bva-scheme}}.\n' +
      '- ==Limitação prática==: atualmente ==não existe teste genético único de DNA== com desempenho suficiente para substituir a triagem fenotípica e por ressonância magnética em programas reprodutivos. No estudo dinamarquês de Thøfner et al. (2015), a ==herdabilidade estimada da siringomielia sintomática foi de 0,81== — medida populacional da fração da variação fenotípica atribuível à variação genética naquela população, e não uma "porcentagem fixa de causa genética" em um cão isolado {{ref:ref-thofner-2015}}.',
  },

  epidemiology: {
    chiariRacasPrevalenciaEIdade:
      'A grande maioria da casuística clínica e das pesquisas concentra-se em ==cães de raças pequenas e miniatura==, com destaque para ==Cavalier King Charles Spaniel (CKCS)==, ==Griffon Bruxellois== e ==Spitz Alemão (Pomeranian)==, além de Chihuahua, Maltês, Yorkshire Terrier, Papillon, Affenpinscher, Boston Terrier e Havanese (o esquema BVA também admite triagem em cães sem raça definida) {{ref:ref-bva-scheme}}.\n\n' +
      '- ==Contextualizando números clássicos de prevalência==: estimativas históricas em Cavaliers descrevem > 95% com algum grau morfológico de CM, ~50% com siringomielia e ~35% dos afetados exibindo sinais clínicos (com início típico em filhotes e adultos jovens, frequentemente antes dos 4 anos). Esses percentuais variam enormemente conforme idade na RM, linhagem geográfica, protocolo de imagem e definição de dilatação do canal central versus siringe — não são probabilidades universais para qualquer indivíduo.\n' +
      '- ==Impacto decisivo da idade (Parker et al., 2011)==: em estudo transversal com ==555 Cavaliers== considerados assintomáticos pelos tutores, a prevalência de SM detectada por RM saltou de ==25% aos 12 meses para ~70% aos 72 meses ou mais== {{ref:ref-parker-2011}}. Portanto, uma RM normal em cão jovem não descarta o desenvolvimento posterior de siringomielia.\n' +
      '- ==Frequência de doença clínica e estabilidade (Thøfner et al., 2015)==: em coorte de 240 Cavaliers registrados na Dinamarca, a prevalência estimada de ==SM sintomática foi de 15,4%==; na subcoorte de 22 irmãos de ninhada, 21/22 (95%) possuíam siringe, porém ==14/15 (93%) dos cães assintomáticos aos 6 anos permaneceram assintomáticos== no seguimento longitudinal — comprovando que ter siringe não equivale a deterioração clínica inevitável {{ref:ref-thofner-2015}}.',

    chiariTabelaRacasEEpidemiologia: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Principais raças predispostas e perfil epidemiológico comparado',
      headers: ['Grupo / Raça', 'Perfil epidemiológico documentado', 'Implicação prática'],
      rows: [
        [
          'Cavalier King Charles Spaniel (CKCS)',
          'Raça mais estudada; altíssima frequência morfológica de CM e alta taxa de SM dependente da idade (25% aos 12 m → ~70% ≥ 72 m em assintomáticos; Parker 2011)',
          'Investigar sempre otite média secretória (PSOM) e doença valvar mitral (anestesia) de forma paralela.',
        ],
        [
          'Griffon Bruxellois',
          'Forte componente hereditário confirmado em estudos morfométricos de crânio curto e fossa caudal',
          'Candidato prioritário a triagem pré-reprodutiva por RM e aconselhamento genético.',
        ],
        [
          'Spitz Alemão (Pomeranian)',
          'Casuística clínica crescente, incluindo coorte terapêutica recente com 90 cães avaliando amitriptilina e gabapentina (ter Maat 2025)',
          'Diferenciar cuidadosamente dor craniocervical de instabilidade atlantoaxial e colapso traqueal.',
        ],
        [
          'Chihuahua, Maltês, Yorkshire, Papillon, Affenpinscher, Boston Terrier, Havanese e SRD',
          'Ocorrência documentada em múltiplas raças toy/braquicefálicas e mestiços',
          'Não restringir a suspeita apenas a Cavaliers; aplicar mesma disciplina de exclusão diferencial.',
        ],
        [
          'Gatos domésticos',
          'Rara; conhecimento restrito a relatos de caso (ex.: Minato & Baroni, 2018 — dois machos castrados com paresia/ataxia progressivas e herniação cerebelar sem SM)',
          'Incluir no diferencial de mielopatia cervical progressiva felina, mas sem extrapolar automaticamente critérios ou doses caninas.',
        ],
      ],
    },

    chiariOcorrenciaFelina:
      'Em felinos, a malformação tipo Chiari é ==rara== e fundamentada principalmente em relatos de caso. Minato e Baroni (2018) descreveram ==dois gatos domésticos de pelo curto, machos castrados==, com paresia e ataxia progressivas nos quais a RM demonstrou malformação do osso occipital e herniação do verme cerebelar pelo forame magno, ==sem siringomielia==, com exames sanguíneos e LCR normais {{ref:ref-minato-2018}}. Após 1 ano, a RM repetida mostrou persistência das alterações enquanto os sinais neurológicos progrediram; um dos gatos foi submetido à descompressão do forame magno com resolução dos sinais descritos. O relato comprova que CM existe em gatos e pode provocar mielopatia progressiva mesmo sem siringe, porém ==não há evidência suficiente para extrapolar prevalências, escores BVA, doses farmacológicas específicas ou prognósticos caninos diretamente aos felinos==.',
  },

  pathogenesisTransmission: {
    chiariAnatomiaFisiologiaLcrEMonroKellie:
      'Para entender como uma malformação óssea gera cavidades intramedulares e dor neuropática, é essencial dominar a anatomia e a biomecânica normal da junção craniocervical:\n\n' +
      '- ==Anatomia da fossa craniana caudal==: delimitada pelos componentes do osso occipital (supraoccipital na parede caudodorsal, basioccipital na base caudal e porções laterais) que formam o ==forame magno==, abrigando o cerebelo, o bulbo (medula oblonga) e os espaços subaracnóideos preenchidos por LCR na transição para a medula cervical.\n' +
      '- ==Dinâmica pulsátil do LCR (não é um cano rígido)==: produzido principalmente pelos plexos coroides ventriculares (com contribuições de trocas intersticiais), o LCR protege mecanicamente o SNC e mantém a homeostase extracelular. Fundamentalmente, seu movimento é ==pulsátil==, governado pelo ciclo cardíaco e pela respiração: durante a sístole, o aumento transitório do volume sanguíneo intracraniano desloca parte do LCR pelo forame magno em direção ao compartimento espinhal; na diástole, ocorre o retorno compensatório. Esse vaivém exige espaços subaracnóideos desobstruídos e boa complacência craniocervical.\n' +
      '- ==Princípio de Monro–Kellie e o mito da "hipertensão intracraniana universal"==: dentro do crânio adulto pouco expansível, encéfalo, sangue e LCR competem por volume fixo. Contudo, ==nem todo cão com Chiari-like apresenta hipertensão intracraniana persistente== — a malformação altera principalmente a complacência local e a transmissão de ondas pulsáteis de pressão, o que ajuda a explicar por que fármacos desenhados apenas para reduzir a produção de LCR frequentemente falham em produzir melhora clínica consistente.',
  },

  pathophysiology: {
    chiariCadeiaFisiopatologicaCompleta:
      'A fisiopatogenia conecta a conformação craniana à lesão parenquimatosa em etapas interligadas — mantendo rigor sobre o que ainda está em investigação:\n\n' +
      '- ==Etapa 1 — Desproporção crânio–encéfalo (crowding)==: encurtamento da base óssea, angulação craniana alterada e redução da fossa caudal comprimem geometricamente cerebelo e tronco encefálico, causando indentação cerebelar e impacto ou herniação pelo forame magno (mesmo sem encéfalo absolutamente gigante — o problema está na relação volume/geometria do continente ósseo) {{ref:ref-rusbridge-2018}}.\n' +
      '- ==Etapa 2 — Perturbação da passagem pulsátil do LCR==: o estreitamento do espaço subaracnóideo craniocervical aumenta a resistência ao fluxo sistólico/diastólico do LCR, gerando turbulência, gradientes anômalos de pressão e transmissão exagerada de energia mecânica para a medula cervical.\n' +
      '- ==Etapa 3 — Formação e expansão da siringe==: não deve ser simplificada como "LCR entrando por um buraco na medula". Os modelos mais plausíveis combinam gradientes de pressão transmurais, ondas pulsáteis, movimentação de fluido pelos espaços perivasculares e desequilíbrio do fluido extracelular medular (frequentemente precedido por edema de ==pré-siringe==). À medida que a cavidade cresce — podendo expandir dramaticamente ao longo dos anos em indivíduos suscetíveis —, desloca e lesa axônios, neurônios do corno dorsal e motoneurônios ventrais.\n' +
      '- ==Etapa 4 — Dor neuropática e sensibilização central==: diferentemente da dor nociceptiva periférica, a ==dor neuropática== decorre de lesão/disfunção do próprio sistema somatossensorial. Dano às vias sensitivas medulares induz hiperexcitabilidade neuronal, perda de mecanismos inibitórios descendentes e ativação glial, manifestando-se como ==alodinia== (dor ao toque leve), ==hiperalgesia== (resposta exagerada à dor), ==disestesia== (sensação espontânea desagradável) e ==prurido neuropático==. A ausência de lesão de pele jamais significa ausência de sofrimento.\n' +
      '- ==Por que ocorre dor sem siringomielia (CM-pain)?==: deformação mecânica direta e tensão sobre meninges e estruturas craniocervicais sensíveis à dor, alterações das ondas de pressão liquórica e eventuais anomalias vertebrais/articulares concomitantes explicam a dor na ausência de cavidade intramedular — reforçando por que o tamanho da siringe não é a única medida de dor.\n' +
      '- ==Por que surge a coceira fantasma (phantom scratching / fictive scratching)?==: a lesão do ==corno dorsal superficial médio-cervical (frequentemente C3–C6)== — especialmente em siringes que se estendem lateralmente — desregula os circuitos geradores de padrão motor do reflexo de coçar (*central pattern generators*) {{ref:ref-rusbridge-2018}}. Assim, o movimento rítmico do membro pélvico sem tocar a pele constitui um ==reflexo espinhal inadequadamente ativado (fictive scratching)==, que não exige necessariamente sensação consciente de coceira.\n' +
      '- ==Por que ocorre escoliose cervical?==: lesões medulares assimétricas comprometem neurônios motores inferiores (LMN) nos cornos ventrais e circuitos proprioceptivos cervicais, produzindo ==denervação assimétrica da musculatura paraespinhal== e desequilíbrio postural progressivo que desvia a coluna cervical (sempre devendo excluir malformações vertebrais e instabilidade associadas).',

    chiariFiguraMorfometriaRusbridge2018: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/sindrome-chiari-like-caes-gatos/fig1-rusbridge-2018-morphometry-cm-sm.png',
      fallbackSrc: 'https://cavalierhealth.org/images/rusbridge_frontiers-fig_8_2018.png',
      alt: 'Comparação morfométrica em ressonância magnética sagital T2 de três Cavalier King Charles Spaniels: normal, com CM dolorosa e com siringomielia',
      shortCaption: 'Fig. 1 — RM sagital T2 comparando Normal (A), CM-pain (B) e SM (C) (Rusbridge et al., 2018).',
      caption:
        'Figura 1 — Alterações morfométricas em RM sagital T2 de três Cavalier King Charles Spaniels: cão de referência normal (A), cão afetado por CM dolorosa sem siringe (B) e cão com siringomielia (C). A coluna esquerda destaca apagamento dos espaços subaracnóideos e ventriculomegalia; a coluna direita demonstra encurtamento da base craniana (região alaranjada), achatamento frontal/supraoccipital, aglomeração cerebelar, aproximação do atlas, angulação aguda do processo odontoide e formação da siringe (asterisco azul-escuro). Fonte: Rusbridge C, Stringer F, Knowler SP (2018), *Frontiers in Veterinary Science*, 5:280, Figura 8 (DOI: 10.3389/fvets.2018.00280). Licença: CC BY 4.0.',
      display: 'wide',
    },

    chiariFiguraProgressaoRusbridge2018: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/sindrome-chiari-like-caes-gatos/fig2-rusbridge-2018-progression-sm.jpg',
      fallbackSrc: 'https://www.frontiersin.org/files/Articles/418061/fvets-05-00280-HTML/image_m/fvets-05-00280-g009.jpg',
      alt: 'Progressão da siringomielia documentada por ressonância magnética T2 seriada em Cavalier King Charles Spaniel aos 8 meses e aos 3 anos de idade',
      shortCaption: 'Fig. 2 — Progressão da siringomielia em RM seriada aos 8 meses (A–B) e aos 3 anos (C–D) (Rusbridge et al., 2018).',
      caption:
        'Figura 2 — Evolução longitudinal da siringomielia em RM sagital T2 de um mesmo Cavalier King Charles Spaniel examinado aos 8 meses (painéis A e B, alterações discretas iniciais apontadas pelas setas) e aos 3 anos de idade (painéis C e D, expansão acentuada da siringe assinalada pelos asteriscos vermelhos acompanhada de piora neurológica). Comprova que a doença pode progredir com o tempo, embora em outros cães permaneça estável. Fonte: Rusbridge C, Stringer F, Knowler SP (2018), *Frontiers in Veterinary Science*, 5:280, Figura 9 (DOI: 10.3389/fvets.2018.00280). Licença: CC BY 4.0.',
      display: 'wide',
    },
  },

  clinicalSignsPathophysiology: {
    chiariApresentacaoNeuroanatomiaELimites:
      'A expressão clínica depende de duas dimensões independentes: (1) presença de estruturas craniocervicais dolorosas (mesmo sem siringe) e (2) localização transversal e longitudinal da siringe na medula espinhal. Por isso, ==a intensidade da dor não acompanha proporcionalmente a gravidade da paresia== — um cão pode vocalizar de dor ao mínimo toque com marcha impecável.\n\n' +
      '- ==Dor cervical paroxística e intermitente==: frequentemente surge em crises (ao pular do sofá, abaixar a cabeça para comer, ser suspenso pelo tórax, usar coleira ou à noite), intercaladas por períodos em que o animal parece normal — fator que causa grandes atrasos diagnósticos e interpretações equivocadas de "ansiedade" ou "comportamento".\n' +
      '- ==Localização neuroanatômica (C1–C5 vs. C6–T2)==: a localização deve sempre partir do exame neurológico, e não da imagem. Siringes cervicais altas (==C1–C5==) produzem ataxia proprioceptiva e déficits de neurônio motor superior (NMS) nos quatro membros; já o acometimento da intumescência cervical (==C6–T2==) provoca sinais de neurônio motor inferior (NMI) nos membros torácicos (fraqueza segmentar, hiporreflexia e atrofia muscular torácica) combinados a ataxia/hiperreflexia (NMS) nos membros pélvicos.\n' +
      '- ==Avaliação prática da coceira fantasma==: peça vídeos caseiros ao tutor (uma foto estática não confirma o sinal) e verifique se o movimento rítmico do membro pélvico ocorre sem contato cutâneo, se é deflagrado por excitação, caminhada ou coleira, se há lateralidade consistente e se pele e condutos auditivos estão realmente saudáveis. Não estimule repetidamente a zona de gatilho cervical apenas para "reproduzir o sinal" quando isso causar desconforto.\n' +
      '- ==Sinais que NÃO devem ser atribuídos automaticamente à CM/SM==: crises epilépticas, síndrome vestibular intensa, paralisia facial ou perda visual podem coexistir (sobretudo em Cavaliers); um Cavalier com CM na RM e convulsões deve ser investigado para epilepsia idiopática ou outras lesões intracranianas.',

    chiariTabelaSinaisPorSistema: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Sinais clínicos, mecanismos prováveis e interpretação neurológica',
      headers: ['Sistema', 'Manifestação clínica', 'Mecanismo provável', 'Interpretação prática'],
      rows: [
        [
          'Sensitivo',
          'Hipersensibilidade cervical e dor paroxística (vocalização espontânea)',
          'Disfunção de vias nociceptivas cervicais e/ou compressão de estruturas craniocervicais',
          'Manifestação mais frequente; pode ocorrer em crises sem alteração locomotora.',
        ],
        [
          'Sensitivo',
          'Alodinia (dor ao toque suave em pescoço, orelha, ombro ou face)',
          'Sensibilização central e processamento anômalo de estímulos táteis',
          'Sinal forte de dor neuropática; ausência de ferida cutânea não nega dor.',
        ],
        [
          'Motor / Reflexo',
          'Coceira fantasma (phantom scratching / fictive scratching)',
          'Lesão do corno dorsal superficial (frequentemente C3–C6) desinibindo geradores espinhais do reflexo de coçar',
          'Altamente sugestiva de SM quando típica (rítmica, sem tocar pele), mas exige excluir dermatopatias e otites.',
        ],
        [
          'Motor / Proprioceptivo',
          'Ataxia proprioceptiva e tetraparesia',
          'Comprometimento de tratos ascendentes proprioceptivos e vias motoras descendentes cervicais',
          'Indica mielopatia clinicamente relevante; localizar segmento C1–C5 versus C6–T2.',
        ],
        [
          'Muscular',
          'Atrofia muscular de membros torácicos e fraqueza segmentar',
          'Dano a motoneurônios inferiores na intumescência cervical (C6–T2) ou desuso',
          'Exige avaliação de reflexos espinhais e exclusão de neuropatias/lesões discais.',
        ],
        [
          'Postural',
          'Escoliose ou tortícolis cervical',
          'Denervação assimétrica da musculatura paraespinhal por dano a NMI em siringe assimétrica',
          'Investigar também anomalias vertebrais congênitas e instabilidade craniocervical.',
        ],
        [
          'Comportamental',
          'Redução de atividade, distúrbios do sono, agressividade defensiva ao toque',
          'Dor neuropática persistente ou noturna reduzindo qualidade de vida',
          'Não rotular como envelhecimento ou problema comportamental primário sem investigar dor.',
        ],
        [
          'Craniano / Facial',
          'Esfregar cabeça, face ou orelhas',
          'Disestesia facial/cervical ou otite média secretória (PSOM) concomitante',
          'Inespecífico — exige otoscopia completa e avaliação das bulas timpânicas na RM.',
        ],
      ],
    },

    findingsBySystem: [
      {
        system: 'neurologic',
        findings: [
          {
            finding: 'Alodinia cervical, vocalização espontânea e coceira fantasma (sem tocar a pele)',
            mechanism: 'Sensibilização de vias somatossensoriais e desregulação de circuitos geradores do reflexo de coçar no corno dorsal cervical (C3–C6).',
            clinicalMeaning: 'Pode ocorrer com propriocepção e marcha preservadas; vídeos caseiros ajudam muito na documentação clínica {{ref:ref-rusbridge-2018}}.',
          },
          {
            finding: 'Ataxia proprioceptiva, tetraparesia ou fraqueza/atrofia de membros torácicos',
            mechanism: 'Expansão da siringe comprometendo tratos longos (C1–C5) e/ou motoneurônios inferiores da intumescência cervical (C6–T2).',
            clinicalMeaning: 'Sinaliza mielopatia funcionalmente relevante e orienta reavaliação por RM ou discussão neurocirúrgica.',
          },
        ],
      },
      {
        system: 'musculoskeletal',
        findings: [
          {
            finding: 'Escoliose cervical, relutância em abaixar a cabeça ou rigidez de pescoço',
            mechanism: 'Desequilíbrio muscular paraespinhal por dano assimétrico de motoneurônios cervicais e desconforto craniocervical.',
            clinicalMeaning: 'Sempre descartar doença do disco intervertebral, discospondilite e instabilidade atlantoaxial.',
          },
        ],
      },
      {
        system: 'general',
        findings: [
          {
            finding: 'Distúrbios do sono, intolerância ao uso de coleira e reatividade defensiva ao manuseio',
            mechanism: 'Dor neuropática crônica intermitente ou contínua impactando o bem-estar global.',
            clinicalMeaning: 'Excelentes marcadores clínicos para acompanhar resposta ao tratamento (inclusive via questionário CHASE) {{ref:ref-valentino-2026}}.',
          },
        ],
      },
    ],

    physicalExamFindings: [
      'Exame neurológico completo: avaliar estado mental, nervos cranianos (para afastar siringobulbia ou lesão encefálica concorrente), marcha, reações posturais nos quatro membros e reflexos espinhais para diferenciar C1–C5 de C6–T2.',
      'Palpação cervical cuidadosa e progressiva: iniciar com toque suave (pesquisando alodinia cutânea) antes de mobilizar o pescoço; jamais forçar flexão ou extensão cervical diante de dor aguda ou suspeita de instabilidade atlantoaxial.',
      'Triagem dermatológica e otológica obrigatória: examinar pele cervical/escapular para ectoparasitas/dermatites e realizar otoscopia cuidadosa para investigar otite externa ou abaulamento timpânico sugestivo de PSOM.',
      'Avaliação cardiológica pré-anestésica (especialmente em Cavaliers): auscultar cuidadosamente sopro de doença valvar mitral antes de planejar sedação/anestesia para ressonância magnética.',
    ],

    particularidadesCaninasEFelinas:
      '- Cães: literatura extensa permitindo correlação morfométrica, classificação BVA/Kennel Club, validação de instrumentos de dor (CHASE 2026), ensaios clínicos controlados de pregabalina (e aprovação condicional FDA 2026) e séries neurocirúrgicas {{ref:ref-rusbridge-2018}} {{ref:ref-valentino-2026}} {{ref:ref-fda-2026}}.\n' +
      '- Gatos: relato raro (como Minato & Baroni, 2018, em dois gatos com paresia e ataxia progressivas por herniação cerebelar sem siringomielia) {{ref:ref-minato-2018}}; faltam dados suficientes para extrapolar prevalências, critérios de gravidade, doses validadas de pregabalina ou taxas cirúrgicas diretamente da espécie canina.',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico passo a passo — Da suspeita à correlação clínico-radiológica',
      subtitle: 'Expanda cada etapa para alinhar exame neurológico, triagem laboratorial, sequências de RM, classificação BVA e diferenciais.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Consulta · Fenótipo e vídeo',
          speciesTag: 'both',
          title: 'Caracterizar dor neuropática, coceira fantasma e sinais de urgência',
          quickSummary:
            'Diferencie crises de dor craniocervical, alodinia, coceira sem contato cutâneo (peça vídeos) e sinais de mielopatia; paresia aguda exige investigação imediata de doença discal ou instabilidade.',
          quickFacts: [
            { label: 'Pele e orelhas', value: 'Excluir dermatite, ectoparasitas e PSOM' },
            { label: 'Armadilha aguda', value: 'Cão com CM também pode ter DDIV cervical' },
          ],
          details: [
            {
              label: 'Acurácia anatômica ≠ causalidade clínica',
              content:
                'Não existe sensibilidade/especificidade universal da RM para "CM-pain": como muitos Cavaliers têm CM/SM assintomática, a RM excelente para detectar anatomia pode ter baixo valor preditivo causal se outras fontes de dor não forem excluídas.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Laboratório · Segurança',
          speciesTag: 'both',
          title: 'Solicitar exames basais e avaliar risco de punção de LCR',
          quickSummary:
            'Hemograma e bioquímica costumam ser normais em CM/SM isolada, mas embasam anestesia segura, exclusão de causas metabólicas/inflamatórias e checagem renal para gabapentinoides.',
          quickFacts: [
            { label: 'LCR em CM/SM', value: 'Normal; útil apenas para excluir inflamação/infecção' },
            { label: 'Risco de punção', value: 'Evitar cisterna magna sem imagem prévia' },
          ],
          details: [
            {
              label: 'Cuidado extremo na coleta de LCR',
              content:
                'A punção da cisterna cerebelomedular em paciente com aglomeração severa no forame magno oferece risco de herniação e trauma neural — nunca realizar rotineiramente sem avaliação especializada prévia por RM.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Padrão ouro · RM',
          speciesTag: 'both',
          title: 'Realizar ressonância magnética do encéfalo caudal e medula espinhal',
          quickSummary:
            'Adquirir T2 sagital e transversal (além de T1, contraste e FLAIR conforme diferenciais) para caracterizar fossa caudal, cerebelo, largura/simetria da siringe e excluir neoplasias ou discos.',
          quickFacts: [
            { label: 'Largura ≥ 4 mm', value: 'Associada a mais mielopatia (não é regra absoluta)' },
            { label: 'Localização', value: 'Siringe lateral pequena pode doer mais que central larga' },
          ],
          details: [
            {
              label: 'Anestesia e posicionamento cervical seguros',
              content:
                'Evite flexão ou extensão cervical forçada durante intubação e posicionamento na RM (especialmente se houver suspeita de instabilidade atlantoaxial) e avalie cardiopatias concomitantes (DMVD em Cavaliers).',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Complemento · TC e Raio-X',
          speciesTag: 'both',
          title: 'Usar TC para arquitetura óssea e planejamento cirúrgico (nunca como substituta da RM)',
          quickSummary:
            'A TC detalha osso occipital, atlas/áxis, processo odontoide e invaginação basilar, mas não substitui a RM na detecção de pré-siringe ou cavidades intramedulares.',
          quickFacts: [
            { label: 'Raio-X normal', value: 'Jamais exclui CM ou siringomielia' },
            { label: 'Indicação de TC', value: 'Suspeita óssea / atlantoaxial / pré-operatório' },
          ],
          details: [
            {
              label: 'Radiografia sem estresse cervical',
              content:
                'Em suspeita de instabilidade atlantoaxial concomitante, nunca realizar projeções radiográficas com flexão cervical forçada pelo risco de lesão medular catastrófica.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Classificação · BVA vs. CHASE',
          speciesTag: 'dog',
          title: 'Separar escore anatômico (BVA) do escore clínico de dor (CHASE)',
          quickSummary:
            'Use a classificação BVA/Kennel Club (CM0–CM2; SM0–SM2 + faixa etária a/b/c) para padronização anatômica/reprodutiva, e ferramentas clínicas como CHASE (2026) para acompanhar a dor no paciente.',
          quickFacts: [
            { label: 'Correlação BVA × dor', value: 'Sem correlação significativa no estudo CHASE 2026' },
            { label: 'Decisão cirúrgica', value: 'Nunca baseada isoladamente em CM2 ou SM2' },
          ],
          details: [
            {
              label: 'Validação do questionário CHASE (Valentino et al., 2026)',
              content:
                'Em 30 cães com CM/SM vs. 20 saudáveis, o escore CHASE (α de Cronbach = 0,89) distinguiu nitidamente os grupos (15,3 ± 4,8 vs. 1,4 ± 1,8) e detectou melhora com pregabalina (P < 0,03 vs. placebo), sem se correlacionar com o grau BVA — ideal para seguimento longitudinal, mas não como teste diagnóstico isolado {{ref:ref-valentino-2026}}.',
              tone: 'evidence',
            },
          ],
        },
      ],
    },

    chiariLaboratorioELcr:
      '- ==Hemograma, bioquímica e urinálise==: a síndrome de Chiari-like/siringomielia é uma afecção estrutural neurológica sem alterações hematológicas ou bioquímicas específicas — resultados completamente normais não descartam doença grave do SNC. Os exames são indicados para segurança anestésica (RM), investigação de diferenciais inflamatórios/metabólicos e ==avaliação da função renal basal== antes de prescrever gabapentina, pregabalina, AINEs ou diuréticos.\n' +
      '- ==Análise do líquido cefalorraquidiano (LCR)==: geralmente normal em CM/SM não complicada, sendo útil principalmente para descartar meningomielite inflamatória, infecciosa ou neoplasia quando há suspeita diferencial. ==Alerta de segurança==: não puncionar rotineiramente a cisterna cerebelomedular em pacientes com aglomeração grave no forame magno ou suspeita de hipertensão intracraniana sem avaliação especializada prévia da RM, pelo risco de herniação e lesão do tronco encefálico.',

    chiariRessonanciaTcERadiografia:
      'A ==ressonância magnética (RM)== é a modalidade diagnóstica central porque caracteriza simultaneamente fossa caudal, cerebelo, espaços de LCR, parênquima medular e cavidades siringomiélicas (hiperintensas em T2, semelhantes ao LCR) {{ref:ref-rusbridge-2018}}.\n\n' +
      '- ==Largura transversal e localização da siringe==: medir o maior diâmetro transversal, a extensão longitudinal, a simetria e a relação com os cornos dorsais é fundamental. Em estudos com Cavaliers, ==siringes ≥ 4 mm== associaram-se a maior frequência de sinais de mielopatia — trata-se de associação observacional, não de ponto de corte absoluto para dor ou cirurgia, pois uma siringe menor posicionada lateralmente no corno dorsal pode causar dor ou coceira fantasma intensas.\n' +
      '- ==Tomografia computadorizada (TC) e radiografia==: a TC é excelente complemento para avaliar osso occipital, geometria da base craniana, atlas/áxis, processo odontoide, invaginação basilar e planejamento cirúrgico, mas não substitui a RM na identificação de pré-siringe ou cavidades intramedulares. A radiografia cervical pode flagrar anomalias ósseas ou instabilidade atlantoaxial (sempre evitando flexão cervical forçada), mas ==radiografia normal jamais exclui CM ou siringomielia==.\n' +
      '- ==Acurácia anatômica versus atribuição causal==: uma RM pode detectar com altíssima precisão uma CM ou siringe e, ainda assim, ter baixo valor preditivo para afirmar que aquela alteração causa a dor atual em raças onde alterações assintomáticas são muito frequentes. Examine sempre as bulas timpânicas para ==otite média secretória primária (PSOM)== — achado muito comum em Cavaliers que também exige correlação clínica.',

    chiariFiguraRmPlanosAnimals2022: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/sindrome-chiari-like-caes-gatos/fig3-animals-2022-mri-t2-ckcs.jpg',
      fallbackSrc: 'https://cdn.ncbi.nlm.nih.gov/pmc/blobs/edaf/9740166/fc65f8349ec4/animals-12-03405-g001.jpg',
      alt: 'Ressonância magnética T2 sagital e transversal de cabeça e coluna cervical em Cavalier King Charles Spaniels com siringomielia',
      shortCaption: 'Fig. 3 — RM T2 sagital (A, C, E) e transversal (B, D, F) em Cavaliers para caracterização de SM (Animals, 2022).',
      caption:
        'Figura 3 — Imagens sagitais (A, C, E) e transversais (B, D, F) ponderadas em T2 da cabeça e região cervical de cães Cavalier King Charles Spaniel utilizadas na avaliação de malformação tipo Chiari e siringomielia. A combinação dos planos permite medir o maior diâmetro transversal da siringe e observar sua simetria e relação com os cornos dorsais da medula. Fonte: *Diffusion Tensor Imaging in Syringomyelia Secondary to Chiari Malformation in Cavalier King Charles Spaniel—A Preliminary Study*, *Animals*, 2022;12:3405, Figura 1 (DOI: 10.3390/ani12233405). Licença: CC BY 4.0.',
      display: 'wide',
    },

    chiariTabelaSequenciasRm: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Sequências recomendadas na ressonância magnética de CM/SM',
      headers: ['Sequência de RM', 'O que demonstra', 'Aplicação clínica'],
      rows: [
        ['T2 sagital', 'LCR hiperintenso, morfologia cerebelar, espaços subaracnóideos e extensão longitudinal das siringes', 'Essencial para avaliação global da junção craniocervical e medula.'],
        ['T2 transversal', 'Diâmetro transversal máximo, simetria e relação da cavidade com os cornos dorsais e ventrais', 'Fundamental para correlação neurológica e graduação.'],
        ['T1 (pré-contraste)', 'Anatomia parenquimatosa e sinal hipointenso das cavidades liquóricas', 'Complementa a caracterização tecidual.'],
        ['T1 pós-contraste', 'Realce de lesões inflamatórias, infecciosas ou neoplásicas', 'Indicado para excluir meningomielites e tumores intramedulares/intracranianos.'],
        ['FLAIR', 'Supressão de fluido livre evidenciando edema/lesões parenquimatosas encefálicas', 'Útil principalmente para diferenciais intracranianos.'],
        ['3D T2 de alta resolução', 'Detalhamento fino das interfaces entre LCR, cerebelo e medula', 'Avaliação especializada da junção craniocervical.'],
        ['Cine-RM de fluxo (phase-contrast)', 'Movimento pulsátil do LCR no forame magno', 'Investigação especializada da dinâmica liquórica.'],
        ['DTI (imagem por tensor de difusão)', 'Integridade microestrutural de tratos medulares', 'Pesquisa clínica (ex.: Animals 2022); ainda não validado como exame de rotina.'],
      ],
    },

    chiariTabelaClassificacaoBva: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Esquema de triagem por RM da BVA / Royal Kennel Club (padronização anatômica e reprodutiva)',
      headers: ['Categoria / Grau', 'Definição morfológica na RM', 'Observação e faixa etária'],
      rows: [
        ['CM0', 'Ausência de malformação tipo Chiari', 'Sem indentação cerebelar pelo osso occipital.'],
        ['CM1', 'Cerebelo indentado, perdendo seu contorno arredondado habitual', 'Aglomeração caudal presente sem impactação franca no forame magno.'],
        ['CM2', 'Cerebelo impactado no forame magno ou herniado através dele', 'Não equivale isoladamente à presença de dor nem a indicação automática de cirurgia.'],
        ['SM0', 'Sem dilatação do canal central, pré-siringe ou siringe', 'Classificação acompanhada da letra etária: a (> 5 anos), b (3–5 anos), c (1–3 anos).'],
        ['SM1', 'Dilatação do canal central com diâmetro interno < 2 mm', 'O corte de 2 mm é critério de classificação reprodutiva, não ponto de corte absoluto de dor.'],
        ['SM2', 'Siringomielia (diâmetro ≥ 2 mm), siringe separada ou pré-siringe conforme critérios BVA', 'Cães com sinais clínicos ou SM2c (jovens 1–3 anos) não devem ser utilizados na reprodução segundo a BVA.'],
      ],
    },

    chiariTabelaDiferenciaisPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 7 — Diagnósticos diferenciais prioritários no consultório e plantão',
      headers: ['Diagnóstico diferencial', 'Por que pode confundir com CM/SM', 'O que investigar para diferenciar'],
      rows: [
        ['Doença do disco intervertebral cervical (DDIV)', 'Dor cervical intensa, paresia e ataxia (inclusive em cães que já têm CM)', 'Exame neurológico e RM cervical completa; deterioração aguda exige excluir extrusão discal.'],
        ['Instabilidade atlantoaxial', 'Dor cervical aguda/recorrente, tetraparesia e piora com movimentação', 'TC/RM craniocervical e radiografia sem flexão forçada; avaliar processo odontoide.'],
        ['Meningomielite inflamatória / infecciosa', 'Dor cervical difusa e déficits multifocais', 'RM com contraste, análise de LCR (quando segura) e testes infecciosos.'],
        ['Discospondilite', 'Dor cervical acentuada, rigidez e febre eventual', 'Radiografia/TC/RM de placas terminais, hemocultura/urocultura e sorologia específica (ex.: Brucella).'],
        ['Otite média secretória primária (PSOM)', 'Muito comum em Cavaliers; desconforto em cabeça/orelhas e esfregar face', 'Otoscopia sob sedação e avaliação das bulas timpânicas na RM (correlacionar clinicamente).'],
        ['Otite externa e dermatopatias alérgicas/parasitárias', 'Coceira intensa em pescoço, orelhas e ombros simulando prurido neuropático', 'Exame dermatológico, raspado/controle ectoparasitário e citologia otológica.'],
        ['Neoplasia intracraniana ou medular', 'Dor progressiva, déficits neurológicos e siringomielia secundária', 'RM com contraste T1 e investigação oncológica dirigida.'],
        ['Malformações vertebrais congênitas', 'Dor, ataxia e desvios posturais cervicais', 'TC e RM da coluna cervical e craniocervical.'],
        ['Epilepsia e discinesias paroxísticas', 'Episódios motores anormais paroxísticos', 'Vídeos dos episódios, exame interictal e investigação neurológica própria (não atribuir crises à CM).'],
        ['Distúrbios vestibulares / mielopatias degenerativas', 'Inclinação de cabeça, incoordenação ou déficits locomotores progressivos', 'Localização vestibular/medular, otoscopia, imagem e testes genéticos conforme raça.'],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico interativo — Farmacologia multimodal, LCR e neurocirurgia',
      subtitle: 'Expanda cada etapa para revisar gabapentina, pregabalina (FDA 2026), adjuvantes, limites dos fármacos de LCR e indicações cirúrgicas.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Princípio · Alvos',
          speciesTag: 'both',
          title: 'Tratar conforme o fenótipo clínico e não pela imagem isolada',
          quickSummary:
            'Diferencie dor craniocervical sem mielopatia, siringomielia dolorosa e mielopatia progressiva; analgésicos melhoram conforto sem alterar a malformação óssea, e cirurgia não garante eliminar toda dor neuropática.',
          quickFacts: [
            { label: 'CM/SM assintomática', value: 'Sem fármaco nem cirurgia; apenas vigilância' },
            { label: 'Manejo diário', value: 'Trocar coleira por peitoral e elevar potes' },
          ],
          details: [
            {
              label: 'Quatro alvos da terapia multimodal',
              content:
                '(1) Dor neuropática (gabapentinoides e adjuvantes); (2) dor nociceptiva/musculoesquelética concomitante (AINEs criteriosos); (3) dinâmica do LCR (cirurgia em casos selecionados; fármacos de LCR com evidência limitada); e (4) funcionalidade, sono e qualidade de vida.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: '1ª linha · Gabapentinoides',
          speciesTag: 'dog',
          title: 'Escolher e titular gabapentina ou pregabalina (atualização FDA 2026)',
          quickSummary:
            'Gabapentina (10–20 mg/kg VO q8–12h) é opção acessível inicial; pregabalina possui ensaios clínicos randomizados em CM/SM e aprovação condicional FDA em maio de 2026 (Liavium-CA1, 5–10 mg/kg VO q12h com alimento).',
          quickFacts: [
            { label: 'Gabapentina cães', value: '10–20 mg/kg VO q8–12h (t½ 2–4 h)' },
            { label: 'Pregabalina (FDA 2026)', value: '5–10 mg/kg VO q12h com alimento (cães ≥ 3 kg)' },
          ],
          details: [
            {
              label: 'Evidência específica e teto de tolerabilidade da pregabalina',
              content:
                'Sanchis-Mora et al. (2019) mostraram redução significativa da dor e hiperalgesia com ~5 mg/kg q12h (P = 0,006) {{ref:ref-sanchis-mora-2019}}. Thøfner et al. (2020) documentaram redução de 84% nos episódios de coceira fantasma filmados (P < 0,0001), mas com doses equivalentes a ~13–19 mg/kg q12h causando ataxia transitória e polifagia em 9/12 cães {{ref:ref-thofner-2020}}. Por isso, o teto condicional da FDA de 10 mg/kg q12h busca equilibrar eficácia e tolerabilidade {{ref:ref-fda-2026}}.',
              tone: 'evidence',
            },
            {
              label: 'Alertas obrigatórios: xilitol, função renal e gatos',
              content:
                'Nunca use solução líquida humana de gabapentina contendo xilitol (~300 mg/mL) em cães. Ambos os gabapentinoides têm eliminação renal predominante (ajuste cauteloso na DRC) e exigem desmame gradual em uso prolongado. Em gatos, não há protocolo validado de pregabalina para CM/SM.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Adjuvantes · Multimodal',
          speciesTag: 'dog',
          title: 'Integrar amitriptilina, AINEs e adjuvantes com rigor de segurança',
          quickSummary:
            'Associe AINE criterioso se houver componente nociceptivo (jamais com corticoide sistêmico); amitriptilina (1–2 mg/kg VO q12h) é alternativa/adjuvante em dor refratária com vigilância serotoninérgica e cardíaca.',
          quickFacts: [
            { label: 'Amitriptilina (2025)', value: 'Sem superioridade estatística vs. gabapentina (P = 0,65)' },
            { label: 'Interação crítica', value: 'Evitar amitriptilina + tramadol/trazodona/IMAOs' },
          ],
          details: [
            {
              label: 'Amantadina, topiramato, maropitant e corticoides',
              content:
                'Amantadina (antagonista NMDA fraco), topiramato (citado em casos refratários no algoritmo especializado de 2026) e maropitant intermitente (proposta especializada para episódios de phantom scratching) carecem de ensaios randomizados robustos em CM/SM. Corticoides não impedem a progressão da siringe e ficam restritos a casos selecionados avançados/refratários na menor dose eficaz {{ref:ref-rusbridge-algorithm-2026}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'LCR · Leitura crítica',
          speciesTag: 'dog',
          title: 'Evitar uso indiscriminado de furosemida, omeprazol e acetazolamida',
          quickSummary:
            'Apesar da plausibilidade teórica de reduzir produção de LCR, não há comprovação clínica robusta de que esses fármacos freiem a siringomielia — e todos carregam riscos metabólicos.',
          quickFacts: [
            { label: 'Furosemida (ter Maat 2025)', value: 'Sem benefício demonstrado quando adicionada' },
            { label: 'Omeprazol VO', value: 'Redução de LCR não confirmada por via oral' },
          ],
          details: [
            {
              label: 'Riscos reais sem benefício comprovado',
              content:
                'Furosemida causa desidratação, hipocalemia e azotemia pré-renal (alto risco com AINE); acetazolamida carece de dose validada para CM/SM, provoca acidose metabólica hiperclorêmica e ainda reduz excreção urinária de amitriptilina; omeprazol oral não confirmou redução sustentada de LCR em cães e exige desmame se usado > 4 semanas {{ref:ref-ter-maat-2025}} {{ref:ref-in-practice-2020}}.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Neurocirurgia · Seleção',
          speciesTag: 'both',
          title: 'Encaminhar casos refratários ou progressivos para avaliação neurocirúrgica',
          quickSummary:
            'Discuta descompressão do forame magno (com ou sem cranioplastia de titânio) — ou derivação ventriculoperitoneal em casos muito selecionados com ventriculomegalia — alinhando expectativas realistas.',
          quickFacts: [
            { label: 'Cranioplastia titânio (Park 2026)', value: '76/87 (87%) melhora sustentada; 13% recidiva parcial' },
            { label: 'Expectativa honesta', value: 'Siringe e dor neuropática podem persistir' },
          ],
          details: [
            {
              label: 'Por que a cirurgia não "apaga" automaticamente a dor',
              content:
                'A descompressão corrige parcialmente o obstáculo anatômico craniocervical, mas a cicatrização pós-operatória pode estreitar novamente o espaço e a sensibilização central já estabelecida frequentemente exige manutenção de analgesia neuropática {{ref:ref-park-2026}}.',
              tone: 'evidence',
            },
          ],
        },
      ],
    },

    chiariGabapentinoidesEFda2026:
      'Os ==gabapentinoides== constituem o pilar farmacológico da dor neuropática na síndrome de Chiari-like e siringomielia. Tanto a ==gabapentina== quanto a ==pregabalina== ligam-se à subunidade auxiliar ==α2δ dos canais de cálcio dependentes de voltagem== nos terminais pré-sinápticos, reduzindo o influxo de cálcio e a liberação de neurotransmissores excitatórios (glutamato, substância P e noradrenalina) nas vias nociceptivas espinhais — atenuando alodinia e hiperalgesia sem atuar como agonistas GABA in vivo.\n\n' +
      '- ==Gabapentina em cães (10–20 mg/kg VO q8–12h)==: opção inicial frequente em quadros leves a moderados. Possui boa biodisponibilidade oral (~80%, pico em 1–2 h), mas ==meia-vida curta em cães (2–4 h)==, razão pela qual intervalos a cada 8 horas oferecem cobertura analgésica mais estável do que a cada 12 horas. Cerca de 34% sofre metabolização hepática e o restante é eliminado pelos rins (exigindo cautela na doença renal; em gatos com DRC IRIS 2–3 ocorre acúmulo significativo). ==Alertas essenciais==: evitar estritamente soluções líquidas humanas contendo xilitol (~300 mg/mL — 0,33 mL/kg já atinge o limiar hipoglicêmico em cães); separar antiácidos com alumínio, magnésio ou cálcio por ≥ 2 horas (reduzem ~20% da absorção); desmamar gradualmente após uso prolongado.\n' +
      '- ==Pregabalina — evidência controlada e marco regulatório de 2026==: apresenta potência aproximadamente 5 vezes maior que a gabapentina, meia-vida mais longa (~6,9 h em cães; ~10,4 h em gatos), ligação proteica desprezível, metabolismo hepático mínimo e eliminação quase totalmente renal inalterada. É o fármaco com ==melhor evidência específica em ensaios clínicos randomizados para CM/SM==: Sanchis-Mora et al. (2019; n = 8) demonstraram redução significativa dos escores diários de dor (P = 0,006), menor hiperalgesia mecânica e menor alodinia/hiperalgesia ao frio (15 °C e 0 °C) com ~5 mg/kg q12h {{ref:ref-sanchis-mora-2019}}; e Thøfner et al. (2020; n = 12) observaram ==redução de 84% (IC 95%: 75–89%; P < 0,0001) nos episódios filmados de coceira fantasma== (porém com doses efetivas de ~13–19 mg/kg q12h, acompanhadas de aumento de apetite em 9/12 e ataxia transitória em 9/12 cães, levando à retirada de 1 animal) {{ref:ref-thofner-2020}}.\n' +
      '- ==Aprovação condicional FDA (12 de maio de 2026 — NADA 141-606)==: a FDA concedeu aprovação condicional ao ==Liavium-CA1== (comprimidos mastigáveis de pregabalina de 30, 90 e 180 mg) para controle de dor e sinais clínicos associados à CM/SM em cães, no regime de ==5–10 mg/kg VO a cada 12 horas com alimento== {{ref:ref-fda-2026}}. O comprimido de 90 mg pode ser partido ao meio; os de 30 e 180 mg não devem ser divididos, e ==cães abaixo de 3 kg não podem ser adequadamente dosados== com essa apresentação. O limite superior de 10 mg/kg q12h equilibra eficácia e tolerabilidade frente às doses mais altas testadas em 2020 (o estudo de segurança da FDA também documentou hipotermia e glicosúria normoglicêmica em múltiplas doses acima do teto). ==Ressalvas obrigatórias==: aprovação condicional exige confirmação adicional de eficácia plena, não equivale a registro automático no Brasil e ==não valida protocolo para gatos==.',

    chiariTabelaGabapentinaVsPregabalina: {
      kind: 'clinicalTable',
      caption: 'Tabela 8 — Comparação prática entre gabapentina e pregabalina em cães com CM/SM',
      headers: ['Característica', 'Gabapentina', 'Pregabalina'],
      rows: [
        ['Alvo farmacológico', 'Subunidade α2δ de canais de Ca²⁺ voltagem-dependentes', 'Subunidade α2δ (~5× mais potente)'],
        ['Evidência específica CM/SM', 'Experiência clínica e estudos observacionais (ex.: ter Maat 2025)', 'Ensaios clínicos randomizados controlados por placebo (2019, 2020, 2026) + aprovação condicional FDA 2026'],
        ['Dose oral canina de referência', '10–20 mg/kg VO', '5–10 mg/kg VO com alimento (regime condicional FDA 2026)'],
        ['Intervalo posológico típico', 'A cada 8–12 h (t½ curta ~2–4 h favorece q8h)', 'A cada 12 h (t½ ~6,9 h em cães)'],
        ['Efeitos adversos mais comuns', 'Sedação e ataxia (evitar solução líquida humana com xilitol)', 'Sedação, ataxia, aumento de apetite e alterações de atividade'],
        ['Eliminação e cautelas', 'Predominantemente renal (~34% metabolizada em cães); atenção na DRC', 'Quase exclusivamente renal inalterada; ajuste cauteloso na DRC; não é equivalente mg a mg à gabapentina'],
        ['Uso em gatos com CM/SM', 'Sem protocolo especificamente validado para CM/SM felina', 'Sem protocolo validado para CM/SM felina (não extrapolar automaticamente)'],
      ],
    },

    chiariAdjuvantesELcrEvidencia:
      '- ==Amitriptilina (1–2 mg/kg VO q12h em cães)==: antidepressivo tricíclico (metabólito ativo nortriptilina) que potencializa vias analgésicas descendentes noradrenérgicas e serotoninérgicas, com efeitos adicionais H1, α1 e anticolinérgicos. Requer administração contínua (pode levar semanas para efeito máximo, absorção favorecida com alimento) e ==desmame gradual em 2–3 semanas== ao suspender. No estudo retrospectivo de ter Maat et al. (2025) em 90 Pomeranians, a resposta relatada pelos tutores não diferiu estatisticamente entre amitriptilina e gabapentina (P = 0,65) {{ref:ref-ter-maat-2025}}. ==Cautelas críticas==: sedação, retenção urinária/constipação, redução do limiar convulsivo, queda de T3/T4/T4 livre (dosar tireoide basal antes se houver suspeita), cautela em cardiopatas (risco teórico de QTc/arritmias) e ==risco de síndrome serotoninérgica== se associada a tramadol, trazodona, ISRS, mirtazapina, ondansetrona ou IMAOs (selegilina/amitraz).\n' +
      '- ==AINEs==: úteis como adjuvantes quando há componente nociceptivo ou musculoesquelético cervical, porém frequentemente insuficientes como monoterapia na dor neuropática central; avaliar função renal, hidratação, trato gastrointestinal e ==jamais associar a corticoides sistêmicos==.\n' +
      '- ==Terapias direcionadas à dinâmica do LCR — por que evitar uso rotineiro?==:\n' +
      '  • *Omeprazol (0,5–1 mg/kg VO q24h histórico)*: a redução de produção de LCR foi observada em modelos experimentais por via IV ou ventriculocisternal, mas ==não foi confirmada após administração oral em cães saudáveis==; revisão de 2020 conclui que faltam evidências de benefício neurológico real {{ref:ref-in-practice-2020}}. Uso > 4 semanas exige desmame gradual (hipersecreção ácida rebote) e comprimidos/cápsulas não devem ser triturados.\n' +
      '  • *Furosemida (1 mg/kg VO q12h estudada em 2025)*: no estudo de ter Maat et al. (2025), adicionar furosemida à amitriptilina ou gabapentina ==não produziu melhora estatisticamente demonstrável==, mantendo riscos reais de hipovolemia, hipocalemia e azotemia pré-renal (sobretudo com AINEs) {{ref:ref-ter-maat-2025}}.\n' +
      '  • *Acetazolamida*: inibidor da anidrase carbônica sem dose validada para CM/SM (e ineficaz em cães com hidrocefalia comunicante); acarreta acidose metabólica hiperclorêmica, distúrbios eletrolíticos e alcalinização urinária que aumenta a concentração plasmática de amitriptilina.\n' +
      '- ==Outros adjuvantes em casos selecionados/refratários==: ==topiramato== (modulador de canais iônicos com fraca inibição de anidrase carbônica), ==amantadina== (antagonismo NMDA fraco contra sensibilização central), ==maropitant intermitente== (hipótese de bloqueio NK1/substância P sugerida por opinião especializada para crises pontuais de coceira fantasma, como no banho/tosa) e ==corticosteroides== (apenas em casos avançados/refratários na menor dose eficaz, cientes de que não previnem progressão da siringe e têm alta morbidade crônica) apresentam evidência específica limitada ou baseada em opinião de especialistas {{ref:ref-rusbridge-algorithm-2026}}.',

    chiariTabelaComparacaoTerapias: {
      kind: 'clinicalTable',
      caption: 'Tabela 9 — Síntese auditada das terapias farmacológicas publicadas para CM/SM canina',
      headers: ['Terapia', 'Regime canino publicado', 'Alvo principal', 'Evidência específica CM/SM', 'Monitoramento essencial'],
      rows: [
        ['Pregabalina', '5–10 mg/kg VO q12h com alimento (regime FDA 2026)', 'Dor neuropática e coceira fantasma', 'Moderada (ensaios randomizados pequenos + FDA condicional 2026)', 'Sedação, marcha/ataxia, apetite/peso, função renal'],
        ['Gabapentina', '10–20 mg/kg VO q8–12h', 'Dor neuropática', 'Baixa a moderada (observacional e experiência clínica)', 'Sedação, ataxia, função renal; vetar xilitol'],
        ['Amitriptilina', '1–2 mg/kg VO q12h', 'Adjuvante neuropático (vias descendentes)', 'Baixa (observacional 2025; sem superioridade vs. gabapentina)', 'ECG/cardiopatia, efeitos anticolinérgicos, interações serotoninérgicas'],
        ['AINEs', 'Conforme fármaco aprovado para a espécie', 'Dor nociceptiva/musculoesquelética concomitante', 'Limitada para monoterapia neuropática', 'Função renal, hidratação, trato GI; nunca associar a corticoide'],
        ['Omeprazol', '0,5–1 mg/kg VO q24h (regime histórico)', 'Hipótese de redução de LCR', 'Insuficiente para benefício neurológico oral', 'Tolerância GI, necessidade real e desmame se > 4 semanas'],
        ['Furosemida', '1 mg/kg VO q12h (estudada em 2025)', 'Hipótese de modificação de LCR', 'Benefício não demonstrado (ter Maat 2025)', 'Hidratação, potássio, função renal'],
        ['Acetazolamida', 'Sem dose CM/SM validada', 'Hipótese de inibição de anidrase carbônica', 'Muito baixa', 'Gasometria (acidose hiperclorêmica), eletrólitos, função renal'],
        ['Topiramato', 'Sem regime padronizado por ensaios robustos', 'Adjuvante neuromodulador refratário', 'Baixa (opinião especializada)', 'Sedação, ataxia, cognição e equilíbrio ácido-base'],
        ['Amantadina', 'Individualizada em dor crônica adjuvante', 'Sensibilização central (NMDA)', 'Muito baixa especificamente para CM/SM', 'Comportamento, sinais neurológicos e função renal'],
        ['Maropitant', 'Sem regime validado para phantom scratching', 'Hipótese de modulação NK1/substância P', 'Opinião especializada (uso intermitente)', 'Resposta clínica e tolerabilidade'],
        ['Corticosteroides', 'Menor dose eficaz em selecionados', 'Controle sintomático em casos avançados/refratários', 'Baixa (não modifica progressão estrutural)', 'Efeitos metabólicos, musculares, GI e infecciosos'],
      ],
    },

    chiariNeurocirurgiaDescompressaoEVps:
      'A neurocirurgia tem como alvo ==modificar a relação anatômica craniocervical e restaurar a dinâmica do LCR== — não "drenar ou remover a siringe diretamente". Deve ser discutida com neurologista/neurocirurgião diante de ==dor intensa refratária a terapia multimodal corretamente conduzida==, ==déficits neurológicos progressivos==, siringomielia em progressão clinicamente relevante ou grave comprometimento da qualidade de vida (lembrando que CM2 ou SM2 isolados na RM ==não== indicam cirurgia automaticamente).\n\n' +
      '- ==Descompressão do forame magno e cranioplastia com malha de titânio==: consiste em craniectomia occipital caudal (frequentemente associada a procedimentos sobre o atlas/meninges) para ampliar o espaço da fossa caudal. Como a formação de tecido cicatricial pós-operatório pode recomprimir a região, técnicas de ==cranioplastia com malha de titânio== foram desenvolvidas para manter o espaço aberto. Na série retrospectiva de ==Park et al. (2026)== com ==87 cães de raças pequenas== operados com malha de titânio sem polimetilmetacrilato (mantendo distância intencional entre o implante e a área descomprimida; mediana de seguimento de 35 meses), ==76/87 (87%)== apresentaram melhora clínica sustentada (redução subjetiva ≥ 50% de ao menos um sinal principal por ≥ 6 meses sem medicação contínua) e ==11/87 (13%)== tiveram recidiva parcial exigindo medicação, sem necessidade de revisão cirúrgica local {{ref:ref-park-2026}}. Apesar de promissora, a série é retrospectiva, unicêntrica e sem grupo controle.\n' +
      '- ==Derivação ventriculoperitoneal (VPS) em casos muito selecionados==: redireciona LCR ventricular para a cavidade peritoneal e ==não é cirurgia padrão== para a maioria dos cães com CM/SM. Em relato de caso de ==Fernandez Cid et al. (setembro de 2026)==, um Cavalier de 1 ano com ==ventriculomegalia importante e siringe extensa (odontoide a L5, largura máxima 7,0 mm)== refratário a gabapentina e meloxicam apresentou redução progressiva marcante da siringe e resolução dos sinais de dor após VPS (mantida aos 2 anos sem medicação, após pneumoencéfalo transitório e pequeno seroma) {{ref:ref-fernandez-cid-2026}}. Por se tratar de um único caso com ventriculomegalia marcante e pelos riscos próprios de derivações (infecção, obstrução, drenagem excessiva/insuficiente e revisão), não deve ser extrapolada à rotina geral.',

    chiariFiguraVpsFernandezCid2026: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/sindrome-chiari-like-caes-gatos/fig4-fernandez-cid-2026-vps-mri.webp',
      fallbackSrc: 'https://www.frontiersin.org/files/Articles/1946635/xml-images/fvets-13-1946635-g0002.webp',
      alt: 'Ressonância magnética cervical T2 sagital e transversal demonstrando regressão de siringe extensa após derivação ventriculoperitoneal em Cavalier King Charles Spaniel',
      shortCaption: 'Fig. 4 — RM T2 pré-VPS (A), inicial (B) e 6 meses pós-VPS (C) mostrando regressão da siringe (Fernandez Cid et al., 2026).',
      caption:
        'Figura 4 — Evolução por RM T2 sagital e transversal de um Cavalier King Charles Spaniel de 1 ano com malformação tipo Chiari, ventriculomegalia importante e siringe extensa (7,0 mm em C2–C3): antes da derivação ventriculoperitoneal (A, setas vermelhas), no seguimento inicial (B) e 6 meses após o procedimento (C, seta verde evidenciando redução acentuada da cavidade). Ilustra alternativa cirúrgica apenas para pacientes altamente selecionados com ventriculomegalia significativa. Fonte: Fernandez Cid A et al. (2026), *Frontiers in Veterinary Science*, 13:1946635, Figura 2 (DOI: 10.3389/fvets.2026.1946635). Licença: CC BY 4.0.',
      display: 'wide',
    },

    chiariTabelaClinicoVsCirurgico: {
      kind: 'clinicalTable',
      caption: 'Tabela 10 — Tratamento clínico versus neurocirurgia: comparação realista para decisão compartilhada',
      headers: ['Aspecto', 'Tratamento clínico multimodal', 'Tratamento neurocirúrgico'],
      rows: [
        ['Alvo principal', 'Circuitos de dor neuropática, inflamação nociceptiva e qualidade de vida', 'Descompressão anatômica craniocervical e melhora da passagem do LCR'],
        ['Invasividade e risco imediato', 'Menor; manejo ambulatorial', 'Maior; riscos anestésicos, neurológicos, cicatriciais, infecciosos ou de implante/shunt'],
        ['Correção da malformação', 'Não corrige a anatomia óssea', 'Correção anatômica parcial / ampliação do espaço caudal'],
        ['Efeito sobre a dor', 'Frequentemente substancial, porém individual', 'Variável; dor neuropática central estabelecida pode persistir exigindo medicação'],
        ['Efeito sobre a siringe', 'Sem redução estrutural consistentemente comprovada', 'Pode estabilizar ou reduzir em parte dos casos, mas nem sempre regride na RM'],
        ['Principal limitação', 'Controle incompleto, sedação/ataxia e custo contínuo', 'Recidiva por fibrose/cicatriz, persistência dolorosa e necessidade de centro especializado'],
      ],
    },

    chiariCasosClinicosAplicados:
      'A aplicação prática das recomendações varia drasticamente conforme o fenótipo:\n\n' +
      '- ==Caso A — Cavalier de 2 anos com vocalizações e coceira fantasma (sem paresia)==: exame dermatológico/otológico normais e propriocepção preservada, com piora ao andar de coleira. *Conduta*: a ausência de paresia não afasta SM sensitiva — indicar RM do encéfalo caudal e medula cervical (substituindo imediatamente a coleira por peitoral). Confirmando CM + siringe cervical coerente, iniciar terapia neuropática (gabapentina ou pregabalina), registrar vídeos/escore CHASE e acompanhar tolerabilidade.\n' +
      '- ==Caso B — Pomeranian de 6 anos com dor cervical e RM mostrando CM2 sem SM==: *Conduta*: não encerrar a investigação apenas pela presença de CM2 — revisar cuidadosamente discos cervicais, junção atlantoaxial e ouvido médio. Excluídos diferenciais e caracterizada ==CM-pain==, tratar o fenótipo doloroso (sem necessidade de fármacos voltados a "reduzir siringe inexistente") e reservar discussão cirúrgica apenas para refratariedade.\n' +
      '- ==Caso C — Cavalier de 4 anos com SM extensa e tetraparesia progressiva apesar de analgesia==: *Conduta*: revisar a RM para excluir extrusão discal cervical ou instabilidade concomitante, diferenciar cuidadosamente déficits proprioceptivos progressivos de ataxia induzida por pregabalina/gabapentina e encaminhar para discussão neurocirúrgica de descompressão, alinhando expectativas sobre eventual necessidade de analgesia residual.',
  },

  prevention: {
    chiariPrevencaoReprodutivaEManejoDomiciliar:
      'Não existe medicamento, suplemento nutricional ou dieta com eficácia comprovada para impedir o desenvolvimento da malformação óssea em cães geneticamente predispostos. A prevenção real concentra-se em ==seleção reprodutiva baseada em RM== e ==manejo protetor do cotidiano==:\n\n' +
      '- ==Triagem reprodutiva BVA / Royal Kennel Club==: como a siringomielia frequentemente surge ou progride com a idade, o programa oficial recomenda exames seriados em idades sucessivas (referências aproximadas: ~1 ano, 3–5 anos e > 5 anos) {{ref:ref-bva-scheme}} {{ref:ref-bva-breeding}}. Cães com sinais clínicos de CM/SM e cães jovens com siringomielia precoce (==SM2c==, entre 1 e 3 anos) ==não devem ser utilizados na reprodução==. A seleção contra conformações cranianas extremas, somada ao histórico familiar e à RM, é fundamental — lembrando que a RM não substitui um teste genético definitivo.\n' +
      '- ==Cuidados diários que reduzem gatilhos de dor==: trocar definitivamente coleiras de pescoço por ==peitorais ergonômicos== sem pressão cervical, elevar comedouros e bebedouros à altura confortável do tórax, controlar o peso corporal (evitando sobrecarga articular e facilitando manuseio), evitar saltos de móveis altos e preparar ambientes tranquilos para sono ininterrupto (e cuidados extras durante banho/tosa).\n' +
      '- ==Cuidados anestésicos preventivos==: informar sempre à equipe anestésica sobre a malformação craniocervical para evitar flexão/extensão cervical exagerada na intubação e realizar avaliação cardiológica prévia em Cavaliers (alta prevalência de doença valvar mitral).',
  },

  complications: {
    chiariMonitoramentoPrognosticoEControversias:
      'O seguimento clínico longitudinal deve priorizar ==funcionalidade e qualidade de vida== — e não apenas medidas isoladas na RM:\n\n' +
      '- ==Reavaliação prática (2–4 semanas após ajustes)==: monitorar frequência de vocalização, vídeos comparáveis de coceira fantasma, horas de sono ininterrupto, disposição para caminhar/brincar, exame de marcha/propriocepção, apetite/peso e função renal basal/seriada. O ==questionário CHASE (Valentino et al., 2026)== demonstrou alta consistência interna (α = 0,89) e sensibilidade/especificidade de 63%/76% (AUC 0,67) para uma queda ≥ 4 pontos na detecção de resposta à pregabalina — excelente instrumento de acompanhamento intrapaciente, mas não teste diagnóstico isolado {{ref:ref-valentino-2026}}.\n' +
      '- ==Como diferenciar progressão neurológica de ataxia por pregabalina/gabapentina==: avalie a ==relação temporal== e o exame neurológico. Incoordenação simétrica e sonolência surgindo logo após iniciar ou elevar a dose sugerem efeito adverso (não aumentar a dose automaticamente!); já perda progressiva de propriocepção, fraqueza assimétrica ou novos déficits focais apontam para progressão da siringe ou segunda doença (como hérnia de disco cervical).\n' +
      '- ==Quando repetir a RM==: não há obrigação de repetir RM em cães estáveis ou assintomáticos. Indique nova RM diante de surgimento/piora de déficits neurológicos, dor refratária apesar de ajuste terapêutico adequado, planejamento cirúrgico, suspeita de comorbidade aguda ou controle pós-operatório selecionado.\n' +
      '- ==Prognóstico realista e armadilha da dimensão da siringe==: como demonstraram Parker et al. (2011) e Thøfner et al. (2015), muitos cães com SM permanecem assintomáticos por anos, mas em casos sintomáticos graves a qualidade de vida pode deteriorar a ponto de motivar eutanásia (20% dos casos sintomáticos no seguimento dinamarquês) {{ref:ref-parker-2011}} {{ref:ref-thofner-2015}}. Além disso, o estudo CHASE (2026) não encontrou correlação significativa entre graus BVA e intensidade clínica da dor — ==uma siringe grande merece atenção, mas a dor sempre se mede no paciente== {{ref:ref-valentino-2026}}.\n' +
      '- ==Principais controvérsias atuais==: (1) ausência de consenso formal da ACVIM específico para tratamento completo de CM/SM até novembro de 2026 (guiando-se por BVA/Kennel Club, algoritmo especializado de Clare Rusbridge 2026 e ensaios clínicos recentes); (2) ausência de ensaio cabeça-a-cabeça definitivo provando superioridade universal da pregabalina sobre gabapentina para todo paciente (embora pregabalina tenha evidência controlada mais robusta); (3) siringes nem sempre diminuem após descompressão cirúrgica, e melhora clínica pode ocorrer com ou sem redução radiológica da cavidade.',

    chiariTabelaMonitoramentoClinico: {
      kind: 'clinicalTable',
      caption: 'Tabela 11 — Roteiro de monitoramento longitudinal em cães sob tratamento',
      headers: ['Parâmetro acompanhado', 'Método prático', 'Interpretação clínica'],
      rows: [
        ['Dor cervical e vocalização', 'Registro semanal de crises, gatilhos e questionário padronizado (CHASE)', 'Avalia controle real da dor e impacto na rotina.'],
        ['Coceira fantasma', 'Vídeos curtos do tutor em situações comparáveis (ex.: início do passeio)', 'Permite comparar objetivamente frequência e duração.'],
        ['Sono e atividade', 'Horas de repouso contínuo, disposição para caminhar/brincar', 'Indicadores sensíveis de qualidade de vida e conforto noturno.'],
        ['Marcha e propriocepção', 'Exame neurológico seriado e filmagens', 'Diferencia progressão de mielopatia de ataxia medicamentosa.'],
        ['Sedação, apetite e peso', 'Relação temporal pós-dose, pesagem e ECC', 'Essencial durante uso de pregabalina (polifagia/ataxia) e amitriptilina.'],
        ['Função renal', 'Ureia, creatinina e exames complementares conforme protocolo', 'Fundamental para gabapentina, pregabalina, AINEs e diuréticos.'],
        ['RM seriada', 'Reservada a casos selecionados (piora, refratariedade ou pré/pós-cirurgia)', 'Ponderar benefício real sobre a conduta versus risco anestésico.'],
      ],
    },

    chiariTabelaPrognosticoPorFenotipo: {
      kind: 'clinicalTable',
      caption: 'Tabela 12 — Prognóstico esperado por fenótipo clínico e principais incertezas',
      headers: ['Fenótipo clínico', 'Prognóstico esperado', 'Principal incerteza'],
      rows: [
        ['CM assintomática', 'Pode permanecer livre de sinais clínicos por toda a vida', 'Risco de desenvolvimento tardio de dor ou SM com a idade.'],
        ['CM dolorosa sem SM (CM-pain)', 'Muitos cães atingem bom controle com manejo multimodal', 'Atribuição causal da dor e persistência de fatores anatômicos.'],
        ['SM pequena assintomática', 'Frequentemente permanece estável por anos', 'Possibilidade de expansão com o envelhecimento.'],
        ['SM dolorosa sem déficits locomotores', 'Controle farmacológico pode proporcionar boa qualidade de vida', 'Variabilidade individual de resposta e efeitos adversos de longo prazo.'],
        ['SM com mielopatia progressiva', 'Mais reservado', 'Grau de lesão axonal irreversível e velocidade de progressão.'],
        ['CM/SM refratária operada', 'Melhora clínica possível e frequentemente expressiva (87% na série Park 2026)', 'Cicatrização local, recidiva tardia e persistência de dor neuropática.'],
      ],
    },

    chiariTabelaEmergenciasEUti: {
      kind: 'clinicalTable',
      caption: 'Tabela 13 — Sinais de alarme e complicações que exigem avaliação urgente / UTI',
      headers: ['Apresentação de urgência', 'Suspeita principal', 'Conduta imediata'],
      rows: [
        ['Paresia aguda ou perda súbita de deambulação', 'Hérnia de disco cervical (DDIV), instabilidade atlantoaxial ou mielopatia aguda (nunca presumir apenas CM prévia)', 'Exame neurológico, restrição estrita de movimento cervical e imagem de urgência.'],
        ['Dor cervical intensa e intratável', 'Descompensação aguda da dor neuropática ou outra afecção cervical', 'Analgesia segura imediata, revisão neurológica e exclusão de DDIV/meningite/discospondilite.'],
        ['Alteração de consciência ou sinais de tronco encefálico', 'Lesão intracraniana concorrente, hidrocefalia descompensada ou siringobulbia grave', 'Estabilização ABC e avaliação neurocrítica especializada.'],
        ['Piora neurológica após neurocirurgia', 'Edema, hematoma, compressão aguda, infecção ou falha de implante', 'Reavaliação neurocirúrgica imediata e imagem pós-operatória.'],
        ['Febre e dor intensa pós-cirurgia', 'Infecção de sítio cirúrgico ou meningite bacteriana', 'Investigação infecciosa urgente e reavaliação especializada.'],
        ['Deterioração progressiva após derivação (VPS)', 'Obstrução, infecção, deslocamento ou hiper/hipodrenagem do shunt', 'Avaliação imediata do sistema de derivação e neuroimagem.'],
      ],
    },
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'doenca-do-disco-intervertebral-caes',
    'doenca-do-disco-intervertebral-gatos',
    'neoplasias-intracranianas-caes',
    'discinesia-paroxistica-caes-gatos',
    'doenca-valvar-mitral-degenerativa-caes',
  ],
  relatedMedicationSlugs: [
    'gabapentina',
    'amitriptilina',
    'amantadina',
    'meloxicam',
    'maropitant',
    'prednisolona',
    'tramadol',
  ],

  references: [
    {
      id: 'ref-rusbridge-2018',
      authors: 'Rusbridge C, Stringer F, Knowler SP',
      title: 'Clinical Application of Diagnostic Imaging of Chiari-Like Malformation and Syringomyelia (incl. Figuras 8 e 9, CC BY 4.0)',
      journal: 'Frontiers in Veterinary Science',
      year: 2018,
      volume: '5',
      pages: '280',
      doi: '10.3389/fvets.2018.00280',
      url: 'https://doi.org/10.3389/fvets.2018.00280',
      sourceType: 'Revisão de referência em neuroimagem (CC BY 4.0)',
    },
    {
      id: 'ref-in-practice-2020',
      authors: 'Rusbridge C',
      title: 'New considerations about Chiari-like malformation, syringomyelia and their management',
      journal: 'In Practice',
      year: 2020,
      doi: '10.1136/inp.m1869',
      url: 'https://doi.org/10.1136/inp.m1869',
      sourceType: 'Revisão clínica especializada',
    },
    {
      id: 'ref-bva-scheme',
      authors: 'British Veterinary Association (BVA) / Royal Kennel Club',
      title: 'Chiari malformation and syringomyelia (CM/SM) screening scheme',
      journal: 'BVA Canine Health Schemes',
      url: 'https://www.bva.co.uk/canine-health-schemes/cmsm-scheme/',
      sourceType: 'Programa oficial de triagem por RM',
    },
    {
      id: 'ref-bva-breeding',
      authors: 'British Veterinary Association (BVA) / Kennel Club',
      title: 'Breeding recommendations for Chiari malformation/syringomyelia',
      journal: 'BVA / Kennel Club',
      url: 'https://www.bva.co.uk/media/2803/cm-sm_breeding_recommendations-1-5.pdf',
      sourceType: 'Diretriz reprodutiva oficial',
    },
    {
      id: 'ref-rusbridge-algorithm-2026',
      authors: 'Rusbridge C',
      title: 'Canine Chiari and Syringomyelia Treatment Algorithm 2026',
      journal: 'CanineChiari.com',
      year: 2026,
      url: 'https://caninechiari.com/treatmentAlgorithm',
      sourceType: 'Algoritmo clínico de especialista (2026)',
    },
    {
      id: 'ref-fda-2026',
      authors: 'U.S. Food and Drug Administration (FDA)',
      title: 'FDA Conditionally Approves Drug (Liavium-CA1 / pregabalin chewable tablets, NADA 141-606) to Control Pain and Clinical Signs of Chiari-Like Malformation and Syringomyelia in Dogs (12 maio 2026)',
      journal: 'FDA Center for Veterinary Medicine',
      year: 2026,
      url: 'https://www.fda.gov/animal-veterinary/cvm-updates/fda-conditionally-approves-drug-control-pain-and-clinical-signs-chiari-malformation-and',
      sourceType: 'Documento regulatório oficial (FDA 2026)',
    },
    {
      id: 'ref-ancot-2018',
      authors: 'Ancot F, Lemay P, Knowler SP, Kennedy K, Griffiths S, Cherubini GB, et al.',
      title: 'A genome-wide association study identifies candidate loci associated to syringomyelia secondary to Chiari-like malformation in Cavalier King Charles Spaniels',
      journal: 'BMC Genetics',
      year: 2018,
      volume: '19',
      pages: '16',
      doi: '10.1186/s12863-018-0605-z',
      url: 'https://doi.org/10.1186/s12863-018-0605-z',
      sourceType: 'Estudo genômico (GWAS)',
    },
    {
      id: 'ref-parker-2011',
      authors: 'Parker JE, Knowler SP, Rusbridge C, Noorman E, Jeffery ND',
      title: 'Prevalence of asymptomatic syringomyelia in Cavalier King Charles spaniels',
      journal: 'Veterinary Record',
      year: 2011,
      volume: '168',
      pages: '667',
      doi: '10.1136/vr.d1726',
      url: 'https://doi.org/10.1136/vr.d1726',
      sourceType: 'Estudo transversal (n = 555 Cavaliers)',
    },
    {
      id: 'ref-thofner-2015',
      authors: 'Thøfner MS, Stougaard CL, Westrup U, Madry AA, Knudsen CS, Berg H, et al.',
      title: 'Prevalence and Heritability of Symptomatic Syringomyelia in Cavalier King Charles Spaniels and Long-term Outcome in Symptomatic and Asymptomatic Littermates',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2015,
      volume: '29',
      pages: '243–250',
      doi: '10.1111/jvim.12475',
      url: 'https://doi.org/10.1111/jvim.12475',
      sourceType: 'Coorte epidemiológica e herdabilidade (n = 240)',
    },
    {
      id: 'ref-sanchis-mora-2019',
      authors: 'Sanchis-Mora S, Chang YM, Abeyesinghe SM, Fisher A, Upton N, Volk HA, Pelligand L',
      title: 'Pregabalin for the treatment of syringomyelia-associated neuropathic pain in dogs: A randomised, placebo-controlled, double-masked clinical trial',
      journal: 'The Veterinary Journal',
      year: 2019,
      volume: '250',
      pages: '55–62',
      doi: '10.1016/j.tvjl.2019.06.006',
      url: 'https://doi.org/10.1016/j.tvjl.2019.06.006',
      sourceType: 'Ensaio clínico randomizado duplo-cego (pregabalina)',
    },
    {
      id: 'ref-thofner-2020',
      authors: 'Thøfner MS, Hvidt L, Kjærulff L, Berendt M, et al.',
      title: 'Pregabalin alleviates clinical signs of syringomyelia-related central neuropathic pain in Cavalier King Charles Spaniel dogs: a randomized controlled trial',
      journal: 'Veterinary Anaesthesia and Analgesia',
      year: 2020,
      volume: '47',
      pages: '238–248',
      doi: '10.1016/j.vaa.2019.09.007',
      url: 'https://doi.org/10.1016/j.vaa.2019.09.007',
      sourceType: 'Ensaio clínico randomizado cruzado (n = 12)',
    },
    {
      id: 'ref-animals-dti-2022',
      authors: 'Animals (MDPI)',
      title: 'Diffusion Tensor Imaging in Syringomyelia Secondary to Chiari Malformation in Cavalier King Charles Spaniel—A Preliminary Study (incl. Figura 1, CC BY 4.0)',
      journal: 'Animals',
      year: 2022,
      volume: '12',
      pages: '3405',
      doi: '10.3390/ani12233405',
      url: 'https://doi.org/10.3390/ani12233405',
      sourceType: 'Estudo de neuroimagem (CC BY 4.0 · Fig. 3)',
    },
    {
      id: 'ref-ter-maat-2025',
      authors: 'ter Maat R, Santifort KM, Mandigers PJJ, et al.',
      title: 'The Effectiveness of Amitriptyline and Gabapentin in Treating Pomeranians with Chiari-like Malformation and/or Syringomyelia',
      journal: 'Animals',
      year: 2025,
      volume: '15',
      pages: '992',
      doi: '10.3390/ani15070992',
      url: 'https://doi.org/10.3390/ani15070992',
      sourceType: 'Estudo observacional retrospectivo (n = 90 Pomeranians)',
    },
    {
      id: 'ref-valentino-2026',
      authors: 'Valentino A, et al.',
      title: 'Development and validation of the Chiari-like malformation and syringomyelia evaluation: the CHASE questionnaire',
      journal: 'Journal of Veterinary Internal Medicine',
      year: 2026,
      volume: '40',
      pages: 'aalaf040',
      doi: '10.1093/jvimsj/aalaf040',
      url: 'https://doi.org/10.1093/jvimsj/aalaf040',
      sourceType: 'Validação clínica + ensaio randomizado (CHASE 2026)',
    },
    {
      id: 'ref-park-2026',
      authors: 'Park SS, et al.',
      title: 'Outcomes of 87 small-breed dogs surgically treated for Chiari-like malformation and syringomyelia',
      journal: 'Veterinary Surgery',
      year: 2026,
      volume: '55',
      pages: '929–941',
      doi: '10.1111/vsu.70062',
      url: 'https://doi.org/10.1111/vsu.70062',
      sourceType: 'Série cirúrgica retrospectiva (n = 87 · cranioplastia de titânio)',
    },
    {
      id: 'ref-fernandez-cid-2026',
      authors: 'Fernandez Cid A, et al.',
      title: 'Case Report: Ventriculoperitoneal shunt for management of syringomyelia and Chiari-like malformation in a Cavalier King Charles Spaniel (incl. Figura 2, CC BY 4.0)',
      journal: 'Frontiers in Veterinary Science',
      year: 2026,
      volume: '13',
      pages: '1946635',
      doi: '10.3389/fvets.2026.1946635',
      url: 'https://doi.org/10.3389/fvets.2026.1946635',
      sourceType: 'Relato de caso neurocirúrgico (CC BY 4.0 · Fig. 4)',
    },
    {
      id: 'ref-minato-2018',
      authors: 'Minato S, Baroni M',
      title: 'Chiari-like malformation in two cats',
      journal: 'Journal of Small Animal Practice',
      year: 2018,
      volume: '59',
      pages: '578–582',
      doi: '10.1111/jsap.12768',
      url: 'https://doi.org/10.1111/jsap.12768',
      sourceType: 'Relato de casos felinos (n = 2)',
    },
    {
      id: 'ref-nelson-couto-6ed-ch65',
      authors: 'Nelson RW, Couto CG',
      title: 'Small Animal Internal Medicine (6th Edition) — Cap. 65: Disorders of the Spinal Cord (seção Syringomyelia/Hydromyelia)',
      journal: 'Elsevier',
      year: 2020,
      pages: 'p. 1155',
      sourceType: 'Livro-texto de referência (acervo local)',
    },
    {
      id: 'ref-plumbs-10ed-neuro',
      authors: 'Budde JA, McCluskey DM',
      title: "Plumb's Veterinary Drug Handbook (10th Edition) — Monografias de Gabapentin (pp. 568–570), Pregabalin (pp. 1064–1065), Amitriptyline (pp. 58–61), Omeprazole (pp. 953–955) e Acetazolamide (pp. 9–11)",
      journal: 'Wiley-Blackwell',
      year: 2023,
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-bsava-10ed',
      authors: 'Allerton F (ed.)',
      title: 'BSAVA Small Animal Formulary, Part A: Canine and Feline (10th Edition) — Monografias de fármacos neuromoduladores e adjuvantes',
      journal: 'BSAVA',
      year: 2020,
      sourceType: 'Formulário veterinário de referência (acervo local)',
    },
    {
      id: 'ref-dewey-dacosta-3ed',
      authors: 'Dewey CW, da Costa RC (eds.)',
      title: 'Practical Guide to Canine and Feline Neurology (3rd Edition) — Chiari-like Malformation and Syringomyelia',
      journal: 'Wiley-Blackwell',
      year: 2016,
      sourceType: 'Livro-texto de neurologia (acervo local)',
    },
    {
      id: 'ref-delahunta-5ed',
      authors: 'de Lahunta A, Glass E, Kent M',
      title: "de Lahunta's Veterinary Neuroanatomy and Clinical Neurology (5th Edition) — Neuroanatomia cervical e vias somatossensoriais",
      journal: 'Elsevier',
      year: 2021,
      sourceType: 'Livro-texto de neuroanatomia (acervo local)',
    },
    {
      id: 'ref-macintire-ecc-2ed',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd Edition) — Neurological Emergencies',
      journal: 'Wiley-Blackwell',
      year: 2012,
      sourceType: 'Livro-texto de emergência (acervo local)',
    },
  ],
};
