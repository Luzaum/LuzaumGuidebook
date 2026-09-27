import type { DiseaseRecord } from '../../types/disease';

/**
 * Fístula Perianal / Furunculose Anal Canina — Guia Clínico Editorial de Padrão Ouro.
 * Embasamento: Bruet et al. 2025 (Consenso Internacional de Manejo Médico) > Mathews et al. 1997 >
 * Ettinger's Textbook of Vet Internal Med 9ª ed. 2024 > Nelson & Couto 6ª ed. 2020 >
 * BSAVA Manual of Canine and Feline Gastroenterology 3ª ed. > Plumb's 10ª ed.
 */
export const fistulaPerianalFurunculoseAnalRecord: DiseaseRecord = {
  id: 'disease-fistula-perianal',
  slug: 'fistula-perianal-furunculose-anal',
  title: 'Fístula perianal / furunculose anal',
  subtitle: 'Doença inflamatória e imunomediada crônica do períneo: fisiopatologia mediada por células T, predisposição no Pastor Alemão, protocolos de ciclosporina e tacrolimo, e prevenção de estenose e incontinência fecal',
  synonyms: [
    'Furunculose anal canina',
    'Fístulas perianais',
    'Anal furunculosis',
    'Perianal fistula',
    'Furunculose perianal canina'
  ],
  species: ['dog'],
  category: 'imunologia',
  categories: ['imunologia', 'gastroenterologia', 'dermatologia', 'cirurgia', 'clinica-medica'],
  tags: [
    'Perineo',
    'Imunomediada',
    'Pastor alemao',
    'Disquesia',
    'Ciclosporina',
    'Tacrolimo',
    'Cetoconazol',
    'Estenose anal',
    'Incontinencia fecal',
    'Bruet 2025'
  ],
  isPublished: true,
  source: 'seed',

  quickSummary:
    'A fístula perianal (furunculose anal) é uma doença inflamatória crônica, progressiva, ulcerativa e intensamente dolorosa que acomete a pele perianal, os tecidos subcutâneos pararretais e os sacos anais de cães, com marcante predisposição na raça Pastor Alemão (>80-84% dos casos). Longe de ser um mero abscesso de saco anal ou uma infecção bacteriana simples, trata-se fundamentalmente de uma afecção imunomediada mediada por linfócitos T auxiliares (Th1), análoga à Doença de Crohn perianal em seres humanos. A inflamação transmural destrói a arquitetura tecidual normal, gerando múltiplos tratos sinusais fistulosos drenantes, exsudato mucopurulento fétido, tenesmo, disquesia severa e risco de estenose cicatricial ou incontinência fecal. O diagnóstico é essencialmente clínico mediante inspeção perineal minuciosa e toque retal cuidadoso (frequentemente sob sedação em razão da dor excruciante). A abordagem cirúrgica agressiva histórica foi definitivamente superada e abandonada como primeira linha devido a altas taxas de incontinência; o tratamento padrão-ouro contemporâneo ancora-se na imunossupressão médica com ciclosporina microemulsionada oral associada ou não ao cetoconazol (protocolo poupador), tacrolimo tópico a 0,1%, dieta com proteína hidrolisada e analgesia multimodal.',

  quickDecisionStrip: [
    'Pastor Alemão adulto com dor perianal intensa, lambedura constante, odor fétido e tratos fistulosos = suspeição clínica máxima de furunculose anal.',
    'Não confunda furunculose anal com simples saculite ou abscesso de saco anal: a furunculose é uma doença imunomediada sistêmica de pele e submucosa, e antibióticos isolados NUNCA promovem cura.',
    'O exame físico retal exige compaixão e sedação: a dor perianal pode ser intolerável; realize tricotomia higiênica suave, limpeza com clorexidina diluída e toque retal sob sedação para palpar sacos anais e descartar estenose ou neoplasia retal.',
    'A imunossupressão médica com Ciclosporina oral (5 mg/kg VO q12-24h) é a espinha dorsal de primeira linha indiscutível do tratamento.',
    'O protocolo poupador Ciclosporina + Cetoconazol reduz os custos do tratamento em até 60-70% em cães de grande porte por inibição do citocromo CYP3A4 hepático.',
    'Tacrolimo tópico a 0,1% em pomada é excelente para lesões leves a moderadas, adjuvante à ciclosporina oral e padrão-ouro para manutenção pós-remissão.',
    'Instituir dieta de eliminação com proteína hidrolisada ou nova proteína: até 30% a 50% dos cães com furunculose perianal possuem hipersensibilidade alimentar ou colite inflamatória concomitante.',
    'Cirurgia (saculectomia ou fistulectomia) JAMAIS deve ser realizada como primeira opção: reserva-se estritamente para tratos sinusais residuais focais após meses de imunomodulação ou estenose anal mecânica cicatricial severa.',
    'Amolecedores fecais (lactulose ou psyllium) associados a analgésicos neuropáticos (gabapentina e tramadol) são imperativos para cessar o ciclo de retenção fecal e dor à evacuação.',
    'A remissão completa pode levar de 8 a 16 semanas: a interrupção prematura da imunomodulação resulta em recidiva em mais de 50% dos cães; o desmame deve ser lento e gradual.'
  ],

  quickSummaryRich: {
    lead:
      'A furunculose anal é uma condição excruciante que impacta profundamente o bem-estar do cão e o vínculo com a família. O paradigma atual abandonou intervenções cirúrgicas mutilantes e estabeleceu o controle clínico por imunomodulação medicamentosa combinada, suporte dietético e manejo tópico.',
    leadHighlights: [
      'Doença imunomediada análoga à Doença de Crohn humana',
      'Predisposição avassaladora em cães Pastor Alemão (>80%)',
      'Ciclosporina oral como padrão-ouro clínico',
      'Associação com cetoconazol para viabilidade econômica',
      'Tacrolimo 0,1% tópico para manutenção e remissão',
      'Cirurgia restrita a sequelas fibróticas e falhas médicas'
    ],
    pillars: [
      {
        title: 'Pilar 1: Etiopatogenia Imunomediada e Genética',
        body: 'A doença é primariamente imunomediada, impulsionada por desregulação de linfócitos T que infiltram a derme perianal e as glândulas apócrinas pararretais, liberando citocinas pró-inflamatórias (IL-1, TNF-alfa, IFN-gama). Ocorre forte associação genética no Pastor Alemão com o alelo DLA-DRB1*00101 do complexo principal de histocompatibilidade (MHC classe II). A infecção bacteriana secundária é mera consequência da quebra de barreira.',
        highlights: ['Imunidade celular mediada por células T', 'Alelo DLA-DRB1 no Pastor Alemão', 'Inflamação transmural ulcerativa']
      },
      {
        title: 'Pilar 2: Diagnóstico Clínico e Diferenciação Cuidadosa',
        body: 'O diagnóstico repousa na caracterização visual das úlceras e trajetos fistulosos circunvizinhos ao ânus, complementado pelo toque retal sob sedação para diferenciar a furunculose de neoplasias (adenocarcinoma de saco anal, carcinoma de células escamosas) e abscessos simples de saco anal. Biópsias são indicadas apenas em lesões nodulares assimétricas ou raças não usuais.',
        highlights: ['Inspeção e palpação sob sedação', 'Exclusão de neoplasias anais', 'Diferenciação de saculite simples']
      },
      {
        title: 'Pilar 3: Terapia Médica Multimodal e Dieta Hidrolisada',
        body: 'A indução da remissão exige doses imunossupressoras de ciclosporina microemulsionada, associada ou não ao cetoconazol para otimização de custo, combinada ao tacrolimo tópico 0,1%. O componente gastrointestinal é tratado com dieta hipoalergênica ou hidrolisada estrita, lactulose para amolecimento fecal e gabapentina para alívio da dor neuropática e visceral contínua.',
        highlights: ['Ciclosporina com ou sem cetoconazol', 'Tacrolimo tópico 0,1%', 'Dieta de eliminação hidrolisada']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico da Furunculose Perianal Canina',
      steps: [
        {
          label: 'Passo 1: Reconhecimento dos Sinais e Predisposição Racial',
          detail: 'Cão (predominantemente Pastor Alemão adulto entre 4 e 7 anos) apresentando lambedura perianal obsessiva, dor excruciante ao sentar ou defecar (disquesia), tenesmo, cauda mantida abaixada e colada ao períneo, secreção mucopurulenta serossanguinolenta fétida e constipação secundária ao medo de evacuar.'
        },
        {
          label: 'Passo 2: Preparação, Tricotomia e Sedação Analgésica',
          detail: 'Em razão da dor intensa, o exame minucioso deve ser realizado sob sedação profunda e analgesia (ex.: dexmedetomidina + opioide ou propofol). Realizar tricotomia ampla de toda a região perianal, base da cauda e períneo ventral, seguida de higienização delicada com gaze embebida em solução salina morna e clorexidina diluída a 0,5% para remoção de crostas e fezes desidratadas.'
        },
        {
          label: 'Passo 3: Mapeamento dos Tratos Fistulosos e Toque Retal',
          detail: 'Inspecionar a circunferência anal nos 360 graus: mensurar profundidade, número e extensão dos orifícios fistulosos. Realizar toque retal digital delicado com luva lubrificada para avaliar espessamento da parede retal, estenose do canal anal, envolvimento intrínseco dos sacos anais e descartar massas tumorais intraluminais ou extraluminais.'
        },
        {
          label: 'Passo 4: Diagnóstico Diferencial de Lesões Atípicas',
          detail: 'Diferenciar metidicamente de ruptura primária de saco anal (geralmente unilateral às 4 ou 8 horas), adenoma/adenocarcinoma de glândulas perianais ou apócrinas de saco anal, carcinoma espinocelular e corpo estranho penetrante. Se houver lesão proliferativa assimétrica ou paciente jovem/raça atípica: coletar biópsia em cunha para exame histopatológico.'
        },
        {
          label: 'Passo 5: Avaliação Gastrointestinal Concomitante',
          detail: 'Investigar histórico de fezes pastosas crônicas, muco, tenesmo pregresso ou prurido cutâneo difuso para diagnosticar doença inflamatória intestinal (IBD) ou alergia alimentar associada.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Protocolo de Imunomodulação (Bruet et al. 2025)',
      steps: [
        {
          label: 'Fase 1: Controle Álgico, Higiene e Dieta Imediata',
          detail: 'Iniciar analgesia imediata com Gabapentina (10 a 15 mg/kg VO q8-12h) e/ou Tramadol (3 a 5 mg/kg VO q8h). Introduzir amolecedor fecal (Lactulose 0,5 mL/kg VO q12h) para fezes pastosas sem esforço. Transição mandatória para Dieta de Eliminação Hidrolisada exclusiva. Higienização perianal diária com toalhas hipoalergênicas ou clorexidina 0,5% sem esfregar.'
        },
        {
          label: 'Fase 2: Imunossupressão Sistêmica com Ciclosporina',
          detail: 'Opção A: Ciclosporina microemulsionada em monoterapia (5 mg/kg VO a cada 12 horas ou a cada 24 horas em jejum). Opção B (Protocolo Poupador com Cetoconazol para cães de grande porte): Ciclosporina 2,5 a 3,0 mg/kg VO a cada 12 ou 24 horas combinada a Cetoconazol 2,5 a 5,0 mg/kg VO a cada 12 ou 24 horas administrados juntos com alimento para absorção do antifúngico. Monitorar ALT/FA séricas a cada 3 a 4 semanas.'
        },
        {
          label: 'Fase 3: Terapia Tópica Adjuvante com Tacrolimo',
          detail: 'Aplicar pomada de Tacrolimo a 0,1% diretamente nos tratos fistulosos e pele perianal ulcerada a cada 12 ou 24 horas (usar luvas descartáveis obrigatoriamente). O tacrolimo acelera a cicatrização dos tratos e permite desmame mais precoce da medicação sistêmica.'
        },
        {
          label: 'Fase 4: Avaliação da Resposta Clínica e Titulação',
          detail: 'Reavaliação clínica a cada 4 semanas: documentar fechamento de tratos, redução do eritema e cessação da dor à evacuação. A taxa de melhora clínica inicial ocorre em 4 a 6 semanas, mas a remissão tecidual completa exige de 8 a 16 semanas contínuas de tratamento.'
        },
        {
          label: 'Fase 5: Desmame Gradual e Terapia de Manutenção Contínua',
          detail: 'Após fechamento completo de todas as fístulas e reepitelização total: NÃO suspender abruptamente. Reduzir a ciclosporina para dias alternados por 4 semanas, depois 2 vezes por semana, enquanto se mantém o tacrolimo tópico 2 a 3 vezes por semana a longo prazo para evitar recidivas frequentes.'
        }
      ]
    }
  },

  etiology: {
    naturezaImunomediada:
      'A furunculose perianal canina é uma doença inflamatória crônica ulcerativa imunomediada caracterizada por destruição progressiva da arquitetura tecidual dermo-epidérmica e anexial perianal. Estudos imunopatológicos e de expressão gênica comprovam que a lesão primária decorre de uma resposta imune mediada por células T desregulada com hiper-reatividade de linfócitos T auxiliares do tipo 1 (Th1) e 17 (Th17), que secretam interferon-gama (IFN-gama), fator de necrose tumoral alfa (TNF-alfa), interleucina-1 (IL-1) e fator de crescimento transformador beta (TGF-beta), induzindo ulceração transmural seguida de fibrose profunda desorganizada.',
    baseGenetica:
      'A raça Pastor Alemão responde por aproximadamente 80% a 85% de todos os casos clínicos diagnosticados em âmbito mundial. Pesquisas genéticas demonstraram forte associação estatística entre o desenvolvimento da afecção e a presença do alelo DLA-DRB1*00101 do complexo principal de histocompatibilidade canino (DLA classe II). Esse polimorfismo genético gera falha no reconhecimento antigênico e na tolerância imunológica periférica a autoantígenos cutâneos ou à microbiota comensal da região perianal.',
    fatoresAnatomicosEConformacionais:
      'Fatores conformacionais da raça exercem papel facilitador e agravante: cauda com inserção ampla e caída (sloping tail base), que permanece colada à região perineal cobrindo constantemente o ânus; grande densidade de glândulas apócrinas e sebáceas na pele perianal; pouca aeração local, retenção de umidade, acúmulo de esmegma e fezes pastosas, favorecendo maceração bacteriana secundária e perpetuação do estímulo inflamatório.',
    infeccaoSecundaria:
      'A microbiota bacteriana isolada das lesões (Escherichia coli, Staphylococcus pseudintermedius, Enterococcus faecalis, anaeróbios estritos) representa colonização oportunista secundária à quebra da barreira epitelial. A antibioticoterapia isolada reduz momentaneamente o odor e a secreção purulenta, mas JAMAIS cura a doença na ausência de imunomodulação.'
  },

  epidemiology: {
    predisposicaoRacialEIdade:
      'Afeta predominantemente cães adultos a idosos de raças de médio a grande porte, com idade média ao diagnóstico de 4 a 7 anos. Acomete machos e fêmeas em proporção semelhante (alguns estudos apontam leve predomínio em machos não castrados). A raça Pastor Alemão é maciçamente a mais acometida (>80% dos pacientes). Outras raças com predisposição documentada incluem Setter Irlandês, Labrador Retriever, Golden Retriever, Border Collie, Pastor Belga e cães mestiços derivados de Pastor Alemão.',
    ausenciaEmFelinos:
      'A furunculose perianal canina clássica não ocorre na espécie felina. Lesões ulcerativas e fistulosas perianais em gatos decorrem invariavelmente de abscessos de saco anal rompidos, traumas com corpos estranhos, carcinoma de células escamosas, linfoma ou proctite associada a retroviroses.'
  },

  pathogenesisTransmission: {
    cascataImunopatologica:
      'Em indivíduos geneticamente predispostos, a interação entre fatores conformacionais e antígenos bacterianos da microbiota local desencadeia a apresentação de autoantígenos por células dendríticas perianais. Há recrutamento maciço de linfócitos T CD4+ e CD8+, macrófagos ativados e plasmócitos para a derme perianal e parede dos sacos anais. A liberação contínua de proteases, citocinas inflamatórias e espécies reativas de oxigênio destrói as criptas e folículos glandulares apócrinos perianais, gerando microabscessos estéreis que coalescem em tratos sinusais fistulosos transmurais.',
    evolucaoParaFibroseEEstenose:
      'A produção sustentada de TGF-beta por macrófagos e fibroblastos induz deposição desordenada de colágeno denso e tecido cicatricial. Com o tempo, as fístulas circundam o orifício anal nos 360 graus, infiltrando os feixes do músculo esfíncter anal externo e a fáscia pararretal. A contração cicatricial dessa fibrose resulta em estenose anal estenosante anular grave e destruição irreversível das fibras musculares esfincterianas.',
    naoContagiosa:
      'A doença é estritamente autoimune e multifatorial individual; não possui caráter contagioso ou transmissível entre animais contactantes ou humanos.'
  },

  pathophysiology: {
    dorExcrucianteEDisquesia:
      'A região perineal e o canal anal possuem uma das inervações somáticas e nociceptivas mais densas do organismo canino (ramos do nervo pudendo e plexo pélvico). A presença de úlceras profundas expondo terminações nervosas livres e a inflamação dos esfíncteres musculares transformam o ato de defecar em uma experiência de sofrimento agudo extremo (disquesia excruciante). O animal retém voluntariamente as fezes por medo da dor, gerando coprostase, fezes ressecadas volumosas que, ao serem forçadas pelo reto, reabrem os tratos fistulosos em sangramento ativo (hematochezia).',
    destruicaoDosSacosAnais:
      'Os ductos e parênquimas dos sacos anais (sinus paranalis) são frequentemente invadidos pelo infiltrado inflamatório linfocítico-plasmocitário, tornando-se indistinguíveis das fístulas circundantes. Ocorre saculite destrutiva crônica com impactação e drenagem contínua de material purulento fétido.',
    comprometimentoSistemico:
      'A dor ininterrupta, a perda proteica crônica pelos tratos ulcerados exsudativos e a inflamação de baixo grau sustentam um estado catabólico que culmina em letargia profunda, alterações de temperamento (agressividade por dor ao toque caudal), inapetência e caquexia progressiva.'
  },

  clinicalSignsPathophysiology: {
    sinaisPerianaisELocais: [
      'Úlceras cutâneas perianais de bordas irregulares, tratos fistulosos únicos ou múltiplos cavitários drenando secreção mucopurulenta, hemorrágica e fétida ao redor do ânus.',
      'Lambedura obsessiva, mordedura e automutilação da região perianal, base da cauda e face posterior das coxas decorrentes de prurido inflamatório e dor contínua.',
      'Posição antálgica da cauda: cão mantém a cauda firmemente abaixada e colada contra o ânus, recusando-se a levantá-la e exibindo agressividade defensiva quando a região é examinada.',
      'Disquesia severa (vocalização, gemidos e esforço doloroso agudo durante a defecação) e tenesmo fecal persistente.',
      'Hematochezia (sangue vermelho vivo recobrindo as fezes ou pingando dos orifícios perianais após a defecação).',
      'Constipação secundária e retenção voluntária de fezes por relutância em evacuar, podendo evoluir para fecaloma.',
      'Incontinência fecal parcial ou completa em casos avançados com destruição do esfíncter anal externo.'
    ],
    sinaisComportamentaisESistemicos: [
      'Agressividade defensiva, isolamento e recusa em sentar-se sobre o chão ou sentar-se apoiando apenas em uma das nádegas (postura de alívio perineal).',
      'Letargia, perda de massa muscular, emaciação e pelo eriçado decorrentes do estresse álgico crônico e anorexia secundária.'
    ]
  },

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Inspeção Perianal Minuciosa sob Sedação Profunda',
      purpose: 'Visualização direta de todos os quadrantes perianais e mapeamento das lesões.',
      description:
        'Após sedação adequada e analgesia, realizar tricotomia perineal ampla e higienização estéril com solução salina. Mapear a circunferência anal anotando posição em relógio (ex.: tratos às 3h, 7h e 9h), profundidade com sonda metálica romba estéril e grau de acometimento dérmico.',
      interpretation: 'Presença de tratos sinusais drenantes com úlceras transmurais em Pastor Alemão consolida a suspeita clínica imediata.',
      limitations: 'O exame realizado em cão acordado sem sedação é incompleto, subestima a gravidade e constitui imperícia ética pela dor extrema provocada.',
      isGoldStandard: true
    },
    {
      stepNumber: 2,
      title: 'Toque Retal Digital e Palpação de Sacos Anais',
      purpose: 'Avaliação da integridade do canal anal, estenose cicatricial e exclusão de massas.',
      description:
        'Introdução suave de dedo enluvado abundantemente lubrificado no canal retal. Avaliar tônus esfincteriano, diâmetro do lúmen retal (pesquisa de estenose anular fibrosa), espessamento submucoso e palpação bidigital dos sacos anais.',
      interpretation: 'Permite identificar estenose luminal que possa exigir dilatação ou intervenção reconstrutiva e descarta carcinomas.',
      limitations: 'Exige luva fina e lubrificação abundante para não lacerar a mucosa friável.'
    },
    {
      stepNumber: 3,
      title: 'Exame Histopatológico por Biópsia em Cunha (Casos Selecionados)',
      purpose: 'Diferenciação inequívoca de neoplasias perianais em apresentações atípicas.',
      description:
        'Coleta de biópsia em cunha da borda de úlceras ou nódulos proliferativos.',
      interpretation: 'Revela infiltrado inflamatório transmural crônico linfocítico-plasmocitário com destruição folicular e fibrose. Descarta adenocarcinoma de saco anal, carcinoma espinocelular e adenoma de glândula hepatóide.',
      limitations: 'Não é obrigatória em casos típicos clássicos de Pastor Alemão com lesões multifocais características.'
    },
    {
      stepNumber: 4,
      title: 'Citologia e Cultura Bacteriana com Antibiograma',
      purpose: 'Identificação de patógenos bacterianos secundários resistentes.',
      description:
        'Swab profundo ou aspirado do leito de tratos fistulosos purulentos.',
      interpretation: 'Orienta antibioticoterapia direcionada apenas quando há celulite perianal difusa ou secreção abundante.',
      limitations: 'A bactéria isolada nunca é a causa primária da doença; antibióticos sem imunossupressão não curam.'
    }
  ],

  treatment: {
    imunossupressaoSistemica: [
      {
        drug: 'Ciclosporina Microemulsionada (Atopica / Neoral)',
        indication: 'Terapia imunossupressora sistêmica de primeira escolha absoluta para furunculose anal.',
        dose: 'Monoterapia: 5,0 mg/kg VO a cada 12 horas ou a cada 24 horas administrada com estômago vazio (1 hora antes ou 2 horas após a alimentação).',
        duration: 'Indução por 8 a 16 semanas até cicatrização completa de todos os tratos; seguida de desmame gradual.',
        mechanism: 'Inibe seletivamente a calcineurina celular, bloqueando a transcrição de interleucina-2 (IL-2) e a proliferação clonal de linfócitos T auxiliares.',
        cautions: 'Efeitos adversos iniciais frequentes: vômitos, hiporexia e fezes pastosas em 20-30% dos cães nas primeiras 2 semanas (podem ser minimizados iniciando com dose escalonada ou congelando temporariamente as cápsulas). Hiperplasia gengival e hipertricose podem ocorrer no uso prolongado.',
        reassess: 'Avaliação clínica a cada 4 semanas; monitorar função renal e pressão arterial se uso >3 meses.'
      },
      {
        drug: 'Protocolo Poupador: Ciclosporina + Cetoconazol (Bruet et al. 2025)',
        indication: 'Estratégia de eleição para cães de grande porte (>25-35 kg) para reduzir o custo financeiro do tratamento em até 65-70%.',
        dose: 'Ciclosporina: 2,5 a 3,0 mg/kg VO a cada 12 ou 24 horas + Cetoconazol: 2,5 a 5,0 mg/kg VO a cada 12 ou 24 horas administrados juntos com uma refeição.',
        mechanism: 'O cetoconazol inibe potentemente as enzimas do citocromo hepático CYP3A4 e a glicoproteína-P intestinal, retardando o metabolismo da ciclosporina e multiplicando suas concentrações plasmáticas com doses muito menores.',
        cautions: 'MANDATÓRIO monitorar alanina aminotransferase (ALT) e fosfatase alcalina (FA) basais e a cada 3 a 4 semanas pelo risco de hepatotoxicidade induzida pelo cetoconazol.'
      }
    ],
    terapiaTopicaEImunomodulacaoLocal: [
      {
        drug: 'Tacrolimo Pomada a 0,1% (Protopic ou Manipulado)',
        indication: 'Excelente adjuvante à ciclosporina sistêmica, monoterapia para lesões iniciais superficiais e PADRÃO-OURO para manutenção de longo prazo.',
        dose: 'Aplicar uma fina camada diretamente sobre as úlceras e tratos perianais a cada 12 a 24 horas com luva descartável após limpeza suave da região.',
        mechanism: 'Macrolídeo inibidor da calcineurina com potência imunossupressora tópica de 10 a 100 vezes superior à ciclosporina, agindo diretamente nos linfócitos da derme.',
        cautions: 'O tutor DEVE utilizar luvas de látex ou nitrílicas para a aplicação para evitar absorção dérmica humana.'
      }
    ],
    manejoGastrointestinalEAnalgesia: [
      {
        drug: 'Dieta de Eliminação com Proteína Hidrolisada',
        indication: 'Manejo dietético indispensável para todos os pacientes.',
        notes: 'Estudos demonstram que até 30% a 50% dos cães com fístula perianal apresentam doença inflamatória intestinal ou alergia alimentar concomitante. A dieta hidrolisada estrita normaliza o trânsito colônico e reduz antígenos fecais irritantes.'
      },
      {
        drug: 'Lactulose',
        dose: '0,5 mL/kg VO a cada 12 horas, titulada para produzir fezes pastosas e moldadas sem diarreia líquida.',
        indication: 'Prevenção da disquesia e do trauma mecânico de fezes volumosas sobre os tecidos perianais ulcerados.'
      },
      {
        drug: 'Gabapentina',
        dose: '10 a 15 mg/kg VO a cada 8 a 12 horas.',
        indication: 'Controle da dor neuropática crônica perianal e alívio do espasmo pudendo.'
      }
    ],
    papelDaCirurgia:
      'A cirurgia radical de ressecção perianal em bloco (amputação perianal) é considerada OBSOLETA na medicina veterinária contemporânea devido à inaceitável taxa de incontinência fecal permanente (30% a 50%) e estenose cicatricial estenosante. O papel atual da cirurgia restringe-se exclusivamente a: 1) Saculectomia anal bilateral quando há persistência de infecção isolada crônica de saco anal após remissão das fístulas cutâneas; 2) Fistulectomia ou cauterização de trajeto sinusal solitário residual refratário a >4 meses de imunossupressão médica completa; 3) Anoplastia reconstrutiva em cães com estenose anal mecânica cicatricial severa que impede a passagem de fezes.'
  },

  complications: {
    sequelasLocaisEFuncionais: [
      'Estenose Cicatricial Anular do Canal Anal: complicação grave resultante da cicatrização por fibrose densa e desorganizada induzida pelo excesso de TGF-beta. O orifício anal estreita-se a ponto de não admitir a passagem da ponta do dedo indicador, impedindo a passagem de fezes e provocando obstipação intratável e megacólon secundário.',
      'Incontinência Fecal Permanente: destruição inflamatória transmural ou dano cirúrgico iatrogênico aos ramos do nervo retal caudal (do nervo pudendo) e ao músculo esfíncter anal externo, fazendo com que o cão perca o controle voluntário da defecação e elimine fezes involuntariamente durante o sono ou caminhadas.',
      'Recidiva Clínica Agressiva pós-Desmame Precoce: suspensão súbita da imunomodulação antes de 8 a 12 semanas ou abandono do manejo de manutenção resulta em reabertura das fístulas em mais de 50% dos pacientes nos primeiros 6 a 12 meses.',
      'Celulite Perianal Séptica e Abscessos Pararretais Profundos: infecção secundária invasiva por bactérias anaeróbias e coliformes atingindo o espaço isquiorretal e retroperitoneal.',
      'Dor Crônica Neuropática Centralizada: hipersensibilização dos cornos dorsais da medula espinhal por dor inflamatória contínua não tratada, manifestando-se por alodinia perineal permanente mesmo após a cicatrização visual das lesões.'
    ],
    prognostico:
      'Com os protocolos modernos de imunomodulação médica com ciclosporina e tacrolimo associados à dieta de eliminação, o prognóstico clínico é bom a excelente para cicatrização e remissão inicial em 80% a 90% dos casos. Todavia, os tutores devem ser alertados desde o primeiro dia de que a furunculose perianal é uma doença crônica reincidente que não possui "cura definitiva garantida": taxas de recidiva a longo prazo variam de 30% a 50%, exigindo acompanhamento permanente e ciclos intermitentes de terapia tópica ou sistêmica de manutenção.'
  },

  prevention: {
    planoDeManutencaoELongoPrazo:
      'A profilaxia primária não é possível em razão da base genética DLA-DRB1 na raça Pastor Alemão. A prevenção foca estritamente em evitar recidivas e sequelas estenosantes: manter o cão permanentemente com alimento hidrolisado ou hipoalergênico com nova proteína; realizar higienização perineal semanal com toalhas hipoalergênicas ou soluções suaves de clorexidina a 0,5% secando delicadamente; realizar tosa higiênica periódica da base da cauda para maximizar a aeração perineal; e manter aplicação tópica profilática de pomada de Tacrolimo 0,1% 2 a 3 vezes por semana nos pontos onde existiam os tratos cicatrizados.',
    errosComuns: [
      'Prescrever antibioticoterapia oral isolada (ex.: cefalexina, enrofloxacina) acreditando que a fístula perianal é um simples abscesso bacteriano de saco anal.',
      'Indicar cirurgia de ressecção perianal em bloco antes de instituir pelo menos 8 a 12 semanas de imunomodulação médica com ciclosporina.',
      'Realizar toque retal e inspeção perianal com o animal acordado e sem analgesia, submetendo o paciente a dor extrema desnecessária e subestadiando o quadro.',
      'Suspender abruptamente a ciclosporina assim que as fístulas superficiais fecham, sem realizar o desmame gradual recomendado de várias semanas.',
      'Prescrever cetoconazol no protocolo poupador sem dosar transaminases hepáticas prévias e periódicas.'
    ],
    redFlags: [
      'Estenose anular palpável impedindo a introdução do dedo no canal anal e tenesmo improdutivo (estenose anal estenosante cirúrgica).',
      'Incontinência fecal contínua com perda involuntária de fezes em repouso (lesão severa do esfíncter anal externo ou inervação pudenda).',
      'Icterícia e vômitos refratários em cão utilizando protocolo de cetoconazol + ciclosporina (hepatite tóxica aguda induzida por azóis).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'dermatite-atopica-canina',
    'prostatite-caes-gatos'
  ],
  relatedMedicationSlugs: [
    'ciclosporina',
    'tacrolimo',
    'cetoconazol',
    'prednisolona',
    'gabapentina',
    'lactulose',
    'tramadol'
  ],
  references: [
    {
      id: 'ref-bruet-2025',
      title: "Literature review and authors' consensus recommendations for the medical management of perianal fistulae in dogs",
      citationText: 'Bruet V, et al. Literature review and authors\' consensus recommendations for the medical management of perianal fistulae in dogs. Vet Dermatol. 2025;36(1):15-32.',
      authors: 'Bruet V, et al.',
      year: 2025,
      journal: 'Veterinary Dermatology',
      volume: '36',
      pages: '15-32',
      sourceType: 'Consenso Internacional de Manejo Médico',
      url: 'https://doi.org/10.1111/vde.13354',
      doi: '10.1111/vde.13354',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-mathews-1997',
      title: 'Randomized controlled trial of cyclosporine for treatment of perianal fistulas in dogs',
      citationText: 'Mathews KA, et al. Randomized controlled trial of cyclosporine for treatment of perianal fistulas in dogs. J Am Vet Med Assoc. 1997;211(10):1249-1253.',
      authors: 'Mathews KA, et al.',
      year: 1997,
      journal: 'Journal of the American Veterinary Medical Association',
      volume: '211',
      pages: '1249-1253',
      sourceType: 'Ensaio Clínico Randomizado Controlado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-ettinger-perianal-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Diseases of the Anus and Perianal Area",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1645-1652.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-nelson-couto-perianal-2020',
      title: 'Small Animal Internal Medicine: Disorders of the Anus and Perianal Region',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:560-565.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-bsava-ge-perianal-2020',
      title: 'BSAVA Manual of Canine and Feline Gastroenterology: Perianal Fistula and Anorectal Diseases',
      citationText: 'Hall EJ, Williams DA, Kathrani A. BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. Gloucester: BSAVA; 2020:312-320.',
      authors: 'Hall EJ, Williams DA, Kathrani A.',
      year: 2020,
      journal: 'BSAVA Manual of Canine and Feline Gastroenterology',
      sourceType: 'Manual Especializado',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-plumb-cyclosporine-2023',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Cyclosporine, Tacrolimus, Ketoconazole",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:312-316 (Cyclosporine), 980-982 (Tacrolimus).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-house-dla-2003',
      title: 'Susceptibility to anal furunculosis in German Shepherd Dogs is associated with the major histocompatibility complex class II DLA-DRB1',
      citationText: 'House AK, et al. Susceptibility to anal furunculosis in German Shepherd Dogs is associated with the major histocompatibility complex class II DLA-DRB1. Tissue Antigens. 2003;62(5):386-391.',
      authors: 'House AK, et al.',
      year: 2003,
      journal: 'Tissue Antigens',
      volume: '62',
      pages: '386-391',
      sourceType: 'Estudo Genético',
      doi: '10.1034/j.1399-0039.2003.00115.x',
      evidenceLevel: 'B'
    }
  ]
};
