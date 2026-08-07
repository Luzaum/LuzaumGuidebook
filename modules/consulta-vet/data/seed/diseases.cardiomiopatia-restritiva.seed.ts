import type { DiseaseRecord } from '../../types/disease';

export const cardiomiopatiaRestritivaRecord: DiseaseRecord = {
  id: 'disease-cardiomiopatia-restritiva',
  slug: 'cardiomiopatia-restritiva-felina',
  title: 'Cardiomiopatia restritiva felina (CMR)',
  synonyms: [
    'CMR',
    'Cardiomiopatia restritiva',
    'Fibrose endomiocárdica felina',
    'Cardiomiopatia restritiva',
  ],
  species: ['cat'],
  category: 'cardiologia',
  tags: ['CMR', 'Fibrose', 'Átrio esquerdo', 'Disfunção diastólica', 'Insuficiência cardíaca', 'Tromboembolismo', 'Ecocardiografia'],
  quickSummary:
    'A cardiomiopatia restritiva (CMR) felina é um fenótipo miocárdico marcado por fibrose endocárdica, subendocárdica ou miocárdica que torna o ventrículo rígido. O tamanho e a função sistólica ventricular podem parecer relativamente preservados, mas o enchimento diastólico fica severamente restrito e os átrios, sobretudo o esquerdo, dilatam de forma desproporcional. Essa combinação favorece insuficiência cardíaca congestiva, tromboembolismo arterial e arritmias. A ecocardiografia é o exame de referência, mas a distinção entre CMR, CMH em estágio final e cardiomiopatia não classificada pode exigir imagens seriadas. Não existe terapia antifibrótica comprovada: o manejo trata congestão, baixo débito, arritmias e risco trombótico.',
  quickDecisionStrip: [
    'Átrios muito grandes com ventrículos não hipertrofiados: pense em CMR.',
    'Função sistólica aparentemente normal não significa pressão de enchimento normal.',
    'Ecocardiografia confirma fenótipo; imagem seriada ajuda a separar CMH remodelada.',
    'Insuficiência cardíaca e tromboembolismo são apresentações frequentes e determinam urgência.',
    'Pimobendan é mais plausível que na CMH obstrutiva, mas a evidência específica é limitada.',
    'Prognóstico costuma ser reservado após descompensação.',
  ],
  quickSummaryRich: {
    lead:
      'Na CMR, o ventrículo não precisa estar grande nem fraco para falhar. A fibrose o transforma em uma câmara pouco complacente: entra pouco sangue a cada diástole e a pressão volta para os átrios e pulmões. O eco pode mostrar uma fração de encurtamento aceitável ao mesmo tempo em que o gato está em edema ou com átrio enorme. Esse aparente paradoxo é a chave da doença.',
    leadHighlights: ['fibrose', 'pouco complacente', 'pressão', 'átrio enorme'],
    pillars: [
      {
        title: 'Restrição é fisiologia',
        body:
          'O padrão restritivo descreve enchimento rápido inicial seguido de interrupção abrupta porque o miocárdio rígido não acomoda volume.',
        highlights: ['enchimento', 'miocárdio rígido'],
      },
      {
        title: 'Átrios contam a história',
        body:
          'Dilatação atrial marcada é a consequência crônica das altas pressões de enchimento e também o principal substrato para trombo e fibrilação atrial.',
        highlights: ['Dilatação atrial', 'trombo'],
      },
      {
        title: 'Tratamento é de complicações',
        body:
          'Ainda não há tratamento que reverta a fibrose. Diurético, antitrombótico e controle de ritmo ou frequência são escolhidos conforme a apresentação.',
        highlights: ['não há tratamento que reverta', 'complicações'],
      },
    ],
    diagnosticFlow: {
      title: 'Plano diagnóstico',
      steps: [
        {
          label: 'Estabilize a respiração',
          timing: 'Primeira consulta instável',
          detail:
            'Oxigênio, mínimo estresse e ultrassonografia à beira do leito; toracocentese se houver derrame pleural e furosemida quando a congestão cardiogênica for provável (Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Ecocardiografia completa',
          detail:
            'Avaliar átrios, espessura e volumes ventriculares, Doppler transmitral/tissular, função sistólica, pontes ou placas fibróticas e trombo (ACVIM, 2020; Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Exclua mimetizadores',
          timing: 'Antes de rotular',
          detail:
            'CMH em estágio final, pericardiopatia constritiva, cardiopatia congênita, neoplasia infiltrativa e sobrecarga de volume (ACVIM, 2020; Fox, 2004).',
        },
        {
          label: 'Estágio e complicações',
          detail:
            'Definir insuficiência cardíaca, tromboembolismo arterial, arritmia, função renal e risco trombótico; o estágio orienta mais a terapia que a nomenclatura (ACVIM, 2020).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Plano de tratamento',
      steps: [
        {
          label: 'Congestão',
          dose: 'Furosemida 1–2 mg/kg VO q8–12h titulada',
          duration: 'Menor dose eficaz no domicílio',
          reassess: 'Ureia, creatinina e eletrólitos após ajustes',
          detail:
            'Toracocentese quando efusão compromete ventilação; diurético não substitui drenagem urgente (Plumb\'s, 10ª ed.; Budde & McCluskey, 2023).',
        },
        {
          label: 'Baixo débito',
          dose: 'Pimobendan 0,25 mg/kg VO q12h pode ser considerado',
          detail:
            'Obstrução dinâmica da via de saída não é típica; dobutamina pode ser utilizada no choque hospitalar (Plumb\'s, 10ª ed.; Nelson & Couto, 6ª ed.).',
        },
        {
          label: 'Trombose',
          dose: 'Clopidogrel 18,75 mg/gato VO q24h',
          duration: 'Contínuo em alto risco ou pós-tromboembolismo',
          reassess: 'Sinais de sangramento e função renal/hepática',
          detail:
            'Considerar rivaroxabana ou heparina em combinação conforme risco (Hogan et al., FAT CAT, 2015; Plumb\'s, 10ª ed.).',
        },
        {
          label: 'Arritmia',
          detail:
            'Tratar taquiarritmia que compromete enchimento; evitar bradicardia excessiva — atenolol ou diltiazem selecionados (Plumb\'s, 10ª ed.; ACVIM, 2020).',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'A etiologia é geralmente idiopática e provavelmente multifatorial. Pode haver fibrose endocárdica, subendocárdica ou miocárdica extensa; não há associação genética específica firmemente estabelecida.',
    hipoteses:
      'Endomiocardite prévia, lesão isquêmica e inflamação crônica são hipóteses. Doença infiltrativa, especialmente linfoma, pode simular ou causar fisiologia restritiva e precisa ser excluída quando a imagem é atípica.',
    classificacao:
      'A classificação é fenotípica. CMH avançada pode perder espessura regional e adquirir enchimento restritivo; sem ecocardiogramas seriados, separar CMR verdadeira de CMH remodelada pode ser impossível.',
  },
  epidemiology: {
    perfil:
      'É menos comum que CMH, mas aparece de modo desproporcional entre gatos encaminhados por insuficiência cardíaca avançada. Não há predileção racial ou mutação confirmada com utilidade clínica rotineira.',
    apresentacao:
      'Muitos pacientes são diagnosticados apenas após taquipneia, derrame pleural, edema, tromboembolismo arterial ou arritmia. Dilatação atrial grave no diagnóstico é frequente e piora o prognóstico.',
  },
  pathogenesisTransmission: {
    mecanismo: [
      'Fibrose reduz complacência ventricular e retarda relaxamento.',
      'O enchimento ocorre sob pressão elevada; a pressão é transmitida retrogradamente aos átrios e veias pulmonares.',
      'Átrios dilatam e perdem eficiência mecânica, causando estase e favorecendo trombo.',
      'Taquicardia encurta diástole e pode precipitar congestão mesmo sem grande mudança anatômica.',
      'Em formas com pontes fibróticas, a geometria ventricular e o movimento regional também se alteram.',
    ],
    transmissao:
      'Não é contagiosa. Como não há mutação familiar validada para a maioria dos casos, prevenção reprodutiva é baseada em fenótipo e histórico familiar.',
  },
  pathophysiology:
    'O ventrículo rígido recebe volume rapidamente no início da diástole, mas logo atinge seu limite de complacência. A pressão diastólica sobe de forma acentuada com pequenos aumentos de volume, explicando por que fluidoterapia ou taquicardia podem precipitar edema. A fração de ejeção pode permanecer normal porque mede proporção, não pressão de enchimento nem volume sistólico efetivo. A dilatação atrial crônica cria o elo entre disfunção diastólica, congestão e tromboembolismo.',
  clinicalSignsPathophysiology: [
    {
      system: 'respiratory',
      findings: [
        {
          finding: 'Taquipneia, dispneia e ortopneia',
          mechanism:
            'A pressão atrial esquerda elevada transmite-se às veias pulmonares; quando a pressão capilar supera a capacidade linfática, extravasa líquido para interstício e alvéolos.',
          clinicalMeaning: 'Sugere insuficiência cardíaca congestiva esquerda — estabilizar antes de exames demorados.',
          priority: 'heart-failure',
        },
        {
          finding: 'Efusão pleural',
          mechanism:
            'Congestão venosa sistêmica e alteração de drenagem linfática aumentam o líquido pleural, restringindo expansão pulmonar.',
          clinicalMeaning: 'Toracocentese pode ser terapêutica urgente se comprometer ventilação.',
          priority: 'heart-failure',
        },
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        {
          finding: 'Som de galope (terceira bulha)',
          mechanism:
            'O enchimento ventricular rápido contra parede rígida e pouco complacente produz vibração audível na diástole precoce.',
          clinicalMeaning: 'Reforça suspeita de disfunção diastólica grave, típica da CMR.',
          priority: 'common',
        },
        {
          finding: 'Arritmia, especialmente atrial',
          mechanism:
            'Estiramento atrial crônico e fibrose alteram condução elétrica; fibrilação atrial encurta diástole e piora enchimento.',
          clinicalMeaning: 'ECG ou Holter orientam controle de frequência e antitrombótico.',
          priority: 'arrhythmia',
        },
        {
          finding: 'Pulso fraco, hipotermia e síncope',
          mechanism:
            'Apesar de fração de ejeção aparentemente preservada, o volume sistólico efetivo pode ser baixo porque o ventrículo rígido recebe pouco sangue a cada ciclo.',
          clinicalMeaning: 'Não confundir FE normal com bom débito — avaliar perfusão e pressão de enchimento.',
          priority: 'low-output',
        },
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        {
          finding: 'Paresia dolorosa aguda e membros frios',
          mechanism:
            'Estase no átrio esquerdo dilatado favorece formação de trombo que emboliza para a trifurcação aórtica, interrompendo perfusão distal.',
          clinicalMeaning: 'Emergência — analgesia, antitrombóticos e suporte; prognóstico reservado.',
          priority: 'emergency',
        },
      ],
    },
    {
      system: 'general',
      findings: [
        {
          finding: 'Hiporexia, perda de peso e letargia',
          mechanism:
            'Baixo débito, congestão visceral e estado catabólico sustentado em doença cardíaca crônica avançada reduzem apetite e energia.',
          clinicalMeaning: 'Indica doença avançada e pior reserva fisiológica para descompensação.',
          priority: 'systemic',
        },
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Triagem clínica e estabilização',
      purpose: 'Identificar congestão, tromboembolismo ou baixo débito antes de exames completos.',
      description:
        'Avalie padrão respiratório, perfusão e ritmo. Em dispneia: oxigênio, mínimo estresse, ultrassom focal e toracocentese se efusão relevante (Nelson & Couto, 6ª ed.).',
      interpretation:
        'Taquipneia com edema ou efusão aponta insuficiência cardíaca; paresia pélvica aguda sugere tromboembolismo.',
      limitations: 'Exame físico pode ser pouco expressivo antes da descompensação.',
    },
    {
      stepNumber: 2,
      title: 'Ecocardiografia 2D e Doppler',
      purpose: 'Confirmar fenótipo restritivo e quantificar dilatação atrial desproporcional.',
      description:
        'Avaliar átrios, espessura e volumes ventriculares, Doppler transmitral/tissular, função sistólica, pontes ou placas fibróticas, trombo e contraste espontâneo (ACVIM, 2020; Nelson & Couto, 6ª ed.).',
      interpretation: 'Dilatação atrial marcada com ventrículo não hipertrofiado e padrão de enchimento restritivo sustenta CMR.',
      limitations: 'CMH em estágio final pode imitar fisiologia restritiva — imagem seriada ajuda.',
      isGoldStandard: true,
    },
    {
      stepNumber: 3,
      title: 'Radiografia torácica ou ultrassonografia à beira do leito',
      purpose: 'Documentar edema pulmonar ou efusão pleural.',
      description:
        'Determina impacto respiratório e orienta diurese ou drenagem. Cardiomegalia variável não exclui pressão de enchimento alta.',
      interpretation: 'Edema intersticial/alveolar ou efusão pleural confirmam descompensação congestiva.',
      limitations: 'Radiografia normal não exclui CMR subclínica com átrio dilatado.',
    },
    {
      stepNumber: 4,
      title: 'ECG e Holter',
      purpose: 'Detectar arritmias que alteram enchimento e risco trombótico.',
      description:
        'Indicado em pulso irregular, galope, síncope ou taquicardia persistente.',
      interpretation: 'Fibrilação atrial ou ectopia ventricular mudam conduta de frequência e antitrombótico.',
      limitations: 'ECG curto normal não exclui arritmia intermitente.',
    },
    {
      stepNumber: 5,
      title: 'Laboratório e biomarcadores',
      purpose: 'Excluir comorbidades e apoiar origem cardíaca da dispneia.',
      description:
        'Hemograma, rim, eletrólitos, T4 total e pressão arterial. NT-proBNP apoia suspeita cardíaca; troponina indica lesão miocárdica.',
      interpretation: 'BNP elevado aumenta probabilidade cardíaca; troponina alta sugere lesão aguda.',
      limitations: 'Biomarcadores não distinguem CMR de outros fenótipos miocárdicos.',
    },
    {
      stepNumber: 6,
      title: 'Diferenciais avançados',
      purpose: 'Excluir mimetizadores estruturais e infiltrativos.',
      description:
        'Pericardiopatia constritiva, CMH remodelada, cardiomiopatia não classificada, cor triatriatum e linfoma infiltrativo. Ressonância e biópsia endomiocárdica reservadas a centros especializados (Fox, 2004; ACVIM, 2020).',
      interpretation: 'Achado que muda conduta cirúrgica ou oncológica exige encaminhamento.',
      limitations: 'Distinção histológica definitiva raramente é necessária na prática ambulatorial.',
    },
  ],
  treatment: {
    aguda: [
      'Insuficiência cardíaca congestiva aguda: oxigênio, furosemida parenteral titulada e toracocentese quando efusão compromete ventilação. Diurético não substitui drenagem urgente (Plumb\'s, 10ª ed.; Nelson & Couto, 6ª ed.).',
      'Tromboembolismo arterial: analgesia opioide imediata, clopidogrel 18,75 mg/gato por via oral q24h e anticoagulação individualizada conforme risco (Hogan et al., FAT CAT, 2015).',
    ],
    cronica: [
      'Budde e McCluskey (2023), no Plumb\'s Veterinary Drug Handbook (10ª ed.), descrevem furosemida 1–2 mg/kg por via oral a cada 8–12 horas em gatos, titulada à congestão. Conclusão: usar a menor dose eficaz no domicílio, com monitorização renal.',
      'Pimobendan 0,25 mg/kg por via oral a cada 12 horas pode ser considerado na CMR porque obstrução dinâmica importante não é típica; a evidência específica é observacional e deve ser apresentada ao tutor como tal (Plumb\'s, 10ª ed.).',
      'Hogan et al. (2015), no ensaio FAT CAT com 75 gatos sobreviventes de tromboembolismo, demonstraram maior tempo até recorrência com clopidogrel do que com ácido acetilsalicílico. Conclusão: clopidogrel 18,75 mg/gato q24h é indicado após tromboembolismo ou em alto risco por átrio muito dilatado.',
      'Atenolol ou diltiazem somente para taquiarritmia/controle de frequência selecionado; bradicardia ou inotropia negativa podem piorar baixo débito (ACVIM, 2020; Plumb\'s, 10ª ed.).',
    ],
    monitoramento: [
      'Frequência respiratória em sono, peso e sinais de efusão.',
      'Ureia, creatinina e eletrólitos após ajustes de diurético.',
      'Ecocardiografia e ECG conforme evolução; risco pode mudar rapidamente com aumento atrial.',
      'Sinais de sangramento em antitrombóticos e qualidade de vida.',
    ],
  },
  prevention:
    'Não há prevenção específica nem terapia comprovada que impeça fibrose. Evite fluidoterapia excessiva em cardiopata conhecido, rastreie parentes quando houver agregação familiar e ensine o tutor a reconhecer taquipneia e sinais de tromboembolismo arterial. A reprodução de gato afetado não é recomendada, mesmo sem mutação conhecida.',
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['cardiomiopatia-hipertrofica-caes-gatos'],
  relatedMedicationSlugs: ['pimobendan', 'benazepril'],
  references: [
    {
      id: 'ref-nelson-couto-rcm',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 8, Restrictive Cardiomyopathy; PDF anexado, pp. 198–199.',
      sourceType: 'Livro-texto',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-acvim-feline-cardiomyopathy-rcm',
      citationText:
        'Luis Fuentes V, Abbott J, Chetboul V, et al. ACVIM consensus statement guidelines for classification, diagnosis, and management of cardiomyopathies in cats. JVIM. 2020;34:1062–1077.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15745',
      evidenceLevel: 'Consenso baseado em evidência',
    },
    {
      id: 'ref-plumbs-rcm',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Monografias Furosemide, Pimobendan, Clopidogrel, Rivaroxaban, Atenolol e Diltiazem.',
      sourceType: 'Formulário veterinário',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-fox-rcm',
      citationText:
        'Fox PR. Endomyocardial fibrosis and restrictive cardiomyopathy: pathologic and clinical features. J Vet Cardiol. 2004;6:25–31.',
      sourceType: 'Revisão clinicopatológica',
      url: 'https://doi.org/10.1016/S1760-2734(06)70061-0',
      evidenceLevel: 'C',
    },
    {
      id: 'ref-fat-cat-rcm',
      citationText:
        'Hogan DF, et al. Secondary prevention of cardiogenic arterial thromboembolism in the cat: FAT CAT trial. J Vet Cardiol. 2015.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.1016/j.jvc.2015.10.004',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
