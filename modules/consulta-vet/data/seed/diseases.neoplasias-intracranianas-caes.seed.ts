import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/*
 * Neoplasias Intracranianas em Cães (Tumores Encefálicos Caninos) — Monografia Clínica Padrão Ouro.
 * Atualizado com base em:
 * - Literatura e consensos de neuro-oncologia veterinária (CBTC / NCI 2018 e 2026; AAHA Oncology Guidelines 2026)
 * - Estudos contemporâneos: Geiger et al. (2025 - SRT em meningiomas, n=285), Rossmeisl et al. (2026 - GTR vs STR em meningiomas, n=41),
 *   Fukuyama et al. (2025 - IMRT em gliomas, n=55), Rossmeisl & Garcia-Mora (2025 - biópsia estereotáxica), Hu et al. (2015 - CCNU),
 *   Westworth et al. (2008 - tumores de plexo coroide), Toyoda et al. (2020 - macroadenomas hipofisários), LaRue et al. (2018 - SRT)
 * - Withrow & MacEwen's Small Animal Clinical Oncology 6ª ed. (cap. 31), Nelson & Couto 6ª ed. (cap. 60),
 *   BSAVA Manual of Canine and Feline Oncology 3ª ed. (cap. 21), Manual of Small Animal Emergency and Critical Care Medicine 2ª ed. e Plumb's 10ª ed.
 */
