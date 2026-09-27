import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const platinosomoseFelinaSeed: DiseaseRecord = {
  id: 'disease-platinosomose-felina',
  slug: 'platinosomose-felina',
  title: 'Platinosomose Felina',
  subtitle:
    'Trematodíase hepatobiliar por Platynosomum illiciens (sin. P. fastosum), colangite crônica, hiperplasia adenomatosa ductal, colestase obstrutiva e abordagem diagnóstica e terapêutica contemporânea',
  synonyms: [
    'Platinossomíase felina',
    'Platinosomiase',
    'Platynosomose',
    'Lizard poisoning',
    'Infecção por Platynosomum illiciens',
    'Infecção por Platynosomum fastosum',
    'Colangite parasitária felina',
    'Trematodíase biliar do gato',
  ],
  species: ['cat'],
  category: 'gastroenterologia',
  categories: ['gastroenterologia', 'medicina-felina', 'infecciosas', 'urgencia-emergencia'],
  tags: [
    'Platynosomum',
    'vias biliares',
    'colangite',
    'icterícia',
    'colecistocentese',
    'praziquantel',
    'Sheather',
    'eosinofilia',
    'UFMG 2014',
    'UNESP 2025',
    'felinos',
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['platinosomose-felina'],

  figures: [
    {
      url: '/consulta-vet/platinosomose-felina/ovos-platynosomum-fezes-chantawong2024.png',
      legend:
        'Figura 1 — Ovos operculados, castanho-amarelados e elípticos de Platynosomum illiciens observados em microscopia óptica de sedimento fecal felino. Nota-se a morfologia dicrocelídea característica com embrião granular interno maduro. Adaptado de Chantawong et al. (2024), Animals, sob licença CC BY 4.0.',
      caption:
        'Morfologia microscópica diagnóstica de ovos de Platynosomum illiciens em amostra fecal felina.',
      source: 'Chantawong et al. (2024). DOI: 10.3390/ani14071065 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/platinosomose-felina/parasito-adulto-platynosomum-lathroum2018.png',
      legend:
        'Figura 2 — Exemplar adulto de Platynosomum illiciens / P. fastosum recuperado da árvore biliar de gato naturalmente infectado após necropsia diagnóstica. Evidenciam-se o corpo foliáceo, ventosas oral e ventral bem desenvolvidas e morfologia interna típica de trematódeo digenético. Adaptado de Lathroum et al. (2018), Veterinary Sciences, sob licença CC BY 4.0.',
      caption:
        'Morfologia macro e microscópica do trematódeo adulto de Platynosomum illiciens.',
      source: 'Lathroum et al. (2018). DOI: 10.3390/vetsci5020035 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/platinosomose-felina/painel-clinico-colecistocentese-sousa2025.jpg',
      legend:
        'Figura 3 — Painel clínico-patológico completo da platinosomose felina no Brasil. (A-B) Apresentação clínica com icterícia intensa de mucosas e distensão abdominal. (C) Ultrassonografia evidenciando vesícula e ductos biliares dilatados com paredes espessadas e debris ecogênicos. (D) Procedimento de colecistocentese percutânea ecoguiada. (E) Ovo operculado de Platynosomum spp. aspirado diretamente da bile. (F) Resolução parcial das dilatações após terapia. Adaptado de Sousa et al. (2025), Ciência Rural, sob licença CC BY 4.0.',
      caption:
        'Painel clínico, ultrassonográfico e intervencionista com colecistocentese e recuperação de ovos biliares.',
      source: 'Sousa et al. (2025). DOI: 10.1590/0103-8478cr20240194 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/platinosomose-felina/comparacao-laboratorial-eosinofilos-chantawong2024.png',
      legend:
        'Figura 4 — Comparação gráfica em box-plot dos marcadores séricos (ALT, ALP e contagem absoluta de eosinófilos) entre gatos infectados por Platynosomum illiciens e felinos controle negativos. Demonstração de elevação estatisticamente significativa de eosinófilos (p < 0,05) nos gatos parasitados, enquanto ALT e ALP apresentaram ampla sobreposição. Adaptado de Chantawong et al. (2024), Animals, sob licença CC BY 4.0.',
      caption:
        'Avaliação comparativa de ALT, ALP e contagem de eosinófilos demonstrando a relevância da eosinofilia.',
      source: 'Chantawong et al. (2024). DOI: 10.3390/ani14071065 (Open Access, CC BY 4.0).',
    },
  ],

  quickSummary:
    'A platinosomose felina é uma trematodíase hepatobiliar causada pelo dicrocelídeo Platynosomum illiciens (sinonímia taxonômica consagrada: Platynosomum fastosum e Platynosomum concinnum), parasito que habita primariamente a luz dos ductos biliares intra e extra-hepáticos e a vesícula biliar de gatos em regiões tropicais e subtropicais. A infecção ocorre pela ingestão de hospedeiros intermediários secundários (isópodes terrestres / tatuzinhos-de-jardim, comprovados experimentalmente pela UFMG em 2014) ou hospedeiros paratênicos vertebrados (lagartos, geckos e anfíbios). A presença física dos vermes e seus antígenos desencadeia colangite mecânica e imunomediada, hiperplasia adenomatosa ductal exuberante, fibrose periductal progressiva, colangiectasia e colestase mista (hepática e pós-hepática), podendo culminar em obstrução biliar completa e cirrose biliar terminal. O diagnóstico constitui um desafio clínico notório: o exame coproparasitológico convencional (flotação simples) apresenta elevada taxa de falsos-negativos devido à baixa e intermitente eliminação de ovos pesados e à retenção por estase biliar. O protocolo coprológico de escolha fundamenta-se na dupla centrifugação com solução de Sheather de alta densidade (SG 1,28); nos casos graves com coproparasitológico negativo, a colecistocentese percutânea ecoguiada com identificação direta de ovos na bile atua como padrão ouro propedêutico, desde que respeitados critérios de segurança hemostática e ausência de risco iminente de ruptura vesicular. O tratamento de escolha é o praziquantel em regimes de doses elevadas (como 30 mg/kg VO q24h por 5 a 10 dias, uso extra-label preconizado no Plumb\'s 10ª ed.), associado a suporte intensivo, nutrição enteral precoce para prevenção de lipidose hepática, ácido ursodesoxicólico e descompressão cirúrgica nos pacientes com obstrução mecânica refratária.',

  quickDecisionStrip: [
    'A platinosomose é primariamente uma doença dos ductos biliares e da vesícula; o comprometimento de hepatócitos é secundário à colestase mecânica crônica.',
    'Não pergunte apenas se o gato come lagartixa: tatuzinhos-de-jardim (isópodes terrestres) são hospedeiros intermediários comprovados e transmitem a doença em quintais.',
    'Exame coproparasitológico simples negativo NÃO descarta platinosomose: a estase e obstrução biliar impedem a chegada dos ovos ao duodeno.',
    'Solicite especificamente dupla centrifugação em solução de Sheather de alta densidade (SG 1,28) e colete amostras fecais seriadas em dias alternados.',
    'A concentração de ovos na bile é até 30 vezes maior que nas fezes; a colecistocentese guiada por ultrassom é uma ferramenta de alta acurácia nos casos inconclusivos.',
    'Avalie coagulograma (PT, aPTT) e integridade da parede vesicular antes de realizar colecistocentese: obstrução total e friabilidade da parede contraindicam a punção.',
    'Fosfatase alcalina (ALP) normal ou pouco elevada NÃO exclui colestase importante no gato devido à baixa produção basal e meia-vida ultracurta da enzima na espécie.',
    'A dose convencional de praziquantel para tênias (5 mg/kg) é ineficaz para erradicar Platynosomum nos ductos biliares; use doses elevadas sob supervisão clínica.',
    'Melhora clínica e negativação fecal após tratamento não comprovam cura parasitológica: vermes vivos podem persistir na luz ductal profunda (Lathroum et al., 2018).',
    'Nunca estimule a contração biliar com ácido ursodesoxicólico em felinos com obstrução mecânica extra-hepática completa comprovada sem descompressão prévia.',
  ],

  quickSummaryRich: {
    lead: 'A platinosomose felina é uma colangite parasitária crônica e proliferativa provocada pelo trematódeo Platynosomum illiciens, caracterizada por hiperplasia adenomatosa biliar, fibrose periductal, colestase e icterícia mista, exigindo métodos coprológicos de alta densidade ou análise direta de bile para confirmação e esquemas intensivos de praziquantel.',
    leadHighlights: [
      'Platynosomum illiciens (sin. P. fastosum)',
      'Isópodes terrestres e lagartixas paratênicas',
      'Colangite e hiperplasia adenomatosa ductal',
      'Icterícia hepática e pós-hepática',
      'Dupla centrifugação com Sheather (SG 1,28)',
      'Colecistocentese diagnóstica ecoguiada',
      'Praziquantel em doses intensivas (Plumb\'s 10ª ed.)',
      'Risco de lipidose hepática por anorexia',
    ],
    pillars: [
      {
        title: 'Ciclo Biológico e Vias de Infecção Atualizadas',
        body: 'Superação do ciclo clássico simplificado: experimentos da UFMG (Pinto et al., 2014) demonstraram que caracóis terrestres (Subulina octona) atuam como 1º hospedeiro intermediário, isópodes Oniscidea (tatuzinhos-de-jardim) como 2º hospedeiro intermediário infectante, e lagartos/geckos funcionam como hospedeiros paratênicos bioacumuladores.',
        highlights: ['Subulina octona', 'Isópodes terrestres', 'Lagartixas paratênicas', 'Precocidade tecidual em 3 semanas'],
      },
      {
        title: 'Fisiopatologia dos Ductos Biliares e Colestase',
        body: 'O parasito instala-se fisicamente no lúmen dos ductos biliares e vesícula biliar. A fricção das ventosas e antígenos do tegumento desencadeiam colangite crônica, hiperplasia epitelial adenomatosa, fibrose periductal cicatricial e colangiectasia tortuosa, gerando colestase progressiva, icterícia obstrutiva e lesão hepatocitária secundária por citotoxicidade de ácidos biliares.',
        highlights: ['Colangite proliferativa', 'Hiperplasia adenomatosa', 'Fibrose periductal', 'Icterícia obstrutiva'],
      },
      {
        title: 'Desafios Diagnósticos Propedêuticos: Fezes vs Bile',
        body: 'Flotação convencional com sulfato de zinco ou NaCl frequentemente falha. A técnica de dupla centrifugação com solução de Sheather de alta densidade (SG 1,28) atinge 97,1% de sensibilidade aparente comparativa. Em pacientes com ductos dilatados e fezes negativas, a colecistocentese percutânea ecoguiada revela concentração de ovos até 30 vezes superior à fecal.',
        highlights: ['Centrifugação Sheather SG 1,28', 'Colecistocentese ecoguiada', 'Ovos operculados pesados', 'Armadilha da ALP felina'],
      },
      {
        title: 'Terapêutica Antiparasitária e Suporte Crítico',
        body: 'O praziquantel é o fármaco de eleição, mas esquemas tradicionais de dose única de 5 mg/kg falham em eliminar vermes adultos na árvore biliar. Preconizam-se regimes de 20 mg/kg a 30 mg/kg VO por períodos estendidos de 5 a 10 dias (Plumb\'s 10ª ed.), associados a suporte enteral precoce contra lipidose hepática, antieméticos, coleréticos e desobstrução mecânica quando indicada.',
        highlights: ['Praziquantel 30 mg/kg VO (Plumb\'s)', 'Prevenção de lipidose', 'Ácido ursodesoxicólico', 'Descompressão cirúrgica'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Recomendado',
      steps: [
        {
          label: 'Etapa 1: Suspeição Epidemiológica e Tríade Clínica',
          timing: 'Imediato no atendimento',
          detail:
            'Identificação de acesso a quintais, caça de artrópodes ou répteis em região tropical/subtropical, associada à presença de icterícia mucocutânea, perda de peso, vômitos e hiporexia.',
        },
        {
          label: 'Etapa 2: Triagem Laboratorial Mínima e Hemograma',
          timing: 'Primeiras 2 a 4 horas',
          detail:
            'Hemograma completo evidenciando eosinofilia marcante (resposta Th2 helmíntica), associada à dosagem de ALT, AST, GGT, ALP, bilirrubinas total e frações, albumina e urinálise com pesquisa de bilirrubinúria.',
        },
        {
          label: 'Etapa 3: Ultrassonografia Hepatobiliar Avançada',
          timing: 'Primeiras 12 a 24 horas',
          detail:
            'Mapeamento da vesícula biliar (espessamento parietal, conteúdo particulado/sludge), dilatação e tortuosidade de ductos intra e extra-hepáticos (colangiectasia), ecotextura parenquimatosa e exclusão de massas compressivas.',
        },
        {
          label: 'Etapa 4: Coproparasitológico de Alta Densidade (Sheather)',
          timing: 'Amostras seriadas em dias alternados',
          detail:
            'Execução sistemática de dupla centrifugação com solução saturada de açúcar de Sheather (densidade 1,28 g/mL) para recuperação de ovos operculados densos (20-35 x 34-50 µm).',
        },
        {
          label: 'Etapa 5: Colecistocentese Ecoguiada e Análise Biliar',
          timing: 'Casos com fezes negativas e suspeita persistente',
          detail:
            'Avaliação prévia de coagulograma (PT, aPTT); punção trans-hepática estéril da vesícula biliar sob visão ecográfica contínua para pesquisa citológica de ovos, citologia inflamatória e cultura microbiológica com antibiograma.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo Terapêutico e Manejo',
      steps: [
        {
          label: 'Fase 1: Estabilização de Emergência e Suporte Inicial',
          timing: 'Imediato no internamento',
          detail:
            'Correção criteriosa de desidratação e distúrbios eletrolíticos com fluidoterapia balanceada; controle de náusea e vômitos com maropitant (1 mg/kg SC/IV q24h) ou ondansetrona (0,5 mg/kg IV q8-12h).',
        },
        {
          label: 'Fase 2: Suporte Nutricional Precoce e Hepaproteção',
          timing: 'Primeiras 12 a 24 horas',
          detail:
            'Veto absoluto a jejum prolongado para bloquear a mobilização periférica de ácidos graxos e prevenir lipidose hepática secundária; instalação de sonda nasoesofágica ou esofagostomia se hiporexia superior a 48 horas.',
        },
        {
          label: 'Fase 3: Farmacoterapia Específica com Praziquantel',
          timing: 'Após estabilização metabólica',
          detail:
            'Instituição de praziquantel na dose preconizada pelo compêndio Plumb\'s 10ª ed. (30 mg/kg VO a cada 24 horas por 5 a 10 dias consecutivos), com monitoramento de tolerância gástrica e suporte antiemético prévio.',
        },
        {
          label: 'Fase 4: Terapia Adjuvante e Modulação do Fluxo Biliar',
          timing: 'Manutenção ambulatorial',
          detail:
            'Ácido ursodesoxicólico (UDCA, 10 a 15 mg/kg VO q24h junto ao alimento) para promover efeito colerético hidrofílico e citoprotetor, estritamente após confirmação de patência mecânica ductal.',
        },
        {
          label: 'Fase 5: Acompanhamento Seriando e Monitoramento',
          timing: 'Reavaliações a cada 15 a 30 dias',
          detail:
            'Perfil enzimático hepatobiliar seriado (ALT, AST, GGT, bilirrubinas), ultrassonografia abdominal de controle e coproparasitológico seriado com Sheather, alertando o tutor quanto à possível persistência de lesões fibróticas crônicas residuais.',
        },
      ],
    },
  },

  etiology: {
    definicaoENomenclaturaTaxonomica:
      'A platinosomose (ou platinossomíase felina) é uma afecção parasitária dos ductos biliares e vesícula biliar de gatos domésticos e outros felídeos, decorrente da infestação pelo trematódeo digenético Platynosomum illiciens (família Dicrocoeliidae). Historicamente, grande parte da literatura veterinária clínica e tratados clássicos consagraram as denominações Platynosomum fastosum e Platynosomum concinnum. Contudo, estudos morfológicos e moleculares comparativos integrando marcadores nucleares (ITS2) e mitocondriais (cox1) demonstraram que os espécimes isolados de gatos domésticos, primatas neotropicais e répteis nas Américas, Caribe e Ásia pertencem à mesma entidade taxonômica válida, priorizando-se o táxon Platynosomum illiciens (Pinto et al., 2014; Chantawong et al., 2024). A enfermidade é classicamente uma doença da espécie felina; embora primatas não humanos e outros mamíferos carnívoros possam albergar formas adultas em ambientes silvestres, a platinosomose não é descrita como enfermidade clínica primária em cães domésticos.',

    tabelaCicloBiologicoEHospedeiros: {
      kind: 'clinicalTable',
      title: 'Tabela 1 — Ciclo Biológico Estruturado de Platynosomum illiciens, Hospedeiros e Vias de Infecção Felina',
      columns: [
        { key: 'stage', label: 'Etapa do Ciclo' },
        { key: 'host', label: 'Hospedeiro Envolvido' },
        { key: 'parasiteForm', label: 'Forma Parasitária' },
        { key: 'clinicalRole', label: 'Papel Biológico e Implicação Clínica' },
      ],
      rows: [
        {
          stage: '1. Eliminação Ambiental',
          host: 'Gato doméstico (Felis catus)',
          parasiteForm: 'Ovos operculados embrionados',
          clinicalRole:
            'Gatos infectados eliminam ovos maduros na bile, que alcançam o duodeno e são expelidos nas fezes; período pré-patente médio de 8 a 12 semanas.',
        },
        {
          stage: '2. Primeiro Hospedeiro Intermediário',
          host: 'Caracol terrestre (ex: Subulina octona)',
          parasiteForm: 'Miracídio -> Esporocistos -> Cercárias',
          clinicalRole:
            'Ingestão dos ovos pelo molusco terrestre; multiplicação assexuada e liberação de cercárias no ambiente ou em secreções mucosas do caracol.',
        },
        {
          stage: '3. Segundo Hospedeiro Intermediário',
          host: 'Isópodes terrestres (tatuzinhos-de-jardim / Oniscidea)',
          parasiteForm: 'Metacercárias encistadas infectantes',
          clinicalRole:
            'Comprovado experimentalmente pela UFMG (Pinto et al., 2014); a ingestão de isópodes contendo metacercárias infecta diretamente o gato sem necessidade de réptil.',
        },
        {
          stage: '4. Hospedeiro Paratênico (Opcional)',
          host: 'Lagartos, geckos (lagartixas-de-parede), anfíbios',
          parasiteForm: 'Metacercárias viáveis encistadas',
          clinicalRole:
            'O réptil ingere o isópode ou caracol e acumula metacercárias em seus tecidos; atua como vetor paratênico bioacumulador altamente atrativo para a caça felina.',
        },
        {
          stage: '5. Infecção Definitiva e Maturação',
          host: 'Gato doméstico (Felis catus)',
          parasiteForm: 'Metacercária excistada -> Verme adulto',
          clinicalRole:
            'Excistamento no duodeno, migração retrógrada pela papila duodenal maior para ductos biliares e vesícula; longevidade adulta de vários anos.',
        },
      ],
    },

    cicloBiologicoAtualizadoUFMG:
      'Por décadas, os livros-texto de medicina interna veterinária reproduziram o conceito clássico de que o ciclo biológico da platinosomose exigia estritamente um lagarto como segundo hospedeiro intermediário obrigatório ("doença do envenenamento por lagartixa" ou lizard poisoning). Essa visão foi formalmente reformulada pelos estudos experimentais pioneiros conduzidos na Universidade Federal de Minas Gerais (UFMG) por Pinto, Mati e Melo (2014). Os pesquisadores comprovaram que caracóis terrestres (como Subulina octona na América do Sul) atuam como primeiros hospedeiros intermediários e que isópodes terrestres da ordem Oniscidea (tatuzinhos-de-jardim) funcionam como segundos hospedeiros intermediários verdadeiros, albergando metacercárias plenamente infectantes. Os lagartos e geckos que predam esses isópodes funcionam como hospedeiros paratênicos (de transporte e bioacumulação). A relevância clínica dessa descoberta é profunda: um felino que vive em ambiente peridomiciliar ou quintal pode ingerir tatuzinhos-de-jardim ou outros pequenos artrópodes terrestres e desenvolver platinosomose grave, mesmo que o tutor garanta que o animal nunca teve contato visível com lagartixas de parede. Portanto, anamneses restritas à pergunta "ele caça lagartixas?" são tecnicamente falhas e insuficientes.',

    epidemiologiaGlobalEPrevalenciaBrasil:
      'A platinosomose apresenta distribuição endêmica em regiões tropicais e subtropicais do globo, concentrando-se na América Central, bacia do Caribe, América do Sul e Sudeste Asiático. A meta-análise global conduzida por Silva, Feitosa e Vilela (2023), compilando 73 publicações internacionais, estimou uma prevalência agrupada mundial de aproximadamente 17,8%, revelando expressiva heterogeneidade geográfica, com taxas significativamente superiores na América Central em comparação com a América do Sul. No Brasil, a infecção possui relevância epidemiológica consolidada em praticamente todas as macrorregiões, associada a condições climáticas favoráveis à proliferação de moluscos e artrópodes. A prevalência observada varia drasticamente conforme a população estudada: enquanto amostras de gatos com acesso livre à rua ou animais errantes podem exibir prevalências de 20% a mais de 50% em estudos de necropsia, a taxa em gatos domiciliados com manejo indoor rigoroso é substancialmente menor. Séries clínicas brasileiras recentes (Sato et al., 2025 na UNESP; Sousa et al., 2025 na UFSM) documentam pacientes atendidos em hospitais veterinários universitários com icterícia exuberante, vômitos e colangite obstrutiva, reforçando que o parasito deve integrar a lista de diagnósticos diferenciais prioritários de qualquer hepatopatia colestática felina em território nacional.',

    anatomiaBiliarFelinaEPatogenia:
      'Para compreender a vulnerabilidade ímpar do gato à platinosomose e suas complicações, é imperativo analisar a neuroanatomia e a morfologia das vias biliares felinas. Na espécie felina, o ducto pancreático principal funde-se intimamente com o ducto biliar comum (colédoco) antes de desembocar na papila duodenal maior em aproximadamente 80% a 90% dos animais. Essa confluência anatômica única cria uma via de comunicação direta entre os sistemas hepatobiliar, pancreático e intestinal. O trematódeo adulto de Platynosomum illiciens aloja-se fisicamente no interior dos ductos biliares intra-hepáticos de pequeno e médio calibre, ductos hepáticos principais, ducto colédoco e no lúmen da vesícula biliar. A permanência do helminto nesse sistema tubular delicado desencadeia agressão mecânica por suas ventosas de fixação e agressão química por subprodutos metabólicos excretórios. A resposta do epitélio biliar felino consiste em hiperplasia e inflamação crônica; a estase e a tumefação resultantes não apenas comprometem o fluxo biliar, como elevam a pressão retrógrada e facilitam o refluxo de bile e bactérias para o ducto pancreático, explicando a ocorrência concomitante ocasional de colangite, pancreatite e doença inflamatória intestinal (a clássica tríade felina).',
  },

  epidemiology: {
    distribuicaoGeograficaEMetaAnaliseSilva2023:
      'A epidemiologia descritiva da platinosomose foi detalhadamente sintetizada na revisão sistemática com meta-análise de Silva, Feitosa e Vilela (2023). A análise demonstrou que a prevalência não reflete uma média homogênea, mas sim agregados hiperendêmicos determinados pela densidade de hospedeiros intermediários e pelo manejo dos animais. Regiões com clima quente e úmido mantêm o ciclo ativo durante todo o ano. Um ponto crítico evidenciado pela literatura é a discrepância metodológica entre estudos de necropsia (que examinam a árvore biliar sob dissecção direta e atingem alta sensibilidade) e estudos baseados em exames coprológicos convencionais (que subestimam grosseiramente a prevalência real devido à baixa taxa de detecção fecal).',

    fatoresDeRiscoEPerfilComportamentalPredatorio:
      'O principal fator de risco individual associado à aquisição de Platynosomum illiciens é o comportamento predatório ativo combinado ao acesso não supervisionado a quintais, telhados, jardins ou áreas externas. Gatos adultos jovens e maduros exibem maior prevalência acumulada em decorrência do tempo de exposição ao ambiente infectado. Gatos machos não castrados historicamente apresentam maior risco epidemiológico associado ao hábito de perambulação territorial. A ausência de programas regulares de controle parasitário com fármacos dotados de ação trematodicida também atua como fator predisponente, embora vermífugos comerciais de rotina à base de pamoato de pirantel ou doses baixas de praziquantel não confiram proteção preventiva contra o parasito.',

    coortesClinicasBrasileirasUNESPEUFSM:
      'Em 2025, duas publicações brasileiras trouxeram contribuições fundamentais para a rotina clínica da platinosomose: (1) O estudo de Sato et al. (2025), realizado no Hospital Veterinário da UNESP, avaliou detalhadamente seis felinos naturalmente infectados, demonstrando que 100% dos animais possuíam histórico de acesso externo ou comportamento predatório e que os sinais predominantes incluíram icterícia (83%), desidratação (83%), apatia (83%), vômitos (67%) e perda ponderal (50%), com elevação média acentuada de ALT (331 U/L) e discreta de GGT (15 U/L). (2) O relato de Sousa et al. (2025), da Universidade Federal de Santa Maria (UFSM), documentou um paciente felino com colangite obstrutiva grave, no qual múltiplos exames coproparasitológicos pela técnica de Willis-Mollay resultaram inconclusivos, sendo o diagnóstico etiológico firmado com sucesso por colecistocentese percutânea ecoguiada, demonstrando a superioridade da pesquisa biliar em casos obstrutivos na rotina hospitalar brasileira.',
  },

  pathogenesisTransmission: {
    cascata: [
      'Ingestão do hospedeiro infectado: O felino consome isópodes terrestres (tatuzinhos-de-jardim) contendo metacercárias ou predita hospedeiros paratênicos (lagartixas, geckos, pequenos anfíbios) que bioacumularam formas encistadas.',
      'Excistamento duodenal e migração biliar: Os sucos gástrico e pancreático digerem os cistos no duodeno; a metacercária livre migra ativamente através da papila duodenal maior em direção cranial pelo ducto colédoco, alcançando os ductos biliares intra-hepáticos e a vesícula biliar em poucos dias.',
      'Agressão epitelial precoce e recrutamento inflamatório: Entre a 2ª e a 3ª semana pós-infecção, o traumatismo físico pelas ventosas oral e ventral e a liberação de antígenos parasitários provocam erosões epiteliais, edema mural e infiltrado inflamatório periductal rico em eosinófilos e neutrófilos, precedendo a eliminação de ovos nas fezes.',
      'Hiperplasia adenomatosa epitelial e remodelamento tecidual: A irritação antigênica contínua induz hipertrofia e proliferação desordenada dos colangiócitos, formando invaginações adenomatosas papilares na parede ductal associadas à hipersecreção de muco viscoso.',
      'Fibrose concêntrica periductal e colangiectasia: A inflamação crônica estimula miofibroblastos periportais a depositar colágeno em anéis concêntricos (pericolangite fibrosante); os ductos perdem sua complacência elástica e sofrem dilatação cística tortuosa compensatória (colangiectasia).',
      'Colestase mecânica e citotoxicidade de ácidos biliares: O acúmulo de vermes adultos, muco espesso, debris celulares e estenose fibrótica obstrui o fluxo livre da bile. A bile estagnada e os sais biliares hidrofóbicos retidos rompem a integridade das membranas dos hepatócitos vizinhos, gerando necrose periportal secundária e extravasamento de transaminases (ALT/AST).',
      'Insuficiência hepatobiliar e cirrose biliar terminal: Em infecções crônicas maciças não tratadas, a persistência de pontes de fibrose interlobares, hipertensão portal pré-senusoidal e perda progressiva de massa funcional parenquimatosa culminam em cirrose biliar, insuficiência hepática terminal, ascite e coagulopatia.',
    ],
    transmissao:
      'A platinosomose é uma enfermidade estritamente heteroxênica, não contagiosa por contato direto entre gatos ou por ingestão direta de fezes contaminadas. A transmissão exige obrigatoriamente a passagem do parasito por moluscos terrestres (hospedeiro primário) e artrópodes isópodes (hospedeiro secundário), com eventual amplificação em répteis paratênicos.',
  },

  pathophysiology: {
    cineticaPatogenicaEHiperplasiaDuctal:
      'A marca anatomopatológica distintiva de Platynosomum illiciens reside na intensa reação proliferativa que o parasito deflagra no epitélio dos ductos biliares. Ao contrário de hepatopatias tóxicas ou metabólicas difusas, a lesão inicial é primariamente uma colangite epitelial e periductal. Estudos histopatológicos clássicos e contemporâneos (Campos-Camacho et al., 2026; Köster et al., 2016) demonstram que colangiócitos sob irritação mecânica sofrem mitoses repetidas, resultando em hiperplasia epitelial adenomatosa exuberante, que se projeta em dobras papilares volumosas para o interior do lúmen biliar. Essas projeções, combinadas com a hipersecreção de muco pelas glândulas periductais e a presença física dos próprios trematódeos adultos (que medem de 4 a 8 mm de comprimento por 1,5 a 2,5 mm de largura), promovem o estreitamento luminal crítico e criam microambientes de estase e deposição de debris proteicos e biliares.',

    colestaseFibroseEColangiectasia:
      'Com o prolongamento da infecção por meses ou anos, a resposta tecidual transita de um padrão inflamatório misto (eosinofílico e neutrofílico) para uma fibroplasia periductal densa e irreversível. O tecido conjuntivo fibroso deposita-se em anéis concêntricos ao redor dos ductos portais (padrão em "casca de cebola"), impedindo a dilatação fisiológica durante a contração vesicular. Para acomodar a produção contínua de bile contra um segmento distal estenosado, os ductos biliares proximais intra-hepáticos sofrem ectasia pronunciada, assumindo conformação sacular, cística e tortuosa (colangiectasia). A retenção prolongada de bile sob pressão causa refluxo canalicular de bilirrubina conjugada e ácidos biliares para os sinusoides hepáticos. Os ácidos biliares retidos exercem potente ação detergente sobre as bicamadas lipídicas dos hepatócitos, desencadeando peroxidação lipídica, disfunção mitocondrial e apoptose celular, convertendo uma colangite inicialmente pura em uma colangio-hepatite mista com destruição do parênquima hepático.',

    mecanismoDaIctericiaHepaticaPosHepatica:
      'A icterícia observada na platinosomose felina possui fisiopatologia combinada (hepática e pós-hepática/obstrutiva), distinguindo-se claramente das icterícias pré-hepáticas causadas por hemólise (como no micoplasma hemotrópico ou anemia hemolítica imunomediada). A fração predominante de bilirrubina circulante é a bilirrubina direta (conjugada com ácido glicurônico pelo hepatócito). Como o fluxo pelos ductos colédoco e biliares principais encontra-se mecanicamente restringido pela massa parasitária, muco e fibrose luminal, a bilirrubina conjugada não consegue alcançar o lúmen duodenal e extravasa por refluxo canalicular para a microcirculação sinusoidal e capilares linfáticos hepáticos. O depósito progressivo nos tecidos ricos em elastina (esclera, palato mole, base da orelha e pele desprovida de pigmento) gera a icterícia clínica visível assim que as concentrações séricas de bilirrubina total ultrapassam 1,5 a 2,0 mg/dL.',

    associacaoComColangiocarcinoma:
      'Um dos tópicos de maior relevância anatomopatológica reside na associação entre infecção biliar crônica por Platynosomum e a emergência de neoplasias malignas do epitélio biliar (colangiocarcinoma). O estudo retrospectivo de Andrade et al. (2012) avaliou 348 gatos necropsiados e identificou 11 felinos parasitados por Platynosomum, dos quais três apresentavam colangiocarcinoma associado e seis exibiam displasia e hiperplasia atípica do epitélio biliar. A base biológica dessa associação assemelha-se à oncogênese descrita em humanos infectados por outros trematódeos biliares (Opisthorchis viverrini e Clonorchis sinensis): a irritação mecânica de anos, a produção crônica de óxido nítrico e espécies reativas de oxigênio por neutrófilos e macrófagos, e o estímulo mitogênico contínuo induzem instabilidade genômica, mutações somáticas e transformação neoplásica. Todavia, como enfatizado no tratado Withrow & MacEwen\'s Small Animal Clinical Oncology (6ª ed., Cap. 23, pp. 455-456), o colangiocarcinoma felino também ocorre rotineiramente em áreas não endêmicas para trematódeos; portanto, Platynosomum atua como um potente promotor inflamatório crônico, mas não constitui a causa única ou obrigatória da neoplasia.',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'Sinais Hepatobiliares e Colestáticos (Predomínio Primário)',
      findings: [
        {
          finding: 'Icterícia mucocutânea e escleral evidente',
          mechanism:
            'Extravasamento sinusoidal e acúmulo sistêmico de bilirrubina conjugada decorrente de colestase mecânica e obstrução ao fluxo biliar nos ductos dilatados.',
          clinicalMeaning:
            'Achado semiológico cardeal da doença; visível precocemente na esclera ocular e mucosa oral assim que a bilirrubina sérica total supera 1,5 a 2,0 mg/dL.',
          priority: 'emergency',
        },
        {
          finding: 'Hepatomegalia palpável e margem hepática romba',
          mechanism:
            'Hipertrofia inflamatória parenquimatosa, estase biliar difusa em canalículos e dilatação cística acentuada dos ductos biliares intra-hepáticos.',
          clinicalMeaning:
            'Fígado palpável ultrapassando a última costela cranial à palpação abdominal; frequentemente doloroso nos episódios agudos de colangite.',
          priority: 'common',
        },
        {
          finding: 'Vômitos agudos ou intermitentes crônicos',
          mechanism:
            'Estímulo quimiorreceptor na zona de gatilho do tronco encefálico por metabólitos tóxicos retidos e irritação vagal reflexa por distensão da cápsula hepática e vesícula biliar.',
          clinicalMeaning:
            'Presente em 50% a 70% dos gatos sintomáticos; pode ser mucoso ou bilioso, acelerando desidratação e perda eletrolítica.',
          priority: 'common',
        },
        {
          finding: 'Hiporexia e anorexia progressiva',
          mechanism:
            'Ação de citocinas inflamatórias (TNF-alfa, IL-1, IL-6) nos centros hipotalâmicos de apetite e náusea subclínica crônica por disfunção biliar.',
          clinicalMeaning:
            'Alerta clínico crítico em gatos: jejum prolongado superior a 48-72 horas deflagra mobilização periférica maciça de triglicerídeos e lipidose hepática fatal.',
          priority: 'emergency',
        },
        {
          finding: 'Perda ponderal e definhamento corporal',
          mechanism:
            'Má digestão de lipídios luminais por deficiência de bile entérica, combinada a catabolismo proteico sistêmico e hiporexia contínua.',
          clinicalMeaning:
            'Evolui insidiosamente em animais com infecção crônica moderada; a perda de massa muscular epaxial pode mascarar hepatomegalia palpável.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'Comprometimento Sistêmico e Marcadores Laboratoriais',
      findings: [
        {
          finding: 'Eosinofilia periférica absoluta e tecidual',
          mechanism:
            'Resposta imunológica humoral e celular polarizada padrão Th2 contra antígenos glicídicos e proteicos do tegumento do trematódeo e migração tecidual.',
          clinicalMeaning:
            'Marcador laboratorial de alta relevância epidemiológica; significativamente mais elevado em gatos parasitados (Chantawong et al., 2024), mas pode ausentar-se na fibrose crônica.',
          priority: 'common',
        },
        {
          finding: 'Bilirrubinúria macroscópica em urinálise',
          mechanism:
            'A bilirrubina conjugada é hidrossolúvel e ultrapassa livremente a barreira de filtração glomerular; o limiar renal felino para bilirrubina é muito mais estrito que o canino.',
          clinicalMeaning:
            'No gato, qualquer grau de bilirrubinúria é clinicamente patológico e precede o surgimento de icterícia visível na pele e mucosas.',
          priority: 'common',
        },
        {
          finding: 'Desacoplamento enzimático: ALP normal ou levemente elevada com GGT aumentada',
          mechanism:
            'A fosfatase alcalina hepática felina possui meia-vida circulante muito curta (cerca de 6 horas) e baixa capacidade de indução celular em comparação ao cão, enquanto a GGT é expressa ativamente no epitélio biliar sob proliferação.',
          clinicalMeaning:
            'Armadilha clássica: uma ALP dentro do intervalo de referência NÃO exclui doença colestática obstrutiva severa na espécie felina.',
          priority: 'common',
        },
        {
          finding: 'Hipoalbuminemia com hiperglobulinemia (relação A:G invertida)',
          mechanism:
            'Estimulação imune crônica por antígenos parasitários provocando expansão policlonal de imunoglobulinas, associada à redução da síntese de albumina pelo parênquima lesado.',
          clinicalMeaning:
            'Padrão inespecífico que reflete cronicidade inflamatória sistêmica; deve ser diferenciado de PIF (peritonite infecciosa felina) e colangite linfocítica.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'Manifestações em Estágios Avançados e Obstrutivos',
      findings: [
        {
          finding: 'Ascite e efusão peritoneal transudativa modificada',
          mechanism:
            'Hipertensão portal pós-sinusoidal por fibrose periportal concêntrica, combinada a hipoalbuminemia com queda da pressão oncótica plasmática.',
          clinicalMeaning:
            'Indica cronicidade avançada e transição para cirrose biliar; a punção revela líquido claro ou amarelado sem celularidade neoplásica ou bacteriana primária.',
          priority: 'emergency',
        },
        {
          finding: 'Distensão da vesícula biliar e dor à palpação cranial',
          mechanism:
            'Aumento crítico da pressão intraluminal vesicular por impactação mecânica do colédoco distal por vermes, muco denso ou estenose fibrótica cicatricial.',
          clinicalMeaning:
            'Risco iminente de ruptura vesicular e peritonite biliar estéril ou séptica; demanda monitoramento ultrassonográfico seriado de emergência.',
          priority: 'emergency',
        },
        {
          finding: 'Coagulopatia e diátese hemorrágica por carência de vitamina K',
          mechanism:
            'A ausência prolongada de sais biliares no lúmen entérico impede a emulsificação e absorção de vitaminas lipossolúveis (A, D, E, K), prejudicando a ativação hepática dos fatores II, VII, IX e X.',
          clinicalMeaning:
            'Prolongamento de PT e aPTT; risco gravíssimo de hemorragia fatal durante procedimentos invasivos (como biópsia hepática ou colecistocentese não planejada).',
          priority: 'emergency',
        },
      ],
    },
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Coproparasitológico Especializado por Dupla Centrifugação em Solução de Sheather (SG 1,28)',
      purpose: 'Recuperação e identificação microscópica de ovos operculados pesados em fezes',
      description:
        'Técnica coprológica quantitativa e qualitativa empregando solução de sacarose saturada de Sheather com densidade calibrada rigorosamente em 1,28 g/mL, associada a centrifugação a 1.500 rpm por 10 minutos com lamínula em contato superior. Ovos típicos são marrom-amarelados, elípticos, operculados e medem entre 20 a 35 µm de largura por 34 a 50 µm de comprimento. O exame deve ser realizado preferencialmente em três amostras fecais consecutivas colhidas em dias alternados para contornar a eliminação intermitente.',
      interpretation:
        'A detecção de ovos operculados confirma categoricamente a infecção ativa por Platynosomum illiciens. Contudo, resultado negativo NÃO exclui a enfermidade: fases pré-patentes (primeiras 8 semanas), baixa carga parasitária e obstrução biliar mecânica impedem a excreção fecal dos ovos.',
      limitations:
        'Flotação simples de rotina com cloreto de sódio ou sulfato de zinco (SG 1,20) falha em flutuar ovos pesados; a sensibilidade em fezes é nula se houver obstrução biliar mecânica total.',
      isGoldStandard: false,
    },
    {
      stepNumber: 2,
      title: 'Ultrassonografia Hepatobiliar Meticulosa de Alta Resolução',
      purpose: 'Mapeamento anatômico da vesícula biliar, calibre dos ductos e identificação de colangiectasia',
      description:
        'Exame ecográfico detalhado com transdutor microconvexo ou linear de alta frequência (8 a 12 MHz), varrendo o parênquima hepático, lúmen e espessura parietal da vesícula biliar, ducto cístico, ducto colédoco e papila duodenal maior. Avalia-se a presença de dilatação ductal (diâmetro do colédoco normal felino < 4 mm; valores > 5 mm indicam ectasia patológica), tortuosidade ductal bizarra, hiperecogenicidade parietal e debris ecogênicos.',
      interpretation:
        'Presença de ductos intra-hepáticos dilatados, tortuosos e com paredes hiperecogênicas associados à vesícula distendida com lama biliar (sludge) suporta fortemente colangite parasitária crônica em áreas endêmicas, embora não diferencie isoladamente de colangite bacteriana neutrofílica ou neoplasia.',
      limitations:
        'Não identifica o parasito individualizado na maioria dos casos devido ao seu reduzido calibre; dilatação biliar reflete síndrome obstrutiva e não etiologia específica.',
    },
    {
      stepNumber: 3,
      title: 'Colecistocentese Percutânea Ecoguiada com Análise Citológica e Parasitológica da Bile',
      purpose: 'Identificação direta de ovos operculados e parasitos na bile vesicular e cultura microbiológica',
      description:
        'Aspirativa percutânea ecoguiada da vesícula biliar utilizando agulha 22G a 25G conectada a seringa estéril de 3 a 5 mL, abordando a vesícula por via trans-hepática (passando através de uma fina camada de parênquima hepático para selamento do trajeto e prevenção de extravasamento peritoneal). O fluido biliar aspirado é centrifugado para análise de sedimento a fresco, citologia em esfregaço corado e cultura microbiológica aeróbia/anaeróbia com antibiograma.',
      interpretation:
        'Padrão ouro confirmatório: a concentração de ovos na bile é de 20 a 30 vezes superior à observada nas fezes (mediana de 1.450 ovos/mL na bile vs 46 ovos/mL nas fezes; Köster et al., 2016). Permite diagnóstico de certeza mesmo em felinos com coproparasitológico negativo.',
      limitations:
        'Procedimento invasivo; contraindicado formalmente na presença de coagulopatia descompensada, empiema vesicular com necrose parietal ou obstrução biliar extra-hepática sob risco de ruptura e peritonite biliar.',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Painel Bioquímico Hepático Completo, Hemograma e Perfil Hemostático',
      purpose: 'Avaliação funcional do parênquima, grau de colestase, resposta inflamatória e hemostasia secundária',
      description:
        'Dosagem sérica de ALT, AST, GGT, fosfatase alcalina (ALP), bilirrubinas total, direta e indireta, albumina, proteínas totais, colesterol, glicemia e ureia. Hemograma completo com análise cuidadosa da contagem de eosinófilos e esfregaço sanguíneo. Tempo de protrombina (PT) e tempo de tromboplastina parcial ativada (aPTT) obrigatórios antes de punções ou biópsias.',
      interpretation:
        'Elevação de GGT e bilirrubina direta confirma colestase ativa; ALT e AST refletem necrose hepatocitária secundária. Eosinofilia marcada eleva a suspeita helmíntica. Prolongamento de PT/aPTT sinaliza carência de vitamina K dependente de absorção de gorduras biliares.',
      limitations:
        'Alterações enzimáticas são inespecíficas para etiologia helmíntica; ALT e AST podem normalizar na fase terminal de cirrose e fibrose avançada por redução de massa celular viável.',
    },
    {
      stepNumber: 5,
      title: 'Histopatologia Hepática por Biópsia Cirúrgica ou Laparoscópica',
      purpose: 'Caracterização arquitetural da lesão, estadiamento da fibrose e identificação de parasitos intralesionais',
      description:
        'Obtenção de fragmentos hepáticos em cunha ou por biópsia em saca-bocados durante exploração cirúrgica ou laparoscópica assistida, abrangendo múltiplos lobos e leito periportal. Colorações de rotina por HE e histoquímica especial por Tricrômico de Masson para quantificação de colágeno periportal e pericelular.',
      interpretation:
        'Evidenciação de hiperplasia adenomatosa epitelial das vias biliares, colangiectasia, pericolangite fibrosante em casca de cebola e, ocasionalmente, secções transversais do trematódeo no lúmen ductal. Exclui colangiocarcinoma e linfoma.',
      limitations:
        'Risco anestésico e hemorrágico em felinos hepatopatas ictéricos graves; erro amostral se a biópsia abranger apenas parênquima superficial sem ductos de médio calibre.',
    },
    {
      stepNumber: 6,
      title: 'Diagnóstico Molecular por Reação em Cadeia da Polimerase (PCR)',
      purpose: 'Confirmação taxonômica definitiva da espécie e estudos de epidemiologia molecular',
      description:
        'Amplificação por PCR de fragmentos de DNA genômico ribossômico (ITS2) ou mitocondrial (citocromo c oxidase subunidade 1 - cox1) a partir de amostras de bile, fragmentos de biópsia ou ovos purificados de fezes, seguido de sequenciamento Sanger.',
      interpretation:
        'Confirmação inequívoca de Platynosomum illiciens, diferenciando-o de outros trematódeos e auxiliando na pesquisa epidemiológica.',
      limitations:
        'Disponibilidade comercial restrita a laboratórios de referência universitários e centros de pesquisa parasitológica; não substitui o diagnóstico clínico imediato.',
    },
  ],

  treatment: {
    metasTerapeuticasEExpectativas:
      'O manejo terapêutico da platinosomose felina deve ser estruturado sob dois pilares indissociáveis: a erradicação química do trematódeo e a preservação do suporte funcional hepatobiliar. O veterinário clínico deve esclarecer ao tutor que a eliminação dos parasitos não garante a reversão imediata das alterações anatômicas: se a infecção já estabeleceu fibrose periductal densa e remodelamento cístico dos ductos, a colestase e as alterações ultrassonográficas podem persistir por meses ou tornar-se sequelas anatômicas permanentes. O sucesso terapêutico clínico é definido pela resolução da anorexia, normalização ponderal, clareamento da icterícia e declínio sustentado das enzimas biliares.',

    tabelaEficaciaAntiparasitaria: {
      kind: 'clinicalTable',
      title: 'Tabela 2 — Regimes Farmacológicos Avaliados, Evidências com Contagem de Vermes Vivos e Posologias Clínicas',
      columns: [
        { key: 'protocol', label: 'Protocolo Terapêutico' },
        { key: 'regimen', label: 'Posologia e Via' },
        { key: 'evidenceLevel', label: 'Nível de Evidência e Desfecho em Necropsia' },
        { key: 'clinicalVerdict', label: 'Veredito e Recomendação Clínica' },
      ],
      rows: [
        {
          protocol: 'Praziquantel Alta Dose (Plumb\'s 10ª ed.)',
          regimen: '30 mg/kg VO a cada 24 horas por 5 a 10 dias consecutivos',
          evidenceLevel: 'Consenso farmacológico de compêndio veterinário internacional (uso extra-label)',
          clinicalVerdict:
            'Protocolo de primeira linha mais robusto no acervo farmacológico atual; indicado para infecções confirmadas sem obstrução mecânica total.',
        },
        {
          protocol: 'Praziquantel Injetável (Lathroum et al., 2018)',
          regimen: '20 mg/kg IM a cada 24 horas por 3 dias consecutivos',
          evidenceLevel: 'Ensaio controlado com necropsia: 3 de 6 gatos curados (50% de erradicação completa de vermes vivos)',
          clinicalVerdict:
            'Promoveu redução maciça (>90%) da carga parasitária, mas não foi esterilizante em metade dos pacientes; opção útil quando há intolerância oral severa.',
        },
        {
          protocol: 'Praziquantel Baixa Dose / Convencional',
          regimen: '5 mg/kg IM ou VO, repetido após 14 dias',
          evidenceLevel: 'Ensaio controlado com necropsia: 0 de 6 gatos curados (100% de falha terapêutica na erradicação)',
          clinicalVerdict:
            'Formalmente inadequado para platinosomose; doses de cestódeos falham em atingir concentração letal nos ductos biliares.',
        },
        {
          protocol: 'Fenbendazol Combinado (Relato UNESP/UFSM)',
          regimen: '50 mg/kg VO q24h por 3 dias + praziquantel dose única',
          evidenceLevel: 'Relatos de caso isolados (Sousa et al., 2025; Sato et al., 2025)',
          clinicalVerdict:
            'Melhora clínica observada, porém sem validação de cura parasitológica por necropsia; considerado terapia experimental auxiliar.',
        },
      ],
    },

    protocoloPraziquantelDosesEVersoes:
      'O praziquantel permanece como a espinha dorsal do tratamento etiológico da platinosomose felina. Seu mecanismo de ação em trematódeos fundamenta-se na alteração drástica da permeabilidade ao cálcio na membrana do tegumento parasitário, induzindo influxo massivo de íons Ca2+, contração espástica imediata e vacuolização irreversível do tegumento, expondo antígenos internos ao ataque fagocítico do sistema imune do hospedeiro (Plumb\'s 10ª ed.). A dosagem convencional de 5 mg/kg utilizada rotineiramente contra Dipylidium e Taenia é comprovadamente ineficaz na árvore biliar felina. O estudo seminal de Lathroum et al. (2018), avaliando gatos naturalmente infectados submetidos à necropsia sistemática, provou que o regime de 20 mg/kg IM a cada 24h por 3 dias erradicou completamente os vermes vivos em apenas 50% dos animais, a despeito da acentuada redução na contagem de ovos. Por esse motivo, compêndios farmacológicos de referência (Plumb\'s Veterinary Drug Handbook, 10ª ed., 2023) recomendam regimes orais estendidos de 30 mg/kg VO a cada 24 horas durante 5 a 10 dias consecutivos. O médico veterinário deve associar antieméticos gástricos prévios (como maropitant 1 mg/kg SC/VO), uma vez que doses elevadas de praziquantel podem desencadear náusea e salivação transitórias.',

    avaliacaoCriticaDoFenbendazol:
      'O fenbendazol tem sido explorado empiricamente como coadjuvante na dose de 50 mg/kg VO a cada 24h por 3 a 5 dias em relatos clínicos brasileiros e latino-americanos. Embora relatos de caso (como o de Sousa et al., 2025) tenham documentado excelente recuperação clínica e laboratorial após o uso combinado de fenbendazol e praziquantel, inexistem ensaios controlados com contagem direta de vermes vivos em necropsia que comprovem eficácia trematodicida isolada sustentada do fenbendazol contra Platynosomum illiciens. Sua utilização deve ser encarada estritamente como terapia adjuvante empírica ou direcionada a nematódeos intestinais concomitantes (Ancylostoma e Toxocara, frequentes em animais caçadores), nunca substituindo o praziquantel como fármaco principal.',

    suporteClinicoNutricionalEColeretico:
      'Nos felinos ictéricos com quadro moderado a grave, a eliminação farmacológica do parasito constitui apenas uma fração do manejo clínico. A estabilização hemodinâmica inicial requer fluidoterapia balanceada com solução de Ringer com Lactato ou Plasmalyte, com suplementação criteriosa de cloreto de potássio conforme ionograma sérico, visto que a hipocalemia é frequente e agrava a fraqueza muscular e o risco de encefalopatia hepática. O suporte nutricional enteral precoce é mandatório: felinos com anorexia superior a 48 horas devem receber sonda nasoesofágica ou sonda de esofagostomia para alimentação líquida hiperproteica fracionada, prevenindo a instalação de lipidose hepática secundária (Feline Emergency and Critical Care Medicine, 2ª ed., Cap. 20). O ácido ursodesoxicólico (UDCA, 10 a 15 mg/kg VO q24h junto à refeição) exerce efeito colerético hidrofílico, reduz a viscosidade da bile, desloca ácidos biliares hidrofóbicos tóxicos e estabiliza a membrana do colangiócito; contudo, seu uso é FORMALMENTE CONDICIONADO à exclusão prévia de obstrução biliar mecânica extra-hepática total.',

    criteriosParaIntervencaoCirurgica:
      'A intervenção cirúrgica de resgate na platinosomose felina é indicada nas seguintes circunstâncias críticas: (1) Obstrução mecânica extra-hepática persistente e refratária com dilatação progressiva do ducto colédoco (> 8 a 10 mm) e vesícula em tensão; (2) Evidência imaginológica ou citológica de colecistite enfisematosa, necrose de parede vesicular ou peritonite biliar por microperfuração; (3) Falha no clareamento da icterícia com deterioração clínica apesar de 72 a 96 horas de suporte clínico intensivo. Os procedimentos cirúrgicos descritos na literatura especializada incluem colecistectomia (quando a vesícula encontra-se irreversivelmente espessada, friável ou com empiema), desvio biliar por colecistoduodenostomia ou colecistojejunostomia em Y de Roux, e colocação de stent biliar transpapilar descompressivo. O procedimento cirúrgico biliar em felinos carrega elevada taxa de mortalidade perioperatória e exige prévia correção hemostática com vitamina K e plasma fresco congelado.',

    protocoloPlantaoPassoAPasso: [
      'Passo 1: Acolhimento e avaliação primária de choque, hidratação, temperatura retal e intensidade da icterícia em mucosas e escleras.',
      'Passo 2: Coleta imediata de sangue para hemograma completo com esfregaço, bioquímica sérica (ALT, AST, GGT, ALP, bilirrubinas, albumina), glicemia e coagulograma (PT, aPTT).',
      'Passo 3: Se houver coagulopatia identificada (PT/aPTT aumentados) ou icterícia intensa com suspeita obstrutiva, administrar fitomenadiona (vitamina K1, 1 mg/kg SC a cada 12 horas, repetindo por 2 a 3 doses).',
      'Passo 4: Controle sintomático imediato de náusea e êmese com citrato de maropitant (1 mg/kg SC/IV q24h) e analgesia multimodal com buprenorfina (0,01 a 0,02 mg/kg sublingual/SC q8-12h).',
      'Passo 5: Ultrassonografia abdominal de emergência para mensurar o calibre do colédoco, espessura da parede vesicular, presença de sludge ecogênico e líquido livre peritoneal.',
      'Passo 6: Se houver líquido livre peritoneal, realizar abdominocentese diagnóstica imediata para dosagem de bilirrubina no líquido (bilirrubina efusão > bilirrubina sérica diagnostica peritonite biliar).',
      'Passo 7: Coleta de amostra fecal recente para solicitação expressa de dupla centrifugação com solução saturada de Sheather (SG 1,28) para pesquisa de ovos de Platynosomum.',
      'Passo 8: Se o paciente estiver estável, sem obstrução total e com coagulação preservada, mas com fezes negativas e suspeita alta, considerar colecistocentese percutânea ecoguiada para citologia e cultura.',
      'Passo 9: Iniciar terapia antiparasitária com praziquantel em dose elevada (30 mg/kg VO q24h por 5 a 10 dias conforme o Plumb\'s 10ª ed.), com protetor gástrico e antiemético.',
      'Passo 10: Iniciar suporte nutricional enteral ativo (sonda nasoesofágica precoce se anorexia > 48h) e introduzir ácido ursodesoxicólico (10-15 mg/kg VO q24h) somente após descartar obstrução mecânica total.',
    ],

    errosCriticosEvitar: [
      'Descartar platinosomose baseando-se em um exame coproparasitológico simples negativo por método de rotina (flotação com NaCl ou Willis-Mollay).',
      'Acreditar que a ausência de histórico de ingestão de lagartixas exclui o contato com o parasito, ignorando o papel de isópodes terrestres de quintal.',
      'Prescrever a dose convencional de praziquantel para tênias (5 mg/kg em dose única), que é ineficaz para erradicação nos ductos biliares.',
      'Prescrever ácido ursodesoxicólico em felino com obstrução biliar extra-hepática total comprovada, elevando a pressão e o risco de ruptura da vesícula.',
      'Ignorar a dosagem de coagulograma (PT e aPTT) antes de realizar colecistocentese ou biópsias hepáticas em gatos com icterícia colestática grave.',
      'Presumir que fosfatase alcalina (ALP) normal ou discretamente elevada afasta colestase grave na espécie felina.',
      'Permitir que o gato ictérico permaneça em jejum voluntário por vários dias no internamento, induzindo lipidose hepática secundária fatal.',
      'Afirmar categoricamente ao tutor que o tratamento com praziquantel curou o animal apenas porque os ovos desapareceram das fezes.',
      'Suspender precocemente o praziquantel após 1 ou 2 dias por sedação ou náusea leve sem tentar ajuste antiemético prévio.',
      'Realizar colecistocentese percutânea às cegas sem guia ecográfico em tempo real e sem transfixação parenquimatosa protetora.',
    ],

    monitoramentoPosTratamento:
      'O protocolo de monitoramento do paciente pós-tratamento deve compreender reavaliações clínicas e laboratoriais seriadas aos 15, 30 e 60 dias após a conclusão do ciclo de praziquantel. Devem ser monitorados: peso corporal, escore de condição corporal, desaparecimento da icterícia, dosagem seriada de ALT, GGT, fosfatase alcalina e bilirrubinas total e frações. O exame ultrassonográfico deve ser repetido aos 30 dias para avaliar a regressão da ectasia biliar e a espessura da parede vesicular; ressalta-se que fibrose cicatricial residual pode manter discreta colangiectasia permanente sem significado obstrutivo ativo. O exame coproparasitológico por centrifugação com Sheather deve ser repetido em 3 amostras após 30 dias da terapia, mantendo-se em mente que a negatividade fecal sugere melhora na excreção, mas não comprova esterilização tecidual absoluta.',
  },

  complications: {
    obstrucaoBiliarExtrahepaticaCompleta:
      'Impactação física do colédoco terminal e da papila duodenal maior por agregados de vermes adultos, muco hipersecretado viscoso e espessamento fibrótico parietal, gerando estase biliar total, hidropisia vesicular sob tensão e risco iminente de ruptura com peritonite biliar séptica ou química.',
    colangioepatiteBacterianaSecundaria:
      'A perda do fluxo laminar contínuo de bile e a ruptura da barreira mucociliar ductal facilitam a ascensão retrógrada de enterobactérias do duodeno (Escherichia coli, Enterococcus spp., Clostridium spp.), transformando a colangite parasitária em colangite bacteriana neutrofílica supurativa com sepse sistêmica.',
    cirroseBiliarEHipertensaoPortal:
      'Deposição crônica e desordenada de colágeno periportal pelos miofibroblastos em resposta à irritação inflamatória persistente, culminando em perda da arquitetura lobular hepática, fibrose em pontes, hipertensão portal pré-senusoidal, esplenomegalia congestiva e desenvolvimento de ascite.',
    lipidoseHepaticaSecundaria:
      'A hiporexia severa e o estado anoréxico induzidos pela dor biliar, náusea e colestase ativam a lipase hormônio-sensível periférica, promovendo mobilização maciça de ácidos graxos livres que sobrecarregam a capacidade de beta-oxidação e secreção de VLDL do hepatócito felino lesado.',
    coagulopatiaPorMalabsorcaoVitaminaK:
      'A carência intraluminal crônica de sais biliares conjugados no intestino delgado prejudica a formação de micelas mistas e a absorção da vitamina K lipossolúvel, resultando em deficiência funcional dos fatores hemostáticos dependentes de gama-carboxilação (II, VII, IX, X) e hemorragias espontâneas.',
  },

  prevention: {
    confinamentoIndoorEBloqueioDePredacao:
      'Manutenção do felino doméstico estritamente confinado em ambiente indoor com enriquecimento ambiental e telas de proteção, eliminando o comportamento de caça e predação de hospedeiros intermediários e paratênicos (tatuzinhos-de-jardim, lagartixas e anfíbios).',
    controleAmbientalDeIsopodesECaracois:
      'Manejo higiênico rigoroso de quintais, vasos de plantas, entulhos e jardins peridomiciliares para reduzir a umidade e a proliferação de moluscos gastrópodes terrestres (Subulina octona) e isópodes terrestres (Oniscidea), que albergam as formas infectantes.',
    rastreamentoCoproparasitologicoEspecializado:
      'Realização periódica anual ou semestral de exames coproparasitológicos utilizando especificamente a técnica de dupla centrifugação com solução saturada de Sheather (densidade 1,28 g/mL) em gatos com histórico pregresso de acesso externo ou procedentes de regiões endêmicas.',
    profilaxiaAntiparasitariaRacional:
      'Esclarecimento aos tutores e clínicos de que vermifugações convencionais de rotina em dose única (pamoato de pirantel/praziquantel a 5 mg/kg) não conferem proteção preventiva contra trematódeos biliares, evitando falsa sensação de segurança profilática.',
    avaliacaoImaginologicaPrecoce:
      'Inclusão da ultrassonografia hepatobiliar na rotina de triagem preventiva de felinos adultos procedentes de áreas endêmicas tropicais com histórico de caça, permitindo a detecção de ectasias ductais e espessamento vesicular em estágios subclínicos precoces.',
  },

  references: [
    {
      id: 'silva-2023-meta-analysis',
      citation:
        'Silva WI, Feitosa TF, Vilela VLR. A systematic review and meta-analysis on the global status of Platynosomum sp. (Trematoda – Dicrocoeliidae) infecting domestic cats (Felis catus). Veterinary Parasitology, 2023;322:110031. DOI: 10.1016/j.vetpar.2023.110031.',
      url: 'https://doi.org/10.1016/j.vetpar.2023.110031',
      sourceType: 'Revisão Sistemática e Meta-análise Internacional',
      evidenceLevel: 'Nível 1 — Meta-análise Global (73 estudos compilados)',
      notes:
        'Maior levantamento epidemiológico contemporâneo determinando a prevalência agrupada mundial (17,8%), ampla heterogeneidade e distribuição na América Latina.',
    },
    {
      id: 'eisenbraun-2020-fecal-methods',
      citation:
        'Eisenbraun H, Ketzis J, Shell L, Lejeune M, Mount J, Verocai GG. Comparison of fecal analysis methods for the detection of Platynosomum fastosum in naturally infected cats. Journal of Feline Medicine and Surgery, 2020;22(8):722–728. DOI: 10.1177/1098612X19848173.',
      url: 'https://doi.org/10.1177/1098612X19848173',
      sourceType: 'Estudo Diagnóstico Prospectivo Comparativo',
      evidenceLevel: 'Nível 2 — Ensaio Comparativo de Sensibilidade Coprológica (n=50 gatos)',
      notes:
        'Demonstrou a superioridade marcante da dupla centrifugação com solução de Sheather SG 1,28 (97,1% de detecção comparativa) frente a métodos com sulfato de zinco.',
    },
    {
      id: 'koster-2016-cholecystocentesis',
      citation:
        'Köster L, Shell L, Ketzis J, Soto E, Harrus S. Percutaneous Ultrasound-guided Cholecystocentesis and Bile Analysis for the Detection of Platynosomum spp.-Induced Cholangitis in Cats. Journal of Veterinary Internal Medicine, 2016;30(3):787–793. DOI: 10.1111/jvim.13943.',
      url: 'https://doi.org/10.1111/jvim.13943',
      sourceType: 'Estudo Clínico Prospectivo de Intervenção Diagnóstica',
      evidenceLevel: 'Nível 2 — Estudo Prospectivo com Validação de Ovos em Bile (n=27 gatos)',
      notes:
        'Comprovou que a contagem de ovos na bile é até 30 vezes superior à observada nas fezes (1.450 ovos/mL vs 46 ovos/mL), validando a colecistocentese percutânea ecoguiada.',
    },
    {
      id: 'lathroum-2018-praziquantel',
      citation:
        'Lathroum CN, Shell L, Neuville K, Ketzis JK. Efficacy of praziquantel in the treatment of Platynosomum fastosum in cats with natural infections. Veterinary Sciences, 2018;5(2):35. DOI: 10.3390/vetsci5020035.',
      url: 'https://doi.org/10.3390/vetsci5020035',
      sourceType: 'Ensaio Clínico Terapêutico Controlado com Necropsia',
      evidenceLevel: 'Nível 2 — Ensaio com Contagem Direta de Vermes Vivos em Necropsia',
      notes:
        'Artigo terapêutico fundamental: demonstrou que 20 mg/kg IM por 3 dias erradicou os vermes em apenas 50% dos gatos e que 5 mg/kg falhou totalmente, provando que negatividade fecal não equivale a cura tecidual.',
    },
    {
      id: 'chantawong-2024-animals',
      citation:
        'Chantawong P, Pringproa K, Tangtrongsup S, Kasantikul T, Rittipornlertrak A, Tiwananthagorn S. Occurrence and risk factors associated with Platynosomum illiciens infection in cats with elevated liver enzymes. Animals, 2024;14(7):1065. DOI: 10.3390/ani14071065.',
      url: 'https://doi.org/10.3390/ani14071065',
      sourceType: 'Estudo Clínico, Molecular e Fisiopatológico Open Access',
      evidenceLevel: 'Nível 2 — Estudo de Coorte em Hospital Veterinário Universitário',
      notes:
        'Identificação molecular de P. illiciens via cox1 e ITS2, documentando associação estatisticamente significativa com eosinofilia e independência enzimática de ALT/ALP.',
    },
    {
      id: 'sato-2025-unesp',
      citation:
        'Sato LMN, Bonamin L, Souza TD, Brandão YS, Menegazzo L, Ciarlini PC. Clinical, laboratory, and ultrasonographic insights into Platynosomum fastosum infection in domestic cats: Diagnostic challenges and hepatobiliary implications. The Veterinary Journal, 2025;309:106442. DOI: 10.1016/j.tvjl.2025.106442.',
      url: 'https://doi.org/10.1016/j.tvjl.2025.106442',
      sourceType: 'Série de Casos Clínicos Hospitalares Brasileiros (UNESP)',
      evidenceLevel: 'Nível 3 — Série Clínica Descritiva Multicêntrica',
      notes:
        'Caracterização clínica contemporânea no Brasil, destacando icterícia, apatia, desidratação e correlações laboratoriais em felinos naturalmente infectados.',
    },
    {
      id: 'sousa-2025-ufsm',
      citation:
        'Sousa FAB, Silva MA, Santos RR, Oliveira ST. Feline platynosomosis in the municipality of Santa Maria, RS, Brazil – diagnosis by cholecystocentesis. Ciência Rural, 2025;55(9):e20240194. DOI: 10.1590/0103-8478cr20240194.',
      url: 'https://doi.org/10.1590/0103-8478cr20240194',
      sourceType: 'Relato de Caso Clínico com Colecistocentese e Imagem Open Access',
      evidenceLevel: 'Nível 4 — Relato de Caso com Documentação Fotográfica Completa',
      notes:
        'Demonstrou coproparasitológico negativo com confirmação diagnóstica inequívoca por aspiração ecoguiada de ovos na bile em felino com colangite obstrutiva.',
    },
    {
      id: 'campos-camacho-2026-pathology',
      citation:
        'Campos-Camacho J, Morales-Acuña JA, Castro-Vargas R, Alfaro-Alarcón A. Diagnosis of feline platynosomosis: case series and literature review. Journal of Veterinary Diagnostic Investigation, 2026;38(1):1467915. DOI: 10.1177/10406387261467915.',
      url: 'https://doi.org/10.1177/10406387261467915',
      sourceType: 'Série Anatomopatológica e Molecular Recente (2026)',
      evidenceLevel: 'Nível 3 — Série de Casos com Necropsia e Histopatologia',
      notes:
        'Caracterização anatomopatológica de lesões hepáticas graves, colangio-hepatite difusa e trematódeos intralesionais associados a comorbidades virais.',
    },
    {
      id: 'pinto-2014-ufmg-lifecycle',
      citation:
        'Pinto HA, Mati VLT, Melo AL. New insights into the life cycle of Platynosomum (Trematoda: Dicrocoeliidae). Parasitology Research, 2014;113(7):2701–2707. DOI: 10.1007/s00436-014-3926-5.',
      url: 'https://doi.org/10.1007/s00436-014-3926-5',
      sourceType: 'Estudo Experimental Molecular de Ciclo Biológico (UFMG)',
      evidenceLevel: 'Nível 1 — Estudo Experimental Seminal',
      notes:
        'Marco na parasitologia veterinária: comprovou experimentalmente o papel de isópodes terrestres como segundo hospedeiro intermediário e desmistificou o lagarto como hospedeiro paratênico opcional.',
    },
    {
      id: 'andrade-2012-cholangiocarcinoma',
      citation:
        'Andrade RLFS, Dantas AFM, Pimentel LA, Galiza GJN, Carvalho FKL, Costa VMM, Riet-Correa F. Platynosomum fastosum-induced cholangiocarcinomas in cats. Journal of Feline Medicine and Surgery, 2012;14(11):778–783. DOI: 10.1177/1098612X12450106.',
      url: 'https://doi.org/10.1177/1098612X12450106',
      sourceType: 'Estudo Anatomopatológico Retrospectivo em Necropsias',
      evidenceLevel: 'Nível 3 — Estudo Retrospectivo com Análise de 348 Necropsias',
      notes:
        'Descreveu associação estatística entre parasitismo crônico por Platynosomum, hiperplasia/displasia biliar e desenvolvimento de colangiocarcinoma.',
    },
    {
      id: 'nelson-couto-6ed-ch35',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th edition (2020). Chapter 35: Hepatobiliary Diseases in the Cat, pp. 572-573. Elsevier.',
      sourceType: 'Tratado de Medicina Interna Veterinária Padrão Ouro',
      evidenceLevel: 'Manual de Referência Mundial em Medicina Interna',
      notes:
        'Abordagem clínica clássica da infecção por trematódeos em felinos, dilatações biliares, discrepâncias entre bile e fezes e posologias clássicas de praziquantel.',
    },
    {
      id: 'bsava-guide-procedures-3ed',
      citation:
        'British Small Animal Veterinary Association (BSAVA). BSAVA Guide to Procedures in Small Animal Practice, 3rd edition (2024). Gallbladder aspiration (Cholecystocentesis), pp. 169-170. BSAVA.',
      sourceType: 'Guia Técnico de Procedimentos Clínicos Especializados',
      evidenceLevel: 'Diretriz Procedimental Oficial Especializada',
      notes:
        'Padronização técnica de colecistocentese percutânea ecoguiada, abordagem trans-hepática protetora, riscos, contraindicações e manejo hemostático prévio.',
    },
    {
      id: 'plumbs-10ed-praziquantel',
      citation:
        'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th edition (2023). Praziquantel monograph. Wiley-Blackwell.',
      sourceType: 'Compêndio Farmacológico Veterinário Internacional',
      evidenceLevel: 'Compêndio Terapêutico Padrão Ouro',
      notes:
        'Diretriz farmacológica mestre preconizando a posologia oral intensiva de praziquantel (30 mg/kg VO q24h por 5 a 10 dias) para Platynosomum em felinos.',
    },
    {
      id: 'withrow-macewen-6ed-ch23',
      citation:
        'Vail DM, Thamm DH, Liptak JM. Withrow and MacEwen\'s Small Animal Clinical Oncology, 6th edition (2020). Chapter 23: Tumors of the Alimentary Tract - Hepatobiliary Tumors, pp. 455-456. Saunders Elsevier.',
      sourceType: 'Tratado de Oncologia Clínica Veterinária Padrão Ouro',
      evidenceLevel: 'Manual de Referência Mundial em Oncologia',
      notes:
        'Contextualização oncológica crítica da relação entre trematodíases crônicas e neoplasias biliares primárias em animais de companhia.',
    },
  ],
};
