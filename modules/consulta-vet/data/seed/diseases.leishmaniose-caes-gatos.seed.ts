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

  quickSummary: 'A leishmaniose em cães e gatos é uma zoonose parasitária crônica e multissistêmica causada pelo protozoário intracelular Leishmania infantum (sin. Leishmania chagasi nas Américas), transmitida primariamente pela picada de flebotomíneos hematófagos (especialmente Lutzomyia longipalpis no Brasil). A doença caracteriza-se por um complexo desequilíbrio imunológico no qual o hospedeiro vertebrado falha em montar uma resposta imune celular protetora (Th1 mediada por IFN-gama e TNF-alfa), desenvolvendo em contrapartida uma resposta humoral exuberante, ineficaz e lesiva (Th2), caracterizada por hipergamaglobulinemia policlonal severa e deposição massiva de imunocomplexos circulantes em múltiplos leitos vasculares. Essa deposição inflamatória deflagra as principais manifestações da síndrome: glomerulonefrite membranoproliferativa com proteinúria precoce (principal determinante de morbimortalidade), dermatite esfoliativa seca não pruriginosa, alopecia periocular em óculos, onicogrifose patológica desproporcional, vasculite com epistaxe, poliartrite imunomediada e uveíte granulomatosa. A abordagem clínica contemporânea fundamenta-se na atualização consensual do Canine Leishmaniosis Working Group (CLWG 2026), que estabelece o princípio de que infecção não é sinônimo de doença ativa (categorizando os pacientes em Classes A, B, C e D), proibindo o tratamento leishmanicida em animais assintomáticos apenas com base em soropositividade isolada. No Brasil, o manejo terapêutico é estritamente regulado pelo MAPA e Ministério da Saúde, sendo a miltefosina canina (Milteforan) o único leishmanicida registrado, associado ao alopurinol com monitoramento rigoroso de xantinúria e nefropatia. Em felinos, segundo o consenso ABCD 2026, a doença emerge primariamente associada a estados de imunossupressão (FIV/FeLV), exigindo cautela farmacológica e absoluto veto ao uso de repelentes à base de permetrina por toxicidade fatal nesta espécie.',

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
    lead: 'A leishmaniose é uma doença parasitária crônica e zoonótica causada por Leishmania infantum, cuja manifestação clínica decorre não apenas da replicação do protozoário em macrófagos, mas primordialmente da resposta imunopatológica do hospedeiro, mediada por hipergamaglobulinemia policlonal e deposição vascular de imunocomplexos. O manejo atual baseia-se na classificação CLWG 2026 (separando exposição de doença ativa), na vigilância renal rigorosa e no tratamento regulado conforme a legislação nacional.',
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
        body: 'O consenso CLWG 2026 estabelece uma ruptura definitiva com o dogma antigo de tratar qualquer animal soropositivo. Cães expostos com títulos baixos a moderados sem infecção direta (Classe A) e cães clinicamente saudáveis com DNA parasitário detectável (Classe B) NÃO devem receber fármacos leishmanicidas. O tratamento anti-Leishmania é reservado estritamente para animais com doença ativa atribuível (Classes C e D).',
        highlights: ['Classe A e B não tratam', 'Classe C e D tratam', 'Evitar toxicidade e resistência farmacológica']
      },
      {
        title: 'Pilar 2: Imunopatogenia e o Rim como Órgão Sentinela',
        body: 'A polarização da resposta imune define o destino do paciente: indivíduos com imunidade celular eficaz (Th1 com IFN-gama e óxido nítrico) contêm o parasita; indivíduos com resposta humoral exacerbada (Th2) desenvolvem hipergamaglobulinemia massiva. A deposição de imunocomplexos circulantes induz glomerulonefrite proliferativa, tornando a proteinúria (mensurada pelo UPC) a principal causa de desfecho desfavorável.',
        highlights: ['Resposta Th1 protetora vs Th2 lesiva', 'Glomerulonefrite por imunocomplexos', 'UPC e biomarcadores uNGAL/uGGT']
      },
      {
        title: 'Pilar 3: Diagnóstico Integrado e Padrão Ouro Citológico',
        body: 'Nenhum teste diagnóstico deve ser avaliado isoladamente. A citologia direta de linfonodo, medula óssea ou lesão cutânea constitui o método confirmatório padrão ouro, evidenciando amastigotas intracelulares. A sorologia quantitativa e o qPCR em tecidos-alvo (linfonodo/medula) complementam o diagnóstico, sendo a sorologia em sangue periférico inadequada como critério isolado de indicação medicamentosa.',
        highlights: ['Citologia direta: padrão ouro', 'qPCR tecidual', 'Sorologia quantitativa']
      },
      {
        title: 'Pilar 4: Terapêutica Racional, Legislação e Manejo da Xantinúria',
        body: 'No Brasil, a legislação do MAPA restringe o uso de leishmanicidas à miltefosina canina (Milteforan 2 mg/kg q24h por 28 dias), associada ao leishmaniostático alopurinol (10 mg/kg BID). O uso continuado de alopurinol inibe a xantina oxidase, gerando acúmulo urinário de xantina com risco de nefrolitíase radiotransparente, exigindo acompanhamento com urinálise, ultrassom e dieta de baixo teor purínico.',
        highlights: ['Miltefosina registrada no MAPA', 'Alopurinol e urolitíase por xantina', 'Monitoramento clínico e ultrassonográfico']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico Sequencial na Suspeita de Leishmaniose',
      steps: [
        {
          label: 'Etapa 1: Reconhecimento do Fenótipo Clínico e Triagem Básica',
          timing: 'Primeira consulta',
          detail: 'Identificação de sinais clínicos sugestivos: dermatite esfoliativa, alopecia periocular, onicogrifose, linfadenomegalia, perda de peso ou uveíte. Coleta de sangue para hemograma completo, perfil bioquímico (ureia, creatinina, albumina, globulinas, relação A:G) e urinálise com UPC.'
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
          detail: 'Enquadramento do paciente nas Classes A, B, C ou D do CLWG 2026. Se Classe C ou D, avaliar estadiamento renal estrito (estágios IRIS 1 a 4 com base em creatinina, SDMA e UPC), pressão arterial sistólica e pesquisa de coinfecções por carrapatos (Ehrlichia, Anaplasma, Babesia).'
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
          detail: 'Administração de Miltefosina (Milteforan) na dose de 2 mg/kg por via oral a cada 24 horas por 28 dias consecutivos, sempre misturada ao alimento para mitigar náuseas e vômitos. Em países onde autorizado, Antimoniato de meglumina (100 mg/kg/dia SC dividido em 2 aplicações).'
        },
        {
          label: 'Fase 2: Terapia Leishmaniostática Contínua',
          timing: 'Dias 1 a 180-365+',
          detail: 'Alopurinol na dose de 10 mg/kg por via oral a cada 12 horas. Manter por um período mínimo de 6 a 12 meses, associando dieta de teor reduzido de purinas para prevenir urolitíase por xantina.'
        },
        {
          label: 'Fase 3: Manejo da Doença Renal e de Complicações Imunomediadas',
          timing: 'Simultâneo desde o diagnóstico',
          detail: 'Em caso de proteinúria (UPC aumentado), instituir bloqueio do sistema renina-angiotensina (inibidores da ECA como enalapril/benazepril ou bloqueadores de receptores de angiotensina como telmisartana) e controle pressórico. Se uveíte ativa grave, corticoterapia tópica e suporte anti-inflamatório sob cobertura leishmanicida.'
        },
        {
          label: 'Fase 4: Prevenção Vetorial Contínua Obrigatória',
          timing: 'Permanente',
          detail: 'Aplicação ininterrupta de coleiras à base de deltametrina (4%) ou formulações tópicas repelentes registradas para prevenir novas inoculações vetoriais e evitar que o paciente atue como fonte de infecção para flebotomíneos. Em gatos, utilizar apenas coleiras de flumetrina autorizadas, jamais permetrina.'
        },
        {
          label: 'Fase 5: Monitoramento Laboratorial e Detecção de Recidivas',
          timing: 'A cada 3 a 6 meses',
          detail: 'Avaliação clínica seriada, hemograma completo, perfil bioquímico renal, UPC urinário, sedimento urinário com pesquisa de cristais de xantina e titulação sorológica quantitativa. Ascensão de títulos em duas ou mais diluições ou reaparecimento de proteinúria indicam necessidade de reavaliação terapêutica.'
        }
      ]
    }
  },

  etiology: {
    taxonomiaEBiologiaDoParasita: 'A leishmaniose em pequenos animais é causada por protozoários digenéticos e hemoflagelados pertencentes à ordem Trypanosomatida, família Trypanosomatidae e gênero Leishmania. No Brasil, nas Américas, no sul da Europa, no norte da África e em regiões da Ásia, a espécie de relevância clínica e em saúde pública é Leishmania infantum (historicamente denominada Leishmania chagasi no continente americano). O ciclo biológico apresenta duas formas morfológicas evolutivas: os promastigotas (formas flageladas alongadas, medindo de 15 a 20 um, altamente móveis, encontradas no trato digestivo dos insetos vetores) e os amastigotas (formas esféricas a ovoides, anucleadas de flagelo livre aparente, medindo de 2 a 4 um, contendo núcleo e cinetoplasto característicos, vivendo obrigatoriamente no interior de macrófagos e células do sistema fagocítico mononuclear dos hospedeiros mamíferos vertebrados) (Nelson & Couto, 6a ed., Cap. 98; Ettinger, 9a ed.).',

    mudancaDeConceitoCLWG2026InfeccaoVsDoenca: 'A publicação das novas diretrizes do Canine Leishmaniosis Working Group (CLWG 2026; Roura et al., Parasites & Vectors, 2026) promoveu uma reformulação paradigmática na conduta da leishmaniose canina. O dogma tradicional de que qualquer resultado soropositivo equivale a doença ativa que requer tratamento imediato foi definitivamente superado. O consenso estabelece com rigor que a infecção por Leishmania não é sinônimo de doença clínica. A grande maioria dos cães em regiões endêmicas entra em contato com o parasita, produz anticorpos ou abriga DNA parasitário em tecidos linfoides sem jamais desenvolver lesões anatomopatológicas ou sinais clínicos durante anos. Administrar fármacos leishmanicidas e leishmaniostáticos em animais que não apresentam doença ativa atribuível à Leishmania expõe o paciente a toxicidade iatrogênica (especialmente nefrotoxicidade e xantinúria), induz pressão seletiva para resistência parasitária e desvia o raciocínio clínico de outras enfermidades concomitantes.',

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

    respostaImunocelularVsHumoralTh1Th2: 'A imunopatologia da leishmaniose é determinada pela dicotomia entre os perfis de resposta imunológica celular e humoral do hospedeiro mamífero. A resistência à infecção correlaciona-se com a diferenciação de linfócitos T auxiliares no perfil Th1, caracterizado pela secreção de citocinas pró-inflamatórias como interleucina-2 (IL-2), fator de necrose tumoral alfa (TNF-alfa) e interferon-gama (IFN-gama). O IFN-gama ativa a enzima óxido nítrico sintase induzível (iNOS) nos macrófagos infectados, estimulando a síntese de óxido nítrico e espécies reativas de nitrogênio que erradicam os amastigotas nos vacúolos parasitóforos. Em contrapartida, os animais suscetíveis desenvolvem uma resposta polarizada para o perfil Th2, caracterizada pela secreção de IL-4, IL-10 e fator de crescimento transformador beta (TGF-beta), citocinas imunorreguladoras e desativadoras que inibem o burst oxidativo macrofágico, promovem anergia de células T e deflagram ativação policlonal descontrolada de linfócitos B e plasmócitos.',

    fisiopatologiaDaHiperglobulinemiaPoliclonal: 'A ativação desregulada de plasmócitos culmina em síntese maciça e indiscriminada de imunoglobulinas da classe IgG, gerando hiperproteinemia acentuada decorrente de hipergamaglobulinemia policlonal grave, frequentemente acompanhada de marcante inversão da relação albumina:globulina (A:G frequentemente inferior a 0,6 e por vezes menor que 0,3). Na eletroforese de proteínas séricas (SPE), observa-se elevação em base ampla na fração gama e beta-gama (padrão policlonal clássico), refletindo a multiplicidade de clones plasmocitários ativados. Grande parcela dessas imunoglobulinas é composta por anticorpos não neutralizantes e autoanticorpos (contra eritrócitos, plaquetas e antígenos nucleares), os quais se combinam com antígenos solúveis de Leishmania formando agregados de imunocomplexos circulantes (CICs).'
  },

  epidemiology: {
    distribuicaoGeograficaEEpidemiologiaUrbana: 'A leishmaniose visceral canina é uma zoonose de notificação compulsória no Brasil, de distribuição cosmopolita com elevada prevalência na América Latina, na bacia do Mediterrâneo, no Oriente Médio e na Ásia Central. No Brasil, historicamente restrita a áreas rurais e florestais, a doença sofreu acentuada transição epidemiológica para grandes centros urbanos e regiões periurbanas nas últimas quatro décadas, impulsionada pelo desmatamento, expansão urbana não planejada, acúmulo de matéria orgânica no peridomicílio e adaptação sinantrópica de seu vetor principal, o flebotomíneo Lutzomyia longipalpis (popularmente conhecido como mosquito-palha, asa-dura, birigui ou tatuquira). Em áreas do sul do Brasil e outros ecossistemas específicos, outras espécies como Lutzomyia cruzi também atuam como vetores competentes.',

    viasDeTransmissaoVetorialENaoVetorial: 'A transmissão natural primária e epidemiologicamente sustentada ocorre pela picada de fêmeas infectadas de flebotomíneos hematófagos, que necessitam do repasto sanguíneo para a maturação dos ovos. No entanto, vias não vetoriais secundárias encontram-se plenamente documentadas na literatura médica contemporânea e assumem enorme relevância clínica: (1) Transmissão venérea através do sêmen de machos infectados contendo amastigotas viáveis; (2) Transmissão vertical transplacentária da cadela prenhe para os fetos; (3) Transmissão iatrogênica transfusional por transfusão de sangue total ou concentrado de hemácias colhido de doadores assintomáticos portadores de L. infantum; e (4) Transmissão por mordedura ou contato direto de secreções sanguinolentas entre cães com feridas ativas.',

    dadosEpidemiologicosManualMinisterioSaude2026: 'O Manual de Vigilância e Controle da Leishmaniose Visceral do Ministério da Saúde do Brasil (2a ed., 2026) consolida as diretrizes operacionais de saúde pública no território nacional. O cão é identificado como o principal reservatório doméstico da doença em ambiente urbano devido à sua proximidade com os seres humanos, elevada prevalência de infecção e alta densidade parasitária na derme cutânea (mesmo em animais clinicamente assintomáticos), tornando-o altamente infectante para as populações de flebotomíneos vetores.',

    reservatorioCaninoEInterfaceComSaudePublica: 'A alta densidade de flebotomíneos associada à presença de cães infectados no ambiente doméstico ou peridoméstico eleva substancialmente o risco de transmissão para humanos, nos quais a leishmaniose visceral (calazar) pode ser letal em mais de 90% dos casos não tratados. O cão, portanto, constitui um elo de vigilância epidemiológica contínua. As ações de controle englobam controle químico e ambiental do vetor, uso obrigatório de coleiras repelentes e inseticidas nos caninos e diagnóstico sorológico e parasitológico conforme os manuais do Ministério da Saúde.'
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
    transmissao: 'A transmissão biológica ocorre pela inoculação de promastigotas por flebotomíneos fêmeas após repasto prévio em hospedeiro infectado com carga parasitária dérmica. O parasita cumpre desenvolvimento flagelado no tubo digestivo do inseto em 4 a 7 dias antes da nova picada. Vias secundárias compreendem inseminação/cópula por sêmen infectado, transmissão congênita transplacentária e contaminação hemotransfusional.'
  },

  pathophysiology: {
    glomerulonefriteEDeposicaoDeImunocomplexos: 'O rim é o órgão prognosticamente mais relevante e o principal determinante de sobrevida na leishmaniose canina. A nefropatia é primariamente glomerular e decorre da deposição persistente de imunocomplexos circulantes de tamanho intermediário na matriz mesangial e ao longo da membrana basal glomerular. Essa deposição deflagra ativação clássica do sistema complemento, proliferação mesangial e endotelial e influxo de células inflamatórias, configurando glomerulonefrite membranoproliferativa (GNMP) ou proliferativa mesangial. A lesão podocitária resultante rompe a barreira de carga e tamanho da membrana de filtração, permitindo o extravasamento massivo de albumina e antitrombina para a urina. Como consequência, a proteinúria glomerular antecede em meses a elevação dos níveis séricos de creatinina e SDMA. Estudo prospectivo multicêntrico recente (Peris-Grau et al., 2026) demonstrou que novos biomarcadores urinários de lesão tubular, notadamente a lipocalina associada à gelatinase de neutrófilos (uNGAL) e a gama-glutamiltransferase urinária (uGGT), elevam-se precocemente em cães com leishmaniose antes do colapso da taxa de filtração glomerular, sinalizando dano nefronal túbulo-intersticial secundário à sobrecarga proteica tubular e à isquemia microvascular.',

    mielofisiologiaEAnemiaMultifatorial: 'A anemia na leishmaniose canina e felina é tipicamente normocítica, normocrômica e não regenerativa, apresentando fisiopatologia multifatorial: (1) Anemia de doença crônica ou de inflamação (AID) mediada pelo eixo hepcidina-ferroportina, no qual citocinas inflamatórias (IL-6 e TNF-alfa) induzem a síntese hepática excessiva de hepcidina, degradando os canais de ferroportina nos enterócitos e macrófagos do baço e sequestrando o ferro nos estoques corporais sem disponibilizá-lo para a eritropoiese; (2) Infiltração plasmo-histiocitária medular difusa pelo protozoário, ocupando os nichos hematopoiéticos e suprimindo a linhagem eritroide; (3) Encurtamento da sobrevida eritrocitária por hemólise extravascular no sistema reticuloendotelial esplênico e hepático ativado; e (4) Redução na síntese de eritropoietina (EPO) conforme a glomerulopatia progride para doença renal crônica avançada. A trombocitopenia ocorre frequentemente por sequestro esplênico, consumo em focos de vasculite ou destruição imunomediada induzida por anticorpos antiplaquetários.',

    espectroDermatologicoEImunopatologiaCutanea: 'A pele é o leito de maior carga parasitária e expressão clínica na espécie canina, manifestando-se por quatro padrões dermatológicos fundamentais (WAVD 2025; Saridomichelakis & Koutinas, 2014): (1) Dermatite esfoliativa seca não pruriginosa (padrão mais frequente, presente em até 80% dos cães doentes), caracterizada por descamação lamelar prateada difusa, opacidade pilosa e hipotricose associada a infiltrado linfo-histiocitário perianexial e perivascular; (2) Alopecia periocular com descamação e blefarite (sinal clássico do cão de óculos), decorrente de tropismo inflamatório pelas margens palpebrais e derme periorbitária; (3) Dermatite ulcerativa profunda em proeminências ósseas e junções mucocutâneas, secundária a vasculite necrosante por imunocomplexos e isquemia cutânea focal; e (4) Onicogrifose patológica rápida e exuberante, definida pelo crescimento desmesurado, espessamento e curvatura anormal das unhas por hiperqueratose do leito ungueal.',

    figurasClinicasIntegradas: 'As imagens a seguir ilustram os achados citológicos, parasitológicos, vetoriais e as lesões clínicas dermatológicas e oftálmicas patognomônicas da leishmaniose em cães e gatos.'
  },

  figures: [
    {
      id: 'fig-leish-01',
      title: 'Flebotomíneo Vetor Fêmea (Lutzomyia longipalpis) após Repasto Sanguíneo',
      url: '/consulta-vet/leishmaniose/lutzomyia-longipalpis-vetor-flebotomineo.jpg',
      legend: 'Fêmea ingurgitada de Lutzomyia longipalpis (mosquito-palha) após hematofagia. O inseto é o vetor biológico e elo epidemiológico fundamental de Leishmania infantum no Brasil e nas Américas, transmitindo promastigotas metacíclicos durante o repasto sanguíneo (Ray Wilson, Liverpool School of Tropical Medicine, CC BY 2.5).',
      source: 'Wikimedia Commons / PLoS Pathogens (CC BY 2.5)'
    },
    {
      id: 'fig-leish-02',
      title: 'Demonstração Citológica de Macrófago com Amastigotas de Leishmania spp.',
      url: '/consulta-vet/leishmaniose/leishmania-amastigotas-macrofago-citologia.jpg',
      legend: 'Fotomicrorganografia de citologia de aspirado de linfonodo corada com Giemsa demonstrando macrófago contendo numerosas formas amastigotas intracelulares de Leishmania spp. Cada amastigota mede cerca de 2 a 4 um e apresenta núcleo esférico e cinetoplasto característico em forma de bastão. A observação citológica direta constitui o padrão ouro para confirmação diagnóstica definitiva (Stefan Walkowski, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-leish-03',
      title: 'Dermatopatia Esfoliativa Canina com Alopecia Periocular (Sinal dos Óculos)',
      url: '/consulta-vet/leishmaniose/leishmaniose-canina-dermatopatia-desquamativa.jpg',
      legend: 'Cão acometido por leishmaniose visceral exibindo o fenótipo dermatológico clássico com descamação esfoliativa facial difusa, blefarite crônica e alopecia periocular concêntrica bilateralmente simétrica, conhecida clinicamente como sinal dos óculos da leishmaniose (Wikimedia Commons, CC BY-SA 3.0).',
      source: 'Wikimedia Commons (CC BY-SA 3.0)'
    },
    {
      id: 'fig-leish-04',
      title: 'Onicogrifose Patológica Grave e Caquexia em Cão com Calazar',
      url: '/consulta-vet/leishmaniose/leishmaniose-canina-onicogrifose-calazar.jpg',
      legend: 'Quadro avançado de leishmaniose visceral canina (calazar) evidenciando onicogrifose patológica exuberante, espessamento de coxins plantares, hipotricose de membros e caquexia progressiva associada à produção crônica de citocinas inflamatórias catabólicas como TNF-alfa (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-leish-05',
      title: 'Leishmaniose Felina: Uveíte Granulomatosa Aguda com Hifema',
      url: '/consulta-vet/leishmaniose/leishmaniose-felina-uveite-hifema.png',
      legend: 'Paciente felino acometido por leishmaniose clínica apresentando uveíte anterior granulomatosa unilateral grave com exsudato inflamatório na câmara anterior e hifema evidente. A apresentação ocular e as lesões cutâneas nodulares são as marcas da doença clínica no gato, demandando investigação conjunta de imunossupressão por FIV/FeLV conforme o consenso ABCD 2026 (CC BY 4.0).',
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
      description: 'Avaliação inicial abrangente em pacientes de áreas endêmicas ou com histórico de viagem. O hemograma revela anemia normocítica normocrômica não regenerativa em graus variáveis e trombocitopenia leve a moderada. O perfil bioquímico evidencia hiperproteinemia marcante decorrente de hipergamaglobulinemia, hipoalbuminemia e inversão grave da relação albumina:globulina (A:G < 0,6). A eletroforese de proteínas séricas (SPE) demonstra o traçado clássico de hipergamaglobulinemia policlonal com elevação de base ampla na fração gama e beta-gama. A urinálise completa complementada pela relação proteína:creatinina urinária (UPC) é obrigatória para detectar glomerulonefrite incipiente antes da perda de filtração glomerular e azotemia.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Demonstração Parasitológica Direta (Citologia Aspirativa) — Padrão Ouro Confirmatório',
      description: 'Método padrão ouro confirmatório definitivo. Realiza-se punção aspirativa por agulha fina (PAAF) de linfonodos aumentados (poplíteos ou pré-escapulares), medula óssea (crista ilíaca ou esterno) ou imprint de lesões cutâneas ulceradas ou nódulos. As lâminas são coradas com Giemsa, Wright ou Panótico Rápido e inspecionadas sob objetiva de imersão a 1000x. A identificação inequívoca de amastigotas intracelulares no citoplasma de macrófagos (estruturas ovoides de 2 a 4 um com núcleo azul-avermelhado e cinetoplasto perpendicular em bastão) sela o diagnóstico de infecção ativa com 100% de especificidade.',
      isGoldStandard: true
    },
    {
      stepNumber: 3,
      title: 'Sorologia Quantitativa e Titulação de Anticorpos (RIFI e ELISA)',
      description: 'Quantificação da resposta humoral através de Reação de Imunofluorescência Indireta (RIFI) ou ensaios imunoenzimáticos (ELISA) calibrados. Títulos muito elevados (superiores a 3 a 4 vezes o ponto de corte do laboratório) em cães com manifestações clínicas típicas apresentam forte correlação com infecção ativa de alta carga. Títulos baixos a limítrofes indicam apenas exposição ou resposta imune controlada, exigindo confirmação molecular ou acompanhamento serológico em 60 a 90 dias, sendo estritamente contraindicado iniciar tratamento apenas com base em títulos baixos.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Diagnóstico Molecular por PCR Quantitativo em Tempo Real (qPCR)',
      description: 'Detecção e quantificação de DNA de Leishmania infantum por qPCR com amplificação de alvos conservados (kDNA minicírculos ou DNA ribossomal 18S). O ensaio deve ser realizado prioritariamente em amostras de tecidos com alta carga parasitária (aspirado de medula óssea, linfonodo ou pele lesada). O sangue periférico apresenta menor sensibilidade devido à oscilação da parasitemia livre, não devendo seu resultado negativo afastar o diagnóstico em animais com suspeita sólida.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Enquadramento Estruturado no Algoritmo CLWG 2026 e Investigação de Coinfecções',
      description: 'Aplicação do fluxograma do CLWG 2026 integrando dados clínicos, parasitológicos e sorológicos para categorizar o paciente na Classe A (não tratar), Classe B (não tratar, monitorar), Classe C (tratar doença ativa) ou Classe D (tratar com suporte de UTI). Em regiões tropicais e subtropicais, pesquisar obrigatoriamente coinfecções transmitidas por carrapatos (Ehrlichia canis, Anaplasma platys, Babesia vogeli) que agravam a trombocitopenia e a glomerulonefrite.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Estadiamento Renal Longitudinal (Diretrizes IRIS) e Biomarcadores de Dano Precoce',
      description: 'Estadiamento da função renal conforme as diretrizes consensuais da International Renal Interest Society (IRIS). Mensuração seriada de creatinina plasmática e SDMA em pacientes estáveis e hidratados, associada ao monitoramento estrito da proteinúria pelo UPC (classificando em não proteinúrico <0,2, limítrofe 0,2-0,5 ou proteinúrico >0,5) e aferição da pressão arterial sistólica. Incorporação de uNGAL e uGGT como marcadores precoces de agressão tubular.',
      isGoldStandard: false
    }
  ],

  treatment: {
    consensoTerapeuticoInternacionalWAVD2025ECLWG2026: 'O consenso internacional europeu (CLWG 2026 e WAVD 2025) recomenda como terapia de primeira escolha a combinação sinérgica de um fármaco leishmanicida de ação rápida com um fármaco leishmaniostático prolongado. No protocolo internacional clássico, a primeira escolha consiste em Antimoniato de Meglumina na dose de 100 mg/kg por via subcutânea a cada 24 horas (ou fracionado em 50 mg/kg SC a cada 12 horas) durante 28 dias consecutivos, combinado com Alopurinol na dose de 10 mg/kg por via oral a cada 12 horas durante um período contínuo de 6 a 12 meses. O estudo do CLWG 2026 ressalta que o antimoniato exibe superior taxa de controle parasitológico sustentado a longo prazo em comparação à miltefosina, embora a miltefosina oral seja amplamente aceita como alternativa principal em pacientes com intolerância a injeções ou lesão renal leve a moderada.',

    legislacaoBrasileiraERegulamentacaoMAPA: 'No Brasil, a conduta terapêutica da leishmaniose visceral canina é submetida a rígida regulamentação legal sanitária e de saúde pública. A Portaria Interministerial n. 1.426/2008 (Ministério da Saúde e Ministério da Agricultura, Pecuária e Abastecimento - MAPA) proíbe taxativamente o tratamento de cães com medicamentos de uso humano registrados para a leishmaniose visceral humana, vedando formalmente o uso de Antimoniato de Meglumina humano (Glucantime) e Anfotericina B em caninos, com a finalidade de evitar a indução de cepas parasitárias resistentes em pacientes humanos. O único medicamento leishmanicida atualmente registrado e aprovado pelo MAPA para uso veterinário específico em cães no Brasil é a Miltefosina (Milteforan, Virbac). Qualquer plano de tratamento no território brasileiro deve respeitar estritamente essa base legal, combinando o produto registrado ao alopurinol manipulado ou comercial.',

    protocoloMiltefosinaMecanismoEPosologia: 'A miltefosina é um análogo sintético de alquilfosfocolina que interfere na biossíntese da membrana celular de Leishmania, inibe a sinalização por fosfolipase C e induz apoptose programada nos amastigotas. A posologia preconizada e validada em bula é de 2 mg/kg por via oral, administrada uma vez ao dia (a cada 24 horas) durante exatamente 28 dias consecutivos. A administração deve ser realizada impreterivelmente junto a uma refeição completa ou misturada ao alimento úmido para reduzir a agressão direta à mucosa gástrica. Os principais efeitos adversos decorrem de irritação gastrointestinal, manifestando-se por vômitos esporádicos, regurgitação, diarreia e anorexia transitória. O uso de antieméticos e protetores de mucosa gástrica pode ser associado se necessário.',

    protocoloAlopurinolManejoDaXantinuria: 'O alopurinol é um análogo de purina que atua como inibidor competitivo da enzima xantina oxidase. Nas células de Leishmania (que são incapazes de sintetizar purinas de novo e dependem de vias de salvamento), o alopurinol é incorporado ao RNA parasitário como um análogo defeituoso, interrompendo a síntese proteica e bloqueando a replicação do protozoário (efeito leishmaniostático). A dose padrão é de 10 mg/kg por via oral a cada 12 horas (BID), mantida por um período mínimo de 6 a 12 meses. O principal efeito adverso crônico é a xantinúria iatrogênica: ao inibir a xantina oxidase do hospedeiro, a conversão de xantina em ácido úrico é bloqueada, gerando acúmulo e precipitação de cristais de xantina nos túbulos renais e bexiga, deflagrando urolitíase por xantina (cálculos radiotransparentes não visíveis ao raio-X simples). O manejo preventivo exige exame de sedimento urinário a cada 60 a 90 dias, ultrassonografia abdominal seriada e transição obrigatória para dietas veterinárias formuladas com teores reduzidos de purinas caso surja cristalúria acentuada.',

    marbofloxacinaEOutrosAgentesAlternativos: 'A marbofloxacina (fluoroquinolona de terceira geração) tem sido investigada em protocolos de 2 a 4 mg/kg/dia por 28 dias em associações com alopurinol. Contudo, tanto as diretrizes da WAVD 2025 quanto o consenso CLWG 2026 ressaltam que a evidência de eficácia da marbofloxacina é fraca a moderada e sua capacidade de redução da carga parasitária é expressivamente inferior à da miltefosina e do antimoniato de meglumina, não devendo substituir os fármacos de primeira linha a menos que haja contraindicação absoluta a ambos.',

    usoCriticoDeCorticosteroidesEmEmergenciasImunes: 'O emprego de corticosteroides na leishmaniose canina representa um dos dilemas clínicos mais delicados na medicina veterinária interna. A imunossupressão cega é terminantemente contraindicada, pois suprime a imunidade celular Th1 residual e pode deflagrar explosão catastrófica da replicação parasitária e colapso clínico. No entanto, quando o paciente manifesta complicações fulminantes mediadas pela deposição de imunocomplexos — tais como glomerulonefrite membranoproliferativa aguda com síndrome nefrótica e proteinúria descontrolada (UPC > 3,0), vasculite necrosante com epistaxe refratária ou uveíte anterior grave com risco de cegueira imediata —, o uso temporário de glicocorticoides em doses anti-inflamatórias (prednisolona 0,5 a 1,0 mg/kg/dia) ou imunossupressoras transitórias é preconizado para conter a destruição tecidual nefronal ou ocular, devendo ser instituído obrigatoriamente sob cobertura leishmanicida plena com miltefosina.',

    protocoloTerapeuticoEmFelinosABCD2026: 'Em gatos acometidos por leishmaniose clínica (ABCD Feline 2026), a evidência terapêutica apoia-se predominantemente em séries de casos e estudos prospectivos de pequenos grupos. O protocolo mais amplamente validado consiste na administração de Alopurinol na dose de 10 a 20 mg/kg por via oral uma vez ao dia (ou fracionado em 10 mg/kg BID). A miltefosina pode ser empregada em felinos na dose de 2 mg/kg/dia VO por 28 dias, monitorando-se rigorosamente a tolerância gastrointestinal e a função hepática e renal. O prognóstico em gatos é altamente dependente da presença de coinfecções retrovirais (FIV e FeLV) e do grau de acometimento nefronal.',

    criteriosDeRespostaRecidivaEDesmame: 'A remissão clínica é caracterizada pela resolução das lesões dermatológicas, regressão da linfadenomegalia, recuperação do escore corporal e normalização do hemograma e das proteínas plasmáticas (relação A:G > 0,6). O tratamento com alopurinol jamais deve ser suspenso antes de 6 a 12 meses de evolução estável. A suspensão do alopurinol pode ser considerada quando o animal mantiver quadro clínico perfeito, função renal e UPC normais e títulos de anticorpos em sorologia quantitativa estáveis ou negativos em pelo menos duas coletas semestrais consecutivas. A recidiva clínica é reconhecida pela ascensão de títulos sorológicos em duas ou mais diluições, reaparecimento de proteinúria ou recrudescência de lesões cutâneas.'
  },

  complications: {
    falenciaRenalTerminal: 'A progressão da glomerulonefrite membranoproliferativa por imunocomplexos para esclerose glomerular global e fibrose túbulo-intersticial irreversível conduz à Doença Renal Crônica em estágio avançado (IRIS estágios 3 e 4), configurando a principal causa de óbito ou eutanásia justificada em cães acometidos.',

    urolitiaseObstrutivaPorXantina: 'A inibição sustentada da xantina oxidase pelo alopurinol sem dieta com restrição de purinas resulta em deposição de urólitos radiotransparentes de xantina em bexiga e uretra, com risco de obstrução uretral aguda, dilatação vesical dolorosa e uremia pós-renal obstrutiva.',

    comprometimentoVisualECegueiraBilateral: 'A evolução de uveíte anterior granulomatosa crônica não tratada pode acarretar sinequias posteriores, catarata secundária, descolamento seroso de retina e glaucoma hipertensivo secundário refratário, culminando em amaurose bilateral definitiva.',

    amiloidoseSecundariaERupturasVasculares: 'O estímulo inflamatório antigênico crônico prolongado pode culminar na deposição de substância amiloide A sérica (AA) no glomérulo e interstício renal, deflagrando perda proteica maciça refratária; fenômenos de vasculite necrosante sistêmica podem induzir episódios de epistaxe torrencial e hemorragias digestivas.'
  },

  prevention: {
    repelentesEInseticidasVetoriaisCaninos: 'O pilar primordial e insubstituível da prevenção é a utilização permanente e ininterrupta de inseticidas e repelentes com eficácia comprovada contra flebotomíneos (efeito anti-feeding). Recomenda-se o uso continuado de coleiras impregnadas com deltametrina a 4% (trocadas rigorosamente a cada 4 a 6 meses conforme a bula) ou pipetas tópicas à base de permetrina associada a imidacloprida ou dinotefurano (aplicadas mensalmente). A proteção repelente impede que o inseto pique o animal, bloqueando a transmissão para cães sadios e impedindo que cães infectados transmitam o parasita para o vetor.',

    manejoAmbientalEControleDeFocos: 'Medidas de higiene ambiental no peridomicílio são fundamentais para erradicar os criadouros de flebotomíneos, caracterizados por solo úmido e sombreado rico em matéria orgânica em decomposição (folhas secas, fezes de animais de criação, restos de podas de árvores e lixo orgânico). Recomenda-se a instalação de telas de malha fina (menores que 1 mm) em canis e janelas para barrar a entrada do inseto no período crepuscular e noturno.',

    situacaoVacinalNoBrasil: 'No Brasil, a vacina contra leishmaniose visceral canina disponível comercialmente (Leish-Tec) teve sua fabricação e comercialização suspensas preventivamente pelo Ministério da Agricultura em 2023 por desvios de conformidade em lotes analíticos. A vacinação, quando disponível, não dispensa o uso concomitante obrigatório de coleiras e produtos repelentes, pois atua atenuando a progressão clínica sem conferir imunidade esterilizante contra a picada do flebotomíneo.',

    alertaToxicologicoCriticoPermetrinaEmFelinos: 'ALERTA MÁXIMO DE SEGURANÇA: Produtos tópicos ou coleiras contendo permetrina e outros piretroides concentrados formulados para cães são ESTREITAMENTE CONTRAINDICADOS e potencialmente FATAIS para a espécie felina. Os gatos possuem deficiência fisiológica na enzima hepática glicuroniltransferase (UGT), sendo incapazes de metabolizar a permetrina, cuja exposição acarreta síndrome neurotóxica grave com tremores musculares intensos, convulsões intratáveis, hipertermia e óbito rápido. Para felinos, a proteção vetorial deve utilizar exclusivamente produtos registrados e seguros para a espécie, tais como coleiras à base de flumetrina formuladas para gatos ou manejo ambiental rigoroso mantendo o animal em ambientes fechados (indoor).'
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