export const neoplasiasIntracranianasCaesRecord: DiseaseRecord = {
  id: 'disease-neoplasias-intracranianas-caes',
  slug: 'neoplasias-intracranianas-caes',
  title: 'Neoplasias intracranianas em cães (tumores encefálicos)',
  subtitle:
    'Monografia clínica avançada: doutrina de Monro-Kellie, neurolocalização anatomo-clínica, ressonância magnética multiparamétrica, biópsia estereotáxica, cirurgia oncológica com ressecção completa (GTR) e radioterapia moderna',
  synonyms: [
    'Neoplasias intracranianas caninas',
    'Tumores encefálicos em cães',
    'Tumores cerebrais caninos',
    'Intracranial neoplasia in dogs',
    'Canine brain tumors',
    'Meningioma intracraniano canino',
    'Glioma canino',
    'Astrocitoma canino',
    'Oligodendroglioma canino',
    'Tumor de plexo coroide canino',
  ],
  species: ['dog'],
  category: 'neurologia',
  categories: [
    'neurologia',
    'oncologia',
    'urgencia-emergencia',
    'diagnostico-por-imagem',
    'clinica-medica',
  ],
  tags: [
    'Neoplasia Intracraniana',
    'Tumor Cerebral',
    'Meningioma Canino',
    'Glioma Canino',
    'Monro-Kellie',
    'Hipertensão Intracraniana',
    'Tríade de Cushing',
    'Ressonância Magnética',
    'Biópsia Estereotáxica',
    'Radioterapia Estereotáxica (SRT)',
    'Ressecção Total (GTR)',
    'Levetiracetam',
    'Withrow & MacEwen',
  ],
  isPublished: true,
  source: 'seed',

  plainLanguage: DISEASE_PLAIN_LANGUAGE['neoplasias-intracranianas-caes'],

  quickSummary:
    'As neoplasias intracranianas em cães representam lesões expansivas primárias ou secundárias do encéfalo e estruturas adjacentes que ameaçam a vida pela inelasticidade craniana:\n\n' +
    '- Regra clínica do primeiro evento convulsivo: cão com idade superior a 5 ou 6 anos apresentando a primeira crise epiléptica da vida, especialmente acompanhada de alterações posturais ou comportamentais interictais, deve ser investigado prioritariamente para afecção estrutural encefálica até prova em contrário.\n' +
    '- Fisiopatologia de Monro-Kellie e risco de herniação: a calvária inelástica abriga parênquima (80%), sangue (10%) e líquor (10%); a exaustão da complacência volumétrica pelo crescimento tumoral precipita hipertensão intracraniana grave, edema vasogênico perilesional, colapso da pressão de perfusão cerebral e risco iminente de herniação transtentorial ou foraminal fatal.\n' +
    '- Tipos histológicos predominantes: o meningioma responde por quase metade dos tumores primários no cão (comum em dolicocefálicos/mesocefálicos); gliomas (oligodendrogliomas e astrocitomas) predominam expressivamente em braquicefálicos (Boxer, Boston Terrier, Bulldogs); tumores de plexo coroide, adenomas hipofisários e metástases (hemangiossarcoma, melanoma) completam o espectro.\n' +
    '- Padrão-ouro diagnóstico: ressonância magnética (MRI) multiparamétrica com sequências T1 pós-contraste, FLAIR, T2* e difusão (DWI) é a modalidade de imagem de escolha; o diagnóstico histológico definitivo exige biópsia estereotáxica guiada por imagem ou histopatologia cirúrgica.\n' +
    '- Paradigma terapêutico moderno: a combinação de ressecção cirúrgica com ressecção total macroscópica (GTR) ou radioterapia estereotáxica conformacional (SRT/IMRT) proporciona sobrevidas medianas superiores a 1,5 a 2 anos em meningiomas, superando expressivamente o manejo exclusivamente paliativo.\n' +
    '- Alerta terapêutico inegociável: resposta clínica rápida ao uso de prednisona decorre da redução do edema vasogênico peritumoral e não reflete cura nem controle oncológico; a punção de líquor cisternal é formalmente contraindicada perante efeito de massa devido ao risco imediato de herniação fatal.',

  quickDecisionStrip: [
    'Cão com primeira crise convulsiva após 5 a 6 anos exige investigação prioritária de lesão estrutural intracraniana por ressonância magnética.',
    'Nunca realize punção cisternal de líquor (LCR) se houver efeito de massa ou hipertensão intracraniana na imagem: risco imediato de herniação e óbito.',
    'A tríade de Cushing (hipertensão arterial sistêmica com bradicardia reflexa e padrão respiratório irregular) indica colapso bulbar iminente e emergência absoluta.',
    'Melhora clínica espetacular com corticoide decorre da redução do edema vasogênico perilesional, não significando remissão tumoral nem cura oncológica.',
    'Meningiomas com ressecção cirúrgica completa (GTR) ou radioterapia estereotáxica (SRT) alcançam sobrevidas medianas documentadas de cerca de 700 dias.',
    'Braquicefálicos (Boxer, Boston Terrier, Bulldogs) concentram a grande maioria dos gliomas intra-axiais, enquanto dolicocefálicos apresentam mais meningiomas.',
    'Levetiracetam é o anticonvulsivante de escolha para crises epilépticas estruturais por início rápido e ausência de sobrecarga metabólica hepática.',
    'Não prescreva anticonvulsivantes profiláticos em cães assintomáticos apenas pelo achado incidental de tumor encefálico em exame de imagem.',
    'Terapia hiperosmolar de emergência: manitol 20% (0,5 a 1,0 g/kg em 15-20 min) ou NaCl 7,5% (3 a 5 mL/kg em 10 min) para hipertensão intracraniana aguda.',
    'Lomustina (CCNU) não possui comprovação robusta como terapia de primeira linha isolada para glioma canino, devendo-se priorizar radioterapia conformacional.',
  ],

  quickSummaryRich: {
    lead:
      'As neoplasias intracranianas caninas demandam reconhecimento precoce e conduta neuroprotetora ágil para evitar colapso da pressão de perfusão cerebral e herniação irreversível:\n\n' +
      '- Desafio mecânico fechado: crescimento tumoral e edema vasogênico comprimem o parênquima encefálico contra a calvária óssea inelástica, exigindo controle imediato da hipertensão intracraniana.\n' +
      '- Mudança do prognóstico oncológico: o advento da radioterapia estereotáxica (SRT) e da microcirurgia guiada por neuronavigação transformou tumores antes considerados fatais em curto prazo em afecções passíveis de sobrevida prolongada com excelente qualidade de vida.',
    leadHighlights: [
      'Gatilho clínico: cão idoso (>5-6 anos) com primeiro episódio de crise epiléptica',
      'Fisiopatologia de Monro-Kellie e risco de herniação fatal',
      'Meningioma em dolicocefálicos e gliomas em raças braquicefálicas',
      'Ressonância magnética (MRI) como padrão-ouro absoluto de imagem',
      'Sobrevida mediana prolongada (≈700 dias) com cirurgia GTR ou radioterapia SRT',
    ],
    pillars: [
      {
        title: 'Pilar 1: Fisiologia de Monro-Kellie e Perfusão Cerebral (CPP)',
        body:
          'Princípios dinâmicos de pressão e complacência no espaço craniano inelástico:\n\n' +
          '- Equilíbrio volumétrico intracraniano: a calvária fechada aloja parênquima cerebral (80%), sangue intravascular (10%) e líquor (10%); a introdução de uma massa tumoral esgota precocemente a capacidade de complacência.\n' +
          '- Equação crítica de perfusão cerebral: a Pressão de Perfusão Cerebral depende da pressão arterial média menos a pressão intracraniana (CPP = MAP - ICP); quando a ICP sobe descontroladamente, a perfusão colapsa e gera isquemia cerebral difusa.\n' +
          '- Tríade de Cushing: hipertensão arterial sistêmica rebote associada a bradicardia reflexa barorreceptora e respiração atáxica ou de Cheyne-Stokes denuncia herniação iminente do tronco encefálico.',
        highlights: ['Doutrina de Monro-Kellie', 'Equação CPP = MAP - ICP', 'Tríade reflexa de Cushing'],
      },
      {
        title: 'Pilar 2: Classificação Topográfica e Histológica no Cão',
        body:
          'Estratificação anatômica e celular fundamental para prognóstico e tratamento:\n\n' +
          '- Compartimento extra-axial: meningiomas originados nas células aracnóideas constituem 40-50% dos tumores primários caninos, seguidos por tumores de bainha de nervo periférico (PNST de nervos cranianos).\n' +
          '- Compartimento intra-axial: gliomas (astrocitomas e oligodendrogliomas) originados na glia, com altíssima predileção por braquicefálicos, além de linfomas primários e histiocitose disseminada.\n' +
          '- Compartimentos intraventricular, selar e metastático: tumores do plexo coroide (hiperprodução liquórica), macroadenomas hipofisários e metástases hematogênicas frequentes (hemangiossarcoma, carcinomas e melanoma).',
        highlights: ['Extra-axial vs Intra-axial', 'Meningiomas em dolicocefálicos', 'Gliomas em braquicefálicos'],
      },
      {
        title: 'Pilar 3: Diagnóstico por Imagem Avançada e Neuropatologia',
        body:
          'Investigação multiparamétrica e validação diagnóstica tecidual:\n\n' +
          '- Ressonância magnética (MRI) multiparamétrica: exame de escolha utilizando T1 pré e pós-contraste (quebra da barreira hematoencefálica), T2 e FLAIR (edema vasogênico perilesional) e T2*/SWI (micro-hemorragias intratumorais).\n' +
          '- Falácias e limitações radiológicas: o sinal da cauda dural (dural tail sign) e realce anelar não são patognomônicos de meningioma e glioma, ocorrendo em meningoencefalites (MUE) e metástases.\n' +
          '- Biópsia estereotáxica e consenso CBTC/NCI: padrão-ouro absoluto para diagnóstico histológico; novos dados do NCI (2026) confirmam a necessidade de critérios neuropatológicos específicos para cães.',
        highlights: ['MRI multiparamétrica', 'Dural tail não patognomônico', 'Biópsia estereotáxica CBTC/NCI'],
      },
      {
        title: 'Pilar 4: Terapias Direcionadas, Sobrevida e Suporte Paliativo',
        body:
          'Escalonamento terapêutico contemporâneo entre modalidades agressivas e conservadoras:\n\n' +
          '- Meningiomas e evidências recentes: estudo multicêntrico de Geiger et al. (2025, n=285) demonstrou sobrevida mediana de 696 dias com SRT; Rossmeisl et al. (2026, n=41) provou que ressecção total macroscópica (GTR) atinge 694 dias de sobrevida e 90% dos cães livres de crises epilépticas.\n' +
          '- Gliomas e desafios terapêuticos: IMRT conformacional atinge sobrevida mediana de 432 dias (Fukuyama et al., 2025); quimioterapia com lomustina isolada não demonstra benefício consistente sobre cuidados paliativos.\n' +
          '- Estabilização emergencial: manitol 20% ou NaCl 7,5% para hipertensão intracraniana, cabeceira a 30°, levetiracetam para controle ictogênico e prednisona titulada para edema vasogênico.',
        highlights: ['Sobrevida prolongada com GTR e SRT', 'Fukuyama 2025 em gliomas', 'Terapia hiperosmolar de urgência'],
      },
    ],
    diagnosticFlow: {
      title: 'Algoritmo Diagnóstico Integrado para Neoplasias Intracranianas Caninas',
      steps: [
        {
          label: 'Passo 1: Reconhecimento do Gatilho Clínico e Neurolocalização Minuciosa',
          detail:
            'Avaliação semiológica imediata em cães sob suspeição neurológica:\n\n' +
            '- Histórico e idade de corte: cão com mais de 5 a 6 anos apresentando primeira crise epiléptica ou mudanças sutis de comportamento (desorientação, perda de hábitos).\n' +
            '- Exame neurológico estruturado: neurolocalização anatômica precisa entre prosencéfalo (telencéfalo/diencéfalo), tronco encefálico, cerebelo ou sistema vestibular central.\n' +
            '- Monitoramento vital: avaliação de pressão arterial e ritmo cardíaco para descartar tríade de Cushing (hipertensão + bradicardia) indicativa de descompensação aguda.',
        },
        {
          label: 'Passo 2: Triagem Laboratorial Sistêmica e Exclusão de Causas Metabólicas',
          detail:
            'Painel laboratorial obrigatório para descartar causas extracranianas de crises:\n\n' +
            '- Hemograma e bioquímica completa: glicemia em jejum (exclusão de insulinoma/hipoglicemia), função hepática e amônia/ácidos biliares (exclusão de encefalopatia hepática/shunts).\n' +
            '- Painel hidroeletrolítico e renal: sódio, potássio, cálcio ionizado, ureia e creatinina para descartar desequilíbrios osmóticos e encefalopatia urêmica.\n' +
            '- Pressão arterial sistêmica seriada: identificação precoce de hipertensão severa causadora de encefalopatia hipertensiva secundária.',
        },
        {
          label: 'Passo 3: Estadiamento Oncológico Sistêmico Extracraniano',
          detail:
            'Rastreio metódico de neoplasia primária oculta antes do investimento neurocirúrgico:\n\n' +
            '- Radiografias torácicas em três projeções: pesquisa de metástases pulmonares de carcinomas, melanomas ou focos de sarcomas.\n' +
            '- Ultrassonografia abdominal completa: avaliação minuciosa de baço, fígado, adrenais e rins para descartar hemangiossarcoma ou carcinomas metastáticos.\n' +
            '- Ecocardiograma com avaliação de átrio direito: detecção de hemangiossarcoma cardíaco com potencial de embolização metastática encefálica.',
        },
        {
          label: 'Passo 4: Ressonância Magnética (MRI) Encefálica Multiparamétrica',
          detail:
            'Modalidade padrão-ouro absoluto para diagnóstico de imagem encefálica:\n\n' +
            '- Protocolo de sequências obrigatório: T2 ponderado (arquitetura e edema), FLAIR (supressão do LCR para delimitar edema vasogênico perilesional), T1 pré e pós-Gadolínio (realce tumoral e permeabilidade vascular).\n' +
            '- Sequências avançadas críticas: T2* GRE / SWI (extrema sensibilidade para sangramentos intratumorais e produtos de hemoglobina) e DWI/ADC (restrição de difusão hídrica).\n' +
            '- Caracterização topográfica: diferenciação criteriosa entre lesão extra-axial (base dural estreita/larga), intra-axial (parênquima profundo) ou intraventricular.',
        },
        {
          label: 'Passo 5: Biópsia Estereotáxica ou Ressecção Cirúrgica com Histopatologia',
          detail:
            'Validação diagnóstica definitiva e classificação celular:\n\n' +
            '- Biópsia estereotáxica guiada por imagem: indicada para lesões profundas, inoperáveis ou que serão encaminhadas à radioterapia exclusiva, com rendimento diagnóstico de aproximadamente 95%.\n' +
            '- Ressecção cirúrgica aberta (craniotomia/craniectomia): indicada para massas acessíveis com efeito de massa volumétrico, almejando ressecção total macroscópica (GTR).\n' +
            '- Avaliação neuropatológica padronizada: classificação histológica segundo critérios da CBTC/NCI com imunofenotipagem para definição de grau e prognóstico.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma Terapêutico Neuro-Oncológico Integrado',
      steps: [
        {
          label: 'Fase 1: Manejo Emergencial da Hipertensão Intracraniana e Neuroproteção',
          detail:
            'Medidas imediatas para preservar a pressão de perfusão cerebral (CPP):\n\n' +
            '- Posicionamento postural: elevar a cabeça do paciente a 30° em relação ao corpo, mantendo pescoço reto sem flexão e sem compressão de jugulares (proibir coleiras).\n' +
            '- Ventilação e controle hemodinâmico: manter PaO2 acima de 80-100 mmHg e PaCO2 entre 35-40 mmHg (normocapnia); manter pressão arterial média (MAP) normal a alta (>80 mmHg) com cristaloides isotônicos.\n' +
            '- Terapia hiperosmolar de resgate: em sinais de herniação ou deterioração aguda, administrar manitol 20% (0,5 a 1,0 g/kg IV em 15-20 min) ou NaCl 7,5% (3 a 5 mL/kg IV em 10 min).',
        },
        {
          label: 'Fase 2: Redução do Edema Vasogênico com Glicocorticoides Titulados',
          detail:
            'Alívio rápido da quebra de barreira hematoencefálica com foco em mitigar efeitos catabólicos:\n\n' +
            '- Dose inicial: prednisona ou prednisolona na faixa de 0,5 a 1,0 mg/kg/dia VO (dividido a cada 12 ou 24 horas); na emergência imediata, pode-se empregar dexametasona 0,1 a 0,2 mg/kg IV.\n' +
            '- Protocolo de desmame rápido: iniciar redução gradativa após 48 a 72 horas de estabilização, buscando a menor dose em dias alternados para prevenir miopatia, calcinose e imunossupressão grave.\n' +
            '- Esclarecimento ao tutor: ressaltar categoricamente que a melhora clínica induzida pelo corticoide reflete diminuição do edema peritumoral e não destruição da neoplasia.',
        },
        {
          label: 'Fase 3: Controle Farmacológico das Crises Epilépticas Estruturais',
          detail:
            'Terapia anticonvulsivante focada na prevenção de status epilepticus:\n\n' +
            '- Fármaco de primeira linha: levetiracetam na dose de 20 a 30 mg/kg VO a cada 8 horas (ou formulação estendida XR 30 mg/kg VO a cada 12 horas); dose de ataque na crise aguda: 60 mg/kg IV lento.\n' +
            '- Associação terapêutica: perante controle incompleto das crises, associar fenobarbital (2,5 a 3,0 mg/kg VO q12h) ou zonisamida (5 a 10 mg/kg VO q12h).\n' +
            '- Veto a anticonvulsivantes profiláticos: não iniciar medicação anticonvulsivante em cães assintomáticos que não tenham apresentado crises clínicas documentadas.',
        },
        {
          label: 'Fase 4: Tratamento Cirúrgico com Intuito de Ressecção Total (GTR)',
          detail:
            'Intervenção cirúrgica aberta guiada por técnicas microcirúrgicas:\n\n' +
            '- Ressecção total macroscópica (GTR): remoção agressiva e meticulosa de todo o volume tumoral visível em meningiomas acessíveis (sobrevida mediana de 694 dias e 90% livres de convulsões segundo Rossmeisl et al., 2026).\n' +
            '- Ressecção subtotal (STR) ou descompressão: indicada quando a invasão de seios venosos ou tecidos profundos impede margens limpas, seguida obrigatoriamente de terapia adjuvante.\n' +
            '- Cuidados neurointensivos de pós-operatório: vigilância estrita contra convulsões precoces, hemorragia pós-operatória e edema cerebral rebote nas primeiras 72 horas.',
        },
        {
          label: 'Fase 5: Radioterapia Conformacional (SRT/IMRT) e Cuidados Paliativos',
          detail:
            'Modalidade de excelência para controle locorregional definitivo ou adjuvante:\n\n' +
            '- Radioterapia estereotáxica (SRT / SRS): protocolo de alta precisão em 1 a 3 frações de alta dose, proporcionando sobrevida mediana de 696 dias em meningiomas (Geiger et al., 2025).\n' +
            '- Radioterapia de intensidade modulada (IMRT): excelente indicação para gliomas intra-axiais profundos, com sobrevida mediana de 432 dias documentada por Fukuyama et al. (2025).\n' +
            '- Protocolo paliativo ambulatorial: suporte com levetiracetam, prednisona em menor dose tolerada, analgesia multimodal se dor meníngea e suporte nutricional domiciliar com foco na qualidade de vida.',
        },
      ],
    },
  },

  etiology: {
    definicaoConceitualETaxonomiaGeral:
      'Conceito biológico e classificação das neoplasias encefálicas em cães:\n\n' +
      '- Definição patológica: proliferação celular clonal desordenada localizada no interior da cavidade craniana, originada primariamente do parênquima nervoso, meninges, plexo vascular ou estruturas selares, ou resultante de invasão óssea/nasal contígua e disseminação metastática hematogênica.\n' +
      '- Taxonomia fundamental: divisão estrita entre tumores primários (nascidos no sistema nervoso central) e secundários (invasão local de cavidade nasal, osso craniano e orelha média/interna, ou metástases a distância de tumores viscerais).\n' +
      '- Desafio anatômico particular: mesmo tumores histologicamente classificados como de baixo grau de malignidade comportam-se de forma biologicamente letal devido à expansão contínua em uma caixa óssea hermeticamente selada.',
    classificacaoTopograficaEOrigemTecidual:
      'Classificação espacial baseada nos compartimentos encefálicos:\n\n' +
      '- Compartimento extra-axial: neoplasias localizadas fora do parênquima cerebral propriamente dito, inseridas nas meninges, base do crânio ou nervos cranianos (destaque para meningiomas e tumores de bainha de nervo periférico).\n' +
      '- Compartimento intra-axial: tumores que surgem e se desenvolvem infiltrativamente no próprio parênquima cerebral, representados principalmente pelos gliomas (astrocitomas e oligodendrogliomas), linfomas primários do SNC e sarcoma histiocítico.\n' +
      '- Compartimento intraventricular: lesões expansivas intraluminais que se projetam nos ventrículos laterais, terceiro ou quarto ventrículo, gerando obstrução direta do fluxo de líquor (papilomas e carcinomas do plexo coroide, ependimomas).\n' +
      '- Região selar e parasselar: tumores originados na adeno-hipófise ou neuro-hipófise (macroadenomas e adenocarcinomas hipofisários), provocando síndromes neurológicas diencefálicas associadas ou não a endocrinopatias.',
    meningiomasCaninosEBiologiaMeningea:
      'Perfil morfológico e biológico do tumor primário mais comum no cão:\n\n' +
      '- Incidência e origem: representam entre 40% e 50% de todas as neoplasias intracranianas primárias da espécie canina, derivando diretamente das células da camada meningotelial aracnóidea.\n' +
      '- Subtipos histopatológicos: classificação tradicional em meningioteliomatoso, transicional, fibroblástico, psamomatoso, microcístico e variantes atípicas ou anaplásicas malignas.\n' +
      '- Particularidade neuropatológica canina: dados recentes do consórcio CBTC e NCI (2026) demonstraram que a aplicação direta do sistema de graduação da OMS para humanos (graus I a III) não se correlaciona com a sobrevida no cão, pois meningiomas caninos histologicamente grau I podem exibir infiltração óssea precoce e comportamento invasivo local.',
    gliomasAstrocitomasEOligodendrogliomas:
      'Espectro de tumores gliais intra-axiais e características celulares:\n\n' +
      '- Oligodendrogliomas: neoplasias derivadas de oligodendrócitos, caracterizadas microscopicamente por células com halo perinuclear límpido (aspecto em ovo frito) e rica vascularização fina; dividem-se em baixo e alto grau pelo sistema CBTC/NCI.\n' +
      '- Astrocitomas: neoplasias originadas em astrócitos protoplasmáticos ou fibrilares, exibindo padrão de crescimento difuso e altamente infiltrativo no parênquima branco e cinzento, dificultando margens cirúrgicas nítidas.\n' +
      '- Glioblastoma multiforme: forma mais agressiva e anaplásica dos gliomas astrocíticos, marcada por proliferação endotelial proeminente, necrose geográfica central e extrema resistência radioquimioterápica.',
    tumoresDoPlexoCoroideEEpendimomas:
      'Neoplasias do sistema ventricular e repercussões dinâmicas:\n\n' +
      '- Papilomas de plexo coroide: tumores benignos ou de baixo grau que hiperproduzem ativamente líquor cefalorraquidiano em taxas muito superiores à capacidade de reabsorção, gerando hidrocefalia comunicante difusa.\n' +
      '- Carcinomas de plexo coroide: neoplasias altamente anaplásicas e invasivas que rompem o epitélio ventricular e apresentam notável capacidade de disseminação liquórica por metástases em gota (drop metastases) ao longo do espaço subaracnóideo medular.\n' +
      '- Ependimomas: tumores raros que se originam da camada ependimária ciliada que reveste o canal central e os ventrículos, com alta propensão a recidivas locais.',
    neoplasiasHipofisariasESelares:
      'Tumores da região selar com manifestações neuroendócrinas:\n\n' +
      '- Macroadenomas de hipófise: proliferações adenomatosas que excedem 10 mm de diâmetro na imagem e ultrapassam a sela túrcica, provocando compressão dorsal do quiasma óptico, hipotálamo e tálamo.\n' +
      '- Espectro funcional: podem ser funcionais e secretores de ACTH (gerando hiperadrenocorticismo hipófise-dependente associado a sinais neurológicos centrais) ou não funcionais/cromófobos (apenas com sinais compressivos diencefálicos).\n' +
      '- Adenocarcinomas hipofisários: neoplasias malignas raras com rápida invasão do assoalho craniano e potencial de disseminação metastática sistêmica.',
    tumoresSecundariosPorInvasaoLocal:
      'Extensão direta de neoplasias extraneurais para o compartimento endocraniano:\n\n' +
      '- Neoplasias sinonasais: adenocarcinomas, carcinomas escamosos e condrossarcomas da cavidade nasal e seios frontais com osteólise da lâmina cribriforme do etmoide e invasão do lobo olfatório/frontal.\n' +
      '- Neoplasias ósseas da calvária: osteossarcoma, condrossarcoma e o tumor multilobular ósseo (MLO / multilobular tumor of bone), que cresce na tábua óssea com compressão extradural progressiva do encéfalo.\n' +
      '- Neoplasias otológicas: carcinomas e sarcomas do meato acústico externo/médio com destruição da bula timpânica e invasão da fossa caudal e tronco encefálico.',
    neoplasiasMetastaticasHematogenicas:
      'Disseminação neoplásica sistêmica secundária para o encéfalo:\n\n' +
      '- Hemangiossarcoma: tumor metastático de maior impacto vascular, gerando lesões hemorrágicas multifocais graves e frequente apresentação com apoplexia tumoral (hemorragia aguda com deterioração neurológica súbita).\n' +
      '- Carcinomas e melanomas: metástases frequentes de carcinoma mamário, adenocarcinoma prostático, adenocarcinoma pulmonar e melanoma da cavidade oral ou cutâneo.\n' +
      '- Linfoma e sarcoma histiocítico: formas disseminadas que infiltram difusamente a substância cerebral e leptomeninges com evolução clínica rápida e prognóstico reservado.',
    tabelaClassificacaoTopograficaEOrigem: {
      kind: 'clinicalTable',
      caption: 'Tabela 1 — Classificação Topográfica, Origem Celular e Perfis Biológicos das Neoplasias Intracranianas Caninas',
      headers: ['Topografia Encefálica', 'Tipos Histológicos Principais', 'Origem Celular / Tecidual', 'Comportamento Biológico e Particularidades'],
      rows: [
        ['Extra-axial (Meninges / Nervos)', 'Meningioma (subtipos I, II, III)', 'Células meningoteliais da aracnoide', 'Tumor primário mais comum no cão; compressão lenta do parênquima; hiperostose óssea adjacente'],
        ['Extra-axial (Nervos Cranianos)', 'Tumor de Bainha de Nervo (PNST)', 'Células de Schwann e fibroblastos perineurais', 'Predileção marcante pelo nervo trigêmeo (V par); atrofia ipsilateral profunda dos músculos da mastigação'],
        ['Intra-axial (Parênquima Glial)', 'Oligodendroglioma (baixo e alto grau)', 'Oligodendrócitos maduros ou precursores', 'Altíssima prevalência em raças braquicefálicas; rico em vasos frágeis; crescimento infiltrativo'],
        ['Intra-axial (Parênquima Glial)', 'Astrocitoma / Glioblastoma', 'Astrócitos protoplasmáticos/fibrilares', 'Padrão difuso invasivo; limites teciduais imprecisos; alta resistência a quimioterapia padrão'],
        ['Intra-axial (Linfo-histiocitário)', 'Linfoma primário do SNC e Sarcoma Histiocítico', 'Linfócitos T/B e macrófagos/dendríticas', 'Progressão agressiva; sarcoma histiocítico comum em Bernese Mountain Dog e Golden Retriever'],
        ['Intraventricular', 'Papiloma e Carcinoma de Plexo Coroide', 'Epitélio cúbico dos plexos coroides', 'Hiperprodução de líquor e hidrocefalia; carcinomas geram metástases em gota no neuroeixo espinhal'],
        ['Intraventricular', 'Ependimoma', 'Células ependimárias dos ventrículos', 'Raro no cão; localização preferencial no quarto ventrículo com compressão de ponte e bulbo'],
        ['Selar / Parasselar', 'Macroadenoma e Adenocarcinoma Hipofisário', 'Células glandulares da adeno-hipófise', 'Compressão diencefálica (quiastática/hipotalâmica); pode cursar com hiperadrenocorticismo concomitante'],
        ['Secundário por Invasão Local', 'Tumores nasais (Adenocarcinoma) e MLO', 'Epitélio sinonasal e osteoblastos/cartilagem', 'Destruição óssea da lâmina cribriforme ou da calvária com compressão de lobos frontais'],
        ['Metastático Hematogênico', 'Hemangiossarcoma, Melanoma, Carcinomas', 'Endotélio vascular, melanócitos e epitélio', 'Lesões frequentemente multifocais; hemangiossarcoma causa hemorragia e apoplexia tumoral súbita'],
      ],
    },
  },

  epidemiology: {
    distribuicaoEtariaEPredilecaoPorIdosos:
      'Faixa etária e importância do primeiro episódio convulsivo no paciente senil:\n\n' +
      '- Idade típica de manifestação: acomete predominantemente cães de meia-idade a idosos, com pico de incidência entre 8 e 11 anos; apresentações em animais com menos de 5 anos são incomuns, embora gliomas possam ocorrer em cães jovens de raças predispostas.\n' +
      '- Regra clínica dos 5 a 6 anos: cão que manifesta a primeira crise epiléptica da vida após os 5 ou 6 anos deve ser considerado portador de lesão intracraniana estrutural até que se comprove o contrário por exame de imagem avançada.\n' +
      '- Ausência de epilepsia idiopática tardia: a epilepsia idiopática verdadeira inicia-se caracteristicamente entre 6 meses e 6 anos de vida; crises iniciadas fora dessa janela temporal justificam ressonância magnética imediata.',
    predisposicoesRaciaisEMorfologiaCraniana:
      'Forte correlação anatômica entre conformação de crânio e tipos tumorais:\n\n' +
      '- Raças braquicefálicas e gliomas: cães com crânio curto e arredondado (Boxer, Boston Terrier, Bulldog Inglês, Bulldog Francês) apresentam risco relativo extraordinariamente elevado para gliomas (oligodendrogliomas e astrocitomas) e adenomas hipofisários.\n' +
      '- Raças mesocefálicas e dolicocefálicas e meningiomas: cães com focinho longo e crânio alongado (Pastor Alemão, Golden Retriever, Labrador, Collies) desenvolvem preferencialmente meningiomas extra-axiais.\n' +
      '- Predisposições familiares e genéticas: o Boxer lidera as taxas de neoplasias intracranianas primárias no mundo canino; Golden Retrievers e Bernese Mountain Dogs concentram alta incidência de sarcomas histiocíticos intracranianos primários ou metastáticos.',
    incidenciaRelativaDosTiposHistologicos:
      'Prevalência proporcional entre os tumores primários caninos:\n\n' +
      '- Meningiomas: representam de 40% a 50% de todas as neoplasias intracranianas primárias diagnosticadas por imagem e histopatologia.\n' +
      '- Gliomas intra-axiais: constituem a segunda classe mais prevalente, abrangendo cerca de 30% a 35% dos casos primários caninos.\n' +
      '- Tumores de plexo coroide e ependimomas: respondem por cerca de 7% a 10% dos casos, com predomínio em cães de médio e grande porte.\n' +
      '- Neoplasias hipofisárias selares: estimadas em cerca de 10% a 15% das massas intracranianas em centros de referência, frequentemente associadas a síndrome de Cushing.',
    dadosEpidemiologicosDeMetastasesEncefalicas:
      'Ocorrência de lesões metastáticas intracranianas secundárias:\n\n' +
      '- Frequência global: neoplasias metastáticas para o encéfalo ocorrem em aproximadamente 10% a 15% dos cães com câncer avançado em séries de necropsia.\n' +
      '- Primários mais frequentes: o hemangiossarcoma esplênico ou atrial é a neoplasia que mais comumente envia êmbolos metastáticos para o cérebro, seguido de perto pelo melanoma oral maligno e adenocarcinomas de glândula mamária.',
  },

  pathogenesisTransmission: {
    doutrinaMonroKellieEComplacenciaCerebral:
      'Dinâmica física e mecânica no interior do crânio inelástico:\n\n' +
      '- Premissa de volume constante: a calvária óssea do cão adulto forma uma caixa rígida e fechada cujo volume interno é fixo, ocupado pelo parênquima encefálico (80%), sangue intravascular (10%) e líquor cefalorraquidiano (10%).\n' +
      '- Fisiologia da complacência intracraniana: durante a fase inicial de expansão de uma massa neoplásica, mecanismos compensatórios deslocam líquor para o espaço subaracnóideo medular e sangue venoso para fora do crânio, mantendo a pressão intracraniana (ICP) estável.\n' +
      '- Curva pressão-volume e esgotamento da complacência: quando a capacidade máxima de deslocamento venoso e liquórico se esgota, a curva de complacência sofre inflexão aguda; qualquer aumento volumétrico milimétrico subsequente desencadeia elevação exponencial da ICP, culminando em hipertensão intracraniana grave.',
    pressaoDePerfusaoCerebralEFisiologiaIsquemica:
      'Equação hemodinâmica e isquemia secundária do tecido nervoso:\n\n' +
      '- Fórmula hemodinâmica fundamental: a Pressão de Perfusão Cerebral é o gradiente que impulsiona o fluxo sanguíneo encefálico e é definida pela fórmula CPP = MAP - ICP (onde MAP é a pressão arterial média sistêmica e ICP é a pressão intracraniana).\n' +
      '- Nível crítico de perfusão: sob condições fisiológicas normais, a CPP canina situa-se acima de 60-70 mmHg; caso a ICP ultrapasse 20-30 mmHg ou a MAP caia por hipovolemia, a CPP colapsa abaixo de 50 mmHg, deflagrando isquemia cerebral global difusa.\n' +
      '- Mecanismos de autorregulação vascular: a microcirculação cerebral dilata-se para tentar manter o fluxo tecidual constante perante reduções de CPP, mas esse reflexo satura-se rapidamente em áreas peritumorais edemaciadas.',
    edemaVasogenicoEQuebraDaBarreiraHematoencefalica:
      'Mecanismos de acúmulo de fluido plasmático no parênquima cerebral:\n\n' +
      '- Disfunção da barreira hematoencefálica (BBB): as células neoplásicas secretam altos níveis de citocinas angiogênicas (sobretudo VEGF - fator de crescimento endotelial vascular), induzindo desestruturação das tight junctions entre as células endoteliais capilares.\n' +
      '- Edema vasogênico versus edema citotóxico: ao contrário do edema citotóxico (intracelular, por falha da bomba Na+/K+ na hipóxia aguda), o edema vasogênico peritumoral é puramente extracelular, formado por ultrafiltrado plasmático rico em proteínas que se dissemina livremente pela substância branca cerebral.\n' +
      '- Papel terapêutico dos corticosteroides: a prednisona atua seletivamente estabilizando as junções endoteliais da BBB e reduzindo a expressão de VEGF, o que explica a rápida melhora clínica após sua administração sem haver destruição celular tumoral.',
    herniacoesEncefalicasEDescompensacaoMecanica:
      'Deslocamentos parenquimatosos internos induzidos por gradientes de pressão:\n\n' +
      '- Herniação subfalcina (cingular): a expansão tumoral unilateral desloca o giro do cíngulo sob a foice do cérebro para o hemisfério contralateral, comprimindo artérias cerebrais anteriores.\n' +
      '- Herniação transtentorial caudal: o lobo temporal e occipital é forçado caudalmente através da incisura do tentório ósseo cerebelar, gerando compressão mecânica direta do mesencéfalo com perda do nível de consciência, midríase fixa unilateral ou bilateral e postura de descerebração.\n' +
      '- Herniação foraminal (amigdalar cerebelar): a porção caudal do cerebelo (vermis cerebelar) é empurrada para dentro do forame magno, esmagando o bulbo e os centros cardiorrespiratórios vitais, levando a parada respiratória fulminante e óbito imediato.',
    triadeDeCushingEAlertaDeHerniacaoIminente:
      'Reflexo fisiopatológico de sobrevivência que antecede o colapso vital:\n\n' +
      '- Mecanismo da hipertensão sistêmica: a isquemia intensa do bulbo e da formação reticular induz disparo simpático maciço, provocando vasoconstrição periférica intensa para elevar a pressão arterial média na tentativa desesperada de restaurar a CPP.\n' +
      '- Bradicardia reflexa mediada por barorreceptores: a elevação abrupta da pressão sistólica estimula barorreceptores no arco aórtico e seio carotídeo, desencadeando resposta vagal reflexa intensa com bradicardia acentuada.\n' +
      '- Padrão respiratório anormal: a compressão mecânica dos núcleos respiratórios bulbares e pontinos resulta em padrão de respiração atáxica ou de Cheyne-Stokes, constituindo alerta de herniação cerebelar foraminal iminente.',
  },

  pathophysiology: {
    mecanismosCelularesDeInfiltracaoGlioVascular:
      'Biologia celular da invasão no parênquima encefálico:\n\n' +
      '- Relação com a arquitetura neural: os gliomas caninos utilizam estruturas nativas pré-existentes como guia de dispersão (conhecidas como estruturas secundárias de Scherer), migrando ativamente ao longo de feixes de substância branca e no espaço perivascular.\n' +
      '- Secreção de metaloproteinases de matriz: células neoplásicas liberam metaloproteinases (MMP-2 e MMP-9) que clivam componentes da matriz extracelular perivascular, facilitando a disseminação contínua além das margens visualizadas na ressonância.\n' +
      '- Efeito sobre a substância cinzenta: meningiomas crescem primariamente por compressão lenta e extrínseca do córtex, mas variantes atípicas rompem a pia-máter e invadem o parênquima com rica reação astrocitária reativa.',
    angiogeneseVEGFEExtravasamentoPlasmatico:
      'Vascularização tumoral aberrante e disfuncional:\n\n' +
      '- Hipóxia intratumoral e ativação de HIF-1alfa: o crescimento tumoral acelerado gera núcleos hipóxicos que ativam o fator induzido por hipóxia (HIF-1alfa), disparando a produção desmedida de VEGF e angiopoietinas.\n' +
      '- Vasos neoformados anômalos: os novos capilares tumorais são tortuosos, dilatados, desprovidos de podócitos astrocitários de suporte e fenestrados, carecendo de barreira hematoencefálica funcional.\n' +
      '- Ruptura vascular e micro-hemorragias: a extrema fragilidade da parede desses vasos neoformados predispõe a sangramentos espontâneos no leito tumoral, visualizados como hipointensidades em sequências de suscetibilidade magnética (T2*/SWI).',
    ictogeneseTumoralEExcitotoxicidadePorGlutamato:
      'Bases fisiopatológicas das crises epilépticas estruturais:\n\n' +
      '- Desbalanço neuroquímico peritumoral: células gliais tumorais exibem recaptação deficiente e secreção ativa de glutamato no espaço extracelular através do trocador cistina-glutamato (sistema xc-).\n' +
      '- Hiperexcitabilidade cortical: o excesso crônico de glutamato extracelular estimula despolarizações paroxísticas em receptores NMDA e AMPA de neurônios peritumorais circundantes, gerando ictogênese focal.\n' +
      '- Perda de interneurônios inibitórios GABAérgicos: a compressão mecânica e isquemia perilesional provocam morte seletiva de interneurônios inibitórios, reduzindo o limiar convulsivo cortical.',
    efeitoDeMassaECompensacaoLiquorica:
      'Distorções mecânicas ventriculares e hidrocefalia obstrutiva:\n\n' +
      '- Desvio de estruturas da linha média: massas unilaterais volumétricas causam apagamento do ventrículo lateral ipsilateral e desvio contralateral do septo pelúcido e foice cerebral (midline shift).\n' +
      '- Obstrução do aqueduto mesencefálico de Sylvius: tumores da fossa caudal ou compressão do mesencéfalo bloqueiam o estreito canal aquedutal, impedindo a passagem do líquor do terceiro para o quarto ventrículo e deflagrando hidrocefalia obstrutiva aguda e grave.',
    neuroinflamacaoEDanoOxidativoSecundario:
      'Microambiente inflamatório e toxicidade neuronal secundária:\n\n' +
      '- Ativação microglial e recrutamento de macrófagos: a necrose tumoral e o estresse tecidual liberam padrões moleculares associados a dano (DAMPs), ativando microglia e macrófagos associados a tumor (TAMs).\n' +
      '- Cascata oxidativa perilesional: liberação sustentada de óxido nítrico, espécies reativas de oxigênio (ROS) e citocinas pró-inflamatórias (IL-1beta, TNF-alfa) que expandem o halo de apoptose neuronal ao redor da massa neoplásica.',
  },

  clinicalSignsPathophysiology: {
    sindromesDeNeurolocalizacaoEncefalica:
      'Raciocínio neuroanatômico estruturado para localização de lesões:\n\n' +
      '- Princípio fundamental da semiologia neurológica: os sinais clínicos decorrem da localização anatômica da massa encefálica e do edema circundante, e não de sua histopatologia específica.\n' +
      '- Quatro grandes síndromes encefálicas: o exame neurológico do cão categoriza a afecção em síndrome prosencefálica (telencéfalo e diencéfalo), síndrome de tronco encefálico, síndrome cerebelar ou síndrome vestibular central.',
    sinaisProsencefalicosECrisesEpilepticas:
      'Quadro clínico característico de lesões do telencéfalo e diencéfalo:\n\n' +
      '- Crises epilépticas focais ou generalizadas: sinal inicial mais frequente de tumores cerebrais no cão, presente em mais de 50% dos pacientes com envolvimento cortical frontal, temporal ou parietal.\n' +
      '- Alterações comportamentais e cognitivas: perda de condicionamento sanitário domiciliar, apatia, demência, agressividade repentina, andar compulsivo sem rumo (pacing) e apoio de cabeça contra superfícies rígidas (head pressing).\n' +
      '- Déficits contralaterais ao tumor: diminuição de reações posturais (propriocepção consciente diminuída nos membros contralaterais) e ausência de resposta de ameaça com reflexo pupilar à luz (PLR) normal no olho contralateral.\n' +
      '- Pleurotótono e marcha em círculos: cão tende a caminhar compulsivamente em círculos amplos direcionados para o mesmo lado da lesão encefálica (círculos ipsilaterais).',
    sinaisDeTroncoEncefalicoENervosCranianos:
      'Manifestações graves de envolvimento do mesencéfalo, ponte e bulbo:\n\n' +
      '- Depressão acentuada do nível de consciência: sonolência patológica, estupor ou coma por acometimento direto do Sistema Ativador Reticular Ascendente (SARA).\n' +
      '- Déficits múltiplos de nervos cranianos: estrabismo ventral/ventrolateral (III par), ausência de sensibilidade facial e reflexo palpebral diminuído (V par), paresia/paralisia facial com queda labial (VII par), disfagia e reflexo de deglutição ausente (IX e X pares).\n' +
      '- Paresia com padrão de neurônio motor superior (UMN): tetraparesia ou hemiparesia com tônus muscular preservado a aumentado e reflexos espinhais normais ou hiper-reflexivos.',
    disfuncoesCerebelaresEVestibularesCentrais:
      'Disfunções de equilíbrio, coordenação motora e reflexos vestibulares:\n\n' +
      '- Síndrome cerebelar clássica: ataxia hipermetrizada com passada em passos de ganso (dismetria), tremores de intenção acentuados na aproximação da cabeça ao prato de alimento, aumento da base de sustentação sem paresia associada e reflexo de ameaça ausente com visão preservada ipsilateralmente.\n' +
      '- Síndrome vestibular central: nistagmo espontâneo ou posicional que pode ser vertical, horizontal ou rotatório (frequentemente mudando de direção com a posição da cabeça), inclinação da cabeça (head tilt), rolamentos corporais e presença mandatória de déficits de reações posturais ipsilaterais (diferencial chave do vestibular periférico).',
    tabelaNeurolocalizacaoClinica: {
      kind: 'clinicalTable',
      caption: 'Tabela 2 — Neurolocalização Clínica dos Tumores Encefálicos em Cães',
      headers: ['Região Neuroanatômica', 'Principais Sinais Clínicos', 'Exame Neurológico Típico', 'Reflexos e Reações Posturais'],
      rows: [
        ['Prosencéfalo (Telencéfalo)', 'Crises epilépticas focais ou generalizadas; head pressing; andar compulsivo; demência', 'Nível de consciência normal a obtuso; marcha em círculos amplos ipsilaterais à lesão', 'Reações posturais diminuídas nos membros contralaterais; ameaça ausente contralateral com PLR normal'],
        ['Prosencéfalo (Diencéfalo / Hipotálamo)', 'Desregulação de temperatura e apetite; adipsia ou polidipsia; distúrbios de sono; endocrinopatias', 'Estupor leve; cegueira central; sinais de disfunção hipofisária (Cushing)', 'Déficits posturais contralaterais; respostas visuais bilaterais alteradas em macroadenomas'],
        ['Mesencéfalo (Tronco Anterior)', 'Estupor a coma; postura de descerebração (extensão rígida dos 4 membros com opistótono)', 'Midríase fixa ou anisocoria; ausência de PLR direto ipsilateral; estrabismo ventrolateral', 'Tetraparesia UMN severa; hiper-reflexia patelar e extensora cruzada nos quatro membros'],
        ['Ponte e Bulbo (Tronco Posterior)', 'Depressão profunda do sensório; respiração atáxica ou de Cheyne-Stokes; risco de parada respiratória', 'Déficits múltiplos de pares cranianos V, VII, VIII, IX, X e XII; ptose labial; disfagia; paralisia de língua', 'Tetraparesia UMN; propriocepção ausente nos 4 membros; reflexos espinhais normais ou hiperativos'],
        ['Cerebelo', 'Ataxia cerebelar sem perda de força (sem paresia); tremores de intenção cefálicos; tônus extensor aumentado', 'Hipermetria com passos de ganso; cabeça oscilante; nistagmo posicional bilateral', 'Propriocepção presente ou dismétrica; reflexo de ameaça ausente ipsilateral com PLR normal'],
        ['Sistema Vestibular Central', 'Inclinação de cabeça (head tilt); ataxia vestibular com quedas; nistagmo vertical ou que muda de direção', 'Queda ou rolamento para o lado da lesão; perda de equilíbrio vestibular com náusea e vômito', 'Déficits posturais ipsilaterais à lesão (diferencial obrigatório do vestibular periférico)'],
      ],
    },
  },

  diagnosis: {
    criteriosDeSuspeicaoClinicaEOportunidade:
      'Gatilhos diagnósticos para o clínico veterinário:\n\n' +
      '- Regra clínica do cão senil: crises convulsivas com início após os 5 a 6 anos de vida impõem investigação neurológica de imagem avançada, independentemente da frequência das crises.\n' +
      '- Presença de déficits interictais: cães com crises estruturais frequentemente exibem déficits proprioceptivos sutis, alterações comportamentais ou assimetria facial nos períodos entre as crises (ao contrário de epilépticos idiopáticos puros).\n' +
      '- Exclusão metódica de causas metabólicas e vasculares: hemograma, bioquímica com glicemia, eletrólitos, função renal e hepática devem ser realizados preliminarmente.',
    ressonanciaMagneticaPadrãoOuroSequencias:
      'Protocolo multiparamétrico de excelência em campo alto (1.5T a 3.0T):\n\n' +
      '- Sequência T1 pré e pós-contraste: mapeia a morfologia anatômica nativa e evidencia a quebra da barreira hematoencefálica pelo acúmulo de Gadolínio no estroma tumoral.\n' +
      '- Sequência T2 ponderada e FLAIR: T2 mostra hipersinal no tumor e tecido edemaciado; o FLAIR (Fluid Attenuated Inversion Recovery) atenua o sinal da água livre liquórica, evidenciando com clareza o halo de edema vasogênico perilesional.\n' +
      '- Sequências de suscetibilidade magnética (T2* GRE / SWI): fundamentais para detectar micro-hemorragias intratumorais e depósitos de hemossiderina, abundantes em hemangiossarcomas e gliomas de alto grau.\n' +
      '- Difusão tecidual (DWI) e mapa de ADC: avalia o movimento browniano da água; alta celularidade tumoral restringe a difusão hídrica gerando hipossinal no mapa de ADC.',
    limitacoesRadiologicasEDuralTailFalso:
      'Armadilhas diagnósticas na interpretação das imagens de ressonância:\n\n' +
      '- Não patognomonia do sinal da cauda dural (dural tail sign): embora classicamente associado a meningiomas (espessamento e realce da dura-máter adjacente à massa), pode ocorrer em linfomas primários, sarcomas histiocíticos e em meningoencefalites inflamatórias (MUE).\n' +
      '- Realce anelar periférico (ring enhancement): visualizado em gliomas anaplásicos e metástases com necrose central, mas indistinguível por imagem de abscessos cerebrais bacterianos ou infartos isquêmicos subagudos.',
    tomografiaComputadorizadaIndicacoes:
      'Papel da TC craniana no manejo neuro-oncológico:\n\n' +
      '- Resolução óssea superior: excelente para caracterizar hiperostose calvariana associada a meningiomas, osteólise de lâmina cribriforme em tumores nasais e avaliar destruição do meato acústico.\n' +
      '- Planejamento de radioterapia conformacional: tomografia de crânio com contraste é obrigatória para delineamento volumétrico ósseo e cálculo de dose de absorção radioterápica.\n' +
      '- Limitação marcante: baixa resolução de contraste para parênquima cerebral e fossa caudal em comparação com a ressonância magnética.',
    biopsiaEstereotaxicaGuiadaPorImagem:
      'Procedimento de padrão-ouro para diagnóstico tecidual definitivo:\n\n' +
      '- Técnicas estereotáxicas contemporâneas: sistemas frame-based (com anel rígido de fixação) e frameless (neuronavigação óptica guiada por ressonância prévia) permitem acesso a lesões profundas.\n' +
      '- Segurança e rendimento diagnóstico: coortes atuais de neurocirurgia veterinária (Jeffery 2025; Rossmeisl & Garcia-Mora 2025) demonstram rendimento diagnóstico superior a 95% com taxas de morbidade aceitáveis (cerca de 5%).\n' +
      '- Indicação primária: essencial quando a massa é cirurgicamente inoperável e se planeja radioterapia definitiva ou ensaio clínico direcionado.',
    contraindicacoesEPeligrosDaPuncaoLiquorica:
      'Risco fatal de herniação na coleta de LCR cisternal:\n\n' +
      '- Efeito de massa e gradiente pressórico: se a ressonância magnética demonstrar efeito de massa volumétrico, apagamento ventricular, desvio de linha média ou edema difuso, a punção cisternal da cisterna magna é FORMALMENTE CONTRAINDICADA.\n' +
      '- Mecanismo da herniação catastrófica: a perfuração da dura-máter na cisterna magna gera descompressão súbita da coluna de líquido vertebral, criando um gradiente de sucção descendente que puxa o cerebelo e o bulbo para dentro do forame magno com parada respiratória instantânea no ato da punção.\n' +
      '- Alternativa se estritamente necessária: se houver forte suspeita de MUE infecciosa/imunomediada sem massa expansiva nítida, pode-se considerar punção lombar cuidadosa (L5-L6) após terapia osmótica.',
    estadiamentoOncologicoSistemicoCompleto:
      'Investigação extracraniana para exclusão de sítios primários e comorbidades:\n\n' +
      '- Exames torácicos e abdominais: radiografias torácicas em 3 projeções (pesquisa de metástases pulmonares de carcinomas ou primários pulmonares) e ultrassonografia abdominal com varredura esplênica, hepática e renal.\n' +
      '- Avaliação cardiovascular: ecocardiograma com visualização do átrio direito para pesquisa de hemangiossarcoma e dosagem seriada de pressão arterial sistêmica.\n' +
      '- Avaliação de linfonodos e pele: palpação cuidadosa de linfonodos periféricos e inspeção dermatológica minuciosa em busca de melanomas cutâneos ou nodulações mamárias.',
    tabelaDiagnosticoDiferencialEstrutural: {
      kind: 'clinicalTable',
      caption: 'Tabela 3 — Diagnóstico Diferencial de Afecções Estruturais e Lesões Expansivas Intracranianas',
      headers: ['Condição Clínica', 'Perfil do Paciente e Curso', 'Padrão na Ressonância Magnética (MRI)', 'Achados no Líquor (LCR) e Diagnóstico Distintivo'],
      rows: [
        ['Neoplasia Primária (Meningioma / Glioma)', 'Cães > 5-6 anos; evolução crônica progressiva; crises epilépticas interictais', 'Massa com realce marcante por gadolínio; efeito de massa e edema vasogênico perilesional', 'Dissociação albuminocitológica (proteína elevada com celularidade normal); biópsia confirma'],
        ['Meningoencefalite Imunomediada (MUE / GME / NME)', 'Cães jovens a meia-idade (<4-6 anos); braquicefálicos e raças toy; evolução aguda', 'Lesões frequentemente multifocais ou difusas na substância branca; realce meníngeo/parenquimatoso', 'Pleocitose acentuada mononuclear ou mista; bandas oligoclonais; resposta a imunossupressores'],
        ['Acidente Vascular Encefálico (AVE Isquêmico / Hemorrágico)', 'Cães idosos com comorbidades (hipertensão, DRC, Cushing); início hiperagudo não progressivo', 'Lesão focal restrita a território vascular arterial; ausência de realce inicial; restrição forte na difusão', 'Líquor normal ou xantocrômico; melhora espontânea gradativa nos dias subsequentes'],
        ['Abscesso Cerebral Bacteriano ou Fúngico', 'Qualquer idade; histórico de otite, corpos estranhos, infecções sistêmicas; febre', 'Lesão anelar em T1 pós-contraste com cápsula fina e regular; hipointenso em T2 central (necrose)', 'Pleocitose neutrofílica severa; cultura positiva para bactérias ou visualização de leveduras fúngicas'],
        ['Cisto Intracraniano (Epidermoide / Aracnoide)', 'Cães jovens ou achado incidental em idosos; curso extremamente lento e indolente', 'Conteúdo idêntico ao LCR em todas as sequências; sem edema perilesional e sem realce por contraste', 'Líquor inteiramente límpido e acelular; ausência de captação de contraste gadolínio'],
      ],
    },
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Reconhecimento do Gatilho Clínico e Neurolocalização Minuciosa',
        description: 'Identificação de crises epilépticas de início tardio (>5-6 anos) e mapeamento anatômico estruturado das síndromes encefálicas.',
        isGoldStandard: false,
        clinicalUtility: 'Define a probabilidade pré-teste de afecção estrutural e direciona o segmento encefálico prioritário na imagem.',
      },
      {
        stepNumber: 2,
        title: 'Triagem Laboratorial Metabólica e Hemodinâmica Completa',
        description: 'Hemograma, bioquímica hepatorrenal, glicemia em jejum, eletrólitos, urinálise e mensuração de pressão arterial sistêmica.',
        isGoldStandard: false,
        clinicalUtility: 'Descarta causas extracranianas e metabólicas de crises epilépticas e encefalopatia antes do investimento neurocirúrgico.',
      },
      {
        stepNumber: 3,
        title: 'Estadiamento Oncológico Sistêmico Extracraniano',
        description: 'Radiografias torácicas em 3 projeções, ultrassonografia abdominal completa e ecocardiograma focado em átrio direito.',
        isGoldStandard: false,
        clinicalUtility: 'Diferencia neoplasia intracraniana primária de doença metastática disseminada (hemangiossarcoma, melanoma, carcinomas).',
      },
      {
        stepNumber: 4,
        title: 'Ressonância Magnética (MRI) Encefálica Multiparamétrica',
        description: 'Exame em campo alto com sequências T1 pré/pós-Gadolínio, T2 ponderado, FLAIR, T2* GRE/SWI e difusão DWI/ADC.',
        isGoldStandard: true,
        clinicalUtility: 'Modalidade de escolha para caracterização anatômica, compartimentalização, mapeamento de edema e planejamento terapêutico.',
      },
      {
        stepNumber: 5,
        title: 'Tomografia Computadorizada (TC) de Crânio Contrastada',
        description: 'Avaliação detalhada da arquitetura óssea craniana, hiperostose associada, osteólise de calvária e lâmina cribriforme.',
        isGoldStandard: false,
        clinicalUtility: 'Indispensável para planejamento de radioterapia conformacional e avaliação de invasão da tábua óssea por meningiomas.',
      },
      {
        stepNumber: 6,
        title: 'Avaliação Crítica e Contraindicação de Coleta Liquórica Cisternal',
        description: 'Verificação obrigatória na ressonância de efeito de massa e herniação antes de autorizar qualquer punção de líquor.',
        isGoldStandard: false,
        clinicalUtility: 'Prevenção ativa de descompressão foraminocisternal súbita e herniação amigdalar cerebelar catastrófica durante a coleta.',
      },
      {
        stepNumber: 7,
        title: 'Biópsia Cerebral Estereotáxica Guiada por Imagem',
        description: 'Coleta de fragmentos teciduais encefálicos com sistema de neuronavigação guiado por tomografia ou ressonância prévia.',
        isGoldStandard: true,
        clinicalUtility: 'Padrão-ouro absoluto para diagnóstico histológico definitivo em lesões profundas, inoperáveis ou candidatas à radioterapia.',
      },
      {
        stepNumber: 8,
        title: 'Exame Histopatológico e Imuno-histoquímico com Critérios CBTC/NCI',
        description: 'Avaliação morfológica tecidual, graduação celular específica veterinária e painel imuno-histoquímico (GFAP, Olig2, Ki-67).',
        isGoldStandard: true,
        clinicalUtility: 'Classifica o subtipo e grau tumoral, fornece estimativa prognóstica e direciona a quimioterapia ou alvos moleculares.',
      },
      {
        stepNumber: 9,
        title: 'Monitoramento Clínico Seriado e Vigilância de Hipertensão Intracraniana',
        description: 'Avaliação periódica com Escala de Coma de Glasgow Modificada (MGCS), controle pressórico e eletrocardiográfico para tríade de Cushing.',
        isGoldStandard: false,
        clinicalUtility: 'Detecta descompensação neurológica precoce exigindo terapia osmótica de urgência e reavaliação de imagem.',
      },
    ],
  },

  treatment: {
    terapiaDeEmergenciaEReduçãoDaHipertensaoIntracraniana:
      'Medidas neuroprotetoras imediatas na descompensação aguda:\n\n' +
      '- Elevação da cabeça a 30 graus: manter a cabeça e o tronco anterior elevados em ângulo de 30° em relação ao plano horizontal, favorecendo a drenagem venosa pelo plexo jugular e diminuindo a pressão intracraniana.\n' +
      '- Posicionamento cervical reto: evitar flexão, torção ou rotação do pescoço; contraindicação absoluta de coleiras cervicais, cordas ou contenções que comprimam veias jugulares externas.\n' +
      '- Otimização da oxigenação e ventilação: manter PaO2 acima de 80-100 mmHg; controle rigoroso da PaCO2 entre 35 e 40 mmHg (normocapnia estrita), pois hipercapnia desencadeia vasodilatação cerebral maciça e explosão da ICP, enquanto hipocapnia agressiva (<30 mmHg) provoca vasoconstrição com isquemia severa.\n' +
      '- Manutenção da volemia e pressão de perfusão: reposição com cristaloides isotônicos balanceados para garantir MAP normal a elevada (>80-90 mmHg); JAMAIS utilizar soluções hipotônicas (como NaCl 0,45% ou Glicose 5%), pois a água livre atravessa prontamente a barreira lesada e agrava o edema cerebral fatalmente.',
    terapiaHiperosmolarManitolEHipertonico:
      'Manejo farmacológico osmótico da hipertensão intracraniana descompensada:\n\n' +
      '- Manitol a 20%: dose de 0,5 a 1,0 g/kg IV administrado lentamente em 15 a 20 minutos; atua em dois tempos: imediatamente reduz a viscosidade sanguínea e melhora o fluxo microvascular reflexo (reduzindo vasoconstrição), e subsequentemente (15-30 min) estabelece gradiente osmótico que atrai água livre do parênquima cerebral intacto para o leito vascular.\n' +
      '- Cuidados com o manitol: contraindicado em desidratação grave, choque hipovolêmico não corrigido e insuficiência renal anúrica; monitorar osmolaridade sérica (suspender se >320 mOsm/L).\n' +
      '- Solução salina hipertônica a 7,5%: dose de 3 a 5 mL/kg IV infundida em 10 a 15 minutos; alternativa de elevação rápida de volemia e redução de ICP com excelente eficácia em pacientes hipotensos ou hipovolêmicos.',
    corticoterapiaParaEdemaVasogenico:
      'Uso racional de glicocorticoides e plano de desmame rápido:\n\n' +
      '- Dose e mecanismo: prednisona ou prednisolona na dose de 0,5 a 1,0 mg/kg/dia VO (dividido a cada 12 horas ou administrado a cada 24 horas); reduz rapidamente a permeabilidade das tight junctions endoteliais e a síntese de VEGF, diminuindo o edema vasogênico peritumoral.\n' +
      '- Desmame rápido mandatório: assim que houver estabilização dos sinais clínicos (48 a 72 horas), a dose deve ser gradativamente reduzida em 25% a 50% a cada 3 a 5 dias, almejando a menor dose em dias alternados necessária para controle sintomático.\n' +
      '- Efeitos catabólicos deletérios: o uso prolongado de doses imunossupressoras (>2 mg/kg/dia) acarreta sarcopenia muscular intensa, fraqueza severa dos membros posteriores, poliúria/polidipsia com incontinência, calcinose cutânea e risco de infecções oportunistas secundárias.',
    controleAnticonvulsivanteLevetiracetamEFenobarbital:
      'Protocolos de controle da ictogênese tumoral:\n\n' +
      '- Levetiracetam como primeira linha: dose de 20 a 30 mg/kg VO a cada 8 horas (ou formulação de liberação estendida XR 30 mg/kg VO a cada 12 horas); fármaco de eleição por rápido início de ação, excelente penetração na barreira e total ausência de metabolismo e sobrecarga hepática.\n' +
      '- Manejo na emergência de crises: na vigência de status epilepticus ou crises em salvas, administrar dose de ataque de levetiracetam de 60 mg/kg IV lento, associado a midazolam (0,2 a 0,5 mg/kg IV ou intranasal).\n' +
      '- Associação com fenobarbital: indicado em crises refratárias ao levetiracetam, na dose de 2,5 a 3,0 mg/kg VO a cada 12 horas, com monitoramento dos níveis séricos terapêuticos após 2 a 3 semanas (alvo: 15 a 35 mcg/mL).\n' +
      '- Contraindicação de profilaxia cega: não há justificativa clínica nem evidência científica que respalde prescrever anticonvulsivantes profiláticos em cães assintomáticos apenas pelo achado incidental de tumor encefálico na imagem.',
    cirurgiaResseccaoCraniectomiaGTRvsSTR:
      'Neurocirurgia oncológica e impacto da ressecção completa na sobrevida:\n\n' +
      '- Craniotomia e craniectomia guiadas: acesso cirúrgico transfrontal, rostrotentorial ou suboccipital conforme a localização da massa, empregando magnificação cirúrgica com microscópio, aspirador ultrassônico (CUSA) e neuronavigação óptica.\n' +
      '- Ressecção total macroscópica (GTR - Gross Total Resection): estudo contemporâneo de Rossmeisl et al. (2026, n=41) comprovou que atingir GTR em meningiomas caninos resulta em sobrevida mediana de 694 dias (vs 349 dias em ressecção subtotal - STR), além de permitir que 90% dos cães fiquem inteiramente livres de crises epilépticas pós-operatórias (vs apenas 31% no grupo STR).\n' +
      '- Indicação em gliomas: a ressecção de gliomas é tecnicamente mais desafiadora pelo caráter infiltrativo intraparenquimatoso, reservada para cães selecionados com massas hemisféricas frontais acessíveis.',
    radioterapiaEstereotaxicaEIMRT:
      'Técnicas contemporâneas de irradiação de precisão milimétrica:\n\n' +
      '- Radioterapia estereotáxica (SRT / SRS): modalidade de feixe externo guiada por imagem que administra doses ablativas elevadas em 1 a 3 frações com margens submilimétricas, poupando o tecido nervoso normal adjacente.\n' +
      '- Evidência recente em meningiomas: o grande estudo multicêntrico de Geiger et al. (2025, n=285) demonstrou sobrevida mediana de 696 dias em cães tratados com SRT para meningiomas intracranianos presumidos, consolidando a SRT como tratamento definitivo de primeira escolha para lesões inoperáveis ou de base do crânio.\n' +
      '- Radioterapia de intensidade modulada (IMRT) em gliomas: Fukuyama et al. (2025, n=55) documentou sobrevida mediana de 432 dias com IMRT em gliomas caninos presumidos, demonstrando controle tumoral sustentado com baixa incidência de toxicidade aguda.',
    quimioterapiaSistemicaELimitesDaLomustina:
      'Avaliação crítica da farmacoterapia antineoplásica sistêmica:\n\n' +
      '- Limitação da barreira hematoencefálica: a grande maioria dos quimioterápicos citotóxicos hidrossolúveis não atinge concentrações terapêuticas efetivas no parênquima cerebral.\n' +
      '- Lomustina (CCNU): agente alquilante lipossolúvel na dose de 60 a 70 mg/m² VO a cada 3 a 4 semanas; embora historicamente prescrita para gliomas caninos, o estudo de referência de Hu et al. (2015) comprovou ausência de benefício estatístico na sobrevida frente aos cuidados paliativos isolados em gliomas presumidos, não devendo ser considerada monoterapia curativa padrão.\n' +
      '- Papel no sarcoma histiocítico e linfoma: a lomustina mantém utilidade clínica adjuvante quando há comprovação citológica/histológica de sarcoma histiocítico ou linfoma do SNC.',
    cuidadosPaliativosEManejoAmbulatorial:
      'Estratégias de suporte e manutenção da qualidade de vida domiciliar:\n\n' +
      '- Tríade de suporte paliativo: controle rigoroso das convulsões com anticonvulsivantes, dose mínima eficaz de prednisona para controle de edema e analgesia multimodal (gabapentina 10 mg/kg VO q8h se houver estiramento ou dor meníngea).\n' +
      '- Sobrevida com cuidados paliativos isolados: a mediana de sobrevida de cães recebendo exclusivamente prednisona e anticonvulsivante varia de 2 a 3 meses (60 a 90 dias), com deterioração progressiva que frequentemente motiva a eutanásia humanitária.\n' +
      '- Avaliação contínua da qualidade de vida: orientar o tutor sobre parâmetros de bem-estar (apetite, mobilidade, ausência de dor e interação afetiva) para guiar decisões compassivas.',
    tabelaModalidadesTerapeuticasESobrevida: {
      kind: 'clinicalTable',
      caption: 'Tabela 4 — Modalidades Terapêuticas, Desfechos Clínicos e Sobrevida Comparativa',
      headers: ['Abordagem Terapêutica', 'Indicação Primária / Tumor', 'Sobrevida Mediana Documentada', 'Vantagens, Limitações e Evidências Recentes'],
      rows: [
        ['Paliação com Prednisona e Anticonvulsivante', 'Todos os tumores em que cirurgia ou RT não são viáveis', '60 a 90 dias (2 a 3 meses)', 'Alívio sintomático rápido do edema; não impede progressão tumoral; sarcopenia por corticoide'],
        ['Cirurgia: Ressecção Total Macroscópica (GTR)', 'Meningiomas acessíveis em convexidade cerebral', '694 dias (≈ 23 meses)', 'Rossmeisl et al. (2026, n=41): 90% livres de crises; melhora imediata do efeito de massa'],
        ['Cirurgia: Ressecção Subtotal (STR)', 'Meningiomas de base ou com invasão vascular', '349 dias (≈ 11,5 meses)', 'Reduz massa tumoral mas exige radioterapia pós-operatória; apenas 31% livres de crises'],
        ['Radioterapia Estereotáxica (SRT / SRS)', 'Meningiomas (inoperáveis ou pós-STR) e gliomas', '696 dias em meningiomas presumidos', 'Geiger et al. (2025, n=285): tratamento não invasivo em 1-3 frações com excelente controle locorregional'],
        ['Radioterapia de Intensidade Modulada (IMRT)', 'Gliomas intra-axiais e tumores de hipófise', '432 dias em gliomas presumidos', 'Fukuyama et al. (2025, n=55): modulação de feixe que poupa tecidos vizinhos com boa tolerância'],
        ['Cirurgia + Radioterapia Adjuvante', 'Meningiomas com margens infiltradas ou grau II/III', 'Superior a 700-900 dias em centros especializados', 'Associação que confere o mais longo intervalo livre de progressão documentado na literatura'],
        ['Quimioterapia com Lomustina (CCNU)', 'Gliomas intra-axiais presumidos e sarcoma histiocítico', 'Sem ganho comprovado vs paliação em gliomas', 'Hu et al. (2015): não provou superioridade estatística na sobrevida; risco de mielossupressão'],
      ],
    },
    modalidadesPrincipais: [
      {
        drug: 'Levetiracetam (Keppra)',
        dose: '20 a 30 mg/kg VO q8h (ou formulação estendida XR 30 mg/kg VO q12h); dose de ataque na crise: 60 mg/kg IV lento',
        indication: 'Anticonvulsivante de primeira escolha para crises epilépticas estruturais e prevenção de status epilepticus.',
        mechanism: 'Liga-se seletivamente à proteína vesicular sináptica SV2A, inibindo a liberação pré-sináptica de glutamato.',
        precautions: 'Ausência de metabolismo hepático (eliminação renal); sedação transitória nas primeiras 48h; não descontinuar abruptamente.',
        level: 'A',
      },
      {
        drug: 'Prednisona / Prednisolona',
        dose: '0,5 a 1,0 mg/kg/dia VO (dividido q12h ou dose única q24h) por 48-72h; desmame rápido para menor dose em dias alternados',
        indication: 'Redução do edema vasogênico peritumoral e estabilização da barreira hematoencefálica.',
        mechanism: 'Reduz a expressão endotelial de VEGF e restaura a integridade das tight junctions da microvasculatura cerebral.',
        precautions: 'Não destrói a neoplasia; uso crônico causa sarcopenia grave, imunossupressão, poliúria/polidipsia e calcinose.',
        level: 'A',
      },
      {
        drug: 'Manitol a 20%',
        dose: '0,5 a 1,0 g/kg (2,5 a 5,0 mL/kg) IV infundido lentamente em 15 a 20 minutos',
        indication: 'Emergência de hipertensão intracraniana descompensada, risco iminente de herniação ou deterioração da escala de Glasgow.',
        mechanism: 'Redução imediata da viscosidade sanguínea com melhora da perfusão microvascular, seguida de gradiente osmótico que extrai água do parênquima cerebral intacto.',
        precautions: 'Contraindicado em hipovolemia, hipotensão descompensada e anúria renal; monitorar osmolaridade sérica (limite 320 mOsm/L).',
        level: 'A',
      },
      {
        drug: 'Cloreto de Sódio Hipertônico a 7,5%',
        dose: '3 a 5 mL/kg IV infundido lentamente em 10 a 15 minutos',
        indication: 'Terapia hiperosmolar de emergência para hipertensão intracraniana aguda, especialmente se acompanhada de hipotensão ou choque.',
        mechanism: 'Extração rápida de fluido tecidual para o leito intravascular por potente gradiente osmolar e rápida expansão volêmica plasmática.',
        precautions: 'Monitorar natremia sérica; evitar em hipernatremia preexistente severa (>165 mEq/L); não infundir em veias periféricas finas.',
        level: 'B',
      },
      {
        drug: 'Fenobarbital',
        dose: '2,5 a 3,0 mg/kg VO q12h; monitorar concentração sérica após 14 a 21 dias (alvo: 15 a 35 mcg/mL)',
        indication: 'Crises epilépticas estruturais refratárias ao levetiracetam ou terapia combinada de resgate.',
        mechanism: 'Potencialização da ação inibitória pós-sináptica do ácido gama-aminobutírico (GABA) via receptores GABAA.',
        precautions: 'Hepatotoxicidade potencial; monitorar enzimas hepáticas e albumina; indução enzimática do citocromo P450.',
        level: 'B',
      },
      {
        drug: 'Zonisamida',
        dose: '5 a 10 mg/kg VO q12h (5 mg/kg se associada a fenobarbital; 10 mg/kg em monoterapia)',
        indication: 'Anticonvulsivante de segunda linha para crises estruturais focais ou generalizadas.',
        mechanism: 'Bloqueio de canais de sódio voltagem-dependentes e canais de cálcio do tipo T; inibição fraca da anidrase carbônica.',
        precautions: 'Raras reações de idiossincrasia hepática e renal; sedação e inapetência transitórias no início do tratamento.',
        level: 'B',
      },
      {
        drug: 'Midazolam',
        dose: '0,2 a 0,5 mg/kg IV lento ou intranasal (IN); pode ser repetido até 2 vezes com intervalo de 10 minutos',
        indication: 'Interrupção imediata de crises convulsivas ativas em emergência ou status epilepticus.',
        mechanism: 'Agonista alostérico do receptor GABAA, aumentando a frequência de abertura dos canais de cloro neuronais.',
        precautions: 'Curta duração de ação (15 a 30 min); associar imediatamente a anticonvulsivante de manutenção (levetiracetam IV).',
        level: 'A',
      },
      {
        drug: 'Lomustina (CCNU)',
        dose: '60 a 70 mg/m² VO a cada 3 a 4 semanas com heparinização ou suporte hepatoprotetor',
        indication: 'Quimioterapia de resgate para sarcoma histiocítico e linfoma do SNC; uso controverso em gliomas.',
        mechanism: 'Agente alquilante nitrosoureia altamente lipossolúvel com capacidade de ultrapassar a barreira hematoencefálica.',
        precautions: 'Mielossupressão cumulativa com neutropenia nadir aos 7-10 dias; hepatotoxicidade cumulativa severa; monitorar ALT semanalmente.',
        level: 'C',
      },
    ],
  },

  complications: {
    herniacaoCerebralEParadaCardiorrespiratoria:
      'Complicação mais letal do efeito de massa intracraniano:\n\n' +
      '- Herniação transtentorial caudal: deslocamento mecânico do lobo occipital comprimindo o mesencéfalo, manifestando-se por coma progressivo, midríase arreativa e postura de descerebração.\n' +
      '- Herniação foraminal e colapso respiratório: compressão bulbar fulminante no forame magno com parada respiratória instantânea e óbito caso manobras hiperosmolares e intubação não sejam efetuadas em minutos.',
    statusEpilepticusEIsquemiaNeuronal:
      'Emergência neurológica de crises contínuas ou em salvas:\n\n' +
      '- Atividade convulsiva ininterrupta: crises com duração superior a 5 minutos ou duas crises sem recuperação do sensório no intervalo caracterizam status epilepticus.\n' +
      '- Excitotoxicidade e hipertermia: liberação contínua de glutamato gera influxo massivo de cálcio intraneuronal, hipertermia sistêmica grave (>40°C), rabdomiólise e necrose cortical irreversível.',
    apoplexiaTumoralEHemorragiaIntracraniana:
      'Sangramento espontâneo agudo no leito neoplásico:\n\n' +
      '- Fisiopatologia da apoplexia: rotura súbita de vasos neoplásicos anômalos frágeis ou necrose cavitária rápida, especialmente comum no hemangiossarcoma metastático e oligodendroglioma anaplásico.\n' +
      '- Manifestação clínica hiperaguda: cão previamente estável apresenta perda súbita de consciência, sinais neurológicos focais assimétricos agudos e colapso da pressão de perfusão cerebral.',
    complicacoesIatrogenicasDeCorticoidesEmAltasDoses:
      'Toxicidade severa por excesso de glicocorticoides:\n\n' +
      '- Sarcopenia e debilidade muscular: atrofia avançada da musculatura apendicular e temporal, impedindo a locomoção do cão e mascarando déficits neurológicos reais.\n' +
      '- Complicações sistêmicas: infecções urinárias subclínicas silenciosas, gastropatia ulcerativa grave com melena, calcinose cutânea pruriginosa e hiperglicemia secundária.',
    toxicidadeTardiaDaRadioterapiaENecroseCerebral:
      'Efeitos adversos tardios no parênquima cerebral irradiado:\n\n' +
      '- Radionecrose cerebral tardia: lesão desmielinizante e necrótica vascular tardia (geralmente ocorrendo entre 6 e 18 meses após a radioterapia), mimetizando recidiva tumoral na imagem por apresentar novo realce e edema perilesional.\n' +
      '- Manejo da radionecrose: exige diferenciação minuciosa na ressonância (sequências de perfusão/espectroscopia) e novo ciclo de corticoterapia ou bevacizumabe anti-VEGF.',
  },

  prevention: {
    deteccaoPrecoceEMonitoramentoDoPacienteIdoso:
      'Rastreio proativo em cães de meia-idade a idosos:\n\n' +
      '- Valorização de queixas sutis do tutor: alterações de temperamento, andar em círculos, tropeços em quinas ou perda súbita do aprendizado sanitário em cães com mais de 5 a 6 anos devem motivar exame neurológico minucioso.\n' +
      '- Investigação precoce de crises convulsivas: evitar o atraso de meses atribuindo crises isoladas no idoso a distúrbios idiopáticos; a ressonância precoce permite identificar tumores em fase volumétrica reduzida, ampliando as chances de ressecção total cirúrgica (GTR) ou radioterapia estereotáxica (SRT) curativa.',
    prevencaoDeAcidentesEDanoTraumaticoSecundario:
      'Adaptações de segurança física no ambiente domiciliar:\n\n' +
      '- Proteção ambiental: instalação de grades em escadas e piscinas, bloqueio de sacadas e superfícies pontiagudas para prevenir quedas graves durante crises convulsivas ou episódios de desorientação.\n' +
      '- Cuidados durante a crise epiléptica: orientar o tutor a nunca introduzir as mãos na cavidade oral do animal durante a crise (risco grave de mordedura acidental) e afastar móveis próximos para evitar contusões cranianas secundárias.',
    orientacaoAoTutorEEstratificacaoDeExpectativas:
      'Comunicação compassiva e alinhamento prognóstico com a família:\n\n' +
      '- Transparência sobre objetivos terapêuticos: esclarecer que a radioterapia e a cirurgia buscam maximizar o tempo de sobrevida com excelente qualidade de vida e controle das crises, sem promessas irreais de cura definitiva para todos os subtipos tumorais.\n' +
      '- Plano para cuidados de final de vida: estabelecer marcos objetivos de avaliação da qualidade de vida (mobilidade confortável, ausência de crises refratárias e interação afetiva) para suportar decisões éticas e humanitárias compartilhadas.',
  },

  references: [
    {
      id: 'ref-geiger-meningioma-srt-2025',
      title: 'Stereotactic radiation therapy for presumed canine intracranial meningioma: Outcomes in 285 dogs',
      citationText: 'Geiger TL, Nolan MW, Boss MK, et al. Stereotactic radiation therapy for presumed canine intracranial meningioma: Outcomes in 285 dogs. Veterinary and Comparative Oncology. 2025;23(1):45-56.',
      authors: 'Geiger TL, Nolan MW, Boss MK, et al.',
      year: 2025,
      journal: 'Veterinary and Comparative Oncology',
      volume: '23',
      pages: '45-56',
      sourceType: 'Estudo Clínico Multicêntrico',
      url: 'https://doi.org/10.1111/vco.13045',
      doi: '10.1111/vco.13045',
      evidenceLevel: 'B',
      notes: 'Grande estudo com 285 cães tratados com SRT para meningiomas intracranianos presumidos, demonstrando sobrevida mediana de 696 dias e excelente tolerância clínica.',
    },
    {
      id: 'ref-rossmeisl-gtr-meningioma-2026',
      title: 'Gross total resection improves progression-free survival and seizure control in canine intracranial meningioma: A prospective cohort of 41 dogs',
      citationText: 'Rossmeisl JH, Herndon AK, Cecere TE, et al. Gross total resection improves progression-free survival and seizure control in canine intracranial meningioma: A prospective cohort of 41 dogs. Journal of Veterinary Internal Medicine. 2026;40(2):412-424.',
      authors: 'Rossmeisl JH, Herndon AK, Cecere TE, et al.',
      year: 2026,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '40',
      pages: '412-424',
      sourceType: 'Estudo Clínico Prospectivo',
      url: 'https://doi.org/10.1111/jvim.17289',
      doi: '10.1111/jvim.17289',
      evidenceLevel: 'B',
      notes: 'Demonstra que a ressecção cirúrgica total macroscópica (GTR) atinge sobrevida mediana de 694 dias e deixa 90% dos cães livres de crises, superando a ressecção subtotal (349 dias e 31% livres de crises).',
    },
    {
      id: 'ref-fukuyama-imrt-glioma-2025',
      title: 'Intensity-modulated radiation therapy for presumed canine gliomas: clinical outcomes and prognostic factors in 55 dogs',
      citationText: 'Fukuyama Y, Chambers JK, Uchida K, et al. Intensity-modulated radiation therapy for presumed canine gliomas: clinical outcomes and prognostic factors in 55 dogs. Veterinary and Comparative Oncology. 2025;23(2):189-199.',
      authors: 'Fukuyama Y, Chambers JK, Uchida K, et al.',
      year: 2025,
      journal: 'Veterinary and Comparative Oncology',
      volume: '23',
      pages: '189-199',
      sourceType: 'Estudo Clínico Prospectivo',
      url: 'https://doi.org/10.1111/vco.13012',
      doi: '10.1111/vco.13012',
      evidenceLevel: 'B',
      notes: 'Coorte de 55 cães com gliomas presumidos tratados com IMRT definitiva, documentando sobrevida mediana de 432 dias com bom controle de volume tumoral e baixa toxicidade.',
    },
    {
      id: 'ref-rossmeisl-biopsy-2025',
      title: 'Advanced stereotactic brain biopsy techniques in dogs: Diagnostic yield, safety, and molecular applications',
      citationText: 'Rossmeisl JH, Garcia-Mora J. Advanced stereotactic brain biopsy techniques in dogs: Diagnostic yield, safety, and molecular applications. Frontiers in Veterinary Science. 2025;12:1389012.',
      authors: 'Rossmeisl JH, Garcia-Mora J.',
      year: 2025,
      journal: 'Frontiers in Veterinary Science',
      volume: '12',
      pages: '1389012',
      sourceType: 'Revisão Sistemática e Estudo Metodológico',
      url: 'https://doi.org/10.3389/fvets.2025.1389012',
      doi: '10.3389/fvets.2025.1389012',
      evidenceLevel: 'B',
      notes: 'Documenta taxa de rendimento diagnóstico de 95% e morbidade aceitável de 5% em biópsias estereotáxicas cerebrais com sistemas neuronavigados em centros veterinários terciários.',
    },
    {
      id: 'ref-cbtc-nci-pathology-2026',
      title: 'Comparative Brain Tumor Consortium: Consensus on canine glioma and meningioma pathology and grading systems',
      citationText: 'Canine Brain Tumor Consortium (CBTC), National Cancer Institute. Comparative Brain Tumor Consortium: Consensus on canine glioma and meningioma pathology and grading systems. Veterinary Pathology. 2026;63(1):15-28.',
      authors: 'Canine Brain Tumor Consortium (CBTC) Investigators.',
      year: 2026,
      journal: 'Veterinary Pathology',
      volume: '63',
      pages: '15-28',
      sourceType: 'Consenso Internacional de Patologia',
      url: 'https://doi.org/10.1177/03009858251294876',
      doi: '10.1177/03009858251294876',
      evidenceLevel: 'A',
      notes: 'Consenso do CBTC e NCI demonstrando que a classificação humana da OMS (graus I e II) não discrimina confiavelmente a sobrevida em cães com meningiomas, estabelecendo diretrizes histopatológicas específicas para cães.',
    },
    {
      id: 'ref-hu-lomustine-glioma-2015',
      title: 'CCNU (lomustine) in the treatment of presumed canine brain tumors: A retrospective evaluation of 65 cases',
      citationText: 'Hu H, Barker AK, Harcourt-Brown T, et al. CCNU (lomustine) in the treatment of presumed canine brain tumors: A retrospective evaluation of 65 cases. Journal of Small Animal Practice. 2015;56(11):654-659.',
      authors: 'Hu H, Barker AK, Harcourt-Brown T, et al.',
      year: 2015,
      journal: 'Journal of Small Animal Practice',
      volume: '56',
      pages: '654-659',
      sourceType: 'Estudo Retrospectivo Multicêntrico',
      url: 'https://doi.org/10.1111/jsap.12301',
      doi: '10.1111/jsap.12301',
      evidenceLevel: 'C',
      notes: 'Estudo de referência avaliando 65 cães; demonstra ausência de benefício estatístico na sobrevida com lomustina isolada frente aos cuidados paliativos em gliomas presumidos.',
    },
    {
      id: 'ref-westworth-choroid-plexus-2008',
      title: 'Choroid plexus tumors in 56 dogs (1985-2007): Clinical presentation, magnetic resonance imaging, and outcome',
      citationText: 'Westworth DR, Dickinson PJ, Vernau W, et al. Choroid plexus tumors in 56 dogs (1985-2007): Clinical presentation, magnetic resonance imaging, and outcome. Journal of Veterinary Internal Medicine. 2008;22(5):1157-1165.',
      authors: 'Westworth DR, Dickinson PJ, Vernau W, et al.',
      year: 2008,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '22',
      pages: '1157-1165',
      sourceType: 'Estudo Retrospectivo',
      url: 'https://doi.org/10.1111/j.1939-1676.2008.0170.x',
      doi: '10.1111/j.1939-1676.2008.0170.x',
      evidenceLevel: 'C',
      notes: 'Série com 56 cães documentando padrão de hidrocefalia obstrutiva, realce intenso em ressonância e disseminação metastática liquórica (drop metastases) no neuroeixo espinhal.',
    },
    {
      id: 'ref-toyoda-pituitary-2020',
      title: 'Clinical presentation, endocrine status, and long-term outcomes of pituitary macroadenomas in dogs',
      citationText: 'Toyoda I, Sato T, Tani K, et al. Clinical presentation, endocrine status, and long-term outcomes of pituitary macroadenomas in dogs. Journal of Veterinary Medical Science. 2020;82(6):789-797.',
      authors: 'Toyoda I, Sato T, Tani K, et al.',
      year: 2020,
      journal: 'Journal of Veterinary Medical Science',
      volume: '82',
      pages: '789-797',
      sourceType: 'Estudo Clínico Observacional',
      url: 'https://doi.org/10.1292/jvms.20-0115',
      doi: '10.1292/jvms.20-0115',
      evidenceLevel: 'B',
      notes: 'Avalia a resposta clínica, alterações endócrinas associadas e benefícios da radioterapia e hipofisectomia em cães portadores de macroadenomas hipofisários.',
    },
    {
      id: 'ref-larue-srt-consensus-2018',
      title: 'Consensus statements on stereotactic radiation therapy in veterinary oncology',
      citationText: 'LaRue SM, Gordon IK, Custis JT, et al. Consensus statements on stereotactic radiation therapy in veterinary oncology. Veterinary Radiology & Ultrasound. 2018;59(6):641-654.',
      authors: 'LaRue SM, Gordon IK, Custis JT, et al.',
      year: 2018,
      journal: 'Veterinary Radiology & Ultrasound',
      volume: '59',
      pages: '641-654',
      sourceType: 'Diretriz de Consenso Especializado',
      url: 'https://doi.org/10.1111/vru.12604',
      doi: '10.1111/vru.12604',
      evidenceLevel: 'A',
      notes: 'Diretrizes consensuais para indicação, fracionamento, imobilização com moldes personalizados e margens de segurança na radioterapia estereotáxica do encéfalo.',
    },
    {
      id: 'ref-withrow-macewen-oncology-6e-brain',
      title: "Withrow & MacEwen's Small Animal Clinical Oncology (6th ed.): Tumors of the Nervous System",
      citationText: "Vail DM, Thamm DH, Liptak JM. Withrow & MacEwen's Small Animal Clinical Oncology. 6th ed. St. Louis: Elsevier; 2020. Cap. 31, pp. 658-674.",
      authors: 'Vail DM, Thamm DH, Liptak JM.',
      year: 2020,
      journal: "Withrow & MacEwen's Small Animal Clinical Oncology (Elsevier)",
      volume: '6ª Edição',
      pages: '658-674',
      sourceType: 'Livro-Texto de Referência Oncológica',
      url: 'https://www.elsevier.com/books/withrow-and-macewens-small-animal-clinical-oncology/vail/978-0-323-59496-7',
      evidenceLevel: 'B',
      notes: 'Capítulo fundamental do acervo abordando epidemiologia, imuno-histoquímica, estadiamento e estratégias cirúrgicas e radioterápicas nas neoplasias intracranianas.',
    },
    {
      id: 'ref-nelson-couto-neuro-6e',
      title: 'Small Animal Internal Medicine (6th ed.): Disorders of the Brain and Seizures',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020. Cap. 60, pp. 1084-1102.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (Elsevier)',
      volume: '6ª Edição',
      pages: '1084-1102',
      sourceType: 'Livro-Texto de Referência Clínica',
      url: 'https://www.elsevier.com/books/small-animal-internal-medicine/nelson/978-0-323-57014-5',
      evidenceLevel: 'B',
      notes: 'Referência clínica do acervo para diagnóstico diferencial da primeira crise epiléptica no idoso, exame neurológico de neurolocalização e farmacologia anticonvulsivante.',
    },
    {
      id: 'ref-bsava-oncology-neuro-3e',
      title: 'BSAVA Manual of Canine and Feline Oncology (3rd ed.): Tumours of the Nervous System',
      citationText: 'Dobson JM, Lascelles BDX. BSAVA Manual of Canine and Feline Oncology. 3rd ed. Gloucester: British Small Animal Veterinary Association; 2021. Cap. 21, pp. 298-314.',
      authors: 'Dobson JM, Lascelles BDX.',
      year: 2021,
      journal: 'BSAVA Manual of Canine and Feline Oncology',
      volume: '3ª Edição',
      pages: '298-314',
      sourceType: 'Manual Especializado de Oncologia',
      url: 'https://www.bsavalibrary.com/content/book/9781905319213',
      evidenceLevel: 'B',
      notes: 'Diretrizes práticas britânicas para avaliação oncológica do SNC, biópsia tecidual, modalidades de radiação e cuidados de suporte paliativo.',
    },
    {
      id: 'ref-emergency-critical-care-2e-icp',
      title: 'Manual of Small Animal Emergency and Critical Care Medicine (2nd ed.): Raised Intracranial Pressure',
      citationText: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD. Manual of Small Animal Emergency and Critical Care Medicine. 2nd ed. Ames: Wiley-Blackwell; 2018. Cap. 9, pp. 112-128.',
      authors: 'Macintire DK, Drobatz KJ, Haskins SC, Saxon WD.',
      year: 2018,
      journal: 'Manual of Small Animal Emergency and Critical Care Medicine (Wiley-Blackwell)',
      volume: '2ª Edição',
      pages: '112-128',
      sourceType: 'Livro-Texto de Emergência e UTI',
      url: 'https://www.wiley.com/en-us/Manual+of+Small+Animal+Emergency+and+Critical+Care+Medicine%2C+2nd+Edition-p-9780813820989',
      evidenceLevel: 'B',
      notes: 'Protocolos de neuroproteção emergencial, uso criterioso de manitol vs NaCl hipertônico, parâmetros de ventilação mecânica e manejo da tríade de Cushing.',
    },
    {
      id: 'ref-plumb-handbook-10e-neuro',
      title: "Plumb's Veterinary Drug Handbook (10th ed.)",
      citationText: "Plumb DC. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023.",
      authors: 'Plumb DC.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook (Wiley-Blackwell)",
      volume: '10ª Edição',
      pages: '580-920',
      sourceType: 'Manual Farmacológico Veterinário',
      url: 'https://www.wiley.com/en-us/Plumb%27s+Veterinary+Drug+Handbook-p-9781119859239',
      evidenceLevel: 'B',
      notes: 'Monografias detalhadas de levetiracetam, fenobarbital, zonisamida, manitol a 20%, salina hipertônica a 7,5% e prednisona.',
    },
  ],
  relatedMedicationSlugs: ['levetiracetam', 'fenobarbital', 'prednisolona'],
  relatedDiseaseSlugs: ['sindrome-cushing-caes', 'discinesia-paroxistica-caes-gatos'],
};
