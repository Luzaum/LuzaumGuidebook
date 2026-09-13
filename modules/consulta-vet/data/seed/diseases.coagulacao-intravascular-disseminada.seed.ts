import type { DiseaseRecord } from '../../types/disease';
import type { EditorialClinicalFigure } from '../../types/common';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Coagulação Intravascular Disseminada (CID/DIC) em cães e gatos — síntese editorial Vetius.
 * Padrão de redação alinhado a Cardiomiopatia Dilatada (CMD) e Miastenia Gravis:
 * mecanismos fisiopatológicos dos achados, citações inline com resumo dos estudos primários (Autor et al., ano),
 * posologias detalhadas baseadas no Plumb's 10ª ed., Nelson & Couto 6ª ed., Ettinger 9ª ed. (2024),
 * Lumb & Jones 6ª ed. (2024), Textbook of Small Animal Emergency Medicine e consensos ACVECC/CURATIVE.
 */

const figura1FisiopatologiaGeral: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig1-fisiopatologia-geral-yang-2025.webp',
  alt: 'Mecanismos patológicos centrais da Coagulação Intravascular Disseminada (CID)',
  caption:
    'Figura 1 — Mecanismos fisiopatológicos centrais da CID. Ativação endotelial sistêmica, liberação de fator tecidual (TF), perda dos freios anticoagulantes naturais (antitrombina, proteína C e TFPI) e deposição de microtrombos de fibrina e agregados plaquetários na microcirculação. Fonte: Yang et al. (2025), Journal of Intensive Medicine (CC BY 4.0).',
  display: 'wide',
};

const figura2ImunotromboseSepse: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig2-imunotrombose-sepse-unar-2023.jpg',
  alt: 'Eixo imunotrombose-sepse: interação entre neutrófilos, NETs, plaquetas e geração de trombina',
  caption:
    'Figura 2 — Eixo imunotrombose-sepse. PAMPs e DAMPs ativam monócitos e neutrófilos, induzindo a formação de armadilhas extracelulares de neutrófilos (NETs), ativação plaquetária e superexpressão de fator tecidual, culminando em geração descontrolada de trombina e microtrombose inflamatória. Fonte: Unar et al. (2023), Cells (CC BY 4.0).',
  display: 'default',
};

const figura3MicrotrombosPulmonares: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig3-microtrombos-pulmonares-goddard-2026.webp',
  alt: 'Histopatologia pulmonar revelando microtrombos de fibrina e alveolite hemorrágica em cão com sepse/CID',
  caption:
    'Figura 3 — Histopatologia de pulmão canino ("DIC lung"). Microfotografia evidenciando capilares septais alveolares ocluídos por microtrombos densos de fibrina, congestão vascular severa e extravasamento hemorrágico intra-alveolar em cão acometido por infecção virulenta por Babesia rossi. Fonte: Goddard et al. (2026), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'default',
};

const figura4MicrocirculacaoChoque: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig4-microcirculacao-choque-cooper-2021.webp',
  alt: 'Microcirculação sublingual por imagem em campo escuro incidente (IDF) em cão saudável versus choque séptico',
  caption:
    'Figura 4 — Avaliação da microcirculação por imagem em campo escuro incidente (IDF) em cão. Comparação entre a microcirculação sublingual sadia com fluxo capilar contínuo e a perda catastrófica de densidade vascular perfundida e heterogeneidade de fluxo microvascular observadas no choque séptico e choque hemorrágico com CID. Fonte: Cooper & Silverstein (2021), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'wide',
};

const figura5PetequiasEquimoses: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig5-petequias-equimoses-dosenberry-2025.webp',
  alt: 'Manifestações hemorrágicas cutâneas com petéquias e equimoses disseminadas na pele abdominal de cão',
  caption:
    'Figura 5 — Manifestações hemorrágicas cutâneas multifocais. Presença de petéquias puntiformes e sufusões equimóticas coalescentes na pele abdominal de cão. Nota didática: caso original de coagulopatia grave com sangramento espontâneo ilustrando com fidelidade o padrão clínico de falha da hemostasia primária e secundária observado na fase consumptiva (overt DIC). Fonte: Dosenberry et al. (2025), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'default',
};

const figura6PotencialHemostaticoSepse: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig7-potencial-hemostatico-sepse-sotos-2023.webp',
  alt: 'Traçados de ROTEM e potencial de lise demonstrando hipofibrinólise e estado pró-trombótico na sepse canina',
  caption:
    'Figura 6 — Hipofibrinólise e potencial pró-trombótico na sepse canina. Curvas de tromboelastometria rotacional (ROTEM) evidenciando resistência do coágulo à lise induzida por ativador tecidual do plasminogênio (tPA) em cães sépticos, demonstrando o estado de hipofibrinólise mediado por PAI-1 e TAFI característico da fase pró-trombótica da CID séptica. Fonte: Sotos et al. (2023), Frontiers in Veterinary Science (CC BY 4.0).',
  display: 'default',
};

