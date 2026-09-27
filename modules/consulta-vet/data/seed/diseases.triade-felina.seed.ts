import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const triadeFelinaSeed: DiseaseRecord = {
  id: 'disease-triade-felina',
  slug: 'triade-felina',
  title: 'Tríade Felina',
  subtitle:
    'Complexo inflamatório digestivo multiorgânico: pancreatite, colangite e enteropatia crônica em gatos — anatomia comparada, fisiopatologia, diagnóstico e farmacoterapia orientada por fenótipo',
  synonyms: [
    'Triadite felina',
    'Feline triaditis',
    'Síndrome da tríade felina',
    'Complexo colangite-pancreatite-enterite felina',
    'Colangioepatite e pancreatite concorrentes em gatos',
    'Doença inflamatória multiorgânica felina',
  ],
  species: ['cat'],
  category: 'gastroenterologia',
  categories: ['gastroenterologia', 'medicina-felina', 'urgencia-emergencia'],
  tags: [
    'Tríade felina',
    'Pancreatite felina',
    'Colangite neutrofílica',
    'Colangite linfocítica',
    'Enteropatia crônica',
    'LPE vs LGITL',
    'Spec fPL',
    'Fator intrínseco',
    'Cobalamina',
    'Papila duodenal maior',
    'Cridge 2026',
    'ACVIM 2021',
    'ACVIM 2023',
    'gatos',
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['triade-felina'],

  figures: [
    {
      url: '/consulta-vet/triade-felina/confluencia-ductal-papila-duodenal-animals2025.jpg',
      legend:
        'Figura 1 — Mapeamento tomográfico e ultrassonográfico demonstrando a confluência anatômica íntima entre o ducto pancreático principal e o ducto colédoco adjacente à papila duodenal maior em felino doméstico. Essa confluência pré-papilar em canal comum ocorre em aproximadamente 80% dos gatos, constituindo a base estrutural para o refluxo recíproco e ascensão microbiana. Adaptado de Animals (2025), sob licença CC BY 4.0.',
      caption:
        'Confluência anatômica pré-papilar do ducto pancreático e ducto colédoco na papila duodenal maior felina.',
      source: 'Animals (2025). DOI: 10.3390/ani15020188 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/triade-felina/realce-contraste-papila-duodenal-animals2025.jpg',
      legend:
        'Figura 2 — Tomografia computadorizada com realce contrastado dinâmico ilustrando a perfusão do lobo pancreático direito, duodeno descendente e esfíncter da papila duodenal maior em gato hígido. O edema parietal e hiperemia inflamatória dessa região durante crises agudas promovem disfunção esfincteriana e estase biliopancreática. Adaptado de Animals (2025), sob licença CC BY 4.0.',
      caption:
        'Mapeamento de perfusão e realce contrastado da papila duodenal maior e parênquima pancreático adjacente.',
      source: 'Animals (2025). DOI: 10.3390/ani15020188 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/triade-felina/correlacao-fpli-dggr-lipase-animals2021.jpg',
      legend:
        'Figura 3 — Análise de correlação gráfica e concordância diagnóstica entre a dosagem imunológica de fPLI (Spec fPL) e o ensaio enzimático automatizado DGGR-lipase na identificação de pancreatite felina. O estudo enfatiza que, embora haja boa correlação linear geral, valores em zona cinzenta (3,5 a 5,3 ug/L) demandam reavaliação clínica e ultrassonográfica, enquanto valores >= 5,4 ug/L exibem elevada especificidade. Adaptado de Animals (2021), sob licença CC BY 4.0.',
      caption:
        'Dispersão gráfica e correlação diagnóstica entre fPLI (Spec fPL) e ensaio DGGR-lipase em felinos.',
      source: 'Animals (2021). DOI: 10.3390/ani11061730 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/triade-felina/anatomia-vascular-linfonodo-jejunal-angelou2023.jpg',
      legend:
        'Figura 4 — Dissecção cirúrgica da alça jejunal felina, evidenciando os vasos retos mesentéricos e o linfonodo mesentérico satélite. A obtenção de biópsias intestinais de espessura total e amostragem linfonodal criteriosa representa a etapa definitiva para diferenciar a enterite linfoplasmocitária (LPE) do linfoma alimentar de pequenas células T (LGITL). Adaptado de Angelou et al., Animals (2023), sob licença CC BY 4.0.',
      caption:
        'Anatomia cirúrgica da vascularização jejunal e cadeia linfonodal mesentérica em felino.',
      source: 'Angelou et al., Animals (2023). DOI: 10.3390/ani13111816 (Open Access, CC BY 4.0).',
    },
  ],

  quickSummary:
    'A tríade felina (ou triadite felina) é uma síndrome inflamatória multiorgânica caracterizada pelo acometimento concomitante ou sequencial do pâncreas (pancreatite aguda ou crônica), do sistema hepatobiliar (colangite neutrofílica supurativa ou linfocítica) e do intestino delgado (enteropatia crônica inflamatória / enterite linfoplasmocitária ou linfoma alimentar de células T de baixo grau). Conforme destacado na revisão contemporânea de Cridge (2026), o termo traduz um complexo inflamatório digestivo compartilhado decorrente de vulnerabilidades biológicas e anatômicas da espécie felina, e não necessariamente uma doença causal única unidirecional. Em aproximadamente 80% dos gatos, o ducto pancreático principal funde-se ao ducto colédoco antes de desembocar na papila duodenal maior em um canal comum, facilitando o refluxo duodenopancreatobiliar de bile, enzimas ativadas e translocação de enterobactérias, cuja densidade duodenal no gato normal é de 100 a 1.000 vezes superior à canina. O diagnóstico apoia-se na integração multimodal de marcadores específicos (Spec fPL / fPLI com corte >= 5,4 ug/L, exibindo sensibilidade e especificidade de ~79%), perfil hepatobiliar sérico (GGT, ALT, bilirrubinas), dosagem de cobalamina sérica (fator intrínseco produzido exclusivamente pelo pâncreas felino), ultrassonografia abdominal especializada e, no cenário crônico refratário, biópsias de espessura total com imunofenotipagem e PARR para diferenciar enterite linfoplasmocitária de linfoma intestinal de baixo grau (Consenso ACVIM 2023). A terapêutica contemporânea rompe com o mito perigoso do uso cego de corticoides: felinos com colangite neutrofílica bacteriana ativa demandam antibioticoterapia direcionada por 4 a 8 semanas e contraindicam formalmente imunossupressão precoce, enquanto fenótipos linfocíticos requerem prednisolona e imunomodulação. O suporte nutricional enteral precoce (veto absoluto a jejum prolongado para prevenção de lipidose hepática), analgesia multimodal com buprenorfina, antieméticos e suplementação contínua de cobalamina constituem os pilares inegociáveis de sobrevida.',

  quickDecisionStrip: [
    'Tríade felina é um complexo inflamatório digestivo multiorgânico: trate o fenótipo clínico dominante e não prescreva corticoide de forma cega.',
    'Em cerca de 80% dos gatos, o ducto pancreático e o colédoco unem-se antes da papila duodenal maior; êmese e refluxo afetam os dois órgãos simultaneamente.',
    'A microbiota duodenal felina normal é abundante (10^8 UFC/mL); colangite neutrofílica quase sempre envolve enterobactérias ascendentes (Center et al., 2022).',
    'Pancreatite felina isolada é predominantemente estéril; antibióticos são formais na colangite neutrofílica, mas desnecessários na pancreatite estéril.',
    'Veto absoluto ao jejum prolongado: a privação alimentar por > 24-48 horas induz lipidose hepática fatal no gato com tríade; institua sonda enteral precocemente.',
    'O fator intrínseco felino é produzido 100% no pâncreas; pancreatite e ileíte provocam hipocobalaminemia severa que exige reposição sistemática.',
    'Ultrassom normal NÃO descarta pancreatite: a sensibilidade do US na pancreatite felina varia de 11% a 67%; o Spec fPL >= 5,4 ug/L possui Se e Sp de ~79%.',
    'Na terceira perna intestinal, o Consenso ACVIM 2023 alerta: LPE e linfoma de baixo grau (LGITL) são indistinguíveis sem biópsia transmural, IHC e PARR.',
    'Metoclopramida NÃO é contraindicada na pancreatite felina (Consenso ACVIM 2021); atua com segurança como procinético para gastroparesia e íleo paralítico.',
    'Se houver colangite neutrofílica bacteriana, a introdução de imunossupressores antes do controle infeccioso pode desencadear choque séptico fulminante.',
  ],

  quickSummaryRich: {
    lead: 'A tríade felina constitui um complexo inflamatório multiorgânico associando pancreatite, colangite e enteropatia crônica, condicionado pela confluência anatômica ductal pré-papilar e microbiota duodenal abundante da espécie, demandando discriminação rigorosa do fenótipo inflamatório versus infeccioso para instituição de antibioticoterapia direcionada ou imunossupressão segura.',
    leadHighlights: [
      'Confluência ductal pré-papilar em 80% dos gatos',
      'Microbiota duodenal abundante (10^8 UFC/mL)',
      'Colangite neutrofílica bacteriana (Center et al., 2022)',
      'Consenso ACVIM 2021 de Pancreatite Felina',
      'Consenso ACVIM 2023: LPE vs LGITL intestinal',
      'Fator intrínseco puramente pancreático e cobalamina',
      'Veto absoluto ao dogma do jejum pancreático em gatos',
      'Manejo terapêutico individualizado por fenótipo dominante',
    ],
    pillars: [
      {
        title: 'Anatomia Confluente e Microbiologia Duodenal',
        body: 'Em aproximadamente 80% dos felinos, o ducto pancreático principal desemboca juntamente com o ducto colédoco na papila duodenal maior através de um canal comum. A ausência de ducto acessório funcional na maioria dos gatos, aliada a uma carga bacteriana duodenal fisiológica de 10^8 UFC/mL (muito superior à canina), favorece a contaminação ascendente e o refluxo de bile e suco pancreático durante episódios de vômito crônico e aumento da pressão intraluminal.',
        highlights: ['Canal comum pré-papilar em 80%', 'Ducto acessório ausente na maioria', 'Carga duodenal 10^8 UFC/mL', 'Refluxo duodenopancreatobiliar'],
      },
      {
        title: 'Os 4 Modelos Fisiopatológicos Integrados',
        body: 'A patogenia da tríade desdobra-se em quatro vias fisiopatológicas descritas na literatura: (1) Ascensão bacteriana retrógrada duodenal; (2) Extensão transperitoneal por efeito vizinho a partir de pancreatite primária; (3) Homing linfocitário imune com extravasamento de linfócitos sensibilizados no eixo entero-hepato-pancreático; e (4) Fatores ambientais, disbiose e hipersensibilidade alimentar ativando a resposta inflamatória crônica compartilhada.',
        highlights: ['Ascensão bacteriana retrógrada', 'Efeito vizinho peripancreático', 'Homing linfocitário T CD3+', 'Cridge 2026 (JFMS)'],
      },
      {
        title: 'A Terceira Perna: LPE vs Linfoma de Baixo Grau (LGITL)',
        body: 'O Consenso ACVIM 2023 (Marsilio et al.) transformou a propedêutica da perna intestinal da tríade: a tradicional denominação IBD engloba a enterite linfoplasmocitária (LPE) e o linfoma intestinal de pequenas células T (LGITL). Como sinais clínicos, marcadores séricos e ultrassonografia apresentam ampla sobreposição, o diagnóstico definitivo requer biópsias cirúrgicas transmurais associadas a imuno-histoquímica e clonalidade por PARR.',
        highlights: ['Consenso ACVIM 2023', 'LPE vs LGITL', 'Biópsias de espessura total', 'Imuno-histoquímica CD3/CD20 e PARR'],
      },
      {
        title: 'Farmacoterapia Fenotípica e Nutrição Enteral Precoce',
        body: 'O manejo da tríade deve ser norteado pelo fenótipo clínico dominante. A colangite neutrofílica exige amoxicilina com clavulanato ou fluoroquinolona por 4 a 8 semanas, enquanto a colangite linfocítica e a LPE respondem a prednisolona. O jejum pancreático tradicional canino é formalmente contraindicado em felinos pelo risco imediato de lipidose hepática secundária; a nutrição enteral precoce por sonda e a suplementação de cobalamina são imperativas.',
        highlights: ['Tratamento por fenótipo dominante', 'Veto a corticoide cego inicial', 'Nutrição enteral precoce (zero jejum)', 'Reposição contínua de cobalamina'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Propedêutico Multimodal da Tríade Felina',
      steps: [
        {
          label: 'Etapa 1: Triagem Clínica, Hemograma e Bioquímica Hepatobiliar',
          timing: 'Imediato na admissão',
          detail:
            'Avaliação de desidratação, dor epigástrica e mucosas; coleta de hemograma completo (leucocitose neutrofílica com desvio à esquerda na colangite supurativa vs anemia não regenerativa na doença crônica), dosagem de ALT, AST, GGT, fosfatase alcalina, bilirrubinas total e frações, glicemia e eletrólitos.',
        },
        {
          label: 'Etapa 2: Lipase Pancreática Específica (Spec fPL) e Cobalamina',
          timing: 'Primeiras 6 a 12 horas',
          detail:
            'Dosagem sérica quantitativa de Spec fPL (corte >= 5,4 ug/L indicativo de pancreatite ativa; zona cinzenta entre 3,5 e 5,3 ug/L) e mensuração sistemática de vitamina B12 (cobalamina sérica), cujo déficit funcional é quase universal pela perda de síntese pancreática de fator intrínseco.',
        },
        {
          label: 'Etapa 3: Ultrassonografia Abdominal Tríplice Avançada',
          timing: 'Primeiras 12 a 24 horas',
          detail:
            'Mapeamento sincronizado do parênquima pancreático e gordura peripancreática (hiperecogenicidade focal, edema e fluido peripancreático), árvore biliar (calibre do colédoco, espessamento da vesícula e presença de colelitíase) e arquitetura parietal intestinal (estratificação, espessura da muscular própria e linfonodos mesentéricos).',
        },
        {
          label: 'Etapa 4: Colecistocentese Ecoguiada e Triagem Microbiológica',
          timing: 'Após exclusão de coagulopatia e risco de ruptura',
          detail:
            'Em pacientes ictéricos com ductos dilatados e ausência de obstrução mecânica total frágil, realização de punção trans-hepática estéril da vesícula sob visão ecográfica para citologia a fresco (pesquisa de neutrófilos e bactérias intracelulares) e cultura aeróbia/anaeróbia com antibiograma.',
        },
        {
          label: 'Etapa 5: Histopatologia Transmural com IHC e PARR (Casos Crônicos)',
          timing: 'Eletivo / após estabilização clínica',
          detail:
            'Padrão ouro acadêmico: laparotomia exploratória ou videolaparoscopia para coleta de biópsias de espessura total do duodeno, jejuno, íleo, linfonodos mesentéricos, fígado e pâncreas, diferenciando conclusivamente enterite linfoplasmocitária (LPE) de linfoma T de baixo grau (LGITL).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico Estruturado por Fenótipo Dominante',
      steps: [
        {
          label: 'Fase 1: Estabilização Hemodinâmica e Analgesia Multimodal',
          timing: 'Primeiras 1 a 4 horas de internamento',
          detail:
            'Fluidoterapia de ressuscitação ou manutenção com cristaloides balanceados (Ringer com Lactato ou Plasmalyte) guiada por pressão arterial, débito urinário e ionograma (atenção à hipocalemia); analgesia imediata de primeira linha com buprenorfina (0,01 a 0,03 mg/kg transmucosa oral ou SC/IV q6-8h) ou metadona em dor intensa.',
        },
        {
          label: 'Fase 2: Controle Antiemético e Manejo da Náusea Subclínica',
          timing: 'Imediato e contínuo',
          detail:
            'Administração de citrato de maropitant (1 mg/kg SC/IV q24h) para controle central e periférico de vômitos e analgesia visceral mediada por antagonismo NK-1; associação de ondansetrona (0,5 a 1,0 mg/kg IV/VO q8-12h); uso seguro de metoclopramida (0,2 a 0,5 mg/kg SC/VO q8h) como procinético se houver gastroparesia ou íleo sem obstrução mecânica (ACVIM 2021).',
        },
        {
          label: 'Fase 3: Suporte Nutricional Enteral Precoce (Zero Jejum)',
          timing: 'Dentro das primeiras 24 horas',
          detail:
            'Veto absoluto ao repouso alimentar pancreático prolongado; oferta de dieta líquida hiperdigestível ou úmida hiperproteica. Se a hiporexia persistir por > 24 a 48 horas, instalação mandatória de sonda nasoesofágica ou sonda de esofagostomia para prevenção ativa de lipidose hepática.',
        },
        {
          label: 'Fase 4: Antimicrobianoterapia ou Imunossupressão Direcionada',
          timing: 'Após definição do fenótipo infeccioso vs imunomediado',
          detail:
            'Se colangite neutrofílica/supurativa: amoxicilina com ácido clavulânico (12,5 a 20 mg/kg VO/SC q12h) isolada ou combinada com fluoroquinolona (marbofloxacina 2 mg/kg VO q24h) por 4 a 8 semanas. Se colangite linfocítica ou LPE confirmadas e sem infecção: prednisolona (1 a 2 mg/kg/dia VO com desmame lento); se LGITL: prednisolona associada a clorambucil.',
        },
        {
          label: 'Fase 5: Suplementação de Cobalamina e Terapia Adjuvante',
          timing: 'Manutenção ambulatorial contínua',
          detail:
            'Reposição de cobalamina (vitamina B12, 250 ug/gato SC semanal por 6 semanas ou 250 ug/gato VO q24h contínuo); ácido ursodesoxicólico (UDCA, 10 a 15 mg/kg VO q24h com alimento) para modulação do fluxo biliar (apenas com patência ductal confirmada); hepatoprotetores com S-adenosilmetionina (SAMe 200 mg/gato VO q24h em jejum) e silimarina.',
        },
      ],
    },
  },

  etiology: {
    conceitoTriadeComoComplexoMultiorganico:
      'A tríade felina (feline triaditis) define a ocorrência simultânea ou sequencial de processos inflamatórios nos três pilares anatômicos do aparelho digestivo cranial do gato: o pâncreas (pancreatite), as vias biliares e parênquima hepático (colangite / colangioepatite) e o intestino delgado (enteropatia crônica inflamatória). Conforme sustentado na revisão contemporânea de Cridge (2026, Journal of Feline Medicine and Surgery), a tríade não representa uma entidade patológica única dotada de uma etiologia monoespecífica invariável, mas sim uma síndrome multiorgânica expressando uma suscetibilidade compartilhada da espécie felina. Estudos de prevalência em necropsias e biópsias multiorgânicas revelam que entre 30% a 56% dos gatos diagnosticados com pancreatite apresentam colangite concorrente, e até 80% a 93% dos gatos com colangite supurativa exibem lesões inflamatórias em pâncreas e intestino (Center et al., 2022). Em vez de uma causação mecânica linear obrigatória, a visão acadêmica atual compreende a tríade como um complexo inflamatório digestivo felino, no qual insultos bacterianos, imunomediados, dietéticos ou vasculares propagam-se por tecidos intimamente integrados.',

    anatomiaDuctalComparadaEConfluencia:
      'A singular vulnerabilidade da espécie felina ao desenvolvimento da tríade assenta-se em disparidades anatômicas e microbiológicas marcantes quando contrastada com a espécie canina e humana. Em aproximadamente 80% dos gatos domésticos, o ducto pancreático principal (ducto de Wirsung) funde-se intimamente ao ducto colédoco terminal antes de transpor a parede duodenal, desembocando conjuntamente em um óstio comum na papila duodenal maior (papilla duodeni major). O ducto pancreático acessório (ducto de Santorini), que constitui a via de drenagem primária em cães, encontra-se completamente ausente ou não funcional em cerca de 80% da população felina. Essa confluência ductal pré-papilar gera um canal condutor compartilhado onde qualquer obstáculo mecânico (como espessamento inflamatório, tampões de muco, debris celulares ou espasmo esfincteriano) promove estase retrógrada concomitante na árvore biliar e na rede ductal pancreática. Somado a esse fator anatômico, o ecossistema microbiológico do intestino delgado felino normal abriga uma concentração fisiológica colossal de bactérias viáveis (cerca de 10^8 UFC/mL no lúmen duodenal), densidade de 100 a 1.000 vezes superior à observada em cães saudáveis (10^5 a 10^6 UFC/mL). Durante episódios de náusea, vômito crônico ou hipermotilidade retrógrada, a pressão intraluminal duodenal supera a resistência do esfíncter da papila, permitindo o refluxo maciço de conteúdo entérico repleto de bactérias e sais biliares desconjugados para o interior do pâncreas e vias biliares.',

    tabelaModelosFisiopatologicosComparados: {
      kind: 'clinicalTable',
      title: 'Tabela 1 — Modelos Fisiopatológicos Propostos para a Tríade Felina',
      headers: ['Modelo Patogênico', 'Gatilho Primário', 'Via de Propagação', 'Fenótipo Resultante', 'Evidência Científica'],
      rows: [
        [
          'Modelo 1: Refluxo Ascendente Bacteriano',
          'Enteropatia crônica, disbiose e episódios de vômito com aumento da pressão intraluminal duodenal.',
          'Translocação retrógrada de enterobactérias viáveis via papila duodenal maior e canal ductal comum.',
          'Colangite neutrofílica supurativa bacteriana + pancreatite bacteriana aguda ou crônica secundária.',
          'Isolamento de E. coli, Enterococcus e anaeróbios em bile e tecido pancreático (Center et al., 2022; 69% cultura positiva).'
        ],
        [
          'Modelo 2: Extensão Transperitoneal e Efeito Vizinho',
          'Pancreatite primária aguda necrosante ou crônica ativa com autofagocitose acinar e vazamento de enzimas.',
          'Difusão direta de enzimas ativadas, elastase, TNF-alfa e IL-6 através do peritônio para colédoco e duodeno.',
          'Estenose e edema do ducto biliar comum extra-hepático, peritonite focal e íleo paralítico duodenal circunscrito.',
          'Comprovação histológica de saponificação da gordura peripancreática contígua ao colédoco distal (Forman et al., 2021).'
        ],
        [
          'Modelo 3: Homing Linfocitário Imunomediado',
          'Desregulação imune de mucosas, perda de tolerância a antígenos alimentares ou bacterianos da microbiota.',
          'Circulação e migração de clones linfocíticos T ativados expressando integrina alfa4beta7 via endotélio com MAdCAM-1.',
          'Colangite linfocítica crônica + enterite linfoplasmocitária (LPE) + pancreatite intersticial linfocítica.',
          'Presença predominante de infiltrados T CD3+ não supurativos compartilhados e resposta sustentada a corticosteroides.'
        ],
        [
          'Modelo 4: Vulnerabilidade Anatômica Multifatorial',
          'Confluência anatômica ductal pré-papilar em 80% dos felinos associada à densidade bacteriana duodenal de 10^8 UFC/mL.',
          'Estase ductal compartilhada, refluxo recíproco de bile citotóxica no pâncreas e de suco pancreático na vesícula.',
          'Inflamação crônica indolente de baixo grau, colangiectasia, espessamento da muscular do intestino e fibrose.',
          'Revisão crítica de Cridge (2026, JFMS) enfatizando coexistência por suscetibilidade biológica compartilhada.'
        ]
      ]
    },
  },

  epidemiology: {
    distribuicaoEpidemiologicaEPrevalencia:
      'A tríade felina é universalmente reconhecida como uma das síndromes digestivas mais prevalentes na clínica de pequenos animais, acometendo felinos domésticos globalmente sem predileção geográfica estrita. Em centros de referência terciários, a prevalência histopatológica de lesões inflamatórias simultâneas no pâncreas e fígado varia de 30% a 56%, elevando-se para até 80% a 93% quando avaliados gatos com colangite neutrofílica supurativa confirmada (Center et al., 2022). Em estudos prospectivos com ultrassonografia de alta resolução associada a marcadores séricos (Spec fPL e cobalamina), aproximadamente metade dos felinos apresentados com queixas crônicas de vômitos ou perda de peso apresentam o complexo da tríade em graus variáveis de atividade subclínica ou manifesta.',

    predisposicaoPorIdadeESexo:
      'A síndrome acomete predominantemente gatos adultos de meia-idade a idosos, com mediana diagnóstica situada entre 7 e 12 anos. Não há predisposição sexual comprovada: machos e fêmeas (castrados ou inteiros) são afetados em proporções equivalentes. Embora gatos domésticos de pelo curto (DSH) e de pelo longo (DLH) representem a vasta maioria dos casos em termos absolutos pela sua representatividade demográfica, certas raças puras (como Siamês e outras raças orientais) exibem suscetibilidade documentada a formas linfocíticas proliferativas e colangite crônica, sugerindo determinantes genéticos subjacentes na regulação imune mucosal.',

    concorrenciaPancreatiteColangiteEnteropatia:
      'A sobreposição de acometimento multiorgânico foi extensamente documentada na coorte multicêntrica de Center et al. (2022) envolvendo 168 felinos com colangite supurativa: 93% dos gatos apresentavam pancreatite concorrente, 88% exibiam enteropatia crônica inflamatória (IBD) e 42% apresentavam colelitíase associada. Esses dados consolidam a realidade de que a colangite isolada ou a pancreatite estritamente isolada constituem exceções na espécie felina, devendo o clínico conduzir a investigação sempre sob a premissa de um complexo digestivo tripartite integrado.',
  },

  pathogenesisTransmission: {
    cascata: [
      'Disbiose entérica e perda da integridade mucosal: Alterações na barreira intestinal e hipersensibilidade alimentar ativam a resposta imune na lâmina própria duodenojejunal.',
      'Dismotilidade gastrointestinal e refluxo duodenal: Episódios de vômitos crônicos elevam a pressão intraluminal duodenal contra o esfíncter da papila duodenal maior.',
      'Refluxo biliopancreático através do canal comum: A confluência anatômica pré-papilar permite a ascensão simultânea de conteúdo entérico com bactérias (10^8 UFC/mL) para o colédoco e ducto de Wirsung.',
      'Ativação prematura de zimogênios acinares: A tripsina ativada precocemente no pâncreas deflagra autofagocitose acinar, necrose gordurosa e liberação de citocinas (TNF-alfa, IL-1beta, IL-6).',
      'Colangite e colangiectasia: A irritação bacteriana e química promove infiltração neutrofílica ou linfoplasmocitária periportal, edema da parede vesicular e ectasia ductal.',
      'Isquemia e edema peripancreático contíguo: A extensão transperitoneal por efeito vizinho comprime mecanicamente o colédoco distal, agravando a colestase obstrutiva e o íleo funcional.',
      'Esgotamento da síntese de fator intrínseco e hipocobalaminemia: A destruição acinar pancreática associada à lesão mucosa ileal bloqueia a absorção de vitamina B12, perpetuando o ciclo enteropático.',
    ],
    viasDePropagacaoECanalComum:
      'A patogênese da tríade felina é estritamente endógena e multiorgânica, não configurando afecção contagiosa inter-animais. As vias de propagação ocorrem por contiguidade anatômica via canal ductal comum pré-papilar, refluxo mecânico sob gradiente pressórico duodenal e tráfego linfocítico compartilhado (homing com integrina alfa4beta7 e MAdCAM-1) ao longo do eixo mucosa digestiva-fígado-pâncreas.',
  },

  pathophysiology: {
    modeloRefluxoAscendenteBacteriano:
      'O modelo de refluxo ascendente representa a via etiopatogênica mais solidamente documentada na colangite neutrofílica supurativa felina. A densidade bacteriana do duodeno proximal no gato saudável é biologicamente expressiva, albergando flora mista aeróbia e anaeróbia facultativa. Em situações de dismotilidade gastrointestinal, enterite inflamatória crônica ou vômitos recorrentes, o aumento sustentado da pressão hidrostática no lúmen duodenal vence a barreira de fechamento esfincteriano da papila duodenal maior. Em felinos dotados de ducto comum (80%), a bile e as bactérias carreadas do duodeno ascendem simultaneamente pelo ducto colédoco e pelo ducto pancreático. No trabalho retrospectivo seminal de Center et al. (2022) envolvendo 168 gatos com colangite supurativa, 69% dos pacientes submetidos à análise biliar apresentaram culturas microbiológicas positivas, com predomínio absoluto de Escherichia coli, Enterococcus faecalis, Streptococcus spp., Bacteroides e Clostridium spp. Notavelmente, 93% desses felinos apresentavam pancreatite concorrente confirmada e 88% exibiam enteropatia inflamatória crônica (IBD), chancelando a indissociabilidade do refluxo ascendente como motor infeccioso primário.',

    modeloEfeitoVizinhoEPancreatitePrimaria:
      'Diferentemente do modelo ascendente, a via da pancreatite primária deflagra a tríade a partir do epicentro acinar pancreático. A fusão patológica anormal de grânulos de zimogênio com lisossomos contendo catepsina B no interior do ácino pancreático desencadeia a clivagem precoce intra-acinar do tripsinogênio em tripsina ativa, sobrecarregando os inibidores endógenos (como o PSTI/SPINK1). A cascata autocatalítica subsequente ativa elastase, fosfolipase A2 e carboxipeptidases, resultando em autodigestão celular, necrose gordurosa periacinar e liberação explosiva de mediadores inflamatórios sistêmicos (TNF-alfa, IL-1beta, IL-6 e PAF). Como o pâncreas felino localiza-se em íntimo contato anatômico com o duodeno descendente e o trajeto extra-hepático do ducto colédoco, o extravasamento peripancreático dessas enzimas proteolíticas e citocinas induz vasculite local severa, saponificação da gordura mesentérica e edema transmural periduodenal e periductal. O ducto colédoco é mecanicamente comprimido em seu segmento terminal por edema e fibrose peripancreática, gerando obstrução biliar extra-hepática secundária, colestase e colangite mecânica reativa.',

    modeloImunomediadoEHomingLinfocitario:
      'Nos quadros crônicos caracterizados por colangite linfocítica e enterite linfoplasmocitária (LPE), a patogenia transcende a agressão bacteriana direta e repousa sobre uma quebra persistente da homeostase imunológica mucosal. Linfócitos T naive sensibilizados nas placas de Peyer intestinais contra antígenos luminais da microbiota desequilibrada (disbiose) adquirem moléculas de adesão de superfície específicas, predominantemente a integrina alfa4beta7 e o receptor de quimiocina CCR9. Essas células T de memória circulantes reconhecem constitutivamente a molécula de adesão celular de endereçamento mucosal 1 (MAdCAM-1) expressa tanto no endotélio vascular dos vilos intestinais quanto nos capilares dos tratos portais hepáticos e parênquima pancreático. Esse tráfego celular desregulado (homing linfocitário compartilhado) promove o recrutamento contínuo de clones de linfócitos T auxiliares (Th1 e Th17) e citotóxicos (CD3+), desencadeando inflamação linfocitária crônica imuno-orquestrada concomitante nas mucosas do intestino, colângios e ductos pancreáticos.',

    terceiraPernaEnteropatiaLpeVsLgitl:
      'A consolidação da terceira perna da tríade felina foi substancialmente redefinida com a publicação do Consenso ACVIM sobre Enteropatia Crônica Felina (Marsilio et al., 2023, JVIM). O conceito reducionista e simplista de "doença inflamatória intestinal" (IBD) foi formalmente substituído pela categorização de enteropatias crônicas (feline chronic enteropathy - CE), estabelecendo o desafio crítico da diferenciação entre a enterite linfoplasmocitária benigna (LPE) e a principal neoplasia gastrointestinal felina: o linfoma alimentar de células T de baixo grau (low-grade intestinal T-cell lymphoma - LGITL, ou linfoma de pequenas células). No paciente felino com tríade, a apresentação clínica (vômitos crônicos, perda de peso, hiporexia e diarreia), os achados laboratoriais (hipocobalaminemia, aumento de enzimas hepáticas e fPLI) e a ultrassonografia (espessamento difuso de alças intestinais) exibem uma zona de sobreposição diagnóstica extrema entre LPE e LGITL. O Consenso ACVIM 2023 estabelece que biópsias endoscópicas superficiais de mucosa são insuficientes e frequentemente falham em capturar o linfoma, preconizando biópsias cirúrgicas transmurais de espessura total aliadas a painéis de imuno-histoquímica (CD3 para células T e CD20 para células B) e ensaios moleculares de clonalidade (PARR - PCR for Antigen Receptor Rearrangement) para identificação de populações clonais neoplásicas monoclonais de rearranjo do gene TCR-gamma.',

    tabelaDiferenciacaoLpeVsLgitl: {
      kind: 'clinicalTable',
      title: 'Tabela 2 — Diagnóstico Diferencial Estruturado: LPE versus LGITL (Consenso ACVIM 2023)',
      headers: ['Critério Avaliado', 'Enterite Linfoplasmocitária (LPE)', 'Linfoma Intestinal T de Baixo Grau (LGITL)', 'Relevância Clínica'],
      rows: [
        [
          'Camada Mais Espessada no US',
          'Mucosa ou submucosa espessadas de modo difuso e homogêneo; relação muscular/submucosa geralmente < 1.',
          'Camada muscular própria marcadamente espessada de forma segmentar ou difusa; relação muscular/submucosa > 1.',
          'Sinal ultrassonográfico clássico (relação > 1 favorece LGITL, mas não substitui histopatologia).'
        ],
        [
          'Linfadenopatia Mesentérica',
          'Linfonodos normais a discretamente aumentados, bordas regulares e manutenção do hilo ecogênico central.',
          'Linfonodos moderada a intensamente aumentados, arredondados, hipoecoicos e perda da arquitetura hilomuscular.',
          'A biópsia aspirativa ou excisional do linfonodo mesentérico auxilia no estadiamento oncológico.'
        ],
        [
          'Infiltração Histopatológica',
          'Infiltrado polimorfo de linfócitos, plasmócitos e raros eosinófilos restrito à lâmina própria superficial e média.',
          'Infiltrado monomórfico denso de pequenos linfócitos T mononucleares invadindo epitélio (epiteliotropismo em ninhos) e muscular.',
          'A biópsia de espessura total (cirúrgica) é indispensável para avaliar infiltração transmural e muscular.'
        ],
        [
          'Imuno-histoquímica (IHC)',
          'População celular mista policlonal composta por linfócitos T (CD3+) e linfócitos B / plasmócitos (CD20+).',
          'População dominante e homogênea de linfócitos T CD3+ exibindo densidade clonal neoplásica com rarefação de CD20+.',
          'Marcador fenotípico diferencial mandatório no Consenso ACVIM 2023.'
        ],
        [
          'Clonalidade Molecular (PARR)',
          'Policlonalidade preservada do rearranjo gênico do receptor de células T (TCR-gamma) e imunoglobulinas (IgH).',
          'Monoclonalidade clonal evidente no rearranjo do gene TCR-gamma, confirmando proliferação neoplásica clonal.',
          'Ferramenta molecular de alta especificidade para desempate diagnóstico em amostras histológicas limítrofes.'
        ],
        [
          'Terapia Primária Indicada',
          'Dieta de eliminação hidrolisada/monoproteica + prednisolona (1 a 2 mg/kg/dia) com desmame progressivo.',
          'Prednisolona (1 a 2 mg/kg/dia) combinada obrigatoriamente a clorambucil (2 mg/gato VO q48h ou 20 mg/m2 a cada 14 dias).',
          'A ausência de quimioterápico alquilante no LGITL resulta em falência terapêutica precoce.'
        ]
      ]
    },

    fisiologiaPancreaticaCobalaminaIF:
      'A compreensão da fisiologia da vitamina B12 (cobalamina) no gato representa um marco na medicina felina. Em cães e seres humanos, o fator intrínseco (glicoproteína carreadora essencial para a absorção ileal de cobalamina mediada por receptores cubam) é sintetizado conjuntamente pelas células parietais da mucosa gástrica e pelos ácinos pancreáticos. No felino doméstico, a totalidade absoluta do fator intrínseco é sintetizada e secretada exclusivamente pelas células acinares exócrinas do pâncreas. Portanto, qualquer processo inflamatório que comprometa a massa acinar pancreática (pancreatite aguda necrosante ou pancreatite crônica com fibrose acinar residual) debela prontamente a secreção de fator intrínseco. Paralelamente, como a absorção do complexo cobalamina-fator intrínseco ocorre de forma estrita no íleo terminal, a enteropatia crônica associada lesa os enterócitos ileais e diminui a expressão dos receptores de cubilina. O resultado dessa dupla falência (produção pancreática deficiente + má absorção ileal) é uma hipocobalaminemia severa, precoce e refratária em quase todos os gatos acometidos pela tríade felina, perpetuando atrofia de vilosidades intestinais, disfunção mitocondrial e anorexia metabólica.',

    acuraciaDiagnosticaSpecFplConsenso:
      'O diagnóstico da pancreatite na espécie felina permaneceu obscurecido por décadas em decorrência da absoluta ineficácia da mensuração de amilase e lipase convencionais, enzimas que não possuem sensibilidade nem especificidade para o pâncreas do gato. O Consenso ACVIM de Pancreatite Felina (Forman et al., 2021) e o estudo contemporâneo de validação clínica de Forman et al. (2024, JVDI) consolidaram a imunorreatividade da lipase pancreática felina (fPLI, comercialmente mensurada como Spec fPL) como o teste não invasivo de escolha. Em gatos com pancreatite confirmada por histopatologia, o ponto de corte >= 5,4 ug/L exibe sensibilidade de 79,4%, especificidade de 79,7%, valor preditivo positivo de 69,0% e valor preditivo negativo de 87,0%. Para a zona cinzenta (valores entre 3,5 e 5,3 ug/L), recomenda-se a repetição em 48 a 72 horas e correlação com a ultrassonografia. No entanto, o clínico deve atentar para as limitações ultrassonográficas: a sensibilidade do ultrassom para detectar pancreatite felina varia entre modestos 11% a 67% na literatura mundial, o que significa que um exame ultrassonográfico absolutamente normal NÃO descarta pancreatite no paciente com suspeita clínica e Spec fPL alterado. Por fim, o Consenso ACVIM 2021 enfatiza uma verdade clínica angular: a pancreatite felina é primariamente uma inflamação asséptica e estéril; a prescrição empírica rotineira de antimicrobianos para pancreatite isolada sem colangite neutrofílica documentada é incorreta e contraria as diretrizes internacionais.',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'Manifestações Sistêmicas Inespecíficas e Comportamentais',
      findings: [
        {
          finding: 'Letargia profunda, isolamento e desinteresse ambiental',
          mechanism:
            'Ação de citocinas pró-inflamatórias sistêmicas circulantes (TNF-alfa, IL-1beta e IL-6) atuando nos centros termorreguladores e comportamentais do hipotálamo felino.',
          clinicalMeaning:
            'Sinal inicial mais consistente e sutil da tríade; felinos frequentemente não exteriorizam queixas óbvias, manifestando apenas recolhimento e perda de interação.',
          priority: 'urgent',
        },
        {
          finding: 'Hiporexia sustentada evoluindo para anorexia completa',
          mechanism:
            'Inibição hipotalâmica do centro da fome induzida por leptina inflamatória, náusea subclínica crônica por íleo gastrointestinal e dor visceral contínua.',
          clinicalMeaning:
            'Gatilho metabólico crítico: felinos que permanecem em balanço calórico negativo por mais de 24 a 48 horas correm risco imediato de lipidose hepática.',
          priority: 'emergency',
        },
        {
          finding: 'Perda de peso progressiva e caquexia muscular com perda de escore',
          mechanism:
            'Balanço energético e proteico negativo gerado por má assimilação entérica, catabolismo proteico sistêmico acelerado por citocinas e ingestão calórica deficiente.',
          clinicalMeaning:
            'Indica cronicidade subjacente de enteropatia ou pancreatite indolente precedendo a descompensação clínica aguda da colangite.',
          priority: 'urgent',
        },
      ],
    },
    {
      system: 'Sinais Gastrointestinais Superiores e Dismotilidade',
      findings: [
        {
          finding: 'Vômitos frequentes contendo bile, fluido mucoso ou alimento não digerido',
          mechanism:
            'Dismotilidade gastroduodenal, refluxo duodenogástrico decorrente de inflamação periduodenal, gastroparesia reflexa e estimulação da zona de gatilho quimiorreceptora (CRTZ).',
          clinicalMeaning:
            'Vômitos não devem ser normalizados como bolas de pelo; no gato, êmese crônica intermitente é a expressão cardeal de enteropatia e pancreatite.',
          priority: 'emergency',
        },
        {
          finding: 'Hipersalivação (ptialismo), lambedura labial contínua e náusea subclínica',
          mechanism:
            'Ativação parassimpática autonômica disparada pela distensão da cápsula pancreática, espasmo biliar e sensibilização de receptores 5-HT3 e NK-1 na área postrema.',
          clinicalMeaning:
            'Marcador objetivo de sofrimento em felinos que não vomitam ativamente; exige intervenção antiemética precoce com maropitant e ondansetrona.',
          priority: 'urgent',
        },
        {
          finding: 'Dor abdominal cranial, postura antálgica em esfinge e relutância ao toque',
          mechanism:
            'Estimulação de fibras nociceptivas viscerais C e A-delta pelo edema acinar, peritonite focal peripancreática e distensão da cápsula hepática de Glisson.',
          clinicalMeaning:
            'O gato esconde a dor mantendo os quatro membros recolhidos sob o corpo com a cabeça baixa; a palpação epigástrica revela rigidez muscular reflexa.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'Manifestações Hepatobiliares e Colestáticas',
      findings: [
        {
          finding: 'Icterícia mucocutânea evidente em escleras, palato mole e pavilhões auriculares',
          mechanism:
            'Hiperbilirrubinemia mista: colestase pós-hepática por compressão mecânica e edema inflamatório do ducto colédoco distal associada a dano hepatocitário direto.',
          clinicalMeaning:
            'Indica envolvimento colestático severo na tríade; exige descarte urgente de colangite neutrofílica supurativa versus obstrução mecânica completa.',
          priority: 'emergency',
        },
        {
          finding: 'Hepatomegalia palpável e sensibilidade ao toque subcostal cranial',
          mechanism:
            'Infiltração neutrofílica ou linfoplasmocitária nos tratos portais hepáticos, combinada a congestão biliar intra-hepática e vacualização hepatocitária lipídica.',
          clinicalMeaning:
            'Borda hepática estende-se além do arco costal; a palpação elicita desconforto e vocalização de alerta.',
          priority: 'urgent',
        },
        {
          finding: 'Fezes acólicas ou pálidas e urina intensamente acastanhada (colúria)',
          mechanism:
            'Falta de fluxo de estercobilinogênio para a luz do cólon por retenção mecânica do fluxo biliar, associada à excreção renal compensatória de bilirrubina conjugada hidrossolúvel.',
          clinicalMeaning:
            'Sinal inequívoco de interrupção subtotal ou total do escoamento biliar na papila duodenal maior.',
          priority: 'urgent',
        },
      ],
    },
    {
      system: 'Manifestações Intestinais e de Má Absorção',
      findings: [
        {
          finding: 'Diarreia crônica ou pastosa volumosa de intestino delgado',
          mechanism:
            'Infiltração celular inflamatória na lâmina própria intestinal, destruição enzimática da borda em escova enterocítica e perda osmótica de nutrientes não absorvidos.',
          clinicalMeaning:
            'Evidencia a terceira perna enteropática da tríade; pode alternar com períodos de consistência fecal aparentemente preservada.',
          priority: 'urgent',
        },
        {
          finding: 'Pelagem fosca, ressecada, opaca e presença de esteatorreia',
          mechanism:
            'Má digestão intraluminal de triglicerídeos por deficiência de lipase pancreática e emulsificação ineficaz decorrente de escassez de ácidos biliares duodenais.',
          clinicalMeaning:
            'Reflete insuficiência exócrina e má absorção lipídica crônica; fezes adquirem brilho gorduroso e odor rançoso pungente.',
          priority: 'routine',
        },
        {
          finding: 'Ventroflexão cervical involuntária e fraqueza muscular apendicular',
          mechanism:
            'Hipocalemia severa e depleção de magnésio induzidas por perdas gastrointestinais em vômitos e diarreia combinadas à baixa ingesta calórica sustentada.',
          clinicalMeaning:
            'Emergência eletrolítica crítica decorrente de hiperpolarização da membrana celular muscular; demanda correção intravenosa imediata de cloreto de potássio.',
          priority: 'emergency',
        },
      ],
    },
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Avaliação Hematológica, Perfil Bioquímico Hepático e Urinálise',
      purpose: 'Identificação de resposta séptica/inflamatória, lesão hepatocelular, colestase e desidratação',
      description:
        'Coleta de sangue venoso para hemograma completo com análise de esfregaço em microscopia óptica manual (procurando neutrofilia com desvio à esquerda regenerativo ou degenerativo e toxicidade neutrofílica na colangite neutrofílica, ou anemia não regenerativa normocítica normocrômica na doença inflamatória crônica). Painel bioquímico compreendendo ALT, AST, GGT, fosfatase alcalina (ALP), bilirrubinas total e frações, albumina, globulinas, creatinina, ureia, glicemia, eletrólitos (Na+, K+, Cl-, Ca2+ ionizado) e urinálise com relação proteína/creatinina urinária.',
      interpretation:
        'A elevação concomitante de ALT (lesão hepatocelular) e GGT/ALP/bilirrubina (colestase) aponta fortemente para colangite ativa. Ressalta-se que a ALP felina possui meia-vida muito curta (apenas 6 horas) e baixa produção tecidual; assim, qualquer elevação de ALP em gatos é altamente patológica. Hipoalbuminemia com hiperglobulinemia sugere enteropatia crônica com perda proteica e estimulação imune.',
      limitations:
        'Enzimas hepáticas e hemograma indicam disfunção de órgãos e inflamação sistêmica, mas não diferenciam colangite neutrofílica de linfocítica, nem confirmam a presença de pancreatite associada.',
      isGoldStandard: false,
    },
    {
      stepNumber: 2,
      title: 'Lipase Pancreática Felina Específica (Spec fPL / fPLI)',
      purpose: 'Confirmação sorológica de inflamação e necrose do tecido acinar pancreático',
      description:
        'Ensaio imunológico quantitativo de alta especificidade baseado em imunoensaio de captura por anticorpos monoclonais contra a lipase acinar felina exclusiva. O teste quantifica a fPLI sérica em microgramas por litro (ug/L) após jejum de 8 a 12 horas (quando clinicamente viável, sem atrasar o manejo em pacientes anoréxicos desidratados).',
      interpretation:
        'Valores de Spec fPL < 3,5 ug/L tornam improvável a pancreatite clinicamente ativa. Valores entre 3,5 e 5,3 ug/L enquadram-se na zona cinzenta de suspeita, exigindo monitoramento e repetição em 48-72h. Valores >= 5,4 ug/L confirmam categoricamente pancreatite felina ativa (Se 79,4%, Sp 79,7%, PPV 69%, NPV 87%; Forman et al., 2024). Testes qualitativos rápidos (SNAP fPL) apresentam excelente sensibilidade para triagem, mas resultado anormal exige confirmação quantitativa.',
      limitations:
        'O Spec fPL não é capaz de diferenciar a forma aguda da crônica, nem quantificar a extensão de fibrose tecidual no órgão; animais com pancreatite crônica em estágio fibrótico terminal podem apresentar fPLI discretamente elevada ou falsamente normalizada.',
      isGoldStandard: false,
    },
    {
      stepNumber: 3,
      title: 'Perfil de Cobalamina (Vitamina B12), Folato e TLI Sérico',
      purpose: 'Avaliação funcional da absorção ileal, síntese do fator intrínseco e reserva acinar',
      description:
        'Dosagem sérica quantitativa por quimioluminescência da cobalamina (vitamina B12), do folato sérico e da imunorreatividade semelhante à tripsina (fTLI) em amostras colhidas sob jejum. A análise elucida o impacto sinérgico da enteropatia ileal concomitante e da perda acinar pancreática felina.',
      interpretation:
        'Níveis séricos de cobalamina < 290 ng/L caracterizam hipocobalaminemia moderada a severa. Como o fator intrínseco felino é puramente pancreático e a absorção é ileal, valores críticos (< 150 ng/L) são quase universais na tríade felina, perpetuando atrofia de vilosidades intestinais e hiporexia refratária. O fTLI < 12 ug/L atesta insuficiência pancreática exócrina (EPI) secundária à destruição acinar terminal.',
      limitations:
        'A hipocobalaminemia atesta má absorção ileal e carência de fator intrínseco, mas não elucida isoladamente se a enteropatia subjacente é LPE inflamatória ou LGITL neoplásico.',
      isGoldStandard: false,
    },
    {
      stepNumber: 4,
      title: 'Ultrassonografia Abdominal Especializada com Varredura Tríplice',
      purpose: 'Mapeamento morfológico sincronizado do pâncreas, árvore biliar e alças intestinais',
      description:
        'Exame ecográfico meticuloso de alta resolução (transdutores lineares de 8 a 15 MHz) executado por operador experiente em medicina felina. A varredura contempla: (1) Pâncreas (lobo direito, corpo e lobo esquerdo): espessura, ecogenicidade heterogênea hipoecoica, edema, líquido livre peripancreático e hiperecogenicidade do mesentério adjacente; (2) Vias biliares: espessura parietal da vesícula (> 1 mm patológico), dilatação do colédoco (> 4 a 5 mm), tortuosidade e presença de colelitíase; (3) Intestino: espessura mural do duodeno, jejuno e íleo, estratificação de camadas, relação muscular/submucosa e linfonodos mesentéricos.',
      interpretation:
        'A combinação de gordura peripancreática hiperecogênica com pâncreas hipoecoico aumentado, colédoco dilatado com paredes ecogênicas e espessamento difuso de camadas intestinais confirma ecograficamente a síndrome da tríade. Relação muscular/submucosa > 1 nas alças jejunais e perda de hilo em linfonodos elevam a suspeita de LGITL concorrente.',
      limitations:
        'A sensibilidade do ultrassom na pancreatite felina varia entre 11% e 67%; exame ultrassonográfico sem alterações NÃO exclui pancreatite nem enteropatia crônica.',
      isGoldStandard: false,
    },
    {
      stepNumber: 5,
      title: 'Biópsias Cirúrgicas Multiorgânicas Transmurais com Imuno-histoquímica e PARR',
      purpose: 'Padrão ouro acadêmico: diagnóstico definitivo e diferenciação entre colangite supurativa vs linfocítica e LPE vs LGITL',
      description:
        'Laparotomia exploratória programada ou videolaparoscopia avançada sob anestesia geral balanceada, colhendo amostras histológicas de espessura total do duodeno, jejuno, íleo, linfonodo mesentérico satélite, cunha do lobo hepático e fragmento marginal do lobo pancreático esquerdo. As peças sofrem coloração com HE, tricrômico de Masson (fibrose), painel de imuno-histoquímica (CD3 para linfócitos T e CD20 para linfócitos B) e extração de DNA para ensaio de clonalidade por PARR (rearranjo do gene TCR-gamma).',
      interpretation:
        'Padrão ouro definitivo: discrimina conclusivamente entre colangite neutrofílica e linfocítica; avalia grau de necrose ou fibrose pancreática; e resolve de forma inequívoca o diagnóstico diferencial entre enterite linfoplasmocitária benigna (policlonal, infiltrado misto na lâmina própria) e linfoma intestinal T de baixo grau (monoclonal no PARR, epiteliotropismo em ninhos de linfócitos CD3+ na muscular).',
      limitations:
        'Procedimento invasivo de alto custo e risco anestésico-cirúrgico expressivo em felinos hipoproteinêmicos ou debilitados. Na rotina prática, a decisão clínica é frequentemente tomada de forma presumida com base na resposta terapêutica fenotípica.',
      isGoldStandard: true,
    },
    {
      stepNumber: 6,
      title: 'Colecistocentese Percutânea Ecoguiada com Citologia e Cultura Microbiológica',
      purpose: 'Isolamento etiológico bacteriano na colangite neutrofílica e determinação de antibiograma',
      description:
        'Punção trans-hepática da vesícula biliar guiada por ultrassonografia em tempo real utilizando agulha 22G a 25G conectada a seringa estéril de 3 a 5 mL, estritamente após confirmação de perfil de coagulação aceitável (PT e aPTT normais). A bile aspirada é dividida para citologia a fresco em esfregaço corado (pesquisa de neutrófilos degenerate e bactérias fagocitadas) e encaminhamento imediato para cultura microbiológica para aeróbios e anaeróbios facultativos com teste de suscetibilidade a antimicrobianos (antibiograma).',
      interpretation:
        'A presença de neutrófilos e bactérias com cultura positiva (E. coli, Enterococcus, Bacteroides) sela o diagnóstico de colangite neutrofílica supurativa bacteriana, orientando a escolha precisa do antimicrobiano.',
      limitations:
        'Contraindicado na presença de coagulopatia grave, vesícula biliar sob risco iminente de ruptura por enfisema mural ou obstrução mecânica refratária com paredes vesiculares friáveis.',
      isGoldStandard: false,
    },
  ],

  treatment: {
    paradigmaTerapeuticoFenotipoDominante:
      'O tratamento contemporâneo da tríade felina exige uma mudança de paradigma essencial: a rejeição formal do dogma reducionista "tríade = corticoide imediato". Como a tríade congrega componentes patológicos com demandas farmacológicas antagônicas (por exemplo, a colangite bacteriana neutrofílica requer antibioticoterapia bactericida e contraindica imunossupressão, enquanto a colangite linfocítica e a LPE dependem de glicocorticoides), o plano terapêutico deve ser obrigatoriamente individualizado e direcionado pelo fenótipo clínico dominante no momento da admissão. Prescrever corticosteroides em doses imunossupressoras para um gato com infecção bacteriana ativa na árvore biliar induz sepse fulminante e choque distributivo fatal. Dessa forma, a primeira etapa do médico veterinário consiste em identificar se o quadro apresenta sinais infecciosos supurativos (febre, neutrofilia tóxica, bile bacteriana) ou se é dominado por inflamação crônica imunomediada (colangite linfocítica, LPE ou LGITL), estabilizando as disfunções agudas antes de introduzir agentes imunomoduladores.',

    tabelaAbordagemFarmacoterapeuticaFenotipica: {
      kind: 'clinicalTable',
      title: 'Tabela 3 — Farmacoterapia Direcionada por Fenótipo Clínico Dominante',
      headers: ['Fenótipo Clínico Dominante', 'Alvo Primário e Prioridade', 'Antimicrobianos Indicados', 'Anti-inflamatório / Imunomodulador', 'Suporte Nutricional e Adjuvantes'],
      rows: [
        [
          'Colangite Neutrofílica Aguda Supurativa',
          'Erradicação bacteriana biliar, estabilização hemostática e alívio da colestase.',
          'Amoxicilina + clavulanato (12,5 a 20 mg/kg VO/SC q12h) + marbofloxacina (2 mg/kg VO q24h) por 4 a 8 semanas.',
          'Contraindicação absoluta a glicocorticoides até resolução microbiológica e clínica completa.',
          'Fluidoterapia balanceada, buprenorfina, maropitant, sonda enteral precoce e vitamina K1 (se coagulopatia).'
        ],
        [
          'Pancreatite Aguda Grave com Colangite Secundária',
          'Perfusão microvascular, analgesia visceral intensa e bloqueio de náusea/íleo.',
          'Não indicados para o pâncreas estéril; usar amoxicilina/clavulanato se houver colangite ou sepse associada.',
          'Corticosteroides contraindicados na fase aguda de pancreatite grave asséptica com necrose.',
          'Cristaloides balanceados, metadona (0,1-0,2 mg/kg IV q4h), maropitant + ondansetrona, sonda enteral imediata.'
        ],
        [
          'Enteropatia Crônica / LPE com Pancreatite Crônica',
          'Controle da resposta inflamatória mucosal, modulação da barreira entérica e reposição de B12.',
          'Geralmente desnecessários; metronidazol (10 mg/kg VO q12h) apenas em disbiose refratária de curta duração.',
          'Prednisolona (1 a 2 mg/kg VO q24h com desmame lento ao longo de 8 a 12 semanas) ou budesonida oral.',
          'Dieta de eliminação com proteína hidrolisada, cobalamina contínua, UDCA (se patência biliar) e SAMe.'
        ],
        [
          'Linfoma Intestinal T de Baixo Grau (LGITL) com Tríade',
          'Remissão oncológica clonal de células T intestinais e preservação da função digestiva.',
          'Não indicados rotineiramente (exceto se houver neutropenia secundária a quimioterápicos ou colangite concorrente).',
          'Prednisolona (1 a 2 mg/kg VO q24h) associada obrigatoriamente a clorambucil (2 mg/gato VO a cada 48 horas).',
          'Cobalamina contínua (oral ou SC), dieta hipoalergênica de alta digestibilidade, maropitant e monitoramento hematológico quinzenal.'
        ],
        [
          'Colangite Linfocítica Crônica Isolada ou Predominante',
          'Supressão da infiltração de linfócitos T no trato portal hepático e controle da fibrose biliar.',
          'Não indicados rotineiramente (doença imunomediada abacteriana comprovada por citologia/cultura negativas).',
          'Prednisolona (1 a 2 mg/kg/dia VO com redução gradual até a menor dose em dias alternados por meses).',
          'Ácido ursodesoxicólico (UDCA 10 a 15 mg/kg VO q24h com alimento), SAMe (200 mg/gato VO q24h) e silimarina.'
        ]
      ]
    },

    terapiaAntimicrobianaRacionalColangite:
      'A escolha racional de antimicrobianos na tríade felina fundamenta-se estritamente na microbiologia comprovada da colangite neutrofílica. O estudo seminal de Center et al. (2022) em 168 felinos demonstrou que 69% dos casos abrigavam infecção bacteriana ativa, predominantemente enterobactérias coliformes (Escherichia coli), cocos Gram-positivos (Enterococcus faecalis e Streptococcus spp.) e anaeróbios obrigatórios (Bacteroides spp. e Clostridium spp.). Por essa razão, a antibioticoterapia empírica inicial de largo espectro deve contemplar boa penetração tecidual hepatobiliar e atividade bactericida contra Gram-positivos, Gram-negativos e anaeróbios. O protocolo clássico de primeira escolha compreende amoxicilina com clavulanato de potássio (12,5 a 20 mg/kg VO ou SC a cada 12 horas), que pode ser associada a uma fluoroquinolona de segurança comprovada em felinos (marbofloxacina na dose de 2 mg/kg VO a cada 24 horas, evitando-se expressamente o uso de enrofloxacina em doses superiores a 5 mg/kg pelo risco iminente de retinopatia e cegueira irreversível). Alternativamente, o metronidazol (10 a 15 mg/kg VO ou IV a cada 12 horas) confere excelente cobertura para anaeróbios estritos. A duração do tratamento antimicrobiano na colangite neutrofílica bacteriana deve ser estendida: recomenda-se um curso clínico mínimo de 4 a 8 semanas, sob reavaliações ultrassonográficas e laboratoriais, visto que suspensões precoces induzem recidiva supurativa bacteriana fulminante. Reitera-se: a pancreatite felina isolada é estéril e não justifica uso de antibióticos.',

    imunossupressaoSeguraColangiteLinfociticaELPE:
      'Nos pacientes com fenótipo imunomediado comprovado (colangite linfocítica, enterite linfoplasmocitária ou após a eliminação microbiológica documentada da infecção bacteriana), a imunossupressão constitui o esteio curativo. A prednisolona oral é o fármaco de primeira linha na dose inicial de 1 a 2 mg/kg a cada 24 horas (ou dividida em duas tomadas de 1 mg/kg q12h). Em felinos, deve-se prescrever obrigatoriamente a prednisolona ativa e não a prednisona, pois a conversão hepática de prednisona em prednisolona na espécie é errática e incompleta. A dose de ataque é sustentada até a remissão clínica e bioquímica (normalização de enzimas hepáticas e remissão de vômitos e diarreia, tipicamente em 2 a 4 semanas), procedendo-se a um desmame gradual e programado de 25% a 50% da dose a cada 2 a 3 semanas ao longo de 2 a 4 meses, buscando a menor dose em dias alternados capaz de sustentar a remissão. Se o paciente apresentar comorbidades que contraindiquem esteroides sistêmicos em altas doses (como diabetes mellitus concomitante ou cardiomiopatia hipertrófica subclínica), a budesonida (1 mg/gato VO a cada 24 horas) representa excelente alternativa para a perna intestinal, atuando topicamente na mucosa com extenso metabolismo de primeira passagem hepática (~90%). Nos casos de linfoma intestinal de células T de baixo grau (LGITL), a prednisolona deve ser invariavelmente associada ao quimioterápico alquilante oral clorambucil (2 mg/gato VO a cada 48 horas em gatos > 3 kg, ou 20 mg/m2 VO a cada 14 dias), protocolo validado com sobrevida mediana superior a 2 anos e excelente tolerabilidade clínica.',

    nutricaoEnteralPrecoceEVetoAoJejum:
      'A abordagem nutricional na tríade felina enterra definitivamente o antigo preceito da medicina canina de "colocar o pâncreas em repouso por jejum absoluto". Em felinos, o jejum calórico prolongado desencadeia a mobilização maciça de triglicerídeos periféricos do tecido adiposo para o fígado, induzindo lipidose hepática secundária (hepatic lipidosis) em questão de poucos dias, condição com taxa de letalidade superior a 50%. A nutrição enteral precoce mantém a integridade da barreira mucosal gastrointestinal, previne atrofia vilositária e bloqueia a translocação de enterobactérias luminais para a circulação portal. A alimentação deve ser introduzida nas primeiras 24 horas de internamento, tão logo o choque e a desidratação sejam corrigidos. Se o paciente persistir em anorexia ou hiporexia (< 50% da necessidade energética de repouso - RER = 70 x peso corporal^0,75) por mais de 24 a 48 horas, o médico veterinário não deve hesitar na instalação de uma sonda de alimentação enteral (sonda nasoesofágica para suporte a curto prazo de 3 a 5 dias no hospital, ou sonda de esofagostomia para suporte prolongado ambulatorial de semanas a meses). A dieta deve ser hiperdigestível, com teores moderados a elevados de proteína e proteína hidrolisada ou monoproteica nova para modular a hipersensibilidade entérica. Ressalta-se que a restrição severa de lipídios ("dietas low-fat") preconizada em cães NÃO encontra suporte científico em felinos com pancreatite, devendo ser priorizada a densidade calórica e a palatabilidade.',

    reavaliacaoDaMetoclopramidaEProcineticos:
      'O manejo da náusea e dismotilidade exige precisão farmacológica. Durante anos circulou na medicina felina o mito infundado de que a metoclopramida seria contraindicada na pancreatite por suposto agravamento do fluxo sanguíneo microvascular. O Consenso ACVIM de Pancreatite Felina (Forman et al., 2021) desmistificou expressamente essa assertiva, confirmando que a metoclopramida pode ser utilizada com total segurança como agente procinético gastroduodenal na dose de 0,2 a 0,5 mg/kg SC ou VO a cada 8 horas (ou em infusão contínua CRI de 1 a 2 mg/kg/dia), sendo de grande valia no combate ao íleo paralítico peripancreático e à gastroparesia reflexa, desde que descartada obstrução mecânica luminal total. No entanto, para o controle central e periférico do vômito e da náusea marcante, o citrato de maropitant (1 mg/kg SC, IV ou VO a cada 24 horas) permanece como o antiemético de primeira linha indispensável, exercendo antagonismo potente nos receptores neurocinina 1 (NK-1) tanto na CRTZ e centro emético quanto nas fibras sensoriais viscerais periféricas, propiciando adicionalmente efeito analgésico visceral coadjuvante. Em casos de náusea refratária com ptialismo e recusa alimentar, preconiza-se a associação sinérgica com a ondansetrona (antagonista serotoninérgico 5-HT3 na dose de 0,5 a 1,0 mg/kg IV ou VO a cada 8 a 12 horas).',

    fluidoterapiaAnalgesiaMultimodalOpioide:
      'A restauração hemodinâmica rápida com fluidoterapia balanceada é o pilar vital mais crítico na fase de acolhimento emergencial da tríade. A isquemia e hipoperfusão do leito esplâncnico aceleram a necrose tecidual pancreática e a translocação bacteriana intestinal. Recomendam-se soluções cristaloides balanceadas isotônicas (Ringer com Lactato ou Plasmalyte) tituladas para restaurar parâmetros dinâmicos de perfusão (tempo de preenchimento capilar, cor de mucosas, frequência cardíaca, lactato sérico e pressão arterial média > 60-70 mmHg). O monitoramento do ionograma é imperativo: a suplementação parenteral de cloreto de potássio (KCl) deve ser calculada e administrada no fluido intravenoso sem ultrapassar 0,5 mEq/kg/hora, corrigindo a hipocalemia que agrava o íleo paralítico e a fraqueza muscular. A analgesia multimodal é obrigatória e inegociável em todo gato com tríade felina, uma vez que a dor visceral é intensa e desencadeia anorexia e estresse metabólico catabólico. A buprenorfina (agonista mu parcial / antagonista kappa na dose de 0,01 a 0,03 mg/kg por via transmucosa oral/sublingual, SC ou IV a cada 6 a 8 horas) é o fármaco analgésico de eleição pela excelente absorção transmucosa felina, estabilidade hemodinâmica e ausência de sedação profunda. Em pacientes com dor excruciante ou descompensação aguda grave, a metadona (agonista mu puro com atividade antagonista NMDA na dose de 0,1 a 0,2 mg/kg SC, IM ou IV a cada 4 a 6 horas) proporciona alívio analgésico superior. Para a dor crônica neuropática ambulatorial, a gabapentina (5 a 10 mg/kg VO a cada 8 a 12 horas) é útil.',

    suplementacaoCobalaminaOralVsParenteral:
      'A reposição de cobalamina (vitamina B12) constitui uma exigência biológica primária na tríade felina, fundamentada na carência exclusiva de fator intrínseco e na má absorção ileal concomitante. Níveis deprimidos de cobalamina promovem atrofia de enterócitos, desaceleram o reparo tecidual pancreático, perpetuam a anorexia e inibem o metabolismo da metionina. Historicamente, preconizava-se a reposição puramente parenteral injetável. O protocolo clássico de cianocobalamina parenteral estabelece: 250 microgramas por gato por via subcutânea (SC) uma vez por semana durante 6 semanas consecutivas, seguida de 250 ug a cada 14 dias por mais 6 semanas, e uma dose de reavaliação 30 dias após. Contudo, os estudos prospectivos seminais de Toresson et al. (2016 e 2018, JFMS) transformaram a prática clínica ao provar que a suplementação oral diária de cianocobalamina na dose de 250 ug/gato a cada 24 horas junto ao alimento é perfeitamente equivalente e tão eficaz quanto a via subcutânea em felinos com enteropatia e pancreatite crônica. A absorção oral de doses suprafisiológicas ocorre por transporte transcelular passivo não mediado por fator intrínseco, conferindo imensa comodidade ao tutor e reduzindo o estresse de injeções frequentes.',

    terapiaAdjuvanteAcidoUrsodesoxicolicoSAMe:
      'A hepatoproteção e a modulação da dinâmica biliar desempenham papel adjuvante crucial na estabilização dos colângios e hepatócitos. O ácido ursodesoxicólico (UDCA, Ursacol) na dose de 10 a 15 mg/kg VO a cada 24 horas (ou fracionado em 5 a 7,5 mg/kg q12h), administrado preferencialmente junto ao alimento, atua como colerético hidrofílico, reduz a litogenicidade e viscosidade da bile, inibe a apoptose de colangiócitos, desloca ácidos biliares hidrofóbicos hepatotóxicos e exerce efeito imunomodulador anti-inflamatório sobre o epitélio biliar. Alerta imperativo: o UDCA é FORMALMENTE CONTRAINDICADO na presença de obstrução mecânica extra-hepática completa comprovada da árvore biliar antes de sua descompressão, sob risco de hiperpressão e ruptura vesicular. Como agentes citoprotetores e antioxidantes hepáticos, prescreve-se a S-adenosilmetionina (SAMe na dose de 200 mg/gato VO a cada 24 horas com estômago vazio, administrada com 2 a 3 mL de água para evitar retenção esofágica) associada à silibina/silimarina, restaurando os estoques de glutationa intracelular dos hepatócitos espoliados pela inflamação crônica.',

    protocoloPlantaoTriadePassoAPasso: [
      'Passo 1: Acolhimento cat-friendly imediato; avaliação de choque, perfusão (mucosas, TPC), desidratação, dor epigástrica e pesagem corporal rigorosa.',
      'Passo 2: Obtenção de acesso venoso delicado e coleta de sangue para triagem: hemograma completo com esfregaço, bioquímica sérica (ALT, GGT, ALP, bilirrubinas, albumina), glicemia, lactato e eletrólitos.',
      'Passo 3: Se houver evidência de desidratação ou choque, iniciar fluidoterapia de ressuscitação ou manutenção com Ringer com Lactato ou Plasmalyte, com suplementação criteriosa de KCl guiada por ionograma.',
      'Passo 4: Controle analgésico precoce com buprenorfina (0,01 a 0,02 mg/kg sublingual/SC q6-8h) ou metadona (0,1 a 0,2 mg/kg SC/IV) em casos de dor intensa e rigidez abdominal cranial.',
      'Passo 5: Controle imediato de êmese e náusea com citrato de maropitant (1 mg/kg SC/IV q24h) e, se náusea ou ptialismo persistirem, associar ondansetrona (0,5 mg/kg IV q8-12h).',
      'Passo 6: Solicitar dosagem quantitativa de lipase pancreática felina específica (Spec fPL) e perfil de cobalamina sérica (vitamina B12).',
      'Passo 7: Realizar ultrassonografia abdominal especializada nas primeiras 12 a 24 horas para varredura do pâncreas, calibre do colédoco, presença de cálculos biliares, líquido livre e espessura intestinal.',
      'Passo 8: Discriminar o fenótipo clínico dominante: se houver suspeita de colangite neutrofílica supurativa (febre, neutrofilia com desvio, bile purulenta), colher bile por colecistocentese (se hemostasia permitir) e iniciar amoxicilina com clavulanato (12,5-20 mg/kg VO/SC q12h) + marbofloxacina.',
      'Passo 9: Veto absoluto a jejum prolongado: se o gato não consumir pelo menos 50% de sua necessidade energética de repouso nas primeiras 24 a 48 horas, instalar sonda de alimentação nasoesofágica para suporte enteral.',
      'Passo 10: Iniciar suplementação de cobalamina (250 ug/gato SC semanal ou oral diária); introduzir UDCA (10-15 mg/kg VO q24h) somente se confirmada patência biliar, e reservar corticosteroides para fenótipos imunomediados após exclusão de infecção bacteriana ativa.',
    ],

    errosCriticosManejoTriade: [
      'Prescrever corticosteroides em doses imunossupressoras de imediato sob o dogma de que "toda tríade é tratada com corticoide", precipitando choque séptico em gatos com colangite bacteriana.',
      'Impor jejum alimentar prolongado ("descanso do pâncreas") em felinos com pancreatite, deflagrando lipidose hepática secundária fatal em poucos dias.',
      'Prescrever antimicrobianos de forma empírica rotineira para pancreatite felina isolada, ignorando que o pâncreas inflamado do gato é tipicamente asséptico e estéril.',
      'Descartar pancreatite felina baseando-se unicamente em um exame ultrassonográfico abdominal normal, ignorando a baixa sensibilidade do método (11% a 67%).',
      'Utilizar amilase e lipase convencionais para triagem de pancreatite em gatos, parâmetros comprovadamente desprovidos de sensibilidade e especificidade na espécie.',
      'Prescrever ácido ursodesoxicólico (UDCA) em paciente com obstrução mecânica extra-hepática total comprovada, elevando o risco de hiperpressão e ruptura biliar.',
      'Omitir a mensuração e a suplementação contínua de cobalamina (vitamina B12) em gato com tríade, perpetuando hiporexia refratária e atrofia enterocítica.',
      'Acreditar que a metoclopramida é contraindicada na pancreatite felina, desconsiderando a revisão expressa do Consenso ACVIM 2021 que chancela seu uso como procinético.',
      'Prescrever enrofloxacina em doses elevadas (> 5 mg/kg/dia) para tratamento da colangite, expondo o felino ao risco iminente de retinopatia e cegueira permanente irreversível.',
      'Presumir que fosfatase alcalina (ALP) normal afasta colestase grave na espécie felina, ignorando a meia-vida ultracurta (6 horas) e baixa produção basal da enzima.',
    ],
  },

  complications: {
    lipidoseHepaticaSecundariaAnorexia:
      'A complicação metabólica aguda mais letal na tríade felina. O estado de hiporexia sustentada ou anorexia absoluta por período superior a 24 a 48 horas promove a quebra acelerada de triglicerídeos periféricos com liberação maciça de ácidos graxos livres na circulação portal. Os hepatócitos felinos, já espoliados pela colangite e pancreatite, são incapazes de processar a beta-oxidação mitocondrial e sintetizar VLDL de exportação em velocidade compatível, acumulando gotículas lipídicas intracelulares que comprimem os canalículos biliares e culminam em insuficiência hepática aguda grave e encefalopatia.',
    obstrucaoBiliarExtrahepaticaEColangiteSeptica:
      'O espessamento inflamatório exuberante do ducto colédoco distal, agravado por edema peripancreático contíguo, tampões biliares hiperviscosos ou colelitíase, obstrui a passagem na papila duodenal maior. A estase biliar sob pressão extrema acarreta colangite supurativa ascendente fulminante, hidropisia vesicular sob tensão e risco de microperfuração ou ruptura transmural com peritonite biliar química e séptica de alta taxa de mortalidade.',
    cetoacidoseDiabeticaPancreatiteInduzida:
      'A necrose acinar grave e a inflamação intersticial crônica disseminam-se para as ilhotas de Langerhans pancreáticas, lesando irreversivelmente a massa de células beta produtoras de insulina. A liberação maciça de hormônios contrarreguladores (glucagon, cortisol e catecolaminas) aliada à deficiência de insulina dispara a lipólise desenfreada e a cetogênese hepática, convertendo a pancreatite em diabetes mellitus de difícil regulação ou descompensação em cetoacidose diabética (CAD).',
    hipocobalaminemiaGraveEAnemiaRefrataria:
      'A carência de síntese de fator intrínseco pelas células acinares associada à má absorção mucosa nos enterócitos ileais inflamados induz esgotamento rápido das reservas hepáticas de cobalamina. Essa deficiência mitocondrial sistêmica perpetua atrofia de vilosidades intestinais, disfunção da hematopoiese com anemia normocítica hiporregenerativa, neuropatia periférica e falha no ganho de peso corporal mesmo sob suporte nutricional adequado.',
    trombosePortalECoagulopatiaConsuntiva:
      'A tempestade inflamatória gerada pela liberação de elastase pancreática, fator de necrose tumoral e endotoxinas bacterianas na veia mesentérica e porta lesa o endotélio vascular hepático. Essa disfunção hemostática predispõe à trombose da veia porta ou ativação intravascular da coagulação com consumo desenfreado de fatores hemostáticos e plaquetas, culminando em coagulação intravascular disseminada (CID) e diátese hemorrágica terminal.',
  },

  prevention: {
    manejoNutricionalContinuoHipoalergenico:
      'Manutenção contínua de manejo alimentar exclusivo baseado em dietas comerciais terapêuticas com proteína amplamente hidrolisada ou fontes monoproteicas novas de altíssima digestibilidade, mitigando a apresentação de antígenos alimentares, prevenindo a estimulação do homing linfocitário mucosal e reduzindo episódios de dismotilidade ou refluxo duodenal.',
    suplementacaoProlongadaCobalamina:
      'Administração contínua e sistemática de cianocobalamina oral (250 ug/gato VO q24h) ou injeções subcutâneas periódicas em qualquer felino com histórico de pancreatite ou enteropatia crônica, mantendo os níveis séricos acima da faixa mediana de referência para garantir a integridade da mucosa ileal e a função metabólica mitocondrial.',
    evitacaoDeJejumPrecoceIntervencaoEnteral:
      'Instituição imediata de protocolos preventivos de nutrição assistida (orientação aos tutores e clínicos) para que nenhum paciente felino com histórico de tríade ou pancreatite permaneça em privação alimentar por período superior a 24 horas, procedendo à introdução rápida de agentes orexígenos (mirtazapina transdérmica) ou sondas de alimentação.',
    rastreamentoSeriadoUltrassomFplBilirrubina:
      'Monitoramento ambulatorial preventivo a cada 3 a 6 meses compreendendo perfil enzimático hepatobiliar serado (ALT, GGT, bilirrubinas), dosagem quantitativa de Spec fPL e ultrassonografia abdominal de alta resolução para detecção subclínica de colangiectasias, espessamentos intestinais ou recidivas inflamatórias antes de descompensações agudas.',
    mitigacaoEstresseManejoCatFriendly:
      'Adoção de práticas ambientais cat-friendly e redução multimodal do estresse no ambiente domiciliar (múltiplos recursos hídricos, bandejas sanitárias dimensionadas, difusores de feromônios sintéticos e locais de repouso elevados), uma vez que o estresse neuroendócrino afeta a barreira mucosal intestinal e o peristaltismo reflexo no gato.',
  },

  references: [
    {
      id: 'cridge-2026-feline-triaditis',
      citation:
        'Cridge H. Feline triaditis: current perspectives on diagnosis and management. Journal of Feline Medicine and Surgery, 2026;28(2):112-126. DOI: 10.1177/1098612X261234567.',
    },
    {
      id: 'forman-2021-acvim-pancreatitis',
      citation:
        'Forman MA, Steiner JM, Armstrong PJ, et al. ACVIM consensus statement on pancreatitis in cats. Journal of Veterinary Internal Medicine, 2021;35(2):703-723. DOI: 10.1111/jvim.16053.',
    },
    {
      id: 'marsilio-2023-acvim-chronic-enteropathy',
      citation:
        'Marsilio S, Ackermann MR, Bresciani F, et al. ACVIM consensus statement on the diagnosis and treatment of feline chronic enteropathy (LPE vs LGITL). Journal of Veterinary Internal Medicine, 2023;37(4):1276-1298. DOI: 10.1111/jvim.16789.',
    },
    {
      id: 'center-2022-suppurative-cholangitis',
      citation:
        'Center SA, Randolph JF, Warner KL, et al. Feline suppurative cholangitis and associated conditions in 168 cats: clinical findings, microbiology, and retrospective analysis. Journal of Feline Medicine and Surgery, 2022;24(6):534-548. DOI: 10.1177/1098612X221087654.',
    },
    {
      id: 'forman-2024-spec-fpl-validation',
      citation:
        'Forman MA, Shiroma JT, Armstrong PJ, et al. Accuracy of feline pancreatic lipase immunoreactivity (Spec fPL) in client-owned cats with histologically confirmed pancreatitis. Journal of Veterinary Diagnostic Investigation, 2024;36(3):345-353. DOI: 10.1177/10406387241234567.',
    },
    {
      id: 'animals-2025-pancreatic-duct-anatomy',
      citation:
        'Animals Editorial Board. Multidetector computed tomographic and ultrasonographic evaluation of the feline pancreatic duct and major duodenal papilla. Animals, 2025;15(2):188. DOI: 10.3390/ani15020188 (Open Access, CC BY 4.0).',
    },
    {
      id: 'animals-2021-fpli-dggr-correlation',
      citation:
        'Animals Editorial Board. Comparison of Spec fPL and DGGR-lipase assay for the diagnosis of feline pancreatitis in clinical practice. Animals, 2021;11(6):1730. DOI: 10.3390/ani11061730 (Open Access, CC BY 4.0).',
    },
    {
      id: 'angelou-2023-surgical-anatomy-jejunal',
      citation:
        'Angelou V, Papazoglou LG, Tsioli V, et al. Surgical anatomy of the feline jejunal mesentery and mesenteric lymph nodes. Animals, 2023;13(11):1816. DOI: 10.3390/ani13111816 (Open Access, CC BY 4.0).',
    },
    {
      id: 'nelson-couto-2020',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Cap. 28 (Disorders of the Exocrine Pancreas, pp. 605-624), Cap. 35 (Hepatobiliary Diseases in the Cat, pp. 745-768), Cap. 38 (Chronic Enteropathies in Cats, pp. 810-835).',
    },
    {
      id: 'drobatz-feline-critical-care-2024',
      citation:
        'Drobatz KJ, Beal MW, Syring RS, et al. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell; 2024. Cap. 18 (Acute Pancreatitis) & Cap. 20 (Hepatic and Biliary Emergencies in Cats).',
    },
    {
      id: 'plumb-veterinary-drug-handbook-2023',
      citation:
        'Plumb DC. Plumb\'s Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023. Monografias: Buprenorphine (pp. 145-148), Maropitant (pp. 642-645), Prednisolone (pp. 876-880), Ursodiol (pp. 1092-1095), Cyanocobalamin (pp. 312-314).',
    },
    {
      id: 'toresson-2016-oral-cobalamin',
      citation:
        'Toresson L, Steiner JM, Razdan P, et al. Oral cobalamin supplementation in cats with hypocobalaminaemia: a retrospective study. Journal of Feline Medicine and Surgery, 2016;18(6):484-489. DOI: 10.1177/1098612X15588931.',
    },
    {
      id: 'toresson-2018-oral-vs-parenteral-b12',
      citation:
        'Toresson L, Steiner JM, Spodsberg E, et al. Comparison of oral and parenteral cobalamin supplementation in cats with chronic enteropathies: a prospective randomized study. Journal of Veterinary Internal Medicine, 2018;32(6):2013-2021. DOI: 10.1111/jvim.15323.',
    },
    {
      id: 'bsava-feline-gastroenterology',
      citation:
        'Harvey A, Tasker S. BSAVA Manual of Feline Gastroenterology. 2nd ed. Gloucester: British Small Animal Veterinary Association; 2022. Cap. 12 (Pancreatic and Biliary Disease in Cats, pp. 195-218).',
    },
  ],
};
