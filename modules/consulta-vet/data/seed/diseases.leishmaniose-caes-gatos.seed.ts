import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const leishmanioseCaesGatosSeed: DiseaseRecord = {
  id: 'disease-leishmaniose-caes-gatos',
  slug: 'leishmaniose-caes-gatos',
  title: 'Leishmaniose em Cães e Gatos',
  subtitle: 'Revisão clínica avançada e contemporânea baseada nos consensos CLWG 2026, WAVD 2025, Manual MS 2026 e diretrizes felinas ABCD 2026',
  synonyms: [
    'leishmaniose',
    'calazar',
    'leishmaniose visceral canina',
    'leishmaniose felina',
    'leishmaniose por Leishmania infantum',
    'canine leishmaniosis',
    'feline leishmaniosis',
    'LCan'
  ],
  species: ['dog', 'cat'],
  category: 'infectologia',
  categories: ['infectologia', 'dermatologia', 'nefrologia', 'clinica-medica'],
  tags: [
    'leishmaniose',
    'leishmania-infantum',
    'clwg-2026',
    'wavd-2025',
    'flebotomineo',
    'lutzomyia-longipalpis',
    'miltefosina',
    'milteforan',
    'alopurinol',
    'xantinuria',
    'glomerulonefrite',
    'leishmaniose-felina',
    'abcd-2026',
    'zoonose'
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['leishmaniose-caes-gatos'],

  quickSummary: 'A leishmaniose em cães e gatos é uma zoonose parasitária crônica e multissistêmica causada pelo protozoário intracelular Leishmania infantum (sin. Leishmania chagasi nas Américas), transmitida pela picada de flebotomíneos hematófagos (Lutzomyia longipalpis no Brasil):\n\n' +
    '- Imunopatogenia central: decorre do desequilíbrio imune no qual falha a resposta protetora celular (Th1 com IFN-gama e TNF-alfa), predominando a resposta humoral lesiva (Th2), com hipergamaglobulinemia policlonal severa e deposição massiva de imunocomplexos vasculares.\n' +
    '- Espectro clínico clássico: glomerulonefrite membranoproliferativa com proteinúria precoce (principal determinante de morbimortalidade), dermatite esfoliativa seca não pruriginosa, alopecia periocular em óculos, onicogrifose desproporcional, vasculite com epistaxe, poliartrite e uveíte granulomatosa.\n' +
    '- Paradigma CLWG 2026: infecção não é sinônimo de doença ativa. Os pacientes são categorizados em Classes A, B, C e D, sendo vedado o tratamento leishmanicida em animais assintomáticos baseando-se apenas em soropositividade isolada.\n' +
    '- Manejo terapêutico no Brasil (MAPA): miltefosina canina (Milteforan) é o leishmanicida registrado, associada ao leishmaniostático alopurinol com monitoramento estrito de xantinúria e função renal.\n' +
    '- Particularidades em felinos (ABCD 2026): associada frequentemente a imunossupressão (FIV/FeLV), com manifestação nodular ou ocular e VETO ABSOLUTO ao uso de permetrina por toxicidade fatal.',

  quickDecisionStrip: [
    'Mudança conceitual do CLWG 2026: infecção não é igual a doença ativa; nunca tratar apenas com base em sorologia positiva isolada sem evidência de doença atribuível.',
    'Classificação CLWG 2026: Classe A (soropositivo não infectado, não tratar); Classe B (infectado subclínico, não tratar); Classe C (doente, tratar); Classe D (gravemente doente com lesão orgânica, tratar e suporte intensivo).',
    'O rim é o órgão prognosticamente mais crítico: a deposição de imunocomplexos causa glomerulonefrite com proteinúria glomerular antes da elevação da creatinina; quantificar o UPC é obrigatório.',
    'Biomarcadores renais precoces: estudo recente (Peris-Grau et al. 2026) valida uNGAL e uGGT urinários como preditores precoces de dano tubular na leishmaniose canina.',
    'Diagnóstico confirmatório padrão ouro: demonstração citológica direta de amastigotas intracelulares em macrófagos de linfonodos, medula óssea ou lesões cutâneas.',
    'Divergência terapêutica WAVD 2025 x CLWG 2026: CLWG prioriza Antimoniato + Alopurinol como primeira escolha e coloca Miltefosina como alternativa; WAVD 2025 considera ambos equivalentes.',
    'Legislação brasileira estrita: Portaria Interministerial proíbe o uso de medicamentos humanos (antimoniato humano e anfotericina B) em cães; a Miltefosina veterinária registrada (Milteforan) é a droga leishmanicida oficial no Brasil.',
    'Manejo do Alopurinol: fármaco leishmaniostático indispensável (10 mg/kg BID), porém causador de xantinúria e urólitos radiotransparentes de xantina; exige sedimento urinário e ultrassom seriados e transição para dieta hipopurínica.',
    'Corticoides na leishmaniose: contraindicados para uso empírico cego por risco de reativação parasitária, mas indicados em dose anti-inflamatória em emergências imunomediadas fulminantes (uveíte grave, GN membranoproliferativa aguda) sempre sob cobertura leishmanicida.',
    'Leishmaniose felina (ABCD 2026): apresentação atípica dominada por nódulos cutâneos/úlceras e uveíte granulomatosa com hifema; exige rastreio mandatório de FIV e FeLV.',
    'ALERTA MÁXIMO TOXICOLÓGICO EM GATOS: Permetrina e piretroides concentrados são FATAIS para felinos; prevenção em gatos deve usar apenas compostos autorizados como coleira de flumetrina.',
    'Nenhum tratamento leishmanicida garante esterilização parasitológica total: o paciente atinge cura clínica e redução drástica da carga parasitária, mas necessita de monitorização clínica, laboratorial e sorológica semestral vitalícia.'
  ],

  quickSummaryRich: {
    lead: 'A leishmaniose é uma afecção parasitária crônica e zoonótica causada por Leishmania infantum, cuja gravidade clínica decorre dos seguintes eixos fisiopatológicos e diretrizes normativas:\n\n' +
      '- Imunopatologia: resposta exacerbada mediada por hipergamaglobulinemia policlonal e deposição vascular de imunocomplexos circulantes.\n' +
      '- Classificação CLWG 2026: estratificação rigorosa separando exposição e infecção subclínica de doença ativa tratável.\n' +
      '- Vigilância e terapia: monitoramento renal precoce e protocolos estritos regulamentados pela legislação nacional.',
    leadHighlights: [
      'Leishmania infantum',
      'CLWG 2026: Classes A, B, C e D',
      'Infecção não é igual a doença ativa',
      'Deposição de imunocomplexos e dano renal precoce',
      'Miltefosina e Alopurinol com controle de xantinúria',
      'Particularidades felinas (ABCD 2026) e veto absoluto à permetrina'
    ],
    pillars: [
      {
        title: 'Pilar 1: Mudança Conceitual CLWG 2026 — Infecção versus Doença Ativa',
        body: 'O consenso CLWG 2026 estabelece uma ruptura com o dogma antigo de tratar qualquer animal soropositivo:\n\n' +
          '- Animais não elegíveis a leishmanicidas: cães expostos com títulos baixos/moderados (Classe A) e clinicamente saudáveis com DNA parasitário (Classe B) não recebem fármacos leishmanicidas.\n' +
          '- Animais elegíveis a tratamento: a terapia anti-Leishmania é reservada com exclusividade para pacientes com doença ativa clinicamente atribuível (Classes C e D).',
        highlights: ['Classe A e B não tratam', 'Classe C e D tratam', 'Evitar toxicidade e resistência farmacológica']
      },
      {
        title: 'Pilar 2: Imunopatogenia e o Rim como Órgão Sentinela',
        body: 'A polarização da resposta imunológica define o prognóstico e a evolução do paciente:\n\n' +
          '- Perfil Th1 (protetor): imunidade celular eficaz mediada por IFN-gama e óxido nítrico, promovendo contenção parasitária em macrófagos.\n' +
          '- Perfil Th2 (lesivo): ativação humoral exacerbada com hipergamaglobulinemia massiva e deposição de imunocomplexos circulantes.\n' +
          '- Lesão glomerular: glomerulonefrite membranoproliferativa induz proteinúria mensurada pelo UPC, sendo o principal determinante prognóstico.',
        highlights: ['Resposta Th1 protetora vs Th2 lesiva', 'Glomerulonefrite por imunocomplexos', 'UPC e biomarcadores uNGAL/uGGT']
      },
      {
        title: 'Pilar 3: Diagnóstico Integrado e Padrão Ouro Citológico',
        body: 'Nenhum ensaio diagnóstico deve ser interpretado de forma isolada na rotina médica:\n\n' +
          '- Padrão ouro confirmatório: citologia direta de aspirado de linfonodo, medula óssea ou lesão cutânea demonstrando amastigotas intracelulares.\n' +
          '- Diagnóstico complementar: sorologia quantitativa pareada e qPCR em tecidos-alvo (linfonodo ou medula óssea).\n' +
          '- Conduta crítica: sorologia positiva em sangue periférico é insuficiente como critério isolado para início de terapia leishmanicida.',
        highlights: ['Citologia direta: padrão ouro', 'qPCR tecidual', 'Sorologia quantitativa']
      },
      {
        title: 'Pilar 4: Terapêutica Racional, Legislação e Manejo da Xantinúria',
        body: 'O manejo farmacológico no Brasil segue estritas diretrizes regulatórias e monitoramento clínico:\n\n' +
          '- Leishmanicida regulamentado (MAPA): miltefosina canina (Milteforan 2 mg/kg q24h VO por 28 dias consecutivos).\n' +
          '- Leishmaniostático associado: alopurinol (10 mg/kg BID VO continuado) para contenção de carga parasitária.\n' +
          '- Manejo da xantinúria: a inibição da xantina oxidase predispõe a urólitos radiotransparentes de xantina, exigindo ultrassom seriado e dieta hipopurínica.',
        highlights: ['Miltefosina registrada no MAPA', 'Alopurinol e urolitíase por xantina', 'Monitoramento clínico e ultrassonográfico']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial na Suspeita de Leishmaniose',
      steps: [
        {
          label: 'Etapa 1: Reconhecimento do Fenótipo Clínico e Triagem Básica',
          timing: 'Primeira consulta',
          detail: 'Triagem clínica e laboratorial inicial de suspeita:\n' +
            '- Sinais clínicos: dermatite esfoliativa, alopecia periocular, onicogrifose, linfadenomegalia, emagrecimento e uveíte.\n' +
            '- Exames de triagem: hemograma, perfil bioquímico (ureia, creatinina, albumina, globulinas, razão A:G) e urinálise completa com UPC.'
        },
        {
          label: 'Etapa 2: Demonstração Parasitológica Direta (Padrão Ouro)',
          timing: 'Imediato (1 a 2 horas)',
          detail: 'Punção aspirativa por agulha fina (PAAF) de linfonodos aumentados (poplíteos ou pré-escapulares), medula óssea ou imprint de úlceras de pele. Coloração rápida (Panótico ou Giemsa) e exame em 1000x buscando amastigotas intracelulares em macrófagos.'
        },
        {
          label: 'Etapa 3: Sorologia Quantitativa e Diagnóstico Molecular',
          timing: '24 a 72 horas',
          detail: 'Realização de RIFI ou ELISA quantitativo para determinação de títulos de anticorpos. Em casos soropositivos sem visualização citológica direta, realizar qPCR em aspirado de medula óssea ou linfonodo para confirmação de infecção ativa.'
        },
        {
          label: 'Etapa 4: Classificação Clínica CLWG 2026 e Avaliação Orgânica',
          timing: 'Após resultados laboratoriais',
          detail: 'Estratificação consensual e rastreio de lesão orgânica:\n' +
            '- Classificação CLWG 2026: enquadramento nas Classes A, B, C ou D.\n' +
            '- Se Classe C ou D: estadiamento renal IRIS (creatinina, SDMA e UPC), aferição de pressão arterial sistólica e pesquisa de hemoparasitoses (Ehrlichia, Anaplasma, Babesia).'
        },
        {
          label: 'Etapa 5: Investigação Especial em Felinos',
          timing: 'Em pacientes da espécie felina',
          detail: 'Rastreio sorológico obrigatório para retrovírus (FIV e FeLV). Exame oftalmológico completo para detecção de uveíte anterior e hifema. Confirmação parasitológica por citologia de lesões nodulares ou PCR tecidual.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Manejo Longitudinal Escalonado',
      steps: [
        {
          label: 'Fase 1: Terapia Leishmanicida Indutora',
          timing: 'Dias 1 a 28',
          detail: 'Terapia indutora leishmanicida protocolada:\n' +
            '- Miltefosina (Milteforan): 2 mg/kg VO a cada 24 horas por 28 dias consecutivos, sempre fornecida com alimento gorduroso para minimizar náuseas.\n' +
            '- Protocolo internacional alternativo: Antimoniato de meglumina (100 mg/kg/dia SC dividido BID por 28 a 30 dias), onde legalmente autorizado.'
        },
        {
          label: 'Fase 2: Terapia Leishmaniostática Contínua',
          timing: 'Dias 1 a 180-365+',
          detail: 'Alopurinol na dose de 10 mg/kg por via oral a cada 12 horas. Manter por um período mínimo de 6 a 12 meses, associando dieta de teor reduzido de purinas para prevenir urolitíase por xantina.'
        },
        {
          label: 'Fase 3: Manejo da Doença Renal e de Complicações Imunomediadas',
          timing: 'Simultâneo desde o diagnóstico',
          detail: 'Controle de glomerulonefrite e alterações imunomediadas:\n' +
            '- Manejo de proteinúria: bloqueio do SRAA com telmisartana ou inibidores da ECA (benazepril/enalapril) e controle de hipertensão sistêmica.\n' +
            '- Lesões oculares: corticoterapia tópica oftálmica e suporte anti-inflamatório cuidadoso sob cobertura leishmanicida rigorosa.'
        },
        {
          label: 'Fase 4: Prevenção Vetorial Contínua Obrigatória',
          timing: 'Permanente',
          detail: 'Profilaxia vetorial e bloqueio epidemiológico ininterrupto:\n' +
            '- Cães: coleiras à base de deltametrina (4%) ou formulações repelentes registradas para impedir picadas e transmissão ao mosquito-palha.\n' +
            '- Gatos: utilizar exclusivamente coleiras com flumetrina autorizadas para a espécie, com VETO ABSOLUTO à permetrina devido a toxicidade fatal.'
        },
        {
          label: 'Fase 5: Monitoramento Laboratorial e Detecção de Recidivas',
          timing: 'A cada 3 a 6 meses',
          detail: 'Vigilância clínica e laboratorial periódica:\n' +
            '- Painel de controle: hemograma, perfil renal, UPC urinário, sedimento urinário (cristais de xantina) e sorologia quantitativa seriada.\n' +
            '- Critérios de alerta: elevação de títulos sorológicos em duas diluições ou piora da proteinúria indicam reativação parasitária e reavaliação terapêutica.'
        }
      ]
    }
  },

  etiology: {
    taxonomiaEBiologiaDoParasita: 'A leishmaniose em pequenos animais é causada por protozoários digenéticos e hemoflagelados pertencentes à ordem Trypanosomatida, família Trypanosomatidae e gênero Leishmania:\n\n' +
      '- Agente etiológico principal: Leishmania infantum (historicamente denominada Leishmania chagasi no continente americano), de ampla distribuição no Brasil, Américas, sul da Europa, norte da África e Ásia.\n' +
      '- Forma promastigota (no vetor): flagelada e alongada (15 a 20 um), altamente móvel, presente no trato digestivo dos insetos flebotomíneos.\n' +
      '- Forma amastigota (no hospedeiro vertebrado): esférica a ovoide (2 a 4 um), sem flagelo livre visível, contendo núcleo e cinetoplasto característicos, multiplicando-se obrigatoriamente no interior de macrófagos e células do sistema fagocítico mononuclear (Nelson & Couto, 6a ed., Cap. 98; Ettinger, 9a ed.).',

    mudancaDeConceitoCLWG2026InfeccaoVsDoenca: 'As diretrizes do Canine Leishmaniosis Working Group (CLWG 2026; Roura et al., Parasites & Vectors, 2026) estabelecem uma reformulação paradigmática na abordagem da leishmaniose canina:\n\n' +
      '- Infecção versus doença ativa: a infecção por Leishmania não é sinônimo de doença clínica ativa. Em regiões endêmicas, grande parcela dos cães alberga DNA ou anticorpos sem lesões ou manifestações clínicas.\n' +
      '- Superação do dogma antigo: o achado isolado de soropositividade não justifica terapia imediata sem evidência de doença ativa atribuível.\n' +
      '- Riscos do sobretratamento: o emprego indiscriminado de leishmanicidas e alopurinol em animais assintomáticos induz nefrotoxicidade, xantinúria, resistência farmacológica e mascara causas primárias subjacentes.',

    tabelaClassificacaoCLWG2026: {
      kind: 'clinicalTable',
      title: 'Classificação Clínica e Tomada de Decisão Terapêutica — CLWG 2026',
      headers: ['Classe Clínica', 'Definição Laboratorial e Parasitológica', 'Quadro Clínico', 'Conduta com Anti-Leishmania', 'Plano de Manejo'],
      rows: [
        [
          'Classe A (Soropositivo não infectado)',
          'Anticorpos anti-Leishmania detectáveis em sorologia; ausência de detecção direta do parasita (citologia negativa e qPCR negativo).',
          'Completamente saudável ou com sinais decorrentes de outra etiologia não relacionada à Leishmania.',
          'NÃO TRATAR com leishmanicidas nem com alopurinol.',
          'Investigar outros diagnósticos diferenciais; manter coleira repelente; reavaliar clínica e sorologia quantitativa em 3 a 6 meses.'
        ],
        [
          'Classe B (Infectado subclínico)',
          'Parasita ou DNA detectável (qPCR positivo em medula/linfonodo ou citologia positiva com carga parasitária muito baixa); sorologia variável.',
          'Clinicamente hígido; hemograma, perfil bioquímico, relação A:G e urinálise com UPC rigorosamente normais.',
          'NÃO TRATAR com leishmanicidas nem com alopurinol.',
          'Manter coleira repelente estrita; monitorar exame clínico, hemograma, proteinúria (UPC) e sorologia a cada 3 a 6 meses.'
        ],
        [
          'Classe C (Doente)',
          'Infecção confirmada (citologia com amastigotas ou qPCR positivo com sorologia quantitativa de média a alta titulação).',
          'Sinais clínicos e laboratoriais atribuíveis à leishmaniose (dermatopatia, linfadenomegalia, perda de peso, hiperglobulinemia, hipoalbuminemia, anemia leve).',
          'SIM, TRATAR IMEDIATAMENTE com protocolo leishmanicida e leishmaniostático.',
          'Instituir Miltefosina (28 dias) associada a Alopurinol (mínimo 6-12 meses); monitorar perfil renal, hepático e xantinúria urinária.'
        ],
        [
          'Classe D (Gravemente doente)',
          'Infecção ativa documentada associada a lesão grave em órgãos-alvo.',
          'Dano orgânico severo: DRC estágios 3-4 IRIS, síndrome nefrótica com proteinúria maciça (UPC > 2,0), uveíte fulminante, vasculite grave ou caquexia.',
          'SIM, TRATAR com protocolo leishmanicida ajustado associado a suporte intensivo.',
          'Internação em UTI, manejo de DRC com controle pressórico e inibição do SRAA, nutrição clínica enteral e suporte especializado.'
        ]
      ]
    },

    tabelaComparativaLeishVetVsCLWG: {
      kind: 'clinicalTable',
      title: 'Comparativo Conceitual: Estadiamento Histórico LeishVet (I-IV) vs Classes CLWG 2026',
      headers: ['Estágio LeishVet', 'Descrição LeishVet', 'Classe Equivalente CLWG 2026', 'Diferença Prática na Decisão Clínica'],
      rows: [
        [
          'Estágio I (Doença Leve)',
          'Sorologia com títulos baixos, sinais leves (linfadenomegalia isolada ou dermatite papular) e perfil renal normal (UPC < 0,2 e creatinina normal).',
          'Classe B (se apenas infecção detectada sem lesão ativa) ou Classe C inicial.',
          'O CLWG exige confirmação de que os sinais são verdadeiramente atribuíveis à Leishmania antes de iniciar medicação, evitando tratar reações papulares vacinais ou exposições banais.'
        ],
        [
          'Estágio II (Doença Moderada)',
          'Sorologia de títulos médios a altos, sinais dermatológicos típicos, onicogrifose, epistaxe, hipergamaglobulinemia, UPC entre 0,2 e 0,5.',
          'Classe C (Doente).',
          'Consenso uniforme em indicar terapia combinada (leishmanicida + alopurinol). Ambas as classificações orientam início precoce para evitar progressão renal.'
        ],
        [
          'Estágio III (Doença Grave)',
          'Sinais do estágio II acrescidos de lesões glomerulares evidentes por deposição de imunocomplexos (DRC estágio I ou II IRIS com UPC > 0,5).',
          'Classe C avançada ou Classe D.',
          'Foco terapêutico passa a incluir simultaneamente a inibição da replicação do protozoário e o bloqueio da progressão da nefropatia túbulo-intersticial e glomerular.'
        ],
        [
          'Estágio IV (Doença Muito Grave)',
          'DRC estágio III ou IV IRIS, ou síndrome nefrótica (hipoalbuminemia severa com edema/ascite e proteinúria maciça), ou trombose associada.',
          'Classe D (Gravemente doente).',
          'Prognóstico altamente reservado; risco elevado de uremia intratável e falência orgânica múltipla; demanda suporte de terapia intensiva.'
        ]
      ]
    },

    respostaImunocelularVsHumoralTh1Th2: 'A imunopatologia da leishmaniose é determinada pela dicotomia entre os perfis de resposta imunológica celular e humoral no hospedeiro:\n\n' +
      '- Perfil Th1 (imunidade protetora): secreção de citocinas pró-inflamatórias (IL-2, TNF-alfa e IFN-gama). O IFN-gama induz a óxido nítrico sintase (iNOS) macrofágica, produzindo óxido nítrico que destrói as formas amastigotas vacuolares.\n' +
      '- Perfil Th2 (suscetibilidade e lesão): secreção de citocinas imunorreguladoras (IL-4, IL-10 e TGF-beta), as quais bloqueiam o burst oxidativo dos macrófagos e promovem anergia celular.\n' +
      '- Repercussão clínica: a polarização Th2 culmina em ativação policlonal descontrolada de linfócitos B e síntese maciça de imunoglobulinas não protetoras.',

    fisiopatologiaDaHiperglobulinemiaPoliclonal: 'A ativação policlonal desregulada de plasmócitos acarreta alterações séricas profundas e geração de imunocomplexos:\n\n' +
      '- Hipergamaglobulinemia e inversão A:G: síntese descontrolada de IgG com hiperproteinemia acentuada e inversão marcante da relação albumina:globulina (A:G frequentemente < 0,6, atingindo < 0,3).\n' +
      '- Eletroforese de proteínas séricas (SPE): elevação em base ampla na fração gama e beta-gama, atestando proliferação policlonal multiclonada.\n' +
      '- Formação de imunocomplexos circulantes (CICs): anticorpos não neutralizantes e autoanticorpos ligam-se a antígenos solúveis de Leishmania, gerando complexos patogênicos que se depositam nos tecidos vasculares.'
  },

  epidemiology: {
    distribuicaoGeograficaEEpidemiologiaUrbana: 'A leishmaniose visceral canina é uma zoonose de notificação compulsória no Brasil, cosmopolita e de alta prevalência na América Latina, Mediterrâneo e Ásia:\n\n' +
      '- Urbanização acelerada: historicamente rural, a doença expandiu-se nas últimas décadas para regiões periurbanas e grandes capitais, impulsionada por degradação ambiental e habitação desordenada.\n' +
      '- Adaptação vetorial sinantrópica: o vetor principal Lutzomyia longipalpis (mosquito-palha, birigui ou tatuquira) adaptou-se com grande êxito ao acúmulo de matéria orgânica no peridomicílio.\n' +
      '- Espécies vetoriais secundárias: em regiões específicas como o Centro-Oeste e ecótonos do Pantanal, Lutzomyia cruzi também atua como vetor competente comprovado.',

    viasDeTransmissaoVetorialENaoVetorial: 'A transmissão epidemiológica primária é vetorial, mas vias secundárias apresentam impacto clínico e sanitário relevante:\n\n' +
      '- Transmissão vetorial (primária): picada de fêmeas hematófagas infectadas de flebotomíneos durante o repasto sanguíneo.\n' +
      '- Transmissão venérea: eliminação de amastigotas viáveis no sêmen de machos infectados durante a cópula.\n' +
      '- Transmissão transplacentária vertical: passagem congênita da fêmea prenhe infectada para a ninhada.\n' +
      '- Transmissão transfusional iatrogênica: infusão de sangue colhido de doadores assintomáticos portadores subclínicos de L. infantum.\n' +
      '- Transmissão por contato direto: contaminação de soluções de continuidade por mordedura ou exsudatos hemáticos entre animais com lesões abertas.',

    dadosEpidemiologicosManualMinisterioSaude2026: 'O Manual de Vigilância e Controle da Leishmaniose Visceral do Ministério da Saúde (2a ed., 2026) define o papel do cão como reservatório primordial urbano:\n\n' +
      '- Carga parasitária cutânea: cães infectados (mesmo assintomáticos) abrigam alta densidade de amastigotas na derme superficial, sendo fonte contínua de infecção para os vetores.\n' +
      '- Interface de saúde única: o convívio íntimo no peridomicílio e intradomicílio torna a vigilância canina sentinela imprescindível para o controle da doença humana.',

    reservatorioCaninoEInterfaceComSaudePublica: 'A coexistência de alta densidade vetorial e cães reservatórios amplia criticamente o risco para a saúde coletiva:\n\n' +
      '- Letalidade em humanos: o calazar humano não tratado apresenta taxa de letalidade superior a 90% por falência orgânica e sepse.\n' +
      '- Ações sanitárias prioritárias: saneamento e manejo de matéria orgânica peridomiciliar, uso sistemático de coleiras impregnadas com inseticidas/repelentes e triagem diagnóstica regular de animais conforme diretrizes oficiais.'
  },

  pathogenesisTransmission: {
    cascata: [
      '1. Inoculação dérmica: a fêmea do flebotomíneo introduz promastigotas metacíclicos na derme do hospedeiro durante o repasto sanguíneo, acompanhados de saliva contendo vasodilatadores potentes (maxadilano) e imunomoduladores.',
      '2. Fagocitose e diferenciação: macrófagos residentes e células dendríticas fagocitam os promastigotas; no interior dos fagolisossomos, o parasita evade a degradação ácida e diferencia-se na forma amastigota aflagelada.',
      '3. Multiplicação e disseminação linfo-hematogênica: os amastigotas multiplicam-se por divisão binária nos macrófagos até a ruptura celular; o parasita dissemina-se pelos vasos linfáticos e circulação sanguínea para linfonodos, medula óssea, baço, fígado e leitos capilares cutâneos e renais.',
      '4. Desequilíbrio imunológico Th2: falência na montagem de imunidade celular eficaz (Th1) e deflagração de resposta Th2 exacerbada, com produção massiva de IgG não neutralizante e formação de imunocomplexos circulantes.',
      '5. Deposição de imunocomplexos na microvasculatura: deposição passiva de complexos antígeno-anticorpo nos tufos capilares glomerulares, nas paredes de arteríolas dérmicas, na membrana sinovial e no trato uveal ocular.',
      '6. Ativação do complemento e lesão tecidual: recrutamento de neutrófilos e macrófagos, liberação de proteases e espécies reativas de oxigênio, deflagrando glomerulonefrite proliferativa, vasculite leucocitoclástica, poliartrite estéril e uveíte granulomatosa.',
      '7. Evolução para falência de órgãos: desenvolvimento de proteinúria nefrótica, perda progressiva da filtração glomerular, azotemia, síndrome urêmica terminal, urolitíase por xantina sob alopurinol e caquexia crônica associada ao TNF-alfa.'
    ],
    transmissao: 'A dinâmica de transmissão do agente envolve ciclos biológicos vetoriais e rotas não vetoriais:\n\n' +
      '- Ciclo vetorial: inoculação de promastigotas metacíclicos após desenvolvimento de 4 a 7 dias no trato digestivo da fêmea de flebotomíneo alimentada previamente em hospedeiro infectado.\n' +
      '- Rotas secundárias documentadas: transmissão venérea por sêmen, passagem congênita transplacentária e transmissão transfusional por sangue não testado.'
  },

  pathophysiology: {
    glomerulonefriteEDeposicaoDeImunocomplexos: 'O rim é o principal determinante prognóstico e de sobrevida na leishmaniose canina:\n\n' +
      '- Patogênese glomerular: decorre da deposição contínua de imunocomplexos circulantes na matriz mesangial e membrana basal, deflagrando ativação do complemento e glomerulonefrite membranoproliferativa (GNMP).\n' +
      '- Lesão de podócitos e proteinúria: a perda da barreira de seletividade provoca extravasamento maciço de albumina e antitrombina; a proteinúria (UPC) antecede em meses a elevação da creatinina sérica.\n' +
      '- Biomarcadores tubulares precoces (Peris-Grau et al., 2026): uNGAL e uGGT urinários elevam-se precocemente antes da queda da TFG, indicando sobrecarga proteica e sofrimento túbulo-intersticial.',

    mielofisiologiaEAnemiaMultifatorial: 'A anemia na leishmaniose é tipicamente normocítica, normocrômica e não regenerativa, de etiologia multifatorial:\n\n' +
      '- Bloqueio do ferro (eixo hepcidina-ferroportina): citocinas inflamatórias (IL-6 e TNF-alfa) elevam a hepcidina hepática, degradando a ferroportina e sequestrando o ferro nos macrófagos.\n' +
      '- Infiltração medular: invasão plasmo-histiocitária massiva ocupando os nichos hematopoiéticos da medula óssea.\n' +
      '- Hemólise extravascular: encurtamento da meia-vida das hemácias por fagocitose no sistema reticuloendotelial hiperativo.\n' +
      '- Queda de eritropoietina e plaquetopenia: perda progressiva de parênquima renal produtor de EPO e plaquetopenia por consumo vascular ou destruição imunomediada.',

    espectroDermatologicoEImunopatologiaCutanea: 'A pele concentra expressiva carga parasitária, exibindo quatro padrões dermatológicos clássicos (WAVD 2025):\n\n' +
      '- Dermatite esfoliativa seca (80% dos casos): descamação lamelar prateada não pruriginosa com hipotricose e infiltrado perianexial linfo-histiocitário.\n' +
      '- Alopecia periocular (sinal dos óculos): blefarite crônica e perda pilosa periorbitária simétrica por tropismo vascular e inflamatório palpebral.\n' +
      '- Dermatite ulcerativa: úlceras de pressão e em junções mucocutâneas por vasculite necrosante e deposição de imunocomplexos.\n' +
      '- Onicogrifose patológica: crescimento desmesurado e encurvamento de garras por hiperqueratose do leito ungueal.',

    figurasClinicasIntegradas: 'As imagens a seguir ilustram os achados citológicos, parasitológicos, vetoriais e as lesões clínicas dermatológicas e oftálmicas patognomônicas da leishmaniose em cães e gatos.'
  },

  figures: [
    {
      id: 'fig-leish-01',
      title: 'Flebotomíneo Vetor Fêmea (Lutzomyia longipalpis) após Repasto Sanguíneo',
      url: '/consulta-vet/leishmaniose/lutzomyia-longipalpis-vetor-flebotomineo.jpg',
      legend: 'Fêmea ingurgitada de Lutzomyia longipalpis (mosquito-palha) após repasto sanguíneo:\n' +
        '- Papel vetorial: elo epidemiológico essencial de Leishmania infantum no Brasil, inoculando promastigotas metacíclicos na derme durante a hematofagia (Ray Wilson, Liverpool School of Tropical Medicine, CC BY 2.5).',
      source: 'Wikimedia Commons / PLoS Pathogens (CC BY 2.5)'
    },
    {
      id: 'fig-leish-02',
      title: 'Demonstração Citológica de Macrófago com Amastigotas de Leishmania spp.',
      url: '/consulta-vet/leishmaniose/leishmania-amastigotas-macrofago-citologia.jpg',
      legend: 'Fotomicrorganografia de citologia de aspirado de linfonodo corada com Giemsa:\n' +
        '- Macrófago parasitado: exibe numerosas formas amastigotas intracelulares (2 a 4 um) com núcleo esférico e cinetoplasto em bastonete.\n' +
        '- Padrão ouro confirmatório: método direto de maior especificidade para diagnóstico definitivo da infecção (Stefan Walkowski, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-leish-03',
      title: 'Dermatopatia Esfoliativa Canina com Alopecia Periocular (Sinal dos Óculos)',
      url: '/consulta-vet/leishmaniose/leishmaniose-canina-dermatopatia-desquamativa.jpg',
      legend: 'Fenótipo dermatológico clássico em canino acometido por leishmaniose:\n' +
        '- Achados faciais: descamação esfoliativa facial difusa, blefarite crônica e alopecia periocular bilateral concêntrica (sinal dos óculos) (Wikimedia Commons, CC BY-SA 3.0).',
      source: 'Wikimedia Commons (CC BY-SA 3.0)'
    },
    {
      id: 'fig-leish-04',
      title: 'Onicogrifose Patológica Grave e Caquexia em Cão com Calazar',
      url: '/consulta-vet/leishmaniose/leishmaniose-canina-onicogrifose-calazar.jpg',
      legend: 'Quadro avançado de leishmaniose visceral canina (calazar):\n' +
        '- Achados sistêmicos e podais: onicogrifose patológica exuberante, hiperqueratose de coxins e hipotricose acompanhada de caquexia crônica mediada por TNF-alfa (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-leish-05',
      title: 'Leishmaniose Felina: Uveíte Granulomatosa Aguda com Hifema',
      url: '/consulta-vet/leishmaniose/leishmaniose-felina-uveite-hifema.png',
      legend: 'Manifestação clínica ocular em paciente felino com leishmaniose ativa:\n' +
        '- Achados oftálmicos: uveíte anterior granulomatosa unilateral severa, exsudato na câmara anterior e hifema evidente.\n' +
        '- Investigação consensual (ABCD 2026): rastreio obrigatório de imunossupressão retroviral (FIV/FeLV) concomitante (CC BY 4.0).',
      source: 'Wikimedia Commons (CC BY 4.0)'
    }
  ],

  clinicalSignsPathophysiology: [
    {
      system: 'Grupo Dermatológico e Cutâneo-Mucoso',
      findings: [
        {
          finding: 'Dermatite esfoliativa seca não pruriginosa com descamação lamelar prateada',
          mechanism: 'Infiltração plasmocitária e macrofágica perianexial com hiperqueratose ortoqueratótica em resposta à multiplicação de amastigotas na derme superficial e profunda.',
          clinicalMeaning: 'Manifestação clínica mais prevalente da leishmaniose canina (presente em 60% a 80% dos cães sintomáticos); frequentemente confundida com dermatite atópica ou seborreia primária.',
          priority: 'alta'
        },
        {
          finding: 'Alopecia periocular concêntrica bilateral simétrica (sinal dos óculos)',
          mechanism: 'Infiltrado inflamatório granulomatoso e linfo-histiocitário com afinidade específica pela microvasculatura e anexos foliculares periorbitários.',
          clinicalMeaning: 'Achado semiológico altamente característico da leishmaniose visceral canina, conferindo a fácies típica de envelhecimento precoce.',
          priority: 'alta'
        },
        {
          finding: 'Onicogrifose patológica exuberante com curvatura anormal e unhas quebradiças',
          mechanism: 'Hiperproliferação da matriz do leito ungueal induzida por inflamação crônica linfo-histiocitária local e proliferação vascular tecidual.',
          clinicalMeaning: 'Crescimento desproporcional das unhas que ocorre mesmo em cães que realizam desgaste físico regular em pisos ásperos; sinal fortemente preditivo.',
          priority: 'alta'
        },
        {
          finding: 'Úlceras cutâneas profundas em proeminências ósseas e junções mucocutâneas',
          mechanism: 'Vasculite necrosante e isquemia tecidual focal provocadas pela deposição local de imunocomplexos circulantes associada a trauma por decúbito.',
          clinicalMeaning: 'Lesões dolorosas de difícil cicatrização que respondem precariamente a antibióticos comuns e cicatrizantes convencionais antes da terapia leishmanicida.',
          priority: 'media'
        }
      ]
    },
    {
      system: 'Grupo Renal e Urinário',
      findings: [
        {
          finding: 'Proteinúria assintomática de origem glomerular (elevação do UPC)',
          mechanism: 'Deposição contínua de complexos antígeno-anticorpo nos capilares glomerulares, causando lesão em fendas podocitárias e extravasamento de albumina.',
          clinicalMeaning: 'Principal determinante isolado de morbimortalidade na leishmaniose; antecede a azotemia em meses e exige monitorização seriada do UPC.',
          priority: 'critica'
        },
        {
          finding: 'Síndrome poliúria/polidipsia e azotemia progressiva com uremia terminal',
          mechanism: 'Perda irreversível de massa nefronal e fibrose túbulo-intersticial secundária à sobrecarga proteica luminal e nefrite crônica por imunocomplexos.',
          clinicalMeaning: 'Indica evolução para Doença Renal Crônica (DRC estágios 2 a 4 IRIS); impõe transição para protocolo intensivo de proteção nefronal e suporte clínico.',
          priority: 'critica'
        },
        {
          finding: 'Cristalúria de xantina e risco de urolitíase obstrutiva radiotransparente',
          mechanism: 'Inibição iatrogênica da xantina oxidase pelo alopurinol, bloqueando a conversão de xantina em ácido úrico e promovendo hiperxantinúria insolúvel.',
          clinicalMeaning: 'Complicação farmacológica comum que exige acompanhamento com urinálise e ultrassom e adoção de dietas de restrição purínica.',
          priority: 'alta'
        }
      ]
    },
    {
      system: 'Grupo Oftálmico',
      findings: [
        {
          finding: 'Uveíte anterior granulomatosa bilateral com precipitados ceráticos em gordura de carneiro',
          mechanism: 'Deposição de imunocomplexos na íris e corpo ciliar, atração de macrófagos e neutrófilos e quebra da barreira hematoaquosa ocular.',
          clinicalMeaning: 'Achado ocular mais grave; risco iminente de sinequias posteriores, glaucoma secundário doloroso e perda definitiva da visão.',
          priority: 'critica'
        },
        {
          finding: 'Ceratoconjuntivite seca (KCS) com secreção mucopurulenta e hiperemia',
          mechanism: 'Infiltração granulomatosa e destruição imune mediada do tecido acinar das glândulas lacrimais principais e da terceira pálpebra.',
          clinicalMeaning: 'Redução acentuada no Teste Lacrimal de Schirmer; demanda lubrificação intensiva e imunomoduladores tópicos (ciclosporina ou tacrolimo).',
          priority: 'alta'
        },
        {
          finding: 'Hifema espontâneo e descolamento seroso ou exsudativo de retina',
          mechanism: 'Vasculite retiniana necrosante grave, hipertensão arterial sistêmica associada à nefropatia ou trombocitopenia acentuada.',
          clinicalMeaning: 'Emergência oftálmica aguda com risco de amaurose permanente e dor ocular intensa.',
          priority: 'alta'
        }
      ]
    },
    {
      system: 'Grupo Locomotor e Muscular',
      findings: [
        {
          finding: 'Claudicação intermitente com poliartrite e efusão articular estéril',
          mechanism: 'Deposição de imunocomplexos na membrana sinovial articular, desencadeando sinovite inflamatória neutrofílica asséptica.',
          clinicalMeaning: 'Afeta frequentemente articulações distais (carpos e tarsos), mimetizando doenças ortopédicas mecânicas ou lúpus eritematoso sistêmico.',
          priority: 'alta'
        },
        {
          finding: 'Atrofia severa e simétrica da musculatura mastigatória (cabeça de esqueleto)',
          mechanism: 'Miosite crônica focal associada ao hipercatabolismo crônico mediado por citocinas inflamatórias caquexiantes (TNF-alfa e IL-1).',
          clinicalMeaning: 'Confere a fácies cadavérica característica do calazar avançado; deve ser diferenciada da miosite dos músculos da mastigação imunomediada isolada.',
          priority: 'media'
        }
      ]
    },
    {
      system: 'Grupo Sistêmico e Hematológico',
      findings: [
        {
          finding: 'Linfadenomegalia generalizada simétrica e esplenomegalia congestiva',
          mechanism: 'Hiperplasia reativa massiva de linfonodos e da polpa vermelha e branca esplênica por proliferação plasmo-histiocitária.',
          clinicalMeaning: 'Achado físico presente em mais de 70% dos casos; o linfonodo é o sítio preferencial para punção aspirativa diagnóstica (PAAF).',
          priority: 'alta'
        },
        {
          finding: 'Epistaxe unilateral ou bilateral recorrente de difícil controle',
          mechanism: 'Associação entre vasculite ulcerativa da mucosa nasal por imunocomplexos, trombocitopenia e hiperglobulinemia com síndrome de hiperviscosidade.',
          clinicalMeaning: 'Sinal de alarme de vasculite grave; pode gerar choque hipovolêmico em episódios intensos e necessitar de hemostasia local e tamponamento.',
          priority: 'critica'
        },
        {
          finding: 'Anemia não regenerativa normocítica normocrômica e palidez de mucosas',
          mechanism: 'Anemia de doença inflamatória (sequestro de ferro por hepcidina), ocupação medular plasmo-histiocitária e redução de EPO na nefropatia.',
          clinicalMeaning: 'Evolui silenciosamente; sua piora progressiva correlaciona-se com perda de função renal e deterioração clínica geral.',
          priority: 'media'
        }
      ]
    },
    {
      system: 'Grupo Felino Específico (ABCD 2026)',
      findings: [
        {
          finding: 'Nódulos cutâneos dérmicos e crostas crostosas ulceradas em face, focinho e orelhas',
          mechanism: 'Infiltração nodular granulomatosa macrofágica rica em formas amastigotas na derme de gatos suscetíveis ou imunossuprimidos.',
          clinicalMeaning: 'Padrão dermatológico mais frequente no gato, diferindo da clássica descamação seca difusa do cão; confunde-se com carcinoma de células escamosas e esporotricose.',
          priority: 'alta'
        },
        {
          finding: 'Uveíte anterior crônica unilateral ou bilateral com nódulos na íris e hifema',
          mechanism: 'Tropismo e persistência de amastigotas no estroma uveal de gatos com resposta humoral ativada e imunodeficiência celular subjacente.',
          clinicalMeaning: 'Manifestação ocular altamente sugestiva em felinos; exige triagem imediata de FIV e FeLV conforme preconiza o consenso ABCD 2026.',
          priority: 'alta'
        }
      ]
    }
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem Clínica, Hemograma, Perfil Bioquímico, SPE e Urinálise com UPC',
      description: 'Painel inicial abrangente em pacientes de áreas endêmicas ou com histórico epidemiológico:\n\n' +
        '- Hemograma: anemia normocítica normocrômica não regenerativa e trombocitopenia leve a moderada por sequestro esplênico ou consumo vascular.\n' +
        '- Bioquímica sérica: hiperproteinemia marcante por hipergamaglobulinemia, hipoalbuminemia e inversão severa da relação albumina:globulina (A:G < 0,6).\n' +
        '- Eletroforese de proteínas séricas (SPE): pico de base ampla policlonal em fração gama e beta-gama.\n' +
        '- Urinálise com UPC: quantificação de proteinúria para detectar glomerulonefrite membranoproliferativa incipiente antes do surgimento de azotemia.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Demonstração Parasitológica Direta (Citologia Aspirativa) — Padrão Ouro Confirmatório',
      description: 'Método padrão ouro confirmatório definitivo de infecção ativa:\n\n' +
        '- Amostragem citológica: punção aspirativa por agulha fina (PAAF) de linfonodos aumentados (poplíteos ou pré-escapulares), medula óssea ou imprint de úlceras e nódulos cutâneos.\n' +
        '- Microscopia óptica (1000x com imersão): coloração por Giemsa, Wright ou Panótico Rápido.\n' +
        '- Morfologia patognomônica: amastigotas intracelulares em macrófagos (2 a 4 um), contendo núcleo azul-avermelhado e cinetoplasto em bastonete perpendicular, conferindo 100% de especificidade.',
      isGoldStandard: true
    },
    {
      stepNumber: 3,
      title: 'Sorologia Quantitativa e Titulação de Anticorpos (RIFI e ELISA)',
      description: 'Quantificação da resposta humoral específica por RIFI ou ELISA quantitativo:\n\n' +
        '- Títulos elevados (> 3 a 4x o ponto de corte): associados a sinais clínicos típicos, apresentam forte correlação com doença ativa de alta carga.\n' +
        '- Títulos baixos ou limítrofes: indicam apenas exposição ou imunidade controlada; demandam confirmação molecular ou monitoramento serológico em 60 a 90 dias.\n' +
        '- Conduta obrigatória: contraindica-se formalmente iniciar terapia leishmanicida baseando-se exclusivamente em sorologia com títulos baixos.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Diagnóstico Molecular por PCR Quantitativo em Tempo Real (qPCR)',
      description: 'Detecção e quantificação de DNA de Leishmania infantum por ensaios de qPCR:\n\n' +
        '- Alvos de amplificação: kDNA de minicírculos ou DNA ribossomal 18S conservado.\n' +
        '- Amostras de eleição: tecidos com alta carga parasitária (aspirado de medula óssea, linfonodos ou biópsias de pele lesada).\n' +
        '- Limitação do sangue periférico: menor sensibilidade decorrente de parasitemia flutuante; qPCR negativo em sangue não exclui a infecção tecidual.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Enquadramento Estruturado no Algoritmo CLWG 2026 e Investigação de Coinfecções',
      description: 'Integração de dados clínicos, parasitológicos e sorológicos conforme diretrizes:\n\n' +
        '- Estratificação CLWG 2026: Classe A (não tratar), Classe B (não tratar, monitorar), Classe C (tratar doença ativa) ou Classe D (tratar com suporte intensivo).\n' +
        '- Painel de coinfecções transmitidas por carrapatos: pesquisa obrigatória de Ehrlichia canis, Anaplasma platys e Babesia vogeli, que potencializam a lesão glomerular e a trombocitopenia.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Estadiamento Renal Longitudinal (Diretrizes IRIS) e Biomarcadores de Dano Precoce',
      description: 'Estadiamento funcional e morfológico nefronal pelas diretrizes consensuais da IRIS:\n\n' +
        '- Marcadores de filtração glomerular: dosagens seriadas de creatinina sérica e SDMA com o paciente hidratado e estável.\n' +
        '- Subestadiamento de proteinúria (UPC): não proteinúrico (< 0,2), limítrofe (0,2 a 0,5) ou proteinúrico (> 0,5), associado à aferição de pressão arterial sistólica.\n' +
        '- Biomarcadores tubulares precoces: dosagem de uNGAL e uGGT para rastrear dano tubular pré-azotêmico.',
      isGoldStandard: false
    }
  ],

  treatment: {
    consensoTerapeuticoInternacionalWAVD2025ECLWG2026: 'O consenso internacional (CLWG 2026 e WAVD 2025) preconiza associação sinérgica entre leishmanicida rápido e leishmaniostático prolongado:\n\n' +
      '- Antimoniato de Meglumina: 100 mg/kg SC q24h (ou 50 mg/kg SC BID) por 28 dias consecutivos; apresenta elevada taxa de controle parasitológico sustentado.\n' +
      '- Alopurinol: 10 mg/kg VO BID continuado por 6 a 12 meses como bloqueador de replicação parasitária.\n' +
      '- Alternativa oral: a miltefosina oral é a alternativa de primeira linha em casos de intolerância a injeções subcutâneas ou dano renal leve a moderado.',

    legislacaoBrasileiraERegulamentacaoMAPA: 'A abordagem terapêutica no Brasil submete-se a rígida regulamentação sanitária de saúde pública:\n\n' +
      '- Portaria Interministerial n. 1.426/2008: proíbe taxativamente o tratamento canino com medicamentos de uso humano registrados para leishmaniose visceral humana (vedando Antimoniato de Meglumina humano e Anfotericina B) para prevenir resistência cruzada em humanos.\n' +
      '- Fármaco registrado no MAPA: a Miltefosina (Milteforan) é o único leishmanicida registrado e aprovado pelo MAPA para tratamento canino no Brasil.\n' +
      '- Associação leishmaniostática: o protocolo oficial nacional combina miltefosina registrada com alopurinol sob rigoroso monitoramento clínico e termo de esclarecimento ao tutor.',

    protocoloMiltefosinaMecanismoEPosologia: 'A miltefosina atua como análogo de alquilfosfocolina, desestruturando a membrana celular e deflagrando apoptose no parasita:\n\n' +
      '- Posologia oficial validada: 2 mg/kg por via oral a cada 24 horas durante 28 dias consecutivos.\n' +
      '- Manejo de administração: fornecer impreterivelmente misturada a uma refeição rica em lipídios para reduzir o contato irritativo com a mucosa gástrica.\n' +
      '- Reações adversas comuns: êmese esporádica, regurgitação e amolecimento fecal; suporte com antieméticos (maropitant) e protetores gástricos quando indicado.',

    protocoloAlopurinolManejoDaXantinuria: 'O alopurinol atua como análogo de purina e potente inibidor competitivo da xantina oxidase:\n\n' +
      '- Ação leishmaniostática e posologia: incorpora-se ao RNA do protozoário e bloqueia a síntese proteica; administra-se na dose de 10 mg/kg VO BID por no mínimo 6 a 12 meses.\n' +
      '- Risco de xantinúria e nefrolitíase: o bloqueio enzimático eleva a excreção de xantina insolúvel, predispondo a cristais e urólitos radiotransparentes de xantina no trato urinário.\n' +
      '- Monitoramento preventivo: urinálise seriada a cada 60 a 90 dias, ultrassonografia abdominal periódica e transição para dieta terapêutica hipopurínica ao menor sinal de cristalúria.',

    marbofloxacinaEOutrosAgentesAlternativos: 'Protocolos com agentes alternativos apresentam limitações documentadas em consensos recentes:\n\n' +
      '- Marbofloxacina (2 a 4 mg/kg/dia VO por 28 dias): avaliada em combinação com alopurinol como fármaco de resgate.\n' +
      '- Nível de evidência (WAVD 2025 e CLWG 2026): evidência de eficácia modesta e redução de carga parasitária expressivamente inferior à miltefosina e ao antimoniato; restrita a casos de intolerância absoluta aos fármacos padrão.',

    usoCriticoDeCorticosteroidesEmEmergenciasImunes: 'O uso de corticosteroides exige rigoroso critério fisiopatológico e cobertura parasitária plena:\n\n' +
      '- Contraindicação empírica cega: a imunossupressão inadvertida desativa a resposta Th1 residual e promove explosão da replicação parasitária.\n' +
      '- Emergências imunomediadas elegíveis: GN membranoproliferativa aguda com síndrome nefrótica grave (UPC > 3,0), vasculite necrosante com hemorragia e uveíte grave com risco de perda visual imediata.\n' +
      '- Protocolo de resgate: prednisolona em dose anti-inflamatória a intermediária (0,5 a 1,0 mg/kg/dia), de duração estritamente limitada e obrigatoriamente sob cobertura leishmanicida plena.',

    protocoloTerapeuticoEmFelinosABCD2026: 'Diretrizes do consenso ABCD Feline 2026 para manejo terapêutico da leishmaniose na espécie felina:\n\n' +
      '- Alopurinol felino: 10 a 20 mg/kg VO a cada 24 horas (ou 10 mg/kg BID), sendo a opção de primeira escolha mais documentada em gatos.\n' +
      '- Miltefosina em felinos: 2 mg/kg/dia VO por 28 dias sob estrito acompanhamento de tolerância entérica, enzimas hepáticas e creatinina.\n' +
      '- Determinantes prognósticos: a presença de retroviroses ativas (FIV e FeLV) e a gravidade da nefropatia glomerular definem a sobrevida global.',

    criteriosDeRespostaRecidivaEDesmame: 'Critérios objetivos de remissão, estabilidade clínica e identificação precoce de recidivas:\n\n' +
      '- Marcadores de remissão clínica: cicatrização de lesões dermatológicas, regressão ganglionar, ganho de escore corporal e normalização da relação A:G (> 0,6).\n' +
      '- Critérios para suspensão do alopurinol: no mínimo 6 a 12 meses de tratamento continuado, estabilidade clínica absoluta, UPC normal e sorologia quantitativa estável em baixos títulos ou negativa em dois semestres consecutivos.\n' +
      '- Indicadores de recidiva ativa: aumento de títulos sorológicos em duas ou mais diluições, reaparecimento de proteinúria glomerular ou recrudescência das queixas cutâneas.',
  },

  complications: {
    falenciaRenalTerminal: 'Progressão da injúria glomerular para perda funcional nefronal crônica:\n\n' +
      '- Evolução histopatológica: a transição de glomerulonefrite membranoproliferativa para esclerose global e fibrose túbulo-intersticial irreversível culmina em DRC terminal (IRIS 3-4), representando a principal causa de mortalidade.',

    urolitiaseObstrutivaPorXantina: 'Complicação metabólica associada ao tratamento prolongado:\n\n' +
      '- Fisiopatologia: a inibição da xantina oxidase pelo alopurinol sem restrição dietética purínica gera litíase radiotransparente de xantina, predispondo a episódios obstrutivos e uremia pós-renal aguda.',

    comprometimentoVisualECegueiraBilateral: 'Evolução inflamatória e sequelas oculares irreversíveis:\n\n' +
      '- Danos estruturais: uveíte anterior crônica pode progredir para sinequias posteriores, catarata, descolamento de retina e glaucoma secundário com perda visual definitiva.',

    amiloidoseSecundariaERupturasVasculares: 'Complicações vasculares e inflamatórias sistêmicas avançadas:\n\n' +
      '- Amiloidose secundária (AA): deposição amiloide nefronal induzida por inflamação crônica sustentada, gerando síndrome nefrótica refratária.\n' +
      '- Vasculite necrosante: rotura vascular microcapilar por imunocomplexos, deflagrando epistaxe torrencial e enteropatia hemorrágica.',
  },

  prevention: {
    repelentesEInseticidasVetoriaisCaninos: 'O controle vetorial ininterrupto é a base essencial da prevenção em caninos (efeito anti-feeding):\n\n' +
      '- Coleiras com deltametrina a 4%: substituição periódica a cada 4 a 6 meses conforme indicação do fabricante para proteção contínua.\n' +
      '- Formulações tópicas pour-on / spot-on: permetrina associada a imidacloprida ou dinotefurano em aplicações mensais regulares.\n' +
      '- Bloqueio bidirecional: impede a inoculação de novos promastigotas em animais sadios e bloqueia a transmissão de cães infectados para os flebotomíneos.',

    manejoAmbientalEControleDeFocos: 'Saneamento ambiental rigoroso para redução de criadouros de mosquitos-palha:\n\n' +
      '- Manejo de matéria orgânica: remoção regular de folhas secas, fezes de animais e resíduos vegetais em decomposição no solo sombreado.\n' +
      '- Telas e barreira física: colocação de telas de malha fina (< 1 mm) em canis e janelas para impedir a invasão vetorial nos horários crepusculares e noturnos.',

    situacaoVacinalNoBrasil: 'Cenário regulatório e imunológico da imunização canina no território nacional:\n\n' +
      '- Histórico da vacina Leish-Tec: produção e distribuição comercial suspensas preventivamente pelo MAPA por inconformidades em lotes industriais.\n' +
      '- Papel complementar da vacinação: quando recomendada, atenua a morbidade clínica, porém não confere imunidade esterilizante nem substitui as coleiras repelentes.',

    alertaToxicologicoCriticoPermetrinaEmFelinos: 'ALERTA FARMACOLÓGICO CRÍTICO: Permetrina e piretroides caninos são formalmente contraindicados e FATAIS para felinos:\n\n' +
      '- Mecanismo da toxicidade letal: os gatos apresentam deficiência constitucional de glicuroniltransferase (UGT) hepática, incapazes de conjugar e eliminar a permetrina.\n' +
      '- Quadro neurotóxico agudo: tremores musculares generalizados, hiperestesia, convulsões contínuas, hipertermia grave e óbito rápido.\n' +
      '- Alternativa aprovada para gatos: uso restrito de coleiras com flumetrina registradas para felinos ou manutenção estrita do paciente em ambiente indoor protegido.',
  },

  references: [
    {
      id: 'ref-roura-2026',
      citation: 'Roura X, et al. Updated Canine Leishmaniosis Working Group recommendations for leishmaniosis in dogs: Q&A on clinical management. Parasites & Vectors, 2026;19(1):305. DOI: 10.1186/s13071-026-07446-6.'
    },
    {
      id: 'ref-solano-gallego-2025',
      citation: 'Solano-Gallego L, et al. World Association for Veterinary Dermatology (WAVD) clinical consensus guidelines of canine leishmaniosis. Veterinary Dermatology, 2025;36(2):112-145.'
    },
    {
      id: 'ref-pennisi-2026',
      citation: 'Pennisi MG, et al. Feline Leishmaniosis: ABCD guidelines on prevention and management (Updated March 2026). Journal of Feline Medicine and Surgery, 2026;28(3):210-228.'
    },
    {
      id: 'ref-brasil-ms-2026',
      citation: 'Brasil. Ministério da Saúde. Secretaria de Vigilância em Saúde e Ambiente. Manual de Vigilância e Controle da Leishmaniose Visceral. 2a ed. Brasília: Ministério da Saúde, 2026.'
    },
    {
      id: 'ref-nelson-couto-6ed',
      citation: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier, 2020; Cap. 98: Leishmaniasis, pp. 1518-1524.'
    },
    {
      id: 'ref-ettinger-9ed',
      citation: 'Ettinger SJ, Feldman EC, Côté E. Textbook of Veterinary Internal Medicine. 9th ed. Philadelphia: Saunders Elsevier, 2024; Cap. 214: Leishmaniosis.'
    },
    {
      id: 'ref-peris-grau-2026',
      citation: 'Peris-Grau E, et al. Urinary NGAL and GGT as early biomarkers of renal tubular damage in dogs naturally infected by Leishmania infantum. Journal of Veterinary Internal Medicine, 2026;40(1):188-198.'
    },
    {
      id: 'ref-paltrinieri-2016',
      citation: 'Paltrinieri S, et al. Laboratory checks in borderline dogs for Leishmania infantum: interpretation of serum protein electrophoresis and titrations. Veterinary Parasitology, 2016;224:88-97.'
    },
    {
      id: 'ref-saridomichelakis-2014',
      citation: 'Saridomichelakis MN, Koutinas AF. Cutaneous manifestations of canine leishmaniosis. Veterinary Dermatology, 2014;25(6):527-540.'
    },
    {
      id: 'ref-manna-2015',
      citation: 'Manna L, et al. Comparative clinical efficacy and parasite load reduction of miltefosine versus meglumine antimoniate in canine leishmaniosis. Veterinary Journal, 2015;203(3):323-328.'
    },
    {
      id: 'ref-noli-2014',
      citation: 'Noli C, Saridomichelakis MN. Adverse effects of allopurinol in dogs with leishmaniosis: xanthinuria and urolithiasis risk management. Veterinary Record, 2014;175(22):555-559.'
    },
    {
      id: 'ref-plumb-10ed',
      citation: 'Plumb DC. Plumb\'s Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell, 2023; Monografias: Miltefosine, Allopurinol, Meglumine Antimoniate.'
    },
    {
      id: 'ref-iris-2026',
      citation: 'International Renal Interest Society (IRIS). IRIS Staging of CKD in Dogs and Cats (Updated 2026). Available from: iris-kidney.com.'
    },
    {
      id: 'ref-brasileish-2020',
      citation: 'Dantas-Torres F, et al. Diretrizes do Brasileish para o diagnóstico, estadiamento e tratamento da leishmaniose visceral canina no Brasil. Clínica Veterinária, 2020;144:26-44.'
    },
    {
      id: 'ref-ribeiro-2018',
      citation: 'Ribeiro RR, et al. Cytokine profiles and immune response polarization (Th1 vs Th2) in canine visceral leishmaniasis: clinical and histopathological correlates. Veterinary Immunology and Immunopathology, 2018;202:115-124.'
    }
  ]
};
