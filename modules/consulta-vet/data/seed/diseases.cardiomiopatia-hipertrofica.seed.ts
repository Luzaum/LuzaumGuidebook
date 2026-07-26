import type { DiseaseRecord } from '../../types/disease';

export const cardiomiopatiaHipertroficaRecord: DiseaseRecord = {
  id: 'disease-cardiomiopatia-hipertrofica',
  slug: 'cardiomiopatia-hipertrofica-caes-gatos',
  title: 'Cardiomiopatia hipertrófica (CMH)',
  synonyms: [
    'CMH',
    'Cardiomiopatia hipertrófica felina',
    'Cardiomiopatia hipertrófica obstrutiva',
  ],
  species: ['cat', 'dog'],
  category: 'cardiologia',
  tags: ['CMH', 'Ecocardiografia', 'Gato', 'Átrio esquerdo', 'Tromboembolismo', 'Sirolimo', 'Clopidogrel'],
  quickSummary:
    'A cardiomiopatia hipertrófica (CMH) é definida por espessamento do ventrículo esquerdo que não pode ser explicado apenas por hipertensão, hipertireoidismo, acromegalia, desidratação ou outra sobrecarga. É o fenótipo miocárdico mais comum em gatos; em cães, a forma primária é rara. O músculo espessado relaxa mal, eleva a pressão de enchimento, dilata o átrio esquerdo e pode culminar em edema pulmonar, efusão pleural, tromboembolismo arterial ou morte súbita. A ecocardiografia é o exame de referência para confirmar o fenótipo, excluir mimetizadores e estratificar risco. O tratamento depende do estágio: muitos gatos subclínicos apenas são monitorados; pacientes de alto risco podem precisar de tromboprofilaxia; insuficiência cardíaca exige diurese e suporte; e o sirolimo de liberação retardada tornou-se, em 2025, o primeiro produto com aprovação condicional nos EUA para controlar hipertrofia ventricular em gatos com CMH subclínica criteriosamente selecionados.',
  quickDecisionStrip: [
    'Sopro não confirma CMH e sua ausência não a exclui; galope ou arritmia aumentam a suspeita.',
    'Ecocardiografia é o exame de referência; pressão arterial e T4 total ajudam a excluir hipertrofia secundária.',
    'Átrio esquerdo aumentado, contraste espontâneo ou trombo intracardíaco elevam o risco de tromboembolismo.',
    'Dispneia felina: minimizar estresse, fornecer oxigênio, usar ultrassonografia à beira do leito e tratar a congestão antes de exames demorados.',
    'Atenolol não é tratamento automático para toda CMH; priorizar obstrução dinâmica relevante ou taquiarritmia.',
    'Sirolimo de liberação retardada: apenas CMH subclínica selecionada; não extrapolar para insuficiência cardíaca, diabetes ou hepatopatia.',
  ],
  quickSummaryRich: {
    lead:
      'Na CMH, a parede grossa é apenas o começo do raciocínio. O problema clínico central é o relaxamento diastólico: o ventrículo recebe sangue sob pressão, o átrio esquerdo passa a funcionar como reservatório de alta pressão e surgem congestão e estase. Por isso, espessura isolada não define prognóstico; tamanho e função atrial, obstrução da via de saída, arritmias, contraste espontâneo e histórico de congestão ou tromboembolismo pesam mais na decisão.',
    leadHighlights: ['relaxamento diastólico', 'átrio esquerdo', 'congestão', 'tromboembolismo'],
    pillars: [
      {
        title: 'Fenótipo, não causa única',
        body:
          'CMH descreve hipertrofia ventricular. Antes de chamá-la de primária, exclua hipertensão sistêmica, hipertireoidismo, hipersomatotropismo, desidratação e doença infiltrativa.',
        highlights: ['exclua hipertensão', 'hipertireoidismo'],
      },
      {
        title: 'Risco guiado pelo átrio',
        body:
          'Dilatação atrial esquerda, função atrial reduzida, contraste espontâneo e trombo indicam estase e maior risco de insuficiência cardíaca e tromboembolismo; o estágio é mais útil que o rótulo isolado.',
        highlights: ['Dilatação atrial esquerda', 'contraste espontâneo'],
      },
      {
        title: 'Tratamento por estágio',
        body:
          'Não há um protocolo universal. O estágio B1 costuma ser acompanhado; B2 exige análise de risco; C trata congestão e trombose; D individualiza a doença refratária.',
        highlights: ['B1', 'B2', 'C', 'D'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxo de diagnóstico e estadiamento',
      steps: [
        {
          label: '1. Estabilize se houver dispneia',
          detail:
            'Pouco manuseio, oxigênio e ultrassom focado. Toracocentese se a efusão pleural comprometer ventilação; radiografia somente quando o paciente tolerar.',
        },
        {
          label: '2. Confirme o fenótipo',
          detail:
            'Ecocardiografia 2D, M-mode e Doppler: espessura regional, tamanho e função atrial, relaxamento, movimento anterior sistólico da mitral, gradiente de via de saída e trombo.',
        },
        {
          label: '3. Exclua causas secundárias',
          detail:
            'Pressão arterial, T4 total e contexto clínico; IGF-1 se houver fenótipo de hipersomatotropismo. Reavalie após hidratação quando a pseudohipertrofia por desidratação for plausível.',
        },
        {
          label: '4. Estime risco',
          detail:
            'Integre átrio esquerdo, contraste espontâneo ou trombo, função sistólica, arritmias, NT-proBNP e histórico de insuficiência cardíaca ou tromboembolismo arterial.',
        },
      ],
    },
    treatmentFlow: {
      title: 'Conduta por estágio',
      steps: [
        {
          label: 'B1 - baixo risco',
          detail:
            'Sem sinais e sem dilatação atrial relevante: geralmente monitorar; não há benefício comprovado de atenolol, IECA ou clopidogrel universais.',
        },
        {
          label: 'B2 - maior risco',
          detail:
            'Considerar clopidogrel quando o risco trombótico é alto; tratar obstrução/taquiarritmia selecionada. Sirolimo de liberação retardada pode ser opção regulatória específica nos EUA.',
        },
        {
          label: 'C - insuficiência cardíaca ou tromboembolismo',
          detail:
            'Furosemida e suporte para congestão; toracocentese quando indicada; analgesia e antitrombóticos no tromboembolismo; plano domiciliar guiado pela frequência respiratória.',
        },
        {
          label: 'D - refratária',
          detail:
            'Ajustar diurético, considerar torsemida e combinações especializadas, revisar perfusão renal e qualidade de vida.',
        },
      ],
    },
  },
  etiology: {
    primaria:
      'Na maioria dos gatos, a etiologia individual permanece desconhecida. Variantes em MYBPC3 foram associadas à CMH em Maine Coon e Ragdoll, com penetrância incompleta; teste genético positivo indica risco, não gravidade, e teste negativo não exclui CMH causada por outras variantes.',
    secundaria:
      'Hipertensão sistêmica, hipertireoidismo, hipersomatotropismo, estenose subaórtica e infiltração miocárdica podem produzir hipertrofia secundária. A desidratação reduz a cavidade ventricular e pode criar pseudohipertrofia transitória.',
    caes:
      'A CMH primária canina é incomum e descrita sobretudo de forma esporádica. Em cão com parede espessa, exclua primeiro sobrecarga pressórica, endocrinopatia, doença infiltrativa e variação racial.',
  },
  epidemiology: {
    felinos:
      'Luis Fuentes et al. (2020) reuniram estudos ecocardiográficos que estimam prevalência próxima de 15% na população felina geral e de até cerca de 29% em gatos idosos, mesmo após excluir hipertensão e hipertireoidismo. Muitos permanecem subclínicos por anos.',
    perfil:
      'Machos são representados com maior frequência e podem desenvolver hipertrofia mais acentuada. Maine Coon, Ragdoll, Sphynx, British Shorthair e Persa aparecem em coortes e linhagens familiares, mas gatos sem raça definida também são frequentemente afetados.',
    desfechos:
      'Entre os gatos que descompensam, insuficiência cardíaca congestiva é a apresentação clínica mais comum, seguida por tromboembolismo arterial; morte súbita ocorre em uma minoria. Dilatação atrial, ritmo de galope, arritmia e disfunção sistólica elevam o risco.',
  },
  pathogenesisTransmission: {
    progressao: [
      'Alteração sarcomérica ou estímulo secundário aumenta a espessura e a desorganização dos cardiomiócitos; fibrose intersticial piora relaxamento e reserva coronariana.',
      'Relaxamento lento e baixa complacência elevam a pressão diastólica do ventrículo esquerdo; o átrio esquerdo dilata para acomodar o gradiente de enchimento.',
      'A pressão atrial elevada é transmitida às veias pulmonares, causando edema pulmonar e/ou derrame pleural.',
      'Dilatação e hipocontratilidade atriais geram estase; com hipercoagulabilidade e lesão endotelial, forma-se trombo, geralmente no apêndice atrial esquerdo, que pode embolizar para a trifurcação aórtica.',
    ],
    obstrucao:
      'O movimento anterior sistólico da valva mitral aproxima o folheto do septo, estreita dinamicamente a via de saída e causa regurgitação mitral. Taquicardia, baixa pré-carga e aumento da contratilidade intensificam o gradiente; fluidoterapia, estresse e vasodilatação devem ser individualizados.',
    transmissao:
      'Não é contagiosa. Em famílias com mutação conhecida, há risco hereditário; o rastreio deve combinar genótipo e ecocardiografia seriada.',
  },
  pathophysiology:
    'A CMH é predominantemente uma doença diastólica: a parede hipertrofiada e fibrosada relaxa mal, reduz o enchimento e eleva a pressão atrial. A taquicardia encurta ainda mais a diástole; por isso um ritmo de galope ou uma taquiarritmia pode precipitar congestão. A baixa reserva coronariana favorece isquemia, troponina elevada, arritmias e áreas de adelgaçamento. Quando a pressão hidrostática pulmonar supera a capacidade linfática, surge edema; quando predomina estase atrial, cresce o risco de tromboembolismo.',
  clinicalSignsPathophysiology: [
    {
      system: 'cardiovascular',
      findings: [
        'Sopro sistólico: geralmente vem da obstrução dinâmica e/ou regurgitação mitral; pode variar com o estresse e não mede sozinho a gravidade.',
        'Som de galope: reflete enchimento rápido contra ventrículo pouco complacente e aumenta a suspeita de cardiomiopatia.',
        'Arritmias ou síncope: isquemia, fibrose e instabilidade elétrica reduzem débito cerebral ou desencadeiam morte súbita.',
      ],
    },
    {
      system: 'respiratory',
      findings: [
        'Taquipneia, dispneia e ortopneia: aumento da pressão venosa pulmonar produz edema; efusão pleural restringe a expansão pulmonar.',
        'Tosse é menos típica em gatos que em cães; dispneia felina deve ser tratada como emergência cardiopulmonar até estabilização.',
      ],
    },
    {
      system: 'neuromuscular',
      findings: [
        'Dor aguda, paresia/paralisia de membros pélvicos, extremidades frias e pulsos femorais ausentes: tromboembolismo aórtico interrompe perfusão e causa isquemia muscular e nervosa.',
      ],
    },
    {
      system: 'general',
      findings: [
        'Hipotermia, azotemia pré-renal e fraqueza na insuficiência cardíaca grave refletem baixo débito e vasoconstrição periférica.',
        'Muitos gatos não apresentam sinal clínico antes de insuficiência cardíaca, tromboembolismo ou morte súbita; auscultação normal não exclui CMH.',
      ],
    },
  ],
  diagnosis: [
    {
      stepNumber: 1,
      title: 'Ecocardiografia completa com Doppler',
      description:
        'Exame de referência para confirmar o fenótipo, medir espessura em múltiplos segmentos, avaliar tamanho e função atrial, padrão de enchimento, obstrução da via de saída, movimento anterior sistólico da mitral, regurgitação e trombo. Luis Fuentes et al. (2020) consideram que espessura máxima ≥6 mm apoia hipertrofia no gato adulto, mas a zona cinzenta, o tamanho corporal e a hidratação exigem interpretação.',
      isGoldStandard: true,
    },
    {
      stepNumber: 2,
      title: 'Pressão arterial, T4 total e investigação de mimetizadores',
      description:
        'Obrigatórios em gato adulto ou idoso para distinguir CMH primária de hipertrofia secundária. Solicite IGF-1 quando houver diabetes resistente, crescimento de tecidos moles ou organomegalia. Repita o ecocardiograma após corrigir a desidratação quando necessário.',
    },
    {
      stepNumber: 3,
      title: 'Radiografia torácica ou ultrassonografia à beira do leito',
      description:
        'Radiografia confirma edema, derrame e tamanho cardíaco, mas não classifica com segurança o fenótipo. Em dispneia instável, a ultrassonografia à beira do leito reduz manipulação e orienta diurese ou toracocentese.',
    },
    {
      stepNumber: 4,
      title: 'NT-proBNP e troponina I',
      description:
        'NT-proBNP é exame de triagem e ajuda a separar dispneia cardíaca de não cardíaca; resultado normal não exclui doença leve. Troponina I indica lesão miocárdica, não etiologia. Nenhum deles substitui a ecocardiografia.',
    },
    {
      stepNumber: 5,
      title: 'ECG e Holter',
      description:
        'Usar em síncope, pulso irregular, taquicardia persistente ou suspeita de arritmia. ECG normal não exclui CMH; Holter quantifica ectopia e relaciona eventos.',
    },
    {
      stepNumber: 6,
      title: 'Genética',
      description:
        'O teste de MYBPC3 é útil em Maine Coon e Ragdoll para seleção reprodutiva e vigilância. Não é teste diagnóstico universal e não substitui o fenótipo ecocardiográfico.',
    },
  ],
  treatment: {
    prioridades: [
      'Dispneia ou insuficiência cardíaca aguda: ambiente calmo, oxigênio, furosemida parenteral titulada à resposta e toracocentese se houver derrame relevante. Evite fluidoterapia empírica antes de avaliar congestão.',
      'Insuficiência cardíaca crônica: use furosemida na menor dose eficaz e monitore frequência respiratória em repouso, peso, creatinina e eletrólitos. Schober et al. (2021) compararam pimobendan e placebo em gatos com CMH e insuficiência cardíaca recente; não encontraram benefício no desfecho de 180 dias. O uso deve ser individualizado para disfunção sistólica ou baixo débito, especialmente sem obstrução importante.',
      'Hogan et al. (2015), no ensaio FAT CAT com 75 gatos sobreviventes de tromboembolismo, compararam clopidogrel 18,75 mg/gato ao dia com ácido acetilsalicílico. A mediana até recorrência foi 443 dias com clopidogrel e 192 dias com ácido acetilsalicílico, sustentando clopidogrel como base da prevenção secundária.',
      'Rivaroxabana: Budde e McCluskey (2023) descrevem 0,5–1 mg/kg por via oral a cada 12–24 horas ou 2,5 mg/gato ao dia em associação com clopidogrel. É uso extra-bula, com evidência ainda limitada; avalie função renal, função hepática e sinais de sangramento.',
      'Obstrução dinâmica ou taquiarritmia: atenolol inicialmente 6,25 mg/gato por via oral a cada 12 horas, titulado por frequência, pressão e ecocardiograma, pode reduzir a obstrução da via de saída. Evite em insuficiência cardíaca descompensada, choque, bradicardia ou bloqueio.',
      'Diltiazem: opção para taquiarritmia supraventricular ou casos selecionados; Budde e McCluskey (2023) descrevem 7,5–15 mg/gato por via oral duas a três vezes ao dia na fórmulação imediata, ou 30–45 mg/gato uma vez ao dia na fórmulação prolongada. A evidência de modificação da CMH é fraca.',
      'Kaplan et al. (2023), no ensaio RAPACAT, estudaram sirolimo de liberação retardada uma vez por semana durante 180 dias em gatos com CMH subclínica não obstrutiva e observaram interrupção da progressão da hipertrofia na dose baixa. O estudo não demonstrou prevenção de insuficiência cardíaca, tromboembolismo ou morte; houve um caso de cetoacidose diabética. A FDA concedeu aprovação condicional nos Estados Unidos em 2025 para 0,3 mg/kg uma vez por semana, com triagem de diabetes e hepatopatia.',
      'Tromboembolismo arterial agudo: analgesia opioide imediata, suporte térmico prudente, avaliação de potássio e lesão de reperfusão, clopidogrel e anticoagulação individualizada. Trombolítico não é rotina por risco de reperfusão e benefício incerto.',
    ],
    monitoramento: [
      'Frequência respiratória dormindo: tendência sustentada acima do basal ou >30–35/min merece contato e reavaliação.',
      'Peso, apetite, pressão arterial, ureia/creatinina e eletrólitos 3–7 dias após mudanças relevantes de diurético, depois conforme estabilidade.',
      'Ecocardiografia em 6–12 meses no subclínico, mais cedo se átrio aumentado, progressão, arritmia ou nova sintomatologia.',
      'Hemograma, função renal/hepática e sangramento em terapia antitrombótica; função hepática e glicemia para sirolimo.',
    ],
    alertas:
      'Evite combinar atenolol e diltiazem sem supervisão cardiológica por risco de bradicardia, bloqueio e hipotensão. Vasodilatadores e inotrópicos podem intensificar a obstrução da via de saída do ventrículo esquerdo em alguns gatos. Todas as doses são decisões veterinárias individualizadas e várias são extra-bula.',
  },
  prevention: {
    rastreio:
      'Não há prevenção garantida para a forma idiopática. Em raças e famílias de risco, ecocardiografia reprodutiva seriada e teste genético específico, quando validado, ajudam a reduzir a propagação de variantes conhecidas; um único ecocardiograma normal em animal jovem não garante ausência futura.',
    secundaria:
      'Controle de pressão arterial, hipertireoidismo e hipersomatotropismo previne ou reduz hipertrofia secundária. Manter hidratação adequada evita pseudohipertrofia e interpretações equivocadas.',
    tutor:
      'Ensinar contagem respiratória em repouso e sinais de tromboembolismo arterial permite atendimento precoce. Não prescreva antitrombótico preventivo apenas por sopro sem estratificação.',
  },
  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: ['hipertensao-arterial-sistemica-caes-gatos', 'hipertireoidismo-felino'],
  relatedMedicationSlugs: ['pimobendan', 'benazepril'],
  references: [
    {
      id: 'ref-nelson-couto-hcm',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. 2020. Cap. 7–8, Myocardial Diseases of the Dog and Cat; PDF anexado, pp. 171–202.',
      sourceType: 'Livro-texto',
      notes: 'Etiologia, fisiopatologia, sinais, diagnóstico e manejo clássico.',
      evidenceLevel: 'Referência clínica',
    },
    {
      id: 'ref-acvim-feline-cardiomyopathy-2020',
      citationText:
        'Luis Fuentes V, Abbott J, Chetboul V, et al. ACVIM consensus statement guidelines for classification, diagnosis, and management of cardiomyopathies in cats. JVIM. 2020;34:1062–1077.',
      sourceType: 'Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15745',
      evidenceLevel: 'Consenso baseado em evidência',
    },
    {
      id: 'ref-plumbs-hcm-drugs',
      citationText:
        'Budde JA, McCluskey DM. Plumb’s Veterinary Drug Handbook. 10th ed. 2023. Monografias Atenolol, Clopidogrel, Diltiazem, Furosemide, Pimobendan e Rivaroxaban.',
      sourceType: 'Formulário veterinário',
      notes: 'Doses, contraindicações, interações e monitoramento.',
      evidenceLevel: 'Referência farmacológica',
    },
    {
      id: 'ref-rapacat-2023',
      citationText:
        'Kaplan JL, et al. Delayed-release rapamycin halts progression of left ventricular hypertrophy in subclinical feline HCM: RAPACAT trial. JAVMA. 2023;261:1628–1637.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.2460/javma.23.04.0187',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-fda-felycin-2025',
      citationText:
        'US FDA. Conditional approval of Felycin-CA1 for management of ventricular hypertrophy in cats with subclinical HCM. 2025.',
      sourceType: 'Fonte regulatória',
      url: 'https://www.fda.gov/animal-veterinary/cvm-updates/fda-conditionally-approves-drug-management-ventricular-hypertrophy-cats',
      notes: 'Aprovação condicional nos EUA; não equivale a comprovação de melhora de sobrevida.',
      evidenceLevel: 'Regulatório',
    },
    {
      id: 'ref-fat-cat',
      citationText:
        'Hogan DF, et al. Secondary prevention of cardiogenic arterial thromboembolism in the cat: FAT CAT trial. J Vet Cardiol. 2015;17 Suppl 1:S306–S317.',
      sourceType: 'Ensaio randomizado',
      url: 'https://doi.org/10.1016/j.jvc.2015.10.004',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-rivaroxaban-hcm-2024',
      citationText:
        'Jaturanratsamee K, et al. Rivaroxaban versus enoxaparin plus clopidogrel for HCM-associated thromboembolism in cats. Vet World. 2024;17:796–803.',
      sourceType: 'Ensaio clínico pequeno',
      url: 'https://doi.org/10.14202/vetworld.2024.796-803',
      notes: 'Amostra pequena; interpretar como evidência emergente.',
      evidenceLevel: 'C',
    },
  ],
  isPublished: true,
  source: 'seed',
};
