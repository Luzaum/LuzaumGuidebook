import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const cistiteEnfisematosaCaesGatosSeed: DiseaseRecord = {
  id: 'disease-cistite-enfisematosa-caes-gatos',
  slug: 'cistite-enfisematosa-caes-gatos',
  title: 'Cistite Enfisematosa em Cães e Gatos',
  subtitle: 'Infecção e inflamação vesical profunda com produção e acúmulo de gás intraluminal e intramural por patógenos fermentadores de glicose e proteínas',
  synonyms: [
    'cistite gasosa',
    'emphysematous cystitis',
    'cistite com gás intramural',
    'infecção urinária produtora de gás',
    'gás vesical infeccioso'
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
    'iscaid',
    'stewardship'
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['cistite-enfisematosa-caes-gatos'],

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
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial da Cistite Enfisematosa',
      steps: [
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
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Manejo Clínico da Cistite Enfisematosa',
      steps: [
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
    }
  },

  etiology: {
    definicaoModernaESequenciaPatogenica: 'A cistite enfisematosa (CE) é uma forma incomum de doença infecciosa e inflamatória da bexiga na qual ocorre produção ou acúmulo de gás na parede vesical, no lúmen vesical ou em ambos, decorrente da proliferação de microrganismos produtores de gás. A patogênese desenrola-se em uma sequência biológica estrita: uropatógeno -> colonização e invasão da bexiga -> metabolismo de substratos fermentáveis -> síntese de gás hidrogênio (H2) e dióxido de carbono (CO2) -> acúmulo de gás intraluminal e/ou intramural -> inflamação transmural e isquemia da parede vesical. Historicamente, exigia-se a presença obrigatória de gás mural para a definição diagnóstica. Contudo, a scoping review de Weese & Weese (2026), avaliando 109 animais na literatura mundial, demonstrou uma distribuição heterogênea do gás: 37% dos pacientes apresentavam gás restrito à parede vesical, 23% apresentavam gás exclusivamente no lúmen vesical e 38% apresentavam envolvimento simultâneo de parede e lúmen. Portanto, o conceito contemporâneo define a CE como gás vesical patológico associado a processo infeccioso ativo, não excluindo pacientes com acometimento puramente intraluminal quando causas iatrogênicas forem descartadas (Nelson & Couto, 6a ed., Cap. 42, pp. 704-711; BSAVA Manual of Canine and Feline Nephrology and Urology, 3a ed., Cap. 29, pp. 336-337).',

    diferenciacaoConceitualPneumaturiaVsCistiteEnfisematosa: 'É indispensável diferenciar a cistite enfisematosa da simples pneumatúria. Pneumatúria traduz meramente a passagem de gás através da uretra durante a micção. Esse fenômeno pode ocorrer após instrumentação uretral, sondagem traumática, cistocentese prévia, cistoscopia, intervenções cirúrgicas do trato urogenital, introdução inadvertida de ar atmosférico durante lavagens ou fístulas anatômicas entre a bexiga e o trato gastrointestinal (fístula enterovesical, colovesical ou retovesical). Por sua vez, a cistite enfisematosa implica infecção ativa da bexiga por patógenos produtores de gás in situ. Consequentemente, uma imagem radiográfica ou ultrassonográfica realizada imediatamente após sondagem uretral que evidencie uma bolha de gás intraluminal não autoriza, isoladamente, o diagnóstico de CE. Regra de ouro prática no pronto-socorro: em pacientes hemodinamicamente estáveis sob suspeita de CE, realizar radiografia e ultrassonografia abdominal antes de qualquer instrumentação uretral para não criar um fator de confusão diagnóstico iatrogênico irreversível (Fumeo et al., 2019; Lippi et al., 2019).',

    fisiologiaDefesasVesicaisNormais: 'A bexiga urinária hígida não funciona como um mero reservatório inerte de urina, mas dispõe de cinco linhas biológicas ativas de defesa que impedem a colonização bacteriana ascendente (Nelson & Couto, 6a ed., Cap. 42): (1) Fluxo urinário unidirecional e esvaziamento mecânico completo: a micção periódica promove o washout contínuo de bactérias antes que estas estabeleçam adesão firme; (2) Integridade da barreira urotelial e camada superficial de glicosaminoglicanos (GAGs): proteoglicanos sulfatados e a proteína de Tamm-Horsfall impedem a fixação de fímbrias bacterianas às células em guarda-chuva uroteliais; (3) Fatores humorais e imunoglobulinas da mucosa: secreção local de IgA secretora e peptídeos antimicrobianos uroteliais; (4) Propriedades físico-químicas da urina: elevada osmolaridade, altas concentrações de ureia e ácidos orgânicos geram ambiente bacteriostático desfavorável para microrganismos não adaptados; (5) Zona de alta pressão e barreiras mecânicas da uretra proximal: tônus esfincteriano e muco uretral que retardam a ascensão bacteriana a partir da microbiota perineal. A quebra de uma ou mais dessas barreiras por estase urinária, bexiga neurogênica, urolitíase, endocrinopatias ou imunossupressão constitui o alicerce permissivo para a instalação da CE.',

    substratosFermentaveisGlicoseVsProteinas: 'O diabetes mellitus descompensado constitui o facilitador metabólico clássico da CE. Quando a glicemia ultrapassa o limiar de reabsorção tubular renal (aproximadamente 180 mg/dL em cães e 250 a 280 mg/dL em gatos), ocorre glicosúria maciça, fornecendo substrato glicídico abundante para a fermentação bacteriana acelerada. Simultaneamente, o estado hiperglicêmico crônico compromete a quimiotaxia, diapedese e fagocitose neutrofílica, atenuando a imunidade inata local. No entanto, a glicosúria não é um requisito obrigatório: Nelson & Couto (6a ed.) e Weese & Weese (2026) ressaltam que na ausência total de glicose, bactérias como Escherichia coli e Clostridium spp. possuem maquinaria enzimática para metabolizar proteínas teciduais, mucinas e albumina da parede vesical inflamada. A fermentação proteica bacteriana libera dióxido de carbono e gás hidrogênio por vias anaeróbias ácidas mistas. Portanto, é incorreto memorizar que cistite enfisematosa é exclusiva de diabéticos: pacientes normoglicêmicos com estase, bexiga neurogênica ou infecção crônica apresentam exatamente a mesma cascata fisiopatológica.',

    tabelaComparativaCaesVsGatos: {
      kind: 'clinicalTable',
      title: 'Comparativo Etiológico, Epidemiológico e Diagnóstico entre Cães e Gatos na Cistite Enfisematosa',
      headers: ['Parâmetro Clínico', 'Espécie Canina', 'Espécie Felina', 'Relevância Clínica'],
      rows: [
        ['Prevalência Relativa', '93% dos casos relatados na literatura (101/109)', 'Apenas 7,1% dos casos relatados (8/109)', 'CE é excepcionalmente rara em gatos; alta suspeição em cães idosos'],
        ['Papel do Diabetes Mellitus', 'Presente em 10% a 33% dos cães com CE', 'Descrito em gatos, mas com casuística total diminuta', 'DM é facilitador metabólico relevante, porém não é condição obrigatória'],
        ['Comorbidades Predominantes', 'ITU crônica recorrente, bexiga neurogênica, cistólitos e HAC', 'FLUTD/CIF prévia, cistólitos, DM e retenção pós-obstrutiva', 'Pesquisar ativamente causas mecânicas e neurológicas de estase urinária'],
        ['Diagnósticos Diferenciais', 'Cistite bacteriana simples, neoplasia urotelial, pólipos inflamatórios', 'Cistite idiopática felina (CIF), urólitos, tampões uretrais', 'Em gatos jovens com LUTS: CIF/urólitos >> ITU bacteriana >> CE'],
        ['Apresentação do Gás', 'Parede isolada (37%), lúmen (23%) ou ambos (38%)', 'Padrão intramural similar documentado por ultrassom e TC', 'Gás na parede sem instrumentação prévia confirma CE em ambas as espécies'],
        ['Risco Farmacológico Crítico', 'Toxicidade de TMP-sulfa (KCS e hepatopatia em cursos >7 dias)', 'Toxicidade retiniana por enrofloxacina (cegueira irreversível)', 'Em gatos, limitar estritamente enrofloxacina a no máximo 5 mg/kg/dia']
      ]
    },

    tabelaComparativaEstudosPredisponentes: {
      kind: 'clinicalTable',
      title: 'Comparativo de Coortes Clínicas: Fatores Predisponentes e Microbiologia na Cistite Enfisematosa',
      headers: ['Estudo Clínico', 'População Avaliada', 'Comorbidades Principais', 'Prevalência de Diabetes', 'Agente Predominante'],
      rows: [
        ['Merkel et al. (2017)', '27 cães com CE confirmada', 'Comorbidades em 96% (26/27); neurológico 26%, adrenal 19%', '33% dos cães (9/27)', 'Escherichia coli (isolada na maioria das culturas)'],
        ['Lippi et al. (2019)', '36 cães e 2 gatos com CE', 'ITU crônica prévia 65,8%, imunossupressão 26,3%, cistólitos 23,7%, bexiga neurogênica 18,4%', 'Apenas 10,5% dos casos (4/38)', 'E. coli em 71,4% dos isolados positivos'],
        ['Weese & Weese (2026)', '109 animais (101 cães, 8 gatos; scoping review)', 'Comorbidades metabólicas, neurológicas, anatômicas e urológicas crônicas combinadas', 'Presente em subgrupo, desmistificando associação exclusiva', 'E. coli em 68% dos casos com dado microbiológico']
      ]
    },

    fatoresPredisponentesMetabolicosEEstruturais: 'A instalação da cistite enfisematosa exige a quebra simultânea de uma ou mais barreiras naturais de defesa vesical. A estase urinária secundária a bexiga neurogênica (por discopatias intervertebrais, síndrome da cauda equina, neuropatia diabética ou disautonomia) elimina a depuração mecânica por washout, permitindo que coliformes ascendentes atinjam altas concentrações luminais. A presença de cistólitos, divertículos vesicais ou cistite polipoide lesa mecanicamente a camada protetora de GAGs uroteliais, expondo a lâmina própria à penetração bacteriana. Por sua vez, a imunossupressão sistêmica — induzida por hiperadrenocorticismo espontâneo, corticoterapia imunossupressora crônica, quimioterapia ou neoplasias — reduz o influxo neutrofílico e a opsonização imune, facilitando a invasão transmural profunda e a disseminação de microrganismos produtores de gás.'
  },

  epidemiology: {
    distribuicaoPorEspecieESexo: 'A cistite enfisematosa exibe marcante predomínio na espécie canina na literatura publicada. A scoping review de Weese & Weese (2026) identificou 109 casos documentados, dos quais 101 eram cães (93%) e apenas 8 eram gatos (7,1%). Em cães, observa-se maior representação de fêmeas, o que reflete a maior suscetibilidade anatômica geral do sexo feminino a infecções bacterianas ascendentes devido à uretra mais curta e próxima à região perianal. Em gatos, a raridade da doença e o reduzido número de publicações sugerem subdiagnóstico, mas também refletem a baixa prevalência intrínseca de cistite bacteriana em felinos jovens com urina fisiologicamente hiperconcentrada.',

    idadeEFaixaEtaria: 'A doença afeta predominantemente animais adultos maduros a idosos. Na revisão de Weese & Weese (2026), a mediana de idade dos pacientes com dados disponíveis foi de 8,5 anos. Merkel et al. (2017) relataram mediana de 9 anos em 27 cães, e Lippi et al. (2019) encontraram média similar de 9,2 anos, refletindo a faixa etária em que comorbidades crônicas como diabetes mellitus, hiperadrenocorticismo, discopatias e disfunções miccionais neurogênicas tornam-se prevalentes na rotina veterinária.',

    comorbidadesAssociadas: 'As comorbidades subjacentes estão presentes na quase totalidade dos pacientes. Na série de Merkel et al. (2017), 26 de 27 cães (96%) apresentavam comorbidades identificáveis: diabetes mellitus em 33%, afecções neurológicas espinhais com disfunção miccional em 26% e endocrinopatia adrenal em 19%. No estudo de Lippi et al. (2019) com 38 animais, infecção urinária crônica prévia foi documentada em 65,8%, imunossupressão em 26,3%, cistólitos em 23,7%, bexiga neurogênica em 18,4% e diabetes mellitus em apenas 10,5%, comprovando a heterogeneidade dos fatores de risco.',

    desmistificacaoMitosHistoricos: 'O principal mito histórico na rotina veterinária é o axioma de que a cistite enfisematosa seria uma doença patognomônica e exclusiva de pacientes diabéticos. Dados contemporâneos refutam categoricamente essa premissa: entre 67% e 89,5% dos pacientes em coortes recentes não possuíam diabetes mellitus. A estase urinária e a invasão tecidual por bactérias fermentadoras de proteínas são plenamente capazes de deflagrar a enfermidade na ausência de glicosúria. Assim, a regra clínica fundamental é: o diabetes é um facilitador metabólico relevante, mas estase urinária, infecção crônica, urolitíase e imunossupressão produzem exatamente o mesmo fenótipo clínico.',

    dadosPrognosticosWeese2026: 'A scoping review de Weese & Weese (2026) reuniu informações sobre desfecho clínico em 58 animais: 46 de 58 (79%) apresentaram recuperação clínica completa após a terapia inicial; 1 de 58 (1,7%) recuperou-se após um episódio de recidiva; e 11 de 58 (19%) evoluíram para óbito ou eutanásia. Esses 19% não devem ser interpretados como taxa de mortalidade específica da CE, pois decorrem de viés de publicação de casos graves e de comorbidades terminais não controladas. O prognóstico é favorável na maioria dos animais quando o tratamento antimicrobiano adequado e a correção do fator predisponente são instituídos tempestivamente.'
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
          finding: 'Letargia profunda, anorexia e vômitos reflexos',
          mechanism: 'Uremia associada a lesão renal aguda (LRA) por infecção ascendente obstrutiva ou choque séptico com hipoperfusão esplâncnica.',
          clinicalMeaning: 'Evidência de repercussão sistêmica grave que exige internação imediata e suporte de terapia intensiva.',
          priority: 'emergency',
          context: ['Lee et al. 2023']
        }
      ]
    },
    {
      system: 'Complicações Críticas e Sepse',
      findings: [
        {
          finding: 'Hipotensão, tempo de preenchimento capilar prolongado e choque distributivo',
          mechanism: 'Colapso hemodinâmico secundário à liberação intravascular maciça de endotoxinas Gram-negativas (LPS) induzindo vasodilatação patológica e aumento da permeabilidade capilar.',
          clinicalMeaning: 'Sinal iminente de choque séptico urológico; demanda ressuscitação volêmica agressiva, coleta de hemocultura e antibioticoterapia intravenosa imediata.',
          priority: 'emergency',
          context: ['Feline ECC 2a ed.']
        },
        {
          finding: 'Dor lombar intensa e nefromegalia dolorosa à palpação',
          mechanism: 'Colonização ascendente retrógrada da pelve e parênquima renal por patógenos produtores de gás, deflagrando pielonefrite enfisematosa com distensão da cápsula renal.',
          clinicalMeaning: 'Complicação com altíssimo risco de perda nefronal irreversível; exige tomografia ou ultrassonografia renal imediata e internação em UTI.',
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
      title: 'Rastreamento Laboratorial de Doenças Metabólicas e Hemocultura',
      purpose: 'Descobrir comorbidades fisiopatológicas e detectar bacteremia / sepse associada',
      description: 'Mensuração sérica de glicose, frutosamina, perfil bioquímico renal (ureia, creatinina, fósforo, SDMA), eletrólitos, enzimas hepáticas (ALT, fosfatase alcalina) e colesterol. Triagem para hiperadrenocorticismo e avaliação neurológica vesical. Em animais febris, hipotérmicos, hipotensos ou com suspeita de pielonefrite, colher hemocultura pareada antes do início de antimicrobianos sistêmicos (conforme diretrizes ISCAID 2019).',
      interpretation: 'Identificação de diabetes mellitus descompensado, lesão renal aguda, hiperadrenocorticismo e urossepticemia com isolamento bacteriano concordante na corrente sanguínea.',
      limitations: 'O estresse agudo da internação pode induzir hiperglicemia transitória moderada em felinos, demandando frutosamina sérica para confirmação diagnóstica de diabetes.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria: 'Restabelecer a perfusão hemodinâmica do paciente, garantir fluxo urinário desobstruído com alívio do desconforto, iniciar antibioticoterapia bactericida direcionada com penetração tecidual na parede vesical e eliminar rigorosamente a fonte metabólica ou mecânica que propiciou a fermentação bacteriana.',

    principioInvasaoTecidualEBreakpoints: 'A cistite enfisematosa não deve ser manejada como uma bacteriúria simples ou cistite esporádica superficial: trata-se de afecção transmural grave com invasão bacteriana profunda da parede, microtrombose vascular e potencial isquemia tecidual. Conforme alerta enfático do guideline ISCAID (2019) e de Plumb\'s (10a ed.), a amoxicilina com clavulanato possui breakpoints laboratoriais urinários permissivos baseados exclusivamente na sua enorme concentração intraluminal na urina. Esses breakpoints urinários não se aplicam a infecções invasivas da parede vesical, nas quais concentrações teciduais e séricas são os verdadeiros determinantes de eficácia. Portanto, não se deve presumir eficácia clínica de amoxicilina/clavulanato contra cepas de E. coli em CE apenas porque o laudo laboratorial reportou sensibilidade usando critérios de cistite esporádica simples.',

    tabelaTerapeuticaAntimicrobiana: {
      kind: 'clinicalTable',
      title: 'Tabela Farmacológica: Doses de Referência, Farmacocinética e Seleção Antimicrobiana na Cistite Enfisematosa',
      headers: ['Antimicrobiano', 'Espécie', 'Posologia de Referência', 'Vias', 'Papel e Particularidades na CE'],
      rows: [
        ['Amoxicilina + Clavulanato', 'Cão e Gato', '12,5 a 25 mg/kg q12h', 'Oral', 'Muito usada historicamente; breakpoints urinários não garantem eficácia tecidual em lesões transmurais profundas.'],
        ['Sulfametoxazol + Trimetoprima', 'Cão', '15 a 30 mg/kg q12h', 'Oral', 'Opção viável se isolado sensível; se >7 dias em cães, monitorar ceratoconjuntivite seca (KCS), hepatite e discrasias imunes.'],
        ['Enrofloxacina', 'Cão', '5 a 20 mg/kg q24h', 'Oral / SC / IV', 'Excelente penetração tecidual vesical e renal; reservar para infecção invasiva profunda, pielonefrite ou resistência comprovada.'],
        ['Enrofloxacina', 'Gato', 'Até 5 mg/kg q24h (máximo estrito)', 'Oral / SC / IV', 'Evitar se houver alternativa segura; dose >5 mg/kg/dia acarreta degeneração retiniana irreversível e cegueira aguda em gatos.'],
        ['Nitrofurantoína', 'Cão e Gato', '4,4 a 5 mg/kg q8h', 'Oral', 'Eficaz exclusivamente para lúmen vesical inferior; NÃO usar se houver invasão tecidual profunda da parede ou suspeita de pielonefrite.'],
        ['Meropenem', 'Cão: 8,5 mg/kg q8h IV ou q12h SC; Gato: 10 mg/kg q12h IV/SC', 'Cão e Gato', 'IV / SC / IM', 'Carbapenêmico restrito estritamente a enterobactérias multirresistentes (MDR) documentadas em TSA (Plumb\'s 10a ed.; Lee et al. 2023).']
      ]
    },

    stewardshipEFluoroquinolonas: 'Apesar de Escherichia coli responder por aproximadamente 68% dos casos de CE, a prescrição empírica e automática de fluoroquinolonas (como enrofloxacina ou marbofloxacina) diante da simples visualização de gás vesical é uma conduta desaconselhada pelas diretrizes internacionais de stewardship (ISCAID 2019). Fluoroquinolonas são antimicrobianos de importância crítica que devem ser preservados para infecções invasivas comprovadas da parede vesical, pielonefrite concomitante ou quando o antibiograma evidenciar resistência a classes de menor espectro. Em felinos, o risco adicional de toxicidade retiniana exige vigilância extrema, preferindo-se outras opções terapêuticas sempre que viável.',

    meropenemApenasMDR: 'O meropenem é um antimicrobiano de reserva crítica na medicina veterinária e humana. O relato de Lee et al. (2023) documentou o uso bem-sucedido de meropenem em um cão com CE e pielonefrite enfisematosa por E. coli multirresistente (resistente a ampicilina, cefalosporinas, fluoroquinolonas e aminoglicosídeos). Contudo, esse relato ilustra o tratamento de resgate para um patógeno MDR documentado, e não justifica a utilização empírica de carbapenêmicos. O Plumb\'s (10a ed.) preconiza que o meropenem seja restrito a infecções comprovadamente resistentes a todas as opções convencionais, com descalonamento imediato caso um fármaco de menor espectro se mostre viável.',

    duracaoTratamentoELacunaEvidencia: 'Não existem ensaios clínicos controlados avaliando a duração ideal do tratamento antimicrobiano na cistite enfisematosa. A scoping review de Weese & Weese (2026) identificou que nos 18 casos com duração informada, o tempo de tratamento variou de 18 a 35 dias, com mediana de 30 dias. Essa duração de 30 dias representa um reflexo descritivo de condutas empíricas históricas, e não uma recomendação fundamentada em medicina baseada em evidências. Raciocínio clínico contemporâneo escalonado: (1) Paciente clinicamente estável com infecção restrita à bexiga e rápida melhora ultrassonográfica em 5 a 7 dias: regimes de 10 a 14 dias guiados por cultura podem ser adequados; (2) Paciente com lesão transmural extensa, gás extravesical, pielonefrite enfisematosa, sepse ou microrganismo MDR: cursos prolongados de 2 a 4 semanas ou mais são necessários, sempre balizados pela comprovação imaginológica de reabsorção gasosa e urocultura de controle.',

    manejoFatoresPredisponentes: 'O controle da comorbidade de base é parte integrante inegociável do tratamento da cistite enfisematosa: (1) Diabetes mellitus: insulinoterapia intensiva para reduzir a glicemia abaixo do limiar renal (<180 mg/dL no cão; <250 a 280 mg/dL no gato), eliminando o fluxo contínuo de substrato fermentável na urina e recuperando a função neutrofílica; (2) Bexiga neurogênica: implementação de protocolo asséptico de esvaziamento vesical manual programado a cada 6 a 8 horas ou cateterismo intermitente limpo, associando betanecol (5 a 25 mg/cão VO q8h; 1,25 a 5 mg/gato VO q8-12h) se houver atonia detrusora sem obstrução física, e prazosina para relaxamento esfincteriano; (3) Urolitíase: remoção cirúrgica ou dissolução médica de cistólitos que perpetuem nichos de biofilme bacteriano; (4) Imunossupressão: reavaliação criteriosa da dose de corticosteroides ou imunossupressores em pacientes nefropatas ou dermatopatas.',

    criteriosSondagemEDrenagemVesical: 'A cateterização uretral de demora não é indicada rotineiramente em todos os pacientes com CE. O cateter uretral funciona como corpo estranho que traumatiza a mucosa inflamada e atua como conduto retrógrado para colonização hospitalar ascendente. A sondagem vesical sob sistema fechado estéril com bolsa coletora é estritamente indicada quando houver: obstrução uretral mecânica concomitante, atonia detrusora severa com retenção urinária completa irresponsiva a manobras manuais, ou necessidade crítica de mensuração rigorosa do débito urinário em choque séptico e ressuscitação volêmica intensiva. VETO FORMAL: a ISCAID (2019) contraindica terminantemente a instilação intravesical de soluções antimicrobianas, antissépticas ou biocidas (como clorexidina ou iodo povidona); essa prática não possui benefício terapêutico e acarreta lesão química severa, esfacelamento do urotélio e agravamento da necrose parietal.',

    indicacoesIntervencaoCirurgica: 'A vasta maioria dos pacientes com cistite enfisematosa recupera-se com tratamento clínico antimicrobiano e suporte médico intensivo. A laparotomia exploratória com cistectomia parcial reconstrutiva e debridamento está estritamente reservada para complicações mecânicas graves: suspeita imaginológica ou laboratorial de ruptura vesical com uroperitônio séptico, necrose gangrenosa transmural com perda da integridade estrutural, peritonite séptica refratária, presença de cistólitos obstrutivos gigantes não passíveis de dissolução ou fístulas urogenitais estruturais.',

    protocoloPlantaoPassoAPasso: 'Protocolo de plantão para abordagem imediata do paciente com suspeita de CE (10 etapas sequenciais): (1) Triagem de emergência: antes de qualquer sondagem uretral, realizar radiografia ou ultrassonografia abdominal para confirmar a presença real de gás intramural ou luminal virgem de manipulação; (2) Exame de imagem minucioso: pesquisar ativamente cálculos vesicais, massas, retenção volêmica, alterações de parênquima renal e gás perivesical/retroperitoneal; (3) Amostra urinária estéril: colher urina para urinálise completa com sedimento corado e urocultura quantitativa com TSA/MIC por cistocentese ecoguiada cautelosa (em área de parede sem enfisema severo) ou sondagem estéril com descarte do jato inicial; (4) Triagem laboratorial sistêmica: hemograma completo, perfil bioquímico (creatinina, ureia, SDMA, eletrólitos, glicose e frutosamina sérica); (5) Busca agressiva de predisponentes: rastrear diabetes mellitus, hiperadrenocorticismo, bexiga neurogênica, urolitíase, incontinência e uso prévio de imunossupressores; (6) Avaliação de gravidade sistêmica: se houver febre, hipotermia, hipotensão, neutropenia, azotemia acentuada ou suspeita de pielonefrite enfisematosa, colher hemocultura antes dos antibióticos, internar em UTI e iniciar antibioticoterapia parenteral com boa penetração tecidual; (7) Paciente estável: não prescrever fluoroquinolonas automaticamente; iniciar antimicrobiano com base em histórico e epidemiologia local enquanto aguarda o TSA; (8) Retorno do antibiograma: descalonar imediatamente para o antimicrobiano de menor espectro que apresente sensibilidade formal e adequada penetração no tecido vesical; (9) Controle imaginológico seriado: repetir ultrassonografia ou radiografia em 3 a 5 dias em pacientes graves, ou em 5 a 7 dias em pacientes estáveis, para documentar a reabsorção do gás; (10) Critério de alta: não encerrar o tratamento apenas pela melhora dos sinais clínicos; comprovar a resolução imaginológica do gás vesical e o controle definitivo do fator predisponente.',

    errosComunsEvitar: 'Dez erros comuns na rotina clínica e como evitá-los: (1) Presumir que só diabéticos desenvolvem CE: falso, entre 67% e 89,5% dos animais em séries recentes não tinham diabetes; (2) Assumir que qualquer gás na bexiga é CE: falso, sondagem recente, cirurgia ou fístulas causam pneumatúria sem infecção ativa; (3) Exigir obrigatoriamente gás na parede para diagnosticar CE: falso, 23% dos casos apresentam gás exclusivamente intraluminal; (4) Confiar no breakpoint urinário de amoxicilina/clavulanato para lesões transmurais profundas: os breakpoints urinários não refletem concentração tecidual; (5) Prescrever fluoroquinolonas de forma empírica e automática: viola o stewardship antimicrobiano; (6) Prescrever enrofloxacina em gatos acima de 5 mg/kg/dia: risco iminente de cegueira irreversível por retinopatia; (7) Impor 30 dias de antibiótico como regra rígida para todos os pacientes: a duração deve ser individualizada pela resposta por imagem; (8) Manter sonda uretral de demora em todos os pacientes: eleva o risco de biofilme e infecção nosocomial ascendente; (9) Realizar lavagens vesicais com antissépticos ou antibióticos: formalmente contraindicado pela ISCAID; (10) Descartar CE por radiografia normal ou considerar ultrassom falho por excesso de reverberação: o próprio artefato de reverberação em cauda de cometa é a pista diagnóstica principal.',

    condutasContraindicadas: 'Proibições formais: não prescrever anti-inflamatórios não esteroidais (AINEs) em animais azotêmicos, hipovolêmicos ou hipotensos; não prescrever enrofloxacina em gatos em doses superiores a 5 mg/kg/dia; não realizar lavagens vesicais intraluminais com soluções antissépticas ou biocidas; não utilizar carbapenêmicos (meropenem) de forma empírica sem confirmação de MDR; não interromper a terapia antimicrobiana antes da comprovação imaginológica de reabsorção completa do gás parietal e resolução do espessamento mural.',

    monitoramentoSeriadoEAlta: 'O acompanhamento do paciente com cistite enfisematosa deve ser estruturado em metas objetivas: reavaliação ultrassonográfica da bexiga em 3 a 5 dias para acompanhar a redução do volume de gás intramural e a diminuição dos artefatos de reverberação; dosagem periódica de creatinina, ureia e eletrólitos; monitoramento diário da glicemia capilar em diabéticos. A alta clínica requer ausência de sinais de dor abdominal, remissão da hematúria macroscópica, restabelecimento do padrão miccional voluntário e confirmação imaginológica de reabsorção do gás vesical. Realizar urocultura de controle 5 a 7 dias após o término formal da antibioticoterapia em casos complicados ou recidivantes.'
  },

  complications: {
    pielonefriteEnfisematosaAscendente: 'Colonização retrógrada dos ureteres e parênquima renal por patógenos produtores de gás, resultando em necrose supurativa renal, formação de bolhas intraparenquimatosas, perda abrupta da função nefronal, lesão renal aguda intrínseca e choque urosséptico de altíssima letalidade.',

    rupturaVesicalEUroperitonioSeptico: 'Isquemia mural transmural decorrente da dissecção gasosa associada a necrose liquefativa bacteriana, levando à deiscência da parede vesical com colapso cardiovascular, peritonite química e séptica aguda e necessidade imediata de laparotomia exploratória de emergência.',

    disseminacaoGasosaExtravesical: 'Migração de dióxido de carbono e hidrogênio através dos planos fasciais perivesicais para o espaço retroperitoneal e fossas isquiorretais, podendo mimetizar perfuração de víscera oca ou pneumoperitônio mesmo na ausência de ruptura mecânica da bexiga (Lee et al., 2023).',

    fibroseCicatricialEMicrobexiga: 'Substituição da musculatura lisa do detrusor por tecido colágeno fibroso denso após extensa necrose tecidual, culminando em perda permanente da complacência vesical, redução drástica da capacidade de armazenamento e polaciúria crônica intratável.',

    urosepticemiaEChoqueSeptico: 'Disseminação hematogênica de endotoxinas lipopolissacarídicas (LPS) e bactérias viáveis a partir da microvasculatura vesical lesionada, deflagrando síndrome da resposta inflamatória sistêmica (SIRS), choque distributivo hipotensivo e disfunção de múltiplos órgãos.'
  },

  prevention: {
    controleGlicemicoEReducaoGlicosuria: 'Controle glicêmico rigoroso e contínuo em cães e gatos diabéticos mediante insulinoterapia individualizada e curvas glicêmicas seriadas, visando manter a glicemia abaixo do limiar renal para mitigar o aporte de glicosúria fermentável.',

    manejoEsvaziamentoBexigaNeurogenica: 'Garantia de esvaziamento vesical completo e programado a cada 6 a 8 horas em animais com neuropatias espinhais, hérnias de disco ou síndrome da cauda equina, prevenindo a estase urinária estagnada que propicia colonização microbiana.',

    investigacaoPrecoceComorbidades: 'Vigilância clínica ativa e rastreamento precoce de qualquer episódio de hematúria, disúria ou periúria em pacientes com hiperadrenocorticismo espontâneo ou sob corticoterapia imunossupressora crônica.',

    cuidadosComSondagemUretral: 'Manejo asséptico rigoroso na cateterização uretral, restrição estrita do tempo de permanência de cateteres e uso exclusivo de sistemas coletores fechados estéreis em unidades de terapia intensiva para evitar bacteriúria nosocomial ascendente.',

    remocaoDeCalculosEEstruturas: 'Remoção cirúrgica ou dissolução médica oportuna de cistólitos e correção de alterações anatômicas estruturais (divertículos, pólipos) que atuem como nichos bacterianos permanentes.'
  },

  figures: [
    {
      id: 'fig-ce-01',
      title: 'Ultrassonografia Vesical com Artefato de Reverberação Mural em Cão Diabético',
      url: '/consulta-vet/cistite-enfisematosa/ultrassonografia-reverberacao-magalhaes2019.jpg',
      legend: 'Ultrassonografia da bexiga urinária de cão diabético com cistite enfisematosa. Observa-se interface hiperecogênica irregular associada à parede vesical com artefato marcante de reverberação acústica distal em cauda de cometa (ring-down / dirty shadow artifact) decorrente da presença de gás intramural (Magalhães et al., 2019, Acta Scientiae Veterinariae, CC BY 4.0).',
      source: 'Magalhães et al. (2019), Acta Scientiae Veterinariae, CC BY 4.0'
    },
    {
      id: 'fig-ce-02',
      title: 'Radiografias Abdominais de Cão com Cistite Enfisematosa Antes e Após Tratamento',
      url: '/consulta-vet/cistite-enfisematosa/radiografia-cistite-enfisematosa-lee2023.webp',
      legend: 'Radiografias abdominais de cão com cistite enfisematosa antes e após o tratamento clínico. No exame inicial, observam-se estrias radiolucentes nítidas contornando a parede vesical e gás se estendendo para tecidos moles perivesicais; após a terapia antimicrobiana adequada, verifica-se a completa resolução do componente gasoso (Lee et al., 2023, Frontiers in Veterinary Science, CC BY 4.0).',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science, CC BY 4.0'
    },
    {
      id: 'fig-ce-03',
      title: 'Tomografia Computadorizada com Extensão Gasosa Retroperitoneal e Isquiorretal',
      url: '/consulta-vet/cistite-enfisematosa/ct-disseminacao-gasosa-lee2023.webp',
      legend: 'Tomografia computadorizada abdominal de cão com cistite enfisematosa avançada. Notam-se múltiplas coleções gasosas no lúmen e na parede vesical com dissecção contínua através dos planos fasciais para o espaço retroperitoneal e fossas isquiorretais, demonstrando a capacidade da enfermidade de ultrapassar a serosa vesical sem ruptura franca (Lee et al., 2023, Frontiers in Veterinary Science, CC BY 4.0).',
      source: 'Lee et al. (2023), Frontiers in Veterinary Science, CC BY 4.0'
    },
    {
      id: 'fig-ce-04',
      title: 'Tomografia Computadorizada de Cistite Enfisematosa com Pielonefrite Enfisematosa Bilateral',
      url: '/consulta-vet/cistite-enfisematosa/ct-pielonefrite-enfisematosa-lee2023.webp',
      legend: 'Tomografia computadorizada helicoidal de cão com cistite enfisematosa complicada por pielonefrite enfisematosa bilateral ascendente. Observam-se focos de gás intramural vesical concomitantes a bolhas gasosas intraparenquimatosas e na pelve de ambos os rins, demonstrando extensão infecciosa grave ao trato urinário superior (Lee et al., 2023, Frontiers in Veterinary Science, CC BY 4.0).',
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
      id: 'ref-weese-delphi-2026',
      title: 'Consensus definitions for bacterial urinary tract disease in dogs and cats: A modified Delphi study',
      citationText: 'Weese JS, et al. Consensus definitions for bacterial urinary tract disease in dogs and cats: A modified Delphi study. Journal of Small Animal Practice. 2026; DOI: 10.1111/jsap.70127.',
      sourceType: 'consensus_guideline',
      url: 'https://doi.org/10.1111/jsap.70127',
      evidenceLevel: 'high',
      notes: 'Atualização terminológica internacional padronizando 29 definições consensuais para doenças bacterianas do trato urinário em cães e gatos.'
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
