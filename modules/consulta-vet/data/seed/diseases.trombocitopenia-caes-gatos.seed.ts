import { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

export const trombocitopeniaCaesGatosSeed: DiseaseRecord = {
  id: 'disease-trombocitopenia-caes-gatos',
  slug: 'trombocitopenia-caes-gatos',
  title: 'Trombocitopenia em Cães e Gatos',
  subtitle: 'Abordagem diagnóstica e terapêutica das reduções plaquetárias por destruição imunomediada (ITP), falha de produção medular, consumo microvascular (CID/sepse) e sequestro esplênico',
  synonyms: [
    'trombocitopenia',
    'thrombocytopenia',
    'plaquetopenia',
    'trombocitopenia imunomediada',
    'ITP',
    'pITP',
    'baixa contagem de plaquetas'
  ],
  species: ['dog', 'cat'],
  category: 'hematologia',
  categories: ['hematologia', 'urgencia-emergencia', 'imunologia', 'oncologia'],
  tags: [
    'trombocitopenia',
    'plaquetas',
    'itp',
    'hemostasia-primaria',
    'petequias',
    'equimoses',
    'vincristina',
    'prednisolona',
    'pseudotrombocitopenia',
    'dogibat',
    'acvim',
    'romiplostim'
  ],
  isPublished: true,

  plainLanguage: DISEASE_PLAIN_LANGUAGE['trombocitopenia-caes-gatos'],

  quickSummary: 'A trombocitopenia é uma das síndromes hematológicas mais frequentes e desafiadoras na clínica médica e de terapia intensiva de cães e gatos. Definida como a contagem plaquetária inferior a 150.000 a 200.000/uL em cães e menor que 150.000 a 300.000/uL em gatos, o raciocínio fisiopatológico deve ser estruturado em cinco mecanismos fundamentais: destruição acelerada (primária ou secundária), produção medular diminuída, consumo microvascular, sequestro e perda/diluição. A pseudotrombocitopenia in vitro decorrente de agregação plaquetária induzida por EDTA é extremamente comum (afetando até 71% das amostras felinas), tornando a revisão microscópica do esfregaço de sangue periférico a regra de ouro inicial inviolável. Em animais com trombocitopenia grave (<20.000 a 30.000/uL), a trombocitopenia imunomediada (ITP) primária destaca-se como principal causa em cães, exigindo estabilização delicada com protocolo hands-off, corticoterapia contemporânea (prednisona 2 mg/kg/dia) e vincristina em dose única (0,02 mg/kg IV), que encurta a recuperação plaquetária de 5 para 2,5 a 3 dias (Balog et al., 2013). Em gatos, a pITP foi recentemente caracterizada em coorte contemporânea (Courtney et al., 2026), com sobrevida mediana superior a 1.000 dias, porém com taxa de recidiva de 59% e contraindicação formal e absoluta ao uso de azatioprina.',

  quickDecisionStrip: [
    'Regra número 1 inviolável: antes de qualquer conduta terapêutica agressiva, confirme a contagem real avaliando o esfregaço sanguíneo para descartar pseudotrombocitopenia por grumos em EDTA (presente em até 71% dos gatos).',
    'Não confunda macroplaquetopenia assintomática racial de Cavalier King Charles Spaniels (mutação no gene TUBB1) com doença: esses cães têm plaquetas gigantes funcionais, massa plaquetária total normal e nunca devem receber imunossupressão.',
    'Separe imediatamente trombocitopenia isolada de citopenias múltiplas: plaquetopenia isolada aponta fortemente para ITP ou consumo inicial; bicitopenia ou pancitopenia exige investigação prioritária de medula óssea.',
    'Diferenciação mandatória entre ITP e CID: na ITP isolada, os tempos de coagulação (PT e aPTT) e fibrinogênio são rigorosamente normais; tempos prolongados associados a D-dímeros elevados e esquizócitos indicam consumo microvascular por coagulopatia de consumo.',
    'Intensidade numérica orienta prioridade: contagens <20.000 a 30.000/uL elevam exponencialmente o risco de hemorragia espontânea primária; contagens entre 50.000 e 100.000/uL raramente sangram de forma espontânea sem trauma ou coagulopatia associada.',
    'Hemorragia gastrointestinal (melena) e elevação de nitrogênio ureico sanguíneo (BUN/ureia) desproporcional à creatinina são os marcadores clínicos mais fortes de mortalidade hospitalar em cães com ITP (O\'Marra et al., 2011).',
    'Protocolo contemporâneo ACVIM para ITP canina hemorrágica: iniciar prednisona a 2 mg/kg/dia VO associada a vincristina 0,02 mg/kg IV dose única lenta, acelerando a subida de plaquetas de 5 para 2,5 a 3 dias.',
    'Vincristina não é recomendada de rotina para ITP felina, e a azatioprina é FORMALMENTE CONTRAINDICADA EM GATOS pelo risco de aplasia medular fulminante fatal.',
    'Plasma fresco congelado (PFC) NÃO trata trombocitopenia isolada; transfusão de concentrado de plaquetas é estritamente indicada para hemorragia ativa com risco de morte (SNC, pulmão ou choque hemorrágico grave).',
    'Manejo de enfermagem hands-off rigoroso: proibir venopunção jugular, evitar injeções intramusculares e cistocentese, adotar repouso absoluto em gaiola estofada e realizar compressão prolongada (>5 minutos) em sítios venosos periféricos.'
  ],

  quickSummaryRich: {
    lead: 'Síndrome hematológica caracterizada pela queda crítica das plaquetas circulantes, comprometendo a formação do tampão hemostático primário e a integridade microvascular contínua, com risco iminente de hemorragias cutaneomucosas e viscerais fatais.',
    leadHighlights: [
      'Confirmação obrigatória por esfregaço periférico',
      'Classificação mecanística em 5 grupos',
      'Distinção crucial entre ITP primária e CID',
      'Glicocorticoide e vincristina em dose única no cão',
      'Contraindicação fatal de azatioprina em felinos'
    ],
    pillars: [
      {
        title: 'Fisiopatologia e Mecanismos Centrais',
        body: 'A hemostasia primária depende da contagem e da competência funcional das plaquetas. O declínio numérico resulta de cinco mecanismos: destruição acelerada imunomediada (opsonização por IgG e fagocitose esplênica), falência de produção na medula óssea (aplasia megacariocítica, mieloftise, toxinas), consumo microvascular contínuo (CID, sepse grave), sequestro esplênico e perda/diluição.',
        highlights: ['5 mecanismos clássicos', 'Opsonização por IgG', 'Fagocitose no baço e fígado']
      },
      {
        title: 'Reconhecimento Clínico e Escore DOGiBAT',
        body: 'A carência plaquetária manifesta-se tipicamente como hemorragia de hemostasia primária: petéquias puntiformes, equimoses, sufusões, epistaxe, hematúria e melena. O sistema padronizado DOGiBAT quantifica o sangramento em 9 sítios anatômicos, demonstrando que o risco hemorrágico clínico depende da integridade endotelial e não apenas da contagem numérica absoluta.',
        highlights: ['Petéquias e equimoses', 'Escore DOGiBAT', 'Melena como alerta crítico']
      },
      {
        title: 'Terapêutica Racional e Evidências ACVIM',
        body: 'O manejo da ITP primária fundamenta-se na supressão imune com prednisona (2 mg/kg/dia) e uso adjuvante de vincristina (0,02 mg/kg IV dose única), que estimula a liberação plaquetária e promove a depuração de macrófagos fagocitários. Agentes de segunda linha (micofenolato, ciclosporina) e modernos agonistas de TPO (romiplostim) resgatam casos refratários crônicos.',
        highlights: ['Prednisona 2 mg/kg/dia', 'Vincristina 0,02 mg/kg IV', 'Romiplostim em refratários']
      }
    ]
  },

  etiology: {
    definicaoEClassificacaoMecanistica: 'A trombocitopenia é definida quantitativamente pela contagem de plaquetas abaixo do limite inferior de referência da espécie (habitualmente <150.000 a 200.000/uL no cão e <150.000 a 300.000/uL no gato). Clinicamente, o raciocínio fisiopatológico sólido exige a estratificação em cinco mecanismos principais: (1) destruição aumentada acelerada (imunomediada primária ou secundária a infecções, fármacos e neoplasias); (2) produção medular reduzida (hipoplasia ou aplasia megacariocítica por toxicidade por estrogênio, drogas quimioterápicas, infecções por FeLV/FIV ou invasão mielofítica neoplásica); (3) consumo acelerado (coagulação intravascular disseminada - CID, sepse grave, peritonite bacteriana e vasculites extensas); (4) sequestro esplênico (esplenomegalia congestiva por torção esplênica, hipertensão portal ou anestésicos vasodilatadores); e (5) perda hemorrágica maciça associada a hemodiluição por fluidoterapia volêmica desprovida de plaquetas.',

    hemostasiaPrimariaEFisiologiaPlaquetaria: 'As plaquetas circulantes originam-se da fragmentação citoplasmática de megacariócitos na medula óssea. A vida média plaquetária varia de 5 a 7 dias no cão e apenas 2 a 4 dias no gato. Na circulação normal, as plaquetas cumprem duas funções vitais: fornecer suporte trófico basal ao endotélio vascular (alimentando continuamente as células endoteliais e selando microfissuras da lâmina basal capilar) e desencadear a hemostasia primária após lesão vascular. A adesão inicial ao colágeno subendotelial exposto é mediada pelo Fator de von Willebrand (vWF) ligando-se ao complexo glicoproteico GPIb-IX. Isso deflagra a ativação plaquetária com mudança conformacional, exteriorização de fosfatidilserina procoagulante, secreção do conteúdo de grânulos densos (ADP, serotonina, cálcio) e grânulos alfa (fibrinogênio, Fator V, vWF), culminando na agregação plaqueta-plaqueta através da ponte de fibrinogênio no receptor ativado GPIIb/IIIa.',

    trombopoietinaERegulacaoMecanica: 'A produção plaquetária é regulada primariamente pelo eixo humoral da trombopoietina (TPO). A TPO é sintetizada de forma quase constante e constitutiva pelos hepatócitos e túbulos renais, sendo liberada na corrente sanguínea. A regulação dos níveis plasmáticos de TPO não é realizada primariamente por feedback transcricional direto, mas sim por depuração mecânica mediada por receptores: as plaquetas e megacariócitos expressam na membrana o receptor c-Mpl, que se liga à TPO circulante e a internaliza para degradação lisossômica. Assim, quando a massa plaquetária periférica total diminui (por aplasia medular), menos TPO é depurada, elevando a concentração sérica livre de TPO que se liga aos megacariócitos remanescentes para estimular a poliploidização e trombopoiese. Contudo, em estados inflamatórios graves ou na ITP ativa, citocinas inflamatórias (como IL-6) podem induzir superprodução hepática adicional de TPO.',

    pseudotrombocitopeniaEDTADependente: 'A pseudotrombocitopenia consiste em um artefato laboratorial in vitro em que contagens automatizadas de analisadores hematológicos relatam plaquetopenia severa espúria. O fenômeno ocorre quando o ácido etilenodiaminotetracético (EDTA) quelata o cálcio plasmático, provocando alteração conformacional nas glicoproteínas de membrana plaquetária (particularmente GPIIb/IIIa) e expondo criptoantígenos aos quais se ligam autoaglutininas pré-existentes (geralmente IgG ou IgM dependentes de temperatura). As plaquetas aglutinam-se em grandes grumos ou agregados. Os analisadores automáticos por impedância elétrica ou dispersão óptica não contabilizam esses aglomerados como plaquetas individuais, classificando-os incorretamente como leucócitos ou detritos celulares. O fenômeno é excepcionalmente prevalente na espécie felina: Riond et al. (2015) demonstraram que até 71% das amostras felinas colhidas em tubos convencionais de EDTA exibem agregação plaquetária in vitro. A avaliação microscópica imediata do esfregaço de sangue periférico é o procedimento padrão de triagem obrigatório para descartar grumos antes de qualquer intervenção clínica.',

    particularidadesRaciaisEGeneticas: 'Determinadas raças apresentam peculiaridades hematológicas fisiológicas benignas que mimetizam trombocitopenia patológica. A mais clássica e documentada ocorre no cão Cavalier King Charles Spaniel (CKCS), em que mais de 50% dos indivíduos são homozigotos para uma mutação autossômica recessiva de troca de sentido no gene da beta-1 tubulina (TUBB1). Essa mutação afeta o citoesqueleto megacariocítico, resultando na formação de plaquetas gigantes (macroplaquetas) em menor número absoluto (contagens frequentemente entre 30.000 e 100.000/uL). No entanto, o plaquetócrito (volume plaquetário total em circulação) e a capacidade hemostática são rigorosamente normais. Esses animais são assintomáticos, não apresentam diátese hemorrágica e NUNCA devem receber corticoterapia ou imunossupressão. Padrões similares de macroplaquetopenia assintomática foram identificados em Norfolk Terriers, Cairn Terriers, Akita Inu e Galgos (Greyhounds, que fisiologicamente têm contagens basais menores, entre 120.000 e 200.000/uL).',

    fisiopatologiaDaItpPrimaria: 'A trombocitopenia imunomediada primária (pITP ou idiopática) decorre da perda profunda de autotolerância imunológica contra antígenos de superfície plaquetária. Autoanticorpos da classe IgG (e menos frequentemente IgM ou IgA) ligam-se a epítopos de glicoproteínas de membrana (principalmente GPIIb/IIIa, GPIb-IX e GPIa/IIa). As plaquetas opsonizadas circulam até o baço e o fígado, onde macrófagos teciduais que expressam receptores Fc-gama reconhecem a porção constante dos anticorpos, promovendo fagocitose maciça e destruição prematura no sistema mononuclear fagocitário. A meia-vida plaquetária, que normalmente é de vários dias, desaba para escassas horas ou minutos. Adicionalmente, autoanticorpos e linfócitos T citotóxicos CD8+ ativados podem ligar-se aos mesmos antígenos em megacariócitos medulares jovens, inibindo a megacariocitopoiese e induzindo apoptose intramedular, o que explica por que até 20% a 30% dos pacientes com ITP apresentam paradoxalmente hipoplasia megacariocítica em vez de hiperplasia regenerativa.',

    trombocitopeniasInfecciosasEVetoriais: 'Infecções transmitidas por vetores e agentes intracelulares constituem a causa secundária mais frequente de trombocitopenia em cães e gatos em áreas endêmicas. Patógenos do gênero Ehrlichia (especialmente Ehrlichia canis) infectam monócitos e macrófagos, induzindo sequestro esplênico, destruição imunomediada secundária por exposição de neoantígenos ou deposição de imunocomplexos circulantes e, na fase crônica, aplasia medular panmielofítica imunoinduzida. Anaplasma platys exibe tropismo exclusivo por plaquetas, multiplicando-se dentro do citoplasma plaquetário e causando ciclos bacterêmicos paroxísticos de trombocitopenia cíclica infecciosa canina. Babesia spp. (Babesia vogeli, Babesia gibsoni) induz estresse oxidativo, dano endotelial vascular e destruição imunoinduzida secundária concomitante à anemia hemolítica (síndrome de Evans). Leishmania infantum deflagra intensa reação inflamatória crônica mediada por imunocomplexos com vasculite sistêmica, hipergamaglobulinemia policlonal e mieloftise inflamatória. Em gatos, o vírus da leucemia felina (FeLV) e da imunodeficiência felina (FIV), além de Mycoplasma haemofelis e Bartonella henselae, são deflagradores infecciosos fundamentais.',

    mielossupressaoETrombocitopeniaPorProducao: 'A insuficiência de produção medular decorre de lesão direta aos progenitores hematopoéticos pluripotentes (CD34+) ou aos megacariócitos unilineares. O hiperestrogenismo canino (induzido por tumores testiculares de células de Sertoli, tumores ovarianos de células da granulosa ou exposição iatrogênica a formulações tópicas humanas de estradiol) provoca aplasia medular grave e bifásica: após breve fase proliferativa transitória, instala-se mielossupressão profunda com hipoplasia granulocítica e megacariocítica associada a substituição da celularidade hematopoética por tecido adiposo denso, resultando em trombocitopenia severa e pancitopenia irreversível ou de longa recuperação. Fármacos quimioterápicos citotóxicos (doxorrubicina, carboplatina, ciclofosfamida, lomustina) induzem nadir plaquetário entre o 7º e 14º dia pós-administração. Outros medicamentos associados a aplasia imune ou tóxica incluem compostos sulfamídicos (sulfametoxazol-trimetoprima), cloranfenicol, fenobarbital, metimazol (em felinos) e azatioprina.',

    consumoPorCIDESepsis: 'A trombocitopenia por consumo acelerado ocorre quando a ativação generalizada da cascata de coagulação ou a lesão endotelial microvascular difusa recruta e agrega continuamente plaquetas periféricas mais rápido do que a capacidade de reposição medular. Na coagulação intravascular disseminada (CID), a geração intravascular sistêmica desregulada de trombina e a perda dos mecanismos anticoagulantes naturais (antitrombina, proteína C) deflagram microtrombose difusa em capilares de múltiplos órgãos. As plaquetas são incorporadas nesses microtrombos ricos em fibrina, esgotando o pool circulante. Em estados de sepse grave e choque séptico, endotoxinas bacterianas (lipopolissacarídeo - LPS), citocinas pró-inflamatórias (TNF-alfa, IL-1, IL-6) e armadilhas extracelulares de neutrófilos (NETs) ativam diretamente as plaquetas e lesam o glicocálice endotelial, perpetuando consumo microvascular acentuado.',

    sequestroEsplenicoEPerdaHemorragica: 'Em condições fisiológicas, o baço armazena aproximadamente 30% a 40% da massa plaquetária corpórea em um pool livremente intercambiável com a circulação sistêmica. Condições que causam esplenomegalia congestiva massiva (torção de pedículo esplênico, trombose de veia esplênica ou porta, hipertensão portal grave ou anestesia com derivados fenotiazínicos) podem aprisionar temporariamente até 60% a 80% do pool plaquetário no parênquima esplênico túrgido, reduzindo a contagem circulante. Na perda hemorrágica maciça aguda (por exemplo, ruptura de hemangiossarcoma ou politrauma vascular), a perda direta de plaquetas associada à infusão agressiva de grandes volumes de soluções cristaloides ou concentrado de hemácias isento de plaquetas provoca trombocitopenia dilucional progressiva, que compromete ainda mais a hemostasia primária.',

    tabelaMecanismosComparados: {
      headers: ['Mecanismo Fisiopatológico', 'Exemplos Clínicos Principais', 'Contagem Típica (uL)', 'Padrão no Hemograma', 'Achado de Medula Óssea'],
      rows: [
        ['Destruição Acelerada (ITP Primária)', 'Trombocitopenia imunomediada primária (pITP)', 'Muitas vezes <20.000 a 30.000', 'Plaquetopenia isolada; macroplaquetas frequentes', 'Hiperplasia megacariocítica (ou aplasia imune)'],
        ['Destruição Acelerada (Secundária)', 'Ehrlichiose, babesiose, neoplasias, reações a fármacos', 'Variável (10.000 a 80.000)', 'Plaquetopenia + anemia e/ou leucopenia/leucocitose', 'Megacariócitos normais ou aumentados'],
        ['Produção Diminuída (Medular)', 'Sertolioma (estrogênio), quimioterapia, FeLV, mieloftise', 'Frequentemente <30.000', 'Bicitopenia ou pancitopenia não regenerativa', 'Hipoplasia ou ausência de megacariócitos'],
        ['Consumo Microvascular', 'CID fulminante, choque séptico, pancreatite necrotizante', 'Habitualmente 30.000 a 100.000', 'Esquizócitos, tempos PT/aPTT prolongados', 'Celularidade variável dependente da causa'],
        ['Sequestro Esplênico / Perda', 'Torção esplênica, hemorragia maciça + fluidoterapia', 'Geralmente 50.000 a 120.000', 'Anemia hemorrágica associada, hipoproteinemia', 'Medula óssea normocelular a hipercelular'],
        ['Artefato (Pseudotrombocitopenia)', 'Aglutinação in vitro por EDTA (felinos 71%)', 'Geralmente espúria (<50.000)', 'Grumos na borda plumosa do esfregaço sanguíneo', 'Medula completamente normal']
      ]
    }
  },

  epidemiology: {
    epidemiologiaCaninaEPerfilRacial: 'A trombocitopenia é uma das anormalidades hemostáticas mais diagnosticadas na rotina de clínica e terapia intensiva de cães. A trombocitopenia imunomediada primária exibe distribuição etária bimodal, acometendo principalmente cães adultos de meia-idade (mediana de 4 a 8 anos). Fêmeas caninas apresentam risco relativo de 1,5 a 2 vezes maior em comparação aos machos inteiros ou castrados, padrão compatível com a predisposição feminina clássica a distúrbios autoimunes. As raças com predisposição demonstrada em coortes epidemiológicas incluem Cocker Spaniel Americano e Inglês, Poodle Miniatura e Standard, Bichon Frisé, Old English Sheepdog, Shih Tzu e Pastor Alemão. Em contrapartida, em regiões tropicais e subtropicais, as trombocitopenias infecciosas secundárias a hemoparasitoses (Ehrlichia canis, Babesia spp., Anaplasma spp.) superam numericamente a pITP em frequência absoluta de atendimentos hospitalares.',

    particularidadesFelinasESerieCourtney2026: 'Na espécie felina, a trombocitopenia verdadeira é clinicamente menos comum do que no cão, mas representa um desafio diagnóstico superior devido à altíssima incidência de pseudotrombocitopenia laboratorial por agregação em EDTA. Historicamente, considerava-se a pITP felina quase inexistente, atribuindo-se a grande maioria dos casos a infecções retrovirais (FeLV/FIV), peritonite infecciosa felina (FIP) ou neoplasias linfoproliferativas. Contudo, o importante estudo retrospectivo multicêntrico de Courtney et al. (2026) publicado no JAAHA avaliou detalhadamente uma série de 17 gatos com pITP confirmada. No estudo, 88,2% dos felinos apresentavam manifestações hemorrágicas ativas na apresentação inicial; a contagem plaquetária mediana foi de apenas 10.000/uL; a taxa de sobrevida mediana global alcançou 1.067 dias, evidenciando que felinos tratados com protocolos imunossupressores agressivos podem alcançar sobrevida prolongada. Notavelmente, 59% dos gatos apresentaram pelo menos um episódio de recidiva clínica, e apenas um paciente alcançou remissão completa sustentada sem necessidade de medicação contínua, consolidando a pITP felina como uma afecção crônica de alta taxa de recidiva.',

    escoreDogibatAfericaoHemorragica: 'O desenvolvimento do escore hemorrágico DOGiBAT (Dog Immune-Mediated Thrombocytopenia Bleeding Assessment Tool), validado e publicado por Makielski et al. (2018) em 61 cães com contagem plaquetária <50.000/uL, representou um marco fundamental na hemostasia veterinária. O estudo comprovou que a intensidade clínica do sangramento não apresenta correlação linear direta estrita com a contagem plaquetária absoluta: cães com contagens idênticas (por exemplo, 5.000/uL) podem apresentar desde petéquias cutâneas isoladas mínimas até hemorragia alveolar difusa ou melena volumosa ameaçadora à vida. O sistema DOGiBAT avalia nove sítios anatômicos específicos (pele, cavidade oral/gengiva, trato gastrointestinal, olhos/esclera, cavidade nasal, trato urinário, cavidades cavitárias, sistema nervoso central e sítios de venopunção) atribuindo notas de 0 a 2. O escore fornece uma ferramenta objetiva indispensável para estratificação de risco de mortalidade na admissão e acompanhamento diário de eficácia terapêutica na UTI.',

    fatoresPrognosticosIniciais: 'A identificação precoce de marcadores prognósticos adversos permite intensificar o suporte em terapia intensiva antes da falência orgânica. A coorte retrospectiva seminal de O\'Marra et al. (2011) avaliando 73 cães com ITP demonstrou sobrevida global à alta de 84%. Dentre todas as variáveis clínicas e laboratoriais testadas, a presença de melena macroscópica (hemorragia gastrointestinal alta) e a concentração sérica elevada de nitrogênio ureico sanguíneo (BUN/ureia) desproporcional à creatinina foram as duas únicas variáveis estatisticamente associadas a óbito ou eutanásia por agravamento. Outros fatores de risco descritos incluem azotemia renal concomitante, necessidade de múltiplas transfusões de hemácias, hiperbilirrubinemia na síndrome de Evans (concomitância de IMHA e ITP) e presença de sangramento em câmara anterior oftálmica (hifema) ou alterações neurológicas focais indicativas de sangramento no sistema nervoso central.'
  },

  pathogenesisTransmission: {
    cascata: [
      '1. Quebra de autotolerância ou mimetismo molecular: deflagração de resposta autoimune com proliferação clonal de linfócitos B e secreção de autoanticorpos IgG contra glicoproteínas de membrana plaquetária (GPIIb/IIIa, GPIb-IX), seja de forma primária ou estimulada por antígenos infecciosos, farmacológicos ou neoplásicos.',
      '2. Opsonização plaquetária periférica: os anticorpos circulantes ligam-se avidamente aos receptores da superfície das plaquetas viáveis no leito vascular.',
      '3. Depuração esplênica e hepática acelerada: macrófagos do sistema mononuclear fagocitário reconhecem a fração Fc dos anticorpos via receptores Fc-gama, internalizando e destruindo as plaquetas por fagocitose e lise enzimática, reduzindo sua sobrevida de dias para poucas horas.',
      '4. Lesão endotelial microvascular contínua: a perda crítica do suporte trófico basal fornecido pelas plaquetas às junções endoteliais enfraquece a barreira vascular dos capilares e vênulas pós-capilares.',
      '5. Diapedese hemática e diátese de hemostasia primária: sob pressão hidrostática fisiológica, eritrócitos extravasam pelas fenestras endoteliais desnudas, originando petéquias, equimoses, sufusões e hemorragias em mucosas.',
      '6. Hemorragia em órgãos nobres e choque: progressão para sangramento gastrointestinal volumoso (melena), hemotórax, hemorragia pulmonar ou hemorragia intracraniana, culminando em hipovolemia, anemia aguda e óbito.'
    ],
    transmissao: 'A forma primária (pITP) é uma afecção imune endógena, não infecciosa e não contagiosa. As formas secundárias infecciosas dependem de vetores biológicos hematófagos (carrapatos Rhipicephalus sanguineus para Ehrlichia canis e Babesia vogeli; Ixodes spp. para Anaplasma phagocytophilum; flebotomíneos Lutzomyia/Phlebotomus para Leishmania infantum) ou transmissão horizontal/vertical de retrovírus em felinos (FeLV e FIV).'
  },

  pathophysiology: {
    dinamicaHemorragicaCutaneomucosa: 'A diátese hemorrágica característica da trombocitopenia grave reflete a falência da hemostasia primária. Ao contrário dos distúrbios da hemostasia secundária (coagulopatias como hemofilias ou intoxicação por rodenticidas anticoagulantes, que causam grandes hematomas intramusculares e hemartroses cavitárias profundas), a trombocitopenia provoca sangramento superficial espontâneo em leitos capilares cutâneos e mucosos. As petéquias são pequenas hemorragias puntiformes (<2 a 3 mm de diâmetro) que não desaparecem à digitopressão (diascopia negativa), resultantes do escape de hemácias através de brechas endoteliais intercelulares não seladas. Conforme múltiplos focos hemorrágicos confluem, formam-se equimoses (lesões maculares maiores) e sufusões extensas em áreas dependentes de gravidade ou atrito (virilhas, axilas, abdome ventral). O sangramento gengival espontâneo e a epistaxe ocorrem pela fragilidade mecânica contínua das mucosas expostas ao ambiente.',

    permeabilidadeEndotelialERiscoSNC: 'As plaquetas exercem função constitutiva essencial na manutenção da estabilidade do endotélio microvascular. Plaquetas liberam continuamente no plasma fatores de crescimento (VEGF, bFGF, PDGF) e esfingosina-1-fosfato (S1P), substâncias que consolidam os complexos de junção aderente (caderina VE) e oclusão (claudinas/ocludinas) entre as células endoteliais. Quando a contagem plaquetária atinge níveis extremos (<10.000/uL), ocorre colapso progressivo da barreira endotelial mesmo na ausência de trauma físico externo. Esse mecanismo fundamenta a ocorrência súbita de complicações neurológicas devastadoras: micro-hemorragias intraparenquimatosas cerebrais ou cerebelares decorrentes da quebra da barreira hematoencefálica, manifestando-se como ataxia vestibular súbita, pupilas assimétricas, convulsões, coma e morte encefálica.',

    hemorragiaGastrointestinalEMelena: 'A mucosa gastrointestinal é submetida a atrito contínuo por alimentos, peristaltismo vigoroso e ambiente luminal agressivo (ácido gástrico, enzimas proteolíticas biliares e pancreáticas). Em animais com trombocitopenia profunda, microlesões mecânicas da mucosa do estômago e intestino delgado superior não são seladas imediatamente por tampões plaquetários, resultando em perda contínua de sangue intraluminal. Conforme a hemoglobina extravasada desce pelo trato digestivo, ela é digerida por proteases entéricas e exposta à microbiota cecocólica, convertendo o heme em hematina de coloração escura e conferindo às fezes aspecto pegajoso de borra de café com odor característico fétido (melena). A digestão das proteínas plasmáticas e da globina da hemoglobina no lúmen resulta em absorção maciça de aminoácidos pelo fígado, que são convertidos em ureia, gerando elevação desproporcional do nitrogênio ureico sanguíneo (BUN/ureia) com creatinina plasmática normal ou pouco alterada (azotemia pré-renal hemorrágica).'
  },

  clinicalSignsPathophysiology: [
    {
      system: 'Sinais Hemorrágicos Cutâneos e Mucosos (Hemostasia Primária)',
      findings: [
        {
          finding: 'Petéquias puntiformes em pele desprovida de pelos e mucosas',
          mechanism: 'Extravasamento de eritrócitos através de microbrechas endoteliais de capilares cutâneos e mucosos não seladas por tampões hemostáticos plaquetários ausentes.',
          clinicalMeaning: 'Achado clássico de carência plaquetária grave (quase invariavelmente associado a contagens <20.000 a 30.000/uL); investigar ITP primária imediatamente.',
          priority: 'emergency',
          context: ['Nelson & Couto 6a ed.', 'Garden et al. 2019']
        },
        {
          finding: 'Equimoses e sufusões coalescentes em abdome e virilhas',
          mechanism: 'Confluência de múltiplas hemorragias capilares e dissecção hemática na derme e tecido subcutâneo induzida por pequenos traumatismos locais ou gravidade.',
          clinicalMeaning: 'Indica diátese hemorrágica ativa e progressiva; requer repouso absoluto em gaiola estofada e manipulação mínima.',
          priority: 'emergency',
          context: ['Makielski et al. 2018 (DOGiBAT)']
        },
        {
          finding: 'Sangramento gengival espontâneo e petéquias em palato duro',
          mechanism: 'Lesão contínua da microvasculatura mucosa oral durante mastigação ou deglutição sem capacidade de hemostasia primária reparadora.',
          clinicalMeaning: 'Alerta crítico de risco hemorrágico sistêmico iminente; proibir dietas sólidas ou ossos duros.',
          priority: 'emergency',
          context: ['Plumb\'s 10a ed.']
        },
        {
          finding: 'Epistaxe unilateral ou bilateral espontânea',
          mechanism: 'Ruptura de capilares da mucosa dos cornetos nasais sob turbilhonamento de ar e pressão respiratória em animal trombocitopênico.',
          clinicalMeaning: 'Manifestação grave com risco de aspiração brônquica de sangue e pneumonia aspirativa associada.',
          priority: 'emergency',
          context: ['BSAVA Emergency 3a ed.']
        }
      ]
    },
    {
      system: 'Sinais Hemorrágicos Cavitários e Sistêmicos Graves',
      findings: [
        {
          finding: 'Melena profusa (fezes em borra de café) e hematêmese',
          mechanism: 'Extravasamento de sangue no lúmen gástrico e entérico superior, digerido por proteases e convertido em hematina escura no cólon.',
          clinicalMeaning: 'Marcador independente mais forte de mortalidade e pior prognóstico hospitalar na ITP canina (O\'Marra et al., 2011).',
          priority: 'emergency',
          context: ['O\'Marra et al. 2011']
        },
        {
          finding: 'Hematúria macroscópica em ausência de trauma ou cálculo',
          mechanism: 'Hemorragia dos capilares glomerulares e uroteliais vesicais desprovidos de estabilização plaquetária de barreira.',
          clinicalMeaning: 'Presente em proporção relevante de casos graves; contraindica formalmente cistocentese ou cateterismos agressivos.',
          priority: 'emergency',
          context: ['Lippi et al. 2019']
        },
        {
          finding: 'Hifema em câmara anterior do olho e hemorragia retiniana',
          mechanism: 'Extravasamento dos vasos uveais e coriorretinianos sob pressão intraocular fisiológica.',
          clinicalMeaning: 'Risco iminente de cegueira definitiva e forte preditor de micro-hemorragias simultâneas no sistema nervoso central.',
          priority: 'emergency',
          context: ['Ettinger 9a ed. 2024']
        },
        {
          finding: 'Déficits neurológicos súbitos, ataxia vestibular ou convulsões',
          mechanism: 'Micro-hemorragias intraparenquimatosas encefálicas ou hematomas subdurais decorrentes do colapso da barreira hematoencefálica.',
          clinicalMeaning: 'Complicação de extrema gravidade com risco iminente de herniação transtentorial e óbito rápido.',
          priority: 'emergency',
          context: ['Courtney et al. 2026']
        }
      ]
    },
    {
      system: 'Sinais Sistêmicos da Doença de Base e Hipovolemia',
      findings: [
        {
          finding: 'Palidez marcante de mucosas e taquicardia compensatória',
          mechanism: 'Anemia aguda decorrente de perda volêmica hemorrágica contínua ou hemólise extravascular concomitante (síndrome de Evans).',
          clinicalMeaning: 'Indica choque hipovolêmico ou hipóxia tecidual iminente; avaliar necessidade imediata de concentrado de hemácias.',
          priority: 'emergency',
          context: ['Feline ECC 2a ed.']
        },
        {
          finding: 'Febre ou hipotermia sistêmica',
          mechanism: 'Sepse grave de foco bacteriano com CID de consumo, ou liberação maciça de pirogênios endógenos em hemoparasitoses ativas.',
          clinicalMeaning: 'Afasta ITP primária isolada simples e exige triagem prioritária de patógenos vetoriais ou foco infeccioso oculto.',
          priority: 'emergency',
          context: ['Greene\'s Infectious Diseases 5a ed.']
        },
        {
          finding: 'Esplenomegalia ou linfadenomegalia generalizada palpável',
          mechanism: 'Hiperplasia reativa do sistema mononuclear fagocitário, infiltração neoplásica (linfoma, leucemia) ou infecção granulomatosa (Leishmania).',
          clinicalMeaning: 'Guia direcionamento imediato para imagem abdominal e biópsia/citologia de órgãos linfoides.',
          priority: 'common',
          context: ['Nelson & Couto 6a ed.']
        }
      ]
    }
  ],

  diagnosis: [
    {
      stepNumber: 1,
      title: 'Confirmação Visual no Esfregaço de Sangue Periférico e Exclusão de Pseudotrombocitopenia',
      purpose: 'Confirmar se a trombocitopenia é real e afastar artefato de agregação in vitro em EDTA',
      description: 'Coleta de sangue venoso periférico limpo com agulha de calibre adequado (21G a 23G) por venopunção rápida e atraumática (preferencialmente veia cefálica ou safena lateral/medial, NUNCA puncionar jugular em paciente com suspeita de trombocitopenia severa). Confeccionar imediatamente um esfregaço sanguíneo de alta qualidade na borda de uma lâmina antes de homogeneizar ou colocar no tubo. Realizar coloração panótica e examinar em microscopia óptica com objetiva de imersão (100x). Varrer minuciosamente a borda plumosa (feathered edge) e as margens laterais da lâmina procurando agregados ou grumos plaquetários. Se ausentes, estimar a contagem multiplicando a média de plaquetas por campo em 10 campos homogêneos da monocamada pelo fator de 15.000 a 20.000 (normal: 8 a 15 plaquetas por campo de imersão). Se houver grumos no tubo de EDTA, colher nova amostra em tubo de citrato de sódio (tubo de tampa azul com correção do fator de diluição líquida multiplicando a contagem automatizada por 1,1).',
      interpretation: 'Presença de agregados plaquetários confirma pseudotrombocitopenia (especialmente em gatos, com até 71% de ocorrência, e em cães com punções lentas). Ausência de plaquetas isoladas e de grumos confirma trombocitopenia verdadeira. Identificação de plaquetas gigantes isoladas (macroplaquetas) em Cavalier King Charles Spaniel sem sangramento confirma macroplaquetopenia hereditária benigna.',
      limitations: 'Plaquetas muito pequenas ou desgranuladas em analisadores antigos de impedância podem ser mal categorizadas; o olho clínico no esfregaço permanece soberano.',
      isGoldStandard: true
    },
    {
      stepNumber: 2,
      title: 'Triagem Laboratorial Integrada — Hemograma, Reticulócitos e Fração de Plaquetas Imaturas (IPF)',
      purpose: 'Diferenciar trombocitopenia isolada de citopenias múltiplas e mensurar atividade megacariocítica',
      description: 'Hemograma computadorizado com contagem automatizada por citometria de fluxo óptica fluorescente. Avaliar rigorosamente os índices eritrocitários (hematócrito, VCM, CHCM, RDW), contagem absoluta de reticulócitos e leucometria completa com contagem diferencial de leucócitos. Avaliar o volume plaquetário médio (MPV) e a fração de plaquetas imaturas (IPF / reticulated platelets).',
      interpretation: 'Trombocitopenia profunda (<20.000 a 30.000/uL) estritamente ISOLADA com série vermelha e branca normais aponta quase invariavelmente para ITP primária (ou fase ultraprecoce de hemoparasitose/fármaco). Bicitopenia (anemia + plaquetopenia) pode indicar perda hemorrágica, síndrome de Evans (esferócitos presentes e Coombs positivo) ou doença medular. Pancitopenia (anemia não regenerativa + leucopenia + plaquetopenia) aponta obrigatoriamente para falência medular central (aplasia por estrogênio, mieloftise, quimioterapia, FeLV). IPF elevado (>5% a 10%) demonstra trombopoiese medular acelerada e regenerativa periférica.',
      limitations: 'MPV pode estar falsamente normal em hipoplasia megacariocítica concomitante; IPF requer analisadores modernos dotados de canal de fluorescência óptica (Sysmex XN-V).',
      isGoldStandard: false
    },
    {
      stepNumber: 3,
      title: 'Painel de Coagulação (PT, aPTT, Fibrinogênio, D-Dímeros) — Diferenciação de CID e Consumo',
      purpose: 'Diferenciar imediatamente destruição imune de coagulopatia de consumo microvascular difusa',
      description: 'Colheita estéril e atraumática em tubo com citrato de sódio a 3,2% (proporção exata de 9 partes de sangue para 1 parte de anticoagulante). Determinação laboratorial do tempo de protrombina (PT / via extrínseca e comum), tempo de tromboplastina parcial ativada (aPTT / via intrínseca e comum), concentração plasmática de fibrinogênio por método de Clauss e dosagem quantitativa de D-dímeros. Avaliar esfregaço procurando esquizócitos (eritrócitos fragmentados por traves de fibrina).',
      interpretation: 'Na trombocitopenia imunomediada isolada (pITP), o PT, aPTT e fibrinogênio permanecem RIGOROSAMENTE NORMAIS, e D-dímeros estão basais ou discretamente reativos. Na CID de consumo, observa-se prolongamento expressivo de PT e/ou aPTT (>25% a 50% acima do controle), hipofibrinogenemia, elevação maciça de D-dímeros (>500 a 1000 ng/mL) e presença conspícua de esquizócitos.',
      limitations: 'Fases hipercoaguláveis iniciais de CID podem apresentar tempos de coagulação ainda normais ou paradoxalmente encurtados.',
      isGoldStandard: false
    },
    {
      stepNumber: 4,
      title: 'Investigação Infecciosa Vetorial e Sorologias/PCR Específicas',
      purpose: 'Identificar gatilhos infecciosos secundários que exigem terapia etiológica e contraindicam imunossupressão isolada',
      description: 'Painel diagnóstico de doenças transmitidas por vetores (Vector-Borne Diseases): teste sorológico rápido (SNAP 4Dx ou ELISA quantitativo) associado a PCR em tempo real (qPCR) em sangue total para Ehrlichia canis, Anaplasma phagocytophilum, Anaplasma platys, Babesia vogeli/gibsoni e Leishmania infantum (em cães). Em gatos, realizar teste ELISA/Imunocromatografia para antígeno p27 de FeLV e anticorpos anti-FIV, acompanhado de PCR para Mycoplasma haemofelis e Bartonella henselae.',
      interpretation: 'Positividade em PCR confirma infecção ativa e estabelece o diagnóstico de trombocitopenia infecciosa secundária (ou ITP secundária mediada por patógeno), exigindo antibioticoterapia direcionada imediata com doxiciclina ou antiprotozoários.',
      limitations: 'Fases hiperagudas podem ter sorologia negativa (janela imunológica); animais cronicamente infectados em áreas endêmicas podem ter títulos sorológicos residuais sem que o microrganismo seja o responsável atual pela diátese aguda.',
      isGoldStandard: false
    },
    {
      stepNumber: 5,
      title: 'Diagnóstico por Imagem (Ultrassonografia Abdominal e Radiografia Torácica)',
      purpose: 'Rastrear neoplasias ocultas, linfonodomegalias, massas esplênicas e hemorragias cavitárias',
      description: 'Ultrassonografia abdominal total detalhada para avaliar arquitetura esplênica (padrão em queijo suíço, nódulos ou massas de hemangiossarcoma/linfoma), parênquima hepático, linfonodos mesentéricos, adrenais e integridade do trato urogenital. Radiografias de tórax em três projeções ortogonais (lateral direita, lateral esquerda e ventrodorsal) para investigar metástases pulmonares, linfadenomegalia esternal ou traqueobrônquica e sinais de hemorragia alveolar ou efusão pleural.',
      interpretation: 'Detecção de esplenomegalia com nódulos cavitários suspeitos aponta para trombocitopenia secundária oncológica (hemangiossarcoma) ou sequestro. Esplenomegalia homogênea leve a moderada é achado reativo comum e inespecífico na pITP decorrente de hiperplasia macrofágica compensatória.',
      limitations: 'Presença de líquido livre abdominal pode exigir punção diagnóstica de resgate; em trombocitopênicos severos, centese deve ser executada com técnica delicada guiada por ultrassom.',
      isGoldStandard: false
    },
    {
      stepNumber: 6,
      title: 'Avaliação de Medula Óssea (Mielograma Citológico e Core Biopsy)',
      purpose: 'Diferenciar falha de produção central de destruição periférica em casos com citopenias múltiplas',
      description: 'Aspiração de medula óssea (crista ilíaca, trocânter maior do fêmur ou tuberosidade umeral) sob sedação apropriada e anestesia local, associada a biópsia por agulha de Jamshidi se houver suspeita de mielofibrose ou aplasia. Procedimento indicado estritamente quando houver bicitopenia/pancitopenia inexplicada, trombocitopenia profunda sem resposta a 7 a 14 dias de imunossupressão ou suspeita de hiperestrogenismo/neoplasia hematopoética.',
      interpretation: 'Na pITP clássica: hiperplasia megacariocítica marcante com predomínio de megacariócitos imunes ou maduros vacuolizados e relação mieloide:eritroide preservada. Na aplasia por estrogênio ou drogas: hipoplasia megacariocítica severa com substituição adiposa (>70% a 90% de gordura) e ausência de precursores. Na mieloftise: infiltração neoplásica por blastos leucêmicos, células linfomatosas ou mastócitos.',
      limitations: 'Procedimento invasivo que envolve pequeno risco de hemorragia no sítio de punção cortical; na trombocitopenia isolada com resposta terapêutica favorável, a punção de medula é desnecessária e dispensável.',
      isGoldStandard: false
    },
    {
      stepNumber: 7,
      title: 'Ensaios Imunológicos Específicos (Anticorpos Antiplaquetários e Citometria de Fluxo)',
      purpose: 'Documentar a presença de imunoglobulinas ligadas à superfície plaquetária',
      description: 'Ensaios especializados de citometria de fluxo para detecção de imunoglobulinas de membrana ligadas a plaquetas (Platelet-Surface-Bound Immunoglobulins - PSBIgG / PSBIgM). O ensaio quantifica a fluorescência de anticorpos secundários antiespécie conjugados a fluorocromos ligando-se às plaquetas do paciente.',
      interpretation: 'Sensibilidade descrita na literatura é moderada a alta (80% a 90%), porém a especificidade é limitada (60% a 80%), pois anticorpos antiplaquetários secundários e deposição inespecífica de imunocomplexos ocorrem frequentemente em neoplasias, infecções por vetores e inflamações sistêmicas.',
      limitations: 'Disponibilidade restrita a laboratórios de referência universitários e custo elevado; o resultado raramente altera a conduta emergencial imediata na admissão.',
      isGoldStandard: false
    }
  ],

  treatment: {
    metaPrimaria: 'Cessar a destruição acelerada imune de plaquetas, elevar rapidamente a contagem para níveis hemostáticos seguros (>40.000 a 50.000/uL), estabilizar a integridade endotelial microvascular e prevenir hemorragias fatais em sistema nervoso central, trato gastrointestinal ou parênquima pulmonar.',

    estabilizacaoEmergencialECuidadosHandsOff: 'Pacientes com trombocitopenia grave (<20.000 a 30.000/uL) devem ser manejados sob protocolo estrito de enfermagem de manipulação mínima (hands-off). Qualquer traumatismo inadvertido pode deflagrar hematomas compressivos fulminantes. Regras estritas: (1) é expressamente proibida a venopunção da veia jugular (risco de hemoma cervical expansivo com asfixia mecânica por compressão traqueal); realizar punções exclusivamente em veias cefálicas ou safenas laterais/mediais; (2) manter compressão manual contínua e firme no sítio de punção por pelo menos 5 a 10 minutos com fita hemostática suave não constritiva; (3) proibir injeções intramusculares e subcutâneas agressivas; (4) não realizar cistocentese ou cateterismos uretrais traumáticos; (5) alojamento obrigatório em canil ou gatil acolchoado com superfícies de espuma viscoelástica ou cobertores macios, sem pisos lisos ou grades salientes; (6) evitar agitação e latidos excessivos; e (7) fornecer dieta exclusivamente úmida e pastosa para evitar abrasões mecânicas da mucosa oral ou esofágica.',

    terapiaImunossupressoraPrimeiraLinhaGlicocorticoides: 'Os glicocorticoides constituem a base insubstituível da terapia de indução na pITP primária. Seu mecanismo de ação abrange três frentes: inibição imediata da fagocitose de plaquetas opsonizadas por bloqueio dos receptores Fc-gama dos macrófagos esplênicos; estabilização da barreira endotelial vascular reduzindo a fragilidade capilar em 24 a 48 horas (mesmo antes da subida numérica de plaquetas); e, a médio prazo, redução da produção de novos autoanticorpos pelos linfócitos B. Dose canina recomendada pelo consenso ACVIM (Garden et al., 2019): prednisona ou prednisolona a 2 mg/kg/dia VO (dividida em 1 mg/kg a cada 12 horas ou dose única matinal). As antigas doses de 3 a 4 mg/kg/dia estão proscritas pela elevada taxa de complicações fatais (pancreatite aguda, úlceras gastrointestinais perfuradas e sepse bacteriana secundária) sem qualquer ganho de eficácia clínica. Em gatos: prednisolona a 2 a 3 mg/kg/dia VO (gatos não realizam a conversão hepática eficaz de prednisona em prednisolona, exigindo a forma ativa). Em animais com vômito, anorexia ou melena grave: substituir temporariamente pela via intravenosa com dexametasona a 0,1 a 0,2 mg/kg IV a cada 24 horas.',

    protocoloVincristinaDoseUnica: 'A administração adjuvante de sulfato de vincristina em dose única na admissão é uma das intervenções com maior nível de evidência e benefício clínico demonstrado para cães com ITP primária aguda. O estudo clínico seminal randomizado de Balog et al. (2013) publicado no Journal of Veterinary Internal Medicine comprovou que cães que receberam vincristina associada a prednisona alcançaram contagem plaquetária segura (>40.000/uL) em uma mediana de apenas 2,5 a 3 dias, em comparação a 5 dias naqueles tratados com corticoide isolado, reduzindo significativamente o período de hospitalização e os custos de internação. Mecanismos de ação: estimula a liberação acelerada de plaquetas por megacariócitos medulares maduros e liga-se à tubulina das plaquetas periféricas que, quando fagocitadas por macrófagos esplênicos, provocam apoptose seletiva e paralisia transitória do sistema mononuclear fagocitário. Dose: 0,02 mg/kg IV em bolus lento de dose ÚNICA (ou 0,5 mg/m² de superfície corporal). CUIDADO CRÍTICO: a vincristina é um vesicante tecidual extremamente potente; deve ser aplicada obrigatoriamente através de cateter intravenoso recém-colocado, perfeitamente testado com fluxo livre de solução salina fisiológica estéril antes e após a injeção. NÃO é recomendada de rotina em gatos.',

    imunoglobulinaHumanaIntravenosahIVIG: 'A imunoglobulina humana intravenosa (hIVIG) é uma terapia de resgate de ação ultra-rápida indicada para cães com ITP aguda grave refratária, hemorragias profusas ameaçadoras à vida ou naqueles que não podem receber corticosteroides em doses imunossupressoras plenas (ex: sepse grave concomitante ou úlcera gástrica perfurante prévia). Mecanismo: satura e bloqueia de forma competitiva e estequiométrica os receptores Fc-gama na membrana dos macrófagos teciduais, interrompendo a fagocitose de plaquetas em questão de 12 a 24 horas. Dose: 0,5 a 1,0 g/kg IV administrada em infusão contínua lenta ao longo de 6 a 12 horas. Riscos e limitações: custo financeiro extremamente elevado, disponibilidade comercial intermitente e risco documentado de reações de hipersensibilidade aguda anafilactóide durante a infusão. Devido à sua natureza heteróloga humana em cães, a hIVIG deflagra formação de anticorpos antiespécie em 7 a 14 dias, o que inviabiliza sua repetição futura pelo risco altíssimo de choque anafilático.',

    segundaLinhaImunossupressoraMMFCiclosporina: 'A introdução de um segundo agente imunossupressor é recomendada na admissão em cães com ITP grave de alto risco hemorrágico (DOGiBAT elevado ou melena), ou naqueles com resposta inadequada à corticoterapia após 5 a 7 dias. No cão, o Micofenolato de Mofetila (MMF) é atualmente a droga de escolha mais indicada: atua inibindo seletivamente a enzima inosina monofosfato desidrogenase (IMPDH), bloqueando a síntese de novo de purinas em linfócitos T e B ativados. Dose: 10 a 15 mg/kg VO a cada 12 horas. Apresenta início de ação relativamente rápido (24 a 48 horas); o principal efeito adverso é enterite ou diarreia líquida sanguinolenta (que reverte com redução de dose ou suspensão). A Ciclosporina microemulsionada (5 mg/kg VO a cada 12 ou 24 horas) atua como inibidor da calcineurina, suprimindo a transcrição de IL-2 e ativação de linfócitos T auxiliares; seu início de ação pleno requer de 1 a 2 semanas. A Azatioprina (2 mg/kg VO a cada 24 horas por 14 dias, seguida de 2 mg/kg em dias alternados) é uma opção clássica de baixo custo no cão, porém seu início de ação é excessivamente lento (2 a 4 semanas) e requer monitoramento hematológico e de enzimas hepáticas (ALT) a cada 2 a 3 semanas.',

    alertaMaximoAzatioprinaToxicidadeFelina: 'ALERTA TOXICOLÓGICO MÁXIMO E ABSOLUTO: A azatioprina é FORMALMENTE CONTRAINDICADA NA ESPÉCIE FELINA. Os gatos possuem deficiência genética natural marcante na atividade da enzima tiopurina metiltransferase (TPMT), responsável pela metabolização e inativação dos metabólitos citotóxicos da azatioprina. Em felinos, mesmo doses mínimas da droga levam ao acúmulo de 6-tioguanina na medula óssea, resultando invariavelmente em aplasia medular panmielofítica fulminante e irreversível, choque séptico neutropênico e óbito. Em gatos que necessitam de um segundo imunossupressor adjuvante à prednisolona, as drogas seguras e preconizadas são a ciclosporina microemulsionada (5 a 7 mg/kg/dia VO) ou o clorambucil (0,1 a 0,2 mg/kg VO a cada 24 a 48 horas).',

    antimicrobianosEmpiricosDoxiciclina: 'Em qualquer cão ou gato com trombocitopenia profunda atendido em áreas endêmicas de doenças transmitidas por carrapatos, deve-se instituir imediatamente terapia antimicrobiana empírica direcionada com Doxiciclina na dose de 10 mg/kg VO a cada 24 horas (ou 5 mg/kg VO a cada 12 horas) por 28 dias, enquanto se aguardam os resultados de PCR e sorologias. A doxiciclina cobre eficazmente infecções por Ehrlichia canis, Anaplasma platys, Anaplasma phagocytophilum, Mycoplasma haemofelis e Bartonella spp. Em felinos, a administração de comprimidos ou cápsulas de doxiciclina deve ser OBRIGATORIAMENTE acompanhada da ingestão forçada de pelo menos 5 a 10 mL de água fresca ou administrada embebida em pastilhas úmidas/líquidas para evitar esofagite medicamentosa necrotizante e estenose esofágica cicatricial secundária.',

    estrategiaTransfusionalPlaquetasEConcentrado: 'O suporte hemoterápico na trombocitopenia exige racionalidade fisiopatológica rigorosa: (1) Concentrado de Plaquetas (fresco, criopreservado ou liofilizado): NÃO deve ser usado profilaticamente para corrigir o número plaquetário na ITP ativa, pois os autoanticorpos circulantes destroem as plaquetas doadas em poucos minutos a horas. A transfusão plaquetária é restrita estritamente a hemorragias catastróficas ativas com risco iminente de morte (hemorragia no SNC, hemotórax maciço, choque hemorrágico refratário) ou para permitir cirurgias hemostáticas de resgate; (2) Plasma Fresco Congelado (PFC): NÃO contém plaquetas viáveis funcionais e NÃO tem indicação no tratamento de trombocitopenia isolada; seu uso deve ser restrito a pacientes com coagulopatia secundária associada (CID com aPTT/PT prolongados); (3) Concentrado de Hemácias: altamente indicado quando a perda hemorrágica contínua provoca anemia aguda descompensada com hematócrito <15% a 18% associada a sinais de hipóxia (taquicardia grave, taquipneia, hiperlactatemia >2,5 mmol/L). Sangue total fresco (colhido há menos de 4 a 6 horas) pode ser utilizado na indisponibilidade de componentes fracionados, fornecendo eritrócitos e pequeno aporte plaquetário.',

    agonistasDoReceptorDeTPO: 'O uso de agonistas miméticos do receptor de trombopoietina (TPO-RAs) representa o mais relevante avanço terapêutico contemporâneo para trombocitopenias refratárias primárias ou aplasias megacariocíticas em pequenos animais. O Romiplostim é um peptídeo de fusão que se liga especificamente ao receptor c-Mpl em progenitores megacariocíticos, estimulando proliferação e maturação plaquetária rápida. Em cães com pITP refratária crônica ou hipoplasia megacariocítica, o estudo de Logtenberg et al. (2026) e séries clínicas recentes demonstraram remissão clínica completa e sustentada com doses de 3 a 5 mcg/kg SC administradas a cada 7 dias, permitindo o desmame total de glicocorticoides e outros imunossupressores sem evidência de efeitos colaterais adversos. O Eltrombopag (agonista oral não peptídico) também tem sido explorado experimentalmente.',

    desmameSeguroEProtocoloDeManutencao: 'A redução prematura da imunossupressão é a causa primária de recidivas fulminantes na rotina clínica. Protocolo de desmame contemporâneo orientado pelo ACVIM: (1) Manter a dose plena de indução de prednisona (2 mg/kg/dia) por pelo menos 2 a 4 semanas após a normalização sustentada da contagem de plaquetas (>150.000 a 200.000/uL); (2) Reduzir a dose em aproximadamente 25% a cada 2 a 4 semanas, desde que a contagem plaquetária permaneça estável no intervalo normal de referência em hemograma realizado 48 horas antes da redução programada; (3) Em cães recebendo protocolo duplo (prednisona + MMF/ciclosporina), realizar o desmame completo do glicocorticoide primeiro, mantendo o segundo imunossupressor em monoterapia por mais 4 a 8 semanas antes de iniciar seu próprio desmame gradual; (4) A duração total média do tratamento imunossupressor na pITP varia de 4 a 6 meses.',

    praticasInadequadasEArmadilhas: 'Condutas formais proscritas: NUNCA prescrever anti-inflamatórios não esteroidais (AINEs como meloxicam, carprofeno ou firocoxib) em pacientes trombocitopênicos, pois os AINEs inibem a cicloxigenase-1 (COX-1) e anulam a produção de tromboxano A2 (TXA2), bloqueando a função das escassas plaquetas restantes e induzindo sangramento gastrointestinal maciço; NUNCA administrar azatioprina a gatos sob qualquer circunstância; NUNCA puncionar veia jugular ou realizar cistocentese em animais com trombocitopenia profunda; NÃO utilizar gastroprotetores (omeprazol) de forma empírica prolongada e preventiva para todo cão com prednisolona se não houver hemorragia gastrointestinal evidente, evitando disbiose entérica.',

    monitoramentoHematologicoSeriado: 'O plano de monitoramento na internação deve incluir: aferição do escore DOGiBAT a cada 12 horas; contagem de plaquetas diária durante os primeiros 3 a 5 dias de terapia até confirmação de tendência de subida (>40.000 a 50.000/uL); monitoramento de hematócrito e proteínas plasmáticas totais (PPT) a cada 12 a 24 horas para detecção precoce de sangramento gastrointestinal oculto; dosagem de ureia, creatinina e eletrólitos a cada 48 horas. Após a alta clínica, realizar hemograma completo semanalmente durante o primeiro mês, a cada 2 a 3 semanas durante as etapas de desmame medicamentoso e imediatamente caso o tutor observe qualquer nova petéquia ou alteração comportamental.'
  },

  complications: [
    {
      complication: 'Hemorragia gastrointestinal grave e choque hipovolêmico',
      frequency: 'Comum em casos graves (25% a 35%)',
      clinicalImplication: 'Extravasamento contínuo de sangue na mucosa digestiva manifestando-se por melena e azotemia pré-renal hemorrágica; constitui o principal fator preditor de óbito hospitalar (O\'Marra et al., 2011).'
    },
    {
      complication: 'Hemorragia no sistema nervoso central (intracraniana / subdural)',
      frequency: 'Rara a incomum (2% a 5%)',
      clinicalImplication: 'Micro-hemorragias intraparenquimatosas cerebrais ou troncoencefálicas que deflagram convulsões, coma e herniação cerebral com mortalidade superior a 80%.'
    },
    {
      complication: 'Hifema e descolamento hemorrágico de retina',
      frequency: 'Incomum (5% a 10%)',
      clinicalImplication: 'Sangramento intraocular em câmara anterior e posterior com risco de cegueira definitiva permanente por glaucoma secundário ou atrofia retiniana.'
    },
    {
      complication: 'Síndrome de Evans (IMHA associada a ITP)',
      frequency: 'Descrita em 10% a 15% dos casos caninos',
      clinicalImplication: 'Destruição autoimune concomitante de hemácias e plaquetas; sobrevida significativamente menor, demandando imunossupressão mais agressiva e suporte transfusional frequente.'
    },
    {
      complication: 'Tromboembolismo paradoxal e trombocitose rebote',
      frequency: 'Incomum pós-recuperação (3% a 7%)',
      clinicalImplication: 'Durante a fase de remissão com hiperplasia megacariocítica vigorosa e corticoterapia crônica em altas doses, a rápida liberação de plaquetas reticuladas hiper-reativas pode predispor a trombose pulmonar ou vascular paradoxal.'
    },
    {
      complication: 'Recidiva da trombocitopenia imunomediada',
      frequency: '30% a 40% em cães e 59% em gatos (Courtney et al., 2026)',
      clinicalImplication: 'Retorno da diátese hemorrágica semanas a meses após o início do desmame medicamentoso; exige reintrodução imediata de doses plenas de imunossupressores e avaliação de segunda linha ou TPO-RAs.'
    }
  ],

  prevention: [
    'Controle antiparasitário contínuo e rigoroso contra carrapatos durante todo o ano com isoxazolinas ou coleiras repelentes para prevenir hemoparasitoses deflagradoras de trombocitopenia.',
    'Testagem sorológica e virológica periódica de felinos para FeLV e FIV, mantendo gatos soronegativos estritamente domiciliados em ambiente indoor.',
    'Evitar o uso de medicamentos com potencial mielotóxico ou deflagrador de discrasias imunes (sulfas, fenobarbital, metimazol) em animais com histórico prévio de citopenias.',
    'Desmame extremamente cauteloso e lento de protocolos imunossupressores na ITP, respeitando reduções máximas de 25% a cada 2 a 4 semanas com contagens comprovadamente estáveis.',
    'Monitoramento hematológico preventivo em cães com macroplaquetopenia congênita (Cavalier King Charles) para estabelecer sua contagem basal individual e evitar tratamentos iatrogênicos incorretos.'
  ],

  figures: [
    {
      url: '/consulta-vet/trombocitopenia/esfregaco-agregacao-plaquetaria-pseudotrombocitopenia.jpg',
      caption: 'Esfregaço de sangue periférico corado por Wright demonstrando múltiplos agregados e grumos de plaquetas no corpo e borda da lâmina, caracterizando pseudotrombocitopenia in vitro induzida por EDTA.',
      source: 'Prof. Erhabor Osaro (Wikimedia Commons), CC BY-SA 4.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/esfregaco-macroplaqueta-trombopoiese.jpg',
      caption: 'Microscopia de esfregaço sanguíneo evidenciando macroplaqueta gigante (com diâmetro comparável ou superior a um eritrócito), indicativa de trombopoiese regenerativa acelerada de resgate ou macroplaquetopenia genética racial (como na raça Cavalier King Charles Spaniel).',
      source: 'Ed Uthman, MD (Wikimedia Commons / Flickr), CC BY 2.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/petequias-equimoses-dorso-cao-logtenberg2026.jpg',
      caption: 'Exame dermatológico do dorso de cão com trombocitopenia imunomediada refratária primária sob pelo afastado. Observam-se petéquias punctiformes e sufusões hemorrágicas coalescentes na epiderme decorrentes da falência de hemostasia primária.',
      source: 'Logtenberg, Teske & Buijtels (2026), Veterinary Record Case Reports, CC BY 4.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/curva-plaquetas-romiplostim-logtenberg2026.jpg',
      caption: 'Curva longitudinal de resposta da contagem de trombócitos (plaquetas x 10^9/L) em cão com ITP refratária submetido a protocolo com prednisolona, micofenolato de mofetila e resgate com o agonista do receptor de trombopoietina romiplostim ao longo de 400 dias, resultando em remissão estável sustentada.',
      source: 'Logtenberg, Teske & Buijtels (2026), Veterinary Record Case Reports, CC BY 4.0'
    },
    {
      url: '/consulta-vet/trombocitopenia/medula-aplasia-megacariocitica-scielo2019.jpg',
      caption: 'Avaliação de medula óssea de cão com trombocitopenia profunda (5.000/uL) e pancitopenia por hiperestrogenismo secundário a tumor de células de Sertoli. (A) Citologia do aspirado exibindo escassas células hematopoéticas; (B) Biópsia histopatológica evidenciando bi-hipoplasia severa com substituição adiposa de 70% e ausência de linhagem megacariocítica.',
      source: 'Silva et al. (2019), Arquivo Brasileiro de Medicina Veterinária e Zootecnia (SciELO), CC BY 4.0'
    }
  ],

  references: [
    {
      id: 'ref-garden-2019',
      title: 'ACVIM consensus statement on the diagnosis of immune-mediated thrombocytopenia in dogs and cats',
      citationText: 'Garden OJ, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated thrombocytopenia in dogs and cats. J Vet Intern Med. 2019;33(4):1463-1483. DOI: 10.1111/jvim.15586.',
      sourceType: 'clinical_guideline',
      url: 'https://doi.org/10.1111/jvim.15586',
      evidenceLevel: 'high',
      notes: 'Consenso oficial do ACVIM estabelecendo os critérios diagnósticos rigorosos para ITP primária e secundária em cães e gatos, recomendando avaliação sistemática de esfregaço e investigação etiológica de exclusão.'
    },
    {
      id: 'ref-balog-2013',
      title: 'A randomized and double-blind clinical trial of the effects of vincristine on tolerance and efficacy in dogs with primary immune-mediated thrombocytopenia',
      citationText: 'Balog KE, Rozanski EA, Stockman CA, et al. A randomized and double-blind clinical trial of the effects of vincristine on tolerance and efficacy in dogs with primary immune-mediated thrombocytopenia. J Vet Intern Med. 2013;27(4):948-954. DOI: 10.1111/jvim.12066.',
      sourceType: 'clinical_trial',
      url: 'https://doi.org/10.1111/jvim.12066',
      evidenceLevel: 'high',
      notes: 'Ensaio clínico seminal randomizado demonstrando que vincristina 0,02 mg/kg IV associada a prednisona reduz o tempo mediano de recuperação para plaquetas >40.000/uL de 5 dias para apenas 2,5 a 3 dias.'
    },
    {
      id: 'ref-makielski-2018',
      title: 'Development and implementation of a novel immune thrombocytopenia bleeding score for dogs (DOGiBAT)',
      citationText: 'Makielski KM, Brooks MB, Wang C, et al. Development and implementation of a novel immune thrombocytopenia bleeding score for dogs. J Vet Intern Med. 2018;32(3):1041-1050. DOI: 10.1111/jvim.15089.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1111/jvim.15089',
      evidenceLevel: 'high',
      notes: 'Desenvolvimento e validação do escore clínico padronizado DOGiBAT para quantificação objetiva de sangramento em 9 sítios anatômicos em cães com trombocitopenia <50.000/uL.'
    },
    {
      id: 'ref-omarra-2011',
      title: 'Treatment and predictors of outcome in dogs with primary immune-mediated thrombocytopenia',
      citationText: 'O\'Marra SK, Delaforcade AM, Shaw SP. Treatment and predictors of outcome in dogs with primary immune-mediated thrombocytopenia. J Am Vet Med Assoc. 2011;238(3):346-352. DOI: 10.2460/javma.238.3.346.',
      sourceType: 'cohort_study',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21281218/',
      evidenceLevel: 'moderate',
      notes: 'Coorte de 73 cães com ITP demonstrando sobrevida hospitalar de 84% e identificando melena e ureia/BUN elevado como os preditores clínicos mais fortes de mortalidade.'
    },
    {
      id: 'ref-courtney-2026',
      title: 'Primary Immune-Mediated Thrombocytopenia in 17 Cats: A Multicenter Retrospective Study',
      citationText: 'Courtney L, Mackin A, Thomason J, et al. Primary Immune-Mediated Thrombocytopenia in 17 Cats: A Multicenter Retrospective Study. J Am Anim Hosp Assoc. 2026;62(1):e7525. DOI: 10.5326/JAAHA-MS-7525.',
      sourceType: 'cohort_study',
      url: 'https://pubmed.ncbi.nlm.nih.gov/42014091/',
      evidenceLevel: 'moderate',
      notes: 'Série retrospectiva contemporânea mais detalhada de pITP felina com 17 casos: sangramento em 88,2%, sobrevida mediana de 1.067 dias e alta taxa de recidiva clínica de 59%.'
    },
    {
      id: 'ref-logtenberg-2026',
      title: 'Long-term use of romiplostim in the treatment of refractory immune-mediated thrombocytopenia in a dog',
      citationText: 'Logtenberg TT, Teske E, Buijtels JJCWM. Long-term use of romiplostim in the treatment of refractory immune-mediated thrombocytopenia in a dog. Vet Rec Case Rep. 2026;14(1):e70320. DOI: 10.1002/vrc2.70320.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1002/vrc2.70320',
      evidenceLevel: 'moderate',
      notes: 'Documentação clínica com seguimento de 52 semanas comprovando eficácia e segurança do agonista do receptor de TPO romiplostim em cão com ITP refratária crônica (CC BY 4.0).'
    },
    {
      id: 'ref-riond-2015',
      title: 'Effective prevention of pseudothrombocytopenia in feline blood samples with the prostaglandin I2 analogue iloprost',
      citationText: 'Riond B, Waßmuth AK, Hartnack S, Hofmann-Lehmann R, Lutz H. Effective prevention of pseudothrombocytopenia in feline blood samples with the prostaglandin I2 analogue iloprost. BMC Vet Res. 2015;11:183. DOI: 10.1186/s12917-015-0510-x.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1186/s12917-015-0510-x',
      evidenceLevel: 'moderate',
      notes: 'Demonstrou prevalência de 71% de agregação plaquetária in vitro em amostras felinas colhidas em EDTA convencional e papel de análogos de PGI2.'
    },
    {
      id: 'ref-silva-2019',
      title: 'Bone marrow bi-hypoplasia in a dog with a Sertoli cell tumor',
      citationText: 'Silva RO, Brandão YM, Souza FA, et al. Bone marrow bi-hypoplasia in a dog with a Sertoli cell tumor. Arq Bras Med Vet Zootec. 2019;71(2):497-502. DOI: 10.1590/1678-4162-10515.',
      sourceType: 'peer_reviewed_journal',
      url: 'https://doi.org/10.1590/1678-4162-10515',
      evidenceLevel: 'moderate',
      notes: 'Documentação citológica e histopatológica de aplasia megacariocítica e granulocítica induzida por hiperestrogenismo neoplásico canino com substituição adiposa medular (CC BY 4.0).'
    },
    {
      id: 'ref-nelson-couto-6ed',
      title: 'Small Animal Internal Medicine',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Chapter 83: Disorders of Platelets and Primary Hemostasis, pp. 1290-1308.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Referência basilar para classificação mecanística das trombocitopenias, fisiologia megacariocítica, interpretação de medula óssea e farmacoterapia com vincristina e imunossupressores.'
    },
    {
      id: 'ref-ettinger-9ed',
      title: 'Textbook of Veterinary Internal Medicine',
      citationText: 'Ettinger SJ, Feldman EC, Côté E. Textbook of Veterinary Internal Medicine. 9th ed. Philadelphia: Elsevier; 2024. Chapter 274: Platelet Disorders and Immune Thrombocytopenia, pp. 2015-2032.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Tratado abrangente descrevendo a imunopatogenia celular T e B, receptor de trombopoietina e recomendações clínicas do ACVIM.'
    },
    {
      id: 'ref-feline-ecc-2ed',
      title: 'Feline Emergency and Critical Care Medicine',
      citationText: 'Drobatz KJ, Beal MW, Syring RS, eds. Feline Emergency and Critical Care Medicine. 2nd ed. Hoboken: Wiley-Blackwell; 2023. Chapter 32: Hematologic Emergencies in the Cat, pp. 385-398.',
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Abordagem intensiva das emergências hematológicas felinas, desafios da hemostasia primária em gatos e manejo de transfusões.'
    },
    {
      id: 'ref-plumbs-10ed',
      title: "Plumb's Veterinary Drug Handbook",
      citationText: "Budde JA, ed. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      sourceType: 'textbook',
      evidenceLevel: 'high',
      notes: 'Monografias farmacológicas de prednisona, prednisolona, dexametasona, sulfato de vincristina, micofenolato de mofetila, ciclosporina, azatioprina (e contraindicação estrita em gatos) e doxiciclina.'
    }
  ]
};
