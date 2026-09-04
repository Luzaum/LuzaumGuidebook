import type { DiseaseRecord } from '../../types/disease';
import { DISEASE_PLAIN_LANGUAGE } from './diseasePlainLanguage';

/**
 * Diabetes Mellitus Canino — Ficha clínica estruturada ConsultaVET.
 * Fontes: Aula Magna 2026 > AAHA 2018/2022 > Tardo et al. 2024 (Toujeo U300) > Mott et al. 2025 (Degludeca) > Nelson & Couto 6ª ed. > Beam et al. 1999 (Catarata).
 */
export const diabetesMellitusCaninaRecord: DiseaseRecord = {
  id: 'disease-diabetes-mellitus-canina',
  slug: 'diabetes-mellitus-canina',
  title: 'Diabetes Mellitus Canino',
  synonyms: [
    'Diabetes canino',
    'DM canina',
    'Diabetes mellitus em cães',
    'Diabetes Mellitus Canino',
    'Canine diabetes mellitus',
  ],
  species: ['dog'],
  category: 'endocrinologia',
  tags: [
    'Diabetes',
    'Insulina',
    'Caninsulin',
    'NPH',
    'Toujeo',
    'Degludeca',
    'Catarata',
    'Diestro',
    'OVH',
    'PU/PD',
    'Glicosuria',
    'AAHA',
  ],
  plainLanguage: DISEASE_PLAIN_LANGUAGE['diabetes-mellitus-canina'],
  quickSummary:
    'O diabetes mellitus canino é uma endocrinopatia predominantemente insulinodeficiente, caracterizada por hiperglicemia persistente, glicosúria e sinais clínicos como poliúria, polidipsia, polifagia e perda de peso. A deficiência de insulina impede utilização adequada da glicose e favorece gliconeogênese, proteólise e lipólise, produzindo simultaneamente hiperglicemia e estado catabólico. O diagnóstico é sustentado pela associação entre sinais clínicos, hiperglicemia persistente e glicosúria. Diferentemente do gato, o cão com diabetes clínica praticamente sempre necessita insulinoterapia permanente e a remissão espontânea é rara, com exceção de alguns casos relacionados ao diestro quando a ovariohisterectomia é realizada precocemente. A insulina lente suína permanece uma escolha inicial prática, geralmente iniciada de forma conservadora em 0,25 U/kg SC q12h. Monitoramento deve priorizar controle dos sinais, peso corporal e prevenção de hipoglicemia, utilizando curvas domiciliares ou monitor contínuo de glicose quando indicado. Catarata é uma complicação extremamente frequente e pode desenvolver-se rapidamente. Doses superiores a 1,5 U/kg por aplicação com controle inadequado caracterizam resistência insulínica operacional e exigem investigação de técnica, hiperadrenocorticismo, diestro, pancreatite, infecção, obesidade e outras causas (1,4–9,15,16).',
  quickDecisionStrip: [
    'Tríade Diagnóstica: Sinais clínicos (PU/PD, perda de peso, polifagia) + Hiperglicemia persistente + Glicosúria (1,4,5).',
    'Insulinoterapia Vitalícia: O cão com DM clínica apresenta perda β-celular e praticamente sempre requer insulina exógena contínua (1,4,5).',
    'Insulina Inicial Preferida: Insulina lente suína 0,25 UI/kg SC q12h pelo PCI — ECC 5 = peso atual; ECC 6–9 = peso ÷ 1,10 a 1,40 (Behrend et al., 2018).',
    'Cadelas Inteiras em Diestro: OVARIOHISTERECTOMIA imediata é parte do tratamento para interromper progesterona e GH mamário (1,4,5).',
    'Monitorar Catarata: 50% dos cães desenvolvem catarata até 170 dias e 80% até 470 dias pós-diagnóstico; atenção a uveíte lente-induzida (15).',
    'Toujeo U300 em Cães: Iniciar em 0,5 U/kg SC q24h; usar a caneta própria e NUNCA aspirar de caneta U300 com seringa U100 (8).',
    'Degludeca U100 em Cães: Alternativa basal com mediana inicial de 0,6 U/kg q24h em estudo prospectivo (9).',
    'Resistência Insulínica Definição AAHA: Resposta inadequada a doses >1,5 U/kg por aplicação (4).',
    'Anorexia no Diabético: Emergência clínica! Investigar pancreatite, DKA, pielonefrite, piometra e uremia imediatamente (1,14,16).',
    'Peso Ideal p/ Insulina: ECC 5 = peso atual; ECC 6–9 → PCI = peso ÷ 1,10 a 1,40; dose = PCI × UI/kg (Behrend et al., 2018).',
  ],
  quickSummaryRich: {
    lead:
      'O diabetes mellitus canino é uma doença predominantemente insulinodeficiente caracterizada por hiperglicemia persistente, glicosúria, estado catabólico grave e alto risco de catarata precoce. A insulinoterapia exógena continuada e a consistência alimentar constituem os pilares da conduta, devendo cadelas inteiras ser submetidas à ovariohisterectomia precocemente.',
    leadHighlights: ['insulinodeficiente', 'catabólico', 'catarata precoce', 'ovariohisterectomia'],
    pillars: [
      {
        title: 'Fisiopatologia & Catabolismo',
        body: 'A ausência de insulina impede a utilização tecidual de glicose e desinibe a gliconeogênese, lipólise e proteólise, gerando emagrecimento grave apesar da polifagia.',
        highlights: ['desinibe gliconeogênese', 'emagrecimento', 'polifagia'],
      },
      {
        title: 'Conduta Terapêutica Inicial',
        body: 'Insulina lente suína (Caninsulin®) 0,25 UI/kg SC q12h pelo peso corporal ideal (PCI), não pelo peso atual se obeso. Duas refeições idênticas; titular a cada 7–14 dias.',
        highlights: ['peso corporal ideal', '0,25 UI/kg q12h', 'duas refeições'],
      },
      {
        title: 'Prevenção & Diestro',
        body: 'Progesterona estimula GH mamário que induz intensa resistência insulínica. A OVH precoce interrompe o antagonismo hormonal e previne lesão β irreversível.',
        highlights: ['Progesterona', 'GH mamário', 'OVH precoce'],
      },
    ],
    diagnosticFlow: {
      title: 'Fluxograma diagnóstico',
      steps: [
        {
          label: 'Suspeita clínica',
          timing: 'Consulta inicial',
          detail:
            'Poliúria, polidipsia, polifagia com perda de peso; hepatomegalia e hiperlipidemia frequentes. Anorexia/vômitos = complicação aguda (Behrend et al., 2018; Nelson & Couto, 2020).',
        },
        {
          label: 'Glicemia + urinálise',
          timing: 'Primeiro exame',
          detail:
            'Hiperglicemia persistente + glicosúria sustentada formam a tríade. Glicemia isolada (estresse) ou glicosúria isolada não confirmam DM (Behrend et al., 2018).',
          reassess: 'Frutosamina se dúvida sobre persistência da hiperglicemia.',
        },
        {
          label: 'Banco inicial',
          timing: 'Confirmação',
          detail:
            'Hemograma, bioquímica, eletrólitos, urinálise por cistocentese, ceto-fita; urocultura se sedimento alterado ou refratariedade (Behrend et al., 2018; Nelson & Couto, 2020).',
        },
        {
          label: 'Classificar compensação',
          timing: 'Antes de iniciar insulina',
          detail:
            'DM compensado vs DKA/HHS. DKA/HHS exigem estabilização hospitalar antes de esquema ambulatorial (Textbook of Small Animal Emergency Medicine, 2020).',
        },
        {
          label: 'Iniciar insulinoterapia + dieta',
          timing: 'DM não complicado',
          detail:
            'Insulina lente suína 0,25 U/kg SC q12h (peso ideal) + duas refeições idênticas; OVH se cadela inteira (Behrend et al., 2018).',
        },
      ],
    },
    treatmentFlow: {
      title: 'Fluxograma terapêutico',
      steps: [
        {
          label: 'Insulina lente suína — início',
          detail: 'Caninsulin®/Vetsulin® U40: 0,25 U/kg SC q12h pelo peso ideal; agitar vigorosamente; seringa U40 (Behrend et al., 2018; Plumb\'s, 10ª ed.).',
          dose: '0,25 U/kg q12h SC (máx. inicial usual 0,25–0,5 U/kg).',
          duration: 'Vitalícia na maioria dos casos.',
          reassess: 'Titular a cada 7–14 dias conforme clínica e curva/monitor contínuo de glicose.',
        },
        {
          label: 'Alimentação consistente',
          detail: 'Duas refeições iguais casadas com insulina q12h; fibra pode suavizar picos, mas horário e porção são prioritários (Behrend et al., 2018).',
        },
        {
          label: 'OVH em cadela inteira',
          detail: 'Após estabilização inicial; reduzir insulina no pós-operatório — risco de hipoglicemia rápida (Behrend et al., 2018).',
          reassess: 'Monitorar glicemia domiciliar nas 48–72 h pós-OVH.',
        },
        {
          label: 'Monitoramento clínico + glicêmico',
          detail: 'Resolver PU/PD e perda de peso; curva domiciliar ou monitor contínuo de glicose; valor mínimo glicêmico alvo 80–150 mg/dL; frutosamina q1–3 meses (Behrend et al., 2018).',
          reassess: 'Valor mínimo glicêmico OK + hiperglicemia pré-dose = duração curta → trocar insulina, NÃO aumentar dose.',
        },
        {
          label: 'Resistência >1,5 U/kg/dose',
          detail: 'Investigar técnica, efeito rebote de Somogyi, HAC, diestro, pancreatite, ITU, obesidade, esteroides (Behrend et al., 2018; Nelson & Couto, 2020).',
          duration: 'Sequencial — ver fluxograma de resistência na seção Tratamento.',
        },
      ],
    },
  },
  etiology: {
    definicao:
      'Diabetes mellitus (DM) é uma síndrome metabólica decorrente de insuficiência absoluta ou relativa da ação da insulina. Essa insuficiência pode resultar de redução da secreção de insulina pelas células β pancreáticas, resistência dos tecidos-alvo à insulina ou combinação de ambos os mecanismos (1,4,5). O resultado é hiperglicemia e estado catabólico profundo (1,5).',
    mecanismosDestruicaoBeta:
      'A perda de células β no cão envolve destruição imunomediada, degeneração e vacuolização das células β, pancreatite crônica destrutiva, predisposição genética e insulatos desconhecidos (1,5). Nem todo cão apresenta autoimunidade comprovada (1,5).',
    resistênciaInsulínicaAgregada:
      'Principais fatores indutores de resistência insulínica em cães: hiperadrenocorticismo (HAC), obesidade, diestro, progesterona, hormônio do crescimento (GH), glicocorticoides, progestágenos, infecções bacterianas, doença periodontal, pancreatite e inflamação sistêmica (1,4,5).',
    diestroMecanismo:
      'Na cadela inteira: progesterona de origem luteal estimula a secreção mamária de GH → o GH antagoniza a ação da insulina no receptor → resistência insulínica intensa → hiperglicemia → glicotoxicidade sobre as células β → DM clínica (1,4,5).',
  },
  epidemiology: {
    prevalencia:
      'Endocrinopatia comum em cães de meia-idade a idosos (>7 anos). Algumas populações demonstram maior incidência em fêmeas, principalmente fêmeas inteiras em fase de diestro (5,16). Predisposições raciais variam geograficamente.',
  },
  pathogenesisTransmission: {
    cascata: [
      'Deficiência severa da secreção ou ação da insulina nas células-alvo (1,5).',
      'Diminuição da captação e utilização periférica da glicose em músculo e tecido adiposo (1,5).',
      'Desinibição da glicogenólise e gliconeogênese hepática a partir de aminoácidos, lactato e glicerol (1,5).',
      'Instalação de hiperglicemia plasmática persistente (1,5).',
      'Ultrapassagem do limiar renal de glicose no cão (~180–200 mg/dL) gerando glicosúria (1,6).',
      'Diurese osmótica no túbulo renal → retenção de água no filtrado → poliúria descompensada (1,6).',
      'Déficit hídrico e hiperosmolaridade plasmática → estímulo ao centro da sede → polidipsia compensatória (1,6).',
      'Déficit energético celular + proteólise e lipólise desinibidas → polifagia com perda ponderal e sarcopenia (1,5).',
    ],
    transmissao:
      'Doença endógena metabólica e endócrina. Não contagiosa.',
  },
  pathophysiology:
    'A insulina é o principal hormônio anabólico. Sua escassez promove a tríade de hiperglicemia (menor utilização periférica + maior produção hepática de glicose), diurese osmótica renal quando o limiar de ~180–200 mg/dL é superado e catabolismo acentuado. A lipólise acelerada libera ácidos graxos livres que são oxidados no fígado a acetil-CoA, gerando corpos cetônicos (β-hidroxibutirato, acetoacetato e acetona) (Nelson & Couto, 2020; Textbook of Small Animal Emergency Medicine, 2020). Na cadela em diestro, o GH de origem mamário induzido pela progesterona promove bloqueio intenso do receptor de insulina. A cirurgia de OVARIOHISTERECTOMIA é tratamento indicado pela AAHA (Behrend et al., 2018); a remoção cirúrgica da fonte progestágena pode reduzir a necessidade de insulina bruscamente, exigindo monitoramento rigoroso pós-operatório para evitar hipoglicemia (Behrend et al., 2018). No olho do cão, a hiperglicemia constante satura a hexocinase lenticular; a aldose redutase converte glicose em sorbitol, que se acumula no cristalino, atrai água osmoticamente e degrada as fibras lentiulares, gerando catarata intumescente em 50% dos cães até 170 dias e em 80% até 470 dias (Beam et al., 1999).',
  clinicalSignsPathophysiology: [
    {
      system: 'metabolico',
      findings: [
        {
          finding: 'Os 4 Ps: Poliúria, Polidipsia, Polifagia e Perda de Peso',
          mechanism:
            'Diurese osmótica por glicosúria (>180-200 mg/dL) gerando PU/PD; déficit energético celular com proteólise/lipólise gerando PP e emagrecimento (1,5,6).',
          clinicalMeaning: 'Apresentação clássica do diabetes não complicado no cão (1,4,5).',
          priority: 'common',
        },
        {
          finding: 'Catarata diabética bilateral e Uveíte Lente-Induzida',
          mechanism:
            'Via do sorbitol estimulada pela aldose redutase no cristalino → edema hiperosmótico das fibras lenticulares (5,15).',
          clinicalMeaning: 'Ocorre em 50% dos cães até 170 dias e 80% até 470 dias pós-diagnóstico (15). Encaminhar ao oftalmologista.',
          priority: 'common',
        },
        {
          finding: 'Hepatomegalia e Hiperlipidemia',
          mechanism:
            'Mobilização massiva de ácidos graxos periféricos com acúmulo de triglicerídeos no parênquima hepático (1,5).',
          clinicalMeaning: 'Frequente ao exame físico e ultrassonográfico (1,5).',
          priority: 'common',
        },
        {
          finding: 'Anorexia, Vômitos e Prostração no Diabético',
          mechanism:
            'Complicação por Cetoacidose Diabética (DKA), Pancreatite aguda, Pielonefrite ou Estado Hiperglicêmico Hiperosmolar (HHS) (1,14,16).',
          clinicalMeaning: 'Sinal de alarme imediato. Exige hospitalização e investigação laboratorial (1,14).',
          priority: 'critical',
        },
      ],
    },
  ],
  diagnosis: {
    triadeDiagnostica:
      'Sinais clínicos compatíveis (PU/PD, perda de peso, polifagia) + Hiperglicemia persistente + Glicosúria (1,4,5). Hiperglicemia isolada (estresse, drogas) ou glicosúria isolada (Fanconi, lesão tubular, SGLT2i) não confirmam diabetes isoladamente (5,6).',
    examesIniciais:
      'Hemograma completo, bioquímica sérica (glicose, ureia, creatinina, ALT, FA, proteína total, albumina, colesterol, triglicerídeos), eletrólitos, urinálise por cistocentese com ceto-fita/sedimento, cultura urinária quando indicada, pressão arterial e cPLA/ultrassom pancreático conforme o quadro (1,4,5).',
    frutosamina:
      'Mede a glicação das proteínas séricas (período prévio de 2 a 3 semanas) (1,4,5). Útil para confirmar hiperglicemia sustentada e monitorar tendências crônicas. NÃO demonstra o valor mínimo glicêmico, duração de ação da insulina nem hipoglicemias curtas (1,4,5). Cães recém-diabéticos podem apresentar frutosamina ainda no limite superior da normalidade (5).',
    urocultura:
      'Infecção do trato urinário (ITU) é complicação frequente devido à glicosúria e imunossupressão. Realizar urocultura sob cistocentese em caso de alteração no sedimento, refratariedade ou descompensação sem causa evidente (1,4,5).',
  },
  treatment: {
    decisaoInicial:
      'Todo cão com diabetes mellitus clínico necessita de insulinoterapia exógena por toda a vida (Behrend et al., 2018). O objetivo clínico é eliminar a PU/PD, parar a perda de peso, evitar cetoacidose e evitar hipoglicemia, mantendo uma rotina sustentável para a família — a normoglicemia humana estrita 24h não é a meta prática (Behrend et al., 2018; Nelson & Couto, 2020). Cadelas inteiras devem ser submetidas a OVARIOHISTERECTOMIA (Behrend et al., 2018).',
    tabelaInsulinas: {
      kind: 'clinicalTable' as const,
      title: 'Insulinas e doses iniciais — cão',
      headers: ['Produto', 'Concentração', 'Dose inicial', 'Frequência', 'Observações'],
      rows: [
        [
          'Insulina lente suína (Caninsulin® / Vetsulin®)',
          'U40',
          '0,25 U/kg (peso ideal)',
          'SC q12h',
          '1ª linha AAHA; agitar antes; seringa U40 (Behrend et al., 2018; Plumb\'s, 10ª ed.)',
        ],
        ['NPH', 'U100', '0,25–0,5 U/kg', 'SC q12h', 'Alternativa; seringa U100 (Behrend et al., 2018)'],
        ['PZI', 'U40', '0,25–0,5 U/kg', 'SC q12h', 'Alternativa quando lente indisponível (Behrend et al., 2018)'],
        [
          'Glargina U300 (Toujeo®)',
          'U300',
          '0,5 U/kg',
          'SC q24h',
          'Tardo et al., 2024; NUNCA aspirar caneta U300 com seringa U100',
        ],
        [
          'Degludeca (Tresiba®)',
          'U100',
          '~0,6 U/kg (mediana)',
          'SC q24h',
          'Mott et al., 2025; alternativa basal de longa duração',
        ],
      ],
    },
    calculoPesoIdeal:
      'A dose em UI/kg deve ser calculada pelo peso corporal ideal (PCI), não pelo peso atual, em cães com sobrepeso ou obesidade — superdosar insulina pelo peso real aumenta risco de hipoglicemia (Behrend et al., 2018; Nelson & Couto, 2020). Se o animal estiver no peso ideal (ECC 5/9), PCI = peso atual.',
    tabelaPesoIdealEcc: {
      kind: 'clinicalTable' as const,
      title: 'Estimativa do peso ideal pelo ECC (9 pontos)',
      headers: ['ECC', 'Relação com o ideal', 'Fórmula', 'Exemplo (peso atual 12 kg)'],
      rows: [
        ['5/9', 'Peso ideal', 'PCI = peso atual', '12,0 kg'],
        ['6/9', '~10% acima do ideal', 'PCI = peso atual ÷ 1,10', '10,9 kg'],
        ['7/9', '~20% acima do ideal', 'PCI = peso atual ÷ 1,20', '10,0 kg'],
        ['8/9', '~30% acima do ideal', 'PCI = peso atual ÷ 1,30', '9,2 kg'],
        ['9/9', '~40% acima do ideal', 'PCI = peso atual ÷ 1,40', '8,6 kg'],
      ],
    },
    exemploCalculoInsulina: [
      '1. Pesar o cão e atribuir ECC (escala de 9 pontos) por palpação — costelas palpáveis sem excesso de gordura e cintura abdominal visível em ECC 5 (Nelson & Couto, 2020; AAHA 2021).',
      '2. Preferir peso saudável anterior documentado (quando ECC era 5) como PCI — método mais confiável.',
      '3. Sem histórico: estimar PCI pela tabela ECC (ex.: 12 kg com ECC 8/9 → PCI = 12 ÷ 1,30 = 9,2 kg).',
      '4. Calcular dose inicial: PCI × UI/kg (ex.: 9,2 kg × 0,25 UI/kg = 2,3 UI → arredondar conservadoramente para 2 UI SC q12h).',
      '5. Reavaliar PCI a cada consulta conforme perda de peso — reduzir insulina se PCI cair >10% (Behrend et al., 2018).',
    ],
    ordemDePrioridadeEstruturada: [
      {
        priority: 1,
        title: 'Insulinoterapia de Primeira Escolha (Insulina Lente)',
        summary:
          'Insulina Lente suína (Caninsulin® / Vetsulin® U40). Iniciar com 0,25 U/kg SC q12h calculada com base no PESO IDEAL (4,7). Agitar vigorosamente a embalagem antes da aspiração conforme instruções do produto/guideline (3,4). Usar seringa de U40 correspondente!',
      },
      {
        priority: 2,
        title: 'Manejo Alimentar & Consistência',
        summary:
          'Duas refeições iguais diárias casadas com as aplicações de insulina a cada 12 horas (4). Dieta completa, equilibrada e palatável. Teores de fibra solúvel/insolúvel ajudam a suavizar picos pós-prandiais, mas a consistência de horários e porções é o pilar central (1,4).',
      },
      {
        priority: 3,
        title: 'Ovariohisterectomia (OVH) em Cadelas Inteiras',
        summary:
          'Realizar OVH assim que a paciente for estabilizada para cessar a produção de progesterona e GH mamário (1,4,5). Reduzir a dose de insulina no pós-operatório e monitorar glicemia de perto devido à rápida queda na resistência insulínica (1,4).',
      },
      {
        priority: 4,
        title: 'Insulinas Alternativas (NPH, PZI, Glargina, Toujeo, Degludeca)',
        summary:
          'NPH (U100) 0,25–0,5 U/kg q12h; PZI (U40) 0,25–0,5 U/kg q12h (4,7). Glargina U300 (Toujeo U300): estudo prospectivo Tardo 2024 (95 cães) recomenda dose inicial de 0,5 U/kg SC q24h; NUNCA aspirar caneta U300 com seringa U100 (8). Degludeca U100 (Tresiba): estudo Mott 2025 (33 cães) relata mediana inicial de 0,6 U/kg q24h com excelente resposta (9).',
      },
      {
        priority: 5,
        title: 'Investigação de Resistência Insulínica (>1,5 U/kg/dose)',
        summary:
          'Doses >1,5 U/kg por aplicação sem controle adequado caracterizam resistência clínica (Behrend et al., 2018). Etapa 1: Erros de técnica/seringa/armazenamento. Etapa 2: Duração curta ou efeito rebote de Somogyi. Etapa 3: HAC, diestro, pancreatite, infecção/doença periodontal, obesidade e esteroides (Behrend et al., 2018; Nelson & Couto, 2020).',
      },
    ],
    protocoloTerapeutico:
      'A dose inicial da insulina lente não deve ultrapassar 0,25–0,5 U/kg q12h. A maioria dos cães estabiliza com aproximadamente ~0,5 U/kg q12h através de titulação progressiva a cada 7 a 14 dias com base na resposta clínica e curvas glicêmicas (4,5).',
    monitoramento: [
      'Avaliar resposta clínica primária: resolução da PU/PD, estabilização do peso corporal e apetite (Behrend et al., 2018; Nelson & Couto, 2020).',
      'Curva glicêmica domiciliar ou monitor contínuo de glicose (FreeStyle Libre) a cada 2h durante o intervalo de dose (Behrend et al., 2018; Tardo et al., 2024). Valor mínimo glicêmico ideal entre 80–150 mg/dL (Behrend et al., 2018).',
      'Se o valor mínimo glicêmico for satisfatório (ex: 100 mg/dL), mas a glicose subir rapidamente antes da próxima dose: trata-se de DURAÇÃO CURTA DA INSULINA. NÃO aumentar a dose (risco de hipoglicemia no valor mínimo glicêmico); trocar por formulação de maior duração (Behrend et al., 2018).',
      'Frutosamina sérica a cada 1 a 3 meses para acompanhar tendência geral (Behrend et al., 2018).',
    ],
    fluxogramaResistencia: [
      'Etapa 1 — Técnica e aderência: seringa correta (U40 vs U100), agitação, local de aplicação, rotação, armazenamento e horários de refeição/insulina (Behrend et al., 2018).',
      'Etapa 2 — Efeito rebote de Somogyi vs duração curta: valor mínimo glicêmico <80 mg/dL com hiperglicemia de rebote sugere efeito de Somogyi; valor mínimo 80–150 mg/dL com hiperglicemia pré-dose sugere duração insuficiente — trocar insulina, não escalar dose (Behrend et al., 2018).',
      'Etapa 3 — Diestro/OVH: cadela inteira em diestro → OVH e reduzir insulina pós-operatório (Behrend et al., 2018).',
      'Etapa 4 — HAC: testes de triagem (LDDS/ACTHST) se sinais compatíveis ou resistência persistente (Nelson & Couto, 2020).',
      'Etapa 5 — Pancreatite, ITU, obesidade, esteroides e doença periodontal: tratar comorbidades antes de escalar insulina além de >1,5 U/kg/dose (Behrend et al., 2018; Nelson & Couto, 2020).',
    ],
    complicacoes: {
      catarata:
        'Catarata diabética em 50% dos cães até 170 dias e 80% até 470 dias (Beam et al., 1999). Risco de uveíte lente-induzida. Avaliação oftalmológica periódica recomendada.',
      dka:
        'Cetoacidose diabética: acidose metabólica + cetonemia (BHB) + desidratação severa. Requer hospitalização, fluidoterapia, reposição de K+/fósforo e insulinização regular hospitalar (Textbook of Small Animal Emergency Medicine, 2020).',
      hhs:
        'Estado hiperglicêmico hiperosmolar: glicose >600 mg/dL, osmolalidade >350 mOsm/kg, sem cetose importante. Requer restauração volêmica lenta (queda glicêmica ≤50–75 mg/dL/h) para evitar edema cerebral (VINcyclopedia, 2022).',
    },
    prognostico:
      'Prognóstico funcional favorável com controle clínico estável e aderência familiar. Remissão espontânea é rara; exceção parcial após OVH em cadelas com DM induzida por diestro (Behrend et al., 2018). Catarata é complicação esperada na maioria — não indica mau controle isoladamente (Beam et al., 1999). DKA e HHS têm prognóstico reservado e exigem internação (Textbook of Small Animal Emergency Medicine, 2020).',
  },
  prevention: {
    primaria:
      'Ovariohisterectomia de cadelas não reprodutoras antes de ciclos repetidos de diestro; manutenção de peso ideal; evitar glicocorticoides e progestágenos desnecessários; controle de obesidade e doença periodontal como fatores de resistência insulínica (Behrend et al., 2018; Nelson & Couto, 2020).',
    vigilanciaComplicacoes:
      'Após diagnóstico: exame oftalmológico seriado para catarata/uveíte; urocultura quando indicado; reforçar consistência alimentar e técnica de insulina com tutores (Behrend et al., 2018; Beam et al., 1999).',
    errosComuns: [
      'Diagnosticar DM por glicemia isolada de estresse sem glicosúria/frutosamina.',
      'Usar seringa U100 para insulina U40 (ou vice-versa).',
      'Aumentar dose quando valor mínimo glicêmico já é adequado mas glicose sobe antes da próxima aplicação (duração curta).',
      'Adiar OVH em cadela inteira com DM estabilizável.',
      'Ignorar anorexia/vômitos no diabético (DKA, pancreatite, ITU).',
      'Buscar normoglicemia humana estrita em detrimento de segurança e qualidade de vida.',
      'Confundir efeito rebote de Somogyi com necessidade de mais insulina.',
      'Não monitorar hipoglicemia pós-OVH.',
    ],
  },
  relatedConsensusSlugs: ['consensual-endocrinologia-aaha-diabetes-dogs-cats'],
  relatedDiseaseSlugs: [
    'cetoacidose-diabetica-caes-gatos',
    'sindrome-cushing-caes',
    'hipertireoidismo',
    'insuficiencia-pancreatica-exocrina-caes-gatos',
    'drc',
  ],
  relatedMedicationSlugs: [],
  references: [
    {
      id: 'ref-aula-magna-2026',
      citationText:
        'Aula Magna — Diabetes mellitus em cães e gatos: da fisiopatologia à escolha da insulina, nutrição, monitoramento, remissão e uso de inibidores de SGLT-2. Material fornecido ao projeto Vetius, 2026.',
      sourceType: 'Aula Magna',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-aaha-2026-cats',
      citationText:
        '2026 AAHA Diabetes Management Guidelines for Cats. American Animal Hospital Association. Published April 26, 2026.',
      sourceType: 'Diretriz Consensual AAHA 2026',
      url: 'https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-icatcare-2025',
      citationText:
        'Taylor S, Cannon M, Church D, Fleeman L, Fracassi F, Gilor C, Mott J, Niessen S. iCatCare 2025 consensus guidelines on the diagnosis and management of diabetes mellitus in cats. J Feline Med Surg. 2025;27(11):1098612X251399103.',
      sourceType: 'Consenso iCatCare 2025',
      url: 'https://pubmed.ncbi.nlm.nih.gov/41224734/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-aaha-2018-dogs',
      citationText:
        'Behrend E, Holford A, Lathan P, Rucinsky R, Schulman R. 2018 AAHA Diabetes Management Guidelines for Dogs and Cats. J Am Anim Hosp Assoc. 2018;54:1–21.',
      sourceType: 'Diretriz Consensual AAHA 2018/2022',
      url: 'https://www.aaha.org/resources/2018-aaha-diabetes-management-guideline-for-dogs-and-cats/dogs/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-nelson-couto-2020',
      citationText:
        'Nelson RW, Couto CG. Small Animal Internal Medicine. 6th ed. Elsevier; 2020. Chapter 49 — Disorders of the Endocrine Pancreas.',
      sourceType: 'Tratado de Medicina Interna',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bsava-nephrology',
      citationText:
        'BSAVA Manual of Canine and Feline Nephrology and Urology. 3rd ed. BSAVA.',
      sourceType: 'Manual BSAVA',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-plumbs-2023',
      citationText:
        'Plumb\'s Veterinary Drug Handbook. 10th ed. Wiley; 2023. Insulin monographs.',
      sourceType: 'Guia Farmacológico',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-tardo-toujeo-2024',
      citationText:
        'Tardo AM, et al. A dose titration protocol for once-daily insulin glargine 300 U/mL for the treatment of diabetes mellitus in dogs. J Vet Intern Med. 2024;38:2120–2133.',
      sourceType: 'Estudo Clínico Prospectivo (95 cães)',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11256126/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-mott-degludec-2025',
      citationText:
        'Mott J, Gal A, Tardo AM, et al. Insulin degludec 100 U/mL for treatment of spontaneous diabetes mellitus in dogs. J Vet Intern Med. 2025;39:e17303.',
      sourceType: 'Estudo Clínico Prospectivo (33 cães)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/39844001/',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-bexacat-fda-2026',
      citationText:
        'FDA/DailyMed. Bexacat — bexagliflozin tablets. Current label updated 2026.',
      sourceType: 'Bula Oficial FDA',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f918583d-0337-40da-8da1-1e1320b8d027',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-senvelgo-fda-2026',
      citationText:
        'FDA/DailyMed. Senvelgo — velagliflozin oral solution 15 mg/mL. Current label updated 2026.',
      sourceType: 'Bula Oficial FDA',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ec5ca1f-bded-459e-a813-24d931d50b9a',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-vin-hhs-2022',
      citationText:
        'VINcyclopedia of Diseases. Diabetes Mellitus, Hyperglycemic Hyperosmolar Syndrome — Canine/Feline. Revised December 14, 2022.',
      sourceType: 'Enciclopédia Clínica VIN',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-textbook-emergency-2020',
      citationText:
        'Textbook of Small Animal Emergency Medicine. Wiley-Blackwell. Chapters on diabetes mellitus, DKA and hyperosmolar hyperglycemic state.',
      sourceType: 'Tratado de Emergência',
      evidenceLevel: 'A',
    },
    {
      id: 'ref-beam-cataract-1999',
      citationText:
        'Beam S, Correa MT, Davidson MG. A retrospective-cohort study on the development of cataracts in dogs with diabetes mellitus: 200 cases. Vet Ophthalmol. 1999;2:169–172.',
      sourceType: 'Estudo Retrospectivo de Coorte (200 cães)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/11397260/',
      evidenceLevel: 'B',
    },
    {
      id: 'ref-pancreatitis-dm-2024',
      citationText:
        'Canine Hepatobiliary and Exocrine Pancreatic Diseases. 2024. Sections on pancreatitis and endocrine disease.',
      sourceType: 'Capítulo Especializado',
      evidenceLevel: 'B',
    },
  ],
  isPublished: true,
  source: 'seed',
};
