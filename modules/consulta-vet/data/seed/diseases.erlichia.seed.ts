import { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet/diseases/erliquiose';

/** Erliquiose monocitica canina (CME) - atualizada a partir do material VIN 2025 + imagens fornecidas. */
export const erliquioseMonociticaCaninaRecord: DiseaseRecord = {
  id: 'disease-erliquiose-monocitica-canina',
  slug: 'erliquiose-monocitica-canina',
  title: 'Erliquiose monocitica canina (Ehrlichia canis)',
  synonyms: [
    'Canine monocytic ehrlichiosis',
    'CME',
    'Febre hemorragica canina',
    'Tifo canino',
    'Infeccao por Ehrlichia canis',
    'Doenca do cao rastreador',
    'Pancitopenia tropical canina',
  ],
  species: ['dog'],
  category: 'infecciosas',
  tags: [
    'Carrapato',
    'Rhipicephalus sanguineus',
    'Ehrlichia canis',
    'Trombocitopenia',
    'Pancitopenia',
    'Doxiciclina',
    'PCR',
    'Uveite',
    'Epistaxe',
    'Coinfeccao',
  ],
  quickSummary:
    'A erliquiose monocitica canina e uma doenca infecciosa transmitida por carrapatos, causada por Ehrlichia canis. O agente infecta monocitos e macrofagos, forma morulas intracitoplasmaticas e dissemina pelo sistema mononuclear fagocitico. O quadro pode ser agudo, subclinico ou cronico. A pista laboratorial mais importante e trombocitopenia, mas a doenca tambem pode cursar com anemia nao regenerativa, hiperglobulinemia, proteinuria, sinais hemorragicos, uveite, sinais neurologicos e, na fase cronica grave, mielossupressao com pancitopenia.',
  quickDecisionStrip: [
    'Cao + carrapatos + trombocitopenia = erliquiose sempre entra alto na lista.',
    'Sorologia positiva sozinha indica exposicao; nao prova doenca ativa sem contexto.',
    'PCR positiva antes de antibiotico confirma infeccao; PCR negativa nao exclui fases cronicas/subclinicas.',
    'Doxiciclina por 28 dias e o eixo terapeutico preferencial.',
    'Pancitopenia cronica, Pastor Alemao e falta de resposta em 48-72 h pioram o cenario.',
  ],
  quickSummaryRich: {
    lead:
      'Pense na CME como uma doenca de tres tempos: aguda com febre e plaquetas baixas; subclinica silenciosa, muitas vezes apenas com trombocitopenia discreta; cronica com medula cansada, imunocomplexos e sangramentos. O segredo da ficha e nao tratar o SNAP isolado, e sim o paciente inteiro.',
    leadHighlights: ['tres tempos', 'plaquetas baixas', 'subclinica', 'cronica', 'SNAP isolado'],
    pillars: [
      {
        title: 'O que mais entrega',
        body:
          'Trombocitopenia e o achado mais consistente. Petequias, equimoses e epistaxe aparecem por baixa contagem, disfuncao plaquetaria e vasculite.',
        highlights: ['Trombocitopenia', 'epistaxe'],
      },
      {
        title: 'Onde a prova e a clinica confundem',
        body:
          'IFA, ELISA/SNAP e titulos altos podem refletir exposicao passada. PCR ajuda a documentar infeccao ativa, principalmente antes de iniciar doxiciclina.',
        highlights: ['exposicao passada', 'PCR'],
      },
      {
        title: 'Quando preocupar mais',
        body:
          'Pancitopenia, hipoplasia medular, uveite grave, proteinuria, sinais neurologicos ou coinfeccoes indicam forma mais complexa e prognostico pior.',
        highlights: ['Pancitopenia', 'prognostico pior'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo pratico de diagnostico',
      steps: [
        {
          label: '1. Suspeita',
          detail:
            'Historico de carrapatos, area endemica, febre, letargia, anorexia, sangramento ou trombocitopenia.',
        },
        {
          label: '2. Hemograma e bioquimica',
          detail:
            'Buscar trombocitopenia, anemia nao regenerativa, leucopenia/pancitopenia, hiperglobulinemia, hipoalbuminemia e enzimas hepaticas aumentadas.',
        },
        {
          label: '3. Teste especifico',
          detail:
            'Combinar sorologia e/ou PCR. Repetir sorologia em 2-3 semanas se a suspeita for alta e o teste inicial vier negativo.',
        },
        {
          label: '4. Estadiar gravidade',
          detail:
            'Avaliar olhos, urina, rim, neurologico, sangramentos e medula quando houver pancitopenia.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapeutico',
      steps: [
        {
          label: 'Base',
          detail: 'Doxiciclina 10 mg/kg VO q24h por 28 dias ou 5 mg/kg VO q12h por 28 dias.',
        },
        {
          label: 'Suporte',
          detail: 'Fluidoterapia, transfusao e tratamento de complicacoes conforme gravidade.',
        },
        {
          label: 'Reavaliar',
          detail: 'Plaquetas costumam subir em 24-48 h e normalizar em ate 14 dias. Falha de resposta exige revisar diagnostico e coinfeccoes.',
        },
      ],
    },
  },
  etiology: {
    agente:
      'Ehrlichia canis e uma bacteria pequena, gram-negativa, intracelular obrigatoria, da ordem Rickettsiales. No cao, infecta principalmente monocitos e macrofagos, onde forma morulas e se multiplica.',
    alvoCelular:
      'A afinidade por celulas do sistema mononuclear fagocitico explica a disseminacao sistemica, a relacao com baco, figado, linfonodos, medula ossea e a dificuldade de interpretar testes isolados em fases diferentes.',
    sinonimiaClinica:
      'Os nomes febre hemorragica canina e pancitopenia tropical canina refletem duas faces importantes da doenca: sangramento por alteracao plaquetaria/vascular e falencia medular na fase cronica.',
  },
  epidemiology: {
    distribuicao:
      'E. canis ocorre mundialmente, incluindo Asia, Africa, Europa, America do Norte e America do Sul. A prevalencia aumenta em areas com infestacao por carrapatos e controle ectoparasitario irregular.',
    vetores:
      'O principal vetor e Rhipicephalus sanguineus, o carrapato-marrom-do-cao. Em partes do leste asiatico, Haemaphysalis longicornis tambem e descrito como vetor relevante.',
    predisposicao:
      'Qualquer cao pode adoecer. Pastor Alemao e Husky Siberiano sao mais associados a formas graves; em Pastor Alemao, resposta imune celular menos eficiente pode contribuir para maior gravidade e mortalidade.',
    coinfeccoes:
      'O mesmo ecossistema de carrapatos pode envolver Babesia canis vogeli, Hepatozoon canis, Anaplasma spp. e outros agentes. Coinfeccao deve ser investigada quando o quadro e grave, atipico ou responde mal a doxiciclina.',
  },
  pathogenesisTransmission: {
    transmissao:
      'A transmissao ocorre durante o repasto sanguineo. Pode acontecer em poucas horas de fixacao do carrapato, aproximadamente 3-8 horas. O periodo de incubacao costuma ser de 1 a 3 semanas.',
    figuraCicloCarrapato: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/ciclo-rhipicephalus-sanguineus-1600.jpg`,
      alt: 'Ciclo de vida do carrapato Rhipicephalus sanguineus em caes',
      display: 'full',
      caption:
        'Ciclo de Rhipicephalus sanguineus: femeas ingurgitadas caem no ambiente, ovipositam em locais protegidos, larvas/ninfas/adultos fazem repasto em caes e retornam ao ambiente para muda ou postura. Em condicoes favoraveis, o ciclo pode fechar em cerca de 2 meses. Fonte da imagem: Ferrolho et al., "The Complexities of Canine Monocytic Ehrlichiosis", Microbiology Research 2025, Fig. 2; criada com BioRender.',
    },
    figuraCarrapato: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-2-carrapato-marrom.jpg`,
      alt: 'Carrapato-marrom-do-cao Rhipicephalus sanguineus macho e femea ingurgitada',
      display: 'wide',
      caption:
        'Carrapato-marrom-do-cao, Rhipicephalus sanguineus: macho a esquerda e femea ingurgitada a direita. E o vetor classico de E. canis. Fonte da imagem: Harrus, Waner e Neer, capitulo "Ehrlichia and Anaplasma Infections", Infectious Diseases of the Dog and Cat, Fig. 26-2, via Veterian Key.',
    },
    patogeneseInicial:
      'No hospedeiro, E. canis se aloja em monocitos e macrofagos, forma morulas e se dissemina para baco, figado, linfonodos e endotelio vascular. A vasculite, a ativacao imune e a disfuncao plaquetaria explicam boa parte dos sinais iniciais.',
    fases:
      'Fase aguda: multiplicacao sistemica, febre, organomegalia, vasculite e trombocitopenia. Fase subclinica: animal clinicamente normal, mas com possivel trombocitopenia discreta e sequestro esplenico do agente. Fase cronica: resposta imune persistente, imunocomplexos, hipoplasia medular, pancitopenia, glomerulonefrite, uveite e sinais neurologicos/articulares.',
  },
  pathophysiology: {
    desenvolvimentoCelular: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-3-desenvolvimento-e-canis.jpg`,
      alt: 'Ciclo de desenvolvimento de Ehrlichia canis em celulas do cao',
      display: 'full',
      caption:
        'Desenvolvimento de E. canis em celulas do cao: entrada em celulas mononucleares, multiplicacao em vacuolos/morulas e liberacao para infectar novas celulas. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Infectious Diseases of the Dog and Cat, Fig. 26-3, via Veterian Key.',
    },
    faseAguda:
      'Na fase aguda, o agente se multiplica em macrofagos e se dissemina. A chegada a figado, baco e linfonodos pode causar organomegalia; o envolvimento vascular contribui para vasculite, febre, edema e sangramentos.',
    faseSubclinica:
      'Na fase subclinica, o cao pode parecer saudavel. A bacteria pode permanecer sequestrada no baco e escapar da resposta imune por mecanismos como inibicao da fusao fagolisossomal, modulacao de MHC II e variacao antigenica.',
    faseCronica:
      'Na fase cronica, a marca de maior gravidade e a mielossupressao. Hipoplasia de medula ossea pode causar pancitopenia. Imunocomplexos contribuem para glomerulonefrite, poliartrite, meningite e alteracoes oculares.',
    dicaDeEstudo:
      'Dica de estudo: conecte cada fase ao mecanismo dominante: aguda = vasculite e plaquetas; subclinica = baco e silencio clinico; cronica = medula, imunocomplexos e pancitopenia.',
  },
  clinicalSignsPathophysiology: {
    tabelaSinaisClinicos: {
      kind: 'clinicalTable',
      headers: ['Grupo', 'Sinais principais', 'Como interpretar'],
      rows: [
        [
          'Gerais',
          'Febre, letargia, depressao, anorexia, perda de peso, desidratacao, vomito, diarreia.',
          'Inflamacao sistemica, fase aguda ou cronica e possiveis coinfeccoes.',
        ],
        [
          'Linfoide/abdominal',
          'Linfadenomegalia, esplenomegalia, hepatomegalia.',
          'Disseminacao no sistema mononuclear fagocitico e resposta imune.',
        ],
        [
          'Hemorragicos',
          'Mucosas palidas, petequias, equimoses, epistaxe, hematuria, sangramento em multiplos locais.',
          'Trombocitopenia, disfuncao plaquetaria, vasculite e, na fase cronica, falencia medular.',
        ],
        [
          'Oculares',
          'Secrecao ocular, uveite, hifema, glaucoma secundario, hemorragia retiniana, descolamento de retina, KCS, ulcera de cornea, cegueira.',
          'Uveite/vasculite, imunocomplexos, hipertensao/hiperviscosidade e sangramento ocular.',
        ],
        [
          'Neurologicos',
          'Convulsoes, ataxia, anisocoria, estupor, sinais vestibulares, tremores, hiperestesia.',
          'Meningite, vasculite e hemorragia meningeal; menos comum, mas relevante em casos graves.',
        ],
        [
          'Musculoesqueleticos',
          'Rigidez, dor muscular, claudicacao, poliartrite.',
          'Inflamacao/imunocomplexos; considerar coinfeccao quando predominante.',
        ],
        [
          'Cardiorrespiratorios',
          'Taquicardia, sopro, arritmias, dispneia, taquipneia, descarga nasal.',
          'Febre, anemia, vasculite, possivel lesao miocardica e complicacoes pulmonares.',
        ],
      ],
    },
    petequiasAbdominais: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-4-petequias-abdominais.jpg`,
      alt: 'Petequias em pele abdominal ventral de cadela com Ehrlichia canis',
      display: 'compact',
      caption:
        'Petequias em pele abdominal ventral por trombocitopenia em cadela infectada por E. canis. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Fig. 26-4, via Veterian Key.',
    },
    petequiasMucosas: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-5-petequias-mucosas.jpg`,
      alt: 'Petequias em mucosa por infeccao por Ehrlichia canis',
      display: 'compact',
      caption:
        'Petequias em mucosa por infeccao por E. canis. Boa imagem para lembrar que a inspecao de mucosas ajuda a detectar sangramento discreto. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Fig. 26-5, via Veterian Key.',
    },
    epistaxe: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-6-epistaxe.jpg`,
      alt: 'Epistaxe em cao por Ehrlichia canis',
      display: 'compact',
      caption:
        'Epistaxe em cao por E. canis. Em CME, sangramento nasal pode refletir trombocitopenia, trombocitopatia e vasculite. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Fig. 26-6, via Veterian Key.',
    },
    hifema: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-7-hifema.jpg`,
      alt: 'Hifema em cao com infeccao por Ehrlichia canis',
      display: 'compact',
      caption:
        'Hifema em cao com E. canis. Alteracoes oculares podem ser apresentacao inicial e exigem exame oftalmico cuidadoso. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Fig. 26-7, via Veterian Key.',
    },
    hemorragiaEscleral: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-8-hemorragia-escleral.jpg`,
      alt: 'Hemorragia escleral em cao por Ehrlichia canis',
      display: 'compact',
      caption:
        'Hemorragia escleral em cao por E. canis. Agrupada com hifema por representar manifestacoes oculares/hemorragicas de alto valor visual. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Fig. 26-8, via Veterian Key.',
    },
  },
  diagnosis: {
    raciocinio:
      'O diagnostico e integrado. Nenhum teste isolado deve substituir a combinacao de epidemiologia, exame fisico, hemograma, bioquimica/urina e teste especifico. Historico de carrapatos ajuda, mas a ausencia de relato nao exclui.',
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Suspeita clinica e triagem',
        description:
          'Procurar carrapatos, exposicao ambiental, febre, anorexia, perda de peso, linfadenomegalia, esplenomegalia, petequias, epistaxe, uveite ou sinais neurologicos.',
      },
      {
        stepNumber: 2,
        title: 'Hemograma, bioquimica e urinalise',
        description:
          'CBC: trombocitopenia, anemia nao regenerativa, leucopenia/leucocitose variavel e pancitopenia cronica. Bioquimica: hiperglobulinemia, hiperproteinemia, hipoalbuminemia, ALT/ALP aumentadas. Urina: proteinuria e hematuria.',
      },
      {
        stepNumber: 3,
        title: 'Citologia quando houver oportunidade',
        description:
          'Morulas em monocitos no sangue ou macrofagos de aspirados confirmam quando vistas, mas a sensibilidade e baixa. Buffy coat, aspirado de linfonodo/esplenico e esfregaco de margem de orelha podem aumentar rendimento.',
      },
      {
        stepNumber: 4,
        title: 'Sorologia com interpretacao temporal',
        description:
          'IFA e ELISA/SNAP detectam anticorpos. Resultados podem ser negativos no inicio da fase aguda; repetir em 2-3 semanas quando a suspeita for alta. Positivo indica exposicao e pode persistir por meses.',
      },
      {
        stepNumber: 5,
        title: 'PCR',
        description:
          'PCR pode positivar cedo e confirma infeccao em animal nao tratado. Colher preferencialmente antes da doxiciclina. Em fases subclinicas/cronicas, a sensibilidade pode cair.',
        isGoldStandard: true,
      },
      {
        stepNumber: 6,
        title: 'Aprofundar conforme orgao-alvo',
        description:
          'Liquor se sinais neurologicos; ultrassonografia se organomegalia/abdome; ECG se arritmia; eletroforese de proteinas se hiperglobulinemia, principalmente monoclonal.',
      },
    ],
    fasesELaboratorio: {
      kind: 'clinicalTable',
      headers: ['Fase', 'Achado clinico comum', 'Laboratorio que ajuda', 'Armadilha'],
      rows: [
        [
          'Aguda',
          'Febre, letargia, anorexia, linfadenomegalia, esplenomegalia, hemorragias discretas.',
          'Trombocitopenia; anemia nao regenerativa; PCR pode ser positiva cedo.',
          'Sorologia pode vir negativa nos primeiros dias/semanas.',
        ],
        [
          'Subclinica',
          'Cao aparentemente saudavel.',
          'Trombocitopenia discreta, hiperglobulinemia; sorologia positiva.',
          'Tratar todo soropositivo saudavel pode nao trazer beneficio e favorece uso desnecessario de antibiotico.',
        ],
        [
          'Cronica',
          'Emagrecimento, sangramentos, uveite, edema, sinais neurologicos/articulares.',
          'Pancitopenia, hipoplasia medular, proteinuria, hiperglobulinemia.',
          'PCR pode ser menos confiavel e a resposta hematologica pode ser lenta ou incompleta.',
        ],
      ],
    },
    morulaTvmdl: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/tvmdl-morula-e-canis-esfregaco.jpg`,
      alt: 'Morula de Ehrlichia canis em monocito no esfregaco sanguineo de um cao',
      display: 'wide',
      caption:
        'Esfregaco sanguineo periferico de cao: monocito na borda da cauda com morula citoplasmatica, consistente com E. canis. Fonte da imagem: Piccione e Schroeder, estudo de caso "Ehrlichia canis discovered in dog", Texas A&M TVMDL, Fig. 1.',
    },
    morulaDetalhada: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-1-morula-e-ciclo-celular.jpg`,
      alt: 'Morula de Ehrlichia canis em monocito e em cultura DH82',
      display: 'full',
      caption:
        'E. canis em morula: A) morula no citoplasma de monocito em esfregaco sanguineo; B) morulas em celulas DH82; C) morula em microscopia eletronica, com multiplos organismos e fissao binaria. Fonte da imagem: Harrus, Waner e Neer, "Ehrlichia and Anaplasma Infections", Infectious Diseases of the Dog and Cat, Fig. 26-1, via Veterian Key.',
    },
    diferenciais: [
      'Anaplasmose granulocitica',
      'Babesiose',
      'Hepatozoonose canina',
      'Leishmaniose',
      'Doenca de Lyme',
      'Febre maculosa',
      'Parvovirose canina',
      'Intoxicacao por rodenticida anticoagulante',
      'Anemia hemolitica imunomediada',
      'Trombocitopenia imunomediada',
      'Leucemias, linfoma, mieloma multiplo, mielofibrose e outras causas de pancitopenia',
      'Tripanossomiase e outras causas infecciosas de arritmia conforme regiao',
    ],
  },
  treatment: {
    ordemDePrioridade: [
      '1) Decidir se ha doenca ativa: sinais clinicos + alteracoes laboratoriais + exposicao/teste especifico. Nao basear tratamento apenas em sorologia positiva de cao saudavel.',
      '2) Iniciar doxiciclina quando a suspeita clinica for forte, principalmente em agudos febris com trombocitopenia.',
      '3) Tratar suporte e complicacoes: hemorragia, anemia, desidratacao, uveite, proteinuria, sinais neurologicos e coinfeccoes.',
      '4) Reavaliar resposta em 24-72 horas para febre/apetite e em 7-14 dias para plaquetas.',
      '5) Manter prevencao de carrapatos durante todo o ano para evitar reinfeccao.',
    ],
    antimicrobianos: {
      kind: 'clinicalTable',
      headers: ['Medicamento', 'Dose usual', 'Papel no protocolo'],
      rows: [
        [
          'Doxiciclina',
          '10 mg/kg VO q24h por 28 dias ou 5 mg/kg VO q12h por 28 dias.',
          'Primeira escolha; melhor sustentacao para CME em caes.',
        ],
        [
          'Tetraciclina',
          '22 mg/kg VO q8h por 21-28 dias.',
          'Alternativa historica; menos conveniente que doxiciclina.',
        ],
        [
          'Minociclina',
          '10 mg/kg VO q12h por 21-28 dias.',
          'Alternativa quando doxiciclina nao puder ser usada.',
        ],
        [
          'Cloranfenicol',
          '25-50 mg/kg VO q8h por 21-28 dias.',
          'Alternativa, mas nao primeira escolha; considerar seguranca ocupacional e perfil do paciente.',
        ],
        [
          'Imidocarb / enrofloxacina',
          'Nao usar como eixo de primeira linha para E. canis.',
          'Imidocarb foi recomendado no passado, mas estudos recentes apontam baixa eficacia; enrofloxacina geralmente e ineficaz.',
        ],
      ],
    },
    suporte:
      'Casos graves podem precisar de fluidoterapia intravenosa, transfusao, manejo de hemorragias, suporte nutricional e tratamento de complicacoes oculares, renais, cardiacas ou neurologicas.',
    corticoide:
      'Prednisona em dose imunossupressora curta pode ser considerada em trombocitopenia com risco de vida quando houver suspeita de componente imunomediado importante. Nao deve ser automatica para todo paciente com erliquiose.',
    mielossupressao:
      'Na forma cronica com hipoplasia/aplasia medular, ferro, folato, analogos de eritropoietina ou estimuladores de granulocitos podem ser considerados em casos selecionados, mas o prognostico permanece reservado quando ha pancitopenia grave.',
    monitoramento: [
      'Hemograma e bioquimica durante e apos o tratamento.',
      'Plaquetas costumam subir em 24-48 horas e normalizar em ate 14 dias.',
      'Manter vigilancia por 1-3 meses apos o fim do tratamento quando havia trombocitopenia importante.',
      'Hiperglobulinemia pode demorar 6-12 meses para resolver.',
      'Titulos sorologicos podem persistir positivos; queda clinica/laboratorial e mais importante que negativacao imediata.',
      'PCR pode ser repetida cerca de 2 semanas apos o fim da terapia quando houver necessidade de documentar eliminacao.',
    ],
    prognostico:
      'Fase aguda tratada cedo costuma ter bom prognostico, com melhora em 24-48 horas. Fase cronica com pancitopenia tem prognostico reservado a ruim; anemia intensa, leucopenia grave, TTPA prolongado e hipocalemia foram associados a mortalidade elevada.',
  },
  prevention: {
    carrapatos:
      'Controle rigoroso de carrapatos durante todo o ano, principalmente em areas endemicas. Usar acaricidas adequados no paciente e nos contactantes, revisar ambiente, caminhas, frestas e locais de descanso.',
    ambiente:
      'R. sanguineus pode completar o ciclo em ambientes internos, como casas e canis. Por isso, controle ambiental e tao importante quanto produto no cao.',
    saudePublica:
      'E. canis nao e considerada atualmente uma zoonose comprovada por transmissao direta de caes para pessoas. O risco compartilhado e o carrapato: controlar ectoparasitas protege o animal e reduz exposicao humana.',
    educacaoTutor:
      'Explicar que reinfeccao pode ocorrer e que teste sorologico positivo pode permanecer por meses. O objetivo e controlar clinica, laboratorio e exposicao a carrapatos.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-cme-2025',
      citationText:
        'Rothrock K. Ehrlichiosis, Monocytic (Canine). VIN, revised April 21, 2025.',
      sourceType: 'Revisao clinica',
      url: null,
      notes: 'Base principal enviada pelo usuario: etiologia, diagnostico, tratamento, monitoramento e prognostico.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-mdpi-e-canis-vector-2025',
      citationText:
        'Ferrolho J, Antunes S, Vilhena H, Anastacio S, de Sousa SR, Frouco G, Ferreira B, Domingos A. The Complexities of Canine Monocytic Ehrlichiosis: Insights into Ehrlichia canis and Its Vector Rhipicephalus sanguineus. Microbiology Research. 2025;16(4):85.',
      sourceType: 'Revisao open access',
      url: 'https://www.mdpi.com/2036-7481/16/4/85',
      notes: 'Base para ciclo do carrapato R. sanguineus; imagem da ficha corresponde a Fig. 2 do artigo, criada com BioRender.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-veteriankey-ehrlichia-anaplasma',
      citationText:
        'Harrus S, Waner T, Neer TM. Ehrlichia and Anaplasma Infections. In: Infectious Diseases of the Dog and Cat, 4th ed. Elsevier Saunders, 2012; via Veterian Key.',
      sourceType: 'Livro-texto / capitulo online',
      url: 'https://veteriankey.com/ehrlichia-and-anaplasma-infections/',
      notes: 'Fonte das imagens Veterian Key Figs. 26-1 a 26-8 usadas na ficha: morulas, carrapato-marrom, desenvolvimento intracelular, petequias, epistaxe, hifema e hemorragia escleral.',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-tvmdl-e-canis-dog-2024',
      citationText:
        'Piccione J, Schroeder M. Ehrlichia canis discovered in dog. Texas A&M Veterinary Medical Diagnostic Laboratory case study. August 8, 2024.',
      sourceType: 'Estudo de caso / imagem diagnostica',
      url: 'https://tvmdl.tamu.edu/case-studies/ehrlichia-canis-discovered-in-dog/',
      notes: 'Fonte da imagem de esfregaco sanguineo com morula citoplasmatica em monocito, Fig. 1.',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-acvim-ehrlichia-2002',
      citationText:
        'Neer TM et al. Consensus statement on ehrlichial disease of small animals. J Vet Intern Med. 2002;16(3):309-315.',
      sourceType: 'Consenso',
      url: null,
      notes: 'Duracao da terapia, interpretacao de monitoramento e raciocinio diagnostico.',
      evidenceLevel: 'A (consenso)',
    },
    {
      id: 'ref-sykes-2024',
      citationText:
        'Sykes JE, Qurollo B. Ehrlichiosis, anaplasmosis, rocky mountain spotted fever, and neorickettsiosis. Textbook of Veterinary Internal Medicine, 9th ed. 2024.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Atualizacao de doencas rickettsiais em pequenos animais.',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
