import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const colangiteParasitariaCaesGatosRecord: DiseaseRecord = {
  id: 'disease-colangite-parasitaria-caes-gatos',
  slug: 'colangite-parasitaria-caes-gatos',
  title: 'Colangite Parasitária',
  subtitle:
    'Colangite crônica associada a trematódeos hepatobiliares (Platynosomum spp., Opisthorchis spp., Clonorchis sinensis, Amphimerus spp.) — patogenia biliar, diagnóstico multimodal e terapêutica auditada em cães e gatos',
  synonyms: [
    'Colangite parasitária felina e canina',
    'Platinossomose felina',
    'Platinossomíase',
    'Lizard poisoning disease',
    'Platynosomum illiciens',
    'Platynosomum fastosum',
    'Platynosomum concinnum',
    'Liver fluke cholangitis',
  ],
  species: ['dog', 'cat'],
  category: 'gastroenterologia',
  categories: ['gastroenterologia', 'infecciosas', 'medicina-felina', 'urgencia-emergencia'],
  tags: ['Cães e Gatos'],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['colangite-parasitaria-caes-gatos'],

  quickSummary:
    'A colangite parasitária é uma inflamação crônica das vias biliares causada pela permanência de trematódeos hepatobiliares, levando à hiperplasia epitelial ductal, fibrose periductal, estase e risco de obstrução biliar extra-hepática e falência hepatobiliar. No Brasil e em áreas tropicais, o principal agente em gatos é Platynosomum spp. (P. illiciens / P. fastosum; família Dicrocoeliidae), adquirido pela predação de hospedeiros paratênicos como lagartixas após ciclo em moluscos terrestres e isópodes. Em cães e gatos de áreas endêmicas piscícolas, trematódeos da família Opisthorchiidae (Opisthorchis spp., Clonorchis sinensis, Metorchis spp.) e Amphimerus spp. associam-se ao consumo de peixes de água doce crus. Como a eliminação fecal de ovos é intermitente e cessante na obstrução completa, exames fecais negativos não excluem a doença; o diagnóstico exige integração de epidemiologia, enzimas hepatobiliares, ultrassonografia, sedimentação/centrifugação apropriada e, em casos selecionados, análise direta da bile, histopatologia ou PCR.',

  quickDecisionStrip: [
    'Fezes negativas não excluem infecção: ovos operculados pesados falham na flutuação passiva simples e param de chegar ao intestino quando há obstrução biliar completa.',
    'Eosinofilia periférica é inconsistente: infecções crônicas e graves ocorrem com hemograma inteiramente normal (como na maioria dos casos da série UNESP 2025).',
    'Ultrassom não confirma etiologia: dilatação ductal (> 4 mm em gatos) e parede vesicular espessada ocorrem também em colangite neutrofílica, linfocítica e pancreatite.',
    'Praziquantel exige dose trematocida específica e não garante cura: doses para cestódeos (5 mg/kg) falham; mesmo 20 mg/kg IM × 3 d curam apenas 3/6 gatos por contagem de parasitos vivos.',
    'Obstrução biliar com icterícia progressiva e coagulopatia é emergência: corrigir vitamina K1 antes de biópsias/colecistocentese e evitar ácido ursodesoxicólico se a via estiver bloqueada.',
    'Controle de exposição é obrigatório após tratar: nenhum protocolo antiparasitário confere imunidade contra reinfecção ao voltar a caçar lagartixas ou ingerir peixe cru.',
  ],

  quickSummaryRich: {
    integratedOverview: true,
    lead:
      'Classificada pela WSAVA como categoria própria de doença inflamatória biliar ao lado das formas neutrofílica e linfocítica, a colangite parasitária exige raciocínio em camadas: ==a eliminação fecal de ovos pode cessar na obstrução e reduzir após tratamento sem que os adultos tenham sido erradicados==. A abordagem segura integra anamnese predatória/alimentar, proteção nutricional precoce contra lipidose felina, prevenção de hemorragia por deficiência de vitamina K e decisão criteriosa entre terapia médica, drenagem biliar ou cirurgia descompressiva.',
    leadHighlights: [
      'a eliminação fecal de ovos pode cessar na obstrução',
      'proteção nutricional precoce contra lipidose felina',
      'decisão criteriosa entre terapia médica, drenagem biliar ou cirurgia descompressiva',
    ],
    pillars: [
      {
        title: 'Diagnóstico',
        body:
          'Combinar epidemiologia (caça de lagartixas em gatos; peixe cru em cães/gatos), perfil hepatobiliar, ultrassom e coproparasitológico por sedimentação ou dupla centrifugação (Sheather SG 1,28); recorrer à análise direta de bile quando negativo.',
        highlights: ['sedimentação ou dupla centrifugação (Sheather SG 1,28)', 'análise direta de bile'],
      },
      {
        title: 'Emergência e Risco',
        body:
          'Rastrear obstrução biliar extra-hepática (EHBO), colangite bacteriana secundária (E. coli), lipidose hepática secundária à anorexia e coagulopatia responsiva à vitamina K1.',
        highlights: ['obstrução biliar extra-hepática (EHBO)', 'vitamina K1'],
      },
      {
        title: 'Terapêutica Auditada',
        body:
          'Usar praziquantel em regime trematocida (ex.: 20 mg/kg SC/IM × 3 d ou 30 mg/kg VO × 5–10 d), suporte enteral sem jejum, UDCA apenas com fluxo patente e controle ambiental da caça.',
        highlights: ['20 mg/kg SC/IM × 3 d ou 30 mg/kg VO × 5–10 d', 'UDCA apenas com fluxo patente'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxograma Diagnóstico — Da Triagem Clínica à Análise Direta da Bile',
      steps: [
        {
          label: '1. Epidemiologia, bioquímica hepatobiliar e hemostasia',
          timing: 'Avaliação inicial',
          detail:
            'Investigar caça de lagartixas/anfíbios (gatos) ou consumo de peixes de água doce crus (cães/gatos). Avaliar ALT, AST, FA, GGT, bilirrubinas, albumina e TP/TTPA — lembrando que FA discreta ou normal em gatos não exclui colangite grave.',
        },
        {
          label: '2. Ultrassonografia hepatobiliar e pesquisa fecal concentrada',
          timing: 'Imagem e fezes',
          detail:
            'Buscar dilatação do colédoco (> 4 mm em gatos), espessamento vesicular, lama biliar e alterações pancreáticas. Colher fezes seriadas para sedimentação formalina-éter ou dupla centrifugação em Sheather (SG 1,28), sabendo que obstrução total impede chegada dos ovos ao intestino.',
        },
        {
          label: '3. Colecistocentese ecoguiada, cultura, histopatologia ou PCR',
          timing: 'Confirmação direta',
          detail:
            'Diante de fezes negativas com suspeita firme e via segura (sem necrose vesicular, mucocele ou coagulopatia), analisar bile (ovos operculados + cultura aeróbica/anaeróbica) ou obter biópsia multilobar e PCR (ITS2/cox1).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico — Estabilização, Trematocida e Desobstrução',
      steps: [
        {
          label: '1. Estabilização, vitamina K1 e suporte enteral precoce',
          timing: 'Primeiras horas',
          detail:
            'Corrigir hidratação sem sobrecarga volêmica felina, controlar náuseas e dor, administrar vitamina K1 (0,5 mg/kg SC q12h × 3 d se colestase grave ou antes de biópsia) e iniciar dieta enteral fracionada (20% RER no Dia 1 para prevenir lipidose e síndrome de realimentação).',
        },
        {
          label: '2. Praziquantel trematocida auditado e terapia adjuvante seletiva',
          timing: 'Paciente estável',
          detail:
            'Usar praziquantel 30 mg/kg VO q24h × 5–10 d ou 20 mg/kg SC/IM q24h × 3 d; iniciar UDCA (15 mg/kg/dia VO) somente após descartar EHBO completa e reservar antibióticos para bactibilia/sepse documentada.',
        },
        {
          label: '3. Desobstrução cirúrgica e bloqueio à reinfecção',
          timing: 'Casos refratários / alta',
          detail:
            'Indicar cirurgia descompressiva diante de EHBO fixa, fezes acólicas persistentes ou peritonite biliar; orientar telamento e prevenção de caça a répteis/peixe cru após alta.',
        },
      ],
    },
  },

  etiology: {
    cpDefinicaoEClassificacaoWsava:
      'Para interpretar corretamente a enfermidade e evitar erros terapêuticos, é preciso distinguir três termos anatômicos que frequentemente se sobrepõem:\n\n' +
      '- ==Colangite==: inflamação dos ductos biliares intra ou extra-hepáticos.\n' +
      '- ==Colecistite==: inflamação da vesícula biliar (frequentemente associada à estase e infecção em gatos, rara em cães).\n' +
      '- ==Colangio-hepatite==: extensão do processo inflamatório das vias biliares além da placa limitante para o parênquima hepático periportal adjacente.\n\n' +
      'A ==WSAVA Liver Standardization Group== reconhece a colangite crônica associada a trematódeos hepatobiliares como uma entidade própria distinta das colangites neutrofílica e linfocítica, embora clínica e ultrassonografia se sobreponham amplamente {{ref:ref-wsava-2006}}.',
    cpTabelaClassificacaoWsava: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Classificação histopatológica da WSAVA para doenças biliares felinas',
      headers: ['Categoria WSAVA', 'Mecanismo / Etiologia predominante', 'Achados histopatológicos característicos', 'Diagnóstico definitivo'],
      rows: [
        [
          'Colangite neutrofílica aguda',
          'Infecção bacteriana ascendente do intestino delgado (E. coli, Enterococcus, Bacteroides)',
          'Neutrófilos no lúmen/epitélio ductal, edema e inflamação periportal (eventual abscesso)',
          'Citologia e cultura de bile.',
        ],
        [
          'Colangite neutrofílica crônica',
          'Persistência infecciosa crônica ou sobreposição imunomediada',
          'Infiltrado misto portal (neutrófilos, linfócitos, plasmócitos), proliferação ductal e fibrose variável',
          'Histopatologia hepática (sensibilidade biliar limitada).',
        ],
        [
          'Colangite linfocítica',
          'Indeterminada (suspeita imunomediada crônica)',
          'Infiltração portal por pequenos linfócitos (predomínio T com agregados B), fibrose variável',
          'Histopatologia hepática (diferenciar de linfoma de pequenas células por PARR).',
        ],
        [
          'Colangite parasitária crônica',
          'Trematódeos residentes nas vias biliares (Platynosomum spp., Opisthorchiidae)',
          'Ductos dilatados com projeções papilares/hiperplasia adenomatosa, fibrose periductal acentuada e inflamação mista; ovos ou adultos no lúmen',
          'Ultrassom + exposição + ovos nas fezes ou bile; histopatologia ou PCR confirmatório {{ref:ref-wsava-2006}}.',
        ],
      ],
    },
    cpPrincipaisParasitosETaxonomia:
      'Há uma distinção taxonômica essencial para não confundir ciclos biológicos entre trematódeos hepatobiliares: ==Platynosomum spp. pertence à família Dicrocoeliidae==, enquanto ==Opisthorchis, Clonorchis, Amphimerus e Metorchis pertencem à família Opisthorchiidae==.\n\n' +
      '- ==Nomenclatura recomendada no prontuário==: usar *Platynosomum spp.* / platinossomose felina (sinonímia histórica entre *P. fastosum*, *P. illiciens* e *P. concinnum*, com *P. illiciens* adotado em estudos moleculares recentes usando *ITS2* e *cox1* como em Chantawong et al., 2024 e Campos-Camacho et al., 2026) {{ref:ref-chantawong-2024}} {{ref:ref-campos-2026}}.\n' +
      '- ==Trematódeos de peixes de água doce (Opisthorchiidae)==: *Opisthorchis felineus*, *O. viverrini*, *Clonorchis sinensis*, *Metorchis* spp. e *Amphimerus pseudofelineus* acometem gatos, cães e outros mamíferos piscívoros em suas respectivas áreas endêmicas.\n' +
      '- ==Diagnósticos parasitários diferenciais não dicrocelídeos==: *Eurytrema procyonis* coloniza ductos pancreáticos (e ocasionalmente biliares) de gatos na América do Norte; já *Heterobilharzia americana* habita vênulas mesentéricas em cães, produzindo granulomas portais por embolização de ovos e hipercalcemia ocasional (7% em série canina), não sendo uma colangite biliar primária.',
    cpMorfologiaAdultoEFigura: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/platinosomose-felina/parasito-adulto-platynosomum-lathroum2018.png',
      alt: 'Exemplar adulto de Platynosomum fastosum recuperado do fígado de gato naturalmente infectado',
      shortCaption: 'Fig. 1 — Platynosomum adulto recuperado das vias biliares felinas (Lathroum et al., 2018).',
      caption:
        'Figura 1 — Exemplar adulto de Platynosomum fastosum (sin. P. illiciens) recuperado das vias biliares de um gato naturalmente infectado. O corpo achatado dorsoventralmente, foliáceo e não segmentado (poucos milímetros de comprimento), distingue-o imediatamente de cestódeos intestinais e permite o alojamento simultâneo de dezenas de exemplares no lúmen dos ductos e na vesícula biliar. Fonte: Lathroum et al. (2018), Veterinary Sciences 5(2):35 (CC BY 4.0).',
      display: 'centered',
    },
  },

  epidemiology: {
    cpEpidemiologiaEBrasil:
      'A distribuição da platinossomose acompanha o clima tropical e subtropical favorável aos moluscos e isópodes vetores, ocorrendo de forma endêmica em todo o Brasil, Caribe, sudeste dos Estados Unidos (Flórida e Havaí) e Sudeste Asiático, sem relatos autóctones descritos na Europa.\n\n' +
      '- ==Mito do gato exclusivamente de apartamento==: embora acesso externo e comportamento de caça sejam os principais preditores, animais domiciliados que predam lagartixas (*Hemidactylus* spp. — lagartixa-de-parede) em jardins, quintais ou varandas também se infectam.\n' +
      '- ==Heterogeneidade de prevalência==: populações ferais em ilhas endêmicas (como St. Kitts) atingiram até ~81% de positividade fecal em estudos clássicos, enquanto coortes hospitalares selecionadas por aumento de enzimas hepáticas registram taxas menores e altamente dependentes do método coproparasitológico empregado {{ref:ref-koster-2016}}.\n' +
      '- ==Fatores de risco e vermifugação==: uso rotineiro de anti-helmínticos em dose única cestocida (5 mg/kg de praziquantel) ou lactonas macrocíclicas isoladas NÃO elimina trematódeos hepatobiliares; histórico de vermifugação mensal não descarta colangite parasitária.',
    cpEstudoChantawong2024:
      'No estudo observacional de Chantawong et al. (2024) avaliando 43 gatos com ALT sérica elevada na Tailândia {{ref:ref-chantawong-2024}}:\n\n' +
      '- ==Positividade==: 5/43 gatos (11,63%; IC 95%: 4,70–25,58%) apresentaram ovos de *Platynosomum illiciens* confirmados por morfologia, PCR (*ITS2*/*cox1*) e sequenciamento.\n' +
      '- ==Eosinofilia vs. enzimas==: os gatos infectados apresentaram contagens de eosinófilos significativamente superiores (p = 0,014), porém ALT e FA não diferiram estatisticamente dos gatos negativos — provando que a amplitude enzimática isolada não separa etiologia parasitária de outras hepatopatias.\n' +
      '- ==Análise multivariada==: ausência de vermifugação associou-se à positividade (OR = 15,95; limite inferior IC 95% = 1,40), porém com amostra pequena e apenas cinco positivos, devendo ser interpretada como sinal epidemiológico e não comprovação de eficácia preventiva de esquemas padrão.',
  },

  pathogenesisTransmission: {
    cpCicloBiologicoETransmissao:
      'O ciclo biológico de *Platynosomum* spp. não ocorre por contato direto entre gatos nem por ingestão imediata de ovos fecais; ele exige desenvolvimento sequencial em hospedeiros invertebrados terrestres antes do acesso ao hospedeiro definitivo {{ref:ref-pinto-2014}}:\n\n' +
      '1. ==Eliminação fecal==: adultos hermafroditas nos ductos biliares produzem ovos operculados embrionados que descem com a bile ao duodeno e saem nas fezes.\n' +
      '2. ==1º hospedeiro intermediário (molusco terrestre)==: caracóis como *Subulina octona* ingerem os ovos e liberam miracídios, evoluindo até esporocistos.\n' +
      '3. ==2º hospedeiro intermediário (isópode terrestre)==: crustáceos como tatuzinhos-de-jardim (*Oniscidea* / *Nagurus* spp.) ingerem os estágios larvais e abrigam a ==metacercária infectante== — esclarecido experimentalmente por Pinto, Mati & Melo (2014), corrigindo literatura mais antiga que apontava a lagartixa como 2º hospedeiro intermediário {{ref:ref-pinto-2014}}.\n' +
      '4. ==Hospedeiro paratênico (lagartixa, lagarto ou anfíbio)==: répteis (*Hemidactylus*, *Anolis*, *Tropidurus*) e sapos (*Bufo*) ingerem isópodes infectados e acumulam metacercárias viáveis em vísceras/bile sem maturação sexual do verme.\n' +
      '5. ==Hospedeiro definitivo e migração==: após ingestão do réptil ou isópode, as metacercárias desencistam no duodeno, ==migram retrogradamente pela papila duodenal até ductos biliares e vesícula== e atingem maturidade sexual após período pré-patente aproximado de ==8 a 12 semanas==.\n\n' +
      'Para trematódeos da família Opisthorchiidae (*Opisthorchis*, *Clonorchis*, *Metorchis*, *Amphimerus*) em ==cães e gatos==, os 1ºs hospedeiros são moluscos aquáticos e os 2ºs hospedeiros são peixes de água doce portando metacercárias musculares.',
    cpAnatomiaBiliarComparadaCaesGatos:
      'As diferenças anatômicas entre cães e gatos explicam por que a colangite biliar crônica tem expressão tão mais frequente nos felinos:\n\n' +
      '- ==Anatomia felina (ampola comum e ducto longo)==: o ducto biliar comum (colédoco) do gato é proporcionalmente mais longo e tortuoso e ==funde-se com o ducto pancreático principal em uma ampola comum== antes de desembocar na papila duodenal maior em cerca de 80% dos animais (apenas ~20% têm ducto acessório patente). Isso facilita refluxo duodenobiliar, pancreatite concomitante, espasmo do esfíncter de Oddi e ==tríade felina==.\n' +
      '- ==Anatomia canina (drenagem separada)==: no cão, o colédoco entra na papila duodenal maior junto apenas ao ducto pancreático menor, enquanto o ducto pancreático acessório (via principal) drena separadamente ~2 cm distalmente na papila menor.\n' +
      '- ==Falha das defesas biliares==: normalmente, fluxo contínuo da bile (*flushing*), sais biliares bactericidas, IgA secretora, junções oclusivas, células de Kupffer e tônus do esfíncter de Oddi mantêm a árvore biliar protegida. Quando parasitos distendem ductos e provocam estase e lesão epitelial, ocorre ruptura dessa barreira e predisposição à ==infecção bacteriana ascendente polimicrobiana== (*E. coli*, *Enterococcus*, *Bacteroides*, *Clostridium*).',
  },

  pathophysiology: {
    cpFisiopatogeniaEtapasBiliares:
      'Experimentalmente, lesões microscópicas surgem já a partir de ~3 semanas pós-infecção e progridem em cascata contínua conforme carga parasitária e resposta do hospedeiro:\n\n' +
      '1. ==Injúria mecânica e inflamatória inicial==: ventosas e movimentação dos trematódeos irritam os colangiócitos, recrutando neutrófilos e eosinófilos com edema e distensão ductal.\n' +
      '2. ==Hiperplasia epitelial adenomatosa e papilar==: estimulação crônica induz proliferação exagerada do revestimento biliar em pregas e projeções papilares que estreitam o lúmen ductal {{ref:ref-koster-2016}}.\n' +
      '3. ==Fibrose periductal e colangite esclerosante==: miofibroblastos portais depositam colágeno concêntrico; embora gatos sejam mais resistentes à cirrose do que cães, ==a infecção intensa por trematódeos é uma das poucas causas reconhecidas de colangite esclerosante / cirrose biliar felina==, paradoxalmente cursando com hepatomegalia radiográfica pela extensa dilatação ductal e fibrose periportal.\n' +
      '4. ==Colestase mista e estresse hepatocelular==: soma de fatores intraluminais (parasitos, ovos, muco, bile espessada), murais (edema, hiperplasia, estenose fibrótica) e extraluminais (pancreatite/duodenite adjacente). O acúmulo de ==ácidos biliares hidrofóbicos citotóxicos== promove dano de membrana, estresse oxidativo e necrose hepatocelular secundária — elevando ALT e AST mesmo sendo doença primária de ductos.',
    cpColangiocarcinomaEFibrose:
      'Além de hipertensão portal, ascite e insuficiência sintética em casos fibrosantes tardios, a agressão proliferativa crônica guarda associação anatomopatológica com transformação neoplásica {{ref:ref-andrade-2012}} {{ref:ref-xavier-2007}}:\n\n' +
      '- ==Proliferação pré-neoplásica e colangiocarcinoma==: à semelhança de *Opisthorchis viverrini* e *Clonorchis sinensis* em humanos, há séries anatomopatológicas brasileiras em gatos (Andrade et al., 2012) documentando hiperplasia atípica, displasia biliar e ==colangiocarcinoma invasivo associado à infecção por Platynosomum spp.== {{ref:ref-andrade-2012}}.\n' +
      '- ==Doença cística biliar adquirida==: obstruções prolongadas podem originar cistos biliares adquiridos volumosos simulando doença policística congênita ou tumores hepáticos císticos (Xavier et al., 2007) {{ref:ref-xavier-2007}}.\n' +
      '- ==Risco populacional==: a relação é respaldada por séries histopatológicas, mas não há estimativa epidemiológica validada do risco percentual individual em gatos infectados.',
  },

  clinicalSignsPathophysiology: {
    groups: [
      {
        system: 'Hepatobiliares e Colestáticos',
        findings: [
          {
            finding: 'Icterícia de mucosas, esclera e pele + colúria',
            frequency: '5/6 na série UNESP 2025',
            clinicalMeaning:
              'Retenção de bilirrubina conjugada por colestase intra ou extra-hepática; fração hidrossolúvel filtrada pelos rins escurece a urina {{ref:ref-sato-2025}}.',
          },
          {
            finding: 'Hepatomegalia e desconforto em abdome cranial',
            frequency: '2/6 à palpação (UNESP 2025)',
            clinicalMeaning:
              'Inflamação parenquimatosa, colangiectasia difusa ou distensão vesicular sob tensão; dor felina costuma ser discreta à inspeção superficial.',
          },
          {
            finding: 'Fezes pálidas ou acólicas (quando obstrução total)',
            frequency: 'Sinal de alerta crítico',
            clinicalMeaning:
              'Ausência de pigmentos biliares no lúmen intestinal sinaliza ==obstrução biliar extra-hepática (EHBO) completa== e impede eliminação fecal de ovos.',
          },
        ],
      },
      {
        system: 'Gastrointestinais e Metabólicos',
        findings: [
          {
            finding: 'Hiporexia, anorexia e perda de peso progressiva',
            frequency: 'Comum e precoce',
            clinicalMeaning:
              'Em felinos, o balanço energético negativo mobiliza rapidamente gordura periférica, precipitando ==lipidose hepática secundária== (presente em ~1/3 das colangites graves).',
          },
          {
            finding: 'Vômitos, diarreia ou constipação/disquezia',
            frequency: '4/6 na série UNESP 2025',
            clinicalMeaning:
              'Náusea visceral, alteração da motilidade, disbiose por ausência de sais biliares ou pancreatite/IBD concomitantes (tríade) {{ref:ref-sato-2025}}.',
          },
        ],
      },
      {
        system: 'Sistêmicos e Complicações Graves',
        findings: [
          {
            finding: 'Apatia severa, desidratação e hipotensão/sepse',
            frequency: '5/6 apatia/desidratação (UNESP 2025)',
            clinicalMeaning:
              'Sugere colangite bacteriana ascendente concomitante, desidratação não compensada ou peritonite biliar por ruptura {{ref:ref-sato-2025}}.',
          },
          {
            finding: 'Ascite e tendência hemorrágica',
            frequency: 'Casos avançados',
            clinicalMeaning:
              'Ascite por hipertensão portal/hipoalbuminemia (ou peritonite biliar); sangramentos por ==má absorção de vitamina K== lipossolúvel e queda na síntese hepática de fatores de coagulação.',
          },
        ],
      },
    ],
    physicalExamFindings: [
      'Inspecionar esclerótica, frênulo lingual e pavilhões auriculares sob luz branca à procura de icterícia sutil antes de interpretar enzimas isoladamente.',
      'Avaliar estado de hidratação, perfusão periférica (TPC, temperatura de extremidades, PA) e escore corporal/muscular em busca de caquexia crônica.',
      'Palpar abdome cranial com delicadeza buscando hepatomegalia, dor vesicular focal ou ondas de líquido livre.',
      'Checar mucosas para petéquias ou sangramentos em venopunções prévias antes de qualquer procedimento invasivo abdominal.',
    ],
    cpPainelClinicoUltrassomSousa2025: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/platinosomose-felina/painel-clinico-colecistocentese-sousa2025.jpg',
      alt: 'Painel clínico, ultrassonográfico, intervencionista e parasitológico de gato com platinossomose no Brasil',
      shortCaption: 'Fig. 2 — Icterícia clínica, ultrassom biliar, colecistocentese e ovo na bile (Sousa et al., 2025).',
      caption:
        'Figura 2 — Evolução clínico-diagnóstica documentada em caso brasileiro de platinossomose felina: (A–B) icterícia ocular marcante e paciente ictérico em atendimento; (C) ultrassonografia evidenciando vesícula e ductos biliares dilatados com paredes espessadas e conteúdo hiperecogênico; (D) colecistocentese percutânea ecoguiada (asterisco na ponta da agulha); (E) ovo operculado embrionado castanho-dourado recuperado diretamente da bile; (F) regressão parcial das dilatações no controle pós-terapêutico. Fonte: Sousa et al. (2025), Ciência Rural, DOI: 10.1590/0103-8478cr20240194 (CC BY 4.0).',
      display: 'default',
    },
    particularidadesCaninasEFelinas:
      '- Cães: infecção biliar parasitária verdadeira é esporádica e ligada à ingestão de peixes de água doce crus em áreas endêmicas (*Opisthorchis*, *Clonorchis*, *Metorchis*), apresentando colestase mais pronunciada com elevações marcantes de FA e GGT quando há obstrução ductal. Lembre-se de diferenciar de *Heterobilharzia americana*, que causa granulomas hepáticos portais e diarreia crônica sem colonizar ductos biliares.\n' +
      '- Gatos: constituem a população clínica prioritária no Brasil (*Platynosomum* spp.). Além de muitos portadores permanecerem subclínicos, felinos ictéricos podem apresentar ==FA normal ou apenas discretamente elevada== devido à menor capacidade de indução e meia-vida sérica mais curta da enzima hepática felina; qualquer ==lama biliar (sludge)== em gatos deve ser valorizada como potencialmente patológica, e a anorexia persistente exige intervenção nutricional rápida pelo alto risco de lipidose secundária.',
  },

  diagnosis: {
    algoritmoDiagnosticoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo diagnóstico interativo — Da suspeita à confirmação biliar',
      subtitle: 'Navegue pelas etapas para evitar falsos-negativos coproparasitológicos e complicações em punções.',
      steps: [
        {
          id: 'cp-diag-1',
          stepNumber: 1,
          title: 'Triagem clínica, epidemiológica e perfil hepatobiliar',
          badge: 'ETAPA 1 · PLANTÃO',
          summary:
            'Investigar caça de lagartixas/anfíbios (gatos) ou peixe cru (cães/gatos) e mensurar enzimas + hemostasia.',
          metrics: [
            { label: 'Série UNESP (n=6)', value: 'ALT 331±305 · FA 260,8±270 U/L' },
            { label: 'Hemograma', value: 'Normal não exclui; Eos variável' },
          ],
          highlights: [
            'Em gatos, ==FA discreta ou normal NÃO descarta colestase grave== por particularidades de meia-vida da isoenzima hepática felina.',
          ],
          details: [
            'Incluir TP/TTPA, plaquetas e bilirrubinas na triagem de pacientes ictéricos antes de programar qualquer punção vesicular ou biópsia hepática.',
          ],
        },
        {
          id: 'cp-diag-2',
          stepNumber: 2,
          title: 'Ultrassonografia abdominal (parênquima, vesícula, colédoco e pâncreas)',
          badge: 'ETAPA 2 · IMAGEM',
          summary:
            'Avaliar dilatação biliar, espessamento vesicular, presença de obstrução completa e sinais pancreáticos/intestinais.',
          metrics: [
            { label: 'Colédoco (Köster 2016)', value: '> 4 mm em 12/27 · tortuoso 16/27' },
            { label: 'Parede vesicular > 2 mm', value: '7/27 gatos (não patognomônico)' },
          ],
          highlights: [
            'Em gatos, qualquer acúmulo de ==lama biliar (sludge)== merece investigação clínica, diferentemente de achado incidental leve em cães.',
          ],
          details: [
            'A dilatação do ducto biliar comum pode persistir mesmo após eliminação dos parasitos devido à perda crônica de elasticidade mural e fibrose {{ref:ref-koster-2016}}.',
          ],
        },
        {
          id: 'cp-diag-3',
          stepNumber: 3,
          title: 'Coproparasitológico especializado (sedimentação ou dupla centrifugação)',
          badge: 'ETAPA 3 · FEZES',
          summary:
            'Evitar flutuação passiva simples; priorizar sedimentação formalina-éter ou dupla centrifugação em Sheather.',
          metrics: [
            { label: 'Ovos (Chantawong 2024)', value: '32,34 × 22,6 µm · operculados' },
            { label: 'Pré-patência', value: '~8–12 semanas pós-ingestão' },
          ],
          highlights: [
            'Amostras seriadas reduzem o impacto da eliminação intermitente, mas ==negatividade fecal jamais exclui colangite parasitária na obstrução biliar==.',
          ],
          details: [
            'Protocolo de sedimentação formalina-éter ou dupla centrifugação em solução açucarada de Sheather (SG 1,28) empregada por Köster et al. (2016) {{ref:ref-koster-2016}}.',
          ],
        },
        {
          id: 'cp-diag-4',
          stepNumber: 4,
          title: 'Colecistocentese ecoguiada, cultura, histopatologia ou PCR',
          badge: 'ETAPA 4 · CONFIRMAÇÃO',
          summary:
            'Quando fezes são negativas com suspeita alta e via segura, amostrar bile ou tecido hepático.',
          metrics: [
            { label: 'Bile vs Fezes (Köster 2016)', value: '1.450 ovos/mL vs 46 ovos/g (p<0,001)' },
            { label: 'Bactibilia associada', value: 'E. coli em 6/27 gatos na bile' },
          ],
          highlights: [
            '==Contraindicar punção percutânea== se parede necrótica/friável, mucocele, coagulopatia não corrigida ou distensão tensa por EHBO completa (preferir coleta cirúrgica).',
          ],
          details: [
            'A abordagem trans-hepática sob anestesia geral reduz risco de extravasamento biliar (0/83 rupturas em Byfield et al., 2017 vs 1/6 em colecistite neutrofílica grave por Brain et al., 2006).',
          ],
        },
      ],
    },
    cpLaboratorialHemogramaEBioquimica:
      'Os exames laboratoriais sustentam a suspeita de lesão hepatobiliar, mas nenhum parâmetro isolado confirma a causa parasitária:\n\n' +
      '- ==Hemograma==: frequentemente dentro dos valores de referência (observado na maioria dos gatos da série UNESP 2025) {{ref:ref-sato-2025}}. Anemia discreta de doença inflamatória pode ocorrer na cronicidade; desidratação eleva falsamente o hematócrito. ==Eosinofilia periférica== auxilia quando presente (significativa em Chantawong et al., 2024, *p* = 0,014), mas é inconstante e tende a desaparecer em infecções antigas {{ref:ref-chantawong-2024}}.\n' +
      '- ==Enzimas e bilirrubina (Sato et al., 2025 — UNESP, 6 gatos)==: ALT 331 ± 305,3 U/L, AST 181,8 ± 98,9 U/L, FA 260,8 ± 270,4 U/L e GGT 14,98 ± 11,52 U/L — demonstrando enorme dispersão entre pacientes {{ref:ref-sato-2025}}.\n' +
      '- ==Síntese e hemostasia==: albumina, colesterol e glicose avaliam reserva funcional; ==prolongamento de TP/TTPA== em colestase grave indica deficiência de vitamina K por má absorção lipossolúvel ou falha sintética avançada.',
    cpComparacaoEosinofilosChantawong2024: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/platinosomose-felina/comparacao-laboratorial-eosinofilos-chantawong2024.png',
      alt: 'Gráficos comparativos de ALT, ALP e contagem de eosinófilos entre gatos positivos e negativos para Platynosomum illiciens',
      shortCaption: 'Fig. 3 — Sobreposição de ALT/FA e associação de eosinofilia em gatos positivos (Chantawong et al., 2024).',
      caption:
        'Figura 3 — Comparação laboratorial entre gatos com enzimas hepáticas elevadas positivos e negativos para Platynosomum illiciens (n=43). Observe a ampla sobreposição dos valores séricos de ALT e fosfatase alcalina (ALP/FA) entre grupos (sem diferença significativa) em contraste com a elevação significativa da contagem absoluta de eosinófilos nos infectados (p = 0,014), ilustrando por que enzimas hepáticas isoladas não diferenciam etiologia e por que ausência de eosinofilia não descarta casos crônicos. Fonte: Chantawong et al. (2024), Animals 14(7):1065 (CC BY 4.0).',
      display: 'centered',
    },
    cpCoproparasitologicoEOvos:
      'A pesquisa fecal de ovos operculados exige técnica compatível com a densidade e o ciclo do parasito:\n\n' +
      '- ==Por que flutuação simples falha==: ovos dicrocelídeos são densos e frequentemente permanecem no fundo do tubo com soluções salinas rotineiras, gerando falsos-negativos.\n' +
      '- ==Sedimentação vs. dupla centrifugação==: emprega-se classicamente a sedimentação por ==formalina-éter== (ou acetato de etila), enquanto Köster et al. (2016) quantificaram ovos com sucesso usando ==dupla centrifugação com solução de Sheather (densidade ~1,28)== {{ref:ref-koster-2016}}. Portanto, o ponto decisivo é empregar protocolo de concentração validado para trematódeos.\n' +
      '- ==Limitação intrínseca==: mesmo com técnica excelente e amostras seriadas em dias alternados, não há ponto de corte validado de sensibilidade universal; na obstrução biliar completa, os ovos não alcançam o duodeno e o exame fecal torna-se inevitavelmente negativo.',
    cpFiguraOvosPlatynosomum: {
      kind: 'clinicalFigure',
      src: '/consulta-vet/platinosomose-felina/ovos-platynosomum-fezes-chantawong2024.png',
      alt: 'Microfotografias de ovos operculados de Platynosomum illiciens identificados em fezes felinas',
      shortCaption: 'Fig. 4 — Ovos operculados de Platynosomum spp. em microscopia óptica (Chantawong et al., 2024).',
      caption:
        'Figura 4 — Variações morfológicas de ovos de Platynosomum illiciens à microscopia óptica: elementos pequenos, ovalados, castanho-amarelados a escuros, com casca espessa, conteúdo tipicamente já embrionado e opérculo visível em uma das extremidades (dimensões médias de 32,34 × 22,6 µm na coorte de Chantawong et al., 2024). Dimensões isoladas podem sobrepor-se às de outros dicrocelídeos (ex.: Eurytrema procyonis), demandando correlação anatômica ou confirmação por PCR (ITS2/cox1). Fonte: Chantawong et al. (2024), Animals 14(7):1065 (CC BY 4.0).',
      display: 'centered',
    },
    cpAnaliseBileColecistocenteseEPcr:
      'Quando o quadro clínico e ultrassonográfico é sugestivo mas o exame fecal falha ou há suspeita de coinfecção bacteriana, avançam-se as etapas diretas:\n\n' +
      '- ==Análise da bile (Köster et al., 2016)==: em 27 gatos FIV+ submetidos a 39 colecistocenteses ecoguiadas, a concentração biliar mediana foi de ==1.450 ovos/mL== contra ==46 ovos/g== nas fezes (*p* < 0,001), além de isolar *Escherichia coli* em 6 gatos {{ref:ref-koster-2016}}. Contudo, não é isenta de risco: além de sangue intravesicular em 3 gatos à necropsia nesse protocolo controlado, séries clínicas descrevem ruptura/peritonite em 1/6 gatos com colecistite neutrofílica (Brain et al., 2006) vs. 0/83 em punções eletivas (Byfield et al., 2017) — recomendando-se ==anestesia geral, abordagem trans-hepática== e abstinência na EHBO completa sob alta pressão ou parede friável.\n' +
      '- ==PCR e sequenciamento==: alvos *ITS2* e *cox1* diferenciam com exatidão *P. illiciens* de outros trematódeos em fezes, bile ou tecido (Chantawong et al., 2024; Campos-Camacho et al., 2026) {{ref:ref-chantawong-2024}} {{ref:ref-campos-2026}}.\n' +
      '- ==Histopatologia hepática==: confirma hiperplasia adenomatosa epitelial, fibrose periductal e exclusão de colangite linfocítica ou linfoma/colangiocarcinoma, ciente de que a distribuição multifocal das lesões exige biópsia de múltiplos lobos hepáticos.',
    cpUltrassonografiaEKoster2016:
      'Na ultrassonografia abdominal de 27 gatos infectados (Köster et al., 2016), observaram-se alterações hepáticas em 19/27, hiperecogenicidade em 16/27, heterogeneidade em 13/27, ducto biliar comum tortuoso em 16/27 e > 4 mm em 12/27 (mediana 3,9 mm; IIQ 2,85–5,25 mm) e parede vesicular hiperecogênica > 2 mm em 7/27 {{ref:ref-koster-2016}}. Em cães e gatos, dilatação biliar, sedimento ecogênico ou alterações pancreáticas são pistas de fluxo comprometido e possível tríade, jamais diagnóstico etiológico exclusivo.',
    cpTabelaDiferenciaisPlantao: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Principais diagnósticos diferenciais na emergência e clínica hepatobiliar',
      headers: ['Diferencial', 'Semelhanças clínicas e de imagem', 'Como distinguir'],
      rows: [
        [
          'Colangite bacteriana (neutrofílica)',
          'Febre, icterícia, neutrofilia, espessamento vesicular e colestase',
          'Citologia e cultura aeróbica/anaeróbica de bile (podem coexistir!).',
        ],
        [
          'Colangite linfocítica / Linfoma',
          'Curso crônico flutuante, hiperglobulinemia, ascite, dilatação ductal',
          'Histopatologia multilobar, ausência de ovos e PARR para clonalidade.',
        ],
        [
          'Lipidose hepática felina',
          'Icterícia marcada, anorexia, hepatomegalia hiperecoica',
          'Citologia hepática com vacuolização lipídica difusa e busca da doença primária subjacente.',
        ],
        [
          'Pancreatite e Tríade felina',
          'Vômito, dor cranial, anorexia, dilatação do colédoco por compressão papilar',
          'fPLI/cPLI, DGGR lipase, avaliação pancreática e intestinal detalhada.',
        ],
        [
          'Mucocele / Colelitíase / Neoplasia biliar',
          'EHBO, icterícia pós-hepática, distensão vesicular grave',
          'Padrão "kiwi" ou cálculos com sombra acústica ao USG, histopatologia; NUNCA puncionar mucocele.',
        ],
        [
          'Anemia hemolítica (pré-hepática)',
          'Icterícia intensa e bilirrubinúria',
          'Hematócrito baixo agudo, esferócitos, autoaglutinação, reticulocitose e ausência de dilatação biliar.',
        ],
      ],
    },
  },

  treatment: {
    algoritmoTratamentoInterativo: {
      kind: 'interactiveAlgorithm',
      title: 'Algoritmo terapêutico interativo — Estabilização, antiparasitário e desobstrução',
      subtitle: 'Clique nas fases para consultar metas em gatos críticos, regimes auditados de praziquantel e contraindicações.',
      steps: [
        {
          id: 'cp-tx-1',
          stepNumber: 1,
          title: 'Estabilização hemodinâmica, analgesia e hemostasia',
          badge: 'HORA 0 · ESTABILIZAÇÃO',
          summary:
            'Corrigir desidratação sem sobrecarga hídrica, aliviar dor visceral e prevenir sangramentos antes de puncionar.',
          metrics: [
            { label: 'Vitamina K1 (pré-procedimento)', value: '0,5 mg/kg SC q12h × 3 d' },
            { label: 'Antiemético', value: 'Maropitant 1 mg/kg IV/SC q24h' },
          ],
          highlights: [
            'Em gatos com suspeita de coagulopatia colestática, ==evitar via IM na vitamina K1 pelo risco de hematoma==; preferir via SC e checar TP/TTPA antes de biópsias ou sondas.',
          ],
          details: [
            'Em felinos, reidratar em etapas respeitando menor reserva cardiopulmonar; associar analgesia opioide (buprenorfina/metadona) diante de dor biliar ou pancreática.',
          ],
        },
        {
          id: 'cp-tx-2',
          stepNumber: 2,
          title: 'Suporte nutricional enteral precoce e antioxidantes',
          badge: 'PREVENÇÃO DE LIPIDOSE',
          summary:
            'Quebrar o catabolismo em felinos anoréxicos sem restrição proteica injustificada.',
          metrics: [
            { label: 'Início nutricional (RER)', value: '20% RER Dia 1 · progressão em 3–5 d' },
            { label: 'SAMe + Vitamina E', value: '20 mg/kg PO jejum + 100 UI/dia' },
          ],
          highlights: [
            'Gatos com anorexia prolongada correm risco elevado de ==síndrome de realimentação== (hipofosfatemia e hipocalemia graves) — monitorar eletrólitos e iniciar com pequena fração da RER.',
          ],
          details: [
            'Dietas altamente digestíveis ricas em proteína e energia são preferidas; restrição proteica reserva-se exclusivamente à encefalopatia hepática clínica manifesta.',
          ],
        },
        {
          id: 'cp-tx-3',
          stepNumber: 3,
          title: 'Terapia trematocida auditada (Praziquantel) e monitoramento CYP3A',
          badge: 'TERAPIA PARASITICIDA',
          summary:
            'Empregar protocolo trematocida específico somente após estabilização GI/volemia adequada.',
          metrics: [
            { label: 'Esquema oral prolongado (Gatos)', value: '30 mg/kg VO q24h × 5–10 d' },
            { label: 'Esquema parenteral (Gatos)', value: '20 mg/kg SC q24h × 3 d' },
          ],
          highlights: [
            'No ensaio de contagem direta de vermes vivos (Lathroum et al., 2018), ==20 mg/kg IM × 3 d curou 3/6 gatos e 5 mg/kg IM repetido em 14 d curou 0/6==: queda de ovos fecais não prova erradicação {{ref:ref-lathroum-2018}}.',
          ],
          details: [
            'Praziquantel é metabolizado via CYP3A: cimetidina/azóis elevam exposição enquanto indutores (dexametasona, fenobarbital, rifampicina) podem reduzi-la; doses parenterais ≥ 100 mg/kg em gatos associaram-se a ~80% de letalidade.',
          ],
        },
        {
          id: 'cp-tx-4',
          stepNumber: 4,
          title: 'Colerético, antibióticos seletivos e cirurgia na EHBO',
          badge: 'COMPLICAÇÕES · CIRURGIA',
          summary:
            'Individualizar UDCA, antimicrobianos e descompressão biliar conforme patência dos ductos.',
          metrics: [
            { label: 'UDCA (apenas sem EHBO total)', value: '15 mg/kg/dia VO com alimento' },
            { label: 'Cirurgia descompressiva', value: 'EHBO fixa ou peritonite biliar' },
          ],
          highlights: [
            '==NUNCA administrar ácido ursodesoxicólico com obstrução biliar extra-hepática completa== ou suspeita de ruptura vesicular, pois o estímulo colerético agrava a hipertensão ductal.',
          ],
          details: [
            'Antibioticoterapia (ex.: amoxicilina/clavulanato ou guiada por cultura de bile) indica-se diante de febre, neutrofilia tóxica, bactibilia ou sepse, não por positividade parasitária isolada {{ref:ref-koster-2016}}.',
          ],
        },
      ],
    },
    cpPrincipiosEPraziquantelAuditado:
      'O tratamento visa cinco objetivos simultâneos — eliminar os vermes, conter a inflamação, restaurar o fluxo biliar, tratar bactibilia secundária quando comprovada e impedir desnutrição/reinfecção — entendendo que eliminar adultos não desfaz instantaneamente fibrose ductal pré-existente.\n\n' +
      '- ==Praziquantel e evidência comparada==: age alterando a homeostase de cálcio e o tegumento do trematódeo. Doses usuais de cestódeos (5 mg/kg em dose única ou combinados comerciais) são inadequadas. No estudo controlado de Lathroum et al. (2018), apenas ==3/6 gatos tratados com 20 mg/kg IM q24h por 3 dias== ficaram livres de vermes adultos vivos, contra ==0/6 com 5 mg/kg IM repetido após 14 dias==, embora ambos tenham reduzido ovos fecais {{ref:ref-lathroum-2018}}. Para trematódeos biliares, adotam-se esquemas extrabula de ==30 mg/kg VO q24h por 5–10 dias== em gatos para *Platynosomum* spp. e ==20–40 mg/kg VO q24h por 3–10 dias== em cães.\n' +
      '- ==Segurança e interações==: embora apresente boa margem na faixa terapêutica, doses parenterais felinas de 100–200 mg/kg desencadearam tremores, vômitos e ~80% de mortalidade; cães homozigotos *ABCB1/MDR1* podem apresentar neurotoxicidade com formulações tópicas combinadas a emodepsida. Por metabolismo ==CYP3A==, cimetidina e azóis elevam níveis de praziquantel, enquanto dexametasona e fenobarbital podem reduzi-los.\n' +
      '- ==Fenbendazol==: já foi descrito em cães na dose de 50 mg/kg VO q24h × 10 d (isolado ou associado), mas não substitui o praziquantel como primeira linha em gatos por carência de comprovação específica.',
    cpUdcaAntibioticosPrednisolona:
      'Terapias adjuvantes devem ser rigorosamente individualizadas conforme cultura biliar e patência anatômica:\n\n' +
      '- ==Ácido ursodesoxicólico (UDCA)==: colerético hidrofílico (15 mg/kg VO q24h a 15–20 mg/kg/dia divididos q12h com alimento) que desloca ácidos biliares hidrofóbicos tóxicos. ==Contraindicado na obstrução biliar completa ou suspeita de ruptura/peritonite biliar==.\n' +
      '- ==Antibióticos==: reservados à documentação citológica/microbiológica de bactibilia (*E. coli*, *Enterococcus*, anaeróbios como *Bacteroides* e *Clostridium*) ou sinais clínicos de colangite séptica, colhendo cultura prévia sempre que viável {{ref:ref-koster-2016}}.\n' +
      '- ==Prednisolona (controvérsia)==: sem ensaio robusto provando redução de fibrose ou aumento de sobrevida na platinossomose; uso precipitado mascara infecção bacteriana oculta e piora sepse biliar. Considerar apenas após exclusão/controle infeccioso e investigação histológica de componente linfocítico concomitante.',
    cpNutricaoEstabilizacaoEVitaminaK1:
      'Nos felinos críticos, o suporte metabólico determina frequentemente a sobrevida imediata antes mesmo de o antiparasitário completar sua ação:\n\n' +
      '- ==Prevenção da lipidose hepática e realimentação==: iniciar alimentação enteral precoce (sonda nasoesofágica temporária ou esofagostomia se > 5–7 dias) calculando inicialmente ==20% da RER no Dia 1== e progredindo ao longo da primeira semana com monitorização de fósforo e potássio séricos (se hipofosfatemia de realimentação, suplementar fosfato de potássio 0,01–0,03 mmol/kg/h IV).\n' +
      '- ==Hemostasia e antioxidantes==: vitamina K1 (0,5 mg/kg SC q12h por até 3 dias antes de biópsias/cirurgia ou com TP/TTPA prolongados), além de S-adenosilmetionina (SAMe 20 mg/kg ou 100–400 mg/gato PO em jejum) e vitamina E (~100 UI/dia) para restaurar glutationa hepatocelular.',
    cpTabelaMestreDoses: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Fármacos, doses auditadas e alertas de segurança na colangite parasitária (cães e gatos)',
      headers: ['Fármaco', 'Espécie e posologia auditada', 'Indicação clínica', 'Limites e precauções'],
      rows: [
        [
          'Praziquantel (Gatos — via oral)',
          '30 mg/kg VO q24h por 5–10 dias (extrabula)',
          'Platinossomose estável tolerando via oral',
          'Sabor amargo (salivação em gatos); interação CYP3A.',
        ],
        [
          'Praziquantel (Gatos — parenteral)',
          '20 mg/kg SC ou IM q24h por 3 dias',
          'Gatos anoréxicos ou vômito impedindo VO',
          'Cura parasitológica de 3/6 gatos em Lathroum 2018; evitar sobredose parenteral (≥100 mg/kg é letal) {{ref:ref-lathroum-2018}}.',
        ],
        [
          'Praziquantel (Cães)',
          '20–40 mg/kg VO q24h por 3–10 dias (extrabula)',
          'Trematódeos biliares (Platynosomum / Opisthorchiidae)',
          'Cautela em homozigotos ABCB1 com formulações tópicas combinadas.',
        ],
        [
          'Praziquantel (*Amphimerus*)',
          '40 mg/kg VO q24h por 3 dias (gatos)',
          'Infecção por Amphimerus pseudofelineus',
          'Evidência baseada em séries regionais norte-americanas.',
        ],
        [
          'Ácido ursodesoxicólico (UDCA)',
          '15 mg/kg VO q24h (ou 15–20 mg/kg/d ÷ q12h com alimento)',
          'Colestase não obstrutiva; modulação de ácidos biliares',
          'CONTRAINDICADO na obstrução biliar completa ou ruptura biliar.',
        ],
        [
          'Vitamina K1 (fitomenadiona)',
          '0,5 mg/kg SC q12h por até 3 dias',
          'Coagulopatia colestática ou preparo pré-biópsia/cirurgia',
          'Evitar IM se houver risco de hematoma; checar resposta de TP/TTPA.',
        ],
        [
          'SAMe (S-adenosilmetionina)',
          '20 mg/kg (ou 100–400 mg/gato) VO q24h em jejum',
          'Suporte antioxidante hepatocelular (reposição de GSH)',
          'Administrar comprimido inteiro sem partir/esmagar.',
        ],
      ],
    },
  },

  prevention: {
    cpPrevencaoEReinfeccao:
      'Como não há vacina disponível e o tratamento antiparasitário não confere imunidade duradoura, a prevenção centra-se na interrupção do ciclo de transmissão:\n\n' +
      '- ==Controle da predação em gatos==: manter felinos em ambiente interno enriquecido ou telado, eliminando o acesso a lagartixas (*Hemidactylus*), lagartos, sapos e tatuzinhos-de-jardim em áreas endêmicas.\n' +
      '- ==Segurança alimentar em cães e gatos==: proibir fornecimento de peixes de água doce crus ou vísceras mal cozidas em regiões com risco de *Opisthorchis*, *Clonorchis*, *Metorchis* ou *Amphimerus*.\n' +
      '- ==Limitação dos vermífugos de rotina==: orientar tutores de que vermifugações trimestrais ou mensais em doses cestocidas padrão (5 mg/kg de praziquantel) não previnem nem tratam trematódeos hepatobiliares.\n' +
      '- ==Acompanhamento pós-tratamento==: reavaliar bioquímica hepática, ultrassom e exames fecais seriados após algumas semanas, distinguindo eliminação residual de ovos da reinfecção por novos episódios de caça.',
  },

  complications: {
    cpTabelaComplicacoes: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Complicações agudas, crônicas e conduta prioritária em terapia intensiva',
      headers: ['Complicação', 'Mecanismo / Alerta clínico', 'Prioridade de manejo', 'Impacto no prognóstico'],
      rows: [
        [
          'Obstrução biliar extra-hepática (EHBO)',
          'Icterícia intensa, fezes acólicas, dor cranial, colédoco dilatado',
          'Avaliar patência; se fixa ou refratária, descompressão cirúrgica / stent',
          'Reservado se persistente ou com falência multiorgânica.',
        ],
        [
          'Peritonite biliar',
          'Ruptura vesicular/ductal, efusão abdominal rica em bilirrubina, sepse',
          'Estabilização volêmica, paracentese comparativa e cirurgia de emergência',
          'Grave, especialmente na presença de bactibilia séptica.',
        ],
        [
          'Colangite bacteriana secundária',
          'Estase e dano epitelial permitem ascensão de E. coli e anaeróbios',
          'Cultura aeróbica/anaeróbica da bile + antimicrobiano apropriado',
          'Reversível se tratada precocemente.',
        ],
        [
          'Lipidose hepática secundária',
          'Anorexia prolongada desencadeando infiltração lipídica hepatocelular',
          'Sonda enteral precoce (20% RER inicial) + controle de fósforo/potássio',
          'Sobrevida 55–80% se alimentado intensivamente; alta letalidade sem dieta.',
        ],
        [
          'Coagulopatia colestática',
          'Déficit de vitamina K lipossolúvel e menor síntese hepática',
          'TP/TTPA pré-procedimento e vitamina K1 SC antes de puncionar',
          'Eleva fortemente risco hemorrágico cirúrgico/intervencionista.',
        ],
        [
          'Fibrose periductal / Cirrose biliar / Colangiocarcinoma',
          'Lesão proliferativa crônica, hipertensão portal, ascite e displasia ductal',
          'Suporte de hipertensão portal, estadiamento e biópsia multilobar',
          'Reservado a ruim; fibrose instalada persiste mesmo após matar os vermes {{ref:ref-andrade-2012}}.',
        ],
      ],
    },
    cpPrognosticoECamposCamacho2026:
      'O prognóstico é altamente dependente do estágio em que a infecção é reconhecida:\n\n' +
      '- ==Gatos==: portadores subclínicos ou quadros inflamatórios iniciais sem fibrose extensa apresentam resposta favorável ao tratamento trematocida combinado à interrupção da predação. Quando já existem obstrução completa, colangite esclerosante difusa, coagulopatia ou neoplasia biliar associada, o prognóstico torna-se reservado a ruim.\n' +
      '- ==Série diagnóstica recente (Campos-Camacho et al., 2026)==: em 6 gatos com *Platynosomum illiciens* confirmados por morfologia, histologia e PCR, 5 evoluíram para deterioração grave e eutanásia com colangio-hepatite difusa. Contudo, havia pesada carga de comorbidades simultâneas (4 FeLV+, 5 com *Spirometra mansoni*, 4 com *Ancylostoma*, 1 com *Dirofilaria immitis*), razão pela qual essa proporção (5/6) NÃO deve ser extrapolada como taxa geral de mortalidade da platinossomose isolada {{ref:ref-campos-2026}}.\n' +
      '- ==Cães==: faltam coortes extensas para estimar mortalidade específica de colangite parasitária biliar canina, dependendo o desfecho da espécie de trematódeo, extensão obstrutiva e comorbidades.',
    cpArmadilhasClinicasEEvidenica:
      'Erros recorrentes observados no plantão que comprometem o desfecho:\n\n' +
      '1. ==Descartar platinossomose por exame coproparasitológico único negativo==, ignorando baixa sensibilidade da flutuação passiva, período pré-patente (8–12 semanas) e obstrução biliar.\n' +
      '2. ==Usar praziquantel 5 mg/kg dose única== (protocolo para *Dipylidium*) acreditando cobrir trematódeos hepatobiliares.\n' +
      '3. ==Confundir redução de ovos fecais com cura parasitológica completa== (Lathroum et al., 2018) e omitir orientação de bloqueio à caça {{ref:ref-lathroum-2018}}.\n' +
      '4. ==Iniciar ácido ursodesoxicólico sem descartar EHBO completa== ou prescrever corticoide em dose imunossupressora antes de afastar bactibilia.\n' +
      '5. ==Puncionar vesícula sob alta pressão ou mucocele ou sem correção prévia de vitamina K1== em gatos ictéricos.',
  },

  references: [
    {
      id: 'ref-nelson-couto-6ed',
      citationText:
        'NELSON, R. W.; COUTO, C. G. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier, 2020. Cap. 35: Hepatobiliary Diseases in the Cat (Tabela 35.3, Box 35.1, Box 35.3), pp. 566–574.',
      sourceType: 'Tratado de referência',
    },
    {
      id: 'ref-plumbs-10ed',
      citationText:
        "PLUMB, D. C. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell, 2023. Monografia: Praziquantel / Praziquantel Combination Products, pp. 1053–1056.",
      sourceType: 'Formulário farmacológico',
    },
    {
      id: 'ref-greene-5ed',
      citationText:
        'SYKES, J. E. Greene’s Infectious Diseases of the Dog and Cat. 5th ed. St. Louis: Elsevier, 2023. Cap. 118: Trematodes (Snowden & Ketzis — Platynosomum illiciens, Heterobilharzia americana, Alaria spp.).',
      sourceType: 'Tratado de infectologia',
    },
    {
      id: 'ref-disorders-liver-2025',
      citationText:
        'WEBSTER, C. R. L. et al. Disorders of the Liver, Exocrine Pancreas, and Gastrointestinal Tract in Dogs and Cats. Wiley-Blackwell, 2025. Cap. 16: Infectious Biliary Tract and Gallbladder Disease, pp. 111–125.',
      sourceType: 'Tratado hepatobiliar',
    },
    {
      id: 'ref-bsava-gi-3ed',
      citationText:
        'HALL, E.; WILLIAMS, D. A.; KATHRANI, A. BSAVA Manual of Canine and Feline Gastroenterology. 3rd ed. Gloucester: BSAVA, 2020. Cap. 25, 36 e 37 (Biliary obstruction, Amphimerus pseudofelineus e Eurytrema procyonis).',
      sourceType: 'Manual clínico',
    },
    {
      id: 'ref-canine-hepato-2025',
      citationText:
        'O’NEILL, E. J. Canine Hepatobiliary and Exocrine Pancreatic Diseases. Wiley-Blackwell, 2025. Diagnóstico diferencial de icterícia pós-hepática e enzimas colestáticas.',
      sourceType: 'Tratado hepatobiliar',
    },
    {
      id: 'ref-wsava-2006',
      citationText:
        'ROTHUIZEN, J. et al. WSAVA Standards for Clinical and Histological Diagnosis of Canine and Feline Liver Diseases. Oxford: Saunders Elsevier, 2006.',
      sourceType: 'Consenso internacional',
    },
    {
      id: 'ref-watson-2025',
      citationText:
        'WATSON, P. Feline Cholangitis. Veterinary Clinics of North America: Small Animal Practice, v. 55, n. 4, p. 627–646, 2025. DOI: 10.1016/j.cvsm.2025.03.001.',
      sourceType: 'Revisão',
    },
    {
      id: 'ref-merck-fluke',
      citationText:
        'CENTER, S. A. Hepatobiliary Fluke Infection in Small Animals. Merck Veterinary Manual, atualização 2026.',
      sourceType: 'Referência clínica',
    },
    {
      id: 'ref-pinto-2014',
      citationText:
        'PINTO, H. A.; MATI, V. L. T.; MELO, A. L. New insights into the life cycle of Platynosomum (Trematoda: Dicrocoeliidae). Parasitology Research, v. 113, p. 2701–2707, 2014.',
      sourceType: 'Estudo de ciclo biológico',
    },
    {
      id: 'ref-koster-2016',
      citationText:
        'KÖSTER, L. et al. Percutaneous Ultrasound-guided Cholecystocentesis and Bile Analysis for the Detection of Platynosomum spp.-Induced Cholangitis in Cats. Journal of Veterinary Internal Medicine, v. 30, n. 3, p. 787–793, 2016. DOI: 10.1111/jvim.13943.',
      sourceType: 'Estudo prospectivo',
    },
    {
      id: 'ref-lathroum-2018',
      citationText:
        'LATHROUM, C. N. et al. Efficacy of Praziquantel in the Treatment of Platynosomum fastosum in Cats with Natural Infections. Veterinary Sciences, v. 5, n. 2, art. 35, 2018. DOI: 10.3390/vetsci5020035.',
      sourceType: 'Ensaio terapêutico',
    },
    {
      id: 'ref-chantawong-2024',
      citationText:
        'CHANTAWONG, P. et al. Occurrence and Risk Factors Associated with Platynosomum illiciens Infection in Cats with Elevated Liver Enzymes. Animals, v. 14, n. 7, art. 1065, 2024. DOI: 10.3390/ani14071065.',
      sourceType: 'Estudo observacional e molecular',
    },
    {
      id: 'ref-sato-2025',
      citationText:
        'SATO, L. M. N. et al. Clinical, laboratory, and ultrasonographic insights into Platynosomum fastosum infection in domestic cats: Diagnostic challenges and hepatobiliary implications. The Veterinary Journal, v. 314, art. 106442, 2025. DOI: 10.1016/j.tvjl.2025.106442.',
      sourceType: 'Série clínica brasileira (UNESP)',
    },
    {
      id: 'ref-sousa-2025',
      citationText:
        'SOUSA, A. A. et al. Aspectos clínicos, ultrassonográficos e diagnóstico por colecistocentese ecoguiada na platinossomose felina. Ciência Rural, 2025. DOI: 10.1590/0103-8478cr20240194.',
      sourceType: 'Relato clínico brasileiro (CC BY 4.0)',
    },
    {
      id: 'ref-campos-2026',
      citationText:
        'CAMPOS-CAMACHO, J. et al. Diagnosis of feline platynosomosis: case series and literature review. Journal of Veterinary Diagnostic Investigation, v. 38, n. 6, p. 1386–1395, 2026. DOI: 10.1177/10406387261467915.',
      sourceType: 'Série anatomopatológica e molecular',
    },
    {
      id: 'ref-andrade-2012',
      citationText:
        'ANDRADE, R. L. F. S. et al. Platynosomum fastosum-induced cholangiocarcinomas in cats. Veterinary Parasitology, v. 190, n. 1–2, p. 277–280, 2012. DOI: 10.1016/j.vetpar.2012.04.015.',
      sourceType: 'Série anatomopatológica brasileira',
    },
    {
      id: 'ref-xavier-2007',
      citationText:
        'XAVIER, F. G. et al. Cystic liver disease related to high Platynosomum fastosum infection in a domestic cat. Journal of Feline Medicine and Surgery, v. 9, n. 1, p. 51–55, 2007. DOI: 10.1016/j.jfms.2006.08.006.',
      sourceType: 'Relato anatomopatológico brasileiro',
    },
  ],
};
