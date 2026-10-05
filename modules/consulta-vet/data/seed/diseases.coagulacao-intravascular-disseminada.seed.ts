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
    'Figura 1 — Mecanismos fisiopatológicos centrais da CID (Yang et al., 2025, CC BY 4.0):\n' +
    '- Ativação endotelial sistêmica e liberação de fator tecidual (TF).\n' +
    '- Esgotamento dos freios naturais (antitrombina, proteína C e TFPI).\n' +
    '- Deposição maciça de microtrombos de fibrina e agregados plaquetários na microcirculação.',
  display: 'wide',
};

const figura2ImunotromboseSepse: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig2-imunotrombose-sepse-unar-2023.jpg',
  alt: 'Eixo imunotrombose-sepse: interação entre neutrófilos, NETs, plaquetas e geração de trombina',
  caption:
    'Figura 2 — Eixo imunotrombose-sepse (Unar et al., 2023, CC BY 4.0):\n' +
    '- Ativação de monócitos e neutrófilos por PAMPs e DAMPs.\n' +
    '- Formação de armadilhas extracelulares de neutrófilos (NETs) e ativação plaquetária.\n' +
    '- Superexpressão de fator tecidual, geração descontrolada de trombina e microtrombose inflamatória.',
  display: 'default',
};

const figura3MicrotrombosPulmonares: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig3-microtrombos-pulmonares-goddard-2026.webp',
  alt: 'Histopatologia pulmonar revelando microtrombos de fibrina e alveolite hemorrágica em cão com sepse/CID',
  caption:
    'Figura 3 — Histopatologia de pulmão canino ("DIC lung"; Goddard et al., 2026, CC BY 4.0):\n' +
    '- Capilares septais alveolares ocluídos por microtrombos densos de fibrina.\n' +
    '- Congestão vascular severa e extravasamento hemorrágico intra-alveolar em cão com infecção virulenta por Babesia rossi.',
  display: 'default',
};

const figura4MicrocirculacaoChoque: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig4-microcirculacao-choque-cooper-2021.webp',
  alt: 'Microcirculação sublingual por imagem em campo escuro incidente (IDF) em cão saudável versus choque séptico',
  caption:
    'Figura 4 — Avaliação da microcirculação por imagem em campo escuro incidente (IDF) em cão (Cooper & Silverstein, 2021, CC BY 4.0):\n' +
    '- Microcirculação sublingual normal exibindo fluxo capilar contínuo e homogêneo.\n' +
    '- Perda severa de densidade vascular funcional e heterogeneidade de fluxo microvascular observadas no choque séptico e hemorrágico com CID.',
  display: 'wide',
};

const figura5PetequiasEquimoses: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig5-petequias-equimoses-dosenberry-2025.webp',
  alt: 'Manifestações hemorrágicas cutâneas com petéquias e equimoses disseminadas na pele abdominal de cão',
  caption:
    'Figura 5 — Manifestações hemorrágicas cutâneas multifocais (Dosenberry et al., 2025, CC BY 4.0):\n' +
    '- Petéquias puntiformes e sufusões equimóticas coalescentes na pele abdominal de cão.\n' +
    '- Padrão clínico representativo de falha simultânea da hemostasia primária e secundária na fase consumptiva (overt DIC).',
  display: 'default',
};

