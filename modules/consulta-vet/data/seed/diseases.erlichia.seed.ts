import { DiseaseRecord } from '../../types/disease';

const ASSET_BASE = '/assets/consulta-vet';

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
    'Doença do cão rastreador',
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
    'A erliquiose monocitica canina e uma doença infecciosa transmitida por carrapatos, causada por Ehrlichia canis. O agente infecta monocitos e macrofagos, forma morulas intracitoplasmaticas e dissemina pelo sistema mononuclear fagocitico. O quadro pode ser agudo, subclinico ou crônico. A pista laboratorial mais importante e trombocitopenia, mas a doença tambem pode cursar com anemia não regenerativa, hiperglobulinemia, proteinuria, sinais hemorragicos, uveite, sinais neurologicos e, na fase crônica grave, mielossupressao com pancitopenia.',
  quickDecisionStrip: [
    'Cão + carrapatos + trombocitopenia = erliquiose sempre entra alto na lista.',
    'Sorologia positiva sozinha indica exposicao; não prova doença ativa sem contexto.',
    'PCR positiva antes de antibiotico confirma infeccao; PCR negativa não exclui fases cronicas/subclinicas.',
    'Doxiciclina por 28 dias e o eixo terapêutico preferencial.',
    'Pancitopenia crônica, Pastor Alemao e falta de resposta em 48-72 h pioram o cenario.',
  ],
  quickSummaryRich: {
    lead:
      'Pense na CME como uma doença de tres tempos: aguda com febre e plaquetas baixas; subclinica silenciosa, muitas vezes apenas com trombocitopenia discreta; crônica com medula cansada, imunocomplexos e sangramentos. O segredo da ficha e não tratar o SNAP isolado, e sim o paciente inteiro.',
    leadHighlights: ['tres tempos', 'plaquetas baixas', 'subclinica', 'cronica', 'SNAP isolado'],
    pillars: [
      {
        title: 'O que mais entrega',
        body:
          'Trombocitopenia e o achado mais consistente. Petequias, equimoses e epistaxe aparecem por baixa contagem, disfuncao plaquetaria e vasculite.',
        highlights: ['Trombocitopenia', 'epistaxe'],
      },
      {
        title: 'Onde a prova e a clínica confundem',
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
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Suspeita',
          timing: 'Primeira consulta',
          detail:
            'Histórico de carrapatos, área endêmica, febre, letargia, anorexia, sangramento ou trombocitopenia (Rothrock, VIN 2025; Ferrolho et al., 2025).',
        },
        {
          label: 'Hemograma e bioquímica',
          timing: 'Na admissão',
          detail:
            'Trombocitopenia, anemia não regenerativa, leucopenia/pancitopenia, hiperglobulinemia, hipoalbuminemia e enzimas hepáticas aumentadas (Rothrock, VIN 2025).',
        },
        {
          label: 'Teste específico',
          timing: 'Confirmar infecção ativa',
          detail:
            'Combinar sorologia e/ou PCR; repetir sorologia em 2–3 semanas se suspeita alta e teste inicial negativo (Rothrock, VIN 2025).',
          reassess: 'PCR antes de iniciar doxiciclina aumenta sensibilidade.',
        },
        {
          label: 'Estadiar gravidade',
          timing: 'Após confirmação',
          detail:
            'Avaliar olhos, urina, rim, neurológico, sangramentos e medula quando houver pancitopenia (Rothrock, VIN 2025).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Base — doxiciclina',
          detail:
            'Antibiótico de primeira linha para E. canis; tratar coinfecções se documentadas (Rothrock, VIN 2025; Plumb\'s, 10ª ed.).',
          dose: 'Doxiciclina 10 mg/kg VO q24h × 28 dias ou 5 mg/kg VO q12h × 28 dias.',
          duration: '28 dias completos.',
          reassess: 'Plaquetas costumam subir em 24–48 h e normalizar em até 14 dias.',
        },
        {
          label: 'Suporte',
          detail:
            'Fluidoterapia, transfusão e tratamento de complicações conforme gravidade (Rothrock, VIN 2025).',
          duration: 'Até estabilização hemodinâmica.',
          reassess: 'Monitorar pancitopenia, uveíte e função renal.',
        },
        {
          label: 'Reavaliar resposta',
          detail:
            'Falha de resposta plaquetária exige revisar diagnóstico, adesão e coinfecções (babesiose, anaplasma) (Rothrock, VIN 2025).',
          reassess: 'Repetir PCR/sorologia conforme protocolo de seguimento.',
        },
      ],
    },
  },
  etiology: {
    agente:
      'Ehrlichia canis e uma bacteria pequena, gram-negativa, intracelular obrigatoria, da ordem Rickettsiales. No cão, infecta principalmente monocitos e macrofagos, onde forma morulas e se multiplica.',
    alvoCelular:
      'A afinidade por celulas do sistema mononuclear fagocitico explica a disseminacao sistêmica, a relação com baco, figado, linfonodos, medula ossea e a dificuldade de interpretar testes isolados em fases diferentes.',
    sinonimiaClinica:
      'Os nomes febre hemorragica canina e pancitopenia tropical canina refletem duas faces importantes da doença: sangramento por alteração plaquetaria/vascular e falencia medular na fase crônica.',
  },
  epidemiology: {
    distribuicao:
      'E. canis ocorre mundialmente, incluindo Asia, Africa, Europa, America do Norte e America do Sul. A prevalencia aumenta em areas com infestacao por carrapatos e controle ectoparasitario irregular.',
    vetores:
      'O principal vetor e Rhipicephalus sanguineus, o carrapato-marrom-do-cão. Em partes do leste asiatico, Haemaphysalis longicornis tambem e descrito como vetor relevante.',
    predisposicao:
      'Qualquer cão pode adoecer. Pastor Alemao e Husky Siberiano sao mais associados a formas graves; em Pastor Alemao, resposta imune celular menos eficiente pode contribuir para maior gravidade e mortalidade.',
    coinfeccoes:
      'O mesmo ecossistema de carrapatos pode envolver Babesia canis vogeli, Hepatozoon canis, Anaplasma spp. e outros agentes. Coinfeccao deve ser investigada quando o quadro e grave, atipico ou responde mal a doxiciclina.',
  },
  pathogenesisTransmission: {
    transmissao:
      'A transmissao ocorre durante o repasto sanguineo. Pode acontecer em poucas horas de fixacao do carrapato, aproximadamente 3-8 horas. O periodo de incubacao costuma ser de 1 a 3 semanas.',
    figuraCicloCarrapato: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/ciclo-rhipicephalus-sanguineus-1600.jpg`,
      alt: 'Ciclo de vida do carrapato Rhipicephalus sanguineus em cães',
      display: 'wide',
      caption:
        'Diagrama do ciclo biologico de tres hospedeiros do carrapato-marrom (Rhipicephalus sanguineus), detalhando as fases de ovo, larva, ninfa e adulto, destacando a infestacao em ambientes internos (indoor) e externos (outdoor) e a transmissao do patogeno aos cães.',
    },
    figuraCarrapato: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-2-carrapato-marrom.jpg`,
      alt: 'Macho e fêmea ingurgitada de Rhipicephalus sanguineus',
      display: 'wide',
      caption:
        'Comparativo morfologico do vetor Rhipicephalus sanguineus: macho a esquerda (pequeno, plano e escuro) e fêmea ingurgitada a direita (aumentada de tamanho e repleta de sangue após o repasto sanguineo).',
    },
    patogeneseInicial:
      'No hospedeiro, E. canis se aloja em monocitos e macrofagos, forma morulas e se dissemina para baco, figado, linfonodos e endotelio vascular. A vasculite, a ativacao imune e a disfuncao plaquetaria explicam boa parte dos sinais iniciais.',
    fases:
      'Fase aguda: multiplicacao sistêmica, febre, organomegalia, vasculite e trombocitopenia. Fase subclinica: animal clinicamente normal, mas com possível trombocitopenia discreta e sequestro esplenico do agente. Fase crônica: resposta imune persistente, imunocomplexos, hipoplasia medular, pancitopenia, glomerulonefrite, uveite e sinais neurologicos/articulares.',
  },
  pathophysiology: {
    desenvolvimentoCelular: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-3-desenvolvimento-e-canis.jpg`,
      alt: 'Ciclo de desenvolvimento de Ehrlichia canis em celulas do cão',
      display: 'full',
      caption:
        'Esquema do ciclo intracelular de desenvolvimento de Ehrlichia canis: fixacao e entrada no monocito, replicacao binaria em vacuolos formando morulas, maturacao e liberacao atraves da lise ou exocitose para infectar novas celulas.',
    },
    faseAguda:
      'Na fase aguda, o agente se multiplica em macrofagos e se dissemina. A chegada a figado, baco e linfonodos pode causar organomegalia; o envolvimento vascular contribui para vasculite, febre, edema e sangramentos.',
    faseSubclinica:
      'Na fase subclinica, o cão pode parecer saudavel. A bacteria pode permanecer sequestrada no baco e escapar da resposta imune por mecanismos como inibicao da fusao fagolisossomal, modulacao de MHC II e variacao antigenica.',
    faseCronica:
      'Na fase crônica, a marca de maior gravidade e a mielossupressao. Hipoplasia de medula ossea pode causar pancitopenia. Imunocomplexos contribuem para glomerulonefrite, poliartrite, meningite e alteracoes oculares.',
  },
  clinicalSignsPathophysiology: {
    tabelaSinaisClinicos: {
      kind: 'clinicalTable',
      headers: ['Grupo', 'Sinais principais', 'Como interpretar'],
      rows: [
        [
          'Gerais',
          'Febre, letargia, depressao, anorexia, perda de peso, desidratacao, vômito, diarreia.',
          'Inflamacao sistêmica, fase aguda ou crônica e possíveis coinfeccoes.',
        ],
        [
          'Linfoide/abdominal',
          'Linfadenomegalia, esplenomegalia, hepatomegalia.',
          'Disseminacao no sistema mononuclear fagocitico e resposta imune.',
        ],
        [
          'Hemorragicos',
          'Mucosas palidas, petequias, equimoses, epistaxe, hematuria, sangramento em multiplos locais.',
          'Trombocitopenia, disfuncao plaquetaria, vasculite e, na fase crônica, falencia medular.',
        ],
        [
          'Oculares',
          'Secrecao ocular, uveite, hifema, glaucoma secundario, hemorragia retiniana, descolamento de retina, KCS, ulcera de cornea, cegueira.',
          'Uveite/vasculite, imunocomplexos, hipertensão/hiperviscosidade e sangramento ocular.',
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
          'Febre, anemia, vasculite, possível lesão miocardica e complicacoes pulmonares.',
        ],
      ],
    },
    sinaisHemorragicosCutaneoMucosos: {
      petequiasAbdominais: {
        kind: 'clinicalFigure',
        src: `${ASSET_BASE}/fig-26-4-petequias-abdominais.jpg`,
        alt: 'Petequias cutaneas no abdomen ventral de um cão',
        display: 'wide',
        caption:
          'Petequias e sufoes hemorragicas difusas na pele da região abdominal ventral de um cão, caracteristicas de trombocitopenia grave e vasculite na fase aguda da infeccao.',
      },
      petequiasMucosas: {
        kind: 'clinicalFigure',
        src: `${ASSET_BASE}/fig-26-5-petequias-mucosas.jpg`,
        alt: 'Petequias na mucosa gengival de um cão',
        display: 'wide',
        caption:
          'Presenca de multiplas petequias (pequenos pontos hemorragicos avermelhados) na mucosa gengival oral de um cão, reforcando a importancia da inspecao de mucosas.',
      },
    },
    sinaisCavidadesEOculares: {
      epistaxe: {
        kind: 'clinicalFigure',
        src: `${ASSET_BASE}/fig-26-6-epistaxe.jpg`,
        alt: 'Sangramento nasal ativo (epistaxe) em cão',
        display: 'wide',
        caption:
          'Fluxo ativo de sangue pelas narinas (epistaxe unilateral) em um cão acometido, decorrente de disfuncao plaquetaria, trombocitopenia acentuada e lesão endotelial.',
      },
      hifema: {
        kind: 'clinicalFigure',
        src: `${ASSET_BASE}/fig-26-7-hifema.jpg`,
        alt: 'Acumulo de sangue na camara anterior do olho (hifema)',
        display: 'wide',
        caption:
          'Hifema unilateral caracterizado pelo acumulo de sangue livre na camara anterior do olho de um cão, resultante de uveite anterior grave e vasculite associadas a erliquiose.',
      },
      hemorragiaEscleral: {
        kind: 'clinicalFigure',
        src: `${ASSET_BASE}/fig-26-8-hemorragia-escleral.jpg`,
        alt: 'Hemorragia escleral e conjuntival',
        display: 'wide',
        caption:
          'Hemorragia subconjuntival e escleral evidente na esclera de um cão, representando outra manifestacao ocular comum das alteracoes vasculares e plaquetarias da doença.',
      },
    },
  },
  diagnosis: {
    raciocinio:
      'O diagnóstico e integrado. Nenhum teste isolado deve substituir a combinacao de epidemiologia, exame fisico, hemograma, bioquimica/urina e teste especifico. Histórico de carrapatos ajuda, mas a ausencia de relato não exclui.',
    planoDiagnostico: [
      {
        stepNumber: 1,
        title: 'Suspeita clínica e triagem',
        description:
          'Procurar carrapatos, exposicao ambiental, febre, anorexia, perda de peso, linfadenomegalia, esplenomegalia, petequias, epistaxe, uveite ou sinais neurologicos.',
      },
      {
        stepNumber: 2,
        title: 'Hemograma, bioquimica e urinálise',
        description:
          'CBC: trombocitopenia, anemia não regenerativa, leucopenia/leucocitose variavel e pancitopenia crônica. Bioquimica: hiperglobulinemia, hiperproteinemia, hipoalbuminemia, ALT/ALP aumentadas. Urina: proteinuria e hematuria.',
      },
      {
        stepNumber: 3,
        title: 'Citologia quando houver oportunidade',
        description:
          'Morulas em monocitos no sangue ou macrofagos de aspirados confirmam quando vistas, mas a sensibilidade e baixa. Buffy coat, aspirado de linfonodo/esplenico e esfregaco de margem de orelha podem aumentar rendimento.',
      },
      {
        stepNumber: 4,
        title: 'Sorologia com interpretação temporal',
        description:
          'IFA e ELISA/SNAP detectam anticorpos. Resultados podem ser negativos no início da fase aguda; repetir em 2-3 semanas quando a suspeita for alta. Positivo indica exposicao e pode persistir por meses.',
      },
      {
        stepNumber: 5,
        title: 'PCR',
        description:
          'PCR pode positivar cedo e confirma infeccao em animal não tratado. Colher preferencialmente antes da doxiciclina. Em fases subclinicas/cronicas, a sensibilidade pode cair.',
        isGoldStandard: true,
      },
      {
        stepNumber: 6,
        title: 'Aprofundar conforme órgão-alvo',
        description:
          'Liquor se sinais neurologicos; ultrassonografia se organomegalia/abdome; ECG se arritmia; eletroforese de proteinas se hiperglobulinemia, principalmente monoclonal.',
      },
    ],
    fasesELaboratorio: {
      kind: 'clinicalTable',
      headers: ['Fase', 'Achado clínico comum', 'Laboratorio que ajuda', 'Armadilha'],
      rows: [
        [
          'Aguda',
          'Febre, letargia, anorexia, linfadenomegalia, esplenomegalia, hemorragias discretas.',
          'Trombocitopenia; anemia não regenerativa; PCR pode ser positiva cedo.',
          'Sorologia pode vir negativa nos primeiros dias/semanas.',
        ],
        [
          'Subclinica',
          'Cão aparentemente saudavel.',
          'Trombocitopenia discreta, hiperglobulinemia; sorologia positiva.',
          'Tratar todo soropositivo saudavel pode não trazer beneficio e favorece uso desnecessario de antibiotico.',
        ],
        [
          'Crônica',
          'Emagrecimento, sangramentos, uveite, edema, sinais neurologicos/articulares.',
          'Pancitopenia, hipoplasia medular, proteinuria, hiperglobulinemia.',
          'PCR pode ser menos confiável e a resposta hematologica pode ser lenta ou incompleta.',
        ],
      ],
    },
    morulaTvmdl: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/tvmdl-morula-e-canis-esfregaco.jpg`,
      alt: 'Morula de Ehrlichia canis em monocito no esfregaco sanguineo de um cão',
      display: 'wide',
      caption:
        'Esfregaco de sangue periferico corado demonstrando uma morula basofilica tipica de Ehrlichia canis no citoplasma de um monocito (estrutura arredondada composta por multiplos organismos agrupados).',
    },
    morulaDetalhada: {
      kind: 'clinicalFigure',
      src: `${ASSET_BASE}/fig-26-1-morula-e-ciclo-celular.jpg`,
      alt: 'Morula de Ehrlichia canis em monocito e em cultura DH82',
      display: 'wide',
      caption:
        'Morfologia e ultraestrutura de E. canis: (A) Morula no citoplasma de monocito; (B) Multiplas morulas em cultura de celulas DH82; (C) Microscopia eletronica de transmissao revelando a morfologia individual e divisao binaria dos organismos.',
    },
    diferenciais: [
      'Anaplasmose granulocitica',
      'Babesiose',
      'Hepatozoonose canina',
      'Leishmaniose',
      'Doença de Lyme',
      'Febre maculosa',
      'Parvovirose canina',
      'Intoxicacao por rodenticida anticoagulante',
      'Anemia hemolitica imunomediada',
      'Trombocitopenia imunomediada',
      'Leucemias, linfoma, mieloma multiplo, mielofibrose e outras causas de pancitopenia',
      'Tripanossomiase e outras causas infecciosas de arritmia conforme região',
    ],
  },
  treatment: {
    ordemDePrioridade: [
      '1) Decidir se ha doença ativa: sinais clinicos + alteracoes laboratoriais + exposicao/teste especifico. Não basear tratamento apenas em sorologia positiva de cão saudavel.',
      '2) Iniciar doxiciclina quando a suspeita clínica for forte, principalmente em agudos febris com trombocitopenia.',
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
          'Primeira escolha; melhor sustentacao para CME em cães.',
        ],
        [
          'Tetraciclina',
          '22 mg/kg VO q8h por 21-28 dias.',
          'Alternativa historica; menos conveniente que doxiciclina.',
        ],
        [
          'Minociclina',
          '10 mg/kg VO q12h por 21-28 dias.',
          'Alternativa quando doxiciclina não puder ser usada.',
        ],
        [
          'Cloranfenicol',
          '25-50 mg/kg VO q8h por 21-28 dias.',
          'Alternativa, mas não primeira escolha; considerar segurança ocupacional e perfil do paciente.',
        ],
        [
          'Imidocarb / enrofloxacina',
          'Não usar como eixo de primeira linha para E. canis.',
          'Imidocarb foi recomendado no passado, mas estudos recentes apontam baixa eficacia; enrofloxacina geralmente e ineficaz.',
        ],
      ],
    },
    suporte:
      'Casos graves podem precisar de fluidoterapia intravenosa, transfusao, manejo de hemorragias, suporte nutricional e tratamento de complicacoes oculares, renais, cardiacas ou neurologicas.',
    corticoide:
      'Prednisona em dose imunossupressora curta pode ser considerada em trombocitopenia com risco de vida quando houver suspeita de componente imunomediado importante. Não deve ser automatica para todo paciente com erliquiose.',
    mielossupressao:
      'Na forma crônica com hipoplasia/aplasia medular, ferro, folato, analogos de eritropoietina ou estimuladores de granulocitos podem ser considerados em casos selecionados, mas o prognostico permanece reservado quando ha pancitopenia grave.',
    monitoramento: [
      'Hemograma e bioquimica durante e após o tratamento.',
      'Plaquetas costumam subir em 24-48 horas e normalizar em ate 14 dias.',
      'Manter vigilância por 1-3 meses após o fim do tratamento quando havia trombocitopenia importante.',
      'Hiperglobulinemia pode demorar 6-12 meses para resolver.',
      'Titulos sorologicos podem persistir positivos; queda clínica/laboratorial e mais importante que negativacao imediata.',
      'PCR pode ser repetida cerca de 2 semanas após o fim da terapia quando houver necessidade de documentar eliminação.',
    ],
    prognostico:
      'Fase aguda tratada cedo costuma ter bom prognostico, com melhora em 24-48 horas. Fase crônica com pancitopenia tem prognostico reservado a ruim; anemia intensa, leucopenia grave, TTPA prolongado e hipocalemia foram associados a mortalidade elevada.',
  },
  prevention: {
    carrapatos:
      'Controle rigoroso de carrapatos durante todo o ano, principalmente em areas endemicas. Usar acaricidas adequados no paciente e nos contactantes, revisar ambiente, caminhas, frestas e locais de descanso.',
    ambiente:
      'R. sanguineus pode completar o ciclo em ambientes internos, como casas e canis. Por isso, controle ambiental e tao importante quanto produto no cão.',
    saudePublica:
      'E. canis não e considerada atualmente uma zoonose comprovada por transmissao direta de cães para pessoas. O risco compartilhado e o carrapato: controlar ectoparasitas protege o animal e reduz exposicao humana.',
    educacaoTutor:
      'Explicar que reinfeccao pode ocorrer e que teste sorologico positivo pode permanecer por meses. O objetivo e controlar clínica, laboratorio e exposicao a carrapatos.',
  },
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-vin-cme-2025',
      citationText:
        'Rothrock K. Ehrlichiosis, Monocytic (Canine). VIN, revised April 21, 2025.',
      sourceType: 'Revisao clínica',
      url: null,
      notes: 'Base principal enviada pelo usuario: etiologia, diagnóstico, tratamento, monitoramento e prognostico.',
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
      notes: 'Duração da terapia, interpretação de monitoramento e raciocínio diagnóstico.',
      evidenceLevel: 'A (consenso)',
    },
    {
      id: 'ref-sykes-2024',
      citationText:
        'Sykes JE, Qurollo B. Ehrlichiosis, anaplasmosis, rocky mountain spotted fever, and neorickettsiosis. Textbook of Veterinary Internal Medicine, 9th ed. 2024.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Atualizacao de doenças rickettsiais em pequenos animais.',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