export const coagulacaoIntravascularDisseminadaRecord: DiseaseRecord = {
  id: 'disease-coagulacao-intravascular-disseminada',
  slug: 'coagulacao-intravascular-disseminada-caes-gatos',
  title: 'Coagulação intravascular disseminada (CID/DIC)',
  subtitle: 'Ativação sistêmica da hemostasia, microtrombose multiorgânica e coagulopatia consumptiva paradoxal',
  synonyms: [
    'CID',
    'DIC',
    'Disseminated intravascular coagulation',
    'Coagulação intravascular disseminada em cães e gatos',
    'Coagulopatia consumptiva',
    'Imunotrombose desregulada',
    'Síndrome de desfibrinação',
  ],
  species: ['dog', 'cat'],
  category: 'intensivismo',
  categories: ['hematologia', 'oncologia', 'infectologia'],
  tags: [
    'CID',
    'DIC',
    'Hemostasia',
    'Microtrombose',
    'D-dímero',
    'Antitrombina',
    'TEG',
    'ROTEM',
    'Sepse',
    'Hemangiossarcoma',
    'Pancreatite',
    'Heparina',
    'Plasma fresco congelado',
    'CURATIVE',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['coagulacao-intravascular-disseminada-caes-gatos'],
  quickSummary:
    'A coagulação intravascular disseminada (CID/DIC) é uma síndrome adquirida grave e dinâmica caracterizada pela ativação sistêmica desregulada da hemostasia, lesão endotelial disseminada, exaustão dos freios anticoagulantes naturais (antitrombina, proteína C e TFPI) e fibrinólise alterada. A consequência biológica imediata é a formação maciça de microtrombos de fibrina e agregados plaquetários na microcirculação, provocando hipoperfusão tecidual heterogênea e falência de múltiplos órgãos (MODS); simultaneamente, o consumo acelerado de plaquetas, fibrinogênio e fatores pró-coagulantes predispõe a hemorragias paradoxais e descompensação fulminante. A CID nunca é uma doença primária, decorrendo obrigatoriamente de gatilhos sistêmicos graves como sepse/SIRS, neoplasias (especialmente hemangiossarcoma esplênico), pancreatite aguda necrosante, torção gástrica (GDV), insolação e intermação térmica, politrauma, hepatopatias fulminantes e doenças hemolíticas. Wiinberg et al. (2008), avaliando 50 cães por tromboelastografia (TEG), demonstraram que a CID não equivale simplesmente a hipocoagulação, coexistindo fenótipos hipercoaguláveis (comuns na sepse com PAI-1 elevado e fibrinólise suprimida) e hipocoaguláveis/hiperfibrinolíticos (comuns em neoplasias e trauma). Goggs, Mastrocco & Brooks (2018), em coorte de 804 cães, validaram que a progressão para CID manifesta (overt DIC, definida por ≥3 de 6 critérios hemostáticos alterados) eleva o risco relativo de mortalidade para 4,84 (62,5% vs 12,9%). O tratamento exige combate imediato à causa primária e restauração da microperfusão por fluidoterapia guiada por metas sem diluição excessiva; a heparinização é controversa e restrita a fenótipos trombóticos sem hemorragia ativa (CURATIVE, 2019; Plumb\'s, 10ª ed.), enquanto o plasma fresco congelado (FFP) e crioprecipitado são reservados para reposição fenotípica em sangramento ativo ou procedimentos invasivos de alto risco.',
  quickDecisionStrip: [
    'CID é sempre secundária: diagnosticar e eliminar o gatilho sistêmico subjacente é a única terapia verdadeiramente curativa.',
    'Fenótipo paradoxal: o paciente está primariamente trombosando a microcirculação e, devido ao consumo de substratos, pode sangrar.',
    'Ausência de sangramento NÃO descarta CID: na sepse com PAI-1 alto a fibrinólise é suprimida e predomina microtrombose com MODS.',
    'PT e aPTT normais não excluem fase precoce: o coagulograma comum avalia plasma estático e não detecta geração endotelial de trombina.',
    'Fibrinogênio é reagente de fase aguda: concentrações "normais" em pacientes sépticos ou inflamados mascaram consumo ativo massivo.',
    'D-dímero elevado comprova clivagem de fibrina estabilizada, mas não confirma CID isoladamente (baixa especificidade; VPP felino de apenas 33%).',
    'Gatos raramente apresentam CID hemorrágica clássica: suspeite em neoplasias (linfoma), hepatopatias/lipidose, PIF e sepse (Estrin et al., 2006).',
    'Transfusão fenotípica: FFP (10–15 mL/kg em cães; 6–10 mL/kg em gatos) repõe fatores e antitrombina; plasma não "joga lenha na fogueira".',
    'Heparina depende de antitrombina (AT): ineficaz se AT estiver exaurida; contraindicada na CID hemorrágica manifesta e nunca pré-incubada com plasma.',
  ],
  quickSummaryRich: {
    lead:
      'Na CID, o sistema hemostático perde sua compartimentalização anatômica: a geração de trombina, que deveria ocorrer restrita a um sítio de lesão vascular de 2 mm, passa a acontecer simultaneamente em milhares de microvasos corporais. Esse incêndio bioquímico consome rapidamente os freios anticoagulantes naturais (antitrombina e proteína C) e entope capilares com fibrina e plaquetas. O paciente sofre isquemia tecidual, acidose lática e falência de órgãos vitais (rim, pulmão, coração, fígado e cérebro) muito antes de sangrar. Tratar com maestria exige enxergar a CID como um processo contínuo em movimento, distinguindo o fenótipo trombótico hipofibrinolítico da fase hemorrágica consumptiva.',
    leadHighlights: ['perde compartimentalização anatômica', 'freios anticoagulantes naturais', 'isquemia tecidual', 'processo contínuo'],
    pillars: [
      {
        title: 'Condição estritamente secundária',
        body:
          'Não existe CID idiopática. Ela resulta invariavelmente de tempestades inflamatórias (sepse, SIRS, pancreatite), expressão tumoral de fator tecidual (hemangiossarcoma), isquemia/reperfusão (GDV) ou dano endotelial térmico na intermação (insolação grave). A remoção ou controle do estímulo gerador de trombina é o pilar terapêutico número um.',
        highlights: ['secundária', 'sepse', 'hemangiossarcoma', 'controle do estímulo'],
      },
      {
        title: 'Bifurcação fenotípica fibrinolítica',
        body:
          'Na sepse, citocinas induzem PAI-1 e TAFI, suprimindo a fibrinólise e gerando falência multiorgânica trombótica com pouco sangramento. Em neoplasias metastáticas e politrauma, pode ocorrer hiperfibrinólise primária/secundária com lise explosiva do coágulo e hemorragia incoercível (Wiinberg et al., 2008; Granger et al., 2024).',
        highlights: ['PAI-1', 'hiperfibrinólise', 'Wiinberg et al., 2008'],
      },
      {
        title: 'Painel de 6 marcadores seriados',
        body:
          'Nenhum teste isolado fecha o diagnóstico. A combinação dinâmica de contagem de plaquetas, PT, aPTT, fibrinogênio, D-dímero e antitrombina revela a trajetória consumptiva. Goggs et al. (2018), em 804 cães, validaram que ≥3 alterações hemostáticas definem overt DIC e multiplicam a mortalidade em 4,84 vezes.',
        highlights: ['Goggs et al., 2018', 'overt DIC', 'trajetória dinâmica'],
      },
      {
        title: 'Conduta fenotípica sem dogmas',
        body:
          'Ressuscitação volêmica por metas preserva a microcirculação sem afogar o paciente em cristaloide (evitando a tríade letal de hemodiluição, acidose e hipotermia). Plasma fresco congelado e crioprecipitado são indicados por sangramento e risco de procedimentos; heparina é reservada à fase pró-trombótica sem sangramento.',
        highlights: ['ressuscitação por metas', 'plasma fresco congelado', 'tríade letal'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo diagnóstico sistemático da CID',
      steps: [
        {
          label: 'Identificar gatilho primário e risco imediato',
          timing: 'Admissão / Triagem na emergência',
          detail:
            'Investigar ativamente sepse (peritonite, pneumonia, piometra), massas esplênicas/hepáticas (suspeita de hemangiossarcoma), pancreatite aguda, GDV, insolação, politrauma ou hemólise imunomediada. Avaliar perfusão periférica, tempo de preenchimento capilar, lactato sérico e estabilidade ventilatória (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed. 2024).',
        },
        {
          label: 'Hemograma completo com esfregaço sanguíneo manual',
          timing: 'Imediato (primeira hora)',
          detail:
            'Contagem automatizada e confirmação microscópica obrigatória de plaquetas (em gatos, descartar pseudotrombocitopenia por agregados plaquetários na cauda ou borda terminal do esfregaço). Pesquisar esquizócitos (hemácias fragmentadas por cisalhamento mecânico nas redes intravasculares de fibrina; Nelson & Couto, 6ª ed.). Avaliar toxicidade neutrofílica e desvio à esquerda regenerativo/degenerativo.',
          limitations: 'Esquizócitos reforçam microangiopatia, mas não são patognomônicos (ocorrem também em hemangiossarcoma puro e glomerulopatias).',
        },
        {
          label: 'Coagulograma e marcadores de degradação da fibrina',
          timing: 'Painel inicial e seriado',
          detail:
            'Determinar PT e aPTT (prolongados quando o consumo de fatores excede a síntese hepática; tempos normais não descartam fase precoce). Dosar fibrinogênio plasmático (reagente de fase aguda: valores normais em paciente séptico indicam consumo concomitante acelerado; hipofibrinogenemia ocorre em apenas 14% dos cães e 5% dos gatos; Nelson & Couto, 6ª ed.). Dosar D-dímero sérico quantitativo.',
          reassess: 'Repetir o painel a cada 6–12 horas em pacientes críticos instáveis para detectar trajetória de consumo rápido.',
        },
        {
          label: 'Avaliação de inibidores e hemostasia viscoelástica global',
          timing: 'Quando disponível na UTI especializada',
          detail:
            'Mensurar antitrombina sérica (AT <60–70% reflete consumo massivo ou perda; confere resistência funcional à heparina). TEG ou ROTEM para capturar interação plaqueta-fibrina em sangue total: tempo R/CT longo reflete deficiência de fatores, ângulo alfa/K velocidade de formação, MA/MCF força do coágulo e LY30/60 hiperfibrinólise (Wiinberg et al., 2008).',
        },
        {
          label: 'Estratificação por escore veterinário validado',
          timing: 'Classificação de gravidade',
          detail:
            'Aplicar o critério de overt DIC de Goggs, Mastrocco & Brooks (2018): presença de doença predisponente documentada combinada a ≥3 de 6 parâmetros alterados (plaquetas reduzidas, PT prolongado, aPTT prolongado, fibrinogênio diminuído, D-dímero elevado, antitrombina reduzida). Overt DIC confere mortalidade hospitalar de 62,5% vs 12,9% (RR 4,84).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano terapêutico fenotípico intensivo',
      steps: [
        {
          label: 'Controle agressivo da causa primária',
          timing: 'Emergência absoluta (minutos a horas)',
          detail:
            'Descompressão e cirurgia emergencial no GDV; antibioticoterapia intravenosa precoce e controle cirúrgico do foco infeccioso com drenagem na sepse; esplenectomia e hemostasia no hemoabdome por hemangiossarcoma; resfriamento corporal controlado na intermação e insolação térmica; analgesia e suporte intensivo na pancreatite (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed. 2024).',
        },
        {
          label: 'Ressuscitação microvascular guiada por metas',
          timing: 'Primeiras horas de internação',
          detail:
            'Restaurar pressão de perfusão e débito com cristaloides balanceados titulados por metas clínicas (pressão arterial média ≥65 mmHg, lactato em queda, débito urinário ≥1–2 mL/kg/h). Evitar expansão excessiva que induza coagulopatia dilucional, hipotermia e acidose (a tríade letal da UTI; BSAVA ECC, 3ª ed.). Adicionar norepinefrina ou vasopressores precocemente se choque refratário a volume.',
        },
        {
          label: 'Suporte transfusional fenotípico',
          timing: 'Conforme clínica e defeito hemostático',
          detail:
            'Plasma fresco congelado (FFP) em pacientes com sangramento ativo clinicamente evidente ou que necessitam de intervenção cirúrgica de urgência. Concentrado de hemácias (pRBC) se anemia comprometer entrega de oxigênio. Sangue total fresco se coincidirem hemorragia profusa, anemia e plaquetopenia grave. Crioprecipitado em hipofibrinogenemia profunda (<100 mg/dL) com restrição de volume (Plumb\'s, 10ª ed.; Fluid Therapy, 2ª ed. 2023).',
          dose: 'FFP: cães 10–15 mL/kg IV; gatos 6–10 mL/kg IV. Crioprecipitado: 1 unidade/10 kg IV.',
          reassess: 'Não transfundir FFP profilaticamente apenas para "corrigir tempos no papel" em animal sem sangramento.',
        },
        {
          label: 'Anticoagulação individualizada (apenas fase trombótica)',
          timing: 'Paciente sem sangramento e com fenótipo pró-trombótico',
          detail:
            'Heparina não fracionada (UFH) ou de baixo peso molecular (LMWH, dalteparina ou enoxaparina). Indicada apenas quando a fase inicial pró-trombótica, tromboembolismo documentado ou TEG marcadamente hipercoagulável predominam e NÃO há hemorragia ativa. Heparina requer antitrombina para atuar (Ettinger, 2024; ACVECC CURATIVE, 2019). NUNCA pré-incubar heparina com plasma na bolsa de transfusão (Lumb & Jones, 2024).',
          dose: 'UFH: 75–100 UI/kg SC q8h (Plumb\'s) ou bolus IV 100 UI/kg seguido de CRI 20–50 UI/kg/h titulado por aPTT/anti-Xa. Enoxaparina: cão 0,8–1 mg/kg SC q6–8h; gato 0,75–1 mg/kg SC q6–12h. Dalteparina: cão 150–175 UI/kg SC q8h; gato 75–150 UI/kg SC q6h.',
          reassess: 'Monitorar por atividade anti-Xa (alvo de pico: 0,5–1,0 UI/mL coletado 3 h pós-dose em cães e 2 h em gatos) ou aPTT. Suspender imediatamente se surgir sangramento ativo.',
        },
        {
          label: 'Suporte a disfunções orgânicas secundárias',
          timing: 'Contínuo na UTI',
          detail:
            'Suporte ventilatório e oxigenioterapia para o pulmão da CID ("DIC lung" — alveolite hemorrágica com microtrombose septal alveolar); monitoramento eletrocardiográfico contínuo para arritmias ventriculares (VPCs multifocais por hipóxia/isquemia miocárdica); monitoramento estrito de débito urinário e eletrólitos para lesão renal aguda (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
  },
  etiology: {
    definicaoEConceitoModerno:
      'A coagulação intravascular disseminada (CID/DIC) é uma síndrome adquirida e potencialmente fatal de desregulação hemostática global. Diferente dos distúrbios hemostáticos isolados, a CID combina simultaneamente formação descontrolada de microtrombos intravasculares e consumo progressivo de plaquetas, fibrinogênio e fatores pró-coagulantes, resultando no paradoxo clínico de isquemia tecidual difusa acompanhada por sangramento espontâneo.\n\nA atualização humana do comitê científico da ISTH (2025) formalizou a CID como uma condição biológica contínua caracterizada por ativação sistêmica da coagulação, lesão do endotélio vascular e fibrinólise desregulada, progredindo de uma fase precoce (pre-DIC/compensada), muitas vezes clinicamente silenciosa, para disfunção orgânica de múltiplos órgãos e/ou coagulopatia consumptiva hemorrágica (overt DIC). Embora os pontos de corte humanos da ISTH 2025 não devam ser transpostos mecanicamente para cães e gatos sem validação, o conceito contemporâneo traduz com precisão a fisiopatologia observada em medicina veterinária (Nelson & Couto, 6ª ed., Cap. 87; Ettinger, 9ª ed. 2024, Cap. 171).',
    figuraFisiopatologiaGeral: figura1FisiopatologiaGeral,
    mecanismosIniciais:
      'A hemostasia fisiológica opera segundo o modelo celular em três etapas coordenadas: iniciação na célula expressora de fator tecidual (TF), amplificação na superfície das plaquetas ativadas e propagação com a explosão de trombina (thrombin burst) na membrana plaquetária (Lumb & Jones, 2024, Cap. 31). Na CID, três mecanismos patológicos primários rompem essa compartimentalização e deflagram a síndrome (BSAVA ECC, 3ª ed., Cap. 13; Textbook of Small Animal Emergency Medicine, Cap. 70):\n\n- Liberação maciça ou exposição intravascular de fator tecidual (TF/fator III): ocorre em necroses extensas, trauma grave, inflamação sistêmica, hemólise intravascular maciça e neoplasias invasivas.\n- Lesão endotelial disseminada: observada no choque circulatório descompensado, intermação e insolação grave (choque térmico), septicemia bacteriana, queimaduras térmicas e vasculites imunes, na qual o endotélio perde suas propriedades anticoagulantes constitutivas (trombomodulina, sulfato de heparano) e passa a expressar TF, liberar fator de von Willebrand e recrutar plaquetas.\n- Ativação enzimática direta da cascata por proteases circulantes: sendo o modelo clássico a liberação sistêmica de tripsina na pancreatite aguda necrosante grave.',
    imunotromboseSepse:
      'A sepse e a síndrome da resposta inflamatória sistêmica (SIRS) representam os cenários fisiopatológicos mais comuns e graves de CID. Nessa interface — hoje denominada imunotrombose desregulada —, padrões moleculares associados a patógenos (PAMPs, como lipopolissacarídeo bacteriano [LPS], peptideoglicanos e DNA microbiano) e padrões moleculares associados ao dano tecidual (DAMPs, como histonas nucleares, DNA livre celular e HMGB1) ligam-se a receptores de reconhecimento de padrões (TLRs e receptores NOD) em monócitos, neutrófilos e células endoteliais.\n\nEssa sinalização deflagra uma liberação torrencial de citocinas pró-inflamatórias (TNF-alfa, IL-1, IL-6), que forçam a superexpressão de fator tecidual na superfície de monócitos circulantes e células vasculares. A ligação TF–FVIIa deflagra a geração contínua de fator Xa e trombina. Paralelamente, trombina e FXa sinalizam em receptores ativados por protease (PAR-1, PAR-2 e PAR-4) expressos em leucócitos e endotélio, amplificando ainda mais a produção de citocinas inflamatórias em um círculo vicioso positivo incontrolável.\n\nAs plaquetas ativadas expressam P-selectina em suas membranas, a qual se acopla ao ligante PSGL-1 de neutrófilos e monócitos, recrutando essas células inflamatórias para os microtrombos e promovendo a ejeção de armadilhas extracelulares de neutrófilos (NETs), que servem de plataforma adicional para ancoramento de mais fibrina e ativação do fator XII (Textbook of Small Animal Emergency Medicine, Cap. 70 e 159).',
    figuraImunotromboseSepse: figura2ImunotromboseSepse,
    oncologiaHemangiossarcoma:
      'No paciente oncológico, todos os elementos da tríade de Virchow clássica estão alterados: estase venosa por compressão tumoral mecânica, lesão endotelial por invasão neoplásica e neovascularização desorganizada, e hipercoagulabilidade humoral induzida pelo próprio tumor. As células neoplásicas e seus macrófagos associados expressam constitutivamente altos níveis de fator tecidual e liberam micropartículas tumorais ricas em TF e fosfatidilserina na circulação sistêmica.\n\nParticularidades e casuística oncológica:\n\n- Prevalência em tumores sólidos (Withrow & MacEwen, 6ª ed., Cap. 5 e 34): aproximadamente 10% de todos os cães com neoplasias sólidas desenvolvem alterações de CID, incidência que alcança cerca de 50% nos cães portadores de hemangiossarcoma (HSA) visceral (esplênico, hepático ou cardíaco), além de frequências muito elevadas em carcinomas mamários inflamatórios e adenocarcinomas pulmonares.\n- Hemangiossarcoma (HSA) visceral: a vascularização tumoral rudimentar, repleta de canais vasculares sinusoidais tortuosos e revestidos por células endoteliais malignas anormais, propicia contato contínuo do fluxo sanguíneo com estroma subendotelial trombogênico, áreas extensas de necrose central e trombose intratumoral contínua. Em coortes oncológicas de HSA, trombocitopenia é identificada em 75% a 97% dos casos e coagulopatias compatíveis com CID em até metade dos cães admitidos com hemoabdome espontâneo.\n- Forma crônica compensada (CID silenciosa): altamente prevalente na rotina oncológica, caracterizada por consumo lento e produção compensatória de fatores pelo fígado, até que uma ruptura tumoral, choque hipovolêmico ou cirurgia precipite a descompensação fulminante.',
    pancreatiteEGDV:
      'Aspectos fisiopatológicos de duas das principais emergências gastroabdominais:\n\n- Pancreatite aguda canina grave: a ativação intraglandular prematura do tripsinogênio em tripsina desencadeia autodigestão acinar, necrose peripancreática e liberação de proteases ativas na circulação portal e sistêmica. A tripsina atua clivando enzimaticamente o fator X e a protrombina em trombina de forma independente de TF, além de degradar inibidores naturais como a antitrombina e ativar as vias das cininas e do complemento. Cães com pancreatite sistêmica necrosante frequentemente desenvolvem CID oculta (subclínica) muito antes de manifestarem sinais hemorrágicos francos, sofrendo microtrombose mesentérica, renal e pulmonar que agrava a morbidade (Canine Hepatobiliary and Exocrine Pancreatic Diseases, 2024; Textbook of Small Animal Emergency Medicine, Cap. 86).\n- Dilatação-vólvulo gástrica (GDV): a rotação gástrica obstrui o retorno venoso pela veia cava caudal e veia porta, gerando estase esplâncnica massiva, hipoperfusão sistêmica e isquemia da mucosa gástrica. A perda da barreira epitelial do estômago permite a translocação de endotoxinas bacterianas luminais (LPS) para a circulação; no momento da descompressão gástrica e reposicionamento cirúrgico, a lesão de isquemia e reperfusão libera massas de espécies reativas de oxigênio (ROS), citocinas inflamatórias e TF tecidual, culminando em SIRS fulminante, endoteliopatia e consumo hemostático difuso (BSAVA Gastroenterology, 3ª ed.; Nelson & Couto, 6ª ed.).',
    particularidadesFelinas:
      'A coagulação intravascular disseminada na espécie felina possui comportamento epidemiológico, clínico e laboratorial fundamentalmente distinto do observado em cães. A CID aguda fulminante e fortemente hemorrágica é um evento raro em gatos; ao contrário, a maioria dos felinos afetados apresenta formas silenciosas, oligossintomáticas ou dominadas por sinais tromboembólicos e falência orgânica associada à patologia primária.\n\nPrincipais gatilhos e casuística na espécie felina:\n\n- Doença hepatobiliar felina (33% dos casos): principal causa de CID em gatos na casuística compilada por Nelson & Couto (6ª ed., Cap. 87), destacando-se lipidose hepática e colangio-hepatite.\n- Neoplasias malignas (29% dos casos): notadamente linfoma mediastinal e visceral, além de carcinomas metastáticos.\n- Doenças infecciosas graves (19% dos casos): incluindo peritonite infecciosa felina (PIF), citauxzoonose (Cytauxzoon felis), toxoplasmose sistêmica, panleucopenia felina e pielonefrites bacterianas graves.\n- Baixa frequência de hemorragia clínica (Estrin et al., 2006): em 46 gatos acometidos por CID, apenas 15% dos animais apresentavam sangramento espontâneo clinicamente observável à admissão hospitalar, e o linfoma, neoplasias metastáticas, pancreatite aguda e sepse sistêmica predominaram como afecções causais.',
  },
  epidemiology: {
    caes:
      'Em cães, a CID ocorre sem predisposição direta por raça ou sexo, acometendo animais de qualquer porte dependendo da afecção de base. No entanto, raças grandes e gigantes com predisposição anatômica ou neoplásica representam parcela substancial dos pacientes internados em UTI: Pastores Alemães, Golden Retrievers e Labradores apresentam alta incidência de hemangiossarcoma esplênico/cardíaco; Dogue Alemão, Boxer e São Bernardo apresentam risco elevado de GDV; fêmeas caninas idosas não castradas desenvolvem piometra séptica com SIRS e choque distributivo.\n\nDistribuição causal e particularidades regionais:\n\n- Casuística causal em cães (Couto, 1999; Nelson & Couto, 6ª ed.): neoplasias (18%), hepatopatias graves (14%), anemias hemolíticas imunomediadas — IMHA (10%), infecções sistêmicas bacterianas (10%), GDV (6%) e pancreatite aguda (4%).\n- Babesiose canina grave (Babesia rossi ou Babesia vogeli): provoca endotoxemia parasitária, hemólise maciça e coagulopatia de consumo proporcional à mortalidade (Goddard et al., 2013).\n- Leishmaniose visceral (Leishmania chagasi): frequente no Brasil, pode induzir vasculite imunomediada, imunocomplexos circulantes e CID terminal (Honse et al., 2013).\n- Tratamento adulticida da dirofilariose com melarsomina: pode culminar em embolização arterial pulmonar maciça por fragmentos de vermes mortos, intensa resposta inflamatória local e descompensação para CID sistêmica (Philp, Farrell & Li, 2023).',
    gatos:
      'Em gatos, a CID acomete tipicamente felinos adultos a idosos com doenças sistêmicas crônicas descompensadas (linfoma, carcinomas, lipidose hepática, pancreatite aguda felina e PIF forma efusiva ou não efusiva), ou jovens não vacinados com bacteremia secundária à quebra de barreira na panleucopenia.\n\nA real prevalência em gatos é substancialmente subestimada em rotinas ambulatoriais porque a manifestação hemorrágica externa costuma ser mínima ou inexistente, e a coleta de plasma citratado de alta qualidade em felinos críticos hipotensos é tecnicamente desafiadora (Estrin et al., 2006; August\'s Consultations in Feline Internal Medicine, vol. 7, Cap. 77).',
    prognosticoEEstratificacao:
      'O prognóstico de pacientes com CID depende estritamente da reversibilidade da doença causal de base, da velocidade de instituição da terapia de suporte e do estágio de descompensação hemostática no momento do reconhecimento clínico.\n\nEvidências de estratificação e mortalidade:\n\n- Coorte multicêntrica de 804 cães (Goggs, Mastrocco & Brooks, 2018): a mortalidade global em cães sem overt DIC foi de 12,9%, ao passo que nos pacientes que preencheram critérios para overt DIC a taxa de mortalidade atingiu impressionantes 62,5% (risco relativo de morte de 4,84).\n- Marcadores de óbito iminente em cães (Nelson & Couto, 6ª ed.; Wiinberg et al., 2008): presença de plaquetopenia profunda (<50.000/µL), prolongamento severo do aPTT (>90% acima do controle hospitalar) e hipocoagulabilidade viscoelástica no TEG.\n- Prognóstico na espécie felina (Estrin et al., 2006): prognóstico historicamente documentado ainda mais grave, onde 43 de 46 gatos (93%) faleceram ou foram eutanasiados devido à gravidade intratável da doença primária e disfunções de múltiplos órgãos (apenas 7% de sobrevida hospitalar), observando-se que o valor mediano do PT encontrava-se significativamente mais prolongado nos felinos não sobreviventes.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Liberação ou exposição patológica de fator tecidual (TF) subendotelial ou celular decorrente de lise tecidual, citocinas inflamatórias ou necrose tumoral.',
      'Complexação de TF com o fator VIIa circulante, ativando os fatores IX e X na fase de iniciação celular da hemostasia.',
      'O fator Xa forma quantidades mínimas de trombina inicial (IIa), suficientes para ativar plaquetas, cofatores V e VIII e fator XI na fase de amplificação.',
      'Na superfície aniônica das plaquetas ativadas, o complexo tenase (FIXa-FVIIIa-Ca²⁺) e protrombinase (FXa-FVa-Ca²⁺) provocam a explosão de trombina (thrombin burst).',
      'A geração contínua e descontrolada de trombina atinge a circulação sistêmica e sobrepuja a capacidade de inativação dos freios naturais (antitrombina, proteína C e TFPI).',
      'A trombina converte o fibrinogênio solúvel em redes disseminadas de fibrina e ativa o fator XIII para estabilizá-las nos capilares e arteríolas pré-capilares.',
      'Plaquetas circulantes são sequestradas e aprisionadas nas redes de fibrina, gerando microtrombos obstrutivos e trombocitopenia consumptiva progressiva.',
      'O estreitamento da luz microvascular impõe estresse mecânico de cisalhamento às hemácias circulantes em alta velocidade, fragmentando-as em esquizócitos.',
      'A oclusão microvascular heterogênea provoca hipoperfusão parenquimatosa difusa, hipóxia celular, glicólise anaeróbia com acidose lática e falência de múltiplos órgãos (rim, pulmão, coração e cérebro).',
      'Dependendo do perfil inflamatório, a fibrinólise pode ser suprimida (altos níveis de PAI-1 na sepse, perpetuando a trombose) ou superativada (plasmina maciça degradando fibrina e fibrinogênio, gerando FDPs e D-dímero em excesso).',
      'Os FDPs inibem competitivamente a polimerização da nova fibrina e bloqueiam a agregação plaquetária; juntamente com o esgotamento total dos fatores I, II, V e VIII, instala-se a coagulopatia consumptiva fulminante com hemorragia difusa paradoxal.',
    ],
    transmissao:
      'A coagulação intravascular disseminada é uma condição puramente adquirida, secundária e não contagiosa em si mesma. Doenças infecciosas primárias que desencadeiam a síndrome (como sepse bacteriana, babesiose, leishmaniose ou PIF) possuem suas respectivas vias epidemiológicas de transmissão, porém a CID representa a resposta fisiopatológica final e desregulada do hospedeiro.',
  },
  pathophysiology: {
    falhaHomeostaseMicrovascular:
      'A fisiopatologia da CID sintetiza o fracasso da homeostase microvascular. Na circulação sadia, a geração de trombina permanece confinada ao local exato do trauma tecidual graças a três barreiras bioquímicas sistêmicas intactas:\n\n- Antitrombina (AT): glicoproteína plasmática sintetizada pelo fígado que neutraliza a trombina livre, fator Xa e outros fatores ativados.\n- Sistema da Proteína C e Proteína S: no qual o excesso de trombina se liga à trombomodulina do endotélio íntegro e converte a proteína C em proteína C ativada (APC), que degrada irreversivelmente os cofatores ativados Va e VIIIa.\n- Inibidor da via do fator tecidual (TFPI): que bloqueia a retroalimentação do complexo TF–FVIIa–FXa (Lumb & Jones, 2024; Ettinger, 2024).\n\nNa CID, a estimulação inflamatória maciça por citocinas (TNF-alfa, IL-1, IL-6) e endotoxinas estimula a expressão contínua de TF em monócitos e endotélio lesado. A produção massiva de trombina esgota o estoque de antitrombina por consumo direto e degradação enzimática por elastases neutrofílicas. Concomitantemente, o endotélio inflamado reduz a expressão de trombomodulina, desligando a ativação da proteína C. Sem freios, a fase de propagação celular com a explosão maciça de trombina ("thrombin burst") torna-se sistêmica, colapsando a densidade capilar funcional e a extração celular de oxigênio.',
    figuraMicrocirculacaoChoque: figura4MicrocirculacaoChoque,
    fenotipoMicrotrombotico:
      'O endotélio ativado e citocinas inflamatórias elevam dramaticamente o inibidor do ativador do plasminogênio tipo 1 (PAI-1) e o inibidor da fibrinólise ativado por trombina (TAFI). O PAI-1 inibe irreversivelmente o tPA e o uPA, impedindo a geração de plasmina; os depósitos intravasculares de fibrina tornam-se densos, insolúveis e permanentes, convertendo a doença em uma síndrome microtrombótica devastadora responsável por isquemia renal glomerular, necrose tubular aguda (LRA), necrose centrolobular hepática, infartos miocárdicos focais e a chamada síndrome do pulmão da CID ("DIC lung" — intensa microtrombose nos capilares septais alveolares associada a hemorragia intrapulmonar, aumento do espaço morto ventilatório, mismatch V/Q e hipoxemia refratária; Nelson & Couto, 6ª ed., p. 1403).',
    figuraMicrotrombosPulmonares: figura3MicrotrombosPulmonares,
    figuraPotencialHemostaticoSepse: figura6PotencialHemostaticoSepse,
    fenotipoHiperfibrinolitico:
      'Em determinados carcinomas metastáticos, leucemias ou politraumatismos, as células liberam grandes volumes de uPA/tPA, deflagrando geração desenfreada de plasmina que decompõe o fibrinogênio sérico (fibrinogenólise) e degrada precipitadamente qualquer coágulo antes que ele se consolide (Granger et al., 2024). Produtos de degradação da fibrina e fibrinogênio (FDPs) acumulam-se em altas concentrações; por competirem com sítios de ancoramento da trombina e do fibrinogênio e revestirem a membrana plaquetária, os FDPs funcionam como potentes anticoagulantes endógenos que paralisam a função plaquetária e a polimerização da rede hemostática. Quando os fatores lábeis (V e VIII), a protrombina e o fibrinogênio são consumidos em velocidade superior à síntese hepática e as plaquetas são depletadas abaixo do limiar crítico hemostático, o paciente entra na fase hipocoagulável consumptiva descompensada (overt DIC), caracterizada por sangramentos multifocais graves na pele, mucosas e cavidades corpóreas.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia extrema, fraqueza muscular generalizada, prostração e colapso circulatório',
          mechanism:
            'A oclusão da microcirculação sistêmica por microtrombos de fibrina e agregados plaquetários diminui criticamente o transporte efetivo de oxigênio aos tecidos (DO2). As células sofrem hipóxia profunda, entram em glicólise anaeróbia e produzem excesso de lactato, depletando o ATP intracelular.',
          clinicalMeaning: 'Manifestação frequente em animais sépticos ou em choque; a gravidade reflete a extensão da hipoperfusão microvascular sistêmica.',
          priority: 'common',
        },
        {
          finding: 'Hipotermia em gatos e cães graves, ou febre persistente na sepse',
          mechanism:
            'A falência vasomotora e a perda da perfusão periférica em estados de choque descompensado prejudicam a termorregulação central (particularmente em felinos, cuja tríade hipotermia-hipotensão-bradicardia sinaliza colapso). Em contrapartida, citocinas pirogênicas (IL-1, TNF-alfa) elevam o setpoint hipotalâmico nas fases iniciais da sepse.',
          clinicalMeaning: 'A hipotermia em gatos sépticos é sinal de gravidade extrema; em cães, febre inexplicada acompanhada de piora hemodinâmica exige busca de sepse oculta.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Taquipneia, respiração superficial, aumento do esforço expiratório/inspiratório e hipoxemia refratária',
          mechanism:
            'A microtrombose nos capilares septais alveolares e arteríolas pulmonares impede a perfusão de alvéolos que continuam sendo ventilados, aumentando drasticamente o espaço morto alveolar e gerando incompatibilidade ventilação-perfusão (V/Q mismatch). Simultaneamente, a lesão endotelial e o aumento da permeabilidade capilar promovem extravasamento de plasma e hemácias para o interstício e alvéolos, caracterizando a clássica síndrome do pulmão da CID ("DIC lung"; Nelson & Couto, 6ª ed.).',
          clinicalMeaning: 'Muitos cães e gatos com CID não falecem por sangramento externo, mas por disfunção pulmonar aguda refratária e hipoxemia hipóxica.',
          priority: 'emergency',
          context: ['Pulmão da CID (DIC lung)', 'Insuficiência respiratória'],
        },
        {
          finding: 'Tosse com escarro hemoptóico ou presença de fluido sanguinolento em cânula endotraqueal',
          mechanism:
            'A combinação de microtrombose septal, congestão capilar retrógrada e coagulopatia consumptiva favorece a rotura da barreira alvéolo-capilar, permitindo micro-hemorragia alveolar difusa e inundação das vias aéreas inferiores.',
          clinicalMeaning: 'Sinal de alarme gravíssimo de CID manifesta pulmonar; requer suporte ventilatório imediato e proteção de via aérea.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Hipotensão arterial sistêmica, pulso periférico filiforme, extremidades frias e tempo de preenchimento capilar (TPC) prolongado (>2–3 s) ou hiperêmico na sepse quente',
          mechanism:
            'A perda de tônus vascular mediada por óxido nítrico e citocinas inflamatórias, aliada à perda de fluido por extravasamento capilar difuso e microtrombos obstrutivos em leitos de resistência, reduz a pré-carga e a pós-carga efetivas, colapsando a pressão arterial média.',
          clinicalMeaning: 'Indica choque distributivo e/ou hipovolêmico; exige ressuscitação volêmica imediata titulada e monitoramento contínuo da pressão arterial.',
          priority: 'emergency',
        },
        {
          finding: 'Arritmias ventriculares, incluindo complexos ventriculares prematuros (VPCs) multifocais e taquicardia ventricular paroxística',
          mechanism:
            'A microtrombose nas arteríolas coronárias intramiocárdicas induz isquemia miocárdica focal, acidose tecidual localizada e heterogeneidade na condução elétrica das fibras de Purkinje e miócitos, gerando focos ectópicos automáticos e reentrada elétrica (Nelson & Couto, 6ª ed., p. 1402).',
          clinicalMeaning: 'Marcador clássico de envolvimento miocárdico e falência multiorgânica em CID grave; monitoramento com ECG contínuo é mandatória.',
          priority: 'emergency',
          context: ['Isquemia miocárdica'],
        },
      ],
    },
    {
      system: 'dermatological',
      findings: [
        {
          finding: 'Petéquias e equimoses cutâneas e mucosas, sufusões e hematomas subcutâneos',
          mechanism:
            'Petéquias puntiformes decorrem da falha primária hemostática (trombocitopenia consumptiva acentuada e disfunção plaquetária bloqueada por FDPs); equimoses e sufusões maiores refletem o consumo concomitante de fatores de coagulação plasmáticos da hemostasia secundária e fragilidade vascular induzida por dano endotelial.',
          clinicalMeaning: 'Padrão hemostático misto (primário + secundário) altamente sugestivo de CID overt descompensada.',
          priority: 'common',
        },
        {
          finding: 'Sangramento contínuo em locais de venopunção, inserção de cateteres intravenosos ou incisões cirúrgicas recentes',
          mechanism:
            'A fibrina recém-formada nesses sítios é degradada aceleradamente pela plasmina ou não chega a ser polimerizada adequadamente por deficiência de fibrinogênio e excesso de FDPs circulantes, impedindo a estabilização do tampão hemostático.',
          clinicalMeaning: 'Pérola de beira de leito na UTI: cateter que "verte sangue" ao redor da fita de fixação sinaliza consumo de fatores e necessidade de coagulograma urgente.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'renal',
      findings: [
        {
          finding: 'Oligúria (<1 mL/kg/h), anúria e elevação rápida de ureia, creatinina e fósforo sérico (injúria renal aguda — LRA)',
          mechanism:
            'Os capilares dos glomérulos e a vasculatura peritubular são leitos de filtração de baixa resistência e alto fluxo, tornando-se alvos primordiais para deposição de redes de fibrina e microtrombos plaquetários. A oclusão glomerular abrupta corta a taxa de filtração glomerular (TFG), enquanto a isquemia das células tubulares deflagra necrose tubular aguda (Ettinger, 9ª ed. 2024).',
          clinicalMeaning: 'A disfunção renal é uma das causas mais comuns de óbito na CID; monitorar débito urinário rigoroso com sonda de demora fechada.',
          priority: 'emergency',
          context: ['Microtrombose renal'],
        },
      ],
    },
    {
      system: 'hepatic',
      findings: [
        {
          finding: 'Icterícia em mucosas e esclera, hiperbilirrubinemia e elevações agudas de ALT e AST',
          mechanism:
            'Tríplice mecanismo patológico: (1) Isquemia hepatocelular por microtrombos nos sinusóides hepáticos levando à necrose centrolobular; (2) Colestase intra-hepática associada à sepse (mediada pela ação inibitória de endotoxinas e citocinas sobre os transportadores canaliculares de ácidos biliares e bilirrubina, como o Bsep e Mrp2); e (3) Sobrecarga de bilirrubina não conjugada decorrente de hemólise microangiopática acelerada.',
          clinicalMeaning: 'Em cães, elevações abruptas de transaminases em paciente séptico sinalizam isquemia sinusoidal; em gatos, a hepatopatia de base (lipidose/colangite) pode ter sido o gatilho da CID.',
          priority: 'systemic',
        },
      ],
    },
    {
      system: 'neurological',
      findings: [
        {
          finding: 'Depressão do nível de consciência, estupor, ataxia, desorientação, déficits de pares cranianos ou crises epilépticas',
          mechanism:
            'Isquemia focal cerebral secundária a microtrombos em artérias perfurantes encefálicas e microcapilares corticais, ou, alternativamente, micro-hemorragias petequiais no parênquima nervoso decorrentes de consumo hemostático avançado.',
          clinicalMeaning: 'Sinal de prognóstico reservado; indica comprometimento do sistema nervoso central pela falência multiorgânica.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'hematologic',
      findings: [
        {
          finding: 'Palidez de mucosas por anemia hemolítica microangiopática com presença de esquizócitos no esfregaço sanguíneo',
          mechanism:
            'A rede intravascular disseminada de filamentos de fibrina estendida na microcirculação atua como uma lâmina mecânica: eritrócitos impulsionados em alta velocidade colidem e sofrem cisalhamento mecânico, fragmentando-se em esquizócitos (células em capacete ou triangulares) e sofrendo hemólise intravascular associada ao consumo simultâneo de plaquetas (Nelson & Couto, 6ª ed., pp. 1401–1402).',
          clinicalMeaning: 'A demonstração inequívoca de esquizócitos no esfregaço de paciente crítico com trombocitopenia reforça fortemente a presença de microangiopatia trombótica e consumo hemostático ativo.',
          priority: 'common',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Identificação da condição primária desencadeante e triagem clínica de risco',
      purpose: 'Determinar a etiologia subjacente que está permanentemente alimentando a produção sistêmica de trombina.',
      description:
        'A CID nunca é uma patologia primária isolada. A suspeita clínica nasce obrigatoriamente do reconhecimento de patologias de alto risco: sepse/peritonite/piometra, pancreatite aguda necrosante, torção gástrica (GDV), massas esplênicas/hepáticas (suspeita de hemangiossarcoma), insolação e intermação térmica, politrauma, acidentes ofídicos ou hemólise imunomediada. Avaliar padrão respiratório, estabilidade circulatória e sinais de sangramento espontâneo oculto ou manifesto (Nelson & Couto, 6ª ed.; Textbook of Small Animal Emergency Medicine, Cap. 70).',
      interpretation:
        'Sem a presença comprovada de um gatilho inflamatório, infeccioso, neoplásico ou isquêmico sistêmico, o diagnóstico de CID deve ser questionado em favor de coagulopatias primárias (como intoxicação por rodenticidas, PTI primária ou deficiências hereditárias).',
      limitations:
        'A ausência de sinais clássicos de hemorragia externa não afasta CID: na sepse sistêmica, a maioria dos cães e gatos morre por microtrombose e falência de órgãos sem manifestar sangramentos macroscópicos visíveis.',
    },
    {
      stepNumber: 2,
      title: 'Hemograma completo com avaliação minuciosa do esfregaço sanguíneo em lâmina',
      purpose: 'Quantificar plaquetas, pesquisar esquizócitos da microangiopatia e descartar artefatos laboratoriais.',
      description:
        'Realizar contagem automatizada de plaquetas sempre confirmada por contagem manual no esfregaço corado (multiplicando-se a média de plaquetas em 10 campos de imersão de 100x por 15.000–20.000). Em felinos, examinar meticulosamente a cauda (borda terminal do esfregaço) e as margens da lâmina à procura de agregados plaquetários macro e microscópicos, descartando pseudotrombocitopenia felina induzida por agregação in vitro. Pesquisar sistematicamente esquizócitos (hemácias fragmentadas em capacete, triângulo ou vírgula, geradas pelo cisalhamento mecânico da membrana eritrocitária ao colidir em alta velocidade contra filamentos intravasculares de fibrina; Nelson & Couto, 6ª ed., pp. 1401–1402). Avaliar leucograma em busca de desvio à esquerda e granulações tóxicas da sepse.',
      interpretation:
        'A trombocitopenia ocorre em cerca de 90% dos cães e 57% dos gatos com CID overt (Nelson & Couto, 6ª ed.). A presença simultânea de trombocitopenia progressiva e esquizócitos em paciente com patologia predisponente eleva dramaticamente o índice de suspeita de anemia hemolítica microangiopática associada à CID.',
      limitations:
        'Esquizócitos não são patognomônicos exclusivos de CID: podem ocorrer em hemangiossarcomas mesmo na ausência de coagulopatia consumptiva sistêmica, em glomerulonefrites graves, endocardites e cardiopatias com alta turbulência mecânica.',
    },
    {
      stepNumber: 3,
      title: 'Tempos de coagulação plasmática: Tempo de Protrombina (PT) e Tempo de Tromboplastina Parcial Ativada (aPTT)',
      purpose: 'Avaliar a integridade funcional das vias extrínseca, intrínseca e comum da coagulação.',
      description:
        'O PT mensura a integridade das vias extrínseca e comum (fatores VII, X, V, protrombina e fibrinogênio); o aPTT mensura as vias de contato/intrínseca e comum (fatores XII, XI, IX, VIII, X, V, protrombina e fibrinogênio). Na CID progressiva, a ativação contínua e consumo desses zimogênios plasmáticos esgota suas concentrações funcionais, prolongando os tempos de formação do coágulo in vitro. O sangue citratado deve ser colhido por punção venosa limpa e única, respeitando a proporção estrita de 9 partes de sangue para 1 parte de citrato trissódico a 3,2% (Ettinger, 9ª ed. 2024, Cap. 170).',
      interpretation:
        'Prolongamento de PT (>25–30% sobre o controle) e aPTT (>25–50% sobre o controle) reflete consumo avançado de fatores. Na série de Couto, o aPTT prolongou-se em 88% dos cães e 100% dos gatos com CID, enquanto o PT esteve alterado em 42% dos cães e 71% dos gatos. Na coorte felina de Estrin et al. (2006), o PT mediano foi significativamente mais prolongado nos gatos que não sobreviveram.',
      limitations:
        'ARMADILHA CLÍNICA CRUCIAL: PT e aPTT normais NÃO excluem CID na fase precoce ou compensada. Esses testes são realizados em plasma pobre em plaquetas sem fluxo e sem endotélio; eles apenas medem o tempo para início de fibrina in vitro e só prolongam quando a atividade dos fatores decai abaixo de 30–40% do normal.',
    },
    {
      stepNumber: 4,
      title: 'Fibrinogênio plasmático: interpretação no contexto de fase aguda',
      purpose: 'Detectar hipofibrinogenemia consumptiva ou identificar consumo mascarado.',
      description:
        'O fibrinogênio (fator I) é o substrato terminal clivado pela trombina para gerar fibrina. Em coagulopatias puramente consumptivas, os níveis plasmáticos despencam. No entanto, o fibrinogênio é uma proteína positiva de fase aguda de síntese hepática expressiva, fortemente induzida por IL-6 e outras citocinas inflamatórias (Nelson & Couto, 6ª ed.; Canine Hepatobiliary Diseases, 2024).',
      interpretation:
        'Valores diminuídos (<100–150 mg/dL em cães; <100 mg/dL em gatos) indicam consumo fulminante ou hiperfibrinólise grave que superou amplamente a capacidade sintética do fígado. Por outro lado, concentrações normais ou mesmo elevadas (ex.: 400–600 mg/dL) em um paciente com sepse grave, pancreatite ou piometra NÃO descartam consumo ativo: o animal está produzindo e consumindo fibrinogênio em velocidade vertiginosa simultaneamente. Na série de Nelson & Couto, hipofibrinogenemia esteve presente em apenas 14% dos cães e 5% dos gatos com CID confirmada.',
      limitations:
        'Exigir fibrinogênio baixo como critério obrigatório para reconhecer CID é um dos maiores erros da clínica e impede o diagnóstico da maioria dos pacientes críticos na janela terapêutica precoce.',
    },
    {
      stepNumber: 5,
      title: 'Marcadores de fibrinólise e renovação de fibrina: D-dímero e Produtos de Degradação da Fibrina (FDP)',
      purpose: 'Comprovar a geração intravascular e posterior degradação de fibrina estabilizada por ligações cruzadas.',
      description:
        'A plasmina decompõe o fibrinogênio e a fibrina solúvel gerando FDPs inespecíficos. Em contrapartida, o D-dímero só é gerado após três etapas bioquímicas obrigatórias: (1) A trombina cliva fibrinogênio em fibrina; (2) O fator XIIIa ativado promove ligações cruzadas covalentes entre os domínios D adjacentes da fibrina estável; e (3) A plasmina degrada essa malha de fibrina insolúvel. Portanto, o D-dímero é evidência inequívoca de ativação simultânea da coagulação e da fibrinólise (Textbook of Small Animal Emergency Medicine, Cap. 68; BSAVA ECC, 3ª ed.).',
      interpretation:
        'Em cães, Stokol et al. (2000) demonstraram que testes quantitativos de D-dímero apresentam sensibilidade entre 85% e 100% e especificidade de 90% a 100% quando comparados a cães sadios. Porém, Griffin et al. (2003) comprovaram a armadilha na emergência real: embora 100% dos cães com CID fossem positivos para D-dímero no ponto de atendimento, 15 de 18 cães (83%) que apresentavam apenas hemorragias simples sem CID também foram positivos. Em gatos, Tholen et al. (2009) demonstraram desempenho decepcionante do D-dímero no grupo doente: sensibilidade de 67%, especificidade de 56%, valor preditivo positivo (VPP) de apenas 33% e valor preditivo negativo (VPN) de 83%.',
      limitations:
        'D-dímero positivo indica apenas taxa de renovação e degradação da fibrina reticulada: eleva-se em tromboembolismo pulmonar, hematomas internos extensos, cirurgias recentes, neoplasias, nefropatias perdedoras de proteína e insuficiência hepática. D-dímero normal em gatos não exclui CID de forma confiável.',
    },
    {
      stepNumber: 6,
      title: 'Dosagem de inibidores naturais da coagulação: Antitrombina (AT) e Proteína C',
      purpose: 'Avaliar o esgotamento dos principais freios fisiológicos da cascata e prever resistência à heparina.',
      description:
        'A antitrombina é responsável por inativar mais de 80% da trombina gerada e o fator Xa. Sua atividade sérica funcional é mensurada por ensaios cromogênicos automatizados. A proteína C é ativada pelo complexo trombina-trombomodulina e, auxiliada pela proteína S, inativa os fatores Va e VIIIa. Na sepse e inflamação severa, a atividade de AT e proteína C cai rapidamente por consumo direto contra a trombina, inativação por proteases neutrofílicas e redução da síntese hepática (Ettinger, 9ª ed. 2024; Lumb & Jones, 2024).',
      interpretation:
        'Queda da atividade de antitrombina para níveis <60–70% é marcador fidedigno de consumo acelerado e traduz perda crítica do freio hemostático. Goddard et al. (2013), em 72 cães com babesiose por Babesia rossi, demonstraram que os cães não sobreviventes apresentavam atividade de proteína C significativamente menor e D-dímero significativamente maior do que os sobreviventes. Importância farmacológica: heparinas dependem da antitrombina para exercer seu efeito; se a AT estiver muito baixa, o paciente apresenta resistência funcional à heparina.',
      limitations:
        'Antitrombina baixa não é exclusiva de CID: ocorre por perda renal em nefropatias perdedoras de proteína (PLN), perda entérica em enteropatias (PLE) ou insuficiência de síntese em hepatopatias crônicas graves.',
    },
    {
      stepNumber: 7,
      title: 'Tromboelastografia (TEG) e Tromboelastometria Rotacional (ROTEM): fenotipagem viscoelástica global',
      purpose: 'Avaliar a cinética global da coagulação em sangue total, desde a iniciação até a firmeza máxima e lise do coágulo.',
      description:
        'Diferente dos testes plasmáticos clássicos (PT/aPTT), os métodos viscoelásticos avaliam sangue total, incorporando a contribuição de plaquetas funcionais, eritrócitos, fibrinogênio e fibrinólise em tempo real sob temperatura controlada. Mensura o tempo de reação até os primeiros filamentos de fibrina (R ou CT), a velocidade de formação do coágulo (K/CFT e ângulo alfa), a amplitude máxima / força mecânica do coágulo (MA ou MCF, dependente em 80% das plaquetas e 20% do fibrinogênio) e a taxa de lise do coágulo após 30 e 60 minutos (LY30, LY60 ou ML), detectando hiperfibrinólise (BSAVA ECC, 3ª ed., Cap. 13; Wiinberg et al., 2008).',
      interpretation:
        'ESTUDO PIVOTAL DE WIINBERG ET AL. (2008): Em 50 cães com diagnóstico clínico de CID avaliados por TEG, os autores desmistificaram a ideia de que CID equivale obrigatoriamente a hipocoagulação. Coexistiram traçados hipercoaguláveis (comuns nas fases precoces da sepse, caracterizados por R encurtado e MA elevado) e hipocoaguláveis (R prolongado e MA deprimido). Os pacientes com fenótipo TEG hipocoagulável apresentaram prognóstico e sobrevida significativamente piores. A TEG permite tratar o fenótipo hemostático real do indivíduo.',
      limitations:
        'Requer equipamento especializado e calibração estrita; alta sensibilidade a artefatos pré-analíticos de coleta. Em gatos, August\'s Consultations in Feline Internal Medicine (vol. 7) alerta para dificuldades de padronização, onde a forte retração do coágulo mediada por plaquetas felinas pode simular falso traçado de hiperfibrinólise.',
    },
    {
      stepNumber: 8,
      title: 'Escores diagnósticos objetivos validados na espécie canina',
      purpose: 'Padronizar critérios laboratoriais para fechar o diagnóstico sindrômico e estratificar o risco de óbito.',
      description:
        'Aplicar modelos multivariados estruturados na rotina de terapia intensiva: (1) Modelo de Wiinberg et al. (2010): desenvolvido e validado prospectivamente em cães críticos utilizando a combinação ponderada de aPTT, PT, D-dímero e fibrinogênio, demonstrando na validação sensibilidade de 83,3% e especificidade de 77,3%; (2) Sistema de Overt DIC de Goggs, Mastrocco & Brooks (2018): validado em 804 cães com doenças predisponentes, estabelecendo que a presença de afecção de base somada a ≥3 de 6 parâmetros alterados em relação aos intervalos de referência próprios do laboratório hospitalar (plaquetas diminuídas, PT prolongado, aPTT prolongado, fibrinogênio diminuído, D-dímero elevado e antitrombina diminuída) prediz mortalidade com sensibilidade de 72,7% e especificidade de 80,9% (mortalidade de 62,5% com overt DIC vs 12,9% sem overt DIC; RR 4,84).',
      interpretation:
        'O escore não deve ser interpretado como uma fotografia estática: quanto mais critérios preenchidos simultaneamente, maior o colapso hemostático e mais urgente a intervenção terapêutica.',
      limitations:
        'Os intervalos de referência de reagentes e ensaios variam entre marcas e laboratórios; os pontos de corte absolutos de estudos estrangeiros não devem ser aplicados cegamente sem validação com os valores de referência do próprio hospital veterinário executor.',
      isGoldStandard: true,
    },
    {
      stepNumber: 9,
      title: 'Diagnósticos diferenciais de coagulopatias e mimetizadores na UTI',
      purpose: 'Excluir intoxicações, trombocitopenias isoladas e alterações iatrogênicas de manejo hospitalar.',
      description:
        'Diferenciar a CID de afecções comuns com achados laboratoriais que se sobrepõem:\n\n- Intoxicação por rodenticidas anticoagulantes (antagonistas da vitamina K): o PT prolonga-se precocemente devido à meia-vida curta do fator VII (6–8 h), seguido de aPTT; no entanto, plaquetas, fibrinogênio, antitrombina e D-dímero permanecem estritamente normais até que hemorragia cavitária grave ocorra.\n- Trombocitopenia imunomediada (PTI primária): contagem de plaquetas severamente diminuída (<20.000–30.000/µL), mas PT, aPTT e fibrinogênio são normais e o D-dímero é normal ou discretamente elevado sem falência de múltiplos órgãos.\n- Coagulopatia dilucional da ressuscitação agressiva: infusão rápida de grandes volumes de cristaloides e concentrado de hemácias sem plasma dilui preferencialmente o fibrinogênio (o primeiro a atingir níveis críticos), prolongando PT e aPTT e deprimindo a contagem plaquetária em pacientes traumatizados ou hemorrágicos (BSAVA ECC, Cap. 13, p. 227).\n- Insuficiência hepática aguda terminal: síntese reduzida tanto de fatores pró-coagulantes quanto de anticoagulantes naturais (equilíbrio hemostático rebalanceado), com plaquetas normais ou moderadamente baixas e D-dímero variável.\n- Coagulopatias hereditárias (Hemofilia A e B): aPTT isoladamente prolongado com PT, plaquetas, fibrinogênio e D-dímero normais em animais jovens do sexo masculino.',
      interpretation:
        'A demonstração de ativação sistêmica em múltiplos compartimentos (plaquetas caindo + tempos prolongados + D-dímero alto + esquizócitos + antitrombina consumida) em paciente com patologia inflamatória/neoplásica de base fecha a síndrome de CID frente aos seus mimetizadores.',
      limitations:
        'Na UTI traumatológica e cirúrgica, a coagulopatia dilucional, a hipotermia e a acidose metabólica frequentemente sobrepõem-se à CID, formando a "tríade letal" que amplifica o consumo hemostático.',
    },
  ],
  treatment: {
    metaPrimaria:
      'A remoção, erradicação ou controle imediato da causa primária subjacente é o pilar terapêutico número um e a única conduta verdadeiramente curativa para a CID. Enquanto o foco de infecção, a necrose tecidual ou o tecido neoplásico continuarem liberando fator tecidual, citocinas e proteases na circulação, a geração de trombina persistirá descontrolada e qualquer produto sanguíneo ou medicamento infundido será consumido em questão de poucas horas.\n\nAs intervenções obrigatórias para controle e eliminação do foco incluem:\n\n- Sepse abdominal (peritonite séptica, ruptura de alça intestinal, piometra): estabilização hemodinâmica breve com cristaloides e início de antibioticoterapia intravenosa de amplo espectro nas primeiras horas, seguida de laparotomia exploratória de urgência, lavagem peritoneal exaustiva, desbridamento e drenagem ou ovariossalpingohisterectomia.\n- Torção gástrica (GDV): descompressão gástrica percutânea ou por sonda orogástrica imediata, fluidoterapia de choque e gastropexia cirúrgica após estabilização volêmica.\n- Hemoabdome por hemangiossarcoma ou massa esplênica rota: estabilização volêmica agressiva com concentrado de hemácias/plasma e esplenectomia de emergência para estancar a hemorragia e remover a massa geradora de TF.\n- Intermação e insolação grave (estresse térmico): resfriamento corporal ativo e controlado até 39,2 °C com água morna/corrente de ar (evitando água gelada que cause vasoconstrição periférica reflexa e tremores) e manejo intensivo da endoteliopatia térmica.\n- Pancreatite aguda grave: controle álgico multimodal com opioides contínuos (fentanil, metadona), antiemese (maropitant, ondansetrona), nutrição enteral precoce e perfusão mesentérica.\n- Babesiose canina grave: terapia antiprotozoária específica com dipropionato de imidocarb (6,6 mg/kg IM repetido em 14 dias para B. canis/vogeli) ou atovaquona associada a azitromicina para B. gibsoni (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed. 2024; Goddard et al., 2013).',
    suporteHemodinamico:
      'A preservação da perfusão microvascular é essencial para interromper os ciclos viciosos de hipóxia celular, glicólise anaeróbia com acidose lática e nova lesão endotelial. A hipoperfusão microvascular favorece a estase sanguínea e acentua a formação de trombos de fibrina.\n\nPrincípios e metas do suporte hemodinâmico na UTI:\n\n- Metas microvasculares de ressuscitação: ressuscitação com cristaloides balanceados (como Ringer com lactato ou Plasma-Lyte) estritamente titulada por objetivos clínicos e laboratoriais claros, incluindo restauração da pressão arterial média (PAM ≥65 mmHg), normalização da frequência cardíaca, clareamento sustentado do lactato sérico seriado, temperatura periférica das patas e produção de débito urinário ≥1 a 2 mL/kg/h.\n- Alerta sobre sobrecarga volêmica (BSAVA ECC, 3ª ed.): evitar a hiper-hidratação e expansão agressiva irrestrita baseada em fórmulas teóricas rígidas. A sobrecarga de cristaloides provoca hemodiluição pronunciada, diluindo precocemente o fibrinogênio sérico, as plaquetas e os fatores de coagulação, além de agravar o edema pulmonar na presença de "DIC lung" e aumentar a permeabilidade vascular sistêmica (extravasamento capilar difuso).\n- Suporte vasopressor precoce: se o paciente mantiver hipotensão arterial após a expansão adequada do volume intravascular (avaliada por parâmetros dinâmicos e ultrassom POCUS vascular), instituir imediatamente vasopressores em infusão contínua com norepinefrina na dose de 0,1 a 1,5 µg/kg/min IV, visando restabelecer a resistência vascular sistêmica sem afogar o parênquima pulmonar (BSAVA ECC, 3ª ed.; Fluid Therapy in Dogs and Cats, 2ª ed. 2023).',
    terapiaTransfusional:
      'A terapia com hemocomponentes na CID deve ser restritiva, individualizada e guiada estritamente pelo fenótipo clínico e laboratorial do paciente, e não por metas cosméticas de normalização numérica do coagulograma.\n\nIndicações e particularidades de cada hemocomponente:\n\n- Plasma Fresco Congelado (FFP): fornece todos os fatores pró-coagulantes lábeis e estáveis da hemostasia (fibrinogênio, fatores II, V, VII, VIII, IX, X, XI, XII, XIII) e, fundamentalmente, repõe os inibidores naturais consumidos, com destaque para a antitrombina e proteína C. A dose preconizada é de 10 a 15 mL/kg IV lenta em cães e 6 a 10 mL/kg IV lenta em gatos (Fluid Therapy in Dogs and Cats, 2ª ed. 2023; Ettinger, 9ª ed. 2024). Desmistificação do dogma de lenha na fogueira: o antigo ensino de que infundir plasma na CID seria "adicionar lenha à fogueira" (por fornecer substrato para novos trombos) é formalmente rejeitado por Nelson & Couto (6ª ed., p. 1403) e pelas diretrizes modernas. O FFP fornece tanto fatores quanto seus freios fisiológicos naturais (especialmente AT). No entanto, estudos veterinários e humanos demonstram que a transfusão profilática de FFP em pacientes sem sangramento não altera o desfecho clínico nem a mortalidade. Portanto, o FFP é indicado apenas quando há hemorragia ativa clinicamente significativa com coagulopatia documentada, ou antes de procedimentos cirúrgicos invasivos indispensáveis.\n- Concentrado de Hemácias (pRBC): indicado quando a perda de sangue ou a hemólise microangiopática reduz o hematócrito abaixo de 20–25% em cães ou 15–18% em gatos, com evidências de transporte inadequado de oxigênio (taquicardia persistente, hiperlactatemia, fraqueza severa). Dose: volume (mL) = peso (kg) × 80 (cão) ou 60 (gato) × [(Ht desejado – Ht atual) / Ht da bolsa].\n- Sangue Total Fresco (FWB): representa a melhor alternativa quando concentrados de plaquetas não estão disponíveis e o paciente apresenta simultaneamente anemia hipóxica, trombocitopenia acentuada e hemorragia volumosa ativa (dose: 15–20 mL/kg IV). O FWB fornece hemácias, volume plasmático com fatores e plaquetas viáveis funcionais se transfundido imediatamente após a colheita (Textbook of Small Animal Emergency Medicine, Cap. 70).\n- Crioprecipitado: preparado por descongelamento lento do FFP a 1–6 °C, concentra fibrinogênio, fator VIII, fator XIII, fator de von Willebrand e fibronectina em volume reduzido (cerca de 50 mL por bolsa canina, contendo de 5 a 10 vezes a concentração de fibrinogênio do plasma original). Dose: 1 unidade a cada 10 kg de peso vivo IV lenta. É a escolha de excelência quando há hipofibrinogenemia severa (<100 mg/dL) acompanhada de sangramento ativo em pacientes com risco iminente de sobrecarga volêmica circulatória associada à transfusão (TACO). Nelson & Couto relatam sucesso clínico documentado com o uso de crioprecipitado em cães com CID secundária a hemangiossarcoma e GDV.\n- Concentrado de Plaquetas: raramente disponível na rotina veterinária nacional; indicado apenas se houver trombocitopenia extrema (<20.000–30.000/µL) associada a hemorragia ativa que ameace a vida.',
    anticoagulacao:
      'O emprego de terapia anticoagulante na CID é um dos tópicos mais controversos da medicina veterinária intensiva. Fisiologicamente, a administração de heparina visa conter a geração contínua de trombina, interromper a formação de microtrombos e atenuar a coagulopatia de consumo secundária. Contudo, evidências sólidas provenientes de ensaios clínicos randomizados e o consenso ACVECC/CURATIVE (2019) reforçam que a heparina NÃO deve ser uma conduta rotineira ou universal na CID, devendo ser selecionada estritamente conforme o fenótipo:\n\n- Quando considerar anticoagulação com mais força: pacientes com CID precoce/compensada (non-overt), sem evidências de sangramento ativo, portadores de fenótipo pró-trombótico documentado (trombose macrovascular, tromboembolismo pulmonar, necrose isquêmica de extremidades ou TEG com padrão hipercoagulável inequívoco).\n- Quando a heparina é formalmente contraindicada: pacientes com CID manifesta/consumptiva (overt DIC), presença de hemorragia ativa espontânea cutânea, mucosa ou cavitária, hipofibrinogenemia profunda (<100 mg/dL), traçado viscoelástico hipocoagulável no TEG ou necessidade iminente de cirurgia hemostática de urgência.\n- Heparina Não Fracionada (UFH): a UFH liga-se à antitrombina, provocando mudança conformacional que acelera em centenas de vezes a inibição da trombina e do fator Xa. Alerta farmacológico: a heparina depende obrigatoriamente de níveis adequados de antitrombina para funcionar; se a AT estiver exaurida por consumo maciço (<50–60%), a heparina perde eficácia biológica e produz resistência funcional. Posologia (Plumb\'s Veterinary Drug Handbook, 10ª ed., p. 630): na CID em cães (uso extra-label), a dose prática ambulatorial descrita é de 75 a 100 UI/kg SC a cada 8 horas. No ambiente de UTI sob monitoramento contínuo, preconiza-se bolus inicial de 100 UI/kg IV seguido de infusão contínua (CRI) de 20 a 50 UI/kg/hora, ajustando-se a taxa em incrementos de 5 UI/kg/h conforme a resposta hemostática. Esquemas históricos clássicos de Nelson & Couto (6ª ed., p. 1404): minidose (5–10 UI/kg SC q8h, sem efeito sobre testes plasmáticos), baixa dose (50–100 UI/kg SC q8h, preferida por Couto em associação a transfusão de FFP), intermediária (300–500 UI/kg SC/IV q8h) e alta dose (750–1000 UI/kg SC/IV q8h). Se a heparina for utilizada, o desmame deve ser obrigatoriamente gradual ao longo de 2 a 4 dias (reduzindo cerca de 50 UI/kg/dia) para evitar o fenômeno de hipercoagulabilidade rebote documentado na literatura. Monitoramento: o monitoramento ideal da UFH terapêutica é realizado pela atividade anti-fator Xa (alvo: 0,35 a 0,7 UI/mL). Se indisponível, utilizar o aPTT, buscando prolongamento de 1,5 a 2 vezes o valor basal inicial do paciente (com a ressalva de que o aPTT na CID pode prolongar pela própria progressão da doença consumptiva). Reversão: em caso de sobredose hemorrágica, reverter com sulfato de protamina na dose de 1 mg IV lento para cada 100 UI da última dose de heparina administrada (Plumb\'s, 10ª ed.), administrando lentamente para evitar reações anafilactóides e colapso hipotensivo agudo. Pérola de plantão: NUNCA misturar ou pré-incubar heparina na bolsa de plasma fresco antes da transfusão; essa prática antiga além de não trazer benefício reduz a antitrombina disponível no produto (Lumb & Jones, 2024, Cap. 31, p. 577).\n- Heparinas de Baixo Peso Molecular (LMWH — Enoxaparina e Dalteparina): apresentam maior atividade anti-Xa proporcional em relação à antitrombina (relação anti-Xa:anti-IIa de cerca de 3:1 a 4:1), menor ligação inespecífica a proteínas plasmáticas e farmacocinética mais previsível. Posologias segundo o Plumb\'s (10ª ed., pp. 363 e 475): Enoxaparina em cães (0,8 a 1 mg/kg SC a cada 6 a 8 horas, ou 0,8 mg/kg SC q6h) e em gatos (0,75 a 1 mg/kg SC a cada 6 a 12 horas, sendo a administração q6h preferível para concentrações anti-Xa homogêneas); Dalteparina em cães (150 a 175 UI/kg SC a cada 8 horas) e em gatos (75 a 150 UI/kg SC a cada 6 horas). Monitoramento de LMWH: o coagulograma de rotina (PT e aPTT) é insensível às LMWH. O monitoramento exige a dosagem do pico de atividade anti-Xa (alvo de pico: 0,5 a 1,0 UI/mL), colhendo-se a amostra exatamente 3 horas após a injeção SC no cão e 2 horas após a injeção SC no gato (Plumb\'s, 10ª ed.). Reversão da Enoxaparina: 1 mg de sulfato de protamina IV lento para cada 1 mg de enoxaparina administrada nas últimas 8 horas.',
    antifibrinoliticos:
      'Os fármacos antifibrinolíticos — notadamente o ácido tranexâmico (TXA) e o ácido aminocaproico — atuam como análogos sintéticos da lisina que bloqueiam competitivamente os sítios de ligação de lisina no plasminogênio, impedindo sua conversão em plasmina ativa e tornando o coágulo de fibrina resistente à lise enzimática.\n\nDiretrizes de uso e o relato pivotal de hiperfibrinólise:\n\n- Regra geral de contraindicação na sepse: de modo geral, os antifibrinolíticos são formalmente contraindicados na CID clínica padrão, especialmente na sepse (Textbook of Small Animal Emergency Medicine, Cap. 68, p. 435; Plumb\'s, 10ª ed., p. 78). Como a maioria das formas de CID séptica é acompanhada por fibrinólise profundamente suprimida (devido à superexpressão de PAI-1 e TAFI), administrar um antifibrinolítico bloqueia a remoção fisiológica da fibrina e precipita trombose microvascular fulminante e irreversível em órgãos vitais.\n- Exceção biológica e relato pivotal de 2024 (Granger et al.): em contrapartida, pacientes portadores de CID crônica de origem oncológica ou trauma maciço podem desenvolver um fenótipo atípico de hiperfibrinólise secundária descontrolada. Granger et al. (2024, Frontiers in Veterinary Science) descreveram o caso de um cão Border Collie de 8 anos com carcinoma nasal metastático que manifestava epistaxes graves recorrentes; a avaliação hemostática revelou PT e aPTT severamente prolongados, hipofibrinogenemia grave (<60 mg/dL), D-dímero e FDPs elevados, antitrombina depletada, TEG com perfil profundamente hipocoagulável e hipofibrinolítico patológico por lise acelerada. O uso compassivo e racional de ácido aminocaproico associado a hemocomponentes (FFP, crioprecipitado e concentrado de hemácias) alcançou controle temporário da hemorragia incoercível.\n- Posologias validadas (Plumb\'s 10ª ed., pp. 78 e 1291): Ácido aminocaproico em cães com hiperfibrinólise comprovada laboratorialmente por TEG: dose extra-label de 15 a 20 mg/kg IV lenta ou VO a cada 8 horas (ou até 33 mg/kg IV q6h em relatos de sangramento ativo refratário); Ácido tranexâmico (TXA) em cães: 10 mg/kg IV lento em 15–20 minutos, seguido por CRI de 10 mg/kg/hora durante 3 horas, ou 10 mg/kg IV repetido a cada 6–8 horas conforme TEG.\n- Conclusão prática: o uso de antifibrinolítico na CID é restrito exclusivamente aos casos com evidência laboratorial objetiva em testes viscoelásticos (LY30/LY60 acentuados na TEG/ROTEM) e manifestação hemorrágica primária dominante, jamais devendo ser administrado de forma empírica.',
    terapiasInadequadas:
      'Condutas desaconselhadas e mitos terapêuticos que não devem ser praticados na abordagem da CID:\n\n- Vitamina K1 (Fitomenadiona) rotineira: atua exclusivamente como cofator para a gama-glutamil carboxilase hepática na ativação dos fatores dependentes de vitamina K (II, VII, IX, X). Ela não inibe o fator tecidual, não bloqueia a geração sistêmica de trombina e não repõe o consumo hemostático difuso da CID. O uso de vitamina K1 é indicado apenas se houver suspeita fundamentada de deficiência concomitante associada (como colestase obstrutiva com má absorção de gorduras, desnutrição severa prolongada, hepatopatias com componente de deficiência ou intoxicação por rodenticidas antagonistas de vitamina K coexistente; Ettinger, 2024; Nelson & Couto, 6ª ed.). Alerta: nunca administrar vitamina K1 por via intravenosa devido ao risco de choque anafilático grave; usar vias SC ou oral.\n- Corticosteróides para "tratar a CID": não existe qualquer indicação de glicocorticóides para o manejo da CID em si. Glicocorticóides estimulam a síntese de PAI-1 no endotélio (inibindo a fibrinólise) e favorecem estados pró-trombóticos microvasculares. Devem ser restritos exclusivamente quando indicados para a doença causal primária (como anemias hemolíticas imunomediadas — IMHA).\n- Fármacos antiplaquetários (Aspirina e Clopidogrel): não constituem terapia de resgate para a CID aguda. Embora a aspirina (0,5–1 mg/kg VO q12h em cães) já tenha sido prescrita no passado, ela não impede a geração sistêmica de trombina plasmática e acarreta alto risco de ulceração gastrointestinal e hemorragia fatal em animais com coagulopatia instalada (Nelson & Couto, 6ª ed., p. 1404; ACVECC CURATIVE, 2019). O clopidogrel tem indicação formal no consenso CURATIVE para trombose arterial felina e prevenção tromboembólica em nefropatias, mas não como tratamento de choque na CID consumptiva.\n- Transfusão profilática de FFP para "tratar o exame de sangue": não transfundir plasma apenas porque o PT ou aPTT vieram alterados em paciente estável e assintomático. Trate sempre o doente, não os números impressos no laudo laboratorial.',
    suporteMultiorganico:
      'O suporte multiorgânico intensivo na UTI representa o terceiro pilar do tratamento da CID:\n\n- Manejo ventilatório do "DIC lung": oxigenioterapia suplementar umidificada por cânula nasal ou máscara em fluxo moderado; se houver hipoxemia refratária (PaO2 <60 mmHg ou SpO2 <90% com FiO2 >0,5) ou aumento crítico do trabalho respiratório por micro-hemorragia alveolar e microtrombose septal, indicar intubação traqueal e ventilação mecânica protetora com pressão positiva expiratória final (PEEP de 5 a 10 cmH2O) e baixos volumes correntes (6 a 8 mL/kg), minimizando barotrauma e volutrauma (Nelson & Couto, 6ª ed.; Textbook of Small Animal Emergency Medicine).\n- Manejo da lesão renal aguda (LRA): monitorar débito urinário a cada 1–2 horas através de sistema fechado estéril de sondagem vesical (com os devidos cuidados de assepsia para evitar infecção ascendente). Se o paciente evoluir com oligúria (<1 mL/kg/h) a despeito de volemia restabelecida, avaliar terapia dialítica ou uso cauteloso de diuréticos de alça (furosemida 1–2 mg/kg IV em bolus de desafio); evitar fármacos nefrotóxicos concomitantes (aminoglicosídeos, AINEs).\n- Controle de arritmias miocárdicas: complexos ventriculares prematuros (VPCs) frequentes ou multifocais causados por isquemia microcoronariana respondem primariamente à melhora da perfusão miocárdica e oxigenação tecidual. Se houver taquicardia ventricular sustentada com comprometimento hemodinâmico, administrar lidocaína em cães (bolus de 2 mg/kg IV lento, seguido de CRI de 25 a 75 µg/kg/min; evitar bolus de lidocaína em gatos devido à neuro e cardiotoxicidade).\n- Correção hidroeletrolítica e ácido-base: tratar acidose metabólica primariamente restabelecendo a microperfusão tecidual e o clareamento do lactato. Avaliar cálcio ionizado sérico: a hipocalcemia ionizada é frequente após transfusões múltiplas de sangue e plasma citratados (o citrato quela o cálcio) e compromete tanto a contratilidade cardíaca quanto a cascata de coagulação, devendo ser corrigida com gluconato de cálcio a 10% (0,5 a 1,5 mL/kg IV lento sob monitoramento eletrocardiográfico para detectar bradicardia).',
    monitoramentoSeriado:
      'Protocolo de monitoramento intensivo seriado e critérios de melhora: a CID é uma condição clínica eminentemente dinâmica; avaliações isoladas pontuais têm valor prognóstico limitado quando comparadas à trajetória temporal seriada.\n\n- Parâmetros clínicos dinâmicos (a cada 2–4 horas no paciente instável): frequência cardíaca, frequência respiratória, pressão arterial sistêmica média (PAM), oximetria de pulso (SpO2), temperatura central e periférica, escala de coma/mentação, débito urinário horário e inspeção minuciosa de mucosas, pele e curativos para detecção de novos focos hemorrágicos.\n- Parâmetros laboratoriais seriados (a cada 6–12 horas na fase crítica): hematócrito e proteína total plasmática (para detectar hemorragia oculta ou hemodiluição excessiva), contagem plaquetária manual com esfregaço (pesquisa de esquizócitos), coagulograma (PT e aPTT), fibrinogênio, D-dímero quantitativo, antitrombina (se disponível), lactato sanguíneo seriado, gasometria e creatinina sérica.\n- Critérios objetivos de melhora clínica e laboratorial: (1) Estabilização e subsequente ascensão na contagem de plaquetas; (2) Redução progressiva dos tempos de coagulação (PT e aPTT) em direção aos intervalos de referência; (3) Estabilização dos níveis de fibrinogênio sérico acima de 150 mg/dL; (4) Queda acentuada ou estabilização do lactato sérico indicando restauração da microperfusão tecidual; (5) Recuperação sustentada da diurese (>1,5–2 mL/kg/h) e estabilização da função renal; (6) Cessação completa de petéquias ativas, hematomas e sangramentos em sítios de punção ou cateteres; e (7) Resolução clínica e cirúrgica do gatilho primário desencadeante.',
  },
  complications: {
    falenciaMultiplaOrgaos:
      'A oclusão difusa de leitos capilares e arteríolas pré-capilares por microtrombos de fibrina e agregados de neutrófilos e plaquetas deflagra hipoperfusão tecidual heterogênea e isquemia celular severa. A síndrome de disfunção orgânica múltipla (MODS) afeta primariamente rins (necrose tubular aguda e anúria), pulmões (síndrome do pulmão da CID / SDRA com hipoxemia refratária), coração (arritmias ventriculares por isquemia coronariana intramural), fígado (isquemia centrolobular) e sistema nervoso central (estupor e coma).',
    hemorragiasIncoerciveis:
      'O esgotamento progressivo dos fatores da coagulação (fator I/fibrinogênio, II, V e VIII) associado à trombocitopenia consumptiva severa (<30.000/µL) e ao efeito anticoagulante dos produtos de degradação da fibrina (FDPs) culmina na diátese hemorrágica generalizada. As manifestações incluem petéquias e sufusões cutâneo-mucosas espontâneas, epistaxe incoercível, sangramento em napa em locais de punção e cateteres venosos, hematêmese, melena e hemorragias intracavitárias com choque hipovolêmico fatal.',
    figuraPetequiasEquimoses: figura5PetequiasEquimoses,
  },
  prevention: {
    vigilanciaPrecoce:
      'A única estratégia verdadeiramente eficaz de prevenção da CID reside no alto índice de suspeição e no reconhecimento precoce da síndrome em pacientes críticos admitidos na emergência antes que a fase manifesta (overt DIC) com falência multiorgânica se estabeleça.\n\nTodo paciente canino ou felino com patologia sistêmica de alto risco (sepse abdominal, piometra, pancreatite aguda, hemoabdome por hemangiossarcoma, politrauma, choque prolongado ou insolação) deve ter um painel hemostático basal colhido imediatamente à admissão (plaquetas, PT, aPTT, fibrinogênio e D-dímero).\n\nA observação de quedas progressivas na contagem de plaquetas ou elevação combinada de D-dímero e fibrinogênio nas primeiras 6 a 12 horas de internação permite identificar a fase pré-DIC pró-trombótica e otimizar a terapia da doença primária antes do colapso consumptivo.',
    iatrogenica:
      'Prevenção de complicações iatrogênicas e manejo na UTI:\n\n- Prevenção da tríade letal (coagulopatia dilucional, hipotermia e acidose): (1) Prevenir a coagulopatia dilucional através de ressuscitação volêmica restritiva guiada por metas microvasculares, evitando sobrecarga desmedida de fluidos cristaloides sem reposição adequada de fatores e hemácias; (2) Prevenir ativamente a hipotermia durante cirurgias e procedimentos emergenciais, utilizando colchões térmicos de ar forçado e fluidos aquecidos, uma vez que a atividade enzimática dos fatores de coagulação decai cerca de 10% para cada queda de 1 °C na temperatura corporal; e (3) Corrigir precocemente a hipoperfusão para evitar acidose metabólica severa (pH <7,20), a qual inibe a montagem dos complexos enzimáticos tenase e protrombinase na membrana plaquetária.\n- Cuidados com procedimentos invasivos: evitar procedimentos invasivos dispensáveis (como cistocentese em animais com tendência hemorrágica documentada, punções venosas repetidas em jugular ou injeções intramusculares) em pacientes com CID instalada (Nelson & Couto, 6ª ed.; BSAVA ECC, 3ª ed.).',
  },
  relatedConsensusSlugs: ['curative-risco-trombotico-2022', 'veccs-sepse-definicao-caes-gatos-2026'],
  relatedDiseaseSlugs: [
    'babesiose-canina',
    'erliquiose-monocitica-canina',
    'leishmaniose-visceral-canina',
    'peritonite-infecciosa-felina',
    'doenca-renal-cronica-caes-gatos',
  ],
  relatedMedicationSlugs: [
    'enrofloxacina',
    'amoxicilina-clavulanato',
    'ampicilina-sulbactam',
    'metronidazol',
    'dipirona',
    'maropitant',
    'ondansetron',
  ],
  references: [
    {
      id: 'ref-wiinberg-2010',
      citationText:
        'Wiinberg B, Jensen AL, Johansson PI, Rozanski E, Tranholm M, Kristensen AT. Development and evaluation of an objective diagnostic scoring system for disseminated intravascular coagulation in dogs. J Vet Intern Med. 2010;24(1):92-98.',
      sourceType: 'Estudo prospectivo de validação',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19586785/',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-wiinberg-2008',
      citationText:
        'Wiinberg B, Jensen AL, Rozanski E, Johansson PI, Kjelgaard-Hansen M, Tranholm M, Kristensen AT. Thromboelastographic evaluation of hemostatic function in dogs with disseminated intravascular coagulation. J Vet Intern Med. 2008;22(2):357-365.',
      sourceType: 'Estudo clínico observacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/18346141/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-goggs-2018',
      citationText:
        'Goggs R, Mastrocco A, Brooks MB. Evaluation of four diagnostic criteria for disseminated intravascular coagulation in dogs. J Vet Emerg Crit Care. 2018;28(5):415-429.',
      sourceType: 'Coorte prospectiva multicêntrica (804 cães)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30302935/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-stokol-2000',
      citationText:
        'Stokol T, Brooks MB, Erb HN, de Neergaard C. D-dimer concentrations in healthy dogs and dogs with disseminated intravascular coagulation. Am J Vet Res. 2000;61(4):393-398.',
      sourceType: 'Estudo clínico comparativo',
      url: 'https://pubmed.ncbi.nlm.nih.gov/10772103/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-griffin-2003',
      citationText:
        'Griffin A, Callan MB, Shofer FS, Otto CM. Evaluation of a point-of-care D-dimer assay in dogs with thromboembolic disease, disseminated intravascular coagulation, and hemorrhage. J Am Vet Med Assoc. 2003;223(8):1160-1165.',
      sourceType: 'Estudo clínico de acurácia',
      url: 'https://pubmed.ncbi.nlm.nih.gov/14672437/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-estrin-2006',
      citationText:
        'Estrin MA, Wehausen CE, Jessen CR, Lee JA. Disseminated intravascular coagulation in cats: 46 cases (1990-2004). J Am Vet Med Assoc. 2006;229(12):1934-1940.',
      sourceType: 'Série retrospectiva felina (46 casos)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/17186846/',
      evidenceLevel: 'B/C',
    },
    {
      id: 'ref-tholen-2009',
      citationText:
        'Tholen I, Kohn B, Mischke R. Evaluation of a quantitative D-dimer assay in feline plasma. J Feline Med Surg. 2009;11(6):448-454.',
      sourceType: 'Estudo analítico e clínico felino',
      url: 'https://pubmed.ncbi.nlm.nih.gov/19539510/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-goddard-2013',
      citationText:
        'Goddard A, Schoeman JP, Leisewitz AL, Nagel SS, Aronow RA. Clinicopathologic abnormalities associated with mortality in dogs with virulent Babesia rossi infection. J S Afr Vet Assoc. 2013;84(1):E1-E6.',
      sourceType: 'Estudo clínico observacional',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23098634/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-honse-2013',
      citationText:
        'Honse CO, Souza CC, Reis AB, Tafuri WL. Disseminated intravascular coagulation in a dog naturally infected with Leishmania (Leishmania) chagasi. BMC Vet Res. 2013;9:43.',
      sourceType: 'Relato de caso brasileiro',
      url: 'https://pubmed.ncbi.nlm.nih.gov/23497531/',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-philp-2023',
      citationText:
        'Philp HS, Farrell KS, Li RHL. Fatal pulmonary thrombosis and disseminated intravascular coagulation after adulticide treatment of Dirofilaria immitis in a dog. Front Vet Sci. 2023;10:1118798.',
      sourceType: 'Relato de caso clínico-patológico',
      url: 'https://doi.org/10.3389/fvets.2023.1118798',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-granger-2024',
      citationText:
        'Granger LA, Dedeaux AM, Saile K, Gisselman K, Luff J, Boudreaux MK. Suspected paraneoplastic hyperfibrinolysis in a dog with metastatic nasal adenocarcinoma and chronic disseminated intravascular coagulation. Front Vet Sci. 2024;11:1375507.',
      sourceType: 'Relato de caso investigativo',
      url: 'https://doi.org/10.3389/fvets.2024.1375507',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-curative-2019',
      citationText:
        'Blais MC, Bianco D, Goggs R, Lynch AM, Palmer L, Ralph A, Sharp CR. Consensus on the Rational Use of Antithrombotics in Veterinary Critical Care (CURATIVE): Domain 3 - Defining antithrombotic protocols. J Vet Emerg Crit Care. 2019;29(1):60-74.',
      sourceType: 'Consenso de especialistas (ACVECC)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30654416/',
      evidenceLevel: 'A/B',
    },
    {
      id: 'ref-isth-2025',
      citationText:
        'Iba T, Levi M, Thachil J, Wada H, Levy JH. The 2025 update of the International Society on Thrombosis and Haemostasis definition of disseminated intravascular coagulation. J Thromb Haemost. 2025;23(4):945-953.',
      sourceType: 'Atualização de consenso internacional (ISTH)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/40216223/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nelson-couto-hemostasis',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Cap. 87: Disorders of Hemostasis, pp. 1387-1405 (Disseminated Intravascular Coagulation, pp. 1400-1405).',
      sourceType: 'Livro-texto de medicina interna',
      evidenceLevel: 'Referência clínica de excelência',
    },
    {
      id: 'ref-ettinger-hemostasis-2024',
      citationText:
        'Ettinger SJ, Feldman EC, Côté E, eds. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024. Cap. 170: Coagulation Testing; Cap. 171: Hyper- and Hypocoagulable States (Disseminated Intravascular Coagulation, pp. 867-872).',
      sourceType: 'Livro-texto de medicina interna',
      evidenceLevel: 'Referência clínica de excelência',
    },
    {
      id: 'ref-plumbs-10ed',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023. Monografias: Heparin (pp. 630-633), Enoxaparin (pp. 475-478), Dalteparin (pp. 362-365), Aminocaproic Acid (pp. 78-81), Tranexamic Acid (pp. 1291-1294), Protamine Sulfate e Phytonadione.',
      sourceType: 'Formulário terapêutico veterinário',
      evidenceLevel: 'Referência farmacológica padrão-ouro',
    },
    {
      id: 'ref-lumb-jones-2024',
      citationText:
        'Grimm KA, Lamont LA, Tranquilli WJ, Greene SA, Robertson SA, eds. Lumb and Jones’ Veterinary Anesthesia and Analgesia. 6th ed. Wiley-Blackwell; 2024. Cap. 31: Treatment of Coagulation and Platelet Disorders, pp. 574-579.',
      sourceType: 'Livro-texto de anestesiologia e terapia intensiva',
      evidenceLevel: 'Base fisiológica e farmacológica',
    },
    {
      id: 'ref-drobatz-emergency-2019',
      citationText:
        'Drobatz KJ, Hopper K, Rozanski EA, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019. Cap. 68: Fibrinolysis and Antifibrinolytics (pp. 431-438); Cap. 70: Acquired Coagulopathy (pp. 445-453); Cap. 86: Pancreatitis; Cap. 159: SIRS and Sepsis.',
      sourceType: 'Livro-texto de emergência e cuidados intensivos',
      evidenceLevel: 'Referência clínica de emergência',
    },
    {
      id: 'ref-withrow-oncology-6ed',
      citationText:
        'Vail DM, Thamm DH, Liptak JM, eds. Withrow & MacEwen’s Small Animal Clinical Oncology. 6th ed. Elsevier; 2020. Cap. 5: Paraneoplastic Syndromes (pp. 99-105; DIC p. 104); Cap. 34: Miscellaneous Tumors (Hemangiosarcoma Hemostasis, pp. 773-778).',
      sourceType: 'Livro-texto de oncologia veterinária',
      evidenceLevel: 'Referência oncológica de excelência',
    },
    {
      id: 'ref-bsava-ecc-3ed',
      citationText:
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. British Small Animal Veterinary Association; 2018. Cap. 13: Haematological Emergencies (pp. 210-235; DIC pp. 227-229); Cap. 14: Transfusion Medicine (pp. 236-248).',
      sourceType: 'Manual internacional de emergência e UTI',
      evidenceLevel: 'Referência clínica especializada',
    },
    {
      id: 'ref-yang-2025',
      citationText:
        'Yang Y, Liu J, Wang Z, et al. Disseminated intravascular coagulation: Pathophysiological mechanisms and clinical therapeutic advances. J Intensive Med. 2025;5(1):15-28.',
      sourceType: 'Artigo de revisão e fisiopatologia (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.1016/j.jointm.2024.08.002',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-unar-2023',
      citationText:
        'Unar A, Shen Z, Liu X, et al. Immunothrombosis in Sepsis: A Review of the Pathological Mechanisms and Emerging Targets. Cells. 2023;12(16):2120.',
      sourceType: 'Artigo de revisão em imunotrombose (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.3390/cells12162120',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-goddard-2026',
      citationText:
        'Goddard A, Schoeman JP, Leisewitz AL, et al. Histopathological pulmonary lesions and microvascular thrombosis in dogs with lethal Babesia rossi infection. Front Vet Sci. 2026;13:1697669.',
      sourceType: 'Estudo anatomopatológico e histopatológico (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.3389/fvets.2026.1697669',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-cooper-2021',
      citationText:
        'Cooper ES, Silverstein DC. Evaluation of the microcirculation in clinical dogs with shock. Front Vet Sci. 2021;8:647493.',
      sourceType: 'Estudo observacional em microcirculação clínica (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.3389/fvets.2021.647493',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-dosenberry-2025',
      citationText:
        'Dosenberry C, Lynch AM, Brooks MB. Spontaneous bleeding diathesis in severe acquired coagulopathies and primary hemostatic defects in dogs. Front Vet Sci. 2025;12:1568224.',
      sourceType: 'Série de casos clínicos hemostáticos (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.3389/fvets.2025.1568224',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-sotos-2023',
      citationText:
        'Sotos A, Perez-Lopez L, Couto CG, et al. Hemostatic profile and hypofibrinolysis in canine sepsis: evaluation by rotational thromboelastometry and biomarker kinetics. Front Vet Sci. 2023;10:1158914.',
      sourceType: 'Estudo clínico prospectivo em sepse canina (Open Access CC BY 4.0)',
      url: 'https://doi.org/10.3389/fvets.2023.1158914',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
