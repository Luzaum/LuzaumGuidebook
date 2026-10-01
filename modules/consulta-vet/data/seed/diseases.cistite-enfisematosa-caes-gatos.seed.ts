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
    definicaoModernaESequenciaPatogenica: `A cistite enfisematosa (CE) é uma forma incomum de doença infecciosa e inflamatória da bexiga com acúmulo patológico de gás na parede vesical, no lúmen vesical ou em ambos, decorrente da proliferação de microrganismos produtores de gás.

Sequência patogênica biológica:
- Colonização e adesão: Uropatógeno coloniza e invade o urotélio vesical.
- Metabolismo ativo: Fermentação bacteriana de substratos disponíveis (glicose ou proteínas teciduais).
- Gênese de gás: Síntese e liberação de gás hidrogênio (H2) e dióxido de carbono (CO2).
- Acúmulo estrutural: Formação de gás intraluminal e/ou intramural dissecante.
- Dano tecidual: Inflamação transmural, compressão capilar e isquemia parietal vesical.

Distribuição anatômica do gás (scoping review de Weese & Weese 2026 em 109 animais):
- Gás intramural isolado: 37% dos pacientes.
- Gás exclusivamente intraluminal: 23% dos pacientes.
- Acometimento misto (parede e lúmen): 38% dos pacientes.

Conceito contemporâneo:
- O diagnóstico define-se pela presença de gás patológico associado a processo infeccioso ativo in situ.
- Não se restringe apenas a lesões parietais, englobando também acometimento puramente luminal após exclusão de causas iatrogênicas (Nelson & Couto, 6a ed., Cap. 42, pp. 704-711; BSAVA Manual of Canine and Feline Nephrology and Urology, 3a ed., Cap. 29, pp. 336-337).`,

    diferenciacaoConceitualPneumaturiaVsCistiteEnfisematosa: `Diferenciação conceitual essencial: Cistite Enfisematosa vs. Pneumatúria Isolada:
- Pneumatúria isolada: Passagem de ar ou gás pela uretra durante a micção. Ocorre frequentemente após cateterismo prévio, cistocentese, cistoscopia, intervenções cirúrgicas, lavagens vesicais ou fístulas enterovesicais, colovesicais e retovesicais.
- Cistite enfisematosa verdadeira: Infecção bacteriana ativa com síntese contínua de gás in situ por patógenos fermentadores.
- Relevância diagnóstica: A visualização de bolha gasosa intraluminal logo após sondagem uretral não autoriza, isoladamente, o diagnóstico de CE.

REGRA DE OURO: Em pacientes hemodinamicamente estáveis sob suspeita de CE, realizar radiografia e ultrassonografia abdominal antes de qualquer instrumentação uretral para não criar fator de confusão diagnóstico iatrogênico irreversível (Fumeo et al., 2019; Lippi et al., 2019).`,

    fisiologiaDefesasVesicaisNormais: `A bexiga urinária hígida não funciona como mero reservatório inerte, dispondo de cinco linhas biológicas ativas de defesa contra colonização bacteriana ascendente (Nelson & Couto, 6a ed., Cap. 42):
- Fluxo urinário unidirecional e esvaziamento mecânico completo: A micção periódica promove o washout contínuo de bactérias antes de adesão firme.
- Barreira urotelial e camada superficial de glicosaminoglicanos (GAGs): Proteoglicanos sulfatados e a proteína de Tamm-Horsfall impedem a fixação de fímbrias bacterianas às células em guarda-chuva.
- Fatores humorais e imunoglobulinas da mucosa: Secreção local ativa de IgA secretora e peptídeos antimicrobianos uroteliais.
- Propriedades físico-químicas desfavoráveis da urina: Alta osmolaridade, elevadas concentrações de ureia e ácidos orgânicos criam ambiente bacteriostático adverso.
- Zona de alta pressão e barreiras mecânicas da uretra: Tônus esfincteriano e muco uretral proximal que retardam a ascensão de microbiota perineal.

ATENÇÃO CLÍNICA: A quebra de uma ou mais dessas barreiras por estase urinária, bexiga neurogênica, urolitíase, endocrinopatias ou imunossupressão constitui o alicerce permissivo para a instalação da CE.`,

    substratosFermentaveisGlicoseVsProteinas: `Substratos metabólicos para produção gasosa bacteriana:

Papel do Diabetes Mellitus:
- Quando a glicemia supera o limiar de reabsorção tubular renal (~180 mg/dL em cães; ~250–280 mg/dL em gatos), surge glicosúria maciça, fornecendo substrato glicídico abundante para fermentação bacteriana acelerada.
- O estado hiperglicêmico crônico compromete concomitantemente a quimiotaxia, diapedese e fagocitose neutrofílica, atenuando a imunidade inata local.

Fermentação em Pacientes Não Diabéticos:
- A glicosúria não é requisito obrigatório: Nelson & Couto (6a ed.) e Weese & Weese (2026) ressaltam que na ausência total de glicose, bactérias como Escherichia coli e Clostridium spp. possuem maquinaria enzimática para metabolizar proteínas teciduais, mucinas e albumina da parede vesical inflamada.
- A fermentação proteica bacteriana libera dióxido de carbono e gás hidrogênio por vias anaeróbias ácidas mistas.

MITO: Presumir que cistite enfisematosa é exclusiva de pacientes diabéticos: Animais normoglicêmicos com estase, bexiga neurogênica ou infecção crônica apresentam exatamente a mesma cascata fisiopatológica.`,

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

    fatoresPredisponentesMetabolicosEEstruturais: `A instalação da cistite enfisematosa exige a quebra simultânea de uma ou mais barreiras naturais de defesa vesical:
- Estase urinária e bexiga neurogênica: Discopatias intervertebrais, cauda equina, neuropatia diabética ou disautonomia eliminam o washout mecânico, permitindo que coliformes atinjam altas concentrações.
- Lesão mecânica e perda de GAGs: Cistólitos, divertículos ou cistite polipoide lesam a camada urotelial protetora, expondo a lâmina própria à penetração microbiana.
- Imunossupressão sistêmica: Hiperadrenocorticismo espontâneo, corticoterapia crônica, quimioterapia ou neoplasias atenuam o influxo neutrofílico e a opsonização imune, favorecendo a invasão transmural profunda e a disseminação de microrganismos produtores de gás.`
  },

  epidemiology: {
    distribuicaoPorEspecieESexo: `Distribuição por espécie e predisposição sexual na literatura:
- Em Cães: Marcante predomínio na espécie canina (93% dos casos; 101/109 animais na scoping review de Weese & Weese 2026). Observa-se maior representação em fêmeas, refletindo uretra mais curta e próxima à região perianal.
- Em Gatos: Acometimento raro (7,1%; 8/109 casos descritos), associado a comorbidades urológicas crônicas ou metabólicas; a urina fisiologicamente hiperconcentrada de felinos atua como barreira bacteriostática parcial.`,

    idadeEFaixaEtaria: `Faixa etária e perfil epidemiológico:
- Animais adultos maduros a idosos: Mediana de 8,5 anos na revisão de Weese & Weese (2026).
- Dados de coortes de referência: Mediana de 9,0 anos em 27 cães por Merkel et al. (2017) e média de 9,2 anos em 38 animais por Lippi et al. (2019).
- Relevância clínica: Coincide diretamente com a faixa etária de maior prevalência de diabetes mellitus, hiperadrenocorticismo, discopatias espinhais e retenção urinária crônica.`,

    comorbidadesAssociadas: `Comorbidades documentadas em séries clínicas de referência:
- Coorte de Merkel et al. (2017; n = 27): Comorbidades em 96% dos cães (diabetes mellitus em 33%, afecções neurológicas espinhais com disfunção miccional em 26% e endocrinopatia adrenal em 19%).
- Coorte de Lippi et al. (2019; n = 38): Infecção urinária crônica prévia em 65,8%, imunossupressão em 26,3%, cistólitos em 23,7%, bexiga neurogênica em 18,4% e diabetes mellitus em apenas 10,5%.`,

    desmistificacaoMitosHistoricos: `Desmistificação do axioma clássico de exclusividade diabética:
- MITO: A cistite enfisematosa é patognomônica e exclusiva de pacientes diabéticos: Entre 67% e 89,5% dos pacientes em coortes recentes não possuíam diabetes mellitus.
- Mecanismo independente: A estase urinária e a fermentação de proteínas teciduais por coliformes são plenamente capazes de deflagrar a enfermidade na ausência de glicosúria.

REGRA DE OURO: O diabetes é um facilitador metabólico relevante, mas estase urinária, infecção crônica, urolitíase e imunossupressão produzem exatamente o mesmo fenótipo clínico.`,

    dadosPrognosticosWeese2026: `Desfecho clínico e sobrevida (Scoping review de Weese & Weese 2026; n = 58):
- Recuperação clínica completa: 79% dos pacientes (46/58) apresentaram recuperação completa após a terapia inicial orientada.
- Recuperação após recidiva tratada: 1,7% dos casos (1/58).
- Óbito ou eutanásia: 19% dos animais (11/58), taxa que reflete viés de publicação de casos graves e descompensação de comorbidades terminais não controladas.
- Prognóstico geral: Eminentemente favorável na maioria dos pacientes quando a antibioticoterapia direcionada e o controle do fator predisponente são instituídos precocemente.`
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
    mecanismosFermentacaoProducaoGas: `Mecanismos bioquímicos da fermentação e síntese gasosa:
- Fermentação ácida mista anaeróbia: Escherichia coli e outras enterobactérias possuem vias metabólicas que, sob hipóxia luminal ou tecidual, convertem glicose em ácido láctico, ácido acético, ácido fórmico, etanol, CO2 e H2.
- Ação da formato hidrogênio liase: Complexo enzimático bacteriano que cliva o ácido fórmico diretamente em dióxido de carbono e gás hidrogênio sob tensão expansiva.
- Fermentação proteica tecidual: Em pacientes normoglicêmicos, a clivagem bacteriana de aminoácidos sulfurados e albumina da mucosa vesical lesada por coliformes ou Clostridium spp. libera gases equivalentes e sustenta a pneumatogênese tecidual.`,

    dissecacaoMuralEComprometimentoVascular: `Dissecção tecidual parietal e isquemia microvascular:
- Dissecção anatômica: O gás gerado sob pressão disseca ativamente os planos da lâmina própria e da túnica muscular lisa do detrusor, formando vesículas intramurais coalescentes.
- Isquemia capilar compressiva: O confinamento gasoso sob tensão mecânica exerce compressão capilar extrínseca, promovendo microtrombose vascular e isquemia parietal secundária.
- Ciclo vicioso de necrose tecidual: A isquemia local prejudica o afluxo de neutrófilos, imunoglobulinas e antimicrobianos séricos ao nicho infeccioso, acelerando necrose transmural e risco de deiscência ou ruptura vesical espontânea.`,

    disseminacaoExtravesicalEPielonefriteAscendente: `Disseminação tecidual extravesical e vias ascendentes:
- Disseminação contígua retroperitoneal: A fáscia perivesical comunica-se com o retroperitônio e assoalho pélvico; o gás sob alta pressão ultrapassa a serosa íntegra e preenche fossas isquiorretais, simulando pneumoperitônio ou ruptura de víscera oca (Lee et al. 2023).
- Incompetência ureterovesical: A distorção parietal e o edema da junção ureterovesical favorecem o refluxo vesicoureteral de urina infectada e bolhas gasosas em direção aos rins.
- Pielonefrite enfisematosa: Colonização supurativa e gás intraparenquimatoso renal bilateral, complicação de altíssima letalidade com lesão renal aguda e choque urosséptico.`
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

    principioInvasaoTecidualEBreakpoints: `Princípio de invasão tecidual vs. breakpoints urinários convencionais:
- Invasão transmural profunda: A cistite enfisematosa não deve ser manejada como bacteriúria simples ou cistite superficial, mas como infecção transmural grave com invasão profunda da parede, microtrombose vascular e isquemia tecidual.
- Falácia dos breakpoints urinários: Conforme alerta enfático da ISCAID (2019) e Plumb's (10a ed.), a amoxicilina com clavulanato possui breakpoints urinários laboratoriais permissivos baseados exclusivamente na sua enorme concentração intraluminal na urina.
- Concentração tecidual vs. intraluminal: Esses breakpoints urinários não se aplicam a infecções invasivas da parede vesical, nas quais concentrações teciduais e séricas são os verdadeiros determinantes de eficácia.

REGRA DE OURO: Não presumir eficácia clínica de amoxicilina/clavulanato contra cepas de E. coli em CE apenas porque o laudo laboratorial reportou sensibilidade usando critérios de cistite esporádica simples.`,

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

    stewardshipEFluoroquinolonas: `Critérios de prescrição de fluoroquinolonas e Stewardship antimicrobiano:
- Racional do stewardship (ISCAID 2019): Embora Escherichia coli responda por cerca de 68% dos casos de CE, a prescrição empírica e automática de fluoroquinolonas (como enrofloxacina ou marbofloxacina) diante da simples visualização de gás vesical é conduta desaconselhada pelas diretrizes internacionais.
- Indicações estritas para fluoroquinolonas: Antimicrobianos de importância crítica que devem ser preservados para infecções invasivas comprovadas da parede vesical, pielonefrite concomitante ou resistência documentada a classes de menor espectro.

CONTRAINDICAÇÃO FORMAL: Em felinos, a enrofloxacina em doses superiores a 5 mg/kg/dia acarreta degeneração retiniana aguda irreversível e cegueira permanente. Preferir sempre alternativas terapêuticas mais seguras.`,

    meropenemApenasMDR: `Critérios estritos para o uso de Meropenem:
- Antimicrobiano de reserva crítica: O relato de Lee et al. (2023) documentou o uso bem-sucedido de meropenem em um cão com CE e pielonefrite enfisematosa por E. coli multirresistente (resistente a ampicilina, cefalosporinas, fluoroquinolonas e aminoglicosídeos).
- Indicação exclusiva: Esse relato ilustra tratamento de resgate para patógeno MDR documentado, não justificando qualquer utilização empírica de carbapenêmicos.
- Recomendações de referência: Plumb's (10a ed.) preconiza que o meropenem seja restrito a infecções comprovadamente resistentes a todas as opções convencionais, com descalonamento imediato caso um fármaco de menor espectro se mostre viável.`,

    duracaoTratamentoELacunaEvidencia: `Duração da antibioticoterapia e raciocínio clínico escalonado:
- Evidência contemporânea: Não existem ensaios clínicos controlados avaliando a duração ideal do tratamento antimicrobiano na cistite enfisematosa. A scoping review de Weese & Weese (2026) identificou que nos 18 casos com duração informada, o tempo variou de 18 a 35 dias (mediana de 30 dias), reflexo descritivo de condutas empíricas históricas e não recomendação formal.

Estratificação clínica individualizada:
- Paciente clinicamente estável: Infecção restrita à bexiga com rápida melhora ultrassonográfica em 5 a 7 dias: regimes de 10 a 14 dias guiados por cultura podem ser adequados.
- Paciente com infecção complicada: Lesão transmural extensa, gás extravesical, pielonefrite enfisematosa, sepse ou microrganismo MDR: cursos prolongados de 2 a 4 semanas ou mais são necessários, sempre balizados pela comprovação imaginológica de reabsorção gasosa e urocultura de controle.`,

    manejoFatoresPredisponentes: `Controle inegociável das comorbidades de base:
- Diabetes Mellitus: Insulinoterapia intensiva para reduzir a glicemia abaixo do limiar renal (<180 mg/dL no cão; <250 a 280 mg/dL no gato), eliminando o fluxo contínuo de substrato fermentável na urina e recuperando a função neutrofílica.
- Bexiga neurogênica: Implementação de protocolo asséptico de esvaziamento vesical manual programado a cada 6 a 8 horas ou cateterismo intermitente limpo; associar betanecol (5 a 25 mg/cão VO q8h; 1,25 a 5 mg/gato VO q8–12h) se houver atonia detrusora sem obstrução física, e prazosina para relaxamento esfincteriano.
- Urolitíase: Remoção cirúrgica ou dissolução médica de cistólitos que perpetuem nichos de biofilme bacteriano.
- Imunossupressão: Reavaliação criteriosa da dose de corticosteroides ou imunossupressores em pacientes nefropatas ou dermatopatas.`,

    criteriosSondagemEDrenagemVesical: `A cateterização uretral de demora não é indicada rotineiramente em todos os pacientes com CE:
- Risco microbiológico: O cateter uretral funciona como corpo estranho que traumatiza a mucosa inflamada e atua como conduto retrógrado para colonização hospitalar ascendente.

Indicações estritas para sondagem vesical (sob sistema fechado estéril com bolsa coletora):
- Obstrução uretral mecânica concomitante.
- Atonia detrusora severa com retenção urinária completa irresponsiva a manobras manuais.
- Necessidade crítica de mensuração rigorosa do débito urinário em choque séptico e ressuscitação volêmica intensiva.

CONTRAINDICAÇÃO FORMAL: A ISCAID (2019) contraindica terminantemente a instilação intravesical de soluções antimicrobianas, antissépticas ou biocidas (como clorexidina ou iodo povidona); essa prática não possui benefício terapêutico e acarreta lesão química severa, esfacelamento do urotélio e agravamento da necrose parietal.`,

    indicacoesIntervencaoCirurgica: `Indicações estritas para intervenção cirúrgica na cistite enfisematosa:
- Abordagem primária: A vasta maioria dos pacientes com cistite enfisematosa recupera-se com tratamento clínico antimicrobiano e suporte médico intensivo.

Indicações para laparotomia exploratória com cistectomia parcial reconstrutiva e debridamento:
- Suspeita imaginológica ou laboratorial de ruptura vesical com uroperitônio séptico.
- Necrose gangrenosa transmural com perda da integridade estrutural.
- Peritonite séptica refratária ao manejo clínico intensivo.
- Presença de cistólitos obstrutivos gigantes não passíveis de dissolução.
- Fístulas urogenitais estruturais (enterovesicais, colovesicais).`,

    protocoloPlantaoPassoAPasso: `Protocolo de plantão para abordagem imediata do paciente com suspeita de CE (10 etapas sequenciais):

1. Triagem de emergência imediata
- Antes de qualquer sondagem uretral, realizar radiografia ou ultrassonografia abdominal para confirmar a presença real de gás intramural ou luminal virgem de manipulação.

2. Exame de imagem minucioso
- Pesquisar ativamente cálculos vesicais, massas, retenção volêmica, alterações de parênquima renal e gás perivesical/retroperitoneal.

3. Amostra urinária estéril
- Colher urina para urinálise completa com sedimento corado e urocultura quantitativa com TSA/MIC por cistocentese ecoguiada cautelosa (em área de parede sem enfisema severo) ou sondagem estéril com descarte do jato inicial.

4. Triagem laboratorial sistêmica
- Hemograma completo, perfil bioquímico (creatinina, ureia, SDMA, eletrólitos, glicose e frutosamina sérica).

5. Busca agressiva de predisponentes
- Rastrear diabetes mellitus, hiperadrenocorticismo, bexiga neurogênica, urolitíase, incontinência e uso prévio de imunossupressores.

6. Avaliação de gravidade sistêmica
- Se houver febre, hipotermia, hipotensão, neutropenia, azotemia acentuada ou suspeita de pielonefrite enfisematosa, colher hemocultura antes dos antibióticos, internar em UTI e iniciar antibioticoterapia parenteral com boa penetração tecidual.

7. Manejo do paciente estável
- Não prescrever fluoroquinolonas automaticamente; iniciar antimicrobiano com base em histórico e epidemiologia local enquanto aguarda o TSA.

8. Retorno do antibiograma
- Descalonar imediatamente para o antimicrobiano de menor espectro que apresente sensibilidade formal e adequada penetração no tecido vesical.

9. Controle imaginológico seriado
- Repetir ultrassonografia ou radiografia em 3 a 5 dias em pacientes graves, ou em 5 a 7 dias em pacientes estáveis, para documentar a reabsorção do gás.

10. Critério de alta clínica
- Não encerrar o tratamento apenas pela melhora dos sinais clínicos; comprovar a resolução imaginológica do gás vesical e o controle definitivo do fator predisponente.`,

    errosComunsEvitar: `Dez erros comuns na rotina clínica e como evitá-los:
- MITO 1 — Presumir que só diabéticos desenvolvem CE: Entre 67% e 89,5% dos animais em séries recentes não tinham diabetes.
- MITO 2 — Assumir que qualquer gás na bexiga é CE: Sondagem recente, cirurgia ou fístulas causam pneumatúria sem infecção ativa.
- MITO 3 — Exigir obrigatoriamente gás na parede para diagnosticar CE: 23% dos casos apresentam gás exclusivamente intraluminal.
- ALERTA: Confiar no breakpoint urinário de amoxicilina/clavulanato para lesões transmurais profundas: Os breakpoints urinários não refletem concentração tecidual.
- ATENÇÃO CLÍNICA: Prescrever fluoroquinolonas de forma empírica e automática: Viola frontalmente o stewardship antimicrobiano.
- CONTRAINDICAÇÃO FORMAL: Prescrever enrofloxacina em gatos acima de 5 mg/kg/dia: Risco iminente de cegueira irreversível por retinopatia.
- ATENÇÃO CLÍNICA: Impor 30 dias de antibiótico como regra rígida para todos os pacientes: A duração deve ser individualizada pela resposta por imagem.
- ALERTA: Manter sonda uretral de demora em todos os pacientes: Eleva o risco de biofilme e infecção nosocomial ascendente.
- CONTRAINDICAÇÃO FORMAL: Realizar lavagens vesicais com antissépticos ou antibióticos: Prática formalmente contraindicada pela ISCAID por lesão química severa.
- ATENÇÃO CLÍNICA: Descartar CE por radiografia normal ou considerar ultrassom falho por excesso de reverberação: O próprio artefato de reverberação em cauda de cometa é a pista diagnóstica principal.`,

    condutasContraindicadas: `Proibições formais e condutas vetadas na cistite enfisematosa:
- CONTRAINDICAÇÃO FORMAL: Não prescrever anti-inflamatórios não esteroidais (AINEs) em animais azotêmicos, hipovolêmicos ou hipotensos.
- CONTRAINDICAÇÃO FORMAL: Não prescrever enrofloxacina em gatos em doses superiores a 5 mg/kg/dia pelo risco de cegueira aguda.
- CONTRAINDICAÇÃO FORMAL: Não realizar lavagens vesicais intraluminais com soluções antissépticas, antimicrobianas ou biocidas.
- ALERTA FARMACOLÓGICO: Não utilizar carbapenêmicos (meropenem) de forma empírica sem confirmação bacteriológica de patógeno multirresistente (MDR).
- REGRA VITAL: Não interromper a terapia antimicrobiana antes da comprovação imaginológica de reabsorção completa do gás parietal e resolução do espessamento mural.`,

    monitoramentoSeriadoEAlta: `Protocolo de acompanhamento seriado e metas de alta clínica:
- Reavaliação ultrassonográfica precoce: Repetir ultrassonografia da bexiga em 3 a 5 dias para acompanhar a redução do volume de gás intramural e a diminuição dos artefatos de reverberação.
- Monitoramento laboratorial: Dosagem periódica de creatinina, ureia e eletrólitos; monitoramento diário da glicemia capilar em diabéticos.
- Urocultura de controle: Realizar urocultura de controle 5 a 7 dias após o término formal da antibioticoterapia em casos complicados ou recidivantes.

Critérios objetivos para alta clínica:
- Ausência completa de sinais de dor abdominal à palpação.
- Remissão total da hematúria macroscópica.
- Restabelecimento do padrão miccional voluntário normal.
- Confirmação imaginológica de reabsorção do componente gasoso vesical.`
  },

  complications: {
    pielonefriteEnfisematosaAscendente: `Pielonefrite Enfisematosa Ascendente:
- Mecanismo: Colonização retrógrada dos ureteres e parênquima renal por patógenos produtores de gás.
- Repercussões clínicas: Necrose supurativa renal, formação de bolhas intraparenquimatosas, perda abrupta da função nefronal, lesão renal aguda intrínseca e choque urosséptico de altíssima letalidade.`,

    rupturaVesicalEUroperitonioSeptico: `Ruptura Vesical e Uroperitônio Séptico:
- Mecanismo: Isquemia mural transmural decorrente da dissecção gasosa associada a necrose liquefativa bacteriana.
- Repercussões clínicas: Deiscência da parede vesical com colapso cardiovascular, peritonite química e séptica aguda e necessidade imediata de laparotomia exploratória de emergência.`,

    disseminacaoGasosaExtravesical: `Disseminação Gasosa Extravesical:
- Mecanismo: Migração de dióxido de carbono e hidrogênio através dos planos fasciais perivesicais para o espaço retroperitoneal e fossas isquiorretais.
- Repercussões clínicas: Pode mimetizar perfuração de víscera oca ou pneumoperitônio em exames de imagem mesmo na ausência de ruptura mecânica da bexiga (Lee et al., 2023).`,

    fibroseCicatricialEMicrobexiga: `Fibrose Cicatricial e Microbexiga:
- Mecanismo: Substituição da musculatura lisa do detrusor por tecido colágeno fibroso denso após extensa necrose tecidual.
- Repercussões clínicas: Perda permanente da complacência vesical, redução drástica da capacidade de armazenamento e polaciúria crônica intratável.`,

    urosepticemiaEChoqueSeptico: `Urossepticemia e Choque Séptico:
- Mecanismo: Disseminação hematogênica de endotoxinas lipopolissacarídicas (LPS) e bactérias viáveis a partir da microvasculatura vesical lesionada.
- Repercussões clínicas: Síndrome da resposta inflamatória sistêmica (SIRS), choque distributivo hipotensivo e disfunção de múltiplos órgãos.`
  },

  prevention: {
    controleGlicemicoEReducaoGlicosuria: `Controle glicêmico rigoroso e redução da glicosúria:
- Meta clínica: Manter insulinoterapia individualizada com curvas glicêmicas seriadas em cães e gatos diabéticos.
- Efeito preventivo: Manter a glicemia abaixo do limiar renal para mitigar o aporte contínuo de substrato glicídico fermentável na urina.`,

    manejoEsvaziamentoBexigaNeurogenica: `Manejo do esvaziamento em bexiga neurogênica:
- Meta clínica: Garantir esvaziamento vesical completo e programado a cada 6 a 8 horas em animais com neuropatias espinhais, hérnias de disco ou síndrome da cauda equina.
- Efeito preventivo: Prevenir a estase urinária estagnada que propicia colonização microbiana e proliferação bacteriana acelerada.`,

    investigacaoPrecoceComorbidades: `Investigação precoce em animais sob risco imunológico:
- Conduta: Vigilância clínica ativa e rastreamento precoce de qualquer episódio de hematúria, disúria ou periúria.
- População-alvo: Pacientes com hiperadrenocorticismo espontâneo ou sob corticoterapia imunossupressora crônica.`,

    cuidadosComSondagemUretral: `Cuidados rigorosos com a sondagem uretral:
- Boas práticas: Manejo asséptico rigoroso na cateterização uretral, restrição estrita do tempo de permanência de cateteres.
- Prevenção nosocomial: Uso exclusivo de sistemas coletores fechados estéreis em unidades de terapia intensiva para evitar bacteriúria nosocomial ascendente.`,

    remocaoDeCalculosEEstruturas: `Remoção de cálculos e correção estrutural:
- Intervenção oportuna: Remoção cirúrgica ou dissolução médica de cistólitos.
- Anatomia: Correção de alterações estruturais (divertículos, pólipos) que atuem como nichos bacterianos permanentes.`
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
