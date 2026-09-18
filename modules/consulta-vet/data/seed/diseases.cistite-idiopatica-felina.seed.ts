import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const cistiteIdiopaticaFelinaSeed: DiseaseRecord = {
  id: 'disease-cistite-idiopatica-felina',
  slug: 'cistite-idiopatica-felina',
  title: 'Cistite Idiopática Felina (CIF / FIC)',
  subtitle: 'Abordagem neuro-urológica contemporânea e baseada em evidências segundo as diretrizes iCatCare 2025, revisão sistemática 2025 e acervo bibliográfico especializado',
  synonyms: [
    'cistite idiopática felina',
    'cistite intersticial felina',
    'feline idiopathic cystitis',
    'FIC',
    'CIF',
    'síndrome de pandora',
    'cistite estéril felina'
  ],
  species: ['cat'],
  category: 'nefrologia',
  categories: ['nefrologia', 'clinica-medica', 'urgencia-emergencia', 'medicina-felina'],
  tags: [
    'cistite-idiopatica-felina',
    'fic',
    'icatcare-2025',
    'memo',
    'luts-felino',
    'obstrucao-uretral',
    'dor-visceral',
    'urotelio',
    'glicosaminoglicanos',
    'amitriptilina',
    'prazosina',
    'buprenorfina',
    'gabapentina'
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['cistite-idiopatica-felina'],

  quickSummary: 'A Cistite Idiopática Felina (CIF / FIC) é a causa individual mais prevalente de sinais do trato urinário inferior (LUTS) em gatos, respondendo por 55% a 65% de todas as apresentações clínicas em adultos jovens a meia-idade. A compreensão científica contemporânea, consolidada no consenso 2025 iCatCare Guidelines (produzido pela sociedade veterinária da antiga ISFM) e na revisão sistemática de 2025 (Macleod et al.), abandonou a visão reducionista de que a CIF é primariamente uma doença da bexiga. Trata-se, fundamentalmente, de uma síndrome dolorosa, sistêmica e complexa de desregulação da resposta à ameaça ambiental. Nela, um indivíduo biologicamente vulnerável (sensitive individual), submetido a um ambiente percebido como ameaçador, instável ou desprovido de previsibilidade (provocative environment), desenvolve ativação patológica sustentada do sistema central de resposta à ameaça (CTRS), desregulação simpática crônica com hiporreatividade do eixo hipotálamo-hipófise-adrenal, sensibilização de fibras C nociceptivas aferentes vesicais e disfunção da barreira urotelial. A bexiga atua como o principal órgão de choque somático desse circuito neuroendócrino. A CIF é um diagnóstico estrito de exclusão, exigindo a eliminação metódica de urolitíase, infecção bacteriana (incomum em gatos jovens, representando menos de 3% dos casos), tampões uretrais e neoplasias. O pilar terapêutico com maior sustentação na literatura é a Modificação Ambiental Multimodal (MEMO) associada ao manejo hídrico e dietético progressivo, enquanto a analgesia imediata (buprenorfina e gabapentina) alivia a dor aguda da crise. Fármacos historicamente prescritos de forma empírica — como antibióticos, corticosteroides, prazosina para prevenção de recidiva e suplementação isolada de glicosaminoglicanos (GAGs) — não demonstraram benefício clínico consistente em ensaios clínicos randomizados contemporâneos.',

  quickDecisionStrip: [
    'CIF é um diagnóstico de exclusão: não existe teste diagnóstico positivo patognomônico; o diagnóstico exige afastar metidicamente urolitíase, infecções e neoplasias.',
    'A bexiga é o órgão de choque, não a causa primária: trata-se de uma síndrome sistêmica mediada pela ativação desregulada do sistema central de resposta à ameaça (CTRS).',
    'Macho com estrangúria é emergência de obstrução uretral (UO) até prova em contrário: palpar a bexiga imediatamente para diferenciar crise não obstrutiva de emergência urológica obstrutiva.',
    'Infecção bacteriana do trato urinário (ITU) é raríssima (<1% a 3%) em gatos jovens a meia-idade sem comorbidades: antibiótico empírico para urina com sangue é erro crasso de conduta.',
    'Cristalúria não é sinônimo de urolitíase: cristais de estruvita ocorrem frequentemente como achado incidental fisiológico em urina felina altamente concentrada.',
    'Hematúria e piúria assépticas são comuns na CIF: a presença de hemácias e leucócitos no sedimento reflete inflamação neurogênica e não prova infecção bacteriana.',
    'MEMO é a intervenção de maior nível de evidência (estudo clássico de Buffington et al. 2006): caixas sanitárias N+1, separação espacial de recursos e previsibilidade reduzem crises em até 75%.',
    'A crise aguda não obstrutiva é autolimitante na maioria dos gatos em 2 a 7 dias: melhora rápida após prescrição de qualquer droga não prova eficácia farmacológica da substância.',
    'Suplementos de GAGs, glucosamina e pentosan polissulfato falharam em demonstrar benefício clínico superior ao placebo em revisões sistemáticas e ensaios clínicos controlados.',
    'Amitriptilina aguda é ineficaz e pode piorar recorrência precoce (Kruger et al. 2003); seu uso restringe-se como terceira linha a casos crônicos refratários ao MEMO sob desmame lento.',
    'Prazosina não previne reobstrução em ensaio prospectivo duplo-cego randomizado (Reineke et al. 2017): o consenso iCatCare 2025 não mais recomenda seu uso rotineiro pós-desobstrução.',
    'Analgesia é imperativa no alívio do sofrimento ético: buprenorfina transmucosa ou gabapentina devem ser instituídas para dor aguda, sem promessa de prevenção de recorrências futuras.'
  ],

  quickSummaryRich: {
    lead: 'A Cistite Idiopática Felina é uma síndrome álgica e funcional complexa resultante da interação bidirecional entre um indivíduo vulnerável e um ambiente percebido como ameaçador. A manifestação vesical (LUTS) é o reflexo periférico de um circuito neuroendócrino e autonômico desregulado, cujo manejo eficaz baseia-se na exclusão diagnóstica rigorosa, analgesia da crise e modificação ambiental multimodal (MEMO).',
    leadHighlights: [
      'Diagnóstico estrito de exclusão',
      'Circuito bidirecional top-down e bottom-up',
      'Sistema Central de Resposta à Ameaça (CTRS)',
      'MEMO como núcleo da conduta terapêutica',
      'Antibiótico empírico e AINEs não rotineiros',
      'Alívio álgico com buprenorfina e gabapentina'
    ],
    pillars: [
      {
        title: 'Pilar 1: Modelo Fisiopatológico Bidirecional (Top-Down e Bottom-Up)',
        body: 'A CIF rompe o paradigma do dano puramente vesical. A via top-down expressa a percepção de ameaça ambiental por um indivíduo suscetível, ativando persistentemente o sistema central de resposta à ameaça (CTRS), com hiperatividade simpática e sensibilização espinhal. A via bottom-up expressa a disfunção da permeabilidade da barreira urotelial, expondo fibras C sensoriais a solutos urinários e retroalimentando o sistema nervoso central com aferências álgicas contínuas.',
        highlights: ['CTRS e desregulação simpática', 'Sensibilização central e periférica de fibras C', 'Urotélio como órgão sensorial integrado']
      },
      {
        title: 'Pilar 2: Diagnóstico Rigoroso por Exclusão e Triagem Imediata de Obstrução',
        body: 'Não existe biomarcador positivo para CIF. A palpação vesical precoce é mandatória para descartar obstrução uretral (UO), especialmente em machos. O diagnóstico da forma não obstrutiva exige exclusão metódica de urólitos por radiografia e ultrassonografia, infecção bacteriana por urinálise e urocultura por cistocentese, e neoplasias em animais idosos. A resposta clínica a qualquer fármaco não valida o diagnóstico de CIF.',
        highlights: ['Palpação imediata para excluir UO', 'Exclusão de urólitos e infecções', 'Urinálise completa com sedimento fresco']
      },
      {
        title: 'Pilar 3: Modificação Ambiental Multimodal (MEMO) e Recursos Espaciais',
        body: 'O consenso iCatCare 2025 e a revisão sistemática de Macleod et al. 2025 ratificam o MEMO como o padrão ouro terapêutico preventivo. O plano exige garantir os 5 pilares do bem-estar felino: caixas de areia na proporção N+1 distribuídas em locais distintos, separação física entre comida, água e eliminação, enriquecimento vertical, áreas de refúgio seguras e previsibilidade nas rotinas diárias e interações com tutores.',
        highlights: ['Caixas N+1 e substrato aglomerante', 'Recursos separados espacialmente', 'Redução de conflitos sociais e previsibilidade']
      },
      {
        title: 'Pilar 4: Racionalização Farmacológica e Fim de Condutas Empíricas',
        body: 'A evidência clínica contemporânea desmistificou diversas condutas históricas: antibióticos não têm indicação na ausência de urocultura positiva; AINEs e corticosteroides não demonstraram benefício protetor na CIF; a amitriptilina aguda é ineficaz e potencialmente prejudicial; a prazosina não previne reobstrução uretral (estudo Reineke 2017); e GAGs orais não superam o placebo. O foco farmacológico restringe-se à analgesia da dor aguda com opioides transmucosos e gabapentina.',
        highlights: ['Veto a antibióticos empíricos', 'Ineficácia de GAGs e prazosina rotineira', 'Analgesia com buprenorfina e gabapentina']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial para Felinos com Sinais do Trato Urinário Inferior (LUTS)',
      steps: [
        {
          label: 'Etapa 1: Triagem Imediata de Volemia e Obstrução Uretral (UO)',
          timing: 'Minuto 0 da admissão',
          detail: 'Palpação abdominal criteriosa da bexiga urinária. Se bexiga moderada a grande, rígida, turgida e dolorosa em gato com estrangúria: diagnosticar UO de emergência, avaliar ECG, potássio sérico, iniciar analgesia e desobstrução imediata. Se bexiga pequena, vazia ou facilmente compressível: classificar provisoriamente como LUTS não obstrutivo.'
        },
        {
          label: 'Etapa 2: Anamnese Ambiental, Dinâmica Social e Histórico de Eventos Provocadores',
          timing: 'Durante a anamnese',
          detail: 'Investigação sistemática do ambiente doméstico: número de gatos e caixas sanitárias, localização física dos recursos, reformas recentes, novos animais ou pessoas na casa, alterações na rotina do tutor, episódios prévios de LUTS e sinais não urinários de comorbidades da Síndrome de Pandora (vômitos crônicos, hiporexia, dermatite).'
        },
        {
          label: 'Etapa 3: Urinálise Completa com Amostra Fresca e Mensuração da Densidade (USG)',
          timing: 'Primeiras 1 a 2 horas',
          detail: 'Colheita preferencial por cistocentese ou micção espontânea colhida em recipiente limpo. Aferição da densidade urinária (USG) por refratometria antes de qualquer fluidoterapia; exame químico por fita reagente; e análise microscópica do sedimento urinário fresco inspecionado em até 60 minutos (para evitar precipitação artefatual de cristais por refrigeração).'
        },
        {
          label: 'Etapa 4: Exame de Imagem do Trato Urinário (Radiografia e Ultrassonografia)',
          timing: 'Nas primeiras 24 horas',
          detail: 'Radiografia abdominal total incluindo toda a trajetória da uretra peniana em machos para pesquisar urólitos radiopacos de estruvita e oxalato de cálcio. Ultrassonografia abdominal detalhada para descartar urólitos radiotransparentes de urato, massas vesicais, pólipos uretrais, coágulos obstrutivos e avaliar espessamento parietal focal ou difuso.'
        },
        {
          label: 'Etapa 5: Urocultura Quantitativa por Cistocentese em Casos Selecionados',
          timing: 'Conforme indicação clínica',
          detail: 'Indicada formalmente em felinos idosos (>10 anos), animais nefropatas, diabéticos, hipertireoideos, portadores de densidade urinária persistentemente baixa (USG < 1,025), histórico prévio de cateterização uretral ou sinais persistentes por mais de 7 dias sem resposta.'
        },
        {
          label: 'Etapa 6: Consolidação do Diagnóstico de Exclusão e Avaliação de Recorrência',
          timing: 'Acompanhamento longitudinal',
          detail: 'Se todas as causas obstrutivas, anatômicas, litiásicas e infecciosas forem negativas em gato jovem com LUTS agudo: consolidar o diagnóstico de Cistite Idiopática Felina. Em cada nova recidiva ao longo da vida do felino, o raciocínio diagnóstico deve ser reiniciado para não deixar de reconhecer litíase ou neoplasia secundária adquirida.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico Escalonado da Cistite Idiopática Felina',
      steps: [
        {
          label: 'Fase 1: Manejo da Crise Aguda e Analgesia Prioritária',
          timing: 'Dias 1 a 5 da crise',
          detail: 'Instituição imediata de controle álgico multimodal para quebrar o circuito de hipersensibilidade: Buprenorfina transmucosa (0,005 a 0,02 mg/kg q8-12h) e/ou Gabapentina oral (5 a 10 mg/kg q8-12h). Repouso absoluto em ambiente silencioso e seguro, evitando procedimentos e contenções físicas estressantes.'
        },
        {
          label: 'Fase 2: Auditoria e Implementação da Modificação Ambiental Multimodal (MEMO)',
          timing: 'Início imediato com consolidação em 2 a 4 semanas',
          detail: 'Aplicação prática do consenso iCatCare 2025: caixas sanitárias na regra N+1 distribuídas em locais independentes e tranquilos; substrato preferencialmente arenoso aglomerante e inodoro; limpeza diária; recursos vitais (água, comida, descanso e eliminação) fisicamente separados para evitar bloqueios visuais em casas multicat; áreas de refúgio verticais e previsibilidade de rotinas.'
        },
        {
          label: 'Fase 3: Otimização da Ingestão Hídrica e Manejo Dietético',
          timing: 'Manutenção contínua',
          detail: 'Estímulo progressivo ao consumo de água para reduzir a concentração de solutos urinários: introdução de alimento úmido completo (sachês/latas), fontes de água circulante e múltiplos potes largos de cerâmica ou vidro afastados do comedouro. Transição alimentar sempre gradual ao longo de 2 a 3 semanas para evitar neofobia e aversão alimentar estressante.'
        },
        {
          label: 'Fase 4: Manejo Emergencial da Obstrução Uretral (UO) em Machos',
          timing: 'Imediato se UO presente',
          detail: 'Estabilização hemodinâmica antes de manobras de cateterismo: fluidoterapia de ressuscitação balanceada, descompressão aliviadora prévia por cistocentese com agulha fina (22G ou 23G acoplada a extensor e torneira de três vias), analgesia profunda, passagem delicada de cateter uretral com hidropropulsão estéril e manutenção de sistema coletor fechado estéril por 24 a 48 horas.'
        },
        {
          label: 'Fase 5: Abordagem de Casos Crônicos Refratários e Apoio Especializado',
          timing: 'Após falha comprovada de MEMO adequado por >4 a 6 semanas',
          detail: 'Revisão diagnóstica integral para descartar urolitíase oculta, estenose uretral ou neoplasia. Em casos verdadeiramente refratários, considerar terapia comportamental farmacológica com Amitriptilina oral (2,5 a 12,5 mg/gato q24h à noite com desmame lento e monitoramento de retenção urinária e arritmias) e suporte com felinista ou comportamentalista veterinário.'
        }
      ]
    }
  },

  etiology: {
    definicaoModernaSindromeDolorosaSistemica: 'A Cistite Idiopática Felina (CIF / FIC) é classicamente definida como uma afecção inflamatória e dolorosa estéril do trato urinário inferior felino, de causa primária não identificável pelos métodos diagnósticos convencionais. Contudo, o consenso internacional iCatCare 2025 (produzido pela sociedade veterinária da antiga International Society of Feline Medicine — ISFM) estabelece que a CIF não é primariamente uma doença da bexiga. A bexiga é o órgão efetor que manifesta os danos de uma síndrome sistêmica e neuroendócrina complexa, deflagrada pela resposta desregulada a ameaças ambientais. A própria denominação histológica de cistite é imperfeita, pois parcelas expressivas de gatos acometidos não exibem infiltrado inflamatório clássico com predomínio de neutrófilos, mas sim alterações na barreira de permeabilidade urotelial, hipervascularização submucosa e sensibilização periférica de terminações nervosas nociceptivas (Nelson & Couto, 6a ed., Cap. 44, pp. 724-729; BSAVA Manual of Canine and Feline Nephrology and Urology, 3a ed., Cap. 28, pp. 317-327).',

    distincaoConceitualLUTSvFLUTDvsCIFvsPandora: 'A uniformização terminológica contemporânea é indispensável para evitar equívocos diagnósticos e terapêuticos na clínica felina: (1) Sinais do Trato Urinário Inferior (LUTS): termo descritivo semiológico que engloba disúria, estrangúria, hematúria macroscópica, polaquiúria e periúria (eliminação em locais inadequados); (2) Doença do Trato Urinário Inferior Felino (FLUTD / DTUIF): termo guarda-chuva histórico que abrange qualquer patologia anatômica, mineral, infecciosa ou funcional que acometa a bexiga ou uretra de gatos, não devendo ser empregado como diagnóstico final conclusivo; (3) Cistite Idiopática Felina (CIF / FIC): diagnóstico específico de exclusão, consolidado apenas quando todas as causas estruturais, litiásicas, infecciosas e neoplásicas foram investigadas e descartadas; (4) Síndrome de Pandora: construto conceitual que enfatiza a natureza multissistêmica da suscetibilidade desses pacientes, nos quais alterações do trato urinário frequentemente coexistem com manifestações cutâneas, gastrointestinais e comportamentais de estresse.',

    tabelaComparativaFenotiposClinicosCIF: {
      kind: 'clinicalTable',
      title: 'Classificação Fenotípica da Cistite Idiopática Felina (iCatCare 2025)',
      headers: ['Fenótipo Clínico', 'Padrão Temporal e Sinais', 'Prevalência Relativa', 'Evolução Esperada', 'Conduta Terapêutica Prioritária'],
      rows: [
        [
          'Episódio Agudo Não Obstrutivo',
          'Aparecimento súbito de hematúria, polaquiúria, disúria, estrangúria e periúria; paciente sistemicamente estável e alerta.',
          'Representa a vasta maioria das primeiras consultas clínicas por LUTS.',
          'Frequentemente autolimitante, com resolução espontânea dos sinais urinários em 2 a 7 dias.',
          'Analgesia imediata prioritária (buprenorfina ou gabapentina), alívio ambiental, hidratação e diagnóstico de exclusão.'
        ],
        [
          'Forma Recorrente Não Obstrutiva',
          'Crises periódicas de LUTS separadas por intervalos assintomáticos variáveis de semanas a meses.',
          'Ocorre em aproximadamente 50% a 65% dos felinos acometidos ao longo de 1 a 2 anos.',
          'Recorrência associada a gatilhos ambientais, reformas, mudanças na dinâmica multicat ou estresse climático.',
          'Auditoria rigorosa da Modificação Ambiental Multimodal (MEMO), aumento sustentado da ingestão hídrica e alimento úmido.'
        ],
        [
          'Forma Crônica / Persistente',
          'Sinais de LUTS que persistem ininterruptamente por períodos superiores a 7 a 14 dias sem remissão.',
          'Minoria dos casos clínicos de CIF (menos de 10% a 15%).',
          'Prognóstico reservado para qualidade de vida; risco elevado de frustração do tutor e abandono.',
          'Reavaliação diagnóstica exaustiva (excluir urolitíase oculta, massas e pólipos); considerar amitriptilina crônica de terceira linha.'
        ],
        [
          'Forma Obstrutiva (UO)',
          'Estrangúria improdutiva, bexiga distendida, turgida e dolorosa; evolução rápida para azotemia pós-renal e hipercalemia.',
          'Acomete predominantemente machos castrados devido ao lúmen uretral peniano estreito e tortuoso.',
          'Emergência clínica crítica com risco de colapso circulatório, fibrilação ventricular e óbito em 24 a 48 horas se não aliviada.',
          'Estabilização hemodinâmica prévia, cistocentese descompressiva aliviadora, analgesia profunda e desobstrução delicada.'
        ],
        [
          'Fenótipo Sistêmico (Síndrome de Pandora)',
          'LUTS vesicais associados a outras manifestações de somatização: vômitos crônicos, hiporexia, dermatite psicogênica, letargia.',
          'Frequente em gatos com histórico de experiências adversas na fase neonatal ou de extrema reatividade ambiental.',
          'Curso flutuante sincronizado com estressores ambientais e sociais no domicílio.',
          'Intervenção ambiental profunda, feliway/feromônios associados, suporte comportamental e abordagem médica multissistêmica.'
        ]
      ]
    },

    neurofisiologiaDaMiccaoEFibrasC: 'A micção e a continência urinária são coordenadas por três circuitos neurológicos periféricos e pelo centro pontino da micção no tronco encefálico (Nelson & Couto, 6a ed., Cap. 45, pp. 730-737; BSAVA Nephrology and Urology, 3a ed., Cap. 3, pp. 24-36): (1) Inervação simpática: originada nos segmentos medulares lombares L1-L4 através do nervo hipogástrico; libera norepinefrina que estimula receptores beta-adrenérgicos no corpo da bexiga (promovendo relaxamento do músculo detrusor para armazenamento de urina) e receptores alfa-1-adrenérgicos no colo vesical e uretra proximal (promovendo contração esfincteriana lisa); (2) Inervação parassimpática: originada nos segmentos medulares sacrais S1-S3 via nervo pélvico; libera acetilcolina em receptores muscarínicos M2 e M3, deflagrando contração vigorosa do detrusor durante a micção voluntária; (3) Inervação somática: originada nos segmentos sacrais via nervo pudendo; libera acetilcolina em receptores nicotínicos no músculo uretral estriado (esfíncter externo da uretra). No contexto da CIF, o elemento fisiopatológico mais crítico são as fibras nervosas aferentes sensoriais do tipo C amielínicas. Em condições normais, a grande maioria dessas fibras permanece eletricamente silente; sob agressão química ou estímulo inflamatório, ocorre recrutamento em massa de fibras C, as quais liberam neuropeptídeos pró-inflamatórios locais (substância P, neurocinina A e peptídeo relacionado ao gene da calcitonina — CGRP), promovendo vasodilatação submucosa, edema, diapedese celular e dor visceral intensa por inflamação neurogênica.',

    viasBidirecionaisTopDownEBottomUp: 'O consenso iCatCare 2025 ilustra que a fisiopatogenia contemporânea da CIF estrutura-se em um modelo bidirecional de amplificação mútua entre o encéfalo e a bexiga: (1) Via Top-Down (Cérebro para Bexiga): um gato geneticamente e epigeneticamente vulnerável percebe estímulos ambientais cotidianos (visitas, conflito velado com outro felino, falta de caixas sanitárias adequadas) como ameaças incontroláveis; essa percepção hiperativa o Sistema Central de Resposta à Ameaça (CTRS), envolvendo o locus coeruleus e a substância cinzenta periaquedutal no tronco encefálico. Isso desencadeia eferência simpática desregulada e persistente, liberação de catecolaminas, alteração da microcirculação vesical e rebaixamento generalizado do limiar nociceptivo, transformando estímulos fisiológicos de distensão vesical em sensações de dor intensa e urgência; (2) Via Bottom-Up (Bexiga para Cérebro): pequenas alterações na integridade da barreira urotelial permitem o contato direto de substâncias nocivas e íons potássio altamente concentrados da urina com as terminações das fibras C na lâmina própria; isso deflagra disparos aferentes contínuos que ascendem pela medula espinhal até o corno dorsal e centros corticais, amplificando o sofrimento nociceptivo e retroalimentando o CTRS com novos sinais de ameaça corporal.',

    desmistificacaoDaTeoriaDoEstressePuro: 'Um dos maiores erros conceituais na medicina felina é classificar a CIF como uma doença psicológica ou atribuir o quadro simplesmente a estresse de forma genérica e superficial. A percepção de ameaça ambiental deflagra respostas neuroendócrinas e moleculares perfeitamente mensuráveis. Pesquisas demonstraram que gatos com CIF apresentam aumento nas concentrações plasmáticas basais e induzidas de norepinefrina, associado a uma hiporreatividade paradoxal do eixo hipotálamo-hipófise-adrenal (diminuição da produção de cortisol em resposta ao ACTH), configurando uma disautonomia neuroendócrina real. Portanto, a CIF é uma síndrome neurobiológica de desregulação visceral sensível a ameaças do meio ambiente, e não uma perturbação anímica abstrata.'
  },

  epidemiology: {
    prevalenciaEmGatosComLUTS: 'A CIF é amplamente reconhecida como a causa individual mais prevalente de LUTS não obstrutivo e obstrutivo na espécie felina em âmbito global. Estudos epidemiológicos prospectivos e retrospectivos multicêntricos indicam que aproximadamente 55% a 65% de todos os gatos jovens a meia-idade encaminhados a serviços clínicos e de emergência com sinais de disúria, hematúria e periúria acabam sendo diagnosticados conclusivamente com CIF após a exclusão metódica de outras afecções urológicas (Taylor et al., 2025; Nelson & Couto, 6a ed., Cap. 44).',

    baixaPrevalenciaDeInfeccaoBacterianaITU: 'Um dos dados epidemiológicos mais relevantes para desmistificar a rotina clínica é a baixíssima frequência de infecção do trato urinário bacteriana (ITU) em gatos adultos previamente hígidos. Na faixa etária clássica de ocorrência de CIF (1 a 7 anos de idade), a prevalência de cistite bacteriana confirmada por urocultura é inferior a 1% a 3% de todos os casos de LUTS. A urina felina fisiológica apresenta densidade extremamente elevada (frequentemente USG > 1,050), alta concentração de ureia e compostos nitrogenados e alta osmolalidade, características que conferem forte atividade antibacteriana intrínseca. A infecção bacteriana só atinge prevalências expressivas (superiores a 30% a 50%) em gatos geriátricos (>10 a 12 anos) portadores de comorbidades debilitantes que reduzem a densidade urinária, tais como Doença Renal Crônica (DRC), Diabetes Mellitus, Hipertireoidismo ou em animais previamente submetidos a cateterização uretral ou intervenções cirúrgicas (uretrostomia).',

    fatoresDeRiscoEAssociacoesEpidemiologicas: 'O consenso iCatCare 2025 identifica um conjunto consistente de fatores de vulnerabilidade epidemiológica associados ao desenvolvimento de CIF: (1) Estilo de vida exclusivamente domiciliado (indoor estrito) associado ao sedentarismo e à falta de oportunidades para expressar comportamentos naturais de predação simulada e exploração vertical; (2) Obesidade e sobrepeso corporal, fatores que limitam a mobilidade e aumentam a inflamação sistêmica de baixo grau; (3) Casas com múltiplos gatos (multicat households) nas quais ocorrem conflitos velados de dominância territorial e bloqueios silenciosos de acesso a recursos vitais; (4) Manejo inadequado de caixas sanitárias (número insuficiente, substrato com odor químico forte, caixas fechadas sem rota de fuga ou localizadas em áreas barulhentas); (5) Falta de previsibilidade nas rotinas e interações forçadas com humanos.',

    diferencasSexuaisEVulnerabilidadeObstrutiva: 'A incidência da CIF não obstrutiva distribui-se de maneira equivalente entre machos e fêmeas felinas. Contudo, no que tange à evolução para Obstrução Uretral (UO), a espécie apresenta marcante disparidade anatômica sexual. A uretra peniana do macho felino é longa, curvilínea e sofre estreitamento afunilado progressivo na sua porção distal, tornando os machos dramaticamente mais propensos à obstrução mecânica luminal por tampões uretrais (urethral plugs) proteináceos, microcálculos e espasmo muscular reflexo associado a edema da mucosa inflamada.'
  },

  pathogenesisTransmission: {
    cascata: [
      '1. Estímulo desencadeante ambiental: percepção de ameaça, perda de controle ou instabilidade na rotina por um gato geneticamente e neurobiologicamente vulnerável.',
      '2. Hiperativação do CTRS: o sistema central de resposta à ameaça (locus coeruleus e tronco encefálico) entra em disparo adrenérgico sustentado.',
      '3. Disautonomia neuroendócrina: eferência simpática exacerbada contínua associada à incapacidade da adrenal de produzir cortisol compensatório suficiente.',
      '4. Desregulação da microcirculação e urotélio: vasoconstrição submucosa focal, aumento da permeabilidade urotelial e ruptura funcional da camada protetora de glicosaminoglicanos (GAGs).',
      '5. Recrutamento e disparo de fibras C nociceptivas: solutos urinários concentrados e íons potássio banham as terminações nervosas da lâmina própria, gerando despolarização maciça.',
      '6. Inflamação neurogênica e dor visceral: liberação retrógrada de substância P e neuropeptídeos, promovendo hiperemia, edema parietal, micro-hemorragias e dor paroxística intensa com polaquiúria e estrangúria.',
      '7. Se macho suscetível: agregação de proteínas inflamatórias plasmáticas extravasadas, muco vesical e cristais de estruvita formando tampão mucoproteico, culminando em obstrução uretral (UO), retenção urinária dolorosa, azotemia pós-renal e hipercalemia fatal.'
    ],
    transmissao: 'A Cistite Idiopática Felina é uma afecção médica não contagiosa, não infecciosa e estritamente adquirida por mecanismos epigenéticos, neuroendócrinos e ambientais, não apresentando qualquer potencial de transmissão horizontal ou vetorial entre animais ou humanos.'
  },

  pathophysiology: {
    urotelioComoOrgaoSensorialECamadaGAG: 'O urotélio vesical felino transcende a função clássica de barreira passiva impermeável, atuando como um tecido sensorial ativo e metabolicamente dinâmico. As células uroteliais expressam receptores para neurotransmissores (adrenérgicos, colinérgicos e purinérgicos P2X/P2Y) e canais de potencial receptor transitório (TRPV1), sendo capazes de sintetizar e liberar óxido nítrico e ATP em resposta ao estiramento e à composição química luminal. Na face apical das células em guarda-chuva uroteliais, encontra-se uma camada de glicosaminoglicanos (GAGs), proteoglicanos sulfatados e glicoproteínas cuja integridade reduz a adesão bacteriana e a retrotranslocação iônica. Embora gatos com CIF exibam defeitos funcionais na permeabilidade urotelial e excreção urinária alterada de GAGs, a teoria reducionista de que a falta de GAGs seria a causa primária da doença foi refutada cientificamente. Ensaios clínicos controlados e revisões sistemáticas (Gunn-Moore & Shenoy, 2004; Macleod et al., 2025) demonstraram que a suplementação oral de glucosamina, sulfato de condroitina ou pentosan polissulfato não oferece benefício clínico superior ao placebo, consolidando que a disfunção do urotélio é reflexo de um circuito neurogênico central e não uma avitaminose de GAG.',

    eixoNeuroendocrinoEHiperatividadeSimpatica: 'Estudos seminais pioneiros liderados por Tony Buffington e colaboradores demonstraram que gatos acometidos por CIF exibem concentrações plasmáticas elevadas e sustentadas de catecolaminas (norepinefrina), associadas ao aumento na densidade e reatividade de receptores alfa-2-adrenérgicos centrais. Paradoxalmente, quando submetidos a testes de estresse provocador agudo, esses mesmos felinos falham em elevar proporcionalmente os teores circulantes de ACTH e cortisol plasmático em comparação a gatos hígidos, exibindo glândulas adrenais morfologicamente hipoplásicas. Essa disfunção neuroendócrina — caracterizada por hiperatividade adrenérgica e hipo-responsividade do eixo HPA — priva o organismo da ação anti-inflamatória e imunossupressora fisiológica do cortisol endógeno, permitindo que a resposta inflamatória neurogênica nos tecidos periféricos se autoalimente de forma descontrolada.',

    fisiopatologiaDaObstrucaoUretralAgudaUO: 'A Obstrução Uretral Felina (UO) constitui uma das emergências nefrológicas e de terapia intensiva mais graves na rotina de pequenos animais (Feline Emergency and Critical Care Medicine, 2a ed., Cap. 22). Na CIF obstrutiva, a oclusão do lúmen uretral decorre da associação entre espasmo muscular reflexo da uretra distal (mediado por receptores alfa-1 simpáticos e motoneurônios somáticos do nervo pudendo), edema inflamatório transmural da mucosa e deposição mecânica de tampões mucoproteicos (urethral plugs constituídos por matriz coloidal de muco, proteínas extravasadas e agregados de cristais de estruvita). A parada na eliminação urinária eleva abruptamente a pressão hidrostática intravesical, a qual é transmitida retrogradamente pelos ureteres até os túbulos coletores renais e a cápsula de Bowman. Quando a pressão intratubular suplanta a pressão hidrostática capilar glomerular, o gradiente de filtração glomerular colapsa (queda drástica da TFG), instalando-se Lesão Renal Aguda pós-renal com retenção maciça de ureia, creatinina, fosfatos e prótons de hidrogênio (acidose metabólica grave). O desfecho mais fatal decorre da hipercalemia progressiva: o potássio sérico elevado diminui a eletronegatividade do potencial de repouso das células miocárdicas, lentificando a condução atrioventricular e deflagrando o traçado eletrocardiográfico clássico de intoxicação potássica (achatamento e desaparecimento da onda P, alargamento do complexo QRS, ondas T apiculadas em tenda), culminando em bradicardia severa, fibrilação ventricular e assistolia em poucas horas se a descompressão e a estabilização não forem prontamente realizadas.',

    figurasClinicasIntegradas: 'As figuras a seguir ilustram os achados ultrassonográficos de cistite felina com espessamento e celularidade, a microscopia do sedimento urinário com cristais de estruvita e a técnica correta de cateterização com sistema fechado.'
  },

  figures: [
    {
      id: 'fig-cif-01',
      title: 'Ultrassonografia Vesical Panorâmica em Felino com FLUTD / CIF',
      url: '/consulta-vet/cistite-idiopatica-felina/ultrassom-bexiga-felina-cistite-panoramica.jpg',
      legend: 'Varredura ultrassonográfica abdominal panorâmica de bexiga urinária felina evidenciando espessamento parietal difuso da parede vesical, perda da regularidade dos contornos mucosos e acúmulo de celularidade em suspensão no lúmen, achados frequentes porém não específicos da cistite idiopática felina (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-02',
      title: 'Ultrassom Vesical: Sedimento Ecogênico e Debris Estéreis Intraluminais',
      url: '/consulta-vet/cistite-idiopatica-felina/ultrassom-bexiga-felina-sedimento-debris.jpg',
      legend: 'Corte ultrassonográfico de bexiga urinária de gato acometido por CIF exibindo debris intraluminais ecogênicos e sedimento flutuante em suspensão no conteúdo anecogênico da urina, formado por micro-hemorragias, muco e agregados de cristais estéreis em resposta à inflamação neurogênica (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-03',
      title: 'Avaliação Ultrassonográfica da Uretra Proximal em Macho Felino',
      url: '/consulta-vet/cistite-idiopatica-felina/ultrassom-uretra-proximal-felina.jpg',
      legend: 'Imagem ultrassonográfica demonstrando a transição do colo vesical para a uretra proximal felina. A visualização detalhada permite excluir urólitos uretrais radiotransparentes e avaliar edema transmural que predispõe ao espasmo funcional e obstrução mecânica no gato macho (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-04',
      title: 'Microscopia de Sedimento Urinário: Cristais de Estruvita em Tampa de Caixão',
      url: '/consulta-vet/cistite-idiopatica-felina/sedimento-urinario-cristais-estruvita-felino.jpg',
      legend: 'Fotomicrorganografia de sedimento urinário fresco de gato corado evidenciando cristais típicos de fosfato tricomposto de amônio e magnésio (estruvita), com morfologia prismática tridimensional clássica em tampa de caixão. A cristalúria de estruvita ocorre frequentemente como achado incidental em urinas concentradas e não deve ser confundida com urolitíase (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-05',
      title: 'Desobstrução Uretral e Manutenção de Cateterismo em Sistema Coletor Fechado',
      url: '/consulta-vet/cistite-idiopatica-felina/cateterizacao-uretral-desobstrucao-felina.jpg',
      legend: 'Paciente felino macho após desobstrução uretral mecânica mantido com cateter urinário flexível acoplado a sistema coletor estéril fechado com bolsa graduada. A manutenção em sistema fechado é essencial para quantificar o débito urinário na diurese pós-obstrutiva e prevenir infecção bacteriana hospitalar ascendente (Wikimedia Commons, CC BY-SA 4.0).',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    }
  ],

  clinicalSignsPathophysiology: [
    {
      system: 'Grupo Urinário e LUTS',
      findings: [
        {
          finding: 'Hematúria macroscópica e microscópica intermitente ou contínua',
          mechanism: 'Diapedese eritrocitária e micro-hemorragias focais da lâmina própria provocadas por vasodilatação neurogênica e quebra da integridade da barreira urotelial.',
          clinicalMeaning: 'Sinal clínico que mais alarma o tutor; não indica infecção bacteriana primária na ausência de fatores de risco geriátricos ou comorbidades sistêmicas.',
          priority: 'alta'
        },
        {
          finding: 'Polaquiúria e micção frequente de volumes extremamente reduzidos',
          mechanism: 'Hipersensibilização das fibras aferentes sensoriais C vesicais, disparando o arco reflexo de micção com volumes mínimos de urina.',
          clinicalMeaning: 'Demonstra irritabilidade do músculo detrusor; deve ser diferenciada urgentemente de estrangúria obstrutiva sem emissão de urina.',
          priority: 'alta'
        },
        {
          finding: 'Periúria ou eliminação inadequada fora da caixa de areia em locais frios ou roupas',
          mechanism: 'Aversão comportamental adquirida à caixa de areia decorrente da associação mental entre o local de micção e a dor paroxística sentida ao urinar.',
          clinicalMeaning: 'Causa frequente de conflito tutor-gato e abandono; melhora com controle álgico, troca de substrato sanitário e oferta de caixas adicionais.',
          priority: 'alta'
        },
        {
          finding: 'Estrangúria e esforço doloroso prolongado durante a micção',
          mechanism: 'Espasmo involuntário da musculatura lisa e estriada da uretra proximal associado à contração espasmódica do detrusor inflamado.',
          clinicalMeaning: 'Requer palpação vesical urgente para descartar bexiga turgida indicativa de obstrução uretral mecânica completa.',
          priority: 'critica'
        }
      ]
    },
    {
      system: 'Grupo Comportamental e Nociceptivo',
      findings: [
        {
          finding: 'Vocalização de dor aguda (miados agudos e choro) ao entrar ou permanecer na caixa sanitária',
          mechanism: 'Despolarização nociceptiva das fibras C vesicais no momento da contração do detrusor sobre o urotélio sensibilizado.',
          clinicalMeaning: 'Indicador clínico direto de dor visceral de intensidade moderada a severa, justificando intervenção analgésica imediata.',
          priority: 'alta'
        },
        {
          finding: 'Lambedura compulsiva e excessiva da região genital, pênis, períneo ou abdômen caudal',
          mechanism: 'Manifestação comportamental direcionada ao alívio reflexo da sensação de dor, queimação, prurido ou desconforto visceral pélvico.',
          clinicalMeaning: 'Frequentemente resulta em alopecia autoinfligida no abdômen ventral e lesões ulcerativas na ponta do prepúcio em machos.',
          priority: 'media'
        },
        {
          finding: 'Agressividade súbita por dor, inquietação e isolamento em locais escondidos da casa',
          mechanism: 'Comportamento felino de proteção em estado de dor visceral e hiperativação crônica do sistema central de resposta à ameaça (CTRS).',
          clinicalMeaning: 'Demonstra estresse adaptativo e vulnerabilidade social; o tutor deve ser orientado a não repreender o animal para evitar novos gatilhos de ameaça.',
          priority: 'media'
        }
      ]
    },
    {
      system: 'Grupo Emergencial Obstrutivo (UO em Machos)',
      findings: [
        {
          finding: 'Bexiga urinária aumentada, extremamente distendida, turgida, firme e intensamente dolorosa à palpação',
          mechanism: 'Oclusão completa do lúmen uretral distal por tampão mucoproteico, cristais e espasmo, impedindo o esvaziamento vesical sob produção urinária contínua.',
          clinicalMeaning: 'Achado físico patognomônico de Obstrução Uretral Felina; constitui emergência urológica crítica que precede azotemia e hipercalemia.',
          priority: 'critica'
        },
        {
          finding: 'Bradicardia grave, arritmias ventriculares, hipotermia, fraqueza muscular e colapso circulatório',
          mechanism: 'Efeito cardiotóxico direto da hipercalemia extrema sobre a condução atrioventricular e acidose metabólica acumuladas na anúria pós-renal.',
          clinicalMeaning: 'Sinal iminente de parada cardíaca; exige estabilização imediata com gluconato de cálcio a 10% IV e fluidoterapia de ressuscitação antes de qualquer manobra mecânica.',
          priority: 'critica'
        },
        {
          finding: 'Vômitos frequentes, sialorreia, desidratação grave e hálito urêmico',
          mechanism: 'Síndrome urêmica pós-renal aguda deflagrada pelo acúmulo sistêmico massivo de toxinas nitrogenadas não filtradas pela queda da TFG.',
          clinicalMeaning: 'Indica azotemia avançada com mais de 24 a 36 horas de obstrução mecânica instalada; exige monitorização em terapia intensiva.',
          priority: 'critica'
        }
      ]
    },
    {
      system: 'Grupo Sistêmico e Síndrome de Pandora',
      findings: [
        {
          finding: 'Coocorrência de sinais gastrointestinais intermitentes (vômitos esporádicos, diarreia ou hiporexia)',
          mechanism: 'Ativação do CTRS e eferência simpática sistêmica alterando a motilidade intestinal e a permeabilidade da mucosa gástrica.',
          clinicalMeaning: 'Reflete a natureza multissistêmica da Síndrome de Pandora, demonstrando que a patologia não está restrita anatomicamente à bexiga.',
          priority: 'media'
        },
        {
          finding: 'Hiper-reatividade a estímulos sonoros, sobressaltos constantes e alterações dermatológicas psicogênicas',
          mechanism: 'Rebaixamento do limiar de excitabilidade neural central e hipersensibilidade ao estresse em animais cronicamente ativados por catecolaminas.',
          clinicalMeaning: 'Orienta a necessidade inegociável de enriquecimento ambiental e eliminação de estímulos aversivos crônicos no domicílio.',
          priority: 'media'
        }
      ]
    }
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Palpação Abdominal Vesical Imediata para Exclusão de Obstrução Uretral (UO)',
      description: 'Primeiro procedimento obrigatório e inegociável na abordagem de qualquer felino apresentado com sinais de LUTS. Palpar com delicadeza a região caudal do abdômen. Se a bexiga urinária for palpada moderada a excessivamente distendida, firme, turgida e dolorosa em gato com histórico de estrangúria: diagnosticar Obstrução Uretral de emergência e transferir imediatamente para estabilização hemodinâmica em UTI. Se a bexiga estiver pequena, vazia ou facilmente compressível: classificar provisoriamente como LUTS não obstrutivo e prosseguir na investigação etiológica.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Anamnese Comportamental e Ambiental Detalhada (Auditoria do Território)',
      description: 'Investigação profunda das rotinas e do ambiente domiciliar do paciente: número total de gatos residentes, número e dimensões das caixas sanitárias, tipo de substrato de areia utilizado, frequência de higienização, histórico de reformas, visitantes, novos animais na vizinhança ou mudanças climáticas bruscas. Rastrear a existência de bloqueios silenciosos de recursos vitais entre animais em casas multicat e pesquisar sinais extra-urinários de Síndrome de Pandora.',
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: 'Urinálise Completa com Amostra Fresca e Mensuração da Densidade por Refratometria',
      description: 'Exame laboratorial vital na rotina de LUTS felino. A densidade urinária (USG) deve ser quantificada obrigatoriamente por refratômetro antes de qualquer fluidoterapia (frequentemente USG > 1,040 a 1,050 em gatos jovens com CIF). A avaliação em fita reagente e a microscopia do sedimento urinário fresco (analisado idealmente em até 60 minutos após a coleta para evitar precipitação artefatual de cristais induzida pela refrigeração) revelam hematúria e piúria assépticas. A presença de cristalúria de estruvita deve ser interpretada com sobriedade clínica, pois não comprova urolitíase.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Exame Radiográfico Abdominal Total Incluindo Todo o Trajeto Uretral em Machos',
      description: 'Exame de imagem essencial para exclusão de urolitíase radiopaca (estruvita e oxalato de cálcio). A projeção radiográfica lateral do abdômen caudal deve abranger obrigatoriamente toda a trajetória anatômica da uretra peniana do macho, com membros pélvicos tracionados cranialmente, evitando que uretrólitos impactados na extremidade peniana passem despercebidos em exames restritos à cavidade peritoneal.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Ultrassonografia Abdominal e Urológica Completa (Padrão Ouro de Exclusão Estrutural)',
      description: 'Método de imagem padrão ouro confirmatório por exclusão na rotina clínica contemporânea (iCatCare 2025). Permite inspecionar a espessura e a arquitetura da parede vesical (frequentemente espessada de forma difusa na CIF), descartar massas uroteliais proliferativas, pólipos inflamatórios, coágulos sanguíneos aderidos e identificar urólitos radiotransparentes de urato de amônio não visualizáveis ao raio-X simples. Uma bexiga ultrassonograficamente normal não descarta CIF, pois a síndrome é primariamente funcional e neuroendócrina.',
      isGoldStandard: true
    },
    {
      stepNumber: 6,
      title: 'Urocultura Quantitativa por Cistocentese em Pacientes com Fatores de Risco',
      description: 'Realização de cistocentese estéril guiada por ultrassom antes da introdução de qualquer antimicrobiano em gatos com maior probabilidade pré-teste de ITU: felinos com idade superior a 10 anos, animais com densidade urinária reduzida (USG < 1,025), portadores de Doença Renal Crônica, Diabetes Mellitus ou Hipertireoidismo, histórico recente de cateterização uretral e quadros clínicos com persistência de LUTS por mais de 7 dias.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria: 'A meta prioritária no atendimento inicial da CIF não obstrutiva consiste no alívio imediato da dor visceral profunda através de analgesia farmacológica multimodal e na redução do estresse no ambiente clínico e domiciliar. Na forma obstrutiva, a meta primária absoluta é a estabilização hemodinâmica emergencial (correção de hipercalemia e arritmias) seguida da desobstrução uretral mecânica com hidropropulsão delicada e descompressão aliviadora.',

    modificacaoAmbientalMultimodalMEMO: 'O consenso internacional iCatCare 2025 e a revisão sistemática de Macleod et al. 2025 estabelecem a Modificação Ambiental Multimodal (MEMO) como a intervenção clínica com a mais sólida e robusta sustentação de evidência científica no manejo a médio e longo prazo da CIF. O protocolo baseia-se nos princípios validados por Buffington et al. (2006): (1) Caixas sanitárias: aplicar rigorosamente a regra de ouro N+1 (uma caixa para cada gato residente no domicílio mais uma caixa adicional), utilizando recipientes amplos (comprimento de pelo menos 1,5 vez o tamanho do gato), sem tampa, posicionados em cômodos silenciosos e independentes em cada andar da residência; (2) Substrato de areia: preferência comprovada de felinos por areia fina, arenosa, aglomerante e absolutamente sem fragrâncias ou desodorizantes químicos, com remoção de excretas duas vezes ao dia e higienização integral a cada 1 a 2 semanas com sabão neutro inodoro; (3) Separação espacial de recursos vitais: comedouros, bebedouros, caixas sanitárias e áreas de repouso jamais devem ficar alinhados lado a lado; em casas multicat, devem ser distribuídos em locais afastados para eliminar pontos de bloqueio visual velado por gatos dominantes; (4) Enriquecimento tridimensional e sensorial: disponibilização de prateleiras, arranhadores verticais e horizontais, áreas elevadas de vigília, tocas de refúgio seguras e brinquedos que simulem o comportamento natural de caça e forrageamento (puzzle feeders); (5) Previsibilidade de rotina: manter horários constantes de alimentação, interações humanas calmas e previsíveis e evitar punições ou broncas por periúria.',

    manejoHidricoENutricional: 'A diluição urinária sustentada é uma intervenção biológica altamente benéfica na CIF, pois reduz a concentração osmolar de solutos irritantes e íons potássio em contato com o urotélio sensibilizado e favorece micções mais volumosas. A revisão sistemática de 2025 confirmou a eficácia do aumento da umidade alimentar: (1) Introdução progressiva de dietas úmidas completas (sachês ou latas), visando atingir uma densidade urinária alvo entre 1,025 e 1,035; (2) Estímulo à hidratação ativa através de fontes de água circulante, múltiplos recipientes largos de cerâmica ou vidro espalhados pela casa e adição de caldos de carne caseiros inodoros sem cebola ou temperos; (3) Regra de ouro da transição alimentar: jamais impor mudanças abruptas de ração em gatos estressados; a neofobia felina e a aversão alimentar induzidas por trocas súbitas constituem graves eventos estressores capazes de deflagrar novas crises de CIF; (4) Uso de dietas veterinárias terapêuticas urinárias multimodais (que combinam controle mineral, ácidos graxos ômega-3 e precursores de serotonina como L-triptofano e alfa-casozepina), avaliando criticamente que a acidificação excessiva não trata a causa neuroendócrina primária da CIF.',

    analgesiaFarmacologica: 'A CIF é uma síndrome visceral intensamente dolorosa; a provisão de analgesia é um dever ético e terapêutico fundamental do médico veterinário. Contudo, o consenso iCatCare 2025 ressalta que o controle álgico visa aliviar o sofrimento na fase aguda e que não há evidência de que analgésicos previnam recorrências futuras. Para o manejo da crise álgica aguda (Feline Emergency and Critical Care Medicine, 2a ed., Cap. 22): (1) Buprenorfina: opioide agonista parcial mu de excelente absorção pela mucosa oral felina, na dose de 0,005 a 0,02 mg/kg por via transmucosa oral (sublingual) a cada 8 a 12 horas durante 5 a 7 dias; (2) Gabapentina: modulador de canais de cálcio voltagem-dependentes que atenua a sensibilização central e reduz a ansiedade de transporte/admissão, na dose de 5 a 10 mg/kg por via oral a cada 8 a 12 horas; (3) Não prometer ao tutor que a analgesia cura ou evita novos episódios, reforçando que o MEMO é a base da prevenção.',

    analiseCriticaDeFarmacosControversos: 'A medicina veterinária baseada em evidências desmistificou condutas farmacológicas historicamente consagradas na rotina clínica (Taylor et al., 2025; Macleod et al., 2025): (1) Antibióticos: a administração empírica de antimicrobianos (amoxicilina-clavulanato, enrofloxacina, cefovecina) para gatos com urina com sangue é formalmente contraindicada na ausência de urocultura positiva, contribuindo para seleção de resistência microbiana e não apresentando qualquer efeito na CIF estéril; (2) Anti-inflamatórios Não Esteroidais (AINEs): o uso de meloxicam ou robenacoxib não demonstrou benefício clínico específico superior ao placebo na duração dos sinais da CIF e seu acréscimo não reduziu reobstrução em ensaios controlados (estudo de Dorsch et al.); ademais, seu uso em animais desidratados, hipovolêmicos ou azotêmicos eleva drasticamente o risco de lesão renal aguda isquêmica; (3) Corticosteroides: a prednisolona não demonstrou qualquer eficácia clínica na CIF e predispõe a infecções secundárias e intolerância à glicose, sendo contraindicada; (4) Glicosaminoglicanos (GAGs, glucosamina e pentosan polissulfato): ensaios clínicos duplo-cegos randomizados (Gunn-Moore & Shenoy, 2004) demonstraram que a suplementação de GAGs não superou o placebo na redução de recorrências; (5) Amitriptilina no episódio agudo: o ensaio randomizado clássico de Kruger et al. (2003) e estudos de Kraijer et al. (2003) comprovaram que a amitriptilina aguda (5 mg/gato/dia por 7 dias) não reduziu a hematúria ou polaquiúria e dobrou a taxa de recorrência precoce nos primeiros meses, sendo contraindicada para crises agudas; seu papel restringe-se como droga de terceira linha na CIF crônica refratária ao MEMO (Plumb\'s 10a ed.: 2,5 a 12,5 mg/gato VO q24h à noite, sob desmame lento e monitoramento de retenção urinária anticolinérgica); (6) Prazosina e bloqueadores alfa-1: o ensaio clínico prospectivo duplo-cego randomizado de Reineke et al. (2017) comprovou que a prazosina (0,25 mg/gato q12h) não reduziu as taxas de reobstrução uretral hospitalar em 1 mês ou 6 meses, levando o consenso iCatCare 2025 a não recomendar seu uso rotineiro profilático pós-desobstrução.',

    evidenciasEmergentes2026: 'Estudos recentes e inovadores têm explorado novas frentes terapêuticas para casos refratários de CIF: (1) Radioterapia de Baixa Dose: Kendall et al. (JVIM, 2026) avaliaram em prova de conceito 15 gatos machos com CIF grave recorrente e histórico de UO refratários a manejo convencional, submetidos a uma fração única de 6 Gy envolvendo o trato urinário inferior; 13 de 14 felinos acompanhados (93%) exibiram melhora acentuada nos escores clínicos com mediana de sobrevida livre de 548 dias, configurando uma terapia promissora para casos extremos candidatos à eutanásia; (2) Suplementação Multinutriente em RCT Piloto: Chen & Huang (Scientific Reports, publicado em 14 de setembro de 2026) demonstraram em ensaio prospectivo randomizado duplo-cego (n=30 machos com CIF sob MEMO) que a suplementação com fórmula antioxidante e moduladora reduziu a taxa de recorrência em 6 meses (13,3% vs 40%, P=0,05) e prolongou o intervalo livre de sinais clínicos, apontando potencial adjuvante que demanda validação em coortes maiores.',

    protocoloDeDesobstrucaoECateterizacaoUretral: 'Manejo emergencial do paciente macho com CIF obstrutiva (Feline Emergency and Critical Care, 2a ed., Cap. 22; BSAVA Procedures 3a ed., pp. 292-294): (1) Estabilização metabólica primária com gluconato de cálcio a 10% IV se houver arritmias ou hipercalemia (K+ > 7,0 mEq/L) e fluidoterapia de reposição; (2) Cistocentese descompressiva aliviadora prévia com agulha fina (22G ou 23G) acoplada a extensor e torneira de três vias, reduzindo a pressão intravesical e facilitando a posterior desobstrução retrógrada; (3) Anestesia geral balanceada com relaxamento muscular; (4) Hidropropulsão suave com solução salina estéril morna utilizando cateter uretral delicado e flexível (Milacath ou Tomcat sem ponta rígida), evitando traumas ou lacerações da uretra peniana; (5) Manutenção de cateter permanente maleável (3,5 Fr) acoplado obrigatoriamente a sistema coletor fechado estéril com bolsa graduada durante 24 a 48 horas para quantificar a diurese pós-obstrutiva e prevenir infecção bacteriana hospitalar ascendente.'
  },

  complications: {
    obstrucaoUretralAgudaEArritmiaFatal: 'O desenvolvimento de UO secundária a tampões mucoproteicos inflamatórios e espasmo muscular em machos é a complicação imediata mais letal da CIF, evoluindo rapidamente com acidose metabólica, hipercalemia severa, parada cardiorrespiratória e óbito se não tratada em regime de emergência.',

    atoniaVesicalDoDetrusorPorSobredistensao: 'A distensão mecânica vesical excessiva e prolongada por retenção urinária rompe as junções comunicantes das miofibrilas do músculo detrusor, resultando em atonia vesical flácida secundária duradoura, necessitando de esvaziamento por cateterismo ou compressão manual suave e parassimpaticomiméticos (betanecol).',

    iatrogeniaUretralERupturaDeBexiga: 'Tentativas vigorosas e forçadas de sondagem uretral sem anestesia adequada ou uso de cateteres rígidos podem provocar perfuração uretral traumática, laceração peniana, estenose uretral cicatricial secundária e uroabdome decorrente de ruptura vesical por sobrepressão retrógrada.',

    deterioracaoDaQualidadeDeVidaEEutanasia: 'As crises recorrentes frequentes de LUTS doloroso, a periúria domiciliar em tapetes e camas e o estresse na administração de medicamentos geram intenso desgaste no vínculo afetivo tutor-felino, constituindo uma das maiores causas históricas de eutanásia por conveniência e abandono de gatos domiciliados.'
  },

  prevention: {
    cincoPilaresDoAmbienteFelinoSeguro: 'A prevenção primária e secundária das recidivas da CIF fundamenta-se estritamente na aplicação dos 5 pilares do ambiente felino saudável preconizados pela ISFM e iCatCare: (1) Fornecer um local seguro e protegido (áreas de refúgio elevadas e tocas); (2) Prover múltiplos recursos ambientais essenciais e fisicamente separados; (3) Proporcionar oportunidades para brincadeiras predatórias simuladas e forrageamento; (4) Garantir interações sociais humanas positivas, consistentes e previsíveis; (5) Respeitar a importância do olfato e da marcação química facial do território.',

    regrasDeOuroDasCaixasSanitarias: 'Manter a regra de número de caixas sanitárias igual ao número de gatos residentes mais uma (N+1), distribuídas em locais independentes para impedir que um gato bloqueie o caminho do outro. Utilizar caixas abertas e largas, higienizadas diariamente com pá vazada e preenchidas com areia de textura fina e sem fragrâncias.',

    hidratacaoEAlimentacaoUmidaContinua: 'Fornecer alimento úmido em temperatura morna diariamente associado a múltiplas opções de bebedouros de boca larga (evitando o toque das vibrissas nas bordas) e fontes de água corrente limpa mantidas distantes do comedouro e das caixas de areia.',

    manutencaoDaPrevisibilidadeEControleSocial: 'Manter rotinas estáveis de alimentação e limpeza e manejar cuidadosamente mudanças no domicílio (reformas, introdução gradual de novos animais e uso de feromônios faciais sintéticos difusores em períodos de transição).'
  },

  references: [
    {
      id: 'ref-taylor-2025',
      citation: 'Taylor S, et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. Journal of Feline Medicine and Surgery, 2025;27(2):1098612X241309176. DOI: 10.1177/1098612X241309176.'
    },
    {
      id: 'ref-macleod-2025',
      citation: 'Macleod B, et al. Understanding the current evidence base for the commonly recommended management strategies for recurrent feline idiopathic cystitis: a systematic review. New Zealand Veterinary Journal, 2025;73(4):233-245. DOI: 10.1080/00480169.2025.2477542.'
    },
    {
      id: 'ref-buffington-2006',
      citation: 'Buffington CAT, Westropp JL, Chew DJ, Bolus RR. Clinical evaluation of multimodal environmental modification (MEMO) in the management of cats with idiopathic cystitis. Journal of Feline Medicine and Surgery, 2006;8(4):261-268. DOI: 10.1016/j.jfms.2006.02.002.'
    },
    {
      id: 'ref-kruger-2003',
      citation: 'Kruger JM, et al. Randomized controlled trial of amitriptyline for the treatment of acute nonobstructive idiopathic lower urinary tract disease in cats. Journal of the American Veterinary Medical Association, 2003;222(6):749-758.'
    },
    {
      id: 'ref-kraijer-2003',
      citation: 'Kraijer M, Fink-Gremmels J, Nickel RF. The short-term clinical efficacy of amitriptyline in the management of feline idiopathic cystitis. Journal of Feline Medicine and Surgery, 2003;5(3):191-196.'
    },
    {
      id: 'ref-reineke-2017',
      citation: 'Reineke EL, et al. Evaluation of prazosin for prevention of recurrent urethral obstruction in male cats: a prospective, randomized, double-blind, placebo-controlled clinical trial. Journal of the American Veterinary Medical Association, 2017;251(8):926-931.'
    },
    {
      id: 'ref-gunn-moore-2004',
      citation: 'Gunn-Moore DA, Shenoy CM. Oral glucosamine and the management of feline idiopathic cystitis: a randomized double-blind placebo-controlled clinical trial. Journal of Feline Medicine and Surgery, 2004;6(4):219-225.'
    },
    {
      id: 'ref-dorsch-2016',
      citation: 'Dorsch R, et al. Evaluation of meloxicam for the prevention of recurrent urethral obstruction in male cats: a prospective randomized clinical study. Journal of Feline Medicine and Surgery, 2016;18(11):889-897.'
    },
    {
      id: 'ref-kendall-2026',
      citation: 'Kendall A, et al. Low-dose radiation therapy for idiopathic or interstitial cystitis in male cats: a pilot study of 15 refractory cases. Journal of Veterinary Internal Medicine, 2026;40(1):aalaf029. DOI: 10.1093/jvimsj/aalaf029.'
    },
    {
      id: 'ref-chen-huang-2026',
      citation: 'Chen WJ, Huang KW. A randomized placebo-controlled study evaluating the efficacy of a multi-nutrient supplement on lower urinary tract health in male cats with feline idiopathic cystitis. Scientific Reports, 2026;16:70935. DOI: 10.1038/s41598-026-70935-2.'
    },
    {
      id: 'ref-nelson-couto-6ed',
      citation: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier, 2020; Cap. 44: Obstructive and Nonobstructive Feline Idiopathic Cystitis, pp. 724-729; Cap. 42: Bacterial Cystitis, pp. 704-712; Cap. 45: Disorders of Micturition, pp. 730-737.'
    },
    {
      id: 'ref-bsava-nephrology-3ed',
      citation: 'Elliott J, Grauer GF, Westropp JL. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. Gloucester: British Small Animal Veterinary Association, 2017; Cap. 28: Management of non-obstructive idiopathic/interstitial cystitis in cats, pp. 317-327; Cap. 3: Control of micturition, pp. 24-36.'
    },
    {
      id: 'ref-feline-emergency-2ed',
      citation: 'Drobatz KJ, Costello MF. Feline Emergency and Critical Care Medicine. 2nd ed. Ames: Wiley-Blackwell, 2023; Cap. 22: Feline Lower Urinary Tract Obstruction and Idiopathic Cystitis, pp. 223-229.'
    },
    {
      id: 'ref-plumb-10ed',
      citation: 'Plumb DC. Plumb\'s Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell, 2023; Monografias: Amitriptyline, Buprenorphine, Gabapentin, Prazosin.'
    },
    {
      id: 'ref-bsava-procedures-3ed',
      citation: 'Mullineaux E, Jones M. BSAVA Guide to Procedures in Small Animal Practice. 3rd ed. Gloucester: BSAVA, 2024; Procedimento: Urethral catheterization in the male cat, pp. 292-294.'
    }
  ]
};
