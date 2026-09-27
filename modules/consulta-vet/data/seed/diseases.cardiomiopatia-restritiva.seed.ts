import type { DiseaseRecord } from '../../types/disease';

/**
 * Cardiomiopatia Restritiva Felina (CMR / RCM) — Guia Clínico Editorial de Padrão Ouro.
 * Embasamento: Diretrizes de Consenso ACVIM 2020 (Luis Fuentes et al.) > Fox 2004 (Clinicopathologic Features) >
 * Ettinger's Textbook of Vet Internal Med 9ª ed. 2024 > Nelson & Couto 6ª ed. 2020 >
 * Hogan et al. 2015 (Ensaio FAT CAT) > Plumb's 10ª ed.
 */
export const cardiomiopatiaRestritivaRecord: DiseaseRecord = {
  id: 'disease-cardiomiopatia-restritiva',
  slug: 'cardiomiopatia-restritiva-felina',
  title: 'Cardiomiopatia restritiva felina (CMR / RCM)',
  subtitle: 'Fenótipo miocárdico de rigidez ventricular e fibrose endomiocárdica: disfunção diastólica restritiva, dilatação biatrial maciça, insuficiência cardíaca congestiva e profilaxia antitrombótica agressiva',
  synonyms: [
    'CMR felina',
    'RCM',
    'Cardiomiopatia restritiva em gatos',
    'Fibrose endomiocárdica felina (EMF)',
    'Forma miocárdica da CMR felina'
  ],
  species: ['cat'],
  category: 'cardiologia',
  categories: ['cardiologia', 'medicina-felina', 'urgencia-emergencia', 'clinica-medica'],
  tags: [
    'CMR',
    'RCM',
    'ACVIM 2020',
    'Fibrose endomiocardica',
    'Atrio esquerdo',
    'Disfuncao diastolica',
    'Insuficiencia cardiaca',
    'Tromboembolismo arterial felino',
    'FATE',
    'Clopidogrel',
    'Pimobendan'
  ],
  isPublished: true,
  source: 'seed',

  quickSummary:
    'A cardiomiopatia restritiva felina (CMR / RCM) é um fenótipo miocárdico grave caracterizado por acentuada rigidez e perda de complacência ventricular secundárias a fibrose intersticial miocárdica difusa (forma miocárdica) ou fibrose/cicatrização exuberante do endocárdio com formação de pontes e obliteração apical (forma endomiocárdica). Embora as dimensões da cavidade e a espessura parietal do ventrículo esquerdo (VE) permaneçam tipicamente normais ou discretamente alteradas, e a fração de encurtamento sistólica possa parecer falsamente preservada, o enchimento diastólico sofre colapso precoce com aumento dramático das pressões intracavitárias. Esse aumento retrógrado de pressão transmite-se aos átrios, provocando dilatação biatrial desproporcional e maciça (frequentemente com razão AE/Ao > 2,0), estase sanguínea intracardíaca, congestão venosa pulmonar e sistêmica (efusão pleural prevalecendo sobre edema pulmonar) e altíssimo risco de tromboembolismo arterial aórtico (FATE / saddle thrombus). A ecocardiografia com Doppler tecidual e espectral é o padrão-ouro confirmatório. Não há terapia antifibrótica reversiva; o manejo apoia-se no alívio da congestão (toracocentese e furosemida/torsemida), tromboprofilaxia dupla imediata (clopidogrel + rivaroxabana) e suporte inotrópico com pimobendan.',

  quickDecisionStrip: [
    'Átrio esquerdo maciçamente dilatado (AE/Ao > 1,8 a 2,2) com espessura parietal do VE normal (<5,5 a 6,0 mm) = forte presunção de Cardiomiopatia Restritiva (ACVIM 2020).',
    'Fração de encurtamento normal NÃO significa coração normal: a fração de ejeção afere geometria e diâmetro, mas o ventrículo rígido acomoda volume diastólico mínimo, operando sob altíssima pressão.',
    'Gato em estresse respiratório agudo com abafamento de bulhas cardíacas ventrais: realizar TFAST à beira do leito e toracocentese aliviadora bilateral IMEDIATA antes de qualquer radiografia forçada.',
    'Na espécie felina, a efusão pleural cardiogênica é tão ou mais prevalente que o edema pulmonar na ICC decorrente de CMR, pela drenagem linfática e venosa pleural compartilhada.',
    'Tromboprofilaxia mandatória em todo felino com aumento atrial moderado a grave: Clopidogrel (18,75 mg/gato VO q24h) é significativamente superior à aspirina (ensaio FAT CAT); associar Rivaroxabana (0,5 a 1,0 mg/kg VO q24h) em casos de contraste espontâneo ("fumaça") ou trombo visível.',
    'Pimobendan (0,625 a 1,25 mg/gato VO q12h) é seguro e benéfico na CMR descompensada: ao contrário da CMH, a CMR raramente desenvolve obstrução dinâmica da via de saída do VE (SAM), beneficiando-se do inotropismo e da vasodilatação.',
    'Fluidoterapia intravenosa convencional é POTENCIALMENTE FATAL em gatos com CMR: volumes discretos de cristaloides podem precipitar edema pulmonar agudo e efusão pleural fulminante em minutos.',
    'Paraparesia aguda rígida, frialdade de membros pélvicos, ausência de pulso femoral e dor excruciante = Tromboembolismo Arterial Felino (FATE) por desprendimento de trombo atrial; analgesia imediata com opioides puros (metadona ou fentanil) é imperativa.',
    'Monitoramento domiciliar da Frequência Respiratória em Sono profundo (FRR < 30 mpm) é a ferramenta de maior sensibilidade para prevenir descompensações congestivas graves.',
    'Diferenciar CMR de pericardite constritiva e de CMH em estágio terminal "burned-out" através do Doppler transmitral e tecidual seriado.'
  ],

  quickSummaryRich: {
    lead:
      'A CMR felina desafia a intuição clínica: o ventrículo esquerdo tem espessura e diâmetro normais, mas perdeu a capacidade física de distender-se na diástole. Essa perda de complacência gera dilatação atrial extrema, efusões pleurais volumosas e paralisia embólica súbita por trombo aórtico.',
    leadHighlights: [
      'Fibrose endomiocárdica (pontes cicatriciais) e miocárdica difusa',
      'Disfunção diastólica restritiva grave com fração sistólica normal',
      'Dilatação biatrial maciça e estase ("smoke")',
      'Efusão pleural cardiogênica frequente',
      'Padrão-ouro ecocardiográfico (Doppler E/A e E/E\')',
      'Tromboprofilaxia agressiva com clopidogrel e rivaroxabana'
    ],
    pillars: [
      {
        title: 'Pilar 1: Duas Formas Anatomopatológicas (Fox 2004)',
        body: 'A CMR manifesta-se sob duas apresentações distintas: a Forma Endomiocárdica (EMF), caracterizada por cicatrizes escleróticas densas, pontes fibróticas cruzando o lúmen ventricular e obliteração do ápice do VE; e a Forma Miocárdica (MF), em que a fibrose é microscópica e intersticial, espalhada entre os cardiomiócitos sem pontes grosseiras visíveis, mas gerando idêntica rigidez hemodinâmica.',
        highlights: ['Forma Endomiocárdica obliterativa', 'Forma Miocárdica difusa', 'Perda irreversível da complacência']
      },
      {
        title: 'Pilar 2: Fisiologia Restritiva e Paradoxo Sistólico',
        body: 'Na diástole, o sangue atrial entra rapidamente no VE sob alta pressão e desacelera bruscamente contra a parede rígida (onda E alta e tempo de desaceleração curto <50 ms no Doppler mitral). A pressão diastólica final do VE atinge níveis patológicos, transferindo-se retrogradamente aos capilares pulmonares e veias cavas, resultando em ICC biventricular com efusão pleural e ascite.',
        highlights: ['Padrão Doppler transmitral restritivo', 'Pressões de enchimento altíssimas', 'E/E\' elevado no Doppler tecidual']
      },
      {
        title: 'Pilar 3: Manejo Emergencial da Congestão e Trombose',
        body: 'A abordagem da crise respiratória prioriza a toracocentese imediata e furosemida parenteral com estresse mínimo absoluto (sedação com butorfanol). Na alta, a tromboprofilaxia dupla com clopidogrel e rivaroxabana previne a complicação mais temida da doença: o tromboembolismo arterial aórtico (FATE).',
        highlights: ['Toracocentese como prioridade', 'Furosemida na menor dose eficaz', 'Dupla inibição plaquetária e de fator Xa']
      }
    ],
    diagnosticFlow: {
      title: 'Fluxo Diagnóstico Sequencial da Cardiomiopatia Restritiva Felina',
      steps: [
        {
          label: 'Passo 1: Reconhecimento da Emergência e Estabilização à Beira do Leito',
          detail: 'Gato adulto a idoso apresentando dispneia mista ou restritiva, taquipneia ortopneica, cianose, ritmo de galope audível (S3/S4) e hipofonese de campos pulmonares ventrais. Fornecer oxigênio em fluxo livre imediato e realizar ultrassonografia focal TFAST: se confirmada efusão pleural, realizar toracocentese aliviadora bilateral imediata com escalpe 21G acoplado a torneira de três vias antes de qualquer radiografia.'
        },
        {
          label: 'Passo 2: Avaliação de Sinais de Tromboembolismo Arterial (FATE)',
          detail: 'Inspecionar membros pélvicos: pesquisar os 5 "Ps" clássicos: Paresia/paralisia flácida inicial evoluindo para contratura rígida dos gastrocnêmios, Dor excruciante (Pain), Ausência de pulso femoral (Pulselessness), Palidez/cianose dos coxins plantares (Pallor) e Hipotermia local (Poikilothermia).'
        },
        {
          label: 'Passo 3: Ecocardiografia Transtorácica 2D e Modo M',
          detail: 'Padrão-ouro confirmatório (*isGoldStandard: true*). Avaliar diâmetro e razão do átrio esquerdo/aorta (AE/Ao tipicamente > 1,8 a 2,5 no corte transversal basal). Confirmar que a espessura da parede livre do VE e do septo interventricular na diástole é normal (<5,5 mm). Pesquisar placas hiperecogênicas endocárdicas, bandas ou pontes fibróticas cruzando a cavidade e obliteração apical na forma endomiocárdica.'
        },
        {
          label: 'Passo 4: Doppler Espectral Transmitral e Doppler Tecidual (TDI)',
          detail: 'Avaliar o influxo transmitral: padrão restritivo caracterizado por velocidade de onda E acentuadamente elevada (>1,2 m/s), onda A diminuta ou fundida (razão E/A > 2,0) e tempo de desaceleração da onda E muito curto (DT < 50-60 ms). No Doppler tecidual do anel mitral lateral: velocidade E\' diminuída (<4,0 cm/s) e razão E/E\' acentuadamente aumentada (>15), comprovando pressões de enchimento atriais esquerdas elevadas.'
        },
        {
          label: 'Passo 5: Eletrocardiograma (ECG) e Biomarcadores Cardíacos',
          detail: 'ECG: pesquisar fibrilação atrial (frequente em decorrência do estiramento crônico do miocárdio atrial), complexos ventriculares prematuros (CVP) e bloqueios atrioventriculares. Biomarcadores: NT-proBNP quantitativo sérico tipicamente muito elevado (>500-1000 pmol/L), confirmando etiologia cardiogênica da dispneia.'
        }
      ]
    },
    treatmentFlow: {
      title: 'Algoritmo Terapêutico e Tromboprofilaxia Escalonada',
      steps: [
        {
          label: 'Fase 1: Manejo Hospitalar da ICC Aguda Descompensada',
          detail: 'Toracocentese terapêutica evacuadora de líquido pleural. Furosemida 1 a 2 mg/kg IV ou IM a cada 2 a 4 horas até redução da frequência respiratória para <40 mpm; se refratário, instituir infusão contínua (CRI) de furosemida a 0,2 a 0,6 mg/kg/h. Sedação leve com Butorfanol (0,1 a 0,2 mg/kg IM) para reduzir a ansiedade simpática.'
        },
        {
          label: 'Fase 2: Suporte Inotrópico e Lusitrópico com Pimobendan',
          detail: 'Pimobendan na dose de 0,625 a 1,25 mg/gato VO a cada 12 horas. Como a CMR não apresenta obstrução da via de saída do VE, o pimobendan atua promovendo sensibilização de cálcio, facilitando o relaxamento diastólico e reduzindo a pós-carga por vasodilatação periférica.'
        },
        {
          label: 'Fase 3: Tromboprofilaxia Agressiva (Prevenção Primária e Secundária)',
          detail: 'Instituir Clopidogrel 18,75 mg/gato VO a cada 24 horas como terapia antiplaquetária padrão. Em pacientes com dilatação atrial extrema (AE/Ao > 2,0), fumaça ecocardiográfica ou histórico prévio de FATE: associar Rivaroxabana (0,5 a 1,0 mg/kg VO q24h) ou Enoxaparina (1 mg/kg SC q8-12h na fase aguda).'
        },
        {
          label: 'Fase 4: Manutenção Domiciliar e Nefroproteção',
          detail: 'Manter Furosemida oral na menor dose eficaz capaz de manter a FRR <30 mpm (geralmente 1 a 2 mg/kg VO q12-24h). Em casos de congestão refratária com doses crescentes de furosemida: associar Espironolactona (1 a 2 mg/kg VO q12-24h) ou converter para Torsemida (0,1 a 0,2 mg/kg VO q12-24h). Monitorar eletrólitos, creatinina e ureia a cada 7 a 14 dias após cada titulação.'
        },
        {
          label: 'Fase 5: Manejo do Tromboembolismo Aórtico Agudo (FATE)',
          detail: 'Se FATE presente: analgesia imediata com Metadona (0,2 a 0,3 mg/kg IV/SC q4h) ou Fentanil transdérmico/CRI; heparinização sistêmica imediata; fisioterapia passiva de membros pélvicos; NUNCA tentar embolectomia cirúrgica ou trombólise estreptoquinásica de rotina (alta mortalidade por hipercalemia de reperfusão).'
        }
      ]
    }
  },

  etiology: {
    conceitoEClassificacao:
      'A cardiomiopatia restritiva felina (CMR / RCM) é uma afecção miocárdica primária idiopática, definida pelo consenso ACVIM 2020 como uma cardiomiopatia não hipertrófica, não dilatada, caracterizada por disfunção diastólica restritiva grave e dilatação biatrial marcante desproporcional ao tamanho ventricular.',
    formasAnatomopatologicas: {
      kind: 'clinicalTable',
      headers: ['Forma Anatomopatológica', 'Alterações Macroscópicas', 'Achados Ecocardiográficos', 'Fisiopatologia Predominante'],
      rows: [
        [
          'Forma Endomiocárdica (EMF)',
          'Placas fibróticas espessas no endocárdio, proliferação de tecido conjuntivo que oblitera o ápice do VE e pontes cicatriciais unindo o septo interventricular à parede livre',
          'Bandas e traves hiperecogênicas cruzando a cavidade do VE, distorção dos músculos papilares, dilatação atrial esquerda massiva',
          'Restrição física mecânica ao enchimento ventricular e redução do volume diastólico final efetivo'
        ],
        [
          'Forma Miocárdica (MF)',
          'Endocárdio macroscopicamente liso e normal; presença de fibrose intersticial e perivascular microscópica difusa no miocárdio ventricular',
          'Ventrículo com espessura e diâmetros parietais normais, sem pontes fibróticas visíveis; padrão de fluxo transmitral restritivo e átrios severamente dilatados',
          'Perda da complacência intrínseca dos cardiomiócitos e da matriz extracelular'
        ]
      ]
    },
    hipotesesEtiologicas:
      'A causa primária permanece idiopática na maioria absoluta dos gatos. Postula-se que a forma endomiocárdica represente a sequela cicatricial crônica de episódios prévios de endomiocardite subclínica viral (ex.: Parvovírus felino, Coronavírus felino, Herpesvírus) ou isquemia microvascular miocárdica silenciosa. Diferentemente da cardiomiopatia hipertrófica (CMH), nenhuma mutação genética sarcomérica específica foi até o momento correlacionada de forma consistente à CMR felina.'
  },

  epidemiology: {
    prevalenciaEPerfil:
      'Representa a segunda ou terceira cardiomiopatia mais comum diagnosticada em felinos (respondendo por aproximadamente 15% a 25% das cardiomiopatias felinas em centros de cardiologia terciária). Acomete tipicamente gatos adultos a idosos (idade média de 7 a 11 anos), sem predisposição de sexo evidente. Não há predisposição racial documentada, sendo diagnosticada com alta frequência em gatos domésticos de pelo curto e longo (SRD).',
    apresentacaoClinicaSilenciosa:
      'A fase pré-clínica assintomática é insidiosa e silenciosa: muitos gatos não apresentam sopro cardíaco auscultável nem arritmias perceptíveis até o dia da descompensação aguda. Em mais de 60% dos casos, a primeira manifestação clínica consiste diretamente em insuficiência cardíaca congestiva descompensada (edema pulmonar ou efusão pleural) ou paralisia aguda por tromboembolismo arterial sistêmico (FATE).'
  },

  pathogenesisTransmission: {
    fisiopatologiaDaDisfuncaoDiastolica:
      'O miocárdio e o endocárdio infiltrados por colágeno perdem a propriedade elástica de relaxamento e complacência durante a diástole. Durante a fase de relaxamento isovolumétrico e enchimento rápido ventricular, o ventrículo comporta-se como uma câmara rígida e inextensível: pequenos volumes de sangue ejetados pelo átrio geram aumentos exponenciais imediatos da pressão diastólica ventricular. O influxo sanguíneo é subitamente bloqueado, elevando de forma retrógrada a pressão venocapilar pulmonar e a pressão venosa central sistêmica.',
    dilatacaoBiatrialEEstase:
      'A sobrecarga pressórica crônica sobre os átrios esquerdo e direito provoca estiramento extremo das fibras atriais, apoptose e dilatação atrial compensatória desmedida. A dilatação crônica do átrio esquerdo reduz a velocidade do fluxo na aurícula esquerda para valores críticos (<0,2 m/s), deflagrando estase sanguínea visível ao ultrassom como fumaça ecocardiográfica (spontaneous echocardiographic contrast - SEC), agregação eritrocitária e ativação da cascata de coagulação, formando trombos murais ou pedunculados na aurícula esquerda.',
    tromboembolismoArterialAortico:
      'Fragmentos desses trombos atriais desprendem-se espontaneamente e são ejetados pelo ventrículo esquerdo na circulação arterial sistêmica. Pela geometria anatômica, a imensa maioria dos êmbolos impacta na bifurcação terminal da aorta abdominal nos vasos ilíacos internos e externos (trombo em sela / saddle thrombus), ocluindo subitamente o fluxo arterial para ambos os membros pélvicos.',
    naoTransmissivel:
      'A doença não possui caráter contagioso ou infeccioso transmissível.'
  },

  pathophysiology: {
    comprometimentoPulmonarEPleural:
      'Ao contrário do cão (onde a ICC esquerda manifesta-se quase que exclusivamente por edema pulmonar), no gato a circulação venosa pleural drena tanto para o átrio esquerdo quanto para as veias ázigos e cava cranial (coração direito). Como a CMR promove dilatação e disfunção diastólica biventricular com altas pressões em ambos os átrios, a efusão pleural cardiogênica (líquido modificado/quiliforme) acumula-se rapidamente no espaço pleural, colabando os lobos pulmonares e provocando colapso respiratório restritivo agudo.',
    baixoDebitoCardiovascular:
      'Embora a fração de encurtamento (%FS) mensurada no modo M possa apresentar-se dentro dos limites normais (35% a 50%), o volume sistólico efetivo (stroke volume) ejetado a cada sístole é drasticamente reduzido porque o volume diastólico final do VE é diminuto em razão da rigidez e obliteração cavitária. O paciente opera sob estado crônico de baixo débito cardíaco, hipotensão relativa e hipoperfusão periférica.',
    arritmiasAtriaisEVentriculares:
      'A fibrose transmural atrial e ventricular desorganiza as vias normais de condução elétrica cardíaca, predispondo a bloqueios atrioventriculares de 1º a 3º grau, extrassístoles ventriculares e, fundamentalmente, fibrilação atrial sustentada. A perda da contração atrial coordenada na fibrilação atrial subtrai o "chute atrial" de enchimento, precipitando descompensação hemodinâmica imediata.'
  },

  clinicalSignsPathophysiology: {
    sinaisRespiratoriosECongestivos: [
      'Taquipneia em repouso (>35 a 40 movimentos respiratórios por minuto) e dispneia mista ou restritiva severa com respiração de boca aberta e postura ortopneica (cabeça estendida e cotovelos abduzidos).',
      'Abafamento pronunciado dos sons cardíacos e murmúrios vesiculares nos campos pulmonares ventrais decorrente de efusão pleural bilateral volumosa.',
      'Sons de estertores crepitantes úmidos e tosse discreta ou engasgos decorrentes de edema pulmonar cardiogênico alveolar.',
      'Ascite e hepatomegalia congestiva em casos avançados com insuficiência cardíaca direita concomitante.'
    ],
    sinaisCardiovasculares: [
      'Ritmo de galope ventricular (S3 audível decorrente do impacto do fluxo sanguíneo inicial contra a parede ventricular rígida e inextensível).',
      'Sopro sistólico carotídeo ou mitral (graus I a III/VI) decorrente de regurgitação mitral secundária à distorção do anel valvar e dos músculos papilares.',
      'Arritmias auscultatórias (pulsos deficitários e ritmo caótico indicativos de fibrilação atrial ou extrassístoles ventriculares).',
      'Pulso arterial femoral fraco, hipocinético ou filiforme e extremidades frias refletindo baixo débito sistólico.',
      'Hipotermia progressiva (<37,5°C) que denota choque cardiogênico descompensado.'
    ],
    sinaisDeTromboembolismoArterialAortico: [
      'Paralisia ou paraparesia flácida hiperaguda bilateral dos membros pélvicos acompanhada de vocalização e dor excruciante intensa (sinal de FATE).',
      'Ausência total de pulso arterial palpável nas artérias femorais de ambos os membros pélvicos.',
      'Coxins plantares e leitos ungueais frios, pálidos ou francamente cianóticos.',
      'Enrijecimento e contratura isquêmica dolorosa da musculatura gastrocnêmica dos membros afetados após 6 a 12 horas de oclusão vascular.'
    ]
  },

  diagnosis: {
    passosDiagnosticos: [
      {
        stepNumber: 1,
        title: 'Estabilização de Emergência e Triagem Ultrassonográfica (TFAST)',
        purpose: 'Identificação imediata de efusão pleural e linhas B pulmonares em paciente instável.',
        description:
          'Com o felino em oxigenoterapia e sem contenção estressante, posicionar transdutor ultrassonográfico nos sítios CTS (torácico caudal) e PCS (pericárdico). Confirmar presença de anecoico no espaço pleural e linhas B confluentes ("pulmão molhado").',
        interpretation: 'Confirma acúmulo de líquido pleural, indicando toracocentese aliviadora bilateral imediata.',
        limitations: 'Não define a etiologia miocárdica subjacente.'
      },
      {
        stepNumber: 2,
        title: 'Ecocardiografia Transtorácica 2D, Modo M e Doppler Espectral/Tecidual',
        purpose: 'Confirmação do fenótipo restritivo e diferenciação das formas endomiocárdica e miocárdica.',
        description:
          'Exame completo após estabilização respiratória. Avaliação da razão átrio esquerdo/aorta (AE/Ao), espessura diastólica do septo interventricular e parede livre do VE (IVSd e LVPWd), pesquisa de traves ou bandas hiperecogênicas no VE, Doppler transmitral e Doppler tecidual (TDI) do anel mitral.',
        interpretation:
          'Padrão-ouro (*isGoldStandard: true*). Caracteriza-se por: 1) Dilatação biatrial marcada (AE/Ao > 1,8); 2) Espessura do VE normal (<5,5 mm); 3) Influxo transmitral com padrão restritivo: onda E alta (>1,2 m/s), onda A baixa (razão E/A > 2,0) e tempo de desaceleração da onda E muito curto (<55 ms); 4) Doppler tecidual com onda E\' < 4,0 cm/s e razão E/E\' > 15; 5) Presença de contraste espontâneo ("smoke") ou trombos na aurícula esquerda.',
        limitations: 'CMH em fase final dilatada ("burned-out") pode mimetizar a CMR; ecocardiogramas prévios auxiliam na diferenciação histórica.',
        isGoldStandard: true
      },
      {
        stepNumber: 3,
        title: 'Radiografia Torácica (Após Estabilização e Toracocentese)',
        purpose: 'Avaliação da silhueta cardíaca e do parênquima pulmonar pós-drenagem.',
        description:
          'Projeções laterolaterais e ventrodorsais/dorsoventrais suaves sem estresse.',
        interpretation: 'Evidencia cardiomegalia com formato clássico de "coração em maçã" ou "coração em coração de baralho/Valentine" decorrente da dilatação biatrial pronunciada; infiltrado alveolar e intersticial em campos caudodorsais indicando edema pulmonar.',
        limitations: 'Radiografias com derrame pleural volumoso não drenado ocultam completamente a silhueta cardíaca.'
      },
      {
        stepNumber: 4,
        title: 'Eletrocardiograma de 6 Derivações (ECG)',
        purpose: 'Diagnóstico de taquiarritmias atriais e distúrbios de condução.',
        description:
          'Traçado de 5 a 10 minutos para pesquisar fibrilação atrial (ondas f caóticas sem ondas P visíveis e intervalo R-R totalmente irregular com frequência >220 bpm) e complexos ventriculares ectópicos.',
        interpretation: 'A presença de fibrilação atrial sinaliza dilatação atrial crônica severa e exige controle posológico da frequência cardíaca.',
        limitations: 'Arritmias paroxísticas intermitentes podem não ser registradas no traçado de repouso curto.'
      },
      {
        stepNumber: 5,
        title: 'Dosagem de Biomarcadores Cardíacos e Painel Renal Basal',
        purpose: 'Documentar estiramento miocárdico e estabelecer baseline renal antes de diuréticos.',
        interpretation: 'NT-proBNP quantitativo sérico expressivamente elevado (>500-1500 pmol/L) reforça disfunção cardíaca hemodinâmica grave. Creatinina e ureia basais são cruciais para estadiar síndrome cardiorrenal durante a diurese.',
        limitations: 'NT-proBNP não substitui o ecocardiograma na distinção de fenótipos.'
      }
    ]
  },

  treatment: {
    manejoHospitalarDaCriseAguda: [
      {
        drug: 'Toracocentese Terapêutica Aliviadora',
        indication: 'Gatos com efusão pleural cardiogênica e dispneia restritiva severa.',
        dose: 'Drenagem bilateral contínua até esvaziamento do espaço pleural sob contenção gentil e oxigênio.',
        mechanism: 'Restauração imediata da mecânica ventilatória por reexpansão dos lobos pulmonares colabados.',
        notes: 'A toracocentese salva vidas em minutos; diuréticos isolados levam horas para reabsorver líquido pleural volumoso.'
      },
      {
        drug: 'Furosemida Parenteral (Fase Aguda)',
        indication: 'Edema pulmonar agudo cardiogênico e congestão pulmonar ativa.',
        dose: '1,0 a 2,0 mg/kg IV ou IM a cada 2 a 4 horas inicialmente; ou infusão contínua (CRI) de 0,2 a 0,6 mg/kg/h em bomba de infusão após bolus inicial.',
        mechanism: 'Inibição do cotransportador Na+/K+/2Cl- na alça de Henle ascendente espessa, promovendo intensa diurese salurética e redução do retorno venoso.',
        cautions: 'Monitorar perfusão, creatinina e eletrólitos; evitar desidratação excessiva que resulte em choque hipovolêmico de baixo débito.'
      },
      {
        drug: 'Tartarato de Butorfanol',
        dose: '0,1 a 0,2 mg/kg IM ou SC em dose única aliviadora.',
        indication: 'Sedação ansiolítica leve para reduzir o estresse simpático e consumo miocárdico de oxigênio durante a estabilização.'
      }
    ],
    farmacoterapiaCronicaDeManutencao: [
      {
        drug: 'Clopidogrel (Tromboprofilaxia Obrigatória de Primeira Linha)',
        indication: 'Mandatório em todo gato com dilatação atrial esquerda moderada a grave ou pós-FATE.',
        dose: '18,75 mg por gato (um quarto de comprimido de 75 mg) por via oral a cada 24 horas continuamente.',
        mechanism: 'Antagonista irreversível dos receptores plaquetários de ADP (P2Y12), inibindo a ativação e agregação de plaquetas.',
        notes: 'O ensaio clínico randomizado FAT CAT (Hogan et al. 2015) comprovou tempo de sobrevida significativamente superior e menor taxa de recorrência trombótica com clopidogrel em comparação com a aspirina.'
      },
      {
        drug: 'Rivaroxabana (Anticoagulação com Inibidor de Fator Xa)',
        indication: 'Recomendada em associação ao clopidogrel (tromboprofilaxia dupla) em gatos com altíssimo risco trombótico (presença de "fumaça" ecocardiográfica, trombo intracardíaco ou pós-FATE).',
        dose: '0,5 a 1,0 mg/kg VO a cada 24 horas.',
        mechanism: 'Inibição seletiva e direta do fator de coagulação Xa ativado, impedindo a geração de trombina.'
      },
      {
        drug: 'Pimobendan (Vetmedin)',
        indication: 'Insuficiência cardíaca congestiva decorrente de CMR.',
        dose: '0,625 a 1,25 mg por gato (aproximadamente 0,25 mg/kg) VO a cada 12 horas.',
        mechanism: 'Sensibilizador de cálcio e inibidor da fosfodiesterase III (inodilatador). Melhora a complacência ventricular e o relaxamento diastólico, aumentando a contratilidade atrial e ventricular sem elevar o consumo de oxigênio.',
        notes: 'Como a CMR não cursa com estenose ou obstrução dinâmica da via de saída do VE (SAM), o pimobendan é seguro e promove melhora hemodinâmica consistente.'
      },
      {
        drug: 'Furosemida Oral (Manutenção Domiciliar)',
        dose: '1,0 a 2,0 mg/kg VO a cada 12 a 24 horas, titulada para a menor dose capaz de manter a frequência respiratória em repouso <30 mpm.',
        cautions: 'Monitorar perfil renal e eletrólitos a cada 1 a 3 meses.'
      },
      {
        drug: 'Torsemida (Alternativa para ICC Refratária)',
        indication: 'Casos avançados refratários a doses altas de furosemida (>4-6 mg/kg/dia).',
        dose: '0,1 a 0,2 mg/kg VO a cada 12 a 24 horas (dez vezes mais potente que a furosemida com meia-vida mais longa).'
      },
      {
        drug: 'Espironolactona',
        dose: '1,0 a 2,0 mg/kg VO a cada 12 a 24 horas em associação à furosemida.',
        indication: 'Antagonista de aldosterona para proteção nefroprotetora e redução da fibrose miocárdica.'
      }
    ],
    manejoDaFibrilacaoAtrial:
      'Em felinos com fibrilação atrial de resposta ventricular excessivamente rápida (>220 bpm) que compromete ainda mais o enchimento ventricular: introduzir com extrema cautela Atenolol (6,25 mg/gato VO q12-24h) ou Diltiazem (1,5 a 2,5 mg/kg VO q8h), monitorando rigorosamente para evitar exacerbação de insuficiência cardíaca congestiva decorrente do inotropismo negativo.'
  },

  complications: {
    sequelasClinicasECardiovasculares: [
      'Tromboembolismo Arterial Aórtico Felino (FATE / Saddle Thrombus): oclusão isquêmica súbita da trifurcação aórtica terminal por trombo atrial embolizado. Causa necrose muscular isquêmica de membros pélvicos, dor neuropática agonizante, acidose metabólica lática e risco iminente de hipercalemia fatal de reperfusão durante a recanalização vascular.',
      'Insuficiência Cardíaca Congestiva Refratária e Efusão Pleural Recorrente: progressão da fibrose parietal ventricular tornando o VE praticamente inextensível, exigindo toracocenteses evacuadoras repetidas a cada poucas semanas.',
      'Síndrome Cardiorrenal e Azotemia Pré-Renal Grave: desidratação tubular provocada por altas doses de diuréticos de alça associada ao baixo débito miocárdico basal, resultando em elevações críticas de creatinina, ureia e hipocalemia.',
      'Morte Súbita Cardíaca: óbito repentino em minutos resultante de arritmias ventriculares fatais (fibrilação ventricular), parada sinoatrial ou tromboembolismo coronariano/cerebral maciço.',
      'Necrose Isquêmica Renal e Mesentérica por Tromboembolismo Visceral: embolização arterial para vasos renais e mesentéricos, gerando infarto renal agudo com dor lombar ou infarto intestinal com sepse transmural.'
    ],
    prognostico:
      'O prognóstico para gatos com Cardiomiopatia Restritiva sintomática é reservado a desfavorável. Na fase de descompensação congestiva com insuficiência cardíaca ativa (estágio C da ACVIM), a sobrevida mediana varia historicamente de 6 a 12 meses, sendo truncada precocemente pela ocorrência de FATE ou falência renal progressiva. Em gatos que desenvolvem tromboembolismo arterial aórtico bilateral com perda total de pulsos e hipotermia, a taxa de eutanásia ou óbito na admissão atinge 60% a 70%; entre os que sobrevivem ao primeiro evento embólico, a sobrevida mediana gira em torno de 3 a 6 meses sob tromboprofilaxia estrita.'
  },

  prevention: {
    planoDeMonitoramentoDomiciliar:
      'Não há como prevenir a gênese da fibrose miocárdica primária em razão de sua etiologia idiopática. A prevenção foca categoricamente na detecção de insuficiência cardíaca precoce e no bloqueio da formação de trombos atriais: orientar o tutor a mensurar a Frequência Respiratória em Repouso (FRR) durante o sono profundo do felino (alvo: <25 a 30 mpm); qualquer aumento consistente acima de 30-35 mpm sinaliza acúmulo de líquido pleural ou edema pulmonar e exige atendimento emergencial imediato antes da asfixia clínica.',
    rastreamentoCardiologico:
      'Gatos de meia-idade com ausculta de ritmo de galope (S3/S4) ou arritmias devem realizar ecocardiografia transtorácica preventiva antes de procedimentos anestésicos eletivos ou fluidoterapia.',
    errosComuns: [
      'Prescrever fluidoterapia intravenosa com taxas normais ou elevadas de manutenção para gatos nefropatas que possuem cardiomiopatia restritiva oculta, precipitando efusão pleural e óbito agudo por sobrecarga volumétrica.',
      'Realizar radiografias forçadas de tórax em gatos em estresse respiratório severo sem prévia drenagem de líquido pleural, resultando em parada cardiorrespiratória por hipóxia na mesa de raio-X.',
      'Utilizar monoterapia com aspirina para tromboprofilaxia em felinos de alto risco, ignorando que o clopidogrel é comprovadamente superior na prevenção secundária de FATE.',
      'Tentar embolectomia cirúrgica vascular aberta em cães e gatos com FATE, procedimento de altíssima morbidade e letalidade por choque de reperfusão.',
      'Acreditar que fração de encurtamento normal ao ecocardiograma afasta cardiopatia grave no gato.'
    ],
    redFlags: [
      'Paralisia súbita com membros pélvicos frios e ausência de pulso femoral (emergência de tromboembolismo aórtico).',
      'Frequência respiratória em sono ultrapassando 40 mpm com respiração abdominal forçada (edema pulmonar ou efusão pleural descompensada).',
      'Temperatura corporal retal caindo abaixo de 36,5°C associada a ritmo de galope (choque cardiogênico terminal).'
    ]
  },

  relatedConsensusSlugs: [],
  relatedDiseaseSlugs: [
    'cardiomiopatia-hipertrofica-caes-gatos',
    'cardiomiopatia-dilatada-caes-gatos',
    'arritmias-cardiacas-caes-gatos',
    'doenca-renal-cronica-caes-gatos'
  ],
  relatedMedicationSlugs: [
    'clopidogrel',
    'furosemida',
    'pimobendan',
    'espironolactona',
    'benazepril',
    'atenolol'
  ],
  references: [
    {
      id: 'ref-acvim-feline-cardiomyopathy-rcm',
      title: 'ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats',
      citationText: 'Luis Fuentes V, Abbott J, Chetboul V, et al. ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats. J Vet Intern Med. 2020;34(3):1062-1077.',
      authors: 'Luis Fuentes V, Abbott J, Chetboul V, et al.',
      year: 2020,
      journal: 'Journal of Veterinary Internal Medicine',
      volume: '34',
      pages: '1062-1077',
      sourceType: 'Diretriz de Consenso ACVIM',
      url: 'https://doi.org/10.1111/jvim.15745',
      doi: '10.1111/jvim.15745',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-fat-cat-rcm',
      title: 'Secondary prevention of cardiogenic arterial thromboembolism in the cat: The FAT CAT study',
      citationText: 'Hogan DF, Fox PR, Jacob K, et al. Secondary prevention of cardiogenic arterial thromboembolism in the cat: The FAT CAT study. J Vet Cardiol. 2015;17(Suppl 1):S305-S317.',
      authors: 'Hogan DF, Fox PR, Jacob K, et al.',
      year: 2015,
      journal: 'Journal of Veterinary Cardiology',
      volume: '17',
      pages: 'S305-S317',
      sourceType: 'Ensaio Clínico Randomizado Controlado',
      url: 'https://doi.org/10.1016/j.jvc.2015.10.004',
      doi: '10.1016/j.jvc.2015.10.004',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-fox-rcm',
      title: 'Endomyocardial fibrosis and restrictive cardiomyopathy: pathologic and clinical features',
      citationText: 'Fox PR. Endomyocardial fibrosis and restrictive cardiomyopathy: pathologic and clinical features. J Vet Cardiol. 2004;6(2):25-31.',
      authors: 'Fox PR.',
      year: 2004,
      journal: 'Journal of Veterinary Cardiology',
      volume: '6',
      pages: '25-31',
      sourceType: 'Revisão Clinicopatológica Especializada',
      url: 'https://doi.org/10.1016/S1760-2734(06)70061-0',
      doi: '10.1016/S1760-2734(06)70061-0',
      evidenceLevel: 'B'
    },
    {
      id: 'ref-ettinger-rcm-2024',
      title: "Ettinger's Textbook of Veterinary Internal Medicine: Feline Cardiomyopathies (Restrictive Form)",
      citationText: "Ettinger SJ, Feldman EC, Cote E. Textbook of Veterinary Internal Medicine: Diseases of the Dog and Cat. 9th ed. St. Louis: Elsevier; 2024:1320-1328.",
      authors: 'Ettinger SJ, Feldman EC, Cote E.',
      year: 2024,
      journal: "Ettinger's Textbook of Veterinary Internal Medicine",
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-nelson-couto-rcm',
      title: 'Small Animal Internal Medicine: Restrictive Cardiomyopathy in Cats',
      citationText: 'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. St. Louis: Elsevier; 2020:198-201.',
      authors: 'Nelson RW, Couto CG.',
      year: 2020,
      journal: 'Small Animal Internal Medicine (6th ed)',
      sourceType: 'Livro-texto de Referência',
      evidenceLevel: 'A'
    },
    {
      id: 'ref-plumbs-rcm',
      title: "Plumb's Veterinary Drug Handbook (10th ed) - Furosemide, Clopidogrel, Pimobendan, Rivaroxaban",
      citationText: "Budde J. Plumb's Veterinary Drug Handbook. 10th ed. Ames: Wiley-Blackwell; 2023:472-475 (Furosemide), 274-276 (Clopidogrel), 802-805 (Pimobendan).",
      authors: 'Budde J.',
      year: 2023,
      journal: "Plumb's Veterinary Drug Handbook",
      sourceType: 'Formulário Terapêutico de Referência',
      evidenceLevel: 'A'
    }
  ]
};
