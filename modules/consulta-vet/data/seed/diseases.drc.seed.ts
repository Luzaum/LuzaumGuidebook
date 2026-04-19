import type { DiseaseRecord } from '../../types/disease';

/**
 * Doença renal crônica — cães e gatos (estadiamento e recomendações alinhados à IRIS 2023).
 */
export const doencaRenalCronicaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-drc-caes-gatos',
  slug: 'doenca-renal-cronica-caes-gatos',
  title: 'Doença renal crônica (DRC)',
  synonyms: [
    'DRC',
    'CKD',
    'Insuficiência renal crônica',
    'Nefropatia crônica',
    'Chronic kidney disease',
    'Insuficiência renal felina',
    'CKD felina',
  ],
  species: ['dog', 'cat'],
  category: 'nefrologia-urologia',
  tags: [
    'IRIS 2023',
    'SDMA',
    'UPC',
    'Proteinúria',
    'Hipertensão',
    'Dieta renal',
    'Fósforo',
    'Creatinina',
    'Azotemia',
    'PU/PD',
  ],
  quickSummary:
    'A doença renal crônica (DRC) é síndrome de perda irreversível e progressiva de massa nefronal funcional: com menos néfrons eficazes, o rim deixa de concentrar urina precocemente (poliúria/polidipsia), acumula solutos azotados quando a taxa de filtração cai, perturba equilíbrio ácido-base e mineral (hiperfosfatemia, desregulação do eixo PTH/FGF23), produz menos eritropoietina (anemia não regenerativa) e perde resiliência frente a insultos agudos (AKI sobreposta). Em pequenos animais, define-se clinicamente por alterações estruturais ou funcionais persistentes por pelo menos cerca de três meses — número operacional, não dogma absoluto. O estadiamento IRIS (creatinina e SDMA em sangue, proteinúria urinária e pressão arterial como substadiamentos) só deve aplicar-se com animal euvolêmico, estável e sem descompensação aguda mascarando números. O tratamento longitudinal combina nutrição renal, metas de fósforo, bloqueio do RAAS quando há proteinúria clinicamente relevante, controle pressórico (amlodipino muito utilizado em gatos), correção de hipocalemia felina, fluidoterapia subcutânea domiciliar quando indicada, antieméticos e mimetizantes de apetite, além de gestão honesta de qualidade de vida nos estádios avançados.',
  quickDecisionStrip: [
    'PU/PD crônica, perda de peso, azotemia persistente e incapacidade de concentrar urina: pense em DRC.',
    'Não estadiar pela IRIS um paciente desidratado, instável ou com suspeita forte de componente agudo.',
    'Em gatos: doença mais comum e muitas vezes mais lenta; atenção a hipocalemia, hipertensão e perda de massa muscular.',
    'Em cães: pese proteinúria glomerular e necessidade de renoproteção antiproteinúrica quando relevante.',
    'Dieta renal e controle do fósforo são pilares nas duas espécies; amlodipina costuma ser espinha dorsal anti-hipertensiva no gato.',
  ],
  quickSummaryRich: {
    lead:
      'DRC exige pensar em duas linhas do tempo: a lenta da fibrose tubulointersticial e a rápida das descompensações (desidratação, sepse, AINE, obstrução). O mesmo creatinina “3 mg/dL” em animal hipovolêmico não é o mesmo estádio que após fluido — estadiar mal leva a polifarmácia injustificada ou, inversamente, a subtratar proteinúria e pressão. Gato e cão compartilham esqueleto terapêutico, mas não troque hipocalemia felina por lógica exclusivamente canina.',
    leadHighlights: ['euvolêmico', 'IRIS', 'proteinúria', 'hipocalemia', 'AKI sobreposta'],
    pillars: [
      {
        title: 'Definição prática',
        body:
          'Doença renal estrutural ou funcional crônica com duração mínima de três meses; estadiar apenas quando o paciente estiver estável e euvolêmico e os marcadores não estiverem mudando rapidamente.',
        highlights: ['três meses', 'euvolêmico'],
      },
      {
        title: 'Gato vs cão',
        body:
          'Gatos: DRC muito frequente na geriatria, progressão muitas vezes lenta, tubulointersticial predominante, hipocalemia e desidratação crônica relevantes. Cães: menos frequentes que gatos em muitas séries; maior protagonismo relativo de proteinúria glomerular e hipertensão em subgrupos.',
        highlights: ['Geriatria', 'proteinúria'],
      },
      {
        title: 'Conduta base',
        body:
          'Integrar dieta renal, metas de fósforo, manejo de proteinúria e pressão arterial, sintomas urêmicos, eletrólitos e anemia; fluidoterapia subcutânea domiciliar é mais rotina no gato.',
        highlights: ['dieta renal', 'pressão arterial'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico (visão geral)',
      steps: [
        {
          label: '1. Reconhecer padrão crônico',
          detail:
            'PU/PD insidiosa, perda de peso/massa magra, USG persistentemente baixa no gato idoso, azotemia repetida em perfis de rotina — diferenciar de polidipsia psicogênica, diabetes e hipertireoidismo.',
        },
        {
          label: '2. Excluir AKI e pré-renal',
          detail:
            'Hidratação, ultrassom rápido se obstrução suspeita, revisão de AINE/corticoide/ACE-I em desidratação; só estadiar IRIS com paciente estável.',
        },
        {
          label: '3. Pacote mínimo estruturado',
          detail:
            'Creatinina, SDMA (se disponível), ureia, fosfato, hemograma, urinálise + sedimento, UPC em urina de rotina, TA sistólica; cultura se piúria real ou recidivas.',
        },
        {
          label: '4. Imagem quando muda conduta',
          detail:
            'Ultrassom para tamanho renal, cistos, pielonefrite, litíase; considerar PA plasmática em hipertensão documentada com proteinúria.',
        },
        {
          label: '5. Estadiamento IRIS 2023',
          detail:
            'Aplicar estádio por creatinina/SDMA; adicionar substadiamentos de pressão e proteinúria; registrar data e exames para comparar tendência, não snapshot único.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxo terapêutico (prioridades)',
      steps: [
        {
          label: '1. Educar e priorizar',
          detail:
            'Metas realistas por estádio; reconhecer sinais de uremia que exigem ajuste imediato versus monitoramento trimestral.',
        },
        {
          label: '2. Nutrição e fósforo',
          detail:
            'Dieta renal quando aceita; transição gradual; quelantes se hiperfosfatemia persiste; cuidado com hipocalcemia iatrogênica ao forçar dieta + quelante sem monitorização.',
        },
        {
          label: '3. Proteinúria e RAAS',
          detail:
            'IECA/ARB quando UPC acima do limiar de tratamento por guideline; verificar creatinina e K⁺ após início; não iniciar em desidratação.',
        },
        {
          label: '4. Pressão arterial',
          detail:
            'Medição séria; em gatos amlodipino frequentemente necessário; integrar com HAS e lesão ocular se presente.',
        },
        {
          label: '5. Suporte avançado',
          detail:
            'Antieméticos (maropitant, ondansetron), apetite (capromorelina, mirtazapina), potássio oral felino, eritropoiese estimulante se anemia sintomática, fluidos SC — sempre alinhado à tolerância cardíaca.',
        },
      ],
    },
  },
  etiology: {
    visaoGeralFenotipoFinal:
      'Na maioria dos casos de pequenos animais o exame histológico final converge para fibrose tubulointersticial com inflamação, independentemente do evento inicial — por isso o “fenótipo” costuma parecer semelhante mesmo quando a causa raiz foi glomerular, infeciosa ou tóxica. O gatilho original muitas vezes já não é identificável na biopsia tardia ou na necropsia.\n\n' +
      'Dica de estudo: associe mentalmente “DRC = perda de massa renal funcional ao longo do tempo”; não confunda o fenótipo histológico tardio com a etiologia que levou à lesão.',
    causasEmCaes:
      'Entre as causas mais citadas em cães: nefrite intersticial crônica de causa não determinada, pielonefrite crônica, glomerulonefrite crônica, amiloidose, nefropatias familiares ou hereditárias (por exemplo shunts portossistêmicos tratados tardiamente, displasias) e sequela de injúria renal aguda. Na prática, investigue sempre componente glomerular proteinúrico, histórico de infecção do trato urinário alto de repetição, linhagem e DRC pós-AKI em animais previamente estáveis.\n\n' +
      'Dica de estudo: em provas, “proteinúria importante em cão adulto” → pense glomérulo antes de rotular só “DRC intersticial idiopática”.',
    causasEmGatos:
      'Em gatos destacam-se nefrite intersticial crônica idiopática, pielonefrite crônica, glomerulonefrite crônica, amiloidose, doença renal policística em Persas, neoplasia (por exemplo linfoma renal), piogranulomatose associada à infecção pelo vírus da imunodeficiência felina e sequela de injúria renal aguda.\n\n' +
      'Dica de estudo: FIV não “causa” DRC diretamente como o vírus da imunodeficiência humana causa nefropatia, mas associa-se a nefrite intersticial imunomediada — saiba explicar essa nuance.',
  },
  epidemiology: {
    perfilFelino:
      'A DRC é um dos principais problemas da geriatria felina; muitos animais atravessam um continuum de fase não azotêmica (IRIS estádio 1 ou “pré‑azotêmico”) até estádio urêmico terminal. Revisões abertas citam prevalências da ordem de cerca de três em cada dez gatos com mais de doze anos — número útil para contextualizar custo assistencial e comunicação com o tutor.\n\n' +
      'Dica de estudo: alta prevalência não significa “tratar todos igual”: o estádio IRIS e a proteinúria/pressão definem prioridades.',
    perfilCanino:
      'Em cães a DRC também é relevante em idosos, mas tende a ser menos frequente que em gatos e mais heterogênea quanto à causa subjacente. Quando o quadro é clinicamente marcante, proteinúria sustentada, hipertensão sistêmica e doença glomerular relevante costumam puxar o prognóstico e ditar intensidade de monitorização.\n\n' +
      'Dica de estudo: compare mentalmente “gato idoso magro com USG baixo e K+ baixo” (fenótipo clássico) com “cão com UPC alto” (alerta glomerular).',
  },
  pathogenesisTransmission: {
    naoContagiosa:
      'A DRC não se transmite de animal para animal como uma infecção respiratória ou dermatológica clássica: reflete processos crônicos de dano renal, malformações, sequelas de episódios agudos ou exposições individuais (medicamentos, toxinas). Urinatórios de repetição podem contribuir para morbidade mas não “contagiam” a própria DRC.\n\n' +
      'Dica de estudo: se a banca perguntar transmissão, responda “não contagiosa” e cite apenas transmissão vertical ou iatrogenia em situações muito específicas (não o padrão da DRC idiopática).',
    duracaoMinima:
      'Critérios operacionais em medicina de pequenos animais usam persistência de alterações estruturais ou funcionais por pelo menos três meses para distinguir padrão crônico de flutuações agudas isoladas ou de descompensações sobrepostas.\n\n' +
      'Dica de estudo: o número “3 meses” é convenção clínica — na prova, explique que estabilização e repetição de exames importam mais que o calendário exato.',
  },
  pathophysiology: {
    perdaNefronsHiperfiltracao:
      'À medida que os néfrons são perdidos, os remanescentes hiperfiltram para preservar a taxa de filtração global aparente; a pressão intraglomerular aumenta e, com o tempo, isso favorece proteinúria e esclerose glomerular residual — um círculo vicioso que acelera o declínio. Daí a importância de bloqueio do RAAS quando há proteinúria clinicamente relevante.\n\n' +
      'Dica de estudo: ligue “hiperfiltração” → proteinúria progressiva → pior prognóstico; é o raciocínio que justifica IECA/ARB quando indicados.',
    perdaConcentracaoUrina:
      'Entre as primeiras funções a deteriorar está a capacidade de concentrar a urina: poliúria com urina diluída e polidipsia compensatória frequentemente antecedem azotemia marcada. Em gatos, massa urinária aumentada com densidade urinária abaixo de 1,035 (em amostra adequada) pode ser pista precoce, embora não seja patognomônica (diabetes, iatrogenia com diuréticos, etc.).\n\n' +
      'Dica de estudo: PU/PD sem hiperglicemia nem uso de diurético → DRC entra forte no raciocínio diferencial em felino idoso.',
    retencaoUremica:
      'A queda da taxa de filtração glomerular acumula ureia, creatinina e outros solutos urémicos — associando-se a náuseas, vômito, halitose, ulceração oral, apatia e mal-estar sistêmico nas fases mais avançadas.\n\n' +
      'Dica de estudo: uréia e creatinina são marcadores de filtração, não de “toxina única”; os sintomas urêmicos são multifatoriais (ácido-base, hormônios, inflamação).',
    fosforoMineralBone:
      'A hiperfosfatemia estimula alterações na regulação do eixo mineral (por exemplo PTH aumentado relativamente, FGF23) com impacto ósseo e vascular; o controle do fósforo dietético e medicamentoso é central para retardar progressão e complicações secundárias.\n\n' +
      'Dica de estudo: na oral, “fósforo alto + PTH/FGF23” liga-se a remodelação óssea e risco cardiovascular — não decore valores, entenda o mecanismo.',
    acidoseAnemiaHipertensao:
      'A acidose metabólica pode agravar-se em estádios tardios; a anemia costuma ser normocítica e não regenerativa (deficiência relativa de eritropoietina, uremia e inflamação). A hipertensão sistêmica é frequente e pode ser causa ou consequência — por isso a medição de pressão arterial faz parte do pacote inicial em DRC documentada.\n\n' +
      'Dica de estudo: monte uma tabela mental “estádio IRIS alto ↔ acidose / anemia / PA” para lembrar o pacote de complicações do exame.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'renal',
      findings: [
        'Poliúria e polidipsia quando a capacidade de concentração falha.',
        'Proteinúria persistente quando há sobrecarga glomerular ou lesão.',
      ],
    },
    {
      system: 'gastrointestinal',
      findings: [
        'Inapetência, náuseas, vómito e halitose urémica em fases mais avançadas.',
      ],
    },
    {
      system: 'musculoskeletal',
      findings: [
        'Perda de peso, fraqueza e atrofia muscular — mais evidente em gatos idosos magros.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Em gatos: hipocalemia e desidratação crônica contribuem para fraqueza cervical e qualidade de vida reduzida.',
        'Em cães com proteinúria importante: edema ou ascite são possíveis conforme síndrome nefrótica.',
      ],
    },
  ],
  diagnosis: {
    drcAlertaEstadiamentoIRIS:
      'O estadiamento IRIS 2023 aplica-se a doença renal crônica estável. Não estadiar quando a creatinina ou o SDMA oscilam rapidamente, quando ainda há suspeita forte de azotemia pré-renal ou pós-renal não resolvida, ou quando o paciente está desidratado ou em choque — primeiro estabilize e corrija volume.',
    drcFiguraIrisStaging: {
      kind: 'clinicalFigure',
      src: '/assets/consulta-vet/iris-staging-ckd.png',
      alt: 'Quadro IRIS — estadiamento da DRC em cães e gatos: estádios 1 a 4 (sem azotemia a azotemia grave), creatinina e SDMA por espécie, substadiamento por UPC e por pressão arterial sistólica',
      caption:
        'Referência visual IRIS — creatinina, SDMA (teste IDEXX SDMA), razão proteinúria/creatinina (UPC) e PA. Se creatinina e SDMA não coincidirem no estádio, considere massa muscular e repita ambos em 2–4 semanas; em discordância persistente, use o estádio mais elevado. Diretrizes: iris-kidney.com.',
    },
    drcCronicoVersusAgudo: {
      kind: 'clinicalTable',
      headers: ['Critério', 'Sugere mais cronicidade (pistas)', 'Notas'],
      rows: [
        [
          'História',
          'PU/PD ou azotemia referidas há mais de três meses; perda de peso progressiva.',
          'Existe sempre possibilidade de agudo sobre crônico.',
        ],
        [
          'Tamanho renal à imagem',
          'Rins pequenos e irregulares.',
          'Útil mas não obrigatório em todos os casos.',
        ],
        [
          'Anemia',
          'Anemia não regenerativa compatível com eritropoietina diminuída.',
          'Inespecífica — integrar ao quadro.',
        ],
      ],
    },
    drcPacoteInvestigacao:
      'A avaliação inicial bem estruturada inclui bioquímica sérica, hemograma, urinálise completa com sedimento, cultura de urina quando indicado, razão proteinúria/creatinina em urina, imagem renal e medição da pressão arterial sistólica.',
    drcTabelaComparativaEspecies: {
      kind: 'clinicalTable',
      headers: ['Tema', 'Cão — notas práticas', 'Gato — notas práticas'],
      rows: [
        [
          'Frequência / velocidade',
          'Menos comum que em gatos em muitas séries; heterogeneidade etiológica.',
          'Muito comum na geriatria; progressão muitas vezes lenta.',
        ],
        [
          'Lesão predominante citada',
          'Maior protagonismo relativo de proteinúria glomerular em subgrupos.',
          'Padrão tubulointersticial/fibrose frequentemente referido.',
        ],
        [
          'Hidratação / potássio',
          'Hipercalemia pode preocupar sobretudo no fim de doença ou contextos específicos.',
          'Hipocalemia e desidratação crônica são fenótipo clássico — suplementar potássio quando indicado.',
        ],
        [
          'Hipertensão',
          'Manejo escalonado; ACE inibidores e ARB com papel central em muitos protocolos; combinar com amlodipina quando necessário.',
          'Amlodipina costuma responder bem; telmisartan é opção IRIS; combinar se monoterapia insuficiente.',
        ],
        [
          'UPC — limiares proteinúria',
          'Não proteinúrico <0,2; borderline 0,2–0,5; proteinúrico >0,5.',
          'Não proteinúrico <0,2; borderline 0,2–0,4; proteinúrico >0,4.',
        ],
        [
          'Dieta renal / cálcio',
          'Controlar fósforo rigorosamente.',
          'Monitorizar cálcio ao iniciar dieta restrita em fósforo — hipercalcemia pode exigir ajuste.',
        ],
        [
          'Calcitriol',
          'Pode considerar-se em estádios avançados com fósforo controlado e vigilância laboratorial.',
          'IRIS 2023 não recomenda rotineiramente por falta de benefício convincente.',
        ],
      ],
    },
    drcPressaoSubstadiamento:
      'A IRIS 2023 integra risco de lesão de órgão alvo. Sem lesão documentada, confirme pressão sistólica entre 160 e 179 mmHg ou ≥180 mmHg em uma a duas semanas; com lesão de órgão alvo inicie tratamento sem esperar — integrar múltiplas medições de boa técnica.',
    drcEstadiamentoPassos: [
      {
        stepNumber: 1,
        title: 'Confirmar cronicidade e estabilidade',
        description:
          'Integrar história, exame, laboratório e imagem; excluir ou tratar componente agudo relevante e causas pré-renais/pós-renais antes de estagiar.',
      },
      {
        stepNumber: 2,
        title: 'Classificar por creatinina e SDMA',
        description:
          'Aplicar cortes de estádio e reclassificar quando houver discrepância persistente entre SDMA e creatinina conforme o quadro IRIS (pôster acima e iris-kidney.com).',
      },
      {
        stepNumber: 3,
        title: 'Subestadiar por proteinúria e pressão',
        description:
          'Obter UPC em urina adequada; medir pressão arterial e documentar presença ou ausência de lesão de órgão alvo.',
        isGoldStandard: true,
      },
    ],
    drcExamesLaboratoriaisContexto:
      'O hemograma pode mostrar anemia não regenerativa em fases tardias; a bioquímica revela azotemia, hiperfosfatemia e alterações de potássio, bicarbonato e cálcio conforme o caso. A urinálise com USG baixo é altamente sugestiva de incapacidade de concentração; cultura periódica ajuda a identificar infecções assintomáticas.',
  },
  treatment: {
    decisaoInicial:
      'Planeie terapia nutricional, metas laboratoriais e frequência de revisão por estádio IRIS (após confirmar estabilidade). Integre comorbidades cardíacas e risco de hipercalemia ao escolher fármacos e fluidos.',
    drcAlertaEstadiamentoInstavel:
      'Se o paciente ainda não estiver euvolêmico ou os marcadores renais estiverem mudando rapidamente, adie conclusões de estádio e decisões finais de terapia até repetir exames em condições comparáveis.',
    ordemDePrioridade: [
      '1) Estabilizar volume e corrigir fatores agudos reversíveis.',
      '2) Implementar dieta renal e metas de fósforo — monitorizar cálcio no gato ao mudar dieta.',
      '3) Tratar proteinúria clinicamente relevante e hipertensão conforme guidelines e tolerância.',
      '4) Manejar náuseas, inapetência, hipocalemia (especialmente gatos), acidose e anemia.',
      '5) Considerar fluidoterapia subcutânea domiciliar principalmente em gatos estádios avançados.',
      '6) Rever peso, ECC, pressão, UPC, creatinina/SDMA e urinálise em intervalos definidos pelo estádio.',
    ],
    drcDietaRenal:
      'Restrição de fósforo por dieta renal é um dos pilares mais bem apoiados para retardar progressão e controlar complicações mineral — especialmente a partir de azotemia estádio 2, com papel também selecionado antes disso em alguns pacientes.',
    drcFosforoQuelantes: {
      kind: 'clinicalTable',
      headers: ['Agente', 'Faixa útil citada', 'Observações'],
      rows: [
        ['Hidróxido de alumínio', '30–90 mg/kg/dia VO com refeições', 'Constipação; toxicidade por alumínio em doses elevadas prolongadas.'],
        ['Carbonato de cálcio', '30–90 mg/kg/dia VO com refeições', 'Vigiar hipercalcemia.'],
        ['Acetato de cálcio', '60–90 mg/kg/dia VO com refeições', 'Vigiar hipercalcemia.'],
        ['Carbonato de lantânio', '12,5–25 mg/kg/dia VO ou 400–800 mg/gato/dia VO com refeições', 'Fontes práticas citam estas faixas — individualizar.'],
        ['Sevelamer', '90–160 mg/kg/dia VO fracionado', 'Pode constipar.'],
      ],
    },
    drcMetasFosforoIRIS:
      'Metas práticas frequentemente citadas: estádio 2 manter fósforo abaixo de cerca de 4,6 mg/dL; estádio 3 idealmente abaixo de 5,0 mg/dL; estádio 4 meta mais realista abaixo de 6,0 mg/dL — sempre integrando apetite e tolerância.',
    drcProteinuriaRaas: [
      {
        drug: 'Benazepril',
        indication: 'Proteinúria na DRC — inibidor da ECA.',
        dose: '0,25–0,5 mg/kg VO a cada 12 ou 24 h (literatura interna); alguns textos iniciam 0,5 mg/kg VO q24h escalando até cerca de 2 mg/kg/dia conforme resposta e tolerância.',
        frequency: 'q12–24h',
        route: 'VO',
        cautions: 'Monitorizar creatinina, potássio e pressão após início; hipotensão e piora azotemia possíveis.',
      },
      {
        drug: 'Telmisartan',
        indication: 'Proteinúria / RAAS — antagonista do receptor de angiotensina.',
        dose: '1 mg/kg VO q24h em cães e gatos como ponto de partida; em cães alguns protocolos escalam até 3 mg/kg q24h em proteinúria persistente.',
        frequency: 'q24h',
        route: 'VO',
        notes: 'IRIS 2023 tende a preferir ARB como primeira linha antiproteinúrica em cães; em gatos ACE ou ARB permanecem opções — telmisartan ganhou espaço em proteinúria e hipertensão.',
      },
    ],
    drcHipertensao:
      'Gatos: amlodipina é frequentemente a primeira escolha prática — faixas IRIS 2023 citam cerca de 0,125–0,25 mg/kg VO q24h com possibilidade de aumentar até cerca de 0,25–0,5 mg/kg q24h; telmisartan cerca de 2 mg/kg q24h para hipertensão felina segundo referências citadas pela IRIS; combinar amlodipina com telmisartan se monoterapia insuficiente.\n\n' +
      'Cães: abordagem escalonada com IECA em dose adequada, depois aumento de dose, posterior associação com amlodipina e outras classes se necessário — resposta menos previsível que em muitos gatos.',
    drcSintomasUremicos: [
      {
        drug: 'Maropitant',
        indication: 'Náuseas e vómito.',
        dose: '1 mg/kg SC q24h ou 2 mg/kg VO q24h em cães e gatos.',
        frequency: 'q24h',
        route: 'SC ou VO',
      },
      {
        drug: 'Ondansetrona',
        indication: 'Antiemético adjuvante.',
        dose: '0,5–1 mg/kg VO q12–24h ou conforme protocolo injetável.',
        frequency: 'q12–24h',
        route: 'VO / injetável',
      },
      {
        drug: 'Mirtazapina',
        indication: 'Estímulo de apetite — especialmente gatos.',
        dose:
          'Gatos: frequentemente 1,88 mg/gato a cada 48–72 h (BSAVA/IRIS citam esquemas semelhantes). Cães: por exemplo 1,1–1,3 mg/kg VO q24h segundo manuais práticos.',
        frequency: 'variável',
        route: 'VO',
      },
      {
        drug: 'Capromorelina',
        indication: 'Apetite — gatos com DRC e contexto de perda de peso (registro específico conforme jurisdição).',
        dose: 'Gatos com DRC: exemplos citam cerca de 2 mg/kg VO q24h cerca de 30 min antes da refeição; cães esquemas à volta de 3 mg/kg q24h em estímulo de apetite.',
        frequency: 'q24h',
        route: 'VO',
      },
    ],
    drcHipocalemiaAcidose:
      'Gatos: quando hipocalemia clinicamente relevante, fontes IRIS 2023 citam suplementação no intervalo de cerca de 1–2 mmol/kg/dia de potássio (gluconato ou citrato). Acidose metabólica: corrigir em gatos quando bicarbonato ou CO₂ total corrigidos <16 mmol/L; em cães quando <18 mmol/L após estabilização — bicarbonato de sódio oral ou citrato de potássio quando há hipocalemia concomitante; rever em cerca de 10–14 dias.',
    drcAnemia: [
      {
        drug: 'Darbepoetina',
        indication: 'Anemia da doença renal quando indicado clinicamente.',
        dose:
          'Exemplos: cerca de 1 µg/kg SC q7d em cães e gatos com titulação; outras fontes iniciam 0,25–0,5 µg/kg SC semanal e espaçam quando hematócrito meta.',
        frequency: 'intervalos semanais inicialmente',
        route: 'SC',
        cautions: 'Hipertensão, convulsões, eventos tromboembólicos e aplasia pura de série vermelha são riscos referidos — monitorizar pressão e série vermelha.',
      },
    ],
    drcSuplementacaoFerro:
      'Com primeira dose de eritropoiese estimulante costuma recomendar-se ferro parentérico — por exemplo dextrano de ferro 50 mg IM uma vez em gatos e cerca de 10 mg/kg IM uma vez em cães segundo manuais práticos — confirmar produto disponível e protocolo local.',
    drcFluidoterapiaSc:
      'Gatos toleram frequentemente fluidoterapia SC domiciliar — volumes por aplicação frequentemente entre cerca de 10 e 20 mL/kg, de algumas vezes por semana até diário conforme resposta; alguns textos citam intervalos maiores em ml/kg em regime menos frequente. Cães podem beneficiar especialmente quando pequenos, mas o perfil é menos “rotina doméstica” universal.',
    drcNutricaoAssistida:
      'Sonda esofágica ou PEG pode alterar desfecho quando inapetência persistente, desidratação recorrente ou impossibilidade prática de medicar — decisão centrada na qualidade de vida.',
    drcCalcitriol:
      'Em cães pode considerar-se calcitriol em estádios 3–4 com fósforo rigorosamente controlado e monitorização de cálcio ionizado e PTH; doses citadas na ordem de 1,5–3,5 ng/kg. Em gatos a IRIS 2023 deixou de recomendar rotineiramente.',
    drcUtiOculta:
      'Urinálise e cultura periódicas — por exemplo a cada três a quatro meses — ajudam a detectar infecção assintomática, especialmente em gatos.',
    monitoramento: [
      'Estádios 1–2 estáveis — muitas vezes revisão a cada quatro a seis meses.',
      'Estádios 3–4 — tipicamente a cada três a quatro meses ou mais cedo se instável.',
      'Série: peso, ECC, creatinina, SDMA, fósforo, cálcio, potássio, bicarbonato, UPC, pressão arterial, urinálise e cultura.',
    ],
    prognosticoResumo:
      'Gatos — dados August publicados citam medianas de sobrevida em torno de 1151 dias no estádio 2, 679 dias no estádio 3 e cerca de 35 dias no estádio 4; proteinúria persistente, hipertensão, hiperfosfatemia e anemia pioram prognóstico.\n\n' +
      'Cães — prognóstico mais heterogêneo porque a etiologia importa; proteinúria marcada, hipertensão, anemia grave e incapacidade de manter hidratação empioram o curso. Muitos estáveis com suporte prolongam vida com boa qualidade.',
    drcTabelaPrognosticoFelino: {
      kind: 'clinicalTable',
      headers: ['Estádio IRIS (exemplo publicado)', 'Mediana de sobrevida referida'],
      rows: [
        ['2', 'cerca de 1151 dias'],
        ['3', 'cerca de 679 dias'],
        ['4', 'cerca de 35 dias'],
      ],
    },
    notaFelinos:
      'Reforce monitorização de potássio, hidratação e aceitação da dieta; hipercalcemia ao mudar nutrição renal é armadilha descrita em gatos — acompanhar cálcio total e ionizado.',
    notaCaninos:
      'Quando UPC elevada persistir, priorize estratégia antiproteinúrica renoprotectora e metas realistas de redução — em glomerulopatias o alvo pode ser redução substancial da proteinúria mesmo quando difícil normalizar totalmente UPC.',
  },
  prevention:
    'Rastreio laboratorial e de pressão em animais idosos com fatores de risco; controle de comorbidades sistêmicas; evitar nefrotóxicos desnecessários; nutrição e hidratação adequadas; diálogo precoce quando surgem PU/PD ou perda de peso.',
  relatedConsensusSlugs: [],
  relatedMedicationSlugs: ['pregabalina', 'maropitant', 'benazepril'],
  references: [
    {
      id: 'ref-iris-2023',
      citationText:
        'IRIS Kidney. IRIS Staging of CKD (2023) e IRIS Treatment Recommendations for Dogs and Cats with CKD — guidelines online.',
      sourceType: 'Diretriz internacional',
      url: 'http://iris-kidney.com/guidelines/index.html',
      notes: 'Estadiamento, SDMA, UPC, pressão arterial e recomendações terapêuticas.',
      evidenceLevel: 'A — guideline',
    },
    {
      id: 'ref-bsava-nefro-2017',
      citationText:
        'Elliott J, Grauer GF, Westropp JL (eds). BSAVA Manual of Canine and Feline Nephrology and Urology, 3rd ed., 2017.',
      sourceType: 'Manual especializado',
      url: null,
      notes: 'Capítulos de estadiamento IRIS e manejo da DRC.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-nelson-couto-ira-ckd',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th ed., 2020. Cap. 41 — Acute Kidney Injury and Chronic Kidney Disease.',
      sourceType: 'Livro-texto',
      url: null,
      notes: 'Fisiopatologia, causas, terapias.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-augusts-feline-ckd',
      citationText:
        'Little SE (ed.). August’s Consultations in Feline Internal Medicine, Vol. 7, 2016 — capítulos de DRC felina e fosfato.',
      sourceType: 'Referência felina',
      url: null,
      notes: 'Atualização de DRC e metabolismo do fosfato.',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-plumb-10',
      citationText: 'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook, 10th ed., 2023.',
      sourceType: 'Formulário',
      url: null,
      notes: 'Doses e monitorização farmacológica.',
      evidenceLevel: 'A — referência prática',
    },
  ],
  isPublished: true,
  source: 'seed',
};
