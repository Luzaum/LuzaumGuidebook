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
        'Glândula quente, aumentada, firme e dolorosa: hiperemia, edema e pressão intraglandular.',
        'Leite aquoso, espesso, com grumos, sangue ou coloração marrom: exsudato, células e dano ductal.',
        'Flutuação: coleção/abscesso; pele violácea, fria ou negra: isquemia e necrose.',
        'Recusa em deitar ou amamentar: contato e sucção agravam dor.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Febre, anorexia e letargia: resposta inflamatória sistêmica; febre pode preceder alterações mamárias marcantes.',
        'Hipotensão, taquicardia, mucosas alteradas e oligúria: sepse/choque com hipoperfusão.',
      ],
    },
    {
      system: 'reproductive',
      findings: [
        'Corrimento uterino fétido e involução inadequada: metrite concomitante pode ser a fonte de bacteremia.',
        'Agalactia secundária: dor, estresse e inflamação reduzem ejeção e produção de leite.',
      ],
    },
    {
      system: 'neonatal',
      findings: [
        'Choro, perda de peso, fraqueza e hipotermia: ingestão insuficiente e possível doença neonatal.',
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Exame físico da mãe e das mamas',
      description:
        'Base diagnóstica: compare todas as glândulas, leite, tetos e perfusão sistêmica. Em apresentação típica, a clínica permite iniciar tratamento imediato.',
      isGoldStandard: true,
    },
    {
      stepNumber: 2,
      title: 'Citologia e cultura do leite',
      description:
        'Colete assepticamente antes do antimicrobiano. Neutrófilos degenerados e bactérias intracelulares apoiam infecção; cultura e antibiograma direcionam o descalonamento. Svensson et al. (2023) encontraram bactérias em 86% das amostras de leite de cadelas saudáveis, por isso crescimento isolado não confirma mastite.',
    },
    {
      stepNumber: 3,
      title: 'Hemograma, bioquímica, lactato e urina',
      description:
        'Indicar quando há febre, anorexia, necrose ou instabilidade. Leucograma, glicose, rim, fígado, eletrólitos e lactato estadiam sepse; hemocultura antes do antibiótico em caso grave.',
    },
    {
      stepNumber: 4,
      title: 'Ultrassonografia mamária',
      description:
        'Use quando houver massa, flutuação, resposta ruim ou suspeita de necrose. Distingue celulite de cavidade, identifica tecido inviável e orienta drenagem.',
    },
    {
      stepNumber: 5,
      title: 'Diferenciais',
      description:
        'Galactostase sem infecção, hiperplasia fibroadenomatosa felina, tumor mamário, trauma e dermatite. Massa persistente após resolução inflamatória exige citologia/biópsia.',
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