const figura6PotencialHemostaticoSepse: EditorialClinicalFigure = {
  kind: 'clinicalFigure',
  src: '/consulta-vet/cid/fig7-potencial-hemostatico-sepse-sotos-2023.webp',
  alt: 'Traçados de ROTEM e potencial de lise demonstrando hipofibrinólise e estado pró-trombótico na sepse canina',
  caption:
    'Figura 6 — Hipofibrinólise e potencial pró-trombótico na sepse canina (Sotos et al., 2023, CC BY 4.0):\n' +
    '- Curvas de tromboelastometria rotacional (ROTEM) evidenciando resistência do coágulo à lise induzida por tPA em cães sépticos.\n' +
    '- Estado de hipofibrinólise mediado por PAI-1 e TAFI, característico da fase pró-trombótica da CID séptica.',
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
    'Síntese clínica e fisiopatológica da Coagulação Intravascular Disseminada (CID/DIC):\n' +
    '- Definição e colapso hemostático global:\n' +
    '  - Síndrome adquirida grave e dinâmica caracterizada por ativação sistêmica desregulada da hemostasia, lesão endotelial disseminada, exaustão dos freios anticoagulantes naturais (antitrombina, proteína C e TFPI) e fibrinólise alterada.\n' +
    '  - Paradoxo hemostático: formação maciça de microtrombos de fibrina e agregados plaquetários na microcirculação (gerando hipoperfusão tecidual e falência de múltiplos órgãos - MODS), associada ao consumo acelerado de plaquetas, fibrinogênio e fatores pró-coagulantes com risco de hemorragias fulminantes.\n' +
    '- Condição estritamente secundária:\n' +
    '  - Decorre obrigatoriamente de gatilhos sistêmicos graves: sepse/SIRS, neoplasias (especialmente hemangiossarcoma esplênico), pancreatite aguda necrosante, torção gástrica (GDV), intermação e insolação térmica, politrauma, hepatopatias fulminantes e doenças hemolíticas.\n' +
    '- Bifurcação fenotípica e evidência de Wiinberg et al. (2008):\n' +
    '  - Avaliando 50 cães por tromboelastografia (TEG), demonstrou-se que a CID não equivale simplesmente a hipocoagulação.\n' +
    '  - Coexistem fenótipos hipercoaguláveis (comuns na sepse com PAI-1 elevado e fibrinólise suprimida) e hipocoaguláveis/hiperfibrinolíticos (comuns em neoplasias e trauma).\n' +
    '- Estratificação objetiva e mortalidade (Goggs et al., 2018):\n' +
    '  - Em coorte de 804 cães, a progressão para CID manifesta (overt DIC, definida por >=3 de 6 critérios hemostáticos alterados) elevou a mortalidade para 62,5% vs 12,9% (risco relativo de 4,84).\n' +
    '- Princípios de intervenção clínica:\n' +
    '  - Combate imediato à causa primária e restauração da microperfusão por fluidoterapia guiada por metas sem hemodiluição excessiva.\n' +
    '  - Heparinização controversa e restrita a fenótipos trombóticos sem hemorragia ativa (CURATIVE, 2019; Plumb\'s, 10ª ed.).\n' +
    '  - Plasma fresco congelado (FFP) e crioprecipitado reservados para reposição fenotípica em sangramento ativo ou procedimentos invasivos de alto risco.',
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
      'Perda da compartimentalização hemostática e colapso microvascular:\n' +
      '- Quebra do confinamento anatômico:\n' +
      '  - Na CID, a geração de trombina — que deveria ocorrer estritamente restrita a um sítio microvascular lesado — dissemina-se simultaneamente por leitos vasculares de todo o organismo.\n' +
      '- Esgotamento de freios e microtrombose difusa:\n' +
      '  - Esse processo consome rapidamente os inibidores naturais (antitrombina e proteína C) e oclui capilares vitais com redes de fibrina e agregados plaquetários.\n' +
      '- Hipóxia celular e falência orgânica precoce:\n' +
      '  - O paciente sofre isquemia tecidual difusa, acidose lática e disfunção de múltiplos órgãos (rim, pulmão, coração, fígado e encéfalo) muito antes de exteriorizar hemorragias.\n' +
      '- Manejo individualizado guiado por fenótipo:\n' +
      '  - Exige acompanhamento longitudinal contínuo, distinguindo com precisão o fenótipo trombótico hipofibrinolítico da fase hemorrágica consumptiva.',
    leadHighlights: ['perde compartimentalização anatômica', 'freios anticoagulantes naturais', 'isquemia tecidual', 'processo contínuo'],
    pillars: [
      {
        title: 'Condição estritamente secundária',
        body:
          'Natureza secundária e eliminação do gatilho causal:\n' +
          '- Ausência de CID idiopática:\n' +
          '  - Resulta invariavelmente de tempestades inflamatórias (sepse, SIRS, pancreatite), expressão tumoral de fator tecidual (hemangiossarcoma), isquemia/reperfusão (GDV) ou dano térmico endotelial por intermação.\n' +
          '- Prioridade clínica número um:\n' +
          '  - A remoção ou controle efetivo do estímulo primário gerador de trombina é o pilar indispensável para interromper a cascata consumptiva.',
        highlights: ['secundária', 'sepse', 'hemangiossarcoma', 'controle do estímulo'],
      },
      {
        title: 'Bifurcação fenotípica fibrinolítica',
        body:
          'Divergência entre fenótipo pró-trombótico e hemorrágico:\n' +
          '- Hipofibrinólise e microtrombose séptica:\n' +
          '  - Na sepse, citocinas inflamatórias induzem superexpressão de PAI-1 e TAFI, suprimindo a fibrinólise e gerando falência multiorgânica trombótica com pouco sangramento.\n' +
          '- Hiperfibrinólise tumoral e traumática:\n' +
          '  - Em neoplasias metastáticas e politrauma grave, pode ocorrer hiperfibrinólise com lise acelerada de coágulos e hemorragias incoercíveis (Wiinberg et al., 2008; Granger et al., 2024).',
        highlights: ['PAI-1', 'hiperfibrinólise', 'Wiinberg et al., 2008'],
      },
      {
        title: 'Painel de 6 marcadores seriados',
        body:
          'Monitoramento laboratorial dinâmico e contínuo:\n' +
          '- Inexistência de teste isolado confirmatório:\n' +
          '  - A integração cinética de contagem de plaquetas, PT, aPTT, fibrinogênio, D-dímero e antitrombina revela a trajetória real do consumo hemostático.\n' +
          '- Validação do escore de overt DIC (Goggs et al., 2018):\n' +
          '  - Em estudo com 804 cães críticos, a presença de >=3 alterações hemostáticas simultâneas definiu CID manifesta e multiplicou a mortalidade em 4,84 vezes.',
        highlights: ['Goggs et al., 2018', 'overt DIC', 'trajetória dinâmica'],
      },
      {
        title: 'Conduta fenotípica sem dogmas',
        body:
          'Terapêutica intensiva individualizada e racional:\n' +
          '- Ressuscitação microvascular equilibrada:\n' +
          '  - Restauração de perfusão guiada por metas sem sobrecarga de cristaloides, prevenindo a tríade letal da UTI (hemodiluição, acidose e hipotermia).\n' +
          '- Hemocomponentes e anticoagulação orientada:\n' +
          '  - Plasma fresco congelado (FFP) e crioprecipitado indicados para sangramento ativo ou cirurgias; heparina restrita à fase pró-trombótica sem hemorragia.',
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
            'Rastreio etiológico sistemático e avaliação da perfusão:\n' +
            '- Investigação de causas primárias de alto risco:\n' +
            '  - Rastrear sepse (peritonite séptica, pneumonia, piometra), massas esplênicas/hepáticas (suspeita de hemangiossarcoma), pancreatite necrosante, GDV, insolação, politrauma ou anemia hemolítica.\n' +
            '- Avaliação hemodinâmica imediata:\n' +
            '  - Avaliar perfusão periférica, tempo de preenchimento capilar (TPC), lactato sérico seriado e estabilidade ventilatória (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed. 2024).',
        },
        {
          label: 'Hemograma completo com esfregaço sanguíneo manual',
          timing: 'Imediato (primeira hora)',
          detail:
            'Avaliação hematimétrica e citomorfológica manual:\n' +
            '- Contagem plaquetária rigorosa:\n' +
            '  - Contagem automatizada confirmada por microscopia manual; em felinos, descartar pseudotrombocitopenia por agregados plaquetários na cauda e bordas do esfregaço.\n' +
            '- Pesquisa de esquizócitos e dano mecânico:\n' +
            '  - Identificar hemácias fragmentadas por cisalhamento nas redes de fibrina intravascular (Nelson & Couto, 6ª ed.).\n' +
            '- Resposta leucocitária:\n' +
            '  - Avaliar toxicidade neutrofílica e desvio nuclear à esquerda regenerativo ou degenerativo.',
          limitations: 'Esquizócitos reforçam microangiopatia, mas não são patognomônicos (ocorrem também em hemangiossarcoma puro e glomerulopatias).',
        },
        {
          label: 'Coagulograma e marcadores de degradação da fibrina',
          timing: 'Painel inicial e seriado',
          detail:
            'Painel hemostático plasmático e marcadores de degradação:\n' +
            '- Tempos de coagulação plasmática:\n' +
            '  - Mensurar PT e aPTT (prolongam quando o consumo de fatores excede a síntese hepática; tempos normais não descartam fase precoce compensada).\n' +
            '- Fibrinogênio plasmático funcional:\n' +
            '  - Reagente de fase aguda: valores normais em paciente séptico indicam consumo concomitante acelerado; hipofibrinogenemia ocorre em 14% dos cães e 5% dos gatos (Nelson & Couto, 6ª ed.).\n' +
            '- D-dímero quantitativo:\n' +
            '  - Marcador de ativação simultânea da coagulação e degradação de fibrina reticulada.',
          reassess: 'Repetir o painel a cada 6–12 horas em pacientes críticos instáveis para detectar trajetória de consumo rápido.',
        },
        {
          label: 'Avaliação de inibidores e hemostasia viscoelástica global',
          timing: 'Quando disponível na UTI especializada',
          detail:
            'Inibidores fisiológicos e análise viscoelástica em sangue total:\n' +
            '- Dosagem funcional de antitrombina (AT):\n' +
            '  - Atividade de AT <60–70% reflete consumo massivo ou perda; confere resistência funcional à heparina.\n' +
            '- Tromboelastografia (TEG / ROTEM):\n' +
            '  - Captura interação plaqueta-fibrina em sangue total em tempo real.\n' +
            '  - R/CT longo reflete deficiência de fatores, ângulo alfa/K velocidade de formação do coágulo, MA/MCF firmeza máxima e LY30/60 hiperfibrinólise (Wiinberg et al., 2008).',
        },
        {
          label: 'Estratificação por escore veterinário validado',
          timing: 'Classificação de gravidade',
          detail:
            'Aplicação do modelo multivariado de overt DIC (Goggs et al., 2018):\n' +
            '- Critérios diagnósticos objetivos:\n' +
            '  - Presença comprovada de doença predisponente somada a >=3 de 6 alterações laboratoriais: plaquetas reduzidas, PT prolongado, aPTT prolongado, fibrinogênio diminuído, D-dímero elevado e antitrombina diminuída.\n' +
            '- Correlação prognóstica direta:\n' +
            '  - A presença de overt DIC eleva a mortalidade hospitalar para 62,5% vs 12,9% em pacientes sem overt DIC (risco relativo de 4,84).',
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
            'Eliminação cirúrgica e médica do estímulo gerador de trombina:\n' +
            '- Intervenções cirúrgicas emergenciais:\n' +
            '  - Descompressão e gastropexia no GDV; hemostasia e esplenectomia no hemangiossarcoma roto; desbridamento e drenagem na peritonite séptica.\n' +
            '- Terapêutica médica dirigida:\n' +
            '  - Antibioticoterapia intravenosa precoce de amplo espectro na sepse; resfriamento corporal ativo na intermação; suporte intensivo e analgesia na pancreatite (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed. 2024).',
        },
        {
          label: 'Ressuscitação microvascular guiada por metas',
          timing: 'Primeiras horas de internação',
          detail:
            'Otimização da perfusão microvascular e prevenção da tríade letal:\n' +
            '- Fluidoterapia balanceada orientada por objetivos:\n' +
            '  - Restaurar pressão de perfusão e débito com cristaloides balanceados titulados por metas (PAM >= 65 mmHg, lactato em queda, débito urinário >= 1–2 mL/kg/h).\n' +
            '- Prevenção da tríade letal (BSAVA ECC, 3ª ed.):\n' +
            '  - Evitar expansão excessiva que induza coagulopatia dilucional, hipotermia e acidose metabólica.\n' +
            '- Suporte vasopressor precoce:\n' +
            '  - Adicionar infusão contínua de norepinefrina precocemente se houver choque vasodilatador refratário a volume.',
        },
        {
          label: 'Suporte transfusional fenotípico',
          timing: 'Conforme clínica e defeito hemostático',
          detail:
            'Reposição de fatores, inibidores e plaquetas por metas clínicas:\n' +
            '- Plasma Fresco Congelado (FFP):\n' +
            '  - Indicado em sangramento ativo clinicamente evidente ou procedimentos cirúrgicos de urgência; repõe fatores pró-coagulantes e antitrombina consumida.\n' +
            '- Concentrado de hemácias (pRBC) e Sangue Total:\n' +
            '  - pRBC se anemia comprometer entrega de oxigênio (DO2); Sangue Total Fresco se coincidirem hemorragia profusa, anemia e plaquetopenia grave.\n' +
            '- Crioprecipitado:\n' +
            '  - Indicado na hipofibrinogenemia profunda (<100 mg/dL) com risco de sobrecarga volêmica (Plumb\'s, 10ª ed.; Fluid Therapy, 2ª ed. 2023).',
          dose: 'FFP: cães 10–15 mL/kg IV; gatos 6–10 mL/kg IV. Crioprecipitado: 1 unidade/10 kg IV.',
          reassess: 'Não transfundir FFP profilaticamente apenas para "corrigir tempos no papel" em animal sem sangramento.',
        },
        {
          label: 'Anticoagulação individualizada (apenas fase trombótica)',
          timing: 'Paciente sem sangramento e com fenótipo pró-trombótico',
          detail:
            'Terapia anticoagulante estritamente fenotípica:\n' +
            '- Indicações restritas e contraindicações:\n' +
            '  - Indicada apenas na fase inicial pró-trombótica, tromboembolismo comprovado ou TEG hipercoagulável, desde que NÃO haja sangramento ativo.\n' +
            '  - Contraindicada na fase consumptiva com hemorragia manifesta; heparina requer antitrombina viável para atuar (Ettinger, 2024; ACVECC CURATIVE, 2019).\n' +
            '- Veto de procedimento (Lumb & Jones, 2024):\n' +
            '  - NUNCA pré-incubar heparina com plasma na bolsa de transfusão.',
          dose: 'UFH: 75–100 UI/kg SC q8h (Plumb\'s) ou bolus IV 100 UI/kg seguido de CRI 20–50 UI/kg/h titulado por aPTT/anti-Xa. Enoxaparina: cão 0,8–1 mg/kg SC q6–8h; gato 0,75–1 mg/kg SC q6–12h. Dalteparina: cão 150–175 UI/kg SC q8h; gato 75–150 UI/kg SC q6h.',
          reassess: 'Monitorar por atividade anti-Xa (alvo de pico: 0,5–1,0 UI/mL coletado 3 h pós-dose em cães e 2 h em gatos) ou aPTT. Suspender imediatamente se surgir sangramento ativo.',
        },
        {
          label: 'Suporte a disfunções orgânicas secundárias',
          timing: 'Contínuo na UTI',
          detail:
            'Manejo de falências multiorgânicas associadas:\n' +
            '- Suporte ventilatório no "DIC lung":\n' +
            '  - Oxigenioterapia umidificada e ventilação mecânica protetora para alveolite hemorrágica e microtrombose septal alveolar.\n' +
            '- Monitoramento cardiovascular contínuo:\n' +
            '  - Rastreio eletrocardiográfico para arritmias ventriculares (VPCs multifocais por hipóxia e isquemia miocárdica).\n' +
            '- Vigilância renal e metabólica:\n' +
            '  - Monitoramento estrito do débito urinário e eletrólitos séricos para suporte da lesão renal aguda isquêmica (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
  },
  etiology: {
    definicaoEConceitoModerno:
      'Definição e conceito biológico contemporâneo da CID:\n' +
      '- Desregulação hemostática global e paradoxo clínico:\n' +
      '  - Síndrome adquirida e potencialmente fatal de desregulação hemostática global.\n' +
      '  - Combina simultaneamente formação descontrolada de microtrombos intravasculares e consumo progressivo de plaquetas, fibrinogênio e fatores pró-coagulantes, resultando em isquemia tecidual difusa acompanhada por sangramento espontâneo.\n' +
      '- Conceito de processo biológico contínuo (ISTH 2025):\n' +
      '  - A atualização do comitê científico da ISTH (2025) formalizou a CID como uma condição biológica contínua caracterizada por ativação sistêmica da coagulação, lesão do endotélio vascular e fibrinólise desregulada.\n' +
      '  - Progressão de uma fase precoce compensada (pre-DIC), muitas vezes clinicamente silenciosa, para disfunção orgânica de múltiplos órgãos e/ou coagulopatia consumptiva hemorrágica manifesta (overt DIC).\n' +
      '- Aplicação na medicina veterinária:\n' +
      '  - Embora pontos de corte humanos não devam ser transpostos mecanicamente sem validação, o conceito contemporâneo traduz com precisão a fisiopatologia em cães e gatos (Nelson & Couto, 6ª ed., Cap. 87; Ettinger, 9ª ed. 2024, Cap. 171).',
    figuraFisiopatologiaGeral: figura1FisiopatologiaGeral,
    mecanismosIniciais:
      'Mecanismos patológicos primários de ativação da hemostasia:\n' +
      '- Quebra do modelo celular da coagulação:\n' +
      '  - A hemostasia fisiológica opera segundo o modelo celular em três etapas coordenadas (iniciação na célula expressora de TF, amplificação na superfície plaquetária e propagação com explosão de trombina; Lumb & Jones, 2024, Cap. 31).\n' +
      '  - Na CID, três mecanismos patológicos primários rompem essa compartimentalização (BSAVA ECC, 3ª ed., Cap. 13; Textbook of Small Animal Emergency Medicine, Cap. 70):\n' +
      '- 1. Liberação maciça ou exposição intravascular de fator tecidual (TF/fator III):\n' +
      '  - Ocorre em necroses extensas, trauma grave, inflamação sistêmica, hemólise intravascular maciça e neoplasias invasivas.\n' +
      '- 2. Lesão endotelial disseminada:\n' +
      '  - Observada no choque circulatório descompensado, intermação e insolação grave (choque térmico), septicemia bacteriana, queimaduras térmicas e vasculites imunes.\n' +
      '  - O endotélio perde propriedades anticoagulantes constitutivas (trombomodulina, sulfato de heparano) e passa a expressar TF, liberar fator de von Willebrand e recrutar plaquetas.\n' +
      '- 3. Ativação enzimática direta por proteases circulantes:\n' +
      '  - Modelo clássico de liberação sistêmica de tripsina na pancreatite aguda necrosante grave, clivando diretamente a cascata.',
    imunotromboseSepse:
      'Eixo imunotrombose-sepse e ativação inflamatória desregulada:\n' +
      '- Reconhecimento molecular por PAMPs e DAMPs:\n' +
      '  - A sepse e a SIRS representam os cenários fisiopatológicos mais comuns e graves de CID.\n' +
      '  - Padrões associados a patógenos (PAMPs: LPS bacteriano, peptideoglicanos, DNA microbiano) e ao dano tecidual (DAMPs: histonas nucleares, DNA livre, HMGB1) ligam-se a receptores TLRs e NOD em monócitos, neutrófilos e células endoteliais.\n' +
      '- Tempestade de citocinas e expressão de fator tecidual:\n' +
      '  - Liberação torrencial de citocinas pró-inflamatórias (TNF-alfa, IL-1, IL-6), forçando superexpressão de fator tecidual na superfície de monócitos circulantes e células vasculares.\n' +
      '  - O complexo TF–FVIIa deflagra a geração contínua de fator Xa e trombina.\n' +
      '- Círculo vicioso por receptores PARs:\n' +
      '  - Trombina e FXa sinalizam em receptores ativados por protease (PAR-1, PAR-2 e PAR-4) expressos em leucócitos e endotélio, amplificando ainda mais a produção de citocinas inflamatórias em feedback positivo incontrolável.\n' +
      '- Papel das armadilhas extracelulares de neutrófilos (NETs):\n' +
      '  - Plaquetas ativadas expressam P-selectina ligando-se a PSGL-1 em neutrófilos e monócitos, recrutando-os para os microtrombos.\n' +
      '  - Promovem a ejeção de NETs, que servem de plataforma adicional para ancoramento de mais fibrina e ativação do fator XII (Textbook of Small Animal Emergency Medicine, Cap. 70 e 159).',
    figuraImunotromboseSepse: figura2ImunotromboseSepse,
    oncologiaHemangiossarcoma:
      'Patogênese da CID no paciente oncológico e no hemangiossarcoma:\n' +
      '- Ativação da tríade de Virchow tumoral:\n' +
      '  - Estase venosa por compressão mecânica, lesão endotelial por invasão e neovascularização anômala, e hipercoagulabilidade induzida pelo próprio tumor.\n' +
      '  - Células neoplásicas e macrófagos associados expressam constitutivamente altos níveis de TF e liberam micropartículas ricas em TF e fosfatidilserina.\n' +
      '- Prevalência em tumores sólidos (Withrow & MacEwen, 6ª ed., Cap. 5 e 34):\n' +
      '  - Cerca de 10% dos cães com neoplasias sólidas desenvolvem alterações de CID, alcançando cerca de 50% nos portadores de hemangiossarcoma (HSA) visceral (esplênico, hepático ou cardíaco), além de taxas elevadas em carcinomas inflamatórios mamários.\n' +
      '- Hemangiossarcoma (HSA) visceral e canais vasculares tortuosos:\n' +
      '  - Vascularização rudimentar revestida por células endoteliais malignas propicia contato contínuo do fluxo sanguíneo com estroma trombogênico, necrose central e trombose contínua.\n' +
      '  - Em coortes de HSA, trombocitopenia ocorre em 75% a 97% dos casos e coagulopatias compatíveis com CID em até metade dos cães admitidos com hemoabdome espontâneo.\n' +
      '- Forma crônica compensada (CID silenciosa):\n' +
      '  - Consumo lento com reposição compensatória de fatores pelo fígado, até que ruptura tumoral, choque hipovolêmico ou cirurgia precipite descompensação fulminante.',
    pancreatiteEGDV:
      'Fisiopatologia da CID em emergências gastroabdominais agudas:\n' +
      '- Pancreatite aguda canina necrosante grave:\n' +
      '  - Ativação intraglandular prematura do tripsinogênio em tripsina desencadeia autodigestão acinar, necrose peripancreática e liberação de proteases ativas na circulação portal e sistêmica.\n' +
      '  - A tripsina cliva enzimaticamente o fator X e a protrombina em trombina de forma independente de TF, além de degradar inibidores naturais como a antitrombina e ativar as vias das cininas e do complemento.\n' +
      '  - Cães com pancreatite sistêmica frequentemente desenvolvem CID oculta muito antes de manifestarem sinais hemorrágicos francos, sofrendo microtrombose mesentérica, renal e pulmonar (Canine Hepatobiliary and Exocrine Pancreatic Diseases, 2024; Textbook of Small Animal Emergency Medicine, Cap. 86).\n' +
      '- Dilatação-vólvulo gástrica (GDV):\n' +
      '  - A rotação gástrica obstrui o retorno venoso pela veia cava caudal e veia porta, gerando estase esplâncnica massiva, hipoperfusão sistêmica e isquemia da mucosa gástrica.\n' +
      '  - A perda da barreira epitelial gástrica permite translocação de endotoxinas bacterianas (LPS) para a circulação.\n' +
      '  - Na descompressão e reposicionamento cirúrgico, a lesão de isquemia-reperfusão libera espécies reativas de oxigênio (ROS), citocinas inflamatórias e TF, culminando em SIRS fulminante, endoteliopatia e consumo hemostático difuso (BSAVA Gastroenterology, 3ª ed.; Nelson & Couto, 6ª ed.).',
    particularidadesFelinas:
      'Particularidades etiológicas e clínicas da CID na espécie felina:\n' +
      '- Comportamento silencioso e baixa frequência hemorrágica:\n' +
      '  - A CID aguda fulminante e fortemente hemorrágica é um evento raro em gatos.\n' +
      '  - A maioria dos felinos afetados apresenta formas silenciosas, oligossintomáticas ou dominadas por sinais tromboembólicos e falência orgânica associada à patologia primária.\n' +
      '- Principais gatilhos causais compilados (Nelson & Couto, 6ª ed., Cap. 87):\n' +
      '  - 1. Doença hepatobiliar felina (33% dos casos): destacando-se lipidose hepática e colangio-hepatite.\n' +
      '  - 2. Neoplasias malignas (29% dos casos): notadamente linfoma mediastinal e visceral, além de carcinomas metastáticos.\n' +
      '  - 3. Doenças infecciosas graves (19% dos casos): incluindo PIF, citauxzoonose (Cytauxzoon felis), toxoplasmose sistêmica, panleucopenia e pielonefrites graves.\n' +
      '- Evidência da coorte felina (Estrin et al., 2006):\n' +
      '  - Em 46 gatos com CID, apenas 15% apresentavam sangramento espontâneo clinicamente observável à admissão hospitalar, predominando linfoma, neoplasias metastáticas, pancreatite e sepse.',
  },
  epidemiology: {
    caes:
      'Epidemiologia e distribuição etiológica na espécie canina:\n' +
      '- Perfil racial e anatômico:\n' +
      '  - Ocorre sem predisposição direta por raça ou sexo, acometendo qualquer porte.\n' +
      '  - Raças grandes e gigantes com predisposição anatômica ou neoplásica representam parcela substancial em UTI: Pastores Alemães, Golden Retrievers e Labradores (hemangiossarcoma esplênico/cardíaco); Dogue Alemão, Boxer e São Bernardo (GDV); cadelas idosas não castradas (piometra séptica com choque endotóxico).\n' +
      '- Casuística causal compilada (Couto, 1999; Nelson & Couto, 6ª ed.):\n' +
      '  - Neoplasias (18%), hepatopatias graves (14%), anemia hemolítica imunomediada — IMHA (10%), infecções sistêmicas bacterianas (10%), GDV (6%) e pancreatite aguda (4%).\n' +
      '- Particularidades infecciosas e parasitárias regionais:\n' +
      '  - Babesiose canina grave (B. rossi ou B. vogeli): endotoxemia parasitária, hemólise maciça e coagulopatia de consumo proporcional à mortalidade (Goddard et al., 2013).\n' +
      '  - Leishmaniose visceral (L. chagasi): no Brasil, induz vasculite imunomediada, imunocomplexos circulantes e CID terminal (Honse et al., 2013).\n' +
      '  - Tratamento adulticida de dirofilariose (melarsomina): embolização arterial pulmonar maciça por vermes mortos com resposta inflamatória severa (Philp, Farrell & Li, 2023).',
    gatos:
      'Epidemiologia e fatores de risco na espécie felina:\n' +
      '- Faixa etária e afecções associadas:\n' +
      '  - Acomete tipicamente felinos adultos a idosos com afecções sistêmicas graves crônicas descompensadas (linfoma, carcinomas, lipidose hepática, pancreatite felina e PIF efusiva ou não efusiva).\n' +
      '  - Jovens não vacinados com bacteremia secundária à quebra de barreira mucosal intestinal na panleucopenia felina.\n' +
      '- Subdiagnóstico clínico frequente:\n' +
      '  - Prevalência real substancialmente subestimada na rotina ambulatorial devido à manifestação hemorrágica externa mínima ou ausente.\n' +
      '  - Dificuldade técnica de colheita venosa sem artefatos em felinos hipotensos e desidratados (Estrin et al., 2006; August\'s Consultations in Feline Internal Medicine, vol. 7, Cap. 77).',
    prognosticoEEstratificacao:
      'Estratificação prognóstica e preditores de mortalidade na CID:\n' +
      '- Fatores determinantes da sobrevida:\n' +
      '  - O prognóstico depende estritamente da reversibilidade da doença causal de base, da precocidade da intervenção de suporte hemodinâmico e do grau de consumo hemostático no momento do diagnóstico.\n' +
      '- Evidência na coorte de 804 cães (Goggs, Mastrocco & Brooks, 2018):\n' +
      '  - A mortalidade hospitalar em cães sem overt DIC foi de 12,9%, saltando para 62,5% naqueles que preencheram critérios de overt DIC (risco relativo de morte de 4,84).\n' +
      '- Marcadores de gravidade extrema em cães (Nelson & Couto, 6ª ed.; Wiinberg et al., 2008):\n' +
      '  - Plaquetopenia severa (<50.000/mcL), aPTT marcadamente prolongado (>90% acima do controle) e perfil viscoelástico hipocoagulável no TEG.\n' +
      '- Letalidade documentada na espécie felina (Estrin et al., 2006):\n' +
      '  - Prognóstico historicamente grave: 43 de 46 gatos (93%) foram a óbito ou eutanásia humanitária (apenas 7% de sobrevida), com prolongamento significativo do PT nos não sobreviventes.',
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
      'Vias de transmissão e caráter nosológico da CID:\n' +
      '- Condição puramente adquirida e não contagiosa:\n' +
      '  - A coagulação intravascular disseminada é uma síndrome secundária adquirida, não sendo transmissível horizontal ou verticalmente entre animais ou para seres humanos.\n' +
      '- Transmissibilidade restrita aos agentes infecciosos primários:\n' +
      '  - Enfermidades infecciosas causais (sepse bacteriana, babesiose por carrapatos, leishmaniose por flebotomíneos ou PIF por coronavírus) possuem suas vias epidemiológicas próprias de contágio ou vetores.\n' +
      '  - A CID em si representa a via final comum da resposta hemostática e inflamatória desregulada do hospedeiro.',
  },
  pathophysiology: {
    falhaHomeostaseMicrovascular:
      'Fracasso da homeostase microvascular e colapso dos freios fisiológicos:\n' +
      '- Barreira anticoagulante natural em indivíduos hígidos:\n' +
      '  - A geração de trombina permanece estritamente confinada ao leito do trauma tecidual por três barreiras bioquímicas sistêmicas intactas.\n' +
      '  - 1. Antitrombina (AT): glicoproteína de síntese hepática que neutraliza trombina livre, FXa e outros fatores ativados.\n' +
      '  - 2. Sistema Proteína C-Proteína S: a trombina liga-se à trombomodulina endotelial e converte a proteína C em proteína C ativada (APC), degradando irreversivelmente os cofatores Va e VIIIa.\n' +
      '  - 3. Inibidor da via do fator tecidual (TFPI): bloqueia a retroalimentação do complexo TF–FVIIa–FXa (Lumb & Jones, 2024; Ettinger, 2024).\n' +
      '- Desregulação inflamatória maciça na CID:\n' +
      '  - Tempestade de citocinas (TNF-alfa, IL-1, IL-6) e endotoxinas induz expressão contínua de fator tecidual em monócitos e células endoteliais lesadas.\n' +
      '  - A produção desgovernada de trombina exaure o estoque de antitrombina por consumo direto e clivagem por elastases de neutrófilos.\n' +
      '- Desligamento dos mecanismos protetores e colapso microvascular:\n' +
      '  - O endotélio inflamado suprime a expressão de trombomodulina, abolindo a ativação protetora da proteína C.\n' +
      '  - A propagação celular com a explosão maciça de trombina (thrombin burst) torna-se descontrolada e sistêmica, colapsando a densidade capilar funcional e a extração celular de oxigênio.',
    figuraMicrocirculacaoChoque: figura4MicrocirculacaoChoque,
    fenotipoMicrotrombotico:
      'Fenótipo microtrombótico obstrutivo e supressão da fibrinólise:\n' +
      '- Inibição desregulada do sistema fibrinolítico:\n' +
      '  - O endotélio ativado e citocinas inflamatórias elevam dramaticamente o inibidor do ativador do plasminogênio tipo 1 (PAI-1) e o inibidor da fibrinólise ativado por trombina (TAFI).\n' +
      '  - O PAI-1 inibe irreversivelmente o tPA e o uPA, bloqueando a conversão de plasminogênio em plasmina ativa.\n' +
      '- Deposição intravascular persistente de fibrina:\n' +
      '  - Os depósitos microvasculares de fibrina tornam-se densos, insolúveis e permanentes na microcirculação.\n' +
      '  - A patologia consolida uma síndrome microtrombótica devastadora com oclusão capilar difusa.\n' +
      '- Lesão isquêmica em órgãos-alvo críticos:\n' +
      '  - Isquemia renal glomerular e necrose tubular aguda (injúria renal aguda — LRA).\n' +
      '  - Necrose centrolobular hepática e infartos miocárdicos focais por microtrombose de arteríolas coronárias.\n' +
      '  - Síndrome do pulmão da CID (DIC lung): intensa microtrombose nos capilares septais alveolares associada a hemorragia intrapulmonar, aumento do espaço morto ventilatório, incompatibilidade ventilação-perfusão (V/Q mismatch) e hipoxemia refratária (Nelson & Couto, 6ª ed., p. 1403).',
    figuraMicrotrombosPulmonares: figura3MicrotrombosPulmonares,
    figuraPotencialHemostaticoSepse: figura6PotencialHemostaticoSepse,
    fenotipoHiperfibrinolitico:
      'Fenótipo hiperfibrinolítico e colapso consumptivo (overt DIC):\n' +
      '- Liberação tumoral ou traumática de ativadores do plasminogênio:\n' +
      '  - Em determinados carcinomas metastáticos, leucemias ou politraumatismos graves, as células liberam grandes volumes de uPA e tPA.\n' +
      '  - Deflagra-se geração descontrolada de plasmina, que decompõe o fibrinogênio sérico (fibrinogenólise primária) e dissolve precocemente qualquer coágulo antes de sua estabilização (Granger et al., 2024).\n' +
      '- Efeito anticoagulante endógeno dos produtos de degradação:\n' +
      '  - Produtos de degradação da fibrina e do fibrinogênio (FDPs) acumulam-se em concentrações massivas.\n' +
      '  - Os FDPs competem pelos sítios de ancoramento da trombina e do fibrinogênio e recobrem a superfície das plaquetas, funcionando como anticoagulantes endógenos que paralisam a agregação plaquetária e a polimerização da fibrina.\n' +
      '- Instalação da coagulopatia consumptiva manifesta:\n' +
      '  - Esgotamento acelerado dos fatores lábeis (V e VIII), da protrombina e do fibrinogênio, superando a taxa sintética hepática.\n' +
      '  - Depleção plaquetária severa abaixo do limiar hemostático mínimo (<30.000–50.000/mcL).\n' +
      '  - O paciente atinge a fase hipocoagulável consumptiva descompensada (overt DIC), cursando com diátese hemorrágica multifocal em pele, mucosas e cavidades corpóreas.',
  },
  clinicalSignsPathophysiology: [
    {
      system: 'general',
      findings: [
        {
          finding: 'Letargia extrema, fraqueza muscular generalizada, prostração e colapso circulatório',
          mechanism:
            'Mecanismo fisiopatológico da prostração e hipoperfusão sistêmica:\n' +
            '- Oclusão difusa da microcirculação por microtrombos de fibrina e agregados plaquetários, reduzindo o transporte de oxigênio tecidual (DO2).\n' +
            '- Hipóxia celular profunda com desvio para glicólise anaeróbia, produção acelerada de lactato e esgotamento do ATP intracelular.',
          clinicalMeaning: 'Manifestação frequente em animais sépticos ou em choque; a gravidade reflete a extensão da hipoperfusão microvascular sistêmica.',
          priority: 'common',
        },
        {
          finding: 'Hipotermia em gatos e cães graves, ou febre persistente na sepse',
          mechanism:
            'Mecanismos de desregulação térmica central e periférica:\n' +
            '- Falência vasomotora e perda da perfusão periférica no choque descompensado prejudicam a termorregulação central (especialmente em felinos, cuja tríade hipotermia-hipotensão-bradicardia sinaliza colapso iminente).\n' +
            '- Liberação de citocinas pirogênicas (IL-1, TNF-alfa) eleva o ponto de ajuste hipotalâmico nas fases iniciais e hiperdinâmicas da sepse canina.',
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
            'Mecanismo da síndrome do pulmão da CID (DIC lung):\n' +
            '- Microtrombose nos capilares septais alveolares e arteríolas pulmonares impede a perfusão de alvéolos ventilados, elevando o espaço morto alveolar e gerando grave incompatibilidade ventilação-perfusão (V/Q mismatch).\n' +
            '- Lesão endotelial inflamatória e aumento da permeabilidade capilar promovem extravasamento de plasma e hemácias para o interstício e lúmen alveolar (Nelson & Couto, 6ª ed.).',
          clinicalMeaning: 'Muitos cães e gatos com CID não falecem por sangramento externo, mas por disfunção pulmonar aguda refratária e hipoxemia hipóxica.',
          priority: 'emergency',
          context: ['Pulmão da CID (DIC lung)', 'Insuficiência respiratória'],
        },
        {
          finding: 'Tosse com escarro hemoptóico ou presença de fluido sanguinolento em cânula endotraqueal',
          mechanism:
            'Mecanismo de micro-hemorragia alveolar e inundação das vias aéreas:\n' +
            '- Microtrombose septal associada a congestão capilar retrógrada e coagulopatia consumptiva rompe a integridade da barreira alvéolo-capilar.\n' +
            '- Extravasamento hemorrágico difuso inunda os espaços aéreos inferiores gerando secreção traqueal sanguinolenta.',
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
            'Mecanismo do colapso pressórico hemodinâmico:\n' +
            '- Perda do tônus vasomotor mediada por óxido nítrico e citocinas inflamatórias, somada à perda de volume intravascular por extravasamento capilar difuso.\n' +
            '- Microtrombos obstrutivos em leitos vasculares periféricos reduzem pré-carga e complacência efetiva, colapsando a pressão arterial média.',
          clinicalMeaning: 'Indica choque distributivo e/ou hipovolêmico; exige ressuscitação volêmica imediata titulada e monitoramento contínuo da pressão arterial.',
          priority: 'emergency',
        },
        {
          finding: 'Arritmias ventriculares, incluindo complexos ventriculares prematuros (VPCs) multifocais e taquicardia ventricular paroxística',
          mechanism:
            'Mecanismo eletrofisiológico da arritmogênese miocárdica:\n' +
            '- Microtrombose em arteríolas coronárias intramiocárdicas induz isquemia focal, hipóxia e acidose celular localizada.\n' +
            '- Heterogeneidade na condução elétrica entre miócitos e fibras de Purkinje desencadeia focos ectópicos automáticos e circuitos de reentrada (Nelson & Couto, 6ª ed., p. 1402).',
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
            'Mecanismo misto de falha primária e secundária da hemostasia:\n' +
            '- Petéquias puntiformes decorrem da hemostasia primária defeituosa por trombocitopenia consumptiva acentuada e disfunção plaquetária induzida por FDPs.\n' +
            '- Equimoses, sufusões e hematomas refletem consumo difuso de fatores plasmáticos da coagulação e aumento da fragilidade microvascular por dano endotelial.',
          clinicalMeaning: 'Padrão hemostático misto (primário + secundário) altamente sugestivo de CID overt descompensada.',
          priority: 'common',
        },
        {
          finding: 'Sangramento contínuo em locais de venopunção, inserção de cateteres intravenosos ou incisões cirúrgicas recentes',
          mechanism:
            'Falha de estabilização do tampão hemostático superficial:\n' +
            '- A fibrina recém-formada é degradada aceleradamente pela plasmina ou não chega a ser polimerizada adequadamente devido à deficiência de fibrinogênio e excesso de FDPs circulantes.\n' +
            '- Impossibilidade de formar coágulo estável e hemostasia mecânica definitiva.',
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
            'Mecanismo da lesão renal aguda isquêmica na CID:\n' +
            '- Capilares glomerulares e vasculatura peritubular são leitos de alto fluxo e baixa resistência, retendo avidamente redes de fibrina e microtrombos plaquetários.\n' +
            '- A oclusão glomerular abrupta corta a taxa de filtração glomerular (TFG), enquanto a isquemia hipóxica das células tubulares deflagra necrose tubular aguda (Ettinger, 9ª ed. 2024).',
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
            'Tríplice mecanismo patológico da disfunção hepatobiliar:\n' +
            '- 1. Isquemia hepatocelular por microtrombos nos sinusóides hepáticos, resultando em necrose centrolobular e liberação de transaminases.\n' +
            '- 2. Colestase intra-hepática da sepse: endotoxinas e citocinas inibem transportadores canaliculares de ácidos biliares e bilirrubina (Bsep e Mrp2).\n' +
            '- 3. Sobrecarga de bilirrubina não conjugada decorrente de hemólise microangiopática acelerada por cisalhamento de hemácias.',
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
            'Mecanismos de disfunção neurológica isquêmica e hemorrágica:\n' +
            '- Isquemia focal encefálica secundária a microtrombos em artérias perfurantes e capilares corticais cerebrais.\n' +
            '- Micro-hemorragias petequiais no parênquima nervoso decorrentes do consumo hemostático avançado e perda da integridade vascular.',
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
            'Mecanismo de cisalhamento mecânico e hemólise microangiopática:\n' +
            '- A rede intravascular disseminada de fibrina atua como malha de corte mecânico na luz capilar.\n' +
            '- Eritrócitos impulsionados em alta velocidade colidem contra filamentos de fibrina, fragmentando-se em esquizócitos (células em capacete ou triangulares).\n' +
            '- Ocorre hemólise intravascular acelerada com consumo simultâneo de plaquetas e anemia progressiva (Nelson & Couto, 6ª ed., pp. 1401–1402).',
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
        'Triagem etiológica e avaliação de patologias de alto risco:\n' +
        '- Caráter estritamente secundário da síndrome:\n' +
        '  - A CID nunca é uma patologia primária isolada; a suspeita clínica nasce obrigatoriamente do reconhecimento de patologias de alto risco.\n' +
        '- Principais afecções sistêmicas deflagradoras:\n' +
        '  - Sepse bacteriana, peritonite séptica e piometra.\n' +
        '  - Pancreatite aguda necrosante grave e dilatação-vólvulo gástrica (GDV).\n' +
        '  - Neoplasias vasculares e viscerais (hemangiossarcoma esplênico ou hepático).\n' +
        '  - Intermação térmica e insolação grave, politraumatismos, acidentes ofídicos ou anemia hemolítica imunomediada (IMHA).\n' +
        '- Avaliação clínica imediata:\n' +
        '  - Investigar padrão respiratório, estabilidade hemodinâmica e estigmas hemorrágicos (Nelson & Couto, 6ª ed.; Textbook of Small Animal Emergency Medicine, Cap. 70).',
      interpretation:
        'Raciocínio diagnóstico diferencial inicial:\n' +
        '- Sem comprovação de gatilho inflamatório, infeccioso, neoplásico ou isquêmico sistêmico, o diagnóstico de CID deve ser questionado em favor de coagulopatias primárias (intoxicação por rodenticidas, PTI primária ou deficiências hereditárias).',
      limitations:
        'Armadilha da ausência de sangramento visível:\n' +
        '- A ausência de sinais clássicos de hemorragia externa não afasta CID: na sepse sistêmica, a maioria dos cães e gatos morre por microtrombose e falência de órgãos sem manifestar sangramentos macroscópicos visíveis.',
    },
    {
      stepNumber: 2,
      title: 'Hemograma completo com avaliação minuciosa do esfregaço sanguíneo em lâmina',
      purpose: 'Quantificar plaquetas, pesquisar esquizócitos da microangiopatia e descartar artefatos laboratoriais.',
      description:
        'Protocolo de avaliação hematológica e citológica minuciosa:\n' +
        '- Confirmação manual da contagem de plaquetas:\n' +
        '  - Realizar contagem automatizada sempre validada por contagem manual em lâmina corada (multiplicando a média de plaquetas em 10 campos de imersão de 100x por 15.000–20.000).\n' +
        '- Triagem de artefatos plaquetários felinos:\n' +
        '  - Em felinos, examinar sistematicamente a borda terminal (cauda) e margens do esfregaço para descartar pseudotrombocitopenia induzida por agregados plaquetários in vitro.\n' +
        '- Pesquisa sistemática de esquizócitos:\n' +
        '  - Identificar hemácias fragmentadas em capacete, triângulo ou vírgula decorrentes do cisalhamento eritrocitário contra filamentos intravasculares de fibrina (Nelson & Couto, 6ª ed., pp. 1401–1402).\n' +
        '- Análise da resposta inflamatória leucocitária:\n' +
        '  - Avaliar presença de neutrofilia com desvio à esquerda regenerativo ou degenerativo e granulações tóxicas de sepse.',
      interpretation:
        'Significado clínico das alterações hematológicas:\n' +
        '- Trombocitopenia ocorre em cerca de 90% dos cães e 57% dos gatos com CID overt (Nelson & Couto, 6ª ed.).\n' +
        '- A associação de trombocitopenia progressiva e esquizócitos em paciente crítico eleva dramaticamente o índice de suspeita de microangiopatia trombótica e CID ativa.',
      limitations:
        'Limitações e especificidade dos esquizócitos:\n' +
        '- Esquizócitos não são exclusivos de CID: ocorrem em hemangiossarcomas mesmo sem consumo sistêmico descompensado, glomerulonefrites graves, endocardites e cardiopatias com turbulência de alto fluxo.',
    },
    {
      stepNumber: 3,
      title: 'Tempos de coagulação plasmática: Tempo de Protrombina (PT) e Tempo de Tromboplastina Parcial Ativada (aPTT)',
      purpose: 'Avaliar a integridade funcional das vias extrínseca, intrínseca e comum da coagulação.',
      description:
        'Mensuração da integridade das vias plasmáticas da coagulação:\n' +
        '- Vias avaliadas por cada ensaio:\n' +
        '  - Tempo de Protrombina (PT): mensura a via extrínseca e a via comum (fatores VII, X, V, protrombina e fibrinogênio).\n' +
        '  - Tempo de Tromboplastina Parcial Ativada (aPTT): mensura a via intrínseca e a via comum (fatores XII, XI, IX, VIII, X, V, protrombina e fibrinogênio).\n' +
        '- Esgotamento funcional de fatores de coagulação:\n' +
        '  - O consumo contínuo e a degradação de zimogênios plasmáticos esgotam seus níveis circulantes, prolongando o tempo para geração do coágulo in vitro.\n' +
        '- Padronização pré-analítica mandatória:\n' +
        '  - Punção venosa limpa e atraumática, respeitando a proporção rigorosa de 9 partes de sangue total para 1 parte de citrato trissódico a 3,2% (Ettinger, 9ª ed. 2024, Cap. 170).',
      interpretation:
        'Interpretação clínica e evidências epidemiológicas dos tempos de coagulação:\n' +
        '- Prolongamento significativo: PT >25–30% e aPTT >25–50% acima dos controles laboratoriais refletem consumo avançado de fatores hemostáticos.\n' +
        '- Casuística histórica canina e felina (Couto, 1999):\n' +
        '  - O aPTT prolongou-se em 88% dos cães e 100% dos gatos com CID confirmada.\n' +
        '  - O PT esteve prolongado em 42% dos cães e 71% dos gatos afetados.\n' +
        '- Fator prognóstico felino (Estrin et al., 2006):\n' +
        '  - Em coorte de 46 gatos, o prolongamento do PT mediano associou-se significativamente ao óbito.',
      limitations:
        'ARMADILHA CLÍNICA CRUCIAL:\n' +
        '- PT e aPTT normais NÃO excluem CID na fase precoce ou compensada.\n' +
        '- Ensaios realizados em plasma pobre em plaquetas sem endotélio ou fluxo laminar; apenas prolongam quando a atividade funcional dos fatores cai abaixo de 30–40% do normal.',
    },
    {
      stepNumber: 4,
      title: 'Fibrinogênio plasmático: interpretação no contexto de fase aguda',
      purpose: 'Detectar hipofibrinogenemia consumptiva ou identificar consumo mascarado.',
      description:
        'Interpretação da cinética do fibrinogênio no paciente inflamatório:\n' +
        '- Papel bioquímico do fibrinogênio (Fator I):\n' +
        '  - Substrato hemostático terminal clivado pela trombina para gerar a malha insolúvel de fibrina.\n' +
        '- Comportamento dual como proteína de fase aguda:\n' +
        '  - Em coagulopatias puramente consumptivas, os níveis plasmáticos despencam.\n' +
        '  - Porém, o fibrinogênio é fortemente induzido por IL-6 e mediadores hepáticos de fase aguda na sepse e pancreatite grave (Nelson & Couto, 6ª ed.; Canine Hepatobiliary Diseases, 2024).',
      interpretation:
        'Interpretação dos níveis plasmáticos e prevalência observada:\n' +
        '- Hipofibrinogenemia consumptiva manifesta:\n' +
        '  - Níveis <100–150 mg/dL em cães e <100 mg/dL em gatos indicam consumo acelerado ou hiperfibrinólise fulminante que superou a capacidade sintética do fígado.\n' +
        '- Falso conforto por valores normais ou elevados:\n' +
        '  - Concentrações normais ou aumentadas (ex.: 400–600 mg/dL) na sepse ou piometra NÃO descartam consumo ativo: síntese de fase aguda e destruição acelerada ocorrem concomitantemente.\n' +
        '- Baixa sensibilidade isolada na rotina (Nelson & Couto, 6ª ed.):\n' +
        '  - Hipofibrinogenemia esteve presente em apenas 14% dos cães e 5% dos gatos com CID overt confirmada.',
      limitations:
        'ARMADILHA DIAGNÓSTICA:\n' +
        '- Exigir fibrinogênio baixo como critério obrigatório para reconhecer CID é um grave erro da rotina clínica e retarda o diagnóstico de pacientes críticos dentro da janela terapêutica precoce.',
    },
    {
      stepNumber: 5,
      title: 'Marcadores de fibrinólise e renovação de fibrina: D-dímero e Produtos de Degradação da Fibrina (FDP)',
      purpose: 'Comprovar a geração intravascular e posterior degradação de fibrina estabilizada por ligações cruzadas.',
      description:
        'Cinética e significado bioquímico de FDPs e D-dímero:\n' +
        '- Produtos de degradação da fibrina e fibrinogênio (FDPs):\n' +
        '  - Formados pela clivagem inespecífica de fibrinogênio solúvel e de fibrina não estabilizada pela plasmina.\n' +
        '- Especificidade bioquímica do D-dímero:\n' +
        '  - Marcador estrito de fibrinólise secundária, exigindo três eventos bioquímicos prévios:\n' +
        '  - 1. Clivagem do fibrinogênio em fibrina pela trombina;\n' +
        '  - 2. Formação de ligações cruzadas covalentes entre domínios D pelo fator XIIIa ativado;\n' +
        '  - 3. Degradação subsequente dessa rede insolúvel pela plasmina (Textbook of Small Animal Emergency Medicine, Cap. 68; BSAVA ECC, 3ª ed.).',
      interpretation:
        'Validação clínica e estudos de acurácia diagnóstica em cães e gatos:\n' +
        '- Desempenho quantitativo em cães (Stokol et al., 2000):\n' +
        '  - Testes quantitativos de D-dímero demonstraram sensibilidade de 85% a 100% e especificidade de 90% a 100% em comparação a cães sadios controle.\n' +
        '- Armadilha na emergência canina real (Griffin et al., 2003):\n' +
        '  - Embora 100% dos cães com CID fossem positivos para D-dímero, 83% (15 de 18 cães) com hemorragias agudas simples sem CID também foram positivos.\n' +
        '- Desempenho limitado na espécie felina (Tholen et al., 2009):\n' +
        '  - Em gatos doentes, o D-dímero apresentou sensibilidade de 67%, especificidade de 56%, valor preditivo positivo (VPP) de 33% e valor preditivo negativo (VPN) de 83%.',
      limitations:
        'Especificidade e diagnósticos diferenciais do D-dímero:\n' +
        '- D-dímero positivo indica apenas taxa de renovação e degradação de fibrina reticulada: eleva-se em tromboembolismo pulmonar, hematomas extensos, cirurgias recentes, neoplasias, PLN e insuficiência hepática.\n' +
        '- D-dímero normal em gatos não exclui CID de maneira confiável.',
    },
    {
      stepNumber: 6,
      title: 'Dosagem de inibidores naturais da coagulação: Antitrombina (AT) e Proteína C',
      purpose: 'Avaliar o esgotamento dos principais freios fisiológicos da cascata e prever resistência à heparina.',
      description:
        'Avaliação dos freios fisiológicos da coagulação:\n' +
        '- Papel da Antitrombina (AT):\n' +
        '  - Principal inibidor plasmático endógeno, responsável por neutralizar mais de 80% da trombina livre e do fator Xa circulantes.\n' +
        '  - Mensurada quantitativamente por ensaios cromogênicos funcionais automatizados.\n' +
        '- Papel da Proteína C e Proteína S:\n' +
        '  - O complexo trombina-trombomodulina ativa a proteína C, que inativa os cofatores ativados Va e VIIIa.\n' +
        '- Esgotamento na inflamação sistêmica e sepse:\n' +
        '  - Atividade de AT e proteína C decai por consumo maciço na inativação de proteases, clivagem por elastases e redução da síntese hepática (Ettinger, 9ª ed. 2024; Lumb & Jones, 2024).',
      interpretation:
        'Significado prognóstico e impacto farmacológico dos inibidores naturais:\n' +
        '- Marcador de consumo acelerado e gravidade:\n' +
        '  - Queda da atividade de antitrombina para níveis <60–70% é marcador altamente fidedigno de perda do freio hemostático fisiológico.\n' +
        '- Evidência prognóstica na babesiose canina (Goddard et al., 2013):\n' +
        '  - Em 72 cães com infecção por Babesia rossi, não sobreviventes exibiram atividade de proteína C significativamente menor e D-dímero mais elevado do que os sobreviventes.\n' +
        '- Resistência farmacológica funcional às heparinas:\n' +
        '  - Como a heparina depende da ligação com a antitrombina para seu efeito anticoagulante, pacientes com AT severamente consumida apresentam falha de resposta terapêutica.',
      limitations:
        'Causas não relacionadas a CID de redução de antitrombina:\n' +
        '- Redução de antitrombina ocorre também por perda renal em glomerulopatias perdedoras de proteína (PLN), perda entérica em enteropatias (PLE) ou insuficiência de síntese em hepatopatias crônicas descompensadas.',
    },
    {
      stepNumber: 7,
      title: 'Tromboelastografia (TEG) e Tromboelastometria Rotacional (ROTEM): fenotipagem viscoelástica global',
      purpose: 'Avaliar a cinética global da coagulação em sangue total, desde a iniciação até a firmeza máxima e lise do coágulo.',
      description:
        'Avaliação viscoelástica em sangue total sob temperatura controlada:\n' +
        '- Princípio funcional dos métodos viscoelásticos (TEG / ROTEM):\n' +
        '  - Diferente dos testes plasmáticos clássicos, avaliam a hemostasia celular dinâmica em sangue total, integrando plaquetas, hemácias, fibrinogênio e fibrinólise em tempo real.\n' +
        '- Parâmetros cinéticos quantificados:\n' +
        '  - Tempo de reação até os primeiros filamentos de fibrina (R ou CT).\n' +
        '  - Cinética e velocidade de formação da rede de coágulo (K/CFT e ângulo alfa).\n' +
        '  - Força mecânica máxima do coágulo (MA ou MCF, dependente em 80% das plaquetas e 20% do fibrinogênio).\n' +
        '  - Taxa de lise do coágulo aos 30 e 60 minutos (LY30, LY60 ou ML) para diagnóstico preciso de hiperfibrinólise (BSAVA ECC, 3ª ed., Cap. 13; Wiinberg et al., 2008).',
      interpretation:
        'ESTUDO PIVOTAL DE WIINBERG ET AL. (2008) E FENOTIPAGEM INDIVIDUAL:\n' +
        '- Heterogeneidade do perfil viscoelástico em 50 cães com CID:\n' +
        '  - Desmistificou a premissa de que a CID manifesta-se exclusivamente por hipocoagulação.\n' +
        '  - Coexistiram traçados hipercoaguláveis (R encurtado e MA elevado, comuns nas fases precoces de sepse) e hipocoaguláveis (R prolongado e MA deprimido).\n' +
        '- Implicações prognósticas do perfil viscoelástico:\n' +
        '  - Pacientes com traçado TEG hipocoagulável exibiram sobrevida significativamente pior e risco de óbito aumentado.\n' +
        '  - A fenotipagem viscoelástica permite intervenção hemostática guiada pela fisiopatologia real do paciente.',
      limitations:
        'Exigências técnicas e particularidades da espécie felina:\n' +
        '- Exige equipamento especializado, calibração rigorosa e sensibilidade extrema a traumas de venopunção.\n' +
        '- August\'s Consultations in Feline Internal Medicine (vol. 7) alerta que a forte retração do coágulo por plaquetas felinas pode mimetizar falso padrão de hiperfibrinólise.',
    },
    {
      stepNumber: 8,
      title: 'Escores diagnósticos objetivos validados na espécie canina',
      purpose: 'Padronizar critérios laboratoriais para fechar o diagnóstico sindrômico e estratificar o risco de óbito.',
      description:
        'Modelos multivariados objetivos validados para cães em UTI:\n' +
        '- 1. Modelo de Wiinberg et al. (2010):\n' +
        '  - Desenvolvido e validado prospectivamente em cães críticos com base na combinação ponderada de aPTT, PT, D-dímero e fibrinogênio.\n' +
        '  - Apresentou sensibilidade de 83,3% e especificidade de 77,3% na validação de coorte independente.\n' +
        '- 2. Sistema de Overt DIC de Goggs, Mastrocco & Brooks (2018):\n' +
        '  - Validado em 804 cães com doenças sistêmicas de alto risco.\n' +
        '  - Critérios: doença causal predisponente somada a ≥3 de 6 parâmetros alterados em relação aos valores de referência do laboratório hospitalar (plaquetopenia, PT prolongado, aPTT prolongado, hipofibrinogenemia, D-dímero elevado e antitrombina diminuída).\n' +
        '  - Acurácia: prediz mortalidade com sensibilidade de 72,7% e especificidade de 80,9% (mortalidade de 62,5% nos cães com overt DIC vs. 12,9% sem overt DIC; RR 4,84).',
      interpretation:
        'Aplicação clínica e dinâmica temporal dos escores:\n' +
        '- O escore não é uma medida estática: quanto maior o número de parâmetros simultaneamente comprometidos, maior a magnitude do colapso microvascular e a urgência terapêutica.',
      limitations:
        'Variação entre métodos e intervalos laboratoriais:\n' +
        '- Intervalos de referência e reagentes variam substancialmente entre marcas e analisadores; pontos de corte de estudos estrangeiros exigem adaptação aos limites laboratoriais da própria instituição veterinária.',
      isGoldStandard: true,
    },
    {
      stepNumber: 9,
      title: 'Diagnósticos diferenciais de coagulopatias e mimetizadores na UTI',
      purpose: 'Excluir intoxicações, trombocitopenias isoladas e alterações iatrogênicas de manejo hospitalar.',
      description:
        'Diferenciar a CID de afecções comuns com achados laboratoriais que se sobrepõem:\n\n- Intoxicação por rodenticidas anticoagulantes (antagonistas da vitamina K): o PT prolonga-se precocemente devido à meia-vida curta do fator VII (6–8 h), seguido de aPTT; no entanto, plaquetas, fibrinogênio, antitrombina e D-dímero permanecem estritamente normais até que hemorragia cavitária grave ocorra.\n- Trombocitopenia imunomediada (PTI primária): contagem de plaquetas severamente diminuída (<20.000–30.000/µL), mas PT, aPTT e fibrinogênio são normais e o D-dímero é normal ou discretamente elevado sem falência de múltiplos órgãos.\n- Coagulopatia dilucional da ressuscitação agressiva: infusão rápida de grandes volumes de cristaloides e concentrado de hemácias sem plasma dilui preferencialmente o fibrinogênio (o primeiro a atingir níveis críticos), prolongando PT e aPTT e deprimindo a contagem plaquetária em pacientes traumatizados ou hemorrágicos (BSAVA ECC, Cap. 13, p. 227).\n- Insuficiência hepática aguda terminal: síntese reduzida tanto de fatores pró-coagulantes quanto de anticoagulantes naturais (equilíbrio hemostático rebalanceado), com plaquetas normais ou moderadamente baixas e D-dímero variável.\n- Coagulopatias hereditárias (Hemofilia A e B): aPTT isoladamente prolongado com PT, plaquetas, fibrinogênio e D-dímero normais em animais jovens do sexo masculino.',
      interpretation:
        'Síntese diagnóstica multissistêmica:\n' +
        '- A comprovação de ativação hemostática sistêmica em múltiplos compartimentos (queda plaquetária progressiva + tempos prolongados + D-dímero elevado + esquizócitos + antitrombina depletada) em paciente com doença inflamatória ou neoplásica grave confirma o diagnóstico sindrômico de CID perante os seus diagnósticos diferenciais.',
      limitations:
        'Sobreposição de distúrbios na UTI cirúrgica e traumatológica:\n' +
        '- Na emergência crítica, a coagulopatia dilucional, a hipotermia acidental e a acidose metabólica formam a "tríade letal" que amplifica sinergicamente o consumo hemostático da CID.',
    },
  ],
  treatment: {
    metaPrimaria:
      'Remoção, erradicação ou controle imediato da causa primária subjacente:\n' +
      '- Princípio curativo primordial:\n' +
      '  - A remoção ou neutralização da causa primária subjacente é o pilar terapêutico número um e a única conduta verdadeiramente curativa para a CID.\n' +
      '  - Enquanto o foco infeccioso, o tecido neoplásico ou a necrose continuarem liberando fator tecidual (TF) e citocinas na circulação, a geração de trombina persistirá descontrolada e qualquer hemocomponente ou medicamento infundido será consumido em poucas horas.\n' +
      '- Intervenções mandatórias por etiologia desencadeante:\n' +
      '  - Sepse abdominal (peritonite séptica, ruptura de alça intestinal, piometra): estabilização hemodinâmica breve com cristaloides e início imediato de antibioticoterapia intravenosa de amplo espectro nas primeiras horas, seguida de laparotomia exploratória de urgência, lavagem peritoneal exaustiva, desbridamento e drenagem ou ovariossalpingohisterectomia.\n' +
      '  - Dilatação-vólvulo gástrica (GDV): descompressão gástrica percutânea ou por sonda orogástrica imediata, fluidoterapia de choque e gastropexia cirúrgica após estabilização volêmica.\n' +
      '  - Hemoabdome por hemangiossarcoma ou massa esplênica rota: estabilização volêmica agressiva com concentrado de hemácias/plasma e esplenectomia de emergência para estancar a hemorragia e remover a massa geradora de TF.\n' +
      '  - Intermação e insolação grave (estresse térmico): resfriamento corporal ativo e controlado até 39,2 °C com água morna/corrente de ar (evitando água gelada que cause vasoconstrição periférica reflexa e tremores) e manejo intensivo da endoteliopatia térmica.\n' +
      '  - Pancreatite aguda grave: controle álgico multimodal com opioides contínuos (fentanil, metadona), antiemese (maropitant, ondansetrona), nutrição enteral precoce e perfusão mesentérica.\n' +
      '  - Babesiose canina grave: terapia antiprotozoária específica com dipropionato de imidocarb (6,6 mg/kg IM repetido em 14 dias para B. canis/vogeli) ou atovaquona associada a azitromicina para B. gibsoni (Nelson & Couto, 6ª ed.; Ettinger, 9ª ed. 2024; Goddard et al., 2013).',
    suporteHemodinamico:
      'Preservação da perfusão microvascular e metas de ressuscitação:\n' +
      '- Fundamentação fisiopatológica:\n' +
      '  - A manutenção da perfusão microvascular é essencial para interromper os ciclos viciosos de hipóxia celular, acidose lática e lesão endotelial contínua.\n' +
      '  - A hipoperfusão microvascular favorece estase sanguínea e acentua a deposição obstrutiva de trombos de fibrina.\n' +
      '- Metas microvasculares de ressuscitação na UTI:\n' +
      '  - Ressuscitação com cristaloides balanceados (Ringer com lactato ou Plasma-Lyte) estritamente titulada por objetivos clínicos e laboratoriais claros.\n' +
      '  - Alvos: pressão arterial média (PAM ≥65 mmHg), normalização da frequência cardíaca, clareamento sustentado do lactato sérico seriado, temperatura periférica das patas e débito urinário ≥1 a 2 mL/kg/h.\n' +
      '- Alerta contra sobrecarga volêmica (BSAVA ECC, 3ª ed.):\n' +
      '  - Evitar hiper-hidratação baseada em fórmulas teóricas rígidas.\n' +
      '  - A sobrecarga de cristaloides provoca hemodiluição pronunciada, diluindo precocemente o fibrinogênio sérico, as plaquetas e os fatores de coagulação, além de agravar o edema pulmonar no "DIC lung" e aumentar a permeabilidade vascular sistêmica.\n' +
      '- Suporte vasopressor precoce:\n' +
      '  - Se a hipotensão persistir após restauração adequada da volemia intravascular (avaliada por parâmetros dinâmicos e POCUS vascular), instituir imediatamente norepinefrina em infusão contínua (CRI) na dose de 0,1 a 1,5 µg/kg/min IV, restabelecendo a resistência vascular sistêmica sem hiperidratação volêmica (BSAVA ECC, 3ª ed.; Fluid Therapy in Dogs and Cats, 2ª ed. 2023).',
    terapiaTransfusional:
      'Terapia transfusional restritiva, individualizada e guiada por fenótipo hemostático:\n' +
      '- Princípio fundamental:\n' +
      '  - A hemoterapia na CID deve ser restritiva, individualizada e guiada estritamente pelo fenótipo clínico e laboratorial do paciente, jamais por metas cosméticas de normalização numérica do coagulograma.\n' +
      '- Plasma Fresco Congelado (FFP):\n' +
      '  - Conteúdo biológico: fornece todos os fatores pró-coagulantes lábeis e estáveis da hemostasia (fibrinogênio, fatores II, V, VII, VIII, IX, X, XI, XII, XIII) e repõe os inibidores naturais consumidos (especialmente antitrombina e proteína C).\n' +
      '  - Dose preconizada: 10 a 15 mL/kg IV lenta em cães e 6 a 10 mL/kg IV lenta em gatos (Fluid Therapy in Dogs and Cats, 2ª ed. 2023; Ettinger, 9ª ed. 2024).\n' +
      '  - Desmistificação do mito de "lenha na fogueira": o antigo ensino de que infundir plasma na CID seria "adicionar lenha à fogueira" (por fornecer substrato para novos trombos) é formalmente rejeitado por Nelson & Couto (6ª ed., p. 1403) e pelas diretrizes modernas. O FFP fornece tanto fatores quanto seus freios fisiológicos naturais (especialmente AT). No entanto, a transfusão profilática em pacientes sem sangramento não altera o desfecho clínico nem a mortalidade. Indicado exclusivamente na presença de hemorragia ativa clinicamente significativa com coagulopatia documentada, ou antes de cirurgias hemostáticas indispensáveis.\n' +
      '- Concentrado de Hemácias (pRBC):\n' +
      '  - Indicado quando a perda sanguínea ou a hemólise microangiopática reduz o hematócrito abaixo de 20–25% em cães ou 15–18% em gatos com sinais de hipóxia tecidual (taquicardia persistente, hiperlactatemia, prostração grave).\n' +
      '  - Fórmula de cálculo da dose: volume (mL) = peso (kg) × 80 (cão) ou 60 (gato) × [(Ht desejado – Ht atual) / Ht da bolsa].\n' +
      '- Sangue Total Fresco (FWB):\n' +
      '  - Melhor alternativa quando concentrados de plaquetas não estão disponíveis e o paciente apresenta simultaneamente anemia hipóxica, trombocitopenia acentuada e hemorragia volumosa ativa.\n' +
      '  - Dose: 15–20 mL/kg IV lenta. Fornece hemácias, volume plasmático com fatores e plaquetas viáveis se transfundido imediatamente após a colheita (Textbook of Small Animal Emergency Medicine, Cap. 70).\n' +
      '- Crioprecipitado:\n' +
      '  - Concentrado enriquecido de fibrinogênio, fator VIII, fator XIII, fator de von Willebrand e fibronectina em baixo volume (cerca de 50 mL por bolsa canina, contendo de 5 a 10 vezes a concentração de fibrinogênio do plasma original).\n' +
      '  - Dose: 1 unidade a cada 10 kg de peso vivo IV lenta.\n' +
      '  - Escolha de excelência na hipofibrinogenemia severa (<100 mg/dL) com sangramento ativo em pacientes com risco iminente de sobrecarga volêmica circulatória associada à transfusão (TACO). Sucesso clínico documentado em cães com CID secundária a hemangiossarcoma e GDV (Nelson & Couto, 6ª ed.).\n' +
      '- Concentrado de Plaquetas:\n' +
      '  - Raramente disponível na rotina veterinária; reservado para trombocitopenia extrema (<20.000–30.000/µL) associada a sangramento ativo com risco de vida.',
    anticoagulacao:
      'Terapia anticoagulante seletiva e individualização pelo fenótipo (ACVECC / CURATIVE 2019):\n' +
      '- Racional biológico e controvérsia clínica:\n' +
      '  - A administração de heparina visa conter a geração contínua de trombina, cessar a microtrombose difusa e poupar os fatores consumidos.\n' +
      '  - Conforme o consenso ACVECC/CURATIVE (2019), a heparina NÃO deve ser conduta rotineira ou universal na CID, devendo ser selecionada estritamente conforme o fenótipo clínico e laboratorial.\n' +
      '- Indicações precisas (quando considerar anticoagulação):\n' +
      '  - Pacientes em fase precoce/compensada (non-overt DIC), sem sangramentos ativos, portadores de fenótipo pró-trombótico documentado (tromboembolismo pulmonar, necrose isquêmica de extremidades ou TEG com traçado hipercoagulável inequívoco).\n' +
      '- Contraindicações formais (quando a heparina é vetada):\n' +
      '  - CID manifesta consumptiva (overt DIC), presença de hemorragia espontânea cutânea, mucosa ou cavitária, hipofibrinogenemia profunda (<100 mg/dL), traçado TEG hipocoagulável ou necessidade iminente de cirurgia de urgência.\n' +
      '- Heparina Não Fracionada (UFH):\n' +
      '  - Mecanismo: liga-se à antitrombina, acelerando em centenas de vezes a inativação da trombina e do fator Xa.\n' +
      '  - ALERTA FARMACOLÓGICO: depende estritamente de níveis adequados de antitrombina; com AT exaurida (<50–60%), ocorre resistência funcional à heparina.\n' +
      '  - Posologias (Plumb\'s Veterinary Drug Handbook, 10ª ed., p. 630): na CID em cães (uso extra-label), dose ambulatorial de 75 a 100 UI/kg SC a cada 8 horas. Em UTI sob monitoramento, bolus inicial de 100 UI/kg IV seguido de infusão contínua (CRI) de 20 a 50 UI/kg/hora, ajustando a taxa em incrementos de 5 UI/kg/h conforme resposta hemostática.\n' +
      '  - Esquemas históricos de Nelson & Couto (6ª ed., p. 1404): minidose (5–10 UI/kg SC q8h, sem efeito sobre testes plasmáticos), baixa dose (50–100 UI/kg SC q8h, preferida por Couto com FFP), intermediária (300–500 UI/kg SC/IV q8h) e alta dose (750–1000 UI/kg SC/IV q8h).\n' +
      '  - Desmame obrigatório: reduzir gradualmente ao longo de 2 a 4 dias (cerca de 50 UI/kg/dia) para evitar trombose rebote documentada.\n' +
      '  - Monitoramento: alvo de atividade anti-fator Xa de 0,35 a 0,7 UI/mL. Se indisponível, aPTT prolongado entre 1,5 e 2 vezes o valor basal do paciente.\n' +
      '  - Reversão de sobredose: sulfato de protamina na dose de 1 mg IV lento para cada 100 UI da última dose de heparina administrada (Plumb\'s, 10ª ed.), administrando lentamente para evitar colapso hipotensivo anafilactóide.\n' +
      '  - REGRA DE OURO: NUNCA misturar ou pré-incubar heparina na bolsa de plasma fresco antes da transfusão; além de ineficaz, consome a antitrombina disponível no produto (Lumb & Jones, 2024, Cap. 31, p. 577).\n' +
      '- Heparinas de Baixo Peso Molecular (LMWH — Enoxaparina e Dalteparina):\n' +
      '  - Farmacologia: maior relação anti-Xa:anti-IIa (3:1 a 4:1), menor ligação inespecífica e farmacocinética mais previsível.\n' +
      '  - Posologias segundo o Plumb\'s (10ª ed., pp. 363 e 475):\n' +
      '    - Enoxaparina em cães: 0,8 a 1 mg/kg SC a cada 6 a 8 horas (ou 0,8 mg/kg SC q6h).\n' +
      '    - Enoxaparina em gatos: 0,75 a 1 mg/kg SC a cada 6 a 12 horas (administração q6h preferível para manter anti-Xa terapêutico).\n' +
      '    - Dalteparina em cães: 150 a 175 UI/kg SC a cada 8 horas.\n' +
      '    - Dalteparina em gatos: 75 a 150 UI/kg SC a cada 6 horas.\n' +
      '  - Monitoramento de LMWH: testes convencionais (PT/aPTT) são insensíveis. Monitorar pico de atividade anti-Xa (alvo: 0,5 a 1,0 UI/mL) colhido 3 horas pós-SC em cães e 2 horas pós-SC em gatos (Plumb\'s, 10ª ed.).\n' +
      '  - Reversão de Enoxaparina: 1 mg de sulfato de protamina IV lento para cada 1 mg de enoxaparina administrada nas últimas 8 horas.',
    antifibrinoliticos:
      'Diretrizes restritivas de antifibrinolíticos e o relato pivotal de 2024:\n' +
      '- Mecanismo bioquímico:\n' +
      '  - Ácido tranexâmico (TXA) e ácido aminocaproico bloqueiam competitivamente os sítios de ligação de lisina no plasminogênio, impedindo sua conversão em plasmina ativa e estabilizando a fibrina contra a lise enzimática.\n' +
      '- Regra geral de contraindicação formal na sepse:\n' +
      '  - Contraindicados na CID clínica padrão, em especial na sepse (Textbook of Small Animal Emergency Medicine, Cap. 68, p. 435; Plumb\'s, 10ª ed., p. 78).\n' +
      '  - Como a sepse induz supressão fibrinolítica acentuada (altos níveis de PAI-1 e TAFI), administrar antifibrinolíticos bloqueia a remoção fisiológica da fibrina e precipita trombose microvascular fulminante irreversível.\n' +
      '- Exceção biológica e evidência pivotal de 2024 (Granger et al.):\n' +
      '  - Pacientes com CID crônica neoplásica ou trauma massivo podem apresentar hiperfibrinólise patológica descontrolada.\n' +
      '  - Granger et al. (2024, Frontiers in Veterinary Science) relataram um cão Border Collie de 8 anos com carcinoma nasal metastático e epistaxes incoercíveis recorrentes; apresentava PT e aPTT severamente prolongados, hipofibrinogenemia profunda (<60 mg/dL), D-dímero elevado, AT depletada e TEG com perfil hipocoagulável e lise acelerada extrema.\n' +
      '  - O uso racional de ácido aminocaproico associado a hemocomponentes (FFP, crioprecipitado e pRBC) controlou a hemorragia fatal.\n' +
      '- Posologias preconizadas (Plumb\'s 10ª ed., pp. 78 e 1291):\n' +
      '  - Ácido aminocaproico em cães com hiperfibrinólise comprovada em TEG: 15 a 20 mg/kg IV lenta ou VO a cada 8 horas (ou até 33 mg/kg IV q6h em sangramentos refratários).\n' +
      '  - Ácido tranexâmico (TXA) em cães: 10 mg/kg IV lento em 15–20 minutos, seguido por CRI de 10 mg/kg/hora durante 3 horas, ou 10 mg/kg IV repetido a cada 6–8 horas conforme traçado TEG.\n' +
      '- REGRA DE OURO:\n' +
      '  - Antifibrinolíticos são restritos a casos com evidência objetiva em testes viscoelásticos (LY30/LY60 acentuados na TEG/ROTEM) e hemorragia ativa clinicamente dominante, jamais devendo ser administrados empiricamente.',
    terapiasInadequadas:
      'Condutas desaconselhadas e mitos terapêuticos a evitar na CID:\n' +
      '- Vitamina K1 (Fitomenadiona) de rotina:\n' +
      '  - Atua unicamente como cofator para a gama-glutamil carboxilase na ativação de fatores dependentes (II, VII, IX, X); não inibe o fator tecidual, não bloqueia a geração sistêmica de trombina e não repõe o consumo hemostático difuso da CID.\n' +
      '  - Indicada apenas se houver comprovação de colestase com má absorção de lipossolúveis, desnutrição prolongada severa ou intoxicação por rodenticidas antagonistas de vitamina K coexistente (Ettinger, 2024; Nelson & Couto, 6ª ed.).\n' +
      '  - VETO FARMACOLÓGICO: nunca administrar vitamina K1 por via intravenosa devido ao risco de choque anafilático grave; utilizar exclusivamente via SC ou oral.\n' +
      '- Corticosteroides para "tratar a CID":\n' +
      '  - Inexistência de indicação para o manejo da CID per se. Glicocorticoides estimulam a síntese endotelial de PAI-1 (suprimindo a fibrinólise) e acentuam estados pró-trombóticos microvasculares.\n' +
      '  - Reservados estritamente quando indicados para a patologia primária de base (anemias hemolíticas imunomediadas — IMHA).\n' +
      '- Antiplaquetários (Aspirina e Clopidogrel):\n' +
      '  - Não constituem terapia de resgate na CID aguda instalada. A aspirina (0,5–1 mg/kg VO q12h em cães) não cessa a geração plasmática de trombina e impõe risco severo de úlceras gastrointestinais e hemorragias fatais (Nelson & Couto, 6ª ed., p. 1404; ACVECC CURATIVE, 2019).\n' +
      '  - Clopidogrel tem indicação formal na profilaxia tromboembólica em felinos cardiopatas ou nefropatas, mas não como tratamento de choque na CID consumptiva.\n' +
      '- Transfusão profilática de FFP para "tratar o exame laboratorial":\n' +
      '  - Não transfundir plasma apenas para corrigir PT ou aPTT numericamente alterados em paciente hemodinamicamente estável e assintomático. O foco deve ser o paciente, e não os valores do laudo.',
    suporteMultiorganico:
      'Protocolos de suporte intensivo aos sistemas orgânicos na UTI:\n' +
      '- Manejo ventilatório da síndrome do pulmão da CID (DIC lung):\n' +
      '  - Oxigenioterapia suplementar umidificada por cânula nasal ou máscara em fluxo moderado.\n' +
      '  - Hipoxemia refratária (PaO2 <60 mmHg ou SpO2 <90% com FiO2 >0,5) ou exaustão respiratória por microtrombose e edema alveolar: intubação e ventilação mecânica protetora com PEEP de 5 a 10 cmH2O e volume corrente baixo (6 a 8 mL/kg), prevenindo volutrauma e barotrauma (Nelson & Couto, 6ª ed.; Textbook of Small Animal Emergency Medicine).\n' +
      '- Manejo da lesão renal aguda isquêmica (LRA):\n' +
      '  - Monitoramento estrito do débito urinário a cada 1–2 horas via sistema fechado estéril de sondagem vesical com assepsia rigorosa.\n' +
      '  - Oligúria persistente (<1 mL/kg/h) a despeito de volemia restabelecida: avaliar diálise peritoneal/hemodiálise ou bolus de desafio cauteloso com furosemida (1–2 mg/kg IV); suspender imediatamente fármacos nefrotóxicos (AINEs, aminoglicosídeos).\n' +
      '- Controle de arritmias miocárdicas:\n' +
      '  - Complexos ventriculares prematuros (VPCs) frequentes ou multifocais secundários à isquemia intramural respondem primariamente à otimização da perfusão miocárdica e oxigenação.\n' +
      '  - Taquicardia ventricular sustentada com impacto hemodinâmico: lidocaína em cães (bolus de 2 mg/kg IV lento seguido de CRI de 25 a 75 µg/kg/min; evitar bolus em gatos por neuro/cardiotoxicidade).\n' +
      '- Correção hidroeletrolítica e do equilíbrio ácido-base:\n' +
      '  - Correção da acidose metabólica via clareamento de lactato e restauração da perfusão tecidual.\n' +
      '  - Monitorar cálcio ionizado sérico: hipocalcemia ionizada por quelação pelo citrato de hemocomponentes transfundidos compromete contratilidade e hemostasia; repor com gluconato de cálcio a 10% (0,5 a 1,5 mL/kg IV lento sob monitoramento ECG para detectar bradicardia).',
    monitoramentoSeriado:
      'Protocolo de monitoramento intensivo seriado e metas de estabilização:\n' +
      '- Dinâmica evolutiva da CID:\n' +
      '  - Trata-se de uma síndrome eminentemente dinâmica; avaliações pontuais isoladas têm valor prognóstico inferior à análise temporal contínua da curva de tendência.\n' +
      '- Parâmetros clínicos dinâmicos (a cada 2–4 horas na fase instável):\n' +
      '  - Frequência cardíaca, frequência respiratória e esforço ventilatório.\n' +
      '  - Pressão arterial média (PAM contínua ou oscilométrica de alta definição) e oximetria de pulso (SpO2).\n' +
      '  - Temperatura central e periférica (gradiente térmico patas-core), escala de mentação e débito urinário horário.\n' +
      '  - Inspeção meticulosa de mucosas, pele, feridas cirúrgicas e sítios de punção venosa à procura de novos sangramentos.\n' +
      '- Parâmetros laboratoriais seriados (a cada 6–12 horas na fase crítica):\n' +
      '  - Hematócrito e proteína total plasmática (para detectar hemorragia oculta ou hemodiluição excessiva).\n' +
      '  - Contagem manual de plaquetas em esfregaço com pesquisa de esquizócitos.\n' +
      '  - Coagulograma plasmático (PT e aPTT) e fibrinogênio sérico.\n' +
      '  - D-dímero quantitativo e atividade funcional de antitrombina (se disponível).\n' +
      '  - Lactato sanguíneo seriado, hemogasometria e creatinina sérica.\n' +
      '- Metas objetivas de melhora clínica e laboratorial:\n' +
      '  - 1. Estabilização e subsequente elevação na contagem de plaquetas circulantes.\n' +
      '  - 2. Redução progressiva dos tempos de coagulação (PT e aPTT) em direção aos intervalos de referência.\n' +
      '  - 3. Estabilização e manutenção do fibrinogênio sérico acima de 150 mg/dL.\n' +
      '  - 4. Queda progressiva do lactato sérico indicando recuperação da microperfusão tecidual.\n' +
      '  - 5. Recuperação sustentada do débito urinário (>1,5–2 mL/kg/h) e estabilização dos marcadores renais.\n' +
      '  - 6. Cessação de petéquias ativas, hematomas e sangramentos em sítios de cateteres venosos.\n' +
      '  - 7. Resolução clínica ou cirúrgica definitiva do gatilho causal subjacente.',
  },
  complications: {
    falenciaMultiplaOrgaos:
      'Fisiopatologia e acometimento multiorgânico na MODS:\n' +
      '- Oclusão difusa e isquemia celular microvascular:\n' +
      '  - A deposição disseminada de microtrombos de fibrina e agregados de neutrófilos e plaquetas obstrui leitos capilares e arteríolas pré-capilares.\n' +
      '  - Instala-se hipoperfusão tecidual heterogênea com glicólise anaeróbia, acidose lática e colapso energético celular.\n' +
      '- Espectro de disfunção orgânica múltipla (MODS):\n' +
      '  - Rins: isquemia glomerular e necrose tubular aguda (LRA anúrica ou oligúrica).\n' +
      '  - Pulmões: síndrome do pulmão da CID ("DIC lung" / SDRA) com lesão endotelial, micro-hemorragia alveolar e hipoxemia refratária.\n' +
      '  - Coração: microtrombose de arteríolas coronárias intramurais, isquemia miocárdica e arritmias ventriculares (VPCs).\n' +
      '  - Fígado: necrose isquêmica centrolobular e colestase disfuncional da sepse.\n' +
      '  - Sistema nervoso central: microinfartos corticais e petéquias parenquimatosas, cursando com estupor, convulsões e coma.',
    hemorragiasIncoerciveis:
      'Mecanismos e manifestações da diátese hemorrágica terminal:\n' +
      '- Colapso hemostático consumptivo combinado:\n' +
      '  - Esgotamento progressivo dos fatores plasmáticos lábeis e estáveis (fibrinogênio, protrombina, fatores V e VIII).\n' +
      '  - Trombocitopenia consumptiva severa (<20.000–30.000/µL) agravada pelo bloqueio funcional plaquetário promovido por excesso de FDPs circulantes.\n' +
      '- Espectro clínico de manifestações hemorrágicas incoercíveis:\n' +
      '  - Hemorragias cutâneo-mucosas: petéquias, equimoses espontâneas e sufusões confluentes.\n' +
      '  - Sangramento persistente em napa em locais de punção vascular, inserção de cateteres intravenosos e feridas cirúrgicas.\n' +
      '  - Hemorragias digestivas e cavitárias: epistaxe incoercível, hematêmese, melena, hemotórax e hemoabdome descompensados com choque hipovolêmico consumptivo.',
    figuraPetequiasEquimoses: figura5PetequiasEquimoses,
  },
  prevention: {
    vigilanciaPrecoce:
      'Reconhecimento precoce e monitoramento profilático na UTI:\n' +
      '- Vigilância ativa de pacientes críticos sob alto risco:\n' +
      '  - A única estratégia verdadeiramente eficaz de prevenção da CID reside no alto índice de suspeição clínica antes que a fase manifesta (overt DIC) se consolide.\n' +
      '  - Pacientes predispostos: sepse abdominal, piometra, pancreatite aguda necrosante, hemoabdome por hemangiossarcoma, politraumatismos, choque prolongado ou estresse térmico/insolação.\n' +
      '- Painel hemostático basal mandatório na admissão:\n' +
      '  - Colher imediatamente: contagem plaquetária manual com lâmina, PT, aPTT, fibrinogênio e D-dímero quantitativo.\n' +
      '- Identificação da janela pré-DIC pró-trombótica:\n' +
      '  - Quedas seriadas na contagem de plaquetas ou elevação combinada de D-dímero e fibrinogênio nas primeiras 6 a 12 horas sinalizam ativação hemostática subclínica.\n' +
      '  - Permite intervir agressivamente na doença de base e no suporte microcirculatório antes da falência multiorgânica irreversível.',
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
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. Wiley-Blackwell; 2023:\n' +
        '- Monografias: Heparin (pp. 630-633), Enoxaparin (pp. 475-478), Dalteparin (pp. 362-365), Aminocaproic Acid (pp. 78-81), Tranexamic Acid (pp. 1291-1294), Protamine Sulfate e Phytonadione.',
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
        'Drobatz KJ, Hopper K, Rozanski EA, Silverstein DC, eds. Textbook of Small Animal Emergency Medicine. Wiley-Blackwell; 2019:\n' +
        '- Cap. 68: Fibrinolysis and Antifibrinolytics (pp. 431-438); Cap. 70: Acquired Coagulopathy (pp. 445-453); Cap. 86: Pancreatitis; Cap. 159: SIRS and Sepsis.',
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
        'King LG, Boag A, eds. BSAVA Manual of Canine and Feline Emergency and Critical Care. 3rd ed. British Small Animal Veterinary Association; 2018:\n' +
        '- Cap. 13: Haematological Emergencies (pp. 210-235; DIC pp. 227-229); Cap. 14: Transfusion Medicine (pp. 236-248).',
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
