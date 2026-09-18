import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const discinesiaParoxisticaCaesGatosSeed: DiseaseRecord = {
  id: 'disease-discinesia-paroxistica-caes-gatos',
  slug: 'discinesia-paroxistica-caes-gatos',
  title: 'Discinesia Paroxística em Cães e Gatos',
  subtitle:
    'Distúrbios episódicos do movimento, fisiopatologia dos circuitos dos núcleos da base, diferenciação de crises epilépticas e abordagem etiológica contemporânea',
  synonyms: [
    'Paroxysmal Dyskinesia',
    'PxD',
    'Episodic Falling Syndrome',
    'Scottie Cramp',
    'Paroxysmal Gluten-Sensitive Dyskinesia',
    'Distúrbio do Movimento Paroxístico',
    'Cãibra do Scottie',
    'Síndrome da Queda Episódica',
    'Distonia Paroxística Canina e Felina',
  ],
  species: ['dog', 'cat'],
  category: 'neurologia',
  categories: ['neurologia', 'medicina-felina', 'urgencias', 'urgencia-emergencia', 'genetica-clinica'],
  tags: [
    'neurologia',
    'distúrbio do movimento',
    'discinesia',
    'núcleos da base',
    'epilepsia',
    'gluten',
    'hipertireoidismo',
    'cavalier',
    'border terrier',
    'felinos',
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['discinesia-paroxistica-caes-gatos'],

  figures: [
    {
      url: '/consulta-vet/discinesia-paroxistica/fluxograma-etiologico-dellwig2026.webp',
      legend:
        'Figura 1 — Classificação etiológica estruturada da discinesia paroxística canina em coorte terciária de 70 cães. Distribuição entre subtipos idiopáticos (61,4%), genéticos (22,9%), relacionados ao glúten (12,9%), reativos (1,4%) e estruturais (1,4%). Adaptado de Dellwig et al. (2026), Frontiers in Veterinary Science, sob licença CC BY 4.0.',
      caption:
        'Fluxograma etiológico contemporâneo demonstrando que o fenótipo clínico orienta, mas não substitui, a triagem investigativa estruturada.',
      source: 'Dellwig et al. (2026). DOI: 10.3389/fvets.2026.1846296 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/discinesia-paroxistica/distribuicao-topografica-dellwig2026.webp',
      legend:
        'Figura 2 — Distribuição anatômica e topográfica dos sinais paroxísticos involuntários no corpo e membros de 70 cães. Demonstração de acometimento generalizado, apendicular e axial, evidenciando que a topografia isolada não permite discriminar a causa subjacente. Adaptado de Dellwig et al. (2026), Frontiers in Veterinary Science, sob licença CC BY 4.0.',
      caption:
        'Distribuição topográfica dos movimentos distônicos e discinéticos entre membros torácicos, pélvicos, cabeça e tronco.',
      source: 'Dellwig et al. (2026). DOI: 10.3389/fvets.2026.1846296 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/discinesia-paroxistica/triagem-sorologica-gluten-rogers2023.webp',
      legend:
        'Figura 3 — Fluxograma de triagem sorológica de sensibilidade ao glúten (anticorpos anti-transglutaminase 2 IgA e anti-peptídeo de gliadina desamidada IgG) em cães com discinesia paroxística de diversas raças. Adaptado de Rogers et al. (2023), Frontiers in Veterinary Science, sob licença CC BY 4.0.',
      caption:
        'Algoritmo de rastreamento sorológico e seleção de candidatos ao ensaio terapêutico estrito sem glúten.',
      source: 'Rogers et al. (2023). DOI: 10.3389/fvets.2023.1119441 (Open Access, CC BY 4.0).',
    },
    {
      url: '/consulta-vet/discinesia-paroxistica/linha-tempo-resposta-terapeutica-fvets2023.webp',
      legend:
        'Figura 4 — Linha do tempo clínica de longo prazo documentando episódios neurológicos paroxísticos, intervenções dietéticas de eliminação sem glúten e resposta a fármacos neuromoduladores em cão com discinesia paroxística. Adaptado de Frontiers in Veterinary Science (2023), sob licença CC BY 4.0.',
      caption:
        'Correlação temporal seriada entre manejo nutricional, desmame de anticonvulsivantes e remissão sustentada dos episódios motores.',
      source: 'Frontiers in Veterinary Science (2023). DOI: 10.3389/fvets.2023.1054251 (Open Access, CC BY 4.0).',
    },
  ],

  quickSummary:
    'A discinesia paroxística (PxD) constitui uma síndrome neurológica caracterizada por episódios autolimitados e recorrentes de movimentos involuntários anormais (hipercinesia, distonia sustentada ou intermitente e tônus muscular desordenado), ocorrendo em pacientes com nível de consciência preservado, ausência habitual de fase pós-ictal e exame neurológico interictal rigorosamente normal. Fisiopatologicamente, decorre de falha no circuito inibitório e de seleção motora (gating) dos núcleos da base e vias tálamo-corticais, com frequente envolvimento modulatório cerebelar. Em cães, abrange formas idiopáticas, genéticas ligadas a raças específicas (mutações em BCAN, PIGN, PCK2, TNR e SOD1), formas reativas metabólicas (hipocalcemia) e a discinesia sensível ao glúten (comprovada no Border Terrier). Em felinos, coortes recentes de 2026 superaram o estigma de acometimento exclusivo do Sphynx, caracterizando uma síndrome de distonia migratória e marcha em "câmera lenta" (slow motion) em diversas raças, além de revelarem a discinesia paroxística como manifestação de encefalopatia metabólica reversível induzida pelo hipertireoidismo. A análise de vídeos domésticos de alta definição constitui a ferramenta diagnóstica propedêutica padrão ouro para diferenciá-la de crises epilépticas focais motoras.',

  quickDecisionStrip: [
    'Consciência preservada não exclui crise epiléptica focal motora; a avaliação propedêutica detalhada por vídeo é mandatória.',
    'Nunca inicie anticonvulsivantes empíricos para discinesia paroxística típica sem antes documentar descargas epileptiformes ou refratariedade aos manejos de base.',
    'A resposta positiva a levetiracetam ou fenobarbital não prova epilepsia, pois fármacos neuromoduladores atuam sobre múltiplos circuitos motores e sinápticos.',
    'Exija e analise o vídeo doméstico do episódio em velocidade normal e lenta antes de firmar hipótese diagnóstica no plantão.',
    'Rastreie cálcio total e ionizado, glicemia e eletrólitos de emergência; hipocalcemia é causa reativa reversível de espasmos distônicos.',
    'Em felinos adultos ou idosos com episódios discinéticos, dose obrigatoriamente o T4 total; a correção do hipertireoidismo cura a discinesia (Espinosa et al., 2026).',
    'A discinesia felina não é restrita ao Sphynx; gatos sem raça definida, Bengal e Ragdoll apresentam distonia migratória e marcha em câmera lenta (Liatis et al., 2026).',
    'Border Terriers com distonia e tremores devem ser submetidos à exclusão estrita de glúten por 3 a 6 meses; petiscos casuais anulam o teste.',
    'Acetazolamida é formalmente contraindicada em gatos pelo formulário BSAVA ("Cats: do not use") devido à suscetibilidade a acidose e hipocalemia severas.',
    'Durante o episódio paroxístico, proíba contenção física forçada; oriente o tutor a proteger o ambiente contra traumas e registrar o evento em vídeo.',
  ],

  quickSummaryRich: {
    lead: 'A discinesia paroxística é uma síndrome de falha de filtragem motora extrapiramidal (gating dos núcleos da base), manifestada por crises de distonia e hipertonia com sensorium preservado e exame interictal normal, exigindo diferenciação meticulosa de crises epilépticas.',
    leadHighlights: [
      'Gating dos núcleos da base',
      'Consciência preservada',
      'Ausência de pós-ictal',
      'Padrão ouro em vídeo',
      'Discinesia sensível ao glúten',
      'Hipertireoidismo felino',
    ],
    pillars: [
      {
        title: 'Fisiopatologia do Gating Extrapiramidal',
        body: 'Desequilíbrio entre a via estriadotamâmica direta facilitadora (receptores D1) e a via indireta inibidora (receptores D2), associado a disfunções na matriz perineuronal (brevican) e no metabolismo mitocondrial, permitindo o escape de programas motores involuntários.',
        highlights: ['Vias direta e indireta', 'Dopamina e D1/D2', 'Brevican (BCAN)', 'Redes perineuronais'],
      },
      {
        title: 'Semiologia e Vídeo como Padrão Ouro',
        body: 'O vídeo doméstico em alta definição capturado pelo tutor é o pilar propedêutico central: permite atestar responsividade a estímulos verbais e visuais, tônus muscular distônico, ausência de salivação autonômica e recuperação instantânea sem déficits pós-ictais.',
        highlights: ['Gravação domiciliar', 'Teste de responsividade', 'Zero pós-ictal', 'Semiologia dinâmica'],
      },
      {
        title: 'Painel Etiológico e Particularidades de Raça',
        body: 'Classificação estruturada em causas idiopáticas (61%), genéticas comprovadas (23%), sensíveis ao glúten (13%), metabólicas reativas e estruturais. Rastreamento genético específico (BCAN, PIGN, PCK2, TNR, SOD1) e exclusão imunológica alimentar.',
        highlights: ['Dellwig 2026 (70 cães)', 'BCAN no CKCS', 'Glúten no Border Terrier', 'Hipocalcemia reativa'],
      },
      {
        title: 'Neurofarmacologia e Terapia Direcionada',
        body: 'Manejo conservador e redução de estresse nas formas benignas. Dieta estrita sem glúten no Border Terrier. Acetazolamida no CKCS e cães selecionados (proibida em gatos). Tratamento do hipertireoidismo em gatos. Cautela com tolerância a benzodiazepínicos.',
        highlights: ['Dieta sem glúten', 'Acetazolamida canina', 'Contraindicação felina', 'Tireoidectomia / Metimazol'],
      },
    ],
    diagnosticFlow: [
      {
        label: 'Etapa 1: Triagem de Vídeo e Avaliação da Consciência',
        timing: 'Imediato no atendimento',
        detail:
          'Verificação de responsividade, seguimento visual, ausência de sinais autonômicos grosseiros (micção/salivação) e término abrupto sem confusão mental pós-ictal.',
      },
      {
        label: 'Etapa 2: Exame Neurológico Interictal Completo',
        timing: 'Primeira consulta',
        detail:
          'Exame rigoroso dos pares cranianos, marcha, propriocepção postural e reflexos segmentares; qualquer anormalidade interictal redireciona para investigação de lesão estrutural encefálica.',
      },
      {
        label: 'Etapa 3: Banco Laboratorial Mínimo e Exclusão Reativa',
        timing: '24 a 48 horas',
        detail:
          'Hemograma, bioquímica sérica, glicemia, cálcio ionizado, eletrólitos, creatina quinase (CK), ácidos biliares e dosagem obrigatória de T4 total em felinos.',
      },
      {
        label: 'Etapa 4: Painel Genético ou Testes Específicos',
        timing: 'Conforme perfil racial',
        detail:
          'Investigação de variantes conhecidas em Cavalier (BCAN), Wheaten (PIGN), Sheltie (PCK2), Weimaraner (TNR) e sorologia anti-TG2/anti-gliadina no Border Terrier.',
      },
      {
        label: 'Etapa 5: Neuroimagem Avançada (RM) e Líquor',
        timing: 'Casos atípicos ou idosos',
        detail:
          'Ressonância magnética de alto campo e análise de líquor cefalorraquidiano indicadas se houver déficits interictais, início tardio, dor cervical ou assimetria motora.',
      },
    ],
    treatmentFlow: [
      {
        label: 'Fase 1: Manejo de Emergência e Proteção Ambiental',
        timing: 'Durante o ataque',
        detail:
          'Não tentar conter o paciente à força; remover escadas, piscinas e objetos pontiagudos; acalmar o ambiente com penumbra e silêncio; registrar o tempo exato de duração.',
      },
      {
        label: 'Fase 2: Tratamento Etiológico da Causa Reativa',
        timing: 'Após laudo laboratorial',
        detail:
          'Correção parenteral e oral de cálcio na hipocalcemia; controle médico ou definitivo do hipertireoidismo felino com metimazol, cirurgia ou iodo radioativo (remissão em 100%).',
      },
      {
        label: 'Fase 3: Teste Terapêutico com Dieta sem Glúten',
        timing: 'Manutenção (mínimo 3 a 6 meses)',
        detail:
          'Prescrição rigorosa de alimento comercial ou caseiro formulado com zero glúten para Border Terriers e raças reativas; veto irrestrito a petiscos, medicamentos palatáveis e contaminação cruzada.',
      },
      {
        label: 'Fase 4: Farmacoterapia Neuromoduladora Seletiva',
        timing: 'Casos frequentes ou debilitantes',
        detail:
          'Em cães: acetazolamida (4-8 mg/kg VO q8-12h) no CKCS com monitoramento eletrolítico; clonazepam sob risco de tolerância; fluoxetina no Scottie cramp; levetiracetam como alternativa neuromoduladora.',
      },
      {
        label: 'Fase 5: Acompanhamento e Diário Clínico do Tutor',
        timing: 'Retornos a cada 1 a 3 meses',
        detail:
          'Monitoramento da frequência e gravidade dos episódios em calendário dedicado; eletrólitos e gasometria séricos para usuários de acetazolamida; rastreamento de peso e função tireoidiana.',
      },
    ],
  },

  etiology: {
    conceitoDisturbioMovimentoVsCrise:
      'A discinesia paroxística representa uma síndrome clínica neurológica caracterizada por episódios autolimitados e recorrentes de hiperatividade motora involuntária e distonia, originados no sistema nervoso central, sem comprometimento do sensorium ou atividade epileptiforme cortical primária. Conforme estabelecido no consenso do International Veterinary Canine Dyskinesia Task Force (ECVN, Cerda-Gonzalez et al., 2021) e reiterado por Mandigers et al. (2024), a discinesia constitui um termo guarda-chuva para hipercinesias anormais. Diferencia-se fundamentalmente da distonia, que descreve um tipo semiológico específico de postura anormal mantida por contrações musculares simultâneas de grupamentos agonistas e antagonistas, gerando torção, encurvamento axial ou fixação espasmódica de membros. Diferente das crises epilépticas generalizadas, os episódios de discinesia não evoluem com inconsciência, sialorreia autonômica profusa ou perda esfincteriana típica, e o paciente não apresenta depressão sensorial ou ataxia pós-ictal, retornando imediatamente ao estado basal pré-evento. Todavia, a preservação do sensorium não exclui de forma absoluta crises epilépticas focais motoras isoladas, demandando exame detalhado de vídeos e exclusão de descargas eletroencefalográficas anormais quando disponíveis.',

    neuroanatomiaCircuitosNucleosDaBase:
      'A base neuroanatômica da discinesia paroxística reside na disfunção dos circuitos tálamo-córtico-estriatais e núcleos da base, estruturas subcorticais telencefálicas e diencefálicas responsáveis pela seleção, modulação e frenagem dos programas motores voluntários originados no córtex motor (de Lahunta et al., 5ª ed., Cap. 8, p. 244). Os componentes fundamentais incluem o núcleo caudado, o putâmen (que formam o estriado dorsal), o globo pálido (núcleo endopeduncular nos animais domésticos), o núcleo subtalâmico e a substância negra (porção compacta e porção reticular). O estriado atua como um portão ou filtro inibitório (gating motor): (1) Na via direta, as projeções estriatais gabaérgicas expressando receptores de dopamina D1 inibem o complexo globo pálido interno/substância negra reticular, desinibindo o tálamo ventrolateral e facilitando a execução do movimento motor intencional pelo córtex. (2) Na via indireta, os neurônios estriatais expressando receptores D2 projetam-se ao globo pálido externo e núcleo subtalâmico, culminando em estimulação inibitória reforçada sobre o tálamo, atuando como um freio biológico que suprime movimentos indesejados ou posturas antagônicas. A perda do controle homeostático entre essas vias ou a hiperexcitabilidade cerebelar cruzada via projeções cerebelo-tálamo-estriatais desativa o filtro motor, permitindo o escape de contrações distônicas violentas e involuntárias durante o movimento, a excitação ou a fadiga.',

    tabelaFenotiposCaninosPorRaca: {
      kind: 'clinicalTable',
      title: 'Tabela 1 — Fenótipos Caninos por Raça, Mutações Genéticas, Fisiopatologia e Semiologia',
      columns: [
        { key: 'breed', label: 'Raça Canina' },
        { key: 'gene', label: 'Variante / Gene' },
        { key: 'trigger', label: 'Desencadeante / Início' },
        { key: 'phenotype', label: 'Semiologia e Padrão Motor' },
        { key: 'evidence', label: 'Nível de Evidência' },
      ],
      rows: [
        {
          breed: 'Cavalier King Charles Spaniel (CKCS)',
          gene: 'BCAN (microdeleção autossômica recessiva)',
          trigger: 'Exercício físico, excitação, estresse térmico ou emocional; início de 3 a 7 meses.',
          phenotype:
            'Episodic Falling Syndrome: hipertonia progressiva dos membros, bunny hopping, arqueamento dorsal, postura rígida de espreita ("deer stalking") e queda em decúbito lateral com membros em extensão espástica rígida, mantendo sensorium normal.',
          evidence: 'Consolidada (de Lahunta 5ª ed.; Gill et al., 2012; BSAVA 10ª ed.).',
        },
        {
          breed: 'Soft-Coated Wheaten Terrier',
          gene: 'PIGN (variante em âncoras GPI de membrana)',
          trigger: 'Excitação, ruídos, estresse, início jovem (mediana de 2 anos).',
          phenotype:
            'Postura de "dança" alternante: flexão e extensão rápida e assimétrica dos membros pélvicos, elevação sustentada de um membro posterior com distonia axial e incapacidade momentânea de apoio voluntário.',
          evidence: 'Forte (Nelson & Couto 6ª ed. p. 1106; Kolicheski et al., 2017).',
        },
        {
          breed: 'Border Terrier (CECS / PGSD)',
          gene: 'Sensibilidade imunomediada ao glúten (sorologia anti-TG2 e MGP)',
          trigger: 'Consumo de dietas com glúten (trigo, cevada, centeio); idade jovem a adulta.',
          phenotype:
            'Paroxysmal Gluten-Sensitive Dyskinesia: distonia generalizada, cólicas axiais, arqueamento lombar, tremores grosseiros e quedas; frequentemente associada a sinais gastrointestinais (borborigmos, vômitos) e atopia cutânea.',
          evidence: 'Moderada a forte (Lowrie et al., 2015; Rogers et al., 2023).',
        },
        {
          breed: 'Shetland Sheepdog (Sheltie)',
          gene: 'PCK2 (fosfoenolpiruvato carboxiquinase mitocondrial)',
          trigger: 'Exercício prolongado ou corrida extenuante (Exercise-Induced Dyskinesia).',
          phenotype:
            'Ataxia progressiva induzida pelo esforço associada a hipertonia e espasmos distônicos paroxísticos de membros torácicos e pélvicos decorrente de exaustão energética mitocondrial.',
          evidence: 'Moderada (Mandigers et al., 2024; revisão Frontiers).',
        },
        {
          breed: 'Weimaraner',
          gene: 'TNR (frameshift em tenascina-R da matriz neural)',
          trigger: 'Exercício físico intenso ou atividade esportiva.',
          phenotype:
            'Síndrome de distonia-ataxia paroxística induzida pelo exercício: perda súbita da harmonia motora, hipertonia extensora de membros e colapso dinâmico com recuperação em repouso.',
          evidence: 'Moderada (Mandigers et al., 2024).',
        },
        {
          breed: 'Dachshund (Teckel)',
          gene: 'Poligênica / idiopática familiar',
          trigger: 'Excitação, estresse, transição de repouso para movimento ativo; mediana 3 anos.',
          phenotype:
            'Distonia caudal ("tail dystonia"), cifose acentuada e pseudo-paralisia espástica dos membros pélvicos com arrastamento transitório em decúbito, sem dor espinhal interictal.',
          evidence: 'Série multicêntrica recente de 62 casos (Boyd et al., JVIM 2026).',
        },
        {
          breed: 'Markiesje',
          gene: 'SOD1 (variante loss-of-function pleiotrópica)',
          trigger: 'Atividade motora voluntária em filhotes e jovens.',
          phenotype:
            'Discinesia paroxística juvenil com tremores axiais e rigidez episódica de membros torácicos (distinta da mielopatia degenerativa adulta).',
          evidence: 'Comprovada geneticamente (Mandigers et al., 2024).',
        },
        {
          breed: 'Scottish Terrier (Scottie Cramp)',
          gene: 'Disfunção no turnover central de serotonina (5-HT)',
          trigger: 'Excitação intensa, estresse social, corrida rápida; episódios < 10 minutos.',
          phenotype:
            'Abdução dos membros torácicos, curvatura convexa da coluna lombar (cifose), rigidez extensora dos membros pélvicos e quedas laterais sucessivas ("somersaults") em corrida.',
          evidence: 'Clássica (Nelson & Couto 6ª ed. p. 1183; de Lahunta 5ª ed.).',
        },
      ],
    },

    tabelaClassificacaoEtiologicaDellwig: {
      kind: 'clinicalTable',
      title: 'Tabela 2 — Classificação Etiológica Estruturada da Discinesia Paroxística Canina (Dellwig et al., 2026)',
      columns: [
        { key: 'category', label: 'Classificação Etiológica' },
        { key: 'prevalence', label: 'Frequência (n=70)' },
        { key: 'mechanism', label: 'Mecanismo Fisiopatológico Proposto' },
        { key: 'clinicalFeatures', label: 'Características e Conduta Diagnóstica' },
      ],
      rows: [
        {
          category: 'Discinesia Paroxística Idiopática (PID)',
          prevalence: '43 / 70 (61,4%)',
          mechanism: 'Disfunção funcional sináptica e neuroquímica idiopática dos circuitos dos núcleos da base.',
          clinicalFeatures:
            'Exames laboratoriais, de imagem (RM) e genéticos normais; idade e topografia dos sinais não diferem de outras formas; curso geralmente benigno.',
        },
        {
          category: 'Discinesia Paroxística Genética (PGD)',
          prevalence: '16 / 70 (22,9%)',
          mechanism:
            'Mutações pontuais em proteínas de matriz extracelular (BCAN, TNR), âncoras de membrana (PIGN) ou metabolismo celular (PCK2).',
          clinicalFeatures:
            'Forte correlação com raças puras padronizadas (CKCS, Wheaten, Sheltie, Weimaraner); confirmação por painéis de sequenciamento de DNA comercial.',
        },
        {
          category: 'Discinesia Sensível ao Glúten (PGSD)',
          prevalence: '9 / 70 (12,9%)',
          mechanism: 'Imunorreatividade celular e humoral induzida por prolaminas do glúten com autoanticorpos anti-TG2 e inflamação extrapiramidal.',
          clinicalFeatures:
            'Predomínio em Border Terrier, mas documentada em raças mistas; sorologia anti-TG2/MGP positiva e resposta clínica a ensaio com dieta sem glúten.',
        },
        {
          category: 'Discinesia Paroxística Reativa (PRD)',
          prevalence: '1 / 70 (1,4%)',
          mechanism:
            'Desbalanço iônico ou metabólico extracelular (notadamente hipocalcemia ionizada e encefalopatia metabólica).',
          clinicalFeatures:
            'Queda do limiar de despolarização neuronal e muscular; reversão rápida e completa após restauração da homeostase de cálcio ionizado ou eletrólitos.',
        },
        {
          category: 'Discinesia Paroxística Estrutural (PSD)',
          prevalence: '1 / 70 (1,4%)',
          mechanism: 'Lesões expansivas, vasculares isquêmicas, inflamatórias ou degenerativas comprometendo núcleos basais ou tálamo.',
          clinicalFeatures:
            'Frequentemente associada a déficits neurológicos interictais, assimetria postural focal ou início em idade senil; detectada por RM encefálica.',
        },
      ],
    },

    fenotiposFelinosExpansao2026:
      'Na medicina felina, a discinesia paroxística foi historicamente tratada como enfermidade rara e praticamente restrita a gatos da raça Sphynx (James et al., 2022). No entanto, o estudo multicêntrico internacional de Liatis et al. (2026) publicado no Journal of Small Animal Practice avaliou 25 gatos com registro em vídeo e reformulou o paradigma clínico. Dos 25 gatos, 11 eram domésticos de pelo curto (DSH), havendo também representantes de pelo longo (DLH), Bengal, Ragdoll e Cornish Rex, demonstrando que a doença é amplamente subdiagnosticada na população felina geral. Os achados semiológicos mais frequentes incluíram distonia migratória dos quatro membros (100% dos gatos), bradicinesia episódica com impressão de movimento em "câmera lenta" (slow motion) e marcha agachada/rastejante (44%), cifose toracolombar espasmódica (40%), distonia e elevação rígida da cauda (40%), torcicolos distônicos cervicais (36%) e movimentos rítmicos involuntários de "amassar pão" com os dígitos durante o evento (20%). Todos os pacientes apresentavam exame neurológico interictal rigorosamente normal. Do ponto de vista etiológico, 21 foram classificados presumivelmente como não cinesigênicos idiopáticos e quatro demonstraram potencial associação à dieta sem glúten, consolidando o fenótipo felino como uma síndrome multifatorial.',

    encefalopatiaMetabolicaHipertireoidismo:
      'Em janeiro de 2026, Espinosa et al. publicaram no Journal of Veterinary Internal Medicine um estudo seminal identificando a discinesia paroxística como uma nova e relevante manifestação de encefalopatia metabólica associada ao hipertireoidismo felino em sete gatos. Os pacientes apresentavam episódios recorrentes de marcha rígida, ataxia proprioceptiva transitória, distonia apendicular sustentada, cifose dorsal espástica e tremores faciais/cefálicos, com duração mediana de 3 minutos (variando de 1 a 35 minutos). O mecanismo fisiopatológico proposto envolve a tireotoxicose sobre o sistema nervoso central: o excesso de tiroxina (T4) e tri-iodotironina (T3) induz hiperatividade dopaminérgica, altera a densidade e afinidade de receptores D1 e D2 nos núcleos da base e exacerba a taxa metabólica neuronal, provocando desequilíbrio funcional transitório na filtragem motora extrapiramidal. O desfecho clínico foi categórico: todos os sete gatos (100%) apresentaram remissão imediata e permanente das discinesias paroxísticas após a estabilização médica (metimazol), tireoidectomia cirúrgica ou terapia com iodo radioativo (131-I), sem necessidade de terapia anticonvulsivante ou neuromoduladora contínua.',
  },

  epidemiology: {
    particularidadesEpidemiologicasEIdade:
      'A epidemiologia da discinesia paroxística difere de acordo com o mecanismo causal e a espécie acometida. Nas formas hereditárias clássicas ligadas a mutações genéticas específicas (como a Síndrome da Queda Episódica no Cavalier King Charles Spaniel e o Scottie Cramp no Scottish Terrier), os primeiros episódios manifestam-se tipicamente em pacientes jovens, entre 3 e 7 meses de idade, raramente ultrapassando os 2 anos no início dos sinais. Já na discinesia sensível ao glúten no Border Terrier, o início pode ocorrer desde animais jovens até adultos maduros (mediana de 2 a 3 anos). Por outro lado, a coorte de 70 cães de Dellwig et al. (2026) revelou que a idade de início não difere significativamente entre as formas idiopáticas, genéticas e sensíveis ao glúten, e que a distribuição topográfica dos movimentos (se afeta membros anteriores, posteriores ou esqueleto axial) não permite determinar a etiologia subjacente de forma confiável. Em gatos, Liatis et al. (2026) relataram uma mediana de idade de 3,5 anos (amplitude de 1 a 14 anos), sem predisposição sexual aparente. Nos felinos idosos, o surgimento tardio de discinesia paroxística deve suscitar obrigatoriamente a suspeição de causas metabólicas tireoidianas (hipertireoidismo em gatos com idade média de 12 anos, Espinosa et al., 2026) ou lesões estruturais encefálicas expansivas comprimindo o tálamo e estriado.',
  },

  pathogenesisTransmission: {
    cascata: [
      'Gatilho precipitante: Estímulo fisiológico (início abrupto de movimento em formas cinesigênicas, esforço físico prolongado em formas induzidas pelo exercício, excitação, calor ou estresse emocional) desencadeia demanda sináptica intensa sobre os circuitos motores corticais e subcorticais.',
      'Falha de gating extrapiramidal: Incapacidade do estriado e núcleos da base em processar e inibir reflexos motores antagônicos, gerada por desequilíbrio dopaminérgico entre as vias direta e indireta, alterações estruturais na matriz perineuronal (brevican) ou depleção energética mitocondrial.',
      'Desinibição talâmica sustentada: Perda da modulação inibitória gabaérgica normal exercida pelo complexo globo pálido/substância negra reticular sobre os núcleos ventrais do tálamo.',
      'Descarga eferente cortical desordenada: O tálamo hiperativo emite sinais excitatórios excessivos para as áreas pré-motora e motora primária do neocórtex, transmitidos ao tronco encefálico e medula espinhal via tratos motores descendentes.',
      'Co-contração muscular periférica: Ativação simultânea e inapropriada de motoneurônios alfa e gama destinados a grupamentos musculares agonistas e antagonistas.',
      'Manifestação do ataque paroxístico: O paciente manifesta distonia sustentada, flexão/extensão tônica, arqueamento axial e incapacidade de caminhar, mantendo o córtex cognitivo e os sentidos aferentes plenamente vigilantes (sensorium preservado).',
      'Cessação espontânea sem dano pós-ictal: O circuito motor subcortical repolariza e recupera a estabilidade sináptica, encerrando o ataque de forma abrupta sem gerar depressão cortical, confusão mental ou exaustão pós-ictal típica da epilepsia.',
    ],
    transmissao:
      'A discinesia paroxística é uma condição não infecciosa e não transmissível. Pode apresentar caráter hereditário monogênico autossômico recessivo em raças com variantes conhecidas (BCAN no CKCS; PIGN no Wheaten Terrier; PCK2 no Sheltie; TNR no Weimaraner), natureza autoimune/imunomediada induzida por antígenos dietéticos na sensibilidade ao glúten, caráter metabólico/reativo secundário ou curso idiopático multifatorial.',
  },

  pathophysiology: {
    mecanismosCelularesEControleSinaptico:
      'No nível molecular e sináptico, a modulação motora basal depende criticamente das redes perineuronais (perineuronal nets - PNNs), que são estruturas especializadas de matriz extracelular que envolvem os somas e dendritos de interneurônios gabaérgicos parvalbumina-positivos no encéfalo. Na Síndrome da Queda Episódica do Cavalier King Charles Spaniel, a microdeleção de 15,7 kb no gene BCAN impede a síntese normal de brevican, um proteoglicano de sulfato de condroitina exclusivo do SNC que ancora tenascinas e hialuronano. A carência de brevican desestabiliza a bainha perineuronal desses interneurônios inibitórios, reduz a velocidade de condução axonal e compromete a plasticidade sináptica nos núcleos basais e no cerebelo. Diante de estímulos adrenérgicos excitatórios (corrida ou estresse), os interneurônios falham em manter a inibição tônica, resultando em descargas sincronizadas de hipertonia muscular extensora. Em contraste, no Border Terrier, a ingestão de glúten expõe enterócitos e o sistema imunológico à gliadina; a transglutaminase-2 tecidual (TG2) forma neoepítopos imunogênicos que estimulam linfócitos T e a síntese de imunoglobulinas IgA anti-TG2 e IgG anti-gliadina modificada (MGP). Esses complexos imunes ou a reatividade cruzada linfocitária atingem a vasculatura e o parênquima encefálico subcortical, gerando disfunção imunomediada reversível nos núcleos da base.',
  },

  clinicalSignsPathophysiology: [
    {
      system: 'Sinais Paroxísticos e Semiologia Motora (Crítica)',
      findings: [
        {
          finding: 'Distonia episódica de membros torácicos e pélvicos',
          mechanism:
            'Co-contração espástica involuntária e involuntária simultânea de músculos flexores e extensores por desinibição das vias eferentes tálamo-corticais.',
          clinicalMeaning:
            'Achado semiológico central da discinesia; o membro permanece fixo em flexão extrema ou hiperextensão rígida, impedindo o apoio normal sem que haja dor articular primária.',
          priority: 'emergency',
        },
        {
          finding: 'Postura de espreita rígida ("deer stalking") e arqueamento axial',
          mechanism:
            'Hipertonia extensora paroxística sustentada da musculatura paravertebral epaxial e dos músculos antigravitários por perda de inibição gabaérgica dependente de brevican.',
          clinicalMeaning:
            'Característica clássica da Síndrome da Queda Episódica no CKCS; o animal caminha como se estivesse espreitando uma presa até colapsar em decúbito com membros estendidos.',
          priority: 'emergency',
        },
        {
          finding: 'Movimentos distônicos alternantes de flexão ("dança do Wheaten")',
          mechanism:
            'Ativação rítmica alternada e assimétrica de motoneurônios pélvicos decorrente de disfunção nos circuitos de âncoras GPI (gene PIGN) moduladores de sinapses estriatais.',
          clinicalMeaning:
            'Movimento semiológico altamente visual no Soft-Coated Wheaten Terrier; o cão alterna a elevação e flexão dos membros posteriores como se estivesse dançando no lugar.',
          priority: 'common',
        },
        {
          finding: 'Marcha em "câmera lenta" (slow motion) e rastejamento felino',
          mechanism:
            'Bradicinesia paroxística combinada com distonia migratória apendicular, levando à perda da fluidez e velocidade na propagação do comando motor voluntário.',
          clinicalMeaning:
            'Padrão semiológico documentado em 44% dos gatos por Liatis et al. (2026); o felino desloca-se agachado, com passos extremamente lentos e cautelosos, cruzando membros.',
          priority: 'common',
        },
        {
          finding: 'Cifose espasmódica e distonia caudal rígida',
          mechanism:
            'Contração involuntária sustentada dos músculos flexores axiais e da musculatura coccígea intrínseca por perda de controle inibitório nos núcleos basais.',
          clinicalMeaning:
            'Presente em 40% dos felinos com PxD e em Dachshunds; a cauda adota postura rígida vertical ou lateralizada e o tronco curva-se em arco rígido.',
          priority: 'common',
        },
        {
          finding: 'Tremor distônico cefálico e facial',
          mechanism:
            'Oscilações involuntárias rítmicas ou pseudo-rítmicas geradas por desequilíbrio dopaminérgico em vias córtico-estriatais que inervam a musculatura cervical e mastigatória.',
          clinicalMeaning:
            'Observado em gatos hipertireoideos (Espinosa et al., 2026) e Border Terriers; não deve ser confundido com tremor essencial idiopático de cabeça.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'Preservação do Sensorium e Diferenciais Críticos',
      findings: [
        {
          finding: 'Nível de consciência rigorosamente preservado durante todo o ataque',
          mechanism:
            'Preservação da formação reticular ativadora ascendente (SARA) e ausência de descargas epileptiformes despolarizantes sincronizadas generalizadas no córtex telencefálico.',
          clinicalMeaning:
            'Diferencial propedêutico crucial contra crises epilépticas generalizadas; o cão ou gato segue o tutor com o olhar, pisca reflexamente e tenta interagir.',
          priority: 'common',
        },
        {
          finding: 'Ausência de período de depressão ou confusão mental pós-ictal',
          mechanism:
            'Inexistência de exaustão metabólica neuronal cortical difusa, acúmulo de adenosina extracelular ou hiperpolarização inibitória pós-crise.',
          clinicalMeaning:
            'Ao término dos movimentos involuntários, o paciente levanta-se imediatamente e comporta-se com plena normalidade cognitiva e motora.',
          priority: 'common',
        },
        {
          finding: 'Ausência habitual de sinais autonômicos grosseiros (micção e sialorreia)',
          mechanism:
            'As descargas limitam-se aos circuitos motores somáticos extrapiramidais, sem ativação em massa do sistema límbico ou centros autonômicos hipotalâmicos.',
          clinicalMeaning:
            'A presença de sialorreia profusa, micção involuntária ou defecação durante o evento aumenta fortemente a suspeição de crise epiléptica autonômica ou límbica.',
          priority: 'common',
        },
        {
          finding: 'Exame neurológico interictal absolutamente normal',
          mechanism:
            'Nas formas idiopáticas, genéticas e reativas, não há destruição tecidual permanente, inflamação celular parenquimatosa ou perda estrutural de vias nervosas.',
          clinicalMeaning:
            'Se houver déficits proprioceptivos permanentes, assimetria de pares cranianos ou dor espinhal interictal, a suspeita migra imediatamente para doença estrutural.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'Sinais Reativos, Sistêmicos e Gatilhos Específicos',
      findings: [
        {
          finding: 'Precipitação estrita por corrida, brincadeira ou estresse térmico/emocional',
          mechanism:
            'O aumento do tônus adrenérgico e da demanda de ATP mitocondrial sobrecarrega o maquinário sináptico basal já defectivo, deflagrando a crise.',
          clinicalMeaning:
            'Confirma o caráter induzido pelo exercício (PED) ou cinesigênico (PKD); orienta medidas preventivas de manejo ambiental e restrição de picos de agitação.',
          priority: 'systemic',
        },
        {
          finding: 'Sinais gastrointestinais e atópicos associados no Border Terrier',
          mechanism:
            'Enteropatia imunomediada por glúten provocando disbiose, má-absorção, dor cólica e liberação sistêmica de citocinas pró-inflamatórias.',
          clinicalMeaning:
            'Borborigmos audíveis, vômitos matinais, flatulência e dermatite pruriginosa em Border Terrier com discinesia reforçam o diagnóstico de PGSD.',
          priority: 'systemic',
        },
        {
          finding: 'Tireotoxicose sistêmica associada no paciente felino idoso',
          mechanism:
            'Hipersecreção tumoral benigna (adenoma tireoidiano) de T4 e T3 elevando taxa metabólica basal, cronotropismo cardíaco e turnover dopaminérgico central.',
          clinicalMeaning:
            'Emagrecimento progressivo com polifagia, taquicardia, hipertensão arterial sistêmica e bócio palpável em gato com discinesia apontam causa tireoidiana curável.',
          priority: 'systemic',
        },
      ],
    },
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Análise e Cronometria de Vídeo Domiciliar em Alta Resolução',
      purpose: 'Avaliação da semiologia dinâmica, responsividade cognitiva e diferenciação de epilepsia focal',
      description:
        'Solicitação orientada aos tutores para filmar o episódio do início ao fim sob boa iluminação. O médico veterinário deve inspecionar o vídeo em velocidade normal e lenta (0,5x), respondendo a um checklist sistemático: (1) O paciente atende quando chamado pelo nome? (2) Há seguimento ocular da câmera ou do tutor? (3) Tenta manter locomoção voluntária apesar da distonia dos membros? (4) Há micção involuntária, sialorreia em espuma ou queixadas? (5) Há movimentos rítmicos clonicos ou contração tônica sustentada? (6) Quanto tempo dura o ataque? (7) Qual o comportamento exato no primeiro minuto após o término dos movimentos?',
      interpretation:
        'Responsividade cognitiva confirmada com olhar focado, movimentos distônicos sem padrão clônico rítmico, ausência de sialorreia e recuperação sem ataxia pós-ictal apoiam fortemente o diagnóstico de discinesia paroxística. Sialorreia profusa, olhar fixo não responsivo ou sonolência pós-crise aumentam a probabilidade de crise epiléptica focal com generalização secundária.',
      limitations:
        'Vídeos curtos que capturam apenas o final do ataque podem perder fases iniciais; tutores ansiosos tendem a segurar o animal, impedindo a observação do padrão locomotor espontâneo.',
      isGoldStandard: true,
    },
    {
      stepNumber: 2,
      title: 'Exame Neurológico Interictal Minucioso e Localização Neuroanatômica',
      purpose: 'Confirmação da integridade das vias nervosas fora dos episódios e exclusão de déficits estruturais focais',
      description:
        'Avaliação sistemática dos 5 componentes do exame neurológico veterinário: estado mental e comportamento, postura em repouso e marcha, reações posturais (propriocepção tátil e saltitamento), pares cranianos (I a XII) e reflexos espinhais miotáticos e flexores, além de palpação vertebral da coluna toracolombar e cervical para pesquisa de hiperpatia.',
      interpretation:
        'Exame rigorosamente normal é o padrão esperado na discinesia paroxística primária, genética, sensível ao glúten e nas formas metabólicas compensadas interictalmente. Presença de déficits proprioceptivos assimétricos, alteração de nível de consciência (estupor), síndrome vestibular ou dor espinhal exige investigação imediata para lesão estrutural encefálica ou mielopatia.',
      limitations:
        'Não descarta discinesia se o paciente for avaliado imediatamente após exercício extenuante, quando fadiga muscular fisiológica pode mimetizar ataxia transitória.',
    },
    {
      stepNumber: 3,
      title: 'Banco Laboratorial Mínimo e Rastreamento Metabólico de Causas Reativas',
      purpose: 'Identificação de hipocalcemia ionizada, hipoglicemia, encefalopatia hepática e tireotoxicose felina',
      description:
        'Coleta de sangue em jejum para painel abrangente: hemograma completo, creatinina, ureia, ALT, FA, albumina, proteínas totais, glicemia de jejum, eletrólitos (sódio, potássio, cloro), cálcio total e obrigatoriamente cálcio ionizado (iCa). Em felinos com idade superior a 5 anos, inclusão mandatória de T4 total sérico. Se houver suspeita de shunt portossistêmico ou encefalopatia em animais jovens, ácidos biliares pré e pós-prandiais e amônia plasmática.',
      interpretation:
        'Hipocalcemia ionizada (< 1,1 mmol/L) diagnostica discinesia/tetania reativa hipocalcêmica. T4 total elevado (> 4,0 mcg/dL) em felinos com distonia confirma discinesia paroxística associada a hipertireoidismo (Espinosa et al., 2026). Creatina quinase (CK) pode exibir elevação discreta a moderada decorrente de esforço contrátil mecânico intenso, sem implicar miopatia inflamatória primária.',
      limitations:
        'T4 total pode estar transitoriamente na faixa limítrofe em gatos hipertireoideos com comorbidades não tireoidianas (euthyroid sick syndrome), requerendo T4 livre por diálise de equilíbrio ou repetição.',
    },
    {
      stepNumber: 4,
      title: 'Painel Genético Molecular Específico de Raça',
      purpose: 'Confirmação diagnóstica definitiva de variantes causais conhecidas em raças predispostas',
      description:
        'Coleta de sangue em EDTA ou swab de mucosa oral e envio para laboratórios genéticos veterinários de referência para sequenciamento direcionado de mutações conhecidas: gene BCAN no Cavalier King Charles Spaniel (microdeleção de 15,7 kb associada à Síndrome da Queda Episódica); gene PIGN no Soft-Coated Wheaten Terrier; gene PCK2 no Shetland Sheepdog; gene TNR no Weimaraner; gene SOD1 no Markiesje.',
      interpretation:
        'Homozigose para a mutação causal em um animal com fenótipo semiológico compatível confirma categoricamente a discinesia paroxística genética de raça. Estado de heterozigose (portador assintomático) indica que outra etiologia deve ser investigada para os episódios motores.',
      limitations:
        'A presença da variante genética não isenta o paciente de sofrer de outras comorbidades neurológicas concomitantes; um resultado negativo em raças sem mutações mapeadas (como Dachshund e DSH) não exclui discinesia.',
    },
    {
      stepNumber: 5,
      title: 'Triagem Sorológica para Glúten e Ensaio com Dieta de Eliminação Estrita',
      purpose: 'Identificação de reatividade imunológica ao glúten e resposta clínica a ensaio dietético de exclusão',
      description:
        'Em cães da raça Border Terrier ou outras raças com manifestações gastrointestinais associadas, dosagem de anticorpos séricos anti-transglutaminase-2 (TG2-IgA) e anticorpos anti-peptídeo de gliadina desamidada (MGP-IgG) por ELISA validado (Rogers et al., 2023; Lowrie et al., 2015). Concomitantemente ou sequencialmente, instituição de ensaio alimentar com dieta estrita sem glúten (zero trigo, cevada, centeio, aveia contaminada e derivados) por período mínimo contínuo de 3 a 6 meses.',
      interpretation:
        'Títulos elevados de TG2-IgA e MGP-IgG com declínio progressivo após retirada do glúten, associados à redução drástica ou cessação dos ataques motores, comprovam a discinesia sensível ao glúten (PGSD).',
      limitations:
        'Sensibilidade e especificidade universais ainda não estabelecidas para cães de raças mistas; contaminação cruzada acidental por petiscos ou medicamentos palatáveis falseia a resposta ao ensaio dietético.',
    },
    {
      stepNumber: 6,
      title: 'Ressonância Magnética Encefálica de Alto Campo e Análise de Líquor (LCR)',
      purpose: 'Exclusão formal de lesões estruturais encefálicas expansivas, isquêmicas ou inflamatórias',
      description:
        'Exame de neuroimagem avançada por RM (idealmente 1,5 Tesla ou superior) abrangendo sequências ponderadas em T1, T2, FLAIR, T2* (gradiente eco) e T1 pós-contraste paramagnético (gadolínio), com cortes finos dedicados ao prosencéfalo, núcleos basais, tálamo e fossa caudal. Seguido de punção asséptica da cisterna magna ou lombar para análise citológica e bioquímica do líquido cefalorraquidiano.',
      interpretation:
        'Nas discinesias idiopáticas, genéticas e metabólicas, a RM encefálica e o LCR apresentam-se rigorosamente normais. Identificação de assimetrias estruturais, áreas de hiperintensidade em T2/FLAIR nos núcleos da base ou realce anormal de contraste direciona o caso para discinesia estrutural, acidente vascular encefálico ou meningoencefalite de origem desconhecida (MUO).',
      limitations:
        'A RM normal não comprova de forma ativa que o paciente tem discinesia; apenas exclui lesões macroscópicas detectáveis. Requer anestesia geral inalatória.',
    },
  ],

  treatment: {
    metaPrimaria:
      'A meta terapêutica primária na discinesia paroxística baseia-se na personalização conforme a gravidade e o impacto dos episódios sobre o bem-estar do animal e do tutor. Em pacientes com episódios curtos (duração inferior a 2 a 3 minutos), esporádicos (frequência de menos de um ataque por mês) e sem sinais de estresse físico severo, a conduta de primeira linha é estritamente não farmacológica, focada no manejo ambiental e na eliminação de fatores desencadeantes físicos e emocionais.',

    condutaGeralDuranteCriseParoxistica:
      'Durante um episódio agudo de discinesia paroxística, o tutor e a equipe médica devem seguir orientações precisas: (1) Não tentar conter o paciente à força, não imobilizar membros rígidos e não tentar abrir a cavidade oral (risco de lesão muscular, estresse adrenérgico adicional ou mordedura acidental). (2) Proteger o ambiente imediato, afastando escadas, piscinas, degraus e móveis pontiagudos para evitar traumatismos secundários por queda. (3) Reduzir estímulos sensoriais ambientais, apagando luzes fortes, desligando sons e falando em tom calmo. (4) Iniciar a cronometragem exata da duração e registrar em vídeo em alta definição. (5) Encaminhar imediatamente para atendimento de emergência somente se o episódio ultrapassar 15 a 20 minutos contínuos, se houver crises repetitivas em salvas sem intervalo de descanso, hipertermia severa (> 40,5 °C) ou comprometimento respiratório evidente.',

    dietaEstritaSemGluten:
      'Em cães da raça Border Terrier com diagnóstico presuntivo ou confirmado de PGSD, bem como em animais de outras raças com sorologia positiva ou suspeita forte, a terapia de escolha consiste na transição para dieta estrita com zero glúten (Lowrie et al., 2015; Rogers et al., 2023). A dieta deve ser formulada por alimento comercial específico livre de glúten certificado ou dieta caseira prescrita por nutrólogo veterinário, eliminando rigorosamente qualquer fonte de trigo, cevada, centeio ou aveia comum. É imperativo alertar o tutor quanto a fontes ocultas de glúten: petiscos comerciais, biscoitos caninos, pães, cascas de empanados, suplementos vitamínicos com excipientes de trigo e medicamentos palatáveis masticáveis com levedura ou derivados de cereais. A resposta clínica deve ser monitorada por pelo menos 3 a 6 meses; a reintrodução inadvertida do glúten costuma desencadear recaída clínica aguda dos ataques motores dentro de dias a semanas.',

    farmacoterapiaCanina:
      'Quando os episódios de discinesia paroxística canina são frequentes (semanais ou múltiplos mensais), prolongados ou acompanhados de ansiedade acentuada, a intervenção farmacológica neuromoduladora é indicada, baseada no perfil fenotípico de cada paciente: (1) Acetazolamida (Diamox): Inibidor sistêmico da anidrase carbônica, padrão ouro para o manejo da Síndrome da Queda Episódica no Cavalier King Charles Spaniel. A posologia preconizada pelo BSAVA Small Animal Formulary (10ª ed., p. 18) é de 4 a 8 mg/kg por via oral a cada 8 a 12 horas. Se não houver melhora clínica após 2 a 3 semanas de uso regular a cada 12 horas, o fármaco deve ser descontinuado. Requer monitoramento rigoroso de eletrólitos séricos e gasometria venosa a cada 30 a 60 dias devido ao risco farmacológico de kaliurese excessiva (hipocalemia grave) e acidose metabólica hiperclorêmica. (2) Clonazepam: Benzodiazepínico com ação gabaérgica moduladora dos núcleos da base. Indicado em doses de 0,5 mg/kg VO a cada 8 a 12 horas no CKCS e outros distúrbios de hipertonia. Possui como limitação farmacológica maior o rápido desenvolvimento de tolerância clínica (downregulation de receptores GABA-A) em semanas, exigindo aumento de dose ou desmame progressivo para evitar rebote excitatório. (3) Fluoxetina: Inibidor seletivo da recaptação de serotonina (ISRS), utilizado em doses de 1 a 2 mg/kg VO a cada 24 horas, com indicação clínica histórica no Scottie Cramp (onde há defeito no turnover de 5-HT) e em discinesias desencadeadas por estresse de excitação. (4) Levetiracetam: Modulador da proteína vesicular SV2A, prescrito em doses de 20 a 30 mg/kg VO a cada 8 horas; embora seja um anticonvulsivante, possui ação neuromoduladora documentada em relatos isolados de discinesias induzidas pelo esforço em cães e gatos.',

    manejoDoHipertireoidismoComoTratamento:
      'Em gatos com discinesia paroxística associada a hipertireoidismo (Espinosa et al., 2026), a diretriz clínica absoluta é: tratar e controlar a tireoide, e NÃO prescrever anticonvulsivantes. O controle hormonal do estado tireotóxico elimina a hiperatividade dopaminérgica sobre os núcleos da base e promove a remissão total e definitiva dos episódios motores distônicos em 100% dos pacientes. As opções terapêuticas incluem: (1) Metimazol por via oral (2,5 mg por gato VO a cada 12 horas inicialmente) ou transdérmico em pavilhão auricular, com titulação conforme o T4 total sérico em 2 a 4 semanas. (2) Tireoidectomia cirúrgica unilateral ou bilateral modificada sob técnica meticulosa para preservação das glândulas paratireoides. (3) Terapia definitiva com iodo radioativo (131-I) em centros especializados. O uso de acetazolamida é formalmente proibido em gatos pelo formulário BSAVA ("Cats: do not use") devido à toxicidade metabólica sistêmica grave.',

    tabelaFarmacologiaNeuromoduladora: {
      kind: 'clinicalTable',
      title: 'Tabela 3 — Protocolo Farmacológico Neuromodulador, Posologias, Mecanismos e Cautelas Clínicas',
      columns: [
        { key: 'drug', label: 'Fármaco / Intervenção' },
        { key: 'species', label: 'Espécie Indicada' },
        { key: 'dose', label: 'Posologia e Intervalo' },
        { key: 'mechanism', label: 'Mecanismo de Ação' },
        { key: 'monitoring', label: 'Precauções e Monitoramento' },
      ],
      rows: [
        {
          drug: 'Dieta Estrita sem Glúten',
          species: 'Cães (Border Terrier, PGSD comprovada)',
          dose: 'Alimento 100% livre de glúten contínuo (exclusão estrita de trigo, centeio, cevada e aveia).',
          mechanism: 'Cessação da estimulação imune enteral mediada por gliadina e bloqueio da formação de anticorpos anti-TG2.',
          monitoring: 'Veto total a petiscos, medicamentos palatáveis e restos de mesa; reavaliação clínica a cada 3 meses.',
        },
        {
          drug: 'Acetazolamida (Diamox)',
          species: 'Cães exclusivamente (CKCS, PxD selecionada)',
          dose: '4 a 8 mg/kg VO a cada 8 a 12 horas (BSAVA 10ª ed., p. 18; Plumb\'s 10ª ed.).',
          mechanism: 'Inibição sistêmica da anidrase carbônica; modulação de canais iônicos e do pH neuronal extracelular.',
          monitoring:
            'Monitorar potássio sérico, sódio, cloro e gasometria (risco de hipocalemia e acidose hiperclorêmica); suspender se sem resposta em 2 semanas. CONTRAINDICADA EM GATOS.',
        },
        {
          drug: 'Clonazepam',
          species: 'Cães (e gatos sob extrema cautela)',
          dose: 'Cães: 0,5 mg/kg VO q8-12h. Gatos: 0,5 mg/gato VO q12-24h (dose inicial empírica reduzida).',
          mechanism: 'Agonismo alostérico de receptores GABA-A estriatais, facilitando influxo neuronal de cloreto e inibição motora.',
          monitoring:
            'Risco elevado de tolerância farmacológica em poucas semanas de uso contínuo; sedação inicial, ataxia transitória e risco de hepatotoxicidade felina.',
        },
        {
          drug: 'Levetiracetam',
          species: 'Cães e Gatos',
          dose: '20 a 30 mg/kg VO a cada 8 horas (ou formulação estendida 30-40 mg/kg q12h em cães).',
          mechanism: 'Ligação à proteína de vesícula sináptica SV2A, inibindo exocitose pré-sináptica de neurotransmissores excitatórios.',
          monitoring:
            'Excelente perfil de segurança renal e hepática; sedação leve e transitória nos primeiros dias; evidência em PxD derivada de relatos de caso.',
        },
        {
          drug: 'Fluoxetina',
          species: 'Cães (Scottie cramp e PxD ansiosa)',
          dose: '1 a 2 mg/kg VO a cada 24 horas.',
          mechanism: 'Inibição seletiva da recaptação de serotonina (ISRS), corrigindo o tônus serotoninérgico central nos núcleos motores.',
          monitoring:
            'Latência clínica de 2 a 4 semanas para efeito máximo; monitorar anorexia, letargia e interações com outros agentes serotoninérgicos.',
        },
        {
          drug: 'Metimazol / Tireoidectomia / Iodo 131',
          species: 'Gatos (PxD induzida por hipertireoidismo)',
          dose: 'Metimazol: 2,5 mg/gato VO q12h inicial; ajuste conforme T4 total em 3 semanas.',
          mechanism: 'Inibição da tireoperoxidase (TPO), reduzindo síntese hormonal tireoidiana e restaurando homeostase dopaminérgica central.',
          monitoring:
            'T4 total, função renal (creatinina e ureia) e hemograma com plaquetas a cada 3 a 4 semanas até estabilização completa. Remissão motora em 100%.',
        },
      ],
    },

    protocoloPlantaoPassoAPasso: [
      'Passo 1: Acolhimento e contenção verbal do tutor ansioso, esclarecendo que discinesia paroxística não causa dor iminente e que o paciente está consciente.',
      'Passo 2: Inspeção do vídeo gravado em velocidade normal e lenta para conferir nível de consciência, tônus apendicular, simetria e ausência de pós-ictal.',
      'Passo 3: Exame físico e aferição imediata de temperatura corporal retal; contrações musculares espásticas prolongadas podem gerar hipertermia por esforço.',
      'Passo 4: Verificação rápida da glicemia por fita reagente para descartar hipoglicemia aguda como causa de tremores e colapso dinâmico.',
      'Passo 5: Coleta de sangue para cálcio ionizado, eletrólitos (Na, K, Cl) e perfil bioquímico; se felino maduro, solicitar dosagem imediata de T4 total.',
      'Passo 6: Se o paciente estiver em crise contínua ativa prolongada (> 15 minutos), administrar bólus de diazepam (0,5 mg/kg IV) ou levetiracetam (30 mg/kg IV lento) para alívio tônico.',
      'Passo 7: Se detectada hipocalcemia ionizada (< 0,9 mmol/L), instituir infusão intravenosa lenta de gluconato de cálcio 10% (0,5 a 1,5 mL/kg) sob monitoramento eletrocardiográfico contínuo.',
      'Passo 8: Realização do exame neurológico interictal completo assim que o tônus normalizar; documentar ausência de déficits em pares cranianos e propriocepção.',
      'Passo 9: Se o paciente for um Border Terrier, orientar a transição imediata para ensaio estrito com alimento livre de glúten certificado por 3 a 6 meses.',
      'Passo 10: Se o paciente for um Cavalier King Charles Spaniel com diagnóstico de Episodic Falling frequente, iniciar acetazolamida (4 a 8 mg/kg VO q12h) com reavaliação eletrolítica em 14 dias.',
    ],

    terapiasInadequadas: [
      'Iniciar fenobarbital ou brometo de potássio empíricos para pacientes com discinesia paroxística típica sem evidência de crise epiléptica.',
      'Prescrever acetazolamida para pacientes felinos, ignorando o alerta formal do formulário BSAVA de alta toxicidade sistêmica na espécie.',
      'Prescrever dieta "parcialmente sem glúten" ou permitir petiscos, biscoitos ou pães concomitantes, invalidando o ensaio alimentar no Border Terrier.',
      'Tentar imobilizar fisicamente o animal com força durante o ataque distônico, gerando estresse e risco de fraturas ou lacerações.',
      'Usar a resposta positiva transitória a benzodiazepínicos como prova definitiva de que o evento era uma crise convulsiva.',
      'Prescrever anticonvulsivantes múltiplos para gatos idosos hipertireoideos sem investigar e tratar a causa primária tireoidiana.',
      'Ignorar a dosagem de cálcio ionizado em pacientes apresentando espasmos musculares episódicos e tetania apendicular.',
      'Suspender abruptamente o clonazepam após meses de terapia contínua, deflagrando síndrome de abstinência e crises convulsivas por rebote.',
    ],

    monitoramentoSeriado:
      'O acompanhamento clínico deve basear-se no diário de episódios mantido pelo tutor, registrando a data, horário, duração em minutos, fatores precipitantes identificados e gravidade visual de cada crise. Pacientes em uso de acetazolamida necessitam de dosagens periódicas de potássio sérico e gasometria venosa a cada 30 dias inicialmente, espaçando para 90 dias após estabilização. Gatos em tratamento para hipertireoidismo devem ser avaliados com T4 total sérico, creatinina e pressão arterial sistêmica a cada 3 a 4 semanas até titulação da dose ideal, seguido de revisões semestrais.',
  },

  complications: {
    traumaFisicoEHipertermiaPorContracao:
      'Quedas acidentais em escadas, piscinas ou terrenos irregulares durante o ataque de hipertonia podem ocasionar contusões, fraturas ósseas ou lacerações. Em episódios prolongados ou agrupados em salvas, a contração muscular tetânica vigorosa pode elevar a temperatura retal acima de 40 °C por termogênese mecânica.',
    rabdomioliseElevaçãoCKTransitória:
      'Contrações musculares sustentadas intensas geram microrrupturas sarcolemais com liberação enzimática de creatina quinase (CK) e mioglobina para a circulação sistêmica, exigindo hidratação adequada para prevenir sobrecarga renal.',
    diagnosticoErroneoDeEpilepsiaRefrataria:
      'A confusão diagnóstica frequente com epilepsia leva à introdução desnecessária de esquemas pesados de polifarmácia anticonvulsivante (fenobarbital, brometo de potássio, levetiracetam), resultando em sedação intensa, ataxia iatrogênica e sobrecarga hepatotóxica sem benefício motor real.',
    impactoEmocionalERupturaTutorAnimal:
      'O aspecto dramático e alarmante das crises distônicas causa sofrimento emocional profundo e ansiedade crônica nos tutores, gerando decisões precipitadas de eutanásia por falso pânico de dor intratável em uma doença que é essencialmente não dolorosa.',
  },

  prevention: {
    reducaoGatilhosExcitacaoEEstresse:
      'Identificação sistemática e mitigação de desencadeantes ambientais conhecidos: evitar brincadeiras extenuantes, passeios em horários quentes, ruídos súbitos e interações sociais estressantes em animais predispostos a crises cinesigênicas ou induzidas pelo exercício.',
    adesaoRigidaDietaSemGlutenSemCruzamento:
      'Nos pacientes com suspeita ou confirmação de sensibilidade ao glúten, manter rigor absoluto na exclusão de qualquer fonte proteica derivada de cereais proibidos, com vasilhas exclusivas e armazenamento protegido contra contaminação cruzada.',
    rastreamentoMetabolicoTireoidianoAnual:
      'Dosagem periódica de T4 total em felinos a partir dos 7 anos de idade para detecção precoce de hipertireoidismo antes da emergência de manifestações neuromusculares e discinéticas extrapiramidais.',
    acondicionamentoSeguroDoAmbiente:
      'Instalação de portões de segurança em escadas, proteção de acesso a piscinas, colocação de tapetes antiderrapantes em pisos lisos e acolchoamento de áreas de repouso para evitar traumas durante quedas paroxísticas.',
    registroSeriadoEmDiarioEVideos:
      'Manutenção contínua de arquivo digital com vídeos dos episódios e anotação sistemática da frequência mensal, permitindo ao neurologista avaliar objetivamente a progressão ou resposta ao manejo instituído.',
  },

  references: [
    {
      id: 'cerda-gonzalez-2021-ecvn',
      citation:
        'Cerda-Gonzalez S, Packer RMA, Garosi L, Lowrie M, Mandigers PJJ, O’Brien DP, Volk HA. International veterinary canine dyskinesia task force ECVN consensus statement: Terminology and classification. Journal of Veterinary Internal Medicine, 2021;35(3):1218–1230. DOI: 10.1111/jvim.16108.',
      url: 'https://doi.org/10.1111/jvim.16108',
      sourceType: 'Consenso Oficial Internacional ECVN',
      evidenceLevel: 'Consenso Internacional de Especialistas',
      notes:
        'Diretriz mestre da ECVN padronizando a terminologia, taxonomia e classificação dos distúrbios paroxísticos do movimento em cães.',
    },
    {
      id: 'mandigers-2024-review',
      citation:
        'Mandigers PJJ, Santifort KM, Lowrie M, Garosi L. Canine paroxysmal dyskinesia – a review. Frontiers in Veterinary Science, 2024;11:1441332. DOI: 10.3389/fvets.2024.1441332.',
      url: 'https://doi.org/10.3389/fvets.2024.1441332',
      sourceType: 'Revisão Sistemática e Narrativa Open Access',
      evidenceLevel: 'Revisão Atualizada com Biblioteca de Vídeos CC BY 4.0',
      notes:
        'Revisão abrangente consolidando a neurogenética, fisiopatologia dos núcleos basais e disponibilizando 28 vídeos de fenótipos caninos.',
    },
    {
      id: 'dellwig-2026-cohort',
      citation:
        'Dellwig A, Meyerhoff N, Rogers CB, Volk HA, Tipold A, Nessler JN. Canine paroxysmal dyskinesia: distribution of etiological subtypes and structural and reactive causes in a retrospective tertiary care cohort. Frontiers in Veterinary Science, 2026;13:1846296. DOI: 10.3389/fvets.2026.1846296.',
      url: 'https://doi.org/10.3389/fvets.2026.1846296',
      sourceType: 'Estudo de Coorte Multicêntrico Recente (2026)',
      evidenceLevel: 'Coorte de Centro Terciário (n=70 cães)',
      notes:
        'Maior panorama etiológico contemporâneo demonstrando a prevalência de formas idiopáticas (61%), genéticas (23%) e por glúten (13%), e a independência entre topografia e etiologia.',
    },
    {
      id: 'liatis-2026-feline',
      citation:
        'Liatis T, Maeso C, De Stefani A, Pergande A, Elvira T, Suñol A. Phenotypic characteristics of paroxysmal dyskinesia in 25 cats. Journal of Small Animal Practice, 2026;67(9):734–738. DOI: 10.1111/jsap.70125.',
      url: 'https://doi.org/10.1111/jsap.70125',
      sourceType: 'Estudo Observacional Multicêntrico Felino (2026)',
      evidenceLevel: 'Série de Casos Analisados por Vídeo (n=25 gatos)',
      notes:
        'Estudo divisor de águas que expandiu a discinesia felina para além da raça Sphynx, caracterizando a marcha em câmera lenta e distonia migratória em gatos DSH e outras raças.',
    },
    {
      id: 'espinosa-2026-hyperthyroid',
      citation:
        'Espinosa J, Espadas I, Karpozilou A, Heredia T, Hrovat A, Torre J, Wessmann A, Zoltowska A, Dye C, Mínguez JJ, Posporis C, Álvarez P. Paroxysmal dyskinesia associated with hyperthyroidism in 7 cats: a novel manifestation of a metabolic encephalopathy. Journal of Veterinary Internal Medicine, 2026;40(1):aalaf007. DOI: 10.1093/jvimsj/aalaf007.',
      url: 'https://doi.org/10.1093/jvimsj/aalaf007',
      sourceType: 'Estudo Clínico Multicêntrico Felino (2026)',
      evidenceLevel: 'Série Retrospectiva com Documentação em Vídeo (n=7)',
      notes:
        'Primeira descrição detalhada da discinesia paroxística como encefalopatia metabólica induzida por hipertireoidismo em felinos, com 100% de remissão após controle da tireoide.',
    },
    {
      id: 'boyd-2026-dachshund',
      citation:
        'Boyd B, Corsini G, Polidoro D, Bhatti SFM, Grapes N, Alza D, Motta L, Formoso S, De Decker S, Bertram S, Gilbert S, Karpozilou A, Douralidou D, Santifort K, De Frias JM, Bongers J, Kaczmarska A, Liatis T. Phenotypic features of paroxysmal dyskinesia in Dachshund dogs: 62 cases (2017-2025). Journal of Veterinary Internal Medicine, 2026; DOI: 10.1093/jvimsj/aalag195.',
      url: 'https://doi.org/10.1093/jvimsj/aalag195',
      sourceType: 'Estudo de Coorte Multicêntrico Racial (2026)',
      evidenceLevel: 'Coorte Retrospectiva (n=62 Dachshunds)',
      notes:
        'Caracterização clínica da discinesia em Dachshunds, destacando distonia da cauda e cifose dorsal espástica.',
    },
    {
      id: 'lowrie-2015-gluten',
      citation:
        'Lowrie M, Garden OA, Hadjivassiliou M, Harvey RJ, Sanders DS, Powell R, Garosi L. The clinical and serological effect of a gluten-free diet in Border Terriers with epileptoid cramping syndrome. Journal of Veterinary Internal Medicine, 2015;29(6):1564–1568. DOI: 10.1111/jvim.13643.',
      url: 'https://doi.org/10.1111/jvim.13643',
      sourceType: 'Ensaio Clínico Prospectivo com Dechallenge/Rechallenge',
      evidenceLevel: 'Estudo Prospectivo com Validação Sorológica',
      notes:
        'Estudo seminal comprovando a relação causal entre ingestão de glúten, anticorpos anti-TG2 e crises de distonia no Border Terrier.',
    },
    {
      id: 'rogers-2023-gluten-breeds',
      citation:
        'Rogers CB, Meyerhoff N, Volk HA. Gluten serological testing in various dog breeds with paroxysmal dyskinesia. Frontiers in Veterinary Science, 2023;10:1119441. DOI: 10.3389/fvets.2023.1119441.',
      url: 'https://doi.org/10.3389/fvets.2023.1119441',
      sourceType: 'Estudo Observacional Sorológico Open Access',
      evidenceLevel: 'Estudo Retrospectivo Multirracial (n=31 cães)',
      notes:
        'Demonstrou a presença de reatividade sorológica anti-TG2 e MGP em cães com discinesia pertencentes a diversas raças além do Border Terrier.',
    },
    {
      id: 'james-2022-sphynx',
      citation:
        'James M, Lowrie M, Behr S, Liatis T, Garosi L. Phenotypic characterisation of paroxysmal dyskinesia in Sphynx cats. Journal of Feline Medicine and Surgery, 2022;24(6):500–505. DOI: 10.1177/1098612X211032123.',
      url: 'https://doi.org/10.1177/1098612X211032123',
      sourceType: 'Série de Casos Observacionais Felinos',
      evidenceLevel: 'Série de Casos (n=10 Sphynx)',
      notes:
        'Primeira série detalhada caracterizando a discinesia não cinesigênica paroxística juvenil na raça Sphynx.',
    },
    {
      id: 'nelson-couto-6ed-ch62-67',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine, 6th edition (2020). Chapter 62: Seizures and Other Paroxysmal Events, pp. 1093-1108; Chapter 67: Disorders of Muscle, pp. 1181-1183. Elsevier.',
      sourceType: 'Tratado de Medicina Interna Veterinária Padrão Ouro',
      evidenceLevel: 'Livro-texto de Referência Mundial',
      notes:
        'Capítulos seminais abordando diagnóstico diferencial de eventos paroxísticos, desmistificação de crises não epilépticas, Scottie cramp e valor da análise de vídeo.',
    },
    {
      id: 'delahunta-5ed-ch8-20',
      citation:
        'de Lahunta A, Glass E, Kent M. Veterinary Neuroanatomy and Clinical Neurology, 5th edition (2021). Chapter 8: Extrapyramidal System, p. 244; Chapter 20: Movement Disorders and Tetany, pp. 543-551. Saunders Elsevier.',
      sourceType: 'Tratado de Neuroanatomia e Neurologia Clínica Veterinária',
      evidenceLevel: 'Livro-texto de Referência em Neuroanatomia',
      notes:
        'Fundamentação neuroanatômica dos núcleos da base, circuitos de gating extrapiramidal, e descrição clínica da Síndrome da Queda Episódica associada a brevican (BCAN).',
    },
    {
      id: 'bsava-formulary-10ed',
      citation:
        'British Small Animal Veterinary Association (BSAVA). BSAVA Small Animal Formulary, Part A: Canine and Feline, 10th edition (2020). Acetazolamide monograph, p. 18; Clonazepam monograph, pp. 110-111. BSAVA.',
      sourceType: 'Formulário Terapêutico Padrão Ouro Britânico',
      evidenceLevel: 'Guia Farmacológico Oficial Especializado',
      notes:
        'Recomendações posológicas formais de acetazolamida e clonazepam para episodic falling canino e alerta categórico de contraindicação em felinos ("Cats: do not use").',
    },
    {
      id: 'plumbs-10ed',
      citation:
        'Plumb DC. Plumb\'s Veterinary Drug Handbook, 10th edition (2023). Acetazolamide, Clonazepam, Levetiracetam, and Fluoxetine monographs. Wiley-Blackwell.',
      sourceType: 'Compêndio Farmacológico Veterinário Internacional',
      evidenceLevel: 'Manual Farmacológico Padrão Ouro',
      notes:
        'Dados detalhados de farmacocinética, interações sinápticas, riscos de acidose e tolerância rápida a benzodiazepínicos.',
    },
    {
      id: 'gill-2012-bcan',
      citation:
        'Gill JL, Tsai KL, Krey C, Noorai RE, Vanbellinghen JF, Garosi LS, Shelton GD, Clark LA, Harvey RJ. A canine BCAN microdeletion associated with episodic falling syndrome. Neurobiology of Disease, 2012;45(1):130–136. DOI: 10.1016/j.nbd.2011.07.014.',
      url: 'https://doi.org/10.1016/j.nbd.2011.07.014',
      sourceType: 'Estudo Genético Molecular Seminal',
      evidenceLevel: 'Estudo Experimental e Clínico de Genética Médica',
      notes:
        'Identificação da microdeleção gênica no gene BCAN (brevican) como causa genética molecular da Síndrome da Queda Episódica no CKCS.',
    },
    {
      id: 'urkasemsin-olby-2015',
      citation:
        'Urkasemsin G, Olby NJ. Canine Paroxysmal Movement Disorders. Veterinary Clinics of North America: Small Animal Practice, 2014;44(6):1091–1102. DOI: 10.1016/j.cvsm.2014.07.006.',
      url: 'https://doi.org/10.1016/j.cvsm.2014.07.006',
      sourceType: 'Revisão Clínica em Clínica Veterinária da América do Norte',
      evidenceLevel: 'Revisão Atualizada por Especialistas',
      notes:
        'Revisão dos fenótipos cinesigênicos, não cinesigênicos e induzidos pelo exercício em diversas raças caninas.',
    },
    {
      id: 'vin-marioni-henry-2026',
      citation:
        'Marioni-Henry K. Paroxysmal Movement Disorders in Dogs and Cats. VINcyclopedia of Veterinary Medicine, Veterinary Information Network (VIN), revisado em maio de 2026. Davis, CA.',
      sourceType: 'Enciclopédia Clínica e Farmacológica Especializada (VIN)',
      evidenceLevel: 'Atualização Contínua de Especialista Diplomado ACVIM/ECVN',
      notes:
        'Síntese clínica atualizada até maio de 2026 sobre testes genéticos disponíveis, resposta mista a anticonvulsivantes e conduta na rotina neurológica.',
    },
  ],
};
