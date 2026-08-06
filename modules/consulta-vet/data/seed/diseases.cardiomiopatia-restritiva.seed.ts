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
        'Taquipneia, dispneia e ortopneia: pressão atrial esquerda elevada produz edema pulmonar.',
        'Efusão pleural: congestão biventricular/venosa e alteração de drenagem linfática restringem ventilação.',
      ],
    },
    {
      system: 'cardiovascular',
      findings: [
        'Som de galope: enchimento contra ventrículo rígido.',
        'Arritmia, especialmente atrial: estiramento atrial e fibrose alteram condução.',
        'Pulso fraco, hipotermia e síncope: baixo volume sistólico apesar de fração de ejeção aparentemente preservada.',
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        'Paresia dolorosa aguda e membros frios: tromboembolismo arterial decorrente de estase no átrio esquerdo.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Hiporexia, perda de peso e letargia: baixo débito, congestão e doença crônica.',
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Ecocardiografia 2D e Doppler',
      description:
        'Exame de referência. Mostra dilatação atrial desproporcional, ventrículo sem hipertrofia marcante, padrão de enchimento restritivo, alterações regionais e, em alguns gatos, placas ou pontes fibróticas. Avalie trombo e contraste espontâneo.',
      isGoldStandard: true,
    },
    {
      stepNumber: 2,
      title: 'Radiografia torácica ou ultrassonografia à beira do leito',
      description:
        'Determina edema e efusão e orienta estabilização. Cardiomegalia variável não exclui pressão de enchimento alta.',
    },
    {
      stepNumber: 3,
      title: 'ECG/Holter',
      description:
        'Indicado em pulso irregular, galope confundível, síncope ou taquicardia. Fibrilação atrial e ectopia mudam tratamento.',
    },
    {
      stepNumber: 4,
      title: 'Laboratório e biomarcadores',
      description:
        'Hemograma, rim, eletrólitos, T4 total e pressão arterial ajudam a excluir comorbidades; NT-proBNP apoia origem cardíaca da dispneia e troponina indica lesão, sem distinguir CMR de outros fenótipos.',
    },
    {
      stepNumber: 5,
      title: 'Diferenciais avançados',
      description:
        'Pericardiopatia constritiva, CMH em estágio final, cardiomiopatia não classificada, cor triatriatum e linfoma infiltrativo. Ressonância e biópsia endomiocárdica ficam para centros especializados e casos em que o resultado mudará conduta.',
    },
  ],
  treatment: {
    congestao: [
      'Use furosemida na descompensação e a menor dose eficaz no domicílio. Budde e McCluskey (2023) descrevem, para gatos, faixa prática de 1–2 mg/kg por via oral a cada 8–12 horas, sempre individualizada.',
      'Toracocentese é terapêutica quando a efusão compromete ventilação; diurético não substitui drenagem urgente.',
      'Pimobendan 0,25 mg/kg por via oral a cada 12 horas pode ser considerado, pois obstrução dinâmica importante não é típica da CMR. A evidência específica é observacional e deve ser apresentada ao tutor como tal.',
    ],
    trombose: [
      'Clopidogrel 18,75 mg/gato por via oral uma vez ao dia é indicado após tromboembolismo ou em alto risco por átrio muito dilatado, contraste espontâneo ou trombo. Hogan et al. (2015) demonstraram, em 75 gatos sobreviventes de tromboembolismo, maior tempo até recorrência com clopidogrel do que com ácido acetilsalicílico.',
      'Em risco extremo/recorrência, associação com rivaroxabana ou heparina pode ser discutida; monitorar sangramento, rim e fígado.',
    ],
    arritmia:
      'Atenolol ou diltiazem somente para taquiarritmia/controle de frequência selecionado. A diástole melhora quando a frequência excessiva cai, mas bradicardia ou inotropia negativa podem piorar baixo débito.',
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
