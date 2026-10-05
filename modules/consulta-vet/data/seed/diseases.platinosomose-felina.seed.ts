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
        'Morfologia microscópica de Platynosomum illiciens:\n' +
        '- Características dos ovos: elementos operculados, castanho-amarelados e elípticos observados em microscopia óptica de sedimento fecal felino.\n' +
        '- Embriogênese e licença: morfologia dicrocelídea característica com embrião granular interno maduro. Adaptado de Chantawong et al. (2024), Animals, sob licença CC BY 4.0.',
      caption:
        'Morfologia microscópica diagnóstica de ovos de Platynosomum illiciens em amostra fecal felina.',
      source: 'Chantawong et al. (2024). DOI: 10.3390/ani14071065 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/platinosomose-felina/parasito-adulto-platynosomum-lathroum2018.png',
      legend:
        'Morfologia do exemplar adulto de Platynosomum illiciens / P. fastosum:\n' +
        '- Achados necroscópicos: espécime recuperado da árvore biliar de gato naturalmente infectado com corpo foliáceo característico.\n' +
        '- Estrutura anatômica: ventosas oral e ventral bem desenvolvidas e morfologia de trematódeo digenético. Adaptado de Lathroum et al. (2018), Veterinary Sciences, sob licença CC BY 4.0.',
      caption:
        'Morfologia macro e microscópica do trematódeo adulto de Platynosomum illiciens.',
      source: 'Lathroum et al. (2018). DOI: 10.3390/vetsci5020035 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/platinosomose-felina/painel-clinico-colecistocentese-sousa2025.jpg',
      legend:
        'Painel clínico-patológico e intervencionista da platinosomose felina no Brasil:\n' +
        '- Apresentação clínica (A-B): icterícia acentuada de mucosas e distensão abdominal progressiva.\n' +
        '- Ultrassonografia (C): vesícula e ductos biliares dilatados com paredes espessadas e debris ecogênicos.\n' +
        '- Colecistocentese (D-E): punção percutânea ecoguiada e recuperação de ovo operculado de Platynosomum diretamente na bile.\n' +
        '- Evolução pós-terapia (F): resolução parcial das dilatações após protocolo terapêutico. Adaptado de Sousa et al. (2025), Ciência Rural, sob licença CC BY 4.0.',
      caption:
        'Painel clínico, ultrassonográfico e intervencionista com colecistocentese e recuperação de ovos biliares.',
      source: 'Sousa et al. (2025). DOI: 10.1590/0103-8478cr20240194 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/platinosomose-felina/comparacao-laboratorial-eosinofilos-chantawong2024.png',
      legend:
        'Comparação gráfica laboratorial entre felinos parasitados e controles:\n' +
        '- Contagem de eosinófilos: elevação estatisticamente significativa (p < 0,05) nos gatos infectados por P. illiciens.\n' +
        '- Enzimas hepáticas: ampla sobreposição de ALT e ALP entre grupos, confirmando limitações da ALP isolada. Adaptado de Chantawong et al. (2024), Animals, sob licença CC BY 4.0.',
      caption:
        'Avaliação comparativa de ALT, ALP e contagem de eosinófilos demonstrando a relevância da eosinofilia.',
      source: 'Chantawong et al. (2024). DOI: 10.3390/ani14071065 (Open Access, CC BY 4.0).',
    },
  ],

  quickSummary:
    'Aspectos centrais da platinosomose felina:\n' +
    '- Etiologia e habitat: trematodíase hepatobiliar causada pelo dicrocelídeo Platynosomum illiciens (sin. P. fastosum e P. concinnum), parasito que coloniza a luz dos ductos biliares intra e extra-hepáticos e a vesícula biliar de gatos em regiões tropicais e subtropicais.\n' +
    '- Transmissão e ciclo: infecção pela ingestão de hospedeiros intermediários secundários (isópodes terrestres / tatuzinhos-de-jardim, comprovados experimentalmente pela UFMG em 2014) ou hospedeiros paratênicos vertebrados (lagartos, geckos e anfíbios).\n' +
    '- Fisiopatologia e lesões: ação mecânica e antigênica dos vermes desencadeia colangite crônica, hiperplasia adenomatosa ductal exuberante, fibrose periductal progressiva, colangiectasia e colestase mista com potencial evolução para cirrose biliar e falência hepática.\n' +
    '- Desafio diagnóstico: o exame coproparasitológico convencional (flotação simples) apresenta alta taxa de falso-negativo por estase biliar e baixa eliminação de ovos pesados; o método de eleição é a dupla centrifugação com solução de Sheather (SG 1,28).\n' +
    '- Padrão ouro intervencionista: em casos suspeitos com fezes negativas e ductos dilatados, a colecistocentese percutânea ecoguiada demonstra concentração de ovos até 30 vezes superior à fecal, respeitadas as condições hemostáticas do paciente.\n' +
    '- Terapêutica de escolha: praziquantel em regimes de doses elevadas (como 30 mg/kg VO q24h por 5 a 10 dias, uso extra-label preconizado no Plumb\'s 10ª ed.), aliado a suporte nutricional enteral precoce contra lipidose hepática, ácido ursodesoxicólico e descompressão cirúrgica de resgate quando indicada.',

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
    lead:
      'Colangite parasitária proliferativa felina:\n' +
      '- Agente e tropismo: trematodíase hepatobiliar por Platynosomum illiciens com colonização física dos ductos biliares e da vesícula.\n' +
      '- Consequências clínicas: hiperplasia adenomatosa, fibrose periductal e colestase mista com icterícia obstrutiva progressiva.\n' +
      '- Abordagem moderna: confirmação por Sheather de alta densidade (SG 1,28) ou colecistocentese ecoguiada, com praziquantel em doses intensivas.',
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
        body:
          'Superação do ciclo clássico simplificado e novas evidências:\n' +
          '- Hospedeiros intermediários: experimentos da UFMG (Pinto et al., 2014) demonstraram que caracóis terrestres (Subulina octona) atuam como 1º hospedeiro e isópodes Oniscidea (tatuzinhos-de-jardim) como 2º hospedeiro infectante.\n' +
          '- Bioacumuladores paratênicos: lagartos e geckos funcionam como hospedeiros paratênicos opcionais, permitindo infecção tanto em quintais quanto por predação ativa.',
        highlights: ['Subulina octona', 'Isópodes terrestres', 'Lagartixas paratênicas', 'Precocidade tecidual em 3 semanas'],
      },
      {
        title: 'Fisiopatologia dos Ductos Biliares e Colestase',
        body:
          'Colonização luminal e lesão progressiva da árvore biliar:\n' +
          '- Agressão tecidual: a fricção das ventosas e antígenos do tegumento desencadeiam colangite crônica, hiperplasia epitelial adenomatosa e fibrose periductal cicatricial.\n' +
          '- Colestase e hepatopatia: a colangiectasia tortuosa gera colestase progressiva, icterícia obstrutiva e lesão hepatocitária secundária pela toxicidade de ácidos biliares retidos.',
        highlights: ['Colangite proliferativa', 'Hiperplasia adenomatosa', 'Fibrose periductal', 'Icterícia obstrutiva'],
      },
      {
        title: 'Desafios Diagnósticos Propedêuticos: Fezes vs Bile',
        body:
          'Diferenças de acurácia entre fezes e bile na propedêutica:\n' +
          '- Limitações da flotação simples: técnicas coprológicas habituais falham por retenção e densidade dos ovos; a dupla centrifugação com Sheather (SG 1,28) alcança 97,1% de sensibilidade comparativa.\n' +
          '- Padrão ouro biliar: em felinos com colangiectasia e coprologia negativa, a colecistocentese ecoguiada revela concentração de ovos de 20 a 30 vezes superior à fecal.',
        highlights: ['Centrifugação Sheather SG 1,28', 'Colecistocentese ecoguiada', 'Ovos operculados pesados', 'Armadilha da ALP felina'],
      },
      {
        title: 'Terapêutica Antiparasitária e Suporte Crítico',
        body:
          'Protocolos antiparasitários e suporte metabólico intensivo:\n' +
          '- Ineficácia da dose de rotina: a dose convencional de praziquantel (5 mg/kg) falha na árvore biliar; recomendam-se 20 a 30 mg/kg VO por 5 a 10 dias (Plumb\'s 10ª ed.).\n' +
          '- Suporte clínico integrado: nutrição enteral precoce para prevenir lipidose hepática secundária, ácido ursodesoxicólico e descompressão cirúrgica nos quadros obstrutivos refratários.',
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
      'Definição, taxonomia e sinonímias de Platynosomum illiciens:\n' +
      '- Agente e classificação: trematódeo digenético da família Dicrocoeliidae que parasita os ductos biliares e a vesícula biliar de gatos domésticos e outros felídeos.\n' +
      '- Revisão taxonômica contemporânea: sinonímias consagradas como P. fastosum e P. concinnum foram unificadas sob a espécie válida Platynosomum illiciens com base em marcadores ITS2 e cox1 (Pinto et al., 2014; Chantawong et al., 2024).\n' +
      '- Especificidade de hospedeiro: acomete quase que exclusivamente a espécie felina; primatas neotropicais e carnívoros silvestres podem abrigar adultos na natureza, mas a doença clínica não é descrita em cães domésticos.',

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
      'Descoberta do ciclo biológico real da platinosomose (UFMG 2014):\n' +
      '- Quebra do paradigma clássico: a literatura tradicional definia o lagarto como 2º hospedeiro obrigatório (lizard poisoning), premissa reformulada pelos estudos pioneiros da UFMG (Pinto, Mati e Melo, 2014).\n' +
      '- Hospedeiros verdadeiros: moluscos terrestres (Subulina octona) atuam como 1º hospedeiro intermediário e isópodes Oniscidea (tatuzinhos-de-jardim) funcionam como 2º hospedeiro intermediário com metacercárias infectantes.\n' +
      '- Papel paratênico dos répteis: lagartos e geckos atuam como hospedeiros paratênicos bioacumuladores opcionais ao predarem isópodes infectados.\n' +
      '- Relevância na anamnese: gatos de quintal podem contrair a doença ingerindo tatuzinhos-de-jardim; descartar suspeita porque o tutor não viu predação de lagartixas é um erro técnico grave.',

    epidemiologiaGlobalEPrevalenciaBrasil:
      'Distribuição geográfica e cenário epidemiológico nacional:\n' +
      '- Endemicidade tropical e global: prevalência agrupada mundial estimada em 17,8% (Silva, Feitosa e Vilela, 2023), concentrada na América Central, Caribe, América do Sul e Sudeste Asiático.\n' +
      '- Realidade brasileira: infecção documentada em todas as regiões brasileiras onde há condições climáticas favoráveis à proliferação de moluscos e isópodes terrestres.\n' +
      '- Discrepância de populações: taxas de infecção de 20% a mais de 50% em gatos com acesso à rua ou em necropsias, contrastando com menor incidência em gatos mantidos 100% indoor.\n' +
      '- Casuística hospitalar recente: coortes da UNESP (Sato et al., 2025) e da UFSM (Sousa et al., 2025) reforçam o parasito como diferencial obrigatório em qualquer felino com colestase e icterícia.',

    anatomiaBiliarFelinaEPatogenia:
      'Particularidades anatômicas da árvore biliar felina e patogenia:\n' +
      '- Confluência ductal comum: em 80% a 90% dos gatos, o ducto pancreático principal funde-se ao ducto colédoco antes de atingir a papila duodenal maior, integrando pâncreas, fígado e intestino.\n' +
      '- Tropismo parasitário: os trematódeos adultos (4 a 8 mm de comprimento) habitam os ductos biliares intra-hepáticos, colédoco e vesícula biliar, exercendo agressão mecânica por ventosas e liberação de antígenos.\n' +
      '- Consequências epiteliais: inflamação crônica, hiperplasia adenomatosa e estenose luminal geram aumento da pressão retrógrada e refluxo de bile para o ducto pancreático.\n' +
      '- Interligação com a tríade felina: a estase e o refluxo ductal facilitam a ocorrência simultânea de colangite, pancreatite e doença inflamatória intestinal.',
  },

  epidemiology: {
    distribuicaoGeograficaEMetaAnaliseSilva2023:
      'Meta-análise global de prevalência e dados geográficos (Silva et al., 2023):\n' +
      '- Agrupamentos hiperendêmicos: a distribuição parasitária é heterogênea, condicionada pela densidade de hospedeiros intermediários e clima quente e úmido que sustenta o ciclo anual.\n' +
      '- Viés metodológico na literatura: discrepância acentuada entre estudos de necropsia (alta sensibilidade diagnóstica) e levantamentos por coprologia simples (falso-negativo expressivo por baixa eliminação de ovos).',

    fatoresDeRiscoEPerfilComportamentalPredatorio:
      'Fatores de risco individuais e comportamentais na platinosomose:\n' +
      '- Comportamento predatório e acesso externo: acesso desimpedido a jardins, telhados e quintais com caça de répteis ou ingestão de isópodes é o fator de risco primário.\n' +
      '- Perfil demográfico felino: gatos jovens e adultos maduros apresentam maior prevalência por tempo cumulativo de exposição ambiental; machos não castrados exibem maior perambulação.\n' +
      '- Falácia dos vermífugos comuns: desparasitações habituais com pamoato de pirantel ou doses baixas de praziquantel (5 mg/kg) não previnem nem tratam a infecção biliar por Platynosomum.',

    coortesClinicasBrasileirasUNESPEUFSM:
      'Evidências contemporâneas em coortes clínicas brasileiras (2025):\n' +
      '- Coorte UNESP (Sato et al., 2025): em seis felinos com histórico de predação, destacaram-se icterícia (83%), desidratação (83%), apatia (83%), vômitos (67%) e elevação acentuada de ALT (média 331 U/L) com GGT discreta (15 U/L).\n' +
      '- Relato UFSM (Sousa et al., 2025): felino com colangite obstrutiva grave e coproparasitológicos seriados negativos por Willis-Mollay, confirmado com sucesso por colecistocentese percutânea ecoguiada.\n' +
      '- Implicação prática: ratifica a necessidade mandatória de colecistocentese em felinos ictéricos com suspeita ecográfica quando os exames coprológicos forem negativos.',
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
      'Mecanismos de transmissão e epidemiologia heteroxênica:\n' +
      '- Ciclo heteroxênico estrito: enfermidade não contagiosa por contato direto entre gatos ou ingestão de fezes contaminadas.\n' +
      '- Vias biológicas obrigatórias: a transmissão exige passagem por moluscos terrestres e isópodes de jardim, com amplificação paratênica opcional em répteis bioacumuladores.',
  },

  pathophysiology: {
    cineticaPatogenicaEHiperplasiaDuctal:
      'Reação proliferativa e hiperplasia adenomatosa ductal:\n' +
      '- Agressão epitelial inicial: a lesão primária de Platynosomum illiciens consiste em colangite epitelial e periductal provocada pela presença física dos trematódeos adultos (4 a 8 mm de comprimento).\n' +
      '- Proliferação celular: mitoses repetidas dos colangiócitos sob irritação mecânica das ventosas resultam em hiperplasia epitelial adenomatosa com projeções papilares luminais (Campos-Camacho et al., 2026; Köster et al., 2016).\n' +
      '- Estase luminal: invaginações papilares associadas à hipersecreção mucosa das glândulas periductais geram estreitamento crítico do lúmen e deposição de debris biliares.',

    colestaseFibroseEColangiectasia:
      'Transição fibrosante, colangiectasia e dano hepatocitário:\n' +
      '- Fibroplasia periductal: transição da inflamação eosinofílica/neutrofílica para fibrose concêntrica periportal densa em anéis (padrão em "casca de cebola").\n' +
      '- Ectasia compensatória: a rigidez parietal impede a expansão funcional, culminando em dilatação cística tortuosa sacular dos ductos proximais intra-hepáticos (colangiectasia).\n' +
      '- Citotoxicidade biliar: o refluxo canalicular de ácidos biliares hidrofóbicos retidos sob pressão exerce potente efeito detergente sobre as membranas dos hepatócitos, desencadeando apoptose e necrose periportal mista.',

    mecanismoDaIctericiaHepaticaPosHepatica:
      'Mecanismos combinados da icterícia clínica na platinosomose:\n' +
      '- Fisiopatologia mista: combina componente hepático (dano hepatocitário por colestase) e pós-hepático (obstrução mecânica ductal por massa parasitária, muco e estenose).\n' +
      '- Predomínio de bilirrubina direta: a retenção da fração conjugada extravasa por refluxo canalicular para sinusoides e capilares linfáticos hepáticos.\n' +
      '- Limiar semiológico: depósito progressivo em tecidos ricos em elastina (esclera, palato mole, base da orelha) com icterícia visível quando a bilirrubina total ultrapassa 1,5 a 2,0 mg/dL.',

    associacaoComColangiocarcinoma:
      'Associação anatomopatológica com neoplasias biliares malignas:\n' +
      '- Evidências necrópsicas: Andrade et al. (2012) identificaram colangiocarcinoma em 3 de 11 gatos parasitados por Platynosomum, com displasia e atipia epitelial em outros 6 animais.\n' +
      '- Mecanismos oncogênicos: a irritação mecânica crônica, espécies reativas de oxigênio e estímulo mitogênico contínuo deflagram instabilidade genômica, mimetizando a carcinogênese humana por Opisthorchis e Clonorchis.\n' +
      '- Contextualização oncológica: conforme o tratado Withrow & MacEwen\'s (6ª ed., Cap. 23), o colangiocarcinoma também ocorre em áreas não endêmicas; Platynosomum atua como promotor inflamatório crônico de alta relevância.',
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
        'Metodologia coproparasitológica especializada:\n' +
        '- Princípio técnico: centrifugação em sacarose saturada de Sheather calibrada em densidade 1,28 g/mL a 1.500 rpm por 10 minutos com lamínula superior.\n' +
        '- Características morfológicas: ovos operculados, elípticos, marrom-amarelados (20-35 µm de largura por 34-50 µm de comprimento).\n' +
        '- Amostragem seriada: três amostras consecutivas em dias alternados para minimizar o impacto da excreção intermitente.',
      interpretation:
        'Interpretação e limitações dos achados coprológicos:\n' +
        '- Resultado positivo: confirmação categórica de infecção ativa por Platynosomum illiciens.\n' +
        '- Falso-negativo: resultado negativo NÃO descarta platinosomose; fases pré-patentes (< 8 semanas), baixa carga e obstrução mecânica biliar impedem a chegada dos ovos às fezes.',
      limitations:
        'Flotação simples de rotina com cloreto de sódio ou sulfato de zinco (SG 1,20) falha em flutuar ovos pesados; a sensibilidade em fezes é nula se houver obstrução biliar mecânica total.',
      isGoldStandard: false,
    },
    {
      stepNumber: 2,
      title: 'Ultrassonografia Hepatobiliar Meticulosa de Alta Resolução',
      purpose: 'Mapeamento anatômico da vesícula biliar, calibre dos ductos e identificação de colangiectasia',
      description:
        'Protocolo ultrassonográfico hepatobiliar minucioso:\n' +
        '- Equipamento e varredura: transdutor microconvexo ou linear de alta frequência (8 a 12 MHz) avaliando parênquima, vesícula, ducto cístico, colédoco e papila duodenal.\n' +
        '- Critérios morfométricos: colédoco felino normal < 4 mm; mensurações > 5 mm indicam ectasia patológica associada a tortuosidade bizarra e debris ecogênicos.',
      interpretation:
        'Achados ecográficos e correlação patológica:\n' +
        '- Padrão sugestivo: ductos intra-hepáticos tortuosos dilatados, paredes hiperecogênicas espessadas e vesícula com sludge suportam colangite parasitária em regiões endêmicas.\n' +
        '- Diagnóstico diferencial: a dilatação reflete obstrução mecânica e requer diferenciação de colangite bacteriana e neoplasias biliares.',
      limitations:
        'Não identifica o parasito individualizado na maioria dos casos devido ao seu reduzido calibre; dilatação biliar reflete síndrome obstrutiva e não etiologia específica.',
    },
    {
      stepNumber: 3,
      title: 'Colecistocentese Percutânea Ecoguiada com Análise Citológica e Parasitológica da Bile',
      purpose: 'Identificação direta de ovos operculados e parasitos na bile vesicular e cultura microbiológica',
      description:
        'Procedimento intervencionista de colecistocentese ecoguiada:\n' +
        '- Abordagem trans-hepática: punção sob visão ultrassonográfica contínua com agulha 22G a 25G acoplada a seringa de 3 a 5 mL, atravessando parênquima hepático para selamento do trajeto.\n' +
        '- Análise do aspirado: centrifugação imediata do fluido biliar para sedimento a fresco, citologia em esfregaço corado e cultura microbiológica com antibiograma.',
      interpretation:
        'Padrão ouro parasitológico definitivo:\n' +
        '- Acurácia comparativa: concentração de ovos na bile 20 a 30 vezes superior à fecal (mediana 1.450 ovos/mL na bile vs 46 ovos/mL nas fezes; Köster et al., 2016).\n' +
        '- Confirmação etiológica: diagnóstico inequívoco em pacientes com coprologia fecal persistentemente negativa.',
      limitations:
        'Procedimento invasivo; contraindicado formalmente na presença de coagulopatia descompensada, empiema vesicular com necrose parietal ou obstrução biliar extra-hepática sob risco de ruptura e peritonite biliar.',
      isGoldStandard: true,
    },
    {
      stepNumber: 4,
      title: 'Painel Bioquímico Hepático Completo, Hemograma e Perfil Hemostático',
      purpose: 'Avaliação funcional do parênquima, grau de colestase, resposta inflamatória e hemostasia secundária',
      description:
        'Painel laboratorial mínimo e hemostasia prévia:\n' +
        '- Perfil bioquímico: dosagem de ALT, AST, GGT, ALP, bilirrubinas total/direta/indireta, albumina, proteínas totais, colesterol e glicemia.\n' +
        '- Hemograma e hemostasia: contagem de eosinófilos em esfregaço; tempo de protrombina (PT) e aPTT obrigatórios antes de punções ou biópsias.',
      interpretation:
        'Interpretação clínica e padrão de enzimas biliares:\n' +
        '- Padrão colestático: elevação de GGT e bilirrubina direta confirma colestase ativa; ALT/AST refletem necrose hepatocitária secundária.\n' +
        '- Marcadores imunes e hemostáticos: eosinofilia apoia parasitismo; prolongamento de PT/aPTT indica hipovitaminose K por má absorção entérica.',
      limitations:
        'Alterações enzimáticas são inespecíficas para etiologia helmíntica; ALT e AST podem normalizar na fase terminal de cirrose e fibrose avançada por redução de massa celular viável.',
    },
    {
      stepNumber: 5,
      title: 'Histopatologia Hepática por Biópsia Cirúrgica ou Laparoscópica',
      purpose: 'Caracterização arquitetural da lesão, estadiamento da fibrose e identificação de parasitos intralesionais',
      description:
        'Biópsia hepática cirúrgica ou laparoscópica assistida:\n' +
        '- Coleta tecidual: fragmentos hepáticos em cunha ou saca-bocados de múltiplos lobos abrangendo tríades portais e leito periductal.\n' +
        '- Colorações diagnósticas: HE de rotina e Tricrômico de Masson para quantificação de colágeno periportal concêntrico.',
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
      'Pilares terapêuticos e alinhamento de prognóstico:\n' +
      '- Erradicação e suporte funcional: o tratamento estrutura-se na eliminação farmacológica do trematódeo e no suporte intensivo à função hepatobiliar.\n' +
      '- Limitações anatômicas e sequelas: a morte parasitária não reverte de imediato a fibrose periductal densa ou ectasias císticas prévias, podendo restar colangiectasias residuais crônicas.\n' +
      '- Critérios de sucesso clínico: resolução da anorexia e vômitos, ganho ponderal sustentado, clareamento da icterícia e normalização progressiva das enzimas biliares.',

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
      'Mecanismo de ação e regimes farmacológicos de praziquantel:\n' +
      '- Mecanismo antiparasitário: alteração profunda na permeabilidade ao cálcio no tegumento do trematódeo, causando influxo de Ca2+, contração espástica e vacuolização tegumentar irreversível exposta à imunidade (Plumb\'s 10ª ed.).\n' +
      '- Ineficácia da dose de rotina: a dose convencional para cestódeos (5 mg/kg) falha completamente nos ductos biliares; o ensaio de Lathroum et al. (2018) comprovou que 20 mg/kg IM q24h por 3 dias erradicou vermes vivos em apenas 50% dos gatos em necropsia.\n' +
      '- Protocolo de escolha (Plumb\'s 10ª ed.): regime oral estendido de 30 mg/kg VO a cada 24 horas por 5 a 10 dias consecutivos para máxima eliminação tecidual.\n' +
      '- Manejo profilático de êmese: administração prévia de maropitant (1 mg/kg SC/VO) para prevenir náusea e sialorreia associadas a doses altas de praziquantel.',

    avaliacaoCriticaDoFenbendazol:
      'Avaliação crítica e papel clínico do fenbendazol:\n' +
      '- Uso empírico associado: utilizado empiricamente na dose de 50 mg/kg VO a cada 24 horas por 3 a 5 dias em protocolos combinados latino-americanos (Sousa et al., 2025).\n' +
      '- Ausência de comprovação isolada: inexistem estudos controlados com contagem direta de vermes vivos em necropsia que atestem ação trematodicida isolada contra P. illiciens.\n' +
      '- Papel como coadjuvante: recomendável apenas como adjuvante ou para desparasitação de nematódeos intestinais concomitantes (Ancylostoma, Toxocara), nunca substituindo o praziquantel.',

    suporteClinicoNutricionalEColeretico:
      'Suporte intensivo, nutrição precoce e modulação colerética:\n' +
      '- Estabilização eletrolítica: fluidoterapia balanceada (Ringer Lactato ou Plasmalyte) com reposição de cloreto de potássio guiada por ionograma, combatendo hipocalemia e fraqueza muscular.\n' +
      '- Prevenção mandatória de lipidose hepática: veto absoluto a jejum prolongado superior a 48 horas; inserção precoce de sonda nasoesofágica ou esofagostomia para dieta líquida hiperproteica fracionada.\n' +
      '- Modulação biliar com ácido ursodesoxicólico (UDCA): 10 a 15 mg/kg VO q24h com alimento para colerese hidrofílica, citoproteção e redução da viscosidade biliar.\n' +
      '- Veto fisiológico estrito ao UDCA: contraindicado em quadros de obstrução biliar mecânica extra-hepática total comprovada sem descompressão cirúrgica.',

    criteriosParaIntervencaoCirurgica:
      'Indicações críticas e técnicas cirúrgicas biliares de resgate:\n' +
      '- Critérios de indicação cirúrgica: obstrução mecânica extra-hepática persistente refratária com colédoco > 8 a 10 mm em tensão, necrose de parede vesicular, colecistite enfisematosa ou peritonite biliar por microperfuração.\n' +
      '- Opções técnicas de intervenção: colecistectomia (em necrose ou empiema vesicular), desvios biliares (colecistoduodenostomia ou colecistojejunostomia em Y de Roux) e colocação de stent transpapilar.\n' +
      '- Estabilização hemostática prévia: procedimento de alto risco perioperatório que exige correção de coagulopatia com fitomenadiona (vitamina K1) e plasma fresco congelado.',

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
      'Protocolo de vigilância e reavaliações longitudinais:\n' +
      '- Cronograma de revisões: reavaliações clínicas e laboratoriais seriadas aos 15, 30 e 60 dias pós-conclusão do praziquantel.\n' +
      '- Marcadores séricos: controle rigoroso de peso, icterícia, ALT, GGT, fosfatase alcalina e bilirrubina total e frações.\n' +
      '- Controle imaginológico aos 30 dias: ultrassonografia abdominal para acompanhar a regressão da ectasia ductal e da espessura vesicular.\n' +
      '- Coprologia seriada de controle: exame coproparasitológico por dupla centrifugação com Sheather em 3 amostras após 30 dias.',
  },

  complications: {
    obstrucaoBiliarExtrahepaticaCompleta:
      'Obstrução mecânica extra-hepática completa:\n' +
      '- Mecanismo obstrutivo: impactação luminal do colédoco terminal e da papila duodenal por agregados parasitários, muco hipersecretado viscoso e espessamento fibrótico parietal.\n' +
      '- Riscos críticos: estase biliar total, hidropisia vesicular sob tensão severa e risco iminente de ruptura com peritonite biliar química ou séptica.',

    colangioepatiteBacterianaSecundaria:
      'Colangioepatite bacteriana secundária ascendente:\n' +
      '- Ruptura de barreira: perda do fluxo laminar contínuo de bile e destruição da barreira mucociliar ductal.\n' +
      '- Infecção ascendente: translocação retrógrada duodenal de enterobactérias (E. coli, Enterococcus spp., Clostridium spp.), convertendo o quadro em colangite neutrofílica supurativa com sepse sistêmica.',

    cirroseBiliarEHipertensaoPortal:
      'Cirrose biliar secundária e síndrome de hipertensão portal:\n' +
      '- Remodelamento fibrótico: deposição desordenada e crônica de colágeno periportal pelos miofibroblastos em resposta à irritação parasitária persistente.\n' +
      '- Falência hepatobiliar: desestruturação da arquitetura lobular com fibrose em pontes, hipertensão portal pré-senusoidal, esplenomegalia congestiva e desenvolvimento de ascite.',

    lipidoseHepaticaSecundaria:
      'Lipidose hepática secundária por anorexia prolongada:\n' +
      '- Mobilização lipídica: a hiporexia e anorexia decorrentes da dor biliar e náusea ativam a lipase hormônio-sensível no tecido adiposo periférico.\n' +
      '- Sobrecarga hepatocitária: acúmulo maciço de triglicerídeos superando a capacidade de beta-oxidação e secreção de VLDL do fígado felino já inflamado.',

    coagulopatiaPorMalabsorcaoVitaminaK:
      'Coagulopatia adquirida por má absorção entérica de vitamina K:\n' +
      '- Falha na emulsificação: carência crônica intraluminal de sais biliares conjugados no intestino delgado prejudicando a formação de micelas mistas.\n' +
      '- Disfunção hemostática: deficiência de vitamina K lipossolúvel com inativação dos fatores II, VII, IX e X, provocando prolongamento de PT/aPTT e diáteses hemorrágicas.',
  },

  prevention: {
    confinamentoIndoorEBloqueioDePredacao:
      'Manejo estritamente indoor e enriquecimento ambiental:\n' +
      '- Bloqueio do acesso externo: confinamento estrito do felino com telas de proteção em janelas e varandas para eliminar a caça predatória.\n' +
      '- Interrupção do ciclo: previne a ingestão de hospedeiros intermediários (tatuzinhos-de-jardim) e paratênicos (lagartixas, geckos e anfíbios).',

    controleAmbientalDeIsopodesECaracois:
      'Controle higiênico e manejo ambiental peridomiciliar:\n' +
      '- Redução de umidade: higienização periódica de quintais, remoção de entulhos, folhas úmidas e controle de vasos de plantas.\n' +
      '- Supressão de vetores: desfavorece o nicho ecológico de moluscos gastrópodes (Subulina octona) e isópodes terrestres (Oniscidea).',

    rastreamentoCoproparasitologicoEspecializado:
      'Triagem coproparasitológica periódica especializada:\n' +
      '- Método mandatório: execução periódica semestral ou anual de dupla centrifugação com solução saturada de Sheather (densidade 1,28 g/mL).\n' +
      '- População-alvo: indicado para felinos com histórico pregresso de acesso externo ou procedentes de regiões tropicais hiperendêmicas.',

    profilaxiaAntiparasitariaRacional:
      'Educação do tutor e esclarecimento profilático racional:\n' +
      '- Limitação dos vermífugos comuns: conscientização de que desparasitações habituais em dose única (5 mg/kg) não previnem nem tratam Platynosomum.\n' +
      '- Segurança clínica: evitar a falsa sensação de proteção conferida por vermífugos genéricos de amplo espectro.',

    avaliacaoImaginologicaPrecoce:
      'Triagem ultrassonográfica preventiva precoce:\n' +
      '- Mapeamento ecográfico: inclusão do ultrassom hepatobiliar na rotina de check-up de gatos adultos procedentes de áreas endêmicas com histórico de caça.\n' +
      '- Detecção pré-clínica: identificação precoce de colangiectasias e espessamento de parede vesicular antes da eclosão da icterícia clínica.',
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
