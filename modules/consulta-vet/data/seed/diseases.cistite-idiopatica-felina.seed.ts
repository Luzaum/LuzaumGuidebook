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

  quickSummary:
    'A Cistite Idiopática Felina (CIF / FIC) é a afecção mais prevalente do trato urinário inferior felino (LUTS), respondendo por 55% a 65% das consultas de adultos jovens a meia-idade:\n' +
    '- Conceito contemporâneo e eixo neuroendócrino (Diretrizes iCatCare 2025 e revisão Macleod et al., 2025):\n' +
    '  - A bexiga não é a causa primária, mas sim o órgão de choque somático de uma síndrome dolorosa complexa de resposta à ameaça ambiental.\n' +
    '  - Indivíduo biologicamente vulnerável ("sensitive individual") exposto a ambiente percebido como ameaçador ("provocative environment"), com hiperativação sustentada do sistema central de resposta à ameaça (CTRS), disautonomia simpática e hiporreatividade adrenal.\n' +
    '- Diagnóstico estrito de exclusão:\n' +
    '  - Ausência de teste positivo patognomônico; exclusão mandatória de urolitíase, ITU bacteriana (rara, <1% a 3% em jovens) e neoplasias.\n' +
    '- Pilares de manejo clínico e analgesia:\n' +
    '  - Modificação Ambiental Multimodal (MEMO), estímulo hídrico e dietético gradual e analgesia imediata da dor aguda com buprenorfina e gabapentina.\n' +
    '  - Veto ao uso empírico de antibióticos, corticosteroides, GAGs orais ou prazosina profilática de rotina, por carência de benefício em ensaios clínicos randomizados.',

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
    lead:
      'A Cistite Idiopática Felina é uma síndrome álgica e funcional complexa decorrente de desregulação neuroendócrina sistêmica:\n' +
      '- Interação bidirecional cérebro-bexiga entre indivíduo biologicamente suscetível e ambiente percebido como ameaçador.\n' +
      '- Manifestações de LUTS representam o reflexo somático da hiperatividade do sistema central de resposta à ameaça (CTRS).\n' +
      '- Abordagem clínica fundamentada em diagnóstico metódico de exclusão, analgesia aguda precoce e Modificação Ambiental Multimodal (MEMO).',
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
        body:
          'Compreensão neuro-urológica contemporânea da CIF:\n' +
          '- Via descendente (Top-Down):\n' +
          '  - Percepção de ameaça ambiental por felino suscetível ativa o sistema central de resposta à ameaça (CTRS), gerando eferência simpática persistente, liberação de catecolaminas e sensibilização medular.\n' +
          '- Via ascendente (Bottom-Up):\n' +
          '  - Aumento da permeabilidade urotelial expõe fibras C sensoriais a solutos urinários concentrados, retroalimentando o sistema nervoso central com aferências álgicas contínuas.\n' +
          '- Bexiga como órgão efetor:\n' +
          '  - Inflamação neurogênica secundária com liberação de substância P e neuropeptídeos, sem infecção bacteriana primária.',
        highlights: ['CTRS e desregulação simpática', 'Sensibilização central e periférica de fibras C', 'Urotélio como órgão sensorial integrado']
      },
      {
        title: 'Pilar 2: Diagnóstico Rigoroso por Exclusão e Triagem Imediata de Obstrução',
        body:
          'Metodologia diagnóstica por eliminação sistemática:\n' +
          '- Triagem emergencial de obstrução uretral (UO):\n' +
          '  - Palpação vesical precoce e mandatória, especialmente em machos com estrangúria, para diferenciar retenção obstrutiva de cistite não obstrutiva.\n' +
          '- Exclusão de afecções estruturais e infecciosas:\n' +
          '  - Eliminação metódica de urólitos (radiografia/ultrassom), ITU bacteriana por cistocentese (rara em jovens) e neoplasias em idosos.\n' +
          '- Ausência de marcador patognomônico:\n' +
          '  - O diagnóstico de CIF consolida-se exclusivamente pela negatividade das demais causas de LUTS felino.',
        highlights: ['Palpação imediata para excluir UO', 'Exclusão de urólitos e infecções', 'Urinálise completa com sedimento fresco']
      },
      {
        title: 'Pilar 3: Modificação Ambiental Multimodal (MEMO) e Recursos Espaciais',
        body:
          'Intervenção preventiva padrão ouro conforme consenso iCatCare 2025 e Macleod et al. (2025):\n' +
          '- Caixas sanitárias N+1:\n' +
          '  - Uma caixa por gato mais uma adicional, abertas, amplas, distribuídas em locais independentes com substrato fino e inodoro.\n' +
          '- Separação tridimensional de recursos vitais:\n' +
          '  - Afastamento físico entre alimentação, água e eliminação, eliminando pontos de bloqueio visual velado em domicílios multicat.\n' +
          '- Previsibilidade e controle:\n' +
          '  - Estabelecimento de rotinas estáveis, áreas seguras de refúgio vertical e redução consistente de estímulos estressores.',
        highlights: ['Caixas N+1 e substrato aglomerante', 'Recursos separados espacialmente', 'Redução de conflitos sociais e previsibilidade']
      },
      {
        title: 'Pilar 4: Racionalização Farmacológica e Fim de Condutas Empíricas',
        body:
          'Conduta medicamentosa estritamente alinhada às evidências científicas:\n' +
          '- Veto a práticas empíricas ineficazes:\n' +
          '  - Antibióticos são contraindicados sem urocultura positiva; AINEs e corticoides não previnem recidivas; amitriptilina na crise aguda dobra recorrência precoce.\n' +
          '- Ineficácia comprovada de GAGs e prazosina:\n' +
          '  - Suplementação de GAGs e prazosina profilática de rotina (Reineke et al., 2017) não superam o placebo em ensaios randomizados.\n' +
          '- Foco no alívio da dor aguda:\n' +
          '  - Analgesia prioritária com buprenorfina transmucosa e gabapentina oral para alívio ético da crise dolorosa.',
        highlights: ['Veto a antibióticos empíricos', 'Ineficácia de GAGs e prazosina rotineira', 'Analgesia com buprenorfina e gabapentina']
      }
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Sequencial para Felinos com Sinais do Trato Urinário Inferior (LUTS)',
      steps: [
        {
          label: 'Etapa 1: Triagem Imediata de Volemia e Obstrução Uretral (UO)',
          timing: 'Minuto 0 da admissão',
          detail:
            'Procedimento prioritário na chegada do paciente felino:\n' +
            '- Palpação vesical caudal imediata:\n' +
            '  - Bexiga distendida, rígida, turgida e dolorosa em gato com esforço improdutivo: diagnosticar emergência de obstrução uretral (UO).\n' +
            '- Ação emergencial na vigência de UO:\n' +
            '  - Triagem de hipercalemia e arritmias ventriculares via ECG, analgesia e estabilização prévia à desobstrução mecânica.\n' +
            '- Conduta se bexiga pequena ou compressível:\n' +
            '  - Classificar provisoriamente como LUTS não obstrutivo e prosseguir na investigação de exclusão.'
        },
        {
          label: 'Etapa 2: Anamnese Ambiental, Dinâmica Social e Histórico de Eventos Provocadores',
          timing: 'Durante a anamnese',
          detail:
            'Auditoria sistemática do território e do ambiente domiciliar:\n' +
            '- Mapeamento de recursos e dinâmica multicat:\n' +
            '  - Contagem de gatos residentes, número de caixas sanitárias, tipo de substrato de areia e distanciamento entre recursos vitais.\n' +
            '- Identificação de estressores provocadores:\n' +
            '  - Reformas, visitas, alteração na rotina do tutor ou bloqueio de passagem por felinos dominantes.\n' +
            '- Rastreio de sinais sistêmicos associados:\n' +
            '  - Investigação de sinais compatíveis com a Síndrome de Pandora (vômitos intermitentes, hiporexia, dermatite psicogênica).'
        },
        {
          label: 'Etapa 3: Urinálise Completa com Amostra Fresca e Mensuração da Densidade (USG)',
          timing: 'Primeiras 1 a 2 horas',
          detail:
            'Avaliação físico-química e citológica da urina fresca:\n' +
            '- Densidade urinária (USG) por refratometria:\n' +
            '  - Mensurar antes da fluidoterapia; felinos jovens com CIF exibem urina altamente concentrada (USG habitualmente > 1,040 a 1,050).\n' +
            '- Sedimento urinário inspecionado em até 60 minutos:\n' +
            '  - Identificação de hematúria e piúria assépticas por inflamação neurogênica.\n' +
            '- Interpretação comedida da cristalúria:\n' +
            '  - Cristais de estruvita ocorrem frequentemente como achado incidental em urina felina densa e não equivalem a urolitíase.'
        },
        {
          label: 'Etapa 4: Exame de Imagem do Trato Urinário (Radiografia e Ultrassonografia)',
          timing: 'Nas primeiras 24 horas',
          detail:
            'Mapeamento anatômico para exclusão de urólitos e lesões estruturais:\n' +
            '- Radiografia abdominal total com membros estendidos:\n' +
            '  - Visualização de toda a uretra peniana do macho até a extremidade para detectar cálculos radiopacos de estruvita e oxalato.\n' +
            '- Ultrassonografia abdominal detalhada:\n' +
            '  - Exclusão de urólitos radiotransparentes de urato, massas vesicais, pólipos inflamatórios e coágulos obstrutivos.\n' +
            '- Avaliação parietal vesical:\n' +
            '  - Identificação de espessamento parietal focal ou difuso compatível com cistite.'
        },
        {
          label: 'Etapa 5: Urocultura Quantitativa por Cistocentese em Casos Selecionados',
          timing: 'Conforme indicação clínica',
          detail:
            'Indicações precisas para pesquisa microbiológica:\n' +
            '- Populações sob risco aumentado de bacteriúria:\n' +
            '  - Felinos geriátricos (>10 anos), animais portadores de DRC, diabetes mellitus ou hipertireoidismo com USG < 1,025.\n' +
            '- Histórico e refratariedade:\n' +
            '  - Histórico prévio de sondagem uretral ou persistência de sinais clínicos por período superior a 7 dias sem remissão.'
        },
        {
          label: 'Etapa 6: Consolidação do Diagnóstico de Exclusão e Avaliação de Recorrência',
          timing: 'Acompanhamento longitudinal',
          detail:
            'Fechamento diagnóstico e vigilância longitudinal:\n' +
            '- Diagnóstico definitivo por exclusão:\n' +
            '  - Consolidado apenas após exclusão negativa comprovada de causas infecciosas, anatômicas, neoplásicas e litiásicas.\n' +
            '- Reavaliação a cada nova crise:\n' +
            '  - Reiniciar a linha de raciocínio investigativo em episódios recorrentes para não negligenciar urolitíase adquirida secundariamente.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico Escalonado da Cistite Idiopática Felina',
      steps: [
        {
          label: 'Fase 1: Manejo da Crise Aguda e Analgesia Prioritária',
          timing: 'Dias 1 a 5 da crise',
          detail:
            'Intervenção emergencial para quebra do ciclo nociceptivo:\n' +
            '- Analgesia farmacológica multimodal precoce:\n' +
            '  - Buprenorfina transmucosa (0,005 a 0,02 mg/kg sublingual q8-12h) e/ou Gabapentina oral (5 a 10 mg/kg q8-12h).\n' +
            '- Ambiente acolhedor de repouso:\n' +
            '  - Isolamento em cômodo silencioso, iluminado suavemente e livre de manipulações e contenções estressantes.'
        },
        {
          label: 'Fase 2: Auditoria e Implementação da Modificação Ambiental Multimodal (MEMO)',
          timing: 'Início imediato com consolidação em 2 a 4 semanas',
          detail:
            'Execução das diretrizes de ambiente seguro (iCatCare 2025):\n' +
            '- Caixas sanitárias N+1 em locais privativos e silenciosos com areia fina inodora e recolhimento frequente.\n' +
            '- Separação física dos recursos vitais (comida, água, caixas e descanso) para evitar bloqueios territoriais em domicílios multicat.\n' +
            '- Enriquecimento ambiental com prateleiras verticais, esconderijos seguros e previsibilidade estrita nas rotinas diárias.'
        },
        {
          label: 'Fase 3: Otimização da Ingestão Hídrica e Manejo Dietético',
          timing: 'Manutenção contínua',
          detail:
            'Estratégias de diluição urinária progressiva:\n' +
            '- Introdução paulatina de dietas úmidas completas (sachês ou patês), fontes de água circulante e potes largos de cerâmica.\n' +
            '- Transição alimentar lenta ao longo de 2 a 3 semanas para evitar aversão alimentar e estresse induzido por neofobia.\n' +
            '- Meta biológica de manter a densidade urinária alvo entre 1,025 e 1,035.'
        },
        {
          label: 'Fase 4: Manejo Emergencial da Obstrução Uretral (UO) em Machos',
          timing: 'Imediato se UO presente',
          detail:
            'Sequência protocolar de desobstrução e terapia intensiva:\n' +
            '- Estabilização hemodinâmica inicial: correção de hipercalemia e arritmias cardíacas com fluidoterapia e gluconato de cálcio a 10% IV.\n' +
            '- Descompressão vesical prévia por cistocentese aliviadora com agulha fina (22G ou 23G) acoplada a torneira de três vias.\n' +
            '- Desobstrução sob anestesia balanceada com hidropropulsão delicada e manutenção de cateter flexível em sistema fechado estéril por 24 a 48 horas.'
        },
        {
          label: 'Fase 5: Abordagem de Casos Crônicos Refratários e Apoio Especializado',
          timing: 'Após falha comprovada de MEMO adequado por >4 a 6 semanas',
          detail:
            'Manejo de felinos com sinais contínuos ou recidivas frequentes:\n' +
            '- Revisão diagnóstica integral para afastar urolitíase oculta, estenose uretral ou neoplasias vesicais.\n' +
            '- Terapia farmacológica comportamental de terceira linha: Amitriptilina oral (2,5 a 12,5 mg/gato VO q24h à noite com desmame lento).\n' +
            '- Encaminhamento para médico veterinário especialista em medicina felina ou medicina comportamental.'
        }
      ]
    }
  },

  etiology: {
    definicaoModernaSindromeDolorosaSistemica:
      'Definição contemporânea da Cistite Idiopática Felina (CIF / FIC):\n' +
      '- Mudança de paradigma conceitual (Diretrizes iCatCare 2025):\n' +
      '  - Superação do conceito reducionista de doença vesical isolada; a bexiga atua como o órgão efetor somático de uma síndrome dolorosa e neuroendócrina sistêmica deflagrada pela percepção de ameaça ambiental.\n' +
      '- Limitação da denominação histológica clássica:\n' +
      '  - O termo cistite é imperfeito, pois parcela significativa dos felinos acometidos não exibe infiltrado neutrofílico clássico.\n' +
      '  - As alterações predominantes compreendem quebra da barreira de permeabilidade urotelial, hipervascularização submucosa e sensibilização periférica de fibras nociceptivas (Nelson & Couto, 6a ed., Cap. 44, pp. 724-729; BSAVA Nephrology and Urology, 3a ed., Cap. 28, pp. 317-327).',

    distincaoConceitualLUTSvFLUTDvsCIFvsPandora:
      'Uniformização terminológica na urologia e medicina felina:\n' +
      '- Sinais do Trato Urinário Inferior (LUTS):\n' +
      '  - Descritor puramente semiológico que engloba disúria, estrangúria, hematúria macroscópica, polaquiúria e periúria (eliminação fora da caixa de areia).\n' +
      '- Doença do Trato Urinário Inferior Felino (FLUTD / DTUIF):\n' +
      '  - Termo guarda-chuva sindrômico abrangendo qualquer causa estrutural, litiásica, infecciosa ou funcional, não devendo constituir diagnóstico final conclusivo.\n' +
      '- Cistite Idiopática Felina (CIF / FIC):\n' +
      '  - Diagnóstico nosológico específico de exclusão, firmado somente após afastar urolitíase, infecções, tampões uretrais e neoplasias.\n' +
      '- Síndrome de Pandora:\n' +
      '  - Modelo biopsicossocial que engloba a vulnerabilidade sistêmica do indivíduo sensível, no qual sinais urinários coexistem com manifestações dermatológicas, digestórias e comportamentais de estresse crônico.',

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

    neurofisiologiaDaMiccaoEFibrasC:
      'Circuitos neurais da micção e sensibilização das fibras C (Nelson & Couto, 6a ed., Cap. 45; BSAVA Nephrology, 3a ed., Cap. 3):\n' +
      '- Inervação simpática (nervos hipogástricos, L1-L4):\n' +
      '  - Liberação de norepinefrina; estimula receptores beta-adrenérgicos no corpo vesical (relaxamento do detrusor para armazenamento) e receptores alfa-1 no colo vesical/uretra proximal (contração esfincteriana lisa).\n' +
      '- Inervação parassimpática (nervos pélvicos, S1-S3):\n' +
      '  - Liberação de acetilcolina em receptores muscarínicos M2 e M3 no músculo detrusor, promovendo sua contração durante o esvaziamento miccional voluntário.\n' +
      '- Inervação somática (nervos pudendos, S1-S3):\n' +
      '  - Condução colinérgica via receptores nicotínicos no músculo estriado uretral (esfíncter uretral externo).\n' +
      '- Sensibilização e recrutamento de fibras C sensoriais:\n' +
      '  - Em condições fisiológicas, as fibras C amielínicas permanecem predominantemente silentes.\n' +
      '  - Sob quebra da barreira urotelial e inflamação neurogênica, sofrem ativação maciça e disparam neuropeptídeos pró-inflamatórios retrógrados (substância P, neurocinina A e CGRP).\n' +
      '  - Esse fenômeno gera vasodilatação submucosa, extravasamento plasmático, edema tecidual e dor visceral intensa.',

    viasBidirecionaisTopDownEBottomUp:
      'Modelo bidirecional encéfalo-urotélio na CIF (Diretrizes iCatCare 2025):\n' +
      '- Via descendente (Top-Down — do encéfalo para a bexiga):\n' +
      '  - Felino epigeneticamente vulnerável interpreta alterações cotidianas do território (visitas, reformas, conflitos velados) como ameaças incontroláveis.\n' +
      '  - Hiperativação contínua do Sistema Central de Resposta à Ameaça (CTRS), envolvendo o locus coeruleus e a substância cinzenta periaquedutal.\n' +
      '  - Eferência simpática sustentada, liberação de catecolaminas, disfunção endotelial microvascular vesical e redução do limiar de dor com hiperalgesia visceral.\n' +
      '- Via ascendente (Bottom-Up — da bexiga para o encéfalo):\n' +
      '  - Descontinuidade da barreira urotelial expõe receptores e fibras C na lâmina própria a solutos urinários concentrados e íons potássio.\n' +
      '  - Descargas nociceptivas aferentes contínuas sobem pela medula espinhal até centros corticais, retroalimentando o CTRS e perpetuando a sensação central de ameaça corporal.',

    desmistificacaoDaTeoriaDoEstressePuro:
      'Bases neurobiológicas concretas da resposta ao estresse na CIF:\n' +
      '- Disautonomia neuroendócrina objetiva:\n' +
      '  - A CIF não é afecção puramente comportamental ou psicológica abstrata; gatos acometidos exibem alterações laboratoriais e morfológicas mensuráveis.\n' +
      '- Elevação sustentada de catecolaminas plasmáticas:\n' +
      '  - Níveis basais e induzidos de norepinefrina significativamente superiores aos controles normais.\n' +
      '- Hipo-responsividade paradoxal do eixo HPA:\n' +
      '  - Falha em produzir cortisol compensatório suficiente após estímulo com ACTH, acompanhada de hipoplasia adrenal relativa.\n' +
      '- Síndrome de desregulação visceral:\n' +
      '  - A ausência do freio anti-inflamatório do cortisol endógeno permite que o tônus simpático exacerbado mantenha a inflamação neurogênica crônica.'
  },

  epidemiology: {
    prevalenciaEmGatosComLUTS:
      'Dados de prevalência em apresentações urológicas felinas:\n' +
      '- Causa líder de LUTS na espécie felina:\n' +
      '  - Responde por 55% a 65% de todas as apresentações de LUTS em gatos jovens a meia-idade em âmbitos clínico e emergencial (Taylor et al., 2025; Nelson & Couto, 6a ed., Cap. 44).\n' +
      '- Faixa etária de maior vulnerabilidade:\n' +
      '  - Concentra-se primariamente entre 1 e 7 anos de idade, tornando-se proporcionalmente menos frequente como causa primária em animais geriátricos.',

    baixaPrevalenciaDeInfeccaoBacterianaITU:
      'Epidemiologia da infecção bacteriana do trato urinário (ITU) em felinos:\n' +
      '- Incidência extremamente reduzida em jovens e adultos hígidos:\n' +
      '  - A ITU bacteriana verdadeira confirmada por urocultura representa menos de 1% a 3% de todos os casos de LUTS em gatos entre 1 e 7 anos de idade.\n' +
      '- Barreiras de defesa antibacteriana intrínsecas da espécie:\n' +
      '  - Urina fisiologicamente hiperconcentrada (densidade urinária frequentemente superior a 1,050), elevada osmolalidade e alta concentração de ureia e compostos nitrogenados inibem o crescimento bacteriano.\n' +
      '- Cenários em que a ITU se torna relevante:\n' +
      '  - Prevalência expressiva (>30% a 50%) apenas em pacientes geriátricos (>10 anos) ou acometidos por comorbidades que diluem a urina (Doença Renal Crônica, Diabetes Mellitus, Hipertireoidismo) e após cateterismo uretral ou uretrostomia perineal.',

    fatoresDeRiscoEAssociacoesEpidemiologicas:
      'Fatores de risco identificados no consenso iCatCare 2025:\n' +
      '- Confinamento e sedentarismo:\n' +
      '  - Estilo de vida estritamente indoor com privação de estímulos exploratórios, ausência de brincadeiras predatórias simuladas e obesidade ou sobrepeso corporal.\n' +
      '- Conflito social velado em casas multicat:\n' +
      '  - Coabitação de múltiplos gatos com densidade populacional excessiva, competição invisível por recursos e bloqueios territoriais de acesso.\n' +
      '- Manejo inadequado das caixas sanitárias:\n' +
      '  - Quantidade insuficiente de bandejas, locais ruidosos ou sem rota de fuga, substratos com fragrâncias artificiais e higienização irregular.\n' +
      '- Imprevisibilidade da rotina:\n' +
      '  - Instabilidade em horários de fornecimento de alimento, reformas domiciliares e interações humanas inadequadas ou forçadas.',

    diferencasSexuaisEVulnerabilidadeObstrutiva:
      'Disparidade sexual e predisposição à obstrução uretral (UO):\n' +
      '- Incidência uniforme da CIF não obstrutiva:\n' +
      '  - Machos e fêmeas são afetados em proporções equivalentes pela síndrome dolorosa não obstrutiva.\n' +
      '- Predisposição anatômica crítica dos machos à UO:\n' +
      '  - A uretra peniana do macho felino é longa, curvilínea e estreita-se progressivamente na porção distal.\n' +
      '  - O gato macho apresenta vulnerabilidade extrema à oclusão mecânica completa por tampões mucoproteicos, microcálculos e espasmo muscular reflexo associado a edema da mucosa.'
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
    transmissao:
      'Características de transmissibilidade da CIF:\n' +
      '- Natureza médica não infecciosa e não contagiosa:\n' +
      '  - Trata-se de uma síndrome neuroendócrina e comportamental decorrente de fatores genéticos, epigenéticos e de manejo ambiental.\n' +
      '- Ausência de transmissão horizontal ou vetorial:\n' +
      '  - Não há risco de transmissão entre animais coabitantes nem potencial zoonótico para tutores.'
  },

  pathophysiology: {
    urotelioComoOrgaoSensorialECamadaGAG:
      'Fisiologia sensorial do urotélio e camada de glicosaminoglicanos (GAGs):\n' +
      '- Urotélio como tecido sensorial ativo:\n' +
      '  - Transcende a função de barreira passiva; expressa receptores adrenérgicos, colinérgicos e purinérgicos P2X/P2Y e canais TRPV1, liberando ATP e óxido nítrico em resposta a estiramento e agentes químicos luminais.\n' +
      '- Camada de GAGs e permeabilidade transmural:\n' +
      '  - Proteoglicanos sulfatados e glicoproteínas cobrem a face apical das células em guarda-chuva, reduzindo a adesão bacteriana e a retrotranslocação de solutos.\n' +
      '  - Na CIF, a quebra da barreira permite influxo transmural de íons potássio e toxinas urinárias em direção à lâmina própria.\n' +
      '- Desmistificação científica da carência de GAGs:\n' +
      '  - Ensaios clínicos controlados e revisões sistemáticas (Gunn-Moore & Shenoy, 2004; Macleod et al., 2025) comprovaram que a reposição oral de glucosamina, condroitina ou pentosan polissulfato não supera o placebo.\n' +
      '  - A lesão urotelial é consequência de disfunção neurogênica central e não uma deficiência nutricional primária de GAGs.',

    eixoNeuroendocrinoEHiperatividadeSimpatica:
      'Disregulação do eixo neuroendócrino e desbalanço autonômico (Buffington et al.):\n' +
      '- Tônus simpático sustentado e catecolaminas aumentadas:\n' +
      '  - Felinos com CIF apresentam elevação crônica de norepinefrina plasmática basal e reatividade exacerbada de receptores alfa-2 centrais.\n' +
      '- Hipo-responsividade paradoxal do eixo HPA:\n' +
      '  - Falha em elevar proporcionalmente ACTH e cortisol plasmático durante estímulos provocadores de estresse agudo.\n' +
      '- Alterações morfológicas da glândula adrenal:\n' +
      '  - Evidência de hipoplasia morfométrica relativa do córtex adrenal em gatos com histórico crônico de CIF.\n' +
      '- Consequência biológica periférica:\n' +
      '  - A deficiência relativa de cortisol circulante remove o controle fisiológico anti-inflamatório, permitindo que a cascata inflamatória neurogênica vesical se autoalimente.',

    fisiopatologiaDaObstrucaoUretralAgudaUO:
      'Fisiopatologia da Obstrução Uretral Aguda (UO) felina (Feline Emergency and Critical Care, 2a ed., Cap. 22):\n' +
      '- Tríade patogênica da oclusão luminal:\n' +
      '  - Espasmo reflexo da musculatura lisa e estriada da uretra distal (nervos hipogástrico e pudendo), edema inflamatório submucoso e impactação mecânica de tampões mucoproteicos (matriz coloidal de muco, proteínas extravasadas e cristais de estruvita).\n' +
      '- Colapso hidrostático e Lesão Renal Aguda pós-renal:\n' +
      '  - Aumento da pressão intravesical transmitido retrogradamente a ureteres, túbulos renais e cápsula de Bowman, anulando o gradiente de filtração glomerular (queda crítica da TFG) com rápida retenção de escórias nitrogenadas, fosfatos e prótons (acidose metabólica).\n' +
      '- Cardiotoxicidade letal da hipercalemia progressiva:\n' +
      '  - A retenção de potássio reduz a negatividade do potencial de repouso das células cardíacas, lentificando a despolarização.\n' +
      '  - Alterações eletrocardiográficas sequenciais: achatamento e perda de onda P, alargamento acentuado do QRS e ondas T pontiagudas em tenda, culminando em bradicardia grave, fibrilação ventricular e óbito se a descompressão imediata não for executada.',

    figurasClinicasIntegradas: 'As figuras a seguir ilustram os achados ultrassonográficos de cistite felina com espessamento e celularidade, a microscopia do sedimento urinário com cristais de estruvita e a técnica correta de cateterização com sistema fechado.'
  },

  figures: [
    {
      id: 'fig-cif-01',
      title: 'Ultrassonografia Vesical Panorâmica em Felino com FLUTD / CIF',
      url: '/consulta-vet/cistite-idiopatica-felina/ultrassom-bexiga-felina-cistite-panoramica.jpg',
      legend:
        'Varredura ultrassonográfica de bexiga urinária felina (Wikimedia Commons, CC BY-SA 4.0):\n' +
        '- Espessamento parietal difuso da parede vesical com contornos mucosos irregulares.\n' +
        '- Conteúdo intraluminal com celularidade ecogênica flutuante e debris estéreis em suspensão.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-02',
      title: 'Ultrassom Vesical: Sedimento Ecogênico e Debris Estéreis Intraluminais',
      url: '/consulta-vet/cistite-idiopatica-felina/ultrassom-bexiga-felina-sedimento-debris.jpg',
      legend:
        'Corte ultrassonográfico vesical em gato com CIF (Wikimedia Commons, CC BY-SA 4.0):\n' +
        '- Debris intraluminais ecogênicos em meio ao conteúdo anecogênico da urina.\n' +
        '- Agregação de muco, micro-hemorragias e cristais estéreis precipitados por inflamação neurogênica.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-03',
      title: 'Avaliação Ultrassonográfica da Uretra Proximal em Macho Felino',
      url: '/consulta-vet/cistite-idiopatica-felina/ultrassom-uretra-proximal-felina.jpg',
      legend:
        'Transição do colo vesical para uretra proximal em macho felino (Wikimedia Commons, CC BY-SA 4.0):\n' +
        '- Inspeção cuidadosa para exclusão de cálculos uretrais radiotransparentes.\n' +
        '- Avaliação de espessamento e edema parietal que predispõem a espasmo funcional e obstrução mecânica.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-04',
      title: 'Microscopia de Sedimento Urinário: Cristais de Estruvita em Tampa de Caixão',
      url: '/consulta-vet/cistite-idiopatica-felina/sedimento-urinario-cristais-estruvita-felino.jpg',
      legend:
        'Sedimento urinário fresco corado evidenciando cristais de estruvita (Wikimedia Commons, CC BY-SA 4.0):\n' +
        '- Morfologia prismática clássica em tampa de caixão (fosfato tricomposto de amônio e magnésio).\n' +
        '- Achado incidental frequente em urinas densas de felinos; não deve ser confundido isoladamente com urolitíase.',
      source: 'Wikimedia Commons (CC BY-SA 4.0)'
    },
    {
      id: 'fig-cif-05',
      title: 'Desobstrução Uretral e Manutenção de Cateterismo em Sistema Coletor Fechado',
      url: '/consulta-vet/cistite-idiopatica-felina/cateterizacao-uretral-desobstrucao-felina.jpg',
      legend:
        'Cateterismo uretral em macho felino pós-desobstrução (Wikimedia Commons, CC BY-SA 4.0):\n' +
        '- Manutenção com cateter flexível acoplado obrigatoriamente a sistema coletor estéril fechado com bolsa graduada.\n' +
        '- Monitorização fidedigna do débito urinário na diurese pós-obstrutiva e prevenção de infecção hospitalar bacteriana ascendente.',
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
      description:
        'Primeiro procedimento obrigatório e inegociável na abordagem do felino com LUTS:\n' +
        '- Palpação delicada da região caudal do abdômen:\n' +
        '  - Se a bexiga urinária for palpada moderada a excessivamente distendida, firme, turgida e dolorosa em gato com histórico de estrangúria: diagnosticar Obstrução Uretral de emergência e transferir imediatamente para estabilização hemodinâmica em UTI.\n' +
        '- Conduta na bexiga pequena ou compressível:\n' +
        '  - Se a bexiga estiver pequena, vazia ou facilmente compressível: classificar provisoriamente como LUTS não obstrutivo e prosseguir na investigação etiológica.',
      isGoldStandard: false
    },
    {
      stepNumber: 2,
      title: 'Anamnese Comportamental e Ambiental Detalhada (Auditoria do Território)',
      description:
        'Investigação profunda das rotinas e do ambiente domiciliar do paciente:\n' +
        '- Censitamento e distribuição de recursos:\n' +
        '  - Número total de gatos residentes, quantidade e dimensões das caixas sanitárias, tipo de substrato de areia utilizado e frequência de higienização.\n' +
        '- Rastreio de eventos provocadores e estressores:\n' +
        '  - Histórico de reformas, visitantes, novos animais na vizinhança ou mudanças climáticas bruscas.\n' +
        '- Dinâmica multicat e comorbidades sistêmicas:\n' +
        '  - Rastrear a existência de bloqueios silenciosos de recursos vitais entre animais em casas multicat e pesquisar sinais extra-urinários de Síndrome de Pandora.',
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: 'Urinálise Completa com Amostra Fresca e Mensuração da Densidade por Refratometria',
      description:
        'Exame laboratorial vital na rotina de LUTS felino:\n' +
        '- Densidade urinária (USG) por refratometria:\n' +
        '  - Deve ser quantificada obrigatoriamente por refratômetro antes de qualquer fluidoterapia (frequentemente USG > 1,040 a 1,050 em gatos jovens com CIF).\n' +
        '- Análise físico-química e microscopia do sedimento fresco:\n' +
        '  - Amostra analisada idealmente em até 60 minutos após a coleta para evitar precipitação artefatual de cristais induzida pela refrigeração.\n' +
        '  - Revela hematúria e piúria assépticas por inflamação neurogênica.\n' +
        '- Interpretação clínica da cristalúria:\n' +
        '  - A presença de cristalúria de estruvita deve ser interpretada com sobriedade clínica, pois não comprova urolitíase.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Exame Radiográfico Abdominal Total Incluindo Todo o Trajeto Uretral em Machos',
      description:
        'Exame de imagem essencial para exclusão de urolitíase radiopaca:\n' +
        '- Pesquisa de urólitos radiopacos:\n' +
        '  - Detecção sensível de cálculos de estruvita e oxalato de cálcio.\n' +
        '- Posicionamento radiográfico estrito:\n' +
        '  - A projeção radiográfica lateral do abdômen caudal deve abranger obrigatoriamente toda a trajetória anatômica da uretra peniana do macho, com membros pélvicos tracionados cranialmente, evitando que uretrólitos impactados na extremidade peniana passem despercebidos em exames restritos à cavidade peritoneal.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Ultrassonografia Abdominal e Urológica Completa (Padrão Ouro de Exclusão Estrutural)',
      description:
        'Método de imagem padrão ouro confirmatório por exclusão na rotina clínica contemporânea (iCatCare 2025):\n' +
        '- Avaliação da arquitetura e espessura vesical:\n' +
        '  - Permite inspecionar a espessura e a integridade da parede vesical (frequentemente espessada de forma difusa na CIF).\n' +
        '- Exclusão metódica de diagnósticos diferenciais estruturais:\n' +
        '  - Descartar massas uroteliais proliferativas, pólipos inflamatórios, coágulos sanguíneos aderidos e identificar urólitos radiotransparentes de urato de amônio não visualizáveis ao raio-X simples.\n' +
        '- Interpretação no contexto da CIF:\n' +
        '  - Uma bexiga ultrassonograficamente normal não descarta CIF, pois a síndrome é primariamente funcional e neuroendócrina.',
      isGoldStandard: true
    },
    {
      stepNumber: 6,
      title: 'Urocultura Quantitativa por Cistocentese em Pacientes com Fatores de Risco',
      description:
        'Realização de cistocentese estéril guiada por ultrassom antes da introdução de qualquer antimicrobiano:\n' +
        '- Fatores de risco predisponentes à ITU bacteriana verdadeira:\n' +
        '  - Felinos com idade superior a 10 anos ou com densidade urinária reduzida (USG < 1,025).\n' +
        '- Comorbidades metabólicas e procedimentos prévios:\n' +
        '  - Portadores de Doença Renal Crônica, Diabetes Mellitus ou Hipertireoidismo, histórico recente de cateterização uretral e quadros clínicos com persistência de LUTS por mais de 7 dias.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria:
      'Metas prioritárias no atendimento clínico da CIF:\n' +
      '- Forma não obstrutiva aguda:\n' +
      '  - Alívio imediato da dor visceral profunda através de analgesia farmacológica multimodal e redução rápida do estresse no ambiente clínico e domiciliar.\n' +
      '- Forma obstrutiva emergencial (UO):\n' +
      '  - Estabilização hemodinâmica emergencial (correção de hipercalemia e arritmias) seguida da desobstrução uretral mecânica com hidropropulsão delicada e descompressão aliviadora.',

    modificacaoAmbientalMultimodalMEMO:
      'Diretrizes internacionais iCatCare 2025 e revisão sistemática de Macleod et al. (2025) — Princípios validados de Buffington et al. (2006):\n' +
      '- Caixas sanitárias (Regra de Ouro N+1):\n' +
      '  - Uma caixa para cada gato residente no domicílio mais uma caixa adicional (N+1).\n' +
      '  - Recipientes amplos (comprimento de pelo menos 1,5 vez o tamanho do gato), sem tampa, posicionados em cômodos silenciosos e independentes em cada andar da residência.\n' +
      '- Substrato de areia e higienização:\n' +
      '  - Preferência comprovada de felinos por areia fina, arenosa, aglomerante e absolutamente sem fragrâncias ou desodorizantes químicos.\n' +
      '  - Remoção de excretas duas vezes ao dia e higienização integral a cada 1 a 2 semanas com sabão neutro inodoro.\n' +
      '- Separação espacial de recursos vitais:\n' +
      '  - Comedouros, bebedouros, caixas sanitárias e áreas de repouso jamais devem ficar alinhados lado a lado.\n' +
      '  - Em casas multicat, devem ser distribuídos em locais afastados para eliminar pontos de bloqueio visual velado por gatos dominantes.\n' +
      '- Enriquecimento tridimensional e sensorial:\n' +
      '  - Prateleiras verticais, arranhadores, áreas elevadas de vigília, tocas de refúgio seguras e brinquedos que simulem caça e forrageamento (puzzle feeders).\n' +
      '- Previsibilidade de rotina:\n' +
      '  - Manter horários constantes de alimentação, interações humanas calmas e previsíveis e evitar punições ou repreensões por periúria.',

    manejoHidricoENutricional:
      'Estratégias nutricionais e hidratação sustentada (Macleod et al., 2025):\n' +
      '- Benefício biológico da diluição urinária:\n' +
      '  - Reduz a concentração osmolar de solutos irritantes e íons potássio em contato com o urotélio sensibilizado e favorece micções mais volumosas e menos dolorosas.\n' +
      '- Introdução progressiva de alimento úmido:\n' +
      '  - Uso diário de sachês ou latas completos, visando atingir uma densidade urinária alvo entre 1,025 e 1,035.\n' +
      '- Estímulo à hidratação ativa:\n' +
      '  - Fontes de água circulante, múltiplos recipientes largos de cerâmica ou vidro espalhados pela casa e adição de caldos de carne caseiros inodoros sem cebola ou temperos.\n' +
      '- Regra de ouro da transição alimentar:\n' +
      '  - Jamais impor mudanças abruptas de ração em gatos estressados; a neofobia felina e a aversão alimentar induzidas por trocas súbitas constituem graves eventos estressores capazes de deflagrar novas crises de CIF.\n' +
      '- Avaliação de dietas terapêuticas urinárias:\n' +
      '  - Dietas veterinárias multimodais (controle mineral, ômega-3, L-triptofano e alfa-casozepina); considerar criticamente que acidificação isolada não trata a causa neuroendócrina primária da CIF.',

    analgesiaFarmacologica:
      'Protocolos analgésicos na crise dolorosa aguda (iCatCare 2025; Feline Emergency and Critical Care, 2a ed., Cap. 22):\n' +
      '- Buprenorfina transmucosa:\n' +
      '  - Opioide agonista parcial mu de excelente absorção pela mucosa oral felina, na dose de 0,005 a 0,02 mg/kg por via transmucosa oral (sublingual) a cada 8 a 12 horas durante 5 a 7 dias.\n' +
      '- Gabapentina oral:\n' +
      '  - Modulador de canais de cálcio voltagem-dependentes que atenua a sensibilização central e reduz a ansiedade de transporte e admissão, na dose de 5 a 10 mg/kg por via oral a cada 8 a 12 horas.\n' +
      '- Esclarecimento ético ao tutor:\n' +
      '  - A analgesia visa prioritariamente ao alívio do sofrimento ético imediato na crise; não há evidência de que analgésicos previnam recorrências futuras, sendo o MEMO o pilar preventivo basilar.',

    analiseCriticaDeFarmacosControversos:
      'Desmistificação de condutas farmacológicas com base em evidências (Taylor et al., 2025; Macleod et al., 2025):\n' +
      '- Veto ao uso empírico de antibióticos:\n' +
      '  - A administração empírica de antimicrobianos (amoxicilina-clavulanato, enrofloxacina, cefovecina) para urina com sangue é formalmente contraindicada na ausência de urocultura positiva, contribuindo para seleção de resistência microbiana e não apresentando efeito na CIF estéril.\n' +
      '- Ineficácia de Anti-inflamatórios Não Esteroidais (AINEs):\n' +
      '  - Meloxicam ou robenacoxib não demonstraram benefício clínico específico superior ao placebo na duração dos sinais da CIF nem reduziram reobstrução (estudo de Dorsch et al.); contraindicados em hipovolemia, desidratação ou azotemia pelo risco de lesão renal aguda isquêmica.\n' +
      '- Contraindicação de corticosteroides:\n' +
      '  - Prednisolona não demonstrou eficácia clínica na CIF e predispõe a infecções secundárias e intolerância à glicose.\n' +
      '- Ineficácia de glicosaminoglicanos (GAGs orais):\n' +
      '  - Ensaios clínicos duplo-cegos randomizados (Gunn-Moore & Shenoy, 2004) demonstraram que a suplementação de glicosaminoglicano (GAG, glucosamina e pentosan polissulfato) não superou o placebo na redução de recorrências.\n' +
      '- Amitriptilina no episódio agudo:\n' +
      '  - Ensaio randomizado clássico de Kruger et al. (2003) e estudos de Kraijer et al. (2003) comprovaram que amitriptilina aguda (5 mg/gato/dia por 7 dias) não reduziu hematúria/polaquiúria e dobrou a taxa de recorrência precoce nos primeiros meses, sendo contraindicada para crises agudas.\n' +
      '  - Seu papel restringe-se como droga de terceira linha na CIF crônica refratária ao MEMO (Plumb\'s 10a ed.: 2,5 a 12,5 mg/gato VO q24h à noite, sob desmame lento e monitoramento de retenção urinária anticolinérgica).\n' +
      '- Prazosina e bloqueadores alfa-1:\n' +
      '  - Ensaio clínico prospectivo duplo-cego randomizado de Reineke et al. (2017) comprovou que prazosina (0,25 mg/gato q12h) não reduziu taxas de reobstrução uretral hospitalar em 1 ou 6 meses; o consenso iCatCare 2025 não mais recomenda seu uso rotineiro profilático pós-desobstrução.',

    evidenciasEmergentes2026:
      'Inovações terapêuticas e evidências científicas contemporâneas (2026):\n' +
      '- Radioterapia de Baixa Dose em Casos Refratários:\n' +
      '  - Estudo de Kendall et al. (JVIM, 2026) avaliou em prova de conceito 15 gatos machos com CIF grave recorrente e histórico de UO refratários a manejo convencional, submetidos a fração única de 6 Gy envolvendo o trato urinário inferior.\n' +
      '  - Observou-se melhora acentuada nos escores clínicos em 13 de 14 felinos acompanhados (93%), com mediana de sobrevida livre de 548 dias, configurando opção promissora para casos extremos candidatos à eutanásia.\n' +
      '- Suplementação Multinutriente em RCT Piloto:\n' +
      '  - Estudo de Chen & Huang (Scientific Reports, publicado em 14 de setembro de 2026) demonstrou em ensaio prospectivo randomizado duplo-cego (n=30 machos com CIF sob MEMO) que a suplementação multinutriente antioxidante e moduladora reduziu a taxa de recorrência em 6 meses (13,3% vs 40%, P=0,05) e prolongou o intervalo livre de sinais clínicos, apontando potencial adjuvante sob validação.',

    protocoloDeDesobstrucaoECateterizacaoUretral:
      'Manejo emergencial do paciente macho com CIF obstrutiva (Feline Emergency and Critical Care, 2a ed., Cap. 22; BSAVA Procedures, 3a ed., pp. 292-294):\n' +
      '- Estabilização metabólica primária:\n' +
      '  - Gluconato de cálcio a 10% IV (0,5 a 1,5 mL/kg lentamente sob monitorização de ECG) se houver arritmias ou hipercalemia (K+ > 7,0 mEq/L) e fluidoterapia balanceada de reposição.\n' +
      '- Cistocentese descompressiva aliviadora prévia:\n' +
      '  - Punção com agulha fina (22G ou 23G) acoplada a extensor e torneira de três vias, reduzindo a pressão intravesical e facilitando a desobstrução retrógrada subsequente.\n' +
      '- Anestesia balanceada e hidropropulsão atraumática:\n' +
      '  - Sedação e analgesia profundas com relaxamento muscular; hidropropulsão suave com solução salina estéril morna utilizando cateter flexível (Milacath ou Tomcat sem ponta rígida), evitando traumas ou lacerações na uretra peniana.\n' +
      '- Manutenção de cateter permanente em sistema fechado:\n' +
      '  - Sonda uretral maleável (3,5 Fr) acoplada obrigatoriamente a sistema coletor fechado estéril com bolsa graduada por 24 a 48 horas para quantificar a diurese pós-obstrutiva e prevenir infecção bacteriana hospitalar ascendente.'
  },

  complications: {
    obstrucaoUretralAgudaEArritmiaFatal:
      'Obstrução Uretral Aguda (UO) e arritmias hipercalêmicas fatais:\n' +
      '- Oclusão mecânica da uretra peniana por tampões mucoproteicos inflamatórios e espasmo muscular reflexo em machos.\n' +
      '- Evolução rápida para azotemia pós-renal grave, acidose metabólica descompensada, hipercalemia severa, fibrilação ventricular e parada cardíaca se não aliviada em regime de urgência.',

    atoniaVesicalDoDetrusorPorSobredistensao:
      'Atonia miogênica do detrusor por estiramento mecânico excessivo:\n' +
      '- Rompimento funcional das junções comunicantes das miofibrilas do músculo detrusor durante a retenção urinária prolongada.\n' +
      '- Resulta em bexiga flácida arrefléxica de esvaziamento ineficaz, demandando cateterismo intermitente ou compressão manual suave e suporte farmacológico com betanecol.',

    iatrogeniaUretralERupturaDeBexiga:
      'Lesões iatrogênicas por manobras mecânicas intempestivas:\n' +
      '- Perfuração e laceração uretral decorrentes de tentativas forçadas de sondagem sem anestesia ou com sondas rígidas inadequadas.\n' +
      '- Risco de estenose uretral cicatricial secundária e extravasamento de urina para o tecido subcutâneo perineal ou uroabdome por sobrepressão hidrostática.',

    deterioracaoDaQualidadeDeVidaEEutanasia:
      'Impacto no vínculo tutor-felino e risco de eutanásia por conveniência:\n' +
      '- Recidivas frequentes de dor visceral, periúria em locais inadequados da residência e frustração financeira/emocional do tutor.\n' +
      '- Constitui uma das principais causas históricas de abandono e eutanásia em felinos domésticos quando a modificação ambiental (MEMO) não é implementada adequadamente.'
  },

  prevention: {
    cincoPilaresDoAmbienteFelinoSeguro:
      'Prevenção fundamentada nos cinco pilares do ambiente felino saudável (ISFM / iCatCare):\n' +
      '- 1. Prover refúgio seguro: áreas elevadas de vigília, prateleiras e tocas protegidas onde o felino não seja perturbado.\n' +
      '- 2. Múltiplos recursos separados: estações independentes de comida, água, caixas sanitárias e áreas de repouso.\n' +
      '- 3. Brincadeiras e forrageamento: oportunidades diárias de comportamento predatório simulado e brinquedos de enriquecimento cognitivo.\n' +
      '- 4. Interações humanas positivas: contato calmo, previsível e respeitoso à iniciativa do felino, sem coações.\n' +
      '- 5. Respeito ao olfato felino: preservação dos odores familiares e marcas químicas faciais, evitando fragrâncias fortes e desinfetantes agressivos.',

    regrasDeOuroDasCaixasSanitarias:
      'Manejo ideal das caixas sanitárias:\n' +
      '- Proporção de bandejas sanitárias na regra de ouro N+1 (uma caixa para cada gato residente mais uma adicional).\n' +
      '- Distribuição em cômodos distintos e silenciosos, com caixas amplas abertas e substrato de areia fina inodora limpo diariamente com pá vazada.',

    hidratacaoEAlimentacaoUmidaContinua:
      'Hidratação e nutrição preventiva contínua:\n' +
      '- Fornecer alimento úmido em temperatura morna diariamente associado a múltiplas opções de bebedouros de boca larga (evitando o toque das vibrissas nas bordas) e fontes de água corrente limpa mantidas distantes do comedouro e das caixas de areia.',

    manutencaoDaPrevisibilidadeEControleSocial:
      'Estabilidade na rotina e controle social:\n' +
      '- Manter rotinas estáveis de alimentação e limpeza e manejar cuidadosamente mudanças no domicílio (reformas, introdução gradual de novos animais e uso de feromônios faciais sintéticos difusores em períodos de transição).'
  },

  references: [
    {
      id: 'ref-taylor-2025',
      citation: 'Taylor S, et al. 2025 iCatCare consensus guidelines on the diagnosis and management of lower urinary tract diseases in cats. Journal of Feline Medicine and Surgery, 2025;27(2):1098612X241309176. DOI: 10.1177/1098612X241309176.'
    },
    {
      id: 'ref-macleod-2025',
      citation:
        'Macleod B, et al. Understanding the current evidence base for the commonly recommended management strategies for recurrent feline idiopathic cystitis: a systematic review:\n' +
        '- New Zealand Veterinary Journal, 2025;73(4):233-245.\n' +
        '- DOI: 10.1080/00480169.2025.2477542.'
    },
    {
      id: 'ref-buffington-2006',
      citation:
        'Buffington CAT, Westropp JL, Chew DJ, Bolus RR. Clinical evaluation of multimodal environmental modification (MEMO) in the management of cats with idiopathic cystitis:\n' +
        '- Journal of Feline Medicine and Surgery, 2006;8(4):261-268.\n' +
        '- DOI: 10.1016/j.jfms.2006.02.002.'
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
      citation:
        'Reineke EL, et al. Evaluation of prazosin for prevention of recurrent urethral obstruction in male cats:\n' +
        '- A prospective, randomized, double-blind, placebo-controlled clinical trial.\n' +
        '- Journal of the American Veterinary Medical Association, 2017;251(8):926-931.'
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
      citation:
        'Chen WJ, Huang KW. A randomized placebo-controlled study evaluating the efficacy of a multi-nutrient supplement on lower urinary tract health in male cats with feline idiopathic cystitis:\n' +
        '- Scientific Reports, 2026;16:70935.\n' +
        '- DOI: 10.1038/s41598-026-70935-2.'
    },
    {
      id: 'ref-nelson-couto-6ed',
      citation:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier, 2020:\n' +
        '- Cap. 44: Obstructive and Nonobstructive Feline Idiopathic Cystitis, pp. 724-729.\n' +
        '- Cap. 42: Bacterial Cystitis, pp. 704-712.\n' +
        '- Cap. 45: Disorders of Micturition, pp. 730-737.'
    },
    {
      id: 'ref-bsava-nephrology-3ed',
      citation:
        'Elliott J, Grauer GF, Westropp JL. BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. Gloucester: British Small Animal Veterinary Association, 2017:\n' +
        '- Cap. 28: Management of non-obstructive idiopathic/interstitial cystitis in cats, pp. 317-327.\n' +
        '- Cap. 3: Control of micturition, pp. 24-36.'
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
