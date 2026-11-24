import { DiseaseRecord } from '../../types/disease';

export const pancreatiteCaesGatosRecord: DiseaseRecord = {
  id: 'disease-pancreatite-caes-gatos',
  slug: 'pancreatite-caes-gatos',
  title: 'Pancreatite em cães e gatos',
  subtitle:
    'Doença inflamatória do pâncreas exócrino — formas aguda, crônica e agudizada, diferenças entre cães e gatos, diagnóstico integrado e manejo intensivo e nutricional baseado em evidências',
  synonyms: [
    'Pancreatite aguda canina e felina',
    'Pancreatite crônica e agudização da pancreatite crônica',
    'Pancreatite necrotizante',
    'Pancreatite imunomediada (tipo IgG4)',
    'Acute and chronic pancreatitis in dogs and cats',
    'Feline and canine pancreatitis',
  ],
  species: ['dog', 'cat'],
  category: 'hepatologia-pancreas',
  categories: [
    'gastroenterologia',
    'hepatologia-pancreas',
    'intensivismo',
    'fluidoterapia-disturbios-hidroeletroliticos',
    'nutricao-clinica',
  ],
  tags: [
    'Pancreatite',
    'cPLI',
    'fPLI',
    'DGGR',
    'Nutrição enteral precoce',
    'Fuzapladibe',
    'Hipocalcemia ionizada',
    'SIRS',
    'Tríade felina',
    'Cocker Spaniel Inglês',
    'Schnauzer Miniatura',
    'Hipertrigliceridemia',
  ],
  isPublished: true,
  source: 'seed',
  quickSummary:
    'Processo inflamatório do pâncreas exócrino desencadeado por ativação intra-acinar prematura de zimogênios e amplificação microcirculatória, cursando como quadro agudo (edema, infiltrado neutrofílico e necrose variável) ou crônico (fibrose, atrofia acinar e infiltrado mononuclear, com agudizações). Cães tendem a apresentar vômitos, anorexia e dor abdominal cranial; gatos cursam com letargia, anorexia e perda de peso, frequentemente sem vômitos ou dor evidente (<40%). Nenhum exame isolado confirma ou descarta todos os casos: o diagnóstico integra clínica, lipase pancreática validada (Spec cPL/fPL) e ultrassonografia. O manejo sustenta-se em fluidoterapia modulada sem hiperidratação, analgesia multimodal opioide, antieméticos, suporte enteral precoce (≤48 h, abandonando jejum prolongado) e busca de comorbidades (hipertrigliceridemia, endocrinopatias, tríade felina e obstrução biliar).',
  quickDecisionStrip: [
    'Gatos frequentemente não apresentam vômitos nem dor abdominal evidente: anorexia e letargia isoladas exigem investigar pancreatite e tríade felina.',
    'Lipase pancreática elevada isolada não fecha diagnóstico: o ponto de corte, o ensaio (Spec vs. catalítico) e comorbidades alteram a interpretação.',
    'Ultrassom abdominal normal não exclui pancreatite — lesões iniciais (intervalo de 40–52 h para expressão sonográfica) ou crônicas podem ser sutis.',
    'Evite jejum prolongado ("repouso pancreático"): nutrição enteral precoce preserva a barreira intestinal, reduz translocação bacteriana e melhora sobrevida.',
    'Choque, hipocalcemia ionizada, LRA, hipoxemia e coagulopatia sinalizam evolução sistêmica (SIRS/MODS) e indicam monitorização intensiva imediata.',
  ],
  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'A pancreatite é a afecção mais prevalente do pâncreas exócrino em cães e gatos, resultando da ==autodigestão enzimática intra-acinar== seguida de resposta inflamatória local e, nos quadros graves, ==tempestade de citocinas e disfunção orgânica múltipla== {{ref:ref-forman-2021-acvim}} {{ref:ref-lim-2024-javma}}. Embora compartilhem a mesma base histopatológica, cães costumam manifestar vômitos e dor abdominal cranial, enquanto gatos frequentemente apresentam apenas anorexia e letargia, exigindo integração entre clínica, lipase pancreática validada, ultrassonografia e manejo enteral precoce sem jejum prolongado {{ref:ref-cridge-2024-nutrition}}.',
    leadHighlights: [
      'autodigestão enzimática intra-acinar',
      'tempestade de citocinas e disfunção orgânica múltipla',
      'anorexia e letargia',
      'sem jejum prolongado',
    ],
    pillars: [
      {
        title: 'Diagnóstico sem exame único soberano',
        body:
          'Integrar suspeita clínica, perfil mínimo (eletrólitos, cálcio ionizado, triglicerídeos em jejum e bilirrubina), lipase pancreática validada e ultrassonografia seriada, reservando histopatologia apenas a casos cirúrgicos ou suspeita neoplásica {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}.',
        highlights: ['cálcio ionizado', 'lipase pancreática validada', 'ultrassonografia seriada'],
      },
      {
        title: 'Terapia de suporte intensiva e racional',
        body:
          'Corrigir hipovolemia/desidratação com cristaloides balanceados ajustados às perdas sem hiperidratação, controlar dor visceral com opioides sem AINEs, associar maropitant e/ou ondansetrona e iniciar dieta ou sonda enteral precocemente (≤48 h) {{ref:ref-lim-2024-javma}} {{ref:ref-cridge-2024-nutrition}}.',
        highlights: ['sem hiperidratação', 'opioides sem AINEs', 'precocemente (≤48 h)'],
      },
      {
        title: 'Busca ativa de gatilhos e comorbidades',
        body:
          'Rastrear hipertrigliceridemia primária/secundária, síndrome de Cushing, diabetes mellitus, hipotireoidismo e fármacos em cães; tríade felina (colangite/enteropatia crônica) e risco de lipidose hepática em gatos {{ref:ref-forman-2021-acvim}} {{ref:ref-cridge-2024-nutrition}}.',
        highlights: ['hipertrigliceridemia', 'tríade felina', 'lipidose hepática'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico em 6 etapas',
      steps: [
        {
          label: '1. Reconhecer o fenótipo da espécie',
          detail:
            'Em cães: vômitos, anorexia, dor cranial e desidratação; em gatos: anorexia/hiporexia, letargia e perda ponderal mesmo sem vômitos {{ref:ref-forman-2021-acvim}} {{ref:ref-lim-2024-javma}}.',
        },
        {
          label: '2. Estabilizar e colher banco mínimo',
          detail:
            'Hemograma, bioquímica hepatorrenal, eletrólitos (K⁺, cálcio ionizado), glicemia, triglicerídeos em jejum, urinálise pré-fluido e coagulograma em quadros graves {{ref:ref-juarez-2026-animals}} {{ref:ref-siriphanporn-2025-animals}}.',
        },
        {
          label: '3. Dosar lipase pancreática validada',
          detail:
            'Spec cPL (≥400 µg/L) ou SNAP cPL em cães; Spec fPL (corte clássico ≥5,4 µg/L e corte específico reavaliado ≥8,8 µg/L em gatos) — amilase/lipase séricas tradicionais não têm acurácia {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}.',
        },
        {
          label: '4. Imagem abdominal integrada',
          detail:
            'Radiografia descarta corpo estranho/íleo mecânico; ultrassonografia avalia hipoecogenicidade, aumento glandular, mesentério hiperecoico, efusão e dilatação de via biliar (repetir em 40–52 h se clínica persiste) {{ref:ref-leoni-2020-vetsci}}.',
        },
        {
          label: '5. Investigar comorbidades e complicações',
          detail:
            'Efusão livre -> abdominocentese (exsudato estéril vs. séptico/biliar); investigar colangite/enteropatia em gatos e endocrinopatias ou pancreatite autoimune (Cocker Spaniel Inglês) em cães {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}.',
        },
        {
          label: '6. Estratificar gravidade e risco prognóstico',
          detail:
            'Monitorar pressão arterial, débito urinário, oxigenação, lactato, albumina e cálcio ionizado; escores CAPS/MCAI/APPLE auxiliam na triagem prognóstica, sem substituir julgamento clínico seriado {{ref:ref-cridge-2025-jvim}} {{ref:ref-siriphanporn-2025-animals}}.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico em 6 etapas',
      steps: [
        {
          label: '1. Fluidoterapia individualizada e eletrólitos',
          detail:
            'Cristaloide isotônico balanceado (Ringer com lactato preferido) para perfusão e reposição sem hipervolemia iatrogênica; suplementar KCl e corrigir hipocalcemia ionizada sintomática ou crítica {{ref:ref-lim-2024-javma}}.',
        },
        {
          label: '2. Analgesia multimodal prioritária',
          detail:
            'Assumir dor em todo paciente: metadona ou fentanil (CRI) em dor moderada a intensa; buprenorfina (IV/IM ou OTM em gatos) em quadros leves; lidocaína/cetamina em CRI adjuvante. Proscrever AINEs {{ref:ref-lim-2024-javma}}.',
        },
        {
          label: '3. Controle de náusea e vômito',
          detail:
            'Maropitant (1 mg/kg SC/IV q24h, ação antiemética central/periférica) ± ondansetrona (0,1–0,5 mg/kg IV lento/SC q6–12h); metoclopramida somente se descartada obstrução mecânica. Evitar IBP rotineiro sem úlcera {{ref:ref-forman-2021-acvim}} {{ref:ref-lim-2024-javma}}.',
        },
        {
          label: '4. Nutrição enteral precoce (≤48 h)',
          detail:
            'Iniciar alimentação oral ou por sonda (nasoesofágica/esofágica) assim que vômitos incoercíveis controlados, começando com 25–33% da RER. Em cães (sobretudo com hiperlipidemia): dieta baixa em gordura; em gatos: priorizar aceitação e proteína para prevenir lipidose {{ref:ref-cridge-2024-nutrition}}.',
        },
        {
          label: '5. Terapia alvo e indicações restritas',
          detail:
            'Considerar fuzapladibe sódico IV por 3 dias em cães elegíveis (onde aprovado e disponível); antibióticos apenas diante de infecção documentada/sepse/colangite; corticoides apenas em indicações específicas {{ref:ref-steiner-2023-fuzapladib}} {{ref:ref-fda-panoquell}}.',
        },
        {
          label: '6. Monitoramento e transição ambulatorial',
          detail:
            'Reavaliar dor, ingestão calórica, fósforo (risco de realimentação), função renal e icterícia; manejar dor crônica, insuficiência exócrina ou diabetes secundário na alta {{ref:ref-msd-2025-pancreatite}}.',
        },
      ],
    },
    tabelaDecisaoClinicaRapida: {
      kind: 'clinicalTable',
      caption: 'Seis alertas clínicos de beira de leito e leitura rápida por espécie',
      headers: ['Alerta crítico', 'Erro clínico frequente', 'Conduta baseada em evidências'],
      rows: [
        [
          'Gatos pouco sintomáticos',
          'Descartar pancreatite porque o gato não vomita nem grita à palpação abdominal',
          'Investigar pancreatite e tríade felina em qualquer gato anoréxico/letárgico; menos de 40% dos gatos exibem vômito ou dor evidente {{ref:ref-forman-2021-acvim}}.',
        ],
        [
          'Lipase elevada ≠ diagnóstico isolado',
          'Iniciar protocolo fechado só pelo valor de lipase ou ensaio rápido positivo',
          'Confirmar compatibilidade clínica/ultrassonográfica e considerar causas secundárias (hipoperfusão, lesão renal, obstrução GI, corpo estranho) {{ref:ref-wolfer-2022-vetsci}}.',
        ],
        [
          'Ultrassom normal na triagem',
          'Concluir ausência de pancreatite após exame inicial negativo nas primeiras horas',
          'Lesões discretas, crônicas ou muito precoces podem ser indetectáveis na admissão; repetir ultrassom em 40–52 h se houver persistência clínica {{ref:ref-leoni-2020-vetsci}}.',
        ],
        [
          'Evitar jejum prolongado ("repouso")',
          'Manter paciente 3–5 dias em jejum absoluto até cessar qualquer náusea residual',
          'O jejum causa atrofia vilositária e translocação bacteriana; controlar náusea/dor e nutrir enteralmente em até 24–48 h {{ref:ref-cridge-2024-nutrition}}.',
        ],
        [
          'Disfunção orgânica e cálcio ionizado',
          'Tratar como internação simples pacientes com choque, hipocalcemia ionizada, LRA ou coagulopatia',
          'Sinaliza SIRS/MODS e pior sobrevida (especialmente iCa baixa em gatos e azotemia/hipoalbuminemia em cães); acionar monitorização de UTI {{ref:ref-siriphanporn-2025-animals}} {{ref:ref-juarez-2026-animals}}.',
        ],
        [
          'Fuzapladibe (Panoquell-CA1)',
          'Adotar como substituto da estabilização ou presumir eficácia comprovada em gatos e sobrevida definitiva',
          'Aprovação condicional nos EUA para redução de escore clínico em cães agudos (3 dias IV); ainda requer avaliação crítica, sem indicação validada em gatos {{ref:ref-steiner-2023-fuzapladib}} {{ref:ref-fda-panoquell}}.',
        ],
      ],
    },
  },
  etiology: {
    visaoGeral:
      'Na grande maioria dos casos em cães e gatos, a causa primária exata não é identificada na rotina, classificando a doença como **idiopática** {{ref:ref-forman-2021-acvim}} {{ref:ref-lim-2024-javma}}. Entretanto, a expressão clínica resulta da convergência entre ==fatores predisponentes individuais== (genética racial, idade, obesidade, dislipidemia, endocrinopatias) e ==gatilhos agudos ou crônicos== capazes de superar os mecanismos de defesa acinar (isquemia/hipotensão, obstrução ou refluxo ductal, toxemia e fármacos) {{ref:ref-msd-2025-pancreatite}}.',
    classificacaoTabela: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Classificação anatomoclínica: pancreatite aguda, crônica e agudizada',
      headers: [
        'Característica',
        'Pancreatite aguda',
        'Pancreatite crônica',
        'Agudização da pancreatite crônica',
      ],
      rows: [
        [
          'Alteração histológica predominante',
          'Edema intersticial, infiltrado neutrofílico, lesão acinar e necrose pancreática/peripancreática variável',
          'Fibrose progressiva (ativação de células estreladas), atrofia acinar e infiltrado mononuclear (linfocitário/linfoplasmocitário)',
          'Lesões inflamatórias agudas (neutrofílicas/necróticas) sobrepostas a fibrose e atrofia crônicas preexistentes {{ref:ref-lombardo-2026-vetsci}}',
        ],
        [
          'Reversibilidade estrutural',
          'Potencialmente reversível com recuperação completa do parênquima',
          'Alterações arquiteturais irreversíveis, com perda gradativa de massa exócrina e endócrina',
          'Recuperação parcial do componente inflamatório agudo, persistindo a fibrose de base',
        ],
        [
          'Evolução clínica',
          'Início súbito; pode variar de forma leve autolimitada a necrose fulminante com SIRS/MODS',
          'Frequentemente subclínica ou insidiosa, com episódios recorrentes leves e risco tardio de DM ou IPE',
          'Crise aguda clinicamente indistinguível da pancreatite aguda primária em paciente com doença crônica subjacente',
        ],
        [
          'Lipase pancreática e imagem',
          'Lipase pancreática frequentemente elevada; ultrassom mostra edema, hipoecogenicidade e esteatite peripancreática',
          'Sensibilidade menor (frequentemente 42–58% no cão); pode haver hiperecogenicidade, contorno irregular ou exame normal',
          'Variável conforme extensão do componente agudo ativo sobre o parênquima remanescente',
        ],
      ],
    },
    fatoresRiscoEGatilhos:
      '**Fatores e gatilhos no cão:** indiscrição alimentar (lixo, restos de mesa ou refeição abruptamente hiperlipídica), obesidade e **hipertrigliceridemia** (especialmente acentuada, >600–800 mg/dL, idiopática no Schnauzer Miniatura ou secundária), além de endocrinopatias como hiperadrenocorticismo, hipotireoidismo e diabetes mellitus {{ref:ref-msd-2025-pancreatite}} {{ref:ref-lim-2024-javma}}. Hipoperfusão ou hipotensão perioperatória — mais do que manipulação cirúrgica isolada — constitui importante indutor isquêmico {{ref:ref-msd-2025-pancreatite}}. Entre agentes infecciosos e parasitários, destacam-se *Babesia* spp. (em que a elevação de lipase pancreática associa-se a pior prognóstico) e ehrlichiose/leishmaniose em áreas endêmicas. Fármacos com associação relatada ou idiossincrática incluem azatioprina, L-asparaginase, sulfonamidas potencializadas, anticonvulsivantes (fenobarbital, brometo de potássio), clomipramina, antimoniato de meglumina, furosemida e intoxicação por zinco ou organofosforados. Em **Cocker Spaniels Ingleses**, descreve-se uma forma crônica autoimune análoga à doença relacionada a IgG4 humana, acometendo ductos pancreáticos, glândulas lacrimais (ceratoconjuntivite seca), salivares, túbulos renais (nefropatia perdedora de proteínas) e sacos anais {{ref:ref-msd-2025-pancreatite}}.\n\n**Fatores e gatilhos no gato:** diferente do cão, não há associação robusta com sexo, obesidade, indiscrição alimentar ou hiperlipidemia {{ref:ref-forman-2021-acvim}}. Traumatismos contusos (quedas de altura, atropelamentos gerando isquemia visceral), hipotensão anestésica, obstrução biliar com refluxo ductal, toxoplasmose (rara), trematódeos pancreáticos (*Eurytrema procyonis*, *Amphimerus pseudofelineus* em regiões específicas), infecções virais sistêmicas e intoxicação por organofosforados tópicos (como fention) compõem os gatilhos descritos, ao lado da forte co-ocorrência com enteropatia inflamatória crônica, colangite (tríade felina), diabetes mellitus e lipidose hepática {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}.',
    predisposicaoGenetica:
      'Predisposições raciais caninas incluem Schnauzer Miniatura (frequentemente associado à hipertrigliceridemia idiopática e a polimorfismos investigados no gene *SPINK1*, cujo papel causal direto ainda é debatido), Yorkshire Terrier e outros terriers, cães não esportivos e de pequeno porte, além de Cavalier King Charles Spaniel, Collie, Boxer e Cocker Spaniel Inglês nas formas crônicas {{ref:ref-lim-2024-javma}} {{ref:ref-msd-2025-pancreatite}}. Em cães, mutações clássicas humanas em tripsinogênio catiônico (*PRSS1*) e *CFTR* não demonstraram associação consistente. Cães castrados de ambos os sexos e pacientes de meia-idade a idosos apresentam maior frequência diagnóstica em ambas as espécies, embora gatos jovens também possam ser acometidos {{ref:ref-forman-2021-acvim}}.',
  },
  epidemiology: {
    prevalenciaComparada:
      'Estudos pós-morte demonstram prevalência histológica de lesões pancreáticas inesperadamente alta em ambas as espécies, frequentemente subclínicas: cerca de **34–70% em cães** examinados à necropsia (com predominância de achados crônicos sobre lesões puramente agudas) e até **45–67% em gatos** saudáveis ou doentes avaliados post-mortem {{ref:ref-forman-2021-acvim}}. Essa discrepância evidencia que uma parcela relevante das pancreatites crônicas permanece clinicamente silenciosa ao longo da vida ou cursa com sinais leves intermitentes.',
    perfilEpidemiologico:
      'Clinicamente, cães machos ou fêmeas de meia-idade a idosos, castrados, com sobrepeso ou comorbidades metabólicas lideram os atendimentos hospitalares; até 40% dos cães com pancreatite aguda fatal apresentam fibrose crônica preexistente à histologia. Em felinos, gatos Domésticos de Pelo Curto (SRD) constituem a maioria dos casos clínicos sem clara predileção sexual, frequentemente com comorbidades simultâneas (enteropatias crônicas, hepatopatias inflamatórias, lipidose, nefropatias e diabetes mellitus), o que exige abordagem diagnóstica abrangente desde o primeiro atendimento {{ref:ref-forman-2021-acvim}} {{ref:ref-siriphanporn-2025-animals}}.',
  },
  pathogenesisTransmission: {
    naoTransmissivelEAnatomiaDuctal:
      'A pancreatite **não é uma doença transmissível** entre animais ou para humanos; trata-se de evento inflamatório endógeno ou secundário a comorbidades/isquemia.\n\nUma diferença anatômica crítica explica por que cães e gatos apresentam predisposições fisiopatológicas distintas: na maioria dos **cães**, o ducto pancreático acessório (menor) e o ducto pancreático principal drenam em papilas separadas do ducto colédoco, mantendo o sistema biliar e o pancreático anatomicamente dissociados. Em contraste, em cerca de **80% dos gatos**, o ducto pancreático principal funde-se ao ducto biliar comum antes de desembocar na papila duodenal maior {{ref:ref-forman-2021-acvim}}. Soma-se a isso uma população bacteriana fisiologicamente muito mais elevada no duodeno proximal felino em relação ao canino, criando base anatômica e microbiológica para refluxo duodenopancreático, colangite ascendente e coexistência com doença inflamatória intestinal — a denominada **tríade felina**.',
    figuraAnatomiaDuctal: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/triade-felina/confluencia-ductal-papila-duodenal-animals2025.jpg',
      alt: 'Esquema anatômico da confluência entre o ducto biliar comum e o ducto pancreático principal na papila duodenal maior felina',
      caption:
        'Base anatômica da suscetibilidade felina ao refluxo bilioductal e à tríade felina: na maior parte dos gatos, o ducto biliar comum e o ducto pancreático principal compartilham uma saída única na papila duodenal maior, contrastando com a drenagem geralmente separada no cão {{ref:ref-forman-2021-acvim}}.',
      shortCaption: 'Confluência ductal hepatobiliopancreática na papila duodenal maior felina',
      display: 'compact',
    },
    cascatasCelularesETeciduais:
      '**Fase intracelular (eventos acinares):** fisiologicamente, o pâncreas protege-se contra autodigestão sintetizando enzimas digestivas como pró-enzimas inativas (**zimogênios**, com exceção da lipase e amilase), segregando-as dos lisossomos no complexo de Golgi, mantendo gradiente intracelular estrito de Ca²⁺ e expressando o inibidor secretor pancreático de tripsina (**SPINK1**), capaz de neutralizar cerca de 10% do tripsinogênio eventualmente ativado. Quando ocorre bloqueio da exocitose apical por isquemia/hipóxia, estresse oxidativo, hipercalcemia focal, hiperestimulação por colecistocinina (CCK), toxemia bacteriana ou refluxo biliar/duodenal, os grânulos de zimogênio **colocalizam-se e fundem-se aos lisossomos** (ricos em catepsina B). A catepsina B cliva tripsinogênio em **tripsina ativa**, saturando o SPINK1 e ativando em cascata pró-elastase, pró-fosfolipase A2, quimotripsinogênio e calicreína dentro da célula acinar, acompanhada por colapso mitocondrial e ativação de NF-κB {{ref:ref-forman-2021-acvim}}.\n\n**Fase tecidual e microcirculatória:** a ruptura acinar libera proteases ativas e citocinas (TNF-α, IL-1β, IL-6, fator ativador de plaquetas [PAF]) para o interstício e tecido adiposo peripancreático. A adesão neutrofílica ao endotélio mediada por integrinas como **LFA-1** promove extravasamento inflamatório, edema intersticial e obstrução linfática. Na sequência, agregados leucocitários, endotelina-1 e hipercoagulabilidade local desencadeiam trombose capilar e estase microcirculatória, convertendo apoptose reversível em ==necrose pancreática e esteatonecrose peripancreática== — etapa a partir da qual o tecido necrótico perde resposta direta à simples expansão volêmica {{ref:ref-lim-2024-javma}} {{ref:ref-steiner-2023-fuzapladib}}.\n\n**Via fibrogênica crônica:** agressões repetidas ou subclínicas de baixo grau (estresse oxidativo, alterações de Ca²⁺, acidose tecidual, endotoxemia ou lesão epitelial ductal) mantêm ativadas as **células estreladas pancreáticas (PSCs)** via TGF-β, PDGF e TNF-α, promovendo deposição progressiva de colágeno periacinar, distorção ductal e substituição irreversível de ácinos e ilhotas por fibrose {{ref:ref-forman-2021-acvim}}.',
    notaDidaticaForman2021:
      '**Referência visual científica (Forman et al., 2021 — ACVIM):** os esquemas mecanísticos originais dos eventos intracelulares na pancreatite aguda (Figura 1), da transição para inflamação neutrofílica/necrose (Figura 2) e da ativação das células estreladas na pancreatite crônica (Figura 3) possuem licença acadêmica não comercial e podem ser consultados diretamente no artigo aberto oficial do consenso {{ref:ref-forman-2021-acvim}}.',
  },
  pathophysiology: {
    repercussaoLocalESistemica:
      '**Saturação das antiproteases e SIRS/MODS:** após escaparem do interstício pancreático, proteases livres e lipases atingem a circulação portal e linfática, onde normalmente são sequestradas por inibidores plasmáticos (**α1-antitripsina / α1-inibidor de protease** e **α2-macroglobulina**). Quando a carga proteolítica esgota especialmente a α2-macroglobulina, os complexos e proteases livres ativam os sistemas **complemento, cinina-calicreína (vasodilatação e hipotensão por bradicinina), coagulação e fibrinólise** {{ref:ref-msd-2025-pancreatite}}. Simultaneamente, a lipólise da gordura visceral pela lipase pancreática gera ==ácidos graxos não esterificados (insaturados)== altamente tóxicos ao endotélio e parênquima pulmonar/renal, amplificando a síndrome da resposta inflamatória sistêmica (**SIRS**) e a disfunção de múltiplos órgãos (**MODS**), incluindo lesão pulmonar aguda/SDRA, lesão renal aguda (LRA), arritmias cardíacas por fator depressor miocárdico e coagulação intravascular disseminada (CIVD) {{ref:ref-cridge-2025-jvim}} {{ref:ref-juarez-2026-animals}}.',
    disturbiosMetabolicosEEletroliticos:
      '**Hipocalcemia ionizada (saponificação):** a digestão da gordura peripancreática libera ácidos graxos livres que se ligam ao cálcio extracelular formando sais insolúveis de cálcio ("sabões" de esteatonecrose), além de sequestro em efusões e alterações de PTH/vitamina D. A dosagem de **cálcio ionizado** detecta hipocalcemia com muito maior sensibilidade do que o cálcio total (chegando a mais de 60% em gatos criticamente enfermos versus ~40% no cálcio total) e correlaciona-se a pior prognóstico {{ref:ref-siriphanporn-2025-animals}}.\n\n**Desequilíbrios ácido-base e eletrolíticos:** vômitos profusos de conteúdo gástrico rico em H⁺, Cl⁻ e K⁺ tendem inicialmente à **alcalose metabólica hipoclorêmica hipocalêmica**; contudo, com hipovolemia, estase esplâncnica, acúmulo de lactato e eventual cetoacidose diabética concomitante, o quadro evolui frequentemente para **acidose metabólica de hiato aniônico aumentado** ou distúrbio misto. **Hipocalemia** resulta da somatória entre perdas entéricas, anorexia e hiperaldosteronismo secundário à desidratação; **hipoalbuminemia** reflete simultaneamente proteína de fase aguda negativa, sequestro para terceiro espaço e exsudação peritoneal. A perda de células acinares e de ilhotas em fases crônicas avança para **insuficiência pancreática exócrina (IPE)** (com hipocobalaminemia secundária à queda de fator intrínseco, produzido majoritariamente pelo pâncreas em cães e exclusivamente pelo pâncreas em gatos) e/ou **diabetes mellitus**. Em cães e gatos, edema ou fibrose da cabeça pancreática junto ao colédoco pode ainda comprimir a via biliar gerando **obstrução biliar extra-hepática (EHBDO)** {{ref:ref-msd-2025-pancreatite}} {{ref:ref-lim-2024-javma}}.',
  },
  clinicalSignsPathophysiology: {
    findingsBySystem: [
      {
        system: 'Gastrointestinal e hepatobiliar',
        findings: [
          'Anorexia ou hiporexia (muito frequente em cães [~86%] e sinal cardeal em gatos)',
          'Vômito (com ou sem bile/hematêmese — ~83% nos cães agudos; presente em <40–50% dos gatos)',
          'Náusea silenciosa (ptialismo, lambedura labial, deglutição repetida, aversão alimentar)',
          'Diarreia (frequentemente 24–48 h após o início, eventualmente com hematoquezia ou melena)',
          'Icterícia pós-hepática por compressão ductal (EHBDO) ou colangite concomitante',
        ],
      },
      {
        system: 'Sistêmico, metabólico e comportamental',
        findings: [
          'Letargia e prostração intensa (até ~88% em cães e o achado mais consistente em gatos)',
          'Dor abdominal cranial em cães (~58–59%; posição de prece, desconforto pós-prandial nas formas crônicas) versus dor raramente verbalizada/demonstrada em gatos (<30–40%)',
          'Desidratação clínica (até >90% nos casos moderados a graves) e febre ou hipotermia em choque/SIRS felino',
          'Poliúria/polidipsia (associada a diabetes mellitus concomitante, doença renal ou estresse por náusea/dor)',
        ],
      },
      {
        system: 'Cardiovascular, respiratório e renal (SIRS/MODS)',
        findings: [
          'Taquicardia, pulsos fracos, mucosas pálidas ou congestas e tempo de preenchimento capilar alterado por choque distributivo/hipovolêmico',
          'Taquipneia, dispneia ou crepitações (efusão pleural, pneumonia aspirativa ou lesão pulmonar aguda/SDRA)',
          'Oligúria/anúria e azotemia (LRA isquêmica/inflamatória) além de arritmias ventriculares',
        ],
      },
      {
        system: 'Hematológico, dermatológico e sinais raros',
        findings: [
          'Petéquias, equimoses, melena ou sangramentos em venopunção indicando CIVD',
          'Paniculite pancreática nodular necrotizante (nódulos subcutâneos estéreis ulcerados ou não, ocasionalmente com poliartrite associada)',
          'Em Cocker Spaniel Inglês com doença crônica autoimune: olhos secos (ceratoconjuntivite seca), boca seca ou sinais de doença de saco anal',
        ],
      },
    ],
    physicalExamFindings:
      '**No exame físico:** avaliar primeiramente perfusão, hidratação e estabilidade hemodinâmica. Cães com pancreatite aguda grave frequentemente apresentam desidratação marcada, taquicardia, hipertermia inicial ou hipotermia no choque, mucosas ictéricas (~26%), sensibilidade focal à palpação do quadrante abdominal cranial direito/mesogástrico, rigidez muscular ou **posição de prece** (membros torácicos estendidos ao solo e pelve elevada). Nas formas crônicas caninas, muitos cães exibem apenas desconforto sutil pós-prandial ou perda ponderal discreta. Em gatos, o achado físico pode restringir-se a prostração, hipotermia, desidratação e pelagem opaca, sem resistência abdominal clara — exigindo alto índice de suspeição clínica {{ref:ref-forman-2021-acvim}}.',
    particularidadesCaninasEFelinas: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Diferenças comparativas entre cães e gatos na pancreatite',
      headers: ['Aspecto clínico-patológico', 'Cães', 'Gatos'],
      rows: [
        [
          'Sinais clínicos predominantes',
          'Vômitos, anorexia, letargia, dor abdominal cranial (posição de prece) e diarreia {{ref:ref-lim-2024-javma}}',
          'Letargia/prostração, anorexia e perda de peso; vômito e dor palpável ausentes em >50–60% dos casos {{ref:ref-forman-2021-acvim}}',
        ],
        [
          'Anatomia ductal e microbiologia',
          'Ductos pancreático principal e acessório geralmente separados da papila biliar',
          'Fusão do ducto pancreático principal e colédoco na papila duodenal maior (~80%) + alta carga bacteriana duodenal {{ref:ref-forman-2021-acvim}}',
        ],
        [
          'Fatores nutricionais e metabólicos',
          'Indiscrição alimentar, dietas hiperlipídicas e hipertrigliceridemia (>600–800 mg/dL) são gatilhos clássicos',
          'Sem associação clara à obesidade ou hipertrigliceridemia; toleram teores moderados de gordura, mas têm alto risco de lipidose hepática no jejum {{ref:ref-cridge-2024-nutrition}}',
        ],
        [
          'Comorbidades típicas',
          'Diabetes mellitus, hiperadrenocorticismo, hipotireoidismo, síndrome nefrótica/IgG4 em Cocker Spaniel',
          'Tríade felina (colangite + enteropatia crônica), lipidose hepática e diabetes mellitus {{ref:ref-forman-2021-acvim}}',
        ],
        [
          'Foco nutricional imediato',
          'Nutrição enteral precoce + restrição lipídica (<20% da EM ou ~17–29 g/1000 kcal), rigorosa se hiperlipidemia ou recidiva {{ref:ref-cridge-2024-nutrition}}',
          'Nutrição enteral precoce (≤24–48 h) priorizando aporte proteico-calórico, palatabilidade e compatibilidade com comorbidades; não forçar dieta ultra-hipolipídica se comprometer ingestão {{ref:ref-cridge-2024-nutrition}}',
        ],
        [
          'Terapia alvo emergente',
          'Fuzapladibe sódico IV (aprovação condicional nos EUA para redução de sinais agudos caninos) {{ref:ref-steiner-2023-fuzapladib}}',
          'Sem aprovação ou evidência clínica randomizada estabelecida para fuzapladibe em felinos {{ref:ref-fda-panoquell}}',
        ],
      ],
    },
  },
  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      mode: 'diagnosis',
      title: 'Raciocínio diagnóstico integrado da pancreatite em cães e gatos',
      subtitle:
        'Nenhum teste isolado é absoluto: o diagnóstico definitivo clínico combina apresentação compatível, exclusão de emergências cirúrgicas, lipase pancreática validada e ultrassonografia abdominal.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Suspeita e triagem',
          speciesTag: 'both',
          title: 'Reconhecer cenários de suspeita (cão clássico vs. gato silencioso)',
          quickSummary:
            'Incluir pancreatite no diagnóstico diferencial tanto do cão em vômito agudo e dor abdominal quanto do gato simplesmente apático/anoréxico.',
          quickFacts: [
            { label: 'Cão agudo', value: 'Vômito, anorexia, dor cranial' },
            { label: 'Gato típico', value: 'Anorexia + letargia (frequentemente sem êmese)' },
          ],
          details: [
            {
              label: 'Armadilha da forma crônica e branda',
              content:
                'Episódios cíclicos de hiporexia, desconforto pós-prandial ou fezes amolecidas também podem traduzir pancreatite crônica ou agudizada.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Banco mínimo',
          speciesTag: 'both',
          title: 'Hemograma, perfil bioquímico completo, eletrólitos, cálcio ionizado e urinálise',
          quickSummary:
            'Identificar complicações sistêmicas (LRA, colestase, hipocalcemia ionizada, CIVD) e causas ou fatores predisponentes como hipertrigliceridemia.',
          quickFacts: [
            { label: 'Colher antes do soro', value: 'Urinálise (densidade) + sangue' },
            { label: 'Adicional chave', value: 'Triglicerídeos em jejum + cálcio ionizado' },
          ],
          details: [
            {
              label: 'Achados de alerta',
              content:
                'Hipoalbuminemia, azotemia com isostenúria, hiperbilirrubinemia (EHBDO), trombocitopenia acentuada e hipocalcemia ionizada exigem estadiamento imediato como paciente crítico.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Enzimologia pancreática',
          speciesTag: 'both',
          title: 'Solicitar lipase pancreática específica validada (cPLI/fPLI ou DGGR validado)',
          quickSummary:
            'Evitar amilase e lipase catalítica total inespecíficas; interpretar pontos de corte segundo ensaio e gravidade clínica.',
          quickFacts: [
            { label: 'Cães (Spec cPL)', value: '<200 normal | 200–399 cinza | ≥400 µg/L sugestivo' },
            { label: 'Gatos (Spec fPL)', value: 'Clássico ≥5,4 µg/L | Reavaliado ≥8,8 µg/L (98% esp.)' },
          ],
          details: [
            {
              label: 'Atenção a testes não validados e causas secundárias',
              content:
                'Ensaios catalíticos baseados em DGGR variam entre analisadores e hidrolisam outras lipases (ex.: pós-heparina). Além disso, sepse, corpo estranho ou peritonite podem elevar secundariamente a lipase pancreática.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Diagnóstico por imagem',
          speciesTag: 'both',
          title: 'Radiografia abdominal para diferenciais + Ultrassonografia abdominal seriada',
          quickSummary:
            'Radiografar para descartar obstrução mecânica/corpo estranho radiopaco; usar US para confirmar edema pancreático, esteatite peripancreática e EHBDO.',
          quickFacts: [
            { label: 'US inicial negativo', value: 'Repetir em 40–52 h se clínica persistir' },
            { label: 'Achados de alta esp.', value: 'Pâncreas hipoecoico + gordura hiperecoica' },
          ],
          details: [
            {
              label: 'Por que US e PLI podem discordar',
              content:
                'A lipase pancreática possui meia-vida plasmática curta, enquanto as alterações sonográficas podem surgir tardiamente ou persistir após melhora bioquímica.',
              tone: 'tip',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Complicações e diferenciais',
          speciesTag: 'both',
          title: 'Amostragem de efusões, citologia ou investigação de comorbidades',
          quickSummary:
            'Puncionar líquido livre (diferenciar exsudato estéril de peritonite séptica/biliar); descartar neoplasias ou abdômen cirúrgico; avaliar tríade em gatos e endocrinopatias em cães.',
          quickFacts: [
            { label: 'PAAF ecoguiada', value: 'Útil para diferenciar neoplasia vs. inflamação' },
            { label: 'Biópsia cirúrgica', value: 'Não rotineira; foco pode falhar por distribuição focal' },
          ],
          details: [
            {
              label: 'CT contrastada',
              content:
                'Reservada para casos com gás intestinal interferindo no US, suspeita de trombose de veia porta ou definição pré-cirúrgica complexa.',
              tone: 'default',
            },
          ],
        },
      ],
    },
    principio:
      'O diagnóstico antemortem de pancreatite é **clínico-integrado**: combina anamnese, exame físico, lipase pancreática específica validada e ultrassonografia abdominal, mantendo o rastreio contínuo de diagnósticos diferenciais cirúrgicos (corpo estranho, intussuscepção, peritonite séptica, vólvulo) e comorbidades metabólicas {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}. Em casos leves ou crônicos, tanto a lipase quanto a ultrassonografia perdem sensibilidade.',
    conceitosTestes:
      '**Imunoensaios específicos de lipase pancreática (cPLI / fPLI) vs. ensaios catalíticos (DGGR):** em cães e gatos saudáveis, mais de 99% da lipase pancreática não circula no sangue; lesões acinares liberam essa isoenzima na circulação. Os ensaios imunológicos (**Spec cPL**, **Spec fPL** e os testes rápidos semiquantitativos **SNAP cPL/fPL**) empregam anticorpos dirigidos exclusivamente à estrutura tridimensional da lipase pancreática {{ref:ref-forman-2021-acvim}} {{ref:ref-wolfer-2022-vetsci}}. Em **cães**, Spec cPL ≤200 µg/L torna improvável pancreatite aguda moderada a grave; 201–399 µg/L representa faixa cinzenta/duvidosa; **≥400 µg/L** apresenta alta especificidade (81–100%) {{ref:ref-lim-2024-javma}}. Em **gatos**, o consenso clássico utilizou Spec fPL ≤3,5 µg/L (normal) e ≥5,4 µg/L (compatível); entretanto, reavaliação diagnóstica recente atualizou os limiares para **≤4,4 µg/L** (normal) e **≥8,8 µg/L** (consistente com pancreatite felina, alcançando ~98% de especificidade), reduzindo falsos diagnósticos em doença subclínica {{ref:ref-forman-2021-acvim}}.\n\nOs ensaios catalíticos com substrato **DGGR** medem atividade lipolítica enzimática e apresentam boa concordância estatística em diversas coortes quando devidamente validados em laboratório específico (por exemplo, kappa próximo de 0,80 dependendo do corte local), mas variam substancialmente conforme reagentes, presença de colipase, sais biliares, pH e analisador utilizado, podendo ainda sofrer interferência de lipases extrapancreáticas (hepática e lipoproteica, inclusive após administração de heparina) {{ref:ref-wolfer-2022-vetsci}}.\n\n**Amilase, lipase total clássica e TLI:** amilase e lipase catalítica tradicional não devem ser usadas para diagnosticar ou excluir pancreatite por baixa sensibilidade e baixa especificidade (origem renal, gástrica e hepática). A **imunorreatividade semelhante à tripsina (TLI)** é o exame de escolha para IPE, mas tem sensibilidade limitada (~36–47%) para pancreatite por meia-vida plasmática curta do tripsinogênio e elevação espúria na redução da taxa de filtração glomerular; além disso, crises inflamatórias pancreáticas podem normalizar transitoriamente a TLI em cães com IPE incipiente.',
    tabelaDesempenho: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Desempenho diagnóstico e limitações dos principais testes laboratoriais',
      headers: [
        'Teste / Biomarcador',
        'Princípio e valores de referência principais',
        'Pontos fortes',
        'Limitações e falsos resultados',
      ],
      rows: [
        [
          'Spec cPL / Spec fPL (imunoensaio quantitativo)',
          'Anticorpos anti-lipase pancreática.\nCão: ≤200 (normal), 201–399 (zona cinza), ≥400 µg/L.\nGato: clássico ≥5,4 µg/L; corte reavaliado ≥8,8 µg/L (≤4,4 normal)',
          'Maior especificidade global (cão ~81–100%; gato ~98% com corte revisado); útil para acompanhamento seriado {{ref:ref-lim-2024-javma}}',
          'Sensibilidade menor em formas leves/crônicas (cão crônica ~42–58%); pode elevar-se secundariamente a lesão pancreática por corpo estranho, choque ou sepse',
        ],
        [
          'SNAP cPL / SNAP fPL (ELISA rápido)',
          'Resultado qualitativo/semiquantitativo (normal vs. anormal a partir da zona cinza)',
          'Excelente triagem rápida para excluir pancreatite moderada-grave (sensibilidade cão >90%) {{ref:ref-forman-2021-acvim}}',
          'Resultado "anormal" não distingue faixa duvidosa de pancreatite franca — exige confirmação quantitativa se necessário',
        ],
        [
          'Lipase DGGR (catalítica)',
          'Hidrólise colorimétrica do substrato DGGR; ponto de corte depende do analisador e reagente',
          'Boa correlação clínica quando validado localmente em cães e gatos; baixo custo e rapidez {{ref:ref-wolfer-2022-vetsci}}',
          'Não é absolutamente específico da lipase pancreática (lipases hepática/lipoproteica; interferência por heparina); testes comerciais não validados falham em linearidade',
        ],
        [
          'Amilase e lipase séricas tradicionais',
          'Atividade enzimática inespecífica de múltiplos tecidos',
          'Disponibilidade ampla',
          'Sensibilidade e especificidade baixas (azotemia, enteropatia, corticosteroides e neoplasias elevam atividade) — não recomendados',
        ],
        [
          'TLI (cTLI / fTLI)',
          'Quantifica tripsinogênio e tripsina circulantes',
          'Padrão para diagnosticar IPE (cão e gato)',
          'Baixa sensibilidade (~36–47%) para pancreatite aguda pela rápida depuração; aumenta com doença renal; inflamação pode mascarar IPE limítrofe',
        ],
      ],
    },
    figuraCorrelacaoFpliDggr: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/triade-felina/correlacao-fpli-dggr-lipase-animals2021.jpg',
      alt: 'Gráfico de dispersão demonstrando correlação e discordâncias entre Spec fPL e atividade de lipase DGGR em gatos',
      caption:
        'Comparação entre concentração imunorreativa (Spec fPL) e atividade enzimática de lipase DGGR em gatos: embora exista correlação positiva relevante, observa-se dispersão individual e casos discordantes conforme pontos de corte e fatores pré-analíticos/extrapancreáticos, reforçando a necessidade de integração clínica e ultrassonográfica {{ref:ref-wolfer-2022-vetsci}}.',
      shortCaption: 'Correlação e zonas de discordância entre Spec fPL e lipase DGGR',
      display: 'compact',
    },
    examesLaboratoriais:
      '**Hematologia e bioquímica clínica:** nenhum achado de rotina é patognomônico, e formas leves ou crônicas podem exibir hemograma e bioquímica integralmente normais {{ref:ref-forman-2021-acvim}} {{ref:ref-lim-2024-javma}}. Quando alterados, observam-se hemoconcentração (desidratação) ou anemia não regenerativa nas formas crônicas; leucocitose neutrofílica com desvio à esquerda (ou leucopenia com neutrófilos tóxicos em SIRS/sepse felina); trombocitopenia leve por consumo ou acentuada na CIVD.\n\nNa bioquímica: aumento de **ALT, AST e FA** (frequentemente FA > ALT no cão por drenagem portal inflamatória e colestase) e **hiperbilirrubinemia** (alertando para EHBDO ou colangite associada); **azotemia** (pré-renal vs. LRA — sempre interpretar com densidade urinária antes da fluidoterapia); **hipoalbuminemia**, **hiperglicemia** (estresse ou DM) ou **hipoglicemia** (sepse, reserva hepática esgotada — marcador de gravidade); **hipertrigliceridemia** e hipercolesterolemia; **hipocalemia** e **hipocalcemia ionizada** (que frequentemente não se correlaciona com o cálcio sérico total e associa-se a maior mortalidade, especialmente em gatos) {{ref:ref-siriphanporn-2025-animals}} {{ref:ref-juarez-2026-animals}}.',
    imagem:
      '**Radiografia abdominal:** baixa sensibilidade e especificidade para pancreatite (pode sugerir perda de detalhe seroso em abdômen cranial, aumento do ângulo piloroduodenal ou íleo duodenal discreto), porém **indispensável na triagem** de cães e gatos com vômito agudo para descartar corpos estranhos radiopacos e obstruções mecânicas {{ref:ref-forman-2021-acvim}}.\n\n**Ultrassonografia abdominal (exame de imagem de escolha):** em quadros agudos, avalia-se **aumento de volume pancreático, parênquima hipoecoico ou heterogêneo (edema/necrose), mesentério e gordura peripancreática hiperecoicos (esteatite), líquido livre focal, dilatação de ductos biliares (EHBDO)** e espessamento reativo/corrugamento da parede duodenal ou gástrica {{ref:ref-forman-2021-acvim}} {{ref:ref-leoni-2020-vetsci}}. A acurácia depende fortemente de equipamento, experiência do ultrassonografista e critérios aplicados: exigir múltiplos achados eleva a especificidade (>90%), porém reduz a sensibilidade (~43%), especialmente na doença crônica (sensibilidade ~56% no cão, com parênquima normal a hiperecoico ou massas fibróticas pseudoneoplásicas) e em exames muito precoces {{ref:ref-leoni-2020-vetsci}}.\n\n**Ultrassonografia seriada (40–52 h):** alterações parenquimatosas podem atrasar em relação ao pico clínico e de lipase. Em coorte prospectiva canina com acompanhamento seriado, parte expressiva dos cães com US inicial normal desenvolveu sinais sonográficos inequívocos apenas no reexame entre 40 e 52 horas {{ref:ref-leoni-2020-vetsci}}. Por outro lado, anormalidades sonográficas podem persistir semanas após recuperação clínica e queda da lipase — portanto, a melhora clínica guia a alta mais do que a normalização sonográfica imediata.\n\n**Tomografia computadorizada (TC) contrastada e citologia ecoguiada:** a TC com angiografia ganha espaço quando gás gastrointestinal prejudica a janela ultrassonográfica ou há suspeita de trombose da veia porta {{ref:ref-msd-2025-pancreatite}}. A punção aspirativa por agulha fina (**PAAF**) ecoguiada mostrou-se segura em cães e gatos, útil para diferenciar inflamação neutrofílica/linfocítica de carcinoma exócrino ou abscesso, embora amostras hipocelulares ou focais não excluam doença.',
    figuraUltrassomSequencialLeoni2020: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/pancreatite/leoni-2020-us-sequencial-cao-g001.png',
      alt: 'Ultrassonografia abdominal longitudinal do lobo pancreático direito em cão com pancreatite aguda mostrando progressão entre admissão T0 e dia 3 T1',
      caption:
        'Evolução ultrassonográfica seriada na pancreatite aguda canina (Leoni et al., 2020): no dia 1 (a, T0), lobo pancreático direito aumentado, hipoecoico e discretamente heterogêneo envolto por gordura peripancreática hiperecoica; no dia 3 (b, T1), parênquima mais heterogêneo e surgimento de pequena lâmina de líquido livre peripancreático anecoico (pontas de seta), ilustrando o retardo frequente das lesões de imagem frente à apresentação clínica inicial {{ref:ref-leoni-2020-vetsci}}.',
      shortCaption: 'Ultrassom sequencial (dia 1 vs. dia 3) demonstrando progressão de alterações pancreáticas',
      display: 'wide',
    },
    notaAtlasFormanUS:
      '**Atlas sonográfico e radiográfico complementar (Forman et al., 2021 — ACVIM):** aspectos detalhados em felinos — incluindo dilatação e tortuosidade do ducto pancreático, alterações segmentares do lobo esquerdo versus direito e comparação de cisto/pseudocisto e espessamento peripancreático (Figuras 4–7 do consenso ACVIM) — encontram-se disponíveis para consulta no texto integral aberto da publicação original {{ref:ref-forman-2021-acvim}}.',
    histopatologia:
      'A histopatologia permanece como padrão de referência para diferenciar com precisão **inflamação aguda, crônica, fibrose irreversível e neoplasias** {{ref:ref-forman-2021-acvim}} {{ref:ref-lombardo-2026-vetsci}}. Contudo, não é exame obrigatório nem seguro rotineiramente em pacientes instáveis: as lesões inflamatórias costumam ser multifocais ou setorizadas (podendo resultar em falso negativo se apenas um fragmento pequeno for colhido), além do custo e risco anestésico. Reserva-se a biópsia pancreática para laparotomias ou laparoscopias indicadas por outra razão (ex.: drenagem biliar ou enterotomia) ou forte suspeita neoplásica.',
    figuraHistologiaLombardo2026: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/pancreatite/lombardo-2026-histologia-felina-g001.png',
      alt: 'Microfotografias histológicas e imuno-histoquímicas do pâncreas felino ilustrando arquitetura acinar, ilhotas endócrinas e infiltrado linfoplasmocitário crônico CD3/CD20',
      caption:
        'Histologia e imuno-histoquímica do pâncreas felino (Lombardo et al., 2026): comparação de distribuição endócrina (insulina e glucagon em ilhotas e células dispersas entre ácinos exócrinos) e infiltrado inflamatório crônico leve com linfócitos T CD3⁺ e B CD20⁺ adjacentes a ácinos e ilhotas, explicando a inter-relação entre pancreatite crônica e diabetes mellitus em gatos {{ref:ref-lombardo-2026-vetsci}}.',
      shortCaption: 'Histologia e imuno-histoquímica pancreática felina (ácinos, ilhotas e infiltrado crônico)',
      display: 'wide',
    },
    escoresEPrognostico:
      'Diversos índices prognósticos foram estudados, incluindo **MCAI** (Modified Canine Activity Index), **CAPS** (Canine Acute Pancreatitis Severity Score), **APPLEfull**, **CSI** (Clinical Severity Index) e **OS** (Organ Score). Em estudo multicêntrico com **504 cães** com pancreatite aguda, APPLEfull e CAPS tiveram acurácia moderada para mortalidade hospitalar (AUC ~0,65–0,68), demonstrando que escores auxiliam na estratificação epidemiológica, mas **nenhum escore substitui a reavaliação clínica contínua** {{ref:ref-cridge-2025-jvim}}.\n\nEm coorte canina recente com **192 cães hospitalizados**, concentrações elevadas de **ureia, creatinina e lactato**, além de **hipoalbuminemia, hipocalcemia e idade avançada**, associaram-se a maior mortalidade a curto prazo {{ref:ref-juarez-2026-animals}}. Em **gatos hospitalizados**, hipocalcemia ionizada (especialmente iCa ≤1,00 mmol/L), hipoalbuminemia, hipoglicemia ou hiperglicemia persistente, hipotermia, derrame pleural, anorexia prolongada e valores muito elevados de fPLI (>20 µg/L em alguns estudos) associam-se a maior gravidade e risco de óbito {{ref:ref-siriphanporn-2025-animals}}.',
    tabelaEstudosPrognosticos: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Síntese crítica de estudos clínicos recentes em pancreatite (2020–2026)',
      headers: ['Estudo e ano', 'Delineamento e amostra', 'Principais achados clínicos', 'Implicação prática'],
      rows: [
        [
          'Leoni et al. (2020) {{ref:ref-leoni-2020-vetsci}}',
          'Prospectivo observacional; 38 cães com pancreatite aguda suspeita',
          '37% só apresentaram alterações ultrassonográficas no exame de 40–52 h; 32% permaneceram normais em ambos',
          'Ultrassom normal na admissão não descarta pancreatite; repetir imagem após estabilização inicial',
        ],
        [
          'Forman et al. (2021) — ACVIM {{ref:ref-forman-2021-acvim}}',
          'Consenso clínico internacional em pancreatite felina',
          'Consolida fisiopatologia, diferença de apresentação em gatos, diagnóstico integrado e manejo sem jejum prolongado',
          'Base estrutural para abordagem de felinos pouco sintomáticos e prevenção de lipidose hepática',
        ],
        [
          'Wolfer et al. (2022) {{ref:ref-wolfer-2022-vetsci}}',
          'Estudo clínico comparativo em cães avaliando lipase DGGR vs. cPLI',
          'Analisa concordância e discordância entre atividade DGGR e concentração cPLI conforme fenótipo clínico',
          'Interpretar lipase DGGR apenas com validação do ensaio local e correlação clínico-ecográfica',
        ],
        [
          'Steiner et al. (2023) {{ref:ref-steiner-2023-fuzapladib}}',
          'Ensaio clínico randomizado, multicêntrico e mascarado em cães com pancreatite aguda',
          'Fuzapladibe sódico IV por 3 dias melhorou significativamente o escore clínico (MCAI) vs. placebo',
          'Embasa aprovação condicional americana para sinais agudos em cães; aguarda validação de sobrevida e uso felino',
        ],
        [
          'Cridge, Parker & Kathrani (2024) {{ref:ref-cridge-2024-nutrition}}',
          'Revisão clínico-nutricional em cães e gatos',
          'Sistematiza nutrição enteral precoce, vias por sonda, RER e modulação lipídica distinta entre cães e gatos',
          'Abandonar jejum prolongado; restringir gordura prioritariamente em cães/hiperlipidêmicos e preservar ingestão em gatos',
        ],
        [
          'Lim et al. (2024) {{ref:ref-lim-2024-javma}}',
          'Revisão narrativa atualizada em pancreatite aguda canina',
          'Atualiza fluidoterapia moderada, analgesia multimodal, antieméticos combinados e vigilância de complicações',
          'Evitar sobrecarga volêmica, prescrever analgesia rotineira e restringir antibióticos/corticoides',
        ],
        [
          'Cridge et al. (2025) {{ref:ref-cridge-2025-jvim}}',
          'Retrospectivo multicêntrico (504 cães) comparando 5 escores prognósticos',
          'APPLEfull e CAPS mostraram desempenho moderado para predição de mortalidade hospitalar',
          'Escores auxiliam comunicação de risco, mas não devem determinar isoladamente condutas ou eutanásia',
        ],
        [
          'Siriphanporn et al. (2025) {{ref:ref-siriphanporn-2025-animals}} & Juárez Sarrión et al. (2026) {{ref:ref-juarez-2026-animals}}',
          'Coortes hospitalares prognósticas em gatos (2025) e 192 cães (2026)',
          'Azotemia, hipoalbuminemia, hipocalcemia ionizada e lactato/glicemia alterada predizem mortalidade a curto prazo',
          'Incorporar perfil eletrolítico completo, cálcio ionizado e função renal na admissão intensiva',
        ],
      ],
    },
  },
  treatment: {
    algoritmoTerapeuticoInterativo: {
      kind: 'interactiveAlgorithm',
      mode: 'treatment',
      title: 'Protocolo terapêutico estruturado em 7 passos (estabilização ao manejo crônico)',
      subtitle:
        'Tratamento essencialmente de suporte intensivo, individualizado e dinâmico: perfusão sem sobrecarga, analgesia potente, controle multimodal de náuseas e nutrição enteral precoce.',
      steps: [
        {
          stepNumber: 1,
          phaseBadge: 'Ressuscitação e fluido',
          speciesTag: 'both',
          title: 'Estabilizar hemodinâmica e corrigir perfusão, desidratação e eletrólitos',
          quickSummary:
            'Preferir cristaloides isotônicos balanceados (Ringer com lactato), evitando hiperidratação excessiva que agrava edema pancreático, LRA e SDRA.',
          quickFacts: [
            { label: 'Choque (cão / gato)', value: 'Bolus 10–20 mL/kg (cão) / 5–10 mL/kg (gato)' },
            { label: 'Eletrólitos críticos', value: 'Suplementar KCl + monitorar iCa e lactato' },
          ],
          details: [
            {
              label: 'Armadilha da fluidoterapia agressiva',
              content:
                'Reposição excessiva sem perdas documentadas piora o edema tecidual e complicações pulmonares; ajustar taxas dinamicamente conforme perfusão, débito urinário e vômitos.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 2,
          phaseBadge: 'Analgesia imediata',
          speciesTag: 'both',
          title: 'Tratar dor visceral como prioridade universal (mesmo sem queixa aparente)',
          quickSummary:
            'Opioides agonistas µ totais para dor moderada a grave; buprenorfina para quadros leves; CRI de lidocaína e/ou cetamina em dor refratária. Nunca usar AINEs.',
          quickFacts: [
            { label: 'Dor intensa', value: 'Metadona ou Fentanil CRI (± Ketamina/Lidocaína)' },
            { label: 'Dor leve / ambulatorial', value: 'Buprenorfina (IV/IM/OTM gato) ± Gabapentina' },
          ],
          details: [
            {
              label: 'Nota farmacológica sobre opioides e amilase/lipase',
              content:
                'Opioides podem elevar transitoriamente pressão biliar e amilase/lipase plasmáticas sem agravar clinicamente o curso da pancreatite — o benefício analgésico e anti-estresse supera esse efeito laboratorial.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 3,
          phaseBadge: 'Antieméticos',
          speciesTag: 'both',
          title: 'Controlar vômitos, náusea e hipomotilidade associada',
          quickSummary:
            'Associar maropitant (NK1) e ondansetrona (5-HT3) em casos refratários; reservar metoclopramida CRI para íleo gástrico não obstrutivo no cão.',
          quickFacts: [
            { label: '1ª linha', value: 'Maropitant 1 mg/kg SC/IV q24h (refrigerado reduz ardor SC)' },
            { label: 'Sinergia antináusea', value: 'Ondansetrona 0,1–0,5 mg/kg IV lento/SC q6–12h' },
          ],
          details: [
            {
              label: 'Cautelas com IBP e procinéticos',
              content:
                'Não administrar pantoprazol/omeprazol indiscriminadamente sem úlcera GI ou melena (altera pH e microbiota); nunca usar metoclopramida se houver suspeita de obstrução mecânica.',
              tone: 'warning',
            },
          ],
        },
        {
          stepNumber: 4,
          phaseBadge: 'Nutrição precoce',
          speciesTag: 'both',
          title: 'Instituir nutrição enteral em ≤24–48 h (via oral ou sonda)',
          quickSummary:
            'Assim que vômitos incoercíveis cessarem, iniciar 25–33% da RER em pequenas alíquotas; passar sonda nasoesofágica/nasogástrica ou esofágica se anorexia ≥3 dias ou gato ictérico/anoréxico.',
          quickFacts: [
            { label: 'Cálculo base', value: 'RER = 70 × (Peso kg)^0,75 kcal/dia' },
            { label: 'Cães vs. gatos', value: 'Cão: baixa gordura (<20% EM); Gato: alta proteína e aceitação' },
          ],
          details: [
            {
              label: 'Vigilância de realimentação',
              content:
                'Em pacientes com anorexia prolongada ou cetoacidose associada, monitorar fósforo, potássio e magnésio nas primeiras 24–72 h após retorno alimentar.',
              tone: 'danger',
            },
          ],
        },
        {
          stepNumber: 5,
          phaseBadge: 'Terapia alvo & comorbidades',
          speciesTag: 'both',
          title: 'Tratar gatilhos metabólicos, tríade felina e considerar fuzapladibe em cães',
          quickSummary:
            'Corrigir hipertrigliceridemia, diabetes/CAD e hipotireoidismo; avaliar fuzapladibe sódico (0,4 mg/kg IV q24h × 3 d) em cães onde disponível.',
          quickFacts: [
            { label: 'Fuzapladibe (cães)', value: '0,4 mg/kg IV q24h por 3 dias (inibidor LFA-1)' },
            { label: 'Antimicrobianos', value: 'Apenas se sepse, necrose infectada ou colangite' },
          ],
          details: [
            {
              label: 'Uso altamente seletivo de corticoides',
              content:
                'Não são terapia rotineira na pancreatite aguda; considerar apenas em pancreatite autoimune IgG4-símile (Cocker Spaniel Inglês), enteropatia/colangite crônica em gatos ou choque refratário com suspeita de insuficiência adrenal relativa.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 6,
          phaseBadge: 'Vigilância UTI',
          speciesTag: 'both',
          title: 'Monitorar complicações orgânicas (EHBDO, LRA, SDRA, CIVD, trombose)',
          quickSummary:
            'Acompanhar débito urinário, pressão arterial, lactato, PaO2/SpO2, bilirrubinas, glicemia e coagulograma; evitar cirurgia biliar precoce desnecessária.',
          quickFacts: [
            { label: 'EHBDO pancreática', value: 'Muitas vezes regride clinicamente; operar só se refratária/sepse' },
            { label: 'Tromboprofilaxia', value: 'Avaliar em pancreatite necrótica grave / risco trombótico' },
          ],
          details: [
            {
              label: 'Plasma fresco congelado (PFC)',
              content:
                'Sem benefício comprovado para "repor antiproteases" ou melhorar mortalidade na pancreatite isolada; indicar exclusivamente diante de coagulopatia clínica ativa ou CIVD.',
              tone: 'evidence',
            },
          ],
        },
        {
          stepNumber: 7,
          phaseBadge: 'Alta e longo prazo',
          speciesTag: 'both',
          title: 'Manejo ambulatorial, prevenção de recidivas e sequelas endócrino/exócrinas',
          quickSummary:
            'Manter dieta hipolipídica em cães hiperlipidêmicos/reincidentes, analgesia domiciliar nas formas crônicas e triagem para diabetes mellitus e IPE.',
          quickFacts: [
            { label: 'Cão hiperlipidêmico', value: 'Dieta <20–25 g gordura/1000 kcal + ômg-3/fibratos se preciso' },
            { label: 'Seguimento crônico', value: 'Glicemia, peso/ECC, cobalamina e TLI se sinais de má digestão' },
          ],
          details: [
            {
              label: 'Orientação ao tutor',
              content:
                'Proibição rigorosa de petiscos gordurosos e restos de mesa em cães sensíveis; retorno imediato se recaída de hiporexia, vômito ou prostração.',
              tone: 'tip',
            },
          ],
        },
      ],
    },
    fluidoterapia:
      'A reidratação precoce restaura a microcirculação esplâncnica e pancreática antes da instalação de necrose isquêmica irreversível. Entretanto, diretrizes atuais em humanos e medicina veterinária criticam infusões excessivamente agressivas, associadas a aumento de edema intersticial pancreático, sobrecarga hídrica, LRA e congestão/SDRA {{ref:ref-lim-2024-javma}}. Recomenda-se **Ringer com lactato** (ou outro cristaloide isotônico balanceado, evitando acidose hiperclorêmica do NaCl 0,9% em grandes volumes) calculado pela taxa de manutenção + déficit de desidratação em 12–24 h + perdas contínuas estimadas, com reajuste seriado a cada 4–8 h. Bolus de choque (10–20 mL/kg em cães; 5–10 mL/kg em gatos em 15–20 min) aplicam-se apenas a pacientes hipovolêmicos ou hipotensos.\n\nMonitorar eletrólitos: suplementar **KCl** conforme potássio sérico para corrigir perdas gástricas e anorexia; monitorar **cálcio ionizado** (reposição lenta com gluconato de cálcio 10% sob ECG se tremores, tetania, hipotensão refratária ou iCa criticamente baixa) e fósforo após realimentação.',
    analgesia:
      '**Todo paciente com pancreatite deve ser tratado como portador de dor visceral**, mesmo sem vocalização ou reação abdominal evidente — especialmente gatos, que expressam dor mediante retração comportamental, postura encolhida e anorexia {{ref:ref-forman-2021-acvim}}.\n\n**Primeira escolha hospitalar:** opioides agonistas µ totais, como **metadona** (0,1–0,3 mg/kg IV/IM q4–6h ou CRI) ou **fentanil** em infusão contínua (bolus 2–5 µg/kg IV seguido de CRI 2–5 µg/kg/h; atenção à sedação e depressão respiratória). Na dor intensa ou refratária, adicionar analgesia multimodal em CRI com **cetamina** (0,1–0,6 mg/kg/h) e, em **cães**, **lidocaína** (1–2 mg/kg IV lento seguido de 25–50 µg/kg/min — **evitar CRI sistêmica de lidocaína em gatos** pelo risco de toxicidade cardiovascular/neurológica). Em quadros leves ou transição ambulatorial, **buprenorfina** (0,01–0,03 mg/kg IV/IM — ou transmucosa oral em gatos q6–8h; absorção SC errática deve ser evitada) e **gabapentina** ambulatorial apresentam boa utilidade {{ref:ref-msd-2025-pancreatite}}.\n\n**Contraindicações analgésicas absolutas:** anti-inflamatórios não esteroidais (**AINEs**) são contraindicados na pancreatite aguda pelo alto risco de ulceração gastrointestinal e lesão renal aguda em pacientes desidratados. Nota importante: embora opioides possam elevar transitoriamente a pressão biliar e os níveis plasmáticos de amilase/lipase, a antiga preocupação de agravamento clínico pelo espasmo do esfíncter de Oddi não se confirmou clinicamente.',
    antiemeticosEGastroprotetores:
      '**Antieméticos:** o controle precoce de vômitos e náuseas melhora o bem-estar, reduz perdas hidroeletrolíticas e acelera o retorno à ingestão voluntária {{ref:ref-lim-2024-javma}}. O **maropitant** (antagonista de receptor NK1; 1 mg/kg SC ou IV lento em 1–2 min q24h, podendo refrigerar o frasco para diminuir ardor da injeção SC; cautela/ajuste em disfunção hepática grave) bloqueia o centro do vômito em estímulos periféricos e centrais e pode auxiliar na modulação da dor visceral mediada por substância P. Em náusea persistente ou vômito refratário, associar **ondansetrona** (antagonista 5-HT3; 0,1–0,5 mg/kg IV lento — incompatível na mesma via com pantoprazol e ampicilina/sulbactam — ou SC q6–12h). A **metoclopramida** em CRI (1–2 mg/kg/dia IV) ajuda quando há hipomotilidade gástrica comprovada no cão (desde que descartada obstrução), mas é menos eficaz em gatos e pode provocar excitação extrapiramidal.\n\n**Estimulantes de apetite e gastroprotetores:** **mirtazapina** (particularmente em gatos — pomada transdérmica auricular ~2 mg/gato q24h ou VO 1,88 mg/gato q24–48h) ou **capromorelina** auxiliam em quadros leves ou na convalescença após controle da náusea, porém **não substituem sonda enteral** na anorexia severa {{ref:ref-cridge-2024-nutrition}}. Supressores ácidos (IBPs como pantoprazol/omeprazol) **não devem ser prescritos rotineiramente** na pancreatite sem evidência de esofagite de refluxo severa, melena, hematêmese ou ulceração gastroduodenal.',
    nutricaoClinica:
      '**Fim do jejum prolongado ("repouso pancreático"):** modelos experimentais e séries clínicas em cães e gatos demonstraram que a privação alimentar prolongada provoca atrofia vilositária intestinal, aumenta permeabilidade mucosa e favorece **translocação bacteriana**, agravando sepse e mortalidade, enquanto o pâncreas inflamado não responde da mesma forma fisiológica à presença intraluminal de nutrientes {{ref:ref-cridge-2024-nutrition}}.\n\n**Quando e quanto alimentar:** iniciar suporte enteral **dentro de 24–48 horas** após admissão assim que o paciente não estiver em choque descompensado ou vômito incoercível. Na ausência de ingestão voluntária de pelo menos 50–75% da **RER** (`70 × Peso(kg)^0,75`) após 2–3 dias de anorexia (incluindo dias anteriores à internação — e **imediatamente mais cedo em gatos obesos sob risco de lipidose hepática**), colocar **sonda nasoesofágica/nasogástrica** (posicionamento radiográfico obrigatório antes de infundir, útil a curto prazo sem anestesia geral) ou **sonda de esofagostomia** (melhor para manejo domiciliar e dietas menos líquidas em gatos). Começar com **25–33% da RER** no dia 1 (alíquotas de 5–10 mL/kg distribuídas em 4–6 refeições ou infusão contínua), progredindo gradualmente até 100% da RER em 3–5 dias conforme tolerância {{ref:ref-cridge-2024-nutrition}}.\n\n**Modulação lipídica — diferença fundamental entre espécies:**\n- **Cães:** a gordura estimula mais intensamente a liberação de CCK e retarda o esvaziamento gástrico; recomendam-se dietas gastrointestinais comerciais altamente digestíveis com **baixo teor de gordura (<20% da energia metabolizável ou ~17–29 g de gordura/1000 kcal EM)** na fase aguda e, obrigatoriamente a longo prazo, em cães com hipertrigliceridemia ou recidivas {{ref:ref-cridge-2024-nutrition}}. Evitar rigorosamente petiscos gordurosos, queijos, carnes processadas e restos de comida humana.\n- **Gatos:** toleram melhor concentrações moderadas de gordura (~30–40 g/1000 kcal) e exigem maior aporte proteico; restringir gordura excessivamente em gatos pode reduzir palatabilidade, diminuir densidade calórica e precipitar **lipidose hepática** {{ref:ref-forman-2021-acvim}} {{ref:ref-cridge-2024-nutrition}}. Priorizar dietas altamente digestíveis e palatáveis ou compatíveis com comorbidades (como doença inflamatória intestinal ou renal).\n\nEm pacientes anoréxicos há vários dias ou diabéticos descompensados, monitorar fósforo, potássio e magnésio para prevenir **síndrome de realimentação**.',
    terapiaEspecificaECorticoide:
      '**Fuzapladibe sódico (Panoquell-CA1):** primeiro fármaco direcionado à cascata inflamatória da pancreatite aguda canina, inibindo a ativação da integrina **LFA-1** e reduzindo a adesão e extravasamento de neutrófilos no pâncreas e pulmão {{ref:ref-steiner-2023-fuzapladib}}. Recebeu **aprovação condicional da FDA nos EUA** para manejo de sinais clínicos na pancreatite aguda canina na dose de **0,4 mg/kg IV q24h por 3 dias consecutivos** {{ref:ref-fda-panoquell}}. Em estudo clínico randomizado mascarado, demonstrou melhora significativa no escore clínico (MCAI) em relação ao placebo, mas ainda requer dados definitivos de impacto em mortalidade, não possui aprovação/dados validados para gatos, exige cautela em pacientes <6 meses, hepatopatas/nefropatas/cardiopatas ou fêmeas gestantes (alta ligação proteica e alerta de manejo teratogênico em gestantes humanas) e tem disponibilidade regulatória variável fora dos EUA.\n\n**Terapias sem uso rotineiro:**\n- **Antibióticos:** pancreatite aguda típica em cães e gatos inicia-se como processo inflamatório **estéril**. Reservar antimicrobianos (ex.: ampicilina/sulbactam ou espectro dirigido por cultura) apenas para suspeita ou confirmação de necrose infectada/abscesso pancreático, choque séptico, neutropenia febril/translocação grave ou **colangite neutrofílica** concomitante na tríade felina {{ref:ref-forman-2021-acvim}} {{ref:ref-lim-2024-javma}}.\n- **Corticosteroides:** evitar uso indiscriminado na pancreatite aguda (atrasam cicatrização e predispõem a ulceração e infecção). Indicações restritas: **pancreatite crônica autoimune IgG4-símile em Cocker Spaniels Ingleses** (prednisolona ou ciclosporina na presença de proteinúria), **tríade felina/enteropatia ou colangite linfocítica** confirmada sem infecção ativa, ou **insuficiência adrenal relativa do doente crítico (CIRCI)** em choque refratário a vasopressores {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}.\n- **Plasma fresco congelado (PFC):** não há benefício clínico comprovado como suplemento de antiproteases na pancreatite aguda canina; utilizar estritamente em **coagulopatia clínica ou CIVD** {{ref:ref-lim-2024-javma}}.\n- **Cirurgia:** contraindicada rotineiramente na pancreatite não complicada; a EHBDO secundária a edema pancreático costuma resolver com suporte clínico em dias a poucas semanas. Intervir cirurgicamente ou por drenagem apenas em abscesso infectado, peritonite séptica, massa necrótica compressiva persistente ou obstrução biliar completa refratária/progressiva {{ref:ref-msd-2025-pancreatite}}.',
    checklistSegurancaUti:
      'Checklist diário na internação intensiva: (1) reavaliar dor em escala validada (CMPS-SF / Feline Grimace Scale) a cada 4–6 h; (2) conferir balanço hídrico e ganho ponderal agudo (<5% evitando hiperidratação); (3) checar glicemia, K⁺, Ca²⁺ ionizado, fósforo e albumina a cada 12–24 h nos instáveis; (4) garantir aporte enteral mínimo crescente sem forçar via oral em animal com disfagia ou náusea franca; (5) auscultar pulmões e mensurar FR/SpO2 visando detecção precoce de SDRA ou derrame pleural.',
    tabelaFarmacologicaAuditada: {
      kind: 'clinicalTable',
      caption: 'Tabela 5 — Formulário clínico auditado em pancreatite (cães e gatos)',
      headers: [
        'Fármaco / Classe',
        'Dose usual — Cães',
        'Dose usual — Gatos',
        'Cautelas e alertas críticos',
      ],
      rows: [
        [
          'Metadona (agonista µ total)',
          '0,1–0,5 mg/kg IV/IM q4–6h ou CRI 0,12 mg/kg/h (após ataque 0,1–0,2 mg/kg IV)',
          '0,1–0,3 mg/kg IV/IM q4–6h (ou 0,3–0,6 mg/kg OTM com menor biodisponibilidade)',
          'Pode elevar amilase/lipase séricas transitoriamente sem prejuízo clínico; monitorar bradicardia e depressão respiratória; reverter com naloxona se necessário',
        ],
        [
          'Fentanil (agonista µ ultracurto)',
          'Bolus 2–5 µg/kg IV + CRI 2–5 (até 10) µg/kg/h',
          'Bolus 1–3 µg/kg IV + CRI 1–4 µg/kg/h',
          'Titular dose lentamente para evitar disforia/hipoventilação; manter analgesia de transição antes de suspender CRI',
        ],
        [
          'Buprenorfina (agonista µ parcial)',
          '0,01–0,02 mg/kg IV/IM q6–8h (evitar SC por absorção irregular)',
          '0,01–0,03 mg/kg IV/IM ou transmucosa oral (OTM) q6–8h',
          'Indicada em dor leve a moderada; menos eficaz que agonistas µ totais em dor visceral grave; evitar associação simultânea com metadona/fentanil por competição de receptor',
        ],
        [
          'Cetamina (adjuvante NMDA) ± Lidocaína CRI',
          'Cetamina 0,1–0,6 mg/kg/h IV CRI; Lidocaína 1–2 mg/kg IV lento + CRI 25–50 µg/kg/min',
          'Cetamina 0,1–0,4 mg/kg/h IV CRI; NÃO usar lidocaína IV contínua em gatos',
          'Lidocaína CRI é proscrita em gatos por risco de intoxicação neurocardiovascular grave; cetamina sempre associada a opioide',
        ],
        [
          'Maropitant (antagonista NK1)',
          '1 mg/kg SC ou IV (1–2 min) q24h (≥4 meses IV; ≥2 meses SC); VO 2 mg/kg q24h após estabilização',
          '1 mg/kg SC ou IV (1–2 min) q24h (≥4 meses); VO 1 mg/kg q24h',
          'Refrigerar injetável reduz dor local SC; reduz metabolização em hepatopatia grave (considerar metade da dose); incompatível na mesma seringa com outros fármacos e precipita com pantoprazol na via',
        ],
        [
          'Ondansetrona (antagonista 5-HT3)',
          '0,1–0,5 mg/kg IV lento (2–5 min) ou SC q6–12h',
          '0,1–0,5 (até 1,0) mg/kg IV lento ou SC q6–12h (ajustar em hepatopatia/DRC grave)',
          'Cuidado com prolongamento de QT com fármacos arritmogênicos e síndrome serotoninérgica se associada a mirtazapina/tramadol; incompatível na via com pantoprazol e ampicilina/sulbactam',
        ],
        [
          'Metoclopramida (antagonista D2 / pró-cinético)',
          'CRI 1–2 mg/kg/dia IV (0,04–0,09 mg/kg/h) ou 0,2–0,5 mg/kg SC/IV q6–8h',
          'Uso restrito (menor efeito antiemético em gatos e risco de sinais extrapiramidais/frenesi)',
          'CONTRAINDICADA se suspeita de obstrução mecânica, perfuração ou hemorragia GI',
        ],
        [
          'Mirtazapina (estimulante apetite / 5-HT3)',
          'Uso eventual fora das indicações de bula (dados limitados: ~1,1–1,3 mg/kg VO q24h, máx. 30 mg/cão/dia)',
          'Transdérmico auricular 2 mg/gato q24h ou VO 1,88 mg/gato q24h (q48h se DRC ou hepatopatia)',
          'Em gatos, 3,75 mg VO aumenta vocalização/agitação sem ganho de eficácia; não usar como substituto de sonda em anorexia total; risco serotoninérgico se associada a ondansetrona/opioides',
        ],
        [
          'Fuzapladibe sódico (inibidor LFA-1)',
          '0,4 mg/kg IV (bolus rápido 15 s–1 min) q24h por 3 dias consecutivos {{ref:ref-fda-panoquell}}',
          'Sem aprovação nem evidência clínica estabelecida em gatos',
          'Aprovação condicional EUA (Panoquell-CA1); alta ligação proteica; cautela em cardiopatas, nefropatas, hepatopatas e <6 meses; gestantes humanas não devem manipular por risco teratogênico {{ref:ref-fda-panoquell}}',
        ],
        [
          'Prednisolona / Ciclosporina (indicação selecionada)',
          'Prednisolona 0,5–1 mg/kg VO q24h ou Ciclosporina 5 mg/kg VO q24h (ex.: Cocker Spaniel IgG4 com PLN)',
          'Prednisolona 1–2 mg/kg/dia VO apenas se colangite/enteropatia crônica concomitante ou choque refratário sem sepse ativa',
          'NÃO usar rotineiramente na pancreatite aguda simples; em cães com proteinúria glomerular autoimune preferir ciclosporina sobre corticoide {{ref:ref-forman-2021-acvim}}',
        ],
      ],
    },
  },
  complications: {
    complicacoesLocaisESistemicas:
      '**Complicações sistêmicas (alta gravidade):** síndrome da resposta inflamatória sistêmica (SIRS), choque vasodilatador/hipovolêmico, lesão renal aguda (LRA), lesão pulmonar aguda/SDRA e derrame pleural, coagulação intravascular disseminada (CIVD), hipocalcemia ionizada sintomática e arritmias ventriculares.\n\n**Complicações locais e tardias:** coleções líquidas pancreáticas estéreis, pseudocistos pancreáticos (sacos fibrosos não epitelializados contendo enzimas e restos celulares), necrose infectada ou abscesso pancreático, trombose de veia porta, peritonite estéril ou séptica, adesões viscerais, **obstrução biliar extra-hepática (EHBDO)**, **diabetes mellitus** (inclusive cetoacidose diabética como gatilho ou consequência), **insuficiência pancreática exócrina (IPE)** secundária à fibrose crônica (principal causa de IPE em gatos) e **lipidose hepática** em gatos mantidos sem suporte nutricional adequado {{ref:ref-forman-2021-acvim}} {{ref:ref-msd-2025-pancreatite}}.',
    mitosEArmadilhasClinicas: {
      kind: 'clinicalTable',
      caption: 'Tabela 6 — Mitos clássicos versus armadilhas clínicas na prática veterinária',
      headers: ['Mito ou prática ultrapassada', 'Por que gera erro clínico', 'Conduta atual fundamentada'],
      rows: [
        [
          '"Sem vômito e sem dor à palpação não é pancreatite"',
          'Mais da metade dos gatos e parte expressiva dos cães com pancreatite crônica ou leve não vomita nem vocaliza à palpação',
          'Manter suspeita diante de anorexia, letargia ou perda de peso sem causa óbvia, sobretudo em gatos {{ref:ref-forman-2021-acvim}}',
        ],
        [
          '"Jejum absoluto de 48–72 h para descansar o pâncreas"',
          'Induz atrofia de mucosa intestinal, aumenta permeabilidade e translocação bacteriana e precipita lipidose hepática em gatos',
          'Estabilizar vômitos incoercíveis e iniciar nutrição enteral em ≤24–48 h (via oral ou sonda NE/esofágica) {{ref:ref-cridge-2024-nutrition}}',
        ],
        [
          '"Amilase/lipase total normais ou elevadas fecham o caso"',
          'Lipases e amilases tradicionais possuem baixa sensibilidade e sofrem influência de rins, fígado, estômago e corticoides',
          'Solicitar lipase pancreática específica validada e integrar com ultrassonografia e clínica {{ref:ref-wolfer-2022-vetsci}}',
        ],
        [
          '"Ultrassom normal exclui pancreatite"',
          'Lesões leves, crônicas ou muito precoces frequentemente ainda não produzem alterações sonográficas detectáveis',
          'Considerar repetição ultrassonográfica em 40–52 h ou integração com Spec cPL/fPL {{ref:ref-leoni-2020-vetsci}}',
        ],
        [
          '"Antibiótico e IBP profiláticos em toda pancreatite"',
          'Pancreatite aguda é inflamação primariamente estéril; supressores ácidos e antibióticos rotineiros aumentam disbiose, resistência e custo sem benefício',
          'Restringir antibiótico a sepse/abscesso/colangite e IBP a sangramento/úlcera GI confirmada ou altamente provável {{ref:ref-lim-2024-javma}}',
        ],
        [
          '"Gatos precisam da mesma dieta ultra-hipolipídica dos cães"',
          'Dietas com baixíssima gordura frequentemente perdem palatabilidade e densidade energética em felinos, piorando a anorexia e o risco de lipidose',
          'Em gatos, priorizar ingestão proteico-calórica e aceitação; restringir gordura estritamente sobretudo em cães e hipertrigliceridêmicos {{ref:ref-cridge-2024-nutrition}}',
        ],
      ],
    },
  },
  prevention: {
    manejoPreventivo:
      '**Em cães predispostos ou com histórico prévio:** corrigir gradualmente obesidade até escore corporal ideal, eliminar estritamente restos de mesa, embutidos e petiscos gordurosos e manter **dieta baixa em gordura (<20–25 g/1000 kcal EM)** de forma definitiva nos cães com hipertrigliceridemia ou crises recorrentes. Rastrear e tratar endocrinopatias associadas (hiperadrenocorticismo, hipotireoidismo, diabetes mellitus) e monitorar triglicerídeos em jejum (associando ácidos graxos ômega-3 ou fibratos quando indicado em hipertrigliceridemia primária persistente de Schnauzers Miniatura). Revisar criticamente fármacos potencialmente associados em pacientes reincidentes e evitar hipotensão perioperatória em procedimentos eletivos {{ref:ref-cridge-2024-nutrition}} {{ref:ref-msd-2025-pancreatite}}.\n\n**Em gatos:** como não há prevenção dietética hipolipídica universal comprovada, o foco preventivo recai sobre **controle eficaz de comorbidades** (colangite e enteropatias crônicas na tríade felina), manejo nutricional individualizado e educação do tutor para busca precoce diante de qualquer redução súbita de apetite >24 h, evitando evolução para lipidose hepática {{ref:ref-forman-2021-acvim}}.',
  },
  relatedConsensusSlugs: [
    'acvim-cie-caes-2026',
    'iris-lra-2026',
    'veccs-sepse-definicao-caes-gatos-2026',
    'veccs-choque-septico-prognostico-2026',
    'curative-risco-trombotico-2022',
    'aaha-diabetes-caes-gatos-2018-2022',
    'icatcare-diabetes-felino-2025',
  ],
  relatedDiseaseSlugs: [
    'triade-felina',
    'insuficiencia-pancreatica-exocrina-caes-gatos',
    'diabetes-mellitus-canina',
    'diabetes-mellitus-felina',
    'cetoacidose-diabetica-caes-gatos',
    'enteropatia-inflamatoria-cronica-canina',
    'lesao-renal-aguda-canina',
    'lesao-renal-aguda-felina',
    'sepse-canina',
    'sepse-felina',
    'coagulacao-intravascular-disseminada-caes-gatos',
    'sindrome-cushing-caes',
    'hipotireoidismo-adquirido-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'maropitant',
    'ondansetrona',
    'metadona',
    'buprenorfina',
    'cetamina',
    'lidocaina',
    'mirtazapina',
    'capromorelina',
    'metoclopramida',
    'prednisolona',
    'ciclosporina',
    'ampicilina-sulbactam',
    'sucralfato',
  ],
  references: [
    {
      id: 'ref-forman-2021-acvim',
      citationText:
        'Forman MA, Steiner JM, Armstrong PJ, Camus MS, Gaschen L, Hill SL, Mansfield CS, Steiger K. ACVIM consensus statement on pancreatitis in cats. Journal of Veterinary Internal Medicine. 2021;35(2):703-723. doi:10.1111/jvim.16053 (figuras conceituais fisiopatológicas e ultrassonográficas sob licença CC BY-NC 4.0 acessíveis na fonte original)',
      url: 'https://doi.org/10.1111/jvim.16053',
      sourceType: 'consensus',
      evidenceLevel: 'Consenso ACVIM',
      notes: 'Base de referência para definição, fisiopatologia, particularidades felinas, imagem, diagnóstico integrado e manejo.',
    },
    {
      id: 'ref-lim-2024-javma',
      citationText:
        'Lim SY, Cridge H, Twedt DC, O\'Brien RT, Mansfield CS, Steiner JM. Management of acute-onset pancreatitis in dogs: a narrative review. Journal of the American Veterinary Medical Association (JAVMA). 2024;262(9):1231-1240. doi:10.2460/javma.24.02.0107',
      url: 'https://doi.org/10.2460/javma.24.02.0107',
      sourceType: 'review',
      evidenceLevel: 'Revisão Clínica',
      notes: 'Referência prioritária para fluidoterapia modulada, analgesia multimodal, antieméticos e terapias emergentes em cães.',
    },
    {
      id: 'ref-cridge-2024-nutrition',
      citationText:
        'Cridge H, Parker VJ, Kathrani A. Nutritional management of pancreatitis and concurrent disease in dogs and cats. Journal of the American Veterinary Medical Association (JAVMA). 2024;262(6):834-840. doi:10.2460/javma.23.11.0641',
      url: 'https://doi.org/10.2460/javma.23.11.0641',
      sourceType: 'review',
      evidenceLevel: 'Revisão Clínica',
      notes: 'Fundamenta nutrição enteral precoce, vias de sonda, cálculo calórico (RER) e modulação lipídica distinta em cães versus gatos.',
    },
    {
      id: 'ref-msd-2025-pancreatite',
      citationText:
        'MSD Veterinary Manual. Pancreatitis in Dogs and Cats (Exocrine Pancreas Disorders). Revisado em setembro de 2025.',
      url: 'https://www.msdvetmanual.com/digestive-system/diseases-of-the-pancreas-in-small-animals/pancreatitis-in-dogs-and-cats',
      sourceType: 'guideline',
      evidenceLevel: 'Manual Técnico de Referência',
    },
    {
      id: 'ref-leoni-2020-vetsci',
      citationText:
        'Leoni F, Puccinelli C, Citi S, Ricci E, Rossi F, Mannucci T, Marchetti V, Gori E. Ultrasonographic Monitoring in 38 Dogs with Clinically Suspected Acute Pancreatitis. Veterinary Sciences. 2020;7(4):180. doi:10.3390/vetsci7040180 (Figura 1 incorporada sob licença CC BY 4.0)',
      url: 'https://doi.org/10.3390/vetsci7040180',
      sourceType: 'article',
      evidenceLevel: 'Estudo Prospectivo',
    },
    {
      id: 'ref-wolfer-2022-vetsci',
      citationText:
        'Wolfer N, Howard J, Peters LM. Comparison of Diagnostic Performance and Discordance between DGGR-Lipase Activity and Canine Pancreatic Lipase Immunoreactivity (cPLI). Veterinary Sciences. 2022;9(4):177. doi:10.3390/vetsci9040177',
      url: 'https://doi.org/10.3390/vetsci9040177',
      sourceType: 'article',
      evidenceLevel: 'Estudo Diagnóstico',
    },
    {
      id: 'ref-steiner-2023-fuzapladib',
      citationText:
        'Steiner JM, Lainesse C, Noshiro Y, et al. Fuzapladib in a randomized controlled multicenter masked study in dogs with presumptive acute onset pancreatitis. Journal of Veterinary Internal Medicine. 2023;37(6):2084-2092. doi:10.1111/jvim.16897',
      url: 'https://doi.org/10.1111/jvim.16897',
      sourceType: 'article',
      evidenceLevel: 'Ensaio Clínico Randomizado',
    },
    {
      id: 'ref-fda-panoquell',
      citationText:
        'U.S. Food and Drug Administration (FDA). Conditional Approval NADA 141-567 — Panoquell-CA1 (fuzapladib sodium for injection): Prescribing Information and Clinical Summary.',
      url: 'https://animaldrugsatfda.fda.gov/',
      sourceType: 'guideline',
      evidenceLevel: 'Bula Regulatória',
    },
    {
      id: 'ref-cridge-2025-jvim',
      citationText:
        'Cridge H, et al. Multi-institutional retrospective analysis of prognostic scoring systems for dogs with acute pancreatitis (504 dogs). Journal of Veterinary Internal Medicine. 2025;39(3):e70114. doi:10.1111/jvim.70114',
      url: 'https://doi.org/10.1111/jvim.70114',
      sourceType: 'article',
      evidenceLevel: 'Estudo Multicêntrico',
    },
    {
      id: 'ref-siriphanporn-2025-animals',
      citationText:
        'Siriphanporn K, et al. Retrospective evaluation of the prognostic utility of clinical and laboratory findings in hospitalized cats with pancreatitis. Animals. 2025;15(7):1060. doi:10.3390/ani15071060',
      url: 'https://doi.org/10.3390/ani15071060',
      sourceType: 'article',
      evidenceLevel: 'Coorte Retrospectiva',
    },
    {
      id: 'ref-juarez-2026-animals',
      citationText:
        'Juárez Sarrión S, et al. Prognostic Markers Associated with Short-Term Mortality in Dogs Hospitalised with Acute Pancreatitis: A Retrospective Study of 192 Cases. Animals. 2026;16(12):1854. doi:10.3390/ani16121854',
      url: 'https://doi.org/10.3390/ani16121854',
      sourceType: 'article',
      evidenceLevel: 'Coorte Retrospectiva',
    },
    {
      id: 'ref-lombardo-2026-vetsci',
      citationText:
        'Lombardo R, et al. Histological Investigation of the Endocrine Pancreas in Non-Diabetic Cats and Its Association with Pancreatic Inflammation. Veterinary Sciences. 2026;13(11):1168. doi:10.3390/vetsci13111168 (Figura 1 incorporada sob licença CC BY 4.0)',
      url: 'https://doi.org/10.3390/vetsci13111168',
      sourceType: 'article',
      evidenceLevel: 'Estudo Histopatológico',
    },
    {
      id: 'ref-book-ettinger-9e',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E (eds.). Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. St. Louis: Elsevier; 2024. Ch. 64 (Laboratory Evaluation of Pancreatic Disease, p. 307), Ch. 155–156 (Hyperlipidemia & Dietary Fat, pp. 781–790), Ch. 276–278 (Pancreatitis: Etiology, Pathogenesis, Canine & Feline Management, pp. 1859–1875).',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
    {
      id: 'ref-book-nelson-couto-6e',
      citationText:
        'Nelson RW, Couto CG. Medicina Interna de Pequenos Animais (Small Animal Internal Medicine). 6. ed. Rio de Janeiro / St. Louis: Elsevier; Cap. 37 — Distúrbios do Pâncreas Exócrino, pp. 620–640.',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
    {
      id: 'ref-book-cridge-disorders-2026',
      citationText:
        'Cridge H, et al. (eds.). Disorders of the Liver, Exocrine Pancreas, and Gastrointestinal Tract in Dogs and Cats. 1st ed. Hoboken: Wiley-Blackwell; 2026. Ch. 21 (Laboratory Assessment of the Exocrine Pancreas — corte revisado Spec fPL ≥8,8 µg/L, pp. 161–168), Ch. 25 (Acute Pancreatitis in Dogs, pp. 192–198), Ch. 26 (Chronic Pancreatitis in Dogs, pp. 199–203), Ch. 31–32 (Neoplasia, Pseudocysts & Nutritional Management, pp. 234–245).',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
    {
      id: 'ref-book-dibartola-4e',
      citationText:
        'DiBartola SP (ed.). Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. 4th ed. St. Louis: Elsevier; Ch. 18–19 (Gastrointestinal & Pancreatic Fluid/Acid-Base/Hypocalcemia Mechanics, pp. 437–466).',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
    {
      id: 'ref-book-drobatz-feline-ecc-2e',
      citationText:
        'Drobatz KJ, Costello MF (eds.). Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell; Ch. 18–20 (Acute Pancreatitis, Triaditis & Hepatic Lipidosis in Cats, pp. 177–209).',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
    {
      id: 'ref-book-applied-nutrition-2e',
      citationText:
        'Fascetti AJ, Delaney SJ (eds.). Applied Veterinary Clinical Nutrition. 2nd ed. Hoboken: Wiley-Blackwell; Ch. 12–13 (Nutritional Management of Pancreatitis, Low-Fat Cutoffs & Feline Hepatic Lipidosis, pp. 299–325).',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
    {
      id: 'ref-book-plumbs-10e',
      citationText:
        'Budde JA, McCluskey DM (eds.). Plumb’s Veterinary Drug Handbook. 10th ed. Hoboken: Wiley-Blackwell; 2023. Monografias: Buprenorphine (p. 150), Fentanyl (pp. 513–517), Maropitant (pp. 799–801), Methadone (pp. 842–844), Metoclopramide (pp. 867–869), Mirtazapine (pp. 893–895), Ondansetron (pp. 956–958).',
      sourceType: 'textbook',
      evidenceLevel: 'Formulário Veterinário',
    },
    {
      id: 'ref-book-bsava-10e',
      citationText:
        'Allerton F (ed.). BSAVA Small Animal Formulary, Part A: Canine and Feline. 10th ed. Gloucester: BSAVA; 2020. Posologias e cautelas analgésicas, antieméticas e eletrolíticas.',
      sourceType: 'textbook',
      evidenceLevel: 'Formulário Veterinário',
    },
    {
      id: 'ref-book-bsava-gastro-3e',
      citationText:
        'Hall EJ, Williams DA, Kathrani A (eds.). BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. Gloucester: BSAVA; Ch. 3 & Ch. 36 (Exocrine Pancreas, pp. 231–233).',
      sourceType: 'textbook',
      evidenceLevel: 'Livro-texto',
    },
  ],
};
