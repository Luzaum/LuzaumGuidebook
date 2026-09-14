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
    'O linfoma cutâneo compreende um grupo heterogêneo de neoplasias linfoides malignas caracterizadas pelo acometimento primário ou predominante da epiderme, derme, anexos, subcutâneo e junções mucocutâneas. A divisão biológica primária e mandatória separa a doença em linfoma epiteliotrópico (ECL/eCTCL, predominantemente células T CD3+ e frequentemente CD8+ citotóxicas, englobando micose fungoide, reticulose pagetoide e síndrome de Sézary) e linfoma não epiteliotrópico (NECL, de linhagem T ou B, com infiltrado restrito à derme média/profunda e hipoderme). No cão, o eCTCL classicamente evolui de descamação, alopecia e prurido para espessamento, placas eritematosas, despigmentação mucocutânea e massas ulceradas (Withrow & MacEwen, 6ª ed.), mimetizando por meses dermatite atópica, piodermite ou doenças imunomediadas. Um marco recente de Smith et al. (2026) descreveu variante com intensa dermatite de interface citotóxica e apoptose de queratinócitos mimetizando eritema multiforme e lúpus. O diagnóstico padrão ouro exige biópsia cutânea representativa (punch de 6 a 8 mm ou incisional, coletando pelo menos 3 lesões ativas sem esmagamento) integrada à imuno-histoquímica (CD3, CD20/CD79a) e PARR criterioso. O prognóstico varia amplamente com a distribuição: em cães, doença solitária apresenta sobrevida prolongada com cirurgia ou radioterapia, enquanto lesões cutâneas múltiplas conferem sobrevida mediana de 130 dias versus 491 dias na doença restrita mucocutânea/mucosa (Chan et al., 2018). Na doença difusa canina, a lomustina (CCNU, mediana de 60 mg/m2 VO a cada 3 semanas) oferece a taxa de resposta objetiva mais consolidada (~83%), embora com duração mediana de aproximadamente 94 dias (Risbon et al., 2006; Nelson & Couto, 6ª ed.), exigindo monitoramento estrito de toxicidade hepática cumulativa e nadir neutrofílico. Em felinos, é uma afecção rara (<3% dos linfomas), sem ligação comprovada a FeLV/FIV, destacando-se apresentações peculiares como linfoma tarsal, linfoma em sítio prévio de injeção e o diagnóstico diferencial com a linfocitose cutânea indolente (sobrevida ~1080 dias).',
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
      'O linfoma cutâneo não deve ser encarado como uma doença única, mas como um espectro de neoplasias linfoides com tropismos teciduais, imunofenótipos e desfechos radicalmente distintos. A forma epiteliotrópica (eCTCL), tipicamente T citotóxica (CD3+, CD8+), invade epiderme e anexos causando eritema, descamação, despigmentação e placas que mimetizam dermatites alérgicas por meses. O diagnóstico definitivo depende de biópsia cutânea representativa com histopatologia e imunofenotipagem, reservando a biologia molecular (PARR) como suporte. Enquanto lesões solitárias admitem controle local curativo por cirurgia ou radioterapia, a doença disseminada demanda quimioterapia sistêmica com lomustina (CCNU) ou retinoides, sempre sob estrita vigilância de toxicidade cumulativa.',
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
          'A distinção fundamental é histogenética. O linfoma epiteliotrópico (eCTCL) retém receptores de homing cutâneo e infiltra a epiderme e anexos (linfócitos T CD3+, CD8+). O não epiteliotrópico (NECL) infiltra a derme profunda e o subcutâneo, podendo ser de linhagem T ou B, formando nódulos dérmicos com epiderme preservada.',
        highlights: ['eCTCL', 'receptores de homing cutâneo', 'linfócitos T CD3+, CD8+', 'NECL'],
      },
      {
        title: 'Variante Citotóxica de Interface (2026)',
        body:
          'Smith et al. (2026) caracterizaram uma variante de eCTCL canino associada a satelitose linfocitária, numerosos queratinócitos apoptóticos e dermatite de interface. Esse padrão mimetiza eritema multiforme, necrólise epidérmica tóxica e lúpus, demonstrando que dermatite de interface na lâmina não afasta linfoma.',
        highlights: ['Smith et al. (2026)', 'satelitose linfocitária', 'queratinócitos apoptóticos', 'dermatite de interface'],
      },
      {
        title: 'PARR e Limites da Clonabilidade',
        body:
          'A PCR para rearranjo do receptor de antígeno (PARR) demonstra monoclonalidade, mas não substitui a histopatologia. Expansões pseudoclonais ocorrem em inflamações graves e doenças autoimunes, enquanto resultados policlonais podem decorrer de baixa celularidade tumoral ou primers imperfeitos.',
        highlights: ['PARR', 'não substitui a histopatologia', 'pseudoclonais', 'policlonais'],
      },
      {
        title: 'Conduta Terapêutica Estratificada',
        body:
          'A primeira decisão não é qual quimioterapia aplicar, mas se a doença é solitária ou difusa. Lesões solitárias alcançam excelente sobrevida com cirurgia de margens amplas ou radioterapia. Doença multifocal no cão tem na lomustina (CCNU) a droga de escolha (ORR 83%; Risbon et al., 2006), reservando retinoides e verdinexor como alternativas.',
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
            'Suspeitar ativamente em cães e gatos idosos com dermatopatias refratárias, perda de pigmentação mucocutânea (plano nasal, lábios, pálpebras) ou placas eritematosas que não respondem à antibioticoterapia. Sempre que a estabilidade clínica permitir, suspender corticosteroides tópicos e sistêmicos por 2 a 3 semanas antes da biópsia para evitar apoptose das células neoplásicas e falso-negativos histológicos.',
        },
        {
          label: '2. Triagem dermatológica e exclusão de mimetizadores',
          timing: 'Primeiras 24-48 horas',
          detail:
            'Realizar raspado cutâneo profundo e citologia superficial de fita/imprint para descartar sarna demodécica, escabiose e superpopulação de Malassezia ou Staphylococcus. Tratar infecções secundárias associadas à quebra de barreira antes de emitir julgamento clínico definitivo.',
        },
        {
          label: '3. Biópsia cutânea múltipla e representativa (Padrão Ouro)',
          timing: 'Procedimento cirúrgico ambulatorial',
          detail:
            'Obter pelo menos 3 a 5 fragmentos teciduais representativos de lesões primárias ativas (eritema, placas, descamação), utilizando punch de 6 a 8 mm (ou 4 mm em plano nasal/coxins) ou biópsia incisional em cunha. Evitar o centro necrótico e ulcerado de lesões antigas. Jamais esmagar a amostra com pinças cirúrgicas traumáticas; segurar delicadamente pela gordura subcutânea para preservar a arquitetura dérmica.',
        },
        {
          label: '4. Histopatologia e Imuno-histoquímica (CD3 e CD20)',
          timing: 'Laboratório de patologia veterinária',
          detail:
            'A histopatologia avalia tropismo intraepidérmico (exocitose, microagregados de Pautrier) e adnexal vs infiltração dérmica profunda. O painel imuno-histoquímico com CD3 (linhagem T) e CD20/CD79a (linhagem B) é indispensável para classificar o tumor. Lembrar que até 54% dos linfomas T caninos podem apresentar marcação atípica de CD20 concomitante ao CD3.',
        },
        {
          label: '5. Estadiamento clínico e rastreio de doença sistêmica',
          timing: 'Pré-tratamento oncológico',
          detail:
            'Realizar hemograma completo com esfregaço manual (pesquisa de atipias e células de Sézary circulantes), bioquímica sérica completa com ênfase em ALT, ALP, bilirrubinas e albumina (avaliação de toxicidade pré-CCNU), cálcio total e ionizado (rastreio de hipercalcemia neoplásica), urinálise, punção aspirativa de linfonodos aumentados e exames de imagem (radiografia torácica em três projeções e ultrassonografia abdominal).',
        },
      ],
    },
  },
  etiology: {
    definicaoEClassificacao:
      'O linfoma cutâneo consiste em uma proliferação clonal maligna de linfócitos que se desenvolve primariamente ou atinge predominantemente a pele, anexos cutâneos, subcutâneo e junções mucocutâneas. A literatura oncológica e os consensos veterinários (Withrow & MacEwen, 6ª ed.; Nelson & Couto, 6ª ed.) dividem a afecção em duas grandes entidades biológicas: o Linfoma Cutâneo Epiteliotrópico (ECL ou eCTCL) e o Linfoma Cutâneo Não Epiteliotrópico (NECL). No eCTCL, os linfócitos neoplásicos exibem tropismo exclusivo ou preferencial pelo epitélio da epiderme e estruturas anexais (folículos pilosos e glândulas sebáceas/sudoríparas). Na espécie canina, praticamente todos os casos de eCTCL derivam de linfócitos T (CD3+). O eCTCL engloba historicamente três subtipos clínico-patológicos: Micose Fungoide (a forma clássica crônica que progride de máculas/placas até nódulos ulcerados), Reticulose Pagetoide (variante com predomínio intraepidérmico estrito, como na forma localizada de Woringer-Kolopp) e a Síndrome de Sézary (apresentação leucêmica sistêmica de eCTCL caracterizada por eritrodermia generalizada, linfadenopatia e linfócitos T neoplásicos circulantes com núcleo cerebriforme no sangue periférico). Em contrapartida, o NECL caracteriza-se por proliferação neoplásica concentrada na derme média, derme profunda e hipoderme/subcutâneo, com relativa preservação da epiderme superficial, podendo ter origem em linhagem T (linfoma de células T periféricas SOE, linfoma anaplásico de grandes células T ou linfoma T paniculite-símile) ou linhagem B (linfomas dérmicos de células B ricas em imunoblastos ou centroblastos).',
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
      'A pele funciona como um órgão imune ativo e altamente especializado (SALT — Skin-Associated Lymphoid Tissue), composto por queratinócitos imunocompetentes, células dendríticas epidérmicas de Langerhans, macrófagos dérmicos e linfócitos T residentes de memória (TRM). Em condições fisiológicas, subpopulações específicas de linfócitos T expressam moléculas de adesão e receptores de quimiocinas de homing tecidual, como o antígeno linfocitário cutâneo (CLA) e os receptores CCR4 e CCR10, que interagem com ligantes expressos no endotélio cutâneo e na epiderme (CCL17 e CCL27). Na patogenia do linfoma epiteliotrópico, o clone linfocitário T transformado preserva e hiperativa esse maquinário molecular de migração, infiltrando ativamente o epitélio escamoso estratificado da epiderme e os anexos foliculares. Estudos imunofenotípicos seminais demonstram que mais de 95% dos casos de eCTCL canino são compostos por linfócitos T de fenótipo citotóxico (CD3+, CD8+ e CD4-), com expressão marcante de moléculas associadas à citotoxicidade. Esse fenótipo citotóxico explica diretamente a agressão tecidual contínua aos queratinócitos adjacentes, gerando descolamento epidérmico, apoptose celular precoce e quebra profunda da barreira tegumentar.',
    varianteCitotoxicaInterface2026:
      'Uma das mais relevantes atualizações da literatura oncológica veterinária recente é a descrição por Smith et al. (2026) de uma variante agressiva de eCTCL canino caracterizada histologicamente por dermatite citotóxica de interface. Avaliando uma série de cães com lesões crostosas, descamativas, erosivas e ulceradas (metade dos quais com acometimento mucocutâneo grave), os autores demonstraram que os linfócitos neoplásicos CD3+ provocavam intensa satelitose em torno dos queratinócitos basais, culminando em apoptose massiva celular. Todos os casos exibiram confirmação clonal por PARR de receptor de células T. Esse achado representa um marco clínico fundamental: histologicamente, o quadro simula perfeitamente doenças imunomediadas e farmacodermias graves, como o eritema multiforme (EM), a necrólise epidérmica tóxica (TEN) e o lúpus eritematoso cutâneo. A regra prática moderna é clara: a presença de dermatite de interface ou queratinócitos apoptóticos em biópsias de cães com dermatopatias refratárias jamais exclui linfoma epiteliotrópico.',
  },
  epidemiology: {
    distribuicaoCanina:
      'No cão, o linfoma cutâneo corresponde a uma fração reduzida das neoplasias de pele, representando menos de 1% dos tumores cutâneos caninos e cerca de 3% a 8% de todos os linfomas diagnosticados na espécie (Withrow & MacEwen, 6ª ed.). Acomete tipicamente animais idosos, com idade mediana de diagnóstico situada entre 9 e 11 anos. Não se observa predisposição sexual consistente entre machos e fêmeas. Quanto à raça, dados compilados do acervo oncológico e séries clínicas internacionais identificam maior representação em Scottish Terrier, Boxer, Golden Retriever, Bulldog Inglês, Cocker Spaniel Inglês e Bichon Frisé. Em cães jovens, a ocorrência é extraordinariamente rara e deve motivar revisão diagnóstica criteriosa para afastar doenças reativas e linfocitose cutânea.',
    distribuicaoFelina:
      'Na espécie felina, o linfoma cutâneo é uma afecção notavelmente mais rara do que no cão, perfazendo apenas 0,2% a 3% de todos os linfomas diagnosticados em gatos. Na mais abrangente coorte retrospectiva multicêntrica contemporânea (Siewert et al., 2022), avaliando 41 gatos com linfoma cutâneo, a idade mediana ao diagnóstico foi de 12,3 anos, com predomínio de animais da raça doméstico de pelo curto (DSH). Diferentemente de outras formas anatômicas clássicas de linfoma felino (como o linfoma mediastinal e o linfoma multicêntrico de animais jovens), o linfoma cutâneo felino NÃO apresenta associação consistente com infecções retrovirais pelos vírus da Leucemia Viral Felina (FeLV) ou da Imunodeficiência Viral Felina (FIV), sendo a antigenemia viral positiva um achado incomum na rotina (Withrow & MacEwen, 6ª ed.).',
    fenotiposPeculiaresGato:
      'A medicina oncológica felina reconhece três padrões clínico-patológicos muito particulares que devem ser dominados pelo clínico: 1) Linfoma cutâneo clássico: pode ser epiteliotrópico ou não epiteliotrópico (predominantemente de células T), com a particularidade histológica de que o eCTCL felino frequentemente poupa os anexos foliculares em comparação ao padrão canino; 2) Linfoma associado a local de injeção: fenótipo documentado por Roccabianca et al. (2016) em 17 gatos que desenvolveram linfoma cutâneo/subcutâneo em sítios anatômicos típicos de administração de vacinas ou fármacos injetáveis (região interescapular e parede torácica lateral). Os autores evidenciaram padrões histológicos marcantes de necrose celular (16/17), angiocentricidade (13/17), angioinvasão (9/17) e angiodestruição (8/17). Essa apresentação reflete uma provável estimulação inflamatória crônica persistente propiciando transformação clonal, embora a relação de causalidade vacinal direta não esteja formalmente demonstrada; 3) Linfoma tarsal felino: entidade descrita por Burr et al. (2014) em série de 23 gatos que se manifesta como massas nodulares firmes ou lesões infiltrativas na região do tarso e membros distais de felinos idosos, simulando cistos sinoviais, infecções fúngicas ou sarcomas.',
    mimetizadorLinfocitoseCutanea:
      'A linfocitose cutânea (também denominada pseudolinfoma cutâneo, linfocitoma cutis ou hiperplasia linfoide cutânea) representa o maior mimetizador clínico e histopatológico do linfoma cutâneo em pequenos animais (Vet Sci, 2022). Caracteriza-se por um infiltrado dérmico exuberante de linfócitos pequenos a intermediários bem diferenciados, associados a alopecia, eritema, descamação e placas erosivas multifocais. Em estudo retrospectivo comparativo publicado na revista Animals/Vet Sci (2022), gatos com linfocitose cutânea demonstraram uma sobrevida mediana prolongada de aproximadamente 1080 dias, independentemente de receberem intervenções quimioterápicas agressivas ou apenas manejo de suporte. A afecção exibe curso clínico marcadamente indolente ou reativo. Mesmo a realização de testes de PARR pode demonstrar monoclonalidade clonal restrita em processos inflamatórios severos, reforçando que infiltrado linfocitário dérmico nunca é sinônimo automático de linfoma maligno.',
    figuraLinfocitoseDiferencial: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig7-linfocitose-cutanea-felina-diferencial-mdpi-2022.jpg',
      alt: 'Apresentações clínicas de linfocitose cutânea felina (pseudolinfoma)',
      caption: 'Figura — Apresentações clínicas de linfocitose cutânea felina, o principal diagnóstico diferencial do linfoma cutâneo. Observam-se áreas de alopecia generalizada e descamação (painel a), alopecia focal com ulcerações multifocais abdominais (painel b) e eritema com descamação periocular e palpebral (painel c). O quadro clínico pode ser indistinguível do eCTCL, exigindo histopatologia com imunofenotipagem e acompanhamento longitudinal da indolência biológica. Fonte: Vet Sci 2022, 9(1):26 (PMC8778986, CC BY 4.0).',
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
      'A fisiopatologia das lesões clínicas reflete a invasão anatômica do epitélio pelos linfócitos neoplásicos. Na fase macular inicial, a infiltração de precursores T ao longo da junção dermoepidérmica interfere na ancoragem dos melanócitos e na síntese de melanina pelos queratinócitos da camada basal. Isso desencadeia a clássica despigmentação do plano nasal, bordas labiais e coxins digitais (leucodermia neoplásica), frequentemente confundida com lúpus discoide ou vitiligo. À medida que o infiltrado celular se adensa, formam-se microagregados intraepidérmicos (microabscessos de Pautrier), que provocam acantose e hiperceratose esfoliativa, clinicamente traduzidas por descamação furfurácea profusa e placas eritematosas palpáveis. Quando os clones linfocitários rompem a membrana basal e formam densos blocos dérmicos, a microcirculação capilar superficial é ocluída, levando a isquemia, necrose de queratinócitos e ulcerações exsudativas extensas.',
    armadilhaDoPrurido:
      'Um dos erros diagnósticos mais frequentes na clínica médica é presumir que a presença de prurido exclui a possibilidade de neoplasia maligna cutânea. No linfoma epiteliotrópico, o prurido pode ser moderado a lancinante. Esse sinal decorre da destruição profunda da barreira cutânea, alteração na composição dos lipídios intercelulares do estrato córneo e liberação de citocinas inflamatórias pruriginosas (como IL-31 e citocinas T citotóxicas). A perda da barreira facilita a colonização bacteriana secundária por Staphylococcus pseudintermedius e a proliferação excessiva de leveduras do gênero Malassezia. Quando o médico veterinário prescreve glicocorticoides ou antibióticos, o alívio temporário do prurido e a melhora parcial das crostas costumam induzir a falsa convicção de que se tratava de uma alergia primária, atrasando o diagnóstico definitivo em até 6 a 12 meses.',
    sindromeDeSezary:
      'A Síndrome de Sézary constitui a variante leucêmica sistêmica do linfoma cutâneo de células T. Caracteriza-se pela tríade clínica de eritrodermia esfoliativa generalizada ("homem vermelho" / cão intensamente eritematoso), linfadenomegalia periférica generalizada e detecção de linfócitos T neoplásicos atípicos circulantes no sangue periférico. Essas células exibem núcleos hiperlobulados e convolutos, com aspecto cerebriforme típico ao microscópio óptico. Trata-se de uma condição rara em cães e excepcional em gatos, que denota estágio avançado de disseminação hematógena e falência do confinamento tecidual cutâneo, conferindo sobrevida marcadamente reduzida.',
  },
  clinicalSignsPathophysiology: {
    formaInicialEProgressao:
      'A apresentação clínica do linfoma cutâneo epiteliotrópico canino é notória por sua evolução cronológica trifásica característica (Withrow & MacEwen, 6ª ed.): 1) Estágio inicial esfoliativo/eritematoso: mimetiza perfeitamente dermatite atópica, reação adversa ao alimento ou piodermite superficial, cursando com eritema difuso, descamação generalizada (caspa fina a lamelar), alopecia em áreas de fricção e prurido de intensidade variável; 2) Estágio em placas e erosões: a derme e a epiderme tornam-se espessadas, palpando-se placas eritematosas infiltratedas e coalescentes, acompanhadas por erosões exsudativas, crostas e perda de pigmentação mucocutânea; 3) Estágio proliferativo tumoral avançado: surgimento de múltiplos nódulos e massas cutâneas avermelhadas ou violáceas que ulceram com facilidade, drenando secreção serossanguinolenta ou purulenta associada a infecções bacterianas oportunistas graves.',
    figuraEvolucaoRadioterapia: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig1-evolucao-clinica-radioterapia-deveau-2019.jpg',
      alt: 'Evolução clínica e resposta tumoral à radioterapia de pele total no cão',
      caption: 'Figura — Evolução clínica macroscópica de linfoma cutâneo epiteliotrópico canino (eCTCL) submetido a protocolo de radioterapia por feixe de fótons de corpo total. (a) Carga tumoral inicial exibindo múltiplas placas eritematosas, alopécicas e nodulares disseminadas pelo tronco. (b) Notável regressão das lesões após a quarta fração do tratamento. (c) Remissão progressiva e cicatrização do tegumento sem toxicidade cutânea limitante. Fonte: Deveau et al. (2019), BMC Vet Res 15:399 (PMC6842533, CC BY 4.0).',
      display: 'wide',
    },
    localizacoesAlerta:
      'Determinadas regiões anatômicas devem levantar suspeita imediata de linfoma cutâneo em animais idosos: 1) Face e plano nasal: despigmentação e perda do relevo arquitetural típico em paralelepípedo (pedras de calçamento), deixando o nariz liso, brilhante e ulcerado; 2) Margens labiais e junções mucocutâneas: espessamento endurecido, despigmentação completa em faixa e erosões nos ângulos da comissura labial; 3) Cavidade oral e gengivas: placas eritematosas, nódulos friáveis, despigmentação focal e gengivite proliferativa não explicada por periodontite; 4) Coxins e extremidades digitais: ceratose excessiva, despigmentação de margens metacarpianas/metatarsianas, fissuras dolorosas e onicodistrofia; 5) Pálpebras e região perianal: blefarite descamativa crônica com perda de cílios e eritema anogenital infiltrativo.',
    figuraDespigmentacaoMucocutanea: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig2-despigmentacao-mucocutanea-canvetj-2021.jpg',
      alt: 'Despigmentação do plano nasal e perda do relevo cobblestone',
      caption: 'Figura — Comprometimento facial característico no linfoma cutâneo epiteliotrópico canino: despigmentação profunda e perda da arquitetura reticulada normal (apagamento do aspecto em pedras de calçamento) do plano nasal e das junções mucocutâneas, conferindo aspecto liso e atrófico. Fonte: Can Vet J 2021; 62:771-774 (PMC8218949).',
      display: 'default',
    },
    figuraLabiosMucosaOral: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig3-labios-mucosa-oral-eritema-canvetj-2021.jpg',
      alt: 'Despigmentação labial e eritema de mucosa oral em cão com eCTCL',
      caption: 'Figura — Lesões mucocutâneas orais no eCTCL canino: bordas labiais com despigmentação completa e espessamento inflamatório tecidual, associadas a eritema intenso e microerosões na mucosa jugal e gengival. Fonte: Can Vet J 2021; 62:771-774 (PMC8218949).',
      display: 'default',
    },
    figuraCoxinsPatas: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig4-despigmentacao-coxins-patas-canvetj-2021.jpg',
      alt: 'Despigmentação de coxins digitais e carpais no eCTCL canino',
      caption: 'Figura — Acometimento de extremidades distais no linfoma cutâneo canino: despigmentação marginal evidente dos coxins metacarpianos e digitais, acompanhada por descamação e rarefação pilosa periarticular. Fonte: Can Vet J 2021; 62:771-774 (PMC8218949).',
      display: 'default',
    },
  },
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Reconhecimento clínico e suspensão programada de corticosteroides',
      description:
        'Triagem rigorosa em cães ou gatos idosos apresentando dermatite esfoliativa, despigmentação mucocutânea ou placas proliferativas resistentes ao tratamento convencional. É prioritário suspender glicocorticoides tópicos e sistêmicos por 2 a 3 semanas antes da realização da biópsia cutânea (Feline Emergency and Critical Care Medicine, 2ª ed.; Withrow & MacEwen, 6ª ed.). Os esteroides induzem apoptose seletiva e rápida em linfócitos neoplásicos, esvaziando o infiltrado tecidual e provocando laudos histopatológicos inconclusivos de dermatite inespecífica.',
      purpose: 'Garantir que a celularidade tumoral esteja preservada e evitar falsos-negativos diagnósticos.',
      interpretation: 'Se o paciente estiver em uso de corticoide recente e a biópsia for inespecífica, repetir a coleta após a janela de depuração medicamentosa.',
      limitations: 'Em pacientes com prurido lancinante ou automutilação grave, pode ser necessário controle provisório com anti-histamínicos ou banhos calmantes.',
    },
    {
      stepNumber: 2,
      title: 'Triagem parasitológica e microbiológica superficial',
      description:
        'Execução de raspado cutâneo profundo (pesquisa de Demodex canis / cati / gatoi), tricograma e citologia superficial por imprint ou fita adesiva para quantificar cocos bacterianos e leveduras de Malassezia. Realizar cultura fúngica se houver suspeita de dermatofitose associada. O objetivo fundamental nesta etapa é identificar e tratar infecções secundárias de barreira antes de proceder à biópsia definitiva.',
      purpose: 'Eliminar comorbidades infecciosas tratáveis e diminuir o infiltrado inflamatório exsudativo secundário.',
      interpretation: 'A presença de bactérias e leveduras em grande número apenas reflete quebra de barreira tegumentar e não descarta o linfoma subjacente.',
      limitations: 'Infecções bacterianas graves e necrose superficial mascaram o epitélio subjacente.',
    },
    {
      stepNumber: 3,
      title: 'Biópsia cutânea múltipla de espessura total (Padrão Ouro)',
      description:
        'Obtenção de fragmentos teciduais de pelo menos 3 a 5 sítios anatômicos representativos de lesões ativas (placas infiltradas, máculas eritematosas recentes e áreas de transição pele sã-pele alterada), utilizando punch cirúrgico de 6 a 8 mm de diâmetro (ou 4 mm exclusivamente em regiões nobres como plano nasal e coxins) ou biópsia incisional em cunha com bisturi (BSAVA Guide to Procedures, 3ª ed., 2024). Jamais coletar apenas a crosta superficial ou o centro ulcerado necrótico. Manipulação atraumática estrita: segurar o cilindro pela gordura subcutânea ou suspender delicadamente com agulha fina para evitar esmagamento tecidual.',
      isGoldStandard: true,
      purpose: 'Fornecer arquitetura histológica íntegra e profunda para avaliação diagnóstica definitiva.',
      interpretation: 'Amostras adequadas revelam relação derme-epiderme preservada e infiltrado celular representativo.',
      limitations: 'Biópsias superficiais (shave biopsy) ou tecidos esmagados por pinças impedem a correta visualização do tropismo celular.',
    },
    {
      stepNumber: 4,
      title: 'Histopatologia especializada e avaliação de epiteliotropismo',
      description:
        'Análise microscópica com coloração rotineira de hematoxilina e eosina (HE). No linfoma epiteliotrópico (eCTCL), busca-se exocitose de linfócitos atípicos de tamanho intermediário a grande infiltrando a epiderme, tropismo infundibular folicular e anexial, e agregados intraepidérmicos bem demarcados (microabscessos de Pautrier). Na variante de Smith et al. (2026), atentar para intensa dermatite citotóxica de interface com numerosos queratinócitos basais apoptóticos e satelitose linfocitária. No NECL, observa-se infiltrado denso em faixa ou nódulos na derme profunda e subcutâneo (paniculite-símile), com epiderme superficial livre (zona de Grenz).',
      purpose: 'Confirmar a natureza linfoide neoplásica e classificar o compartimento anatômico infiltrado.',
      interpretation: 'Identificação de infiltrado intraepidérmico atípico confirma eCTCL; infiltrado dérmico profundo orienta para NECL.',
      limitations: 'Fases muito iniciais podem mimetizar dermatite de interface inespecífica ou lúpus eritematoso.',
    },
    {
      stepNumber: 5,
      title: 'Painel de Imuno-histoquímica (CD3 e CD20/CD79a)',
      description:
        'Imunomarcação em cortes parafinados com anticorpos contra CD3 (marcador pan-linfocitário T) e CD20 ou CD79a (marcadores pan-linfocitários B). Aproximadamente 97% dos linfomas epiteliotrópicos caninos são CD3+ (linhagem T), com predomínio funcional citotóxico (CD8+). Nuance crítica do diagnóstico: entre 20% e 54% dos linfomas T caninos CD3+ podem apresentar marcação aberrante concomitante para CD20, de modo que a positividade isolada para CD20 jamais deve ser interpretada fora do contexto histológico e do CD3.',
      purpose: 'Definir a linhagem imune (T versus B) para direcionamento prognóstico e quimioterápico.',
      interpretation: 'Forte marcação CD3 intraepidérmica confirma eCTCL de células T; marcação CD20/CD79a dérmica profunda isolada define linfoma B.',
      limitations: 'Expressão aberrante de CD20 em células T pode induzir a classificação equivocada de tumor de células B se avaliado isoladamente.',
    },
    {
      stepNumber: 6,
      title: 'Teste molecular de clonalidade por PARR (PCR)',
      description:
        'Reação em cadeia da polimerase para rearranjo dos genes dos receptores de antígenos (PARR): avalia clonalidade do receptor de células T (TCR gamma) e da cadeia pesada de imunoglobulina (IgH). Populações linfoides reativas e inflamatórias são policlonais (múltiplos tamanhos de produtos de PCR), enquanto o linfoma deriva de um clone neoplásico dominante (pico monoclonal estreito e definido).',
      purpose: 'Auxiliar na diferenciação entre processo reativo inflamatório exuberante e neoplasia linfoide clonal.',
      interpretation: 'Pico monoclonal discreto reforça fortemente o diagnóstico de neoplasia em contexto clínico-histológico compatível.',
      limitations: 'Clonalidade NÃO equivale automaticamente a câncer (pode ocorrer em inflamações intensas por Ehrlichia, leishmaniose ou autoimunidade); resultados policlonais ocorrem por mutações nos sítios de primers ou baixa celularidade tumoral.',
    },
    {
      stepNumber: 7,
      title: 'Citopatologia de massas e punção aspirativa (FNA) de linfonodos',
      description:
        'Aspiração com agulha fina (FNA) de linfonodos regionais aumentados, nódulos cutâneos e massas teciduais palpáveis. Na citologia do eCTCL, observam-se linfócitos atípicos de tamanho intermediário a grande, moderada quantidade de citoplasma basofílico, projeções citoplasmáticas em cauda (uropódio), células em espelho de mão (hand-mirror) e núcleos pleomórficos indentados (Lee et al., 2026).',
      purpose: 'Triagem rápida de invasão nodal regional e caracterização celular de nódulos proliferativos.',
      interpretation: 'População monomórfica de linfoblastos atípicos em linfonodo regional confirma disseminação metastática.',
      limitations: 'Em lesões puramente eritematosas, descamativas ou planas, a citologia por fita ou raspado é rotineiramente inespecífica ou inconclusiva.',
    },
    {
      stepNumber: 8,
      title: 'Estadiamento hematológico, bioquímico e por imagem',
      description:
        'Hemograma completo com revisão manual de lâmina (pesquisa de anemia de doença inflamatória crônica, citopenias por invasão medular e células T cerebriformes circulantes da Síndrome de Sézary). Bioquímica sérica com dosagem de ALT, ALP, bilirrubinas, albumina, ureia e creatinina (estadiamento prévio e monitoramento de segurança da lomustina), além de cálcio total e ionizado (rastreio de hipercalcemia de malignidade). Urinálise e exames de imagem: radiografias torácicas em três projeções e ultrassonografia abdominal completa para descartar envolvimento visceral.',
      purpose: 'Determinar a extensão anatômica do tumor e estabelecer o perfil basal de segurança farmacológica.',
      interpretation: 'Presença de linfadenopatia intra-abdominal ou organomegalia espleno-hepática reclassifica a doença para estágio sistêmico avançado.',
      limitations: 'A hipercalcemia pode ocorrer sem secreção detectável de PTHrP, refletindo mecanismos osteolíticos ou citocínicos alternativos.',
    },
    {
      stepNumber: 9,
      title: 'Avaliação da medula óssea (Aspirado e Core Biopsy)',
      description:
        'Indicação estrita e individualizada para pacientes com citopenias periféricas inexplicadas (anemia não regenerativa, trombocitopenia, neutropenia), suspeita de Síndrome de Sézary, blastemia circulante ou necessidade de confirmação de estágio V antes de intervenções locais agressivas (BSAVA Oncology, 3ª ed.). O mielograma quantitativo avalia a porcentagem de linfócitos atípicos na medula.',
      purpose: 'Confirmar ou afastar infiltração medular terminal (estágio V da classificação da OMS).',
      interpretation: 'Infiltração de medula óssea superior a 5% por linfócitos atípicos comprova doença sistêmica generalizada.',
      limitations: 'Procedimento invasivo que exige sedação profunda ou anestesia geral; dispensável na rotina de doença estritamente cutânea inicial.',
    },
  ],
  treatment: {
    estratificacaoTerapeutica:
      'A decisão terapêutica inicial diante do linfoma cutâneo jamais deve ser orientada pela simples escolha empírica de um agente quimioterápico. O algoritmo clínico exige a separação rigorosa entre três cenários: 1) Doença solitária localizada: passível de controle local duradouro; 2) Doença multifocal difusa primária da pele: demanda quimioterapia sistêmica com tropismo cutâneo; 3) Doença com comprometimento sistêmico extracutâneo: exige protocolos para linfoma multicêntrico (Withrow & MacEwen, 6ª ed.).',
    doencaSolitariaLocalizada:
      'Para pacientes apresentando placa ou nódulo solitário sem evidência de acometimento em linfonodos ou órgãos internos após estadiamento completo, a intervenção local agressiva é o tratamento de primeira escolha. A ressecção cirúrgica com margens amplas (laterais de 2 a 3 cm e um plano fascial profundo não violado) proporciona períodos livres de doença prolongados e potencial controle curativo local. Quando a lesão localiza-se em áreas de difícil reconstrução cirúrgica (como plano nasal, lábios, pálpebras ou extremidades distais), a radioterapia de megavoltagem fracionada atua como modalidade preferencial, permitindo erradicação tumoral com excelente preservação estética e funcional (Withrow & MacEwen, 6ª ed.; Chan et al., 2018).',
    lomustinaCCNU:
      'Na doença cutânea disseminada e multifocal em cães, a Lomustina (CCNU) é o fármaco quimioterápico que detém o maior e mais consistente corpo de evidência clínica retrospectiva na oncologia veterinária (Risbon et al., 2006; Nelson & Couto, 6ª ed.). Trata-se de uma nitrosureia lipofílica que atravessa barreiras teciduais e atinge concentrações dérmicas terapêuticas elevadas por alquilação do DNA tumoral. No estudo seminal de Risbon et al. (2006) com 46 cães com eCTCL, a dose mediana inicial utilizada foi de 60 mg/m2 por via oral a cada 3 semanas (intervalo de 30 a 95 mg/m2), resultando em uma taxa de resposta objetiva global (ORR) de 83% (15 respostas completas [CR] e 23 respostas parciais [PR]), com duração mediana de resposta de 94 dias. Textos históricos como o BSAVA Oncology citam 70 mg/m2 VO q3sem, mas a prática contemporânea individualiza a dose entre 50 e 60 mg/m2 para mitigar eventos adversos graves. Manejo e toxicidade: a lomustina impõe dois grandes riscos clínicos: 1) Mielossupressão aguda dose-limitante: o nadir de neutrófilos ocorre tipicamente entre 7 e 10 dias pós-administração (podendo ser tardio, em 14 dias), exigindo hemograma prévio obrigatório a cada ciclo (neutrófilos devem estar estritamente >2.500/uL e plaquetas >100.000/uL para liberar a dose); 2) Hepatotoxicidade cumulativa crônica: pode culminar em insuficiência hepática irreversível, sendo obrigatória a dosagem sérica de ALT, ALP e bilirrubinas antes de cada aplicação e o uso rotineiro de hepatoprotetores associados (S-adenosilmetionina [SAMe] e silibina). A falha do protocolo ocorre rotineiramente em 3 a 4 meses por resistência tumoral adquirida.',
    retinoidesIsotretinoina:
      'Os retinoides sintéticos atuam ligando-se a receptores nucleares de ácido retinoico (RAR e RXR), modulando a transcrição gênica, inibindo a proliferação celular de queratinócitos e linfócitos, e induzindo diferenciação terminal e apoptose no compartimento tegumentar. A Isotretinoína foi avaliada por Ramos et al. (2022) em 12 cães com eCTCL na dose de 1 a 2 mg/kg VO a cada 24 horas. Os autores observaram uma taxa de benefício clínico de 58% (33% de remissão completa e 25% de remissão parcial), com perfil de segurança favorável (eventos adversos leves em 25% dos cães, como queilite e elevação transitória de enzimas hepáticas). Trata-se de uma excelente opção adjuvante ou alternativa para pacientes com contraindicação a fármacos mielotóxicos ou hepatotóxicos, embora a evidência atual seja sustentada por casuísticas pequenas.',
    inibidorNuclearVerdinexor:
      'O Verdinexor é um inibidor seletivo de exportação nuclear (SINE) que bloqueia a exportina-1 (XPO1). Ao inibir a XPO1, impede o transporte de proteínas supressoras de tumor (como p53, p21 e IκB) do núcleo para o citoplasma, forçando seu acúmulo no núcleo celular e ativando vias apoptóticas em linfócitos neoplásicos. Vlodaver et al. (2024) conduziram um ensaio clínico piloto aberto com 8 cães virgens de tratamento com eCTCL na posologia de 1,28 a 1,45 mg/kg VO duas vezes por semana, com intervalo mínimo de 72 horas entre doses. A taxa de controle clínico (CR + PR + estabilização da doença) atingiu 75%, com tempo médio até progressão de 56 ± 41 dias. Os efeitos adversos mais comuns incluíram anorexia transitória, perda de peso e letargia. O fármaco posiciona-se como terapia oral inovadora para resgate ou manejo paliativo quando a lomustina falha ou não pode ser prescrita.',
    radioterapiaAvancada:
      'A radioterapia desponta como modalidade essencial em dois cenários: como radioterapia focal de megavoltagem (elétrons ou fótons) para lesões solitárias ou mucocutâneas difíceis de excisar cirurgicamente, e como radioterapia de pele total por feixe de elétrons ou fótons (Total Skin Electron/Photon Therapy — TSE/TSPT). Conforme demonstrado por Deveau et al. (2019) em cão com eCTCL generalizado, a irradiação homogênea do envelope tegumentar superficial promoveu regressão rápida e progressiva de todas as placas tumorais sem mielossupressão sistêmica profunda, proporcionando excelente sobrevida com qualidade de vida. Trata-se de uma técnica refinada disponível em centros oncológicos veterinários de alta complexidade.',
    glicocorticoidesEPaliacao:
      'A Prednisona ou Prednisolona (1 a 2 mg/kg VO a cada 24 horas inicialmente, com desmame para 0,5 a 1 mg/kg em dias alternados) desempenha papel central no alívio sintomático: reduz o edema tumoral, atenua o prurido inflamatório associado e induz citotoxicidade linfocitária parcial. Entretanto, os tutores devem ser orientados de que a corticoterapia isolada NÃO constitui tratamento oncológico definitivo e acarreta falha terapêutica precoce em poucas semanas por seleção de clones refratários. O suporte paliativo deve integrar banhos medicinais com clorexidina e hidratação cutânea para prevenção de piodermites oportunistas e analgesia sistêmica.',
    peculiaridadesGatos:
      'Na espécie felina, os dados terapêuticos publicados são escassos e a extrapolação de doses caninas é perigosa (Withrow & MacEwen, 6ª ed.; Siewert et al., 2022). Em lesões solitárias (inclusive linfoma tarsal), a ressecção cirúrgica com margens amplas ou radioterapia é o padrão de escolha. Na doença difusa, a Lomustina já foi empregada em gatos na dose empírica de 40 a 50 mg/m2 VO a cada 3 a 4 semanas (ou doses fixas de 8 a 10 mg/gato), exigindo monitoramento respiratório estrito devido ao risco clássico de fibrose pulmonar idiopática fatal induzida por CCNU em gatos. Protocolos com clorambucila associada à prednisolona constituem opções orais bem toleradas para doença linfocítica de baixo grau. Séries multicêntricas (Siewert et al., 2022) ressaltam a heterogeneidade da resposta e a ausência de protocolo padrão ouro validado na espécie felina.',
  },
  complications: {
    infeccoesSecundarias:
      'A quebra física crônica do estrato córneo e a imunossupressão local pelas células tumorais propiciam infecções bacterianas graves e recidivantes por Staphylococcus pseudintermedius, Pseudomonas aeruginosa e dermatofitoses oportunistas. A colonização massiva por Malassezia pachydermatis agrava o ciclo de prurido e automutilação, podendo culminar em bacteremia e sepse em pacientes sob quimioterapia mielossupressora.',
    disseminacaoVisceral:
      'Embora o eCTCL permaneça confinado à pele por meses, a progressão biológica tardia invade linfonodos regionais e tecidos viscerais (baço, fígado, pulmões e medula óssea), acompanhada por perda de peso progressiva, caquexia neoplásica, hipoalbuminemia severa por exsudação cutânea e insuficiência hepática terminal.',
    toxicidadeMedicamentosa:
      'O emprego repetido de lomustina (CCNU) acarreta toxicidade cumulativa hepática caracterizada por necrose de hepatócitos, cirrose medicamentosa e falência hepática, além de episódios de neutropenia febril grave que demandam internação imediata em UTI e terapia antimicrobiana parenteral de amplo espectro.',
    figuraHistopatologiaTropismo: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig5-histopatologia-tropismo-epitelial-lee-2026.jpg',
      alt: 'Histopatologia do eCTCL: afinidade epitelial e infiltração na camada basal',
      caption: 'Figura — Exame histopatológico de lesão proliferativa no eCTCL canino: (A) As células neoplásicas exibem acentuada afinidade epitelial (tropismo), infiltrando a camada basal da epiderme e estendendo-se entre feixes musculares e conjuntivos adjacentes com padrão infiltrativo invasivo não encapsulado (HE, barra = 200 um). (B) Presença de células gigantes neoplásicas multinucleadas com núcleos atípicos e pleomorfismo marcante (HE, barra = 50 um). Fonte: Lee et al. (2026), J Vet Sci 27(1):e11 (PMC12891818, CC BY-NC 4.0).',
      display: 'wide',
    },
    figuraCitologiaAtipias: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/linfoma-cutaneo/fig6-citologia-fna-atipias-uropodio-lee-2026.jpg',
      alt: 'Citopatologia por FNA de eCTCL canino: uropódio e células em espelho de mão',
      caption: 'Figura — Achados citopatológicos por punção aspirativa (FNA) no eCTCL canino: (A) Células linfoides com caudas citoplasmáticas características (uropódio) e formato em espelho de mão (seta). (B) Célula neoplásica gigante com cariomegalia marcante, medindo cerca de 8 vezes o diâmetro de uma hemácia. (C) Célula multinucleada contendo granulações eosinofílicas citoplasmáticas e figura mitótica atípica (ponta de seta). (D) Célula com uropódio e moldagem nuclear típica (Diff-Quik, barras = 20 a 50 um). Fonte: Lee et al. (2026), J Vet Sci 27(1):e11 (PMC12891818, CC BY-NC 4.0).',
      display: 'wide',
    },
  },
  prevention: {
    vigilanciaPrecoce:
      'Não há prevenção primária contra mutações clonais esporádicas de linfócitos em cães e gatos. O pilar fundamental é a vigilância clínica diagnóstica precoce: qualquer paciente geriátrico (cães >= 8 anos e gatos >= 10 anos) apresentando dermatopatia descamativa, eritematosa ou pruriginosa que não apresente remissão completa e sustentada após 4 a 6 semanas de conduta clínica habitual DEVE ser submetido a biópsias cutâneas múltiplas antes de receber diagnósticos presuntivos sucessivos de "alergia senil". Na espécie felina, recomenda-se a aplicação estrita das diretrizes da AAFP para vacinação em membros distais, prevenindo intervenções mutilantes caso ocorram neoplasias associadas ao sítio de injeção.',
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
