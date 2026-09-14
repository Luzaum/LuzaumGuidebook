import { DiseaseRecord } from '../../types';

export const cistiteEnfisematosaCaesGatosSeed: DiseaseRecord = {
  id: 'disease-cistite-enfisematosa-caes-gatos',
  slug: 'cistite-enfisematosa-caes-gatos',
  title: 'Cistite Enfisematosa em Cães e Gatos',
  subtitle: 'Infecção e inflamação vesical profunda com produção e acúmulo de gás intraluminal e intramural por patógenos fermentadores de glicose e proteínas',
  synonyms: [
    'cistite gasosa',
    'emphysematous cystitis',
    'cistite com gás intramural',
    'infecção urinária produtora de gás'
  ],
  species: ['dog', 'cat'],
  category: 'nefrologia',
  categories: ['nefrologia', 'urgencia-emergencia', 'infectologia'],
  tags: [
    'cistite-enfisematosa',
    'trato-urinario-inferior',
    'escherichia-coli',
    'diabetes-mellitus',
    'bexiga-neurogenica',
    'ultrassonografia-vesical',
    'pneumaturia',
    'pielonefrite-enfisematosa',
    'antimicrobianos',
    'iscaid'
  ],
  isPublished: true,

  plainLanguage: {
    whatIs: 'A cistite enfisematosa é uma inflamação grave e incomum da bexiga causada por bactérias que produzem gás dentro do órgão ou na sua própria parede muscular. Isso faz com que se formem pequenas bolhas de ar na parede ou na urina.',
    warningSigns: 'Urina avermelhada ou com sangue vivo, esforço doloroso para urinar, urinar várias vezes em pequenas quantidades, dor na barriga, urina com aspecto espumoso ou com saída de gás (muito raro), febre, fraqueza e vômitos.',
    diagnosis: 'O diagnóstico é confirmado por exames de imagem, principalmente o ultrassom da bexiga (que mostra um reflexo brilhante típico causado pelo gás) e radiografias ou tomografia. A cultura da urina é indispensável para identificar a bactéria exata e o antibiótico correto.',
    homeCare: 'Administrar os antibióticos rigorosamente até o fim prescrito sem interrupções, controlar o diabetes ou problemas de retenção urinária com o veterinário, garantir água fresca em abundância e retornar para exames de imagem de controle.'
  },

  quickSummary: 'A cistite enfisematosa (CE) é uma enfermidade infecciosa e inflamatória vesical profunda caracterizada pela presença de gás no lúmen, na parede muscular ou em ambos, gerado pela fermentação bacteriana de glicose ou substratos proteicos. Escherichia coli é o microrganismo predominante em aproximadamente 68% dos casos, seguida por Klebsiella spp., Proteus spp. e Clostridium spp. Embora classicamente associada ao diabetes mellitus, séries recentes demonstram que infecção urinária crônica, bexiga neurogênica, urolitíase e imunossupressão constituem fatores predisponentes frequentes em pacientes não diabéticos. O diagnóstico baseia-se na demonstração imaginológica de gás (radiografia, ultrassonografia com artefato de reverberação em cauda de cometa e tomografia computadorizada para mapear extensões extravesicais), associada a urocultura quantitativa com teste de susceptibilidade aos antimicrobianos (TSA/MIC). O manejo fundamenta-se em antibioticoterapia prolongada e direcionada, correção estrita da comorbidade de base e vigilância contra complicações fatais como pielonefrite enfisematosa ascendente e ruptura vesical.',

  quickDecisionStrip: [
    'Confirmar a presença real de gás por imagem antes de instrumentar a via uretral para evitar falsos diagnósticos induzidos por cateterismo iatrogênico.',
    'Nunca presumir que cistite enfisematosa ocorre exclusivamente em diabéticos: estase urinária, bexiga neurogênica, cistólitos e imunossupressão respondem por parcela expressiva.',
    'Escherichia coli é o patógeno isolado em aproximadamente 68% dos pacientes caninos e felinos descritos na literatura.',
    'A ultrassonografia vesical revela interface hiperecogênica irregular com sombra acústica suja e reverberação distal (ring-down / comet-tail artifact).',
    'Gás intraluminal isolado sem gás intramural é compatível com CE infecciosa (representando cerca de 23% dos casos), mas exige exclusão rigorosa de cateterismo e fístulas.',
    'Breakpoint urinário em urocultura pode enganar na infecção profunda da parede: amoxicilina com clavulanato requer cautela em lesões transmurais com invasão tecidual bacteriana.',
    'Fluoroquinolonas não devem ser prescritas de forma empírica e automática sem indicação de acometimento tecidual profundo ou teste de sensibilidade formal.',
    'Em gatos, dose cumulativa de enrofloxacina não deve ultrapassar 5 mg/kg/dia devido ao risco documentado de degeneração retiniana irreversível e cegueira aguda.',
    'Investigar obrigatoriamente extensão extravesical e acometimento renal superior (pielonefrite enfisematosa) em pacientes com dor lombar, febre ou azotemia.',
    'O desfecho clínico favorável atinge cerca de 79% dos casos tratados clinicamente, desde que o ambiente propício e a doença de base sejam rigorosamente controlados.'
  ],

  quickSummaryRich: {
    lead: 'Doença vesical infecciosa e inflamatória profunda em que microrganismos produtores de gás colonizam a bexiga e fermentam glicose ou proteínas murais, gerando coleções gasosas intramurais e intraluminais que podem dissecar a parede e ascender aos rins.',
    leadHighlights: [
      'Gás intramural e intraluminal patognomônico',
      'Escherichia coli predominante em 68%',
      'Associação com diabetes mellitus e bexiga neurogênica',
      'Risco crítico de pielonefrite enfisematosa ascendente',
      'Antibioticoterapia prolongada orientada por cultura e TSA'
    ],
    pillars: [
      {
        title: 'Microbiologia e Fermentação',
        body: 'Proliferação de enterobactérias anaeróbias facultativas (E. coli, Klebsiella, Proteus) ou anaeróbios estritos (Clostridium) que degradam glicose urinária em diabéticos ou albumina/proteínas teciduais em não diabéticos, liberando dióxido de carbono e gás hidrogênio na bexiga.',
        highlights: ['E. coli 68%', 'Substrato glicídico ou proteico', 'Gás CO2 e H2']
      },
      {
        title: 'Ambiente do Hospedeiro e Estase',
        body: 'A falha dos mecanismos naturais de defesa vesical (fluxo urinário contínuo, esvaziamento completo, integridade da barreira de glicosaminoglicanos uroteliais) por bexiga neurogênica, cistólitos ou glicosúria crônica propicia a colonização e invasão tecidual bacteriana.',
        highlights: ['Bexiga neurogênica', 'Glicosúria diabética', 'Perda de defesas mucosas']
      },
      {
        title: 'Diagnóstico por Imagem e Triagem',
        body: 'A identificação imaginológica de bolhas de gás ou estrias curvilíneas na parede vesical por radiografia ou ultrassonografia (reverberação em cauda de cometa). Tomografia computadorizada é o método superior para mapear extensão a retroperitônio e parênquima renal.',
        highlights: ['Ultrassom com reverberação', 'Radiografia contrastando parede', 'TC para extensão extravesical']
      },
      {
        title: 'Terapia Direcionada e Controle de Base',
        body: 'Antibioticoterapia bactericida guiada por cultura quantitativa e TSA com penetração tecidual comprovada, associada ao controle rigoroso da glicemia no diabetes, esvaziamento vesical programado na atonia e acompanhamento ultrassonográfico seriado.',
        highlights: ['TSA/MIC obrigatório', 'Controle glicêmico estrito', 'Monitoramento por imagem em 3 a 7 dias']
      }
    ],
    diagnosticFlow: [
      {
        label: 'Etapa 1: Triagem Clínica e Suspeita',
        timing: 'Imediato (0 a 1 hora)',
        detail: 'Reconhecimento de sinais de trato urinário inferior (hematúria, disúria) ou dor abdominal em paciente de risco (diabético, portador de bexiga neurogênica ou imunossuprimido).'
      },
      {
        label: 'Etapa 2: Imagem Pré-Instrumentação',
        timing: '1 a 2 horas',
        detail: 'Realização de ultrassonografia ou radiografia simples antes de qualquer sondagem uretral para evitar o confundidor diagnóstico de pneumatúria iatrogênica.'
      },
      {
        label: 'Etapa 3: Coleta Estéril e Urinálise',
        timing: '2 a 3 horas',
        detail: 'Cistocentese cuidadosa guiada por ultrassom (se a parede vesical permitir com segurança) ou cateterismo estéril para urinálise completa, citologia do sedimento e urocultura com TSA/MIC.'
      },
      {
        label: 'Etapa 4: Avaliação Sistêmica e Renal',
        timing: '2 a 4 horas',
        detail: 'Hemograma completo, perfil bioquímico (creatinina, ureia, SDMA, eletrólitos, glicose sérica e frutosamina) para detectar azotemia, acidose ou sepse associada.'
      },
      {
        label: 'Etapa 5: Mapeamento Avançado por Tomografia',
        timing: 'Conforme estabilidade clínica',
        detail: 'Indicada se houver suspeita de pielonefrite enfisematosa, pneumoperitônio, gás retroperitoneal ou quando a reverberação ultrassonográfica impedir a avaliação da arquitetura vesical.'
      }
    ],
    treatmentFlow: [
      {
        label: 'Fase 1: Estabilização e Analgesia',
        timing: 'Primeiras 2 a 4 horas',
        detail: 'Fluidoterapia balanceada para restabelecer débito urinário e perfusão tecidual; controle álgico multimodal evitando anti-inflamatórios não esteroidais em pacientes desidratados ou azotêmicos.'
      },
      {
        label: 'Fase 2: Terapia Antimicrobiana Empírica Racional',
        timing: 'Início imediato após colheita de cultura',
        detail: 'Antimicrobiano com espectro para enterobactérias e capacidade de atingir concentração tecidual na parede vesical, considerando histórico e resistência prévia.'
      },
      {
        label: 'Fase 3: Ajuste Definitivo pelo TSA / MIC',
        timing: '48 a 72 horas pós-cultura',
        detail: 'Descalonamento antimicrobiano para a droga de menor espectro efetiva; correção das doses em caso de disfunção renal associada.'
      },
      {
        label: 'Fase 4: Controle Rígido dos Fatores de Risco',
        timing: 'Contínuo durante a hospitalização',
        detail: 'Protocolo intensivo de insulinoterapia em diabéticos para mitigar glicosúria; protocolo de esvaziamento vesical limpo e asséptico em bexigas atônicas.'
      },
      {
        label: 'Fase 5: Reavaliação Imaginológica e Cura',
        timing: '3 a 7 dias e pós-tratamento',
        detail: 'Ultrassonografia seriada para comprovar reabsorção total do gás intramural e resolução do espessamento parietal; urocultura de controle após conclusão do ciclo.'
      }
    ]
  },

  etiology: {
    diferenciacaoConceitualPneumaturiaVsCistiteEnfisematosa: 'É indispensável diferenciar a cistite enfisematosa (CE) da simples pneumatúria. A pneumatúria é um sinal clínico caracterizado pela passagem de ar pela uretra durante a micção, decorrente de causas iatrogênicas (cateterismo uretral recente, cistocentese prévia, cistoscopia, cirurgias do trato urinário) ou fístulas urogenitais (fístula enterovesical, colovesical ou retovaginal). Em contraste, a cistite enfisematosa é uma síndrome infecciosa e inflamatória ativa em que bactérias fermentadoras multiplicam-se na urina ou na parede vesical, gerando gás in situ. Portanto, a presença de uma bolha de gás isolada no lúmen vesical de um paciente recém-sondado não autoriza o diagnóstico de CE.',
    
    microbiologiaUropatogenosFermentadores: 'Escherichia coli é o agente etiológico isolado com maior frequência, responsável por aproximadamente 68% dos casos descritos na literatura veterinária mundial (revisão de Weese & Weese 2026). Outras bactérias fermentadoras de carboidratos e proteínas incluem Klebsiella pneumoniae, Proteus mirabilis, Enterobacter aerogenes, Citrobacter spp., Pseudomonas aeruginosa e anaeróbios como Clostridium perfringens. A fermentação por enterobactérias anaeróbias facultativas ocorre pela via ácida mista, resultando na liberação contínua de dióxido de carbono (CO2) e gás hidrogênio (H2), os quais se acumulam sob a forma de microbolhas na urina e nos planos fasciais uroteliais.',
    
    substratosFermentaveisGlicoseVsProteinas: 'O substrato bioquímico primário clássico é a glicose. Em animais diabéticos com hiperglicemia que ultrapassa o limiar renal, a glicosúria maciça fornece substrato abundante para fermentação bacteriana acelerada. Entretanto, Nelson & Couto (6a ed.) ressalta que, na ausência total de glicose urinária, bactérias como E. coli e Clostridium spp. possuem maquinaria enzimática para metabolizar proteínas teciduais e albumina urotelial, liberando gás em animais não diabéticos. Assim, a normoglicemia não descarta a capacidade fermentativa bacteriana intramural.',
    
    tabelaComparativaCaesVsGatos: {
      kind: 'clinicalTable',
      title: 'Comparativo Etiológico e Epidemiológico entre Cães e Gatos na Cistite Enfisematosa',
      headers: ['Parâmetro', 'Espécie Canina', 'Espécie Felina', 'Implicação Clínica'],
      rows: [
        ['Prevalência Relativa', '93% dos casos relatados (Weese & Weese 2026)', 'Apenas 7,1% dos casos (8 felinos descritos)', 'CE é excepcionalmente rara em gatos; alta suspeição em cães'],
        ['Papel do Diabetes Mellitus', 'Presente em 10% a 33% dos cães com CE', 'Descrito em proporção similar, mas com n reduzido', 'DM é fator predisponente relevante, porém não obrigatório'],
        ['Comorbidade Predominante', 'ITU crônica recorrente, cistólitos e bexiga neurogênica', 'Doença do trato urinário inferior felino (FLUTD), cistólitos e DM', 'Sempre pesquisar causas anatômicas e neurológicas de estase'],
        ['Diferenciais Imediatos', 'Cistite bacteriana simples, neoplasia urotelial, pólipos', 'Cistite idiopática felina (CIF), tampões uretrais, urólitos', 'Em gatos com disúria, CIF é ordens de magnitude mais comum que CE'],
        ['Apresentação de Gás', 'Parede isolada (37%), lúmen (23%) ou ambos (38%)', 'Padrão intramural similar documentado em ultrassom', 'Gás mural sem sondagem confirma CE em ambas as espécies']
      ]
    },
    
    fatoresPredisponentesMetabolicosEEstruturais: 'A instalação da cistite enfisematosa exige a quebra simultânea de uma ou mais barreiras naturais de defesa vesical. O fluxo urinário turbilhonar e o esvaziamento completo constituem o principal mecanismo de depuração mecânica bacteriana. Pacientes com bexiga neurogênica (por discopatias intervertebrais, síndrome da cauda equina ou neuropatia diabética), urolitíase, divertículos vesicais ou cistite polipoide apresentam estase urinária e lesão da camada protetora de glicosaminoglicanos uroteliais. A imunossupressão sistêmica (induzida por hiperadrenocorticismo espontâneo, corticoterapia crônica ou neoplasias) atenua a diapedese neutrofílica e a opsonização, facilitando a invasão transmural bacteriana.'
  },

  epidemiology: {
    distribuicaoPorEspecieESexo: 'A cistite enfisematosa exibe marcante predomínio na espécie canina na literatura publicada. A scoping review de Weese & Weese 2026 identificou 109 casos documentados, dos quais 101 eram cães (93%) e apenas 8 eram gatos (7,1%). Em cães, observa-se maior representação de fêmeas, o que reflete a maior suscetibilidade anatômica geral do sexo feminino a infecções bacterianas ascendentes devido à uretra mais curta e próxima à região perianal.',
    
    idadeEFaixaEtaria: 'A doença afeta predominantemente animais adultos maduros a idosos. Na revisão de Weese & Weese 2026, a mediana de idade dos pacientes com dados disponíveis foi de 8,5 anos. Merkel et al. (2017) relataram mediana de 9 anos em 27 cães, e Lippi et al. (2019) encontraram média similar de 9,2 anos, refletindo a faixa etária em que comorbidades crônicas como diabetes mellitus, hiperadrenocorticismo, discopatias e disfunções miccionais neurogênicas tornam-se prevalentes.',
    
    comorbidadesAssociadas: 'As comorbidades subjacentes estão presentes na quase totalidade dos pacientes. Na série de Merkel et al. (2017), 26 de 27 cães (96%) apresentavam comorbidades identificáveis: diabetes mellitus em 33%, afecções neurológicas espinhais com disfunção miccional em 26% e endocrinopatia adrenal em 19%. No estudo de Lippi et al. (2019) com 38 animais, infecção urinária crônica prévia foi documentada em 65,8%, imunossupressão em 26,3%, cistólitos em 23,7%, bexiga neurogênica em 18,4% e diabetes mellitus em apenas 10,5%, comprovando a heterogeneidade dos fatores de risco.',
    
    desmistificacaoMitosHistoricos: 'O principal mito histórico na rotina veterinária é o axioma de que a cistite enfisematosa seria uma doença patognomônica e exclusiva de pacientes diabéticos. Dados contemporâneos refutam categoricamente essa premissa: entre 67% e 89,5% dos pacientes em coortes recentes não possuíam diabetes mellitus. A estase urinária e a invasão tecidual por bactérias fermentadoras de proteínas são plenamente capazes de deflagrar a enfermidade na ausência de glicosúria.'
  },

  pathogenesisTransmission: {
    cascata: [
      '1. Colonização ascendente urogenital: bactérias de origem entérica (predominantemente E. coli) ascendem pela uretra até o lúmen vesical, favorecidas por contaminação perineal, estase miccional ou quebra de defesas uroteliais.',
      '2. Fixação e invasão urotelial: microrganismos aderem à mucosa vesical por fímbrias e adesinas específicas, degradando a barreira protetora de glicosaminoglicanos.',
      '3. Fermentação de substratos: na presença de glicosúria (diabéticos) ou proteínas teciduais e albumina (não diabéticos), as bactérias ativam rotas fermentativas anaeróbias/facultativas, produzindo dióxido de carbono (CO2) e gás hidrogênio (H2).',
      '4. Formação de gás intraluminal e intramural: o gás produzido acumula-se no lúmen e disseca os planos teciduais da lâmina própria, submucosa e túnica muscular, formando vesículas gasosas intramurais.',
      '5. Isquemia parietal e dissecção transmural: a pressão expansiva do gás intramural comprime a microcirculação capilar vesical, gerando isquemia tecidual focal, necrose liquefativa e potencial disseminação retrógrada pelos planos fasciais.',
      '6. Complicações avançadas: migração do gás para o espaço retroperitoneal, fossas isquiorretais ou ascensão infecciosa ureteral em direção aos rins, culminando em pielonefrite enfisematosa bilateral e urossepticemia.'
    ],
    transmissao: 'Enfermidade endógena e adquirida, não transmissível diretamente entre indivíduos. Resulta da quebra da homeostase urológica do hospedeiro, associando colonização por microbiota oportunista entérica e fatores predisponentes metabólicos ou mecânicos de estase urinária.'
  },

  pathophysiology: {
    mecanismosFermentacaoProducaoGas: 'A produção de gás na cistite enfisematosa é um evento bioquímico direto desencadeado por microrganismos fermentadores. Escherichia coli e outras enterobactérias possuem vias metabólicas anaeróbias facultativas que realizam fermentação ácida mista de carboidratos quando expostas a ambientes hipóxicos intraluminais ou intramurais. A glicose é convertida em ácido láctico, ácido acético, ácido fórmico, etanol, CO2 e H2. A enzima formato hidrogênio liase cliva o ácido fórmico em dióxido de carbono e gás hidrogênio. Em animais não diabéticos, a fermentação de aminoácidos sulfurados e albumina urotelial por coliformes ou Clostridium spp. libera gases similares e metabólitos intermediários, mantendo a gênese gasosa tecidual.',
    
    dissecacaoMuralEComprometimentoVascular: 'Conforme o gás é gerado no interior do tecido vesical, ele disseca a lâmina própria e a camada muscular lisa do detrusor. O confinamento do gás na parede sob tensão mecânica provoca compressão capilar extrínseca, microtromboses vasculares e isquemia mural secundária. Essa isquemia local prejudica a chegada de neutrófilos, imunoglobulinas e antimicrobianos séricos ao nicho infeccioso, estabelecendo um ciclo vicioso de necrose tecidual e proliferação bacteriana desimpedida. Em casos graves, a necrose transmural desvitaliza a parede vesical, elevando o risco de deiscência e ruptura vesical espontânea.',
    
    disseminacaoExtravesicalEPielonefriteAscendente: 'A fáscia que envolve a bexiga urinária é contígua aos planos fasciais do retroperitônio e do assoalho pélvico. A dissecção gasosa sob alta pressão pode ultrapassar a serosa vesical íntegra e migrar dorsalmente para o espaço retroperitoneal, preenchendo as fossas isquiorretais e mimetizando pneumoperitônio ou perfuração de víscera oca (como demonstrado tomograficamente por Lee et al. 2023). Além da disseminação local, a incompetência das junções ureterovesicais secundária à distorção anatômica parietal permite a ascensão de coliformes e gás pelos ureteres, instalando focos de pielonefrite enfisematosa na pelve e parênquima renal, complicação de altíssima gravidade clínica.'
  },

  clinicalSignsPathophysiology: [
    {
      system: 'Trato Urinário Inferior',
      findings: [
        {
          finding: 'Hematúria macroscópica ou microscópica',
          mechanism: 'Invasão bacteriana e dissecção gasosa da lâmina própria e submucosa vesical, provocando ruptura de capilares uroteliais, ulceração da mucosa e extravasamento hemático intraluminal.',
          clinicalMeaning: 'Achado clínico mais frequente na cistite enfisematosa, relatado em 44,7% a 82% dos pacientes em coortes retrospectivas.',
          priority: 'common',
          context: ['Lippi et al. 2019', 'Weese & Weese 2026']
        },
        {
          finding: 'Polaciúria e estrangúria dolorosa',
          mechanism: 'Inflamação transmural intensa estimulando mecanorreceptores de estiramento e fibras nociceptivas tipo C da parede vesical, deflagrando o reflexo miccional com volumes urinários mínimos.',
          clinicalMeaning: 'Sintomas clássicos de irritação do trato urinário inferior; podem ser atenuados ou ausentes em pacientes com bexiga neurogênica e atonia vesical primária.',
          priority: 'common',
          context: ['Nelson & Couto 6a ed.']
        },
        {
          finding: 'Pneumatúria (saída de bolhas de gás durante a micção)',
          mechanism: 'Extravasamento e eliminação uretral de dióxido de carbono e gás hidrogênio acumulados no lúmen vesical durante a contração do detrusor.',
          clinicalMeaning: 'Sinal patognomônico, porém clinicamente raro e pouco relatado pelos tutores (presente em apenas cerca de 2,6% dos casos descritos).',
          priority: 'emergency',
          context: ['Fumeo et al. 2019', 'Lippi et al. 2019']
        },
        {
          finding: 'Incontinência urinária e esvaziamento incompleto',
          mechanism: 'Disfunção do músculo detrusor secundária a lesão necrótica/isquêmica da parede ou como causa primária preexistente (bexiga neurogênica).',
          clinicalMeaning: 'Comorbidade predisponente frequente que perpetua estase urinária e impede a remoção mecânica contínua de microrganismos.',
          priority: 'common',
          context: ['Merkel et al. 2017']
        }
      ]
    },
    {
      system: 'Achados Sistêmicos e Renais',
      findings: [
        {
          finding: 'Dor abdominal caudal à palpação',
          mechanism: 'Distensão da bexiga inflamada, peritonite focal perivesical por disseminação de mediadores inflamatórios ou gás retroperitoneal/perivesical.',
          clinicalMeaning: 'Alerta para envolvimento transmural profundo e requer palpação extremamente suave para evitar ruptura iatrogênica de parede desvitalizada.',
          priority: 'emergency',
          context: ['BSAVA Nephrology 3a ed.']
        },
        {
          finding: 'Febre ou hipotermia sistêmica',
          mechanism: 'Liberação maciça de interleucina-1, TNF-alfa e endotoxinas lipopolissacarídicas (LPS) de E. coli na circulação geral, disparando resposta inflamatória sistêmica.',
          clinicalMeaning: 'Indica infecção complicada com risco iminente de sepse, urossepticemia ou pielonefrite enfisematosa associada.',
          priority: 'emergency',
          context: ['Feline ECC 2a ed.']
        },
        {
          finding: 'Poliúria e polidipsia (PU/PD)',
          mechanism: 'Glicosúria com diurese osmótica em pacientes diabéticos descompensados, perda de gradiente medular renal em pielonefrite ou resistência tubular a ADH induzida por endotoxemia.',
          clinicalMeaning: 'Presente em cerca de 10,5% dos casos, aponta comorbidade endócrina subjacente ou lesão renal parenquimatosa.',
          priority: 'common',
          context: ['Lippi et al. 2019']
        },
        {
          finding: 'Letargia, anorexia e vômitos',
          mechanism: 'Uremia associada a lesão renal aguda (LRA) por infecção ascendente obstrutiva ou choque séptico com hipoperfusão esplâncnica.',
          clinicalMeaning: 'Evidência de repercussão sistêmica grave que exige internação imediata e suporte de terapia intensiva.',
          priority: 'emergency',
          context: ['Lee et al. 2023']
        }
      ]
    }
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem Clínica, POCUS Vesical e Precaução contra Instrumentação',
      purpose: 'Identificar a síndrome sem introduzir ar iatrogênico na via urinária',
      description: 'Avaliação clínica minuciosa do paciente com sinais de trato urinário inferior, colhendo histórico de diabetes, bexiga neurogênica e cateterismos prévios. Realizar triagem rápida por ultrassonografia à beira do leito (POCUS) antes de qualquer sondagem uretral, prevenindo o falso diagnóstico de pneumatúria decorrente de ar ambiente introduzido por cateter.',
      interpretation: 'A identificação de gás intraluminal ou intramural em animal virgem de manipulação recente estabelece alta probabilidade pré-teste de infecção produtora de gás.',
      limitations: 'Animais recentemente cateterizados ou submetidos a cistocentese podem apresentar bolhas de ar iatrogênicas isoladas no lúmen.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Radiografia Simples de Abdome (Projeções Lateral e Ventrodorsal)',
      purpose: 'Delinear o contorno vesical e detectar gás intramural e coleções extravesicais',
      description: 'Realização de projeções ortogonais de abdome caudal com técnica adequada de baixo contraste e alta definição de tecidos moles. Avaliar a bexiga urinária procurando radiolucências curvilíneas na periferia da silhueta vesical, nível hidroaéreo intraluminal e presença de gás no espaço retroperitoneal ou cavidade peritoneal livre.',
      interpretation: 'Estrias radiolucentes nítidas delineando a parede vesical caracterizam gás intramural; ausência de gás não descarta infecção inicial com coleções milimétricas.',
      limitations: 'Sobreposição de alças intestinais repletas de gás e fezes pode ocultar pequenas bolhas vesicais ou gerar falsa impressão de gás parietal.',
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: 'Ultrassonografia Abdominal e Vesical de Alta Resolução',
      purpose: 'Identificar gás na parede muscular, espessamento parietal e reverberação acústica característica',
      description: 'Varredura ultrassonográfica minuciosa da bexiga em múltiplos planos de corte com transdutor microconvexo ou linear de alta frequência. Avaliar a integridade da parede, espessura mural (normal em cães <2 a 3 mm e gatos <1,5 a 2 mm quando moderadamente distendida), presença de pólipos, cálculos e o comportamento do gás durante a mudança de decúbito do paciente.',
      interpretation: 'Interface hiperrefletiva brilhante com artefato característico de reverberação em cauda de cometa (comet-tail / ring-down artifact) e sombra acústica suja. O gás intramural permanece fixo à parede durante a movimentação corporal, enquanto o gás luminal livre migra para a porção antidependente da bexiga.',
      limitations: 'O acúmulo volumoso de gás intramural cria uma barreira acústica impenetrável que impede a visualização da luz vesical e da parede dorsal (presente em 34,2% dos casos na série de Lippi et al.).',
      isGoldStandard: true
    },
    {
      stepNumber: 4,
      title: 'Urinálise Completa com Citologia e Urocultura Quantitativa com TSA / MIC',
      purpose: 'Confirmar a etiologia bacteriana e estabelecer perfil de sensibilidade antimicrobiana formal',
      description: 'Coleta de urina por cistocentese cuidadosa guiada por ultrassom (selecionando área de parede preservada) ou cateterismo estéril com descarte dos primeiros jatos. Realizar exame físico-químico, citologia do sedimento urinário corado por panótico rápido ou Gram, e semeadura imediata para urocultura aeróbia quantitativa e TSA por microdiluição em caldo (MIC). Em casos refratários ou graves, solicitar urocultura anaeróbia.',
      interpretation: 'Bacteriúria significativa (>1000 UFC/mL em cistocentese ou >10000 UFC/mL em sondagem), hematúria, piúria e piócitos. E. coli é isolada em aproximadamente 68% dos casos; Proteus spp., Klebsiella spp. e Clostridium spp. constituem os agentes secundários mais frequentes.',
      limitations: 'Pacientes em uso recente de antimicrobianos podem apresentar cultura falso-negativa; cistocentese em bexiga com parede marcadamente enfisematosa ou necrótica envolve pequeno risco de extravasamento, exigindo cautela extrema.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Tomografia Computadorizada Abdominal com Contraste Intravenoso',
      purpose: 'Mapear a extensão tridimensional do gás, espaços retroperitoneais e acometimento renal',
      description: 'Exame tomográfico helicoidal contrastado de abdome total, permitindo cortes finos com reconstruções multiplanares e janela para tecidos moles e pulmão/gás. Indicado primordialmente quando o ultrassom estiver severamente obscurecido por artefatos de reverberação, houver dor lombar intensa, azotemia desproporcional ou suspeita de disseminação extravesical.',
      interpretation: 'Localização anatômica precisa de bolhas de gás na parede vesical, lúmen, tecido adiposo perivesical, retroperitônio e fossas isquiorretais. Confirmação inequívoca de pielonefrite enfisematosa caracterizada por focos gasosos intraparenquimatosos ou na pelve renal.',
      limitations: 'Necessidade de anestesia geral em pacientes potencialmente instáveis e custo financeiro mais elevado.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Rastreamento Laboratorial de Doenças Metabólicas e Comorbidades Sistêmicas',
      purpose: 'Descobrir e controlar os fatores fisiopatológicos que permitiram a instalação da infecção gasosa',
      description: 'Mensuração sérica de glicose, frutosamina sérica, perfil bioquímico renal (ureia, creatinina, fósforo, SDMA), eletrólitos (sódio, potássio, cloreto), enzimas hepáticas (ALT, fosfatase alcalina) e colesterol/triglicérides. Triagem para hiperadrenocorticismo (relação cortisol/creatinina urinária ou teste de supressão por dexametasona) e avaliação neurológica da contratilidade vesical.',
      interpretation: 'Identificação de diabetes mellitus descompensado (hiperglicemia associada a glicosúria), doença renal crônica ou aguda, hiperadrenocorticismo e bexiga neurogênica que atuam como gatilhos primários para a proliferação bacteriana produtora de gás.',
      limitations: 'O estresse agudo e a dor da hospitalização podem provocar hiperglicemia transitória moderada em felinos, exigindo confirmação pela frutosamina sérica.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria: 'Restabelecer a perfusão hemodinâmica do paciente, garantir fluxo urinário desobstruído com alívio do desconforto, iniciar antibioticoterapia bactericida direcionada com penetração tecidual na parede vesical e eliminar rigorosamente a fonte metabólica ou mecânica que propiciou a fermentação bacteriana.',
    
    terapiaAntimicrobianaDirecionada: 'A seleção antimicrobiana deve ser fundamentada estritamente no antibiograma com concentração inibitória mínima (MIC). Não considerar a cistite enfisematosa como uma bacteriúria simples ou cistite esporádica: trata-se de afecção com invasão bacteriana profunda da parede e potencial isquemia mural. Conforme alerta o guideline ISCAID 2019 e a scoping review de Weese & Weese 2026, a amoxicilina com clavulanato (12,5 a 25 mg/kg VO q12h) apresenta excelente concentração intraluminal urinária, mas seus breakpoints urinários laboratoriais podem superestimar a eficácia real contra cepas de E. coli invasivas no tecido vesical inflamado. Quando houver comprovação de sensibilidade no TSA e indicação de acometimento tecidual profundo ou ascendente, fluoroquinolonas como a enrofloxacina (5 a 20 mg/kg VO q24h em cães; ATENÇÃO: em gatos, limitar estritamente a 5 mg/kg/dia para evitar degeneração retiniana irreversível e cegueira) constituem opções eficazes por sua elevada lipossolubilidade e distribuição parenquimatosa. Sulfametoxazol-trimetoprima (15 a 30 mg/kg VO q12h) pode ser utilizado se houver susceptibilidade isolada, atentando para risco de ceratoconjuntivite seca (KCS) em cursos prolongados em cães. O meropenem (8,5 mg/kg IV q8h ou SC q12h em cães; 10 mg/kg IV/SC q12h em gatos) é estritamente restrito a patógenos multirresistentes (MDR) documentados em cultura e após esgotamento de opções terapêuticas de menor espectro.',
    
    duracaoTratamentoELacunaEvidencia: 'Não existem ensaios clínicos randomizados comparando durações terapêuticas na cistite enfisematosa. A scoping review de Weese & Weese 2026 documentou que o tempo mediano de tratamento descrito na literatura foi de 30 dias (intervalo de 18 a 35 dias). Contudo, essa duração reflete práticas empíricas históricas e não evidência de superioridade. Em casos estáveis com lesão restrita à bexiga e rápida melhora imaginológica, protocolos de 10 a 14 dias guiados por cultura e reavaliação ultrassonográfica podem ser considerados. Em contrapartida, pacientes com lesão transmural extensa, gás extravesical, pielonefrite enfisematosa concomitante, sepse ou uropatógenos multirresistentes frequentemente demandam 3 a 4 semanas de terapia antimicrobiana contínua, sempre ancorada em monitoramento objetivo por imagem e urocultura de controle.',
    
    manejoFatoresPredisponentes: 'O tratamento da cistite enfisematosa é ineficaz se o ambiente fermentativo não for desfeito. No paciente diabético, instituir protocolo intensivo de insulinoterapia para reduzir a glicemia abaixo do limiar de excreção renal (<180 mg/dL em cães; <250 a 280 mg/dL em gatos), cessando o aporte contínuo de glicose urinária para fermentação. Em pacientes com bexiga neurogênica e retenção urinária crônica, implementar esvaziamento vesical manual asséptico regular ou cateterismo vesical intermitente limpo, associando betanecol (em cães 5 a 25 mg/cão VO q8h; em gatos 1,25 a 5 mg/gato VO q8h a q12h) se houver atonia detrusora sem obstrução mecânica e prazosina para relaxamento esfincteriano. Em animais com urolitíase associada, proceder à remoção cirúrgica ou dissolução médica dos cálculos após resolução da fase enfisematosa aguda.',
    
    criteriosSondagemEDrenagemVesical: 'A sondagem uretral de demora não é indicada de forma profilática em todos os pacientes com CE, pois o próprio cateter atua como carreador retrógrado de bactérias hospitalares e irritante mecânico. O cateterismo vesical com sistema fechado estéril está restrito a animais com obstrução uretral concomitante, retenção urinária completa irresponsiva a manobras manuais, atonia grave ou necessidade imperiosa de monitoramento de débito urinário em choque séptico. É formalmente contraindicada a instilação intravesical de antibióticos ou agentes antissépticos (como clorexidina ou iodo povidona), prática proscrita pelas diretrizes da ISCAID pelo elevado risco de indução de cistite química severa, necrose tecidual e ausência total de benefício clínico demonstrado.',
    
    indicacoesIntervencaoCirurgica: 'A imensa maioria dos casos de cistite enfisematosa responde ao tratamento clínico intensivo e suporte hemodinâmico. A cirurgia de urgência (laparotomia exploratória com cistectomia parcial e debridamento) é estritamente reservada para complicações graves: evidência imaginológica de ruptura vesical com uroperitônio séptico, necrose gangrenosa transmural com desvitalização da parede, refratariedade clínica com peritonite refratária ou presença de grandes divertículos/pólipos infectados que exijam ressecção reconstrutiva.',
    
    condutasContraindicadas: 'Proibições formais: não prescrever anti-inflamatórios não esteroidais (AINEs) em animais azotêmicos, hipovolêmicos ou hipotensos; não prescrever enrofloxacina em gatos em doses superiores a 5 mg/kg/dia; não realizar lavagens vesicais intraluminais com soluções antissépticas ou biocidas; não utilizar carbapenêmicos (meropenem) de forma empírica sem confirmação de MDR; não interromper a terapia antimicrobiana antes da comprovação imaginológica de reabsorção completa do gás parietal e resolução do espessamento mural.',
    
    monitoramentoSeriadoEAlta: 'O acompanhamento do paciente com cistite enfisematosa deve ser estruturado em metas objetivas: reavaliação ultrassonográfica da bexiga em 3 a 5 dias para acompanhar a redução do volume de gás intramural e a diminuição dos artefatos de reverberação; dosagem periódica de creatinina, ureia e eletrólitos; monitoramento diário da glicemia capilar em diabéticos. A alta clínica requer ausência de sinais de dor abdominal, remissão da hematúria macroscópica, restabelecimento do padrão miccional voluntário e confirmação imaginológica de reabsorção do gás vesical. Realizar urocultura de controle 5 a 7 dias após o término formal da antibioticoterapia em casos complicados ou recidivantes.'
  },

  complications: [
    {
      complication: 'Pielonefrite enfisematosa ascendente',
      frequency: 'Incomum a grave',
      clinicalImplication: 'Colonização retrógrada dos ureteres e parênquima renal por patógenos produtores de gás, resultando em necrose supurativa renal, formação de bolhas intraparenquimatosas, perda abrupta da função nefronal e choque urosséptico de altíssima letalidade.'
    },
    {
      complication: 'Ruptura vesical e uroperitônio séptico',
      frequency: 'Rara, porém potencialmente fatal',
      clinicalImplication: 'Isquemia mural transmural decorrente da dissecção gasosa associada a necrose liquefativa bacteriana, levando à deiscência da parede vesical com colapso cardiovascular e peritonite séptica aguda.'
    },
    {
      complication: 'Disseminação gasosa extravesical (Pneumoperitônio e Pneumoretroperitônio)',
      frequency: 'Descrita em relatos de doença avançada',
      clinicalImplication: 'Migração de dióxido de carbono e hidrogênio através dos planos fasciais perivesicais para o espaço retroperitoneal e fossas isquiorretais, podendo mimetizar perfuração de víscera oca mesmo na ausência de ruptura mecânica da bexiga.'
    },
    {
      complication: 'Fibrose cicatricial da parede vesical e microbexiga',
      frequency: 'Crônica tardia',
      clinicalImplication: 'Substituição da musculatura lisa do detrusor por tecido colágeno fibroso denso após extensa necrose tecidual, culminando em perda permanente da complacência vesical e polaciúria intratável.'
    }
  ],

  prevention: [
    'Controle glicêmico rigoroso e contínuo em cães e gatos diabéticos, mantendo curvas glicêmicas otimizadas para reduzir ao máximo o aporte de glicosúria fermentável.',
    'Garantia de esvaziamento vesical completo e programado em animais com neuropatias espinhais, hérnias de disco ou síndrome da cauda equina para prevenir estase urinária estagnada.',
    'Investigação diagnóstica precoce de qualquer episódio de hematúria ou disúria em pacientes com endocrinopatias ou sob corticoterapia imunossupressora crônica.',
    'Manejo asséptico impecável e restrição do tempo de permanência de cateteres uretrais em animais internados em unidades de terapia intensiva.',
    'Remoção cirúrgica ou dissolução de cistólitos e correção de alterações anatômicas estruturais que atuem como nichos bacterianos permanentes.'
  ],

  figures: [
    {
      url: '/consulta-vet/cistite-enfisematosa/ultrassonografia-reverberacao-magalhaes2019.jpg',
      caption: 'Ultrassonografia da bexiga urinária de cão com cistite enfisematosa. Observa-se interface hiperecogênica irregular associada à parede vesical com artefato marcante de reverberação acústica distal (reverberation / dirty shadow artifact) decorrente da presença de gás intramural.',
      source: 'Magalhães et al. (2019), Acta Scientiae Veterinariae, CC BY 4.0'
    },
    {
      url: '/consulta-vet/cistite-enfisematosa/radiografia-cistite-enfisematosa-lee2023.webp',
      caption: 'Radiografias abdominais de cão com cistite enfisematosa antes e após o tratamento. No exame inicial, observam-se estrias radiolucentes delineando a parede vesical e gás se estendendo para tecidos adjacentes; após a terapia antimicrobiana adequada, verifica-se a completa resolução do componente gasoso.',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science, CC BY 4.0'
    },
    {
      url: '/consulta-vet/cistite-enfisematosa/ct-disseminacao-gasosa-lee2023.webp',
      caption: 'Tomografia computadorizada abdominal de cão com cistite enfisematosa avançada. Notam-se múltiplas coleções gasosas no lúmen e na parede vesical com dissecção para o espaço retroperitoneal e fossas isquiorretais, comprovando a capacidade da enfermidade de ultrapassar a lâmina própria vesical.',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science, CC BY 4.0'
    },
    {
      url: '/consulta-vet/cistite-enfisematosa/ct-pielonefrite-enfisematosa-lee2023.webp',
      caption: 'Tomografia computadorizada de cão com cistite enfisematosa complicada por pielonefrite enfisematosa bilateral. Observam-se focos de gás intramural vesical concomitantes a bolhas gasosas intraparenquimatosas em ambos os rins, demonstrando extensão infecciosa grave ao trato urinário superior.',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science, CC BY 4.0'
    }
  ],

  references: [
    {
      id: 'ref-weese-2026',
      title: 'Emphysematous cystitis in dogs and cats: a scoping review',
      citationText: 'Weese JS, Weese HE. Emphysematous cystitis in dogs and cats: a scoping review. The Veterinary Journal. 2026;318:106723. DOI: 10.1016/j.tvjl.2026.106723.',
      sourceType: 'systematic_review',
      url: 'https://doi.org/10.1016/j.tvjl.2026.106723',
      evidenceLevel: 'high',
      notes: 'Maior síntese sistemática da enfermidade reunindo 101 cães e 8 gatos, revelando prevalência de 68% de E. coli, 37% de gás exclusivamente mural, 23% exclusivamente intraluminal e 38% em ambos.'
    },
    {
      id: 'ref-merkel-2017',
      title: 'Clinicopathologic and Microbiologic Findings Associated with Emphysematous Cystitis in 27 Dogs',
      citationText: 'Merkel LK, Lulich J, Polzin D, Ober C, Westropp J, Sykes J. Clinicopathologic and Microbiologic Findings Associated with Emphysematous Cystitis in 27 Dogs. J Am Anim Hosp Assoc. 2017;53(6):313-320. DOI: 10.5326/JAAHA-MS-6722.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.5326/JAAHA-MS-6722',
      evidenceLevel: 'moderate',
      notes: 'Estudo clássico em 27 cães demonstrando que 26 apresentavam comorbidades, incluindo diabetes (33%), doença neurológica (26%) e endocrinopatia adrenal (19%).'
    },
    {
      id: 'ref-lippi-2019',
      title: 'Emphysematous cystitis: retrospective evaluation of predisposing factors and ultrasound features in 36 dogs and 2 cats',
      citationText: 'Lippi I, Mannucci T, Santa DD, Citi S. Emphysematous cystitis: retrospective evaluation of predisposing factors and ultrasound features in 36 dogs and 2 cats. Can Vet J. 2019;60(5):514-518.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6463776/',
      evidenceLevel: 'moderate',
      notes: 'Avaliação detalhada dos achados ultrassonográficos e fatores de risco em 38 animais, evidenciando infecção urinária crônica em 65,8% e diabetes em apenas 10,5%.'
    },
    {
      id: 'ref-lee-2023',
      title: 'Case report: emphysematous cystitis due to Escherichia coli infection with the extension of gas into multiple locations in two non-diabetic dogs',
      citationText: 'Lee EJ, Choi M, Yoon J. Case report: emphysematous cystitis due to Escherichia coli infection with the extension of gas into multiple locations in two non-diabetic dogs: a computed tomographic diagnosis and successful management. Front Vet Sci. 2023;10:1196006. DOI: 10.3389/fvets.2023.1196006.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.3389/fvets.2023.1196006',
      evidenceLevel: 'moderate',
      notes: 'Documentação primária em acesso aberto (CC BY 4.0) de cães não diabéticos com extensão gasosa retroperitoneal e pielonefrite enfisematosa bilateral diagnosticados por tomografia computadorizada.'
    },
    {
      id: 'ref-magalhaes-2019',
      title: 'Achados clínicos, laboratoriais e ultrassonográficos de cão diabético com cistite enfisematosa',
      citationText: 'Magalhães FF, Soares LM, Fernandes TH, Santos RR, Sousa MG. Achados clínicos, laboratoriais e ultrassonográficos de cão diabético com cistite enfisematosa. Acta Scientiae Veterinariae. 2019;47(Suppl 1):Pub. 372. DOI: 10.22456/1679-9216.90116.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.22456/1679-9216.90116',
      evidenceLevel: 'moderate',
      notes: 'Relato nacional de caso com rica documentação ultrassonográfica demonstrando artefato de reverberação mural acústica em paciente diabético (CC BY 4.0).'
    },
    {
      id: 'ref-fumeo-2019',
      title: 'Emphysematous cystitis: review of current literature, diagnosis and management challenges',
      citationText: 'Fumeo M, Manfredi S, Volta A. Emphysematous cystitis: review of current literature, diagnosis and management challenges. Vet Med Res Rep. 2019;10:77-83. DOI: 10.2147/VMRR.S210463.',
      sourceType: 'review_article',
      url: 'https://doi.org/10.2147/VMRR.S210463',
      evidenceLevel: 'moderate',
      notes: 'Revisão narrativa da fisiopatogenia, mecanismos de formação de CO2 e H2 e desafios de diferenciação em relação a pneumatúria iatrogênica.'
    },
    {
      id: 'ref-iscaid-2019',
      title: 'ISCAID guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats',
      citationText: 'Weese JS, Blondeau J, Boothe D, et al. International Society for Companion Animal Infectious Diseases guidelines for the diagnosis and management of bacterial urinary tract infections in dogs and cats. Vet J. 2019;247:8-25. DOI: 10.1016/j.tvjl.2019.02.008.',
      sourceType: 'clinical_guideline',
      url: 'https://doi.org/10.1016/j.tvjl.2019.02.008',
      evidenceLevel: 'high',
      notes: 'Consenso internacional orientador para antibioticoterapia em infecções urinárias bacterianas complicadas, enfatizando as limitações dos breakpoints urinários para infecção tecidual profunda.'
    },
    {
      id: 'ref-nelson-couto-6ed',
      title: 'Small Animal Internal Medicine',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 42: Bacterial Cystitis, Pyelonephritis, and Prostatitis in the Dog and Cat, pp. 704-711.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Referência clássica para a fisiopatologia da fermentação bacteriana de glicose e albumina na bexiga urinária e abordagem clínica de cistite bacteriana profunda.'
    },
    {
      id: 'ref-bsava-nephrology-3ed',
      title: 'BSAVA Manual of Canine and Feline Nephrology and Urology',
      citationText: 'Elliott J, Grauer GF, Westropp JL, eds. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. Gloucester: BSAVA; 2017. Chapter 7: Diagnostic Imaging, p. 108; Chapter 29: Urinary Tract Infections, pp. 336-337.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Descreve os achados clássicos de faixas curvilíneas radiográficas de gás contornando a parede vesical e manejo de infecções complicadas.'
    },
    {
      id: 'ref-feline-ecc-2ed',
      title: 'Feline Emergency and Critical Care Medicine',
      citationText: 'Drobatz KJ, Beal MW, Syring RS, eds. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell; 2023. Chapter 22: Urologic Emergencies, pp. 230-245.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Bases para abordagem de emergência em uropatias felinas, diagnóstico diferencial de FLUTDs e riscos de sepse bacteriana urológica.'
    },
    {
      id: 'ref-plumbs-10ed',
      title: "Plumb's Veterinary Drug Handbook",
      citationText: "Budde JA, ed. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Monografias farmacológicas de amoxicilina com clavulanato, enrofloxacina, sulfametoxazol-trimetoprima, nitrofurantoína e meropenem com posologias e alertas toxicológicos.'
    }
  ]
};
