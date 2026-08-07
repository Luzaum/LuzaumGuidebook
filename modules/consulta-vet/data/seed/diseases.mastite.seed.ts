import type { DiseaseRecord } from '../../types/disease';

export const mastiteRecord: DiseaseRecord = {
  id: 'disease-mastite-caes-gatos',
  slug: 'mastite-caes-gatos',
  title: 'Mastite em cadelas e gatas',
  synonyms: [
    'Mastite puerperal',
    'Mastite séptica',
    'Infecção mamária',
    'Abscesso mamário',
    'Mastite gangrenosa',
  ],
  species: ['dog', 'cat'],
  category: 'reproducao-neonatologia',
  tags: ['Puerpério', 'Lactação', 'Cultura do leite', 'Sepse', 'Abscesso', 'Neonatos', 'Antimicrobiano'],
  quickSummary:
    'Mastite é inflamação geralmente séptica de uma ou mais glândulas mamárias, sobretudo no pós-parto. Bactérias da pele, ambiente ou corrente sanguínea ascendem pelo teto ou chegam por via hematógena; galactostase, trauma por unhas e metrite aumentam o risco. O espectro vai de calor, dor e leite descolorido até abscesso, necrose e choque séptico. O diagnóstico é primariamente clínico, apoiado por citologia e cultura de leite coletado assepticamente; uma cultura positiva isolada não prova doença porque leite de cadelas saudáveis pode conter bactérias. Tratamento não deve esperar cultura em paciente sistêmico: colher amostras, iniciar antimicrobiano bactericida compatível com lactação, controlar dor e favorecer drenagem. Abscesso ou necrose exige drenagem, debridamento ou mastectomia. Antibiótico profilático não previne mastite e seleciona resistência.',
  quickDecisionStrip: [
    'Mama quente/dolorosa + leite alterado no puerpério: colher leite assepticamente e tratar cedo.',
    'Febre, hipotensão, necrose ou apatia intensa = sepse até prova em contrário.',
    'Cultura positiva sem sinais pode representar microbiota/colonização; correlacione com citologia e clínica.',
    'Ultrassom diferencia celulite de coleção e orienta drenagem.',
    'Filhotes também são pacientes: pesar diariamente, checar hidratação e suplementar quando necessário.',
    'Não usar antimicrobiano profilático na lactação normal.',
  ],
  quickSummaryRich: {
    lead:
      'A mastite é uma doença da mãe e da ninhada. Dor e edema impedem a mamada, a estase aumenta a pressão intraglandular e a produção cai; ao mesmo tempo, sepse materna reduz cuidado neonatal. O sucesso depende de tratar a infecção, manter drenagem quando seguro e garantir calor, hidratação e energia aos filhotes.',
    leadHighlights: ['mãe e da ninhada', 'estase', 'drenagem', 'filhotes'],
    pillars: [
      {
        title: 'Clínica primeiro',
        body:
          'O exame físico é a base do diagnóstico. A contagem celular do leite não é confiável em cadelas e toda cultura deve ser interpretada junto com sinais e citologia.',
        highlights: ['exame físico', 'cultura deve ser contextualizada'],
      },
      {
        title: 'Drenagem evita progressão',
        body:
          'Compressas mornas e ordenha gentil reduzem a estase; a ultrassonografia identifica abscesso que precisa de intervenção.',
        highlights: ['Compressas mornas', 'ultrassom'],
      },
      {
        title: 'Uso responsável de antimicrobianos',
        body:
          'Escolha um bactericida com penetração e segurança para lactentes, depois ajuste à cultura. A profilaxia favorece resistência sem prevenir a doença.',
        highlights: ['ajustar à cultura', 'Profilaxia'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Triagem de gravidade',
          timing: 'Primeira consulta',
          detail:
            'Temperatura, perfusão, pressão, lactato, hidratação e estado mental; procurar necrose, bolhas, crepitação e choque (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Examinar todas as glândulas',
          timing: 'Na admissão',
          detail:
            'Comparar calor, dor, consistência, cor, fissura de teto e qualidade do leite; avaliar útero e corrimento por metrite concomitante (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Colher antes do antibiótico',
          timing: 'Antes de iniciar antimicrobiano',
          detail:
            'Higienizar teto, descartar primeiros jatos e colher leite para citologia, cultura e antibiograma; hemocultura se sepse — cultura positiva isolada não confirma mastite (Svensson et al., 2023; Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Imagem quando há massa',
          timing: 'Massa, flutuação ou resposta ruim',
          detail:
            'Ultrassonografia diferencia edema/celulite de abscesso, necrose e coleções que exigem drenagem (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Avaliar a ninhada',
          timing: 'Paralelo ao exame materno',
          detail:
            'Peso diário, sucção, hidratação, temperatura e sinais de sepse; instituir leite substituto e aquecimento quando necessário (Nelson & Couto, 6ª ed.).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Leve e localizada',
          detail:
            'Antimicrobiano oral após coleta, analgesia, compressa morna e esvaziamento gentil (Nelson & Couto, 6ª ed.; Plumb\'s, 10ª ed.).',
          dose: 'Cefalexina 10–20 mg/kg PO q8–12h ou amoxicilina-clavulanato 13,75 mg/kg PO q12h (cães).',
          duration: 'Guiada pela resposta clínica; reavaliar em 24–48 h.',
          reassess: 'Dor, tamanho e cor da glândula; ajustar pelo antibiograma quando disponível.',
        },
        {
          label: 'Sistêmica ou séptica',
          detail:
            'Internação, antimicrobiano IV bactericida, fluidos titulados, analgesia, controle de glicose e eletrólitos (Nelson & Couto, 6ª ed.).',
          duration: 'Até estabilização hemodinâmica e resposta clínica.',
          reassess: 'Perfusão, temperatura, lactato e diurese; hemocultura se falha.',
        },
        {
          label: 'Abscesso ou necrose',
          detail:
            'Drenagem e lavagem, debridamento ou mastectomia após estabilização; cultura de tecido profundo (Nelson & Couto, 6ª ed.).',
          reassess: 'Ultrassom seriado; necrose progressiva apesar de tratamento = intervenção cirúrgica.',
        },
        {
          label: 'Lactação inviável',
          detail:
            'Separar/suplementar neonatos e considerar cabergolina para suprimir produção em caso grave (Plumb\'s, 10ª ed.; Nelson & Couto, 6ª ed.).',
          dose: 'Cabergolina 1,5–5 µg/kg/dia dividida em 2 administrações.',
          duration: 'Até supressão adequada da lactação; plano neonatal completo obrigatório.',
          reassess: 'Peso de cada filhote diariamente; ganho inadequado exige suplementação.',
        },
      ],
    },
  },
  etiology: {
    agentes:
      'Coliformes, Staphylococcus spp. e Streptococcus spp. são os grupos mais associados à mastite em cadelas e gatas. Escherichia coli pode produzir quadro endotoxêmico fulminante; Staphylococcus e Streptococcus frequentemente entram pela pele ou por tetos lesionados.',
    vias: [
      'Ascendente: migração pelo canal do teto a partir da pele e caixa de parto.',
      'Traumática: unhas/dentes de neonatos e fissuras rompem a barreira cutânea.',
      'Hematógena: bacteremia, especialmente com metrite puerperal, alcança glândula.',
      'Estase: teto invertido/imperfurado, ninhada pequena, perda de filhotes ou mamada ineficaz retêm leite e favorecem inflamação.',
    ],
    culturaNormal:
      'Svensson et al. (2023) cultivaram 210 amostras de leite de 11 cadelas clinicamente saudáveis e encontraram crescimento bacteriano em 86%, incluindo Staphylococcus pseudintermedius e Streptococcus. Portanto, isolamento sem inflamação, citologia compatível ou crescimento significativo não autoriza diagnóstico nem antimicrobiano.',
  },
  epidemiology: {
    periodo:
      'Ocorre principalmente nas primeiras semanas pós-parto, durante lactação intensa, mas pode surgir após perda da ninhada, pseudociese ou desmame abrupto. Uma ou várias glândulas podem ser afetadas.',
    risco:
      'Galactostase, higiene ruim, trauma de teto, metrite, imunossupressão, má nutrição e ninhada muito pequena ou debilitada aumentam risco.',
    recorrencia:
      'Pode recorrer em lactações seguintes mesmo com cuidados adequados; o histórico deve motivar inspeção diária precoce, não antimicrobiano profilático.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Bactéria ultrapassa o canal do teto ou chega pelo sangue e multiplica em leite/tecido.',
      'Reconhecimento imune recruta neutrófilos; edema e exsudato aumentam pressão, calor e dor.',
      'Dor reduz amamentação, piora estase e cria ciclo de retenção e inflamação.',
      'Toxinas, trombose local e pressão podem causar necrose, abscesso ou gangrena.',
      'Bactéria/toxina pode alcançar circulação e produzir SIRS, choque e lesão de órgão.',
    ],
    neonatos:
      'Neonatos já compartilham a flora do ambiente, e mamar em uma glândula afetada não é necessariamente prejudicial em todos os casos. A decisão depende do agente, do antimicrobiano, do aspecto do leite, da condição materna e da capacidade de monitorar os filhotes.',
    contagio:
      'Não é “contagiosa” como uma virose, mas bactérias podem circular entre pele, leite, ambiente e neonatos. Higiene e avaliação de filhotes doentes reduzem reinoculação.',
  },
  pathophysiology:
    'Calor e rubor vêm da vasodilatação; a dor resulta de mediadores inflamatórios e distensão; leite vermelho ou marrom contém hemácias, leucócitos e detritos. Pressão e trombose local reduzem a perfusão, levando à necrose. Febre, letargia e anorexia refletem citocinas sistêmicas; hipotensão, lactato elevado e disfunção renal indicam sepse ou choque. A queda da ingestão e da produção de leite rapidamente causa hipoglicemia, desidratação e falha de crescimento nos neonatos.',
  clinicalSignsPathophysiology: [
    {
      system: 'mammary',
      findings: [
        {
          finding: 'Glândula quente, aumentada, firme e dolorosa',
          mechanism:
            'A infecção bacteriana desencadeia vasodilatação, edema intersticial e acúmulo de exsudato inflamatório, elevando a pressão intraglandular.',
          clinicalMeaning: 'Confirma inflamação ativa; compare todas as glândulas para localizar foco e avaliar extensão.',
          priority: 'common',
        },
        {
          finding: 'Leite aquoso, espesso, com grumos, sangue ou coloração marrom',
          mechanism:
            'Neutrófilos, detritos celulares e hemácias extravasam para os ductos alveolares; a barreira epitelial fica comprometida.',
          clinicalMeaning: 'Aspecto anormal do leite sustenta mastite; leite normal em uma glândula não exclui doença em outra.',
          priority: 'common',
        },
        {
          finding: 'Flutuação, pele violácea/fria ou necrose',
          mechanism:
            'Abscesso forma cavidade purulenta; trombose vascular e pressão local reduzem perfusão, evoluindo para gangrena.',
          clinicalMeaning: 'Indica complicação grave que pode exigir drenagem cirúrgica ou debridamento.',
          priority: 'emergency',
        },
        {
          finding: 'Recusa em deitar ou amamentar',
          mechanism:
            'A dor à palpação e à sucção dos filhotes provoca aversão ao contato mamário e reduz amamentação.',
          clinicalMeaning: 'Sinal precoce de desconforto materno; neonatos precisam de plano alternativo de alimentação.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Febre, anorexia e letargia',
          mechanism:
            'Citocinas inflamatórias sistêmicas (IL-1, TNF-α) alteram termorregulação e apetite; a febre pode preceder alterações mamárias evidentes.',
          clinicalMeaning: 'Sugere resposta sistêmica; não trate como “febre sem foco” sem examinar as mamas.',
          priority: 'common',
        },
        {
          finding: 'Hipotensão, taquicardia, mucosas alteradas e oligúria',
          mechanism:
            'Endotoxemia e vasodilatação periférica reduzem débito cardíaco efetivo; a hipoperfusão renal causa oligúria.',
          clinicalMeaning: 'Sepse ou choque — estabilização hemodinâmica antes de procedimentos prolongados.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'reproductive',
      findings: [
        {
          finding: 'Corrimento uterino fétido e involução inadequada',
          mechanism:
            'Metrite puerperal pode liberar bactérias para a corrente sanguínea, alcançando glândulas mamárias por via hematógena.',
          clinicalMeaning: 'Investigue foco uterino concomitante; tratar apenas a mama pode falhar se a metrite persistir.',
          priority: 'systemic',
        },
        {
          finding: 'Agalactia ou redução da produção de leite',
          mechanism:
            'Dor, estresse e mediadores inflamatórios inibem a ejeção reflexa e reduzem síntese láctea.',
          clinicalMeaning: 'Neonatos dependem de suplementação; monitorar peso diário de cada filhote.',
          priority: 'common',
        },
      ],
    },
    {
      system: 'neonatal',
      findings: [
        {
          finding: 'Choro persistente, perda de peso, fraqueza e hipotermia nos filhotes',
          mechanism:
            'Ingestão calórica insuficiente reduz termogênese; hipoglicemia e desidratação agravam prostração.',
          clinicalMeaning: 'Emergência neonatal paralela à mastite materna — não aguardar resolução da mãe para intervir.',
          priority: 'emergency',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Exame físico da mãe e das mamas',
      purpose: 'Confirmar inflamação mamária e estadiar gravidade sistêmica antes de exames demorados.',
      description:
        'Compare todas as glândulas, aspecto do leite, integridade dos tetos e perfusão sistêmica. Em apresentação típica, a clínica permite iniciar tratamento imediato (Nelson & Couto, 6ª ed.).',
      interpretation: 'Assimetria glandular com calor, dor e leite alterado sustenta mastite; aparência normal isolada não exclui foco oculto.',
      limitations: 'Palpação dolorosa pode limitar exame completo — analgesia ou sedação leve quando necessário.',
      isGoldStandard: true,
    },
    {
      stepNumber: 2,
      title: 'Citologia e cultura do leite',
      purpose: 'Documentar infecção e orientar escolha e descalonamento de antimicrobiano.',
      description:
        'Colete assepticamente antes do antibiótico. Neutrófilos degenerados e bactérias intracelulares apoiam infecção; cultura e antibiograma direcionam terapia.',
      interpretation: 'Citologia inflamatória + crescimento significativo em contexto clínico confirma mastite bacteriana.',
      limitations: 'Svensson et al. (2023) cultivaram bactérias em 86% das amostras de leite de cadelas saudáveis — crescimento isolado não confirma mastite.',
    },
    {
      stepNumber: 3,
      title: 'Hemograma, bioquímica, lactato e urina',
      purpose: 'Estadiar sepse e disfunção orgânica em pacientes febris, anoréticos ou instáveis.',
      description:
        'Leucograma, glicose, função renal/hepática, eletrólitos e lactato; hemocultura antes do antibiótico em caso grave.',
      interpretation: 'Leucocitose com desvio à esquerda, lactato elevado ou azotemia indicam resposta sistêmica importante.',
      limitations: 'Laboratório normal não exclui mastite localizada sem complicação sistêmica.',
    },
    {
      stepNumber: 4,
      title: 'Ultrassonografia mamária',
      purpose: 'Diferenciar celulite de abscesso e identificar tecido necrótico.',
      description:
        'Indicada quando houver massa, flutuação, resposta ruim ao tratamento inicial ou suspeita de necrose.',
      interpretation: 'Cavidade hipoecoica com conteúdo heterogêneo sugere abscesso; áreas não perfundidas orientam debridamento.',
      limitations: 'Celulite difusa sem coleção pode ter ultrassom pouco específico.',
    },
    {
      stepNumber: 5,
      title: 'Diferenciais obrigatórios',
      purpose: 'Evitar tratar tumor ou galactostase como infecção.',
      description:
        'Galactostase sem infecção, hiperplasia fibroadenomatosa felina, tumor mamário, trauma e dermatite perimamária.',
      interpretation: 'Massa persistente após resolução inflamatória exige citologia ou biópsia.',
      limitations: 'Mastite e neoplasia mamária podem coexistir — não descartar tumor por inflamação aguda.',
    },
  ],
  treatment: {
    antimicrobianos: [
      'Colha leite e inicie tratamento sem esperar o resultado em quadro clínico. Para paciente estável, a literatura clínica descreve cefalexina de 10–20 mg/kg por via oral a cada 8–12 horas. Budde e McCluskey (2023) descrevem amoxicilina com clavulanato de 13,75 mg/kg por via oral a cada 12 horas em cães. Ajuste sempre ao paciente e aos filhotes expostos.',
      'Ajuste pelo antibiograma, citologia, resposta e exposição neonatal. Amoxicilina com clavulanato é antimicrobiano criticamente importante; reduza o espectro quando possível.',
      'Sepse ou choque: use via intravenosa e cobertura bactericida de Gram-positivos e Gram-negativos conforme epidemiologia local, função renal e cultura. Terapia oral é inadequada quando perfusão ou absorção estão comprometidas.',
      'A duração é guiada pela resposta e pelo controle do foco; reavalie em 24–48 horas. Não mantenha até o desmame automaticamente se cultura e evolução permitirem curso menor.',
    ],
    suporteLocal: [
      'Compressa morna e ordenha gentil várias vezes ao dia favorecem drenagem e podem evitar abscesso; interromper se causar trauma ou sangramento.',
      'Proteger a glândula de bordas da caixa e unhas; manter cama limpa e seca.',
      'Abscesso: incisão/drenagem e lavagem. Necrose: debridamento ou mastectomia após estabilização, com cultura de tecido profundo.',
    ],
    analgesia:
      'Analgesia é obrigatória. Opioide é apropriado em dor moderada ou grave. Use anti-inflamatório não esteroidal somente em mãe hidratada, normotensa, com função renal adequada e produto compatível com espécie e lactação.',
    lactacao: [
      'Se a mãe está estável, o agente e os fármacos são compatíveis e os neonatos são monitorados, a mamada pode continuar nas glândulas não afetadas e, em alguns casos, na afetada após esvaziamento.',
      'Separar quando há necrose, leite purulento abundante, bactéria/fármaco de risco, mãe tóxica ou filhotes doentes. Fornecer sucedâneo específico, calor e estímulo de eliminação.',
      'Cabergolina de 1,5–5 µg/kg/dia, dividida em duas administrações, pode reduzir a lactação em casos graves ou sem ninhada; a queda da produção exige plano neonatal completo.',
    ],
    monitoramento: [
      'Perfusão, temperatura, pressão, diurese e lactato no caso grave.',
      'Dor, tamanho, cor e ultrassom da glândula; cultura se falha.',
      'Peso de cada filhote ao menos diariamente; ganho inadequado exige suplementação.',
      'Avaliar metrite concomitante e fonte ambiental.',
    ],
  },
  prevention: {
    medidas: [
      'Caixa de parto limpa, seca e sem bordas traumáticas; aparar pontas das unhas dos neonatos com técnica segura.',
      'Inspecionar glândulas e leite diariamente nas primeiras semanas; rodiziar filhotes e corrigir teto obstruído/galactostase.',
      'Desmame gradual e manejo precoce após perda de ninhada evitam acúmulo abrupto.',
      'Tratar metrite e doença materna, garantir água e dieta de lactação completa.',
    ],
    antibiotico:
      'Não use antimicrobiano profilático na lactação normal: essa prática seleciona resistência e não previne mastite. Inspeção diária, detecção e tratamento precoces são superiores.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['tumores-mamarios-caes-gatos'],
  relatedMedicationSlugs: ['amoxicilina-clavulanato'],
  references: [
    {
      id: 'ref-nelson-couto-mastitis',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 55, Mammary Disorders – Mastitis; PDF anexado, pp. 1008–1009.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-plumbs-mastitis',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Monografias Amoxicillin/Clavulanate e Cephalexin.',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-normal-canine-milk-2023',
      citationText:
        'Svensson A, et al. Bacteria in normal canine milk analyzed by blood agar medium. Animals. 2023.',
      sourceType: 'Estudo prospectivo pequeno',
      url: 'https://pubmed.ncbi.nlm.nih.gov/37444004/',
      notes: '11 cadelas; demonstra que cultura positiva isolada pode não significar mastite.',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
