import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Linfoma cutâneo em cães e gatos — síntese clínica e editorial Vetius.
 * Padrão editorial aprofundado com biologia tumoral, imunofenotipagem,
 * distinção epiteliotrópico (eCTCL) vs não epiteliotrópico (NECL),
 * variante de dermatite citotóxica de interface (Smith et al., 2026),
 * estudos seminais (Chan et al. 2018, Risbon et al. 2006, Ramos et al. 2022,
 * Vlodaver et al. 2024, Siewert et al. 2022, Roccabianca et al. 2016, Burr et al. 2014,
 * Lee et al. 2026, Deveau et al. 2019), protocolos da literatura e do acervo
 * (Withrow & MacEwen 6ª ed., Nelson & Couto 6ª ed., BSAVA Oncology 3ª ed.).
 * Texto 100% limpo, sem marcadores de asteriscos, com 7 figuras integradas.
 */

export const linfomaCutaneoRecord: DiseaseRecord = {
  id: 'disease-linfoma-cutaneo-caes-gatos',
  slug: 'linfoma-cutaneo-caes-gatos',
  title: 'Linfoma cutâneo',
  subtitle: 'Neoplasias linfoides primárias epiteliotrópicas (eCTCL) e não epiteliotrópicas (NECL) da pele em cães e gatos',
  synonyms: [
    'Linfoma cutâneo epiteliotrópico',
    'eCTCL',
    'Micose fungoide',
    'Mycosis fungoides',
    'Síndrome de Sézary',
    'Reticulose pagetoide',
    'Linfoma cutâneo não epiteliotrópico',
    'NECL',
    'Linfoma epiteliotrópico canino',
    'Linfoma cutâneo felino',
    'Cutaneous lymphoma',
  ],
  species: ['dog', 'cat'],
  category: 'oncologia',
  categories: ['dermatologia', 'clinica-medica'],
  tags: [
    'Linfoma cutâneo',
    'eCTCL',
    'Micose fungoide',
    'Lomustina',
    'CCNU',
    'PARR',
    'CD3',
    'Sézary',
    'Dermatite de interface',
    'Oncologia',
    'Dermatologia',
  ],
  isPublished: true,
  plainLanguage: DISEASE_PLAIN_LANGUAGE['linfoma-cutaneo-caes-gatos'],
  quickSummary:
    'O linfoma cutâneo compreende um grupo heterogêneo de neoplasias linfoides malignas com acometimento primário da pele, anexos, subcutâneo e junções mucocutâneas:\n\n' +
    '- Classificação biológica primordial: divisão em linfoma epiteliotrópico (ECL/eCTCL, primariamente linfócitos T CD3+ e CD8+ citotóxicos, incluindo micose fungoide, reticulose pagetoide e síndrome de Sézary) e não epiteliotrópico (NECL, linhagem T ou B, restrito à derme profunda e hipoderme).\n' +
    '- Evolução clínica e mimetismos: no cão, o eCTCL progride de descamação, alopecia e prurido para placas eritematosas, despigmentação mucocutânea e massas ulceradas (Withrow & MacEwen, 6ª ed.); a variante de Smith et al. (2026) cursa com intensa dermatite citotóxica de interface e apoptose de queratinócitos, mimetizando eritema multiforme e lúpus.\n' +
    '- Diagnóstico padrão ouro: biópsia cutânea múltipla representativa (punch 6 a 8 mm de pelo menos 3 lesões ativas) com histopatologia, imuno-histoquímica (CD3, CD20/CD79a) e PARR criterioso.\n' +
    '- Distribuição anatômica e prognóstico: em cães, doença solitária admite controle cirúrgico ou radioterápico prolongado; doença difusa cutânea confere sobrevida mediana de 130 dias versus 491 dias na forma restrita mucocutânea (Chan et al., 2018).\n' +
    '- Terapêutica sistêmica e particularidades: lomustina (CCNU 60 mg/m2 a cada 3 semanas) oferece resposta objetiva de 83% com duração mediana de 94 dias (Risbon et al., 2006); em felinos, destacam-se apresentações como linfoma tarsal, lesões em sítio de injeção e distinção de linfocitose cutânea indolente (mediana de 1080 dias).',
  quickDecisionStrip: [
    'Heterogeneidade biológica: linfoma cutâneo não é uma doença única; epiteliotropismo e linhagem T versus B mudam o tratamento.',
    'Prurido não exclui neoplasia: quebra de barreira cutânea e piodermite secundária causam prurido intenso e resposta enganosa ao corticoide.',
    'Dermatite de interface citotóxica: a variante de Smith et al. (2026) mimetiza perfeitamente eritema multiforme e lúpus eritematoso.',
    'Padrão ouro é biópsia representativa: coletar pelo menos 3 lesões primárias com punch de 6 a 8 mm, evitando apenas o centro necrótico.',
    'Suspender corticoide antes da biópsia: idealmente interromper por 2 a 3 semanas para não mascarar a celularidade neoplásica por apoptose.',
    'Imuno-histoquímica combinada: 97% dos eCTCL caninos são CD3+; atentar que até 54% dos clones T caninos exibem reatividade cruzada para CD20.',
    'PARR não é atalho diagnóstico: clonalidade reforça suspeita mas ocorre em inflamações intensas; policlonalidade não exclui linfoma.',
    'Localização guia sobrevida: doença cutânea difusa tem sobrevida mediana de 130 dias vs 491 dias em formas mucocutâneas (Chan et al., 2018).',
    'CCNU é a base sistêmica canina: taxa de resposta de 83% com mediana de 94 dias; exige monitoramento de ALT e neutropenia a cada ciclo.',
    'Particularidades felinas: atentar para linfoma tarsal, lesões associadas a sítios de injeção e diferenciação de linfocitose cutânea indolente.',
  ],
  quickSummaryRich: {
    lead:
      'O linfoma cutâneo não deve ser encarado como uma doença única, mas como um espectro de neoplasias linfoides com comportamentos e desfechos distintos:\n\n' +
      '- Forma epiteliotrópica (eCTCL): tipicamente de células T citotóxicas (CD3+, CD8+), invade a epiderme e anexos, manifestando eritema, descamação, despigmentação e placas que mimetizam dermatites alérgicas por meses.\n' +
      '- Diagnóstico definitivo: fundamenta-se em biópsia cutânea representativa com histopatologia e imunofenotipagem combinada, associada ao PARR quando indicado.\n' +
      '- Estratificação terapêutica: controle local com cirurgia ou radioterapia para lesões solitárias e quimioterapia com lomustina (CCNU) ou retinoides na doença disseminada.',
    leadHighlights: [
      'não deve ser encarado como uma doença única',
      'linfoma epiteliotrópico (eCTCL)',
      'mimetizam dermatites alérgicas por meses',
      'biópsia cutânea representativa',
      'lomustina (CCNU)',
    ],
    pillars: [
      {
        title: 'Epiteliotrópico vs Não Epiteliotrópico',
        body:
          'A distinção fundamental entre as neoplasias é histogenética e anatômica:\n\n' +
          '- Linfoma epiteliotrópico (eCTCL): retém receptores de homing cutâneo e infiltra a epiderme e anexos (linfócitos T CD3+, CD8+).\n' +
          '- Linfoma não epiteliotrópico (NECL): infiltra a derme profunda e o subcutâneo, de linhagem T ou B, formando nódulos com epiderme preservada.',
        highlights: ['eCTCL', 'receptores de homing cutâneo', 'linfócitos T CD3+, CD8+', 'NECL'],
      },
      {
        title: 'Variante Citotóxica de Interface (2026)',
        body:
          'Smith et al. (2026) caracterizaram relevante apresentação patológica no eCTCL canino:\n\n' +
          '- Características histológicas: presença de satelitose linfocitária, numerosos queratinócitos apoptóticos e exuberante dermatite citotóxica de interface.\n' +
          '- Implicação prática: mimetiza eritema multiforme, NET e lúpus, comprovando que padrão de interface na lâmina não afasta linfoma.',
        highlights: ['Smith et al. (2026)', 'satelitose linfocitária', 'queratinócitos apoptóticos', 'dermatite de interface'],
      },
      {
        title: 'PARR e Limites da Clonabilidade',
        body:
          'A PCR para rearranjo do receptor de antígeno (PARR) requer interpretação integrada:\n\n' +
          '- Utilidade e limites: demonstra monoclonalidade clonal, mas não substitui a histopatologia de rotina.\n' +
          '- Armadilhas diagnósticas: expansões pseudoclonais ocorrem em inflamações graves, enquanto resultados policlonais podem refletir baixa celularidade neoplásica.',
        highlights: ['PARR', 'não substitui a histopatologia', 'pseudoclonais', 'policlonais'],
      },
      {
        title: 'Conduta Terapêutica Estratificada',
        body:
          'A conduta clínica é estritamente norteada pelo estadiamento anatômico:\n\n' +
          '- Doença solitária: cirurgia com margens amplas ou radioterapia proporcionam controle local prolongado e excelente sobrevida.\n' +
          '- Doença multifocal: lomustina (CCNU) constitui a droga de escolha canina (ORR 83%; Risbon et al., 2006), com retinoides e verdinexor como terapias complementares.',
        highlights: ['doença solitária ou difusa', 'cirurgia', 'radioterapia', 'lomustina (CCNU)', 'Risbon et al., 2006'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico sistemático da suspeita de linfoma cutâneo',
      steps: [
        {
          label: '1. Reconhecimento clínico e suspensão de corticoides',
          timing: 'Consulta inicial / Triagem',
          detail:
            'Reconhecimento semiológico e preparo para amostragem:\n' +
            '- Sinais de alerta: dermatopatias crônicas refratárias, despigmentação mucocutânea (lábios, plano nasal) e placas eritematosas em idosos.\n' +
            '- Manejo farmacológico: suspender corticoides tópicos e sistêmicos por 2 a 3 semanas antes da biópsia para evitar apoptose tumoral e falsos negativos.',
        },
        {
          label: '2. Triagem dermatológica e exclusão de mimetizadores',
          timing: 'Primeiras 24-48 horas',
          detail:
            'Exclusão de ectoparasitoses e piodermites secundárias:\n' +
            '- Triagem dermatológica: raspado cutâneo profundo e citologia superficial por fita/imprint para afastar sarnas, Malassezia e Staphylococcus.\n' +
            '- Controle da quebra de barreira: tratar infecções secundárias antes de emitir diagnóstico oncológico definitivo.',
        },
        {
          label: '3. Biópsia cutânea múltipla e representativa (Padrão Ouro)',
          timing: 'Procedimento cirúrgico ambulatorial',
          detail:
            'Técnica padronizada de biópsia cutânea múltipla:\n' +
            '- Amostragem: colher de 3 a 5 fragmentos teciduais de lesões primárias ativas (punch de 6 a 8 mm ou incisional em cunha).\n' +
            '- Cuidados cirúrgicos: evitar áreas centrais de necrose e manipulação traumática com pinças, apreendendo a peça exclusivamente pelo subcutâneo.',
        },
        {
          label: '4. Histopatologia e Imuno-histoquímica (CD3 e CD20)',
          timing: 'Laboratório de patologia veterinária',
          detail:
            'Avaliação histopatológica e perfil imuno-histoquímico:\n' +
            '- Padrão arquitetural: avaliação de epiteliotropismo (exocitose, microabscessos de Pautrier) e invasão folicular versus infiltração dérmica profunda.\n' +
            '- Painel imune: CD3 (células T) e CD20/CD79a (células B); atentar para marcação aberrante de CD20 em até 54% dos linfomas T caninos.',
        },
        {
          label: '5. Estadiamento clínico e rastreio de doença sistêmica',
          timing: 'Pré-tratamento oncológico',
          detail:
            'Estadiamento oncológico e rastreio de envolvimento visceral:\n' +
            '- Hematologia e bioquímica: hemograma com esfregaço manual (células de Sézary), ALT, ALP, albumina (pré-CCNU) e cálcio total/ionizado.\n' +
            '- Avaliação sistêmica: citologia de linfonodos regionais, radiografias torácicas em 3 projeções e ultrassonografia abdominal completa.',
        },
      ],
    },
  },
  etiology: {
    definicaoEClassificacao:
      'O linfoma cutâneo consiste em proliferação clonal maligna de linfócitos na pele, anexos e junções mucocutâneas, categorizado em dois eixos biológicos (Withrow & MacEwen, 6ª ed.; Nelson & Couto, 6ª ed.):\n\n' +
      '- Linfoma Cutâneo Epiteliotrópico (ECL ou eCTCL): tropismo preferencial pelo epitélio epidérmico e anexos foliculares/glandulares, derivando quase exclusivamente de linfócitos T (CD3+) em cães.\n' +
      '- Subtipos clássicos de eCTCL: compreende Micose Fungoide (progressão crônica de máculas a placas e nódulos ulcerados), Reticulose Pagetoide (infiltração intraepidérmica estrita) e Síndrome de Sézary (variante leucêmica com eritrodermia generalizada e linfócitos cerebriformes circulantes).\n' +
      '- Linfoma Cutâneo Não Epiteliotrópico (NECL): proliferação infiltrativa concentrada na derme média, derme profunda e subcutâneo com epiderme poupada, de linhagem T ou B (células ricas em imunoblastos ou centroblastos).',
    diferencaFundamentalTabela: {
      kind: 'clinicalTable',
      caption: 'Tabela comparativa fundamental: Linfoma Epiteliotrópico (eCTCL) versus Não Epiteliotrópico (NECL)',
      headers: [
        'Parâmetro Biológico',
        'Linfoma Epiteliotrópico (eCTCL)',
        'Linfoma Não Epiteliotrópico (NECL)',
      ],
      rows: [
        [
          'Sítio histológico preferencial',
          'Epiderme e anexos foliculares/glandulares, com ou sem derme superficial',
          'Derme média e profunda, junção dermo-subcutânea e hipoderme',
        ],
        [
          'Linhagem predominante no cão',
          'Linfócitos T (praticamente 100% CD3+, frequentemente CD8+ citotóxicos)',
          'Linfócitos T ou Linfócitos B (CD79a+ / CD20+)',
        ],
        [
          'Ocorrência de imunofenótipo B',
          'Excepcional e controversa',
          'Possível e frequente em apresentações nodulares',
        ],
        [
          'Morfologia clínica clássica',
          'Eritema, descamação furfurácea, alopecia, placas eritematosas, despigmentação, erosões e úlceras',
          'Nódulos dérmicos firmes, placas dérmicas profundas ou massas subcutâneas com epiderme íntegra',
        ],
        [
          'Comprometimento mucocutâneo',
          'Altamente característico (lábios, plano nasal, gengiva, pálpebras, períneo)',
          'Incomum ou secundário à invasão por contiguidade',
        ],
        [
          'Intensidade do prurido',
          'Frequentemente moderado a severo (secundário à quebra de barreira e infecções)',
          'Variável, habitualmente ausente a discreto',
        ],
        [
          'Evolução biológica típica',
          'Progressão multifocal difusa ao longo de meses (mácula para placa e nódulo)',
          'Extremamente variável; muitas vezes comportamento de massa sólida ou invasão rápida',
        ],
        [
          'Principal armadilha diagnóstica',
          'Confusão com dermatite atópica, alergia alimentar, piodermite ou doenças autoimunes',
          'Confusão com mastocitoma, histiocitoma, paniculite infecciosa ou sarcoma dérmico',
        ],
      ],
    },
    fisiologiaImunidadeCutanea:
      'A imunologia cutânea especializada (SALT — Skin-Associated Lymphoid Tissue) rege a fisiopatologia do tropismo epitelial:\n\n' +
      '- Maquinário de homing tecidual: linfócitos T expressam antígeno linfocitário cutâneo (CLA) e receptores de quimiocinas (CCR4, CCR10) que interagem com ligantes epidérmicos e endoteliais (CCL17, CCL27).\n' +
      '- Preservação no clone neoplásico: no eCTCL, o clone T preserva esse maquinário e infiltra seletivamente a epiderme e folículos pilosos.\n' +
      '- Fenótipo citotóxico (CD8+): mais de 95% dos casos caninos exibem perfil CD3+ e CD8+, provocando agressão citolítica direta aos queratinócitos, apoptose prematura e perda severa da barreira cutânea.',
    varianteCitotoxicaInterface2026:
      'Atualização diagnóstica seminal descrita por Smith et al. (2026) sobre variante canina agressiva de eCTCL:\n\n' +
      '- Padrão histopatológico: presença de dermatite citotóxica de interface com intensa satelitose linfocitária CD3+ periqueratinocítica e apoptose de queratinócitos basais maciça.\n' +
      '- Confirmação clonal: monoclonalidade comprovada por ensaio de PARR para receptor de células T em todos os pacientes avaliados.\n' +
      '- Mimetizadores imunomediados: simula microscopicamente eritema multiforme (EM), necrólise epidérmica tóxica (TEN) e lúpus cutâneo; dermatite de interface na biópsia jamais exclui eCTCL.',
  },
  epidemiology: {
    distribuicaoCanina:
      'Aspectos epidemiológicos e demográficos do linfoma cutâneo na espécie canina:\n\n' +
      '- Prevalência: representa < 1% dos tumores cutâneos e entre 3% e 8% de todos os linfomas em cães (Withrow & MacEwen, 6ª ed.).\n' +
      '- Faixa etária e sexo: acomete animais idosos (idade mediana de 9 a 11 anos), sem predisposição sexual comprovada.\n' +
      '- Raças predispostas: Scottish Terrier, Boxer, Golden Retriever, Bulldog Inglês, Cocker Spaniel e Bichon Frisé; em jovens, afastar sempre linfocitose cutânea.',
    distribuicaoFelina:
      'Características epidemiológicas da apresentação cutânea em gatos:\n\n' +
      '- Prevalência: neoplasia rara, representando 0,2% a 3% dos linfomas felinos.\n' +
      '- Dados demográficos (Siewert et al., 2022): idade mediana de 12,3 anos em coorte multicêntrica (41 gatos), com maior frequência em gatos domésticos de pelo curto (DSH).\n' +
      '- Ausência de vínculo retroviral: diferentemente das formas mediastinal e multicêntrica, o linfoma cutâneo felino não exibe associação consistente com infecção por FeLV ou FIV (Withrow & MacEwen, 6ª ed.).',
    fenotiposPeculiaresGato:
      'Padrões clínico-patológicos específicos da espécie felina documentados em consensos:\n\n' +
      '- Linfoma cutâneo clássico: eCTCL ou NECL (células T), com a peculiaridade de o eCTCL felino frequentemente poupar os anexos foliculares.\n' +
      '- Linfoma associado a sítio de injeção (Roccabianca et al., 2016): massas em sítios vacinais (interescapular e tórax lateral) com angiocentricidade (13/17) e angiodestruição (8/17) ligadas a estímulo inflamatório persistente.\n' +
      '- Linfoma tarsal felino (Burr et al., 2014): massas nodulares infiltrativas no tarso de gatos idosos em série de 23 casos, simulando cistos sinoviais ou sarcomas.',
    mimetizadorLinfocitoseCutanea:
      'A linfocitose cutânea (pseudolinfoma ou linfocitoma cutis) mimetiza o linfoma maligno cutâneo (Vet Sci, 2022):\n\n' +
      '- Padrão lesional: denso infiltrado de linfócitos maduros bem diferenciados com alopecia, eritema e placas erosivas multifocais.\n' +
      '- Curso biológico indolente: gatos acometidos apresentam sobrevida mediana de 1080 dias com manejo conservador.\n' +
      '- Cautela com PARR: processos inflamatórios graves podem exibir pseudoclonalidade; infiltrado dérmico não equivale automaticamente a linfoma maligno.',
    figuraLinfocitoseDiferencial: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig7-linfocitose-cutanea-felina-diferencial-mdpi-2022.jpg',
      alt: 'Apresentações clínicas de linfocitose cutânea felina (pseudolinfoma)',
      caption: 'Figura — Apresentações clínicas de linfocitose cutânea felina, principal diagnóstico diferencial:\n' +
        '- Achados clínicos: alopecia e descamação generalizada (painel a), úlceras multifocais abdominais (painel b) e blefarite eritematosa descamativa periocular (painel c).\n' +
        '- Diagnóstico integrado: diferenciação com eCTCL exige histopatologia e imunofenotipagem com acompanhamento longitudinal (Vet Sci 2022, CC BY 4.0).',
      display: 'wide',
    },
  },
  pathogenesisTransmission: {
    passoAPassoPatogenia: [
      '1. Transformação clonal precoce: Um linfócito T (ou menos frequentemente B) sofre mutações genéticas e alterações epigenéticas que desregulam checkpoints de proliferação celular e evadem os mecanismos fisiológicos de apoptose.',
      '2. Manutenção do maquinário de homing tecidual: A população linfocitária transformada preserva a expressão aberrante de receptores de direcionamento cutâneo (como CLA, CCR4 e integrinas específicas), programando sua migração seletiva para a circulação dérmica.',
      '3. Acúmulo no compartimento anatômico alvo: No linfoma epiteliotrópico (eCTCL), as células neoplásicas migram através da membrana basal e infiltram o estrato espinhoso da epiderme e os epitélios foliculares/sebáceos. No linfoma não epiteliotrópico (NECL), acumulam-se em ninhos perivasculares na derme média, profunda e panículo adiposo.',
      '4. Desorganização arquitetural e citotoxicidade: A invasão epidérmica promove apoptose de queratinócitos (efeito citotóxico CD8+), satelitose, espongiose, hiperplasia epidérmica reativa e destruição da barreira cutânea lipídica, culminando em escamas, crostas, erosões e despigmentação mucocutânea progressiva.',
      '5. Progressão extracutânea e disseminação: Com a evolução cronológica, o clone tumoral invade vasos linfáticos dérmicos e atinge os linfonodos regionais, progredindo subsequentemente para baço, fígado, circulação sistêmica (Síndrome de Sézary) e medula óssea.',
    ],
  },
  pathophysiology: {
    mecanismosEvolutivos:
      'A progressão patológica reflete a invasão tecidual contínua pelos clones linfocitários neoplásicos:\n\n' +
      '- Fase macular e leucodermia: a infiltração na junção dermoepidérmica desorganiza a ancoragem de melanócitos, deflagrando despigmentação no plano nasal, lábios e coxins (leucodermia neoplásica).\n' +
      '- Formação de placas e microabscessos de Pautrier: agregados intraepidérmicos de linfócitos T induzem acantose, hiperqueratose e descamação furfurácea exuberante com placas palpáveis.\n' +
      '- Oclusão vascular e ulceração: o rompimento da membrana basal e o acúmulo em blocos dérmicos provocam isquemia capilar superficial, necrose e ulcerações exsudativas graves.',
    armadilhaDoPrurido:
      'ARMADILHA DIAGNÓSTICA: A presença de prurido intenso não exclui neoplasia maligna cutânea:\n\n' +
      '- Gênese do prurido: resulta da ruptura severa da barreira lipídica epidérmica e liberação local de citocinas pruriginosas (IL-31 e mediadores citotóxicos).\n' +
      '- Superpopulação microbiana: facilitação de piodermite secundária por Staphylococcus pseudintermedius e proliferação de Malassezia.\n' +
      '- Resposta temporária a esteroides: o alívio passageiro com corticoides e antibióticos gera falsa impressão de dermatopatia alérgica, retardando o diagnóstico em 6 a 12 meses.',
    sindromeDeSezary:
      'A Síndrome de Sézary representa a manifestação leucêmica sistêmica do linfoma cutâneo de células T:\n\n' +
      '- Tríade clássica: eritrodermia esfoliativa generalizada, linfadenomegalia periférica e células de Sézary no sangue periférico.\n' +
      '- Morfologia celular patognomônica: linfócitos T circulantes atípicos com núcleos convolutos e aspecto cerebriforme característico ao microscópio óptico.\n' +
      '- Repercussão prognóstica: afecção rara que atesta perda do confinamento cutâneo e disseminação hematógena avançada, com prognóstico severamente reservado.',
  },
  clinicalSignsPathophysiology: {
    formaInicialEProgressao:
      'A evolução cronológica do eCTCL canino é notória por sua apresentação trifásica (Withrow & MacEwen, 6ª ed.):\n\n' +
      '- Estágio 1 (esfoliativo/eritematoso): eritema difuso, descamação lamelar, alopecia e prurido variável, mimetizando dermatite atópica ou farmacodermia.\n' +
      '- Estágio 2 (placas e erosões): espessamento cutâneo palpável, placas infiltradas coalescentes, erosões exsudativas e despigmentação mucocutânea progressiva.\n' +
      '- Estágio 3 (proliferativo tumoral avançado): múltiplos nódulos e massas avermelhadas/violáceas que ulceram precocemente, com secreção purulenta e necrose tecidual.',
    figuraEvolucaoRadioterapia: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig1-evolucao-clinica-radioterapia-deveau-2019.jpg',
      alt: 'Evolução clínica e resposta tumoral à radioterapia de pele total no cão',
      caption: 'Figura — Evolução macroscópica de eCTCL canino submetido a radioterapia de corpo total:\n' +
        '- (a) Carga tumoral inicial: múltiplas placas eritematosas e nódulos disseminados no tronco.\n' +
        '- (b) Resposta intermediária: regressão evidente das lesões na quarta fração do tratamento.\n' +
        '- (c) Desfecho terapêutico: remissão e reepitelização tegumentar sustentada (Deveau et al., 2019, CC BY 4.0).',
      display: 'wide',
    },
    localizacoesAlerta:
      'Sítios anatômicos sentinela que devem levantar suspeita imediata de linfoma cutâneo em animais idosos:\n\n' +
      '- Plano nasal e face: despigmentação e apagamento do relevo arquitetural em pedras de calçamento (cobblestone), tornando a superfície lisa e ulcerada.\n' +
      '- Junções mucocutâneas e lábios: despigmentação em faixa, espessamento endurecido e erosões labiais.\n' +
      '- Cavidade oral e gengivas: placas eritematosas, despigmentação e gengivite proliferativa não atribuível a periodontite.\n' +
      '- Coxins e extremidades digitais: hiperceratose, despigmentação marginal metacarpiana/metatarsiana, fissuras e onicodistrofia.\n' +
      '- Pálpebras e região perianal: blefarite descamativa crônica com madarose e eritema anogenital infiltrativo.',
    figuraDespigmentacaoMucocutanea: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig2-despigmentacao-mucocutanea-canvetj-2021.jpg',
      alt: 'Despigmentação do plano nasal e perda do relevo cobblestone',
      caption: 'Figura — Comprometimento facial no eCTCL canino:\n' +
        '- Sinais dermatológicos: despigmentação profunda e perda da arquitetura em pedras de calçamento do plano nasal e junções mucocutâneas, com aspecto liso e atrófico (Can Vet J 2021, PMC8218949).',
      display: 'default',
    },
    figuraLabiosMucosaOral: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig3-labios-mucosa-oral-eritema-canvetj-2021.jpg',
      alt: 'Despigmentação labial e eritema de mucosa oral em cão com eCTCL',
      caption: 'Figura — Lesões mucocutâneas orais no eCTCL canino:\n' +
        '- Sinais clínicos: bordas labiais com despigmentação total e espessamento tecidual, com eritema e microerosões gengivais (Can Vet J 2021, PMC8218949).',
      display: 'default',
    },
    figuraCoxinsPatas: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig4-despigmentacao-coxins-patas-canvetj-2021.jpg',
      alt: 'Despigmentação de coxins digitais e carpais no eCTCL canino',
      caption: 'Figura — Acometimento de extremidades distais no eCTCL canino:\n' +
        '- Sinais clínicos: despigmentação marginal de coxins metacarpianos e digitais com descamação e rarefação pilosa periarticular (Can Vet J 2021, PMC8218949).',
      display: 'default',
    },
  },
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Reconhecimento clínico e suspensão programada de corticosteroides',
      description:
        'Triagem clínica rigorosa em animais idosos com dermatopatias refratárias:\n\n' +
        '- Sinais de alerta: dermatite esfoliativa, despigmentação mucocutânea e placas proliferativas resistentes a tratamentos convencionais.\n' +
        '- Janela de depuração de esteroides: suspender glicocorticoides tópicos e sistêmicos por 2 a 3 semanas antes da biópsia (Withrow & MacEwen, 6ª ed.).\n' +
        '- Racional farmacológico: os esteroides deflagram apoptose de linfócitos neoplásicos, esvaziando o infiltrado e gerando laudos falsamente negativos.',
      purpose: 'Garantir que a celularidade tumoral esteja preservada e evitar falsos-negativos diagnósticos.',
      interpretation: 'Se o paciente estiver em uso de corticoide recente e a biópsia for inespecífica, repetir a coleta após a janela de depuração medicamentosa.',
      limitations: 'Em pacientes com prurido lancinante ou automutilação grave, pode ser necessário controle provisório com anti-histamínicos ou banhos calmantes.',
    },
    {
      stepNumber: 2,
      title: 'Triagem parasitológica e microbiológica superficial',
      description:
        'Triagem parasitológica e microbiológica cutânea pré-amostragem tecidual:\n\n' +
        '- Pesquisa ectoparasitária e citologia: raspado cutâneo profundo (Demodex), tricograma e citologia superficial de fita/imprint para cocos e Malassezia.\n' +
        '- Cultura fúngica: indicada em suspeita de dermatofitose associada à perda da barreira.\n' +
        '- Objetivo clínico: tratar infecções secundárias de barreira antes de proceder à biópsia definitiva.',
      purpose: 'Eliminar comorbidades infecciosas tratáveis e diminuir o infiltrado inflamatório exsudativo secundário.',
      interpretation: 'A presença de bactérias e leveduras em grande número apenas reflete quebra de barreira tegumentar e não descarta o linfoma subjacente.',
      limitations: 'Infecções bacterianas graves e necrose superficial mascaram o epitélio subjacente.',
    },
    {
      stepNumber: 3,
      title: 'Biópsia cutânea múltipla de espessura total (Padrão Ouro)',
      description:
        'Método padrão ouro para obtenção de amostras histológicas representativas:\n\n' +
        '- Múltiplos sítios de coleta: obter de 3 a 5 fragmentos de lesões ativas (placas infiltradas, máculas e áreas de transição) com punch de 6 a 8 mm (ou 4 mm em coxins/nariz) ou cunha incisional (BSAVA Guide to Procedures, 3ª ed., 2024).\n' +
        '- Seleção de área: evitar estritamente o centro necrótico ulcerado e crostas superficiais isoladas.\n' +
        '- Técnica atraumática: apreender a peça unicamente pela gordura subcutânea ou suspender com agulha delicada, prevenindo esmagamento celular.',
      isGoldStandard: true,
      purpose: 'Fornecer arquitetura histológica íntegra e profunda para avaliação diagnóstica definitiva.',
      interpretation: 'Amostras adequadas revelam relação derme-epiderme preservada e infiltrado celular representativo.',
      limitations: 'Biópsias superficiais (shave biopsy) ou tecidos esmagados por pinças impedem a correta visualização do tropismo celular.',
    },
    {
      stepNumber: 4,
      title: 'Histopatologia especializada e avaliação de epiteliotropismo',
      description:
        'Análise microscópica com coloração rotineira de hematoxilina e eosina (HE):\n\n' +
        '- Achados clássicos de eCTCL: exocitose de linfócitos atípicos infiltrando epiderme e anexos, com microabscessos intraepidérmicos de Pautrier característicos.\n' +
        '- Variante de interface (Smith et al., 2026): dermatite citotóxica de interface com satelitose linfocitária e apoptose massiva de queratinócitos basais.\n' +
        '- Padrão de NECL: infiltrado linfoide denso em faixa ou nódulos na derme profunda e panículo adiposo, com epiderme preservada (zona de Grenz).',
      purpose: 'Confirmar a natureza linfoide neoplásica e classificar o compartimento anatômico infiltrado.',
      interpretation: 'Identificação de infiltrado intraepidérmico atípico confirma eCTCL; infiltrado dérmico profundo orienta para NECL.',
      limitations: 'Fases muito iniciais podem mimetizar dermatite de interface inespecífica ou lúpus eritematoso.',
    },
    {
      stepNumber: 5,
      title: 'Painel de Imuno-histoquímica (CD3 e CD20/CD79a)',
      description:
        'Caracterização fenotípica por imunomarcação em cortes parafinados:\n\n' +
        '- Marcadores pan-linfocitários: anticorpos anti-CD3 (células T) e anti-CD20 / anti-CD79a (células B).\n' +
        '- Perfil clássico no cão: cerca de 97% dos eCTCL são CD3+ (linhagem T citotóxica CD8+).\n' +
        '- Expressão aberrante crítica: até 54% dos clones T caninos CD3+ exibem marcação cruzada de CD20; a positividade de CD20 nunca deve ser avaliada isoladamente sem o CD3.',
      purpose: 'Definir a linhagem imune (T versus B) para direcionamento prognóstico e quimioterápico.',
      interpretation: 'Forte marcação CD3 intraepidérmica confirma eCTCL de células T; marcação CD20/CD79a dérmica profunda isolada define linfoma B.',
      limitations: 'Expressão aberrante de CD20 em células T pode induzir a classificação equivocada de tumor de células B se avaliado isoladamente.',
    },
    {
      stepNumber: 6,
      title: 'Teste molecular de clonalidade por PARR (PCR)',
      description:
        'Avaliação molecular de clonalidade pela técnica de PARR:\n\n' +
        '- Alvos gênicos: rearranjos de TCR-gama (receptores T) e IgH (cadeia pesada de imunoglobulina).\n' +
        '- Padrão clonal: processos reativos são policlonais (curvas em base ampla), enquanto neoplasias exibem picos monoclonais dominantes bem definidos.',
      purpose: 'Auxiliar na diferenciação entre processo reativo inflamatório exuberante e neoplasia linfoide clonal.',
      interpretation: 'Pico monoclonal discreto reforça fortemente o diagnóstico de neoplasia em contexto clínico-histológico compatível.',
      limitations: 'Clonalidade NÃO equivale automaticamente a câncer (pode ocorrer em inflamações intensas por Ehrlichia, leishmaniose ou autoimunidade); resultados policlonais ocorrem por mutações nos sítios de primers ou baixa celularidade tumoral.',
    },
    {
      stepNumber: 7,
      title: 'Citopatologia de massas e punção aspirativa (FNA) de linfonodos',
      description:
        'Punção aspirativa por agulha fina (FNA) de linfonodos e massas nodulares:\n\n' +
        '- Citomorfologia no eCTCL (Lee et al., 2026): linfócitos atípicos intermediários a grandes com citoplasma basofílico e projeção em uropódio (formato em espelho de mão).\n' +
        '- Valor clínico: triagem rápida de invasão nodal regional e diferenciação de outras neoplasias de células redondas.',
      purpose: 'Triagem rápida de invasão nodal regional e caracterização celular de nódulos proliferativos.',
      interpretation: 'População monomórfica de linfoblastos atípicos em linfonodo regional confirma disseminação metastática.',
      limitations: 'Em lesões puramente eritematosas, descamativas ou planas, a citologia por fita ou raspado é rotineiramente inespecífica ou inconclusiva.',
    },
    {
      stepNumber: 8,
      title: 'Estadiamento hematológico, bioquímico e por imagem',
      description:
        'Painel laboratorial e exames de imagem para estadiamento sistêmico:\n\n' +
        '- Hematologia: esfregaço manual para pesquisa de citopenias e células de Sézary com núcleo cerebriforme.\n' +
        '- Bioquímica clínica: ALT, ALP, bilirrubinas e albumina (painel basal para CCNU), associados a cálcio total e ionizado para descartar hipercalcemia paraneoplásica.\n' +
        '- Diagnóstico por imagem: radiografias torácicas em três projeções e ultrassonografia abdominal para rastrear metástases viscerais.',
      purpose: 'Determinar a extensão anatômica do tumor e estabelecer o perfil basal de segurança farmacológica.',
      interpretation: 'Presença de linfadenopatia intra-abdominal ou organomegalia espleno-hepática reclassifica a doença para estágio sistêmico avançado.',
      limitations: 'A hipercalcemia pode ocorrer sem secreção detectável de PTHrP, refletindo mecanismos osteolíticos ou citocínicos alternativos.',
    },
    {
      stepNumber: 9,
      title: 'Avaliação da medula óssea (Aspirado e Core Biopsy)',
      description:
        'Avaliação medular por citologia aspirativa e core biopsy guiada:\n\n' +
        '- Critérios de indicação: citopenias periféricas inexplicadas, blastemia circulante, suspeita de Sézary ou estadiamento de estágio V (BSAVA Oncology, 3ª ed.).\n' +
        '- Interpretação: mielograma quantitativo confirma infiltração neoplásica quando linfócitos atípicos ultrapassam 5% da celularidade total nucleada.',
      purpose: 'Confirmar ou afastar infiltração medular terminal (estágio V da classificação da OMS).',
      interpretation: 'Infiltração de medula óssea superior a 5% por linfócitos atípicos comprova doença sistêmica generalizada.',
      limitations: 'Procedimento invasivo que exige sedação profunda ou anestesia geral; dispensável na rotina de doença estritamente cutânea inicial.',
    },
  ],
  treatment: {
    estratificacaoTerapeutica:
      'A decisão terapêutica inicial diante do linfoma cutâneo jamais deve ser empírica (Withrow & MacEwen, 6ª ed.):\n\n' +
      '- Cenário 1 (Doença solitária localizada): passível de controle local duradouro com excisão cirúrgica ou radioterapia focal.\n' +
      '- Cenário 2 (Doença multifocal difusa primária da pele): demanda quimioterapia sistêmica com tropismo cutâneo ou radioterapia de pele total.\n' +
      '- Cenário 3 (Doença com comprometimento extracutâneo): infiltração visceral ou nodal avançada que exige protocolos sistêmicos intensivos de resgate para linfoma multicêntrico.',
    doencaSolitariaLocalizada:
      'Intervenções locais agressivas de primeira escolha para placa ou nódulo solitário sem invasão sistêmica (Withrow & MacEwen, 6ª ed.; Chan et al., 2018):\n\n' +
      '- Ressecção cirúrgica ampla: margens laterais estritas de 2 a 3 cm e um plano fascial profundo não violado, proporcionando longos períodos livres de doença e potencial curativo local.\n' +
      '- Radioterapia de megavoltagem fracionada: modalidade preferencial para sítios de reconstrução complexa (plano nasal, lábios, pálpebras ou extremidades distais), garantindo erradicação tumoral com preservação funcional.',
    lomustinaCCNU:
      'Quimioterápico de primeira linha na doença cutânea multifocal e disseminada no cão (Risbon et al., 2006; Nelson & Couto, 6ª ed.):\n\n' +
      '- Mecanismo e dados seminais: nitrosureia lipofílica que atinge altas concentrações dérmicas por alquilação do DNA tumoral; no estudo clássico de Risbon et al. (2006) com 46 cães com eCTCL, a dose mediana inicial de 60 mg/m2 VO q3sem (intervalo de 30 a 95 mg/m2) alcançou taxa de resposta objetiva global de 83% (15 CR e 23 PR), com duração mediana de resposta de 94 dias.\n' +
      '- Ajuste contemporâneo de dosagem: enquanto o BSAVA Oncology cita 70 mg/m2 VO q3sem, a conduta clínica moderna individualiza a dose entre 50 e 60 mg/m2 VO para minimizar toxicidades graves.\n' +
      '- Mielossupressão aguda dose-limitante: nadir de neutrófilos entre 7 e 10 dias (podendo atingir 14 dias); exige hemograma prévio obrigatório por ciclo (neutrófilos > 2.500/uL e plaquetas > 100.000/uL estritamente necessários para liberação).\n' +
      '- Hepatotoxicidade cumulativa crônica: risco de insuficiência hepática irreversível; requer dosagem sérica de ALT, ALP e bilirrubinas pré-ciclo e coprescrição rotineira de hepatoprotetores (SAMe e silibina).\n' +
      '- Cinética de falha: a refratariedade e progressão tumoral por resistência celular adquirida ocorrem tipicamente em 3 a 4 meses.',
    retinoidesIsotretinoina:
      'Terapia diferenciadora com retinoides sintéticos para controle tegumentar no eCTCL (Ramos et al., 2022):\n\n' +
      '- Mecanismo molecular: ligam-se aos receptores nucleares RAR e RXR, modulando a transcrição gênica, inibindo a proliferação e induzindo apoptose de linfócitos e queratinócitos atípicos.\n' +
      '- Evidência clínica e posologia: Ramos et al. (2022) avaliaram a isotretinoína em 12 cães na dose de 1 a 2 mg/kg VO a cada 24 horas, documentando taxa de benefício clínico de 58% (33% de remissão completa e 25% de remissão parcial).\n' +
      '- Perfil de tolerabilidade: efeitos adversos leves em 25% dos cães (queilite e elevação transitória de enzimas hepáticas); excelente alternativa quando há contraindicação formal a mielossupressores.',
    inibidorNuclearVerdinexor:
      'Inibidor seletivo de exportação nuclear (SINE) direcionado à exportina-1 (XPO1) (Vlodaver et al., 2024):\n\n' +
      '- Mecanismo antineoplásico: o bloqueio da XPO1 impede o efluxo citoplasmático de proteínas supressoras de tumor (p53, p21 e IκB), restaurando sua concentração nuclear e disparando apoptose clonal seletiva.\n' +
      '- Ensaio clínico piloto: Vlodaver et al. (2024) avaliaram 8 cães com eCTCL na dose de 1,28 a 1,45 mg/kg VO duas vezes por semana (intervalo mínimo de 72 horas entre doses), obtendo taxa de controle clínico de 75% e tempo até progressão de 56 ± 41 dias.\n' +
      '- Perfil adverso e indicação: reações adversas predominantes incluem anorexia transitória, perda de peso e letargia; posiciona-se como terapia oral de resgate ou para falhas da lomustina.',
    radioterapiaAvancada:
      'Modalidades avançadas de radiação ionizante no linfoma tegumentar (Deveau et al., 2019):\n\n' +
      '- Radioterapia focal de megavoltagem (fótons ou elétrons): indicada para lesões solitárias ou placas mucocutâneas em topografias nobres refratárias à cirurgia reconstrutiva.\n' +
      '- Radioterapia de pele total (TSE/TSPT): irradiação homogênea de todo o envelope cutâneo superficial; Deveau et al. (2019) documentaram remissão progressiva e marcante de todas as placas cutâneas sem indução de mielossupressão severa, assegurando excelente sobrevida clínica com qualidade de vida.',
    glicocorticoidesEPaliacao:
      'Terapia paliativa sintomática e controle de barreira tegumentar:\n\n' +
      '- Corticoterapia sistêmica: Prednisona ou Prednisolona na dose de 1 a 2 mg/kg VO a cada 24 horas (desmame gradual para 0,5 a 1 mg/kg em dias alternados) para redução do edema tumoral, atenuação do prurido e citotoxicidade linfocítica rápida.\n' +
      '- ALERTA FARMACOLÓGICO: a corticoterapia isolada não constitui remissão duradoura e deflagra refratariedade clonal precoce em poucas semanas se utilizada sem protocolo quimioterápico concomitante.\n' +
      '- Suporte higiênico e analgésico: banhos medicinais semanais com clorexidina a 2-3%, loções hidratantes hipoalergênicas e analgesia multimodal escalonada.',
    peculiaridadesGatos:
      'Particularidades terapêuticas e riscos espécie-específicos em felinos (Withrow & MacEwen, 6ª ed.; Siewert et al., 2022):\n\n' +
      '- Abordagem local: ressecção cirúrgica ampla ou radioterapia fracionada constituem a conduta de escolha para nódulos isolados (incluindo o linfoma tarsal).\n' +
      '- Lomustina (CCNU) e toxicidade pulmonar: empregada na dose empírica de 40 a 50 mg/m2 VO a cada 3 a 4 semanas (ou 8 a 10 mg/gato VO); demanda monitoramento respiratório contínuo pelo risco clássico de fibrose pulmonar idiopática fatal na espécie felina.\n' +
      '- Linfomas de baixo grau: regimes orais com clorambucila associada à prednisolona exibem excelente índice de tolerância.\n' +
      '- Evidência clínica: coortes contemporâneas (Siewert et al., 2022) confirmam ampla variabilidade de resposta biológica e ausência de um protocolo quimioterápico padrão-ouro único.',
  },
  complications: {
    infeccoesSecundarias:
      'Ruptura de barreira cutânea e superinfecções oportunistas:\n\n' +
      '- Patógenos bacterianos: piodermites profundas recidivantes por Staphylococcus pseudintermedius e Pseudomonas aeruginosa.\n' +
      '- Disbiose fúngica: proliferação fúngica exuberante por Malassezia pachydermatis e dermatofitoses atípicas, amplificando o prurido e a automutilação.\n' +
      '- Risco sistêmico: bacteremia secundária e sepse de origem tegumentar durante os nadirs de neutropenia quimioterápica.',
    disseminacaoVisceral:
      'Progressão biológica extracutânea em fases tardias:\n\n' +
      '- Alvos de metástase: invasão de linfonodos regionais, parênquima esplênico, hepático, pulmonar e medula óssea.\n' +
      '- Impacto sistêmico: instalação de caquexia neoplásica progressiva, insuficiência hepática e hipoalbuminemia grave por espoliação exsudativa tegumentar difusa.',
    toxicidadeMedicamentosa:
      'Efeitos adversos graves e eventos iatrogênicos cumulativos:\n\n' +
      '- Toxicidade hepática por lomustina (CCNU): necrose de hepatócitos, cirrose medicamentosa insidiosa e falência hepatocelular irreversível.\n' +
      '- Mielossupressão crítica: quadros de neutropenia febril grave que impõem hospitalização imediata em terapia intensiva e antibioticoterapia parenteral de amplo espectro.',
    figuraHistopatologiaTropismo: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig5-histopatologia-tropismo-epitelial-lee-2026.jpg',
      alt: 'Histopatologia do eCTCL: afinidade epitelial e infiltração na camada basal',
      caption:
        'Figura — Exame histopatológico de lesão proliferativa no eCTCL canino:\n\n' +
        '- Painel A: as células neoplásicas exibem acentuada afinidade epitelial (tropismo), infiltrando a camada basal da epiderme e estendendo-se entre feixes musculares e conjuntivos adjacentes com padrão infiltrativo invasivo não encapsulado (HE, barra = 200 um).\n' +
        '- Painel B: presença de células gigantes neoplásicas multinucleadas com núcleos atípicos e pleomorfismo marcante (HE, barra = 50 um).\n' +
        '- Fonte: Lee et al. (2026), J Vet Sci 27(1):e11 (PMC12891818, CC BY-NC 4.0).',
      display: 'wide',
    },
    figuraCitologiaAtipias: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig6-citologia-fna-atipias-uropodio-lee-2026.jpg',
      alt: 'Citopatologia por FNA de eCTCL canino: uropódio e células em espelho de mão',
      caption:
        'Figura — Achados citopatológicos por punção aspirativa (FNA) no eCTCL canino:\n\n' +
        '- Painel A: células linfoides com caudas citoplasmáticas características (uropódio) e formato em espelho de mão (seta).\n' +
        '- Painel B: célula neoplásica gigante com cariomegalia marcante, medindo cerca de 8 vezes o diâmetro de uma hemácia.\n' +
        '- Painel C: célula multinucleada contendo granulações eosinofílicas citoplasmáticas e figura mitótica atípica (ponta de seta).\n' +
        '- Painel D: célula com uropódio e moldagem nuclear típica (Diff-Quik, barras = 20 a 50 um).\n' +
        '- Fonte: Lee et al. (2026), J Vet Sci 27(1):e11 (PMC12891818, CC BY-NC 4.0).',
      display: 'wide',
    },
  },
  prevention: {
    vigilanciaPrecoce:
      'Ausência de profilaxia primária e diretrizes de vigilância clínica:\n\n' +
      '- Ausência de prevenção causal: não há medidas primárias contra mutações clonais somáticas esporádicas nos linfócitos de cães e gatos.\n' +
      '- Vigilância diagnóstica geriátrica: cães >= 8 anos e gatos >= 10 anos com dermatopatia descamativa, eritematosa ou pruriginosa sem remissão após 4 a 6 semanas de conduta padrão DEVEM realizar múltiplas biópsias cutâneas antes do rótulo equivocado de alergia senil.\n' +
      '- Protocolo de injeção em felinos: aplicação rigorosa das diretrizes da AAFP para vacinação em membros distais, viabilizando ressecções com margem ampla caso surjam neoplasias associadas ao sítio de injeção.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'dermatite-atopica-canina',
    'sindrome-cutanea-atopica-felina',
    'leucemia-viral-felina',
    'sindrome-mielodisplasica-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'dipirona',
  ],
  references: [
    {
      id: 'ref-risbon-2006',
      citationText:
        'RISBON, R. E. et al. Response of canine cutaneous epitheliotropic lymphoma to lomustine (CCNU): a retrospective study of 46 cases (1999–2004). Journal of Veterinary Internal Medicine, v. 20, n. 6, p. 1389–1397, 2006. DOI: 10.1892/0891-6640(2006)20[1389:roccel]2.0.co;2.',
      sourceType: 'article',
      notes: 'Estudo multicêntrico fundamental com 46 cães; fundamentou o uso da lomustina (dose mediana 60 mg/m2, ORR 83%, duração mediana da resposta 94 dias).',
    },
    {
      id: 'ref-chan-2018',
      citationText:
        'CHAN, C. M. et al. Retrospective evaluation of 148 cases of canine cutaneous epitheliotropic lymphoma (2000–2016). Veterinary Dermatology, v. 29, n. 2, p. 130–e50, 2018. DOI: 10.1111/vde.12504.',
      sourceType: 'article',
      notes: 'Maior coorte retrospectiva canina (148 cães); comprovou sobrevida mediana geral de 264 dias, sendo 130 dias para doença puramente cutânea versus 491 dias para doença mucocutânea/mucosa.',
    },
    {
      id: 'ref-smith-2026',
      citationText:
        'SMITH, A. et al. Canine cutaneous epitheliotropic T-cell lymphoma with cytotoxic interface dermatitis: six cases. Veterinary Dermatology, 2026. DOI: 10.1111/vde.70029.',
      sourceType: 'article',
      notes: 'Descreve nova variante com queratinócitos basais apoptóticos, satelitose e dermatite de interface mimetizando eritema multiforme e lúpus cutâneo; 100% clonal no PARR.',
    },
    {
      id: 'ref-ramos-2022',
      citationText:
        'RAMOS, S. J. et al. Treatment of canine cutaneous epitheliotropic T-cell lymphoma with isotretinoin: a retrospective study of 12 cases. Veterinary Dermatology, v. 33, n. 5, p. 433–e87, 2022. DOI: 10.1111/vde.13079.',
      sourceType: 'article',
      notes: 'Avaliou isotretinoína em 12 cães com eCTCL; ORR de 58% (33% remissão completa) com excelente tolerabilidade.',
    },
    {
      id: 'ref-vlodaver-2024',
      citationText:
        'VLODAVER, M. et al. An open-label, non-randomized, pilot study evaluating the safety and clinical activity of verdinexor in canine cutaneous epitheliotropic T-cell lymphoma. Veterinary Dermatology, 2024. DOI: 10.1111/vde.13280.',
      sourceType: 'article',
      notes: 'Ensaio piloto com inibidor seletivo de XPO1 (verdinexor) em 8 cães; taxa de controle clínico de 75% e sobrevida livre de progressão de 56 dias.',
    },
    {
      id: 'ref-siewert-2022',
      citationText:
        'SIEWERT, C. et al. Feline cutaneous lymphoma: a retrospective study of 41 cases (2000–2018). Journal of Feline Medicine and Surgery, v. 24, n. 4, p. e112–e122, 2022. DOI: 10.1177/1098612X211028837.',
      sourceType: 'article',
      notes: 'Principal série clínica contemporânea para linfoma cutâneo felino (41 gatos); caracterizou subtipos, sobrevida e ausência de ligação com retrovírus.',
    },
    {
      id: 'ref-roccabianca-2016',
      citationText:
        'ROCCABIANCA, P. et al. Feline large granular lymphocyte lymphoma and injection site lymphoma. Veterinary Pathology, v. 53, n. 4, p. 844–853, 2016. DOI: 10.1177/0300985815623620.',
      sourceType: 'article',
      notes: 'Série de 17 gatos demonstrando fenótipo de linfoma cutâneo/subcutâneo associado a sítios de injeção, com necrose e angioinvasão acentuadas.',
    },
    {
      id: 'ref-burr-2014',
      citationText:
        'BURR, H. N. et al. Cutaneous lymphoma of the tarsus in 23 cats. Journal of the American Animal Hospital Association, v. 50, n. 4, p. 250–257, 2014. DOI: 10.5326/JAAHA-MS-6029.',
      sourceType: 'article',
      notes: 'Identificou apresentação peculiar de linfoma tarsal em felinos idosos como diagnóstico diferencial de lesões periarticulares distais.',
    },
    {
      id: 'ref-lee-2026',
      citationText:
        'LEE, D.-H. et al. Cutaneous epitheliotropic lymphoma with marked nuclear pleomorphism in a dog. Journal of Veterinary Science, v. 27, n. 1, p. e11, 2026. DOI: 10.4142/jvs.25232.',
      sourceType: 'article',
      notes: 'Relato histopatológico e citológico contemporâneo em cão evidenciando células em espelho de mão com uropódio e invasão epitelial basal com pleomorfismo severo (CC BY-NC 4.0).',
    },
    {
      id: 'ref-deveau-2019',
      citationText:
        'DEVEAU, M. A. et al. A case report of total skin photon radiation therapy for cutaneous epitheliotropic lymphoma in a dog. BMC Veterinary Research, v. 15, n. 1, p. 399, 2019. DOI: 10.1186/s12917-019-2105-x.',
      sourceType: 'article',
      notes: 'Documentou eficácia e evolução fotográfica da radioterapia de pele total no eCTCL canino com regressão de placas e segurança tecidual (CC BY 4.0).',
    },
    {
      id: 'ref-vetsci-2022',
      citationText:
        'FABBRINI, F. et al. Feline and canine cutaneous lymphocytosis: reactive process or indolent neoplastic disease? Veterinary Sciences, v. 9, n. 1, p. 26, 2022. DOI: 10.3390/vetsci9010026.',
      sourceType: 'article',
      notes: 'Demonstrou sobrevida mediana de 1080 dias na linfocitose cutânea felina, estabelecendo os critérios para separação do linfoma maligno clássico (CC BY 4.0).',
    },
    {
      id: 'ref-withrow-2020',
      citationText:
        'VAIL, D. M.; THAMM, D. H.; LIPTAK, J. M. Withrow & MacEwen’s Small Animal Clinical Oncology. 6. ed. St. Louis: Elsevier, 2020. Cap. 33: Hematopoietic Tumors, p. 695–711.',
      sourceType: 'book',
      notes: 'Tratado clássico de oncologia veterinária; fundamenta a biologia, estadiamento e terapêutica de linfomas cutâneos caninos e felinos.',
    },
    {
      id: 'ref-nelson-couto-2019',
      citationText:
        'NELSON, R. W.; COUTO, C. G. Small Animal Internal Medicine. 6. ed. St. Louis: Elsevier, 2019. Cap. 79: Lymphoma, p. 1309–1310.',
      sourceType: 'book',
      notes: 'Referência fundamental para o protocolo histórico de lomustina (CCNU) em eCTCL canino e índices de resposta clínica.',
    },
    {
      id: 'ref-bsava-procedures-2024',
      citationText:
        'BRITISH SMALL ANIMAL VETERINARY ASSOCIATION (BSAVA). BSAVA Guide to Procedures in Small Animal Practice. 3. ed. Gloucester: BSAVA, 2024. Skin Biopsy – Punch Biopsy, p. 255–256.',
      sourceType: 'book',
      notes: 'Padronização da técnica atraumática de biópsia cutânea por punch de 6 a 8 mm e conservação do fragmento.',
    },
  ],
};
